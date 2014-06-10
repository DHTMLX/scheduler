/*
dhtmlxScheduler v.4.1.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.multisection = true;
scheduler.config.section_delemiter = ",";
scheduler.attachEvent("onSchedulerReady", function(){


	var old_unit = scheduler._update_unit_section;
	scheduler._update_unit_section = function(action){
		return scheduler._update_sections(action, old_unit);
	};
	var old_timeline = scheduler._update_timeline_section;
	scheduler._update_timeline_section =function(action){
		return scheduler._update_sections(action, old_timeline);
	};


	scheduler.isMultisectionEvent = function(ev){
		if(ev && this._get_multisection_view()){
			var units = this._get_event_sections(ev);
			return (units.length > 1);
		}
		return false;
	};

	scheduler._get_event_sections = function(event){
		var mapping = this._get_section_property();
		var units = event[mapping] || "";
		return this._parse_event_sections(units);
	};
	scheduler._parse_event_sections = function(value){
		if(value instanceof Array){
			return value;
		}else{
			return value.toString().split(scheduler.config.section_delemiter);
		}
	};

	scheduler._register_copies_array = function(evs){
		for(var i=0; i < evs.length; i++)
			this._register_copy(evs[i]);
	};
	scheduler._register_copy = function(copy){
		if(!this._multisection_copies[copy.id]){
			this._multisection_copies[copy.id] = {};
		}
		var section = copy[this._get_section_property()];
		var evs = this._multisection_copies[copy.id];
		if(!evs[section]){
			evs[section] = copy;
		}
	};
	scheduler._get_copied_event = function(event_id, section){
		if(!this._multisection_copies[event_id])
			return null;

		if(this._multisection_copies[event_id][section])
			return this._multisection_copies[event_id][section];

		var parts = this._multisection_copies[event_id];
		//multisection event has not been rendered in this section, need retrieve state of one of rendered events
		if(scheduler._drag_event && scheduler._drag_event._orig_section && parts[scheduler._drag_event._orig_section]){
			return parts[scheduler._drag_event._orig_section];
		}else{
			var min_sorder = Infinity,
				ev = null;
			for(var i in parts){
				if(parts[i]._sorder < min_sorder){
					ev = parts[i];
					min_sorder = parts[i]._sorder;
				}
			}
			return ev;
		}
	};
	scheduler._clear_copied_events = function(){
		this._multisection_copies = {};
	};
	scheduler._clear_copied_events();

	scheduler._split_events = function(evs) {
		var stack = [];
		var pr = this._get_multisection_view();
		var mapping = this._get_section_property();
		if(pr) {
			for (var i=0; i<evs.length; i++) {
				var units = this._get_event_sections(evs[i]);

				if(units.length > 1) {
					for (var j=0; j<units.length; j++) {
						if(typeof pr.order[units[j]] === "undefined")
							continue;
						var ev = this._lame_copy({}, evs[i]);
						ev[mapping] = units[j];
						stack.push(ev);
					}
				} else {
					stack.push(evs[i]);
				}

			}
		}else{
			stack = evs;
		}
		return stack;
	};


	scheduler._get_multisection_view = function(){
		if(!this.config.multisection){
			return false;
		}else{
			return scheduler._get_section_view();
		}
	};

	var vis_evs = scheduler.get_visible_events;
	scheduler.get_visible_events = function(only_timed) {
		this._clear_copied_events();
		var evs = vis_evs.apply(this,arguments);
		var pr = this._get_multisection_view();
		if (this._get_multisection_view()){
			evs = this._split_events(evs);
			this._register_copies_array(evs);
		}

		return evs;
	};

	scheduler._rendered_events = {};
	var old_view_data = scheduler.render_view_data;
	scheduler.render_view_data = function(evs, hold) {
		if (this._get_multisection_view() && evs) {
			//render single event during dnd, restore flags that were calculated during full render
			evs = this._split_events(evs);
			this._restore_render_flags(evs);
		}

		return old_view_data.apply(this,[evs, hold]);
	};
	scheduler._restore_render_flags = function(section_evs){
		var map_to = this._get_section_property();
		for(var i=0; i < section_evs.length; i++){
			var ev = section_evs[i];
			var prev_state = scheduler._get_copied_event(ev.id, ev[map_to]);
			if(prev_state){
				for(var p in prev_state){
					if(p.indexOf("_") === 0){
						ev[p] = prev_state[p];
					}
				}
			}
		}
	};
	scheduler._update_sections = function(action, def_handler){
		var view = action.view,
			event = action.event,
			pos = action.pos;
		//view - timeline or units view object. both stores displayed sections in 'view.order' hash
		// pos - mouse position, calculated in _mouse_coords method
		// event - scheduler event

		if(!scheduler.isMultisectionEvent(event)){
			def_handler.apply(scheduler, [action]);
		}else{
			if(!scheduler._drag_event._orig_section){
				scheduler._drag_event._orig_section = pos.section;
			}

			if(scheduler._drag_event._orig_section != pos.section){
				var shift = (view.order[pos.section] - view.order[scheduler._drag_event._orig_section]);
				if(shift){
					var sections = this._get_event_sections(event);
					var new_sections = [];
					var shifted = true;
					for(var i=0; i<sections.length; i++){
						var new_section = scheduler._shift_sections(view, sections[i], shift);
						if(new_section !== null){
							new_sections[i] = new_section;
						}else{
							new_sections = sections;
							shifted = false;
							break;

						}
					}
					if(shifted)
						scheduler._drag_event._orig_section = pos.section;
					
					event[scheduler._get_section_property()] = new_sections.join(",");
				}

			}
		}
	};

	scheduler._shift_sections = function(matrix, orig_section, shift){
		for(var i in matrix.order){
			if(matrix.order[i] - matrix.order[orig_section] == shift){
				return i;
			}
		}
		return null;
	};


	// limit extension

	var old_get_blocked_zones = scheduler._get_blocked_zones;
	scheduler._get_blocked_zones = function(timespans, property, day_index, day_value, timespan_type){
		if(property && this.config.multisection){
			property = this._parse_event_sections(property);
			var zones = [];
			for(var i =0; i < property.length; i++){
				zones = zones.concat(old_get_blocked_zones.apply(this, [timespans, property[i], day_index, day_value, timespan_type]));
			}
			return zones;
		}else{
			return old_get_blocked_zones.apply(this, arguments);
		}
	};


	// collision extension
	var old_check_secions_collision = scheduler._check_sections_collision;

	scheduler._check_sections_collision = function(a, b){
		if(this.config.multisection && this._get_section_view()){
			a = this._split_events([a]);
			b = this._split_events([b]);

			var collision = false;
			for(var a_ind = 0, a_len = a.length; a_ind < a_len; a_ind++){
				if(collision){
					break;
				}
				for(var b_ind = 0, b_len = b.length; b_ind < b_len; b_ind++){
					if(old_check_secions_collision.apply(this, [a[a_ind], b[b_ind]])){
						collision = true;
						break;
					}
				}
			}
			return collision;
		}else{
			return old_check_secions_collision.apply(this, arguments);
		}
	};
});
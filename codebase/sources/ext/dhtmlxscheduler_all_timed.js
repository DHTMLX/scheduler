/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
(function(){

	scheduler.config.all_timed = "short";

	var is_event_short = function (ev) {
		return 	!((ev.end_date - ev.start_date)/(1000*60*60) >= 24);
	};

	// copy of usual events and recurring instances;
	// regular copy causes problems with recurrings which have series event as a prototype
	scheduler._safe_copy = function(event){
		var proto = null,
			copy = null;
		if(event.event_pid){
			proto = scheduler.getEvent(event.event_pid);
		}

		if (proto && proto.isPrototypeOf(event)) {
			copy = scheduler._copy_event(event);
			delete copy.event_length;
			delete copy.event_pid;
			delete copy.rec_pattern;
			delete copy.rec_type;
		} else {
			copy = scheduler._lame_clone(event);
		}
		return copy;
	};

	var old_prerender_events_line = scheduler._pre_render_events_line;
	scheduler._pre_render_events_line = function(evs, hold){
		if (!this.config.all_timed)
			return old_prerender_events_line.call(this, evs, hold);

		for (var i=0; i < evs.length; i++) {
			var ev=evs[i];

			if (ev._timed)
				continue;

			if (this.config.all_timed == "short") {
				if (!is_event_short(ev)) {
					evs.splice(i--,1);
					continue;
				}
			}

			var ce = this._safe_copy(ev); // current event (event for one specific day) is copy of original with modified dates

			ce.start_date = new Date(ce.start_date); // as lame copy doesn't copy date objects

			if (!isOvernightEvent(ev)) {
				ce.end_date = new Date(ev.end_date);
			}
			else {
				ce.end_date = getNextDay(ce.start_date);
				if (this.config.last_hour != 24) { // if specific last_hour was set (e.g. 20)
					ce.end_date = setDateTime(ce.start_date, this.config.last_hour);
				}
			}

			var event_changed = false;
			if (ce.start_date < this._max_date && ce.end_date > this._min_date && ce.start_date < ce.end_date) {
				evs[i] = ce; // adding another event in collection
				event_changed = true;
			}
		//	if (ce.start_date > ce.end_date) {
		//		evs.splice(i--,1);
		//	}

			var re = this._safe_copy(ev); // remaining event, copy of original with modified start_date (making range more narrow)
			re.end_date = new Date(re.end_date);
			if (re.start_date < this._min_date)
				re.start_date = setDateTime(this._min_date, this.config.first_hour);// as we are starting only with whole hours
			else
				re.start_date = setDateTime(getNextDay(ev.start_date), this.config.first_hour);

			if (re.start_date < this._max_date && re.start_date < re.end_date) {
				if (event_changed)
					evs.splice(i+1,0,re);//insert part
				else {
					evs[i--] = re;
					continue;
				}
			}

		}
		// in case of all_timed pre_render is not applied to the original event
		// so we need to force redraw in case of dnd
		var redraw = (this._drag_mode == 'move')?false:hold;
		return old_prerender_events_line.call(this, evs, redraw);


		function isOvernightEvent(ev){
			var next_day = getNextDay(ev.start_date);
			return (+ev.end_date > +next_day);
		}
		function getNextDay(date){
			var next_day = scheduler.date.add(date, 1, "day");
			next_day = scheduler.date.date_part(next_day);
			return next_day;
		}
		function setDateTime(date, hours){
			var val = scheduler.date.date_part(new Date(date));
			val.setHours(hours);
			return val;
		}
	};
	var old_get_visible_events = scheduler.get_visible_events;
	scheduler.get_visible_events = function(only_timed){
		if (!(this.config.all_timed && this.config.multi_day))
			return old_get_visible_events.call(this, only_timed);	
		return old_get_visible_events.call(this, false); // only timed = false
	};
	scheduler.attachEvent("onBeforeViewChange", function (old_mode, old_date, mode, date) {
		scheduler._allow_dnd = (mode == "day" || mode == "week");
		return true;
	});

	scheduler._is_main_area_event = function(ev){
		return !!(ev._timed || this.config.all_timed === true || (this.config.all_timed == "short" && is_event_short(ev)) );
	};

	var oldUpdate = scheduler.updateEvent;
	scheduler.updateEvent = function(id){
		// full redraw(update_render=true) messes events order while dnd.
		// individual redraw(update_render=false) of multiday event, which happens on select/unselect, expands event to full width of the cell and can be fixes only with full redraw.
		// so for now full redraw is always enabled for not-dnd updates
		var fullRedrawNeeded = (scheduler.config.all_timed && !(scheduler.isOneDayEvent(scheduler._events[id]) || scheduler.getState().drag_id));
		var initial;
		if(fullRedrawNeeded){
			initial = scheduler.config.update_render;
			scheduler.config.update_render = true;
		}
		oldUpdate.apply(scheduler, arguments);

		if(fullRedrawNeeded){
			scheduler.config.update_render = initial;
		}
	};
})();
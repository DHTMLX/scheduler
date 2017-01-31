/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
(function(){

	var cfg = {
		use_id : false
	};

	//remove private properties
	function sanitize(ev){
		var obj = {};
		for (var key in ev)
			if (key.indexOf("_") !== 0)
				obj[key] = ev[key];

		if (!cfg.use_id)
			delete obj.id;

		return obj;
	}

	var update_timer;
	function update_view(){
		clearTimeout(update_timer);
		update_timer = setTimeout(function(){
			scheduler.updateView();
		},1);
	}

	function _start_ext_load(cal){
		cal._loading = true;
		cal._not_render = true;

		cal.callEvent("onXLS", []);
	}
	function _finish_ext_load(cal){
		cal._not_render = false;
		if (cal._render_wait) 
			cal.render_view_data();
		cal._loading = false;

		cal.callEvent("onXLE", []);
	}

	
	function _get_id(model){
		return cfg.use_id ? model.id : model.cid;
	}

scheduler.backbone = function(events, config){
	if (config) cfg = config;

	events.bind("change", function(model, info){
		var cid = _get_id(model);
		var ev = scheduler._events[cid] = model.toJSON();
		ev.id = cid;

		scheduler._init_event(ev);
		update_view();
	});
	events.bind("remove", function(model, changes){
		var cid = _get_id(model);
		if (scheduler._events[cid])
			scheduler.deleteEvent(cid);
	});

	var queue = [];
	function add_from_queue(){
		if (queue.length){
			scheduler.parse(queue, "json");
			queue = [];
		}
	}

	events.bind("add", function(model, changes){ 
		var cid = _get_id(model);
		if (!scheduler._events[cid]){
			var ev =  model.toJSON();
			ev.id = cid;
			scheduler._init_event(ev); 

			queue.push(ev);
			if (queue.length == 1)
				setTimeout(add_from_queue,1);
		}
	});

	events.bind("request", function(obj){
		if (obj instanceof Backbone.Collection)
			_start_ext_load(scheduler);
	});
	events.bind("sync", function(obj){
		if (obj instanceof Backbone.Collection)
			_finish_ext_load(scheduler);
	});
	events.bind("error", function(obj){
		if (obj instanceof Backbone.Collection)
			_finish_ext_load(scheduler);
	});


	scheduler.attachEvent("onEventCreated", function(id){
		var ev = new events.model(scheduler.getEvent(id));
		scheduler._events[id] = ev.toJSON();
		scheduler._events[id].id = id;

		return true;
	});

	scheduler.attachEvent("onEventAdded", function(id){
		if (!events.get(id)){
			var data = sanitize(scheduler.getEvent(id));
			var model = new events.model(data);

			var cid = _get_id(model);
			if (cid != id)
				this.changeEventId(id, cid);
			events.add(model);
			events.trigger("scheduler:add", model);
		}
		return true;
	});
	scheduler.attachEvent("onEventChanged", function(id){
		var ev = events.get(id);
		var upd = sanitize(scheduler.getEvent(id));

		ev.set(upd);
		events.trigger("scheduler:change", ev);

		return true;
	});
	scheduler.attachEvent("onEventDeleted", function(id){
		var model = events.get(id);
		if (model){
			events.trigger("scheduler:remove", model);
			events.remove(id);
		}
		return true;
	});
};

})();
/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

(function(){

var temp_section;
var before;

scheduler.config.collision_limit = 1;

function _setTempSection(event_id) { // for custom views (matrix, timeline, units)
	var checked_mode = scheduler._get_section_view();
	if(checked_mode && event_id){
		temp_section = scheduler.getEvent(event_id)[scheduler._get_section_property()];
	}
}

scheduler.attachEvent("onBeforeDrag",function(id){
	_setTempSection(id);
	return true;
});
scheduler.attachEvent("onBeforeLightbox",function(id){
	var ev = scheduler.getEvent(id);
	before = [ev.start_date, ev.end_date];
	_setTempSection(id);
	return true;
});
scheduler.attachEvent("onEventChanged",function(id){
	if (!id || !scheduler.getEvent(id)) return true;
	var ev = scheduler.getEvent(id);
	if (!scheduler.checkCollision(ev)){
		if (!before) return false;
		ev.start_date = before[0];
		ev.end_date = before[1];
		ev._timed=this.isOneDayEvent(ev);
	}
	return true;
});
scheduler.attachEvent("onBeforeEventChanged",function(ev,e,is_new){
	return scheduler.checkCollision(ev);
});
scheduler.attachEvent("onEventAdded",function(id,ev) {
	var result = scheduler.checkCollision(ev);
	if (!result)
		scheduler.deleteEvent(id);
});
scheduler.attachEvent("onEventSave",function(id, edited_ev, is_new){
	edited_ev = scheduler._lame_clone(edited_ev);
	edited_ev.id = id;

	//lightbox may not have 'time' section
	if(!(edited_ev.start_date && edited_ev.end_date)){
		var ev = scheduler.getEvent(id);
		edited_ev.start_date = new Date(ev.start_date);
		edited_ev.end_date = new Date(ev.end_date);
	}

	if(edited_ev.rec_type){
		scheduler._roll_back_dates(edited_ev);
	}
	return scheduler.checkCollision(edited_ev); // in case user creates event on one date but then edited it another
});

scheduler._check_sections_collision = function(first, second){
	var map_to = scheduler._get_section_property();
	if (first[map_to] == second[map_to] && first.id != second.id)
		return true;
	return false;
};

scheduler.checkCollision = function(ev) {
	var evs = [];
	var collision_limit = scheduler.config.collision_limit;

	if (ev.rec_type) {
		var evs_dates = scheduler.getRecDates(ev);
		for(var k=0; k<evs_dates.length; k++) {
			var tevs = scheduler.getEvents(evs_dates[k].start_date, evs_dates[k].end_date);
			for(var j=0; j<tevs.length; j++) {
				if ((tevs[j].event_pid || tevs[j].id) != ev.id )
					evs.push(tevs[j]);
			}
		}
	} else {
		evs = scheduler.getEvents(ev.start_date, ev.end_date);
		for (var i=0; i<evs.length; i++) {
			var concurrent = evs[i];

			if (concurrent.id == ev.id || (concurrent.event_length && [concurrent.event_pid, concurrent.event_length].join("#") == ev.id)) {
				evs.splice(i,1);
				break;
			}
		}
	}

	var checked_mode = scheduler._get_section_view();
	var map_to = scheduler._get_section_property();

	var single = true;
	if (checked_mode) { // custom view
		var count = 0;

		for (var i = 0; i < evs.length; i++){
			if (evs[i].id != ev.id && this._check_sections_collision(evs[i], ev))
				count++;
		}

		if (count >= collision_limit) {

			single = false;
		}
	}
	else {
		if ( evs.length >= collision_limit )
			single = false;
	}
	if (!single) {
		var res = !scheduler.callEvent("onEventCollision",[ev,evs]);
		if (!res) {
			ev[map_to] = temp_section||ev[map_to]; // from _setTempSection for custom views
		}
		return res;
	}
	return single;

};

})();


});

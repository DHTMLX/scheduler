/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
//Initial idea and implementation by Steve MC
scheduler._temp_key_scope = function (){

scheduler.config.key_nav = true;

var date; // used for copy and paste operations
var section; // used for copy and paste operations
var isCopy = null;


scheduler.attachEvent("onMouseMove", function(id,e){
	date = scheduler.getActionData(e).date;
	section = scheduler.getActionData(e).section;
});

function clear_event_after(ev){
	delete ev.rec_type; delete ev.rec_pattern;
	delete ev.event_pid; delete ev.event_length;
}
scheduler._make_pasted_event = function(ev){
	var event_duration = ev.end_date-ev.start_date;

	var copy = scheduler._lame_copy({}, ev);
	clear_event_after(copy);
	copy.start_date = new Date(date);
	copy.end_date = new Date(copy.start_date.valueOf() + event_duration);

	if(section){
		var property = scheduler._get_section_property();
		
		if(scheduler.config.multisection)
			copy[property] = ev[property]; // save initial set of resources for multisection view
		else
			copy[property] = section;
	}
	return copy;
};
scheduler._do_paste = function(is_copy, modified_ev, original_ev){
	scheduler.addEvent(modified_ev);
	scheduler.callEvent("onEventPasted", [is_copy, modified_ev, original_ev]);
};

scheduler._is_key_nav_active = function(){
	if(this._is_initialized() && !this._is_lightbox_open() && this.config.key_nav){
		return true;
	}
	return false;
};

dhtmlxEvent(document,(_isOpera?"keypress":"keydown"),function(e){
	if(!scheduler._is_key_nav_active()) return true;

	e=e||event;

	if (e.keyCode == 37 || e.keyCode == 39) { // Left, Right arrows
		e.cancelBubble = true;

		var next = scheduler.date.add(scheduler._date,(e.keyCode == 37 ? -1 : 1 ),scheduler._mode);
		scheduler.setCurrentView(next);
		return true;
	}

	var select_id = scheduler._select_id;
	if (e.ctrlKey && e.keyCode == 67) {  // CTRL+C
		if (select_id) {
			scheduler._buffer_id = select_id;
			isCopy = true;
			scheduler.callEvent("onEventCopied", [scheduler.getEvent(select_id)]);
		}
		return true;
	}
	if (e.ctrlKey && e.keyCode == 88) { // CTRL+X
		if (select_id) {
			isCopy = false;
			scheduler._buffer_id = select_id;
			var ev = scheduler.getEvent(select_id);
			scheduler.updateEvent(ev.id);
			scheduler.callEvent("onEventCut", [ev]);
		}
	}

	if (e.ctrlKey && e.keyCode == 86) {  // CTRL+V
		var ev = scheduler.getEvent(scheduler._buffer_id);
		if (ev) {
			var new_ev = scheduler._make_pasted_event(ev);
			if (isCopy) {
				new_ev.id = scheduler.uid();
				scheduler._do_paste(isCopy, new_ev, ev);
			}
			else { // cut operation
				var res = scheduler.callEvent("onBeforeEventChanged",[new_ev, e, false, ev]);
				if (res) {
					scheduler._do_paste(isCopy, new_ev, ev);
					isCopy = true; // switch to copy after first paste operation
				}
			}

		}
		return true;
	}

});

};
scheduler._temp_key_scope();

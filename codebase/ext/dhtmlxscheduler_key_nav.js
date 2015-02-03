/*
dhtmlxScheduler v.4.3.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._temp_key_scope=function(){function e(e){delete e.rec_type,delete e.rec_pattern,delete e.event_pid,delete e.event_length}scheduler.config.key_nav=!0;var t,s,r=null;scheduler.attachEvent("onMouseMove",function(e,r){t=scheduler.getActionData(r).date,s=scheduler.getActionData(r).section}),scheduler._make_pasted_event=function(r){var i=r.end_date-r.start_date,a=scheduler._lame_copy({},r);if(e(a),a.start_date=new Date(t),a.end_date=new Date(a.start_date.valueOf()+i),s){var n=scheduler._get_section_property();
a[n]=scheduler.config.multisection?r[n]:s}return a},scheduler._do_paste=function(e,t,s){scheduler.addEvent(t),scheduler.callEvent("onEventPasted",[e,t,s])},scheduler._is_key_nav_active=function(){return this._is_initialized()&&!this._is_lightbox_open()&&this.config.key_nav?!0:!1},dhtmlxEvent(document,_isOpera?"keypress":"keydown",function(e){if(!scheduler._is_key_nav_active())return!0;if(e=e||event,37==e.keyCode||39==e.keyCode){e.cancelBubble=!0;var t=scheduler.date.add(scheduler._date,37==e.keyCode?-1:1,scheduler._mode);
return scheduler.setCurrentView(t),!0}var s=scheduler._select_id;if(e.ctrlKey&&67==e.keyCode)return s&&(scheduler._buffer_id=s,r=!0,scheduler.callEvent("onEventCopied",[scheduler.getEvent(s)])),!0;if(e.ctrlKey&&88==e.keyCode&&s){r=!1,scheduler._buffer_id=s;var i=scheduler.getEvent(s);scheduler.updateEvent(i.id),scheduler.callEvent("onEventCut",[i])}if(e.ctrlKey&&86==e.keyCode){var i=scheduler.getEvent(scheduler._buffer_id);if(i){var a=scheduler._make_pasted_event(i);if(r)a.id=scheduler.uid(),scheduler._do_paste(r,a,i);
else{var n=scheduler.callEvent("onBeforeEventChanged",[a,e,!1,i]);n&&(scheduler._do_paste(r,a,i),r=!0)}}return!0}})},scheduler._temp_key_scope();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_key_nav.js.map
/*
dhtmlxScheduler v.4.1.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._temp_key_scope=function(){function e(e){delete e.rec_type,delete e.rec_pattern,delete e.event_pid,delete e.event_length}scheduler.config.key_nav=!0;var t,s,i=null;scheduler.attachEvent("onMouseMove",function(e,i){t=scheduler.getActionData(i).date,s=scheduler.getActionData(i).section}),scheduler._make_pasted_event=function(i){var r=i.end_date-i.start_date,n=scheduler._lame_copy({},i);if(e(n),n.start_date=new Date(t),n.end_date=new Date(n.start_date.valueOf()+r),s){var a=scheduler.getState().mode,d=null;
scheduler.matrix[a]?d=scheduler.matrix[a].y_property:scheduler._props[a]&&(d=scheduler._props[a].property),n[d]=s}return n},scheduler._do_paste=function(e,t,s){scheduler.addEvent(t),scheduler.callEvent("onEventPasted",[e,t,s])},scheduler._is_key_nav_active=function(){return this._is_initialized()&&!this._is_lightbox_open()&&this.config.key_nav?!0:!1},dhtmlxEvent(document,_isOpera?"keypress":"keydown",function(e){if(!scheduler._is_key_nav_active())return!0;if(e=e||event,37==e.keyCode||39==e.keyCode){e.cancelBubble=!0;
var t=scheduler.date.add(scheduler._date,37==e.keyCode?-1:1,scheduler._mode);return scheduler.setCurrentView(t),!0}var s=scheduler._select_id;if(e.ctrlKey&&67==e.keyCode)return s&&(scheduler._buffer_id=s,i=!0,scheduler.callEvent("onEventCopied",[scheduler.getEvent(s)])),!0;if(e.ctrlKey&&88==e.keyCode&&s){i=!1,scheduler._buffer_id=s;var r=scheduler.getEvent(s);scheduler.updateEvent(r.id),scheduler.callEvent("onEventCut",[r])}if(e.ctrlKey&&86==e.keyCode){var r=scheduler.getEvent(scheduler._buffer_id);
if(r){var n=scheduler._make_pasted_event(r);if(i)n.id=scheduler.uid(),scheduler._do_paste(i,n,r);else{var a=scheduler.callEvent("onBeforeEventChanged",[n,e,!1,r]);a&&(scheduler._do_paste(i,n,r),i=!0)}}return!0}})},scheduler._temp_key_scope();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_key_nav.js.map
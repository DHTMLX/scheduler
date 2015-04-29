/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){scheduler.config.all_timed="short";var e=function(e){return!((e.end_date-e.start_date)/36e5>=24)};scheduler._safe_copy=function(e){var t=null,a=null;return e.event_pid&&(t=scheduler.getEvent(e.event_pid)),t&&t.isPrototypeOf(e)?(a=scheduler._copy_event(e),delete a.event_length,delete a.event_pid,delete a.rec_pattern,delete a.rec_type):a=scheduler._lame_clone(e),a};var t=scheduler._pre_render_events_line;scheduler._pre_render_events_line=function(a,i){function n(e){var t=r(e.start_date);

return+e.end_date>+t}function r(e){var t=scheduler.date.add(e,1,"day");return t=scheduler.date.date_part(t)}function l(e,t){var a=scheduler.date.date_part(new Date(e));return a.setHours(t),a}if(!this.config.all_timed)return t.call(this,a,i);for(var d=0;d<a.length;d++){var o=a[d];if(!o._timed)if("short"!=this.config.all_timed||e(o)){var s=this._safe_copy(o);s.start_date=new Date(s.start_date),n(o)?(s.end_date=r(s.start_date),24!=this.config.last_hour&&(s.end_date=l(s.start_date,this.config.last_hour))):s.end_date=new Date(o.end_date);

var _=!1;s.start_date<this._max_date&&s.end_date>this._min_date&&s.start_date<s.end_date&&(a[d]=s,_=!0);var c=this._safe_copy(o);if(c.end_date=new Date(c.end_date),c.start_date<this._min_date?c.start_date=l(this._min_date,this.config.first_hour):c.start_date=l(r(o.start_date),this.config.first_hour),c.start_date<this._max_date&&c.start_date<c.end_date){if(!_){a[d--]=c;continue}a.splice(d+1,0,c)}}else a.splice(d--,1)}var u="move"==this._drag_mode?!1:i;return t.call(this,a,u)};var a=scheduler.get_visible_events;

scheduler.get_visible_events=function(e){return this.config.all_timed&&this.config.multi_day?a.call(this,!1):a.call(this,e)},scheduler.attachEvent("onBeforeViewChange",function(e,t,a,i){return scheduler._allow_dnd="day"==a||"week"==a,!0}),scheduler._is_main_area_event=function(t){return!!(t._timed||this.config.all_timed===!0||"short"==this.config.all_timed&&e(t))};var i=scheduler.updateEvent;scheduler.updateEvent=function(e){var t,a=scheduler.config.all_timed&&!(scheduler.isOneDayEvent(scheduler._events[e])||scheduler.getState().drag_id);

a&&(t=scheduler.config.update_render,scheduler.config.update_render=!0),i.apply(scheduler,arguments),a&&(scheduler.config.update_render=t)}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_all_timed.js.map
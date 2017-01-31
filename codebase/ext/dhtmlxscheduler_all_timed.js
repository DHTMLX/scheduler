/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){scheduler.config.all_timed="short";var e=function(e){return!((e.end_date-e.start_date)/36e5>=24)};scheduler._safe_copy=function(e){var t=null,a=scheduler._copy_event(e);return e.event_pid&&(t=scheduler.getEvent(e.event_pid)),t&&t.isPrototypeOf(e)&&(delete a.event_length,delete a.event_pid,delete a.rec_pattern,delete a.rec_type),a};var t=scheduler._pre_render_events_line;scheduler._pre_render_events_line=function(a,i){function r(e){var t=s(e.start_date);return+e.end_date>+t}function s(e){
var t=scheduler.date.add(e,1,"day");return t=scheduler.date.date_part(t)}function n(e,t){var a=scheduler.date.date_part(new Date(e));return a.setHours(t),a}if(!this.config.all_timed)return t.call(this,a,i);for(var d=0;d<a.length;d++){var l=a[d];if(!l._timed)if("short"!=this.config.all_timed||e(l)){var o=this._safe_copy(l);o.start_date=new Date(o.start_date),r(l)?(o.end_date=s(o.start_date),24!=this.config.last_hour&&(o.end_date=n(o.start_date,this.config.last_hour))):o.end_date=new Date(l.end_date);
var _=!1;o.start_date<this._max_date&&o.end_date>this._min_date&&o.start_date<o.end_date&&(a[d]=o,_=!0);var h=this._safe_copy(l);if(h.end_date=new Date(h.end_date),h.start_date<this._min_date?h.start_date=n(this._min_date,this.config.first_hour):h.start_date=n(s(l.start_date),this.config.first_hour),h.start_date<this._max_date&&h.start_date<h.end_date){if(!_){a[d--]=h;continue}a.splice(d+1,0,h)}}else a.splice(d--,1)}var c="move"==this._drag_mode?!1:i;return t.call(this,a,c)};var a=scheduler.get_visible_events;
scheduler.get_visible_events=function(e){return this.config.all_timed&&this.config.multi_day?a.call(this,!1):a.call(this,e)},scheduler.attachEvent("onBeforeViewChange",function(e,t,a,i){return scheduler._allow_dnd="day"==a||"week"==a,!0}),scheduler._is_main_area_event=function(t){return!!(t._timed||this.config.all_timed===!0||"short"==this.config.all_timed&&e(t))};var i=scheduler.updateEvent;scheduler.updateEvent=function(e){var t,a=scheduler.config.all_timed&&!(scheduler.isOneDayEvent(scheduler._events[e])||scheduler.getState().drag_id);
a&&(t=scheduler.config.update_render,scheduler.config.update_render=!0),i.apply(scheduler,arguments),a&&(scheduler.config.update_render=t)}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_all_timed.js.map
/*

@license
dhtmlxScheduler v.5.2.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){!function(){e.config.all_timed="short",e.config.all_timed_month=!1;var t=function(t){return!((t.end_date-t.start_date)/36e5>=24)||"resize"==e._drag_mode&&e._drag_id==t.id};e._safe_copy=function(t){var a=null,i=e._copy_event(t);return t.event_pid&&(a=e.getEvent(t.event_pid)),a&&a.isPrototypeOf(t)&&(delete i.event_length,delete i.event_pid,delete i.rec_pattern,delete i.rec_type),i};var a=e._pre_render_events_line,i=e._pre_render_events_table,n=function(e,t){
return this._table_view?i.call(this,e,t):a.call(this,e,t)};e._pre_render_events_line=e._pre_render_events_table=function(a,i){function r(e){var t=s(e.start_date);return+e.end_date>+t}function s(t){var a=e.date.add(t,1,"day");return a=e.date.date_part(a)}function o(t,a){var i=e.date.date_part(new Date(t));return i.setHours(a),i}if(!this.config.all_timed||this._table_view&&"month"!=this._mode||"month"==this._mode&&!this.config.all_timed_month)return n.call(this,a,i);for(var d=0;d<a.length;d++){
var l=a[d];if(!l._timed)if("short"!=this.config.all_timed||t(l)){var _=this._safe_copy(l);l._virtual?_._first_chunk=!1:_._first_chunk=!0,_._drag_resize=!1,_._virtual=!0,_.start_date=new Date(_.start_date),r(l)?(_.end_date=s(_.start_date),24!=this.config.last_hour&&(_.end_date=o(_.start_date,this.config.last_hour))):_.end_date=new Date(l.end_date);var h=!1;_.start_date<this._max_date&&_.end_date>this._min_date&&_.start_date<_.end_date&&(a[d]=_,h=!0);var c=this._safe_copy(l);if(c._virtual=!0,
c.end_date=new Date(c.end_date),c.start_date<this._min_date?c.start_date=o(this._min_date,this.config.first_hour):c.start_date=o(s(l.start_date),this.config.first_hour),c.start_date<this._max_date&&c.start_date<c.end_date){if(!h){a[d--]=c;continue}a.splice(d+1,0,c),c._last_chunk=!1}else _._last_chunk=!0,_._drag_resize=!0}else"month"!=this._mode&&a.splice(d--,1)}var u="move"!=this._drag_mode&&i;return n.call(this,a,u)};var r=e.get_visible_events;e.get_visible_events=function(e){
return this.config.all_timed&&this.config.multi_day?r.call(this,!1):r.call(this,e)},e.attachEvent("onBeforeViewChange",function(t,a,i,n){return e._allow_dnd="day"==i||"week"==i,!0}),e._is_main_area_event=function(e){return!!(e._timed||!0===this.config.all_timed||"short"==this.config.all_timed&&t(e))};var s=e.updateEvent;e.updateEvent=function(t){var a,i,n=e.getEvent(t);n&&(a=e.config.all_timed&&!(e.isOneDayEvent(e._events[t])||e.getState().drag_id))&&(i=e.config.update_render,
e.config.update_render=!0),s.apply(e,arguments),n&&a&&(e.config.update_render=i)}}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_all_timed.js.map
/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){!function(){e.config.all_timed="short",e.config.all_timed_month=!1;var t=function(t){return!((t.end_date-t.start_date)/36e5>=24)||"resize"==e._drag_mode&&e._drag_id==t.id};e._safe_copy=function(t){var i=null,a=e._copy_event(t);return t.event_pid&&(i=e.getEvent(t.event_pid)),i&&i.isPrototypeOf(t)&&(delete a.event_length,delete a.event_pid,delete a.rec_pattern,delete a.rec_type),a};var i=e._pre_render_events_line,a=e._pre_render_events_table,n=function(e,t){
return this._table_view?a.call(this,e,t):i.call(this,e,t)};e._pre_render_events_line=e._pre_render_events_table=function(i,a){function r(e){var t=s(e.start_date);return+e.end_date>+t}function s(t){var i=e.date.add(t,1,"day");return i=e.date.date_part(i)}function o(t,i){var a=e.date.date_part(new Date(t));return a.setHours(i),a}if(!this.config.all_timed||this._table_view&&"month"!=this._mode||"month"==this._mode&&!this.config.all_timed_month)return n.call(this,i,a);for(var d=0;d<i.length;d++){
var _=i[d];if(!_._timed)if("short"!=this.config.all_timed||t(_)){var l=this._safe_copy(_);_._virtual?l._first_chunk=!1:l._first_chunk=!0,l._drag_resize=!1,l._virtual=!0,l.start_date=new Date(l.start_date),r(_)?(l.end_date=s(l.start_date),24!=this.config.last_hour&&(l.end_date=o(l.start_date,this.config.last_hour))):l.end_date=new Date(_.end_date);var h=!1;l.start_date<this._max_date&&l.end_date>this._min_date&&l.start_date<l.end_date&&(i[d]=l,h=!0);var c=this._safe_copy(_);if(c._virtual=!0,
c.end_date=new Date(c.end_date),c.start_date<this._min_date?c.start_date=o(this._min_date,this.config.first_hour):c.start_date=o(s(_.start_date),this.config.first_hour),c.start_date<this._max_date&&c.start_date<c.end_date){if(!h){i[d--]=c;continue}i.splice(d+1,0,c),c._last_chunk=!1}else l._last_chunk=!0,l._drag_resize=!0}else"month"!=this._mode&&i.splice(d--,1)}var u="move"!=this._drag_mode&&a;return n.call(this,i,u)};var r=e.get_visible_events;e.get_visible_events=function(e){
return this.config.all_timed&&this.config.multi_day?r.call(this,!1):r.call(this,e)},e.attachEvent("onBeforeViewChange",function(t,i,a,n){return e._allow_dnd="day"==a||"week"==a,!0}),e._is_main_area_event=function(e){return!!(e._timed||!0===this.config.all_timed||"short"==this.config.all_timed&&t(e))};var s=e.updateEvent;e.updateEvent=function(t){var i,a,n=e.getEvent(t);n&&(i=e.config.all_timed&&!(e.isOneDayEvent(e._events[t])||e.getState().drag_id))&&(a=e.config.update_render,
e.config.update_render=!0),s.apply(e,arguments),n&&i&&(e.config.update_render=a)}}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_all_timed.js.map
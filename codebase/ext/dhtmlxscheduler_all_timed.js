/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(t){!function(){t.config.all_timed="short",t.config.all_timed_month=!1;var e=function(e){return!((e.end_date-e.start_date)/36e5>=24)||"resize"==t._drag_mode&&t._drag_id==e.id};t._safe_copy=function(e){var i=null,a=t._copy_event(e);return e.event_pid&&(i=t.getEvent(e.event_pid)),i&&i.isPrototypeOf(e)&&(delete a.event_length,delete a.event_pid,delete a.rec_pattern,delete a.rec_type),a};var i=t._pre_render_events_line,a=t._pre_render_events_table,n=function(t,e){
return this._table_view?a.call(this,t,e):i.call(this,t,e)};t._pre_render_events_line=t._pre_render_events_table=function(i,a){function r(t){var e=s(t.start_date);return+t.end_date>+e}function s(e){var i=t.date.add(e,1,"day");return i=t.date.date_part(i)}function o(e,i){var a=t.date.date_part(new Date(e));return a.setHours(i),a}if(!this.config.all_timed||this._table_view&&"month"!=this._mode||"month"==this._mode&&!this.config.all_timed_month)return n.call(this,i,a);for(var d=0;d<i.length;d++){
var _=i[d];if(!_._timed)if("short"!=this.config.all_timed||e(_)){var l=this._safe_copy(_);_._virtual?l._first_chunk=!1:l._first_chunk=!0,l._drag_resize=!1,l._virtual=!0,l.start_date=new Date(l.start_date),r(_)?(l.end_date=s(l.start_date),24!=this.config.last_hour&&(l.end_date=o(l.start_date,this.config.last_hour))):l.end_date=new Date(_.end_date);var h=!1;l.start_date<this._max_date&&l.end_date>this._min_date&&l.start_date<l.end_date&&(i[d]=l,h=!0);var c=this._safe_copy(_);if(c._virtual=!0,
c.end_date=new Date(c.end_date),c.start_date<this._min_date?c.start_date=o(this._min_date,this.config.first_hour):c.start_date=o(s(_.start_date),this.config.first_hour),c.start_date<this._max_date&&c.start_date<c.end_date){if(!h){i[d--]=c;continue}i.splice(d+1,0,c),c._last_chunk=!1}else l._last_chunk=!0,l._drag_resize=!0}else"month"!=this._mode&&i.splice(d--,1)}var u="move"!=this._drag_mode&&a;return n.call(this,i,u)};var r=t.get_visible_events;t.get_visible_events=function(t){
return this.config.all_timed&&this.config.multi_day?r.call(this,!1):r.call(this,t)},t.attachEvent("onBeforeViewChange",function(e,i,a,n){return t._allow_dnd="day"==a||"week"==a,!0}),t._is_main_area_event=function(t){return!!(t._timed||!0===this.config.all_timed||"short"==this.config.all_timed&&e(t))};var s=t.updateEvent;t.updateEvent=function(e){var i,a,n=t.getEvent(e);n&&(i=t.config.all_timed&&!(t.isOneDayEvent(t._events[e])||t.getState().drag_id))&&(a=t.config.update_render,
t.config.update_render=!0),s.apply(t,arguments),n&&i&&(t.config.update_render=a)}}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_all_timed.js.map
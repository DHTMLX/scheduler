/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(t){!function(){function e(e){t._get_section_view()&&e&&(i=t.getEvent(e)[t._get_section_property()])}var i,a;t.config.collision_limit=1,t.attachEvent("onBeforeDrag",function(t){return e(t),!0}),t.attachEvent("onBeforeLightbox",function(i){var n=t.getEvent(i);return a=[n.start_date,n.end_date],e(i),!0}),t.attachEvent("onEventChanged",function(e){if(!e||!t.getEvent(e))return!0;var i=t.getEvent(e);if(!t.checkCollision(i)){if(!a)return!1;i.start_date=a[0],i.end_date=a[1],
i._timed=this.isOneDayEvent(i)}return!0}),t.attachEvent("onBeforeEventChanged",function(e,i,a){return t.checkCollision(e)}),t.attachEvent("onEventAdded",function(e,i){t.checkCollision(i)||t.deleteEvent(e)}),t.attachEvent("onEventSave",function(e,i,a){if(i=t._lame_clone(i),i.id=e,!i.start_date||!i.end_date){var n=t.getEvent(e);i.start_date=new Date(n.start_date),i.end_date=new Date(n.end_date)}return i.rec_type&&t._roll_back_dates(i),t.checkCollision(i)}),
t._check_sections_collision=function(e,i){var a=t._get_section_property();return e[a]==i[a]&&e.id!=i.id},t.checkCollision=function(e){var a=[],n=t.config.collision_limit;if(e.rec_type)for(var r=t.getRecDates(e),s=0;s<r.length;s++)for(var o=t.getEvents(r[s].start_date,r[s].end_date),d=0;d<o.length;d++)(o[d].event_pid||o[d].id)!=e.id&&a.push(o[d]);else{a=t.getEvents(e.start_date,e.end_date);for(var _=0;_<a.length;_++){var l=a[_]
;if(l.id==e.id||l.event_length&&[l.event_pid,l.event_length].join("#")==e.id){a.splice(_,1);break}}}var h=t._get_section_view(),c=t._get_section_property(),u=!0;if(h){for(var g=0,_=0;_<a.length;_++)a[_].id!=e.id&&this._check_sections_collision(a[_],e)&&g++;g>=n&&(u=!1)}else a.length>=n&&(u=!1);if(!u){var f=!t.callEvent("onEventCollision",[e,a]);return f||(e[c]=i||e[c]),f}return u}}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_collision.js.map
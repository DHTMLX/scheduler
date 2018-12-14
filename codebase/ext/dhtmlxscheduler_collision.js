/*
@license
dhtmlxScheduler v.5.1.1 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var i=scheduler._get_section_view();i&&e&&(t=scheduler.getEvent(e)[scheduler._get_section_property()])}var t,i;scheduler.config.collision_limit=1,scheduler.attachEvent("onBeforeDrag",function(t){return e(t),!0}),scheduler.attachEvent("onBeforeLightbox",function(t){var a=scheduler.getEvent(t);return i=[a.start_date,a.end_date],e(t),!0}),scheduler.attachEvent("onEventChanged",function(e){if(!e||!scheduler.getEvent(e))return!0;var t=scheduler.getEvent(e);if(!scheduler.checkCollision(t)){
if(!i)return!1;t.start_date=i[0],t.end_date=i[1],t._timed=this.isOneDayEvent(t)}return!0}),scheduler.attachEvent("onBeforeEventChanged",function(e,t,i){return scheduler.checkCollision(e)}),scheduler.attachEvent("onEventAdded",function(e,t){var i=scheduler.checkCollision(t);i||scheduler.deleteEvent(e)}),scheduler.attachEvent("onEventSave",function(e,t,i){if(t=scheduler._lame_clone(t),t.id=e,!t.start_date||!t.end_date){var a=scheduler.getEvent(e);t.start_date=new Date(a.start_date),t.end_date=new Date(a.end_date);
}return t.rec_type&&scheduler._roll_back_dates(t),scheduler.checkCollision(t)}),scheduler._check_sections_collision=function(e,t){var i=scheduler._get_section_property();return e[i]==t[i]&&e.id!=t.id?!0:!1},scheduler.checkCollision=function(e){var i=[],a=scheduler.config.collision_limit;if(e.rec_type)for(var r=scheduler.getRecDates(e),s=0;s<r.length;s++)for(var n=scheduler.getEvents(r[s].start_date,r[s].end_date),d=0;d<n.length;d++)(n[d].event_pid||n[d].id)!=e.id&&i.push(n[d]);else{i=scheduler.getEvents(e.start_date,e.end_date);
for(var l=0;l<i.length;l++){var o=i[l];if(o.id==e.id||o.event_length&&[o.event_pid,o.event_length].join("#")==e.id){i.splice(l,1);break}}}var h=scheduler._get_section_view(),_=scheduler._get_section_property(),c=!0;if(h){for(var u=0,l=0;l<i.length;l++)i[l].id!=e.id&&this._check_sections_collision(i[l],e)&&u++;u>=a&&(c=!1)}else i.length>=a&&(c=!1);if(!c){var g=!scheduler.callEvent("onEventCollision",[e,i]);return g||(e[_]=t||e[_]),g}return c}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_collision.js.map
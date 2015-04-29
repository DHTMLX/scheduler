/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var a=scheduler._get_section_view();a&&e&&(t=scheduler.getEvent(e)[scheduler._get_section_property()])}var t,a;scheduler.config.collision_limit=1,scheduler.attachEvent("onBeforeDrag",function(t){return e(t),!0}),scheduler.attachEvent("onBeforeLightbox",function(t){var i=scheduler.getEvent(t);return a=[i.start_date,i.end_date],e(t),!0}),scheduler.attachEvent("onEventChanged",function(e){if(!e||!scheduler.getEvent(e))return!0;var t=scheduler.getEvent(e);if(!scheduler.checkCollision(t)){
if(!a)return!1;t.start_date=a[0],t.end_date=a[1],t._timed=this.isOneDayEvent(t)}return!0}),scheduler.attachEvent("onBeforeEventChanged",function(e,t,a){return scheduler.checkCollision(e)}),scheduler.attachEvent("onEventAdded",function(e,t){var a=scheduler.checkCollision(t);a||scheduler.deleteEvent(e)}),scheduler.attachEvent("onEventSave",function(e,t,a){if(t=scheduler._lame_clone(t),t.id=e,!t.start_date||!t.end_date){var i=scheduler.getEvent(e);t.start_date=new Date(i.start_date),t.end_date=new Date(i.end_date);

}return t.rec_type&&scheduler._roll_back_dates(t),scheduler.checkCollision(t)}),scheduler._check_sections_collision=function(e,t){var a=scheduler._get_section_property();return e[a]==t[a]&&e.id!=t.id?!0:!1},scheduler.checkCollision=function(e){var a=[],i=scheduler.config.collision_limit;if(e.rec_type)for(var n=scheduler.getRecDates(e),r=0;r<n.length;r++)for(var l=scheduler.getEvents(n[r].start_date,n[r].end_date),d=0;d<l.length;d++)(l[d].event_pid||l[d].id)!=e.id&&a.push(l[d]);else{a=scheduler.getEvents(e.start_date,e.end_date);

for(var o=0;o<a.length;o++)if(a[o].id==e.id){a.splice(o,1);break}}var s=scheduler._get_section_view(),_=scheduler._get_section_property(),c=!0;if(s){for(var u=0,o=0;o<a.length;o++)a[o].id!=e.id&&this._check_sections_collision(a[o],e)&&u++;u>=i&&(c=!1)}else a.length>=i&&(c=!1);if(!c){var h=!scheduler.callEvent("onEventCollision",[e,a]);return h||(e[_]=t||e[_]),h}return c}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_collision.js.map
/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){!function(){function t(t){e._get_section_view()&&t&&(i=e.getEvent(t)[e._get_section_property()])}var i,a;e.config.collision_limit=1,e.attachEvent("onBeforeDrag",function(e){return t(e),!0}),e.attachEvent("onBeforeLightbox",function(i){var n=e.getEvent(i);return a=[n.start_date,n.end_date],t(i),!0}),e.attachEvent("onEventChanged",function(t){if(!t||!e.getEvent(t))return!0;var i=e.getEvent(t);if(!e.checkCollision(i)){if(!a)return!1;i.start_date=a[0],i.end_date=a[1],
i._timed=this.isOneDayEvent(i)}return!0}),e.attachEvent("onBeforeEventChanged",function(t,i,a){return e.checkCollision(t)}),e.attachEvent("onEventAdded",function(t,i){e.checkCollision(i)||e.deleteEvent(t)}),e.attachEvent("onEventSave",function(t,i,a){if(i=e._lame_clone(i),i.id=t,!i.start_date||!i.end_date){var n=e.getEvent(t);i.start_date=new Date(n.start_date),i.end_date=new Date(n.end_date)}return i.rec_type&&e._roll_back_dates(i),e.checkCollision(i)}),
e._check_sections_collision=function(t,i){var a=e._get_section_property();return t[a]==i[a]&&t.id!=i.id},e.checkCollision=function(t){var a=[],n=e.config.collision_limit;if(t.rec_type)for(var r=e.getRecDates(t),s=0;s<r.length;s++)for(var o=e.getEvents(r[s].start_date,r[s].end_date),d=0;d<o.length;d++)(o[d].event_pid||o[d].id)!=t.id&&a.push(o[d]);else{a=e.getEvents(t.start_date,t.end_date);for(var _=0;_<a.length;_++){var l=a[_]
;if(l.id==t.id||l.event_length&&[l.event_pid,l.event_length].join("#")==t.id){a.splice(_,1);break}}}var h=e._get_section_view(),c=e._get_section_property(),u=!0;if(h){for(var f=0,_=0;_<a.length;_++)a[_].id!=t.id&&this._check_sections_collision(a[_],t)&&f++;f>=n&&(u=!1)}else a.length>=n&&(u=!1);if(!u){var g=!e.callEvent("onEventCollision",[t,a]);return g||(t[c]=i||t[c]),g}return u}}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_collision.js.map
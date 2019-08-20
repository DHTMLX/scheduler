/*

@license
dhtmlxScheduler v.5.2.3 Stardard
To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){!function(){function t(t){e._get_section_view()&&t&&(a=e.getEvent(t)[e._get_section_property()])}var a,i;e.config.collision_limit=1,e.attachEvent("onBeforeDrag",function(e){return t(e),!0}),e.attachEvent("onBeforeLightbox",function(a){var n=e.getEvent(a);return i=[n.start_date,n.end_date],t(a),!0}),e.attachEvent("onEventChanged",function(t){if(!t||!e.getEvent(t))return!0;var a=e.getEvent(t);if(!e.checkCollision(a)){if(!i)return!1;a.start_date=i[0],a.end_date=i[1],
a._timed=this.isOneDayEvent(a)}return!0}),e.attachEvent("onBeforeEventChanged",function(t,a,i){return e.checkCollision(t)}),e.attachEvent("onEventAdded",function(t,a){e.checkCollision(a)||e.deleteEvent(t)}),e.attachEvent("onEventSave",function(t,a,i){if(a=e._lame_clone(a),a.id=t,!a.start_date||!a.end_date){var n=e.getEvent(t);a.start_date=new Date(n.start_date),a.end_date=new Date(n.end_date)}return a.rec_type&&e._roll_back_dates(a),e.checkCollision(a)}),
e._check_sections_collision=function(t,a){var i=e._get_section_property();return t[i]==a[i]&&t.id!=a.id},e.checkCollision=function(t){var i=[],n=e.config.collision_limit;if(t.rec_type)for(var r=e.getRecDates(t),s=0;s<r.length;s++)for(var o=e.getEvents(r[s].start_date,r[s].end_date),d=0;d<o.length;d++)(o[d].event_pid||o[d].id)!=t.id&&i.push(o[d]);else{i=e.getEvents(t.start_date,t.end_date);for(var l=0;l<i.length;l++){var _=i[l]
;if(_.id==t.id||_.event_length&&[_.event_pid,_.event_length].join("#")==t.id){i.splice(l,1);break}}}var h=e._get_section_view(),c=e._get_section_property(),u=!0;if(h){for(var v=0,l=0;l<i.length;l++)i[l].id!=t.id&&this._check_sections_collision(i[l],t)&&v++;v>=n&&(u=!1)}else i.length>=n&&(u=!1);if(!u){var p=!e.callEvent("onEventCollision",[t,i]);return p||(t[c]=a||t[c]),p}return u}}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_collision.js.map
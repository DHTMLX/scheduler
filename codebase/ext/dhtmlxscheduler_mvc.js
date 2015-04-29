/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var t={};for(var a in e)0!==a.indexOf("_")&&(t[a]=e[a]);return d.use_id||delete t.id,t}function t(){clearTimeout(i),i=setTimeout(function(){scheduler.updateView()},1)}function a(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function r(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function n(e){return d.use_id?e.id:e.cid}var i,d={use_id:!1};scheduler.backbone=function(i,l){function s(){o.length&&(scheduler.parse(o,"json"),
o=[])}l&&(d=l),i.bind("change",function(e,a){var r=n(e),i=scheduler._events[r]=e.toJSON();i.id=r,scheduler._init_event(i),t()}),i.bind("remove",function(e,t){var a=n(e);scheduler._events[a]&&scheduler.deleteEvent(a)});var o=[];i.bind("add",function(e,t){var a=n(e);if(!scheduler._events[a]){var r=e.toJSON();r.id=a,scheduler._init_event(r),o.push(r),1==o.length&&setTimeout(s,1)}}),i.bind("request",function(e){e instanceof Backbone.Collection&&a(scheduler)}),i.bind("sync",function(e){e instanceof Backbone.Collection&&r(scheduler);

}),i.bind("error",function(e){e instanceof Backbone.Collection&&r(scheduler)}),scheduler.attachEvent("onEventCreated",function(e){var t=new i.model(scheduler.getEvent(e));return scheduler._events[e]=t.toJSON(),scheduler._events[e].id=e,!0}),scheduler.attachEvent("onEventAdded",function(t){if(!i.get(t)){var a=e(scheduler.getEvent(t)),r=new i.model(a),d=n(r);d!=t&&this.changeEventId(t,d),i.add(r),i.trigger("scheduler:add",r)}return!0}),scheduler.attachEvent("onEventChanged",function(t){var a=i.get(t),r=e(scheduler.getEvent(t));

return a.set(r),i.trigger("scheduler:change",a),!0}),scheduler.attachEvent("onEventDeleted",function(e){var t=i.get(e);return t&&(i.trigger("scheduler:remove",t),i.remove(e)),!0})}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_mvc.js.map
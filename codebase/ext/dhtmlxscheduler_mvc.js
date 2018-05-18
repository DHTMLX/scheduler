/*
@license
dhtmlxScheduler v.5.0.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var t={};for(var a in e)0!==a.indexOf("_")&&(t[a]=e[a]);return s.use_id||delete t.id,t}function t(){clearTimeout(n),n=setTimeout(function(){scheduler.updateView()},1)}function a(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function r(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function i(e){return s.use_id?e.id:e.cid}var n,s={use_id:!1};scheduler.backbone=function(n,d){function l(){o.length&&(scheduler.parse(o,"json"),
o=[])}d&&(s=d),n.bind("change",function(e,a){var r=i(e),n=scheduler._events[r]=e.toJSON();n.id=r,scheduler._init_event(n),t()}),n.bind("remove",function(e,t){var a=i(e);scheduler._events[a]&&scheduler.deleteEvent(a)});var o=[];n.bind("add",function(e,t){var a=i(e);if(!scheduler._events[a]){var r=e.toJSON();r.id=a,scheduler._init_event(r),o.push(r),1==o.length&&setTimeout(l,1)}}),n.bind("request",function(e){e instanceof Backbone.Collection&&a(scheduler)}),n.bind("sync",function(e){e instanceof Backbone.Collection&&r(scheduler);
}),n.bind("error",function(e){e instanceof Backbone.Collection&&r(scheduler)}),scheduler.attachEvent("onEventCreated",function(e){var t=new n.model(scheduler.getEvent(e));return scheduler._events[e]=t.toJSON(),scheduler._events[e].id=e,!0}),scheduler.attachEvent("onEventAdded",function(t){if(!n.get(t)){var a=e(scheduler.getEvent(t)),r=new n.model(a),s=i(r);s!=t&&this.changeEventId(t,s),n.add(r),n.trigger("scheduler:add",r)}return!0}),scheduler.attachEvent("onEventChanged",function(t){var a=n.get(t),r=e(scheduler.getEvent(t));
return a.set(r),n.trigger("scheduler:change",a),!0}),scheduler.attachEvent("onEventDeleted",function(e){var t=n.get(e);return t&&(n.trigger("scheduler:remove",t),n.remove(e)),!0})}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_mvc.js.map
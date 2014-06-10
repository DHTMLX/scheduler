/*
dhtmlxScheduler v.4.1.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var t={};for(var s in e)0!==s.indexOf("_")&&(t[s]=e[s]);return i.use_id||delete t.id,t}function t(){clearTimeout(n),n=setTimeout(function(){scheduler.updateView()},1)}function s(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function r(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function a(e){return i.use_id?e.id:e.cid}var n,i={use_id:!1};scheduler.backbone=function(n,d){function l(){o.length&&(scheduler.parse(o,"json"),o=[])
}d&&(i=d),n.bind("change",function(e){var s=a(e),r=scheduler._events[s]=e.toJSON();r.id=s,scheduler._init_event(r),t()}),n.bind("remove",function(e){var t=a(e);scheduler._events[t]&&scheduler.deleteEvent(t)});var o=[];n.bind("add",function(e){var t=a(e);if(!scheduler._events[t]){var s=e.toJSON();s.id=t,scheduler._init_event(s),o.push(s),1==o.length&&setTimeout(l,1)}}),n.bind("request",function(e){e instanceof Backbone.Collection&&s(scheduler)}),n.bind("sync",function(e){e instanceof Backbone.Collection&&r(scheduler)
}),n.bind("error",function(e){e instanceof Backbone.Collection&&r(scheduler)}),scheduler.attachEvent("onEventCreated",function(e){var t=new n.model(scheduler.getEvent(e));return scheduler._events[e]=t.toJSON(),scheduler._events[e].id=e,!0}),scheduler.attachEvent("onEventAdded",function(t){if(!n.get(t)){var s=e(scheduler.getEvent(t)),r=new n.model(s),i=a(r);i!=t&&this.changeEventId(t,i),n.add(r),n.trigger("scheduler:add",r)}return!0}),scheduler.attachEvent("onEventChanged",function(t){var s=n.get(t),r=e(scheduler.getEvent(t));
return s.set(r),n.trigger("scheduler:change",s),!0}),scheduler.attachEvent("onEventDeleted",function(e){var t=n.get(e);return t&&(n.trigger("scheduler:remove",t),n.remove(e)),!0})}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_mvc.js.map
/*
dhtmlxScheduler v.4.2.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var t={};for(var s in e)0!==s.indexOf("_")&&(t[s]=e[s]);return n.use_id||delete t.id,t}function t(){clearTimeout(i),i=setTimeout(function(){scheduler.updateView()},1)}function s(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function r(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function a(e){return n.use_id?e.id:e.cid}var i,n={use_id:!1};scheduler.backbone=function(i,d){function l(){o.length&&(scheduler.parse(o,"json"),o=[])
}d&&(n=d),i.bind("change",function(e){var s=a(e),r=scheduler._events[s]=e.toJSON();r.id=s,scheduler._init_event(r),t()}),i.bind("remove",function(e){var t=a(e);scheduler._events[t]&&scheduler.deleteEvent(t)});var o=[];i.bind("add",function(e){var t=a(e);if(!scheduler._events[t]){var s=e.toJSON();s.id=t,scheduler._init_event(s),o.push(s),1==o.length&&setTimeout(l,1)}}),i.bind("request",function(e){e instanceof Backbone.Collection&&s(scheduler)}),i.bind("sync",function(e){e instanceof Backbone.Collection&&r(scheduler)
}),i.bind("error",function(e){e instanceof Backbone.Collection&&r(scheduler)}),scheduler.attachEvent("onEventCreated",function(e){var t=new i.model(scheduler.getEvent(e));return scheduler._events[e]=t.toJSON(),scheduler._events[e].id=e,!0}),scheduler.attachEvent("onEventAdded",function(t){if(!i.get(t)){var s=e(scheduler.getEvent(t)),r=new i.model(s),n=a(r);n!=t&&this.changeEventId(t,n),i.add(r),i.trigger("scheduler:add",r)}return!0}),scheduler.attachEvent("onEventChanged",function(t){var s=i.get(t),r=e(scheduler.getEvent(t));
return s.set(r),i.trigger("scheduler:change",s),!0}),scheduler.attachEvent("onEventDeleted",function(e){var t=i.get(e);return t&&(i.trigger("scheduler:remove",t),i.remove(e)),!0})}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_mvc.js.map
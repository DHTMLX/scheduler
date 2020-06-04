/*

@license
dhtmlxScheduler v.5.3.9 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){!function(){function t(e){var t={};for(var a in e)0!==a.indexOf("_")&&(t[a]=e[a]);return d.use_id||delete t.id,t}function a(){clearTimeout(o),o=setTimeout(function(){e.updateView()},1)}function n(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function i(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function r(e){return d.use_id?e.id:e.cid}var o,d={use_id:!1};e.backbone=function(o,s){function _(){
l.length&&(e.parse(l,"json"),l=[])}s&&(d=s),o.bind("change",function(t,n){var i=r(t),o=e._events[i]=t.toJSON();o.id=i,e._init_event(o),a()}),o.bind("remove",function(t,a){var n=r(t);e._events[n]&&e.deleteEvent(n)});var l=[];o.bind("add",function(t,a){var n=r(t);if(!e._events[n]){var i=t.toJSON();i.id=n,e._init_event(i),l.push(i),1==l.length&&setTimeout(_,1)}}),o.bind("request",function(t){t instanceof Backbone.Collection&&n(e)}),o.bind("sync",function(t){t instanceof Backbone.Collection&&i(e)}),
o.bind("error",function(t){t instanceof Backbone.Collection&&i(e)}),e.attachEvent("onEventCreated",function(t){var a=new o.model(e.getEvent(t));return e._events[t]=a.toJSON(),e._events[t].id=t,!0}),e.attachEvent("onEventAdded",function(a){if(!o.get(a)){var n=t(e.getEvent(a)),i=new o.model(n),d=r(i);d!=a&&this.changeEventId(a,d),o.add(i),o.trigger("scheduler:add",i)}return!0}),e.attachEvent("onEventChanged",function(a){var n=o.get(a),i=t(e.getEvent(a));return n.set(i),
o.trigger("scheduler:change",n),!0}),e.attachEvent("onEventDeleted",function(e){var t=o.get(e);return t&&(o.trigger("scheduler:remove",t),o.remove(e)),!0})}}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_mvc.js.map
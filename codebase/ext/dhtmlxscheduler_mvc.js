/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in non-GPL project. Please contact sales@dhtmlx.com for details
*/
(function(){function d(a){var b={},c;for(c in a)c.indexOf("_")!==0&&(b[c]=a[c]);return b}function f(){clearTimeout(e);e=setTimeout(function(){scheduler.updateView()},1)}var e;scheduler.backbone=function(){events.bind("reset",function(){scheduler.clearAll();scheduler.parse(events.toJSON(),"json")});events.bind("change",function(a,b){if(b.changes&&b.changes.id){var c=a.previous("id");scheduler.changeEventId(c,a.id)}var d=a.id;scheduler._init_event(scheduler._events[d]=a.toJSON());f()});events.bind("remove",
function(a){scheduler._events[a.id]&&scheduler.deleteEvent(a.id)});events.bind("add",function(a){if(!scheduler._events[a.id]){var b=a.toJSON();scheduler._init_event(b);scheduler.addEvent(b)}});scheduler.attachEvent("onEventCreated",function(a){var b=new events.model(scheduler.getEvent(a));scheduler._events[a]=b.toJSON();return!0});scheduler.attachEvent("onEventAdded",function(a){events.get(a)||events.add(new events.model(d(scheduler.getEvent(a))));return!0});scheduler.attachEvent("onEventChanged",
function(a){var b=events.get(a),c=d(scheduler.getEvent(a));b.set(c);return!0});scheduler.attachEvent("onEventDeleted",function(a){events.get(a)&&events.remove(a);return!0})}})();

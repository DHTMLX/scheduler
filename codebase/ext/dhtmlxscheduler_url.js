/*
@license

dhtmlxScheduler v.5.2.0 Stardard
This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.

*/
Scheduler.plugin(function(e){e._get_url_nav=function(){for(var e={},t=(document.location.hash||"").replace("#","").split(","),a=0;a<t.length;a++){var n=t[a].split("=");2==n.length&&(e[n[0]]=n[1])}return e},e.attachEvent("onTemplatesReady",function(){function t(t){r=t,e.getEvent(t)&&e.showEvent(t)}var a=!0,n=e.date.str_to_date("%Y-%m-%d"),i=e.date.date_to_str("%Y-%m-%d"),r=e._get_url_nav().event||null;e.attachEvent("onAfterEventDisplay",function(e){return r=null,!0}),
e.attachEvent("onBeforeViewChange",function(o,l,d,_){if(a){a=!1;var s=e._get_url_nav();if(s.event)try{if(e.getEvent(s.event))return t(s.event),!1;var c=e.attachEvent("onXLE",function(){t(s.event),e.detachEvent(c)})}catch(e){}if(s.date||s.mode){try{this.setCurrentView(s.date?n(s.date):null,s.mode||null)}catch(e){this.setCurrentView(s.date?n(s.date):null,d)}return!1}}var u=["date="+i(_||l),"mode="+(d||o)];r&&u.push("event="+r);var h="#"+u.join(",");return document.location.hash=h,!0})})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_url.js.map
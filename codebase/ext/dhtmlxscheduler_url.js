/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._get_url_nav=function(){for(var e={},t=(document.location.hash||"").replace("#","").split(","),a=0;a<t.length;a++){var r=t[a].split("=");2==r.length&&(e[r[0]]=r[1])}return e},scheduler.attachEvent("onTemplatesReady",function(){function e(e){n=e,scheduler.getEvent(e)&&scheduler.showEvent(e)}var t=!0,a=scheduler.date.str_to_date("%Y-%m-%d"),r=scheduler.date.date_to_str("%Y-%m-%d"),n=scheduler._get_url_nav().event||null;scheduler.attachEvent("onAfterEventDisplay",function(e){return n=null,
!0}),scheduler.attachEvent("onBeforeViewChange",function(i,l,d,s){if(t){t=!1;var o=scheduler._get_url_nav();if(o.event)try{if(scheduler.getEvent(o.event))return e(o.event),!1;var _=scheduler.attachEvent("onXLE",function(){e(o.event),scheduler.detachEvent(_)})}catch(c){}if(o.date||o.mode){try{this.setCurrentView(o.date?a(o.date):null,o.mode||null)}catch(c){this.setCurrentView(o.date?a(o.date):null,d)}return!1}}var h=["date="+r(s||l),"mode="+(d||i)];n&&h.push("event="+n);var u="#"+h.join(",");return document.location.hash=u,
!0})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_url.js.map
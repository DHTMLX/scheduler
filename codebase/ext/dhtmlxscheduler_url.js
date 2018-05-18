/*
@license
dhtmlxScheduler v.5.0.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._get_url_nav=function(){for(var e={},t=(document.location.hash||"").replace("#","").split(","),r=0;r<t.length;r++){var a=t[r].split("=");2==a.length&&(e[a[0]]=a[1])}return e},scheduler.attachEvent("onTemplatesReady",function(){function e(e){i=e,scheduler.getEvent(e)&&scheduler.showEvent(e)}var t=!0,r=scheduler.date.str_to_date("%Y-%m-%d"),a=scheduler.date.date_to_str("%Y-%m-%d"),i=scheduler._get_url_nav().event||null;scheduler.attachEvent("onAfterEventDisplay",function(e){return i=null,
!0}),scheduler.attachEvent("onBeforeViewChange",function(n,s,d,l){if(t){t=!1;var o=scheduler._get_url_nav();if(o.event)try{if(scheduler.getEvent(o.event))return e(o.event),!1;var _=scheduler.attachEvent("onXLE",function(){e(o.event),scheduler.detachEvent(_)})}catch(c){}if(o.date||o.mode){try{this.setCurrentView(o.date?r(o.date):null,o.mode||null)}catch(c){this.setCurrentView(o.date?r(o.date):null,d)}return!1}}var h=["date="+a(l||s),"mode="+(d||n)];i&&h.push("event="+i);var u="#"+h.join(",");return document.location.hash=u,
!0})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_url.js.map
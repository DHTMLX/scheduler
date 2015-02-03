/*
dhtmlxScheduler v.4.3.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._get_url_nav=function(){for(var e={},t=(document.location.hash||"").replace("#","").split(","),r=0;r<t.length;r++){var s=t[r].split("=");2==s.length&&(e[s[0]]=s[1])}return e},scheduler.attachEvent("onTemplatesReady",function(){function e(e){a=e,scheduler.getEvent(e)&&scheduler.showEvent(e)}var t=!0,r=scheduler.date.str_to_date("%Y-%m-%d"),s=scheduler.date.date_to_str("%Y-%m-%d"),a=scheduler._get_url_nav().event||null;scheduler.attachEvent("onAfterEventDisplay",function(){return a=null,!0
}),scheduler.attachEvent("onBeforeViewChange",function(n,i,d,l){if(t){t=!1;var _=scheduler._get_url_nav();if(_.event)try{if(scheduler.getEvent(_.event))return e(_.event),!1;var o=scheduler.attachEvent("onXLE",function(){e(_.event),scheduler.detachEvent(o)})}catch(c){}if(_.date||_.mode){try{this.setCurrentView(_.date?r(_.date):null,_.mode||null)}catch(c){this.setCurrentView(_.date?r(_.date):null,d)}return!1}}var h=["date="+s(l||i),"mode="+(d||n)];a&&h.push("event="+a);var u="#"+h.join(",");return document.location.hash=u,!0
})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_url.js.map
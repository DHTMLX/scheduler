/*
dhtmlxScheduler v.4.1.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady",function(){var e=!0,t=scheduler.date.str_to_date("%Y-%m-%d"),r=scheduler.date.date_to_str("%Y-%m-%d");scheduler.attachEvent("onBeforeViewChange",function(s,a,i,n){if(e){e=!1;for(var d={},l=(document.location.hash||"").replace("#","").split(","),o=0;o<l.length;o++){var _=l[o].split("=");2==_.length&&(d[_[0]]=_[1])}if(d.date||d.mode){try{this.setCurrentView(d.date?t(d.date):null,d.mode||null)}catch(c){this.setCurrentView(d.date?t(d.date):null,i)}return!1}}var h="#date="+r(n||a)+",mode="+(i||s);
return document.location.hash=h,!0})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_url.js.map
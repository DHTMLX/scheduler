/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){!function(){function t(e,t,i){var a=e+"="+i+(t?"; "+t:"");document.cookie=a}function i(e){var t=e+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(t);if(-1!=i){i+=t.length;var a=document.cookie.indexOf(";",i);return-1==a&&(a=document.cookie.length),document.cookie.substring(i,a)}}return""}var a=!0;e.attachEvent("onBeforeViewChange",function(n,r,s,o){if(a&&e._get_url_nav){var d=e._get_url_nav();(d.date||d.mode||d.event)&&(a=!1)}
var _=(e._obj.id||"scheduler")+"_settings";if(a){a=!1;var l=i(_);if(l){e._min_date||(e._min_date=o),l=unescape(l).split("@"),l[0]=this._helpers.parseDate(l[0]);var h=this.isViewExists(l[1])?l[1]:s,c=isNaN(+l[0])?o:l[0];return window.setTimeout(function(){e.setCurrentView(c,h)},1),!1}}return t(_,"expires=Sun, 31 Jan 9999 22:00:00 GMT",escape(this._helpers.formatDate(o||r)+"@"+(s||n))),!0});var n=e._load;e._load=function(){var t=arguments;if(e._date)n.apply(this,t);else{var i=this
;window.setTimeout(function(){n.apply(i,t)},1)}}}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_cookie.js.map
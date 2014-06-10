/*
dhtmlxScheduler v.4.1.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e,t,i){var s=e+"="+i+(t?"; "+t:"");document.cookie=s}function t(e){var t=e+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(t);if(-1!=i){i+=t.length;var s=document.cookie.indexOf(";",i);return-1==s&&(s=document.cookie.length),document.cookie.substring(i,s)}}return""}var i=!0;scheduler.attachEvent("onBeforeViewChange",function(s,n,a,r){if(i){i=!1;var d=t("scheduler_settings");if(d){scheduler._min_date||(scheduler._min_date=r),d=unescape(d).split("@"),d[0]=this.templates.xml_date(d[0]);
var o=this.isViewExists(d[1])?d[1]:a,l=isNaN(+d[0])?r:d[0];return window.setTimeout(function(){scheduler.setCurrentView(l,o)},1),!1}}var h=escape(this.templates.xml_format(r||n)+"@"+(a||s));return e("scheduler_settings","expires=Sun, 31 Jan 9999 22:00:00 GMT",h),!0});var s=scheduler._load;scheduler._load=function(){var e=arguments;if(!scheduler._date&&scheduler._load_mode){var t=this;window.setTimeout(function(){s.apply(t,e)},1)}else s.apply(this,e)}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_cookie.js.map
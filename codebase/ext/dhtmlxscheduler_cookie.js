/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e,t,i){var a=e+"="+i+(t?"; "+t:"");document.cookie=a}function t(e){var t=e+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(t);if(-1!=i){i+=t.length;var a=document.cookie.indexOf(";",i);return-1==a&&(a=document.cookie.length),document.cookie.substring(i,a)}}return""}var i=!0;scheduler.attachEvent("onBeforeViewChange",function(a,r,s,n){if(i&&scheduler._get_url_nav){var d=scheduler._get_url_nav();(d.date||d.mode||d.event)&&(i=!1)}if(i){i=!1;var l=t("scheduler_settings");
if(l){scheduler._min_date||(scheduler._min_date=n),l=unescape(l).split("@"),l[0]=this.templates.xml_date(l[0]);var o=this.isViewExists(l[1])?l[1]:s,h=isNaN(+l[0])?n:l[0];return window.setTimeout(function(){scheduler.setCurrentView(h,o)},1),!1}}var _=escape(this.templates.xml_format(n||r)+"@"+(s||a));return e("scheduler_settings","expires=Sun, 31 Jan 9999 22:00:00 GMT",_),!0});var a=scheduler._load;scheduler._load=function(){var e=arguments;if(!scheduler._date&&scheduler._load_mode){var t=this;window.setTimeout(function(){
a.apply(t,e)},1)}else a.apply(this,e)}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_cookie.js.map
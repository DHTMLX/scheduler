/*
@license
dhtmlxScheduler v.5.1.1 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e,t,a){var i=e+"="+a+(t?"; "+t:"");document.cookie=i}function t(e){var t=e+"=";if(document.cookie.length>0){var a=document.cookie.indexOf(t);if(-1!=a){a+=t.length;var i=document.cookie.indexOf(";",a);return-1==i&&(i=document.cookie.length),document.cookie.substring(a,i)}}return""}var a=!0;scheduler.attachEvent("onBeforeViewChange",function(i,n,r,l){if(a&&scheduler._get_url_nav){var o=scheduler._get_url_nav();(o.date||o.mode||o.event)&&(a=!1)}if(a){a=!1;var d=t("scheduler_settings");
if(d){scheduler._min_date||(scheduler._min_date=l),d=unescape(d).split("@"),d[0]=this.templates.xml_date(d[0]);var s=this.isViewExists(d[1])?d[1]:r,_=isNaN(+d[0])?l:d[0];return window.setTimeout(function(){scheduler.setCurrentView(_,s)},1),!1}}var c=escape(this.templates.xml_format(l||n)+"@"+(r||i));return e("scheduler_settings","expires=Sun, 31 Jan 9999 22:00:00 GMT",c),!0});var i=scheduler._load;scheduler._load=function(){var e=arguments;if(scheduler._date)i.apply(this,e);else{var t=this;window.setTimeout(function(){
i.apply(t,e)},1)}}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_cookie.js.map
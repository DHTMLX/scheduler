/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e,t,a){var i=e+"="+a+(t?"; "+t:"");document.cookie=i}function t(e){var t=e+"=";if(document.cookie.length>0){var a=document.cookie.indexOf(t);if(-1!=a){a+=t.length;var i=document.cookie.indexOf(";",a);return-1==i&&(i=document.cookie.length),document.cookie.substring(a,i)}}return""}var a=!0;scheduler.attachEvent("onBeforeViewChange",function(i,n,l,r){if(a&&scheduler._get_url_nav){var d=scheduler._get_url_nav();(d.date||d.mode||d.event)&&(a=!1)}if(a){a=!1;var o=t("scheduler_settings");

if(o){scheduler._min_date||(scheduler._min_date=r),o=unescape(o).split("@"),o[0]=this.templates.xml_date(o[0]);var s=this.isViewExists(o[1])?o[1]:l,_=isNaN(+o[0])?r:o[0];return window.setTimeout(function(){scheduler.setCurrentView(_,s)},1),!1}}var c=escape(this.templates.xml_format(r||n)+"@"+(l||i));return e("scheduler_settings","expires=Sun, 31 Jan 9999 22:00:00 GMT",c),!0});var i=scheduler._load;scheduler._load=function(){var e=arguments;if(!scheduler._date&&scheduler._load_mode){var t=this;window.setTimeout(function(){
i.apply(t,e)},1)}else i.apply(this,e)}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_cookie.js.map
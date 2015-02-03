/*
dhtmlxScheduler v.4.3.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e,t,s){var i=e+"="+s+(t?"; "+t:"");document.cookie=i}function t(e){var t=e+"=";if(document.cookie.length>0){var s=document.cookie.indexOf(t);if(-1!=s){s+=t.length;var i=document.cookie.indexOf(";",s);return-1==i&&(i=document.cookie.length),document.cookie.substring(s,i)}}return""}var s=!0;scheduler.attachEvent("onBeforeViewChange",function(i,a,n,r){if(s&&scheduler._get_url_nav){var d=scheduler._get_url_nav();(d.date||d.mode||d.event)&&(s=!1)}if(s){s=!1;var l=t("scheduler_settings");
if(l){scheduler._min_date||(scheduler._min_date=r),l=unescape(l).split("@"),l[0]=this.templates.xml_date(l[0]);var o=this.isViewExists(l[1])?l[1]:n,h=isNaN(+l[0])?r:l[0];return window.setTimeout(function(){scheduler.setCurrentView(h,o)},1),!1}}var _=escape(this.templates.xml_format(r||a)+"@"+(n||i));return e("scheduler_settings","expires=Sun, 31 Jan 9999 22:00:00 GMT",_),!0});var i=scheduler._load;scheduler._load=function(){var e=arguments;if(!scheduler._date&&scheduler._load_mode){var t=this;window.setTimeout(function(){i.apply(t,e)
},1)}else i.apply(this,e)}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_cookie.js.map
/*
@license

dhtmlxScheduler v.5.2.0 Stardard
This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.

*/
Scheduler.plugin(function(e){!function(){function t(e,t,a){var i=e+"="+a+(t?"; "+t:"");document.cookie=i}function a(e){var t=e+"=";if(document.cookie.length>0){var a=document.cookie.indexOf(t);if(-1!=a){a+=t.length;var i=document.cookie.indexOf(";",a);return-1==i&&(i=document.cookie.length),document.cookie.substring(a,i)}}return""}var i=!0;e.attachEvent("onBeforeViewChange",function(n,r,o,s){if(i&&e._get_url_nav){var d=e._get_url_nav();(d.date||d.mode||d.event)&&(i=!1)}
var l=(e._obj.id||"scheduler")+"_settings";if(i){i=!1;var _=a(l);if(_){e._min_date||(e._min_date=s),_=unescape(_).split("@"),_[0]=this._helpers.parseDate(_[0]);var h=this.isViewExists(_[1])?_[1]:o,c=isNaN(+_[0])?s:_[0];return window.setTimeout(function(){e.setCurrentView(c,h)},1),!1}}return t(l,"expires=Sun, 31 Jan 9999 22:00:00 GMT",escape(this._helpers.formatDate(s||r)+"@"+(o||n))),!0});var n=e._load;e._load=function(){var t=arguments;if(e._date)n.apply(this,t);else{var a=this
;window.setTimeout(function(){n.apply(a,t)},1)}}}()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_cookie.js.map
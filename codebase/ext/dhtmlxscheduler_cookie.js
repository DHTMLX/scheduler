/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in non-GPL project. Please contact sales@dhtmlx.com for details
*/
(function(){function h(e,a,b){var c=e+"="+b+(a?"; "+a:"");document.cookie=c}function i(e){var a=e+"=";if(document.cookie.length>0){var b=document.cookie.indexOf(a);if(b!=-1){b+=a.length;var c=document.cookie.indexOf(";",b);if(c==-1)c=document.cookie.length;return document.cookie.substring(b,c)}}return""}var g=!0;scheduler.attachEvent("onBeforeViewChange",function(e,a,b,c){if(g){g=!1;var d=i("scheduler_settings");if(d){if(!scheduler._min_date)scheduler._min_date=c;d=unescape(d).split("@");d[0]=this.templates.xml_date(d[0]);
var f=this.isViewExists(d[1])?d[1]:b,j=!isNaN(+d[0])?d[0]:c;window.setTimeout(function(){scheduler.setCurrentView(j,f)},1);return!1}}var k=escape(this.templates.xml_format(c||a)+"@"+(b||e));h("scheduler_settings","expires=Sun, 31 Jan 9999 22:00:00 GMT",k);return!0});var f=scheduler._load;scheduler._load=function(){var e=arguments;if(!scheduler._date&&scheduler._load_mode){var a=this;window.setTimeout(function(){f.apply(a,e)},1)}else f.apply(this,e)}})();

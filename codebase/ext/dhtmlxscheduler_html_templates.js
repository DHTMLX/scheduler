/*
@license

dhtmlxScheduler v.5.2.1 Stardard
This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.

*/
Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){for(var t=document.body.getElementsByTagName("DIV"),a=0;a<t.length;a++){var i=t[a].className||"";if(i=i.split(":"),2==i.length&&"template"==i[0]){var n='return "'+(t[a].innerHTML||"").replace(/\"/g,'\\"').replace(/[\n\r]+/g,"")+'";';n=unescape(n).replace(/\{event\.([a-z]+)\}/g,function(e,t){return'"+ev.'+t+'+"'}),e.templates[i[1]]=Function("start","end","ev",n),t[a].style.display="none"}}})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_html_templates.js.map
/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady",function(){
	var els = document.body.getElementsByTagName("DIV");
	for (var i=0; i < els.length; i++) {
		var cs = els[i].className||"";
		cs = cs.split(":");
		if (cs.length == 2 && cs[0] == "template"){
			var code = "return \""+(els[i].innerHTML||"").replace(/\"/g,"\\\"").replace(/[\n\r]+/g,"")+"\";";
			code = unescape(code).replace(/\{event\.([a-z]+)\}/g,function(all,mask){
				return '"+ev.'+mask+'+"';
			});
			scheduler.templates[cs[1]]=Function("start","end","ev",code);
			els[i].style.display='none';
		}
	}
});
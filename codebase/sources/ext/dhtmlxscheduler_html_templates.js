/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

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

});
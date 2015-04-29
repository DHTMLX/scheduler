/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onLightBox",function(){
	if (this._cover){
		try{
			this._cover.style.height = this.expanded ? "100%" : ((document.body.parentNode||document.body).scrollHeight+"px");
		} catch(e) {}
	}
});

scheduler.form_blocks.select.set_value=function(node,value,ev){
	if (typeof value == "undefined" || value === "")
		value = (node.firstChild.options[0]||{}).value;
	node.firstChild.value=value||"";
};
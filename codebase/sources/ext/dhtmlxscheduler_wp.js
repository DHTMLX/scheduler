/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

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

});
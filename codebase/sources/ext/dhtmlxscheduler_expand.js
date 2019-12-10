/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

scheduler.expand = function() {
	if(!scheduler.callEvent("onBeforeExpand", []))
		return;
	var t = scheduler._obj;
	do {
		t._position = t.style.position || "";
		t.style.position = "static";
	} while ((t = t.parentNode) && t.style);
	t = scheduler._obj;
	t.style.position = "absolute";
	t._width = t.style.width;
	t._height = t.style.height;
	t.style.width = t.style.height = "100%";
	t.style.top = t.style.left = "0px";

	var top = document.body;
	top.scrollTop = 0;

	top = top.parentNode;
	if (top)
		top.scrollTop = 0;
	document.body._overflow = document.body.style.overflow || "";
	document.body.style.overflow = "hidden";
	scheduler._maximize();
	scheduler.callEvent("onExpand", []);
};
scheduler.collapse = function() {
	if(!scheduler.callEvent("onBeforeCollapse", []))
		return;
	var t = scheduler._obj;
	do {
		t.style.position = t._position;
	} while ((t = t.parentNode) && t.style);
	t = scheduler._obj;
	t.style.width = t._width;
	t.style.height = t._height;
	document.body.style.overflow = document.body._overflow;
	scheduler._maximize();
	scheduler.callEvent("onCollapse", []);
};
scheduler.attachEvent("onTemplatesReady", function() {
	var t = document.createElement("div");
	t.className = "dhx_expand_icon";
	scheduler.toggleIcon = t;
	scheduler._obj.appendChild(t);
	t.onclick = function() {
		if (!scheduler.expanded)
			scheduler.expand(); else
			scheduler.collapse();
	};
});
scheduler._maximize = function() {
	this.expanded = !this.expanded;
	this.toggleIcon.style.backgroundPosition = "0 " + (this.expanded ? "0" : "18") + "px";

	var directions = ['left', 'top'];
	for (var i = 0; i < directions.length; i++) {
		var margin = scheduler.xy['margin_' + directions[i]];
		var prev_margin = scheduler['_prev_margin_' + directions[i]];
		if (scheduler.xy['margin_' + directions[i]]) {
			scheduler['_prev_margin_' + directions[i]] = scheduler.xy['margin_' + directions[i]];
			scheduler.xy['margin_' + directions[i]] = 0;
		} else {
			if (prev_margin) {
				scheduler.xy['margin_' + directions[i]] = scheduler['_prev_margin_' + directions[i]];
				delete scheduler['_prev_margin_' + directions[i]];
			}
		}
	}

	scheduler.setCurrentView();
};


});

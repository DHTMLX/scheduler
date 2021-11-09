/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

scheduler._get_url_nav = function(){
	var p = {};
	var data = (document.location.hash || "").replace("#", "").split(",");
	for (var i = 0; i < data.length; i++) {
		var s = data[i].split("=");
		if (s.length == 2)
			p[s[0]] = s[1];
	}
	return p;
};

scheduler.attachEvent("onTemplatesReady", function () {
	var first = true;
	var s2d = scheduler.date.str_to_date("%Y-%m-%d");
	var d2s = scheduler.date.date_to_str("%Y-%m-%d");
	var select_event =  scheduler._get_url_nav().event || null;

	scheduler.attachEvent("onAfterEventDisplay", function(ev){
		select_event = null;
		return true;
	});

	scheduler.attachEvent("onBeforeViewChange", function (om, od, m, d) {
		if (first) {
			first = false;
			var p = scheduler._get_url_nav();

			if (p.event){
				try{
					if(scheduler.getEvent(p.event)){
						setTimeout(function(){
							showEvent(p.event);
						});
						return false;
					}else{
						var handler = scheduler.attachEvent("onXLE", function(){
							setTimeout(function(){
								showEvent(p.event);
							});
							scheduler.detachEvent(handler);
						});
					}
				} catch (e){}
			}

			if (p.date || p.mode) {
				try {
					this.setCurrentView((p.date ? s2d(p.date) : null), (p.mode || null));
				} catch (e) {
					//assuming that mode is not available anymore
					this.setCurrentView((p.date ? s2d(p.date) : null), m);
				}
				return false;
			}
		}

		var values = [
			"date=" + d2s(d || od),
			"mode=" + (m || om)
		];

		if(select_event){
			values.push("event=" + select_event);
		}

		var text = "#" + values.join(",");
		document.location.hash = text;
		return true;
	});

	function showEvent(e){
		select_event = e;
		if(scheduler.getEvent(e)){
			scheduler.showEvent(e);
		}
	}
});

});
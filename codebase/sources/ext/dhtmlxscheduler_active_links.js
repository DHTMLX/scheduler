/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

scheduler.config.active_link_view = "day";
scheduler._active_link_click = function(e){
	var start = e.target || event.srcElement;
	var to = start.getAttribute("jump_to");
	var s_d = scheduler.date.str_to_date(scheduler.config.api_date);
	if (to) {
		scheduler.setCurrentView(s_d(to), scheduler.config.active_link_view);
		if (e && e.preventDefault)
			e.preventDefault();
		return false;
	}
};
scheduler.attachEvent("onTemplatesReady", function() {
	var do_wrapper = function(key, fullname){
		fullname = fullname || (key+"_scale_date");

		if(!scheduler.templates['_active_links_old_'+ fullname]){
			scheduler.templates['_active_links_old_'+ fullname] = scheduler.templates[fullname];
		}
		var week_x = scheduler.templates['_active_links_old_'+ fullname];
		var d_s = scheduler.date.date_to_str(scheduler.config.api_date);
		scheduler.templates[fullname] = function(date) {
			return "<a jump_to='" + d_s(date) + "' href='#'>" + week_x(date) + "</a>";
		};
	};

	do_wrapper("week");
	do_wrapper("", "month_day");
	if (this.matrix){
		for (var key in this.matrix)
			do_wrapper(key);
	}

	this._detachDomEvent(this._obj, "click", scheduler._active_link_click);
	scheduler.event(this._obj, "click", scheduler._active_link_click);
});

});
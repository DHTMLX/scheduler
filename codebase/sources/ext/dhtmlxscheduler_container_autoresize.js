/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

(function() {

	scheduler.config.container_autoresize = true;
	scheduler.config.month_day_min_height = 90;
	scheduler.config.min_grid_size = 25;
	scheduler.config.min_map_size = 400;

	var old_pre_render_event = scheduler._pre_render_events;

	//need for temporary disabling without modifying public config
	var active = true;
	var total_height = 0;
	var multiday_height = 0;

	scheduler._pre_render_events = function(evs, hold) {
		if (!(scheduler.config.container_autoresize && active)) {
			return old_pre_render_event.apply(this, arguments);
		}

		var hb = this.xy.bar_height;
		var h_old = this._colsS.heights;
		var h = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0];
		var data = this._els["dhx_cal_data"][0];

		if (!this._table_view)
			evs = this._pre_render_events_line(evs, hold); //ignore long events for now
		else
			evs = this._pre_render_events_table(evs, hold);

		if (this._table_view) {
			if (hold){
				this._colsS.heights = h_old;
			} else {
				var evl = data.firstChild;
				if (evl.rows) {
					for (var i = 0; i < evl.rows.length; i++) {
						h[i]++;
						if ((h[i]) * hb > this._colsS.height - this.xy.month_head_height) { // 22 - height of cell's header
							//we have overflow, update heights
							var cells = evl.rows[i].cells;

							var cHeight = this._colsS.height - this.xy.month_head_height;
							if(this.config.max_month_events*1 !== this.config.max_month_events || h[i] <= this.config.max_month_events){
								cHeight = h[i] * hb;
							}else if( (this.config.max_month_events + 1) * hb > this._colsS.height - this.xy.month_head_height){
								cHeight = (this.config.max_month_events + 1) * hb;
							}

							for (var j = 0; j < cells.length; j++) {
								cells[j].childNodes[1].style.height = cHeight + "px";
							}
							h[i] = (h[i - 1] || 0) + cells[0].offsetHeight;
						}
						h[i] = (h[i - 1] || 0) + evl.rows[i].cells[0].offsetHeight;
					}
					h.unshift(0);
					if (evl.parentNode.offsetHeight < evl.parentNode.scrollHeight && !evl._h_fix) {
						//we have v-scroll, decrease last day cell

						// NO CHECK SHOULD BE MADE ON VERTICAL SCROLL
					}
				} else {
					if (!evs.length && this._els["dhx_multi_day"][0].style.visibility == "visible")
						h[0] = -1;
					if (evs.length || h[0] == -1) {
						//shift days to have space for multiday events
						var childs = evl.parentNode.childNodes;
						var dh = ((h[0] + 1) * hb + 1); // +1 so multiday events would have 2px from top and 2px from bottom by default
						if(multiday_height != dh + 1) {
							this._obj.style.height = (total_height - multiday_height + dh - 1) + "px";
						}
						dh += "px";
						data.style.top = (this._els["dhx_cal_navline"][0].offsetHeight + this._els["dhx_cal_header"][0].offsetHeight + parseInt(dh, 10)) + 'px';
						data.style.height = (this._obj.offsetHeight - parseInt(data.style.top, 10) - (this.xy.margin_top || 0)) + 'px';
						var last = this._els["dhx_multi_day"][0];
						last.style.height = dh;
						last.style.visibility = (h[0] == -1 ? "hidden" : "visible");
						last = this._els["dhx_multi_day"][1];
						last.style.height = dh;
						last.style.visibility = (h[0] == -1 ? "hidden" : "visible");
						last.className = h[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small";
						this._dy_shift = (h[0] + 1) * hb;
						h[0] = 0;
					}
				}
			}
		}

		return evs;
	};

	var checked_divs = ["dhx_cal_navline", "dhx_cal_header", "dhx_multi_day", "dhx_cal_data"];
	var updateContainterHeight = function(is_repaint) {
		total_height = 0;
		for (var i = 0; i < checked_divs.length; i++) {

			var className = checked_divs[i];
			var checked_div = (scheduler._els[className]) ? scheduler._els[className][0] : null;
			var height = 0;
			switch (className) {
				case "dhx_cal_navline":
				case "dhx_cal_header":
					height = parseInt(checked_div.style.height, 10);
					break;
				case "dhx_multi_day":
					height = (checked_div) ? checked_div.offsetHeight - 1 : 0;
					multiday_height = height;
					break;
				case "dhx_cal_data":
					var mode = scheduler.getState().mode;

					if(checked_div.childNodes[1] && mode != "month") {
						height = checked_div.childNodes[1].offsetHeight;
					}
					else {
						height = Math.max(checked_div.offsetHeight - 1, checked_div.scrollHeight);
					}
					if (mode == "month") {
						if (scheduler.config.month_day_min_height && !is_repaint) {
							var rows_length = checked_div.getElementsByTagName("tr").length;
							height = rows_length * scheduler.config.month_day_min_height;
						}
						if (is_repaint) {
							checked_div.style.height = height + "px";
						}
					}
					else if (mode == "year"){
						height = 190 * scheduler.config.year_y;
					}
					else if(mode == "agenda"){
						height = 0;
						if(checked_div.childNodes && checked_div.childNodes.length){
							for(var j = 0; j < checked_div.childNodes.length; j++){
								height += checked_div.childNodes[j].offsetHeight;
							}
						}

						if(height + 2 < scheduler.config.min_grid_size){
							height = scheduler.config.min_grid_size;
						}
						else{
							height += 2;
						}
					}
					else if (mode == "week_agenda"){
						var min_height = scheduler.xy.week_agenda_scale_height + scheduler.config.min_grid_size,
							cur_height;

						var column;
						for(var k = 0; k < checked_div.childNodes.length; k++){
							column = checked_div.childNodes[k];
							for(var j = 0; j < column.childNodes.length; j++) {
								var innerHeight = 0,
									eventsContainer = column.childNodes[j].childNodes[1];

								for(var g =0; g < eventsContainer.childNodes.length; g++){
									innerHeight += eventsContainer.childNodes[g].offsetHeight;
								}

								cur_height = innerHeight + scheduler.xy.week_agenda_scale_height;
								cur_height = (k == 1 && (j == 2 || j == 3)) ? cur_height * 2 : cur_height; // for last two cells;

								if (cur_height > min_height) {
									min_height = cur_height;
								}
							}
						}

						height = min_height * 3;
					}
					else if(mode == "map") {
						height = 0;
						var evs = checked_div.querySelectorAll(".dhx_map_line");

						for (var j = 0; j < evs.length; j++) {
							height += evs[j].offsetHeight;
						}

						if (height + 2 < scheduler.config.min_map_size) {
							height = scheduler.config.min_map_size;
						}
						else {
							height += 2;
						}
					}
					else if(scheduler._gridView) {
						height = 0;

						if (checked_div.childNodes[1].childNodes[0].childNodes && checked_div.childNodes[1].childNodes[0].childNodes.length) {
							var evs = checked_div.childNodes[1].childNodes[0].childNodes[0].childNodes;

							for (var j = 0; j < evs.length; j++) {
								height += evs[j].offsetHeight;
							}

							height += 2;

							if(height < scheduler.config.min_grid_size){
								height = scheduler.config.min_grid_size;
							}
						}
						else{
							height = scheduler.config.min_grid_size;
						}
					}

					if (scheduler.matrix && scheduler.matrix[mode]) {
						if (is_repaint) {
							height += 0;
							checked_div.style.height = height + "px";
						} else {
							height = 0;
							var cfg = scheduler.matrix[mode];
							var rows = cfg.y_unit;
							for(var r=0; r < rows.length; r++){
								height += cfg._section_height[rows[r].key];
							}
						}
						height -= 1;
					}
					if (mode == "day" || mode == "week" || (scheduler._props && scheduler._props[mode])) {
						height += 2;
					}
					break;
			}
			height += 1;
			total_height += height;
		}
		scheduler._obj.style.height = (total_height) + "px";

		if (!is_repaint)
			scheduler.updateView();
	};

	function callUpdate(){
		active = false;
		scheduler.callEvent("onAfterSchedulerResize", []);
		active = true;
	}

	var conditionalUpdateContainerHeight = function() {
		if(!(scheduler.config.container_autoresize && active))
			return true;

		var mode = scheduler.getState().mode;

		if(!mode) {
			return true;
		}

		var scrollTop = document.documentElement.scrollTop;

		updateContainterHeight();
		if ( (scheduler.matrix && scheduler.matrix[mode]) || mode == "month") {
			var asyncRepaint = window.requestAnimationFrame || window.setTimeout;
			asyncRepaint(function() {
				updateContainterHeight(true);
				document.documentElement.scrollTop = scrollTop;
				callUpdate();
			}, 1);
		}else{
			callUpdate();
		}
	};

	scheduler.attachEvent("onBeforeViewChange", function(){
		var autosizeEnabled = scheduler.config.container_autoresize;
		if(!scheduler.xy.$original_scroll_width){
			scheduler.xy.$original_scroll_width = scheduler.xy.scroll_width;
		}

		scheduler.xy.scroll_width = autosizeEnabled ? 0 : scheduler.xy.$original_scroll_width;

		if(scheduler.matrix){
			for(var i in scheduler.matrix){
				var timeline = scheduler.matrix[i];
				if(!timeline.$original_section_autoheight){
					timeline.$original_section_autoheight = timeline.section_autoheight;
				}
				if(autosizeEnabled){
					timeline.section_autoheight = false;
				}else{
					timeline.section_autoheight = timeline.$original_section_autoheight;
				}
			}
		}
		return true;
	});
	
	scheduler.attachEvent("onViewChange", conditionalUpdateContainerHeight);
	scheduler.attachEvent("onXLE", conditionalUpdateContainerHeight);
	scheduler.attachEvent("onEventChanged", conditionalUpdateContainerHeight);
	scheduler.attachEvent("onEventCreated", conditionalUpdateContainerHeight);
	scheduler.attachEvent("onEventAdded", conditionalUpdateContainerHeight);
	scheduler.attachEvent("onEventDeleted", conditionalUpdateContainerHeight);
	scheduler.attachEvent("onAfterSchedulerResize", conditionalUpdateContainerHeight);
	scheduler.attachEvent("onClearAll", conditionalUpdateContainerHeight);

	//disable container autoresize when expanded
	scheduler.attachEvent("onBeforeExpand", function(){
		active = false;
		return true;
	});

	scheduler.attachEvent("onBeforeCollapse", function(){
		active = true;
		return true;
	});
})();

});

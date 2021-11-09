/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

scheduler.config.year_x = 4;
scheduler.config.year_y = 3;
scheduler.xy.year_top = 0;

scheduler.templates.year_date = function(date) {
	return scheduler.date.date_to_str(scheduler.locale.labels.year_tab + " %Y")(date);
};
scheduler.templates.year_month = scheduler.date.date_to_str("%F");
scheduler.templates.year_scale_date = scheduler.date.date_to_str("%D");
scheduler.templates.year_tooltip = function(s, e, ev) {
	return ev.text;
};

(function() {
	var is_year_mode = function() {
		return scheduler._mode == "year";
	};

	scheduler.dblclick_dhx_month_head = function(e) {
		if (is_year_mode()) {
			var t = (e.target || e.srcElement);
			var className = scheduler._getClassName(t.parentNode);
			if (className.indexOf("dhx_before") != -1 || className.indexOf("dhx_after") != -1) return false;

			var monthNode = t;
			while(monthNode && !(monthNode.hasAttribute && monthNode.hasAttribute("date"))){
				monthNode = monthNode.parentNode;
			}

			if(monthNode){
				var start = this._helpers.parseDate(monthNode.getAttribute("date"));
				start.setDate(parseInt(t.innerHTML, 10));
				var end = this.date.add(start, 1, "day");
				if (!this.config.readonly && this.config.dblclick_create)
					this.addEventNow(start.valueOf(), end.valueOf(), e);
			}
		}
	};

	var chid = scheduler.changeEventId;
	scheduler.changeEventId = function() {
		chid.apply(this, arguments);
		if (is_year_mode())
			this.year_view(true);
	};


	var old = scheduler.render_data;
	var to_attr = scheduler.date.date_to_str("%Y/%m/%d");
	var from_attr = scheduler.date.str_to_date("%Y/%m/%d");
	scheduler.render_data = function(evs) {
		if (!is_year_mode()) return old.apply(this, arguments);
		for (var i = 0; i < evs.length; i++)
			this._year_render_event(evs[i]);
	};

	var clear = scheduler.clear_view;
	scheduler.clear_view = function() {
		if (!is_year_mode()) return clear.apply(this, arguments);
		var dates = scheduler._year_marked_cells,
			div = null;
		for (var date in dates) {
			if (dates.hasOwnProperty(date)) {
				div = dates[date];
				div.className = "dhx_month_head";
				div.removeAttribute("date");
			}
		}
		scheduler._year_marked_cells = {};
	};

	scheduler._hideToolTip = function() {
		if (this._tooltip) {
			this._tooltip.style.display = "none";
			this._tooltip.date = new Date(9999, 1, 1);
		}
	};

	scheduler._showToolTip = function(date, pos, e, src) {
		if (this._tooltip) {
			if (this._tooltip.date.valueOf() == date.valueOf()) return;
			this._tooltip.innerHTML = "";
		} else {
			var t = this._tooltip = document.createElement("div");
			t.className = "dhx_year_tooltip";
			if (this.config.rtl) t.className += " dhx_tooltip_rtl";
			document.body.appendChild(t);
			t.onclick = scheduler._click.dhx_cal_data;
		}
		var evs = this.getEvents(date, this.date.add(date, 1, "day"));
		var html = "";

		for (var i = 0; i < evs.length; i++) {
			var ev = evs[i];
			if(!this.filter_event(ev.id, ev))
				continue;

			var bg_color = (ev.color ? ("background:" + ev.color + ";") : "");
			var color = (ev.textColor ? ("color:" + ev.textColor + ";") : "");

			html += "<div class='dhx_tooltip_line' style='" + bg_color + "" + color + "' event_id='" + evs[i].id + "'>";
			html += "<div class='dhx_tooltip_date' style='" + bg_color + "" + color + "'>" + (evs[i]._timed ? this.templates.event_date(evs[i].start_date) : "") + "</div>";
			html += "<div class='dhx_event_icon icon_details'>&nbsp;</div>";
			html += this.templates.year_tooltip(evs[i].start_date, evs[i].end_date, evs[i]) + "</div>";
		}

		this._tooltip.style.display = "";
		this._tooltip.style.top = "0px";


		if (document.body.offsetWidth - pos.left - this._tooltip.offsetWidth < 0)
			this._tooltip.style.left = pos.left - this._tooltip.offsetWidth + "px";
		else
			this._tooltip.style.left = pos.left + src.offsetWidth + "px";

		this._tooltip.date = date;
		this._tooltip.innerHTML = html;

		if (document.body.offsetHeight - pos.top - this._tooltip.offsetHeight < 0)
			this._tooltip.style.top = pos.top - this._tooltip.offsetHeight + src.offsetHeight + "px";
		else
			this._tooltip.style.top = pos.top + "px";
	};

	scheduler._year_view_tooltip_handler = function(e){
		if (!is_year_mode()) return;

		var e = e || event;
		var src = e.target || e.srcElement;
		if (src.tagName.toLowerCase() == 'a') // fix for active links extension (it adds links to the date in the cell)
			src = src.parentNode;
		if (scheduler._getClassName(src).indexOf("dhx_year_event") != -1)
			scheduler._showToolTip(from_attr(src.getAttribute("date")), scheduler.$domHelpers.getOffset(src), e, src);
		else
			scheduler._hideToolTip();
	};
	scheduler._init_year_tooltip = function() {
		scheduler._detachDomEvent(scheduler._els["dhx_cal_data"][0], "mouseover", scheduler._year_view_tooltip_handler);
		scheduler.event(scheduler._els["dhx_cal_data"][0], "mouseover", scheduler._year_view_tooltip_handler);
	};

	scheduler._get_year_cell = function(d) {
		//there can be more than 1 year in view
		//year can start not from January
		var m = d.getMonth() + 12 * (d.getFullYear() - this._min_date.getFullYear()) - this.week_starts._month;
		var yearBox = this._els["dhx_cal_data"][0].childNodes[m];
		var dayIndex = this.week_starts[m] + d.getDate() - 1;

		var row = yearBox.querySelectorAll(".dhx_year_body tr")[Math.floor(dayIndex / 7)];
		var cell = row.querySelectorAll("td")[dayIndex % 7];
		return cell.querySelector(".dhx_month_head");
	};

	scheduler._year_marked_cells = {};
	scheduler._mark_year_date = function(date, event) {
		var dateString = to_attr(date);
		var cell = this._get_year_cell(date);
		if (!cell) {
			return;
		}
		var ev_class = this.templates.event_class(event.start_date, event.end_date, event);
		if (!scheduler._year_marked_cells[dateString]) {
			cell.className = "dhx_month_head dhx_year_event";
			cell.setAttribute("date", dateString);
			scheduler._year_marked_cells[dateString] = cell;
		}
		cell.className += (ev_class) ? (" "+ev_class) : "";
	};
	scheduler._unmark_year_date = function(date) {
		var cell = this._get_year_cell(date);
		if (!cell) {
			return;
		}
		cell.className = "dhx_month_head";
	};
	scheduler._year_render_event = function(event) {
		var date = event.start_date;
		if (date.valueOf() < this._min_date.valueOf()){
			date = this._min_date;
		} else {
			date = this.date.date_part(new Date(date));
		}

		while (date < event.end_date) {
			this._mark_year_date(date, event);
			date = this.date.add(date, 1, "day");
			if (date.valueOf() >= this._max_date.valueOf())
				return;
		}
	};

	scheduler.year_view = function(mode) {
		var temp;
		if (mode) {
			temp = scheduler.xy.scale_height;
			scheduler.xy.scale_height = -1;
		}

		scheduler._els["dhx_cal_header"][0].style.display = mode ? "none" : "";
		scheduler.set_sizes();

		if (mode)
			scheduler.xy.scale_height = temp;


		scheduler._table_view = mode;
		if (this._load_mode && this._load()) return;

		if (mode) {
			scheduler._init_year_tooltip();
			scheduler._reset_year_scale();
			if (scheduler._load_mode && scheduler._load()){
				scheduler._render_wait = true;
				return;
			}
			scheduler.render_view_data();
		} else {
			scheduler._hideToolTip();
		}
	};
	scheduler._reset_year_scale = function() {
		this._cols = [];
		this._colsS = {};
		var week_starts = []; //start day of first week in each month
		var b = this._els["dhx_cal_data"][0];

		var c = this.config;
		b.scrollTop = 0; //fix flickering in FF
		b.innerHTML = "";

		var dx = Math.floor(parseInt(b.style.width) / c.year_x);
		var dy = Math.floor((parseInt(b.style.height) - scheduler.xy.year_top) / c.year_y);
		if (dy < 190) {
			dy = 190;
			dx = Math.floor((parseInt(b.style.width) - scheduler.xy.scroll_width) / c.year_x);
		}

		var summ = dx - 11;
		var left = 0;
		var week_template = document.createElement("div");
		var dummy_date = this.date.week_start(scheduler._currentDate());

		this._process_ignores(dummy_date, 7, "day", 1);

		var scales_count = 7 - (this._ignores_detected || 0);
		var real_count = 0;
		for (var i = 0; i < 7; i++) {
			if(!(this._ignores && this._ignores[i])) {
				this._cols[i] = Math.floor(summ / (scales_count - real_count));
				this._render_x_header(i, left, dummy_date, week_template);
				summ -= this._cols[i];
				left += this._cols[i];
				real_count++;
			}
			dummy_date = this.date.add(dummy_date, 1, "day");
		}
		week_template.lastChild.className += " dhx_scale_bar_last";

		for(var i = 0; i < week_template.childNodes.length; i++){
			this._waiAria.yearHeadCell(week_template.childNodes[i]);
		}

		var sd = this.date[this._mode + "_start"](this.date.copy(this._date));
		var ssd = sd;
		var d = null;
		for (var i = 0; i < c.year_y; i++){
			for (var j = 0; j < c.year_x; j++) {
				d = document.createElement("div");
				d.className = "dhx_year_box";
				d.style.cssText = "position:absolute;";
				d.setAttribute("date", this._helpers.formatDate(sd));
				d.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid'><div class='dhx_year_week'>" + week_template.innerHTML + "</div><div class='dhx_year_body'></div></div>";

				var header = d.querySelector(".dhx_year_month");
				var grid = d.querySelector(".dhx_year_grid");
				var weekHeader = d.querySelector(".dhx_year_week");
				var body = d.querySelector(".dhx_year_body");

				var headerId = scheduler.uid();
				this._waiAria.yearHeader(header, headerId);
				this._waiAria.yearGrid(grid, headerId);


				header.innerHTML = this.templates.year_month(sd);



				var dd = this.date.week_start(sd);
				var ed = this._reset_month_scale(body, sd, dd, 6);

				var days = body.querySelectorAll("td");
				for(var day = 0; day < days.length; day++){
					this._waiAria.yearDayCell(days[day]);
				}



				b.appendChild(d);

				weekHeader.style.height = weekHeader.childNodes[0].offsetHeight + "px"; // dhx_year_week should have height property so that day dates would get correct position. dhx_year_week height = height of it's child (with the day name)
				var dt = Math.round((dy - 190) / 2);
				d.style.marginTop = dt + "px";
				this.set_xy(d, dx - 10, dy - dt - 10, dx * j + 5, dy * i + 5 + scheduler.xy.year_top);

				week_starts[i * c.year_x + j] = (sd.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;
				sd = this.date.add(sd, 1, "month");

			}
		}

		var dateElement = this._getNavDateElement();
		if(dateElement){
			dateElement.innerHTML = this.templates[this._mode + "_date"](ssd, sd, this._mode);
		}

		this.week_starts = week_starts;
		week_starts._month = ssd.getMonth();
		this._min_date = ssd;
		this._max_date = sd;
	};

	var getActionData = scheduler.getActionData;
	scheduler.getActionData = function(n_ev) {
		if(!is_year_mode())
			return getActionData.apply(scheduler, arguments);

		var trg = n_ev?n_ev.target:event.srcElement;
		var date = scheduler._get_year_month_date(trg);

		var day = scheduler._get_year_month_cell(trg);
		var pos = scheduler._get_year_day_indexes(day);

		if(pos && date){
			date = scheduler.date.add(date, pos.week, "week");
			date = scheduler.date.add(date, pos.day, "day");
		}else{
			date = null;
		}

		return {
			date:date,
			section:null
		};

	};
	scheduler._get_year_day_indexes = function(targetCell){
		var month = scheduler._get_year_el_node(targetCell, this._locate_year_month_table);
		if(!month)
			return null;

		var week = 0, day = 0;
		for(var week = 0, weeks = month.rows.length; week < weeks;week ++){
			var w = month.rows[week].getElementsByTagName("td");
			for(var day = 0, days = w.length; day < days; day++){
				if(w[day] == targetCell)
					break;
			}
			if(day < days)
				break;
		}

		if(week < weeks)
			return {day:day, week:week};
		else
			return null;
	};
	scheduler._get_year_month_date = function (node){
		var node = scheduler._get_year_el_node(node, scheduler._locate_year_month_root);
		if(!node)
			return null;

		var date = node.getAttribute("date");
		if(!date)
			return null;

		return scheduler.date.week_start(scheduler.date.month_start(from_attr(date)));
	};
	scheduler._locate_year_month_day = function(n){
		return scheduler._getClassName(n).indexOf("dhx_year_event") != -1 && n.hasAttribute && n.hasAttribute("date");
	};

	var locateEvent = scheduler._locate_event;
	scheduler._locate_event = function(node) {
		var id = locateEvent.apply(scheduler, arguments);
		if(!id){
			var day = scheduler._get_year_el_node(node, scheduler._locate_year_month_day);

			if(!day || !day.hasAttribute("date")) return null;

			var dat = from_attr(day.getAttribute("date"));
			var evs = scheduler.getEvents(dat, scheduler.date.add(dat, 1, "day"));
			if(!evs.length) return null;

			//can be multiple events in the cell, return any single one
			id = evs[0].id;
		}
		return id;
	};
	scheduler._locate_year_month_cell = function(n){
		return n.nodeName.toLowerCase() == "td";
	};
	scheduler._locate_year_month_table = function(n){
		return n.nodeName.toLowerCase() == "table";
	};
	scheduler._locate_year_month_root = function(n){
		return n.hasAttribute && n.hasAttribute("date");
	};

	scheduler._get_year_month_cell = function(node){
		return this._get_year_el_node(node, this._locate_year_month_cell);
	};

	scheduler._get_year_month_table = function(node){
		return this._get_year_el_node (node, this._locate_year_month_table);
	};
	scheduler._get_year_month_root = function(node){
		return this._get_year_el_node(this._get_year_month_table(node), this._locate_year_month_root);
	};
	scheduler._get_year_el_node = function(node, condition){
		while(node && !condition(node)){
			node = node.parentNode;
		}
		return node;
	};


})();


});

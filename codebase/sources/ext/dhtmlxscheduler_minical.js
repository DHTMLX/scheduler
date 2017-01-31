/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.templates.calendar_month = scheduler.date.date_to_str("%F %Y");
scheduler.templates.calendar_scale_date = scheduler.date.date_to_str("%D");
scheduler.templates.calendar_date = scheduler.date.date_to_str("%d");
scheduler.config.minicalendar = {
	mark_events: true
};
scheduler._synced_minicalendars = [];
scheduler.renderCalendar = function(obj, _prev, is_refresh) {
	var cal = null;
	var date = obj.date || (scheduler._currentDate());
	if (typeof date == "string")
		date = this.templates.api_date(date);

	if (!_prev) {
		var cont = obj.container;
		var pos = obj.position;

		if (typeof cont == "string")
			cont = document.getElementById(cont);

		if (typeof pos == "string")
			pos = document.getElementById(pos);
		if (pos && (typeof pos.left == "undefined")) {
			var tpos = getOffset(pos);
			pos = {
				top: tpos.top + pos.offsetHeight,
				left: tpos.left
			};
		}
		if (!cont)
			cont = scheduler._get_def_cont(pos);

		cal = this._render_calendar(cont, date, obj);
		cal.onclick = function(e) {
			e = e || event;
			var src = e.target || e.srcElement;

			if (src.className.indexOf("dhx_month_head") != -1) {
				var pname = src.parentNode.className;
				if (pname.indexOf("dhx_after") == -1 && pname.indexOf("dhx_before") == -1) {
					var newdate = scheduler.templates.xml_date(this.getAttribute("date"));
					newdate.setDate(parseInt(src.innerHTML, 10));
					scheduler.unmarkCalendar(this);
					scheduler.markCalendar(this, newdate, "dhx_calendar_click");
					this._last_date = newdate;
					if (this.conf.handler) this.conf.handler.call(scheduler, newdate, this);
				}
			}
		};
	} else {
		cal = this._render_calendar(_prev.parentNode, date, obj, _prev);
		scheduler.unmarkCalendar(cal);
	}

	if (scheduler.config.minicalendar.mark_events) {
		var start = scheduler.date.month_start(date);
		var end = scheduler.date.add(start, 1, "month");
		var evs = this.getEvents(start, end);
		var filter = this["filter_" + this._mode];
		var markedDates = {};
		for (var i = 0; i < evs.length; i++) {
			var ev = evs[i];
			if (filter && !filter(ev.id, ev))
				continue;
			var d = ev.start_date;
			if (d.valueOf() < start.valueOf())
				d = start;
			d = scheduler.date.date_part(new Date(d.valueOf()));
			while (d < ev.end_date) {
				if(!markedDates[+d]) {
					markedDates[+d] = true;
					this.markCalendar(cal, d, "dhx_year_event");
				}
				d = this.date.add(d, 1, "day");
				if (d.valueOf() >= end.valueOf())
					break;
			}
		}
	}

	this._markCalendarCurrentDate(cal);

	cal.conf = obj;
	if (obj.sync && !is_refresh)
		this._synced_minicalendars.push(cal);

	if(!cal.conf._on_xle_handler){
		cal.conf._on_xle_handler = scheduler.attachEvent("onXLE", function refreshOnLoad(){
			scheduler.updateCalendar(cal, cal.conf.date);
		});
	}

	return cal;
};
scheduler._get_def_cont = function(pos) {
	if (!this._def_count) {
		this._def_count = document.createElement("DIV");
		this._def_count.className = "dhx_minical_popup";
		this._def_count.onclick = function(e) { (e || event).cancelBubble = true; };
		document.body.appendChild(this._def_count);
	}

	this._def_count.style.left = pos.left + "px";
	this._def_count.style.top = pos.top + "px";
	this._def_count._created = new Date();

	return this._def_count;
};
scheduler._locateCalendar = function(cal, date) {
	if (typeof date == "string")
		date = scheduler.templates.api_date(date);

	if(+date > +cal._max_date || +date < +cal._min_date)
		return null;

	var table = cal.querySelector(".dhx_year_body").childNodes[0];

	var weekNum = 0;
	var dat = new Date(cal._min_date);
	while(+this.date.add(dat, 1, "week") <= +date){
		dat = this.date.add(dat, 1, "week");
		weekNum++;
	}

	var sm = scheduler.config.start_on_monday;
	var day = (date.getDay() || (sm ? 7 : 0)) - (sm ? 1 : 0);
	return table.rows[weekNum].cells[day].firstChild;
};
scheduler.markCalendar = function(cal, date, css) {
	var div = this._locateCalendar(cal, date);
	if(!div)
		return;

	div.className += " " + css;
};
scheduler.unmarkCalendar = function(cal, date, css) {
	date = date || cal._last_date;
	css = css || "dhx_calendar_click";
	if (!date) return;
	var el = this._locateCalendar(cal, date);
	if(!el)
		return;
	el.className = (el.className || "").replace(RegExp(css, "g"));
};
scheduler._week_template = function(width) {
	var summ = (width || 250);
	var left = 0;

	var week_template = document.createElement("div");
	var dummy_date = this.date.week_start(scheduler._currentDate());
	for (var i = 0; i < 7; i++) {
		this._cols[i] = Math.floor(summ / (7 - i));
		this._render_x_header(i, left, dummy_date, week_template);
		dummy_date = this.date.add(dummy_date, 1, "day");
		summ -= this._cols[i];
		left += this._cols[i];
	}
	week_template.lastChild.className += " dhx_scale_bar_last";
	return week_template;
};
scheduler.updateCalendar = function(obj, sd) {
	obj.conf.date = sd;
	this.renderCalendar(obj.conf, obj, true);
};
scheduler._mini_cal_arrows = ["&nbsp", "&nbsp"];
scheduler._render_calendar = function(obj, sd, conf, previous) {
	/*store*/
	var ts = scheduler.templates;
	var temp = this._cols;
	this._cols = [];
	var temp2 = this._mode;
	this._mode = "calendar";
	var temp3 = this._colsS;
	this._colsS = {height: 0};
	var temp4 = new Date(this._min_date);
	var temp5 = new Date(this._max_date);
	var temp6 = new Date(scheduler._date);
	var temp7 = ts.month_day;
	var temp8 = this._ignores_detected; this._ignores_detected = 0;
	ts.month_day = ts.calendar_date;

	sd = this.date.month_start(sd);
	var week_template = this._week_template(obj.offsetWidth - 1 - this.config.minicalendar.padding );

	var d;
	if (previous){
		d = previous;
	} else {
		d = document.createElement("DIV");
		d.className = "dhx_cal_container dhx_mini_calendar";
	}
	d.setAttribute("date", this.templates.xml_format(sd));
	d.innerHTML = "<div class='dhx_year_month'></div>" +
		"<div class='dhx_year_grid'>" +
			"<div class='dhx_year_week'>"+(week_template ? week_template.innerHTML : "")+"</div>" +
			"<div class='dhx_year_body'></div>" +
		"</div>";

	var header = d.querySelector(".dhx_year_month");
	var weekHeader = d.querySelector(".dhx_year_week");
	var body = d.querySelector(".dhx_year_body");

	header.innerHTML = this.templates.calendar_month(sd);
	if (conf.navigation) {
		var move_minicalendar_date = function(calendar, diff) {
			var date = scheduler.date.add(calendar._date, diff, "month");
			scheduler.updateCalendar(calendar, date);
			if (scheduler._date.getMonth() == calendar._date.getMonth() && scheduler._date.getFullYear() == calendar._date.getFullYear()) {
				scheduler._markCalendarCurrentDate(calendar);
			}
		};

		var css_classnames = ["dhx_cal_prev_button", "dhx_cal_next_button"];
		var css_texts = ["left:1px;top:2px;position:absolute;", "left:auto; right:1px;top:2px;position:absolute;"];
		var diffs = [-1, 1];
		var handler = function(diff) {
			return function() {
				if (conf.sync) {
					var calendars = scheduler._synced_minicalendars;
					for (var k = 0; k < calendars.length; k++) {
						move_minicalendar_date(calendars[k], diff);
					}
				} else {
					move_minicalendar_date(d, diff);
				}
			};
		};
		var labels = [scheduler.locale.labels.prev, scheduler.locale.labels.next];
		for (var j = 0; j < 2; j++) {
			var arrow = document.createElement("DIV");
			//var diff = diffs[j];
			arrow.className = css_classnames[j];

			scheduler._waiAria.headerButtonsAttributes(arrow, labels[j]);

			arrow.style.cssText = css_texts[j];
			arrow.innerHTML = this._mini_cal_arrows[j];
			header.appendChild(arrow);
			arrow.onclick = handler(diffs[j]);
		}
	}
	d._date = new Date(sd);

	d.week_start = (sd.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;

	var dd = d._min_date = this.date.week_start(sd);
	d._max_date = this.date.add(d._min_date, 6, "week");

	this._reset_month_scale(body, sd, dd, 6);

	if (!previous)
		obj.appendChild(d);

	weekHeader.style.height = (weekHeader.childNodes[0].offsetHeight - 1) + "px"; // dhx_year_week should have height property so that day dates would get correct position. dhx_year_week height = height of it's child (with the day name)

	var headerId = scheduler.uid();
	scheduler._waiAria.minicalHeader(header, headerId);
	scheduler._waiAria.minicalGrid(d.querySelector(".dhx_year_grid"), headerId);
	scheduler._waiAria.minicalRow(weekHeader);

	var dayHeaders = weekHeader.querySelectorAll(".dhx_scale_bar");
	for(var i = 0; i < dayHeaders.length; i++){
		scheduler._waiAria.minicalHeadCell(dayHeaders[i]);
	}
	var dayCells = body.querySelectorAll("td");
	var firstDate = new Date(temp4);
	for(var i = 0; i < dayCells.length; i++){

		scheduler._waiAria.minicalDayCell(dayCells[i], new Date(firstDate));
		firstDate = scheduler.date.add(firstDate, 1, "day");
	}

	scheduler._waiAria.minicalHeader(header, headerId);

	/*restore*/
	this._cols = temp;
	this._mode = temp2;
	this._colsS = temp3;
	this._min_date = temp4;
	this._max_date = temp5;
	scheduler._date = temp6;
	ts.month_day = temp7;
	this._ignores_detected = temp8;
	return d;
};
scheduler.destroyCalendar = function(cal, force) {
	if (!cal && this._def_count && this._def_count.firstChild) {
		if (force || (new Date()).valueOf() - this._def_count._created.valueOf() > 500)
			cal = this._def_count.firstChild;
	}
	if (!cal) return;
	cal.onclick = null;
	cal.innerHTML = "";
	if (cal.parentNode)
		cal.parentNode.removeChild(cal);
	if (this._def_count)
		this._def_count.style.top = "-1000px";

	if(cal.conf && cal.conf._on_xle_handler)
		scheduler.detachEvent(cal.conf._on_xle_handler);
};
scheduler.isCalendarVisible = function() {
	if (this._def_count && parseInt(this._def_count.style.top, 10) > 0)
		return this._def_count;
	return false;
};

scheduler._attach_minical_events = function(){
	dhtmlxEvent(document.body, "click", function() { scheduler.destroyCalendar(); });
	scheduler._attach_minical_events = function(){};
};

scheduler.attachEvent("onTemplatesReady", function() {
	scheduler._attach_minical_events();
});

scheduler.templates.calendar_time = scheduler.date.date_to_str("%d-%m-%Y");

scheduler.form_blocks.calendar_time = {
	render: function(sns) {
		var html = "<input class='dhx_readonly' type='text' readonly='true'>";

		var cfg = scheduler.config;
		var dt = this.date.date_part(scheduler._currentDate());

		var last = 24 * 60, first = 0;
		if (cfg.limit_time_select) {
			first = 60 * cfg.first_hour;
			last = 60 * cfg.last_hour + 1;  // to include "17:00" option if time select is limited
		}
		dt.setHours(first / 60);

		sns._time_values = [];
		html += " <select>";
		for (var i = first; i < last; i += this.config.time_step * 1) { // `<` to exclude last "00:00" option
			var time = this.templates.time_picker(dt);
			html += "<option value='" + i + "'>" + time + "</option>";
			sns._time_values.push(i);
			dt = this.date.add(dt, this.config.time_step, "minute");
		}
		html += "</select>";

		var full_day = scheduler.config.full_day;

		return "<div style='height:30px;padding-top:0; font-size:inherit;' class='dhx_section_time'>" + html + "<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>" + html + "</div>";
	},
	set_value: function(node, value, ev, config) {

		var inputs = node.getElementsByTagName("input");
		var selects = node.getElementsByTagName("select");
		var start_date,
			end_date;

		var _init_once = function(inp, date, number) {
			inp.onclick = function() {
				scheduler.destroyCalendar(null, true);
				scheduler.renderCalendar({
					position: inp,
					date: new Date(this._date),
					navigation: true,
					handler: function(new_date) {
						inp.value = scheduler.templates.calendar_time(new_date);
						inp._date = new Date(new_date);
						scheduler.destroyCalendar();
						if (scheduler.config.event_duration && scheduler.config.auto_end_date && number === 0) { //first element = start date
							_update_minical_select();
						}
					}
				});
			};
		};

		if (scheduler.config.full_day) {
			if (!node._full_day) {
				var html = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + scheduler.locale.labels.full_day + "&nbsp;</label></input>";
				if (!scheduler.config.wide_form)
					html = node.previousSibling.innerHTML + html;
				node.previousSibling.innerHTML = html;
				node._full_day = true;
			}
			var input = node.previousSibling.getElementsByTagName("input")[0];

			var isFulldayEvent = (scheduler.date.time_part(ev.start_date) === 0 && scheduler.date.time_part(ev.end_date) === 0);
			input.checked = isFulldayEvent;

			selects[0].disabled = input.checked;
			selects[1].disabled = input.checked;

			input.onclick = function() {
				if (input.checked === true) {
					var obj = {};
					scheduler.form_blocks.calendar_time.get_value(node, obj);

					start_date = scheduler.date.date_part(obj.start_date);
					end_date = scheduler.date.date_part(obj.end_date);

					if (+end_date == +start_date || (+end_date >= +start_date && (ev.end_date.getHours() !== 0 || ev.end_date.getMinutes() !== 0)))
						end_date = scheduler.date.add(end_date, 1, "day");
				}

				var start = start_date || ev.start_date;
				var end = end_date || ev.end_date;
				_attach_action(inputs[0], start);
				_attach_action(inputs[1], end);
				selects[0].value = start.getHours() * 60 + start.getMinutes();
				selects[1].value = end.getHours() * 60 + end.getMinutes();

				selects[0].disabled = input.checked;
				selects[1].disabled = input.checked;

			};
		}

		if (scheduler.config.event_duration && scheduler.config.auto_end_date) {

			var _update_minical_select = function () {
				start_date = scheduler.date.add(inputs[0]._date, selects[0].value, "minute");
				end_date = new Date(start_date.getTime() + (scheduler.config.event_duration * 60 * 1000));

				inputs[1].value = scheduler.templates.calendar_time(end_date);
				inputs[1]._date = scheduler.date.date_part(new Date(end_date));

				selects[1].value = end_date.getHours() * 60 + end_date.getMinutes();
			};

			selects[0].onchange = _update_minical_select; // only update on first select should trigger update so user could define other end date if he wishes too
		}

		function _attach_action(inp, date, number) {
			_init_once(inp, date, number);
			inp.value = scheduler.templates.calendar_time(date);
			inp._date = scheduler.date.date_part(new Date(date));
		}

		_attach_action(inputs[0], ev.start_date, 0);
		_attach_action(inputs[1], ev.end_date, 1);
		_init_once = function() {};

		function _round_minutes(date) {
			var time_values = config._time_values;
			var direct_value = date.getHours() * 60 + date.getMinutes();
			var fixed_value = direct_value;
			var value_found = false;

			for (var k = 0; k < time_values.length; k++) {
				var t_v = time_values[k];
				if (t_v === direct_value) {
					value_found = true;
					break;
				}
				if (t_v < direct_value)
					fixed_value = t_v;
			}

			if(!(value_found || fixed_value))
				return -1;

			return (value_found) ? direct_value : fixed_value;
		}

		selects[0].value = _round_minutes(ev.start_date);
		selects[1].value = _round_minutes(ev.end_date);

	},
	get_value: function(node, ev) {
		var inputs = node.getElementsByTagName("input");
		var selects = node.getElementsByTagName("select");

		ev.start_date = scheduler.date.add(inputs[0]._date, selects[0].value, "minute");
		ev.end_date = scheduler.date.add(inputs[1]._date, selects[1].value, "minute");

		if (ev.end_date <= ev.start_date)
			ev.end_date = scheduler.date.add(ev.start_date, scheduler.config.time_step, "minute");
		return {
			start_date: new Date(ev.start_date),
			end_date: new Date(ev.end_date)
		};
	},
	focus: function(node) {
	}
};
scheduler.linkCalendar = function(calendar, datediff) {
	var action = function() {
		var date = scheduler._date;
		var dateNew = new Date(date.valueOf());
		if (datediff) dateNew = datediff(dateNew);
		dateNew.setDate(1);
		scheduler.updateCalendar(calendar, dateNew);
		return true;
	};

	scheduler.attachEvent("onViewChange", action);
	scheduler.attachEvent("onXLE", action);
	scheduler.attachEvent("onEventAdded", action);
	scheduler.attachEvent("onEventChanged", action);
	scheduler.attachEvent("onAfterEventDelete", action);
	action();
};

scheduler._markCalendarCurrentDate = function(calendar) {
	var date = scheduler._date;
	var mode = scheduler._mode;
	var month_start = scheduler.date.month_start(new Date(calendar._date));
	var month_end = scheduler.date.add(month_start, 1, "month");

	if (mode == 'day' || (this._props && !!this._props[mode])) { // if day or units view
		if (month_start.valueOf() <= date.valueOf() && month_end > date) {
			scheduler.markCalendar(calendar, date, "dhx_calendar_click");
		}
	} else if (mode == 'week') {
		var dateNew = scheduler.date.week_start(new Date(date.valueOf()));
		for (var i = 0; i < 7; i++) {
			if (month_start.valueOf() <= dateNew.valueOf() && month_end > dateNew) // >= would mean mark first day of the next month
				scheduler.markCalendar(calendar, dateNew, "dhx_calendar_click");
			dateNew = scheduler.date.add(dateNew, 1, "day");
		}
	}
};

scheduler.attachEvent("onEventCancel", function(){
	scheduler.destroyCalendar(null, true);
});
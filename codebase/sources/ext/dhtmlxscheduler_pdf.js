/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
(function() {
	var dx, dy,	
		html_regexp = new RegExp("<[^>]*>", "g"),
		newline_regexp = new RegExp("<br[^>]*>", "g");

	function clean_html(val) {
		return val.replace(newline_regexp, "\n").replace(html_regexp, "");
	}

	function x_norm(x, offset) {
		x = parseFloat(x);
		offset = parseFloat(offset);
		if (!isNaN(offset)) x -= offset;

		var w = colsWidth(x);
		x = x - w.width + w.cols*dx;
		return isNaN(x)?"auto":(100*x/(dx));
	}

	function x_norm_event(x, offset, is_left) {
		x = parseFloat(x);
		offset = parseFloat(offset);
		if (!isNaN(offset) && is_left) x -= offset;

		var w = colsWidth(x);
		x = x - w.width + w.cols*dx;
		return isNaN(x)?"auto":(100*x/(dx-(!isNaN(offset)?offset:0)));
	}
	function colsWidth(width) {
		var r = 0;
		var header = scheduler._els.dhx_cal_header[0].childNodes;
		var els = header[1] ? header[1].childNodes : header[0].childNodes;
		for (var i = 0; i < els.length; i++) {
			var el = els[i].style ? els[i] : els[i].parentNode;
			var w = parseFloat(el.style.width);
			if (width > w){
				width -= (w+1);
				r+=(w+1);
			}
			else
				break;
		}
		return { width: r, cols: i };
	}

	function y_norm(y) {
		y = parseFloat(y);
		if (isNaN(y)) return "auto";
		return 100 * y / dy;
	}

	function get_style(node, style){
		return (window.getComputedStyle?(window.getComputedStyle(node, null)[style]):(node.currentStyle?node.currentStyle[style]:null))||"";
	}

	function de_day(node, n) {
		var x = parseInt(node.style.left, 10);

		for (var dx = 0; dx < scheduler._cols.length; dx++) {
			x -= scheduler._cols[dx];
			if (x < 0) return dx;
		}
		return n;
	}

	function de_week(node, n) {
		var y = parseInt(node.style.top, 10);
		for (var dy = 0; dy < scheduler._colsS.heights.length; dy++)
			if (scheduler._colsS.heights[dy] > y) return dy;
		return n;
	}

	function xml_start(tag) {
		return tag ? "<"+tag+">" : "";
	}
	function xml_end(tag) {
		return tag ? "</"+tag+">" : "";
	}

	function xml_top(tag, profile, header, footer) {
		var xml = "<"+tag+" profile='" + profile + "'";
		if (header)
			xml += " header='" + header + "'";
		if (footer)
			xml += " footer='" + footer + "'";
		xml += ">";
		return xml;
	}

	function xml_body_header() {
		var xml = "";
		// detects if current mode is timeline
		var mode = scheduler._mode;
		if (scheduler.matrix && scheduler.matrix[scheduler._mode])
			mode = (scheduler.matrix[scheduler._mode].render == "cell") ? "matrix" : "timeline";
		xml += "<scale mode='" + mode + "' today='" + scheduler._els.dhx_cal_date[0].innerHTML + "'>";

		if (scheduler._mode == "week_agenda") {
			var xh = scheduler._els.dhx_cal_data[0].getElementsByTagName("DIV");
			for (var i = 0; i < xh.length; i++)
				if (xh[i].className == "dhx_wa_scale_bar")
					xml += "<column>" + clean_html(xh[i].innerHTML) + "</column>";
		} else if (scheduler._mode == "agenda" || scheduler._mode == "map") {
			var xh = scheduler._els.dhx_cal_header[0].childNodes[0].childNodes;

			xml += "<column>" + clean_html(xh[0].innerHTML) + "</column><column>" + clean_html(xh[1].innerHTML) + "</column>";
		} else if (scheduler._mode == "year") {
			var xh = scheduler._els.dhx_cal_data[0].childNodes;
			for (var i = 0; i < xh.length; i++) {
				xml += "<month label='" + clean_html(xh[i].childNodes[0].innerHTML) + "'>";
				xml += xml_month_scale(xh[i].childNodes[1].childNodes);
				xml += xml_month(xh[i].childNodes[2]);
				xml += "</month>";
			}
		} else {
			xml += "<x>";
			var xh = scheduler._els.dhx_cal_header[0].childNodes;
			xml += xml_month_scale(xh);
			xml += "</x>";

			var yh = scheduler._els.dhx_cal_data[0];
			if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
				xml += "<y>";
				for (var i = 0; i < yh.firstChild.rows.length; i++) {
					var el = yh.firstChild.rows[i];
					xml += "<row><![CDATA[" + clean_html(el.cells[0].innerHTML) + "]]></row>";
				}
				xml += "</y>";
				dy = yh.firstChild.rows[0].cells[0].offsetHeight;
			} else if (yh.firstChild.tagName == "TABLE") {
				xml += xml_month(yh);
			} else {
				yh = yh.childNodes[yh.childNodes.length - 1];
				while (yh.className.indexOf("dhx_scale_holder") == -1)
					yh = yh.previousSibling;
				yh = yh.childNodes;

				xml += "<y>";
				for (var i = 0; i < yh.length; i++)
					xml += "\n<row><![CDATA[" + clean_html(yh[i].innerHTML) + "]]></row>";
				xml += "</y>";
				dy = yh[0].offsetHeight;
			}
		}
		xml += "</scale>";
		return xml;
	}

	function xml_month(yh) {
		var xml = "";
		var r = yh.firstChild.rows;
		for (var i = 0; i < r.length; i++) {
			var days = [];
			for (var j = 0; j < r[i].cells.length; j++)
				days.push(r[i].cells[j].firstChild.innerHTML);

			xml += "\n<row height='" + yh.firstChild.rows[i].cells[0].offsetHeight + "'><![CDATA[" + clean_html(days.join("|")) + "]]></row>";
			dy = yh.firstChild.rows[0].cells[0].offsetHeight;
		}
		return xml;
	}

	function xml_month_scale(xh) {
		var xhs,
			xml = "";
		if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
			if (scheduler.matrix[scheduler._mode].second_scale)
				xhs = xh[1].childNodes;

			xh = xh[0].childNodes;
		}

		for (var i = 0; i < xh.length; i++)
			xml += "\n<column><![CDATA[" + clean_html(xh[i].innerHTML) + "]]></column>";
		dx = xh[0].offsetWidth;

		if (xhs) {
			var width = 0;
			var top_width = xh[0].offsetWidth;
			var top_col = 1;
			for (var i = 0; i < xhs.length; i++) {
				xml += "\n<column second_scale='" + top_col + "'><![CDATA[" + clean_html(xhs[i].innerHTML) + "]]></column>";
				width += xhs[i].offsetWidth;
				if (width >= top_width) {
					top_width += (xh[top_col] ? xh[top_col].offsetWidth : 0);
					top_col++;
				}
				dx = xhs[0].offsetWidth;
			}
		}
		return xml;
	}

	function xml_body(colors) {
		var xml = "";
		var evs = scheduler._rendered;
		var matrix = scheduler.matrix && scheduler.matrix[scheduler._mode];

		if (scheduler._mode == "agenda" || scheduler._mode == "map") {

			for (var i = 0; i < evs.length; i++)
                xml += "<event><head><![CDATA[" + clean_html(evs[i].childNodes[0].innerHTML) + "]]></head><body><![CDATA[" + clean_html(evs[i].childNodes[2].innerHTML) + "]]></body></event>";

		} else if (scheduler._mode == "week_agenda") {

			for (var i = 0; i < evs.length; i++)
				xml += "<event day='" + evs[i].parentNode.getAttribute("day") + "'><body>" + clean_html(evs[i].innerHTML) + "</body></event>";

		} else if (scheduler._mode == "year") {

			var evs = scheduler.get_visible_events();
			for (var i = 0; i < evs.length; i++) {
				var d = evs[i].start_date;
				if (d.valueOf() < scheduler._min_date.valueOf())
					d = scheduler._min_date;

				while (d < evs[i].end_date) {
					var m = d.getMonth() + 12 * (d.getFullYear() - scheduler._min_date.getFullYear()) - scheduler.week_starts._month;
					var day = scheduler.week_starts[m] + d.getDate() - 1;
					var text_color = colors ? get_style(scheduler._get_year_cell(d), "color") : "";
					var bg_color = colors ? get_style(scheduler._get_year_cell(d), "backgroundColor") : "";

					xml += "<event day='" + (day % 7) + "' week='" + Math.floor(day / 7) + "' month='" + m + "' backgroundColor='" + bg_color + "' color='" + text_color + "'></event>";
					d = scheduler.date.add(d, 1, "day");
					if (d.valueOf() >= scheduler._max_date.valueOf())
						break;
				}
			}
		} else if (matrix && matrix.render == "cell") {
			var evs = scheduler._els.dhx_cal_data[0].getElementsByTagName("TD");
			for (var i = 0; i < evs.length; i++) {
				var text_color = colors ? get_style(evs[i], "color") : "";
				var bg_color = colors ? get_style(evs[i], "backgroundColor") : "";
				xml += "\n<event><body backgroundColor='" + bg_color + "' color='" + text_color + "'><![CDATA[" + clean_html(evs[i].innerHTML) + "]]></body></event>";
			}
		} else {
			for (var i = 0; i < evs.length; i++) {
				var zx, zdx;
				if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
					// logic for timeline view
					zx = x_norm(evs[i].style.left);
					zdx = x_norm(evs[i].offsetWidth)-1;
				} else {
					// we should use specific logic for day/week/units view
					var left_norm = scheduler.config.use_select_menu_space ? 0 : 26;
					zx = x_norm_event(evs[i].style.left, left_norm, true);
					zdx = x_norm_event(evs[i].style.width, left_norm)-1;
				}
				if (isNaN(zdx * 1)) continue;
				var zy = y_norm(evs[i].style.top);
				var zdy = y_norm(evs[i].style.height);

				var e_type = evs[i].className.split(" ")[0].replace("dhx_cal_", "");
				if (e_type === 'dhx_tooltip_line') continue;

				var dets = scheduler.getEvent(evs[i].getAttribute("event_id"));
                if (!dets) continue;
				var day = dets._sday;
				var week = dets._sweek;
				var length = dets._length || 0;

				if (scheduler._mode == "month") {
					zdy = parseInt(evs[i].offsetHeight, 10);
					zy = parseInt(evs[i].style.top, 10) - scheduler.xy.month_head_height;

					day = de_day(evs[i], day);
					week = de_week(evs[i], week);
				} else if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
					day = 0;
					var el = evs[i].parentNode.parentNode.parentNode;
					week = el.rowIndex;
					var dy_copy = dy;
					dy = evs[i].parentNode.offsetHeight;
					zy = y_norm(evs[i].style.top);
					zy -= zy * 0.2;
					dy = dy_copy;
				} else {
					if (evs[i].parentNode == scheduler._els.dhx_cal_data[0]) continue;
					var parent = scheduler._els["dhx_cal_data"][0].childNodes[0];
					var offset = parseFloat(parent.className.indexOf("dhx_scale_holder") != -1 ? parent.style.left : 0);
					zx += x_norm(evs[i].parentNode.style.left, offset);
				}

				xml += "\n<event week='" + week + "' day='" + day + "' type='" + e_type + "' x='" + zx + "' y='" + zy + "' width='" + zdx + "' height='" + zdy + "' len='" + length + "'>";

				if (e_type == "event") {
					xml += "<header><![CDATA[" + clean_html(evs[i].childNodes[1].innerHTML) + "]]></header>";
					var text_color = colors ? get_style(evs[i].childNodes[2], "color") : "";
					var bg_color = colors ? get_style(evs[i].childNodes[2], "backgroundColor") : "";
					xml += "<body backgroundColor='" + bg_color + "' color='" + text_color + "'><![CDATA[" + clean_html(evs[i].childNodes[2].innerHTML) + "]]></body>";
				} else {
					var text_color = colors ? get_style(evs[i], "color") : "";
					var bg_color = colors ? get_style(evs[i], "backgroundColor") : "";
					xml += "<body backgroundColor='" + bg_color + "' color='" + text_color + "'><![CDATA[" + clean_html(evs[i].innerHTML) + "]]></body>";
				}
				xml += "</event>";
			}
			}

		return xml;
	}

	function to_pdf(start, end, view, url, mode, header, footer) {
		var colors = false;
		if (mode == "fullcolor") {
			colors = true;
			mode = "color";
		}

		mode = mode || "color";

		var uid = scheduler.uid();
		var d = document.createElement("div");
		d.style.display = "none";
		document.body.appendChild(d);

		d.innerHTML = '<form id="' + uid + '" method="post" target="_blank" action="' + url + '" accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><input type="hidden" name="mycoolxmlbody"/> </form>';


		var xml = "";
		if (start) {
			var original_date = scheduler._date;
			var original_mode = scheduler._mode;
			end = scheduler.date[view+"_start"](end);
			end = scheduler.date["get_"+view+"_end"] ? scheduler.date["get_"+view+"_end"](end) : scheduler.date.add(end, 1, view);

			xml = xml_top("pages", mode, header, footer);
			for (var temp_date = new Date(start); +temp_date < +end; temp_date = scheduler.date.add(temp_date, 1, view)) {
				scheduler.setCurrentView(temp_date, view);
				xml += xml_start("page") + xml_body_header().replace("\u2013", "-") + xml_body(colors) + xml_end("page");
			}
			xml += xml_end("pages");

			scheduler.setCurrentView(original_date, original_mode);
		} else {
			xml = xml_top("data", mode, header, footer) + xml_body_header().replace("\u2013", "-") + xml_body(colors) + xml_end("data");
		}


		document.getElementById(uid).firstChild.value = encodeURIComponent(xml);
		document.getElementById(uid).submit();
		d.parentNode.removeChild(d);
	}

	scheduler.toPDF = function(url, mode, header, footer) {
		return to_pdf.apply(this, [null, null, null, url, mode, header, footer]);
	};
	scheduler.toPDFRange = function(start, end, view, url, mode, header, footer) {
		if (typeof start == "string") {
			start = scheduler.templates.api_date(start);
			end = scheduler.templates.api_date(end);
		}

		return to_pdf.apply(this, arguments);
	};
})();

/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

scheduler.config.occurrence_timestamp_in_utc = false;
scheduler.config.recurring_workdays = [1,2,3,4,5];
scheduler.form_blocks["recurring"] = {
	_get_node : function(node){
		if (typeof node == "string")
			node = document.getElementById(node);
		if (node.style.display == 'none')
			node.style.display = "";
		return node;
	},
	_outer_html: function(node){
		return node.outerHTML || getOuterHTML(node);

		//probably not needed, FF v10- only
		function getOuterHTML(n){
			var div = document.createElement('div'), h;
			div.appendChild( n.cloneNode(true) );
			h = div.innerHTML;
			div = null;
			return h;
		}
	},
	render:function(sns) {
		if(sns.form){
			var rec = scheduler.form_blocks["recurring"];
			var form = rec._get_node(sns.form);
			var html = rec._outer_html(form);
			form.style.display = 'none';
			return html;
		}
		var loc = scheduler.locale.labels;
		return '<div class="dhx_form_repeat"> '+
					'<form> '+
						'<div class="dhx_repeat_left"> '+
							'<label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />'+loc.repeat_radio_day+'</label><br /> '+
							'<label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>'+loc.repeat_radio_week+'</label><br /> '+
							'<label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />'+loc.repeat_radio_month+'</label><br /> '+
							'<label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />'+loc.repeat_radio_year+'</label> '+
						'</div> '+
						'<div class="dhx_repeat_divider">'+
						'</div> '+
						'<div class="dhx_repeat_center"> '+
							'<div style="display:none;" id="dhx_repeat_day"> '+
								'<label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>'+loc.repeat_radio_day_type+'</label>'+
								'<label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />'+loc.repeat_text_day_count+'</label><br /> '+
								'<label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>'+loc.repeat_radio_day_type2+'</label> '+
							'</div> '+
							'<div style="display:none;" id="dhx_repeat_week">'+
								'<label>'+loc.repeat_week+'<input class="dhx_repeat_text" type="text" name="week_count" value="1" /></label>'+
								'<span>'+loc.repeat_text_week_count+'</span><br /> '+
								'<table class="dhx_repeat_days"> '+
									'<tr> '+
										'<td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />'+loc.day_for_recurring[1]+'</label><br /> '+
										'<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />'+loc.day_for_recurring[4]+'</label> </td> '+
										'<td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />'+loc.day_for_recurring[2]+'</label><br /> '+
										'<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />'+loc.day_for_recurring[5]+'</label> </td> '+
										'<td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />'+loc.day_for_recurring[3]+'</label><br /> '+
										'<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />'+loc.day_for_recurring[6]+'</label> </td> '+
										'<td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />'+loc.day_for_recurring[0]+'</label><br /><br /> </td> '+
									'</tr> '+
								'</table> '+
							'</div> '+
							'<div id="dhx_repeat_month"> '+
								'<label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>'+loc.repeat_radio_month_type+'</label>'+
									'<label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />'+loc.repeat_text_month_day+'</label>'+
									'<label><input class="dhx_repeat_text" type="text" name="month_count" value="1" />'+loc.repeat_text_month_count+'</label><br /> '+
									'<label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>'+loc.repeat_radio_month_start+'</label>'+
									'<input class="dhx_repeat_text" type="text" name="month_week2" value="1" />'+
									'<label>'+
										'<select name="month_day2">'+
										'	<option value="1" selected >'+scheduler.locale.date.day_full[1]+
											'<option value="2">'+scheduler.locale.date.day_full[2]+
											'<option value="3">'+scheduler.locale.date.day_full[3]+
											'<option value="4">'+scheduler.locale.date.day_full[4]+
											'<option value="5">'+scheduler.locale.date.day_full[5]+
											'<option value="6">'+scheduler.locale.date.day_full[6]+
											'<option value="0">'+scheduler.locale.date.day_full[0]+
										'</select>'+
										loc.repeat_text_month_count2_before+
									'</label>'+
									'<label><input class="dhx_repeat_text" type="text" name="month_count2" value="1" />'+loc.repeat_text_month_count2_after+'</label><br /> '+
							'</div> '+
							'<div style="display:none;" id="dhx_repeat_year"> '+
								'<label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>'+loc.repeat_radio_day_type+'</label>'+
								'<label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />'+loc.repeat_text_year_day+'</label>'+
								'<label>'+
									'<select name="year_month">'+
										'<option value="0" selected >'+loc.month_for_recurring[0]+
										'<option value="1">'+loc.month_for_recurring[1]+
										'<option value="2">'+loc.month_for_recurring[2]+
										'<option value="3">'+loc.month_for_recurring[3]+
										'<option value="4">'+loc.month_for_recurring[4]+
										'<option value="5">'+loc.month_for_recurring[5]+
										'<option value="6">'+loc.month_for_recurring[6]+
										'<option value="7">'+loc.month_for_recurring[7]+
										'<option value="8">'+loc.month_for_recurring[8]+
										'<option value="9">'+loc.month_for_recurring[9]+
										'<option value="10">'+loc.month_for_recurring[10]+
										'<option value="11">'+loc.month_for_recurring[11]+
									'</select>'+
									loc.select_year_month+
								'</label><br /> '+
								'<label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>'+loc.repeat_year_label+'</label>'+
								'<input class="dhx_repeat_text" type="text" name="year_week2" value="1" />'+
								'<select name="year_day2">'+
									'<option value="1" selected >'+scheduler.locale.date.day_full[1]+
									'<option value="2">'+scheduler.locale.date.day_full[2]+
									'<option value="3">'+scheduler.locale.date.day_full[3]+
									'<option value="4">'+scheduler.locale.date.day_full[4]+
									'<option value="5">'+scheduler.locale.date.day_full[5]+
									'<option value="6">'+scheduler.locale.date.day_full[6]+
									'<option value="7">'+scheduler.locale.date.day_full[0]+
								'</select>'+
								loc.select_year_day2+
								'<select name="year_month2">'+
									'<option value="0" selected >'+loc.month_for_recurring[0]+
									'<option value="1">'+loc.month_for_recurring[1]+
									'<option value="2">'+loc.month_for_recurring[2]+
									'<option value="3">'+loc.month_for_recurring[3]+
									'<option value="4">'+loc.month_for_recurring[4]+
									'<option value="5">'+loc.month_for_recurring[5]+
									'<option value="6">'+loc.month_for_recurring[6]+
									'<option value="7">'+loc.month_for_recurring[7]+
									'<option value="8">'+loc.month_for_recurring[8]+
									'<option value="9">'+loc.month_for_recurring[9]+
									'<option value="10">'+loc.month_for_recurring[10]+
									'<option value="11">'+loc.month_for_recurring[11]+
								'</select><br /> '+
							'</div> '+
						'</div> '+
						'<div class="dhx_repeat_divider">'+
						'</div> '+
						'<div class="dhx_repeat_right"> '+
							'<label><input class="dhx_repeat_radio" type="radio" name="end" checked/>'+loc.repeat_radio_end+'</label><br /> '+
							'<label><input class="dhx_repeat_radio" type="radio" name="end" />'+loc.repeat_radio_end2+'</label>'+
							'<input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />'+loc.repeat_text_occurences_count+'<br /> '+
							'<label><input class="dhx_repeat_radio" type="radio" name="end" />'+loc.repeat_radio_end3+'</label>'+
							'<input class="dhx_repeat_date" type="text" name="date_of_end" value="'+scheduler.config.repeat_date_of_end+'" /><br /> '+
						'</div> '+
					'</form> '+
				'</div> '+
				'<div style="clear:both"> '+
				'</div>';
	},
	_ds: {},
	_get_form_node: function(els, name, value){
		var col = els[name];
		if(!col) return null;
		if(col.nodeName) return col;

		if(col.length){
			for(var i=0; i < col.length; i++){
				if(col[i].value == value)
					return col[i];
			}
		}
	},
	_get_node_value: function(els, name, multiselect){
		var col = els[name];
		if(!col) return "";
		if(col.length){
			if(multiselect){
				var res = [];
				for (var i = 0; i < col.length; i++)
					if (col[i].checked) res.push(col[i].value);

				return res;
			}else{
				for (var i = 0; i < col.length; i++)
					if (col[i].checked) return col[i].value;
			}
		}

		if(col.value)
			return !multiselect ? col.value : [col.value];
	},

	_get_node_numeric_value: function(els, name){
		var value = scheduler.form_blocks["recurring"]._get_node_value(els, name);
		return ((value * 1) || 0);
	},

	_set_node_value: function(els, name, value){
		var col = els[name];
		if(!col) return;

		if(col.name == name){
			col.value = value;
		}else if(col.length){
			var hash_value = typeof value == "object";
			for (var i = 0; i < col.length; i++)
				if (hash_value || col[i].value == value){
					col[i].checked = hash_value ? !!value[col[i].value] : !!value;
				}
		}
	},

	_init_set_value:function(node, value, ev) {
		var block = scheduler.form_blocks["recurring"];
		var get_value = block._get_node_value;
		var set_value = block._set_node_value;
		scheduler.form_blocks["recurring"]._ds = {start:ev.start_date, end:ev._end_date};

		var str_date_format = scheduler.date.str_to_date(scheduler.config.repeat_date);
		var str_date = function(str_date) {
			var date = str_date_format(str_date);
			if (scheduler.config.include_end_by)
				date = scheduler.date.add(date, 1, 'day');
			return date;
		};

		var date_str = scheduler.date.date_to_str(scheduler.config.repeat_date);

		var top = node.getElementsByTagName("FORM")[0];
		var els = {};

		function register_els(inps) {
			for (var i = 0; i < inps.length; i++) {
				var inp = inps[i];

				if(inp.name){
					if(!els[inp.name]){
						els[inp.name] = inp;
					}else if(els[inp.name].nodeType){
						var node = els[inp.name];
						els[inp.name] = [node, inp];

					}else{
						els[inp.name].push(inp);
					}

				}
			}
		}

		register_els(top.getElementsByTagName("INPUT"));
		register_els(top.getElementsByTagName("SELECT"));

		if (!scheduler.config.repeat_date_of_end) {
			var formatter = scheduler.date.date_to_str(scheduler.config.repeat_date);
			scheduler.config.repeat_date_of_end = formatter(scheduler.date.add(scheduler._currentDate(), 30, "day"));
		}
		set_value(els, "date_of_end", scheduler.config.repeat_date_of_end);

		var $ = function(a) {
			return document.getElementById(a) || { style:{} };//return fake object if node not found
		};

		function change_current_view() {
			$("dhx_repeat_day").style.display = "none";
			$("dhx_repeat_week").style.display = "none";
			$("dhx_repeat_month").style.display = "none";
			$("dhx_repeat_year").style.display = "none";
			$("dhx_repeat_" + this.value).style.display = "block";
			scheduler.setLightboxSize();
		}

		function get_repeat_code(dates) {
			var code = [get_value(els, "repeat")];
			get_rcode[code[0]](code, dates);

			while (code.length < 5) code.push("");
			var repeat = "";

			var end = get_end_rule(els);

			if (end == "no") {
				dates.end = new Date(9999, 1, 1);
				repeat = "no";
			}
			else if (end == "date_of_end") {
				dates.end = str_date(get_value(els, "date_of_end"));
			}
			else {
				scheduler.transpose_type(code.join("_"));
				repeat = Math.max(1, get_value(els, "occurences_count"));

				var transp = 0;

				//var transp = ((code[0] == "week" && code[4] && code[4].toString().indexOf(scheduler.config.start_on_monday ? 1 : 0) == -1) ? 1 : 0);

				// which is equal to following code, seems to produce extra instance, not clear why needed

				/*if(code[0] == "week"){
					var days = code[4] || "";
					if(scheduler.config.start_on_monday){
						if(days.indexOf(1) == -1)
						transp = 1;
					}else{
						if(days.indexOf(0) == -1)
						transp = 1;
					}
				}*/

			//	dates.end = scheduler.date.add(new Date(dates.start), repeat + transp, code.join("_"));

				dates.end = scheduler.date["add_" + code.join("_")](new Date(dates.start), repeat + transp, {start_date: dates.start}) || dates.start;
			}

			return code.join("_") + "#" + repeat;
		}
		function get_end_rule(els){
			var end = els["end"];
			if(end.length){
				for(var i =0; i < end.length; i++){
					if(end[i].checked){
						if(end[i].value && end[i].value != "on"){//seems to be default value:var input = document.createElement("input"); input.type = "radio"; input.value
							return end[i].value;
						}else{
							if(!i){
								return "no";
							}else if(i == 2){
								return "date_of_end";
							}else{
								return "occurences_count";
							}
						}
					}
				}
			}else{
				if(end.value)
					return end.value;
			}
			return "no";
		}
		function set_end_rule(els, value){
			var end = els["end"];

			if(end.length){
				var has_values = !!end[0].value && end[0].value != "on";
				if(has_values){
					for(var i =0; i < end.length; i++){
						if(end[i].value == value)
							end[i].checked = true;
					}
				}else{
					var ind = 0;
					switch(value){
						case "no":
							ind = 0;
							break;
						case "date_of_end":
							ind = 2;
							break;
						default:
							ind = 1;
							break;
					}
					end[ind].checked = true;
				}
			}else{
				end.value = value;
			}
		}


		scheduler.form_blocks["recurring"]._get_repeat_code = get_repeat_code;
		var get_rcode = {
			month:function(code, dates) {
				var get_value = scheduler.form_blocks["recurring"]._get_node_value;
				var get_numeric_value = scheduler.form_blocks["recurring"]._get_node_numeric_value;

				if (get_value(els, "month_type") == "d") {
					code.push(Math.max(1, get_numeric_value(els, "month_count")));
					dates.start.setDate(get_value(els, "month_day"));
				} else {
					code.push(Math.max(1, get_numeric_value(els, "month_count2")));
					code.push( get_value(els, "month_day2"));
					code.push(Math.max(1, get_numeric_value(els, "month_week2")));
					if (!scheduler.config.repeat_precise){
						dates.start.setDate(1);
					}
				}
				dates._start = true;
			},
			week:function(code, dates) {
				var get_value = scheduler.form_blocks["recurring"]._get_node_value;
				var get_numeric_value = scheduler.form_blocks["recurring"]._get_node_numeric_value;

				code.push(Math.max(1, get_numeric_value(els, "week_count")));
				code.push("");
				code.push("");
				var t = [];

				var col = get_value(els, "week_day", true);
				//var col = els["week_day"];
				var day = dates.start.getDay();
				var start_exists = false;

				for (var i = 0; i < col.length; i++){
					t.push(col[i]);
					start_exists = start_exists || col[i] == day;
				}
				if (!t.length){
					t.push(day);
					start_exists = true;
				}
				t.sort();


				if (!scheduler.config.repeat_precise){
					dates.start = scheduler.date.week_start(dates.start);
					dates._start = true;
				} else if (!start_exists){
					scheduler.transpose_day_week(dates.start, t, 1, 7);
					dates._start = true;
				}

				code.push(t.join(","));
			},
			day:function(code) {
				var get_value = scheduler.form_blocks["recurring"]._get_node_value;
				var get_numeric_value = scheduler.form_blocks["recurring"]._get_node_numeric_value;

				if (get_value(els, "day_type") == "d") {
					code.push(Math.max(1, get_numeric_value(els, "day_count")));
				}
				else {
					code.push("week");
					code.push(1);
					code.push("");
					code.push("");
					code.push(scheduler.config.recurring_workdays.join(","));
					code.splice(0, 1);
				}
			},
			year:function(code, dates) {
				var get_value = scheduler.form_blocks["recurring"]._get_node_value;

				if (get_value(els, "year_type") == "d") {
					code.push("1");
					dates.start.setMonth(0);
					dates.start.setDate(get_value(els, "year_day"));
					dates.start.setMonth(get_value(els, "year_month"));

				} else {
					code.push("1");
					code.push(get_value(els, "year_day2"));
					code.push(get_value(els, "year_week2"));
					dates.start.setDate(1);
					dates.start.setMonth(get_value(els, "year_month2"));
				}
				dates._start = true;
			}
		};
		var set_rcode = {
			week:function(code, dates) {
				var set_value = scheduler.form_blocks["recurring"]._set_node_value;
				set_value(els, "week_count", code[1]);

				var t = code[4].split(",");
				var d = {};
				for (var i = 0; i < t.length; i++) d[t[i]] = true;

				set_value(els, "week_day", d);

				//for (var i = 0; i < col.length; i++)
				//	col[i].checked = (!!d[col[i].value]);
			},
			month:function(code, dates) {
				var set_value = scheduler.form_blocks["recurring"]._set_node_value;

				if (code[2] === "") {
					set_value(els, "month_type", "d");
					set_value(els, "month_count", code[1]);
					set_value(els, "month_day", dates.start.getDate());
				} else {
					set_value(els, "month_type", "w");
					set_value(els, "month_count2", code[1]);
					set_value(els, "month_week2",  code[3]);
					set_value(els, "month_day2", code[2]);
				}
			},
			day:function(code, dates) {
				var set_value = scheduler.form_blocks["recurring"]._set_node_value;
				set_value(els, "day_type", "d");
				set_value(els, "day_count", code[1]);
			},
			year:function(code, dates) {
				var set_value = scheduler.form_blocks["recurring"]._set_node_value;

				if (code[2] === "") {
					set_value(els, "year_type", "d");
					set_value(els, "year_day", dates.start.getDate());
					set_value(els, "year_month", dates.start.getMonth());

				} else {
					set_value(els, "year_type", "w");
					set_value(els, "year_week2", code[3]);
					set_value(els, "year_day2", code[2]);
					set_value(els, "year_month2", dates.start.getMonth());
				}
			}
		};

		function set_repeat_code(code, dates) {
			var set_value = scheduler.form_blocks["recurring"]._set_node_value;
			var data = code.split("#");
			code = data[0].split("_");
			set_rcode[code[0]](code, dates);


			switch (data[1]) {
				case "no":
					set_end_rule(els, "no");
					break;
				case "":
					set_end_rule(els, "date_of_end");

					var end_date = dates.end;
					if (scheduler.config.include_end_by){
						end_date = scheduler.date.add(end_date, -1, 'day');
					}
					set_value(els, "date_of_end", date_str(end_date));

					break;
				default:
					set_end_rule(els, "occurences_count");
					set_value(els, "occurences_count", data[1]);

					break;
			}

			set_value(els, "repeat", code[0]);
			//e.checked = true;

			var node = scheduler.form_blocks["recurring"]._get_form_node(els, "repeat", code[0]);
			if(node.nodeName == "SELECT" && node.onchange){
				node.onchange();
			}else if(node.onclick){
				node.onclick();
			}
		}
		function activate(els, mode){

		}
		scheduler.form_blocks["recurring"]._set_repeat_code = set_repeat_code;

		for (var i = 0; i < top.elements.length; i++) {
			var el = top.elements[i];
			switch (el.name) {
				case "repeat":
					if(el.nodeName == "SELECT"){
						el.onchange = change_current_view;
					}else{
						el.onclick = change_current_view;
					}


					break;
			}
		}
		scheduler._lightbox._rec_init_done = true;
	},
	set_value:function(node, value, ev) {
		var rf = scheduler.form_blocks["recurring"];
		if (!scheduler._lightbox._rec_init_done)
			rf._init_set_value(node, value, ev);
		node.open = !ev.rec_type;

		node.blocked = this._is_modified_occurence(ev);

		var ds = rf._ds;
		ds.start = ev.start_date;
		ds.end = ev._end_date;

		rf._toggle_block();

		if (value)
			rf._set_repeat_code(value, ds);
	},
	get_value:function(node, ev) {
		if (node.open) {
			var ds = scheduler.form_blocks["recurring"]._ds;
			var actual_dates = {};
			this.formSection('time').getValue(actual_dates);
			ds.start = actual_dates.start_date;
			ev.rec_type = scheduler.form_blocks["recurring"]._get_repeat_code(ds);
			if (ds._start) {
				ev.start_date = new Date(ds.start);
				ev._start_date = new Date(ds.start);
				ds._start = false;
			} else
				ev._start_date = null;

			ev._end_date = ds.end;
			ev.rec_pattern = ev.rec_type.split("#")[0];
		} else {
			ev.rec_type = ev.rec_pattern = "";
			ev._end_date = ev.end_date;
		}
		return ev.rec_type;
	},
	_get_button: function(){
		var node = scheduler.formSection("recurring").header;
		return node.firstChild.firstChild;
	},
	_get_form: function(){
		return scheduler.formSection("recurring").node;
	},
	open:function(){
		var block = scheduler.form_blocks.recurring;

		var cont = block._get_form();
		if(!cont.open)
			block._toggle_block();
	},
	close: function(){
		var block = scheduler.form_blocks.recurring;

		var cont = block._get_form();

		if(cont.open)
			block._toggle_block();
	},
	_toggle_block: function(){
		var block = scheduler.form_blocks.recurring;

		var cont = block._get_form(),
			el = block._get_button();
		if (!cont.open && !cont.blocked) {
			cont.style.height = "auto";//reset to default value
			if(el){
				el.style.backgroundPosition = "-5px 0px";
				el.nextSibling.innerHTML = scheduler.locale.labels.button_recurring_open;
			}
		} else {
			cont.style.height = "0px";
			if(el){
				el.style.backgroundPosition = "-5px 20px";
				el.nextSibling.innerHTML = scheduler.locale.labels.button_recurring;
			}
		}
		cont.open = !cont.open;

		scheduler.setLightboxSize();
	},
	focus:function(node) {
	},
	button_click:function(index, el, section, cont) {
		var block = scheduler.form_blocks.recurring;
		var cont = block._get_form();
		if (!cont.blocked)
			scheduler.form_blocks.recurring._toggle_block();
	}
};


//problem may occur if we will have two repeating events in the same moment of time
scheduler._rec_markers = {};
scheduler._rec_markers_pull = {};
scheduler._add_rec_marker = function(ev, time) {
	ev._pid_time = time;
	this._rec_markers[ev.id] = ev;
	if (!this._rec_markers_pull[ev.event_pid]) this._rec_markers_pull[ev.event_pid] = {};
	this._rec_markers_pull[ev.event_pid][time] = ev;
};
scheduler._get_rec_marker = function(time, id) {
	var ch = this._rec_markers_pull[id];
	if (ch) return ch[time];
	return null;
};
scheduler._get_rec_markers = function(id) {
	return (this._rec_markers_pull[id] || []);
};

function clearMilliseconds(date){
//	return date;
	return new Date(
		date.getFullYear(), 
		date.getMonth(), 
		date.getDate(), 
		date.getHours(), 
		date.getMinutes(),
		date.getSeconds(),
		0
	);
}

scheduler._rec_temp = [];
(function() {
	var old_add_event = scheduler.addEvent;
	scheduler.addEvent = function(start_date, end_date, text, id, extra_data) {
		var ev_id = old_add_event.apply(this, arguments);

		if (ev_id && scheduler.getEvent(ev_id)) {
			var ev = scheduler.getEvent(ev_id);
			
			if(ev.start_date){
				ev.start_date = clearMilliseconds(ev.start_date);
			}
			if(ev.end_date){
				ev.end_date = clearMilliseconds(ev.end_date);
			}
			if (this._is_modified_occurence(ev))
				scheduler._add_rec_marker(ev, ev.event_length * 1000);
			if (ev.rec_type)
				ev.rec_pattern = ev.rec_type.split("#")[0];
		}
		return ev_id;
	};
})();

scheduler.attachEvent("onEventIdChange", function(id, new_id) {
	if (this._ignore_call) return;
	this._ignore_call = true;

	if(scheduler._rec_markers[id]){
		//important for for correct work of scheduler.getEvents(from, to) and collision detection
		scheduler._rec_markers[new_id] = scheduler._rec_markers[id];
		delete scheduler._rec_markers[id];
	}

	if(scheduler._rec_markers_pull[id]){
		scheduler._rec_markers_pull[new_id] = scheduler._rec_markers_pull[id];
		delete scheduler._rec_markers_pull[id];
	}

	for (var i = 0; i < this._rec_temp.length; i++) {
		var tev = this._rec_temp[i];
		if (tev.event_pid == id) {
			tev.event_pid = new_id;
			this.changeEventId(tev.id, new_id + "#" + tev.id.split("#")[1]);
		}
	}

	for(var i in this._rec_markers){
		var tev = this._rec_markers[i];
		if(tev.event_pid == id){
			tev.event_pid = new_id;
			tev._pid_changed = true;
		}
	}

	var el = scheduler._rec_markers[new_id];
	if(el && el._pid_changed) {
		delete el._pid_changed;
		setTimeout(function() {
			scheduler.callEvent("onEventChanged", [new_id, scheduler.getEvent(new_id)]);
		}, 1);
	}

	delete this._ignore_call;
});
scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id) {
	var ev = this.getEvent(id);
	if (this._is_virtual_event(id) || (this._is_modified_occurence(ev) && ev.rec_type && ev.rec_type != 'none')) {
		id = id.split("#");
		var nid = this.uid();
		var tid = (id[1]) ? id[1] : Math.round(ev._pid_time / 1000);

		var nev = this._copy_event(ev);
		nev.id = nid;
		nev.event_pid = ev.event_pid || id[0];
		var timestamp = tid;
		nev.event_length = timestamp;
		nev.rec_type = nev.rec_pattern = "none";
		this.addEvent(nev);

		this._add_rec_marker(nev, timestamp * 1000);
	} else {
		if (ev.rec_type && this._lightbox_id)
			this._roll_back_dates(ev);
		var sub = this._get_rec_markers(id);
		for (var i in sub) {
			if (sub.hasOwnProperty(i)) {
				id = sub[i].id;
				if (this.getEvent(id))
					this.deleteEvent(id, true);
			}
		}
	}
	return true;
});
scheduler.attachEvent("onEventDeleted", function(id, ev){
	if(!this._is_virtual_event(id) && this._is_modified_occurence(ev)){
		if(!scheduler._events[id]){
			ev.rec_type = ev.rec_pattern = "none";
			this.setEvent(id, ev);
		}
	}
});
scheduler.attachEvent("onEventChanged", function(id, event) {
	if (this._loading) return true;

	var ev = this.getEvent(id);

	if (this._is_virtual_event(id)) {
		var id = id.split("#");
		var nid = this.uid();
		this._not_render = true;

		var nev = this._copy_event(event);
		nev.id = nid;
		nev.event_pid = id[0];
		var timestamp = id[1];
		nev.event_length = timestamp;
		nev.rec_type = nev.rec_pattern = "";

		this._add_rec_marker(nev, timestamp * 1000);
		this.addEvent(nev);

		this._not_render = false;

	} else {
		if(ev.start_date){
			ev.start_date = clearMilliseconds(ev.start_date);
		}
		if(ev.end_date){
			ev.end_date = clearMilliseconds(ev.end_date);
		}

		if (ev.rec_type && this._lightbox_id){
			this._roll_back_dates(ev);
		}
		var sub = this._get_rec_markers(id);
		for (var i in sub) {
			if (sub.hasOwnProperty(i)) {
				delete this._rec_markers[sub[i].id];
				this.deleteEvent(sub[i].id, true);
			}
		}
		delete this._rec_markers_pull[id];

		// it's possible that after editing event is no longer exists, in such case we need to remove _select_id flag
		var isEventFound = false;
		for (var k = 0; k < this._rendered.length; k++) {
			if (this._rendered[k].getAttribute('event_id') == id)
				isEventFound = true;
		}
		if (!isEventFound)
			this._select_id = null;
	}
	return true;
});
scheduler.attachEvent("onEventAdded", function(id) {
	if (!this._loading) {
		var ev = this.getEvent(id);
		if (ev.rec_type && !ev.event_length){
			this._roll_back_dates(ev);
		}
	}
	return true;
});
scheduler.attachEvent("onEventSave", function(id, data, is_new_event) {
	var ev = this.getEvent(id);
	if (!ev.rec_type && data.rec_type && !this._is_virtual_event(id))
		this._select_id = null;
	return true;
});
scheduler.attachEvent("onEventCreated", function(id) {
	var ev = this.getEvent(id);
	if (!ev.rec_type)
		ev.rec_type = ev.rec_pattern = ev.event_length = ev.event_pid = "";
	return true;
});
scheduler.attachEvent("onEventCancel", function(id) {
	var ev = this.getEvent(id);
	if (ev.rec_type) {
		this._roll_back_dates(ev);
		// a bit expensive, but we need to be sure that event re-rendered, because view can be corrupted by resize , during edit process
		this.render_view_data();
	}
});
scheduler._roll_back_dates = function(ev) {
	if(ev.start_date){
		ev.start_date = clearMilliseconds(ev.start_date);
	}
	if(ev.end_date){
		ev.end_date = clearMilliseconds(ev.end_date);
	}
	ev.event_length = Math.round((ev.end_date.valueOf() - ev.start_date.valueOf()) / 1000);
	ev.end_date = ev._end_date;
	if (ev._start_date) {
		ev.start_date.setMonth(0);
		ev.start_date.setDate(ev._start_date.getDate());
		ev.start_date.setMonth(ev._start_date.getMonth());
		ev.start_date.setFullYear(ev._start_date.getFullYear());

	}
};

scheduler._is_virtual_event = function(id){
	return id.toString().indexOf("#") != -1;
};
scheduler._is_modified_occurence = function(ev){
	return (ev.event_pid && ev.event_pid != "0");
};

scheduler._validId = function(id) {
	return !this._is_virtual_event(id);
};

scheduler.showLightbox_rec = scheduler.showLightbox;
scheduler.showLightbox = function(id) {
	var locale = this.locale;
	var c = scheduler.config.lightbox_recurring;
	var ev = this.getEvent(id);
	var pid = ev.event_pid;
	var isVirtual = this._is_virtual_event(id);
	if (isVirtual)
		pid = id.split("#")[0];

	// show series
	var showSeries = function(id) {
		var event = scheduler.getEvent(id);
		event._end_date = event.end_date;
		event.end_date = new Date(event.start_date.valueOf() + event.event_length * 1000);
		return scheduler.showLightbox_rec(id); // editing series
	};

	if ( (pid || pid*1 === 0) && ev.rec_type) {
		// direct API call on series id
		return showSeries(id);
	}
	if ( !pid || pid === '0' || ( (!locale.labels.confirm_recurring || c == 'instance') || (c == 'series' && !isVirtual)) ) {
		// editing instance or non recurring event
		return this.showLightbox_rec(id);
	}
	if (c == 'ask') {
		var that = this;
		dhtmlx.modalbox({
			text: locale.labels.confirm_recurring,
			title: locale.labels.title_confirm_recurring,
			width: "500px",
			position: "middle",
			buttons:[locale.labels.button_edit_series, locale.labels.button_edit_occurrence, locale.labels.icon_cancel],
			callback: function(index) {
				switch(+index) {
					case 0:
						return showSeries(pid);
					case 1:
						return that.showLightbox_rec(id);
					case 2:
						return;
				}
			}
		});
	} else {
		showSeries(pid);
	}
};


scheduler.get_visible_events_rec = scheduler.get_visible_events;
scheduler.get_visible_events = function(only_timed) {
	for (var i = 0; i < this._rec_temp.length; i++)
		delete this._events[this._rec_temp[i].id];
	this._rec_temp = [];

	var stack = this.get_visible_events_rec(only_timed);
	var out = [];
	for (var i = 0; i < stack.length; i++) {
		if (stack[i].rec_type) {
			//deleted element of serie
			if (stack[i].rec_pattern != "none")
				this.repeat_date(stack[i], out);
		}
		else out.push(stack[i]);
	}
	return out;
};


(function() {
	var old = scheduler.isOneDayEvent;
	scheduler.isOneDayEvent = function(ev) {
		if (ev.rec_type) return true;
		return old.call(this, ev);
	};
	var old_update_event = scheduler.updateEvent;
	scheduler.updateEvent = function(id) {
		var ev = scheduler.getEvent(id);
		if(ev && ev.rec_type){
			//rec_type can be changed without the lightbox,
			// make sure rec_pattern updated as well
			ev.rec_pattern = (ev.rec_type || "").split("#")[0];
		}
		if (ev && ev.rec_type && !this._is_virtual_event(id)) {
			scheduler.update_view();
		} else {
			old_update_event.call(this, id);
		}
	};
})();

scheduler.transponse_size = {
	day:1, week:7, month:1, year:12
};
scheduler.date.day_week = function(sd, day, week) {
	sd.setDate(1);
	var originalMonth = scheduler.date.month_start(new Date(sd));
	week = (week - 1) * 7;
	var cday = sd.getDay();
	var nday = day * 1 + week - cday + 1;
	sd.setDate(nday <= week ? (nday + 7) : nday);
	var newMonth = scheduler.date.month_start(new Date(sd));
	if(originalMonth.valueOf() !== newMonth.valueOf()){
		return false;
	}
	return true;
};
scheduler.transpose_day_week = function(sd, list, cor, size, cor2) {
	var cday = (sd.getDay() || (scheduler.config.start_on_monday ? 7 : 0)) - cor;
	for (var i = 0; i < list.length; i++) {
		if (list[i] > cday)
			return sd.setDate(sd.getDate() + list[i] * 1 - cday - (size ? cor : cor2));
	}
	this.transpose_day_week(sd, list, cor + size, null, cor);
};
scheduler.transpose_type = function(type) {
	var transposeRecurring = "transpose_" + type;
	if (!this.date[transposeRecurring]) {
		var recurringParts = type.split("_");
		var dayDurationMs = 60 * 60 * 24 * 1000;
		var addRecurring = "add_" + type;
		var recurringStepDays = this.transponse_size[recurringParts[0]] * recurringParts[1];

		if (recurringParts[0] == "day" || recurringParts[0] == "week") {
			var weekDays = null;
			if (recurringParts[4]) {
				weekDays = recurringParts[4].split(",");
				if (scheduler.config.start_on_monday) {
					for (var i = 0; i < weekDays.length; i++)
						weekDays[i] = (weekDays[i] * 1) || 7;
					weekDays.sort();
				}
			}

			this.date[transposeRecurring] = function(nd, td) {
				var delta = Math.floor((td.valueOf() - nd.valueOf()) / (dayDurationMs * recurringStepDays));
				if (delta > 0)
					nd.setDate(nd.getDate() + delta * recurringStepDays);
				if (weekDays)
					scheduler.transpose_day_week(nd, weekDays, 1, recurringStepDays);

				return nd;
			};
			this.date[addRecurring] = function(sd, inc) {
				var nd = new Date(sd.valueOf());
				if (weekDays) {
					for (var count = 0; count < inc; count++)
						scheduler.transpose_day_week(nd, weekDays, 0, recurringStepDays);
				} else
					nd.setDate(nd.getDate() + inc * recurringStepDays);

				return nd;
			};
		}
		else if (recurringParts[0] == "month" || recurringParts[0] == "year") {
			this.date[transposeRecurring] = function(nd, td, seriesInstance) {
				var delta = Math.ceil(((td.getFullYear() * 12 + td.getMonth() * 1 + 1) - (nd.getFullYear() * 12 + nd.getMonth() * 1 + 1)) / (recurringStepDays) - 1);

				if (delta >= 0){
					nd.setDate(1);
					nd.setMonth(nd.getMonth() + delta * recurringStepDays);
				}

				return scheduler.date[addRecurring](nd, 0, seriesInstance);
				//if (str[3]){
				//	scheduler.date.day_week(nd, str[2], str[3]);
				//}
			};
			this.date[addRecurring] = function(sd, inc, seriesInstance, currentCount) {
				if(!currentCount){
					currentCount = 1;
				}else{
					currentCount++;
				}
				var maxCount = 12;
				if(currentCount > maxCount){
					return null;
				}

				var nd = new Date(sd.valueOf());
				nd.setDate(1);


				nd.setMonth(nd.getMonth() + inc * recurringStepDays);
				var origMonth = nd.getMonth();
				var origYear = nd.getFullYear();
				nd.setDate(seriesInstance.start_date.getDate());
				if (recurringParts[3]){
					scheduler.date.day_week(nd, recurringParts[2], recurringParts[3]);
				}

				var correctOverflowInstances = scheduler.config.recurring_overflow_instances;
				if(nd.getMonth() != origMonth && correctOverflowInstances != "none"){
					// no such day in a month
					if(correctOverflowInstances === "lastDay"){
						// return either last day of the month
						nd = new Date(origYear, origMonth + 1, 0, nd.getHours(), nd.getMinutes(), nd.getSeconds(), nd.getMilliseconds());
					}else{
						// or go to the next instance
						nd = scheduler.date[addRecurring](new Date(origYear, origMonth + 1, 0), inc||1, seriesInstance, currentCount);
						// if next instance is not possible (e.g. 'repeat on 40th day of the month') null will be returned
					}
				}
				return nd;
			};
		}
	}
};
scheduler.repeat_date = function(ev, stack, non_render, from, to, maxCount) {

	from = from || this._min_date;
	to = to || this._max_date;
	var max = maxCount || -1;
	var td = new Date(ev.start_date.valueOf());

	var startHour = td.getHours();

	var visibleCount = 0;

	if (!ev.rec_pattern && ev.rec_type)
		ev.rec_pattern = ev.rec_type.split("#")[0];

	this.transpose_type(ev.rec_pattern);
	td = scheduler.date["transpose_" + ev.rec_pattern](td, from, ev);
	while ( td && (
		td < ev.start_date ||
		scheduler._fix_daylight_saving_date(td,from,ev,td,new Date(td.valueOf() + ev.event_length * 1000)).valueOf() <= from.valueOf() ||
		td.valueOf() + ev.event_length * 1000 <= from.valueOf())){
			td = this.date["add_" + ev.rec_pattern](td, 1, ev);

	}
	while (td && (td < to && td < ev.end_date && (max < 0 || visibleCount < max))) {
		td.setHours(startHour);

		var timestamp = (scheduler.config.occurrence_timestamp_in_utc) ? Date.UTC(td.getFullYear(), td.getMonth(), td.getDate(), td.getHours(), td.getMinutes(), td.getSeconds()) : td.valueOf();
		var ch = this._get_rec_marker(timestamp, ev.id);
		if (!ch) { // unmodified element of series
			var ted = new Date(td.valueOf() + ev.event_length * 1000);
			var copy = this._copy_event(ev);
			//copy._timed = ev._timed;
			copy.text = ev.text;
			copy.start_date = td;
			copy.event_pid = ev.id;
			copy.id = ev.id + "#" + Math.round(timestamp / 1000);
			copy.end_date = ted;

			copy.end_date = scheduler._fix_daylight_saving_date(copy.start_date, copy.end_date, ev, td, copy.end_date);

			copy._timed = this.isOneDayEvent(copy);

			if (!copy._timed && !this._table_view && !this.config.multi_day) return;
			stack.push(copy);

			if (!non_render) {
				this._events[copy.id] = copy;
				this._rec_temp.push(copy);
			}

			visibleCount++;

		} else
		if (non_render){
			if(ch.rec_type != "none"){
				visibleCount++;
			}
			stack.push(ch);
		}

		td = this.date["add_" + ev.rec_pattern](td, 1, ev);
	//	if(!scheduler.date["validate_add_" + ev.rec_pattern](td, 1, ev.rec_pattern)){
	///		alert("detect add")
	//	}
	}
};
scheduler._fix_daylight_saving_date = function(start_date, end_date, ev, counter, default_date) {
	var shift = start_date.getTimezoneOffset() - end_date.getTimezoneOffset();
	if (shift) {
		if (shift > 0) {
			// e.g. 24h -> 23h
			return new Date(counter.valueOf() + ev.event_length * 1000 - shift * 60 * 1000);
		}
		else {
			// e.g. 24h -> 25h
			return new Date(end_date.valueOf() - shift * 60 * 1000);
		}
	}
	return new Date(default_date.valueOf());
};
scheduler.getRecDates = function(id, max) {
	var ev = typeof id == "object" ? id : scheduler.getEvent(id);
	var recurrings = [];
	max = max || 100;

	if (!ev.rec_type) {
		return [
			{ start_date: ev.start_date, end_date: ev.end_date }
		];
	}
	if (ev.rec_type == "none") {
		return [];
	}

	scheduler.repeat_date(ev, recurrings, true, ev.start_date, ev.end_date, max);

	var result = [];
	for(var i = 0; i < recurrings.length; i++){
		if(recurrings[i].rec_type != "none"){
			result.push({start_date: recurrings[i].start_date, end_date: recurrings[i].end_date});
		}
	}

	return result;
};
scheduler.getEvents = function(from, to) {
	var result = [];
	for (var a in this._events) {
		var ev = this._events[a];
		if (ev && ev.start_date < to && ev.end_date > from) {
			if (ev.rec_pattern) {
				if (ev.rec_pattern == "none") continue;
				var sev = [];
				this.repeat_date(ev, sev, true, from, to);
				for (var i = 0; i < sev.length; i++) {
					// if event is in rec_markers then it will be checked by himself, here need to skip it
					if (!sev[i].rec_pattern && sev[i].start_date < to && sev[i].end_date > from && !this._rec_markers[sev[i].id]) {
						result.push(sev[i]);
					}
				}
			} else if (!this._is_virtual_event(ev.id)) { // if it's virtual event we can skip it
				result.push(ev);
			}
		}
	}
	return result;
};

scheduler.config.repeat_date = "%m.%d.%Y";
scheduler.config.lightbox.sections = [
	{name:"description", map_to:"text", type:"textarea" , focus:true},
	{name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring"},
	{name:"time", height:72, type:"time", map_to:"auto"}
];


//drop secondary attributes
scheduler._copy_dummy = function(ev) {
	var start_date = new Date(this.start_date);
	var end_date = new Date(this.end_date);
	this.start_date = start_date;
	this.end_date = end_date;
	this.event_length = this.event_pid = this.rec_pattern = this.rec_type = null;
};

scheduler.config.include_end_by = false;
scheduler.config.lightbox_recurring = 'ask'; // series, instance

scheduler.attachEvent("onClearAll", function(){
	scheduler._rec_markers = {}; //clear recurring events data
	scheduler._rec_markers_pull = {};
	scheduler._rec_temp = [];
});
});

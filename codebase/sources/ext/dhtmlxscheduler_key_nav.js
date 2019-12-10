/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
(function(){

function setupKeyNav(scheduler){
		scheduler.config.key_nav = true;
		scheduler.config.key_nav_step = 30;
		scheduler.addShortcut = function(shortcut, handler, scope){
			var scopeObject = getScope(scope);
			if(scopeObject){
				scopeObject.prototype.bind(shortcut, handler);
			}
		};

		scheduler.getShortcutHandler = function(shortcut, scope){
			var scopeObject = getScope(scope);
			if(scopeObject){
				var commands = scheduler.$keyboardNavigation.shortcuts.parse(shortcut);
				if(commands.length){
					return scopeObject.prototype.findHandler(commands[0]);
				}
			}
		};

		scheduler.removeShortcut = function(shortcut, scope){
			var scopeObject = getScope(scope);
			if(scopeObject){
				scopeObject.prototype.unbind(shortcut);
			}
		};

		scheduler.focus = function(){
			if(!scheduler.config.key_nav){
				return;
			}
			var disp = scheduler.$keyboardNavigation.dispatcher;
			disp.enable();
			var activeNode = disp.getActiveNode();
			if(!activeNode || activeNode instanceof scheduler.$keyboardNavigation.MinicalButton || activeNode instanceof scheduler.$keyboardNavigation.MinicalCell){
				disp.setDefaultNode();
			}else{
				disp.focusNode(disp.getActiveNode());
			}
		};

		function getScope(mode){
			var scopes = {
				"minicalButton":scheduler.$keyboardNavigation.MinicalButton,
				"minicalDate":scheduler.$keyboardNavigation.MinicalCell,
				"scheduler":scheduler.$keyboardNavigation.SchedulerNode,
				"dataArea": scheduler.$keyboardNavigation.DataArea,
				"timeSlot": scheduler.$keyboardNavigation.TimeSlot,
				"event": scheduler.$keyboardNavigation.Event
			};

			var searchMap = {};
			for(var i in scopes)
				searchMap[i.toLowerCase()] = scopes[i];

			mode = (mode + "").toLowerCase();

			return searchMap[mode] || scopes.scheduler;
		}

		scheduler.$keyboardNavigation = {};

		scheduler._compose = function(){
			var parts = Array.prototype.slice.call(arguments, 0);
			var res = {};
			for(var i = 0; i < parts.length; i++){
				var obj = parts[i];
				if(typeof obj == "function"){
					obj = new obj();
				}

				for(var p in obj){
					res[p] = obj[p];
				}
			}
			return res;
		};

scheduler.$keyboardNavigation.shortcuts = {
	createCommand: function(){
		return {
			modifiers:{
				"shift": false,
				"alt": false,
				"ctrl": false,
				"meta": false
			},
			keyCode: null
		};
	},
	parse: function(shortcut){
		var commands = [];

		var expr = this.getExpressions(this.trim(shortcut));
		for(var i = 0; i < expr.length; i++){
			var words = this.getWords(expr[i]);

			var command = this.createCommand();

			for(var j = 0; j < words.length; j++){
				if(this.commandKeys[words[j]]){
					command.modifiers[words[j]] = true;
				}else if(this.specialKeys[words[j]]){
					command.keyCode = this.specialKeys[words[j]];
				}else{
					command.keyCode = words[j].charCodeAt(0);
				}
			}

			commands.push(command);
		}
		return commands;
	},

	getCommandFromEvent: function(domEvent){
		var command = this.createCommand();
		command.modifiers.shift = !!domEvent.shiftKey;
		command.modifiers.alt = !!domEvent.altKey;
		command.modifiers.ctrl = !!domEvent.ctrlKey;
		command.modifiers.meta = !!domEvent.metaKey;
		command.keyCode = domEvent.which || domEvent.keyCode;

		if(command.keyCode >= 96 && command.keyCode <= 105){
			// numpad keys 96-105 -> 48-57
			command.keyCode -= 48;//convert numpad  number code to regular number code
		}

		var printableKey = String.fromCharCode(command.keyCode );
		if(printableKey){
			command.keyCode = printableKey.toLowerCase().charCodeAt(0);
		}
		return command;
	},

	getHashFromEvent: function(domEvent){
		return this.getHash(this.getCommandFromEvent(domEvent));
	},

	getHash: function(command){
		var parts = [];
		for(var i in command.modifiers){
			if(command.modifiers[i]){
				parts.push(i);
			}
		}
		parts.push(command.keyCode);

		return parts.join(this.junctionChar);
	},

	getExpressions: function(shortcut){
		return shortcut.split(this.junctionChar);
	},
	getWords: function(term){
		return term.split(this.combinationChar);
	},
	trim: function(shortcut){
		return shortcut.replace(/\s/g, "");
	},
	junctionChar:",",
	combinationChar:"+",
	commandKeys:{
		"shift": 16,
		"alt": 18,
		"ctrl": 17,
		"meta": true
	},
	specialKeys:{
		"backspace": 8,
		"tab": 9,
		"enter": 13,
		"esc": 27,
		"space": 32,
		"up": 38,
		"down": 40,
		"left": 37,
		"right": 39,
		"home": 36,
		"end": 35,
		"pageup": 33,
		"pagedown": 34,
		"delete": 46,
		"insert": 45,
		"plus":107,
		"f1": 112,
		"f2": 113,
		"f3": 114,
		"f4": 115,
		"f5": 116,
		"f6": 117,
		"f7": 118,
		"f8": 119,
		"f9": 120,
		"f10": 121,
		"f11": 122,
		"f12": 123
	}
};
scheduler.$keyboardNavigation.EventHandler = {
	_handlers: null,
	findHandler: function(command){
		if(!this._handlers) this._handlers = {};
		var shortcuts = scheduler.$keyboardNavigation.shortcuts;
		var hash = shortcuts.getHash(command);

		return this._handlers[hash];
	},

	doAction: function(command, e){
		var handler = this.findHandler(command);
		if(handler){
			handler.call(this, e);

			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;

		}
	},
	bind: function(shortcut, handler){
		if(!this._handlers) this._handlers = {};

		var shortcuts = scheduler.$keyboardNavigation.shortcuts;

		var commands = shortcuts.parse(shortcut);
		for(var i = 0; i < commands.length; i++){
			this._handlers[shortcuts.getHash(commands[i])] = handler;
		}
	},
	unbind: function(shortcut){
		var shortcuts = scheduler.$keyboardNavigation.shortcuts;

		var commands = shortcuts.parse(shortcut);
		for(var i = 0; i < commands.length; i++){
			if(this._handlers[shortcuts.getHash(commands[i])]){
				delete this._handlers[shortcuts.getHash(commands[i])];
			}
		}
	},

	bindAll: function(map){
		for(var i in map){
			this.bind(i, map[i]);
		}
	},
	initKeys: function(){
		if(!this._handlers)
			this._handlers = {};
		if(this.keys){
			this.bindAll(this.keys);
		}
	}
};
(function(){
	scheduler.$keyboardNavigation.getFocusableNodes = scheduler._getFocusableNodes;

	scheduler.$keyboardNavigation.trapFocus = function trapFocus(root, e){
		if(e.keyCode != 9) return false;

		var focusable = scheduler.$keyboardNavigation.getFocusableNodes(root);
		var currentFocus = document.activeElement;
		var currentIndex = -1;
		for(var i = 0; i < focusable.length; i++){
			if(focusable[i] == currentFocus){
				currentIndex = i;
				break;
			}
		}

		var nextIndex, nextItem;
		if(e.shiftKey){

			// back tab
			// go to the last element if we focused on the first
			nextIndex = (currentIndex <= 0) ? (focusable[focusable.length - 1]) : (currentIndex - 1);

			nextItem = focusable[nextIndex];
			if(nextItem){
				nextItem.focus();
				e.preventDefault();
				return true;
			}

		}else{
			// forward tab
			// forward tab from last element should go back to the first element
			nextIndex = (currentIndex >= focusable.length - 1) ? 0 : (currentIndex + 1);
			nextItem = focusable[nextIndex];
			if(nextItem){
				nextItem.focus();
				e.preventDefault();
				return true;
			}

		}

		return false;
	};
})();
scheduler.$keyboardNavigation.marker = {
	clear: function(){
		var divs = scheduler.$container.querySelectorAll(".dhx_focus_slot");
		for(var i = 0; i < divs.length; i++){
			divs[i].parentNode.removeChild(divs[i]);
		}
	},
	createElement: function(){
		var element = document.createElement("div");
		element.setAttribute("tabindex", -1);
		element.className = "dhx_focus_slot";
		return element;
	},

	renderMultiple: function(start, end, method){
		var divs = [];
		var currentStart = new Date(start);
		var currentEnd = new Date(Math.min(end.valueOf(), scheduler.date.add(scheduler.date.day_start(new Date(start)), 1, "day").valueOf()));
		while(currentStart.valueOf() < end.valueOf()){

			divs = divs.concat(method.call(this, currentStart, new Date(Math.min(currentEnd.valueOf(), end.valueOf()))));
			currentStart = scheduler.date.day_start(scheduler.date.add(currentStart, 1, "day"));

			currentEnd = scheduler.date.day_start(scheduler.date.add(currentStart, 1, "day"));
			currentEnd = new Date(Math.min(currentEnd.valueOf(), end.valueOf()));
		}

		return divs;
	},


	render: function(start, end, section){
		this.clear();
		var divs = [];

		var modes = scheduler.$keyboardNavigation.TimeSlot.prototype._modes;
		var view = scheduler.$keyboardNavigation.TimeSlot.prototype._getMode();
		switch (view){
			case modes.units:
				divs = this.renderVerticalMarker(start, end, section);
				break;
			case modes.timeline:
				divs = this.renderTimelineMarker(start, end, section);
				break;
			case modes.year:
				divs = divs.concat(this.renderMultiple(start, end, this.renderYearMarker));
				break;
			case modes.month:
				divs = this.renderMonthMarker(start, end);
				break;
			case modes.weekAgenda:
				divs = divs.concat(this.renderMultiple(start, end, this.renderWeekAgendaMarker));
				break;
			case modes.list:
				divs = this.renderAgendaMarker(start, end);
				break;
			case modes.dayColumns:
				divs = divs.concat(this.renderMultiple(start, end, this.renderVerticalMarker));
				break;
		}

		this.addWaiAriaLabel(divs, start, end, section);
		this.addDataAttributes(divs, start, end, section);

		for(var i = divs.length - 1; i >= 0; i--){
			if(divs[i].offsetWidth){
				return divs[i];
			}
		}

		return null;
	},

	addDataAttributes: function(divs, start, end, section){
		var dateToStr = scheduler.date.date_to_str(scheduler.config.api_date);

		var from = dateToStr(start),
			to = dateToStr(end);

		for(var i = 0; i < divs.length; i++){
			divs[i].setAttribute("data-start-date", from);
			divs[i].setAttribute("data-end-date", to);
			if(section){
				divs[i].setAttribute("data-section", section);
			}
		}
	},

	addWaiAriaLabel: function(divs, start, end, section){
		var label = "";
		var state = scheduler.getState();
		var mode = state.mode;

		var dateTimeLabel = false;

		label += scheduler.templates.day_date(start);

		if((scheduler.date.day_start(new Date(start)).valueOf() != start.valueOf())){
			label += " " + scheduler.templates.hour_scale(start);
			dateTimeLabel = true;
		}

		if((scheduler.date.day_start(new Date(start)).valueOf() != scheduler.date.day_start(new Date(end)).valueOf())){

			label += " - " + scheduler.templates.day_date(end);
			if(dateTimeLabel || (scheduler.date.day_start(new Date(end)).valueOf() != end.valueOf())){
				label += " " + scheduler.templates.hour_scale(end);
			}
		}

		if(section){
			if(scheduler.matrix && scheduler.matrix[mode]){
				label += ", " + scheduler.templates[mode + "_scale_label"](section.key, section.label, section);
			}else if(scheduler._props && scheduler._props[mode]){
				label += ", " + scheduler.templates[mode + "_scale_text"](section.key, section.label, section);
			}
		}


		for(var i = 0; i < divs.length; i++){
			scheduler._waiAria.setAttributes(divs[i], {
				"aria-label": label,
				"aria-live": "polite"
			});
		}
	},

	renderWeekAgendaMarker: function(start_date, end_date){
		var divs = scheduler.$container.querySelectorAll(".dhx_wa_day_cont .dhx_wa_scale_bar");

		var currDate = scheduler.date.week_start(new Date(scheduler.getState().min_date));

		var index = -1;
		var markerDate = scheduler.date.day_start(new Date(start_date));
		for(var i = 0; i < divs.length; i++){
			index++;
			if(scheduler.date.day_start(new Date(currDate)).valueOf() == markerDate.valueOf()){
				break;
			}else{
				currDate = scheduler.date.add(currDate, 1, "day");
			}
		}
		if(index != -1) return this._wrapDiv(divs[index]);
		return [];
	},

	_wrapDiv: function(cell){
		var marker = this.createElement();
		marker.style.top = cell.offsetTop + "px";
		marker.style.left = cell.offsetLeft + "px";
		marker.style.width = cell.offsetWidth + "px";
		marker.style.height = cell.offsetHeight + "px";
		cell.appendChild(marker);
		return [marker];
	},
	renderYearMarker: function(start_date, end_date){
		var cell = scheduler._get_year_cell(start_date);
		cell.style.position = "relative";
		var marker = this.createElement();
		marker.style.top = "0px";
		marker.style.left = "0px";
		marker.style.width = "100%";
		marker.style.height = "100%";
		cell.appendChild(marker);
		return [marker];
	},

	renderAgendaMarker: function(start_date, end_date){
		var block = this.createElement();
		block.style.height = "1px";
		block.style.width = "100%";
		block.style.opacity = 1;
		block.style.top = "0px";
		block.style.left = "0px";
		scheduler.$container.querySelector(".dhx_cal_data").appendChild(block);
		return [block];
	},

	renderTimelineMarker: function(start_date, end_date, section){
		var view_opts = scheduler._lame_copy({}, scheduler.matrix[scheduler._mode]);
		var areas = view_opts._scales;
		//timespans must always use actual position, not rounded
		view_opts.round_position = false;
		var blocks = [];

		var min_date = start_date ? new Date(start_date) : scheduler._min_date;
		var max_date = end_date ? new Date(end_date) : scheduler._max_date;

		if(min_date.valueOf() < scheduler._min_date.valueOf())
			min_date = new Date(scheduler._min_date);
		if(max_date.valueOf() > scheduler._max_date.valueOf())
			max_date = new Date(scheduler._max_date);

		if(!view_opts._trace_x) return blocks;

		for(var i = 0; i < view_opts._trace_x.length; i++){
			if(scheduler._is_column_visible(view_opts._trace_x[i]))
				break;
		}
		if(i == view_opts._trace_x.length)
			return blocks;

		var area = areas[section];

		if (!(min_date < end_date && max_date > start_date))
			return blocks;

		var block = this.createElement();

		var start_pos = scheduler._timeline_getX({start_date: start_date}, false, view_opts)-1;
		var end_pos = scheduler._timeline_getX({start_date: end_date}, false, view_opts)-1;
		var height = ((view_opts._section_height[section]-1) || (view_opts.dy - 1));

		var top = 0;
		if (scheduler._isRender('cell')){
			top = area.offsetTop;
			start_pos += view_opts.dx;
			end_pos += view_opts.dx;
			area = scheduler.$container.querySelector(".dhx_cal_data");
		}else{

		}
		var width = Math.max(1, end_pos - start_pos - 1);
		block.style.cssText = "height: "+height+"px; left: "+start_pos+"px; width: "+width+"px; top: "+top+"px;";

		area.appendChild(block);
		blocks.push(block);

		return blocks;
	},



	renderMonthCell: function(date){
		var cells = scheduler.$container.querySelectorAll(".dhx_month_head");

		var divs = [];
		for(var i = 0; i < cells.length; i++){
			divs.push(cells[i].parentNode);
		}

		var firstDate = scheduler.date.week_start(new Date(scheduler.getState().min_date));

		var index = -1;
		var weekNumber = 0;
		var dayIndex = -1;
		var currDate = firstDate;
		var markerDate = scheduler.date.day_start(new Date(date));
		for(var i = 0; i < divs.length; i++){
			index++;

			if(dayIndex == 6){
				weekNumber++;
				dayIndex = 0;
			}else{
				dayIndex++;
			}

			if(scheduler.date.day_start(new Date(currDate)).valueOf() == markerDate.valueOf()){
				break;
			}else{
				currDate = scheduler.date.add(currDate, 1, "day");
			}
		}

		if(index == -1){
			return [];
		}

		var left = scheduler._colsS[dayIndex];
		var top = scheduler._colsS.heights[weekNumber];

		var div = this.createElement();
		div.style.top = top + "px";
		div.style.left = left + "px";
		div.style.width = scheduler._cols[dayIndex] + "px";
		div.style.height = ((scheduler._colsS.heights[weekNumber + 1] - top) || scheduler._colsS.height) + "px" ;


		var container = scheduler.$container.querySelector(".dhx_cal_data");

		var datatable = container.querySelector("table");
		if(datatable.nextSibling){
			container.insertBefore(div, datatable.nextSibling);
		}else{
			container.appendChild(div);
		}
		return div;
	},
	renderMonthMarker: function(start_date, end_date){
		var res = [];
		var currentDate = start_date;
		while(currentDate.valueOf() < end_date.valueOf()){
			res.push(this.renderMonthCell(currentDate));
			currentDate = scheduler.date.add(currentDate, 1, "day");
		}
		return res;
	},

	renderVerticalMarker: function(start_date, end_date, section){
		var index = scheduler.locate_holder_day(start_date);

		var divs = [];
		var area = null;

		var c = scheduler.config;
		if(scheduler._ignores[index]) return divs;

		if (scheduler._props && scheduler._props[scheduler._mode] && section) {
			var view = scheduler._props[scheduler._mode];
			index = view.order[section];

			var inner_index = view.order[section];
			if(!(view.days > 1)){
				index = inner_index;
				if (view.size && (index > view.position+view.size)) {
					index = 0;
				}
			}else{
				//var units_l = view.size || view.options.length;

				index = scheduler.locate_holder_day(start_date) + inner_index;
				//index = index*units_l + inner_index;
			}
		}
		area = scheduler.locate_holder(index);
		if(!area || area.querySelector(".dhx_scale_hour")){
			// hour scale instead of date column
			return document.createElement("div");
		}

		var start = Math.max((start_date.getHours()*60 + start_date.getMinutes()), c.first_hour*60);


		var end = Math.min((end_date.getHours()*60 + end_date.getMinutes()), c.last_hour*60);
		if(!end && (scheduler.date.day_start(new Date(end_date)).valueOf() > scheduler.date.day_start(new Date(start_date)).valueOf())){
			end = c.last_hour*60;
		}

		if (end <= start) {
			return [];
		}

		var block = this.createElement();

		// +1 for working with section which really takes up whole height (as % would be == 0)
		var all_hours_height = scheduler.config.hour_size_px*c.last_hour + 1;
		var hour_ms = 60*60*1000;
		block.style.top = (Math.round((start*60*1000-scheduler.config.first_hour*hour_ms)*scheduler.config.hour_size_px/hour_ms) % all_hours_height) + "px";
		block.style.lineHeight = block.style.height = Math.max((Math.round(((end-start)*60*1000)*scheduler.config.hour_size_px/hour_ms)) % all_hours_height, 1)+"px";
		block.style.width = "100%";
		area.appendChild(block);
		divs.push(block);
		return divs[0];

	}
};
scheduler.$keyboardNavigation.SchedulerNode = function(){};

scheduler.$keyboardNavigation.SchedulerNode.prototype = scheduler._compose(
	scheduler.$keyboardNavigation.EventHandler,
	{
		getDefaultNode: function(){
			var node = new scheduler.$keyboardNavigation.TimeSlot();

			if(!node.isValid()){
				node = node.fallback();
			}
			return node;
		},

		_modes:{
			month: "month",
			year: "year",
			dayColumns: "dayColumns",
			timeline:"timeline",
			units:"units",
			weekAgenda: "weekAgenda",
			list: "list"
		},
		getMode: function(){
			var state = scheduler.getState();

			var mode = state.mode;
			if((scheduler.matrix && scheduler.matrix[mode])){
				return this._modes.timeline;
			} else if((scheduler._props && scheduler._props[mode])){
				return this._modes.units;
			}else if(mode == "month"){
				return this._modes.month;
			}else if(mode == "year"){
				return this._modes.year;
			}else if(mode == "week_agenda"){
				return this._modes.weekAgenda;
			}else if(mode == "map" || mode == "agenda" || (scheduler._grid && scheduler["grid_" + mode])){
				return this._modes.list;
			}else{
				return this._modes.dayColumns;
			}
		},

		focus: function(){
			scheduler.focus();
		},

		blur: function(){

		},

		disable: function(){
			scheduler.$container.setAttribute("tabindex", "0");
		},
		enable: function(){
			if(scheduler.$container)
				scheduler.$container.removeAttribute("tabindex");
		},
		isEnabled: function(){
			return scheduler.$container.hasAttribute("tabindex");
		},


		_compareEvents: function(a, b){
			if (a.start_date.valueOf() == b.start_date.valueOf())
				return a.id > b.id ? 1 : -1;
			return a.start_date.valueOf() > b.start_date.valueOf() ? 1 : -1;
		},

		_pickEvent: function(from, to, startId, reverse){
			var range = scheduler.getState();
			from = new Date(Math.max(range.min_date.valueOf(), from.valueOf()));
			to = new Date(Math.min(range.max_date.valueOf(), to.valueOf()));

			var evs = scheduler.getEvents(from, to);
			evs.sort(this._compareEvents);
			if(reverse){
				evs = evs.reverse();
			}

			var trim = !!startId;
			for(var i =0; i < evs.length && trim; i++){
				if(evs[i].id == startId){
					trim = false;
				}
				evs.splice(i, 1);
				i--;
			}

			for(var i = 0; i < evs.length; i++){
				var eventElement = new scheduler.$keyboardNavigation.Event(evs[i].id);
				if(eventElement.getNode())
					return evs[i];
			}

			return null;
		},

		nextEventHandler: function(id){
			var activeNode = scheduler.$keyboardNavigation.dispatcher.activeNode;

			var startId = id || (activeNode && activeNode.eventId);

			var nextEvent = null;
			if(startId && scheduler.getEvent(startId)){
				var currEvent = scheduler.getEvent(startId);

				nextEvent = scheduler.$keyboardNavigation.SchedulerNode.prototype._pickEvent(
					currEvent.start_date,
					scheduler.date.add(currEvent.start_date, 1, "year"),
					currEvent.id,
					false
				);

			}
			if(!nextEvent && !id){
				var visibleDates = scheduler.getState();

				nextEvent = scheduler.$keyboardNavigation.SchedulerNode.prototype._pickEvent(
					visibleDates.min_date,
					scheduler.date.add(visibleDates.min_date, 1, "year"),
					null,
					false
				);
			}

			if(nextEvent){

				var nextEv = new scheduler.$keyboardNavigation.Event(nextEvent.id);
				if(!nextEv.isValid()){// not visible event
					this.nextEventHandler(nextEvent.id);
				}else{
					if(activeNode){activeNode.blur();}
					scheduler.$keyboardNavigation.dispatcher.setActiveNode(nextEv);
				}
			}
		},

		prevEventHandler: function(id){
			var activeNode = scheduler.$keyboardNavigation.dispatcher.activeNode;

			var startId = id || (activeNode && activeNode.eventId);

			var nextEvent = null;
			if(startId && scheduler.getEvent(startId)){
				var currEvent = scheduler.getEvent(startId);

				nextEvent = scheduler.$keyboardNavigation.SchedulerNode.prototype._pickEvent(
					scheduler.date.add(currEvent.end_date, -1, "year"),
					currEvent.end_date,
					currEvent.id,
					true
				);
			}
			if(!nextEvent && !id){
				var visibleDates = scheduler.getState();

				nextEvent = scheduler.$keyboardNavigation.SchedulerNode.prototype._pickEvent(
					scheduler.date.add(visibleDates.max_date, -1, "year"),
					visibleDates.max_date,
					null,
					true
				);
			}

			if(nextEvent){
				var nextEv = new scheduler.$keyboardNavigation.Event(nextEvent.id);
				if(!nextEv.isValid()){// not visible event
					this.prevEventHandler(nextEvent.id);
				}else{
					if(activeNode){activeNode.blur();}
					scheduler.$keyboardNavigation.dispatcher.setActiveNode(nextEv);
				}
			}
		},

		keys: {

			"alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9": function(e){
				var tabs = scheduler.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab");
				var key = e.key;
				if(key === undefined){
					key = e.keyCode - 48;
				}
				if(tabs[key*1 - 1]){
					tabs[key*1 - 1].click();
				}
			},

			"ctrl+left,meta+left": function(e){
				scheduler._click.dhx_cal_prev_button();
			},
			"ctrl+right,meta+right": function(e){
				scheduler._click.dhx_cal_next_button();
			},
			"ctrl+up,meta+up":function(e){
				var dataArea = scheduler.$container.querySelector(".dhx_cal_data");
				dataArea.scrollTop -= 20;
			},
			"ctrl+down,meta+down": function(e){
				var dataArea = scheduler.$container.querySelector(".dhx_cal_data");
				dataArea.scrollTop += 20;
			},


			"e": function(){
				this.nextEventHandler();
			},

			"home": function(){
				scheduler.setCurrentView(new Date());
			},

			"shift+e": function(){
				this.prevEventHandler();
			},

			"ctrl+enter,meta+enter": function(){
				scheduler.addEventNow({start_date: new Date(scheduler.getState().date)});
			},

			"ctrl+c,meta+c": function(e){
				scheduler._key_nav_copy_paste(e);
			},
			"ctrl+v,meta+v": function(e){
				scheduler._key_nav_copy_paste(e);
			},
			"ctrl+x,meta+x": function(e){
				scheduler._key_nav_copy_paste(e);
			}

		}
	}
);

scheduler.$keyboardNavigation.SchedulerNode.prototype.bindAll(scheduler.$keyboardNavigation.SchedulerNode.prototype.keys);
scheduler.$keyboardNavigation.KeyNavNode = function(){};

scheduler.$keyboardNavigation.KeyNavNode.prototype = scheduler._compose(
	scheduler.$keyboardNavigation.EventHandler,
	{
		isValid: function(){
			return true;
		},
		fallback: function(){
			return null;
		},

		moveTo: function (element) {
			scheduler.$keyboardNavigation.dispatcher.setActiveNode(element);
		},

		compareTo: function(b){
			// good enough comparison of two random objects
			if(!b) return false;
			for(var i in this){
				if(!!this[i] != !!b[i]) return false;

				var canStringifyThis = !!(this[i] && this[i].toString);
				var canStringifyThat = !!(b[i] && b[i].toString);
				if(canStringifyThat != canStringifyThis) return false;
				if(!(canStringifyThat && canStringifyThis)) {
					if(b[i] != this[i]) return false;
				}else{
					if(b[i].toString() != this[i].toString())
						return false;
				}
			}
			return true;
		},

		getNode: function(){},
		focus: function(){
			var node = this.getNode();
			if(node){
				node.setAttribute("tabindex", "-1");
				//node.className += " scheduler_focused";
				if(node.focus) node.focus();
			}

		},
		blur: function(){
			var node = this.getNode();
			if(node){
				node.setAttribute("tabindex", "-1");
				//node.className = (node.className || "").replace(/ ?scheduler_focused/g, "");
			}
		}
	}

);

scheduler.$keyboardNavigation.HeaderCell = function(index){
	this.index = index || 0;
};

scheduler.$keyboardNavigation.HeaderCell.prototype = scheduler._compose(
	scheduler.$keyboardNavigation.KeyNavNode,
	{
		getNode: function(index){
			index = index || this.index || 0;
			var nodes = this.getNodes();
			if(nodes[index]) return nodes[index];
		},

		getNodes: function(selector){
			selector = selector || [
					".dhx_cal_navline .dhx_cal_prev_button",
					".dhx_cal_navline .dhx_cal_next_button",
					".dhx_cal_navline .dhx_cal_today_button",
					".dhx_cal_navline .dhx_cal_tab"
				].join(", ");

			var nodes = Array.prototype.slice.call(scheduler.$container.querySelectorAll(selector));
			nodes.sort(function(a, b){
				return a.offsetLeft - b.offsetLeft;
			});
			return nodes;
		},

		_handlers:null,

		isValid: function(){
			return !!this.getNode(this.index);
		},
		fallback:function(){
			var defaultCell = this.getNode(0);
			if(!defaultCell){
				defaultCell = new scheduler.$keyboardNavigation.TimeSlot();
			}
			return defaultCell;
		},

		keys: {
			"left": function(){
				var newIndex = this.index - 1;
				if(newIndex < 0){
					newIndex = this.getNodes().length - 1;
				}

				this.moveTo(new scheduler.$keyboardNavigation.HeaderCell(newIndex));

			},
			"right": function () {
				var newIndex = this.index + 1;
				if(newIndex >= this.getNodes().length){
					newIndex = 0;
				}

				this.moveTo(new scheduler.$keyboardNavigation.HeaderCell(newIndex));
			},
			"down": function () {
				this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
			},

			"enter": function(){
				var node = this.getNode();
				if(node){
					node.click();
				}
			}
		}
	}
);

scheduler.$keyboardNavigation.HeaderCell.prototype.bindAll(scheduler.$keyboardNavigation.HeaderCell.prototype.keys);
scheduler.$keyboardNavigation.Event = function(id){
	this.eventId = null;
	if(scheduler.getEvent(id)){
		var ev = scheduler.getEvent(id);
		this.start = new Date(ev.start_date);
		this.end = new Date(ev.end_date);

		this.section = this._getSection(ev);
		this.eventId = id;
	}
};

scheduler.$keyboardNavigation.Event.prototype = scheduler._compose(
	scheduler.$keyboardNavigation.KeyNavNode,
	{
		_getNodes: function(){
			return Array.prototype.slice.call(scheduler.$container.querySelectorAll("[event_id]"));
		},

		_modes: scheduler.$keyboardNavigation.SchedulerNode.prototype._modes,

		getMode: scheduler.$keyboardNavigation.SchedulerNode.prototype.getMode,

		_handlers: null,
		isValid: function(){
			return !!(scheduler.getEvent(this.eventId) && this.getNode());
		},
		fallback: function(){
			var eventNode = this._getNodes()[0];
			var defaultElement = null;
			if(!eventNode || !(scheduler._locate_event(eventNode))){
				defaultElement = new scheduler.$keyboardNavigation.TimeSlot();
			}else{
				var id = scheduler._locate_event(eventNode);
				defaultElement = new scheduler.$keyboardNavigation.Event(id);
			}

			return defaultElement;
		},



		getNode: function(){

			function isScrolledIntoView(el) {
				var eventBox = el.getBoundingClientRect();
				var viewPort = scheduler.$container.querySelector(".dhx_cal_data").getBoundingClientRect();
				
				if(eventBox.bottom < viewPort.top || eventBox.top > viewPort.bottom){
					return false;
				}
				return true;
			}

			var idSelector = "[event_id='"+this.eventId+"']";

			var inlineEditor = scheduler.$keyboardNavigation.dispatcher.getInlineEditor(this.eventId);
			if(inlineEditor){// is inline editor visible
				return inlineEditor;
			}else{
				if(scheduler.isMultisectionEvent && scheduler.isMultisectionEvent(scheduler.getEvent(this.eventId))){
					var nodes = scheduler.$container.querySelectorAll(idSelector);
					for(var i = 0; i < nodes.length; i++){
						if(isScrolledIntoView(nodes[i])){
							return nodes[i];
						}
					}
					return nodes[0];
				}else{
					return scheduler.$container.querySelector(idSelector);
				}

				
			}

		},

		focus: function(){
			var event = scheduler.getEvent(this.eventId);

			var calendar = scheduler.getState();
			if(event.start_date.valueOf() > calendar.max_date.valueOf() || event.end_date.valueOf() <= calendar.min_date.valueOf()){
				scheduler.setCurrentView(event.start_date);
			}

			scheduler.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
		},
		blur: function(){
			scheduler.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
		},


		_getSection: function(ev){
			var section = null;
			var mode = scheduler.getState().mode;
			if(scheduler.matrix && scheduler.matrix[mode]){
				var timeline = scheduler.matrix[scheduler.getState().mode];
				section = ev[timeline.y_property];
			}else if(scheduler._props && scheduler._props[mode]){
				var unit = scheduler._props[mode];
				section = ev[unit.map_to];
			}
			return section;
		},
		_moveToSlot: function(dir){
			var ev = scheduler.getEvent(this.eventId);
			if(ev){
				var section =this._getSection(ev);
				var slot = new scheduler.$keyboardNavigation.TimeSlot(ev.start_date, null, section);
				this.moveTo(slot.nextSlot(slot, dir));
			}else{
				this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
			}
		},

		keys: {
			"left": function(){
				this._moveToSlot("left");
			},

			"right": function () {
				this._moveToSlot("right");
			},
			"down": function () {
				if(this.getMode() == this._modes.list){
					scheduler.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler();
				}else {
					this._moveToSlot("down");
				}
			},

			"space": function(){
				var node = this.getNode();
				if(node && node.click){
					node.click();
				}else{
					this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
				}

			},

			"up": function () {
				if(this.getMode() == this._modes.list){
					scheduler.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler();
				}else {
					this._moveToSlot("up");
				}
			},

			"delete": function(){
				if(scheduler.getEvent(this.eventId)) {
					scheduler._click.buttons["delete"](this.eventId);
				}else{
					this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
				}
			},

			// open lightbox
			"enter": function () {
				if(scheduler.getEvent(this.eventId)) {
					scheduler.showLightbox(this.eventId);
				}else{
					this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
				}
			}
		}
	}
);
scheduler.$keyboardNavigation.Event.prototype.bindAll(scheduler.$keyboardNavigation.Event.prototype.keys);
scheduler.$keyboardNavigation.TimeSlot = function(from, to, section, movingDate){
	var state = scheduler.getState();
	var timeline = scheduler.matrix && scheduler.matrix[state.mode];

	if(!from){
		from = this.getDefaultDate();
	}

	if(!to){

		if(timeline){
			to = scheduler.date.add(from, timeline.x_step, timeline.x_unit);
		}else{
			to = scheduler.date.add(from, scheduler.config.key_nav_step, "minute");
		}

	}

	this.section = section || this._getDefaultSection();
	this.start_date = new Date(from);
	this.end_date = new Date(to);
	this.movingDate = movingDate || null;
};

scheduler.$keyboardNavigation.TimeSlot.prototype = scheduler._compose(
	scheduler.$keyboardNavigation.KeyNavNode,
	{
		_handlers:null,

		getDefaultDate: function(){
			var from;
			var state = scheduler.getState();
			var timeline = scheduler.matrix && scheduler.matrix[state.mode];

			if(timeline){
				from = scheduler.date[timeline.name + "_start"](new Date(state.date));
				from = this.findVisibleColumn(from);
			}else{
				from = new Date(scheduler.getState().min_date);
				from = this.findVisibleColumn(from);
				from.setHours(scheduler.config.first_hour);

				if(!scheduler._table_view){
					var dataContainer = scheduler.$container.querySelector(".dhx_cal_data");
					if(dataContainer.scrollTop){
						from.setHours(scheduler.config.first_hour + Math.ceil(dataContainer.scrollTop / scheduler.config.hour_size_px));
					}
				}
			}

			return from;
		},

		clone: function(timeslot){
			return new scheduler.$keyboardNavigation.TimeSlot(timeslot.start_date, timeslot.end_date, timeslot.section, timeslot.movingDate);
		},
		_getMultisectionView: function(){
			var state = scheduler.getState();
			var view;
			if(scheduler._props && scheduler._props[state.mode]) {
				view = scheduler._props[state.mode];
			}else if(scheduler.matrix && scheduler.matrix[state.mode]){
				view = scheduler.matrix[state.mode];
			}
			return view;
		},

		_getDefaultSection: function(){
			var section = null;
			var view = this._getMultisectionView();
			if(view && !section){
				section = this._getNextSection();
			}
			return section;
		},

		_getNextSection: function(sectionId, dir){
			var view = this._getMultisectionView();
			var currentIndex = view.order[sectionId];
			var nextIndex = currentIndex;
			if(currentIndex !== undefined){
				nextIndex =  currentIndex + dir;
			}else{
				nextIndex = (view.size && view.position) ? view.position : 0;
			}

			nextIndex = nextIndex < 0 ? nextIndex = (view.options || view.y_unit).length -1 : nextIndex;


			var options = view.options || view.y_unit;
			if(options[nextIndex]){
				return options[nextIndex].key;
			}else{
				return null;
			}
		},


		isValid: function(){
			var state = scheduler.getState();
			var isInRange = !(this.start_date.valueOf() < state.min_date.valueOf() || this.start_date.valueOf() >= state.max_date.valueOf());

			if(!isInRange) return false;


			if(!this.isVisible(this.start_date, this.end_date)) return false;

			var view = this._getMultisectionView();

			if(view){
				return (view.order[this.section] !== undefined);
			}else{
				return true;
			}

		},

		fallback:function(){

			var defaultSlot = new scheduler.$keyboardNavigation.TimeSlot();
			if(!defaultSlot.isValid()){
				return new scheduler.$keyboardNavigation.DataArea();
			}else{
				return defaultSlot;
			}
		},

		getNodes: function(){
			return Array.prototype.slice.call(scheduler.$container.querySelectorAll(".dhx_focus_slot"));
		},
		getNode: function(){
			return this.getNodes()[0];
		},

		focus: function(){
			scheduler.$keyboardNavigation.marker.render(this.start_date, this.end_date, this.section);
			scheduler.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
			scheduler.$keyboardNavigation._pasteDate = this.start_date;
			scheduler.$keyboardNavigation._pasteSection = this.section;

		},
		blur: function(){
			scheduler.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
			scheduler.$keyboardNavigation.marker.clear();
		},

		_modes: scheduler.$keyboardNavigation.SchedulerNode.prototype._modes,

		_getMode: scheduler.$keyboardNavigation.SchedulerNode.prototype.getMode,

		addMonthDate: function(date, dir, extend){
			var res;
			switch (dir){
				case "up":
					res = scheduler.date.add(date, -1, "week");
					break;
				case "down":
					res = scheduler.date.add(date, 1, "week");
					break;
				case "left":
					res = scheduler.date.day_start(scheduler.date.add(date, -1, "day"));
					res = this.findVisibleColumn(res, -1);
					break;
				case "right":
					res = scheduler.date.day_start(scheduler.date.add(date, 1, "day"));
					res = this.findVisibleColumn(res, 1);
					break;
				default:
					res = scheduler.date.day_start(new Date(date));
					break;
			}

			var state = scheduler.getState();
			if(date.valueOf() < state.min_date.valueOf() || (!extend && date.valueOf() >= state.max_date.valueOf())){
				res = new Date(state.min_date);
			}

			return res;
		},

		nextMonthSlot: function(slot, dir, extend){

			var start, end;
			start = this.addMonthDate(slot.start_date, dir, extend);

			start.setHours(scheduler.config.first_hour);
			end = new Date(start);
			end.setHours(scheduler.config.last_hour);
			return {start_date: start, end_date: end};
		},

		_alignTimeSlot: function(date, minDate, unit, step){
			var currentDate = new Date(minDate);
			while(currentDate.valueOf() < date.valueOf()){
				currentDate = scheduler.date.add(currentDate, step, unit);
			}

			if(currentDate.valueOf() > date.valueOf()){
				currentDate = scheduler.date.add(currentDate, -step, unit);
			}

			return currentDate;
		},

		nextTimelineSlot: function(slot, dir, extend){
			var state = scheduler.getState();
			var view = scheduler.matrix[state.mode];

			var startDate  = this._alignTimeSlot(slot.start_date, scheduler.date[view.name + "_start"](new Date(slot.start_date)), view.x_unit, view.x_step);
			var endDate = this._alignTimeSlot(slot.end_date, scheduler.date[view.name + "_start"](new Date(slot.end_date)), view.x_unit, view.x_step);

			if(endDate.valueOf() <= startDate.valueOf()){
				endDate = scheduler.date.add(startDate, view.x_step, view.x_unit);
			}
			var newPos = this.clone(slot);
			newPos.start_date = startDate;
			newPos.end_date = endDate;
			newPos.section = slot.section || this._getNextSection();


			switch (dir){
				case "up":
					newPos.section = this._getNextSection(slot.section, -1);
					break;
				case "down":
					newPos.section = this._getNextSection(slot.section, +1);
					break;
				case "left":
					newPos.start_date = this.findVisibleColumn(scheduler.date.add(newPos.start_date, -view.x_step, view.x_unit), -1);
					newPos.end_date = scheduler.date.add(newPos.start_date, view.x_step, view.x_unit);
					break;
				case "right":
					newPos.start_date = this.findVisibleColumn(scheduler.date.add(newPos.start_date, view.x_step, view.x_unit), 1);
					newPos.end_date = scheduler.date.add(newPos.start_date, view.x_step, view.x_unit);

					break;
				default:

					break;
			}

			if(newPos.start_date.valueOf() < state.min_date.valueOf() || newPos.start_date.valueOf() >= state.max_date.valueOf()){
				if(extend && newPos.start_date.valueOf() >= state.max_date.valueOf()){
					newPos.start_date = new Date(state.max_date);
				}else{
					newPos.start_date = scheduler.date[state.mode + "_start"](scheduler.date.add(state.date, dir == "left" ? -1 : 1, state.mode));
					newPos.end_date = scheduler.date.add(newPos.start_date, view.x_step, view.x_unit);
				}
			}

			return newPos;
		},

		nextUnitsSlot: function(slot, dir, extend){
			var newPos = this.clone(slot);
			newPos.section = slot.section || this._getNextSection();

			var section = slot.section || this._getNextSection();
			var state = scheduler.getState();
			var view = scheduler._props[state.mode];
			switch (dir){
				case "left":
					section = this._getNextSection(slot.section, -1);
					var optionsCount = view.size ? (view.size - 1) : view.options.length;

					if(view.days > 1 && (view.order[section] == optionsCount - 1)){
						if(scheduler.date.add(slot.start_date, -1, "day").valueOf() >= state.min_date.valueOf()){
							newPos = this.nextDaySlot(slot, dir, extend);
						}
					}
					break;
				case "right":
					section = this._getNextSection(slot.section, 1);
					if(view.days > 1 && !view.order[section]){
						if(scheduler.date.add(slot.start_date, 1, "day").valueOf() < state.max_date.valueOf()){
							newPos = this.nextDaySlot(slot, dir, extend);
						}
					}

					break;
				default:
					newPos = this.nextDaySlot(slot, dir, extend);
					section = slot.section;
					break;
			}
			newPos.section = section;
			return newPos;
		},

		_moveDate: function(oldDate, dir){
			var newDate = this.findVisibleColumn(scheduler.date.add(oldDate, dir, "day"), dir);
			newDate.setHours(oldDate.getHours());
			newDate.setMinutes(oldDate.getMinutes());
			return newDate;
		},

		isBeforeLastHour: function(date, isStartDate){
			var minutes = date.getMinutes(),
				hours = date.getHours(),
				last_hour = scheduler.config.last_hour;
			return (hours < last_hour || (!isStartDate && ((last_hour == 24 || hours == last_hour) && !minutes)));
		},
		isAfterFirstHour: function(date, isStartDate){
			var minutes = date.getMinutes(),
				hours = date.getHours(),
				first_hour = scheduler.config.first_hour,
				last_hour = scheduler.config.last_hour;
			return (hours >= first_hour || (!isStartDate && (!minutes && ((!hours &&  last_hour == 24) || (hours == last_hour)))));
		},
		isInVisibleDayTime: function(date, isStartDate){
			return (this.isBeforeLastHour(date, isStartDate) && this.isAfterFirstHour(date, isStartDate));
		},

		nextDaySlot: function(slot, dir, extend){
			var start, end;

			var key_nav_step = scheduler.config.key_nav_step;

			var date = this._alignTimeSlot(slot.start_date, scheduler.date.day_start(new Date(slot.start_date)), "minute", key_nav_step);


			var oldStart = slot.start_date;

			switch (dir){
				case "up":
					start = scheduler.date.add(date, -key_nav_step, "minute");

					if(!this.isInVisibleDayTime(start, true)){
						if (!extend || this.isInVisibleDayTime(oldStart, true)) {

							var toNextDay = true;
							if(extend && scheduler.date.date_part(new Date(start)).valueOf() != scheduler.date.date_part(new Date(oldStart)).valueOf())
								toNextDay = false;
							if(toNextDay)
								start = this.findVisibleColumn(scheduler.date.add(slot.start_date, -1, "day"), -1);

							start.setHours(scheduler.config.last_hour);
							start.setMinutes(0);
							start = scheduler.date.add(start, -key_nav_step, "minute");
						}
					}
					end = scheduler.date.add(start, key_nav_step, "minute");
					break;
				case "down":
					start = scheduler.date.add(date, key_nav_step, "minute");

					var testEnd = extend ? start : scheduler.date.add(start, key_nav_step, "minute");
					if(!this.isInVisibleDayTime(testEnd, false)){
						if(!extend || this.isInVisibleDayTime(oldStart, false)) {
							if (!extend) {
								start = this.findVisibleColumn(scheduler.date.add(slot.start_date, 1, "day"), 1);
								start.setHours(scheduler.config.first_hour);
								start.setMinutes(0);
							} else {
								var toNextDay = true;
								if (scheduler.date.date_part(new Date(oldStart)).valueOf() == oldStart.valueOf()) {
									toNextDay = false;
								}
								if (toNextDay) {
									start = this.findVisibleColumn(scheduler.date.add(slot.start_date, 1, "day"), 1);
								}
								start.setHours(scheduler.config.first_hour);
								start.setMinutes(0);
								start = scheduler.date.add(start, key_nav_step, "minute");
							}

						}
					}
					end = scheduler.date.add(start, key_nav_step, "minute");
					break;
				case "left":
					start = this._moveDate(slot.start_date, -1);
					end = this._moveDate(slot.end_date, -1);
					break;
				case "right":
					start = this._moveDate(slot.start_date, 1);
					end = this._moveDate(slot.end_date, 1);
					break;
				default:
					start = date;
					end = scheduler.date.add(start, key_nav_step, "minute");
					break;
			}

			return {start_date: start, end_date: end};
		},
		nextWeekAgendaSlot: function(slot, dir){
			var start, end;
			var state = scheduler.getState();

			switch (dir){
				case "down":
				case "left":
					start = scheduler.date.day_start(scheduler.date.add(slot.start_date, -1, "day"));
					start = this.findVisibleColumn(start, -1);
					break;
				case "up":
				case "right":
					start = scheduler.date.day_start(scheduler.date.add(slot.start_date, 1, "day"));
					start = this.findVisibleColumn(start, 1);
					break;
				default:
					start = scheduler.date.day_start(slot.start_date);
					break;
			}
			if(slot.start_date.valueOf() < state.min_date.valueOf() || slot.start_date.valueOf() >= state.max_date.valueOf()){
				start = new Date(state.min_date);

			}
			end = new Date(start);
			end.setHours(scheduler.config.last_hour);
			return {start_date: start, end_date: end};
		},
		nextAgendaSlot: function(slot, dir){
			return {start_date: slot.start_date, end_date: slot.end_date};
		},


		isDateVisible: function(date){
			if(!scheduler._ignores_detected)
				return true;

			var timeline = scheduler.matrix && scheduler.matrix[scheduler.getState().mode];

			var index;
			if(timeline){
				index = scheduler._get_date_index(timeline, date);
			}else{
				index = scheduler.locate_holder_day(date);
			}

			return !scheduler._ignores[index];
		},

		findVisibleColumn: function(start, dir){
			var date = start;
			dir = dir || 1;
			var range = scheduler.getState();

			while(!this.isDateVisible(date) && ((dir > 0 && date.valueOf() <= range.max_date.valueOf()) || (dir < 0 && date.valueOf() >= range.min_date.valueOf()))){
				date = this.nextDateColumn(date, dir);
			}

			return date;
		},

		nextDateColumn: function(start, dir){
			dir = dir || 1;
			var timeline = scheduler.matrix && scheduler.matrix[scheduler.getState().mode];

			var date;
			if(timeline){
				date = scheduler.date.add(start, dir * timeline.x_step, timeline.x_unit);
			}else{
				date = scheduler.date.day_start(scheduler.date.add(start, dir, "day"));
			}

			return date;
		},

		isVisible:function(from, to){
			if(!scheduler._ignores_detected)
				return true;

			var current = new Date(from);

			while(current.valueOf() < to.valueOf()){
				if(this.isDateVisible(current)) return true;
				current = this.nextDateColumn(current);
			}
			return false;
		},

		nextSlot: function(slot, dir, view, extend){
			var next;
			view = view || this._getMode();

			var tempSlot = scheduler.$keyboardNavigation.TimeSlot.prototype.clone(slot);

			switch (view){
				case this._modes.units:
					next = this.nextUnitsSlot(tempSlot, dir, extend);
					break;
				case this._modes.timeline:
					next = this.nextTimelineSlot(tempSlot, dir, extend);
					break;
				case this._modes.year:
					next = this.nextMonthSlot(tempSlot, dir, extend);
					break;
				case this._modes.month:
					next = this.nextMonthSlot(tempSlot, dir, extend);
					break;
				case this._modes.weekAgenda:
					next = this.nextWeekAgendaSlot(tempSlot, dir, extend);
					break;
				case this._modes.list:
					next = this.nextAgendaSlot(tempSlot, dir, extend);
					break;
				case this._modes.dayColumns:
					next = this.nextDaySlot(tempSlot, dir, extend);
					break;
			}

			if(next.start_date.valueOf() >= next.end_date.valueOf()){
				next = this.nextSlot(next, dir, view);
			}

			return scheduler.$keyboardNavigation.TimeSlot.prototype.clone(next);

		},

		extendSlot: function(slot, dir){
			var view = this._getMode();
			var next;
			switch (view){
				case this._modes.units:
					if(dir == "left" || dir == "right"){
						next = this.nextUnitsSlot(slot, dir);
					}else{
						next = this.extendUnitsSlot(slot, dir);
					}
					break;
				case this._modes.timeline:
					if(dir == "down" || dir == "up"){
						next = this.nextTimelineSlot(slot, dir);
					}else{
						next = this.extendTimelineSlot(slot, dir);
					}
					break;
				case this._modes.year:
					next = this.extendMonthSlot(slot, dir);
					break;
				case this._modes.month:
					next = this.extendMonthSlot(slot, dir);
					break;
				case this._modes.dayColumns:
					next = this.extendDaySlot(slot, dir);
					break;
				case this._modes.weekAgenda:
					next = this.extendWeekAgendaSlot(slot, dir);
					break;
				default:
					next = slot;
					break;
			}

			var range = scheduler.getState();
			if(next.start_date.valueOf() < range.min_date.valueOf()){
				next.start_date = this.findVisibleColumn(range.min_date);
				next.start_date.setHours(scheduler.config.first_hour);
			}

			if(next.end_date.valueOf() > range.max_date.valueOf()){
			//	next.end_date =  new Date(slot.end_date);
				next.end_date = this.findVisibleColumn(range.max_date, -1);
			}


			return scheduler.$keyboardNavigation.TimeSlot.prototype.clone(next);
		},

		extendTimelineSlot: function(slot, direction){
			return this.extendGenericSlot({
				"left":"start_date",
				"right":"end_date"
				},
				slot,
				direction,
				"timeline"
			);
		},

		extendWeekAgendaSlot: function(slot, direction){
			return this.extendGenericSlot({
					"left":"start_date",
					"right":"end_date"
				},
				slot,
				direction,
				"weekAgenda"
			);
		},

		extendGenericSlot: function(allowedDirections, slot, direction, type){
			var next;
			var moveDate = slot.movingDate;

			if(!moveDate){
				moveDate = allowedDirections[direction];
			}

			if(!moveDate || !allowedDirections[direction]){
				return slot;
			}

			if(direction){
				next = this.nextSlot({start_date: slot[moveDate], section: slot.section}, direction, type, true);

				if(next.start_date.valueOf() == slot.start_date.valueOf()){
					next = this.nextSlot({start_date: next.start_date, section:next.section}, direction, type, true);
				}

				next.movingDate = moveDate;
			}else{
				return scheduler.$keyboardNavigation.TimeSlot.prototype.clone(slot);
			}

			var newDates = this.extendSlotDates(slot, next, next.movingDate);

			if(newDates.end_date.valueOf() <= newDates.start_date.valueOf()){
				next.movingDate = next.movingDate == "end_date" ? "start_date" : "end_date";
			}
			newDates = this.extendSlotDates(slot, next, next.movingDate);

			next.start_date = newDates.start_date;
			next.end_date = newDates.end_date;
			return next;
		},

		extendSlotDates: function(oldSlot, newSlot, dateDirection){
			var res = {start_date:null, end_date:null};

			if(dateDirection == "start_date"){
				res.start_date = newSlot.start_date;
				res.end_date = oldSlot.end_date;
			}else{
				res.start_date = oldSlot.start_date;
				res.end_date = newSlot.start_date;
			}
			return res;

		},

		extendMonthSlot: function(slot, direction){
			var slot = this.extendGenericSlot({
					"up":"start_date",
					"down":"end_date",
					"left":"start_date",
					"right":"end_date"
				},
				slot,
				direction,
				"month"
			);

			slot.start_date.setHours(scheduler.config.first_hour);
			slot.end_date = scheduler.date.add(slot.end_date, -1, "day");
			slot.end_date.setHours(scheduler.config.last_hour);
			return slot;
		},

		extendUnitsSlot: function(slot, direction){
			var next;

			switch (direction){
				case "down":
				case "up":
					next = this.extendDaySlot(slot, direction);
					break;
				default:
					next = slot;
					break;
			}
			next.section = slot.section;
			return next;
		},
		extendDaySlot: function(slot, direction){
			return this.extendGenericSlot({
					"up":"start_date",
					"down":"end_date",
					"left":"start_date",
					"right":"end_date"
				},
				slot,
				direction,
				"dayColumns"
			);
		},

		scrollSlot: function(dir){
			var state = scheduler.getState();

			var slot = this.nextSlot(this, dir);
			if(slot.start_date.valueOf() < state.min_date.valueOf() || slot.start_date.valueOf() >= state.max_date.valueOf()){
				scheduler.setCurrentView(new Date(slot.start_date));
			}

			this.moveTo(slot);
		},

		keys: {
			"left": function(){
				this.scrollSlot("left");
			},
			"right": function () {
				this.scrollSlot("right");
			},
			"down": function () {

				var mode =  this._getMode();
				if(mode == this._modes.list){
					scheduler.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler();
				}else{
					this.scrollSlot("down");
				}

			},

			"up": function () {
				var mode =  this._getMode();
				if(mode == this._modes.list){
					scheduler.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler();
				}else{
					this.scrollSlot("up");
				}

			},

			"shift+down":function(){
				this.moveTo(this.extendSlot(this, "down"));
			},
			"shift+up":function(){
				this.moveTo(this.extendSlot(this, "up"));
			},
			"shift+right":function(){
				this.moveTo(this.extendSlot(this, "right"));
			},
			"shift+left":function(){
				this.moveTo(this.extendSlot(this, "left"));
			},


			"enter": function(){
				var obj = {start_date: new Date(this.start_date), end_date: new Date(this.end_date)};

				var mode = scheduler.getState().mode;
				if(scheduler.matrix && scheduler.matrix[mode]){

					var timeline = scheduler.matrix[scheduler.getState().mode];
					obj[timeline.y_property] = this.section;
				}else if(scheduler._props && scheduler._props[mode]){
					var unit = scheduler._props[mode];
					obj[unit.map_to] = this.section;
				}

				scheduler.addEventNow(obj);
			}
		}
	}
);

scheduler.$keyboardNavigation.TimeSlot.prototype.bindAll(scheduler.$keyboardNavigation.TimeSlot.prototype.keys);
scheduler.$keyboardNavigation.MinicalButton = function(div, index){
	this.container = div;
	this.index = index || 0;
};

scheduler.$keyboardNavigation.MinicalButton.prototype = scheduler._compose(
	scheduler.$keyboardNavigation.KeyNavNode,
	{

		isValid: function(){
			var container = this.container;
			return !!container.offsetWidth;// valid if container is visible
		},

		fallback: function(){
			var defaultSlot = new scheduler.$keyboardNavigation.TimeSlot();
			if(defaultSlot.isValid()){
				return defaultSlot;
			}else{
				return new scheduler.$keyboardNavigation.DataArea();
			}
		},
		focus: function(){
			scheduler.$keyboardNavigation.dispatcher.globalNode.disable();
			this.container.removeAttribute("tabindex");
			scheduler.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);

		},
		blur: function(){
			this.container.setAttribute("tabindex", "0");
			scheduler.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
		},
		getNode: function(){
			if(!this.index){
				return this.container.querySelector(".dhx_cal_prev_button");
			}else{
				return this.container.querySelector(".dhx_cal_next_button");
			}
		},

		keys: {
			"right": function(e){
				this.moveTo(new scheduler.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
			},
			"left": function(e){
				this.moveTo(new scheduler.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
			},
			"down": function(){
				var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, 0, 0);
				if(next && !next.isValid()){
					next = next.fallback();
				}

				this.moveTo(next);
			},
			"enter": function(e){
				this.getNode().click();
			}
		}
	}
);

scheduler.$keyboardNavigation.MinicalButton.prototype.bindAll(scheduler.$keyboardNavigation.MinicalButton.prototype.keys);
scheduler.$keyboardNavigation.MinicalCell = function(div, row, col){
	this.container = div;
	this.row = row || 0;
	this.col = col || 0;
};

scheduler.$keyboardNavigation.MinicalCell.prototype = scheduler._compose(
	scheduler.$keyboardNavigation.KeyNavNode,
	{

		isValid: function(){
			var grid = this._getGrid();
			return !!(grid[this.row] && grid[this.row][this.col]);
		},
		fallback: function(){
			var row = this.row;
			var col = this.col;
			var grid = this._getGrid();
			if(!grid[row]){
				row = 0;
			}
			var dir = true;
			if(row > grid.length / 2){
				dir = false;
			}

			if(!grid[row]){
				var defaultSlot = new scheduler.$keyboardNavigation.TimeSlot();
				if(defaultSlot.isValid()){
					return defaultSlot;
				}else{
					return new scheduler.$keyboardNavigation.DataArea();
				}
			}

			if(dir){
				for(var c = col; grid[row] && c < grid[row].length; c++){
					if(!grid[row][c] && c == grid[row].length - 1){
						row++;
						col = 0;
					}
					if(grid[row][c]){
						return new scheduler.$keyboardNavigation.MinicalCell(this.container, row, c);
					}
				}
			}else{
				for(var c = col; grid[row] && c < grid[row].length; c--){
					if(!grid[row][c] && !c){
						row--;
						col = grid[row].length - 1;
					}
					if(grid[row][c]){
						return new scheduler.$keyboardNavigation.MinicalCell(this.container, row, c);
					}
				}
			}

			return new scheduler.$keyboardNavigation.MinicalButton(this.container, 0);
		},
		focus: function(){
			scheduler.$keyboardNavigation.dispatcher.globalNode.disable();

			this.container.removeAttribute("tabindex");
			scheduler.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
		},
		blur: function(){
			this.container.setAttribute("tabindex", "0");
			scheduler.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
		},
		_getNode: function(row, col){
			return this.container.querySelector(".dhx_year_body tr:nth-child("+(row + 1) + ") td:nth-child("+(col + 1)+")");
		},
		getNode: function(){
			return this._getNode(this.row, this.col);
		},

		_getGrid: function(){
			var rows = this.container.querySelectorAll(".dhx_year_body tr");
			var grid = [];
			for(var i = 0; i < rows.length; i++){
				grid[i] = [];
				var row = rows[i];
				var cells = row.querySelectorAll("td");
				for(var c = 0; c < cells.length; c++){
					var cell = cells[c];
					var enabled = true;
					var css = scheduler._getClassName(cell);
					if(css.indexOf("dhx_after") > -1 || css.indexOf("dhx_before") > -1 || css.indexOf("dhx_scale_ignore") > -1){
						enabled = false;
					}
					grid[i][c] = enabled;
				}
			}
			return grid;
		},


		keys: {
			"right": function(e){
				var grid = this._getGrid();
				var newRow = this.row;
				var newCol = this.col + 1;
				if(!grid[newRow] || !grid[newRow][newCol]){
					if(grid[newRow + 1]){
						newRow = newRow + 1;
						newCol = 0;
					}else{
						newCol = this.col;
					}
				}

				var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);
				if(!next.isValid()){
					next = next.fallback();
				}

				this.moveTo(next);
			},
			"left": function(e){
				var grid = this._getGrid();
				var newRow = this.row;
				var newCol = this.col - 1;
				if(!grid[newRow] || !grid[newRow][newCol]){
					if(grid[newRow - 1]){
						newRow = newRow - 1;
						newCol = grid[newRow].length - 1;
					}else{
						newCol = this.col;
					}
				}

				var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);
				if(!next.isValid()){
					next = next.fallback();
				}

				this.moveTo(next);
			},
			"down": function(){
				var grid = this._getGrid();
				var newRow = this.row + 1;
				var newCol = this.col;

				if(!grid[newRow] || !grid[newRow][newCol]){
					newRow = this.row;
				}

				var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);
				if(!next.isValid()){
					next = next.fallback();
				}

				this.moveTo(next);
			},
			"up": function(){
				var grid = this._getGrid();
				var newRow = this.row - 1;
				var newCol = this.col;

				if(!grid[newRow] || !grid[newRow][newCol]){
					var index = 0;
					if(this.col > grid[this.row].length / 2){
						index = 1;
					}
					this.moveTo(new scheduler.$keyboardNavigation.MinicalButton(this.container, index));
				}else{
					var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);
					if(!next.isValid()){
						next = next.fallback();
					}

					this.moveTo(next);
				}

			},
			"enter": function(e){
				this.getNode().querySelector(".dhx_month_head").click();
			}
		}
	}
);

scheduler.$keyboardNavigation.MinicalCell.prototype.bindAll(scheduler.$keyboardNavigation.MinicalCell.prototype.keys);
scheduler.$keyboardNavigation.DataArea = function(index){
	this.index = index || 0;
};

scheduler.$keyboardNavigation.DataArea.prototype = scheduler._compose(
	scheduler.$keyboardNavigation.KeyNavNode,
	{
		getNode: function(index){
			return scheduler.$container.querySelector(".dhx_cal_data");
		},

		_handlers:null,

		isValid: function(){
			return true;
		},
		fallback:function(){
			return this;
		},

		keys: {
			"up,down,right,left":function(){
				this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
			}
		}
	}
);

scheduler.$keyboardNavigation.DataArea.prototype.bindAll(scheduler.$keyboardNavigation.DataArea.prototype.keys);
if(!dhtmlx._modalsStack){
	dhtmlx._modalsStack = [];
}

(function(){
	var modalsStack = [];

	function isModal(){
		return !!(modalsStack.length || dhtmlx._modalsStack.length);
	}

	function isChildOf(child, parent){
		while(child && child != parent){
			child = child.parentNode;
		}

		return !!(child == parent);
	}

	function afterPopup(box){
		setTimeout(function(){
			if(!isModal() && !(isChildOf(document.activeElement, scheduler.$container))) {
				scheduler.focus();
			}
		}, 1);
	}
	function startModal(box){
		scheduler.eventRemove(box, "keydown", trapFocus);
		scheduler.event(box, "keydown", trapFocus);
		modalsStack.push(box);
		//scheduler.$keyboardNavigation.dispatcher.disable();
	}

	function endModal(){
		var box = modalsStack.pop();
		if(box) {
			scheduler.eventRemove(box, "keydown", trapFocus);
		}
		afterPopup(box);

	}

	function isTopModal(box){
		if(dhtmlx._modalsStack.length){
			return box == dhtmlx._modalsStack[dhtmlx._modalsStack.length - 1];
		}else{
			return box == modalsStack[modalsStack.length - 1];
		}

	}

	function trapFocus(event){
		var event = event || window.event;
		var target = event.currentTarget;
		if(!isTopModal(target)) return;

		scheduler.$keyboardNavigation.trapFocus(target, event);
	}

	function traceLightbox(){
		startModal(scheduler.getLightbox());
	}

	scheduler.attachEvent("onLightbox", traceLightbox);
	scheduler.attachEvent("onAfterLightbox", endModal);

	scheduler.attachEvent("onAfterQuickInfo", function(){afterPopup();});

	if(!dhtmlx._keyNavMessagePopup) {
		dhtmlx._keyNavMessagePopup = true;

		var focusElement = null;
		var backupFocus = null;
		dhtmlx.attachEvent("onMessagePopup", function(box){
			focusElement = document.activeElement;
			backupFocus = focusElement;

			while(backupFocus && scheduler._getClassName(backupFocus).indexOf("dhx_cal_data") < 0){
				backupFocus = backupFocus.parentNode;
			}
			if(backupFocus){
				backupFocus = backupFocus.parentNode;
			}

			scheduler.eventRemove(box, "keydown", trapFocus);
			scheduler.event(box, "keydown", trapFocus);
			dhtmlx._modalsStack.push(box);
		});


		dhtmlx.attachEvent("onAfterMessagePopup", function () {
			var box = dhtmlx._modalsStack.pop();
			if(box) {
				scheduler.eventRemove(box, "keydown", trapFocus);
			}
			setTimeout(function(){

				var currentTarget = document.activeElement;
				while(currentTarget && scheduler._getClassName(currentTarget).indexOf("dhx_cal_light") < 0){
					currentTarget = currentTarget.parentNode;
				}
				if(currentTarget)
					return;


				if(focusElement && focusElement.parentNode){
					focusElement.focus();

				}else if(backupFocus && backupFocus.parentNode){
					backupFocus.focus();
				}
				focusElement = null;
				backupFocus = null;

			}, 1);
		});
	}

	scheduler.$keyboardNavigation.isModal = isModal;


})();
scheduler.$keyboardNavigation.dispatcher = {
	isActive: false,
	activeNode: null,
	globalNode: new scheduler.$keyboardNavigation.SchedulerNode(),

	keepScrollPosition: function (callback) {
		var top, left;

		var scrollable = scheduler.$container.querySelector(".dhx_timeline_scrollable_data");
		if(!scrollable){
			scrollable = scheduler.$container.querySelector(".dhx_cal_data");
		}

		if(scrollable){
			top = scrollable.scrollTop;
			left = scrollable.scrollLeft;
		}

		callback();

		if(scrollable){
			scrollable.scrollTop = top;
			scrollable.scrollLeft = left;
		}
	},
	enable: function(){
		if(!scheduler.$container){
			// do nothing if not initialized
			return;
		}

		this.isActive = true;
		var self = this;
		this.keepScrollPosition(function () {
			self.globalNode.enable();
			self.setActiveNode(self.getActiveNode());
		});
	},

	disable: function(){
		this.isActive = false;
		this.globalNode.disable();
	},

	isEnabled: function(){
		return !!this.isActive;
	},

	getDefaultNode: function(){
		return this.globalNode.getDefaultNode();
	},

	setDefaultNode: function() {
		this.setActiveNode(this.getDefaultNode());
	},

	getActiveNode: function(){
		var node = this.activeNode;
		if(node && !node.isValid()){
			node = node.fallback();
		}
		return node;
	},

	focusGlobalNode: function(){
		this.blurNode(this.globalNode);
		this.focusNode(this.globalNode);
	},

	setActiveNode: function(el){
		if(!el || !el.isValid())
			return;

		if(this.activeNode){
			if(this.activeNode.compareTo(el)){
				return;
			}
		}
		if(this.isEnabled()){
			this.blurNode(this.activeNode);
			this.activeNode = el;
			this.focusNode(this.activeNode);
		}
	},

	focusNode: function(el){
		if(el && el.focus){
			el.focus();
			if(el.getNode && document.activeElement != el.getNode()){
				this.setActiveNode(new scheduler.$keyboardNavigation.DataArea());
			}
		}
	},
	blurNode: function(el){
		if(el && el.blur){
			el.blur();
		}
	},

	getInlineEditor: function(id){
		var editor = scheduler.$container.querySelector(".dhx_cal_editor[event_id='"+id+"'] textarea");
		if(editor && editor.offsetWidth){
			// if exists and visible
			return editor;
		}
		return null;
	},

	keyDownHandler: function (e) {

		if(e.defaultPrevented){
			return;
		}

		var activeElement = this.getActiveNode();

		if(scheduler.$keyboardNavigation.isModal() &&
			!(activeElement && activeElement.container && scheduler._locate_css({target:activeElement.container}, "dhx_minical_popup", false)))
			return;

		if(scheduler.getState().editor_id && this.getInlineEditor(scheduler.getState().editor_id))
			return;

		if (!this.isEnabled())
			return;

		e = e || window.event;

		var schedulerNode = this.globalNode;

		var command = scheduler.$keyboardNavigation.shortcuts.getCommandFromEvent(e);

		if(!activeElement){
			this.setDefaultNode();
		}else if(activeElement.findHandler(command)){
			activeElement.doAction(command, e);
		}else if(schedulerNode.findHandler(command)){
			schedulerNode.doAction(command, e);
		}

	},

	_timeout: null,
	delay: function(callback, delay){

		clearTimeout(this._timeout);
		this._timeout = setTimeout(callback, delay || 1);

	}
};
//Initial idea and implementation by Steve MC
scheduler._temp_key_scope = function (){

	scheduler.config.key_nav = true;

	scheduler.$keyboardNavigation._pasteDate = null; // used for copy and paste operations
	scheduler.$keyboardNavigation._pasteSection = null; // used for copy and paste operations
	var isCopy = null;

	var pos = {};

	if(!document.body){
		scheduler.event(window, "load", function(){
			scheduler.event(document.body, "mousemove", trackMousePosition);
		});
	}else{
		scheduler.event(document.body, "mousemove", trackMousePosition);
	}

	function trackMousePosition(event){
		event = event || window.event;
		pos.x = event.clientX;
		pos.y = event.clientY;
	}
	function currentTarget(){

		var mousePointer = false;
		var keyNavPointer = false;

		var target = document.elementFromPoint(pos.x, pos.y);
		while(target && target != scheduler._obj){
			target = target.parentNode;
		}
		mousePointer = !!(target == scheduler._obj);

		keyNavPointer = scheduler.$keyboardNavigation.dispatcher.isEnabled();

		return mousePointer || keyNavPointer;
	}

	scheduler.attachEvent("onMouseMove", function(id,e){
		var state = scheduler.getState();

		// make sure scheduler is fully initialized before calling scheduler.getActionData
		if(!(state.mode && state.min_date)){
			return;
		}
		var position = scheduler.getActionData(e);
		scheduler.$keyboardNavigation._pasteDate = position.date;
		scheduler.$keyboardNavigation._pasteSection = position.section;
	});

	function clear_event_after(ev){
		delete ev.rec_type; delete ev.rec_pattern;
		delete ev.event_pid; delete ev.event_length;
	}

	function copyEvent(ev){
		return scheduler._lame_copy({}, ev);
	}

	scheduler._make_pasted_event = function(ev){
		var date = scheduler.$keyboardNavigation._pasteDate;
		var section = scheduler.$keyboardNavigation._pasteSection;

		var event_duration = ev.end_date-ev.start_date;

		var copy = copyEvent(ev);
		clear_event_after(copy);
		copy.start_date = new Date(date);
		copy.end_date = new Date(copy.start_date.valueOf() + event_duration);

		if(section){
			var property = scheduler._get_section_property();

			if(scheduler.config.multisection)
				copy[property] = ev[property]; // save initial set of resources for multisection view
			else
				copy[property] = section;
		}
		return copy;
	};
	scheduler._do_paste = function(is_copy, modified_ev, original_ev){
		scheduler.addEvent(modified_ev);
		scheduler.callEvent("onEventPasted", [is_copy, modified_ev, original_ev]);
	};

	scheduler._is_key_nav_active = function(){
		if(this._is_initialized() && !this._is_lightbox_open() && this.config.key_nav){
			return true;
		}
		return false;
	};

	function getSelectedEvent(){
		var node = scheduler.$keyboardNavigation.dispatcher.getActiveNode();
		if(node && node.eventId) return node.eventId;
		return scheduler._select_id;
	}
	
	scheduler.event(document, "keydown", function(e){
		// compatibility fix - scheduler focus on ctrl+v on mouse hover
		if(((e.ctrlKey || e.metaKey) && e.keyCode == 86) && scheduler._buffer_event && !scheduler.$keyboardNavigation.dispatcher.isEnabled()) {
			scheduler.$keyboardNavigation.dispatcher.isActive = currentTarget();
		}
	});

	scheduler._key_nav_copy_paste = function(e){
		if(!scheduler._is_key_nav_active()) return true;

		e=e||event;

		if (e.keyCode == 37 || e.keyCode == 39) { // Left, Right arrows
			e.cancelBubble = true;

			var next = scheduler.date.add(scheduler._date,(e.keyCode == 37 ? -1 : 1 ),scheduler._mode);
			scheduler.setCurrentView(next);
			return true;
		}

		var select_id = getSelectedEvent();
		if ((e.ctrlKey || e.metaKey) && e.keyCode == 67) {  // CTRL+C
			if (select_id) {
				scheduler._buffer_event = copyEvent(scheduler.getEvent(select_id));
				isCopy = true;
				scheduler.callEvent("onEventCopied", [scheduler.getEvent(select_id)]);
			}
			return true;
		}
		if ((e.ctrlKey || e.metaKey) && e.keyCode == 88) { // CTRL+X
			if (select_id) {
				isCopy = false;
				var ev = scheduler._buffer_event = copyEvent(scheduler.getEvent(select_id));

				scheduler.updateEvent(ev.id);
				scheduler.callEvent("onEventCut", [ev]);
			}
		}

		if ((e.ctrlKey || e.metaKey) && e.keyCode == 86 && currentTarget(e)) {  // CTRL+V
			var ev = scheduler._buffer_event ? scheduler.getEvent(scheduler._buffer_event.id) : scheduler._buffer_event;
			ev = ev || scheduler._buffer_event;

			if (ev) {
				var new_ev = scheduler._make_pasted_event(ev);
				if (isCopy) {
					new_ev.id = scheduler.uid();
					scheduler._do_paste(isCopy, new_ev, ev);
				}
				else { // cut operation
					var res = scheduler.callEvent("onBeforeEventChanged",[new_ev, e, false, ev]);
					if (res) {
						scheduler._do_paste(isCopy, new_ev, ev);
						isCopy = true; // switch to copy after first paste operation
					}
				}

			}
			return true;
		}
	};
};
scheduler._temp_key_scope();


		(function(){
scheduler.$keyboardNavigation.attachSchedulerHandlers = function(){
	var dispatcher = scheduler.$keyboardNavigation.dispatcher;

	var keyDownHandler = function(e){
		if(!scheduler.config.key_nav) return;

		return dispatcher.keyDownHandler(e);
	};

	var focusHandler = function () {
		dispatcher.keepScrollPosition(function () {
			dispatcher.focusGlobalNode();
		});
	};

	var waitCall;
	scheduler.attachEvent("onDataRender", function(){
		if(!scheduler.config.key_nav) return;
		if(!(dispatcher.isEnabled() && !scheduler.getState().editor_id)) return;

		clearTimeout(waitCall);
		waitCall = setTimeout(function(){
			if(!dispatcher.isEnabled())
				dispatcher.enable();
			reFocusActiveNode();
		});
	});

	var reFocusActiveNode = function(){
		if(!dispatcher.isEnabled())
			return;

		var activeNode = dispatcher.getActiveNode();
		if(!activeNode)
			return;

		if(!activeNode.isValid()){
			activeNode = activeNode.fallback();
		}

		if(!activeNode || activeNode instanceof scheduler.$keyboardNavigation.MinicalButton || activeNode instanceof scheduler.$keyboardNavigation.MinicalCell)
			return;

		dispatcher.keepScrollPosition(function () {
			activeNode.focus(true);
		});
	};

	scheduler.attachEvent("onSchedulerReady", function(){
		var container = scheduler.$container;
		scheduler.eventRemove(document, "keydown", keyDownHandler);
		scheduler.eventRemove(container, "mousedown", mousedownHandler);
		scheduler.eventRemove(container, "focus", focusHandler);


		if(scheduler.config.key_nav){

			scheduler.event(document, "keydown", keyDownHandler);
			scheduler.event(container, "mousedown", mousedownHandler);
			scheduler.event(container, "focus", focusHandler);

			container.setAttribute("tabindex", "0");

		}else{
			container.removeAttribute("tabindex");
		}
	});

	function mousedownHandler(e){
		if(!scheduler.config.key_nav) return true;


		var dataAreaClick = scheduler.$keyboardNavigation.isChildOf(e.target || e.srcElement, scheduler.$container.querySelector(".dhx_cal_data"));


		var pos = scheduler.getActionData(e);

		var focusNode;
		if(scheduler._locate_event(e.target || e.srcElement)){
			focusNode = new scheduler.$keyboardNavigation.Event(scheduler._locate_event(e.target || e.srcElement));
		}else if(dataAreaClick){
			focusNode = new scheduler.$keyboardNavigation.TimeSlot();
			if(pos.date && dataAreaClick){
				focusNode = focusNode.nextSlot(new scheduler.$keyboardNavigation.TimeSlot(pos.date, null, pos.section));
			}
		}

		if(focusNode) {
			if (!dispatcher.isEnabled()) {
				dispatcher.activeNode = focusNode;

			} else {
				if (pos.date && dataAreaClick) {
					dispatcher.delay(function () {
						dispatcher.setActiveNode(focusNode);
					});
				}
			}
		}
	}

	function focusEvent(evNode){
		if(!scheduler.config.key_nav) return;
		if(!dispatcher.isEnabled()) return;


		var prevState = evNode;
		var focusNode = new scheduler.$keyboardNavigation.Event(prevState.eventId);
		if(!focusNode.isValid()){
			var lastStart = focusNode.start || prevState.start;
			var lastEnd = focusNode.end || prevState.end;
			var lastSection = focusNode.section || prevState.section;

			focusNode = new scheduler.$keyboardNavigation.TimeSlot(lastStart, lastEnd, lastSection);
			if(!focusNode.isValid()){
				focusNode = new scheduler.$keyboardNavigation.TimeSlot();
			}
		}

		dispatcher.setActiveNode(focusNode);
		var node = dispatcher.getActiveNode();
		if(node && node.getNode && document.activeElement != node.getNode()){
			dispatcher.focusNode(dispatcher.getActiveNode());
		}
	}


	var updateEvent = scheduler.updateEvent;
	scheduler.updateEvent = function(id){
		var res = updateEvent.apply(this, arguments);
		if(scheduler.config.key_nav && dispatcher.isEnabled()){
			if(scheduler.getState().select_id == id){
				var element = new scheduler.$keyboardNavigation.Event(id);

				if(!scheduler.getState().lightbox_id){
					focusEvent(element);
				}
			}
		}
		return res;
	};

	scheduler.attachEvent("onEventDeleted", function(id) {
		if(!scheduler.config.key_nav) return true;
		if(dispatcher.isEnabled()){
			var activeNode = dispatcher.getActiveNode();
			if(activeNode.eventId == id){
				dispatcher.setActiveNode(new scheduler.$keyboardNavigation.TimeSlot());
			}
		}
		return true;
	});

	scheduler.attachEvent("onClearAll", function(){
		if(!scheduler.config.key_nav) return true;
		if(dispatcher.isEnabled()){
			if(dispatcher.getActiveNode() instanceof scheduler.$keyboardNavigation.Event){
				dispatcher.setActiveNode(new scheduler.$keyboardNavigation.TimeSlot());
			}
		}
	});

};
scheduler.$keyboardNavigation._minicalendars = [];

scheduler.$keyboardNavigation.isMinical = function(node){
	var minicalendars = scheduler.$keyboardNavigation._minicalendars;
	for(var i = 0; i < minicalendars.length; i++){
		if(this.isChildOf(node, minicalendars[i]))
			return true;
	}
	return false;
};

scheduler.$keyboardNavigation.isChildOf = function(child, parent){
	while(child && child !== parent){
		child = child.parentNode;
	}

	return !!(child === parent);
};

scheduler.$keyboardNavigation.patchMinicalendar = function(){
	var dispatcher = scheduler.$keyboardNavigation.dispatcher;

	function focusMinical(e){
		var target = e.target;

		dispatcher.enable();
		dispatcher.setActiveNode(new scheduler.$keyboardNavigation.MinicalButton(target, 0));
	}

	function minicalClick(e){
		var target = e.target || e.srcElement;

		var prev = scheduler._locate_css(e, "dhx_cal_prev_button", false);
		var next = scheduler._locate_css(e, "dhx_cal_next_button", false);
		var cell = scheduler._locate_css(e, "dhx_year_body", false);

		var rowIndex = 0;
		var cellIndex = 0;
		if(cell){
			var tr;
			var td;
			var current = target;
			while(current && current.tagName.toLowerCase() != "td"){
				current = current.parentNode;
			}
			if(current){
				td = current;
				tr = td.parentNode;
			}

			if(tr && td){
				var rows = tr.parentNode.querySelectorAll("tr");
				for(var i = 0; i < rows.length; i++){
					if(rows[i] == tr){
						rowIndex = i;
						break;
					}
				}
				var cells = tr.querySelectorAll("td");
				for(var i = 0; i < cells.length; i++){
					if(cells[i] == td){
						cellIndex = i;
						break;
					}
				}
			}
		}
		var root = e.currentTarget;
		dispatcher.delay(function(){
			if(prev || next || cell){

				var element;
				if(prev){
					element = new scheduler.$keyboardNavigation.MinicalButton(root, 0);
					dispatcher.setActiveNode(new scheduler.$keyboardNavigation.MinicalButton(root, 0));
				}else if(next){
					element = new scheduler.$keyboardNavigation.MinicalButton(root, 1);
				}else if(cell){
					element = new scheduler.$keyboardNavigation.MinicalCell(root, rowIndex, cellIndex);

				}

				if(element){

					dispatcher.enable();
					if(element.isValid()){
						dispatcher.activeNode = null;
						dispatcher.setActiveNode(element);
					}

				}
			}

		});
	}

	if(scheduler.renderCalendar){
		var renderMinical = scheduler.renderCalendar;
		scheduler.renderCalendar = function(){
			var cal = renderMinical.apply(this, arguments);
			var minicalendars = scheduler.$keyboardNavigation._minicalendars;

			scheduler.eventRemove(cal, "click", minicalClick);
			scheduler.event(cal, "click", minicalClick);

			scheduler.eventRemove(cal, "focus", focusMinical);
			scheduler.event(cal, "focus", focusMinical);

			var added = false;
			for(var i = 0; i < minicalendars.length; i++){
				if(minicalendars[i] == cal){
					added = true;
					break;
				}
			}
			if(!added)
				minicalendars.push(cal);

			if(dispatcher.isEnabled()){
				var node = dispatcher.getActiveNode();
				if(node && node.container == cal){
					dispatcher.focusNode(node);
				}else{
					cal.setAttribute("tabindex", "0");
				}
			}else{
				cal.setAttribute("tabindex", "0");
			}
			return cal;
		};
	}

	if(scheduler.destroyCalendar){
		var destroyMinical = scheduler.destroyCalendar;
		scheduler.destroyCalendar = function(cal, force){
			cal = cal || (scheduler._def_count ? scheduler._def_count.firstChild : null);
			var res = destroyMinical.apply(this, arguments);

			if(!cal || !cal.parentNode){
				var minicalendars = scheduler.$keyboardNavigation._minicalendars;
				for(var i = 0; i < minicalendars.length; i++){
					if(minicalendars[i] == cal){
						scheduler.eventRemove(minicalendars[i], "focus", focusMinical);
						minicalendars.splice(i, 1);
						i--;
					}
				}
			}

			return res;
		};
	}
};


			var dispatcher = scheduler.$keyboardNavigation.dispatcher;

			scheduler.$keyboardNavigation.attachSchedulerHandlers();

			if(scheduler.renderCalendar){
				// if minical ext loaded before key nav ext - patch it now
				scheduler.$keyboardNavigation.patchMinicalendar();
			}else{
				// otherwise - wait until everything is loaded and try again
				var attachOnce = scheduler.attachEvent("onSchedulerReady", function(){
					scheduler.detachEvent(attachOnce);
					scheduler.$keyboardNavigation.patchMinicalendar();
				});
			}



			function isSchedulerSelected(){
				if(!scheduler.config.key_nav) return;

				var enable;
				var focusElement = document.activeElement;
				// halt key nav when focus is outside scheduler or in quick info popup
				if(!focusElement || scheduler._locate_css(focusElement, "dhx_cal_quick_info", false)){
					enable = false;
				}else{
					enable = scheduler.$keyboardNavigation.isChildOf(focusElement, scheduler.$container) || scheduler.$keyboardNavigation.isMinical(focusElement);
				}

				return enable;
			}



			function changeState(enable){
				if(enable && !dispatcher.isEnabled()){
					dispatcher.enable();
				}else if(!enable && dispatcher.isEnabled()){
					dispatcher.disable();
				}
			}

			setInterval(function(){
				if(!scheduler.$container || !scheduler.$keyboardNavigation.isChildOf(scheduler.$container, document.body)){
					return;
				}

				var enable = isSchedulerSelected();

				if(enable){
					changeState(enable);
				}else if(!enable && dispatcher.isEnabled()){
					setTimeout(function(){
						// doublecheck in case checking is done in handler before focus element is repainted
						if(scheduler.config.key_nav){
							changeState(isSchedulerSelected());
						}else{
							scheduler.$container.removeAttribute("tabindex");
						}

					}, 100);
				}
			}, 500);

		})();

	}

if(window.Scheduler){
	window.Scheduler.plugin(setupKeyNav);
}else{
	setupKeyNav(window.scheduler);
}


})();
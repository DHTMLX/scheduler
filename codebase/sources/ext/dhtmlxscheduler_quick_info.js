/*
@license
dhtmlxScheduler v.5.0.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.icons_select = ["icon_details", "icon_delete"];
scheduler.config.details_on_create = true;
scheduler.config.show_quick_info = true;
scheduler.xy.menu_width = 0;

scheduler.attachEvent("onClick", function(id){
	scheduler.showQuickInfo(id);
	return true;
});

(function(){
	var events = ["onEmptyClick", "onViewChange", "onLightbox", "onBeforeEventDelete", "onBeforeDrag"];
	var hiding_function = function(){
		scheduler._hideQuickInfo();
		return true;
	};
	for (var i=0; i<events.length; i++)
		scheduler.attachEvent(events[i], hiding_function);
})();

scheduler.templates.quick_info_title = function(start, end, ev){ return ev.text.substr(0,50); };
scheduler.templates.quick_info_content = function(start, end, ev){ return ev.details || ev.text; };
scheduler.templates.quick_info_date = function(start, end, ev){
	if (scheduler.isOneDayEvent(ev))
		return scheduler.templates.day_date(start, end, ev) + " " +scheduler.templates.event_header(start, end, ev);
	else
		return scheduler.templates.week_date(start, end, ev);
};

scheduler.showQuickInfo = function(id){
	if (id == this._quick_info_box_id || !this.config.show_quick_info) return;
	this.hideQuickInfo(true);

	var pos = this._get_event_counter_part(id);
	
	if (pos){
		this._quick_info_box = this._init_quick_info(pos);
		this._fill_quick_data(id);
		this._show_quick_info(pos);

		this.callEvent("onQuickInfo", [id]);
	}
};
scheduler._hideQuickInfo = function(){
	scheduler.hideQuickInfo();
};

(function(){

function cssTimeToMs(time) {
	time = time || "";

	var num = parseFloat(time),
		unit = time.match(/m?s/),
		milliseconds;

	if (unit) {
		unit = unit[0];
	}

	switch (unit) {
		case "s": // seconds
			milliseconds = num * 1000;
			break;
		case "ms": // milliseconds
			milliseconds = num;
			break;
		default:
			milliseconds = 0;
			break;
	}

	return milliseconds;
}

scheduler.hideQuickInfo = function(forced){
	var qi = this._quick_info_box;
	var eventId = this._quick_info_box_id;
	this._quick_info_box_id = 0;

	if (qi && qi.parentNode){
		var width = qi.offsetWidth;
		if (scheduler.config.quick_info_detached) {
			this.callEvent("onAfterQuickInfo", [eventId]);
			return qi.parentNode.removeChild(qi);
		}

		if (qi.style.right == "auto")
			qi.style.left = -width + "px";
		else
			qi.style.right = -width + "px";

		if (forced) {
			qi.parentNode.removeChild(qi);
		}else{

			var style;
			if(window.getComputedStyle){
				style = window.getComputedStyle(qi, null);
			}else if(qi.currentStyle){
				style = qi.currentStyle;
			}
			var delay = cssTimeToMs(style["transition-delay"]) + cssTimeToMs(style["transition-duration"]);
			setTimeout(function(){
				if(qi.parentNode){
					qi.parentNode.removeChild(qi);
				}
			}, delay);
		}

		this.callEvent("onAfterQuickInfo", [eventId]);
	}
};

})();

dhtmlxEvent(window, "keydown", function(e){
	if (e.keyCode == 27)
		scheduler.hideQuickInfo();
});

scheduler._show_quick_info = function(pos){
	var qi = scheduler._quick_info_box;
	scheduler._obj.appendChild(qi);
	var width = qi.offsetWidth;
	var height = qi.offsetHeight;

	if (scheduler.config.quick_info_detached){
		qi.style.left = pos.left - pos.dx*(width - pos.width) + "px";
		qi.style.top = pos.top - (pos.dy?height:-pos.height) + "px";
	} else {
		qi.style.top = this.xy.scale_height+this.xy.nav_height + 20 + "px";
		if (pos.dx == 1){
			qi.style.right = "auto";
			qi.style.left = -width + "px";
			
			setTimeout(function(){
				qi.style.left = "-10px";
			},1);
		} else {
			qi.style.left = "auto";
			qi.style.right = -width + "px";
			
			setTimeout(function(){
				qi.style.right = "-10px";
			},1);
		}
		qi.className = qi.className.replace(" dhx_qi_left","").replace(" dhx_qi_right","")+" dhx_qi_"+(pos.dx==1?"left":"right");
	}
};
scheduler.attachEvent("onTemplatesReady", function(){
	scheduler.hideQuickInfo();
	if(this._quick_info_box){
		var box = this._quick_info_box;
		if(box.parentNode){
			box.parentNode.removeChild(box);
		}
		this._quick_info_box = null;
	}
});
scheduler._quick_info_onscroll_handler = function(e){
	scheduler.hideQuickInfo();
};
scheduler._init_quick_info = function(){
	if (!this._quick_info_box){
		var sizes = scheduler.xy;

		var qi = this._quick_info_box = document.createElement("div");

		this._waiAria.quickInfoAttr(qi);

		qi.className = "dhx_cal_quick_info";
		if (scheduler.$testmode)
			qi.className += " dhx_no_animate";
	//title
		var ariaAttr = this._waiAria.quickInfoHeaderAttrString();
		var html = "<div class=\"dhx_cal_qi_title\" style=\"height:"+sizes.quick_info_title+"px\" "+ariaAttr+">" +
			"<div class=\"dhx_cal_qi_tcontent\"></div><div  class=\"dhx_cal_qi_tdate\"></div>" +
			"</div>" +
			"<div class=\"dhx_cal_qi_content\"></div>";

	//buttons
		html += "<div class=\"dhx_cal_qi_controls\" style=\"height:"+sizes.quick_info_buttons+"px\">";
		var buttons = scheduler.config.icons_select;
		for (var i = 0; i < buttons.length; i++) {
			var ariaAttr = this._waiAria.quickInfoButtonAttrString(this.locale.labels[buttons[i]]);
			html += "<div "+ariaAttr+" class=\"dhx_qi_big_icon " + buttons[i] + "\" title=\"" + scheduler.locale.labels[buttons[i]] + "\"><div class='dhx_menu_icon " + buttons[i] + "'></div><div>" + scheduler.locale.labels[buttons[i]] + "</div></div>";
		}
		html += "</div>";

		qi.innerHTML = html;
		dhtmlxEvent(qi, "click", function(ev){
			ev = ev || event;
			scheduler._qi_button_click(ev.target || ev.srcElement);
		});
		if (scheduler.config.quick_info_detached){
			scheduler._detachDomEvent(scheduler._els["dhx_cal_data"][0], "scroll", scheduler._quick_info_onscroll_handler);
			dhtmlxEvent(scheduler._els["dhx_cal_data"][0], "scroll", scheduler._quick_info_onscroll_handler);
		}
	}

	return this._quick_info_box;
};

scheduler._qi_button_click = function(node){
	var box = scheduler._quick_info_box;
	if (!node || node == box) return;

	var mask = scheduler._getClassName(node);
	if (mask.indexOf("_icon")!=-1){
		var id = scheduler._quick_info_box_id;
		scheduler._click.buttons[mask.split(" ")[1].replace("icon_","")](id);
	} else
		scheduler._qi_button_click(node.parentNode);
};
scheduler._get_event_counter_part = function(id){
	var domEv = scheduler.getRenderedEvent(id);
	var left = 0;
	var top = 0;

	var node = domEv;
	while (node && node != scheduler._obj){
		left += node.offsetLeft;
		top += node.offsetTop-node.scrollTop;
		node = node.offsetParent;
	}
	if(node){
		var dx = (left + domEv.offsetWidth/2) > (scheduler._x/2) ? 1 : 0;
		var dy = (top + domEv.offsetHeight/2) > (scheduler._y/2) ? 1 : 0;

		return { left:left, top:top, dx:dx, dy:dy,
			width:domEv.offsetWidth, height:domEv.offsetHeight };
	}
	return 0;
};

scheduler._fill_quick_data  = function(id){
	var ev = scheduler.getEvent(id);
	var qi = scheduler._quick_info_box;

	scheduler._quick_info_box_id = id;

//title content

	var header = {
		content: scheduler.templates.quick_info_title(ev.start_date, ev.end_date, ev),
		date: scheduler.templates.quick_info_date(ev.start_date, ev.end_date, ev)
	};
	var titleContent = qi.firstChild.firstChild;
	titleContent.innerHTML = header.content;
	var titleDate = titleContent.nextSibling;
	titleDate.innerHTML = header.date;

	scheduler._waiAria.quickInfoHeader(qi, [header.content, header.date].join(" "));

//main content
	var main = qi.firstChild.nextSibling;
	main.innerHTML = scheduler.templates.quick_info_content(ev.start_date, ev.end_date, ev);
};

/*
@license
dhtmlxScheduler v.5.0.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
window.dhtmlXTooltip = scheduler.dhtmlXTooltip = window.dhtmlxTooltip = {};

dhtmlXTooltip.config = {
	className: 'dhtmlXTooltip tooltip',
	timeout_to_display: 50,
	timeout_to_hide: 50,
	delta_x: 15,
	delta_y: -20
};

dhtmlXTooltip.tooltip = document.createElement('div');
dhtmlXTooltip.tooltip.className = dhtmlXTooltip.config.className;
scheduler._waiAria.tooltipAttr(dhtmlXTooltip.tooltip);

dhtmlXTooltip.show = function(event, text) { //browser event, text to display
	if (this._mobile && !scheduler.config.touch_tooltip) return;
	
	var dhxTooltip = dhtmlXTooltip;
	var tooltip_div = this.tooltip;
	var tooltip_div_style = tooltip_div.style;
	dhxTooltip.tooltip.className = dhxTooltip.config.className;
	var pos = this.position(event);

	var target = event.target || event.srcElement;
	// if we are over tooltip -- do nothing, just return (so tooltip won't move)
	if (this.isTooltip(target)) {
		return;
	}

	var actual_x = pos.x + (dhxTooltip.config.delta_x || 0);
	var actual_y = pos.y - (dhxTooltip.config.delta_y || 0);

	tooltip_div_style.visibility = "hidden";

	if (tooltip_div_style.removeAttribute) {
		tooltip_div_style.removeAttribute("right");
		tooltip_div_style.removeAttribute("bottom");
	} else {
		tooltip_div_style.removeProperty("right");
		tooltip_div_style.removeProperty("bottom");
	}

	tooltip_div_style.left = "0";
	tooltip_div_style.top = "0";

	this.tooltip.innerHTML = text;
	document.body.appendChild(this.tooltip);

	var tooltip_width = this.tooltip.offsetWidth;
	var tooltip_height = this.tooltip.offsetHeight;

	if ((document.documentElement.clientWidth - actual_x - tooltip_width) < 0) { // tooltip is out of the right page bound
		if(tooltip_div_style.removeAttribute)
			tooltip_div_style.removeAttribute("left");
		else
			tooltip_div_style.removeProperty("left");
		tooltip_div_style.right = (document.documentElement.clientWidth - actual_x + 2 * (dhxTooltip.config.delta_x||0)) + "px";
	} else {
		if (actual_x < 0) {
			// tooltips is out of the left page bound
			tooltip_div_style.left = (pos.x + Math.abs(dhxTooltip.config.delta_x||0)) + "px";
		} else {
			// normal situation
			tooltip_div_style.left = actual_x + "px";
		}
	}

	if ((document.documentElement.clientHeight - actual_y - tooltip_height) < 0) { // tooltip is below bottom of the page
		if(tooltip_div_style.removeAttribute)
			tooltip_div_style.removeAttribute("top");
		else
			tooltip_div_style.removeProperty("top");
		tooltip_div_style.bottom = (document.documentElement.clientHeight - actual_y - 2 * (dhxTooltip.config.delta_y||0)) + "px";
	} else {
		if (actual_y < 0) {
			// tooltip is higher then top of the page
			tooltip_div_style.top = (pos.y + Math.abs(dhxTooltip.config.delta_y||0)) + "px";
		} else {
			// normal situation
			tooltip_div_style.top = actual_y + "px";
		}
	}

	scheduler._waiAria.tooltipVisibleAttr(this.tooltip);

	tooltip_div_style.visibility = "visible";
	this.tooltip.onmouseleave = function(e){
		e = e || window.event;
		/*
		 A rare but reported scenario, when tooltip appears at the edge of the scheduler (e.g. left part inside cal, right part - outside).
		 User moves mouse from the scheduler into the tooltip, and then from the tooltip to the page outside the calendar.
		 As a result - tooltip freezes and no longer reacts until mouse reenters the calendar.
		*/
		var tooltip = scheduler.dhtmlXTooltip;

		var node = e.relatedTarget;
		while (node != scheduler._obj && node) {
			node = node.parentNode;
		}

		if(node != scheduler._obj)
			tooltip.delay(tooltip.hide, tooltip, [], tooltip.config.timeout_to_hide);
	};

	scheduler.callEvent("onTooltipDisplayed", [this.tooltip, this.tooltip.event_id]);
};
dhtmlXTooltip._clearTimeout = function(){
	if(this.tooltip._timeout_id) {
		window.clearTimeout(this.tooltip._timeout_id);
	}
};

dhtmlXTooltip.hide = function() {
	if (this.tooltip.parentNode) {
		scheduler._waiAria.tooltipHiddenAttr(this.tooltip);

		var event_id = this.tooltip.event_id;
		this.tooltip.event_id = null;
		this.tooltip.onmouseleave = null;
		this.tooltip.parentNode.removeChild(this.tooltip);
		scheduler.callEvent("onAfterTooltip", [event_id]);
	}
	this._clearTimeout();
};
dhtmlXTooltip.delay = function(method, object, params, delay) {
	this._clearTimeout();
	this.tooltip._timeout_id = setTimeout(function() {
		var ret = method.apply(object, params);
		method = object = params = null;
		return ret;
	}, delay || this.config.timeout_to_display);
};

dhtmlXTooltip.isTooltip = function(node) {
	var res = false;

	while (node && !res) {
		res = (node.className == this.tooltip.className);
		node = node.parentNode;
	}
	return res;
};

dhtmlXTooltip.position = function(ev) {
	ev = ev || window.event;
	return {x: ev.clientX, y: ev.clientY};
};

scheduler.attachEvent("onMouseMove", function(event_id, e) { // (scheduler event_id, browser event)
	var ev = window.event || e;
	var target = ev.target || ev.srcElement;
	var dhxTooltip = dhtmlXTooltip;

	var is_tooltip = dhxTooltip.isTooltip(target);
	var is_tooltip_target = (dhxTooltip.isTooltipTarget && dhxTooltip.isTooltipTarget(target));

	// if we are over event or tooltip or custom target for tooltip
	if ((event_id && scheduler.getState().editor_id != event_id) || is_tooltip || is_tooltip_target) {
		var text;

		if (event_id || dhxTooltip.tooltip.event_id) {
			var event = scheduler.getEvent(event_id) || scheduler.getEvent(dhxTooltip.tooltip.event_id);
			if (!event)
				return;

			dhxTooltip.tooltip.event_id = event.id;
			text = scheduler.templates.tooltip_text(event.start_date, event.end_date, event);
			if (!text)
				return dhxTooltip.hide();
		}
		if (is_tooltip_target) {
			text = "";
		}

		var evt;
		if (_isIE) {
			//make a copy of event, will be used in timed call

			evt = {'pageX':undefined,
				'pageY':undefined,
				'clientX':undefined,
				'clientY':undefined,
				'target':undefined,
				'srcElement':undefined
			};
			for(var i in evt){
				evt[i] = ev[i];
			}
		}

		if (!scheduler.callEvent("onBeforeTooltip", [event_id]) || !text)
			return;

		dhxTooltip.delay(dhxTooltip.show, dhxTooltip, [(evt || ev), text]); // showing tooltip
	} else {
		dhxTooltip.delay(dhxTooltip.hide, dhxTooltip, [], dhxTooltip.config.timeout_to_hide);
	}
});
scheduler.attachEvent("onBeforeDrag", function() {
	dhtmlXTooltip.hide();
	return true;
});
scheduler.attachEvent("onEventDeleted", function() {
	dhtmlXTooltip.hide();
	return true;
});

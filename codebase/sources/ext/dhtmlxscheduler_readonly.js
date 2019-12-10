/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){
	
scheduler.attachEvent("onTemplatesReady", function() {
	var originalRecurringSetValue;
	if (scheduler.form_blocks.recurring) {
		originalRecurringSetValue = scheduler.form_blocks.recurring.set_value;
	}
	var original_left_buttons = scheduler.config.buttons_left.slice();
	var original_right_buttons = scheduler.config.buttons_right.slice();

	scheduler.attachEvent("onBeforeLightbox", function(id) {
		if (this.config.readonly_form || this.getEvent(id).readonly) {
			this.config.readonly_active = true;
		}
		else {
			this.config.readonly_active = false;
			scheduler.config.buttons_left = original_left_buttons.slice();
			scheduler.config.buttons_right = original_right_buttons.slice();
	
			// initial value
			if(scheduler.form_blocks.recurring) {
				scheduler.form_blocks.recurring.set_value = originalRecurringSetValue;
			}
		}

		var sns = this.config.lightbox.sections;
		if (this.config.readonly_active) {
			for (var i = 0; i < sns.length; i++) {
				if (sns[i].type == 'recurring') {
					if (this.config.readonly_active && scheduler.form_blocks.recurring) {
						scheduler.form_blocks.recurring.set_value = function(node, value, ev) {
							var wrapper = scheduler.$domHelpers.closest(node, ".dhx_wrap_section");
							var style = "none";
							wrapper.querySelector('.dhx_cal_lsection').display = style;
							wrapper.querySelector('.dhx_form_repeat').display = style;
							wrapper.style.display = style;

							scheduler.setLightboxSize();
						};
					}
				}
			}

			var forbidden_buttons = ["dhx_delete_btn", "dhx_save_btn"];
			var button_arrays = [scheduler.config.buttons_left, scheduler.config.buttons_right];
			for (var i = 0; i < forbidden_buttons.length; i++) {
				var forbidden_button = forbidden_buttons[i];
				for (var k = 0; k < button_arrays.length; k++) {
					var button_array = button_arrays[k];
					var index = -1;
					for (var p = 0; p < button_array.length; p++) {
						if (button_array[p] == forbidden_button) {
							index = p;
							break;
						}
					}
					if (index != -1) {
						button_array.splice(index, 1);
					}
				}
			}
		}

		this.resetLightbox();

		return true;
	});

	function txt_replace(tag, d, n, text) {
		var txts = d.getElementsByTagName(tag);
		var txtt = n.getElementsByTagName(tag);
		for (var i = txtt.length - 1; i >= 0; i--) {
			var n = txtt[i];
			if (!text){
				n.disabled = true;
				//radio and checkboxes loses state after .cloneNode in IE
				if(d.checked)
					n.checked = true;
			}else {
				var t = document.createElement("span");
				t.className = "dhx_text_disabled";
				t.innerHTML = text(txts[i]);
				n.parentNode.insertBefore(t, n);
				n.parentNode.removeChild(n);
			}
		}
	}

	var old = scheduler._fill_lightbox;
	scheduler._fill_lightbox = function() {

		var lb = this.getLightbox();
		if (this.config.readonly_active) {
			lb.style.visibility = 'hidden';
			// lightbox should have actual sizes before rendering controls
			// currently only matters for dhtmlxCombo
			lb.style.display = 'block';
		}
		var res = old.apply(this, arguments);
		if (this.config.readonly_active) {
			//reset visibility and display
			lb.style.visibility = '';
			lb.style.display = 'none';
		}

		if (this.config.readonly_active) {

			var d = this.getLightbox();
			var n = this._lightbox_r = d.cloneNode(true);
			n.id = scheduler.uid();
			n.className += " dhx_cal_light_readonly";
			txt_replace("textarea", d, n, function(a) {
				return a.value;
			});
			txt_replace("input", d, n, false);
			txt_replace("select", d, n, function(a) {
				if(!a.options.length) return "";
				return a.options[Math.max((a.selectedIndex || 0), 0)].text;
			});

			d.parentNode.insertBefore(n, d);

			olds.call(this, n);
			if (scheduler._lightbox)
				scheduler._lightbox.parentNode.removeChild(scheduler._lightbox);
			this._lightbox = n;

			if (scheduler.config.drag_lightbox)
				n.firstChild.onmousedown = scheduler._ready_to_dnd;
			this.setLightboxSize();
			n.onclick = function(e) {
				var src = e ? e.target : event.srcElement;
				var buttonElement = scheduler.$domHelpers.closest(src, ".dhx_btn_set");

				if (buttonElement){
					if(buttonElement.querySelector(".dhx_cancel_btn")){
						scheduler.cancel_lightbox();
					}
				}
			};

			n.onkeydown=function(e){
				var event = e || window.event;
				var target = e.target || e.srcElement;
				var buttonTarget = target.querySelector("[dhx_button]");

				if(!buttonTarget){
					buttonTarget = target.parentNode.querySelector(".dhx_custom_button, .dhx_readonly");
				}

				switch((e||event).keyCode){
					case 32:{//space
						if ((e||event).shiftKey) return;
						if(buttonTarget && buttonTarget.click){
							buttonTarget.click();
						}
						break;
					}
					case scheduler.keys.edit_cancel:
						scheduler.cancel_lightbox();
						break;
					default:
						break;
				}

			};

		}
		return res;
	};

	var olds = scheduler.showCover;
	scheduler.showCover = function() {
		if (!this.config.readonly_active)
			olds.apply(this, arguments);
	};

	var hold = scheduler.hide_lightbox;
	scheduler.hide_lightbox = function() {
		if (this._lightbox_r) {
			this._lightbox_r.parentNode.removeChild(this._lightbox_r);
			this._lightbox_r = this._lightbox = null;
		}

		return hold.apply(this, arguments);
	};
});


});

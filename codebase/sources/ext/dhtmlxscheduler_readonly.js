/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady", function() {
	var original_sns = scheduler.config.lightbox.sections.slice();
	var original_left_buttons = scheduler.config.buttons_left.slice();
	var original_right_buttons = scheduler.config.buttons_right.slice();


	scheduler.attachEvent("onBeforeLightbox", function(id) {
		if (this.config.readonly_form || this.getEvent(id).readonly) {
			this.config.readonly_active = true;

			for (var i = 0; i < this.config.lightbox.sections.length; i++) {
				this.config.lightbox.sections[i].focus = false;
			}
		}
		else {
			this.config.readonly_active = false;
			scheduler.config.lightbox.sections = original_sns.slice(); // restore original list of sections including recurring
			scheduler.config.buttons_left = original_left_buttons.slice();
			scheduler.config.buttons_right = original_right_buttons.slice();
		}

		var sns = this.config.lightbox.sections;
		if (this.config.readonly_active) {
			for (var i = 0; i < sns.length; i++) {
				if (sns[i].type == 'recurring') {
					if (this.config.readonly_active) {
						sns.splice(i, 1);
					}
					break;
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
				var t = document.createElement("SPAN");
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
				if (!src.className) src = src.previousSibling;
				if (src && src.className)
					switch (src.className) {
						case "dhx_cancel_btn":
							scheduler.callEvent("onEventCancel", [scheduler._lightbox_id]);
							scheduler._edit_stop_event(scheduler.getEvent(scheduler._lightbox_id), false);
							scheduler.hide_lightbox();
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

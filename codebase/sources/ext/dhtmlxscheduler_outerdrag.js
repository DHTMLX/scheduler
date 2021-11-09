/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

// lame old code doesn't provide raw event object
	scheduler.attachEvent("onTemplatesReady", function() {
		var dragger = (new dhtmlDragAndDropObject());
		var old = dragger.stopDrag;
		var last_event;
		dragger.stopDrag = function(e) {
			last_event = e || event;
			return old.apply(this, arguments);
		};

		function on_drop(sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml) {

			if (scheduler.checkEvent("onBeforeExternalDragIn") && !scheduler.callEvent("onBeforeExternalDragIn", [sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml, last_event]))
				return;

			var temp = scheduler.attachEvent("onEventCreated", function (id) {
				if (!scheduler.callEvent("onExternalDragIn", [id, sourceHtmlObject, last_event])) {
					this._drag_mode = this._drag_id = null;
					this.deleteEvent(id);
				}
			});

			var action_data = scheduler.getActionData(last_event);
			var event_data = {
				start_date: new Date(action_data.date)
			};

			// custom views, need to assign section id, fix dates
			if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
				var view_options = scheduler.matrix[scheduler._mode];
				event_data[view_options.y_property] = action_data.section;

				var pos = scheduler._locate_cell_timeline(last_event);
				event_data.start_date = view_options._trace_x[pos.x];
				event_data.end_date = scheduler.date.add(event_data.start_date, view_options.x_step, view_options.x_unit);
			}
			if (scheduler._props && scheduler._props[scheduler._mode]) {
				event_data[scheduler._props[scheduler._mode].map_to] = action_data.section;
			}

			scheduler.addEventNow(event_data);

			scheduler.detachEvent(temp);
		}

		dragger.addDragLanding(scheduler._els["dhx_cal_data"][0], {
			_drag: function(sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml) {
				on_drop(sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml);
			},
			_dragIn: function(htmlObject, shtmlObject) {
				return htmlObject;
			},
			_dragOut: function(htmlObject) {
				return this;
			}
		});

		if(dhtmlx.DragControl) {
			dhtmlx.DragControl.addDrop(scheduler._els["dhx_cal_data"][0], {
				onDrop: function (source, target, d, e) {
					var sourceDhtmlx = dhtmlx.DragControl.getMaster(source);
					last_event = e;
					on_drop(source, sourceDhtmlx, target, e.target || e.srcElement);
				},

				onDragIn: function (source, target, e) {
					return target;
				}
			}, true);
		}
	});


});
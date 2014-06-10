/*
dhtmlxScheduler v.4.1.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady",function(){var e,t=new dhtmlDragAndDropObject,s=t.stopDrag;t.stopDrag=function(t){return e=t||event,s.apply(this,arguments)},t.addDragLanding(scheduler._els.dhx_cal_data[0],{_drag:function(t,s,r,a){if(!scheduler.checkEvent("onBeforeExternalDragIn")||scheduler.callEvent("onBeforeExternalDragIn",[t,s,r,a,e])){var n=scheduler.attachEvent("onEventCreated",function(s){scheduler.callEvent("onExternalDragIn",[s,t,e])||(this._drag_mode=this._drag_id=null,this.deleteEvent(s))
}),i=scheduler.getActionData(e),d={start_date:new Date(i.date)};if(scheduler.matrix&&scheduler.matrix[scheduler._mode]){var l=scheduler.matrix[scheduler._mode];d[l.y_property]=i.section;var o=scheduler._locate_cell_timeline(e);d.start_date=l._trace_x[o.x],d.end_date=scheduler.date.add(d.start_date,l.x_step,l.x_unit)}scheduler._props&&scheduler._props[scheduler._mode]&&(d[scheduler._props[scheduler._mode].map_to]=i.section),scheduler.addEventNow(d),scheduler.detachEvent(n)}},_dragIn:function(e){return e
},_dragOut:function(){return this}})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_outerdrag.js.map
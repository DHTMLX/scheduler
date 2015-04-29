/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady",function(){var e,t=new dhtmlDragAndDropObject,a=t.stopDrag;t.stopDrag=function(t){return e=t||event,a.apply(this,arguments)},t.addDragLanding(scheduler._els.dhx_cal_data[0],{_drag:function(t,a,r,n){if(!scheduler.checkEvent("onBeforeExternalDragIn")||scheduler.callEvent("onBeforeExternalDragIn",[t,a,r,n,e])){var i=scheduler.attachEvent("onEventCreated",function(a){scheduler.callEvent("onExternalDragIn",[a,t,e])||(this._drag_mode=this._drag_id=null,this.deleteEvent(a));

}),d=scheduler.getActionData(e),l={start_date:new Date(d.date)};if(scheduler.matrix&&scheduler.matrix[scheduler._mode]){var s=scheduler.matrix[scheduler._mode];l[s.y_property]=d.section;var o=scheduler._locate_cell_timeline(e);l.start_date=s._trace_x[o.x],l.end_date=scheduler.date.add(l.start_date,s.x_step,s.x_unit)}scheduler._props&&scheduler._props[scheduler._mode]&&(l[scheduler._props[scheduler._mode].map_to]=d.section),scheduler.addEventNow(l),scheduler.detachEvent(i)}},_dragIn:function(e,t){
return e},_dragOut:function(e){return this}})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_outerdrag.js.map
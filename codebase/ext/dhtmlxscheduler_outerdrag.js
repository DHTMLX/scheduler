/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady",function(){function e(e,a,r,i){if(!scheduler.checkEvent("onBeforeExternalDragIn")||scheduler.callEvent("onBeforeExternalDragIn",[e,a,r,i,t])){var n=scheduler.attachEvent("onEventCreated",function(a){scheduler.callEvent("onExternalDragIn",[a,e,t])||(this._drag_mode=this._drag_id=null,this.deleteEvent(a))}),s=scheduler.getActionData(t),d={start_date:new Date(s.date)};if(scheduler.matrix&&scheduler.matrix[scheduler._mode]){var l=scheduler.matrix[scheduler._mode];
d[l.y_property]=s.section;var o=scheduler._locate_cell_timeline(t);d.start_date=l._trace_x[o.x],d.end_date=scheduler.date.add(d.start_date,l.x_step,l.x_unit)}scheduler._props&&scheduler._props[scheduler._mode]&&(d[scheduler._props[scheduler._mode].map_to]=s.section),scheduler.addEventNow(d),scheduler.detachEvent(n)}}var t,a=new dhtmlDragAndDropObject,r=a.stopDrag;a.stopDrag=function(e){return t=e||event,r.apply(this,arguments)},a.addDragLanding(scheduler._els.dhx_cal_data[0],{_drag:function(t,a,r,i){
e(t,a,r,i)},_dragIn:function(e,t){return e},_dragOut:function(e){return this}}),dhtmlx.DragControl&&dhtmlx.DragControl.addDrop(scheduler._els.dhx_cal_data[0],{onDrop:function(a,r,i,n){var s=dhtmlx.DragControl.getMaster(a);t=n,e(a,s,r,n.target||n.srcElement)},onDragIn:function(e,t,a){return t}},!0)});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_outerdrag.js.map
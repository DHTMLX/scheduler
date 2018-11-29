/*
@license
dhtmlxScheduler v.5.1.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady",function(){function e(e,a,r,n){if(!scheduler.checkEvent("onBeforeExternalDragIn")||scheduler.callEvent("onBeforeExternalDragIn",[e,a,r,n,t])){var i=scheduler.attachEvent("onEventCreated",function(a){scheduler.callEvent("onExternalDragIn",[a,e,t])||(this._drag_mode=this._drag_id=null,this.deleteEvent(a))}),d=scheduler.getActionData(t),l={start_date:new Date(d.date)};if(scheduler.matrix&&scheduler.matrix[scheduler._mode]){var s=scheduler.matrix[scheduler._mode];
l[s.y_property]=d.section;var o=scheduler._locate_cell_timeline(t);l.start_date=s._trace_x[o.x],l.end_date=scheduler.date.add(l.start_date,s.x_step,s.x_unit)}scheduler._props&&scheduler._props[scheduler._mode]&&(l[scheduler._props[scheduler._mode].map_to]=d.section),scheduler.addEventNow(l),scheduler.detachEvent(i)}}var t,a=new dhtmlDragAndDropObject,r=a.stopDrag;a.stopDrag=function(e){return t=e||event,r.apply(this,arguments)},a.addDragLanding(scheduler._els.dhx_cal_data[0],{_drag:function(t,a,r,n){
e(t,a,r,n)},_dragIn:function(e,t){return e},_dragOut:function(e){return this}}),dhtmlx.DragControl&&dhtmlx.DragControl.addDrop(scheduler._els.dhx_cal_data[0],{onDrop:function(a,r,n,i){var d=dhtmlx.DragControl.getMaster(a);t=i,e(a,d,r,i.target||i.srcElement)},onDragIn:function(e,t,a){return t}},!0)});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_outerdrag.js.map
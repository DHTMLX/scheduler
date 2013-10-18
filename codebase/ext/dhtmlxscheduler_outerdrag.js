/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in non-GPL project. Please contact sales@dhtmlx.com for details
*/
scheduler.attachEvent("onTemplatesReady",function(){var c=new dhtmlDragAndDropObject,f=c.stopDrag,d;c.stopDrag=function(b){d=b||event;return f.apply(this,arguments)};c.addDragLanding(scheduler._els.dhx_cal_data[0],{_drag:function(b,c,f,h){if(!scheduler.checkEvent("onBeforeExternalDragIn")||scheduler.callEvent("onBeforeExternalDragIn",[b,c,f,h,d])){var i=scheduler.attachEvent("onEventCreated",function(a){if(!scheduler.callEvent("onExternalDragIn",[a,b,d]))this._drag_mode=this._drag_id=null,this.deleteEvent(a)}),
g=scheduler.getActionData(d),a={start_date:new Date(g.date)};if(scheduler.matrix&&scheduler.matrix[scheduler._mode]){var e=scheduler.matrix[scheduler._mode];a[e.y_property]=g.section;var j=scheduler._locate_cell_timeline(d);a.start_date=e._trace_x[j.x];a.end_date=scheduler.date.add(a.start_date,e.x_step,e.x_unit)}if(scheduler._props&&scheduler._props[scheduler._mode])a[scheduler._props[scheduler._mode].map_to]=g.section;scheduler.addEventNow(a);scheduler.detachEvent(i)}},_dragIn:function(b){return b},
_dragOut:function(){return this}})});

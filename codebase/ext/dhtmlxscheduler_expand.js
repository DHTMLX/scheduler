/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.expand=function(){if(scheduler.callEvent("onBeforeExpand",[])){var e=scheduler._obj;do e._position=e.style.position||"",e.style.position="static";while((e=e.parentNode)&&e.style);e=scheduler._obj,e.style.position="absolute",e._width=e.style.width,e._height=e.style.height,e.style.width=e.style.height="100%",e.style.top=e.style.left="0px";var t=document.body;t.scrollTop=0,t=t.parentNode,t&&(t.scrollTop=0),document.body._overflow=document.body.style.overflow||"",document.body.style.overflow="hidden",
scheduler._maximize(),scheduler.callEvent("onExpand",[])}},scheduler.collapse=function(){if(scheduler.callEvent("onBeforeCollapse",[])){var e=scheduler._obj;do e.style.position=e._position;while((e=e.parentNode)&&e.style);e=scheduler._obj,e.style.width=e._width,e.style.height=e._height,document.body.style.overflow=document.body._overflow,scheduler._maximize(),scheduler.callEvent("onCollapse",[])}},scheduler.attachEvent("onTemplatesReady",function(){var e=document.createElement("DIV");e.className="dhx_expand_icon",
scheduler.toggleIcon=e,scheduler._obj.appendChild(e),e.onclick=function(){scheduler.expanded?scheduler.collapse():scheduler.expand()}}),scheduler._maximize=function(){this.expanded=!this.expanded,this.toggleIcon.style.backgroundPosition="0 "+(this.expanded?"0":"18")+"px";for(var e=["left","top"],t=0;t<e.length;t++){var a=(scheduler.xy["margin_"+e[t]],scheduler["_prev_margin_"+e[t]]);scheduler.xy["margin_"+e[t]]?(scheduler["_prev_margin_"+e[t]]=scheduler.xy["margin_"+e[t]],scheduler.xy["margin_"+e[t]]=0):a&&(scheduler.xy["margin_"+e[t]]=scheduler["_prev_margin_"+e[t]],
delete scheduler["_prev_margin_"+e[t]])}scheduler.callEvent("onSchedulerResize",[])&&(scheduler.update_view(),scheduler.callEvent("onAfterSchedulerResize"))};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_expand.js.map
/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){scheduler.config.container_autoresize=!0,scheduler.config.month_day_min_height=90;var e=scheduler._pre_render_events,t=!0;scheduler._pre_render_events=function(a,i){if(!scheduler.config.container_autoresize||!t)return e.apply(this,arguments);var n=this.xy.bar_height,l=this._colsS.heights,r=this._colsS.heights=[0,0,0,0,0,0,0],d=this._els.dhx_cal_data[0];if(a=this._table_view?this._pre_render_events_table(a,i):this._pre_render_events_line(a,i),this._table_view)if(i)this._colsS.heights=l;
else{var o=d.firstChild;if(o.rows){for(var s=0;s<o.rows.length;s++){if(r[s]++,r[s]*n>this._colsS.height-this.xy.month_head_height){var _=o.rows[s].cells,c=this._colsS.height-this.xy.month_head_height;1*this.config.max_month_events!==this.config.max_month_events||r[s]<=this.config.max_month_events?c=r[s]*n:(this.config.max_month_events+1)*n>this._colsS.height-this.xy.month_head_height&&(c=(this.config.max_month_events+1)*n);for(var u=0;u<_.length;u++)_[u].childNodes[1].style.height=c+"px";r[s]=(r[s-1]||0)+_[0].offsetHeight;

}r[s]=(r[s-1]||0)+o.rows[s].cells[0].offsetHeight}r.unshift(0),o.parentNode.offsetHeight<o.parentNode.scrollHeight&&!o._h_fix}else if(a.length||"visible"!=this._els.dhx_multi_day[0].style.visibility||(r[0]=-1),a.length||-1==r[0]){var h=(o.parentNode.childNodes,(r[0]+1)*n+1+"px");d.style.top=this._els.dhx_cal_navline[0].offsetHeight+this._els.dhx_cal_header[0].offsetHeight+parseInt(h,10)+"px",d.style.height=this._obj.offsetHeight-parseInt(d.style.top,10)-(this.xy.margin_top||0)+"px";var p=this._els.dhx_multi_day[0];

p.style.height=h,p.style.visibility=-1==r[0]?"hidden":"visible",p=this._els.dhx_multi_day[1],p.style.height=h,p.style.visibility=-1==r[0]?"hidden":"visible",p.className=r[0]?"dhx_multi_day_icon":"dhx_multi_day_icon_small",this._dy_shift=(r[0]+1)*n,r[0]=0}}return a};var a=["dhx_cal_navline","dhx_cal_header","dhx_multi_day","dhx_cal_data"],i=function(e){for(var t=0,i=0;i<a.length;i++){var n=a[i],l=scheduler._els[n]?scheduler._els[n][0]:null,r=0;switch(n){case"dhx_cal_navline":case"dhx_cal_header":r=parseInt(l.style.height,10);

break;case"dhx_multi_day":r=l?l.offsetHeight:0,1==r&&(r=0);break;case"dhx_cal_data":var d=scheduler.getState().mode;if(r=l.childNodes[1]&&"month"!=d?l.childNodes[1].offsetHeight:Math.max(l.offsetHeight-1,l.scrollHeight),"month"==d){if(scheduler.config.month_day_min_height&&!e){var o=l.getElementsByTagName("tr").length;r=o*scheduler.config.month_day_min_height}e&&(l.style.height=r+"px")}if(scheduler.matrix&&scheduler.matrix[d])if(e)r+=2,l.style.height=r+"px";else{r=2;for(var s=scheduler.matrix[d],_=s.y_unit,c=0;c<_.length;c++)r+=_[c].children?s.folder_dy||s.dy:s.dy;

}("day"==d||"week"==d)&&(r+=2)}t+=r}scheduler._obj.style.height=t+"px",e||scheduler.updateView()},n=function(){if(!scheduler.config.container_autoresize||!t)return!0;var e=scheduler.getState().mode;i(),(scheduler.matrix&&scheduler.matrix[e]||"month"==e)&&window.setTimeout(function(){i(!0)},1)};scheduler.attachEvent("onViewChange",n),scheduler.attachEvent("onXLE",n),scheduler.attachEvent("onEventChanged",n),scheduler.attachEvent("onEventCreated",n),scheduler.attachEvent("onEventAdded",n),scheduler.attachEvent("onEventDeleted",n),
scheduler.attachEvent("onAfterSchedulerResize",n),scheduler.attachEvent("onClearAll",n),scheduler.attachEvent("onBeforeExpand",function(){return t=!1,!0}),scheduler.attachEvent("onBeforeCollapse",function(){return t=!0,!0})}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_container_autoresize.js.map
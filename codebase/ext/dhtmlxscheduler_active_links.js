/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(t){t.config.active_link_view="day",t._active_link_click=function(e){var i=e.target||event.srcElement,n=i.getAttribute("jump_to"),a=t.date.str_to_date(t.config.api_date);if(n)return t.setCurrentView(a(n),t.config.active_link_view),e&&e.preventDefault&&e.preventDefault(),!1},t.attachEvent("onTemplatesReady",function(){var e=function(e,i){i=i||e+"_scale_date",t.templates["_active_links_old_"+i]||(t.templates["_active_links_old_"+i]=t.templates[i])
;var n=t.templates["_active_links_old_"+i],a=t.date.date_to_str(t.config.api_date);t.templates[i]=function(t){return"<a jump_to='"+a(t)+"' href='#'>"+n(t)+"</a>"}};if(e("week"),e("","month_day"),this.matrix)for(var i in this.matrix)e(i);this._detachDomEvent(this._obj,"click",t._active_link_click),t.event(this._obj,"click",t._active_link_click)})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_active_links.js.map
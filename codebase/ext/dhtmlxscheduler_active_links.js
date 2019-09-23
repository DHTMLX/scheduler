/*

@license
dhtmlxScheduler v.5.2.5 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){e.config.active_link_view="day",e._active_link_click=function(t){var i=t.target||event.srcElement,n=i.getAttribute("jump_to"),_=e.date.str_to_date(e.config.api_date);if(n)return e.setCurrentView(_(n),e.config.active_link_view),t&&t.preventDefault&&t.preventDefault(),!1},e.attachEvent("onTemplatesReady",function(){var t=function(t,i){i=i||t+"_scale_date",e.templates["_active_links_old_"+i]||(e.templates["_active_links_old_"+i]=e.templates[i])
;var n=e.templates["_active_links_old_"+i],_=e.date.date_to_str(e.config.api_date);e.templates[i]=function(e){return"<a jump_to='"+_(e)+"' href='#'>"+n(e)+"</a>"}};if(t("week"),t("","month_day"),this.matrix)for(var i in this.matrix)t(i);this._detachDomEvent(this._obj,"click",e._active_link_click),e.event(this._obj,"click",e._active_link_click)})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_active_links.js.map
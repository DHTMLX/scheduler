/*
@license

dhtmlxScheduler v.5.2.2 Stardard
This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.

*/
Scheduler.plugin(function(t){t.config.active_link_view="day",t._active_link_click=function(e){var i=e.target||event.srcElement,n=i.getAttribute("jump_to"),a=t.date.str_to_date(t.config.api_date);if(n)return t.setCurrentView(a(n),t.config.active_link_view),e&&e.preventDefault&&e.preventDefault(),!1},t.attachEvent("onTemplatesReady",function(){var e=function(e,i){i=i||e+"_scale_date",t.templates["_active_links_old_"+i]||(t.templates["_active_links_old_"+i]=t.templates[i])
;var n=t.templates["_active_links_old_"+i],a=t.date.date_to_str(t.config.api_date);t.templates[i]=function(t){return"<a jump_to='"+a(t)+"' href='#'>"+n(t)+"</a>"}};if(e("week"),e("","month_day"),this.matrix)for(var i in this.matrix)e(i);this._detachDomEvent(this._obj,"click",t._active_link_click),dhtmlxEvent(this._obj,"click",t._active_link_click)})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_active_links.js.map
/*

@license
dhtmlxScheduler v.5.2.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){function t(t,a){for(var i=e.$ajax.xpath("//data/item",t.xmlDoc),n={},r=0;r<i.length;r++)n[i[r].getAttribute(a.map_to)]=!0;return n}function a(e,t){try{for(var a=JSON.parse(e.xmlDoc.responseText),i={},n=0;n<a.length;n++){var r=a[n];i[r.value||r.key||r.id]=!0}return i}catch(e){return null}}e.form_blocks.multiselect={render:function(e){var t="dhx_multi_select_control dhx_multi_select_"+e.name;e.vertical&&(t+=" dhx_multi_select_control_vertical")
;for(var a="<div class='"+t+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",i=0;i<e.options.length;i++)a+="<label><input type='checkbox' value='"+e.options[i].key+"'/>"+e.options[i].label+"</label>",e.vertical&&(a+="<br/>");return a+="</div>"},set_value:function(i,n,r,o){function d(e){for(var t=i.getElementsByTagName("input"),a=0;a<t.length;a++)t[a].checked=!!e[t[a].value]}for(var l=i.getElementsByTagName("input"),s=0;s<l.length;s++)l[s].checked=!1;var _={}
;if(r[o.map_to]){for(var c=(r[o.map_to]+"").split(o.delimiter||e.config.section_delimiter||","),s=0;s<c.length;s++)_[c[s]]=!0;d(_)}else{if(e._new_event||!o.script_url)return;var u=document.createElement("div");u.className="dhx_loading",u.style.cssText="position: absolute; top: 40%; left: 40%;",i.appendChild(u);var h=[o.script_url,-1==o.script_url.indexOf("?")?"?":"&","dhx_crosslink_"+o.map_to+"="+r.id+"&uid="+e.uid()].join("");e.$ajax.get(h,function(e){var n=a(e,o);n||(n=t(e,o)),d(n),
i.removeChild(u)})}},get_value:function(t,a,i){for(var n=[],r=t.getElementsByTagName("input"),o=0;o<r.length;o++)r[o].checked&&n.push(r[o].value);return n.join(i.delimiter||e.config.section_delimiter||",")},focus:function(e){}}});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multiselect.js.map
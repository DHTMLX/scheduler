/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){function t(t,a){for(var n=e.$ajax.xpath("//data/item",t.xmlDoc),i={},r=0;r<n.length;r++)i[n[r].getAttribute(a.map_to)]=!0;return i}function a(e,t){try{for(var a=JSON.parse(e.xmlDoc.responseText),n={},i=0;i<a.length;i++){var r=a[i];n[r.value||r.key||r.id]=!0}return n}catch(e){return null}}e.form_blocks.multiselect={render:function(e){var t="dhx_multi_select_control dhx_multi_select_"+e.name;e.vertical&&(t+=" dhx_multi_select_control_vertical")
;for(var a="<div class='"+t+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",n=0;n<e.options.length;n++)a+="<label><input type='checkbox' value='"+e.options[n].key+"'/>"+e.options[n].label+"</label>",e.vertical&&(a+="<br/>");return a+="</div>"},set_value:function(n,i,r,o){function d(e){for(var t=n.getElementsByTagName("input"),a=0;a<t.length;a++)t[a].checked=!!e[t[a].value]}for(var s=n.getElementsByTagName("input"),_=0;_<s.length;_++)s[_].checked=!1;var l={}
;if(r[o.map_to]){for(var c=(r[o.map_to]+"").split(o.delimiter||e.config.section_delimiter||","),_=0;_<c.length;_++)l[c[_]]=!0;d(l)}else{if(e._new_event||!o.script_url)return;var h=document.createElement("div");h.className="dhx_loading",h.style.cssText="position: absolute; top: 40%; left: 40%;",n.appendChild(h);var u=[o.script_url,-1==o.script_url.indexOf("?")?"?":"&","dhx_crosslink_"+o.map_to+"="+r.id+"&uid="+e.uid()].join("");e.$ajax.get(u,function(e){var i=a(e,o);i||(i=t(e,o)),d(i),
n.removeChild(h)})}},get_value:function(t,a,n){for(var i=[],r=t.getElementsByTagName("input"),o=0;o<r.length;o++)r[o].checked&&i.push(r[o].value);return i.join(n.delimiter||e.config.section_delimiter||",")},focus:function(e){}}});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multiselect.js.map
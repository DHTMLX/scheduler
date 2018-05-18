/*
@license
dhtmlxScheduler v.5.0.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.form_blocks.multiselect={render:function(e){var t="dhx_multi_select_control dhx_multi_select_"+e.name;convertStringToBoolean(e.vertical)&&(t+=" dhx_multi_select_control_vertical");for(var a="<div class='"+t+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",r=0;r<e.options.length;r++)a+="<label><input type='checkbox' value='"+e.options[r].key+"'/>"+e.options[r].label+"</label>",convertStringToBoolean(e.vertical)&&(a+="<br/>");return a+="</div>"},set_value:function(e,t,a,r){
function i(t){for(var a=e.getElementsByTagName("input"),r=0;r<a.length;r++)a[r].checked=!!t[a[r].value]}for(var n=e.getElementsByTagName("input"),s=0;s<n.length;s++)n[s].checked=!1;var d={};if(a[r.map_to]){for(var l=(a[r.map_to]+"").split(r.delimiter||scheduler.config.section_delimiter||","),s=0;s<l.length;s++)d[l[s]]=!0;i(d)}else{if(scheduler._new_event||!r.script_url)return;var o=document.createElement("div");o.className="dhx_loading",o.style.cssText="position: absolute; top: 40%; left: 40%;",e.appendChild(o);
var c=[r.script_url,-1==r.script_url.indexOf("?")?"?":"&","dhx_crosslink_"+r.map_to+"="+a.id+"&uid="+scheduler.uid()].join("");scheduler.$ajax.get(c,function(t){for(var a=scheduler.$ajax.xpath("//data/item",t.xmlDoc),n={},s=0;s<a.length;s++)n[a[s].getAttribute(r.map_to)]=!0;i(n),e.removeChild(o)})}},get_value:function(e,t,a){for(var r=[],i=e.getElementsByTagName("input"),n=0;n<i.length;n++)i[n].checked&&r.push(i[n].value);return r.join(a.delimiter||scheduler.config.section_delimiter||",")},focus:function(e){}
};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multiselect.js.map
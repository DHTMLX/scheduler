/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.form_blocks.multiselect={render:function(e){for(var t="<div class='dhx_multi_select_"+e.name+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",a=0;a<e.options.length;a++)t+="<label><input type='checkbox' value='"+e.options[a].key+"'/>"+e.options[a].label+"</label>",convertStringToBoolean(e.vertical)&&(t+="<br/>");return t+="</div>"},set_value:function(e,t,a,r){function n(t){for(var a=e.getElementsByTagName("input"),r=0;r<a.length;r++)a[r].checked=!!t[a[r].value]}
for(var i=e.getElementsByTagName("input"),d=0;d<i.length;d++)i[d].checked=!1;var l={};if(a[r.map_to]){for(var s=(a[r.map_to]+"").split(","),d=0;d<s.length;d++)l[s[d]]=!0;n(l)}else{if(scheduler._new_event||!r.script_url)return;var o=document.createElement("div");o.className="dhx_loading",o.style.cssText="position: absolute; top: 40%; left: 40%;",e.appendChild(o),dhtmlxAjax.get(r.script_url+"?dhx_crosslink_"+r.map_to+"="+a.id+"&uid="+scheduler.uid(),function(t){for(var a=t.doXPath("//data/item"),i={},d=0;d<a.length;d++)i[a[d].getAttribute(r.map_to)]=!0;

n(i),e.removeChild(o)})}},get_value:function(e,t,a){for(var r=[],n=e.getElementsByTagName("input"),i=0;i<n.length;i++)n[i].checked&&r.push(n[i].value);return r.join(",")},focus:function(e){}};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multiselect.js.map
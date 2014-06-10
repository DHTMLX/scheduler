/*
dhtmlxScheduler v.4.1.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.form_blocks.multiselect={render:function(e){for(var t="<div class='dhx_multi_select_"+e.name+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",s=0;s<e.options.length;s++)t+="<label><input type='checkbox' value='"+e.options[s].key+"'/>"+e.options[s].label+"</label>",convertStringToBoolean(e.vertical)&&(t+="<br/>");return t+="</div>"},set_value:function(e,t,s,r){function a(t){for(var s=e.getElementsByTagName("input"),r=0;r<s.length;r++)s[r].checked=!!t[s[r].value]}for(var i=e.getElementsByTagName("input"),n=0;n<i.length;n++)i[n].checked=!1;
var d=[];if(s[r.map_to]){for(var l=(s[r.map_to]+"").split(","),n=0;n<l.length;n++)d[l[n]]=!0;a(d)}else{if(scheduler._new_event||!r.script_url)return;var o=document.createElement("div");o.className="dhx_loading",o.style.cssText="position: absolute; top: 40%; left: 40%;",e.appendChild(o),dhtmlxAjax.get(r.script_url+"?dhx_crosslink_"+r.map_to+"="+s.id+"&uid="+scheduler.uid(),function(t){for(var s=t.doXPath("//data/item"),i=[],n=0;n<s.length;n++)i[s[n].getAttribute(r.map_to)]=!0;a(i),e.removeChild(o)
})}},get_value:function(e){for(var t=[],s=e.getElementsByTagName("input"),r=0;r<s.length;r++)s[r].checked&&t.push(s[r].value);return t.join(",")},focus:function(){}};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multiselect.js.map
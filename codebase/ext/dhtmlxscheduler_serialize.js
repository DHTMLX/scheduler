/*
@license
dhtmlxScheduler v.5.0.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._get_serializable_data=function(){var e={};for(var t in this._events){var a=this._events[t];-1==a.id.toString().indexOf("#")&&(e[a.id]=a)}return e},scheduler.data_attributes=function(){var e=[],t=scheduler.templates.xml_format,a=this._get_serializable_data();for(var r in a){var n=a[r];for(var i in n)"_"!=i.substr(0,1)&&e.push([i,"start_date"==i||"end_date"==i?t:null]);break}return e},scheduler.toXML=function(e){var t=[],a=this.data_attributes(),r=this._get_serializable_data();for(var n in r){
var i=r[n];t.push("<event>");for(var s=0;s<a.length;s++)t.push("<"+a[s][0]+"><![CDATA["+(a[s][1]?a[s][1](i[a[s][0]]):i[a[s][0]])+"]]></"+a[s][0]+">");t.push("</event>")}return(e||"")+"<data>"+t.join("\n")+"</data>"},scheduler._serialize_json_value=function(e){return null===e||"boolean"==typeof e?e=""+e:(e||0===e||(e=""),e='"'+e.toString().replace(/\n/g,"").replace(/\\/g,"\\\\").replace(/\"/g,'\\"')+'"'),e},scheduler.toJSON=function(){var e=[],t="",a=this.data_attributes(),r=this._get_serializable_data();
for(var n in r){for(var i=r[n],s=[],d=0;d<a.length;d++)t=a[d][1]?a[d][1](i[a[d][0]]):i[a[d][0]],s.push(' "'+a[d][0]+'": '+this._serialize_json_value(t));e.push("{"+s.join(",")+"}")}return"["+e.join(",\n")+"]"},scheduler.toICal=function(e){var t="BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//dhtmlXScheduler//NONSGML v2.2//EN\nDESCRIPTION:",a="END:VCALENDAR",r=scheduler.date.date_to_str("%Y%m%dT%H%i%s"),n=scheduler.date.date_to_str("%Y%m%d"),i=[],s=this._get_serializable_data();for(var d in s){var l=s[d];
i.push("BEGIN:VEVENT"),l._timed&&(l.start_date.getHours()||l.start_date.getMinutes())?i.push("DTSTART:"+r(l.start_date)):i.push("DTSTART:"+n(l.start_date)),l._timed&&(l.end_date.getHours()||l.end_date.getMinutes())?i.push("DTEND:"+r(l.end_date)):i.push("DTEND:"+n(l.end_date)),i.push("SUMMARY:"+l.text),i.push("END:VEVENT")}return t+(e||"")+"\n"+i.join("\n")+"\n"+a};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_serialize.js.map
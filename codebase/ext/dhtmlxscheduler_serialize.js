/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._get_serializable_data=function(){var e={};for(var t in this._events){var a=this._events[t];-1==a.id.toString().indexOf("#")&&(e[a.id]=a)}return e},scheduler.data_attributes=function(){var e=[],t=scheduler.templates.xml_format,a=this._get_serializable_data();for(var r in a){var n=a[r];for(var i in n)"_"!=i.substr(0,1)&&e.push([i,"start_date"==i||"end_date"==i?t:null]);break}return e},scheduler.toXML=function(e){var t=[],a=this.data_attributes(),r=this._get_serializable_data();for(var n in r){
var i=r[n];t.push("<event>");for(var l=0;l<a.length;l++)t.push("<"+a[l][0]+"><![CDATA["+(a[l][1]?a[l][1](i[a[l][0]]):i[a[l][0]])+"]]></"+a[l][0]+">");t.push("</event>")}return(e||"")+"<data>"+t.join("\n")+"</data>"},scheduler._serialize_json_value=function(e){return null===e||"boolean"==typeof e?e=""+e:(e||0===e||(e=""),e='"'+e.toString().replace(/\n/g,"").replace(/\\/g,"\\\\").replace(/\"/g,'\\"')+'"'),e},scheduler.toJSON=function(){var e=[],t="",a=this.data_attributes(),r=this._get_serializable_data();

for(var n in r){for(var i=r[n],l=[],d=0;d<a.length;d++)t=a[d][1]?a[d][1](i[a[d][0]]):i[a[d][0]],l.push(' "'+a[d][0]+'": '+this._serialize_json_value(t));e.push("{"+l.join(",")+"}")}return"["+e.join(",\n")+"]"},scheduler.toICal=function(e){var t="BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//dhtmlXScheduler//NONSGML v2.2//EN\nDESCRIPTION:",a="END:VCALENDAR",r=scheduler.date.date_to_str("%Y%m%dT%H%i%s"),n=scheduler.date.date_to_str("%Y%m%d"),i=[],l=this._get_serializable_data();for(var d in l){var s=l[d];

i.push("BEGIN:VEVENT"),i.push(s._timed&&(s.start_date.getHours()||s.start_date.getMinutes())?"DTSTART:"+r(s.start_date):"DTSTART:"+n(s.start_date)),i.push(s._timed&&(s.end_date.getHours()||s.end_date.getMinutes())?"DTEND:"+r(s.end_date):"DTEND:"+n(s.end_date)),i.push("SUMMARY:"+s.text),i.push("END:VEVENT")}return t+(e||"")+"\n"+i.join("\n")+"\n"+a};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_serialize.js.map
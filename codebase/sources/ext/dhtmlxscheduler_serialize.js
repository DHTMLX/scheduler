/*
@license
dhtmlxScheduler v.5.0.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._get_serializable_data = function(){
	var res = {};
	for (var a in this._events){
		var ev = this._events[a];
		if (ev.id.toString().indexOf("#") == -1){
			res[ev.id] = ev;
		}
	}
	return res;
};

//redefine this method, if you want to provide a custom set of attributes for serialization
scheduler.data_attributes=function(){
	var attrs = [];
	var format = scheduler.templates.xml_format;
	var all_events = this._get_serializable_data();
	for (var a in all_events){
		var ev = all_events[a];
		for (var name in ev)
			if (name.substr(0,1) !="_")
				attrs.push([name,((name == "start_date" || name == "end_date")?format:null)]);
		break;
	}
	return attrs;
};

scheduler.toXML = function(header){
	var xml = [];
	var attrs = this.data_attributes();

	var all_events = this._get_serializable_data();
	for (var a in all_events){
		var ev = all_events[a];

		xml.push("<event>");	
		for (var i=0; i < attrs.length; i++)
			xml.push("<"+attrs[i][0]+"><![CDATA["+(attrs[i][1]?attrs[i][1](ev[attrs[i][0]]):ev[attrs[i][0]])+"]]></"+attrs[i][0]+">");
			
		xml.push("</event>");
	}
	return (header||"")+"<data>"+xml.join("\n")+"</data>";
};

scheduler._serialize_json_value = function(value){
	if(value === null || typeof value === "boolean"){
		value = "" + value;
	}else{
		if(!value && value !== 0){
			value = "";
		}
		value = '"' + value.toString().
			replace(/\n/g,"").
			replace(/\\/g,"\\\\").
			replace(/\"/g, '\\"') + '"';
	}
	return value;
};

scheduler.toJSON = function(){
	var json = [], value = "";
	var attrs = this.data_attributes();
	var all_events = this._get_serializable_data();
	for (var a in all_events){
		var ev = all_events[a];

		var line =[];	
		for (var i=0; i < attrs.length; i++){
			value = (attrs[i][1]) ? attrs[i][1](ev[attrs[i][0]]) : ev[attrs[i][0]];

			line.push(' "'+attrs[i][0]+'": '+ this._serialize_json_value(value));
		}
		json.push("{"+line.join(",")+"}");
	}
	return "["+json.join(",\n")+"]";
};


scheduler.toICal = function(header){
	var start = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//dhtmlXScheduler//NONSGML v2.2//EN\nDESCRIPTION:";
	var end = "END:VCALENDAR";
	var format = scheduler.date.date_to_str("%Y%m%dT%H%i%s");
	var full_day_format = scheduler.date.date_to_str("%Y%m%d");
		
	var ical = [];
	var all_events = this._get_serializable_data();
	for (var a in all_events){
		var ev = all_events[a];
		
		
		ical.push("BEGIN:VEVENT");	
		if (!ev._timed || (!ev.start_date.getHours() && !ev.start_date.getMinutes()))
			ical.push("DTSTART:"+full_day_format(ev.start_date));	
		else
			ical.push("DTSTART:"+format(ev.start_date));
		if (!ev._timed || (!ev.end_date.getHours() && !ev.end_date.getMinutes()))
			ical.push("DTEND:"+full_day_format(ev.end_date));	
		else
			ical.push("DTEND:"+format(ev.end_date));
		ical.push("SUMMARY:"+ev.text);	
		ical.push("END:VEVENT");
	}
	return start+(header||"")+"\n"+ical.join("\n")+"\n"+end;
};
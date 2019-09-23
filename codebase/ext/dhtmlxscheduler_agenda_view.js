/*

@license
dhtmlxScheduler v.5.2.5 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){e.date.add_agenda=function(t){return e.date.add(t,1,"year")},e.templates.agenda_time=function(t,i,a){return a._timed?this.day_date(a.start_date,a.end_date,a)+" "+this.event_date(t):e.templates.day_date(t)+" &ndash; "+e.templates.day_date(i)},e.templates.agenda_text=function(e,t,i){return i.text},e.templates.agenda_date=function(){return""},e.date.agenda_start=function(){return e.date.date_part(e._currentDate())},e.attachEvent("onTemplatesReady",function(){
function t(t){if(t){var i=e.locale.labels,a=e._waiAria.agendaHeadAttrString(),n=e._waiAria.agendaHeadDateString(i.date),r=e._waiAria.agendaHeadDescriptionString(i.description);e._els.dhx_cal_header[0].innerHTML="<div "+a+" class='dhx_agenda_line'><div "+n+">"+i.date+"</div><span style='padding-left:25px' "+r+">"+i.description+"</span></div>",e._table_view=!0,e.set_sizes()}}function i(){var t=(e._date,e.get_visible_events());t.sort(function(e,t){return e.start_date>t.start_date?1:-1})
;for(var i,a=e._waiAria.agendaDataAttrString(),n="<div class='dhx_agenda_area' "+a+">",r=0;r<t.length;r++){var s=t[r],o=s.color?"background:"+s.color+";":"",d=s.textColor?"color:"+s.textColor+";":"",_=e.templates.event_class(s.start_date,s.end_date,s);i=e._waiAria.agendaEventAttrString(s);var l=e._waiAria.agendaDetailsBtnString()
;n+="<div "+i+" class='dhx_agenda_line"+(_?" "+_:"")+"' event_id='"+s.id+"' style='"+d+o+(s._text_style||"")+"'><div class='dhx_agenda_event_time'>"+e.templates.agenda_time(s.start_date,s.end_date,s)+"</div>",n+="<div "+l+" class='dhx_event_icon icon_details'>&nbsp;</div>",n+="<span>"+e.templates.agenda_text(s.start_date,s.end_date,s)+"</span></div>"}n+="<div class='dhx_v_border'></div></div>",e._els.dhx_cal_data[0].innerHTML=n,e._els.dhx_cal_data[0].childNodes[0].scrollTop=e._agendaScrollTop||0
;var h=e._els.dhx_cal_data[0].childNodes[0];h.childNodes[h.childNodes.length-1].style.height=h.offsetHeight<e._els.dhx_cal_data[0].offsetHeight?"100%":h.offsetHeight+"px";var c=e._els.dhx_cal_data[0].firstChild.childNodes;e._els.dhx_cal_date[0].innerHTML=e.templates.agenda_date(e._min_date,e._max_date,e._mode),e._rendered=[];for(var r=0;r<c.length-1;r++)e._rendered[r]=c[r]}var a=e.dblclick_dhx_cal_data;e.dblclick_dhx_cal_data=function(){
if("agenda"==this._mode)!this.config.readonly&&this.config.dblclick_create&&this.addEventNow();else if(a)return a.apply(this,arguments)};var n=e.render_data;e.render_data=function(e){if("agenda"!=this._mode)return n.apply(this,arguments);i()};var r=e.render_view_data;e.render_view_data=function(){return"agenda"==this._mode&&(e._agendaScrollTop=e._els.dhx_cal_data[0].childNodes[0].scrollTop,e._els.dhx_cal_data[0].childNodes[0].scrollTop=0),r.apply(this,arguments)},e.agenda_view=function(a){
e._min_date=e.config.agenda_start||e.date.agenda_start(e._date),e._max_date=e.config.agenda_end||e.date.add_agenda(e._min_date,1),t(a),a?(e._cols=null,e._colsS=null,e._table_view=!0,i()):e._table_view=!1}})});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_agenda_view.js.map
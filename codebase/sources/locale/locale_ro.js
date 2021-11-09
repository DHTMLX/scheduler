/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){/*
	Traducere de Ovidiu Lixandru: http://www.madball.ro
 */

scheduler.locale = {
	date:{
		month_full:["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "November", "December"],
		month_short:["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		day_full:["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"],
		day_short:["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"]
	},
	labels:{
		dhx_cal_today_button:"Astazi",
		day_tab:"Zi",
		week_tab:"Saptamana",
		month_tab:"Luna",
		new_event:"Eveniment nou",
		icon_save:"Salveaza",
		icon_cancel:"Anuleaza",
		icon_details:"Detalii",
		icon_edit:"Editeaza",
		icon_delete:"Sterge",
		confirm_closing:"Schimbarile nu vor fi salvate, esti sigur?",//Your changes will be lost, are your sure ?
		confirm_deleting:"Evenimentul va fi sters permanent, esti sigur?",
		section_description:"Descriere",
		section_time:"Interval",
		full_day:"Toata ziua",

		/*recurring events*/
		confirm_recurring:"Vrei sa editezi toata seria de evenimente repetate?",
		section_recurring:"Repetare",
		button_recurring:"Dezactivata",
		button_recurring_open:"Activata",
		button_edit_series: "Editeaza serie",
		button_edit_occurrence: "Editeaza doar intrare",

		/*agenda view extension*/
		agenda_tab:"Agenda",
		date:"Data",
		description:"Descriere",

		/*year view extension*/
		year_tab:"An",

		/* week agenda extension */
		week_agenda_tab: "Agenda",

		/*grid view extension*/
		grid_tab: "Lista",

		/* touch tooltip*/
		drag_to_create:"Drag to create",
		drag_to_move:"Drag to move",

		/* dhtmlx message default buttons */
		message_ok:"OK",
		message_cancel:"Cancel",

		/* wai aria labels for non-text controls */
		next: "Next",
		prev: "Previous",
		year: "Year",
		month: "Month",
		day: "Day",
		hour:"Hour",
		minute: "Minute",

		/* recurring event components */
		repeat_radio_day: "Zilnic",
		repeat_radio_week: "Saptamanal",
		repeat_radio_month: "Lunar",
		repeat_radio_year: "Anual",
		repeat_radio_day_type: "La fiecare",
		repeat_text_day_count: "zi(le)",
		repeat_radio_day_type2: "Fiecare zi lucratoare",
		repeat_week: " Repeta la fiecare",
		repeat_text_week_count: "saptamana in urmatoarele zile:",
		repeat_radio_month_type: "Repeta in",
		repeat_radio_month_start: "In a",
		repeat_text_month_day: "zi la fiecare",
		repeat_text_month_count: "luni",
		repeat_text_month_count2_before: "la fiecare",
		repeat_text_month_count2_after: "luni",
		repeat_year_label: "In",
		select_year_day2: "a lunii",
		repeat_text_year_day: "zi a lunii",
		select_year_month: "",
		repeat_radio_end: "Fara data de sfarsit",
		repeat_text_occurences_count: "evenimente",
		repeat_radio_end3: "La data",
		repeat_radio_end2: "Dupa",
		month_for_recurring: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
		day_for_recurring: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"]
	}
};

});
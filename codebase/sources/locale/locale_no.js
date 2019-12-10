/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){scheduler.locale = {
	date: {
		month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
		month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
		day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
		day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"]
	},
	labels: {
		dhx_cal_today_button: "Idag",
		day_tab: "Dag",
		week_tab: "Uke",
		month_tab: "Måned",
		new_event: "Ny",
		icon_save: "Lagre",
		icon_cancel: "Avbryt",
		icon_details: "Detaljer",
		icon_edit: "Endre",
		icon_delete: "Slett",
		confirm_closing: "Endringer blir ikke lagret, er du sikker?", //Endringer blir ikke lagret, er du sikker?
		confirm_deleting: "Oppføringen vil bli slettet, er du sikker?",
		section_description: "Beskrivelse",
		section_time: "Tidsperiode",
		full_day: "Full dag",

		/*recurring events*/
		confirm_recurring: "Vil du endre hele settet med repeterende oppføringer?",
		section_recurring: "Repeterende oppføring",
		button_recurring: "Ikke aktiv",
		button_recurring_open: "Aktiv",
		button_edit_series: "Rediger serien",
		button_edit_occurrence: "Redigere en kopi",

		/*agenda view extension*/
		agenda_tab: "Agenda",
		date: "Dato",
		description: "Beskrivelse",

		/*year view extension*/
		year_tab: "År",

		/*week agenda view extension*/
		week_agenda_tab: "Agenda",

		/*grid view extension*/
		grid_tab: "Grid",

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
		minute: "Minute"
	}
};

});
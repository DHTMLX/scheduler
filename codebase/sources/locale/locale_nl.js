/*

@license
dhtmlxScheduler v.5.2.5 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){scheduler.locale = {
	date: {
		month_full: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
		month_short: ["Jan", "Feb", "mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
		day_full: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
		day_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"]
	},
	labels: {
		dhx_cal_today_button: "Vandaag",
		day_tab: "Dag",
		week_tab: "Week",
		month_tab: "Maand",
		new_event: "Nieuw item",
		icon_save: "Opslaan",
		icon_cancel: "Annuleren",
		icon_details: "Details",
		icon_edit: "Bewerken",
		icon_delete: "Verwijderen",
		confirm_closing: "", //Your changes will be lost, are your sure ?
		confirm_deleting: "Item zal permanent worden verwijderd, doorgaan?",
		section_description: "Beschrijving",
		section_time: "Tijd periode",
		full_day: "Hele dag",

		confirm_recurring: "Wilt u alle terugkerende items bijwerken?",
		section_recurring: "Item herhalen",
		button_recurring: "Uit",
		button_recurring_open: "Aan",
		button_edit_series: "Bewerk de serie",
		button_edit_occurrence: "Bewerk een kopie",

		/*agenda view extension*/
		agenda_tab: "Agenda",
		date: "Datum",
		description: "Omschrijving",

		/*year view extension*/
		year_tab: "Jaar",

		/*week agenda view extension*/
		week_agenda_tab: "Agenda",

		/*grid view extension*/
		grid_tab: "Tabel",

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
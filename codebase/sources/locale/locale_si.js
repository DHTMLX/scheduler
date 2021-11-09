/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){scheduler.locale = {
	date: {
		month_full: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
		month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
		day_full: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
		day_short: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"]
	},
	labels: {
		dhx_cal_today_button: "Danes",
		day_tab: "Dan",
		week_tab: "Teden",
		month_tab: "Mesec",
		new_event: "Nov dogodek",
		icon_save: "Shrani",
		icon_cancel: "Prekliči",
		icon_details: "Podrobnosti",
		icon_edit: "Uredi",
		icon_delete: "Izbriši",
		confirm_closing: "", //Spremembe ne bodo shranjene. Želite nadaljevati ?
		confirm_deleting: "Dogodek bo izbrisan. Želite nadaljevati?",
		section_description: "Opis",
		section_time: "Časovni okvir",
		full_day: "Ves dan",

		/*recurring events*/
		confirm_recurring: "Želite urediti celoten set ponavljajočih dogodkov?",
		section_recurring: "Ponovi dogodek",
		button_recurring: "Onemogočeno",
		button_recurring_open: "Omogočeno",
		button_edit_series: "Edit series",
		button_edit_occurrence: "Edit occurrence",

		/*agenda view extension*/
		agenda_tab: "Zadeva",
		date: "Datum",
		description: "Opis",

		/*year view extension*/
		year_tab: "Leto",

		/*week agenda view extension*/
		week_agenda_tab: "Zadeva",

		/*grid view extension*/
		grid_tab: "Miza",

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
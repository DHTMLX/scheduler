/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){scheduler.locale = {
	date: {
		month_full: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
		month_short: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
		day_full: ["Vasárnap", "Hétfõ", "Kedd", "Szerda", "Csütörtök", "Péntek", "szombat"],
		day_short: ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"]
	},
	labels: {
		dhx_cal_today_button: "Ma",
		day_tab: "Nap",
		week_tab: "Hét",
		month_tab: "Hónap",
		new_event: "Új esemény",
		icon_save: "Mentés",
		icon_cancel: "Mégse",
		icon_details: "Részletek",
		icon_edit: "Szerkesztés",
		icon_delete: "Törlés",
		confirm_closing: "", //A változások elvesznek, biztosan folytatja? "
		confirm_deleting: "Az esemény törölve lesz, biztosan folytatja?",
		section_description: "Leírás",
		section_time: "Idõszak",
		full_day: "Egesz napos",

		/*ismétlõdõ események*/
		confirm_recurring: "Biztosan szerkeszteni akarod az összes ismétlõdõ esemény beállítását?",
		section_recurring: "Esemény ismétlése",
		button_recurring: "Tiltás",
		button_recurring_open: "Engedélyezés",
		button_edit_series: "Edit series",
		button_edit_occurrence: "Szerkesztés bíróság",

		/*napirendi nézet*/
		agenda_tab: "Napirend",
		date: "Dátum",
		description: "Leírás",

		/*éves nézet*/
		year_tab: "Év",

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
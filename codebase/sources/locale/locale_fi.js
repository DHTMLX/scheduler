/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){scheduler.locale = {
	date: {
		month_full: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
		month_short: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou"],
		day_full: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"],
		day_short: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"]
	},
	labels: {
		dhx_cal_today_button: "Tänään",
		day_tab: "Päivä",
		week_tab: "Viikko",
		month_tab: "Kuukausi",
		new_event: "Uusi tapahtuma",
		icon_save: "Tallenna",
		icon_cancel: "Peru",
		icon_details: "Tiedot",
		icon_edit: "Muokkaa",
		icon_delete: "Poista",
		confirm_closing: "", //Your changes will be lost, are your sure ?
		confirm_deleting: "Haluatko varmasti poistaa tapahtuman?",
		section_description: "Kuvaus",
		section_time: "Aikajakso",
		full_day: "Koko päivä",

		confirm_recurring: "Haluatko varmasti muokata toistuvan tapahtuman kaikkia jaksoja?",
		section_recurring: "Toista tapahtuma",
		button_recurring: "Ei k&auml;yt&ouml;ss&auml;",
		button_recurring_open: "K&auml;yt&ouml;ss&auml;",
		button_edit_series: "Muokkaa sarja",
		button_edit_occurrence: "Muokkaa kopio",

		/*agenda view extension*/
		agenda_tab: "Esityslista",
		date: "Päivämäärä",
		description: "Kuvaus",

		/*year view extension*/
		year_tab: "Vuoden",

		/*week agenda view extension*/
		week_agenda_tab: "Esityslista",

		/*grid view extension*/
		grid_tab: "Ritilä",

		/* touch tooltip*/
		drag_to_create:"Luo uusi vetämällä",
		drag_to_move:"Siirrä vetämällä",

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
		repeat_radio_day: "P&auml;ivitt&auml;in",
		repeat_radio_week: "Viikoittain",
		repeat_radio_month: "Kuukausittain",
		repeat_radio_year: "Vuosittain",
		repeat_radio_day_type: "Joka",
		repeat_text_day_count: "p&auml;iv&auml;",
		repeat_radio_day_type2: "Joka arkip&auml;iv&auml;",
		repeat_week: "Toista joka",
		repeat_text_week_count: "viikko n&auml;in&auml; p&auml;ivin&auml;:",
		repeat_radio_month_type: "Toista",
		repeat_radio_month_start: "",
		repeat_text_month_day: "p&auml;iv&auml;n&auml; joka",
		repeat_text_month_count: "kuukausi",
		repeat_text_month_count2_before: "joka",
		repeat_text_month_count2_after: "kuukausi",
		repeat_year_label: "",
		select_year_day2: "",
		repeat_text_year_day: "p&auml;iv&auml;",
		select_year_month: "kuukausi",
		repeat_radio_end: "Ei loppumisaikaa",
		repeat_text_occurences_count: "Toiston j&auml;lkeen",
		repeat_radio_end3: "Loppuu",
		repeat_radio_end2: "",
		month_for_recurring: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
		day_for_recurring: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"]
	}
};


});
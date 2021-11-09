/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){scheduler.locale = {
	date: {
		month_full: ["Ocak", "Þubat", "Mart", "Nisan", "Mayýs", "Haziran", "Temmuz", "Aðustos", "Eylül", "Ekim", "Kasým", "Aralýk"],
		month_short: ["Oca", "Þub", "Mar", "Nis", "May", "Haz", "Tem", "Aðu", "Eyl", "Eki", "Kas", "Ara"],
		day_full: ["Pazar", "Pazartes,", "Salý", "Çarþamba", "Perþembe", "Cuma", "Cumartesi"],
		day_short: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"]
	},
	labels: {
		dhx_cal_today_button: "Bugün",
		day_tab: "Gün",
		week_tab: "Hafta",
		month_tab: "Ay",
		new_event: "Uygun",
		icon_save: "Kaydet",
		icon_cancel: "Ýptal",
		icon_details: "Detaylar",
		icon_edit: "Düzenle",
		icon_delete: "Sil",
		confirm_closing: "", //Your changes will be lost, are your sure ?
		confirm_deleting: "Etkinlik silinecek, devam?",
		section_description: "Açýklama",
		section_time: "Zaman aralýðý",
		full_day: "Tam gün",

		/*recurring events*/
		confirm_recurring: "Tüm tekrar eden etkinlikler silinecek, devam?",
		section_recurring: "Etkinliði tekrarla",
		button_recurring: "Pasif",
		button_recurring_open: "Aktif",
		button_edit_series: "Dizi düzenleme",
		button_edit_occurrence: "Bir kopyasını düzenleyin",

		/*agenda view extension*/
		agenda_tab: "Ajanda",
		date: "Tarih",
		description: "Açýklama",

		/*year view extension*/
		year_tab: "Yýl",

		/*week agenda view extension*/
		week_agenda_tab: "Ajanda",

		/*grid view extension*/
		grid_tab: "Izgara",

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
};});
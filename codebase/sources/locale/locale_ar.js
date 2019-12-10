/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){scheduler.locale = {
	date: {
		month_full: ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
		month_short: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
		day_full: ["الأحد", "الأثنين", "ألثلاثاء", "الأربعاء", "ألحميس", "ألجمعة", "السبت"],
		day_short: ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"]
	},
	labels: {
		dhx_cal_today_button: "اليوم",
		day_tab: "يوم",
		week_tab: "أسبوع",
		month_tab: "شهر",
		new_event: "حدث جديد",
		icon_save: "اخزن",
		icon_cancel: "الغاء",
		icon_details: "تفاصيل",
		icon_edit: "تحرير",
		icon_delete: "حذف",
		confirm_closing: "التغييرات سوف تضيع, هل انت متأكد؟", //Your changes will be lost, are your sure ?
		confirm_deleting: "الحدث سيتم حذفها نهائيا ، هل أنت متأكد؟",
		section_description: "الوصف",
		section_time: "الفترة الزمنية",
		full_day: "طوال اليوم",

		confirm_recurring: "هل تريد تحرير مجموعة كاملة من الأحداث المتكررة؟",
		section_recurring: "تكرار الحدث",
		button_recurring: "تعطيل",
		button_recurring_open: "تمكين",
		button_edit_series: "تحرير سلسلة",
		button_edit_occurrence: "تعديل نسخة",

		/*grid view extension*/
		grid_tab: "جدول",

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
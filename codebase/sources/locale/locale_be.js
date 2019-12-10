/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){/*
 Translation by Sofya Morozova
 */
scheduler.locale = {
	date: {
		month_full: ["Студзень", "Люты", "Сакавік", "Красавік", "Maй", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"],
		month_short: ["Студз", "Лют", "Сак", "Крас", "Maй", "Чэр", "Ліп", "Жнів", "Вер", "Каст", "Ліст", "Снеж"],
		day_full: [ "Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"],
		day_short: ["Нд", "Пн", "Аўт", "Ср", "Чцв", "Пт", "Сб"]
	},
	labels: {
		dhx_cal_today_button: "Сёння",
		day_tab: "Дзень",
		week_tab: "Тыдзень",
		month_tab: "Месяц",
		new_event: "Новая падзея",
		icon_save: "Захаваць",
		icon_cancel: "Адмяніць",
		icon_details: "Дэталі",
		icon_edit: "Змяніць",
		icon_delete: "Выдаліць",
		confirm_closing: "", //Унесеныя змены будуць страчаны, працягнуць?
		confirm_deleting: "Падзея будзе выдалена незваротна, працягнуць?",
		section_description: "Апісанне",
		section_time: "Перыяд часу",
		full_day: "Увесь дзень",

		confirm_recurring: "Вы хочаце змяніць усю серыю паўтаральных падзей?",
		section_recurring: "Паўтарэнне",
		button_recurring: "Адключана",
		button_recurring_open: "Уключана",
		button_edit_series: "Рэдагаваць серыю",
		button_edit_occurrence: "Рэдагаваць асобнік",

		/*agenda view extension*/
		agenda_tab: "Спіс",
		date: "Дата",
		description: "Апісанне",

		/*year view extension*/
		year_tab: "Год",

		/*week agenda view extension*/
		week_agenda_tab: "Спіс",

		/*grid view extension*/
		grid_tab: "Спic",

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
		repeat_radio_day: "Дзень",
		repeat_radio_week: "Тыдзень",
		repeat_radio_month: "Месяц",
		repeat_radio_year: "Год",
		repeat_radio_day_type: "Кожны",
		repeat_text_day_count: "дзень",
		repeat_radio_day_type2: "Кожны працоўны дзень",
		repeat_week: " Паўтараць кожны",
		repeat_text_week_count: "тыдзень",
		repeat_radio_month_type: "Паўтараць",
		repeat_radio_month_start: "",
		repeat_text_month_day: " чысла кожнага",
		repeat_text_month_count: "месяцу",
		repeat_text_month_count2_before: "кожны ",
		repeat_text_month_count2_after: "месяц",
		repeat_year_label: "",
		select_year_day2: "",
		repeat_text_year_day: "день",
		select_year_month: "",
		repeat_radio_end: "Без даты заканчэння",
		repeat_text_occurences_count: "паўтораў",
		repeat_radio_end2: "",
		repeat_radio_end3: "Да ",
		month_for_recurring: ["Студзеня", "Лютага", "Сакавіка", "Красавіка", "Мая", "Чэрвеня", "Ліпeня", "Жніўня", "Верасня", "Кастрычніка", "Лістапада", "Снежня"],
		day_for_recurring: ["Нядзелю", "Панядзелак", "Аўторак", "Сераду", "Чацвер", "Пятніцу", "Суботу"]
	}
};
});
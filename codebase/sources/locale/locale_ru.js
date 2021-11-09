/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){scheduler.locale = {
	date: {
		month_full: ["Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь", "Июль", "Август", "Сентябрь", "Oктябрь", "Ноябрь", "Декабрь"],
		month_short: ["Янв", "Фев", "Maр", "Aпр", "Maй", "Июн", "Июл", "Aвг", "Сен", "Окт", "Ноя", "Дек"],
		day_full: [ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
		day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
	},
	labels: {
		dhx_cal_today_button: "Сегодня",
		day_tab: "День",
		week_tab: "Неделя",
		month_tab: "Месяц",
		new_event: "Новое событие",
		icon_save: "Сохранить",
		icon_cancel: "Отменить",
		icon_details: "Детали",
		icon_edit: "Изменить",
		icon_delete: "Удалить",
		confirm_closing: "", //Ваши изменения будут потеряны, продолжить?
		confirm_deleting: "Событие будет удалено безвозвратно, продолжить?",
		section_description: "Описание",
		section_time: "Период времени",
		full_day: "Весь день",

		confirm_recurring: "Вы хотите изменить всю серию повторяющихся событий?",
		section_recurring: "Повторение",
		button_recurring: "Отключено",
		button_recurring_open: "Включено",
		button_edit_series: "Редактировать серию",
		button_edit_occurrence: "Редактировать экземпляр",

		/*agenda view extension*/
		agenda_tab: "Список",
		date: "Дата",
		description: "Описание",

		/*year view extension*/
		year_tab: "Год",

		/*week agenda view extension*/
		week_agenda_tab: "Список",

		/*grid view extension*/
		grid_tab: "Таблица",

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
		repeat_radio_day: "День",
		repeat_radio_week: "Неделя",
		repeat_radio_month: "Месяц",
		repeat_radio_year: "Год",
		repeat_radio_day_type: "Каждый",
		repeat_text_day_count: "день",
		repeat_radio_day_type2: "Каждый рабочий день",
		repeat_week: " Повторять каждую",
		repeat_text_week_count: "неделю , в:",
		repeat_radio_month_type: "Повторять",
		repeat_radio_month_start: "",
		repeat_text_month_day: " числа каждый ",
		repeat_text_month_count: "месяц",
		repeat_text_month_count2_before: "каждый ",
		repeat_text_month_count2_after: "месяц",
		repeat_year_label: "",
		select_year_day2: "",
		repeat_text_year_day: "день",
		select_year_month: "",
		repeat_radio_end: "Без даты окончания",
		repeat_text_occurences_count: "повторений",
		repeat_radio_end3: "До ",
		repeat_radio_end2: "",
		month_for_recurring: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
		day_for_recurring: ["Воскресенье", "Понедельник", "Вторник", "Среду", "Четверг", "Пятницу", "Субботу"]
	}
};
});
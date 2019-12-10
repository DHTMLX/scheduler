/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){/*
Translation by FreezeSoul
*/
scheduler.config.day_date="%M %d日 %D";
scheduler.config.default_date="%Y年 %M %d日";
scheduler.config.month_date="%Y年 %M";

scheduler.locale={
	date: {
		month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		day_short: ["日", "一", "二", "三", "四", "五", "六"]
	},
	labels: {
		dhx_cal_today_button: "今天",
		day_tab: "日",
		week_tab: "周",
		month_tab: "月",
		new_event: "新建日程",
		icon_save: "保存",
		icon_cancel: "关闭",
		icon_details: "详细",
		icon_edit: "编辑",
		icon_delete: "删除",
		confirm_closing: "请确认是否撤销修改!", //Your changes will be lost, are your sure?
		confirm_deleting: "是否删除日程?",
		section_description: "描述",
		section_time: "时间范围",
		full_day: "整天",

		confirm_recurring:"请确认是否将日程设为重复模式?",
		section_recurring:"重复周期",
		button_recurring:"禁用",
		button_recurring_open:"启用",
		button_edit_series: "编辑系列",
		button_edit_occurrence: "编辑实例",
		
		/*agenda view extension*/
		agenda_tab:"议程",
		date:"日期",
		description:"说明",
		
		/*year view extension*/
		year_tab:"今年",

		/*week agenda view extension*/
		week_agenda_tab: "议程",

		/*grid view extension*/
		grid_tab:"电网",

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
		repeat_radio_day: "按天",
		repeat_radio_week: "按周",
		repeat_radio_month: "按月",
		repeat_radio_year: "按年",
		repeat_radio_day_type: "每",
		repeat_text_day_count: "天",
		repeat_radio_day_type2: "每个工作日",
		repeat_week: " 重复 每",
		repeat_text_week_count: "星期的:",
		repeat_radio_month_type: "重复",
		repeat_radio_month_start: "在",
		repeat_text_month_day: "日 每",
		repeat_text_month_count: "月",
		repeat_text_month_count2_before: "每",
		repeat_text_month_count2_after: "月",
		repeat_year_label: "在",
		select_year_day2: "的",
		repeat_text_year_day: "日",
		select_year_month: "月",
		repeat_radio_end: "无结束日期",
		repeat_text_occurences_count: "次结束",
		repeat_radio_end2: "重复",
		repeat_radio_end3: "结束于",
		month_for_recurring: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		day_for_recurring: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
	}
};

});
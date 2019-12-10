/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){scheduler.locale = {
	date: {
		month_full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		month_short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"],
		day_full: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
		day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
	},
	labels: {
		dhx_cal_today_button: "Aujourd'hui",
		day_tab: "Jour",
		week_tab: "Semaine",
		month_tab: "Mois",
		new_event: "Nouvel événement",
		icon_save: "Enregistrer",
		icon_cancel: "Annuler",
		icon_details: "Détails",
		icon_edit: "Modifier",
		icon_delete: "Effacer",
		confirm_closing: "", //Vos modifications seront perdus, êtes-vous sûr ?
		confirm_deleting: "L'événement sera effacé sans appel, êtes-vous sûr ?",
		section_description: "Description",
		section_time: "Période",
		full_day: "Journée complète",

		confirm_recurring: "Voulez-vous éditer toute une série d'évènements répétés?",
		section_recurring: "Périodicité",
		button_recurring: "Désactivé",
		button_recurring_open: "Activé",
		button_edit_series: "Modifier la série",
		button_edit_occurrence: "Modifier une copie",

		/*agenda view extension*/
		agenda_tab: "Jour",
		date: "Date",
		description: "Description",

		/*year view extension*/
		year_tab: "Année",

		/*week agenda view extension*/
		week_agenda_tab: "Jour",

		/*grid view extension*/
		grid_tab: "Grille",

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
		repeat_radio_day: "Quotidienne",
		repeat_radio_week: "Hebdomadaire",
		repeat_radio_month: "Mensuelle",
		repeat_radio_year: "Annuelle",
		repeat_radio_day_type: "Chaque",
		repeat_text_day_count: "jour",
		repeat_radio_day_type2: "Chaque journée de travail",
		repeat_week: " Répéter toutes les",
		repeat_text_week_count: "semaine:",
		repeat_radio_month_type: "Répéter",
		repeat_radio_month_start: "Le",
		repeat_text_month_day: "jour chaque",
		repeat_text_month_count: "mois",
		repeat_text_month_count2_before: "chaque",
		repeat_text_month_count2_after: "mois",
		repeat_year_label: "Le",
		select_year_day2: "du",
		repeat_text_year_day: "jour",
		select_year_month: "mois",
		repeat_radio_end: "Pas de date d&quot;achèvement",
		repeat_text_occurences_count: "occurrences",
		repeat_radio_end3: "Fin",
		repeat_radio_end2: "Après",
		month_for_recurring: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		day_for_recurring: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
	}
};
});
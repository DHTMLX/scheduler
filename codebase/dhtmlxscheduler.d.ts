// Type definitions for dhtmlxScheduler <%= pkg.version %>
// Project: http://dhtmlx.com/docs/products/dhtmlxScheduler

type SchedulerCallback = (...args: any[]) => any;
type SchedulerFilterCallback = { (id: string | number, event: any): boolean }


type SchedulerEventName = "onAfterEventDisplay"|"onAfterFolderToggle"|"onAfterLightbox"|"onAfterQuickInfo"|"onAfterSchedulerResize"|"onBeforeCollapse"|"onBeforeDrag"|"onBeforeEventChanged"|"onBeforeEventCreated"|"onBeforeEventDelete"|"onBeforeEventDisplay"|"onBeforeEventDragIn"|"onBeforeEventDragOut"|"onBeforeEventPasted"|"onBeforeExpand"|"onBeforeExternalDragIn"|"onBeforeFolderToggle"|"onBeforeLightbox"|"onBeforeParse"|"onBeforeTodayDisplayed"|"onBeforeTooltip"|"onBeforeViewChange"|"onCellClick"|"onCellDblClick"|"onClearAll"|"onClick"|"onCollapse"|"onConfirmedBeforeEventDelete"|"onContextMenu"|"onDataRender"|"onDblClick"|"onDestroy"|"onDragEnd"|"onEmptyClick"|"onError"|"onEventAdded"|"onEventCancel"|"onEventChanged"|"onEventCollision"|"onEventCopied"|"onEventCreated"|"onEventCut"|"onEventDeleted"|"onEventDrag"|"onEventDragIn"|"onEventDragOut"|"onEventDropOut"|"onEventIdChange"|"onEventLoading"|"onEventPasted"|"onEventSave"|"onEventSelected"|"onEventUnselected"|"onExpand"|"onExternalDragIn"|"onLightbox"|"onLightboxButton"|"onLimitViolation"|"onLoadEnd"|"onLoadError"|"onLoadStart"|"onLocationError"|"onMouseDown"|"onMouseMove"|"onOptionsLoad"|"onOptionsLoadFinal"|"onOptionsLoadStart"|"onParse"|"onQuickInfo"|"onSaveError"|"onScaleAdd"|"onScaleDblClick"|"onSchedulerReady"|"onSchedulerResize"|"onTemplatesReady"|"onTimelineCreated"|"onViewChange"|"onViewMoreClick"|"onXLE"|"onXLS"|"onXScaleClick"|"onXScaleDblClick"|"onYScaleClick"|"onYScaleDblClick";


export interface SchedulerTemplates {

	/**
	 * specifies the date in the header of the view
	 * @param start the start date of the view
	 * @param end the end date of the view
	*/
	agenda_date(start: Date, end: Date): string;

	/**
	 * specifies the text in the second column of the Agenda view
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	agenda_text(start: Date, end: Date, event: any): string;

	/**
	 * specifies the date in the first column of the Agenda view
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	agenda_time(start: Date, end: Date, event: any): string;

	/**
	 * specifies the format of dates that are set by means of API methods. Used to parse incoming dates
	 * @param date the date which needs formatting
	*/
	api_date(date: Date): string;

	/**
	 * specifies the content of day-cells in the Mini-Calendar (date picker)
	 * @param date the cell's date
	*/
	calendar_date(date: Date): string;

	/**
	 * specifies the date in the header of the Mini-Calendar (date picker)
	 * @param date the first day of a selected month
	*/
	calendar_month(date: Date): string;

	/**
	 * specifies the format of week-days in the header of the Mini-Calendar (date picker)
	 * @param date the date of a week-day for a header cell
	*/
	calendar_scale_date(date: Date): string;

	/**
	 * specifies the date format of the lightbox's start and end date inputs
	 * @param date the date which needs formatting
	*/
	calendar_time(date: Date): string;

	/**
	 * specifies the date in the header of the Day and Units views
	 * @param date the date which needs formatting
	*/
	day_date(date: Date): string;

	/**
	 * specifies the date in the sub-header of the Day view
	 * @param date the date which needs formatting
	*/
	day_scale_date(date: Date): string;

	/**
	 * specifies the CSS class that will be applied to the highlighted event's duration on the time scale
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param ev the event's object
	*/
	drag_marker_class(start: Date, end: Date, ev: any): void;

	/**
	 * specifies the content of the highlighted block  on the time scale
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param ev the event's object
	*/
	drag_marker_content(start: Date, end: Date, ev: any): void;

	/**
	 * specifies the date of an event. Applied to one-day events only
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	event_bar_date(start: Date, end: Date, event: any): string;

	/**
	 * specifies the event's text. Applied to multi-day events only
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event's object
	*/
	event_bar_text(start: Date, end: Date, event: any): string;

	/**
	 * specifies the CSS class that will be applied to the event's container
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param ev the event's object
	*/
	event_class(start: Date, end: Date, ev: any): string;

	/**
	 * specifies the time part of the start and end dates of the event. Mostly used by other templates for presenting time periods
	 * @param date the date which needs formatting
	*/
	event_date(date: Date): string;

	/**
	 * specifies the event's header
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event's object
	*/
	event_header(start: Date, end: Date, event: any): string;

	/**
	 * specifies the event's text
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	event_text(start: Date, end: Date, event: any): string;

	/**
	 * сonverts date object to a date string. Used to send data back to the server
	 * @param date the date which needs formatting
	*/
	format_date(date: Date): string;

	/**
	 * specifies the items of the Y-Axis
	 * @param date the date which needs formatting
	*/
	hour_scale(date: Date): string;

	/**
	 * specifies the format of requests in the dynamic loading mode
	 * @param date the date which needs formatting
	*/
	load_format(date: Date): string;

	/**
	 * specifies the date in the header of the view
	 * @param start the start date of the view
	 * @param end the end date of the view
	*/
	map_date(start: Date, end: Date): string;

	/**
	 * specifies the text in the second column of the view
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	map_text(start: Date, end: Date, event: any): string;

	/**
	 * specifies the date in the first column of the view
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	map_time(start: Date, end: Date, event: any): string;

	/**
	 * specifies the date of the event in the Google Maps popup marker
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	marker_date(start: Date, end: Date, event: any): string;

	/**
	 * specifies the text of the event in the Google Maps popup marker
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	marker_text(start: Date, end: Date, event: any): string;

	/**
	 * specifies the date in the header of the view
	 * @param date the date which needs formatting
	*/
	month_date(date: Date): string;

	/**
	 * specifies the CSS class that will be applied to a day cell
	 * @param date the date which needs formatting
	*/
	month_date_class(date: Date): string;

	/**
	 * specifies the format of the day in a cell
	 * @param date the date which needs formatting
	*/
	month_day(date: Date): string;

	/**
	 * specifies the presentation of the 'View more' link in a cell of the Month view
	 * @param date the date of a month cell
	 * @param count the number of events in the cell
	*/
	month_events_link(date: Date, count: number): string;

	/**
	 * specifies the date format of the X-Axis of the view
	 * @param date the date which needs formatting
	*/
	month_scale_date(date: Date): string;

	/**
	 * converts date string into a Date object
	 * @param date the string which need to be parsed
	*/
	parse_date(date: string): Date;

	/**
	 * specifies the content of the pop-up edit form
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	quick_info_content(start: Date, end: Date, event: any): string;

	/**
	 * specifies the date of the pop-up edit form
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	quick_info_date(start: Date, end: Date, event: any): string;

	/**
	 * specifies the title of the pop-up edit form
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	quick_info_title(start: Date, end: Date, event: any): string;

	/**
	 * specifies the drop-down time selector in the lightbox
	*/
	time_picker(): string;

	/**
	 * specifies the format of start and end dates displayed in the tooltip
	 * @param date the date which needs formatting
	*/
	tooltip_date_format(date: Date): string;

	/**
	 * specifies the text of tooltips
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	tooltip_text(start: Date, end: Date, event: any): string;

	/**
	 * specifies the date in the header of the Week Agenda view
	 * @param start the start date of the view
	 * @param end the end date of the view
	*/
	week_agenda_date(start: Date, end: Date): void;

	/**
	 * specifies the event's text
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	 * @param cellDate the date of a day cell that a one-day event or a single occurrence of <br> the recurring event displays in
	 * @param pos the position of a single occurrence in the recurring event: 'start' - the first occurrence, 'end' - the last occurrence, 'middle' - for remaining occurrences
	*/
	week_agenda_event_text(start: Date, end: Date, event: any, cellDate: Date, pos: string): string;

	/**
	 * the date of a day cell of the view
	 * @param date the date which needs formatting
	*/
	week_agenda_scale_date(date: Date): string;

	/**
	 * specifies the date in the header of the view
	 * @param start the start date of the view
	 * @param end the end date of the view
	*/
	week_date(start: Date, end: Date): string;

	/**
	 * specifies the CSS class that will be applied to a day cell
	 * @param start the start date of the column
	 * @param today the current date
	*/
	week_date_class(start: Date, today: Date): string;

	/**
	 * specifies the date in the sub-header of the view
	 * @param date the date which needs formatting
	*/
	week_scale_date(date: Date): string;

	/**
	 * specifies the date in the header of the view
	 * @param date the date which needs formatting
	*/
	year_date(date: Date): string;

	/**
	 * specifies the month's name in the header of a month block of the view.
	 * @param date the date which needs formatting
	*/
	year_month(date: Date): string;

	/**
	 * specifies the day's name in the sub-header of a month block of the view
	 * @param date the date which needs formatting
	*/
	year_scale_date(date: Date): string;

	/**
	 * specifies the tooltip over a day cell containing some scheduled event(s)
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	year_tooltip(start: Date, end: Date, event: any): string;

	/**
	 * specifies the lightbox's header
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	lightbox_header(start: Date, end: Date, event: any): string;

	/**
	 * specifies the date in the header of the view
	 * @param start the start date of the view
	 * @param end the end date of the view
	*/
	grid_date(start: Date, end: Date): string;

	/**
	 * specifies the format of dates in columns with id='date'
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param ev the event object
	*/
	grid_full_date(start: Date, end: Date, ev: any): string;

	/**
	 * specifies the format of dates in columns with id='start_date' or id='end_date'
	 * @param date the date which needs formatting
	*/
	grid_single_date(date: Date): string;

	/**
	 * specifies the text in the columns
	 * @param field_name the column's id
	 * @param event the event object
	*/
	grid_field(field_name: string, event: any): string;

	/**
	 * specifies the number of scheduled events in a cell of the view
	 * @param evs an array of objects of events contained in a cell
	 * @param date the date of a cell
	 * @param section the section object
	*/
	timeline_cell_value(evs: any[], date: Date, section: any): string;

	/**
	 * specifies the CSS class that will be applied to a cell of the view
	 * @param evs an array of objects of events contained in a cell (defined only in the 'cell' mode)
	 * @param date the date of a column
	 * @param section the section object
	*/
	timeline_cell_class(evs: any[], date: Date, section: any): string;

	/**
	 * specifies the name of a CSS class that will be applied to items of the X-Axis
	 * @param date the date which needs formatting
	*/
	timeline_scalex_class(date: Date): string;

	/**
	 * specifies the name of a CSS class that will be applied to items of the second X-Axis
	 * @param date the date which needs formatting
	*/
	timeline_second_scalex_class(date: Date): string;

	/**
	 * specifies the name of a CSS class that will be applied to items of the Y-Axis
	 * @param key the section's id
	 * @param label the section's label
	 * @param section the section object that contains the 'key' and 'label' properties
	*/
	timeline_scaley_class(key: string, label: string, section: any): string;

	/**
	 * specifies items of the Y-Axis
	 * @param key the section's id (key)
	 * @param label the section's label
	 * @param section the section object containing the 'key' and 'label' properties
	*/
	timeline_scale_label(key: string, label: string, section: any): string;

	/**
	 * specifies the tooltip over a day cell containing some scheduled event(s)
	 * @param start the date when an event is scheduled to begin
	 * @param end the date when an event is scheduled to be completed
	 * @param event the event object
	*/
	timeline_tooltip(start: Date, end: Date, event: any): string;

	/**
	 * specifies the date in the header of the view
	 * @param date1 the date when an event is scheduled to begin
	 * @param date2 the date when an event is scheduled to be completed
	*/
	timeline_date(date1: Date, date2: Date): string;

	/**
	 * specifies items of the X-Axis
	 * @param date the date which needs formatting
	*/
	timeline_scale_date(date: Date): string;

	/**
	 * specifies items of the second X-Axis
	 * @param date the date which needs formatting
	*/
	timeline_second_scale_date(date: Date): string;

	/**
	 * specifies the date in the header of the view
	 * @param date the date which needs formatting
	*/
	unit_date(date: Date): string;

	/**
	 * specifies items of the X-Axis
	 * @param key the unit's id (key)
	 * @param label the unit's label
	 * @param unit the unit object containing the 'key' and 'label' properties
	 * @param date the date of a column (for multi-day Units view)
	*/
	unit_scale_text(key: string, label: string, unit: any, date: Date): string;

	/**
	 * a string from an XML file is converted into a date object in conformity with this template
	 * @param date the string which need to be parsed
	*/
	xml_date(date: string): Date;

	/**
	 * a date object is converted into a string in conformity with this template. Used to send data back to the server
	 * @param date the date which needs formatting
	*/
	xml_format(date: Date): string;

	/**
	 * specifies the CSS class that will be applied to a row of the Timeline view
	 * @param section the section object
	 * @param timeline the timeline object
	*/
	timeline_row_class(section: any, timeline: any): string;

	[customTemplate: string]: any;
}

export interface SchedulerConfigOptions {

	/**
	 * 'says' to present the numbers of days in the Month view as clickable links that open the related day in the specified view
	*/
	active_link_view: string;

	/**
	 * sets the date to display events until
	*/
	agenda_end: Date;

	/**
	 * sets the date to start displaying events from
	*/
	agenda_start: Date;

	/**
	 * specifies how to display the default error notification in case the XML data loading failed
	*/
	ajax_error: string|boolean;

	/**
	 * 'says' to show multi-day events in  the regular way (as one-day events are displayed)
	*/
	all_timed: boolean|string;

	/**
	 * defines the date format for the <strong>api_date</strong> template
	*/
	api_date: string;

	/**
	 * enables automatic changing of the end event date after changing the start date
	*/
	auto_end_date: boolean;

	/**
	 * stores a collection of buttons resided in the left bottom corner of the lightbox
	*/
	buttons_left: any[];

	/**
	 * stores a collection of buttons resided in the right bottom corner of the lightbox
	*/
	buttons_right: any[];

	/**
	 * sets the maximum number of events in a cascade
	*/
	cascade_event_count: number;

	/**
	 * sets the 'cascade' display mode
	*/
	cascade_event_display: boolean;

	/**
	 * sets the left margin for a cascade of events
	*/
	cascade_event_margin: number;

	/**
	 * activates/disables checking of limits
	*/
	check_limits: boolean;

	/**
	 * sets the maximum allowable number of events per time slot
	*/
	collision_limit: number;

	/**
	 * forces the scheduler container to automatically change its size to show the whole content without scrolling
	*/
	container_autoresize: boolean;

	/**
	 * defines internal implementation of the code of date formatting methods
	*/
	csp: boolean|string;

	/**
	 * sets the date format that is used to parse data from a data set and to send dates back to the server
	*/
	date_format: string;

	/**
	 * sets the date format for the X-Axis of the Week and Units views
	*/
	day_date: string;

	/**
	 * enables the possibility to create events by double click
	*/
	dblclick_create: boolean;

	/**
	 * sets the date format used by the templates 'day_date', 'week_date', 'day_scale_date' for setting date in the views' headers
	*/
	default_date: string;

	/**
	 * sets a timeout (in milliseconds) that wraps the api/scheduler_updateview.md and api/scheduler_setcurrentview.md calls (that cause re-drawing of the scheduler)
	*/
	delay_render: number;

	/**
	 * 'says' to use the extended form while creating new events by drag or double click
	*/
	details_on_create: boolean;

	/**
	 * 'says' to open the lightbox after double clicking on an event
	*/
	details_on_dblclick: boolean;

	/**
	 * defines whether the marked(blocked) time spans should be highlighted in the scheduler
	*/
	display_marked_timespans: boolean;

	/**
	 * sets the default background color for the events retrieved by the showEvent() method
	*/
	displayed_event_color: string;

	/**
	 * sets the default font color for the events retrieved by the showEvent() method
	*/
	displayed_event_text_color: string;

	/**
	 * enables the possibility to create new events by drag-and-drop
	*/
	drag_create: boolean;

	/**
	 * allows dragging scheduler events by any part of the body
	*/
	drag_event_body: boolean;

	/**
	 * highlights the event's duration on the time scale when you drags an event over the scheduler
	*/
	drag_highlight: boolean;

	/**
	 * restrict dragging events to the calling scheduler from any other scheduler(s)
	*/
	drag_in: boolean;

	/**
	 * enables the possibility to drag the lightbox by the header
	*/
	drag_lightbox: boolean;

	/**
	 * enables the possibility to move events by drag-and-drop
	*/
	drag_move: boolean;

	/**
	 * restrict dragging events from the calling scheduler to any other scheduler(s)
	*/
	drag_out: boolean;

	/**
	 * enables the possibility to resize events by drag-and-drop
	*/
	drag_resize: boolean;

	/**
	 * 'says' to open the lightbox while creating new events
	*/
	edit_on_create: boolean;

	/**
	 * sets the name of the attribute that will specify the id of the event's HTML element
	*/
	event_attribute: string;

	/**
	 * sets the initial duration of events in minutes
	*/
	event_duration: number;

	/**
	 * sets the minimum value for the hour scale (Y-Axis)
	*/
	first_hour: number;

	/**
	 * moves views' tabs from the left to the right side
	*/
	fix_tab_position: boolean;

	/**
	 * enables setting of the event's duration to the full day
	*/
	full_day: boolean;

	/**
	 * provides a layout-like configuration for the scheduler header (navigation panel)
	*/
	header: any;

	/**
	 * specifies whether events retrieved by the showEvent method should be highlighted while displaying
	*/
	highlight_displayed_event: boolean;

	/**
	 * sets the time format of Y-Axis. Also used in the default event and lighbox  templates for setting the time part.
	*/
	hour_date: string;

	/**
	 * sets the height of an hour unit in pixels
	*/
	hour_size_px: number;

	/**
	 * stores a collection of icons visible in the side edit menu of the event's box
	*/
	icons_edit: any[];

	/**
	 * stores a collection of icons visible in the side selection menu of the event's box
	*/
	icons_select: any[];

	/**
	 * defines whether the date specified in the 'End by' field should be exclusive or inclusive
	*/
	include_end_by: boolean;

	/**
	 * enables the keyboard navigation in the scheduler
	*/
	key_nav: boolean;

	/**
	 * defines the minimal step (in minutes) for navigating events
	*/
	key_nav_step: number;

	/**
	 * sets the maximum value of the hour scale (Y-Axis)
	*/
	last_hour: number;

	/**
	 * adds the dotted left border to the scheduler
	*/
	left_border: boolean;

	/**
	 * specifies the lightbox object
	*/
	lightbox: any;

	/**
	 * defines the lightbox's behavior, when the user opens the lightbox to edit a recurring event
	*/
	lightbox_recurring: string;

	/**
	 * denies to drag events out of the visible area of the scheduler
	*/
	limit_drag_out: boolean;

	/**
	 * sets the end limit of the allowable date range
	*/
	limit_end: Date;

	/**
	 * sets the start limit of the allowable date range
	*/
	limit_start: Date;

	/**
	 * sets max and min values of time selector in the lightbox to the values of the 'last_hour' and 'first_hour' options
	*/
	limit_time_select: boolean;

	/**
	 * limits the date period during which the user can view the events
	*/
	limit_view: boolean;

	/**
	 * sets the format of server request parameters 'from', 'to' in case of dynamic loading
	*/
	load_date: string;

	/**
	 * sets the date to display events until
	*/
	map_end: Date;

	/**
	 * sets the position that will be displayed on the map in case the event's location can't be identified
	*/
	map_error_position: any;

	/**
	 * the maximum width of the Google Maps's popup marker in the Map view
	*/
	map_infowindow_max_width: number;

	/**
	 * sets the initial position of the map
	*/
	map_initial_position: any;

	/**
	 * sets the initial zoom of Google Maps in the Map view
	*/
	map_initial_zoom: number;

	/**
	 * activates attempts to resolve the event's location, if the database doesn't have  the event's coordinates stored
	*/
	map_resolve_event_location: boolean;

	/**
	 * enables/disables prompts asking the user to share his location for displaying on the map
	*/
	map_resolve_user_location: boolean;

	/**
	 * sets the date to start displaying events from
	*/
	map_start: Date;

	/**
	 * sets the type of Google Maps
	*/
	map_type: any;

	/**
	 * sets the zoom that will be used to show the user's location, if the user agrees to the browser's offer to show it
	*/
	map_zoom_after_resolve: number;

	/**
	 * enables/disables the marker displaying the current time
	*/
	mark_now: boolean;

	/**
	 * sets the maximum number of events displayable in a cell
	*/
	max_month_events: number;

	/**
	 * defines the minimal possible size of the Grid view during autoresize
	*/
	min_grid_size: number;

	/**
	 * defines the minimal possible size of the Map view during autoresize
	*/
	min_map_size: number;

	/**
	 * specifies the mini calendar object
	*/
	minicalendar: any;

	/**
	 * sets the format for the header of the Month view
	*/
	month_date: string;

	/**
	 * sets the format for the day in the cells of the Month and Year views
	*/
	month_day: string;

	/**
	 * sets the minimum height of cells in the Month view
	*/
	month_day_min_height: number;

	/**
	 * enables rendering of multi-day events
	*/
	multi_day: boolean;

	/**
	 * sets the height of the area that displays multi-day events
	*/
	multi_day_height_limit: number|boolean;

	/**
	 * enables the possibility to render the same events in several sections of the Timeline or Units view
	*/
	multisection: boolean;

	/**
	 * specifies whether while dragging events that assigned to several sections of the Timeline or Units view, all  instances should be dragged at once ('true') or just the selected one ('false')
	*/
	multisection_shift_all: boolean;

	/**
	 * sets the date for the current-time marker in the Limit extension (enabled by the configuration - mark_now)
	*/
	now_date: Date;

	/**
	 * allows working with recurring events independently of time zones
	*/
	occurrence_timestamp_in_utc: boolean;

	/**
	 * enables blocking priority for marked timespans
	*/
	overwrite_marked_timespans: boolean;

	/**
	 * defines whether scheduler automatically identifies the format of data
	*/
	parse_exact_format: boolean;

	/**
	 * defines the 'saving' behaviour for the case, when  the user edits the event's text directly in the event's box
	*/
	positive_closing: boolean;

	/**
	 * preserves the visible length of an event while dragging along a non-linear time scale
	*/
	preserve_length: boolean;

	/**
	 * cancels preserving of the current scroll position while navigating between dates of the same view
	*/
	preserve_scroll: boolean;

	/**
	 * enables/disables caching of GET requests in the browser
	*/
	prevent_cache: boolean;

	/**
	 * defines whether the event form will appear from the left/right side of the screen or near the selected event
	*/
	quick_info_detached: boolean;

	/**
	 * activates the read-only mode for the scheduler
	*/
	readonly: boolean;

	/**
	 * activates the read-only mode for the lightbox
	*/
	readonly_form: boolean;

	/**
	 * defines the behavior of the recurrences that transfer to the next month
	*/
	recurring_overflow_instances: string;

	/**
	 * specifies working days that will affect the recurring event when the user selects the ""Every workday" option in the lightbox
	*/
	recurring_workdays: any[];

	/**
	 * sets the date format of the 'End by' field in the 'recurring' lightbox
	*/
	repeat_date: string;

	/**
	 * prevents including past days to events with the 'weekly' recurrence
	*/
	repeat_precise: boolean;

	/**
	 * enables the possibility to resize multi-day events in the Month view by drag-and-drop
	*/
	resize_month_events: boolean;

	/**
	 * enables the possibility to resize single-day events in the Month view by drag-n-drop
	*/
	resize_month_timed: boolean;

	/**
	 * makes lightbox responsive on small screens
	*/
	responsive_lightbox: boolean;

	/**
	 * enables RTL (right-to-left) mode for the scheduler
	*/
	rtl: boolean;

	/**
	 * sets the initial position of the vertical scroll in the scheduler (an hour in the 24-hour clock format)
	*/
	scroll_hour: number;

	/**
	 * specifies the delimiter that will be used to separate several sections/units in the related data property of the event
	*/
	section_delimiter: string;

	/**
	 * shows/hides the select bar in the event's box
	*/
	select: boolean;

	/**
	 * allows preventing short events from overlapping
	*/
	separate_short_events: boolean;

	/**
	 * enables converting server-side dates from UTC to a local time zone (and backward) while sending data to the server
	*/
	server_utc: boolean;

	/**
	 * enables showing error alerts in case of unexpected behavior
	*/
	show_errors: boolean;

	/**
	 * enables showing a progress/spinner while data is loading (useful for dynamic loading)
	*/
	show_loading: boolean;

	/**
	 * activates/disables the 'quick_info' extension (pop-up task's details form)
	*/
	show_quick_info: boolean;

	/**
	 * sets the start day of weeks
	*/
	start_on_monday: boolean;

	/**
	 * sets the minimum step (in minutes) for event's time values
	*/
	time_step: number;

	/**
	 * defines that during event resizing the end date of the event can be swapped for the start date (after the end date becomes scheduled before the start one)
	*/
	timeline_swap_resize: boolean;

	/**
	 * enables/disables the touch support in the scheduler
	*/
	touch: boolean|string;

	/**
	 * defines the time period in milliseconds that is used to differ the long touch gesture from the scroll gesture
	*/
	touch_drag: number|boolean;

	/**
	 * enables/disables switching active dates using the horizontal swipe gesture on mobiles
	*/
	touch_swipe_dates: boolean;

	/**
	 * enables/disables prompting messages in the right top corner of the screen
	*/
	touch_tip: boolean;

	/**
	 * disables dhtmxlScheduler's tooltips on the touch devices
	*/
	touch_tooltip: boolean;

	/**
	 * updates the mode when the scheduler fully repaints itself on any action
	*/
	update_render: boolean;

	/**
	 * defines that events occupy the whole width of the cell
	*/
	use_select_menu_space: boolean;

	/**
	 * defines whether role="application" will be used for the main scheduler container and minicalendar elements
	*/
	wai_aria_application_role: boolean;

	/**
	 * enables WAI-ARIA support to make the component recognizable for screen readers
	*/
	wai_aria_attributes: boolean;

	/**
	 * highlights the selected event in the Week Agenda view
	*/
	week_agenda_select: boolean;

	/**
	 * sets the format of the date in the sub-header of the Month view
	*/
	week_date: string;

	/**
	 * enables/disables displaying of the standard (wide) lightbox instead of the short one
	*/
	wide_form: boolean;

	/**
	 * sets the date format that is used to parse data from the data set
	*/
	xml_date: string;

	/**
	 * sets the number of rows in the Year view
	*/
	year_x: number;

	/**
	 * sets the number of columns in the Year view
	*/
	year_y: number;

	[customConfig: string]: any;
}

export interface SchedulerDateHelpers {
	add(origin: Date, count: number, unit: string): Date;
	copy(origin: Date): Date;
	date_part(origin: Date): Date;
	time_part(origin: Date): Date;
	day_start(origin: Date): Date;
	month_start(origin: Date): Date;
	week_start(origin: Date): Date;
	year_start(origin: Date): Date;
	getISOWeek(origin: Date): number;
	getUTCISOWeek(origin: Date): number;
	date_to_str(format: string): any;
	str_to_date(format: string): any;
	convert_to_utc(origin: Date): Date;
	to_fixed(value: number): string;
	[customMethod: string]: any;
}

export interface SchedulerHotkeys {
	edit_save: number;
	edit_cancel: number;
}

export interface SchedulerLocaleDate {
	month_full: string[];
	month_short: string[];
	day_full: string[];
	day_short: string[];
}

export interface SchedulerLocaleLabels {
	dhx_cal_today_button: string;
	day_tab: string;
	week_tab: string;
	month_tab: string;
	new_event: string;
	icon_save: string;
	icon_cancel: string;
	icon_details: string;
	icon_edit: string;
	icon_delete: string;
	confirm_closing: string;
	confirm_deleting: string;
	section_description: string;
	section_time: string;
	full_day: string;
	confirm_recurring: string;
	section_recurring: string;
	button_recurring: string;
	button_recurring_open: string;
	button_edit_series: string;
	button_edit_occurrence: string;
	agenda_tab: string;
	date: string;
	description: string;
	year_tab: string;
	week_agenda_tab: string;
	grid_tab: string;
	drag_to_create: string;
	drag_to_move: string;
	message_ok: string;
	message_cancel: string;
	next: string;
	prev: string;
	year: string;
	month: string;
	day: string;
	hour: string;
	minute: string;
	repeat_radio_day: string;
	repeat_radio_week: string;
	repeat_radio_month: string;
	repeat_radio_year: string;
	repeat_radio_day_type: string;
	repeat_text_day_count: string;
	repeat_radio_day_type2: string;
	repeat_week: string;
	repeat_text_week_count: string;
	repeat_radio_month_type: string;
	repeat_radio_month_start: string;
	repeat_text_month_day: string;
	repeat_text_month_count: string;
	repeat_text_month_count2_before: string;
	repeat_text_month_count2_after: string;
	repeat_year_label: string;
	select_year_day2: string;
	repeat_text_year_day: string;
	select_year_month: string;
	repeat_radio_end: string;
	repeat_text_occurences_count: string;
	repeat_radio_end2: string;
	repeat_radio_end3: string;
	month_for_recurring: string[];
	day_for_recurring: string[];
	[customLabel: string]: any;
}

export interface SchedulerLocale {
	date: SchedulerLocaleDate;
	labels: SchedulerLocaleLabels;
}

export interface SchedulerSizes {

	/**
	* the height of day cells in the month view
	*/
	bar_height: number;

	/**
	* the width of the event text input	140	day
	*/
	editor_width: number;

	/**
	* increases the length of the lightbox
	*/
	lightbox_additional_height: number;

	/**
	* the width of the date column in the Map view
	*/
	map_date_width: number;

	/**
	* the width of the description column in the Map view
	*/
	map_description_width: number;

	/**
	* the left margin of the main scheduler area
	*/
	margin_left: number;

	/**
	* the bottom margin of the main scheduler area
	*/
	margin_top: number;

	/**
	* the width of the selection menu
	*/
	menu_width: number;

	/**
	* the minimal height of the event box
	*/
	min_event_height: number;

	/**
	* the top offset of an event in a cell in the month view
	*/
	month_scale_height: number;

	/**
	* the height of the navigation bar
	*/
	nav_height: number;

	/**
	* the height of the X-Axis
	*/
	scale_height: number;

	/**
	* the width of the Y-Axis
	*/
	scale_width: number;

	/**
	* the width of the scrollbar area
	*/
	scroll_width: number;
}

export interface SchedulerEnterprise {
	getSchedulerInstance(): SchedulerStatic;
}

export interface SchedulerStatic {

	/**
	 * scheduler ajax module
	*/
	ajax: any;

	/**
	 * defines configuration options for dates, scale, controls
	*/
	config: SchedulerConfigOptions;

	/**
	 * a set of date formatting methods
	*/
	date: SchedulerDateHelpers;

	/**
	 * a set of flags which describe current environment
	*/
	env: any;

	/**
	 * a set of methods for Scheduler localization
	*/
	i18n: any;

	/**
	 * specifies ICal serialization and parsing
	*/
	ical: any;

	/**
	 * specifies JSON serialization and parsing
	*/
	json: any;

	/**
	 * defines the hot keys for the scheduler
	*/
	keys: SchedulerHotkeys;

	/**
	 * a locale object (region-specific labels) of the scheduler
	*/
	locale: SchedulerLocale;

	/**
	 * stores the configuration objects of all timelines specified on the page
	*/
	matrix: any;

	/**
	 * returns the current skin of the scheduler
	*/
	skin: string;

	/**
	 * defines formatting of the templates for dates, titles and tooltips in the scheduler
	*/
	templates: SchedulerTemplates;

	/**
	 * displays tooltips for events
	*/
	tooltip: any;

	/**
	 * returns the version of dhtmlxScheduler
	*/
	version: string;

	/**
	 * specifies sizes of the scheduler's elements
	*/
	xy: SchedulerSizes;

	/**
	 * DataProcessor constructor
	 * @param url url to the data feed
	*/
	DataProcessor(url: string): void;

	/**
	 * Promise object constructor
	 * @param executor a callback used to initialize the promise
	*/
	Promise(executor: SchedulerCallback): any;

	/**
	 * adds a new event
	 * @param event the event object
	*/
	addEvent(event: any): string;

	/**
	 * adds a new event and opens the lightbox to confirm
	 * @param event the event object
	*/
	addEventNow(event: any): string;

	/**
	 * marks dates, but with certain settings makes blocking (allows setting custom styling for the limit)
	 * @param config the configuration object of the timespan to mark/block
	*/
	addMarkedTimespan(config: any): number;

	/**
	 * adds a section to the currently active view
	 * @param section the object of the section to add
	 * @param parent_id the id of the parent section. Pass 'null' if you are adding a section to the root
	*/
	addSection(section: any, parent_id: string): boolean;

	/**
	 * adds a new keyboard shortcut
	 * @param shortcut the key name or the name of keys combination for a shortcut (<a href="keyboard_navigation.md#shortcutsyntax">shortcut syntax</a>)
	 * @param handler the handler of the shortcut call
	 * @param scope optional, (optional) the name of the context element to attach the handler function to (<a href="keyboard_navigation.md#scopes">list of scopes</a>)
	*/
	addShortcut(shortcut: string, handler: SchedulerCallback, scope?: string): void;

	/**
	 * calls an alert message box
	 * @param config the alert box's configuration
	*/
	alert(config: any): HTMLElement;

	/**
	 * if the specified expression is false, an errorMessage is shown in the red popup at the top right corner of the screen
	 * @param expression true to assert the expression, false - if assertion fails
	 * @param errorMessage an error message that will be shown in the red popup
	*/
	assert(expression: boolean, errorMessage: string): void;

	/**
	 * attaches the handler to an inner event of dhtmlxScheduler
	 * @param name the event's name, case-insensitive
	 * @param handler the handler function
	 * @param settings optional, an <a href="#propertiesofsettingsobject">object with settings</a> for the event handler
	*/
	attachEvent(name: SchedulerEventName, handler: SchedulerCallback, settings: any): string;

	/**
	 * makes the scheduler reflect all data changes in the Backbone model and vice versa
	 * @param events the Backbone data collection
	*/
	backbone(events: any): void;

	/**
	 * creates a new function that, when called, has its <i>this</i> keyword set to the provided value
	 * @param method the target function
	 * @param thisArg the value to be passed as the <i>this</i> parameter to the target function when the bound function is called
	*/
	bind(method: SchedulerCallback, thisArg: any): SchedulerCallback;

	/**
	 * blocks the specified date and applies the default 'dimmed' style to it.
	 * @param date a date to block ( if a number is provided, the parameter will be treated as a week <br> day: '0' index refers to Sunday,'6' - to Saturday )
	 * @param time_points an array <b>[start_minute,end_minute,..,start_minute_N,end_minute_N]</b>, <br> where each pair sets a certain limit range. The array can have any number of such pairs
	 * @param items optional, defines specific items of  view(s) to block
	*/
	blockTime(date: Date|number, time_points: any[], items?: any): void;

	/**
	 * calls an inner event
	 * @param name the event's name, case-insensitive
	 * @param params an array of the event-related data
	*/
	callEvent(name: string, params: any[]): boolean;

	/**
	 * changes the event's id
	 * @param id the current event's id
	 * @param new_id the new event's id
	*/
	changeEventId(id: string, new_id: string): void;

	/**
	 * checks whether the specified event occurs at the time that has already been occupied by another event(s)
	 * @param event the event object
	*/
	checkCollision(event: any): boolean;

	/**
	 * checks whether an event has some handler(s) specified
	 * @param name the event's name
	*/
	checkEvent(name: SchedulerEventName): boolean;

	/**
	 * checks whether an event resides in a timespan of a specific type
	 * @param event the event object
	 * @param timespan the timespan's type
	*/
	checkInMarkedTimespan(event: any, timespan: string): boolean;

	/**
	 * checks whether the specified event takes place at the blocked time period
	 * @param event the event object
	*/
	checkLimitViolation(event: any): boolean;

	/**
	 * removes all events from the scheduler
	*/
	clearAll(): void;

	/**
	 * closes all sections in the currently active view
	*/
	closeAllSections(): void;

	/**
	 * closes the specified section in the currently active view
	 * @param section_id the section's id
	*/
	closeSection(section_id: string): void;

	/**
	 * collapses the expanded scheduler back to the normal size
	*/
	collapse(): void;

	/**
	 * calls a confirm message box
	 * @param config the confirm box's configuration
	*/
	confirm(config: any): HTMLElement;

	/**
	 * creates a deep copy of provided object
	 * @param event the object that needs to be copied
	*/
	copy(event: any): any;

	/**
	 * creates a new dataProcessor instance and attaches it to scheduler
	 * @param config dataProcessor configuration object
	*/
	createDataProcessor(config: any): any;

	/**
	 * creates the Grid view in the scheduler
	 * @param config the configuration object of the Grid view
	*/
	createGridView(config: any): void;

	/**
	 * creates the Timeline view in the scheduler
	 * @param config the configuration object of the Timeline view
	*/
	createTimelineView(config: any): void;

	/**
	 * creates the Units view in the scheduler
	 * @param config the configuration object of the Units view
	*/
	createUnitsView(config: any): void;

	/**
	 * returns false if the provided argument is undefined, otherwise true
	 * @param event the object that should be checked
	*/
	defined(event: any): boolean;

	/**
	 * deletes all sections from  the currently active view
	*/
	deleteAllSections(): void;

	/**
	 * deletes the specified event
	 * @param id the event's id
	*/
	deleteEvent(id: string|number): void;

	/**
	 * removes marking/blocking set by the addMarkedTimespan() method
	 * @param id optional, the timespan's id
	*/
	deleteMarkedTimespan(id?: string): void;

	/**
	 * deletes a section from the currently active view
	 * @param section_id the section's id
	*/
	deleteSection(section_id: string): boolean;

	/**
	 * destroys previously created mini-calendar
	 * @param name optional, the mini-calendar's object (if not specified, the scheduler attempts <br> to destroy the last created mini calendar)
	*/
	destroyCalendar(name?: any): void;

	/**
	 * destroys the scheduler instance
	*/
	destructor(): void;

	/**
	 * detaches a handler from an event (which was attached before by the attachEvent method)
	 * @param id the event's id
	*/
	detachEvent(id: string): void;

	/**
	 * opens the inline editor to alter the event's text  (the editor in the event's box)
	 * @param id the event's id
	*/
	edit(id: string): void;

	/**
	 * closes the inline event editor, if it's currently open
	 * @param id the event's id
	*/
	editStop(id: string): void;

	/**
	 * closes the lightbox
	 * @param mode if set to <i>true</i>, the changes, made in the lightbox, will be saved before closing. <br> If - <i>false</i>, the changes will be cancelled.
	 * @param box optional, the HTML container for the lightbox
	*/
	endLightbox(mode: boolean, box?: HTMLElement): void;

	/**
	 * attaches an event handler to an HTML element
	 * @param node the HTML node or its id
	 * @param event the name of an HTML event (without the 'on' prefix)
	 * @param handler the event handler
	 * @param master optional, an object that the <i>this</i> keyword refers to
	*/
	event(node: HTMLElement|string, event: string, handler: SchedulerCallback, master?: any): string;

	/**
	 * removes an event handler from an HTML element
	 * @param id the id of an event handler
	*/
	eventRemove(id: string): void;

	/**
	 * expands the scheduler to the full screen view
	*/
	expand(): void;

	/**
	 * exports a Scheduler into the PDF format
	 * @param _export_ an object with export settings (see the details)
	*/
	exportToPDF(_export_: any): void;

	/**
	 * exports a Scheduler into the PNG format
	 * @param _export_ an object with export settings (see the details)
	*/
	exportToPNG(_export_: any): void;

	/**
	 * sets focus on the scheduler
	*/
	focus(): void;

	/**
	 * gives access to the objects of lightbox's sections
	 * @param name the name of a lightbox section
	*/
	formSection(name: string): any;

	/**
	 * returns the current cursor-pointed date and section (if defined)
	 * @param e a native event object
	*/
	getActionData(e: Event): any;

	/**
	 * returns the event object by its id
	 * @param event_id the event's id
	*/
	getEvent(event_id: string|number): any;

	/**
	 * gets the event's end date
	 * @param id the event's id
	*/
	getEventEndDate(id: string): Date;

	/**
	 * gets the event's start date
	 * @param id the event's id
	*/
	getEventStartDate(id: string): Date;

	/**
	 * gets the event's text
	 * @param id the event's id
	*/
	getEventText(id: string): string;

	/**
	 * returns a collection of events which occur during the specified period
	 * @param from optional, the start date of the period
	 * @param to optional, the end date of the period
	*/
	getEvents(from?: Date, to?: Date): any[];

	/**
	 * gets the label of a select control in the lightbox
	 * @param property the name of a data property that the control is mapped to
	 * @param key the option's id. This parameter is compared with the event's data property <br> to assign the select's option to an event
	*/
	getLabel(property: string, key: string|number): string;

	/**
	 * gets the lightbox's HTML object element
	*/
	getLightbox(): HTMLElement;

	/**
	 * returns all occurrences of a recurring event
	 * @param id the id of a recurring event
	 * @param number the maximum number of occurrences to return (by default, 100)
	*/
	getRecDates(id: string, number: number): any;

	/**
	 * gets the object of the currently displayed event
	 * @param id the event's id
	*/
	getRenderedEvent(id: string): HTMLElement;

	/**
	 * gets the object of the specified section in the currently active view
	 * @param section_id the section's id
	*/
	getSection(section_id: string): any;

	/**
	 * gets a key navigation shortcut handler
	 * @param shortcut the key name or the name of keys combination for a shortcut (<a href="keyboard_navigation.md#shortcutsyntax">shortcut syntax</a>)
	 * @param scope optional, (optional) the name of the context element to attach the handler function to (<a href="keyboard_navigation.md#scopes">list of scopes</a>)
	*/
	getShortcutHandler(shortcut: string, scope?: string): SchedulerCallback;

	/**
	 * gets the current state of the scheduler
	*/
	getState(): any;

	/**
	 * gets the user data associated with the specified event
	 * @param id the event's id
	 * @param name the user data name
	*/
	getUserData(id: string, name: string): any;

	/**
	 * returns a view object by its name. If no name is specified, returns the current view
	 * @param name optional, optional, the name of the view
	*/
	getView(name?: string): any;

	/**
	 * hides the lightbox modal overlay that blocks interactions with the remaining screen
	 * @param box optional, an element to hide
	*/
	hideCover(box?: HTMLElement): void;

	/**
	 * hides the lightbox without saving it
	*/
	hideLightbox(): void;

	/**
	 * hides the pop-up event form (if it's currently active)
	*/
	hideQuickInfo(): void;

	/**
	 * highlights the event's duration on the time scale
	 * @param event the event object
	*/
	highlightEventPosition(event: any): void;

	/**
	 * a constructor of a dhtmlxScheduler object
	 * @param container an HTML container (or its id) where a dhtmlxScheduler object will be initialized
	 * @param date optional, the initial date of the scheduler (by default, the current date)
	 * @param view optional, the name of the initial view (by default, "week")
	*/
	init(container: string|HTMLElement, date?: Date, view?: string): void;

	/**
	 * inverts the specified time zones
	 * @param zones an array **[start_minute,end_minute,..,start_minute_N,end_minute_N]** <br >where each pair sets a certain limit range (in minutes). The array can have any <br> number of such pairs
	*/
	invertZones(zones: any[]): void;

	/**
	 * checks whether the calendar is currently opened in the scheduler
	*/
	isCalendarVisible(): boolean|HTMLElement;

	/**
	 * checks whether the specified event one-day or multi-day
	 * @param event the event object
	*/
	isOneDayEvent(event: any): boolean;

	/**
	 * checks whether a view with the specified name exists
	 * @param name the view name
	*/
	isViewExists(name: string): boolean;

	/**
	 * 'says' to change the active date in the mini calendar each time, the active date in the scheduler is changed
	 * @param calendar the mini calendar object
	 * @param shift a function that defines the difference between active dates in the mini-calendar <br> and the scheduler. The function takes the scheduler's date as a parameter and <br> returns the date that should be displayed in the mini calendar
	*/
	linkCalendar(calendar: any, shift: SchedulerCallback): void;

	/**
	 * loads data to the scheduler from an external data source
	 * @param url the server-side URL (may be a static file or a server-side script which outputs data in one of the supported formats)
	 * @param callback optional, the callback function
	*/
	load(url: string, callback?: SchedulerCallback): void;

	/**
	 * applies a css class to the specified date
	 * @param calendar the calendar object
	 * @param date the date to mark
	 * @param css the name of a css class
	*/
	markCalendar(calendar: any, date: Date, css: string): void;

	/**
	 * marks and/or blocks date(s) by applying the default or a custom style to them. Marking is cancelled right after any internal update in the app. Can be used for highlighting
	 * @param config the configuration object of the timespan to mark/block
	*/
	markTimespan(config: any): void;

	/**
	 * calls a message box of the specified type
	 * @param config the message box's configuration
	*/
	message(config: any): HTMLElement;

	/**
	 * adds properties of the 'source' object into the 'target' object
	 * @param target the target object
	 * @param source the source object
	 * @param force if true, properties of the 'source' will overwrite matching properties of the 'target', if there are any. If false, properties that already exist in the 'target' will be omitted
	*/
	mixin(target: any, source: any, force: boolean): void;

	/**
	 * calls a modalbox
	 * @param config the modal box's configuration
	*/
	modalbox(config: any): HTMLElement;

	/**
	 * opens all sections in the currently active view (if the opened view isn't Timeline in the 'Tree' mode - the method will be ignored)
	*/
	openAllSections(): void;

	/**
	 * opens the specified section in the currently active view (if the opened view isn't Timeline in the 'Tree' mode - the method will be ignored)
	 * @param section_id the section's id
	*/
	openSection(section_id: string): void;

	/**
	 * loads data from a client-side resource
	 * @param data a string or object which represents data
	*/
	parse(data: any): void;

	/**
	 * activates specified extensions
	 * @param ext extensions that need to be activated
	*/
	plugins(ext: any): void;

	/**
	 * removes a keyboard shortcut
	 * @param shortcut the key name or the name of keys combination for a shortcut (<a href="keyboard_navigation.md#shortcutsyntax">shortcut syntax</a>)
	 * @param scope optional, (optional) the element to which the shortcut is attached (<a href="keyboard_navigation.md#scopes">list of scopes</a>)
	*/
	removeShortcut(shortcut: string, scope?: any): void;

	/**
	 * repaints the scheduler
	 * @param date optional, the date to display
	 * @param view optional, the name of a view to display
	*/
	render(date?: Date, view?: string): void;

	/**
	 * creates a mini calendar
	 * @param config the calendar configuration object
	*/
	renderCalendar(config: any): void;

	/**
	 * generates HTML content for a custom event's box
	 * @param container the event container
	 * @param event the event object
	*/
	renderEvent(container: HTMLElement, event: any): boolean;

	/**
	 * removes the current lightbox's HTML object element
	*/
	resetLightbox(): void;

	/**
	 * scrolls the specified number of units in the Units view
	 * @param step the number of units to scroll (<i>set the positive value to scroll units to the right <br> side,  the negative value - to the left side</i>).
	*/
	scrollUnit(step: number): void;

	/**
	 * selects the specified event
	 * @param id the event's id
	*/
	select(id: string): void;

	/**
	 * serializes all events loaded into the scheduler
	*/
	serialize(): any[];

	/**
	 * defines a named collection that can be loaded into Units, Timeline views, or the Lightbox
	 * @param list_name the name of a list
	 * @param options optional, optional, an array of options
	*/
	serverList(list_name: string, options?: any[]): any[];

	/**
	 * displays the specified view and date
	 * @param date optional, the date to display
	 * @param view optional, the name of a view to display
	*/
	setCurrentView(date?: Date, view?: string): void;

	/**
	 * adds a new event to the scheduler's data pool
	 * @param id the event's id
	 * @param event the event object
	*/
	setEvent(id: string|number, event: any): void;

	/**
	 * sets the event's end date
	 * @param id the event's id
	 * @param date the new end date of the event
	*/
	setEventEndDate(id: string, date: Date): void;

	/**
	 * sets the event's start date
	 * @param id the event's id
	 * @param date the new start date of the event
	*/
	setEventStartDate(id: string, date: Date): void;

	/**
	 * sets the event's text
	 * @param id the event's id
	 * @param text the new text of the event
	*/
	setEventText(id: string, text: string): void;

	/**
	 * forces the lightbox to resize
	*/
	setLightboxSize(): void;

	/**
	 * sets the mode that allows loading data by parts (enables the dynamic loading)
	 * @param mode the loading mode
	*/
	setLoadMode(mode: string): void;

	/**
	 * sets the user data associated with the specified event
	 * @param id the event's id
	 * @param name the user data name
	 * @param value the user data value
	*/
	setUserData(id: string, name: string, value: any): void;

	/**
	 * shows the lightbox modal overlay that blocks interactions with the remaining screen
	 * @param box optional, an element to hide
	*/
	showCover(box?: HTMLElement): void;

	/**
	 * shows and highlights the specified event in the current or specified view
	 * @param id the event's id
	 * @param view optional, the view name
	*/
	showEvent(id: string, view?: string): void;

	/**
	 * opens the lightbox for the specified event
	 * @param id the event's id
	*/
	showLightbox(id: string): void;

	/**
	 * displays the pop-up event form for the specified event
	 * @param id the event's id
	*/
	showQuickInfo(id: string): void;

	/**
	 * shows a custom lightbox in the specified HTML container centered on the screen
	 * @param id the event's id
	 * @param box the lightbox's HTML container
	*/
	startLightbox(id: string, box: HTMLElement): void;

	/**
	 * converts scheduler's data to the ICal format
	 * @param header optional, sets the value for the content's header field
	*/
	toICal(header?: string): string;

	/**
	 * converts scheduler's data into the JSON format
	*/
	toJSON(): string;

	/**
	 * exports the  current view to a PDF document (can be used for printing)
	 * @param url the path to the server-side PDF converter
	 * @param mode optional, the color map of the resulting PDF document
	*/
	toPDF(url: string, mode?: string): void;

	/**
	 * exports several scheduler's views to a PDF document (can be used for printing)
	 * @param from the date to start export events from
	 * @param to the date to export events until
	 * @param view the name of a view that the export should be applied to
	 * @param path the path to the php file which generates a PDF file (<a href="pdf.md#configuringservice">details</a>)
	 * @param color the color map in use
	*/
	toPDFRange(from: Date, to: Date, view: string, path: string, color: string): void;

	/**
	 * converts scheduler's data into the XML format
	*/
	toXML(): string;

	/**
	 * generates a unique ID (unique inside the current scheduler, not GUID)
	*/
	uid(): number;

	/**
	 * removes blocking set by the blockTime() method
	 * @param days (<i>Date, number,array, string</i>) days that should be limited
	 * @param zones optional, the period in minutes that should be limited. Can be set to 'fullday' value <br> to limit the entire day
	 * @param sections optional, allows blocking date(s) just for specific items of specific views. BTW, the specified date(s) will be blocked just in the related view(s)
	*/
	unblockTime(days: any, zones?: any[], sections?: any): void;

	/**
	 * removes a css class from the specified date
	 * @param calendar the mini calendar object
	 * @param date the date to unmark
	 * @param css the name of a css class to remove
	*/
	unmarkCalendar(calendar: any, date: Date, css: string): void;

	/**
	 * removes marking/blocking set by the markTimespan() method
	 * @param divs a timespan to remove marking/blocking from (or an array of timespans)
	*/
	unmarkTimespan(divs: HTMLElement|any[]): void;

	/**
	 * unselects the specified event
	 * @param id optional, the event's id (if not specified, the currently selected event will be unselected)
	*/
	unselect(id?: string): void;

	/**
	 * displays the specified date in the mini calendar
	 * @param calendar the mini calendar object
	 * @param new_date a new date to display in the mini calendar
	*/
	updateCalendar(calendar: any, new_date: Date): void;

	/**
	 * updates the specified collection with new options
	 * @param collection the name of the collection to update
	 * @param options the new values of the collection
	*/
	updateCollection(collection: string, options: any[]): boolean;

	/**
	 * updates the specified event
	 * @param id the event's id
	*/
	updateEvent(id: string): void;

	/**
	 * displays the specified view and date (doesn't invoke any events)
	 * @param date optional, (optional) the date to set
	 * @param view optional, (optional) the view name
	*/
	updateView(date?: Date, view?: string): void;
}

export declare var scheduler: SchedulerStatic;

export declare var Scheduler: SchedulerEnterprise;
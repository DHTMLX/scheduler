### 5.3.13

Fix the issue that caused the edited recurring series to disappear after closing Lightbox via scheduler.hideLightbox
Fix the issue with disabling the auto_end_date config dynamically
Fix the incorrect work of modified instances of a recurring series when the start_date of the series event contains non-empty milliseconds part
Fix the issue with the Keyboard Navigation module that changed the scroll position of the scheduler when resizing an event in some cases
Now, when Keyboard Navigation is enabled, "trap modal focus" of the Lightbox and dhtmlx.modalbox should respect the tabindex of elements
Now, when the "Today" button is pressed, the Keyboard Navigation focuses on the first cell of the Today column rather than the first cell of the first column of the Week View
Fix the incorrect work of scheduler.showEvent in the Timeline view when the Smart Rendering is enabled

### 5.3.12

- Fix the issue with Tree Timeline view which caused it to enter an infinite loop when the list of sections contains duplicated keys
- Fix the incorrect work of the monthly recurring events when After N occurrences limitation is used
- Fix the incorrect work of the recurring_overflow_instances config in the lastDay mode which caused the event instance to lose the minutes/seconds part of its date
- Fix the issue with blocking the dragged event from being moved out of the scheduler when returning false from the onBeforeEventDragOut event
- The default CSS of Tree Timeline section labels is changed to prevent unexpected line break when the label is too long for the cell

### 5.3.11

- Fix the script error occurred when changing dates in the scheduler when the Cookie extension is enabled
- Fix the incorrect value of the Content-Type header when the transaction mode of dataProcessor is set to "JSON"
- CSS corrections for the Lightbox on mobile devices when the Terrace skin is used
- Fix issues with recurring events that caused some events to transfer to the next month when the target month doesn't have the appropriate date and "monthly" recurrence is used
- Fix the issue that caused the modal overlay to stay visible after the Lightbox was closed via calling scheduler.updateCollection()
- The onBeforeEventPasted API event is added in order to allow validation or modifying the position of the pasted event
- New recurring_overflow_instances configuration option is added

### 5.3.10

- Fix the incorrect work of column_width when some units are hidden
- Fix touch support on iPad on Safari
- Fix the incorrect work of the onDblClick and onClick events when handling false result in Grid view
- Fix the incorrect work of drag and drop in Timeline view which caused events to move to the next section after clicking on the bottom border of the event bar

### 5.3.9

- Fix the incorrect display of a scrollable timeline after scrolling it down and dragging and dropping the last row
- Fix the incorrect display of events which happened after switching between two scrollable timelines
- Fix script error that fired when a timeline was scrolled on touch devices
- Fix the incorrect Content-Type of POST/PUT/DELETE requests sent by dataProcessor when custom headers are specified
- The timeline_row_class template for CSS class of a timeline row is added

### 5.3.8

- Fix the incorrect height of the modal overlay of the Lightbox
- Fix the incorrect sizes of the scheduler when the scheduler is initialized inside Bootstrap modals
- Scheduler now automatically tracks the container resizes and adjusts its own sizes accordingly
- Add Mini Calendar control for the header config

### 5.3.7

- Fix incorrect work of Container Autoresize extension with the scrollable timeline
- Fix the incorrect work of show_unassigned option of the Timeline view

### 5.3.6

- Fix the incorrect displaying of events in the Day Timeline view when scrollable:true or smart_rendering:true is used
- Fix the script error which happened in the Day Timeline view after dragging a new event when scrollable:true was used together with dataProcessor
- Fix the script error which was thrown if no date element was included in the header config
- Fix styling of the day tab in the Material skin when the header config does not contain a week or month tab


### 5.3.5

- Fix styling of the 'next' button on the right side of the navigation panel in Terrace skin when the scheduler is initialized using header config
- Fix the incorrect work of the URL extension which failed to highlight events by url in some cases
- Fix the incorrect work of the Material skin when scheduler styles are loaded using the @import command
- If neither header config nor default markup is specified while initializing the scheduler, a default value for the scheduler header will be auto-generated to escape a script error

### 5.3.4

- Fix the incorrect work of the vertical scroll in a scrollable timeline when the mouse pointer is over the sections column
- Fix the incorrect serialization of nested objects by the dataProcessor
- Fix the script error which fired when creating a new event using a custom lightbox

### 5.3.3

- More informative error messages for common misconfigurations are added
- HTML markup of some public samples is cleaned up

### 5.3.2

- Fix incorrect work of the click handler in the Mini Calendar when a custom calendar_date template is defined
- Fix rounding of the end date of an event when it is resized in Day/Week views

### 5.3.1

- Disable responsive lightbox by default

### 5.3.0

- RTL support
- Improved mobile responsiveness
- Integration with DHTMLX Suite 6 Layout
- The year range setting is added to the Date/Time lightbox control
- Changing Scheduler dates by horizontal swipe is disabled by default
- Add a way to set scheduler header from config rather than from the markup
- The render method is added as a more intuitive alias for setCurrentView() and updateView()
- The hideLightbox method is added to the public API
- Fix vertical config of multiselect control, which didn't work in the Material skin

### 5.2.5

- Fix regression of ext/dhtmlxscheduler_tooltip.js introduced in 5.2.4

### 5.2.4

- Fix the issue with the readonly form which didn't allow changing the configuration of the lightbox after initialization of Scheduler
- Fix the issue with Angular 8 compatibility

### 5.2.3

- Fix incorrect animation of event bars in the scrollable Timeline during drag and drop
- Fix the issue in Day View / Week View which caused event to jump to the multiday section when moved to the end of a day
- Fix a regression in scroll_position setting of the scrollable Timeline
- Fix the issue which caused chunks of multi-section events to obtain incorrect position after the mouse click
- Fix the script error fired from the tooltip in cell mode of the Timeline view when scheduler.ignore_timeline is used

### 5.2.2

- Add more helpful error messages for common misconfigurations
- Fix the script error which was thrown from a double click on any label in a readonly form
- Fix incorrect displaying of the Timeline view when smart_rendering:true is used together with section_autoheight:false
- Fix the script error which was thrown from the Year view when days containing events were hidden using the scheduler.ignore_year method

### 5.2.1

- Fix the issue with scheduler.load data type detection in IE11
- Fix timeline.scrollTo method in timeline without horizontal scrollbar
- Fix not working scheduler.showEvent method in the Timeline view
- Fix incorrect behavior of vertical scroll in scrollable timeline with smart_rendering:false
- Fix incorrect event position in the multiday units view with the multisection extension when the step option is specified
- Fix incorrect size of some events in Daily Timeline

### 5.2.0

- Custom HTML content for timeline cells (PRO version)
- Drag-n-drop of events by the body
- The data format parameter of load and parse became optional, scheduler now detects format automatically
- Date-to-string functions can now auto-detect the date strings format, if it doesn't match the provided one
- dhtmlxConnector library is no longer shipped with the dhtmlxScheduler package
- dhtmlxScheduler package samples no longer require a php/apache server to work
- New methods for the timeline object
- The Multiselect control allows loading options in the JSON format
- onLoadStart, onBeforeParse, onParse, onLoadEnd are introduced instead of the deprecated - onXLS and onXLE events
- Fix incorrect behavior which happened when clearAll was called before scheduler.endLightbox(false) while creating a new event
- Fix flickering issue with timeline horizontal scroll on iPad
- Fix various display issues with scrollable timeline
- The Units view {unitsName}_scale_text now provides a section date in arguments
- Fix script error which was thrown from the Units view during an event creation if no sections are loaded
- The Multiselect control now expects only boolean values for vertical property vertical:false - string values as in vertical:"false" will be interpreted as boolean true

### 5.1.6

- Fix incorrect position of events scheduled on Sat-Sun with start_on_monday = false in Month view
- Fix script error in a scrollable timeline with the current time marker
- Fix incorrect argument value of the `onYScaleClick` handler in a scrollable timeline after horizontal scrolling
- Fix the bug that caused a scrollable timeline to be rendered empty until the next refresh after reloading sections
- Fix the bug with a scrollable timeline which caused some cells of Tree timeline folders not being rendered after horizontal scrolling
- Fix unexpected behavior of event resize with the 'all_timed' extension, only the last event chunk should be resizeable
- Fix event disappearing during resize in the all_timed="short" mode

### 5.1.1

- Fix keyboard navigation focus not being highlighted in the timeline
- Fix incorrect initial height of timeline_scale_header if second_scale specified
- Fix bug with event_min_dy not affecting section height if only one event is located inside a section
- Fix bug with quick info popup self-closing if the same event is clicked multiple times
- Fix script error which fired after deleting event in year view
- Fix incorrect initial display of scrolled timeline if no events loaded into the scheduler
- Fix ability to enable smart rendering for non-scrollable timelines
- Fix issue with scroll position resetting on date change when key_nav extension is enabled in the timeline
- Fix incorrect value 'olddate' argument of onBeforeViewChange event in some cases
- Fix incorrect display of a scrollable timeline with ignored time cells
- Fix incorrect behavior if scrolling happened during drag-create of new events
- Fix onAfterSchedulerResize event not firing in Timeline view
- Performance improvement for event rendering in week view

### 5.1

- Horizontal scroll in the Timeline view
- Smart rendering and performance update for the Timeline view
- New API of the Timeline object
- Autoscroll in the Timeline view
- Ability to add a label into the header of the column with sections
- Fix false-positive onEventCollision trigger on editing of recurring events
- Fix bug when mousewheel canceled creation of new event via click and drag
- Fix incorrect placement of multi-day events in multi-day units view

### 5.0

- New Material skin
- Classic and Glossy skins are removed
- Major css overhaul
- Updated REST api integration options and documentation
- Updated touch support for Microsoft devices
- Fix compatibility issues with es6/ts imports
- Add Hebrew locale for recurring form
- Fixes in keyboard navigation support
- Add onLoadError for network and server errors
- Minor bugfixes

### 4.4.0

- High contrast color themes
- Full-featured keyboard navigation
- WAI-ARIA support
- Add initial support of Content Security Policy
- Various bugfixes

- Ability to enable markTimespan for the Month view
- Ability to remove recurring marker from a specific date added
- Ability to skip days in the Year view added
- Delimiter option of the Multiselect control
- Compatibility of external drag-n-drop with the latest dhtmlxSuite updated
- Merge CSP-improvements request from public repo

- Fix return value of addEventNow method
- Fix dataprocessor state after scheduler.clearAll
- JS errors in event handlers from SVG elements fixed
- Various bugs with Tooltip extension fixed
- Various issues with container_autosize extension fixed
- Multiple minor fixes

### 4.3.0

- "Days" mode for Timeline view was added
- Ability to present units for multiple days in the Units view
- Add ability to link events using URL extension
- Several new API events and settings
- Fixes for DST issues
- Fixed bug with creating new events on touch devices in Timeline

- Week Agenda, Grid View, Timeline view, Units View, Multisection events are available in Commercial and Enterprise editions only

### 4.2.0

- Ability to customize the layout of recurring form
- Updated dhtmlxDataProcessor - REST mode and support of JSON response format
- Updated D'n'D of the multisection events
- Add API events for handling Ajax and server errors
- Improved performance of the Timeline view
- Add config option for delayed rendering mode
- Improved data export to iCal and Excel
- Fixed compatibility with DHTMLX Suite 4.0
- Multiple minor fixes

### 4.1.0

- New 'Flat' skin
- Highlight event position on the time scale during D'n'D
- Support for multisection events in Units and Timeline views
- Ability to resize events in Month view
- Ability to D'n'D between schedulers, and drag event outside the scheduler (PRO version only)
- New PDF/PNG online export service
- Updated configuration of a Grid view
- Updated touch support, fixed multiple issues with Windows touch devices

### 4.0.1

- Minor regression, which was introduced in 4.0, are fixed

### 4.0

- Flexible time scales - some days, hours can be removed from time scale
- Ability to show "more events" links in month view
- jQuery integration
- Backbone Integration
- Default skin changed to "terrace", multi-day events are visible by default
- Alternative start-date logic for recurring events
- Documentation greatly improved

### 3.7

- Touch support ( tablets and touch monitors )
- Romanian locale added

### 3.6

- Windows8 edition added
- Extended date format configuration for lightbox form
- Sub-day navigation in timeline view
- Ability to define custom sorting in timeline view
- Multi-page export to PDF

### 3.5

- Ability to show multiple scheduler's per page (PRO version only)
- Supports loading JSON directly from Connectors
- Custom events rendering
- Timeline view improved (support for drag, resize, event height control)
- New 'dhx_terrace' skin
- New options for blocking dates
- Marking time intervals
- Highlighting time intervals
- New API methods: updateView, showEvent, getRenderedEvent, getActionData
- JSMessage included
- Grid view
- New configuration options
- Simplified access to lightbox section objects

### 3.0

- Version of scheduler for touch phones
- WeekAgenda view
- Netbook friendly lightbox form
- Cascade event display
- Simple way to define a color for event
- Drag and drop of the details form
- Custom buttons for the details form
- Current time marker in day and week view
- Multiline header for timeline view
- Configurable work-time bounds
- API to access lightbox values

### 2.3

- Map view was added
- Cell mode for Timeline view was added
- Tree mode for Timeline view was added
- Tooltips for all views were added
- Abbility to create new events by double click or by drag-and-drop in Timeline mode
- Abbility to move events by drop-and-drag in Timeline mode
- Abbility to create new events by external drag and drop
- Multiselect section for details form
- Checkbox, combo, radio - sections for details form
- Api of mini-calendar extension extended
- Custom form implementation simplified

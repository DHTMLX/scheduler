# dhtmlxScheduler #

[![dhtmlx.com](https://img.shields.io/badge/made%20by-DHTMLX-blue)](https://dhtmlx.com/)
[![npm: v.5.3.13](https://img.shields.io/badge/npm-v.5.3.13-blue.svg)](https://www.npmjs.com/package/dhtmlx-scheduler)
[![License: GPL v2](https://img.shields.io/badge/license-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)

[dhtmlxScheduler](https://dhtmlx.com/docs/products/dhtmlxScheduler) is a JavaScript event calendar that allows you to add a Google-like scheduler to your web app or website.

Intuitive drag-and-drop interface allows the end users to quickly manage events and appointments in different views: Day, Week, Month, Year, Agenda, Timeline, etc.

Very lightweight, highly customizable, and fast, dhtmlxScheduler provides a quick way to add an Ajax-based event calendar on a web page.

![DHTMLX Scheduler Demo](https://docs.dhtmlx.com/scheduler/media/init_scheduler_front.png)

[See more samples >](https://docs.dhtmlx.com/scheduler/samples/index.html)

## Getting started ##

Add files:
~~~html
<script src="dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="dhtmlxscheduler_material.css" type="text/css" charset="utf-8">
~~~

Add markup:
~~~html
<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100vh;'>
	<div class="dhx_cal_navline">
		<div class="dhx_cal_prev_button">&nbsp;</div>
		<div class="dhx_cal_next_button">&nbsp;</div>
		<div class="dhx_cal_today_button"></div>
		<div class="dhx_cal_date"></div>
		<div class="dhx_cal_tab" name="day_tab"></div>
		<div class="dhx_cal_tab" name="week_tab"></div>
		<div class="dhx_cal_tab" name="month_tab"></div>
	</div>
	<div class="dhx_cal_header"></div>
	<div class="dhx_cal_data"></div>
</div>
~~~

And initialize:
~~~js
scheduler.config.first_hour = 6;
scheduler.config.last_hour = 19;
scheduler.init('scheduler_here', new Date(2019, 3, 20), "week");
scheduler.parse([
	{ id:1, start_date: "2019-04-15 09:00", end_date: "2019-04-15 12:00", text:"English lesson" },
	{ id:2, start_date: "2019-04-16 10:00", end_date: "2019-04-16 16:00", text:"Math exam" },
	{ id:3, start_date: "2019-04-16 10:00", end_date: "2019-04-21 16:00", text:"Science lesson" },
	{ id:4, start_date: "2019-04-17 16:00", end_date: "2019-04-17 17:00", text:"English lesson" },
	{ id:5, start_date: "2019-04-18 09:00", end_date: "2019-04-18 17:00", text:"Usual event" }
]);
~~~

==> [Check the live demo](https://snippet.dhtmlx.com/5/71834aa3b)

### Complete guides ###

- [Vue.js](https://dhtmlx.com/blog/use-dhtmlx-scheduler-vue-js-framework-demo/)
- [Angular](https://dhtmlx.com/blog/angular-dhtmlxscheduler-tutorial/)
- [Node](https://docs.dhtmlx.com/scheduler/howtostart_nodejs.html)
- ASP.NET
	- [ASP.NET Core](https://docs.dhtmlx.com/scheduler/howtostart_dotnet_core.html)
	- [ASP.NET MVC](https://docs.dhtmlx.com/scheduler/howtostart_dotnet.html)
- PHP
	- [Plain PHP](https://docs.dhtmlx.com/scheduler/howtostart_plain_php.html)
	- [Laravel](https://docs.dhtmlx.com/scheduler/howtostart_php_laravel.html)
	- [Slim framework](https://docs.dhtmlx.com/scheduler/howtostart_php_slim4.html)
- [Ruby on Rails](https://docs.dhtmlx.com/scheduler/howtostart_ruby.html)

### All tutorials ###

[https://docs.dhtmlx.com/scheduler/howtostart_guides.html](https://docs.dhtmlx.com/scheduler/howtostart_guides.html)

## Features ##

- Responsive design and full support for touch screens

- Support for all modern browsers: Google Chrome, Internet Explorer (11+), Safari, Firefox and MS Edge

- Configurable options - color shapes, time scales, custom form for recurring events, 25 languages, and RTL support

![RTL support](https://dhtmlx.com/blog/wp-content/uploads/2019/09/Scheduler-RTL-views.gif)

- Export service to XML, iCal, JSON, PDF, PNG, MS Project

- PHP, ASP.NET, Java, CF [connectors](https://dhtmlx.com/docs/products/dhtmlxConnector/)

## Follow us ##

Star our GitHub repo

Take a [survey](https://docs.google.com/forms/d/e/1FAIpQLSee5YV4WBfZ17RJ-H1TpkBYYcXsZTr0xqNpOrhGrCLiaQeOJQ/viewform) to help us understand your needs

Read us on [Medium](https://medium.com/@dhtmlx)

Follow us on [Twitter](https://twitter.com/dhtmlx)

Like our page on [Facebook](https://www.facebook.com/dhtmlx/)

## License ##

dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.


## Useful links ##

- [Online  documentation](https://docs.dhtmlx.com/scheduler/)
- [Support forum](https://forum.dhtmlx.com/c/scheduler-all/scheduler)
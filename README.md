dhtmlxScheduler v.5.2
=====================

[![Join the chat at https://gitter.im/dhtmlx/dhtmlx](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dhtmlx/dhtmlx) 

dhtmlxScheduler is a JavaScript event calendar that allows you to add a Google-like scheduler to your web app or website. 

Intuitive drag-and-drop interface allows the end users to quickly manage events and appointments in different views: Day, Week, Month, Year, Agenda, Timeline, etc. 

Very lightweight, highly customizable, and fast, dhtmlxScheduler provides a quick way to add an Ajax-based event calendar on a web page.

[https://dhtmlx.com/docs/products/dhtmlxScheduler](https://dhtmlx.com/docs/products/dhtmlxScheduler)

Getting started
----------

Add files:
~~~
<script src="dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="dhtmlxscheduler_material.css" type="text/css" charset="utf-8">
~~~

Add markup:
~~~
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
~~~
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

==> [Check the live demo](http://snippet.dhtmlx.com/488b9857e)

**Complete guides**

- [Angular](https://dhtmlx.com/blog/angular-dhtmlxscheduler-tutorial/)
- [Node](https://docs.dhtmlx.com/scheduler/howtostart_nodejs.html)
- ASP.NET
	- [ASP.NET Core](https://docs.dhtmlx.com/scheduler/howtostart_dotnet_core.html)
- PHP
	- [Laravel](https://docs.dhtmlx.com/scheduler/howtostart_php_laravel.html)
	- [Slim framework](https://docs.dhtmlx.com/scheduler/howtostart_php.html)
- [Ruby on Rails](https://docs.dhtmlx.com/scheduler/howtostart_ruby.html)

**All tutorials**

[https://docs.dhtmlx.com/scheduler/howtostart_guides.html](https://docs.dhtmlx.com/scheduler/howtostart_guides.html)


License
----------

This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in non-GPL project. Please contact sales@dhtmlx.com for details

(c) Dinamenta UAB


Useful links
-------------

- [Online  documentation](https://docs.dhtmlx.com/scheduler/)
- [Support forum](https://forum.dhtmlx.com/c/scheduler-all/scheduler)
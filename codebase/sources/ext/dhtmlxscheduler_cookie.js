/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

(function(){
	function setCookie(name,cookie_param,value) {
		var str = name + "=" + value +  (cookie_param?("; "+cookie_param):"");
		document.cookie = str;
	}
	function getCookie(name) {
		var search = name + "=";
		if (document.cookie.length > 0) {
			var offset = document.cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				var end = document.cookie.indexOf(";", offset);
				if (end == -1)
					end = document.cookie.length;
				return document.cookie.substring(offset, end);
			}
		}
		return "";
	}

	function getCookieName(scheduler) {
		return (scheduler._obj.id || "scheduler") + "_settings";
	}

	var first = true;
	scheduler.attachEvent("onBeforeViewChange",function(oldMode,oldDate,mode,date){
		// if Url plugin is enabled - explicit url values should have more priority than cookies
		if (first && scheduler._get_url_nav){
			var urlNavigationPlugin = scheduler._get_url_nav();
			if(urlNavigationPlugin.date || urlNavigationPlugin.mode || urlNavigationPlugin.event){
				first = false;
			}
		}

		var cookie = getCookieName(scheduler);

		if (first){
			first = false;
			var schedulerCookie = getCookie(cookie);
			if (schedulerCookie){

				if(!scheduler._min_date){
					//otherwise scheduler will have incorrect date until timeout
					//it can cause js error with 'onMouseMove' handler of key_nav.js
					scheduler._min_date = date;
				}

				schedulerCookie = unescape(schedulerCookie).split("@");
				schedulerCookie[0] = this._helpers.parseDate(schedulerCookie[0]);
				var view = this.isViewExists(schedulerCookie[1]) ? schedulerCookie[1] : mode,
					date = !isNaN(+schedulerCookie[0]) ? schedulerCookie[0] : date;

				window.setTimeout(function(){
					scheduler.setCurrentView(date,view);
				},1);
				return false;
			}
		}
		return true;
	});

	scheduler.attachEvent("onViewChange", function (newMode , newDate){
		var cookie = getCookieName(scheduler);
		var text = escape(this._helpers.formatDate(newDate)+"@"+(newMode));
		setCookie(cookie,"expires=Sun, 31 Jan 9999 22:00:00 GMT",text);
	});

	// As we are blocking first render above there could be a problem in case of dynamic loading and rendering of visible data in general ('from'/'to' won't be defined)
	var old_load = scheduler._load;
	scheduler._load = function() {
		var args = arguments;

		if (!scheduler._date) {
			var that = this;
			window.setTimeout(function() {
				old_load.apply(that, args);
			},1);
		} else {
			old_load.apply(this, args);
		}
	};
})();

});

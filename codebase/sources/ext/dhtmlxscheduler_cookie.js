/*

@license
dhtmlxScheduler v.5.3.4 Stardard

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
	var first = true;
	scheduler.attachEvent("onBeforeViewChange",function(om,od,m,d){
		// if Url plugin is enabled - explicit url values should have more priority than cookies
		if (first && scheduler._get_url_nav){
			var url_nav = scheduler._get_url_nav();
			if(url_nav.date || url_nav.mode || url_nav.event){
				first = false;
			}
		}

		var cookie = (scheduler._obj.id || "scheduler") + "_settings";

		if (first){
			first = false;
			var data=getCookie(cookie);
			if (data){

				if(!scheduler._min_date){
					//otherwise scheduler will have incorrect date until timeout
					//it can cause js error with 'onMouseMove' handler of key_nav.js
					scheduler._min_date = d;
				}

				data = unescape(data).split("@");
				data[0] = this._helpers.parseDate(data[0]);
				var view = this.isViewExists(data[1]) ? data[1] : m,
					date = !isNaN(+data[0]) ? data[0] : d;

				window.setTimeout(function(){
					scheduler.setCurrentView(date,view);
				},1);
				return false;
			}
		}
		var text = escape(this._helpers.formatDate(d||od)+"@"+(m||om));
		setCookie(cookie,"expires=Sun, 31 Jan 9999 22:00:00 GMT",text);
		return true;
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

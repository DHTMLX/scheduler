/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in non-GPL project. Please contact sales@dhtmlx.com for details
*/
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
		if (first){
			first = false;



			var data=getCookie("scheduler_settings");
			if (data){

				if(!scheduler._min_date){
					//otherwise scheduler will have incorrect date until timeout
					//it can cause js error with 'onMouseMove' handler of key_nav.js
					scheduler._min_date = d;
				}

				data = unescape(data).split("@");
				data[0] = this.templates.xml_date(data[0]);
				var view = this.isViewExists(data[1]) ? data[1] : m,
					date = !isNaN(+data[0]) ? data[0] : d;

				window.setTimeout(function(){
					scheduler.setCurrentView(date,view);
				},1);
				return false;
			}
		}
		var text = escape(this.templates.xml_format(d||od)+"@"+(m||om));
		setCookie("scheduler_settings","expires=Sun, 31 Jan 9999 22:00:00 GMT",text);
		return true;
	});


	// As we are blocking first render above there could be a problem in case of dynamic loading ('from' won't be defined)
	var old_load = scheduler._load;
	scheduler._load = function() {
		var args = arguments;
		if (!scheduler._date && scheduler._load_mode) {
			var that = this;
			window.setTimeout(function() {
				old_load.apply(that, args);
			},1);
		} else {
			old_load.apply(this, args);
		}
	}
})();
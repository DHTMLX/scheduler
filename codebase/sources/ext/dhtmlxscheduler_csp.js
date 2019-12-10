/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
/*
 Compatibility with Content Security Policy
 https://github.com/denys86/scheduler/commit/f64f62f14086a8ec33d5667cfc5dc3a7e775fd2a

 Removes evil JS. Inline styles are still used for rendering, may need to allow them or redefine unsafe methods
 style-src 'unsafe-inline'

*/
Scheduler.plugin(function (scheduler) {

scheduler.date.date_to_str = function(format,utc){
	return function(date) {
		return format.replace(/%[a-zA-Z]/g, function (a) {
			switch (a) {
				case "%d": return utc ? scheduler.date.to_fixed(date.getUTCDate()) : scheduler.date.to_fixed(date.getDate());
				case "%m": return utc ? scheduler.date.to_fixed((date.getUTCMonth() + 1)) : scheduler.date.to_fixed((date.getMonth() + 1));
				case "%j": return utc ? date.getUTCDate() : date.getDate();
				case "%n": return utc ? (date.getUTCMonth() + 1) : (date.getMonth() + 1);
				case "%y": return utc ? scheduler.date.to_fixed(date.getUTCFullYear() % 100) : scheduler.date.to_fixed(date.getFullYear() % 100);
				case "%Y": return utc ? date.getUTCFullYear() : date.getFullYear();
				case "%D": return utc ? scheduler.locale.date.day_short[date.getUTCDay()] : scheduler.locale.date.day_short[date.getDay()];
				case "%l": return utc ? scheduler.locale.date.day_full[date.getUTCDay()] : scheduler.locale.date.day_full[date.getDay()];
				case "%M": return utc ? scheduler.locale.date.month_short[date.getUTCMonth()] : scheduler.locale.date.month_short[date.getMonth()];
				case "%F": return utc ? scheduler.locale.date.month_full[date.getUTCMonth()] : scheduler.locale.date.month_full[date.getMonth()];
				case "%h": return utc ? scheduler.date.to_fixed((date.getUTCHours() + 11) % 12 + 1) : scheduler.date.to_fixed((date.getHours() + 11) % 12 + 1);
				case "%g": return utc ? ((date.getUTCHours() + 11) % 12 + 1) : ((date.getHours() + 11) % 12 + 1);
				case "%G": return utc ? date.getUTCHours() : date.getHours();
				case "%H": return utc ? scheduler.date.to_fixed(date.getUTCHours()) : scheduler.date.to_fixed(date.getHours());
				case "%i": return utc ? scheduler.date.to_fixed(date.getUTCMinutes()) : scheduler.date.to_fixed(date.getMinutes());
				case "%a": return utc ? (date.getUTCHours() > 11 ? "pm" : "am") : (date.getHours() > 11 ? "pm" : "am");
				case "%A": return utc ? (date.getUTCHours() > 11 ? "PM" : "AM") : (date.getHours() > 11 ? "PM" : "AM");
				case "%s": return utc ? scheduler.date.to_fixed(date.getUTCSeconds()) : scheduler.date.to_fixed(date.getSeconds());
				case "%W": return utc ? scheduler.date.to_fixed(scheduler.date.getUTCISOWeek(date)) : scheduler.date.to_fixed(scheduler.date.getISOWeek(date));
				default: return a;
			}
		});
	};
};
scheduler.date.str_to_date = function(format,utc){
	return function(date) {
		var set = [0, 0, 1, 0, 0, 0];
		var temp = date.match(/[a-zA-Z]+|[0-9]+/g);
		var mask = format.match(/%[a-zA-Z]/g);

		for (var i = 0; i < mask.length; i++) {
			switch (mask[i]) {
				case "%j":
				case "%d":
					set[2] = temp[i] || 1;
					break;
				case "%n":
				case "%m":
					set[1] = (temp[i] || 1) - 1;
					break;
				case "%y":
					set[0] = temp[i] * 1 + (temp[i] > 50 ? 1900 : 2000);
					break;
				case "%g":
				case "%G":
				case "%h":
				case "%H":
					set[3] = temp[i] || 0;
					break;
				case "%i":
					set[4] = temp[i] || 0;
					break;
				case "%Y":
					set[0] = temp[i] || 0;
					break;
				case "%a":
				case "%A":
					set[3] = set[3] % 12 + ((temp[i] || '').toLowerCase() == 'am' ? 0 : 12);
					break;
				case "%s":
					set[5] = temp[i] || 0;
					break;
				case "%M":
					set[1] = scheduler.locale.date.month_short_hash[temp[i]] || 0;
					break;
				case "%F":
					set[1] = scheduler.locale.date.month_full_hash[temp[i]] || 0;
					break;
				default:
					break;
			}
		}

		if (utc) {
			return new Date(Date.UTC(set[0], set[1], set[2], set[3], set[4], set[5]));
		}

		return new Date(set[0], set[1], set[2], set[3], set[4], set[5]);
	};
};

});
/*
dhtmlxScheduler v.4.3.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var t=function(){};return t.prototype=e,t}var t=scheduler._load;scheduler._load=function(s,r){if(s=s||this._load_url,"object"==typeof s)for(var a=e(this._loaded),n=0;n<s.length;n++)this._loaded=new a,t.call(this,s[n],r);else t.apply(this,arguments)}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multisource.js.map
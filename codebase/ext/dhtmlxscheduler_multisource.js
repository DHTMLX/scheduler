/*
@license
dhtmlxScheduler v.5.0.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var t=function(){};return t.prototype=e,t}var t=scheduler._load;scheduler._load=function(a,r){if(a=a||this._load_url,"object"==typeof a)for(var i=e(this._loaded),n=0;n<a.length;n++)this._loaded=new i,t.call(this,a[n],r);else t.apply(this,arguments)}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multisource.js.map
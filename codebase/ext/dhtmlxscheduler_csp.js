/*

@license
dhtmlxScheduler v.5.3.4 Stardard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){e.date.date_to_str=function(t,i){return function(a){return t.replace(/%[a-zA-Z]/g,function(t){switch(t){case"%d":return i?e.date.to_fixed(a.getUTCDate()):e.date.to_fixed(a.getDate());case"%m":return i?e.date.to_fixed(a.getUTCMonth()+1):e.date.to_fixed(a.getMonth()+1);case"%j":return i?a.getUTCDate():a.getDate();case"%n":return i?a.getUTCMonth()+1:a.getMonth()+1;case"%y":return i?e.date.to_fixed(a.getUTCFullYear()%100):e.date.to_fixed(a.getFullYear()%100);case"%Y":
return i?a.getUTCFullYear():a.getFullYear();case"%D":return i?e.locale.date.day_short[a.getUTCDay()]:e.locale.date.day_short[a.getDay()];case"%l":return i?e.locale.date.day_full[a.getUTCDay()]:e.locale.date.day_full[a.getDay()];case"%M":return i?e.locale.date.month_short[a.getUTCMonth()]:e.locale.date.month_short[a.getMonth()];case"%F":return i?e.locale.date.month_full[a.getUTCMonth()]:e.locale.date.month_full[a.getMonth()];case"%h":
return i?e.date.to_fixed((a.getUTCHours()+11)%12+1):e.date.to_fixed((a.getHours()+11)%12+1);case"%g":return i?(a.getUTCHours()+11)%12+1:(a.getHours()+11)%12+1;case"%G":return i?a.getUTCHours():a.getHours();case"%H":return i?e.date.to_fixed(a.getUTCHours()):e.date.to_fixed(a.getHours());case"%i":return i?e.date.to_fixed(a.getUTCMinutes()):e.date.to_fixed(a.getMinutes());case"%a":return i?a.getUTCHours()>11?"pm":"am":a.getHours()>11?"pm":"am";case"%A":
return i?a.getUTCHours()>11?"PM":"AM":a.getHours()>11?"PM":"AM";case"%s":return i?e.date.to_fixed(a.getUTCSeconds()):e.date.to_fixed(a.getSeconds());case"%W":return i?e.date.to_fixed(e.date.getUTCISOWeek(a)):e.date.to_fixed(e.date.getISOWeek(a));default:return t}})}},e.date.str_to_date=function(t,i){return function(a){for(var n=[0,0,1,0,0,0],r=a.match(/[a-zA-Z]+|[0-9]+/g),s=t.match(/%[a-zA-Z]/g),o=0;o<s.length;o++)switch(s[o]){case"%j":case"%d":n[2]=r[o]||1;break;case"%n":case"%m":
n[1]=(r[o]||1)-1;break;case"%y":n[0]=1*r[o]+(r[o]>50?1900:2e3);break;case"%g":case"%G":case"%h":case"%H":n[3]=r[o]||0;break;case"%i":n[4]=r[o]||0;break;case"%Y":n[0]=r[o]||0;break;case"%a":case"%A":n[3]=n[3]%12+("am"==(r[o]||"").toLowerCase()?0:12);break;case"%s":n[5]=r[o]||0;break;case"%M":n[1]=e.locale.date.month_short_hash[r[o]]||0;break;case"%F":n[1]=e.locale.date.month_full_hash[r[o]]||0}return i?new Date(Date.UTC(n[0],n[1],n[2],n[3],n[4],n[5])):new Date(n[0],n[1],n[2],n[3],n[4],n[5])}}});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_csp.js.map
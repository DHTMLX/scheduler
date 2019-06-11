/*
@license

dhtmlxScheduler v.5.2.1 Stardard
This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.

*/
Scheduler.plugin(function(e){e.date.date_to_str=function(t,a){return function(i){return t.replace(/%[a-zA-Z]/g,function(t){switch(t){case"%d":return a?e.date.to_fixed(i.getUTCDate()):e.date.to_fixed(i.getDate());case"%m":return a?e.date.to_fixed(i.getUTCMonth()+1):e.date.to_fixed(i.getMonth()+1);case"%j":return a?i.getUTCDate():i.getDate();case"%n":return a?i.getUTCMonth()+1:i.getMonth()+1;case"%y":return a?e.date.to_fixed(i.getUTCFullYear()%100):e.date.to_fixed(i.getFullYear()%100);case"%Y":
return a?i.getUTCFullYear():i.getFullYear();case"%D":return a?e.locale.date.day_short[i.getUTCDay()]:e.locale.date.day_short[i.getDay()];case"%l":return a?e.locale.date.day_full[i.getUTCDay()]:e.locale.date.day_full[i.getDay()];case"%M":return a?e.locale.date.month_short[i.getUTCMonth()]:e.locale.date.month_short[i.getMonth()];case"%F":return a?e.locale.date.month_full[i.getUTCMonth()]:e.locale.date.month_full[i.getMonth()];case"%h":
return a?e.date.to_fixed((i.getUTCHours()+11)%12+1):e.date.to_fixed((i.getHours()+11)%12+1);case"%g":return a?(i.getUTCHours()+11)%12+1:(i.getHours()+11)%12+1;case"%G":return a?i.getUTCHours():i.getHours();case"%H":return a?e.date.to_fixed(i.getUTCHours()):e.date.to_fixed(i.getHours());case"%i":return a?e.date.to_fixed(i.getUTCMinutes()):e.date.to_fixed(i.getMinutes());case"%a":return a?i.getUTCHours()>11?"pm":"am":i.getHours()>11?"pm":"am";case"%A":
return a?i.getUTCHours()>11?"PM":"AM":i.getHours()>11?"PM":"AM";case"%s":return a?e.date.to_fixed(i.getUTCSeconds()):e.date.to_fixed(i.getSeconds());case"%W":return a?e.date.to_fixed(e.date.getUTCISOWeek(i)):e.date.to_fixed(e.date.getISOWeek(i));default:return t}})}},e.date.str_to_date=function(t,a){return function(i){for(var n=[0,0,1,0,0,0],r=i.match(/[a-zA-Z]+|[0-9]+/g),o=t.match(/%[a-zA-Z]/g),s=0;s<o.length;s++)switch(o[s]){case"%j":case"%d":n[2]=r[s]||1;break;case"%n":case"%m":
n[1]=(r[s]||1)-1;break;case"%y":n[0]=1*r[s]+(r[s]>50?1900:2e3);break;case"%g":case"%G":case"%h":case"%H":n[3]=r[s]||0;break;case"%i":n[4]=r[s]||0;break;case"%Y":n[0]=r[s]||0;break;case"%a":case"%A":n[3]=n[3]%12+("am"==(r[s]||"").toLowerCase()?0:12);break;case"%s":n[5]=r[s]||0;break;case"%M":n[1]=e.locale.date.month_short_hash[r[s]]||0;break;case"%F":n[1]=e.locale.date.month_full_hash[r[s]]||0}return a?new Date(Date.UTC(n[0],n[1],n[2],n[3],n[4],n[5])):new Date(n[0],n[1],n[2],n[3],n[4],n[5])}}});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_csp.js.map
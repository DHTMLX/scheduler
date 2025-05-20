(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.dhtmlxscheduler = {}));
})(this, function(exports2) {
  "use strict";/** @license

dhtmlxScheduler v.7.2.5 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/

  function dhtmlxHook() {
    if (typeof dhtmlx != "undefined" && dhtmlx.attaches) {
      dhtmlx.attaches.attachScheduler = function(day, mode, tabs, scheduler2) {
        var tabs = tabs || '<div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div>';
        var obj = document.createElement("DIV");
        obj.id = "dhxSchedObj_" + this._genStr(12);
        obj.innerHTML = '<div id="' + obj.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + tabs + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>';
        document.body.appendChild(obj.firstChild);
        this.attachObject(obj.id, false, true);
        this.vs[this.av].sched = scheduler2;
        this.vs[this.av].schedId = obj.id;
        scheduler2.setSizes = scheduler2.updateView;
        scheduler2.destructor = function() {
        };
        scheduler2.init(obj.id, day, mode);
        return this.vs[this._viewRestore()].sched;
      };
    }
  }
  const theme = "";
  var globalScope;
  if (typeof window !== "undefined") {
    globalScope = window;
  } else {
    globalScope = global;
  }
  const global$1 = globalScope;
  function dragHighlightPos(scheduler2) {
    let dndMarkers = [];
    let dragStarted = false;
    let eventNode = null;
    let event2 = null;
    function isEnabled2() {
      return scheduler2.config.drag_highlight && scheduler2.markTimespan;
    }
    function checkViewName(viewName) {
      const viewObj = scheduler2.getView(viewName);
      if (viewObj) {
        return viewObj.layout;
      }
      return viewName;
    }
    function checkSectionPropertyName(viewName) {
      const viewObj = scheduler2.getView(viewName);
      if (viewObj.y_property) {
        return viewObj.y_property;
      }
      if (viewObj.map_to) {
        return viewObj.map_to;
      }
    }
    function setRequiredStylesToMarker(eventNode2, layout) {
      switch (layout) {
        case "month":
          eventNode2.style.top = "";
          eventNode2.style.left = "";
          break;
        case "timeline":
          eventNode2.style.left = "";
          eventNode2.style.marginLeft = "1px";
          break;
        default:
          eventNode2.style.top = "";
          break;
      }
    }
    function createMarkerConfig(configSettings) {
      const { event: event3, layout, viewName, sectionId, eventNode: eventNode2 } = configSettings;
      setRequiredStylesToMarker(eventNode2, layout);
      const sections = {};
      let markerObject = { start_date: event3.start_date, end_date: event3.end_date, css: "dhx_scheduler_dnd_marker", html: eventNode2 };
      if (layout == "timeline") {
        const viewObj = scheduler2.getView(viewName);
        if (viewObj.round_position) {
          const index = scheduler2._get_date_index(viewObj, event3.start_date);
          const rounded_date = viewObj._trace_x[index];
          markerObject.start_date = rounded_date;
        }
      }
      if (layout == "timeline" || layout == "month") {
        markerObject = { ...markerObject, end_date: scheduler2.date.add(event3.start_date, 1, "minute") };
      }
      if (sectionId) {
        sections[viewName] = sectionId;
        markerObject.sections = sections;
      }
      return markerObject;
    }
    function createViewMarker(settings) {
      const { layout } = settings;
      let markerConfigs;
      switch (layout) {
        case "month":
          markerConfigs = getMonthViewMarkers(settings);
          break;
        case "timeline":
        case "units":
          markerConfigs = getTimelineAndUnitsViewMarkers(settings);
          break;
        default:
          markerConfigs = getColumnViewMarkers(settings);
          break;
      }
      markerConfigs.forEach((cfg) => {
        dndMarkers.push(scheduler2.markTimespan(cfg));
      });
    }
    function getColumnViewMarkers(settings) {
      const { event: event3, layout, viewName, sectionId } = settings;
      let columnViewMarkersArray = [];
      let eventNodes = scheduler2.$container.querySelectorAll(`[${scheduler2.config.event_attribute}='${event3.id}']:not(.dhx_cal_select_menu):not(.dhx_drag_marker)`);
      if (eventNodes) {
        for (let i = 0; i < eventNodes.length; i++) {
          let eventNodeClone = eventNodes[i].cloneNode(true);
          let startDate = /* @__PURE__ */ new Date(+eventNodeClone.getAttribute("data-bar-start"));
          let endDate = /* @__PURE__ */ new Date(+eventNodeClone.getAttribute("data-bar-end"));
          let dates = { start_date: startDate, end_date: endDate };
          const configSettings = { event: dates, layout, viewName, sectionId, eventNode: eventNodeClone };
          columnViewMarkersArray.push(createMarkerConfig(configSettings));
        }
      }
      return columnViewMarkersArray;
    }
    function getMonthViewMarkers(settings) {
      let monthViewMarkersArray = [];
      const { event: event3, layout, viewName, sectionId } = settings;
      const weekDates = [];
      let currDate = new Date(event3.start_date);
      while (currDate.valueOf() < event3.end_date.valueOf()) {
        let obj = { start_date: currDate };
        weekDates.push(obj);
        currDate = scheduler2.date.week_start(scheduler2.date.add(currDate, 1, "week"));
      }
      let cells = scheduler2.$container.querySelectorAll(`[${scheduler2.config.event_attribute}='${event3.id}']`);
      for (let i = 0; i < cells.length; i++) {
        const configSettings = { event: weekDates[i], layout, viewName, sectionId, eventNode: cells[i].cloneNode(true) };
        monthViewMarkersArray.push(createMarkerConfig(configSettings));
      }
      return monthViewMarkersArray;
    }
    function getTimelineAndUnitsViewMarkers(settings) {
      let unitMarkersArray = [];
      const { event: event3, layout, viewName, eventNode: eventNode2 } = settings;
      let sectionPropertyName = checkSectionPropertyName(viewName);
      if (sectionPropertyName) {
        const sections = String(event3[sectionPropertyName]).split(scheduler2.config.section_delimiter);
        const formatedSections = sections.map((element) => String(element));
        const elems = [];
        for (let i = 0; i < formatedSections.length; i++) {
          elems[i] = eventNode2.cloneNode(true);
          const configSettings = { event: event3, layout, viewName, sectionId: formatedSections[i], eventNode: elems[i] };
          unitMarkersArray.push(createMarkerConfig(configSettings));
        }
      }
      return unitMarkersArray;
    }
    scheduler2.attachEvent("onBeforeDrag", function(id2, mode, e) {
      if (isEnabled2()) {
        dragStarted = true;
        event2 = scheduler2.getEvent(id2);
        eventNode = e.target.closest(`[${scheduler2.config.event_attribute}]`);
        const viewName = scheduler2.getState().mode;
        const layout = checkViewName(viewName);
        if (layout == "units" && scheduler2.config.cascade_event_display) {
          scheduler2.unselect(id2);
          eventNode = e.target.closest(`[${scheduler2.config.event_attribute}]`);
        }
      }
      return true;
    });
    scheduler2.attachEvent("onEventDrag", function(id2, mode, e) {
      if (dragStarted && isEnabled2()) {
        dragStarted = false;
        const viewName = scheduler2.getState().mode;
        const layout = checkViewName(viewName);
        const sectionId = scheduler2.getActionData(e).section;
        if (event2) {
          const settings = { event: event2, layout, viewName, sectionId, eventNode };
          createViewMarker(settings);
        }
      }
    });
    scheduler2.attachEvent("onDragEnd", function(id2, mode, e) {
      for (let i = 0; i < dndMarkers.length; i++) {
        scheduler2.unmarkTimespan(dndMarkers[i]);
      }
      dndMarkers = [];
      eventNode = null;
      event2 = null;
    });
  }
  function undoDelete(scheduler2) {
    const undoableDeletes = {};
    scheduler2.attachEvent("onConfirmedBeforeEventDelete", function(id2) {
      undoableDeletes[id2] = true;
      return true;
    });
    scheduler2.attachEvent("onEventDeleted", function(id2, ev) {
      if (undoableDeletes[id2]) {
        delete undoableDeletes[id2];
      } else {
        return;
      }
      let deletedEvent = scheduler2.copy(ev);
      if (scheduler2.config.undo_deleted && !scheduler2.getState().new_event) {
        scheduler2.message({ text: `<div class="dhx_info_message">
                            <span class="undo_popup_text">Event deleted</span>
                            <button class="undo_button" data-deleted-event-id="${ev.id}">Undo</button>
                        </div>`, expire: 1e4, type: "popup_after_delete", callback: function(e) {
          let undoBtn = e.target.closest(`[data-deleted-event-id="${ev.id}"]`);
          if (undoBtn) {
            if (deletedEvent.rrule && deletedEvent.duration) {
              deletedEvent.end_date = new Date(deletedEvent.start_date.valueOf() + deletedEvent.duration * 1e3);
              scheduler2.addEvent(deletedEvent);
            }
            scheduler2.addEvent(deletedEvent);
            scheduler2.render();
          }
        } });
      }
    });
  }
  function limitPlugin(scheduler2) {
    scheduler2.config.mark_now = true;
    scheduler2.config.display_marked_timespans = true;
    scheduler2.config.overwrite_marked_timespans = true;
    var dhx_time_block = "dhx_time_block";
    var default_timespan_type = "default";
    var fix_options = function(options, days, zones) {
      if (days instanceof Date && zones instanceof Date) {
        options.start_date = days;
        options.end_date = zones;
      } else {
        options.days = days;
        options.zones = zones;
      }
      return options;
    };
    var get_resulting_options = function(days, zones, sections) {
      var options = typeof days == "object" ? days : { days };
      options.type = dhx_time_block;
      options.css = "";
      if (zones) {
        if (sections)
          options.sections = sections;
        options = fix_options(options, days, zones);
      }
      return options;
    };
    scheduler2.blockTime = function(days, zones, sections) {
      var options = get_resulting_options(days, zones, sections);
      return scheduler2.addMarkedTimespan(options);
    };
    scheduler2.unblockTime = function(days, zones, sections) {
      zones = zones || "fullday";
      var options = get_resulting_options(days, zones, sections);
      return scheduler2.deleteMarkedTimespan(options);
    };
    scheduler2.checkInMarkedTimespan = function(ev, timespan_type, on_overlap) {
      timespan_type = timespan_type || default_timespan_type;
      var res = true;
      var temp_start_date = new Date(ev.start_date.valueOf());
      var temp_end_date = scheduler2.date.add(temp_start_date, 1, "day");
      var timespans = scheduler2._marked_timespans;
      for (; temp_start_date < ev.end_date; temp_start_date = scheduler2.date.date_part(temp_end_date), temp_end_date = scheduler2.date.add(temp_start_date, 1, "day")) {
        var day_value = +scheduler2.date.date_part(new Date(temp_start_date));
        var day_index = temp_start_date.getDay();
        var zones = getZones(ev, timespans, day_index, day_value, timespan_type);
        if (zones) {
          for (var i = 0; i < zones.length; i += 2) {
            var eventStart = scheduler2._get_zone_minutes(temp_start_date);
            var eventEnd = ev.end_date > temp_end_date || ev.end_date.getDate() != temp_start_date.getDate() ? 1440 : scheduler2._get_zone_minutes(ev.end_date);
            var markerStart = zones[i];
            var markerEnd = zones[i + 1];
            if (markerStart < eventEnd && markerEnd > eventStart) {
              if (typeof on_overlap == "function") {
                res = on_overlap(ev, eventStart, eventEnd, markerStart, markerEnd);
              } else {
                res = false;
              }
              if (!res)
                break;
            }
          }
        }
      }
      return !res;
    };
    scheduler2.checkLimitViolation = function(event2) {
      if (!event2)
        return true;
      if (!scheduler2.config.check_limits)
        return true;
      var s = scheduler2;
      var c = s.config;
      var evs = [];
      if (event2.rec_type && event2._end_date || event2.rrule) {
        const seriesEnd = event2._end_date || event2.end_date;
        if (c.limit_start && c.limit_end) {
          var recEventInLimits = seriesEnd.valueOf() >= c.limit_start.valueOf() && event2.start_date.valueOf() <= c.limit_end.valueOf();
          return recEventInLimits;
        } else
          return true;
      } else {
        evs = [event2];
      }
      var complete_res = true;
      for (var p = 0; p < evs.length; p++) {
        var res = true;
        var ev = evs[p];
        ev._timed = scheduler2.isOneDayEvent(ev);
        res = c.limit_start && c.limit_end ? ev.start_date.valueOf() >= c.limit_start.valueOf() && ev.end_date.valueOf() <= c.limit_end.valueOf() : true;
        if (res) {
          res = !scheduler2.checkInMarkedTimespan(ev, dhx_time_block, function(event3, eventStart, eventEnd, markerStart, markerEnd) {
            var allow = true;
            if (eventStart <= markerEnd && eventStart >= markerStart) {
              if (markerEnd == 24 * 60 || eventEnd <= markerEnd) {
                allow = false;
              }
              if (event3._timed && s._drag_id && s._drag_mode == "new-size") {
                event3.start_date.setHours(0);
                event3.start_date.setMinutes(markerEnd);
              } else {
                allow = false;
              }
            }
            if (eventEnd >= markerStart && eventEnd <= markerEnd || eventStart < markerStart && eventEnd > markerEnd) {
              if (event3._timed && s._drag_id && s._drag_mode == "new-size") {
                event3.end_date.setHours(0);
                event3.end_date.setMinutes(markerStart);
              } else {
                allow = false;
              }
            }
            return allow;
          });
        }
        if (!res) {
          res = s.checkEvent("onLimitViolation") ? s.callEvent("onLimitViolation", [ev.id, ev]) : res;
        }
        complete_res = complete_res && res;
      }
      if (!complete_res) {
        s._drag_id = null;
        s._drag_mode = null;
      }
      return complete_res;
    };
    scheduler2._get_blocked_zones = function(timespans, property, day_index, day_value, timespan_type) {
      var zones = [];
      if (timespans && timespans[property]) {
        var timeline_zones = timespans[property];
        var blocked_timeline_zones = this._get_relevant_blocked_zones(day_index, day_value, timeline_zones, timespan_type);
        for (var i = 0; i < blocked_timeline_zones.length; i++) {
          zones = this._add_timespan_zones(zones, blocked_timeline_zones[i].zones);
        }
      }
      return zones;
    };
    scheduler2._get_relevant_blocked_zones = function(day_index, day_value, zones, timespan_type) {
      var resultZones;
      if (scheduler2.config.overwrite_marked_timespans) {
        resultZones = zones[day_value] && zones[day_value][timespan_type] ? zones[day_value][timespan_type] : zones[day_index] && zones[day_index][timespan_type] ? zones[day_index][timespan_type] : [];
      } else {
        resultZones = [];
        if (zones[day_value] && zones[day_value][timespan_type]) {
          resultZones = resultZones.concat(zones[day_value][timespan_type]);
        }
        if (zones[day_index] && zones[day_index][timespan_type]) {
          resultZones = resultZones.concat(zones[day_index][timespan_type]);
        }
      }
      return resultZones;
    };
    function getZones(ev, timespans, day_index, day_value, timespan_type) {
      var s = scheduler2;
      var zones = [];
      var containers = { _props: "map_to", matrix: "y_property" };
      for (var container in containers) {
        var property = containers[container];
        if (s[container]) {
          for (var view in s[container]) {
            var view_config = s[container][view];
            var linker = view_config[property];
            if (!ev[linker])
              continue;
            zones = s._add_timespan_zones(zones, scheduler2._get_blocked_zones(timespans[view], ev[linker], day_index, day_value, timespan_type));
          }
        }
      }
      zones = s._add_timespan_zones(zones, scheduler2._get_blocked_zones(timespans, "global", day_index, day_value, timespan_type));
      return zones;
    }
    scheduler2._mark_now = function(hide) {
      var dhx_now_time = "dhx_now_time";
      if (!this._els[dhx_now_time]) {
        this._els[dhx_now_time] = [];
      }
      var now = scheduler2._currentDate();
      var cfg = this.config;
      scheduler2._remove_mark_now();
      if (!hide && cfg.mark_now && now < this._max_date && now > this._min_date && now.getHours() >= cfg.first_hour && now.getHours() < cfg.last_hour) {
        var day_index = this.locate_holder_day(now);
        this._els[dhx_now_time] = scheduler2._append_mark_now(day_index, now);
      }
    };
    scheduler2._append_mark_now = function(day_index, now) {
      var dhx_now_time = "dhx_now_time";
      var zone_start = scheduler2._get_zone_minutes(now);
      var options = { zones: [zone_start, zone_start + 1], css: dhx_now_time, type: dhx_now_time };
      if (!this._table_view) {
        if (this._props && this._props[this._mode]) {
          var start_index, end_index;
          var view = this._props[this._mode];
          var units_l = view.size || view.options.length;
          if (view.days > 1) {
            if (view.size && view.options.length) {
              day_index = (view.position + day_index) / view.options.length * view.size;
            }
            start_index = day_index;
            end_index = day_index + units_l;
          } else {
            start_index = 0;
            end_index = start_index + units_l;
          }
          var r_divs = [];
          for (var i = start_index; i < end_index; i++) {
            var t_day = i;
            options.days = t_day;
            var t_div = scheduler2._render_marked_timespan(options, null, t_day)[0];
            r_divs.push(t_div);
          }
          return r_divs;
        } else {
          options.days = day_index;
          return scheduler2._render_marked_timespan(options, null, day_index);
        }
      } else {
        if (this._mode == "month") {
          options.days = +scheduler2.date.date_part(now);
          return scheduler2._render_marked_timespan(options, null, null);
        }
      }
    };
    scheduler2._remove_mark_now = function() {
      var dhx_now_time = "dhx_now_time";
      var els = this._els[dhx_now_time];
      for (var i = 0; i < els.length; i++) {
        var div = els[i];
        var parent = div.parentNode;
        if (parent) {
          parent.removeChild(div);
        }
      }
      this._els[dhx_now_time] = [];
    };
    scheduler2._marked_timespans = { global: {} };
    scheduler2._get_zone_minutes = function(date) {
      return date.getHours() * 60 + date.getMinutes();
    };
    scheduler2._prepare_timespan_options = function(config) {
      var r_configs = [];
      var temp_configs = [];
      if (config.days == "fullweek")
        config.days = [0, 1, 2, 3, 4, 5, 6];
      if (config.days instanceof Array) {
        var t_days = config.days.slice();
        for (var i = 0; i < t_days.length; i++) {
          var cloned_config = scheduler2._lame_clone(config);
          cloned_config.days = t_days[i];
          r_configs.push.apply(r_configs, scheduler2._prepare_timespan_options(cloned_config));
        }
        return r_configs;
      }
      if (!config || !(config.start_date && config.end_date && config.end_date > config.start_date || config.days !== void 0 && config.zones) && !config.type)
        return r_configs;
      var min = 0;
      var max = 24 * 60;
      if (config.zones == "fullday")
        config.zones = [min, max];
      if (config.zones && config.invert_zones) {
        config.zones = scheduler2.invertZones(config.zones);
      }
      config.id = scheduler2.uid();
      config.css = config.css || "";
      config.type = config.type || default_timespan_type;
      var sections = config.sections;
      if (sections) {
        for (var view_key in sections) {
          if (sections.hasOwnProperty(view_key)) {
            var ids = sections[view_key];
            if (!(ids instanceof Array))
              ids = [ids];
            for (var i = 0; i < ids.length; i++) {
              var t_config = scheduler2._lame_copy({}, config);
              t_config.sections = {};
              t_config.sections[view_key] = ids[i];
              temp_configs.push(t_config);
            }
          }
        }
      } else {
        temp_configs.push(config);
      }
      for (var k = 0; k < temp_configs.length; k++) {
        var c_config = temp_configs[k];
        var start_date = c_config.start_date;
        var end_date = c_config.end_date;
        if (start_date && end_date) {
          var t_sd = scheduler2.date.date_part(new Date(start_date));
          var t_ed = scheduler2.date.add(t_sd, 1, "day");
          while (t_sd < end_date) {
            var t_config = scheduler2._lame_copy({}, c_config);
            delete t_config.start_date;
            delete t_config.end_date;
            t_config.days = t_sd.valueOf();
            var zone_start = start_date > t_sd ? scheduler2._get_zone_minutes(start_date) : min;
            var zone_end = end_date > t_ed || end_date.getDate() != t_sd.getDate() ? max : scheduler2._get_zone_minutes(end_date);
            t_config.zones = [zone_start, zone_end];
            r_configs.push(t_config);
            t_sd = t_ed;
            t_ed = scheduler2.date.add(t_ed, 1, "day");
          }
        } else {
          if (c_config.days instanceof Date)
            c_config.days = scheduler2.date.date_part(c_config.days).valueOf();
          c_config.zones = config.zones.slice();
          r_configs.push(c_config);
        }
      }
      return r_configs;
    };
    scheduler2._get_dates_by_index = function(index, start, end) {
      var dates = [];
      start = scheduler2.date.date_part(new Date(start || scheduler2._min_date));
      end = new Date(end || scheduler2._max_date);
      var start_day = start.getDay();
      var delta = index - start_day >= 0 ? index - start_day : 7 - start.getDay() + index;
      var t_date = scheduler2.date.add(start, delta, "day");
      for (; t_date < end; t_date = scheduler2.date.add(t_date, 1, "week")) {
        dates.push(t_date);
      }
      return dates;
    };
    scheduler2._get_css_classes_by_config = function(config) {
      var css_classes = [];
      if (config.type == dhx_time_block) {
        css_classes.push(dhx_time_block);
        if (config.css)
          css_classes.push(dhx_time_block + "_reset");
      }
      css_classes.push("dhx_marked_timespan", config.css);
      return css_classes.join(" ");
    };
    scheduler2._get_block_by_config = function(config) {
      var block = document.createElement("div");
      if (config.html) {
        if (typeof config.html == "string")
          block.innerHTML = config.html;
        else
          block.appendChild(config.html);
      }
      return block;
    };
    scheduler2._render_marked_timespan = function(options, area, day) {
      var blocks = [];
      var c = scheduler2.config;
      var min_date = this._min_date;
      var max_date = this._max_date;
      var day_value = false;
      if (!c.display_marked_timespans)
        return blocks;
      if (!day && day !== 0) {
        if (options.days < 7)
          day = options.days;
        else {
          var date_to_display = new Date(options.days);
          day_value = +date_to_display;
          if (!(+max_date > +date_to_display && +min_date <= +date_to_display))
            return blocks;
          day = date_to_display.getDay();
        }
        var min_day = min_date.getDay();
        if (min_day > day) {
          day = 7 - (min_day - day);
        } else {
          day = day - min_day;
        }
      }
      var zones = options.zones;
      var css_classes = scheduler2._get_css_classes_by_config(options);
      if (scheduler2._table_view && scheduler2._mode == "month") {
        var areas = [];
        var days = [];
        if (!area) {
          days = day_value ? [day_value] : scheduler2._get_dates_by_index(day);
          for (var i = 0; i < days.length; i++) {
            areas.push(this._scales[days[i]]);
          }
        } else {
          areas.push(area);
          days.push(day);
        }
        for (var i = 0; i < areas.length; i++) {
          area = areas[i];
          day = days[i];
          var sday = this.locate_holder_day(day, false) % this._cols.length;
          if (this._ignores[sday])
            continue;
          var block_proto = scheduler2._get_block_by_config(options);
          block_proto.className = css_classes;
          block_proto.style.top = "0px";
          block_proto.style.height = "100%";
          for (var k = 0; k < zones.length; k += 2) {
            var start = zones[i];
            var end = zones[i + 1];
            if (end <= start)
              return [];
            var block = block_proto.cloneNode(true);
            block.style.left = "0px";
            block.style.width = "100%";
            area.appendChild(block);
            blocks.push(block);
          }
        }
      } else {
        var index = day;
        if (this._ignores[this.locate_holder_day(day, false)])
          return blocks;
        if (this._props && this._props[this._mode] && options.sections && options.sections[this._mode]) {
          var view = this._props[this._mode];
          index = view.order[options.sections[this._mode]];
          var inner_index = view.order[options.sections[this._mode]];
          if (!(view.days > 1)) {
            index = inner_index;
            if (view.size && index > view.position + view.size) {
              index = 0;
            }
          } else {
            var units_l = view.size || view.options.length;
            index = index * units_l + inner_index;
          }
        }
        area = area ? area : scheduler2.locate_holder(index);
        for (var i = 0; i < zones.length; i += 2) {
          var start = Math.max(zones[i], c.first_hour * 60);
          var end = Math.min(zones[i + 1], c.last_hour * 60);
          if (end <= start) {
            if (i + 2 < zones.length)
              continue;
            else
              return [];
          }
          var block = scheduler2._get_block_by_config(options);
          block.className = css_classes;
          var all_hours_height = this.config.hour_size_px * 24 + 1;
          var hour_ms = 60 * 60 * 1e3;
          block.style.top = Math.round((start * 60 * 1e3 - this.config.first_hour * hour_ms) * this.config.hour_size_px / hour_ms) % all_hours_height + "px";
          block.style.height = Math.max(Math.round((end - start) * 60 * 1e3 * this.config.hour_size_px / hour_ms) % all_hours_height, 1) + "px";
          area.appendChild(block);
          blocks.push(block);
        }
      }
      return blocks;
    };
    scheduler2._mark_timespans = function() {
      var data = this._els["dhx_cal_data"][0];
      var divs = [];
      if (scheduler2._table_view && scheduler2._mode == "month") {
        for (var day in this._scales) {
          var date = /* @__PURE__ */ new Date(+day);
          divs.push.apply(divs, scheduler2._on_scale_add_marker(this._scales[day], date));
        }
      } else {
        var date = new Date(scheduler2._min_date);
        for (var i = 0, len = data.childNodes.length; i < len; i++) {
          var area = data.childNodes[i];
          if (area.firstChild && scheduler2._getClassName(area.firstChild).indexOf("dhx_scale_hour") > -1) {
            continue;
          }
          divs.push.apply(divs, scheduler2._on_scale_add_marker(area, date));
          date = scheduler2.date.add(date, 1, "day");
        }
      }
      return divs;
    };
    scheduler2.markTimespan = function(configuration) {
      if (!this._els) {
        throw new Error("`scheduler.markTimespan` can't be used before scheduler initialization. Place `scheduler.markTimespan` call after `scheduler.init`.");
      }
      var rebuild_els = false;
      if (!this._els["dhx_cal_data"]) {
        scheduler2.get_elements();
        rebuild_els = true;
      }
      var timespans_ids = scheduler2._marked_timespans_ids, timespan_types = scheduler2._marked_timespans_types, timespans = scheduler2._marked_timespans;
      scheduler2.deleteMarkedTimespan();
      scheduler2.addMarkedTimespan(configuration);
      var divs = scheduler2._mark_timespans();
      if (rebuild_els)
        scheduler2._els = [];
      scheduler2._marked_timespans_ids = timespans_ids;
      scheduler2._marked_timespans_types = timespan_types;
      scheduler2._marked_timespans = timespans;
      return divs;
    };
    scheduler2.unmarkTimespan = function(divs) {
      if (!divs)
        return;
      for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      }
    };
    scheduler2._addMarkerTimespanConfig = function(config) {
      var global2 = "global";
      var timespans = scheduler2._marked_timespans;
      var id2 = config.id;
      var ids = scheduler2._marked_timespans_ids;
      if (!ids[id2])
        ids[id2] = [];
      var day = config.days;
      var sections = config.sections;
      var type = config.type;
      config.id = id2;
      if (sections) {
        for (var view_key in sections) {
          if (sections.hasOwnProperty(view_key)) {
            if (!timespans[view_key])
              timespans[view_key] = {};
            var unit_id = sections[view_key];
            var timespans_view = timespans[view_key];
            if (!timespans_view[unit_id])
              timespans_view[unit_id] = {};
            if (!timespans_view[unit_id][day])
              timespans_view[unit_id][day] = {};
            if (!timespans_view[unit_id][day][type]) {
              timespans_view[unit_id][day][type] = [];
              if (!scheduler2._marked_timespans_types)
                scheduler2._marked_timespans_types = {};
              if (!scheduler2._marked_timespans_types[type])
                scheduler2._marked_timespans_types[type] = true;
            }
            var day_configs = timespans_view[unit_id][day][type];
            config._array = day_configs;
            day_configs.push(config);
            ids[id2].push(config);
          }
        }
      } else {
        if (!timespans[global2][day])
          timespans[global2][day] = {};
        if (!timespans[global2][day][type])
          timespans[global2][day][type] = [];
        if (!scheduler2._marked_timespans_types)
          scheduler2._marked_timespans_types = {};
        if (!scheduler2._marked_timespans_types[type])
          scheduler2._marked_timespans_types[type] = true;
        var day_configs = timespans[global2][day][type];
        config._array = day_configs;
        day_configs.push(config);
        ids[id2].push(config);
      }
    };
    scheduler2._marked_timespans_ids = {};
    scheduler2.addMarkedTimespan = function(configuration) {
      var configs = scheduler2._prepare_timespan_options(configuration);
      if (!configs.length)
        return;
      var id2 = configs[0].id;
      for (var i = 0; i < configs.length; i++) {
        scheduler2._addMarkerTimespanConfig(configs[i]);
      }
      return id2;
    };
    scheduler2._add_timespan_zones = function(current_zones, zones) {
      var resulting_zones = current_zones.slice();
      zones = zones.slice();
      if (!resulting_zones.length)
        return zones;
      for (var i = 0; i < resulting_zones.length; i += 2) {
        var c_zone_start = resulting_zones[i];
        var c_zone_end = resulting_zones[i + 1];
        var isLast = i + 2 == resulting_zones.length;
        for (var k = 0; k < zones.length; k += 2) {
          var zone_start = zones[k];
          var zone_end = zones[k + 1];
          if (zone_end > c_zone_end && zone_start <= c_zone_end || zone_start < c_zone_start && zone_end >= c_zone_start) {
            resulting_zones[i] = Math.min(c_zone_start, zone_start);
            resulting_zones[i + 1] = Math.max(c_zone_end, zone_end);
            i -= 2;
          } else {
            if (!isLast)
              continue;
            var offset = c_zone_start > zone_start ? 0 : 2;
            resulting_zones.splice(i + offset, 0, zone_start, zone_end);
          }
          zones.splice(k--, 2);
          break;
        }
      }
      return resulting_zones;
    };
    scheduler2._subtract_timespan_zones = function(current_zones, zones) {
      var resulting_zones = current_zones.slice();
      for (var i = 0; i < resulting_zones.length; i += 2) {
        var c_zone_start = resulting_zones[i];
        var c_zone_end = resulting_zones[i + 1];
        for (var k = 0; k < zones.length; k += 2) {
          var zone_start = zones[k];
          var zone_end = zones[k + 1];
          if (zone_end > c_zone_start && zone_start < c_zone_end) {
            var is_modified = false;
            if (c_zone_start >= zone_start && c_zone_end <= zone_end) {
              resulting_zones.splice(i, 2);
            }
            if (c_zone_start < zone_start) {
              resulting_zones.splice(i, 2, c_zone_start, zone_start);
              is_modified = true;
            }
            if (c_zone_end > zone_end) {
              resulting_zones.splice(is_modified ? i + 2 : i, is_modified ? 0 : 2, zone_end, c_zone_end);
            }
            i -= 2;
            break;
          } else {
            continue;
          }
        }
      }
      return resulting_zones;
    };
    scheduler2.invertZones = function(zones) {
      return scheduler2._subtract_timespan_zones([0, 1440], zones.slice());
    };
    scheduler2._delete_marked_timespan_by_id = function(id2) {
      var configs = scheduler2._marked_timespans_ids[id2];
      if (configs) {
        for (var i = 0; i < configs.length; i++) {
          var config = configs[i];
          var parent_array = config._array;
          for (var k = 0; k < parent_array.length; k++) {
            if (parent_array[k] == config) {
              parent_array.splice(k, 1);
              break;
            }
          }
        }
      }
    };
    scheduler2._delete_marked_timespan_by_config = function(config) {
      var timespans = scheduler2._marked_timespans;
      var sections = config.sections;
      var day = config.days;
      var type = config.type || default_timespan_type;
      var viewspans;
      if (sections) {
        for (var view_key in sections) {
          if (sections.hasOwnProperty(view_key) && timespans[view_key]) {
            var unit_id = sections[view_key];
            if (timespans[view_key][unit_id]) {
              viewspans = timespans[view_key][unit_id];
            }
          }
        }
      } else {
        viewspans = timespans.global;
      }
      if (viewspans) {
        if (day !== void 0) {
          if (viewspans[day] && viewspans[day][type]) {
            scheduler2._addMarkerTimespanConfig(config);
            scheduler2._delete_marked_timespans_list(viewspans[day][type], config);
          }
        } else {
          for (var d in viewspans) {
            if (viewspans[d][type]) {
              var dayConfig = scheduler2._lame_clone(config);
              config.days = d;
              scheduler2._addMarkerTimespanConfig(dayConfig);
              scheduler2._delete_marked_timespans_list(viewspans[d][type], config);
            }
          }
        }
      }
    };
    scheduler2._delete_marked_timespans_list = function(day_timespans, config) {
      for (var i = 0; i < day_timespans.length; i++) {
        var d_t = day_timespans[i];
        var zones = scheduler2._subtract_timespan_zones(d_t.zones, config.zones);
        if (zones.length)
          d_t.zones = zones;
        else {
          day_timespans.splice(i, 1);
          i--;
          var related_zones = scheduler2._marked_timespans_ids[d_t.id];
          for (var k = 0; k < related_zones.length; k++) {
            if (related_zones[k] == d_t) {
              related_zones.splice(k, 1);
              break;
            }
          }
        }
      }
    };
    scheduler2.deleteMarkedTimespan = function(configuration) {
      if (!arguments.length) {
        scheduler2._marked_timespans = { global: {} };
        scheduler2._marked_timespans_ids = {};
        scheduler2._marked_timespans_types = {};
      }
      if (typeof configuration != "object") {
        scheduler2._delete_marked_timespan_by_id(configuration);
      } else {
        if (!(configuration.start_date && configuration.end_date)) {
          if (configuration.days === void 0 && !configuration.type)
            configuration.days = "fullweek";
          if (!configuration.zones)
            configuration.zones = "fullday";
        }
        var types = [];
        if (!configuration.type) {
          for (var type in scheduler2._marked_timespans_types) {
            types.push(type);
          }
        } else {
          types.push(configuration.type);
        }
        var configs = scheduler2._prepare_timespan_options(configuration);
        for (var i = 0; i < configs.length; i++) {
          var config = configs[i];
          for (var t2 = 0; t2 < types.length; t2++) {
            var typedConfig = scheduler2._lame_clone(config);
            typedConfig.type = types[t2];
            scheduler2._delete_marked_timespan_by_config(typedConfig);
          }
        }
      }
    };
    scheduler2._get_types_to_render = function(common2, specific) {
      var types_to_render = common2 ? scheduler2._lame_copy({}, common2) : {};
      for (var type in specific || {}) {
        if (specific.hasOwnProperty(type)) {
          types_to_render[type] = specific[type];
        }
      }
      return types_to_render;
    };
    scheduler2._get_configs_to_render = function(types) {
      var configs = [];
      for (var type in types) {
        if (types.hasOwnProperty(type)) {
          configs.push.apply(configs, types[type]);
        }
      }
      return configs;
    };
    scheduler2._on_scale_add_marker = function(area, day) {
      if (scheduler2._table_view && scheduler2._mode != "month")
        return;
      var day_index = day.getDay();
      var day_value = day.valueOf();
      var mode = this._mode;
      var timespans = scheduler2._marked_timespans;
      var r_configs = [];
      var divs = [];
      if (this._props && this._props[mode]) {
        var view = this._props[mode];
        var units = view.options;
        var index = scheduler2._get_unit_index(view, day);
        var unit = units[index];
        if (!(view.days > 1)) {
          day = scheduler2.date.date_part(new Date(this._date));
        } else {
          var dx = 24 * 60 * 60 * 1e3;
          var day_ind = Math.round((day - scheduler2._min_date) / dx);
          var unitsPerDay = view.size || units.length;
          day = scheduler2.date.add(scheduler2._min_date, Math.floor(day_ind / unitsPerDay), "day");
          day = scheduler2.date.date_part(day);
        }
        day_index = day.getDay();
        day_value = day.valueOf();
        if (timespans[mode] && timespans[mode][unit.key]) {
          var unit_zones = timespans[mode][unit.key];
          var unit_types = scheduler2._get_types_to_render(unit_zones[day_index], unit_zones[day_value]);
          r_configs.push.apply(r_configs, scheduler2._get_configs_to_render(unit_types));
        }
      }
      var global_data = timespans["global"];
      if (scheduler2.config.overwrite_marked_timespans) {
        var day_types = global_data[day_value] || global_data[day_index];
        r_configs.push.apply(r_configs, scheduler2._get_configs_to_render(day_types));
      } else {
        if (global_data[day_value]) {
          r_configs.push.apply(r_configs, scheduler2._get_configs_to_render(global_data[day_value]));
        }
        if (global_data[day_index]) {
          r_configs.push.apply(r_configs, scheduler2._get_configs_to_render(global_data[day_index]));
        }
      }
      for (var i = 0; i < r_configs.length; i++) {
        divs.push.apply(divs, scheduler2._render_marked_timespan(r_configs[i], area, day));
      }
      return divs;
    };
    scheduler2.attachEvent("onScaleAdd", function() {
      scheduler2._on_scale_add_marker.apply(scheduler2, arguments);
    });
    scheduler2.dblclick_dhx_marked_timespan = function(e, src) {
      scheduler2.callEvent("onScaleDblClick", [scheduler2.getActionData(e).date, src, e]);
      if (scheduler2.config.dblclick_create) {
        scheduler2.addEventNow(scheduler2.getActionData(e).date, null, e);
      }
    };
  }
  function createMethod(scheduler2) {
    var methods = {};
    var isActive = false;
    function disableMethod(methodName, dummyMethod) {
      dummyMethod = typeof dummyMethod == "function" ? dummyMethod : function() {
      };
      if (!methods[methodName]) {
        methods[methodName] = this[methodName];
        this[methodName] = dummyMethod;
      }
    }
    function restoreMethod(methodName) {
      if (methods[methodName]) {
        this[methodName] = methods[methodName];
        methods[methodName] = null;
      }
    }
    function disableMethods(methodsHash) {
      for (var i in methodsHash) {
        disableMethod.call(this, i, methodsHash[i]);
      }
    }
    function restoreMethods() {
      for (var i in methods) {
        restoreMethod.call(this, i);
      }
    }
    function batchUpdatePayload(callback) {
      try {
        callback();
      } catch (e) {
        window.console.error(e);
      }
    }
    scheduler2.$stateProvider.registerProvider("batchUpdate", function() {
      return { batch_update: isActive };
    }, false);
    return function batchUpdate2(callback, noRedraw) {
      if (isActive) {
        batchUpdatePayload(callback);
        return;
      }
      var call_dp = this._dp && this._dp.updateMode != "off";
      var dp_mode;
      if (call_dp) {
        dp_mode = this._dp.updateMode;
        this._dp.setUpdateMode("off");
      }
      const calls = { setModeDate: { date: null, mode: null }, needRender: false, needUpdateView: false, repaintEvents: {} };
      const rememberModeDate = (date, mode) => {
        if (date) {
          calls.setModeDate.date = date;
        }
        if (mode) {
          calls.setModeDate.mode = mode;
        }
      };
      var methods2 = { render: (date, mode) => {
        calls.needRender = true;
        rememberModeDate(date, mode);
      }, setCurrentView: (date, mode) => {
        calls.needRender = true;
        rememberModeDate(date, mode);
      }, updateView: (date, mode) => {
        calls.needUpdateView = true;
        rememberModeDate(date, mode);
      }, render_data: () => calls.needRender = true, render_view_data: (evs) => {
        if (evs && evs.length) {
          evs.forEach((e) => calls.repaintEvents[e.id] = true);
        } else {
          calls.needRender = true;
        }
      } };
      disableMethods.call(this, methods2);
      isActive = true;
      this.callEvent("onBeforeBatchUpdate", []);
      batchUpdatePayload(callback);
      this.callEvent("onAfterBatchUpdate", []);
      restoreMethods.call(this);
      isActive = false;
      if (!noRedraw) {
        if (calls.needRender) {
          scheduler2.render(calls.setModeDate.date, calls.setModeDate.mode);
        } else if (calls.needUpdateView) {
          scheduler2.updateView(calls.setModeDate.date, calls.setModeDate.mode);
        } else {
          for (const i in calls.repaintEvents) {
            scheduler2.updateEvent(i);
          }
        }
      }
      if (call_dp) {
        this._dp.setUpdateMode(dp_mode);
        this._dp.sendData();
      }
    };
  }
  function batchUpdate(scheduler2) {
    scheduler2.batchUpdate = createMethod(scheduler2);
  }
  class t {
    constructor(t2) {
      const { url: e, token: s } = t2;
      this._url = e, this._token = s, this._mode = 1, this._seed = 1, this._queue = [], this.data = {}, this.api = {}, this._events = {};
    }
    headers() {
      return { Accept: "application/json", "Content-Type": "application/json", "Remote-Token": this._token };
    }
    fetch(t2, e) {
      const s = { credentials: "include", headers: this.headers() };
      return e && (s.method = "POST", s.body = e), fetch(t2, s).then((t3) => t3.json());
    }
    load(t2) {
      return t2 && (this._url = t2), this.fetch(this._url).then((t3) => this.parse(t3));
    }
    parse(t2) {
      const { key: e, websocket: s } = t2;
      e && (this._token = t2.key);
      for (const e2 in t2.data)
        this.data[e2] = t2.data[e2];
      for (const e2 in t2.api) {
        const s2 = this.api[e2] = {}, i = t2.api[e2];
        for (const t3 in i)
          s2[t3] = this._wrapper(e2 + "." + t3);
      }
      return s && this.connect(), this;
    }
    connect() {
      const t2 = this._socket;
      t2 && (this._socket = null, t2.onclose = function() {
      }, t2.close()), this._mode = 2, this._socket = function(t3, e, s, i) {
        let n = e;
        "/" === n[0] && (n = document.location.protocol + "//" + document.location.host + e);
        n = n.replace(/^http(s|):/, "ws$1:");
        const o = -1 != n.indexOf("?") ? "&" : "?";
        n = `${n}${o}token=${s}&ws=1`;
        const r = new WebSocket(n);
        return r.onclose = () => setTimeout(() => t3.connect(), 2e3), r.onmessage = (e2) => {
          const s2 = JSON.parse(e2.data);
          switch (s2.action) {
            case "result":
              t3.result(s2.body, []);
              break;
            case "event":
              t3.fire(s2.body.name, s2.body.value);
              break;
            case "start":
              i();
              break;
            default:
              t3.onError(s2.data);
          }
        }, r;
      }(this, this._url, this._token, () => (this._mode = 3, this._send(), this._resubscribe(), this));
    }
    _wrapper(t2) {
      return (function() {
        const e = [].slice.call(arguments);
        let s = null;
        const i = new Promise((i2, n) => {
          s = { data: { id: this._uid(), name: t2, args: e }, status: 1, resolve: i2, reject: n }, this._queue.push(s);
        });
        return this.onCall(s, i), 3 === this._mode ? this._send(s) : setTimeout(() => this._send(), 1), i;
      }).bind(this);
    }
    _uid() {
      return (this._seed++).toString();
    }
    _send(t2) {
      if (2 == this._mode)
        return void setTimeout(() => this._send(), 100);
      const e = t2 ? [t2] : this._queue.filter((t3) => 1 === t3.status);
      if (!e.length)
        return;
      const s = e.map((t3) => (t3.status = 2, t3.data));
      3 !== this._mode ? this.fetch(this._url, JSON.stringify(s)).catch((t3) => this.onError(t3)).then((t3) => this.result(t3, s)) : this._socket.send(JSON.stringify({ action: "call", body: s }));
    }
    result(t2, e) {
      const s = {};
      if (t2)
        for (let e2 = 0; e2 < t2.length; e2++)
          s[t2[e2].id] = t2[e2];
      else
        for (let t3 = 0; t3 < e.length; t3++)
          s[e[t3].id] = { id: e[t3].id, error: "Network Error", data: null };
      for (let t3 = this._queue.length - 1; t3 >= 0; t3--) {
        const e2 = this._queue[t3], i = s[e2.data.id];
        i && (this.onResponse(e2, i), i.error ? e2.reject(i.error) : e2.resolve(i.data), this._queue.splice(t3, 1));
      }
    }
    on(t2, e) {
      const s = this._uid();
      let i = this._events[t2];
      const n = !!i;
      return n || (i = this._events[t2] = []), i.push({ id: s, handler: e }), n || 3 != this._mode || this._socket.send(JSON.stringify({ action: "subscribe", name: t2 })), { name: t2, id: s };
    }
    _resubscribe() {
      if (3 == this._mode)
        for (const t2 in this._events)
          this._socket.send(JSON.stringify({ action: "subscribe", name: t2 }));
    }
    detach(t2) {
      if (!t2) {
        if (3 == this._mode)
          for (const t3 in this._events)
            this._socket.send(JSON.stringify({ action: "unsubscribe", key: t3 }));
        return void (this._events = {});
      }
      const { id: e, name: s } = t2, i = this._events[s];
      if (i) {
        const t3 = i.filter((t4) => t4.id != e);
        t3.length ? this._events[s] = t3 : (delete this._events[s], 3 == this._mode && this._socket.send(JSON.stringify({ action: "unsubscribe", name: s })));
      }
    }
    fire(t2, e) {
      const s = this._events[t2];
      if (s)
        for (let t3 = 0; t3 < s.length; t3++)
          s[t3].handler(e);
    }
    onError(t2) {
      return null;
    }
    onCall(t2, e) {
    }
    onResponse(t2, e) {
    }
  }
  class RemoteEvents {
    constructor(url2, token) {
      const remote = new t({ url: url2, token });
      remote.fetch = function(url22, body) {
        const req = { headers: this.headers() };
        if (body) {
          req.method = "POST";
          req.body = body;
        }
        return fetch(url22, req).then((res) => res.json());
      };
      this._ready = remote.load().then((back) => this._remote = back);
    }
    ready() {
      return this._ready;
    }
    on(name, handler) {
      this.ready().then((back) => {
        if (typeof name === "string")
          back.on(name, handler);
        else {
          for (const key in name) {
            back.on(key, name[key]);
          }
        }
      });
    }
  }
  function createHandlers(scheduler2) {
    function remoteUpdates(message2) {
      if (!message2 || !message2.event || !message2.event.id) {
        console.error("Invalid message format:", message2);
        return;
      }
      const { type, event: event2 } = message2;
      if (scheduler2._dp._in_progress[event2.id]) {
        return;
      }
      if (type === "add-event") {
        for (const id2 in scheduler2._dp._in_progress) {
          if (scheduler2._dp.getState(id2) === "inserted") {
            scheduler2._dp.attachEvent("onFullSync", function() {
              if (!scheduler2.getEvent(event2.id)) {
                processUpdate(type, event2);
              }
            }, { once: true });
            return;
          }
        }
      }
      processUpdate(type, event2);
    }
    function processUpdate(type, event2) {
      switch (type) {
        case "add-event":
          handleAddEvent(event2);
          break;
        case "update-event":
          handleUpdateEvent(event2);
          break;
        case "delete-event":
          handleDeleteEvent(event2);
          break;
      }
    }
    function ignore(code) {
      if (scheduler2._dp) {
        scheduler2._dp.ignore(code);
      } else {
        code();
      }
    }
    function handleAddEvent(eventData) {
      if (scheduler2.getEvent(eventData.id)) {
        console.warn(`Event with ID ${eventData.id} already exists. Skipping add.`);
        return;
      }
      eventData.start_date = scheduler2.templates.parse_date(eventData.start_date);
      eventData.end_date = scheduler2.templates.parse_date(eventData.end_date);
      if (eventData.original_start) {
        eventData.original_start = scheduler2.templates.parse_date(eventData.original_start);
      }
      ignore(() => {
        scheduler2.addEvent(eventData);
      });
    }
    function handleUpdateEvent(eventData) {
      const sid = eventData.id;
      if (!scheduler2.getEvent(sid)) {
        console.warn(`Event with ID ${sid} does not exist. Skipping update.`);
        return;
      }
      const existingEvent = scheduler2.getEvent(sid);
      ignore(() => {
        for (let key in eventData) {
          if (key !== "start_date" && key !== "end_date") {
            existingEvent[key] = eventData[key];
          }
        }
        existingEvent.start_date = scheduler2.templates.parse_date(eventData.start_date);
        existingEvent.end_date = scheduler2.templates.parse_date(eventData.end_date);
        if (eventData.original_start) {
          eventData.original_start = scheduler2.templates.parse_date(eventData.original_start);
        }
        scheduler2.callEvent("onEventChanged", [sid, existingEvent]);
        scheduler2.updateEvent(sid);
        if (sid !== eventData.id) {
          scheduler2.changeEventId(sid, eventData.id);
        }
      });
    }
    function handleDeleteEvent(eventData) {
      const sid = eventData.id;
      if (!scheduler2.getEvent(sid)) {
        if (eventData.event_pid) {
          ignore(() => {
            scheduler2.addEvent(eventData);
          });
        }
        return;
      }
      ignore(() => {
        const event2 = scheduler2.getEvent(sid);
        if (event2) {
          if (event2.rec_type || event2.rrule) {
            scheduler2._roll_back_dates(event2);
            const markers = scheduler2._get_rec_markers(sid);
            for (const markerId in markers) {
              if (scheduler2.getEvent(markerId)) {
                scheduler2.deleteEvent(markerId, true);
              }
            }
          }
          if (scheduler2.getState().lightbox_id == sid) {
            this._new_event = this._lightbox_id;
            eventData.id = this._lightbox_id;
            this._events[this._lightbox_id] = eventData;
            if (scheduler2.callEvent("onLiveUpdateCollision", [sid, null, "delete", eventData]) === false) {
              scheduler2.endLightbox(false, scheduler2._lightbox);
              return;
            }
          }
          scheduler2.deleteEvent(sid, true);
        }
      });
    }
    return { events: remoteUpdates };
  }
  function remoteEvents(scheduler2) {
    if (!scheduler2.ext) {
      scheduler2.ext = {};
    }
    scheduler2.ext.liveUpdates = { RemoteEvents, remoteUpdates: createHandlers(scheduler2) };
  }
  function initPlugins(scheduler2) {
    undoDelete(scheduler2);
    dragHighlightPos(scheduler2);
    limitPlugin(scheduler2);
    batchUpdate(scheduler2);
    remoteEvents(scheduler2);
  }
  var uidSeed = Date.now();
  function uid() {
    return uidSeed++;
  }
  function isArray$1(obj) {
    if (Array.isArray) {
      return Array.isArray(obj);
    } else {
      return obj && obj.length !== void 0 && obj.pop && obj.push;
    }
  }
  function isStringObject(obj) {
    return obj && typeof obj === "object" && Function.prototype.toString.call(obj.constructor) === "function String() { [native code] }";
  }
  function isNumberObject(obj) {
    return obj && typeof obj === "object" && Function.prototype.toString.call(obj.constructor) === "function Number() { [native code] }";
  }
  function isBooleanObject(obj) {
    return obj && typeof obj === "object" && Function.prototype.toString.call(obj.constructor) === "function Boolean() { [native code] }";
  }
  function isDate$1(obj) {
    if (obj && typeof obj === "object") {
      return !!(obj.getFullYear && obj.getMonth && obj.getDate);
    } else {
      return false;
    }
  }
  function defined(obj) {
    return typeof obj != "undefined";
  }
  function delay(callback, timeout) {
    var timer;
    var result = function() {
      result.$cancelTimeout();
      result.$pending = true;
      var args = Array.prototype.slice.call(arguments);
      timer = setTimeout(function() {
        callback.apply(this, args);
        result.$pending = false;
      }, timeout);
    };
    result.$pending = false;
    result.$cancelTimeout = function() {
      clearTimeout(timer);
      result.$pending = false;
    };
    result.$execute = function() {
      var args = Array.prototype.slice.call(arguments);
      callback.apply(this, args);
      result.$cancelTimeout();
    };
    return result;
  }
  const utils = { uid, mixin: function mixin(target, source, force) {
    for (var f in source)
      if (target[f] === void 0 || force)
        target[f] = source[f];
    return target;
  }, copy: function copy(object) {
    var i, result;
    if (object && typeof object == "object") {
      switch (true) {
        case isDate$1(object):
          result = new Date(object);
          break;
        case isArray$1(object):
          result = new Array(object.length);
          for (i = 0; i < object.length; i++) {
            result[i] = copy(object[i]);
          }
          break;
        case isStringObject(object):
          result = new String(object);
          break;
        case isNumberObject(object):
          result = new Number(object);
          break;
        case isBooleanObject(object):
          result = new Boolean(object);
          break;
        default:
          result = {};
          for (i in object) {
            const varType = typeof object[i];
            if (varType === "string" || varType === "number" || varType === "boolean") {
              result[i] = object[i];
            } else if (isDate$1(object[i])) {
              result[i] = new Date(object[i]);
            } else if (Object.prototype.hasOwnProperty.apply(object, [i]))
              result[i] = copy(object[i]);
          }
          break;
      }
    }
    return result || object;
  }, defined, isDate: isDate$1, delay };
  const StateService = function() {
    const stateProviders = {};
    function getState(name) {
      const provider = stateProviders[name];
      if (provider) {
        return stateProviders[name].method();
      } else {
        const res = {};
        for (const i in stateProviders) {
          if (!stateProviders[i].internal)
            utils.mixin(res, stateProviders[i].method(), true);
        }
        return res;
      }
    }
    function registerProvider(name, provider, internal) {
      stateProviders[name] = { method: provider, internal };
    }
    function unregisterProvider(name) {
      delete stateProviders[name];
    }
    return { getState, registerProvider, unregisterProvider };
  };
  function assert(scheduler2) {
    return function assert2(check, message2) {
      if (!check) {
        if (scheduler2.config.show_errors && scheduler2.callEvent("onError", [message2]) !== false) {
          if (scheduler2.message) {
            scheduler2.message({ type: "error", text: message2, expire: -1 });
          } else {
            console.log(message2);
          }
          debugger;
        }
      }
    };
  }
  function extend$n(scheduler2) {
    var commonViews = { agenda: "https://docs.dhtmlx.com/scheduler/agenda_view.html", grid: "https://docs.dhtmlx.com/scheduler/grid_view.html", map: "https://docs.dhtmlx.com/scheduler/map_view.html", unit: "https://docs.dhtmlx.com/scheduler/units_view.html", timeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html", week_agenda: "https://docs.dhtmlx.com/scheduler/weekagenda_view.html", year: "https://docs.dhtmlx.com/scheduler/year_view.html", anythingElse: "https://docs.dhtmlx.com/scheduler/views.html" };
    var requiredExtensions = { agenda: "ext/dhtmlxscheduler_agenda_view.js", grid: "ext/dhtmlxscheduler_grid_view.js", map: "ext/dhtmlxscheduler_map_view.js", unit: "ext/dhtmlxscheduler_units.js", timeline: "ext/dhtmlxscheduler_timeline.js, ext/dhtmlxscheduler_treetimeline.js, ext/dhtmlxscheduler_daytimeline.js", week_agenda: "ext/dhtmlxscheduler_week_agenda.js", year: "ext/dhtmlxscheduler_year_view.js", limit: "ext/dhtmlxscheduler_limit.js" };
    scheduler2._commonErrorMessages = { unknownView: function(view) {
      var relatedDoc = "Related docs: " + (commonViews[view] || commonViews.anythingElse);
      var relatedExtension = requiredExtensions[view] ? "You're probably missing " + requiredExtensions[view] + "." : "";
      return "`" + view + "` view is not defined. \nPlease check parameters you pass to `scheduler.init` or `scheduler.setCurrentView` in your code and ensure you've imported appropriate extensions. \n" + relatedDoc + "\n" + (relatedExtension ? relatedExtension + "\n" : "");
    }, collapsedContainer: function(div) {
      return "Scheduler container height is set to *100%* but the rendered height is zero and the scheduler is not visible. \nMake sure that the container has some initial height or use different units. For example:\n<div id='scheduler_here' class='dhx_cal_container' style='width:100%; height:600px;'> \n";
    } };
    scheduler2.createTimelineView = function() {
      throw new Error("scheduler.createTimelineView is not implemented. Be sure to add the required extension: " + requiredExtensions.timeline + "\nRelated docs: " + commonViews.timeline);
    };
    scheduler2.createUnitsView = function() {
      throw new Error("scheduler.createUnitsView is not implemented. Be sure to add the required extension: " + requiredExtensions.unit + "\nRelated docs: " + commonViews.unit);
    };
    scheduler2.createGridView = function() {
      throw new Error("scheduler.createGridView is not implemented. Be sure to add the required extension: " + requiredExtensions.grid + "\nRelated docs: " + commonViews.grid);
    };
    scheduler2.addMarkedTimespan = function() {
      throw new Error("scheduler.addMarkedTimespan is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_limit.js\nRelated docs: https://docs.dhtmlx.com/scheduler/limits.html");
    };
    scheduler2.renderCalendar = function() {
      throw new Error("scheduler.renderCalendar is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_minical.js\nhttps://docs.dhtmlx.com/scheduler/minicalendar.html");
    };
    scheduler2.exportToPNG = function() {
      throw new Error(["scheduler.exportToPNG is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/png.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join("\n"));
    };
    scheduler2.exportToPDF = function() {
      throw new Error(["scheduler.exportToPDF is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/pdf.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join("\n"));
    };
  }
  function extend$m(scheduler2) {
    scheduler2.attachEvent("onSchedulerReady", function() {
      if (typeof dhtmlxError !== "undefined") {
        window.dhtmlxError.catchError("LoadXML", function(a, b, c) {
          var message2 = c[0].responseText;
          switch (scheduler2.config.ajax_error) {
            case "alert":
              global$1.alert(message2);
              break;
            case "console":
              global$1.console.log(message2);
              break;
          }
        });
      }
    });
  }
  function extend$l(scheduler2) {
    function div(className) {
      var element = document.createElement("div");
      var classes = (className || "").split(" ");
      classes.forEach(function(cssClass) {
        element.classList.add(cssClass);
      });
      return element;
    }
    var itemTypes = { rows_container: function() {
      return div("dhx_cal_navbar_rows_container");
    }, row: function() {
      return div("dhx_cal_navbar_row");
    }, view: function(config) {
      var element = div("dhx_cal_tab");
      element.setAttribute("name", config.view + "_tab");
      element.setAttribute("data-tab", config.view);
      if (scheduler2.config.fix_tab_position) {
        if (config.$firstTab) {
          element.classList.add("dhx_cal_tab_first");
        } else if (config.$lastTab) {
          element.classList.add("dhx_cal_tab_last");
        } else if (config.view !== "week") {
          element.classList.add("dhx_cal_tab_standalone");
        }
        if (config.$segmentedTab) {
          element.classList.add("dhx_cal_tab_segmented");
        }
      }
      return element;
    }, date: function() {
      return div("dhx_cal_date");
    }, button: function(config) {
      return div("dhx_cal_nav_button dhx_cal_nav_button_custom dhx_cal_tab");
    }, builtInButton: function(config) {
      return div("dhx_cal_" + config.view + "_button dhx_cal_nav_button");
    }, spacer: function() {
      return div("dhx_cal_line_spacer");
    }, minicalendarButton: function(config) {
      var minicalendarDiv = div("dhx_minical_icon");
      if (!config.click && !minicalendarDiv.$_eventAttached) {
        scheduler2.event(minicalendarDiv, "click", function() {
          if (scheduler2.isCalendarVisible()) {
            scheduler2.destroyCalendar();
          } else {
            scheduler2.renderCalendar({ position: this, date: scheduler2.getState().date, navigation: true, handler: function(date, calendar) {
              scheduler2.setCurrentView(date);
              scheduler2.destroyCalendar();
            } });
          }
        });
      }
      return minicalendarDiv;
    }, html_element: function(config) {
      return div("dhx_cal_nav_content");
    } };
    function findRenderer(config) {
      var renderer;
      if (config.view) {
        switch (config.view) {
          case "today":
          case "next":
          case "prev":
            renderer = itemTypes.builtInButton;
            break;
          case "date":
            renderer = itemTypes.date;
            break;
          case "spacer":
            renderer = itemTypes.spacer;
            break;
          case "button":
            renderer = itemTypes.button;
            break;
          case "minicalendar":
            renderer = itemTypes.minicalendarButton;
            break;
          default:
            renderer = itemTypes.view;
            break;
        }
      } else if (config.rows) {
        renderer = itemTypes.rows_container;
      } else if (config.cols) {
        renderer = itemTypes.row;
      }
      return renderer;
    }
    function renderElement(config) {
      var renderer = findRenderer(config);
      if (!renderer) {
        return;
      }
      var element = renderer(config);
      if (config.css) {
        element.classList.add(config.css);
      }
      if (config.width) {
        var value = config.width;
        if (value === value * 1) {
          value += "px";
        }
        element.style.width = value;
      }
      if (config.height) {
        var value = config.height;
        if (value === value * 1) {
          value += "px";
        }
        element.style.height = value;
      }
      if (config.click) {
        scheduler2.event(element, "click", config.click);
      }
      if (config.html) {
        element.innerHTML = config.html;
      }
      if (config.align) {
        var value = "";
        if (config.align == "right") {
          value = "flex-end";
        } else if (config.align == "left") {
          value = "flex-start";
        }
        element.style.justifyContent = value;
      }
      return element;
    }
    function prepareConfig(config) {
      if (typeof config === "string") {
        config = { view: config };
      }
      if (!config.view && !config.rows && !config.cols) {
        config.view = "button";
      }
      return config;
    }
    function renderLayout(config) {
      var fragment = document.createDocumentFragment();
      var items;
      if (Array.isArray(config)) {
        items = config;
      } else {
        items = [config];
      }
      for (var i = 0; i < items.length; i++) {
        var view = prepareConfig(items[i]);
        if (view.view === "day" && items[i + 1]) {
          var next = prepareConfig(items[i + 1]);
          if (next.view === "week" || next.view === "month") {
            view.$firstTab = true;
            view.$segmentedTab = true;
          }
        }
        if (view.view === "week" && items[i - 1]) {
          var next = prepareConfig(items[i + 1]);
          if (next.view === "week" || next.view === "month") {
            view.$segmentedTab = true;
          }
        }
        if (view.view === "month" && items[i - 1]) {
          var next = prepareConfig(items[i - 1]);
          if (next.view === "week" || next.view === "day") {
            view.$lastTab = true;
            view.$segmentedTab = true;
          }
        }
        var element = renderElement(view);
        fragment.appendChild(element);
        if (view.cols || view.rows) {
          element.appendChild(renderLayout(view.cols || view.rows));
        }
      }
      return fragment;
    }
    scheduler2._init_nav_bar = function(items) {
      var navBar = this.$container.querySelector(".dhx_cal_navline");
      if (!navBar) {
        navBar = document.createElement("div");
        navBar.className = "dhx_cal_navline dhx_cal_navline_flex";
        scheduler2._update_nav_bar(items, navBar);
        return navBar;
      }
      return navBar;
    };
    var previousHeight = null;
    scheduler2._update_nav_bar = function(config, container) {
      if (!config) {
        return;
      }
      var heightChanged = false;
      var configChanged = false;
      var newHeight = config.height || scheduler2.xy.nav_height;
      if (previousHeight === null || previousHeight !== newHeight) {
        heightChanged = true;
      }
      {
        configChanged = true;
      }
      if (heightChanged) {
        scheduler2.xy.nav_height = newHeight;
      }
      if (configChanged) {
        container.innerHTML = "";
        container.appendChild(renderLayout(config));
      }
      if (heightChanged || configChanged) {
        scheduler2.unset_actions();
        scheduler2._els = [];
        scheduler2.get_elements();
        scheduler2.set_actions();
      }
      if (newHeight === 0) {
        container.style.display = "none";
      } else {
        container.style.display = "";
      }
      previousHeight = newHeight;
    };
  }
  function extend$k(scheduler2) {
    function isAttachedNode(container) {
      if (container.isConnected !== void 0) {
        return container.isConnected;
      }
      return document.body.contains(container);
    }
    function getWindowSize(window2) {
      return { w: window2.innerWidth || document.documentElement.clientWidth, h: window2.innerHeight || document.documentElement.clientHeight };
    }
    function equals(a, b) {
      return a.w == b.w && a.h == b.h;
    }
    function listenWindowResize(scheduler3, window2) {
      var oldSize = getWindowSize(window2);
      var resizeDelay;
      scheduler3.event(window2, "resize", function() {
        clearTimeout(resizeDelay);
        resizeDelay = setTimeout(function() {
          if (!isAttachedNode(scheduler3.$container) || scheduler3.$destroyed) {
            return;
          }
          var newSize = getWindowSize(window2);
          if (!equals(oldSize, newSize)) {
            oldSize = newSize;
            triggerSchedulerResize(scheduler3);
          }
        }, 150);
      });
    }
    function triggerSchedulerResize(scheduler3) {
      if (!scheduler3.$initialized || scheduler3.$destroyed || !scheduler3.$root || !isAttachedNode(scheduler3.$root)) {
        return;
      }
      if (scheduler3.callEvent("onSchedulerResize", [])) {
        scheduler3.updateView();
        scheduler3.callEvent("onAfterSchedulerResize", []);
      }
    }
    function watchNodeResize(scheduler3) {
      var previousHeight = scheduler3.$root.offsetHeight;
      var previousWidth = scheduler3.$root.offsetWidth;
      function lowlevelResizeWatcher() {
        if (scheduler3.$destroyed) {
          return;
        }
        if (scheduler3.$root) {
          if (scheduler3.$root.offsetHeight != previousHeight || scheduler3.$root.offsetWidth != previousWidth) {
            triggerSchedulerResize(scheduler3);
          }
          previousHeight = scheduler3.$root.offsetHeight;
          previousWidth = scheduler3.$root.offsetWidth;
        }
        setTimeout(lowlevelResizeWatcher, 200);
      }
      lowlevelResizeWatcher();
    }
    function addResizeListener(scheduler3) {
      var root = scheduler3.$container;
      var containerStyles = window.getComputedStyle(root);
      if (containerStyles.getPropertyValue("position") == "static") {
        root.style.position = "relative";
      }
      if (window.ResizeObserver) {
        let skipFirst = true;
        const resizeObserver = new ResizeObserver(function(entries) {
          if (skipFirst) {
            skipFirst = false;
            return;
          }
          triggerSchedulerResize(scheduler3);
        });
        resizeObserver.observe(root);
        scheduler3.attachEvent("onDestroy", function() {
          resizeObserver.unobserve(root);
        });
      } else {
        var resizeWatcher = document.createElement("iframe");
        resizeWatcher.className = "scheduler_container_resize_watcher";
        resizeWatcher.tabIndex = -1;
        if (scheduler3.config.wai_aria_attributes) {
          resizeWatcher.setAttribute("role", "none");
          resizeWatcher.setAttribute("aria-hidden", true);
        }
        var salesforce_environment = !!window["Sfdc"] || !!window["$A"] || window["Aura"];
        if (salesforce_environment) {
          watchNodeResize(scheduler3);
        } else {
          root.appendChild(resizeWatcher);
          if (resizeWatcher.contentWindow) {
            listenWindowResize(scheduler3, resizeWatcher.contentWindow);
          } else {
            root.removeChild(resizeWatcher);
            listenWindowResize(scheduler3, window);
          }
        }
      }
    }
    addResizeListener(scheduler2);
  }
  class EventHost {
    constructor() {
      this._silent_mode = false;
      this.listeners = {};
    }
    _silentStart() {
      this._silent_mode = true;
    }
    _silentEnd() {
      this._silent_mode = false;
    }
  }
  const createEventStorage = function(obj) {
    let handlers = {};
    let index = 0;
    const eventStorage = function() {
      let combinedResult = true;
      for (const i in handlers) {
        const handlerResult = handlers[i].apply(obj, arguments);
        combinedResult = combinedResult && handlerResult;
      }
      return combinedResult;
    };
    eventStorage.addEvent = function(handler, settings) {
      if (typeof handler == "function") {
        let handlerId;
        if (settings && settings.id) {
          handlerId = settings.id;
        } else {
          handlerId = index;
          index++;
        }
        if (settings && settings.once) {
          const originalHandler = handler;
          handler = function() {
            originalHandler();
            eventStorage.removeEvent(handlerId);
          };
        }
        handlers[handlerId] = handler;
        return handlerId;
      }
      return false;
    };
    eventStorage.removeEvent = function(id2) {
      delete handlers[id2];
    };
    eventStorage.clear = function() {
      handlers = {};
    };
    return eventStorage;
  };
  function makeEventable(obj) {
    const eventHost = new EventHost();
    obj.attachEvent = function(eventName, handler, settings) {
      eventName = "ev_" + eventName.toLowerCase();
      if (!eventHost.listeners[eventName]) {
        eventHost.listeners[eventName] = createEventStorage(this);
      }
      if (settings && settings.thisObject) {
        handler = handler.bind(settings.thisObject);
      }
      const innerId = eventHost.listeners[eventName].addEvent(handler, settings);
      let handlerId = eventName + ":" + innerId;
      if (settings && settings.id) {
        handlerId = settings.id;
      }
      return handlerId;
    };
    obj.attachAll = function(callback) {
      this.attachEvent("listen_all", callback);
    };
    obj.callEvent = function(name, eventArguments) {
      if (eventHost._silent_mode)
        return true;
      const handlerName = "ev_" + name.toLowerCase();
      const listeners = eventHost.listeners;
      if (listeners["ev_listen_all"]) {
        listeners["ev_listen_all"].apply(this, [name].concat(eventArguments));
      }
      if (listeners[handlerName])
        return listeners[handlerName].apply(this, eventArguments);
      return true;
    };
    obj.checkEvent = function(name) {
      const listeners = eventHost.listeners;
      return !!listeners["ev_" + name.toLowerCase()];
    };
    obj.detachEvent = function(id2) {
      if (id2) {
        let listeners = eventHost.listeners;
        for (const i in listeners) {
          listeners[i].removeEvent(id2);
        }
        const list = id2.split(":");
        listeners = eventHost.listeners;
        if (list.length === 2) {
          const eventName = list[0];
          const eventId = list[1];
          if (listeners[eventName]) {
            listeners[eventName].removeEvent(eventId);
          }
        }
      }
    };
    obj.detachAllEvents = function() {
      for (const name in eventHost.listeners) {
        eventHost.listeners[name].clear();
      }
    };
  }
  function extend$j(scheduler2) {
    makeEventable(scheduler2);
    extend$l(scheduler2);
    scheduler2._detachDomEvent = function(el2, event2, handler) {
      if (el2.removeEventListener) {
        el2.removeEventListener(event2, handler, false);
      } else if (el2.detachEvent) {
        el2.detachEvent("on" + event2, handler);
      }
    };
    scheduler2._init_once = function() {
      extend$k(scheduler2);
      scheduler2._init_once = function() {
      };
    };
    const layout = { navbar: { render: function(config) {
      return scheduler2._init_nav_bar(config);
    } }, header: { render: function(config) {
      const element = document.createElement("div");
      element.className = "dhx_cal_header";
      return element;
    } }, dataArea: { render: function(config) {
      const element = document.createElement("div");
      element.className = "dhx_cal_data";
      return element;
    } }, html_element: { render: function(config) {
      return config.html;
    } } };
    function hasSchedulerMarkup(element) {
      return !!(element.querySelector(".dhx_cal_header") && element.querySelector(".dhx_cal_data") && element.querySelector(".dhx_cal_navline"));
    }
    function createDefaultHeader(scheduler3) {
      const views = ["day", "week", "month"];
      const date = ["date"];
      const nav = ["prev", "today", "next"];
      if (scheduler3.matrix) {
        for (const i in scheduler3.matrix) {
          views.push(i);
        }
      }
      if (scheduler3._props) {
        for (const i in scheduler3._props) {
          views.push(i);
        }
      }
      if (scheduler3._grid && scheduler3._grid.names) {
        for (const i in scheduler3._grid.names) {
          views.push(i);
        }
      }
      const optionalViews = ["map", "agenda", "week_agenda", "year"];
      optionalViews.forEach(function(viewName) {
        if (scheduler3[viewName + "_view"]) {
          views.push(viewName);
        }
      });
      return views.concat(date).concat(nav);
    }
    scheduler2.init = function(id2, date, mode) {
      if (this.$destroyed) {
        return;
      }
      date = date || scheduler2._currentDate();
      mode = mode || "week";
      if (this._obj) {
        this.unset_actions();
      }
      this._obj = typeof id2 == "string" ? document.getElementById(id2) : id2;
      this.$container = this._obj;
      this.$root = this._obj;
      if (!this.$container.offsetHeight && this.$container.offsetWidth && this.$container.style.height === "100%") {
        window.console.error(scheduler2._commonErrorMessages.collapsedContainer(), this.$container);
      }
      if (this.config.wai_aria_attributes && this.config.wai_aria_application_role) {
        this.$container.setAttribute("role", "application");
      }
      if (!this.config.header && !hasSchedulerMarkup(this.$container)) {
        this.config.header = createDefaultHeader(this);
        window.console.log(["Required DOM elements are missing from the scheduler container and **scheduler.config.header** is not specified.", "Using a default header configuration: ", "scheduler.config.header = " + JSON.stringify(this.config.header, null, 2), "Check this article for the details: https://docs.dhtmlx.com/scheduler/initialization.html"].join("\n"));
      }
      if (this.config.header) {
        this.$container.innerHTML = "";
        this.$container.classList.add("dhx_cal_container");
        if (this.config.header.height) {
          this.xy.nav_height = this.config.header.height;
        }
        this.$container.appendChild(layout.navbar.render(this.config.header));
        this.$container.appendChild(layout.header.render());
        this.$container.appendChild(layout.dataArea.render());
      } else {
        if (!hasSchedulerMarkup(this.$container)) {
          throw new Error(["Required DOM elements are missing from the scheduler container.", "Be sure to either specify them manually in the markup: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviamarkup", "Or to use **scheduler.config.header** setting so they could be created automatically: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviaheaderconfig"].join("\n"));
        }
      }
      if (this.config.rtl)
        this.$container.className += " dhx_cal_container_rtl";
      if (this._skin_init)
        scheduler2._skin_init();
      scheduler2.date.init();
      this._scroll = true;
      this._els = [];
      this.get_elements();
      this.init_templates();
      this.set_actions();
      this._init_once();
      this._init_touch_events();
      this.set_sizes();
      scheduler2.callEvent("onSchedulerReady", []);
      scheduler2.$initialized = true;
      this.setCurrentView(date, mode);
    };
    scheduler2.xy = { min_event_height: 20, bar_height: 24, scale_width: 50, scroll_width: 18, scale_height: 20, month_scale_height: 20, menu_width: 25, margin_top: 0, margin_left: 0, editor_width: 140, month_head_height: 22, event_header_height: 14 };
    scheduler2.keys = { edit_save: 13, edit_cancel: 27 };
    scheduler2.bind = function bind(functor, object) {
      if (functor.bind)
        return functor.bind(object);
      else
        return function() {
          return functor.apply(object, arguments);
        };
    };
    scheduler2.set_sizes = function() {
      var w = this._x = this._obj.clientWidth - this.xy.margin_left;
      var scale_x = this._table_view ? 0 : this.xy.scale_width + this.xy.scroll_width;
      var materialScalePlaceholder = this.$container.querySelector(".dhx_cal_scale_placeholder");
      if (scheduler2._is_material_skin()) {
        if (!materialScalePlaceholder) {
          materialScalePlaceholder = document.createElement("div");
          materialScalePlaceholder.className = "dhx_cal_scale_placeholder";
          this.$container.insertBefore(materialScalePlaceholder, this._els["dhx_cal_header"][0]);
        }
        materialScalePlaceholder.style.display = "block";
        this.set_xy(materialScalePlaceholder, w, this.xy.scale_height + 1, 0, this._els["dhx_cal_header"][0].offsetTop);
      } else {
        if (materialScalePlaceholder) {
          materialScalePlaceholder.parentNode.removeChild(materialScalePlaceholder);
        }
      }
      if (this._lightbox) {
        if (scheduler2.$container.offsetWidth < 1200)
          ;
        else {
          this._setLbPosition(document.querySelector(".dhx_cal_light"));
        }
      }
      this._data_width = w - scale_x;
      this._els["dhx_cal_navline"][0].style.width = w + "px";
      const header = this._els["dhx_cal_header"][0];
      this.set_xy(header, this._data_width, this.xy.scale_height);
      header.style.left = ``;
      header.style.right = ``;
      if (!this._table_view) {
        if (this.config.rtl) {
          header.style.right = `${this.xy.scale_width}px`;
        } else {
          header.style.left = `${this.xy.scale_width}px`;
        }
      } else {
        if (!this.config.rtl) {
          header.style.left = `-1px`;
        } else {
          header.style.right = `-1px`;
        }
      }
    };
    scheduler2.set_xy = function(node, w, h, x, y) {
      function prepareValue(val) {
        let prepared = val;
        if (!isNaN(Number(prepared))) {
          prepared = Math.max(0, prepared) + "px";
        }
        return prepared;
      }
      var direction = "left";
      if (w !== void 0) {
        node.style.width = prepareValue(w);
      }
      if (h !== void 0) {
        node.style.height = prepareValue(h);
      }
      if (arguments.length > 3) {
        if (x !== void 0) {
          if (this.config.rtl)
            direction = "right";
          node.style[direction] = x + "px";
        }
        if (y !== void 0) {
          node.style.top = y + "px";
        }
      }
    };
    scheduler2.get_elements = function() {
      const els = this._obj.getElementsByTagName("DIV");
      for (let i = 0; i < els.length; i++) {
        let class_name = scheduler2._getClassName(els[i]);
        const attr_value = els[i].getAttribute("data-tab") || els[i].getAttribute("name") || "";
        if (class_name)
          class_name = class_name.split(" ")[0];
        if (!this._els[class_name])
          this._els[class_name] = [];
        this._els[class_name].push(els[i]);
        let label = scheduler2.locale.labels[attr_value + "_tab"] || scheduler2.locale.labels[attr_value || class_name];
        if (typeof label !== "string" && attr_value && !els[i].innerHTML)
          label = attr_value.split("_")[0];
        if (label) {
          this._waiAria.labelAttr(els[i], label);
          els[i].innerHTML = label;
        }
      }
    };
    const domEventsScope = scheduler2._createDomEventScope();
    scheduler2.unset_actions = function() {
      domEventsScope.detachAll();
    };
    scheduler2.set_actions = function() {
      for (const a in this._els) {
        if (this._click[a]) {
          for (let i = 0; i < this._els[a].length; i++) {
            const element = this._els[a][i];
            const handler = this._click[a].bind(element);
            domEventsScope.attach(element, "click", handler);
          }
        }
      }
      domEventsScope.attach(this._obj, "selectstart", function(e) {
        e.preventDefault();
        return false;
      });
      domEventsScope.attach(this._obj, "mousemove", function(e) {
        if (!scheduler2._temp_touch_block)
          scheduler2._on_mouse_move(e);
      });
      domEventsScope.attach(this._obj, "mousedown", function(e) {
        if (!scheduler2._ignore_next_click)
          scheduler2._on_mouse_down(e);
      });
      domEventsScope.attach(this._obj, "mouseup", function(e) {
        if (!scheduler2._ignore_next_click)
          scheduler2._on_mouse_up(e);
      });
      domEventsScope.attach(this._obj, "dblclick", function(e) {
        scheduler2._on_dbl_click(e);
      });
      domEventsScope.attach(this._obj, "contextmenu", function(event2) {
        if (scheduler2.checkEvent("onContextMenu")) {
          event2.preventDefault();
        }
        const returnValue = scheduler2.callEvent("onContextMenu", [scheduler2._locate_event(event2.target), event2]);
        return returnValue;
      });
    };
    scheduler2.select = function(id2) {
      if (this._select_id == id2)
        return;
      scheduler2._close_not_saved();
      this.editStop(false);
      if (this._select_id) {
        this.unselect();
      }
      this._select_id = id2;
      this.updateEvent(id2);
      this.callEvent("onEventSelected", [id2]);
    };
    scheduler2.unselect = function(id2) {
      if (id2 && id2 != this._select_id) {
        return;
      }
      const previousSelection = this._select_id;
      this._select_id = null;
      if (previousSelection && this.getEvent(previousSelection)) {
        this.updateEvent(previousSelection);
      }
      this.callEvent("onEventUnselected", [previousSelection]);
    };
    scheduler2.$stateProvider.registerProvider("global", (function() {
      return { mode: this._mode, date: new Date(this._date), min_date: new Date(this._min_date), max_date: new Date(this._max_date), editor_id: this._edit_id, lightbox_id: this._lightbox_id, new_event: this._new_event, select_id: this._select_id, expanded: this.expanded, drag_id: this._drag_id, drag_mode: this._drag_mode };
    }).bind(scheduler2));
    scheduler2._click = { dhx_cal_data: function(e) {
      if (scheduler2._ignore_next_click) {
        if (e.preventDefault)
          e.preventDefault();
        e.cancelBubble = true;
        scheduler2._ignore_next_click = false;
        return false;
      }
      const id2 = scheduler2._locate_event(e.target);
      if (!id2) {
        scheduler2.callEvent("onEmptyClick", [scheduler2.getActionData(e).date, e]);
      } else {
        if (!scheduler2.callEvent("onClick", [id2, e]) || scheduler2.config.readonly)
          return;
      }
      if (id2 && scheduler2.config.select) {
        scheduler2.select(id2);
        const icon = e.target.closest(".dhx_menu_icon");
        const mask = scheduler2._getClassName(icon);
        if (mask.indexOf("_icon") != -1)
          scheduler2._click.buttons[mask.split(" ")[1].replace("icon_", "")](id2);
      } else {
        scheduler2._close_not_saved();
        if (scheduler2.getState().select_id && (/* @__PURE__ */ new Date()).valueOf() - (scheduler2._new_event || 0) > 500) {
          scheduler2.unselect();
        }
      }
    }, dhx_cal_prev_button: function() {
      scheduler2._click.dhx_cal_next_button(0, -1);
    }, dhx_cal_next_button: function(dummy, step) {
      let def_step = 1;
      if (scheduler2.config.rtl) {
        step = -step;
        def_step = -def_step;
      }
      scheduler2.setCurrentView(scheduler2.date.add(scheduler2.date[scheduler2._mode + "_start"](new Date(scheduler2._date)), step || def_step, scheduler2._mode));
    }, dhx_cal_today_button: function() {
      if (scheduler2.callEvent("onBeforeTodayDisplayed", [])) {
        scheduler2.setCurrentView(scheduler2._currentDate());
      }
    }, dhx_cal_tab: function() {
      const name = this.getAttribute("data-tab");
      const deprecated_name = this.getAttribute("name");
      const mode = name || deprecated_name.substring(0, deprecated_name.search("_tab"));
      scheduler2.setCurrentView(scheduler2._date, mode);
    }, buttons: { delete: function(id2) {
      const c = scheduler2.locale.labels.confirm_deleting;
      scheduler2._dhtmlx_confirm({ message: c, title: scheduler2.locale.labels.title_confirm_deleting, callback: function() {
        scheduler2.deleteEvent(id2);
      }, config: { ok: scheduler2.locale.labels.icon_delete } });
    }, edit: function(id2) {
      scheduler2.edit(id2);
    }, save: function(id2) {
      scheduler2.editStop(true);
    }, details: function(id2) {
      scheduler2.showLightbox(id2);
    }, form: function(id2) {
      scheduler2.showLightbox(id2);
    }, cancel: function(id2) {
      scheduler2.editStop(false);
    } } };
    scheduler2._dhtmlx_confirm = function({ message: message2, title, callback, config }) {
      if (!message2)
        return callback();
      config = config || {};
      const opts = { ...config, text: message2 };
      if (title) {
        opts.title = title;
      }
      if (callback) {
        opts.callback = function(result) {
          if (result) {
            callback();
          }
        };
      }
      scheduler2.confirm(opts);
    };
    scheduler2.addEventNow = function(start, end, e) {
      let base = {};
      if (scheduler2._isObject(start) && !scheduler2._isDate(start)) {
        base = start;
        start = null;
      }
      const duration = (this.config.event_duration || this.config.time_step) * 6e4;
      if (!start)
        start = base.start_date || Math.round(scheduler2._currentDate().valueOf() / duration) * duration;
      let start_date = new Date(start);
      if (!end) {
        let start_hour = this.config.first_hour;
        if (start_hour > start_date.getHours()) {
          start_date.setHours(start_hour);
          start = start_date.valueOf();
        }
        end = start.valueOf() + duration;
      }
      let end_date = new Date(end);
      if (start_date.valueOf() == end_date.valueOf())
        end_date.setTime(end_date.valueOf() + duration);
      base.start_date = base.start_date || start_date;
      base.end_date = base.end_date || end_date;
      base.text = base.text || this.locale.labels.new_event;
      base.id = this._drag_id = base.id || this.uid();
      this._drag_mode = "new-size";
      this._loading = true;
      const eventId = this.addEvent(base);
      this.callEvent("onEventCreated", [this._drag_id, e]);
      this._loading = false;
      this._drag_event = {};
      this._on_mouse_up(e);
      return eventId;
    };
    scheduler2._on_dbl_click = function(e, src) {
      src = src || e.target;
      if (this.config.readonly)
        return;
      const name = scheduler2._getClassName(src).split(" ")[0];
      switch (name) {
        case "dhx_scale_holder":
        case "dhx_scale_holder_now":
        case "dhx_month_body":
        case "dhx_wa_day_data":
          if (!scheduler2.config.dblclick_create)
            break;
          this.addEventNow(this.getActionData(e).date, null, e);
          break;
        case "dhx_cal_event":
        case "dhx_wa_ev_body":
        case "dhx_agenda_line":
        case "dhx_cal_agenda_event_line":
        case "dhx_grid_event":
        case "dhx_cal_event_line":
        case "dhx_cal_event_clear": {
          const id2 = this._locate_event(src);
          if (!this.callEvent("onDblClick", [id2, e]))
            return;
          if (this.config.details_on_dblclick || this._table_view || !this.getEvent(id2)._timed || !this.config.select)
            this.showLightbox(id2);
          else
            this.edit(id2);
          break;
        }
        case "dhx_time_block":
        case "dhx_cal_container":
          return;
        default: {
          const viewHandler = this["dblclick_" + name];
          if (viewHandler) {
            viewHandler.call(this, e);
          } else {
            if (src.parentNode && src != this)
              return scheduler2._on_dbl_click(e, src.parentNode);
          }
          break;
        }
      }
    };
    scheduler2._get_column_index = function(x_pos) {
      let column = 0;
      if (this._cols) {
        let width = 0;
        let i = 0;
        while (width + this._cols[i] < x_pos && i < this._cols.length) {
          width += this._cols[i];
          i++;
        }
        column = i + (this._cols[i] ? (x_pos - width) / this._cols[i] : 0);
        if (this._ignores) {
          if (column >= this._cols.length) {
            while (column >= 1 && this._ignores[Math.floor(column)]) {
              column--;
            }
          }
        }
      }
      return column;
    };
    scheduler2._week_indexes_from_pos = function(pos) {
      if (!this._cols) {
        return pos;
      } else {
        const column = this._get_column_index(pos.x);
        pos.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(column) - 1));
        pos.y = Math.max(0, Math.ceil(pos.y * 60 / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step);
        return pos;
      }
    };
    scheduler2._mouse_coords = function(ev) {
      let pos;
      const body = document.body;
      const documentElement = document.documentElement;
      if (!this.$env.isIE && (ev.pageX || ev.pageY))
        pos = { x: ev.pageX, y: ev.pageY };
      else
        pos = { x: ev.clientX + (body.scrollLeft || documentElement.scrollLeft || 0) - body.clientLeft, y: ev.clientY + (body.scrollTop || documentElement.scrollTop || 0) - body.clientTop };
      if (this.config.rtl && this._colsS) {
        pos.x = this.$container.querySelector(".dhx_cal_data").offsetWidth - pos.x;
        pos.x += this.$domHelpers.getAbsoluteLeft(this._obj);
        if (this._mode !== "month") {
          pos.x -= this.xy.scale_width;
        }
      } else {
        pos.x -= this.$domHelpers.getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width);
      }
      const dataArea = this.$container.querySelector(".dhx_cal_data");
      pos.y -= this.$domHelpers.getAbsoluteTop(dataArea) - this._els["dhx_cal_data"][0].scrollTop;
      pos.ev = ev;
      const handler = this["mouse_" + this._mode];
      if (handler) {
        pos = handler.call(this, pos);
      } else {
        if (!this._table_view) {
          pos = this._week_indexes_from_pos(pos);
        } else {
          const column = this._get_column_index(pos.x);
          if (!this._cols || !this._colsS)
            return pos;
          let dy = 0;
          for (dy = 1; dy < this._colsS.heights.length; dy++)
            if (this._colsS.heights[dy] > pos.y)
              break;
          pos.y = Math.ceil((Math.max(0, column) + Math.max(0, dy - 1) * 7) * 24 * 60 / this.config.time_step);
          if (scheduler2._drag_mode || this._mode == "month")
            pos.y = (Math.max(0, Math.ceil(column) - 1) + Math.max(0, dy - 1) * 7) * 24 * 60 / this.config.time_step;
          if (this._drag_mode == "move") {
            if (scheduler2._ignores_detected && scheduler2.config.preserve_length) {
              pos._ignores = true;
              if (!this._drag_event._event_length)
                this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, { x_step: 1, x_unit: "day" });
            }
          }
          pos.x = 0;
        }
      }
      pos.timestamp = +/* @__PURE__ */ new Date();
      return pos;
    };
    scheduler2._close_not_saved = function() {
      if ((/* @__PURE__ */ new Date()).valueOf() - (scheduler2._new_event || 0) > 500 && scheduler2._edit_id) {
        const confirmationText = scheduler2.locale.labels.confirm_closing;
        scheduler2._dhtmlx_confirm({ message: confirmationText, title: scheduler2.locale.labels.title_confirm_closing, callback: function() {
          scheduler2.editStop(scheduler2.config.positive_closing);
        } });
        if (confirmationText) {
          this._drag_id = this._drag_pos = this._drag_mode = null;
        }
      }
    };
    scheduler2._correct_shift = function(start, back) {
      return start -= (new Date(scheduler2._min_date).getTimezoneOffset() - new Date(start).getTimezoneOffset()) * 6e4 * (back ? -1 : 1);
    };
    scheduler2._is_pos_changed = function(old_pos, new_pos) {
      function diff(old_val, new_val, acc) {
        return !!(Math.abs(old_val - new_val) > acc);
      }
      if (!(old_pos && this._drag_pos)) {
        return true;
      }
      const delay2 = 100;
      const d_pos = 5;
      return !!(this._drag_pos.has_moved || !this._drag_pos.timestamp || new_pos.timestamp - this._drag_pos.timestamp > delay2 || diff(old_pos.ev.clientX, new_pos.ev.clientX, d_pos) || diff(old_pos.ev.clientY, new_pos.ev.clientY, d_pos));
    };
    scheduler2._correct_drag_start_date = function(start) {
      let obj;
      if (scheduler2.matrix)
        obj = scheduler2.matrix[scheduler2._mode];
      obj = obj || { x_step: 1, x_unit: "day" };
      start = new Date(start);
      let len = 1;
      if (obj._start_correction || obj._end_correction)
        len = (obj.last_hour || 0) * 60 - (start.getHours() * 60 + start.getMinutes()) || 1;
      return start * 1 + (scheduler2._get_fictional_event_length(start, len, obj) - len);
    };
    scheduler2._correct_drag_end_date = function(start, duration) {
      let obj;
      if (scheduler2.matrix) {
        obj = scheduler2.matrix[scheduler2._mode];
      }
      obj = obj || { x_step: 1, x_unit: "day" };
      const end = start * 1 + scheduler2._get_fictional_event_length(start, duration, obj);
      return new Date(end * 1 - (scheduler2._get_fictional_event_length(end, -1, obj, -1) + 1));
    };
    scheduler2._on_mouse_move = function(e) {
      if (this._drag_mode) {
        var pos = this._mouse_coords(e);
        if (this._is_pos_changed(this._drag_pos, pos)) {
          var start, end;
          if (this._edit_id != this._drag_id)
            this._close_not_saved();
          if (!this._drag_mode)
            return;
          var mousedownPos = null;
          if (this._drag_pos && !this._drag_pos.has_moved) {
            mousedownPos = this._drag_pos;
            mousedownPos.has_moved = true;
          }
          this._drag_pos = pos;
          this._drag_pos.has_moved = true;
          if (this._drag_mode == "create") {
            if (mousedownPos) {
              pos = mousedownPos;
            }
            this._close_not_saved();
            this.unselect(this._select_id);
            this._loading = true;
            start = this._get_date_from_pos(pos).valueOf();
            if (!this._drag_start) {
              var res = this.callEvent("onBeforeEventCreated", [e, this._drag_id]);
              if (!res) {
                this._loading = false;
                return;
              }
              this._loading = false;
              this._drag_start = start;
              return;
            }
            end = start;
            if (end == this._drag_start)
              ;
            var start_date = new Date(this._drag_start);
            var end_date = new Date(end);
            if ((this._mode == "day" || this._mode == "week") && (start_date.getHours() == end_date.getHours() && start_date.getMinutes() == end_date.getMinutes())) {
              end_date = new Date(this._drag_start + 1e3);
            }
            this._drag_id = this.uid();
            this.addEvent(start_date, end_date, this.locale.labels.new_event, this._drag_id, pos.fields);
            this.callEvent("onEventCreated", [this._drag_id, e]);
            this._loading = false;
            this._drag_mode = "new-size";
          }
          var timeStep = this.config.time_step;
          var ev = this.getEvent(this._drag_id);
          var obj;
          if (scheduler2.matrix)
            obj = scheduler2.matrix[scheduler2._mode];
          obj = obj || { x_step: 1, x_unit: "day" };
          if (this._drag_mode == "move") {
            start = this._min_date.valueOf() + (pos.y * this.config.time_step + pos.x * 24 * 60) * 6e4;
            if (!pos.custom && this._table_view) {
              start += this.date.time_part(ev.start_date) * 1e3;
            }
            if (!this._table_view && this._dragEventBody && this._drag_event._move_event_shift === void 0) {
              this._drag_event._move_event_shift = start - ev.start_date;
            }
            if (this._drag_event._move_event_shift) {
              start -= this._drag_event._move_event_shift;
            }
            start = this._correct_shift(start);
            if (pos._ignores && this.config.preserve_length && this._table_view && obj) {
              start = scheduler2._correct_drag_start_date(start);
              end = scheduler2._correct_drag_end_date(start, this._drag_event._event_length);
            } else
              end = ev.end_date.valueOf() - (ev.start_date.valueOf() - start);
          } else {
            start = ev.start_date.valueOf();
            end = ev.end_date.valueOf();
            if (this._table_view) {
              var resize_date = this._min_date.valueOf() + pos.y * this.config.time_step * 6e4 + (pos.custom ? 0 : 24 * 60 * 6e4);
              if (this._mode == "month") {
                resize_date = this._correct_shift(resize_date, false);
                if (this._drag_from_start) {
                  var day = 24 * 60 * 6e4;
                  if (resize_date <= scheduler2.date.date_part(new Date(end + day - 1)).valueOf())
                    start = resize_date - day;
                } else {
                  end = resize_date;
                }
              } else {
                if (this.config.preserve_length) {
                  if (pos.resize_from_start) {
                    start = scheduler2._correct_drag_start_date(resize_date);
                    if (obj.round_position && obj.first_hour && obj.last_hour && obj.x_unit == "day") {
                      start = new Date(start * 1 + obj._start_correction);
                    }
                  } else {
                    end = scheduler2._correct_drag_end_date(resize_date, 0);
                    if (obj.round_position && obj.first_hour && obj.last_hour && obj.x_unit == "day") {
                      end = scheduler2.date.date_part(new Date(end));
                      end = new Date(end * 1 - obj._end_correction);
                    }
                    if (obj.round_position && scheduler2["ignore_" + scheduler2._mode] && obj.x_unit == "day") {
                      const ignore = this["ignore_" + this._mode];
                      let tempEnd = scheduler2.date.add(new Date(end), -obj.x_step, obj.x_unit);
                      if (ignore(tempEnd)) {
                        end = tempEnd;
                      }
                    }
                  }
                } else {
                  if (pos.resize_from_start) {
                    start = resize_date;
                  } else {
                    end = resize_date;
                  }
                }
              }
            } else {
              var end_day_start = this.date.date_part(new Date(ev.end_date.valueOf() - 1)).valueOf();
              var end_day_date = new Date(end_day_start);
              var firstHour = this.config.first_hour;
              var lastHour = this.config.last_hour;
              var maxY = (lastHour - firstHour) * (60 / timeStep);
              this.config.time_step = 1;
              var precisePos = this._mouse_coords(e);
              this.config.time_step = timeStep;
              var minDate = pos.y * timeStep * 6e4;
              var maxDate = Math.min(pos.y + 1, maxY) * timeStep * 6e4;
              var preciseDate = precisePos.y * 6e4;
              if (Math.abs(minDate - preciseDate) > Math.abs(maxDate - preciseDate)) {
                end = end_day_start + maxDate;
              } else {
                end = end_day_start + minDate;
              }
              end = end + (new Date(end).getTimezoneOffset() - end_day_date.getTimezoneOffset()) * 6e4;
              this._els["dhx_cal_data"][0].style.cursor = "s-resize";
              if (this._mode == "week" || this._mode == "day")
                end = this._correct_shift(end);
            }
            if (this._drag_mode == "new-size") {
              if (end <= this._drag_start) {
                var shift = pos.shift || (this._table_view && !pos.custom ? 24 * 60 * 6e4 : 0);
                start = end - (pos.shift ? 0 : shift);
                end = this._drag_start + (shift || timeStep * 6e4);
              } else {
                start = this._drag_start;
              }
            } else {
              if (end <= start) {
                if (obj && obj.round_position) {
                  if (obj.x_unit == "hour" || obj.x_unit == "minute") {
                    end = scheduler2.date.add(start, obj.x_step, obj.x_unit);
                  } else {
                    end = scheduler2.date.add(scheduler2.date.date_part(new Date(start)), 1, obj.x_unit);
                  }
                } else {
                  end = start + timeStep * 6e4;
                }
              }
            }
          }
          var new_end = new Date(end - 1);
          var new_start = new Date(start);
          if (this._drag_mode == "move" && scheduler2.config.limit_drag_out && (+new_start < +scheduler2._min_date || +end > +scheduler2._max_date)) {
            if (+ev.start_date < +scheduler2._min_date || +ev.end_date > +scheduler2._max_date) {
              new_start = new Date(ev.start_date);
              end = new Date(ev.end_date);
            } else {
              var duration = end - new_start;
              if (+new_start < +scheduler2._min_date) {
                new_start = new Date(scheduler2._min_date);
                if (pos._ignores && this.config.preserve_length && this._table_view) {
                  new_start = new Date(scheduler2._correct_drag_start_date(new_start));
                  if (obj._start_correction)
                    new_start = new Date(new_start.valueOf() + obj._start_correction);
                  end = new Date(new_start * 1 + this._get_fictional_event_length(new_start, this._drag_event._event_length, obj));
                } else {
                  end = new Date(+new_start + duration);
                }
              } else {
                end = new Date(scheduler2._max_date);
                if (pos._ignores && this.config.preserve_length && this._table_view) {
                  if (obj._end_correction)
                    end = new Date(end.valueOf() - obj._end_correction);
                  end = new Date(end * 1 - this._get_fictional_event_length(end, 0, obj, true));
                  new_start = new Date(end * 1 - this._get_fictional_event_length(end, this._drag_event._event_length, obj, true));
                  if (this._ignores_detected) {
                    new_start = scheduler2.date.add(new_start, obj.x_step, obj.x_unit);
                    end = new Date(end * 1 - this._get_fictional_event_length(end, 0, obj, true));
                    end = scheduler2.date.add(end, obj.x_step, obj.x_unit);
                  }
                } else {
                  new_start = new Date(+end - duration);
                }
              }
            }
            var new_end = new Date(end - 1);
          }
          if (!this._table_view && this._dragEventBody && !scheduler2.config.all_timed && (!scheduler2._get_section_view() && pos.x != this._get_event_sday({ start_date: new Date(start), end_date: new Date(start) }) || new Date(start).getHours() < this.config.first_hour)) {
            var duration = end - new_start;
            if (this._drag_mode == "move") {
              var day = this._min_date.valueOf() + pos.x * 24 * 60 * 6e4;
              new_start = new Date(day);
              new_start.setHours(this.config.first_hour);
              if (+new_start <= +ev.start_date) {
                end = new Date(+new_start + duration);
              } else {
                new_start = new Date(+end - duration);
              }
            }
          }
          if (!this._table_view && !scheduler2.config.all_timed && (!scheduler2.getView() && pos.x != this._get_event_sday({ start_date: new Date(end), end_date: new Date(end) }) || new Date(end).getHours() >= this.config.last_hour)) {
            var duration = end - new_start;
            var day = this._min_date.valueOf() + pos.x * 24 * 60 * 6e4;
            end = scheduler2.date.date_part(new Date(day));
            end.setHours(this.config.last_hour);
            new_end = new Date(end - 1);
            if (this._drag_mode == "move") {
              if (+new_start <= +ev.start_date) {
                end = new Date(+new_start + duration);
              } else {
                new_start = new Date(+end - duration);
              }
            }
          }
          if (!this._table_view && scheduler2.config.all_timed) {
            let day2 = this._min_date.valueOf() + pos.x * 24 * 60 * 6e4;
            if (new Date(scheduler2._drag_start).getDay() != new Date(day2)) {
              day2 = new Date(scheduler2._drag_start);
            }
            let tempBorderBottomDate = new Date(day2).setHours(this.config.last_hour);
            if (scheduler2._drag_start && this._drag_mode == "new-size" && tempBorderBottomDate < new Date(end)) {
              end = scheduler2.date.date_part(new Date(day2));
              end.setHours(this.config.last_hour);
              new_end = new Date(end - 1);
            }
          }
          if (this._table_view && scheduler2["ignore_" + this._mode] && (this._drag_mode == "resize" || this._drag_mode == "new-size") && +end > +scheduler2._max_date) {
            end = new Date(scheduler2._max_date);
            const ignore = this["ignore_" + this._mode];
            while (ignore(end)) {
              end = scheduler2.date.add(end, -obj.x_step, obj.x_unit);
            }
            end = scheduler2.date.add(end, obj.x_step, obj.x_unit);
          }
          if (this._table_view || new_end.getDate() == new_start.getDate() && new_end.getHours() < this.config.last_hour || scheduler2._allow_dnd) {
            ev.start_date = new_start;
            ev.end_date = new Date(end);
            if (this.config.update_render) {
              var sx = scheduler2._els["dhx_cal_data"][0].scrollTop;
              this.update_view();
              scheduler2._els["dhx_cal_data"][0].scrollTop = sx;
            } else
              this.updateEvent(this._drag_id);
          }
          if (this._table_view) {
            this.for_rendered(this._drag_id, function(r) {
              r.className += " dhx_in_move dhx_cal_event_drag";
            });
          }
          this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, e]);
        }
      } else {
        if (scheduler2.checkEvent("onMouseMove")) {
          var id2 = this._locate_event(e.target || e.srcElement);
          this.callEvent("onMouseMove", [id2, e]);
        }
      }
    };
    scheduler2._on_mouse_down = function(e, src) {
      if (e.button == 2)
        return;
      if (this.config.readonly || this._drag_mode)
        return;
      src = src || (e.target || e.srcElement);
      var classname = scheduler2._getClassName(src).split(" ")[0];
      if (this.config.drag_event_body && classname == "dhx_body") {
        if (src.parentNode && src.parentNode.className.indexOf("dhx_cal_select_menu") === -1) {
          classname = "dhx_event_move";
          this._dragEventBody = true;
        }
      }
      switch (classname) {
        case "dhx_cal_event_line":
        case "dhx_cal_event_clear":
          if (this._table_view)
            this._drag_mode = "move";
          break;
        case "dhx_event_move":
        case "dhx_wa_ev_body":
          this._drag_mode = "move";
          break;
        case "dhx_event_resize":
          this._drag_mode = "resize";
          var fullClass = scheduler2._getClassName(src);
          if (fullClass.indexOf("dhx_event_resize_end") < 0) {
            scheduler2._drag_from_start = true;
          } else {
            scheduler2._drag_from_start = false;
          }
          break;
        case "dhx_scale_holder":
        case "dhx_scale_holder_now":
        case "dhx_month_body":
        case "dhx_matrix_cell":
        case "dhx_marked_timespan":
          this._drag_mode = "create";
          break;
        case "":
          if (src.parentNode)
            return scheduler2._on_mouse_down(e, src.parentNode);
          break;
        default:
          if (!scheduler2.checkEvent("onMouseDown") || scheduler2.callEvent("onMouseDown", [classname, e])) {
            if (src.parentNode && src != this && classname != "dhx_body") {
              return scheduler2._on_mouse_down(e, src.parentNode);
            }
          }
          this._drag_mode = null;
          this._drag_id = null;
          break;
      }
      if (this._drag_mode) {
        var id2 = this._locate_event(src);
        if (!this.config["drag_" + this._drag_mode] || !this.callEvent("onBeforeDrag", [id2, this._drag_mode, e]))
          this._drag_mode = this._drag_id = 0;
        else {
          this._drag_id = id2;
          if (this._edit_id != this._drag_id || this._edit_id && this._drag_mode == "create")
            this._close_not_saved();
          if (!this._drag_mode)
            return;
          this._drag_event = scheduler2._lame_clone(this.getEvent(this._drag_id) || {});
          this._drag_pos = this._mouse_coords(e);
        }
      }
      this._drag_start = null;
    };
    scheduler2._get_private_properties = function(event2) {
      var fields = {};
      for (var i in event2) {
        if (i.indexOf("_") === 0) {
          fields[i] = true;
        }
      }
      return fields;
    };
    scheduler2._clear_temporary_properties = function(clean, flagged_event) {
      var initial = this._get_private_properties(clean);
      var current_state = this._get_private_properties(flagged_event);
      for (var i in current_state) {
        if (!initial[i]) {
          delete flagged_event[i];
        }
      }
    };
    scheduler2._on_mouse_up = function(e) {
      if (e && e.button == 2 && this._mobile)
        return;
      if (this._drag_mode && this._drag_id) {
        this._els["dhx_cal_data"][0].style.cursor = "default";
        var drag_id = this._drag_id;
        var mode = this._drag_mode;
        var moved = !this._drag_pos || this._drag_pos.has_moved;
        delete this._drag_event._move_event_shift;
        var ev = this.getEvent(this._drag_id);
        if (moved && (this._drag_event._dhx_changed || !this._drag_event.start_date || ev.start_date.valueOf() != this._drag_event.start_date.valueOf() || ev.end_date.valueOf() != this._drag_event.end_date.valueOf())) {
          var is_new = this._drag_mode == "new-size";
          if (!this.callEvent("onBeforeEventChanged", [ev, e, is_new, this._drag_event])) {
            if (is_new)
              this.deleteEvent(ev.id, true);
            else {
              this._drag_event._dhx_changed = false;
              this._clear_temporary_properties(ev, this._drag_event);
              scheduler2._lame_copy(ev, this._drag_event);
              this.updateEvent(ev.id);
            }
          } else {
            this._drag_id = this._drag_mode = null;
            if (is_new && this.config.edit_on_create) {
              this.unselect();
              this._new_event = /* @__PURE__ */ new Date();
              if (this._table_view || this.config.details_on_create || !this.config.select || !this.isOneDayEvent(this.getEvent(drag_id))) {
                scheduler2.callEvent("onDragEnd", [drag_id, mode, e]);
                return this.showLightbox(drag_id);
              }
              this._drag_pos = true;
              this._select_id = this._edit_id = drag_id;
            } else {
              if (!this._new_event)
                this.callEvent(is_new ? "onEventAdded" : "onEventChanged", [drag_id, this.getEvent(drag_id)]);
            }
          }
        }
        if (this._drag_pos && (this._drag_pos.has_moved || this._drag_pos === true)) {
          this._drag_id = this._drag_mode = null;
          this.render_view_data();
        }
        scheduler2.callEvent("onDragEnd", [drag_id, mode, e]);
      }
      this._drag_id = null;
      this._drag_mode = null;
      this._drag_pos = null;
      this._drag_event = null;
      this._drag_from_start = null;
    };
    scheduler2._trigger_dyn_loading = function() {
      if (this._load_mode && this._load()) {
        this._render_wait = true;
        return true;
      } else {
        return false;
      }
    };
    scheduler2.update_view = function() {
      this._reset_ignores();
      this._update_nav_bar(this.config.header, this.$container.querySelector(".dhx_cal_navline"));
      var view = this[this._mode + "_view"];
      if (view) {
        view.call(this, true);
      } else {
        this._reset_scale();
      }
      if (this._trigger_dyn_loading()) {
        return true;
      }
      this.render_view_data();
    };
    scheduler2.isViewExists = function(mode) {
      return !!(scheduler2[mode + "_view"] || scheduler2.date[mode + "_start"] && scheduler2.templates[mode + "_date"] && scheduler2.templates[mode + "_scale_date"]);
    };
    scheduler2._set_aria_buttons_attrs = function() {
      var buttonGroups = ["dhx_cal_next_button", "dhx_cal_prev_button", "dhx_cal_tab", "dhx_cal_today_button"];
      for (var i = 0; i < buttonGroups.length; i++) {
        var group = this._els[buttonGroups[i]];
        for (var j = 0; group && j < group.length; j++) {
          var name = group[j].getAttribute("data-tab") || group[j].getAttribute("name");
          var label = this.locale.labels[buttonGroups[i]];
          if (name) {
            label = this.locale.labels[name + "_tab"] || this.locale.labels[name] || label;
          }
          if (buttonGroups[i] == "dhx_cal_next_button") {
            label = this.locale.labels.next;
          } else if (buttonGroups[i] == "dhx_cal_prev_button") {
            label = this.locale.labels.prev;
          }
          this._waiAria.headerButtonsAttributes(group[j], label || "");
        }
      }
    };
    scheduler2.updateView = function(date, mode) {
      if (!this.$container) {
        throw new Error("The scheduler is not initialized. \n **scheduler.updateView** or **scheduler.setCurrentView** can be called only after **scheduler.init**");
      }
      date = date || this._date;
      mode = mode || this._mode;
      var dhx_cal_data = "dhx_cal_data";
      if (!this.locale.labels.icon_form) {
        this.locale.labels.icon_form = this.locale.labels.icon_edit;
      }
      var container = this._obj;
      var oldClass = "dhx_scheduler_" + this._mode;
      var newClass = "dhx_scheduler_" + mode;
      if (!this._mode || container.className.indexOf(oldClass) == -1) {
        container.className += " " + newClass;
      } else {
        container.className = container.className.replace(oldClass, newClass);
      }
      var dhx_multi_day = "dhx_multi_day";
      var prev_scroll = this._mode == mode && this.config.preserve_scroll ? this._els[dhx_cal_data][0].scrollTop : false;
      var multidayScroll;
      if (this._els[dhx_multi_day] && this._els[dhx_multi_day][0]) {
        multidayScroll = this._els[dhx_multi_day][0].scrollTop;
      }
      if (this[this._mode + "_view"] && mode && this._mode != mode)
        this[this._mode + "_view"](false);
      this._close_not_saved();
      if (this._els[dhx_multi_day]) {
        this._els[dhx_multi_day][0].parentNode.removeChild(this._els[dhx_multi_day][0]);
        this._els[dhx_multi_day] = null;
      }
      this._mode = mode;
      this._date = date;
      this._table_view = this._mode == "month";
      this._dy_shift = 0;
      this.update_view();
      this._set_aria_buttons_attrs();
      var tabs = this._els["dhx_cal_tab"];
      if (tabs) {
        for (var i = 0; i < tabs.length; i++) {
          var tab = tabs[i];
          if (tab.getAttribute("data-tab") == this._mode || tab.getAttribute("name") == this._mode + "_tab") {
            tab.classList.add("active");
            this._waiAria.headerToggleState(tab, true);
          } else {
            tab.classList.remove("active");
            this._waiAria.headerToggleState(tab, false);
          }
        }
      }
      if (typeof prev_scroll == "number")
        this._els[dhx_cal_data][0].scrollTop = prev_scroll;
      if (typeof multidayScroll == "number" && this._els[dhx_multi_day] && this._els[dhx_multi_day][0]) {
        this._els[dhx_multi_day][0].scrollTop = multidayScroll;
      }
    };
    scheduler2.setCurrentView = function(date, mode) {
      if (!this.callEvent("onBeforeViewChange", [this._mode, this._date, mode || this._mode, date || this._date]))
        return;
      this.updateView(date, mode);
      this.callEvent("onViewChange", [this._mode, this._date]);
    };
    scheduler2.render = function(date, mode) {
      scheduler2.setCurrentView(date, mode);
    };
    scheduler2._render_x_header = function(i, left, date, container, offset_top) {
      offset_top = offset_top || 0;
      var head = document.createElement("div");
      head.className = "dhx_scale_bar";
      if (this.templates[this._mode + "_scalex_class"]) {
        head.className += " " + this.templates[this._mode + "_scalex_class"](date);
      }
      var width = this._cols[i];
      if (this._mode == "month" && i === 0 && this.config.left_border) {
        head.className += " dhx_scale_bar_border";
        left = left + 1;
      }
      this.set_xy(head, width, this.xy.scale_height - 1, left, offset_top);
      var columnHeaderText = this.templates[this._mode + "_scale_date"](date, this._mode);
      head.innerHTML = columnHeaderText;
      this._waiAria.dayHeaderAttr(head, columnHeaderText);
      container.appendChild(head);
    };
    scheduler2._get_columns_num = function(from, to) {
      var count = 7;
      if (!scheduler2._table_view) {
        var count_n = scheduler2.date["get_" + scheduler2._mode + "_end"];
        if (count_n)
          to = count_n(from);
        count = Math.round((to.valueOf() - from.valueOf()) / (1e3 * 60 * 60 * 24));
      }
      return count;
    };
    scheduler2._get_timeunit_start = function() {
      return this.date[this._mode + "_start"](new Date(this._date.valueOf()));
    };
    scheduler2._get_view_end = function() {
      var dd = this._get_timeunit_start();
      var ed = scheduler2.date.add(dd, 1, this._mode);
      if (!scheduler2._table_view) {
        var count_n = scheduler2.date["get_" + scheduler2._mode + "_end"];
        if (count_n)
          ed = count_n(dd);
      }
      return ed;
    };
    scheduler2._calc_scale_sizes = function(width, from, to) {
      var rtl = this.config.rtl;
      var summ = width;
      var count = this._get_columns_num(from, to);
      this._process_ignores(from, count, "day", 1);
      var realcount = count - this._ignores_detected;
      for (var i = 0; i < count; i++) {
        if (this._ignores[i]) {
          this._cols[i] = 0;
          realcount++;
        } else {
          this._cols[i] = Math.floor(summ / (realcount - i));
        }
        summ -= this._cols[i];
        this._colsS[i] = (this._cols[i - 1] || 0) + (this._colsS[i - 1] || (this._table_view ? 0 : rtl ? this.xy.scroll_width : this.xy.scale_width));
      }
      this._colsS["col_length"] = count;
      this._colsS[count] = this._cols[count - 1] + this._colsS[count - 1] || 0;
    };
    scheduler2._set_scale_col_size = function(div, width, left) {
      var c = this.config;
      this.set_xy(div, width, c.hour_size_px * (c.last_hour - c.first_hour), left + this.xy.scale_width + 1, 0);
    };
    scheduler2._render_scales = function(header, data_area2) {
      var sd = new Date(scheduler2._min_date), ed = new Date(scheduler2._max_date), today = this.date.date_part(scheduler2._currentDate());
      var summ = parseInt(header.style.width, 10) - 1;
      var d = new Date(this._min_date);
      var count = this._get_columns_num(sd, ed);
      this._calc_scale_sizes(summ, sd, ed);
      var left = 0;
      header.innerHTML = "";
      for (var i = 0; i < count; i++) {
        if (!this._ignores[i]) {
          this._render_x_header(i, left, d, header);
        }
        if (!this._table_view) {
          var scales = document.createElement("div");
          var cls = "dhx_scale_holder";
          if (d.valueOf() == today.valueOf())
            cls += " dhx_scale_holder_now";
          scales.setAttribute("data-column-index", i);
          if (this._ignores_detected && this._ignores[i]) {
            cls += " dhx_scale_ignore";
          }
          for (let i2 = this.config.first_hour * 1; i2 < this.config.last_hour; i2++) {
            const firstHalf = document.createElement("div");
            firstHalf.className = "dhx_scale_time_slot dhx_scale_time_slot_hour_start";
            firstHalf.style.height = this.config.hour_size_px / 2 + "px";
            let slotDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), i2, 0);
            firstHalf.setAttribute("data-slot-date", this.templates.format_date(slotDate));
            let htmlContent = this.templates.time_slot_text(slotDate);
            if (htmlContent) {
              firstHalf.innerHTML = htmlContent;
            }
            let cssClass = this.templates.time_slot_class(slotDate);
            if (cssClass) {
              firstHalf.classList.add(cssClass);
            }
            scales.appendChild(firstHalf);
            const secondHalf = document.createElement("div");
            secondHalf.className = "dhx_scale_time_slot";
            slotDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), i2, 30);
            secondHalf.setAttribute("data-slot-date", this.templates.format_date(slotDate));
            secondHalf.style.height = this.config.hour_size_px / 2 + "px";
            htmlContent = this.templates.time_slot_text(slotDate);
            if (htmlContent) {
              secondHalf.innerHTML = htmlContent;
            }
            cssClass = this.templates.time_slot_class(slotDate);
            if (cssClass) {
              secondHalf.classList.add(cssClass);
            }
            scales.appendChild(secondHalf);
          }
          scales.className = cls + " " + this.templates.week_date_class(d, today);
          this._waiAria.dayColumnAttr(scales, d);
          this._set_scale_col_size(scales, this._cols[i], left);
          data_area2.appendChild(scales);
          this.callEvent("onScaleAdd", [scales, d]);
        }
        left += this._cols[i];
        d = this.date.add(d, 1, "day");
        d = this.date.day_start(d);
      }
    };
    scheduler2._getNavDateElement = function() {
      return this.$container.querySelector(".dhx_cal_date");
    };
    scheduler2._reset_scale = function() {
      if (!this.templates[this._mode + "_date"])
        return;
      var header = this._els["dhx_cal_header"][0];
      var data_area2 = this._els["dhx_cal_data"][0];
      var c = this.config;
      header.innerHTML = "";
      data_area2.innerHTML = "";
      var str = (c.readonly || !c.drag_resize ? " dhx_resize_denied" : "") + (c.readonly || !c.drag_move ? " dhx_move_denied" : "");
      data_area2.className = "dhx_cal_data" + str;
      this._scales = {};
      this._cols = [];
      this._colsS = { height: 0 };
      this._dy_shift = 0;
      this.set_sizes();
      var d, sd;
      var dd = this._get_timeunit_start(), ed = scheduler2._get_view_end();
      d = sd = this._table_view ? scheduler2.date.week_start(dd) : dd;
      this._min_date = d;
      var navBarDateStr = this.templates[this._mode + "_date"](dd, ed, this._mode);
      var scaleElement = this._getNavDateElement();
      if (scaleElement) {
        scaleElement.innerHTML = navBarDateStr;
        this._waiAria.navBarDateAttr(scaleElement, navBarDateStr);
      }
      this._max_date = ed;
      scheduler2._render_scales(header, data_area2);
      if (this._table_view)
        this._reset_month_scale(data_area2, dd, sd);
      else {
        this._reset_hours_scale(data_area2, dd, sd);
        if (c.multi_day) {
          var dhx_multi_day = "dhx_multi_day";
          if (this._els[dhx_multi_day]) {
            this._els[dhx_multi_day][0].parentNode.removeChild(this._els[dhx_multi_day][0]);
            this._els[dhx_multi_day] = null;
          }
          var c1 = document.createElement("div");
          c1.className = dhx_multi_day;
          c1.style.visibility = "hidden";
          c1.style.display = "none";
          var totalWidth = this._colsS[this._colsS.col_length];
          var offset = c.rtl ? this.xy.scale_width : this.xy.scroll_width;
          var hiddenWidth = Math.max(totalWidth + offset, 0);
          this.set_xy(c1, hiddenWidth, 0, 0);
          data_area2.parentNode.insertBefore(c1, data_area2);
          var c2 = c1.cloneNode(true);
          c2.className = dhx_multi_day + "_icon";
          c2.style.visibility = "hidden";
          c2.style.display = "none";
          this.set_xy(c2, this.xy.scale_width + 1, 0, 0);
          c1.appendChild(c2);
          this._els[dhx_multi_day] = [c1, c2];
          scheduler2.event(this._els[dhx_multi_day][0], "click", this._click.dhx_cal_data);
        }
      }
    };
    scheduler2._reset_hours_scale = function(b, dd, sd) {
      var c = document.createElement("div");
      c.className = "dhx_scale_holder";
      var date = new Date(1980, 1, 1, this.config.first_hour, 0, 0);
      for (var i = this.config.first_hour * 1; i < this.config.last_hour; i++) {
        var cc = document.createElement("div");
        cc.className = "dhx_scale_hour";
        cc.style.height = this.config.hour_size_px + "px";
        var width = this.xy.scale_width;
        if (this.config.left_border) {
          cc.className += " dhx_scale_hour_border";
        }
        cc.style.width = width + "px";
        var content = scheduler2.templates.hour_scale(date);
        cc.innerHTML = content;
        this._waiAria.hourScaleAttr(cc, content);
        c.appendChild(cc);
        date = this.date.add(date, 1, "hour");
      }
      b.appendChild(c);
      if (this.config.scroll_hour)
        b.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour);
    };
    scheduler2._currentDate = function() {
      if (scheduler2.config.now_date) {
        return new Date(scheduler2.config.now_date);
      }
      return /* @__PURE__ */ new Date();
    };
    scheduler2._reset_ignores = function() {
      this._ignores = {};
      this._ignores_detected = 0;
    };
    scheduler2._process_ignores = function(sd, n, mode, step, preserve) {
      this._reset_ignores();
      var ignore = scheduler2["ignore_" + this._mode];
      if (ignore) {
        var ign_date = new Date(sd);
        for (var i = 0; i < n; i++) {
          if (ignore(ign_date)) {
            this._ignores_detected += 1;
            this._ignores[i] = true;
            if (preserve)
              n++;
          }
          ign_date = scheduler2.date.add(ign_date, step, mode);
          if (scheduler2.date[mode + "_start"])
            ign_date = scheduler2.date[mode + "_start"](ign_date);
        }
      }
    };
    scheduler2._render_month_scale = function(div, dd, sd, rows) {
      var ed = scheduler2.date.add(dd, 1, "month"), view_start = new Date(sd);
      var cd = scheduler2._currentDate();
      cd = this.date.date_part(cd);
      sd = this.date.date_part(sd);
      rows = rows || Math.ceil(Math.round((ed.valueOf() - sd.valueOf()) / (60 * 60 * 24 * 1e3)) / 7);
      var tdwidths = [];
      for (var i = 0; i <= 7; i++) {
        var cell_width = this._cols[i] || 0;
        if (!isNaN(Number(cell_width))) {
          cell_width = cell_width + "px";
        }
        tdwidths[i] = cell_width;
      }
      function getCellHeight(row2) {
        var h = scheduler2._colsS.height;
        if (scheduler2._colsS.heights[row2 + 1] !== void 0) {
          h = scheduler2._colsS.heights[row2 + 1] - (scheduler2._colsS.heights[row2] || 0);
        }
        return h;
      }
      var cellheight = 0;
      const table = document.createElement("div");
      table.classList.add("dhx_cal_month_table");
      for (var i = 0; i < rows; i++) {
        var row = document.createElement("div");
        row.classList.add("dhx_cal_month_row");
        row.style.height = getCellHeight(i) + "px";
        table.appendChild(row);
        for (var j = 0; j < 7; j++) {
          var cell = document.createElement("div");
          row.appendChild(cell);
          var cls = "dhx_cal_month_cell";
          if (sd < dd)
            cls += " dhx_before";
          else if (sd >= ed)
            cls += " dhx_after";
          else if (sd.valueOf() == cd.valueOf())
            cls += " dhx_now";
          if (this._ignores_detected && this._ignores[j]) {
            cls += " dhx_scale_ignore";
          }
          cell.className = cls + " " + this.templates.month_date_class(sd, cd);
          cell.setAttribute("data-cell-date", scheduler2.templates.format_date(sd));
          var body_class = "dhx_month_body";
          var head_class = "dhx_month_head";
          if (j === 0 && this.config.left_border) {
            body_class += " dhx_month_body_border";
            head_class += " dhx_month_head_border";
          }
          if (!this._ignores_detected || !this._ignores[j]) {
            cell.style.width = tdwidths[j];
            this._waiAria.monthCellAttr(cell, sd);
            var cellHead = document.createElement("div");
            cellHead.style.height = scheduler2.xy.month_head_height + "px";
            cellHead.className = head_class;
            cellHead.innerHTML = this.templates.month_day(sd);
            cell.appendChild(cellHead);
            var cellBody = document.createElement("div");
            cellBody.className = body_class;
            cell.appendChild(cellBody);
          } else {
            cell.appendChild(document.createElement("div"));
            cell.appendChild(document.createElement("div"));
          }
          var bf1 = sd.getDate();
          sd = this.date.add(sd, 1, "day");
          if (sd.getDate() - bf1 > 1)
            sd = new Date(sd.getFullYear(), sd.getMonth(), bf1 + 1, 12, 0);
        }
        scheduler2._colsS.heights[i] = cellheight;
        cellheight += getCellHeight(i);
      }
      this._min_date = view_start;
      this._max_date = sd;
      div.innerHTML = "";
      div.appendChild(table);
      this._scales = {};
      var cells = div.querySelectorAll("[data-cell-date]");
      cells.forEach((cell2) => {
        const date = scheduler2.templates.parse_date(cell2.getAttribute("data-cell-date"));
        const body = cell2.querySelector(".dhx_month_body");
        this._scales[+date] = body;
        this.callEvent("onScaleAdd", [this._scales[+date], date]);
      });
      return this._max_date;
    };
    scheduler2._reset_month_scale = function(b, dd, sd, rows) {
      var ed = scheduler2.date.add(dd, 1, "month");
      sd = this.date.date_part(sd);
      rows = rows || Math.ceil(Math.round((ed.valueOf() - sd.valueOf()) / (60 * 60 * 24 * 1e3)) / 7);
      var height = Math.floor(b.clientHeight / rows) - this.xy.month_head_height;
      this._colsS.height = height + this.xy.month_head_height;
      this._colsS.heights = [];
      return scheduler2._render_month_scale(b, dd, sd, rows);
    };
    scheduler2.getView = function(viewName) {
      if (!viewName) {
        viewName = scheduler2.getState().mode;
      }
      if (scheduler2.matrix && scheduler2.matrix[viewName]) {
        return scheduler2.matrix[viewName];
      }
      if (scheduler2._props && scheduler2._props[viewName]) {
        return scheduler2._props[viewName];
      }
      return null;
    };
    scheduler2.getLabel = function(property, key) {
      var sections = this.config.lightbox.sections;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].map_to == property) {
          var options = sections[i].options;
          for (var j = 0; j < options.length; j++) {
            if (options[j].key == key) {
              return options[j].label;
            }
          }
        }
      }
      return "";
    };
    scheduler2.updateCollection = function(list_name, collection) {
      var list = scheduler2.serverList(list_name);
      if (!list)
        return false;
      list.splice(0, list.length);
      list.push.apply(list, collection || []);
      scheduler2.callEvent("onOptionsLoad", []);
      scheduler2.resetLightbox();
      scheduler2.hideCover();
      return true;
    };
    scheduler2._lame_clone = function(object, cache) {
      var i, t2, result;
      cache = cache || [];
      for (i = 0; i < cache.length; i += 2)
        if (object === cache[i])
          return cache[i + 1];
      if (object && typeof object == "object") {
        result = Object.create(object);
        t2 = [Array, Date, Number, String, Boolean];
        for (i = 0; i < t2.length; i++) {
          if (object instanceof t2[i])
            result = i ? new t2[i](object) : new t2[i]();
        }
        cache.push(object, result);
        for (i in object) {
          if (Object.prototype.hasOwnProperty.apply(object, [i]))
            result[i] = scheduler2._lame_clone(object[i], cache);
        }
      }
      return result || object;
    };
    scheduler2._lame_copy = function(target, source) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
      return target;
    };
    scheduler2._get_date_from_pos = function(pos) {
      var start = this._min_date.valueOf() + (pos.y * this.config.time_step + (this._table_view ? 0 : pos.x) * 24 * 60) * 6e4;
      return new Date(this._correct_shift(start));
    };
    scheduler2.getActionData = function(n_ev) {
      var pos = this._mouse_coords(n_ev);
      return { date: this._get_date_from_pos(pos), section: pos.section };
    };
    scheduler2._focus = function(node, select) {
      if (node && node.focus) {
        if (this._mobile) {
          window.setTimeout(function() {
            node.focus();
          }, 10);
        } else {
          try {
            if (select && node.select && node.offsetWidth) {
              node.select();
            }
            node.focus();
          } catch (e) {
          }
        }
      }
    };
    function getDaysDifference(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = differenceInTime / (1e3 * 3600 * 24);
      return Math.abs(differenceInDays);
    }
    scheduler2._get_real_event_length = function(startDate, endDate, config) {
      var eventLength = endDate - startDate;
      var ignore = this["ignore_" + this._mode];
      var startColumnIndex = 0, endColumnIndex;
      if (config.render) {
        startColumnIndex = this._get_date_index(config, startDate);
        endColumnIndex = this._get_date_index(config, endDate);
        if (startDate.valueOf() < scheduler2.getState().min_date.valueOf()) {
          startColumnIndex = -getDaysDifference(startDate, scheduler2.getState().min_date);
        }
        if (endDate.valueOf() > scheduler2.getState().max_date.valueOf()) {
          endColumnIndex += getDaysDifference(endDate, scheduler2.getState().max_date);
        }
      } else {
        endColumnIndex = Math.round(eventLength / 60 / 60 / 1e3 / 24);
      }
      var last_column = true;
      while (startColumnIndex < endColumnIndex) {
        var check = scheduler2.date.add(endDate, -config.x_step, config.x_unit);
        if (ignore && ignore(endDate) && (!last_column || last_column && ignore(check))) {
          eventLength -= endDate - check;
        } else {
          let excludedDuration = 0;
          const intervalStart = new Date(Math.max(check.valueOf(), startDate.valueOf()));
          const intervalEnd = endDate;
          const leftCellCutOffStart = new Date(intervalStart.getFullYear(), intervalStart.getMonth(), intervalStart.getDate(), config.first_hour || 0);
          const leftCellCutOffEnd = new Date(intervalStart.getFullYear(), intervalStart.getMonth(), intervalStart.getDate(), config.last_hour || 24);
          const rightCellCutOffStart = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), config.first_hour || 0);
          const rightCellCutOffEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), config.last_hour || 24);
          if (intervalEnd.valueOf() > rightCellCutOffEnd.valueOf()) {
            excludedDuration += intervalEnd - rightCellCutOffEnd;
          }
          if (intervalEnd.valueOf() > rightCellCutOffStart.valueOf()) {
            excludedDuration += config._start_correction;
          } else {
            excludedDuration += intervalEnd.getHours() * 60 * 60 * 1e3 + intervalEnd.getMinutes() * 60 * 1e3;
          }
          if (intervalStart.valueOf() <= leftCellCutOffEnd.valueOf()) {
            excludedDuration += config._end_correction;
          }
          if (intervalStart.valueOf() < leftCellCutOffStart.valueOf()) {
            excludedDuration += leftCellCutOffStart.valueOf() - intervalStart.valueOf();
          }
          eventLength -= excludedDuration;
          last_column = false;
        }
        endDate = check;
        endColumnIndex--;
      }
      return eventLength;
    };
    scheduler2._get_fictional_event_length = function(end_date, ev_length, obj, back) {
      var sd = new Date(end_date);
      var dir = back ? -1 : 1;
      if (obj._start_correction || obj._end_correction) {
        var today;
        if (back)
          today = sd.getHours() * 60 + sd.getMinutes() - (obj.first_hour || 0) * 60;
        else
          today = (obj.last_hour || 0) * 60 - (sd.getHours() * 60 + sd.getMinutes());
        var per_day = (obj.last_hour - obj.first_hour) * 60;
        var days = Math.ceil((ev_length / (60 * 1e3) - today) / per_day);
        if (days < 0)
          days = 0;
        ev_length += days * (24 * 60 - per_day) * 60 * 1e3;
      }
      var fd = new Date(end_date * 1 + ev_length * dir);
      var ignore = this["ignore_" + this._mode];
      var start_slot = 0, end_slot;
      if (obj.render) {
        start_slot = this._get_date_index(obj, sd);
        end_slot = this._get_date_index(obj, fd);
      } else {
        end_slot = Math.round(ev_length / 60 / 60 / 1e3 / 24);
      }
      function condition() {
        const isDayUnit = obj.x_unit === "day";
        return isDayUnit ? start_slot * dir < end_slot * dir : start_slot * dir <= end_slot * dir;
      }
      while (condition()) {
        var check = scheduler2.date.add(sd, obj.x_step * dir, obj.x_unit);
        if (ignore && ignore(sd)) {
          ev_length += (check - sd) * dir;
          end_slot += dir;
        }
        sd = check;
        start_slot += dir;
      }
      return ev_length;
    };
    scheduler2._get_section_view = function() {
      return this.getView();
    };
    scheduler2._get_section_property = function() {
      if (this.matrix && this.matrix[this._mode]) {
        return this.matrix[this._mode].y_property;
      } else if (this._props && this._props[this._mode]) {
        return this._props[this._mode].map_to;
      }
      return null;
    };
    scheduler2._is_initialized = function() {
      var state = this.getState();
      return this._obj && state.date && state.mode;
    };
    scheduler2._is_lightbox_open = function() {
      var state = this.getState();
      return state.lightbox_id !== null && state.lightbox_id !== void 0;
    };
  }
  const defaultDomEvents = { event: function(el2, event2, handler) {
    if (el2.addEventListener)
      el2.addEventListener(event2, handler, false);
    else if (el2.attachEvent)
      el2.attachEvent("on" + event2, handler);
  }, eventRemove: function(el2, event2, handler) {
    if (el2.removeEventListener)
      el2.removeEventListener(event2, handler, false);
    else if (el2.detachEvent)
      el2.detachEvent("on" + event2, handler);
  } };
  function createEventScope() {
    var domEvents = function(addEvent, removeEvent) {
      addEvent = addEvent || defaultDomEvents.event;
      removeEvent = removeEvent || defaultDomEvents.eventRemove;
      var handlers = [];
      var eventScope = { attach: function(el2, event2, callback, capture) {
        handlers.push({ element: el2, event: event2, callback, capture });
        addEvent(el2, event2, callback, capture);
      }, detach: function(el2, event2, callback, capture) {
        removeEvent(el2, event2, callback, capture);
        for (var i = 0; i < handlers.length; i++) {
          var handler = handlers[i];
          if (handler.element === el2 && handler.event === event2 && handler.callback === callback && handler.capture === capture) {
            handlers.splice(i, 1);
            i--;
          }
        }
      }, detachAll: function() {
        var staticArray = handlers.slice();
        for (var i = 0; i < staticArray.length; i++) {
          var handler = staticArray[i];
          eventScope.detach(handler.element, handler.event, handler.callback, handler.capture);
          eventScope.detach(handler.element, handler.event, handler.callback, void 0);
          eventScope.detach(handler.element, handler.event, handler.callback, false);
          eventScope.detach(handler.element, handler.event, handler.callback, true);
        }
        handlers.splice(0, handlers.length);
      }, extend: function() {
        return domEvents(this.event, this.eventRemove);
      } };
      return eventScope;
    };
    return domEvents();
  }
  function extend$i(scheduler2) {
    var domEvents = createEventScope();
    scheduler2.event = domEvents.attach;
    scheduler2.eventRemove = domEvents.detach;
    scheduler2._eventRemoveAll = domEvents.detachAll;
    scheduler2._createDomEventScope = domEvents.extend;
    scheduler2._trim = function(str) {
      var func = String.prototype.trim || function() {
        return this.replace(/^\s+|\s+$/g, "");
      };
      return func.apply(str);
    };
    scheduler2._isDate = function(obj) {
      if (obj && typeof obj == "object") {
        return !!(obj.getFullYear && obj.getMonth && obj.getDate);
      } else {
        return false;
      }
    };
    scheduler2._isObject = function(obj) {
      return obj && typeof obj == "object";
    };
  }
  function extend$h(scheduler2) {
    (function() {
      var htmlTags = new RegExp("<(?:.|\n)*?>", "gm");
      var extraSpaces = new RegExp(" +", "gm");
      function stripHTMLLite(htmlText) {
        return (htmlText + "").replace(htmlTags, " ").replace(extraSpaces, " ");
      }
      var singleQuotes = new RegExp("'", "gm");
      function escapeQuotes(text) {
        return (text + "").replace(singleQuotes, "&#39;");
      }
      scheduler2._waiAria = { getAttributeString: function(attr) {
        var attributes = [" "];
        for (var i2 in attr) {
          if (typeof attr[i2] != "function" && typeof attr[i2] != "object") {
            var text = escapeQuotes(stripHTMLLite(attr[i2]));
            attributes.push(i2 + "='" + text + "'");
          }
        }
        attributes.push(" ");
        return attributes.join(" ");
      }, setAttributes: function(div, values) {
        for (var i2 in values) {
          div.setAttribute(i2, stripHTMLLite(values[i2]));
        }
        return div;
      }, labelAttr: function(div, content) {
        return this.setAttributes(div, { "aria-label": content });
      }, label: function(label) {
        return scheduler2._waiAria.getAttributeString({ "aria-label": label });
      }, hourScaleAttr: function(div, content) {
        this.labelAttr(div, content);
      }, monthCellAttr: function(div, date) {
        this.labelAttr(div, scheduler2.templates.day_date(date));
      }, navBarDateAttr: function(div, content) {
        this.labelAttr(div, content);
      }, dayHeaderAttr: function(div, content) {
        this.labelAttr(div, content);
      }, dayColumnAttr: function(div, date) {
        this.dayHeaderAttr(div, scheduler2.templates.day_date(date));
      }, headerButtonsAttributes: function(div, label) {
        return this.setAttributes(div, { role: "button", "aria-label": label });
      }, headerToggleState: function(div, isActive) {
        return this.setAttributes(div, { "aria-pressed": isActive ? "true" : "false" });
      }, getHeaderCellAttr: function(dateString) {
        return scheduler2._waiAria.getAttributeString({ "aria-label": dateString });
      }, eventAttr: function(event2, div) {
        this._eventCommonAttr(event2, div);
      }, _eventCommonAttr: function(event2, div) {
        div.setAttribute("aria-label", stripHTMLLite(scheduler2.templates.event_text(event2.start_date, event2.end_date, event2)));
        if (scheduler2.config.readonly) {
          div.setAttribute("aria-readonly", true);
        }
        if (event2.$dataprocessor_class) {
          div.setAttribute("aria-busy", true);
        }
        div.setAttribute("aria-selected", scheduler2.getState().select_id == event2.id ? "true" : "false");
      }, setEventBarAttr: function(event2, div) {
        this._eventCommonAttr(event2, div);
      }, _getAttributes: function(attributeSetter, arg) {
        var result = { setAttribute: function(name, value) {
          this[name] = value;
        } };
        attributeSetter.apply(this, [arg, result]);
        return result;
      }, eventBarAttrString: function(event2) {
        return this.getAttributeString(this._getAttributes(this.setEventBarAttr, event2));
      }, agendaHeadAttrString: function() {
        return this.getAttributeString({ role: "row" });
      }, agendaHeadDateString: function(label) {
        return this.getAttributeString({ role: "columnheader", "aria-label": label });
      }, agendaHeadDescriptionString: function(label) {
        return this.agendaHeadDateString(label);
      }, agendaDataAttrString: function() {
        return this.getAttributeString({ role: "grid" });
      }, agendaEventAttrString: function(event2) {
        var attrs = this._getAttributes(this._eventCommonAttr, event2);
        attrs["role"] = "row";
        return this.getAttributeString(attrs);
      }, agendaDetailsBtnString: function() {
        return this.getAttributeString({ role: "button", "aria-label": scheduler2.locale.labels.icon_details });
      }, gridAttrString: function() {
        return this.getAttributeString({ role: "grid" });
      }, gridRowAttrString: function(event2) {
        return this.agendaEventAttrString(event2);
      }, gridCellAttrString: function(event2, column, value) {
        return this.getAttributeString({ role: "gridcell", "aria-label": [column.label === void 0 ? column.id : column.label, ": ", value] });
      }, mapAttrString: function() {
        return this.gridAttrString();
      }, mapRowAttrString: function(event2) {
        return this.gridRowAttrString(event2);
      }, mapDetailsBtnString: function() {
        return this.agendaDetailsBtnString();
      }, minicalHeader: function(div, headerId) {
        this.setAttributes(div, { id: headerId + "", "aria-live": "assertice", "aria-atomic": "true" });
      }, minicalGrid: function(div, headerId) {
        this.setAttributes(div, { "aria-labelledby": headerId + "", role: "grid" });
      }, minicalRow: function(div) {
        this.setAttributes(div, { role: "row" });
      }, minicalDayCell: function(div, date) {
        var selected = date.valueOf() < scheduler2._max_date.valueOf() && date.valueOf() >= scheduler2._min_date.valueOf();
        this.setAttributes(div, { role: "gridcell", "aria-label": scheduler2.templates.day_date(date), "aria-selected": selected ? "true" : "false" });
      }, minicalHeadCell: function(div) {
        this.setAttributes(div, { role: "columnheader" });
      }, weekAgendaDayCell: function(div, date) {
        var header = div.querySelector(".dhx_wa_scale_bar");
        var content = div.querySelector(".dhx_wa_day_data");
        var headerId = scheduler2.uid() + "";
        this.setAttributes(header, { id: headerId });
        this.setAttributes(content, { "aria-labelledby": headerId });
      }, weekAgendaEvent: function(div, event2) {
        this.eventAttr(event2, div);
      }, lightboxHiddenAttr: function(div) {
        div.setAttribute("aria-hidden", "true");
      }, lightboxVisibleAttr: function(div) {
        div.setAttribute("aria-hidden", "false");
      }, lightboxSectionButtonAttrString: function(label) {
        return this.getAttributeString({ role: "button", "aria-label": label, tabindex: "0" });
      }, yearHeader: function(div, headerId) {
        this.setAttributes(div, { id: headerId + "" });
      }, yearGrid: function(div, headerId) {
        this.minicalGrid(div, headerId);
      }, yearHeadCell: function(div) {
        return this.minicalHeadCell(div);
      }, yearRow: function(div) {
        return this.minicalRow(div);
      }, yearDayCell: function(div) {
        this.setAttributes(div, { role: "gridcell" });
      }, lightboxAttr: function(div) {
        div.setAttribute("role", "dialog");
        div.setAttribute("aria-hidden", "true");
        div.firstChild.setAttribute("role", "heading");
      }, lightboxButtonAttrString: function(buttonName) {
        return this.getAttributeString({ role: "button", "aria-label": scheduler2.locale.labels[buttonName], tabindex: "0" });
      }, eventMenuAttrString: function(iconName) {
        return this.getAttributeString({ role: "button", "aria-label": scheduler2.locale.labels[iconName] });
      }, lightboxHeader: function(div, headerText) {
        div.setAttribute("aria-label", headerText);
      }, lightboxSelectAttrString: function(time_option) {
        var label = "";
        switch (time_option) {
          case "%Y":
            label = scheduler2.locale.labels.year;
            break;
          case "%m":
            label = scheduler2.locale.labels.month;
            break;
          case "%d":
            label = scheduler2.locale.labels.day;
            break;
          case "%H:%i":
            label = scheduler2.locale.labels.hour + " " + scheduler2.locale.labels.minute;
            break;
        }
        return scheduler2._waiAria.getAttributeString({ "aria-label": label });
      }, messageButtonAttrString: function(buttonLabel) {
        return "tabindex='0' role='button' aria-label='" + buttonLabel + "'";
      }, messageInfoAttr: function(div) {
        div.setAttribute("role", "alert");
      }, messageModalAttr: function(div, uid2) {
        div.setAttribute("role", "dialog");
        if (uid2) {
          div.setAttribute("aria-labelledby", uid2);
        }
      }, quickInfoAttr: function(div) {
        div.setAttribute("role", "dialog");
      }, quickInfoHeaderAttrString: function() {
        return " role='heading' ";
      }, quickInfoHeader: function(div, header) {
        div.setAttribute("aria-label", header);
      }, quickInfoButtonAttrString: function(label) {
        return scheduler2._waiAria.getAttributeString({ role: "button", "aria-label": label, tabindex: "0" });
      }, tooltipAttr: function(div) {
        div.setAttribute("role", "tooltip");
      }, tooltipVisibleAttr: function(div) {
        div.setAttribute("aria-hidden", "false");
      }, tooltipHiddenAttr: function(div) {
        div.setAttribute("aria-hidden", "true");
      } };
      function isDisabled() {
        return !scheduler2.config.wai_aria_attributes;
      }
      for (var i in scheduler2._waiAria) {
        scheduler2._waiAria[i] = function(payload) {
          return function() {
            if (isDisabled()) {
              return " ";
            }
            return payload.apply(this, arguments);
          };
        }(scheduler2._waiAria[i]);
      }
    })();
  }
  function elementPosition(elem) {
    var top = 0, left = 0, right = 0, bottom = 0;
    if (elem.getBoundingClientRect) {
      var box = elem.getBoundingClientRect();
      var body = document.body;
      var docElem = document.documentElement || document.body.parentNode || document.body;
      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
      var clientTop = docElem.clientTop || body.clientTop || 0;
      var clientLeft = docElem.clientLeft || body.clientLeft || 0;
      top = box.top + scrollTop - clientTop;
      left = box.left + scrollLeft - clientLeft;
      right = document.body.offsetWidth - box.right;
      bottom = document.body.offsetHeight - box.bottom;
    } else {
      while (elem) {
        top = top + parseInt(elem.offsetTop, 10);
        left = left + parseInt(elem.offsetLeft, 10);
        elem = elem.offsetParent;
      }
      right = document.body.offsetWidth - elem.offsetWidth - left;
      bottom = document.body.offsetHeight - elem.offsetHeight - top;
    }
    return { y: Math.round(top), x: Math.round(left), width: elem.offsetWidth, height: elem.offsetHeight, right: Math.round(right), bottom: Math.round(bottom) };
  }
  function getRelativeEventPosition(ev, node) {
    var d = document.documentElement;
    var box = elementPosition(node);
    return { x: ev.clientX - d.clientLeft - box.x + node.scrollLeft, y: ev.clientY - d.clientTop - box.y + node.scrollTop };
  }
  function getNodePosition(elem) {
    var top = 0, left = 0, right = 0, bottom = 0;
    if (elem.getBoundingClientRect) {
      var box = elem.getBoundingClientRect();
      var body = document.body;
      var docElem = document.documentElement || document.body.parentNode || document.body;
      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
      var clientTop = docElem.clientTop || body.clientTop || 0;
      var clientLeft = docElem.clientLeft || body.clientLeft || 0;
      top = box.top + scrollTop - clientTop;
      left = box.left + scrollLeft - clientLeft;
      right = document.body.offsetWidth - box.right;
      bottom = document.body.offsetHeight - box.bottom;
    } else {
      while (elem) {
        top = top + parseInt(elem.offsetTop, 10);
        left = left + parseInt(elem.offsetLeft, 10);
        elem = elem.offsetParent;
      }
      right = document.body.offsetWidth - elem.offsetWidth - left;
      bottom = document.body.offsetHeight - elem.offsetHeight - top;
    }
    return { y: Math.round(top), x: Math.round(left), width: elem.offsetWidth, height: elem.offsetHeight, right: Math.round(right), bottom: Math.round(bottom) };
  }
  function getClassName(node) {
    if (!node)
      return "";
    var className = node.className || "";
    if (className.baseVal)
      className = className.baseVal;
    if (!className.indexOf)
      className = "";
    return className || "";
  }
  function getTargetNode(e) {
    var trg;
    if (e.tagName)
      trg = e;
    else {
      e = e || window.event;
      trg = e.target || e.srcElement;
      if (trg.shadowRoot && e.composedPath) {
        trg = e.composedPath()[0];
      }
    }
    return trg;
  }
  function locateCss(e, classname, strict) {
    if (strict === void 0)
      strict = true;
    var trg = e.target || e.srcElement;
    var css = "";
    while (trg) {
      css = getClassName(trg);
      if (css) {
        var ind = css.indexOf(classname);
        if (ind >= 0) {
          if (!strict)
            return trg;
          var left = ind === 0 || !(css.charAt(ind - 1) || "").trim();
          var right = ind + classname.length >= css.length || !css.charAt(ind + classname.length).trim();
          if (left && right)
            return trg;
        }
      }
      trg = trg.parentNode;
    }
    return null;
  }
  function isVisible(node) {
    var display = false, visibility = false;
    if (window.getComputedStyle) {
      var style = window.getComputedStyle(node, null);
      display = style["display"];
      visibility = style["visibility"];
    } else if (node.currentStyle) {
      display = node.currentStyle["display"];
      visibility = node.currentStyle["visibility"];
    }
    var hiddenSection = false;
    var recurringSection = locateCss({ target: node }, "dhx_form_repeat", false);
    if (recurringSection) {
      hiddenSection = !!(recurringSection.style.height == "0px");
    }
    hiddenSection = hiddenSection || !node.offsetHeight;
    return display != "none" && visibility != "hidden" && !hiddenSection;
  }
  function hasNonNegativeTabIndex(node) {
    return !isNaN(node.getAttribute("tabindex")) && node.getAttribute("tabindex") * 1 >= 0;
  }
  function hasHref(node) {
    var canHaveHref = { a: true, area: true };
    if (canHaveHref[node.nodeName.loLowerCase()]) {
      return !!node.getAttribute("href");
    }
    return true;
  }
  function isEnabled(node) {
    var canDisable = { input: true, select: true, textarea: true, button: true, object: true };
    if (canDisable[node.nodeName.toLowerCase()]) {
      return !node.hasAttribute("disabled");
    }
    return true;
  }
  function getFocusableNodes(root) {
    var nodes = root.querySelectorAll(["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"].join(", "));
    var nodesArray = Array.prototype.slice.call(nodes, 0);
    for (var i = 0; i < nodesArray.length; i++) {
      nodesArray[i].$position = i;
    }
    nodesArray.sort(function(a, b) {
      if (a.tabIndex === 0 && b.tabIndex !== 0) {
        return 1;
      }
      if (a.tabIndex !== 0 && b.tabIndex === 0) {
        return -1;
      }
      if (a.tabIndex === b.tabIndex) {
        return a.$position - b.$position;
      }
      if (a.tabIndex < b.tabIndex) {
        return -1;
      }
      return 1;
    });
    for (var i = 0; i < nodesArray.length; i++) {
      var node = nodesArray[i];
      var isValid = (hasNonNegativeTabIndex(node) || isEnabled(node) || hasHref(node)) && isVisible(node);
      if (!isValid) {
        nodesArray.splice(i, 1);
        i--;
      }
    }
    return nodesArray;
  }
  function isShadowDomSupported() {
    return document.head.createShadowRoot || document.head.attachShadow;
  }
  function getActiveElement() {
    var activeElement = document.activeElement;
    if (activeElement.shadowRoot) {
      activeElement = activeElement.shadowRoot.activeElement;
    }
    if (activeElement === document.body && document.getSelection) {
      activeElement = document.getSelection().focusNode || document.body;
    }
    return activeElement;
  }
  function getRootNode(element) {
    if (!element) {
      return document.body;
    }
    if (!isShadowDomSupported()) {
      return document.body;
    }
    while (element.parentNode && (element = element.parentNode)) {
      if (element instanceof ShadowRoot) {
        return element.host;
      }
    }
    return document.body;
  }
  function hasShadowParent(element) {
    return !!getRootNode(element);
  }
  const dom_helpers = { getAbsoluteLeft: function getAbsoluteLeft(htmlObject) {
    return this.getOffset(htmlObject).left;
  }, getAbsoluteTop: function getAbsoluteTop(htmlObject) {
    return this.getOffset(htmlObject).top;
  }, getOffsetSum: function getOffsetSum(elem) {
    var top = 0, left = 0;
    while (elem) {
      top = top + parseInt(elem.offsetTop);
      left = left + parseInt(elem.offsetLeft);
      elem = elem.offsetParent;
    }
    return { top, left };
  }, getOffsetRect: function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();
    var top = 0, left = 0;
    if (!/Mobi/.test(navigator.userAgent)) {
      var body = document.body;
      var docElem = document.documentElement;
      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
      var clientTop = docElem.clientTop || body.clientTop || 0;
      var clientLeft = docElem.clientLeft || body.clientLeft || 0;
      top = box.top + scrollTop - clientTop;
      left = box.left + scrollLeft - clientLeft;
    } else {
      var dummy = document.createElement("div");
      dummy.style.position = "absolute";
      dummy.style.left = "0px";
      dummy.style.top = "0px";
      dummy.style.width = "1px";
      dummy.style.height = "1px";
      document.body.appendChild(dummy);
      var dummyBox = dummy.getBoundingClientRect();
      top = box.top - dummyBox.top;
      left = box.left - dummyBox.left;
      dummy.parentNode.removeChild(dummy);
    }
    return { top: Math.round(top), left: Math.round(left) };
  }, getOffset: function getOffset(elem) {
    if (elem.getBoundingClientRect) {
      return this.getOffsetRect(elem);
    } else {
      return this.getOffsetSum(elem);
    }
  }, closest: function(element, selector) {
    if (!element || !selector) {
      return null;
    }
    return closest(element, selector);
  }, insertAfter: function(newNode, referenceNode) {
    if (referenceNode.nextSibling) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    } else {
      referenceNode.parentNode.appendChild(newNode);
    }
  }, remove: function(node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }, isChildOf: function(child, parent) {
    return parent.contains(child);
  }, getFocusableNodes, getClassName, locateCss, getRootNode, hasShadowParent, isShadowDomSupported, getActiveElement, getRelativeEventPosition, getTargetNode, getNodePosition };
  var closest;
  if (Element.prototype.closest) {
    closest = function(element, selector) {
      return element.closest(selector);
    };
  } else {
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    closest = function(element, selector) {
      var el2 = element;
      do {
        if (matches.call(el2, selector)) {
          return el2;
        }
        el2 = el2.parentElement || el2.parentNode;
      } while (el2 !== null && el2.nodeType === 1);
      return null;
    };
  }
  var isWindowAwailable = typeof window !== "undefined";
  const env = { isIE: isWindowAwailable && (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0), isOpera: isWindowAwailable && navigator.userAgent.indexOf("Opera") >= 0, isChrome: isWindowAwailable && navigator.userAgent.indexOf("Chrome") >= 0, isKHTML: isWindowAwailable && (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0), isFF: isWindowAwailable && navigator.userAgent.indexOf("Firefox") >= 0, isIPad: isWindowAwailable && navigator.userAgent.search(/iPad/gi) >= 0, isEdge: isWindowAwailable && navigator.userAgent.indexOf("Edge") != -1, isNode: !isWindowAwailable || typeof navigator == "undefined" };
  function extend$g(scheduler2) {
    scheduler2.destructor = function() {
      scheduler2.callEvent("onDestroy", []);
      this.clearAll();
      if (this.$container) {
        this.$container.innerHTML = "";
      }
      if (this._eventRemoveAll) {
        this._eventRemoveAll();
      }
      if (this.resetLightbox) {
        this.resetLightbox();
      }
      if (this._dp && this._dp.destructor) {
        this._dp.destructor();
      }
      this.detachAllEvents();
      for (var i in this) {
        if (i.indexOf("$") === 0) {
          delete this[i];
        }
      }
      scheduler2.$destroyed = true;
    };
  }
  function serialize$1(data) {
    if (typeof data === "string" || typeof data === "number") {
      return data;
    }
    var result = "";
    for (var key in data) {
      var serialized = "";
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === "string") {
          serialized = encodeURIComponent(data[key]);
        } else if (typeof data[key] === "number") {
          serialized = data[key];
        } else {
          serialized = encodeURIComponent(JSON.stringify(data[key]));
        }
        serialized = key + "=" + serialized;
        if (result.length) {
          serialized = "&" + serialized;
        }
        result += serialized;
      }
    }
    return result;
  }
  function extend$f(scheduler2) {
    scheduler2.Promise = window.Promise;
    function createConfig(method, args) {
      var result = { method };
      if (args.length === 0) {
        throw new Error("Arguments list of query is wrong.");
      }
      if (args.length === 1) {
        if (typeof args[0] === "string") {
          result.url = args[0];
          result.async = true;
        } else {
          result.url = args[0].url;
          result.async = args[0].async || true;
          result.callback = args[0].callback;
          result.headers = args[0].headers;
        }
        if (method === "POST" || "PUT") {
          if (args[0].data) {
            if (typeof args[0].data !== "string") {
              result.data = serialize$1(args[0].data);
            } else {
              result.data = args[0].data;
            }
          } else {
            result.data = "";
          }
        }
        return result;
      }
      result.url = args[0];
      switch (method) {
        case "GET":
        case "DELETE":
          result.callback = args[1];
          result.headers = args[2];
          break;
        case "POST":
        case "PUT":
          if (args[1]) {
            if (typeof args[1] !== "string") {
              result.data = serialize$1(args[1]);
            } else {
              result.data = args[1];
            }
          } else {
            result.data = "";
          }
          result.callback = args[2];
          result.headers = args[3];
          break;
      }
      return result;
    }
    scheduler2.ajax = { cache: true, method: "get", serializeRequestParams: serialize$1, parse: function(data) {
      if (typeof data !== "string")
        return data;
      var obj;
      data = data.replace(/^[\s]+/, "");
      if (typeof DOMParser !== "undefined" && !scheduler2.$env.isIE) {
        obj = new DOMParser().parseFromString(data, "text/xml");
      } else if (typeof window.ActiveXObject !== "undefined") {
        obj = new window.ActiveXObject("Microsoft.XMLDOM");
        obj.async = "false";
        obj.loadXML(data);
      }
      return obj;
    }, xmltop: function(tagname, xhr, obj) {
      if (typeof xhr.status == "undefined" || xhr.status < 400) {
        var xml = !xhr.responseXML ? this.parse(xhr.responseText || xhr) : xhr.responseXML || xhr;
        if (xml && xml.documentElement !== null && !xml.getElementsByTagName("parsererror").length) {
          return xml.getElementsByTagName(tagname)[0];
        }
      }
      if (obj !== -1)
        scheduler2.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], obj]);
      return document.createElement("DIV");
    }, xpath: function(xpathExp, docObj) {
      if (!docObj.nodeName)
        docObj = docObj.responseXML || docObj;
      if (scheduler2.$env.isIE) {
        return docObj.selectNodes(xpathExp) || [];
      } else {
        var rows = [];
        var first;
        var col = (docObj.ownerDocument || docObj).evaluate(xpathExp, docObj, null, XPathResult.ANY_TYPE, null);
        while (true) {
          first = col.iterateNext();
          if (first) {
            rows.push(first);
          } else {
            break;
          }
        }
        return rows;
      }
    }, query: function(config) {
      return this._call(config.method || "GET", config.url, config.data || "", config.async || true, config.callback, config.headers);
    }, get: function(url2, onLoad, headers) {
      var config = createConfig("GET", arguments);
      return this.query(config);
    }, getSync: function(url2, headers) {
      var config = createConfig("GET", arguments);
      config.async = false;
      return this.query(config);
    }, put: function(url2, postData, onLoad, headers) {
      var config = createConfig("PUT", arguments);
      return this.query(config);
    }, del: function(url2, onLoad, headers) {
      var config = createConfig("DELETE", arguments);
      return this.query(config);
    }, post: function(url2, postData, onLoad, headers) {
      if (arguments.length == 1) {
        postData = "";
      } else if (arguments.length == 2 && typeof postData == "function") {
        onLoad = postData;
        postData = "";
      }
      var config = createConfig("POST", arguments);
      return this.query(config);
    }, postSync: function(url2, postData, headers) {
      postData = postData === null ? "" : String(postData);
      var config = createConfig("POST", arguments);
      config.async = false;
      return this.query(config);
    }, _call: function(method, url2, postData, async, onLoad, headers) {
      return new scheduler2.Promise((function(resolve, reject) {
        var t2 = typeof XMLHttpRequest !== void 0 && !scheduler2.$env.isIE ? new XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
        var isQt = navigator.userAgent.match(/AppleWebKit/) !== null && navigator.userAgent.match(/Qt/) !== null && navigator.userAgent.match(/Safari/) !== null;
        if (!!async) {
          t2.addEventListener("readystatechange", function() {
            if (t2.readyState == 4 || isQt && t2.readyState == 3) {
              if (t2.status != 200 || t2.responseText === "") {
                if (!scheduler2.callEvent("onAjaxError", [t2]))
                  return;
              }
              setTimeout(function() {
                if (typeof onLoad == "function") {
                  onLoad.apply(window, [{ xmlDoc: t2, filePath: url2 }]);
                }
                resolve(t2);
                if (typeof onLoad == "function") {
                  onLoad = null;
                  t2 = null;
                }
              }, 0);
            }
          });
        }
        if (method == "GET" && !this.cache) {
          url2 += (url2.indexOf("?") >= 0 ? "&" : "?") + "dhxr" + (/* @__PURE__ */ new Date()).getTime() + "=1";
        }
        t2.open(method, url2, async);
        if (headers) {
          for (var key in headers)
            t2.setRequestHeader(key, headers[key]);
        } else if (method.toUpperCase() == "POST" || method == "PUT" || method == "DELETE") {
          t2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else if (method == "GET") {
          postData = null;
        }
        t2.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        t2.send(postData);
        if (!async)
          return { xmlDoc: t2, filePath: url2 };
      }).bind(this));
    }, urlSeparator: function(str) {
      if (str.indexOf("?") != -1)
        return "&";
      else
        return "?";
    } };
    scheduler2.$ajax = scheduler2.ajax;
  }
  function extend$e(scheduler2) {
    var generateStringToDate = function(format, utc) {
      var splt = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);";
      var mask = format.match(/%[a-zA-Z]/g);
      for (var i = 0; i < mask.length; i++) {
        switch (mask[i]) {
          case "%j":
          case "%d":
            splt += "set[2]=temp[" + i + "]||1;";
            break;
          case "%n":
          case "%m":
            splt += "set[1]=(temp[" + i + "]||1)-1;";
            break;
          case "%y":
            splt += "set[0]=temp[" + i + "]*1+(temp[" + i + "]>50?1900:2000);";
            break;
          case "%g":
          case "%G":
          case "%h":
          case "%H":
            splt += "set[3]=temp[" + i + "]||0;";
            break;
          case "%i":
            splt += "set[4]=temp[" + i + "]||0;";
            break;
          case "%Y":
            splt += "set[0]=temp[" + i + "]||0;";
            break;
          case "%a":
          case "%A":
            splt += "set[3]=set[3]%12+((temp[" + i + "]||'').toLowerCase()=='am'?0:12);";
            break;
          case "%s":
            splt += "set[5]=temp[" + i + "]||0;";
            break;
          case "%M":
            splt += "set[1]=this.locale.date.month_short_hash[temp[" + i + "]]||0;";
            break;
          case "%F":
            splt += "set[1]=this.locale.date.month_full_hash[temp[" + i + "]]||0;";
            break;
        }
      }
      var code = "set[0],set[1],set[2],set[3],set[4],set[5]";
      if (utc)
        code = " Date.UTC(" + code + ")";
      return new Function("date", "var set=[0,0,1,0,0,0]; " + splt + " return new Date(" + code + ");");
    };
    var csp_date_to_str = function(format, utc) {
      return function(date) {
        return format.replace(/%[a-zA-Z]/g, function(a) {
          switch (a) {
            case "%d":
              return utc ? scheduler2.date.to_fixed(date.getUTCDate()) : scheduler2.date.to_fixed(date.getDate());
            case "%m":
              return utc ? scheduler2.date.to_fixed(date.getUTCMonth() + 1) : scheduler2.date.to_fixed(date.getMonth() + 1);
            case "%j":
              return utc ? date.getUTCDate() : date.getDate();
            case "%n":
              return utc ? date.getUTCMonth() + 1 : date.getMonth() + 1;
            case "%y":
              return utc ? scheduler2.date.to_fixed(date.getUTCFullYear() % 100) : scheduler2.date.to_fixed(date.getFullYear() % 100);
            case "%Y":
              return utc ? date.getUTCFullYear() : date.getFullYear();
            case "%D":
              return utc ? scheduler2.locale.date.day_short[date.getUTCDay()] : scheduler2.locale.date.day_short[date.getDay()];
            case "%l":
              return utc ? scheduler2.locale.date.day_full[date.getUTCDay()] : scheduler2.locale.date.day_full[date.getDay()];
            case "%M":
              return utc ? scheduler2.locale.date.month_short[date.getUTCMonth()] : scheduler2.locale.date.month_short[date.getMonth()];
            case "%F":
              return utc ? scheduler2.locale.date.month_full[date.getUTCMonth()] : scheduler2.locale.date.month_full[date.getMonth()];
            case "%h":
              return utc ? scheduler2.date.to_fixed((date.getUTCHours() + 11) % 12 + 1) : scheduler2.date.to_fixed((date.getHours() + 11) % 12 + 1);
            case "%g":
              return utc ? (date.getUTCHours() + 11) % 12 + 1 : (date.getHours() + 11) % 12 + 1;
            case "%G":
              return utc ? date.getUTCHours() : date.getHours();
            case "%H":
              return utc ? scheduler2.date.to_fixed(date.getUTCHours()) : scheduler2.date.to_fixed(date.getHours());
            case "%i":
              return utc ? scheduler2.date.to_fixed(date.getUTCMinutes()) : scheduler2.date.to_fixed(date.getMinutes());
            case "%a":
              return utc ? date.getUTCHours() > 11 ? "pm" : "am" : date.getHours() > 11 ? "pm" : "am";
            case "%A":
              return utc ? date.getUTCHours() > 11 ? "PM" : "AM" : date.getHours() > 11 ? "PM" : "AM";
            case "%s":
              return utc ? scheduler2.date.to_fixed(date.getUTCSeconds()) : scheduler2.date.to_fixed(date.getSeconds());
            case "%W":
              return utc ? scheduler2.date.to_fixed(scheduler2.date.getUTCISOWeek(date)) : scheduler2.date.to_fixed(scheduler2.date.getISOWeek(date));
            default:
              return a;
          }
        });
      };
    };
    var csp_str_to_date = function(format, utc) {
      const mask = format.match(/%[a-zA-Z]/g);
      return function(date) {
        var set = [0, 0, 1, 0, 0, 0];
        var temp = date.match(/[a-zA-Z]+|[0-9]+/g);
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
              set[0] = temp[i] * 1 + (temp[i] > 50 ? 1900 : 2e3);
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
              set[3] = set[3] % 12 + ((temp[i] || "").toLowerCase() == "am" ? 0 : 12);
              break;
            case "%s":
              set[5] = temp[i] || 0;
              break;
            case "%M":
              set[1] = scheduler2.locale.date.month_short_hash[temp[i]] || 0;
              break;
            case "%F":
              set[1] = scheduler2.locale.date.month_full_hash[temp[i]] || 0;
              break;
          }
        }
        if (utc) {
          return new Date(Date.UTC(set[0], set[1], set[2], set[3], set[4], set[5]));
        }
        return new Date(set[0], set[1], set[2], set[3], set[4], set[5]);
      };
    };
    let cspEnabled = void 0;
    function checkIfCSPEnabled() {
      try {
        new Function("cspEnabled = false;");
        cspEnabled = false;
      } catch (e) {
        cspEnabled = true;
      }
      return cspEnabled;
    }
    function useCsp() {
      var result = false;
      if (scheduler2.config.csp === "auto") {
        if (cspEnabled === void 0) {
          cspEnabled = checkIfCSPEnabled();
        }
        result = cspEnabled;
      } else {
        result = scheduler2.config.csp;
      }
      return result;
    }
    scheduler2.date = { init: function() {
      var s = scheduler2.locale.date.month_short;
      var t2 = scheduler2.locale.date.month_short_hash = {};
      for (var i = 0; i < s.length; i++)
        t2[s[i]] = i;
      var s = scheduler2.locale.date.month_full;
      var t2 = scheduler2.locale.date.month_full_hash = {};
      for (var i = 0; i < s.length; i++)
        t2[s[i]] = i;
    }, date_part: function(value) {
      const date = new Date(value);
      var old = new Date(date);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      if (date.getHours() && (date.getDate() < old.getDate() || date.getMonth() < old.getMonth() || date.getFullYear() < old.getFullYear()))
        date.setTime(date.getTime() + 60 * 60 * 1e3 * (24 - date.getHours()));
      return date;
    }, time_part: function(date) {
      return (date.valueOf() / 1e3 - date.getTimezoneOffset() * 60) % 86400;
    }, week_start: function(date) {
      var shift = date.getDay();
      if (scheduler2.config.start_on_monday) {
        if (shift === 0)
          shift = 6;
        else
          shift--;
      }
      return this.date_part(this.add(date, -1 * shift, "day"));
    }, month_start: function(value) {
      const date = new Date(value);
      date.setDate(1);
      return this.date_part(date);
    }, year_start: function(value) {
      const date = new Date(value);
      date.setMonth(0);
      return this.month_start(date);
    }, day_start: function(value) {
      const date = new Date(value);
      return this.date_part(date);
    }, _add_days: function(date, inc) {
      var ndate = new Date(date.valueOf());
      ndate.setDate(ndate.getDate() + inc);
      if (inc == Math.round(inc) && inc > 0) {
        var datesDiff = +ndate - +date, rest = datesDiff % (24 * 60 * 60 * 1e3);
        if (rest && date.getTimezoneOffset() == ndate.getTimezoneOffset()) {
          var hours = rest / (60 * 60 * 1e3);
          ndate.setTime(ndate.getTime() + (24 - hours) * 60 * 60 * 1e3);
        }
      }
      if (inc >= 0 && (!date.getHours() && ndate.getHours()) && (ndate.getDate() < date.getDate() || ndate.getMonth() < date.getMonth() || ndate.getFullYear() < date.getFullYear()))
        ndate.setTime(ndate.getTime() + 60 * 60 * 1e3 * (24 - ndate.getHours()));
      return ndate;
    }, add: function(date, inc, mode) {
      var ndate = new Date(date.valueOf());
      switch (mode) {
        case "day":
          ndate = scheduler2.date._add_days(ndate, inc);
          break;
        case "week":
          ndate = scheduler2.date._add_days(ndate, inc * 7);
          break;
        case "month":
          ndate.setMonth(ndate.getMonth() + inc);
          break;
        case "year":
          ndate.setYear(ndate.getFullYear() + inc);
          break;
        case "hour":
          ndate.setTime(ndate.getTime() + inc * 60 * 60 * 1e3);
          break;
        case "minute":
          ndate.setTime(ndate.getTime() + inc * 60 * 1e3);
          break;
        default:
          return scheduler2.date["add_" + mode](date, inc, mode);
      }
      return ndate;
    }, to_fixed: function(num) {
      if (num < 10)
        return "0" + num;
      return num;
    }, copy: function(date) {
      return new Date(date.valueOf());
    }, date_to_str: function(format, utc) {
      if (useCsp()) {
        return csp_date_to_str(format, utc);
      }
      format = format.replace(/%[a-zA-Z]/g, function(a) {
        switch (a) {
          case "%d":
            return '"+this.date.to_fixed(date.getDate())+"';
          case "%m":
            return '"+this.date.to_fixed((date.getMonth()+1))+"';
          case "%j":
            return '"+date.getDate()+"';
          case "%n":
            return '"+(date.getMonth()+1)+"';
          case "%y":
            return '"+this.date.to_fixed(date.getFullYear()%100)+"';
          case "%Y":
            return '"+date.getFullYear()+"';
          case "%D":
            return '"+this.locale.date.day_short[date.getDay()]+"';
          case "%l":
            return '"+this.locale.date.day_full[date.getDay()]+"';
          case "%M":
            return '"+this.locale.date.month_short[date.getMonth()]+"';
          case "%F":
            return '"+this.locale.date.month_full[date.getMonth()]+"';
          case "%h":
            return '"+this.date.to_fixed((date.getHours()+11)%12+1)+"';
          case "%g":
            return '"+((date.getHours()+11)%12+1)+"';
          case "%G":
            return '"+date.getHours()+"';
          case "%H":
            return '"+this.date.to_fixed(date.getHours())+"';
          case "%i":
            return '"+this.date.to_fixed(date.getMinutes())+"';
          case "%a":
            return '"+(date.getHours()>11?"pm":"am")+"';
          case "%A":
            return '"+(date.getHours()>11?"PM":"AM")+"';
          case "%s":
            return '"+this.date.to_fixed(date.getSeconds())+"';
          case "%W":
            return '"+this.date.to_fixed(this.date.getISOWeek(date))+"';
          default:
            return a;
        }
      });
      if (utc)
        format = format.replace(/date\.get/g, "date.getUTC");
      var func = new Function("date", 'return "' + format + '";');
      return func.bind(scheduler2);
    }, str_to_date: function(format, utc, exactFormat) {
      var stringToDateMethod = useCsp() ? csp_str_to_date : generateStringToDate;
      var parseExactFormat = stringToDateMethod(format, utc);
      var yyyyMMddhhIIss = /^[0-9]{4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/;
      var MMddyyyyhhIIss = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4} ?(([0-9]{1,2}:[0-9]{2})(:[0-9]{1,2})?)?$/;
      var ddMMyyyyhhIIss = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/;
      var ISO8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
      var isYMDDate = function(datestr) {
        return yyyyMMddhhIIss.test(String(datestr));
      };
      var isMDYDate = function(datestr) {
        return MMddyyyyhhIIss.test(String(datestr));
      };
      var isDMYDate = function(datestr) {
        return ddMMyyyyhhIIss.test(String(datestr));
      };
      var isISO8601 = function(datestr) {
        return ISO8601.test(datestr);
      };
      var parseYMD = stringToDateMethod("%Y-%m-%d %H:%i:%s", utc);
      var parseMDY = stringToDateMethod("%m/%d/%Y %H:%i:%s", utc);
      var parseDMY = stringToDateMethod("%d-%m-%Y %H:%i:%s", utc);
      return function(dateString) {
        if (!exactFormat && !scheduler2.config.parse_exact_format) {
          if (dateString && dateString.getISOWeek) {
            return new Date(dateString);
          } else if (typeof dateString === "number") {
            return new Date(dateString);
          } else if (isYMDDate(dateString)) {
            return parseYMD(dateString);
          } else if (isMDYDate(dateString)) {
            return parseMDY(dateString);
          } else if (isDMYDate(dateString)) {
            return parseDMY(dateString);
          } else if (isISO8601(dateString)) {
            return new Date(dateString);
          }
        }
        return parseExactFormat.call(scheduler2, dateString);
      };
    }, getISOWeek: function(ndate) {
      if (!ndate)
        return false;
      ndate = this.date_part(new Date(ndate));
      var nday = ndate.getDay();
      if (nday === 0) {
        nday = 7;
      }
      var first_thursday = new Date(ndate.valueOf());
      first_thursday.setDate(ndate.getDate() + (4 - nday));
      var year_number = first_thursday.getFullYear();
      var ordinal_date = Math.round((first_thursday.getTime() - new Date(year_number, 0, 1).getTime()) / 864e5);
      var week_number = 1 + Math.floor(ordinal_date / 7);
      return week_number;
    }, getUTCISOWeek: function(ndate) {
      return this.getISOWeek(this.convert_to_utc(ndate));
    }, convert_to_utc: function(date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    } };
  }
  function extend$d(scheduler2) {
    scheduler2.config = { default_date: "%j %M %Y", month_date: "%F %Y", load_date: "%Y-%m-%d", week_date: "%l", day_date: "%D %j", hour_date: "%H:%i", month_day: "%d", date_format: "%Y-%m-%d %H:%i", api_date: "%d-%m-%Y %H:%i", parse_exact_format: false, preserve_length: true, time_step: 5, displayed_event_color: "#ff4a4a", displayed_event_text_color: "#ffef80", wide_form: 0, day_column_padding: 8, use_select_menu_space: true, fix_tab_position: true, start_on_monday: true, first_hour: 0, last_hour: 24, readonly: false, drag_resize: true, drag_move: true, drag_create: true, drag_event_body: true, dblclick_create: true, details_on_dblclick: true, edit_on_create: true, details_on_create: true, header: null, hour_size_px: 44, resize_month_events: false, resize_month_timed: false, responsive_lightbox: false, separate_short_events: true, rtl: false, cascade_event_display: false, cascade_event_count: 4, cascade_event_margin: 30, multi_day: true, multi_day_height_limit: 200, drag_lightbox: true, preserve_scroll: true, select: true, undo_deleted: true, server_utc: false, touch: true, touch_tip: true, touch_drag: 500, touch_swipe_dates: false, quick_info_detached: true, positive_closing: false, drag_highlight: true, limit_drag_out: false, icons_edit: ["icon_save", "icon_cancel"], icons_select: ["icon_details", "icon_edit", "icon_delete"], buttons_right: ["dhx_save_btn", "dhx_cancel_btn"], buttons_left: ["dhx_delete_btn"], lightbox: { sections: [{ name: "description", map_to: "text", type: "textarea", focus: true }, { name: "time", height: 72, type: "time", map_to: "auto" }] }, highlight_displayed_event: true, left_border: false, ajax_error: "alert", delay_render: 0, timeline_swap_resize: true, wai_aria_attributes: true, wai_aria_application_role: true, csp: "auto", event_attribute: "data-event-id", show_errors: true };
    scheduler2.config.buttons_left.$initial = scheduler2.config.buttons_left.join();
    scheduler2.config.buttons_right.$initial = scheduler2.config.buttons_right.join();
    scheduler2._helpers = { parseDate: function parseDate(date) {
      var parse = scheduler2.templates.xml_date || scheduler2.templates.parse_date;
      return parse(date);
    }, formatDate: function formatDate(date) {
      var format = scheduler2.templates.xml_format || scheduler2.templates.format_date;
      return format(date);
    } };
    scheduler2.templates = {};
    scheduler2.init_templates = function() {
      var d = scheduler2.date.date_to_str;
      var c = scheduler2.config;
      var f = function(a, b) {
        for (var c2 in b)
          if (!a[c2])
            a[c2] = b[c2];
      };
      f(scheduler2.templates, { day_date: d(c.default_date), month_date: d(c.month_date), week_date: function(d1, d2) {
        if (c.rtl) {
          return scheduler2.templates.day_date(scheduler2.date.add(d2, -1, "day")) + " &ndash; " + scheduler2.templates.day_date(d1);
        }
        return scheduler2.templates.day_date(d1) + " &ndash; " + scheduler2.templates.day_date(scheduler2.date.add(d2, -1, "day"));
      }, day_scale_date: d(c.default_date), time_slot_text: function(date) {
        return "";
      }, time_slot_class: function(date) {
        return "";
      }, month_scale_date: d(c.week_date), week_scale_date: d(c.day_date), hour_scale: d(c.hour_date), time_picker: d(c.hour_date), event_date: d(c.hour_date), month_day: d(c.month_day), load_format: d(c.load_date), format_date: d(c.date_format, c.server_utc), parse_date: scheduler2.date.str_to_date(c.date_format, c.server_utc), api_date: scheduler2.date.str_to_date(c.api_date, false, false), event_header: function(start, end, ev) {
        if (ev._mode === "small" || ev._mode === "smallest") {
          return scheduler2.templates.event_date(start);
        } else {
          return scheduler2.templates.event_date(start) + " - " + scheduler2.templates.event_date(end);
        }
      }, event_text: function(start, end, ev) {
        return ev.text;
      }, event_class: function(start, end, ev) {
        return "";
      }, month_date_class: function(d2) {
        return "";
      }, week_date_class: function(d2) {
        return "";
      }, event_bar_date: function(start, end, ev) {
        return scheduler2.templates.event_date(start);
      }, event_bar_text: function(start, end, ev) {
        return ev.text;
      }, month_events_link: function(date, count) {
        return "<a>View more(" + count + " events)</a>";
      }, drag_marker_class: function(start, end, event2) {
        return "";
      }, drag_marker_content: function(start, end, event2) {
        return "";
      }, tooltip_date_format: scheduler2.date.date_to_str("%Y-%m-%d %H:%i"), tooltip_text: function(start, end, event2) {
        return "<b>Event:</b> " + event2.text + "<br/><b>Start date:</b> " + scheduler2.templates.tooltip_date_format(start) + "<br/><b>End date:</b> " + scheduler2.templates.tooltip_date_format(end);
      }, calendar_month: d("%F %Y"), calendar_scale_date: d("%D"), calendar_date: d("%d"), calendar_time: d("%d-%m-%Y") });
      this.callEvent("onTemplatesReady", []);
    };
  }
  function extend$c(scheduler2) {
    scheduler2._events = {};
    scheduler2.clearAll = function() {
      this._events = {};
      this._loaded = {};
      this._edit_id = null;
      this._select_id = null;
      this._drag_id = null;
      this._drag_mode = null;
      this._drag_pos = null;
      this._new_event = null;
      this.clear_view();
      this.callEvent("onClearAll", []);
    };
    scheduler2.addEvent = function(start_date, end_date, text, id2, extra_data) {
      if (!arguments.length)
        return this.addEventNow();
      var ev = start_date;
      if (arguments.length != 1) {
        ev = extra_data || {};
        ev.start_date = start_date;
        ev.end_date = end_date;
        ev.text = text;
        ev.id = id2;
      }
      ev.id = ev.id || scheduler2.uid();
      ev.text = ev.text || "";
      if (typeof ev.start_date == "string")
        ev.start_date = this.templates.api_date(ev.start_date);
      if (typeof ev.end_date == "string")
        ev.end_date = this.templates.api_date(ev.end_date);
      var d = (this.config.event_duration || this.config.time_step) * 6e4;
      if (ev.start_date.valueOf() == ev.end_date.valueOf())
        ev.end_date.setTime(ev.end_date.valueOf() + d);
      ev.start_date.setMilliseconds(0);
      ev.end_date.setMilliseconds(0);
      ev._timed = this.isOneDayEvent(ev);
      var is_new = !this._events[ev.id];
      this._events[ev.id] = ev;
      this.event_updated(ev);
      if (!this._loading)
        this.callEvent(is_new ? "onEventAdded" : "onEventChanged", [ev.id, ev]);
      return ev.id;
    };
    scheduler2.deleteEvent = function(id2, silent) {
      var ev = this._events[id2];
      if (!silent && (!this.callEvent("onBeforeEventDelete", [id2, ev]) || !this.callEvent("onConfirmedBeforeEventDelete", [id2, ev])))
        return;
      if (ev) {
        if (scheduler2.getState().select_id == id2) {
          scheduler2.unselect();
        }
        delete this._events[id2];
        this.event_updated(ev);
        if (this._drag_id == ev.id) {
          this._drag_id = null;
          this._drag_mode = null;
          this._drag_pos = null;
        }
      }
      this.callEvent("onEventDeleted", [id2, ev]);
    };
    scheduler2.getEvent = function(id2) {
      return this._events[id2];
    };
    scheduler2.setEvent = function(id2, hash) {
      if (!hash.id)
        hash.id = id2;
      this._events[id2] = hash;
    };
    scheduler2.for_rendered = function(id2, method) {
      for (var i = this._rendered.length - 1; i >= 0; i--)
        if (this._rendered[i].getAttribute(this.config.event_attribute) == id2)
          method(this._rendered[i], i);
    };
    scheduler2.changeEventId = function(id2, new_id) {
      if (id2 == new_id)
        return;
      var ev = this._events[id2];
      if (ev) {
        ev.id = new_id;
        this._events[new_id] = ev;
        delete this._events[id2];
      }
      this.for_rendered(id2, function(r) {
        r.setAttribute("event_id", new_id);
        r.setAttribute(scheduler2.config.event_attribute, new_id);
      });
      if (this._select_id == id2)
        this._select_id = new_id;
      if (this._edit_id == id2)
        this._edit_id = new_id;
      this.callEvent("onEventIdChange", [id2, new_id]);
    };
    (function() {
      var attrs = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"];
      var create_getter = function(name) {
        return function(id2) {
          return scheduler2.getEvent(id2)[name];
        };
      };
      var create_setter = function(name) {
        return function(id2, value) {
          var ev = scheduler2.getEvent(id2);
          ev[name] = value;
          ev._changed = true;
          ev._timed = this.isOneDayEvent(ev);
          scheduler2.event_updated(ev, true);
        };
      };
      for (var i = 0; i < attrs.length; i += 2) {
        scheduler2["getEvent" + attrs[i + 1]] = create_getter(attrs[i]);
        scheduler2["setEvent" + attrs[i + 1]] = create_setter(attrs[i]);
      }
    })();
    scheduler2.event_updated = function(ev, force) {
      if (this.is_visible_events(ev))
        this.render_view_data();
      else
        this.clear_event(ev.id);
    };
    scheduler2.is_visible_events = function(ev) {
      if (!this._min_date || !this._max_date) {
        return false;
      }
      var in_visible_range = ev.start_date.valueOf() < this._max_date.valueOf() && this._min_date.valueOf() < ev.end_date.valueOf();
      if (in_visible_range) {
        var evFirstHour = ev.start_date.getHours(), evLastHour = ev.end_date.getHours() + ev.end_date.getMinutes() / 60, lastHour = this.config.last_hour, firstHour = this.config.first_hour;
        var end_dates_visible = this._table_view || !((evLastHour > lastHour || evLastHour <= firstHour) && (evFirstHour >= lastHour || evFirstHour < firstHour));
        if (end_dates_visible) {
          return true;
        } else {
          var event_duration = (ev.end_date.valueOf() - ev.start_date.valueOf()) / (1e3 * 60 * 60), hidden_duration = 24 - (this.config.last_hour - this.config.first_hour);
          return !!(event_duration > hidden_duration || evFirstHour < lastHour && evLastHour > firstHour);
        }
      } else {
        return false;
      }
    };
    scheduler2.isOneDayEvent = function(ev) {
      var checkEndDate = new Date(ev.end_date.valueOf() - 1);
      return ev.start_date.getFullYear() === checkEndDate.getFullYear() && ev.start_date.getMonth() === checkEndDate.getMonth() && ev.start_date.getDate() === checkEndDate.getDate() && ev.end_date.valueOf() - ev.start_date.valueOf() < 1e3 * 60 * 60 * 24;
    };
    scheduler2.get_visible_events = function(only_timed) {
      var stack = [];
      for (var id2 in this._events)
        if (this.is_visible_events(this._events[id2])) {
          if (!only_timed || this._events[id2]._timed) {
            if (this.filter_event(id2, this._events[id2]))
              stack.push(this._events[id2]);
          }
        }
      return stack;
    };
    scheduler2.filter_event = function(id2, ev) {
      var filter = this["filter_" + this._mode];
      return filter ? filter(id2, ev) : true;
    };
    scheduler2._is_main_area_event = function(ev) {
      return !!ev._timed;
    };
    scheduler2.render_view_data = function(evs, hold) {
      var full = false;
      if (!evs) {
        full = true;
        if (this._not_render) {
          this._render_wait = true;
          return;
        }
        this._render_wait = false;
        this.clear_view();
        evs = this.get_visible_events(!(this._table_view || this.config.multi_day));
      }
      for (var i = 0, len = evs.length; i < len; i++) {
        this._recalculate_timed(evs[i]);
      }
      if (this.config.multi_day && !this._table_view) {
        var tvs = [];
        var tvd = [];
        for (var i = 0; i < evs.length; i++) {
          if (this._is_main_area_event(evs[i]))
            tvs.push(evs[i]);
          else
            tvd.push(evs[i]);
        }
        if (!this._els["dhx_multi_day"]) {
          var message2 = scheduler2._commonErrorMessages.unknownView(this._mode);
          throw new Error(message2);
        }
        this._rendered_location = this._els["dhx_multi_day"][0];
        this._table_view = true;
        this.render_data(tvd, hold);
        this._table_view = false;
        this._rendered_location = this._els["dhx_cal_data"][0];
        this._table_view = false;
        this.render_data(tvs, hold);
      } else {
        var buffer = document.createDocumentFragment();
        var renderedLocation = this._els["dhx_cal_data"][0];
        this._rendered_location = buffer;
        this.render_data(evs, hold);
        renderedLocation.appendChild(buffer);
        this._rendered_location = renderedLocation;
      }
      if (full) {
        this.callEvent("onDataRender", []);
      }
    };
    scheduler2._view_month_day = function(e) {
      var date = scheduler2.getActionData(e).date;
      if (!scheduler2.callEvent("onViewMoreClick", [date]))
        return;
      scheduler2.setCurrentView(date, "day");
    };
    scheduler2._render_month_link = function(ev) {
      var parent = this._rendered_location;
      var toRender = this._lame_clone(ev);
      for (var d = ev._sday; d < ev._eday; d++) {
        toRender._sday = d;
        toRender._eday = d + 1;
        var date = scheduler2.date;
        var curr = scheduler2._min_date;
        curr = date.add(curr, toRender._sweek, "week");
        curr = date.add(curr, toRender._sday, "day");
        var count = scheduler2.getEvents(curr, date.add(curr, 1, "day")).length;
        var pos = this._get_event_bar_pos(toRender);
        var widt = pos.x2 - pos.x;
        var el2 = document.createElement("div");
        scheduler2.event(el2, "click", function(e) {
          scheduler2._view_month_day(e);
        });
        el2.className = "dhx_month_link";
        el2.style.top = pos.y + "px";
        el2.style.left = pos.x + "px";
        el2.style.width = widt + "px";
        el2.innerHTML = scheduler2.templates.month_events_link(curr, count);
        this._rendered.push(el2);
        parent.appendChild(el2);
      }
    };
    scheduler2._recalculate_timed = function(id2) {
      if (!id2)
        return;
      var ev;
      if (typeof id2 != "object")
        ev = this._events[id2];
      else
        ev = id2;
      if (!ev)
        return;
      ev._timed = scheduler2.isOneDayEvent(ev);
    };
    scheduler2.attachEvent("onEventChanged", scheduler2._recalculate_timed);
    scheduler2.attachEvent("onEventAdded", scheduler2._recalculate_timed);
    scheduler2.render_data = function(evs, hold) {
      evs = this._pre_render_events(evs, hold);
      var containers = {};
      for (var i = 0; i < evs.length; i++)
        if (this._table_view) {
          if (scheduler2._mode != "month") {
            this.render_event_bar(evs[i]);
          } else {
            var max_evs = scheduler2.config.max_month_events;
            if (max_evs !== max_evs * 1 || evs[i]._sorder < max_evs) {
              this.render_event_bar(evs[i]);
            } else if (max_evs !== void 0 && evs[i]._sorder == max_evs) {
              scheduler2._render_month_link(evs[i]);
            } else
              ;
          }
        } else {
          var ev = evs[i];
          var parent = scheduler2.locate_holder(ev._sday);
          if (!parent)
            continue;
          if (!containers[ev._sday]) {
            containers[ev._sday] = { real: parent, buffer: document.createDocumentFragment(), width: parent.clientWidth };
          }
          var container = containers[ev._sday];
          this.render_event(ev, container.buffer, container.width);
        }
      for (var i in containers) {
        var container = containers[i];
        if (container.real && container.buffer) {
          container.real.appendChild(container.buffer);
        }
      }
    };
    scheduler2._get_first_visible_cell = function(cells) {
      for (var i = 0; i < cells.length; i++) {
        if ((cells[i].className || "").indexOf("dhx_scale_ignore") == -1) {
          return cells[i];
        }
      }
      return cells[0];
    };
    scheduler2._pre_render_events = function(evs, hold) {
      var hb = this.xy.bar_height;
      var h_old = this._colsS.heights;
      var h = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0];
      var data = this._els["dhx_cal_data"][0];
      if (!this._table_view) {
        evs = this._pre_render_events_line(evs, hold);
      } else {
        evs = this._pre_render_events_table(evs, hold);
      }
      if (this._table_view) {
        if (hold)
          this._colsS.heights = h_old;
        else {
          var monthRows = data.querySelectorAll(".dhx_cal_month_row");
          if (monthRows.length) {
            for (var i = 0; i < monthRows.length; i++) {
              h[i]++;
              var cells = monthRows[i].querySelectorAll(".dhx_cal_month_cell");
              var cellHeight = this._colsS.height - this.xy.month_head_height;
              if (h[i] * hb > cellHeight) {
                var cHeight = cellHeight;
                if (this.config.max_month_events * 1 !== this.config.max_month_events || h[i] <= this.config.max_month_events) {
                  cHeight = h[i] * hb;
                } else if ((this.config.max_month_events + 1) * hb > cellHeight) {
                  cHeight = (this.config.max_month_events + 1) * hb;
                }
                monthRows[i].style.height = cHeight + this.xy.month_head_height + "px";
              }
              h[i] = (h[i - 1] || 0) + scheduler2._get_first_visible_cell(cells).offsetHeight;
            }
            h.unshift(0);
            const dataArea = this.$container.querySelector(".dhx_cal_data");
            if (dataArea.offsetHeight < dataArea.scrollHeight && !scheduler2._colsS.scroll_fix && scheduler2.xy.scroll_width) {
              var scale_settings = scheduler2._colsS, sum_width = scale_settings[scale_settings.col_length], row_heights = scale_settings.heights.slice();
              sum_width -= scheduler2.xy.scroll_width || 0;
              this._calc_scale_sizes(sum_width, this._min_date, this._max_date);
              scheduler2._colsS.heights = row_heights;
              this.set_xy(this._els["dhx_cal_header"][0], sum_width);
              scheduler2._render_scales(this._els["dhx_cal_header"][0]);
              scheduler2._render_month_scale(this._els["dhx_cal_data"][0], this._get_timeunit_start(), this._min_date);
              scale_settings.scroll_fix = true;
            }
          } else {
            if (!evs.length && this._els["dhx_multi_day"][0].style.visibility == "visible")
              h[0] = -1;
            if (evs.length || h[0] == -1) {
              var full_multi_day_height = (h[0] + 1) * hb + 4;
              var used_multi_day_height = full_multi_day_height;
              var used_multi_day_height_css = full_multi_day_height + "px";
              if (this.config.multi_day_height_limit) {
                used_multi_day_height = Math.min(full_multi_day_height, this.config.multi_day_height_limit);
                used_multi_day_height_css = used_multi_day_height + "px";
              }
              var multi_day_section = this._els["dhx_multi_day"][0];
              multi_day_section.style.height = used_multi_day_height_css;
              multi_day_section.style.visibility = h[0] == -1 ? "hidden" : "visible";
              multi_day_section.style.display = h[0] == -1 ? "none" : "";
              var multi_day_icon = this._els["dhx_multi_day"][1];
              multi_day_icon.style.height = used_multi_day_height_css;
              multi_day_icon.style.visibility = h[0] == -1 ? "hidden" : "visible";
              multi_day_icon.style.display = h[0] == -1 ? "none" : "";
              multi_day_icon.className = h[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small";
              this._dy_shift = (h[0] + 1) * hb;
              if (this.config.multi_day_height_limit) {
                this._dy_shift = Math.min(this.config.multi_day_height_limit, this._dy_shift);
              }
              h[0] = 0;
              if (used_multi_day_height != full_multi_day_height) {
                multi_day_section.style.overflowY = "auto";
                multi_day_icon.style.position = "fixed";
                multi_day_icon.style.top = "";
                multi_day_icon.style.left = "";
              }
            }
          }
        }
      }
      return evs;
    };
    scheduler2._get_event_sday = function(ev) {
      var datePart = this.date.day_start(new Date(ev.start_date));
      return Math.round((datePart.valueOf() - this._min_date.valueOf()) / (24 * 60 * 60 * 1e3));
    };
    scheduler2._get_event_mapped_end_date = function(ev) {
      var end_date = ev.end_date;
      if (this.config.separate_short_events) {
        var ev_duration = (ev.end_date - ev.start_date) / 6e4;
        if (ev_duration < this._min_mapped_duration) {
          end_date = this.date.add(end_date, this._min_mapped_duration - ev_duration, "minute");
        }
      }
      return end_date;
    };
    scheduler2._pre_render_events_line = function(evs, hold) {
      evs.sort(function(a, b) {
        if (a.start_date.valueOf() == b.start_date.valueOf())
          return a.id > b.id ? 1 : -1;
        return a.start_date > b.start_date ? 1 : -1;
      });
      var days = [];
      var evs_originals = [];
      this._min_mapped_duration = Math.floor(this.xy.min_event_height * 60 / this.config.hour_size_px);
      for (var i = 0; i < evs.length; i++) {
        var ev = evs[i];
        var sd = ev.start_date;
        var ed = ev.end_date;
        var sh = sd.getHours();
        var eh = ed.getHours();
        ev._sday = this._get_event_sday(ev);
        if (this._ignores[ev._sday]) {
          evs.splice(i, 1);
          i--;
          continue;
        }
        if (!days[ev._sday])
          days[ev._sday] = [];
        if (!hold) {
          ev._inner = false;
          var stack = days[ev._sday];
          while (stack.length) {
            var t_ev = stack[stack.length - 1];
            var t_end_date = this._get_event_mapped_end_date(t_ev);
            if (t_end_date.valueOf() <= ev.start_date.valueOf()) {
              stack.splice(stack.length - 1, 1);
            } else {
              break;
            }
          }
          var slot_index = stack.length;
          var sorderSet = false;
          for (var j = 0; j < stack.length; j++) {
            var t_ev = stack[j];
            var t_end_date = this._get_event_mapped_end_date(t_ev);
            if (t_end_date.valueOf() <= ev.start_date.valueOf()) {
              sorderSet = true;
              ev._sorder = t_ev._sorder;
              slot_index = j;
              ev._inner = true;
              break;
            }
          }
          if (stack.length)
            stack[stack.length - 1]._inner = true;
          if (!sorderSet) {
            if (stack.length) {
              if (stack.length <= stack[stack.length - 1]._sorder) {
                if (!stack[stack.length - 1]._sorder)
                  ev._sorder = 0;
                else
                  for (j = 0; j < stack.length; j++) {
                    var _is_sorder = false;
                    for (var k = 0; k < stack.length; k++) {
                      if (stack[k]._sorder == j) {
                        _is_sorder = true;
                        break;
                      }
                    }
                    if (!_is_sorder) {
                      ev._sorder = j;
                      break;
                    }
                  }
                ev._inner = true;
              } else {
                var _max_sorder = stack[0]._sorder;
                for (j = 1; j < stack.length; j++) {
                  if (stack[j]._sorder > _max_sorder)
                    _max_sorder = stack[j]._sorder;
                }
                ev._sorder = _max_sorder + 1;
                ev._inner = false;
              }
            } else
              ev._sorder = 0;
          }
          stack.splice(slot_index, slot_index == stack.length ? 0 : 1, ev);
          if (stack.length > (stack.max_count || 0)) {
            stack.max_count = stack.length;
            ev._count = stack.length;
          } else {
            ev._count = ev._count ? ev._count : 1;
          }
        }
        if (sh < this.config.first_hour || eh >= this.config.last_hour) {
          evs_originals.push(ev);
          evs[i] = ev = this._copy_event(ev);
          if (sh < this.config.first_hour) {
            ev.start_date.setHours(this.config.first_hour);
            ev.start_date.setMinutes(0);
          }
          if (eh >= this.config.last_hour) {
            ev.end_date.setMinutes(0);
            ev.end_date.setHours(this.config.last_hour);
          }
          if (ev.start_date > ev.end_date || sh == this.config.last_hour) {
            evs.splice(i, 1);
            i--;
            continue;
          }
        }
      }
      if (!hold) {
        for (var i = 0; i < evs.length; i++) {
          evs[i]._count = days[evs[i]._sday].max_count;
        }
        for (var i = 0; i < evs_originals.length; i++)
          evs_originals[i]._count = days[evs_originals[i]._sday].max_count;
      }
      return evs;
    };
    scheduler2._time_order = function(evs) {
      evs.sort(function(a, b) {
        if (a.start_date.valueOf() == b.start_date.valueOf()) {
          if (a._timed && !b._timed)
            return 1;
          if (!a._timed && b._timed)
            return -1;
          return a.id > b.id ? 1 : -1;
        }
        return a.start_date > b.start_date ? 1 : -1;
      });
    };
    scheduler2._is_any_multiday_cell_visible = function(from, to, event2) {
      var cols = this._cols.length;
      var isAnyCellVisible = false;
      var checkDate = from;
      var noCells = true;
      var lastDayEnd = new Date(to);
      if (scheduler2.date.day_start(new Date(to)).valueOf() != to.valueOf()) {
        lastDayEnd = scheduler2.date.day_start(lastDayEnd);
        lastDayEnd = scheduler2.date.add(lastDayEnd, 1, "day");
      }
      while (checkDate < lastDayEnd) {
        noCells = false;
        var cellIndex = this.locate_holder_day(checkDate, false, event2);
        var weekCellIndex = cellIndex % cols;
        if (!this._ignores[weekCellIndex]) {
          isAnyCellVisible = true;
          break;
        }
        checkDate = scheduler2.date.add(checkDate, 1, "day");
      }
      return noCells || isAnyCellVisible;
    };
    scheduler2._pre_render_events_table = function(evs, hold) {
      this._time_order(evs);
      var out = [];
      var weeks = [[], [], [], [], [], [], []];
      var max = this._colsS.heights;
      var start_date;
      var cols = this._cols.length;
      var chunks_info = {};
      for (var i = 0; i < evs.length; i++) {
        var ev = evs[i];
        var id2 = ev.id;
        if (!chunks_info[id2]) {
          chunks_info[id2] = { first_chunk: true, last_chunk: true };
        }
        var chunk_info = chunks_info[id2];
        var sd = start_date || ev.start_date;
        var ed = ev.end_date;
        if (sd < this._min_date) {
          chunk_info.first_chunk = false;
          sd = this._min_date;
        }
        if (ed > this._max_date) {
          chunk_info.last_chunk = false;
          ed = this._max_date;
        }
        var locate_s = this.locate_holder_day(sd, false, ev);
        ev._sday = locate_s % cols;
        if (this._ignores[ev._sday] && ev._timed)
          continue;
        var locate_e = this.locate_holder_day(ed, true, ev) || cols;
        ev._eday = locate_e % cols || cols;
        ev._length = locate_e - locate_s;
        ev._sweek = Math.floor((this._correct_shift(sd.valueOf(), 1) - this._min_date.valueOf()) / (60 * 60 * 1e3 * 24 * cols));
        var isAnyCellVisible = scheduler2._is_any_multiday_cell_visible(sd, ed, ev);
        if (!isAnyCellVisible) {
          start_date = null;
          continue;
        }
        var stack = weeks[ev._sweek];
        var stack_line;
        for (stack_line = 0; stack_line < stack.length; stack_line++)
          if (stack[stack_line]._eday <= ev._sday)
            break;
        if (!ev._sorder || !hold) {
          ev._sorder = stack_line;
        }
        if (ev._sday + ev._length <= cols) {
          start_date = null;
          out.push(ev);
          stack[stack_line] = ev;
          max[ev._sweek] = stack.length - 1;
          ev._first_chunk = chunk_info.first_chunk;
          ev._last_chunk = chunk_info.last_chunk;
        } else {
          var copy = this._copy_event(ev);
          copy.id = ev.id;
          copy._length = cols - ev._sday;
          copy._eday = cols;
          copy._sday = ev._sday;
          copy._sweek = ev._sweek;
          copy._sorder = ev._sorder;
          copy.end_date = this.date.add(sd, copy._length, "day");
          copy._first_chunk = chunk_info.first_chunk;
          if (chunk_info.first_chunk) {
            chunk_info.first_chunk = false;
          }
          out.push(copy);
          stack[stack_line] = copy;
          start_date = copy.end_date;
          max[ev._sweek] = stack.length - 1;
          i--;
          continue;
        }
      }
      return out;
    };
    scheduler2._copy_dummy = function() {
      var a = new Date(this.start_date);
      var b = new Date(this.end_date);
      this.start_date = a;
      this.end_date = b;
    };
    scheduler2._copy_event = function(ev) {
      this._copy_dummy.prototype = ev;
      return new this._copy_dummy();
    };
    scheduler2._rendered = [];
    scheduler2.clear_view = function() {
      for (var i = 0; i < this._rendered.length; i++) {
        var obj = this._rendered[i];
        if (obj.parentNode)
          obj.parentNode.removeChild(obj);
      }
      this._rendered = [];
    };
    scheduler2.updateEvent = function(id2) {
      var ev = this.getEvent(id2);
      this.clear_event(id2);
      if (ev && this.is_visible_events(ev) && this.filter_event(id2, ev) && (this._table_view || this.config.multi_day || ev._timed)) {
        if (this.config.update_render) {
          this.render_view_data();
        } else {
          if (this.getState().mode == "month" && !this.getState().drag_id && !this.isOneDayEvent(ev)) {
            this.render_view_data();
          } else {
            this.render_view_data([ev], true);
          }
        }
      }
    };
    scheduler2.clear_event = function(id2) {
      this.for_rendered(id2, function(node, i) {
        if (node.parentNode)
          node.parentNode.removeChild(node);
        scheduler2._rendered.splice(i, 1);
      });
    };
    scheduler2._y_from_date = function(date) {
      var sm = date.getHours() * 60 + date.getMinutes();
      return Math.round((sm * 60 * 1e3 - this.config.first_hour * 60 * 60 * 1e3) * this.config.hour_size_px / (60 * 60 * 1e3)) % (this.config.hour_size_px * 24);
    };
    scheduler2._calc_event_y = function(ev, min_height) {
      min_height = min_height || 0;
      var sm = ev.start_date.getHours() * 60 + ev.start_date.getMinutes();
      var em = ev.end_date.getHours() * 60 + ev.end_date.getMinutes() || scheduler2.config.last_hour * 60;
      var top = this._y_from_date(ev.start_date);
      var height = Math.max(min_height, (em - sm) * this.config.hour_size_px / 60);
      return { top, height };
    };
    scheduler2.render_event = function(ev, buffer, parentWidth) {
      var menu = scheduler2.xy.menu_width;
      var menu_offset = this.config.use_select_menu_space ? 0 : menu;
      if (ev._sday < 0)
        return;
      var parent = scheduler2.locate_holder(ev._sday);
      if (!parent)
        return;
      buffer = buffer || parent;
      var pos_y = this._calc_event_y(ev, scheduler2.xy.min_event_height);
      var top = pos_y.top, height = pos_y.height;
      var ev_count = ev._count || 1;
      var ev_sorder = ev._sorder || 0;
      parentWidth = parentWidth || parent.clientWidth;
      if (this.config.day_column_padding) {
        parentWidth -= this.config.day_column_padding;
      }
      var width = Math.floor((parentWidth - menu_offset) / ev_count);
      var left = ev_sorder * width + 1;
      if (!ev._inner)
        width = width * (ev_count - ev_sorder);
      if (this.config.cascade_event_display) {
        const limit2 = this.config.cascade_event_count;
        const margin = this.config.cascade_event_margin;
        let right;
        let marginRight = (ev_count - ev_sorder - 1) % limit2 * margin;
        let marginLeft = ev_sorder % limit2 * margin;
        if (ev_count * margin < parentWidth - this.config.day_column_padding) {
          right = ev._inner ? marginRight / 2 : 0;
        } else {
          right = ev._inner ? marginRight / 3 : 0;
          left = marginLeft / 3;
          if (ev_count * margin / 2 > parentWidth - this.config.day_column_padding) {
            right = ev._inner ? marginRight / limit2 : 0;
            left = marginLeft / limit2;
          }
        }
        width = Math.floor(parentWidth - menu_offset - left - right);
      }
      if (height < 30) {
        ev._mode = "smallest";
      } else if (height < 42) {
        ev._mode = "small";
      } else {
        ev._mode = null;
      }
      var d = this._render_v_bar(ev, menu_offset + left, top, width, height, ev._text_style, scheduler2.templates.event_header(ev.start_date, ev.end_date, ev), scheduler2.templates.event_text(ev.start_date, ev.end_date, ev));
      if (ev._mode === "smallest") {
        d.classList.add("dhx_cal_event--xsmall");
      } else if (ev._mode === "small") {
        d.classList.add("dhx_cal_event--small");
      }
      this._waiAria.eventAttr(ev, d);
      this._rendered.push(d);
      buffer.appendChild(d);
      var parentPosition = parseInt(this.config.rtl ? parent.style.right : parent.style.left, 10);
      left = left + parentPosition + menu_offset;
      if (this._edit_id == ev.id) {
        d.style.zIndex = 1;
        width = Math.max(width, scheduler2.xy.editor_width);
        d = document.createElement("div");
        d.setAttribute("event_id", ev.id);
        d.setAttribute(this.config.event_attribute, ev.id);
        this._waiAria.eventAttr(ev, d);
        d.className = "dhx_cal_event dhx_cal_editor";
        if (this.config.rtl)
          left++;
        this.set_xy(d, width, height, left, top);
        if (ev.color) {
          d.style.setProperty("--dhx-scheduler-event-background", ev.color);
        }
        var tplClass = scheduler2.templates.event_class(ev.start_date, ev.end_date, ev);
        if (tplClass) {
          d.className += " " + tplClass;
        }
        var d2 = document.createElement("div");
        d2.style.cssText += "overflow:hidden;height:100%";
        d.appendChild(d2);
        this._els["dhx_cal_data"][0].appendChild(d);
        this._rendered.push(d);
        d2.innerHTML = "<textarea class='dhx_cal_editor'>" + ev.text + "</textarea>";
        this._editor = d2.querySelector("textarea");
        scheduler2.event(this._editor, "keydown", function(e) {
          if (e.shiftKey)
            return true;
          var code = e.keyCode;
          if (code == scheduler2.keys.edit_save)
            scheduler2.editStop(true);
          if (code == scheduler2.keys.edit_cancel)
            scheduler2.editStop(false);
          if (code == scheduler2.keys.edit_save || code == scheduler2.keys.edit_cancel) {
            if (e.preventDefault)
              e.preventDefault();
          }
        });
        scheduler2.event(this._editor, "selectstart", function(e) {
          e.cancelBubble = true;
          return true;
        });
        scheduler2._focus(this._editor, true);
        this._els["dhx_cal_data"][0].scrollLeft = 0;
      }
      if (this.xy.menu_width !== 0 && this._select_id == ev.id) {
        if (this.config.cascade_event_display && this._drag_mode)
          d.style.zIndex = 1;
        var icons = this.config["icons_" + (this._edit_id == ev.id ? "edit" : "select")];
        var icons_str = "";
        var ariaAttr;
        for (var i = 0; i < icons.length; i++) {
          const currentIcon = icons[i];
          ariaAttr = this._waiAria.eventMenuAttrString(currentIcon);
          icons_str += `<div class='dhx_menu_icon ${currentIcon}' title='${this.locale.labels[currentIcon]}' ${ariaAttr}></div>`;
        }
        var obj = this._render_v_bar(ev, left - menu - 1, top, menu, null, "", "<div class='dhx_menu_head'></div>", icons_str, true);
        if (ev.color) {
          obj.style.setProperty("--dhx-scheduler-event-background", ev.color);
        }
        if (ev.textColor) {
          obj.style.setProperty("--dhx-scheduler-event-color", ev.textColor);
        }
        this._els["dhx_cal_data"][0].appendChild(obj);
        this._rendered.push(obj);
      }
      if (this.config.drag_highlight && this._drag_id == ev.id) {
        this.highlightEventPosition(ev);
      }
    };
    scheduler2._render_v_bar = function(ev, x, y, w, h, style, contentA, contentB, bottom) {
      var d = document.createElement("div");
      var id2 = ev.id;
      var cs2 = bottom ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event";
      var state = scheduler2.getState();
      if (state.drag_id == ev.id) {
        cs2 += " dhx_cal_event_drag";
      }
      if (state.select_id == ev.id) {
        cs2 += " dhx_cal_event_selected";
      }
      var cse = scheduler2.templates.event_class(ev.start_date, ev.end_date, ev);
      if (cse)
        cs2 = cs2 + " " + cse;
      if (this.config.cascade_event_display) {
        cs2 += " dhx_cal_event_cascade";
      }
      var boxWidth = w - 1;
      var html = `<div event_id="${id2}" ${this.config.event_attribute}="${id2}" class="${cs2}"
				style="position:absolute; top:${y}px; ${this.config.rtl ? "right:" : "left:"}${x}px; width:${boxWidth}px; height:${h}px; ${style || ""}" 
				data-bar-start="${ev.start_date.valueOf()}" data-bar-end="${ev.end_date.valueOf()}">
				</div>`;
      d.innerHTML = html;
      var container = d.cloneNode(true).firstChild;
      if (!bottom && scheduler2.renderEvent(container, ev, w, h, contentA, contentB)) {
        if (ev.color) {
          container.style.setProperty("--dhx-scheduler-event-background", ev.color);
        }
        if (ev.textColor) {
          container.style.setProperty("--dhx-scheduler-event-color", ev.textColor);
        }
        return container;
      } else {
        container = d.firstChild;
        if (ev.color) {
          container.style.setProperty("--dhx-scheduler-event-background", ev.color);
        }
        if (ev.textColor) {
          container.style.setProperty("--dhx-scheduler-event-color", ev.textColor);
        }
        var inner_html = '<div class="dhx_event_move dhx_header" >&nbsp;</div>';
        inner_html += '<div class="dhx_event_move dhx_title">' + contentA + "</div>";
        inner_html += '<div class="dhx_body">' + contentB + "</div>";
        var footer_class = "dhx_event_resize dhx_footer";
        if (bottom || ev._drag_resize === false)
          footer_class = "dhx_resize_denied " + footer_class;
        inner_html += '<div class="' + footer_class + '" style=" width:' + (bottom ? " margin-top:-1px;" : "") + '" ></div>';
        container.innerHTML = inner_html;
      }
      return container;
    };
    scheduler2.renderEvent = function() {
      return false;
    };
    scheduler2.locate_holder = function(day) {
      if (this._mode == "day")
        return this._els["dhx_cal_data"][0].firstChild;
      return this._els["dhx_cal_data"][0].childNodes[day];
    };
    scheduler2.locate_holder_day = function(date, past) {
      var day = Math.floor((this._correct_shift(date, 1) - this._min_date) / (60 * 60 * 24 * 1e3));
      if (past && this.date.time_part(date))
        day++;
      return day;
    };
    scheduler2._get_dnd_order = function(order, ev_height, max_height) {
      if (!this._drag_event)
        return order;
      if (!this._drag_event._orig_sorder)
        this._drag_event._orig_sorder = order;
      else
        order = this._drag_event._orig_sorder;
      var evTop = ev_height * order;
      while (evTop + ev_height > max_height) {
        order--;
        evTop -= ev_height;
      }
      order = Math.max(order, 0);
      return order;
    };
    scheduler2._get_event_bar_pos = function(ev) {
      var rtl = this.config.rtl;
      var columns = this._colsS;
      var x = columns[ev._sday];
      var x2 = columns[ev._eday];
      if (rtl) {
        x = columns[columns.col_length] - columns[ev._eday] + columns[0];
        x2 = columns[columns.col_length] - columns[ev._sday] + columns[0];
      }
      if (x2 == x)
        x2 = columns[ev._eday + 1];
      var hb = this.xy.bar_height;
      var order = ev._sorder;
      if (ev.id == this._drag_id) {
        var cellHeight = columns.heights[ev._sweek + 1] - columns.heights[ev._sweek] - this.xy.month_head_height;
        order = scheduler2._get_dnd_order(order, hb, cellHeight);
      }
      var y_event_offset = order * hb;
      var y = columns.heights[ev._sweek] + (columns.height ? this.xy.month_scale_height + 2 : 2) + y_event_offset;
      return { x, x2, y };
    };
    scheduler2.render_event_bar = function(ev) {
      var parent = this._rendered_location;
      var pos = this._get_event_bar_pos(ev);
      var y = pos.y;
      var x = pos.x;
      var x2 = pos.x2;
      var resize_handle = "";
      if (!x2)
        return;
      var resizable = scheduler2.config.resize_month_events && this._mode == "month" && (!ev._timed || scheduler2.config.resize_month_timed);
      var d = document.createElement("div");
      var left_chunk = ev.hasOwnProperty("_first_chunk") && ev._first_chunk, right_chunk = ev.hasOwnProperty("_last_chunk") && ev._last_chunk;
      var resize_left = resizable && (ev._timed || left_chunk);
      var resize_right = resizable && (ev._timed || right_chunk);
      var timed = true;
      var cs2 = "dhx_cal_event_clear";
      if (!ev._timed || resizable) {
        timed = false;
        cs2 = "dhx_cal_event_line";
      }
      if (left_chunk) {
        cs2 += " dhx_cal_event_line_start";
      }
      if (right_chunk) {
        cs2 += " dhx_cal_event_line_end";
      }
      if (resize_left) {
        resize_handle += "<div class='dhx_event_resize dhx_event_resize_start'></div>";
      }
      if (resize_right) {
        resize_handle += "<div class='dhx_event_resize dhx_event_resize_end'></div>";
      }
      var cse = scheduler2.templates.event_class(ev.start_date, ev.end_date, ev);
      if (cse) {
        cs2 += " " + cse;
      }
      var bg_color = ev.color ? "--dhx-scheduler-event-background:" + ev.color + ";" : "";
      var color = ev.textColor ? "--dhx-scheduler-event-color:" + ev.textColor + ";" : "";
      var style_text = ["position:absolute", "top:" + y + "px", "left:" + x + "px", "width:" + (x2 - x - (timed ? 1 : 0)) + "px", "height:" + (this.xy.bar_height - 2) + "px", color, bg_color, ev._text_style || ""].join(";");
      var html = "<div event_id='" + ev.id + "' " + this.config.event_attribute + "='" + ev.id + "' class='" + cs2 + "' style='" + style_text + "'" + this._waiAria.eventBarAttrString(ev) + ">";
      if (resizable) {
        html += resize_handle;
      }
      if (scheduler2.getState().mode == "month" && !ev._beforeEventChangedFlag) {
        ev = scheduler2.getEvent(ev.id);
      }
      if (ev._timed) {
        html += `<span class='dhx_cal_event_clear_date'>${scheduler2.templates.event_bar_date(ev.start_date, ev.end_date, ev)}</span>`;
      }
      html += "<div class='dhx_cal_event_line_content'>";
      html += scheduler2.templates.event_bar_text(ev.start_date, ev.end_date, ev) + "</div>";
      html += "</div>";
      html += "</div>";
      d.innerHTML = html;
      this._rendered.push(d.firstChild);
      parent.appendChild(d.firstChild);
    };
    scheduler2._locate_event = function(node) {
      var id2 = null;
      while (node && !id2 && node.getAttribute) {
        id2 = node.getAttribute(this.config.event_attribute);
        node = node.parentNode;
      }
      return id2;
    };
    scheduler2.edit = function(id2) {
      if (this._edit_id == id2)
        return;
      this.editStop(false, id2);
      this._edit_id = id2;
      this.updateEvent(id2);
    };
    scheduler2.editStop = function(mode, id2) {
      if (id2 && this._edit_id == id2)
        return;
      var ev = this.getEvent(this._edit_id);
      if (ev) {
        if (mode)
          ev.text = this._editor.value;
        this._edit_id = null;
        this._editor = null;
        this.updateEvent(ev.id);
        this._edit_stop_event(ev, mode);
      }
    };
    scheduler2._edit_stop_event = function(ev, mode) {
      if (this._new_event) {
        if (!mode) {
          if (ev)
            this.deleteEvent(ev.id, true);
        } else {
          this.callEvent("onEventAdded", [ev.id, ev]);
        }
        this._new_event = null;
      } else {
        if (mode) {
          this.callEvent("onEventChanged", [ev.id, ev]);
        }
      }
    };
    scheduler2.getEvents = function(from, to) {
      var result = [];
      for (var a in this._events) {
        var ev = this._events[a];
        if (ev && (!from && !to || ev.start_date < to && ev.end_date > from))
          result.push(ev);
      }
      return result;
    };
    scheduler2.getRenderedEvent = function(id2) {
      if (!id2)
        return;
      var rendered_events = scheduler2._rendered;
      for (var i = 0; i < rendered_events.length; i++) {
        var rendered_event = rendered_events[i];
        if (rendered_event.getAttribute(scheduler2.config.event_attribute) == id2) {
          return rendered_event;
        }
      }
      return null;
    };
    scheduler2.showEvent = function(id2, mode) {
      var section;
      if (id2 && typeof id2 === "object") {
        mode = id2.mode;
        section = id2.section;
        id2 = id2.section;
      }
      var ev = typeof id2 == "number" || typeof id2 == "string" ? scheduler2.getEvent(id2) : id2;
      mode = mode || scheduler2._mode;
      if (!ev || this.checkEvent("onBeforeEventDisplay") && !this.callEvent("onBeforeEventDisplay", [ev, mode]))
        return;
      var scroll_hour = scheduler2.config.scroll_hour;
      scheduler2.config.scroll_hour = ev.start_date.getHours();
      var preserve_scroll = scheduler2.config.preserve_scroll;
      scheduler2.config.preserve_scroll = false;
      var original_color = ev.color;
      var original_text_color = ev.textColor;
      if (scheduler2.config.highlight_displayed_event) {
        ev.color = scheduler2.config.displayed_event_color;
        ev.textColor = scheduler2.config.displayed_event_text_color;
      }
      scheduler2.setCurrentView(new Date(ev.start_date), mode);
      function restoreOriginalColors() {
        ev.color = original_color;
        ev.textColor = original_text_color;
      }
      scheduler2.config.scroll_hour = scroll_hour;
      scheduler2.config.preserve_scroll = preserve_scroll;
      if (scheduler2.matrix && scheduler2.matrix[mode]) {
        var timeline = scheduler2.getView();
        var property = timeline.y_property;
        var event2 = scheduler2.getEvent(ev.id);
        if (event2) {
          if (!section) {
            var section = event2[property];
            if (Array.isArray(section)) {
              section = section[0];
            } else if (typeof section === "string" && scheduler2.config.section_delimiter && section.indexOf(scheduler2.config.section_delimiter) > -1) {
              section = section.split(scheduler2.config.section_delimiter)[0];
            }
          }
          var top = timeline.getSectionTop(section);
          var left = timeline.posFromDate(event2.start_date);
          var container = scheduler2.$container.querySelector(".dhx_timeline_data_wrapper");
          left = left - (container.offsetWidth - timeline.dx) / 2;
          top = top - container.offsetHeight / 2 + timeline.dy / 2;
          if (timeline._smartRenderingEnabled()) {
            var handlerId = timeline.attachEvent("onScroll", function() {
              restoreOriginalColors();
              timeline.detachEvent(handlerId);
            });
          }
          timeline.scrollTo({ left, top });
          if (!timeline._smartRenderingEnabled()) {
            restoreOriginalColors();
          }
        }
      } else {
        restoreOriginalColors();
      }
      scheduler2.callEvent("onAfterEventDisplay", [ev, mode]);
    };
  }
  function extend$b(scheduler2) {
    scheduler2._append_drag_marker = function(m) {
      if (m.parentNode)
        return;
      var zone = scheduler2._els["dhx_cal_data"][0];
      var scale = zone.lastChild;
      var className = scheduler2._getClassName(scale);
      if (className.indexOf("dhx_scale_holder") < 0 && scale.previousSibling) {
        scale = scale.previousSibling;
      }
      className = scheduler2._getClassName(scale);
      if (scale && className.indexOf("dhx_scale_holder") === 0) {
        scale.appendChild(m);
      }
    };
    scheduler2._update_marker_position = function(m, event2) {
      var size = scheduler2._calc_event_y(event2, 0);
      m.style.top = size.top + "px";
      m.style.height = size.height + "px";
    };
    scheduler2.highlightEventPosition = function(event2) {
      var m = document.createElement("div");
      m.setAttribute("event_id", event2.id);
      m.setAttribute(this.config.event_attribute, event2.id);
      this._rendered.push(m);
      this._update_marker_position(m, event2);
      var css = this.templates.drag_marker_class(event2.start_date, event2.end_date, event2);
      var html = this.templates.drag_marker_content(event2.start_date, event2.end_date, event2);
      m.className = "dhx_drag_marker";
      if (css)
        m.className += " " + css;
      if (html)
        m.innerHTML = html;
      this._append_drag_marker(m);
    };
  }
  function extend$a(scheduler2) {
    scheduler2._parsers.xml = { canParse: function(data, xhr) {
      if (xhr.responseXML && xhr.responseXML.firstChild) {
        return true;
      }
      try {
        var xmlDoc = scheduler2.ajax.parse(xhr.responseText);
        var topElement = scheduler2.ajax.xmltop("data", xmlDoc);
        if (topElement && topElement.tagName === "data") {
          return true;
        }
      } catch (e) {
      }
      return false;
    }, parse: function(loader) {
      var xml;
      if (!loader.xmlDoc.responseXML) {
        loader.xmlDoc.responseXML = scheduler2.ajax.parse(loader.xmlDoc.responseText);
      }
      xml = scheduler2.ajax.xmltop("data", loader.xmlDoc);
      if (xml.tagName != "data")
        return null;
      var csrfToken = xml.getAttribute("dhx_security");
      if (csrfToken) {
        if (window.dhtmlx) {
          window.dhtmlx.security_key = csrfToken;
        }
        scheduler2.security_key = csrfToken;
      }
      var opts = scheduler2.ajax.xpath("//coll_options", loader.xmlDoc);
      for (var i = 0; i < opts.length; i++) {
        var bind = opts[i].getAttribute("for");
        var arr = scheduler2.serverList[bind];
        if (!arr) {
          scheduler2.serverList[bind] = arr = [];
        }
        arr.splice(0, arr.length);
        var itms = scheduler2.ajax.xpath(".//item", opts[i]);
        for (var j = 0; j < itms.length; j++) {
          var itm = itms[j];
          var attrs = itm.attributes;
          var obj = { key: itms[j].getAttribute("value"), label: itms[j].getAttribute("label") };
          for (var k = 0; k < attrs.length; k++) {
            var attr = attrs[k];
            if (attr.nodeName == "value" || attr.nodeName == "label")
              continue;
            obj[attr.nodeName] = attr.nodeValue;
          }
          arr.push(obj);
        }
      }
      if (opts.length)
        scheduler2.callEvent("onOptionsLoad", []);
      var ud = scheduler2.ajax.xpath("//userdata", loader.xmlDoc);
      for (var i = 0; i < ud.length; i++) {
        var udx = scheduler2._xmlNodeToJSON(ud[i]);
        scheduler2._userdata[udx.name] = udx.text;
      }
      var evs = [];
      xml = scheduler2.ajax.xpath("//event", loader.xmlDoc);
      for (var i = 0; i < xml.length; i++) {
        var ev = evs[i] = scheduler2._xmlNodeToJSON(xml[i]);
        scheduler2._init_event(ev);
      }
      return evs;
    } };
  }
  function extend$9(scheduler2) {
    scheduler2.json = scheduler2._parsers.json = { canParse: function(data) {
      if (data && typeof data === "object") {
        return true;
      } else if (typeof data === "string") {
        try {
          var result = JSON.parse(data);
          return Object.prototype.toString.call(result) === "[object Object]" || Object.prototype.toString.call(result) === "[object Array]";
        } catch (err) {
          return false;
        }
      }
      return false;
    }, parse: function(data) {
      var events = [];
      if (typeof data == "string") {
        data = JSON.parse(data);
      }
      if (Object.prototype.toString.call(data) === "[object Array]") {
        events = data;
      } else {
        if (data) {
          if (data.events) {
            events = data.events;
          } else if (data.data) {
            events = data.data;
          }
        }
      }
      events = events || [];
      if (data.dhx_security) {
        if (window.dhtmlx) {
          window.dhtmlx.security_key = data.dhx_security;
        }
        scheduler2.security_key = data.dhx_security;
      }
      var collections = data && data.collections ? data.collections : {};
      var collections_loaded = false;
      for (var key in collections) {
        if (collections.hasOwnProperty(key)) {
          collections_loaded = true;
          var collection = collections[key];
          var arr = scheduler2.serverList[key];
          if (!arr) {
            scheduler2.serverList[key] = arr = [];
          }
          arr.splice(0, arr.length);
          for (var j = 0; j < collection.length; j++) {
            var option = collection[j];
            var obj = { key: option.value, label: option.label };
            for (var option_key in option) {
              if (option.hasOwnProperty(option_key)) {
                if (option_key == "value" || option_key == "label")
                  continue;
                obj[option_key] = option[option_key];
              }
            }
            arr.push(obj);
          }
        }
      }
      if (collections_loaded)
        scheduler2.callEvent("onOptionsLoad", []);
      var evs = [];
      for (var i = 0; i < events.length; i++) {
        var event2 = events[i];
        scheduler2._init_event(event2);
        evs.push(event2);
      }
      return evs;
    } };
  }
  function extend$8(scheduler2) {
    scheduler2.ical = scheduler2._parsers.ical = { canParse: function(data) {
      if (typeof data === "string") {
        return new RegExp("^BEGIN:VCALENDAR").test(data);
      }
      return false;
    }, parse: function(str) {
      var data = str.match(RegExp(this.c_start + "[^\f]*" + this.c_end, ""));
      if (!data.length)
        return;
      data[0] = data[0].replace(/[\r\n]+ /g, "");
      data[0] = data[0].replace(/[\r\n]+(?=[a-z \t])/g, " ");
      data[0] = data[0].replace(/;[^:\r\n]*:/g, ":");
      var incoming = [];
      var match;
      var event_r = RegExp("(?:" + this.e_start + ")([^\f]*?)(?:" + this.e_end + ")", "g");
      while ((match = event_r.exec(data)) !== null) {
        var e = {};
        var param;
        var param_r = /[^\r\n]+[\r\n]+/g;
        while ((param = param_r.exec(match[1])) !== null)
          this.parse_param(param.toString(), e);
        if (e.uid && !e.id)
          e.id = e.uid;
        incoming.push(e);
      }
      return incoming;
    }, parse_param: function(str, obj) {
      var d = str.indexOf(":");
      if (d == -1)
        return;
      var name = str.substr(0, d).toLowerCase();
      var value = str.substr(d + 1).replace(/\\,/g, ",").replace(/[\r\n]+$/, "");
      if (name == "summary")
        name = "text";
      else if (name == "dtstart") {
        name = "start_date";
        value = this.parse_date(value, 0, 0);
      } else if (name == "dtend") {
        name = "end_date";
        value = this.parse_date(value, 0, 0);
      }
      obj[name] = value;
    }, parse_date: function(value, dh, dm) {
      var t2 = value.split("T");
      var utcMark = false;
      if (t2[1]) {
        dh = t2[1].substr(0, 2);
        dm = t2[1].substr(2, 2);
        utcMark = !!(t2[1][6] == "Z");
      }
      var dy = t2[0].substr(0, 4);
      var dn = parseInt(t2[0].substr(4, 2), 10) - 1;
      var dd = t2[0].substr(6, 2);
      if (scheduler2.config.server_utc || utcMark) {
        return new Date(Date.UTC(dy, dn, dd, dh, dm));
      } else {
        return new Date(dy, dn, dd, dh, dm);
      }
    }, c_start: "BEGIN:VCALENDAR", e_start: "BEGIN:VEVENT", e_end: "END:VEVENT", c_end: "END:VCALENDAR" };
  }
  function getSerializator(scheduler2) {
    return (function() {
      var res = {};
      for (var a in this._events) {
        var ev = this._events[a];
        if (ev.id.toString().indexOf("#") == -1) {
          res[ev.id] = ev;
        }
      }
      return res;
    }).bind(scheduler2);
  }
  function extend$7(scheduler2) {
    scheduler2._loaded = {};
    scheduler2._load = function(url2, from) {
      url2 = url2 || this._load_url;
      if (!url2) {
        return;
      }
      url2 += (url2.indexOf("?") == -1 ? "?" : "&") + "timeshift=" + (/* @__PURE__ */ new Date()).getTimezoneOffset();
      if (this.config.prevent_cache)
        url2 += "&uid=" + this.uid();
      var to;
      from = from || this._date;
      function ajaxCallback(response) {
        scheduler2.on_load(response);
        scheduler2.callEvent("onLoadEnd", []);
      }
      if (this._load_mode) {
        var lf = this.templates.load_format;
        from = this.date[this._load_mode + "_start"](new Date(from.valueOf()));
        while (from > this._min_date)
          from = this.date.add(from, -1, this._load_mode);
        to = from;
        var cache_line = true;
        while (to < this._max_date) {
          to = this.date.add(to, 1, this._load_mode);
          if (this._loaded[lf(from)] && cache_line)
            from = this.date.add(from, 1, this._load_mode);
          else
            cache_line = false;
        }
        var temp_to = to;
        do {
          to = temp_to;
          temp_to = this.date.add(to, -1, this._load_mode);
        } while (temp_to > from && this._loaded[lf(temp_to)]);
        if (to <= from)
          return false;
        scheduler2.ajax.get(url2 + "&from=" + lf(from) + "&to=" + lf(to), ajaxCallback);
        while (from < to) {
          this._loaded[lf(from)] = true;
          from = this.date.add(from, 1, this._load_mode);
        }
      } else {
        scheduler2.ajax.get(url2, ajaxCallback);
      }
      this.callEvent("onXLS", []);
      this.callEvent("onLoadStart", []);
      return true;
    };
    scheduler2._parsers = {};
    extend$a(scheduler2);
    extend$9(scheduler2);
    extend$8(scheduler2);
    scheduler2.on_load = function(loader) {
      this.callEvent("onBeforeParse", []);
      var evs;
      var error = false;
      var foundParser = false;
      for (var i in this._parsers) {
        var parser = this._parsers[i];
        if (parser.canParse(loader.xmlDoc.responseText, loader.xmlDoc)) {
          try {
            var param = loader.xmlDoc.responseText;
            if (i === "xml") {
              param = loader;
            }
            evs = parser.parse(param);
            if (!evs) {
              error = true;
            }
          } catch (e) {
            error = true;
          }
          foundParser = true;
          break;
        }
      }
      if (!foundParser) {
        if (this._process && this[this._process]) {
          try {
            evs = this[this._process].parse(loader.xmlDoc.responseText);
          } catch (e) {
            error = true;
          }
        } else {
          error = true;
        }
      }
      if (error || loader.xmlDoc.status && loader.xmlDoc.status >= 400) {
        this.callEvent("onLoadError", [loader.xmlDoc]);
        evs = [];
      }
      this._process_loading(evs);
      this.callEvent("onXLE", []);
      this.callEvent("onParse", []);
    };
    scheduler2._process_loading = function(evs) {
      this._loading = true;
      this._not_render = true;
      for (var i = 0; i < evs.length; i++) {
        if (!this.callEvent("onEventLoading", [evs[i]]))
          continue;
        this.addEvent(evs[i]);
      }
      this._not_render = false;
      if (this._render_wait)
        this.render_view_data();
      this._loading = false;
      if (this._after_call)
        this._after_call();
      this._after_call = null;
    };
    scheduler2._init_event = function(event2) {
      event2.text = event2.text || event2._tagvalue || "";
      event2.start_date = scheduler2._init_date(event2.start_date);
      event2.end_date = scheduler2._init_date(event2.end_date);
    };
    scheduler2._init_date = function(date) {
      if (!date)
        return null;
      if (typeof date == "string") {
        return scheduler2._helpers.parseDate(date);
      } else
        return new Date(date);
    };
    const getSerializableData = getSerializator(scheduler2);
    scheduler2.serialize = function() {
      const dataset = [];
      const allEvents = getSerializableData();
      for (var a in allEvents) {
        const exportedEvent = {};
        var ev = allEvents[a];
        for (var key in ev) {
          if (key.charAt(0) == "$" || key.charAt(0) == "_") {
            continue;
          }
          let exportValue;
          const rawValue = ev[key];
          if (scheduler2.utils.isDate(rawValue)) {
            exportValue = scheduler2.defined(scheduler2.templates.xml_format) ? scheduler2.templates.xml_format(rawValue) : scheduler2.templates.format_date(rawValue);
          } else {
            exportValue = rawValue;
          }
          exportedEvent[key] = exportValue;
        }
        dataset.push(exportedEvent);
      }
      return dataset;
    };
    scheduler2.parse = function(data, type) {
      this._process = type;
      this.on_load({ xmlDoc: { responseText: data } });
    };
    scheduler2.load = function(url2, call) {
      if (typeof call == "string") {
        this._process = call;
        call = arguments[2];
      }
      this._load_url = url2;
      this._after_call = call;
      this._load(url2, this._date);
    };
    scheduler2.setLoadMode = function(mode) {
      if (mode == "all")
        mode = "";
      this._load_mode = mode;
    };
    scheduler2.serverList = function(name, array) {
      if (array) {
        this.serverList[name] = array.slice(0);
        return this.serverList[name];
      }
      this.serverList[name] = this.serverList[name] || [];
      return this.serverList[name];
    };
    scheduler2._userdata = {};
    scheduler2._xmlNodeToJSON = function(node) {
      var t2 = {};
      for (var i = 0; i < node.attributes.length; i++)
        t2[node.attributes[i].name] = node.attributes[i].value;
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (child.nodeType == 1)
          t2[child.tagName] = child.firstChild ? child.firstChild.nodeValue : "";
      }
      if (!t2.text)
        t2.text = node.firstChild ? node.firstChild.nodeValue : "";
      return t2;
    };
    scheduler2.attachEvent("onXLS", function() {
      if (this.config.show_loading === true) {
        var t2;
        t2 = this.config.show_loading = document.createElement("div");
        t2.className = "dhx_loading";
        t2.style.left = Math.round((this._x - 128) / 2) + "px";
        t2.style.top = Math.round((this._y - 15) / 2) + "px";
        this._obj.appendChild(t2);
      }
    });
    scheduler2.attachEvent("onXLE", function() {
      var t2 = this.config.show_loading;
      if (t2 && typeof t2 == "object") {
        if (t2.parentNode) {
          t2.parentNode.removeChild(t2);
        }
        this.config.show_loading = true;
      }
    });
  }
  function extend$6(scheduler2) {
    scheduler2._lightbox_controls = {};
    scheduler2.formSection = function(name) {
      var config = this.config.lightbox.sections;
      var i = 0;
      for (i; i < config.length; i++) {
        if (config[i].name == name) {
          break;
        }
      }
      if (i === config.length) {
        return null;
      }
      var section = config[i];
      if (!scheduler2._lightbox) {
        scheduler2.getLightbox();
      }
      var header = scheduler2._lightbox.querySelector(`#${section.id}`);
      var node = header.nextSibling;
      var result = { section, header, node, getValue: function(ev) {
        return scheduler2.form_blocks[section.type].get_value(node, ev || {}, section);
      }, setValue: function(value, ev) {
        return scheduler2.form_blocks[section.type].set_value(node, value, ev || {}, section);
      } };
      var handler = scheduler2._lightbox_controls["get_" + section.type + "_control"];
      return handler ? handler(result) : result;
    };
    scheduler2._lightbox_controls.get_template_control = function(result) {
      result.control = result.node;
      return result;
    };
    scheduler2._lightbox_controls.get_select_control = function(result) {
      result.control = result.node.getElementsByTagName("select")[0];
      return result;
    };
    scheduler2._lightbox_controls.get_textarea_control = function(result) {
      result.control = result.node.getElementsByTagName("textarea")[0];
      return result;
    };
    scheduler2._lightbox_controls.get_time_control = function(result) {
      result.control = result.node.getElementsByTagName("select");
      return result;
    };
    scheduler2._lightbox_controls.defaults = { template: { height: 30 }, textarea: { height: 200 }, select: { height: 23 }, time: { height: 20 } };
    scheduler2.form_blocks = { template: { render: function(sns) {
      const sectionHeight = sns.height ? `style='height:${sns.height}px;'` : "";
      return `<div class='dhx_cal_ltext dhx_cal_template' ${sectionHeight}></div>`;
    }, set_value: function(node, value, ev, config) {
      node.innerHTML = value || "";
    }, get_value: function(node, ev, config) {
      return node.innerHTML || "";
    }, focus: function(node) {
    } }, textarea: { render: function(sns) {
      const sectionHeight = sns.height ? `style='height:${sns.height}px;'` : "";
      const placeholder = sns.placeholder ? `placeholder='${sns.placeholder}'` : "";
      return `<div class='dhx_cal_ltext' ${sectionHeight}><textarea ${placeholder}></textarea></div>`;
    }, set_value: function(node, value, ev) {
      scheduler2.form_blocks.textarea._get_input(node).value = value || "";
    }, get_value: function(node, ev) {
      return scheduler2.form_blocks.textarea._get_input(node).value;
    }, focus: function(node) {
      var a = scheduler2.form_blocks.textarea._get_input(node);
      scheduler2._focus(a, true);
    }, _get_input: function(node) {
      return node.getElementsByTagName("textarea")[0];
    } }, select: { render: function(sns) {
      const sectionHeight = sns.height ? `style='height:${sns.height}px;'` : "";
      var html = `<div class='dhx_cal_ltext dhx_cal_select' ${sectionHeight}><select style='width:100%;'>`;
      for (var i = 0; i < sns.options.length; i++)
        html += "<option value='" + sns.options[i].key + "'>" + sns.options[i].label + "</option>";
      html += "</select></div>";
      return html;
    }, set_value: function(node, value, ev, sns) {
      var select = node.firstChild;
      if (!select._dhx_onchange && sns.onchange) {
        scheduler2.event(select, "change", sns.onchange);
        select._dhx_onchange = true;
      }
      if (typeof value == "undefined")
        value = (select.options[0] || {}).value;
      select.value = value || "";
    }, get_value: function(node, ev) {
      return node.firstChild.value;
    }, focus: function(node) {
      var a = node.firstChild;
      scheduler2._focus(a, true);
    } }, time: { render: function(sns) {
      if (!sns.time_format) {
        sns.time_format = ["%H:%i", "%d", "%m", "%Y"];
      }
      sns._time_format_order = {};
      var time_format = sns.time_format;
      var cfg = scheduler2.config;
      var dt = scheduler2.date.date_part(scheduler2._currentDate());
      var last = 24 * 60, first = 0;
      if (scheduler2.config.limit_time_select) {
        last = 60 * cfg.last_hour + 1;
        first = 60 * cfg.first_hour;
        dt.setHours(cfg.first_hour);
      }
      var html = "";
      for (var p = 0; p < time_format.length; p++) {
        var time_option = time_format[p];
        if (p > 0) {
          html += " ";
        }
        var selectBoxClass = "";
        var options = "";
        switch (time_option) {
          case "%Y":
            selectBoxClass = "dhx_lightbox_year_select";
            sns._time_format_order[3] = p;
            var range2;
            var start_year;
            var end_year;
            if (sns.year_range) {
              if (!isNaN(sns.year_range)) {
                range2 = sns.year_range;
              } else if (sns.year_range.push) {
                start_year = sns.year_range[0];
                end_year = sns.year_range[1];
              }
            }
            range2 = range2 || 10;
            var offset = offset || Math.floor(range2 / 2);
            start_year = start_year || dt.getFullYear() - offset;
            end_year = end_year || start_year + range2;
            for (var i = start_year; i < end_year; i++)
              options += "<option value='" + i + "'>" + i + "</option>";
            break;
          case "%m":
            selectBoxClass = "dhx_lightbox_month_select";
            sns._time_format_order[2] = p;
            for (var i = 0; i < 12; i++)
              options += "<option value='" + i + "'>" + this.locale.date.month_full[i] + "</option>";
            break;
          case "%d":
            selectBoxClass = "dhx_lightbox_day_select";
            sns._time_format_order[1] = p;
            for (var i = 1; i < 32; i++)
              options += "<option value='" + i + "'>" + i + "</option>";
            break;
          case "%H:%i":
            selectBoxClass = "dhx_lightbox_time_select";
            sns._time_format_order[0] = p;
            var i = first;
            var tdate = dt.getDate();
            sns._time_values = [];
            while (i < last) {
              var time = this.templates.time_picker(dt);
              options += "<option value='" + i + "'>" + time + "</option>";
              sns._time_values.push(i);
              dt.setTime(dt.valueOf() + this.config.time_step * 60 * 1e3);
              var diff = dt.getDate() != tdate ? 1 : 0;
              i = diff * 24 * 60 + dt.getHours() * 60 + dt.getMinutes();
            }
            break;
        }
        if (options) {
          var ariaAttrs = scheduler2._waiAria.lightboxSelectAttrString(time_option);
          var readonly2 = sns.readonly ? "disabled='disabled'" : "";
          html += "<select class='" + selectBoxClass + "' " + readonly2 + ariaAttrs + ">" + options + "</select> ";
        }
      }
      const sectionHeight = sns.height ? `style='height:${sns.height}px;'` : "";
      return `<div class='dhx_section_time' ${sectionHeight}>${html}<span style='font-weight:normal; font-size:10pt;' class='dhx_section_time_spacer'> &nbsp;&ndash;&nbsp; </span>${html}</div>`;
    }, set_value: function(node, value, ev, config) {
      var cfg = scheduler2.config;
      var s = node.getElementsByTagName("select");
      var map = config._time_format_order;
      var start_date, end_date;
      if (cfg.full_day) {
        if (!node._full_day) {
          var html = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + scheduler2.locale.labels.full_day + "&nbsp;</label></input>";
          if (!scheduler2.config.wide_form)
            html = node.previousSibling.innerHTML + html;
          node.previousSibling.innerHTML = html;
          node._full_day = true;
        }
        var input = node.previousSibling.getElementsByTagName("input")[0];
        input.checked = scheduler2.date.time_part(ev.start_date) === 0 && scheduler2.date.time_part(ev.end_date) === 0;
        s[map[0]].disabled = input.checked;
        s[map[0] + s.length / 2].disabled = input.checked;
        if (!input.$_eventAttached) {
          input.$_eventAttached = true;
          scheduler2.event(input, "click", function() {
            if (input.checked) {
              var obj = {};
              scheduler2.form_blocks.time.get_value(node, obj, config);
              start_date = scheduler2.date.date_part(obj.start_date);
              end_date = scheduler2.date.date_part(obj.end_date);
              if (+end_date == +start_date || +end_date >= +start_date && (ev.end_date.getHours() !== 0 || ev.end_date.getMinutes() !== 0))
                end_date = scheduler2.date.add(end_date, 1, "day");
            } else {
              start_date = null;
              end_date = null;
            }
            s[map[0]].disabled = input.checked;
            s[map[0] + s.length / 2].disabled = input.checked;
            _fill_lightbox_select(s, 0, start_date || ev.start_date);
            _fill_lightbox_select(s, 4, end_date || ev.end_date);
          });
        }
      }
      if (cfg.auto_end_date && cfg.event_duration) {
        var _update_lightbox_select = function() {
          if (!(cfg.auto_end_date && cfg.event_duration)) {
            return;
          }
          start_date = new Date(s[map[3]].value, s[map[2]].value, s[map[1]].value, 0, s[map[0]].value);
          end_date = new Date(start_date.getTime() + scheduler2.config.event_duration * 60 * 1e3);
          _fill_lightbox_select(s, 4, end_date);
        };
        for (var i = 0; i < 4; i++) {
          if (!s[i].$_eventAttached) {
            s[i].$_eventAttached = true;
            scheduler2.event(s[i], "change", _update_lightbox_select);
          }
        }
      }
      function _fill_lightbox_select(s2, i2, d) {
        var time_values = config._time_values;
        var direct_value = d.getHours() * 60 + d.getMinutes();
        var fixed_value = direct_value;
        var value_found = false;
        for (var k = 0; k < time_values.length; k++) {
          var t_v = time_values[k];
          if (t_v === direct_value) {
            value_found = true;
            break;
          }
          if (t_v < direct_value)
            fixed_value = t_v;
        }
        s2[i2 + map[0]].value = value_found ? direct_value : fixed_value;
        if (!(value_found || fixed_value)) {
          s2[i2 + map[0]].selectedIndex = -1;
        }
        s2[i2 + map[1]].value = d.getDate();
        s2[i2 + map[2]].value = d.getMonth();
        s2[i2 + map[3]].value = d.getFullYear();
      }
      _fill_lightbox_select(s, 0, ev.start_date);
      _fill_lightbox_select(s, 4, ev.end_date);
    }, get_value: function(node, ev, config) {
      var s = node.getElementsByTagName("select");
      var map = config._time_format_order;
      ev.start_date = new Date(s[map[3]].value, s[map[2]].value, s[map[1]].value, 0, s[map[0]].value);
      ev.end_date = new Date(s[map[3] + 4].value, s[map[2] + 4].value, s[map[1] + 4].value, 0, s[map[0] + 4].value);
      if (!(s[map[3]].value && s[map[3] + 4].value)) {
        var original = scheduler2.getEvent(scheduler2._lightbox_id);
        if (original) {
          ev.start_date = original.start_date;
          ev.end_date = original.end_date;
        }
      }
      if (ev.end_date <= ev.start_date)
        ev.end_date = scheduler2.date.add(ev.start_date, scheduler2.config.time_step, "minute");
      return { start_date: new Date(ev.start_date), end_date: new Date(ev.end_date) };
    }, focus: function(node) {
      scheduler2._focus(node.getElementsByTagName("select")[0]);
    } } };
    function getLightboxRoot() {
      const cspEnvironment = scheduler2.config.csp === true;
      const salesforceEnvironment = !!window["Sfdc"] || !!window["$A"] || window["Aura"] || "$shadowResolver$" in document.body;
      if (cspEnvironment || salesforceEnvironment) {
        return scheduler2.$root;
      } else {
        return document.body;
      }
    }
    scheduler2._setLbPosition = function(box) {
      if (!box) {
        return;
      }
      box.style.top = Math.max(getLightboxRoot().offsetHeight / 2 - box.offsetHeight / 2, 0) + "px";
      box.style.left = Math.max(getLightboxRoot().offsetWidth / 2 - box.offsetWidth / 2, 0) + "px";
    };
    scheduler2.showCover = function(box) {
      if (box) {
        box.style.display = "block";
        this._setLbPosition(box);
      }
      if (scheduler2.config.responsive_lightbox) {
        document.documentElement.classList.add("dhx_cal_overflow_container");
        getLightboxRoot().classList.add("dhx_cal_overflow_container");
      }
      this.show_cover();
      this._cover.style.display = "";
    };
    scheduler2.showLightbox = function(id2) {
      if (!id2)
        return;
      if (!this.callEvent("onBeforeLightbox", [id2])) {
        if (this._new_event)
          this._new_event = null;
        return;
      }
      this.showCover(box);
      var box = this.getLightbox();
      this._setLbPosition(box);
      this._fill_lightbox(id2, box);
      this._waiAria.lightboxVisibleAttr(box);
      this.callEvent("onLightbox", [id2]);
    };
    scheduler2._fill_lightbox = function(id2, box) {
      var ev = this.getEvent(id2);
      var s = box.getElementsByTagName("span");
      var lightboxHeader = [];
      if (scheduler2.templates.lightbox_header) {
        lightboxHeader.push("");
        var headerContent = scheduler2.templates.lightbox_header(ev.start_date, ev.end_date, ev);
        lightboxHeader.push(headerContent);
        s[1].innerHTML = "";
        s[2].innerHTML = headerContent;
      } else {
        var headerDate = this.templates.event_header(ev.start_date, ev.end_date, ev);
        var headerTitle = (this.templates.event_bar_text(ev.start_date, ev.end_date, ev) || "").substr(0, 70);
        lightboxHeader.push(headerDate);
        lightboxHeader.push(headerTitle);
        s[1].innerHTML = headerDate;
        s[2].innerHTML = headerTitle;
      }
      this._waiAria.lightboxHeader(box, lightboxHeader.join(" "));
      var sns = this.config.lightbox.sections;
      for (var i = 0; i < sns.length; i++) {
        var current_sns = sns[i];
        var node = scheduler2._get_lightbox_section_node(current_sns);
        var block = this.form_blocks[current_sns.type];
        var value = ev[current_sns.map_to] !== void 0 ? ev[current_sns.map_to] : current_sns.default_value;
        block.set_value.call(this, node, value, ev, current_sns);
        if (sns[i].focus)
          block.focus.call(this, node);
      }
      scheduler2._lightbox_id = id2;
    };
    scheduler2._get_lightbox_section_node = function(section) {
      return scheduler2._lightbox.querySelector(`#${section.id}`).nextSibling;
    };
    scheduler2._lightbox_out = function(ev) {
      var sns = this.config.lightbox.sections;
      for (var i = 0; i < sns.length; i++) {
        var node = scheduler2._lightbox.querySelector(`#${sns[i].id}`);
        node = node ? node.nextSibling : node;
        var block = this.form_blocks[sns[i].type];
        var res = block.get_value.call(this, node, ev, sns[i]);
        if (sns[i].map_to != "auto")
          ev[sns[i].map_to] = res;
      }
      return ev;
    };
    scheduler2._empty_lightbox = function(data) {
      var id2 = scheduler2._lightbox_id;
      var ev = this.getEvent(id2);
      this._lame_copy(ev, data);
      this.setEvent(ev.id, ev);
      this._edit_stop_event(ev, true);
      this.render_view_data();
    };
    scheduler2.hide_lightbox = function(id2) {
      scheduler2.endLightbox(false, this.getLightbox());
    };
    scheduler2.hideCover = function(box) {
      if (box)
        box.style.display = "none";
      this.hide_cover();
      if (scheduler2.config.responsive_lightbox) {
        document.documentElement.classList.remove("dhx_cal_overflow_container");
        getLightboxRoot().classList.remove("dhx_cal_overflow_container");
      }
    };
    scheduler2.hide_cover = function() {
      if (this._cover)
        this._cover.parentNode.removeChild(this._cover);
      this._cover = null;
    };
    scheduler2.show_cover = function() {
      if (this._cover) {
        return;
      }
      this._cover = document.createElement("div");
      this._cover.className = "dhx_cal_cover";
      this._cover.style.display = "none";
      scheduler2.event(this._cover, "mousemove", scheduler2._move_while_dnd);
      scheduler2.event(this._cover, "mouseup", scheduler2._finish_dnd);
      getLightboxRoot().appendChild(this._cover);
    };
    scheduler2.save_lightbox = function() {
      var data = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
      if (this.checkEvent("onEventSave") && !this.callEvent("onEventSave", [this._lightbox_id, data, this._new_event]))
        return;
      this._empty_lightbox(data);
      this.hide_lightbox();
    };
    scheduler2.startLightbox = function(id2, box) {
      this._lightbox_id = id2;
      this._custom_lightbox = true;
      this._temp_lightbox = this._lightbox;
      this._lightbox = box;
      this.showCover(box);
    };
    scheduler2.endLightbox = function(mode, box) {
      var box = box || scheduler2.getLightbox();
      var event2 = scheduler2.getEvent(this._lightbox_id);
      if (event2)
        this._edit_stop_event(event2, mode);
      if (mode)
        scheduler2.render_view_data();
      this.hideCover(box);
      if (this._custom_lightbox) {
        this._lightbox = this._temp_lightbox;
        this._custom_lightbox = false;
      }
      this._temp_lightbox = this._lightbox_id = null;
      this._waiAria.lightboxHiddenAttr(box);
      this.resetLightbox();
      this.callEvent("onAfterLightbox", []);
    };
    scheduler2.resetLightbox = function() {
      if (scheduler2._lightbox && !scheduler2._custom_lightbox)
        scheduler2._lightbox.parentNode.removeChild(scheduler2._lightbox);
      scheduler2._lightbox = null;
    };
    scheduler2.cancel_lightbox = function() {
      if (this._lightbox_id) {
        this.callEvent("onEventCancel", [this._lightbox_id, !!this._new_event]);
      }
      this.hide_lightbox();
    };
    scheduler2.hideLightbox = scheduler2.cancel_lightbox;
    scheduler2._init_lightbox_events = function() {
      if (this.getLightbox().$_eventAttached) {
        return;
      }
      const lightbox = this.getLightbox();
      lightbox.$_eventAttached = true;
      scheduler2.event(lightbox, "click", function(e) {
        if (e.target.closest(".dhx_cal_ltitle_close_btn")) {
          scheduler2.cancel_lightbox();
        }
        const buttonTarget = scheduler2.$domHelpers.closest(e.target, ".dhx_btn_set");
        if (!buttonTarget) {
          const sectionButton = scheduler2.$domHelpers.closest(e.target, ".dhx_custom_button[data-section-index]");
          if (sectionButton) {
            const index = Number(sectionButton.getAttribute("data-section-index"));
            const block = scheduler2.form_blocks[scheduler2.config.lightbox.sections[index].type];
            block.button_click(scheduler2.$domHelpers.closest(sectionButton, ".dhx_cal_lsection"), sectionButton, e);
          }
          return;
        }
        const action = buttonTarget ? buttonTarget.getAttribute("data-action") : null;
        switch (action) {
          case "dhx_save_btn":
          case "save":
            if (scheduler2.config.readonly_active) {
              return;
            }
            scheduler2.save_lightbox();
            break;
          case "dhx_delete_btn":
          case "delete":
            if (scheduler2.config.readonly_active) {
              return;
            }
            var c = scheduler2.locale.labels.confirm_deleting;
            scheduler2._dhtmlx_confirm({ message: c, title: scheduler2.locale.labels.title_confirm_deleting, callback: function() {
              let ev = scheduler2.getEvent(scheduler2._lightbox_id);
              if (ev._thisAndFollowing) {
                ev._removeFollowing = true;
                scheduler2.callEvent("onEventSave", [ev.id, ev, scheduler2._new_event]);
              } else {
                scheduler2.deleteEvent(scheduler2._lightbox_id);
              }
              scheduler2._new_event = null;
              scheduler2.hide_lightbox();
            }, config: { ok: scheduler2.locale.labels.icon_delete } });
            break;
          case "dhx_cancel_btn":
          case "cancel":
            scheduler2.cancel_lightbox();
            break;
          default:
            scheduler2.callEvent("onLightboxButton", [action, buttonTarget, e]);
        }
      });
      scheduler2.event(lightbox, "keydown", function(e) {
        var event2 = e || window.event;
        var target = e.target || e.srcElement;
        var buttonTarget = target.querySelector("[dhx_button]");
        if (!buttonTarget) {
          buttonTarget = target.parentNode.querySelector(".dhx_custom_button, .dhx_readonly");
        }
        switch ((e || event2).keyCode) {
          case 32: {
            if ((e || event2).shiftKey)
              return;
            if (buttonTarget && buttonTarget.click) {
              buttonTarget.click();
            }
            break;
          }
          case scheduler2.keys.edit_save:
            if ((e || event2).shiftKey)
              return;
            if (buttonTarget && buttonTarget.click) {
              buttonTarget.click();
            } else {
              if (scheduler2.config.readonly_active) {
                return;
              }
              scheduler2.save_lightbox();
            }
            break;
          case scheduler2.keys.edit_cancel:
            scheduler2.cancel_lightbox();
            break;
        }
      });
      function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
      }
      scheduler2.event(lightbox, "click", function(e) {
        if (e.target.closest(".dhx_lightbox_day_select") || e.target.closest(".dhx_lightbox_month_select")) {
          const monthSelectNodes = lightbox.querySelectorAll(".dhx_lightbox_month_select");
          const daySelectNodes = lightbox.querySelectorAll(".dhx_lightbox_day_select");
          const yearSelectNodes = lightbox.querySelectorAll(".dhx_lightbox_year_select");
          if (monthSelectNodes.length && daySelectNodes.length && yearSelectNodes) {
            monthSelectNodes.forEach((select, i) => {
              const daySelect = daySelectNodes[i];
              const month = parseInt(select.value, 10);
              let year = parseInt(yearSelectNodes[i].value, 10);
              if (!year) {
                year = new Date(scheduler2.getState().date).getFullYear();
              }
              const daysInMonth = getDaysInMonth(year, month);
              const maxDays = daysInMonth || 31;
              let curDayValue = daySelect.value;
              daySelect.innerHTML = "";
              for (let day = 1; day <= maxDays; day++) {
                const option = document.createElement("option");
                option.value = day;
                option.textContent = day;
                daySelect.appendChild(option);
              }
              daySelect.value = Math.min(curDayValue, maxDays);
            });
          }
        }
      });
    };
    scheduler2.setLightboxSize = function() {
      return;
    };
    scheduler2._init_dnd_events = function() {
      scheduler2.event(getLightboxRoot(), "mousemove", scheduler2._move_while_dnd);
      scheduler2.event(getLightboxRoot(), "mouseup", scheduler2._finish_dnd);
      scheduler2._init_dnd_events = function() {
      };
    };
    scheduler2._move_while_dnd = function(e) {
      if (scheduler2._dnd_start_lb) {
        if (!document.dhx_unselectable) {
          getLightboxRoot().classList.add("dhx_unselectable");
          document.dhx_unselectable = true;
        }
        var lb = scheduler2.getLightbox();
        var now = [e.pageX, e.pageY];
        lb.style.top = scheduler2._lb_start[1] + now[1] - scheduler2._dnd_start_lb[1] + "px";
        lb.style.left = scheduler2._lb_start[0] + now[0] - scheduler2._dnd_start_lb[0] + "px";
      }
    };
    scheduler2._ready_to_dnd = function(e) {
      var lb = scheduler2.getLightbox();
      scheduler2._lb_start = [lb.offsetLeft, lb.offsetTop];
      scheduler2._dnd_start_lb = [e.pageX, e.pageY];
    };
    scheduler2._finish_dnd = function() {
      if (scheduler2._lb_start) {
        scheduler2._lb_start = scheduler2._dnd_start_lb = false;
        getLightboxRoot().classList.remove("dhx_unselectable");
        document.dhx_unselectable = false;
      }
    };
    scheduler2.getLightbox = function() {
      if (!this._lightbox) {
        var d = document.createElement("div");
        d.className = "dhx_cal_light";
        if (scheduler2.config.wide_form)
          d.className += " dhx_cal_light_wide";
        if (scheduler2.form_blocks.recurring)
          d.className += " dhx_cal_light_rec";
        if (scheduler2.config.rtl)
          d.className += " dhx_cal_light_rtl";
        if (scheduler2.config.responsive_lightbox)
          d.className += " dhx_cal_light_responsive";
        d.style.visibility = "hidden";
        var html = this._lightbox_template;
        var buttons = this.config.buttons_right;
        html += "<div class='dhx_cal_lcontrols'>";
        var ariaAttr = "";
        for (var i = 0; i < buttons.length; i++) {
          ariaAttr = this._waiAria.lightboxButtonAttrString(buttons[i]);
          html += "<div " + ariaAttr + " data-action='" + buttons[i] + "' class='dhx_btn_set dhx_" + (scheduler2.config.rtl ? "right" : "left") + "_btn_set " + buttons[i] + "_set'><div class='dhx_btn_inner " + buttons[i] + "'></div><div>" + scheduler2.locale.labels[buttons[i]] + "</div></div>";
        }
        buttons = this.config.buttons_left;
        var rtl = scheduler2.config.rtl;
        for (var i = 0; i < buttons.length; i++) {
          ariaAttr = this._waiAria.lightboxButtonAttrString(buttons[i]);
          html += "<div class='dhx_cal_lcontrols_push_right'></div>";
          html += "<div " + ariaAttr + " data-action='" + buttons[i] + "' class='dhx_btn_set dhx_" + (rtl ? "left" : "right") + "_btn_set " + buttons[i] + "_set'><div class='dhx_btn_inner " + buttons[i] + "'></div><div>" + scheduler2.locale.labels[buttons[i]] + "</div></div>";
        }
        html += "</div>";
        html += "</div>";
        d.innerHTML = html;
        if (scheduler2.config.drag_lightbox) {
          scheduler2.event(d.firstChild, "mousedown", scheduler2._ready_to_dnd);
          scheduler2.event(d.firstChild, "selectstart", function(e) {
            e.preventDefault();
            return false;
          });
          d.firstChild.style.cursor = "move";
          scheduler2._init_dnd_events();
        }
        this._waiAria.lightboxAttr(d);
        this.show_cover();
        this._cover.insertBefore(d, this._cover.firstChild);
        this._lightbox = d;
        var sns = this.config.lightbox.sections;
        html = "";
        for (var i = 0; i < sns.length; i++) {
          var block = this.form_blocks[sns[i].type];
          if (!block)
            continue;
          sns[i].id = "area_" + this.uid();
          var button = "";
          if (sns[i].button) {
            var ariaAttr = scheduler2._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_" + sns[i].button]);
            button = "<div " + ariaAttr + " class='dhx_custom_button' data-section-index='" + i + "' index='" + i + "'><div class='dhx_custom_button_" + sns[i].button + "'></div><div>" + this.locale.labels["button_" + sns[i].button] + "</div></div>";
          }
          if (this.config.wide_form) {
            html += "<div class='dhx_wrap_section'>";
          }
          var label_name = this.locale.labels["section_" + sns[i].name];
          if (typeof label_name !== "string") {
            label_name = sns[i].name;
          }
          html += "<div id='" + sns[i].id + "' class='dhx_cal_lsection dhx_cal_lsection_" + sns[i].name + "'>" + button + "<label>" + label_name + "</label></div>" + block.render.call(this, sns[i]);
          html += "</div>";
        }
        var ds = d.getElementsByTagName("div");
        for (var i = 0; i < ds.length; i++) {
          var t_ds = ds[i];
          var className = scheduler2._getClassName(t_ds);
          if (className == "dhx_cal_larea") {
            t_ds.innerHTML = html;
            break;
          }
        }
        scheduler2._bindLightboxLabels(sns);
        this.setLightboxSize();
        this._init_lightbox_events(this);
        d.style.visibility = "visible";
      }
      return this._lightbox;
    };
    scheduler2._bindLightboxLabels = function(sections) {
      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        if (!section.id || !scheduler2._lightbox.querySelector(`#${section.id}`))
          continue;
        var labelBlock = scheduler2._lightbox.querySelector(`#${section.id}`);
        var label = labelBlock.querySelector("label");
        var inputBlock = scheduler2._get_lightbox_section_node(section);
        while (inputBlock && !inputBlock.querySelector) {
          inputBlock = inputBlock.nextSibling;
        }
        var fallback = true;
        if (inputBlock) {
          var input = inputBlock.querySelector("input, select, textarea");
          if (input) {
            section.inputId = input.id || "input_" + scheduler2.uid();
            if (!input.id)
              input.id = section.inputId;
            label.setAttribute("for", section.inputId);
            fallback = false;
          }
        }
        if (fallback) {
          var control = scheduler2.form_blocks[section.type];
          if (control.focus) {
            scheduler2.event(label, "click", function(section2) {
              return function() {
                var block = scheduler2.form_blocks[section2.type];
                var node = scheduler2._get_lightbox_section_node(section2);
                if (block && block.focus)
                  block.focus.call(scheduler2, node);
              };
            }(section));
          }
        }
      }
    };
    scheduler2.attachEvent("onEventIdChange", function(old_id, new_id) {
      if (this._lightbox_id == old_id)
        this._lightbox_id = new_id;
    });
    scheduler2._lightbox_template = `<div class='dhx_cal_ltitle'><div class="dhx_cal_ltitle_descr"><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span>
</div>
<div class="dhx_cal_ltitle_controls">
<a class="dhx_cal_ltitle_close_btn scheduler_icon close"></a>
</div></div><div class='dhx_cal_larea'></div>`;
  }
  function extend$5(scheduler2) {
    scheduler2._init_touch_events = function() {
      var mobile = this.config.touch && ((navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("Touch") != -1) && !window.MSStream) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
      if (mobile) {
        this.xy.scroll_width = 0;
        this._mobile = true;
      }
      if (this.config.touch) {
        var touchEventsSupported = true;
        try {
          document.createEvent("TouchEvent");
        } catch (e) {
          touchEventsSupported = false;
        }
        if (touchEventsSupported) {
          this._touch_events(["touchmove", "touchstart", "touchend"], function(ev) {
            if (ev.touches && ev.touches.length > 1)
              return null;
            if (ev.touches[0])
              return { target: ev.target, pageX: ev.touches[0].pageX, pageY: ev.touches[0].pageY, clientX: ev.touches[0].clientX, clientY: ev.touches[0].clientY };
            else
              return ev;
          }, function() {
            return false;
          });
        } else if (window.PointerEvent || window.navigator.pointerEnabled) {
          this._touch_events(["pointermove", "pointerdown", "pointerup"], function(ev) {
            if (ev.pointerType == "mouse")
              return null;
            return ev;
          }, function(ev) {
            return !ev || ev.pointerType == "mouse";
          });
        } else if (window.navigator.msPointerEnabled) {
          this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function(ev) {
            if (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE)
              return null;
            return ev;
          }, function(ev) {
            return !ev || ev.pointerType == ev.MSPOINTER_TYPE_MOUSE;
          });
        }
      }
    };
    scheduler2._touch_events = function(names, accessor, ignore) {
      var source, tracker, timer, drag_mode, scroll_mode, action_mode;
      var dblclicktime = 0;
      function attachTouchEvent(element, name, callback) {
        scheduler2.event(element, name, function(e) {
          if (scheduler2._is_lightbox_open()) {
            return true;
          } else {
            if (ignore(e))
              return;
            return callback(e);
          }
        }, { passive: false });
      }
      function check_direction_swipe(s_ev, e_ev, step, max_dy) {
        if (!s_ev || !e_ev)
          return false;
        var t2 = s_ev.target;
        while (t2 && t2 != scheduler2._obj) {
          t2 = t2.parentNode;
        }
        if (t2 != scheduler2._obj) {
          return false;
        }
        if (scheduler2.matrix && scheduler2.matrix[scheduler2.getState().mode]) {
          var timeline = scheduler2.matrix[scheduler2.getState().mode];
          if (timeline.scrollable) {
            return false;
          }
        }
        var dy = Math.abs(s_ev.pageY - e_ev.pageY);
        var dx = Math.abs(s_ev.pageX - e_ev.pageX);
        if (dy < max_dy && dx > step && (!dy || dx / dy > 3)) {
          if (s_ev.pageX > e_ev.pageX) {
            scheduler2._click.dhx_cal_next_button();
          } else {
            scheduler2._click.dhx_cal_prev_button();
          }
          return true;
        }
        return false;
      }
      function doMouseMove(e) {
        if (ignore(e))
          return;
        var dnd = scheduler2.getState().drag_mode, timeline = scheduler2.matrix ? scheduler2.matrix[scheduler2._mode] : false;
        var original_render = scheduler2.render_view_data;
        if (dnd == "create" && timeline) {
          scheduler2.render_view_data = function() {
            var id2 = scheduler2.getState().drag_id;
            var ev = scheduler2.getEvent(id2);
            var property = timeline.y_property;
            var evs = scheduler2.getEvents(ev.start_date, ev.end_date);
            for (var i = 0; i < evs.length; i++) {
              if (evs[i][property] != ev[property]) {
                evs.splice(i, 1);
                i--;
              }
            }
            ev._sorder = evs.length - 1;
            ev._count = evs.length;
            this.render_data([ev], scheduler2.getState().mode);
          };
        }
        scheduler2._on_mouse_move(e);
        if (dnd == "create" && timeline) {
          scheduler2.render_view_data = original_render;
        }
        if (e.preventDefault)
          e.preventDefault();
        e.cancelBubble = true;
        return false;
      }
      attachTouchEvent(document.body, names[0], function(e) {
        if (ignore(e))
          return;
        var acc = accessor(e);
        if (!acc)
          return;
        if (drag_mode) {
          doMouseMove(acc);
          if (e.preventDefault)
            e.preventDefault();
          e.cancelBubble = true;
          scheduler2._update_global_tip();
          return false;
        }
        tracker = accessor(e);
        if (!action_mode)
          return;
        if (!tracker) {
          scroll_mode = true;
          return;
        }
        if (source.target != tracker.target || Math.abs(source.pageX - tracker.pageX) > 5 || Math.abs(source.pageY - tracker.pageY) > 5) {
          scroll_mode = true;
          clearTimeout(timer);
        }
      });
      attachTouchEvent(this._els["dhx_cal_data"][0], "touchcancel", drag_cancel);
      attachTouchEvent(this._els["dhx_cal_data"][0], "contextmenu", function(e) {
        if (ignore(e))
          return;
        if (action_mode) {
          if (e && e.preventDefault)
            e.preventDefault();
          e.cancelBubble = true;
          return false;
        }
      });
      attachTouchEvent(this._obj, names[1], function(e) {
        if (document && document.body) {
          document.body.classList.add("dhx_cal_touch_active");
        }
        if (ignore(e))
          return;
        scheduler2._pointerDragId = e.pointerId;
        var fake_event;
        drag_mode = scroll_mode = false;
        action_mode = true;
        fake_event = tracker = accessor(e);
        if (!fake_event) {
          scroll_mode = true;
          return;
        }
        var now = /* @__PURE__ */ new Date();
        if (!scroll_mode && !drag_mode && now - dblclicktime < 250) {
          scheduler2._click.dhx_cal_data(fake_event);
          window.setTimeout(function() {
            if (scheduler2.$destroyed) {
              return;
            }
            scheduler2._on_dbl_click(fake_event);
          }, 50);
          if (e.preventDefault)
            e.preventDefault();
          e.cancelBubble = true;
          scheduler2._block_next_stop = true;
          return false;
        }
        dblclicktime = now;
        if (scroll_mode || drag_mode || !scheduler2.config.touch_drag)
          return;
        var actTask = scheduler2._locate_event(document.activeElement);
        var fakeTask = scheduler2._locate_event(fake_event.target);
        var sourceTask = source ? scheduler2._locate_event(source.target) : null;
        if (actTask && fakeTask && actTask == fakeTask && actTask != sourceTask) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          e.cancelBubble = true;
          scheduler2._ignore_next_click = false;
          scheduler2._click.dhx_cal_data(fake_event);
          source = fake_event;
          return false;
        }
        timer = setTimeout(function() {
          if (scheduler2.$destroyed) {
            return;
          }
          drag_mode = true;
          var target = source.target;
          var className = scheduler2._getClassName(target);
          if (target && className.indexOf("dhx_body") != -1)
            target = target.previousSibling;
          scheduler2._on_mouse_down(source, target);
          if (scheduler2._drag_mode && scheduler2._drag_mode != "create") {
            scheduler2.for_rendered(scheduler2._drag_id, function(node, i) {
              node.style.display = "none";
              scheduler2._rendered.splice(i, 1);
            });
          }
          if (scheduler2.config.touch_tip) {
            scheduler2._show_global_tip();
          }
          scheduler2.updateEvent(scheduler2._drag_id);
        }, scheduler2.config.touch_drag);
        source = fake_event;
      });
      function drag_cancel(e) {
        if (ignore(e))
          return;
        scheduler2._hide_global_tip();
        if (drag_mode) {
          scheduler2._on_mouse_up(accessor(e));
          scheduler2._temp_touch_block = false;
        }
        scheduler2._drag_id = null;
        scheduler2._drag_mode = null;
        scheduler2._drag_pos = null;
        scheduler2._pointerDragId = null;
        clearTimeout(timer);
        drag_mode = action_mode = false;
        scroll_mode = true;
      }
      attachTouchEvent(this._els["dhx_cal_data"][0], names[2], function(e) {
        if (document && document.body) {
          document.body.classList.remove("dhx_cal_touch_active");
        }
        if (ignore(e))
          return;
        if (scheduler2.config.touch_swipe_dates) {
          if (!drag_mode && check_direction_swipe(source, tracker, 200, 100)) {
            scheduler2._block_next_stop = true;
          }
        }
        if (drag_mode) {
          scheduler2._ignore_next_click = true;
          setTimeout(function() {
            scheduler2._ignore_next_click = false;
          }, 100);
        }
        drag_cancel(e);
        if (scheduler2._block_next_stop) {
          scheduler2._block_next_stop = false;
          if (e.preventDefault)
            e.preventDefault();
          e.cancelBubble = true;
          return false;
        }
      });
      scheduler2.event(document.body, names[2], drag_cancel);
    };
    scheduler2._show_global_tip = function() {
      scheduler2._hide_global_tip();
      var toptip = scheduler2._global_tip = document.createElement("div");
      toptip.className = "dhx_global_tip";
      scheduler2._update_global_tip(1);
      document.body.appendChild(toptip);
    };
    scheduler2._update_global_tip = function(init) {
      var toptip = scheduler2._global_tip;
      if (toptip) {
        var time = "";
        if (scheduler2._drag_id && !init) {
          var ev = scheduler2.getEvent(scheduler2._drag_id);
          if (ev)
            time = "<div>" + (ev._timed ? scheduler2.templates.event_header(ev.start_date, ev.end_date, ev) : scheduler2.templates.day_date(ev.start_date, ev.end_date, ev)) + "</div>";
        }
        if (scheduler2._drag_mode == "create" || scheduler2._drag_mode == "new-size")
          toptip.innerHTML = (scheduler2.locale.labels.drag_to_create || "Drag to create") + time;
        else
          toptip.innerHTML = (scheduler2.locale.labels.drag_to_move || "Drag to move") + time;
      }
    };
    scheduler2._hide_global_tip = function() {
      var toptip = scheduler2._global_tip;
      if (toptip && toptip.parentNode) {
        toptip.parentNode.removeChild(toptip);
        scheduler2._global_tip = 0;
      }
    };
  }
  function extend$4(scheduler2) {
    scheduler2.getRootView = function() {
      return { view: { render: function() {
        return { tag: "div", type: 1, attrs: { style: "width:100%;height:100%;" }, hooks: { didInsert: function() {
          scheduler2.setCurrentView();
        } }, body: [{ el: this.el, type: 1 }] };
      }, init: function() {
        var container = document.createElement("DIV");
        container.id = "scheduler_" + scheduler2.uid();
        container.style.width = "100%";
        container.style.height = "100%";
        container.classList.add("dhx_cal_container");
        container.cmp = "grid";
        container.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" data-tab="day"></div><div class="dhx_cal_tab" data-tab="week"></div><div class="dhx_cal_tab" data-tab="month"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>';
        scheduler2.init(container);
        this.el = container;
      } }, type: 4 };
    };
  }
  function extend$3(scheduler2) {
    scheduler2._addThemeClass = function() {
      document.documentElement.setAttribute("data-scheduler-theme", scheduler2.skin);
    };
    scheduler2._skin_settings = { fix_tab_position: [1, 0], use_select_menu_space: [1, 0], wide_form: [1, 0], hour_size_px: [44, 42], displayed_event_color: ["#ff4a4a", "ffc5ab"], displayed_event_text_color: ["#ffef80", "7e2727"] };
    scheduler2._skin_xy = { lightbox_additional_height: [90, 50], nav_height: [59, 22], bar_height: [24, 20] };
    scheduler2._is_material_skin = function() {
      if (!scheduler2.skin) {
        return checkIfMaterialSkin();
      } else {
        return (scheduler2.skin + "").indexOf("material") > -1;
      }
    };
    function themeNameFromFile() {
      var links = document.getElementsByTagName("link");
      for (var i = 0; i < links.length; i++) {
        var res = links[i].href.match("dhtmlxscheduler_([a-z]+).css");
        if (res) {
          return res[1];
        }
      }
    }
    scheduler2._build_skin_info = function() {
      monitorThemeChange();
      const styles = getComputedStyle(this.$container);
      const themeVar = styles.getPropertyValue("--dhx-scheduler-theme");
      let isCssVarTheme = !!themeVar;
      let themeName;
      let cssValues = {};
      let oldMaterialTheme = false;
      if (isCssVarTheme) {
        themeName = themeVar;
        for (let i in scheduler2.xy) {
          cssValues[i] = styles.getPropertyValue(`--dhx-scheduler-xy-${i}`);
        }
        cssValues.hour_size_px = styles.getPropertyValue(`--dhx-scheduler-config-hour_size_px`);
        cssValues.wide_form = styles.getPropertyValue(`--dhx-scheduler-config-form_wide`);
      } else {
        themeName = themeNameFromFile();
        oldMaterialTheme = scheduler2._is_material_skin();
      }
      scheduler2._theme_info = { theme: themeName, cssVarTheme: isCssVarTheme, oldMaterialTheme, values: cssValues };
      if (scheduler2._theme_info.cssVarTheme) {
        const themeVariables = this._theme_info.values;
        for (let i in scheduler2.xy) {
          if (!isNaN(parseInt(themeVariables[i]))) {
            scheduler2.xy[i] = parseInt(themeVariables[i]);
          }
        }
      }
    };
    var calculatedMaterial;
    function checkIfMaterialSkin() {
      if (calculatedMaterial === void 0) {
        var probe = document.createElement("div");
        probe.style.position = "absolute";
        probe.style.left = "-9999px";
        probe.style.top = "-9999px";
        probe.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_scale_placeholder'></div><div>";
        document.body.appendChild(probe);
        var styles = window.getComputedStyle(probe.querySelector(".dhx_cal_scale_placeholder"));
        var position = styles.getPropertyValue("position");
        if (position === "absolute") {
          calculatedMaterial = true;
        } else {
          calculatedMaterial = false;
        }
        setTimeout(function() {
          calculatedMaterial = null;
          if (probe && probe.parentNode) {
            probe.parentNode.removeChild(probe);
          }
        }, 500);
      }
      return calculatedMaterial;
    }
    var cachedBorderBoxValue;
    function checkIfBorderBoxStyling() {
      if (scheduler2._is_material_skin()) {
        return true;
      } else {
        if (cachedBorderBoxValue === void 0) {
          var probe = document.createElement("div");
          probe.style.position = "absolute";
          probe.style.left = "-9999px";
          probe.style.top = "-9999px";
          probe.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_data'><div class='dhx_cal_event'><div class='dhx_body'></div></div><div>";
          document.body.appendChild(probe);
          var styles = window.getComputedStyle(probe.querySelector(".dhx_body"));
          var boxSizing = styles.getPropertyValue("box-sizing");
          document.body.removeChild(probe);
          cachedBorderBoxValue = !!(boxSizing === "border-box");
          if (!cachedBorderBoxValue) {
            setTimeout(function() {
              cachedBorderBoxValue = void 0;
            }, 1e3);
          }
        } else {
          return cachedBorderBoxValue;
        }
      }
    }
    function refreshAfterLoad() {
      if (scheduler2._is_material_skin() || scheduler2._border_box_events()) {
        return;
      }
      var oldStyling = cachedBorderBoxValue;
      cachedBorderBoxValue = void 0;
      calculatedMaterial = void 0;
      var newStyling = checkIfBorderBoxStyling();
      if (oldStyling !== newStyling && scheduler2.$container && scheduler2.getState().mode) {
        scheduler2.setCurrentView();
      }
    }
    scheduler2.event(window, "DOMContentLoaded", refreshAfterLoad);
    scheduler2.event(window, "load", refreshAfterLoad);
    scheduler2._border_box_events = function() {
      return checkIfBorderBoxStyling();
    };
    scheduler2._configure = function(col, data, skin) {
      for (var key in data)
        if (typeof col[key] == "undefined")
          col[key] = data[key][skin];
    };
    scheduler2.setSkin = function(value) {
      this.skin = value;
      scheduler2._addThemeClass();
      if (scheduler2.$container) {
        this._skin_init();
        this.render();
      }
    };
    function flatSkinHourScale(date) {
      var min = date.getMinutes();
      min = min < 10 ? "0" + min : min;
      var html = "<span class='dhx_scale_h'>" + date.getHours() + "</span><span class='dhx_scale_m'>&nbsp;" + min + "</span>";
      return html;
    }
    let monitorIntervalId = null;
    function monitorThemeChange() {
      const container = scheduler2.$container;
      clearInterval(monitorIntervalId);
      if (container) {
        monitorIntervalId = setInterval(() => {
          const csstheme = getComputedStyle(container).getPropertyValue("--dhx-scheduler-theme");
          if (csstheme && csstheme !== scheduler2.skin) {
            scheduler2.setSkin(csstheme);
          }
        }, 100);
      }
    }
    scheduler2.attachEvent("onDestroy", function() {
      clearInterval(monitorIntervalId);
    });
    scheduler2._skin_init = function() {
      this._build_skin_info();
      if (!this.skin) {
        this.skin = this._theme_info.theme;
      }
      scheduler2._addThemeClass();
      if (scheduler2.skin === "flat") {
        scheduler2.templates.hour_scale = flatSkinHourScale;
      } else if (scheduler2.templates.hour_scale === flatSkinHourScale) {
        scheduler2.templates.hour_scale = scheduler2.date.date_to_str(scheduler2.config.hour_date);
      }
      scheduler2.attachEvent("onTemplatesReady", function() {
        var date_to_str = scheduler2.date.date_to_str("%d");
        if (!scheduler2.templates._old_month_day) {
          scheduler2.templates._old_month_day = scheduler2.templates.month_day;
        }
        var old_month_day = scheduler2.templates._old_month_day;
        scheduler2.templates.month_day = function(date) {
          if (this._mode == "month") {
            var label = date_to_str(date);
            if (date.getDate() == 1) {
              label = scheduler2.locale.date.month_full[date.getMonth()] + " " + label;
            }
            if (+date == +scheduler2.date.date_part(this._currentDate())) {
              label = scheduler2.locale.labels.dhx_cal_today_button + " " + label;
            }
            return label;
          } else {
            return old_month_day.call(this, date);
          }
        };
        if (scheduler2.config.fix_tab_position) {
          const tabs = scheduler2._els["dhx_cal_navline"][0].querySelectorAll("[data-tab]");
          tabs.forEach((tab) => {
            const view = tab.getAttribute("data-tab") || tab.getAttribute("name");
            switch (view) {
              case "day":
              case "day_tab":
                tab.classList.add("dhx_cal_tab_first");
                tab.classList.add("dhx_cal_tab_segmented");
                break;
              case "week":
              case "week_tab":
                tab.classList.add("dhx_cal_tab_segmented");
                break;
              case "month":
              case "month_tab":
                tab.classList.add("dhx_cal_tab_last");
                tab.classList.add("dhx_cal_tab_segmented");
                break;
              default:
                tab.classList.add("dhx_cal_tab_standalone");
                break;
            }
          });
          reorderTabs(scheduler2._els["dhx_cal_navline"][0]);
        }
      }, { once: true });
      function reorderTabs(container) {
        if (scheduler2.config.header) {
          return;
        }
        const tabs = Array.from(container.querySelectorAll(".dhx_cal_tab"));
        const order = ["day", "week", "month"];
        const specialTabs = order.map((tabName) => tabs.find((tab) => tab.getAttribute("data-tab") === tabName)).filter((tab) => tab !== void 0);
        let firstTab = tabs.length > 0 ? tabs[0] : null;
        specialTabs.reverse().forEach((tab) => {
          container.insertBefore(tab, firstTab);
          firstTab = tab;
        });
      }
    };
  }
  function extend$2(scheduler2) {
    if (window.jQuery) {
      (function($) {
        var counter = 0;
        var methods = [];
        $.fn.dhx_scheduler = function(config) {
          if (typeof config === "string") {
            if (methods[config]) {
              return methods[config].apply(this, []);
            } else {
              $.error("Method " + config + " does not exist on jQuery.dhx_scheduler");
            }
          } else {
            var views = [];
            this.each(function() {
              if (this && this.getAttribute) {
                if (!this.getAttribute("dhxscheduler")) {
                  var name = "scheduler";
                  if (counter) {
                    name = "scheduler" + (counter + 1);
                    window[name] = Scheduler.getSchedulerInstance();
                  }
                  var comp = window[name];
                  this.setAttribute("dhxscheduler", name);
                  for (var key in config)
                    if (key != "data")
                      comp.config[key] = config[key];
                  if (!this.getElementsByTagName("div").length) {
                    this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>';
                    this.className += " dhx_cal_container";
                  }
                  comp.init(this, comp.config.date, comp.config.mode);
                  if (config.data)
                    comp.parse(config.data);
                  views.push(comp);
                  counter++;
                } else
                  views.push(window[this.getAttribute("dhxscheduler")]);
              }
            });
            if (views.length === 1)
              return views[0];
            return views;
          }
        };
      })(window.jQuery);
    }
  }
  function extend$1(scheduler2) {
    (function() {
      var setCurrentView = scheduler2.setCurrentView, updateView = scheduler2.updateView;
      var update_view_timer = null, curr_view_timer = null;
      var lazy_setCurrentView = function(date, mode) {
        var self2 = this;
        global$1.clearTimeout(curr_view_timer);
        global$1.clearTimeout(update_view_timer);
        var oldDate = self2._date, oldMode = self2._mode;
        updateFlags(this, date, mode);
        curr_view_timer = setTimeout(function() {
          if (scheduler2.$destroyed) {
            return;
          }
          if (!self2.callEvent("onBeforeViewChange", [oldMode, oldDate, mode || self2._mode, date || self2._date])) {
            updateFlags(self2, oldDate, oldMode);
            return;
          }
          updateView.call(self2, date, mode);
          self2.callEvent("onViewChange", [self2._mode, self2._date]);
          global$1.clearTimeout(update_view_timer);
          curr_view_timer = 0;
        }, scheduler2.config.delay_render);
      };
      var lazy_updateView = function(date, mode) {
        var self2 = this, ars = arguments;
        updateFlags(this, date, mode);
        global$1.clearTimeout(update_view_timer);
        update_view_timer = setTimeout(function() {
          if (scheduler2.$destroyed) {
            return;
          }
          if (curr_view_timer)
            return;
          updateView.apply(self2, ars);
        }, scheduler2.config.delay_render);
      };
      function updateFlags(scheduler3, date, mode) {
        if (date)
          scheduler3._date = date;
        if (mode)
          scheduler3._mode = mode;
      }
      scheduler2.attachEvent("onSchedulerReady", function() {
        if (scheduler2.config.delay_render) {
          scheduler2.setCurrentView = lazy_setCurrentView;
          scheduler2.updateView = lazy_updateView;
        } else {
          scheduler2.setCurrentView = setCurrentView;
          scheduler2.updateView = updateView;
        }
      });
    })();
  }
  function DataProcessorEvents(scheduler2, dp) {
    this.$scheduler = scheduler2;
    this.$dp = dp;
    this._dataProcessorHandlers = [];
    this.attach = function() {
      var dp2 = this.$dp;
      var scheduler3 = this.$scheduler;
      this._dataProcessorHandlers.push(scheduler3.attachEvent("onEventAdded", function(id2) {
        if (!this._loading && this._validId(id2))
          dp2.setUpdated(id2, true, "inserted");
      }));
      this._dataProcessorHandlers.push(scheduler3.attachEvent("onConfirmedBeforeEventDelete", function(id2) {
        if (!this._validId(id2))
          return;
        var z = dp2.getState(id2);
        if (z == "inserted" || this._new_event) {
          dp2.setUpdated(id2, false);
          return true;
        }
        if (z == "deleted")
          return false;
        if (z == "true_deleted")
          return true;
        dp2.setUpdated(id2, true, "deleted");
        return false;
      }));
      this._dataProcessorHandlers.push(scheduler3.attachEvent("onEventChanged", function(id2) {
        if (!this._loading && this._validId(id2))
          dp2.setUpdated(id2, true, "updated");
      }));
      this._dataProcessorHandlers.push(scheduler3.attachEvent("onClearAll", function() {
        dp2._in_progress = {};
        dp2._invalid = {};
        dp2.updatedRows = [];
        dp2._waitMode = 0;
      }));
      dp2.attachEvent("insertCallback", scheduler3._update_callback);
      dp2.attachEvent("updateCallback", scheduler3._update_callback);
      dp2.attachEvent("deleteCallback", function(upd, id2) {
        if (scheduler3.getEvent(id2)) {
          scheduler3.setUserData(id2, this.action_param, "true_deleted");
          scheduler3.deleteEvent(id2);
        } else if (scheduler3._add_rec_marker)
          scheduler3._update_callback(upd, id2);
      });
    };
    this.detach = function() {
      for (var key in this._dataProcessorHandlers) {
        var handler = this._dataProcessorHandlers[key];
        this.$scheduler.detachEvent(handler);
      }
      this._dataProcessorHandlers = [];
    };
  }
  function extendScheduler(scheduler2, dp) {
    scheduler2._validId = function(id2) {
      if (this._is_virtual_event) {
        return !this._is_virtual_event(id2);
      }
      return true;
    };
    scheduler2.setUserData = function(id2, name, value) {
      if (id2) {
        var ev = this.getEvent(id2);
        if (ev)
          ev[name] = value;
      } else {
        this._userdata[name] = value;
      }
    };
    scheduler2.getUserData = function(id2, name) {
      if (id2) {
        var ev = this.getEvent(id2);
        if (ev)
          return ev[name];
        else
          return null;
      } else {
        return this._userdata[name];
      }
    };
    scheduler2._set_event_text_style = function(id2, style) {
      if (!scheduler2.getEvent(id2))
        return;
      this.for_rendered(id2, function(r) {
        r.style.cssText += ";" + style;
      });
      var ev = this.getEvent(id2);
      ev["_text_style"] = style;
      this.event_updated(ev);
    };
    scheduler2._update_callback = function(upd, id2) {
      var data = scheduler2._xmlNodeToJSON(upd.firstChild);
      if (data.rec_type == "none")
        data.rec_pattern = "none";
      data.text = data.text || data._tagvalue;
      data.start_date = scheduler2._helpers.parseDate(data.start_date);
      data.end_date = scheduler2._helpers.parseDate(data.end_date);
      scheduler2.addEvent(data);
      if (scheduler2._add_rec_marker)
        scheduler2.setCurrentView();
    };
    scheduler2._dp_change_event_id = function(id2, new_id) {
      if (!scheduler2.getEvent(id2))
        return;
      scheduler2.changeEventId(id2, new_id);
    };
    scheduler2._dp_hook_delete = function(id2, new_id) {
      if (!scheduler2.getEvent(id2))
        return;
      if (new_id && id2 != new_id) {
        if (this.getUserData(id2, dp.action_param) == "true_deleted")
          this.setUserData(id2, dp.action_param, "updated");
        this.changeEventId(id2, new_id);
      }
      return this.deleteEvent(new_id, true);
    };
    scheduler2.setDp = function() {
      this._dp = dp;
    };
    scheduler2.setDp();
  }
  function DataProcessor(serverProcessorURL) {
    this.serverProcessor = serverProcessorURL;
    this.action_param = "!nativeeditor_status";
    this.object = null;
    this.updatedRows = [];
    this.autoUpdate = true;
    this.updateMode = "cell";
    this._tMode = "GET";
    this._headers = null;
    this._payload = null;
    this.post_delim = "_";
    this._waitMode = 0;
    this._in_progress = {};
    this._invalid = {};
    this.messages = [];
    this.styles = { updated: "font-weight:bold;", inserted: "font-weight:bold;", deleted: "text-decoration : line-through;", invalid: "background-color:FFE0E0;", invalid_cell: "border-bottom:2px solid red;", error: "color:red;", clear: "font-weight:normal;text-decoration:none;" };
    this.enableUTFencoding(true);
    makeEventable(this);
    return this;
  }
  DataProcessor.prototype = { setTransactionMode: function(mode, total) {
    if (typeof mode == "object") {
      this._tMode = mode.mode || this._tMode;
      if (mode.headers !== void 0) {
        this._headers = mode.headers;
      }
      if (mode.payload !== void 0) {
        this._payload = mode.payload;
      }
      this._tSend = !!total;
    } else {
      this._tMode = mode;
      this._tSend = total;
    }
    if (this._tMode == "REST") {
      this._tSend = false;
      this._endnm = true;
    }
    if (this._tMode === "JSON" || this._tMode === "REST-JSON") {
      this._tSend = false;
      this._endnm = true;
      this._serializeAsJson = true;
      this._headers = this._headers || {};
      this._headers["Content-Type"] = "application/json";
    } else {
      if (this._headers && !this._headers["Content-Type"]) {
        this._headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
    }
    if (this._tMode === "CUSTOM") {
      this._tSend = false;
      this._endnm = true;
      this._router = mode.router;
    }
  }, escape: function(data) {
    if (this._utf)
      return encodeURIComponent(data);
    else
      return escape(data);
  }, enableUTFencoding: function(mode) {
    this._utf = !!mode;
  }, setDataColumns: function(val) {
    this._columns = typeof val == "string" ? val.split(",") : val;
  }, getSyncState: function() {
    return !this.updatedRows.length;
  }, enableDataNames: function(mode) {
    this._endnm = !!mode;
  }, enablePartialDataSend: function(mode) {
    this._changed = !!mode;
  }, setUpdateMode: function(mode, dnd) {
    this.autoUpdate = mode == "cell";
    this.updateMode = mode;
    this.dnd = dnd;
  }, ignore: function(code, master) {
    this._silent_mode = true;
    code.call(master || window);
    this._silent_mode = false;
  }, setUpdated: function(rowId, state, mode) {
    if (this._silent_mode)
      return;
    var ind = this.findRow(rowId);
    mode = mode || "updated";
    var existing = this.$scheduler.getUserData(rowId, this.action_param);
    if (existing && mode == "updated")
      mode = existing;
    if (state) {
      this.set_invalid(rowId, false);
      this.updatedRows[ind] = rowId;
      this.$scheduler.setUserData(rowId, this.action_param, mode);
      if (this._in_progress[rowId])
        this._in_progress[rowId] = "wait";
    } else {
      if (!this.is_invalid(rowId)) {
        this.updatedRows.splice(ind, 1);
        this.$scheduler.setUserData(rowId, this.action_param, "");
      }
    }
    this.markRow(rowId, state, mode);
    if (state && this.autoUpdate)
      this.sendData(rowId);
  }, markRow: function(id2, state, mode) {
    var str = "";
    var invalid = this.is_invalid(id2);
    if (invalid) {
      str = this.styles[invalid];
      state = true;
    }
    if (this.callEvent("onRowMark", [id2, state, mode, invalid])) {
      str = this.styles[state ? mode : "clear"] + str;
      this.$scheduler[this._methods[0]](id2, str);
      if (invalid && invalid.details) {
        str += this.styles[invalid + "_cell"];
        for (var i = 0; i < invalid.details.length; i++)
          if (invalid.details[i])
            this.$scheduler[this._methods[1]](id2, i, str);
      }
    }
  }, getActionByState: function(state) {
    if (state === "inserted") {
      return "create";
    }
    if (state === "updated") {
      return "update";
    }
    if (state === "deleted") {
      return "delete";
    }
    return "update";
  }, getState: function(id2) {
    return this.$scheduler.getUserData(id2, this.action_param);
  }, is_invalid: function(id2) {
    return this._invalid[id2];
  }, set_invalid: function(id2, mode, details) {
    if (details)
      mode = { value: mode, details, toString: function() {
        return this.value.toString();
      } };
    this._invalid[id2] = mode;
  }, checkBeforeUpdate: function(rowId) {
    return true;
  }, sendData: function(rowId) {
    if (this.$scheduler.editStop)
      this.$scheduler.editStop();
    if (typeof rowId == "undefined" || this._tSend)
      return this.sendAllData();
    if (this._in_progress[rowId])
      return false;
    this.messages = [];
    if (!this.checkBeforeUpdate(rowId) && this.callEvent("onValidationError", [rowId, this.messages]))
      return false;
    this._beforeSendData(this._getRowData(rowId), rowId);
  }, _beforeSendData: function(data, rowId) {
    if (!this.callEvent("onBeforeUpdate", [rowId, this.getState(rowId), data]))
      return false;
    this._sendData(data, rowId);
  }, serialize: function(data, id2) {
    if (this._serializeAsJson) {
      return this._serializeAsJSON(data);
    }
    if (typeof data == "string")
      return data;
    if (typeof id2 != "undefined")
      return this.serialize_one(data, "");
    else {
      var stack = [];
      var keys = [];
      for (var key in data)
        if (data.hasOwnProperty(key)) {
          stack.push(this.serialize_one(data[key], key + this.post_delim));
          keys.push(key);
        }
      stack.push("ids=" + this.escape(keys.join(",")));
      if (this.$scheduler.security_key)
        stack.push("dhx_security=" + this.$scheduler.security_key);
      return stack.join("&");
    }
  }, serialize_one: function(data, pref) {
    if (typeof data == "string")
      return data;
    var stack = [];
    var serialized = "";
    for (var key in data)
      if (data.hasOwnProperty(key)) {
        if ((key == "id" || key == this.action_param) && this._tMode == "REST")
          continue;
        if (typeof data[key] === "string" || typeof data[key] === "number") {
          serialized = data[key];
        } else {
          serialized = JSON.stringify(data[key]);
        }
        stack.push(this.escape((pref || "") + key) + "=" + this.escape(serialized));
      }
    return stack.join("&");
  }, _applyPayload: function(url2) {
    var ajax = this.$scheduler.ajax;
    if (this._payload)
      for (var key in this._payload)
        url2 = url2 + ajax.urlSeparator(url2) + this.escape(key) + "=" + this.escape(this._payload[key]);
    return url2;
  }, _sendData: function(dataToSend, rowId) {
    if (!dataToSend) {
      return;
    }
    if (!this.callEvent("onBeforeDataSending", rowId ? [rowId, this.getState(rowId), dataToSend] : [null, null, dataToSend])) {
      return false;
    }
    if (rowId) {
      this._in_progress[rowId] = (/* @__PURE__ */ new Date()).valueOf();
    }
    var self2 = this;
    var ajax = this.$scheduler.ajax;
    if (this._tMode === "CUSTOM") {
      var state = this.getState(rowId);
      var action = this.getActionByState(state);
      var _onResolvedCreateUpdate = function(tag) {
        var resultState = state;
        if (tag && tag.responseText && tag.setRequestHeader) {
          if (tag.status !== 200) {
            resultState = "error";
          }
          try {
            tag = JSON.parse(tag.responseText);
          } catch (e) {
          }
        }
        resultState = resultState || "updated";
        var sid = rowId;
        var tid = rowId;
        if (tag) {
          resultState = tag.action || resultState;
          sid = tag.sid || sid;
          tid = tag.id || tag.tid || tid;
        }
        self2.afterUpdateCallback(sid, tid, resultState, tag);
      };
      const routerMode = "event";
      var actionPromise;
      if (this._router instanceof Function) {
        actionPromise = this._router(routerMode, action, dataToSend, rowId);
      } else {
        switch (state) {
          case "inserted":
            actionPromise = this._router[routerMode].create(dataToSend);
            break;
          case "deleted":
            actionPromise = this._router[routerMode].delete(rowId);
            break;
          default:
            actionPromise = this._router[routerMode].update(dataToSend, rowId);
            break;
        }
      }
      if (actionPromise) {
        if (!actionPromise.then && (actionPromise.id === void 0 && actionPromise.tid === void 0 && actionPromise.action === void 0)) {
          throw new Error("Incorrect router return value. A Promise or a response object is expected");
        }
        if (actionPromise.then) {
          actionPromise.then(_onResolvedCreateUpdate).catch(function(error) {
            if (error && error.action) {
              _onResolvedCreateUpdate(error);
            } else {
              _onResolvedCreateUpdate({ action: "error", value: error });
            }
          });
        } else {
          _onResolvedCreateUpdate(actionPromise);
        }
      } else {
        _onResolvedCreateUpdate(null);
      }
      return;
    }
    var queryParams = { callback: function(xml) {
      var ids = [];
      if (rowId) {
        ids.push(rowId);
      } else if (dataToSend) {
        for (var key2 in dataToSend) {
          ids.push(key2);
        }
      }
      return self2.afterUpdate(self2, xml, ids);
    }, headers: self2._headers };
    var urlParams = this.serverProcessor + (this._user ? ajax.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.$scheduler.getUserData(0, "version")].join("&") : "");
    var url2 = this._applyPayload(urlParams);
    var data;
    switch (this._tMode) {
      case "GET":
        data = this._cleanupArgumentsBeforeSend(dataToSend);
        queryParams.url = url2 + ajax.urlSeparator(url2) + this.serialize(data, rowId);
        queryParams.method = "GET";
        break;
      case "POST":
        data = this._cleanupArgumentsBeforeSend(dataToSend);
        queryParams.url = url2;
        queryParams.method = "POST";
        queryParams.data = this.serialize(data, rowId);
        break;
      case "JSON":
        data = {};
        var preprocessedData = this._cleanupItemBeforeSend(dataToSend);
        for (var key in preprocessedData) {
          if (key === this.action_param || key === "id" || key === "gr_id") {
            continue;
          }
          data[key] = preprocessedData[key];
        }
        queryParams.url = url2;
        queryParams.method = "POST";
        queryParams.data = JSON.stringify({ id: rowId, action: dataToSend[this.action_param], data });
        break;
      case "REST":
      case "REST-JSON":
        url2 = urlParams.replace(/(&|\?)editing=true/, "");
        data = "";
        switch (this.getState(rowId)) {
          case "inserted":
            queryParams.method = "POST";
            queryParams.data = this.serialize(dataToSend, rowId);
            break;
          case "deleted":
            queryParams.method = "DELETE";
            url2 = url2 + (url2.slice(-1) === "/" ? "" : "/") + rowId;
            break;
          default:
            queryParams.method = "PUT";
            queryParams.data = this.serialize(dataToSend, rowId);
            url2 = url2 + (url2.slice(-1) === "/" ? "" : "/") + rowId;
            break;
        }
        queryParams.url = this._applyPayload(url2);
        break;
    }
    this._waitMode++;
    return ajax.query(queryParams);
  }, sendAllData: function() {
    if (!this.updatedRows.length || this.updateMode === "off") {
      return;
    }
    this.messages = [];
    var valid = true;
    this._forEachUpdatedRow(function(rowId) {
      valid = valid && this.checkBeforeUpdate(rowId);
    });
    if (!valid && !this.callEvent("onValidationError", ["", this.messages])) {
      return false;
    }
    if (this._tSend) {
      this._sendData(this._getAllData());
    } else {
      this._forEachUpdatedRow(function(rowId) {
        if (!this._in_progress[rowId]) {
          if (this.is_invalid(rowId)) {
            return;
          }
          this._beforeSendData(this._getRowData(rowId), rowId);
        }
      });
    }
  }, _getAllData: function(rowId) {
    var out = {};
    var has_one = false;
    this._forEachUpdatedRow(function(id2) {
      if (this._in_progress[id2] || this.is_invalid(id2)) {
        return;
      }
      var row = this._getRowData(id2);
      if (!this.callEvent("onBeforeUpdate", [id2, this.getState(id2), row])) {
        return;
      }
      out[id2] = row;
      has_one = true;
      this._in_progress[id2] = (/* @__PURE__ */ new Date()).valueOf();
    });
    return has_one ? out : null;
  }, findRow: function(pattern) {
    var i = 0;
    for (i = 0; i < this.updatedRows.length; i++)
      if (pattern == this.updatedRows[i])
        break;
    return i;
  }, defineAction: function(name, handler) {
    if (!this._uActions)
      this._uActions = {};
    this._uActions[name] = handler;
  }, afterUpdateCallback: function(sid, tid, action, btag) {
    if (!this.$scheduler) {
      return;
    }
    var marker2 = sid;
    var correct = action !== "error" && action !== "invalid";
    if (!correct) {
      this.set_invalid(sid, action);
    }
    if (this._uActions && this._uActions[action] && !this._uActions[action](btag)) {
      return delete this._in_progress[marker2];
    }
    if (this._in_progress[marker2] !== "wait") {
      this.setUpdated(sid, false);
    }
    var originalSid = sid;
    switch (action) {
      case "inserted":
      case "insert":
        if (tid != sid) {
          this.setUpdated(sid, false);
          this.$scheduler[this._methods[2]](sid, tid);
          sid = tid;
        }
        break;
      case "delete":
      case "deleted":
        this.$scheduler.setUserData(sid, this.action_param, "true_deleted");
        this.$scheduler[this._methods[3]](sid, tid);
        delete this._in_progress[marker2];
        return this.callEvent("onAfterUpdate", [sid, action, tid, btag]);
    }
    if (this._in_progress[marker2] !== "wait") {
      if (correct) {
        this.$scheduler.setUserData(sid, this.action_param, "");
      }
      delete this._in_progress[marker2];
    } else {
      delete this._in_progress[marker2];
      this.setUpdated(tid, true, this.$scheduler.getUserData(sid, this.action_param));
    }
    this.callEvent("onAfterUpdate", [originalSid, action, tid, btag]);
  }, _errorResponse: function(xml, id2) {
    if (this.$scheduler && this.$scheduler.callEvent) {
      this.$scheduler.callEvent("onSaveError", [id2, xml.xmlDoc]);
    }
    return this.cleanUpdate(id2);
  }, _setDefaultTransactionMode: function() {
    if (this.serverProcessor) {
      this.setTransactionMode("POST", true);
      this.serverProcessor += (this.serverProcessor.indexOf("?") !== -1 ? "&" : "?") + "editing=true";
      this._serverProcessor = this.serverProcessor;
    }
  }, afterUpdate: function(that, xml, id2) {
    var ajax = this.$scheduler.ajax;
    if (xml.xmlDoc.status !== 200) {
      this._errorResponse(xml, id2);
      return;
    }
    var tag;
    try {
      tag = JSON.parse(xml.xmlDoc.responseText);
    } catch (e) {
      if (!xml.xmlDoc.responseText.length) {
        tag = {};
      }
    }
    if (tag) {
      var action = tag.action || this.getState(id2) || "updated";
      var sid = tag.sid || id2[0];
      var tid = tag.tid || id2[0];
      that.afterUpdateCallback(sid, tid, action, tag);
      that.finalizeUpdate();
      return;
    }
    var top = ajax.xmltop("data", xml.xmlDoc);
    if (!top) {
      return this._errorResponse(xml, id2);
    }
    var atag = ajax.xpath("//data/action", top);
    if (!atag.length) {
      return this._errorResponse(xml, id2);
    }
    for (var i = 0; i < atag.length; i++) {
      var btag = atag[i];
      var action = btag.getAttribute("type");
      var sid = btag.getAttribute("sid");
      var tid = btag.getAttribute("tid");
      that.afterUpdateCallback(sid, tid, action, btag);
    }
    that.finalizeUpdate();
  }, cleanUpdate: function(id2) {
    if (id2)
      for (var i = 0; i < id2.length; i++)
        delete this._in_progress[id2[i]];
  }, finalizeUpdate: function() {
    if (this._waitMode)
      this._waitMode--;
    this.callEvent("onAfterUpdateFinish", []);
    if (!this.updatedRows.length)
      this.callEvent("onFullSync", []);
  }, init: function(scheduler2) {
    if (this._initialized) {
      return;
    }
    this.$scheduler = scheduler2;
    if (this.$scheduler._dp_init) {
      this.$scheduler._dp_init(this);
    }
    this._setDefaultTransactionMode();
    this._methods = this._methods || ["_set_event_text_style", "", "_dp_change_event_id", "_dp_hook_delete"];
    extendScheduler(this.$scheduler, this);
    var dataProcessorEvents = new DataProcessorEvents(this.$scheduler, this);
    dataProcessorEvents.attach();
    this.attachEvent("onDestroy", function() {
      delete this._getRowData;
      delete this.$scheduler._dp;
      delete this.$scheduler._dataprocessor;
      delete this.$scheduler._set_event_text_style;
      delete this.$scheduler._dp_change_event_id;
      delete this.$scheduler._dp_hook_delete;
      delete this.$scheduler;
      dataProcessorEvents.detach();
    });
    this.$scheduler.callEvent("onDataProcessorReady", [this]);
    this._initialized = true;
    scheduler2._dataprocessor = this;
  }, setOnAfterUpdate: function(ev) {
    this.attachEvent("onAfterUpdate", ev);
  }, setOnBeforeUpdateHandler: function(func) {
    this.attachEvent("onBeforeDataSending", func);
  }, setAutoUpdate: function(interval, user) {
    interval = interval || 2e3;
    this._user = user || (/* @__PURE__ */ new Date()).valueOf();
    this._need_update = false;
    this._update_busy = false;
    this.attachEvent("onAfterUpdate", function(sid, action, tid, xml_node) {
      this.afterAutoUpdate(sid, action, tid, xml_node);
    });
    this.attachEvent("onFullSync", function() {
      this.fullSync();
    });
    var self2 = this;
    let intervalId = global$1.setInterval(function() {
      self2.loadUpdate();
    }, interval);
    this.attachEvent("onDestroy", function() {
      clearInterval(intervalId);
    });
  }, afterAutoUpdate: function(sid, action, tid, xml_node) {
    if (action == "collision") {
      this._need_update = true;
      return false;
    } else {
      return true;
    }
  }, fullSync: function() {
    if (this._need_update) {
      this._need_update = false;
      this.loadUpdate();
    }
    return true;
  }, getUpdates: function(url2, callback) {
    var ajax = this.$scheduler.ajax;
    if (this._update_busy)
      return false;
    else
      this._update_busy = true;
    ajax.get(url2, callback);
  }, _getXmlNodeValue: function(node) {
    if (node.firstChild) {
      return node.firstChild.nodeValue;
    }
    return "";
  }, loadUpdate: function() {
    var self2 = this;
    var ajax = this.$scheduler.ajax;
    var version = this.$scheduler.getUserData(0, "version");
    var url2 = this.serverProcessor + ajax.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + version].join("&");
    url2 = url2.replace("editing=true&", "");
    this.getUpdates(url2, function(xml) {
      var vers = ajax.xpath("//userdata", xml);
      self2.$scheduler.setUserData(0, "version", self2._getXmlNodeValue(vers[0]));
      var updates = ajax.xpath("//update", xml);
      if (updates.length) {
        self2._silent_mode = true;
        for (var i = 0; i < updates.length; i++) {
          var status = updates[i].getAttribute("status");
          var id2 = updates[i].getAttribute("id");
          var parent = updates[i].getAttribute("parent");
          switch (status) {
            case "inserted":
              this.callEvent("insertCallback", [updates[i], id2, parent]);
              break;
            case "updated":
              this.callEvent("updateCallback", [updates[i], id2, parent]);
              break;
            case "deleted":
              this.callEvent("deleteCallback", [updates[i], id2, parent]);
              break;
          }
        }
        self2._silent_mode = false;
      }
      self2._update_busy = false;
      self2 = null;
    });
  }, destructor: function() {
    this.callEvent("onDestroy", []);
    this.detachAllEvents();
    this.updatedRows = [];
    this._in_progress = {};
    this._invalid = {};
    this._headers = null;
    this._payload = null;
    delete this._initialized;
  }, url: function(url2) {
    this.serverProcessor = this._serverProcessor = url2;
  }, _serializeAsJSON: function(data) {
    if (typeof data === "string") {
      return data;
    }
    var copy = this.$scheduler.utils.copy(data);
    if (this._tMode === "REST-JSON") {
      delete copy.id;
      delete copy[this.action_param];
    }
    return JSON.stringify(copy);
  }, _cleanupArgumentsBeforeSend: function(dataToSend) {
    var processedData;
    if (dataToSend[this.action_param] === void 0) {
      processedData = {};
      for (var i in dataToSend) {
        processedData[i] = this._cleanupArgumentsBeforeSend(dataToSend[i]);
      }
    } else {
      processedData = this._cleanupItemBeforeSend(dataToSend);
    }
    return processedData;
  }, _cleanupItemBeforeSend: function(updatedItem) {
    var output = null;
    if (updatedItem) {
      if (updatedItem[this.action_param] === "deleted") {
        output = {};
        output.id = updatedItem.id;
        output[this.action_param] = updatedItem[this.action_param];
      } else {
        output = updatedItem;
      }
    }
    return output;
  }, _forEachUpdatedRow: function(code) {
    var updatedRows = this.updatedRows.slice();
    for (var i = 0; i < updatedRows.length; i++) {
      var rowId = updatedRows[i];
      if (this.$scheduler.getUserData(rowId, this.action_param)) {
        code.call(this, rowId);
      }
    }
  }, _prepareItemForJson(item) {
    const processedItem = {};
    const scheduler2 = this.$scheduler;
    const copy = scheduler2.utils.copy(item);
    for (let i in copy) {
      let prop = copy[i];
      if (i.indexOf("_") === 0) {
        continue;
      } else if (prop) {
        if (prop.getUTCFullYear) {
          processedItem[i] = scheduler2._helpers.formatDate(prop);
        } else if (typeof prop == "object") {
          processedItem[i] = this._prepareItemForJson(prop);
        } else {
          processedItem[i] = prop;
        }
      } else if (prop !== void 0) {
        processedItem[i] = prop;
      }
    }
    processedItem[this.action_param] = scheduler2.getUserData(item.id, this.action_param);
    return processedItem;
  }, _prepareItemForForm(item) {
    const processedItem = {};
    const scheduler2 = this.$scheduler;
    const copy = scheduler2.utils.copy(item);
    for (var i in copy) {
      let prop = copy[i];
      if (i.indexOf("_") === 0) {
        continue;
      } else if (prop) {
        if (prop.getUTCFullYear) {
          processedItem[i] = scheduler2._helpers.formatDate(prop);
        } else if (typeof prop == "object") {
          processedItem[i] = this._prepareItemForForm(prop);
        } else {
          processedItem[i] = prop;
        }
      } else {
        processedItem[i] = "";
      }
    }
    processedItem[this.action_param] = scheduler2.getUserData(item.id, this.action_param);
    return processedItem;
  }, _prepareDataItem: function(item) {
    if (this._serializeAsJson) {
      return this._prepareItemForJson(item);
    } else {
      return this._prepareItemForForm(item);
    }
  }, _getRowData: function(id2) {
    var dataItem = this.$scheduler.getEvent(id2);
    if (!dataItem) {
      dataItem = { id: id2 };
    }
    return this._prepareDataItem(dataItem);
  } };
  function extend(scheduler2) {
    scheduler2.createDataProcessor = function(config) {
      var router;
      var tMode;
      if (config instanceof Function) {
        router = config;
      } else if (config.hasOwnProperty("router")) {
        router = config.router;
      } else if (config.hasOwnProperty("event")) {
        router = config;
      }
      if (router) {
        tMode = "CUSTOM";
      } else {
        tMode = config.mode || "REST-JSON";
      }
      var dp = new DataProcessor(config.url);
      dp.init(scheduler2);
      dp.setTransactionMode({ mode: tMode, router }, config.batchUpdate);
      return dp;
    };
    scheduler2.DataProcessor = DataProcessor;
  }
  function message(scheduler2) {
    var boxAttribute = "data-dhxbox";
    var _dhx_msg_cfg = null;
    function callback(config, result, event2) {
      var usercall = config.callback;
      if (usercall)
        usercall(result, event2);
      modalBox.hide(config.box);
      _dhx_msg_cfg = config.box = null;
    }
    function modal_key(event2) {
      if (_dhx_msg_cfg) {
        var code = event2.which || event2.keyCode;
        var preventDefault = false;
        if (messageBox.keyboard) {
          if (code == 13 || code == 32) {
            var target = event2.target || event2.srcElement;
            if (dom_helpers.getClassName(target).indexOf("scheduler_popup_button") > -1 && target.click) {
              target.click();
            } else {
              callback(_dhx_msg_cfg, true);
              preventDefault = true;
            }
          }
          if (code == 27) {
            callback(_dhx_msg_cfg, false);
            preventDefault = true;
          }
        }
        if (preventDefault) {
          if (event2.preventDefault) {
            event2.preventDefault();
          }
          return !(event2.cancelBubble = true);
        }
        return;
      }
    }
    scheduler2.event(document, "keydown", modal_key, true);
    function modality(mode) {
      if (!modality.cover) {
        modality.cover = document.createElement("div");
        scheduler2.event(modality.cover, "keydown", modal_key);
        modality.cover.className = "dhx_modal_cover";
        document.body.appendChild(modality.cover);
      }
      modality.cover.style.display = mode ? "inline-block" : "none";
    }
    function button(text, classValue, result) {
      var buttonAriaAttrs = scheduler2._waiAria.messageButtonAttrString(text);
      var name = (classValue || "").toLowerCase().replace(/ /g, "_");
      var buttonCss = `scheduler_${name}_button dhtmlx_${name}_button`;
      return `<div ${buttonAriaAttrs} class='scheduler_popup_button dhtmlx_popup_button ${buttonCss}' data-result='${result}' result='${result}' ><div>${text}</div></div>`;
    }
    function info(text) {
      if (!messageBox.area) {
        messageBox.area = document.createElement("div");
        messageBox.area.className = "scheduler_message_area dhtmlx_message_area";
        messageBox.area.style[messageBox.position] = "5px";
        document.body.appendChild(messageBox.area);
      }
      messageBox.hide(text.id);
      var message2 = document.createElement("div");
      message2.innerHTML = "<div>" + text.text + "</div>";
      message2.className = "scheduler-info dhtmlx-info scheduler-" + text.type + " dhtmlx-" + text.type;
      scheduler2.event(message2, "click", function(e) {
        if (text.callback) {
          text.callback.call(this, e);
        }
        messageBox.hide(text.id);
        text = null;
      });
      scheduler2._waiAria.messageInfoAttr(message2);
      if (messageBox.position == "bottom" && messageBox.area.firstChild)
        messageBox.area.insertBefore(message2, messageBox.area.firstChild);
      else
        messageBox.area.appendChild(message2);
      if (text.expire > 0)
        messageBox.timers[text.id] = window.setTimeout(function() {
          if (messageBox)
            messageBox.hide(text.id);
        }, text.expire);
      messageBox.pull[text.id] = message2;
      message2 = null;
      return text.id;
    }
    function getFirstDefined() {
      var values = [].slice.apply(arguments, [0]);
      for (var i = 0; i < values.length; i++) {
        if (values[i]) {
          return values[i];
        }
      }
    }
    function _boxStructure(config, ok, cancel) {
      var box = document.createElement("div");
      var contentId = utils.uid();
      scheduler2._waiAria.messageModalAttr(box, contentId);
      box.className = " scheduler_modal_box dhtmlx_modal_box scheduler-" + config.type + " dhtmlx-" + config.type;
      box.setAttribute(boxAttribute, 1);
      var inner = "";
      if (config.width)
        box.style.width = config.width;
      if (config.height)
        box.style.height = config.height;
      if (config.title)
        inner += '<div class="scheduler_popup_title dhtmlx_popup_title">' + config.title + "</div>";
      inner += '<div class="scheduler_popup_text dhtmlx_popup_text" id="' + contentId + '"><span>' + (config.content ? "" : config.text) + '</span></div><div  class="scheduler_popup_controls dhtmlx_popup_controls">';
      if (ok)
        inner += button(getFirstDefined(config.ok, scheduler2.locale.labels.message_ok, "OK"), "ok", true);
      if (cancel)
        inner += button(getFirstDefined(config.cancel, scheduler2.locale.labels.message_cancel, "Cancel"), "cancel", false);
      if (config.buttons) {
        for (var i = 0; i < config.buttons.length; i++) {
          var btn = config.buttons[i];
          if (typeof btn == "object") {
            var label = btn.label;
            var css = btn.css || "scheduler_" + btn.label.toLowerCase() + "_button dhtmlx_" + btn.label.toLowerCase() + "_button";
            var value = btn.value || i;
            inner += button(label, css, value);
          } else {
            inner += button(btn, btn, i);
          }
        }
      }
      inner += "</div>";
      box.innerHTML = inner;
      if (config.content) {
        var node = config.content;
        if (typeof node == "string")
          node = document.getElementById(node);
        if (node.style.display == "none")
          node.style.display = "";
        box.childNodes[config.title ? 1 : 0].appendChild(node);
      }
      scheduler2.event(box, "click", function(event2) {
        var source = event2.target || event2.srcElement;
        if (!source.className)
          source = source.parentNode;
        if (dom_helpers.closest(source, ".scheduler_popup_button")) {
          var result = source.getAttribute("data-result");
          result = result == "true" || (result == "false" ? false : result);
          callback(config, result, event2);
        }
      });
      config.box = box;
      if (ok || cancel)
        _dhx_msg_cfg = config;
      return box;
    }
    function _createBox(config, ok, cancel) {
      var box = config.tagName ? config : _boxStructure(config, ok, cancel);
      if (!config.hidden)
        modality(true);
      document.body.appendChild(box);
      var x = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - box.offsetWidth) / 2));
      var y = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - box.offsetHeight) / 2));
      if (config.position == "top")
        box.style.top = "-3px";
      else
        box.style.top = y + "px";
      box.style.left = x + "px";
      scheduler2.event(box, "keydown", modal_key);
      modalBox.focus(box);
      if (config.hidden)
        modalBox.hide(box);
      scheduler2.callEvent("onMessagePopup", [box]);
      return box;
    }
    function alertPopup(config) {
      return _createBox(config, true, false);
    }
    function confirmPopup(config) {
      return _createBox(config, true, true);
    }
    function boxPopup(config) {
      return _createBox(config);
    }
    function box_params(text, type, callback2) {
      if (typeof text != "object") {
        if (typeof type == "function") {
          callback2 = type;
          type = "";
        }
        text = { text, type, callback: callback2 };
      }
      return text;
    }
    function params(text, type, expire, id2, callback2) {
      if (typeof text != "object")
        text = { text, type, expire, id: id2, callback: callback2 };
      text.id = text.id || utils.uid();
      text.expire = text.expire || messageBox.expire;
      return text;
    }
    var alertBox = function() {
      var text = box_params.apply(this, arguments);
      text.type = text.type || "confirm";
      return alertPopup(text);
    };
    var confirmBox = function() {
      var text = box_params.apply(this, arguments);
      text.type = text.type || "alert";
      return confirmPopup(text);
    };
    var modalBox = function() {
      var text = box_params.apply(this, arguments);
      text.type = text.type || "alert";
      return boxPopup(text);
    };
    modalBox.hide = function(node) {
      while (node && node.getAttribute && !node.getAttribute(boxAttribute))
        node = node.parentNode;
      if (node) {
        node.parentNode.removeChild(node);
        modality(false);
        scheduler2.callEvent("onAfterMessagePopup", [node]);
      }
    };
    modalBox.focus = function(node) {
      setTimeout(function() {
        var focusable = dom_helpers.getFocusableNodes(node);
        if (focusable.length) {
          if (focusable[0].focus)
            focusable[0].focus();
        }
      }, 1);
    };
    var messageBox = function(text, type, expire, id2) {
      text = params.apply(this, arguments);
      text.type = text.type || "info";
      var subtype = text.type.split("-")[0];
      switch (subtype) {
        case "alert":
          return alertPopup(text);
        case "confirm":
          return confirmPopup(text);
        case "modalbox":
          return boxPopup(text);
        default:
          return info(text);
      }
    };
    messageBox.seed = (/* @__PURE__ */ new Date()).valueOf();
    messageBox.uid = utils.uid;
    messageBox.expire = 4e3;
    messageBox.keyboard = true;
    messageBox.position = "top";
    messageBox.pull = {};
    messageBox.timers = {};
    messageBox.hideAll = function() {
      for (var key in messageBox.pull)
        messageBox.hide(key);
    };
    messageBox.hide = function(id2) {
      var obj = messageBox.pull[id2];
      if (obj && obj.parentNode) {
        window.setTimeout(function() {
          obj.parentNode.removeChild(obj);
          obj = null;
        }, 2e3);
        obj.className += " hidden";
        if (messageBox.timers[id2])
          window.clearTimeout(messageBox.timers[id2]);
        delete messageBox.pull[id2];
      }
    };
    var popups = [];
    scheduler2.attachEvent("onMessagePopup", function(box) {
      popups.push(box);
    });
    scheduler2.attachEvent("onAfterMessagePopup", function(box) {
      for (var i = 0; i < popups.length; i++) {
        if (popups[i] === box) {
          popups.splice(i, 1);
          i--;
        }
      }
    });
    scheduler2.attachEvent("onDestroy", function() {
      if (modality.cover && modality.cover.parentNode) {
        modality.cover.parentNode.removeChild(modality.cover);
      }
      for (var i = 0; i < popups.length; i++) {
        if (popups[i].parentNode) {
          popups[i].parentNode.removeChild(popups[i]);
        }
      }
      popups = null;
      if (messageBox.area && messageBox.area.parentNode) {
        messageBox.area.parentNode.removeChild(messageBox.area);
      }
      messageBox = null;
    });
    return { alert: alertBox, confirm: confirmBox, message: messageBox, modalbox: modalBox };
  }
  const ar = { date: { month_full: ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"], month_short: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], day_full: ["الأحد", "الأثنين", "ألثلاثاء", "الأربعاء", "ألحميس", "ألجمعة", "السبت"], day_short: ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"] }, labels: { dhx_cal_today_button: "اليوم", day_tab: "يوم", week_tab: "أسبوع", month_tab: "شهر", new_event: "حدث جديد", icon_save: "اخزن", icon_cancel: "الغاء", icon_details: "تفاصيل", icon_edit: "تحرير", icon_delete: "حذف", confirm_closing: "التغييرات سوف تضيع, هل انت متأكد؟", confirm_deleting: "الحدث سيتم حذفها نهائيا ، هل أنت متأكد؟", section_description: "الوصف", section_time: "الفترة الزمنية", full_day: "طوال اليوم", confirm_recurring: "هل تريد تحرير مجموعة كاملة من الأحداث المتكررة؟", section_recurring: "تكرار الحدث", button_recurring: "تعطيل", button_recurring_open: "تمكين", button_edit_series: "تحرير سلسلة", button_edit_occurrence: "تعديل نسخة", button_edit_occurrence_and_following: "This and following events", grid_tab: "جدول", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "يومي", repeat_radio_week: "أسبوعي", repeat_radio_month: "شهري", repeat_radio_year: "سنوي", repeat_radio_day_type: "كل", repeat_text_day_count: "يوم", repeat_radio_day_type2: "كل يوم عمل", repeat_week: " تكرار كل", repeat_text_week_count: "أسبوع في الأيام التالية:", repeat_radio_month_type: "تكرار", repeat_radio_month_start: "في", repeat_text_month_day: "يوم كل", repeat_text_month_count: "شهر", repeat_text_month_count2_before: "كل", repeat_text_month_count2_after: "شهر", repeat_year_label: "في", select_year_day2: "من", repeat_text_year_day: "يوم", select_year_month: "شهر", repeat_radio_end: "بدون تاريخ انتهاء", repeat_text_occurrences_count: "تكرارات", repeat_radio_end2: "بعد", repeat_radio_end3: "ينتهي في", repeat_never: "أبداً", repeat_daily: "كل يوم", repeat_workdays: "كل يوم عمل", repeat_weekly: "كل أسبوع", repeat_monthly: "كل شهر", repeat_yearly: "كل سنة", repeat_custom: "تخصيص", repeat_freq_day: "يوم", repeat_freq_week: "أسبوع", repeat_freq_month: "شهر", repeat_freq_year: "سنة", repeat_on_date: "في التاريخ", repeat_ends: "ينتهي", month_for_recurring: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], day_for_recurring: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] } };
  const be = { date: { month_full: ["Студзень", "Люты", "Сакавік", "Красавік", "Maй", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"], month_short: ["Студз", "Лют", "Сак", "Крас", "Maй", "Чэр", "Ліп", "Жнів", "Вер", "Каст", "Ліст", "Снеж"], day_full: ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"], day_short: ["Нд", "Пн", "Аўт", "Ср", "Чцв", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сёння", day_tab: "Дзень", week_tab: "Тыдзень", month_tab: "Месяц", new_event: "Новая падзея", icon_save: "Захаваць", icon_cancel: "Адмяніць", icon_details: "Дэталі", icon_edit: "Змяніць", icon_delete: "Выдаліць", confirm_closing: "", confirm_deleting: "Падзея будзе выдалена незваротна, працягнуць?", section_description: "Апісанне", section_time: "Перыяд часу", full_day: "Увесь дзень", confirm_recurring: "Вы хочаце змяніць усю серыю паўтаральных падзей?", section_recurring: "Паўтарэнне", button_recurring: "Адключана", button_recurring_open: "Уключана", button_edit_series: "Рэдагаваць серыю", button_edit_occurrence: "Рэдагаваць асобнік", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Спіс", date: "Дата", description: "Апісанне", year_tab: "Год", week_agenda_tab: "Спіс", grid_tab: "Спic", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Дзень", repeat_radio_week: "Тыдзень", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Кожны", repeat_text_day_count: "дзень", repeat_radio_day_type2: "Кожны працоўны дзень", repeat_week: " Паўтараць кожны", repeat_text_week_count: "тыдзень", repeat_radio_month_type: "Паўтараць", repeat_radio_month_start: "", repeat_text_month_day: " чысла кожнага", repeat_text_month_count: "месяцу", repeat_text_month_count2_before: "кожны ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "дзень", select_year_month: "", repeat_radio_end: "Без даты заканчэння", repeat_text_occurrences_count: "паўтораў", repeat_radio_end2: "", repeat_radio_end3: "Да ", repeat_never: "Ніколі", repeat_daily: "Кожны дзень", repeat_workdays: "Кожны працоўны дзень", repeat_weekly: "Кожны тыдзень", repeat_monthly: "Кожны месяц", repeat_yearly: "Кожны год", repeat_custom: "Наладжвальны", repeat_freq_day: "Дзень", repeat_freq_week: "Тыдзень", repeat_freq_month: "Месяц", repeat_freq_year: "Год", repeat_on_date: "На дату", repeat_ends: "Заканчваецца", month_for_recurring: ["Студзеня", "Лютага", "Сакавіка", "Красавіка", "Мая", "Чэрвеня", "Ліпeня", "Жніўня", "Верасня", "Кастрычніка", "Лістапада", "Снежня"], day_for_recurring: ["Нядзелю", "Панядзелак", "Аўторак", "Сераду", "Чацвер", "Пятніцу", "Суботу"] } };
  const ca = { date: { month_full: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], month_short: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"], day_full: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"], day_short: ["Dg", "Dl", "Dm", "Dc", "Dj", "Dv", "Ds"] }, labels: { dhx_cal_today_button: "Hui", day_tab: "Dia", week_tab: "Setmana", month_tab: "Mes", new_event: "Nou esdeveniment", icon_save: "Guardar", icon_cancel: "Cancel·lar", icon_details: "Detalls", icon_edit: "Editar", icon_delete: "Esborrar", confirm_closing: "", confirm_deleting: "L'esdeveniment s'esborrarà definitivament, continuar ?", section_description: "Descripció", section_time: "Periode de temps", full_day: "Tot el dia", confirm_recurring: "¿Desitja modificar el conjunt d'esdeveniments repetits?", section_recurring: "Repeteixca l'esdeveniment", button_recurring: "Impedit", button_recurring_open: "Permés", button_edit_series: "Edit sèrie", button_edit_occurrence: "Edita Instància", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Descripció", year_tab: "Any", week_agenda_tab: "Agenda", grid_tab: "Taula", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diari", repeat_radio_week: "Setmanal", repeat_radio_month: "Mensual", repeat_radio_year: "Anual", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia", repeat_radio_day_type2: "Cada dia laborable", repeat_week: " Repetir cada", repeat_text_week_count: "setmana els dies següents:", repeat_radio_month_type: "Repetir", repeat_radio_month_start: "El", repeat_text_month_day: "dia cada", repeat_text_month_count: "mes", repeat_text_month_count2_before: "cada", repeat_text_month_count2_after: "mes", repeat_year_label: "El", select_year_day2: "de", repeat_text_year_day: "dia", select_year_month: "mes", repeat_radio_end: "Sense data de finalització", repeat_text_occurrences_count: "ocurrències", repeat_radio_end2: "Després", repeat_radio_end3: "Finalitzar el", repeat_never: "Mai", repeat_daily: "Cada dia", repeat_workdays: "Cada dia laborable", repeat_weekly: "Cada setmana", repeat_monthly: "Cada mes", repeat_yearly: "Cada any", repeat_custom: "Personalitzat", repeat_freq_day: "Dia", repeat_freq_week: "Setmana", repeat_freq_month: "Mes", repeat_freq_year: "Any", repeat_on_date: "En la data", repeat_ends: "Finalitza", month_for_recurring: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], day_for_recurring: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"] } };
  const cn = { date: { month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], day_short: ["日", "一", "二", "三", "四", "五", "六"] }, labels: { dhx_cal_today_button: "今天", day_tab: "日", week_tab: "周", month_tab: "月", new_event: "新建日程", icon_save: "保存", icon_cancel: "关闭", icon_details: "详细", icon_edit: "编辑", icon_delete: "删除", confirm_closing: "请确认是否撤销修改!", confirm_deleting: "是否删除日程?", section_description: "描述", section_time: "时间范围", full_day: "整天", confirm_recurring: "请确认是否将日程设为重复模式?", section_recurring: "重复周期", button_recurring: "禁用", button_recurring_open: "启用", button_edit_series: "编辑系列", button_edit_occurrence: "编辑实例", button_edit_occurrence_and_following: "This and following events", agenda_tab: "议程", date: "日期", description: "说明", year_tab: "今年", week_agenda_tab: "议程", grid_tab: "电网", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "按天", repeat_radio_week: "按周", repeat_radio_month: "按月", repeat_radio_year: "按年", repeat_radio_day_type: "每", repeat_text_day_count: "天", repeat_radio_day_type2: "每个工作日", repeat_week: " 重复 每", repeat_text_week_count: "星期的:", repeat_radio_month_type: "重复", repeat_radio_month_start: "在", repeat_text_month_day: "日 每", repeat_text_month_count: "月", repeat_text_month_count2_before: "每", repeat_text_month_count2_after: "月", repeat_year_label: "在", select_year_day2: "的", repeat_text_year_day: "日", select_year_month: "月", repeat_radio_end: "无结束日期", repeat_text_occurrences_count: "次结束", repeat_radio_end2: "重复", repeat_radio_end3: "结束于", repeat_never: "从不", repeat_daily: "每天", repeat_workdays: "每个工作日", repeat_weekly: "每周", repeat_monthly: "每月", repeat_yearly: "每年", repeat_custom: "自定义", repeat_freq_day: "天", repeat_freq_week: "周", repeat_freq_month: "月", repeat_freq_year: "年", repeat_on_date: "在日期", repeat_ends: "结束", month_for_recurring: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], day_for_recurring: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] } };
  const cs = { date: { month_full: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], month_short: ["Led", "Ún", "Bře", "Dub", "Kvě", "Čer", "Čec", "Srp", "Září", "Říj", "List", "Pro"], day_full: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"], day_short: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Den", week_tab: "Týden", month_tab: "Měsíc", new_event: "Nová událost", icon_save: "Uložit", icon_cancel: "Zpět", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Smazat", confirm_closing: "", confirm_deleting: "Událost bude trvale smazána, opravdu?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Přejete si upravit celou řadu opakovaných událostí?", section_recurring: "Opakování události", button_recurring: "Vypnuto", button_recurring_open: "Zapnuto", button_edit_series: "Edit series", button_edit_occurrence: "Upravit instance", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Program", date: "Datum", description: "Poznámka", year_tab: "Rok", full_day: "Full day", week_agenda_tab: "Program", grid_tab: "Mřížka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denně", repeat_radio_week: "Týdně", repeat_radio_month: "Měsíčně", repeat_radio_year: "Ročně", repeat_radio_day_type: "každý", repeat_text_day_count: "Den", repeat_radio_day_type2: "pracovní dny", repeat_week: "Opakuje každých", repeat_text_week_count: "Týdnů na:", repeat_radio_month_type: "u každého", repeat_radio_month_start: "na", repeat_text_month_day: "Den každého", repeat_text_month_count: "Měsíc", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "Měsíc", repeat_year_label: "na", select_year_day2: "v", repeat_text_year_day: "Den v", select_year_month: "", repeat_radio_end: "bez data ukončení", repeat_text_occurrences_count: "Události", repeat_radio_end2: "po", repeat_radio_end3: "Konec", repeat_never: "Nikdy", repeat_daily: "Každý den", repeat_workdays: "Každý pracovní den", repeat_weekly: "Každý týden", repeat_monthly: "Každý měsíc", repeat_yearly: "Každý rok", repeat_custom: "Vlastní", repeat_freq_day: "Den", repeat_freq_week: "Týden", repeat_freq_month: "Měsíc", repeat_freq_year: "Rok", repeat_on_date: "Na datum", repeat_ends: "Končí", month_for_recurring: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], day_for_recurring: ["Neděle ", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"] } };
  const da = { date: { month_full: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uge", month_tab: "Måned", new_event: "Ny begivenhed", icon_save: "Gem", icon_cancel: "Fortryd", icon_details: "Detaljer", icon_edit: "Tilret", icon_delete: "Slet", confirm_closing: "Dine rettelser vil gå tabt.. Er dy sikker?", confirm_deleting: "Bigivenheden vil blive slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du tilrette hele serien af gentagne begivenheder?", section_recurring: "Gentag begivenhed", button_recurring: "Frakoblet", button_recurring_open: "Tilkoblet", button_edit_series: "Rediger serien", button_edit_occurrence: "Rediger en kopi", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Dagsorden", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Dagsorden", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ugenlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "På hver arbejdsdag", repeat_week: " Gentager sig hver", repeat_text_week_count: "uge på følgende dage:", repeat_radio_month_type: "Hver den", repeat_radio_month_start: "Den", repeat_text_month_day: " i hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen slutdato", repeat_text_occurrences_count: "gentagelse", repeat_radio_end2: "Efter", repeat_radio_end3: "Slut", repeat_never: "Aldrig", repeat_daily: "Hver dag", repeat_workdays: "Hver hverdag", repeat_weekly: "Hver uge", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Brugerdefineret", repeat_freq_day: "Dag", repeat_freq_week: "Uge", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } };
  const de = { date: { month_full: [" Januar", " Februar", " März ", " April", " Mai", " Juni", " Juli", " August", " September ", " Oktober", " November ", " Dezember"], month_short: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], day_full: ["Sonntag", "Montag", "Dienstag", " Mittwoch", " Donnerstag", "Freitag", "Samstag"], day_short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"] }, labels: { dhx_cal_today_button: "Heute", day_tab: "Tag", week_tab: "Woche", month_tab: "Monat", new_event: "neuer Eintrag", icon_save: "Speichern", icon_cancel: "Abbrechen", icon_details: "Details", icon_edit: "Ändern", icon_delete: "Löschen", confirm_closing: "", confirm_deleting: "Der Eintrag wird gelöscht", section_description: "Beschreibung", section_time: "Zeitspanne", full_day: "Ganzer Tag", confirm_recurring: "Wollen Sie alle Einträge bearbeiten oder nur diesen einzelnen Eintrag?", section_recurring: "Wiederholung", button_recurring: "Aus", button_recurring_open: "An", button_edit_series: "Bearbeiten Sie die Serie", button_edit_occurrence: "Bearbeiten Sie eine Kopie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Datum", description: "Beschreibung", year_tab: "Jahre", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Täglich", repeat_radio_week: "Wöchentlich", repeat_radio_month: "Monatlich", repeat_radio_year: "Jährlich", repeat_radio_day_type: "jeden", repeat_text_day_count: "Tag", repeat_radio_day_type2: "an jedem Arbeitstag", repeat_week: " Wiederholt sich jede", repeat_text_week_count: "Woche am:", repeat_radio_month_type: "an jedem", repeat_radio_month_start: "am", repeat_text_month_day: "Tag eines jeden", repeat_text_month_count: "Monats", repeat_text_month_count2_before: "jeden", repeat_text_month_count2_after: "Monats", repeat_year_label: "am", select_year_day2: "im", repeat_text_year_day: "Tag im", select_year_month: "", repeat_radio_end: "kein Enddatum", repeat_text_occurrences_count: "Ereignissen", repeat_radio_end3: "Schluß", repeat_radio_end2: "nach", repeat_never: "Nie", repeat_daily: "Jeden Tag", repeat_workdays: "Jeden Werktag", repeat_weekly: "Jede Woche", repeat_monthly: "Jeden Monat", repeat_yearly: "Jedes Jahr", repeat_custom: "Benutzerdefiniert", repeat_freq_day: "Tag", repeat_freq_week: "Woche", repeat_freq_month: "Monat", repeat_freq_year: "Jahr", repeat_on_date: "Am Datum", repeat_ends: "Endet", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"] } };
  const el = { date: { month_full: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], month_short: ["ΙΑΝ", "ΦΕΒ", "ΜΑΡ", "ΑΠΡ", "ΜΑΙ", "ΙΟΥΝ", "ΙΟΥΛ", "ΑΥΓ", "ΣΕΠ", "ΟΚΤ", "ΝΟΕ", "ΔΕΚ"], day_full: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"], day_short: ["ΚΥ", "ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ"] }, labels: { dhx_cal_today_button: "Σήμερα", day_tab: "Ημέρα", week_tab: "Εβδομάδα", month_tab: "Μήνας", new_event: "Νέο έργο", icon_save: "Αποθήκευση", icon_cancel: "Άκυρο", icon_details: "Λεπτομέρειες", icon_edit: "Επεξεργασία", icon_delete: "Διαγραφή", confirm_closing: "", confirm_deleting: "Το έργο θα διαγραφεί οριστικά. Θέλετε να συνεχίσετε;", section_description: "Περιγραφή", section_time: "Χρονική περίοδος", full_day: "Πλήρης Ημέρα", confirm_recurring: "Θέλετε να επεξεργασθείτε ολόκληρη την ομάδα των επαναλαμβανόμενων έργων;", section_recurring: "Επαναλαμβανόμενο έργο", button_recurring: "Ανενεργό", button_recurring_open: "Ενεργό", button_edit_series: "Επεξεργαστείτε τη σειρά", button_edit_occurrence: "Επεξεργασία ένα αντίγραφο", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Ημερήσια Διάταξη", date: "Ημερομηνία", description: "Περιγραφή", year_tab: "Έτος", week_agenda_tab: "Ημερήσια Διάταξη", grid_tab: "Πλέγμα", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Ημερησίως", repeat_radio_week: "Εβδομαδιαίως", repeat_radio_month: "Μηνιαίως", repeat_radio_year: "Ετησίως", repeat_radio_day_type: "Κάθε", repeat_text_day_count: "ημέρα", repeat_radio_day_type2: "Κάθε εργάσιμη", repeat_week: " Επανάληψη κάθε", repeat_text_week_count: "εβδομάδα τις επόμενες ημέρες:", repeat_radio_month_type: "Επανάληψη", repeat_radio_month_start: "Την", repeat_text_month_day: "ημέρα κάθε", repeat_text_month_count: "μήνα", repeat_text_month_count2_before: "κάθε", repeat_text_month_count2_after: "μήνα", repeat_year_label: "Την", select_year_day2: "του", repeat_text_year_day: "ημέρα", select_year_month: "μήνα", repeat_radio_end: "Χωρίς ημερομηνία λήξεως", repeat_text_occurrences_count: "επαναλήψεις", repeat_radio_end3: "Λήγει την", repeat_radio_end2: "Μετά από", repeat_never: "Ποτέ", repeat_daily: "Κάθε μέρα", repeat_workdays: "Κάθε εργάσιμη μέρα", repeat_weekly: "Κάθε εβδομάδα", repeat_monthly: "Κάθε μήνα", repeat_yearly: "Κάθε χρόνο", repeat_custom: "Προσαρμοσμένο", repeat_freq_day: "Ημέρα", repeat_freq_week: "Εβδομάδα", repeat_freq_month: "Μήνας", repeat_freq_year: "Χρόνος", repeat_on_date: "Σε ημερομηνία", repeat_ends: "Λήγει", month_for_recurring: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], day_for_recurring: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"] } };
  const en = { date: { month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }, labels: { dhx_cal_today_button: "Today", day_tab: "Day", week_tab: "Week", month_tab: "Month", new_event: "New event", icon_save: "Save", icon_cancel: "Cancel", icon_details: "Details", icon_edit: "Edit", icon_delete: "Delete", confirm_closing: "", confirm_deleting: "Event will be deleted permanently, are you sure?", section_description: "Description", section_time: "Time period", full_day: "Full day", confirm_recurring: "Edit recurring event", section_recurring: "Repeat event", button_recurring: "Disabled", button_recurring_open: "Enabled", button_edit_series: "All events", button_edit_occurrence: "This event", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Date", description: "Description", year_tab: "Year", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daily", repeat_radio_week: "Weekly", repeat_radio_month: "Monthly", repeat_radio_year: "Yearly", repeat_radio_day_type: "Every", repeat_text_day_count: "day", repeat_radio_day_type2: "Every workday", repeat_week: " Repeat every", repeat_text_week_count: "week next days:", repeat_radio_month_type: "Repeat", repeat_radio_month_start: "On", repeat_text_month_day: "day every", repeat_text_month_count: "month", repeat_text_month_count2_before: "every", repeat_text_month_count2_after: "month", repeat_year_label: "On", select_year_day2: "of", repeat_text_year_day: "day", select_year_month: "month", repeat_radio_end: "No end date", repeat_text_occurrences_count: "occurrences", repeat_radio_end2: "After", repeat_radio_end3: "End by", repeat_never: "Never", repeat_daily: "Every day", repeat_workdays: "Every weekday", repeat_weekly: "Every week", repeat_monthly: "Every month", repeat_yearly: "Every year", repeat_custom: "Custom", repeat_freq_day: "Day", repeat_freq_week: "Week", repeat_freq_month: "Month", repeat_freq_year: "Year", repeat_on_date: "On date", repeat_ends: "Ends", month_for_recurring: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] } };
  const es = { date: { month_full: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], month_short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], day_full: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], day_short: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] }, labels: { dhx_cal_today_button: "Hoy", day_tab: "Día", week_tab: "Semana", month_tab: "Mes", new_event: "Nuevo evento", icon_save: "Guardar", icon_cancel: "Cancelar", icon_details: "Detalles", icon_edit: "Editar", icon_delete: "Eliminar", confirm_closing: "", confirm_deleting: "El evento se borrará definitivamente, ¿continuar?", section_description: "Descripción", section_time: "Período", full_day: "Todo el día", confirm_recurring: "¿Desea modificar el conjunto de eventos repetidos?", section_recurring: "Repita el evento", button_recurring: "Impedido", button_recurring_open: "Permitido", button_edit_series: "Editar la serie", button_edit_occurrence: "Editar este evento", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Día", date: "Fecha", description: "Descripción", year_tab: "Año", week_agenda_tab: "Día", grid_tab: "Reja", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diariamente", repeat_radio_week: "Semanalmente", repeat_radio_month: "Mensualmente", repeat_radio_year: "Anualmente", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia", repeat_radio_day_type2: "Cada jornada de trabajo", repeat_week: " Repetir cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repita", repeat_radio_month_start: "El", repeat_text_month_day: "dia cada ", repeat_text_month_count: "mes", repeat_text_month_count2_before: "cada", repeat_text_month_count2_after: "mes", repeat_year_label: "El", select_year_day2: "del", repeat_text_year_day: "dia", select_year_month: "mes", repeat_radio_end: "Sin fecha de finalización", repeat_text_occurrences_count: "ocurrencias", repeat_radio_end3: "Fin", repeat_radio_end2: "Después de", repeat_never: "Nunca", repeat_daily: "Cada día", repeat_workdays: "Cada día laborable", repeat_weekly: "Cada semana", repeat_monthly: "Cada mes", repeat_yearly: "Cada año", repeat_custom: "Personalizado", repeat_freq_day: "Día", repeat_freq_week: "Semana", repeat_freq_month: "Mes", repeat_freq_year: "Año", repeat_on_date: "En la fecha", repeat_ends: "Termina", month_for_recurring: ["Enero", "Febrero", "Маrzo", "Аbril", "Mayo", "Junio", "Julio", "Аgosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"], day_for_recurring: ["Domingo", "Lunes", "Martes", "Miércoles", "Jeuves", "Viernes", "Sabado"] } };
  const fi = { date: { month_full: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], month_short: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou"], day_full: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"], day_short: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"] }, labels: { dhx_cal_today_button: "Tänään", day_tab: "Päivä", week_tab: "Viikko", month_tab: "Kuukausi", new_event: "Uusi tapahtuma", icon_save: "Tallenna", icon_cancel: "Peru", icon_details: "Tiedot", icon_edit: "Muokkaa", icon_delete: "Poista", confirm_closing: "", confirm_deleting: "Haluatko varmasti poistaa tapahtuman?", section_description: "Kuvaus", section_time: "Aikajakso", full_day: "Koko päivä", confirm_recurring: "Haluatko varmasti muokata toistuvan tapahtuman kaikkia jaksoja?", section_recurring: "Toista tapahtuma", button_recurring: "Ei k&auml;yt&ouml;ss&auml;", button_recurring_open: "K&auml;yt&ouml;ss&auml;", button_edit_series: "Muokkaa sarja", button_edit_occurrence: "Muokkaa kopio", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Esityslista", date: "Päivämäärä", description: "Kuvaus", year_tab: "Vuoden", week_agenda_tab: "Esityslista", grid_tab: "Ritilä", drag_to_create: "Luo uusi vetämällä", drag_to_move: "Siirrä vetämällä", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "P&auml;ivitt&auml;in", repeat_radio_week: "Viikoittain", repeat_radio_month: "Kuukausittain", repeat_radio_year: "Vuosittain", repeat_radio_day_type: "Joka", repeat_text_day_count: "p&auml;iv&auml;", repeat_radio_day_type2: "Joka arkip&auml;iv&auml;", repeat_week: "Toista joka", repeat_text_week_count: "viikko n&auml;in&auml; p&auml;ivin&auml;:", repeat_radio_month_type: "Toista", repeat_radio_month_start: "", repeat_text_month_day: "p&auml;iv&auml;n&auml; joka", repeat_text_month_count: "kuukausi", repeat_text_month_count2_before: "joka", repeat_text_month_count2_after: "kuukausi", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "p&auml;iv&auml;", select_year_month: "kuukausi", repeat_radio_end: "Ei loppumisaikaa", repeat_text_occurrences_count: "Toiston j&auml;lkeen", repeat_radio_end3: "Loppuu", repeat_radio_end2: "", repeat_never: "Ei koskaan", repeat_daily: "Joka päivä", repeat_workdays: "Joka arkipäivä", repeat_weekly: "Joka viikko", repeat_monthly: "Joka kuukausi", repeat_yearly: "Joka vuosi", repeat_custom: "Mukautettu", repeat_freq_day: "Päivä", repeat_freq_week: "Viikko", repeat_freq_month: "Kuukausi", repeat_freq_year: "Vuosi", repeat_on_date: "Tiettynä päivänä", repeat_ends: "Päättyy", month_for_recurring: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], day_for_recurring: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"] } };
  const fr = { date: { month_full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], month_short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"], day_full: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"], day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"] }, labels: { dhx_cal_today_button: "Aujourd'hui", day_tab: "Jour", week_tab: "Semaine", month_tab: "Mois", new_event: "Nouvel événement", icon_save: "Enregistrer", icon_cancel: "Annuler", icon_details: "Détails", icon_edit: "Modifier", icon_delete: "Effacer", confirm_closing: "", confirm_deleting: "L'événement sera effacé sans appel, êtes-vous sûr ?", section_description: "Description", section_time: "Période", full_day: "Journée complète", confirm_recurring: "Voulez-vous éditer toute une série d'évènements répétés?", section_recurring: "Périodicité", button_recurring: "Désactivé", button_recurring_open: "Activé", button_edit_series: "Modifier la série", button_edit_occurrence: "Modifier une copie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Jour", date: "Date", description: "Description", year_tab: "Année", week_agenda_tab: "Jour", grid_tab: "Grille", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidienne", repeat_radio_week: "Hebdomadaire", repeat_radio_month: "Mensuelle", repeat_radio_year: "Annuelle", repeat_radio_day_type: "Chaque", repeat_text_day_count: "jour", repeat_radio_day_type2: "Chaque journée de travail", repeat_week: " Répéter toutes les", repeat_text_week_count: "semaine:", repeat_radio_month_type: "Répéter", repeat_radio_month_start: "Le", repeat_text_month_day: "jour chaque", repeat_text_month_count: "mois", repeat_text_month_count2_before: "chaque", repeat_text_month_count2_after: "mois", repeat_year_label: "Le", select_year_day2: "du", repeat_text_year_day: "jour", select_year_month: "mois", repeat_radio_end: "Pas de date d&quot;achèvement", repeat_text_occurrences_count: "occurrences", repeat_radio_end3: "Fin", repeat_radio_end2: "Après", repeat_never: "Jamais", repeat_daily: "Chaque jour", repeat_workdays: "Chaque jour ouvrable", repeat_weekly: "Chaque semaine", repeat_monthly: "Chaque mois", repeat_yearly: "Chaque année", repeat_custom: "Personnalisé", repeat_freq_day: "Jour", repeat_freq_week: "Semaine", repeat_freq_month: "Mois", repeat_freq_year: "Année", repeat_on_date: "À la date", repeat_ends: "Se termine", month_for_recurring: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], day_for_recurring: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"] } };
  const he = { date: { month_full: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], month_short: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"], day_full: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"], day_short: ["א", "ב", "ג", "ד", "ה", "ו", "ש"] }, labels: { dhx_cal_today_button: "היום", day_tab: "יום", week_tab: "שבוע", month_tab: "חודש", new_event: "ארוע חדש", icon_save: "שמור", icon_cancel: "בטל", icon_details: "פרטים", icon_edit: "ערוך", icon_delete: "מחק", confirm_closing: "", confirm_deleting: "ארוע ימחק סופית.להמשיך?", section_description: "תיאור", section_time: "תקופה", confirm_recurring: "האם ברצונך לשנות כל סדרת ארועים מתמשכים?", section_recurring: "להעתיק ארוע", button_recurring: "לא פעיל", button_recurring_open: "פעיל", full_day: "יום שלם", button_edit_series: "ערוך את הסדרה", button_edit_occurrence: "עריכת עותק", button_edit_occurrence_and_following: "This and following events", agenda_tab: "סדר יום", date: "תאריך", description: "תיאור", year_tab: "לשנה", week_agenda_tab: "סדר יום", grid_tab: "סורג", drag_to_create: "Drag to create", drag_to_move: "גרור כדי להזיז", message_ok: "OK", message_cancel: "בטל", next: "הבא", prev: "הקודם", year: "שנה", month: "חודש", day: "יום", hour: "שעה", minute: "דקה", repeat_radio_day: "יומי", repeat_radio_week: "שבועי", repeat_radio_month: "חודשי", repeat_radio_year: "שנתי", repeat_radio_day_type: "חזור כל", repeat_text_day_count: "ימים", repeat_radio_day_type2: "חזור כל יום עבודה", repeat_week: " חזור כל", repeat_text_week_count: "שבוע לפי ימים:", repeat_radio_month_type: "חזור כל", repeat_radio_month_start: "כל", repeat_text_month_day: "ימים כל", repeat_text_month_count: "חודשים", repeat_text_month_count2_before: "חזור כל", repeat_text_month_count2_after: "חודש", repeat_year_label: "כל", select_year_day2: "בחודש", repeat_text_year_day: "ימים", select_year_month: "חודש", repeat_radio_end: "לעולם לא מסתיים", repeat_text_occurrences_count: "אירועים", repeat_radio_end3: "מסתיים ב", repeat_radio_end2: "אחרי", repeat_never: "אף פעם", repeat_daily: "כל יום", repeat_workdays: "כל יום עבודה", repeat_weekly: "כל שבוע", repeat_monthly: "כל חודש", repeat_yearly: "כל שנה", repeat_custom: "מותאם אישית", repeat_freq_day: "יום", repeat_freq_week: "שבוע", repeat_freq_month: "חודש", repeat_freq_year: "שנה", repeat_on_date: "בתאריך", repeat_ends: "מסתיים", month_for_recurring: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], day_for_recurring: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"] } };
  const hu = { date: { month_full: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"], month_short: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Vasárnap", "Hétfõ", "Kedd", "Szerda", "Csütörtök", "Péntek", "szombat"], day_short: ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"] }, labels: { dhx_cal_today_button: "Ma", day_tab: "Nap", week_tab: "Hét", month_tab: "Hónap", new_event: "Új esemény", icon_save: "Mentés", icon_cancel: "Mégse", icon_details: "Részletek", icon_edit: "Szerkesztés", icon_delete: "Törlés", confirm_closing: "", confirm_deleting: "Az esemény törölve lesz, biztosan folytatja?", section_description: "Leírás", section_time: "Idõszak", full_day: "Egesz napos", confirm_recurring: "Biztosan szerkeszteni akarod az összes ismétlõdõ esemény beállítását?", section_recurring: "Esemény ismétlése", button_recurring: "Tiltás", button_recurring_open: "Engedélyezés", button_edit_series: "Edit series", button_edit_occurrence: "Szerkesztés bíróság", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Napirend", date: "Dátum", description: "Leírás", year_tab: "Év", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Napi", repeat_radio_week: "Heti", repeat_radio_month: "Havi", repeat_radio_year: "Éves", repeat_radio_day_type: "Minden", repeat_text_day_count: "nap", repeat_radio_day_type2: "Minden munkanap", repeat_week: " Ismételje meg minden", repeat_text_week_count: "héten a következő napokon:", repeat_radio_month_type: "Ismétlés", repeat_radio_month_start: "Ekkor", repeat_text_month_day: "nap minden", repeat_text_month_count: "hónapban", repeat_text_month_count2_before: "minden", repeat_text_month_count2_after: "hónapban", repeat_year_label: "Ekkor", select_year_day2: "-án/-én", repeat_text_year_day: "nap", select_year_month: "hónap", repeat_radio_end: "Nincs befejezési dátum", repeat_text_occurrences_count: "esemény", repeat_radio_end2: "Után", repeat_radio_end3: "Befejező dátum", repeat_never: "Soha", repeat_daily: "Minden nap", repeat_workdays: "Minden munkanap", repeat_weekly: "Minden héten", repeat_monthly: "Minden hónapban", repeat_yearly: "Minden évben", repeat_custom: "Egyedi", repeat_freq_day: "Nap", repeat_freq_week: "Hét", repeat_freq_month: "Hónap", repeat_freq_year: "Év", repeat_on_date: "Dátum szerint", repeat_ends: "Befejeződik", month_for_recurring: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"], day_for_recurring: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"] } };
  const id = { date: { month_full: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"], day_full: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], day_short: ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] }, labels: { dhx_cal_today_button: "Hari Ini", day_tab: "Hari", week_tab: "Minggu", month_tab: "Bulan", new_event: "Acara Baru", icon_save: "Simpan", icon_cancel: "Batal", icon_details: "Detail", icon_edit: "Edit", icon_delete: "Hapus", confirm_closing: "", confirm_deleting: "Acara akan dihapus", section_description: "Keterangan", section_time: "Periode", full_day: "Hari penuh", confirm_recurring: "Apakah acara ini akan berulang?", section_recurring: "Acara Rutin", button_recurring: "Tidak Difungsikan", button_recurring_open: "Difungsikan", button_edit_series: "Mengedit seri", button_edit_occurrence: "Mengedit salinan", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Tanggal", description: "Keterangan", year_tab: "Tahun", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Harian", repeat_radio_week: "Mingguan", repeat_radio_month: "Bulanan", repeat_radio_year: "Tahunan", repeat_radio_day_type: "Setiap", repeat_text_day_count: "hari", repeat_radio_day_type2: "Setiap hari kerja", repeat_week: " Ulangi setiap", repeat_text_week_count: "minggu pada hari berikut:", repeat_radio_month_type: "Ulangi", repeat_radio_month_start: "Pada", repeat_text_month_day: "hari setiap", repeat_text_month_count: "bulan", repeat_text_month_count2_before: "setiap", repeat_text_month_count2_after: "bulan", repeat_year_label: "Pada", select_year_day2: "dari", repeat_text_year_day: "hari", select_year_month: "bulan", repeat_radio_end: "Tanpa tanggal akhir", repeat_text_occurrences_count: "kejadian", repeat_radio_end2: "Setelah", repeat_radio_end3: "Berakhir pada", repeat_never: "Tidak pernah", repeat_daily: "Setiap hari", repeat_workdays: "Setiap hari kerja", repeat_weekly: "Setiap minggu", repeat_monthly: "Setiap bulan", repeat_yearly: "Setiap tahun", repeat_custom: "Kustom", repeat_freq_day: "Hari", repeat_freq_week: "Minggu", repeat_freq_month: "Bulan", repeat_freq_year: "Tahun", repeat_on_date: "Pada tanggal", repeat_ends: "Berakhir", month_for_recurring: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] } };
  const it = { date: { month_full: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], month_short: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"], day_full: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"], day_short: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"] }, labels: { dhx_cal_today_button: "Oggi", day_tab: "Giorno", week_tab: "Settimana", month_tab: "Mese", new_event: "Nuovo evento", icon_save: "Salva", icon_cancel: "Chiudi", icon_details: "Dettagli", icon_edit: "Modifica", icon_delete: "Elimina", confirm_closing: "", confirm_deleting: "L'evento sarà eliminato, siete sicuri?", section_description: "Descrizione", section_time: "Periodo di tempo", full_day: "Intera giornata", confirm_recurring: "Vuoi modificare l'intera serie di eventi?", section_recurring: "Ripetere l'evento", button_recurring: "Disattivato", button_recurring_open: "Attivato", button_edit_series: "Modificare la serie", button_edit_occurrence: "Modificare una copia", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Descrizione", year_tab: "Anno", week_agenda_tab: "Agenda", grid_tab: "Griglia", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidiano", repeat_radio_week: "Settimanale", repeat_radio_month: "Mensile", repeat_radio_year: "Annuale", repeat_radio_day_type: "Ogni", repeat_text_day_count: "giorno", repeat_radio_day_type2: "Ogni giornata lavorativa", repeat_week: " Ripetere ogni", repeat_text_week_count: "settimana:", repeat_radio_month_type: "Ripetere", repeat_radio_month_start: "Il", repeat_text_month_day: "giorno ogni", repeat_text_month_count: "mese", repeat_text_month_count2_before: "ogni", repeat_text_month_count2_after: "mese", repeat_year_label: "Il", select_year_day2: "del", repeat_text_year_day: "giorno", select_year_month: "mese", repeat_radio_end: "Senza data finale", repeat_text_occurrences_count: "occorenze", repeat_radio_end3: "Fine", repeat_radio_end2: "Dopo", repeat_never: "Mai", repeat_daily: "Ogni giorno", repeat_workdays: "Ogni giorno feriale", repeat_weekly: "Ogni settimana", repeat_monthly: "Ogni mese", repeat_yearly: "Ogni anno", repeat_custom: "Personalizzato", repeat_freq_day: "Giorno", repeat_freq_week: "Settimana", repeat_freq_month: "Mese", repeat_freq_year: "Anno", repeat_on_date: "Alla data", repeat_ends: "Finisce", month_for_recurring: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Jiugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], day_for_recurring: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Jovedì", "Venerdì", "Sabato"] } };
  const jp = { date: { month_full: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"], day_short: ["日", "月", "火", "水", "木", "金", "土"] }, labels: { dhx_cal_today_button: "今日", day_tab: "日", week_tab: "週", month_tab: "月", new_event: "新イベント", icon_save: "保存", icon_cancel: "キャンセル", icon_details: "詳細", icon_edit: "編集", icon_delete: "削除", confirm_closing: "", confirm_deleting: "イベント完全に削除されます、宜しいですか？", section_description: "デスクリプション", section_time: "期間", confirm_recurring: "繰り返されているイベントを全て編集しますか？", section_recurring: "イベントを繰り返す", button_recurring: "無効", button_recurring_open: "有効", full_day: "終日", button_edit_series: "シリーズを編集します", button_edit_occurrence: "コピーを編集", button_edit_occurrence_and_following: "This and following events", agenda_tab: "議題は", date: "日付", description: "説明", year_tab: "今年", week_agenda_tab: "議題は", grid_tab: "グリッド", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "毎日", repeat_radio_week: "毎週", repeat_radio_month: "毎月", repeat_radio_year: "毎年", repeat_radio_day_type: "毎", repeat_text_day_count: "日", repeat_radio_day_type2: "毎営業日", repeat_week: " 繰り返し毎", repeat_text_week_count: "週 次の日:", repeat_radio_month_type: "繰り返し", repeat_radio_month_start: "オン", repeat_text_month_day: "日毎", repeat_text_month_count: "月", repeat_text_month_count2_before: "毎", repeat_text_month_count2_after: "月", repeat_year_label: "オン", select_year_day2: "の", repeat_text_year_day: "日", select_year_month: "月", repeat_radio_end: "終了日なし", repeat_text_occurrences_count: "回数", repeat_radio_end2: "後", repeat_radio_end3: "終了日まで", repeat_never: "決して", repeat_daily: "毎日", repeat_workdays: "毎営業日", repeat_weekly: "毎週", repeat_monthly: "毎月", repeat_yearly: "毎年", repeat_custom: "カスタム", repeat_freq_day: "日", repeat_freq_week: "週", repeat_freq_month: "月", repeat_freq_year: "年", repeat_on_date: "日にち", repeat_ends: "終了", month_for_recurring: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_for_recurring: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"] } };
  class LocaleManager {
    constructor(config) {
      this._locales = {};
      for (const i in config) {
        this._locales[i] = config[i];
      }
    }
    addLocale(name, locale) {
      this._locales[name] = locale;
    }
    getLocale(name) {
      return this._locales[name];
    }
  }
  const nb = { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Mon", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "I dag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny hendelse", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Rediger", icon_delete: "Slett", confirm_closing: "", confirm_deleting: "Hendelsen vil bli slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du forandre hele dette settet av repeterende hendelser?", section_recurring: "Repeter hendelsen", button_recurring: "Av", button_recurring_open: "På", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ukentlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "Alle hverdager", repeat_week: " Gjentas hver", repeat_text_week_count: "uke på:", repeat_radio_month_type: "På hver", repeat_radio_month_start: "På", repeat_text_month_day: "dag hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "på", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen sluttdato", repeat_text_occurrences_count: "forekomst", repeat_radio_end3: "Stop den", repeat_radio_end2: "Etter", repeat_never: "Aldri", repeat_daily: "Hver dag", repeat_workdays: "Hver ukedag", repeat_weekly: "Hver uke", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Tilpasset", repeat_freq_day: "Dag", repeat_freq_week: "Uke", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Sondag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } };
  const nl = { date: { month_full: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"], day_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"] }, labels: { dhx_cal_today_button: "Vandaag", day_tab: "Dag", week_tab: "Week", month_tab: "Maand", new_event: "Nieuw item", icon_save: "Opslaan", icon_cancel: "Annuleren", icon_details: "Details", icon_edit: "Bewerken", icon_delete: "Verwijderen", confirm_closing: "", confirm_deleting: "Item zal permanent worden verwijderd, doorgaan?", section_description: "Beschrijving", section_time: "Tijd periode", full_day: "Hele dag", confirm_recurring: "Wilt u alle terugkerende items bijwerken?", section_recurring: "Item herhalen", button_recurring: "Uit", button_recurring_open: "Aan", button_edit_series: "Bewerk de serie", button_edit_occurrence: "Bewerk een kopie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Datum", description: "Omschrijving", year_tab: "Jaar", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagelijks", repeat_radio_week: "Wekelijks", repeat_radio_month: "Maandelijks", repeat_radio_year: "Jaarlijks", repeat_radio_day_type: "Elke", repeat_text_day_count: "dag(en)", repeat_radio_day_type2: "Elke werkdag", repeat_week: " Herhaal elke", repeat_text_week_count: "week op de volgende dagen:", repeat_radio_month_type: "Herhaal", repeat_radio_month_start: "Op", repeat_text_month_day: "dag iedere", repeat_text_month_count: "maanden", repeat_text_month_count2_before: "iedere", repeat_text_month_count2_after: "maanden", repeat_year_label: "Op", select_year_day2: "van", repeat_text_year_day: "dag", select_year_month: "maand", repeat_radio_end: "Geen eind datum", repeat_text_occurrences_count: "keren", repeat_radio_end3: "Eindigd per", repeat_radio_end2: "Na", repeat_never: "Nooit", repeat_daily: "Elke dag", repeat_workdays: "Elke werkdag", repeat_weekly: "Elke week", repeat_monthly: "Elke maand", repeat_yearly: "Elk jaar", repeat_custom: "Aangepast", repeat_freq_day: "Dag", repeat_freq_week: "Week", repeat_freq_month: "Maand", repeat_freq_year: "Jaar", repeat_on_date: "Op datum", repeat_ends: "Eindigt", month_for_recurring: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], day_for_recurring: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"] } };
  const no = { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Endre", icon_delete: "Slett", confirm_closing: "Endringer blir ikke lagret, er du sikker?", confirm_deleting: "Oppføringen vil bli slettet, er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", full_day: "Full dag", confirm_recurring: "Vil du endre hele settet med repeterende oppføringer?", section_recurring: "Repeterende oppføring", button_recurring: "Ikke aktiv", button_recurring_open: "Aktiv", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ukentlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "Hver arbeidsdag", repeat_week: " Gjenta hver", repeat_text_week_count: "uke neste dager:", repeat_radio_month_type: "Gjenta", repeat_radio_month_start: "På", repeat_text_month_day: "dag hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "På", select_year_day2: "av", repeat_text_year_day: "dag", select_year_month: "måned", repeat_radio_end: "Ingen sluttdato", repeat_text_occurrences_count: "forekomster", repeat_radio_end2: "Etter", repeat_radio_end3: "Slutt innen", repeat_never: "Aldri", repeat_daily: "Hver dag", repeat_workdays: "Hver ukedag", repeat_weekly: "Hver uke", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Tilpasset", repeat_freq_day: "Dag", repeat_freq_week: "Uke", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } };
  const pl = { date: { month_full: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"], month_short: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"], day_full: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"], day_short: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"] }, labels: { dhx_cal_today_button: "Dziś", day_tab: "Dzień", week_tab: "Tydzień", month_tab: "Miesiąc", new_event: "Nowe zdarzenie", icon_save: "Zapisz", icon_cancel: "Anuluj", icon_details: "Szczegóły", icon_edit: "Edytuj", icon_delete: "Usuń", confirm_closing: "", confirm_deleting: "Zdarzenie zostanie usunięte na zawsze, kontynuować?", section_description: "Opis", section_time: "Okres czasu", full_day: "Cały dzień", confirm_recurring: "Czy chcesz edytować cały zbiór powtarzających się zdarzeń?", section_recurring: "Powtórz zdarzenie", button_recurring: "Nieaktywne", button_recurring_open: "Aktywne", button_edit_series: "Edytuj serię", button_edit_occurrence: "Edytuj kopię", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Opis", year_tab: "Rok", week_agenda_tab: "Agenda", grid_tab: "Tabela", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Codziennie", repeat_radio_week: "Co tydzie", repeat_radio_month: "Co miesic", repeat_radio_year: "Co rok", repeat_radio_day_type: "Kadego", repeat_text_day_count: "dnia", repeat_radio_day_type2: "Kadego dnia roboczego", repeat_week: " Powtarzaj kadego", repeat_text_week_count: "tygodnia w dni:", repeat_radio_month_type: "Powtrz", repeat_radio_month_start: "W", repeat_text_month_day: "dnia kadego", repeat_text_month_count: "miesica", repeat_text_month_count2_before: "kadego", repeat_text_month_count2_after: "miesica", repeat_year_label: "W", select_year_day2: "miesica", repeat_text_year_day: "dnia miesica", select_year_month: "", repeat_radio_end: "Bez daty kocowej", repeat_text_occurrences_count: "wystpieniu/ach", repeat_radio_end3: "Zakocz w", repeat_radio_end2: "Po", repeat_never: "Nigdy", repeat_daily: "Codziennie", repeat_workdays: "Każdy dzień roboczy", repeat_weekly: "Co tydzień", repeat_monthly: "Co miesiąc", repeat_yearly: "Co rok", repeat_custom: "Niestandardowy", repeat_freq_day: "Dzień", repeat_freq_week: "Tydzień", repeat_freq_month: "Miesiąc", repeat_freq_year: "Rok", repeat_on_date: "W dniu", repeat_ends: "Kończy się", month_for_recurring: ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Wrzenia", "Padziernka", "Listopada", "Grudnia"], day_for_recurring: ["Niedziela", "Poniedziaek", "Wtorek", "roda", "Czwartek", "Pitek", "Sobota"] } };
  const pt = { date: { month_full: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], month_short: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], day_full: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"], day_short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"] }, labels: { dhx_cal_today_button: "Hoje", day_tab: "Dia", week_tab: "Semana", month_tab: "Mês", new_event: "Novo evento", icon_save: "Salvar", icon_cancel: "Cancelar", icon_details: "Detalhes", icon_edit: "Editar", icon_delete: "Deletar", confirm_closing: "", confirm_deleting: "Tem certeza que deseja excluir?", section_description: "Descrição", section_time: "Período de tempo", full_day: "Dia inteiro", confirm_recurring: "Deseja editar todos esses eventos repetidos?", section_recurring: "Repetir evento", button_recurring: "Desabilitar", button_recurring_open: "Habilitar", button_edit_series: "Editar a série", button_edit_occurrence: "Editar uma cópia", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Dia", date: "Data", description: "Descrição", year_tab: "Ano", week_agenda_tab: "Dia", grid_tab: "Grade", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diário", repeat_radio_week: "Semanal", repeat_radio_month: "Mensal", repeat_radio_year: "Anual", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia(s)", repeat_radio_day_type2: "Cada trabalho diário", repeat_week: " Repita cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repetir", repeat_radio_month_start: "Em", repeat_text_month_day: "todo dia", repeat_text_month_count: "mês", repeat_text_month_count2_before: "todo", repeat_text_month_count2_after: "mês", repeat_year_label: "Em", select_year_day2: "of", repeat_text_year_day: "dia", select_year_month: "mês", repeat_radio_end: "Sem data final", repeat_text_occurrences_count: "ocorrências", repeat_radio_end3: "Fim", repeat_radio_end2: "Depois", repeat_never: "Nunca", repeat_daily: "Todos os dias", repeat_workdays: "Todos os dias úteis", repeat_weekly: "Toda semana", repeat_monthly: "Todo mês", repeat_yearly: "Todo ano", repeat_custom: "Personalizado", repeat_freq_day: "Dia", repeat_freq_week: "Semana", repeat_freq_month: "Mês", repeat_freq_year: "Ano", repeat_on_date: "Na data", repeat_ends: "Termina", month_for_recurring: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], day_for_recurring: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] } };
  const ro = { date: { month_full: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "November", "December"], month_short: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"], day_short: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"] }, labels: { dhx_cal_today_button: "Astazi", day_tab: "Zi", week_tab: "Saptamana", month_tab: "Luna", new_event: "Eveniment nou", icon_save: "Salveaza", icon_cancel: "Anuleaza", icon_details: "Detalii", icon_edit: "Editeaza", icon_delete: "Sterge", confirm_closing: "Schimbarile nu vor fi salvate, esti sigur?", confirm_deleting: "Evenimentul va fi sters permanent, esti sigur?", section_description: "Descriere", section_time: "Interval", full_day: "Toata ziua", confirm_recurring: "Vrei sa editezi toata seria de evenimente repetate?", section_recurring: "Repetare", button_recurring: "Dezactivata", button_recurring_open: "Activata", button_edit_series: "Editeaza serie", button_edit_occurrence: "Editeaza doar intrare", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Descriere", year_tab: "An", week_agenda_tab: "Agenda", grid_tab: "Lista", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Zilnic", repeat_radio_week: "Saptamanal", repeat_radio_month: "Lunar", repeat_radio_year: "Anual", repeat_radio_day_type: "La fiecare", repeat_text_day_count: "zi(le)", repeat_radio_day_type2: "Fiecare zi lucratoare", repeat_week: " Repeta la fiecare", repeat_text_week_count: "saptamana in urmatoarele zile:", repeat_radio_month_type: "Repeta in", repeat_radio_month_start: "In a", repeat_text_month_day: "zi la fiecare", repeat_text_month_count: "luni", repeat_text_month_count2_before: "la fiecare", repeat_text_month_count2_after: "luni", repeat_year_label: "In", select_year_day2: "a lunii", repeat_text_year_day: "zi a lunii", select_year_month: "", repeat_radio_end: "Fara data de sfarsit", repeat_text_occurrences_count: "evenimente", repeat_radio_end3: "La data", repeat_radio_end2: "Dupa", repeat_never: "Niciodată", repeat_daily: "În fiecare zi", repeat_workdays: "În fiecare zi lucrătoare", repeat_weekly: "În fiecare săptămână", repeat_monthly: "În fiecare lună", repeat_yearly: "În fiecare an", repeat_custom: "Personalizat", repeat_freq_day: "Zi", repeat_freq_week: "Săptămână", repeat_freq_month: "Lună", repeat_freq_year: "An", repeat_on_date: "La data", repeat_ends: "Se termină", month_for_recurring: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"], day_for_recurring: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"] } };
  const ru = { date: { month_full: ["Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь", "Июль", "Август", "Сентябрь", "Oктябрь", "Ноябрь", "Декабрь"], month_short: ["Янв", "Фев", "Maр", "Aпр", "Maй", "Июн", "Июл", "Aвг", "Сен", "Окт", "Ноя", "Дек"], day_full: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сегодня", day_tab: "День", week_tab: "Неделя", month_tab: "Месяц", new_event: "Новое событие", icon_save: "Сохранить", icon_cancel: "Отменить", icon_details: "Детали", icon_edit: "Изменить", icon_delete: "Удалить", confirm_closing: "", confirm_deleting: "Событие будет удалено безвозвратно, продолжить?", section_description: "Описание", section_time: "Период времени", full_day: "Весь день", confirm_recurring: "Вы хотите изменить всю серию повторяющихся событий?", section_recurring: "Повторение", button_recurring: "Отключено", button_recurring_open: "Включено", button_edit_series: "Редактировать серию", button_edit_occurrence: "Редактировать экземпляр", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Список", date: "Дата", description: "Описание", year_tab: "Год", week_agenda_tab: "Список", grid_tab: "Таблица", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Неделя", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Каждый", repeat_text_day_count: "день", repeat_radio_day_type2: "Каждый рабочий день", repeat_week: " Повторять каждую", repeat_text_week_count: "неделю , в:", repeat_radio_month_type: "Повторять", repeat_radio_month_start: "", repeat_text_month_day: " числа каждый ", repeat_text_month_count: "месяц", repeat_text_month_count2_before: "каждый ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без даты окончания", repeat_text_occurrences_count: "повторений", repeat_radio_end3: "До ", repeat_radio_end2: "", repeat_never: "Никогда", repeat_daily: "Каждый день", repeat_workdays: "Каждый будний день", repeat_weekly: "Каждую неделю", repeat_monthly: "Каждый месяц", repeat_yearly: "Каждый год", repeat_custom: "Настроить", repeat_freq_day: "День", repeat_freq_week: "Неделя", repeat_freq_month: "Месяц", repeat_freq_year: "Год", repeat_on_date: "В дату", repeat_ends: "Заканчивается", month_for_recurring: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"], day_for_recurring: ["Воскресенье", "Понедельник", "Вторник", "Среду", "Четверг", "Пятницу", "Субботу"] } };
  const si = { date: { month_full: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"], day_short: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"] }, labels: { dhx_cal_today_button: "Danes", day_tab: "Dan", week_tab: "Teden", month_tab: "Mesec", new_event: "Nov dogodek", icon_save: "Shrani", icon_cancel: "Prekliči", icon_details: "Podrobnosti", icon_edit: "Uredi", icon_delete: "Izbriši", confirm_closing: "", confirm_deleting: "Dogodek bo izbrisan. Želite nadaljevati?", section_description: "Opis", section_time: "Časovni okvir", full_day: "Ves dan", confirm_recurring: "Želite urediti celoten set ponavljajočih dogodkov?", section_recurring: "Ponovi dogodek", button_recurring: "Onemogočeno", button_recurring_open: "Omogočeno", button_edit_series: "Edit series", button_edit_occurrence: "Edit occurrence", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Zadeva", date: "Datum", description: "Opis", year_tab: "Leto", week_agenda_tab: "Zadeva", grid_tab: "Miza", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dnevno", repeat_radio_week: "Tedensko", repeat_radio_month: "Mesečno", repeat_radio_year: "Letno", repeat_radio_day_type: "Vsak", repeat_text_day_count: "dan", repeat_radio_day_type2: "Vsak delovni dan", repeat_week: " Ponavljaj vsak", repeat_text_week_count: "teden na naslednje dni:", repeat_radio_month_type: "Ponavljaj", repeat_radio_month_start: "Na", repeat_text_month_day: "dan vsak", repeat_text_month_count: "mesec", repeat_text_month_count2_before: "vsak", repeat_text_month_count2_after: "mesec", repeat_year_label: "Na", select_year_day2: "od", repeat_text_year_day: "dan", select_year_month: "mesec", repeat_radio_end: "Brez končnega datuma", repeat_text_occurrences_count: "pojavitve", repeat_radio_end2: "Po", repeat_radio_end3: "Končaj do", repeat_never: "Nikoli", repeat_daily: "Vsak dan", repeat_workdays: "Vsak delovni dan", repeat_weekly: "Vsak teden", repeat_monthly: "Vsak mesec", repeat_yearly: "Vsako leto", repeat_custom: "Po meri", repeat_freq_day: "Dan", repeat_freq_week: "Teden", repeat_freq_month: "Mesec", repeat_freq_year: "Leto", repeat_on_date: "Na datum", repeat_ends: "Konča se", month_for_recurring: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], day_for_recurring: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"] } };
  const sk = { date: { month_full: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sept", "Okt", "Nov", "Dec"], day_full: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"], day_short: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Deň", week_tab: "Týždeň", month_tab: "Mesiac", new_event: "Nová udalosť", icon_save: "Uložiť", icon_cancel: "Späť", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Zmazať", confirm_closing: "Vaše zmeny nebudú uložené. Skutočne?", confirm_deleting: "Udalosť bude natrvalo vymazaná. Skutočne?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Prajete si upraviť celú radu opakovaných udalostí?", section_recurring: "Opakovanie udalosti", button_recurring: "Vypnuté", button_recurring_open: "Zapnuté", button_edit_series: "Upraviť opakovania", button_edit_occurrence: "Upraviť inštancie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Program", date: "Dátum", description: "Poznámka", year_tab: "Rok", full_day: "Celý deň", week_agenda_tab: "Program", grid_tab: "Mriežka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denne", repeat_radio_week: "Týždenne", repeat_radio_month: "Mesaène", repeat_radio_year: "Roène", repeat_radio_day_type: "Každý", repeat_text_day_count: "deò", repeat_radio_day_type2: "Každý prac. deò", repeat_week: "Opakova každý", repeat_text_week_count: "týždeò v dòoch:", repeat_radio_month_type: "Opakova", repeat_radio_month_start: "On", repeat_text_month_day: "deò každý", repeat_text_month_count: "mesiac", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "mesiac", repeat_year_label: "On", select_year_day2: "poèas", repeat_text_year_day: "deò", select_year_month: "mesiac", repeat_radio_end: "Bez dátumu ukonèenia", repeat_text_occurrences_count: "udalostiach", repeat_radio_end3: "Ukonèi", repeat_radio_end2: "Po", repeat_never: "Nikdy", repeat_daily: "Každý deň", repeat_workdays: "Každý pracovný deň", repeat_weekly: "Každý týždeň", repeat_monthly: "Každý mesiac", repeat_yearly: "Každý rok", repeat_custom: "Vlastné", repeat_freq_day: "Deň", repeat_freq_week: "Týždeň", repeat_freq_month: "Mesiac", repeat_freq_year: "Rok", repeat_on_date: "Na dátum", repeat_ends: "Koniec", month_for_recurring: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], day_for_recurring: ["Nede¾a", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"] } };
  const sv = { date: { month_full: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"], day_short: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Vecka", month_tab: "Månad", new_event: "Ny händelse", icon_save: "Spara", icon_cancel: "Ångra", icon_details: "Detaljer", icon_edit: "Ändra", icon_delete: "Ta bort", confirm_closing: "", confirm_deleting: "Är du säker på att du vill ta bort händelsen permanent?", section_description: "Beskrivning", section_time: "Tid", full_day: "Hela dagen", confirm_recurring: "Vill du redigera hela serien med repeterande händelser?", section_recurring: "Upprepa händelse", button_recurring: "Inaktiverat", button_recurring_open: "Aktiverat", button_edit_series: "Redigera serien", button_edit_occurrence: "Redigera en kopia", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Dagordning", date: "Datum", description: "Beskrivning", year_tab: "År", week_agenda_tab: "Dagordning", grid_tab: "Galler", drag_to_create: "Dra för att skapa ny", drag_to_move: "Dra för att flytta", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagligen", repeat_radio_week: "Veckovis", repeat_radio_month: "Månadsvis", repeat_radio_year: "Årligen", repeat_radio_day_type: "Var", repeat_text_day_count: "dag", repeat_radio_day_type2: "Varje arbetsdag", repeat_week: " Upprepa var", repeat_text_week_count: "vecka dessa dagar:", repeat_radio_month_type: "Upprepa", repeat_radio_month_start: "Den", repeat_text_month_day: "dagen var", repeat_text_month_count: "månad", repeat_text_month_count2_before: "var", repeat_text_month_count2_after: "månad", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "månad", repeat_radio_end: "Inget slutdatum", repeat_text_occurrences_count: "upprepningar", repeat_radio_end3: "Sluta efter", repeat_radio_end2: "Efter", repeat_never: "Aldrig", repeat_daily: "Varje dag", repeat_workdays: "Varje vardag", repeat_weekly: "Varje vecka", repeat_monthly: "Varje månad", repeat_yearly: "Varje år", repeat_custom: "Anpassad", repeat_freq_day: "Dag", repeat_freq_week: "Vecka", repeat_freq_month: "Månad", repeat_freq_year: "År", repeat_on_date: "På datum", repeat_ends: "Slutar", month_for_recurring: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], day_for_recurring: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"] } };
  const tr = { date: { month_full: ["Ocak", "Þubat", "Mart", "Nisan", "Mayýs", "Haziran", "Temmuz", "Aðustos", "Eylül", "Ekim", "Kasým", "Aralýk"], month_short: ["Oca", "Þub", "Mar", "Nis", "May", "Haz", "Tem", "Aðu", "Eyl", "Eki", "Kas", "Ara"], day_full: ["Pazar", "Pazartes,", "Salý", "Çarþamba", "Perþembe", "Cuma", "Cumartesi"], day_short: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"] }, labels: { dhx_cal_today_button: "Bugün", day_tab: "Gün", week_tab: "Hafta", month_tab: "Ay", new_event: "Uygun", icon_save: "Kaydet", icon_cancel: "Ýptal", icon_details: "Detaylar", icon_edit: "Düzenle", icon_delete: "Sil", confirm_closing: "", confirm_deleting: "Etkinlik silinecek, devam?", section_description: "Açýklama", section_time: "Zaman aralýðý", full_day: "Tam gün", confirm_recurring: "Tüm tekrar eden etkinlikler silinecek, devam?", section_recurring: "Etkinliði tekrarla", button_recurring: "Pasif", button_recurring_open: "Aktif", button_edit_series: "Dizi düzenleme", button_edit_occurrence: "Bir kopyasını düzenleyin", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Ajanda", date: "Tarih", description: "Açýklama", year_tab: "Yýl", week_agenda_tab: "Ajanda", grid_tab: "Izgara", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Günlük", repeat_radio_week: "Haftalık", repeat_radio_month: "Aylık", repeat_radio_year: "Yıllık", repeat_radio_day_type: "Her", repeat_text_day_count: "gün", repeat_radio_day_type2: "Her iş günü", repeat_week: " Tekrar her", repeat_text_week_count: "hafta şu günlerde:", repeat_radio_month_type: "Tekrar et", repeat_radio_month_start: "Tarihinde", repeat_text_month_day: "gün her", repeat_text_month_count: "ay", repeat_text_month_count2_before: "her", repeat_text_month_count2_after: "ay", repeat_year_label: "Tarihinde", select_year_day2: "ayın", repeat_text_year_day: "günü", select_year_month: "ay", repeat_radio_end: "Bitiş tarihi yok", repeat_text_occurrences_count: "olay", repeat_radio_end2: "Sonra", repeat_radio_end3: "Tarihinde bitir", repeat_never: "Asla", repeat_daily: "Her gün", repeat_workdays: "Her iş günü", repeat_weekly: "Her hafta", repeat_monthly: "Her ay", repeat_yearly: "Her yıl", repeat_custom: "Özel", repeat_freq_day: "Gün", repeat_freq_week: "Hafta", repeat_freq_month: "Ay", repeat_freq_year: "Yıl", repeat_on_date: "Tarihinde", repeat_ends: "Biter", month_for_recurring: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"], day_for_recurring: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"] } };
  const ua = { date: { month_full: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"], month_short: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"], day_full: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"], day_short: ["Нед", "Пон", "Вів", "Сер", "Чет", "Птн", "Суб"] }, labels: { dhx_cal_today_button: "Сьогодні", day_tab: "День", week_tab: "Тиждень", month_tab: "Місяць", new_event: "Нова подія", icon_save: "Зберегти", icon_cancel: "Відміна", icon_details: "Деталі", icon_edit: "Редагувати", icon_delete: "Вилучити", confirm_closing: "", confirm_deleting: "Подія вилучиться назавжди. Ви впевнені?", section_description: "Опис", section_time: "Часовий проміжок", full_day: "Весь день", confirm_recurring: "Хочете редагувати весь перелік повторюваних подій?", section_recurring: "Повторювана подія", button_recurring: "Відключено", button_recurring_open: "Включено", button_edit_series: "Редагувати серію", button_edit_occurrence: "Редагувати примірник", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Перелік", date: "Дата", description: "Опис", year_tab: "Рік", week_agenda_tab: "Перелік", grid_tab: "Таблиця", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Тиждень", repeat_radio_month: "Місяць", repeat_radio_year: "Рік", repeat_radio_day_type: "Кожний", repeat_text_day_count: "день", repeat_radio_day_type2: "Кожний робочий день", repeat_week: " Повторювати кожен", repeat_text_week_count: "тиждень , по:", repeat_radio_month_type: "Повторювати", repeat_radio_month_start: "", repeat_text_month_day: " числа кожний ", repeat_text_month_count: "місяць", repeat_text_month_count2_before: "кожен ", repeat_text_month_count2_after: "місяць", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без дати закінчення", repeat_text_occurrences_count: "повторень", repeat_radio_end3: "До ", repeat_radio_end2: "", repeat_never: "Ніколи", repeat_daily: "Щодня", repeat_workdays: "Щодня в робочі дні", repeat_weekly: "Щотижня", repeat_monthly: "Щомісяця", repeat_yearly: "Щороку", repeat_custom: "Налаштоване", repeat_freq_day: "День", repeat_freq_week: "Тиждень", repeat_freq_month: "Місяць", repeat_freq_year: "Рік", repeat_on_date: "На дату", repeat_ends: "Закінчується", month_for_recurring: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"], day_for_recurring: ["Неділям", "Понеділкам", "Вівторкам", "Середам", "Четвергам", "П'ятницям", "Суботам"] } };
  function i18nFactory() {
    return new LocaleManager({ en, ar, be, ca, cn, cs, da, de, el, es, fi, fr, he, hu, id, it, jp, nb, nl, no, pl, pt, ro, ru, si, sk, sv, tr, ua });
  }
  class DatePicker {
    constructor(scheduler2, container, state = {}) {
      this.state = { date: /* @__PURE__ */ new Date(), modes: ["days", "months", "years"], currentRange: [], eventDates: [], filterDays: null, currentModeIndex: 0, ...state };
      this.container = null;
      this.element = null;
      this.onStateChangeHandlers = [];
      this.scheduler = scheduler2;
      this._domEvents = scheduler2._createDomEventScope();
      this.state = this.getState();
      makeEventable(this);
      if (container) {
        this.container = container;
        this.render(this.container);
      }
      this.onStateChange((oldState, newState) => {
        this.callEvent("onStateChange", [newState, oldState]);
      });
    }
    getState() {
      return { ...this.state, mode: this.state.modes[this.state.currentModeIndex] };
    }
    setState(newState) {
      const oldState = { ...this.state };
      if (newState.mode) {
        newState.currentModeIndex = this.state.modes.indexOf(newState.mode);
      }
      this.state = { ...this.state, ...newState };
      this._notifyStateChange(oldState, this.state);
      if (this.container) {
        this.render(this.container);
      }
    }
    onStateChange(handler) {
      this.onStateChangeHandlers.push(handler);
      return () => {
        const index = this.onStateChangeHandlers.indexOf(handler);
        if (index !== -1) {
          this.onStateChangeHandlers.splice(index, 1);
        }
      };
    }
    _notifyStateChange(oldState, newState) {
      this.onStateChangeHandlers.forEach((handler) => handler(oldState, newState));
    }
    _adjustDate(direction) {
      const { mode, date } = this.getState();
      const newDate = new Date(date);
      if (mode === "days") {
        newDate.setMonth(date.getMonth() + direction);
      } else if (mode === "months") {
        newDate.setFullYear(date.getFullYear() + direction);
      } else {
        newDate.setFullYear(date.getFullYear() + direction * 10);
      }
      this.setState({ date: newDate });
    }
    _toggleMode() {
      const newIndex = (this.state.currentModeIndex + 1) % this.state.modes.length;
      this.setState({ currentModeIndex: newIndex });
    }
    _renderCalendarHeader(container) {
      const { mode, date } = this.getState();
      const header = document.createElement("div");
      header.classList.add("dhx_cal_datepicker_header");
      const backwardArrow = document.createElement("button");
      backwardArrow.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_left");
      header.appendChild(backwardArrow);
      const monthLabel = document.createElement("div");
      monthLabel.classList.add("dhx_cal_datepicker_title");
      if (mode === "days") {
        monthLabel.innerText = date.toLocaleString("default", { month: "long" }) + " " + date.getFullYear();
      } else if (mode === "months") {
        monthLabel.innerText = date.getFullYear();
      } else {
        const startYear = Math.floor(date.getFullYear() / 10) * 10;
        monthLabel.innerText = `${startYear} - ${startYear + 9}`;
      }
      this._domEvents.attach(monthLabel, "click", this._toggleMode.bind(this));
      header.appendChild(monthLabel);
      const forwardArrow = document.createElement("button");
      forwardArrow.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_right");
      header.appendChild(forwardArrow);
      container.appendChild(header);
      this._domEvents.attach(backwardArrow, "click", this._adjustDate.bind(this, -1));
      this._domEvents.attach(forwardArrow, "click", this._adjustDate.bind(this, 1));
    }
    render(container) {
      this._domEvents.detachAll();
      this.container = container || this.container;
      this.container.innerHTML = "";
      if (!this.element) {
        this.element = document.createElement("div");
        this.element.classList.add("dhx_cal_datepicker");
      }
      this.element.innerHTML = "";
      this.container.appendChild(this.element);
      this._renderCalendarHeader(this.element);
      const dataContainer = document.createElement("div");
      dataContainer.classList.add("dhx_cal_datepicker_data");
      this.element.appendChild(dataContainer);
      const { mode } = this.getState();
      if (mode === "days") {
        this._renderDayGrid(dataContainer);
      } else if (mode === "months") {
        this._renderMonthGrid(dataContainer);
      } else {
        this._renderYearGrid(dataContainer);
      }
    }
    _renderDayGridHeader(daysOfWeekContainer) {
      const { date, filterDays } = this.getState();
      const scheduler2 = this.scheduler;
      let currentDate = scheduler2.date.week_start(new Date(date));
      const maxDate = scheduler2.date.add(scheduler2.date.week_start(new Date(date)), 1, "week");
      daysOfWeekContainer.classList.add("dhx_cal_datepicker_days");
      const labelFormat = scheduler2.date.date_to_str("%D");
      while (currentDate.valueOf() < maxDate.valueOf()) {
        if (!(filterDays && filterDays(currentDate))) {
          const label = labelFormat(currentDate);
          const dayElement = document.createElement("div");
          dayElement.setAttribute("data-day", currentDate.getDay());
          dayElement.classList.add("dhx_cal_datepicker_dayname");
          dayElement.innerText = label;
          daysOfWeekContainer.appendChild(dayElement);
        }
        currentDate = scheduler2.date.add(currentDate, 1, "day");
      }
    }
    _weeksBetween(min, max) {
      const scheduler2 = this.scheduler;
      let weeks = 0;
      let currWeek = new Date(min);
      while (currWeek.valueOf() < max.valueOf()) {
        weeks += 1;
        currWeek = scheduler2.date.week_start(scheduler2.date.add(currWeek, 1, "week"));
      }
      return weeks;
    }
    _renderDayGrid(container) {
      const { date, currentRange, eventDates, minWeeks, filterDays } = this.getState();
      let minSchedulerDate = currentRange[0];
      let maxSchedulerDate = currentRange[1];
      const eventDaysTable = eventDates.reduce((acc, date2) => {
        const dayStart = this.scheduler.date.day_start(new Date(date2));
        acc[dayStart.valueOf()] = true;
        return acc;
      }, {});
      const daysOfWeekContainer = document.createElement("div");
      this._renderDayGridHeader(daysOfWeekContainer);
      const weekLength = daysOfWeekContainer.children.length;
      container.appendChild(daysOfWeekContainer);
      if (weekLength !== 7) {
        container.style.setProperty("--dhx-scheduler-week-length", weekLength);
      }
      const scheduler2 = this.scheduler;
      const firstDate = scheduler2.date.week_start(scheduler2.date.month_start(new Date(date)));
      const monthStart = scheduler2.date.month_start(new Date(date));
      const monthEnd = scheduler2.date.add(scheduler2.date.month_start(new Date(date)), 1, "month");
      let lastDate = scheduler2.date.add(scheduler2.date.month_start(new Date(date)), 1, "month");
      const currentCalDate = scheduler2.date.date_part(scheduler2._currentDate());
      if (lastDate.getDay() !== 0) {
        lastDate = scheduler2.date.add(scheduler2.date.week_start(lastDate), 1, "week");
      }
      let weeks = this._weeksBetween(firstDate, lastDate);
      if (minWeeks && weeks < minWeeks) {
        lastDate = scheduler2.date.add(lastDate, minWeeks - weeks, "week");
      }
      let currDate = firstDate;
      const dayGridContainer = document.createElement("div");
      dayGridContainer.classList.add("dhx_cal_datepicker_days");
      this._domEvents.attach(dayGridContainer, "click", (event2) => {
        const dateCell = event2.target.closest("[data-cell-date]");
        const date2 = new Date(dateCell.getAttribute("data-cell-date"));
        this.callEvent("onDateClick", [date2, event2]);
      });
      while (currDate.valueOf() < lastDate.valueOf()) {
        if (!(filterDays && filterDays(currDate))) {
          const dayElement = document.createElement("div");
          dayElement.setAttribute("data-cell-date", scheduler2.templates.format_date(currDate));
          dayElement.setAttribute("data-day", currDate.getDay());
          dayElement.innerHTML = scheduler2.templates.month_day(currDate);
          if (currDate.valueOf() < monthStart.valueOf()) {
            dayElement.classList.add("dhx_before");
          } else if (currDate.valueOf() >= monthEnd.valueOf()) {
            dayElement.classList.add("dhx_after");
          }
          if (currDate.getDay() === 0 || currDate.getDay() === 6) {
            dayElement.classList.add("dhx_cal_datepicker_weekend");
          }
          if (currDate.valueOf() == currentCalDate.valueOf()) {
            dayElement.classList.add("dhx_now");
          }
          if (minSchedulerDate && maxSchedulerDate) {
            if (currDate.valueOf() >= minSchedulerDate.valueOf() && currDate.valueOf() < maxSchedulerDate.valueOf()) {
              dayElement.classList.add("dhx_cal_datepicker_current");
            }
          }
          if (eventDaysTable[currDate.valueOf()]) {
            dayElement.classList.add("dhx_cal_datepicker_event");
          }
          dayElement.classList.add("dhx_cal_datepicker_date");
          dayGridContainer.appendChild(dayElement);
        }
        currDate = scheduler2.date.add(currDate, 1, "day");
      }
      container.appendChild(dayGridContainer);
    }
    _renderMonthGrid(container) {
      const { date } = this.getState();
      const wrapper = document.createElement("div");
      wrapper.classList.add("dhx_cal_datepicker_months");
      const months = [];
      for (let i = 0; i < 12; i++) {
        months.push(new Date(date.getFullYear(), i, 1));
      }
      const formatLabel = this.scheduler.date.date_to_str("%M");
      months.forEach((month) => {
        const monthElement = document.createElement("div");
        monthElement.classList.add("dhx_cal_datepicker_month");
        if (date.getMonth() === month.getMonth()) {
          monthElement.classList.add("dhx_cal_datepicker_current");
        }
        monthElement.setAttribute("data-month", month.getMonth());
        monthElement.innerHTML = formatLabel(month);
        this._domEvents.attach(monthElement, "click", () => {
          const newDate = new Date(month);
          this.setState({ date: newDate, mode: "days" });
        });
        wrapper.appendChild(monthElement);
      });
      container.appendChild(wrapper);
      const doneArea = document.createElement("div");
      doneArea.classList.add("dhx_cal_datepicker_done");
      const doneBtn = document.createElement("button");
      doneBtn.innerText = "Done";
      doneBtn.classList.add("dhx_cal_datepicker_done_btn");
      this._domEvents.attach(doneBtn, "click", () => {
        this.setState({ mode: "days" });
      });
      doneArea.appendChild(doneBtn);
      container.appendChild(doneArea);
    }
    _renderYearGrid(container) {
      const { date } = this.getState();
      const startYear = Math.floor(date.getFullYear() / 10) * 10;
      const wrapper = document.createElement("div");
      wrapper.classList.add("dhx_cal_datepicker_years");
      for (let i = startYear - 1; i <= startYear + 10; i++) {
        const yearElement = document.createElement("div");
        yearElement.innerText = i;
        yearElement.classList.add("dhx_cal_datepicker_year");
        yearElement.setAttribute("data-year", i);
        if (date.getFullYear() === i) {
          yearElement.classList.add("dhx_cal_datepicker_current");
        }
        this._domEvents.attach(yearElement, "click", () => {
          this.setState({ date: new Date(i, date.getMonth(), 1), mode: "months" });
        });
        wrapper.appendChild(yearElement);
      }
      container.appendChild(wrapper);
      const doneArea = document.createElement("div");
      doneArea.classList.add("dhx_cal_datepicker_done");
      const doneBtn = document.createElement("button");
      doneBtn.innerText = "Done";
      doneBtn.classList.add("dhx_cal_datepicker_done_btn");
      this._domEvents.attach(doneBtn, "click", () => {
        this.setState({ mode: "months" });
      });
      doneArea.appendChild(doneBtn);
      container.appendChild(doneArea);
    }
    destructor() {
      this.onStateChangeHandlers = [];
      if (this.element) {
        this.element.innerHTML = "";
        this.element.remove();
      }
      this._domEvents.detachAll();
      this.callEvent("onDestroy", []);
      this.detachAllEvents();
      this.scheduler = null;
    }
  }
  function factoryMethod(extensionManager) {
    const scheduler2 = { version: "7.2.5" };
    scheduler2.$stateProvider = StateService();
    scheduler2.getState = scheduler2.$stateProvider.getState;
    extend$n(scheduler2);
    extend$i(scheduler2);
    extend$j(scheduler2);
    extend$h(scheduler2);
    scheduler2.utils = utils;
    scheduler2.$domHelpers = dom_helpers;
    scheduler2.utils.dom = dom_helpers;
    scheduler2.uid = utils.uid;
    scheduler2.mixin = utils.mixin;
    scheduler2.defined = utils.defined;
    scheduler2.assert = assert(scheduler2);
    scheduler2.copy = utils.copy;
    scheduler2._createDatePicker = function(container, config) {
      return new DatePicker(scheduler2, container, config);
    };
    scheduler2._getFocusableNodes = dom_helpers.getFocusableNodes;
    scheduler2._getClassName = dom_helpers.getClassName;
    scheduler2._locate_css = dom_helpers.locateCss;
    const messageApi = message(scheduler2);
    scheduler2.utils.mixin(scheduler2, messageApi);
    scheduler2.env = scheduler2.$env = env;
    scheduler2.Promise = window.Promise;
    extend$g(scheduler2);
    extend$f(scheduler2);
    extend$e(scheduler2);
    extend$d(scheduler2);
    extend$c(scheduler2);
    extend$b(scheduler2);
    extend$7(scheduler2);
    extend$6(scheduler2);
    extend$5(scheduler2);
    extend$4(scheduler2);
    extend$3(scheduler2);
    extend$2();
    extend$1(scheduler2);
    extend(scheduler2);
    extend$m(scheduler2);
    const i18n = i18nFactory();
    scheduler2.i18n = { addLocale: i18n.addLocale, setLocale: function(locale) {
      if (typeof locale === "string") {
        var localeObject = i18n.getLocale(locale);
        if (!localeObject) {
          localeObject = i18n.getLocale("en");
        }
        scheduler2.locale = localeObject;
      } else if (locale) {
        if (!scheduler2.locale) {
          scheduler2.locale = locale;
        } else {
          for (var i in locale) {
            if (locale[i] && typeof locale[i] === "object") {
              if (!scheduler2.locale[i]) {
                scheduler2.locale[i] = {};
              }
              scheduler2.mixin(scheduler2.locale[i], locale[i], true);
            } else {
              scheduler2.locale[i] = locale[i];
            }
          }
        }
      }
      var labels = scheduler2.locale.labels;
      labels.dhx_save_btn = labels.icon_save;
      labels.dhx_cancel_btn = labels.icon_cancel;
      labels.dhx_delete_btn = labels.icon_delete;
      if (scheduler2.$container) {
        scheduler2.get_elements();
      }
    }, getLocale: i18n.getLocale };
    scheduler2.i18n.setLocale("en");
    scheduler2.ext = {};
    initPlugins(scheduler2);
    const activePlugins = {};
    scheduler2.plugins = function(config) {
      const extensionList = getExtensionList(config, { treetimeline: ["timeline"], daytimeline: ["timeline"], outerdrag: ["legacy"] }, { legacy: 1, limit: 1, timeline: 2, daytimeline: 3, treetimeline: 3, outerdrag: 6 });
      extensionList.forEach(function(name) {
        if (!activePlugins[name]) {
          const plugin = extensionManager.getExtension(name);
          if (plugin) {
            plugin(scheduler2);
            activePlugins[name] = true;
          } else {
            throw new Error("unknown plugin " + name);
          }
        }
      });
    };
    function getExtensionList(config, dependencies, priorities) {
      const result = [];
      for (const i in config) {
        if (config[i]) {
          const extension = i.toLowerCase();
          if (dependencies[extension]) {
            dependencies[extension].forEach(function(dep) {
              const dependencyName = dep.toLowerCase();
              if (!config[dependencyName]) {
                result.push(dependencyName);
              }
            });
          }
          result.push(extension);
        }
      }
      result.sort(function(a, b) {
        const orderA = priorities[a] || 0;
        const orderB = priorities[b] || 0;
        if (orderA > orderB) {
          return 1;
        } else if (orderA < orderB) {
          return -1;
        } else {
          return 0;
        }
      });
      return result;
    }
    scheduler2.plugins({ all_timed: "short" });
    return scheduler2;
  }
  class ExtensionsManager {
    constructor(config) {
      this._extensions = {};
      for (const i in config) {
        this._extensions[i] = config[i];
      }
    }
    addExtension(name, ext) {
      this._extensions[name] = ext;
    }
    getExtension(name) {
      return this._extensions[name];
    }
  }
  dhtmlxHook();
  class SchedulerFactory {
    constructor(extensions) {
      this._seed = 0;
      this._schedulerPlugins = [];
      this._bundledExtensions = extensions;
      this._extensionsManager = new ExtensionsManager(extensions);
    }
    plugin(code) {
      this._schedulerPlugins.push(code);
      if (global$1.scheduler) {
        code(global$1.scheduler);
      }
    }
    getSchedulerInstance(initConfig) {
      var scheduler2 = factoryMethod(this._extensionsManager);
      for (var i = 0; i < this._schedulerPlugins.length; i++) {
        this._schedulerPlugins[i](scheduler2);
      }
      scheduler2._internal_id = this._seed++;
      if (this.$syncFactory) {
        this.$syncFactory(scheduler2);
      }
      if (initConfig) {
        this._initFromConfig(scheduler2, initConfig);
      }
      return scheduler2;
    }
    _initFromConfig(scheduler2, initConfig) {
      if (initConfig.plugins) {
        scheduler2.plugins(initConfig.plugins);
      }
      if (initConfig.config) {
        scheduler2.mixin(scheduler2.config, initConfig.config, true);
      }
      if (initConfig.templates) {
        scheduler2.attachEvent("onTemplatesReady", function() {
          scheduler2.mixin(scheduler2.templates, initConfig.templates, true);
        }, { once: true });
      }
      if (initConfig.events) {
        for (const event2 in initConfig.events) {
          scheduler2.attachEvent(event2, initConfig.events[event2]);
        }
      }
      if (initConfig.locale) {
        scheduler2.i18n.setLocale(initConfig.locale);
      }
      if (Array.isArray(initConfig.calendars)) {
        initConfig.calendars.forEach(function(calendar) {
          scheduler2.addCalendar(calendar);
        });
      }
      if (initConfig.container) {
        scheduler2.init(initConfig.container);
      } else {
        scheduler2.init();
      }
      if (initConfig.data) {
        if (typeof initConfig.data === "string") {
          scheduler2.load(initConfig.data);
        } else {
          scheduler2.parse(initConfig.data);
        }
      }
    }
  }
  function active_links(scheduler2) {
    scheduler2.config.active_link_view = "day";
    scheduler2._active_link_click = function(e) {
      var start = e.target;
      var to = start.getAttribute("data-link-date");
      var s_d = scheduler2.date.str_to_date(scheduler2.config.api_date, false, true);
      if (to) {
        scheduler2.setCurrentView(s_d(to), scheduler2.config.active_link_view);
        if (e && e.preventDefault)
          e.preventDefault();
        return false;
      }
    };
    scheduler2.attachEvent("onTemplatesReady", function() {
      var do_wrapper = function(key2, fullname) {
        fullname = fullname || key2 + "_scale_date";
        if (!scheduler2.templates["_active_links_old_" + fullname]) {
          scheduler2.templates["_active_links_old_" + fullname] = scheduler2.templates[fullname];
        }
        var week_x = scheduler2.templates["_active_links_old_" + fullname];
        var d_s = scheduler2.date.date_to_str(scheduler2.config.api_date);
        scheduler2.templates[fullname] = function(date) {
          return "<a data-link-date='" + d_s(date) + "' href='#'>" + week_x(date) + "</a>";
        };
      };
      do_wrapper("week");
      do_wrapper("", "month_day");
      if (this.matrix) {
        for (var key in this.matrix)
          do_wrapper(key);
      }
      this._detachDomEvent(this._obj, "click", scheduler2._active_link_click);
      scheduler2.event(this._obj, "click", scheduler2._active_link_click);
    });
  }
  function agenda_legacy(scheduler2) {
    scheduler2.date.add_agenda_legacy = function(date) {
      return scheduler2.date.add(date, 1, "year");
    };
    scheduler2.templates.agenda_legacy_time = function(start, end, ev) {
      if (ev._timed)
        return this.day_date(ev.start_date, ev.end_date, ev) + " " + this.event_date(start);
      else
        return scheduler2.templates.day_date(start) + " &ndash; " + scheduler2.templates.day_date(end);
    };
    scheduler2.templates.agenda_legacy_text = function(start, end, event2) {
      return event2.text;
    };
    scheduler2.templates.agenda_legacy_date = function() {
      return "";
    };
    scheduler2.date.agenda_legacy_start = function() {
      return scheduler2.date.date_part(scheduler2._currentDate());
    };
    scheduler2.attachEvent("onTemplatesReady", function() {
      var old_dblclick_dhx_cal_data = scheduler2.dblclick_dhx_cal_data;
      scheduler2.dblclick_dhx_cal_data = function() {
        if (this._mode == "agenda_legacy") {
          if (!this.config.readonly && this.config.dblclick_create)
            this.addEventNow();
        } else {
          if (old_dblclick_dhx_cal_data)
            return old_dblclick_dhx_cal_data.apply(this, arguments);
        }
      };
      var old = scheduler2.render_data;
      scheduler2.render_data = function(evs) {
        if (this._mode == "agenda_legacy")
          fill_agenda_tab();
        else
          return old.apply(this, arguments);
      };
      var old_render_view_data = scheduler2.render_view_data;
      scheduler2.render_view_data = function() {
        if (this._mode == "agenda_legacy") {
          scheduler2._agendaScrollTop = scheduler2._els["dhx_cal_data"][0].childNodes[0].scrollTop;
          scheduler2._els["dhx_cal_data"][0].childNodes[0].scrollTop = 0;
        }
        return old_render_view_data.apply(this, arguments);
      };
      function set_full_view(mode) {
        if (mode) {
          var l = scheduler2.locale.labels;
          var rowAttr = scheduler2._waiAria.agendaHeadAttrString();
          var dateHeader = scheduler2._waiAria.agendaHeadDateString(l.date);
          var descriptionHeader = scheduler2._waiAria.agendaHeadDescriptionString(l.description);
          scheduler2._els["dhx_cal_header"][0].innerHTML = "<div " + rowAttr + " class='dhx_agenda_line dhx_agenda_line_header'><div " + dateHeader + ">" + l.date + "</div><span class = 'description_header' style='padding-left:25px' " + descriptionHeader + ">" + l.description + "</span></div>";
          scheduler2._table_view = true;
          scheduler2.set_sizes();
        }
      }
      function fill_agenda_tab() {
        var events = scheduler2.get_visible_events();
        events.sort(function(a, b) {
          return a.start_date > b.start_date ? 1 : -1;
        });
        var tableAttr = scheduler2._waiAria.agendaDataAttrString();
        var agendaEventAttrString;
        var html = "<div class='dhx_agenda_area' " + tableAttr + ">";
        for (var i = 0; i < events.length; i++) {
          var ev = events[i];
          var bg_color = ev.color ? "--dhx-scheduler-event-background:" + ev.color + ";" : "";
          var color = ev.textColor ? "--dhx-scheduler-event-color:" + ev.textColor + ";" : "";
          var ev_class = scheduler2.templates.event_class(ev.start_date, ev.end_date, ev);
          agendaEventAttrString = scheduler2._waiAria.agendaEventAttrString(ev);
          var agendaDetailsButtonAttr = scheduler2._waiAria.agendaDetailsBtnString();
          html += "<div " + agendaEventAttrString + " class='dhx_agenda_line" + (ev_class ? " " + ev_class : "") + "' event_id='" + ev.id + "' " + scheduler2.config.event_attribute + "='" + ev.id + "' style='" + color + bg_color + (ev._text_style || "") + "'><div class='dhx_agenda_event_time'>" + (scheduler2.config.rtl ? scheduler2.templates.agenda_time(ev.end_date, ev.start_date, ev) : scheduler2.templates.agenda_time(ev.start_date, ev.end_date, ev)) + "</div>";
          html += `<div ${agendaDetailsButtonAttr} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`;
          html += "<span>" + scheduler2.templates.agenda_text(ev.start_date, ev.end_date, ev) + "</span></div>";
        }
        html += "<div class='dhx_v_border'></div></div>";
        scheduler2._els["dhx_cal_data"][0].innerHTML = html;
        scheduler2._els["dhx_cal_data"][0].childNodes[0].scrollTop = scheduler2._agendaScrollTop || 0;
        var agenda_area = scheduler2._els["dhx_cal_data"][0].childNodes[0];
        var v_border = agenda_area.childNodes[agenda_area.childNodes.length - 1];
        v_border.style.height = agenda_area.offsetHeight < scheduler2._els["dhx_cal_data"][0].offsetHeight ? "100%" : agenda_area.offsetHeight + "px";
        var t2 = scheduler2._els["dhx_cal_data"][0].firstChild.childNodes;
        var dateElement = scheduler2._getNavDateElement();
        if (dateElement) {
          dateElement.innerHTML = scheduler2.templates.agenda_date(scheduler2._min_date, scheduler2._max_date, scheduler2._mode);
        }
        scheduler2._rendered = [];
        for (var i = 0; i < t2.length - 1; i++)
          scheduler2._rendered[i] = t2[i];
      }
      scheduler2.agenda_legacy_view = function(mode) {
        scheduler2._min_date = scheduler2.config.agenda_start || scheduler2.date.agenda_legacy_start(scheduler2._date);
        scheduler2._max_date = scheduler2.config.agenda_end || scheduler2.date.add_agenda_legacy(scheduler2._min_date, 1);
        set_full_view(mode);
        if (mode) {
          scheduler2._cols = null;
          scheduler2._colsS = null;
          scheduler2._table_view = true;
          fill_agenda_tab();
        } else {
          scheduler2._table_view = false;
        }
      };
    });
  }
  function agenda_view(scheduler2) {
    scheduler2.date.add_agenda = function(date, inc) {
      return scheduler2.date.add(date, 1 * inc, "month");
    };
    scheduler2.templates.agenda_time = function(start, end, ev) {
      if (ev._timed) {
        return `${this.event_date(start)} - ${this.event_date(end)}`;
      } else {
        return scheduler2.locale.labels.full_day;
      }
    };
    scheduler2.templates.agenda_text = function(start, end, ev) {
      return ev.text;
    };
    const dayDateToStr = scheduler2.date.date_to_str("%F %j");
    const dayDowToStr = scheduler2.date.date_to_str("%l");
    scheduler2.templates.agenda_day = function(date) {
      return `<div class="dhx_agenda_day_date">${dayDateToStr(date)}</div>
		<div class="dhx_agenda_day_dow">${dayDowToStr(date)}</div>`;
    };
    scheduler2.templates.agenda_date = function(start, end) {
      return scheduler2.templates.month_date(scheduler2.getState().date);
    };
    scheduler2.date.agenda_start = function(date) {
      return scheduler2.date.month_start(new Date(date));
    };
    let scrollTop = 0;
    scheduler2.attachEvent("onTemplatesReady", function() {
      var old_dblclick_dhx_cal_data = scheduler2.dblclick_dhx_cal_data;
      scheduler2.dblclick_dhx_cal_data = function() {
        if (this._mode == "agenda") {
          if (!this.config.readonly && this.config.dblclick_create)
            this.addEventNow();
        } else {
          if (old_dblclick_dhx_cal_data)
            return old_dblclick_dhx_cal_data.apply(this, arguments);
        }
      };
      var old = scheduler2.render_data;
      scheduler2.render_data = function(evs) {
        if (this._mode == "agenda")
          fill_agenda_tab();
        else
          return old.apply(this, arguments);
      };
      var old_render_view_data = scheduler2.render_view_data;
      scheduler2.render_view_data = function() {
        if (this._mode == "agenda") {
          scrollTop = scheduler2._els["dhx_cal_data"][0].scrollTop;
          scheduler2._els["dhx_cal_data"][0].scrollTop = 0;
        }
        return old_render_view_data.apply(this, arguments);
      };
      function fill_agenda_tab() {
        const events = scheduler2.get_visible_events();
        events.sort(function(a, b) {
          return a.start_date > b.start_date ? 1 : -1;
        });
        const eventsInDays = {};
        let currDate = scheduler2.getState().min_date;
        const maxDate = scheduler2.getState().max_date;
        while (currDate.valueOf() < maxDate.valueOf()) {
          eventsInDays[currDate.valueOf()] = [];
          currDate = scheduler2.date.add(currDate, 1, "day");
        }
        let anyEvents = false;
        events.forEach((ev) => {
          let eventStart = scheduler2.date.day_start(new Date(ev.start_date));
          while (eventStart.valueOf() < ev.end_date.valueOf()) {
            if (eventsInDays[eventStart.valueOf()]) {
              eventsInDays[eventStart.valueOf()].push(ev);
              anyEvents = true;
            }
            eventStart = scheduler2.date.day_start(scheduler2.date.add(eventStart, 1, "day"));
          }
        });
        if (!anyEvents) {
          scheduler2._els["dhx_cal_data"][0].innerHTML = renderEmptyView();
        } else {
          let html = "";
          for (let day in eventsInDays) {
            if (scheduler2.ignore_agenda && scheduler2.ignore_agenda(new Date(day * 1))) {
              continue;
            }
            html += renderDay(new Date(day * 1), eventsInDays[day]);
          }
          scheduler2._els["dhx_cal_data"][0].innerHTML = html;
        }
        scheduler2._els["dhx_cal_data"][0].scrollTop = scrollTop;
        let t2 = scheduler2._els["dhx_cal_data"][0].querySelectorAll(".dhx_cal_agenda_event_line");
        scheduler2._rendered = [];
        for (var i = 0; i < t2.length - 1; i++) {
          scheduler2._rendered[i] = t2[i];
        }
      }
      function renderEmptyView() {
        return `<div class="dhx_cal_agenda_no_events">${scheduler2.locale.labels.agenda_tab}</div>`;
      }
      function renderDay(day, events) {
        if (!events.length) {
          return "";
        }
        let html = `
<div class="dhx_cal_agenda_day" data-date="${scheduler2.templates.format_date(day)}" data-day="${day.getDay()}">
	<div class="dhx_cal_agenda_day_header">${scheduler2.templates.agenda_day(day)}</div>
	<div class="dhx_cal_agenda_day_events">
`;
        events.forEach((calendarEvent) => {
          html += renderOneEvent(day, calendarEvent);
        });
        html += `</div></div>`;
        return html;
      }
      function renderOneEvent(day, calendarEvent) {
        const dates = scheduler2.templates.agenda_time(calendarEvent.start_date, calendarEvent.end_date, calendarEvent);
        const selectedId = scheduler2.getState().select_id;
        const cls = scheduler2.templates.event_class(calendarEvent.start_date, calendarEvent.end_date, calendarEvent);
        const description = scheduler2.templates.agenda_text(calendarEvent.start_date, calendarEvent.end_date, calendarEvent);
        let style = "";
        if (calendarEvent.color || calendarEvent.textColor) {
          const bg = calendarEvent.color ? "--dhx-scheduler-event-background:" + calendarEvent.color + ";" : "";
          const color = calendarEvent.textColor ? "--dhx-scheduler-event-color:" + calendarEvent.textColor + ";" : "";
          style = ` style="${bg}${color}" `;
        }
        return `<div class="dhx_cal_agenda_event_line ${cls || ""} ${calendarEvent.id == selectedId ? "dhx_cal_agenda_event_line_selected" : ""}" ${style} ${scheduler2.config.event_attribute}="${calendarEvent.id}">
	<div class="dhx_cal_agenda_event_line_marker"></div>
	<div class="dhx_cal_agenda_event_line_time">${dates}</div>
	<div class="dhx_cal_agenda_event_line_text">${description}</div>
</div>`;
      }
      scheduler2.agenda_view = function(mode) {
        if (mode) {
          scheduler2._min_date = scheduler2.config.agenda_start || scheduler2.date.agenda_start(scheduler2._date);
          scheduler2._max_date = scheduler2.config.agenda_end || scheduler2.date.add_agenda(scheduler2._min_date, 1);
          scheduler2._cols = null;
          scheduler2._colsS = null;
          scheduler2._table_view = true;
          const dateHeader = scheduler2._getNavDateElement();
          dateHeader.innerHTML = scheduler2.templates.agenda_date(scheduler2._date);
          fill_agenda_tab();
        } else {
          scheduler2._table_view = false;
        }
      };
    });
  }
  function all_timed(scheduler2) {
    scheduler2.config.all_timed = "short";
    scheduler2.config.all_timed_month = false;
    scheduler2.ext.allTimed = { isMainAreaEvent: function(ev) {
      return !!(ev._timed || scheduler2.config.all_timed === true || scheduler2.config.all_timed == "short" && is_event_short(ev));
    } };
    var is_event_short = function(ev) {
      if (!((ev.end_date - ev.start_date) / (1e3 * 60 * 60) >= 24)) {
        return true;
      }
      if (scheduler2._drag_mode == "resize" && scheduler2._drag_id == ev.id) {
        return true;
      }
      return false;
    };
    scheduler2._safe_copy = function(event2) {
      var proto = null, copy = scheduler2._copy_event(event2);
      if (event2.event_pid) {
        proto = scheduler2.getEvent(event2.event_pid);
      }
      if (proto && proto.isPrototypeOf(event2)) {
        delete copy.event_length;
        delete copy.event_pid;
        delete copy.rec_pattern;
        delete copy.rec_type;
      }
      return copy;
    };
    var old_prerender_events_line = scheduler2._pre_render_events_line;
    var old_prerender_events_table = scheduler2._pre_render_events_table;
    var prerender_events = function(evs, hold) {
      if (!this._table_view) {
        return old_prerender_events_line.call(this, evs, hold);
      }
      return old_prerender_events_table.call(this, evs, hold);
    };
    scheduler2._pre_render_events_line = scheduler2._pre_render_events_table = function(evs, hold) {
      if (!this.config.all_timed || this._table_view && this._mode != "month" || this._mode == "month" && !this.config.all_timed_month)
        return prerender_events.call(this, evs, hold);
      for (var i = 0; i < evs.length; i++) {
        var ev = evs[i];
        if (ev._timed)
          continue;
        if (this.config.all_timed == "short") {
          if (!is_event_short(ev)) {
            if (this._mode != "month") {
              evs.splice(i--, 1);
            }
            continue;
          }
        }
        var ce = this._safe_copy(ev);
        if (!ev._virtual) {
          ce._first_chunk = true;
        } else {
          ce._first_chunk = false;
        }
        ce._drag_resize = false;
        ce._virtual = true;
        ce.start_date = new Date(ce.start_date);
        if (!isOvernightEvent(ev)) {
          ce.end_date = new Date(ev.end_date);
        } else {
          ce.end_date = getNextDay(ce.start_date);
          if (this.config.last_hour != 24) {
            ce.end_date = setDateTime(ce.start_date, this.config.last_hour);
          }
        }
        var event_changed = false;
        if (ce.start_date < this._max_date && ce.end_date > this._min_date && ce.start_date < ce.end_date) {
          evs[i] = ce;
          event_changed = true;
        }
        var re = this._safe_copy(ev);
        re._virtual = true;
        re.end_date = new Date(re.end_date);
        if (re.start_date < this._min_date)
          re.start_date = setDateTime(this._min_date, this.config.first_hour);
        else
          re.start_date = setDateTime(getNextDay(ev.start_date), this.config.first_hour);
        if (re.start_date < this._max_date && re.start_date < re.end_date) {
          if (event_changed) {
            evs.splice(i + 1, 0, re);
          } else {
            evs[i--] = re;
            continue;
          }
          re._last_chunk = false;
        } else {
          ce._last_chunk = true;
          ce._drag_resize = true;
        }
      }
      var redraw = this._drag_mode == "move" ? false : hold;
      return prerender_events.call(this, evs, redraw);
      function isOvernightEvent(ev2) {
        var next_day = getNextDay(ev2.start_date);
        return +ev2.end_date > +next_day;
      }
      function getNextDay(date) {
        var next_day = scheduler2.date.add(date, 1, "day");
        next_day = scheduler2.date.date_part(next_day);
        return next_day;
      }
      function setDateTime(date, hours) {
        var val = scheduler2.date.date_part(new Date(date));
        val.setHours(hours);
        return val;
      }
    };
    var old_get_visible_events = scheduler2.get_visible_events;
    scheduler2.get_visible_events = function(only_timed) {
      if (!(this.config.all_timed && this.config.multi_day))
        return old_get_visible_events.call(this, only_timed);
      return old_get_visible_events.call(this, false);
    };
    scheduler2.attachEvent("onBeforeViewChange", function(old_mode, old_date, mode, date) {
      scheduler2._allow_dnd = mode == "day" || mode == "week" || scheduler2.getView(mode);
      return true;
    });
    scheduler2._is_main_area_event = function(ev) {
      return scheduler2.ext.allTimed.isMainAreaEvent(ev);
    };
    var oldUpdate = scheduler2.updateEvent;
    scheduler2.updateEvent = function(id2) {
      var ev = scheduler2.getEvent(id2);
      var fullRedrawNeeded;
      var initial;
      if (ev) {
        fullRedrawNeeded = scheduler2.config.all_timed && !(scheduler2.isOneDayEvent(scheduler2._events[id2]) || scheduler2.getState().drag_id);
        if (fullRedrawNeeded) {
          initial = scheduler2.config.update_render;
          scheduler2.config.update_render = true;
        }
      }
      oldUpdate.apply(scheduler2, arguments);
      if (ev) {
        if (fullRedrawNeeded) {
          scheduler2.config.update_render = initial;
        }
      }
    };
  }
  function collision(scheduler2) {
    let temp_section;
    let before;
    scheduler2.config.collision_limit = 1;
    function _setTempSection(event_id) {
      const checked_mode = scheduler2._get_section_view();
      if (checked_mode && event_id) {
        temp_section = scheduler2.getEvent(event_id)[scheduler2._get_section_property()];
      }
    }
    scheduler2.attachEvent("onBeforeDrag", function(id2) {
      _setTempSection(id2);
      return true;
    });
    scheduler2.attachEvent("onBeforeLightbox", function(id2) {
      const ev = scheduler2.getEvent(id2);
      before = [ev.start_date, ev.end_date];
      _setTempSection(id2);
      return true;
    });
    scheduler2.attachEvent("onEventChanged", function(id2) {
      if (!id2 || !scheduler2.getEvent(id2))
        return true;
      const ev = scheduler2.getEvent(id2);
      if (!scheduler2.checkCollision(ev)) {
        if (!before)
          return false;
        ev.start_date = before[0];
        ev.end_date = before[1];
        ev._timed = this.isOneDayEvent(ev);
      }
      return true;
    });
    scheduler2.attachEvent("onBeforeEventChanged", function(ev, e, is_new) {
      return scheduler2.checkCollision(ev);
    });
    scheduler2.attachEvent("onEventAdded", function(id2, ev) {
      const result = scheduler2.checkCollision(ev);
      if (!result)
        scheduler2.deleteEvent(id2);
    });
    scheduler2.attachEvent("onEventSave", function(id2, edited_ev, is_new) {
      edited_ev = scheduler2._lame_clone(edited_ev);
      edited_ev.id = id2;
      if (!(edited_ev.start_date && edited_ev.end_date)) {
        const ev = scheduler2.getEvent(id2);
        edited_ev.start_date = new Date(ev.start_date);
        edited_ev.end_date = new Date(ev.end_date);
      }
      if (edited_ev.rrule && !edited_ev.recurring_event_id || edited_ev.rec_type) {
        scheduler2._roll_back_dates(edited_ev);
      }
      return scheduler2.checkCollision(edited_ev);
    });
    scheduler2._check_sections_collision = function(first, second) {
      const map_to = scheduler2._get_section_property();
      if (first[map_to] == second[map_to] && first.id != second.id)
        return true;
      return false;
    };
    scheduler2.checkCollision = function(ev) {
      let evs = [];
      const collision_limit = scheduler2.config.collision_limit;
      if (ev.rec_type) {
        let evs_dates = scheduler2.getRecDates(ev);
        for (let k = 0; k < evs_dates.length; k++) {
          let tevs = scheduler2.getEvents(evs_dates[k].start_date, evs_dates[k].end_date);
          for (let j = 0; j < tevs.length; j++) {
            if ((tevs[j].event_pid || tevs[j].id) != ev.id)
              evs.push(tevs[j]);
          }
        }
      } else if (ev.rrule) {
        let evs_dates = scheduler2.getRecDates(ev);
        for (let k = 0; k < evs_dates.length; k++) {
          let tevs = scheduler2.getEvents(evs_dates[k].start_date, evs_dates[k].end_date);
          for (let j = 0; j < tevs.length; j++) {
            if ((String(tevs[j].id).split("#")[0] || tevs[j].id) != ev.id)
              evs.push(tevs[j]);
          }
        }
      } else {
        evs = scheduler2.getEvents(ev.start_date, ev.end_date);
        for (let i = 0; i < evs.length; i++) {
          let concurrent = evs[i];
          if (concurrent.id == ev.id || concurrent.event_length && [concurrent.event_pid, concurrent.event_length].join("#") == ev.id) {
            evs.splice(i, 1);
            break;
          }
          if (concurrent.recurring_event_id && [concurrent.recurring_event_id, concurrent._pid_time].join("#") == ev.id) {
            evs.splice(i, 1);
            break;
          }
        }
      }
      const checked_mode = scheduler2._get_section_view();
      const map_to = scheduler2._get_section_property();
      let single = true;
      if (checked_mode) {
        let count = 0;
        for (let i = 0; i < evs.length; i++) {
          if (evs[i].id != ev.id && this._check_sections_collision(evs[i], ev))
            count++;
        }
        if (count >= collision_limit) {
          single = false;
        }
      } else {
        if (evs.length >= collision_limit)
          single = false;
      }
      if (!single) {
        let res = !scheduler2.callEvent("onEventCollision", [ev, evs]);
        if (!res) {
          ev[map_to] = temp_section || ev[map_to];
        }
        return res;
      }
      return single;
    };
  }
  function container_autoresize(scheduler2) {
    scheduler2.config.container_autoresize = true;
    scheduler2.config.month_day_min_height = 90;
    scheduler2.config.min_grid_size = 25;
    scheduler2.config.min_map_size = 400;
    var old_pre_render_event = scheduler2._pre_render_events;
    var active = true;
    var total_height = 0;
    var multiday_height = 0;
    scheduler2._pre_render_events = function(evs, hold) {
      if (!(scheduler2.config.container_autoresize && active)) {
        return old_pre_render_event.apply(this, arguments);
      }
      var hb = this.xy.bar_height;
      var h_old = this._colsS.heights;
      var h = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0];
      var data = this._els["dhx_cal_data"][0];
      if (!this._table_view)
        evs = this._pre_render_events_line(evs, hold);
      else
        evs = this._pre_render_events_table(evs, hold);
      if (this._table_view) {
        if (hold) {
          this._colsS.heights = h_old;
        } else {
          var evl = data.firstChild;
          const rows = evl.querySelectorAll(".dhx_cal_month_row");
          if (rows && rows.length) {
            for (var i = 0; i < rows.length; i++) {
              h[i]++;
              if (h[i] * hb > this._colsS.height - this.xy.month_head_height) {
                var cells = rows[i].querySelectorAll(".dhx_cal_month_cell");
                var cHeight = this._colsS.height - this.xy.month_head_height;
                if (this.config.max_month_events * 1 !== this.config.max_month_events || h[i] <= this.config.max_month_events) {
                  cHeight = h[i] * hb;
                } else if ((this.config.max_month_events + 1) * hb > this._colsS.height - this.xy.month_head_height) {
                  cHeight = (this.config.max_month_events + 1) * hb;
                }
                rows[i].style.height = cHeight + this.xy.month_head_height + "px";
                for (var j = 0; j < cells.length; j++) {
                  cells[j].childNodes[1].style.height = cHeight + "px";
                }
                h[i] = (h[i - 1] || 0) + cells[0].offsetHeight;
              }
              h[i] = (h[i - 1] || 0) + rows[i].querySelectorAll(".dhx_cal_month_cell")[0].offsetHeight;
            }
            h.unshift(0);
            if (evl.parentNode.offsetHeight < evl.parentNode.scrollHeight && !evl._h_fix)
              ;
          } else {
            if (!evs.length && this._els["dhx_multi_day"][0].style.visibility == "visible")
              h[0] = -1;
            if (evs.length || h[0] == -1) {
              var dh = (h[0] + 1) * hb + 1;
              if (multiday_height != dh + 1) {
                this._obj.style.height = total_height - multiday_height + dh - 1 + "px";
              }
              dh += "px";
              const navHeight = this._els["dhx_cal_navline"][0].offsetHeight;
              const headerHeight = this._els["dhx_cal_header"][0].offsetHeight;
              data.style.height = this._obj.offsetHeight - navHeight - headerHeight - (this.xy.margin_top || 0) + "px";
              var last = this._els["dhx_multi_day"][0];
              last.style.height = dh;
              last.style.visibility = h[0] == -1 ? "hidden" : "visible";
              last.style.display = h[0] == -1 ? "none" : "";
              last = this._els["dhx_multi_day"][1];
              last.style.height = dh;
              last.style.visibility = h[0] == -1 ? "hidden" : "visible";
              last.style.display = h[0] == -1 ? "none" : "";
              last.className = h[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small";
              this._dy_shift = (h[0] + 1) * hb;
              h[0] = 0;
            }
          }
        }
      }
      return evs;
    };
    var checked_divs = ["dhx_cal_navline", "dhx_cal_header", "dhx_multi_day", "dhx_cal_data"];
    var updateContainterHeight = function(is_repaint) {
      total_height = 0;
      for (var i = 0; i < checked_divs.length; i++) {
        var className = checked_divs[i];
        var checked_div = scheduler2._els[className] ? scheduler2._els[className][0] : null;
        var height = 0;
        switch (className) {
          case "dhx_cal_navline":
          case "dhx_cal_header":
            height = checked_div.offsetHeight;
            break;
          case "dhx_multi_day":
            height = checked_div ? checked_div.offsetHeight - 1 : 0;
            multiday_height = height;
            break;
          case "dhx_cal_data":
            var mode = scheduler2.getState().mode;
            if (checked_div.childNodes[1] && mode != "month") {
              let maxHeight = 0;
              for (let i2 = 0; i2 < checked_div.childNodes.length; i2++) {
                if (checked_div.childNodes[i2].offsetHeight > maxHeight) {
                  maxHeight = checked_div.childNodes[i2].offsetHeight;
                }
              }
              height = maxHeight;
            } else {
              height = Math.max(checked_div.offsetHeight - 1, checked_div.scrollHeight);
            }
            if (mode == "month") {
              if (scheduler2.config.month_day_min_height && !is_repaint) {
                var rows_length = checked_div.querySelectorAll(".dhx_cal_month_row").length;
                height = rows_length * scheduler2.config.month_day_min_height;
              }
              if (is_repaint) {
                checked_div.style.height = height + "px";
              }
            } else if (mode == "year") {
              height = 190 * scheduler2.config.year_y;
            } else if (mode == "agenda") {
              height = 0;
              if (checked_div.children && checked_div.children.length) {
                if (checked_div.children.length === 1 && checked_div.children[0].classList.contains("dhx_cal_agenda_no_events")) {
                  height = 300;
                } else {
                  for (var j = 0; j < checked_div.children.length; j++) {
                    height += checked_div.children[j].offsetHeight;
                  }
                }
              }
              if (height + 2 < scheduler2.config.min_grid_size) {
                height = scheduler2.config.min_grid_size;
              } else {
                height += 2;
              }
            } else if (mode == "week_agenda") {
              var min_height = scheduler2.xy.week_agenda_scale_height + scheduler2.config.min_grid_size, cur_height;
              var column;
              for (var k = 0; k < checked_div.childNodes.length; k++) {
                column = checked_div.childNodes[k];
                for (var j = 0; j < column.childNodes.length; j++) {
                  var innerHeight = 0, eventsContainer = column.childNodes[j].childNodes[1];
                  for (var g = 0; g < eventsContainer.childNodes.length; g++) {
                    innerHeight += eventsContainer.childNodes[g].offsetHeight;
                  }
                  cur_height = innerHeight + scheduler2.xy.week_agenda_scale_height;
                  cur_height = k == 1 && (j == 2 || j == 3) ? cur_height * 2 : cur_height;
                  if (cur_height > min_height) {
                    min_height = cur_height;
                  }
                }
              }
              height = min_height * 3;
            } else if (mode == "map") {
              height = 0;
              var evs = checked_div.querySelectorAll(".dhx_map_line");
              for (var j = 0; j < evs.length; j++) {
                height += evs[j].offsetHeight;
              }
              if (height + 2 < scheduler2.config.min_map_size) {
                height = scheduler2.config.min_map_size;
              } else {
                height += 2;
              }
            } else if (scheduler2._gridView) {
              height = 0;
              if (checked_div.childNodes[1].childNodes[0].childNodes && checked_div.childNodes[1].childNodes[0].childNodes.length) {
                var evs = checked_div.childNodes[1].childNodes[0].childNodes[0].childNodes;
                for (var j = 0; j < evs.length; j++) {
                  height += evs[j].offsetHeight;
                }
                height += 2;
                if (height < scheduler2.config.min_grid_size) {
                  height = scheduler2.config.min_grid_size;
                }
              } else {
                height = scheduler2.config.min_grid_size;
              }
            }
            if (scheduler2.matrix && scheduler2.matrix[mode]) {
              if (is_repaint) {
                height += 0;
                checked_div.style.height = height + "px";
              } else {
                height = 0;
                var cfg = scheduler2.matrix[mode];
                var rows = cfg.y_unit;
                for (var r = 0; r < rows.length; r++) {
                  height += cfg.getSectionHeight(rows[r].key);
                }
                if (scheduler2.$container.clientWidth != scheduler2.$container.scrollWidth) {
                  height += getScrollSize();
                }
              }
              height -= 1;
            }
            if (mode == "day" || mode == "week" || scheduler2._props && scheduler2._props[mode]) {
              height += 2;
            }
            break;
        }
        height += 1;
        total_height += height;
      }
      scheduler2._obj.style.height = total_height + "px";
      if (!is_repaint)
        scheduler2.updateView();
    };
    function callUpdate() {
      active = false;
      scheduler2.callEvent("onAfterSchedulerResize", []);
      active = true;
    }
    var conditionalUpdateContainerHeight = function() {
      if (!(scheduler2.config.container_autoresize && active))
        return true;
      var mode = scheduler2.getState().mode;
      if (!mode) {
        return true;
      }
      var asyncRepaint = window.requestAnimationFrame || window.setTimeout;
      var scrollTop = document.documentElement.scrollTop;
      asyncRepaint(function() {
        if (scheduler2.$destroyed || !scheduler2.$initialized) {
          return;
        }
        updateContainterHeight();
      });
      if (scheduler2.matrix && scheduler2.matrix[mode] || mode == "month") {
        asyncRepaint(function() {
          if (scheduler2.$destroyed || !scheduler2.$initialized) {
            return;
          }
          updateContainterHeight(true);
          document.documentElement.scrollTop = scrollTop;
          callUpdate();
        }, 1);
      } else {
        callUpdate();
      }
    };
    scheduler2.attachEvent("onBeforeViewChange", function() {
      var autosizeEnabled = scheduler2.config.container_autoresize;
      if (!scheduler2.xy.$original_scroll_width) {
        scheduler2.xy.$original_scroll_width = scheduler2.xy.scroll_width;
      }
      scheduler2.xy.scroll_width = autosizeEnabled ? 0 : scheduler2.xy.$original_scroll_width;
      if (scheduler2.matrix) {
        for (var i in scheduler2.matrix) {
          var timeline = scheduler2.matrix[i];
          if (!timeline.$original_section_autoheight) {
            timeline.$original_section_autoheight = timeline.section_autoheight;
          }
          if (autosizeEnabled) {
            timeline.section_autoheight = false;
          } else {
            timeline.section_autoheight = timeline.$original_section_autoheight;
          }
        }
      }
      return true;
    });
    scheduler2.attachEvent("onViewChange", conditionalUpdateContainerHeight);
    scheduler2.attachEvent("onXLE", conditionalUpdateContainerHeight);
    scheduler2.attachEvent("onEventChanged", conditionalUpdateContainerHeight);
    scheduler2.attachEvent("onEventCreated", conditionalUpdateContainerHeight);
    scheduler2.attachEvent("onEventAdded", conditionalUpdateContainerHeight);
    scheduler2.attachEvent("onEventDeleted", conditionalUpdateContainerHeight);
    scheduler2.attachEvent("onAfterSchedulerResize", conditionalUpdateContainerHeight);
    scheduler2.attachEvent("onClearAll", conditionalUpdateContainerHeight);
    scheduler2.attachEvent("onBeforeExpand", function() {
      active = false;
      return true;
    });
    scheduler2.attachEvent("onBeforeCollapse", function() {
      active = true;
      return true;
    });
    function getScrollSize() {
      var div = document.createElement("div");
      div.style.cssText = "visibility:hidden;position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;height:110px;min-height:100px;overflow-y:scroll;";
      document.body.appendChild(div);
      var size = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      return size;
    }
  }
  function cookie(scheduler2) {
    function setCookie(name, cookie_param, value) {
      var str = name + "=" + value + (cookie_param ? "; " + cookie_param : "");
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
    function getCookieName(scheduler3) {
      return (scheduler3._obj.id || "scheduler") + "_settings";
    }
    var first = true;
    scheduler2.attachEvent("onBeforeViewChange", function(oldMode, oldDate, mode, date) {
      if (first && scheduler2._get_url_nav) {
        var urlNavigationPlugin = scheduler2._get_url_nav();
        if (urlNavigationPlugin.date || urlNavigationPlugin.mode || urlNavigationPlugin.event) {
          first = false;
        }
      }
      var cookie2 = getCookieName(scheduler2);
      if (first) {
        first = false;
        var schedulerCookie = getCookie(cookie2);
        if (schedulerCookie) {
          if (!scheduler2._min_date) {
            scheduler2._min_date = date;
          }
          schedulerCookie = unescape(schedulerCookie).split("@");
          schedulerCookie[0] = this._helpers.parseDate(schedulerCookie[0]);
          var view = this.isViewExists(schedulerCookie[1]) ? schedulerCookie[1] : mode, date = !isNaN(+schedulerCookie[0]) ? schedulerCookie[0] : date;
          window.setTimeout(function() {
            if (scheduler2.$destroyed) {
              return;
            }
            scheduler2.setCurrentView(date, view);
          }, 1);
          return false;
        }
      }
      return true;
    });
    scheduler2.attachEvent("onViewChange", function(newMode, newDate) {
      var cookie2 = getCookieName(scheduler2);
      var text = escape(this._helpers.formatDate(newDate) + "@" + newMode);
      setCookie(cookie2, "expires=Sun, 31 Jan 9999 22:00:00 GMT", text);
    });
    var old_load = scheduler2._load;
    scheduler2._load = function() {
      var args = arguments;
      if (!scheduler2._date) {
        var that = this;
        window.setTimeout(function() {
          old_load.apply(that, args);
        }, 1);
      } else {
        old_load.apply(this, args);
      }
    };
  }
  const notImplemented = { alert: (extension, assert2) => {
    assert2(false, `The ${extension} extension is not included in this version of dhtmlxScheduler.<br>
		You may need a <a href="https://docs.dhtmlx.com/scheduler/editions_comparison.html" target="_blank">Professional version of the component</a>.<br>
		Contact us at <a href="https://dhtmlx.com/docs/contact.shtml" target="_blank">https://dhtmlx.com/docs/contact.shtml</a> if you have any questions.`);
  } };
  function daytimeline_restricted(scheduler2) {
    notImplemented.alert("Day Timeline", scheduler2.assert);
  }
  function drag_between_restricted(scheduler2) {
    notImplemented.alert("Drag Between", scheduler2.assert);
  }
  function editors(scheduler2) {
    scheduler2.form_blocks["combo"] = { render: function(sns) {
      if (!sns.cached_options)
        sns.cached_options = {};
      const sectionHeight = sns.height ? `style='height:${sns.height}px;'` : "";
      var res = "";
      res += `<div class='${sns.type}' ${sectionHeight}></div>`;
      return res;
    }, set_value: function(node, value, ev, config) {
      (function() {
        resetCombo();
        var id2 = scheduler2.attachEvent("onAfterLightbox", function() {
          resetCombo();
          scheduler2.detachEvent(id2);
        });
        function resetCombo() {
          if (node._combo && node._combo.DOMParent) {
            var combo2 = node._combo;
            if (combo2.unload) {
              combo2.unload();
            } else if (combo2.destructor) {
              combo2.destructor();
            }
            combo2.DOMParent = combo2.DOMelem = null;
          }
        }
      })();
      window.dhx_globalImgPath = config.image_path || "/";
      node._combo = new dhtmlXCombo(node, config.name, node.offsetWidth - 8);
      if (config.onchange)
        node._combo.attachEvent("onChange", config.onchange);
      if (config.options_height)
        node._combo.setOptionHeight(config.options_height);
      var combo = node._combo;
      combo.enableFilteringMode(config.filtering, config.script_path || null, !!config.cache);
      if (!config.script_path) {
        var all_options = [];
        for (var i = 0; i < config.options.length; i++) {
          var option = config.options[i];
          var single_option = [option.key, option.label, option.css];
          all_options.push(single_option);
        }
        combo.addOption(all_options);
        if (ev[config.map_to]) {
          var index = combo.getIndexByValue(ev[config.map_to]);
          combo.selectOption(index);
        }
      } else {
        var selected_id = ev[config.map_to];
        if (selected_id) {
          if (config.cached_options[selected_id]) {
            combo.addOption(selected_id, config.cached_options[selected_id]);
            combo.disable(1);
            combo.selectOption(0);
            combo.disable(0);
          } else {
            scheduler2.ajax.get(config.script_path + "?id=" + selected_id + "&uid=" + scheduler2.uid(), function(result) {
              var responseText = result.xmlDoc.responseText;
              var label;
              try {
                var res = JSON.parse(responseText);
                label = res.options[0].text;
              } catch (e) {
                var option2 = scheduler2.ajax.xpath("//option", result.xmlDoc)[0];
                label = option2.childNodes[0].nodeValue;
              }
              config.cached_options[selected_id] = label;
              combo.addOption(selected_id, label);
              combo.disable(1);
              combo.selectOption(0);
              combo.disable(0);
            });
          }
        } else {
          combo.setComboValue("");
        }
      }
    }, get_value: function(node, ev, config) {
      var selected_id = node._combo.getSelectedValue();
      if (config.script_path) {
        config.cached_options[selected_id] = node._combo.getSelectedText();
      }
      return selected_id;
    }, focus: function(node) {
    } };
    scheduler2.form_blocks["radio"] = { render: function(sns) {
      var res = "";
      res += `<div class='dhx_cal_ltext dhx_cal_radio ${sns.vertical ? "dhx_cal_radio_vertical" : ""}' style='height:${sns.height}px;'>`;
      for (var i = 0; i < sns.options.length; i++) {
        var id2 = scheduler2.uid();
        res += "<label class='dhx_cal_radio_item' for='" + id2 + "'><input id='" + id2 + "' type='radio' name='" + sns.name + "' value='" + sns.options[i].key + "'><span> " + sns.options[i].label + "</span></label>";
      }
      res += "</div>";
      return res;
    }, set_value: function(node, value, ev, config) {
      var radiobuttons = node.getElementsByTagName("input");
      for (var i = 0; i < radiobuttons.length; i++) {
        radiobuttons[i].checked = false;
        var checked_value = ev[config.map_to] || value;
        if (radiobuttons[i].value == checked_value) {
          radiobuttons[i].checked = true;
        }
      }
    }, get_value: function(node, ev, config) {
      var radiobuttons = node.getElementsByTagName("input");
      for (var i = 0; i < radiobuttons.length; i++) {
        if (radiobuttons[i].checked) {
          return radiobuttons[i].value;
        }
      }
    }, focus: function(node) {
    } };
    scheduler2.form_blocks["checkbox"] = { render: function(sns) {
      if (scheduler2.config.wide_form)
        return '<div class="dhx_cal_wide_checkbox"></div>';
      else
        return "";
    }, set_value: function(node, value, ev, config) {
      node = scheduler2._lightbox.querySelector(`#${config.id}`);
      if (config.height) {
        node.style.height = `${config.height}px`;
      }
      var id2 = scheduler2.uid();
      var isChecked = typeof config.checked_value != "undefined" ? value == config.checked_value : !!value;
      node.className += " dhx_cal_checkbox";
      var check_html = "<input id='" + id2 + "' type='checkbox' value='true' name='" + config.name + "'" + (isChecked ? "checked='true'" : "") + "'>";
      var label_html = "<label for='" + id2 + "'>" + (scheduler2.locale.labels["section_" + config.name] || config.name) + "</label>";
      if (scheduler2.config.wide_form) {
        node.innerHTML = label_html;
        node.nextSibling.innerHTML = check_html;
      } else
        node.innerHTML = check_html + label_html;
      if (config.handler) {
        var checkbox = node.getElementsByTagName("input")[0];
        if (checkbox.$_eventAttached) {
          return;
        }
        checkbox.$_eventAttached = true;
        scheduler2.event(checkbox, "click", config.handler);
      }
    }, get_value: function(node, ev, config) {
      node = scheduler2._lightbox.querySelector(`#${config.id}`);
      var checkbox = node.getElementsByTagName("input")[0];
      if (!checkbox)
        checkbox = node.nextSibling.getElementsByTagName("input")[0];
      return checkbox.checked ? config.checked_value || true : config.unchecked_value || false;
    }, focus: function(node) {
    } };
  }
  function expand(scheduler2) {
    scheduler2.ext.fullscreen = { toggleIcon: null };
    scheduler2.expand = function() {
      if (!scheduler2.callEvent("onBeforeExpand", []))
        return;
      var t2 = scheduler2._obj;
      do {
        t2._position = t2.style.position || "";
        t2.style.position = "static";
      } while ((t2 = t2.parentNode) && t2.style);
      t2 = scheduler2._obj;
      t2.style.position = "absolute";
      t2._width = t2.style.width;
      t2._height = t2.style.height;
      t2.style.width = t2.style.height = "100%";
      t2.style.top = t2.style.left = "0px";
      var top = document.body;
      top.scrollTop = 0;
      top = top.parentNode;
      if (top)
        top.scrollTop = 0;
      document.body._overflow = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";
      scheduler2._maximize();
      scheduler2.callEvent("onExpand", []);
    };
    scheduler2.collapse = function() {
      if (!scheduler2.callEvent("onBeforeCollapse", []))
        return;
      var t2 = scheduler2._obj;
      do {
        t2.style.position = t2._position;
      } while ((t2 = t2.parentNode) && t2.style);
      t2 = scheduler2._obj;
      t2.style.width = t2._width;
      t2.style.height = t2._height;
      document.body.style.overflow = document.body._overflow;
      scheduler2._maximize();
      scheduler2.callEvent("onCollapse", []);
    };
    scheduler2.attachEvent("onTemplatesReady", function() {
      var t2 = document.createElement("div");
      t2.className = "dhx_expand_icon";
      scheduler2.ext.fullscreen.toggleIcon = t2;
      t2.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g>
	<line x1="0.5" y1="5" x2="0.5" y2="3.0598e-08" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line y1="0.5" x2="5" y2="0.5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="0.5" y1="11" x2="0.5" y2="16" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line y1="15.5" x2="5" y2="15.5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="11" y1="0.5" x2="16" y2="0.5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="15.5" y1="2.18557e-08" x2="15.5" y2="5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="11" y1="15.5" x2="16" y2="15.5" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	<line x1="15.5" y1="16" x2="15.5" y2="11" stroke="var(--dhx-scheduler-base-colors-icons)"/>
	</g>
	</svg>
	`;
      scheduler2._obj.appendChild(t2);
      scheduler2.event(t2, "click", function() {
        if (!scheduler2.expanded)
          scheduler2.expand();
        else
          scheduler2.collapse();
      });
    });
    scheduler2._maximize = function() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.ext.fullscreen.toggleIcon.classList.add("dhx_expand_icon--expanded");
      } else {
        this.ext.fullscreen.toggleIcon.classList.remove("dhx_expand_icon--expanded");
      }
      var directions = ["left", "top"];
      for (var i = 0; i < directions.length; i++) {
        var prev_margin = scheduler2["_prev_margin_" + directions[i]];
        if (scheduler2.xy["margin_" + directions[i]]) {
          scheduler2["_prev_margin_" + directions[i]] = scheduler2.xy["margin_" + directions[i]];
          scheduler2.xy["margin_" + directions[i]] = 0;
        } else {
          if (prev_margin) {
            scheduler2.xy["margin_" + directions[i]] = scheduler2["_prev_margin_" + directions[i]];
            delete scheduler2["_prev_margin_" + directions[i]];
          }
        }
      }
      scheduler2.setCurrentView();
    };
  }
  function grid_view(scheduler2) {
    notImplemented.alert("Grid", scheduler2.assert);
  }
  function html_templates(scheduler2) {
    scheduler2.attachEvent("onTemplatesReady", function() {
      var els = document.body.getElementsByTagName("DIV");
      for (var i = 0; i < els.length; i++) {
        var cs2 = els[i].className || "";
        cs2 = cs2.split(":");
        if (cs2.length == 2 && cs2[0] == "template") {
          var code = 'return "' + (els[i].innerHTML || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\n\r]+/g, "") + '";';
          code = unescape(code).replace(/\{event\.([a-z]+)\}/g, function(all, mask) {
            return '"+ev.' + mask + '+"';
          });
          scheduler2.templates[cs2[1]] = Function("start", "end", "ev", code);
          els[i].style.display = "none";
        }
      }
    });
  }
  function keyboard_shortcuts(scheduler2) {
    scheduler2.$keyboardNavigation.shortcuts = { createCommand: function() {
      return { modifiers: { shift: false, alt: false, ctrl: false, meta: false }, keyCode: null };
    }, parse: function(shortcut) {
      var commands = [];
      var expr = this.getExpressions(this.trim(shortcut));
      for (var i = 0; i < expr.length; i++) {
        var words = this.getWords(expr[i]);
        var command = this.createCommand();
        for (var j = 0; j < words.length; j++) {
          if (this.commandKeys[words[j]]) {
            command.modifiers[words[j]] = true;
          } else if (this.specialKeys[words[j]]) {
            command.keyCode = this.specialKeys[words[j]];
          } else {
            command.keyCode = words[j].charCodeAt(0);
          }
        }
        commands.push(command);
      }
      return commands;
    }, getCommandFromEvent: function(domEvent) {
      var command = this.createCommand();
      command.modifiers.shift = !!domEvent.shiftKey;
      command.modifiers.alt = !!domEvent.altKey;
      command.modifiers.ctrl = !!domEvent.ctrlKey;
      command.modifiers.meta = !!domEvent.metaKey;
      command.keyCode = domEvent.which || domEvent.keyCode;
      if (command.keyCode >= 96 && command.keyCode <= 105) {
        command.keyCode -= 48;
      }
      var printableKey = String.fromCharCode(command.keyCode);
      if (printableKey) {
        command.keyCode = printableKey.toLowerCase().charCodeAt(0);
      }
      return command;
    }, getHashFromEvent: function(domEvent) {
      return this.getHash(this.getCommandFromEvent(domEvent));
    }, getHash: function(command) {
      var parts = [];
      for (var i in command.modifiers) {
        if (command.modifiers[i]) {
          parts.push(i);
        }
      }
      parts.push(command.keyCode);
      return parts.join(this.junctionChar);
    }, getExpressions: function(shortcut) {
      return shortcut.split(this.junctionChar);
    }, getWords: function(term) {
      return term.split(this.combinationChar);
    }, trim: function(shortcut) {
      return shortcut.replace(/\s/g, "");
    }, junctionChar: ",", combinationChar: "+", commandKeys: { shift: 16, alt: 18, ctrl: 17, meta: true }, specialKeys: { backspace: 8, tab: 9, enter: 13, esc: 27, space: 32, up: 38, down: 40, left: 37, right: 39, home: 36, end: 35, pageup: 33, pagedown: 34, delete: 46, insert: 45, plus: 107, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123 } };
  }
  function eventhandler(scheduler2) {
    scheduler2.$keyboardNavigation.EventHandler = { _handlers: null, findHandler: function(command) {
      if (!this._handlers)
        this._handlers = {};
      var shortcuts = scheduler2.$keyboardNavigation.shortcuts;
      var hash = shortcuts.getHash(command);
      return this._handlers[hash];
    }, doAction: function(command, e) {
      var handler = this.findHandler(command);
      if (handler) {
        handler.call(this, e);
        if (e.preventDefault)
          e.preventDefault();
        else
          e.returnValue = false;
      }
    }, bind: function(shortcut, handler) {
      if (!this._handlers)
        this._handlers = {};
      var shortcuts = scheduler2.$keyboardNavigation.shortcuts;
      var commands = shortcuts.parse(shortcut);
      for (var i = 0; i < commands.length; i++) {
        this._handlers[shortcuts.getHash(commands[i])] = handler;
      }
    }, unbind: function(shortcut) {
      var shortcuts = scheduler2.$keyboardNavigation.shortcuts;
      var commands = shortcuts.parse(shortcut);
      for (var i = 0; i < commands.length; i++) {
        if (this._handlers[shortcuts.getHash(commands[i])]) {
          delete this._handlers[shortcuts.getHash(commands[i])];
        }
      }
    }, bindAll: function(map) {
      for (var i in map) {
        this.bind(i, map[i]);
      }
    }, initKeys: function() {
      if (!this._handlers)
        this._handlers = {};
      if (this.keys) {
        this.bindAll(this.keys);
      }
    } };
  }
  function trap_modal_focus(scheduler2) {
    (function() {
      scheduler2.$keyboardNavigation.getFocusableNodes = scheduler2._getFocusableNodes;
      scheduler2.$keyboardNavigation.trapFocus = function trapFocus(root, e) {
        if (e.keyCode != 9)
          return false;
        var focusable = scheduler2.$keyboardNavigation.getFocusableNodes(root);
        var currentFocus = document.activeElement;
        var currentIndex = -1;
        for (var i = 0; i < focusable.length; i++) {
          if (focusable[i] == currentFocus) {
            currentIndex = i;
            break;
          }
        }
        var nextIndex, nextItem;
        if (e.shiftKey) {
          nextIndex = currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
          nextItem = focusable[nextIndex];
          if (nextItem) {
            nextItem.focus();
            e.preventDefault();
            return true;
          }
        } else {
          nextIndex = currentIndex >= focusable.length - 1 ? 0 : currentIndex + 1;
          nextItem = focusable[nextIndex];
          if (nextItem) {
            nextItem.focus();
            e.preventDefault();
            return true;
          }
        }
        return false;
      };
    })();
  }
  function marker(scheduler2) {
    scheduler2.$keyboardNavigation.marker = { clear: function() {
      var divs = scheduler2.$container.querySelectorAll(".dhx_focus_slot");
      for (var i = 0; i < divs.length; i++) {
        divs[i].parentNode.removeChild(divs[i]);
      }
    }, createElement: function() {
      var element = document.createElement("div");
      element.setAttribute("tabindex", -1);
      element.className = "dhx_focus_slot";
      return element;
    }, renderMultiple: function(start, end, method) {
      var divs = [];
      var currentStart = new Date(start);
      var currentEnd = new Date(Math.min(end.valueOf(), scheduler2.date.add(scheduler2.date.day_start(new Date(start)), 1, "day").valueOf()));
      while (currentStart.valueOf() < end.valueOf()) {
        divs = divs.concat(method.call(this, currentStart, new Date(Math.min(currentEnd.valueOf(), end.valueOf()))));
        currentStart = scheduler2.date.day_start(scheduler2.date.add(currentStart, 1, "day"));
        currentEnd = scheduler2.date.day_start(scheduler2.date.add(currentStart, 1, "day"));
        currentEnd = new Date(Math.min(currentEnd.valueOf(), end.valueOf()));
      }
      return divs;
    }, render: function(start, end, section) {
      this.clear();
      var divs = [];
      var modes = scheduler2.$keyboardNavigation.TimeSlot.prototype._modes;
      var view = scheduler2.$keyboardNavigation.TimeSlot.prototype._getMode();
      switch (view) {
        case modes.units:
          divs = this.renderVerticalMarker(start, end, section);
          break;
        case modes.timeline:
          divs = this.renderTimelineMarker(start, end, section);
          break;
        case modes.year:
          divs = divs.concat(this.renderMultiple(start, end, this.renderYearMarker));
          break;
        case modes.month:
          divs = this.renderMonthMarker(start, end);
          break;
        case modes.weekAgenda:
          divs = divs.concat(this.renderMultiple(start, end, this.renderWeekAgendaMarker));
          break;
        case modes.list:
          divs = this.renderAgendaMarker(start, end);
          break;
        case modes.dayColumns:
          divs = divs.concat(this.renderMultiple(start, end, this.renderVerticalMarker));
          break;
      }
      this.addWaiAriaLabel(divs, start, end, section);
      this.addDataAttributes(divs, start, end, section);
      for (var i = divs.length - 1; i >= 0; i--) {
        if (divs[i].offsetWidth) {
          return divs[i];
        }
      }
      return null;
    }, addDataAttributes: function(divs, start, end, section) {
      var dateToStr = scheduler2.date.date_to_str(scheduler2.config.api_date);
      var from = dateToStr(start), to = dateToStr(end);
      for (var i = 0; i < divs.length; i++) {
        divs[i].setAttribute("data-start-date", from);
        divs[i].setAttribute("data-end-date", to);
        if (section) {
          divs[i].setAttribute("data-section", section);
        }
      }
    }, addWaiAriaLabel: function(divs, start, end, section) {
      var label = "";
      var state = scheduler2.getState();
      var mode = state.mode;
      var dateTimeLabel = false;
      label += scheduler2.templates.day_date(start);
      if (scheduler2.date.day_start(new Date(start)).valueOf() != start.valueOf()) {
        label += " " + scheduler2.templates.hour_scale(start);
        dateTimeLabel = true;
      }
      if (scheduler2.date.day_start(new Date(start)).valueOf() != scheduler2.date.day_start(new Date(end)).valueOf()) {
        label += " - " + scheduler2.templates.day_date(end);
        if (dateTimeLabel || scheduler2.date.day_start(new Date(end)).valueOf() != end.valueOf()) {
          label += " " + scheduler2.templates.hour_scale(end);
        }
      }
      if (section) {
        if (scheduler2.matrix && scheduler2.matrix[mode]) {
          const timeline = scheduler2.matrix[mode];
          const sectionObject = timeline.y_unit[timeline.order[section]];
          label += ", " + scheduler2.templates[mode + "_scale_label"](sectionObject.key, sectionObject.label, sectionObject);
        } else if (scheduler2._props && scheduler2._props[mode]) {
          const units = scheduler2._props[mode];
          const sectionObject = units.options[units.order[section]];
          label += ", " + scheduler2.templates[mode + "_scale_text"](sectionObject.key, sectionObject.label, sectionObject);
        }
      }
      for (var i = 0; i < divs.length; i++) {
        scheduler2._waiAria.setAttributes(divs[i], { "aria-label": label, "aria-live": "polite" });
      }
    }, renderWeekAgendaMarker: function(start_date, end_date) {
      var divs = scheduler2.$container.querySelectorAll(".dhx_wa_day_cont .dhx_wa_scale_bar");
      var currDate = scheduler2.date.week_start(new Date(scheduler2.getState().min_date));
      var index = -1;
      var markerDate = scheduler2.date.day_start(new Date(start_date));
      for (var i = 0; i < divs.length; i++) {
        index++;
        if (scheduler2.date.day_start(new Date(currDate)).valueOf() == markerDate.valueOf()) {
          break;
        } else {
          currDate = scheduler2.date.add(currDate, 1, "day");
        }
      }
      if (index != -1)
        return this._wrapDiv(divs[index]);
      return [];
    }, _wrapDiv: function(cell) {
      var marker2 = this.createElement();
      marker2.style.top = cell.offsetTop + "px";
      marker2.style.left = cell.offsetLeft + "px";
      marker2.style.width = cell.offsetWidth + "px";
      marker2.style.height = cell.offsetHeight + "px";
      cell.appendChild(marker2);
      return [marker2];
    }, renderYearMarker: function(start_date, end_date) {
      var cell = scheduler2._get_year_cell(start_date);
      cell.style.position = "relative";
      var marker2 = this.createElement();
      marker2.style.top = "0px";
      marker2.style.left = "0px";
      marker2.style.width = "100%";
      marker2.style.height = "100%";
      cell.appendChild(marker2);
      return [marker2];
    }, renderAgendaMarker: function(start_date, end_date) {
      var block = this.createElement();
      block.style.height = "1px";
      block.style.width = "100%";
      block.style.opacity = 1;
      block.style.top = "0px";
      block.style.left = "0px";
      scheduler2.$container.querySelector(".dhx_cal_data").appendChild(block);
      return [block];
    }, renderTimelineMarker: function(start_date, end_date, section) {
      var view_opts = scheduler2._lame_copy({}, scheduler2.matrix[scheduler2._mode]);
      var areas = view_opts._scales;
      view_opts.round_position = false;
      var blocks = [];
      var min_date = start_date ? new Date(start_date) : scheduler2._min_date;
      var max_date = end_date ? new Date(end_date) : scheduler2._max_date;
      if (min_date.valueOf() < scheduler2._min_date.valueOf())
        min_date = new Date(scheduler2._min_date);
      if (max_date.valueOf() > scheduler2._max_date.valueOf())
        max_date = new Date(scheduler2._max_date);
      if (!view_opts._trace_x)
        return blocks;
      for (var i = 0; i < view_opts._trace_x.length; i++) {
        if (scheduler2._is_column_visible(view_opts._trace_x[i]))
          break;
      }
      if (i == view_opts._trace_x.length)
        return blocks;
      var area = areas[section];
      if (!(min_date < end_date && max_date > start_date))
        return blocks;
      var block = this.createElement();
      let start_pos;
      let end_pos;
      function set_date_part(source, target) {
        target.setDate(1);
        target.setFullYear(source.getFullYear());
        target.setMonth(source.getMonth());
        target.setDate(source.getDate());
      }
      if (!scheduler2.getView().days) {
        start_pos = scheduler2._timeline_getX({ start_date }, false, view_opts);
        end_pos = scheduler2._timeline_getX({ start_date: end_date }, false, view_opts);
      } else {
        const tempStart = new Date(start_date);
        set_date_part(scheduler2._min_date, tempStart);
        const tempEnd = new Date(end_date);
        set_date_part(scheduler2._min_date, tempEnd);
        start_pos = scheduler2._timeline_getX({ start_date: tempStart }, false, view_opts);
        end_pos = scheduler2._timeline_getX({ start_date: tempEnd }, false, view_opts);
      }
      var height = view_opts._section_height[section] - 1 || view_opts.dy - 1;
      var top = 0;
      if (scheduler2._isRender("cell")) {
        top = area.offsetTop;
        start_pos += view_opts.dx;
        end_pos += view_opts.dx;
        area = scheduler2.$container.querySelector(".dhx_cal_data");
      }
      var width = Math.max(1, end_pos - start_pos - 1);
      let direction = "left";
      if (scheduler2.config.rtl) {
        direction = "right";
      }
      block.style.cssText = `height:${height}px; ${direction}:${start_pos}px; width:${width}px; top:${top}px;`;
      if (area) {
        area.appendChild(block);
        blocks.push(block);
      }
      return blocks;
    }, renderMonthCell: function(date) {
      var cells = scheduler2.$container.querySelectorAll(".dhx_month_head");
      var divs = [];
      for (var i = 0; i < cells.length; i++) {
        divs.push(cells[i].parentNode);
      }
      var firstDate = scheduler2.date.week_start(new Date(scheduler2.getState().min_date));
      var index = -1;
      var weekNumber = 0;
      var dayIndex = -1;
      var currDate = firstDate;
      var markerDate = scheduler2.date.day_start(new Date(date));
      for (var i = 0; i < divs.length; i++) {
        index++;
        if (dayIndex == 6) {
          weekNumber++;
          dayIndex = 0;
        } else {
          dayIndex++;
        }
        if (scheduler2.date.day_start(new Date(currDate)).valueOf() == markerDate.valueOf()) {
          break;
        } else {
          currDate = scheduler2.date.add(currDate, 1, "day");
        }
      }
      if (index == -1) {
        return [];
      }
      var left = scheduler2._colsS[dayIndex];
      var top = scheduler2._colsS.heights[weekNumber];
      var div = this.createElement();
      div.style.top = top + "px";
      div.style.left = left + "px";
      div.style.width = scheduler2._cols[dayIndex] + "px";
      div.style.height = (scheduler2._colsS.heights[weekNumber + 1] - top || scheduler2._colsS.height) + "px";
      var container = scheduler2.$container.querySelector(".dhx_cal_data");
      var datatable = container.querySelector(".dhx_cal_month_table");
      if (datatable.nextSibling) {
        container.insertBefore(div, datatable.nextSibling);
      } else {
        container.appendChild(div);
      }
      return div;
    }, renderMonthMarker: function(start_date, end_date) {
      var res = [];
      var currentDate = start_date;
      while (currentDate.valueOf() < end_date.valueOf()) {
        res.push(this.renderMonthCell(currentDate));
        currentDate = scheduler2.date.add(currentDate, 1, "day");
      }
      return res;
    }, renderVerticalMarker: function(start_date, end_date, section) {
      var index = scheduler2.locate_holder_day(start_date);
      var divs = [];
      var area = null;
      var c = scheduler2.config;
      if (scheduler2._ignores[index])
        return divs;
      if (scheduler2._props && scheduler2._props[scheduler2._mode] && section) {
        var view = scheduler2._props[scheduler2._mode];
        index = view.order[section];
        var inner_index = view.order[section];
        if (!(view.days > 1)) {
          index = inner_index;
          if (view.size && index > view.position + view.size) {
            index = 0;
          }
        } else {
          index = scheduler2.locate_holder_day(start_date) + inner_index;
        }
      }
      area = scheduler2.locate_holder(index);
      if (!area || area.querySelector(".dhx_scale_hour")) {
        return document.createElement("div");
      }
      var start = Math.max(start_date.getHours() * 60 + start_date.getMinutes(), c.first_hour * 60);
      var end = Math.min(end_date.getHours() * 60 + end_date.getMinutes(), c.last_hour * 60);
      if (!end && scheduler2.date.day_start(new Date(end_date)).valueOf() > scheduler2.date.day_start(new Date(start_date)).valueOf()) {
        end = c.last_hour * 60;
      }
      if (end <= start) {
        return [];
      }
      var block = this.createElement();
      var all_hours_height = scheduler2.config.hour_size_px * c.last_hour + 1;
      var hour_ms = 60 * 60 * 1e3;
      block.style.top = Math.round((start * 60 * 1e3 - scheduler2.config.first_hour * hour_ms) * scheduler2.config.hour_size_px / hour_ms) % all_hours_height + "px";
      block.style.lineHeight = block.style.height = Math.max(Math.round((end - start) * 60 * 1e3 * scheduler2.config.hour_size_px / hour_ms) % all_hours_height, 1) + "px";
      block.style.width = "100%";
      area.appendChild(block);
      divs.push(block);
      return divs[0];
    } };
  }
  function scheduler_node(scheduler2) {
    scheduler2.$keyboardNavigation.SchedulerNode = function() {
    };
    scheduler2.$keyboardNavigation.SchedulerNode.prototype = scheduler2._compose(scheduler2.$keyboardNavigation.EventHandler, { getDefaultNode: function() {
      var node = new scheduler2.$keyboardNavigation.TimeSlot();
      if (!node.isValid()) {
        node = node.fallback();
      }
      return node;
    }, _modes: { month: "month", year: "year", dayColumns: "dayColumns", timeline: "timeline", units: "units", weekAgenda: "weekAgenda", list: "list" }, getMode: function() {
      var state = scheduler2.getState();
      var mode = state.mode;
      if (scheduler2.matrix && scheduler2.matrix[mode]) {
        return this._modes.timeline;
      } else if (scheduler2._props && scheduler2._props[mode]) {
        return this._modes.units;
      } else if (mode == "month") {
        return this._modes.month;
      } else if (mode == "year") {
        return this._modes.year;
      } else if (mode == "week_agenda") {
        return this._modes.weekAgenda;
      } else if (mode == "map" || mode == "agenda" || scheduler2._grid && scheduler2["grid_" + mode]) {
        return this._modes.list;
      } else {
        return this._modes.dayColumns;
      }
    }, focus: function() {
      scheduler2.focus();
    }, blur: function() {
    }, disable: function() {
      scheduler2.$container.setAttribute("tabindex", "0");
    }, enable: function() {
      if (scheduler2.$container)
        scheduler2.$container.removeAttribute("tabindex");
    }, isEnabled: function() {
      return scheduler2.$container.hasAttribute("tabindex");
    }, _compareEvents: function(a, b) {
      if (a.start_date.valueOf() == b.start_date.valueOf())
        return a.id > b.id ? 1 : -1;
      return a.start_date.valueOf() > b.start_date.valueOf() ? 1 : -1;
    }, _pickEvent: function(from, to, startId, reverse) {
      var range2 = scheduler2.getState();
      from = new Date(Math.max(range2.min_date.valueOf(), from.valueOf()));
      to = new Date(Math.min(range2.max_date.valueOf(), to.valueOf()));
      var evs = scheduler2.getEvents(from, to);
      evs.sort(this._compareEvents);
      if (reverse) {
        evs = evs.reverse();
      }
      var trim = !!startId;
      for (var i = 0; i < evs.length && trim; i++) {
        if (evs[i].id == startId) {
          trim = false;
        }
        evs.splice(i, 1);
        i--;
      }
      for (var i = 0; i < evs.length; i++) {
        var eventElement = new scheduler2.$keyboardNavigation.Event(evs[i].id);
        if (eventElement.getNode())
          return evs[i];
      }
      return null;
    }, nextEventHandler: function(id2) {
      var activeNode = scheduler2.$keyboardNavigation.dispatcher.activeNode;
      var startId = id2 || activeNode && activeNode.eventId;
      var nextEvent = null;
      if (startId && scheduler2.getEvent(startId)) {
        var currEvent = scheduler2.getEvent(startId);
        nextEvent = scheduler2.$keyboardNavigation.SchedulerNode.prototype._pickEvent(currEvent.start_date, scheduler2.date.add(currEvent.start_date, 1, "year"), currEvent.id, false);
      }
      if (!nextEvent && !id2) {
        var visibleDates = scheduler2.getState();
        nextEvent = scheduler2.$keyboardNavigation.SchedulerNode.prototype._pickEvent(visibleDates.min_date, scheduler2.date.add(visibleDates.min_date, 1, "year"), null, false);
      }
      if (nextEvent) {
        var nextEv = new scheduler2.$keyboardNavigation.Event(nextEvent.id);
        if (!nextEv.isValid()) {
          this.nextEventHandler(nextEvent.id);
        } else {
          if (activeNode) {
            activeNode.blur();
          }
          scheduler2.$keyboardNavigation.dispatcher.setActiveNode(nextEv);
        }
      }
    }, prevEventHandler: function(id2) {
      var activeNode = scheduler2.$keyboardNavigation.dispatcher.activeNode;
      var startId = id2 || activeNode && activeNode.eventId;
      var nextEvent = null;
      if (startId && scheduler2.getEvent(startId)) {
        var currEvent = scheduler2.getEvent(startId);
        nextEvent = scheduler2.$keyboardNavigation.SchedulerNode.prototype._pickEvent(scheduler2.date.add(currEvent.end_date, -1, "year"), currEvent.end_date, currEvent.id, true);
      }
      if (!nextEvent && !id2) {
        var visibleDates = scheduler2.getState();
        nextEvent = scheduler2.$keyboardNavigation.SchedulerNode.prototype._pickEvent(scheduler2.date.add(visibleDates.max_date, -1, "year"), visibleDates.max_date, null, true);
      }
      if (nextEvent) {
        var nextEv = new scheduler2.$keyboardNavigation.Event(nextEvent.id);
        if (!nextEv.isValid()) {
          this.prevEventHandler(nextEvent.id);
        } else {
          if (activeNode) {
            activeNode.blur();
          }
          scheduler2.$keyboardNavigation.dispatcher.setActiveNode(nextEv);
        }
      }
    }, keys: { "alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9": function(e) {
      var tabs = scheduler2.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab");
      var key = e.key;
      if (key === void 0) {
        key = e.keyCode - 48;
      }
      if (tabs[key * 1 - 1]) {
        tabs[key * 1 - 1].click();
      }
    }, "ctrl+left,meta+left": function(e) {
      scheduler2._click.dhx_cal_prev_button();
    }, "ctrl+right,meta+right": function(e) {
      scheduler2._click.dhx_cal_next_button();
    }, "ctrl+up,meta+up": function(e) {
      var dataArea = scheduler2.$container.querySelector(".dhx_cal_data");
      dataArea.scrollTop -= 20;
    }, "ctrl+down,meta+down": function(e) {
      var dataArea = scheduler2.$container.querySelector(".dhx_cal_data");
      dataArea.scrollTop += 20;
    }, e: function() {
      this.nextEventHandler();
    }, home: function() {
      scheduler2.setCurrentView(/* @__PURE__ */ new Date());
    }, "shift+e": function() {
      this.prevEventHandler();
    }, "ctrl+enter,meta+enter": function() {
      scheduler2.addEventNow({ start_date: new Date(scheduler2.getState().date) });
    }, "ctrl+c,meta+c": function(e) {
      scheduler2._key_nav_copy_paste(e);
    }, "ctrl+v,meta+v": function(e) {
      scheduler2._key_nav_copy_paste(e);
    }, "ctrl+x,meta+x": function(e) {
      scheduler2._key_nav_copy_paste(e);
    } } });
    scheduler2.$keyboardNavigation.SchedulerNode.prototype.bindAll(scheduler2.$keyboardNavigation.SchedulerNode.prototype.keys);
  }
  function nav_node(scheduler2) {
    scheduler2.$keyboardNavigation.KeyNavNode = function() {
    };
    scheduler2.$keyboardNavigation.KeyNavNode.prototype = scheduler2._compose(scheduler2.$keyboardNavigation.EventHandler, { isValid: function() {
      return true;
    }, fallback: function() {
      return null;
    }, moveTo: function(element) {
      scheduler2.$keyboardNavigation.dispatcher.setActiveNode(element);
    }, compareTo: function(b) {
      if (!b)
        return false;
      for (var i in this) {
        if (!!this[i] != !!b[i])
          return false;
        var canStringifyThis = !!(this[i] && this[i].toString);
        var canStringifyThat = !!(b[i] && b[i].toString);
        if (canStringifyThat != canStringifyThis)
          return false;
        if (!(canStringifyThat && canStringifyThis)) {
          if (b[i] != this[i])
            return false;
        } else {
          if (b[i].toString() != this[i].toString())
            return false;
        }
      }
      return true;
    }, getNode: function() {
    }, focus: function() {
      var node = this.getNode();
      if (node) {
        node.setAttribute("tabindex", "-1");
        if (node.focus)
          node.focus();
      }
    }, blur: function() {
      var node = this.getNode();
      if (node) {
        node.setAttribute("tabindex", "-1");
      }
    } });
  }
  function header_cell(scheduler2) {
    scheduler2.$keyboardNavigation.HeaderCell = function(index) {
      this.index = index || 0;
    };
    scheduler2.$keyboardNavigation.HeaderCell.prototype = scheduler2._compose(scheduler2.$keyboardNavigation.KeyNavNode, { getNode: function(index) {
      index = index || this.index || 0;
      var nodes = this.getNodes();
      if (nodes[index])
        return nodes[index];
    }, getNodes: function(selector) {
      selector = selector || [".dhx_cal_navline .dhx_cal_prev_button", ".dhx_cal_navline .dhx_cal_next_button", ".dhx_cal_navline .dhx_cal_today_button", ".dhx_cal_navline .dhx_cal_tab"].join(", ");
      var nodes = Array.prototype.slice.call(scheduler2.$container.querySelectorAll(selector));
      nodes.sort(function(a, b) {
        return a.offsetLeft - b.offsetLeft;
      });
      return nodes;
    }, _handlers: null, isValid: function() {
      return !!this.getNode(this.index);
    }, fallback: function() {
      var defaultCell = this.getNode(0);
      if (!defaultCell) {
        defaultCell = new scheduler2.$keyboardNavigation.TimeSlot();
      }
      return defaultCell;
    }, keys: { left: function() {
      var newIndex = this.index - 1;
      if (newIndex < 0) {
        newIndex = this.getNodes().length - 1;
      }
      this.moveTo(new scheduler2.$keyboardNavigation.HeaderCell(newIndex));
    }, right: function() {
      var newIndex = this.index + 1;
      if (newIndex >= this.getNodes().length) {
        newIndex = 0;
      }
      this.moveTo(new scheduler2.$keyboardNavigation.HeaderCell(newIndex));
    }, down: function() {
      this.moveTo(new scheduler2.$keyboardNavigation.TimeSlot());
    }, enter: function() {
      var node = this.getNode();
      if (node) {
        node.click();
      }
    } } });
    scheduler2.$keyboardNavigation.HeaderCell.prototype.bindAll(scheduler2.$keyboardNavigation.HeaderCell.prototype.keys);
  }
  function event(scheduler2) {
    scheduler2.$keyboardNavigation.Event = function(id2) {
      this.eventId = null;
      if (scheduler2.getEvent(id2)) {
        var ev = scheduler2.getEvent(id2);
        this.start = new Date(ev.start_date);
        this.end = new Date(ev.end_date);
        this.section = this._getSection(ev);
        this.eventId = id2;
      }
    };
    scheduler2.$keyboardNavigation.Event.prototype = scheduler2._compose(scheduler2.$keyboardNavigation.KeyNavNode, { _getNodes: function() {
      return Array.prototype.slice.call(scheduler2.$container.querySelectorAll("[" + scheduler2.config.event_attribute + "]"));
    }, _modes: scheduler2.$keyboardNavigation.SchedulerNode.prototype._modes, getMode: scheduler2.$keyboardNavigation.SchedulerNode.prototype.getMode, _handlers: null, isValid: function() {
      return !!(scheduler2.getEvent(this.eventId) && this.getNode());
    }, fallback: function() {
      var eventNode = this._getNodes()[0];
      var defaultElement = null;
      if (!eventNode || !scheduler2._locate_event(eventNode)) {
        defaultElement = new scheduler2.$keyboardNavigation.TimeSlot();
      } else {
        var id2 = scheduler2._locate_event(eventNode);
        defaultElement = new scheduler2.$keyboardNavigation.Event(id2);
      }
      return defaultElement;
    }, isScrolledIntoView: function(el2) {
      var eventBox = el2.getBoundingClientRect();
      var viewPort = scheduler2.$container.querySelector(".dhx_cal_data").getBoundingClientRect();
      if (eventBox.bottom < viewPort.top || eventBox.top > viewPort.bottom) {
        return false;
      }
      return true;
    }, getNode: function() {
      var idSelector = "[" + scheduler2.config.event_attribute + "='" + this.eventId + "']";
      var inlineEditor = scheduler2.$keyboardNavigation.dispatcher.getInlineEditor(this.eventId);
      if (inlineEditor) {
        return inlineEditor;
      } else {
        if (scheduler2.isMultisectionEvent && scheduler2.isMultisectionEvent(scheduler2.getEvent(this.eventId))) {
          var nodes = scheduler2.$container.querySelectorAll(idSelector);
          for (var i = 0; i < nodes.length; i++) {
            if (this.isScrolledIntoView(nodes[i])) {
              return nodes[i];
            }
          }
          return nodes[0];
        } else {
          return scheduler2.$container.querySelector(idSelector);
        }
      }
    }, focus: function() {
      var event2 = scheduler2.getEvent(this.eventId);
      var calendar = scheduler2.getState();
      if (event2.start_date.valueOf() > calendar.max_date.valueOf() || event2.end_date.valueOf() <= calendar.min_date.valueOf()) {
        scheduler2.setCurrentView(event2.start_date);
      }
      var node = this.getNode();
      if (this.isScrolledIntoView(node)) {
        scheduler2.$keyboardNavigation.dispatcher.keepScrollPosition((function() {
          scheduler2.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
        }).bind(this));
      } else {
        scheduler2.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
      }
    }, blur: function() {
      scheduler2.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getSection: function(ev) {
      var section = null;
      var mode = scheduler2.getState().mode;
      if (scheduler2.matrix && scheduler2.matrix[mode]) {
        var timeline = scheduler2.matrix[scheduler2.getState().mode];
        section = ev[timeline.y_property];
      } else if (scheduler2._props && scheduler2._props[mode]) {
        var unit = scheduler2._props[mode];
        section = ev[unit.map_to];
      }
      return section;
    }, _moveToSlot: function(dir) {
      var ev = scheduler2.getEvent(this.eventId);
      if (ev) {
        var section = this._getSection(ev);
        var slot = new scheduler2.$keyboardNavigation.TimeSlot(ev.start_date, null, section);
        this.moveTo(slot.nextSlot(slot, dir));
      } else {
        this.moveTo(new scheduler2.$keyboardNavigation.TimeSlot());
      }
    }, keys: { left: function() {
      this._moveToSlot("left");
    }, right: function() {
      this._moveToSlot("right");
    }, down: function() {
      if (this.getMode() == this._modes.list) {
        scheduler2.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler();
      } else {
        this._moveToSlot("down");
      }
    }, space: function() {
      var node = this.getNode();
      if (node && node.click) {
        node.click();
      } else {
        this.moveTo(new scheduler2.$keyboardNavigation.TimeSlot());
      }
    }, up: function() {
      if (this.getMode() == this._modes.list) {
        scheduler2.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler();
      } else {
        this._moveToSlot("up");
      }
    }, delete: function() {
      if (scheduler2.getEvent(this.eventId)) {
        scheduler2._click.buttons["delete"](this.eventId);
      } else {
        this.moveTo(new scheduler2.$keyboardNavigation.TimeSlot());
      }
    }, enter: function() {
      if (scheduler2.getEvent(this.eventId)) {
        scheduler2.showLightbox(this.eventId);
      } else {
        this.moveTo(new scheduler2.$keyboardNavigation.TimeSlot());
      }
    } } });
    scheduler2.$keyboardNavigation.Event.prototype.bindAll(scheduler2.$keyboardNavigation.Event.prototype.keys);
  }
  function time_slot(scheduler2) {
    scheduler2.$keyboardNavigation.TimeSlot = function(from, to, section, movingDate) {
      var state = scheduler2.getState();
      var timeline = scheduler2.matrix && scheduler2.matrix[state.mode];
      if (!from) {
        from = this.getDefaultDate();
      }
      if (!to) {
        if (timeline) {
          to = scheduler2.date.add(from, timeline.x_step, timeline.x_unit);
        } else {
          to = scheduler2.date.add(from, scheduler2.config.key_nav_step, "minute");
        }
      }
      this.section = section || this._getDefaultSection();
      this.start_date = new Date(from);
      this.end_date = new Date(to);
      this.movingDate = movingDate || null;
    };
    scheduler2.$keyboardNavigation.TimeSlot.prototype = scheduler2._compose(scheduler2.$keyboardNavigation.KeyNavNode, { _handlers: null, getDefaultDate: function() {
      var from;
      var state = scheduler2.getState();
      var visibleTime = new Date(state.date);
      visibleTime.setSeconds(0);
      visibleTime.setMilliseconds(0);
      var nowTime = /* @__PURE__ */ new Date();
      nowTime.setSeconds(0);
      nowTime.setMilliseconds(0);
      var timeline = scheduler2.matrix && scheduler2.matrix[state.mode];
      var showNowTime = false;
      if (visibleTime.valueOf() === nowTime.valueOf()) {
        showNowTime = true;
      }
      if (timeline) {
        if (showNowTime) {
          if (timeline.x_unit === "day") {
            nowTime.setHours(0);
            nowTime.setMinutes(0);
          } else if (timeline.x_unit === "hour") {
            nowTime.setMinutes(0);
          }
          from = nowTime;
        } else {
          from = scheduler2.date[timeline.name + "_start"](new Date(state.date));
        }
        from = this.findVisibleColumn(from);
      } else {
        from = new Date(scheduler2.getState().min_date);
        if (showNowTime) {
          from = nowTime;
        }
        from = this.findVisibleColumn(from);
        if (!showNowTime) {
          from.setHours(scheduler2.config.first_hour);
        }
        if (!scheduler2._table_view) {
          var dataContainer = scheduler2.$container.querySelector(".dhx_cal_data");
          if (dataContainer.scrollTop) {
            from.setHours(scheduler2.config.first_hour + Math.ceil(dataContainer.scrollTop / scheduler2.config.hour_size_px));
          }
        }
      }
      return from;
    }, clone: function(timeslot) {
      return new scheduler2.$keyboardNavigation.TimeSlot(timeslot.start_date, timeslot.end_date, timeslot.section, timeslot.movingDate);
    }, _getMultisectionView: function() {
      var state = scheduler2.getState();
      var view;
      if (scheduler2._props && scheduler2._props[state.mode]) {
        view = scheduler2._props[state.mode];
      } else if (scheduler2.matrix && scheduler2.matrix[state.mode]) {
        view = scheduler2.matrix[state.mode];
      }
      return view;
    }, _getDefaultSection: function() {
      var section = null;
      var view = this._getMultisectionView();
      if (view && !section) {
        section = this._getNextSection();
      }
      return section;
    }, _getNextSection: function(sectionId, dir) {
      var view = this._getMultisectionView();
      var currentIndex = view.order[sectionId];
      var nextIndex = currentIndex;
      if (currentIndex !== void 0) {
        nextIndex = currentIndex + dir;
      } else {
        nextIndex = view.size && view.position ? view.position : 0;
      }
      if (nextIndex < 0) {
        nextIndex = 0;
      }
      var options = view.options || view.y_unit;
      if (nextIndex >= options.length) {
        nextIndex = options.length - 1;
      }
      if (options[nextIndex]) {
        return options[nextIndex].key;
      } else {
        return null;
      }
    }, isValid: function() {
      var state = scheduler2.getState();
      var isInRange = !(this.start_date.valueOf() < state.min_date.valueOf() || this.start_date.valueOf() >= state.max_date.valueOf());
      if (!isInRange)
        return false;
      if (!this.isVisible(this.start_date, this.end_date))
        return false;
      var view = this._getMultisectionView();
      if (view) {
        return view.order[this.section] !== void 0;
      } else {
        return true;
      }
    }, fallback: function() {
      var defaultSlot = new scheduler2.$keyboardNavigation.TimeSlot();
      if (!defaultSlot.isValid()) {
        return new scheduler2.$keyboardNavigation.DataArea();
      } else {
        return defaultSlot;
      }
    }, getNodes: function() {
      return Array.prototype.slice.call(scheduler2.$container.querySelectorAll(".dhx_focus_slot"));
    }, getNode: function() {
      return this.getNodes()[0];
    }, focus: function() {
      if (this.section && scheduler2.getView() && scheduler2.getView().smart_rendering && scheduler2.getView().scrollTo && !scheduler2.$container.querySelector(`[data-section-id="${this.section}"]`)) {
        scheduler2.getView().scrollTo({ section: this.section });
      }
      scheduler2.$keyboardNavigation.marker.render(this.start_date, this.end_date, this.section);
      scheduler2.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
      scheduler2.$keyboardNavigation._pasteDate = this.start_date;
      scheduler2.$keyboardNavigation._pasteSection = this.section;
    }, blur: function() {
      scheduler2.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
      scheduler2.$keyboardNavigation.marker.clear();
    }, _modes: scheduler2.$keyboardNavigation.SchedulerNode.prototype._modes, _getMode: scheduler2.$keyboardNavigation.SchedulerNode.prototype.getMode, addMonthDate: function(date, dir, extend2) {
      var res;
      switch (dir) {
        case "up":
          res = scheduler2.date.add(date, -1, "week");
          break;
        case "down":
          res = scheduler2.date.add(date, 1, "week");
          break;
        case "left":
          res = scheduler2.date.day_start(scheduler2.date.add(date, -1, "day"));
          res = this.findVisibleColumn(res, -1);
          break;
        case "right":
          res = scheduler2.date.day_start(scheduler2.date.add(date, 1, "day"));
          res = this.findVisibleColumn(res, 1);
          break;
        default:
          res = scheduler2.date.day_start(new Date(date));
          break;
      }
      var state = scheduler2.getState();
      if (date.valueOf() < state.min_date.valueOf() || !extend2 && date.valueOf() >= state.max_date.valueOf()) {
        res = new Date(state.min_date);
      }
      return res;
    }, nextMonthSlot: function(slot, dir, extend2) {
      var start, end;
      start = this.addMonthDate(slot.start_date, dir, extend2);
      start.setHours(scheduler2.config.first_hour);
      end = new Date(start);
      end.setHours(scheduler2.config.last_hour);
      return { start_date: start, end_date: end };
    }, _alignTimeSlot: function(date, minDate, unit, step) {
      var currentDate = new Date(minDate);
      while (currentDate.valueOf() < date.valueOf()) {
        currentDate = scheduler2.date.add(currentDate, step, unit);
      }
      if (currentDate.valueOf() > date.valueOf()) {
        currentDate = scheduler2.date.add(currentDate, -step, unit);
      }
      return currentDate;
    }, nextTimelineSlot: function(slot, dir, extend2) {
      var state = scheduler2.getState();
      var view = scheduler2.matrix[state.mode];
      var startDate = this._alignTimeSlot(slot.start_date, scheduler2.date[view.name + "_start"](new Date(slot.start_date)), view.x_unit, view.x_step);
      var endDate = this._alignTimeSlot(slot.end_date, scheduler2.date[view.name + "_start"](new Date(slot.end_date)), view.x_unit, view.x_step);
      if (endDate.valueOf() <= startDate.valueOf()) {
        endDate = scheduler2.date.add(startDate, view.x_step, view.x_unit);
      }
      var newPos = this.clone(slot);
      newPos.start_date = startDate;
      newPos.end_date = endDate;
      newPos.section = slot.section || this._getNextSection();
      switch (dir) {
        case "up":
          newPos.section = this._getNextSection(slot.section, -1);
          break;
        case "down":
          newPos.section = this._getNextSection(slot.section, 1);
          break;
        case "left":
          newPos.start_date = this.findVisibleColumn(scheduler2.date.add(newPos.start_date, -view.x_step, view.x_unit), -1);
          newPos.end_date = scheduler2.date.add(newPos.start_date, view.x_step, view.x_unit);
          break;
        case "right":
          newPos.start_date = this.findVisibleColumn(scheduler2.date.add(newPos.start_date, view.x_step, view.x_unit), 1);
          newPos.end_date = scheduler2.date.add(newPos.start_date, view.x_step, view.x_unit);
          break;
      }
      if (newPos.start_date.valueOf() < state.min_date.valueOf() || newPos.start_date.valueOf() >= state.max_date.valueOf()) {
        if (extend2 && newPos.start_date.valueOf() >= state.max_date.valueOf()) {
          newPos.start_date = new Date(state.max_date);
        } else {
          newPos.start_date = scheduler2.date[state.mode + "_start"](scheduler2.date.add(state.date, dir == "left" ? -1 : 1, state.mode));
          newPos.end_date = scheduler2.date.add(newPos.start_date, view.x_step, view.x_unit);
        }
      }
      return newPos;
    }, nextUnitsSlot: function(slot, dir, extend2) {
      var newPos = this.clone(slot);
      newPos.section = slot.section || this._getNextSection();
      var section = slot.section || this._getNextSection();
      var state = scheduler2.getState();
      var view = scheduler2._props[state.mode];
      switch (dir) {
        case "left":
          section = this._getNextSection(slot.section, -1);
          var optionsCount = view.size ? view.size - 1 : view.options.length;
          if (view.days > 1 && view.order[section] == optionsCount - 1) {
            if (scheduler2.date.add(slot.start_date, -1, "day").valueOf() >= state.min_date.valueOf()) {
              newPos = this.nextDaySlot(slot, dir, extend2);
            }
          }
          break;
        case "right":
          section = this._getNextSection(slot.section, 1);
          if (view.days > 1 && !view.order[section]) {
            if (scheduler2.date.add(slot.start_date, 1, "day").valueOf() < state.max_date.valueOf()) {
              newPos = this.nextDaySlot(slot, dir, extend2);
            }
          }
          break;
        default:
          newPos = this.nextDaySlot(slot, dir, extend2);
          section = slot.section;
          break;
      }
      newPos.section = section;
      return newPos;
    }, _moveDate: function(oldDate, dir) {
      var newDate = this.findVisibleColumn(scheduler2.date.add(oldDate, dir, "day"), dir);
      newDate.setHours(oldDate.getHours());
      newDate.setMinutes(oldDate.getMinutes());
      return newDate;
    }, isBeforeLastHour: function(date, isStartDate) {
      var minutes = date.getMinutes(), hours = date.getHours(), last_hour = scheduler2.config.last_hour;
      return hours < last_hour || !isStartDate && ((last_hour == 24 || hours == last_hour) && !minutes);
    }, isAfterFirstHour: function(date, isStartDate) {
      var minutes = date.getMinutes(), hours = date.getHours(), first_hour = scheduler2.config.first_hour, last_hour = scheduler2.config.last_hour;
      return hours >= first_hour || !isStartDate && (!minutes && (!hours && last_hour == 24 || hours == last_hour));
    }, isInVisibleDayTime: function(date, isStartDate) {
      return this.isBeforeLastHour(date, isStartDate) && this.isAfterFirstHour(date, isStartDate);
    }, nextDaySlot: function(slot, dir, extend2) {
      var start, end;
      var key_nav_step = scheduler2.config.key_nav_step;
      var date = this._alignTimeSlot(slot.start_date, scheduler2.date.day_start(new Date(slot.start_date)), "minute", key_nav_step);
      var oldStart = slot.start_date;
      switch (dir) {
        case "up":
          start = scheduler2.date.add(date, -key_nav_step, "minute");
          if (!this.isInVisibleDayTime(start, true)) {
            if (!extend2 || this.isInVisibleDayTime(oldStart, true)) {
              var toNextDay = true;
              if (extend2 && scheduler2.date.date_part(new Date(start)).valueOf() != scheduler2.date.date_part(new Date(oldStart)).valueOf())
                toNextDay = false;
              if (toNextDay)
                start = this.findVisibleColumn(scheduler2.date.add(slot.start_date, -1, "day"), -1);
              start.setHours(scheduler2.config.last_hour);
              start.setMinutes(0);
              start = scheduler2.date.add(start, -key_nav_step, "minute");
            }
          }
          end = scheduler2.date.add(start, key_nav_step, "minute");
          break;
        case "down":
          start = scheduler2.date.add(date, key_nav_step, "minute");
          var testEnd = extend2 ? start : scheduler2.date.add(start, key_nav_step, "minute");
          if (!this.isInVisibleDayTime(testEnd, false)) {
            if (!extend2 || this.isInVisibleDayTime(oldStart, false)) {
              if (!extend2) {
                start = this.findVisibleColumn(scheduler2.date.add(slot.start_date, 1, "day"), 1);
                start.setHours(scheduler2.config.first_hour);
                start.setMinutes(0);
              } else {
                var toNextDay = true;
                if (scheduler2.date.date_part(new Date(oldStart)).valueOf() == oldStart.valueOf()) {
                  toNextDay = false;
                }
                if (toNextDay) {
                  start = this.findVisibleColumn(scheduler2.date.add(slot.start_date, 1, "day"), 1);
                }
                start.setHours(scheduler2.config.first_hour);
                start.setMinutes(0);
                start = scheduler2.date.add(start, key_nav_step, "minute");
              }
            }
          }
          end = scheduler2.date.add(start, key_nav_step, "minute");
          break;
        case "left":
          start = this._moveDate(slot.start_date, -1);
          end = this._moveDate(slot.end_date, -1);
          break;
        case "right":
          start = this._moveDate(slot.start_date, 1);
          end = this._moveDate(slot.end_date, 1);
          break;
        default:
          start = date;
          end = scheduler2.date.add(start, key_nav_step, "minute");
          break;
      }
      return { start_date: start, end_date: end };
    }, nextWeekAgendaSlot: function(slot, dir) {
      var start, end;
      var state = scheduler2.getState();
      switch (dir) {
        case "down":
        case "left":
          start = scheduler2.date.day_start(scheduler2.date.add(slot.start_date, -1, "day"));
          start = this.findVisibleColumn(start, -1);
          break;
        case "up":
        case "right":
          start = scheduler2.date.day_start(scheduler2.date.add(slot.start_date, 1, "day"));
          start = this.findVisibleColumn(start, 1);
          break;
        default:
          start = scheduler2.date.day_start(slot.start_date);
          break;
      }
      if (slot.start_date.valueOf() < state.min_date.valueOf() || slot.start_date.valueOf() >= state.max_date.valueOf()) {
        start = new Date(state.min_date);
      }
      end = new Date(start);
      end.setHours(scheduler2.config.last_hour);
      return { start_date: start, end_date: end };
    }, nextAgendaSlot: function(slot, dir) {
      return { start_date: slot.start_date, end_date: slot.end_date };
    }, isDateVisible: function(date) {
      if (!scheduler2._ignores_detected)
        return true;
      var timeline = scheduler2.matrix && scheduler2.matrix[scheduler2.getState().mode];
      var index;
      if (timeline) {
        index = scheduler2._get_date_index(timeline, date);
      } else {
        index = scheduler2.locate_holder_day(date);
      }
      return !scheduler2._ignores[index];
    }, findVisibleColumn: function(start, dir) {
      var date = start;
      dir = dir || 1;
      var range2 = scheduler2.getState();
      while (!this.isDateVisible(date) && (dir > 0 && date.valueOf() <= range2.max_date.valueOf() || dir < 0 && date.valueOf() >= range2.min_date.valueOf())) {
        date = this.nextDateColumn(date, dir);
      }
      return date;
    }, nextDateColumn: function(start, dir) {
      dir = dir || 1;
      var timeline = scheduler2.matrix && scheduler2.matrix[scheduler2.getState().mode];
      var date;
      if (timeline) {
        date = scheduler2.date.add(start, dir * timeline.x_step, timeline.x_unit);
      } else {
        date = scheduler2.date.day_start(scheduler2.date.add(start, dir, "day"));
      }
      return date;
    }, isVisible: function(from, to) {
      if (!scheduler2._ignores_detected)
        return true;
      var current = new Date(from);
      while (current.valueOf() < to.valueOf()) {
        if (this.isDateVisible(current))
          return true;
        current = this.nextDateColumn(current);
      }
      return false;
    }, nextSlot: function(slot, dir, view, extend2) {
      var next;
      view = view || this._getMode();
      var tempSlot = scheduler2.$keyboardNavigation.TimeSlot.prototype.clone(slot);
      switch (view) {
        case this._modes.units:
          next = this.nextUnitsSlot(tempSlot, dir, extend2);
          break;
        case this._modes.timeline:
          next = this.nextTimelineSlot(tempSlot, dir, extend2);
          break;
        case this._modes.year:
          next = this.nextMonthSlot(tempSlot, dir, extend2);
          break;
        case this._modes.month:
          next = this.nextMonthSlot(tempSlot, dir, extend2);
          break;
        case this._modes.weekAgenda:
          next = this.nextWeekAgendaSlot(tempSlot, dir, extend2);
          break;
        case this._modes.list:
          next = this.nextAgendaSlot(tempSlot, dir, extend2);
          break;
        case this._modes.dayColumns:
          next = this.nextDaySlot(tempSlot, dir, extend2);
          break;
      }
      if (next.start_date.valueOf() >= next.end_date.valueOf()) {
        next = this.nextSlot(next, dir, view);
      }
      return scheduler2.$keyboardNavigation.TimeSlot.prototype.clone(next);
    }, extendSlot: function(slot, dir) {
      var view = this._getMode();
      var next;
      switch (view) {
        case this._modes.units:
          if (dir == "left" || dir == "right") {
            next = this.nextUnitsSlot(slot, dir);
          } else {
            next = this.extendUnitsSlot(slot, dir);
          }
          break;
        case this._modes.timeline:
          if (dir == "down" || dir == "up") {
            next = this.nextTimelineSlot(slot, dir);
          } else {
            next = this.extendTimelineSlot(slot, dir);
          }
          break;
        case this._modes.year:
          next = this.extendMonthSlot(slot, dir);
          break;
        case this._modes.month:
          next = this.extendMonthSlot(slot, dir);
          break;
        case this._modes.dayColumns:
          next = this.extendDaySlot(slot, dir);
          break;
        case this._modes.weekAgenda:
          next = this.extendWeekAgendaSlot(slot, dir);
          break;
        default:
          next = slot;
          break;
      }
      var range2 = scheduler2.getState();
      if (next.start_date.valueOf() < range2.min_date.valueOf()) {
        next.start_date = this.findVisibleColumn(range2.min_date);
        next.start_date.setHours(scheduler2.config.first_hour);
      }
      if (next.end_date.valueOf() > range2.max_date.valueOf()) {
        next.end_date = this.findVisibleColumn(range2.max_date, -1);
      }
      return scheduler2.$keyboardNavigation.TimeSlot.prototype.clone(next);
    }, extendTimelineSlot: function(slot, direction) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, slot, direction, "timeline");
    }, extendWeekAgendaSlot: function(slot, direction) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, slot, direction, "weekAgenda");
    }, extendGenericSlot: function(allowedDirections, slot, direction, type) {
      var next;
      var moveDate = slot.movingDate;
      if (!moveDate) {
        moveDate = allowedDirections[direction];
      }
      if (!moveDate || !allowedDirections[direction]) {
        return slot;
      }
      if (direction) {
        next = this.nextSlot({ start_date: slot[moveDate], section: slot.section }, direction, type, true);
        if (next.start_date.valueOf() == slot.start_date.valueOf()) {
          next = this.nextSlot({ start_date: next.start_date, section: next.section }, direction, type, true);
        }
        next.movingDate = moveDate;
      } else {
        return scheduler2.$keyboardNavigation.TimeSlot.prototype.clone(slot);
      }
      var newDates = this.extendSlotDates(slot, next, next.movingDate);
      if (newDates.end_date.valueOf() <= newDates.start_date.valueOf()) {
        next.movingDate = next.movingDate == "end_date" ? "start_date" : "end_date";
      }
      newDates = this.extendSlotDates(slot, next, next.movingDate);
      next.start_date = newDates.start_date;
      next.end_date = newDates.end_date;
      return next;
    }, extendSlotDates: function(oldSlot, newSlot, dateDirection) {
      var res = { start_date: null, end_date: null };
      if (dateDirection == "start_date") {
        res.start_date = newSlot.start_date;
        res.end_date = oldSlot.end_date;
      } else {
        res.start_date = oldSlot.start_date;
        res.end_date = newSlot.start_date;
      }
      return res;
    }, extendMonthSlot: function(slot, direction) {
      var slot = this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, slot, direction, "month");
      slot.start_date.setHours(scheduler2.config.first_hour);
      slot.end_date = scheduler2.date.add(slot.end_date, -1, "day");
      slot.end_date.setHours(scheduler2.config.last_hour);
      return slot;
    }, extendUnitsSlot: function(slot, direction) {
      var next;
      switch (direction) {
        case "down":
        case "up":
          next = this.extendDaySlot(slot, direction);
          break;
        default:
          next = slot;
          break;
      }
      next.section = slot.section;
      return next;
    }, extendDaySlot: function(slot, direction) {
      return this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, slot, direction, "dayColumns");
    }, scrollSlot: function(dir) {
      var state = scheduler2.getState();
      var slot = this.nextSlot(this, dir);
      if (slot.start_date.valueOf() < state.min_date.valueOf() || slot.start_date.valueOf() >= state.max_date.valueOf()) {
        scheduler2.setCurrentView(new Date(slot.start_date));
      }
      this.moveTo(slot);
    }, keys: { left: function() {
      this.scrollSlot("left");
    }, right: function() {
      this.scrollSlot("right");
    }, down: function() {
      var mode = this._getMode();
      if (mode == this._modes.list) {
        scheduler2.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler();
      } else {
        this.scrollSlot("down");
      }
    }, up: function() {
      var mode = this._getMode();
      if (mode == this._modes.list) {
        scheduler2.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler();
      } else {
        this.scrollSlot("up");
      }
    }, "shift+down": function() {
      this.moveTo(this.extendSlot(this, "down"));
    }, "shift+up": function() {
      this.moveTo(this.extendSlot(this, "up"));
    }, "shift+right": function() {
      this.moveTo(this.extendSlot(this, "right"));
    }, "shift+left": function() {
      this.moveTo(this.extendSlot(this, "left"));
    }, enter: function() {
      var obj = { start_date: new Date(this.start_date), end_date: new Date(this.end_date) };
      var mode = scheduler2.getState().mode;
      if (scheduler2.matrix && scheduler2.matrix[mode]) {
        var timeline = scheduler2.matrix[scheduler2.getState().mode];
        obj[timeline.y_property] = this.section;
      } else if (scheduler2._props && scheduler2._props[mode]) {
        var unit = scheduler2._props[mode];
        obj[unit.map_to] = this.section;
      }
      scheduler2.addEventNow(obj);
    } } });
    scheduler2.$keyboardNavigation.TimeSlot.prototype.bindAll(scheduler2.$keyboardNavigation.TimeSlot.prototype.keys);
  }
  function minical_button(scheduler2) {
    scheduler2.$keyboardNavigation.MinicalButton = function(div, index) {
      this.container = div;
      this.index = index || 0;
    };
    scheduler2.$keyboardNavigation.MinicalButton.prototype = scheduler2._compose(scheduler2.$keyboardNavigation.KeyNavNode, { isValid: function() {
      var container = this.container;
      return !!container.offsetWidth;
    }, fallback: function() {
      var defaultSlot = new scheduler2.$keyboardNavigation.TimeSlot();
      if (defaultSlot.isValid()) {
        return defaultSlot;
      } else {
        return new scheduler2.$keyboardNavigation.DataArea();
      }
    }, focus: function() {
      scheduler2.$keyboardNavigation.dispatcher.globalNode.disable();
      this.container.removeAttribute("tabindex");
      scheduler2.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0");
      scheduler2.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, getNode: function() {
      if (!this.index) {
        return this.container.querySelector(".dhx_cal_prev_button");
      } else {
        return this.container.querySelector(".dhx_cal_next_button");
      }
    }, keys: { right: function(e) {
      this.moveTo(new scheduler2.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, left: function(e) {
      this.moveTo(new scheduler2.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, down: function() {
      var next = new scheduler2.$keyboardNavigation.MinicalCell(this.container, 0, 0);
      if (next && !next.isValid()) {
        next = next.fallback();
      }
      this.moveTo(next);
    }, enter: function(e) {
      this.getNode().click();
    } } });
    scheduler2.$keyboardNavigation.MinicalButton.prototype.bindAll(scheduler2.$keyboardNavigation.MinicalButton.prototype.keys);
  }
  function minical_cell(scheduler2) {
    scheduler2.$keyboardNavigation.MinicalCell = function(div, row, col) {
      this.container = div;
      this.row = row || 0;
      this.col = col || 0;
    };
    scheduler2.$keyboardNavigation.MinicalCell.prototype = scheduler2._compose(scheduler2.$keyboardNavigation.KeyNavNode, { isValid: function() {
      var grid = this._getGrid();
      return !!(grid[this.row] && grid[this.row][this.col]);
    }, fallback: function() {
      var row = this.row;
      var col = this.col;
      var grid = this._getGrid();
      if (!grid[row]) {
        row = 0;
      }
      var dir = true;
      if (row > grid.length / 2) {
        dir = false;
      }
      if (!grid[row]) {
        var defaultSlot = new scheduler2.$keyboardNavigation.TimeSlot();
        if (defaultSlot.isValid()) {
          return defaultSlot;
        } else {
          return new scheduler2.$keyboardNavigation.DataArea();
        }
      }
      if (dir) {
        for (var c = col; grid[row] && c < grid[row].length; c++) {
          if (!grid[row][c] && c == grid[row].length - 1) {
            row++;
            col = 0;
          }
          if (grid[row][c]) {
            return new scheduler2.$keyboardNavigation.MinicalCell(this.container, row, c);
          }
        }
      } else {
        for (var c = col; grid[row] && c < grid[row].length; c--) {
          if (!grid[row][c] && !c) {
            row--;
            col = grid[row].length - 1;
          }
          if (grid[row][c]) {
            return new scheduler2.$keyboardNavigation.MinicalCell(this.container, row, c);
          }
        }
      }
      return new scheduler2.$keyboardNavigation.MinicalButton(this.container, 0);
    }, focus: function() {
      scheduler2.$keyboardNavigation.dispatcher.globalNode.disable();
      this.container.removeAttribute("tabindex");
      scheduler2.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0");
      scheduler2.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getNode: function(row, col) {
      return this.container.querySelector(".dhx_year_body tr:nth-child(" + (row + 1) + ") td:nth-child(" + (col + 1) + ")");
    }, getNode: function() {
      return this._getNode(this.row, this.col);
    }, _getGrid: function() {
      var rows = this.container.querySelectorAll(".dhx_year_body tr");
      var grid = [];
      for (var i = 0; i < rows.length; i++) {
        grid[i] = [];
        var row = rows[i];
        var cells = row.querySelectorAll("td");
        for (var c = 0; c < cells.length; c++) {
          var cell = cells[c];
          var enabled = true;
          var css = scheduler2._getClassName(cell);
          if (css.indexOf("dhx_after") > -1 || css.indexOf("dhx_before") > -1 || css.indexOf("dhx_scale_ignore") > -1) {
            enabled = false;
          }
          grid[i][c] = enabled;
        }
      }
      return grid;
    }, keys: { right: function(e) {
      var grid = this._getGrid();
      var newRow = this.row;
      var newCol = this.col + 1;
      if (!grid[newRow] || !grid[newRow][newCol]) {
        if (grid[newRow + 1]) {
          newRow = newRow + 1;
          newCol = 0;
        } else {
          newCol = this.col;
        }
      }
      var next = new scheduler2.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);
      if (!next.isValid()) {
        next = next.fallback();
      }
      this.moveTo(next);
    }, left: function(e) {
      var grid = this._getGrid();
      var newRow = this.row;
      var newCol = this.col - 1;
      if (!grid[newRow] || !grid[newRow][newCol]) {
        if (grid[newRow - 1]) {
          newRow = newRow - 1;
          newCol = grid[newRow].length - 1;
        } else {
          newCol = this.col;
        }
      }
      var next = new scheduler2.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);
      if (!next.isValid()) {
        next = next.fallback();
      }
      this.moveTo(next);
    }, down: function() {
      var grid = this._getGrid();
      var newRow = this.row + 1;
      var newCol = this.col;
      if (!grid[newRow] || !grid[newRow][newCol]) {
        newRow = this.row;
      }
      var next = new scheduler2.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);
      if (!next.isValid()) {
        next = next.fallback();
      }
      this.moveTo(next);
    }, up: function() {
      var grid = this._getGrid();
      var newRow = this.row - 1;
      var newCol = this.col;
      if (!grid[newRow] || !grid[newRow][newCol]) {
        var index = 0;
        if (this.col > grid[this.row].length / 2) {
          index = 1;
        }
        this.moveTo(new scheduler2.$keyboardNavigation.MinicalButton(this.container, index));
      } else {
        var next = new scheduler2.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);
        if (!next.isValid()) {
          next = next.fallback();
        }
        this.moveTo(next);
      }
    }, enter: function(e) {
      this.getNode().querySelector(".dhx_month_head").click();
    } } });
    scheduler2.$keyboardNavigation.MinicalCell.prototype.bindAll(scheduler2.$keyboardNavigation.MinicalCell.prototype.keys);
  }
  function data_area(scheduler2) {
    scheduler2.$keyboardNavigation.DataArea = function(index) {
      this.index = index || 0;
    };
    scheduler2.$keyboardNavigation.DataArea.prototype = scheduler2._compose(scheduler2.$keyboardNavigation.KeyNavNode, { getNode: function(index) {
      return scheduler2.$container.querySelector(".dhx_cal_data");
    }, _handlers: null, isValid: function() {
      return true;
    }, fallback: function() {
      return this;
    }, keys: { "up,down,right,left": function() {
      this.moveTo(new scheduler2.$keyboardNavigation.TimeSlot());
    } } });
    scheduler2.$keyboardNavigation.DataArea.prototype.bindAll(scheduler2.$keyboardNavigation.DataArea.prototype.keys);
  }
  function modals(scheduler2) {
    (function() {
      var modalsStack = [];
      function isModal() {
        return !!modalsStack.length;
      }
      function isChildOf(child, parent) {
        while (child && child != parent) {
          child = child.parentNode;
        }
        return !!(child == parent);
      }
      function afterPopup(box) {
        setTimeout(function() {
          if (scheduler2.$destroyed) {
            return true;
          }
          if (!isModal() && !isChildOf(document.activeElement, scheduler2.$container)) {
            scheduler2.focus();
          }
        }, 1);
      }
      function startModal(box) {
        scheduler2.eventRemove(box, "keydown", trapFocus);
        scheduler2.event(box, "keydown", trapFocus);
        modalsStack.push(box);
      }
      function endModal() {
        var box = modalsStack.pop();
        if (box) {
          scheduler2.eventRemove(box, "keydown", trapFocus);
        }
        afterPopup();
      }
      function isTopModal(box) {
        return box == modalsStack[modalsStack.length - 1];
      }
      function trapFocus(event2) {
        var event2 = event2 || window.event;
        var target = event2.currentTarget;
        if (!isTopModal(target))
          return;
        scheduler2.$keyboardNavigation.trapFocus(target, event2);
      }
      function traceLightbox() {
        startModal(scheduler2.getLightbox());
      }
      scheduler2.attachEvent("onLightbox", traceLightbox);
      scheduler2.attachEvent("onAfterLightbox", endModal);
      scheduler2.attachEvent("onAfterQuickInfo", function() {
        afterPopup();
      });
      if (!scheduler2._keyNavMessagePopup) {
        scheduler2._keyNavMessagePopup = true;
        var focusElement = null;
        var backupFocus = null;
        const modalsStack2 = [];
        scheduler2.attachEvent("onMessagePopup", function(box) {
          focusElement = document.activeElement;
          backupFocus = focusElement;
          while (backupFocus && scheduler2._getClassName(backupFocus).indexOf("dhx_cal_data") < 0) {
            backupFocus = backupFocus.parentNode;
          }
          if (backupFocus) {
            backupFocus = backupFocus.parentNode;
          }
          scheduler2.eventRemove(box, "keydown", trapFocus);
          scheduler2.event(box, "keydown", trapFocus);
          modalsStack2.push(box);
        });
        scheduler2.attachEvent("onAfterMessagePopup", function() {
          var box = modalsStack2.pop();
          if (box) {
            scheduler2.eventRemove(box, "keydown", trapFocus);
          }
          setTimeout(function() {
            if (scheduler2.$destroyed) {
              return true;
            }
            var currentTarget = document.activeElement;
            while (currentTarget && scheduler2._getClassName(currentTarget).indexOf("dhx_cal_light") < 0) {
              currentTarget = currentTarget.parentNode;
            }
            if (currentTarget)
              return;
            if (focusElement && focusElement.parentNode) {
              focusElement.focus();
            } else if (backupFocus && backupFocus.parentNode) {
              backupFocus.focus();
            }
            focusElement = null;
            backupFocus = null;
          }, 1);
        });
      }
      scheduler2.$keyboardNavigation.isModal = isModal;
    })();
  }
  function core(scheduler2) {
    scheduler2.$keyboardNavigation.dispatcher = { isActive: false, activeNode: null, globalNode: new scheduler2.$keyboardNavigation.SchedulerNode(), keepScrollPosition: function(callback) {
      var top, left;
      var scrollable = scheduler2.$container.querySelector(".dhx_timeline_scrollable_data");
      if (!scrollable) {
        scrollable = scheduler2.$container.querySelector(".dhx_cal_data");
      }
      if (scrollable) {
        top = scrollable.scrollTop;
        left = scrollable.scrollLeft;
      }
      callback();
      if (scrollable) {
        scrollable.scrollTop = top;
        scrollable.scrollLeft = left;
      }
    }, enable: function() {
      if (!scheduler2.$container) {
        return;
      }
      this.isActive = true;
      var self2 = this;
      this.keepScrollPosition(function() {
        self2.globalNode.enable();
        self2.setActiveNode(self2.getActiveNode());
      });
    }, disable: function() {
      this.isActive = false;
      this.globalNode.disable();
    }, isEnabled: function() {
      return !!this.isActive;
    }, getDefaultNode: function() {
      return this.globalNode.getDefaultNode();
    }, setDefaultNode: function() {
      this.setActiveNode(this.getDefaultNode());
    }, getActiveNode: function() {
      var node = this.activeNode;
      if (node && !node.isValid()) {
        node = node.fallback();
      }
      return node;
    }, focusGlobalNode: function() {
      this.blurNode(this.globalNode);
      this.focusNode(this.globalNode);
    }, setActiveNode: function(el2) {
      if (!el2 || !el2.isValid())
        return;
      if (this.activeNode) {
        if (this.activeNode.compareTo(el2)) {
          return;
        }
      }
      if (this.isEnabled()) {
        this.blurNode(this.activeNode);
        this.activeNode = el2;
        this.focusNode(this.activeNode);
      }
    }, focusNode: function(el2) {
      if (el2 && el2.focus) {
        el2.focus();
        if (el2.getNode && document.activeElement != el2.getNode()) {
          this.setActiveNode(new scheduler2.$keyboardNavigation.DataArea());
        }
      }
    }, blurNode: function(el2) {
      if (el2 && el2.blur) {
        el2.blur();
      }
    }, getInlineEditor: function(id2) {
      var editor = scheduler2.$container.querySelector(".dhx_cal_editor[" + scheduler2.config.event_attribute + "='" + id2 + "'] textarea");
      if (editor && editor.offsetWidth) {
        return editor;
      }
      return null;
    }, keyDownHandler: function(e) {
      if (e.defaultPrevented) {
        return;
      }
      var activeElement = this.getActiveNode();
      if (scheduler2.$keyboardNavigation.isModal() && !(activeElement && activeElement.container && scheduler2.utils.dom.locateCss({ target: activeElement.container }, "dhx_minical_popup", false)))
        return;
      if (scheduler2.getState().editor_id && this.getInlineEditor(scheduler2.getState().editor_id))
        return;
      if (!this.isEnabled())
        return;
      e = e || window.event;
      var schedulerNode = this.globalNode;
      var command = scheduler2.$keyboardNavigation.shortcuts.getCommandFromEvent(e);
      if (!activeElement) {
        this.setDefaultNode();
      } else if (activeElement.findHandler(command)) {
        activeElement.doAction(command, e);
      } else if (schedulerNode.findHandler(command)) {
        schedulerNode.doAction(command, e);
      }
    }, _timeout: null, delay: function(callback, delay2) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(callback, delay2 || 1);
    } };
  }
  function key_nav_legacy(scheduler2) {
    scheduler2._temp_key_scope = function() {
      scheduler2.config.key_nav = true;
      scheduler2.$keyboardNavigation._pasteDate = null;
      scheduler2.$keyboardNavigation._pasteSection = null;
      var isCopy = null;
      var pos = {};
      if (!document.body) {
        scheduler2.event(window, "load", function() {
          scheduler2.event(document.body, "mousemove", trackMousePosition);
        });
      } else {
        scheduler2.event(document.body, "mousemove", trackMousePosition);
      }
      function trackMousePosition(event2) {
        event2 = event2 || window.event;
        pos.x = event2.clientX;
        pos.y = event2.clientY;
      }
      function currentTarget() {
        var mousePointer = false;
        var keyNavPointer = false;
        var target = document.elementFromPoint(pos.x, pos.y);
        while (target && target != scheduler2._obj) {
          target = target.parentNode;
        }
        mousePointer = !!(target == scheduler2._obj);
        keyNavPointer = scheduler2.$keyboardNavigation.dispatcher.isEnabled();
        return mousePointer || keyNavPointer;
      }
      scheduler2.attachEvent("onMouseMove", function(id2, e) {
        var state = scheduler2.getState();
        if (!(state.mode && state.min_date)) {
          return;
        }
        var position = scheduler2.getActionData(e);
        scheduler2.$keyboardNavigation._pasteDate = position.date;
        scheduler2.$keyboardNavigation._pasteSection = position.section;
      });
      function clear_event_after(ev) {
        delete ev.rec_type;
        delete ev.rec_pattern;
        delete ev.event_pid;
        delete ev.event_length;
      }
      function copyEvent(ev) {
        return scheduler2._lame_copy({}, ev);
      }
      scheduler2._make_pasted_event = function(ev) {
        var date = scheduler2.$keyboardNavigation._pasteDate;
        var section = scheduler2.$keyboardNavigation._pasteSection;
        var event_duration = ev.end_date - ev.start_date;
        var copy = copyEvent(ev);
        clear_event_after(copy);
        copy.start_date = new Date(date);
        copy.end_date = new Date(copy.start_date.valueOf() + event_duration);
        if (section) {
          var property = scheduler2._get_section_property();
          if (scheduler2.config.multisection && ev[property] && scheduler2.isMultisectionEvent && scheduler2.isMultisectionEvent(ev))
            copy[property] = ev[property];
          else
            copy[property] = section;
        }
        return copy;
      };
      scheduler2._do_paste = function(is_copy, modified_ev, original_ev) {
        if (scheduler2.callEvent("onBeforeEventPasted", [is_copy, modified_ev, original_ev]) === false) {
          return;
        }
        scheduler2.addEvent(modified_ev);
        scheduler2.callEvent("onEventPasted", [is_copy, modified_ev, original_ev]);
      };
      scheduler2._is_key_nav_active = function() {
        if (this._is_initialized() && !this._is_lightbox_open() && this.config.key_nav) {
          return true;
        }
        return false;
      };
      function getSelectedEvent() {
        var node = scheduler2.$keyboardNavigation.dispatcher.getActiveNode();
        if (node && node.eventId)
          return node.eventId;
        return scheduler2._select_id;
      }
      scheduler2.event(document, "keydown", function(e) {
        if ((e.ctrlKey || e.metaKey) && e.keyCode == 86 && scheduler2._buffer_event && !scheduler2.$keyboardNavigation.dispatcher.isEnabled()) {
          scheduler2.$keyboardNavigation.dispatcher.isActive = currentTarget();
        }
      });
      scheduler2._key_nav_copy_paste = function(e) {
        if (!scheduler2._is_key_nav_active())
          return true;
        if (e.keyCode == 37 || e.keyCode == 39) {
          e.cancelBubble = true;
          var next = scheduler2.date.add(scheduler2._date, e.keyCode == 37 ? -1 : 1, scheduler2._mode);
          scheduler2.setCurrentView(next);
          return true;
        }
        var select_id = getSelectedEvent();
        if ((e.ctrlKey || e.metaKey) && e.keyCode == 67) {
          if (select_id) {
            scheduler2._buffer_event = copyEvent(scheduler2.getEvent(select_id));
            isCopy = true;
            scheduler2.callEvent("onEventCopied", [scheduler2.getEvent(select_id)]);
          }
          return true;
        }
        if ((e.ctrlKey || e.metaKey) && e.keyCode == 88) {
          if (select_id) {
            isCopy = false;
            var ev = scheduler2._buffer_event = copyEvent(scheduler2.getEvent(select_id));
            scheduler2.updateEvent(ev.id);
            scheduler2.callEvent("onEventCut", [ev]);
          }
        }
        if ((e.ctrlKey || e.metaKey) && e.keyCode == 86 && currentTarget()) {
          var ev = scheduler2._buffer_event ? scheduler2.getEvent(scheduler2._buffer_event.id) : scheduler2._buffer_event;
          ev = ev || scheduler2._buffer_event;
          if (ev) {
            var new_ev = scheduler2._make_pasted_event(ev);
            if (isCopy) {
              new_ev.id = scheduler2.uid();
              scheduler2._do_paste(isCopy, new_ev, ev);
            } else {
              var res = scheduler2.callEvent("onBeforeEventChanged", [new_ev, e, false, ev]);
              if (res) {
                scheduler2._do_paste(isCopy, new_ev, ev);
                isCopy = true;
              }
            }
          }
          return true;
        }
      };
    };
    scheduler2._temp_key_scope();
  }
  function scheduler_handlers(scheduler2) {
    scheduler2.$keyboardNavigation.attachSchedulerHandlers = function() {
      var dispatcher = scheduler2.$keyboardNavigation.dispatcher;
      var keyDownHandler = function(e) {
        if (!scheduler2.config.key_nav)
          return;
        return dispatcher.keyDownHandler(e);
      };
      var focusHandler = function() {
        dispatcher.keepScrollPosition(function() {
          dispatcher.focusGlobalNode();
        });
      };
      var waitCall;
      scheduler2.attachEvent("onDataRender", function() {
        if (!scheduler2.config.key_nav)
          return;
        if (!(dispatcher.isEnabled() && !scheduler2.getState().editor_id))
          return;
        clearTimeout(waitCall);
        waitCall = setTimeout(function() {
          if (scheduler2.$destroyed) {
            return true;
          }
          if (!dispatcher.isEnabled())
            dispatcher.enable();
          reFocusActiveNode();
        });
      });
      var reFocusActiveNode = function() {
        if (!dispatcher.isEnabled())
          return;
        var activeNode = dispatcher.getActiveNode();
        if (!activeNode)
          return;
        if (!activeNode.isValid()) {
          activeNode = activeNode.fallback();
        }
        if (!activeNode || activeNode instanceof scheduler2.$keyboardNavigation.MinicalButton || activeNode instanceof scheduler2.$keyboardNavigation.MinicalCell)
          return;
        dispatcher.keepScrollPosition(function() {
          activeNode.focus(true);
        });
      };
      scheduler2.attachEvent("onSchedulerReady", function() {
        var container = scheduler2.$container;
        scheduler2.eventRemove(document, "keydown", keyDownHandler);
        scheduler2.eventRemove(container, "mousedown", mousedownHandler);
        scheduler2.eventRemove(container, "focus", focusHandler);
        if (scheduler2.config.key_nav) {
          scheduler2.event(document, "keydown", keyDownHandler);
          scheduler2.event(container, "mousedown", mousedownHandler);
          scheduler2.event(container, "focus", focusHandler);
          container.setAttribute("tabindex", "0");
        } else {
          container.removeAttribute("tabindex");
        }
      });
      function mousedownHandler(e) {
        if (!scheduler2.config.key_nav)
          return true;
        const view = scheduler2.getView();
        let dataAreaClick = false;
        if (scheduler2.getState().mode === "month") {
          dataAreaClick = scheduler2.$keyboardNavigation.isChildOf(e.target || e.srcElement, scheduler2.$container.querySelector(".dhx_cal_month_table"));
        } else if (view && view.layout === "timeline") {
          dataAreaClick = scheduler2.$keyboardNavigation.isChildOf(e.target || e.srcElement, scheduler2.$container.querySelector(".dhx_timeline_data_col"));
        } else {
          const listOfScales = scheduler2.$container.querySelectorAll(".dhx_scale_holder");
          const arrOfScales = Array.from(listOfScales);
          dataAreaClick = arrOfScales.some((scale) => scale === e.target.parentNode);
        }
        var pos = scheduler2.getActionData(e);
        var focusNode;
        if (scheduler2._locate_event(e.target || e.srcElement)) {
          focusNode = new scheduler2.$keyboardNavigation.Event(scheduler2._locate_event(e.target || e.srcElement));
        } else if (dataAreaClick) {
          focusNode = new scheduler2.$keyboardNavigation.TimeSlot();
          if (pos.date && dataAreaClick) {
            focusNode = focusNode.nextSlot(new scheduler2.$keyboardNavigation.TimeSlot(pos.date, null, pos.section));
          }
        }
        if (focusNode) {
          if (!dispatcher.isEnabled()) {
            dispatcher.activeNode = focusNode;
          } else {
            if (pos.date && dataAreaClick) {
              dispatcher.delay(function() {
                dispatcher.setActiveNode(focusNode);
              });
            }
          }
        }
      }
      function focusEvent(evNode) {
        if (!scheduler2.config.key_nav)
          return;
        if (!dispatcher.isEnabled())
          return;
        var prevState = evNode;
        var focusNode = new scheduler2.$keyboardNavigation.Event(prevState.eventId);
        if (!focusNode.isValid()) {
          var lastStart = focusNode.start || prevState.start;
          var lastEnd = focusNode.end || prevState.end;
          var lastSection = focusNode.section || prevState.section;
          focusNode = new scheduler2.$keyboardNavigation.TimeSlot(lastStart, lastEnd, lastSection);
          if (!focusNode.isValid()) {
            focusNode = new scheduler2.$keyboardNavigation.TimeSlot();
          }
        }
        dispatcher.setActiveNode(focusNode);
        var node = dispatcher.getActiveNode();
        if (node && node.getNode && document.activeElement != node.getNode()) {
          dispatcher.focusNode(dispatcher.getActiveNode());
        }
      }
      var updateEvent = scheduler2.updateEvent;
      scheduler2.updateEvent = function(id2) {
        var res = updateEvent.apply(this, arguments);
        if (scheduler2.config.key_nav && dispatcher.isEnabled()) {
          if (scheduler2.getState().select_id == id2) {
            var element = new scheduler2.$keyboardNavigation.Event(id2);
            if (!scheduler2.getState().lightbox_id) {
              focusEvent(element);
            }
          }
        }
        return res;
      };
      scheduler2.attachEvent("onEventDeleted", function(id2) {
        if (!scheduler2.config.key_nav)
          return true;
        if (dispatcher.isEnabled()) {
          var activeNode = dispatcher.getActiveNode();
          if (activeNode.eventId == id2) {
            dispatcher.setActiveNode(new scheduler2.$keyboardNavigation.TimeSlot());
          }
        }
        return true;
      });
      scheduler2.attachEvent("onClearAll", function() {
        if (!scheduler2.config.key_nav)
          return true;
        if (dispatcher.isEnabled()) {
          if (dispatcher.getActiveNode() instanceof scheduler2.$keyboardNavigation.Event) {
            dispatcher.setActiveNode(new scheduler2.$keyboardNavigation.TimeSlot());
          }
        }
      });
    };
  }
  function minical_handlers(scheduler2) {
    scheduler2.$keyboardNavigation._minicalendars = [];
    scheduler2.$keyboardNavigation.isMinical = function(node) {
      var minicalendars = scheduler2.$keyboardNavigation._minicalendars;
      for (var i = 0; i < minicalendars.length; i++) {
        if (this.isChildOf(node, minicalendars[i]))
          return true;
      }
      return false;
    };
    scheduler2.$keyboardNavigation.isChildOf = function(child, parent) {
      while (child && child !== parent) {
        child = child.parentNode;
      }
      return !!(child === parent);
    };
    scheduler2.$keyboardNavigation.patchMinicalendar = function() {
      var dispatcher = scheduler2.$keyboardNavigation.dispatcher;
      function focusMinical(e) {
        var target = e.target;
        dispatcher.enable();
        dispatcher.setActiveNode(new scheduler2.$keyboardNavigation.MinicalButton(target, 0));
      }
      function minicalClick(e) {
        var target = e.target || e.srcElement;
        var prev = scheduler2.utils.dom.locateCss(e, "dhx_cal_prev_button", false);
        var next = scheduler2.utils.dom.locateCss(e, "dhx_cal_next_button", false);
        var cell = scheduler2.utils.dom.locateCss(e, "dhx_year_body", false);
        var rowIndex = 0;
        var cellIndex = 0;
        if (cell) {
          var tr2;
          var td;
          var current = target;
          while (current && current.tagName.toLowerCase() != "td") {
            current = current.parentNode;
          }
          if (current) {
            td = current;
            tr2 = td.parentNode;
          }
          if (tr2 && td) {
            var rows = tr2.parentNode.querySelectorAll("tr");
            for (var i = 0; i < rows.length; i++) {
              if (rows[i] == tr2) {
                rowIndex = i;
                break;
              }
            }
            var cells = tr2.querySelectorAll("td");
            for (var i = 0; i < cells.length; i++) {
              if (cells[i] == td) {
                cellIndex = i;
                break;
              }
            }
          }
        }
        var root = e.currentTarget;
        dispatcher.delay(function() {
          if (prev || next || cell) {
            var element;
            if (prev) {
              element = new scheduler2.$keyboardNavigation.MinicalButton(root, 0);
              dispatcher.setActiveNode(new scheduler2.$keyboardNavigation.MinicalButton(root, 0));
            } else if (next) {
              element = new scheduler2.$keyboardNavigation.MinicalButton(root, 1);
            } else if (cell) {
              element = new scheduler2.$keyboardNavigation.MinicalCell(root, rowIndex, cellIndex);
            }
            if (element) {
              dispatcher.enable();
              if (element.isValid()) {
                dispatcher.activeNode = null;
                dispatcher.setActiveNode(element);
              }
            }
          }
        });
      }
      if (scheduler2.renderCalendar) {
        var renderMinical = scheduler2.renderCalendar;
        scheduler2.renderCalendar = function() {
          var cal = renderMinical.apply(this, arguments);
          var minicalendars = scheduler2.$keyboardNavigation._minicalendars;
          scheduler2.eventRemove(cal, "click", minicalClick);
          scheduler2.event(cal, "click", minicalClick);
          scheduler2.eventRemove(cal, "focus", focusMinical);
          scheduler2.event(cal, "focus", focusMinical);
          var added = false;
          for (var i = 0; i < minicalendars.length; i++) {
            if (minicalendars[i] == cal) {
              added = true;
              break;
            }
          }
          if (!added)
            minicalendars.push(cal);
          if (dispatcher.isEnabled()) {
            var node = dispatcher.getActiveNode();
            if (node && node.container == cal) {
              dispatcher.focusNode(node);
            } else {
              cal.setAttribute("tabindex", "0");
            }
          } else {
            cal.setAttribute("tabindex", "0");
          }
          return cal;
        };
      }
      if (scheduler2.destroyCalendar) {
        var destroyMinical = scheduler2.destroyCalendar;
        scheduler2.destroyCalendar = function(cal, force) {
          cal = cal || (scheduler2._def_count ? scheduler2._def_count.firstChild : null);
          var res = destroyMinical.apply(this, arguments);
          if (!cal || !cal.parentNode) {
            var minicalendars = scheduler2.$keyboardNavigation._minicalendars;
            for (var i = 0; i < minicalendars.length; i++) {
              if (minicalendars[i] == cal) {
                scheduler2.eventRemove(minicalendars[i], "focus", focusMinical);
                minicalendars.splice(i, 1);
                i--;
              }
            }
          }
          return res;
        };
      }
    };
  }
  function key_nav(scheduler2) {
    scheduler2.config.key_nav = true;
    scheduler2.config.key_nav_step = 30;
    scheduler2.addShortcut = function(shortcut, handler, scope) {
      var scopeObject = getScope(scope);
      if (scopeObject) {
        scopeObject.prototype.bind(shortcut, handler);
      }
    };
    scheduler2.getShortcutHandler = function(shortcut, scope) {
      var scopeObject = getScope(scope);
      if (scopeObject) {
        var commands = scheduler2.$keyboardNavigation.shortcuts.parse(shortcut);
        if (commands.length) {
          return scopeObject.prototype.findHandler(commands[0]);
        }
      }
    };
    scheduler2.removeShortcut = function(shortcut, scope) {
      var scopeObject = getScope(scope);
      if (scopeObject) {
        scopeObject.prototype.unbind(shortcut);
      }
    };
    scheduler2.focus = function() {
      if (!scheduler2.config.key_nav) {
        return;
      }
      var disp = scheduler2.$keyboardNavigation.dispatcher;
      disp.enable();
      var activeNode = disp.getActiveNode();
      if (!activeNode || activeNode instanceof scheduler2.$keyboardNavigation.MinicalButton || activeNode instanceof scheduler2.$keyboardNavigation.MinicalCell) {
        disp.setDefaultNode();
      } else {
        disp.focusNode(disp.getActiveNode());
      }
    };
    function getScope(mode) {
      var scopes = { minicalButton: scheduler2.$keyboardNavigation.MinicalButton, minicalDate: scheduler2.$keyboardNavigation.MinicalCell, scheduler: scheduler2.$keyboardNavigation.SchedulerNode, dataArea: scheduler2.$keyboardNavigation.DataArea, timeSlot: scheduler2.$keyboardNavigation.TimeSlot, event: scheduler2.$keyboardNavigation.Event };
      var searchMap = {};
      for (var i in scopes)
        searchMap[i.toLowerCase()] = scopes[i];
      mode = (mode + "").toLowerCase();
      return searchMap[mode] || scopes.scheduler;
    }
    scheduler2.$keyboardNavigation = {};
    scheduler2._compose = function() {
      var parts = Array.prototype.slice.call(arguments, 0);
      var res = {};
      for (var i = 0; i < parts.length; i++) {
        var obj = parts[i];
        if (typeof obj == "function") {
          obj = new obj();
        }
        for (var p in obj) {
          res[p] = obj[p];
        }
      }
      return res;
    };
    keyboard_shortcuts(scheduler2);
    eventhandler(scheduler2);
    trap_modal_focus(scheduler2);
    marker(scheduler2);
    scheduler_node(scheduler2);
    nav_node(scheduler2);
    header_cell(scheduler2);
    event(scheduler2);
    time_slot(scheduler2);
    minical_button(scheduler2);
    minical_cell(scheduler2);
    data_area(scheduler2);
    modals(scheduler2);
    core(scheduler2);
    key_nav_legacy(scheduler2);
    (function() {
      scheduler_handlers(scheduler2);
      minical_handlers(scheduler2);
      var dispatcher = scheduler2.$keyboardNavigation.dispatcher;
      scheduler2.$keyboardNavigation.attachSchedulerHandlers();
      if (scheduler2.renderCalendar) {
        scheduler2.$keyboardNavigation.patchMinicalendar();
      } else {
        var attachOnce = scheduler2.attachEvent("onSchedulerReady", function() {
          scheduler2.detachEvent(attachOnce);
          scheduler2.$keyboardNavigation.patchMinicalendar();
        });
      }
      function isSchedulerSelected() {
        if (!scheduler2.config.key_nav)
          return;
        var enable;
        var focusElement = document.activeElement;
        if (!focusElement || scheduler2.utils.dom.locateCss(focusElement, "dhx_cal_quick_info", false)) {
          enable = false;
        } else {
          enable = scheduler2.$keyboardNavigation.isChildOf(focusElement, scheduler2.$container) || scheduler2.$keyboardNavigation.isMinical(focusElement);
        }
        return enable;
      }
      function changeState(enable) {
        if (enable && !dispatcher.isEnabled()) {
          dispatcher.enable();
        } else if (!enable && dispatcher.isEnabled()) {
          dispatcher.disable();
        }
      }
      const intervalId = setInterval(function() {
        if (!scheduler2.$container || !scheduler2.$keyboardNavigation.isChildOf(scheduler2.$container, document.body)) {
          return;
        }
        var enable = isSchedulerSelected();
        if (enable) {
          changeState(enable);
        } else if (!enable && dispatcher.isEnabled()) {
          setTimeout(function() {
            if (scheduler2.$destroyed) {
              return;
            }
            if (scheduler2.config.key_nav) {
              changeState(isSchedulerSelected());
            } else {
              scheduler2.$container.removeAttribute("tabindex");
            }
          }, 100);
        }
      }, 500);
      scheduler2.attachEvent("onDestroy", function() {
        clearInterval(intervalId);
      });
    })();
  }
  function layer(scheduler2) {
    scheduler2.attachEvent("onTemplatesReady", function() {
      this.layers.sort(function(a, b) {
        return a.zIndex - b.zIndex;
      });
      scheduler2._dp_init = function(dp) {
        dp._methods = ["_set_event_text_style", "", "changeEventId", "deleteEvent"];
        this.attachEvent("onEventAdded", function(id2) {
          if (!this._loading && this.validId(id2) && this.getEvent(id2) && this.getEvent(id2).layer == dp.layer)
            dp.setUpdated(id2, true, "inserted");
        });
        this.attachEvent("onBeforeEventDelete", function(id2) {
          if (this.getEvent(id2) && this.getEvent(id2).layer == dp.layer) {
            if (!this.validId(id2))
              return;
            var z = dp.getState(id2);
            if (z == "inserted" || this._new_event) {
              dp.setUpdated(id2, false);
              return true;
            }
            if (z == "deleted")
              return false;
            if (z == "true_deleted")
              return true;
            dp.setUpdated(id2, true, "deleted");
            return false;
          } else
            return true;
        });
        this.attachEvent("onEventChanged", function(id2) {
          if (!this._loading && this.validId(id2) && this.getEvent(id2) && this.getEvent(id2).layer == dp.layer)
            dp.setUpdated(id2, true, "updated");
        });
        dp._getRowData = function(id2, pref) {
          var ev = this.obj.getEvent(id2);
          var data = {};
          for (var a in ev) {
            if (a.indexOf("_") === 0)
              continue;
            if (ev[a] && ev[a].getUTCFullYear)
              data[a] = this.obj._helpers.formatDate(ev[a]);
            else
              data[a] = ev[a];
          }
          return data;
        };
        dp._clearUpdateFlag = function() {
        };
        dp.attachEvent("insertCallback", scheduler2._update_callback);
        dp.attachEvent("updateCallback", scheduler2._update_callback);
        dp.attachEvent("deleteCallback", function(upd, id2) {
          this.obj.setUserData(id2, this.action_param, "true_deleted");
          this.obj.deleteEvent(id2);
        });
      };
      (function() {
        var _cloneObj = function(obj) {
          if (obj === null || typeof obj != "object")
            return obj;
          var temp = new obj.constructor();
          for (var key in obj)
            temp[key] = _cloneObj(obj[key]);
          return temp;
        };
        scheduler2._dataprocessors = [];
        scheduler2._layers_zindex = {};
        for (var i2 = 0; i2 < scheduler2.layers.length; i2++) {
          scheduler2.config["lightbox_" + scheduler2.layers[i2].name] = {};
          scheduler2.config["lightbox_" + scheduler2.layers[i2].name].sections = _cloneObj(scheduler2.config.lightbox.sections);
          scheduler2._layers_zindex[scheduler2.layers[i2].name] = scheduler2.config.initial_layer_zindex || 5 + i2 * 3;
          if (scheduler2.layers[i2].url) {
            var dp = scheduler2.createDataProcessor({ url: scheduler2.layers[i2].url });
            dp.layer = scheduler2.layers[i2].name;
            scheduler2._dataprocessors.push(dp);
            scheduler2._dataprocessors[i2].init(scheduler2);
          }
          if (scheduler2.layers[i2].isDefault)
            scheduler2.defaultLayer = scheduler2.layers[i2].name;
        }
      })();
      scheduler2.showLayer = function(tlayer) {
        this.toggleLayer(tlayer, true);
      };
      scheduler2.hideLayer = function(tlayer) {
        this.toggleLayer(tlayer, false);
      };
      scheduler2.toggleLayer = function(tlayer, visible) {
        var layer2 = this.getLayer(tlayer);
        if (typeof visible != "undefined")
          layer2.visible = !!visible;
        else
          layer2.visible = !layer2.visible;
        this.setCurrentView(this._date, this._mode);
      };
      scheduler2.getLayer = function(tlayer) {
        var layer2, layer_name;
        if (typeof tlayer == "string")
          layer_name = tlayer;
        if (typeof tlayer == "object")
          layer_name = tlayer.layer;
        for (var i2 = 0; i2 < scheduler2.layers.length; i2++) {
          if (scheduler2.layers[i2].name == layer_name)
            layer2 = scheduler2.layers[i2];
        }
        return layer2;
      };
      scheduler2.attachEvent("onBeforeLightbox", function(event_id) {
        var ev = this.getEvent(event_id);
        this.config.lightbox.sections = this.config["lightbox_" + ev.layer].sections;
        scheduler2.resetLightbox();
        return true;
      });
      scheduler2.attachEvent("onClick", function(event_id, native_event_object) {
        var ev = scheduler2.getEvent(event_id);
        return !scheduler2.getLayer(ev.layer).noMenu;
      });
      scheduler2.attachEvent("onEventCollision", function(ev, evs) {
        var layer2 = this.getLayer(ev);
        if (!layer2.checkCollision)
          return false;
        var count = 0;
        for (var i2 = 0; i2 < evs.length; i2++) {
          if (evs[i2].layer == layer2.name && evs[i2].id != ev.id)
            count++;
        }
        return count >= scheduler2.config.collision_limit;
      });
      scheduler2.addEvent = function(start_date, end_date, text, id2, extra_data) {
        var ev = start_date;
        if (arguments.length != 1) {
          ev = extra_data || {};
          ev.start_date = start_date;
          ev.end_date = end_date;
          ev.text = text;
          ev.id = id2;
          ev.layer = this.defaultLayer;
        }
        ev.id = ev.id || scheduler2.uid();
        ev.text = ev.text || "";
        if (typeof ev.start_date == "string")
          ev.start_date = this.templates.api_date(ev.start_date);
        if (typeof ev.end_date == "string")
          ev.end_date = this.templates.api_date(ev.end_date);
        ev._timed = this.isOneDayEvent(ev);
        var is_new = !this._events[ev.id];
        this._events[ev.id] = ev;
        this.event_updated(ev);
        if (!this._loading)
          this.callEvent(is_new ? "onEventAdded" : "onEventChanged", [ev.id, ev]);
      };
      this._evs_layer = {};
      for (var i = 0; i < this.layers.length; i++) {
        this._evs_layer[this.layers[i].name] = [];
      }
      scheduler2.addEventNow = function(start, end, e) {
        var base = {};
        if (typeof start == "object") {
          base = start;
          start = null;
        }
        var d = (this.config.event_duration || this.config.time_step) * 6e4;
        if (!start)
          start = Math.round(scheduler2._currentDate().valueOf() / d) * d;
        var start_date = new Date(start);
        if (!end) {
          var start_hour = this.config.first_hour;
          if (start_hour > start_date.getHours()) {
            start_date.setHours(start_hour);
            start = start_date.valueOf();
          }
          end = start + d;
        }
        base.start_date = base.start_date || start_date;
        base.end_date = base.end_date || new Date(end);
        base.text = base.text || this.locale.labels.new_event;
        base.id = this._drag_id = this.uid();
        base.layer = this.defaultLayer;
        this._drag_mode = "new-size";
        this._loading = true;
        this.addEvent(base);
        this.callEvent("onEventCreated", [this._drag_id, e]);
        this._loading = false;
        this._drag_event = {};
        this._on_mouse_up(e);
      };
      scheduler2._t_render_view_data = function(events) {
        if (this.config.multi_day && !this._table_view) {
          var tvs = [];
          var tvd = [];
          for (var k = 0; k < events.length; k++) {
            if (events[k]._timed)
              tvs.push(events[k]);
            else
              tvd.push(events[k]);
          }
          this._table_view = true;
          this.render_data(tvd);
          this._table_view = false;
          this.render_data(tvs);
        } else
          this.render_data(events);
      };
      scheduler2.render_view_data = function() {
        if (this._not_render) {
          this._render_wait = true;
          return;
        }
        this._render_wait = false;
        this.clear_view();
        this._evs_layer = {};
        for (var i2 = 0; i2 < this.layers.length; i2++) {
          this._evs_layer[this.layers[i2].name] = [];
        }
        var evs = this.get_visible_events();
        for (var i2 = 0; i2 < evs.length; i2++) {
          if (this._evs_layer[evs[i2].layer])
            this._evs_layer[evs[i2].layer].push(evs[i2]);
        }
        if (this._mode == "month") {
          var tevs = [];
          for (var i2 = 0; i2 < this.layers.length; i2++) {
            if (this.layers[i2].visible)
              tevs = tevs.concat(this._evs_layer[this.layers[i2].name]);
          }
          this._t_render_view_data(tevs);
        } else {
          for (var i2 = 0; i2 < this.layers.length; i2++) {
            if (this.layers[i2].visible) {
              var evs_layer = this._evs_layer[this.layers[i2].name];
              this._t_render_view_data(evs_layer);
            }
          }
        }
      };
      scheduler2._render_v_bar = function(ev, x, y, w, h, style, contentA, contentB, bottom) {
        var id2 = ev.id;
        if (contentA.indexOf("<div class=") == -1)
          contentA = scheduler2.templates["event_header_" + ev.layer] ? scheduler2.templates["event_header_" + ev.layer](ev.start_date, ev.end_date, ev) : contentA;
        if (contentB.indexOf("<div class=") == -1)
          contentB = scheduler2.templates["event_text_" + ev.layer] ? scheduler2.templates["event_text_" + ev.layer](ev.start_date, ev.end_date, ev) : contentB;
        var d = document.createElement("div");
        var cs2 = "dhx_cal_event";
        var cse = scheduler2.templates["event_class_" + ev.layer] ? scheduler2.templates["event_class_" + ev.layer](ev.start_date, ev.end_date, ev) : scheduler2.templates.event_class(ev.start_date, ev.end_date, ev);
        if (cse)
          cs2 = cs2 + " " + cse;
        var borderBox = scheduler2._border_box_events();
        var borderBoxWidth = w - 2;
        var boxWidth = borderBox ? borderBoxWidth : w - 4, headerWidth = borderBox ? borderBoxWidth : w - 6, bodyWidth = borderBox ? borderBoxWidth : w - 14, footerWidth = borderBox ? borderBoxWidth - 2 : w - 8;
        var bodyHeight = borderBox ? h - this.xy.event_header_height : h - 30 + 1;
        var html = '<div event_id="' + id2 + '" ' + scheduler2.config.event_attribute + '="' + id2 + '" class="' + cs2 + '" style="position:absolute; top:' + y + "px; left:" + x + "px; width:" + boxWidth + "px; height:" + h + "px;" + (style || "") + '">';
        html += '<div class="dhx_header" style=" width:' + headerWidth + 'px;" >&nbsp;</div>';
        html += '<div class="dhx_title">' + contentA + "</div>";
        html += '<div class="dhx_body" style=" width:' + bodyWidth + "px; height:" + bodyHeight + 'px;">' + contentB + "</div>";
        html += '<div class="dhx_footer" style=" width:' + footerWidth + "px;" + (bottom ? " margin-top:-1px;" : "") + '" ></div></div>';
        d.innerHTML = html;
        d.style.zIndex = 100;
        return d.firstChild;
      };
      scheduler2.render_event_bar = function(ev) {
        var parent = this._els["dhx_cal_data"][0];
        var x = this._colsS[ev._sday];
        var x2 = this._colsS[ev._eday];
        if (x2 == x)
          x2 = this._colsS[ev._eday + 1];
        var hb = this.xy.bar_height;
        var y = this._colsS.heights[ev._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + ev._sorder * hb;
        var d = document.createElement("div");
        var cs2 = ev._timed ? "dhx_cal_event_clear" : "dhx_cal_event_line";
        var cse = scheduler2.templates["event_class_" + ev.layer] ? scheduler2.templates["event_class_" + ev.layer](ev.start_date, ev.end_date, ev) : scheduler2.templates.event_class(ev.start_date, ev.end_date, ev);
        if (cse)
          cs2 = cs2 + " " + cse;
        var html = '<div event_id="' + ev.id + '" ' + this.config.event_attribute + '="' + ev.id + '" class="' + cs2 + '" style="position:absolute; top:' + y + "px; left:" + x + "px; width:" + (x2 - x - 15) + "px;" + (ev._text_style || "") + '">';
        if (ev._timed)
          html += scheduler2.templates["event_bar_date_" + ev.layer] ? scheduler2.templates["event_bar_date_" + ev.layer](ev.start_date, ev.end_date, ev) : scheduler2.templates.event_bar_date(ev.start_date, ev.end_date, ev);
        html += scheduler2.templates["event_bar_text_" + ev.layer] ? scheduler2.templates["event_bar_text_" + ev.layer](ev.start_date, ev.end_date, ev) : scheduler2.templates.event_bar_text(ev.start_date, ev.end_date, ev) + "</div>)";
        html += "</div>";
        d.innerHTML = html;
        this._rendered.push(d.firstChild);
        parent.appendChild(d.firstChild);
      };
      scheduler2.render_event = function(ev) {
        var menu = scheduler2.xy.menu_width;
        if (scheduler2.getLayer(ev.layer).noMenu)
          menu = 0;
        if (ev._sday < 0)
          return;
        var parent = scheduler2.locate_holder(ev._sday);
        if (!parent)
          return;
        var sm = ev.start_date.getHours() * 60 + ev.start_date.getMinutes();
        var em = ev.end_date.getHours() * 60 + ev.end_date.getMinutes() || scheduler2.config.last_hour * 60;
        var top = Math.round((sm * 60 * 1e3 - this.config.first_hour * 60 * 60 * 1e3) * this.config.hour_size_px / (60 * 60 * 1e3)) % (this.config.hour_size_px * 24) + 1;
        var height = Math.max(scheduler2.xy.min_event_height, (em - sm) * this.config.hour_size_px / 60) + 1;
        var width = Math.floor((parent.clientWidth - menu) / ev._count);
        var left = ev._sorder * width + 1;
        if (!ev._inner)
          width = width * (ev._count - ev._sorder);
        var d = this._render_v_bar(ev.id, menu + left, top, width, height, ev._text_style, scheduler2.templates.event_header(ev.start_date, ev.end_date, ev), scheduler2.templates.event_text(ev.start_date, ev.end_date, ev));
        this._rendered.push(d);
        parent.appendChild(d);
        left = left + parseInt(parent.style.left, 10) + menu;
        top += this._dy_shift;
        d.style.zIndex = this._layers_zindex[ev.layer];
        if (this._edit_id == ev.id) {
          d.style.zIndex = parseInt(d.style.zIndex) + 1;
          var new_zIndex = d.style.zIndex;
          width = Math.max(width - 4, scheduler2.xy.editor_width);
          var d = document.createElement("div");
          d.setAttribute("event_id", ev.id);
          d.setAttribute(this.config.event_attribute, ev.id);
          this.set_xy(d, width, height - 20, left, top + 14);
          d.className = "dhx_cal_editor";
          d.style.zIndex = new_zIndex;
          var d2 = document.createElement("div");
          this.set_xy(d2, width - 6, height - 26);
          d2.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;";
          d2.style.zIndex = new_zIndex;
          d.appendChild(d2);
          this._els["dhx_cal_data"][0].appendChild(d);
          this._rendered.push(d);
          d2.innerHTML = "<textarea class='dhx_cal_editor'>" + ev.text + "</textarea>";
          this._editor = d2.firstChild;
          this._editor.addEventListener("keypress", function(e) {
            if (e.shiftKey)
              return true;
            var code = e.keyCode;
            if (code == scheduler2.keys.edit_save)
              scheduler2.editStop(true);
            if (code == scheduler2.keys.edit_cancel)
              scheduler2.editStop(false);
          });
          this._editor.addEventListener("selectstart", function(e) {
            e.cancelBubble = true;
            return true;
          });
          d2.firstChild.focus();
          this._els["dhx_cal_data"][0].scrollLeft = 0;
          d2.firstChild.select();
        }
        if (this._select_id == ev.id) {
          d.style.zIndex = parseInt(d.style.zIndex) + 1;
          var icons = this.config["icons_" + (this._edit_id == ev.id ? "edit" : "select")];
          var icons_str = "";
          for (var i2 = 0; i2 < icons.length; i2++)
            icons_str += "<div class='dhx_menu_icon " + icons[i2] + "' title='" + this.locale.labels[icons[i2]] + "'></div>";
          var obj = this._render_v_bar(ev.id, left - menu + 1, top, menu, icons.length * 20 + 26, "", "<div class='dhx_menu_head'></div>", icons_str, true);
          obj.style.left = left - menu + 1;
          obj.style.zIndex = d.style.zIndex;
          this._els["dhx_cal_data"][0].appendChild(obj);
          this._rendered.push(obj);
        }
      };
      scheduler2.filter_agenda = function(id2, event2) {
        var layer2 = scheduler2.getLayer(event2.layer);
        return layer2 && layer2.visible;
      };
    });
  }
  function limit(scheduler2) {
    scheduler2.config.limit_start = null;
    scheduler2.config.limit_end = null;
    scheduler2.config.limit_view = false;
    scheduler2.config.check_limits = true;
    scheduler2._temp_limit_scope = function() {
      var before = null;
      var dhx_time_block = "dhx_time_block";
      scheduler2.attachEvent("onBeforeViewChange", function(om, od, nm, nd) {
        function isBlocked(date, mode) {
          var limit_start = scheduler2.config.limit_start, limit_end = scheduler2.config.limit_end, date_end = scheduler2.date.add(date, 1, mode);
          return date.valueOf() > limit_end.valueOf() || date_end <= limit_start.valueOf();
        }
        if (scheduler2.config.limit_view) {
          nd = nd || od;
          nm = nm || om;
          if (isBlocked(nd, nm) && !(od.valueOf() == nd.valueOf())) {
            setTimeout(function() {
              if (scheduler2.$destroyed) {
                return true;
              }
              var resetDate = !isBlocked(od, nm) ? od : scheduler2.config.limit_start;
              scheduler2.setCurrentView(!isBlocked(resetDate, nm) ? resetDate : null, nm);
            }, 1);
            return false;
          }
        }
        return true;
      });
      scheduler2.attachEvent("onMouseDown", function(classname) {
        return !(classname == dhx_time_block);
      });
      scheduler2.attachEvent("onBeforeDrag", function(id2) {
        if (!id2)
          return true;
        return scheduler2.checkLimitViolation(scheduler2.getEvent(id2));
      });
      scheduler2.attachEvent("onClick", function(event_id, native_event_object) {
        return scheduler2.checkLimitViolation(scheduler2.getEvent(event_id));
      });
      scheduler2.attachEvent("onBeforeLightbox", function(id2) {
        var ev = scheduler2.getEvent(id2);
        before = [ev.start_date, ev.end_date];
        return scheduler2.checkLimitViolation(ev);
      });
      scheduler2.attachEvent("onEventSave", function(id2, data, is_new_event) {
        if (!(data.start_date && data.end_date)) {
          var ev = scheduler2.getEvent(id2);
          data.start_date = new Date(ev.start_date);
          data.end_date = new Date(ev.end_date);
        }
        if (data.rec_type) {
          var data_copy = scheduler2._lame_clone(data);
          scheduler2._roll_back_dates(data_copy);
          return scheduler2.checkLimitViolation(data_copy);
        }
        return scheduler2.checkLimitViolation(data);
      });
      scheduler2.attachEvent("onEventAdded", function(id2) {
        if (!id2)
          return true;
        var ev = scheduler2.getEvent(id2);
        if (!scheduler2.checkLimitViolation(ev) && scheduler2.config.limit_start && scheduler2.config.limit_end) {
          if (ev.start_date < scheduler2.config.limit_start) {
            ev.start_date = new Date(scheduler2.config.limit_start);
          }
          if (ev.start_date.valueOf() >= scheduler2.config.limit_end.valueOf()) {
            ev.start_date = this.date.add(scheduler2.config.limit_end, -1, "day");
          }
          if (ev.end_date < scheduler2.config.limit_start) {
            ev.end_date = new Date(scheduler2.config.limit_start);
          }
          if (ev.end_date.valueOf() >= scheduler2.config.limit_end.valueOf()) {
            ev.end_date = this.date.add(scheduler2.config.limit_end, -1, "day");
          }
          if (ev.start_date.valueOf() >= ev.end_date.valueOf()) {
            ev.end_date = this.date.add(ev.start_date, this.config.event_duration || this.config.time_step, "minute");
          }
          ev._timed = this.isOneDayEvent(ev);
        }
        return true;
      });
      scheduler2.attachEvent("onEventChanged", function(id2) {
        if (!id2)
          return true;
        var ev = scheduler2.getEvent(id2);
        if (!scheduler2.checkLimitViolation(ev)) {
          if (!before)
            return false;
          ev.start_date = before[0];
          ev.end_date = before[1];
          ev._timed = this.isOneDayEvent(ev);
        }
        return true;
      });
      scheduler2.attachEvent("onBeforeEventChanged", function(ev, native_object, is_new) {
        return scheduler2.checkLimitViolation(ev);
      });
      scheduler2.attachEvent("onBeforeEventCreated", function(ev) {
        var start_date = scheduler2.getActionData(ev).date;
        var event2 = { _timed: true, start_date, end_date: scheduler2.date.add(start_date, scheduler2.config.time_step, "minute") };
        return scheduler2.checkLimitViolation(event2);
      });
      scheduler2.attachEvent("onViewChange", function() {
        scheduler2._mark_now();
      });
      scheduler2.attachEvent("onAfterSchedulerResize", function() {
        window.setTimeout(function() {
          if (scheduler2.$destroyed) {
            return true;
          }
          scheduler2._mark_now();
        }, 1);
        return true;
      });
      scheduler2.attachEvent("onTemplatesReady", function() {
        scheduler2._mark_now_timer = window.setInterval(function() {
          if (!scheduler2._is_initialized())
            return;
          scheduler2._mark_now();
        }, 6e4);
      });
      scheduler2.attachEvent("onDestroy", function() {
        clearInterval(scheduler2._mark_now_timer);
      });
    };
    scheduler2._temp_limit_scope();
  }
  class GoogleMapAdapter {
    constructor(scheduler2) {
      this.map = null;
      this._markers = [];
      this.scheduler = scheduler2;
    }
    onEventClick(event2) {
      if (this._markers && this._markers.length > 0) {
        for (let i = 0; i < this._markers.length; i++) {
          if (event2.id == this._markers[i].event.id) {
            let zoom = this.settings.zoom_after_resolve || this.settings.initial_zoom;
            if (event2.lat && event2.lng) {
              this.map.setCenter({ lat: event2.lat, lng: event2.lng });
              this.map.setZoom(zoom);
            } else {
              this.map.setCenter({ lat: this.settings.error_position.lat, lng: this.settings.error_position.lng });
              this.map.setZoom(zoom);
            }
            google.maps.event.trigger(this._markers[i].marker, "click");
          }
        }
      }
    }
    initialize(container, options) {
      this.settings = options;
      let scheduler2 = this.scheduler;
      let mapOptions = { center: { lat: options.initial_position.lat, lng: options.initial_position.lng }, zoom: options.initial_zoom, mapId: container.id, scrollwheel: true, mapTypeId: options.type };
      if (this.map === null) {
        this.map = new google.maps.Map(container, mapOptions);
      } else {
        let map = this.map;
        container.appendChild(this.map.__gm.messageOverlay);
        container.appendChild(this.map.__gm.outerContainer);
        setTimeout(function() {
          map.setOptions({ container: container.id });
        }, 500);
      }
      google.maps.event.addListener(this.map, "dblclick", function(event2) {
        const geocoder = new google.maps.Geocoder();
        if (!scheduler2.config.readonly && scheduler2.config.dblclick_create) {
          let point = event2.latLng;
          geocoder.geocode({ latLng: point }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              point = results[0].geometry.location;
              scheduler2.addEventNow({ lat: point.lat(), lng: point.lng(), event_location: results[0].formatted_address, start_date: scheduler2.getState().date, end_date: scheduler2.date.add(scheduler2.getState().date, scheduler2.config.time_step, "minute") });
            } else {
              console.error("Geocode was not successful for the following reason: " + status);
            }
          });
        }
      });
    }
    destroy(container) {
      google.maps.event.clearInstanceListeners(window);
      google.maps.event.clearInstanceListeners(document);
      google.maps.event.clearInstanceListeners(container);
      while (container.firstChild) {
        container.firstChild.remove();
      }
      container.innerHTML = "";
    }
    async addEventMarker(event2) {
      let config = { title: event2.text, position: {}, map: {} };
      if (event2.lat && event2.lng) {
        config.position = { lat: event2.lat, lng: event2.lng };
      } else {
        config.position = { lat: this.settings.error_position.lat, lng: this.settings.error_position.lng };
      }
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      let marker2;
      if (this.scheduler.ext.mapView.createMarker) {
        config.map = this.map;
        marker2 = this.scheduler.ext.mapView.createMarker(config);
      } else {
        marker2 = new AdvancedMarkerElement(config);
        marker2.map = this.map;
      }
      marker2.setMap(this.map);
      if (event2["!nativeeditor_status"] == "true_deleted") {
        marker2.setMap(null);
      }
      google.maps.event.addListener(marker2, "click", () => {
        if (this.infoWindow) {
          this.infoWindow.close();
        }
        this.infoWindow = new google.maps.InfoWindow({ maxWidth: this.settings.info_window_max_width });
        this.infoWindow.setContent(this.scheduler.templates.map_info_content(event2));
        this.infoWindow.open({ anchor: marker2, map: this.map });
      });
      let markerInfo = { event: event2, ...config, marker: marker2 };
      this._markers.push(markerInfo);
    }
    removeEventMarker(eventId) {
      for (let i = 0; i < this._markers.length; i++) {
        if (eventId == this._markers[i].event.id) {
          this._markers[i].marker.setVisible(false);
          this._markers[i].marker.setMap(null);
          this._markers[i].marker.setPosition(null);
          this._markers[i].marker = null;
          this._markers.splice(i, 1);
          i--;
        }
      }
    }
    updateEventMarker(event2) {
      for (let i = 0; i < this._markers.length; i++) {
        if (this._markers[i].event.id == event2.id) {
          this._markers[i].event = event2;
          this._markers[i].position.lat = event2.lat;
          this._markers[i].position.lng = event2.lng;
          this._markers[i].text = event2.text;
          let latlng = new google.maps.LatLng(event2.lat, event2.lng);
          this._markers[i].marker.setPosition(latlng);
        }
      }
    }
    clearEventMarkers() {
      if (this._markers.length > 0) {
        for (let i = 0; i < this._markers.length; i++) {
          this._markers[i].marker.setMap(null);
        }
        this._markers = [];
      }
    }
    setView(latitude, longitude, zoom) {
      this.map.setCenter({ lat: latitude, lng: longitude });
      this.map.setZoom(zoom);
    }
    async resolveAddress(string) {
      const geocoder = new google.maps.Geocoder();
      let position = await new Promise((resolve) => {
        geocoder.geocode({ address: string }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            resolve({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
          } else {
            console.error("Geocode was not successful for the following reason: " + status);
            resolve({});
          }
        });
      });
      return position;
    }
  }
  class OpenStreetMapAdapter {
    constructor(scheduler2) {
      this.map = null;
      this._markers = [];
      this.scheduler = scheduler2;
    }
    onEventClick(event2) {
      if (this._markers && this._markers.length > 0) {
        for (let i = 0; i < this._markers.length; i++) {
          if (event2.id == this._markers[i].event.id) {
            this._markers[i].marker.openPopup();
            this._markers[i].marker.closeTooltip();
            if (event2.lat && event2.lng) {
              this.setView(event2.lat, event2.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom);
            } else {
              this.setView(this.settings.error_position.lat, this.settings.error_position.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom);
            }
          }
        }
      }
    }
    initialize(container, options) {
      let scheduler2 = this.scheduler;
      let mapWrapper = document.createElement("div");
      mapWrapper.className = "mapWrapper";
      mapWrapper.id = "mapWrapper";
      mapWrapper.style.width = container.style.width;
      mapWrapper.style.height = container.style.height;
      container.appendChild(mapWrapper);
      let map = L.map(mapWrapper, { center: L.latLng(options.initial_position.lat, options.initial_position.lng), zoom: options.initial_zoom, keyboard: false });
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
      map.on("dblclick", async function(e) {
        const settings = { method: "GET", headers: { "Accept-Language": "en" } };
        let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`, settings).then((response2) => response2.json());
        if (response.address) {
          let address = response.address.country;
          scheduler2.addEventNow({ lat: e.latlng.lat, lng: e.latlng.lng, event_location: address, start_date: scheduler2.getState().date, end_date: scheduler2.date.add(scheduler2.getState().date, scheduler2.config.time_step, "minute") });
        } else {
          console.error("unable recieve a position of the event", response.error);
        }
      });
      this.map = map;
      this.settings = options;
    }
    destroy(container) {
      this.map.remove();
      while (container.firstChild) {
        container.firstChild.remove();
      }
      container.innerHTML = "";
    }
    addEventMarker(event2) {
      const myIcon = L.icon({ iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png", iconSize: [25, 41], shadowSize: [30, 65], iconAnchor: [12, 41], shadowAnchor: [7, 65] });
      let popupConfig = { minWidth: 180, maxWidth: this.settings.info_window_max_width };
      const markerPopup = L.popup(popupConfig).setContent(this.scheduler.templates.map_info_content(event2));
      const tooltip2 = L.tooltip().setContent(event2.text);
      let markerConfig = [event2.lat, event2.lng];
      if (!event2.lat || !event2.lng) {
        markerConfig = [this.settings.error_position.lat, this.settings.error_position.lng];
      }
      const marker2 = L.marker(markerConfig, { icon: myIcon }).bindPopup(markerPopup).bindTooltip(tooltip2).addTo(this.map);
      const markerInfo = { event: event2, marker: marker2 };
      this._markers.push(markerInfo);
    }
    removeEventMarker(eventId) {
      for (let i = 0; i < this._markers.length; i++) {
        if (eventId == this._markers[i].event.id) {
          this.map.removeLayer(this._markers[i].marker);
          this._markers.splice(i, 1);
          i--;
        }
      }
    }
    updateEventMarker(event2) {
      for (let i = 0; i < this._markers.length; i++) {
        if (this._markers[i].event.id == event2.id) {
          this._markers[i].event = event2;
          if (!event2.lat || !event2.lng) {
            this._markers[i].marker.setLatLng([this.settings.error_position.lat, this.settings.error_position.lng]);
          } else {
            this._markers[i].marker.setLatLng([event2.lat, event2.lng]);
          }
        }
      }
    }
    clearEventMarkers() {
      if (this._markers) {
        for (let i = 0; i < this._markers.length; i++) {
          this.map.removeLayer(this._markers[i].marker);
        }
        this._markers = [];
      }
    }
    setView(latitude, longitude, zoom) {
      this.map.setView([latitude, longitude], zoom);
    }
    async resolveAddress(string) {
      const settings = { method: "GET", headers: { "Accept-Language": "en" } };
      let position = {};
      let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${string}&format=json`, settings).then((response2) => response2.json());
      if (response && response.length) {
        position.lat = +response[0].lat;
        position.lng = +response[0].lon;
      } else {
        console.error(`Unable recieve a position of the event's location: ${string}`);
      }
      return position;
    }
  }
  class MapboxAdapter {
    constructor(scheduler2) {
      this.map = null;
      this._markers = [];
      this.scheduler = scheduler2;
    }
    onEventClick(event2) {
      if (this._markers && this._markers.length > 0) {
        for (let i = 0; i < this._markers.length; i++) {
          const popup = this._markers[i].marker.getPopup();
          if (popup.isOpen()) {
            popup.remove();
          }
          if (event2.id == this._markers[i].event.id) {
            this._markers[i].marker.togglePopup();
            if (event2.lat && event2.lng) {
              this.setView(event2.lat, event2.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom);
            } else {
              this.setView(this.settings.error_position.lat, this.settings.error_position.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom);
            }
          }
        }
      }
    }
    initialize(container, options) {
      let scheduler2 = this.scheduler;
      mapboxgl.accessToken = options.accessToken;
      const map = new mapboxgl.Map({ container, center: [options.initial_position.lng, options.initial_position.lat], zoom: options.initial_zoom + 1 });
      map.on("dblclick", async function(e) {
        let response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${options.accessToken}`).then((response2) => response2.json());
        if (response.features) {
          let address = response.features[0].place_name;
          scheduler2.addEventNow({ lat: e.lngLat.lat, lng: e.lngLat.lng, event_location: address, start_date: scheduler2.getState().date, end_date: scheduler2.date.add(scheduler2.getState().date, scheduler2.config.time_step, "minute") });
        } else {
          console.error("unable recieve a position of the event");
        }
      });
      this.map = map;
      this.settings = options;
    }
    destroy(container) {
      this.map.remove();
      while (container.firstChild) {
        container.firstChild.remove();
      }
      container.innerHTML = "";
    }
    addEventMarker(event2) {
      let config = [event2.lng, event2.lat];
      if (!event2.lat || !event2.lng) {
        config = [this.settings.error_position.lng, this.settings.error_position.lat];
      }
      const popup = new mapboxgl.Popup({ offset: 25, focusAfterOpen: false }).setMaxWidth(`${this.settings.info_window_max_width}px`).setHTML(this.scheduler.templates.map_info_content(event2));
      const marker2 = new mapboxgl.Marker().setLngLat(config).setPopup(popup).addTo(this.map);
      const markerInfo = { event: event2, marker: marker2 };
      this._markers.push(markerInfo);
    }
    removeEventMarker(eventId) {
      for (let i = 0; i < this._markers.length; i++) {
        if (eventId == this._markers[i].event.id) {
          this._markers[i].marker.remove();
          this._markers.splice(i, 1);
          i--;
        }
      }
    }
    updateEventMarker(event2) {
      for (let i = 0; i < this._markers.length; i++) {
        if (this._markers[i].event.id == event2.id) {
          this._markers[i].event = event2;
          if (!event2.lat || !event2.lng) {
            this._markers[i].marker.setLngLat([this.settings.error_position.lng, this.settings.error_position.lat]);
          } else {
            this._markers[i].marker.setLngLat([event2.lng, event2.lat]);
          }
        }
      }
    }
    clearEventMarkers() {
      for (let i = 0; i < this._markers.length; i++) {
        this._markers[i].marker.remove();
      }
      this._markers = [];
    }
    setView(latitude, longitude, zoom) {
      this.map.setCenter([longitude, latitude]);
      this.map.setZoom(zoom);
    }
    async resolveAddress(string) {
      let response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${this.settings.accessToken}`).then((response2) => response2.json());
      let position = {};
      if (response && response.features.length) {
        position.lng = response.features[0].center[0];
        position.lat = response.features[0].center[1];
      } else {
        console.error(`Unable recieve a position of the event's location: ${string}`);
      }
      return position;
    }
  }
  function map_view(scheduler2) {
    let mapAdapter = null;
    let eventHandlerIds = [];
    const adapters = { googleMap: new GoogleMapAdapter(scheduler2), openStreetMaps: new OpenStreetMapAdapter(scheduler2), mapbox: new MapboxAdapter(scheduler2) };
    if (!scheduler2.ext) {
      scheduler2.ext = {};
    }
    scheduler2.ext.mapView = { createAdapter: function() {
      return adapters[scheduler2.config.map_view_provider];
    }, createMarker: function(config) {
      return new google.maps.Marker(config);
    }, currentAdapter: null, adapters };
    scheduler2._latLngUpdate = false;
    scheduler2._eventLocationChanged = false;
    scheduler2.config.map_view_provider = "googleMap";
    scheduler2.config.map_settings = { initial_position: { lat: 48.724, lng: 8.215 }, error_position: { lat: 15, lng: 15 }, initial_zoom: 1, zoom_after_resolve: 15, info_window_max_width: 300, resolve_user_location: true, resolve_event_location: true, view_provider: "googleMap" };
    if (scheduler2.config.map_initial_position) {
      scheduler2.config.map_settings.initial_position = { lat: scheduler2.config.map_initial_position.lat(), lng: scheduler2.config.map_initial_position.lng() };
    }
    if (scheduler2.config.map_error_position) {
      scheduler2.config.map_settings.error_position = { lat: scheduler2.config.map_error_position.lat(), lng: scheduler2.config.map_error_position.lng() };
    }
    scheduler2.xy.map_date_width = 188;
    scheduler2.xy.map_icon_width = 25;
    scheduler2.xy.map_description_width = 400;
    scheduler2.date.add_map = function(date, inc, mode) {
      return new Date(date.valueOf());
    };
    scheduler2.templates.map_date = function(dd, ed, mode) {
      return "";
    };
    scheduler2.templates.map_time = function(start, end, ev) {
      if (scheduler2.config.rtl && !ev._timed) {
        return scheduler2.templates.day_date(end) + " &ndash; " + scheduler2.templates.day_date(start);
      } else if (ev._timed) {
        return this.day_date(ev.start_date, ev.end_date, ev) + " " + this.event_date(start);
      } else {
        return scheduler2.templates.day_date(start) + " &ndash; " + scheduler2.templates.day_date(end);
      }
    };
    scheduler2.templates.map_text = function(start, end, ev) {
      return ev.text;
    };
    scheduler2.templates.map_info_content = function(event2) {
      return `<div><b>Event's text:</b> ${event2.text}
				<div><b>Location:</b> ${event2.event_location}</div>
				<div><b>Starts:</b> ${scheduler2.templates.tooltip_date_format(event2.start_date)}</div>
				<div><b>Ends:</b> ${scheduler2.templates.tooltip_date_format(event2.end_date)}</div>
			</div>`;
    };
    scheduler2.date.map_start = function(d) {
      return d;
    };
    function setupMapView(scheduler22) {
      mapAdapter = scheduler22.ext.mapView.createAdapter();
      attachSchedulerEvents();
    }
    async function addEventWithLocation(event2, mapAdapter2) {
      let coordinates = await mapAdapter2.resolveAddress(event2.event_location);
      event2.lat = coordinates.lat;
      event2.lng = coordinates.lng;
      mapAdapter2.removeEventMarker(String(event2.id));
      mapAdapter2.addEventMarker(event2);
      return event2;
    }
    function setUserLocation(options, adapter) {
      if (options.resolve_user_location) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            adapter.setView(position.coords.latitude, position.coords.longitude, options.zoom_after_resolve || options.initial_zoom);
          });
        }
      } else {
        adapter.setView(options.initial_position.lat, options.initial_position.lng, options.initial_zoom);
      }
    }
    scheduler2.dblclick_dhx_map_area = function(e) {
      let eventNode = e.target.closest(`[${scheduler2.config.event_attribute}]`);
      if (eventNode) {
        let eventId = eventNode.getAttribute(`${scheduler2.config.event_attribute}`);
        scheduler2.showLightbox(eventId);
      }
      if (!this.config.readonly && this.config.dblclick_create && !eventNode) {
        this.addEventNow({ start_date: scheduler2.config.map_start, end_date: scheduler2.date.add(scheduler2.config.map_start, scheduler2.config.time_step, "minute") });
      }
    };
    function attachSchedulerEvents() {
      eventHandlerIds.push(scheduler2.attachEvent("onEventSave", function(id2, ev, is_new) {
        let unmodifiedEvent = scheduler2.getEvent(id2);
        if (unmodifiedEvent && unmodifiedEvent.event_location != ev.event_location) {
          scheduler2._eventLocationChanged = true;
        }
        return true;
      }), scheduler2.attachEvent("onEventChanged", (id2, event2) => {
        const { start_date, end_date } = event2;
        const { min_date, max_date } = scheduler2.getState();
        if (start_date.valueOf() < max_date.valueOf() && end_date.valueOf() > min_date.valueOf()) {
          if (mapAdapter) {
            if (scheduler2.config.map_settings.resolve_event_location && event2.event_location && !scheduler2._latLngUpdate) {
              addEventWithLocation(event2, mapAdapter);
            } else {
              mapAdapter.updateEventMarker(event2);
            }
          }
        }
        scheduler2._latLngUpdate = false;
        return true;
      }), scheduler2.attachEvent("onEventIdChange", function(old_id, new_id) {
        let newIdEvent = scheduler2.getEvent(new_id);
        mapAdapter == null ? void 0 : mapAdapter.removeEventMarker(old_id);
        mapAdapter == null ? void 0 : mapAdapter.addEventMarker(newIdEvent);
      }), scheduler2.attachEvent("onEventAdded", (id2, event2) => {
        const { start_date, end_date } = event2;
        const { min_date, max_date } = scheduler2.getState();
        if (start_date.valueOf() < max_date.valueOf() && end_date.valueOf() > min_date.valueOf()) {
          if (mapAdapter) {
            if (scheduler2.config.map_settings.resolve_event_location && event2.event_location && scheduler2._eventLocationChanged) {
              addEventWithLocation(event2, mapAdapter);
              scheduler2._eventLocationChanged = false;
            } else {
              mapAdapter.addEventMarker(event2);
              mapAdapter.onEventClick(event2);
            }
          }
        }
      }), scheduler2.attachEvent("onClick", function(id2, e) {
        const event2 = scheduler2.getEvent(id2);
        if (mapAdapter && event2)
          mapAdapter.onEventClick(event2);
        return false;
      }), scheduler2.attachEvent("onBeforeEventDelete", (id2, event2) => {
        if (mapAdapter) {
          mapAdapter.removeEventMarker(id2);
        }
        return true;
      }));
    }
    function detachSchedulerEvents() {
      eventHandlerIds.forEach((id2) => scheduler2.detachEvent(id2));
      eventHandlerIds = [];
    }
    scheduler2.attachEvent("onSchedulerReady", function() {
      if (scheduler2.config.map_initial_zoom !== void 0) {
        scheduler2.config.map_settings.initial_zoom = scheduler2.config.map_initial_zoom;
      }
      if (scheduler2.config.map_zoom_after_resolve !== void 0) {
        scheduler2.config.map_settings.zoom_after_resolve = scheduler2.config.map_zoom_after_resolve;
      }
      if (scheduler2.config.map_infowindow_max_width !== void 0) {
        scheduler2.config.map_settings.info_window_max_width = scheduler2.config.map_infowindow_max_width;
      }
      if (scheduler2.config.map_resolve_user_location !== void 0) {
        scheduler2.config.map_settings.resolve_user_location = scheduler2.config.map_resolve_user_location;
      }
      if (scheduler2.config.map_view_provider !== void 0) {
        scheduler2.config.map_settings.view_provider = scheduler2.config.map_view_provider;
      }
      if (scheduler2.config.map_type !== void 0) {
        scheduler2.config.map_settings.type = scheduler2.config.map_type;
      }
      if (scheduler2.config.map_resolve_event_location !== void 0) {
        scheduler2.config.map_settings.resolve_event_location = scheduler2.config.map_resolve_event_location;
      }
      scheduler2.ext.mapView.currentAdapter = scheduler2.config.map_view_provider;
      let map = document.createElement("div");
      map.className = "mapContainer";
      map.id = "mapContainer";
      map.style.display = "none";
      map.style.zIndex = "1";
      scheduler2._obj.appendChild(map);
      const old = scheduler2.render_data;
      scheduler2.render_data = function(evs, hold) {
        if (this._mode == "map") {
          fill_map_tab();
          let events = scheduler2.get_visible_events();
          if (mapAdapter) {
            mapAdapter.clearEventMarkers();
            events.forEach((event2) => mapAdapter == null ? void 0 : mapAdapter.addEventMarker(event2));
          }
        } else
          return old.apply(this, arguments);
      };
      scheduler2.map_view = function(mode) {
        scheduler2._els.dhx_cal_data[0].style.width = scheduler2.xy.map_date_width + scheduler2.xy.map_description_width + 1 + "px";
        scheduler2._min_date = scheduler2.config.map_start || scheduler2._currentDate();
        scheduler2._max_date = scheduler2.config.map_end || scheduler2.date.add(scheduler2._currentDate(), 1, "year");
        scheduler2._table_view = true;
        set_full_view(mode);
        let mapContainer = document.getElementById("mapContainer");
        _setMapSize("mapContainer");
        if (mode && mapContainer) {
          map.style.display = "block";
          fill_map_tab();
          if (scheduler2.config.map_view_provider == scheduler2.ext.mapView.currentAdapter) {
            mapAdapter == null ? void 0 : mapAdapter.destroy(mapContainer);
            setupMapView(scheduler2);
            mapAdapter == null ? void 0 : mapAdapter.initialize(mapContainer, scheduler2.config.map_settings);
          } else {
            mapAdapter == null ? void 0 : mapAdapter.destroy(mapContainer);
            setupMapView(scheduler2);
            mapAdapter == null ? void 0 : mapAdapter.initialize(mapContainer, scheduler2.config.map_settings);
            scheduler2.ext.mapView.currentAdapter = scheduler2.config.map_view_provider;
          }
          if (mapAdapter) {
            setUserLocation(scheduler2.config.map_settings, mapAdapter);
          }
        } else {
          map.style.display = "none";
          scheduler2._els.dhx_cal_data[0].style.width = "100%";
          if (mapAdapter && mapContainer) {
            mapAdapter.destroy(mapContainer);
            mapAdapter = null;
            scheduler2.ext.mapView.currentAdapter = scheduler2.config.map_view_provider;
          }
          detachSchedulerEvents();
        }
      };
      function _setMapSize(elem_id) {
        let map2 = document.getElementById(elem_id);
        if (map2) {
          const nav_height = scheduler2.$container.querySelector(".dhx_cal_navline").offsetHeight;
          let height = scheduler2.$container.querySelector(".dhx_cal_data").offsetHeight + scheduler2.$container.querySelector(".dhx_cal_header").offsetHeight;
          if (height < 0)
            height = 0;
          let width = scheduler2._x - scheduler2.xy.map_date_width - scheduler2.xy.map_description_width - 1;
          if (width < 0)
            width = 0;
          map2.style.height = height + "px";
          map2.style.width = width + "px";
          map2.style.position = "absolute";
          map2.style.top = nav_height + "px";
          if (scheduler2.config.rtl) {
            map2.style.marginRight = scheduler2.xy.map_date_width + scheduler2.xy.map_description_width + 1 + "px";
          } else {
            map2.style.marginLeft = scheduler2.xy.map_date_width + scheduler2.xy.map_description_width + 1 + "px";
          }
          map2.style.marginTop = scheduler2.xy.nav_height + 2 + "px";
        }
      }
      function fill_map_tab() {
        let events = scheduler2.get_visible_events();
        events.sort(function(a, b) {
          if (a.start_date.valueOf() == b.start_date.valueOf())
            return a.id > b.id ? 1 : -1;
          return a.start_date > b.start_date ? 1 : -1;
        });
        let ariaAttr = scheduler2._waiAria.mapAttrString();
        let html = "<div " + ariaAttr + " class='dhx_map_area'>";
        for (let i = 0; i < events.length; i++) {
          let ev = events[i];
          let event_class = ev.id == scheduler2._selected_event_id ? "dhx_map_line highlight" : "dhx_map_line";
          let bg_color = ev.color ? "--dhx-scheduler-event-background:" + ev.color + ";" : "";
          let color = ev.textColor ? "--dhx-scheduler-event-color:" + ev.textColor + ";" : "";
          let ariaAttr2 = scheduler2._waiAria.mapRowAttrString(ev);
          let ariaButtonAttr = scheduler2._waiAria.mapDetailsBtnString();
          html += "<div " + ariaAttr2 + " class='" + event_class + "' event_id='" + ev.id + "' " + scheduler2.config.event_attribute + "='" + ev.id + "' style='" + bg_color + color + (ev._text_style || "") + " width: " + (scheduler2.xy.map_date_width + scheduler2.xy.map_description_width + 2) + "px;'><div class='dhx_map_event_time' style='width: " + scheduler2.xy.map_date_width + "px;' >" + scheduler2.templates.map_time(ev.start_date, ev.end_date, ev) + "</div>";
          html += `<div ${ariaButtonAttr} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`;
          html += "<div class='line_description' style='width:" + (scheduler2.xy.map_description_width - scheduler2.xy.map_icon_width) + "px;'>" + scheduler2.templates.map_text(ev.start_date, ev.end_date, ev) + "</div></div>";
        }
        html += "<div class='dhx_v_border' style=" + (scheduler2.config.rtl ? "'right: " : "'left: ") + (scheduler2.xy.map_date_width - 1) + "px;'></div><div class='dhx_v_border_description'></div></div>";
        scheduler2._els["dhx_cal_data"][0].scrollTop = 0;
        scheduler2._els["dhx_cal_data"][0].innerHTML = html;
        let t2 = scheduler2._els["dhx_cal_data"][0].firstChild.childNodes;
        let dateElement = scheduler2._getNavDateElement();
        if (dateElement) {
          dateElement.innerHTML = scheduler2.templates[scheduler2._mode + "_date"](scheduler2._min_date, scheduler2._max_date, scheduler2._mode);
        }
        scheduler2._rendered = [];
        for (let i = 0; i < t2.length - 2; i++) {
          scheduler2._rendered[i] = t2[i];
        }
      }
      function set_full_view(mode) {
        if (mode) {
          const l = scheduler2.locale.labels;
          scheduler2._els["dhx_cal_header"][0].innerHTML = "<div class='dhx_map_head' style='width: " + (scheduler2.xy.map_date_width + scheduler2.xy.map_description_width + 2) + "px;' ><div class='headline_date' style='width: " + scheduler2.xy.map_date_width + "px;'>" + l.date + "</div><div class='headline_description' style='width: " + scheduler2.xy.map_description_width + "px;'>" + l.description + "</div></div>";
          scheduler2._table_view = true;
          scheduler2.set_sizes();
        }
      }
      scheduler2.attachEvent("onLocationError", function(id2) {
        alert("Location can't be found");
        return google.maps.LatLng(51.47784, -1492e-6);
      });
      let _updateEventLocation = async function(event2) {
        if (mapAdapter) {
          const coordinates = await mapAdapter.resolveAddress(event2.event_location);
          if (coordinates.lat && coordinates.lng) {
            event2.lat = +coordinates.lat;
            event2.lng = +coordinates.lng;
          } else {
            scheduler2.callEvent("onLocationError", [event2.id]);
            event2.lng = scheduler2.config.map_settings.error_position.lng;
            event2.lat = scheduler2.config.map_settings.error_position.lat;
          }
          scheduler2._latLngUpdate = true;
          scheduler2.callEvent("onEventChanged", [event2.id, event2]);
        }
      };
      let _delay = function(method, object, params, delay2) {
        setTimeout(function() {
          if (scheduler2.$destroyed) {
            return true;
          }
          let ret = method.apply(object, params);
          method = object = params = null;
          return ret;
        }, delay2 || 1);
      };
      scheduler2._event_resolve_delay = 1500;
      scheduler2.attachEvent("onEventLoading", function(event2) {
        if (event2.lat && event2.lng) {
          event2.lat = +event2.lat;
          event2.lng = +event2.lng;
        }
        if (scheduler2.config.map_settings.resolve_event_location && event2.event_location && !event2.lat && !event2.lng) {
          scheduler2._event_resolve_delay += 1500;
          _delay(_updateEventLocation, this, [event2], scheduler2._event_resolve_delay);
        }
        return true;
      });
    });
  }
  function minical(scheduler2) {
    const minicalDomEvents = scheduler2._createDomEventScope();
    scheduler2.config.minicalendar = { mark_events: true };
    scheduler2._synced_minicalendars = [];
    scheduler2.renderCalendar = function(obj, _prev, is_refresh) {
      var cal = null;
      var date = obj.date || scheduler2._currentDate();
      if (typeof date == "string")
        date = this.templates.api_date(date);
      if (!_prev) {
        var cont = obj.container;
        var pos = obj.position;
        if (typeof cont == "string")
          cont = document.getElementById(cont);
        if (typeof pos == "string")
          pos = document.getElementById(pos);
        if (pos && (typeof pos.left == "undefined" && typeof pos.right == "undefined")) {
          var tpos = scheduler2.$domHelpers.getOffset(pos);
          pos = { top: tpos.top + pos.offsetHeight, left: tpos.left };
        }
        if (!cont)
          cont = scheduler2._get_def_cont(pos);
        cal = this._render_calendar(cont, date, obj);
        if (!cal.$_eventAttached) {
          cal.$_eventAttached = true;
          minicalDomEvents.attach(cal, "click", (function(e) {
            var src = e.target || e.srcElement;
            var $dom = scheduler2.$domHelpers;
            if ($dom.closest(src, ".dhx_month_head")) {
              if (!$dom.closest(src, ".dhx_after") && !$dom.closest(src, ".dhx_before")) {
                var cellRoot = $dom.closest(src, "[data-cell-date]");
                var dateAttribute = cellRoot.getAttribute("data-cell-date");
                var newDate = scheduler2.templates.parse_date(dateAttribute);
                scheduler2.unmarkCalendar(this);
                scheduler2.markCalendar(this, newDate, "dhx_calendar_click");
                this._last_date = newDate;
                if (this.conf.events && this.conf.events.onDateClick) {
                  this.conf.events.onDateClick.call(this, newDate, e);
                }
                if (this.conf.handler)
                  this.conf.handler.call(scheduler2, newDate, this);
              }
            }
          }).bind(cal));
          minicalDomEvents.attach(cal, "mouseover", (function(e) {
            const target = e.target;
            if (target.classList.contains("dhx_cal_month_cell")) {
              var dateAttribute = target.getAttribute("data-cell-date");
              var newDate = scheduler2.templates.parse_date(dateAttribute);
              if (this.conf.events && this.conf.events.onDateMouseOver) {
                this.conf.events.onDateMouseOver.call(this, newDate, e);
              }
            }
          }).bind(cal));
        }
      } else {
        cal = this._render_calendar(_prev.parentNode, date, obj, _prev);
        scheduler2.unmarkCalendar(cal);
      }
      if (scheduler2.config.minicalendar.mark_events) {
        var start = scheduler2.date.month_start(date);
        var end = scheduler2.date.add(start, 1, "month");
        var evs = this.getEvents(start, end);
        var filter = this["filter_" + this._mode];
        var markedDates = {};
        for (var i = 0; i < evs.length; i++) {
          var ev = evs[i];
          if (filter && !filter(ev.id, ev))
            continue;
          var d = ev.start_date;
          if (d.valueOf() < start.valueOf())
            d = start;
          d = scheduler2.date.date_part(new Date(d.valueOf()));
          while (d < ev.end_date) {
            if (!markedDates[+d]) {
              markedDates[+d] = true;
              this.markCalendar(cal, d, "dhx_year_event");
            }
            d = this.date.add(d, 1, "day");
            if (d.valueOf() >= end.valueOf())
              break;
          }
        }
      }
      this._markCalendarCurrentDate(cal);
      cal.conf = obj;
      if (obj.sync && !is_refresh)
        this._synced_minicalendars.push(cal);
      if (!cal.conf._on_xle_handler) {
        cal.conf._on_xle_handler = scheduler2.attachEvent("onXLE", function refreshOnLoad() {
          scheduler2.updateCalendar(cal, cal.conf.date);
        });
      }
      if (this.config.wai_aria_attributes && this.config.wai_aria_application_role) {
        cal.setAttribute("role", "application");
      }
      return cal;
    };
    scheduler2._get_def_cont = function(pos) {
      if (!this._def_count) {
        this._def_count = document.createElement("div");
        this._def_count.className = "dhx_minical_popup";
        scheduler2.event(this._def_count, "click", function(e) {
          e.cancelBubble = true;
        });
        document.body.appendChild(this._def_count);
      }
      if (pos.left) {
        this._def_count.style.left = pos.left + "px";
      }
      if (pos.right) {
        this._def_count.style.right = pos.right + "px";
      }
      if (pos.top) {
        this._def_count.style.top = pos.top + "px";
      }
      if (pos.bottom) {
        this._def_count.style.bottom = pos.bottom + "px";
      }
      this._def_count._created = /* @__PURE__ */ new Date();
      return this._def_count;
    };
    scheduler2._locateCalendar = function(cal, date) {
      if (typeof date == "string")
        date = scheduler2.templates.api_date(date);
      if (+date > +cal._max_date || +date < +cal._min_date)
        return null;
      var table = cal.querySelector(".dhx_year_body").childNodes[0];
      var weekNum = 0;
      var dat = new Date(cal._min_date);
      while (+this.date.add(dat, 1, "week") <= +date) {
        dat = this.date.add(dat, 1, "week");
        weekNum++;
      }
      var sm = scheduler2.config.start_on_monday;
      var day = (date.getDay() || (sm ? 7 : 0)) - (sm ? 1 : 0);
      const dayCell = table.querySelector(`.dhx_cal_month_row:nth-child(${weekNum + 1}) .dhx_cal_month_cell:nth-child(${day + 1})`);
      if (dayCell) {
        return dayCell.firstChild;
      } else {
        return null;
      }
    };
    scheduler2.markCalendar = function(cal, date, css) {
      var div = this._locateCalendar(cal, date);
      if (!div)
        return;
      div.className += " " + css;
    };
    scheduler2.unmarkCalendar = function(cal, date, css) {
      date = date || cal._last_date;
      css = css || "dhx_calendar_click";
      if (!date)
        return;
      var el2 = this._locateCalendar(cal, date);
      if (!el2)
        return;
      el2.className = (el2.className || "").replace(RegExp(css, "g"));
    };
    scheduler2._week_template = function(width) {
      var summ = width || 250;
      var left = 0;
      var week_template = document.createElement("div");
      var dummy_date = this.date.week_start(scheduler2._currentDate());
      for (var i = 0; i < 7; i++) {
        this._cols[i] = Math.floor(summ / (7 - i));
        this._render_x_header(i, left, dummy_date, week_template);
        dummy_date = this.date.add(dummy_date, 1, "day");
        summ -= this._cols[i];
        left += this._cols[i];
      }
      week_template.lastChild.className += " dhx_scale_bar_last";
      return week_template;
    };
    scheduler2.updateCalendar = function(obj, sd) {
      if (obj.conf.date && obj.conf.events) {
        if (obj.conf.events.onBeforeMonthChange) {
          const res = obj.conf.events.onBeforeMonthChange.call(obj, obj.conf.date, sd, obj);
          if (res === false) {
            return;
          }
        }
      }
      const oldDate = obj.conf.date;
      obj.conf.date = sd;
      this.renderCalendar(obj.conf, obj, true);
      if (obj.conf.events) {
        if (obj.conf.events.onMonthChange) {
          obj.conf.events.onMonthChange.call(obj, oldDate, sd);
        }
      }
    };
    scheduler2._mini_cal_arrows = ["&nbsp;", "&nbsp;"];
    scheduler2._render_calendar = function(obj, sd, conf, previous) {
      var ts = scheduler2.templates;
      var temp = this._cols;
      this._cols = [];
      var temp2 = this._mode;
      this._mode = "calendar";
      var temp3 = this._colsS;
      this._colsS = { height: 0 };
      var temp4 = new Date(this._min_date);
      var temp5 = new Date(this._max_date);
      var temp6 = new Date(scheduler2._date);
      var temp7 = ts.month_day;
      var temp8 = this._ignores_detected;
      this._ignores_detected = 0;
      ts.month_day = ts.calendar_date;
      sd = this.date.month_start(sd);
      var week_template = this._week_template(obj.offsetWidth - 1 - this.config.minicalendar.padding);
      var d;
      if (previous) {
        d = previous;
      } else {
        d = document.createElement("div");
        d.className = "dhx_cal_container dhx_mini_calendar";
        if (this.config.rtl)
          d.className += " dhx_cal_container_rtl";
      }
      d.setAttribute("date", this._helpers.formatDate(sd));
      d.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid" + (scheduler2.config.rtl ? " dhx_grid_rtl'>" : "'>") + "<div class='dhx_year_week'>" + (week_template ? week_template.innerHTML : "") + "</div><div class='dhx_year_body'></div></div>";
      var header = d.querySelector(".dhx_year_month");
      var weekHeader = d.querySelector(".dhx_year_week");
      var body = d.querySelector(".dhx_year_body");
      header.innerHTML = this.templates.calendar_month(sd);
      if (conf.navigation) {
        var move_minicalendar_date = function(calendar, diff) {
          var date = scheduler2.date.add(calendar._date, diff, "month");
          scheduler2.updateCalendar(calendar, date);
          if (scheduler2._date.getMonth() == calendar._date.getMonth() && scheduler2._date.getFullYear() == calendar._date.getFullYear()) {
            scheduler2._markCalendarCurrentDate(calendar);
          }
        };
        var css_classnames = ["dhx_cal_prev_button", "dhx_cal_next_button"];
        var css_texts = ["left:1px;top:4px;position:absolute;", "left:auto; right:1px;top:4px;position:absolute;"];
        var diffs = [-1, 1];
        var handler = function(diff) {
          return function() {
            if (conf.sync) {
              var calendars = scheduler2._synced_minicalendars;
              for (var k = 0; k < calendars.length; k++) {
                move_minicalendar_date(calendars[k], diff);
              }
            } else {
              if (scheduler2.config.rtl) {
                diff = -diff;
              }
              move_minicalendar_date(d, diff);
            }
          };
        };
        var labels = [scheduler2.locale.labels.prev, scheduler2.locale.labels.next];
        for (var j = 0; j < 2; j++) {
          var arrow = document.createElement("div");
          arrow.className = css_classnames[j];
          scheduler2._waiAria.headerButtonsAttributes(arrow, labels[j]);
          arrow.style.cssText = css_texts[j];
          arrow.innerHTML = this._mini_cal_arrows[j];
          header.appendChild(arrow);
          minicalDomEvents.attach(arrow, "click", handler(diffs[j]));
        }
      }
      d._date = new Date(sd);
      d.week_start = (sd.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;
      var dd = d._min_date = this.date.week_start(sd);
      d._max_date = this.date.add(d._min_date, 6, "week");
      this._reset_month_scale(body, sd, dd, 6);
      if (!previous)
        obj.appendChild(d);
      weekHeader.style.height = weekHeader.childNodes[0].offsetHeight - 1 + "px";
      var headerId = scheduler2.uid();
      scheduler2._waiAria.minicalHeader(header, headerId);
      scheduler2._waiAria.minicalGrid(d.querySelector(".dhx_year_grid"), headerId);
      scheduler2._waiAria.minicalRow(weekHeader);
      var dayHeaders = weekHeader.querySelectorAll(".dhx_scale_bar");
      for (var i = 0; i < dayHeaders.length; i++) {
        scheduler2._waiAria.minicalHeadCell(dayHeaders[i]);
      }
      var dayCells = body.querySelectorAll(".dhx_cal_month_cell");
      var firstDate = new Date(dd);
      for (var i = 0; i < dayCells.length; i++) {
        scheduler2._waiAria.minicalDayCell(dayCells[i], new Date(firstDate));
        firstDate = scheduler2.date.add(firstDate, 1, "day");
      }
      scheduler2._waiAria.minicalHeader(header, headerId);
      this._cols = temp;
      this._mode = temp2;
      this._colsS = temp3;
      this._min_date = temp4;
      this._max_date = temp5;
      scheduler2._date = temp6;
      ts.month_day = temp7;
      this._ignores_detected = temp8;
      return d;
    };
    scheduler2.destroyCalendar = function(cal, force) {
      if (!cal && this._def_count && this._def_count.firstChild) {
        if (force || (/* @__PURE__ */ new Date()).valueOf() - this._def_count._created.valueOf() > 500)
          cal = this._def_count.firstChild;
      }
      if (!cal)
        return;
      minicalDomEvents.detachAll();
      cal.innerHTML = "";
      if (cal.parentNode)
        cal.parentNode.removeChild(cal);
      if (this._def_count)
        this._def_count.style.top = "-1000px";
      if (cal.conf && cal.conf._on_xle_handler)
        scheduler2.detachEvent(cal.conf._on_xle_handler);
    };
    scheduler2.isCalendarVisible = function() {
      if (this._def_count && parseInt(this._def_count.style.top, 10) > 0)
        return this._def_count;
      return false;
    };
    scheduler2.attachEvent("onTemplatesReady", function() {
      scheduler2.event(document.body, "click", function() {
        scheduler2.destroyCalendar();
      });
    }, { once: true });
    scheduler2.form_blocks.calendar_time = { render: function(sns) {
      var html = "<span class='dhx_minical_input_wrapper'><input class='dhx_readonly dhx_minical_input' type='text' readonly='true'></span>";
      var cfg = scheduler2.config;
      var dt = this.date.date_part(scheduler2._currentDate());
      var last = 24 * 60, first = 0;
      if (cfg.limit_time_select) {
        first = 60 * cfg.first_hour;
        last = 60 * cfg.last_hour + 1;
      }
      dt.setHours(first / 60);
      sns._time_values = [];
      html += " <select class='dhx_lightbox_time_select'>";
      for (var i = first; i < last; i += this.config.time_step * 1) {
        var time = this.templates.time_picker(dt);
        html += "<option value='" + i + "'>" + time + "</option>";
        sns._time_values.push(i);
        dt = this.date.add(dt, this.config.time_step, "minute");
      }
      html += "</select>";
      return "<div class='dhx_section_time dhx_lightbox_minical'>" + html + "<span class='dhx_lightbox_minical_spacer'> &nbsp;&ndash;&nbsp; </span>" + html + "</div>";
    }, set_value: function(node, value, ev, config) {
      var inputs = node.getElementsByTagName("input");
      var selects = node.getElementsByTagName("select");
      var start_date, end_date;
      var _init_once = function(inp, date, number) {
        scheduler2.event(inp, "click", function() {
          scheduler2.destroyCalendar(null, true);
          scheduler2.renderCalendar({ position: inp, date: new Date(this._date), navigation: true, handler: function(new_date) {
            inp.value = scheduler2.templates.calendar_time(new_date);
            inp._date = new Date(new_date);
            scheduler2.destroyCalendar();
            if (scheduler2.config.event_duration && scheduler2.config.auto_end_date && number === 0) {
              _update_minical_select();
            }
          } });
        });
      };
      if (scheduler2.config.full_day) {
        if (!node._full_day) {
          var html = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + scheduler2.locale.labels.full_day + "&nbsp;</label></input>";
          if (!scheduler2.config.wide_form)
            html = node.previousSibling.innerHTML + html;
          node.previousSibling.innerHTML = html;
          node._full_day = true;
        }
        var input = node.previousSibling.getElementsByTagName("input")[0];
        var isFulldayEvent = scheduler2.date.time_part(ev.start_date) === 0 && scheduler2.date.time_part(ev.end_date) === 0;
        input.checked = isFulldayEvent;
        selects[0].disabled = input.checked;
        selects[1].disabled = input.checked;
        if (!input.$_eventAttached) {
          input.$_eventAttached = true;
          scheduler2.event(input, "click", function() {
            if (input.checked === true) {
              var obj = {};
              scheduler2.form_blocks.calendar_time.get_value(node, obj);
              start_date = scheduler2.date.date_part(obj.start_date);
              end_date = scheduler2.date.date_part(obj.end_date);
              if (+end_date == +start_date || +end_date >= +start_date && (ev.end_date.getHours() !== 0 || ev.end_date.getMinutes() !== 0))
                end_date = scheduler2.date.add(end_date, 1, "day");
            } else {
              start_date = null;
              end_date = null;
            }
            var start = start_date || ev.start_date;
            var end = end_date || ev.end_date;
            _attach_action(inputs[0], start);
            _attach_action(inputs[1], end);
            selects[0].value = start.getHours() * 60 + start.getMinutes();
            selects[1].value = end.getHours() * 60 + end.getMinutes();
            selects[0].disabled = input.checked;
            selects[1].disabled = input.checked;
          });
        }
      }
      if (scheduler2.config.event_duration && scheduler2.config.auto_end_date) {
        var _update_minical_select = function() {
          if (!(scheduler2.config.auto_end_date && scheduler2.config.event_duration)) {
            return;
          }
          start_date = scheduler2.date.add(inputs[0]._date, selects[0].value, "minute");
          end_date = new Date(start_date.getTime() + scheduler2.config.event_duration * 60 * 1e3);
          inputs[1].value = scheduler2.templates.calendar_time(end_date);
          inputs[1]._date = scheduler2.date.date_part(new Date(end_date));
          selects[1].value = end_date.getHours() * 60 + end_date.getMinutes();
        };
        if (!selects[0].$_eventAttached) {
          selects[0].addEventListener("change", _update_minical_select);
        }
      }
      function _attach_action(inp, date, number) {
        _init_once(inp, date, number);
        inp.value = scheduler2.templates.calendar_time(date);
        inp._date = scheduler2.date.date_part(new Date(date));
      }
      _attach_action(inputs[0], ev.start_date, 0);
      _attach_action(inputs[1], ev.end_date, 1);
      _init_once = function() {
      };
      function _round_minutes(date) {
        var time_values = config._time_values;
        var direct_value = date.getHours() * 60 + date.getMinutes();
        var fixed_value = direct_value;
        var value_found = false;
        for (var k = 0; k < time_values.length; k++) {
          var t_v = time_values[k];
          if (t_v === direct_value) {
            value_found = true;
            break;
          }
          if (t_v < direct_value)
            fixed_value = t_v;
        }
        if (!(value_found || fixed_value))
          return -1;
        return value_found ? direct_value : fixed_value;
      }
      selects[0].value = _round_minutes(ev.start_date);
      selects[1].value = _round_minutes(ev.end_date);
    }, get_value: function(node, ev) {
      var inputs = node.getElementsByTagName("input");
      var selects = node.getElementsByTagName("select");
      ev.start_date = scheduler2.date.add(inputs[0]._date, selects[0].value, "minute");
      ev.end_date = scheduler2.date.add(inputs[1]._date, selects[1].value, "minute");
      if (ev.end_date <= ev.start_date)
        ev.end_date = scheduler2.date.add(ev.start_date, scheduler2.config.time_step, "minute");
      return { start_date: new Date(ev.start_date), end_date: new Date(ev.end_date) };
    }, focus: function(node) {
    } };
    scheduler2.linkCalendar = function(calendar, datediff) {
      var action = function() {
        var date = scheduler2._date;
        var dateNew = new Date(date.valueOf());
        if (datediff)
          dateNew = datediff(dateNew);
        dateNew.setDate(1);
        scheduler2.updateCalendar(calendar, dateNew);
        return true;
      };
      scheduler2.attachEvent("onViewChange", action);
      scheduler2.attachEvent("onXLE", action);
      scheduler2.attachEvent("onEventAdded", action);
      scheduler2.attachEvent("onEventChanged", action);
      scheduler2.attachEvent("onEventDeleted", action);
      action();
    };
    scheduler2._markCalendarCurrentDate = function(calendar) {
      var state = scheduler2.getState();
      var from = state.min_date;
      var to = state.max_date;
      var mode = state.mode;
      var month_start = scheduler2.date.month_start(new Date(calendar._date));
      var month_end = scheduler2.date.add(month_start, 1, "month");
      var noHighlight = { month: true, year: true, agenda: true, grid: true };
      if (noHighlight[mode] || from.valueOf() <= month_start.valueOf() && to.valueOf() >= month_end.valueOf()) {
        return;
      }
      var current = from;
      while (current.valueOf() < to.valueOf()) {
        if (month_start.valueOf() <= current.valueOf() && month_end > current) {
          scheduler2.markCalendar(calendar, current, "dhx_calendar_click");
        }
        current = scheduler2.date.add(current, 1, "day");
      }
    };
    scheduler2.attachEvent("onEventCancel", function() {
      scheduler2.destroyCalendar(null, true);
    });
    scheduler2.attachEvent("onDestroy", function() {
      scheduler2.destroyCalendar();
    });
  }
  function monthheight(scheduler2) {
    scheduler2.attachEvent("onTemplatesReady", function() {
      scheduler2.xy.scroll_width = 0;
      var old = scheduler2.render_view_data;
      scheduler2.render_view_data = function() {
        var data = this._els["dhx_cal_data"][0];
        data.firstChild._h_fix = true;
        old.apply(scheduler2, arguments);
        var height = parseInt(data.style.height);
        data.style.height = "1px";
        data.style.height = data.scrollHeight + "px";
        this._obj.style.height = this._obj.clientHeight + data.scrollHeight - height + "px";
      };
      var old_s = scheduler2._reset_month_scale;
      scheduler2._reset_month_scale = function(a, b, c, d) {
        var dummy = { clientHeight: 100 };
        old_s.apply(scheduler2, [dummy, b, c, d]);
        a.innerHTML = dummy.innerHTML;
      };
    });
  }
  function multisection_restricted(scheduler2) {
    notImplemented.alert("Multisection", scheduler2.assert);
  }
  function multiselect(scheduler2) {
    function parseXMLOptions(loader, config) {
      var items = scheduler2.ajax.xpath("//data/item", loader.xmlDoc);
      var ids = {};
      for (var i = 0; i < items.length; i++) {
        ids[items[i].getAttribute(config.map_to)] = true;
      }
      return ids;
    }
    function parseJSONOptions(loader, config) {
      try {
        var items = JSON.parse(loader.xmlDoc.responseText);
        var ids = {};
        for (var i = 0; i < items.length; i++) {
          var option = items[i];
          ids[option.value || option.key || option.id] = true;
        }
        return ids;
      } catch (e) {
        return null;
      }
    }
    scheduler2.form_blocks["multiselect"] = { render: function(sns) {
      var css = "dhx_multi_select_control dhx_multi_select_" + sns.name;
      if (!!sns.vertical) {
        css += " dhx_multi_select_control_vertical";
      }
      var _result = "<div class='" + css + "' style='overflow: auto; height: " + sns.height + "px; position: relative;' >";
      for (var i = 0; i < sns.options.length; i++) {
        _result += "<label><input type='checkbox' value='" + sns.options[i].key + "'/>" + sns.options[i].label + "</label>";
      }
      _result += "</div>";
      return _result;
    }, set_value: function(node, value, ev, config) {
      var _children = node.getElementsByTagName("input");
      for (var i = 0; i < _children.length; i++) {
        _children[i].checked = false;
      }
      function _mark_inputs(ids) {
        var _children2 = node.getElementsByTagName("input");
        for (var i2 = 0; i2 < _children2.length; i2++) {
          _children2[i2].checked = !!ids[_children2[i2].value];
        }
      }
      var _ids = {};
      if (ev[config.map_to]) {
        var results = (ev[config.map_to] + "").split(config.delimiter || scheduler2.config.section_delimiter || ",");
        for (var i = 0; i < results.length; i++) {
          _ids[results[i]] = true;
        }
        _mark_inputs(_ids);
      } else {
        if (scheduler2._new_event || !config.script_url)
          return;
        var divLoading = document.createElement("div");
        divLoading.className = "dhx_loading";
        divLoading.style.cssText = "position: absolute; top: 40%; left: 40%;";
        node.appendChild(divLoading);
        var url2 = [config.script_url, config.script_url.indexOf("?") == -1 ? "?" : "&", "dhx_crosslink_" + config.map_to + "=" + ev.id + "&uid=" + scheduler2.uid()].join("");
        scheduler2.ajax.get(url2, function(loader) {
          var options = parseJSONOptions(loader);
          if (!options) {
            options = parseXMLOptions(loader, config);
          }
          _mark_inputs(options);
          node.removeChild(divLoading);
        });
      }
    }, get_value: function(node, ev, config) {
      var _result = [];
      var _children = node.getElementsByTagName("input");
      for (var i = 0; i < _children.length; i++) {
        if (_children[i].checked)
          _result.push(_children[i].value);
      }
      return _result.join(config.delimiter || scheduler2.config.section_delimiter || ",");
    }, focus: function(node) {
    } };
  }
  function multisource(scheduler2) {
    function backup(obj) {
      var t2 = function() {
      };
      t2.prototype = obj;
      return t2;
    }
    var old = scheduler2._load;
    scheduler2._load = function(url2, from) {
      url2 = url2 || this._load_url;
      if (typeof url2 == "object") {
        var t2 = backup(this._loaded);
        for (var i = 0; i < url2.length; i++) {
          this._loaded = new t2();
          old.call(this, url2[i], from);
        }
      } else
        old.apply(this, arguments);
    };
  }
  function mvc(scheduler2) {
    var cfg = { use_id: false };
    function sanitize(ev) {
      var obj = {};
      for (var key in ev)
        if (key.indexOf("_") !== 0)
          obj[key] = ev[key];
      if (!cfg.use_id)
        delete obj.id;
      return obj;
    }
    var update_timer;
    function update_view() {
      clearTimeout(update_timer);
      update_timer = setTimeout(function() {
        if (scheduler2.$destroyed) {
          return true;
        }
        scheduler2.updateView();
      }, 1);
    }
    function _start_ext_load(cal) {
      cal._loading = true;
      cal._not_render = true;
      cal.callEvent("onXLS", []);
    }
    function _finish_ext_load(cal) {
      cal._not_render = false;
      if (cal._render_wait)
        cal.render_view_data();
      cal._loading = false;
      cal.callEvent("onXLE", []);
    }
    function _get_id(model) {
      return cfg.use_id ? model.id : model.cid;
    }
    scheduler2.backbone = function(events, config) {
      if (config)
        cfg = config;
      events.bind("change", function(model, info) {
        var cid = _get_id(model);
        var ev = scheduler2._events[cid] = model.toJSON();
        ev.id = cid;
        scheduler2._init_event(ev);
        update_view();
      });
      events.bind("remove", function(model, changes) {
        var cid = _get_id(model);
        if (scheduler2._events[cid])
          scheduler2.deleteEvent(cid);
      });
      var queue = [];
      function add_from_queue() {
        if (scheduler2.$destroyed) {
          return true;
        }
        if (queue.length) {
          scheduler2.parse(queue, "json");
          queue = [];
        }
      }
      events.bind("add", function(model, changes) {
        var cid = _get_id(model);
        if (!scheduler2._events[cid]) {
          var ev = model.toJSON();
          ev.id = cid;
          scheduler2._init_event(ev);
          queue.push(ev);
          if (queue.length == 1)
            setTimeout(add_from_queue, 1);
        }
      });
      events.bind("request", function(obj) {
        if (obj instanceof Backbone.Collection)
          _start_ext_load(scheduler2);
      });
      events.bind("sync", function(obj) {
        if (obj instanceof Backbone.Collection)
          _finish_ext_load(scheduler2);
      });
      events.bind("error", function(obj) {
        if (obj instanceof Backbone.Collection)
          _finish_ext_load(scheduler2);
      });
      scheduler2.attachEvent("onEventCreated", function(id2) {
        var ev = new events.model(scheduler2.getEvent(id2));
        scheduler2._events[id2] = ev.toJSON();
        scheduler2._events[id2].id = id2;
        return true;
      });
      scheduler2.attachEvent("onEventAdded", function(id2) {
        if (!events.get(id2)) {
          var data = sanitize(scheduler2.getEvent(id2));
          var model = new events.model(data);
          var cid = _get_id(model);
          if (cid != id2)
            this.changeEventId(id2, cid);
          events.add(model);
          events.trigger("scheduler:add", model);
        }
        return true;
      });
      scheduler2.attachEvent("onEventChanged", function(id2) {
        var ev = events.get(id2);
        var upd = sanitize(scheduler2.getEvent(id2));
        ev.set(upd);
        events.trigger("scheduler:change", ev);
        return true;
      });
      scheduler2.attachEvent("onEventDeleted", function(id2) {
        var model = events.get(id2);
        if (model) {
          events.trigger("scheduler:remove", model);
          events.remove(id2);
        }
        return true;
      });
    };
  }
  function outerdrag(scheduler2) {
    scheduler2.attachEvent("onTemplatesReady", function() {
      var dragger = new dhtmlDragAndDropObject();
      var old = dragger.stopDrag;
      var last_event;
      dragger.stopDrag = function(e) {
        last_event = e;
        return old.apply(this, arguments);
      };
      function on_drop(sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml) {
        if (scheduler2.checkEvent("onBeforeExternalDragIn") && !scheduler2.callEvent("onBeforeExternalDragIn", [sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml, last_event]))
          return;
        var temp = scheduler2.attachEvent("onEventCreated", function(id2) {
          if (!scheduler2.callEvent("onExternalDragIn", [id2, sourceHtmlObject, last_event])) {
            this._drag_mode = this._drag_id = null;
            this.deleteEvent(id2);
          }
        });
        var action_data = scheduler2.getActionData(last_event);
        var event_data = { start_date: new Date(action_data.date) };
        if (scheduler2.matrix && scheduler2.matrix[scheduler2._mode]) {
          var view_options = scheduler2.matrix[scheduler2._mode];
          event_data[view_options.y_property] = action_data.section;
          var pos = scheduler2._locate_cell_timeline(last_event);
          event_data.start_date = view_options._trace_x[pos.x];
          event_data.end_date = scheduler2.date.add(event_data.start_date, view_options.x_step, view_options.x_unit);
        }
        if (scheduler2._props && scheduler2._props[scheduler2._mode]) {
          event_data[scheduler2._props[scheduler2._mode].map_to] = action_data.section;
        }
        scheduler2.addEventNow(event_data);
        scheduler2.detachEvent(temp);
      }
      dragger.addDragLanding(scheduler2._els["dhx_cal_data"][0], { _drag: function(sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml) {
        on_drop(sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml);
      }, _dragIn: function(htmlObject, shtmlObject) {
        return htmlObject;
      }, _dragOut: function(htmlObject) {
        return this;
      } });
      if (dhtmlx.DragControl) {
        dhtmlx.DragControl.addDrop(scheduler2._els["dhx_cal_data"][0], { onDrop: function(source, target, d, e) {
          var sourceDhtmlx = dhtmlx.DragControl.getMaster(source);
          last_event = e;
          on_drop(source, sourceDhtmlx, target, e.target || e.srcElement);
        }, onDragIn: function(source, target, e) {
          return target;
        } }, true);
      }
    });
  }
  function pdf(scheduler2) {
    var dx, dy, html_regexp = new RegExp("<[^>]*>", "g"), newline_regexp = new RegExp("<br[^>]*>", "g");
    function clean_html(val) {
      return val.replace(newline_regexp, "\n").replace(html_regexp, "");
    }
    function x_norm(x, offset) {
      x = parseFloat(x);
      offset = parseFloat(offset);
      if (!isNaN(offset))
        x -= offset;
      var w = colsWidth(x);
      x = x - w.width + w.cols * dx;
      return isNaN(x) ? "auto" : 100 * x / dx;
    }
    function x_norm_event(x, offset, is_left) {
      x = parseFloat(x);
      offset = parseFloat(offset);
      if (!isNaN(offset) && is_left)
        x -= offset;
      var w = colsWidth(x);
      x = x - w.width + w.cols * dx;
      return isNaN(x) ? "auto" : 100 * x / (dx - (!isNaN(offset) ? offset : 0));
    }
    function colsWidth(width) {
      var r = 0;
      var header = scheduler2._els.dhx_cal_header[0].childNodes;
      var els = header[1] ? header[1].childNodes : header[0].childNodes;
      for (var i = 0; i < els.length; i++) {
        var el2 = els[i].style ? els[i] : els[i].parentNode;
        var w = parseFloat(el2.style.width);
        if (width > w) {
          width -= w + 1;
          r += w + 1;
        } else
          break;
      }
      return { width: r, cols: i };
    }
    function y_norm(y) {
      y = parseFloat(y);
      if (isNaN(y))
        return "auto";
      return 100 * y / dy;
    }
    function get_style(node, style) {
      return (window.getComputedStyle ? window.getComputedStyle(node, null)[style] : node.currentStyle ? node.currentStyle[style] : null) || "";
    }
    function de_day(node, n) {
      var x = parseInt(node.style.left, 10);
      for (var dx2 = 0; dx2 < scheduler2._cols.length; dx2++) {
        x -= scheduler2._cols[dx2];
        if (x < 0)
          return dx2;
      }
      return n;
    }
    function de_week(node, n) {
      var y = parseInt(node.style.top, 10);
      for (var dy2 = 0; dy2 < scheduler2._colsS.heights.length; dy2++)
        if (scheduler2._colsS.heights[dy2] > y)
          return dy2;
      return n;
    }
    function xml_start(tag) {
      return tag ? "<" + tag + ">" : "";
    }
    function xml_end(tag) {
      return tag ? "</" + tag + ">" : "";
    }
    function xml_top(tag, profile, header, footer) {
      var xml = "<" + tag + " profile='" + profile + "'";
      if (header)
        xml += " header='" + header + "'";
      if (footer)
        xml += " footer='" + footer + "'";
      xml += ">";
      return xml;
    }
    function xml_body_header() {
      var xml = "";
      var mode = scheduler2._mode;
      if (scheduler2.matrix && scheduler2.matrix[scheduler2._mode])
        mode = scheduler2.matrix[scheduler2._mode].render == "cell" ? "matrix" : "timeline";
      xml += "<scale mode='" + mode + "' today='" + scheduler2._els.dhx_cal_date[0].innerHTML + "'>";
      if (scheduler2._mode == "week_agenda") {
        var xh = scheduler2._els.dhx_cal_data[0].getElementsByTagName("DIV");
        for (var i = 0; i < xh.length; i++)
          if (xh[i].className == "dhx_wa_scale_bar")
            xml += "<column>" + clean_html(xh[i].innerHTML) + "</column>";
      } else if (scheduler2._mode == "agenda" || scheduler2._mode == "map") {
        var xh = scheduler2._els.dhx_cal_header[0].childNodes[0].childNodes;
        xml += "<column>" + clean_html(xh[0].innerHTML) + "</column><column>" + clean_html(xh[1].innerHTML) + "</column>";
      } else if (scheduler2._mode == "year") {
        var xh = scheduler2._els.dhx_cal_data[0].childNodes;
        for (var i = 0; i < xh.length; i++) {
          xml += "<month label='" + clean_html(xh[i].querySelector(".dhx_year_month").innerHTML) + "'>";
          xml += xml_month_scale(xh[i].querySelector(".dhx_year_week").childNodes);
          xml += xml_month(xh[i].querySelector(".dhx_year_body"));
          xml += "</month>";
        }
      } else {
        xml += "<x>";
        var xh = scheduler2._els.dhx_cal_header[0].childNodes;
        xml += xml_month_scale(xh);
        xml += "</x>";
        var yh = scheduler2._els.dhx_cal_data[0];
        if (scheduler2.matrix && scheduler2.matrix[scheduler2._mode]) {
          xml += "<y>";
          for (var i = 0; i < yh.firstChild.rows.length; i++) {
            var el2 = yh.firstChild.rows[i];
            xml += "<row><![CDATA[" + clean_html(el2.cells[0].innerHTML) + "]]></row>";
          }
          xml += "</y>";
          dy = yh.firstChild.rows[0].cells[0].offsetHeight;
        } else if (yh.firstChild.tagName == "TABLE") {
          xml += xml_month(yh);
        } else {
          yh = yh.childNodes[yh.childNodes.length - 1];
          while (yh.className.indexOf("dhx_scale_holder") == -1)
            yh = yh.previousSibling;
          yh = yh.childNodes;
          xml += "<y>";
          for (var i = 0; i < yh.length; i++)
            xml += "\n<row><![CDATA[" + clean_html(yh[i].innerHTML) + "]]></row>";
          xml += "</y>";
          dy = yh[0].offsetHeight;
        }
      }
      xml += "</scale>";
      return xml;
    }
    function xml_month(yh) {
      var xml = "";
      var r = yh.querySelectorAll("tr");
      for (var i = 0; i < r.length; i++) {
        var days = [];
        var cells = r[i].querySelectorAll("td");
        for (var j = 0; j < cells.length; j++)
          days.push(cells[j].querySelector(".dhx_month_head").innerHTML);
        xml += "\n<row height='" + cells[0].offsetHeight + "'><![CDATA[" + clean_html(days.join("|")) + "]]></row>";
        dy = cells[0].offsetHeight;
      }
      return xml;
    }
    function xml_month_scale(xh) {
      var xhs, xml = "";
      if (scheduler2.matrix && scheduler2.matrix[scheduler2._mode]) {
        if (scheduler2.matrix[scheduler2._mode].second_scale)
          xhs = xh[1].childNodes;
        xh = xh[0].childNodes;
      }
      for (var i = 0; i < xh.length; i++)
        xml += "\n<column><![CDATA[" + clean_html(xh[i].innerHTML) + "]]></column>";
      dx = xh[0].offsetWidth;
      if (xhs) {
        var width = 0;
        var top_width = xh[0].offsetWidth;
        var top_col = 1;
        for (var i = 0; i < xhs.length; i++) {
          xml += "\n<column second_scale='" + top_col + "'><![CDATA[" + clean_html(xhs[i].innerHTML) + "]]></column>";
          width += xhs[i].offsetWidth;
          if (width >= top_width) {
            top_width += xh[top_col] ? xh[top_col].offsetWidth : 0;
            top_col++;
          }
          dx = xhs[0].offsetWidth;
        }
      }
      return xml;
    }
    function xml_body(colors) {
      var xml = "";
      var evs = scheduler2._rendered;
      var matrix = scheduler2.matrix && scheduler2.matrix[scheduler2._mode];
      if (scheduler2._mode == "agenda" || scheduler2._mode == "map") {
        for (var i = 0; i < evs.length; i++)
          xml += "<event><head><![CDATA[" + clean_html(evs[i].childNodes[0].innerHTML) + "]]></head><body><![CDATA[" + clean_html(evs[i].childNodes[2].innerHTML) + "]]></body></event>";
      } else if (scheduler2._mode == "week_agenda") {
        for (var i = 0; i < evs.length; i++)
          xml += "<event day='" + evs[i].parentNode.getAttribute("day") + "'><body>" + clean_html(evs[i].innerHTML) + "</body></event>";
      } else if (scheduler2._mode == "year") {
        var evs = scheduler2.get_visible_events();
        for (var i = 0; i < evs.length; i++) {
          var d = evs[i].start_date;
          if (d.valueOf() < scheduler2._min_date.valueOf())
            d = scheduler2._min_date;
          while (d < evs[i].end_date) {
            var m = d.getMonth() + 12 * (d.getFullYear() - scheduler2._min_date.getFullYear()) - scheduler2.week_starts._month;
            var day = scheduler2.week_starts[m] + d.getDate() - 1;
            var text_color = colors ? get_style(scheduler2._get_year_cell(d), "color") : "";
            var bg_color = colors ? get_style(scheduler2._get_year_cell(d), "backgroundColor") : "";
            xml += "<event day='" + day % 7 + "' week='" + Math.floor(day / 7) + "' month='" + m + "' backgroundColor='" + bg_color + "' color='" + text_color + "'></event>";
            d = scheduler2.date.add(d, 1, "day");
            if (d.valueOf() >= scheduler2._max_date.valueOf())
              break;
          }
        }
      } else if (matrix && matrix.render == "cell") {
        var evs = scheduler2._els.dhx_cal_data[0].getElementsByTagName("TD");
        for (var i = 0; i < evs.length; i++) {
          var text_color = colors ? get_style(evs[i], "color") : "";
          var bg_color = colors ? get_style(evs[i], "backgroundColor") : "";
          xml += "\n<event><body backgroundColor='" + bg_color + "' color='" + text_color + "'><![CDATA[" + clean_html(evs[i].innerHTML) + "]]></body></event>";
        }
      } else {
        for (var i = 0; i < evs.length; i++) {
          var zx, zdx;
          if (scheduler2.matrix && scheduler2.matrix[scheduler2._mode]) {
            zx = x_norm(evs[i].style.left);
            zdx = x_norm(evs[i].offsetWidth) - 1;
          } else {
            var left_norm = scheduler2.config.use_select_menu_space ? 0 : 26;
            zx = x_norm_event(evs[i].style.left, left_norm, true);
            zdx = x_norm_event(evs[i].style.width, left_norm) - 1;
          }
          if (isNaN(zdx * 1))
            continue;
          var zy = y_norm(evs[i].style.top);
          var zdy = y_norm(evs[i].style.height);
          var e_type = evs[i].className.split(" ")[0].replace("dhx_cal_", "");
          if (e_type === "dhx_tooltip_line")
            continue;
          var dets = scheduler2.getEvent(evs[i].getAttribute(scheduler2.config.event_attribute));
          if (!dets)
            continue;
          var day = dets._sday;
          var week = dets._sweek;
          var length = dets._length || 0;
          if (scheduler2._mode == "month") {
            zdy = parseInt(evs[i].offsetHeight, 10);
            zy = parseInt(evs[i].style.top, 10) - scheduler2.xy.month_head_height;
            day = de_day(evs[i], day);
            week = de_week(evs[i], week);
          } else if (scheduler2.matrix && scheduler2.matrix[scheduler2._mode]) {
            day = 0;
            var el2 = evs[i].parentNode.parentNode.parentNode;
            week = el2.rowIndex;
            var dy_copy = dy;
            dy = evs[i].parentNode.offsetHeight;
            zy = y_norm(evs[i].style.top);
            zy -= zy * 0.2;
            dy = dy_copy;
          } else {
            if (evs[i].parentNode == scheduler2._els.dhx_cal_data[0])
              continue;
            var parent = scheduler2._els["dhx_cal_data"][0].childNodes[0];
            var offset = parseFloat(parent.className.indexOf("dhx_scale_holder") != -1 ? parent.style.left : 0);
            zx += x_norm(evs[i].parentNode.style.left, offset);
          }
          xml += "\n<event week='" + week + "' day='" + day + "' type='" + e_type + "' x='" + zx + "' y='" + zy + "' width='" + zdx + "' height='" + zdy + "' len='" + length + "'>";
          if (e_type == "event") {
            xml += "<header><![CDATA[" + clean_html(evs[i].childNodes[1].innerHTML) + "]]></header>";
            var text_color = colors ? get_style(evs[i].childNodes[2], "color") : "";
            var bg_color = colors ? get_style(evs[i].childNodes[2], "backgroundColor") : "";
            xml += "<body backgroundColor='" + bg_color + "' color='" + text_color + "'><![CDATA[" + clean_html(evs[i].childNodes[2].innerHTML) + "]]></body>";
          } else {
            var text_color = colors ? get_style(evs[i], "color") : "";
            var bg_color = colors ? get_style(evs[i], "backgroundColor") : "";
            xml += "<body backgroundColor='" + bg_color + "' color='" + text_color + "'><![CDATA[" + clean_html(evs[i].innerHTML) + "]]></body>";
          }
          xml += "</event>";
        }
      }
      return xml;
    }
    function toXML(start, end, view, mode, header, footer) {
      var colors = false;
      if (mode == "fullcolor") {
        colors = true;
        mode = "color";
      }
      mode = mode || "color";
      var xml = "";
      if (start) {
        var original_date = scheduler2._date;
        var original_mode = scheduler2._mode;
        end = scheduler2.date[view + "_start"](end);
        end = scheduler2.date["get_" + view + "_end"] ? scheduler2.date["get_" + view + "_end"](end) : scheduler2.date.add(end, 1, view);
        xml = xml_top("pages", mode, header, footer);
        for (var temp_date = new Date(start); +temp_date < +end; temp_date = this.date.add(temp_date, 1, view)) {
          this.setCurrentView(temp_date, view);
          xml += xml_start("page") + xml_body_header().replace("–", "-") + xml_body(colors) + xml_end("page");
        }
        xml += xml_end("pages");
        this.setCurrentView(original_date, original_mode);
      } else {
        xml = xml_top("data", mode, header, footer) + xml_body_header().replace("–", "-") + xml_body(colors) + xml_end("data");
      }
      return xml;
    }
    scheduler2.getPDFData = toXML;
    function send_xml(xml, url2) {
      var uid2 = scheduler2.uid();
      var d = document.createElement("div");
      d.style.display = "none";
      document.body.appendChild(d);
      d.innerHTML = '<form id="' + uid2 + '" method="post" target="_blank" action="' + url2 + '" accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><input type="hidden" name="mycoolxmlbody"/> </form>';
      document.getElementById(uid2).firstChild.value = encodeURIComponent(xml);
      document.getElementById(uid2).submit();
      d.parentNode.removeChild(d);
    }
    function to_pdf(start, end, view, url2, mode, header, footer) {
      var xml = "";
      if (typeof mode == "object") {
        xml = schedulersToPdf(mode);
      } else {
        xml = toXML.apply(this, [start, end, view, mode, header, footer]);
      }
      send_xml(xml, url2);
    }
    function schedulersToPdf(objects) {
      var xml = "<data>";
      for (var i = 0; i < objects.length; i++) {
        xml += objects[i].source.getPDFData(objects[i].start, objects[i].end, objects[i].view, objects[i].mode, objects[i].header, objects[i].footer);
      }
      xml += "</data>";
      return xml;
    }
    scheduler2.toPDF = function(url2, mode, header, footer) {
      return to_pdf.apply(this, [null, null, null, url2, mode, header, footer]);
    };
    scheduler2.toPDFRange = function(start, end, view, url2, mode, header, footer) {
      if (typeof start == "string") {
        start = scheduler2.templates.api_date(start);
        end = scheduler2.templates.api_date(end);
      }
      return to_pdf.apply(this, arguments);
    };
  }
  function quick_info(scheduler2) {
    scheduler2.config.icons_select = ["icon_form", "icon_delete"];
    scheduler2.config.details_on_create = true;
    scheduler2.config.show_quick_info = true;
    scheduler2.xy.menu_width = 0;
    let clickedElementPosition = null;
    scheduler2.attachEvent("onSchedulerReady", function() {
      const container = scheduler2.$container;
      if (container._$quickInfoHandler) {
        return;
      } else {
        container._$quickInfoHandler = true;
        scheduler2.event(container, "mousedown", function(e) {
          const eventElement = e.target.closest(`[${scheduler2.config.event_attribute}]`);
          if (eventElement) {
            clickedElementPosition = { id: eventElement.getAttribute(scheduler2.config.event_attribute), position: getPositionInsideScheduler(eventElement) };
          }
        });
        scheduler2.attachEvent("onDestroy", () => {
          delete container._$quickInfoHandler;
        });
      }
    });
    scheduler2.attachEvent("onClick", function(id2) {
      if (!scheduler2.config.show_quick_info) {
        return;
      }
      scheduler2.showQuickInfo(id2);
      return true;
    });
    (function() {
      var events = ["onEmptyClick", "onViewChange", "onLightbox", "onBeforeEventDelete", "onBeforeDrag"];
      var hiding_function = function() {
        scheduler2.hideQuickInfo(true);
        return true;
      };
      for (var i = 0; i < events.length; i++) {
        scheduler2.attachEvent(events[i], hiding_function);
      }
    })();
    scheduler2.templates.quick_info_title = function(start, end, ev) {
      return ev.text.substr(0, 50);
    };
    scheduler2.templates.quick_info_content = function(start, end, ev) {
      return ev.details || "";
    };
    scheduler2.templates.quick_info_date = function(start, end, ev) {
      if (scheduler2.isOneDayEvent(ev) && scheduler2.config.rtl) {
        return scheduler2.templates.day_date(start, end, ev) + " " + scheduler2.templates.event_header(end, start, ev);
      } else if (scheduler2.isOneDayEvent(ev)) {
        return scheduler2.templates.day_date(start, end, ev) + " " + scheduler2.templates.event_header(start, end, ev);
      } else if (scheduler2.config.rtl) {
        return scheduler2.templates.week_date(end, start, ev);
      } else {
        return scheduler2.templates.week_date(start, end, ev);
      }
    };
    scheduler2.showQuickInfo = function(id2) {
      if (id2 == this._quick_info_box_id)
        return;
      this.hideQuickInfo(true);
      if (this.callEvent("onBeforeQuickInfo", [id2]) === false) {
        return;
      }
      let pos;
      if (clickedElementPosition && clickedElementPosition.id == id2) {
        pos = clickedElementPosition.position;
      } else {
        pos = this._get_event_counter_part(id2);
      }
      if (pos) {
        this._quick_info_box = this._init_quick_info(pos);
        this._fill_quick_data(id2);
        this._show_quick_info(pos);
        this.callEvent("onQuickInfo", [id2]);
      }
    };
    (function() {
      function cssTimeToMs(time) {
        time = time || "";
        var num = parseFloat(time), unit = time.match(/m?s/), milliseconds;
        if (unit) {
          unit = unit[0];
        }
        switch (unit) {
          case "s":
            milliseconds = num * 1e3;
            break;
          case "ms":
            milliseconds = num;
            break;
          default:
            milliseconds = 0;
            break;
        }
        return milliseconds;
      }
      scheduler2.hideQuickInfo = function(forced) {
        var qi = this._quick_info_box;
        var eventId = this._quick_info_box_id;
        this._quick_info_box_id = 0;
        if (qi && qi.parentNode) {
          var width = qi.offsetWidth;
          if (scheduler2.config.quick_info_detached) {
            this.callEvent("onAfterQuickInfo", [eventId]);
            return qi.parentNode.removeChild(qi);
          }
          if (qi.style.right == "auto")
            qi.style.left = -width + "px";
          else
            qi.style.right = -width + "px";
          if (forced) {
            qi.parentNode.removeChild(qi);
          } else {
            var style;
            if (window.getComputedStyle) {
              style = window.getComputedStyle(qi, null);
            } else if (qi.currentStyle) {
              style = qi.currentStyle;
            }
            var delay2 = cssTimeToMs(style["transition-delay"]) + cssTimeToMs(style["transition-duration"]);
            setTimeout(function() {
              if (qi.parentNode) {
                qi.parentNode.removeChild(qi);
              }
            }, delay2);
          }
          this.callEvent("onAfterQuickInfo", [eventId]);
        }
      };
    })();
    scheduler2.event(window, "keydown", function(e) {
      if (e.keyCode == 27)
        scheduler2.hideQuickInfo();
    });
    scheduler2._show_quick_info = function(pos) {
      var qi = scheduler2._quick_info_box;
      scheduler2._obj.appendChild(qi);
      var width = qi.offsetWidth;
      var height = qi.offsetHeight;
      if (scheduler2.config.quick_info_detached) {
        var left = pos.left - pos.dx * (width - pos.width);
        if (scheduler2.getView() && scheduler2.getView()._x_scroll) {
          if (scheduler2.config.rtl) {
            left += scheduler2.getView()._x_scroll;
          } else {
            left -= scheduler2.getView()._x_scroll;
          }
        }
        var right = left + width;
        if (right > window.innerWidth) {
          left = window.innerWidth - width;
        }
        left = Math.max(0, left);
        qi.style.left = left + "px";
        qi.style.top = pos.top - (pos.dy ? height : -pos.height) + "px";
      } else {
        const dataPos = scheduler2.$container.querySelector(".dhx_cal_data").offsetTop;
        qi.style.top = dataPos + 20 + "px";
        if (pos.dx == 1) {
          qi.style.right = "auto";
          qi.style.left = -width + "px";
          setTimeout(function() {
            qi.style.left = "-10px";
          }, 1);
        } else {
          qi.style.left = "auto";
          qi.style.right = -width + "px";
          setTimeout(function() {
            qi.style.right = "-10px";
          }, 1);
        }
        qi.className = qi.className.replace(" dhx_qi_left", "").replace(" dhx_qi_right", "") + " dhx_qi_" + (pos.dx == 1 ? "left" : "right");
      }
      qi.ontransitionend = () => {
        fitQIInsideWindow(qi);
        qi.ontransitionend = null;
      };
      setTimeout(() => {
        fitQIInsideWindow(qi);
      }, 1);
    };
    function fitQIInsideWindow(quickInfoPopup) {
      const popupRect = quickInfoPopup.getBoundingClientRect();
      const containerRect = scheduler2.$container.getBoundingClientRect();
      const offsetBottom = containerRect.bottom - popupRect.bottom;
      if (offsetBottom < 0) {
        quickInfoPopup.style.top = `${parseFloat(quickInfoPopup.style.top) + offsetBottom}px`;
      }
    }
    scheduler2.attachEvent("onTemplatesReady", function() {
      scheduler2.hideQuickInfo();
      if (this._quick_info_box) {
        var box = this._quick_info_box;
        if (box.parentNode) {
          box.parentNode.removeChild(box);
        }
        this._quick_info_box = null;
      }
    });
    scheduler2._quick_info_onscroll_handler = function(e) {
      scheduler2.hideQuickInfo();
    };
    scheduler2._init_quick_info = function() {
      if (!this._quick_info_box) {
        var qi = this._quick_info_box = document.createElement("div");
        this._waiAria.quickInfoAttr(qi);
        qi.className = "dhx_cal_quick_info";
        if (scheduler2.$testmode)
          qi.className += " dhx_no_animate";
        if (scheduler2.config.rtl)
          qi.className += " dhx_quick_info_rtl";
        var ariaAttr = this._waiAria.quickInfoHeaderAttrString();
        var html = `
		<div class="dhx_cal_qi_tcontrols">
			<a class="dhx_cal_qi_close_btn scheduler_icon close"></a>
		</div>
		<div class="dhx_cal_qi_title" ${ariaAttr}>
				
				<div class="dhx_cal_qi_tcontent"></div>
				<div class="dhx_cal_qi_tdate"></div>
			</div>
			<div class="dhx_cal_qi_content"></div>`;
        html += '<div class="dhx_cal_qi_controls">';
        var buttons = scheduler2.config.icons_select;
        for (var i = 0; i < buttons.length; i++) {
          var ariaAttr = this._waiAria.quickInfoButtonAttrString(this.locale.labels[buttons[i]]);
          html += `<div ${ariaAttr} class="dhx_qi_big_icon ${buttons[i]}" title="${scheduler2.locale.labels[buttons[i]]}">
				<div class='dhx_menu_icon ${buttons[i]}'></div><div>${scheduler2.locale.labels[buttons[i]]}</div></div>`;
        }
        html += "</div>";
        qi.innerHTML = html;
        scheduler2.event(qi, "click", function(ev) {
          scheduler2._qi_button_click(ev.target || ev.srcElement);
        });
        if (scheduler2.config.quick_info_detached) {
          scheduler2._detachDomEvent(scheduler2._els["dhx_cal_data"][0], "scroll", scheduler2._quick_info_onscroll_handler);
          scheduler2.event(scheduler2._els["dhx_cal_data"][0], "scroll", scheduler2._quick_info_onscroll_handler);
        }
      }
      return this._quick_info_box;
    };
    scheduler2._qi_button_click = function(node) {
      var box = scheduler2._quick_info_box;
      if (!node || node == box)
        return;
      if (node.closest(".dhx_cal_qi_close_btn")) {
        scheduler2.hideQuickInfo();
        return;
      }
      var mask = scheduler2._getClassName(node);
      if (mask.indexOf("_icon") != -1) {
        var id2 = scheduler2._quick_info_box_id;
        scheduler2._click.buttons[mask.split(" ")[1].replace("icon_", "")](id2);
      } else
        scheduler2._qi_button_click(node.parentNode);
    };
    function getPositionInsideScheduler(element) {
      let left = 0;
      let top = 0;
      let node = element;
      while (node && node != scheduler2._obj) {
        left += node.offsetLeft;
        top += node.offsetTop - node.scrollTop;
        node = node.offsetParent;
      }
      if (node) {
        let dx = left + element.offsetWidth / 2 > scheduler2._x / 2 ? 1 : 0;
        let dy = top + element.offsetHeight / 2 > scheduler2._y / 2 ? 1 : 0;
        return { left, top, dx, dy, width: element.offsetWidth, height: element.offsetHeight };
      }
      return 0;
    }
    scheduler2._get_event_counter_part = function(id2) {
      var domEv = scheduler2.getRenderedEvent(id2);
      return getPositionInsideScheduler(domEv);
    };
    scheduler2._fill_quick_data = function(id2) {
      var ev = scheduler2.getEvent(id2);
      var qi = scheduler2._quick_info_box;
      scheduler2._quick_info_box_id = id2;
      var header = { content: scheduler2.templates.quick_info_title(ev.start_date, ev.end_date, ev), date: scheduler2.templates.quick_info_date(ev.start_date, ev.end_date, ev) };
      var titleContent = qi.querySelector(".dhx_cal_qi_tcontent");
      titleContent.innerHTML = `<span>${header.content}</span>`;
      var titleDate = qi.querySelector(".dhx_cal_qi_tdate");
      titleDate.innerHTML = header.date;
      scheduler2._waiAria.quickInfoHeader(qi, [header.content, header.date].join(" "));
      var main = qi.querySelector(".dhx_cal_qi_content");
      const mainContent = scheduler2.templates.quick_info_content(ev.start_date, ev.end_date, ev);
      if (mainContent) {
        main.classList.remove("dhx_hidden");
        main.innerHTML = mainContent;
      } else {
        main.classList.add("dhx_hidden");
      }
    };
  }
  function readonly(scheduler2) {
    scheduler2.attachEvent("onTemplatesReady", function() {
      var originalRecurringSetValue;
      if (scheduler2.form_blocks.recurring) {
        originalRecurringSetValue = scheduler2.form_blocks.recurring.set_value;
      }
      var original_left_buttons = scheduler2.config.buttons_left.slice();
      var original_right_buttons = scheduler2.config.buttons_right.slice();
      scheduler2.attachEvent("onBeforeLightbox", function(id2) {
        if (this.config.readonly_form || this.getEvent(id2).readonly) {
          this.config.readonly_active = true;
        } else {
          this.config.readonly_active = false;
          scheduler2.config.buttons_left = original_left_buttons.slice();
          scheduler2.config.buttons_right = original_right_buttons.slice();
          if (scheduler2.form_blocks.recurring) {
            scheduler2.form_blocks.recurring.set_value = originalRecurringSetValue;
          }
        }
        if (this.config.readonly_active) {
          var forbidden_buttons = ["dhx_delete_btn", "dhx_save_btn"];
          var button_arrays = [scheduler2.config.buttons_left, scheduler2.config.buttons_right];
          for (var i = 0; i < forbidden_buttons.length; i++) {
            var forbidden_button = forbidden_buttons[i];
            for (var k = 0; k < button_arrays.length; k++) {
              var button_array = button_arrays[k];
              var index = -1;
              for (var p = 0; p < button_array.length; p++) {
                if (button_array[p] == forbidden_button) {
                  index = p;
                  break;
                }
              }
              if (index != -1) {
                button_array.splice(index, 1);
              }
            }
          }
        }
        this.resetLightbox();
        return true;
      });
      function txt_replace(tag, d, n, text) {
        var txts = d.getElementsByTagName(tag);
        var txtt = n.getElementsByTagName(tag);
        for (var i = txtt.length - 1; i >= 0; i--) {
          var n = txtt[i];
          if (!text) {
            n.disabled = true;
            if (d.checked)
              n.checked = true;
          } else {
            var t2 = document.createElement("span");
            t2.className = "dhx_text_disabled";
            t2.innerHTML = text(txts[i]);
            n.parentNode.insertBefore(t2, n);
            n.parentNode.removeChild(n);
          }
        }
      }
      var old = scheduler2._fill_lightbox;
      scheduler2._fill_lightbox = function() {
        var lb = this.getLightbox();
        if (this.config.readonly_active) {
          lb.style.visibility = "hidden";
          lb.style.display = "block";
        }
        var res = old.apply(this, arguments);
        if (this.config.readonly_active) {
          lb.style.visibility = "";
          lb.style.display = "none";
        }
        if (this.config.readonly_active) {
          var originalForm = this.getLightbox();
          var readonlyForm = this._lightbox_r = originalForm.cloneNode(true);
          readonlyForm.id = scheduler2.uid();
          readonlyForm.className += " dhx_cal_light_readonly";
          txt_replace("textarea", originalForm, readonlyForm, function(a) {
            return a.value;
          });
          txt_replace("input", originalForm, readonlyForm, false);
          txt_replace("select", originalForm, readonlyForm, function(a) {
            if (!a.options.length)
              return "";
            return a.options[Math.max(a.selectedIndex || 0, 0)].text;
          });
          originalForm.parentNode.insertBefore(readonlyForm, originalForm);
          this.showCover(readonlyForm);
          if (scheduler2._lightbox)
            scheduler2._lightbox.parentNode.removeChild(scheduler2._lightbox);
          this._lightbox = readonlyForm;
          if (scheduler2.config.drag_lightbox)
            scheduler2.event(readonlyForm.firstChild, "mousedown", scheduler2._ready_to_dnd);
          scheduler2._init_lightbox_events();
          this.setLightboxSize();
        }
        return res;
      };
      var hold = scheduler2.hide_lightbox;
      scheduler2.hide_lightbox = function() {
        if (this._lightbox_r) {
          this._lightbox_r.parentNode.removeChild(this._lightbox_r);
          this._lightbox_r = this._lightbox = null;
        }
        return hold.apply(this, arguments);
      };
    });
  }
  var ALL_WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  var Weekday = function() {
    function Weekday2(weekday, n) {
      if (n === 0)
        throw new Error("Can't create weekday with n == 0");
      this.weekday = weekday;
      this.n = n;
    }
    Weekday2.fromStr = function(str) {
      return new Weekday2(ALL_WEEKDAYS.indexOf(str));
    };
    Weekday2.prototype.nth = function(n) {
      return this.n === n ? this : new Weekday2(this.weekday, n);
    };
    Weekday2.prototype.equals = function(other) {
      return this.weekday === other.weekday && this.n === other.n;
    };
    Weekday2.prototype.toString = function() {
      var s = ALL_WEEKDAYS[this.weekday];
      if (this.n)
        s = (this.n > 0 ? "+" : "") + String(this.n) + s;
      return s;
    };
    Weekday2.prototype.getJsWeekday = function() {
      return this.weekday === 6 ? 0 : this.weekday + 1;
    };
    return Weekday2;
  }();
  var isPresent = function(value) {
    return value !== null && value !== void 0;
  };
  var isNumber = function(value) {
    return typeof value === "number";
  };
  var isWeekdayStr = function(value) {
    return typeof value === "string" && ALL_WEEKDAYS.includes(value);
  };
  var isArray = Array.isArray;
  var range = function(start, end) {
    if (end === void 0) {
      end = start;
    }
    if (arguments.length === 1) {
      end = start;
      start = 0;
    }
    var rang = [];
    for (var i = start; i < end; i++)
      rang.push(i);
    return rang;
  };
  var repeat = function(value, times) {
    var i = 0;
    var array = [];
    if (isArray(value)) {
      for (; i < times; i++)
        array[i] = [].concat(value);
    } else {
      for (; i < times; i++)
        array[i] = value;
    }
    return array;
  };
  var toArray = function(item) {
    if (isArray(item)) {
      return item;
    }
    return [item];
  };
  function padStart(item, targetLength, padString) {
    if (padString === void 0) {
      padString = " ";
    }
    var str = String(item);
    targetLength = targetLength >> 0;
    if (str.length > targetLength) {
      return String(str);
    }
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += repeat(padString, targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(str);
  }
  var split = function(str, sep, num) {
    var splits = str.split(sep);
    return num ? splits.slice(0, num).concat([splits.slice(num).join(sep)]) : splits;
  };
  var pymod = function(a, b) {
    var r = a % b;
    return r * b < 0 ? r + b : r;
  };
  var divmod = function(a, b) {
    return { div: Math.floor(a / b), mod: pymod(a, b) };
  };
  var empty = function(obj) {
    return !isPresent(obj) || obj.length === 0;
  };
  var notEmpty = function(obj) {
    return !empty(obj);
  };
  var includes = function(arr, val) {
    return notEmpty(arr) && arr.indexOf(val) !== -1;
  };
  var datetime = function(y, m, d, h, i, s) {
    if (h === void 0) {
      h = 0;
    }
    if (i === void 0) {
      i = 0;
    }
    if (s === void 0) {
      s = 0;
    }
    return new Date(Date.UTC(y, m - 1, d, h, i, s));
  };
  var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var ONE_DAY = 1e3 * 60 * 60 * 24;
  var MAXYEAR = 9999;
  var ORDINAL_BASE = datetime(1970, 1, 1);
  var PY_WEEKDAYS = [6, 0, 1, 2, 3, 4, 5];
  var isLeapYear = function(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  };
  var isDate = function(value) {
    return value instanceof Date;
  };
  var isValidDate = function(value) {
    return isDate(value) && !isNaN(value.getTime());
  };
  var daysBetween = function(date1, date2) {
    var date1ms = date1.getTime();
    var date2ms = date2.getTime();
    var differencems = date1ms - date2ms;
    return Math.round(differencems / ONE_DAY);
  };
  var toOrdinal = function(date) {
    return daysBetween(date, ORDINAL_BASE);
  };
  var fromOrdinal = function(ordinal) {
    return new Date(ORDINAL_BASE.getTime() + ordinal * ONE_DAY);
  };
  var getMonthDays = function(date) {
    var month = date.getUTCMonth();
    return month === 1 && isLeapYear(date.getUTCFullYear()) ? 29 : MONTH_DAYS[month];
  };
  var getWeekday = function(date) {
    return PY_WEEKDAYS[date.getUTCDay()];
  };
  var monthRange = function(year, month) {
    var date = datetime(year, month + 1, 1);
    return [getWeekday(date), getMonthDays(date)];
  };
  var combine = function(date, time) {
    time = time || date;
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()));
  };
  var clone = function(date) {
    var dolly = new Date(date.getTime());
    return dolly;
  };
  var cloneDates = function(dates) {
    var clones = [];
    for (var i = 0; i < dates.length; i++) {
      clones.push(clone(dates[i]));
    }
    return clones;
  };
  var sort = function(dates) {
    dates.sort(function(a, b) {
      return a.getTime() - b.getTime();
    });
  };
  var timeToUntilString = function(time, utc) {
    if (utc === void 0) {
      utc = true;
    }
    var date = new Date(time);
    return [padStart(date.getUTCFullYear().toString(), 4, "0"), padStart(date.getUTCMonth() + 1, 2, "0"), padStart(date.getUTCDate(), 2, "0"), "T", padStart(date.getUTCHours(), 2, "0"), padStart(date.getUTCMinutes(), 2, "0"), padStart(date.getUTCSeconds(), 2, "0"), utc ? "Z" : ""].join("");
  };
  var untilStringToDate = function(until) {
    var re = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/;
    var bits = re.exec(until);
    if (!bits)
      throw new Error("Invalid UNTIL value: ".concat(until));
    return new Date(Date.UTC(parseInt(bits[1], 10), parseInt(bits[2], 10) - 1, parseInt(bits[3], 10), parseInt(bits[5], 10) || 0, parseInt(bits[6], 10) || 0, parseInt(bits[7], 10) || 0));
  };
  var dateTZtoISO8601 = function(date, timeZone) {
    var dateStr = date.toLocaleString("sv-SE", { timeZone });
    return dateStr.replace(" ", "T") + "Z";
  };
  var dateInTimeZone = function(date, timeZone) {
    var localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var dateInLocalTZ = new Date(dateTZtoISO8601(date, localTimeZone));
    var dateInTargetTZ = new Date(dateTZtoISO8601(date, timeZone !== null && timeZone !== void 0 ? timeZone : "UTC"));
    var tzOffset = dateInTargetTZ.getTime() - dateInLocalTZ.getTime();
    return new Date(date.getTime() - tzOffset);
  };
  var IterResult = function() {
    function IterResult2(method, args) {
      this.minDate = null;
      this.maxDate = null;
      this._result = [];
      this.total = 0;
      this.method = method;
      this.args = args;
      if (method === "between") {
        this.maxDate = args.inc ? args.before : new Date(args.before.getTime() - 1);
        this.minDate = args.inc ? args.after : new Date(args.after.getTime() + 1);
      } else if (method === "before") {
        this.maxDate = args.inc ? args.dt : new Date(args.dt.getTime() - 1);
      } else if (method === "after") {
        this.minDate = args.inc ? args.dt : new Date(args.dt.getTime() + 1);
      }
    }
    IterResult2.prototype.accept = function(date) {
      ++this.total;
      var tooEarly = this.minDate && date < this.minDate;
      var tooLate = this.maxDate && date > this.maxDate;
      if (this.method === "between") {
        if (tooEarly)
          return true;
        if (tooLate)
          return false;
      } else if (this.method === "before") {
        if (tooLate)
          return false;
      } else if (this.method === "after") {
        if (tooEarly)
          return true;
        this.add(date);
        return false;
      }
      return this.add(date);
    };
    IterResult2.prototype.add = function(date) {
      this._result.push(date);
      return true;
    };
    IterResult2.prototype.getValue = function() {
      var res = this._result;
      switch (this.method) {
        case "all":
        case "between":
          return res;
        case "before":
        case "after":
        default:
          return res.length ? res[res.length - 1] : null;
      }
    };
    IterResult2.prototype.clone = function() {
      return new IterResult2(this.method, this.args);
    };
    return IterResult2;
  }();
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t2) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t2[p] = s[p];
      }
      return t2;
    };
    return __assign.apply(this, arguments);
  };
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar2; i < l; i++) {
        if (ar2 || !(i in from)) {
          if (!ar2)
            ar2 = Array.prototype.slice.call(from, 0, i);
          ar2[i] = from[i];
        }
      }
    return to.concat(ar2 || Array.prototype.slice.call(from));
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message2) {
    var e = new Error(message2);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  var CallbackIterResult = function(_super) {
    __extends(CallbackIterResult2, _super);
    function CallbackIterResult2(method, args, iterator) {
      var _this = _super.call(this, method, args) || this;
      _this.iterator = iterator;
      return _this;
    }
    CallbackIterResult2.prototype.add = function(date) {
      if (this.iterator(date, this._result.length)) {
        this._result.push(date);
        return true;
      }
      return false;
    };
    return CallbackIterResult2;
  }(IterResult);
  var ENGLISH = { dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], tokens: { SKIP: /^[ \r\n\t]+|^\.$/, number: /^[1-9][0-9]*/, numberAsText: /^(one|two|three)/i, every: /^every/i, "day(s)": /^days?/i, "weekday(s)": /^weekdays?/i, "week(s)": /^weeks?/i, "hour(s)": /^hours?/i, "minute(s)": /^minutes?/i, "month(s)": /^months?/i, "year(s)": /^years?/i, on: /^(on|in)/i, at: /^(at)/i, the: /^the/i, first: /^first/i, second: /^second/i, third: /^third/i, nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i, last: /^last/i, for: /^for/i, "time(s)": /^times?/i, until: /^(un)?til/i, monday: /^mo(n(day)?)?/i, tuesday: /^tu(e(s(day)?)?)?/i, wednesday: /^we(d(n(esday)?)?)?/i, thursday: /^th(u(r(sday)?)?)?/i, friday: /^fr(i(day)?)?/i, saturday: /^sa(t(urday)?)?/i, sunday: /^su(n(day)?)?/i, january: /^jan(uary)?/i, february: /^feb(ruary)?/i, march: /^mar(ch)?/i, april: /^apr(il)?/i, may: /^may/i, june: /^june?/i, july: /^july?/i, august: /^aug(ust)?/i, september: /^sep(t(ember)?)?/i, october: /^oct(ober)?/i, november: /^nov(ember)?/i, december: /^dec(ember)?/i, comma: /^(,\s*|(and|or)\s*)+/i } };
  var contains = function(arr, val) {
    return arr.indexOf(val) !== -1;
  };
  var defaultGetText = function(id2) {
    return id2.toString();
  };
  var defaultDateFormatter = function(year, month, day) {
    return "".concat(month, " ").concat(day, ", ").concat(year);
  };
  var ToText = function() {
    function ToText2(rrule, gettext, language, dateFormatter) {
      if (gettext === void 0) {
        gettext = defaultGetText;
      }
      if (language === void 0) {
        language = ENGLISH;
      }
      if (dateFormatter === void 0) {
        dateFormatter = defaultDateFormatter;
      }
      this.text = [];
      this.language = language || ENGLISH;
      this.gettext = gettext;
      this.dateFormatter = dateFormatter;
      this.rrule = rrule;
      this.options = rrule.options;
      this.origOptions = rrule.origOptions;
      if (this.origOptions.bymonthday) {
        var bymonthday = [].concat(this.options.bymonthday);
        var bynmonthday = [].concat(this.options.bynmonthday);
        bymonthday.sort(function(a, b) {
          return a - b;
        });
        bynmonthday.sort(function(a, b) {
          return b - a;
        });
        this.bymonthday = bymonthday.concat(bynmonthday);
        if (!this.bymonthday.length)
          this.bymonthday = null;
      }
      if (isPresent(this.origOptions.byweekday)) {
        var byweekday = !isArray(this.origOptions.byweekday) ? [this.origOptions.byweekday] : this.origOptions.byweekday;
        var days = String(byweekday);
        this.byweekday = { allWeeks: byweekday.filter(function(weekday) {
          return !weekday.n;
        }), someWeeks: byweekday.filter(function(weekday) {
          return Boolean(weekday.n);
        }), isWeekdays: days.indexOf("MO") !== -1 && days.indexOf("TU") !== -1 && days.indexOf("WE") !== -1 && days.indexOf("TH") !== -1 && days.indexOf("FR") !== -1 && days.indexOf("SA") === -1 && days.indexOf("SU") === -1, isEveryDay: days.indexOf("MO") !== -1 && days.indexOf("TU") !== -1 && days.indexOf("WE") !== -1 && days.indexOf("TH") !== -1 && days.indexOf("FR") !== -1 && days.indexOf("SA") !== -1 && days.indexOf("SU") !== -1 };
        var sortWeekDays = function(a, b) {
          return a.weekday - b.weekday;
        };
        this.byweekday.allWeeks.sort(sortWeekDays);
        this.byweekday.someWeeks.sort(sortWeekDays);
        if (!this.byweekday.allWeeks.length)
          this.byweekday.allWeeks = null;
        if (!this.byweekday.someWeeks.length)
          this.byweekday.someWeeks = null;
      } else {
        this.byweekday = null;
      }
    }
    ToText2.isFullyConvertible = function(rrule) {
      var canConvert = true;
      if (!(rrule.options.freq in ToText2.IMPLEMENTED))
        return false;
      if (rrule.origOptions.until && rrule.origOptions.count)
        return false;
      for (var key in rrule.origOptions) {
        if (contains(["dtstart", "tzid", "wkst", "freq"], key))
          return true;
        if (!contains(ToText2.IMPLEMENTED[rrule.options.freq], key))
          return false;
      }
      return canConvert;
    };
    ToText2.prototype.isFullyConvertible = function() {
      return ToText2.isFullyConvertible(this.rrule);
    };
    ToText2.prototype.toString = function() {
      var gettext = this.gettext;
      if (!(this.options.freq in ToText2.IMPLEMENTED)) {
        return gettext("RRule error: Unable to fully convert this rrule to text");
      }
      this.text = [gettext("every")];
      this[RRule.FREQUENCIES[this.options.freq]]();
      if (this.options.until) {
        this.add(gettext("until"));
        var until = this.options.until;
        this.add(this.dateFormatter(until.getUTCFullYear(), this.language.monthNames[until.getUTCMonth()], until.getUTCDate()));
      } else if (this.options.count) {
        this.add(gettext("for")).add(this.options.count.toString()).add(this.plural(this.options.count) ? gettext("times") : gettext("time"));
      }
      if (!this.isFullyConvertible())
        this.add(gettext("(~ approximate)"));
      return this.text.join("");
    };
    ToText2.prototype.HOURLY = function() {
      var gettext = this.gettext;
      if (this.options.interval !== 1)
        this.add(this.options.interval.toString());
      this.add(this.plural(this.options.interval) ? gettext("hours") : gettext("hour"));
    };
    ToText2.prototype.MINUTELY = function() {
      var gettext = this.gettext;
      if (this.options.interval !== 1)
        this.add(this.options.interval.toString());
      this.add(this.plural(this.options.interval) ? gettext("minutes") : gettext("minute"));
    };
    ToText2.prototype.DAILY = function() {
      var gettext = this.gettext;
      if (this.options.interval !== 1)
        this.add(this.options.interval.toString());
      if (this.byweekday && this.byweekday.isWeekdays) {
        this.add(this.plural(this.options.interval) ? gettext("weekdays") : gettext("weekday"));
      } else {
        this.add(this.plural(this.options.interval) ? gettext("days") : gettext("day"));
      }
      if (this.origOptions.bymonth) {
        this.add(gettext("in"));
        this._bymonth();
      }
      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday) {
        this._byweekday();
      } else if (this.origOptions.byhour) {
        this._byhour();
      }
    };
    ToText2.prototype.WEEKLY = function() {
      var gettext = this.gettext;
      if (this.options.interval !== 1) {
        this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? gettext("weeks") : gettext("week"));
      }
      if (this.byweekday && this.byweekday.isWeekdays) {
        if (this.options.interval === 1) {
          this.add(this.plural(this.options.interval) ? gettext("weekdays") : gettext("weekday"));
        } else {
          this.add(gettext("on")).add(gettext("weekdays"));
        }
      } else if (this.byweekday && this.byweekday.isEveryDay) {
        this.add(this.plural(this.options.interval) ? gettext("days") : gettext("day"));
      } else {
        if (this.options.interval === 1)
          this.add(gettext("week"));
        if (this.origOptions.bymonth) {
          this.add(gettext("in"));
          this._bymonth();
        }
        if (this.bymonthday) {
          this._bymonthday();
        } else if (this.byweekday) {
          this._byweekday();
        }
        if (this.origOptions.byhour) {
          this._byhour();
        }
      }
    };
    ToText2.prototype.MONTHLY = function() {
      var gettext = this.gettext;
      if (this.origOptions.bymonth) {
        if (this.options.interval !== 1) {
          this.add(this.options.interval.toString()).add(gettext("months"));
          if (this.plural(this.options.interval))
            this.add(gettext("in"));
        }
        this._bymonth();
      } else {
        if (this.options.interval !== 1) {
          this.add(this.options.interval.toString());
        }
        this.add(this.plural(this.options.interval) ? gettext("months") : gettext("month"));
      }
      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday && this.byweekday.isWeekdays) {
        this.add(gettext("on")).add(gettext("weekdays"));
      } else if (this.byweekday) {
        this._byweekday();
      }
    };
    ToText2.prototype.YEARLY = function() {
      var gettext = this.gettext;
      if (this.origOptions.bymonth) {
        if (this.options.interval !== 1) {
          this.add(this.options.interval.toString());
          this.add(gettext("years"));
        }
        this._bymonth();
      } else {
        if (this.options.interval !== 1) {
          this.add(this.options.interval.toString());
        }
        this.add(this.plural(this.options.interval) ? gettext("years") : gettext("year"));
      }
      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday) {
        this._byweekday();
      }
      if (this.options.byyearday) {
        this.add(gettext("on the")).add(this.list(this.options.byyearday, this.nth, gettext("and"))).add(gettext("day"));
      }
      if (this.options.byweekno) {
        this.add(gettext("in")).add(this.plural(this.options.byweekno.length) ? gettext("weeks") : gettext("week")).add(this.list(this.options.byweekno, void 0, gettext("and")));
      }
    };
    ToText2.prototype._bymonthday = function() {
      var gettext = this.gettext;
      if (this.byweekday && this.byweekday.allWeeks) {
        this.add(gettext("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext, gettext("or"))).add(gettext("the")).add(this.list(this.bymonthday, this.nth, gettext("or")));
      } else {
        this.add(gettext("on the")).add(this.list(this.bymonthday, this.nth, gettext("and")));
      }
    };
    ToText2.prototype._byweekday = function() {
      var gettext = this.gettext;
      if (this.byweekday.allWeeks && !this.byweekday.isWeekdays) {
        this.add(gettext("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext));
      }
      if (this.byweekday.someWeeks) {
        if (this.byweekday.allWeeks)
          this.add(gettext("and"));
        this.add(gettext("on the")).add(this.list(this.byweekday.someWeeks, this.weekdaytext, gettext("and")));
      }
    };
    ToText2.prototype._byhour = function() {
      var gettext = this.gettext;
      this.add(gettext("at")).add(this.list(this.origOptions.byhour, void 0, gettext("and")));
    };
    ToText2.prototype._bymonth = function() {
      this.add(this.list(this.options.bymonth, this.monthtext, this.gettext("and")));
    };
    ToText2.prototype.nth = function(n) {
      n = parseInt(n.toString(), 10);
      var nth;
      var gettext = this.gettext;
      if (n === -1)
        return gettext("last");
      var npos = Math.abs(n);
      switch (npos) {
        case 1:
        case 21:
        case 31:
          nth = npos + gettext("st");
          break;
        case 2:
        case 22:
          nth = npos + gettext("nd");
          break;
        case 3:
        case 23:
          nth = npos + gettext("rd");
          break;
        default:
          nth = npos + gettext("th");
      }
      return n < 0 ? nth + " " + gettext("last") : nth;
    };
    ToText2.prototype.monthtext = function(m) {
      return this.language.monthNames[m - 1];
    };
    ToText2.prototype.weekdaytext = function(wday) {
      var weekday = isNumber(wday) ? (wday + 1) % 7 : wday.getJsWeekday();
      return (wday.n ? this.nth(wday.n) + " " : "") + this.language.dayNames[weekday];
    };
    ToText2.prototype.plural = function(n) {
      return n % 100 !== 1;
    };
    ToText2.prototype.add = function(s) {
      this.text.push(" ");
      this.text.push(s);
      return this;
    };
    ToText2.prototype.list = function(arr, callback, finalDelim, delim) {
      var _this = this;
      if (delim === void 0) {
        delim = ",";
      }
      if (!isArray(arr)) {
        arr = [arr];
      }
      var delimJoin = function(array, delimiter, finalDelimiter) {
        var list = "";
        for (var i = 0; i < array.length; i++) {
          if (i !== 0) {
            if (i === array.length - 1) {
              list += " " + finalDelimiter + " ";
            } else {
              list += delimiter + " ";
            }
          }
          list += array[i];
        }
        return list;
      };
      callback = callback || function(o) {
        return o.toString();
      };
      var realCallback = function(arg) {
        return callback && callback.call(_this, arg);
      };
      if (finalDelim) {
        return delimJoin(arr.map(realCallback), delim, finalDelim);
      } else {
        return arr.map(realCallback).join(delim + " ");
      }
    };
    return ToText2;
  }();
  var Parser = function() {
    function Parser2(rules) {
      this.done = true;
      this.rules = rules;
    }
    Parser2.prototype.start = function(text) {
      this.text = text;
      this.done = false;
      return this.nextSymbol();
    };
    Parser2.prototype.isDone = function() {
      return this.done && this.symbol === null;
    };
    Parser2.prototype.nextSymbol = function() {
      var best;
      var bestSymbol;
      this.symbol = null;
      this.value = null;
      do {
        if (this.done)
          return false;
        var rule = void 0;
        best = null;
        for (var name_1 in this.rules) {
          rule = this.rules[name_1];
          var match = rule.exec(this.text);
          if (match) {
            if (best === null || match[0].length > best[0].length) {
              best = match;
              bestSymbol = name_1;
            }
          }
        }
        if (best != null) {
          this.text = this.text.substr(best[0].length);
          if (this.text === "")
            this.done = true;
        }
        if (best == null) {
          this.done = true;
          this.symbol = null;
          this.value = null;
          return;
        }
      } while (bestSymbol === "SKIP");
      this.symbol = bestSymbol;
      this.value = best;
      return true;
    };
    Parser2.prototype.accept = function(name) {
      if (this.symbol === name) {
        if (this.value) {
          var v = this.value;
          this.nextSymbol();
          return v;
        }
        this.nextSymbol();
        return true;
      }
      return false;
    };
    Parser2.prototype.acceptNumber = function() {
      return this.accept("number");
    };
    Parser2.prototype.expect = function(name) {
      if (this.accept(name))
        return true;
      throw new Error("expected " + name + " but found " + this.symbol);
    };
    return Parser2;
  }();
  function parseText(text, language) {
    if (language === void 0) {
      language = ENGLISH;
    }
    var options = {};
    var ttr = new Parser(language.tokens);
    if (!ttr.start(text))
      return null;
    S();
    return options;
    function S() {
      ttr.expect("every");
      var n = ttr.acceptNumber();
      if (n)
        options.interval = parseInt(n[0], 10);
      if (ttr.isDone())
        throw new Error("Unexpected end");
      switch (ttr.symbol) {
        case "day(s)":
          options.freq = RRule.DAILY;
          if (ttr.nextSymbol()) {
            AT();
            F();
          }
          break;
        case "weekday(s)":
          options.freq = RRule.WEEKLY;
          options.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
          ttr.nextSymbol();
          AT();
          F();
          break;
        case "week(s)":
          options.freq = RRule.WEEKLY;
          if (ttr.nextSymbol()) {
            ON();
            AT();
            F();
          }
          break;
        case "hour(s)":
          options.freq = RRule.HOURLY;
          if (ttr.nextSymbol()) {
            ON();
            F();
          }
          break;
        case "minute(s)":
          options.freq = RRule.MINUTELY;
          if (ttr.nextSymbol()) {
            ON();
            F();
          }
          break;
        case "month(s)":
          options.freq = RRule.MONTHLY;
          if (ttr.nextSymbol()) {
            ON();
            F();
          }
          break;
        case "year(s)":
          options.freq = RRule.YEARLY;
          if (ttr.nextSymbol()) {
            ON();
            F();
          }
          break;
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
        case "saturday":
        case "sunday":
          options.freq = RRule.WEEKLY;
          var key = ttr.symbol.substr(0, 2).toUpperCase();
          options.byweekday = [RRule[key]];
          if (!ttr.nextSymbol())
            return;
          while (ttr.accept("comma")) {
            if (ttr.isDone())
              throw new Error("Unexpected end");
            var wkd = decodeWKD();
            if (!wkd) {
              throw new Error("Unexpected symbol " + ttr.symbol + ", expected weekday");
            }
            options.byweekday.push(RRule[wkd]);
            ttr.nextSymbol();
          }
          AT();
          MDAYs();
          F();
          break;
        case "january":
        case "february":
        case "march":
        case "april":
        case "may":
        case "june":
        case "july":
        case "august":
        case "september":
        case "october":
        case "november":
        case "december":
          options.freq = RRule.YEARLY;
          options.bymonth = [decodeM()];
          if (!ttr.nextSymbol())
            return;
          while (ttr.accept("comma")) {
            if (ttr.isDone())
              throw new Error("Unexpected end");
            var m = decodeM();
            if (!m) {
              throw new Error("Unexpected symbol " + ttr.symbol + ", expected month");
            }
            options.bymonth.push(m);
            ttr.nextSymbol();
          }
          ON();
          F();
          break;
        default:
          throw new Error("Unknown symbol");
      }
    }
    function ON() {
      var on = ttr.accept("on");
      var the = ttr.accept("the");
      if (!(on || the))
        return;
      do {
        var nth = decodeNTH();
        var wkd = decodeWKD();
        var m = decodeM();
        if (nth) {
          if (wkd) {
            ttr.nextSymbol();
            if (!options.byweekday)
              options.byweekday = [];
            options.byweekday.push(RRule[wkd].nth(nth));
          } else {
            if (!options.bymonthday)
              options.bymonthday = [];
            options.bymonthday.push(nth);
            ttr.accept("day(s)");
          }
        } else if (wkd) {
          ttr.nextSymbol();
          if (!options.byweekday)
            options.byweekday = [];
          options.byweekday.push(RRule[wkd]);
        } else if (ttr.symbol === "weekday(s)") {
          ttr.nextSymbol();
          if (!options.byweekday) {
            options.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
          }
        } else if (ttr.symbol === "week(s)") {
          ttr.nextSymbol();
          var n = ttr.acceptNumber();
          if (!n) {
            throw new Error("Unexpected symbol " + ttr.symbol + ", expected week number");
          }
          options.byweekno = [parseInt(n[0], 10)];
          while (ttr.accept("comma")) {
            n = ttr.acceptNumber();
            if (!n) {
              throw new Error("Unexpected symbol " + ttr.symbol + "; expected monthday");
            }
            options.byweekno.push(parseInt(n[0], 10));
          }
        } else if (m) {
          ttr.nextSymbol();
          if (!options.bymonth)
            options.bymonth = [];
          options.bymonth.push(m);
        } else {
          return;
        }
      } while (ttr.accept("comma") || ttr.accept("the") || ttr.accept("on"));
    }
    function AT() {
      var at = ttr.accept("at");
      if (!at)
        return;
      do {
        var n = ttr.acceptNumber();
        if (!n) {
          throw new Error("Unexpected symbol " + ttr.symbol + ", expected hour");
        }
        options.byhour = [parseInt(n[0], 10)];
        while (ttr.accept("comma")) {
          n = ttr.acceptNumber();
          if (!n) {
            throw new Error("Unexpected symbol " + ttr.symbol + "; expected hour");
          }
          options.byhour.push(parseInt(n[0], 10));
        }
      } while (ttr.accept("comma") || ttr.accept("at"));
    }
    function decodeM() {
      switch (ttr.symbol) {
        case "january":
          return 1;
        case "february":
          return 2;
        case "march":
          return 3;
        case "april":
          return 4;
        case "may":
          return 5;
        case "june":
          return 6;
        case "july":
          return 7;
        case "august":
          return 8;
        case "september":
          return 9;
        case "october":
          return 10;
        case "november":
          return 11;
        case "december":
          return 12;
        default:
          return false;
      }
    }
    function decodeWKD() {
      switch (ttr.symbol) {
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
        case "saturday":
        case "sunday":
          return ttr.symbol.substr(0, 2).toUpperCase();
        default:
          return false;
      }
    }
    function decodeNTH() {
      switch (ttr.symbol) {
        case "last":
          ttr.nextSymbol();
          return -1;
        case "first":
          ttr.nextSymbol();
          return 1;
        case "second":
          ttr.nextSymbol();
          return ttr.accept("last") ? -2 : 2;
        case "third":
          ttr.nextSymbol();
          return ttr.accept("last") ? -3 : 3;
        case "nth":
          var v = parseInt(ttr.value[1], 10);
          if (v < -366 || v > 366)
            throw new Error("Nth out of range: " + v);
          ttr.nextSymbol();
          return ttr.accept("last") ? -v : v;
        default:
          return false;
      }
    }
    function MDAYs() {
      ttr.accept("on");
      ttr.accept("the");
      var nth = decodeNTH();
      if (!nth)
        return;
      options.bymonthday = [nth];
      ttr.nextSymbol();
      while (ttr.accept("comma")) {
        nth = decodeNTH();
        if (!nth) {
          throw new Error("Unexpected symbol " + ttr.symbol + "; expected monthday");
        }
        options.bymonthday.push(nth);
        ttr.nextSymbol();
      }
    }
    function F() {
      if (ttr.symbol === "until") {
        var date = Date.parse(ttr.text);
        if (!date)
          throw new Error("Cannot parse until date:" + ttr.text);
        options.until = new Date(date);
      } else if (ttr.accept("for")) {
        options.count = parseInt(ttr.value[0], 10);
        ttr.expect("number");
      }
    }
  }
  var Frequency;
  (function(Frequency2) {
    Frequency2[Frequency2["YEARLY"] = 0] = "YEARLY";
    Frequency2[Frequency2["MONTHLY"] = 1] = "MONTHLY";
    Frequency2[Frequency2["WEEKLY"] = 2] = "WEEKLY";
    Frequency2[Frequency2["DAILY"] = 3] = "DAILY";
    Frequency2[Frequency2["HOURLY"] = 4] = "HOURLY";
    Frequency2[Frequency2["MINUTELY"] = 5] = "MINUTELY";
    Frequency2[Frequency2["SECONDLY"] = 6] = "SECONDLY";
  })(Frequency || (Frequency = {}));
  function freqIsDailyOrGreater(freq) {
    return freq < Frequency.HOURLY;
  }
  var fromText = function(text, language) {
    if (language === void 0) {
      language = ENGLISH;
    }
    return new RRule(parseText(text, language) || void 0);
  };
  var common = ["count", "until", "interval", "byweekday", "bymonthday", "bymonth"];
  ToText.IMPLEMENTED = [];
  ToText.IMPLEMENTED[Frequency.HOURLY] = common;
  ToText.IMPLEMENTED[Frequency.MINUTELY] = common;
  ToText.IMPLEMENTED[Frequency.DAILY] = ["byhour"].concat(common);
  ToText.IMPLEMENTED[Frequency.WEEKLY] = common;
  ToText.IMPLEMENTED[Frequency.MONTHLY] = common;
  ToText.IMPLEMENTED[Frequency.YEARLY] = ["byweekno", "byyearday"].concat(common);
  var toText = function(rrule, gettext, language, dateFormatter) {
    return new ToText(rrule, gettext, language, dateFormatter).toString();
  };
  var isFullyConvertible = ToText.isFullyConvertible;
  var Time = function() {
    function Time2(hour, minute, second, millisecond) {
      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.millisecond = millisecond || 0;
    }
    Time2.prototype.getHours = function() {
      return this.hour;
    };
    Time2.prototype.getMinutes = function() {
      return this.minute;
    };
    Time2.prototype.getSeconds = function() {
      return this.second;
    };
    Time2.prototype.getMilliseconds = function() {
      return this.millisecond;
    };
    Time2.prototype.getTime = function() {
      return (this.hour * 60 * 60 + this.minute * 60 + this.second) * 1e3 + this.millisecond;
    };
    return Time2;
  }();
  var DateTime = function(_super) {
    __extends(DateTime2, _super);
    function DateTime2(year, month, day, hour, minute, second, millisecond) {
      var _this = _super.call(this, hour, minute, second, millisecond) || this;
      _this.year = year;
      _this.month = month;
      _this.day = day;
      return _this;
    }
    DateTime2.fromDate = function(date) {
      return new this(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.valueOf() % 1e3);
    };
    DateTime2.prototype.getWeekday = function() {
      return getWeekday(new Date(this.getTime()));
    };
    DateTime2.prototype.getTime = function() {
      return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
    };
    DateTime2.prototype.getDay = function() {
      return this.day;
    };
    DateTime2.prototype.getMonth = function() {
      return this.month;
    };
    DateTime2.prototype.getYear = function() {
      return this.year;
    };
    DateTime2.prototype.addYears = function(years) {
      this.year += years;
    };
    DateTime2.prototype.addMonths = function(months) {
      this.month += months;
      if (this.month > 12) {
        var yearDiv = Math.floor(this.month / 12);
        var monthMod = pymod(this.month, 12);
        this.month = monthMod;
        this.year += yearDiv;
        if (this.month === 0) {
          this.month = 12;
          --this.year;
        }
      }
    };
    DateTime2.prototype.addWeekly = function(days, wkst) {
      if (wkst > this.getWeekday()) {
        this.day += -(this.getWeekday() + 1 + (6 - wkst)) + days * 7;
      } else {
        this.day += -(this.getWeekday() - wkst) + days * 7;
      }
      this.fixDay();
    };
    DateTime2.prototype.addDaily = function(days) {
      this.day += days;
      this.fixDay();
    };
    DateTime2.prototype.addHours = function(hours, filtered, byhour) {
      if (filtered) {
        this.hour += Math.floor((23 - this.hour) / hours) * hours;
      }
      for (; ; ) {
        this.hour += hours;
        var _a = divmod(this.hour, 24), dayDiv = _a.div, hourMod = _a.mod;
        if (dayDiv) {
          this.hour = hourMod;
          this.addDaily(dayDiv);
        }
        if (empty(byhour) || includes(byhour, this.hour))
          break;
      }
    };
    DateTime2.prototype.addMinutes = function(minutes, filtered, byhour, byminute) {
      if (filtered) {
        this.minute += Math.floor((1439 - (this.hour * 60 + this.minute)) / minutes) * minutes;
      }
      for (; ; ) {
        this.minute += minutes;
        var _a = divmod(this.minute, 60), hourDiv = _a.div, minuteMod = _a.mod;
        if (hourDiv) {
          this.minute = minuteMod;
          this.addHours(hourDiv, false, byhour);
        }
        if ((empty(byhour) || includes(byhour, this.hour)) && (empty(byminute) || includes(byminute, this.minute))) {
          break;
        }
      }
    };
    DateTime2.prototype.addSeconds = function(seconds, filtered, byhour, byminute, bysecond) {
      if (filtered) {
        this.second += Math.floor((86399 - (this.hour * 3600 + this.minute * 60 + this.second)) / seconds) * seconds;
      }
      for (; ; ) {
        this.second += seconds;
        var _a = divmod(this.second, 60), minuteDiv = _a.div, secondMod = _a.mod;
        if (minuteDiv) {
          this.second = secondMod;
          this.addMinutes(minuteDiv, false, byhour, byminute);
        }
        if ((empty(byhour) || includes(byhour, this.hour)) && (empty(byminute) || includes(byminute, this.minute)) && (empty(bysecond) || includes(bysecond, this.second))) {
          break;
        }
      }
    };
    DateTime2.prototype.fixDay = function() {
      if (this.day <= 28) {
        return;
      }
      var daysinmonth = monthRange(this.year, this.month - 1)[1];
      if (this.day <= daysinmonth) {
        return;
      }
      while (this.day > daysinmonth) {
        this.day -= daysinmonth;
        ++this.month;
        if (this.month === 13) {
          this.month = 1;
          ++this.year;
          if (this.year > MAXYEAR) {
            return;
          }
        }
        daysinmonth = monthRange(this.year, this.month - 1)[1];
      }
    };
    DateTime2.prototype.add = function(options, filtered) {
      var freq = options.freq, interval = options.interval, wkst = options.wkst, byhour = options.byhour, byminute = options.byminute, bysecond = options.bysecond;
      switch (freq) {
        case Frequency.YEARLY:
          return this.addYears(interval);
        case Frequency.MONTHLY:
          return this.addMonths(interval);
        case Frequency.WEEKLY:
          return this.addWeekly(interval, wkst);
        case Frequency.DAILY:
          return this.addDaily(interval);
        case Frequency.HOURLY:
          return this.addHours(interval, filtered, byhour);
        case Frequency.MINUTELY:
          return this.addMinutes(interval, filtered, byhour, byminute);
        case Frequency.SECONDLY:
          return this.addSeconds(interval, filtered, byhour, byminute, bysecond);
      }
    };
    return DateTime2;
  }(Time);
  function initializeOptions$1(options) {
    var invalid = [];
    var keys = Object.keys(options);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
      var key = keys_1[_i];
      if (!includes(defaultKeys, key))
        invalid.push(key);
      if (isDate(options[key]) && !isValidDate(options[key])) {
        invalid.push(key);
      }
    }
    if (invalid.length) {
      throw new Error("Invalid options: " + invalid.join(", "));
    }
    return __assign({}, options);
  }
  function parseOptions(options) {
    var opts = __assign(__assign({}, DEFAULT_OPTIONS$1), initializeOptions$1(options));
    if (isPresent(opts.byeaster))
      opts.freq = RRule.YEARLY;
    if (!(isPresent(opts.freq) && RRule.FREQUENCIES[opts.freq])) {
      throw new Error("Invalid frequency: ".concat(opts.freq, " ").concat(options.freq));
    }
    if (!opts.dtstart)
      opts.dtstart = new Date((/* @__PURE__ */ new Date()).setMilliseconds(0));
    if (!isPresent(opts.wkst)) {
      opts.wkst = RRule.MO.weekday;
    } else if (isNumber(opts.wkst))
      ;
    else {
      opts.wkst = opts.wkst.weekday;
    }
    if (isPresent(opts.bysetpos)) {
      if (isNumber(opts.bysetpos))
        opts.bysetpos = [opts.bysetpos];
      for (var i = 0; i < opts.bysetpos.length; i++) {
        var v = opts.bysetpos[i];
        if (v === 0 || !(v >= -366 && v <= 366)) {
          throw new Error("bysetpos must be between 1 and 366, or between -366 and -1");
        }
      }
    }
    if (!(Boolean(opts.byweekno) || notEmpty(opts.byweekno) || notEmpty(opts.byyearday) || Boolean(opts.bymonthday) || notEmpty(opts.bymonthday) || isPresent(opts.byweekday) || isPresent(opts.byeaster))) {
      switch (opts.freq) {
        case RRule.YEARLY:
          if (!opts.bymonth)
            opts.bymonth = opts.dtstart.getUTCMonth() + 1;
          opts.bymonthday = opts.dtstart.getUTCDate();
          break;
        case RRule.MONTHLY:
          opts.bymonthday = opts.dtstart.getUTCDate();
          break;
        case RRule.WEEKLY:
          opts.byweekday = [getWeekday(opts.dtstart)];
          break;
      }
    }
    if (isPresent(opts.bymonth) && !isArray(opts.bymonth)) {
      opts.bymonth = [opts.bymonth];
    }
    if (isPresent(opts.byyearday) && !isArray(opts.byyearday) && isNumber(opts.byyearday)) {
      opts.byyearday = [opts.byyearday];
    }
    if (!isPresent(opts.bymonthday)) {
      opts.bymonthday = [];
      opts.bynmonthday = [];
    } else if (isArray(opts.bymonthday)) {
      var bymonthday = [];
      var bynmonthday = [];
      for (var i = 0; i < opts.bymonthday.length; i++) {
        var v = opts.bymonthday[i];
        if (v > 0) {
          bymonthday.push(v);
        } else if (v < 0) {
          bynmonthday.push(v);
        }
      }
      opts.bymonthday = bymonthday;
      opts.bynmonthday = bynmonthday;
    } else if (opts.bymonthday < 0) {
      opts.bynmonthday = [opts.bymonthday];
      opts.bymonthday = [];
    } else {
      opts.bynmonthday = [];
      opts.bymonthday = [opts.bymonthday];
    }
    if (isPresent(opts.byweekno) && !isArray(opts.byweekno)) {
      opts.byweekno = [opts.byweekno];
    }
    if (!isPresent(opts.byweekday)) {
      opts.bynweekday = null;
    } else if (isNumber(opts.byweekday)) {
      opts.byweekday = [opts.byweekday];
      opts.bynweekday = null;
    } else if (isWeekdayStr(opts.byweekday)) {
      opts.byweekday = [Weekday.fromStr(opts.byweekday).weekday];
      opts.bynweekday = null;
    } else if (opts.byweekday instanceof Weekday) {
      if (!opts.byweekday.n || opts.freq > RRule.MONTHLY) {
        opts.byweekday = [opts.byweekday.weekday];
        opts.bynweekday = null;
      } else {
        opts.bynweekday = [[opts.byweekday.weekday, opts.byweekday.n]];
        opts.byweekday = null;
      }
    } else {
      var byweekday = [];
      var bynweekday = [];
      for (var i = 0; i < opts.byweekday.length; i++) {
        var wday = opts.byweekday[i];
        if (isNumber(wday)) {
          byweekday.push(wday);
          continue;
        } else if (isWeekdayStr(wday)) {
          byweekday.push(Weekday.fromStr(wday).weekday);
          continue;
        }
        if (!wday.n || opts.freq > RRule.MONTHLY) {
          byweekday.push(wday.weekday);
        } else {
          bynweekday.push([wday.weekday, wday.n]);
        }
      }
      opts.byweekday = notEmpty(byweekday) ? byweekday : null;
      opts.bynweekday = notEmpty(bynweekday) ? bynweekday : null;
    }
    if (!isPresent(opts.byhour)) {
      opts.byhour = opts.freq < RRule.HOURLY ? [opts.dtstart.getUTCHours()] : null;
    } else if (isNumber(opts.byhour)) {
      opts.byhour = [opts.byhour];
    }
    if (!isPresent(opts.byminute)) {
      opts.byminute = opts.freq < RRule.MINUTELY ? [opts.dtstart.getUTCMinutes()] : null;
    } else if (isNumber(opts.byminute)) {
      opts.byminute = [opts.byminute];
    }
    if (!isPresent(opts.bysecond)) {
      opts.bysecond = opts.freq < RRule.SECONDLY ? [opts.dtstart.getUTCSeconds()] : null;
    } else if (isNumber(opts.bysecond)) {
      opts.bysecond = [opts.bysecond];
    }
    return { parsedOptions: opts };
  }
  function buildTimeset(opts) {
    var millisecondModulo = opts.dtstart.getTime() % 1e3;
    if (!freqIsDailyOrGreater(opts.freq)) {
      return [];
    }
    var timeset = [];
    opts.byhour.forEach(function(hour) {
      opts.byminute.forEach(function(minute) {
        opts.bysecond.forEach(function(second) {
          timeset.push(new Time(hour, minute, second, millisecondModulo));
        });
      });
    });
    return timeset;
  }
  function parseString(rfcString) {
    var options = rfcString.split("\n").map(parseLine).filter(function(x) {
      return x !== null;
    });
    return __assign(__assign({}, options[0]), options[1]);
  }
  function parseDtstart(line) {
    var options = {};
    var dtstartWithZone = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(line);
    if (!dtstartWithZone) {
      return options;
    }
    var tzid = dtstartWithZone[1], dtstart = dtstartWithZone[2];
    if (tzid) {
      options.tzid = tzid;
    }
    options.dtstart = untilStringToDate(dtstart);
    return options;
  }
  function parseLine(rfcString) {
    rfcString = rfcString.replace(/^\s+|\s+$/, "");
    if (!rfcString.length)
      return null;
    var header = /^([A-Z]+?)[:;]/.exec(rfcString.toUpperCase());
    if (!header) {
      return parseRrule(rfcString);
    }
    var key = header[1];
    switch (key.toUpperCase()) {
      case "RRULE":
      case "EXRULE":
        return parseRrule(rfcString);
      case "DTSTART":
        return parseDtstart(rfcString);
      default:
        throw new Error("Unsupported RFC prop ".concat(key, " in ").concat(rfcString));
    }
  }
  function parseRrule(line) {
    var strippedLine = line.replace(/^RRULE:/i, "");
    var options = parseDtstart(strippedLine);
    var attrs = line.replace(/^(?:RRULE|EXRULE):/i, "").split(";");
    attrs.forEach(function(attr) {
      var _a = attr.split("="), key = _a[0], value = _a[1];
      switch (key.toUpperCase()) {
        case "FREQ":
          options.freq = Frequency[value.toUpperCase()];
          break;
        case "WKST":
          options.wkst = Days[value.toUpperCase()];
          break;
        case "COUNT":
        case "INTERVAL":
        case "BYSETPOS":
        case "BYMONTH":
        case "BYMONTHDAY":
        case "BYYEARDAY":
        case "BYWEEKNO":
        case "BYHOUR":
        case "BYMINUTE":
        case "BYSECOND":
          var num = parseNumber(value);
          var optionKey = key.toLowerCase();
          options[optionKey] = num;
          break;
        case "BYWEEKDAY":
        case "BYDAY":
          options.byweekday = parseWeekday(value);
          break;
        case "DTSTART":
        case "TZID":
          var dtstart = parseDtstart(line);
          options.tzid = dtstart.tzid;
          options.dtstart = dtstart.dtstart;
          break;
        case "UNTIL":
          options.until = untilStringToDate(value);
          break;
        case "BYEASTER":
          options.byeaster = Number(value);
          break;
        default:
          throw new Error("Unknown RRULE property '" + key + "'");
      }
    });
    return options;
  }
  function parseNumber(value) {
    if (value.indexOf(",") !== -1) {
      var values = value.split(",");
      return values.map(parseIndividualNumber);
    }
    return parseIndividualNumber(value);
  }
  function parseIndividualNumber(value) {
    if (/^[+-]?\d+$/.test(value)) {
      return Number(value);
    }
    return value;
  }
  function parseWeekday(value) {
    var days = value.split(",");
    return days.map(function(day) {
      if (day.length === 2) {
        return Days[day];
      }
      var parts = day.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
      if (!parts || parts.length < 3) {
        throw new SyntaxError("Invalid weekday string: ".concat(day));
      }
      var n = Number(parts[1]);
      var wdaypart = parts[2];
      var wday = Days[wdaypart].weekday;
      return new Weekday(wday, n);
    });
  }
  var DateWithZone = function() {
    function DateWithZone2(date, tzid) {
      if (isNaN(date.getTime())) {
        throw new RangeError("Invalid date passed to DateWithZone");
      }
      this.date = date;
      this.tzid = tzid;
    }
    Object.defineProperty(DateWithZone2.prototype, "isUTC", { get: function() {
      return !this.tzid || this.tzid.toUpperCase() === "UTC";
    }, enumerable: false, configurable: true });
    DateWithZone2.prototype.toString = function() {
      var datestr = timeToUntilString(this.date.getTime(), this.isUTC);
      if (!this.isUTC) {
        return ";TZID=".concat(this.tzid, ":").concat(datestr);
      }
      return ":".concat(datestr);
    };
    DateWithZone2.prototype.getTime = function() {
      return this.date.getTime();
    };
    DateWithZone2.prototype.rezonedDate = function() {
      if (this.isUTC) {
        return this.date;
      }
      return dateInTimeZone(this.date, this.tzid);
    };
    return DateWithZone2;
  }();
  function optionsToString(options) {
    var rrule = [];
    var dtstart = "";
    var keys = Object.keys(options);
    var defaultKeys2 = Object.keys(DEFAULT_OPTIONS$1);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === "tzid")
        continue;
      if (!includes(defaultKeys2, keys[i]))
        continue;
      var key = keys[i].toUpperCase();
      var value = options[keys[i]];
      var outValue = "";
      if (!isPresent(value) || isArray(value) && !value.length)
        continue;
      switch (key) {
        case "FREQ":
          outValue = RRule.FREQUENCIES[options.freq];
          break;
        case "WKST":
          if (isNumber(value)) {
            outValue = new Weekday(value).toString();
          } else {
            outValue = value.toString();
          }
          break;
        case "BYWEEKDAY":
          key = "BYDAY";
          outValue = toArray(value).map(function(wday) {
            if (wday instanceof Weekday) {
              return wday;
            }
            if (isArray(wday)) {
              return new Weekday(wday[0], wday[1]);
            }
            return new Weekday(wday);
          }).toString();
          break;
        case "DTSTART":
          dtstart = buildDtstart(value, options.tzid);
          break;
        case "UNTIL":
          outValue = timeToUntilString(value, !options.tzid);
          break;
        default:
          if (isArray(value)) {
            var strValues = [];
            for (var j = 0; j < value.length; j++) {
              strValues[j] = String(value[j]);
            }
            outValue = strValues.toString();
          } else {
            outValue = String(value);
          }
      }
      if (outValue) {
        rrule.push([key, outValue]);
      }
    }
    var rules = rrule.map(function(_a) {
      var key2 = _a[0], value2 = _a[1];
      return "".concat(key2, "=").concat(value2.toString());
    }).join(";");
    var ruleString = "";
    if (rules !== "") {
      ruleString = "RRULE:".concat(rules);
    }
    return [dtstart, ruleString].filter(function(x) {
      return !!x;
    }).join("\n");
  }
  function buildDtstart(dtstart, tzid) {
    if (!dtstart) {
      return "";
    }
    return "DTSTART" + new DateWithZone(new Date(dtstart), tzid).toString();
  }
  function argsMatch(left, right) {
    if (Array.isArray(left)) {
      if (!Array.isArray(right))
        return false;
      if (left.length !== right.length)
        return false;
      return left.every(function(date, i) {
        return date.getTime() === right[i].getTime();
      });
    }
    if (left instanceof Date) {
      return right instanceof Date && left.getTime() === right.getTime();
    }
    return left === right;
  }
  var Cache = function() {
    function Cache2() {
      this.all = false;
      this.before = [];
      this.after = [];
      this.between = [];
    }
    Cache2.prototype._cacheAdd = function(what, value, args) {
      if (value) {
        value = value instanceof Date ? clone(value) : cloneDates(value);
      }
      if (what === "all") {
        this.all = value;
      } else {
        args._value = value;
        this[what].push(args);
      }
    };
    Cache2.prototype._cacheGet = function(what, args) {
      var cached = false;
      var argsKeys = args ? Object.keys(args) : [];
      var findCacheDiff = function(item2) {
        for (var i2 = 0; i2 < argsKeys.length; i2++) {
          var key = argsKeys[i2];
          if (!argsMatch(args[key], item2[key])) {
            return true;
          }
        }
        return false;
      };
      var cachedObject = this[what];
      if (what === "all") {
        cached = this.all;
      } else if (isArray(cachedObject)) {
        for (var i = 0; i < cachedObject.length; i++) {
          var item = cachedObject[i];
          if (argsKeys.length && findCacheDiff(item))
            continue;
          cached = item._value;
          break;
        }
      }
      if (!cached && this.all) {
        var iterResult = new IterResult(what, args);
        for (var i = 0; i < this.all.length; i++) {
          if (!iterResult.accept(this.all[i]))
            break;
        }
        cached = iterResult.getValue();
        this._cacheAdd(what, cached, args);
      }
      return isArray(cached) ? cloneDates(cached) : cached instanceof Date ? clone(cached) : cached;
    };
    return Cache2;
  }();
  var M365MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], repeat(1, 31), true), repeat(2, 28), true), repeat(3, 31), true), repeat(4, 30), true), repeat(5, 31), true), repeat(6, 30), true), repeat(7, 31), true), repeat(8, 31), true), repeat(9, 30), true), repeat(10, 31), true), repeat(11, 30), true), repeat(12, 31), true), repeat(1, 7), true);
  var M366MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], repeat(1, 31), true), repeat(2, 29), true), repeat(3, 31), true), repeat(4, 30), true), repeat(5, 31), true), repeat(6, 30), true), repeat(7, 31), true), repeat(8, 31), true), repeat(9, 30), true), repeat(10, 31), true), repeat(11, 30), true), repeat(12, 31), true), repeat(1, 7), true);
  var M28 = range(1, 29);
  var M29 = range(1, 30);
  var M30 = range(1, 31);
  var M31 = range(1, 32);
  var MDAY366MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], M31, true), M29, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31.slice(0, 7), true);
  var MDAY365MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], M31, true), M28, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31.slice(0, 7), true);
  var NM28 = range(-28, 0);
  var NM29 = range(-29, 0);
  var NM30 = range(-30, 0);
  var NM31 = range(-31, 0);
  var NMDAY366MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], NM31, true), NM29, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31.slice(0, 7), true);
  var NMDAY365MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], NM31, true), NM28, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31.slice(0, 7), true);
  var M366RANGE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
  var M365RANGE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  var WDAYMASK = function() {
    var wdaymask = [];
    for (var i = 0; i < 55; i++)
      wdaymask = wdaymask.concat(range(7));
    return wdaymask;
  }();
  function rebuildYear(year, options) {
    var firstyday = datetime(year, 1, 1);
    var yearlen = isLeapYear(year) ? 366 : 365;
    var nextyearlen = isLeapYear(year + 1) ? 366 : 365;
    var yearordinal = toOrdinal(firstyday);
    var yearweekday = getWeekday(firstyday);
    var result = __assign(__assign({ yearlen, nextyearlen, yearordinal, yearweekday }, baseYearMasks(year)), { wnomask: null });
    if (empty(options.byweekno)) {
      return result;
    }
    result.wnomask = repeat(0, yearlen + 7);
    var firstwkst;
    var wyearlen;
    var no1wkst = firstwkst = pymod(7 - yearweekday + options.wkst, 7);
    if (no1wkst >= 4) {
      no1wkst = 0;
      wyearlen = result.yearlen + pymod(yearweekday - options.wkst, 7);
    } else {
      wyearlen = yearlen - no1wkst;
    }
    var div = Math.floor(wyearlen / 7);
    var mod = pymod(wyearlen, 7);
    var numweeks = Math.floor(div + mod / 4);
    for (var j = 0; j < options.byweekno.length; j++) {
      var n = options.byweekno[j];
      if (n < 0) {
        n += numweeks + 1;
      }
      if (!(n > 0 && n <= numweeks)) {
        continue;
      }
      var i = void 0;
      if (n > 1) {
        i = no1wkst + (n - 1) * 7;
        if (no1wkst !== firstwkst) {
          i -= 7 - firstwkst;
        }
      } else {
        i = no1wkst;
      }
      for (var k = 0; k < 7; k++) {
        result.wnomask[i] = 1;
        i++;
        if (result.wdaymask[i] === options.wkst)
          break;
      }
    }
    if (includes(options.byweekno, 1)) {
      var i = no1wkst + numweeks * 7;
      if (no1wkst !== firstwkst)
        i -= 7 - firstwkst;
      if (i < yearlen) {
        for (var j = 0; j < 7; j++) {
          result.wnomask[i] = 1;
          i += 1;
          if (result.wdaymask[i] === options.wkst)
            break;
        }
      }
    }
    if (no1wkst) {
      var lnumweeks = void 0;
      if (!includes(options.byweekno, -1)) {
        var lyearweekday = getWeekday(datetime(year - 1, 1, 1));
        var lno1wkst = pymod(7 - lyearweekday.valueOf() + options.wkst, 7);
        var lyearlen = isLeapYear(year - 1) ? 366 : 365;
        var weekst = void 0;
        if (lno1wkst >= 4) {
          lno1wkst = 0;
          weekst = lyearlen + pymod(lyearweekday - options.wkst, 7);
        } else {
          weekst = yearlen - no1wkst;
        }
        lnumweeks = Math.floor(52 + pymod(weekst, 7) / 4);
      } else {
        lnumweeks = -1;
      }
      if (includes(options.byweekno, lnumweeks)) {
        for (var i = 0; i < no1wkst; i++)
          result.wnomask[i] = 1;
      }
    }
    return result;
  }
  function baseYearMasks(year) {
    var yearlen = isLeapYear(year) ? 366 : 365;
    var firstyday = datetime(year, 1, 1);
    var wday = getWeekday(firstyday);
    if (yearlen === 365) {
      return { mmask: M365MASK, mdaymask: MDAY365MASK, nmdaymask: NMDAY365MASK, wdaymask: WDAYMASK.slice(wday), mrange: M365RANGE };
    }
    return { mmask: M366MASK, mdaymask: MDAY366MASK, nmdaymask: NMDAY366MASK, wdaymask: WDAYMASK.slice(wday), mrange: M366RANGE };
  }
  function rebuildMonth(year, month, yearlen, mrange, wdaymask, options) {
    var result = { lastyear: year, lastmonth: month, nwdaymask: [] };
    var ranges = [];
    if (options.freq === RRule.YEARLY) {
      if (empty(options.bymonth)) {
        ranges = [[0, yearlen]];
      } else {
        for (var j = 0; j < options.bymonth.length; j++) {
          month = options.bymonth[j];
          ranges.push(mrange.slice(month - 1, month + 1));
        }
      }
    } else if (options.freq === RRule.MONTHLY) {
      ranges = [mrange.slice(month - 1, month + 1)];
    }
    if (empty(ranges)) {
      return result;
    }
    result.nwdaymask = repeat(0, yearlen);
    for (var j = 0; j < ranges.length; j++) {
      var rang = ranges[j];
      var first = rang[0];
      var last = rang[1] - 1;
      for (var k = 0; k < options.bynweekday.length; k++) {
        var i = void 0;
        var _a = options.bynweekday[k], wday = _a[0], n = _a[1];
        if (n < 0) {
          i = last + (n + 1) * 7;
          i -= pymod(wdaymask[i] - wday, 7);
        } else {
          i = first + (n - 1) * 7;
          i += pymod(7 - wdaymask[i] + wday, 7);
        }
        if (first <= i && i <= last)
          result.nwdaymask[i] = 1;
      }
    }
    return result;
  }
  function easter(y, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    var a = y % 19;
    var b = Math.floor(y / 100);
    var c = y % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = Math.floor(19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = Math.floor(32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = (h + l - 7 * m + 114) % 31 + 1;
    var date = Date.UTC(y, month - 1, day + offset);
    var yearStart = Date.UTC(y, 0, 1);
    return [Math.ceil((date - yearStart) / (1e3 * 60 * 60 * 24))];
  }
  var Iterinfo = function() {
    function Iterinfo2(options) {
      this.options = options;
    }
    Iterinfo2.prototype.rebuild = function(year, month) {
      var options = this.options;
      if (year !== this.lastyear) {
        this.yearinfo = rebuildYear(year, options);
      }
      if (notEmpty(options.bynweekday) && (month !== this.lastmonth || year !== this.lastyear)) {
        var _a = this.yearinfo, yearlen = _a.yearlen, mrange = _a.mrange, wdaymask = _a.wdaymask;
        this.monthinfo = rebuildMonth(year, month, yearlen, mrange, wdaymask, options);
      }
      if (isPresent(options.byeaster)) {
        this.eastermask = easter(year, options.byeaster);
      }
    };
    Object.defineProperty(Iterinfo2.prototype, "lastyear", { get: function() {
      return this.monthinfo ? this.monthinfo.lastyear : null;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "lastmonth", { get: function() {
      return this.monthinfo ? this.monthinfo.lastmonth : null;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "yearlen", { get: function() {
      return this.yearinfo.yearlen;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "yearordinal", { get: function() {
      return this.yearinfo.yearordinal;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "mrange", { get: function() {
      return this.yearinfo.mrange;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "wdaymask", { get: function() {
      return this.yearinfo.wdaymask;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "mmask", { get: function() {
      return this.yearinfo.mmask;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "wnomask", { get: function() {
      return this.yearinfo.wnomask;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "nwdaymask", { get: function() {
      return this.monthinfo ? this.monthinfo.nwdaymask : [];
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "nextyearlen", { get: function() {
      return this.yearinfo.nextyearlen;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "mdaymask", { get: function() {
      return this.yearinfo.mdaymask;
    }, enumerable: false, configurable: true });
    Object.defineProperty(Iterinfo2.prototype, "nmdaymask", { get: function() {
      return this.yearinfo.nmdaymask;
    }, enumerable: false, configurable: true });
    Iterinfo2.prototype.ydayset = function() {
      return [range(this.yearlen), 0, this.yearlen];
    };
    Iterinfo2.prototype.mdayset = function(_, month) {
      var start = this.mrange[month - 1];
      var end = this.mrange[month];
      var set = repeat(null, this.yearlen);
      for (var i = start; i < end; i++)
        set[i] = i;
      return [set, start, end];
    };
    Iterinfo2.prototype.wdayset = function(year, month, day) {
      var set = repeat(null, this.yearlen + 7);
      var i = toOrdinal(datetime(year, month, day)) - this.yearordinal;
      var start = i;
      for (var j = 0; j < 7; j++) {
        set[i] = i;
        ++i;
        if (this.wdaymask[i] === this.options.wkst)
          break;
      }
      return [set, start, i];
    };
    Iterinfo2.prototype.ddayset = function(year, month, day) {
      var set = repeat(null, this.yearlen);
      var i = toOrdinal(datetime(year, month, day)) - this.yearordinal;
      set[i] = i;
      return [set, i, i + 1];
    };
    Iterinfo2.prototype.htimeset = function(hour, _, second, millisecond) {
      var _this = this;
      var set = [];
      this.options.byminute.forEach(function(minute) {
        set = set.concat(_this.mtimeset(hour, minute, second, millisecond));
      });
      sort(set);
      return set;
    };
    Iterinfo2.prototype.mtimeset = function(hour, minute, _, millisecond) {
      var set = this.options.bysecond.map(function(second) {
        return new Time(hour, minute, second, millisecond);
      });
      sort(set);
      return set;
    };
    Iterinfo2.prototype.stimeset = function(hour, minute, second, millisecond) {
      return [new Time(hour, minute, second, millisecond)];
    };
    Iterinfo2.prototype.getdayset = function(freq) {
      switch (freq) {
        case Frequency.YEARLY:
          return this.ydayset.bind(this);
        case Frequency.MONTHLY:
          return this.mdayset.bind(this);
        case Frequency.WEEKLY:
          return this.wdayset.bind(this);
        case Frequency.DAILY:
          return this.ddayset.bind(this);
        default:
          return this.ddayset.bind(this);
      }
    };
    Iterinfo2.prototype.gettimeset = function(freq) {
      switch (freq) {
        case Frequency.HOURLY:
          return this.htimeset.bind(this);
        case Frequency.MINUTELY:
          return this.mtimeset.bind(this);
        case Frequency.SECONDLY:
          return this.stimeset.bind(this);
      }
    };
    return Iterinfo2;
  }();
  function buildPoslist(bysetpos, timeset, start, end, ii, dayset) {
    var poslist = [];
    for (var j = 0; j < bysetpos.length; j++) {
      var daypos = void 0;
      var timepos = void 0;
      var pos = bysetpos[j];
      if (pos < 0) {
        daypos = Math.floor(pos / timeset.length);
        timepos = pymod(pos, timeset.length);
      } else {
        daypos = Math.floor((pos - 1) / timeset.length);
        timepos = pymod(pos - 1, timeset.length);
      }
      var tmp = [];
      for (var k = start; k < end; k++) {
        var val = dayset[k];
        if (!isPresent(val))
          continue;
        tmp.push(val);
      }
      var i = void 0;
      if (daypos < 0) {
        i = tmp.slice(daypos)[0];
      } else {
        i = tmp[daypos];
      }
      var time = timeset[timepos];
      var date = fromOrdinal(ii.yearordinal + i);
      var res = combine(date, time);
      if (!includes(poslist, res))
        poslist.push(res);
    }
    sort(poslist);
    return poslist;
  }
  function iter(iterResult, options) {
    var dtstart = options.dtstart, freq = options.freq, interval = options.interval, until = options.until, bysetpos = options.bysetpos;
    var count = options.count;
    if (count === 0 || interval === 0) {
      return emitResult(iterResult);
    }
    var counterDate = DateTime.fromDate(dtstart);
    var ii = new Iterinfo(options);
    ii.rebuild(counterDate.year, counterDate.month);
    var timeset = makeTimeset(ii, counterDate, options);
    for (; ; ) {
      var _a = ii.getdayset(freq)(counterDate.year, counterDate.month, counterDate.day), dayset = _a[0], start = _a[1], end = _a[2];
      var filtered = removeFilteredDays(dayset, start, end, ii, options);
      if (notEmpty(bysetpos)) {
        var poslist = buildPoslist(bysetpos, timeset, start, end, ii, dayset);
        for (var j = 0; j < poslist.length; j++) {
          var res = poslist[j];
          if (until && res > until) {
            return emitResult(iterResult);
          }
          if (res >= dtstart) {
            var rezonedDate = rezoneIfNeeded(res, options);
            if (!iterResult.accept(rezonedDate)) {
              return emitResult(iterResult);
            }
            if (count) {
              --count;
              if (!count) {
                return emitResult(iterResult);
              }
            }
          }
        }
      } else {
        for (var j = start; j < end; j++) {
          var currentDay = dayset[j];
          if (!isPresent(currentDay)) {
            continue;
          }
          var date = fromOrdinal(ii.yearordinal + currentDay);
          for (var k = 0; k < timeset.length; k++) {
            var time = timeset[k];
            var res = combine(date, time);
            if (until && res > until) {
              return emitResult(iterResult);
            }
            if (res >= dtstart) {
              var rezonedDate = rezoneIfNeeded(res, options);
              if (!iterResult.accept(rezonedDate)) {
                return emitResult(iterResult);
              }
              if (count) {
                --count;
                if (!count) {
                  return emitResult(iterResult);
                }
              }
            }
          }
        }
      }
      if (options.interval === 0) {
        return emitResult(iterResult);
      }
      counterDate.add(options, filtered);
      if (counterDate.year > MAXYEAR) {
        return emitResult(iterResult);
      }
      if (!freqIsDailyOrGreater(freq)) {
        timeset = ii.gettimeset(freq)(counterDate.hour, counterDate.minute, counterDate.second, 0);
      }
      ii.rebuild(counterDate.year, counterDate.month);
    }
  }
  function isFiltered(ii, currentDay, options) {
    var bymonth = options.bymonth, byweekno = options.byweekno, byweekday = options.byweekday, byeaster = options.byeaster, bymonthday = options.bymonthday, bynmonthday = options.bynmonthday, byyearday = options.byyearday;
    return notEmpty(bymonth) && !includes(bymonth, ii.mmask[currentDay]) || notEmpty(byweekno) && !ii.wnomask[currentDay] || notEmpty(byweekday) && !includes(byweekday, ii.wdaymask[currentDay]) || notEmpty(ii.nwdaymask) && !ii.nwdaymask[currentDay] || byeaster !== null && !includes(ii.eastermask, currentDay) || (notEmpty(bymonthday) || notEmpty(bynmonthday)) && !includes(bymonthday, ii.mdaymask[currentDay]) && !includes(bynmonthday, ii.nmdaymask[currentDay]) || notEmpty(byyearday) && (currentDay < ii.yearlen && !includes(byyearday, currentDay + 1) && !includes(byyearday, -ii.yearlen + currentDay) || currentDay >= ii.yearlen && !includes(byyearday, currentDay + 1 - ii.yearlen) && !includes(byyearday, -ii.nextyearlen + currentDay - ii.yearlen));
  }
  function rezoneIfNeeded(date, options) {
    return new DateWithZone(date, options.tzid).rezonedDate();
  }
  function emitResult(iterResult) {
    return iterResult.getValue();
  }
  function removeFilteredDays(dayset, start, end, ii, options) {
    var filtered = false;
    for (var dayCounter = start; dayCounter < end; dayCounter++) {
      var currentDay = dayset[dayCounter];
      filtered = isFiltered(ii, currentDay, options);
      if (filtered)
        dayset[currentDay] = null;
    }
    return filtered;
  }
  function makeTimeset(ii, counterDate, options) {
    var freq = options.freq, byhour = options.byhour, byminute = options.byminute, bysecond = options.bysecond;
    if (freqIsDailyOrGreater(freq)) {
      return buildTimeset(options);
    }
    if (freq >= RRule.HOURLY && notEmpty(byhour) && !includes(byhour, counterDate.hour) || freq >= RRule.MINUTELY && notEmpty(byminute) && !includes(byminute, counterDate.minute) || freq >= RRule.SECONDLY && notEmpty(bysecond) && !includes(bysecond, counterDate.second)) {
      return [];
    }
    return ii.gettimeset(freq)(counterDate.hour, counterDate.minute, counterDate.second, counterDate.millisecond);
  }
  var Days = { MO: new Weekday(0), TU: new Weekday(1), WE: new Weekday(2), TH: new Weekday(3), FR: new Weekday(4), SA: new Weekday(5), SU: new Weekday(6) };
  var DEFAULT_OPTIONS$1 = { freq: Frequency.YEARLY, dtstart: null, interval: 1, wkst: Days.MO, count: null, until: null, tzid: null, bysetpos: null, bymonth: null, bymonthday: null, bynmonthday: null, byyearday: null, byweekno: null, byweekday: null, bynweekday: null, byhour: null, byminute: null, bysecond: null, byeaster: null };
  var defaultKeys = Object.keys(DEFAULT_OPTIONS$1);
  var RRule = function() {
    function RRule2(options, noCache) {
      if (options === void 0) {
        options = {};
      }
      if (noCache === void 0) {
        noCache = false;
      }
      this._cache = noCache ? null : new Cache();
      this.origOptions = initializeOptions$1(options);
      var parsedOptions = parseOptions(options).parsedOptions;
      this.options = parsedOptions;
    }
    RRule2.parseText = function(text, language) {
      return parseText(text, language);
    };
    RRule2.fromText = function(text, language) {
      return fromText(text, language);
    };
    RRule2.fromString = function(str) {
      return new RRule2(RRule2.parseString(str) || void 0);
    };
    RRule2.prototype._iter = function(iterResult) {
      return iter(iterResult, this.options);
    };
    RRule2.prototype._cacheGet = function(what, args) {
      if (!this._cache)
        return false;
      return this._cache._cacheGet(what, args);
    };
    RRule2.prototype._cacheAdd = function(what, value, args) {
      if (!this._cache)
        return;
      return this._cache._cacheAdd(what, value, args);
    };
    RRule2.prototype.all = function(iterator) {
      if (iterator) {
        return this._iter(new CallbackIterResult("all", {}, iterator));
      }
      var result = this._cacheGet("all");
      if (result === false) {
        result = this._iter(new IterResult("all", {}));
        this._cacheAdd("all", result);
      }
      return result;
    };
    RRule2.prototype.between = function(after, before, inc, iterator) {
      if (inc === void 0) {
        inc = false;
      }
      if (!isValidDate(after) || !isValidDate(before)) {
        throw new Error("Invalid date passed in to RRule.between");
      }
      var args = { before, after, inc };
      if (iterator) {
        return this._iter(new CallbackIterResult("between", args, iterator));
      }
      var result = this._cacheGet("between", args);
      if (result === false) {
        result = this._iter(new IterResult("between", args));
        this._cacheAdd("between", result, args);
      }
      return result;
    };
    RRule2.prototype.before = function(dt, inc) {
      if (inc === void 0) {
        inc = false;
      }
      if (!isValidDate(dt)) {
        throw new Error("Invalid date passed in to RRule.before");
      }
      var args = { dt, inc };
      var result = this._cacheGet("before", args);
      if (result === false) {
        result = this._iter(new IterResult("before", args));
        this._cacheAdd("before", result, args);
      }
      return result;
    };
    RRule2.prototype.after = function(dt, inc) {
      if (inc === void 0) {
        inc = false;
      }
      if (!isValidDate(dt)) {
        throw new Error("Invalid date passed in to RRule.after");
      }
      var args = { dt, inc };
      var result = this._cacheGet("after", args);
      if (result === false) {
        result = this._iter(new IterResult("after", args));
        this._cacheAdd("after", result, args);
      }
      return result;
    };
    RRule2.prototype.count = function() {
      return this.all().length;
    };
    RRule2.prototype.toString = function() {
      return optionsToString(this.origOptions);
    };
    RRule2.prototype.toText = function(gettext, language, dateFormatter) {
      return toText(this, gettext, language, dateFormatter);
    };
    RRule2.prototype.isFullyConvertibleToText = function() {
      return isFullyConvertible(this);
    };
    RRule2.prototype.clone = function() {
      return new RRule2(this.origOptions);
    };
    RRule2.FREQUENCIES = ["YEARLY", "MONTHLY", "WEEKLY", "DAILY", "HOURLY", "MINUTELY", "SECONDLY"];
    RRule2.YEARLY = Frequency.YEARLY;
    RRule2.MONTHLY = Frequency.MONTHLY;
    RRule2.WEEKLY = Frequency.WEEKLY;
    RRule2.DAILY = Frequency.DAILY;
    RRule2.HOURLY = Frequency.HOURLY;
    RRule2.MINUTELY = Frequency.MINUTELY;
    RRule2.SECONDLY = Frequency.SECONDLY;
    RRule2.MO = Days.MO;
    RRule2.TU = Days.TU;
    RRule2.WE = Days.WE;
    RRule2.TH = Days.TH;
    RRule2.FR = Days.FR;
    RRule2.SA = Days.SA;
    RRule2.SU = Days.SU;
    RRule2.parseString = parseString;
    RRule2.optionsToString = optionsToString;
    return RRule2;
  }();
  function iterSet(iterResult, _rrule, _exrule, _rdate, _exdate, tzid) {
    var _exdateHash = {};
    var _accept = iterResult.accept;
    function evalExdate(after, before) {
      _exrule.forEach(function(rrule) {
        rrule.between(after, before, true).forEach(function(date) {
          _exdateHash[Number(date)] = true;
        });
      });
    }
    _exdate.forEach(function(date) {
      var zonedDate2 = new DateWithZone(date, tzid).rezonedDate();
      _exdateHash[Number(zonedDate2)] = true;
    });
    iterResult.accept = function(date) {
      var dt = Number(date);
      if (isNaN(dt))
        return _accept.call(this, date);
      if (!_exdateHash[dt]) {
        evalExdate(new Date(dt - 1), new Date(dt + 1));
        if (!_exdateHash[dt]) {
          _exdateHash[dt] = true;
          return _accept.call(this, date);
        }
      }
      return true;
    };
    if (iterResult.method === "between") {
      evalExdate(iterResult.args.after, iterResult.args.before);
      iterResult.accept = function(date) {
        var dt = Number(date);
        if (!_exdateHash[dt]) {
          _exdateHash[dt] = true;
          return _accept.call(this, date);
        }
        return true;
      };
    }
    for (var i = 0; i < _rdate.length; i++) {
      var zonedDate = new DateWithZone(_rdate[i], tzid).rezonedDate();
      if (!iterResult.accept(new Date(zonedDate.getTime())))
        break;
    }
    _rrule.forEach(function(rrule) {
      iter(iterResult, rrule.options);
    });
    var res = iterResult._result;
    sort(res);
    switch (iterResult.method) {
      case "all":
      case "between":
        return res;
      case "before":
        return res.length && res[res.length - 1] || null;
      case "after":
      default:
        return res.length && res[0] || null;
    }
  }
  var DEFAULT_OPTIONS = { dtstart: null, cache: false, unfold: false, forceset: false, compatible: false, tzid: null };
  function parseInput(s, options) {
    var rrulevals = [];
    var rdatevals = [];
    var exrulevals = [];
    var exdatevals = [];
    var parsedDtstart = parseDtstart(s);
    var dtstart = parsedDtstart.dtstart;
    var tzid = parsedDtstart.tzid;
    var lines = splitIntoLines(s, options.unfold);
    lines.forEach(function(line) {
      var _a;
      if (!line)
        return;
      var _b = breakDownLine(line), name = _b.name, parms = _b.parms, value = _b.value;
      switch (name.toUpperCase()) {
        case "RRULE":
          if (parms.length) {
            throw new Error("unsupported RRULE parm: ".concat(parms.join(",")));
          }
          rrulevals.push(parseString(line));
          break;
        case "RDATE":
          var _c = (_a = /RDATE(?:;TZID=([^:=]+))?/i.exec(line)) !== null && _a !== void 0 ? _a : [], rdateTzid = _c[1];
          if (rdateTzid && !tzid) {
            tzid = rdateTzid;
          }
          rdatevals = rdatevals.concat(parseRDate(value, parms));
          break;
        case "EXRULE":
          if (parms.length) {
            throw new Error("unsupported EXRULE parm: ".concat(parms.join(",")));
          }
          exrulevals.push(parseString(value));
          break;
        case "EXDATE":
          exdatevals = exdatevals.concat(parseRDate(value, parms));
          break;
        case "DTSTART":
          break;
        default:
          throw new Error("unsupported property: " + name);
      }
    });
    return { dtstart, tzid, rrulevals, rdatevals, exrulevals, exdatevals };
  }
  function buildRule(s, options) {
    var _a = parseInput(s, options), rrulevals = _a.rrulevals, rdatevals = _a.rdatevals, exrulevals = _a.exrulevals, exdatevals = _a.exdatevals, dtstart = _a.dtstart, tzid = _a.tzid;
    var noCache = options.cache === false;
    if (options.compatible) {
      options.forceset = true;
      options.unfold = true;
    }
    if (options.forceset || rrulevals.length > 1 || rdatevals.length || exrulevals.length || exdatevals.length) {
      var rset_1 = new RRuleSet(noCache);
      rset_1.dtstart(dtstart);
      rset_1.tzid(tzid || void 0);
      rrulevals.forEach(function(val2) {
        rset_1.rrule(new RRule(groomRruleOptions(val2, dtstart, tzid), noCache));
      });
      rdatevals.forEach(function(date) {
        rset_1.rdate(date);
      });
      exrulevals.forEach(function(val2) {
        rset_1.exrule(new RRule(groomRruleOptions(val2, dtstart, tzid), noCache));
      });
      exdatevals.forEach(function(date) {
        rset_1.exdate(date);
      });
      if (options.compatible && options.dtstart)
        rset_1.rdate(dtstart);
      return rset_1;
    }
    var val = rrulevals[0] || {};
    return new RRule(groomRruleOptions(val, val.dtstart || options.dtstart || dtstart, val.tzid || options.tzid || tzid), noCache);
  }
  function rrulestr(s, options) {
    if (options === void 0) {
      options = {};
    }
    return buildRule(s, initializeOptions(options));
  }
  function groomRruleOptions(val, dtstart, tzid) {
    return __assign(__assign({}, val), { dtstart, tzid });
  }
  function initializeOptions(options) {
    var invalid = [];
    var keys = Object.keys(options);
    var defaultKeys2 = Object.keys(DEFAULT_OPTIONS);
    keys.forEach(function(key) {
      if (!includes(defaultKeys2, key))
        invalid.push(key);
    });
    if (invalid.length) {
      throw new Error("Invalid options: " + invalid.join(", "));
    }
    return __assign(__assign({}, DEFAULT_OPTIONS), options);
  }
  function extractName(line) {
    if (line.indexOf(":") === -1) {
      return { name: "RRULE", value: line };
    }
    var _a = split(line, ":", 1), name = _a[0], value = _a[1];
    return { name, value };
  }
  function breakDownLine(line) {
    var _a = extractName(line), name = _a.name, value = _a.value;
    var parms = name.split(";");
    if (!parms)
      throw new Error("empty property name");
    return { name: parms[0].toUpperCase(), parms: parms.slice(1), value };
  }
  function splitIntoLines(s, unfold) {
    if (unfold === void 0) {
      unfold = false;
    }
    s = s && s.trim();
    if (!s)
      throw new Error("Invalid empty string");
    if (!unfold) {
      return s.split(/\s/);
    }
    var lines = s.split("\n");
    var i = 0;
    while (i < lines.length) {
      var line = lines[i] = lines[i].replace(/\s+$/g, "");
      if (!line) {
        lines.splice(i, 1);
      } else if (i > 0 && line[0] === " ") {
        lines[i - 1] += line.slice(1);
        lines.splice(i, 1);
      } else {
        i += 1;
      }
    }
    return lines;
  }
  function validateDateParm(parms) {
    parms.forEach(function(parm) {
      if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(parm)) {
        throw new Error("unsupported RDATE/EXDATE parm: " + parm);
      }
    });
  }
  function parseRDate(rdateval, parms) {
    validateDateParm(parms);
    return rdateval.split(",").map(function(datestr) {
      return untilStringToDate(datestr);
    });
  }
  function createGetterSetter(fieldName) {
    var _this = this;
    return function(field) {
      if (field !== void 0) {
        _this["_".concat(fieldName)] = field;
      }
      if (_this["_".concat(fieldName)] !== void 0) {
        return _this["_".concat(fieldName)];
      }
      for (var i = 0; i < _this._rrule.length; i++) {
        var field_1 = _this._rrule[i].origOptions[fieldName];
        if (field_1) {
          return field_1;
        }
      }
    };
  }
  var RRuleSet = function(_super) {
    __extends(RRuleSet2, _super);
    function RRuleSet2(noCache) {
      if (noCache === void 0) {
        noCache = false;
      }
      var _this = _super.call(this, {}, noCache) || this;
      _this.dtstart = createGetterSetter.apply(_this, ["dtstart"]);
      _this.tzid = createGetterSetter.apply(_this, ["tzid"]);
      _this._rrule = [];
      _this._rdate = [];
      _this._exrule = [];
      _this._exdate = [];
      return _this;
    }
    RRuleSet2.prototype._iter = function(iterResult) {
      return iterSet(iterResult, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
    };
    RRuleSet2.prototype.rrule = function(rrule) {
      _addRule(rrule, this._rrule);
    };
    RRuleSet2.prototype.exrule = function(rrule) {
      _addRule(rrule, this._exrule);
    };
    RRuleSet2.prototype.rdate = function(date) {
      _addDate(date, this._rdate);
    };
    RRuleSet2.prototype.exdate = function(date) {
      _addDate(date, this._exdate);
    };
    RRuleSet2.prototype.rrules = function() {
      return this._rrule.map(function(e) {
        return rrulestr(e.toString());
      });
    };
    RRuleSet2.prototype.exrules = function() {
      return this._exrule.map(function(e) {
        return rrulestr(e.toString());
      });
    };
    RRuleSet2.prototype.rdates = function() {
      return this._rdate.map(function(e) {
        return new Date(e.getTime());
      });
    };
    RRuleSet2.prototype.exdates = function() {
      return this._exdate.map(function(e) {
        return new Date(e.getTime());
      });
    };
    RRuleSet2.prototype.valueOf = function() {
      var result = [];
      if (!this._rrule.length && this._dtstart) {
        result = result.concat(optionsToString({ dtstart: this._dtstart }));
      }
      this._rrule.forEach(function(rrule) {
        result = result.concat(rrule.toString().split("\n"));
      });
      this._exrule.forEach(function(exrule) {
        result = result.concat(exrule.toString().split("\n").map(function(line) {
          return line.replace(/^RRULE:/, "EXRULE:");
        }).filter(function(line) {
          return !/^DTSTART/.test(line);
        }));
      });
      if (this._rdate.length) {
        result.push(rdatesToString("RDATE", this._rdate, this.tzid()));
      }
      if (this._exdate.length) {
        result.push(rdatesToString("EXDATE", this._exdate, this.tzid()));
      }
      return result;
    };
    RRuleSet2.prototype.toString = function() {
      return this.valueOf().join("\n");
    };
    RRuleSet2.prototype.clone = function() {
      var rrs = new RRuleSet2(!!this._cache);
      this._rrule.forEach(function(rule) {
        return rrs.rrule(rule.clone());
      });
      this._exrule.forEach(function(rule) {
        return rrs.exrule(rule.clone());
      });
      this._rdate.forEach(function(date) {
        return rrs.rdate(new Date(date.getTime()));
      });
      this._exdate.forEach(function(date) {
        return rrs.exdate(new Date(date.getTime()));
      });
      return rrs;
    };
    return RRuleSet2;
  }(RRule);
  function _addRule(rrule, collection) {
    if (!(rrule instanceof RRule)) {
      throw new TypeError(String(rrule) + " is not RRule instance");
    }
    if (!includes(collection.map(String), String(rrule))) {
      collection.push(rrule);
    }
  }
  function _addDate(date, collection) {
    if (!(date instanceof Date)) {
      throw new TypeError(String(date) + " is not Date instance");
    }
    if (!includes(collection.map(Number), Number(date))) {
      collection.push(date);
      sort(collection);
    }
  }
  function rdatesToString(param, rdates, tzid) {
    var isUTC = !tzid || tzid.toUpperCase() === "UTC";
    var header = isUTC ? "".concat(param, ":") : "".concat(param, ";TZID=").concat(tzid, ":");
    var dateString = rdates.map(function(rdate) {
      return timeToUntilString(rdate.valueOf(), isUTC);
    }).join(",");
    return "".concat(header).concat(dateString);
  }
  function recurring(scheduler2) {
    function clearMilliseconds(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
    }
    function isDeletedOccurrence(event2) {
      return !!event2.deleted;
    }
    function isSeries(event2) {
      return !!event2.rrule && !event2.recurring_event_id;
    }
    function clearRecurringProperties(event2) {
      event2.rrule = "";
      event2.original_start = null;
      event2.recurring_event_id = null;
      event2.duration = null;
      event2.deleted = null;
    }
    function createException(ev) {
      let id2 = ev.id.split("#");
      let nid = scheduler2.uid();
      scheduler2._not_render = true;
      let nev = scheduler2._copy_event(ev);
      nev.id = nid;
      nev.recurring_event_id = id2[0];
      let timestamp = id2[1];
      nev.original_start = new Date(Number(timestamp));
      scheduler2._add_rec_marker(nev, timestamp);
      scheduler2.addEvent(nev);
      scheduler2._not_render = false;
    }
    function toUTCDate(date) {
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }
    function setUTCPartsToDate(d) {
      return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    }
    function updateFollowingEventsRRULE(ev) {
      if (ev.rrule.includes(";UNTIL=")) {
        ev.rrule = ev.rrule.split(";UNTIL=")[0];
      }
      let parsedRRule = rrulestr(`RRULE:${ev.rrule};UNTIL=${toIcalString(ev._end_date || ev.end_date)}`, { dtstart: ev.start_date });
      let newRRULE = new RRule(parsedRRule.origOptions).toString().replace("RRULE:", "");
      newRRULE = newRRULE.split("\n")[1];
      ev.rrule = newRRULE;
    }
    function updateFollowingWithWEEKLY(id2, ev) {
      if (!ev) {
        ev = scheduler2.getEvent(id2);
      }
      let rruleStringparts = ev.rrule.split(";");
      let updatedRRULE = [];
      for (let i = 0; i < rruleStringparts.length; i++) {
        let splited = rruleStringparts[i].split("=");
        let code = splited[0];
        let name = splited[1];
        if (code === "BYDAY") {
          if (!(ev.rrule.includes("WEEKLY") && name.length > 3)) {
            continue;
          }
        }
        updatedRRULE.push(code);
        updatedRRULE.push("=");
        updatedRRULE.push(name);
        updatedRRULE.push(";");
      }
      updatedRRULE.pop();
      ev.rrule = updatedRRULE.join("");
    }
    scheduler2._isFollowing = function(id2) {
      let ev = scheduler2.getEvent(id2);
      return !!(ev && ev._thisAndFollowing);
    };
    scheduler2._isFirstOccurrence = function(ev) {
      if (scheduler2._is_virtual_event(ev.id)) {
        let pid = ev.id.split("#")[0];
        let recEvent = scheduler2.getEvent(pid);
        return !!(recEvent.start_date.valueOf() === ev.start_date.valueOf());
      }
    };
    scheduler2._isExceptionFirstOccurrence = function(ev) {
      if (scheduler2._is_modified_occurrence(ev)) {
        let pid = ev.recurring_event_id;
        let recEvent = scheduler2.getEvent(pid);
        return !!(ev.original_start && ev.original_start.valueOf() && ev.original_start.valueOf() === recEvent.start_date.valueOf());
      }
    };
    scheduler2._rec_temp = [];
    scheduler2._rec_markers_pull = {};
    scheduler2._rec_markers = {};
    scheduler2._add_rec_marker = function(ev, time) {
      ev._pid_time = time;
      this._rec_markers[ev.id] = ev;
      if (!this._rec_markers_pull[ev.event_pid])
        this._rec_markers_pull[ev.event_pid] = {};
      this._rec_markers_pull[ev.event_pid][time] = ev;
    };
    scheduler2._get_rec_marker = function(time, id2) {
      let ch = this._rec_markers_pull[id2];
      if (ch)
        return ch[time];
      return null;
    };
    scheduler2._get_rec_markers = function(id2) {
      return this._rec_markers_pull[id2] || [];
    };
    (function() {
      var old_add_event = scheduler2.addEvent;
      scheduler2.addEvent = function(start_date, end_date, text, id2, extra_data) {
        var ev_id = old_add_event.apply(this, arguments);
        if (ev_id && scheduler2.getEvent(ev_id)) {
          var ev = scheduler2.getEvent(ev_id);
          if (ev.start_date) {
            ev.start_date = clearMilliseconds(ev.start_date);
          }
          if (ev.end_date) {
            ev.end_date = clearMilliseconds(ev.end_date);
          }
        }
        return ev_id;
      };
    })();
    scheduler2.attachEvent("onEventLoading", function(event2) {
      if (event2.original_start && !event2.original_start.getFullYear) {
        event2.original_start = scheduler2.templates.parse_date(event2.original_start);
      }
      return true;
    });
    scheduler2.attachEvent("onEventIdChange", function(id2, new_id) {
      if (this._ignore_call)
        return;
      this._ignore_call = true;
      if (scheduler2._rec_markers[id2]) {
        scheduler2._rec_markers[new_id] = scheduler2._rec_markers[id2];
        delete scheduler2._rec_markers[id2];
      }
      if (scheduler2._rec_markers_pull[id2]) {
        scheduler2._rec_markers_pull[new_id] = scheduler2._rec_markers_pull[id2];
        delete scheduler2._rec_markers_pull[id2];
      }
      for (var i = 0; i < this._rec_temp.length; i++) {
        var tev = this._rec_temp[i];
        if (this._is_virtual_event(tev.id) && tev.id.split("#")[0] == id2) {
          tev.recurring_event_id = new_id;
          this.changeEventId(tev.id, new_id + "#" + tev.id.split("#")[1]);
        }
      }
      for (var i in this._rec_markers) {
        var tev = this._rec_markers[i];
        if (tev.recurring_event_id == id2) {
          tev.recurring_event_id = new_id;
          tev._pid_changed = true;
        }
      }
      var el2 = scheduler2._rec_markers[new_id];
      if (el2 && el2._pid_changed) {
        delete el2._pid_changed;
        setTimeout(function() {
          if (scheduler2.$destroyed) {
            return true;
          }
          scheduler2.callEvent("onEventChanged", [new_id, scheduler2.getEvent(new_id)]);
        }, 1);
      }
      delete this._ignore_call;
    });
    function setPropsForFirstOccurrence(ev, occurrence) {
      ev._end_date = ev.end_date;
      if (scheduler2._isExceptionFirstOccurrence(occurrence)) {
        ev.start_date = occurrence.start_date;
        ev.end_date = new Date(occurrence.start_date.valueOf() + ev.duration * 1e3);
        ev._start_date = occurrence.original_start;
        ev._modified = true;
      } else {
        ev.end_date = new Date(occurrence.start_date.valueOf() + ev.duration * 1e3);
        ev.start_date = occurrence.start_date;
        ev._firstOccurrence = true;
      }
      ev._thisAndFollowing = occurrence.id;
    }
    function setPropsForStorageEvent(index, data, ev, tempEvent) {
      const targetIndex = ev._modified ? tempEvent.id : index;
      scheduler2._events[targetIndex] = { ...tempEvent, text: data.text, duration: data.duration, start_date: data.start_date, rrule: data.rrule, end_date: tempEvent._end_date, _start_date: tempEvent.start_date, _thisAndFollowing: null, _end_date: null };
      if (ev._modified) {
        delete scheduler2._events[index];
      }
      scheduler2.callEvent("onEventChanged", [scheduler2._events[targetIndex].id, scheduler2._events[targetIndex]]);
    }
    function deleteExceptionFromStorage(exception) {
      for (const i in scheduler2._events) {
        let tev = scheduler2._events[i];
        if (tev.id == exception.id) {
          delete scheduler2._events[i];
        }
      }
    }
    function updateTextEvents(id2, data) {
      for (let i in scheduler2._events) {
        let tev = scheduler2._events[i];
        if (tev.recurring_event_id == id2 || scheduler2._is_virtual_event(tev.id) && tev.id.split("#")[0] == id2) {
          tev.text = data.text;
          scheduler2.updateEvent(tev.id);
        }
      }
    }
    function deleteEventFromSeries(idTimestamp, ev) {
      let id2 = idTimestamp;
      let originalStartTimestamp = new Date(ev.original_start).valueOf();
      idTimestamp = String(id2).split("#") || ev._pid_time || originalStartTimestamp;
      let nid = scheduler2.uid();
      let tid = idTimestamp[1] ? idTimestamp[1] : ev._pid_time || originalStartTimestamp;
      let nev = scheduler2._copy_event(ev);
      nev.id = nid;
      nev.recurring_event_id = ev.recurring_event_id || idTimestamp[0];
      nev.original_start = new Date(Number(tid));
      nev.deleted = true;
      scheduler2.addEvent(nev);
    }
    scheduler2.attachEvent("onConfirmedBeforeEventDelete", function(id2) {
      var ev = this.getEvent(id2);
      if (this._is_virtual_event(id2) || this._is_modified_occurrence(ev) && !isDeletedOccurrence(ev)) {
        deleteEventFromSeries(id2, ev);
      } else {
        if (isSeries(ev) && this._lightbox_id)
          this._roll_back_dates(ev);
        var sub = this._get_rec_markers(id2);
        for (var i in sub) {
          if (sub.hasOwnProperty(i)) {
            id2 = sub[i].id;
            if (this.getEvent(id2))
              this.deleteEvent(id2, true);
          }
        }
      }
      return true;
    });
    scheduler2.attachEvent("onEventDeleted", function(id2, ev) {
      if (!this._is_virtual_event(id2) && this._is_modified_occurrence(ev)) {
        if (!scheduler2._events[id2]) {
          ev.deleted = true;
          this.setEvent(id2, ev);
          scheduler2.render();
        }
      }
    });
    function removeTempDraggedEvent() {
      for (const i in scheduler2._events) {
        if (i === "$dnd_recurring_placeholder") {
          delete scheduler2._events[i];
        }
      }
      scheduler2.render();
    }
    scheduler2.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original) {
      if (!is_new && ev && (scheduler2._is_virtual_event(ev.id) || scheduler2._is_modified_occurrence(ev))) {
        if (original.start_date.getDate() !== ev.start_date.getDate()) {
          ev._beforeEventChangedFlag = "edit";
        } else {
          ev._beforeEventChangedFlag = "ask";
        }
        if (!scheduler2.config.collision_limit || scheduler2.checkCollision(ev)) {
          scheduler2._events["$dnd_recurring_placeholder"] = scheduler2._lame_clone(ev);
          scheduler2._showRequiredModalBox(ev.id, ev._beforeEventChangedFlag);
          return false;
        }
      }
      return true;
    });
    scheduler2.attachEvent("onEventChanged", function(id2, event2) {
      if (this._loading)
        return true;
      let ev = this.getEvent(id2);
      if (this._is_virtual_event(id2)) {
        createException(ev);
      } else {
        if (ev.start_date) {
          ev.start_date = clearMilliseconds(ev.start_date);
        }
        if (ev.end_date) {
          ev.end_date = clearMilliseconds(ev.end_date);
        }
        if (isSeries(ev) && this._lightbox_id) {
          if (ev._removeFollowing || this._isFollowing(id2)) {
            ev._removeFollowing = null;
          } else {
            this._roll_back_dates(ev);
          }
        }
        var sub = this._get_rec_markers(id2);
        for (var i in sub) {
          if (sub.hasOwnProperty(i)) {
            delete this._rec_markers[sub[i].id];
            this.deleteEvent(sub[i].id, true);
          }
        }
        delete this._rec_markers_pull[id2];
        var isEventFound = false;
        for (var k = 0; k < this._rendered.length; k++) {
          if (this._rendered[k].getAttribute(this.config.event_attribute) == id2)
            isEventFound = true;
        }
        if (!isEventFound)
          this._select_id = null;
      }
      removeTempDraggedEvent();
      return true;
    });
    scheduler2.attachEvent("onEventAdded", function(id2) {
      if (!this._loading) {
        var ev = this.getEvent(id2);
        if (isSeries(ev)) {
          this._roll_back_dates(ev);
        }
      }
      return true;
    });
    scheduler2.attachEvent("onEventSave", function(id2, data, is_new_event) {
      let ev = this.getEvent(id2);
      let tempEvent = scheduler2._lame_clone(ev);
      let tempDataRRULE = data.rrule;
      if (ev && isSeries(ev)) {
        if (!is_new_event && this._isFollowing(id2)) {
          if (ev._removeFollowing) {
            let occurrence = scheduler2.getEvent(ev._thisAndFollowing);
            if (occurrence && (ev._firstOccurrence || ev._modified)) {
              scheduler2.hideLightbox();
              scheduler2.deleteEvent(ev.id);
              return false;
            } else {
              ev.end_date = new Date(ev.start_date.valueOf() - 1e3);
              ev._end_date = ev._shorten_end_date;
              ev.start_date = ev._start_date;
              ev._shorten = true;
              updateFollowingEventsRRULE(ev);
              scheduler2.callEvent("onEventChanged", [ev.id, ev]);
              let occurrence2 = scheduler2.getEvent(ev._thisAndFollowing);
              if (occurrence2) {
                for (const i in scheduler2._events) {
                  let tev = scheduler2._events[i];
                  if (tev.recurring_event_id === id2) {
                    if (tev.start_date.valueOf() > tempEvent.start_date.valueOf()) {
                      deleteEventFromSeries(tev.id, tev);
                    }
                  }
                }
              }
            }
            scheduler2.hideLightbox();
            return false;
          } else {
            let occurrence = scheduler2.getEvent(ev._thisAndFollowing);
            if (occurrence && ev._firstOccurrence) {
              for (const i in scheduler2._events) {
                let tev = scheduler2._events[i];
                if (tev.id == ev.id) {
                  setPropsForStorageEvent(i, data, ev, tempEvent);
                }
              }
            } else if (occurrence && ev._modified) {
              for (const i in scheduler2._events) {
                let tev = scheduler2._events[i];
                if (tev.recurring_event_id == id2 && tev.id == tempEvent._thisAndFollowing) {
                  setPropsForStorageEvent(i, data, ev, tempEvent);
                }
              }
            } else {
              if (scheduler2._is_modified_occurrence(occurrence)) {
                deleteExceptionFromStorage(occurrence);
              }
              ev.end_date = ev._shorten_end_date;
              ev._end_date = ev._shorten_end_date;
              ev.start_date = ev._start_date;
              ev._shorten = true;
              updateFollowingEventsRRULE(ev);
              scheduler2.callEvent("onEventChanged", [ev.id, ev]);
              let followingEv = { ...tempEvent };
              followingEv.text = data.text;
              followingEv.duration = data.duration;
              followingEv.rrule = tempDataRRULE;
              followingEv._start_date = null;
              followingEv.id = scheduler2.uid();
              scheduler2.addEvent(followingEv.start_date, followingEv.end_date, followingEv.text, followingEv.id, followingEv);
            }
            if (!is_new_event) {
              updateTextEvents(id2, data);
            }
            scheduler2.hideLightbox();
            return false;
          }
        }
      }
      if (!is_new_event) {
        updateTextEvents(id2, data);
      }
      if (tempEvent._ocr && tempEvent._beforeEventChangedFlag) {
        ev.start_date = tempEvent.start_date;
        ev.end_date = tempEvent.end_date;
        ev._start_date = tempEvent._start_date;
        ev._end_date = tempEvent._end_date;
        scheduler2.updateEvent(ev.id);
        return true;
      }
      this._select_id = null;
      removeTempDraggedEvent();
      return true;
    });
    scheduler2.attachEvent("onEventCreated", function(id2) {
      var ev = this.getEvent(id2);
      if (!isSeries(ev)) {
        clearRecurringProperties(ev);
      }
      return true;
    });
    scheduler2.attachEvent("onEventCancel", function(id2) {
      var ev = this.getEvent(id2);
      if (isSeries(ev)) {
        this._roll_back_dates(ev);
        this.render_view_data();
      }
      removeTempDraggedEvent();
    });
    scheduler2._roll_back_dates = function(ev) {
      if (ev.start_date) {
        ev.start_date = clearMilliseconds(ev.start_date);
      }
      if (ev.end_date) {
        ev.end_date = clearMilliseconds(ev.end_date);
      }
      if (ev._end_date) {
        if (!ev._shorten) {
          ev.duration = Math.round((ev.end_date.valueOf() - ev.start_date.valueOf()) / 1e3);
        }
        ev.end_date = ev._end_date;
      }
      if (ev._start_date) {
        ev.start_date.setMonth(0);
        ev.start_date.setDate(ev._start_date.getDate());
        ev.start_date.setMonth(ev._start_date.getMonth());
        ev.start_date.setFullYear(ev._start_date.getFullYear());
        if (this._isFollowing(ev.id)) {
          ev.start_date.setHours(ev._start_date.getHours());
          ev.start_date.setMinutes(ev._start_date.getMinutes());
          ev.start_date.setSeconds(ev._start_date.getSeconds());
        }
      }
      ev._thisAndFollowing = null;
      if (ev._shorten_end_date)
        ev._shorten_end_date = null;
      if (ev._removeFollowing)
        ev._removeFollowing = null;
      if (ev._firstOccurrence)
        ev._firstOccurrence = null;
      if (ev._modified)
        ev._modified = null;
    };
    scheduler2._is_virtual_event = function(id2) {
      return id2.toString().indexOf("#") != -1;
    };
    scheduler2._is_modified_occurrence = function(ev) {
      return ev.recurring_event_id && ev.recurring_event_id != "0";
    };
    scheduler2.showLightbox_rec = scheduler2.showLightbox;
    scheduler2.showLightbox = function(id2) {
      const locale = this.locale;
      let formSetting = scheduler2.config.lightbox_recurring;
      let ev = this.getEvent(id2);
      let pid = ev.recurring_event_id;
      let isVirtual = this._is_virtual_event(id2);
      if (isVirtual) {
        pid = id2.split("#")[0];
      }
      const showRequiredLightbox = function(id3, type) {
        const occurrence = scheduler2.getEvent(id3);
        const event2 = scheduler2.getEvent(pid);
        const view = scheduler2.getView();
        if (view && occurrence[view.y_property]) {
          event2[view.y_property] = occurrence[view.y_property];
        }
        if (view && occurrence[view.property]) {
          event2[view.property] = occurrence[view.property];
        }
        if (type === "Occurrence") {
          return scheduler2.showLightbox_rec(id3);
        }
        if (type === "Following") {
          if (scheduler2._isExceptionFirstOccurrence(occurrence)) {
            setPropsForFirstOccurrence(event2, occurrence);
            return scheduler2.showLightbox_rec(pid);
          }
          if (scheduler2._isFirstOccurrence(occurrence)) {
            setPropsForFirstOccurrence(event2, occurrence);
            return scheduler2.showLightbox_rec(pid);
          } else {
            event2._end_date = event2.end_date;
            const originalStart = occurrence.original_start || occurrence.start_date;
            event2._shorten_end_date = new Date(originalStart.valueOf() - 1e3);
            event2.end_date = new Date(occurrence.start_date.valueOf() + event2.duration * 1e3);
            event2._start_date = event2.start_date;
            event2.start_date = occurrence.start_date;
            event2._thisAndFollowing = occurrence.id;
            if (ev._beforeEventChangedFlag) {
              event2._beforeEventChangedFlag = ev._beforeEventChangedFlag;
              event2._shorten_end_date = new Date(originalStart.valueOf() - 1e3);
            }
            return scheduler2.showLightbox_rec(pid);
          }
        }
        if (type === "AllEvents") {
          if (scheduler2._isExceptionFirstOccurrence(occurrence)) {
            setPropsForFirstOccurrence(event2, occurrence);
            return scheduler2.showLightbox_rec(pid);
          }
          if (scheduler2._isFirstOccurrence(occurrence)) {
            setPropsForFirstOccurrence(event2, occurrence);
            return scheduler2.showLightbox_rec(pid);
          }
          const tempStart = new Date(event2.start_date);
          event2._end_date = event2.end_date;
          event2._start_date = tempStart;
          event2.start_date.setHours(occurrence.start_date.getHours());
          event2.start_date.setMinutes(occurrence.start_date.getMinutes());
          event2.start_date.setSeconds(occurrence.start_date.getSeconds());
          event2.end_date = new Date(event2.start_date.valueOf() + event2.duration * 1e3);
          event2._thisAndFollowing = null;
          return scheduler2.showLightbox_rec(pid);
        }
      };
      if ((pid || pid * 1 === 0) && isSeries(ev)) {
        return showRequiredLightbox(id2, "AllEvents");
      }
      if (!pid || pid === "0" || (!locale.labels.confirm_recurring || formSetting == "instance" || formSetting == "series" && !isVirtual)) {
        return this.showLightbox_rec(id2);
      }
      if (formSetting === "ask") {
        const locale2 = scheduler2.locale;
        showModalbox([{ value: "Occurrence", label: locale2.labels.button_edit_occurrence, checked: true, callback: () => showRequiredLightbox(id2, "Occurrence") }, { value: "Following", label: locale2.labels.button_edit_occurrence_and_following, callback: () => showRequiredLightbox(id2, "Following") }, { value: "AllEvents", label: locale2.labels.button_edit_series, callback: () => showRequiredLightbox(id2, "AllEvents") }]);
      }
    };
    function showModalbox(options, callback) {
      const locale = scheduler2.locale;
      const haveChecked = options.find((o) => o.checked);
      if (!haveChecked) {
        options[0].checked = true;
      }
      const callbacks = options.reduce((result, o) => {
        result[o.value] = o.callback;
        return result;
      }, {});
      scheduler2.modalbox({ text: `<div class="dhx_edit_recurrence_options">
				${options.map((option) => `<label class="dhx_styled_radio">
					<input type="radio" value="${option.value}" name="option" ${option.checked ? "checked" : ""}>
					${option.label}
				</label>`).join("")}
			</div>`, type: "recurring_mode", title: locale.labels.confirm_recurring, width: "auto", position: "middle", buttons: [{ label: locale.labels.message_ok, value: "ok", css: "rec_ok" }, { label: locale.labels.message_cancel, value: "cancel" }], callback: function(value, e) {
        if (callback) {
          callback(value, e);
        }
        if (value === "cancel") {
          return;
        }
        const box = e.target.closest(".scheduler_modal_box");
        const checked = box.querySelector("input[type='radio']:checked");
        let selectedOption;
        if (checked) {
          selectedOption = checked.value;
        }
        if (selectedOption) {
          callbacks[selectedOption]();
        }
      } });
    }
    scheduler2._showRequiredModalBox = function(id2, type) {
      let buttons;
      const locale = scheduler2.locale;
      let occurrence = scheduler2.getEvent(id2);
      let pid = occurrence.recurring_event_id;
      let isVirtual = scheduler2._is_virtual_event(occurrence.id);
      if (isVirtual) {
        pid = occurrence.id.split("#")[0];
      }
      let event2 = scheduler2.getEvent(pid);
      const view = scheduler2.getView();
      let tempEvent = scheduler2._lame_clone(event2);
      if (view && occurrence[view.y_property]) {
        tempEvent[view.y_property] = occurrence[view.y_property];
      }
      if (view && occurrence[view.property]) {
        tempEvent[view.property] = occurrence[view.property];
      }
      let tempStartDate;
      let tempEndDate;
      if (occurrence && occurrence._beforeEventChangedFlag) {
        tempStartDate = occurrence.start_date;
        tempEndDate = occurrence.end_date;
      }
      const handleOccurrence = function(occurrence2) {
        let tempEvent2 = { ...event2, ...scheduler2.getEvent("$dnd_recurring_placeholder") };
        if (tempEndDate && tempStartDate) {
          tempEvent2.start_date = tempStartDate;
          tempEvent2.end_date = tempEndDate;
          tempEvent2._beforeEventChangedFlag = occurrence2._beforeEventChangedFlag;
          tempEvent2._ocr = true;
        }
        if (!scheduler2.config.collision_limit || scheduler2.checkCollision(tempEvent2)) {
          for (const i in scheduler2._events) {
            let tev = scheduler2._events[i];
            if (i === "$dnd_recurring_placeholder") {
              continue;
            }
            if (tev.id == tempEvent2.id) {
              scheduler2._events[i] = { ...tempEvent2 };
              scheduler2.callEvent("onEventChanged", [scheduler2._events[i].id, scheduler2._events[i]]);
            }
          }
        }
      };
      const handleFollowing = function(occurrence2) {
        let initialOccurrence = scheduler2._lame_clone(occurrence2);
        if (tempEndDate && tempStartDate) {
          occurrence2._start_date = occurrence2.start_date;
          occurrence2.start_date = tempStartDate;
          occurrence2.end_date = tempEndDate;
        }
        if (scheduler2._isFirstOccurrence(initialOccurrence) || scheduler2._isExceptionFirstOccurrence(initialOccurrence)) {
          if (scheduler2._isExceptionFirstOccurrence(initialOccurrence)) {
            deleteExceptionFromStorage(initialOccurrence);
          }
          tempEvent._start_date = event2.start_date;
          tempEvent.start_date = occurrence2.start_date;
          tempEvent.duration = (+occurrence2.end_date - +occurrence2.start_date) / 1e3;
          tempEvent._beforeEventChangedFlag = occurrence2._beforeEventChangedFlag;
          if (tempEvent.rrule) {
            updateFollowingWithWEEKLY(tempEvent.id, tempEvent);
          }
          if (!scheduler2.config.collision_limit || scheduler2.checkCollision(tempEvent)) {
            for (const i in scheduler2._events) {
              let tev = scheduler2._events[i];
              if (tev.id == tempEvent.id) {
                scheduler2._events[i] = { ...tempEvent };
                scheduler2.callEvent("onEventChanged", [scheduler2._events[i].id, scheduler2._events[i]]);
              }
            }
          }
        } else {
          tempEvent._end_date = event2.end_date;
          const originalStart = occurrence2.original_start || scheduler2.date.date_part(new Date(occurrence2._start_date));
          tempEvent._shorten_end_date = new Date(originalStart.valueOf() - 1e3);
          tempEvent.end_date = occurrence2.end_date;
          tempEvent._start_date = event2.start_date;
          tempEvent.start_date = occurrence2.start_date;
          tempEvent._thisAndFollowing = occurrence2.id;
          if (tempEvent.rrule) {
            updateFollowingWithWEEKLY(tempEvent.id, tempEvent);
          }
          let tempEnd = tempEvent.end_date;
          tempEvent.end_date = tempEvent._end_date;
          if (!scheduler2.config.collision_limit || scheduler2.checkCollision(tempEvent)) {
            tempEvent.end_date = tempEnd;
            for (const i in scheduler2._events) {
              let tev = scheduler2._events[i];
              if (tev.id == tempEvent.id) {
                scheduler2._events[i] = { ...tempEvent };
                scheduler2.callEvent("onEventSave", [scheduler2._events[i].id, scheduler2._events[i], scheduler2._new_event]);
                scheduler2.callEvent("onEventChanged", [scheduler2._events[i].id, scheduler2._events[i]]);
              }
            }
          }
        }
      };
      const handleAllEvents = function(occurrence2) {
        let initialOccurrence = scheduler2._lame_clone(occurrence2);
        if (scheduler2._isExceptionFirstOccurrence(initialOccurrence)) {
          deleteExceptionFromStorage(initialOccurrence);
        }
        if (tempEndDate && tempStartDate) {
          tempEvent.start_date.setHours(tempStartDate.getHours());
          tempEvent.start_date.setMinutes(tempStartDate.getMinutes());
          tempEvent.start_date.setSeconds(tempStartDate.getSeconds());
          tempEvent.duration = (+tempEndDate - +tempStartDate) / 1e3;
        }
        tempEvent._beforeEventChangedFlag = occurrence2._beforeEventChangedFlag;
        tempEvent._thisAndFollowing = null;
        if (!scheduler2.config.collision_limit || scheduler2.checkCollision(tempEvent)) {
          for (const i in scheduler2._events) {
            let tev = scheduler2._events[i];
            if (tev.id == tempEvent.id) {
              scheduler2._events[i] = { ...tempEvent };
              scheduler2.callEvent("onEventChanged", [scheduler2._events[i].id, scheduler2._events[i]]);
            }
          }
        }
      };
      const btnAll = { value: "AllEvents", label: locale.labels.button_edit_series, callback: () => handleAllEvents(occurrence) };
      const btnFollowing = { value: "Following", label: locale.labels.button_edit_occurrence_and_following, callback: () => handleFollowing(occurrence) };
      const btnOccurrence = { value: "Occurrence", label: locale.labels.button_edit_occurrence, callback: () => handleOccurrence(occurrence), checked: true };
      if (type === "ask") {
        buttons = [btnOccurrence, btnFollowing, btnAll];
      } else {
        buttons = [btnOccurrence, btnFollowing];
      }
      showModalbox(buttons, (result) => {
        if (result === "cancel") {
          removeTempDraggedEvent();
        }
      });
    };
    function groupExceptions() {
      const exceptions = {};
      for (const i in scheduler2._events) {
        const ev = scheduler2._events[i];
        if (ev.recurring_event_id && ev.original_start) {
          if (!exceptions[ev.recurring_event_id]) {
            exceptions[ev.recurring_event_id] = {};
          }
          exceptions[ev.recurring_event_id][ev.original_start.valueOf()] = ev;
        }
      }
      return exceptions;
    }
    function removeDraggedEventFromVisibleEvents(array) {
      const result = {};
      array.forEach((item) => {
        const existingItem = result[item.id];
        if (!existingItem || (existingItem._beforeEventChangedFlag || item._beforeEventChangedFlag)) {
          result[item.id] = item;
        }
      });
      return Object.values(result);
    }
    scheduler2.get_visible_events_rec = scheduler2.get_visible_events;
    scheduler2.get_visible_events = function(only_timed) {
      for (var i = 0; i < this._rec_temp.length; i++)
        delete this._events[this._rec_temp[i].id];
      this._rec_temp = [];
      const exceptions = groupExceptions();
      var stack = this.get_visible_events_rec(only_timed);
      var out = [];
      for (var i = 0; i < stack.length; i++) {
        if (stack[i].deleted || stack[i].recurring_event_id) {
          continue;
        }
        if (isSeries(stack[i])) {
          this.repeat_date(stack[i], out, void 0, void 0, void 0, void 0, exceptions);
        } else {
          out.push(stack[i]);
        }
      }
      let result = removeDraggedEventFromVisibleEvents(out);
      return result;
    };
    (function() {
      var old = scheduler2.isOneDayEvent;
      scheduler2.isOneDayEvent = function(ev) {
        if (isSeries(ev))
          return true;
        return old.call(this, ev);
      };
      var old_update_event = scheduler2.updateEvent;
      scheduler2.updateEvent = function(id2) {
        var ev = scheduler2.getEvent(id2);
        if (ev && isSeries(ev) && !this._is_virtual_event(id2)) {
          scheduler2.update_view();
        } else {
          old_update_event.call(this, id2);
        }
      };
    })();
    const toIcalString = scheduler2.date.date_to_str("%Y%m%dT%H%i%s");
    scheduler2.repeat_date = function(ev, stack, non_render, from, to, maxCount, exceptions) {
      if (!ev.rrule) {
        return;
      }
      let seriesExceptions = exceptions ? exceptions[ev.id] : groupExceptions()[ev.id];
      if (!seriesExceptions) {
        seriesExceptions = {};
      }
      from = toUTCDate(from || new Date(scheduler2._min_date.valueOf() - 7 * 24 * 60 * 60 * 1e3));
      to = toUTCDate(to || new Date(scheduler2._max_date.valueOf() - 1e3));
      const utcStart = toUTCDate(ev.start_date);
      let parsedRRule;
      if (maxCount) {
        parsedRRule = rrulestr(`RRULE:${ev.rrule};UNTIL=${toIcalString(ev.end_date)};COUNT=${maxCount}`, { dtstart: utcStart });
      } else {
        parsedRRule = rrulestr(`RRULE:${ev.rrule};UNTIL=${toIcalString(ev.end_date)}`, { dtstart: utcStart });
      }
      const repeatedDates = parsedRRule.between(from, to, true).map((date) => {
        const adjustedDate = setUTCPartsToDate(date);
        adjustedDate.setHours(ev.start_date.getHours());
        adjustedDate.setMinutes(ev.start_date.getMinutes());
        adjustedDate.setSeconds(ev.start_date.getSeconds());
        return adjustedDate;
      });
      let visibleCount = 0;
      const eventDuration = ev.duration;
      for (let i = 0; i < repeatedDates.length; i++) {
        if (maxCount && visibleCount >= maxCount) {
          break;
        }
        const date = repeatedDates[i];
        let exception = seriesExceptions[date.valueOf()];
        if (exception) {
          if (exception.deleted || exception.end_date.valueOf() < scheduler2._min_date.valueOf() || !scheduler2.filter_event(exception.id, exception)) {
            continue;
          } else {
            visibleCount++;
            stack.push(exception);
          }
        } else {
          const copy = scheduler2._copy_event(ev);
          copy.text = ev.text;
          copy.start_date = date;
          copy.id = ev.id + "#" + Math.ceil(date.valueOf());
          copy.end_date = new Date(date.valueOf() + eventDuration * 1e3);
          if (copy.end_date.valueOf() < scheduler2._min_date.valueOf()) {
            continue;
          }
          copy.end_date = scheduler2._fix_daylight_saving_date(copy.start_date, copy.end_date, ev, date, copy.end_date);
          copy._timed = scheduler2.isOneDayEvent(copy);
          if (!copy._timed && !scheduler2._table_view && !scheduler2.config.multi_day)
            continue;
          stack.push(copy);
          if (!non_render) {
            scheduler2._events[copy.id] = copy;
            scheduler2._rec_temp.push(copy);
          }
          visibleCount++;
        }
      }
      if (seriesExceptions && repeatedDates.length == 0) {
        for (let a in seriesExceptions) {
          let exception = seriesExceptions[a];
          if (exception) {
            if (exception.deleted || exception.end_date.valueOf() < scheduler2._min_date.valueOf() || !scheduler2.filter_event(exception.id, exception)) {
              continue;
            } else if (from && to && exception.start_date < to && exception.end_date > from) {
              stack.push(exception);
            }
          }
        }
      }
    };
    scheduler2._fix_daylight_saving_date = function(start_date, end_date, ev, counter, default_date) {
      var shift = start_date.getTimezoneOffset() - end_date.getTimezoneOffset();
      if (shift) {
        if (shift > 0) {
          return new Date(counter.valueOf() + ev.duration * 1e3 - shift * 60 * 1e3);
        } else {
          return new Date(end_date.valueOf() - shift * 60 * 1e3);
        }
      }
      return new Date(default_date.valueOf());
    };
    scheduler2.getRecDates = function(id2, max) {
      var ev = typeof id2 == "object" ? id2 : scheduler2.getEvent(id2);
      var recurrings = [];
      max = max || 100;
      if (!isSeries(ev)) {
        return [{ start_date: ev.start_date, end_date: ev.end_date }];
      }
      if (ev.deleted) {
        return [];
      }
      scheduler2.repeat_date(ev, recurrings, true, ev.start_date, ev.end_date, max);
      var result = [];
      for (var i = 0; i < recurrings.length; i++) {
        if (!recurrings[i].deleted) {
          result.push({ start_date: recurrings[i].start_date, end_date: recurrings[i].end_date });
        }
      }
      return result;
    };
    scheduler2.getEvents = function(from, to) {
      var result = [];
      const exceptions = groupExceptions();
      for (var a in this._events) {
        var ev = this._events[a];
        if (ev.recurring_event_id) {
          continue;
        }
        if (from && to && ev.start_date < to && ev.end_date > from) {
          if (isSeries(ev)) {
            var sev = [];
            this.repeat_date(ev, sev, true, from, to, void 0, exceptions);
            sev.forEach(function(occurrence) {
              if (occurrence.start_date < to && occurrence.end_date > from) {
                result.push(occurrence);
              }
            });
          } else if (!this._is_virtual_event(ev.id)) {
            result.push(ev);
          }
        } else if (!from && !to && !this._is_virtual_event(ev.id)) {
          result.push(ev);
        }
      }
      return result;
    };
    scheduler2._copy_dummy = function(ev) {
      var start_date = new Date(this.start_date);
      var end_date = new Date(this.end_date);
      this.start_date = start_date;
      this.end_date = end_date;
      this.duration = this.rrule = null;
    };
    scheduler2.config.include_end_by = false;
    scheduler2.config.lightbox_recurring = "ask";
    scheduler2.config.recurring_workdays = [RRule.MO.weekday, RRule.TU.weekday, RRule.WE.weekday, RRule.TH.weekday, RRule.FR.weekday];
    scheduler2.config.repeat_date = "%m.%d.%Y";
    scheduler2.config.lightbox.sections = [{ name: "description", map_to: "text", type: "textarea", focus: true }, { name: "recurring", type: "recurring", map_to: "rrule" }, { name: "time", height: 72, type: "time", map_to: "auto" }];
    scheduler2.attachEvent("onClearAll", function() {
      scheduler2._rec_markers = {};
      scheduler2._rec_markers_pull = {};
      scheduler2._rec_temp = [];
    });
    function getTopLevelOption(rruleObj, untilDate) {
      const options = rruleObj.options;
      const until = options.until || untilDate;
      const hasEndCondition = options.count || until && until.getFullYear() !== 9999;
      if (hasEndCondition) {
        return "CUSTOM";
      }
      if (options.freq === RRule.DAILY && options.interval === 1 && !options.byweekday) {
        return "DAILY";
      } else if (options.freq === RRule.WEEKLY && options.interval === 1 && !options.byweekday) {
        return "WEEKLY";
      } else if (options.freq === RRule.MONTHLY && options.interval === 1 && !options.bysetpos) {
        return "MONTHLY";
      } else if (options.freq === RRule.YEARLY && options.interval === 1 && !options.bysetpos) {
        return "YEARLY";
      } else if (options.freq === RRule.DAILY && options.byweekday && options.byweekday.length === scheduler2.config.recurring_workdays.length && options.byweekday.includes(RRule.MO) && options.byweekday.includes(RRule.TU) && options.byweekday.includes(RRule.WE) && options.byweekday.includes(RRule.TH) && options.byweekday.includes(RRule.FR)) {
        return "WORKDAYS";
      } else {
        return "CUSTOM";
      }
    }
    function getWeekdayOfMonth(date) {
      const dayOfWeek = date.getDay();
      const dayOfMonth = date.getDate();
      const dayNumber = Math.ceil(dayOfMonth / 7);
      return { dayOfWeek, dayNumber };
    }
    const jsDaysToRRULEDays = { 0: "SU", 1: "MO", 2: "TU", 3: "WE", 4: "TH", 5: "FR", 6: "SA" };
    const RruleDayNumsToJs = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 0 };
    function fillIntervalInput(node, rule) {
      const intervalInput = node.querySelector("[name='repeat_interval_value']");
      if (intervalInput) {
        intervalInput.value = (rule ? rule.interval : 1) || 1;
      }
    }
    function fillCustomDaily(node, rule) {
      fillIntervalInput(node, rule);
    }
    function fillCustomWeekly(node, rule, event2) {
      fillIntervalInput(node, rule);
      const dayCheckboxes = node.querySelectorAll(`.dhx_form_repeat_custom_week input`);
      dayCheckboxes.forEach((ch) => ch.checked = false);
      if (rule && rule.byweekday) {
        rule.byweekday.forEach((day) => {
          const dayNum = RruleDayNumsToJs[day.weekday];
          const dayLabel = jsDaysToRRULEDays[dayNum];
          const checkbox = node.querySelector(`.dhx_form_repeat_custom_week input[value="${dayLabel}"]`);
          if (checkbox) {
            checkbox.checked = true;
          }
        });
      } else {
        const dayLabel = jsDaysToRRULEDays[event2.start_date.getDay()];
        const checkbox = node.querySelector(`.dhx_form_repeat_custom_week input[value="${dayLabel}"]`);
        if (checkbox) {
          checkbox.checked = true;
        }
      }
    }
    function fillCustomMonthly(node, rule, event2) {
      fillIntervalInput(node, rule);
      const dateOfMonth = node.querySelector(`.dhx_form_repeat_custom_month [value="month_date"]`);
      const nthWeekDayOfMonth = node.querySelector(`.dhx_form_repeat_custom_month [value="month_nth_weekday"]`);
      if (dateOfMonth && nthWeekDayOfMonth) {
        dateOfMonth.innerText = scheduler2.templates.repeat_monthly_date(event2.start_date, event2);
        nthWeekDayOfMonth.innerText = scheduler2.templates.repeat_monthly_weekday(event2.start_date, event2);
        const option = node.querySelector(`[name="dhx_custom_month_option"]`);
        if (option) {
          option.value = rule && rule.bysetpos && !(rule.byweekday && rule.byweekday.length) ? "month_date" : "month_nth_weekday";
        }
      }
    }
    function formatDayNumber(date) {
      switch (date) {
        case 1:
        case 31:
          return `${date}st`;
        case 2:
          return `${date}nd`;
        case 3:
          return `${date}rd`;
        default:
          return `${date}th`;
      }
    }
    scheduler2.templates.repeat_monthly_date = function(startDate, event2) {
      const date = startDate.getDate();
      return `Every ${formatDayNumber(date)}`;
    };
    scheduler2.templates.repeat_monthly_weekday = function(startDate, event2) {
      const nthDayOfMonth = getWeekdayOfMonth(startDate);
      return `Every ${formatDayNumber(nthDayOfMonth.dayNumber)} ${scheduler2.locale.date.day_full[nthDayOfMonth.dayOfWeek]}`;
    };
    scheduler2.templates.repeat_yearly_month_date = function(startDate, event2) {
      const date = startDate.getDate();
      const monthLabel = scheduler2.locale.date.month_full[startDate.getMonth()];
      return `Every ${formatDayNumber(date)} day of ${monthLabel}`;
    };
    scheduler2.templates.repeat_yearly_month_weekday = function(startDate, event2) {
      const nthDayOfMonth = getWeekdayOfMonth(startDate);
      const monthLabel = scheduler2.locale.date.month_full[startDate.getMonth()];
      return `Every ${formatDayNumber(nthDayOfMonth.dayNumber)} ${scheduler2.locale.date.day_full[nthDayOfMonth.dayOfWeek]} of ${monthLabel}`;
    };
    function fillCustomYearly(node, rule, event2) {
      const dateOfYear = node.querySelector(`.dhx_form_repeat_custom_year [value="month_date"]`);
      const nthWeekDayOfYear = node.querySelector(`.dhx_form_repeat_custom_year [value="month_nth_weekday"]`);
      if (dateOfYear && nthWeekDayOfYear) {
        dateOfYear.innerText = scheduler2.templates.repeat_yearly_month_date(event2.start_date, event2);
        nthWeekDayOfYear.innerText = scheduler2.templates.repeat_yearly_month_weekday(event2.start_date, event2);
        if (!rule || rule.bysetpos && !(rule.byweekday && rule.byweekday.length)) {
          node.querySelector(`[name="dhx_custom_year_option"]`).value = "month_date";
        } else {
          node.querySelector(`[name="dhx_custom_year_option"]`).value = "month_nth_weekday";
        }
      }
    }
    function fillEndRule(node, rule, event2) {
      const countInput = node.querySelector(`.dhx_form_repeat_ends_extra [name="dhx_form_repeat_ends_after"]`);
      const ondateInput = node.querySelector(`.dhx_form_repeat_ends_extra [name="dhx_form_repeat_ends_ondate"]`);
      const endOptionSelect = node.querySelector(`[name='dhx_custom_repeat_ends']`);
      if (countInput && ondateInput && endOptionSelect) {
        countInput.value = 1;
        let formatter = scheduler2.date.date_to_str("%Y-%m-%d");
        if (!scheduler2.config.repeat_date_of_end) {
          scheduler2.config.repeat_date_of_end = formatter(scheduler2.date.add(scheduler2._currentDate(), 30, "day"));
        }
        ondateInput.value = scheduler2.config.repeat_date_of_end;
        if (rule && rule.count) {
          endOptionSelect.value = "AFTER";
          countInput.value = rule.count;
        } else if (event2._end_date && event2._end_date.getFullYear() !== 9999) {
          endOptionSelect.value = "ON";
          ondateInput.value = formatter(event2._end_date);
        } else {
          endOptionSelect.value = "NEVER";
        }
        endOptionSelect.dispatchEvent(new Event("change"));
      }
    }
    const getRecValue = { MONTHLY: function(dates) {
      const rrule = { freq: RRule.MONTHLY, interval: 1, bymonthday: dates.start.getDate() };
      const until = new Date(9999, 1, 1);
      return { rrule, until };
    }, WEEKLY: function(dates) {
      let day = dates.start.getDay() - 1;
      if (day == -1)
        day = 6;
      const rrule = { freq: RRule.WEEKLY, interval: 1, byweekday: [day] };
      const until = new Date(9999, 1, 1);
      return { rrule, until };
    }, DAILY: function(dates) {
      const rrule = { freq: RRule.DAILY, interval: 1 };
      const until = new Date(9999, 1, 1);
      return { rrule, until };
    }, YEARLY: function(dates) {
      const rrule = { freq: RRule.YEARLY, bymonth: dates.start.getMonth() + 1, interval: 1, bymonthday: dates.start.getDate() };
      const until = new Date(9999, 1, 1);
      return { rrule, until };
    }, WORKDAYS: function(dates) {
      const rrule = { freq: RRule.WEEKLY, interval: 1, byweekday: scheduler2.config.recurring_workdays };
      const until = new Date(9999, 1, 1);
      return { rrule, until };
    }, CUSTOM: function(dates, node) {
      const rrule = {};
      const freq = node.querySelector(`[name="repeat_interval_unit"]`).value;
      const interval = Math.max(1, node.querySelector(`[name="repeat_interval_value"]`).value);
      const monthRepeat = node.querySelector(`[name="dhx_custom_month_option"]`) ? node.querySelector(`[name="dhx_custom_month_option"]`).value : null;
      const yearRepeat = node.querySelector(`[name="dhx_custom_year_option"]`) ? node.querySelector(`[name="dhx_custom_year_option"]`).value : null;
      rrule.interval = interval;
      let days;
      let day;
      switch (freq) {
        case "DAILY":
          rrule.freq = RRule.DAILY;
          break;
        case "WEEKLY":
          rrule.freq = RRule.WEEKLY;
          days = [];
          node.querySelectorAll(`.dhx_form_repeat_custom_week [name="week_day"]`).forEach((ch) => {
            if (ch.checked) {
              days.push(ch.value);
            }
          });
          rrule.byweekday = days.map((day2) => {
            switch (day2) {
              case "MO":
                return RRule.MO.weekday;
              case "TU":
                return RRule.TU.weekday;
              case "WE":
                return RRule.WE.weekday;
              case "TH":
                return RRule.TH.weekday;
              case "FR":
                return RRule.FR.weekday;
              case "SA":
                return RRule.SA.weekday;
              case "SU":
                return RRule.SU.weekday;
            }
          });
          break;
        case "MONTHLY":
          rrule.freq = RRule.MONTHLY;
          if (monthRepeat === "month_date") {
            rrule.bymonthday = dates.start.getDate();
          } else {
            day = dates.start.getDay() - 1;
            if (day == -1)
              day = 6;
            rrule.byweekday = [day];
            rrule.bysetpos = getWeekdayOfMonth(dates.start).dayNumber;
          }
          break;
        case "YEARLY":
          rrule.freq = RRule.YEARLY;
          rrule.bymonth = dates.start.getMonth() + 1;
          if (yearRepeat == "month_date") {
            rrule.bymonthday = dates.start.getDate();
          } else {
            day = dates.start.getDay() - 1;
            if (day == -1)
              day = 6;
            rrule.byweekday = [day];
            rrule.bysetpos = getWeekdayOfMonth(dates.start).dayNumber;
          }
          break;
      }
      const formatFunc = scheduler2.date.str_to_date("%Y-%m-%d");
      let until = new Date(9999, 1, 1);
      const endRule = node.querySelector(`[name="dhx_custom_repeat_ends"]`);
      if (endRule && endRule.value === "ON") {
        until = formatFunc(node.querySelector(`[name="dhx_form_repeat_ends_ondate"]`).value);
        rrule.until = new Date(until);
      } else if (endRule && endRule.value === "AFTER") {
        rrule.count = Math.max(1, node.querySelector(`[name="dhx_form_repeat_ends_after"]`).value);
      }
      return { rrule, until };
    }, NEVER: function() {
    } };
    function fillInDefaults(node, rule, event2) {
      fillCustomDaily(node, rule);
      fillCustomWeekly(node, rule, event2);
      fillCustomMonthly(node, rule, event2);
      fillCustomYearly(node, rule, event2);
      fillEndRule(node, rule, event2);
    }
    scheduler2.form_blocks["recurring"] = { _get_node: function(node) {
      if (typeof node == "string") {
        let element = scheduler2._lightbox.querySelector(`#${node}`);
        if (!element) {
          element = document.getElementById(node);
        }
        node = element;
      }
      if (node.style.display == "none")
        node.style.display = "";
      return node;
    }, _outer_html: function(node) {
      return node.outerHTML || getOuterHTML(node);
      function getOuterHTML(n) {
        var div = document.createElement("div"), h;
        div.appendChild(n.cloneNode(true));
        h = div.innerHTML;
        div = null;
        return h;
      }
    }, render: function(sns) {
      if (sns.form) {
        let rec = scheduler2.form_blocks["recurring"];
        let form = rec._get_node(sns.form);
        let html = rec._outer_html(form);
        form.style.display = "none";
        return html;
      }
      let loc = scheduler2.locale.labels;
      return `<div class="dhx_form_rrule">
		<div class="dhx_form_repeat_pattern">
			<select>
				<option value="NEVER">${loc.repeat_never}</option>
				<option value="DAILY">${loc.repeat_daily}</option>
				<option value="WEEKLY">${loc.repeat_weekly}</option>
				<option value="MONTHLY">${loc.repeat_monthly}</option>
				<option value="YEARLY">${loc.repeat_yearly}</option>
				<option value="WORKDAYS">${loc.repeat_workdays}</option>
				<option value="CUSTOM">${loc.repeat_custom}</option>
			</select>
		</div>
		<div class="dhx_form_repeat_custom dhx_hidden">
			<div class="dhx_form_repeat_custom_interval">
				<input name="repeat_interval_value" type="number" min="1">
				<select name="repeat_interval_unit">
					<option value="DAILY">${loc.repeat_freq_day}</option>
					<option value="WEEKLY">${loc.repeat_freq_week}</option>
					<option value="MONTHLY">${loc.repeat_freq_month}</option>
					<option value="YEARLY">${loc.repeat_freq_year}</option>
				</select>
			</div>

			<div class="dhx_form_repeat_custom_additional">
				<div class="dhx_form_repeat_custom_week dhx_hidden">
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="MO" />${loc.day_for_recurring[1]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="TU" />${loc.day_for_recurring[2]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="WE" />${loc.day_for_recurring[3]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="TH" />${loc.day_for_recurring[4]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="FR" />${loc.day_for_recurring[5]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="SA" />${loc.day_for_recurring[6]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="SU" />${loc.day_for_recurring[0]}</label>
				</div>

				<div class="dhx_form_repeat_custom_month dhx_hidden">
					<select name="dhx_custom_month_option">
						<option value="month_date"></option>
						<option value="month_nth_weekday"></option>
					</select>
				</div>

				<div class="dhx_form_repeat_custom_year dhx_hidden">
					<select name="dhx_custom_year_option">
						<option value="month_date"></option>
						<option value="month_nth_weekday"></option>
					</select>
				</div>
			</div>

			<div class="dhx_form_repeat_ends">
				<div>${loc.repeat_ends}</div>
				<div class="dhx_form_repeat_ends_options">
					<select name="dhx_custom_repeat_ends">
						<option value="NEVER">${loc.repeat_never}</option>
						<option value="AFTER">${loc.repeat_radio_end2}</option>
						<option value="ON">${loc.repeat_on_date}</option>
					</select>
					<div class="dhx_form_repeat_ends_extra">
						<div class="dhx_form_repeat_ends_after dhx_hidden">
							<label><input type="number" min="1" name="dhx_form_repeat_ends_after">${loc.repeat_text_occurrences_count}</label>
						</div>
						<div class="dhx_form_repeat_ends_on dhx_hidden">
							<input type="date" name="dhx_form_repeat_ends_ondate">
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>`;
    }, _init_set_value: function(node, value, event2) {
      scheduler2.form_blocks["recurring"]._ds = { start: event2.start_date, end: event2.end_date };
      function hide(node2) {
        if (node2)
          node2.classList.add("dhx_hidden");
      }
      function show(node2) {
        if (node2)
          node2.classList.remove("dhx_hidden");
      }
      function onRepeatOptionChange(value2) {
        const repeat2 = node.querySelector(".dhx_form_repeat_custom");
        if (value2 === "CUSTOM") {
          show(repeat2);
        } else {
          hide(repeat2);
        }
      }
      function onCustomRepeatIntervalChange(value2) {
        const nodes = { weekly: node.querySelector(".dhx_form_repeat_custom_week"), monthly: node.querySelector(".dhx_form_repeat_custom_month"), yearly: node.querySelector(".dhx_form_repeat_custom_year") };
        switch (value2) {
          case "DAILY":
            hide(nodes.weekly);
            hide(nodes.monthly);
            hide(nodes.yearly);
            break;
          case "WEEKLY":
            show(nodes.weekly);
            hide(nodes.monthly);
            hide(nodes.yearly);
            break;
          case "MONTHLY":
            hide(nodes.weekly);
            show(nodes.monthly);
            hide(nodes.yearly);
            break;
          case "YEARLY":
            hide(nodes.weekly);
            hide(nodes.monthly);
            show(nodes.yearly);
            break;
        }
      }
      function onCustomRepeatEndRule(value2) {
        const nodes = { after: node.querySelector(".dhx_form_repeat_ends_extra .dhx_form_repeat_ends_after"), on: node.querySelector(".dhx_form_repeat_ends_extra .dhx_form_repeat_ends_on") };
        switch (value2) {
          case "NEVER":
            hide(nodes.after);
            hide(nodes.on);
            break;
          case "AFTER":
            show(nodes.after);
            hide(nodes.on);
            break;
          case "ON":
            hide(nodes.after);
            show(nodes.on);
            break;
        }
      }
      const repeatSelect = node.querySelector(".dhx_form_repeat_pattern select");
      if (repeatSelect) {
        repeatSelect.addEventListener("change", function() {
          onRepeatOptionChange(this.value);
        });
      }
      const customRepeatUnitInput = node.querySelector(".dhx_form_repeat_custom_interval [name='repeat_interval_unit']");
      if (customRepeatUnitInput) {
        customRepeatUnitInput.addEventListener("change", function() {
          onCustomRepeatIntervalChange(this.value);
        });
      }
      const customRepeatEndInput = node.querySelector(".dhx_form_repeat_ends [name='dhx_custom_repeat_ends']");
      if (customRepeatEndInput) {
        customRepeatEndInput.addEventListener("change", function() {
          onCustomRepeatEndRule(this.value);
        });
      }
      scheduler2._lightbox._rec_init_done = true;
    }, button_click: function() {
    }, set_value: function(node, value, ev) {
      let rf = scheduler2.form_blocks["recurring"];
      if (!scheduler2._lightbox._rec_init_done)
        rf._init_set_value(node, value, ev);
      node.open = !ev.rrule;
      node.blocked = this._is_modified_occurrence(ev);
      let ds = rf._ds;
      ds.start = ev.start_date;
      ds.end = ev._end_date;
      if (ev.rrule) {
        const rruleset = rrulestr(ev.rrule);
        fillInDefaults(node, rruleset.origOptions, ev);
        const topOption = getTopLevelOption(rruleset, ev._end_date);
        node.querySelector(".dhx_form_repeat_pattern select").value = topOption;
        if (topOption === "CUSTOM") {
          let customFreq;
          switch (rruleset.origOptions.freq) {
            case RRule.DAILY:
              customFreq = "DAILY";
              break;
            case RRule.WEEKLY:
              customFreq = "WEEKLY";
              break;
            case RRule.MONTHLY:
              customFreq = "MONTHLY";
              break;
            case RRule.YEARLY:
              customFreq = "YEARLY";
              break;
          }
          if (customFreq) {
            node.querySelector(`[name="repeat_interval_unit"]`).value = customFreq;
            node.querySelector(`[name="repeat_interval_unit"]`).dispatchEvent(new Event("change"));
          }
        }
      } else {
        fillInDefaults(node, null, ev);
        const repeatSelect2 = node.querySelector(".dhx_form_repeat_pattern select");
        if (repeatSelect2) {
          repeatSelect2.value = "NEVER";
        }
      }
      const repeatSelect = node.querySelector(".dhx_form_repeat_pattern select");
      if (repeatSelect) {
        repeatSelect.dispatchEvent(new Event("change"));
      }
    }, get_value: function(node, ev) {
      const repeatSelect = node.querySelector(".dhx_form_repeat_pattern select");
      if (!node.blocked && (!repeatSelect || repeatSelect.value !== "NEVER")) {
        let ds = scheduler2.form_blocks["recurring"]._ds;
        let actual_dates = {};
        let timeControl = getTimeSection();
        timeControl.getValue(actual_dates);
        ds.start = actual_dates.start_date;
        const pattern = repeatSelect ? repeatSelect.value : "CUSTOM";
        const recurrence = getRecValue[pattern](ds, node);
        ev.rrule = new RRule(recurrence.rrule).toString().replace("RRULE:", "");
        ds.end = recurrence.until;
        ev.duration = Math.floor((actual_dates.end_date - actual_dates.start_date) / 1e3);
        if (ds._start) {
          ev.start_date = new Date(ds.start);
          ev._start_date = new Date(ds.start);
          ds._start = false;
        } else
          ev._start_date = null;
        ev._end_date = ds.end;
      } else {
        ev.rrule = ev.rrule = "";
        ev._end_date = ev.end_date;
      }
      return ev.rrule;
    }, focus: function(node) {
    } };
    function getTimeSection() {
      let timeControl = scheduler2.formSection("time");
      if (!timeControl) {
        timeControl = getFirstSectionOfType("time");
      }
      if (!timeControl) {
        timeControl = getFirstSectionOfType("calendar_time");
      }
      if (!timeControl) {
        throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", 'In the latter case, make sure the control is named "time":', "", "scheduler.config.lightbox.sections = [", '{name:"time", height:72, type:"YOU CONTROL", map_to:"auto" }];'].join("\n"));
      }
      return timeControl;
    }
    function getFirstSectionOfType(type) {
      for (let i = 0; i < scheduler2.config.lightbox.sections.length; i++) {
        let section = scheduler2.config.lightbox.sections[i];
        if (section.type === type) {
          return scheduler2.formSection(section.name);
        }
      }
      return null;
    }
  }
  function recurring_legacy(scheduler2) {
    scheduler2.config.occurrence_timestamp_in_utc = false;
    scheduler2.config.recurring_workdays = [1, 2, 3, 4, 5];
    scheduler2.form_blocks["recurring"] = { _get_node: function(node) {
      if (typeof node == "string") {
        let element = scheduler2._lightbox.querySelector(`#${node}`);
        if (!element) {
          element = document.getElementById(node);
        }
        node = element;
      }
      if (node.style.display == "none")
        node.style.display = "";
      return node;
    }, _outer_html: function(node) {
      return node.outerHTML || getOuterHTML(node);
      function getOuterHTML(n) {
        var div = document.createElement("div"), h;
        div.appendChild(n.cloneNode(true));
        h = div.innerHTML;
        div = null;
        return h;
      }
    }, render: function(sns) {
      if (sns.form) {
        var rec = scheduler2.form_blocks["recurring"];
        var form = rec._get_node(sns.form);
        var html = rec._outer_html(form);
        form.style.display = "none";
        return html;
      }
      var loc = scheduler2.locale.labels;
      return '<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />' + loc.repeat_radio_day + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>' + loc.repeat_radio_week + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />' + loc.repeat_radio_month + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />' + loc.repeat_radio_year + '</label></div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>' + loc.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />' + loc.repeat_text_day_count + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>' + loc.repeat_radio_day_type2 + '</label></div> </div> <div style="display:none;" id="dhx_repeat_week"><div><label>' + loc.repeat_week + '<input class="dhx_repeat_text" type="text" name="week_count" value="1" /></label><span>' + loc.repeat_text_week_count + '</span></div>  <table class="dhx_repeat_days"> <tr> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />' + loc.day_for_recurring[1] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />' + loc.day_for_recurring[4] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />' + loc.day_for_recurring[2] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />' + loc.day_for_recurring[5] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />' + loc.day_for_recurring[3] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />' + loc.day_for_recurring[6] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />' + loc.day_for_recurring[0] + '</label></div> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>' + loc.repeat_radio_month_type + '</label><label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />' + loc.repeat_text_month_day + '</label><label><input class="dhx_repeat_text" type="text" name="month_count" value="1" />' + loc.repeat_text_month_count + '</label></div> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>' + loc.repeat_radio_month_start + '</label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><label><select name="month_day2">	<option value="1" selected >' + scheduler2.locale.date.day_full[1] + '<option value="2">' + scheduler2.locale.date.day_full[2] + '<option value="3">' + scheduler2.locale.date.day_full[3] + '<option value="4">' + scheduler2.locale.date.day_full[4] + '<option value="5">' + scheduler2.locale.date.day_full[5] + '<option value="6">' + scheduler2.locale.date.day_full[6] + '<option value="0">' + scheduler2.locale.date.day_full[0] + "</select>" + loc.repeat_text_month_count2_before + '</label><label><input class="dhx_repeat_text" type="text" name="month_count2" value="1" />' + loc.repeat_text_month_count2_after + '</label></div> </div> <div style="display:none;" id="dhx_repeat_year"> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>' + loc.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />' + loc.repeat_text_year_day + '</label><label><select name="year_month"><option value="0" selected >' + loc.month_for_recurring[0] + '<option value="1">' + loc.month_for_recurring[1] + '<option value="2">' + loc.month_for_recurring[2] + '<option value="3">' + loc.month_for_recurring[3] + '<option value="4">' + loc.month_for_recurring[4] + '<option value="5">' + loc.month_for_recurring[5] + '<option value="6">' + loc.month_for_recurring[6] + '<option value="7">' + loc.month_for_recurring[7] + '<option value="8">' + loc.month_for_recurring[8] + '<option value="9">' + loc.month_for_recurring[9] + '<option value="10">' + loc.month_for_recurring[10] + '<option value="11">' + loc.month_for_recurring[11] + "</select>" + loc.select_year_month + '</label></div> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>' + loc.repeat_year_label + '</label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >' + scheduler2.locale.date.day_full[1] + '<option value="2">' + scheduler2.locale.date.day_full[2] + '<option value="3">' + scheduler2.locale.date.day_full[3] + '<option value="4">' + scheduler2.locale.date.day_full[4] + '<option value="5">' + scheduler2.locale.date.day_full[5] + '<option value="6">' + scheduler2.locale.date.day_full[6] + '<option value="7">' + scheduler2.locale.date.day_full[0] + "</select>" + loc.select_year_day2 + '<select name="year_month2"><option value="0" selected >' + loc.month_for_recurring[0] + '<option value="1">' + loc.month_for_recurring[1] + '<option value="2">' + loc.month_for_recurring[2] + '<option value="3">' + loc.month_for_recurring[3] + '<option value="4">' + loc.month_for_recurring[4] + '<option value="5">' + loc.month_for_recurring[5] + '<option value="6">' + loc.month_for_recurring[6] + '<option value="7">' + loc.month_for_recurring[7] + '<option value="8">' + loc.month_for_recurring[8] + '<option value="9">' + loc.month_for_recurring[9] + '<option value="10">' + loc.month_for_recurring[10] + '<option value="11">' + loc.month_for_recurring[11] + '</select></div> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <div><label><input class="dhx_repeat_radio" type="radio" name="end" checked/>' + loc.repeat_radio_end + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + loc.repeat_radio_end2 + '</label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />' + loc.repeat_text_occurences_count + '</div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + loc.repeat_radio_end3 + '</label><input class="dhx_repeat_date" type="text" name="date_of_end" value="' + scheduler2.config.repeat_date_of_end + '" /></div> </div> </form> </div> </div>';
    }, _ds: {}, _get_form_node: function(els, name, value) {
      var col = els[name];
      if (!col)
        return null;
      if (col.nodeName)
        return col;
      if (col.length) {
        for (var i = 0; i < col.length; i++) {
          if (col[i].value == value)
            return col[i];
        }
      }
    }, _get_node_value: function(els, name, multiselect2) {
      var col = els[name];
      if (!col)
        return "";
      if (col.length) {
        if (multiselect2) {
          var res = [];
          for (var i = 0; i < col.length; i++)
            if (col[i].checked)
              res.push(col[i].value);
          return res;
        } else {
          for (var i = 0; i < col.length; i++)
            if (col[i].checked)
              return col[i].value;
        }
      }
      if (col.value)
        return !multiselect2 ? col.value : [col.value];
    }, _get_node_numeric_value: function(els, name) {
      var value = scheduler2.form_blocks["recurring"]._get_node_value(els, name);
      return value * 1 || 0;
    }, _set_node_value: function(els, name, value) {
      var col = els[name];
      if (!col)
        return;
      if (col.name == name) {
        col.value = value;
      } else if (col.length) {
        var hash_value = typeof value == "object";
        for (var i = 0; i < col.length; i++)
          if (hash_value || col[i].value == value) {
            col[i].checked = hash_value ? !!value[col[i].value] : !!value;
          }
      }
    }, _init_set_value: function(node, value, ev) {
      var block = scheduler2.form_blocks["recurring"];
      var get_value = block._get_node_value;
      var set_value = block._set_node_value;
      scheduler2.form_blocks["recurring"]._ds = { start: ev.start_date, end: ev._end_date };
      var str_date_format = scheduler2.date.str_to_date(scheduler2.config.repeat_date, false, true);
      var str_date = function(str_date2) {
        var date = str_date_format(str_date2);
        if (scheduler2.config.include_end_by)
          date = scheduler2.date.add(date, 1, "day");
        return date;
      };
      var date_str = scheduler2.date.date_to_str(scheduler2.config.repeat_date);
      var top = node.getElementsByTagName("FORM")[0];
      var els = {};
      function register_els(inps) {
        for (var i2 = 0; i2 < inps.length; i2++) {
          var inp = inps[i2];
          if (inp.name) {
            if (!els[inp.name]) {
              els[inp.name] = inp;
            } else if (els[inp.name].nodeType) {
              var node2 = els[inp.name];
              els[inp.name] = [node2, inp];
            } else {
              els[inp.name].push(inp);
            }
          }
        }
      }
      register_els(top.getElementsByTagName("INPUT"));
      register_els(top.getElementsByTagName("SELECT"));
      if (!scheduler2.config.repeat_date_of_end) {
        var formatter = scheduler2.date.date_to_str(scheduler2.config.repeat_date);
        scheduler2.config.repeat_date_of_end = formatter(scheduler2.date.add(scheduler2._currentDate(), 30, "day"));
      }
      set_value(els, "date_of_end", scheduler2.config.repeat_date_of_end);
      var $ = function(a) {
        return scheduler2._lightbox.querySelector(`#${a}`) || { style: {} };
      };
      function change_current_view() {
        $("dhx_repeat_day").style.display = "none";
        $("dhx_repeat_week").style.display = "none";
        $("dhx_repeat_month").style.display = "none";
        $("dhx_repeat_year").style.display = "none";
        $("dhx_repeat_" + this.value).style.display = "";
        scheduler2.setLightboxSize();
      }
      function get_repeat_code(dates) {
        var code = [get_value(els, "repeat")];
        get_rcode[code[0]](code, dates);
        while (code.length < 5)
          code.push("");
        var repeat2 = "";
        var end = get_end_rule(els);
        if (end == "no") {
          dates.end = new Date(9999, 1, 1);
          repeat2 = "no";
        } else if (end == "date_of_end") {
          dates.end = str_date(get_value(els, "date_of_end"));
        } else {
          scheduler2.transpose_type(code.join("_"));
          repeat2 = Math.max(1, get_value(els, "occurences_count"));
          var transp = 0;
          dates.end = scheduler2.date["add_" + code.join("_")](new Date(dates.start), repeat2 + transp, { start_date: dates.start }) || dates.start;
        }
        return code.join("_") + "#" + repeat2;
      }
      function get_end_rule(els2) {
        var end = els2["end"];
        if (end.length) {
          for (var i2 = 0; i2 < end.length; i2++) {
            if (end[i2].checked) {
              if (end[i2].value && end[i2].value != "on") {
                return end[i2].value;
              } else {
                if (!i2) {
                  return "no";
                } else if (i2 == 2) {
                  return "date_of_end";
                } else {
                  return "occurences_count";
                }
              }
            }
          }
        } else {
          if (end.value)
            return end.value;
        }
        return "no";
      }
      function set_end_rule(els2, value2) {
        var end = els2["end"];
        if (end.length) {
          var has_values = !!end[0].value && end[0].value != "on";
          if (has_values) {
            for (var i2 = 0; i2 < end.length; i2++) {
              if (end[i2].value == value2)
                end[i2].checked = true;
            }
          } else {
            var ind = 0;
            switch (value2) {
              case "no":
                ind = 0;
                break;
              case "date_of_end":
                ind = 2;
                break;
              default:
                ind = 1;
                break;
            }
            end[ind].checked = true;
          }
        } else {
          end.value = value2;
        }
      }
      scheduler2.form_blocks["recurring"]._get_repeat_code = get_repeat_code;
      var get_rcode = { month: function(code, dates) {
        var get_value2 = scheduler2.form_blocks["recurring"]._get_node_value;
        var get_numeric_value = scheduler2.form_blocks["recurring"]._get_node_numeric_value;
        if (get_value2(els, "month_type") == "d") {
          code.push(Math.max(1, get_numeric_value(els, "month_count")));
          dates.start.setDate(get_value2(els, "month_day"));
        } else {
          code.push(Math.max(1, get_numeric_value(els, "month_count2")));
          code.push(get_value2(els, "month_day2"));
          code.push(Math.max(1, get_numeric_value(els, "month_week2")));
          if (!scheduler2.config.repeat_precise) {
            dates.start.setDate(1);
          }
        }
        dates._start = true;
      }, week: function(code, dates) {
        var get_value2 = scheduler2.form_blocks["recurring"]._get_node_value;
        var get_numeric_value = scheduler2.form_blocks["recurring"]._get_node_numeric_value;
        code.push(Math.max(1, get_numeric_value(els, "week_count")));
        code.push("");
        code.push("");
        var t2 = [];
        var col = get_value2(els, "week_day", true);
        var day = dates.start.getDay();
        var start_exists = false;
        for (var i2 = 0; i2 < col.length; i2++) {
          t2.push(col[i2]);
          start_exists = start_exists || col[i2] == day;
        }
        if (!t2.length) {
          t2.push(day);
          start_exists = true;
        }
        t2.sort();
        if (!scheduler2.config.repeat_precise) {
          dates.start = scheduler2.date.week_start(dates.start);
          dates._start = true;
        } else if (!start_exists) {
          scheduler2.transpose_day_week(dates.start, t2, 1, 7);
          dates._start = true;
        }
        code.push(t2.join(","));
      }, day: function(code) {
        var get_value2 = scheduler2.form_blocks["recurring"]._get_node_value;
        var get_numeric_value = scheduler2.form_blocks["recurring"]._get_node_numeric_value;
        if (get_value2(els, "day_type") == "d") {
          code.push(Math.max(1, get_numeric_value(els, "day_count")));
        } else {
          code.push("week");
          code.push(1);
          code.push("");
          code.push("");
          code.push(scheduler2.config.recurring_workdays.join(","));
          code.splice(0, 1);
        }
      }, year: function(code, dates) {
        var get_value2 = scheduler2.form_blocks["recurring"]._get_node_value;
        if (get_value2(els, "year_type") == "d") {
          code.push("1");
          dates.start.setMonth(0);
          dates.start.setDate(get_value2(els, "year_day"));
          dates.start.setMonth(get_value2(els, "year_month"));
        } else {
          code.push("1");
          code.push(get_value2(els, "year_day2"));
          code.push(get_value2(els, "year_week2"));
          dates.start.setDate(1);
          dates.start.setMonth(get_value2(els, "year_month2"));
        }
        dates._start = true;
      } };
      var set_rcode = { week: function(code, dates) {
        var set_value2 = scheduler2.form_blocks["recurring"]._set_node_value;
        set_value2(els, "week_count", code[1]);
        var t2 = code[4].split(",");
        var d = {};
        for (var i2 = 0; i2 < t2.length; i2++)
          d[t2[i2]] = true;
        set_value2(els, "week_day", d);
      }, month: function(code, dates) {
        var set_value2 = scheduler2.form_blocks["recurring"]._set_node_value;
        if (code[2] === "") {
          set_value2(els, "month_type", "d");
          set_value2(els, "month_count", code[1]);
          set_value2(els, "month_day", dates.start.getDate());
        } else {
          set_value2(els, "month_type", "w");
          set_value2(els, "month_count2", code[1]);
          set_value2(els, "month_week2", code[3]);
          set_value2(els, "month_day2", code[2]);
        }
      }, day: function(code, dates) {
        var set_value2 = scheduler2.form_blocks["recurring"]._set_node_value;
        set_value2(els, "day_type", "d");
        set_value2(els, "day_count", code[1]);
      }, year: function(code, dates) {
        var set_value2 = scheduler2.form_blocks["recurring"]._set_node_value;
        if (code[2] === "") {
          set_value2(els, "year_type", "d");
          set_value2(els, "year_day", dates.start.getDate());
          set_value2(els, "year_month", dates.start.getMonth());
        } else {
          set_value2(els, "year_type", "w");
          set_value2(els, "year_week2", code[3]);
          set_value2(els, "year_day2", code[2]);
          set_value2(els, "year_month2", dates.start.getMonth());
        }
      } };
      function set_repeat_code(code, dates) {
        var set_value2 = scheduler2.form_blocks["recurring"]._set_node_value;
        var data = code.split("#");
        code = data[0].split("_");
        set_rcode[code[0]](code, dates);
        switch (data[1]) {
          case "no":
            set_end_rule(els, "no");
            break;
          case "":
            set_end_rule(els, "date_of_end");
            var end_date = dates.end;
            if (scheduler2.config.include_end_by) {
              end_date = scheduler2.date.add(end_date, -1, "day");
            }
            set_value2(els, "date_of_end", date_str(end_date));
            break;
          default:
            set_end_rule(els, "occurences_count");
            set_value2(els, "occurences_count", data[1]);
            break;
        }
        set_value2(els, "repeat", code[0]);
        var node2 = scheduler2.form_blocks["recurring"]._get_form_node(els, "repeat", code[0]);
        if (node2.nodeName == "SELECT") {
          node2.dispatchEvent(new Event("change"));
          node2.dispatchEvent(new MouseEvent("click"));
        } else {
          node2.dispatchEvent(new MouseEvent("click"));
        }
      }
      scheduler2.form_blocks["recurring"]._set_repeat_code = set_repeat_code;
      for (var i = 0; i < top.elements.length; i++) {
        var el2 = top.elements[i];
        switch (el2.name) {
          case "repeat":
            if (el2.nodeName == "SELECT" && !el2.$_eventAttached) {
              el2.$_eventAttached = true;
              el2.addEventListener("change", change_current_view);
            } else if (!el2.$_eventAttached) {
              el2.$_eventAttached = true;
              el2.addEventListener("click", change_current_view);
            }
            break;
        }
      }
      scheduler2._lightbox._rec_init_done = true;
    }, set_value: function(node, value, ev) {
      var rf = scheduler2.form_blocks["recurring"];
      if (!scheduler2._lightbox._rec_init_done)
        rf._init_set_value(node, value, ev);
      node.open = !ev.rec_type;
      node.blocked = this._is_modified_occurence(ev);
      var ds = rf._ds;
      ds.start = ev.start_date;
      ds.end = ev._end_date;
      rf._toggle_block();
      if (value)
        rf._set_repeat_code(value, ds);
    }, get_value: function(node, ev) {
      if (node.open) {
        var ds = scheduler2.form_blocks["recurring"]._ds;
        var actual_dates = {};
        var timeControl = getTimeSection();
        timeControl.getValue(actual_dates);
        ds.start = actual_dates.start_date;
        ev.rec_type = scheduler2.form_blocks["recurring"]._get_repeat_code(ds);
        if (ds._start) {
          ev.start_date = new Date(ds.start);
          ev._start_date = new Date(ds.start);
          ds._start = false;
        } else
          ev._start_date = null;
        ev._end_date = ds.end;
        ev.rec_pattern = ev.rec_type.split("#")[0];
      } else {
        ev.rec_type = ev.rec_pattern = "";
        ev._end_date = ev.end_date;
      }
      return ev.rec_type;
    }, _get_button: function() {
      var node = getRecurringSection().header;
      return node.firstChild.firstChild;
    }, _get_form: function() {
      return getRecurringSection().node;
    }, open: function() {
      var block = scheduler2.form_blocks.recurring;
      var cont = block._get_form();
      if (!cont.open)
        block._toggle_block();
    }, close: function() {
      var block = scheduler2.form_blocks.recurring;
      var cont = block._get_form();
      if (cont.open)
        block._toggle_block();
    }, _toggle_block: function() {
      var block = scheduler2.form_blocks.recurring;
      var cont = block._get_form(), el2 = block._get_button();
      if (!cont.open && !cont.blocked) {
        cont.style.height = "auto";
        if (el2) {
          el2.style.backgroundPosition = "-5px 0px";
          el2.nextSibling.innerHTML = scheduler2.locale.labels.button_recurring_open;
        }
      } else {
        cont.style.height = "0px";
        if (el2) {
          el2.style.backgroundPosition = "-5px 20px";
          el2.nextSibling.innerHTML = scheduler2.locale.labels.button_recurring;
        }
      }
      cont.open = !cont.open;
      scheduler2.setLightboxSize();
    }, focus: function(node) {
    }, button_click: function(node, button, event2) {
      var block = scheduler2.form_blocks.recurring;
      var cont = block._get_form();
      if (!cont.blocked)
        scheduler2.form_blocks.recurring._toggle_block();
    } };
    function getTimeSection() {
      var timeControl = scheduler2.formSection("time");
      if (!timeControl) {
        timeControl = getFirstSectionOfType("time");
      }
      if (!timeControl) {
        timeControl = getFirstSectionOfType("calendar_time");
      }
      if (!timeControl) {
        throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", 'In the latter case, make sure the control is named "time":', "", "scheduler.config.lightbox.sections = [", '{name:"time", height:72, type:"YOU CONTROL", map_to:"auto" }];'].join("\n"));
      }
      return timeControl;
    }
    function getRecurringSection() {
      var recurringSection = scheduler2.formSection("recurring");
      if (!recurringSection) {
        recurringSection = getFirstSectionOfType("recurring");
      }
      if (!recurringSection) {
        throw new Error(["Can't locate the Recurring form section.", "Make sure that you have the recurring control on the lightbox configuration https://docs.dhtmlx.com/scheduler/recurring_events.html#recurringlightbox ", 'and that the recurring control has name "recurring":', "", "scheduler.config.lightbox.sections = [", '	{name:"recurring", ... }', "];"].join("\n"));
      }
      return recurringSection;
    }
    function getFirstSectionOfType(type) {
      for (var i = 0; i < scheduler2.config.lightbox.sections.length; i++) {
        var section = scheduler2.config.lightbox.sections[i];
        if (section.type === type) {
          return scheduler2.formSection(section.name);
        }
      }
      return null;
    }
    scheduler2._rec_markers = {};
    scheduler2._rec_markers_pull = {};
    scheduler2._add_rec_marker = function(ev, time) {
      ev._pid_time = time;
      this._rec_markers[ev.id] = ev;
      if (!this._rec_markers_pull[ev.event_pid])
        this._rec_markers_pull[ev.event_pid] = {};
      this._rec_markers_pull[ev.event_pid][time] = ev;
    };
    scheduler2._get_rec_marker = function(time, id2) {
      var ch = this._rec_markers_pull[id2];
      if (ch)
        return ch[time];
      return null;
    };
    scheduler2._get_rec_markers = function(id2) {
      return this._rec_markers_pull[id2] || [];
    };
    function clearMilliseconds(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
    }
    scheduler2._rec_temp = [];
    (function() {
      var old_add_event = scheduler2.addEvent;
      scheduler2.addEvent = function(start_date, end_date, text, id2, extra_data) {
        var ev_id = old_add_event.apply(this, arguments);
        if (ev_id && scheduler2.getEvent(ev_id)) {
          var ev = scheduler2.getEvent(ev_id);
          if (ev.start_date) {
            ev.start_date = clearMilliseconds(ev.start_date);
          }
          if (ev.end_date) {
            ev.end_date = clearMilliseconds(ev.end_date);
          }
          if (this._is_modified_occurence(ev))
            scheduler2._add_rec_marker(ev, ev.event_length * 1e3);
          if (ev.rec_type)
            ev.rec_pattern = ev.rec_type.split("#")[0];
        }
        return ev_id;
      };
    })();
    scheduler2.attachEvent("onEventIdChange", function(id2, new_id) {
      if (this._ignore_call)
        return;
      this._ignore_call = true;
      if (scheduler2._rec_markers[id2]) {
        scheduler2._rec_markers[new_id] = scheduler2._rec_markers[id2];
        delete scheduler2._rec_markers[id2];
      }
      if (scheduler2._rec_markers_pull[id2]) {
        scheduler2._rec_markers_pull[new_id] = scheduler2._rec_markers_pull[id2];
        delete scheduler2._rec_markers_pull[id2];
      }
      for (var i = 0; i < this._rec_temp.length; i++) {
        var tev = this._rec_temp[i];
        if (tev.event_pid == id2) {
          tev.event_pid = new_id;
          this.changeEventId(tev.id, new_id + "#" + tev.id.split("#")[1]);
        }
      }
      for (var i in this._rec_markers) {
        var tev = this._rec_markers[i];
        if (tev.event_pid == id2) {
          tev.event_pid = new_id;
          tev._pid_changed = true;
        }
      }
      var el2 = scheduler2._rec_markers[new_id];
      if (el2 && el2._pid_changed) {
        delete el2._pid_changed;
        setTimeout(function() {
          if (scheduler2.$destroyed) {
            return true;
          }
          scheduler2.callEvent("onEventChanged", [new_id, scheduler2.getEvent(new_id)]);
        }, 1);
      }
      delete this._ignore_call;
    });
    scheduler2.attachEvent("onConfirmedBeforeEventDelete", function(id2) {
      var ev = this.getEvent(id2);
      if (this._is_virtual_event(id2) || this._is_modified_occurence(ev) && ev.rec_type && ev.rec_type != "none") {
        id2 = id2.split("#");
        var nid = this.uid();
        var tid = id2[1] ? id2[1] : Math.round(ev._pid_time / 1e3);
        var nev = this._copy_event(ev);
        nev.id = nid;
        nev.event_pid = ev.event_pid || id2[0];
        var timestamp = tid;
        nev.event_length = timestamp;
        nev.rec_type = nev.rec_pattern = "none";
        this.addEvent(nev);
        this._add_rec_marker(nev, timestamp * 1e3);
      } else {
        if (ev.rec_type && this._lightbox_id)
          this._roll_back_dates(ev);
        var sub = this._get_rec_markers(id2);
        for (var i in sub) {
          if (sub.hasOwnProperty(i)) {
            id2 = sub[i].id;
            if (this.getEvent(id2))
              this.deleteEvent(id2, true);
          }
        }
      }
      return true;
    });
    scheduler2.attachEvent("onEventDeleted", function(id2, ev) {
      if (!this._is_virtual_event(id2) && this._is_modified_occurence(ev)) {
        if (!scheduler2._events[id2]) {
          ev.rec_type = ev.rec_pattern = "none";
          this.setEvent(id2, ev);
        }
      }
    });
    scheduler2.attachEvent("onEventChanged", function(id2, event2) {
      if (this._loading)
        return true;
      var ev = this.getEvent(id2);
      if (this._is_virtual_event(id2)) {
        var id2 = id2.split("#");
        var nid = this.uid();
        this._not_render = true;
        var nev = this._copy_event(event2);
        nev.id = nid;
        nev.event_pid = id2[0];
        var timestamp = id2[1];
        nev.event_length = timestamp;
        nev.rec_type = nev.rec_pattern = "";
        this._add_rec_marker(nev, timestamp * 1e3);
        this.addEvent(nev);
        this._not_render = false;
      } else {
        if (ev.start_date) {
          ev.start_date = clearMilliseconds(ev.start_date);
        }
        if (ev.end_date) {
          ev.end_date = clearMilliseconds(ev.end_date);
        }
        if (ev.rec_type && this._lightbox_id) {
          this._roll_back_dates(ev);
        }
        var sub = this._get_rec_markers(id2);
        for (var i in sub) {
          if (sub.hasOwnProperty(i)) {
            delete this._rec_markers[sub[i].id];
            this.deleteEvent(sub[i].id, true);
          }
        }
        delete this._rec_markers_pull[id2];
        var isEventFound = false;
        for (var k = 0; k < this._rendered.length; k++) {
          if (this._rendered[k].getAttribute(this.config.event_attribute) == id2)
            isEventFound = true;
        }
        if (!isEventFound)
          this._select_id = null;
      }
      return true;
    });
    scheduler2.attachEvent("onEventAdded", function(id2) {
      if (!this._loading) {
        var ev = this.getEvent(id2);
        if (ev.rec_type && !ev.event_length) {
          this._roll_back_dates(ev);
        }
      }
      return true;
    });
    scheduler2.attachEvent("onEventSave", function(id2, data, is_new_event) {
      var ev = this.getEvent(id2);
      if (!ev.rec_type && data.rec_type && !this._is_virtual_event(id2))
        this._select_id = null;
      return true;
    });
    scheduler2.attachEvent("onEventCreated", function(id2) {
      var ev = this.getEvent(id2);
      if (!ev.rec_type)
        ev.rec_type = ev.rec_pattern = ev.event_length = ev.event_pid = "";
      return true;
    });
    scheduler2.attachEvent("onEventCancel", function(id2) {
      var ev = this.getEvent(id2);
      if (ev.rec_type) {
        this._roll_back_dates(ev);
        this.render_view_data();
      }
    });
    scheduler2._roll_back_dates = function(ev) {
      if (ev.start_date) {
        ev.start_date = clearMilliseconds(ev.start_date);
      }
      if (ev.end_date) {
        ev.end_date = clearMilliseconds(ev.end_date);
      }
      ev.event_length = Math.round((ev.end_date.valueOf() - ev.start_date.valueOf()) / 1e3);
      ev.end_date = ev._end_date;
      if (ev._start_date) {
        ev.start_date.setMonth(0);
        ev.start_date.setDate(ev._start_date.getDate());
        ev.start_date.setMonth(ev._start_date.getMonth());
        ev.start_date.setFullYear(ev._start_date.getFullYear());
      }
    };
    scheduler2._is_virtual_event = function(id2) {
      return id2.toString().indexOf("#") != -1;
    };
    scheduler2._is_modified_occurence = function(ev) {
      return ev.event_pid && ev.event_pid != "0";
    };
    scheduler2.showLightbox_rec = scheduler2.showLightbox;
    scheduler2.showLightbox = function(id2) {
      var locale = this.locale;
      var c = scheduler2.config.lightbox_recurring;
      var ev = this.getEvent(id2);
      var pid = ev.event_pid;
      var isVirtual = this._is_virtual_event(id2);
      if (isVirtual)
        pid = id2.split("#")[0];
      var showSeries = function(id3) {
        var event2 = scheduler2.getEvent(id3);
        event2._end_date = event2.end_date;
        event2.end_date = new Date(event2.start_date.valueOf() + event2.event_length * 1e3);
        return scheduler2.showLightbox_rec(id3);
      };
      if ((pid || pid * 1 === 0) && ev.rec_type) {
        return showSeries(id2);
      }
      if (!pid || pid === "0" || (!locale.labels.confirm_recurring || c == "instance" || c == "series" && !isVirtual)) {
        return this.showLightbox_rec(id2);
      }
      if (c == "ask") {
        var that = this;
        scheduler2.modalbox({ text: locale.labels.confirm_recurring, title: locale.labels.title_confirm_recurring, width: "500px", position: "middle", buttons: [locale.labels.button_edit_series, locale.labels.button_edit_occurrence, locale.labels.icon_cancel], callback: function(index) {
          switch (+index) {
            case 0:
              return showSeries(pid);
            case 1:
              return that.showLightbox_rec(id2);
            case 2:
              return;
          }
        } });
      } else {
        showSeries(pid);
      }
    };
    scheduler2.get_visible_events_rec = scheduler2.get_visible_events;
    scheduler2.get_visible_events = function(only_timed) {
      for (var i = 0; i < this._rec_temp.length; i++)
        delete this._events[this._rec_temp[i].id];
      this._rec_temp = [];
      var stack = this.get_visible_events_rec(only_timed);
      var out = [];
      for (var i = 0; i < stack.length; i++) {
        if (stack[i].rec_type) {
          if (stack[i].rec_pattern != "none")
            this.repeat_date(stack[i], out);
        } else
          out.push(stack[i]);
      }
      return out;
    };
    (function() {
      var old = scheduler2.isOneDayEvent;
      scheduler2.isOneDayEvent = function(ev) {
        if (ev.rec_type)
          return true;
        return old.call(this, ev);
      };
      var old_update_event = scheduler2.updateEvent;
      scheduler2.updateEvent = function(id2) {
        var ev = scheduler2.getEvent(id2);
        if (ev && ev.rec_type) {
          ev.rec_pattern = (ev.rec_type || "").split("#")[0];
        }
        if (ev && ev.rec_type && !this._is_virtual_event(id2)) {
          scheduler2.update_view();
        } else {
          old_update_event.call(this, id2);
        }
      };
    })();
    scheduler2.transponse_size = { day: 1, week: 7, month: 1, year: 12 };
    scheduler2.date.day_week = function(sd, day, week) {
      sd.setDate(1);
      var originalMonth = scheduler2.date.month_start(new Date(sd));
      week = (week - 1) * 7;
      var cday = sd.getDay();
      var nday = day * 1 + week - cday + 1;
      sd.setDate(nday <= week ? nday + 7 : nday);
      var newMonth = scheduler2.date.month_start(new Date(sd));
      if (originalMonth.valueOf() !== newMonth.valueOf()) {
        return false;
      }
      return true;
    };
    scheduler2.transpose_day_week = function(sd, list, cor, size, cor2) {
      var cday = (sd.getDay() || (scheduler2.config.start_on_monday ? 7 : 0)) - cor;
      for (var i = 0; i < list.length; i++) {
        if (list[i] > cday)
          return sd.setDate(sd.getDate() + list[i] * 1 - cday - (size ? cor : cor2));
      }
      this.transpose_day_week(sd, list, cor + size, null, cor);
    };
    scheduler2.transpose_type = function(type) {
      var transposeRecurring = "transpose_" + type;
      if (!this.date[transposeRecurring]) {
        var recurringParts = type.split("_");
        var dayDurationMs = 60 * 60 * 24 * 1e3;
        var addRecurring = "add_" + type;
        var recurringStepDays = this.transponse_size[recurringParts[0]] * recurringParts[1];
        if (recurringParts[0] == "day" || recurringParts[0] == "week") {
          var weekDays = null;
          if (recurringParts[4]) {
            weekDays = recurringParts[4].split(",");
            if (scheduler2.config.start_on_monday) {
              for (var i = 0; i < weekDays.length; i++)
                weekDays[i] = weekDays[i] * 1 || 7;
              weekDays.sort();
            }
          }
          this.date[transposeRecurring] = function(nd, td) {
            var delta = Math.floor((td.valueOf() - nd.valueOf()) / (dayDurationMs * recurringStepDays));
            if (delta > 0)
              nd.setDate(nd.getDate() + delta * recurringStepDays);
            if (weekDays)
              scheduler2.transpose_day_week(nd, weekDays, 1, recurringStepDays);
            return nd;
          };
          this.date[addRecurring] = function(sd, inc) {
            var nd = new Date(sd.valueOf());
            if (weekDays) {
              for (var count = 0; count < inc; count++)
                scheduler2.transpose_day_week(nd, weekDays, 0, recurringStepDays);
            } else
              nd.setDate(nd.getDate() + inc * recurringStepDays);
            return nd;
          };
        } else if (recurringParts[0] == "month" || recurringParts[0] == "year") {
          this.date[transposeRecurring] = function(nd, td, seriesInstance) {
            var delta = Math.ceil((td.getFullYear() * 12 + td.getMonth() * 1 + 1 - (nd.getFullYear() * 12 + nd.getMonth() * 1 + 1)) / recurringStepDays - 1);
            if (delta >= 0) {
              nd.setDate(1);
              nd.setMonth(nd.getMonth() + delta * recurringStepDays);
            }
            return scheduler2.date[addRecurring](nd, 0, seriesInstance);
          };
          this.date[addRecurring] = function(sd, inc, seriesInstance, currentCount) {
            if (!currentCount) {
              currentCount = 1;
            } else {
              currentCount++;
            }
            var maxCount = 12;
            if (currentCount > maxCount) {
              return null;
            }
            var nd = new Date(sd.valueOf());
            nd.setDate(1);
            nd.setMonth(nd.getMonth() + inc * recurringStepDays);
            var origMonth = nd.getMonth();
            var origYear = nd.getFullYear();
            nd.setDate(seriesInstance.start_date.getDate());
            if (recurringParts[3]) {
              scheduler2.date.day_week(nd, recurringParts[2], recurringParts[3]);
            }
            var correctOverflowInstances = scheduler2.config.recurring_overflow_instances;
            if (nd.getMonth() != origMonth && correctOverflowInstances != "none") {
              if (correctOverflowInstances === "lastDay") {
                nd = new Date(origYear, origMonth + 1, 0, nd.getHours(), nd.getMinutes(), nd.getSeconds(), nd.getMilliseconds());
              } else {
                nd = scheduler2.date[addRecurring](new Date(origYear, origMonth + 1, 0), inc || 1, seriesInstance, currentCount);
              }
            }
            return nd;
          };
        }
      }
    };
    scheduler2.repeat_date = function(ev, stack, non_render, from, to, maxCount) {
      from = from || this._min_date;
      to = to || this._max_date;
      var max = maxCount || -1;
      var td = new Date(ev.start_date.valueOf());
      var startHour = td.getHours();
      var visibleCount = 0;
      if (!ev.rec_pattern && ev.rec_type)
        ev.rec_pattern = ev.rec_type.split("#")[0];
      this.transpose_type(ev.rec_pattern);
      td = scheduler2.date["transpose_" + ev.rec_pattern](td, from, ev);
      while (td && (td < ev.start_date || scheduler2._fix_daylight_saving_date(td, from, ev, td, new Date(td.valueOf() + ev.event_length * 1e3)).valueOf() <= from.valueOf() || td.valueOf() + ev.event_length * 1e3 <= from.valueOf())) {
        td = this.date["add_" + ev.rec_pattern](td, 1, ev);
      }
      while (td && (td < to && td < ev.end_date && (max < 0 || visibleCount < max))) {
        td.setHours(startHour);
        var timestamp = scheduler2.config.occurrence_timestamp_in_utc ? Date.UTC(td.getFullYear(), td.getMonth(), td.getDate(), td.getHours(), td.getMinutes(), td.getSeconds()) : td.valueOf();
        var ch = this._get_rec_marker(timestamp, ev.id);
        if (!ch) {
          var ted = new Date(td.valueOf() + ev.event_length * 1e3);
          var copy = this._copy_event(ev);
          copy.text = ev.text;
          copy.start_date = td;
          copy.event_pid = ev.id;
          copy.id = ev.id + "#" + Math.round(timestamp / 1e3);
          copy.end_date = ted;
          copy.end_date = scheduler2._fix_daylight_saving_date(copy.start_date, copy.end_date, ev, td, copy.end_date);
          copy._timed = this.isOneDayEvent(copy);
          if (!copy._timed && !this._table_view && !this.config.multi_day)
            return;
          stack.push(copy);
          if (!non_render) {
            this._events[copy.id] = copy;
            this._rec_temp.push(copy);
          }
          visibleCount++;
        } else if (non_render) {
          if (ch.rec_type != "none") {
            visibleCount++;
          }
          stack.push(ch);
        }
        td = this.date["add_" + ev.rec_pattern](td, 1, ev);
      }
    };
    scheduler2._fix_daylight_saving_date = function(start_date, end_date, ev, counter, default_date) {
      var shift = start_date.getTimezoneOffset() - end_date.getTimezoneOffset();
      if (shift) {
        if (shift > 0) {
          return new Date(counter.valueOf() + ev.event_length * 1e3 - shift * 60 * 1e3);
        } else {
          return new Date(end_date.valueOf() - shift * 60 * 1e3);
        }
      }
      return new Date(default_date.valueOf());
    };
    scheduler2.getRecDates = function(id2, max) {
      var ev = typeof id2 == "object" ? id2 : scheduler2.getEvent(id2);
      var recurrings = [];
      max = max || 100;
      if (!ev.rec_type) {
        return [{ start_date: ev.start_date, end_date: ev.end_date }];
      }
      if (ev.rec_type == "none") {
        return [];
      }
      scheduler2.repeat_date(ev, recurrings, true, ev.start_date, ev.end_date, max);
      var result = [];
      for (var i = 0; i < recurrings.length; i++) {
        if (recurrings[i].rec_type != "none") {
          result.push({ start_date: recurrings[i].start_date, end_date: recurrings[i].end_date });
        }
      }
      return result;
    };
    scheduler2.getEvents = function(from, to) {
      var result = [];
      for (var a in this._events) {
        var ev = this._events[a];
        if (ev && ev.start_date < to && ev.end_date > from) {
          if (ev.rec_pattern) {
            if (ev.rec_pattern == "none")
              continue;
            var sev = [];
            this.repeat_date(ev, sev, true, from, to);
            for (var i = 0; i < sev.length; i++) {
              if (!sev[i].rec_pattern && sev[i].start_date < to && sev[i].end_date > from && !this._rec_markers[sev[i].id]) {
                result.push(sev[i]);
              }
            }
          } else if (!this._is_virtual_event(ev.id)) {
            result.push(ev);
          }
        }
      }
      return result;
    };
    scheduler2.config.repeat_date = "%m.%d.%Y";
    scheduler2.config.lightbox.sections = [{ name: "description", map_to: "text", type: "textarea", focus: true }, { name: "recurring", type: "recurring", map_to: "rec_type", button: "recurring" }, { name: "time", height: 72, type: "time", map_to: "auto" }];
    scheduler2._copy_dummy = function(ev) {
      var start_date = new Date(this.start_date);
      var end_date = new Date(this.end_date);
      this.start_date = start_date;
      this.end_date = end_date;
      this.event_length = this.event_pid = this.rec_pattern = this.rec_type = null;
    };
    scheduler2.config.include_end_by = false;
    scheduler2.config.lightbox_recurring = "ask";
    scheduler2.attachEvent("onClearAll", function() {
      scheduler2._rec_markers = {};
      scheduler2._rec_markers_pull = {};
      scheduler2._rec_temp = [];
    });
  }
  function serialize(scheduler2) {
    const getSerializableData = getSerializator(scheduler2);
    scheduler2.data_attributes = function() {
      var attrs = [];
      var format = scheduler2._helpers.formatDate;
      var all_events = getSerializableData();
      for (var a in all_events) {
        var ev = all_events[a];
        for (var name in ev)
          if (name.substr(0, 1) != "_")
            attrs.push([name, name == "start_date" || name == "end_date" ? format : null]);
        break;
      }
      return attrs;
    };
    scheduler2.toXML = function(header) {
      var xml = [];
      var attrs = this.data_attributes();
      var all_events = getSerializableData();
      for (var a in all_events) {
        var ev = all_events[a];
        xml.push("<event>");
        for (var i = 0; i < attrs.length; i++)
          xml.push("<" + attrs[i][0] + "><![CDATA[" + (attrs[i][1] ? attrs[i][1](ev[attrs[i][0]]) : ev[attrs[i][0]]) + "]]></" + attrs[i][0] + ">");
        xml.push("</event>");
      }
      return (header || "") + "<data>" + xml.join("\n") + "</data>";
    };
    scheduler2._serialize_json_value = function(value) {
      if (value === null || typeof value === "boolean") {
        value = "" + value;
      } else {
        if (!value && value !== 0) {
          value = "";
        }
        value = '"' + value.toString().replace(/\n/g, "").replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
      }
      return value;
    };
    scheduler2.toJSON = function() {
      return JSON.stringify(this.serialize());
    };
    scheduler2.toICal = function(header) {
      var start = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//dhtmlXScheduler//NONSGML v2.2//EN\nDESCRIPTION:";
      var end = "END:VCALENDAR";
      var format = scheduler2.date.date_to_str("%Y%m%dT%H%i%s");
      var full_day_format = scheduler2.date.date_to_str("%Y%m%d");
      var ical = [];
      var all_events = getSerializableData();
      for (var a in all_events) {
        var ev = all_events[a];
        ical.push("BEGIN:VEVENT");
        if (!ev._timed || !ev.start_date.getHours() && !ev.start_date.getMinutes())
          ical.push("DTSTART:" + full_day_format(ev.start_date));
        else
          ical.push("DTSTART:" + format(ev.start_date));
        if (!ev._timed || !ev.end_date.getHours() && !ev.end_date.getMinutes())
          ical.push("DTEND:" + full_day_format(ev.end_date));
        else
          ical.push("DTEND:" + format(ev.end_date));
        ical.push("SUMMARY:" + ev.text);
        ical.push("END:VEVENT");
      }
      return start + (header || "") + "\n" + ical.join("\n") + "\n" + end;
    };
  }
  function timeline_restricted(scheduler2) {
    notImplemented.alert("Timeline", scheduler2.assert);
  }
  class Tooltip {
    constructor(scheduler2) {
      this._scheduler = scheduler2;
    }
    getNode() {
      const scheduler2 = this._scheduler;
      if (!this._tooltipNode) {
        this._tooltipNode = document.createElement("div");
        this._tooltipNode.className = "dhtmlXTooltip scheduler_tooltip tooltip";
        scheduler2._waiAria.tooltipAttr(this._tooltipNode);
      }
      if (scheduler2.config.rtl) {
        this._tooltipNode.classList.add("dhtmlXTooltip_rtl");
      } else {
        this._tooltipNode.classList.remove("dhtmlXTooltip_rtl");
      }
      return this._tooltipNode;
    }
    setViewport(node) {
      this._root = node;
      return this;
    }
    show(left, top) {
      const scheduler2 = this._scheduler;
      const domHelpers = scheduler2.$domHelpers;
      const container = document.body;
      const node = this.getNode();
      if (!domHelpers.isChildOf(node, container)) {
        this.hide();
        container.appendChild(node);
      }
      if (this._isLikeMouseEvent(left)) {
        const position = this._calculateTooltipPosition(left);
        top = position.top;
        left = position.left;
      }
      node.style.top = top + "px";
      node.style.left = left + "px";
      scheduler2._waiAria.tooltipVisibleAttr(node);
      return this;
    }
    hide() {
      const scheduler2 = this._scheduler;
      const node = this.getNode();
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
      scheduler2._waiAria.tooltipHiddenAttr(node);
      return this;
    }
    setContent(html) {
      const node = this.getNode();
      node.innerHTML = html;
      return this;
    }
    _isLikeMouseEvent(event2) {
      if (!event2 || typeof event2 !== "object") {
        return false;
      }
      return "clientX" in event2 && "clientY" in event2;
    }
    _getViewPort() {
      return this._root || document.body;
    }
    _calculateTooltipPosition(event2) {
      const scheduler2 = this._scheduler;
      const domHelpers = scheduler2.$domHelpers;
      const viewport = this._getViewPortSize();
      const tooltipNode = this.getNode();
      const tooltip2 = { top: 0, left: 0, width: tooltipNode.offsetWidth, height: tooltipNode.offsetHeight, bottom: 0, right: 0 };
      const offsetX = scheduler2.config.tooltip_offset_x;
      const offsetY = scheduler2.config.tooltip_offset_y;
      const container = document.body;
      const mouse = domHelpers.getRelativeEventPosition(event2, container);
      const containerPos = domHelpers.getNodePosition(container);
      mouse.y += containerPos.y;
      tooltip2.top = mouse.y;
      tooltip2.left = mouse.x;
      tooltip2.top += offsetY;
      tooltip2.left += offsetX;
      tooltip2.bottom = tooltip2.top + tooltip2.height;
      tooltip2.right = tooltip2.left + tooltip2.width;
      const scrollTop = window.scrollY + container.scrollTop;
      if (tooltip2.top < viewport.top - scrollTop) {
        tooltip2.top = viewport.top;
        tooltip2.bottom = tooltip2.top + tooltip2.height;
      } else if (tooltip2.bottom > viewport.bottom) {
        tooltip2.bottom = viewport.bottom;
        tooltip2.top = tooltip2.bottom - tooltip2.height;
      }
      if (tooltip2.left < viewport.left) {
        tooltip2.left = viewport.left;
        tooltip2.right = viewport.left + tooltip2.width;
      } else if (tooltip2.right > viewport.right) {
        tooltip2.right = viewport.right;
        tooltip2.left = tooltip2.right - tooltip2.width;
      }
      if (mouse.x >= tooltip2.left && mouse.x <= tooltip2.right) {
        tooltip2.left = mouse.x - tooltip2.width - offsetX;
        tooltip2.right = tooltip2.left + tooltip2.width;
      }
      if (mouse.y >= tooltip2.top && mouse.y <= tooltip2.bottom) {
        tooltip2.top = mouse.y - tooltip2.height - offsetY;
        tooltip2.bottom = tooltip2.top + tooltip2.height;
      }
      if (tooltip2.left < 0) {
        tooltip2.left = 0;
      }
      if (tooltip2.right < 0) {
        tooltip2.right = 0;
      }
      return tooltip2;
    }
    _getViewPortSize() {
      const scheduler2 = this._scheduler;
      const domHelpers = scheduler2.$domHelpers;
      const container = this._getViewPort();
      let viewport = container;
      let scrollTop = window.scrollY + document.body.scrollTop;
      let scrollLeft = window.scrollX + document.body.scrollLeft;
      let pos;
      if (container === scheduler2.$event_data) {
        viewport = scheduler2.$event;
        scrollTop = 0;
        scrollLeft = 0;
        pos = domHelpers.getNodePosition(scheduler2.$event);
      } else {
        pos = domHelpers.getNodePosition(viewport);
      }
      return { left: pos.x + scrollLeft, top: pos.y + scrollTop, width: pos.width, height: pos.height, bottom: pos.y + pos.height + scrollTop, right: pos.x + pos.width + scrollLeft };
    }
  }
  class TooltipManager {
    constructor(scheduler2) {
      this._listeners = {};
      this.tooltip = new Tooltip(scheduler2);
      this._scheduler = scheduler2;
      this._domEvents = scheduler2._createDomEventScope();
      this._initDelayedFunctions();
    }
    destructor() {
      this.tooltip.hide();
      this._domEvents.detachAll();
    }
    hideTooltip() {
      this.delayHide();
    }
    attach(config) {
      let root = document.body;
      const scheduler2 = this._scheduler;
      const domHelpers = scheduler2.$domHelpers;
      if (!config.global) {
        root = scheduler2.$root;
      }
      let watchableTarget = null;
      const handler = (event2) => {
        const eventTarget = domHelpers.getTargetNode(event2);
        const targetNode = domHelpers.closest(eventTarget, config.selector);
        if (domHelpers.isChildOf(eventTarget, this.tooltip.getNode())) {
          return;
        }
        const doOnMouseEnter = () => {
          watchableTarget = targetNode;
          config.onmouseenter(event2, targetNode);
        };
        if (scheduler2._mobile && scheduler2.config.touch_tooltip) {
          if (targetNode) {
            doOnMouseEnter();
          } else {
            config.onmouseleave(event2, targetNode);
          }
        }
        if (watchableTarget) {
          if (targetNode && targetNode === watchableTarget) {
            config.onmousemove(event2, targetNode);
          } else {
            config.onmouseleave(event2, watchableTarget);
            watchableTarget = null;
            if (targetNode && targetNode !== watchableTarget) {
              doOnMouseEnter();
            }
          }
        } else {
          if (targetNode) {
            doOnMouseEnter();
          }
        }
      };
      this.detach(config.selector);
      this._domEvents.attach(root, "mousemove", handler);
      this._listeners[config.selector] = { node: root, handler };
    }
    detach(selector) {
      const listener = this._listeners[selector];
      if (listener) {
        this._domEvents.detach(listener.node, "mousemove", listener.handler);
      }
    }
    tooltipFor(config) {
      const cloneDomEvent = (event2) => {
        let clone2 = event2;
        if (document["createEventObject"] && !document.createEvent) {
          clone2 = document["createEventObject"](event2);
        }
        return clone2;
      };
      this._initDelayedFunctions();
      this.attach({ selector: config.selector, global: config.global, onmouseenter: (event2, node) => {
        const html = config.html(event2, node);
        if (html) {
          this.delayShow(cloneDomEvent(event2), html);
        }
      }, onmousemove: (event2, node) => {
        const html = config.html(event2, node);
        if (html) {
          this.delayShow(cloneDomEvent(event2), html);
        } else {
          this.delayShow.$cancelTimeout();
          this.delayHide();
        }
      }, onmouseleave: () => {
        this.delayShow.$cancelTimeout();
        this.delayHide();
      } });
    }
    _initDelayedFunctions() {
      const scheduler2 = this._scheduler;
      if (this.delayShow) {
        this.delayShow.$cancelTimeout();
      }
      if (this.delayHide) {
        this.delayHide.$cancelTimeout();
      }
      this.tooltip.hide();
      this.delayShow = utils.delay((event2, html) => {
        if (scheduler2.callEvent("onBeforeTooltip", [event2]) === false) {
          this.tooltip.hide();
        } else {
          this.tooltip.setContent(html);
          this.tooltip.show(event2);
        }
      }, scheduler2.config.tooltip_timeout || 1);
      this.delayHide = utils.delay(() => {
        this.delayShow.$cancelTimeout();
        this.tooltip.hide();
      }, scheduler2.config.tooltip_hide_timeout || 1);
    }
  }
  function tooltip(scheduler2) {
    scheduler2.config.tooltip_timeout = 30;
    scheduler2.config.tooltip_offset_y = 20;
    scheduler2.config.tooltip_offset_x = 10;
    scheduler2.config.tooltip_hide_timeout = 30;
    const tooltipManager = new TooltipManager(scheduler2);
    scheduler2.ext.tooltips = tooltipManager;
    scheduler2.attachEvent("onSchedulerReady", function() {
      tooltipManager.tooltipFor({ selector: "[" + scheduler2.config.event_attribute + "]", html: (event2) => {
        if (scheduler2._mobile && !scheduler2.config.touch_tooltip) {
          return;
        }
        const targetEventId = scheduler2._locate_event(event2.target);
        if (scheduler2.getEvent(targetEventId)) {
          const event22 = scheduler2.getEvent(targetEventId);
          return scheduler2.templates.tooltip_text(event22.start_date, event22.end_date, event22);
        }
        return null;
      }, global: false });
    });
    scheduler2.attachEvent("onDestroy", function() {
      tooltipManager.destructor();
    });
    scheduler2.attachEvent("onLightbox", function() {
      tooltipManager.hideTooltip();
    });
    scheduler2.attachEvent("onBeforeDrag", function() {
      if (scheduler2._mobile && scheduler2.config.touch_tooltip) {
        return true;
      }
      tooltipManager.hideTooltip();
      return true;
    });
    scheduler2.attachEvent("onEventDeleted", function() {
      tooltipManager.hideTooltip();
      return true;
    });
  }
  function treetimeline_restricted(scheduler2) {
    notImplemented.alert("Tree Timeline", scheduler2.assert);
  }
  function units_restricted(scheduler2) {
    notImplemented.alert("Units", scheduler2.assert);
  }
  function url(scheduler2) {
    scheduler2._get_url_nav = function() {
      var p = {};
      var data = (document.location.hash || "").replace("#", "").split(",");
      for (var i = 0; i < data.length; i++) {
        var s = data[i].split("=");
        if (s.length == 2)
          p[s[0]] = s[1];
      }
      return p;
    };
    scheduler2.attachEvent("onTemplatesReady", function() {
      var first = true;
      var s2d = scheduler2.date.str_to_date("%Y-%m-%d");
      var d2s = scheduler2.date.date_to_str("%Y-%m-%d");
      var select_event = scheduler2._get_url_nav().event || null;
      scheduler2.attachEvent("onAfterEventDisplay", function(ev) {
        select_event = null;
        return true;
      });
      scheduler2.attachEvent("onBeforeViewChange", function(om, od, m, d) {
        if (first) {
          first = false;
          var p = scheduler2._get_url_nav();
          if (p.event) {
            try {
              if (scheduler2.getEvent(p.event)) {
                setTimeout(function() {
                  showEvent(p.event);
                });
                return false;
              } else {
                var handler = scheduler2.attachEvent("onXLE", function() {
                  setTimeout(function() {
                    showEvent(p.event);
                  });
                  scheduler2.detachEvent(handler);
                });
              }
            } catch (e) {
            }
          }
          if (p.date || p.mode) {
            try {
              this.setCurrentView(p.date ? s2d(p.date) : null, p.mode || null);
            } catch (e) {
              this.setCurrentView(p.date ? s2d(p.date) : null, m);
            }
            return false;
          }
        }
        var values = ["date=" + d2s(d || od), "mode=" + (m || om)];
        if (select_event) {
          values.push("event=" + select_event);
        }
        var text = "#" + values.join(",");
        document.location.hash = text;
        return true;
      });
      function showEvent(e) {
        if (scheduler2.$destroyed) {
          return true;
        }
        select_event = e;
        if (scheduler2.getEvent(e)) {
          scheduler2.showEvent(e);
        }
      }
    });
  }
  function week_agenda_restricted(scheduler2) {
    notImplemented.alert("Week Agenda", scheduler2.assert);
  }
  function wp(scheduler2) {
    scheduler2.attachEvent("onLightBox", function() {
      if (this._cover) {
        try {
          this._cover.style.height = this.expanded ? "100%" : (document.body.parentNode || document.body).scrollHeight + "px";
        } catch (e) {
        }
      }
    });
    scheduler2.form_blocks.select.set_value = function(node, value, ev) {
      if (typeof value == "undefined" || value === "")
        value = (node.firstChild.options[0] || {}).value;
      node.firstChild.value = value || "";
    };
  }
  function year_view(scheduler2) {
    scheduler2.templates.year_date = function(date) {
      return scheduler2.date.date_to_str(scheduler2.locale.labels.year_tab + " %Y")(date);
    };
    scheduler2.templates.year_month = scheduler2.date.date_to_str("%F");
    scheduler2.templates.year_scale_date = scheduler2.date.date_to_str("%D");
    scheduler2.templates.year_tooltip = function(s, e, ev) {
      return ev.text;
    };
    const isYearMode = function() {
      return scheduler2._mode == "year";
    };
    const getCellDate = function(node) {
      var day = scheduler2.$domHelpers.closest(node, "[data-cell-date]");
      if (!day || !day.hasAttribute("data-cell-date"))
        return null;
      return scheduler2.templates.parse_date(day.getAttribute("data-cell-date"));
    };
    scheduler2.dblclick_dhx_year_grid = function(e) {
      if (isYearMode()) {
        const target = e.target;
        if (scheduler2.$domHelpers.closest(target, ".dhx_before") || scheduler2.$domHelpers.closest(target, ".dhx_after")) {
          return false;
        }
        const date = getCellDate(target);
        if (date) {
          const start = date;
          const end = this.date.add(start, 1, "day");
          if (!this.config.readonly && this.config.dblclick_create) {
            this.addEventNow(start.valueOf(), end.valueOf(), e);
          }
        }
      }
    };
    scheduler2.attachEvent("onEventIdChange", function() {
      if (isYearMode())
        this.year_view(true);
    });
    var old = scheduler2.render_data;
    scheduler2.render_data = function(evs) {
      if (!isYearMode())
        return old.apply(this, arguments);
      for (var i = 0; i < evs.length; i++)
        this._year_render_event(evs[i]);
    };
    var clear = scheduler2.clear_view;
    scheduler2.clear_view = function() {
      if (!isYearMode())
        return clear.apply(this, arguments);
      var dates = scheduler2._year_marked_cells, div = null;
      for (var date in dates) {
        if (dates.hasOwnProperty(date)) {
          div = dates[date];
          div.classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
        }
      }
      scheduler2._year_marked_cells = {};
    };
    scheduler2._hideToolTip = function() {
      if (this._tooltip) {
        this._tooltip.style.display = "none";
        this._tooltip.date = new Date(9999, 1, 1);
      }
    };
    scheduler2._showToolTip = function(date, pos, e, src) {
      if (this._tooltip) {
        if (this._tooltip.date.valueOf() == date.valueOf())
          return;
        this._tooltip.innerHTML = "";
      } else {
        var t2 = this._tooltip = document.createElement("div");
        t2.className = "dhx_year_tooltip";
        if (this.config.rtl)
          t2.className += " dhx_tooltip_rtl";
        document.body.appendChild(t2);
        t2.addEventListener("click", scheduler2._click.dhx_cal_data);
        t2.addEventListener("click", function(e2) {
          if (e2.target.closest(`[${scheduler2.config.event_attribute}]`)) {
            const id2 = e2.target.closest(`[${scheduler2.config.event_attribute}]`).getAttribute(scheduler2.config.event_attribute);
            scheduler2.showLightbox(id2);
          }
        });
      }
      var evs = this.getEvents(date, this.date.add(date, 1, "day"));
      var html = "";
      for (var i = 0; i < evs.length; i++) {
        var ev = evs[i];
        if (!this.filter_event(ev.id, ev))
          continue;
        var bg_color = ev.color ? "--dhx-scheduler-event-background:" + ev.color + ";" : "";
        var color = ev.textColor ? "--dhx-scheduler-event-color:" + ev.textColor + ";" : "";
        html += "<div class='dhx_tooltip_line' style='" + bg_color + color + "' event_id='" + evs[i].id + "' " + this.config.event_attribute + "='" + evs[i].id + "'>";
        html += "<div class='dhx_tooltip_date' style='" + bg_color + color + "'>" + (evs[i]._timed ? this.templates.event_date(evs[i].start_date) : "") + "</div>";
        html += "<div class='dhx_event_icon icon_details'>&nbsp;</div>";
        html += this.templates.year_tooltip(evs[i].start_date, evs[i].end_date, evs[i]) + "</div>";
      }
      this._tooltip.style.display = "";
      this._tooltip.style.top = "0px";
      if (document.body.offsetWidth - pos.left - this._tooltip.offsetWidth < 0)
        this._tooltip.style.left = pos.left - this._tooltip.offsetWidth + "px";
      else
        this._tooltip.style.left = pos.left + src.offsetWidth + "px";
      this._tooltip.date = date;
      this._tooltip.innerHTML = html;
      if (document.body.offsetHeight - pos.top - this._tooltip.offsetHeight < 0)
        this._tooltip.style.top = pos.top - this._tooltip.offsetHeight + src.offsetHeight + "px";
      else
        this._tooltip.style.top = pos.top + "px";
    };
    scheduler2._year_view_tooltip_handler = function(e) {
      if (!isYearMode())
        return;
      var src = e.target || e.srcElement;
      if (src.tagName.toLowerCase() == "a")
        src = src.parentNode;
      if (scheduler2._getClassName(src).indexOf("dhx_year_event") != -1)
        scheduler2._showToolTip(scheduler2.templates.parse_date(src.getAttribute("data-year-date")), scheduler2.$domHelpers.getOffset(src), e, src);
      else
        scheduler2._hideToolTip();
    };
    scheduler2._init_year_tooltip = function() {
      scheduler2._detachDomEvent(scheduler2._els["dhx_cal_data"][0], "mouseover", scheduler2._year_view_tooltip_handler);
      scheduler2.event(scheduler2._els["dhx_cal_data"][0], "mouseover", scheduler2._year_view_tooltip_handler);
    };
    scheduler2._get_year_cell = function(d) {
      var dateString = scheduler2.templates.format_date(d);
      var cells = this.$root.querySelectorAll(`.dhx_cal_data .dhx_cal_datepicker_date[data-cell-date="${dateString}"]`);
      for (var i = 0; i < cells.length; i++) {
        if (!scheduler2.$domHelpers.closest(cells[i], ".dhx_after, .dhx_before")) {
          return cells[i];
        }
      }
      return null;
    };
    scheduler2._year_marked_cells = {};
    scheduler2._mark_year_date = function(date, event2) {
      var dateString = scheduler2.templates.format_date(date);
      var cell = this._get_year_cell(date);
      if (!cell) {
        return;
      }
      var ev_class = this.templates.event_class(event2.start_date, event2.end_date, event2);
      if (!scheduler2._year_marked_cells[dateString]) {
        cell.classList.add("dhx_year_event", "dhx_cal_datepicker_event");
        cell.setAttribute("data-year-date", dateString);
        cell.setAttribute("date", dateString);
        scheduler2._year_marked_cells[dateString] = cell;
      }
      if (ev_class) {
        cell.classList.add(ev_class);
      }
    };
    scheduler2._unmark_year_date = function(date) {
      var cell = this._get_year_cell(date);
      if (!cell) {
        return;
      }
      cell.classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
    };
    scheduler2._year_render_event = function(event2) {
      var date = event2.start_date;
      if (date.valueOf() < this._min_date.valueOf()) {
        date = this._min_date;
      } else {
        date = this.date.date_part(new Date(date));
      }
      while (date < event2.end_date) {
        this._mark_year_date(date, event2);
        date = this.date.add(date, 1, "day");
        if (date.valueOf() >= this._max_date.valueOf())
          return;
      }
    };
    scheduler2.year_view = function(mode) {
      scheduler2.set_sizes();
      scheduler2._table_view = mode;
      if (this._load_mode && this._load())
        return;
      if (mode) {
        scheduler2._init_year_tooltip();
        scheduler2._reset_year_scale();
        if (scheduler2._load_mode && scheduler2._load()) {
          scheduler2._render_wait = true;
          return;
        }
        scheduler2.render_view_data();
      } else {
        scheduler2._hideToolTip();
      }
    };
    scheduler2._reset_year_scale = function() {
      var dataArea = this._els["dhx_cal_data"][0];
      dataArea.scrollTop = 0;
      dataArea.innerHTML = "";
      let yearStart = this.date.year_start(new Date(this._date));
      this._min_date = this.date.week_start(new Date(yearStart));
      const wrapper = document.createElement("div");
      wrapper.classList.add("dhx_year_wrapper");
      let currentDate = yearStart;
      for (let i = 0; i < 12; i++) {
        let yearBox = document.createElement("div");
        yearBox.className = "dhx_year_box";
        yearBox.setAttribute("date", this._helpers.formatDate(currentDate));
        yearBox.setAttribute("data-month-date", this._helpers.formatDate(currentDate));
        yearBox.innerHTML = `<div class='dhx_year_month'>${this.templates.year_month(currentDate)}</div>
			<div class='dhx_year_grid'></div>`;
        const yearGrid = yearBox.querySelector(".dhx_year_grid");
        const datepicker = scheduler2._createDatePicker(null, { date: currentDate, filterDays: scheduler2.ignore_year, minWeeks: 6 });
        datepicker._renderDayGrid(yearGrid);
        datepicker.destructor();
        wrapper.appendChild(yearBox);
        currentDate = this.date.add(currentDate, 1, "month");
      }
      dataArea.appendChild(wrapper);
      let lastDate = this.date.add(yearStart, 1, "year");
      if (lastDate.valueOf() != this.date.week_start(new Date(lastDate)).valueOf()) {
        lastDate = this.date.week_start(new Date(lastDate));
        lastDate = this.date.add(lastDate, 1, "week");
      }
      this._max_date = lastDate;
      var dateElement = this._getNavDateElement();
      if (dateElement) {
        dateElement.innerHTML = this.templates[this._mode + "_date"](yearStart, lastDate, this._mode);
      }
    };
    var getActionData = scheduler2.getActionData;
    scheduler2.getActionData = function(n_ev) {
      if (!isYearMode()) {
        return getActionData.apply(scheduler2, arguments);
      }
      var date = getCellDate(n_ev.target);
      return { date, section: null };
    };
    var locateEvent = scheduler2._locate_event;
    scheduler2._locate_event = function(node) {
      var id2 = locateEvent.apply(scheduler2, arguments);
      if (!id2) {
        var date = getCellDate(node);
        if (!date)
          return null;
        var evs = scheduler2.getEvents(date, scheduler2.date.add(date, 1, "day"));
        if (!evs.length)
          return null;
        id2 = evs[0].id;
      }
      return id2;
    };
    scheduler2.attachEvent("onDestroy", function() {
      scheduler2._hideToolTip();
    });
  }
  function export_api(scheduler2) {
    (function() {
      function defaults(obj, std) {
        for (var key in std)
          if (!obj[key])
            obj[key] = std[key];
        return obj;
      }
      function getElementSizes(element, scheduler3) {
        var sizes = {};
        element = scheduler3._els[element];
        if (element && element[0]) {
          sizes.x = element[0].scrollWidth;
          sizes.y = element[0].scrollHeight;
        } else {
          sizes.x = 0;
          sizes.y = 0;
        }
        return sizes;
      }
      if (!window.dhtmlxAjax) {
        window.dhtmlxAjax = { post: function(url2, data, callback) {
          return window.dhx4.ajax.post(url2, data, callback);
        }, get: function(url2, callback) {
          return window.ajax.get(url2, callback);
        } };
      }
      function add_export_methods(scheduler3) {
        scheduler3.exportToPDF = function(config) {
          config = defaults(config || {}, { name: "calendar.pdf", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: scheduler3.config.rtl });
          config.html = this._export_html(config);
          config.mode = this.getState().mode;
          this._send_to_export(config, "pdf");
        };
        scheduler3.exportToPNG = function(config) {
          config = defaults(config || {}, { name: "calendar.png", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: scheduler3.config.rtl });
          config.html = this._export_html(config);
          config.mode = this.getState().mode;
          this._send_to_export(config, "png");
        };
        scheduler3.exportToICal = function(config) {
          config = defaults(config || {}, { name: "calendar.ical", data: this._serialize_plain(null, config) });
          this._send_to_export(config, "ical");
        };
        scheduler3.exportToExcel = function(config) {
          config = defaults(config || {}, { name: "calendar.xlsx", title: "Events", data: this._serialize_plain(this.templates.xml_format, config), columns: this._serialize_columns() });
          this._send_to_export(config, "excel");
        };
        scheduler3._ajax_to_export = function(data, type, callback) {
          delete data.callback;
          var url2 = data.server || "https://export.dhtmlx.com/scheduler";
          window.dhtmlxAjax.post(url2, "type=" + type + "&store=1&data=" + encodeURIComponent(JSON.stringify(data)), function(loader) {
            var fail = loader.xmlDoc.status > 400;
            var info = null;
            if (!fail) {
              try {
                info = JSON.parse(loader.xmlDoc.responseText);
              } catch (e) {
              }
            }
            callback(info);
          });
        };
        scheduler3._plain_export_copy = function(source, format) {
          var target = {};
          for (var key in source)
            target[key] = source[key];
          target.start_date = format(target.start_date);
          target.end_date = format(target.end_date);
          target.$text = this.templates.event_text(source.start_date, source.end_date, source);
          return target;
        };
        scheduler3._serialize_plain = function(format, config) {
          format = format || scheduler3.date.date_to_str("%Y%m%dT%H%i%s", true);
          var events;
          if (config && config.start && config.end)
            events = scheduler3.getEvents(config.start, config.end);
          else
            events = scheduler3.getEvents();
          var data = [];
          for (var i = 0; i < events.length; i++)
            data[i] = this._plain_export_copy(events[i], format);
          return data;
        };
        scheduler3._serialize_columns = function() {
          return [{ id: "start_date", header: "Start Date", width: 30 }, { id: "end_date", header: "End Date", width: 30 }, { id: "$text", header: "Text", width: 100 }];
        };
        scheduler3._send_to_export = function(data, type) {
          if (!data.version) {
            data.version = scheduler3.version;
          }
          if (!data.skin) {
            data.skin = scheduler3.skin;
          }
          if (data.callback)
            return scheduler3._ajax_to_export(data, type, data.callback);
          var form = this._create_hidden_form();
          form.firstChild.action = data.server || "https://export.dhtmlx.com/scheduler";
          form.firstChild.childNodes[0].value = JSON.stringify(data);
          form.firstChild.childNodes[1].value = type;
          form.firstChild.submit();
        };
        scheduler3._create_hidden_form = function() {
          if (!this._hidden_export_form) {
            var t2 = this._hidden_export_form = document.createElement("div");
            t2.style.display = "none";
            t2.innerHTML = "<form method='POST' target='_blank'><input type='text' name='data'><input type='hidden' name='type' value=''></form>";
            document.body.appendChild(t2);
          }
          return this._hidden_export_form;
        };
        scheduler3._get_export_size = function(format, orientation, zoom, dpi, header, footer, scales) {
          dpi = parseInt(dpi) / 25.4 || 4;
          var sizes = { A5: { x: 148, y: 210 }, A4: { x: 210, y: 297 }, A3: { x: 297, y: 420 }, A2: { x: 420, y: 594 }, A1: { x: 594, y: 841 }, A0: { x: 841, y: 1189 } };
          var dataX = getElementSizes("dhx_cal_data", this).x;
          var dataY = getElementSizes("dhx_cal_data", this).y;
          var headY = getElementSizes("dhx_cal_header", this).y;
          var multY = getElementSizes("dhx_multi_day", this).y;
          var cSize = { y: dataY + headY + multY };
          if (format === "full") {
            cSize.x = dataX;
          } else {
            cSize.x = Math.floor((orientation === "landscape" ? sizes[format].y : sizes[format].x) * dpi);
          }
          if (scales) {
            cSize.x *= parseFloat(scales.x) || 1;
            cSize.y *= parseFloat(scales.y) || 1;
          }
          return cSize;
        };
        function getTimeline() {
          var mode = scheduler3.getState().mode;
          if (scheduler3.matrix && scheduler3.matrix[mode]) {
            return scheduler3.matrix[mode];
          }
          return null;
        }
        function getInitialSizes() {
          var smartRendering = void 0, scrollable = void 0;
          var timeline = getTimeline();
          if (timeline) {
            scrollable = timeline.scrollable;
            smartRendering = timeline.smart_rendering;
          }
          return { nav_height: scheduler3.xy.nav_height, scroll_width: scheduler3.xy.scroll_width, style_width: scheduler3._obj.style.width, style_height: scheduler3._obj.style.height, timeline_scrollable: scrollable, timeline_smart_rendering: smartRendering };
        }
        function setExportSizes(size, initialSizes) {
          scheduler3._obj.style.width = size.x + "px";
          scheduler3._obj.style.height = size.y + "px";
          scheduler3.xy.nav_height = 0;
          scheduler3.xy.scroll_width = 0;
          var timeline = getTimeline();
          if (initialSizes.timeline_scrollable || initialSizes.timeline_smart_rendering) {
            timeline.scrollable = false;
            timeline.smart_rendering = false;
          }
        }
        function setInitialSizes(initialSizes) {
          scheduler3.xy.scroll_width = initialSizes.scroll_width;
          scheduler3.xy.nav_height = initialSizes.nav_height;
          scheduler3._obj.style.width = initialSizes.style_width;
          scheduler3._obj.style.height = initialSizes.style_height;
          var timeline = getTimeline();
          if (initialSizes.timeline_scrollable || initialSizes.timeline_smart_rendering) {
            timeline.scrollable = initialSizes.timeline_scrollable;
            timeline.smart_rendering = initialSizes.timeline_smart_rendering;
          }
        }
        scheduler3._export_html = function(obj) {
          var initialSizes = getInitialSizes();
          var size = scheduler3._get_export_size(obj.format, obj.orientation, obj.zoom, obj.dpi, obj.header, obj.footer, obj.scales);
          var html = "";
          try {
            setExportSizes(size, initialSizes);
            scheduler3.setCurrentView();
            html = scheduler3._obj.innerHTML;
          } catch (e) {
            console.error(e);
          } finally {
            setInitialSizes(initialSizes);
            scheduler3.setCurrentView();
          }
          return html;
        };
      }
      add_export_methods(scheduler2);
    })();
  }
  const gplExtensions = { active_links, agenda_legacy, agenda_view, all_timed, collision, container_autoresize, cookie, daytimeline: daytimeline_restricted, drag_between: drag_between_restricted, editors, expand, export_api, grid_view, html_templates, key_nav, layer, limit, map_view, minical, monthheight, multisection: multisection_restricted, multiselect, multisource, mvc, outerdrag, pdf, quick_info, readonly, recurring, recurring_legacy, serialize, timeline: timeline_restricted, tooltip, treetimeline: treetimeline_restricted, units: units_restricted, url, week_agenda: week_agenda_restricted, wp, year_view };
  const factory = new SchedulerFactory(gplExtensions);
  const scheduler = factory.getSchedulerInstance();
  const Scheduler$1 = { plugin: scheduler.bind(factory.plugin, factory) };
  window.scheduler = scheduler;
  window.Scheduler = Scheduler$1;
  if (!window.$dhx) {
    window.$dhx = {};
  }
  window.$dhx.scheduler = scheduler;
  window.$dhx.Scheduler = Scheduler$1;
  exports2.Scheduler = Scheduler$1;
  exports2.default = scheduler;
  exports2.scheduler = scheduler;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
//# sourceMappingURL=dhtmlxscheduler.js.map

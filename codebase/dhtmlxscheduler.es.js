/** @license

dhtmlxScheduler v.7.2.16 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
const _e = typeof window < "u" ? window : global;
function Ot(e) {
  let o = [], t = !1, n = null, d = null;
  function a() {
    return e.config.drag_highlight && e.markTimespan;
  }
  function s(l) {
    const _ = e.getView(l);
    return _ ? _.layout : l;
  }
  function i(l) {
    const { event: _, layout: c, viewName: h, sectionId: p, eventNode: f } = l;
    (function(m, x) {
      switch (x) {
        case "month":
          m.style.top = "", m.style.left = "";
          break;
        case "timeline":
          m.style.left = "", m.style.marginLeft = "1px";
          break;
        default:
          m.style.top = "";
      }
    })(f, c);
    const u = {};
    let v = { start_date: _.start_date, end_date: _.end_date, css: "dhx_scheduler_dnd_marker", html: f };
    if (c == "timeline") {
      const m = e.getView(h);
      if (m.round_position) {
        const x = e._get_date_index(m, _.start_date), w = m._trace_x[x];
        v.start_date = w;
      }
    }
    return c != "timeline" && c != "month" || (v = { ...v, end_date: e.date.add(_.start_date, 1, "minute") }), p && (u[h] = p, v.sections = u), v;
  }
  function r(l) {
    const { layout: _ } = l;
    let c;
    switch (_) {
      case "month":
        c = function(h) {
          let p = [];
          const { event: f, layout: u, viewName: v, sectionId: m } = h, x = [];
          let w = new Date(f.start_date);
          for (; w.valueOf() < f.end_date.valueOf(); ) {
            let N = { start_date: w };
            x.push(N), w = e.date.week_start(e.date.add(w, 1, "week"));
          }
          let S = e.$container.querySelectorAll(`[${e.config.event_attribute}='${f.id}']`);
          for (let N = 0; N < S.length; N++) {
            const E = { event: x[N], layout: u, viewName: v, sectionId: m, eventNode: S[N].cloneNode(!0) };
            p.push(i(E));
          }
          return p;
        }(l);
        break;
      case "timeline":
      case "units":
        c = function(h) {
          let p = [];
          const { event: f, layout: u, viewName: v, eventNode: m } = h;
          let x = function(w) {
            const S = e.getView(w);
            return S.y_property ? S.y_property : S.map_to ? S.map_to : void 0;
          }(v);
          if (x) {
            const w = String(f[x]).split(e.config.section_delimiter).map((N) => String(N)), S = [];
            for (let N = 0; N < w.length; N++) {
              S[N] = m.cloneNode(!0);
              const E = { event: f, layout: u, viewName: v, sectionId: w[N], eventNode: S[N] };
              p.push(i(E));
            }
          }
          return p;
        }(l);
        break;
      default:
        c = function(h) {
          const { event: p, layout: f, viewName: u, sectionId: v } = h;
          let m = [], x = e.$container.querySelectorAll(`[${e.config.event_attribute}='${p.id}']:not(.dhx_cal_select_menu):not(.dhx_drag_marker)`);
          if (x)
            for (let w = 0; w < x.length; w++) {
              let S = x[w].cloneNode(!0);
              const N = { event: { start_date: /* @__PURE__ */ new Date(+S.getAttribute("data-bar-start")), end_date: /* @__PURE__ */ new Date(+S.getAttribute("data-bar-end")) }, layout: f, viewName: u, sectionId: v, eventNode: S };
              m.push(i(N));
            }
          return m;
        }(l);
    }
    c.forEach((h) => {
      o.push(e.markTimespan(h));
    });
  }
  e.attachEvent("onBeforeDrag", function(l, _, c) {
    return a() && (t = !0, d = e.getEvent(l), n = c.target.closest(`[${e.config.event_attribute}]`), s(e.getState().mode) == "units" && e.config.cascade_event_display && (e.unselect(l), n = c.target.closest(`[${e.config.event_attribute}]`))), !0;
  }), e.attachEvent("onEventDrag", function(l, _, c) {
    if (t && a()) {
      t = !1;
      const h = e.getState().mode, p = s(h), f = e.getActionData(c).section;
      d && r({ event: d, layout: p, viewName: h, sectionId: f, eventNode: n });
    }
  }), e.attachEvent("onDragEnd", function(l, _, c) {
    for (let h = 0; h < o.length; h++)
      e.unmarkTimespan(o[h]);
    o = [], n = null, d = null;
  });
}
function Lt(e) {
  e.config.mark_now = !0, e.config.display_marked_timespans = !0, e.config.overwrite_marked_timespans = !0;
  var o = "dhx_time_block", t = "default", n = function(a, s, i) {
    var r = typeof a == "object" ? a : { days: a };
    return r.type = o, r.css = "", s && (i && (r.sections = i), r = function(l, _, c) {
      return _ instanceof Date && c instanceof Date ? (l.start_date = _, l.end_date = c) : (l.days = _, l.zones = c), l;
    }(r, a, s)), r;
  };
  function d(a, s, i, r, l) {
    var _ = e, c = [], h = { _props: "map_to", matrix: "y_property" };
    for (var p in h) {
      var f = h[p];
      if (_[p])
        for (var u in _[p]) {
          var v = _[p][u][f];
          a[v] && (c = _._add_timespan_zones(c, e._get_blocked_zones(s[u], a[v], i, r, l)));
        }
    }
    return c = _._add_timespan_zones(c, e._get_blocked_zones(s, "global", i, r, l));
  }
  e.blockTime = function(a, s, i) {
    var r = n(a, s, i);
    return e.addMarkedTimespan(r);
  }, e.unblockTime = function(a, s, i) {
    var r = n(a, s = s || "fullday", i);
    return e.deleteMarkedTimespan(r);
  }, e.checkInMarkedTimespan = function(a, s, i) {
    s = s || t;
    for (var r = !0, l = new Date(a.start_date.valueOf()), _ = e.date.add(l, 1, "day"), c = e._marked_timespans; l < a.end_date; l = e.date.date_part(_), _ = e.date.add(l, 1, "day")) {
      var h = +e.date.date_part(new Date(l)), p = d(a, c, l.getDay(), h, s);
      if (p)
        for (var f = 0; f < p.length; f += 2) {
          var u = e._get_zone_minutes(l), v = a.end_date > _ || a.end_date.getDate() != l.getDate() ? 1440 : e._get_zone_minutes(a.end_date), m = p[f], x = p[f + 1];
          if (m < v && x > u && !(r = typeof i == "function" && i(a, u, v, m, x)))
            break;
        }
    }
    return !r;
  }, e.checkLimitViolation = function(a) {
    if (!a || !e.config.check_limits)
      return !0;
    var s = e, i = s.config, r = [];
    if (a.rec_type && a._end_date || a.rrule) {
      const p = a._end_date || a.end_date;
      return !i.limit_start || !i.limit_end || p.valueOf() >= i.limit_start.valueOf() && a.start_date.valueOf() <= i.limit_end.valueOf();
    }
    r = [a];
    for (var l = !0, _ = 0; _ < r.length; _++) {
      var c = !0, h = r[_];
      h._timed = e.isOneDayEvent(h), (c = !i.limit_start || !i.limit_end || h.start_date.valueOf() >= i.limit_start.valueOf() && h.end_date.valueOf() <= i.limit_end.valueOf()) && (c = !e.checkInMarkedTimespan(h, o, function(p, f, u, v, m) {
        var x = !0;
        return f <= m && f >= v && ((m == 1440 || u <= m) && (x = !1), p._timed && s._drag_id && s._drag_mode == "new-size" ? (p.start_date.setHours(0), p.start_date.setMinutes(m)) : x = !1), (u >= v && u <= m || f < v && u > m) && (p._timed && s._drag_id && s._drag_mode == "new-size" ? (p.end_date.setHours(0), p.end_date.setMinutes(v)) : x = !1), x;
      })), c || (c = s.checkEvent("onLimitViolation") ? s.callEvent("onLimitViolation", [h.id, h]) : c), l = l && c;
    }
    return l || (s._drag_id = null, s._drag_mode = null), l;
  }, e._get_blocked_zones = function(a, s, i, r, l) {
    var _ = [];
    if (a && a[s])
      for (var c = a[s], h = this._get_relevant_blocked_zones(i, r, c, l), p = 0; p < h.length; p++)
        _ = this._add_timespan_zones(_, h[p].zones);
    return _;
  }, e._get_relevant_blocked_zones = function(a, s, i, r) {
    var l;
    return e.config.overwrite_marked_timespans ? l = i[s] && i[s][r] ? i[s][r] : i[a] && i[a][r] ? i[a][r] : [] : (l = [], i[s] && i[s][r] && (l = l.concat(i[s][r])), i[a] && i[a][r] && (l = l.concat(i[a][r]))), l;
  }, e._mark_now = function(a) {
    var s = "dhx_now_time";
    this._els[s] || (this._els[s] = []);
    var i = e._currentDate(), r = this.config;
    if (e._remove_mark_now(), !a && r.mark_now && i < this._max_date && i > this._min_date && i.getHours() >= r.first_hour && i.getHours() < r.last_hour) {
      var l = this.locate_holder_day(i);
      this._els[s] = e._append_mark_now(l, i);
    }
  }, e._append_mark_now = function(a, s) {
    var i = "dhx_now_time", r = e._get_zone_minutes(s), l = { zones: [r, r + 1], css: i, type: i };
    if (!this._table_view) {
      if (this._props && this._props[this._mode]) {
        var _, c, h = this._props[this._mode], p = h.size || h.options.length;
        h.days > 1 ? (h.size && h.options.length && (a = (h.position + a) / h.options.length * h.size), _ = a, c = a + p) : c = (_ = 0) + p;
        for (var f = [], u = _; u < c; u++) {
          var v = u;
          l.days = v;
          var m = e._render_marked_timespan(l, null, v)[0];
          f.push(m);
        }
        return f;
      }
      return l.days = a, e._render_marked_timespan(l, null, a);
    }
    if (this._mode == "month")
      return l.days = +e.date.date_part(s), e._render_marked_timespan(l, null, null);
  }, e._remove_mark_now = function() {
    for (var a = "dhx_now_time", s = this._els[a], i = 0; i < s.length; i++) {
      var r = s[i], l = r.parentNode;
      l && l.removeChild(r);
    }
    this._els[a] = [];
  }, e._marked_timespans = { global: {} }, e._get_zone_minutes = function(a) {
    return 60 * a.getHours() + a.getMinutes();
  }, e._prepare_timespan_options = function(a) {
    var s = [], i = [];
    if (a.days == "fullweek" && (a.days = [0, 1, 2, 3, 4, 5, 6]), a.days instanceof Array) {
      for (var r = a.days.slice(), l = 0; l < r.length; l++) {
        var _ = e._lame_clone(a);
        _.days = r[l], s.push.apply(s, e._prepare_timespan_options(_));
      }
      return s;
    }
    if (!a || !(a.start_date && a.end_date && a.end_date > a.start_date || a.days !== void 0 && a.zones) && !a.type)
      return s;
    a.zones == "fullday" && (a.zones = [0, 1440]), a.zones && a.invert_zones && (a.zones = e.invertZones(a.zones)), a.id = e.uid(), a.css = a.css || "", a.type = a.type || t;
    var c = a.sections;
    if (c) {
      for (var h in c)
        if (c.hasOwnProperty(h)) {
          var p = c[h];
          for (p instanceof Array || (p = [p]), l = 0; l < p.length; l++)
            (S = e._lame_copy({}, a)).sections = {}, S.sections[h] = p[l], i.push(S);
        }
    } else
      i.push(a);
    for (var f = 0; f < i.length; f++) {
      var u = i[f], v = u.start_date, m = u.end_date;
      if (v && m)
        for (var x = e.date.date_part(new Date(v)), w = e.date.add(x, 1, "day"); x < m; ) {
          var S;
          delete (S = e._lame_copy({}, u)).start_date, delete S.end_date, S.days = x.valueOf();
          var N = v > x ? e._get_zone_minutes(v) : 0, E = m > w || m.getDate() != x.getDate() ? 1440 : e._get_zone_minutes(m);
          S.zones = [N, E], s.push(S), x = w, w = e.date.add(w, 1, "day");
        }
      else
        u.days instanceof Date && (u.days = e.date.date_part(u.days).valueOf()), u.zones = a.zones.slice(), s.push(u);
    }
    return s;
  }, e._get_dates_by_index = function(a, s, i) {
    var r = [];
    s = e.date.date_part(new Date(s || e._min_date)), i = new Date(i || e._max_date);
    for (var l = s.getDay(), _ = a - l >= 0 ? a - l : 7 - s.getDay() + a, c = e.date.add(s, _, "day"); c < i; c = e.date.add(c, 1, "week"))
      r.push(c);
    return r;
  }, e._get_css_classes_by_config = function(a) {
    var s = [];
    return a.type == o && (s.push(o), a.css && s.push(o + "_reset")), s.push("dhx_marked_timespan", a.css), s.join(" ");
  }, e._get_block_by_config = function(a) {
    var s = document.createElement("div");
    if (a.html) {
      let i = a.html;
      typeof i == "function" && (i = i(a)), typeof i == "string" ? s.innerHTML = a.html : e.config.external_render && e.config.external_render.isElement(i) ? e.config.external_render.renderElement(i, s) : s.appendChild(i);
    }
    return s;
  }, e._render_marked_timespan = function(a, s, i) {
    var r = [], l = e.config, _ = this._min_date, c = this._max_date, h = !1;
    if (!l.display_marked_timespans)
      return r;
    if (!i && i !== 0) {
      if (a.days < 7)
        i = a.days;
      else {
        var p = new Date(a.days);
        if (h = +p, !(+c > +p && +_ <= +p))
          return r;
        i = p.getDay();
      }
      var f = _.getDay();
      f > i ? i = 7 - (f - i) : i -= f;
    }
    var u = a.zones, v = e._get_css_classes_by_config(a);
    if (e._table_view && e._mode == "month") {
      var m = [], x = [];
      if (s)
        m.push(s), x.push(i);
      else {
        x = h ? [h] : e._get_dates_by_index(i);
        for (var w = 0; w < x.length; w++)
          m.push(this._scales[x[w]]);
      }
      for (w = 0; w < m.length; w++) {
        s = m[w], i = x[w];
        var S = this.locate_holder_day(i, !1) % this._cols.length;
        if (!this._ignores[S]) {
          var N = e._get_block_by_config(a);
          N.className = v, N.style.top = "0px", N.style.height = "100%";
          for (var E = 0; E < u.length; E += 2) {
            var T = u[w];
            if ((k = u[w + 1]) <= T)
              return [];
            (D = N.cloneNode(!0)).style.left = "0px", D.style.width = "100%", s.appendChild(D), r.push(D);
          }
        }
      }
    } else {
      var g = i;
      if (this._ignores[this.locate_holder_day(i, !1)])
        return r;
      if (this._props && this._props[this._mode] && a.sections && a.sections[this._mode]) {
        var b = this._props[this._mode];
        g = b.order[a.sections[this._mode]];
        var y = b.order[a.sections[this._mode]];
        b.days > 1 ? g = g * (b.size || b.options.length) + y : (g = y, b.size && g > b.position + b.size && (g = 0));
      }
      for (s = s || e.locate_holder(g), w = 0; w < u.length; w += 2) {
        var k, D;
        if (T = Math.max(u[w], 60 * l.first_hour), (k = Math.min(u[w + 1], 60 * l.last_hour)) <= T) {
          if (w + 2 < u.length)
            continue;
          return [];
        }
        (D = e._get_block_by_config(a)).className = v;
        var M = 24 * this.config.hour_size_px + 1, C = 36e5;
        D.style.top = Math.round((60 * T * 1e3 - this.config.first_hour * C) * this.config.hour_size_px / C) % M + "px", D.style.height = Math.max(Math.round(60 * (k - T) * 1e3 * this.config.hour_size_px / C) % M, 1) + "px", s.appendChild(D), r.push(D);
      }
    }
    return r;
  }, e._mark_timespans = function() {
    var a = this._els.dhx_cal_data[0], s = [];
    if (e._table_view && e._mode == "month")
      for (var i in this._scales) {
        var r = /* @__PURE__ */ new Date(+i);
        s.push.apply(s, e._on_scale_add_marker(this._scales[i], r));
      }
    else {
      r = new Date(e._min_date);
      for (var l = 0, _ = a.childNodes.length; l < _; l++) {
        var c = a.childNodes[l];
        c.firstChild && e._getClassName(c.firstChild).indexOf("dhx_scale_hour") > -1 || (s.push.apply(s, e._on_scale_add_marker(c, r)), r = e.date.add(r, 1, "day"));
      }
    }
    return s;
  }, e.markTimespan = function(a) {
    if (!this._els)
      throw new Error("`scheduler.markTimespan` can't be used before scheduler initialization. Place `scheduler.markTimespan` call after `scheduler.init`.");
    var s = !1;
    this._els.dhx_cal_data || (e.get_elements(), s = !0);
    var i = e._marked_timespans_ids, r = e._marked_timespans_types, l = e._marked_timespans;
    e.deleteMarkedTimespan(), e.addMarkedTimespan(a);
    var _ = e._mark_timespans();
    return s && (e._els = []), e._marked_timespans_ids = i, e._marked_timespans_types = r, e._marked_timespans = l, _;
  }, e.unmarkTimespan = function(a) {
    if (a)
      for (var s = 0; s < a.length; s++) {
        var i = a[s];
        i.parentNode && i.parentNode.removeChild(i);
      }
  }, e._addMarkerTimespanConfig = function(a) {
    var s = "global", i = e._marked_timespans, r = a.id, l = e._marked_timespans_ids;
    l[r] || (l[r] = []);
    var _ = a.days, c = a.sections, h = a.type;
    if (a.id = r, c) {
      for (var p in c)
        if (c.hasOwnProperty(p)) {
          i[p] || (i[p] = {});
          var f = c[p], u = i[p];
          u[f] || (u[f] = {}), u[f][_] || (u[f][_] = {}), u[f][_][h] || (u[f][_][h] = [], e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[h] || (e._marked_timespans_types[h] = !0));
          var v = u[f][_][h];
          a._array = v, v.push(a), l[r].push(a);
        }
    } else
      i[s][_] || (i[s][_] = {}), i[s][_][h] || (i[s][_][h] = []), e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[h] || (e._marked_timespans_types[h] = !0), v = i[s][_][h], a._array = v, v.push(a), l[r].push(a);
  }, e._marked_timespans_ids = {}, e.addMarkedTimespan = function(a) {
    var s = e._prepare_timespan_options(a);
    if (s.length) {
      for (var i = s[0].id, r = 0; r < s.length; r++)
        e._addMarkerTimespanConfig(s[r]);
      return i;
    }
  }, e._add_timespan_zones = function(a, s) {
    var i = a.slice();
    if (s = s.slice(), !i.length)
      return s;
    for (var r = 0; r < i.length; r += 2)
      for (var l = i[r], _ = i[r + 1], c = r + 2 == i.length, h = 0; h < s.length; h += 2) {
        var p = s[h], f = s[h + 1];
        if (f > _ && p <= _ || p < l && f >= l)
          i[r] = Math.min(l, p), i[r + 1] = Math.max(_, f), r -= 2;
        else {
          if (!c)
            continue;
          var u = l > p ? 0 : 2;
          i.splice(r + u, 0, p, f);
        }
        s.splice(h--, 2);
        break;
      }
    return i;
  }, e._subtract_timespan_zones = function(a, s) {
    for (var i = a.slice(), r = 0; r < i.length; r += 2)
      for (var l = i[r], _ = i[r + 1], c = 0; c < s.length; c += 2) {
        var h = s[c], p = s[c + 1];
        if (p > l && h < _) {
          var f = !1;
          l >= h && _ <= p && i.splice(r, 2), l < h && (i.splice(r, 2, l, h), f = !0), _ > p && i.splice(f ? r + 2 : r, f ? 0 : 2, p, _), r -= 2;
          break;
        }
      }
    return i;
  }, e.invertZones = function(a) {
    return e._subtract_timespan_zones([0, 1440], a.slice());
  }, e._delete_marked_timespan_by_id = function(a) {
    var s = e._marked_timespans_ids[a];
    if (s) {
      for (var i = 0; i < s.length; i++)
        for (var r = s[i], l = r._array, _ = 0; _ < l.length; _++)
          if (l[_] == r) {
            l.splice(_, 1);
            break;
          }
    }
  }, e._delete_marked_timespan_by_config = function(a) {
    var s, i = e._marked_timespans, r = a.sections, l = a.days, _ = a.type || t;
    if (r) {
      for (var c in r)
        if (r.hasOwnProperty(c) && i[c]) {
          var h = r[c];
          i[c][h] && (s = i[c][h]);
        }
    } else
      s = i.global;
    if (s) {
      if (l !== void 0)
        s[l] && s[l][_] && (e._addMarkerTimespanConfig(a), e._delete_marked_timespans_list(s[l][_], a));
      else
        for (var p in s)
          if (s[p][_]) {
            var f = e._lame_clone(a);
            a.days = p, e._addMarkerTimespanConfig(f), e._delete_marked_timespans_list(s[p][_], a);
          }
    }
  }, e._delete_marked_timespans_list = function(a, s) {
    for (var i = 0; i < a.length; i++) {
      var r = a[i], l = e._subtract_timespan_zones(r.zones, s.zones);
      if (l.length)
        r.zones = l;
      else {
        a.splice(i, 1), i--;
        for (var _ = e._marked_timespans_ids[r.id], c = 0; c < _.length; c++)
          if (_[c] == r) {
            _.splice(c, 1);
            break;
          }
      }
    }
  }, e.deleteMarkedTimespan = function(a) {
    if (arguments.length || (e._marked_timespans = { global: {} }, e._marked_timespans_ids = {}, e._marked_timespans_types = {}), typeof a != "object")
      e._delete_marked_timespan_by_id(a);
    else {
      a.start_date && a.end_date || (a.days !== void 0 || a.type || (a.days = "fullweek"), a.zones || (a.zones = "fullday"));
      var s = [];
      if (a.type)
        s.push(a.type);
      else
        for (var i in e._marked_timespans_types)
          s.push(i);
      for (var r = e._prepare_timespan_options(a), l = 0; l < r.length; l++)
        for (var _ = r[l], c = 0; c < s.length; c++) {
          var h = e._lame_clone(_);
          h.type = s[c], e._delete_marked_timespan_by_config(h);
        }
    }
  }, e._get_types_to_render = function(a, s) {
    var i = a ? e._lame_copy({}, a) : {};
    for (var r in s || {})
      s.hasOwnProperty(r) && (i[r] = s[r]);
    return i;
  }, e._get_configs_to_render = function(a) {
    var s = [];
    for (var i in a)
      a.hasOwnProperty(i) && s.push.apply(s, a[i]);
    return s;
  }, e._on_scale_add_marker = function(a, s) {
    if (!e._table_view || e._mode == "month") {
      var i = s.getDay(), r = s.valueOf(), l = this._mode, _ = e._marked_timespans, c = [], h = [];
      if (this._props && this._props[l]) {
        var p = this._props[l], f = p.options, u = f[e._get_unit_index(p, s)];
        if (p.days > 1) {
          var v = Math.round((s - e._min_date) / 864e5), m = p.size || f.length;
          s = e.date.add(e._min_date, Math.floor(v / m), "day"), s = e.date.date_part(s);
        } else
          s = e.date.date_part(new Date(this._date));
        if (i = s.getDay(), r = s.valueOf(), _[l] && _[l][u.key]) {
          var x = _[l][u.key], w = e._get_types_to_render(x[i], x[r]);
          c.push.apply(c, e._get_configs_to_render(w));
        }
      }
      var S = _.global;
      if (e.config.overwrite_marked_timespans) {
        var N = S[r] || S[i];
        c.push.apply(c, e._get_configs_to_render(N));
      } else
        S[r] && c.push.apply(c, e._get_configs_to_render(S[r])), S[i] && c.push.apply(c, e._get_configs_to_render(S[i]));
      for (var E = 0; E < c.length; E++)
        h.push.apply(h, e._render_marked_timespan(c[E], a, s));
      return h;
    }
  }, e.attachEvent("onScaleAdd", function() {
    e._on_scale_add_marker.apply(e, arguments);
  }), e.dblclick_dhx_marked_timespan = function(a, s) {
    e.callEvent("onScaleDblClick", [e.getActionData(a).date, s, a]), e.config.dblclick_create && e.addEventNow(e.getActionData(a).date, null, a);
  };
}
function $t(e) {
  var o = {}, t = !1;
  function n(r, l) {
    l = typeof l == "function" ? l : function() {
    }, o[r] || (o[r] = this[r], this[r] = l);
  }
  function d(r) {
    o[r] && (this[r] = o[r], o[r] = null);
  }
  function a(r) {
    for (var l in r)
      n.call(this, l, r[l]);
  }
  function s() {
    for (var r in o)
      d.call(this, r);
  }
  function i(r) {
    try {
      r();
    } catch (l) {
      window.console.error(l);
    }
  }
  return e.$stateProvider.registerProvider("batchUpdate", function() {
    return { batch_update: t };
  }, !1), function(r, l) {
    if (t)
      return void i(r);
    var _, c = this._dp && this._dp.updateMode != "off";
    c && (_ = this._dp.updateMode, this._dp.setUpdateMode("off"));
    const h = { setModeDate: { date: null, mode: null }, needRender: !1, needUpdateView: !1, repaintEvents: {} }, p = (u, v) => {
      u && (h.setModeDate.date = u), v && (h.setModeDate.mode = v);
    };
    var f = { render: (u, v) => {
      h.needRender = !0, p(u, v);
    }, setCurrentView: (u, v) => {
      h.needRender = !0, p(u, v);
    }, updateView: (u, v) => {
      h.needUpdateView = !0, p(u, v);
    }, render_data: () => h.needRender = !0, render_view_data: (u) => {
      u && u.length ? u.forEach((v) => h.repaintEvents[v.id] = !0) : h.needRender = !0;
    } };
    if (a.call(this, f), t = !0, this.callEvent("onBeforeBatchUpdate", []), i(r), this.callEvent("onAfterBatchUpdate", []), s.call(this), t = !1, !l)
      if (h.needRender)
        e.render(h.setModeDate.date, h.setModeDate.mode);
      else if (h.needUpdateView)
        e.updateView(h.setModeDate.date, h.setModeDate.mode);
      else
        for (const u in h.repaintEvents)
          e.updateEvent(u);
    c && (this._dp.setUpdateMode(_), this._dp.sendData());
  };
}
class Ht {
  constructor(o) {
    const { url: t, token: n } = o;
    this._url = t, this._token = n, this._mode = 1, this._seed = 1, this._queue = [], this.data = {}, this.api = {}, this._events = {};
  }
  headers() {
    return { Accept: "application/json", "Content-Type": "application/json", "Remote-Token": this._token };
  }
  fetch(o, t) {
    const n = { credentials: "include", headers: this.headers() };
    return t && (n.method = "POST", n.body = t), fetch(o, n).then((d) => d.json());
  }
  load(o) {
    return o && (this._url = o), this.fetch(this._url).then((t) => this.parse(t));
  }
  parse(o) {
    const { key: t, websocket: n } = o;
    t !== void 0 && (this._token = t);
    for (const d in o.data)
      this.data[d] = o.data[d];
    for (const d in o.api) {
      const a = this.api[d] = {}, s = o.api[d];
      for (const i in s)
        a[i] = this._wrapper(d + "." + i);
    }
    return n && this.connect(), this;
  }
  connect() {
    const o = this._socket;
    o && (this._socket = null, o.onclose = function() {
    }, o.close()), this._mode = 2, this._socket = function(t, n, d, a) {
      let s = n;
      s[0] === "/" && (s = document.location.protocol + "//" + document.location.host + n), s = s.replace(/^http(s|):/, "ws$1:");
      const i = s.indexOf("?") != -1 ? "&" : "?";
      s = `${s}${i}token=${d}&ws=1`;
      const r = new WebSocket(s);
      return r.onclose = () => setTimeout(() => t.connect(), 2e3), r.onmessage = (l) => {
        const _ = JSON.parse(l.data);
        switch (_.action) {
          case "result":
            t.result(_.body, []);
            break;
          case "event":
            t.fire(_.body.name, _.body.value);
            break;
          case "start":
            a();
            break;
          default:
            t.onError(_.data);
        }
      }, r;
    }(this, this._url, this._token, () => {
      this._mode = 3, this._send(), this._resubscribe();
    });
  }
  _wrapper(o) {
    return (function() {
      const t = [].slice.call(arguments);
      let n = null;
      const d = new Promise((a, s) => {
        n = { data: { id: this._uid(), name: o, args: t }, status: 1, resolve: a, reject: s }, this._queue.push(n);
      });
      return n && this.onCall(n, d), n && this._mode === 3 ? this._send(n) : setTimeout(() => this._send(), 1), d;
    }).bind(this);
  }
  _uid() {
    return (this._seed++).toString();
  }
  _send(o) {
    if (this._mode == 2)
      return void setTimeout(() => this._send(), 100);
    const t = o ? [o] : this._queue.filter((d) => d.status === 1);
    if (!t.length)
      return;
    const n = t.map((d) => (d.status = 2, d.data));
    this._mode !== 3 ? this.fetch(this._url, JSON.stringify(n)).catch((d) => this.onError(d)).then((d) => this.result(d, n)) : this._socket.send(JSON.stringify({ action: "call", body: n }));
  }
  result(o, t) {
    const n = {};
    if (o)
      for (let d = 0; d < o.length; d++)
        n[o[d].id] = o[d];
    else
      for (let d = 0; d < t.length; d++)
        n[t[d].id] = { id: t[d].id, error: "Network Error", data: null };
    for (let d = this._queue.length - 1; d >= 0; d--) {
      const a = this._queue[d], s = n[a.data.id];
      s && (this.onResponse(a, s), s.error ? a.reject(s.error) : a.resolve(s.data), this._queue.splice(d, 1));
    }
  }
  on(o, t) {
    const n = this._uid();
    let d = this._events[o];
    const a = !!d;
    return a || (d = this._events[o] = []), d.push({ id: n, handler: t }), a || this._mode != 3 || this._socket.send(JSON.stringify({ action: "subscribe", name: o })), { name: o, id: n };
  }
  _resubscribe() {
    if (this._mode == 3)
      for (const o in this._events)
        this._socket.send(JSON.stringify({ action: "subscribe", name: o }));
  }
  detach(o) {
    if (!o) {
      if (this._mode == 3)
        for (const a in this._events)
          this._socket.send(JSON.stringify({ action: "unsubscribe", key: a }));
      return void (this._events = {});
    }
    const { id: t, name: n } = o, d = this._events[n];
    if (d) {
      const a = d.filter((s) => s.id != t);
      a.length ? this._events[n] = a : (delete this._events[n], this._mode == 3 && this._socket.send(JSON.stringify({ action: "unsubscribe", name: n })));
    }
  }
  fire(o, t) {
    const n = this._events[o];
    if (n)
      for (let d = 0; d < n.length; d++)
        n[d].handler(t);
  }
  onError(o) {
    return null;
  }
  onCall(o, t) {
  }
  onResponse(o, t) {
  }
}
class zt {
  constructor(o, t) {
    const n = new Ht({ url: o, token: t });
    n.fetch = function(d, a) {
      const s = { headers: this.headers() };
      return a && (s.method = "POST", s.body = a), fetch(d, s).then((i) => i.json());
    }, this._ready = n.load().then((d) => this._remote = d);
  }
  ready() {
    return this._ready;
  }
  on(o, t) {
    this.ready().then((n) => {
      if (typeof o == "string")
        n.on(o, t);
      else
        for (const d in o)
          n.on(d, o[d]);
    });
  }
}
function qt(e) {
  function o(n, d) {
    switch (n) {
      case "add-event":
        (function(a) {
          if (e.getEvent(a.id))
            return void console.warn(`Event with ID ${a.id} already exists. Skipping add.`);
          typeof a.start_date == "string" && (a.start_date = e.templates.parse_date(a.start_date)), typeof a.end_date == "string" && (a.end_date = e.templates.parse_date(a.end_date)), a.original_start && typeof a.original_start == "string" && (a.original_start = e.templates.parse_date(a.original_start)), t(() => {
            e.addEvent(a);
          });
        })(d);
        break;
      case "update-event":
        (function(a) {
          const s = a.id;
          if (!e.getEvent(s))
            return void console.warn(`Event with ID ${s} does not exist. Skipping update.`);
          const i = e.getEvent(s);
          t(() => {
            for (let r in a)
              r !== "start_date" && r !== "end_date" && (i[r] = a[r]);
            typeof a.start_date == "string" && (i.start_date = e.templates.parse_date(a.start_date)), typeof a.end_date == "string" && (i.end_date = e.templates.parse_date(a.end_date)), a.original_start && typeof a.original_start == "string" && (i.original_start = e.templates.parse_date(a.original_start)), e.callEvent("onEventChanged", [s, i]), e.updateEvent(s), s !== a.id && e.changeEventId(s, a.id);
          });
        })(d);
        break;
      case "delete-event":
        (function(a) {
          const s = a.id;
          if (!e.getEvent(s))
            return void ((a.event_pid || a.recurring_event_id) && t(() => {
              e.addEvent(a);
            }));
          t(() => {
            const i = e.getEvent(s);
            if (i) {
              if (i.rec_type || i.rrule) {
                e._roll_back_dates(i);
                const r = e._get_rec_markers(s);
                for (const l in r)
                  e.getEvent(l) && e.deleteEvent(l, !0);
              }
              if (e.getState().lightbox_id == s && (this._new_event = this._lightbox_id, a.id = this._lightbox_id, this._events[this._lightbox_id] = a, e.callEvent("onLiveUpdateCollision", [s, null, "delete", a]) === !1))
                return void e.endLightbox(!1, e._lightbox);
              e.deleteEvent(s, !0);
            }
          });
        })(d);
    }
  }
  function t(n) {
    e._dp ? e._dp.ignore(n) : n();
  }
  return { events: function(n) {
    if (!n || !n.event || !n.event.id)
      return void console.error("Invalid message format:", n);
    const { type: d, event: a } = n;
    if (!e._dp || !e._dp._in_progress[a.id]) {
      if (d === "add-event" && e._dp) {
        for (const s in e._dp._in_progress)
          if (e._dp.getState(s) === "inserted")
            return void e._dp.attachEvent("onFullSync", function() {
              e.getEvent(a.id) || o(d, a);
            }, { once: !0 });
      }
      o(d, a);
    }
  } };
}
function jt(e) {
  (function(o) {
    const t = {};
    o.attachEvent("onConfirmedBeforeEventDelete", function(n) {
      return t[n] = !0, !0;
    }), o.attachEvent("onEventDeleted", function(n, d) {
      if (!t[n])
        return;
      delete t[n];
      let a = o.copy(d);
      o.config.undo_deleted && !o.getState().new_event && o.message({ text: `<div class="dhx_info_message">
                            <span class="undo_popup_text">Event deleted</span>
                            <button class="undo_button" data-deleted-event-id="${d.id}">Undo</button>
                        </div>`, expire: 1e4, type: "popup_after_delete", callback: function(s) {
        s.target.closest(`[data-deleted-event-id="${d.id}"]`) && (a.rrule && a.duration && (a.end_date = new Date(a.start_date.valueOf() + 1e3 * a.duration), o.addEvent(a)), o.addEvent(a), o.render());
      } });
    });
  })(e), Ot(e), Lt(e), function(o) {
    o.batchUpdate = $t(o);
  }(e), function(o) {
    o.ext || (o.ext = {}), o.ext.liveUpdates = { RemoteEvents: zt, remoteUpdates: qt(o) };
  }(e);
}
let It = Date.now();
function Te(e) {
  return !!(e && typeof e == "object" && e.getFullYear && e.getMonth && e.getDate);
}
const ae = { uid: function() {
  return It++;
}, mixin: function(e, o, t) {
  const n = e, d = o;
  for (const a in d)
    (n[a] === void 0 || t) && (n[a] = d[a]);
  return e;
}, copy: function e(o) {
  let t;
  if (o && typeof o == "object")
    switch (!0) {
      case Te(o):
        t = new Date(o);
        break;
      case (n = o, Array.isArray ? Array.isArray(n) : !!(n && typeof n == "object" && "length" in n && n.pop && n.push)):
        t = new Array(o.length);
        for (let d = 0; d < o.length; d++)
          t[d] = e(o[d]);
        break;
      case function(d) {
        return !(!d || typeof d != "object" || Function.prototype.toString.call(d.constructor) !== "function String() { [native code] }");
      }(o):
        t = new String(o);
        break;
      case function(d) {
        return !(!d || typeof d != "object" || Function.prototype.toString.call(d.constructor) !== "function Number() { [native code] }");
      }(o):
        t = new Number(o);
        break;
      case function(d) {
        return !(!d || typeof d != "object" || Function.prototype.toString.call(d.constructor) !== "function Boolean() { [native code] }");
      }(o):
        t = new Boolean(o);
        break;
      default:
        t = {};
        for (const d in o)
          if (Object.prototype.hasOwnProperty.call(o, d)) {
            const a = o[d], s = typeof a;
            s === "string" || s === "number" || s === "boolean" ? t[d] = a : Te(a) ? t[d] = new Date(a) : t[d] = e(a);
          }
    }
  var n;
  return t || o;
}, defined: function(e) {
  return e !== void 0;
}, isDate: Te, delay: function(e, o) {
  let t;
  const n = function(...d) {
    n.$cancelTimeout(), n.$pending = !0, t = setTimeout(function() {
      e.apply(this, d), n.$pending = !1;
    }, o);
  };
  return n.$pending = !1, n.$cancelTimeout = function() {
    clearTimeout(t), n.$pending = !1;
  }, n.$execute = function(...d) {
    e.apply(this, d), n.$cancelTimeout();
  }, n;
} };
function Pt(e) {
  function o(f) {
    var u = document.createElement("div");
    return (f || "").split(" ").forEach(function(v) {
      u.classList.add(v);
    }), u;
  }
  var t = function() {
    return o("dhx_cal_navbar_rows_container");
  }, n = function() {
    return o("dhx_cal_navbar_row");
  }, d = function(f) {
    var u = o("dhx_cal_tab");
    return u.setAttribute("name", f.view + "_tab"), u.setAttribute("data-tab", f.view), e.config.fix_tab_position && (f.$firstTab ? u.classList.add("dhx_cal_tab_first") : f.$lastTab ? u.classList.add("dhx_cal_tab_last") : f.view !== "week" && u.classList.add("dhx_cal_tab_standalone"), f.$segmentedTab && u.classList.add("dhx_cal_tab_segmented")), u;
  }, a = function() {
    return o("dhx_cal_date");
  }, s = function(f) {
    return o("dhx_cal_nav_button dhx_cal_nav_button_custom dhx_cal_tab");
  }, i = function(f) {
    return o("dhx_cal_" + f.view + "_button dhx_cal_nav_button");
  }, r = function() {
    return o("dhx_cal_line_spacer");
  }, l = function(f) {
    var u = o("dhx_minical_icon");
    return f.click || u.$_eventAttached || e.event(u, "click", function() {
      e.isCalendarVisible() ? e.destroyCalendar() : e.renderCalendar({ position: this, date: e.getState().date, navigation: !0, handler: function(v, m) {
        e.setCurrentView(v), e.destroyCalendar();
      } });
    }), u;
  };
  function _(f) {
    var u = function(x) {
      var w;
      if (x.view)
        switch (x.view) {
          case "today":
          case "next":
          case "prev":
            w = i;
            break;
          case "date":
            w = a;
            break;
          case "spacer":
            w = r;
            break;
          case "button":
            w = s;
            break;
          case "minicalendar":
            w = l;
            break;
          default:
            w = d;
        }
      else
        x.rows ? w = t : x.cols && (w = n);
      return w;
    }(f);
    if (u) {
      var v = u(f);
      if (f.css && v.classList.add(f.css), f.width && ((m = f.width) === 1 * m && (m += "px"), v.style.width = m), f.height && ((m = f.height) === 1 * m && (m += "px"), v.style.height = m), f.click && e.event(v, "click", f.click), f.html && (v.innerHTML = f.html), f.align) {
        var m = "";
        f.align == "right" ? m = "flex-end" : f.align == "left" && (m = "flex-start"), v.style.justifyContent = m;
      }
      return v;
    }
  }
  function c(f) {
    return typeof f == "string" && (f = { view: f }), f.view || f.rows || f.cols || (f.view = "button"), f;
  }
  function h(f) {
    var u, v = document.createDocumentFragment();
    u = Array.isArray(f) ? f : [f];
    for (var m = 0; m < u.length; m++) {
      var x, w = c(u[m]);
      w.view === "day" && u[m + 1] && ((x = c(u[m + 1])).view !== "week" && x.view !== "month" || (w.$firstTab = !0, w.$segmentedTab = !0)), w.view === "week" && u[m - 1] && ((x = c(u[m + 1])).view !== "week" && x.view !== "month" || (w.$segmentedTab = !0)), w.view === "month" && u[m - 1] && ((x = c(u[m - 1])).view !== "week" && x.view !== "day" || (w.$lastTab = !0, w.$segmentedTab = !0));
      var S = _(w);
      v.appendChild(S), (w.cols || w.rows) && S.appendChild(h(w.cols || w.rows));
    }
    return v;
  }
  e._init_nav_bar = function(f) {
    var u = this.$container.querySelector(".dhx_cal_navline");
    return u || ((u = document.createElement("div")).className = "dhx_cal_navline dhx_cal_navline_flex", e._update_nav_bar(f, u), u);
  };
  var p = null;
  e._update_nav_bar = function(f, u) {
    if (f) {
      var v = !1, m = f.height || e.xy.nav_height;
      p !== null && p === m || (v = !0), v && (e.xy.nav_height = m), u.innerHTML = "", u.appendChild(h(f)), e.unset_actions(), e._els = [], e.get_elements(), e.set_actions(), u.style.display = m === 0 ? "none" : "", p = m;
    }
  };
}
function Rt(e) {
  function o(a) {
    return a.isConnected !== void 0 ? a.isConnected : document.body.contains(a);
  }
  function t(a) {
    return { w: a.innerWidth || document.documentElement.clientWidth, h: a.innerHeight || document.documentElement.clientHeight };
  }
  function n(a, s) {
    var i, r = t(s);
    a.event(s, "resize", function() {
      clearTimeout(i), i = setTimeout(function() {
        if (o(a.$container) && !a.$destroyed) {
          var l, _, c = t(s);
          _ = c, ((l = r).w != _.w || l.h != _.h) && (r = c, d(a));
        }
      }, 150);
    });
  }
  function d(a) {
    a.$initialized && !a.$destroyed && a.$root && o(a.$root) && a.callEvent("onSchedulerResize", []) && (a.updateView(), a.callEvent("onAfterSchedulerResize", []));
  }
  (function(a) {
    var s = a.$container;
    if (window.getComputedStyle(s).getPropertyValue("position") == "static" && (s.style.position = "relative"), window.ResizeObserver) {
      let r = !0;
      const l = new ResizeObserver(function(_) {
        r ? r = !1 : d(a);
      });
      l.observe(s), a.attachEvent("onDestroy", function() {
        l.unobserve(s);
      });
    } else {
      var i = document.createElement("iframe");
      i.className = "scheduler_container_resize_watcher", i.tabIndex = -1, a.config.wai_aria_attributes && (i.setAttribute("role", "none"), i.setAttribute("aria-hidden", !0)), window.Sfdc || window.$A || window.Aura ? function(r) {
        var l = r.$root.offsetHeight, _ = r.$root.offsetWidth;
        (function c() {
          r.$destroyed || (r.$root && (r.$root.offsetHeight == l && r.$root.offsetWidth == _ || d(r), l = r.$root.offsetHeight, _ = r.$root.offsetWidth), setTimeout(c, 200));
        })();
      }(a) : (s.appendChild(i), i.contentWindow ? n(a, i.contentWindow) : (s.removeChild(i), n(a, window)));
    }
  })(e);
}
class Ut {
  constructor() {
    this._silent_mode = !1, this.listeners = {};
  }
  _silentStart() {
    this._silent_mode = !0;
  }
  _silentEnd() {
    this._silent_mode = !1;
  }
}
function Ue(e) {
  const o = new Ut();
  e.attachEvent = function(t, n, d) {
    t = "ev_" + t.toLowerCase(), o.listeners[t] || (o.listeners[t] = function(s) {
      let i = {}, r = 0;
      const l = function(..._) {
        let c = !0;
        for (const h in i) {
          const p = i[h].apply(s, _);
          c = c && p;
        }
        return c;
      };
      return l.addEvent = function(_, c) {
        if (typeof _ == "function") {
          let h;
          if (c && c.id ? h = c.id : (h = r, r++), c && c.once) {
            const p = _;
            _ = function() {
              p(), l.removeEvent(h);
            };
          }
          return i[h] = _, h;
        }
        return !1;
      }, l.removeEvent = function(_) {
        delete i[_];
      }, l.clear = function() {
        i = {};
      }, l;
    }(this)), d && d.thisObject && (n = n.bind(d.thisObject));
    let a = t + ":" + o.listeners[t].addEvent(n, d);
    return d && d.id && (a = d.id), a;
  }, e.attachAll = function(t) {
    this.attachEvent("listen_all", t);
  }, e.callEvent = function(t, n) {
    if (o._silent_mode)
      return !0;
    const d = "ev_" + t.toLowerCase(), a = o.listeners;
    return a.ev_listen_all && a.ev_listen_all.apply(this, [t].concat(n)), !a[d] || a[d].apply(this, n);
  }, e.checkEvent = function(t) {
    return !!o.listeners["ev_" + t.toLowerCase()];
  }, e.detachEvent = function(t) {
    if (t) {
      let n = o.listeners;
      for (const a in n)
        n[a].removeEvent(t);
      const d = String(t).split(":");
      if (n = o.listeners, d.length === 2) {
        const a = d[0], s = d[1];
        n[a] && n[a].removeEvent(s);
      }
    }
  }, e.detachAllEvents = function() {
    for (const t in o.listeners)
      o.listeners[t].clear();
  };
}
var Yt = { second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2592e3, quarter: 7776e3, year: 31536e3 };
function We(e, o) {
  var t = new Date(e);
  return o && t.getMinutes() && t.setMinutes(0), t.getSeconds() && t.setSeconds(0), t.getMilliseconds() && t.setMilliseconds(0), t;
}
function Ke(e, o, t) {
  var n = new Date(e);
  return t === "minute" ? (n.setMinutes(n.getMinutes() + o), n) : t === "hour" ? (n.setHours(n.getHours() + o), n) : null;
}
function gt(e, o, t, n) {
  if (!Number.isFinite(o) || o === 0)
    return null;
  if (o < 0) {
    var d = Ke(e, o, t) || n.add(e, o, t), a = n.unitStart(t, new Date(d)), s = gt(a, -o, t, n);
    return s && +s == +e && +a < +e ? a : +d < +e ? new Date(d) : null;
  }
  var i = e.getTimezoneOffset(), r = Ke(e, o, t), l = r || n.add(e, o, t), _ = r || function(c, h, p, f, u) {
    var v = (Yt[f] || 0) * p;
    if (v > 3600 && v < 86400) {
      var m = c.getTimezoneOffset() - h;
      if (m)
        return u.add(c, m, "minute");
    }
    return c;
  }(l, i, o, t, n);
  return +(_ = n.unitStart(t, _)) > +e ? _ : +l > +e ? l : null;
}
function Ft(e) {
  Ue(e), Pt(e), e._detachDomEvent = function(i, r, l) {
    i.removeEventListener ? i.removeEventListener(r, l, !1) : i.detachEvent && i.detachEvent("on" + r, l);
  }, e._init_once = function() {
    Rt(e), e._init_once = function() {
    };
  };
  const o = { render: function(i) {
    return e._init_nav_bar(i);
  } }, t = { render: function(i) {
    const r = document.createElement("div");
    return r.className = "dhx_cal_header", r;
  } }, n = { render: function(i) {
    const r = document.createElement("div");
    return r.className = "dhx_cal_data", r;
  } };
  function d(i) {
    return !!(i.querySelector(".dhx_cal_header") && i.querySelector(".dhx_cal_data") && i.querySelector(".dhx_cal_navline"));
  }
  e._getInitialState = function(i) {
    return { date: i.date || this._currentDate(), mode: i.mode || "week" };
  }, e.init = function(i, r, l) {
    if (this.$destroyed)
      return;
    if (this._obj = typeof i == "string" ? document.getElementById(i) : i, this.$container = this._obj, this.$root = this._obj, this._obj && this.unset_actions(), !this.$container.offsetHeight && this.$container.offsetWidth && this.$container.style.height === "100%" && window.console.error(e._commonErrorMessages.collapsedContainer(), this.$container), this.config.wai_aria_attributes && this.config.wai_aria_application_role && this.$container.setAttribute("role", "application"), this.config.header || d(this.$container) || (this.config.header = function(p) {
      const f = ["day", "week", "month"];
      if (p.matrix)
        for (const u in p.matrix)
          f.push(u);
      if (p._props)
        for (const u in p._props)
          f.push(u);
      if (p._grid && p._grid.names)
        for (const u in p._grid.names)
          f.push(u);
      return ["map", "agenda", "week_agenda", "year"].forEach(function(u) {
        p[u + "_view"] && f.push(u);
      }), f.concat(["date"]).concat(["prev", "today", "next"]);
    }(this), window.console.log(["Required DOM elements are missing from the scheduler container and **scheduler.config.header** is not specified.", "Using a default header configuration: ", "scheduler.config.header = " + JSON.stringify(this.config.header, null, 2), "Check this article for the details: https://docs.dhtmlx.com/scheduler/initialization.html"].join(`
`))), this.config.header)
      this.$container.innerHTML = "", this.$container.classList.add("dhx_cal_container"), this.config.header.height && (this.xy.nav_height = this.config.header.height), this.$container.appendChild(o.render(this.config.header)), this.$container.appendChild(t.render()), this.$container.appendChild(n.render());
    else if (!d(this.$container))
      throw new Error(["Required DOM elements are missing from the scheduler container.", "Be sure to either specify them manually in the markup: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviamarkup", "Or to use **scheduler.config.header** setting so they could be created automatically: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviaheaderconfig"].join(`
`));
    this.config.rtl && (this.$container.className += " dhx_cal_container_rtl"), this._skin_init && e._skin_init(), e.date.init(), this._scroll = !0, this._els = [], this.get_elements(), this.init_templates(), this.set_actions(), this._init_once(), this._init_touch_events(), this.set_sizes();
    const _ = e._getInitialState({ date: r, mode: l }), c = _.date, h = _.mode;
    e.callEvent("onSchedulerReady", []), e.$initialized = !0, this.setCurrentView(c, h);
  }, e.xy = { min_event_height: 20, bar_height: 24, scale_width: 50, scroll_width: 18, scale_height: 20, month_scale_height: 20, menu_width: 25, margin_top: 0, margin_left: 0, editor_width: 140, month_head_height: 22, event_header_height: 14 }, e.keys = { edit_save: 13, edit_cancel: 27 }, e.bind = function(i, r) {
    return i.bind ? i.bind(r) : function() {
      return i.apply(r, arguments);
    };
  }, e.set_sizes = function() {
    var i = this._x = this._obj.clientWidth - this.xy.margin_left, r = this._table_view ? 0 : this.xy.scale_width + this.xy.scroll_width, l = this.$container.querySelector(".dhx_cal_scale_placeholder");
    if (e._is_material_skin()) {
      l || ((l = document.createElement("div")).className = "dhx_cal_scale_placeholder", this.$container.insertBefore(l, this._els.dhx_cal_header[0])), l.style.display = "block";
      const c = e.$root.querySelector(".dhx_cal_navline");
      let h = 0;
      c && (h += c.offsetHeight);
      const p = e.$root.querySelector(".dhx_cal_header");
      let f, u, v = 0;
      p && (v += p.offsetHeight), v ? (f = h + 1, u = v) : (f = h - 4, u = 5), this.set_xy(l, i, u, 0, f);
    } else
      l && l.parentNode.removeChild(l);
    this._lightbox && (e.$container.offsetWidth < 1200 || this._setLbPosition(document.querySelector(".dhx_cal_light"))), this._data_width = i - r, this._els.dhx_cal_navline[0].style.width = i + "px";
    const _ = this._els.dhx_cal_header[0];
    this.set_xy(_, this._data_width, this.xy.scale_height), _.style.left = "", _.style.right = "", this._table_view ? this.config.rtl ? _.style.right = "-1px" : _.style.left = "-1px" : this.config.rtl ? _.style.right = `${this.xy.scale_width}px` : _.style.left = `${this.xy.scale_width}px`;
  }, e.set_xy = function(i, r, l, _, c) {
    function h(f) {
      let u = f;
      return isNaN(Number(u)) || (u = Math.max(0, u) + "px"), u;
    }
    var p = "left";
    r !== void 0 && (i.style.width = h(r)), l !== void 0 && (i.style.height = h(l)), arguments.length > 3 && (_ !== void 0 && (this.config.rtl && (p = "right"), i.style[p] = _ + "px"), c !== void 0 && (i.style.top = c + "px"));
  }, e.get_elements = function() {
    const i = this._obj.getElementsByTagName("DIV");
    for (let r = 0; r < i.length; r++) {
      let l = e._getClassName(i[r]);
      const _ = i[r].getAttribute("data-tab") || i[r].getAttribute("name") || "";
      l && (l = l.split(" ")[0]), this._els[l] || (this._els[l] = []), this._els[l].push(i[r]);
      let c = e.locale.labels[_ + "_tab"] || e.locale.labels[_ || l];
      typeof c != "string" && _ && !i[r].innerHTML && (c = _.split("_")[0]), c && (this._waiAria.labelAttr(i[r], c), i[r].innerHTML = c);
    }
  };
  const a = e._createDomEventScope();
  function s(i, r) {
    const l = new Date(i), _ = (new Date(r).getTime() - l.getTime()) / 864e5;
    return Math.abs(_);
  }
  e.unset_actions = function() {
    a.detachAll();
  }, e.set_actions = function() {
    for (const i in this._els)
      if (this._click[i])
        for (let r = 0; r < this._els[i].length; r++) {
          const l = this._els[i][r], _ = this._click[i].bind(l);
          a.attach(l, "click", _);
        }
    a.attach(this._obj, "selectstart", function(i) {
      return i.preventDefault(), !1;
    }), a.attach(this._obj, "mousemove", function(i) {
      e._temp_touch_block || e._on_mouse_move(i);
    }), a.attach(this._obj, "mousedown", function(i) {
      e._ignore_next_click || e._on_mouse_down(i);
    }), a.attach(this._obj, "mouseup", function(i) {
      e._ignore_next_click || e._on_mouse_up(i);
    }), a.attach(this._obj, "dblclick", function(i) {
      e._on_dbl_click(i);
    }), a.attach(this._obj, "contextmenu", function(i) {
      return e.checkEvent("onContextMenu") && i.preventDefault(), e.callEvent("onContextMenu", [e._locate_event(i.target), i]);
    });
  }, e.select = function(i) {
    this._select_id != i && (e._close_not_saved(), this.editStop(!1), this._select_id && this.unselect(), this._select_id = i, this.updateEvent(i), this.callEvent("onEventSelected", [i]));
  }, e.unselect = function(i) {
    if (i && i != this._select_id)
      return;
    const r = this._select_id;
    this._select_id = null, r && this.getEvent(r) && this.updateEvent(r), this.callEvent("onEventUnselected", [r]);
  }, e.$stateProvider.registerProvider("global", (function() {
    return { mode: this._mode, date: new Date(this._date), min_date: new Date(this._min_date), max_date: new Date(this._max_date), editor_id: this._edit_id, lightbox_id: this._lightbox_id, new_event: this._new_event, select_id: this._select_id, expanded: this.expanded, drag_id: this._drag_id, drag_mode: this._drag_mode };
  }).bind(e)), e._click = { dhx_cal_data: function(i) {
    if (e._ignore_next_click)
      return i.preventDefault && i.preventDefault(), i.cancelBubble = !0, e._ignore_next_click = !1, !1;
    const r = e._locate_event(i.target);
    if (r) {
      if (!e.callEvent("onClick", [r, i]) || e.config.readonly)
        return;
    } else
      e.callEvent("onEmptyClick", [e.getActionData(i).date, i]);
    if (r && e.config.select) {
      e.select(r);
      const l = i.target.closest(".dhx_menu_icon"), _ = e._getClassName(l);
      _.indexOf("_icon") != -1 && e._click.buttons[_.split(" ")[1].replace("icon_", "")](r);
    } else
      e._close_not_saved(), e.getState().select_id && (/* @__PURE__ */ new Date()).valueOf() - (e._new_event || 0) > 500 && e.unselect();
  }, dhx_cal_prev_button: function() {
    e._click.dhx_cal_next_button(0, -1);
  }, dhx_cal_next_button: function(i, r) {
    let l = 1;
    e.config.rtl && (r = -r, l = -l), e.setCurrentView(e.date.add(e.date[e._mode + "_start"](new Date(e._date)), r || l, e._mode));
  }, dhx_cal_today_button: function() {
    e.callEvent("onBeforeTodayDisplayed", []) && e.setCurrentView(e._currentDate());
  }, dhx_cal_tab: function() {
    const i = this.getAttribute("data-tab"), r = this.getAttribute("name"), l = i || r.substring(0, r.search("_tab"));
    e.setCurrentView(e._date, l);
  }, buttons: { delete: function(i) {
    const r = e.locale.labels.confirm_deleting;
    e._delete_event_confirm({ event: e.getEvent(i), message: r, title: e.locale.labels.title_confirm_deleting, callback: function() {
      e.deleteEvent(i);
    }, config: { ok: e.locale.labels.icon_delete } });
  }, edit: function(i) {
    e.edit(i);
  }, save: function(i) {
    e.editStop(!0);
  }, details: function(i) {
    e.showLightbox(i);
  }, form: function(i) {
    e.showLightbox(i);
  }, cancel: function(i) {
    e.editStop(!1);
  } } }, e._dhtmlx_confirm = function({ message: i, title: r, callback: l, config: _ }) {
    if (!i)
      return l();
    _ = _ || {};
    const c = { ..._, text: i };
    r && (c.title = r), l && (c.callback = function(h) {
      h && l();
    }), e.confirm(c);
  }, e.addEventNow = function(i, r, l) {
    let _ = {};
    e._isObject(i) && !e._isDate(i) && (_ = i, i = null);
    const c = 6e4 * (this.config.event_duration || this.config.time_step);
    i || (i = _.start_date || Math.round(e._currentDate().valueOf() / c) * c);
    let h = new Date(i);
    if (!r) {
      let u = this.config.first_hour;
      u > h.getHours() && (h.setHours(u), i = h.valueOf()), r = i.valueOf() + c;
    }
    let p = new Date(r);
    h.valueOf() == p.valueOf() && p.setTime(p.valueOf() + c), _.start_date = _.start_date || h, _.end_date = _.end_date || p, _.text = _.text || this.locale.labels.new_event, _.id = this._drag_id = _.id || this.uid(), this._drag_mode = "new-size", this._loading = !0;
    const f = this.addEvent(_);
    return this.callEvent("onEventCreated", [this._drag_id, l]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(l), f;
  }, e._on_dbl_click = function(i, r) {
    if (r = r || i.target, this.config.readonly)
      return;
    const l = e._getClassName(r).split(" ")[0];
    switch (l) {
      case "dhx_scale_bar":
        this.callEvent("onScaleDblClick");
        break;
      case "dhx_scale_holder":
      case "dhx_scale_holder_now":
      case "dhx_month_body":
      case "dhx_wa_day_data":
        if (!e.config.dblclick_create)
          break;
        this.addEventNow(this.getActionData(i).date, null, i);
        break;
      case "dhx_cal_event":
      case "dhx_wa_ev_body":
      case "dhx_agenda_line":
      case "dhx_cal_agenda_event_line":
      case "dhx_grid_event":
      case "dhx_cal_event_line":
      case "dhx_cal_event_clear": {
        const _ = this._locate_event(r);
        if (!this.callEvent("onDblClick", [_, i]))
          return;
        this.config.details_on_dblclick || this._table_view || !this.getEvent(_)._timed || !this.config.select ? this.showLightbox(_) : this.edit(_);
        break;
      }
      case "dhx_time_block":
      case "dhx_cal_container":
        return;
      default: {
        const _ = this["dblclick_" + l];
        if (_)
          _.call(this, i);
        else if (r.parentNode && r != this)
          return e._on_dbl_click(i, r.parentNode);
        break;
      }
    }
  }, e._get_column_index = function(i) {
    let r = 0;
    if (this._cols) {
      let l = 0, _ = 0;
      for (; l + this._cols[_] < i && _ < this._cols.length; )
        l += this._cols[_], _++;
      if (r = _ + (this._cols[_] ? (i - l) / this._cols[_] : 0), this._ignores && r >= this._cols.length)
        for (; r >= 1 && this._ignores[Math.floor(r)]; )
          r--;
    }
    return r;
  }, e._week_indexes_from_pos = function(i) {
    if (this._cols) {
      const r = this._get_column_index(i.x);
      return i.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(r) - 1)), i.y = Math.max(0, Math.ceil(60 * i.y / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step), i;
    }
    return i;
  }, e._mouse_coords = function(i) {
    let r;
    const l = document.body, _ = document.documentElement;
    r = this.$env.isIE || !i.pageX && !i.pageY ? { x: i.clientX + (l.scrollLeft || _.scrollLeft || 0) - l.clientLeft, y: i.clientY + (l.scrollTop || _.scrollTop || 0) - l.clientTop } : { x: i.pageX, y: i.pageY }, this.config.rtl && this._colsS ? (r.x = this.$container.querySelector(".dhx_cal_data").offsetWidth - r.x, r.x += this.$domHelpers.getAbsoluteLeft(this._obj), this._mode !== "month" && (r.x -= this.xy.scale_width)) : r.x -= this.$domHelpers.getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width);
    const c = this.$container.querySelector(".dhx_cal_data");
    r.y -= this.$domHelpers.getAbsoluteTop(c) - this._els.dhx_cal_data[0].scrollTop, r.ev = i;
    const h = this["mouse_" + this._mode];
    if (h)
      r = h.call(this, r);
    else if (this._table_view) {
      const p = this._get_column_index(r.x);
      if (!this._cols || !this._colsS)
        return r;
      let f = 0;
      for (f = 1; f < this._colsS.heights.length && !(this._colsS.heights[f] > r.y); f++)
        ;
      r.y = Math.ceil(24 * (Math.max(0, p) + 7 * Math.max(0, f - 1)) * 60 / this.config.time_step), (e._drag_mode || this._mode == "month") && (r.y = 24 * (Math.max(0, Math.ceil(p) - 1) + 7 * Math.max(0, f - 1)) * 60 / this.config.time_step), this._drag_mode == "move" && e._ignores_detected && e.config.preserve_length && (r._ignores = !0, this._drag_event._event_length || (this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, { x_step: 1, x_unit: "day" }))), r.x = 0;
    } else
      r = this._week_indexes_from_pos(r);
    return r.timestamp = +/* @__PURE__ */ new Date(), r;
  }, e._close_not_saved = function() {
    if ((/* @__PURE__ */ new Date()).valueOf() - (e._new_event || 0) > 500 && e._edit_id) {
      const i = e.locale.labels.confirm_closing;
      e._dhtmlx_confirm({ message: i, title: e.locale.labels.title_confirm_closing, callback: function() {
        e.editStop(e.config.positive_closing);
      } }), i && (this._drag_id = this._drag_pos = this._drag_mode = null);
    }
  }, e._correct_shift = function(i, r) {
    return i - 6e4 * (new Date(e._min_date).getTimezoneOffset() - new Date(i).getTimezoneOffset()) * (r ? -1 : 1);
  }, e._is_pos_changed = function(i, r) {
    function l(_, c, h) {
      return Math.abs(_ - c) > h;
    }
    return !i || !this._drag_pos ? !0 : !!(this._drag_pos.has_moved || !this._drag_pos.timestamp || r.timestamp - this._drag_pos.timestamp > 100 || l(i.ev.clientX, r.ev.clientX, 5) || l(i.ev.clientY, r.ev.clientY, 5));
  }, e._correct_drag_start_date = function(i) {
    let r;
    e.matrix && (r = e.matrix[e._mode]), r = r || { x_step: 1, x_unit: "day" }, i = new Date(i);
    let l = 1;
    return (r._start_correction || r._end_correction) && (l = 60 * (r.last_hour || 0) - (60 * i.getHours() + i.getMinutes()) || 1), 1 * i + (e._get_fictional_event_length(i, l, r) - l);
  }, e._correct_drag_end_date = function(i, r) {
    let l;
    e.matrix && (l = e.matrix[e._mode]), l = l || { x_step: 1, x_unit: "day" };
    const _ = 1 * i + e._get_fictional_event_length(i, r, l);
    return new Date(1 * _ - (e._get_fictional_event_length(_, -1, l, -1) + 1));
  }, e._on_mouse_move = function(i) {
    if (this._drag_mode) {
      var r = this._mouse_coords(i);
      if (this._is_pos_changed(this._drag_pos, r)) {
        var l, _;
        if (this._edit_id != this._drag_id && this._close_not_saved(), !this._drag_mode)
          return;
        var c = null;
        if (this._drag_pos && !this._drag_pos.has_moved && ((c = this._drag_pos).has_moved = !0), this._drag_pos = r, this._drag_pos.has_moved = !0, this._drag_mode == "create") {
          if (c && (r = c), this._close_not_saved(), this.unselect(this._select_id), this._loading = !0, l = this._get_date_from_pos(r).valueOf(), !this._drag_start)
            return this.callEvent("onBeforeEventCreated", [i, this._drag_id]) ? (this._loading = !1, void (this._drag_start = l)) : void (this._loading = !1);
          _ = l, this._drag_start;
          var h = new Date(this._drag_start), p = new Date(_);
          this._mode != "day" && this._mode != "week" || h.getHours() != p.getHours() || h.getMinutes() != p.getMinutes() || (p = new Date(this._drag_start + 1e3)), this._drag_id = this.uid(), this.addEvent(h, p, this.locale.labels.new_event, this._drag_id, r.fields), this.callEvent("onEventCreated", [this._drag_id, i]), this._loading = !1, this._drag_mode = "new-size";
        }
        var f, u = this.config.time_step, v = this.getEvent(this._drag_id);
        if (e.matrix && (f = e.matrix[e._mode]), f = f || { x_step: 1, x_unit: "day" }, this._drag_mode == "move")
          this._table_view ? (l = this._min_date.valueOf() + 6e4 * (r.y * this.config.time_step + 24 * r.x * 60), r.custom || (l += 1e3 * this.date.time_part(v.start_date)), this._drag_event._move_event_shift && (l -= this._drag_event._move_event_shift), l = this._correct_shift(l)) : (l = this._get_date_from_pos(r).valueOf(), this._dragEventBody && this._drag_event._move_event_shift === void 0 && (this._drag_event._move_event_shift = l - v.start_date), this._drag_event._move_event_shift && (l -= this._drag_event._move_event_shift)), r._ignores && this.config.preserve_length && this._table_view && f ? (l = e._correct_drag_start_date(l), _ = e._correct_drag_end_date(l, this._drag_event._event_length)) : _ = this._get_moved_end_date(this._drag_event && this._drag_event.start_date ? this._drag_event : v, l);
        else {
          if (l = v.start_date.valueOf(), _ = v.end_date.valueOf(), this._table_view) {
            var m = this._min_date.valueOf() + r.y * this.config.time_step * 6e4 + (r.custom ? 0 : 864e5);
            if (this._mode == "month")
              m = this._correct_shift(m, !1), this._drag_from_start ? m <= this.date.add(this.date.date_part(new Date(_ - 1)), 1, "day").valueOf() && (l = this.date.add(new Date(m), -1, "day").valueOf()) : _ = m;
            else if (this.config.preserve_length) {
              if (r.resize_from_start)
                l = e._correct_drag_start_date(m), f.round_position && f.first_hour && f.last_hour && f.x_unit == "day" && (l = new Date(1 * l + f._start_correction));
              else if (_ = e._correct_drag_end_date(m, 0), f.round_position && f.first_hour && f.last_hour && f.x_unit == "day" && (_ = e.date.date_part(new Date(_)), _ = new Date(1 * _ - f._end_correction)), f.round_position && e["ignore_" + e._mode] && f.x_unit == "day") {
                const O = this["ignore_" + this._mode];
                let j = e.date.add(new Date(_), -f.x_step, f.x_unit);
                O(j) && (_ = j);
              }
            } else
              r.resize_from_start ? l = m : _ = m;
          } else {
            var x = this.date.date_part(new Date(v.end_date.valueOf() - 1)).valueOf(), w = new Date(x), S = this.config.first_hour, N = 60 / u * (this.config.last_hour - S);
            this.config.time_step = 1;
            var E = this._mouse_coords(i);
            this.config.time_step = u;
            var T = r.y * u * 6e4, g = Math.min(r.y + 1, N) * u * 6e4, b = 6e4 * E.y, y = (Math.abs(T - b) > Math.abs(g - b) ? g : T) / 6e4;
            _ = new Date(w.getFullYear(), w.getMonth(), w.getDate(), 0, y).valueOf(), this._els.dhx_cal_data[0].style.cursor = "s-resize";
          }
          if (this._drag_mode == "new-size")
            if (_ <= this._drag_start) {
              var k = r.shift || (this._table_view && !r.custom ? 864e5 : 0);
              l = _ - (r.shift ? 0 : k), _ = this._drag_start + (k || 6e4 * u);
            } else
              l = this._drag_start;
          else
            _ <= l && (_ = f && f.round_position ? f.x_unit == "hour" || f.x_unit == "minute" ? e.date.add(l, f.x_step, f.x_unit) : e.date.add(e.date.date_part(new Date(l)), 1, f.x_unit) : l + 6e4 * u);
        }
        var D = new Date(_ - 1), M = new Date(l);
        if (this._drag_mode == "move" && e.config.limit_drag_out && (+M < +e._min_date || +_ > +e._max_date)) {
          if (+v.start_date < +e._min_date || +v.end_date > +e._max_date)
            M = new Date(v.start_date), _ = new Date(v.end_date);
          else {
            var C = _ - M;
            +M < +e._min_date ? (M = new Date(e._min_date), r._ignores && this.config.preserve_length && this._table_view ? (M = new Date(e._correct_drag_start_date(M)), f._start_correction && (M = new Date(M.valueOf() + f._start_correction)), _ = new Date(1 * M + this._get_fictional_event_length(M, this._drag_event._event_length, f))) : _ = new Date(+M + C)) : (_ = new Date(e._max_date), r._ignores && this.config.preserve_length && this._table_view ? (f._end_correction && (_ = new Date(_.valueOf() - f._end_correction)), _ = new Date(1 * _ - this._get_fictional_event_length(_, 0, f, !0)), M = new Date(1 * _ - this._get_fictional_event_length(_, this._drag_event._event_length, f, !0)), this._ignores_detected && (M = e.date.add(M, f.x_step, f.x_unit), _ = new Date(1 * _ - this._get_fictional_event_length(_, 0, f, !0)), _ = e.date.add(_, f.x_step, f.x_unit))) : M = new Date(+_ - C));
          }
          D = new Date(_ - 1);
        }
        if (!this._table_view && this._dragEventBody && !e.config.all_timed && (!e._get_section_view() && r.x != this._get_event_sday({ start_date: new Date(l), end_date: new Date(l) }) || new Date(l).getHours() < this.config.first_hour) && (C = _ - M, this._drag_mode == "move")) {
          var A = this._min_date.valueOf() + 24 * r.x * 60 * 6e4;
          (M = new Date(A)).setHours(this.config.first_hour), +M <= +v.start_date ? _ = new Date(+M + C) : M = new Date(+_ - C);
        }
        if (!this._table_view && !e.config.all_timed && (!e.getView() && r.x != this._get_event_sday({ start_date: new Date(_), end_date: new Date(_) }) || new Date(_).getHours() >= this.config.last_hour) && (C = _ - M, A = this._min_date.valueOf() + 24 * r.x * 60 * 6e4, (_ = e.date.date_part(new Date(A))).setHours(this.config.last_hour), D = new Date(_ - 1), this._drag_mode == "move" && (+M <= +v.start_date ? _ = new Date(+M + C) : M = new Date(+_ - C))), !this._table_view && e.config.all_timed) {
          let O = this._min_date.valueOf() + 24 * r.x * 60 * 6e4;
          new Date(e._drag_start).getDay() != new Date(O) && (O = new Date(e._drag_start));
          let j = new Date(O).setHours(this.config.last_hour);
          e._drag_start && this._drag_mode == "new-size" && j < new Date(_) && ((_ = e.date.date_part(new Date(O))).setHours(this.config.last_hour), D = new Date(_ - 1));
        }
        if (this._table_view && e["ignore_" + this._mode] && (this._drag_mode == "resize" || this._drag_mode == "new-size") && +_ > +e._max_date) {
          _ = new Date(e._max_date);
          const O = this["ignore_" + this._mode];
          for (; O(_); )
            _ = e.date.add(_, -f.x_step, f.x_unit);
          _ = e.date.add(_, f.x_step, f.x_unit);
        }
        if (this._table_view || D.getDate() == M.getDate() && D.getHours() < this.config.last_hour || e._allow_dnd)
          if (v.start_date = M, v.end_date = new Date(_), this.config.update_render) {
            var $ = e._els.dhx_cal_data[0].scrollTop;
            this.update_view(), e._els.dhx_cal_data[0].scrollTop = $;
          } else
            this.updateEvent(this._drag_id);
        this._table_view && this.for_rendered(this._drag_id, function(O) {
          O.className += " dhx_in_move dhx_cal_event_drag";
        }), this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, i]);
      }
    } else if (e.checkEvent("onMouseMove")) {
      var H = this._locate_event(i.target || i.srcElement);
      this.callEvent("onMouseMove", [H, i]);
    }
  }, e._on_mouse_down = function(i, r) {
    if (i.button != 2 && !this.config.readonly && !this._drag_mode) {
      r = r || i.target || i.srcElement;
      var l = e._getClassName(r).split(" ")[0];
      switch (this.config.drag_event_body && l == "dhx_body" && r.parentNode && r.parentNode.className.indexOf("dhx_cal_select_menu") === -1 && (l = "dhx_event_move", this._dragEventBody = !0), l) {
        case "dhx_cal_event_line":
        case "dhx_cal_event_clear":
          this._table_view && (this._drag_mode = "move");
          break;
        case "dhx_event_move":
        case "dhx_wa_ev_body":
          this._drag_mode = "move";
          break;
        case "dhx_event_resize":
          this._drag_mode = "resize", e._getClassName(r).indexOf("dhx_event_resize_end") < 0 ? e._drag_from_start = !0 : e._drag_from_start = !1;
          break;
        case "dhx_scale_holder":
        case "dhx_scale_holder_now":
        case "dhx_month_body":
        case "dhx_matrix_cell":
        case "dhx_marked_timespan":
          this._drag_mode = "create";
          break;
        case "":
          if (r.parentNode)
            return e._on_mouse_down(i, r.parentNode);
          break;
        default:
          if ((!e.checkEvent("onMouseDown") || e.callEvent("onMouseDown", [l, i])) && r.parentNode && r != this && l != "dhx_body")
            return e._on_mouse_down(i, r.parentNode);
          this._drag_mode = null, this._drag_id = null;
      }
      if (this._drag_mode) {
        var _ = this._locate_event(r);
        if (this.config["drag_" + this._drag_mode] && this.callEvent("onBeforeDrag", [_, this._drag_mode, i])) {
          if (this._drag_id = _, (this._edit_id != this._drag_id || this._edit_id && this._drag_mode == "create") && this._close_not_saved(), !this._drag_mode)
            return;
          this._drag_event = e._lame_clone(this.getEvent(this._drag_id) || {}), this._drag_pos = this._mouse_coords(i);
        } else
          this._drag_mode = this._drag_id = 0;
      }
      this._drag_start = null;
    }
  }, e._get_private_properties = function(i) {
    var r = {};
    for (var l in i)
      l.indexOf("_") === 0 && (r[l] = !0);
    return r;
  }, e._clear_temporary_properties = function(i, r) {
    var l = this._get_private_properties(i), _ = this._get_private_properties(r);
    for (var c in _)
      l[c] || delete r[c];
  }, e._on_mouse_up = function(i) {
    if (!i || i.button != 2 || !this._mobile) {
      if (this._drag_mode && this._drag_id) {
        this._els.dhx_cal_data[0].style.cursor = "default";
        var r = this._drag_id, l = this._drag_mode, _ = !this._drag_pos || this._drag_pos.has_moved;
        delete this._drag_event._move_event_shift;
        var c = this.getEvent(this._drag_id);
        if (_ && (this._drag_event._dhx_changed || !this._drag_event.start_date || c.start_date.valueOf() != this._drag_event.start_date.valueOf() || c.end_date.valueOf() != this._drag_event.end_date.valueOf())) {
          var h = this._drag_mode == "new-size";
          if (this.callEvent("onBeforeEventChanged", [c, i, h, this._drag_event]))
            if (this._drag_id = this._drag_mode = null, h && this.config.edit_on_create) {
              if (this.unselect(), this._new_event = /* @__PURE__ */ new Date(), c.$new = !0, this._table_view || this.config.details_on_create || !this.config.select || !this.isOneDayEvent(this.getEvent(r)))
                return e.callEvent("onDragEnd", [r, l, i]), this.showLightbox(r);
              this._drag_pos = !0, this._select_id = this._edit_id = r;
            } else
              this._new_event || this.callEvent(h ? "onEventAdded" : "onEventChanged", [r, this.getEvent(r)]);
          else
            h ? this.deleteEvent(c.id, !0) : (this._drag_event._dhx_changed = !1, this._clear_temporary_properties(c, this._drag_event), e._lame_copy(c, this._drag_event), this.updateEvent(c.id));
        }
        this._drag_pos && (this._drag_pos.has_moved || this._drag_pos === !0) && (this._drag_id = this._drag_mode = null, this.render_view_data()), e.callEvent("onDragEnd", [r, l, i]);
      }
      this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this._drag_event = null, this._drag_from_start = null;
    }
  }, e._trigger_dyn_loading = function() {
    return !(!this._load_mode || !this._load()) && (this._render_wait = !0, !0);
  }, e.update_view = function() {
    this._reset_ignores(), this._update_nav_bar(this.config.header, this.$container.querySelector(".dhx_cal_navline"));
    var i = this[this._mode + "_view"];
    if (i ? i.call(this, !0) : this._reset_scale(), this._trigger_dyn_loading())
      return !0;
    this.render_view_data();
  }, e.isViewExists = function(i) {
    return !!(e[i + "_view"] || e.date[i + "_start"] && e.templates[i + "_date"] && e.templates[i + "_scale_date"]);
  }, e._set_aria_buttons_attrs = function() {
    for (var i = ["dhx_cal_next_button", "dhx_cal_prev_button", "dhx_cal_tab", "dhx_cal_today_button"], r = 0; r < i.length; r++)
      for (var l = this._els[i[r]], _ = 0; l && _ < l.length; _++) {
        var c = l[_].getAttribute("data-tab") || l[_].getAttribute("name"), h = this.locale.labels[i[r]];
        c && (h = this.locale.labels[c + "_tab"] || this.locale.labels[c] || h), i[r] == "dhx_cal_next_button" ? h = this.locale.labels.next : i[r] == "dhx_cal_prev_button" && (h = this.locale.labels.prev), this._waiAria.headerButtonsAttributes(l[_], h || "");
      }
  }, e.updateView = function(i, r) {
    if (!this.$container)
      throw new Error(`The scheduler is not initialized. 
 **scheduler.updateView** or **scheduler.setCurrentView** can be called only after **scheduler.init**`);
    i = i || this._date, r = r || this._mode;
    var l = "dhx_cal_data";
    this.locale.labels.icon_form || (this.locale.labels.icon_form = this.locale.labels.icon_edit);
    var _ = this._obj, c = "dhx_scheduler_" + this._mode, h = "dhx_scheduler_" + r;
    _.classList.remove(c), _.classList.add(h);
    var p, f = "dhx_multi_day", u = !(this._mode != r || !this.config.preserve_scroll) && this._els[l][0].scrollTop;
    this._els[f] && this._els[f][0] && (p = this._els[f][0].scrollTop), this[this._mode + "_view"] && r && this._mode != r && this[this._mode + "_view"](!1), this._close_not_saved(), this._els[f] && (this._els[f][0].parentNode.removeChild(this._els[f][0]), this._els[f] = null), this._mode = r, this._date = i, this._table_view = this._mode == "month", this._dy_shift = 0, this.update_view(), this._set_aria_buttons_attrs();
    var v = this._els.dhx_cal_tab;
    if (v)
      for (var m = 0; m < v.length; m++) {
        var x = v[m];
        x.getAttribute("data-tab") == this._mode || x.getAttribute("name") == this._mode + "_tab" ? (x.classList.add("active"), this._waiAria.headerToggleState(x, !0)) : (x.classList.remove("active"), this._waiAria.headerToggleState(x, !1));
      }
    typeof u == "number" && (this._els[l][0].scrollTop = u), typeof p == "number" && this._els[f] && this._els[f][0] && (this._els[f][0].scrollTop = p);
  }, e.setCurrentView = function(i, r) {
    this.callEvent("onBeforeViewChange", [this._mode, this._date, r || this._mode, i || this._date]) && (this.updateView(i, r), this.callEvent("onViewChange", [this._mode, this._date]));
  }, e.render = function(i, r) {
    e.setCurrentView(i, r);
  }, e._render_x_header = function(i, r, l, _, c) {
    c = c || 0;
    var h = document.createElement("div");
    h.className = "dhx_scale_bar", this.templates[this._mode + "_scalex_class"] && (h.className += " " + this.templates[this._mode + "_scalex_class"](l));
    var p = this._cols[i];
    this._mode == "month" && i === 0 && this.config.left_border && (h.className += " dhx_scale_bar_border", r += 1), this.set_xy(h, p, this.xy.scale_height - 1, r, c);
    var f = this.templates[this._mode + "_scale_date"](l, this._mode);
    h.innerHTML = f, this._waiAria.dayHeaderAttr(h, f), _.appendChild(h);
  }, e._get_columns_num = function(i, r) {
    var l = 7;
    if (!e._table_view) {
      var _ = e.date["get_" + e._mode + "_end"];
      _ && (r = _(i)), l = Math.round((r.valueOf() - i.valueOf()) / 864e5);
    }
    return l;
  }, e._get_timeunit_start = function() {
    return this.date[this._mode + "_start"](new Date(this._date.valueOf()));
  }, e._get_view_end = function() {
    var i = this._get_timeunit_start(), r = e.date.add(i, 1, this._mode);
    if (!e._table_view) {
      var l = e.date["get_" + e._mode + "_end"];
      l && (r = l(i));
    }
    return r;
  }, e._calc_scale_sizes = function(i, r, l) {
    var _ = this.config.rtl, c = i, h = this._get_columns_num(r, l);
    this._process_ignores(r, h, "day", 1);
    for (var p = h - this._ignores_detected, f = 0; f < h; f++)
      this._ignores[f] ? (this._cols[f] = 0, p++) : this._cols[f] = Math.floor(c / (p - f)), c -= this._cols[f], this._colsS[f] = (this._cols[f - 1] || 0) + (this._colsS[f - 1] || (this._table_view ? 0 : _ ? this.xy.scroll_width : this.xy.scale_width));
    this._colsS.col_length = h, this._colsS[h] = this._cols[h - 1] + this._colsS[h - 1] || 0;
  }, e._set_scale_col_size = function(i, r, l) {
    var _ = this.config;
    this.set_xy(i, r, _.hour_size_px * (_.last_hour - _.first_hour), l + this.xy.scale_width + 1, 0);
  }, e._render_scales = function(i, r) {
    var l = new Date(e._min_date), _ = new Date(e._max_date), c = this.date.date_part(e._currentDate()), h = parseInt(i.style.width, 10) - 1, p = new Date(this._min_date), f = this._get_columns_num(l, _);
    this._calc_scale_sizes(h, l, _);
    var u = 0;
    i.innerHTML = "";
    for (var v = 0; v < f; v++) {
      if (this._ignores[v] || this._render_x_header(v, u, p, i), !this._table_view) {
        var m = document.createElement("div"), x = "dhx_scale_holder";
        p.valueOf() == c.valueOf() && (x += " dhx_scale_holder_now"), m.setAttribute("data-column-index", v), this._ignores_detected && this._ignores[v] && (x += " dhx_scale_ignore");
        for (let w = 1 * this.config.first_hour; w < this.config.last_hour; w++) {
          const S = document.createElement("div");
          S.className = "dhx_scale_time_slot dhx_scale_time_slot_hour_start", S.style.height = this.config.hour_size_px / 2 + "px";
          let N = new Date(p.getFullYear(), p.getMonth(), p.getDate(), w, 0);
          S.setAttribute("data-slot-date", this.templates.format_date(N));
          let E = this.templates.time_slot_text(N);
          E && (S.innerHTML = E);
          let T = this.templates.time_slot_class(N);
          T && S.classList.add(T), m.appendChild(S);
          const g = document.createElement("div");
          g.className = "dhx_scale_time_slot", N = new Date(p.getFullYear(), p.getMonth(), p.getDate(), w, 30), g.setAttribute("data-slot-date", this.templates.format_date(N)), g.style.height = this.config.hour_size_px / 2 + "px", E = this.templates.time_slot_text(N), E && (g.innerHTML = E), T = this.templates.time_slot_class(N), T && g.classList.add(T), m.appendChild(g);
        }
        m.className = x + " " + this.templates.week_date_class(p, c), this._waiAria.dayColumnAttr(m, p), this._set_scale_col_size(m, this._cols[v], u), r.appendChild(m), this.callEvent("onScaleAdd", [m, p]);
      }
      u += this._cols[v], p = this.date.add(p, 1, "day"), p = this.date.day_start(p);
    }
  }, e._getNavDateElement = function() {
    return this.$container.querySelector(".dhx_cal_date");
  }, e._reset_scale = function() {
    if (this.templates[this._mode + "_date"]) {
      var i = this._els.dhx_cal_header[0], r = this._els.dhx_cal_data[0], l = this.config;
      i.innerHTML = "", r.innerHTML = "";
      var _, c, h = (l.readonly || !l.drag_resize ? " dhx_resize_denied" : "") + (l.readonly || !l.drag_move ? " dhx_move_denied" : "");
      r.className = "dhx_cal_data" + h, this._scales = {}, this._cols = [], this._colsS = { height: 0 }, this._dy_shift = 0, this.set_sizes();
      var p = this._get_timeunit_start(), f = e._get_view_end();
      _ = c = this._table_view ? e.date.week_start(p) : p, this._min_date = _;
      var u = this.templates[this._mode + "_date"](p, f, this._mode), v = this._getNavDateElement();
      if (v && (v.innerHTML = u, this._waiAria.navBarDateAttr(v, u)), this._max_date = f, e._render_scales(i, r), this._table_view)
        this._reset_month_scale(r, p, c);
      else if (this._reset_hours_scale(r, p, c), l.multi_day) {
        var m = "dhx_multi_day";
        this._els[m] && (this._els[m][0].parentNode.removeChild(this._els[m][0]), this._els[m] = null);
        var x = document.createElement("div");
        x.className = m, x.style.visibility = "hidden", x.style.display = "none";
        var w = this._colsS[this._colsS.col_length], S = l.rtl ? this.xy.scale_width : this.xy.scroll_width, N = Math.max(w + S, 0);
        this.set_xy(x, N, 0, 0), r.parentNode.insertBefore(x, r);
        var E = x.cloneNode(!0);
        E.className = m + "_icon", E.style.visibility = "hidden", E.style.display = "none", this.set_xy(E, this.xy.scale_width + 1, 0, 0), x.appendChild(E), this._els[m] = [x, E], e.event(this._els[m][0], "click", this._click.dhx_cal_data);
      }
    }
  }, e._reset_hours_scale = function(i, r, l) {
    var _ = document.createElement("div");
    _.className = "dhx_scale_holder";
    for (var c = new Date(1980, 1, 1, this.config.first_hour, 0, 0), h = 1 * this.config.first_hour; h < this.config.last_hour; h++) {
      var p = document.createElement("div");
      p.className = "dhx_scale_hour", p.style.height = this.config.hour_size_px + "px";
      var f = this.xy.scale_width;
      this.config.left_border && (p.className += " dhx_scale_hour_border"), p.style.width = f + "px";
      var u = e.templates.hour_scale(c);
      p.innerHTML = u, this._waiAria.hourScaleAttr(p, u), _.appendChild(p), c = this.date.add(c, 1, "hour");
    }
    i.appendChild(_), this.config.scroll_hour && (i.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour));
  }, e._currentDate = function() {
    return e.config.now_date ? new Date(e.config.now_date) : /* @__PURE__ */ new Date();
  }, e._reset_ignores = function() {
    this._ignores = {}, this._ignores_detected = 0;
  }, e._process_ignores = function(i, r, l, _, c) {
    this._reset_ignores();
    var h, p = e["ignore_" + this._mode];
    if (p)
      for (var f = (h = e.date, { add: function(S, N, E) {
        return h.add(S, N, E);
      }, unitStart: function(S, N) {
        var E = h[S + "_start"];
        return typeof E == "function" ? E.call(h, new Date(N)) : S === "hour" ? We(N, !0) : S === "minute" ? We(N, !1) : new Date(N);
      } }), u = r, v = new Date(i), m = 0, x = 0; m < u || c && x < u; ) {
        p(v) ? (this._ignores_detected += 1, this._ignores[m] = !0) : x++;
        var w = gt(v, _, l, f);
        if (!w)
          throw new Error("Unable to produce timeline ignore boundary " + (m + 1));
        v = w, m++;
      }
  }, e._render_month_scale = function(i, r, l, _) {
    var c = e.date.add(r, 1, "month"), h = new Date(l), p = e._currentDate();
    p = this.date.date_part(p), l = this.date.date_part(l), _ = _ || Math.ceil(Math.round((c.valueOf() - l.valueOf()) / 864e5) / 7);
    for (var f = [], u = 0; u <= 7; u++) {
      var v = this._cols[u] || 0;
      isNaN(Number(v)) || (v += "px"), f[u] = v;
    }
    function m(M) {
      var C = e._colsS.height;
      return e._colsS.heights[M + 1] !== void 0 && (C = e._colsS.heights[M + 1] - (e._colsS.heights[M] || 0)), C;
    }
    var x = 0;
    const w = document.createElement("div");
    for (w.classList.add("dhx_cal_month_table"), u = 0; u < _; u++) {
      var S = document.createElement("div");
      S.classList.add("dhx_cal_month_row"), S.style.height = m(u) + "px", w.appendChild(S);
      for (var N = 0; N < 7; N++) {
        var E = document.createElement("div");
        S.appendChild(E);
        var T = "dhx_cal_month_cell";
        l < r ? T += " dhx_before" : l >= c ? T += " dhx_after" : l.valueOf() == p.valueOf() && (T += " dhx_now"), this._ignores_detected && this._ignores[N] && (T += " dhx_scale_ignore"), E.className = T + " " + this.templates.month_date_class(l, p), E.setAttribute("data-cell-date", e.templates.format_date(l));
        var g = "dhx_month_body", b = "dhx_month_head";
        if (N === 0 && this.config.left_border && (g += " dhx_month_body_border", b += " dhx_month_head_border"), this._ignores_detected && this._ignores[N])
          E.appendChild(document.createElement("div")), E.appendChild(document.createElement("div"));
        else {
          E.style.width = f[N], this._waiAria.monthCellAttr(E, l);
          var y = document.createElement("div");
          y.style.height = e.xy.month_head_height + "px", y.className = b, y.innerHTML = this.templates.month_day(l), E.appendChild(y);
          var k = document.createElement("div");
          k.className = g, E.appendChild(k);
        }
        var D = l.getDate();
        (l = this.date.add(l, 1, "day")).getDate() - D > 1 && (l = new Date(l.getFullYear(), l.getMonth(), D + 1, 12, 0));
      }
      e._colsS.heights[u] = x, x += m(u);
    }
    return this._min_date = h, this._max_date = l, i.innerHTML = "", i.appendChild(w), this._scales = {}, i.querySelectorAll("[data-cell-date]").forEach((M) => {
      const C = e.templates.parse_date(M.getAttribute("data-cell-date")), A = M.querySelector(".dhx_month_body");
      this._scales[+C] = A, this.callEvent("onScaleAdd", [this._scales[+C], C]);
    }), this._max_date;
  }, e._reset_month_scale = function(i, r, l, _) {
    var c = e.date.add(r, 1, "month");
    l = this.date.date_part(l), _ = _ || Math.ceil(Math.round((c.valueOf() - l.valueOf()) / 864e5) / 7);
    var h = Math.floor(i.clientHeight / _) - this.xy.month_head_height;
    return this._colsS.height = h + this.xy.month_head_height, this._colsS.heights = [], e._render_month_scale(i, r, l, _);
  }, e.getView = function(i) {
    return i || (i = e.getState().mode), e.matrix && e.matrix[i] ? e.matrix[i] : e._props && e._props[i] ? e._props[i] : null;
  }, e.getLabel = function(i, r) {
    for (var l = this.config.lightbox.sections, _ = 0; _ < l.length; _++)
      if (l[_].map_to == i) {
        for (var c = l[_].options, h = 0; h < c.length; h++)
          if (c[h].key == r)
            return c[h].label;
      }
    return "";
  }, e.updateCollection = function(i, r) {
    var l = e.serverList(i);
    return !!l && (l.splice(0, l.length), l.push.apply(l, r || []), e.callEvent("onOptionsLoad", []), e.resetLightbox(), e.hideCover(), !0);
  }, e._lame_clone = function(i, r) {
    var l, _, c;
    for (r = r || [], l = 0; l < r.length; l += 2)
      if (i === r[l])
        return r[l + 1];
    if (i && typeof i == "object") {
      for (c = Object.create(i), _ = [Array, Date, Number, String, Boolean], l = 0; l < _.length; l++)
        i instanceof _[l] && (c = l ? new _[l](i) : new _[l]());
      for (l in r.push(i, c), i)
        Object.prototype.hasOwnProperty.apply(i, [l]) && (c[l] = e._lame_clone(i[l], r));
    }
    return c || i;
  }, e._lame_copy = function(i, r) {
    for (var l in r)
      r.hasOwnProperty(l) && (i[l] = r[l]);
    return i;
  }, e._get_date_from_pos = function(i) {
    if (!this._table_view) {
      var r = this._min_date;
      return new Date(r.getFullYear(), r.getMonth(), r.getDate() + i.x, r.getHours(), r.getMinutes() + i.y * this.config.time_step);
    }
    var l = this._min_date.valueOf() + i.y * this.config.time_step * 6e4;
    return new Date(this._correct_shift(l));
  }, e.getActionData = function(i) {
    var r = this._mouse_coords(i);
    return { date: this._get_date_from_pos(r), section: r.section };
  }, e._focus = function(i, r) {
    if (i && i.focus)
      if (this._mobile)
        window.setTimeout(function() {
          i.focus();
        }, 10);
      else
        try {
          r && i.select && i.offsetWidth && i.select(), i.focus();
        } catch {
        }
  }, e._get_real_event_length = function(i, r, l) {
    var _, c = r - i, h = this["ignore_" + this._mode], p = 0;
    l.render ? (p = this._get_date_index(l, i), _ = this._get_date_index(l, r), i.valueOf() < e.getState().min_date.valueOf() && (p = -s(i, e.getState().min_date)), r.valueOf() > e.getState().max_date.valueOf() && (_ += s(r, e.getState().max_date))) : _ = Math.round(c / 60 / 60 / 1e3 / 24);
    for (var f = !0; p < _; ) {
      var u = e.date.add(r, -l.x_step, l.x_unit);
      if (h && h(r) && (!f || f && h(u)))
        c -= r - u;
      else {
        let v = 0;
        const m = new Date(Math.max(u.valueOf(), i.valueOf())), x = r, w = new Date(m.getFullYear(), m.getMonth(), m.getDate(), l.first_hour || 0), S = new Date(m.getFullYear(), m.getMonth(), m.getDate(), l.last_hour || 24), N = new Date(r.getFullYear(), r.getMonth(), r.getDate(), l.first_hour || 0), E = new Date(r.getFullYear(), r.getMonth(), r.getDate(), l.last_hour || 24);
        x.valueOf() > E.valueOf() && (v += x - E), x.valueOf() > N.valueOf() ? v += l._start_correction : v += 60 * x.getHours() * 60 * 1e3 + 60 * x.getMinutes() * 1e3, m.valueOf() <= S.valueOf() && (v += l._end_correction), m.valueOf() < w.valueOf() && (v += w.valueOf() - m.valueOf()), c -= v, f = !1;
      }
      r = u, _--;
    }
    return c;
  }, e._get_fictional_event_length = function(i, r, l, _) {
    var c = new Date(i), h = _ ? -1 : 1;
    if (l._start_correction || l._end_correction) {
      var p;
      p = _ ? 60 * c.getHours() + c.getMinutes() - 60 * (l.first_hour || 0) : 60 * (l.last_hour || 0) - (60 * c.getHours() + c.getMinutes());
      var f = 60 * (l.last_hour - l.first_hour), u = Math.ceil((r / 6e4 - p) / f);
      u < 0 && (u = 0), r += u * (1440 - f) * 60 * 1e3;
    }
    var v, m = new Date(1 * i + r * h), x = this["ignore_" + this._mode], w = 0;
    function S() {
      return l.x_unit === "day" ? w * h < v * h : w * h <= v * h;
    }
    for (l.render ? (w = this._get_date_index(l, c), v = this._get_date_index(l, m)) : v = Math.round(r / 60 / 60 / 1e3 / 24); S(); ) {
      var N = e.date.add(c, l.x_step * h, l.x_unit);
      x && x(c) && (r += (N - c) * h, v += h), c = N, w += h;
    }
    return r;
  }, e._get_section_view = function() {
    return this.getView();
  }, e._get_section_property = function() {
    return this.matrix && this.matrix[this._mode] ? this.matrix[this._mode].y_property : this._props && this._props[this._mode] ? this._props[this._mode].map_to : null;
  }, e._is_initialized = function() {
    var i = this.getState();
    return this._obj && i.date && i.mode;
  }, e._is_lightbox_open = function() {
    var i = this.getState();
    return i.lightbox_id !== null && i.lightbox_id !== void 0;
  };
}
const Vt = function(e, o, t) {
  e.addEventListener ? e.addEventListener(o, t, !1) : e.attachEvent && e.attachEvent("on" + o, t);
}, Bt = function(e, o, t) {
  e.removeEventListener ? e.removeEventListener(o, t, !1) : e.detachEvent && e.detachEvent("on" + o, t);
};
function Jt(e) {
  var o = function() {
    const t = (n = Vt, d = Bt) => {
      const a = [], s = { attach(i, r, l, _) {
        a.push({ element: i, event: r, callback: l, capture: _ }), n(i, r, l, _);
      }, detach(i, r, l, _) {
        d(i, r, l, _);
        for (let c = 0; c < a.length; c++) {
          const h = a[c];
          h.element === i && h.event === r && h.callback === l && h.capture === _ && (a.splice(c, 1), c--);
        }
      }, detachAll() {
        const i = a.slice();
        for (let r = 0; r < i.length; r++) {
          const l = i[r];
          s.detach(l.element, l.event, l.callback, l.capture), s.detach(l.element, l.event, l.callback, void 0), s.detach(l.element, l.event, l.callback, !1), s.detach(l.element, l.event, l.callback, !0);
        }
        a.splice(0, a.length);
      }, extend() {
        return t(this.event, this.eventRemove);
      } };
      return s;
    };
    return t();
  }();
  e.event = o.attach, e.eventRemove = o.detach, e._eventRemoveAll = o.detachAll, e._createDomEventScope = o.extend, e._trim = function(t) {
    return (String.prototype.trim || function() {
      return this.replace(/^\s+|\s+$/g, "");
    }).apply(t);
  }, e._isDate = function(t) {
    return !(!t || typeof t != "object") && !!(t.getFullYear && t.getMonth && t.getDate);
  }, e._isObject = function(t) {
    return t && typeof t == "object";
  };
}
function Ge(e) {
  let o = 0, t = 0, n = 0, d = 0;
  const a = e;
  if (e.getBoundingClientRect) {
    const s = e.getBoundingClientRect(), i = document.body, r = document.documentElement || document.body.parentNode || document.body, l = window.pageYOffset || r.scrollTop || i.scrollTop, _ = window.pageXOffset || r.scrollLeft || i.scrollLeft, c = r.clientTop || i.clientTop || 0, h = r.clientLeft || i.clientLeft || 0;
    o = s.top + l - c, t = s.left + _ - h, n = document.body.offsetWidth - s.right, d = document.body.offsetHeight - s.bottom;
  } else {
    let s = e;
    for (; s; )
      o += parseInt(String(s.offsetTop), 10), t += parseInt(String(s.offsetLeft), 10), s = s.offsetParent;
    n = document.body.offsetWidth - a.offsetWidth - t, d = document.body.offsetHeight - a.offsetHeight - o;
  }
  return { y: Math.round(o), x: Math.round(t), width: a.offsetWidth, height: a.offsetHeight, right: Math.round(n), bottom: Math.round(d) };
}
function mt(e) {
  if (!e)
    return "";
  let o = e.className || "";
  return typeof o != "string" && e.className.baseVal && (o = e.className.baseVal), typeof o == "string" && o.indexOf || (o = ""), o || "";
}
function vt(e, o, t = !0) {
  let n = e.target || ("srcElement" in e ? e.srcElement : null);
  for (; n; ) {
    const d = mt(n);
    if (d) {
      const a = d.indexOf(o);
      if (a >= 0) {
        if (!t)
          return n;
        const s = a === 0 || !(d.charAt(a - 1) || "").trim(), i = a + o.length >= d.length || !d.charAt(a + o.length).trim();
        if (s && i)
          return n;
      }
    }
    n = n.parentNode;
  }
  return null;
}
function Wt(e) {
  let o = !1, t = !1;
  if (window.getComputedStyle) {
    const a = window.getComputedStyle(e, null);
    o = a.display, t = a.visibility;
  } else
    e.currentStyle && (o = e.currentStyle.display, t = e.currentStyle.visibility);
  let n = !1;
  const d = vt({ target: e }, "dhx_form_repeat", !1);
  return d && (n = d.style.height === "0px"), n = n || !e.offsetHeight, o !== "none" && t !== "hidden" && !n;
}
function Kt(e) {
  const o = e.getAttribute("tabindex");
  return o !== null && !Number.isNaN(Number(o)) && Number(o) >= 0;
}
function Gt(e) {
  return !{ a: !0, area: !0 }[e.nodeName.toLowerCase()] || !!e.getAttribute("href");
}
function Xt(e) {
  return !{ input: !0, select: !0, textarea: !0, button: !0, object: !0 }[e.nodeName.toLowerCase()] || !e.hasAttribute("disabled");
}
function yt() {
  const e = document.head;
  return !(!e.createShadowRoot && !e.attachShadow);
}
function Xe(e) {
  if (!e || !yt())
    return document.body;
  let o = e;
  for (; o.parentNode; )
    if (o = o.parentNode, o instanceof ShadowRoot)
      return o.host;
  return document.body;
}
const he = { getAbsoluteLeft(e) {
  return this.getOffset(e).left + (parseInt(window.getComputedStyle(e).paddingLeft, 10) || 0);
}, getAbsoluteTop(e) {
  return this.getOffset(e).top + (parseInt(window.getComputedStyle(e).paddingTop, 10) || 0);
}, getOffsetSum(e) {
  let o = 0, t = 0, n = e;
  for (; n; )
    o += parseInt(String(n.offsetTop), 10), t += parseInt(String(n.offsetLeft), 10), n = n.offsetParent;
  return { top: o, left: t };
}, getOffsetRect(e) {
  var d;
  const o = e.getBoundingClientRect();
  let t = 0, n = 0;
  if (/Mobi/.test(navigator.userAgent)) {
    const a = document.createElement("div");
    a.style.position = "absolute", a.style.left = "0px", a.style.top = "0px", a.style.width = "1px", a.style.height = "1px", document.body.appendChild(a);
    const s = a.getBoundingClientRect();
    t = o.top - s.top, n = o.left - s.left, (d = a.parentNode) == null || d.removeChild(a);
  } else {
    const a = document.body, s = document.documentElement, i = window.pageYOffset || s.scrollTop || a.scrollTop, r = window.pageXOffset || s.scrollLeft || a.scrollLeft, l = s.clientTop || a.clientTop || 0, _ = s.clientLeft || a.clientLeft || 0;
    t = o.top + i - l, n = o.left + r - _;
  }
  return { top: Math.round(t), left: Math.round(n) };
}, getOffset(e) {
  return this.getOffsetSum(e);
}, closest: (e, o) => e && o ? function(t, n) {
  if (typeof t.closest == "function")
    return t.closest(n);
  let d = t;
  if (!document.documentElement.contains(d))
    return null;
  do {
    const a = d, s = a.matches || a.msMatchesSelector || a.webkitMatchesSelector;
    if (s != null && s.call(d, n))
      return d;
    d = d.parentElement || d.parentNode;
  } while (d !== null && d.nodeType === 1);
  return console.error("Your browser is not supported"), null;
}(e, o) : null, insertAfter(e, o) {
  o.parentNode && (o.nextSibling ? o.parentNode.insertBefore(e, o.nextSibling) : o.parentNode.appendChild(e));
}, remove(e) {
  e != null && e.parentNode && e.parentNode.removeChild(e);
}, isChildOf: (e, o) => o.contains(e), getFocusableNodes: function(e) {
  const o = e.querySelectorAll(["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"].join(", ")), t = Array.from(o);
  for (let n = 0; n < t.length; n++)
    t[n].$position = n;
  t.sort((n, d) => n.tabIndex === 0 && d.tabIndex !== 0 ? 1 : n.tabIndex !== 0 && d.tabIndex === 0 ? -1 : n.tabIndex === d.tabIndex ? (n.$position || 0) - (d.$position || 0) : n.tabIndex < d.tabIndex ? -1 : 1);
  for (let n = 0; n < t.length; n++) {
    const d = t[n];
    (Kt(d) || Xt(d) || Gt(d)) && Wt(d) || (t.splice(n, 1), n--);
  }
  return t;
}, getClassName: mt, locateCss: vt, getRootNode: Xe, hasShadowParent: function(e) {
  return !!Xe(e);
}, isShadowDomSupported: yt, getActiveElement: function() {
  var o, t;
  let e = document.activeElement;
  return e != null && e.shadowRoot && (e = ((o = e.shadowRoot) == null ? void 0 : o.activeElement) || e), e === document.body && document.getSelection && (e = ((t = document.getSelection()) == null ? void 0 : t.focusNode) || document.body), e;
}, getRelativeEventPosition: function(e, o) {
  const t = document.documentElement, n = Ge(o);
  return { x: e.clientX - t.clientLeft - n.x + o.scrollLeft, y: e.clientY - t.clientTop - n.y + o.scrollTop };
}, getTargetNode: function(e) {
  let o;
  if ("tagName" in e)
    o = e;
  else {
    const t = e || window.event;
    o = t.target || t.srcElement, o != null && o.shadowRoot && t.composedPath && (o = t.composedPath()[0]);
  }
  return o;
}, getNodePosition: function(e) {
  return Ge(e);
} }, bt = typeof window < "u", oe = bt && typeof navigator < "u" ? navigator.userAgent : "", Zt = { isIE: oe.includes("MSIE") || oe.includes("Trident"), isOpera: oe.includes("Opera"), isChrome: oe.includes("Chrome"), isKHTML: oe.includes("Safari") || oe.includes("Konqueror"), isFF: oe.includes("Firefox"), isIPad: /iPad/i.test(oe), isEdge: oe.includes("Edge"), isNode: !bt || typeof navigator > "u" };
function xt(e) {
  if (typeof e == "string")
    return e;
  if (typeof e == "number")
    return String(e);
  var o = "";
  for (var t in e) {
    var n = "";
    e.hasOwnProperty(t) && (n = t + "=" + (n = typeof e[t] == "string" ? encodeURIComponent(e[t]) : typeof e[t] == "number" ? e[t] : encodeURIComponent(JSON.stringify(e[t]))), o.length && (n = "&" + n), o += n);
  }
  return o;
}
function Ze(e) {
  return e ? typeof e == "string" ? e : xt(e) : "";
}
function me(e, o) {
  const t = Array.from(o);
  if (t.length === 0)
    throw new Error("Arguments list of query is wrong.");
  const n = { method: e, url: "" };
  if (t.length === 1) {
    const d = t[0];
    return typeof d == "string" ? (n.url = d, n.async = !0) : (n.url = d.url, n.async = d.async ?? !0, n.callback = d.callback, n.headers = d.headers), e !== "POST" && e !== "PUT" || (n.data = Ze(d.data)), n;
  }
  switch (n.url = t[0], e) {
    case "GET":
    case "DELETE":
      n.callback = t[1], n.headers = t[2];
      break;
    case "POST":
    case "PUT":
      n.data = Ze(t[1]), n.callback = t[2], n.headers = t[3];
  }
  return n;
}
function Qt(e) {
  var o = function(a, s) {
    for (var i = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);", r = a.match(/%[a-zA-Z]/g), l = 0; l < r.length; l++)
      switch (r[l]) {
        case "%j":
        case "%d":
          i += "set[2]=temp[" + l + "]||1;";
          break;
        case "%n":
        case "%m":
          i += "set[1]=(temp[" + l + "]||1)-1;";
          break;
        case "%y":
          i += "set[0]=temp[" + l + "]*1+(temp[" + l + "]>50?1900:2000);";
          break;
        case "%g":
        case "%G":
        case "%h":
        case "%H":
          i += "set[3]=temp[" + l + "]||0;";
          break;
        case "%i":
          i += "set[4]=temp[" + l + "]||0;";
          break;
        case "%Y":
          i += "set[0]=temp[" + l + "]||0;";
          break;
        case "%a":
        case "%A":
          i += "set[3]=set[3]%12+((temp[" + l + "]||'').toLowerCase()=='am'?0:12);";
          break;
        case "%s":
          i += "set[5]=temp[" + l + "]||0;";
          break;
        case "%M":
          i += "set[1]=this.locale.date.month_short_hash[temp[" + l + "]]||0;";
          break;
        case "%F":
          i += "set[1]=this.locale.date.month_full_hash[temp[" + l + "]]||0;";
      }
    var _ = "set[0],set[1],set[2],set[3],set[4],set[5]";
    return s && (_ = " Date.UTC(" + _ + ")"), new Function("date", "var set=[0,0,1,0,0,0]; " + i + " return new Date(" + _ + ");");
  }, t = function(a, s) {
    const i = a.match(/%[a-zA-Z]/g);
    return function(r) {
      for (var l = [0, 0, 1, 0, 0, 0], _ = r.match(/[a-zA-Z]+|[0-9]+/g), c = 0; c < i.length; c++)
        switch (i[c]) {
          case "%j":
          case "%d":
            l[2] = _[c] || 1;
            break;
          case "%n":
          case "%m":
            l[1] = (_[c] || 1) - 1;
            break;
          case "%y":
            l[0] = 1 * _[c] + (_[c] > 50 ? 1900 : 2e3);
            break;
          case "%g":
          case "%G":
          case "%h":
          case "%H":
            l[3] = _[c] || 0;
            break;
          case "%i":
            l[4] = _[c] || 0;
            break;
          case "%Y":
            l[0] = _[c] || 0;
            break;
          case "%a":
          case "%A":
            l[3] = l[3] % 12 + ((_[c] || "").toLowerCase() == "am" ? 0 : 12);
            break;
          case "%s":
            l[5] = _[c] || 0;
            break;
          case "%M":
            l[1] = e.locale.date.month_short_hash[_[c]] || 0;
            break;
          case "%F":
            l[1] = e.locale.date.month_full_hash[_[c]] || 0;
        }
      return s ? new Date(Date.UTC(l[0], l[1], l[2], l[3], l[4], l[5])) : new Date(l[0], l[1], l[2], l[3], l[4], l[5]);
    };
  };
  let n;
  function d() {
    var a = !1;
    return e.config.csp === "auto" ? (n === void 0 && (n = function() {
      try {
        new Function("cspEnabled = false;"), n = !1;
      } catch {
        n = !0;
      }
      return n;
    }()), a = n) : a = e.config.csp, a;
  }
  e.date = { init: function() {
    for (var a = e.locale.date.month_short, s = e.locale.date.month_short_hash = {}, i = 0; i < a.length; i++)
      s[a[i]] = i;
    for (a = e.locale.date.month_full, s = e.locale.date.month_full_hash = {}, i = 0; i < a.length; i++)
      s[a[i]] = i;
  }, date_part: function(a) {
    const s = new Date(a);
    var i = new Date(s);
    return s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0), s.getHours() && (s.getDate() < i.getDate() || s.getMonth() < i.getMonth() || s.getFullYear() < i.getFullYear()) && s.setTime(s.getTime() + 36e5 * (24 - s.getHours())), s;
  }, time_part: function(a) {
    return (a.valueOf() / 1e3 - 60 * a.getTimezoneOffset()) % 86400;
  }, week_start: function(a) {
    var s = a.getDay();
    return e.config.start_on_monday && (s === 0 ? s = 6 : s--), this.date_part(this.add(a, -1 * s, "day"));
  }, month_start: function(a) {
    const s = new Date(a);
    return s.setDate(1), this.date_part(s);
  }, year_start: function(a) {
    const s = new Date(a);
    return s.setMonth(0), this.month_start(s);
  }, day_start: function(a) {
    const s = new Date(a);
    return this.date_part(s);
  }, _add_days: function(a, s) {
    var i = new Date(a.valueOf());
    if (i.setDate(i.getDate() + s), s == Math.round(s) && s > 0) {
      var r = (+i - +a) % 864e5;
      if (r && a.getTimezoneOffset() == i.getTimezoneOffset()) {
        var l = r / 36e5;
        i.setTime(i.getTime() + 60 * (24 - l) * 60 * 1e3);
      }
    }
    return s >= 0 && !a.getHours() && i.getHours() && (i.getDate() < a.getDate() || i.getMonth() < a.getMonth() || i.getFullYear() < a.getFullYear()) && i.setTime(i.getTime() + 36e5 * (24 - i.getHours())), i;
  }, add: function(a, s, i) {
    var r = new Date(a.valueOf());
    switch (i) {
      case "day":
        r = e.date._add_days(r, s);
        break;
      case "week":
        r = e.date._add_days(r, 7 * s);
        break;
      case "month":
        r.setMonth(r.getMonth() + s);
        break;
      case "year":
        r.setYear(r.getFullYear() + s);
        break;
      case "hour":
        r.setTime(r.getTime() + 60 * s * 60 * 1e3);
        break;
      case "minute":
        r.setTime(r.getTime() + 60 * s * 1e3);
        break;
      default:
        return e.date["add_" + i](a, s, i);
    }
    return r;
  }, to_fixed: function(a) {
    return a < 10 ? "0" + a : a;
  }, copy: function(a) {
    return new Date(a.valueOf());
  }, date_to_str: function(a, s) {
    return d() ? function(i, r) {
      return function(l) {
        return i.replace(/%[a-zA-Z]/g, function(_) {
          switch (_) {
            case "%d":
              return r ? e.date.to_fixed(l.getUTCDate()) : e.date.to_fixed(l.getDate());
            case "%m":
              return r ? e.date.to_fixed(l.getUTCMonth() + 1) : e.date.to_fixed(l.getMonth() + 1);
            case "%j":
              return r ? l.getUTCDate() : l.getDate();
            case "%n":
              return r ? l.getUTCMonth() + 1 : l.getMonth() + 1;
            case "%y":
              return r ? e.date.to_fixed(l.getUTCFullYear() % 100) : e.date.to_fixed(l.getFullYear() % 100);
            case "%Y":
              return r ? l.getUTCFullYear() : l.getFullYear();
            case "%D":
              return r ? e.locale.date.day_short[l.getUTCDay()] : e.locale.date.day_short[l.getDay()];
            case "%l":
              return r ? e.locale.date.day_full[l.getUTCDay()] : e.locale.date.day_full[l.getDay()];
            case "%M":
              return r ? e.locale.date.month_short[l.getUTCMonth()] : e.locale.date.month_short[l.getMonth()];
            case "%F":
              return r ? e.locale.date.month_full[l.getUTCMonth()] : e.locale.date.month_full[l.getMonth()];
            case "%h":
              return r ? e.date.to_fixed((l.getUTCHours() + 11) % 12 + 1) : e.date.to_fixed((l.getHours() + 11) % 12 + 1);
            case "%g":
              return r ? (l.getUTCHours() + 11) % 12 + 1 : (l.getHours() + 11) % 12 + 1;
            case "%G":
              return r ? l.getUTCHours() : l.getHours();
            case "%H":
              return r ? e.date.to_fixed(l.getUTCHours()) : e.date.to_fixed(l.getHours());
            case "%i":
              return r ? e.date.to_fixed(l.getUTCMinutes()) : e.date.to_fixed(l.getMinutes());
            case "%a":
              return r ? l.getUTCHours() > 11 ? "pm" : "am" : l.getHours() > 11 ? "pm" : "am";
            case "%A":
              return r ? l.getUTCHours() > 11 ? "PM" : "AM" : l.getHours() > 11 ? "PM" : "AM";
            case "%s":
              return r ? e.date.to_fixed(l.getUTCSeconds()) : e.date.to_fixed(l.getSeconds());
            case "%W":
              return r ? e.date.to_fixed(e.date.getUTCISOWeek(l)) : e.date.to_fixed(e.date.getISOWeek(l));
            default:
              return _;
          }
        });
      };
    }(a, s) : (a = a.replace(/%[a-zA-Z]/g, function(i) {
      switch (i) {
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
          return i;
      }
    }), s && (a = a.replace(/date\.get/g, "date.getUTC")), new Function("date", 'return "' + a + '";').bind(e));
  }, str_to_date: function(a, s, i) {
    var r = d() ? t : o, l = r(a, s), _ = /^[0-9]{4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/, c = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4} ?(([0-9]{1,2}:[0-9]{2})(:[0-9]{1,2})?)?$/, h = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/, p = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/, f = r("%Y-%m-%d %H:%i:%s", s), u = r("%m/%d/%Y %H:%i:%s", s), v = r("%d-%m-%Y %H:%i:%s", s);
    return function(m) {
      if (!i && !e.config.parse_exact_format) {
        if (m && m.getISOWeek)
          return new Date(m);
        if (typeof m == "number")
          return new Date(m);
        if (x = m, _.test(String(x)))
          return f(m);
        if (function(w) {
          return c.test(String(w));
        }(m))
          return u(m);
        if (function(w) {
          return h.test(String(w));
        }(m))
          return v(m);
        if (function(w) {
          return p.test(w);
        }(m))
          return new Date(m);
      }
      var x;
      return l.call(e, m);
    };
  }, getISOWeek: function(a) {
    if (!a)
      return !1;
    var s = (a = this.date_part(new Date(a))).getDay();
    s === 0 && (s = 7);
    var i = new Date(a.valueOf());
    i.setDate(a.getDate() + (4 - s));
    var r = i.getFullYear(), l = Math.round((i.getTime() - new Date(r, 0, 1).getTime()) / 864e5);
    return 1 + Math.floor(l / 7);
  }, getUTCISOWeek: function(a) {
    return this.getISOWeek(this.convert_to_utc(a));
  }, convert_to_utc: function(a) {
    return new Date(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds());
  } };
}
const ea = [];
function ta(e) {
  let o = null, t = null, n = 0, d = null;
  function a(r) {
    return r.getAttribute(e.config.event_attribute);
  }
  function s(r) {
    const l = a(r);
    if (l === null)
      return;
    const _ = o.get(l);
    _ ? _.push(r) : o.set(l, [r]);
  }
  function i() {
    d = n > 0 ? t[n - 1] : null;
  }
  return { sync() {
    const r = e._rendered;
    if (o === null || t !== r || r.length < n || n > 0 && r[n - 1] !== d)
      (function(l) {
        o = /* @__PURE__ */ new Map(), t = l, n = l.length;
        for (let _ = 0; _ < l.length; _++)
          s(l[_]);
        i();
      })(r);
    else if (n !== r.length) {
      for (; n < r.length; n++)
        s(r[n]);
      i();
    }
  }, lookup(r) {
    return this.sync(), o.get(String(r)) || ea;
  }, forget(r) {
    if (o === null)
      return;
    const l = a(r), _ = l === null ? null : o.get(l);
    if (_) {
      const c = _.indexOf(r);
      c > -1 && _.splice(c, 1), _.length || o.delete(l);
    }
    n > 0 && n--, i();
  }, invalidate() {
    o = null, t = null, n = 0, d = null;
  } };
}
function wt(e) {
  return (function() {
    var o = {};
    for (var t in this._events) {
      var n = this._events[t];
      n.id.toString().indexOf("#") == -1 && (o[n.id] = n);
    }
    return o;
  }).bind(e);
}
function aa(e) {
  e._loaded = {}, e._load = function(t, n) {
    if (t = t || this._load_url) {
      var d;
      if (t += (t.indexOf("?") == -1 ? "?" : "&") + "timeshift=" + (/* @__PURE__ */ new Date()).getTimezoneOffset(), this.config.prevent_cache && (t += "&uid=" + this.uid()), n = n || this._date, this._load_mode) {
        var a = this.templates.load_format;
        for (n = this.date[this._load_mode + "_start"](new Date(n.valueOf())); n > this._min_date; )
          n = this.date.add(n, -1, this._load_mode);
        d = n;
        for (var s = !0; d < this._max_date; )
          d = this.date.add(d, 1, this._load_mode), this._loaded[a(n)] && s ? n = this.date.add(n, 1, this._load_mode) : s = !1;
        var i = d;
        do
          d = i, i = this.date.add(d, -1, this._load_mode);
        while (i > n && this._loaded[a(i)]);
        if (d <= n)
          return !1;
        for (e.ajax.get(t + "&from=" + a(n) + "&to=" + a(d), r); n < d; )
          this._loaded[a(n)] = !0, n = this.date.add(n, 1, this._load_mode);
      } else
        e.ajax.get(t, r);
      return this.callEvent("onXLS", []), this.callEvent("onLoadStart", []), !0;
    }
    function r(l) {
      e.on_load(l), e.callEvent("onLoadEnd", []);
    }
  }, e._parsers = {}, function(t) {
    t._parsers.xml = { canParse: function(n, d) {
      if (d.responseXML && d.responseXML.firstChild)
        return !0;
      try {
        var a = t.ajax.parse(d.responseText), s = t.ajax.xmltop("data", a);
        if (s && s.tagName === "data")
          return !0;
      } catch {
      }
      return !1;
    }, parse: function(n) {
      var d;
      if (n.xmlDoc.responseXML || (n.xmlDoc.responseXML = t.ajax.parse(n.xmlDoc.responseText)), (d = t.ajax.xmltop("data", n.xmlDoc)).tagName != "data")
        return null;
      var a = d.getAttribute("dhx_security");
      a && (window.dhtmlx && (window.dhtmlx.security_key = a), t.security_key = a);
      for (var s = t.ajax.xpath("//coll_options", n.xmlDoc), i = 0; i < s.length; i++) {
        var r = s[i].getAttribute("for"), l = t.serverList[r];
        l || (t.serverList[r] = l = []), l.splice(0, l.length);
        for (var _ = t.ajax.xpath(".//item", s[i]), c = 0; c < _.length; c++) {
          for (var h = _[c].attributes, p = { key: _[c].getAttribute("value"), label: _[c].getAttribute("label") }, f = 0; f < h.length; f++) {
            var u = h[f];
            u.nodeName != "value" && u.nodeName != "label" && (p[u.nodeName] = u.nodeValue);
          }
          l.push(p);
        }
      }
      s.length && t.callEvent("onOptionsLoad", []);
      var v = t.ajax.xpath("//userdata", n.xmlDoc);
      for (i = 0; i < v.length; i++) {
        var m = t._xmlNodeToJSON(v[i]);
        t._userdata[m.name] = m.text;
      }
      var x = [];
      for (d = t.ajax.xpath("//event", n.xmlDoc), i = 0; i < d.length; i++) {
        var w = x[i] = t._xmlNodeToJSON(d[i]);
        t._init_event(w);
      }
      return x;
    } };
  }(e), function(t) {
    t.json = t._parsers.json = { canParse: function(n) {
      if (n && typeof n == "object")
        return !0;
      if (typeof n == "string")
        try {
          var d = JSON.parse(n);
          return Object.prototype.toString.call(d) === "[object Object]" || Object.prototype.toString.call(d) === "[object Array]";
        } catch {
          return !1;
        }
      return !1;
    }, parse: function(n) {
      var d = [];
      typeof n == "string" && (n = JSON.parse(n)), Object.prototype.toString.call(n) === "[object Array]" ? d = n : n && (n.events ? d = n.events : n.data && (d = n.data)), d = d || [], n.dhx_security && (window.dhtmlx && (window.dhtmlx.security_key = n.dhx_security), t.security_key = n.dhx_security);
      var a = n && n.collections ? n.collections : {}, s = !1;
      for (var i in a)
        if (a.hasOwnProperty(i)) {
          s = !0;
          var r = a[i], l = t.serverList[i];
          l || (t.serverList[i] = l = []), l.splice(0, l.length);
          for (var _ = 0; _ < r.length; _++) {
            var c = r[_], h = { key: c.value, label: c.label };
            for (var p in c)
              if (c.hasOwnProperty(p)) {
                if (p == "value" || p == "label")
                  continue;
                h[p] = c[p];
              }
            l.push(h);
          }
        }
      s && t.callEvent("onOptionsLoad", []);
      for (var f = [], u = 0; u < d.length; u++) {
        var v = d[u];
        t._init_event(v), f.push(v);
      }
      return f;
    } };
  }(e), function(t) {
    t.ical = t._parsers.ical = { canParse: function(n) {
      return typeof n == "string" && new RegExp("^BEGIN:VCALENDAR").test(n);
    }, parse: function(n) {
      var d = n.match(RegExp(this.c_start + "[^\f]*" + this.c_end, ""));
      if (d.length) {
        d[0] = d[0].replace(/[\r\n]+ /g, ""), d[0] = d[0].replace(/[\r\n]+(?=[a-z \t])/g, " "), d[0] = d[0].replace(/;[^:\r\n]*:/g, ":");
        for (var a, s = [], i = RegExp("(?:" + this.e_start + ")([^\f]*?)(?:" + this.e_end + ")", "g"); (a = i.exec(d)) !== null; ) {
          for (var r, l = {}, _ = /[^\r\n]+[\r\n]+/g; (r = _.exec(a[1])) !== null; )
            this.parse_param(r.toString(), l);
          l.uid && !l.id && (l.id = l.uid), s.push(l);
        }
        return s;
      }
    }, parse_param: function(n, d) {
      var a = n.indexOf(":");
      if (a != -1) {
        var s = n.substr(0, a).toLowerCase(), i = n.substr(a + 1).replace(/\\,/g, ",").replace(/[\r\n]+$/, "");
        s == "summary" ? s = "text" : s == "dtstart" ? (s = "start_date", i = this.parse_date(i, 0, 0)) : s == "dtend" && (s = "end_date", i = this.parse_date(i, 0, 0)), d[s] = i;
      }
    }, parse_date: function(n, d, a) {
      var s = n.split("T"), i = !1;
      s[1] && (d = s[1].substr(0, 2), a = s[1].substr(2, 2), i = s[1][6] == "Z");
      var r = s[0].substr(0, 4), l = parseInt(s[0].substr(4, 2), 10) - 1, _ = s[0].substr(6, 2);
      return t.config.server_utc || i ? new Date(Date.UTC(r, l, _, d, a)) : new Date(r, l, _, d, a);
    }, c_start: "BEGIN:VCALENDAR", e_start: "BEGIN:VEVENT", e_end: "END:VEVENT", c_end: "END:VCALENDAR" };
  }(e), e.on_load = function(t) {
    var n;
    this.callEvent("onBeforeParse", []);
    var d = !1, a = !1;
    for (var s in this._parsers) {
      var i = this._parsers[s];
      if (i.canParse(t.xmlDoc.responseText, t.xmlDoc)) {
        try {
          var r = t.xmlDoc.responseText;
          s === "xml" && (r = t), (n = i.parse(r)) || (d = !0);
        } catch {
          d = !0;
        }
        a = !0;
        break;
      }
    }
    if (!a)
      if (this._process && this[this._process])
        try {
          n = this[this._process].parse(t.xmlDoc.responseText);
        } catch {
          d = !0;
        }
      else
        d = !0;
    (d || t.xmlDoc.status && t.xmlDoc.status >= 400) && (this.callEvent("onLoadError", [t.xmlDoc]), n = []), this._process_loading(n), this.callEvent("onXLE", []), this.callEvent("onParse", []);
  }, e._process_loading = function(t) {
    this._loading = !0, this._not_render = !0;
    for (var n = 0; n < t.length; n++)
      this.callEvent("onEventLoading", [t[n]]) && this.addEvent(t[n]);
    this._not_render = !1, this._render_wait && this.render_view_data(), this._loading = !1, this._after_call && this._after_call(), this._after_call = null;
  }, e._init_event = function(t) {
    t.text = t.text || t._tagvalue || "", t.start_date = e._init_date(t.start_date), t.end_date = e._init_date(t.end_date);
  }, e._init_date = function(t) {
    return t ? typeof t == "string" ? e._helpers.parseDate(t) : new Date(t) : null;
  };
  const o = wt(e);
  e.serialize = function() {
    const t = [], n = o();
    for (var d in n) {
      const i = {};
      var a = n[d];
      for (var s in a) {
        if (s.charAt(0) == "$" || s.charAt(0) == "_")
          continue;
        let r;
        const l = a[s];
        r = e.utils.isDate(l) ? e.defined(e.templates.xml_format) ? e.templates.xml_format(l) : e.templates.format_date(l) : l, i[s] = r;
      }
      t.push(i);
    }
    return t;
  }, e.parse = function(t, n) {
    this._process = n, this.on_load({ xmlDoc: { responseText: t } });
  }, e.load = function(t, n) {
    typeof n == "string" && (this._process = n, n = arguments[2]), this._load_url = t, this._after_call = n, this._load(t, this._date);
  }, e.setLoadMode = function(t) {
    t == "all" && (t = ""), this._load_mode = t;
  }, e.serverList = function(t, n) {
    return n ? (this.serverList[t] = n.slice(0), this.serverList[t]) : (this.serverList[t] = this.serverList[t] || [], this.serverList[t]);
  }, e._userdata = {}, e._xmlNodeToJSON = function(t) {
    for (var n = {}, d = 0; d < t.attributes.length; d++)
      n[t.attributes[d].name] = t.attributes[d].value;
    for (d = 0; d < t.childNodes.length; d++) {
      var a = t.childNodes[d];
      a.nodeType == 1 && (n[a.tagName] = a.firstChild ? a.firstChild.nodeValue : "");
    }
    return n.text || (n.text = t.firstChild ? t.firstChild.nodeValue : ""), n;
  }, e.attachEvent("onXLS", function() {
    var t;
    this.config.show_loading === !0 && ((t = this.config.show_loading = document.createElement("div")).className = "dhx_loading", t.style.left = Math.round((this._x - 128) / 2) + "px", t.style.top = Math.round((this._y - 15) / 2) + "px", this._obj.appendChild(t));
  }), e.attachEvent("onXLE", function() {
    var t = this.config.show_loading;
    t && typeof t == "object" && (t.parentNode && t.parentNode.removeChild(t), this.config.show_loading = !0);
  });
}
function na(e) {
  function o() {
    const t = e.config.csp === !0, n = !!window.Sfdc || !!window.$A || window.Aura || "$shadowResolver$" in document.body;
    return t || n ? e.$root : document.body;
  }
  e._lightbox_controls = {}, e.formSection = function(t) {
    for (var n = this.config.lightbox.sections, d = 0; d < n.length && n[d].name != t; d++)
      ;
    if (d === n.length)
      return null;
    var a = n[d];
    e._lightbox || e.getLightbox();
    var s = e._lightbox.querySelector(`#${a.id}`), i = s.nextSibling, r = { section: a, header: s, node: i, getValue: function(_) {
      return e.form_blocks[a.type].get_value(i, _ || {}, a);
    }, setValue: function(_, c) {
      return e.form_blocks[a.type].set_value(i, _, c || {}, a);
    } }, l = e._lightbox_controls["get_" + a.type + "_control"];
    return l ? l(r) : r;
  }, e._lightbox_controls.get_template_control = function(t) {
    return t.control = t.node, t;
  }, e._lightbox_controls.get_select_control = function(t) {
    return t.control = t.node.getElementsByTagName("select")[0], t;
  }, e._lightbox_controls.get_textarea_control = function(t) {
    return t.control = t.node.getElementsByTagName("textarea")[0], t;
  }, e._lightbox_controls.get_time_control = function(t) {
    return t.control = t.node.getElementsByTagName("select"), t;
  }, e._lightbox_controls.defaults = { template: { height: 30 }, textarea: { height: 200 }, select: { height: 23 }, time: { height: 20 } }, e.form_blocks = { template: { render: function(t) {
    return `<div class='dhx_cal_ltext dhx_cal_template' ${t.height ? `style='height:${t.height}px;'` : ""}></div>`;
  }, set_value: function(t, n, d, a) {
    t.innerHTML = n || "";
  }, get_value: function(t, n, d) {
    return t.innerHTML || "";
  }, focus: function(t) {
  } }, textarea: { render: function(t) {
    return `<div class='dhx_cal_ltext' ${t.height ? `style='height:${t.height}px;'` : ""}><textarea ${t.placeholder ? `placeholder='${t.placeholder}'` : ""}></textarea></div>`;
  }, set_value: function(t, n, d) {
    e.form_blocks.textarea._get_input(t).value = n || "";
  }, get_value: function(t, n) {
    return e.form_blocks.textarea._get_input(t).value;
  }, focus: function(t) {
    var n = e.form_blocks.textarea._get_input(t);
    e._focus(n, !0);
  }, _get_input: function(t) {
    return t.getElementsByTagName("textarea")[0];
  } }, select: { render: function(t) {
    for (var n = `<div class='dhx_cal_ltext dhx_cal_select' ${t.height ? `style='height:${t.height}px;'` : ""}><select style='width:100%;'>`, d = 0; d < t.options.length; d++)
      n += "<option value='" + t.options[d].key + "'>" + t.options[d].label + "</option>";
    return n += "</select></div>";
  }, set_value: function(t, n, d, a) {
    var s = t.firstChild;
    !s._dhx_onchange && a.onchange && (e.event(s, "change", a.onchange), s._dhx_onchange = !0), n === void 0 && (n = (s.options[0] || {}).value), s.value = n || "";
  }, get_value: function(t, n) {
    return t.firstChild.value;
  }, focus: function(t) {
    var n = t.firstChild;
    e._focus(n, !0);
  } }, time: { render: function(t) {
    t.time_format || (t.time_format = ["%H:%i", "%d", "%m", "%Y"]), t._time_format_order = {};
    var n = t.time_format, d = e.config, a = e.date.date_part(e._currentDate()), s = 1440, i = 0;
    e.config.limit_time_select && (s = 60 * d.last_hour + 1, i = 60 * d.first_hour, a.setHours(d.first_hour));
    for (var r = "", l = 0; l < n.length; l++) {
      var _ = n[l];
      l > 0 && (r += " ");
      var c = "", h = "";
      switch (_) {
        case "%Y":
          var p, f, u;
          c = "dhx_lightbox_year_select", t._time_format_order[3] = l, t.year_range && (isNaN(t.year_range) ? t.year_range.push && (f = t.year_range[0], u = t.year_range[1]) : p = t.year_range), p = p || 10;
          var v = v || Math.floor(p / 2);
          f = f || a.getFullYear() - v, u = u || f + p;
          for (var m = f; m < u; m++)
            h += "<option value='" + m + "'>" + m + "</option>";
          break;
        case "%m":
          for (c = "dhx_lightbox_month_select", t._time_format_order[2] = l, m = 0; m < 12; m++)
            h += "<option value='" + m + "'>" + this.locale.date.month_full[m] + "</option>";
          break;
        case "%d":
          for (c = "dhx_lightbox_day_select", t._time_format_order[1] = l, m = 1; m < 32; m++)
            h += "<option value='" + m + "'>" + m + "</option>";
          break;
        case "%H:%i":
          c = "dhx_lightbox_time_select", t._time_format_order[0] = l, m = i;
          var x = a.getDate();
          for (t._time_values = []; m < s; )
            h += "<option value='" + m + "'>" + this.templates.time_picker(a) + "</option>", t._time_values.push(m), a.setTime(a.valueOf() + 60 * this.config.time_step * 1e3), m = 24 * (a.getDate() != x ? 1 : 0) * 60 + 60 * a.getHours() + a.getMinutes();
      }
      if (h) {
        var w = e._waiAria.lightboxSelectAttrString(_);
        r += "<select class='" + c + "' " + (t.readonly ? "disabled='disabled'" : "") + w + ">" + h + "</select> ";
      }
    }
    return `<div class='dhx_section_time' ${t.height ? `style='height:${t.height}px;'` : ""}>${r}<span style='font-weight:normal; font-size:10pt;' class='dhx_section_time_spacer'> &nbsp;&ndash;&nbsp; </span>${r}</div>`;
  }, set_value: function(t, n, d, a) {
    var s, i, r = e.config, l = t.getElementsByTagName("select"), _ = a._time_format_order;
    if (r.full_day) {
      if (!t._full_day) {
        var c = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + e.locale.labels.full_day + "&nbsp;</label></input>";
        e.config.wide_form || (c = t.previousSibling.innerHTML + c), t.previousSibling.innerHTML = c, t._full_day = !0;
      }
      var h = t.previousSibling.getElementsByTagName("input")[0];
      h.checked = e.date.time_part(d.start_date) === 0 && e.date.time_part(d.end_date) === 0, l[_[0]].disabled = h.checked, l[_[0] + l.length / 2].disabled = h.checked, h.$_eventAttached || (h.$_eventAttached = !0, e.event(h, "click", function() {
        if (h.checked) {
          var v = {};
          e.form_blocks.time.get_value(t, v, a), s = e.date.date_part(v.start_date), (+(i = e.date.date_part(v.end_date)) == +s || +i >= +s && (d.end_date.getHours() !== 0 || d.end_date.getMinutes() !== 0)) && (i = e.date.add(i, 1, "day"));
        } else
          s = null, i = null;
        l[_[0]].disabled = h.checked, l[_[0] + l.length / 2].disabled = h.checked, u(l, 0, s || d.start_date), u(l, 4, i || d.end_date);
      }));
    }
    if (r.auto_end_date && r.event_duration)
      for (var p = function() {
        r.auto_end_date && r.event_duration && (s = new Date(l[_[3]].value, l[_[2]].value, l[_[1]].value, 0, l[_[0]].value), i = new Date(s.getTime() + 60 * e.config.event_duration * 1e3), u(l, 4, i));
      }, f = 0; f < 4; f++)
        l[f].$_eventAttached || (l[f].$_eventAttached = !0, e.event(l[f], "change", p));
    function u(v, m, x) {
      for (var w = a._time_values, S = 60 * x.getHours() + x.getMinutes(), N = S, E = !1, T = 0; T < w.length; T++) {
        var g = w[T];
        if (g === S) {
          E = !0;
          break;
        }
        g < S && (N = g);
      }
      v[m + _[0]].value = E ? S : N, E || N || (v[m + _[0]].selectedIndex = -1), v[m + _[1]].value = x.getDate(), v[m + _[2]].value = x.getMonth(), v[m + _[3]].value = x.getFullYear();
    }
    u(l, 0, d.start_date), u(l, 4, d.end_date);
  }, get_value: function(t, n, d) {
    var a = t.getElementsByTagName("select"), s = d._time_format_order;
    if (n.start_date = new Date(a[s[3]].value, a[s[2]].value, a[s[1]].value, 0, a[s[0]].value), n.end_date = new Date(a[s[3] + 4].value, a[s[2] + 4].value, a[s[1] + 4].value, 0, a[s[0] + 4].value), !a[s[3]].value || !a[s[3] + 4].value) {
      var i = e.getEvent(e._lightbox_id);
      i && (n.start_date = i.start_date, n.end_date = i.end_date);
    }
    return n.end_date <= n.start_date && (n.end_date = e.date.add(n.start_date, e.config.time_step, "minute")), { start_date: new Date(n.start_date), end_date: new Date(n.end_date) };
  }, focus: function(t) {
    e._focus(t.getElementsByTagName("select")[0]);
  } } }, e._setLbPosition = function(t) {
    t && (t.style.top = Math.max(o().offsetHeight / 2 - t.offsetHeight / 2, 0) + "px", t.style.left = Math.max(o().offsetWidth / 2 - t.offsetWidth / 2, 0) + "px");
  }, e.showCover = function(t) {
    t && (t.style.display = "block", this._setLbPosition(t)), e.config.responsive_lightbox && (document.documentElement.classList.add("dhx_cal_overflow_container"), o().classList.add("dhx_cal_overflow_container")), this.show_cover(), this._cover.style.display = "";
  }, e.showLightbox = function(t) {
    if (t)
      if (this.callEvent("onBeforeLightbox", [t])) {
        this.showCover(n);
        var n = this.getLightbox();
        this._setLbPosition(n), this._fill_lightbox(t, n), this._waiAria.lightboxVisibleAttr(n), this.callEvent("onLightbox", [t]);
      } else
        this._new_event && (this._new_event = null, e.getEvent(t) && delete e.getEvent(t).$new);
  }, e._fill_lightbox = function(t, n) {
    var d = this.getEvent(t), a = n.getElementsByTagName("span"), s = [];
    if (e.templates.lightbox_header) {
      s.push("");
      var i = e.templates.lightbox_header(d.start_date, d.end_date, d);
      s.push(i), a[1].innerHTML = "", a[2].innerHTML = i;
    } else {
      var r = this.templates.event_header(d.start_date, d.end_date, d), l = (this.templates.event_bar_text(d.start_date, d.end_date, d) || "").substr(0, 70);
      s.push(r), s.push(l), a[1].innerHTML = r, a[2].innerHTML = l;
    }
    this._waiAria.lightboxHeader(n, s.join(" "));
    for (var _ = this.config.lightbox.sections, c = 0; c < _.length; c++) {
      var h = _[c], p = e._get_lightbox_section_node(h), f = this.form_blocks[h.type], u = d[h.map_to] !== void 0 ? d[h.map_to] : h.default_value;
      f.set_value.call(this, p, u, d, h), _[c].focus && f.focus.call(this, p);
    }
    e._lightbox_id = t;
  }, e._get_lightbox_section_node = function(t) {
    return e._lightbox.querySelector(`#${t.id}`).nextSibling;
  }, e._lightbox_out = function(t) {
    for (var n = this.config.lightbox.sections, d = 0; d < n.length; d++) {
      var a = e._lightbox.querySelector(`#${n[d].id}`);
      a = a && a.nextSibling;
      var s = this.form_blocks[n[d].type].get_value.call(this, a, t, n[d]);
      n[d].map_to != "auto" && (t[n[d].map_to] = s);
    }
    return t;
  }, e._empty_lightbox = function(t) {
    var n = e._lightbox_id, d = this.getEvent(n);
    d && (this._lame_copy(d, t), this.setEvent(d.id, d), this._edit_stop_event(d, !0)), this.render_view_data();
  }, e.hide_lightbox = function(t) {
    e.endLightbox(!1, this.getLightbox());
  }, e.hideCover = function(t) {
    t && (t.style.display = "none"), this.hide_cover(), e.config.responsive_lightbox && (document.documentElement.classList.remove("dhx_cal_overflow_container"), o().classList.remove("dhx_cal_overflow_container"));
  }, e.hide_cover = function() {
    this._cover && this._cover.parentNode.removeChild(this._cover), this._cover = null;
  }, e.show_cover = function() {
    this._cover || (this._cover = document.createElement("div"), this._cover.className = "dhx_cal_cover", this._cover.style.display = "none", e.event(this._cover, "mousemove", e._move_while_dnd), e.event(this._cover, "mouseup", e._finish_dnd), o().appendChild(this._cover));
  }, e.save_lightbox = function() {
    var t = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
    this.checkEvent("onEventSave") && !this.callEvent("onEventSave", [this._lightbox_id, t, this._new_event]) || (this.checkEvent("onRecurringEventSave") && e.callEvent("onRecurringEventSave", [this._lightbox_id, t, this._new_event]), this._empty_lightbox(t), this.hide_lightbox());
  }, e.startLightbox = function(t, n) {
    this._lightbox_id = t, this._custom_lightbox = !0, this._temp_lightbox = this._lightbox, this._lightbox = n, this.showCover(n);
  }, e.endLightbox = function(t, n) {
    n = n || e.getLightbox();
    var d = e.getEvent(this._lightbox_id);
    d && this._edit_stop_event(d, t), t && e.render_view_data(), this.hideCover(n), this._custom_lightbox && (this._lightbox = this._temp_lightbox, this._custom_lightbox = !1), this._temp_lightbox = this._lightbox_id = null, this._waiAria.lightboxHiddenAttr(n), this.resetLightbox(), this.callEvent("onAfterLightbox", []);
  }, e.resetLightbox = function() {
    e._lightbox && !e._custom_lightbox && e._lightbox.parentNode.removeChild(e._lightbox), e._lightbox = null;
  }, e.cancel_lightbox = function() {
    this._lightbox_id && this.callEvent("onEventCancel", [this._lightbox_id, !!this._new_event]), this.hide_lightbox();
  }, e.hideLightbox = e.cancel_lightbox, e._delete_event_confirm = function({ event: t, message: n, title: d, callback: a, ok: s }) {
    e._dhtmlx_confirm({ message: n, title: d, callback: a, ok: s });
  }, e._init_lightbox_events = function() {
    if (this.getLightbox().$_eventAttached)
      return;
    const t = this.getLightbox();
    t.$_eventAttached = !0, e.event(t, "click", function(n) {
      n.target.closest(".dhx_cal_ltitle_close_btn") && e.cancel_lightbox();
      const d = e.$domHelpers.closest(n.target, ".dhx_btn_set");
      if (!d) {
        const i = e.$domHelpers.closest(n.target, ".dhx_custom_button[data-section-index]");
        if (i) {
          const r = Number(i.getAttribute("data-section-index"));
          e.form_blocks[e.config.lightbox.sections[r].type].button_click(e.$domHelpers.closest(i, ".dhx_cal_lsection"), i, n);
        }
        return;
      }
      const a = d ? d.getAttribute("data-action") : null;
      switch (a) {
        case "dhx_save_btn":
        case "save":
          if (e.config.readonly_active)
            return;
          e.save_lightbox();
          break;
        case "dhx_delete_btn":
        case "delete":
          if (e.config.readonly_active)
            return;
          var s = e.locale.labels.confirm_deleting;
          e._delete_event_confirm({ event: e.getEvent(e._lightbox_id), message: s, title: e.locale.labels.title_confirm_deleting, callback: function() {
            let i = e.getEvent(e._lightbox_id);
            i._thisAndFollowing ? (i._removeFollowing = !0, e.callEvent("onRecurringEventSave", [i.id, i, e._new_event])) : e.deleteEvent(e._lightbox_id), e._new_event = null, delete i.$new, e.hide_lightbox();
          }, config: { ok: e.locale.labels.icon_delete } });
          break;
        case "dhx_cancel_btn":
        case "cancel":
          e.cancel_lightbox();
          break;
        default:
          e.callEvent("onLightboxButton", [a, d, n]);
      }
    }), e.event(t, "keydown", function(n) {
      var d = n || window.event, a = n.target || n.srcElement, s = a.querySelector("[dhx_button]");
      switch (s || (s = a.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")), (n || d).keyCode) {
        case 32:
          if ((n || d).shiftKey)
            return;
          s && s.click && s.click();
          break;
        case e.keys.edit_save:
          if ((n || d).shiftKey)
            return;
          if (s && s.click)
            s.click();
          else {
            if (e.config.readonly_active)
              return;
            e.save_lightbox();
          }
          break;
        case e.keys.edit_cancel:
          e.cancel_lightbox();
      }
    }), e.event(t, "click", function(n) {
      if (n.target.closest(".dhx_lightbox_day_select") || n.target.closest(".dhx_lightbox_month_select")) {
        const d = t.querySelectorAll(".dhx_lightbox_month_select"), a = t.querySelectorAll(".dhx_lightbox_day_select"), s = t.querySelectorAll(".dhx_lightbox_year_select");
        d.length && a.length && s && d.forEach((i, r) => {
          const l = a[r], _ = parseInt(i.value, 10);
          let c = parseInt(s[r].value, 10);
          c || (c = new Date(e.getState().date).getFullYear());
          const h = function(u, v) {
            return new Date(u, v + 1, 0).getDate();
          }(c, _), p = h || 31;
          let f = l.value;
          l.innerHTML = "";
          for (let u = 1; u <= p; u++) {
            const v = document.createElement("option");
            v.value = u, v.textContent = u, l.appendChild(v);
          }
          l.value = Math.min(f, p);
        });
      }
    });
  }, e.setLightboxSize = function() {
  }, e._init_dnd_events = function() {
    e.event(o(), "mousemove", e._move_while_dnd), e.event(o(), "mouseup", e._finish_dnd), e._init_dnd_events = function() {
    };
  }, e._move_while_dnd = function(t) {
    if (e._dnd_start_lb) {
      document.dhx_unselectable || (o().classList.add("dhx_unselectable"), document.dhx_unselectable = !0);
      var n = e.getLightbox(), d = [t.pageX, t.pageY];
      n.style.top = e._lb_start[1] + d[1] - e._dnd_start_lb[1] + "px", n.style.left = e._lb_start[0] + d[0] - e._dnd_start_lb[0] + "px";
    }
  }, e._ready_to_dnd = function(t) {
    var n = e.getLightbox();
    e._lb_start = [n.offsetLeft, n.offsetTop], e._dnd_start_lb = [t.pageX, t.pageY];
  }, e._finish_dnd = function() {
    e._lb_start && (e._lb_start = e._dnd_start_lb = !1, o().classList.remove("dhx_unselectable"), document.dhx_unselectable = !1);
  }, e.getLightbox = function() {
    if (!this._lightbox) {
      var t = document.createElement("div");
      t.className = "dhx_cal_light", e.config.wide_form && (t.className += " dhx_cal_light_wide"), e.form_blocks.recurring && (t.className += " dhx_cal_light_rec"), e.config.rtl && (t.className += " dhx_cal_light_rtl"), e.config.responsive_lightbox && (t.className += " dhx_cal_light_responsive"), t.style.visibility = "hidden";
      var n = this._lightbox_template, d = this.config.buttons_right;
      n += "<div class='dhx_cal_lcontrols'>";
      for (var a = 0; a < d.length; a++)
        n += "<div " + this._waiAria.lightboxButtonAttrString(d[a]) + " data-action='" + d[a] + "' class='dhx_btn_set dhx_" + (e.config.rtl ? "right" : "left") + "_btn_set " + d[a] + "_set'><div class='dhx_btn_inner " + d[a] + "'></div><div>" + e.locale.labels[d[a]] + "</div></div>";
      d = this.config.buttons_left;
      var s = e.config.rtl;
      for (a = 0; a < d.length; a++)
        n += "<div class='dhx_cal_lcontrols_push_right'></div>", n += "<div " + this._waiAria.lightboxButtonAttrString(d[a]) + " data-action='" + d[a] + "' class='dhx_btn_set dhx_" + (s ? "left" : "right") + "_btn_set " + d[a] + "_set'><div class='dhx_btn_inner " + d[a] + "'></div><div>" + e.locale.labels[d[a]] + "</div></div>";
      n += "</div>", n += "</div>", t.innerHTML = n, e.config.drag_lightbox && (e.event(t.firstChild, "mousedown", e._ready_to_dnd), e.event(t.firstChild, "selectstart", function(p) {
        return p.preventDefault(), !1;
      }), t.firstChild.style.cursor = "move", e._init_dnd_events()), this._waiAria.lightboxAttr(t), this.show_cover(), this._cover.insertBefore(t, this._cover.firstChild), this._lightbox = t;
      var i = this.config.lightbox.sections;
      for (n = "", a = 0; a < i.length; a++) {
        var r = this.form_blocks[i[a].type];
        if (r) {
          i[a].id = "area_" + this.uid();
          var l = "";
          i[a].button && (l = "<div " + e._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_" + i[a].button]) + " class='dhx_custom_button' data-section-index='" + a + "' index='" + a + "'><div class='dhx_custom_button_" + i[a].button + "'></div><div>" + this.locale.labels["button_" + i[a].button] + "</div></div>"), this.config.wide_form && (n += "<div class='dhx_wrap_section'>");
          var _ = this.locale.labels["section_" + i[a].name];
          typeof _ != "string" && (_ = i[a].name), n += "<div id='" + i[a].id + "' class='dhx_cal_lsection dhx_cal_lsection_" + i[a].name + "'>" + l + "<label>" + _ + "</label></div>" + r.render.call(this, i[a]), n += "</div>";
        }
      }
      var c = t.getElementsByTagName("div");
      for (a = 0; a < c.length; a++) {
        var h = c[a];
        if (e._getClassName(h) == "dhx_cal_larea") {
          h.innerHTML = n;
          break;
        }
      }
      e._bindLightboxLabels(i), this.setLightboxSize(), this._init_lightbox_events(this), t.style.visibility = "visible";
    }
    return this._lightbox;
  }, e._bindLightboxLabels = function(t) {
    for (var n = 0; n < t.length; n++) {
      var d = t[n];
      if (d.id && e._lightbox.querySelector(`#${d.id}`)) {
        for (var a = e._lightbox.querySelector(`#${d.id}`).querySelector("label"), s = e._get_lightbox_section_node(d); s && !s.querySelector; )
          s = s.nextSibling;
        var i = !0;
        if (s) {
          var r = s.querySelector("input, select, textarea");
          r && (d.inputId = r.id || "input_" + e.uid(), r.id || (r.id = d.inputId), a.setAttribute("for", d.inputId), i = !1);
        }
        i && e.form_blocks[d.type].focus && e.event(a, "click", function(l) {
          return function() {
            var _ = e.form_blocks[l.type], c = e._get_lightbox_section_node(l);
            _ && _.focus && _.focus.call(e, c);
          };
        }(d));
      }
    }
  }, e.attachEvent("onEventIdChange", function(t, n) {
    this._lightbox_id == t && (this._lightbox_id = n);
  }), e._lightbox_template = `<div class='dhx_cal_ltitle'><div class="dhx_cal_ltitle_descr"><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span>
</div>
<div class="dhx_cal_ltitle_controls">
<a class="dhx_cal_ltitle_close_btn scheduler_icon close"></a>
</div></div><div class='dhx_cal_larea'></div>`;
}
function ra(e) {
  e._init_touch_events = function() {
    if ((this.config.touch && (navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("Touch") != -1) && !window.MSStream || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && (this.xy.scroll_width = 0, this._mobile = !0), this.config.touch) {
      var o = !0;
      try {
        document.createEvent("TouchEvent");
      } catch {
        o = !1;
      }
      o ? this._touch_events(["touchmove", "touchstart", "touchend"], function(t) {
        return t.touches && t.touches.length > 1 ? null : t.touches[0] ? { target: t.target, pageX: t.touches[0].pageX, pageY: t.touches[0].pageY, clientX: t.touches[0].clientX, clientY: t.touches[0].clientY } : t;
      }, function() {
        return !1;
      }) : window.PointerEvent || window.navigator.pointerEnabled ? this._touch_events(["pointermove", "pointerdown", "pointerup"], function(t) {
        return t.pointerType == "mouse" ? null : t;
      }, function(t) {
        return !t || t.pointerType == "mouse";
      }) : window.navigator.msPointerEnabled && this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function(t) {
        return t.pointerType == t.MSPOINTER_TYPE_MOUSE ? null : t;
      }, function(t) {
        return !t || t.pointerType == t.MSPOINTER_TYPE_MOUSE;
      });
    }
  }, e._touch_events = function(o, t, n) {
    var d, a, s, i, r, l, _ = 0;
    function c(p, f, u) {
      e.event(p, f, function(v) {
        return !!e._is_lightbox_open() || (n(v) ? void 0 : u(v));
      }, { passive: !1 });
    }
    function h(p) {
      n(p) || (e._hide_global_tip(), i && (e._on_mouse_up(t(p)), e._temp_touch_block = !1), e._drag_id = null, e._drag_mode = null, e._drag_pos = null, e._pointerDragId = null, clearTimeout(s), i = l = !1, r = !0);
    }
    c(document.body, o[0], function(p) {
      if (!n(p)) {
        var f = t(p);
        if (f) {
          if (i)
            return function(u) {
              if (!n(u)) {
                var v = e.getState().drag_mode, m = !!e.matrix && e.matrix[e._mode], x = e.render_view_data;
                v == "create" && m && (e.render_view_data = function() {
                  for (var w = e.getState().drag_id, S = e.getEvent(w), N = m.y_property, E = e.getEvents(S.start_date, S.end_date), T = 0; T < E.length; T++)
                    E[T][N] != S[N] && (E.splice(T, 1), T--);
                  S._sorder = E.length - 1, S._count = E.length, this.render_data([S], e.getState().mode);
                }), e._on_mouse_move(u), v == "create" && m && (e.render_view_data = x), u.preventDefault && u.preventDefault(), u.cancelBubble = !0;
              }
            }(f), p.preventDefault && p.preventDefault(), p.cancelBubble = !0, e._update_global_tip(), !1;
          a = t(p), l && (a ? (d.target != a.target || Math.abs(d.pageX - a.pageX) > 5 || Math.abs(d.pageY - a.pageY) > 5) && (r = !0, clearTimeout(s)) : r = !0);
        }
      }
    }), c(this._els.dhx_cal_data[0], "touchcancel", h), c(this._els.dhx_cal_data[0], "contextmenu", function(p) {
      if (!n(p))
        return l ? (p && p.preventDefault && p.preventDefault(), p.cancelBubble = !0, !1) : void 0;
    }), c(this._obj, o[1], function(p) {
      var f;
      if (document && document.body && document.body.classList.add("dhx_cal_touch_active"), !n(p))
        if (e._pointerDragId = p.pointerId, i = r = !1, l = !0, f = a = t(p)) {
          var u = /* @__PURE__ */ new Date();
          if (!r && !i && u - _ < 250)
            return e._click.dhx_cal_data(f), window.setTimeout(function() {
              e.$destroyed || e._on_dbl_click(f);
            }, 50), p.preventDefault && p.preventDefault(), p.cancelBubble = !0, e._block_next_stop = !0, !1;
          if (_ = u, !r && !i && e.config.touch_drag) {
            var v = e._locate_event(document.activeElement), m = e._locate_event(f.target), x = d ? e._locate_event(d.target) : null;
            if (v && m && v == m && v != x)
              return p.preventDefault && p.preventDefault(), p.cancelBubble = !0, e._ignore_next_click = !1, e._click.dhx_cal_data(f), d = f, !1;
            s = setTimeout(function() {
              if (!e.$destroyed) {
                i = !0;
                var w = d.target, S = e._getClassName(w);
                w && S.indexOf("dhx_body") != -1 && (w = w.previousSibling), e._on_mouse_down(d, w), e._drag_mode && e._drag_mode != "create" && e.for_rendered(e._drag_id, function(N, E) {
                  N.style.display = "none", e._forget_rendered_event(N, E);
                }), e.config.touch_tip && e._show_global_tip(), e.updateEvent(e._drag_id);
              }
            }, e.config.touch_drag), d = f;
          }
        } else
          r = !0;
    }), c(this._els.dhx_cal_data[0], o[2], function(p) {
      if (document && document.body && document.body.classList.remove("dhx_cal_touch_active"), !n(p))
        return e.config.touch_swipe_dates && !i && function(f, u, v, m) {
          if (!f || !u)
            return !1;
          for (var x = f.target; x && x != e._obj; )
            x = x.parentNode;
          if (x != e._obj || e.matrix && e.matrix[e.getState().mode] && e.matrix[e.getState().mode].scrollable)
            return !1;
          var w = Math.abs(f.pageY - u.pageY), S = Math.abs(f.pageX - u.pageX);
          return w < m && S > v && (!w || S / w > 3) && (f.pageX > u.pageX ? e._click.dhx_cal_next_button() : e._click.dhx_cal_prev_button(), !0);
        }(d, a, 200, 100) && (e._block_next_stop = !0), i && (e._ignore_next_click = !0, setTimeout(function() {
          e._ignore_next_click = !1;
        }, 100)), h(p), e._block_next_stop ? (e._block_next_stop = !1, p.preventDefault && p.preventDefault(), p.cancelBubble = !0, !1) : void 0;
    }), e.event(document.body, o[2], h);
  }, e._show_global_tip = function() {
    e._hide_global_tip();
    var o = e._global_tip = document.createElement("div");
    o.className = "dhx_global_tip", e._update_global_tip(1), document.body.appendChild(o);
  }, e._update_global_tip = function(o) {
    var t = e._global_tip;
    if (t) {
      var n = "";
      if (e._drag_id && !o) {
        var d = e.getEvent(e._drag_id);
        d && (n = "<div>" + (d._timed ? e.templates.event_header(d.start_date, d.end_date, d) : e.templates.day_date(d.start_date, d.end_date, d)) + "</div>");
      }
      e._drag_mode == "create" || e._drag_mode == "new-size" ? t.innerHTML = (e.locale.labels.drag_to_create || "Drag to create") + n : t.innerHTML = (e.locale.labels.drag_to_move || "Drag to move") + n;
    }
  }, e._hide_global_tip = function() {
    var o = e._global_tip;
    o && o.parentNode && (o.parentNode.removeChild(o), e._global_tip = 0);
  };
}
function ia(e) {
  var o, t;
  function n() {
    if (e._is_material_skin())
      return !0;
    if (t !== void 0)
      return t;
    var i = document.createElement("div");
    i.style.position = "absolute", i.style.left = "-9999px", i.style.top = "-9999px", i.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_data'><div class='dhx_cal_event'><div class='dhx_body'></div></div><div>", document.body.appendChild(i);
    var r = window.getComputedStyle(i.querySelector(".dhx_body")).getPropertyValue("box-sizing");
    document.body.removeChild(i), (t = r === "border-box") || setTimeout(function() {
      t = void 0;
    }, 1e3);
  }
  function d() {
    if (!e._is_material_skin() && !e._border_box_events()) {
      var i = t;
      t = void 0, o = void 0, i !== n() && e.$container && e.getState().mode && e.setCurrentView();
    }
  }
  function a(i) {
    var r = i.getMinutes();
    return r = r < 10 ? "0" + r : r, "<span class='dhx_scale_h'>" + i.getHours() + "</span><span class='dhx_scale_m'>&nbsp;" + r + "</span>";
  }
  e._addThemeClass = function() {
    document.documentElement.setAttribute("data-scheduler-theme", e.skin);
  }, e._skin_settings = { fix_tab_position: [1, 0], use_select_menu_space: [1, 0], wide_form: [1, 0], hour_size_px: [44, 42], displayed_event_color: ["#ff4a4a", "ffc5ab"], displayed_event_text_color: ["#ffef80", "7e2727"] }, e._skin_xy = { lightbox_additional_height: [90, 50], nav_height: [59, 22], bar_height: [24, 20] }, e._is_material_skin = function() {
    return e.skin ? (e.skin + "").indexOf("material") > -1 : function() {
      if (o === void 0) {
        var i = document.createElement("div");
        i.style.position = "absolute", i.style.left = "-9999px", i.style.top = "-9999px", i.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_scale_placeholder'></div><div>", document.body.appendChild(i);
        var r = window.getComputedStyle(i.querySelector(".dhx_cal_scale_placeholder")).getPropertyValue("position");
        o = r === "absolute", setTimeout(function() {
          o = null, i && i.parentNode && i.parentNode.removeChild(i);
        }, 500);
      }
      return o;
    }();
  }, e._build_skin_info = function() {
    (function() {
      const p = e.$container;
      clearInterval(s), p && (s = setInterval(() => {
        const f = getComputedStyle(p).getPropertyValue("--dhx-scheduler-theme");
        f && f !== e.skin && e.setSkin(f);
      }, 100));
    })();
    const i = getComputedStyle(this.$container), r = i.getPropertyValue("--dhx-scheduler-theme");
    let l, _ = !!r, c = {}, h = !1;
    if (_) {
      l = r;
      for (let p in e.xy)
        c[p] = i.getPropertyValue(`--dhx-scheduler-xy-${p}`);
      c.hour_size_px = i.getPropertyValue("--dhx-scheduler-config-hour_size_px"), c.wide_form = i.getPropertyValue("--dhx-scheduler-config-form_wide");
    } else
      l = function() {
        for (var p = document.getElementsByTagName("link"), f = 0; f < p.length; f++) {
          var u = p[f].href.match("dhtmlxscheduler_([a-z]+).css");
          if (u)
            return u[1];
        }
      }(), h = e._is_material_skin();
    if (e._theme_info = { theme: l, cssVarTheme: _, oldMaterialTheme: h, values: c }, e._theme_info.cssVarTheme) {
      const p = this._theme_info.values;
      for (let f in e.xy)
        isNaN(parseInt(p[f])) || (e.xy[f] = parseInt(p[f]));
    }
  }, typeof window < "u" && (e.event(window, "DOMContentLoaded", d), e.event(window, "load", d)), e._border_box_events = function() {
    return n();
  }, e._configure = function(i, r, l) {
    for (var _ in r)
      i[_] === void 0 && (i[_] = r[_][l]);
  }, e.setSkin = function(i) {
    this.skin = i, e._addThemeClass(), e.$container && (this._skin_init(), this.render());
  };
  let s = null;
  e.attachEvent("onDestroy", function() {
    clearInterval(s);
  }), e._skin_init = function() {
    this._build_skin_info(), this.skin || (this.skin = this._theme_info.theme), e._addThemeClass(), e.skin === "flat" ? e.templates.hour_scale = a : e.templates.hour_scale === a && (e.templates.hour_scale = e.date.date_to_str(e.config.hour_date)), e.attachEvent("onTemplatesReady", function() {
      var i = e.date.date_to_str("%d");
      e.templates._old_month_day || (e.templates._old_month_day = e.templates.month_day);
      var r = e.templates._old_month_day;
      e.templates.month_day = function(l) {
        if (this._mode == "month") {
          var _ = i(l);
          return l.getDate() == 1 && (_ = e.locale.date.month_full[l.getMonth()] + " " + _), +l == +e.date.date_part(this._currentDate()) && (_ = e.locale.labels.dhx_cal_today_button + " " + _), _;
        }
        return r.call(this, l);
      }, e.config.fix_tab_position && (e._els.dhx_cal_navline[0].querySelectorAll("[data-tab]").forEach((l) => {
        switch (l.getAttribute("data-tab") || l.getAttribute("name")) {
          case "day":
          case "day_tab":
            l.classList.add("dhx_cal_tab_first"), l.classList.add("dhx_cal_tab_segmented");
            break;
          case "week":
          case "week_tab":
            l.classList.add("dhx_cal_tab_segmented");
            break;
          case "month":
          case "month_tab":
            l.classList.add("dhx_cal_tab_last"), l.classList.add("dhx_cal_tab_segmented");
            break;
          default:
            l.classList.add("dhx_cal_tab_standalone");
        }
      }), function(l) {
        if (e.config.header)
          return;
        const _ = Array.from(l.querySelectorAll(".dhx_cal_tab")), c = ["day", "week", "month"].map((p) => _.find((f) => f.getAttribute("data-tab") === p)).filter((p) => p !== void 0);
        let h = _.length > 0 ? _[0] : null;
        c.reverse().forEach((p) => {
          l.insertBefore(p, h), h = p;
        });
      }(e._els.dhx_cal_navline[0]));
    }, { once: !0 });
  };
}
function oa(e, o) {
  this.$scheduler = e, this.$dp = o, this._dataProcessorHandlers = [], this.attach = function() {
    var t = this.$dp, n = this.$scheduler;
    this._dataProcessorHandlers.push(n.attachEvent("onEventAdded", function(d) {
      !this._loading && this._validId(d) && t.setUpdated(d, !0, "inserted");
    })), this._dataProcessorHandlers.push(n.attachEvent("onConfirmedBeforeEventDelete", function(d) {
      if (this._validId(d)) {
        var a = t.getState(d);
        return a == "inserted" || this._new_event ? (t.setUpdated(d, !1), !0) : a != "deleted" && (a == "true_deleted" || (t.setUpdated(d, !0, "deleted"), !1));
      }
    })), this._dataProcessorHandlers.push(n.attachEvent("onEventChanged", function(d) {
      !this._loading && this._validId(d) && t.setUpdated(d, !0, "updated");
    })), this._dataProcessorHandlers.push(n.attachEvent("onClearAll", function() {
      t._in_progress = {}, t._invalid = {}, t.updatedRows = [], t._waitMode = 0;
    })), t.attachEvent("insertCallback", n._update_callback), t.attachEvent("updateCallback", n._update_callback), t.attachEvent("deleteCallback", function(d, a) {
      n.getEvent(a) ? (n.setUserData(a, this.action_param, "true_deleted"), n.deleteEvent(a)) : n._add_rec_marker && n._update_callback(d, a);
    });
  }, this.detach = function() {
    for (var t in this._dataProcessorHandlers) {
      var n = this._dataProcessorHandlers[t];
      this.$scheduler.detachEvent(n);
    }
    this._dataProcessorHandlers = [];
  };
}
function Le(e) {
  return this.serverProcessor = e, this.action_param = "!nativeeditor_status", this.object = null, this.updatedRows = [], this.autoUpdate = !0, this.updateMode = "cell", this._tMode = "GET", this._headers = null, this._payload = null, this.post_delim = "_", this._waitMode = 0, this._in_progress = {}, this._invalid = {}, this.messages = [], this.styles = { updated: "font-weight:bold;", inserted: "font-weight:bold;", deleted: "text-decoration : line-through;", invalid: "background-color:FFE0E0;", invalid_cell: "border-bottom:2px solid red;", error: "color:red;", clear: "font-weight:normal;text-decoration:none;" }, this.enableUTFencoding(!0), Ue(this), this;
}
function sa(e) {
  var o = "data-dhxbox", t = null;
  function n(m, x, w) {
    var S = m.callback;
    S && S(x, w), f.hide(m.box), t = m.box = null;
  }
  function d(m) {
    if (t) {
      var x = m.which || m.keyCode, w = !1;
      if (u.keyboard) {
        if (x == 13 || x == 32) {
          var S = m.target || m.srcElement;
          he.getClassName(S).indexOf("scheduler_popup_button") > -1 && S.click ? S.click() : (n(t, !0), w = !0);
        }
        x == 27 && (n(t, !1), w = !0);
      }
      return w ? (m.preventDefault && m.preventDefault(), !(m.cancelBubble = !0)) : void 0;
    }
  }
  function a(m) {
    a.cover || (a.cover = document.createElement("div"), e.event(a.cover, "keydown", d), a.cover.className = "dhx_modal_cover", document.body.appendChild(a.cover)), a.cover.style.display = m ? "inline-block" : "none";
  }
  function s(m, x, w) {
    var S = e._waiAria.messageButtonAttrString(m), N = (x || "").toLowerCase().replace(/ /g, "_");
    return `<div ${S} class='scheduler_popup_button dhtmlx_popup_button ${`scheduler_${N}_button dhtmlx_${N}_button`}' data-result='${w}' result='${w}' ><div>${m}</div></div>`;
  }
  function i() {
    for (var m = [].slice.apply(arguments, [0]), x = 0; x < m.length; x++)
      if (m[x])
        return m[x];
  }
  function r(m, x, w) {
    var S = m.tagName ? m : function(T, g, b) {
      var y = document.createElement("div"), k = ae.uid();
      e._waiAria.messageModalAttr(y, k), y.className = " scheduler_modal_box dhtmlx_modal_box scheduler-" + T.type + " dhtmlx-" + T.type, y.setAttribute(o, 1);
      var D = "";
      if (T.width && (y.style.width = T.width), T.height && (y.style.height = T.height), T.title && (D += '<div class="scheduler_popup_title dhtmlx_popup_title">' + T.title + "</div>"), D += '<div class="scheduler_popup_text dhtmlx_popup_text" id="' + k + '"><span>' + (T.content ? "" : T.text) + '</span></div><div  class="scheduler_popup_controls dhtmlx_popup_controls">', g && (D += s(i(T.ok, e.locale.labels.message_ok, "OK"), "ok", !0)), b && (D += s(i(T.cancel, e.locale.labels.message_cancel, "Cancel"), "cancel", !1)), T.buttons)
        for (var M = 0; M < T.buttons.length; M++) {
          var C = T.buttons[M];
          D += typeof C == "object" ? s(C.label, C.css || "scheduler_" + C.label.toLowerCase() + "_button dhtmlx_" + C.label.toLowerCase() + "_button", C.value || M) : s(C, C, M);
        }
      if (D += "</div>", y.innerHTML = D, T.content) {
        var A = T.content;
        typeof A == "string" && (A = document.getElementById(A)), A.style.display == "none" && (A.style.display = ""), y.childNodes[T.title ? 1 : 0].appendChild(A);
      }
      return e.event(y, "click", function($) {
        var H = $.target || $.srcElement;
        if (H.className || (H = H.parentNode), he.closest(H, ".scheduler_popup_button")) {
          var O = H.getAttribute("data-result");
          n(T, O = O == "true" || O != "false" && O, $);
        }
      }), T.box = y, (g || b) && (t = T), y;
    }(m, x, w);
    m.hidden || a(!0), document.body.appendChild(S);
    var N = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - S.offsetWidth) / 2)), E = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - S.offsetHeight) / 2));
    return m.position == "top" ? S.style.top = "-3px" : S.style.top = E + "px", S.style.left = N + "px", e.event(S, "keydown", d), f.focus(S), m.hidden && f.hide(S), e.callEvent("onMessagePopup", [S]), S;
  }
  function l(m) {
    return r(m, !0, !1);
  }
  function _(m) {
    return r(m, !0, !0);
  }
  function c(m) {
    return r(m);
  }
  function h(m, x, w) {
    return typeof m != "object" && (typeof x == "function" && (w = x, x = ""), m = { text: m, type: x, callback: w }), m;
  }
  function p(m, x, w, S, N) {
    return typeof m != "object" && (m = { text: m, type: x, expire: w, id: S, callback: N }), m.id = m.id || ae.uid(), m.expire = m.expire || u.expire, m;
  }
  typeof window < "u" && e.event(document, "keydown", d, !0);
  var f = function() {
    var m = h.apply(this, arguments);
    return m.type = m.type || "alert", c(m);
  };
  f.hide = function(m) {
    for (; m && m.getAttribute && !m.getAttribute(o); )
      m = m.parentNode;
    m && (m.parentNode.removeChild(m), a(!1), e.callEvent("onAfterMessagePopup", [m]));
  }, f.focus = function(m) {
    setTimeout(function() {
      var x = he.getFocusableNodes(m);
      x.length && x[0].focus && x[0].focus();
    }, 1);
  };
  var u = function(m, x, w, S) {
    switch ((m = p.apply(this, arguments)).type = m.type || "info", m.type.split("-")[0]) {
      case "alert":
        return l(m);
      case "confirm":
        return _(m);
      case "modalbox":
        return c(m);
      default:
        return function(N) {
          u.area || (u.area = document.createElement("div"), u.area.className = "scheduler_message_area dhtmlx_message_area", u.area.style[u.position] = "5px", document.body.appendChild(u.area)), u.hide(N.id);
          var E = document.createElement("div");
          return E.innerHTML = "<div>" + N.text + "</div>", E.className = "scheduler-info dhtmlx-info scheduler-" + N.type + " dhtmlx-" + N.type, e.event(E, "click", function(T) {
            N.callback && N.callback.call(this, T), u.hide(N.id), N = null;
          }), e._waiAria.messageInfoAttr(E), u.position == "bottom" && u.area.firstChild ? u.area.insertBefore(E, u.area.firstChild) : u.area.appendChild(E), N.expire > 0 && (u.timers[N.id] = window.setTimeout(function() {
            u && u.hide(N.id);
          }, N.expire)), u.pull[N.id] = E, E = null, N.id;
        }(m);
    }
  };
  u.seed = (/* @__PURE__ */ new Date()).valueOf(), u.uid = ae.uid, u.expire = 4e3, u.keyboard = !0, u.position = "top", u.pull = {}, u.timers = {}, u.hideAll = function() {
    for (var m in u.pull)
      u.hide(m);
  }, u.hide = function(m) {
    var x = u.pull[m];
    x && x.parentNode && (window.setTimeout(function() {
      x.parentNode.removeChild(x), x = null;
    }, 2e3), x.className += " hidden", u.timers[m] && window.clearTimeout(u.timers[m]), delete u.pull[m]);
  };
  var v = [];
  return e.attachEvent("onMessagePopup", function(m) {
    v.push(m);
  }), e.attachEvent("onAfterMessagePopup", function(m) {
    for (var x = 0; x < v.length; x++)
      v[x] === m && (v.splice(x, 1), x--);
  }), e.attachEvent("onDestroy", function() {
    a.cover && a.cover.parentNode && a.cover.parentNode.removeChild(a.cover);
    for (var m = 0; m < v.length; m++)
      v[m].parentNode && v[m].parentNode.removeChild(v[m]);
    v = null, u.area && u.area.parentNode && u.area.parentNode.removeChild(u.area), u = null;
  }), { alert: function() {
    var m = h.apply(this, arguments);
    return m.type = m.type || "confirm", l(m);
  }, confirm: function() {
    var m = h.apply(this, arguments);
    return m.type = m.type || "alert", _(m);
  }, message: u, modalbox: f };
}
Le.prototype = { setTransactionMode: function(e, o) {
  typeof e == "object" ? (this._tMode = e.mode || this._tMode, e.headers !== void 0 && (this._headers = e.headers), e.payload !== void 0 && (this._payload = e.payload), this._tSend = !!o) : (this._tMode = e, this._tSend = o), this._tMode == "REST" && (this._tSend = !1, this._endnm = !0), this._tMode === "JSON" || this._tMode === "REST-JSON" ? (this._tSend = !1, this._endnm = !0, this._serializeAsJson = !0, this._headers = this._headers || {}, this._headers["Content-Type"] = "application/json") : this._headers && !this._headers["Content-Type"] && (this._headers["Content-Type"] = "application/x-www-form-urlencoded"), this._tMode === "CUSTOM" && (this._tSend = !1, this._endnm = !0, this._router = e.router);
}, escape: function(e) {
  return this._utf ? encodeURIComponent(e) : escape(e);
}, enableUTFencoding: function(e) {
  this._utf = !!e;
}, setDataColumns: function(e) {
  this._columns = typeof e == "string" ? e.split(",") : e;
}, getSyncState: function() {
  return !this.updatedRows.length;
}, enableDataNames: function(e) {
  this._endnm = !!e;
}, enablePartialDataSend: function(e) {
  this._changed = !!e;
}, setUpdateMode: function(e, o) {
  this.autoUpdate = e == "cell", this.updateMode = e, this.dnd = o;
}, ignore: function(e, o) {
  this._silent_mode = !0, e.call(o || window), this._silent_mode = !1;
}, setUpdated: function(e, o, t) {
  if (!this._silent_mode) {
    var n = this.findRow(e);
    t = t || "updated";
    var d = this.$scheduler.getUserData(e, this.action_param);
    d && t == "updated" && (t = d), o ? (this.set_invalid(e, !1), this.updatedRows[n] = e, this.$scheduler.setUserData(e, this.action_param, t), this._in_progress[e] && (this._in_progress[e] = "wait")) : this.is_invalid(e) || (this.updatedRows.splice(n, 1), this.$scheduler.setUserData(e, this.action_param, "")), this.markRow(e, o, t), o && this.autoUpdate && this.sendData(e);
  }
}, markRow: function(e, o, t) {
  var n = "", d = this.is_invalid(e);
  if (d && (n = this.styles[d], o = !0), this.callEvent("onRowMark", [e, o, t, d]) && (n = this.styles[o ? t : "clear"] + n, this.$scheduler[this._methods[0]](e, n), d && d.details)) {
    n += this.styles[d + "_cell"];
    for (var a = 0; a < d.details.length; a++)
      d.details[a] && this.$scheduler[this._methods[1]](e, a, n);
  }
}, getActionByState: function(e) {
  return e === "inserted" ? "create" : e === "updated" ? "update" : e === "deleted" ? "delete" : "update";
}, getState: function(e) {
  return this.$scheduler.getUserData(e, this.action_param);
}, is_invalid: function(e) {
  return this._invalid[e];
}, set_invalid: function(e, o, t) {
  t && (o = { value: o, details: t, toString: function() {
    return this.value.toString();
  } }), this._invalid[e] = o;
}, checkBeforeUpdate: function(e) {
  return !0;
}, sendData: function(e) {
  return this.$scheduler.editStop && this.$scheduler.editStop(), e === void 0 || this._tSend ? this.sendAllData() : !this._in_progress[e] && (this.messages = [], !(!this.checkBeforeUpdate(e) && this.callEvent("onValidationError", [e, this.messages])) && void this._beforeSendData(this._getRowData(e), e));
}, _beforeSendData: function(e, o) {
  if (!this.callEvent("onBeforeUpdate", [o, this.getState(o), e]))
    return !1;
  this._sendData(e, o);
}, serialize: function(e, o) {
  if (this._serializeAsJson)
    return this._serializeAsJSON(e);
  if (typeof e == "string")
    return e;
  if (o !== void 0)
    return this.serialize_one(e, "");
  var t = [], n = [];
  for (var d in e)
    e.hasOwnProperty(d) && (t.push(this.serialize_one(e[d], d + this.post_delim)), n.push(d));
  return t.push("ids=" + this.escape(n.join(","))), this.$scheduler.security_key && t.push("dhx_security=" + this.$scheduler.security_key), t.join("&");
}, serialize_one: function(e, o) {
  if (typeof e == "string")
    return e;
  var t = [], n = "";
  for (var d in e)
    if (e.hasOwnProperty(d)) {
      if ((d == "id" || d == this.action_param) && this._tMode == "REST")
        continue;
      n = typeof e[d] == "string" || typeof e[d] == "number" ? e[d] : JSON.stringify(e[d]), t.push(this.escape((o || "") + d) + "=" + this.escape(n));
    }
  return t.join("&");
}, _applyPayload: function(e) {
  var o = this.$scheduler.ajax;
  if (this._payload)
    for (var t in this._payload)
      e = e + o.urlSeparator(e) + this.escape(t) + "=" + this.escape(this._payload[t]);
  return e;
}, _sendData: function(e, o) {
  if (e) {
    if (!this.callEvent("onBeforeDataSending", o ? [o, this.getState(o), e] : [null, null, e]))
      return !1;
    o && (this._in_progress[o] = (/* @__PURE__ */ new Date()).valueOf());
    var t = this, n = this.$scheduler.ajax;
    if (this._tMode === "CUSTOM") {
      var d = this.getState(o), a = this.getActionByState(d);
      delete e[this.action_param];
      var s = function(u) {
        var v = d;
        if (u && u.responseText && u.setRequestHeader) {
          u.status !== 200 && (v = "error");
          try {
            u = JSON.parse(u.responseText);
          } catch {
          }
        }
        v = v || "updated";
        var m = o, x = o;
        u && (v = u.action || v, m = u.sid || m, x = u.id || u.tid || x), t.afterUpdateCallback(m, x, v, u);
      };
      const f = "event";
      var i;
      if (this._router instanceof Function)
        i = this._router(f, a, e, o);
      else
        switch (d) {
          case "inserted":
            i = this._router[f].create(e);
            break;
          case "deleted":
            i = this._router[f].delete(o);
            break;
          default:
            i = this._router[f].update(e, o);
        }
      if (i) {
        if (!i.then && i.id === void 0 && i.tid === void 0 && i.action === void 0)
          throw new Error("Incorrect router return value. A Promise or a response object is expected");
        i.then ? i.then(s).catch(function(u) {
          u && u.action ? s(u) : s({ action: "error", value: u });
        }) : s(i);
      } else
        s(null);
      return;
    }
    var r, l = { callback: function(f) {
      var u = [];
      if (o)
        u.push(o);
      else if (e)
        for (var v in e)
          u.push(v);
      return t.afterUpdate(t, f, u);
    }, headers: t._headers }, _ = this.serverProcessor + (this._user ? n.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.$scheduler.getUserData(0, "version")].join("&") : ""), c = this._applyPayload(_);
    switch (this._tMode) {
      case "GET":
        r = this._cleanupArgumentsBeforeSend(e), l.url = c + n.urlSeparator(c) + this.serialize(r, o), l.method = "GET";
        break;
      case "POST":
        r = this._cleanupArgumentsBeforeSend(e), l.url = c, l.method = "POST", l.data = this.serialize(r, o);
        break;
      case "JSON":
        r = {};
        var h = this._cleanupItemBeforeSend(e);
        for (var p in h)
          p !== this.action_param && p !== "id" && p !== "gr_id" && (r[p] = h[p]);
        l.url = c, l.method = "POST", l.data = JSON.stringify({ id: o, action: e[this.action_param], data: r });
        break;
      case "REST":
      case "REST-JSON":
        switch (c = _.replace(/(&|\?)editing=true/, ""), r = "", this.getState(o)) {
          case "inserted":
            l.method = "POST", l.data = this.serialize(e, o);
            break;
          case "deleted":
            l.method = "DELETE", c = c + (c.slice(-1) === "/" ? "" : "/") + o;
            break;
          default:
            l.method = "PUT", l.data = this.serialize(e, o), c = c + (c.slice(-1) === "/" ? "" : "/") + o;
        }
        l.url = this._applyPayload(c);
    }
    return this._waitMode++, n.query(l);
  }
}, sendAllData: function() {
  if (this.updatedRows.length && this.updateMode !== "off") {
    this.messages = [];
    var e = !0;
    if (this._forEachUpdatedRow(function(o) {
      e = e && this.checkBeforeUpdate(o);
    }), !e && !this.callEvent("onValidationError", ["", this.messages]))
      return !1;
    this._tSend ? this._sendData(this._getAllData()) : this._forEachUpdatedRow(function(o) {
      if (!this._in_progress[o]) {
        if (this.is_invalid(o))
          return;
        this._beforeSendData(this._getRowData(o), o);
      }
    });
  }
}, _getAllData: function(e) {
  var o = {}, t = !1;
  return this._forEachUpdatedRow(function(n) {
    if (!this._in_progress[n] && !this.is_invalid(n)) {
      var d = this._getRowData(n);
      this.callEvent("onBeforeUpdate", [n, this.getState(n), d]) && (o[n] = d, t = !0, this._in_progress[n] = (/* @__PURE__ */ new Date()).valueOf());
    }
  }), t ? o : null;
}, findRow: function(e) {
  var o = 0;
  for (o = 0; o < this.updatedRows.length && e != this.updatedRows[o]; o++)
    ;
  return o;
}, defineAction: function(e, o) {
  this._uActions || (this._uActions = {}), this._uActions[e] = o;
}, afterUpdateCallback: function(e, o, t, n) {
  if (this.$scheduler) {
    var d = e, a = t !== "error" && t !== "invalid";
    if (a || this.set_invalid(e, t), this._uActions && this._uActions[t] && !this._uActions[t](n))
      return delete this._in_progress[d];
    this._in_progress[d] !== "wait" && this.setUpdated(e, !1);
    var s = e;
    switch (t) {
      case "inserted":
      case "insert":
        o != e && (this.setUpdated(e, !1), this.$scheduler[this._methods[2]](e, o), e = o);
        break;
      case "delete":
      case "deleted":
        return this.$scheduler.setUserData(e, this.action_param, "true_deleted"), this.$scheduler[this._methods[3]](e, o), delete this._in_progress[d], this.callEvent("onAfterUpdate", [e, t, o, n]);
    }
    this._in_progress[d] !== "wait" ? (a && this.$scheduler.setUserData(e, this.action_param, ""), delete this._in_progress[d]) : (delete this._in_progress[d], this.setUpdated(o, !0, this.$scheduler.getUserData(e, this.action_param))), this.callEvent("onAfterUpdate", [s, t, o, n]);
  }
}, _errorResponse: function(e, o) {
  return this.$scheduler && this.$scheduler.callEvent && this.$scheduler.callEvent("onSaveError", [o, e.xmlDoc]), this.cleanUpdate(o);
}, _setDefaultTransactionMode: function() {
  this.serverProcessor && (this.setTransactionMode("POST", !0), this.serverProcessor += (this.serverProcessor.indexOf("?") !== -1 ? "&" : "?") + "editing=true", this._serverProcessor = this.serverProcessor);
}, afterUpdate: function(e, o, t) {
  var n = this.$scheduler.ajax;
  if (o.xmlDoc.status === 200) {
    var d;
    try {
      d = JSON.parse(o.xmlDoc.responseText);
    } catch {
      o.xmlDoc.responseText.length || (d = {});
    }
    if (d) {
      var a = d.action || this.getState(t) || "updated", s = d.sid || t[0], i = d.tid || t[0];
      return e.afterUpdateCallback(s, i, a, d), void e.finalizeUpdate();
    }
    var r = n.xmltop("data", o.xmlDoc);
    if (!r)
      return this._errorResponse(o, t);
    var l = n.xpath("//data/action", r);
    if (!l.length)
      return this._errorResponse(o, t);
    for (var _ = 0; _ < l.length; _++) {
      var c = l[_];
      a = c.getAttribute("type"), s = c.getAttribute("sid"), i = c.getAttribute("tid"), e.afterUpdateCallback(s, i, a, c);
    }
    e.finalizeUpdate();
  } else
    this._errorResponse(o, t);
}, cleanUpdate: function(e) {
  if (e)
    for (var o = 0; o < e.length; o++)
      delete this._in_progress[e[o]];
}, finalizeUpdate: function() {
  this._waitMode && this._waitMode--, this.callEvent("onAfterUpdateFinish", []), this.updatedRows.length || this.callEvent("onFullSync", []);
}, init: function(e) {
  if (!this._initialized) {
    this.$scheduler = e, this.$scheduler._dp_init && this.$scheduler._dp_init(this), this._setDefaultTransactionMode(), this._methods = this._methods || ["_set_event_text_style", "", "_dp_change_event_id", "_dp_hook_delete"], function(t, n) {
      t._validId = function(d) {
        return !this._is_virtual_event || !this._is_virtual_event(d);
      }, t.setUserData = function(d, a, s) {
        if (d) {
          var i = this.getEvent(d);
          i && (i[a] = s);
        } else
          this._userdata[a] = s;
      }, t.getUserData = function(d, a) {
        if (d) {
          var s = this.getEvent(d);
          return s ? s[a] : null;
        }
        return this._userdata[a];
      }, t._set_event_text_style = function(d, a) {
        if (t.getEvent(d)) {
          this.for_rendered(d, function(i) {
            i.style.cssText += ";" + a;
          });
          var s = this.getEvent(d);
          s._text_style = a, this.event_updated(s);
        }
      }, t._update_callback = function(d, a) {
        var s = t._xmlNodeToJSON(d.firstChild);
        s.rec_type == "none" && (s.rec_pattern = "none"), s.text = s.text || s._tagvalue, s.start_date = t._helpers.parseDate(s.start_date), s.end_date = t._helpers.parseDate(s.end_date), t.addEvent(s), t._add_rec_marker && t.setCurrentView();
      }, t._dp_change_event_id = function(d, a) {
        t.getEvent(d) && t.changeEventId(d, a);
      }, t._dp_hook_delete = function(d, a) {
        if (t.getEvent(d))
          return a && d != a && (this.getUserData(d, n.action_param) == "true_deleted" && this.setUserData(d, n.action_param, "updated"), this.changeEventId(d, a)), this.deleteEvent(a, !0);
      }, t.setDp = function() {
        this._dp = n;
      }, t.setDp();
    }(this.$scheduler, this);
    var o = new oa(this.$scheduler, this);
    o.attach(), this.attachEvent("onDestroy", function() {
      delete this._getRowData, delete this.$scheduler._dp, delete this.$scheduler._dataprocessor, delete this.$scheduler._set_event_text_style, delete this.$scheduler._dp_change_event_id, delete this.$scheduler._dp_hook_delete, delete this.$scheduler, o.detach();
    }), this.$scheduler.callEvent("onDataProcessorReady", [this]), this._initialized = !0, e._dataprocessor = this;
  }
}, setOnAfterUpdate: function(e) {
  this.attachEvent("onAfterUpdate", e);
}, setOnBeforeUpdateHandler: function(e) {
  this.attachEvent("onBeforeDataSending", e);
}, setAutoUpdate: function(e, o) {
  e = e || 2e3, this._user = o || (/* @__PURE__ */ new Date()).valueOf(), this._need_update = !1, this._update_busy = !1, this.attachEvent("onAfterUpdate", function(d, a, s, i) {
    this.afterAutoUpdate(d, a, s, i);
  }), this.attachEvent("onFullSync", function() {
    this.fullSync();
  });
  var t = this;
  let n = _e.setInterval(function() {
    t.loadUpdate();
  }, e);
  this.attachEvent("onDestroy", function() {
    clearInterval(n);
  });
}, afterAutoUpdate: function(e, o, t, n) {
  return o != "collision" || (this._need_update = !0, !1);
}, fullSync: function() {
  return this._need_update && (this._need_update = !1, this.loadUpdate()), !0;
}, getUpdates: function(e, o) {
  var t = this.$scheduler.ajax;
  if (this._update_busy)
    return !1;
  this._update_busy = !0, t.get(e, o);
}, _getXmlNodeValue: function(e) {
  return e.firstChild ? e.firstChild.nodeValue : "";
}, loadUpdate: function() {
  var e = this, o = this.$scheduler.ajax, t = this.$scheduler.getUserData(0, "version"), n = this.serverProcessor + o.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + t].join("&");
  n = n.replace("editing=true&", ""), this.getUpdates(n, function(d) {
    var a = o.xpath("//userdata", d);
    e.$scheduler.setUserData(0, "version", e._getXmlNodeValue(a[0]));
    var s = o.xpath("//update", d);
    if (s.length) {
      e._silent_mode = !0;
      for (var i = 0; i < s.length; i++) {
        var r = s[i].getAttribute("status"), l = s[i].getAttribute("id"), _ = s[i].getAttribute("parent");
        switch (r) {
          case "inserted":
            this.callEvent("insertCallback", [s[i], l, _]);
            break;
          case "updated":
            this.callEvent("updateCallback", [s[i], l, _]);
            break;
          case "deleted":
            this.callEvent("deleteCallback", [s[i], l, _]);
        }
      }
      e._silent_mode = !1;
    }
    e._update_busy = !1, e = null;
  });
}, destructor: function() {
  this.callEvent("onDestroy", []), this.detachAllEvents(), this.updatedRows = [], this._in_progress = {}, this._invalid = {}, this._headers = null, this._payload = null, delete this._initialized;
}, url: function(e) {
  this.serverProcessor = this._serverProcessor = e;
}, _serializeAsJSON: function(e) {
  if (typeof e == "string")
    return e;
  var o = this.$scheduler.utils.copy(e);
  return this._tMode === "REST-JSON" && (delete o.id, delete o[this.action_param]), JSON.stringify(o);
}, _cleanupArgumentsBeforeSend: function(e) {
  var o;
  if (e[this.action_param] === void 0)
    for (var t in o = {}, e)
      o[t] = this._cleanupArgumentsBeforeSend(e[t]);
  else
    o = this._cleanupItemBeforeSend(e);
  return o;
}, _cleanupItemBeforeSend: function(e) {
  var o = null;
  return e && (e[this.action_param] === "deleted" ? ((o = {}).id = e.id, o[this.action_param] = e[this.action_param]) : o = e), o;
}, _forEachUpdatedRow: function(e) {
  for (var o = this.updatedRows.slice(), t = 0; t < o.length; t++) {
    var n = o[t];
    this.$scheduler.getUserData(n, this.action_param) && e.call(this, n);
  }
}, _prepareItemForJson(e) {
  const o = {}, t = this.$scheduler, n = t.utils.copy(e);
  for (let d in n) {
    let a = n[d];
    d.indexOf("_") !== 0 && (a ? a.getUTCFullYear ? o[d] = t._helpers.formatDate(a) : o[d] = typeof a == "object" ? this._prepareItemForJson(a) : a : a !== void 0 && (o[d] = a));
  }
  return o[this.action_param] = t.getUserData(e.id, this.action_param), o;
}, _prepareItemForForm(e) {
  const o = {}, t = this.$scheduler, n = t.utils.copy(e);
  for (var d in n) {
    let a = n[d];
    d.indexOf("_") !== 0 && (a ? a.getUTCFullYear ? o[d] = t._helpers.formatDate(a) : o[d] = typeof a == "object" ? this._prepareItemForForm(a) : a : o[d] = "");
  }
  return o[this.action_param] = t.getUserData(e.id, this.action_param), o;
}, _prepareDataItem: function(e) {
  return this._serializeAsJson ? this._prepareItemForJson(e) : this._prepareItemForForm(e);
}, _getRowData: function(e) {
  var o = this.$scheduler.getEvent(e);
  return o || (o = { id: e }), this._prepareDataItem(o);
} };
class da {
  constructor(o) {
    this._locales = {};
    for (const t in o)
      this._locales[t] = o[t];
  }
  addLocale(o, t) {
    this._locales[o] = t;
  }
  getLocale(o) {
    return this._locales[o];
  }
}
const _a = Object.freeze(Object.defineProperty({ __proto__: null, ar: { date: { month_full: ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"], month_short: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], day_full: ["الأحد", "الأثنين", "ألثلاثاء", "الأربعاء", "ألحميس", "ألجمعة", "السبت"], day_short: ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"] }, labels: { dhx_cal_today_button: "اليوم", day_tab: "يوم", week_tab: "أسبوع", month_tab: "شهر", new_event: "حدث جديد", icon_save: "اخزن", icon_cancel: "الغاء", icon_details: "تفاصيل", icon_edit: "تحرير", icon_delete: "حذف", confirm_closing: "التغييرات سوف تضيع, هل انت متأكد؟", confirm_deleting: "الحدث سيتم حذفها نهائيا ، هل أنت متأكد؟", section_description: "الوصف", section_time: "الفترة الزمنية", full_day: "طوال اليوم", confirm_recurring: "هل تريد تحرير مجموعة كاملة من الأحداث المتكررة؟", section_recurring: "تكرار الحدث", button_recurring: "تعطيل", button_recurring_open: "تمكين", button_edit_series: "تحرير سلسلة", button_edit_occurrence: "تعديل نسخة", button_edit_occurrence_and_following: "This and following events", grid_tab: "جدول", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "يومي", repeat_radio_week: "أسبوعي", repeat_radio_month: "شهري", repeat_radio_year: "سنوي", repeat_radio_day_type: "كل", repeat_text_day_count: "يوم", repeat_radio_day_type2: "كل يوم عمل", repeat_week: " تكرار كل", repeat_text_week_count: "أسبوع في الأيام التالية:", repeat_radio_month_type: "تكرار", repeat_radio_month_start: "في", repeat_text_month_day: "يوم كل", repeat_text_month_count: "شهر", repeat_text_month_count2_before: "كل", repeat_text_month_count2_after: "شهر", repeat_year_label: "في", select_year_day2: "من", repeat_text_year_day: "يوم", select_year_month: "شهر", repeat_radio_end: "بدون تاريخ انتهاء", repeat_text_occurrences_count: "تكرارات", repeat_radio_end2: "بعد", repeat_radio_end3: "ينتهي في", repeat_never: "أبداً", repeat_daily: "كل يوم", repeat_workdays: "كل يوم عمل", repeat_weekly: "كل أسبوع", repeat_monthly: "كل شهر", repeat_yearly: "كل سنة", repeat_custom: "تخصيص", repeat_freq_day: "يوم", repeat_freq_week: "أسبوع", repeat_freq_month: "شهر", repeat_freq_year: "سنة", repeat_on_date: "في التاريخ", repeat_ends: "ينتهي", month_for_recurring: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], day_for_recurring: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] } }, be: { date: { month_full: ["Студзень", "Люты", "Сакавік", "Красавік", "Maй", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"], month_short: ["Студз", "Лют", "Сак", "Крас", "Maй", "Чэр", "Ліп", "Жнів", "Вер", "Каст", "Ліст", "Снеж"], day_full: ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"], day_short: ["Нд", "Пн", "Аўт", "Ср", "Чцв", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сёння", day_tab: "Дзень", week_tab: "Тыдзень", month_tab: "Месяц", new_event: "Новая падзея", icon_save: "Захаваць", icon_cancel: "Адмяніць", icon_details: "Дэталі", icon_edit: "Змяніць", icon_delete: "Выдаліць", confirm_closing: "", confirm_deleting: "Падзея будзе выдалена незваротна, працягнуць?", section_description: "Апісанне", section_time: "Перыяд часу", full_day: "Увесь дзень", confirm_recurring: "Вы хочаце змяніць усю серыю паўтаральных падзей?", section_recurring: "Паўтарэнне", button_recurring: "Адключана", button_recurring_open: "Уключана", button_edit_series: "Рэдагаваць серыю", button_edit_occurrence: "Рэдагаваць асобнік", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Спіс", date: "Дата", description: "Апісанне", year_tab: "Год", week_agenda_tab: "Спіс", grid_tab: "Спic", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Дзень", repeat_radio_week: "Тыдзень", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Кожны", repeat_text_day_count: "дзень", repeat_radio_day_type2: "Кожны працоўны дзень", repeat_week: " Паўтараць кожны", repeat_text_week_count: "тыдзень", repeat_radio_month_type: "Паўтараць", repeat_radio_month_start: "", repeat_text_month_day: " чысла кожнага", repeat_text_month_count: "месяцу", repeat_text_month_count2_before: "кожны ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "дзень", select_year_month: "", repeat_radio_end: "Без даты заканчэння", repeat_text_occurrences_count: "паўтораў", repeat_radio_end2: "", repeat_radio_end3: "Да ", repeat_never: "Ніколі", repeat_daily: "Кожны дзень", repeat_workdays: "Кожны працоўны дзень", repeat_weekly: "Кожны тыдзень", repeat_monthly: "Кожны месяц", repeat_yearly: "Кожны год", repeat_custom: "Наладжвальны", repeat_freq_day: "Дзень", repeat_freq_week: "Тыдзень", repeat_freq_month: "Месяц", repeat_freq_year: "Год", repeat_on_date: "На дату", repeat_ends: "Заканчваецца", month_for_recurring: ["Студзеня", "Лютага", "Сакавіка", "Красавіка", "Мая", "Чэрвеня", "Ліпeня", "Жніўня", "Верасня", "Кастрычніка", "Лістапада", "Снежня"], day_for_recurring: ["Нядзелю", "Панядзелак", "Аўторак", "Сераду", "Чацвер", "Пятніцу", "Суботу"] } }, ca: { date: { month_full: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], month_short: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"], day_full: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"], day_short: ["Dg", "Dl", "Dm", "Dc", "Dj", "Dv", "Ds"] }, labels: { dhx_cal_today_button: "Hui", day_tab: "Dia", week_tab: "Setmana", month_tab: "Mes", new_event: "Nou esdeveniment", icon_save: "Guardar", icon_cancel: "Cancel·lar", icon_details: "Detalls", icon_edit: "Editar", icon_delete: "Esborrar", confirm_closing: "", confirm_deleting: "L'esdeveniment s'esborrarà definitivament, continuar ?", section_description: "Descripció", section_time: "Periode de temps", full_day: "Tot el dia", confirm_recurring: "¿Desitja modificar el conjunt d'esdeveniments repetits?", section_recurring: "Repeteixca l'esdeveniment", button_recurring: "Impedit", button_recurring_open: "Permés", button_edit_series: "Edit sèrie", button_edit_occurrence: "Edita Instància", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Descripció", year_tab: "Any", week_agenda_tab: "Agenda", grid_tab: "Taula", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diari", repeat_radio_week: "Setmanal", repeat_radio_month: "Mensual", repeat_radio_year: "Anual", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia", repeat_radio_day_type2: "Cada dia laborable", repeat_week: " Repetir cada", repeat_text_week_count: "setmana els dies següents:", repeat_radio_month_type: "Repetir", repeat_radio_month_start: "El", repeat_text_month_day: "dia cada", repeat_text_month_count: "mes", repeat_text_month_count2_before: "cada", repeat_text_month_count2_after: "mes", repeat_year_label: "El", select_year_day2: "de", repeat_text_year_day: "dia", select_year_month: "mes", repeat_radio_end: "Sense data de finalització", repeat_text_occurrences_count: "ocurrències", repeat_radio_end2: "Després", repeat_radio_end3: "Finalitzar el", repeat_never: "Mai", repeat_daily: "Cada dia", repeat_workdays: "Cada dia laborable", repeat_weekly: "Cada setmana", repeat_monthly: "Cada mes", repeat_yearly: "Cada any", repeat_custom: "Personalitzat", repeat_freq_day: "Dia", repeat_freq_week: "Setmana", repeat_freq_month: "Mes", repeat_freq_year: "Any", repeat_on_date: "En la data", repeat_ends: "Finalitza", month_for_recurring: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], day_for_recurring: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"] } }, cn: { date: { month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], day_short: ["日", "一", "二", "三", "四", "五", "六"] }, labels: { dhx_cal_today_button: "今天", day_tab: "日", week_tab: "周", month_tab: "月", new_event: "新建日程", icon_save: "保存", icon_cancel: "关闭", icon_details: "详细", icon_edit: "编辑", icon_delete: "删除", confirm_closing: "请确认是否撤销修改!", confirm_deleting: "是否删除日程?", section_description: "描述", section_time: "时间范围", full_day: "整天", confirm_recurring: "请确认是否将日程设为重复模式?", section_recurring: "重复周期", button_recurring: "禁用", button_recurring_open: "启用", button_edit_series: "编辑系列", button_edit_occurrence: "编辑实例", button_edit_occurrence_and_following: "This and following events", agenda_tab: "议程", date: "日期", description: "说明", year_tab: "今年", week_agenda_tab: "议程", grid_tab: "电网", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "按天", repeat_radio_week: "按周", repeat_radio_month: "按月", repeat_radio_year: "按年", repeat_radio_day_type: "每", repeat_text_day_count: "天", repeat_radio_day_type2: "每个工作日", repeat_week: " 重复 每", repeat_text_week_count: "星期的:", repeat_radio_month_type: "重复", repeat_radio_month_start: "在", repeat_text_month_day: "日 每", repeat_text_month_count: "月", repeat_text_month_count2_before: "每", repeat_text_month_count2_after: "月", repeat_year_label: "在", select_year_day2: "的", repeat_text_year_day: "日", select_year_month: "月", repeat_radio_end: "无结束日期", repeat_text_occurrences_count: "次结束", repeat_radio_end2: "重复", repeat_radio_end3: "结束于", repeat_never: "从不", repeat_daily: "每天", repeat_workdays: "每个工作日", repeat_weekly: "每周", repeat_monthly: "每月", repeat_yearly: "每年", repeat_custom: "自定义", repeat_freq_day: "天", repeat_freq_week: "周", repeat_freq_month: "月", repeat_freq_year: "年", repeat_on_date: "在日期", repeat_ends: "结束", month_for_recurring: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], day_for_recurring: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] } }, cs: { date: { month_full: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], month_short: ["Led", "Ún", "Bře", "Dub", "Kvě", "Čer", "Čec", "Srp", "Září", "Říj", "List", "Pro"], day_full: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"], day_short: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Den", week_tab: "Týden", month_tab: "Měsíc", new_event: "Nová událost", icon_save: "Uložit", icon_cancel: "Zpět", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Smazat", confirm_closing: "", confirm_deleting: "Událost bude trvale smazána, opravdu?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Přejete si upravit celou řadu opakovaných událostí?", section_recurring: "Opakování události", button_recurring: "Vypnuto", button_recurring_open: "Zapnuto", button_edit_series: "Edit series", button_edit_occurrence: "Upravit instance", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Program", date: "Datum", description: "Poznámka", year_tab: "Rok", full_day: "Full day", week_agenda_tab: "Program", grid_tab: "Mřížka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denně", repeat_radio_week: "Týdně", repeat_radio_month: "Měsíčně", repeat_radio_year: "Ročně", repeat_radio_day_type: "každý", repeat_text_day_count: "Den", repeat_radio_day_type2: "pracovní dny", repeat_week: "Opakuje každých", repeat_text_week_count: "Týdnů na:", repeat_radio_month_type: "u každého", repeat_radio_month_start: "na", repeat_text_month_day: "Den každého", repeat_text_month_count: "Měsíc", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "Měsíc", repeat_year_label: "na", select_year_day2: "v", repeat_text_year_day: "Den v", select_year_month: "", repeat_radio_end: "bez data ukončení", repeat_text_occurrences_count: "Události", repeat_radio_end2: "po", repeat_radio_end3: "Konec", repeat_never: "Nikdy", repeat_daily: "Každý den", repeat_workdays: "Každý pracovní den", repeat_weekly: "Každý týden", repeat_monthly: "Každý měsíc", repeat_yearly: "Každý rok", repeat_custom: "Vlastní", repeat_freq_day: "Den", repeat_freq_week: "Týden", repeat_freq_month: "Měsíc", repeat_freq_year: "Rok", repeat_on_date: "Na datum", repeat_ends: "Končí", month_for_recurring: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], day_for_recurring: ["Neděle ", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"] } }, da: { date: { month_full: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uge", month_tab: "Måned", new_event: "Ny begivenhed", icon_save: "Gem", icon_cancel: "Fortryd", icon_details: "Detaljer", icon_edit: "Tilret", icon_delete: "Slet", confirm_closing: "Dine rettelser vil gå tabt.. Er dy sikker?", confirm_deleting: "Bigivenheden vil blive slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du tilrette hele serien af gentagne begivenheder?", section_recurring: "Gentag begivenhed", button_recurring: "Frakoblet", button_recurring_open: "Tilkoblet", button_edit_series: "Rediger serien", button_edit_occurrence: "Rediger en kopi", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Dagsorden", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Dagsorden", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ugenlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "På hver arbejdsdag", repeat_week: " Gentager sig hver", repeat_text_week_count: "uge på følgende dage:", repeat_radio_month_type: "Hver den", repeat_radio_month_start: "Den", repeat_text_month_day: " i hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen slutdato", repeat_text_occurrences_count: "gentagelse", repeat_radio_end2: "Efter", repeat_radio_end3: "Slut", repeat_never: "Aldrig", repeat_daily: "Hver dag", repeat_workdays: "Hver hverdag", repeat_weekly: "Hver uge", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Brugerdefineret", repeat_freq_day: "Dag", repeat_freq_week: "Uge", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, de: { date: { month_full: [" Januar", " Februar", " März ", " April", " Mai", " Juni", " Juli", " August", " September ", " Oktober", " November ", " Dezember"], month_short: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], day_full: ["Sonntag", "Montag", "Dienstag", " Mittwoch", " Donnerstag", "Freitag", "Samstag"], day_short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"] }, labels: { dhx_cal_today_button: "Heute", day_tab: "Tag", week_tab: "Woche", month_tab: "Monat", new_event: "neuer Eintrag", icon_save: "Speichern", icon_cancel: "Abbrechen", icon_details: "Details", icon_edit: "Ändern", icon_delete: "Löschen", confirm_closing: "", confirm_deleting: "Der Eintrag wird gelöscht", section_description: "Beschreibung", section_time: "Zeitspanne", full_day: "Ganzer Tag", confirm_recurring: "Wollen Sie alle Einträge bearbeiten oder nur diesen einzelnen Eintrag?", section_recurring: "Wiederholung", button_recurring: "Aus", button_recurring_open: "An", button_edit_series: "Bearbeiten Sie die Serie", button_edit_occurrence: "Bearbeiten Sie eine Kopie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Datum", description: "Beschreibung", year_tab: "Jahre", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Täglich", repeat_radio_week: "Wöchentlich", repeat_radio_month: "Monatlich", repeat_radio_year: "Jährlich", repeat_radio_day_type: "jeden", repeat_text_day_count: "Tag", repeat_radio_day_type2: "an jedem Arbeitstag", repeat_week: " Wiederholt sich jede", repeat_text_week_count: "Woche am:", repeat_radio_month_type: "an jedem", repeat_radio_month_start: "am", repeat_text_month_day: "Tag eines jeden", repeat_text_month_count: "Monats", repeat_text_month_count2_before: "jeden", repeat_text_month_count2_after: "Monats", repeat_year_label: "am", select_year_day2: "im", repeat_text_year_day: "Tag im", select_year_month: "", repeat_radio_end: "kein Enddatum", repeat_text_occurrences_count: "Ereignissen", repeat_radio_end3: "Schluß", repeat_radio_end2: "nach", repeat_never: "Nie", repeat_daily: "Jeden Tag", repeat_workdays: "Jeden Werktag", repeat_weekly: "Jede Woche", repeat_monthly: "Jeden Monat", repeat_yearly: "Jedes Jahr", repeat_custom: "Benutzerdefiniert", repeat_freq_day: "Tag", repeat_freq_week: "Woche", repeat_freq_month: "Monat", repeat_freq_year: "Jahr", repeat_on_date: "Am Datum", repeat_ends: "Endet", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"] } }, el: { date: { month_full: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], month_short: ["ΙΑΝ", "ΦΕΒ", "ΜΑΡ", "ΑΠΡ", "ΜΑΙ", "ΙΟΥΝ", "ΙΟΥΛ", "ΑΥΓ", "ΣΕΠ", "ΟΚΤ", "ΝΟΕ", "ΔΕΚ"], day_full: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"], day_short: ["ΚΥ", "ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ"] }, labels: { dhx_cal_today_button: "Σήμερα", day_tab: "Ημέρα", week_tab: "Εβδομάδα", month_tab: "Μήνας", new_event: "Νέο έργο", icon_save: "Αποθήκευση", icon_cancel: "Άκυρο", icon_details: "Λεπτομέρειες", icon_edit: "Επεξεργασία", icon_delete: "Διαγραφή", confirm_closing: "", confirm_deleting: "Το έργο θα διαγραφεί οριστικά. Θέλετε να συνεχίσετε;", section_description: "Περιγραφή", section_time: "Χρονική περίοδος", full_day: "Πλήρης Ημέρα", confirm_recurring: "Θέλετε να επεξεργασθείτε ολόκληρη την ομάδα των επαναλαμβανόμενων έργων;", section_recurring: "Επαναλαμβανόμενο έργο", button_recurring: "Ανενεργό", button_recurring_open: "Ενεργό", button_edit_series: "Επεξεργαστείτε τη σειρά", button_edit_occurrence: "Επεξεργασία ένα αντίγραφο", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Ημερήσια Διάταξη", date: "Ημερομηνία", description: "Περιγραφή", year_tab: "Έτος", week_agenda_tab: "Ημερήσια Διάταξη", grid_tab: "Πλέγμα", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Ημερησίως", repeat_radio_week: "Εβδομαδιαίως", repeat_radio_month: "Μηνιαίως", repeat_radio_year: "Ετησίως", repeat_radio_day_type: "Κάθε", repeat_text_day_count: "ημέρα", repeat_radio_day_type2: "Κάθε εργάσιμη", repeat_week: " Επανάληψη κάθε", repeat_text_week_count: "εβδομάδα τις επόμενες ημέρες:", repeat_radio_month_type: "Επανάληψη", repeat_radio_month_start: "Την", repeat_text_month_day: "ημέρα κάθε", repeat_text_month_count: "μήνα", repeat_text_month_count2_before: "κάθε", repeat_text_month_count2_after: "μήνα", repeat_year_label: "Την", select_year_day2: "του", repeat_text_year_day: "ημέρα", select_year_month: "μήνα", repeat_radio_end: "Χωρίς ημερομηνία λήξεως", repeat_text_occurrences_count: "επαναλήψεις", repeat_radio_end3: "Λήγει την", repeat_radio_end2: "Μετά από", repeat_never: "Ποτέ", repeat_daily: "Κάθε μέρα", repeat_workdays: "Κάθε εργάσιμη μέρα", repeat_weekly: "Κάθε εβδομάδα", repeat_monthly: "Κάθε μήνα", repeat_yearly: "Κάθε χρόνο", repeat_custom: "Προσαρμοσμένο", repeat_freq_day: "Ημέρα", repeat_freq_week: "Εβδομάδα", repeat_freq_month: "Μήνας", repeat_freq_year: "Χρόνος", repeat_on_date: "Σε ημερομηνία", repeat_ends: "Λήγει", month_for_recurring: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], day_for_recurring: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"] } }, en: { date: { month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }, labels: { dhx_cal_today_button: "Today", day_tab: "Day", week_tab: "Week", month_tab: "Month", new_event: "New event", icon_save: "Save", icon_cancel: "Cancel", icon_details: "Details", icon_edit: "Edit", icon_delete: "Delete", confirm_closing: "", confirm_deleting: "Event will be deleted permanently, are you sure?", section_description: "Description", section_time: "Time period", full_day: "Full day", confirm_recurring: "Edit recurring event", section_recurring: "Repeat event", button_recurring: "Disabled", button_recurring_open: "Enabled", button_edit_series: "All events", button_edit_occurrence: "This event", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Date", description: "Description", year_tab: "Year", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daily", repeat_radio_week: "Weekly", repeat_radio_month: "Monthly", repeat_radio_year: "Yearly", repeat_radio_day_type: "Every", repeat_text_day_count: "day", repeat_radio_day_type2: "Every workday", repeat_week: " Repeat every", repeat_text_week_count: "week next days:", repeat_radio_month_type: "Repeat", repeat_radio_month_start: "On", repeat_text_month_day: "day every", repeat_text_month_count: "month", repeat_text_month_count2_before: "every", repeat_text_month_count2_after: "month", repeat_year_label: "On", select_year_day2: "of", repeat_text_year_day: "day", select_year_month: "month", repeat_radio_end: "No end date", repeat_text_occurrences_count: "occurrences", repeat_radio_end2: "After", repeat_radio_end3: "End by", repeat_never: "Never", repeat_daily: "Every day", repeat_workdays: "Every weekday", repeat_weekly: "Every week", repeat_monthly: "Every month", repeat_yearly: "Every year", repeat_custom: "Custom", repeat_freq_day: "Day", repeat_freq_week: "Week", repeat_freq_month: "Month", repeat_freq_year: "Year", repeat_on_date: "On date", repeat_ends: "Ends", month_for_recurring: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] } }, es: { date: { month_full: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], month_short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], day_full: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], day_short: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] }, labels: { dhx_cal_today_button: "Hoy", day_tab: "Día", week_tab: "Semana", month_tab: "Mes", new_event: "Nuevo evento", icon_save: "Guardar", icon_cancel: "Cancelar", icon_details: "Detalles", icon_edit: "Editar", icon_delete: "Eliminar", confirm_closing: "", confirm_deleting: "El evento se borrará definitivamente, ¿continuar?", section_description: "Descripción", section_time: "Período", full_day: "Todo el día", confirm_recurring: "¿Desea modificar el conjunto de eventos repetidos?", section_recurring: "Repita el evento", button_recurring: "Impedido", button_recurring_open: "Permitido", button_edit_series: "Editar la serie", button_edit_occurrence: "Editar este evento", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Día", date: "Fecha", description: "Descripción", year_tab: "Año", week_agenda_tab: "Día", grid_tab: "Reja", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diariamente", repeat_radio_week: "Semanalmente", repeat_radio_month: "Mensualmente", repeat_radio_year: "Anualmente", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia", repeat_radio_day_type2: "Cada jornada de trabajo", repeat_week: " Repetir cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repita", repeat_radio_month_start: "El", repeat_text_month_day: "dia cada ", repeat_text_month_count: "mes", repeat_text_month_count2_before: "cada", repeat_text_month_count2_after: "mes", repeat_year_label: "El", select_year_day2: "del", repeat_text_year_day: "dia", select_year_month: "mes", repeat_radio_end: "Sin fecha de finalización", repeat_text_occurrences_count: "ocurrencias", repeat_radio_end3: "Fin", repeat_radio_end2: "Después de", repeat_never: "Nunca", repeat_daily: "Cada día", repeat_workdays: "Cada día laborable", repeat_weekly: "Cada semana", repeat_monthly: "Cada mes", repeat_yearly: "Cada año", repeat_custom: "Personalizado", repeat_freq_day: "Día", repeat_freq_week: "Semana", repeat_freq_month: "Mes", repeat_freq_year: "Año", repeat_on_date: "En la fecha", repeat_ends: "Termina", month_for_recurring: ["Enero", "Febrero", "Маrzo", "Аbril", "Mayo", "Junio", "Julio", "Аgosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"], day_for_recurring: ["Domingo", "Lunes", "Martes", "Miércoles", "Jeuves", "Viernes", "Sabado"] } }, fi: { date: { month_full: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], month_short: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou"], day_full: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"], day_short: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"] }, labels: { dhx_cal_today_button: "Tänään", day_tab: "Päivä", week_tab: "Viikko", month_tab: "Kuukausi", new_event: "Uusi tapahtuma", icon_save: "Tallenna", icon_cancel: "Peru", icon_details: "Tiedot", icon_edit: "Muokkaa", icon_delete: "Poista", confirm_closing: "", confirm_deleting: "Haluatko varmasti poistaa tapahtuman?", section_description: "Kuvaus", section_time: "Aikajakso", full_day: "Koko päivä", confirm_recurring: "Haluatko varmasti muokata toistuvan tapahtuman kaikkia jaksoja?", section_recurring: "Toista tapahtuma", button_recurring: "Ei k&auml;yt&ouml;ss&auml;", button_recurring_open: "K&auml;yt&ouml;ss&auml;", button_edit_series: "Muokkaa sarja", button_edit_occurrence: "Muokkaa kopio", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Esityslista", date: "Päivämäärä", description: "Kuvaus", year_tab: "Vuoden", week_agenda_tab: "Esityslista", grid_tab: "Ritilä", drag_to_create: "Luo uusi vetämällä", drag_to_move: "Siirrä vetämällä", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "P&auml;ivitt&auml;in", repeat_radio_week: "Viikoittain", repeat_radio_month: "Kuukausittain", repeat_radio_year: "Vuosittain", repeat_radio_day_type: "Joka", repeat_text_day_count: "p&auml;iv&auml;", repeat_radio_day_type2: "Joka arkip&auml;iv&auml;", repeat_week: "Toista joka", repeat_text_week_count: "viikko n&auml;in&auml; p&auml;ivin&auml;:", repeat_radio_month_type: "Toista", repeat_radio_month_start: "", repeat_text_month_day: "p&auml;iv&auml;n&auml; joka", repeat_text_month_count: "kuukausi", repeat_text_month_count2_before: "joka", repeat_text_month_count2_after: "kuukausi", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "p&auml;iv&auml;", select_year_month: "kuukausi", repeat_radio_end: "Ei loppumisaikaa", repeat_text_occurrences_count: "Toiston j&auml;lkeen", repeat_radio_end3: "Loppuu", repeat_radio_end2: "", repeat_never: "Ei koskaan", repeat_daily: "Joka päivä", repeat_workdays: "Joka arkipäivä", repeat_weekly: "Joka viikko", repeat_monthly: "Joka kuukausi", repeat_yearly: "Joka vuosi", repeat_custom: "Mukautettu", repeat_freq_day: "Päivä", repeat_freq_week: "Viikko", repeat_freq_month: "Kuukausi", repeat_freq_year: "Vuosi", repeat_on_date: "Tiettynä päivänä", repeat_ends: "Päättyy", month_for_recurring: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], day_for_recurring: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"] } }, fr: { date: { month_full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], month_short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"], day_full: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"], day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"] }, labels: { dhx_cal_today_button: "Aujourd'hui", day_tab: "Jour", week_tab: "Semaine", month_tab: "Mois", new_event: "Nouvel événement", icon_save: "Enregistrer", icon_cancel: "Annuler", icon_details: "Détails", icon_edit: "Modifier", icon_delete: "Effacer", confirm_closing: "", confirm_deleting: "L'événement sera effacé sans appel, êtes-vous sûr ?", section_description: "Description", section_time: "Période", full_day: "Journée complète", confirm_recurring: "Voulez-vous éditer toute une série d'évènements répétés?", section_recurring: "Périodicité", button_recurring: "Désactivé", button_recurring_open: "Activé", button_edit_series: "Modifier la série", button_edit_occurrence: "Modifier une copie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Jour", date: "Date", description: "Description", year_tab: "Année", week_agenda_tab: "Jour", grid_tab: "Grille", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidienne", repeat_radio_week: "Hebdomadaire", repeat_radio_month: "Mensuelle", repeat_radio_year: "Annuelle", repeat_radio_day_type: "Chaque", repeat_text_day_count: "jour", repeat_radio_day_type2: "Chaque journée de travail", repeat_week: " Répéter toutes les", repeat_text_week_count: "semaine:", repeat_radio_month_type: "Répéter", repeat_radio_month_start: "Le", repeat_text_month_day: "jour chaque", repeat_text_month_count: "mois", repeat_text_month_count2_before: "chaque", repeat_text_month_count2_after: "mois", repeat_year_label: "Le", select_year_day2: "du", repeat_text_year_day: "jour", select_year_month: "mois", repeat_radio_end: "Pas de date d&quot;achèvement", repeat_text_occurrences_count: "occurrences", repeat_radio_end3: "Fin", repeat_radio_end2: "Après", repeat_never: "Jamais", repeat_daily: "Chaque jour", repeat_workdays: "Chaque jour ouvrable", repeat_weekly: "Chaque semaine", repeat_monthly: "Chaque mois", repeat_yearly: "Chaque année", repeat_custom: "Personnalisé", repeat_freq_day: "Jour", repeat_freq_week: "Semaine", repeat_freq_month: "Mois", repeat_freq_year: "Année", repeat_on_date: "À la date", repeat_ends: "Se termine", month_for_recurring: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], day_for_recurring: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"] } }, he: { date: { month_full: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], month_short: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"], day_full: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"], day_short: ["א", "ב", "ג", "ד", "ה", "ו", "ש"] }, labels: { dhx_cal_today_button: "היום", day_tab: "יום", week_tab: "שבוע", month_tab: "חודש", new_event: "ארוע חדש", icon_save: "שמור", icon_cancel: "בטל", icon_details: "פרטים", icon_edit: "ערוך", icon_delete: "מחק", confirm_closing: "", confirm_deleting: "ארוע ימחק סופית.להמשיך?", section_description: "תיאור", section_time: "תקופה", confirm_recurring: "האם ברצונך לשנות כל סדרת ארועים מתמשכים?", section_recurring: "להעתיק ארוע", button_recurring: "לא פעיל", button_recurring_open: "פעיל", full_day: "יום שלם", button_edit_series: "ערוך את הסדרה", button_edit_occurrence: "עריכת עותק", button_edit_occurrence_and_following: "This and following events", agenda_tab: "סדר יום", date: "תאריך", description: "תיאור", year_tab: "לשנה", week_agenda_tab: "סדר יום", grid_tab: "סורג", drag_to_create: "Drag to create", drag_to_move: "גרור כדי להזיז", message_ok: "OK", message_cancel: "בטל", next: "הבא", prev: "הקודם", year: "שנה", month: "חודש", day: "יום", hour: "שעה", minute: "דקה", repeat_radio_day: "יומי", repeat_radio_week: "שבועי", repeat_radio_month: "חודשי", repeat_radio_year: "שנתי", repeat_radio_day_type: "חזור כל", repeat_text_day_count: "ימים", repeat_radio_day_type2: "חזור כל יום עבודה", repeat_week: " חזור כל", repeat_text_week_count: "שבוע לפי ימים:", repeat_radio_month_type: "חזור כל", repeat_radio_month_start: "כל", repeat_text_month_day: "ימים כל", repeat_text_month_count: "חודשים", repeat_text_month_count2_before: "חזור כל", repeat_text_month_count2_after: "חודש", repeat_year_label: "כל", select_year_day2: "בחודש", repeat_text_year_day: "ימים", select_year_month: "חודש", repeat_radio_end: "לעולם לא מסתיים", repeat_text_occurrences_count: "אירועים", repeat_radio_end3: "מסתיים ב", repeat_radio_end2: "אחרי", repeat_never: "אף פעם", repeat_daily: "כל יום", repeat_workdays: "כל יום עבודה", repeat_weekly: "כל שבוע", repeat_monthly: "כל חודש", repeat_yearly: "כל שנה", repeat_custom: "מותאם אישית", repeat_freq_day: "יום", repeat_freq_week: "שבוע", repeat_freq_month: "חודש", repeat_freq_year: "שנה", repeat_on_date: "בתאריך", repeat_ends: "מסתיים", month_for_recurring: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], day_for_recurring: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"] } }, hu: { date: { month_full: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"], month_short: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Vasárnap", "Hétfõ", "Kedd", "Szerda", "Csütörtök", "Péntek", "szombat"], day_short: ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"] }, labels: { dhx_cal_today_button: "Ma", day_tab: "Nap", week_tab: "Hét", month_tab: "Hónap", new_event: "Új esemény", icon_save: "Mentés", icon_cancel: "Mégse", icon_details: "Részletek", icon_edit: "Szerkesztés", icon_delete: "Törlés", confirm_closing: "", confirm_deleting: "Az esemény törölve lesz, biztosan folytatja?", section_description: "Leírás", section_time: "Idõszak", full_day: "Egesz napos", confirm_recurring: "Biztosan szerkeszteni akarod az összes ismétlõdõ esemény beállítását?", section_recurring: "Esemény ismétlése", button_recurring: "Tiltás", button_recurring_open: "Engedélyezés", button_edit_series: "Edit series", button_edit_occurrence: "Szerkesztés bíróság", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Napirend", date: "Dátum", description: "Leírás", year_tab: "Év", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Napi", repeat_radio_week: "Heti", repeat_radio_month: "Havi", repeat_radio_year: "Éves", repeat_radio_day_type: "Minden", repeat_text_day_count: "nap", repeat_radio_day_type2: "Minden munkanap", repeat_week: " Ismételje meg minden", repeat_text_week_count: "héten a következő napokon:", repeat_radio_month_type: "Ismétlés", repeat_radio_month_start: "Ekkor", repeat_text_month_day: "nap minden", repeat_text_month_count: "hónapban", repeat_text_month_count2_before: "minden", repeat_text_month_count2_after: "hónapban", repeat_year_label: "Ekkor", select_year_day2: "-án/-én", repeat_text_year_day: "nap", select_year_month: "hónap", repeat_radio_end: "Nincs befejezési dátum", repeat_text_occurrences_count: "esemény", repeat_radio_end2: "Után", repeat_radio_end3: "Befejező dátum", repeat_never: "Soha", repeat_daily: "Minden nap", repeat_workdays: "Minden munkanap", repeat_weekly: "Minden héten", repeat_monthly: "Minden hónapban", repeat_yearly: "Minden évben", repeat_custom: "Egyedi", repeat_freq_day: "Nap", repeat_freq_week: "Hét", repeat_freq_month: "Hónap", repeat_freq_year: "Év", repeat_on_date: "Dátum szerint", repeat_ends: "Befejeződik", month_for_recurring: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"], day_for_recurring: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"] } }, id: { date: { month_full: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"], day_full: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], day_short: ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] }, labels: { dhx_cal_today_button: "Hari Ini", day_tab: "Hari", week_tab: "Minggu", month_tab: "Bulan", new_event: "Acara Baru", icon_save: "Simpan", icon_cancel: "Batal", icon_details: "Detail", icon_edit: "Edit", icon_delete: "Hapus", confirm_closing: "", confirm_deleting: "Acara akan dihapus", section_description: "Keterangan", section_time: "Periode", full_day: "Hari penuh", confirm_recurring: "Apakah acara ini akan berulang?", section_recurring: "Acara Rutin", button_recurring: "Tidak Difungsikan", button_recurring_open: "Difungsikan", button_edit_series: "Mengedit seri", button_edit_occurrence: "Mengedit salinan", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Tanggal", description: "Keterangan", year_tab: "Tahun", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Harian", repeat_radio_week: "Mingguan", repeat_radio_month: "Bulanan", repeat_radio_year: "Tahunan", repeat_radio_day_type: "Setiap", repeat_text_day_count: "hari", repeat_radio_day_type2: "Setiap hari kerja", repeat_week: " Ulangi setiap", repeat_text_week_count: "minggu pada hari berikut:", repeat_radio_month_type: "Ulangi", repeat_radio_month_start: "Pada", repeat_text_month_day: "hari setiap", repeat_text_month_count: "bulan", repeat_text_month_count2_before: "setiap", repeat_text_month_count2_after: "bulan", repeat_year_label: "Pada", select_year_day2: "dari", repeat_text_year_day: "hari", select_year_month: "bulan", repeat_radio_end: "Tanpa tanggal akhir", repeat_text_occurrences_count: "kejadian", repeat_radio_end2: "Setelah", repeat_radio_end3: "Berakhir pada", repeat_never: "Tidak pernah", repeat_daily: "Setiap hari", repeat_workdays: "Setiap hari kerja", repeat_weekly: "Setiap minggu", repeat_monthly: "Setiap bulan", repeat_yearly: "Setiap tahun", repeat_custom: "Kustom", repeat_freq_day: "Hari", repeat_freq_week: "Minggu", repeat_freq_month: "Bulan", repeat_freq_year: "Tahun", repeat_on_date: "Pada tanggal", repeat_ends: "Berakhir", month_for_recurring: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] } }, it: { date: { month_full: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], month_short: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"], day_full: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"], day_short: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"] }, labels: { dhx_cal_today_button: "Oggi", day_tab: "Giorno", week_tab: "Settimana", month_tab: "Mese", new_event: "Nuovo evento", icon_save: "Salva", icon_cancel: "Chiudi", icon_details: "Dettagli", icon_edit: "Modifica", icon_delete: "Elimina", confirm_closing: "", confirm_deleting: "L'evento sarà eliminato, siete sicuri?", section_description: "Descrizione", section_time: "Periodo di tempo", full_day: "Intera giornata", confirm_recurring: "Vuoi modificare l'intera serie di eventi?", section_recurring: "Ripetere l'evento", button_recurring: "Disattivato", button_recurring_open: "Attivato", button_edit_series: "Modificare la serie", button_edit_occurrence: "Modificare una copia", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Descrizione", year_tab: "Anno", week_agenda_tab: "Agenda", grid_tab: "Griglia", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidiano", repeat_radio_week: "Settimanale", repeat_radio_month: "Mensile", repeat_radio_year: "Annuale", repeat_radio_day_type: "Ogni", repeat_text_day_count: "giorno", repeat_radio_day_type2: "Ogni giornata lavorativa", repeat_week: " Ripetere ogni", repeat_text_week_count: "settimana:", repeat_radio_month_type: "Ripetere", repeat_radio_month_start: "Il", repeat_text_month_day: "giorno ogni", repeat_text_month_count: "mese", repeat_text_month_count2_before: "ogni", repeat_text_month_count2_after: "mese", repeat_year_label: "Il", select_year_day2: "del", repeat_text_year_day: "giorno", select_year_month: "mese", repeat_radio_end: "Senza data finale", repeat_text_occurrences_count: "occorenze", repeat_radio_end3: "Fine", repeat_radio_end2: "Dopo", repeat_never: "Mai", repeat_daily: "Ogni giorno", repeat_workdays: "Ogni giorno feriale", repeat_weekly: "Ogni settimana", repeat_monthly: "Ogni mese", repeat_yearly: "Ogni anno", repeat_custom: "Personalizzato", repeat_freq_day: "Giorno", repeat_freq_week: "Settimana", repeat_freq_month: "Mese", repeat_freq_year: "Anno", repeat_on_date: "Alla data", repeat_ends: "Finisce", month_for_recurring: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Jiugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], day_for_recurring: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Jovedì", "Venerdì", "Sabato"] } }, jp: { date: { month_full: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"], day_short: ["日", "月", "火", "水", "木", "金", "土"] }, labels: { dhx_cal_today_button: "今日", day_tab: "日", week_tab: "週", month_tab: "月", new_event: "新イベント", icon_save: "保存", icon_cancel: "キャンセル", icon_details: "詳細", icon_edit: "編集", icon_delete: "削除", confirm_closing: "", confirm_deleting: "イベント完全に削除されます、宜しいですか？", section_description: "デスクリプション", section_time: "期間", confirm_recurring: "繰り返されているイベントを全て編集しますか？", section_recurring: "イベントを繰り返す", button_recurring: "無効", button_recurring_open: "有効", full_day: "終日", button_edit_series: "シリーズを編集します", button_edit_occurrence: "コピーを編集", button_edit_occurrence_and_following: "This and following events", agenda_tab: "議題は", date: "日付", description: "説明", year_tab: "今年", week_agenda_tab: "議題は", grid_tab: "グリッド", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "毎日", repeat_radio_week: "毎週", repeat_radio_month: "毎月", repeat_radio_year: "毎年", repeat_radio_day_type: "毎", repeat_text_day_count: "日", repeat_radio_day_type2: "毎営業日", repeat_week: " 繰り返し毎", repeat_text_week_count: "週 次の日:", repeat_radio_month_type: "繰り返し", repeat_radio_month_start: "オン", repeat_text_month_day: "日毎", repeat_text_month_count: "月", repeat_text_month_count2_before: "毎", repeat_text_month_count2_after: "月", repeat_year_label: "オン", select_year_day2: "の", repeat_text_year_day: "日", select_year_month: "月", repeat_radio_end: "終了日なし", repeat_text_occurrences_count: "回数", repeat_radio_end2: "後", repeat_radio_end3: "終了日まで", repeat_never: "決して", repeat_daily: "毎日", repeat_workdays: "毎営業日", repeat_weekly: "毎週", repeat_monthly: "毎月", repeat_yearly: "毎年", repeat_custom: "カスタム", repeat_freq_day: "日", repeat_freq_week: "週", repeat_freq_month: "月", repeat_freq_year: "年", repeat_on_date: "日にち", repeat_ends: "終了", month_for_recurring: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_for_recurring: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"] } }, nb: { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Mon", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "I dag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny hendelse", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Rediger", icon_delete: "Slett", confirm_closing: "", confirm_deleting: "Hendelsen vil bli slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du forandre hele dette settet av repeterende hendelser?", section_recurring: "Repeter hendelsen", button_recurring: "Av", button_recurring_open: "På", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ukentlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "Alle hverdager", repeat_week: " Gjentas hver", repeat_text_week_count: "uke på:", repeat_radio_month_type: "På hver", repeat_radio_month_start: "På", repeat_text_month_day: "dag hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "på", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen sluttdato", repeat_text_occurrences_count: "forekomst", repeat_radio_end3: "Stop den", repeat_radio_end2: "Etter", repeat_never: "Aldri", repeat_daily: "Hver dag", repeat_workdays: "Hver ukedag", repeat_weekly: "Hver uke", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Tilpasset", repeat_freq_day: "Dag", repeat_freq_week: "Uke", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Sondag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, nl: { date: { month_full: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"], day_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"] }, labels: { dhx_cal_today_button: "Vandaag", day_tab: "Dag", week_tab: "Week", month_tab: "Maand", new_event: "Nieuw item", icon_save: "Opslaan", icon_cancel: "Annuleren", icon_details: "Details", icon_edit: "Bewerken", icon_delete: "Verwijderen", confirm_closing: "", confirm_deleting: "Item zal permanent worden verwijderd, doorgaan?", section_description: "Beschrijving", section_time: "Tijd periode", full_day: "Hele dag", confirm_recurring: "Wilt u alle terugkerende items bijwerken?", section_recurring: "Item herhalen", button_recurring: "Uit", button_recurring_open: "Aan", button_edit_series: "Bewerk de serie", button_edit_occurrence: "Bewerk een kopie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Datum", description: "Omschrijving", year_tab: "Jaar", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagelijks", repeat_radio_week: "Wekelijks", repeat_radio_month: "Maandelijks", repeat_radio_year: "Jaarlijks", repeat_radio_day_type: "Elke", repeat_text_day_count: "dag(en)", repeat_radio_day_type2: "Elke werkdag", repeat_week: " Herhaal elke", repeat_text_week_count: "week op de volgende dagen:", repeat_radio_month_type: "Herhaal", repeat_radio_month_start: "Op", repeat_text_month_day: "dag iedere", repeat_text_month_count: "maanden", repeat_text_month_count2_before: "iedere", repeat_text_month_count2_after: "maanden", repeat_year_label: "Op", select_year_day2: "van", repeat_text_year_day: "dag", select_year_month: "maand", repeat_radio_end: "Geen eind datum", repeat_text_occurrences_count: "keren", repeat_radio_end3: "Eindigd per", repeat_radio_end2: "Na", repeat_never: "Nooit", repeat_daily: "Elke dag", repeat_workdays: "Elke werkdag", repeat_weekly: "Elke week", repeat_monthly: "Elke maand", repeat_yearly: "Elk jaar", repeat_custom: "Aangepast", repeat_freq_day: "Dag", repeat_freq_week: "Week", repeat_freq_month: "Maand", repeat_freq_year: "Jaar", repeat_on_date: "Op datum", repeat_ends: "Eindigt", month_for_recurring: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], day_for_recurring: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"] } }, no: { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Endre", icon_delete: "Slett", confirm_closing: "Endringer blir ikke lagret, er du sikker?", confirm_deleting: "Oppføringen vil bli slettet, er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", full_day: "Full dag", confirm_recurring: "Vil du endre hele settet med repeterende oppføringer?", section_recurring: "Repeterende oppføring", button_recurring: "Ikke aktiv", button_recurring_open: "Aktiv", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ukentlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "Hver arbeidsdag", repeat_week: " Gjenta hver", repeat_text_week_count: "uke neste dager:", repeat_radio_month_type: "Gjenta", repeat_radio_month_start: "På", repeat_text_month_day: "dag hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "På", select_year_day2: "av", repeat_text_year_day: "dag", select_year_month: "måned", repeat_radio_end: "Ingen sluttdato", repeat_text_occurrences_count: "forekomster", repeat_radio_end2: "Etter", repeat_radio_end3: "Slutt innen", repeat_never: "Aldri", repeat_daily: "Hver dag", repeat_workdays: "Hver ukedag", repeat_weekly: "Hver uke", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Tilpasset", repeat_freq_day: "Dag", repeat_freq_week: "Uke", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, pl: { date: { month_full: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"], month_short: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"], day_full: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"], day_short: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"] }, labels: { dhx_cal_today_button: "Dziś", day_tab: "Dzień", week_tab: "Tydzień", month_tab: "Miesiąc", new_event: "Nowe zdarzenie", icon_save: "Zapisz", icon_cancel: "Anuluj", icon_details: "Szczegóły", icon_edit: "Edytuj", icon_delete: "Usuń", confirm_closing: "", confirm_deleting: "Zdarzenie zostanie usunięte na zawsze, kontynuować?", section_description: "Opis", section_time: "Okres czasu", full_day: "Cały dzień", confirm_recurring: "Czy chcesz edytować cały zbiór powtarzających się zdarzeń?", section_recurring: "Powtórz zdarzenie", button_recurring: "Nieaktywne", button_recurring_open: "Aktywne", button_edit_series: "Edytuj serię", button_edit_occurrence: "Edytuj kopię", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Opis", year_tab: "Rok", week_agenda_tab: "Agenda", grid_tab: "Tabela", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Codziennie", repeat_radio_week: "Co tydzie", repeat_radio_month: "Co miesic", repeat_radio_year: "Co rok", repeat_radio_day_type: "Kadego", repeat_text_day_count: "dnia", repeat_radio_day_type2: "Kadego dnia roboczego", repeat_week: " Powtarzaj kadego", repeat_text_week_count: "tygodnia w dni:", repeat_radio_month_type: "Powtrz", repeat_radio_month_start: "W", repeat_text_month_day: "dnia kadego", repeat_text_month_count: "miesica", repeat_text_month_count2_before: "kadego", repeat_text_month_count2_after: "miesica", repeat_year_label: "W", select_year_day2: "miesica", repeat_text_year_day: "dnia miesica", select_year_month: "", repeat_radio_end: "Bez daty kocowej", repeat_text_occurrences_count: "wystpieniu/ach", repeat_radio_end3: "Zakocz w", repeat_radio_end2: "Po", repeat_never: "Nigdy", repeat_daily: "Codziennie", repeat_workdays: "Każdy dzień roboczy", repeat_weekly: "Co tydzień", repeat_monthly: "Co miesiąc", repeat_yearly: "Co rok", repeat_custom: "Niestandardowy", repeat_freq_day: "Dzień", repeat_freq_week: "Tydzień", repeat_freq_month: "Miesiąc", repeat_freq_year: "Rok", repeat_on_date: "W dniu", repeat_ends: "Kończy się", month_for_recurring: ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Wrzenia", "Padziernka", "Listopada", "Grudnia"], day_for_recurring: ["Niedziela", "Poniedziaek", "Wtorek", "roda", "Czwartek", "Pitek", "Sobota"] } }, pt: { date: { month_full: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], month_short: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], day_full: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"], day_short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"] }, labels: { dhx_cal_today_button: "Hoje", day_tab: "Dia", week_tab: "Semana", month_tab: "Mês", new_event: "Novo evento", icon_save: "Salvar", icon_cancel: "Cancelar", icon_details: "Detalhes", icon_edit: "Editar", icon_delete: "Deletar", confirm_closing: "", confirm_deleting: "Tem certeza que deseja excluir?", section_description: "Descrição", section_time: "Período de tempo", full_day: "Dia inteiro", confirm_recurring: "Deseja editar todos esses eventos repetidos?", section_recurring: "Repetir evento", button_recurring: "Desabilitar", button_recurring_open: "Habilitar", button_edit_series: "Editar a série", button_edit_occurrence: "Editar uma cópia", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Dia", date: "Data", description: "Descrição", year_tab: "Ano", week_agenda_tab: "Dia", grid_tab: "Grade", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diário", repeat_radio_week: "Semanal", repeat_radio_month: "Mensal", repeat_radio_year: "Anual", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia(s)", repeat_radio_day_type2: "Cada trabalho diário", repeat_week: " Repita cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repetir", repeat_radio_month_start: "Em", repeat_text_month_day: "todo dia", repeat_text_month_count: "mês", repeat_text_month_count2_before: "todo", repeat_text_month_count2_after: "mês", repeat_year_label: "Em", select_year_day2: "of", repeat_text_year_day: "dia", select_year_month: "mês", repeat_radio_end: "Sem data final", repeat_text_occurrences_count: "ocorrências", repeat_radio_end3: "Fim", repeat_radio_end2: "Depois", repeat_never: "Nunca", repeat_daily: "Todos os dias", repeat_workdays: "Todos os dias úteis", repeat_weekly: "Toda semana", repeat_monthly: "Todo mês", repeat_yearly: "Todo ano", repeat_custom: "Personalizado", repeat_freq_day: "Dia", repeat_freq_week: "Semana", repeat_freq_month: "Mês", repeat_freq_year: "Ano", repeat_on_date: "Na data", repeat_ends: "Termina", month_for_recurring: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], day_for_recurring: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] } }, ro: { date: { month_full: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "November", "December"], month_short: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"], day_short: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"] }, labels: { dhx_cal_today_button: "Astazi", day_tab: "Zi", week_tab: "Saptamana", month_tab: "Luna", new_event: "Eveniment nou", icon_save: "Salveaza", icon_cancel: "Anuleaza", icon_details: "Detalii", icon_edit: "Editeaza", icon_delete: "Sterge", confirm_closing: "Schimbarile nu vor fi salvate, esti sigur?", confirm_deleting: "Evenimentul va fi sters permanent, esti sigur?", section_description: "Descriere", section_time: "Interval", full_day: "Toata ziua", confirm_recurring: "Vrei sa editezi toata seria de evenimente repetate?", section_recurring: "Repetare", button_recurring: "Dezactivata", button_recurring_open: "Activata", button_edit_series: "Editeaza serie", button_edit_occurrence: "Editeaza doar intrare", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Agenda", date: "Data", description: "Descriere", year_tab: "An", week_agenda_tab: "Agenda", grid_tab: "Lista", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Zilnic", repeat_radio_week: "Saptamanal", repeat_radio_month: "Lunar", repeat_radio_year: "Anual", repeat_radio_day_type: "La fiecare", repeat_text_day_count: "zi(le)", repeat_radio_day_type2: "Fiecare zi lucratoare", repeat_week: " Repeta la fiecare", repeat_text_week_count: "saptamana in urmatoarele zile:", repeat_radio_month_type: "Repeta in", repeat_radio_month_start: "In a", repeat_text_month_day: "zi la fiecare", repeat_text_month_count: "luni", repeat_text_month_count2_before: "la fiecare", repeat_text_month_count2_after: "luni", repeat_year_label: "In", select_year_day2: "a lunii", repeat_text_year_day: "zi a lunii", select_year_month: "", repeat_radio_end: "Fara data de sfarsit", repeat_text_occurrences_count: "evenimente", repeat_radio_end3: "La data", repeat_radio_end2: "Dupa", repeat_never: "Niciodată", repeat_daily: "În fiecare zi", repeat_workdays: "În fiecare zi lucrătoare", repeat_weekly: "În fiecare săptămână", repeat_monthly: "În fiecare lună", repeat_yearly: "În fiecare an", repeat_custom: "Personalizat", repeat_freq_day: "Zi", repeat_freq_week: "Săptămână", repeat_freq_month: "Lună", repeat_freq_year: "An", repeat_on_date: "La data", repeat_ends: "Se termină", month_for_recurring: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"], day_for_recurring: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"] } }, ru: { date: { month_full: ["Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь", "Июль", "Август", "Сентябрь", "Oктябрь", "Ноябрь", "Декабрь"], month_short: ["Янв", "Фев", "Maр", "Aпр", "Maй", "Июн", "Июл", "Aвг", "Сен", "Окт", "Ноя", "Дек"], day_full: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сегодня", day_tab: "День", week_tab: "Неделя", month_tab: "Месяц", new_event: "Новое событие", icon_save: "Сохранить", icon_cancel: "Отменить", icon_details: "Детали", icon_edit: "Изменить", icon_delete: "Удалить", confirm_closing: "", confirm_deleting: "Событие будет удалено безвозвратно, продолжить?", section_description: "Описание", section_time: "Период времени", full_day: "Весь день", confirm_recurring: "Вы хотите изменить всю серию повторяющихся событий?", section_recurring: "Повторение", button_recurring: "Отключено", button_recurring_open: "Включено", button_edit_series: "Редактировать серию", button_edit_occurrence: "Редактировать экземпляр", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Список", date: "Дата", description: "Описание", year_tab: "Год", week_agenda_tab: "Список", grid_tab: "Таблица", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Неделя", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Каждый", repeat_text_day_count: "день", repeat_radio_day_type2: "Каждый рабочий день", repeat_week: " Повторять каждую", repeat_text_week_count: "неделю , в:", repeat_radio_month_type: "Повторять", repeat_radio_month_start: "", repeat_text_month_day: " числа каждый ", repeat_text_month_count: "месяц", repeat_text_month_count2_before: "каждый ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без даты окончания", repeat_text_occurrences_count: "повторений", repeat_radio_end3: "До ", repeat_radio_end2: "", repeat_never: "Никогда", repeat_daily: "Каждый день", repeat_workdays: "Каждый будний день", repeat_weekly: "Каждую неделю", repeat_monthly: "Каждый месяц", repeat_yearly: "Каждый год", repeat_custom: "Настроить", repeat_freq_day: "День", repeat_freq_week: "Неделя", repeat_freq_month: "Месяц", repeat_freq_year: "Год", repeat_on_date: "В дату", repeat_ends: "Заканчивается", month_for_recurring: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"], day_for_recurring: ["Воскресенье", "Понедельник", "Вторник", "Среду", "Четверг", "Пятницу", "Субботу"] } }, si: { date: { month_full: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"], day_short: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"] }, labels: { dhx_cal_today_button: "Danes", day_tab: "Dan", week_tab: "Teden", month_tab: "Mesec", new_event: "Nov dogodek", icon_save: "Shrani", icon_cancel: "Prekliči", icon_details: "Podrobnosti", icon_edit: "Uredi", icon_delete: "Izbriši", confirm_closing: "", confirm_deleting: "Dogodek bo izbrisan. Želite nadaljevati?", section_description: "Opis", section_time: "Časovni okvir", full_day: "Ves dan", confirm_recurring: "Želite urediti celoten set ponavljajočih dogodkov?", section_recurring: "Ponovi dogodek", button_recurring: "Onemogočeno", button_recurring_open: "Omogočeno", button_edit_series: "Edit series", button_edit_occurrence: "Edit occurrence", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Zadeva", date: "Datum", description: "Opis", year_tab: "Leto", week_agenda_tab: "Zadeva", grid_tab: "Miza", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dnevno", repeat_radio_week: "Tedensko", repeat_radio_month: "Mesečno", repeat_radio_year: "Letno", repeat_radio_day_type: "Vsak", repeat_text_day_count: "dan", repeat_radio_day_type2: "Vsak delovni dan", repeat_week: " Ponavljaj vsak", repeat_text_week_count: "teden na naslednje dni:", repeat_radio_month_type: "Ponavljaj", repeat_radio_month_start: "Na", repeat_text_month_day: "dan vsak", repeat_text_month_count: "mesec", repeat_text_month_count2_before: "vsak", repeat_text_month_count2_after: "mesec", repeat_year_label: "Na", select_year_day2: "od", repeat_text_year_day: "dan", select_year_month: "mesec", repeat_radio_end: "Brez končnega datuma", repeat_text_occurrences_count: "pojavitve", repeat_radio_end2: "Po", repeat_radio_end3: "Končaj do", repeat_never: "Nikoli", repeat_daily: "Vsak dan", repeat_workdays: "Vsak delovni dan", repeat_weekly: "Vsak teden", repeat_monthly: "Vsak mesec", repeat_yearly: "Vsako leto", repeat_custom: "Po meri", repeat_freq_day: "Dan", repeat_freq_week: "Teden", repeat_freq_month: "Mesec", repeat_freq_year: "Leto", repeat_on_date: "Na datum", repeat_ends: "Konča se", month_for_recurring: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], day_for_recurring: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"] } }, sk: { date: { month_full: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sept", "Okt", "Nov", "Dec"], day_full: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"], day_short: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Deň", week_tab: "Týždeň", month_tab: "Mesiac", new_event: "Nová udalosť", icon_save: "Uložiť", icon_cancel: "Späť", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Zmazať", confirm_closing: "Vaše zmeny nebudú uložené. Skutočne?", confirm_deleting: "Udalosť bude natrvalo vymazaná. Skutočne?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Prajete si upraviť celú radu opakovaných udalostí?", section_recurring: "Opakovanie udalosti", button_recurring: "Vypnuté", button_recurring_open: "Zapnuté", button_edit_series: "Upraviť opakovania", button_edit_occurrence: "Upraviť inštancie", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Program", date: "Dátum", description: "Poznámka", year_tab: "Rok", full_day: "Celý deň", week_agenda_tab: "Program", grid_tab: "Mriežka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denne", repeat_radio_week: "Týždenne", repeat_radio_month: "Mesaène", repeat_radio_year: "Roène", repeat_radio_day_type: "Každý", repeat_text_day_count: "deò", repeat_radio_day_type2: "Každý prac. deò", repeat_week: "Opakova každý", repeat_text_week_count: "týždeò v dòoch:", repeat_radio_month_type: "Opakova", repeat_radio_month_start: "On", repeat_text_month_day: "deò každý", repeat_text_month_count: "mesiac", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "mesiac", repeat_year_label: "On", select_year_day2: "poèas", repeat_text_year_day: "deò", select_year_month: "mesiac", repeat_radio_end: "Bez dátumu ukonèenia", repeat_text_occurrences_count: "udalostiach", repeat_radio_end3: "Ukonèi", repeat_radio_end2: "Po", repeat_never: "Nikdy", repeat_daily: "Každý deň", repeat_workdays: "Každý pracovný deň", repeat_weekly: "Každý týždeň", repeat_monthly: "Každý mesiac", repeat_yearly: "Každý rok", repeat_custom: "Vlastné", repeat_freq_day: "Deň", repeat_freq_week: "Týždeň", repeat_freq_month: "Mesiac", repeat_freq_year: "Rok", repeat_on_date: "Na dátum", repeat_ends: "Koniec", month_for_recurring: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], day_for_recurring: ["Nede¾a", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"] } }, sv: { date: { month_full: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"], day_short: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Vecka", month_tab: "Månad", new_event: "Ny händelse", icon_save: "Spara", icon_cancel: "Ångra", icon_details: "Detaljer", icon_edit: "Ändra", icon_delete: "Ta bort", confirm_closing: "", confirm_deleting: "Är du säker på att du vill ta bort händelsen permanent?", section_description: "Beskrivning", section_time: "Tid", full_day: "Hela dagen", confirm_recurring: "Vill du redigera hela serien med repeterande händelser?", section_recurring: "Upprepa händelse", button_recurring: "Inaktiverat", button_recurring_open: "Aktiverat", button_edit_series: "Redigera serien", button_edit_occurrence: "Redigera en kopia", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Dagordning", date: "Datum", description: "Beskrivning", year_tab: "År", week_agenda_tab: "Dagordning", grid_tab: "Galler", drag_to_create: "Dra för att skapa ny", drag_to_move: "Dra för att flytta", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagligen", repeat_radio_week: "Veckovis", repeat_radio_month: "Månadsvis", repeat_radio_year: "Årligen", repeat_radio_day_type: "Var", repeat_text_day_count: "dag", repeat_radio_day_type2: "Varje arbetsdag", repeat_week: " Upprepa var", repeat_text_week_count: "vecka dessa dagar:", repeat_radio_month_type: "Upprepa", repeat_radio_month_start: "Den", repeat_text_month_day: "dagen var", repeat_text_month_count: "månad", repeat_text_month_count2_before: "var", repeat_text_month_count2_after: "månad", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "månad", repeat_radio_end: "Inget slutdatum", repeat_text_occurrences_count: "upprepningar", repeat_radio_end3: "Sluta efter", repeat_radio_end2: "Efter", repeat_never: "Aldrig", repeat_daily: "Varje dag", repeat_workdays: "Varje vardag", repeat_weekly: "Varje vecka", repeat_monthly: "Varje månad", repeat_yearly: "Varje år", repeat_custom: "Anpassad", repeat_freq_day: "Dag", repeat_freq_week: "Vecka", repeat_freq_month: "Månad", repeat_freq_year: "År", repeat_on_date: "På datum", repeat_ends: "Slutar", month_for_recurring: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], day_for_recurring: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"] } }, tr: { date: { month_full: ["Ocak", "Þubat", "Mart", "Nisan", "Mayýs", "Haziran", "Temmuz", "Aðustos", "Eylül", "Ekim", "Kasým", "Aralýk"], month_short: ["Oca", "Þub", "Mar", "Nis", "May", "Haz", "Tem", "Aðu", "Eyl", "Eki", "Kas", "Ara"], day_full: ["Pazar", "Pazartes,", "Salý", "Çarþamba", "Perþembe", "Cuma", "Cumartesi"], day_short: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"] }, labels: { dhx_cal_today_button: "Bugün", day_tab: "Gün", week_tab: "Hafta", month_tab: "Ay", new_event: "Uygun", icon_save: "Kaydet", icon_cancel: "Ýptal", icon_details: "Detaylar", icon_edit: "Düzenle", icon_delete: "Sil", confirm_closing: "", confirm_deleting: "Etkinlik silinecek, devam?", section_description: "Açýklama", section_time: "Zaman aralýðý", full_day: "Tam gün", confirm_recurring: "Tüm tekrar eden etkinlikler silinecek, devam?", section_recurring: "Etkinliði tekrarla", button_recurring: "Pasif", button_recurring_open: "Aktif", button_edit_series: "Dizi düzenleme", button_edit_occurrence: "Bir kopyasını düzenleyin", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Ajanda", date: "Tarih", description: "Açýklama", year_tab: "Yýl", week_agenda_tab: "Ajanda", grid_tab: "Izgara", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Günlük", repeat_radio_week: "Haftalık", repeat_radio_month: "Aylık", repeat_radio_year: "Yıllık", repeat_radio_day_type: "Her", repeat_text_day_count: "gün", repeat_radio_day_type2: "Her iş günü", repeat_week: " Tekrar her", repeat_text_week_count: "hafta şu günlerde:", repeat_radio_month_type: "Tekrar et", repeat_radio_month_start: "Tarihinde", repeat_text_month_day: "gün her", repeat_text_month_count: "ay", repeat_text_month_count2_before: "her", repeat_text_month_count2_after: "ay", repeat_year_label: "Tarihinde", select_year_day2: "ayın", repeat_text_year_day: "günü", select_year_month: "ay", repeat_radio_end: "Bitiş tarihi yok", repeat_text_occurrences_count: "olay", repeat_radio_end2: "Sonra", repeat_radio_end3: "Tarihinde bitir", repeat_never: "Asla", repeat_daily: "Her gün", repeat_workdays: "Her iş günü", repeat_weekly: "Her hafta", repeat_monthly: "Her ay", repeat_yearly: "Her yıl", repeat_custom: "Özel", repeat_freq_day: "Gün", repeat_freq_week: "Hafta", repeat_freq_month: "Ay", repeat_freq_year: "Yıl", repeat_on_date: "Tarihinde", repeat_ends: "Biter", month_for_recurring: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"], day_for_recurring: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"] } }, ua: { date: { month_full: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"], month_short: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"], day_full: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"], day_short: ["Нед", "Пон", "Вів", "Сер", "Чет", "Птн", "Суб"] }, labels: { dhx_cal_today_button: "Сьогодні", day_tab: "День", week_tab: "Тиждень", month_tab: "Місяць", new_event: "Нова подія", icon_save: "Зберегти", icon_cancel: "Відміна", icon_details: "Деталі", icon_edit: "Редагувати", icon_delete: "Вилучити", confirm_closing: "", confirm_deleting: "Подія вилучиться назавжди. Ви впевнені?", section_description: "Опис", section_time: "Часовий проміжок", full_day: "Весь день", confirm_recurring: "Хочете редагувати весь перелік повторюваних подій?", section_recurring: "Повторювана подія", button_recurring: "Відключено", button_recurring_open: "Включено", button_edit_series: "Редагувати серію", button_edit_occurrence: "Редагувати примірник", button_edit_occurrence_and_following: "This and following events", agenda_tab: "Перелік", date: "Дата", description: "Опис", year_tab: "Рік", week_agenda_tab: "Перелік", grid_tab: "Таблиця", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Тиждень", repeat_radio_month: "Місяць", repeat_radio_year: "Рік", repeat_radio_day_type: "Кожний", repeat_text_day_count: "день", repeat_radio_day_type2: "Кожний робочий день", repeat_week: " Повторювати кожен", repeat_text_week_count: "тиждень , по:", repeat_radio_month_type: "Повторювати", repeat_radio_month_start: "", repeat_text_month_day: " числа кожний ", repeat_text_month_count: "місяць", repeat_text_month_count2_before: "кожен ", repeat_text_month_count2_after: "місяць", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без дати закінчення", repeat_text_occurrences_count: "повторень", repeat_radio_end3: "До ", repeat_radio_end2: "", repeat_never: "Ніколи", repeat_daily: "Щодня", repeat_workdays: "Щодня в робочі дні", repeat_weekly: "Щотижня", repeat_monthly: "Щомісяця", repeat_yearly: "Щороку", repeat_custom: "Налаштоване", repeat_freq_day: "День", repeat_freq_week: "Тиждень", repeat_freq_month: "Місяць", repeat_freq_year: "Рік", repeat_on_date: "На дату", repeat_ends: "Закінчується", month_for_recurring: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"], day_for_recurring: ["Неділям", "Понеділкам", "Вівторкам", "Середам", "Четвергам", "П'ятницям", "Суботам"] } } }, Symbol.toStringTag, { value: "Module" }));
class la {
  constructor(o, t, n = {}) {
    this.state = { date: /* @__PURE__ */ new Date(), modes: ["days", "months", "years"], currentRange: [], eventDates: [], filterDays: null, currentModeIndex: 0, ...n }, this.container = null, this.element = null, this.onStateChangeHandlers = [], this.scheduler = o, this._domEvents = o._createDomEventScope(), this.state = this.getState(), Ue(this), t && (this.container = t, this.render(this.container)), this.onStateChange((d, a) => {
      this.callEvent("onStateChange", [a, d]);
    });
  }
  getState() {
    return { ...this.state, mode: this.state.modes[this.state.currentModeIndex] };
  }
  setState(o) {
    const t = { ...this.state };
    o.mode && (o.currentModeIndex = this.state.modes.indexOf(o.mode)), this.state = { ...this.state, ...o }, this._notifyStateChange(t, this.state), this.container && this.render(this.container);
  }
  onStateChange(o) {
    return this.onStateChangeHandlers.push(o), () => {
      const t = this.onStateChangeHandlers.indexOf(o);
      t !== -1 && this.onStateChangeHandlers.splice(t, 1);
    };
  }
  _notifyStateChange(o, t) {
    this.onStateChangeHandlers.forEach((n) => n(o, t));
  }
  _adjustDate(o) {
    const { mode: t, date: n } = this.getState(), d = new Date(n);
    t === "days" ? d.setMonth(n.getMonth() + o) : t === "months" ? d.setFullYear(n.getFullYear() + o) : d.setFullYear(n.getFullYear() + 10 * o), this.setState({ date: d });
  }
  _toggleMode() {
    const o = (this.state.currentModeIndex + 1) % this.state.modes.length;
    this.setState({ currentModeIndex: o });
  }
  _renderCalendarHeader(o) {
    const { mode: t, date: n } = this.getState(), d = document.createElement("div");
    d.classList.add("dhx_cal_datepicker_header");
    const a = document.createElement("button");
    a.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_left"), d.appendChild(a);
    const s = document.createElement("div");
    if (s.classList.add("dhx_cal_datepicker_title"), t === "days")
      s.innerText = n.toLocaleString("default", { month: "long" }) + " " + n.getFullYear();
    else if (t === "months")
      s.innerText = n.getFullYear();
    else {
      const r = 10 * Math.floor(n.getFullYear() / 10);
      s.innerText = `${r} - ${r + 9}`;
    }
    this._domEvents.attach(s, "click", this._toggleMode.bind(this)), d.appendChild(s);
    const i = document.createElement("button");
    i.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_right"), d.appendChild(i), o.appendChild(d), this._domEvents.attach(a, "click", this._adjustDate.bind(this, -1)), this._domEvents.attach(i, "click", this._adjustDate.bind(this, 1));
  }
  render(o) {
    this._domEvents.detachAll(), this.container = o || this.container, this.container.innerHTML = "", this.element || (this.element = document.createElement("div"), this.element.classList.add("dhx_cal_datepicker")), this.element.innerHTML = "", this.container.appendChild(this.element), this._renderCalendarHeader(this.element);
    const t = document.createElement("div");
    t.classList.add("dhx_cal_datepicker_data"), this.element.appendChild(t);
    const { mode: n } = this.getState();
    n === "days" ? this._renderDayGrid(t) : n === "months" ? this._renderMonthGrid(t) : this._renderYearGrid(t);
  }
  _renderDayGridHeader(o) {
    const { date: t, filterDays: n } = this.getState(), d = this.scheduler;
    let a = d.date.week_start(new Date(t));
    const s = d.date.add(d.date.week_start(new Date(t)), 1, "week");
    o.classList.add("dhx_cal_datepicker_days");
    const i = d.date.date_to_str("%D");
    for (; a.valueOf() < s.valueOf(); ) {
      if (!n || !n(a)) {
        const r = i(a), l = document.createElement("div");
        l.setAttribute("data-day", a.getDay()), l.classList.add("dhx_cal_datepicker_dayname"), l.innerText = r, o.appendChild(l);
      }
      a = d.date.add(a, 1, "day");
    }
  }
  _weeksBetween(o, t) {
    const n = this.scheduler;
    let d = 0, a = new Date(o);
    for (; a.valueOf() < t.valueOf(); )
      d += 1, a = n.date.week_start(n.date.add(a, 1, "week"));
    return d;
  }
  _renderDayGrid(o) {
    const { date: t, currentRange: n, eventDates: d, minWeeks: a, filterDays: s } = this.getState();
    let i = n[0], r = n[1];
    const l = d.reduce((N, E) => (N[this.scheduler.date.day_start(new Date(E)).valueOf()] = !0, N), {}), _ = document.createElement("div");
    this._renderDayGridHeader(_);
    const c = _.children.length;
    o.appendChild(_), c !== 7 && o.style.setProperty("--dhx-scheduler-week-length", c);
    const h = this.scheduler, p = h.date.week_start(h.date.month_start(new Date(t))), f = h.date.month_start(new Date(t)), u = h.date.add(h.date.month_start(new Date(t)), 1, "month");
    let v = h.date.add(h.date.month_start(new Date(t)), 1, "month");
    const m = h.date.date_part(h._currentDate());
    if (v.getDay() !== 0 && h.config.start_on_monday) {
      const N = (7 - v.getDay()) % 7;
      v = h.date.add(v, N + 1, "day");
    } else
      v = h.date.add(h.date.week_start(v), 1, "week");
    let x = this._weeksBetween(p, v);
    a && x < a && (v = h.date.add(v, a - x, "week"));
    let w = p;
    const S = document.createElement("div");
    for (S.classList.add("dhx_cal_datepicker_days"), this._domEvents.attach(S, "click", (N) => {
      const E = N.target.closest("[data-cell-date]"), T = new Date(E.getAttribute("data-cell-date"));
      this.callEvent("onDateClick", [T, N]);
    }); w.valueOf() < v.valueOf(); ) {
      if (!s || !s(w)) {
        const N = document.createElement("div");
        N.setAttribute("data-cell-date", h.templates.format_date(w)), N.setAttribute("data-day", w.getDay()), N.innerHTML = h.templates.month_day(w), w.valueOf() < f.valueOf() ? N.classList.add("dhx_before") : w.valueOf() >= u.valueOf() && N.classList.add("dhx_after"), w.getDay() !== 0 && w.getDay() !== 6 || N.classList.add("dhx_cal_datepicker_weekend"), w.valueOf() == m.valueOf() && N.classList.add("dhx_now"), i && r && w.valueOf() >= i.valueOf() && w.valueOf() < r.valueOf() && N.classList.add("dhx_cal_datepicker_current"), l[w.valueOf()] && N.classList.add("dhx_cal_datepicker_event"), N.classList.add("dhx_cal_datepicker_date"), S.appendChild(N);
      }
      w = h.date.add(w, 1, "day");
    }
    o.appendChild(S);
  }
  _renderMonthGrid(o) {
    const { date: t } = this.getState(), n = document.createElement("div");
    n.classList.add("dhx_cal_datepicker_months");
    const d = [];
    for (let r = 0; r < 12; r++)
      d.push(new Date(t.getFullYear(), r, 1));
    const a = this.scheduler.date.date_to_str("%M");
    d.forEach((r) => {
      const l = document.createElement("div");
      l.classList.add("dhx_cal_datepicker_month"), t.getMonth() === r.getMonth() && l.classList.add("dhx_cal_datepicker_current"), l.setAttribute("data-month", r.getMonth()), l.innerHTML = a(r), this._domEvents.attach(l, "click", () => {
        const _ = new Date(r);
        this.setState({ date: _, mode: "days" });
      }), n.appendChild(l);
    }), o.appendChild(n);
    const s = document.createElement("div");
    s.classList.add("dhx_cal_datepicker_done");
    const i = document.createElement("button");
    i.innerText = "Done", i.classList.add("dhx_cal_datepicker_done_btn"), this._domEvents.attach(i, "click", () => {
      this.setState({ mode: "days" });
    }), s.appendChild(i), o.appendChild(s);
  }
  _renderYearGrid(o) {
    const { date: t } = this.getState(), n = 10 * Math.floor(t.getFullYear() / 10), d = document.createElement("div");
    d.classList.add("dhx_cal_datepicker_years");
    for (let i = n - 1; i <= n + 10; i++) {
      const r = document.createElement("div");
      r.innerText = i, r.classList.add("dhx_cal_datepicker_year"), r.setAttribute("data-year", i), t.getFullYear() === i && r.classList.add("dhx_cal_datepicker_current"), this._domEvents.attach(r, "click", () => {
        this.setState({ date: new Date(i, t.getMonth(), 1), mode: "months" });
      }), d.appendChild(r);
    }
    o.appendChild(d);
    const a = document.createElement("div");
    a.classList.add("dhx_cal_datepicker_done");
    const s = document.createElement("button");
    s.innerText = "Done", s.classList.add("dhx_cal_datepicker_done_btn"), this._domEvents.attach(s, "click", () => {
      this.setState({ mode: "months" });
    }), a.appendChild(s), o.appendChild(a);
  }
  destructor() {
    this.onStateChangeHandlers = [], this.element && (this.element.innerHTML = "", this.element.remove()), this._domEvents.detachAll(), this.callEvent("onDestroy", []), this.detachAllEvents(), this.scheduler = null;
  }
}
function ca(e) {
  const o = { version: "7.2.16" };
  o.$stateProvider = function() {
    const r = {};
    return { getState: function(l) {
      if (r[l])
        return r[l].method();
      {
        const _ = {};
        for (const c in r)
          r[c].internal || ae.mixin(_, r[c].method(), !0);
        return _;
      }
    }, registerProvider: function(l, _, c) {
      r[l] = { method: _, internal: c };
    }, unregisterProvider: function(l) {
      delete r[l];
    } };
  }(), o.getState = o.$stateProvider.getState, function(r) {
    var l = { agenda: "https://docs.dhtmlx.com/scheduler/agenda_view.html", grid: "https://docs.dhtmlx.com/scheduler/grid_view.html", map: "https://docs.dhtmlx.com/scheduler/map_view.html", unit: "https://docs.dhtmlx.com/scheduler/units_view.html", timeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html", week_agenda: "https://docs.dhtmlx.com/scheduler/weekagenda_view.html", year: "https://docs.dhtmlx.com/scheduler/year_view.html", anythingElse: "https://docs.dhtmlx.com/scheduler/views.html" }, _ = { agenda: "scheduler.plugins({ agenda_view: true })", grid: "scheduler.plugins({ grid_view: true })", map: "scheduler.plugins({ map_view: true })", unit: "scheduler.plugins({ units: true })", timeline: "scheduler.plugins({ timeline: true, treetimeline: true, daytimeline: true})", week_agenda: "scheduler.plugins({ week_agenda: true })", year: "scheduler.plugins({ year_view: true })", limit: "scheduler.plugins({ limit: true })" };
    r._commonErrorMessages = { unknownView: function(c) {
      var h = _[c] ? "You're probably missing " + _[c] + "." : "";
      return "`" + c + "` view is not defined. \nPlease check parameters you pass to `scheduler.init` or `scheduler.setCurrentView` in your code and ensure you've imported appropriate extensions. \nRelated docs: " + (l[c] || l.anythingElse) + `
` + (h ? h + `
` : "");
    }, collapsedContainer: function(c) {
      return `Scheduler container height is set to *100%* but the rendered height is zero and the scheduler is not visible. 
Make sure that the container has some initial height or use different units. For example:
<div id='scheduler_here' class='dhx_cal_container' style='width:100%; height:600px;'> 
`;
    } }, r.createTimelineView = function() {
      throw new Error("scheduler.createTimelineView is not implemented. Be sure to add the required extension: " + _.timeline + `
Related docs: ` + l.timeline);
    }, r.createUnitsView = function() {
      throw new Error("scheduler.createUnitsView is not implemented. Be sure to add the required extension: " + _.unit + `
Related docs: ` + l.unit);
    }, r.createGridView = function() {
      throw new Error("scheduler.createGridView is not implemented. Be sure to add the required extension: " + _.grid + `
Related docs: ` + l.grid);
    }, r.addMarkedTimespan = function() {
      throw new Error(`scheduler.addMarkedTimespan is not implemented. Be sure to add the required extension: scheduler.plugins({ limit: true })
Related docs: https://docs.dhtmlx.com/scheduler/limits.html`);
    }, r.renderCalendar = function() {
      throw new Error(`scheduler.renderCalendar is not implemented. Be sure to add the required extension: scheduler.plugins({ minical: true })
https://docs.dhtmlx.com/scheduler/minicalendar.html`);
    }, r.exportToPNG = function() {
      throw new Error(["scheduler.exportToPNG is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/png.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join(`
`));
    }, r.exportToPDF = function() {
      throw new Error(["scheduler.exportToPDF is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/pdf.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join(`
`));
    };
  }(o), Jt(o), Ft(o), function(r) {
    (function() {
      var l = new RegExp(`<(?:.|
)*?>`, "gm"), _ = new RegExp(" +", "gm");
      function c(u) {
        return (u + "").replace(l, " ").replace(_, " ");
      }
      var h = new RegExp("'", "gm");
      function p(u) {
        return (u + "").replace(h, "&#39;");
      }
      for (var f in r._waiAria = { getAttributeString: function(u) {
        var v = [" "];
        for (var m in u)
          if (typeof u[m] != "function" && typeof u[m] != "object") {
            var x = p(c(u[m]));
            v.push(m + "='" + x + "'");
          }
        return v.push(" "), v.join(" ");
      }, setAttributes: function(u, v) {
        for (var m in v)
          u.setAttribute(m, c(v[m]));
        return u;
      }, labelAttr: function(u, v) {
        return this.setAttributes(u, { "aria-label": v });
      }, label: function(u) {
        return r._waiAria.getAttributeString({ "aria-label": u });
      }, hourScaleAttr: function(u, v) {
        this.labelAttr(u, v);
      }, monthCellAttr: function(u, v) {
        this.labelAttr(u, r.templates.day_date(v));
      }, navBarDateAttr: function(u, v) {
        this.labelAttr(u, v);
      }, dayHeaderAttr: function(u, v) {
        this.labelAttr(u, v);
      }, dayColumnAttr: function(u, v) {
        this.dayHeaderAttr(u, r.templates.day_date(v));
      }, headerButtonsAttributes: function(u, v) {
        return this.setAttributes(u, { role: "button", "aria-label": v });
      }, headerToggleState: function(u, v) {
        return this.setAttributes(u, { "aria-pressed": v ? "true" : "false" });
      }, getHeaderCellAttr: function(u) {
        return r._waiAria.getAttributeString({ "aria-label": u });
      }, eventAttr: function(u, v) {
        this._eventCommonAttr(u, v);
      }, _eventCommonAttr: function(u, v) {
        v.setAttribute("aria-label", c(r.templates.event_text(u.start_date, u.end_date, u))), r.config.readonly && v.setAttribute("aria-readonly", !0), u.$dataprocessor_class && v.setAttribute("aria-busy", !0), v.setAttribute("aria-selected", r.getState().select_id == u.id ? "true" : "false");
      }, setEventBarAttr: function(u, v) {
        this._eventCommonAttr(u, v);
      }, _getAttributes: function(u, v) {
        var m = { setAttribute: function(x, w) {
          this[x] = w;
        } };
        return u.apply(this, [v, m]), m;
      }, eventBarAttrString: function(u) {
        return this.getAttributeString(this._getAttributes(this.setEventBarAttr, u));
      }, agendaHeadAttrString: function() {
        return this.getAttributeString({ role: "row" });
      }, agendaHeadDateString: function(u) {
        return this.getAttributeString({ role: "columnheader", "aria-label": u });
      }, agendaHeadDescriptionString: function(u) {
        return this.agendaHeadDateString(u);
      }, agendaDataAttrString: function() {
        return this.getAttributeString({ role: "grid" });
      }, agendaEventAttrString: function(u) {
        var v = this._getAttributes(this._eventCommonAttr, u);
        return v.role = "row", this.getAttributeString(v);
      }, agendaDetailsBtnString: function() {
        return this.getAttributeString({ role: "button", "aria-label": r.locale.labels.icon_details });
      }, gridAttrString: function() {
        return this.getAttributeString({ role: "grid" });
      }, gridRowAttrString: function(u) {
        return this.agendaEventAttrString(u);
      }, gridCellAttrString: function(u, v, m) {
        return this.getAttributeString({ role: "gridcell", "aria-label": [v.label === void 0 ? v.id : v.label, ": ", m] });
      }, mapAttrString: function() {
        return this.gridAttrString();
      }, mapRowAttrString: function(u) {
        return this.gridRowAttrString(u);
      }, mapDetailsBtnString: function() {
        return this.agendaDetailsBtnString();
      }, minicalHeader: function(u, v) {
        this.setAttributes(u, { id: v + "", "aria-live": "assertice", "aria-atomic": "true" });
      }, minicalGrid: function(u, v) {
        this.setAttributes(u, { "aria-labelledby": v + "", role: "grid" });
      }, minicalRow: function(u) {
        this.setAttributes(u, { role: "row" });
      }, minicalDayCell: function(u, v) {
        var m = v.valueOf() < r._max_date.valueOf() && v.valueOf() >= r._min_date.valueOf();
        this.setAttributes(u, { role: "gridcell", "aria-label": r.templates.day_date(v), "aria-selected": m ? "true" : "false" });
      }, minicalHeadCell: function(u) {
        this.setAttributes(u, { role: "columnheader" });
      }, weekAgendaDayCell: function(u, v) {
        var m = u.querySelector(".dhx_wa_scale_bar"), x = u.querySelector(".dhx_wa_day_data"), w = r.uid() + "";
        this.setAttributes(m, { id: w }), this.setAttributes(x, { "aria-labelledby": w });
      }, weekAgendaEvent: function(u, v) {
        this.eventAttr(v, u);
      }, lightboxHiddenAttr: function(u) {
        u.setAttribute("aria-hidden", "true");
      }, lightboxVisibleAttr: function(u) {
        u.setAttribute("aria-hidden", "false");
      }, lightboxSectionButtonAttrString: function(u) {
        return this.getAttributeString({ role: "button", "aria-label": u, tabindex: "0" });
      }, yearHeader: function(u, v) {
        this.setAttributes(u, { id: v + "" });
      }, yearGrid: function(u, v) {
        this.minicalGrid(u, v);
      }, yearHeadCell: function(u) {
        return this.minicalHeadCell(u);
      }, yearRow: function(u) {
        return this.minicalRow(u);
      }, yearDayCell: function(u) {
        this.setAttributes(u, { role: "gridcell" });
      }, lightboxAttr: function(u) {
        u.setAttribute("role", "dialog"), u.setAttribute("aria-hidden", "true"), u.firstChild.setAttribute("role", "heading");
      }, lightboxButtonAttrString: function(u) {
        return this.getAttributeString({ role: "button", "aria-label": r.locale.labels[u], tabindex: "0" });
      }, eventMenuAttrString: function(u) {
        return this.getAttributeString({ role: "button", "aria-label": r.locale.labels[u] });
      }, lightboxHeader: function(u, v) {
        u.setAttribute("aria-label", v);
      }, lightboxSelectAttrString: function(u) {
        var v = "";
        switch (u) {
          case "%Y":
            v = r.locale.labels.year;
            break;
          case "%m":
            v = r.locale.labels.month;
            break;
          case "%d":
            v = r.locale.labels.day;
            break;
          case "%H:%i":
            v = r.locale.labels.hour + " " + r.locale.labels.minute;
        }
        return r._waiAria.getAttributeString({ "aria-label": v });
      }, messageButtonAttrString: function(u) {
        return "tabindex='0' role='button' aria-label='" + u + "'";
      }, messageInfoAttr: function(u) {
        u.setAttribute("role", "alert");
      }, messageModalAttr: function(u, v) {
        u.setAttribute("role", "dialog"), v && u.setAttribute("aria-labelledby", v);
      }, quickInfoAttr: function(u) {
        u.setAttribute("role", "dialog");
      }, quickInfoHeaderAttrString: function() {
        return " role='heading' ";
      }, quickInfoHeader: function(u, v) {
        u.setAttribute("aria-label", v);
      }, quickInfoButtonAttrString: function(u) {
        return r._waiAria.getAttributeString({ role: "button", "aria-label": u, tabindex: "0" });
      }, tooltipAttr: function(u) {
        u.setAttribute("role", "tooltip");
      }, tooltipVisibleAttr: function(u) {
        u.setAttribute("aria-hidden", "false");
      }, tooltipHiddenAttr: function(u) {
        u.setAttribute("aria-hidden", "true");
      } }, r._waiAria)
        r._waiAria[f] = function(u) {
          return function() {
            return r.config.wai_aria_attributes ? u.apply(this, arguments) : " ";
          };
        }(r._waiAria[f]);
    })();
  }(o), o.utils = ae, o.$domHelpers = he, o.utils.dom = he, o.uid = ae.uid, o.mixin = ae.mixin, o.defined = ae.defined, o.assert = function(r) {
    return function(l, _) {
      l || r.config.show_errors && r.callEvent("onError", [_]) !== !1 && (r.message ? r.message({ type: "error", text: _, expire: -1 }) : console.log(_));
    };
  }(o), o.copy = ae.copy, o._createDatePicker = function(r, l) {
    return new la(o, r, l);
  }, o._getFocusableNodes = he.getFocusableNodes, o._getClassName = he.getClassName, o._locate_css = he.locateCss;
  const t = sa(o);
  var n, d, a;
  o.utils.mixin(o, t), o.env = o.$env = Zt, o.Promise = Promise, function(r) {
    r.destructor = function() {
      for (var l in r.callEvent("onDestroy", []), this.clearAll(), this.$container && (this.$container.innerHTML = "", this.$container.classList.remove(`dhx_scheduler_${this._mode}`)), this._eventRemoveAll && this._eventRemoveAll(), this.resetLightbox && this.resetLightbox(), this._dp && this._dp.destructor && this._dp.destructor(), this.detachAllEvents(), this)
        l.indexOf("$") === 0 && delete this[l];
      r.$destroyed = !0;
    };
  }(o), function(r) {
    r.Promise = typeof window < "u" ? window.Promise : Promise;
    const l = { cache: !0, method: "get", serializeRequestParams: xt, parse(_) {
      if (typeof _ != "string")
        return _;
      let c;
      const h = _.replace(/^[\s]+/, "");
      return typeof DOMParser > "u" || r.$env.isIE ? typeof window < "u" && window.ActiveXObject !== void 0 && (c = new window.ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(h)) : c = new DOMParser().parseFromString(h, "text/xml"), c || h;
    }, xmltop(_, c, h) {
      if (c.status === void 0 || c.status < 400) {
        const p = c.responseXML ? c.responseXML : this.parse(c.responseText || c);
        if (typeof p != "string" && p.documentElement !== null && !p.getElementsByTagName("parsererror").length)
          return p.getElementsByTagName(_)[0];
      }
      return h !== -1 && r.callEvent("onLoadXMLError", ["Incorrect XML", c, h]), document.createElement("DIV");
    }, xpath(_, c) {
      var u;
      const h = "nodeName" in c ? c : c.responseXML || c;
      if (r.$env.isIE)
        return ((u = h.selectNodes) == null ? void 0 : u.call(h, _)) || [];
      const p = [], f = (h.ownerDocument || h).evaluate(_, h, null, XPathResult.ANY_TYPE, null);
      for (; ; ) {
        const v = f.iterateNext();
        if (!v)
          break;
        p.push(v);
      }
      return p;
    }, query(_) {
      return this._call(_.method || "GET", _.url, String(_.data || ""), _.async ?? !0, _.callback, _.headers);
    }, get(_, c, h) {
      const p = me("GET", arguments);
      return this.query(p);
    }, getSync(_, c) {
      const h = me("GET", arguments);
      return h.async = !1, this.query(h);
    }, put(_, c, h, p) {
      const f = me("PUT", arguments);
      return this.query(f);
    }, del(_, c, h) {
      const p = me("DELETE", arguments);
      return this.query(p);
    }, post(_, c, h, p) {
      let f = c, u = h;
      arguments.length === 1 ? f = "" : arguments.length === 2 && typeof f == "function" && (u = f, f = "");
      const v = me("POST", [_, f, u, p]);
      return this.query(v);
    }, postSync(_, c, h) {
      const p = me("POST", [_, c === null ? "" : String(c), h]);
      return p.async = !1, this.query(p);
    }, _call(_, c, h, p, f, u) {
      return new r.Promise((v) => {
        let m = typeof XMLHttpRequest > "u" || r.$env.isIE ? new window.ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        const x = typeof navigator < "u" ? navigator.userAgent : "", w = x.match(/AppleWebKit/) !== null && x.match(/Qt/) !== null && x.match(/Safari/) !== null;
        p && m.addEventListener("readystatechange", () => {
          if (m.readyState === 4 || w && m.readyState === 3) {
            if ((m.status !== 200 || m.responseText === "") && !r.callEvent("onAjaxError", [m]))
              return;
            setTimeout(() => {
              typeof f == "function" && f.apply(window, [{ xmlDoc: m, filePath: c }]), v(m);
            }, 0);
          }
        });
        let S = c;
        if (_ !== "GET" || this.cache || (S += `${S.indexOf("?") >= 0 ? "&" : "?"}dhxr${Date.now()}=1`), m.open(_, S, p), u)
          for (const N in u)
            m.setRequestHeader(N, u[N]);
        else
          _ === "POST" || _ === "PUT" || _ === "DELETE" ? m.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") : _ === "GET" && (h = null);
        m.setRequestHeader("X-Requested-With", "XMLHttpRequest"), m.send(h), p || v(m);
      });
    }, urlSeparator: (_) => _.indexOf("?") !== -1 ? "&" : "?" };
    r.ajax = l, r.$ajax = r.ajax;
  }(o), Qt(o), function(r) {
    r.config = { default_date: "%j %M %Y", month_date: "%F %Y", load_date: "%Y-%m-%d", week_date: "%l", day_date: "%D %j", hour_date: "%H:%i", month_day: "%d", date_format: "%Y-%m-%d %H:%i", api_date: "%d-%m-%Y %H:%i", parse_exact_format: !1, preserve_length: !0, time_step: 5, displayed_event_color: "#ff4a4a", displayed_event_text_color: "#ffef80", wide_form: 0, day_column_padding: 8, use_select_menu_space: !0, fix_tab_position: !0, start_on_monday: !0, first_hour: 0, last_hour: 24, readonly: !1, drag_resize: !0, drag_move: !0, drag_create: !0, drag_event_body: !0, dblclick_create: !0, details_on_dblclick: !0, edit_on_create: !0, details_on_create: !0, header: null, hour_size_px: 44, resize_month_events: !1, resize_month_timed: !1, responsive_lightbox: !1, separate_short_events: !0, rtl: !1, cascade_event_display: !1, cascade_event_count: 4, cascade_event_margin: 30, multi_day: !0, multi_day_height_limit: 200, drag_lightbox: !0, preserve_scroll: !0, select: !0, undo_deleted: !0, server_utc: !1, touch: !0, touch_tip: !0, touch_drag: 500, touch_swipe_dates: !1, quick_info_detached: !0, positive_closing: !1, drag_highlight: !0, limit_drag_out: !1, icons_edit: ["icon_save", "icon_cancel"], icons_select: ["icon_details", "icon_edit", "icon_delete"], buttons_right: ["dhx_save_btn", "dhx_cancel_btn"], buttons_left: ["dhx_delete_btn"], lightbox: { sections: [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "time", height: 72, type: "time", map_to: "auto" }] }, highlight_displayed_event: !0, left_border: !1, ajax_error: "alert", delay_render: 0, timeline_swap_resize: !0, wai_aria_attributes: !0, wai_aria_application_role: !0, csp: "auto", event_attribute: "data-event-id", show_errors: !0 }, r.config.buttons_left.$initial = r.config.buttons_left.join(), r.config.buttons_right.$initial = r.config.buttons_right.join(), r._helpers = { parseDate: function(l) {
      return (r.templates.xml_date || r.templates.parse_date)(l);
    }, formatDate: function(l) {
      return (r.templates.xml_format || r.templates.format_date)(l);
    } }, r.templates = {}, r.init_templates = function() {
      var l = r.date.date_to_str, _ = r.config;
      (function(c, h) {
        for (var p in h)
          c[p] || (c[p] = h[p]);
      })(r.templates, { day_date: l(_.default_date), month_date: l(_.month_date), week_date: function(c, h) {
        return _.rtl ? r.templates.day_date(r.date.add(h, -1, "day")) + " &ndash; " + r.templates.day_date(c) : r.templates.day_date(c) + " &ndash; " + r.templates.day_date(r.date.add(h, -1, "day"));
      }, day_scale_date: l(_.default_date), time_slot_text: function(c) {
        return "";
      }, time_slot_class: function(c) {
        return "";
      }, month_scale_date: l(_.week_date), week_scale_date: l(_.day_date), hour_scale: l(_.hour_date), time_picker: l(_.hour_date), event_date: l(_.hour_date), month_day: l(_.month_day), load_format: l(_.load_date), format_date: l(_.date_format, _.server_utc), parse_date: r.date.str_to_date(_.date_format, _.server_utc), api_date: r.date.str_to_date(_.api_date, !1, !1), event_header: function(c, h, p) {
        return p._mode === "small" || p._mode === "smallest" ? r.templates.event_date(c) : r.templates.event_date(c) + " - " + r.templates.event_date(h);
      }, event_text: function(c, h, p) {
        return p.text;
      }, event_class: function(c, h, p) {
        return "";
      }, month_date_class: function(c) {
        return "";
      }, week_date_class: function(c) {
        return "";
      }, event_bar_date: function(c, h, p) {
        return r.templates.event_date(c);
      }, event_bar_text: function(c, h, p) {
        return p.text;
      }, month_events_link: function(c, h) {
        return "<a>View more(" + h + " events)</a>";
      }, drag_marker_class: function(c, h, p) {
        return "";
      }, drag_marker_content: function(c, h, p) {
        return "";
      }, tooltip_date_format: r.date.date_to_str("%Y-%m-%d %H:%i"), tooltip_text: function(c, h, p) {
        return "<b>Event:</b> " + p.text + "<br/><b>Start date:</b> " + r.templates.tooltip_date_format(c) + "<br/><b>End date:</b> " + r.templates.tooltip_date_format(h);
      }, calendar_month: l("%F %Y"), calendar_scale_date: l("%D"), calendar_date: l("%d"), calendar_time: l("%d-%m-%Y") }), this.callEvent("onTemplatesReady", []);
    };
  }(o), function(r) {
    const l = ta(r);
    r._events = {}, r.clearAll = function() {
      this._events = {}, this._loaded = {}, this._edit_id = null, this._select_id = null, this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this._new_event = null, this.clear_view(), this.callEvent("onClearAll", []);
    }, r.addEvent = function(_, c, h, p, f) {
      if (!arguments.length)
        return this.addEventNow();
      var u = _;
      arguments.length != 1 && ((u = f || {}).start_date = _, u.end_date = c, u.text = h, u.id = p), u.id = u.id || r.uid(), u.text = u.text || "", typeof u.start_date == "string" && (u.start_date = this.templates.api_date(u.start_date)), typeof u.end_date == "string" && (u.end_date = this.templates.api_date(u.end_date));
      var v = 6e4 * (this.config.event_duration || this.config.time_step);
      new Date(u.end_date).valueOf() - new Date(u.start_date).valueOf() <= v && u.end_date.setTime(u.start_date.valueOf() + v), u.start_date.setTime(u.start_date.valueOf() - u.start_date.getMilliseconds()), u.end_date.setTime(u.end_date.valueOf() - u.end_date.getMilliseconds()), u._timed = this.isOneDayEvent(u);
      var m = !this._events[u.id];
      return this._events[u.id] = u, this.event_updated(u), this._loading || this.callEvent(m ? "onEventAdded" : "onEventChanged", [u.id, u]), u.id;
    }, r.deleteEvent = function(_, c) {
      var h = this._events[_];
      (c || this.callEvent("onBeforeEventDelete", [_, h]) && this.callEvent("onConfirmedBeforeEventDelete", [_, h])) && (h && (r.getState().select_id == _ && r.unselect(), delete this._events[_], this.event_updated(h), this._drag_id == h.id && (this._drag_id = null, this._drag_mode = null, this._drag_pos = null)), this.callEvent("onEventDeleted", [_, h]));
    }, r.getEvent = function(_) {
      return this._events[_];
    }, r.setEvent = function(_, c) {
      c.id || (c.id = _), this._events[_] = c;
    }, r.for_rendered = function(_, c) {
      for (var h = l.lookup(_), p = h.length - 1; p >= 0; p--) {
        var f = this._rendered.indexOf(h[p]);
        f < 0 || c(h[p], f);
      }
    }, r._forget_rendered_event = function(_, c) {
      l.sync();
      var h = c === void 0 || this._rendered[c] !== _ ? this._rendered.indexOf(_) : c;
      return !(h < 0 || (this._rendered.splice(h, 1), l.forget(_), 0));
    }, r.changeEventId = function(_, c) {
      if (_ != c) {
        var h = this._events[_];
        h && (h.id = c, this._events[c] = h, delete this._events[_]), this.for_rendered(_, function(p) {
          p.setAttribute("event_id", c), p.setAttribute(r.config.event_attribute, c);
        }), l.invalidate(), this._select_id == _ && (this._select_id = c), this._edit_id == _ && (this._edit_id = c), this.callEvent("onEventIdChange", [_, c]);
      }
    }, function() {
      for (var _ = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"], c = function(f) {
        return function(u) {
          return r.getEvent(u)[f];
        };
      }, h = function(f) {
        return function(u, v) {
          var m = r.getEvent(u);
          m[f] = v, m._changed = !0, m._timed = this.isOneDayEvent(m), r.event_updated(m, !0);
        };
      }, p = 0; p < _.length; p += 2)
        r["getEvent" + _[p + 1]] = c(_[p]), r["setEvent" + _[p + 1]] = h(_[p]);
    }(), r.event_updated = function(_, c) {
      this.is_visible_events(_) ? this.render_view_data() : this.clear_event(_.id);
    }, r.is_visible_events = function(_) {
      if (!this._min_date || !this._max_date)
        return !1;
      if (_.start_date.valueOf() < this._max_date.valueOf() && this._min_date.valueOf() < _.end_date.valueOf()) {
        var c = _.start_date.getHours(), h = _.end_date.getHours() + _.end_date.getMinutes() / 60, p = this.config.last_hour, f = this.config.first_hour;
        return !(!this._table_view && (h > p || h <= f) && (c >= p || c < f) && !((_.end_date.valueOf() - _.start_date.valueOf()) / 36e5 > 24 - (this.config.last_hour - this.config.first_hour) || c < p && h > f));
      }
      return !1;
    }, r.isOneDayEvent = function(_) {
      var c = new Date(_.end_date.valueOf() - 1);
      return _.start_date.getFullYear() === c.getFullYear() && _.start_date.getMonth() === c.getMonth() && _.start_date.getDate() === c.getDate() && r._wall_clock_length(_) < 864e5;
    }, r._is_start_of_day = function(_) {
      return _.getTime() === r.date.date_part(_).getTime();
    }, r._wall_clock_length = function(_) {
      return _.end_date.valueOf() - _.start_date.valueOf() - 6e4 * (_.end_date.getTimezoneOffset() - _.start_date.getTimezoneOffset());
    }, r._get_whole_days_length = function(_, c) {
      if (!r._is_start_of_day(_) || !r._is_start_of_day(c))
        return null;
      var h = Math.round(r._wall_clock_length({ start_date: _, end_date: c }) / 864e5);
      return h > 0 ? 24 * h * 60 * 60 : null;
    }, r._wall_clock_ms = function(_) {
      return Date.UTC(_.getFullYear(), _.getMonth(), _.getDate(), _.getHours(), _.getMinutes(), _.getSeconds());
    }, r._date_from_wall_clock_ms = function(_) {
      var c = new Date(_);
      return new Date(c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate(), c.getUTCHours(), c.getUTCMinutes(), c.getUTCSeconds());
    }, r._add_wall_clock_minutes = function(_, c) {
      return new Date(_.getFullYear(), _.getMonth(), _.getDate(), _.getHours(), _.getMinutes() + Number(c));
    }, r._date_at_minutes_of_day = function(_, c) {
      return new Date(_.getFullYear(), _.getMonth(), _.getDate(), 0, Number(c));
    }, r._get_moved_end_date = function(_, c) {
      var h = r._get_whole_days_length(_.start_date, _.end_date), p = new Date(c);
      return h !== null && r._is_start_of_day(p) ? new Date(p.getFullYear(), p.getMonth(), p.getDate() + h / 86400).valueOf() : _.end_date.valueOf() - (_.start_date.valueOf() - c);
    }, r.get_visible_events = function(_) {
      var c = [];
      for (var h in this._events)
        this.is_visible_events(this._events[h]) && (_ && !this._events[h]._timed || this.filter_event(h, this._events[h]) && c.push(this._events[h]));
      return c;
    }, r.filter_event = function(_, c) {
      var h = this["filter_" + this._mode];
      return !h || h(_, c);
    }, r._is_main_area_event = function(_) {
      return !!_._timed;
    }, r.render_view_data = function(_, c) {
      var h = !1;
      if (!_) {
        if (h = !0, this._not_render)
          return void (this._render_wait = !0);
        this._render_wait = !1, this.clear_view(), _ = this.get_visible_events(!(this._table_view || this.config.multi_day));
      }
      for (var p = 0, f = _.length; p < f; p++)
        this._recalculate_timed(_[p]);
      if (this.config.multi_day && !this._table_view) {
        var u = [], v = [];
        for (p = 0; p < _.length; p++)
          this._is_main_area_event(_[p]) ? u.push(_[p]) : v.push(_[p]);
        if (!this._els.dhx_multi_day) {
          var m = r._commonErrorMessages.unknownView(this._mode);
          throw new Error(m);
        }
        this._rendered_location = this._els.dhx_multi_day[0], this._table_view = !0, this.render_data(v, c), this._table_view = !1, this._rendered_location = this._els.dhx_cal_data[0], this._table_view = !1, this.render_data(u, c);
      } else {
        var x = document.createDocumentFragment(), w = this._els.dhx_cal_data[0];
        this._rendered_location = x, this.render_data(_, c), w.appendChild(x), this._rendered_location = w;
      }
      h && this.callEvent("onDataRender", []);
    }, r._view_month_day = function(_) {
      var c = r.getActionData(_).date;
      r.callEvent("onViewMoreClick", [c]) && r.setCurrentView(c, "day");
    }, r._render_month_link = function(_) {
      for (var c = this._rendered_location, h = this._lame_clone(_), p = _._sday; p < _._eday; p++) {
        h._sday = p, h._eday = p + 1;
        var f = r.date, u = r._min_date;
        u = f.add(u, h._sweek, "week"), u = f.add(u, h._sday, "day");
        var v = r.getEvents(u, f.add(u, 1, "day")).length, m = this._get_event_bar_pos(h), x = m.x2 - m.x, w = document.createElement("div");
        r.event(w, "click", function(S) {
          r._view_month_day(S);
        }), w.className = "dhx_month_link", w.style.top = m.y + "px", w.style.left = m.x + "px", w.style.width = x + "px", w.innerHTML = r.templates.month_events_link(u, v), this._rendered.push(w), c.appendChild(w);
      }
    }, r._recalculate_timed = function(_) {
      var c;
      _ && (c = typeof _ != "object" ? this._events[_] : _) && (c._timed = r.isOneDayEvent(c));
    }, r.attachEvent("onEventChanged", r._recalculate_timed), r.attachEvent("onEventAdded", r._recalculate_timed), r.render_data = function(_, c) {
      _ = this._pre_render_events(_, c);
      for (var h = {}, p = 0; p < _.length; p++)
        if (this._table_view)
          if (r._mode != "month")
            this.render_event_bar(_[p]);
          else {
            var f = r.config.max_month_events;
            f !== 1 * f || _[p]._sorder < f ? this.render_event_bar(_[p]) : f !== void 0 && _[p]._sorder == f && r._render_month_link(_[p]);
          }
        else {
          var u = _[p], v = r.locate_holder(u._sday);
          if (!v)
            continue;
          h[u._sday] || (h[u._sday] = { real: v, buffer: document.createDocumentFragment(), width: v.clientWidth });
          var m = h[u._sday];
          this.render_event(u, m.buffer, m.width);
        }
      for (var p in h)
        (m = h[p]).real && m.buffer && m.real.appendChild(m.buffer);
    }, r._get_first_visible_cell = function(_) {
      for (var c = 0; c < _.length; c++)
        if ((_[c].className || "").indexOf("dhx_scale_ignore") == -1)
          return _[c];
      return _[0];
    }, r._pre_render_events = function(_, c) {
      var h = this.xy.bar_height, p = this._colsS.heights, f = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], u = this._els.dhx_cal_data[0];
      if (_ = this._table_view ? this._pre_render_events_table(_, c) : this._pre_render_events_line(_, c), this._table_view)
        if (c)
          this._colsS.heights = p;
        else {
          var v = u.querySelectorAll(".dhx_cal_month_row");
          if (v.length) {
            for (var m = 0; m < v.length; m++) {
              f[m]++;
              var x = v[m].querySelectorAll(".dhx_cal_month_cell"), w = this._colsS.height - this.xy.month_head_height;
              if (f[m] * h > w) {
                var S = w;
                1 * this.config.max_month_events !== this.config.max_month_events || f[m] <= this.config.max_month_events ? S = f[m] * h : (this.config.max_month_events + 1) * h > w && (S = (this.config.max_month_events + 1) * h), v[m].style.height = S + this.xy.month_head_height + "px";
              }
              f[m] = (f[m - 1] || 0) + r._get_first_visible_cell(x).offsetHeight;
            }
            f.unshift(0);
            const M = this.$container.querySelector(".dhx_cal_data");
            if (M.offsetHeight < M.scrollHeight && !r._colsS.scroll_fix && r.xy.scroll_width) {
              var N = r._colsS, E = N[N.col_length], T = N.heights.slice();
              E -= r.xy.scroll_width || 0, this._calc_scale_sizes(E, this._min_date, this._max_date), r._colsS.heights = T, this.set_xy(this._els.dhx_cal_header[0], E), r._render_scales(this._els.dhx_cal_header[0]), r._render_month_scale(this._els.dhx_cal_data[0], this._get_timeunit_start(), this._min_date), N.scroll_fix = !0;
            }
          } else if (_.length || this._els.dhx_multi_day[0].style.visibility != "visible" || (f[0] = -1), _.length || f[0] == -1) {
            var g = (f[0] + 1) * h + 4, b = g, y = g + "px";
            this.config.multi_day_height_limit && (y = (b = Math.min(g, this.config.multi_day_height_limit)) + "px");
            var k = this._els.dhx_multi_day[0];
            k.style.height = y, k.style.visibility = f[0] == -1 ? "hidden" : "visible", k.style.display = f[0] == -1 ? "none" : "";
            var D = this._els.dhx_multi_day[1];
            D.style.height = y, D.style.visibility = f[0] == -1 ? "hidden" : "visible", D.style.display = f[0] == -1 ? "none" : "", D.className = f[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (f[0] + 1) * h, this.config.multi_day_height_limit && (this._dy_shift = Math.min(this.config.multi_day_height_limit, this._dy_shift)), f[0] = 0, b != g && (k.style.overflowY = "auto", D.style.position = "fixed", D.style.top = "", D.style.left = "");
          }
        }
      return _;
    }, r._get_event_sday = function(_) {
      var c = this.date.day_start(new Date(_.start_date));
      return Math.round((c.valueOf() - this._min_date.valueOf()) / 864e5);
    }, r._get_event_mapped_end_date = function(_) {
      var c = _.end_date;
      if (this.config.separate_short_events) {
        var h = (_.end_date - _.start_date) / 6e4;
        h < this._min_mapped_duration && (c = this.date.add(c, this._min_mapped_duration - h, "minute"));
      }
      return c;
    }, r._pre_render_events_line = function(_, c) {
      _.sort(function(D, M) {
        return D.start_date.valueOf() == M.start_date.valueOf() ? D.id > M.id ? 1 : -1 : D.start_date > M.start_date ? 1 : -1;
      });
      var h = [], p = [];
      this._min_mapped_duration = Math.floor(60 * this.xy.min_event_height / this.config.hour_size_px);
      for (var f = 0; f < _.length; f++) {
        var u = _[f], v = u.start_date, m = u.end_date, x = v.getHours(), w = m.getHours();
        if (u._sday = this._get_event_sday(u), this._ignores[u._sday])
          _.splice(f, 1), f--;
        else {
          if (h[u._sday] || (h[u._sday] = []), !c) {
            u._inner = !1;
            for (var S = h[u._sday]; S.length; ) {
              var N = S[S.length - 1];
              if (!(this._get_event_mapped_end_date(N).valueOf() <= u.start_date.valueOf()))
                break;
              S.splice(S.length - 1, 1);
            }
            for (var E = S.length, T = !1, g = 0; g < S.length; g++)
              if (N = S[g], this._get_event_mapped_end_date(N).valueOf() <= u.start_date.valueOf()) {
                T = !0, u._sorder = N._sorder, E = g, u._inner = !0;
                break;
              }
            if (S.length && (S[S.length - 1]._inner = !0), !T)
              if (S.length)
                if (S.length <= S[S.length - 1]._sorder) {
                  if (S[S.length - 1]._sorder)
                    for (g = 0; g < S.length; g++) {
                      for (var b = !1, y = 0; y < S.length; y++)
                        if (S[y]._sorder == g) {
                          b = !0;
                          break;
                        }
                      if (!b) {
                        u._sorder = g;
                        break;
                      }
                    }
                  else
                    u._sorder = 0;
                  u._inner = !0;
                } else {
                  var k = S[0]._sorder;
                  for (g = 1; g < S.length; g++)
                    S[g]._sorder > k && (k = S[g]._sorder);
                  u._sorder = k + 1, u._inner = !1;
                }
              else
                u._sorder = 0;
            S.splice(E, E == S.length ? 0 : 1, u), S.length > (S.max_count || 0) ? (S.max_count = S.length, u._count = S.length) : u._count = u._count ? u._count : 1;
          }
          (x < this.config.first_hour || w >= this.config.last_hour) && (p.push(u), _[f] = u = this._copy_event(u), x < this.config.first_hour && (u.start_date.setHours(this.config.first_hour), u.start_date.setMinutes(0)), w >= this.config.last_hour && (u.end_date.setMinutes(0), u.end_date.setHours(this.config.last_hour)), u.start_date > u.end_date || x == this.config.last_hour) && (_.splice(f, 1), f--);
        }
      }
      if (!c) {
        for (f = 0; f < _.length; f++)
          _[f]._count = h[_[f]._sday].max_count;
        for (f = 0; f < p.length; f++)
          p[f]._count = h[p[f]._sday].max_count;
      }
      return _;
    }, r._time_order = function(_) {
      _.sort(function(c, h) {
        return c.start_date.valueOf() == h.start_date.valueOf() ? c._timed && !h._timed ? 1 : !c._timed && h._timed ? -1 : c.id > h.id ? 1 : -1 : c.start_date > h.start_date ? 1 : -1;
      });
    }, r._is_any_multiday_cell_visible = function(_, c, h) {
      var p = this._cols.length, f = !1, u = _, v = !0, m = new Date(c);
      for (r.date.day_start(new Date(c)).valueOf() != c.valueOf() && (m = r.date.day_start(m), m = r.date.add(m, 1, "day")); u < m; ) {
        v = !1;
        var x = this.locate_holder_day(u, !1, h) % p;
        if (!this._ignores[x]) {
          f = !0;
          break;
        }
        u = r.date.add(u, 1, "day");
      }
      return v || f;
    }, r._pre_render_events_table = function(_, c) {
      this._time_order(_);
      for (var h, p = [], f = [[], [], [], [], [], [], []], u = this._colsS.heights, v = this._cols.length, m = {}, x = 0; x < _.length; x++) {
        var w = _[x], S = w.id;
        m[S] || (m[S] = { first_chunk: !0, last_chunk: !0 });
        var N = m[S], E = h || w.start_date, T = w.end_date;
        E < this._min_date && (N.first_chunk = !1, E = this._min_date), T > this._max_date && (N.last_chunk = !1, T = this._max_date);
        var g = this.locate_holder_day(E, !1, w);
        if (w._sday = g % v, !this._ignores[w._sday] || !w._timed) {
          var b = this.locate_holder_day(T, !0, w) || v;
          if (w._eday = b % v || v, w._length = b - g, w._sweek = Math.floor((this._correct_shift(E.valueOf(), 1) - this._min_date.valueOf()) / (864e5 * v)), r._is_any_multiday_cell_visible(E, T, w)) {
            var y, k = f[w._sweek];
            for (y = 0; y < k.length && !(k[y]._eday <= w._sday); y++)
              ;
            if (w._sorder && c || (w._sorder = y), w._sday + w._length <= v)
              h = null, p.push(w), k[y] = w, u[w._sweek] = k.length - 1, w._first_chunk = N.first_chunk, w._last_chunk = N.last_chunk;
            else {
              var D = this._copy_event(w);
              D.id = w.id, D._length = v - w._sday, D._eday = v, D._sday = w._sday, D._sweek = w._sweek, D._sorder = w._sorder, D.end_date = this.date.add(E, D._length, "day"), D._first_chunk = N.first_chunk, N.first_chunk && (N.first_chunk = !1), p.push(D), k[y] = D, h = D.end_date, u[w._sweek] = k.length - 1, x--;
            }
          } else
            h = null;
        }
      }
      return p;
    }, r._copy_dummy = function() {
      var _ = new Date(this.start_date), c = new Date(this.end_date);
      this.start_date = _, this.end_date = c;
    }, r._copy_event = function(_) {
      return this._copy_dummy.prototype = _, new this._copy_dummy();
    }, r._rendered = [], r._reset_rendered_events = function() {
      this._rendered = [], l.invalidate();
    }, r.clear_view = function() {
      for (var _ = 0; _ < this._rendered.length; _++) {
        var c = this._rendered[_];
        c.parentNode && c.parentNode.removeChild(c);
      }
      this._reset_rendered_events();
    }, r.updateEvent = function(_) {
      var c = this.getEvent(_);
      this.clear_event(_), c && this.is_visible_events(c) && this.filter_event(_, c) && (this._table_view || this.config.multi_day || c._timed) && (this.config.update_render ? this.render_view_data() : this.getState().mode != "month" || this.getState().drag_id || this.isOneDayEvent(c) ? this.render_view_data([c], !0) : this.render_view_data());
    }, r.clear_event = function(_) {
      this.for_rendered(_, function(c, h) {
        c.parentNode && c.parentNode.removeChild(c), r._forget_rendered_event(c, h);
      });
    }, r._y_from_date = function(_) {
      var c = 60 * _.getHours() + _.getMinutes();
      return Math.round((60 * c * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px);
    }, r._calc_event_y = function(_, c) {
      c = c || 0;
      var h = 60 * _.start_date.getHours() + _.start_date.getMinutes(), p = 60 * _.end_date.getHours() + _.end_date.getMinutes() || 60 * r.config.last_hour;
      return { top: this._y_from_date(_.start_date), height: Math.max(c, (p - h) * this.config.hour_size_px / 60) };
    }, r.render_event = function(_, c, h) {
      var p = r.xy.menu_width, f = this.config.use_select_menu_space ? 0 : p;
      if (!(_._sday < 0)) {
        var u = r.locate_holder(_._sday);
        if (u) {
          c = c || u;
          var v = this._calc_event_y(_, r.xy.min_event_height), m = v.top, x = v.height, w = _._count || 1, S = _._sorder || 0;
          h = h || u.clientWidth, this.config.day_column_padding && (h -= this.config.day_column_padding);
          var N = Math.floor((h - f) / w), E = S * N + 1;
          if (_._inner || (N *= w - S), this.config.cascade_event_display) {
            const A = this.config.cascade_event_count, $ = this.config.cascade_event_margin;
            let H, O = (w - S - 1) % A * $, j = S % A * $;
            w * $ < h - this.config.day_column_padding ? H = _._inner ? O / 2 : 0 : (H = _._inner ? O / 3 : 0, E = j / 3, w * $ / 2 > h - this.config.day_column_padding && (H = _._inner ? O / A : 0, E = j / A)), N = Math.floor(h - f - E - H);
          }
          _._mode = x < 30 ? "smallest" : x < 42 ? "small" : null;
          var T = this._render_v_bar(_, f + E, m, N, x, _._text_style, r.templates.event_header(_.start_date, _.end_date, _), r.templates.event_text(_.start_date, _.end_date, _));
          if (_._mode === "smallest" ? T.classList.add("dhx_cal_event--xsmall") : _._mode === "small" && T.classList.add("dhx_cal_event--small"), this._waiAria.eventAttr(_, T), this._rendered.push(T), c.appendChild(T), E = E + parseInt(this.config.rtl ? u.style.right : u.style.left, 10) + f, this._edit_id == _.id) {
            T.style.zIndex = 1, N = Math.max(N, r.xy.editor_width), (T = document.createElement("div")).setAttribute("event_id", _.id), T.setAttribute(this.config.event_attribute, _.id), this._waiAria.eventAttr(_, T), T.className = "dhx_cal_event dhx_cal_editor", this.config.rtl && E++, this.set_xy(T, N, x, E, m), _.color && T.style.setProperty("--dhx-scheduler-event-background", _.color);
            var g = r.templates.event_class(_.start_date, _.end_date, _);
            g && (T.className += " " + g);
            var b = document.createElement("div");
            b.style.cssText += "overflow:hidden;height:100%", T.appendChild(b), this._els.dhx_cal_data[0].appendChild(T), this._rendered.push(T), b.innerHTML = "<textarea class='dhx_cal_editor'>" + _.text + "</textarea>", this._editor = b.querySelector("textarea"), r.event(this._editor, "keydown", function(A) {
              if (A.shiftKey)
                return !0;
              var $ = A.keyCode;
              $ == r.keys.edit_save && r.editStop(!0), $ == r.keys.edit_cancel && r.editStop(!1), $ != r.keys.edit_save && $ != r.keys.edit_cancel || A.preventDefault && A.preventDefault();
            }), r.event(this._editor, "selectstart", function(A) {
              return A.cancelBubble = !0, !0;
            }), r._focus(this._editor, !0), this._els.dhx_cal_data[0].scrollLeft = 0;
          }
          if (this.xy.menu_width !== 0 && this._select_id == _.id) {
            this.config.cascade_event_display && this._drag_mode && (T.style.zIndex = 1);
            for (var y, k = this.config["icons_" + (this._edit_id == _.id ? "edit" : "select")], D = "", M = 0; M < k.length; M++) {
              const A = k[M];
              y = this._waiAria.eventMenuAttrString(A), D += `<div class='dhx_menu_icon ${A}' title='${this.locale.labels[A]}' ${y}></div>`;
            }
            var C = this._render_v_bar(_, E - p - 1, m, p, null, "", "<div class='dhx_menu_head'></div>", D, !0);
            _.color && C.style.setProperty("--dhx-scheduler-event-background", _.color), _.textColor && C.style.setProperty("--dhx-scheduler-event-color", _.textColor), this._els.dhx_cal_data[0].appendChild(C), this._rendered.push(C);
          }
          this.config.drag_highlight && this._drag_id == _.id && this.highlightEventPosition(_);
        }
      }
    }, r._render_v_bar = function(_, c, h, p, f, u, v, m, x) {
      var w = document.createElement("div"), S = _.id, N = x ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event", E = r.getState();
      E.drag_id == _.id && (N += " dhx_cal_event_drag"), E.select_id == _.id && (N += " dhx_cal_event_selected");
      var T = r.templates.event_class(_.start_date, _.end_date, _);
      T && (N = N + " " + T), this.config.cascade_event_display && (N += " dhx_cal_event_cascade");
      var g = p - 1, b = `<div event_id="${S}" ${this.config.event_attribute}="${S}" class="${N}"
				style="position:absolute; top:${h}px; ${this.config.rtl ? "right:" : "left:"}${c}px; width:${g}px; height:${f}px; ${u || ""}" 
				data-bar-start="${_.start_date.valueOf()}" data-bar-end="${_.end_date.valueOf()}">
				</div>`;
      w.innerHTML = b;
      var y = w.cloneNode(!0).firstChild;
      if (!x && r.renderEvent(y, _, p, f, v, m))
        return _.color && y.style.setProperty("--dhx-scheduler-event-background", _.color), _.textColor && y.style.setProperty("--dhx-scheduler-event-color", _.textColor), y;
      y = w.firstChild, _.color && y.style.setProperty("--dhx-scheduler-event-background", _.color), _.textColor && y.style.setProperty("--dhx-scheduler-event-color", _.textColor);
      var k = '<div class="dhx_event_move dhx_header" >&nbsp;</div>';
      k += '<div class="dhx_event_move dhx_title">' + v + "</div>", k += '<div class="dhx_body">' + m + "</div>";
      var D = "dhx_event_resize dhx_footer";
      return (x || _._drag_resize === !1) && (D = "dhx_resize_denied " + D), k += '<div class="' + D + '" style=" width:' + (x ? " margin-top:-1px;" : "") + '" ></div>', y.innerHTML = k, y;
    }, r.renderEvent = function() {
      return !1;
    }, r.locate_holder = function(_) {
      return this._mode == "day" ? this._els.dhx_cal_data[0].firstChild : this._els.dhx_cal_data[0].childNodes[_];
    }, r.locate_holder_day = function(_, c) {
      var h = Math.floor((this._correct_shift(_, 1) - this._min_date) / 864e5);
      return c && this.date.time_part(_) && h++, h;
    }, r._get_dnd_order = function(_, c, h) {
      if (!this._drag_event)
        return _;
      this._drag_event._orig_sorder ? _ = this._drag_event._orig_sorder : this._drag_event._orig_sorder = _;
      for (var p = c * _; p + c > h; )
        _--, p -= c;
      return Math.max(_, 0);
    }, r._get_event_bar_pos = function(_) {
      var c = this.config.rtl, h = this._colsS, p = h[_._sday], f = h[_._eday];
      c && (p = h[h.col_length] - h[_._eday] + h[0], f = h[h.col_length] - h[_._sday] + h[0]), f == p && (f = h[_._eday + 1]);
      var u = this.xy.bar_height, v = _._sorder;
      if (_.id == this._drag_id) {
        var m = h.heights[_._sweek + 1] - h.heights[_._sweek] - this.xy.month_head_height;
        v = r._get_dnd_order(v, u, m);
      }
      var x = v * u;
      return { x: p, x2: f, y: h.heights[_._sweek] + (h.height ? this.xy.month_scale_height + 2 : 2) + x };
    }, r.render_event_bar = function(_) {
      var c = this._rendered_location, h = this._get_event_bar_pos(_), p = h.y, f = h.x, u = h.x2, v = "";
      if (u) {
        var m = r.config.resize_month_events && this._mode == "month" && (!_._timed || r.config.resize_month_timed), x = document.createElement("div"), w = _.hasOwnProperty("_first_chunk") && _._first_chunk, S = _.hasOwnProperty("_last_chunk") && _._last_chunk, N = m && (_._timed || w), E = m && (_._timed || S), T = !0, g = "dhx_cal_event_clear";
        _._timed && !m || (T = !1, g = "dhx_cal_event_line"), w && (g += " dhx_cal_event_line_start"), S && (g += " dhx_cal_event_line_end"), N && (v += "<div class='dhx_event_resize dhx_event_resize_start'></div>"), E && (v += "<div class='dhx_event_resize dhx_event_resize_end'></div>");
        var b = r.templates.event_class(_.start_date, _.end_date, _);
        b && (g += " " + b);
        var y = _.color ? "--dhx-scheduler-event-background:" + _.color + ";" : "", k = _.textColor ? "--dhx-scheduler-event-color:" + _.textColor + ";" : "", D = ["position:absolute", "top:" + p + "px", "left:" + f + "px", "width:" + (u - f - (T ? 1 : 0)) + "px", "height:" + (this.xy.bar_height - 2) + "px", k, y, _._text_style || ""].join(";"), M = "<div event_id='" + _.id + "' " + this.config.event_attribute + "='" + _.id + "' class='" + g + "' style='" + D + "'" + this._waiAria.eventBarAttrString(_) + ">";
        m && (M += v), r.getState().mode != "month" || _._beforeEventChangedFlag || (_ = r.getEvent(_.id)), _._timed && (M += `<span class='dhx_cal_event_clear_date'>${r.templates.event_bar_date(_.start_date, _.end_date, _)}</span>`), M += "<div class='dhx_cal_event_line_content'>", M += r.templates.event_bar_text(_.start_date, _.end_date, _) + "</div>", M += "</div>", M += "</div>", x.innerHTML = M, this._rendered.push(x.firstChild), c.appendChild(x.firstChild);
      }
    }, r._locate_event = function(_) {
      for (var c = null; _ && !c && _.getAttribute; )
        c = _.getAttribute(this.config.event_attribute), _ = _.parentNode;
      return c;
    }, r.edit = function(_) {
      this._edit_id != _ && (this.editStop(!1, _), this._edit_id = _, this.updateEvent(_));
    }, r.editStop = function(_, c) {
      if (!c || this._edit_id != c) {
        var h = this.getEvent(this._edit_id);
        h && (_ && (h.text = this._editor.value), this._edit_id = null, this._editor = null, this.updateEvent(h.id), this._edit_stop_event(h, _));
      }
    }, r._edit_stop_event = function(_, c) {
      this._new_event ? (c ? this.callEvent("onEventAdded", [_.id, _]) : _ && this.deleteEvent(_.id, !0), delete _.$new, this._new_event = null) : c && this.callEvent("onEventChanged", [_.id, _]);
    }, r.getEvents = function(_, c) {
      var h = [];
      for (var p in this._events) {
        var f = this._events[p];
        f && (!_ && !c || f.start_date < c && f.end_date > _) && h.push(f);
      }
      return h;
    }, r.getRenderedEvent = function(_) {
      if (_) {
        for (var c = r._rendered, h = 0; h < c.length; h++) {
          var p = c[h];
          if (p.getAttribute(r.config.event_attribute) == _)
            return p;
        }
        return null;
      }
    }, r.showEvent = function(_, c) {
      _ && typeof _ == "object" && (c = _.mode, S = _.section, _ = _.section);
      var h = typeof _ == "number" || typeof _ == "string" ? r.getEvent(_) : _;
      if (c = c || r._mode, h && (!this.checkEvent("onBeforeEventDisplay") || this.callEvent("onBeforeEventDisplay", [h, c]))) {
        var p = r.config.scroll_hour;
        r.config.scroll_hour = h.start_date.getHours();
        var f = r.config.preserve_scroll;
        r.config.preserve_scroll = !1;
        var u = h.color, v = h.textColor;
        if (r.config.highlight_displayed_event && (h.color = r.config.displayed_event_color, h.textColor = r.config.displayed_event_text_color), r.setCurrentView(new Date(h.start_date), c), r.config.scroll_hour = p, r.config.preserve_scroll = f, r.matrix && r.matrix[c]) {
          var m = r.getView(), x = m.y_property, w = r.getEvent(h.id);
          if (w) {
            if (!S) {
              var S = w[x];
              Array.isArray(S) ? S = S[0] : typeof S == "string" && r.config.section_delimiter && S.indexOf(r.config.section_delimiter) > -1 && (S = S.split(r.config.section_delimiter)[0]);
            }
            var N = m.getSectionTop(S), E = m.posFromDate(w.start_date), T = r.$container.querySelector(".dhx_timeline_data_wrapper");
            if (E -= (T.offsetWidth - m.dx) / 2, N = N - T.offsetHeight / 2 + m.dy / 2, m._smartRenderingEnabled())
              var g = m.attachEvent("onScroll", function() {
                b(), m.detachEvent(g);
              });
            m.scrollTo({ left: E, top: N }), m._smartRenderingEnabled() || b();
          }
        } else
          b();
        r.callEvent("onAfterEventDisplay", [h, c]);
      }
      function b() {
        h.color = u, h.textColor = v;
      }
    };
  }(o), function(r) {
    r._append_drag_marker = function(l) {
      if (!l.parentNode) {
        var _ = r._els.dhx_cal_data[0].lastChild, c = r._getClassName(_);
        c.indexOf("dhx_scale_holder") < 0 && _.previousSibling && (_ = _.previousSibling), c = r._getClassName(_), _ && c.indexOf("dhx_scale_holder") === 0 && _.appendChild(l);
      }
    }, r._update_marker_position = function(l, _) {
      var c = r._calc_event_y(_, 0);
      l.style.top = c.top + "px", l.style.height = c.height + "px";
    }, r.highlightEventPosition = function(l) {
      var _ = document.createElement("div");
      _.setAttribute("event_id", l.id), _.setAttribute(this.config.event_attribute, l.id), this._rendered.push(_), this._update_marker_position(_, l);
      var c = this.templates.drag_marker_class(l.start_date, l.end_date, l), h = this.templates.drag_marker_content(l.start_date, l.end_date, l);
      _.className = "dhx_drag_marker", c && (_.className += " " + c), h && (_.innerHTML = h), this._append_drag_marker(_);
    };
  }(o), aa(o), na(o), ra(o), function(r) {
    r.getRootView = function() {
      return { view: { render: function() {
        return { tag: "div", type: 1, attrs: { style: "width:100%;height:100%;" }, hooks: { didInsert: function() {
          r.setCurrentView();
        } }, body: [{ el: this.el, type: 1 }] };
      }, init: function() {
        var l = document.createElement("DIV");
        l.id = "scheduler_" + r.uid(), l.style.width = "100%", l.style.height = "100%", l.classList.add("dhx_cal_container"), l.cmp = "grid", l.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" data-tab="day"></div><div class="dhx_cal_tab" data-tab="week"></div><div class="dhx_cal_tab" data-tab="month"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', r.init(l), this.el = l;
      } }, type: 4 };
    };
  }(o), ia(o), typeof window < "u" && window.jQuery && (n = window.jQuery, d = 0, a = [], n.fn.dhx_scheduler = function(r) {
    if (typeof r != "string") {
      var l = [];
      return this.each(function() {
        if (this && this.getAttribute)
          if (this.getAttribute("dhxscheduler"))
            l.push(window[this.getAttribute("dhxscheduler")]);
          else {
            var _ = "scheduler";
            d && (_ = "scheduler" + (d + 1), window[_] = Scheduler.getSchedulerInstance());
            var c = window[_];
            for (var h in this.setAttribute("dhxscheduler", _), r)
              h != "data" && (c.config[h] = r[h]);
            this.getElementsByTagName("div").length || (this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', this.className += " dhx_cal_container"), c.init(this, c.config.date, c.config.mode), r.data && c.parse(r.data), l.push(c), d++;
          }
      }), l.length === 1 ? l[0] : l;
    }
    if (a[r])
      return a[r].apply(this, []);
    n.error("Method " + r + " does not exist on jQuery.dhx_scheduler");
  }), function(r) {
    (function() {
      var l = r.setCurrentView, _ = r.updateView, c = null, h = null, p = function(v, m) {
        var x = this;
        _e.clearTimeout(h), _e.clearTimeout(c);
        var w = x._date, S = x._mode;
        u(this, v, m), h = setTimeout(function() {
          r.$destroyed || (x.callEvent("onBeforeViewChange", [S, w, m || x._mode, v || x._date]) ? (_.call(x, v, m), x.callEvent("onViewChange", [x._mode, x._date]), _e.clearTimeout(c), h = 0) : u(x, w, S));
        }, r.config.delay_render);
      }, f = function(v, m) {
        var x = this, w = arguments;
        u(this, v, m), _e.clearTimeout(c), c = setTimeout(function() {
          r.$destroyed || h || _.apply(x, w);
        }, r.config.delay_render);
      };
      function u(v, m, x) {
        m && (v._date = m), x && (v._mode = x);
      }
      r.attachEvent("onSchedulerReady", function() {
        r.config.delay_render ? (r.setCurrentView = p, r.updateView = f) : (r.setCurrentView = l, r.updateView = _);
      });
    })();
  }(o), function(r) {
    r.createDataProcessor = function(l) {
      var _, c;
      l instanceof Function ? _ = l : l.hasOwnProperty("router") ? _ = l.router : l.hasOwnProperty("event") && (_ = l), c = _ ? "CUSTOM" : l.mode || "REST-JSON";
      var h = new Le(l.url);
      return h.init(r), h.setTransactionMode({ mode: c, router: _ }, l.batchUpdate), h;
    }, r.DataProcessor = Le;
  }(o), function(r) {
    r.attachEvent("onSchedulerReady", function() {
      typeof dhtmlxError < "u" && window.dhtmlxError.catchError("LoadXML", function(l, _, c) {
        var h = c[0].responseText;
        switch (r.config.ajax_error) {
          case "alert":
            _e.alert(h);
            break;
          case "console":
            _e.console.log(h);
        }
      });
    });
  }(o);
  const s = new da(_a);
  o.i18n = { addLocale: s.addLocale, setLocale: function(r) {
    if (typeof r == "string") {
      var l = s.getLocale(r);
      l || (l = s.getLocale("en")), o.locale = l;
    } else if (r)
      if (o.locale)
        for (var _ in r)
          r[_] && typeof r[_] == "object" ? (o.locale[_] || (o.locale[_] = {}), o.mixin(o.locale[_], r[_], !0)) : o.locale[_] = r[_];
      else
        o.locale = r;
    var c = o.locale.labels;
    c.dhx_save_btn = c.icon_save, c.dhx_cancel_btn = c.icon_cancel, c.dhx_delete_btn = c.icon_delete, o.$container && o.get_elements();
  }, getLocale: s.getLocale }, o.i18n.setLocale("en"), o.ext = {}, jt(o);
  const i = {};
  return o.plugins = function(r) {
    return function(_, c, h) {
      const p = [];
      for (const f in _)
        if (_[f]) {
          const u = f.toLowerCase();
          c[u] && c[u].forEach(function(v) {
            const m = v.toLowerCase();
            _[m] || p.push(m);
          }), p.push(u);
        }
      return p.sort(function(f, u) {
        const v = h[f] || 0, m = h[u] || 0;
        return v > m ? 1 : v < m ? -1 : 0;
      }), p;
    }(r, { treetimeline: ["timeline"], daytimeline: ["timeline"], outerdrag: ["legacy"] }, { legacy: 1, limit: 1, timeline: 2, daytimeline: 3, treetimeline: 3, outerdrag: 6 }).forEach(function(_) {
      if (!i[_]) {
        const c = e.getExtension(_);
        if (!c)
          throw new Error("unknown plugin " + _);
        c(o), i[_] = !0;
      }
    }), i;
  }, o.plugins({ all_timed: "short" }), o;
}
class ha {
  constructor(o) {
    this._extensions = {};
    for (const t in o)
      this._extensions[t] = o[t];
  }
  addExtension(o, t) {
    this._extensions[o] = t;
  }
  getExtension(o) {
    return this._extensions[o];
  }
}
typeof dhtmlx < "u" && dhtmlx.attaches && (dhtmlx.attaches.attachScheduler = function(e, o, t, n) {
  t = t || '<div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div>';
  var d = document.createElement("DIV");
  return d.id = "dhxSchedObj_" + this._genStr(12), d.innerHTML = '<div id="' + d.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + t + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>', document.body.appendChild(d.firstChild), this.attachObject(d.id, !1, !0), this.vs[this.av].sched = n, this.vs[this.av].schedId = d.id, n.setSizes = n.updateView, n.destructor = function() {
  }, n.init(d.id, e, o), this.vs[this._viewRestore()].sched;
});
const ce = (e, o) => {
  o(!1, `The ${e} extension is not included in this version of dhtmlxScheduler.<br>
		You may need a <a href="https://docs.dhtmlx.com/scheduler/editions_comparison.html" target="_blank">Professional version of the component</a>.<br>
		Contact us at <a href="https://dhtmlx.com/docs/contact.shtml" target="_blank">https://dhtmlx.com/docs/contact.shtml</a> if you have any questions.`);
};
function ua(e) {
  (function() {
    var o = [];
    function t() {
      return !!o.length;
    }
    function n(i) {
      setTimeout(function() {
        if (e.$destroyed)
          return !0;
        t() || function(r, l) {
          for (; r && r != l; )
            r = r.parentNode;
          return r == l;
        }(document.activeElement, e.$container) || e.focus();
      }, 1);
    }
    function d(i) {
      var r = (i = i || window.event).currentTarget;
      r == o[o.length - 1] && e.$keyboardNavigation.trapFocus(r, i);
    }
    if (e.attachEvent("onLightbox", function() {
      var i;
      i = e.getLightbox(), e.eventRemove(i, "keydown", d), e.event(i, "keydown", d), o.push(i);
    }), e.attachEvent("onAfterLightbox", function() {
      var i = o.pop();
      i && e.eventRemove(i, "keydown", d), n();
    }), e.attachEvent("onAfterQuickInfo", function() {
      n();
    }), !e._keyNavMessagePopup) {
      e._keyNavMessagePopup = !0;
      var a = null, s = null;
      const i = [];
      e.attachEvent("onMessagePopup", function(r) {
        for (a = document.activeElement, s = a; s && e._getClassName(s).indexOf("dhx_cal_data") < 0; )
          s = s.parentNode;
        s && (s = s.parentNode), e.eventRemove(r, "keydown", d), e.event(r, "keydown", d), i.push(r);
      }), e.attachEvent("onAfterMessagePopup", function() {
        var r = i.pop();
        r && e.eventRemove(r, "keydown", d), setTimeout(function() {
          if (e.$destroyed)
            return !0;
          for (var l = document.activeElement; l && e._getClassName(l).indexOf("dhx_cal_light") < 0; )
            l = l.parentNode;
          l || (a && a.parentNode ? a.focus() : s && s.parentNode && s.focus(), a = null, s = null);
        }, 1);
      });
    }
    e.$keyboardNavigation.isModal = t;
  })();
}
function fa(e) {
  e._temp_key_scope = function() {
    e.config.key_nav = !0, e.$keyboardNavigation._pasteDate = null, e.$keyboardNavigation._pasteSection = null;
    var o = null, t = {};
    function n(s) {
      s = s || window.event, t.x = s.clientX, t.y = s.clientY;
    }
    function d() {
      for (var s, i, r = document.elementFromPoint(t.x, t.y); r && r != e._obj; )
        r = r.parentNode;
      return s = r == e._obj, i = e.$keyboardNavigation.dispatcher.isEnabled(), s || i;
    }
    function a(s) {
      return e._lame_copy({}, s);
    }
    document.body ? e.event(document.body, "mousemove", n) : e.event(window, "load", function() {
      e.event(document.body, "mousemove", n);
    }), e.attachEvent("onMouseMove", function(s, i) {
      var r = e.getState();
      if (r.mode && r.min_date) {
        var l = e.getActionData(i);
        e.$keyboardNavigation._pasteDate = l.date, e.$keyboardNavigation._pasteSection = l.section;
      }
    }), e._make_pasted_event = function(s) {
      var i = e.$keyboardNavigation._pasteDate, r = e.$keyboardNavigation._pasteSection, l = s.end_date - s.start_date, _ = a(s);
      if (function(h) {
        delete h.rec_type, delete h.rec_pattern, delete h.event_pid, delete h.event_length;
      }(_), _.start_date = new Date(i), _.end_date = new Date(_.start_date.valueOf() + l), r) {
        var c = e._get_section_property();
        e.config.multisection && s[c] && e.isMultisectionEvent && e.isMultisectionEvent(s) ? _[c] = s[c] : _[c] = r;
      }
      return _;
    }, e._do_paste = function(s, i, r) {
      e.callEvent("onBeforeEventPasted", [s, i, r]) !== !1 && (e.addEvent(i), e.callEvent("onEventPasted", [s, i, r]));
    }, e._is_key_nav_active = function() {
      return !(!this._is_initialized() || this._is_lightbox_open() || !this.config.key_nav);
    }, e.event(document, "keydown", function(s) {
      (s.ctrlKey || s.metaKey) && s.keyCode == 86 && e._buffer_event && !e.$keyboardNavigation.dispatcher.isEnabled() && (e.$keyboardNavigation.dispatcher.isActive = d());
    }), e._key_nav_copy_paste = function(s) {
      if (!e._is_key_nav_active())
        return !0;
      if (s.keyCode == 37 || s.keyCode == 39) {
        s.cancelBubble = !0;
        var i = e.date.add(e._date, s.keyCode == 37 ? -1 : 1, e._mode);
        return e.setCurrentView(i), !0;
      }
      var r, l = (r = e.$keyboardNavigation.dispatcher.getActiveNode()) && r.eventId ? r.eventId : e._select_id;
      if ((s.ctrlKey || s.metaKey) && s.keyCode == 67)
        return l && (e._buffer_event = a(e.getEvent(l)), o = !0, e.callEvent("onEventCopied", [e.getEvent(l)])), !0;
      if ((s.ctrlKey || s.metaKey) && s.keyCode == 88 && l) {
        o = !1;
        var _ = e._buffer_event = a(e.getEvent(l));
        e.updateEvent(_.id), e.callEvent("onEventCut", [_]);
      }
      if ((s.ctrlKey || s.metaKey) && s.keyCode == 86 && d()) {
        if (_ = (_ = e._buffer_event ? e.getEvent(e._buffer_event.id) : e._buffer_event) || e._buffer_event) {
          var c = e._make_pasted_event(_);
          o ? (c.id = e.uid(), e._do_paste(o, c, _)) : e.callEvent("onBeforeEventChanged", [c, s, !1, _]) && (e._do_paste(o, c, _), o = !0);
        }
        return !0;
      }
    };
  }, e._temp_key_scope();
}
function pa(e) {
  e.$keyboardNavigation.attachSchedulerHandlers = function() {
    var o, t = e.$keyboardNavigation.dispatcher, n = function(r) {
      if (e.config.key_nav)
        return t.keyDownHandler(r);
    }, d = function() {
      t.keepScrollPosition(function() {
        t.focusGlobalNode();
      });
    };
    e.attachEvent("onDataRender", function() {
      e.config.key_nav && t.isEnabled() && !e.getState().editor_id && (clearTimeout(o), o = setTimeout(function() {
        if (e.$destroyed)
          return !0;
        t.isEnabled() || t.enable(), a();
      }));
    });
    var a = function() {
      if (t.isEnabled()) {
        var r = t.getActiveNode();
        r && (r.isValid() || (r = r.fallback()), !r || r instanceof e.$keyboardNavigation.MinicalButton || r instanceof e.$keyboardNavigation.MinicalCell || t.keepScrollPosition(function() {
          r.focus(!0);
        }));
      }
    };
    function s(r) {
      if (!e.config.key_nav)
        return !0;
      const l = e.getView();
      let _ = !1;
      if (e.getState().mode === "month")
        _ = e.$keyboardNavigation.isChildOf(r.target || r.srcElement, e.$container.querySelector(".dhx_cal_month_table"));
      else if (l && l.layout === "timeline")
        _ = e.$keyboardNavigation.isChildOf(r.target || r.srcElement, e.$container.querySelector(".dhx_timeline_data_col"));
      else {
        const p = e.$container.querySelectorAll(".dhx_scale_holder");
        _ = Array.from(p).some((f) => f === r.target.parentNode);
      }
      var c, h = e.getActionData(r);
      e._locate_event(r.target || r.srcElement) ? c = new e.$keyboardNavigation.Event(e._locate_event(r.target || r.srcElement)) : _ && (c = new e.$keyboardNavigation.TimeSlot(), h.date && _ && (c = c.nextSlot(new e.$keyboardNavigation.TimeSlot(h.date, null, h.section)))), c && (t.isEnabled() ? h.date && _ && t.delay(function() {
        t.setActiveNode(c);
      }) : t.activeNode = c);
    }
    e.attachEvent("onSchedulerReady", function() {
      var r = e.$container;
      e.eventRemove(document, "keydown", n), e.eventRemove(r, "mousedown", s), e.eventRemove(r, "focus", d), e.config.key_nav ? (e.event(document, "keydown", n), e.event(r, "mousedown", s), e.event(r, "focus", d), r.setAttribute("tabindex", "0")) : r.removeAttribute("tabindex");
    });
    var i = e.updateEvent;
    e.updateEvent = function(r) {
      var l = i.apply(this, arguments);
      if (e.config.key_nav && t.isEnabled() && e.getState().select_id == r) {
        var _ = new e.$keyboardNavigation.Event(r);
        e.getState().lightbox_id || function(c) {
          if (e.config.key_nav && t.isEnabled()) {
            var h = c, p = new e.$keyboardNavigation.Event(h.eventId);
            if (!p.isValid()) {
              var f = p.start || h.start, u = p.end || h.end, v = p.section || h.section;
              (p = new e.$keyboardNavigation.TimeSlot(f, u, v)).isValid() || (p = new e.$keyboardNavigation.TimeSlot());
            }
            t.setActiveNode(p);
            var m = t.getActiveNode();
            m && m.getNode && document.activeElement != m.getNode() && t.focusNode(t.getActiveNode());
          }
        }(_);
      }
      return l;
    }, e.attachEvent("onEventDeleted", function(r) {
      return e.config.key_nav && t.isEnabled() && t.getActiveNode().eventId == r && t.setActiveNode(new e.$keyboardNavigation.TimeSlot()), !0;
    }), e.attachEvent("onClearAll", function() {
      if (!e.config.key_nav)
        return !0;
      t.isEnabled() && t.getActiveNode() instanceof e.$keyboardNavigation.Event && t.setActiveNode(new e.$keyboardNavigation.TimeSlot());
    });
  };
}
class ga {
  constructor(o) {
    this.map = null, this._markers = [], this.scheduler = o;
  }
  onEventClick(o) {
    if (this._markers && this._markers.length > 0) {
      for (let t = 0; t < this._markers.length; t++)
        if (o.id == this._markers[t].event.id) {
          let n = this.settings.zoom_after_resolve || this.settings.initial_zoom;
          o.lat && o.lng ? (this.map.setCenter({ lat: o.lat, lng: o.lng }), this.map.setZoom(n)) : (this.map.setCenter({ lat: this.settings.error_position.lat, lng: this.settings.error_position.lng }), this.map.setZoom(n)), google.maps.event.trigger(this._markers[t].marker, "click");
        }
    }
  }
  initialize(o, t) {
    this.settings = t;
    let n = this.scheduler, d = { center: { lat: t.initial_position.lat, lng: t.initial_position.lng }, zoom: t.initial_zoom, mapId: o.id, scrollwheel: !0, mapTypeId: t.type };
    if (this.map === null)
      this.map = new google.maps.Map(o, d);
    else {
      let a = this.map;
      o.appendChild(this.map.__gm.messageOverlay), o.appendChild(this.map.__gm.outerContainer), setTimeout(function() {
        a.setOptions({ container: o.id });
      }, 500);
    }
    google.maps.event.addListener(this.map, "dblclick", function(a) {
      const s = new google.maps.Geocoder();
      if (!n.config.readonly && n.config.dblclick_create) {
        let i = a.latLng;
        s.geocode({ latLng: i }, function(r, l) {
          l == google.maps.GeocoderStatus.OK ? (i = r[0].geometry.location, n.addEventNow({ lat: i.lat(), lng: i.lng(), event_location: r[0].formatted_address, start_date: n.getState().date, end_date: n.date.add(n.getState().date, n.config.time_step, "minute") })) : console.error("Geocode was not successful for the following reason: " + l);
        });
      }
    });
  }
  destroy(o) {
    for (google.maps.event.clearInstanceListeners(window), google.maps.event.clearInstanceListeners(document), google.maps.event.clearInstanceListeners(o); o.firstChild; )
      o.firstChild.remove();
    o.innerHTML = "";
  }
  async addEventMarker(o) {
    let t = { title: o.text, position: {}, map: {} };
    o.lat && o.lng ? t.position = { lat: o.lat, lng: o.lng } : t.position = { lat: this.settings.error_position.lat, lng: this.settings.error_position.lng };
    const { AdvancedMarkerElement: n } = await google.maps.importLibrary("marker");
    let d;
    this.scheduler.ext.mapView.createMarker ? (t.map = this.map, d = this.scheduler.ext.mapView.createMarker(t)) : (d = new n(t), d.map = this.map), d.setMap(this.map), o["!nativeeditor_status"] == "true_deleted" && d.setMap(null), google.maps.event.addListener(d, "click", () => {
      this.infoWindow && this.infoWindow.close(), this.infoWindow = new google.maps.InfoWindow({ maxWidth: this.settings.info_window_max_width }), this.infoWindow.setContent(this.scheduler.templates.map_info_content(o)), this.infoWindow.open({ anchor: d, map: this.map });
    });
    let a = { event: o, ...t, marker: d };
    this._markers.push(a);
  }
  removeEventMarker(o) {
    for (let t = 0; t < this._markers.length; t++)
      o == this._markers[t].event.id && (this._markers[t].marker.setVisible(!1), this._markers[t].marker.setMap(null), this._markers[t].marker.setPosition(null), this._markers[t].marker = null, this._markers.splice(t, 1), t--);
  }
  updateEventMarker(o) {
    for (let t = 0; t < this._markers.length; t++)
      if (this._markers[t].event.id == o.id) {
        this._markers[t].event = o, this._markers[t].position.lat = o.lat, this._markers[t].position.lng = o.lng, this._markers[t].text = o.text;
        let n = new google.maps.LatLng(o.lat, o.lng);
        this._markers[t].marker.setPosition(n);
      }
  }
  clearEventMarkers() {
    if (this._markers.length > 0) {
      for (let o = 0; o < this._markers.length; o++)
        this._markers[o].marker.setMap(null);
      this._markers = [];
    }
  }
  setView(o, t, n) {
    this.map.setCenter({ lat: o, lng: t }), this.map.setZoom(n);
  }
  async resolveAddress(o) {
    const t = new google.maps.Geocoder();
    return await new Promise((n) => {
      t.geocode({ address: o }, function(d, a) {
        a == google.maps.GeocoderStatus.OK ? n({ lat: d[0].geometry.location.lat(), lng: d[0].geometry.location.lng() }) : (console.error("Geocode was not successful for the following reason: " + a), n({}));
      });
    });
  }
}
class ma {
  constructor(o) {
    this.map = null, this._markers = [], this.scheduler = o;
  }
  onEventClick(o) {
    if (this._markers && this._markers.length > 0)
      for (let t = 0; t < this._markers.length; t++)
        o.id == this._markers[t].event.id && (this._markers[t].marker.openPopup(), this._markers[t].marker.closeTooltip(), o.lat && o.lng ? this.setView(o.lat, o.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom) : this.setView(this.settings.error_position.lat, this.settings.error_position.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom));
  }
  initialize(o, t) {
    let n = this.scheduler, d = document.createElement("div");
    d.className = "mapWrapper", d.id = "mapWrapper", d.style.width = o.style.width, d.style.height = o.style.height, o.appendChild(d);
    let a = L.map(d, { center: L.latLng(t.initial_position.lat, t.initial_position.lng), zoom: t.initial_zoom, keyboard: !1 });
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(a), a.on("dblclick", async function(s) {
      let i = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${s.latlng.lat}&lon=${s.latlng.lng}&format=json`, { method: "GET", headers: { "Accept-Language": "en" } }).then((r) => r.json());
      if (i.address) {
        let r = i.address.country;
        n.addEventNow({ lat: s.latlng.lat, lng: s.latlng.lng, event_location: r, start_date: n.getState().date, end_date: n.date.add(n.getState().date, n.config.time_step, "minute") });
      } else
        console.error("unable recieve a position of the event", i.error);
    }), this.map = a, this.settings = t;
  }
  destroy(o) {
    for (this.map.remove(); o.firstChild; )
      o.firstChild.remove();
    o.innerHTML = "";
  }
  addEventMarker(o) {
    const t = L.icon({ iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png", iconSize: [25, 41], shadowSize: [30, 65], iconAnchor: [12, 41], shadowAnchor: [7, 65] });
    let n = { minWidth: 180, maxWidth: this.settings.info_window_max_width };
    const d = L.popup(n).setContent(this.scheduler.templates.map_info_content(o)), a = L.tooltip().setContent(o.text);
    let s = [o.lat, o.lng];
    o.lat && o.lng || (s = [this.settings.error_position.lat, this.settings.error_position.lng]);
    const i = { event: o, marker: L.marker(s, { icon: t }).bindPopup(d).bindTooltip(a).addTo(this.map) };
    this._markers.push(i);
  }
  removeEventMarker(o) {
    for (let t = 0; t < this._markers.length; t++)
      o == this._markers[t].event.id && (this.map.removeLayer(this._markers[t].marker), this._markers.splice(t, 1), t--);
  }
  updateEventMarker(o) {
    for (let t = 0; t < this._markers.length; t++)
      this._markers[t].event.id == o.id && (this._markers[t].event = o, o.lat && o.lng ? this._markers[t].marker.setLatLng([o.lat, o.lng]) : this._markers[t].marker.setLatLng([this.settings.error_position.lat, this.settings.error_position.lng]));
  }
  clearEventMarkers() {
    if (this._markers) {
      for (let o = 0; o < this._markers.length; o++)
        this.map.removeLayer(this._markers[o].marker);
      this._markers = [];
    }
  }
  setView(o, t, n) {
    this.map.setView([o, t], n);
  }
  async resolveAddress(o) {
    let t = {}, n = await fetch(`https://nominatim.openstreetmap.org/search?q=${o}&format=json`, { method: "GET", headers: { "Accept-Language": "en" } }).then((d) => d.json());
    return n && n.length ? (t.lat = +n[0].lat, t.lng = +n[0].lon) : console.error(`Unable recieve a position of the event's location: ${o}`), t;
  }
}
class va {
  constructor(o) {
    this.map = null, this._markers = [], this.scheduler = o;
  }
  onEventClick(o) {
    if (this._markers && this._markers.length > 0)
      for (let t = 0; t < this._markers.length; t++) {
        const n = this._markers[t].marker.getPopup();
        n.isOpen() && n.remove(), o.id == this._markers[t].event.id && (this._markers[t].marker.togglePopup(), o.lat && o.lng ? this.setView(o.lat, o.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom) : this.setView(this.settings.error_position.lat, this.settings.error_position.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom));
      }
  }
  initialize(o, t) {
    let n = this.scheduler;
    mapboxgl.accessToken = t.accessToken;
    const d = new mapboxgl.Map({ container: o, center: [t.initial_position.lng, t.initial_position.lat], zoom: t.initial_zoom + 1 });
    d.on("dblclick", async function(a) {
      let s = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${a.lngLat.lng},${a.lngLat.lat}.json?access_token=${t.accessToken}`).then((i) => i.json());
      if (s.features) {
        let i = s.features[0].place_name;
        n.addEventNow({ lat: a.lngLat.lat, lng: a.lngLat.lng, event_location: i, start_date: n.getState().date, end_date: n.date.add(n.getState().date, n.config.time_step, "minute") });
      } else
        console.error("unable recieve a position of the event");
    }), this.map = d, this.settings = t;
  }
  destroy(o) {
    for (this.map.remove(); o.firstChild; )
      o.firstChild.remove();
    o.innerHTML = "";
  }
  addEventMarker(o) {
    let t = [o.lng, o.lat];
    o.lat && o.lng || (t = [this.settings.error_position.lng, this.settings.error_position.lat]);
    const n = new mapboxgl.Popup({ offset: 25, focusAfterOpen: !1 }).setMaxWidth(`${this.settings.info_window_max_width}px`).setHTML(this.scheduler.templates.map_info_content(o)), d = { event: o, marker: new mapboxgl.Marker().setLngLat(t).setPopup(n).addTo(this.map) };
    this._markers.push(d);
  }
  removeEventMarker(o) {
    for (let t = 0; t < this._markers.length; t++)
      o == this._markers[t].event.id && (this._markers[t].marker.remove(), this._markers.splice(t, 1), t--);
  }
  updateEventMarker(o) {
    for (let t = 0; t < this._markers.length; t++)
      this._markers[t].event.id == o.id && (this._markers[t].event = o, o.lat && o.lng ? this._markers[t].marker.setLngLat([o.lng, o.lat]) : this._markers[t].marker.setLngLat([this.settings.error_position.lng, this.settings.error_position.lat]));
  }
  clearEventMarkers() {
    for (let o = 0; o < this._markers.length; o++)
      this._markers[o].marker.remove();
    this._markers = [];
  }
  setView(o, t, n) {
    this.map.setCenter([t, o]), this.map.setZoom(n);
  }
  async resolveAddress(o) {
    let t = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${o}.json?access_token=${this.settings.accessToken}`).then((d) => d.json()), n = {};
    return t && t.features.length ? (n.lng = t.features[0].center[0], n.lat = t.features[0].center[1]) : console.error(`Unable recieve a position of the event's location: ${o}`), n;
  }
}
var $e = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"], X = function() {
  function e(o, t) {
    if (t === 0)
      throw new Error("Can't create weekday with n == 0");
    this.weekday = o, this.n = t;
  }
  return e.fromStr = function(o) {
    return new e($e.indexOf(o));
  }, e.prototype.nth = function(o) {
    return this.n === o ? this : new e(this.weekday, o);
  }, e.prototype.equals = function(o) {
    return this.weekday === o.weekday && this.n === o.n;
  }, e.prototype.toString = function() {
    var o = $e[this.weekday];
    return this.n && (o = (this.n > 0 ? "+" : "") + String(this.n) + o), o;
  }, e.prototype.getJsWeekday = function() {
    return this.weekday === 6 ? 0 : this.weekday + 1;
  }, e;
}(), J = function(e) {
  return e != null;
}, ne = function(e) {
  return typeof e == "number";
}, Qe = function(e) {
  return typeof e == "string" && $e.includes(e);
}, Z = Array.isArray, ie = function(e, o) {
  o === void 0 && (o = e), arguments.length === 1 && (o = e, e = 0);
  for (var t = [], n = e; n < o; n++)
    t.push(n);
  return t;
}, R = function(e, o) {
  var t = 0, n = [];
  if (Z(e))
    for (; t < o; t++)
      n[t] = [].concat(e);
  else
    for (; t < o; t++)
      n[t] = e;
  return n;
}, ya = function(e) {
  return Z(e) ? e : [e];
};
function ve(e, o, t) {
  t === void 0 && (t = " ");
  var n = String(e);
  return o |= 0, n.length > o ? String(n) : ((o -= n.length) > t.length && (t += R(t, o / t.length)), t.slice(0, o) + String(n));
}
var ee = function(e, o) {
  var t = e % o;
  return t * o < 0 ? t + o : t;
}, Ae = function(e, o) {
  return { div: Math.floor(e / o), mod: ee(e, o) };
}, re = function(e) {
  return !J(e) || e.length === 0;
}, W = function(e) {
  return !re(e);
}, V = function(e, o) {
  return W(e) && e.indexOf(o) !== -1;
}, ge = function(e, o, t, n, d, a) {
  return n === void 0 && (n = 0), d === void 0 && (d = 0), a === void 0 && (a = 0), new Date(Date.UTC(e, o - 1, t, n, d, a));
}, ba = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], kt = 864e5, Et = ge(1970, 1, 1), xa = [6, 0, 1, 2, 3, 4, 5], we = function(e) {
  return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
}, Dt = function(e) {
  return e instanceof Date;
}, ke = function(e) {
  return Dt(e) && !isNaN(e.getTime());
}, He = function(e) {
  return o = Et, t = e.getTime() - o.getTime(), Math.round(t / kt);
  var o, t;
}, St = function(e) {
  return new Date(Et.getTime() + e * kt);
}, wa = function(e) {
  var o = e.getUTCMonth();
  return o === 1 && we(e.getUTCFullYear()) ? 29 : ba[o];
}, xe = function(e) {
  return xa[e.getUTCDay()];
}, et = function(e, o) {
  var t = ge(e, o + 1, 1);
  return [xe(t), wa(t)];
}, Mt = function(e, o) {
  return o = o || e, new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), o.getHours(), o.getMinutes(), o.getSeconds(), o.getMilliseconds()));
}, ze = function(e) {
  return new Date(e.getTime());
}, tt = function(e) {
  for (var o = [], t = 0; t < e.length; t++)
    o.push(ze(e[t]));
  return o;
}, Ee = function(e) {
  e.sort(function(o, t) {
    return o.getTime() - t.getTime();
  });
}, Ye = function(e, o) {
  o === void 0 && (o = !0);
  var t = new Date(e);
  return [ve(t.getUTCFullYear().toString(), 4, "0"), ve(t.getUTCMonth() + 1, 2, "0"), ve(t.getUTCDate(), 2, "0"), "T", ve(t.getUTCHours(), 2, "0"), ve(t.getUTCMinutes(), 2, "0"), ve(t.getUTCSeconds(), 2, "0"), o ? "Z" : ""].join("");
}, Fe = function(e) {
  var o = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/.exec(e);
  if (!o)
    throw new Error("Invalid UNTIL value: ".concat(e));
  return new Date(Date.UTC(parseInt(o[1], 10), parseInt(o[2], 10) - 1, parseInt(o[3], 10), parseInt(o[5], 10) || 0, parseInt(o[6], 10) || 0, parseInt(o[7], 10) || 0));
}, at = function(e, o) {
  return e.toLocaleString("sv-SE", { timeZone: o }).replace(" ", "T") + "Z";
}, be = function() {
  function e(o, t) {
    this.minDate = null, this.maxDate = null, this._result = [], this.total = 0, this.method = o, this.args = t, o === "between" ? (this.maxDate = t.inc ? t.before : new Date(t.before.getTime() - 1), this.minDate = t.inc ? t.after : new Date(t.after.getTime() + 1)) : o === "before" ? this.maxDate = t.inc ? t.dt : new Date(t.dt.getTime() - 1) : o === "after" && (this.minDate = t.inc ? t.dt : new Date(t.dt.getTime() + 1));
  }
  return e.prototype.accept = function(o) {
    ++this.total;
    var t = this.minDate && o < this.minDate, n = this.maxDate && o > this.maxDate;
    if (this.method === "between") {
      if (t)
        return !0;
      if (n)
        return !1;
    } else if (this.method === "before") {
      if (n)
        return !1;
    } else if (this.method === "after")
      return !!t || (this.add(o), !1);
    return this.add(o);
  }, e.prototype.add = function(o) {
    return this._result.push(o), !0;
  }, e.prototype.getValue = function() {
    var o = this._result;
    switch (this.method) {
      case "all":
      case "between":
        return o;
      default:
        return o.length ? o[o.length - 1] : null;
    }
  }, e.prototype.clone = function() {
    return new e(this.method, this.args);
  }, e;
}(), qe = function(e, o) {
  return qe = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, n) {
    t.__proto__ = n;
  } || function(t, n) {
    for (var d in n)
      Object.prototype.hasOwnProperty.call(n, d) && (t[d] = n[d]);
  }, qe(e, o);
};
function Ve(e, o) {
  if (typeof o != "function" && o !== null)
    throw new TypeError("Class extends value " + String(o) + " is not a constructor or null");
  function t() {
    this.constructor = e;
  }
  qe(e, o), e.prototype = o === null ? Object.create(o) : (t.prototype = o.prototype, new t());
}
var Q = function() {
  return Q = Object.assign || function(e) {
    for (var o, t = 1, n = arguments.length; t < n; t++)
      for (var d in o = arguments[t])
        Object.prototype.hasOwnProperty.call(o, d) && (e[d] = o[d]);
    return e;
  }, Q.apply(this, arguments);
};
function q(e, o, t) {
  if (t || arguments.length === 2)
    for (var n, d = 0, a = o.length; d < a; d++)
      !n && d in o || (n || (n = Array.prototype.slice.call(o, 0, d)), n[d] = o[d]);
  return e.concat(n || Array.prototype.slice.call(o));
}
var U, nt = function(e) {
  function o(t, n, d) {
    var a = e.call(this, t, n) || this;
    return a.iterator = d, a;
  }
  return Ve(o, e), o.prototype.add = function(t) {
    return !!this.iterator(t, this._result.length) && (this._result.push(t), !0);
  }, o;
}(be), De = { dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], tokens: { SKIP: /^[ \r\n\t]+|^\.$/, number: /^[1-9][0-9]*/, numberAsText: /^(one|two|three)/i, every: /^every/i, "day(s)": /^days?/i, "weekday(s)": /^weekdays?/i, "week(s)": /^weeks?/i, "hour(s)": /^hours?/i, "minute(s)": /^minutes?/i, "month(s)": /^months?/i, "year(s)": /^years?/i, on: /^(on|in)/i, at: /^(at)/i, the: /^the/i, first: /^first/i, second: /^second/i, third: /^third/i, nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i, last: /^last/i, for: /^for/i, "time(s)": /^times?/i, until: /^(un)?til/i, monday: /^mo(n(day)?)?/i, tuesday: /^tu(e(s(day)?)?)?/i, wednesday: /^we(d(n(esday)?)?)?/i, thursday: /^th(u(r(sday)?)?)?/i, friday: /^fr(i(day)?)?/i, saturday: /^sa(t(urday)?)?/i, sunday: /^su(n(day)?)?/i, january: /^jan(uary)?/i, february: /^feb(ruary)?/i, march: /^mar(ch)?/i, april: /^apr(il)?/i, may: /^may/i, june: /^june?/i, july: /^july?/i, august: /^aug(ust)?/i, september: /^sep(t(ember)?)?/i, october: /^oct(ober)?/i, november: /^nov(ember)?/i, december: /^dec(ember)?/i, comma: /^(,\s*|(and|or)\s*)+/i } }, rt = function(e, o) {
  return e.indexOf(o) !== -1;
}, ka = function(e) {
  return e.toString();
}, Ea = function(e, o, t) {
  return "".concat(o, " ").concat(t, ", ").concat(e);
}, de = function() {
  function e(o, t, n, d) {
    if (t === void 0 && (t = ka), n === void 0 && (n = De), d === void 0 && (d = Ea), this.text = [], this.language = n || De, this.gettext = t, this.dateFormatter = d, this.rrule = o, this.options = o.options, this.origOptions = o.origOptions, this.origOptions.bymonthday) {
      var a = [].concat(this.options.bymonthday), s = [].concat(this.options.bynmonthday);
      a.sort(function(_, c) {
        return _ - c;
      }), s.sort(function(_, c) {
        return c - _;
      }), this.bymonthday = a.concat(s), this.bymonthday.length || (this.bymonthday = null);
    }
    if (J(this.origOptions.byweekday)) {
      var i = Z(this.origOptions.byweekday) ? this.origOptions.byweekday : [this.origOptions.byweekday], r = String(i);
      this.byweekday = { allWeeks: i.filter(function(_) {
        return !_.n;
      }), someWeeks: i.filter(function(_) {
        return !!_.n;
      }), isWeekdays: r.indexOf("MO") !== -1 && r.indexOf("TU") !== -1 && r.indexOf("WE") !== -1 && r.indexOf("TH") !== -1 && r.indexOf("FR") !== -1 && r.indexOf("SA") === -1 && r.indexOf("SU") === -1, isEveryDay: r.indexOf("MO") !== -1 && r.indexOf("TU") !== -1 && r.indexOf("WE") !== -1 && r.indexOf("TH") !== -1 && r.indexOf("FR") !== -1 && r.indexOf("SA") !== -1 && r.indexOf("SU") !== -1 };
      var l = function(_, c) {
        return _.weekday - c.weekday;
      };
      this.byweekday.allWeeks.sort(l), this.byweekday.someWeeks.sort(l), this.byweekday.allWeeks.length || (this.byweekday.allWeeks = null), this.byweekday.someWeeks.length || (this.byweekday.someWeeks = null);
    } else
      this.byweekday = null;
  }
  return e.isFullyConvertible = function(o) {
    if (!(o.options.freq in e.IMPLEMENTED) || o.origOptions.until && o.origOptions.count)
      return !1;
    for (var t in o.origOptions) {
      if (rt(["dtstart", "tzid", "wkst", "freq"], t))
        return !0;
      if (!rt(e.IMPLEMENTED[o.options.freq], t))
        return !1;
    }
    return !0;
  }, e.prototype.isFullyConvertible = function() {
    return e.isFullyConvertible(this.rrule);
  }, e.prototype.toString = function() {
    var o = this.gettext;
    if (!(this.options.freq in e.IMPLEMENTED))
      return o("RRule error: Unable to fully convert this rrule to text");
    if (this.text = [o("every")], this[z.FREQUENCIES[this.options.freq]](), this.options.until) {
      this.add(o("until"));
      var t = this.options.until;
      this.add(this.dateFormatter(t.getUTCFullYear(), this.language.monthNames[t.getUTCMonth()], t.getUTCDate()));
    } else
      this.options.count && this.add(o("for")).add(this.options.count.toString()).add(this.plural(this.options.count) ? o("times") : o("time"));
    return this.isFullyConvertible() || this.add(o("(~ approximate)")), this.text.join("");
  }, e.prototype.HOURLY = function() {
    var o = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? o("hours") : o("hour"));
  }, e.prototype.MINUTELY = function() {
    var o = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? o("minutes") : o("minute"));
  }, e.prototype.DAILY = function() {
    var o = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()), this.byweekday && this.byweekday.isWeekdays ? this.add(this.plural(this.options.interval) ? o("weekdays") : o("weekday")) : this.add(this.plural(this.options.interval) ? o("days") : o("day")), this.origOptions.bymonth && (this.add(o("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday ? this._byweekday() : this.origOptions.byhour && this._byhour();
  }, e.prototype.WEEKLY = function() {
    var o = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? o("weeks") : o("week")), this.byweekday && this.byweekday.isWeekdays ? this.options.interval === 1 ? this.add(this.plural(this.options.interval) ? o("weekdays") : o("weekday")) : this.add(o("on")).add(o("weekdays")) : this.byweekday && this.byweekday.isEveryDay ? this.add(this.plural(this.options.interval) ? o("days") : o("day")) : (this.options.interval === 1 && this.add(o("week")), this.origOptions.bymonth && (this.add(o("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.origOptions.byhour && this._byhour());
  }, e.prototype.MONTHLY = function() {
    var o = this.gettext;
    this.origOptions.bymonth ? (this.options.interval !== 1 && (this.add(this.options.interval.toString()).add(o("months")), this.plural(this.options.interval) && this.add(o("in"))), this._bymonth()) : (this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? o("months") : o("month"))), this.bymonthday ? this._bymonthday() : this.byweekday && this.byweekday.isWeekdays ? this.add(o("on")).add(o("weekdays")) : this.byweekday && this._byweekday();
  }, e.prototype.YEARLY = function() {
    var o = this.gettext;
    this.origOptions.bymonth ? (this.options.interval !== 1 && (this.add(this.options.interval.toString()), this.add(o("years"))), this._bymonth()) : (this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? o("years") : o("year"))), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.options.byyearday && this.add(o("on the")).add(this.list(this.options.byyearday, this.nth, o("and"))).add(o("day")), this.options.byweekno && this.add(o("in")).add(this.plural(this.options.byweekno.length) ? o("weeks") : o("week")).add(this.list(this.options.byweekno, void 0, o("and")));
  }, e.prototype._bymonthday = function() {
    var o = this.gettext;
    this.byweekday && this.byweekday.allWeeks ? this.add(o("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext, o("or"))).add(o("the")).add(this.list(this.bymonthday, this.nth, o("or"))) : this.add(o("on the")).add(this.list(this.bymonthday, this.nth, o("and")));
  }, e.prototype._byweekday = function() {
    var o = this.gettext;
    this.byweekday.allWeeks && !this.byweekday.isWeekdays && this.add(o("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext)), this.byweekday.someWeeks && (this.byweekday.allWeeks && this.add(o("and")), this.add(o("on the")).add(this.list(this.byweekday.someWeeks, this.weekdaytext, o("and"))));
  }, e.prototype._byhour = function() {
    var o = this.gettext;
    this.add(o("at")).add(this.list(this.origOptions.byhour, void 0, o("and")));
  }, e.prototype._bymonth = function() {
    this.add(this.list(this.options.bymonth, this.monthtext, this.gettext("and")));
  }, e.prototype.nth = function(o) {
    var t;
    o = parseInt(o.toString(), 10);
    var n = this.gettext;
    if (o === -1)
      return n("last");
    var d = Math.abs(o);
    switch (d) {
      case 1:
      case 21:
      case 31:
        t = d + n("st");
        break;
      case 2:
      case 22:
        t = d + n("nd");
        break;
      case 3:
      case 23:
        t = d + n("rd");
        break;
      default:
        t = d + n("th");
    }
    return o < 0 ? t + " " + n("last") : t;
  }, e.prototype.monthtext = function(o) {
    return this.language.monthNames[o - 1];
  }, e.prototype.weekdaytext = function(o) {
    var t = ne(o) ? (o + 1) % 7 : o.getJsWeekday();
    return (o.n ? this.nth(o.n) + " " : "") + this.language.dayNames[t];
  }, e.prototype.plural = function(o) {
    return o % 100 != 1;
  }, e.prototype.add = function(o) {
    return this.text.push(" "), this.text.push(o), this;
  }, e.prototype.list = function(o, t, n, d) {
    var a = this;
    d === void 0 && (d = ","), Z(o) || (o = [o]), t = t || function(i) {
      return i.toString();
    };
    var s = function(i) {
      return t && t.call(a, i);
    };
    return n ? function(i, r, l) {
      for (var _ = "", c = 0; c < i.length; c++)
        c !== 0 && (c === i.length - 1 ? _ += " " + l + " " : _ += r + " "), _ += i[c];
      return _;
    }(o.map(s), d, n) : o.map(s).join(d + " ");
  }, e;
}(), Da = function() {
  function e(o) {
    this.done = !0, this.rules = o;
  }
  return e.prototype.start = function(o) {
    return this.text = o, this.done = !1, this.nextSymbol();
  }, e.prototype.isDone = function() {
    return this.done && this.symbol === null;
  }, e.prototype.nextSymbol = function() {
    var o, t;
    this.symbol = null, this.value = null;
    do {
      if (this.done)
        return !1;
      for (var n in o = null, this.rules) {
        var d = this.rules[n].exec(this.text);
        d && (o === null || d[0].length > o[0].length) && (o = d, t = n);
      }
      if (o != null && (this.text = this.text.substr(o[0].length), this.text === "" && (this.done = !0)), o == null)
        return this.done = !0, this.symbol = null, void (this.value = null);
    } while (t === "SKIP");
    return this.symbol = t, this.value = o, !0;
  }, e.prototype.accept = function(o) {
    if (this.symbol === o) {
      if (this.value) {
        var t = this.value;
        return this.nextSymbol(), t;
      }
      return this.nextSymbol(), !0;
    }
    return !1;
  }, e.prototype.acceptNumber = function() {
    return this.accept("number");
  }, e.prototype.expect = function(o) {
    if (this.accept(o))
      return !0;
    throw new Error("expected " + o + " but found " + this.symbol);
  }, e;
}();
function Nt(e, o) {
  o === void 0 && (o = De);
  var t = {}, n = new Da(o.tokens);
  return n.start(e) ? (function() {
    n.expect("every");
    var _ = n.acceptNumber();
    if (_ && (t.interval = parseInt(_[0], 10)), n.isDone())
      throw new Error("Unexpected end");
    switch (n.symbol) {
      case "day(s)":
        t.freq = z.DAILY, n.nextSymbol() && (a(), l());
        break;
      case "weekday(s)":
        t.freq = z.WEEKLY, t.byweekday = [z.MO, z.TU, z.WE, z.TH, z.FR], n.nextSymbol(), a(), l();
        break;
      case "week(s)":
        t.freq = z.WEEKLY, n.nextSymbol() && (d(), a(), l());
        break;
      case "hour(s)":
        t.freq = z.HOURLY, n.nextSymbol() && (d(), l());
        break;
      case "minute(s)":
        t.freq = z.MINUTELY, n.nextSymbol() && (d(), l());
        break;
      case "month(s)":
        t.freq = z.MONTHLY, n.nextSymbol() && (d(), l());
        break;
      case "year(s)":
        t.freq = z.YEARLY, n.nextSymbol() && (d(), l());
        break;
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        t.freq = z.WEEKLY;
        var c = n.symbol.substr(0, 2).toUpperCase();
        if (t.byweekday = [z[c]], !n.nextSymbol())
          return;
        for (; n.accept("comma"); ) {
          if (n.isDone())
            throw new Error("Unexpected end");
          var h = i();
          if (!h)
            throw new Error("Unexpected symbol " + n.symbol + ", expected weekday");
          t.byweekday.push(z[h]), n.nextSymbol();
        }
        a(), function() {
          n.accept("on"), n.accept("the");
          var f = r();
          if (f)
            for (t.bymonthday = [f], n.nextSymbol(); n.accept("comma"); ) {
              if (!(f = r()))
                throw new Error("Unexpected symbol " + n.symbol + "; expected monthday");
              t.bymonthday.push(f), n.nextSymbol();
            }
        }(), l();
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
        if (t.freq = z.YEARLY, t.bymonth = [s()], !n.nextSymbol())
          return;
        for (; n.accept("comma"); ) {
          if (n.isDone())
            throw new Error("Unexpected end");
          var p = s();
          if (!p)
            throw new Error("Unexpected symbol " + n.symbol + ", expected month");
          t.bymonth.push(p), n.nextSymbol();
        }
        d(), l();
        break;
      default:
        throw new Error("Unknown symbol");
    }
  }(), t) : null;
  function d() {
    var _ = n.accept("on"), c = n.accept("the");
    if (_ || c)
      do {
        var h = r(), p = i(), f = s();
        if (h)
          p ? (n.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(z[p].nth(h))) : (t.bymonthday || (t.bymonthday = []), t.bymonthday.push(h), n.accept("day(s)"));
        else if (p)
          n.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(z[p]);
        else if (n.symbol === "weekday(s)")
          n.nextSymbol(), t.byweekday || (t.byweekday = [z.MO, z.TU, z.WE, z.TH, z.FR]);
        else if (n.symbol === "week(s)") {
          n.nextSymbol();
          var u = n.acceptNumber();
          if (!u)
            throw new Error("Unexpected symbol " + n.symbol + ", expected week number");
          for (t.byweekno = [parseInt(u[0], 10)]; n.accept("comma"); ) {
            if (!(u = n.acceptNumber()))
              throw new Error("Unexpected symbol " + n.symbol + "; expected monthday");
            t.byweekno.push(parseInt(u[0], 10));
          }
        } else {
          if (!f)
            return;
          n.nextSymbol(), t.bymonth || (t.bymonth = []), t.bymonth.push(f);
        }
      } while (n.accept("comma") || n.accept("the") || n.accept("on"));
  }
  function a() {
    if (n.accept("at"))
      do {
        var _ = n.acceptNumber();
        if (!_)
          throw new Error("Unexpected symbol " + n.symbol + ", expected hour");
        for (t.byhour = [parseInt(_[0], 10)]; n.accept("comma"); ) {
          if (!(_ = n.acceptNumber()))
            throw new Error("Unexpected symbol " + n.symbol + "; expected hour");
          t.byhour.push(parseInt(_[0], 10));
        }
      } while (n.accept("comma") || n.accept("at"));
  }
  function s() {
    switch (n.symbol) {
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
        return !1;
    }
  }
  function i() {
    switch (n.symbol) {
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        return n.symbol.substr(0, 2).toUpperCase();
      default:
        return !1;
    }
  }
  function r() {
    switch (n.symbol) {
      case "last":
        return n.nextSymbol(), -1;
      case "first":
        return n.nextSymbol(), 1;
      case "second":
        return n.nextSymbol(), n.accept("last") ? -2 : 2;
      case "third":
        return n.nextSymbol(), n.accept("last") ? -3 : 3;
      case "nth":
        var _ = parseInt(n.value[1], 10);
        if (_ < -366 || _ > 366)
          throw new Error("Nth out of range: " + _);
        return n.nextSymbol(), n.accept("last") ? -_ : _;
      default:
        return !1;
    }
  }
  function l() {
    if (n.symbol === "until") {
      var _ = Date.parse(n.text);
      if (!_)
        throw new Error("Cannot parse until date:" + n.text);
      t.until = new Date(_);
    } else
      n.accept("for") && (t.count = parseInt(n.value[0], 10), n.expect("number"));
  }
}
function Ce(e) {
  return e < U.HOURLY;
}
(function(e) {
  e[e.YEARLY = 0] = "YEARLY", e[e.MONTHLY = 1] = "MONTHLY", e[e.WEEKLY = 2] = "WEEKLY", e[e.DAILY = 3] = "DAILY", e[e.HOURLY = 4] = "HOURLY", e[e.MINUTELY = 5] = "MINUTELY", e[e.SECONDLY = 6] = "SECONDLY";
})(U || (U = {}));
var Sa = function(e, o) {
  return o === void 0 && (o = De), new z(Nt(e, o) || void 0);
}, ye = ["count", "until", "interval", "byweekday", "bymonthday", "bymonth"];
de.IMPLEMENTED = [], de.IMPLEMENTED[U.HOURLY] = ye, de.IMPLEMENTED[U.MINUTELY] = ye, de.IMPLEMENTED[U.DAILY] = ["byhour"].concat(ye), de.IMPLEMENTED[U.WEEKLY] = ye, de.IMPLEMENTED[U.MONTHLY] = ye, de.IMPLEMENTED[U.YEARLY] = ["byweekno", "byyearday"].concat(ye);
var Ma = de.isFullyConvertible, Se = function() {
  function e(o, t, n, d) {
    this.hour = o, this.minute = t, this.second = n, this.millisecond = d || 0;
  }
  return e.prototype.getHours = function() {
    return this.hour;
  }, e.prototype.getMinutes = function() {
    return this.minute;
  }, e.prototype.getSeconds = function() {
    return this.second;
  }, e.prototype.getMilliseconds = function() {
    return this.millisecond;
  }, e.prototype.getTime = function() {
    return 1e3 * (60 * this.hour * 60 + 60 * this.minute + this.second) + this.millisecond;
  }, e;
}(), Na = function(e) {
  function o(t, n, d, a, s, i, r) {
    var l = e.call(this, a, s, i, r) || this;
    return l.year = t, l.month = n, l.day = d, l;
  }
  return Ve(o, e), o.fromDate = function(t) {
    return new this(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.valueOf() % 1e3);
  }, o.prototype.getWeekday = function() {
    return xe(new Date(this.getTime()));
  }, o.prototype.getTime = function() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
  }, o.prototype.getDay = function() {
    return this.day;
  }, o.prototype.getMonth = function() {
    return this.month;
  }, o.prototype.getYear = function() {
    return this.year;
  }, o.prototype.addYears = function(t) {
    this.year += t;
  }, o.prototype.addMonths = function(t) {
    if (this.month += t, this.month > 12) {
      var n = Math.floor(this.month / 12), d = ee(this.month, 12);
      this.month = d, this.year += n, this.month === 0 && (this.month = 12, --this.year);
    }
  }, o.prototype.addWeekly = function(t, n) {
    n > this.getWeekday() ? this.day += -(this.getWeekday() + 1 + (6 - n)) + 7 * t : this.day += -(this.getWeekday() - n) + 7 * t, this.fixDay();
  }, o.prototype.addDaily = function(t) {
    this.day += t, this.fixDay();
  }, o.prototype.addHours = function(t, n, d) {
    for (n && (this.hour += Math.floor((23 - this.hour) / t) * t); ; ) {
      this.hour += t;
      var a = Ae(this.hour, 24), s = a.div, i = a.mod;
      if (s && (this.hour = i, this.addDaily(s)), re(d) || V(d, this.hour))
        break;
    }
  }, o.prototype.addMinutes = function(t, n, d, a) {
    for (n && (this.minute += Math.floor((1439 - (60 * this.hour + this.minute)) / t) * t); ; ) {
      this.minute += t;
      var s = Ae(this.minute, 60), i = s.div, r = s.mod;
      if (i && (this.minute = r, this.addHours(i, !1, d)), (re(d) || V(d, this.hour)) && (re(a) || V(a, this.minute)))
        break;
    }
  }, o.prototype.addSeconds = function(t, n, d, a, s) {
    for (n && (this.second += Math.floor((86399 - (3600 * this.hour + 60 * this.minute + this.second)) / t) * t); ; ) {
      this.second += t;
      var i = Ae(this.second, 60), r = i.div, l = i.mod;
      if (r && (this.second = l, this.addMinutes(r, !1, d, a)), (re(d) || V(d, this.hour)) && (re(a) || V(a, this.minute)) && (re(s) || V(s, this.second)))
        break;
    }
  }, o.prototype.fixDay = function() {
    if (!(this.day <= 28)) {
      var t = et(this.year, this.month - 1)[1];
      if (!(this.day <= t))
        for (; this.day > t; ) {
          if (this.day -= t, ++this.month, this.month === 13 && (this.month = 1, ++this.year, this.year > 9999))
            return;
          t = et(this.year, this.month - 1)[1];
        }
    }
  }, o.prototype.add = function(t, n) {
    var d = t.freq, a = t.interval, s = t.wkst, i = t.byhour, r = t.byminute, l = t.bysecond;
    switch (d) {
      case U.YEARLY:
        return this.addYears(a);
      case U.MONTHLY:
        return this.addMonths(a);
      case U.WEEKLY:
        return this.addWeekly(a, s);
      case U.DAILY:
        return this.addDaily(a);
      case U.HOURLY:
        return this.addHours(a, n, i);
      case U.MINUTELY:
        return this.addMinutes(a, n, i, r);
      case U.SECONDLY:
        return this.addSeconds(a, n, i, r, l);
    }
  }, o;
}(Se);
function Tt(e) {
  for (var o = [], t = 0, n = Object.keys(e); t < n.length; t++) {
    var d = n[t];
    V(Xa, d) || o.push(d), Dt(e[d]) && !ke(e[d]) && o.push(d);
  }
  if (o.length)
    throw new Error("Invalid options: " + o.join(", "));
  return Q({}, e);
}
function Ta(e) {
  var o = Q(Q({}, Be), Tt(e));
  if (J(o.byeaster) && (o.freq = z.YEARLY), !J(o.freq) || !z.FREQUENCIES[o.freq])
    throw new Error("Invalid frequency: ".concat(o.freq, " ").concat(e.freq));
  if (o.dtstart || (o.dtstart = new Date((/* @__PURE__ */ new Date()).setMilliseconds(0))), J(o.wkst) ? ne(o.wkst) || (o.wkst = o.wkst.weekday) : o.wkst = z.MO.weekday, J(o.bysetpos)) {
    ne(o.bysetpos) && (o.bysetpos = [o.bysetpos]);
    for (var t = 0; t < o.bysetpos.length; t++)
      if ((a = o.bysetpos[t]) === 0 || !(a >= -366 && a <= 366))
        throw new Error("bysetpos must be between 1 and 366, or between -366 and -1");
  }
  if (!(o.byweekno || W(o.byweekno) || W(o.byyearday) || o.bymonthday || W(o.bymonthday) || J(o.byweekday) || J(o.byeaster)))
    switch (o.freq) {
      case z.YEARLY:
        o.bymonth || (o.bymonth = o.dtstart.getUTCMonth() + 1), o.bymonthday = o.dtstart.getUTCDate();
        break;
      case z.MONTHLY:
        o.bymonthday = o.dtstart.getUTCDate();
        break;
      case z.WEEKLY:
        o.byweekday = [xe(o.dtstart)];
    }
  if (J(o.bymonth) && !Z(o.bymonth) && (o.bymonth = [o.bymonth]), J(o.byyearday) && !Z(o.byyearday) && ne(o.byyearday) && (o.byyearday = [o.byyearday]), J(o.bymonthday))
    if (Z(o.bymonthday)) {
      var n = [], d = [];
      for (t = 0; t < o.bymonthday.length; t++) {
        var a;
        (a = o.bymonthday[t]) > 0 ? n.push(a) : a < 0 && d.push(a);
      }
      o.bymonthday = n, o.bynmonthday = d;
    } else
      o.bymonthday < 0 ? (o.bynmonthday = [o.bymonthday], o.bymonthday = []) : (o.bynmonthday = [], o.bymonthday = [o.bymonthday]);
  else
    o.bymonthday = [], o.bynmonthday = [];
  if (J(o.byweekno) && !Z(o.byweekno) && (o.byweekno = [o.byweekno]), J(o.byweekday))
    if (ne(o.byweekday))
      o.byweekday = [o.byweekday], o.bynweekday = null;
    else if (Qe(o.byweekday))
      o.byweekday = [X.fromStr(o.byweekday).weekday], o.bynweekday = null;
    else if (o.byweekday instanceof X)
      !o.byweekday.n || o.freq > z.MONTHLY ? (o.byweekday = [o.byweekday.weekday], o.bynweekday = null) : (o.bynweekday = [[o.byweekday.weekday, o.byweekday.n]], o.byweekday = null);
    else {
      var s = [], i = [];
      for (t = 0; t < o.byweekday.length; t++) {
        var r = o.byweekday[t];
        ne(r) ? s.push(r) : Qe(r) ? s.push(X.fromStr(r).weekday) : !r.n || o.freq > z.MONTHLY ? s.push(r.weekday) : i.push([r.weekday, r.n]);
      }
      o.byweekday = W(s) ? s : null, o.bynweekday = W(i) ? i : null;
    }
  else
    o.bynweekday = null;
  return J(o.byhour) ? ne(o.byhour) && (o.byhour = [o.byhour]) : o.byhour = o.freq < z.HOURLY ? [o.dtstart.getUTCHours()] : null, J(o.byminute) ? ne(o.byminute) && (o.byminute = [o.byminute]) : o.byminute = o.freq < z.MINUTELY ? [o.dtstart.getUTCMinutes()] : null, J(o.bysecond) ? ne(o.bysecond) && (o.bysecond = [o.bysecond]) : o.bysecond = o.freq < z.SECONDLY ? [o.dtstart.getUTCSeconds()] : null, { parsedOptions: o };
}
function je(e) {
  var o = e.split(`
`).map(Aa).filter(function(t) {
    return t !== null;
  });
  return Q(Q({}, o[0]), o[1]);
}
function Me(e) {
  var o = {}, t = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(e);
  if (!t)
    return o;
  var n = t[1], d = t[2];
  return n && (o.tzid = n), o.dtstart = Fe(d), o;
}
function Aa(e) {
  if (!(e = e.replace(/^\s+|\s+$/, "")).length)
    return null;
  var o = /^([A-Z]+?)[:;]/.exec(e.toUpperCase());
  if (!o)
    return it(e);
  var t = o[1];
  switch (t.toUpperCase()) {
    case "RRULE":
    case "EXRULE":
      return it(e);
    case "DTSTART":
      return Me(e);
    default:
      throw new Error("Unsupported RFC prop ".concat(t, " in ").concat(e));
  }
}
function it(e) {
  var o = Me(e.replace(/^RRULE:/i, ""));
  return e.replace(/^(?:RRULE|EXRULE):/i, "").split(";").forEach(function(t) {
    var n = t.split("="), d = n[0], a = n[1];
    switch (d.toUpperCase()) {
      case "FREQ":
        o.freq = U[a.toUpperCase()];
        break;
      case "WKST":
        o.wkst = te[a.toUpperCase()];
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
        var s = function(l) {
          return l.indexOf(",") !== -1 ? l.split(",").map(ot) : ot(l);
        }(a), i = d.toLowerCase();
        o[i] = s;
        break;
      case "BYWEEKDAY":
      case "BYDAY":
        o.byweekday = function(l) {
          var _ = l.split(",");
          return _.map(function(c) {
            if (c.length === 2)
              return te[c];
            var h = c.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
            if (!h || h.length < 3)
              throw new SyntaxError("Invalid weekday string: ".concat(c));
            var p = Number(h[1]), f = h[2], u = te[f].weekday;
            return new X(u, p);
          });
        }(a);
        break;
      case "DTSTART":
      case "TZID":
        var r = Me(e);
        o.tzid = r.tzid, o.dtstart = r.dtstart;
        break;
      case "UNTIL":
        o.until = Fe(a);
        break;
      case "BYEASTER":
        o.byeaster = Number(a);
        break;
      default:
        throw new Error("Unknown RRULE property '" + d + "'");
    }
  }), o;
}
function ot(e) {
  return /^[+-]?\d+$/.test(e) ? Number(e) : e;
}
var Ne = function() {
  function e(o, t) {
    if (isNaN(o.getTime()))
      throw new RangeError("Invalid date passed to DateWithZone");
    this.date = o, this.tzid = t;
  }
  return Object.defineProperty(e.prototype, "isUTC", { get: function() {
    return !this.tzid || this.tzid.toUpperCase() === "UTC";
  }, enumerable: !1, configurable: !0 }), e.prototype.toString = function() {
    var o = Ye(this.date.getTime(), this.isUTC);
    return this.isUTC ? ":".concat(o) : ";TZID=".concat(this.tzid, ":").concat(o);
  }, e.prototype.getTime = function() {
    return this.date.getTime();
  }, e.prototype.rezonedDate = function() {
    return this.isUTC ? this.date : (o = this.date, t = this.tzid, n = Intl.DateTimeFormat().resolvedOptions().timeZone, d = new Date(at(o, n)), a = new Date(at(o, t ?? "UTC")).getTime() - d.getTime(), new Date(o.getTime() - a));
    var o, t, n, d, a;
  }, e;
}();
function Ie(e) {
  for (var o = [], t = "", n = Object.keys(e), d = Object.keys(Be), a = 0; a < n.length; a++)
    if (n[a] !== "tzid" && V(d, n[a])) {
      var s = n[a].toUpperCase(), i = e[n[a]], r = "";
      if (J(i) && (!Z(i) || i.length)) {
        switch (s) {
          case "FREQ":
            r = z.FREQUENCIES[e.freq];
            break;
          case "WKST":
            r = ne(i) ? new X(i).toString() : i.toString();
            break;
          case "BYWEEKDAY":
            s = "BYDAY", r = ya(i).map(function(p) {
              return p instanceof X ? p : Z(p) ? new X(p[0], p[1]) : new X(p);
            }).toString();
            break;
          case "DTSTART":
            t = Ca(i, e.tzid);
            break;
          case "UNTIL":
            r = Ye(i, !e.tzid);
            break;
          default:
            if (Z(i)) {
              for (var l = [], _ = 0; _ < i.length; _++)
                l[_] = String(i[_]);
              r = l.toString();
            } else
              r = String(i);
        }
        r && o.push([s, r]);
      }
    }
  var c = o.map(function(p) {
    var f = p[0], u = p[1];
    return "".concat(f, "=").concat(u.toString());
  }).join(";"), h = "";
  return c !== "" && (h = "RRULE:".concat(c)), [t, h].filter(function(p) {
    return !!p;
  }).join(`
`);
}
function Ca(e, o) {
  return e ? "DTSTART" + new Ne(new Date(e), o).toString() : "";
}
function Oa(e, o) {
  return Array.isArray(e) ? !!Array.isArray(o) && e.length === o.length && e.every(function(t, n) {
    return t.getTime() === o[n].getTime();
  }) : e instanceof Date ? o instanceof Date && e.getTime() === o.getTime() : e === o;
}
var La = function() {
  function e() {
    this.all = !1, this.before = [], this.after = [], this.between = [];
  }
  return e.prototype._cacheAdd = function(o, t, n) {
    t && (t = t instanceof Date ? ze(t) : tt(t)), o === "all" ? this.all = t : (n._value = t, this[o].push(n));
  }, e.prototype._cacheGet = function(o, t) {
    var n = !1, d = t ? Object.keys(t) : [], a = function(_) {
      for (var c = 0; c < d.length; c++) {
        var h = d[c];
        if (!Oa(t[h], _[h]))
          return !0;
      }
      return !1;
    }, s = this[o];
    if (o === "all")
      n = this.all;
    else if (Z(s))
      for (var i = 0; i < s.length; i++) {
        var r = s[i];
        if (!d.length || !a(r)) {
          n = r._value;
          break;
        }
      }
    if (!n && this.all) {
      var l = new be(o, t);
      for (i = 0; i < this.all.length && l.accept(this.all[i]); i++)
        ;
      n = l.getValue(), this._cacheAdd(o, n, t);
    }
    return Z(n) ? tt(n) : n instanceof Date ? ze(n) : n;
  }, e;
}(), $a = q(q(q(q(q(q(q(q(q(q(q(q(q([], R(1, 31), !0), R(2, 28), !0), R(3, 31), !0), R(4, 30), !0), R(5, 31), !0), R(6, 30), !0), R(7, 31), !0), R(8, 31), !0), R(9, 30), !0), R(10, 31), !0), R(11, 30), !0), R(12, 31), !0), R(1, 7), !0), Ha = q(q(q(q(q(q(q(q(q(q(q(q(q([], R(1, 31), !0), R(2, 29), !0), R(3, 31), !0), R(4, 30), !0), R(5, 31), !0), R(6, 30), !0), R(7, 31), !0), R(8, 31), !0), R(9, 30), !0), R(10, 31), !0), R(11, 30), !0), R(12, 31), !0), R(1, 7), !0), za = ie(1, 29), qa = ie(1, 30), ue = ie(1, 31), K = ie(1, 32), ja = q(q(q(q(q(q(q(q(q(q(q(q(q([], K, !0), qa, !0), K, !0), ue, !0), K, !0), ue, !0), K, !0), K, !0), ue, !0), K, !0), ue, !0), K, !0), K.slice(0, 7), !0), Ia = q(q(q(q(q(q(q(q(q(q(q(q(q([], K, !0), za, !0), K, !0), ue, !0), K, !0), ue, !0), K, !0), K, !0), ue, !0), K, !0), ue, !0), K, !0), K.slice(0, 7), !0), Pa = ie(-28, 0), Ra = ie(-29, 0), fe = ie(-30, 0), G = ie(-31, 0), Ua = q(q(q(q(q(q(q(q(q(q(q(q(q([], G, !0), Ra, !0), G, !0), fe, !0), G, !0), fe, !0), G, !0), G, !0), fe, !0), G, !0), fe, !0), G, !0), G.slice(0, 7), !0), Ya = q(q(q(q(q(q(q(q(q(q(q(q(q([], G, !0), Pa, !0), G, !0), fe, !0), G, !0), fe, !0), G, !0), G, !0), fe, !0), G, !0), fe, !0), G, !0), G.slice(0, 7), !0), Fa = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366], Va = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], st = function() {
  for (var e = [], o = 0; o < 55; o++)
    e = e.concat(ie(7));
  return e;
}();
function Ba(e, o) {
  var t, n, d = ge(e, 1, 1), a = we(e) ? 366 : 365, s = we(e + 1) ? 366 : 365, i = He(d), r = xe(d), l = Q(Q({ yearlen: a, nextyearlen: s, yearordinal: i, yearweekday: r }, function(T) {
    var g = we(T) ? 366 : 365, b = ge(T, 1, 1), y = xe(b);
    return g === 365 ? { mmask: $a, mdaymask: Ia, nmdaymask: Ya, wdaymask: st.slice(y), mrange: Va } : { mmask: Ha, mdaymask: ja, nmdaymask: Ua, wdaymask: st.slice(y), mrange: Fa };
  }(e)), { wnomask: null });
  if (re(o.byweekno))
    return l;
  l.wnomask = R(0, a + 7);
  var _ = t = ee(7 - r + o.wkst, 7);
  _ >= 4 ? (_ = 0, n = l.yearlen + ee(r - o.wkst, 7)) : n = a - _;
  for (var c = Math.floor(n / 7), h = ee(n, 7), p = Math.floor(c + h / 4), f = 0; f < o.byweekno.length; f++) {
    var u = o.byweekno[f];
    if (u < 0 && (u += p + 1), u > 0 && u <= p) {
      var v = void 0;
      u > 1 ? (v = _ + 7 * (u - 1), _ !== t && (v -= 7 - t)) : v = _;
      for (var m = 0; m < 7 && (l.wnomask[v] = 1, v++, l.wdaymask[v] !== o.wkst); m++)
        ;
    }
  }
  if (V(o.byweekno, 1) && (v = _ + 7 * p, _ !== t && (v -= 7 - t), v < a))
    for (f = 0; f < 7 && (l.wnomask[v] = 1, v += 1, l.wdaymask[v] !== o.wkst); f++)
      ;
  if (_) {
    var x = void 0;
    if (V(o.byweekno, -1))
      x = -1;
    else {
      var w = xe(ge(e - 1, 1, 1)), S = ee(7 - w.valueOf() + o.wkst, 7), N = we(e - 1) ? 366 : 365, E = void 0;
      S >= 4 ? (S = 0, E = N + ee(w - o.wkst, 7)) : E = a - _, x = Math.floor(52 + ee(E, 7) / 4);
    }
    if (V(o.byweekno, x))
      for (v = 0; v < _; v++)
        l.wnomask[v] = 1;
  }
  return l;
}
var Ja = function() {
  function e(o) {
    this.options = o;
  }
  return e.prototype.rebuild = function(o, t) {
    var n = this.options;
    if (o !== this.lastyear && (this.yearinfo = Ba(o, n)), W(n.bynweekday) && (t !== this.lastmonth || o !== this.lastyear)) {
      var d = this.yearinfo, a = d.yearlen, s = d.mrange, i = d.wdaymask;
      this.monthinfo = function(r, l, _, c, h, p) {
        var f = { lastyear: r, lastmonth: l, nwdaymask: [] }, u = [];
        if (p.freq === z.YEARLY)
          if (re(p.bymonth))
            u = [[0, _]];
          else
            for (var v = 0; v < p.bymonth.length; v++)
              l = p.bymonth[v], u.push(c.slice(l - 1, l + 1));
        else
          p.freq === z.MONTHLY && (u = [c.slice(l - 1, l + 1)]);
        if (re(u))
          return f;
        for (f.nwdaymask = R(0, _), v = 0; v < u.length; v++)
          for (var m = u[v], x = m[0], w = m[1] - 1, S = 0; S < p.bynweekday.length; S++) {
            var N = void 0, E = p.bynweekday[S], T = E[0], g = E[1];
            g < 0 ? (N = w + 7 * (g + 1), N -= ee(h[N] - T, 7)) : (N = x + 7 * (g - 1), N += ee(7 - h[N] + T, 7)), x <= N && N <= w && (f.nwdaymask[N] = 1);
          }
        return f;
      }(o, t, a, s, i, n);
    }
    J(n.byeaster) && (this.eastermask = function(r, l) {
      l === void 0 && (l = 0);
      var _ = r % 19, c = Math.floor(r / 100), h = r % 100, p = Math.floor(c / 4), f = c % 4, u = Math.floor((c + 8) / 25), v = Math.floor((c - u + 1) / 3), m = Math.floor(19 * _ + c - p - v + 15) % 30, x = Math.floor(h / 4), w = h % 4, S = Math.floor(32 + 2 * f + 2 * x - m - w) % 7, N = Math.floor((_ + 11 * m + 22 * S) / 451), E = Math.floor((m + S - 7 * N + 114) / 31), T = (m + S - 7 * N + 114) % 31 + 1, g = Date.UTC(r, E - 1, T + l), b = Date.UTC(r, 0, 1);
      return [Math.ceil((g - b) / 864e5)];
    }(o, n.byeaster));
  }, Object.defineProperty(e.prototype, "lastyear", { get: function() {
    return this.monthinfo ? this.monthinfo.lastyear : null;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "lastmonth", { get: function() {
    return this.monthinfo ? this.monthinfo.lastmonth : null;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "yearlen", { get: function() {
    return this.yearinfo.yearlen;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "yearordinal", { get: function() {
    return this.yearinfo.yearordinal;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "mrange", { get: function() {
    return this.yearinfo.mrange;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "wdaymask", { get: function() {
    return this.yearinfo.wdaymask;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "mmask", { get: function() {
    return this.yearinfo.mmask;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "wnomask", { get: function() {
    return this.yearinfo.wnomask;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "nwdaymask", { get: function() {
    return this.monthinfo ? this.monthinfo.nwdaymask : [];
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "nextyearlen", { get: function() {
    return this.yearinfo.nextyearlen;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "mdaymask", { get: function() {
    return this.yearinfo.mdaymask;
  }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "nmdaymask", { get: function() {
    return this.yearinfo.nmdaymask;
  }, enumerable: !1, configurable: !0 }), e.prototype.ydayset = function() {
    return [ie(this.yearlen), 0, this.yearlen];
  }, e.prototype.mdayset = function(o, t) {
    for (var n = this.mrange[t - 1], d = this.mrange[t], a = R(null, this.yearlen), s = n; s < d; s++)
      a[s] = s;
    return [a, n, d];
  }, e.prototype.wdayset = function(o, t, n) {
    for (var d = R(null, this.yearlen + 7), a = He(ge(o, t, n)) - this.yearordinal, s = a, i = 0; i < 7 && (d[a] = a, ++a, this.wdaymask[a] !== this.options.wkst); i++)
      ;
    return [d, s, a];
  }, e.prototype.ddayset = function(o, t, n) {
    var d = R(null, this.yearlen), a = He(ge(o, t, n)) - this.yearordinal;
    return d[a] = a, [d, a, a + 1];
  }, e.prototype.htimeset = function(o, t, n, d) {
    var a = this, s = [];
    return this.options.byminute.forEach(function(i) {
      s = s.concat(a.mtimeset(o, i, n, d));
    }), Ee(s), s;
  }, e.prototype.mtimeset = function(o, t, n, d) {
    var a = this.options.bysecond.map(function(s) {
      return new Se(o, t, s, d);
    });
    return Ee(a), a;
  }, e.prototype.stimeset = function(o, t, n, d) {
    return [new Se(o, t, n, d)];
  }, e.prototype.getdayset = function(o) {
    switch (o) {
      case U.YEARLY:
        return this.ydayset.bind(this);
      case U.MONTHLY:
        return this.mdayset.bind(this);
      case U.WEEKLY:
        return this.wdayset.bind(this);
      case U.DAILY:
      default:
        return this.ddayset.bind(this);
    }
  }, e.prototype.gettimeset = function(o) {
    switch (o) {
      case U.HOURLY:
        return this.htimeset.bind(this);
      case U.MINUTELY:
        return this.mtimeset.bind(this);
      case U.SECONDLY:
        return this.stimeset.bind(this);
    }
  }, e;
}();
function Wa(e, o, t, n, d, a) {
  for (var s = [], i = 0; i < e.length; i++) {
    var r = void 0, l = void 0, _ = e[i];
    _ < 0 ? (r = Math.floor(_ / o.length), l = ee(_, o.length)) : (r = Math.floor((_ - 1) / o.length), l = ee(_ - 1, o.length));
    for (var c = [], h = t; h < n; h++) {
      var p = a[h];
      J(p) && c.push(p);
    }
    var f = void 0;
    f = r < 0 ? c.slice(r)[0] : c[r];
    var u = o[l], v = St(d.yearordinal + f), m = Mt(v, u);
    V(s, m) || s.push(m);
  }
  return Ee(s), s;
}
function At(e, o) {
  var t = o.dtstart, n = o.freq, d = o.interval, a = o.until, s = o.bysetpos, i = o.count;
  if (i === 0 || d === 0)
    return se(e);
  var r = Na.fromDate(t), l = new Ja(o);
  l.rebuild(r.year, r.month);
  for (var _ = function(g, b, y) {
    var k = y.freq, D = y.byhour, M = y.byminute, C = y.bysecond;
    return Ce(k) ? function(A) {
      var $ = A.dtstart.getTime() % 1e3;
      if (!Ce(A.freq))
        return [];
      var H = [];
      return A.byhour.forEach(function(O) {
        A.byminute.forEach(function(j) {
          A.bysecond.forEach(function(F) {
            H.push(new Se(O, j, F, $));
          });
        });
      }), H;
    }(y) : k >= z.HOURLY && W(D) && !V(D, b.hour) || k >= z.MINUTELY && W(M) && !V(M, b.minute) || k >= z.SECONDLY && W(C) && !V(C, b.second) ? [] : g.gettimeset(k)(b.hour, b.minute, b.second, b.millisecond);
  }(l, r, o); ; ) {
    var c = l.getdayset(n)(r.year, r.month, r.day), h = c[0], p = c[1], f = c[2], u = Ga(h, p, f, l, o);
    if (W(s))
      for (var v = Wa(s, _, p, f, l, h), m = 0; m < v.length; m++) {
        var x = v[m];
        if (a && x > a)
          return se(e);
        if (x >= t) {
          var w = dt(x, o);
          if (!e.accept(w) || i && !--i)
            return se(e);
        }
      }
    else
      for (m = p; m < f; m++) {
        var S = h[m];
        if (J(S))
          for (var N = St(l.yearordinal + S), E = 0; E < _.length; E++) {
            var T = _[E];
            if (x = Mt(N, T), a && x > a || x >= t && (w = dt(x, o), !e.accept(w) || i && !--i))
              return se(e);
          }
      }
    if (o.interval === 0 || (r.add(o, u), r.year > 9999))
      return se(e);
    Ce(n) || (_ = l.gettimeset(n)(r.hour, r.minute, r.second, 0)), l.rebuild(r.year, r.month);
  }
}
function Ka(e, o, t) {
  var n = t.bymonth, d = t.byweekno, a = t.byweekday, s = t.byeaster, i = t.bymonthday, r = t.bynmonthday, l = t.byyearday;
  return W(n) && !V(n, e.mmask[o]) || W(d) && !e.wnomask[o] || W(a) && !V(a, e.wdaymask[o]) || W(e.nwdaymask) && !e.nwdaymask[o] || s !== null && !V(e.eastermask, o) || (W(i) || W(r)) && !V(i, e.mdaymask[o]) && !V(r, e.nmdaymask[o]) || W(l) && (o < e.yearlen && !V(l, o + 1) && !V(l, -e.yearlen + o) || o >= e.yearlen && !V(l, o + 1 - e.yearlen) && !V(l, -e.nextyearlen + o - e.yearlen));
}
function dt(e, o) {
  return new Ne(e, o.tzid).rezonedDate();
}
function se(e) {
  return e.getValue();
}
function Ga(e, o, t, n, d) {
  for (var a = !1, s = o; s < t; s++) {
    var i = e[s];
    (a = Ka(n, i, d)) && (e[i] = null);
  }
  return a;
}
var te = { MO: new X(0), TU: new X(1), WE: new X(2), TH: new X(3), FR: new X(4), SA: new X(5), SU: new X(6) }, Be = { freq: U.YEARLY, dtstart: null, interval: 1, wkst: te.MO, count: null, until: null, tzid: null, bysetpos: null, bymonth: null, bymonthday: null, bynmonthday: null, byyearday: null, byweekno: null, byweekday: null, bynweekday: null, byhour: null, byminute: null, bysecond: null, byeaster: null }, Xa = Object.keys(Be), z = function() {
  function e(o, t) {
    o === void 0 && (o = {}), t === void 0 && (t = !1), this._cache = t ? null : new La(), this.origOptions = Tt(o);
    var n = Ta(o).parsedOptions;
    this.options = n;
  }
  return e.parseText = function(o, t) {
    return Nt(o, t);
  }, e.fromText = function(o, t) {
    return Sa(o, t);
  }, e.fromString = function(o) {
    return new e(e.parseString(o) || void 0);
  }, e.prototype._iter = function(o) {
    return At(o, this.options);
  }, e.prototype._cacheGet = function(o, t) {
    return !!this._cache && this._cache._cacheGet(o, t);
  }, e.prototype._cacheAdd = function(o, t, n) {
    if (this._cache)
      return this._cache._cacheAdd(o, t, n);
  }, e.prototype.all = function(o) {
    if (o)
      return this._iter(new nt("all", {}, o));
    var t = this._cacheGet("all");
    return t === !1 && (t = this._iter(new be("all", {})), this._cacheAdd("all", t)), t;
  }, e.prototype.between = function(o, t, n, d) {
    if (n === void 0 && (n = !1), !ke(o) || !ke(t))
      throw new Error("Invalid date passed in to RRule.between");
    var a = { before: t, after: o, inc: n };
    if (d)
      return this._iter(new nt("between", a, d));
    var s = this._cacheGet("between", a);
    return s === !1 && (s = this._iter(new be("between", a)), this._cacheAdd("between", s, a)), s;
  }, e.prototype.before = function(o, t) {
    if (t === void 0 && (t = !1), !ke(o))
      throw new Error("Invalid date passed in to RRule.before");
    var n = { dt: o, inc: t }, d = this._cacheGet("before", n);
    return d === !1 && (d = this._iter(new be("before", n)), this._cacheAdd("before", d, n)), d;
  }, e.prototype.after = function(o, t) {
    if (t === void 0 && (t = !1), !ke(o))
      throw new Error("Invalid date passed in to RRule.after");
    var n = { dt: o, inc: t }, d = this._cacheGet("after", n);
    return d === !1 && (d = this._iter(new be("after", n)), this._cacheAdd("after", d, n)), d;
  }, e.prototype.count = function() {
    return this.all().length;
  }, e.prototype.toString = function() {
    return Ie(this.origOptions);
  }, e.prototype.toText = function(o, t, n) {
    return function(d, a, s, i) {
      return new de(d, a, s, i).toString();
    }(this, o, t, n);
  }, e.prototype.isFullyConvertibleToText = function() {
    return Ma(this);
  }, e.prototype.clone = function() {
    return new e(this.origOptions);
  }, e.FREQUENCIES = ["YEARLY", "MONTHLY", "WEEKLY", "DAILY", "HOURLY", "MINUTELY", "SECONDLY"], e.YEARLY = U.YEARLY, e.MONTHLY = U.MONTHLY, e.WEEKLY = U.WEEKLY, e.DAILY = U.DAILY, e.HOURLY = U.HOURLY, e.MINUTELY = U.MINUTELY, e.SECONDLY = U.SECONDLY, e.MO = te.MO, e.TU = te.TU, e.WE = te.WE, e.TH = te.TH, e.FR = te.FR, e.SA = te.SA, e.SU = te.SU, e.parseString = je, e.optionsToString = Ie, e;
}(), _t = { dtstart: null, cache: !1, unfold: !1, forceset: !1, compatible: !1, tzid: null };
function Za(e, o) {
  var t = [], n = [], d = [], a = [], s = Me(e), i = s.dtstart, r = s.tzid, l = function(_, c) {
    if (c === void 0 && (c = !1), _ = _ && _.trim(), !_)
      throw new Error("Invalid empty string");
    if (!c)
      return _.split(/\s/);
    for (var h = _.split(`
`), p = 0; p < h.length; ) {
      var f = h[p] = h[p].replace(/\s+$/g, "");
      f ? p > 0 && f[0] === " " ? (h[p - 1] += f.slice(1), h.splice(p, 1)) : p += 1 : h.splice(p, 1);
    }
    return h;
  }(e, o.unfold);
  return l.forEach(function(_) {
    var c;
    if (_) {
      var h = function(m) {
        var x = function(E) {
          if (E.indexOf(":") === -1)
            return { name: "RRULE", value: E };
          var T = (y = E, k = ":", D = 1, M = y.split(k), D ? M.slice(0, D).concat([M.slice(D).join(k)]) : M), g = T[0], b = T[1], y, k, D, M;
          return { name: g, value: b };
        }(m), w = x.name, S = x.value, N = w.split(";");
        if (!N)
          throw new Error("empty property name");
        return { name: N[0].toUpperCase(), parms: N.slice(1), value: S };
      }(_), p = h.name, f = h.parms, u = h.value;
      switch (p.toUpperCase()) {
        case "RRULE":
          if (f.length)
            throw new Error("unsupported RRULE parm: ".concat(f.join(",")));
          t.push(je(_));
          break;
        case "RDATE":
          var v = ((c = /RDATE(?:;TZID=([^:=]+))?/i.exec(_)) !== null && c !== void 0 ? c : [])[1];
          v && !r && (r = v), n = n.concat(lt(u, f));
          break;
        case "EXRULE":
          if (f.length)
            throw new Error("unsupported EXRULE parm: ".concat(f.join(",")));
          d.push(je(u));
          break;
        case "EXDATE":
          a = a.concat(lt(u, f));
          break;
        case "DTSTART":
          break;
        default:
          throw new Error("unsupported property: " + p);
      }
    }
  }), { dtstart: i, tzid: r, rrulevals: t, rdatevals: n, exrulevals: d, exdatevals: a };
}
function pe(e, o) {
  return o === void 0 && (o = {}), function(t, n) {
    var d = Za(t, n), a = d.rrulevals, s = d.rdatevals, i = d.exrulevals, r = d.exdatevals, l = d.dtstart, _ = d.tzid, c = n.cache === !1;
    if (n.compatible && (n.forceset = !0, n.unfold = !0), n.forceset || a.length > 1 || s.length || i.length || r.length) {
      var h = new Qa(c);
      return h.dtstart(l), h.tzid(_ || void 0), a.forEach(function(f) {
        h.rrule(new z(Oe(f, l, _), c));
      }), s.forEach(function(f) {
        h.rdate(f);
      }), i.forEach(function(f) {
        h.exrule(new z(Oe(f, l, _), c));
      }), r.forEach(function(f) {
        h.exdate(f);
      }), n.compatible && n.dtstart && h.rdate(l), h;
    }
    var p = a[0] || {};
    return new z(Oe(p, p.dtstart || n.dtstart || l, p.tzid || n.tzid || _), c);
  }(e, function(t) {
    var n = [], d = Object.keys(t), a = Object.keys(_t);
    if (d.forEach(function(s) {
      V(a, s) || n.push(s);
    }), n.length)
      throw new Error("Invalid options: " + n.join(", "));
    return Q(Q({}, _t), t);
  }(o));
}
function Oe(e, o, t) {
  return Q(Q({}, e), { dtstart: o, tzid: t });
}
function lt(e, o) {
  return function(t) {
    t.forEach(function(n) {
      if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(n))
        throw new Error("unsupported RDATE/EXDATE parm: " + n);
    });
  }(o), e.split(",").map(function(t) {
    return Fe(t);
  });
}
function ct(e) {
  var o = this;
  return function(t) {
    if (t !== void 0 && (o["_".concat(e)] = t), o["_".concat(e)] !== void 0)
      return o["_".concat(e)];
    for (var n = 0; n < o._rrule.length; n++) {
      var d = o._rrule[n].origOptions[e];
      if (d)
        return d;
    }
  };
}
var Qa = function(e) {
  function o(t) {
    t === void 0 && (t = !1);
    var n = e.call(this, {}, t) || this;
    return n.dtstart = ct.apply(n, ["dtstart"]), n.tzid = ct.apply(n, ["tzid"]), n._rrule = [], n._rdate = [], n._exrule = [], n._exdate = [], n;
  }
  return Ve(o, e), o.prototype._iter = function(t) {
    return function(n, d, a, s, i, r) {
      var l = {}, _ = n.accept;
      function c(u, v) {
        a.forEach(function(m) {
          m.between(u, v, !0).forEach(function(x) {
            l[Number(x)] = !0;
          });
        });
      }
      i.forEach(function(u) {
        var v = new Ne(u, r).rezonedDate();
        l[Number(v)] = !0;
      }), n.accept = function(u) {
        var v = Number(u);
        return isNaN(v) ? _.call(this, u) : !(!l[v] && (c(new Date(v - 1), new Date(v + 1)), !l[v])) || (l[v] = !0, _.call(this, u));
      }, n.method === "between" && (c(n.args.after, n.args.before), n.accept = function(u) {
        var v = Number(u);
        return !!l[v] || (l[v] = !0, _.call(this, u));
      });
      for (var h = 0; h < s.length; h++) {
        var p = new Ne(s[h], r).rezonedDate();
        if (!n.accept(new Date(p.getTime())))
          break;
      }
      d.forEach(function(u) {
        At(n, u.options);
      });
      var f = n._result;
      switch (Ee(f), n.method) {
        case "all":
        case "between":
          return f;
        case "before":
          return f.length && f[f.length - 1] || null;
        default:
          return f.length && f[0] || null;
      }
    }(t, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
  }, o.prototype.rrule = function(t) {
    ht(t, this._rrule);
  }, o.prototype.exrule = function(t) {
    ht(t, this._exrule);
  }, o.prototype.rdate = function(t) {
    ut(t, this._rdate);
  }, o.prototype.exdate = function(t) {
    ut(t, this._exdate);
  }, o.prototype.rrules = function() {
    return this._rrule.map(function(t) {
      return pe(t.toString());
    });
  }, o.prototype.exrules = function() {
    return this._exrule.map(function(t) {
      return pe(t.toString());
    });
  }, o.prototype.rdates = function() {
    return this._rdate.map(function(t) {
      return new Date(t.getTime());
    });
  }, o.prototype.exdates = function() {
    return this._exdate.map(function(t) {
      return new Date(t.getTime());
    });
  }, o.prototype.valueOf = function() {
    var t = [];
    return !this._rrule.length && this._dtstart && (t = t.concat(Ie({ dtstart: this._dtstart }))), this._rrule.forEach(function(n) {
      t = t.concat(n.toString().split(`
`));
    }), this._exrule.forEach(function(n) {
      t = t.concat(n.toString().split(`
`).map(function(d) {
        return d.replace(/^RRULE:/, "EXRULE:");
      }).filter(function(d) {
        return !/^DTSTART/.test(d);
      }));
    }), this._rdate.length && t.push(ft("RDATE", this._rdate, this.tzid())), this._exdate.length && t.push(ft("EXDATE", this._exdate, this.tzid())), t;
  }, o.prototype.toString = function() {
    return this.valueOf().join(`
`);
  }, o.prototype.clone = function() {
    var t = new o(!!this._cache);
    return this._rrule.forEach(function(n) {
      return t.rrule(n.clone());
    }), this._exrule.forEach(function(n) {
      return t.exrule(n.clone());
    }), this._rdate.forEach(function(n) {
      return t.rdate(new Date(n.getTime()));
    }), this._exdate.forEach(function(n) {
      return t.exdate(new Date(n.getTime()));
    }), t;
  }, o;
}(z);
function ht(e, o) {
  if (!(e instanceof z))
    throw new TypeError(String(e) + " is not RRule instance");
  V(o.map(String), String(e)) || o.push(e);
}
function ut(e, o) {
  if (!(e instanceof Date))
    throw new TypeError(String(e) + " is not Date instance");
  V(o.map(Number), Number(e)) || (o.push(e), Ee(o));
}
function ft(e, o, t) {
  var n = !t || t.toUpperCase() === "UTC", d = n ? "".concat(e, ":") : "".concat(e, ";TZID=").concat(t, ":"), a = o.map(function(s) {
    return Ye(s.valueOf(), n);
  }).join(",");
  return "".concat(d).concat(a);
}
class en {
  constructor(o) {
    this._scheduler = o;
  }
  getNode() {
    const o = this._scheduler;
    return this._tooltipNode || (this._tooltipNode = document.createElement("div"), this._tooltipNode.className = "dhtmlXTooltip scheduler_tooltip tooltip", o._waiAria.tooltipAttr(this._tooltipNode)), o.config.rtl ? this._tooltipNode.classList.add("dhtmlXTooltip_rtl") : this._tooltipNode.classList.remove("dhtmlXTooltip_rtl"), this._tooltipNode;
  }
  setViewport(o) {
    return this._root = o, this;
  }
  show(o, t) {
    const n = this._scheduler, d = n.$domHelpers, a = document.body, s = this.getNode();
    if (d.isChildOf(s, a) || (this.hide(), a.appendChild(s)), this._isLikeMouseEvent(o)) {
      const i = this._calculateTooltipPosition(o);
      t = i.top, o = i.left;
    }
    return s.style.top = t + "px", s.style.left = o + "px", n._waiAria.tooltipVisibleAttr(s), this;
  }
  hide() {
    const o = this._scheduler, t = this.getNode();
    return t && t.parentNode && t.parentNode.removeChild(t), o._waiAria.tooltipHiddenAttr(t), this;
  }
  setContent(o) {
    return this.getNode().innerHTML = o, this;
  }
  _isLikeMouseEvent(o) {
    return !(!o || typeof o != "object") && "clientX" in o && "clientY" in o;
  }
  _getViewPort() {
    return this._root || document.body;
  }
  _calculateTooltipPosition(o) {
    const t = this._scheduler, n = t.$domHelpers, d = this._getViewPortSize(), a = this.getNode(), s = { top: 0, left: 0, width: a.offsetWidth, height: a.offsetHeight, bottom: 0, right: 0 }, i = t.config.tooltip_offset_x, r = t.config.tooltip_offset_y, l = document.body, _ = n.getRelativeEventPosition(o, l), c = n.getNodePosition(l);
    _.y += c.y, s.top = _.y, s.left = _.x, s.top += r, s.left += i, s.bottom = s.top + s.height, s.right = s.left + s.width;
    const h = window.scrollY + l.scrollTop;
    return s.top < d.top - h ? (s.top = d.top, s.bottom = s.top + s.height) : s.bottom > d.bottom && (s.bottom = d.bottom, s.top = s.bottom - s.height), s.left < d.left ? (s.left = d.left, s.right = d.left + s.width) : s.right > d.right && (s.right = d.right, s.left = s.right - s.width), _.x >= s.left && _.x <= s.right && (s.left = _.x - s.width - i, s.right = s.left + s.width), _.y >= s.top && _.y <= s.bottom && (s.top = _.y - s.height - r, s.bottom = s.top + s.height), s.left < 0 && (s.left = 0), s.right < 0 && (s.right = 0), s;
  }
  _getViewPortSize() {
    const o = this._scheduler, t = o.$domHelpers, n = this._getViewPort();
    let d, a = n, s = window.scrollY + document.body.scrollTop, i = window.scrollX + document.body.scrollLeft;
    return n === o.$event_data ? (a = o.$event, s = 0, i = 0, d = t.getNodePosition(o.$event)) : d = t.getNodePosition(a), { left: d.x + i, top: d.y + s, width: d.width, height: d.height, bottom: d.y + d.height + s, right: d.x + d.width + i };
  }
}
class tn {
  constructor(o) {
    this._listeners = {}, this.tooltip = new en(o), this._scheduler = o, this._domEvents = o._createDomEventScope(), this._initDelayedFunctions();
  }
  destructor() {
    this.tooltip.hide(), this._domEvents.detachAll();
  }
  hideTooltip() {
    this.delayHide();
  }
  attach(o) {
    let t = document.body;
    const n = this._scheduler, d = n.$domHelpers;
    o.global || (t = n.$root);
    let a = null;
    const s = (i) => {
      const r = d.getTargetNode(i), l = d.closest(r, o.selector);
      if (d.isChildOf(r, this.tooltip.getNode()))
        return;
      const _ = () => {
        a = l, o.onmouseenter(i, l);
      };
      n._mobile && n.config.touch_tooltip && (l ? _() : o.onmouseleave(i, l)), a ? l && l === a ? o.onmousemove(i, l) : (o.onmouseleave(i, a), a = null, l && l !== a && _()) : l && _();
    };
    this.detach(o.selector), this._domEvents.attach(t, "mousemove", s), this._listeners[o.selector] = { node: t, handler: s };
  }
  detach(o) {
    const t = this._listeners[o];
    t && this._domEvents.detach(t.node, "mousemove", t.handler);
  }
  tooltipFor(o) {
    const t = (n) => {
      let d = n;
      return document.createEventObject && !document.createEvent && (d = document.createEventObject(n)), d;
    };
    this._initDelayedFunctions(), this.attach({ selector: o.selector, global: o.global, onmouseenter: (n, d) => {
      const a = o.html(n, d);
      a && this.delayShow(t(n), a);
    }, onmousemove: (n, d) => {
      const a = o.html(n, d);
      a ? this.delayShow(t(n), a) : (this.delayShow.$cancelTimeout(), this.delayHide());
    }, onmouseleave: () => {
      this.delayShow.$cancelTimeout(), this.delayHide();
    } });
  }
  _initDelayedFunctions() {
    const o = this._scheduler;
    this.delayShow && this.delayShow.$cancelTimeout(), this.delayHide && this.delayHide.$cancelTimeout(), this.tooltip.hide(), this.delayShow = ae.delay((t, n) => {
      o.callEvent("onBeforeTooltip", [t]) === !1 ? this.tooltip.hide() : (this.tooltip.setContent(n), this.tooltip.show(t));
    }, o.config.tooltip_timeout || 1), this.delayHide = ae.delay(() => {
      this.delayShow.$cancelTimeout(), this.tooltip.hide();
    }, o.config.tooltip_hide_timeout || 1);
  }
}
const an = { active_links: function(e) {
  e.config.active_link_view = "day", e._active_link_click = function(o) {
    var t = o.target.getAttribute("data-link-date"), n = e.date.str_to_date(e.config.api_date, !1, !0);
    if (t)
      return e.setCurrentView(n(t), e.config.active_link_view), o && o.preventDefault && o.preventDefault(), !1;
  }, e.attachEvent("onTemplatesReady", function() {
    var o = function(n, d) {
      d = d || n + "_scale_date", e.templates["_active_links_old_" + d] || (e.templates["_active_links_old_" + d] = e.templates[d]);
      var a = e.templates["_active_links_old_" + d], s = e.date.date_to_str(e.config.api_date);
      e.templates[d] = function(i) {
        return "<a data-link-date='" + s(i) + "' href='#'>" + a(i) + "</a>";
      };
    };
    if (o("week"), o("", "month_day"), this.matrix)
      for (var t in this.matrix)
        o(t);
    this._detachDomEvent(this._obj, "click", e._active_link_click), e.event(this._obj, "click", e._active_link_click);
  });
}, agenda_legacy: function(e) {
  e.date.add_agenda_legacy = function(o) {
    return e.date.add(o, 1, "year");
  }, e.templates.agenda_legacy_time = function(o, t, n) {
    return n._timed ? this.day_date(n.start_date, n.end_date, n) + " " + this.event_date(o) : e.templates.day_date(o) + " &ndash; " + e.templates.day_date(t);
  }, e.templates.agenda_legacy_text = function(o, t, n) {
    return n.text;
  }, e.templates.agenda_legacy_date = function() {
    return "";
  }, e.date.agenda_legacy_start = function() {
    return e.date.date_part(e._currentDate());
  }, e.attachEvent("onTemplatesReady", function() {
    var o = e.dblclick_dhx_cal_data;
    e.dblclick_dhx_cal_data = function() {
      if (this._mode == "agenda_legacy")
        !this.config.readonly && this.config.dblclick_create && this.addEventNow();
      else if (o)
        return o.apply(this, arguments);
    };
    var t = e.render_data;
    e.render_data = function(a) {
      if (this._mode != "agenda_legacy")
        return t.apply(this, arguments);
      d();
    };
    var n = e.render_view_data;
    function d() {
      var a = e.get_visible_events();
      a.sort(function(m, x) {
        return m.start_date > x.start_date ? 1 : -1;
      });
      for (var s, i = "<div class='dhx_agenda_area' " + e._waiAria.agendaDataAttrString() + ">", r = 0; r < a.length; r++) {
        var l = a[r], _ = l.color ? "--dhx-scheduler-event-background:" + l.color + ";" : "", c = l.textColor ? "--dhx-scheduler-event-color:" + l.textColor + ";" : "", h = e.templates.event_class(l.start_date, l.end_date, l);
        s = e._waiAria.agendaEventAttrString(l);
        var p = e._waiAria.agendaDetailsBtnString();
        i += "<div " + s + " class='dhx_agenda_line" + (h ? " " + h : "") + "' event_id='" + l.id + "' " + e.config.event_attribute + "='" + l.id + "' style='" + c + _ + (l._text_style || "") + "'><div class='dhx_agenda_event_time'>" + (e.config.rtl ? e.templates.agenda_time(l.end_date, l.start_date, l) : e.templates.agenda_time(l.start_date, l.end_date, l)) + "</div>", i += `<div ${p} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`, i += "<span>" + e.templates.agenda_text(l.start_date, l.end_date, l) + "</span></div>";
      }
      i += "<div class='dhx_v_border'></div></div>", e._els.dhx_cal_data[0].innerHTML = i, e._els.dhx_cal_data[0].childNodes[0].scrollTop = e._agendaScrollTop || 0;
      var f = e._els.dhx_cal_data[0].childNodes[0];
      f.childNodes[f.childNodes.length - 1].style.height = f.offsetHeight < e._els.dhx_cal_data[0].offsetHeight ? "100%" : f.offsetHeight + "px";
      var u = e._els.dhx_cal_data[0].firstChild.childNodes, v = e._getNavDateElement();
      for (v && (v.innerHTML = e.templates.agenda_date(e._min_date, e._max_date, e._mode)), e._reset_rendered_events(), r = 0; r < u.length - 1; r++)
        e._rendered[r] = u[r];
    }
    e.render_view_data = function() {
      return this._mode == "agenda_legacy" && (e._agendaScrollTop = e._els.dhx_cal_data[0].childNodes[0].scrollTop, e._els.dhx_cal_data[0].childNodes[0].scrollTop = 0), n.apply(this, arguments);
    }, e.agenda_legacy_view = function(a) {
      e._min_date = e.config.agenda_start || e.date.agenda_legacy_start(e._date), e._max_date = e.config.agenda_end || e.date.add_agenda_legacy(e._min_date, 1), function(s) {
        if (s) {
          var i = e.locale.labels, r = e._waiAria.agendaHeadAttrString(), l = e._waiAria.agendaHeadDateString(i.date), _ = e._waiAria.agendaHeadDescriptionString(i.description);
          e._els.dhx_cal_header[0].innerHTML = "<div " + r + " class='dhx_agenda_line dhx_agenda_line_header'><div " + l + ">" + i.date + "</div><span class = 'description_header' style='padding-left:25px' " + _ + ">" + i.description + "</span></div>", e._table_view = !0, e.set_sizes();
        }
      }(a), a ? (e._cols = null, e._colsS = null, e._table_view = !0, d()) : e._table_view = !1;
    };
  });
}, agenda_view: function(e) {
  e.date.add_agenda = function(d, a) {
    return e.date.add(d, 1 * a, "month");
  }, e.templates.agenda_time = function(d, a, s) {
    return s._timed ? `${this.event_date(d)} - ${this.event_date(a)}` : e.locale.labels.full_day;
  }, e.templates.agenda_text = function(d, a, s) {
    return s.text;
  };
  const o = e.date.date_to_str("%F %j"), t = e.date.date_to_str("%l");
  e.templates.agenda_day = function(d) {
    return `<div class="dhx_agenda_day_date">${o(d)}</div>
		<div class="dhx_agenda_day_dow">${t(d)}</div>`;
  }, e.templates.agenda_date = function(d, a) {
    return e.templates.month_date(e.getState().date);
  }, e.date.agenda_start = function(d) {
    return e.date.month_start(new Date(d));
  };
  let n = 0;
  e.attachEvent("onTemplatesReady", function() {
    var d = e.dblclick_dhx_cal_data;
    e.dblclick_dhx_cal_data = function() {
      if (this._mode == "agenda")
        !this.config.readonly && this.config.dblclick_create && this.addEventNow();
      else if (d)
        return d.apply(this, arguments);
    };
    var a = e.render_data;
    e.render_data = function(l) {
      if (this._mode != "agenda")
        return a.apply(this, arguments);
      i();
    };
    var s = e.render_view_data;
    function i() {
      const l = e.get_visible_events();
      l.sort(function(v, m) {
        return v.start_date > m.start_date ? 1 : -1;
      });
      const _ = {};
      let c = e.getState().min_date;
      const h = e.getState().max_date;
      for (; c.valueOf() < h.valueOf(); )
        _[c.valueOf()] = [], c = e.date.add(c, 1, "day");
      let p = !1;
      if (l.forEach((v) => {
        let m = e.date.day_start(new Date(v.start_date));
        for (; m.valueOf() < v.end_date.valueOf(); )
          _[m.valueOf()] && (_[m.valueOf()].push(v), p = !0), m = e.date.day_start(e.date.add(m, 1, "day"));
      }), p) {
        let v = "";
        for (let m in _)
          e.ignore_agenda && e.ignore_agenda(new Date(1 * m)) || (v += r(new Date(1 * m), _[m]));
        e._els.dhx_cal_data[0].innerHTML = v;
      } else
        e._els.dhx_cal_data[0].innerHTML = `<div class="dhx_cal_agenda_no_events">${e.locale.labels.agenda_tab}</div>`;
      e._els.dhx_cal_data[0].scrollTop = n;
      let f = e._els.dhx_cal_data[0].querySelectorAll(".dhx_cal_agenda_event_line");
      e._reset_rendered_events();
      for (var u = 0; u < f.length - 1; u++)
        e._rendered[u] = f[u];
    }
    function r(l, _) {
      if (!_.length)
        return "";
      let c = `
<div class="dhx_cal_agenda_day" data-date="${e.templates.format_date(l)}" data-day="${l.getDay()}">
	<div class="dhx_cal_agenda_day_header">${e.templates.agenda_day(l)}</div>
	<div class="dhx_cal_agenda_day_events">
`;
      return _.forEach((h) => {
        c += function(p, f) {
          const u = e.templates.agenda_time(f.start_date, f.end_date, f), v = e.getState().select_id, m = e.templates.event_class(f.start_date, f.end_date, f), x = e.templates.agenda_text(f.start_date, f.end_date, f);
          let w = "";
          return (f.color || f.textColor) && (w = ` style="${f.color ? "--dhx-scheduler-event-background:" + f.color + ";" : ""}${f.textColor ? "--dhx-scheduler-event-color:" + f.textColor + ";" : ""}" `), `<div class="dhx_cal_agenda_event_line ${m || ""} ${f.id == v ? "dhx_cal_agenda_event_line_selected" : ""}" ${w} ${e.config.event_attribute}="${f.id}">
	<div class="dhx_cal_agenda_event_line_marker"></div>
	<div class="dhx_cal_agenda_event_line_time">${u}</div>
	<div class="dhx_cal_agenda_event_line_text">${x}</div>
</div>`;
        }(0, h);
      }), c += "</div></div>", c;
    }
    e.render_view_data = function() {
      return this._mode == "agenda" && (n = e._els.dhx_cal_data[0].scrollTop, e._els.dhx_cal_data[0].scrollTop = 0), s.apply(this, arguments);
    }, e.agenda_view = function(l) {
      if (l) {
        e._min_date = e.config.agenda_start || e.date.agenda_start(e._date), e._max_date = e.config.agenda_end || e.date.add_agenda(e._min_date, 1), e._cols = null, e._colsS = null, e._table_view = !0;
        const _ = e._getNavDateElement();
        _ && (_.innerHTML = e.templates.agenda_date(e._date)), e.set_sizes(), i();
      } else
        e._table_view = !1;
    };
  });
}, all_timed: function(e) {
  e.config.all_timed = "short", e.config.all_timed_month = !1, e.ext.allTimed = { isMainAreaEvent: function(i) {
    return !!(i._timed || e.config.all_timed === !0 || e.config.all_timed == "short" && o(i));
  } };
  var o = function(i) {
    return !(e._wall_clock_length(i) / 36e5 >= 24) || e._drag_mode == "resize" && e._drag_id == i.id;
  };
  e._safe_copy = function(i) {
    var r = null, l = e._copy_event(i);
    return i.event_pid && (r = e.getEvent(i.event_pid)), r && r.isPrototypeOf(i) && (delete l.event_length, delete l.event_pid, delete l.rec_pattern, delete l.rec_type), l;
  };
  var t = e._pre_render_events_line, n = e._pre_render_events_table, d = function(i, r) {
    return this._table_view ? n.call(this, i, r) : t.call(this, i, r);
  };
  e._pre_render_events_line = e._pre_render_events_table = function(i, r) {
    if (!this.config.all_timed || this._table_view && this._mode != "month" || this._mode == "month" && !this.config.all_timed_month)
      return d.call(this, i, r);
    for (var l = 0; l < i.length; l++) {
      var _ = i[l];
      if (!_._timed)
        if (this.config.all_timed != "short" || o(_)) {
          var c = this._safe_copy(_);
          _._virtual ? c._first_chunk = !1 : c._first_chunk = !0, c._drag_resize = !1, c._virtual = !0, c.start_date = new Date(c.start_date), u(_) ? (c.end_date = v(c.start_date), this.config.last_hour != 24 && (c.end_date = m(c.start_date, this.config.last_hour))) : c.end_date = new Date(_.end_date);
          var h = !1;
          c.start_date < this._max_date && c.end_date > this._min_date && c.start_date < c.end_date && (i[l] = c, h = !0);
          var p = this._safe_copy(_);
          if (p._virtual = !0, p.end_date = new Date(p.end_date), p.start_date < this._min_date ? p.start_date = m(this._min_date, this.config.first_hour) : p.start_date = m(v(_.start_date), this.config.first_hour), p.start_date < this._max_date && p.start_date < p.end_date) {
            if (!h) {
              i[l--] = p;
              continue;
            }
            i.splice(l + 1, 0, p), p._last_chunk = !1;
          } else
            c._last_chunk = !0, c._drag_resize = !0;
        } else
          this._mode != "month" && i.splice(l--, 1);
    }
    var f = this._drag_mode != "move" && r;
    return d.call(this, i, f);
    function u(x) {
      var w = v(x.start_date);
      return +x.end_date > +w;
    }
    function v(x) {
      var w = e.date.add(x, 1, "day");
      return w = e.date.date_part(w);
    }
    function m(x, w) {
      var S = e.date.date_part(new Date(x));
      return S.setHours(w), S;
    }
  };
  var a = e.get_visible_events;
  e.get_visible_events = function(i) {
    return this.config.all_timed && this.config.multi_day ? a.call(this, !1) : a.call(this, i);
  }, e.attachEvent("onBeforeViewChange", function(i, r, l, _) {
    return e._allow_dnd = l == "day" || l == "week" || e.getView(l), !0;
  }), e._is_main_area_event = function(i) {
    return e.ext.allTimed.isMainAreaEvent(i);
  };
  var s = e.updateEvent;
  e.updateEvent = function(i) {
    var r, l, _ = e.getEvent(i);
    _ && (r = e.config.all_timed && !(e.isOneDayEvent(e._events[i]) || e.getState().drag_id)) && (l = e.config.update_render, e.config.update_render = !0), s.apply(e, arguments), _ && r && (e.config.update_render = l);
  };
}, collision: function(e) {
  let o, t;
  function n(d) {
    e._get_section_view() && d && (o = e.getEvent(d)[e._get_section_property()]);
  }
  e.config.collision_limit = 1, e.attachEvent("onBeforeDrag", function(d) {
    return n(d), !0;
  }), e.attachEvent("onBeforeLightbox", function(d) {
    const a = e.getEvent(d);
    return t = [a.start_date, a.end_date], n(d), !0;
  }), e.attachEvent("onEventChanged", function(d) {
    if (!d || !e.getEvent(d))
      return !0;
    const a = e.getEvent(d);
    if (!e.checkCollision(a)) {
      if (!t)
        return !1;
      a.start_date = t[0], a.end_date = t[1], a._timed = this.isOneDayEvent(a);
    }
    return !0;
  }), e.attachEvent("onBeforeEventChanged", function(d, a, s) {
    return e.checkCollision(d);
  }), e.attachEvent("onEventAdded", function(d, a) {
    e.checkCollision(a) || e.deleteEvent(d);
  }), e.attachEvent("onEventSave", function(d, a, s) {
    if ((a = e._lame_clone(a)).id = d, !a.start_date || !a.end_date) {
      const i = e.getEvent(d);
      a.start_date = new Date(i.start_date), a.end_date = new Date(i.end_date);
    }
    return (a.rrule && !a.recurring_event_id || a.rec_type) && e._roll_back_dates(a), e.checkCollision(a);
  }), e._check_sections_collision = function(d, a) {
    const s = e._get_section_property();
    return d[s] == a[s] && d.id != a.id;
  }, e.checkCollision = function(d) {
    let a = [];
    const s = e.config.collision_limit;
    if (d.rec_type) {
      let _ = e.getRecDates(d);
      for (let c = 0; c < _.length; c++) {
        let h = e.getEvents(_[c].start_date, _[c].end_date);
        for (let p = 0; p < h.length; p++)
          (h[p].event_pid || h[p].id) != d.id && a.push(h[p]);
      }
    } else if (d.rrule) {
      let _ = e.getRecDates(d);
      for (let c = 0; c < _.length; c++) {
        let h = e.getEvents(_[c].start_date, _[c].end_date);
        for (let p = 0; p < h.length; p++)
          (String(h[p].id).split("#")[0] || h[p].id) != d.id && a.push(h[p]);
      }
    } else {
      a = e.getEvents(d.start_date, d.end_date);
      for (let _ = 0; _ < a.length; _++) {
        let c = a[_];
        if (c.id == d.id || c.event_length && [c.event_pid, c.event_length].join("#") == d.id) {
          a.splice(_, 1);
          break;
        }
        if (c.recurring_event_id && [c.recurring_event_id, c._pid_time].join("#") == d.id) {
          a.splice(_, 1);
          break;
        }
        if (c.id && String(c.id).split("#")[0] == d.id) {
          a.splice(_, 1);
          break;
        }
      }
    }
    const i = e._get_section_view(), r = e._get_section_property();
    let l = !0;
    if (i) {
      let _ = 0;
      for (let c = 0; c < a.length; c++)
        a[c].id != d.id && this._check_sections_collision(a[c], d) && _++;
      _ >= s && (l = !1);
    } else
      a.length >= s && (l = !1);
    if (!l) {
      let _ = !e.callEvent("onEventCollision", [d, a]);
      return _ || (d[r] = o || d[r]), _;
    }
    return l;
  };
}, container_autoresize: function(e) {
  e.config.container_autoresize = !0, e.config.month_day_min_height = 90, e.config.min_grid_size = 25, e.config.min_map_size = 400;
  var o = e._pre_render_events, t = !0, n = 0, d = 0;
  e._pre_render_events = function(c, h) {
    if (!e.config.container_autoresize || !t)
      return o.apply(this, arguments);
    var p = this.xy.bar_height, f = this._colsS.heights, u = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], v = this._els.dhx_cal_data[0];
    if (c = this._table_view ? this._pre_render_events_table(c, h) : this._pre_render_events_line(c, h), this._table_view)
      if (h)
        this._colsS.heights = f;
      else {
        var m = v.firstChild;
        const g = m.querySelectorAll(".dhx_cal_month_row");
        if (g && g.length) {
          for (var x = 0; x < g.length; x++) {
            if (u[x]++, u[x] * p > this._colsS.height - this.xy.month_head_height) {
              var w = g[x].querySelectorAll(".dhx_cal_month_cell"), S = this._colsS.height - this.xy.month_head_height;
              1 * this.config.max_month_events !== this.config.max_month_events || u[x] <= this.config.max_month_events ? S = u[x] * p : (this.config.max_month_events + 1) * p > this._colsS.height - this.xy.month_head_height && (S = (this.config.max_month_events + 1) * p), g[x].style.height = S + this.xy.month_head_height + "px";
              for (var N = 0; N < w.length; N++)
                w[N].childNodes[1].style.height = S + "px";
              u[x] = (u[x - 1] || 0) + w[0].offsetHeight;
            }
            u[x] = (u[x - 1] || 0) + g[x].querySelectorAll(".dhx_cal_month_cell")[0].offsetHeight;
          }
          u.unshift(0), m.parentNode.offsetHeight < m.parentNode.scrollHeight && m._h_fix;
        } else if (c.length || this._els.dhx_multi_day[0].style.visibility != "visible" || (u[0] = -1), c.length || u[0] == -1) {
          var E = (u[0] + 1) * p + 1;
          d != E + 1 && (this._obj.style.height = n - d + E - 1 + "px"), E += "px";
          const b = this._els.dhx_cal_navline[0].offsetHeight, y = this._els.dhx_cal_header[0].offsetHeight;
          v.style.height = this._obj.offsetHeight - b - y - (this.xy.margin_top || 0) + "px";
          var T = this._els.dhx_multi_day[0];
          T.style.height = E, T.style.visibility = u[0] == -1 ? "hidden" : "visible", T.style.display = u[0] == -1 ? "none" : "", (T = this._els.dhx_multi_day[1]).style.height = E, T.style.visibility = u[0] == -1 ? "hidden" : "visible", T.style.display = u[0] == -1 ? "none" : "", T.className = u[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (u[0] + 1) * p, u[0] = 0;
        }
      }
    return c;
  };
  var a = ["dhx_cal_navline", "dhx_cal_header", "dhx_multi_day", "dhx_cal_data"], s = function(c) {
    n = 0;
    for (var h = 0; h < a.length; h++) {
      var p = a[h], f = e._els[p] ? e._els[p][0] : null, u = 0;
      switch (p) {
        case "dhx_cal_navline":
        case "dhx_cal_header":
          u = f.offsetHeight;
          break;
        case "dhx_multi_day":
          u = f ? f.offsetHeight - 1 : 0, d = u;
          break;
        case "dhx_cal_data":
          var v = e.getState().mode;
          if (f.childNodes[1] && v != "month") {
            let E = 0;
            for (let T = 0; T < f.childNodes.length; T++)
              f.childNodes[T].offsetHeight > E && (E = f.childNodes[T].offsetHeight);
            u = E;
          } else
            u = Math.max(f.offsetHeight - 1, f.scrollHeight);
          if (v == "month")
            e.config.month_day_min_height && !c && (u = f.querySelectorAll(".dhx_cal_month_row").length * e.config.month_day_min_height), c && (f.style.height = u + "px");
          else if (v == "year")
            u = 190 * e.config.year_y;
          else if (v == "agenda") {
            if (u = 0, f.children && f.children.length)
              if (f.children.length === 1 && f.children[0].classList.contains("dhx_cal_agenda_no_events"))
                u = 300;
              else
                for (var m = 0; m < f.children.length; m++)
                  u += f.children[m].offsetHeight;
            u + 2 < e.config.min_grid_size ? u = e.config.min_grid_size : u += 2;
          } else if (v == "week_agenda") {
            let E = _(), T = f.querySelector(".dhx_wa_ev_body") || 0, g = window.getComputedStyle(f.querySelector(".dhx_wa_scale_bar")).getPropertyValue("--dhx-scheduler-week-agenda-scale-height") || 35;
            u = E * (1.1 * T.offsetHeight) + 4 * (parseInt(g) + 10);
          } else if (v == "map") {
            u = 0;
            var x = f.querySelectorAll(".dhx_map_line");
            for (m = 0; m < x.length; m++)
              u += x[m].offsetHeight;
            u + 2 < e.config.min_map_size ? u = e.config.min_map_size : u += 2;
          } else if (e._gridView)
            if (u = 0, f.childNodes[1].childNodes[0].childNodes && f.childNodes[1].childNodes[0].childNodes.length) {
              for (x = f.childNodes[1].childNodes[0].childNodes[0].childNodes, m = 0; m < x.length; m++)
                u += x[m].offsetHeight;
              (u += 2) < e.config.min_grid_size && (u = e.config.min_grid_size);
            } else
              u = e.config.min_grid_size;
          if (e.matrix && e.matrix[v]) {
            if (c)
              u += 0, f.style.height = u + "px";
            else {
              u = 0;
              for (var w = e.matrix[v], S = w.y_unit, N = 0; N < S.length; N++)
                u += w.getSectionHeight(S[N].key);
              e.$container.clientWidth != e.$container.scrollWidth && (u += l());
            }
            u -= 1;
          }
          (v == "day" || v == "week" || e._props && e._props[v]) && (u += 2);
      }
      n += u += 1;
    }
    e._obj.style.height = n + "px", c || e.updateView();
  };
  function i() {
    t = !1, e.callEvent("onAfterSchedulerResize", []), t = !0;
  }
  var r = function() {
    if (!e.config.container_autoresize || !t || e._drag_mode && e._drag_mode === "create" && e._mobile)
      return !0;
    var c = e.getState().mode;
    if (!c)
      return !0;
    var h = window.requestAnimationFrame || window.setTimeout, p = document.documentElement.scrollTop;
    h(function() {
      !e.$destroyed && e.$initialized && s();
    }), e.matrix && e.matrix[c] || c == "month" ? h(function() {
      !e.$destroyed && e.$initialized && (s(!0), document.documentElement.scrollTop = p, i());
    }, 1) : i();
  };
  function l() {
    var c = document.createElement("div");
    c.style.cssText = "visibility:hidden;position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;height:110px;min-height:100px;overflow-y:scroll;", document.body.appendChild(c);
    var h = c.offsetWidth - c.clientWidth;
    return document.body.removeChild(c), h;
  }
  function _() {
    const c = document.querySelectorAll(".dhx_wa_row_autoresize"), h = [];
    return c.forEach((p) => {
      let f = 0;
      p.querySelectorAll(".dhx_wa_day_cont").forEach((u) => {
        const v = u.querySelectorAll(".dhx_wa_ev_body").length;
        v > f && (f = v);
      }), h.push(f);
    }), h.reduce((p, f) => p + f, 0);
  }
  e.attachEvent("onBeforeViewChange", function() {
    var c = e.config.container_autoresize;
    if (e.xy.$original_scroll_width || (e.xy.$original_scroll_width = e.xy.scroll_width), e.xy.scroll_width = c ? 0 : e.xy.$original_scroll_width, e.matrix)
      for (var h in e.matrix) {
        var p = e.matrix[h];
        p.$original_section_autoheight || (p.$original_section_autoheight = p.section_autoheight), p.section_autoheight = !c && p.$original_section_autoheight;
      }
    return !0;
  }), e.attachEvent("onViewChange", r), e.attachEvent("onXLE", r), e.attachEvent("onEventChanged", r), e.attachEvent("onEventCreated", r), e.attachEvent("onEventAdded", r), e.attachEvent("onEventDeleted", r), e.attachEvent("onAfterSchedulerResize", r), e.attachEvent("onClearAll", r), e.attachEvent("onBeforeExpand", function() {
    return t = !1, !0;
  }), e.attachEvent("onBeforeCollapse", function() {
    return t = !0, !0;
  });
}, cookie: function(e) {
  function o() {
    return (e._obj.id || "scheduler") + "_settings";
  }
  const t = e.date.date_to_str("%Y-%m-%d %H:%i"), n = e.date.str_to_date("%Y-%m-%d %H:%i");
  function d() {
    const s = function(l) {
      try {
        return window.localStorage.getItem(l);
      } catch {
        return null;
      }
    }(o());
    if (!s)
      return { date: null, mode: null };
    let i;
    try {
      i = JSON.parse(s);
    } catch {
      return { date: null, mode: null };
    }
    if (!i || typeof i != "object")
      return { date: null, mode: null };
    let r = null;
    if (typeof i.date == "string" && i.date.length > 0)
      try {
        r = n(i.date), isNaN(+r) && (r = null);
      } catch {
        r = null;
      }
    return { date: r, mode: typeof i.mode == "string" ? i.mode : null };
  }
  const a = e._getInitialState;
  e._getInitialState = function(s) {
    const i = a.call(this, s);
    if (function() {
      if (!e._get_url_nav)
        return !1;
      const _ = e._get_url_nav();
      return !!_ && !!(_.date || _.mode || _.event);
    }())
      return i;
    const r = d(), l = { date: i.date, mode: i.mode };
    if (r.date && (l.date = r.date), r.mode)
      try {
        this.isViewExists(r.mode) && (l.mode = r.mode);
      } catch {
      }
    return l;
  }, e.attachEvent("onViewChange", function(s, i) {
    const r = o(), l = { date: t(i), mode: s };
    return function(_, c) {
      try {
        return window.localStorage.setItem(_, c), !0;
      } catch {
        return !1;
      }
    }(r, JSON.stringify(l)), !0;
  });
}, daytimeline: function(e) {
  ce("Day Timeline", e.assert);
}, drag_between: function(e) {
  ce("Drag Between", e.assert);
}, editors: function(e) {
  e.form_blocks.combo = { render: function(o) {
    o.cached_options || (o.cached_options = {});
    const t = o.height ? `style='height:${o.height}px;'` : "";
    var n = "";
    return n += `<div class='${o.type}' ${t}></div>`;
  }, set_value: function(o, t, n, d) {
    (function() {
      p();
      var h = e.attachEvent("onAfterLightbox", function() {
        p(), e.detachEvent(h);
      });
      function p() {
        if (o._combo && o._combo.DOMParent) {
          var f = o._combo;
          f.unload ? f.unload() : f.destructor && f.destructor(), f.DOMParent = f.DOMelem = null;
        }
      }
    })(), window.dhx_globalImgPath = d.image_path || "/", o._combo = new dhtmlXCombo(o, d.name, o.offsetWidth - 8), d.onchange && o._combo.attachEvent("onChange", d.onchange), d.options_height && o._combo.setOptionHeight(d.options_height);
    var a = o._combo;
    if (a.enableFilteringMode(d.filtering, d.script_path || null, !!d.cache), d.script_path) {
      var s = n[d.map_to];
      s ? d.cached_options[s] ? (a.addOption(s, d.cached_options[s]), a.disable(1), a.selectOption(0), a.disable(0)) : e.ajax.get(d.script_path + "?id=" + s + "&uid=" + e.uid(), function(h) {
        var p, f = h.xmlDoc.responseText;
        try {
          p = JSON.parse(f).options[0].text;
        } catch {
          p = e.ajax.xpath("//option", h.xmlDoc)[0].childNodes[0].nodeValue;
        }
        d.cached_options[s] = p, a.addOption(s, p), a.disable(1), a.selectOption(0), a.disable(0);
      }) : a.setComboValue("");
    } else {
      for (var i = [], r = 0; r < d.options.length; r++) {
        var l = d.options[r], _ = [l.key, l.label, l.css];
        i.push(_);
      }
      if (a.addOption(i), n[d.map_to]) {
        var c = a.getIndexByValue(n[d.map_to]);
        a.selectOption(c);
      }
    }
  }, get_value: function(o, t, n) {
    var d = o._combo.getSelectedValue();
    return n.script_path && (n.cached_options[d] = o._combo.getSelectedText()), d;
  }, focus: function(o) {
  } }, e.form_blocks.radio = { render: function(o) {
    var t = "";
    t += `<div class='dhx_cal_ltext dhx_cal_radio ${o.vertical ? "dhx_cal_radio_vertical" : ""}' style='height:${o.height}px;'>`;
    for (var n = 0; n < o.options.length; n++) {
      var d = e.uid();
      t += "<label class='dhx_cal_radio_item' for='" + d + "'><input id='" + d + "' type='radio' name='" + o.name + "' value='" + o.options[n].key + "'><span> " + o.options[n].label + "</span></label>";
    }
    return t += "</div>";
  }, set_value: function(o, t, n, d) {
    for (var a = o.getElementsByTagName("input"), s = 0; s < a.length; s++) {
      a[s].checked = !1;
      var i = n[d.map_to] || t;
      a[s].value == i && (a[s].checked = !0);
    }
  }, get_value: function(o, t, n) {
    for (var d = o.getElementsByTagName("input"), a = 0; a < d.length; a++)
      if (d[a].checked)
        return d[a].value;
  }, focus: function(o) {
  } }, e.form_blocks.checkbox = { render: function(o) {
    return e.config.wide_form ? '<div class="dhx_cal_wide_checkbox"></div>' : "";
  }, set_value: function(o, t, n, d) {
    o = e._lightbox.querySelector(`#${d.id}`), d.height && (o.style.height = `${d.height}px`);
    var a = e.uid(), s = d.checked_value !== void 0 ? t == d.checked_value : !!t;
    o.className += " dhx_cal_checkbox";
    var i = "<input id='" + a + "' type='checkbox' value='true' name='" + d.name + "'" + (s ? "checked='true'" : "") + "'>", r = "<label for='" + a + "'>" + (e.locale.labels["section_" + d.name] || d.name) + "</label>";
    if (e.config.wide_form ? (o.innerHTML = r, o.nextSibling.innerHTML = i) : o.innerHTML = i + r, d.handler) {
      var l = o.getElementsByTagName("input")[0];
      if (l.$_eventAttached)
        return;
      l.$_eventAttached = !0, e.event(l, "click", d.handler);
    }
  }, get_value: function(o, t, n) {
    var d = (o = e._lightbox.querySelector(`#${n.id}`)).getElementsByTagName("input")[0];
    return d || (d = o.nextSibling.getElementsByTagName("input")[0]), d.checked ? n.checked_value || !0 : n.unchecked_value || !1;
  }, focus: function(o) {
  } };
}, expand: function(e) {
  e.ext.fullscreen = { toggleIcon: null }, e.expand = function() {
    if (e.callEvent("onBeforeExpand", [])) {
      var o = e._obj;
      do
        o._position = o.style.position || "", o.style.position = "static";
      while ((o = o.parentNode) && o.style);
      (o = e._obj).style.position = "absolute", o._width = o.style.width, o._height = o.style.height, o.style.width = o.style.height = "100%", o.style.top = o.style.left = "0px";
      var t = document.body;
      t.scrollTop = 0, (t = t.parentNode) && (t.scrollTop = 0), document.body._overflow = document.body.style.overflow || "", document.body.style.overflow = "hidden", e._maximize(), e.callEvent("onExpand", []);
    }
  }, e.collapse = function() {
    if (e.callEvent("onBeforeCollapse", [])) {
      var o = e._obj;
      do
        o.style.position = o._position;
      while ((o = o.parentNode) && o.style);
      (o = e._obj).style.width = o._width, o.style.height = o._height, document.body.style.overflow = document.body._overflow, e._maximize(), e.callEvent("onCollapse", []);
    }
  }, e.attachEvent("onTemplatesReady", function() {
    var o = document.createElement("div");
    o.className = "dhx_expand_icon", e.ext.fullscreen.toggleIcon = o, o.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
	`, e._obj.appendChild(o), e.event(o, "click", function() {
      e.expanded ? e.collapse() : e.expand();
    });
  }), e._maximize = function() {
    this.expanded = !this.expanded, this.expanded ? this.ext.fullscreen.toggleIcon.classList.add("dhx_expand_icon--expanded") : this.ext.fullscreen.toggleIcon.classList.remove("dhx_expand_icon--expanded");
    for (var o = ["left", "top"], t = 0; t < o.length; t++) {
      var n = e["_prev_margin_" + o[t]];
      e.xy["margin_" + o[t]] ? (e["_prev_margin_" + o[t]] = e.xy["margin_" + o[t]], e.xy["margin_" + o[t]] = 0) : n && (e.xy["margin_" + o[t]] = e["_prev_margin_" + o[t]], delete e["_prev_margin_" + o[t]]);
    }
    e.setCurrentView();
  };
}, export_api: function(e) {
  (function() {
    function o(n, d) {
      for (var a in d)
        n[a] || (n[a] = d[a]);
      return n;
    }
    function t(n, d) {
      var a = {};
      return (n = d._els[n]) && n[0] ? (a.x = n[0].scrollWidth, a.y = n[0].scrollHeight) : (a.x = 0, a.y = 0), a;
    }
    window.dhtmlxAjax || (window.dhtmlxAjax = { post: function(n, d, a) {
      return window.dhx4.ajax.post(n, d, a);
    }, get: function(n, d) {
      return window.ajax.get(n, d);
    } }), function(n) {
      function d() {
        var a = n.getState().mode;
        return n.matrix && n.matrix[a] ? n.matrix[a] : null;
      }
      n.exportToPDF = function(a) {
        (a = o(a || {}, { name: "calendar.pdf", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: n.config.rtl })).html = this._export_html(a), a.mode = this.getState().mode, this._send_to_export(a, "pdf");
      }, n.exportToPNG = function(a) {
        (a = o(a || {}, { name: "calendar.png", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: n.config.rtl })).html = this._export_html(a), a.mode = this.getState().mode, this._send_to_export(a, "png");
      }, n.exportToICal = function(a) {
        a = o(a || {}, { name: "calendar.ical", data: this._serialize_plain(null, a) }), this._send_to_export(a, "ical");
      }, n.exportToExcel = function(a) {
        a = o(a || {}, { name: "calendar.xlsx", title: "Events", data: this._serialize_plain(this.templates.xml_format, a), columns: this._serialize_columns() }), this._send_to_export(a, "excel");
      }, n._ajax_to_export = function(a, s, i) {
        delete a.callback;
        var r = a.server || "https://export.dhtmlx.com/scheduler";
        window.dhtmlxAjax.post(r, "type=" + s + "&store=1&data=" + encodeURIComponent(JSON.stringify(a)), function(l) {
          var _ = null;
          if (!(l.xmlDoc.status > 400))
            try {
              _ = JSON.parse(l.xmlDoc.responseText);
            } catch {
            }
          i(_);
        });
      }, n._plain_export_copy = function(a, s) {
        var i = {};
        for (var r in a)
          i[r] = a[r];
        return i.start_date = s(i.start_date), i.end_date = s(i.end_date), i.$text = this.templates.event_text(a.start_date, a.end_date, a), i;
      }, n._serialize_plain = function(a, s) {
        var i;
        a = a || n.date.date_to_str("%Y%m%dT%H%i%s", !0), i = s && s.start && s.end ? n.getEvents(s.start, s.end) : n.getEvents();
        for (var r = [], l = 0; l < i.length; l++)
          r[l] = this._plain_export_copy(i[l], a);
        return r;
      }, n._serialize_columns = function() {
        return [{ id: "start_date", header: "Start Date", width: 30 }, { id: "end_date", header: "End Date", width: 30 }, { id: "$text", header: "Text", width: 100 }];
      }, n._send_to_export = function(a, s) {
        if (a.version || (a.version = n.version), a.skin || (a.skin = n.skin), a.callback)
          return n._ajax_to_export(a, s, a.callback);
        var i = this._create_hidden_form();
        i.firstChild.action = a.server || "https://export.dhtmlx.com/scheduler", i.firstChild.childNodes[0].value = JSON.stringify(a), i.firstChild.childNodes[1].value = s, i.firstChild.submit();
      }, n._create_hidden_form = function() {
        if (!this._hidden_export_form) {
          var a = this._hidden_export_form = document.createElement("div");
          a.style.display = "none", a.innerHTML = "<form method='POST' target='_blank'><input type='text' name='data'><input type='hidden' name='type' value=''></form>", document.body.appendChild(a);
        }
        return this._hidden_export_form;
      }, n._get_export_size = function(a, s, i, r, l, _, c) {
        r = parseInt(r) / 25.4 || 4;
        var h = { A5: { x: 148, y: 210 }, A4: { x: 210, y: 297 }, A3: { x: 297, y: 420 }, A2: { x: 420, y: 594 }, A1: { x: 594, y: 841 }, A0: { x: 841, y: 1189 } }, p = t("dhx_cal_data", this).x, f = { y: t("dhx_cal_data", this).y + t("dhx_cal_header", this).y + t("dhx_multi_day", this).y };
        return f.x = a === "full" ? p : Math.floor((s === "landscape" ? h[a].y : h[a].x) * r), c && (f.x *= parseFloat(c.x) || 1, f.y *= parseFloat(c.y) || 1), f;
      }, n._export_html = function(a) {
        var s, i, r, l = (s = void 0, i = void 0, (r = d()) && (i = r.scrollable, s = r.smart_rendering), { nav_height: n.xy.nav_height, scroll_width: n.xy.scroll_width, style_width: n._obj.style.width, style_height: n._obj.style.height, timeline_scrollable: i, timeline_smart_rendering: s }), _ = n._get_export_size(a.format, a.orientation, a.zoom, a.dpi, a.header, a.footer, a.scales), c = "";
        try {
          (function(h, p) {
            n._obj.style.width = h.x + "px", n._obj.style.height = h.y + "px", n.xy.nav_height = 0, n.xy.scroll_width = 0;
            var f = d();
            (p.timeline_scrollable || p.timeline_smart_rendering) && (f.scrollable = !1, f.smart_rendering = !1);
          })(_, l), n.setCurrentView(), c = n._obj.innerHTML;
        } catch (h) {
          console.error(h);
        } finally {
          (function(h) {
            n.xy.scroll_width = h.scroll_width, n.xy.nav_height = h.nav_height, n._obj.style.width = h.style_width, n._obj.style.height = h.style_height;
            var p = d();
            (h.timeline_scrollable || h.timeline_smart_rendering) && (p.scrollable = h.timeline_scrollable, p.smart_rendering = h.timeline_smart_rendering);
          })(l), n.setCurrentView();
        }
        return c;
      };
    }(e);
  })();
}, grid_view: function(e) {
  ce("Grid", e.assert);
}, html_templates: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    for (var o = document.body.getElementsByTagName("DIV"), t = 0; t < o.length; t++) {
      var n = o[t].className || "";
      if ((n = n.split(":")).length == 2 && n[0] == "template") {
        var d = 'return "' + (o[t].innerHTML || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\n\r]+/g, "") + '";';
        d = unescape(d).replace(/\{event\.([a-z]+)\}/g, function(a, s) {
          return '"+ev.' + s + '+"';
        }), e.templates[n[1]] = Function("start", "end", "ev", d), o[t].style.display = "none";
      }
    }
  });
}, key_nav: function(e) {
  function o(t) {
    var n = { minicalButton: e.$keyboardNavigation.MinicalButton, minicalDate: e.$keyboardNavigation.MinicalCell, scheduler: e.$keyboardNavigation.SchedulerNode, dataArea: e.$keyboardNavigation.DataArea, timeSlot: e.$keyboardNavigation.TimeSlot, event: e.$keyboardNavigation.Event }, d = {};
    for (var a in n)
      d[a.toLowerCase()] = n[a];
    return d[t = (t + "").toLowerCase()] || n.scheduler;
  }
  e.config.key_nav = !0, e.config.key_nav_step = 30, e.addShortcut = function(t, n, d) {
    var a = o(d);
    a && a.prototype.bind(t, n);
  }, e.getShortcutHandler = function(t, n) {
    var d = o(n);
    if (d) {
      var a = e.$keyboardNavigation.shortcuts.parse(t);
      if (a.length)
        return d.prototype.findHandler(a[0]);
    }
  }, e.removeShortcut = function(t, n) {
    var d = o(n);
    d && d.prototype.unbind(t);
  }, e.focus = function() {
    if (e.config.key_nav) {
      var t = e.$keyboardNavigation.dispatcher;
      t.enable();
      var n = t.getActiveNode();
      !n || n instanceof e.$keyboardNavigation.MinicalButton || n instanceof e.$keyboardNavigation.MinicalCell ? t.setDefaultNode() : t.focusNode(t.getActiveNode());
    }
  }, e.$keyboardNavigation = {}, e._compose = function() {
    for (var t = Array.prototype.slice.call(arguments, 0), n = {}, d = 0; d < t.length; d++) {
      var a = t[d];
      for (var s in typeof a == "function" && (a = new a()), a)
        n[s] = a[s];
    }
    return n;
  }, function(t) {
    t.$keyboardNavigation.shortcuts = { createCommand: function() {
      return { modifiers: { shift: !1, alt: !1, ctrl: !1, meta: !1 }, keyCode: null };
    }, parse: function(n) {
      for (var d = [], a = this.getExpressions(this.trim(n)), s = 0; s < a.length; s++) {
        for (var i = this.getWords(a[s]), r = this.createCommand(), l = 0; l < i.length; l++)
          this.commandKeys[i[l]] ? r.modifiers[i[l]] = !0 : this.specialKeys[i[l]] ? r.keyCode = this.specialKeys[i[l]] : r.keyCode = i[l].charCodeAt(0);
        d.push(r);
      }
      return d;
    }, getCommandFromEvent: function(n) {
      var d = this.createCommand();
      d.modifiers.shift = !!n.shiftKey, d.modifiers.alt = !!n.altKey, d.modifiers.ctrl = !!n.ctrlKey, d.modifiers.meta = !!n.metaKey, d.keyCode = n.which || n.keyCode, d.keyCode >= 96 && d.keyCode <= 105 && (d.keyCode -= 48);
      var a = String.fromCharCode(d.keyCode);
      return a && (d.keyCode = a.toLowerCase().charCodeAt(0)), d;
    }, getHashFromEvent: function(n) {
      return this.getHash(this.getCommandFromEvent(n));
    }, getHash: function(n) {
      var d = [];
      for (var a in n.modifiers)
        n.modifiers[a] && d.push(a);
      return d.push(n.keyCode), d.join(this.junctionChar);
    }, getExpressions: function(n) {
      return n.split(this.junctionChar);
    }, getWords: function(n) {
      return n.split(this.combinationChar);
    }, trim: function(n) {
      return n.replace(/\s/g, "");
    }, junctionChar: ",", combinationChar: "+", commandKeys: { shift: 16, alt: 18, ctrl: 17, meta: !0 }, specialKeys: { backspace: 8, tab: 9, enter: 13, esc: 27, space: 32, up: 38, down: 40, left: 37, right: 39, home: 36, end: 35, pageup: 33, pagedown: 34, delete: 46, insert: 45, plus: 107, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123 } };
  }(e), function(t) {
    t.$keyboardNavigation.EventHandler = { _handlers: null, findHandler: function(n) {
      this._handlers || (this._handlers = {});
      var d = t.$keyboardNavigation.shortcuts.getHash(n);
      return this._handlers[d];
    }, doAction: function(n, d) {
      var a = this.findHandler(n);
      a && (a.call(this, d), d.preventDefault ? d.preventDefault() : d.returnValue = !1);
    }, bind: function(n, d) {
      this._handlers || (this._handlers = {});
      for (var a = t.$keyboardNavigation.shortcuts, s = a.parse(n), i = 0; i < s.length; i++)
        this._handlers[a.getHash(s[i])] = d;
    }, unbind: function(n) {
      for (var d = t.$keyboardNavigation.shortcuts, a = d.parse(n), s = 0; s < a.length; s++)
        this._handlers[d.getHash(a[s])] && delete this._handlers[d.getHash(a[s])];
    }, bindAll: function(n) {
      for (var d in n)
        this.bind(d, n[d]);
    }, initKeys: function() {
      this._handlers || (this._handlers = {}), this.keys && this.bindAll(this.keys);
    } };
  }(e), function(t) {
    t.$keyboardNavigation.getFocusableNodes = t._getFocusableNodes, t.$keyboardNavigation.trapFocus = function(n, d) {
      if (d.keyCode != 9)
        return !1;
      for (var a, s = t.$keyboardNavigation.getFocusableNodes(n), i = document.activeElement, r = -1, l = 0; l < s.length; l++)
        if (s[l] == i) {
          r = l;
          break;
        }
      if (d.shiftKey) {
        if (a = s[r <= 0 ? s.length - 1 : r - 1])
          return a.focus(), d.preventDefault(), !0;
      } else if (a = s[r >= s.length - 1 ? 0 : r + 1])
        return a.focus(), d.preventDefault(), !0;
      return !1;
    };
  }(e), function(t) {
    t.$keyboardNavigation.marker = { clear: function() {
      for (var n = t.$container.querySelectorAll(".dhx_focus_slot"), d = 0; d < n.length; d++)
        n[d].parentNode.removeChild(n[d]);
    }, createElement: function() {
      var n = document.createElement("div");
      return n.setAttribute("tabindex", -1), n.className = "dhx_focus_slot", n;
    }, renderMultiple: function(n, d, a) {
      for (var s = [], i = new Date(n), r = new Date(Math.min(d.valueOf(), t.date.add(t.date.day_start(new Date(n)), 1, "day").valueOf())); i.valueOf() < d.valueOf(); )
        s = s.concat(a.call(this, i, new Date(Math.min(r.valueOf(), d.valueOf())))), i = t.date.day_start(t.date.add(i, 1, "day")), r = t.date.day_start(t.date.add(i, 1, "day")), r = new Date(Math.min(r.valueOf(), d.valueOf()));
      return s;
    }, render: function(n, d, a) {
      this.clear();
      var s = [], i = t.$keyboardNavigation.TimeSlot.prototype._modes;
      switch (t.$keyboardNavigation.TimeSlot.prototype._getMode()) {
        case i.units:
          s = this.renderVerticalMarker(n, d, a);
          break;
        case i.timeline:
          s = this.renderTimelineMarker(n, d, a);
          break;
        case i.year:
          s = s.concat(this.renderMultiple(n, d, this.renderYearMarker));
          break;
        case i.month:
          s = this.renderMonthMarker(n, d);
          break;
        case i.weekAgenda:
          s = s.concat(this.renderMultiple(n, d, this.renderWeekAgendaMarker));
          break;
        case i.list:
          s = this.renderAgendaMarker(n, d);
          break;
        case i.dayColumns:
          s = s.concat(this.renderMultiple(n, d, this.renderVerticalMarker));
      }
      this.addWaiAriaLabel(s, n, d, a), this.addDataAttributes(s, n, d, a);
      for (var r = s.length - 1; r >= 0; r--)
        if (s[r].offsetWidth)
          return s[r];
      return null;
    }, addDataAttributes: function(n, d, a, s) {
      for (var i = t.date.date_to_str(t.config.api_date), r = i(d), l = i(a), _ = 0; _ < n.length; _++)
        n[_].setAttribute("data-start-date", r), n[_].setAttribute("data-end-date", l), s && n[_].setAttribute("data-section", s);
    }, addWaiAriaLabel: function(n, d, a, s) {
      var i = "", r = t.getState().mode, l = !1;
      if (i += t.templates.day_date(d), t.date.day_start(new Date(d)).valueOf() != d.valueOf() && (i += " " + t.templates.hour_scale(d), l = !0), t.date.day_start(new Date(d)).valueOf() != t.date.day_start(new Date(a)).valueOf() && (i += " - " + t.templates.day_date(a), (l || t.date.day_start(new Date(a)).valueOf() != a.valueOf()) && (i += " " + t.templates.hour_scale(a))), s) {
        if (t.matrix && t.matrix[r]) {
          const c = t.matrix[r], h = c.y_unit[c.order[s]];
          i += ", " + t.templates[r + "_scale_label"](h.key, h.label, h);
        } else if (t._props && t._props[r]) {
          const c = t._props[r], h = c.options[c.order[s]];
          i += ", " + t.templates[r + "_scale_text"](h.key, h.label, h);
        }
      }
      for (var _ = 0; _ < n.length; _++)
        t._waiAria.setAttributes(n[_], { "aria-label": i, "aria-live": "polite" });
    }, renderWeekAgendaMarker: function(n, d) {
      for (var a = t.$container.querySelectorAll(".dhx_wa_day_cont .dhx_wa_scale_bar"), s = t.date.week_start(new Date(t.getState().min_date)), i = -1, r = t.date.day_start(new Date(n)), l = 0; l < a.length && (i++, t.date.day_start(new Date(s)).valueOf() != r.valueOf()); l++)
        s = t.date.add(s, 1, "day");
      return i != -1 ? this._wrapDiv(a[i]) : [];
    }, _wrapDiv: function(n) {
      var d = this.createElement();
      return d.style.top = n.offsetTop + "px", d.style.left = n.offsetLeft + "px", d.style.width = n.offsetWidth + "px", d.style.height = n.offsetHeight + "px", n.appendChild(d), [d];
    }, renderYearMarker: function(n, d) {
      var a = t._get_year_cell(n);
      a.style.position = "relative";
      var s = this.createElement();
      return s.style.top = "0px", s.style.left = "0px", s.style.width = "100%", s.style.height = "100%", a.appendChild(s), [s];
    }, renderAgendaMarker: function(n, d) {
      var a = this.createElement();
      return a.style.height = "1px", a.style.width = "100%", a.style.opacity = 1, a.style.top = "0px", a.style.left = "0px", t.$container.querySelector(".dhx_cal_data").appendChild(a), [a];
    }, renderTimelineMarker: function(n, d, a) {
      var s = t._lame_copy({}, t.matrix[t._mode]), i = s._scales;
      s.round_position = !1;
      var r = [], l = n ? new Date(n) : t._min_date, _ = d ? new Date(d) : t._max_date;
      if (l.valueOf() < t._min_date.valueOf() && (l = new Date(t._min_date)), _.valueOf() > t._max_date.valueOf() && (_ = new Date(t._max_date)), !s._trace_x)
        return r;
      for (var c = 0; c < s._trace_x.length && !t._is_column_visible(s._trace_x[c]); c++)
        ;
      if (c == s._trace_x.length)
        return r;
      var h = i[a];
      if (!(l < d && _ > n))
        return r;
      var p = this.createElement();
      let f, u;
      function v(N, E) {
        E.setDate(1), E.setFullYear(N.getFullYear()), E.setMonth(N.getMonth()), E.setDate(N.getDate());
      }
      if (t.getView().days) {
        const N = new Date(n);
        v(t._min_date, N);
        const E = new Date(d);
        v(t._min_date, E), f = t._timeline_getX({ start_date: N }, !1, s), u = t._timeline_getX({ start_date: E }, !1, s);
      } else
        f = t._timeline_getX({ start_date: n }, !1, s), u = t._timeline_getX({ start_date: d }, !1, s);
      var m = s._section_height[a] - 1 || s.dy - 1, x = 0;
      t._isRender("cell") && (x = h.offsetTop, f += s.dx, u += s.dx, h = t.$container.querySelector(".dhx_cal_data"));
      var w = Math.max(1, u - f - 1);
      let S = "left";
      return t.config.rtl && (S = "right"), p.style.cssText = `height:${m}px; ${S}:${f}px; width:${w}px; top:${x}px;`, h && (h.appendChild(p), r.push(p)), r;
    }, renderMonthCell: function(n) {
      for (var d = t.$container.querySelectorAll(".dhx_month_head"), a = [], s = 0; s < d.length; s++)
        a.push(d[s].parentNode);
      var i = -1, r = 0, l = -1, _ = t.date.week_start(new Date(t.getState().min_date)), c = t.date.day_start(new Date(n));
      for (s = 0; s < a.length && (i++, l == 6 ? (r++, l = 0) : l++, t.date.day_start(new Date(_)).valueOf() != c.valueOf()); s++)
        _ = t.date.add(_, 1, "day");
      if (i == -1)
        return [];
      var h = t._colsS[l], p = t._colsS.heights[r], f = this.createElement();
      f.style.top = p + "px", f.style.left = h + "px", f.style.width = t._cols[l] + "px", f.style.height = (t._colsS.heights[r + 1] - p || t._colsS.height) + "px";
      var u = t.$container.querySelector(".dhx_cal_data"), v = u.querySelector(".dhx_cal_month_table");
      return v.nextSibling ? u.insertBefore(f, v.nextSibling) : u.appendChild(f), f;
    }, renderMonthMarker: function(n, d) {
      for (var a = [], s = n; s.valueOf() < d.valueOf(); )
        a.push(this.renderMonthCell(s)), s = t.date.add(s, 1, "day");
      return a;
    }, renderVerticalMarker: function(n, d, a) {
      var s = t.locate_holder_day(n), i = [], r = null, l = t.config;
      if (t._ignores[s])
        return i;
      if (t._props && t._props[t._mode] && a) {
        var _ = t._props[t._mode];
        s = _.order[a];
        var c = _.order[a];
        _.days > 1 ? s = t.locate_holder_day(n) + c : (s = c, _.size && s > _.position + _.size && (s = 0));
      }
      if (!(r = t.locate_holder(s)) || r.querySelector(".dhx_scale_hour"))
        return document.createElement("div");
      var h = Math.max(60 * n.getHours() + n.getMinutes(), 60 * l.first_hour), p = Math.min(60 * d.getHours() + d.getMinutes(), 60 * l.last_hour);
      if (!p && t.date.day_start(new Date(d)).valueOf() > t.date.day_start(new Date(n)).valueOf() && (p = 60 * l.last_hour), p <= h)
        return [];
      var f = this.createElement(), u = t.config.hour_size_px * l.last_hour + 1, v = 36e5;
      return f.style.top = Math.round((60 * h * 1e3 - t.config.first_hour * v) * t.config.hour_size_px / v) % u + "px", f.style.lineHeight = f.style.height = Math.max(Math.round(60 * (p - h) * 1e3 * t.config.hour_size_px / v) % u, 1) + "px", f.style.width = "100%", r.appendChild(f), i.push(f), i[0];
    } };
  }(e), function(t) {
    t.$keyboardNavigation.SchedulerNode = function() {
    }, t.$keyboardNavigation.SchedulerNode.prototype = t._compose(t.$keyboardNavigation.EventHandler, { getDefaultNode: function() {
      var n = new t.$keyboardNavigation.TimeSlot();
      return n.isValid() || (n = n.fallback()), n;
    }, _modes: { month: "month", year: "year", dayColumns: "dayColumns", timeline: "timeline", units: "units", weekAgenda: "weekAgenda", list: "list" }, getMode: function() {
      var n = t.getState().mode;
      return t.matrix && t.matrix[n] ? this._modes.timeline : t._props && t._props[n] ? this._modes.units : n == "month" ? this._modes.month : n == "year" ? this._modes.year : n == "week_agenda" ? this._modes.weekAgenda : n == "map" || n == "agenda" || t._grid && t["grid_" + n] ? this._modes.list : this._modes.dayColumns;
    }, focus: function() {
      t.focus();
    }, blur: function() {
    }, disable: function() {
      t.$container.setAttribute("tabindex", "0");
    }, enable: function() {
      t.$container && t.$container.removeAttribute("tabindex");
    }, isEnabled: function() {
      return t.$container.hasAttribute("tabindex");
    }, _compareEvents: function(n, d) {
      return n.start_date.valueOf() == d.start_date.valueOf() ? n.id > d.id ? 1 : -1 : n.start_date.valueOf() > d.start_date.valueOf() ? 1 : -1;
    }, _pickEvent: function(n, d, a, s) {
      var i = t.getState();
      n = new Date(Math.max(i.min_date.valueOf(), n.valueOf())), d = new Date(Math.min(i.max_date.valueOf(), d.valueOf()));
      var r = t.getEvents(n, d);
      r.sort(this._compareEvents), s && (r = r.reverse());
      for (var l = !!a, _ = 0; _ < r.length && l; _++)
        r[_].id == a && (l = !1), r.splice(_, 1), _--;
      for (_ = 0; _ < r.length; _++)
        if (new t.$keyboardNavigation.Event(r[_].id).getNode())
          return r[_];
      return null;
    }, nextEventHandler: function(n) {
      var d = t.$keyboardNavigation.dispatcher.activeNode, a = n || d && d.eventId, s = null;
      if (a && t.getEvent(a)) {
        var i = t.getEvent(a);
        s = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(i.start_date, t.date.add(i.start_date, 1, "year"), i.id, !1);
      }
      if (!s && !n) {
        var r = t.getState();
        s = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(r.min_date, t.date.add(r.min_date, 1, "year"), null, !1);
      }
      if (s) {
        var l = new t.$keyboardNavigation.Event(s.id);
        l.isValid() ? (d && d.blur(), t.$keyboardNavigation.dispatcher.setActiveNode(l)) : this.nextEventHandler(s.id);
      }
    }, prevEventHandler: function(n) {
      var d = t.$keyboardNavigation.dispatcher.activeNode, a = n || d && d.eventId, s = null;
      if (a && t.getEvent(a)) {
        var i = t.getEvent(a);
        s = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(t.date.add(i.end_date, -1, "year"), i.end_date, i.id, !0);
      }
      if (!s && !n) {
        var r = t.getState();
        s = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(t.date.add(r.max_date, -1, "year"), r.max_date, null, !0);
      }
      if (s) {
        var l = new t.$keyboardNavigation.Event(s.id);
        l.isValid() ? (d && d.blur(), t.$keyboardNavigation.dispatcher.setActiveNode(l)) : this.prevEventHandler(s.id);
      }
    }, keys: { "alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9": function(n) {
      const d = t.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab"), a = n.code;
      let s = parseInt(a.replace("Digit", ""));
      d[s - 1] && d[s - 1].click();
    }, "ctrl+left,meta+left": function(n) {
      t._click.dhx_cal_prev_button();
    }, "ctrl+right,meta+right": function(n) {
      t._click.dhx_cal_next_button();
    }, "ctrl+up,meta+up": function(n) {
      t.$container.querySelector(".dhx_cal_data").scrollTop -= 20;
    }, "ctrl+down,meta+down": function(n) {
      t.$container.querySelector(".dhx_cal_data").scrollTop += 20;
    }, e: function() {
      this.nextEventHandler();
    }, home: function() {
      t.setCurrentView(/* @__PURE__ */ new Date());
    }, "shift+e": function() {
      this.prevEventHandler();
    }, "ctrl+enter,meta+enter": function() {
      t.addEventNow({ start_date: new Date(t.getState().date) });
    }, "ctrl+c,meta+c": function(n) {
      t._key_nav_copy_paste(n);
    }, "ctrl+v,meta+v": function(n) {
      t._key_nav_copy_paste(n);
    }, "ctrl+x,meta+x": function(n) {
      t._key_nav_copy_paste(n);
    } } }), t.$keyboardNavigation.SchedulerNode.prototype.bindAll(t.$keyboardNavigation.SchedulerNode.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.KeyNavNode = function() {
    }, t.$keyboardNavigation.KeyNavNode.prototype = t._compose(t.$keyboardNavigation.EventHandler, { isValid: function() {
      return !0;
    }, fallback: function() {
      return null;
    }, moveTo: function(n) {
      t.$keyboardNavigation.dispatcher.setActiveNode(n);
    }, compareTo: function(n) {
      if (!n)
        return !1;
      for (var d in this) {
        if (!!this[d] != !!n[d])
          return !1;
        var a = !(!this[d] || !this[d].toString), s = !(!n[d] || !n[d].toString);
        if (s != a)
          return !1;
        if (s && a) {
          if (n[d].toString() != this[d].toString())
            return !1;
        } else if (n[d] != this[d])
          return !1;
      }
      return !0;
    }, getNode: function() {
    }, focus: function() {
      var n = this.getNode();
      n && (n.setAttribute("tabindex", "-1"), n.focus && n.focus());
    }, blur: function() {
      var n = this.getNode();
      n && n.setAttribute("tabindex", "-1");
    } });
  }(e), function(t) {
    t.$keyboardNavigation.HeaderCell = function(n) {
      this.index = n || 0;
    }, t.$keyboardNavigation.HeaderCell.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { getNode: function(n) {
      n = n || this.index || 0;
      var d = this.getNodes();
      if (d[n])
        return d[n];
    }, getNodes: function(n) {
      n = n || [".dhx_cal_navline .dhx_cal_prev_button", ".dhx_cal_navline .dhx_cal_next_button", ".dhx_cal_navline .dhx_cal_today_button", ".dhx_cal_navline .dhx_cal_tab"].join(", ");
      var d = Array.prototype.slice.call(t.$container.querySelectorAll(n));
      return d.sort(function(a, s) {
        return a.offsetLeft - s.offsetLeft;
      }), d;
    }, _handlers: null, isValid: function() {
      return !!this.getNode(this.index);
    }, fallback: function() {
      var n = this.getNode(0);
      return n || (n = new t.$keyboardNavigation.TimeSlot()), n;
    }, keys: { left: function() {
      var n = this.index - 1;
      n < 0 && (n = this.getNodes().length - 1), this.moveTo(new t.$keyboardNavigation.HeaderCell(n));
    }, right: function() {
      var n = this.index + 1;
      n >= this.getNodes().length && (n = 0), this.moveTo(new t.$keyboardNavigation.HeaderCell(n));
    }, down: function() {
      this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, enter: function() {
      var n = this.getNode();
      n && n.click();
    } } }), t.$keyboardNavigation.HeaderCell.prototype.bindAll(t.$keyboardNavigation.HeaderCell.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.Event = function(n) {
      if (this.eventId = null, t.getEvent(n)) {
        var d = t.getEvent(n);
        this.start = new Date(d.start_date), this.end = new Date(d.end_date), this.section = this._getSection(d), this.eventId = n;
      }
    }, t.$keyboardNavigation.Event.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { _getNodes: function() {
      return Array.prototype.slice.call(t.$container.querySelectorAll("[" + t.config.event_attribute + "]"));
    }, _modes: t.$keyboardNavigation.SchedulerNode.prototype._modes, getMode: t.$keyboardNavigation.SchedulerNode.prototype.getMode, _handlers: null, isValid: function() {
      return !(!t.getEvent(this.eventId) || !this.getNode());
    }, fallback: function() {
      var n = this._getNodes()[0], d = null;
      if (n && t._locate_event(n)) {
        var a = t._locate_event(n);
        d = new t.$keyboardNavigation.Event(a);
      } else
        d = new t.$keyboardNavigation.TimeSlot();
      return d;
    }, isScrolledIntoView: function(n) {
      var d = n.getBoundingClientRect(), a = t.$container.querySelector(".dhx_cal_data").getBoundingClientRect();
      return !(d.bottom < a.top || d.top > a.bottom);
    }, getNode: function() {
      var n = "[" + t.config.event_attribute + "='" + this.eventId + "']", d = t.$keyboardNavigation.dispatcher.getInlineEditor(this.eventId);
      if (d)
        return d;
      if (t.isMultisectionEvent && t.isMultisectionEvent(t.getEvent(this.eventId))) {
        for (var a = t.$container.querySelectorAll(n), s = 0; s < a.length; s++)
          if (this.isScrolledIntoView(a[s]))
            return a[s];
        return a[0];
      }
      return t.$container.querySelector(n);
    }, focus: function() {
      var n = t.getEvent(this.eventId), d = t.getState();
      (n.start_date.valueOf() > d.max_date.valueOf() || n.end_date.valueOf() <= d.min_date.valueOf()) && t.setCurrentView(n.start_date);
      var a = this.getNode();
      this.isScrolledIntoView(a) ? t.$keyboardNavigation.dispatcher.keepScrollPosition((function() {
        t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
      }).bind(this)) : t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getSection: function(n) {
      var d = null, a = t.getState().mode;
      return t.matrix && t.matrix[a] ? d = n[t.matrix[t.getState().mode].y_property] : t._props && t._props[a] && (d = n[t._props[a].map_to]), d;
    }, _moveToSlot: function(n) {
      var d = t.getEvent(this.eventId);
      if (d) {
        var a = this._getSection(d), s = new t.$keyboardNavigation.TimeSlot(d.start_date, null, a);
        this.moveTo(s.nextSlot(s, n));
      } else
        this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, keys: { left: function() {
      this._moveToSlot("left");
    }, right: function() {
      this._moveToSlot("right");
    }, down: function() {
      this.getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler() : this._moveToSlot("down");
    }, space: function() {
      var n = this.getNode();
      n && n.click ? n.click() : this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, up: function() {
      this.getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler() : this._moveToSlot("up");
    }, delete: function() {
      t.getEvent(this.eventId) ? t._click.buttons.delete(this.eventId) : this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, enter: function() {
      t.getEvent(this.eventId) ? t.showLightbox(this.eventId) : this.moveTo(new t.$keyboardNavigation.TimeSlot());
    } } }), t.$keyboardNavigation.Event.prototype.bindAll(t.$keyboardNavigation.Event.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.TimeSlot = function(n, d, a, s) {
      var i = t.getState(), r = t.matrix && t.matrix[i.mode];
      n || (n = this.getDefaultDate()), d || (d = r ? t.date.add(n, r.x_step, r.x_unit) : t.date.add(n, t.config.key_nav_step, "minute")), this.section = a || this._getDefaultSection(), this.start_date = new Date(n), this.end_date = new Date(d), this.movingDate = s || null;
    }, t.$keyboardNavigation.TimeSlot.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { _handlers: null, getDefaultDate: function() {
      var n, d = t.getState(), a = new Date(d.date);
      a.setSeconds(0), a.setMilliseconds(0);
      var s = /* @__PURE__ */ new Date();
      s.setSeconds(0), s.setMilliseconds(0);
      var i = t.matrix && t.matrix[d.mode], r = !1;
      if (a.valueOf() === s.valueOf() && (r = !0), i)
        r ? (i.x_unit === "day" ? (s.setHours(0), s.setMinutes(0)) : i.x_unit === "hour" && s.setMinutes(0), n = s) : n = t.date[i.name + "_start"](new Date(d.date)), n = this.findVisibleColumn(n);
      else if (n = new Date(t.getState().min_date), r && (n = s), n = this.findVisibleColumn(n), r || n.setHours(t.config.first_hour), !t._table_view) {
        var l = t.$container.querySelector(".dhx_cal_data");
        l.scrollTop && n.setHours(t.config.first_hour + Math.ceil(l.scrollTop / t.config.hour_size_px));
      }
      return n;
    }, clone: function(n) {
      return new t.$keyboardNavigation.TimeSlot(n.start_date, n.end_date, n.section, n.movingDate);
    }, _getMultisectionView: function() {
      var n, d = t.getState();
      return t._props && t._props[d.mode] ? n = t._props[d.mode] : t.matrix && t.matrix[d.mode] && (n = t.matrix[d.mode]), n;
    }, _getDefaultSection: function() {
      var n = null;
      return this._getMultisectionView() && !n && (n = this._getNextSection()), n;
    }, _getNextSection: function(n, d) {
      var a = this._getMultisectionView(), s = a.order[n], i = s;
      (i = s !== void 0 ? s + d : a.size && a.position ? a.position : 0) < 0 && (i = 0);
      var r = a.options || a.y_unit;
      return i >= r.length && (i = r.length - 1), r[i] ? r[i].key : null;
    }, isValid: function() {
      var n = t.getState();
      if (this.start_date.valueOf() < n.min_date.valueOf() || this.start_date.valueOf() >= n.max_date.valueOf() || !this.isVisible(this.start_date, this.end_date))
        return !1;
      var d = this._getMultisectionView();
      return !d || d.order[this.section] !== void 0;
    }, fallback: function() {
      var n = new t.$keyboardNavigation.TimeSlot();
      return n.isValid() ? n : new t.$keyboardNavigation.DataArea();
    }, getNodes: function() {
      return Array.prototype.slice.call(t.$container.querySelectorAll(".dhx_focus_slot"));
    }, getNode: function() {
      return this.getNodes()[0];
    }, focus: function() {
      this.section && t.getView() && t.getView().smart_rendering && t.getView().scrollTo && !t.$container.querySelector(`[data-section-id="${this.section}"]`) && t.getView().scrollTo({ section: this.section }), t.$keyboardNavigation.marker.render(this.start_date, this.end_date, this.section), t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this), t.$keyboardNavigation._pasteDate = this.start_date, t.$keyboardNavigation._pasteSection = this.section;
    }, blur: function() {
      t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this), t.$keyboardNavigation.marker.clear();
    }, _modes: t.$keyboardNavigation.SchedulerNode.prototype._modes, _getMode: t.$keyboardNavigation.SchedulerNode.prototype.getMode, addMonthDate: function(n, d, a) {
      var s;
      switch (d) {
        case "up":
          s = t.date.add(n, -1, "week");
          break;
        case "down":
          s = t.date.add(n, 1, "week");
          break;
        case "left":
          s = t.date.day_start(t.date.add(n, -1, "day")), s = this.findVisibleColumn(s, -1);
          break;
        case "right":
          s = t.date.day_start(t.date.add(n, 1, "day")), s = this.findVisibleColumn(s, 1);
          break;
        default:
          s = t.date.day_start(new Date(n));
      }
      var i = t.getState();
      return (n.valueOf() < i.min_date.valueOf() || !a && n.valueOf() >= i.max_date.valueOf()) && (s = new Date(i.min_date)), s;
    }, nextMonthSlot: function(n, d, a) {
      var s, i;
      return (s = this.addMonthDate(n.start_date, d, a)).setHours(t.config.first_hour), (i = new Date(s)).setHours(t.config.last_hour), { start_date: s, end_date: i };
    }, _alignTimeSlot: function(n, d, a, s) {
      for (var i = new Date(d); i.valueOf() < n.valueOf(); )
        i = t.date.add(i, s, a);
      return i.valueOf() > n.valueOf() && (i = t.date.add(i, -s, a)), i;
    }, nextTimelineSlot: function(n, d, a) {
      var s = t.getState(), i = t.matrix[s.mode], r = this._alignTimeSlot(n.start_date, t.date[i.name + "_start"](new Date(n.start_date)), i.x_unit, i.x_step), l = this._alignTimeSlot(n.end_date, t.date[i.name + "_start"](new Date(n.end_date)), i.x_unit, i.x_step);
      l.valueOf() <= r.valueOf() && (l = t.date.add(r, i.x_step, i.x_unit));
      var _ = this.clone(n);
      switch (_.start_date = r, _.end_date = l, _.section = n.section || this._getNextSection(), d) {
        case "up":
          _.section = this._getNextSection(n.section, -1);
          break;
        case "down":
          _.section = this._getNextSection(n.section, 1);
          break;
        case "left":
          _.start_date = this.findVisibleColumn(t.date.add(_.start_date, -i.x_step, i.x_unit), -1), _.end_date = t.date.add(_.start_date, i.x_step, i.x_unit);
          break;
        case "right":
          _.start_date = this.findVisibleColumn(t.date.add(_.start_date, i.x_step, i.x_unit), 1), _.end_date = t.date.add(_.start_date, i.x_step, i.x_unit);
      }
      return (_.start_date.valueOf() < s.min_date.valueOf() || _.start_date.valueOf() >= s.max_date.valueOf()) && (a && _.start_date.valueOf() >= s.max_date.valueOf() ? _.start_date = new Date(s.max_date) : (_.start_date = t.date[s.mode + "_start"](t.date.add(s.date, d == "left" ? -1 : 1, s.mode)), _.end_date = t.date.add(_.start_date, i.x_step, i.x_unit))), _;
    }, nextUnitsSlot: function(n, d, a) {
      var s = this.clone(n);
      s.section = n.section || this._getNextSection();
      var i = n.section || this._getNextSection(), r = t.getState(), l = t._props[r.mode];
      switch (d) {
        case "left":
          i = this._getNextSection(n.section, -1);
          var _ = l.size ? l.size - 1 : l.options.length;
          l.days > 1 && l.order[i] == _ - 1 && t.date.add(n.start_date, -1, "day").valueOf() >= r.min_date.valueOf() && (s = this.nextDaySlot(n, d, a));
          break;
        case "right":
          i = this._getNextSection(n.section, 1), l.days > 1 && !l.order[i] && t.date.add(n.start_date, 1, "day").valueOf() < r.max_date.valueOf() && (s = this.nextDaySlot(n, d, a));
          break;
        default:
          s = this.nextDaySlot(n, d, a), i = n.section;
      }
      return s.section = i, s;
    }, _moveDate: function(n, d) {
      var a = this.findVisibleColumn(t.date.add(n, d, "day"), d);
      return a.setHours(n.getHours()), a.setMinutes(n.getMinutes()), a;
    }, isBeforeLastHour: function(n, d) {
      var a = n.getMinutes(), s = n.getHours(), i = t.config.last_hour;
      return s < i || !d && (i == 24 || s == i) && !a;
    }, isAfterFirstHour: function(n, d) {
      var a = n.getMinutes(), s = n.getHours(), i = t.config.first_hour, r = t.config.last_hour;
      return s >= i || !d && !a && (!s && r == 24 || s == r);
    }, isInVisibleDayTime: function(n, d) {
      return this.isBeforeLastHour(n, d) && this.isAfterFirstHour(n, d);
    }, nextDaySlot: function(n, d, a) {
      var s, i, r = t.config.key_nav_step, l = this._alignTimeSlot(n.start_date, t.date.day_start(new Date(n.start_date)), "minute", r), _ = n.start_date;
      switch (d) {
        case "up":
          if (s = t.date.add(l, -r, "minute"), !this.isInVisibleDayTime(s, !0) && (!a || this.isInVisibleDayTime(_, !0))) {
            var c = !0;
            a && t.date.date_part(new Date(s)).valueOf() != t.date.date_part(new Date(_)).valueOf() && (c = !1), c && (s = this.findVisibleColumn(t.date.add(n.start_date, -1, "day"), -1)), s.setHours(t.config.last_hour), s.setMinutes(0), s = t.date.add(s, -r, "minute");
          }
          i = t.date.add(s, r, "minute");
          break;
        case "down":
          s = t.date.add(l, r, "minute");
          var h = a ? s : t.date.add(s, r, "minute");
          this.isInVisibleDayTime(h, !1) || a && !this.isInVisibleDayTime(_, !1) || (a ? (c = !0, t.date.date_part(new Date(_)).valueOf() == _.valueOf() && (c = !1), c && (s = this.findVisibleColumn(t.date.add(n.start_date, 1, "day"), 1)), s.setHours(t.config.first_hour), s.setMinutes(0), s = t.date.add(s, r, "minute")) : ((s = this.findVisibleColumn(t.date.add(n.start_date, 1, "day"), 1)).setHours(t.config.first_hour), s.setMinutes(0))), i = t.date.add(s, r, "minute");
          break;
        case "left":
          s = this._moveDate(n.start_date, -1), i = this._moveDate(n.end_date, -1);
          break;
        case "right":
          s = this._moveDate(n.start_date, 1), i = this._moveDate(n.end_date, 1);
          break;
        default:
          s = l, i = t.date.add(s, r, "minute");
      }
      return { start_date: s, end_date: i };
    }, nextWeekAgendaSlot: function(n, d) {
      var a, s, i = t.getState();
      switch (d) {
        case "down":
        case "left":
          a = t.date.day_start(t.date.add(n.start_date, -1, "day")), a = this.findVisibleColumn(a, -1);
          break;
        case "up":
        case "right":
          a = t.date.day_start(t.date.add(n.start_date, 1, "day")), a = this.findVisibleColumn(a, 1);
          break;
        default:
          a = t.date.day_start(n.start_date);
      }
      return (n.start_date.valueOf() < i.min_date.valueOf() || n.start_date.valueOf() >= i.max_date.valueOf()) && (a = new Date(i.min_date)), (s = new Date(a)).setHours(t.config.last_hour), { start_date: a, end_date: s };
    }, nextAgendaSlot: function(n, d) {
      return { start_date: n.start_date, end_date: n.end_date };
    }, isDateVisible: function(n) {
      if (!t._ignores_detected)
        return !0;
      var d, a = t.matrix && t.matrix[t.getState().mode];
      return d = a ? t._get_date_index(a, n) : t.locate_holder_day(n), !t._ignores[d];
    }, findVisibleColumn: function(n, d) {
      var a = n;
      d = d || 1;
      for (var s = t.getState(); !this.isDateVisible(a) && (d > 0 && a.valueOf() <= s.max_date.valueOf() || d < 0 && a.valueOf() >= s.min_date.valueOf()); )
        a = this.nextDateColumn(a, d);
      return a;
    }, nextDateColumn: function(n, d) {
      d = d || 1;
      var a = t.matrix && t.matrix[t.getState().mode];
      return a ? t.date.add(n, d * a.x_step, a.x_unit) : t.date.day_start(t.date.add(n, d, "day"));
    }, isVisible: function(n, d) {
      if (!t._ignores_detected)
        return !0;
      for (var a = new Date(n); a.valueOf() < d.valueOf(); ) {
        if (this.isDateVisible(a))
          return !0;
        a = this.nextDateColumn(a);
      }
      return !1;
    }, nextSlot: function(n, d, a, s) {
      var i;
      a = a || this._getMode();
      var r = t.$keyboardNavigation.TimeSlot.prototype.clone(n);
      switch (a) {
        case this._modes.units:
          i = this.nextUnitsSlot(r, d, s);
          break;
        case this._modes.timeline:
          i = this.nextTimelineSlot(r, d, s);
          break;
        case this._modes.year:
        case this._modes.month:
          i = this.nextMonthSlot(r, d, s);
          break;
        case this._modes.weekAgenda:
          i = this.nextWeekAgendaSlot(r, d, s);
          break;
        case this._modes.list:
          i = this.nextAgendaSlot(r, d, s);
          break;
        case this._modes.dayColumns:
          i = this.nextDaySlot(r, d, s);
      }
      return i.start_date.valueOf() >= i.end_date.valueOf() && (i = this.nextSlot(i, d, a)), t.$keyboardNavigation.TimeSlot.prototype.clone(i);
    }, extendSlot: function(n, d) {
      var a;
      switch (this._getMode()) {
        case this._modes.units:
          a = d == "left" || d == "right" ? this.nextUnitsSlot(n, d) : this.extendUnitsSlot(n, d);
          break;
        case this._modes.timeline:
          a = d == "down" || d == "up" ? this.nextTimelineSlot(n, d) : this.extendTimelineSlot(n, d);
          break;
        case this._modes.year:
        case this._modes.month:
          a = this.extendMonthSlot(n, d);
          break;
        case this._modes.dayColumns:
          a = this.extendDaySlot(n, d);
          break;
        case this._modes.weekAgenda:
          a = this.extendWeekAgendaSlot(n, d);
          break;
        default:
          a = n;
      }
      var s = t.getState();
      return a.start_date.valueOf() < s.min_date.valueOf() && (a.start_date = this.findVisibleColumn(s.min_date), a.start_date.setHours(t.config.first_hour)), a.end_date.valueOf() > s.max_date.valueOf() && (a.end_date = this.findVisibleColumn(s.max_date, -1)), t.$keyboardNavigation.TimeSlot.prototype.clone(a);
    }, extendTimelineSlot: function(n, d) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, n, d, "timeline");
    }, extendWeekAgendaSlot: function(n, d) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, n, d, "weekAgenda");
    }, extendGenericSlot: function(n, d, a, s) {
      var i, r = d.movingDate;
      if (r || (r = n[a]), !r || !n[a])
        return d;
      if (!a)
        return t.$keyboardNavigation.TimeSlot.prototype.clone(d);
      (i = this.nextSlot({ start_date: d[r], section: d.section }, a, s, !0)).start_date.valueOf() == d.start_date.valueOf() && (i = this.nextSlot({ start_date: i.start_date, section: i.section }, a, s, !0)), i.movingDate = r;
      var l = this.extendSlotDates(d, i, i.movingDate);
      return l.end_date.valueOf() <= l.start_date.valueOf() && (i.movingDate = i.movingDate == "end_date" ? "start_date" : "end_date"), l = this.extendSlotDates(d, i, i.movingDate), i.start_date = l.start_date, i.end_date = l.end_date, i;
    }, extendSlotDates: function(n, d, a) {
      var s = { start_date: null, end_date: null };
      return a == "start_date" ? (s.start_date = d.start_date, s.end_date = n.end_date) : (s.start_date = n.start_date, s.end_date = d.start_date), s;
    }, extendMonthSlot: function(n, d) {
      return (n = this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, n, d, "month")).start_date.setHours(t.config.first_hour), n.end_date = t.date.add(n.end_date, -1, "day"), n.end_date.setHours(t.config.last_hour), n;
    }, extendUnitsSlot: function(n, d) {
      var a;
      switch (d) {
        case "down":
        case "up":
          a = this.extendDaySlot(n, d);
          break;
        default:
          a = n;
      }
      return a.section = n.section, a;
    }, extendDaySlot: function(n, d) {
      return this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, n, d, "dayColumns");
    }, scrollSlot: function(n) {
      var d = t.getState(), a = this.nextSlot(this, n);
      (a.start_date.valueOf() < d.min_date.valueOf() || a.start_date.valueOf() >= d.max_date.valueOf()) && t.setCurrentView(new Date(a.start_date)), this.moveTo(a);
    }, keys: { left: function() {
      this.scrollSlot("left");
    }, right: function() {
      this.scrollSlot("right");
    }, down: function() {
      this._getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler() : this.scrollSlot("down");
    }, up: function() {
      this._getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler() : this.scrollSlot("up");
    }, "shift+down": function() {
      this.moveTo(this.extendSlot(this, "down"));
    }, "shift+up": function() {
      this.moveTo(this.extendSlot(this, "up"));
    }, "shift+right": function() {
      this.moveTo(this.extendSlot(this, "right"));
    }, "shift+left": function() {
      this.moveTo(this.extendSlot(this, "left"));
    }, enter: function() {
      var n = { start_date: new Date(this.start_date), end_date: new Date(this.end_date) }, d = t.getState().mode;
      t.matrix && t.matrix[d] ? n[t.matrix[t.getState().mode].y_property] = this.section : t._props && t._props[d] && (n[t._props[d].map_to] = this.section), t.addEventNow(n);
    } } }), t.$keyboardNavigation.TimeSlot.prototype.bindAll(t.$keyboardNavigation.TimeSlot.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.MinicalButton = function(n, d) {
      this.container = n, this.index = d || 0;
    }, t.$keyboardNavigation.MinicalButton.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { isValid: function() {
      return !!this.container.offsetWidth;
    }, fallback: function() {
      var n = new t.$keyboardNavigation.TimeSlot();
      return n.isValid() ? n : new t.$keyboardNavigation.DataArea();
    }, focus: function() {
      t.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0"), t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, getNode: function() {
      return this.index ? this.container.querySelector(".dhx_cal_next_button") : this.container.querySelector(".dhx_cal_prev_button");
    }, keys: { right: function(n) {
      this.moveTo(new t.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, left: function(n) {
      this.moveTo(new t.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, down: function() {
      var n = new t.$keyboardNavigation.MinicalCell(this.container, 0, 0);
      n && !n.isValid() && (n = n.fallback()), this.moveTo(n);
    }, enter: function(n) {
      this.getNode().click();
    } } }), t.$keyboardNavigation.MinicalButton.prototype.bindAll(t.$keyboardNavigation.MinicalButton.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.MinicalCell = function(n, d, a) {
      this.container = n, this.row = d || 0, this.col = a || 0;
    }, t.$keyboardNavigation.MinicalCell.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { isValid: function() {
      var n = this._getGrid();
      return !(!n[this.row] || !n[this.row][this.col]);
    }, fallback: function() {
      var n = this.row, d = this.col, a = this._getGrid();
      a[n] || (n = 0);
      var s = !0;
      if (n > a.length / 2 && (s = !1), !a[n]) {
        var i = new t.$keyboardNavigation.TimeSlot();
        return i.isValid() ? i : new t.$keyboardNavigation.DataArea();
      }
      if (s) {
        for (var r = d; a[n] && r < a[n].length; r++)
          if (a[n][r] || r != a[n].length - 1 || (n++, d = 0), a[n][r])
            return new t.$keyboardNavigation.MinicalCell(this.container, n, r);
      } else
        for (r = d; a[n] && r < a[n].length; r--)
          if (a[n][r] || r || (d = a[--n].length - 1), a[n][r])
            return new t.$keyboardNavigation.MinicalCell(this.container, n, r);
      return new t.$keyboardNavigation.MinicalButton(this.container, 0);
    }, focus: function() {
      t.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0"), t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getNode: function(n, d) {
      return this.container.querySelector(".dhx_year_body tr:nth-child(" + (n + 1) + ") td:nth-child(" + (d + 1) + ")");
    }, getNode: function() {
      return this._getNode(this.row, this.col);
    }, _getGrid: function() {
      for (var n = this.container.querySelectorAll(".dhx_year_body tr"), d = [], a = 0; a < n.length; a++) {
        d[a] = [];
        for (var s = n[a].querySelectorAll("td"), i = 0; i < s.length; i++) {
          var r = s[i], l = !0, _ = t._getClassName(r);
          (_.indexOf("dhx_after") > -1 || _.indexOf("dhx_before") > -1 || _.indexOf("dhx_scale_ignore") > -1) && (l = !1), d[a][i] = l;
        }
      }
      return d;
    }, keys: { right: function(n) {
      var d = this._getGrid(), a = this.row, s = this.col + 1;
      d[a] && d[a][s] || (d[a + 1] ? (a += 1, s = 0) : s = this.col);
      var i = new t.$keyboardNavigation.MinicalCell(this.container, a, s);
      i.isValid() || (i = i.fallback()), this.moveTo(i);
    }, left: function(n) {
      var d = this._getGrid(), a = this.row, s = this.col - 1;
      d[a] && d[a][s] || (s = d[a - 1] ? d[a -= 1].length - 1 : this.col);
      var i = new t.$keyboardNavigation.MinicalCell(this.container, a, s);
      i.isValid() || (i = i.fallback()), this.moveTo(i);
    }, down: function() {
      var n = this._getGrid(), d = this.row + 1, a = this.col;
      n[d] && n[d][a] || (d = this.row);
      var s = new t.$keyboardNavigation.MinicalCell(this.container, d, a);
      s.isValid() || (s = s.fallback()), this.moveTo(s);
    }, up: function() {
      var n = this._getGrid(), d = this.row - 1, a = this.col;
      if (n[d] && n[d][a]) {
        var s = new t.$keyboardNavigation.MinicalCell(this.container, d, a);
        s.isValid() || (s = s.fallback()), this.moveTo(s);
      } else {
        var i = 0;
        this.col > n[this.row].length / 2 && (i = 1), this.moveTo(new t.$keyboardNavigation.MinicalButton(this.container, i));
      }
    }, enter: function(n) {
      this.getNode().querySelector(".dhx_month_head").click();
    } } }), t.$keyboardNavigation.MinicalCell.prototype.bindAll(t.$keyboardNavigation.MinicalCell.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.DataArea = function(n) {
      this.index = n || 0;
    }, t.$keyboardNavigation.DataArea.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { getNode: function(n) {
      return t.$container.querySelector(".dhx_cal_data");
    }, _handlers: null, isValid: function() {
      return !0;
    }, fallback: function() {
      return this;
    }, keys: { "up,down,right,left": function() {
      this.moveTo(new t.$keyboardNavigation.TimeSlot());
    } } }), t.$keyboardNavigation.DataArea.prototype.bindAll(t.$keyboardNavigation.DataArea.prototype.keys);
  }(e), ua(e), function(t) {
    t.$keyboardNavigation.dispatcher = { isActive: !1, activeNode: null, globalNode: new t.$keyboardNavigation.SchedulerNode(), keepScrollPosition: function(n) {
      var d, a, s = t.$container.querySelector(".dhx_timeline_scrollable_data");
      s || (s = t.$container.querySelector(".dhx_cal_data")), s && (d = s.scrollTop, a = s.scrollLeft), n(), s && (s.scrollTop = d, s.scrollLeft = a);
    }, enable: function() {
      if (t.$container) {
        this.isActive = !0;
        var n = this;
        this.keepScrollPosition(function() {
          n.globalNode.enable(), n.setActiveNode(n.getActiveNode());
        });
      }
    }, disable: function() {
      this.isActive = !1, this.globalNode.disable();
    }, isEnabled: function() {
      return !!this.isActive;
    }, getDefaultNode: function() {
      return this.globalNode.getDefaultNode();
    }, setDefaultNode: function() {
      this.setActiveNode(this.getDefaultNode());
    }, getActiveNode: function() {
      var n = this.activeNode;
      return n && !n.isValid() && (n = n.fallback()), n;
    }, focusGlobalNode: function() {
      this.blurNode(this.globalNode), this.focusNode(this.globalNode);
    }, setActiveNode: function(n) {
      n && n.isValid() && (this.activeNode && this.activeNode.compareTo(n) || this.isEnabled() && (this.blurNode(this.activeNode), this.activeNode = n, this.focusNode(this.activeNode)));
    }, focusNode: function(n) {
      n && n.focus && (n.focus(), n.getNode && document.activeElement != n.getNode() && this.setActiveNode(new t.$keyboardNavigation.DataArea()));
    }, blurNode: function(n) {
      n && n.blur && n.blur();
    }, getInlineEditor: function(n) {
      var d = t.$container.querySelector(".dhx_cal_editor[" + t.config.event_attribute + "='" + n + "'] textarea");
      return d && d.offsetWidth ? d : null;
    }, keyDownHandler: function(n) {
      if (!n.defaultPrevented) {
        var d = this.getActiveNode();
        if ((!t.$keyboardNavigation.isModal() || d && d.container && t.utils.dom.locateCss({ target: d.container }, "dhx_minical_popup", !1)) && (!t.getState().editor_id || !this.getInlineEditor(t.getState().editor_id)) && this.isEnabled()) {
          n = n || window.event;
          var a = this.globalNode, s = t.$keyboardNavigation.shortcuts.getCommandFromEvent(n);
          d ? d.findHandler(s) ? d.doAction(s, n) : a.findHandler(s) && a.doAction(s, n) : this.setDefaultNode();
        }
      }
    }, _timeout: null, delay: function(n, d) {
      clearTimeout(this._timeout), this._timeout = setTimeout(n, d || 1);
    } };
  }(e), fa(e), function() {
    pa(e), function(i) {
      i.$keyboardNavigation._minicalendars = [], i.$keyboardNavigation.isMinical = function(r) {
        for (var l = i.$keyboardNavigation._minicalendars, _ = 0; _ < l.length; _++)
          if (this.isChildOf(r, l[_]))
            return !0;
        return !1;
      }, i.$keyboardNavigation.isChildOf = function(r, l) {
        for (; r && r !== l; )
          r = r.parentNode;
        return r === l;
      }, i.$keyboardNavigation.patchMinicalendar = function() {
        var r = i.$keyboardNavigation.dispatcher;
        function l(p) {
          var f = p.target;
          r.enable(), r.setActiveNode(new i.$keyboardNavigation.MinicalButton(f, 0));
        }
        function _(p) {
          var f = p.target || p.srcElement, u = i.utils.dom.locateCss(p, "dhx_cal_prev_button", !1), v = i.utils.dom.locateCss(p, "dhx_cal_next_button", !1), m = i.utils.dom.locateCss(p, "dhx_year_body", !1), x = 0, w = 0;
          if (m) {
            for (var S, N, E = f; E && E.tagName.toLowerCase() != "td"; )
              E = E.parentNode;
            if (E && (S = (N = E).parentNode), S && N) {
              for (var T = S.parentNode.querySelectorAll("tr"), g = 0; g < T.length; g++)
                if (T[g] == S) {
                  x = g;
                  break;
                }
              var b = S.querySelectorAll("td");
              for (g = 0; g < b.length; g++)
                if (b[g] == N) {
                  w = g;
                  break;
                }
            }
          }
          var y = p.currentTarget;
          r.delay(function() {
            var k;
            (u || v || m) && (u ? (k = new i.$keyboardNavigation.MinicalButton(y, 0), r.setActiveNode(new i.$keyboardNavigation.MinicalButton(y, 0))) : v ? k = new i.$keyboardNavigation.MinicalButton(y, 1) : m && (k = new i.$keyboardNavigation.MinicalCell(y, x, w)), k && (r.enable(), k.isValid() && (r.activeNode = null, r.setActiveNode(k))));
          });
        }
        if (i.renderCalendar) {
          var c = i.renderCalendar;
          i.renderCalendar = function() {
            var p = c.apply(this, arguments), f = i.$keyboardNavigation._minicalendars;
            i.eventRemove(p, "click", _), i.event(p, "click", _), i.eventRemove(p, "focus", l), i.event(p, "focus", l);
            for (var u = !1, v = 0; v < f.length; v++)
              if (f[v] == p) {
                u = !0;
                break;
              }
            if (u || f.push(p), r.isEnabled()) {
              var m = r.getActiveNode();
              m && m.container == p ? r.focusNode(m) : p.setAttribute("tabindex", "0");
            } else
              p.setAttribute("tabindex", "0");
            return p;
          };
        }
        if (i.destroyCalendar) {
          var h = i.destroyCalendar;
          i.destroyCalendar = function(p, f) {
            p = p || (i._def_count ? i._def_count.firstChild : null);
            var u = h.apply(this, arguments);
            if (!p || !p.parentNode)
              for (var v = i.$keyboardNavigation._minicalendars, m = 0; m < v.length; m++)
                v[m] == p && (i.eventRemove(v[m], "focus", l), v.splice(m, 1), m--);
            return u;
          };
        }
      };
    }(e);
    var t = e.$keyboardNavigation.dispatcher;
    if (e.$keyboardNavigation.attachSchedulerHandlers(), e.renderCalendar)
      e.$keyboardNavigation.patchMinicalendar();
    else
      var n = e.attachEvent("onSchedulerReady", function() {
        e.detachEvent(n), e.$keyboardNavigation.patchMinicalendar();
      });
    function d() {
      if (e.config.key_nav) {
        var i = document.activeElement;
        return !(!i || e.utils.dom.locateCss(i, "dhx_cal_quick_info", !1)) && (e.$keyboardNavigation.isChildOf(i, e.$container) || e.$keyboardNavigation.isMinical(i));
      }
    }
    function a(i) {
      i && !t.isEnabled() ? t.enable() : !i && t.isEnabled() && t.disable();
    }
    const s = setInterval(function() {
      if (e.$container && e.$keyboardNavigation.isChildOf(e.$container, document.body)) {
        var i = d();
        i ? a(i) : !i && t.isEnabled() && setTimeout(function() {
          e.$destroyed || (e.config.key_nav ? a(d()) : e.$container.removeAttribute("tabindex"));
        }, 100);
      }
    }, 500);
    e.attachEvent("onDestroy", function() {
      clearInterval(s);
    });
  }();
}, layer: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    this.layers.sort(function(t, n) {
      return t.zIndex - n.zIndex;
    }), e._dp_init = function(t) {
      t._methods = ["_set_event_text_style", "", "changeEventId", "deleteEvent"], this.attachEvent("onEventAdded", function(n) {
        !this._loading && this.validId(n) && this.getEvent(n) && this.getEvent(n).layer == t.layer && t.setUpdated(n, !0, "inserted");
      }), this.attachEvent("onBeforeEventDelete", function(n) {
        if (this.getEvent(n) && this.getEvent(n).layer == t.layer) {
          if (!this.validId(n))
            return;
          var d = t.getState(n);
          return d == "inserted" || this._new_event ? (t.setUpdated(n, !1), !0) : d != "deleted" && (d == "true_deleted" || (t.setUpdated(n, !0, "deleted"), !1));
        }
        return !0;
      }), this.attachEvent("onEventChanged", function(n) {
        !this._loading && this.validId(n) && this.getEvent(n) && this.getEvent(n).layer == t.layer && t.setUpdated(n, !0, "updated");
      }), t._getRowData = function(n, d) {
        var a = this.obj.getEvent(n), s = {};
        for (var i in a)
          i.indexOf("_") !== 0 && (a[i] && a[i].getUTCFullYear ? s[i] = this.obj._helpers.formatDate(a[i]) : s[i] = a[i]);
        return s;
      }, t._clearUpdateFlag = function() {
      }, t.attachEvent("insertCallback", e._update_callback), t.attachEvent("updateCallback", e._update_callback), t.attachEvent("deleteCallback", function(n, d) {
        this.obj.setUserData(d, this.action_param, "true_deleted"), this.obj.deleteEvent(d);
      });
    }, function() {
      var t = function(a) {
        if (a === null || typeof a != "object")
          return a;
        var s = new a.constructor();
        for (var i in a)
          s[i] = t(a[i]);
        return s;
      };
      e._dataprocessors = [], e._layers_zindex = {};
      for (var n = 0; n < e.layers.length; n++) {
        if (e.config["lightbox_" + e.layers[n].name] = {}, e.config["lightbox_" + e.layers[n].name].sections = t(e.config.lightbox.sections), e._layers_zindex[e.layers[n].name] = e.config.initial_layer_zindex || 5 + 3 * n, e.layers[n].url) {
          var d = e.createDataProcessor({ url: e.layers[n].url });
          d.layer = e.layers[n].name, e._dataprocessors.push(d), e._dataprocessors[n].init(e);
        }
        e.layers[n].isDefault && (e.defaultLayer = e.layers[n].name);
      }
    }(), e.showLayer = function(t) {
      this.toggleLayer(t, !0);
    }, e.hideLayer = function(t) {
      this.toggleLayer(t, !1);
    }, e.toggleLayer = function(t, n) {
      var d = this.getLayer(t);
      d.visible = n !== void 0 ? !!n : !d.visible, this.setCurrentView(this._date, this._mode);
    }, e.getLayer = function(t) {
      var n, d;
      typeof t == "string" && (d = t), typeof t == "object" && (d = t.layer);
      for (var a = 0; a < e.layers.length; a++)
        e.layers[a].name == d && (n = e.layers[a]);
      return n;
    }, e.attachEvent("onBeforeLightbox", function(t) {
      var n = this.getEvent(t);
      return this.config.lightbox.sections = this.config["lightbox_" + n.layer].sections, e.resetLightbox(), !0;
    }), e.attachEvent("onClick", function(t, n) {
      var d = e.getEvent(t);
      return !e.getLayer(d.layer).noMenu;
    }), e.attachEvent("onEventCollision", function(t, n) {
      var d = this.getLayer(t);
      if (!d.checkCollision)
        return !1;
      for (var a = 0, s = 0; s < n.length; s++)
        n[s].layer == d.name && n[s].id != t.id && a++;
      return a >= e.config.collision_limit;
    }), e.addEvent = function(t, n, d, a, s) {
      var i = t;
      arguments.length != 1 && ((i = s || {}).start_date = t, i.end_date = n, i.text = d, i.id = a, i.layer = this.defaultLayer), i.id = i.id || e.uid(), i.text = i.text || "", typeof i.start_date == "string" && (i.start_date = this.templates.api_date(i.start_date)), typeof i.end_date == "string" && (i.end_date = this.templates.api_date(i.end_date)), i._timed = this.isOneDayEvent(i);
      var r = !this._events[i.id];
      this._events[i.id] = i, this.event_updated(i), this._loading || this.callEvent(r ? "onEventAdded" : "onEventChanged", [i.id, i]);
    }, this._evs_layer = {};
    for (var o = 0; o < this.layers.length; o++)
      this._evs_layer[this.layers[o].name] = [];
    e.addEventNow = function(t, n, d) {
      var a = {};
      typeof t == "object" && (a = t, t = null);
      var s = 6e4 * (this.config.event_duration || this.config.time_step);
      t || (t = Math.round(e._currentDate().valueOf() / s) * s);
      var i = new Date(t);
      if (!n) {
        var r = this.config.first_hour;
        r > i.getHours() && (i.setHours(r), t = i.valueOf()), n = t + s;
      }
      a.start_date = a.start_date || i, a.end_date = a.end_date || new Date(n), a.text = a.text || this.locale.labels.new_event, a.id = this._drag_id = this.uid(), a.layer = this.defaultLayer, this._drag_mode = "new-size", this._loading = !0, this.addEvent(a), this.callEvent("onEventCreated", [this._drag_id, d]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(d);
    }, e._t_render_view_data = function(t) {
      if (this.config.multi_day && !this._table_view) {
        for (var n = [], d = [], a = 0; a < t.length; a++)
          t[a]._timed ? n.push(t[a]) : d.push(t[a]);
        this._table_view = !0, this.render_data(d), this._table_view = !1, this.render_data(n);
      } else
        this.render_data(t);
    }, e.render_view_data = function() {
      if (this._not_render)
        this._render_wait = !0;
      else {
        this._render_wait = !1, this.clear_view(), this._evs_layer = {};
        for (var t = 0; t < this.layers.length; t++)
          this._evs_layer[this.layers[t].name] = [];
        var n = this.get_visible_events();
        for (t = 0; t < n.length; t++)
          this._evs_layer[n[t].layer] && this._evs_layer[n[t].layer].push(n[t]);
        if (this._mode == "month") {
          var d = [];
          for (t = 0; t < this.layers.length; t++)
            this.layers[t].visible && (d = d.concat(this._evs_layer[this.layers[t].name]));
          this._t_render_view_data(d);
        } else
          for (t = 0; t < this.layers.length; t++)
            if (this.layers[t].visible) {
              var a = this._evs_layer[this.layers[t].name];
              this._t_render_view_data(a);
            }
      }
    }, e._render_v_bar = function(t, n, d, a, s, i, r, l, _) {
      var c = t.id;
      r.indexOf("<div class=") == -1 && (r = e.templates["event_header_" + t.layer] ? e.templates["event_header_" + t.layer](t.start_date, t.end_date, t) : r), l.indexOf("<div class=") == -1 && (l = e.templates["event_text_" + t.layer] ? e.templates["event_text_" + t.layer](t.start_date, t.end_date, t) : l);
      var h = document.createElement("div"), p = "dhx_cal_event", f = e.templates["event_class_" + t.layer] ? e.templates["event_class_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_class(t.start_date, t.end_date, t);
      f && (p = p + " " + f);
      var u = e._border_box_events(), v = a - 2, m = u ? v : a - 4, x = u ? v : a - 6, w = u ? v : a - 14, S = u ? v - 2 : a - 8, N = u ? s - this.xy.event_header_height : s - 30 + 1, E = '<div event_id="' + c + '" ' + e.config.event_attribute + '="' + c + '" class="' + p + '" style="position:absolute; top:' + d + "px; left:" + n + "px; width:" + m + "px; height:" + s + "px;" + (i || "") + '">';
      return E += '<div class="dhx_header" style=" width:' + x + 'px;" >&nbsp;</div>', E += '<div class="dhx_title">' + r + "</div>", E += '<div class="dhx_body" style=" width:' + w + "px; height:" + N + 'px;">' + l + "</div>", E += '<div class="dhx_footer" style=" width:' + S + "px;" + (_ ? " margin-top:-1px;" : "") + '" ></div></div>', h.innerHTML = E, h.style.zIndex = 100, h.firstChild;
    }, e.render_event_bar = function(t) {
      var n = this._els.dhx_cal_data[0], d = this._colsS[t._sday], a = this._colsS[t._eday];
      a == d && (a = this._colsS[t._eday + 1]);
      var s = this.xy.bar_height, i = this._colsS.heights[t._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + t._sorder * s, r = document.createElement("div"), l = t._timed ? "dhx_cal_event_clear" : "dhx_cal_event_line", _ = e.templates["event_class_" + t.layer] ? e.templates["event_class_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_class(t.start_date, t.end_date, t);
      _ && (l = l + " " + _);
      var c = '<div event_id="' + t.id + '" ' + this.config.event_attribute + '="' + t.id + '" class="' + l + '" style="position:absolute; top:' + i + "px; left:" + d + "px; width:" + (a - d - 15) + "px;" + (t._text_style || "") + '">';
      t._timed && (c += e.templates["event_bar_date_" + t.layer] ? e.templates["event_bar_date_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_bar_date(t.start_date, t.end_date, t)), c += e.templates["event_bar_text_" + t.layer] ? e.templates["event_bar_text_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_bar_text(t.start_date, t.end_date, t) + "</div>)", c += "</div>", r.innerHTML = c, this._rendered.push(r.firstChild), n.appendChild(r.firstChild);
    }, e.render_event = function(t) {
      var n = e.xy.menu_width;
      if (e.getLayer(t.layer).noMenu && (n = 0), !(t._sday < 0)) {
        var d = e.locate_holder(t._sday);
        if (d) {
          var a = 60 * t.start_date.getHours() + t.start_date.getMinutes(), s = 60 * t.end_date.getHours() + t.end_date.getMinutes() || 60 * e.config.last_hour, i = Math.round((60 * a * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px) + 1, r = Math.max(e.xy.min_event_height, (s - a) * this.config.hour_size_px / 60) + 1, l = Math.floor((d.clientWidth - n) / t._count), _ = t._sorder * l + 1;
          t._inner || (l *= t._count - t._sorder);
          var c = this._render_v_bar(t.id, n + _, i, l, r, t._text_style, e.templates.event_header(t.start_date, t.end_date, t), e.templates.event_text(t.start_date, t.end_date, t));
          if (this._rendered.push(c), d.appendChild(c), _ = _ + parseInt(d.style.left, 10) + n, i += this._dy_shift, c.style.zIndex = this._layers_zindex[t.layer], this._edit_id == t.id) {
            c.style.zIndex = parseInt(c.style.zIndex) + 1;
            var h = c.style.zIndex;
            l = Math.max(l - 4, e.xy.editor_width), (c = document.createElement("div")).setAttribute("event_id", t.id), c.setAttribute(this.config.event_attribute, t.id), this.set_xy(c, l, r - 20, _, i + 14), c.className = "dhx_cal_editor", c.style.zIndex = h;
            var p = document.createElement("div");
            this.set_xy(p, l - 6, r - 26), p.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;", p.style.zIndex = h, c.appendChild(p), this._els.dhx_cal_data[0].appendChild(c), this._rendered.push(c), p.innerHTML = "<textarea class='dhx_cal_editor'>" + t.text + "</textarea>", this._editor = p.firstChild, this._editor.addEventListener("keypress", function(x) {
              if (x.shiftKey)
                return !0;
              var w = x.keyCode;
              w == e.keys.edit_save && e.editStop(!0), w == e.keys.edit_cancel && e.editStop(!1);
            }), this._editor.addEventListener("selectstart", function(x) {
              return x.cancelBubble = !0, !0;
            }), p.firstChild.focus(), this._els.dhx_cal_data[0].scrollLeft = 0, p.firstChild.select();
          }
          if (this._select_id == t.id) {
            c.style.zIndex = parseInt(c.style.zIndex) + 1;
            for (var f = this.config["icons_" + (this._edit_id == t.id ? "edit" : "select")], u = "", v = 0; v < f.length; v++)
              u += "<div class='dhx_menu_icon " + f[v] + "' title='" + this.locale.labels[f[v]] + "'></div>";
            var m = this._render_v_bar(t.id, _ - n + 1, i, n, 20 * f.length + 26, "", "<div class='dhx_menu_head'></div>", u, !0);
            m.style.left = _ - n + 1, m.style.zIndex = c.style.zIndex, this._els.dhx_cal_data[0].appendChild(m), this._rendered.push(m);
          }
        }
      }
    }, e.filter_agenda = function(t, n) {
      var d = e.getLayer(n.layer);
      return d && d.visible;
    };
  });
}, limit: function(e) {
  e.config.limit_start = null, e.config.limit_end = null, e.config.limit_view = !1, e.config.check_limits = !0, e._temp_limit_scope = function() {
    var o = null;
    e.attachEvent("onBeforeViewChange", function(t, n, d, a) {
      function s(i, r) {
        var l = e.config.limit_start, _ = e.config.limit_end, c = e.date.add(i, 1, r);
        return i.valueOf() > _.valueOf() || c <= l.valueOf();
      }
      return !e.config.limit_view || !s(a = a || n, d = d || t) || n.valueOf() == a.valueOf() || (setTimeout(function() {
        if (e.$destroyed)
          return !0;
        var i = s(n, d) ? e.config.limit_start : n;
        e.setCurrentView(s(i, d) ? null : i, d);
      }, 1), !1);
    }), e.attachEvent("onMouseDown", function(t) {
      return t != "dhx_time_block";
    }), e.attachEvent("onBeforeDrag", function(t) {
      return !t || e.checkLimitViolation(e.getEvent(t));
    }), e.attachEvent("onClick", function(t, n) {
      return e.checkLimitViolation(e.getEvent(t));
    }), e.attachEvent("onBeforeLightbox", function(t) {
      var n = e.getEvent(t);
      return o = [n.start_date, n.end_date], e.checkLimitViolation(n);
    }), e.attachEvent("onEventSave", function(t, n, d) {
      if (!n.start_date || !n.end_date) {
        var a = e.getEvent(t);
        n.start_date = new Date(a.start_date), n.end_date = new Date(a.end_date);
      }
      if (n.rec_type) {
        var s = e._lame_clone(n);
        return e._roll_back_dates(s), e.checkLimitViolation(s);
      }
      return e.checkLimitViolation(n);
    }), e.attachEvent("onEventAdded", function(t) {
      if (!t)
        return !0;
      var n = e.getEvent(t);
      return !e.checkLimitViolation(n) && e.config.limit_start && e.config.limit_end && (n.start_date < e.config.limit_start && (n.start_date = new Date(e.config.limit_start)), n.start_date.valueOf() >= e.config.limit_end.valueOf() && (n.start_date = this.date.add(e.config.limit_end, -1, "day")), n.end_date < e.config.limit_start && (n.end_date = new Date(e.config.limit_start)), n.end_date.valueOf() >= e.config.limit_end.valueOf() && (n.end_date = this.date.add(e.config.limit_end, -1, "day")), n.start_date.valueOf() >= n.end_date.valueOf() && (n.end_date = this.date.add(n.start_date, this.config.event_duration || this.config.time_step, "minute")), n._timed = this.isOneDayEvent(n)), !0;
    }), e.attachEvent("onEventChanged", function(t) {
      if (!t)
        return !0;
      var n = e.getEvent(t);
      if (!e.checkLimitViolation(n)) {
        if (!o)
          return !1;
        n.start_date = o[0], n.end_date = o[1], n._timed = this.isOneDayEvent(n);
      }
      return !0;
    }), e.attachEvent("onBeforeEventChanged", function(t, n, d) {
      return e.checkLimitViolation(t);
    }), e.attachEvent("onBeforeEventCreated", function(t) {
      var n = e.getActionData(t).date, d = { _timed: !0, start_date: n, end_date: e.date.add(n, e.config.time_step, "minute") };
      return e.checkLimitViolation(d);
    }), e.attachEvent("onViewChange", function() {
      e._mark_now();
    }), e.attachEvent("onAfterSchedulerResize", function() {
      return window.setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e._mark_now();
      }, 1), !0;
    }), e.attachEvent("onTemplatesReady", function() {
      e._mark_now_timer = window.setInterval(function() {
        e._is_initialized() && e._mark_now();
      }, 6e4);
    }), e.attachEvent("onDestroy", function() {
      clearInterval(e._mark_now_timer);
    });
  }, e._temp_limit_scope();
}, map_view: function(e) {
  let o = null, t = [];
  const n = { googleMap: new ga(e), openStreetMaps: new ma(e), mapbox: new va(e) };
  function d(s) {
    o = s.ext.mapView.createAdapter(), t.push(e.attachEvent("onEventSave", function(i, r, l) {
      let _ = e.getEvent(i);
      return _ && _.event_location != r.event_location && (e._eventLocationChanged = !0), !0;
    }), e.attachEvent("onEventChanged", (i, r) => {
      const { start_date: l, end_date: _ } = r, { min_date: c, max_date: h } = e.getState();
      return l.valueOf() < h.valueOf() && _.valueOf() > c.valueOf() && o && (e.config.map_settings.resolve_event_location && r.event_location && !e._latLngUpdate ? a(r, o) : o.updateEventMarker(r)), e._latLngUpdate = !1, !0;
    }), e.attachEvent("onEventIdChange", function(i, r) {
      let l = e.getEvent(r);
      o == null || o.removeEventMarker(i), o == null || o.addEventMarker(l);
    }), e.attachEvent("onEventAdded", (i, r) => {
      const { start_date: l, end_date: _ } = r, { min_date: c, max_date: h } = e.getState();
      l.valueOf() < h.valueOf() && _.valueOf() > c.valueOf() && o && (e.config.map_settings.resolve_event_location && r.event_location && e._eventLocationChanged ? (a(r, o), e._eventLocationChanged = !1) : (o.addEventMarker(r), o.onEventClick(r)));
    }), e.attachEvent("onClick", function(i, r) {
      const l = e.getEvent(i);
      return o && l && o.onEventClick(l), !1;
    }), e.attachEvent("onBeforeEventDelete", (i, r) => (o && o.removeEventMarker(i), !0)));
  }
  async function a(s, i) {
    let r = await i.resolveAddress(s.event_location);
    return s.lat = r.lat, s.lng = r.lng, i.removeEventMarker(String(s.id)), i.addEventMarker(s), s;
  }
  e.ext || (e.ext = {}), e.ext.mapView = { createAdapter: function() {
    return n[e.config.map_view_provider];
  }, createMarker: function(s) {
    return new google.maps.Marker(s);
  }, currentAdapter: null, adapters: n }, e._latLngUpdate = !1, e._eventLocationChanged = !1, e.config.map_view_provider = "googleMap", e.config.map_settings = { initial_position: { lat: 48.724, lng: 8.215 }, error_position: { lat: 15, lng: 15 }, initial_zoom: 1, zoom_after_resolve: 15, info_window_max_width: 300, resolve_user_location: !0, resolve_event_location: !0, view_provider: "googleMap" }, e.config.map_initial_position && (e.config.map_settings.initial_position = { lat: e.config.map_initial_position.lat(), lng: e.config.map_initial_position.lng() }), e.config.map_error_position && (e.config.map_settings.error_position = { lat: e.config.map_error_position.lat(), lng: e.config.map_error_position.lng() }), e.xy.map_date_width = 188, e.xy.map_icon_width = 25, e.xy.map_description_width = 400, e.date.add_map = function(s, i, r) {
    return new Date(s.valueOf());
  }, e.templates.map_date = function(s, i, r) {
    return "";
  }, e.templates.map_time = function(s, i, r) {
    return e.config.rtl && !r._timed ? e.templates.day_date(i) + " &ndash; " + e.templates.day_date(s) : r._timed ? this.day_date(r.start_date, r.end_date, r) + " " + this.event_date(s) : e.templates.day_date(s) + " &ndash; " + e.templates.day_date(i);
  }, e.templates.map_text = function(s, i, r) {
    return r.text;
  }, e.templates.map_info_content = function(s) {
    return `<div><b>Event's text:</b> ${s.text}
				<div><b>Location:</b> ${s.event_location}</div>
				<div><b>Starts:</b> ${e.templates.tooltip_date_format(s.start_date)}</div>
				<div><b>Ends:</b> ${e.templates.tooltip_date_format(s.end_date)}</div>
			</div>`;
  }, e.date.map_start = function(s) {
    return s;
  }, e.dblclick_dhx_map_area = function(s) {
    let i = s.target.closest(`[${e.config.event_attribute}]`);
    if (i) {
      let r = i.getAttribute(`${e.config.event_attribute}`);
      e.showLightbox(r);
    }
    this.config.readonly || !this.config.dblclick_create || i || this.addEventNow({ start_date: e.config.map_start, end_date: e.date.add(e.config.map_start, e.config.time_step, "minute") });
  }, e.attachEvent("onSchedulerReady", function() {
    e.config.map_initial_zoom !== void 0 && (e.config.map_settings.initial_zoom = e.config.map_initial_zoom), e.config.map_zoom_after_resolve !== void 0 && (e.config.map_settings.zoom_after_resolve = e.config.map_zoom_after_resolve), e.config.map_infowindow_max_width !== void 0 && (e.config.map_settings.info_window_max_width = e.config.map_infowindow_max_width), e.config.map_resolve_user_location !== void 0 && (e.config.map_settings.resolve_user_location = e.config.map_resolve_user_location), e.config.map_view_provider !== void 0 && (e.config.map_settings.view_provider = e.config.map_view_provider), e.config.map_type !== void 0 && (e.config.map_settings.type = e.config.map_type), e.config.map_resolve_event_location !== void 0 && (e.config.map_settings.resolve_event_location = e.config.map_resolve_event_location), e.ext.mapView.currentAdapter = e.config.map_view_provider;
    let s = document.createElement("div");
    s.className = "mapContainer", s.id = "mapContainer", s.style.display = "none", s.style.zIndex = "1", e._obj.appendChild(s);
    const i = e.render_data;
    function r() {
      let _ = e.get_visible_events();
      _.sort(function(f, u) {
        return f.start_date.valueOf() == u.start_date.valueOf() ? f.id > u.id ? 1 : -1 : f.start_date > u.start_date ? 1 : -1;
      });
      let c = "<div " + e._waiAria.mapAttrString() + " class='dhx_map_area'>";
      for (let f = 0; f < _.length; f++) {
        let u = _[f], v = u.id == e._selected_event_id ? "dhx_map_line highlight" : "dhx_map_line", m = u.color ? "--dhx-scheduler-event-background:" + u.color + ";" : "", x = u.textColor ? "--dhx-scheduler-event-color:" + u.textColor + ";" : "", w = e._waiAria.mapRowAttrString(u), S = e._waiAria.mapDetailsBtnString();
        c += "<div " + w + " class='" + v + "' event_id='" + u.id + "' " + e.config.event_attribute + "='" + u.id + "' style='" + m + x + (u._text_style || "") + " width: " + (e.xy.map_date_width + e.xy.map_description_width + 2) + "px;'><div class='dhx_map_event_time' style='width: " + e.xy.map_date_width + "px;' >" + e.templates.map_time(u.start_date, u.end_date, u) + "</div>", c += `<div ${S} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`, c += "<div class='line_description' style='width:" + (e.xy.map_description_width - e.xy.map_icon_width) + "px;'>" + e.templates.map_text(u.start_date, u.end_date, u) + "</div></div>";
      }
      c += "<div class='dhx_v_border' style=" + (e.config.rtl ? "'right: " : "'left: ") + (e.xy.map_date_width - 1) + "px;'></div><div class='dhx_v_border_description'></div></div>", e._els.dhx_cal_data[0].scrollTop = 0, e._els.dhx_cal_data[0].innerHTML = c;
      let h = e._els.dhx_cal_data[0].firstChild.childNodes, p = e._getNavDateElement();
      p && (p.innerHTML = e.templates[e._mode + "_date"](e._min_date, e._max_date, e._mode)), e._reset_rendered_events();
      for (let f = 0; f < h.length - 2; f++)
        e._rendered[f] = h[f];
    }
    e.render_data = function(_, c) {
      if (this._mode != "map")
        return i.apply(this, arguments);
      {
        r();
        let h = e.get_visible_events();
        o && (o.clearEventMarkers(), h.forEach((p) => o == null ? void 0 : o.addEventMarker(p)));
      }
    }, e.map_view = function(_) {
      e._els.dhx_cal_data[0].style.width = e.xy.map_date_width + e.xy.map_description_width + 1 + "px", e._min_date = e.config.map_start || e._currentDate(), e._max_date = e.config.map_end || e.date.add(e._currentDate(), 1, "year"), e._table_view = !0, function(f) {
        if (f) {
          const u = e.locale.labels;
          e._els.dhx_cal_header[0].innerHTML = "<div class='dhx_map_head' style='width: " + (e.xy.map_date_width + e.xy.map_description_width + 2) + "px;' ><div class='headline_date' style='width: " + e.xy.map_date_width + "px;'>" + u.date + "</div><div class='headline_description' style='width: " + e.xy.map_description_width + "px;'>" + u.description + "</div></div>", e._table_view = !0, e.set_sizes();
        }
      }(_);
      let c = document.getElementById("mapContainer");
      var h, p;
      (function(f) {
        let u = document.getElementById(f);
        if (u) {
          const v = e.$container.querySelector(".dhx_cal_navline").offsetHeight;
          let m = e.$container.querySelector(".dhx_cal_data").offsetHeight + e.$container.querySelector(".dhx_cal_header").offsetHeight;
          m < 0 && (m = 0);
          let x = e._x - e.xy.map_date_width - e.xy.map_description_width - 1;
          x < 0 && (x = 0), u.style.height = m + "px", u.style.width = x + "px", u.style.position = "absolute", u.style.top = v + "px", e.config.rtl ? u.style.marginRight = e.xy.map_date_width + e.xy.map_description_width + 1 + "px" : u.style.marginLeft = e.xy.map_date_width + e.xy.map_description_width + 1 + "px", u.style.marginTop = e.xy.nav_height + 2 + "px";
        }
      })("mapContainer"), _ && c ? (s.style.display = "block", r(), e.config.map_view_provider == e.ext.mapView.currentAdapter ? (o == null || o.destroy(c), d(e), o == null || o.initialize(c, e.config.map_settings)) : (o == null || o.destroy(c), d(e), o == null || o.initialize(c, e.config.map_settings), e.ext.mapView.currentAdapter = e.config.map_view_provider), o && (h = e.config.map_settings, p = o, h.resolve_user_location ? navigator.geolocation && navigator.geolocation.getCurrentPosition(function(f) {
        p.setView(f.coords.latitude, f.coords.longitude, h.zoom_after_resolve || h.initial_zoom);
      }) : p.setView(h.initial_position.lat, h.initial_position.lng, h.initial_zoom))) : (s.style.display = "none", e._els.dhx_cal_data[0].style.width = "100%", o && c && (o.destroy(c), o = null, e.ext.mapView.currentAdapter = e.config.map_view_provider), t.forEach((f) => e.detachEvent(f)), t = []);
    }, e.attachEvent("onLocationError", function(_) {
      return alert("Location can't be found"), google.maps.LatLng(51.47784, -1492e-6);
    });
    let l = async function(_) {
      if (o) {
        const c = await o.resolveAddress(_.event_location);
        c.lat && c.lng ? (_.lat = +c.lat, _.lng = +c.lng) : (e.callEvent("onLocationError", [_.id]), _.lng = e.config.map_settings.error_position.lng, _.lat = e.config.map_settings.error_position.lat), e._latLngUpdate = !0, e.callEvent("onEventChanged", [_.id, _]);
      }
    };
    e._event_resolve_delay = 1500, e.attachEvent("onEventLoading", function(_) {
      return _.lat && _.lng && (_.lat = +_.lat, _.lng = +_.lng), e.config.map_settings.resolve_event_location && _.event_location && !_.lat && !_.lng && (e._event_resolve_delay += 1500, function(c, h, p, f) {
        setTimeout(function() {
          if (e.$destroyed)
            return !0;
          let u = c.apply(h, p);
          return c = h = p = null, u;
        }, f || 1);
      }(l, this, [_], e._event_resolve_delay)), !0;
    });
  });
}, minical: function(e) {
  const o = e._createDomEventScope();
  e.config.minicalendar = { mark_events: !0 }, e._synced_minicalendars = [], e.renderCalendar = function(t, n, d) {
    var a = null, s = t.date || e._currentDate();
    if (typeof s == "string" && (s = this.templates.api_date(s)), n)
      a = this._render_calendar(n.parentNode, s, t, n), e.unmarkCalendar(a);
    else {
      var i = t.container, r = t.position;
      if (typeof i == "string" && (i = document.getElementById(i)), typeof r == "string" && (r = document.getElementById(r)), r && r.left === void 0 && r.right === void 0) {
        var l = e.$domHelpers.getOffset(r);
        r = { top: l.top + r.offsetHeight, left: l.left };
      }
      i || (i = e._get_def_cont(r)), (a = this._render_calendar(i, s, t)).$_eventAttached || (a.$_eventAttached = !0, o.attach(a, "click", (function(x) {
        var w = x.target || x.srcElement, S = e.$domHelpers;
        if (S.closest(w, ".dhx_month_head") && !S.closest(w, ".dhx_after") && !S.closest(w, ".dhx_before")) {
          var N = S.closest(w, "[data-cell-date]").getAttribute("data-cell-date"), E = e.templates.parse_date(N);
          e.unmarkCalendar(this), e.markCalendar(this, E, "dhx_calendar_click"), this._last_date = E, this.conf.events && this.conf.events.onDateClick && this.conf.events.onDateClick.call(this, E, x), this.conf.handler && this.conf.handler.call(e, E, this);
        }
      }).bind(a)), o.attach(a, "mouseover", (function(x) {
        const w = x.target;
        if (w.classList.contains("dhx_cal_month_cell")) {
          var S = w.getAttribute("data-cell-date"), N = e.templates.parse_date(S);
          this.conf.events && this.conf.events.onDateMouseOver && this.conf.events.onDateMouseOver.call(this, N, x);
        }
      }).bind(a)));
    }
    if (e.config.minicalendar.mark_events)
      for (var _ = e.date.month_start(s), c = e.date.add(_, 1, "month"), h = this.getEvents(_, c), p = this["filter_" + this._mode], f = {}, u = 0; u < h.length; u++) {
        var v = h[u];
        if (!p || p(v.id, v)) {
          var m = v.start_date;
          for (m.valueOf() < _.valueOf() && (m = _), m = e.date.date_part(new Date(m.valueOf())); m < v.end_date && (f[+m] || (f[+m] = !0, this.markCalendar(a, m, "dhx_year_event")), !((m = this.date.add(m, 1, "day")).valueOf() >= c.valueOf())); )
            ;
        }
      }
    return this._markCalendarCurrentDate(a), a.conf = t, t.sync && !d && this._synced_minicalendars.push(a), a.conf._on_xle_handler || (a.conf._on_xle_handler = e.attachEvent("onXLE", function() {
      e.updateCalendar(a, a.conf.date);
    })), this.config.wai_aria_attributes && this.config.wai_aria_application_role && a.setAttribute("role", "application"), a;
  }, e._get_def_cont = function(t) {
    return this._def_count || (this._def_count = document.createElement("div"), this._def_count.className = "dhx_minical_popup", e.event(this._def_count, "click", function(n) {
      n.cancelBubble = !0;
    }), document.body.appendChild(this._def_count)), t.left && (this._def_count.style.left = t.left + "px"), t.right && (this._def_count.style.right = t.right + "px"), t.top && (this._def_count.style.top = t.top + "px"), t.bottom && (this._def_count.style.bottom = t.bottom + "px"), this._def_count._created = /* @__PURE__ */ new Date(), this._def_count;
  }, e._locateCalendar = function(t, n) {
    if (typeof n == "string" && (n = e.templates.api_date(n)), +n > +t._max_date || +n < +t._min_date)
      return null;
    for (var d = t.querySelector(".dhx_year_body").childNodes[0], a = 0, s = new Date(t._min_date); +this.date.add(s, 1, "week") <= +n; )
      s = this.date.add(s, 1, "week"), a++;
    var i = e.config.start_on_monday, r = (n.getDay() || (i ? 7 : 0)) - (i ? 1 : 0);
    const l = d.querySelector(`.dhx_cal_month_row:nth-child(${a + 1}) .dhx_cal_month_cell:nth-child(${r + 1})`);
    return l ? l.firstChild : null;
  }, e.markCalendar = function(t, n, d) {
    var a = this._locateCalendar(t, n);
    a && (a.className += " " + d);
  }, e.unmarkCalendar = function(t, n, d) {
    if (d = d || "dhx_calendar_click", n = n || t._last_date) {
      var a = this._locateCalendar(t, n);
      a && (a.className = (a.className || "").replace(RegExp(d, "g")));
    }
  }, e._week_template = function(t) {
    for (var n = t || 250, d = 0, a = document.createElement("div"), s = this.date.week_start(e._currentDate()), i = 0; i < 7; i++)
      this._cols[i] = Math.floor(n / (7 - i)), this._render_x_header(i, d, s, a), s = this.date.add(s, 1, "day"), n -= this._cols[i], d += this._cols[i];
    return a.lastChild.className += " dhx_scale_bar_last", a;
  }, e.updateCalendar = function(t, n) {
    if (t.conf.date && t.conf.events && t.conf.events.onBeforeMonthChange && t.conf.events.onBeforeMonthChange.call(t, t.conf.date, n, t) === !1)
      return;
    const d = t.conf.date;
    t.conf.date = n, this.renderCalendar(t.conf, t, !0), t.conf.events && t.conf.events.onMonthChange && t.conf.events.onMonthChange.call(t, d, n);
  }, e._mini_cal_arrows = ["&nbsp;", "&nbsp;"], e._render_calendar = function(t, n, d, a) {
    var s = e.templates, i = this._cols;
    this._cols = [];
    var r = this._mode;
    this._mode = "calendar";
    var l = this._colsS;
    this._colsS = { height: 0 };
    var _ = new Date(this._min_date), c = new Date(this._max_date), h = new Date(e._date), p = s.month_day, f = this._ignores_detected;
    this._ignores_detected = 0, s.month_day = s.calendar_date, n = this.date.month_start(n);
    var u, v = this._week_template(t.offsetWidth - 1 - this.config.minicalendar.padding);
    a ? u = a : ((u = document.createElement("div")).className = "dhx_cal_container dhx_mini_calendar", this.config.rtl && (u.className += " dhx_cal_container_rtl")), u.setAttribute("date", this._helpers.formatDate(n)), u.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid" + (e.config.rtl ? " dhx_grid_rtl'>" : "'>") + "<div class='dhx_year_week'>" + (v ? v.innerHTML : "") + "</div><div class='dhx_year_body'></div></div>";
    var m = u.querySelector(".dhx_year_month"), x = u.querySelector(".dhx_year_week"), w = u.querySelector(".dhx_year_body");
    if (m.innerHTML = this.templates.calendar_month(n), d.navigation)
      for (var S = function(O, j) {
        var F = e.date.add(O._date, j, "month");
        e.updateCalendar(O, F), e._date.getMonth() == O._date.getMonth() && e._date.getFullYear() == O._date.getFullYear() && e._markCalendarCurrentDate(O);
      }, N = ["dhx_cal_prev_button", "dhx_cal_next_button"], E = ["left:1px;top:4px;position:absolute;", "left:auto; right:1px;top:4px;position:absolute;"], T = [-1, 1], g = function(O) {
        return function() {
          if (d.sync)
            for (var j = e._synced_minicalendars, F = 0; F < j.length; F++)
              S(j[F], O);
          else
            e.config.rtl && (O = -O), S(u, O);
        };
      }, b = [e.locale.labels.prev, e.locale.labels.next], y = 0; y < 2; y++) {
        var k = document.createElement("div");
        k.className = N[y], e._waiAria.headerButtonsAttributes(k, b[y]), k.style.cssText = E[y], k.innerHTML = this._mini_cal_arrows[y], m.appendChild(k), o.attach(k, "click", g(T[y]));
      }
    u._date = new Date(n), u.week_start = (n.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;
    var D = u._min_date = this.date.week_start(n);
    u._max_date = this.date.add(u._min_date, 6, "week"), this._reset_month_scale(w, n, D, 6), a || t.appendChild(u), x.style.height = x.childNodes[0].offsetHeight - 1 + "px";
    var M = e.uid();
    e._waiAria.minicalHeader(m, M), e._waiAria.minicalGrid(u.querySelector(".dhx_year_grid"), M), e._waiAria.minicalRow(x);
    for (var C = x.querySelectorAll(".dhx_scale_bar"), A = 0; A < C.length; A++)
      e._waiAria.minicalHeadCell(C[A]);
    var $ = w.querySelectorAll(".dhx_cal_month_cell"), H = new Date(D);
    for (A = 0; A < $.length; A++)
      e._waiAria.minicalDayCell($[A], new Date(H)), H = e.date.add(H, 1, "day");
    return e._waiAria.minicalHeader(m, M), this._cols = i, this._mode = r, this._colsS = l, this._min_date = _, this._max_date = c, e._date = h, s.month_day = p, this._ignores_detected = f, u;
  }, e.destroyCalendar = function(t, n) {
    !t && this._def_count && this._def_count.firstChild && (n || (/* @__PURE__ */ new Date()).valueOf() - this._def_count._created.valueOf() > 500) && (t = this._def_count.firstChild), t && (o.detachAll(), t.innerHTML = "", t.parentNode && t.parentNode.removeChild(t), this._def_count && (this._def_count.style.top = "-1000px"), t.conf && t.conf._on_xle_handler && e.detachEvent(t.conf._on_xle_handler));
  }, e.isCalendarVisible = function() {
    return !!(this._def_count && parseInt(this._def_count.style.top, 10) > 0) && this._def_count;
  }, e.attachEvent("onTemplatesReady", function() {
    e.event(document.body, "click", function() {
      e.destroyCalendar();
    });
  }, { once: !0 }), e.form_blocks.calendar_time = { render: function(t) {
    var n = "<span class='dhx_minical_input_wrapper'><input class='dhx_readonly dhx_minical_input' type='text' readonly='true'></span>", d = e.config, a = this.date.date_part(e._currentDate()), s = 1440, i = 0;
    d.limit_time_select && (i = 60 * d.first_hour, s = 60 * d.last_hour + 1), a.setHours(i / 60), t._time_values = [], n += " <select class='dhx_lightbox_time_select'>";
    for (var r = i; r < s; r += 1 * this.config.time_step)
      n += "<option value='" + r + "'>" + this.templates.time_picker(a) + "</option>", t._time_values.push(r), a = e._add_wall_clock_minutes(a, this.config.time_step);
    return "<div class='dhx_section_time dhx_lightbox_minical'>" + (n += "</select>") + "<span class='dhx_lightbox_minical_spacer'> &nbsp;&ndash;&nbsp; </span>" + n + "</div>";
  }, set_value: function(t, n, d, a) {
    var s, i, r = t.getElementsByTagName("input"), l = t.getElementsByTagName("select"), _ = function(m, x, w) {
      e.event(m, "click", function() {
        e.destroyCalendar(null, !0), e.renderCalendar({ position: m, date: new Date(this._date), navigation: !0, handler: function(S) {
          m.value = e.templates.calendar_time(S), m._date = new Date(S), e.destroyCalendar(), e.config.event_duration && e.config.auto_end_date && w === 0 && f();
        } });
      });
    };
    if (e.config.full_day) {
      if (!t._full_day) {
        var c = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + e.locale.labels.full_day + "&nbsp;</label></input>";
        e.config.wide_form || (c = t.previousSibling.innerHTML + c), t.previousSibling.innerHTML = c, t._full_day = !0;
      }
      var h = t.previousSibling.getElementsByTagName("input")[0], p = e.date.time_part(d.start_date) === 0 && e.date.time_part(d.end_date) === 0;
      h.checked = p, l[0].disabled = h.checked, l[1].disabled = h.checked, h.$_eventAttached || (h.$_eventAttached = !0, e.event(h, "click", function() {
        if (h.checked === !0) {
          var m = {};
          e.form_blocks.calendar_time.get_value(t, m), s = e.date.date_part(m.start_date), (+(i = e.date.date_part(m.end_date)) == +s || +i >= +s && (d.end_date.getHours() !== 0 || d.end_date.getMinutes() !== 0)) && (i = e.date.add(i, 1, "day"));
        } else
          s = null, i = null;
        var x = s || d.start_date, w = i || d.end_date;
        u(r[0], x), u(r[1], w), l[0].value = 60 * x.getHours() + x.getMinutes(), l[1].value = 60 * w.getHours() + w.getMinutes(), l[0].disabled = h.checked, l[1].disabled = h.checked;
      }));
    }
    if (e.config.event_duration && e.config.auto_end_date) {
      var f = function() {
        e.config.auto_end_date && e.config.event_duration && (s = e._date_at_minutes_of_day(r[0]._date, l[0].value), i = new Date(s.getTime() + 60 * e.config.event_duration * 1e3), r[1].value = e.templates.calendar_time(i), r[1]._date = e.date.date_part(new Date(i)), l[1].value = 60 * i.getHours() + i.getMinutes());
      };
      l[0].$_eventAttached || l[0].addEventListener("change", f);
    }
    function u(m, x, w) {
      _(m, x, w), m.value = e.templates.calendar_time(x), m._date = e.date.date_part(new Date(x));
    }
    function v(m) {
      for (var x = a._time_values, w = 60 * m.getHours() + m.getMinutes(), S = w, N = !1, E = 0; E < x.length; E++) {
        var T = x[E];
        if (T === w) {
          N = !0;
          break;
        }
        T < w && (S = T);
      }
      return N || S ? N ? w : S : -1;
    }
    u(r[0], d.start_date, 0), u(r[1], d.end_date, 1), _ = function() {
    }, l[0].value = v(d.start_date), l[1].value = v(d.end_date);
  }, get_value: function(t, n) {
    var d = t.getElementsByTagName("input"), a = t.getElementsByTagName("select");
    return n.start_date = e._date_at_minutes_of_day(d[0]._date, a[0].value), n.end_date = e._date_at_minutes_of_day(d[1]._date, a[1].value), n.end_date <= n.start_date && (n.end_date = e.date.add(n.start_date, e.config.time_step, "minute")), { start_date: new Date(n.start_date), end_date: new Date(n.end_date) };
  }, focus: function(t) {
  } }, e.linkCalendar = function(t, n) {
    var d = function() {
      var a = e._date, s = new Date(a.valueOf());
      return n && (s = n(s)), s.setDate(1), e.updateCalendar(t, s), !0;
    };
    e.attachEvent("onViewChange", d), e.attachEvent("onXLE", d), e.attachEvent("onEventAdded", d), e.attachEvent("onEventChanged", d), e.attachEvent("onEventDeleted", d), d();
  }, e._markCalendarCurrentDate = function(t) {
    var n = e.getState(), d = n.min_date, a = n.max_date, s = n.mode, i = e.date.month_start(new Date(t._date)), r = e.date.add(i, 1, "month");
    if (!({ month: !0, year: !0, agenda: !0, grid: !0 }[s] || d.valueOf() <= i.valueOf() && a.valueOf() >= r.valueOf()))
      for (var l = d; l.valueOf() < a.valueOf(); )
        i.valueOf() <= l.valueOf() && r > l && e.markCalendar(t, l, "dhx_calendar_click"), l = e.date.add(l, 1, "day");
  }, e.attachEvent("onEventCancel", function() {
    e.destroyCalendar(null, !0);
  }), e.attachEvent("onDestroy", function() {
    e.destroyCalendar();
  });
}, monthheight: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    e.xy.scroll_width = 0;
    var o = e.render_view_data;
    e.render_view_data = function() {
      var n = this._els.dhx_cal_data[0];
      n.firstChild._h_fix = !0, o.apply(e, arguments);
      var d = parseInt(n.style.height);
      n.style.height = "1px", n.style.height = n.scrollHeight + "px", this._obj.style.height = this._obj.clientHeight + n.scrollHeight - d + "px";
    };
    var t = e._reset_month_scale;
    e._reset_month_scale = function(n, d, a, s) {
      var i = { clientHeight: 100 };
      t.apply(e, [i, d, a, s]), n.innerHTML = i.innerHTML;
    };
  });
}, multisection: function(e) {
  ce("Multisection", e.assert);
}, multiselect: function(e) {
  e.form_blocks.multiselect = { render: function(o) {
    var t = "dhx_multi_select_control dhx_multi_select_" + o.name;
    o.vertical && (t += " dhx_multi_select_control_vertical");
    for (var n = "<div class='" + t + "' style='overflow: auto; height: " + o.height + "px; position: relative;' >", d = 0; d < o.options.length; d++)
      n += "<label><input type='checkbox' value='" + o.options[d].key + "'/>" + o.options[d].label + "</label>";
    return n += "</div>";
  }, set_value: function(o, t, n, d) {
    for (var a = o.getElementsByTagName("input"), s = 0; s < a.length; s++)
      a[s].checked = !1;
    function i(h) {
      for (var p = o.getElementsByTagName("input"), f = 0; f < p.length; f++)
        p[f].checked = !!h[p[f].value];
    }
    var r = {};
    if (n[d.map_to]) {
      var l = (n[d.map_to] + "").split(d.delimiter || e.config.section_delimiter || ",");
      for (s = 0; s < l.length; s++)
        r[l[s]] = !0;
      i(r);
    } else {
      if (e._new_event || !d.script_url)
        return;
      var _ = document.createElement("div");
      _.className = "dhx_loading", _.style.cssText = "position: absolute; top: 40%; left: 40%;", o.appendChild(_);
      var c = [d.script_url, d.script_url.indexOf("?") == -1 ? "?" : "&", "dhx_crosslink_" + d.map_to + "=" + n.id + "&uid=" + e.uid()].join("");
      e.ajax.get(c, function(h) {
        var p = function(f) {
          try {
            for (var u = JSON.parse(f.xmlDoc.responseText), v = {}, m = 0; m < u.length; m++) {
              var x = u[m];
              v[x.value || x.key || x.id] = !0;
            }
            return v;
          } catch {
            return null;
          }
        }(h);
        p || (p = function(f, u) {
          for (var v = e.ajax.xpath("//data/item", f.xmlDoc), m = {}, x = 0; x < v.length; x++)
            m[v[x].getAttribute(u.map_to)] = !0;
          return m;
        }(h, d)), i(p), o.removeChild(_);
      });
    }
  }, get_value: function(o, t, n) {
    for (var d = [], a = o.getElementsByTagName("input"), s = 0; s < a.length; s++)
      a[s].checked && d.push(a[s].value);
    return d.join(n.delimiter || e.config.section_delimiter || ",");
  }, focus: function(o) {
  } };
}, multisource: function(e) {
  var o = e._load;
  e._load = function(t, n) {
    if (typeof (t = t || this._load_url) == "object")
      for (var d = function(s) {
        var i = function() {
        };
        return i.prototype = s, i;
      }(this._loaded), a = 0; a < t.length; a++)
        this._loaded = new d(), o.call(this, t[a], n);
    else
      o.apply(this, arguments);
  };
}, mvc: function(e) {
  var o, t = { use_id: !1 };
  function n(s) {
    var i = {};
    for (var r in s)
      r.indexOf("_") !== 0 && (i[r] = s[r]);
    return t.use_id || delete i.id, i;
  }
  function d(s) {
    s._not_render = !1, s._render_wait && s.render_view_data(), s._loading = !1, s.callEvent("onXLE", []);
  }
  function a(s) {
    return t.use_id ? s.id : s.cid;
  }
  e.backbone = function(s, i) {
    i && (t = i), s.bind("change", function(_, c) {
      var h = a(_), p = e._events[h] = _.toJSON();
      p.id = h, e._init_event(p), clearTimeout(o), o = setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.updateView();
      }, 1);
    }), s.bind("remove", function(_, c) {
      var h = a(_);
      e._events[h] && e.deleteEvent(h);
    });
    var r = [];
    function l() {
      if (e.$destroyed)
        return !0;
      r.length && (e.parse(r, "json"), r = []);
    }
    s.bind("add", function(_, c) {
      var h = a(_);
      if (!e._events[h]) {
        var p = _.toJSON();
        p.id = h, e._init_event(p), r.push(p), r.length == 1 && setTimeout(l, 1);
      }
    }), s.bind("request", function(_) {
      var c;
      _ instanceof Backbone.Collection && ((c = e)._loading = !0, c._not_render = !0, c.callEvent("onXLS", []));
    }), s.bind("sync", function(_) {
      _ instanceof Backbone.Collection && d(e);
    }), s.bind("error", function(_) {
      _ instanceof Backbone.Collection && d(e);
    }), e.attachEvent("onEventCreated", function(_) {
      var c = new s.model(e.getEvent(_));
      return e._events[_] = c.toJSON(), e._events[_].id = _, !0;
    }), e.attachEvent("onEventAdded", function(_) {
      if (!s.get(_)) {
        var c = n(e.getEvent(_)), h = new s.model(c), p = a(h);
        p != _ && this.changeEventId(_, p), s.add(h), s.trigger("scheduler:add", h);
      }
      return !0;
    }), e.attachEvent("onEventChanged", function(_) {
      var c = s.get(_), h = n(e.getEvent(_));
      return c.set(h), s.trigger("scheduler:change", c), !0;
    }), e.attachEvent("onEventDeleted", function(_) {
      var c = s.get(_);
      return c && (s.trigger("scheduler:remove", c), s.remove(_)), !0;
    });
  };
}, outerdrag: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    var o, t = new dhtmlDragAndDropObject(), n = t.stopDrag;
    function d(a, s, i, r) {
      if (!e.checkEvent("onBeforeExternalDragIn") || e.callEvent("onBeforeExternalDragIn", [a, s, i, r, o])) {
        var l = e.attachEvent("onEventCreated", function(f) {
          e.callEvent("onExternalDragIn", [f, a, o]) || (this._drag_mode = this._drag_id = null, this.deleteEvent(f));
        }), _ = e.getActionData(o), c = { start_date: new Date(_.date) };
        if (e.matrix && e.matrix[e._mode]) {
          var h = e.matrix[e._mode];
          c[h.y_property] = _.section;
          var p = e._locate_cell_timeline(o);
          c.start_date = h._trace_x[p.x], c.end_date = e.date.add(c.start_date, h.x_step, h.x_unit);
        }
        e._props && e._props[e._mode] && (c[e._props[e._mode].map_to] = _.section), e.addEventNow(c), e.detachEvent(l);
      }
    }
    t.stopDrag = function(a) {
      return o = a, n.apply(this, arguments);
    }, t.addDragLanding(e._els.dhx_cal_data[0], { _drag: function(a, s, i, r) {
      d(a, s, i, r);
    }, _dragIn: function(a, s) {
      return a;
    }, _dragOut: function(a) {
      return this;
    } }), dhtmlx.DragControl && dhtmlx.DragControl.addDrop(e._els.dhx_cal_data[0], { onDrop: function(a, s, i, r) {
      var l = dhtmlx.DragControl.getMaster(a);
      o = r, d(a, l, s, r.target || r.srcElement);
    }, onDragIn: function(a, s, i) {
      return s;
    } }, !0);
  });
}, pdf: function(e) {
  var o, t, n = new RegExp("<[^>]*>", "g"), d = new RegExp("<br[^>]*>", "g");
  function a(E) {
    return E.replace(d, `
`).replace(n, "");
  }
  function s(E, T) {
    E = parseFloat(E), T = parseFloat(T), isNaN(T) || (E -= T);
    var g = r(E);
    return E = E - g.width + g.cols * o, isNaN(E) ? "auto" : 100 * E / o;
  }
  function i(E, T, g) {
    E = parseFloat(E), T = parseFloat(T), !isNaN(T) && g && (E -= T);
    var b = r(E);
    return E = E - b.width + b.cols * o, isNaN(E) ? "auto" : 100 * E / (o - (isNaN(T) ? 0 : T));
  }
  function r(E) {
    for (var T = 0, g = e._els.dhx_cal_header[0].childNodes, b = g[1] ? g[1].childNodes : g[0].childNodes, y = 0; y < b.length; y++) {
      var k = b[y].style ? b[y] : b[y].parentNode, D = parseFloat(k.style.width);
      if (!(E > D))
        break;
      E -= D + 1, T += D + 1;
    }
    return { width: T, cols: y };
  }
  function l(E) {
    return E = parseFloat(E), isNaN(E) ? "auto" : 100 * E / t;
  }
  function _(E, T) {
    return (window.getComputedStyle ? window.getComputedStyle(E, null)[T] : E.currentStyle ? E.currentStyle[T] : null) || "";
  }
  function c(E, T) {
    for (var g = parseInt(E.style.left, 10), b = 0; b < e._cols.length; b++)
      if ((g -= e._cols[b]) < 0)
        return b;
    return T;
  }
  function h(E, T) {
    for (var g = parseInt(E.style.top, 10), b = 0; b < e._colsS.heights.length; b++)
      if (e._colsS.heights[b] > g)
        return b;
    return T;
  }
  function p(E) {
    return E ? "<" + E + ">" : "";
  }
  function f(E) {
    return E ? "</" + E + ">" : "";
  }
  function u(E, T, g, b) {
    var y = "<" + E + " profile='" + T + "'";
    return g && (y += " header='" + g + "'"), b && (y += " footer='" + b + "'"), y += ">";
  }
  function v() {
    var E = "", T = e._mode;
    if (e.matrix && e.matrix[e._mode] && (T = e.matrix[e._mode].render == "cell" ? "matrix" : "timeline"), E += "<scale mode='" + T + "' today='" + e._els.dhx_cal_date[0].innerHTML + "'>", e._mode == "week_agenda")
      for (var g = e._els.dhx_cal_data[0].getElementsByTagName("DIV"), b = 0; b < g.length; b++)
        g[b].className == "dhx_wa_scale_bar" && (E += "<column>" + a(g[b].innerHTML) + "</column>");
    else if (e._mode == "agenda" || e._mode == "map")
      E += "<column>" + a((g = e._els.dhx_cal_header[0].childNodes[0].childNodes)[0].innerHTML) + "</column><column>" + a(g[1].innerHTML) + "</column>";
    else if (e._mode == "year")
      for (g = e._els.dhx_cal_data[0].childNodes, b = 0; b < g.length; b++)
        E += "<month label='" + a(g[b].querySelector(".dhx_year_month").innerHTML) + "'>", E += x(g[b].querySelector(".dhx_year_week").childNodes), E += m(g[b].querySelector(".dhx_year_body")), E += "</month>";
    else {
      E += "<x>", E += x(g = e._els.dhx_cal_header[0].childNodes), E += "</x>";
      var y = e._els.dhx_cal_data[0];
      if (e.matrix && e.matrix[e._mode]) {
        for (E += "<y>", b = 0; b < y.firstChild.rows.length; b++)
          E += "<row><![CDATA[" + a(y.firstChild.rows[b].cells[0].innerHTML) + "]]></row>";
        E += "</y>", t = y.firstChild.rows[0].cells[0].offsetHeight;
      } else if (y.firstChild.tagName == "TABLE")
        E += m(y);
      else {
        for (y = y.childNodes[y.childNodes.length - 1]; y.className.indexOf("dhx_scale_holder") == -1; )
          y = y.previousSibling;
        for (y = y.childNodes, E += "<y>", b = 0; b < y.length; b++)
          E += `
<row><![CDATA[` + a(y[b].innerHTML) + "]]></row>";
        E += "</y>", t = y[0].offsetHeight;
      }
    }
    return E += "</scale>";
  }
  function m(E) {
    for (var T = "", g = E.querySelectorAll("tr"), b = 0; b < g.length; b++) {
      for (var y = [], k = g[b].querySelectorAll("td"), D = 0; D < k.length; D++)
        y.push(k[D].querySelector(".dhx_month_head").innerHTML);
      T += `
<row height='` + k[0].offsetHeight + "'><![CDATA[" + a(y.join("|")) + "]]></row>", t = k[0].offsetHeight;
    }
    return T;
  }
  function x(E) {
    var T, g = "";
    e.matrix && e.matrix[e._mode] && (e.matrix[e._mode].second_scale && (T = E[1].childNodes), E = E[0].childNodes);
    for (var b = 0; b < E.length; b++)
      g += `
<column><![CDATA[` + a(E[b].innerHTML) + "]]></column>";
    if (o = E[0].offsetWidth, T) {
      var y = 0, k = E[0].offsetWidth, D = 1;
      for (b = 0; b < T.length; b++)
        g += `
<column second_scale='` + D + "'><![CDATA[" + a(T[b].innerHTML) + "]]></column>", (y += T[b].offsetWidth) >= k && (k += E[D] ? E[D].offsetWidth : 0, D++), o = T[0].offsetWidth;
    }
    return g;
  }
  function w(E) {
    var T = "", g = e._rendered, b = e.matrix && e.matrix[e._mode];
    if (e._mode == "agenda" || e._mode == "map")
      for (var y = 0; y < g.length; y++)
        T += "<event><head><![CDATA[" + a(g[y].childNodes[0].innerHTML) + "]]></head><body><![CDATA[" + a(g[y].childNodes[2].innerHTML) + "]]></body></event>";
    else if (e._mode == "week_agenda")
      for (y = 0; y < g.length; y++)
        T += "<event day='" + g[y].parentNode.getAttribute("day") + "'><body>" + a(g[y].innerHTML) + "</body></event>";
    else if (e._mode == "year")
      for (g = e.get_visible_events(), y = 0; y < g.length; y++) {
        var k = g[y].start_date;
        for (k.valueOf() < e._min_date.valueOf() && (k = e._min_date); k < g[y].end_date; ) {
          var D = k.getMonth() + 12 * (k.getFullYear() - e._min_date.getFullYear()) - e.week_starts._month, M = e.week_starts[D] + k.getDate() - 1, C = E ? _(e._get_year_cell(k), "color") : "", A = E ? _(e._get_year_cell(k), "backgroundColor") : "";
          if (T += "<event day='" + M % 7 + "' week='" + Math.floor(M / 7) + "' month='" + D + "' backgroundColor='" + A + "' color='" + C + "'></event>", (k = e.date.add(k, 1, "day")).valueOf() >= e._max_date.valueOf())
            break;
        }
      }
    else if (b && b.render == "cell")
      for (g = e._els.dhx_cal_data[0].getElementsByTagName("TD"), y = 0; y < g.length; y++)
        C = E ? _(g[y], "color") : "", T += `
<event><body backgroundColor='` + (A = E ? _(g[y], "backgroundColor") : "") + "' color='" + C + "'><![CDATA[" + a(g[y].innerHTML) + "]]></body></event>";
    else
      for (y = 0; y < g.length; y++) {
        var $, H;
        if (e.matrix && e.matrix[e._mode])
          $ = s(g[y].style.left), H = s(g[y].offsetWidth) - 1;
        else {
          var O = e.config.use_select_menu_space ? 0 : 26;
          $ = i(g[y].style.left, O, !0), H = i(g[y].style.width, O) - 1;
        }
        if (!isNaN(1 * H)) {
          var j = l(g[y].style.top), F = l(g[y].style.height), P = g[y].className.split(" ")[0].replace("dhx_cal_", "");
          if (P !== "dhx_tooltip_line") {
            var I = e.getEvent(g[y].getAttribute(e.config.event_attribute));
            if (I) {
              M = I._sday;
              var Y = I._sweek, B = I._length || 0;
              if (e._mode == "month")
                F = parseInt(g[y].offsetHeight, 10), j = parseInt(g[y].style.top, 10) - e.xy.month_head_height, M = c(g[y], M), Y = h(g[y], Y);
              else if (e.matrix && e.matrix[e._mode]) {
                M = 0, Y = g[y].parentNode.parentNode.parentNode.rowIndex;
                var le = t;
                t = g[y].parentNode.offsetHeight, j = l(g[y].style.top), j -= 0.2 * j, t = le;
              } else {
                if (g[y].parentNode == e._els.dhx_cal_data[0])
                  continue;
                var Je = e._els.dhx_cal_data[0].childNodes[0], Ct = parseFloat(Je.className.indexOf("dhx_scale_holder") != -1 ? Je.style.left : 0);
                $ += s(g[y].parentNode.style.left, Ct);
              }
              T += `
<event week='` + Y + "' day='" + M + "' type='" + P + "' x='" + $ + "' y='" + j + "' width='" + H + "' height='" + F + "' len='" + B + "'>", P == "event" ? (T += "<header><![CDATA[" + a(g[y].childNodes[1].innerHTML) + "]]></header>", C = E ? _(g[y].childNodes[2], "color") : "", T += "<body backgroundColor='" + (A = E ? _(g[y].childNodes[2], "backgroundColor") : "") + "' color='" + C + "'><![CDATA[" + a(g[y].childNodes[2].innerHTML) + "]]></body>") : (C = E ? _(g[y], "color") : "", T += "<body backgroundColor='" + (A = E ? _(g[y], "backgroundColor") : "") + "' color='" + C + "'><![CDATA[" + a(g[y].innerHTML) + "]]></body>"), T += "</event>";
            }
          }
        }
      }
    return T;
  }
  function S(E, T, g, b, y, k) {
    var D = !1;
    b == "fullcolor" && (D = !0, b = "color"), b = b || "color";
    var M = "";
    if (E) {
      var C = e._date, A = e._mode;
      T = e.date[g + "_start"](T), T = e.date["get_" + g + "_end"] ? e.date["get_" + g + "_end"](T) : e.date.add(T, 1, g), M = u("pages", b, y, k);
      for (var $ = new Date(E); +$ < +T; $ = this.date.add($, 1, g))
        this.setCurrentView($, g), M += p("page") + v().replace("–", "-") + w(D) + f("page");
      M += f("pages"), this.setCurrentView(C, A);
    } else
      M = u("data", b, y, k) + v().replace("–", "-") + w(D) + f("data");
    return M;
  }
  function N(E, T, g, b, y, k, D) {
    (function(M, C) {
      var A = e.uid(), $ = document.createElement("div");
      $.style.display = "none", document.body.appendChild($), $.innerHTML = '<form id="' + A + '" method="post" target="_blank" action="' + C + '" accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><input type="hidden" name="mycoolxmlbody"/> </form>', document.getElementById(A).firstChild.value = encodeURIComponent(M), document.getElementById(A).submit(), $.parentNode.removeChild($);
    })(typeof y == "object" ? function(M) {
      for (var C = "<data>", A = 0; A < M.length; A++)
        C += M[A].source.getPDFData(M[A].start, M[A].end, M[A].view, M[A].mode, M[A].header, M[A].footer);
      return C += "</data>", C;
    }(y) : S.apply(this, [E, T, g, y, k, D]), b);
  }
  e.getPDFData = S, e.toPDF = function(E, T, g, b) {
    return N.apply(this, [null, null, null, E, T, g, b]);
  }, e.toPDFRange = function(E, T, g, b, y, k, D) {
    return typeof E == "string" && (E = e.templates.api_date(E), T = e.templates.api_date(T)), N.apply(this, arguments);
  };
}, quick_info: function(e) {
  e.config.icons_select = ["icon_form", "icon_delete"], e.config.details_on_create = !0, e.config.show_quick_info = !0, e.xy.menu_width = 0;
  let o = null;
  function t(d) {
    const a = d.getBoundingClientRect(), s = e.$container.getBoundingClientRect().bottom - a.bottom;
    s < 0 && (d.style.top = `${parseFloat(d.style.top) + s}px`);
  }
  function n(d) {
    let a = 0, s = 0, i = d;
    for (; i && i != e._obj; )
      a += i.offsetLeft, s += i.offsetTop - i.scrollTop, i = i.offsetParent;
    return i ? { left: a, top: s, dx: a + d.offsetWidth / 2 > e._x / 2 ? 1 : 0, dy: s + d.offsetHeight / 2 > e._y / 2 ? 1 : 0, width: d.offsetWidth, height: d.offsetHeight } : 0;
  }
  e.attachEvent("onSchedulerReady", function() {
    const d = e.$container;
    d._$quickInfoHandler || (d._$quickInfoHandler = !0, e.event(d, "mousedown", function(a) {
      const s = a.target.closest(`[${e.config.event_attribute}]`);
      s && (o = { id: s.getAttribute(e.config.event_attribute), position: n(s) });
    }), e.attachEvent("onDestroy", () => {
      delete d._$quickInfoHandler;
    }));
  }), e.attachEvent("onClick", function(d) {
    if (e.config.show_quick_info)
      return e.showQuickInfo(d), !0;
  }), function() {
    for (var d = ["onEmptyClick", "onViewChange", "onLightbox", "onBeforeEventDelete", "onBeforeDrag"], a = function() {
      return e.hideQuickInfo(!0), !0;
    }, s = 0; s < d.length; s++)
      e.attachEvent(d[s], a);
  }(), e.templates.quick_info_title = function(d, a, s) {
    return s.text.substr(0, 50);
  }, e.templates.quick_info_content = function(d, a, s) {
    return s.details || "";
  }, e.templates.quick_info_date = function(d, a, s) {
    return e.isOneDayEvent(s) && e.config.rtl ? e.templates.day_date(d, a, s) + " " + e.templates.event_header(a, d, s) : e.isOneDayEvent(s) ? e.templates.day_date(d, a, s) + " " + e.templates.event_header(d, a, s) : e.config.rtl ? e.templates.week_date(a, d, s) : e.templates.week_date(d, a, s);
  }, e.showQuickInfo = function(d) {
    if (d == this._quick_info_box_id || (this.hideQuickInfo(!0), this.callEvent("onBeforeQuickInfo", [d]) === !1))
      return;
    let a;
    a = o && o.id == d ? o.position : this._get_event_counter_part(d), a && (this._quick_info_box = this._init_quick_info(a), this._fill_quick_data(d), this._show_quick_info(a), this.callEvent("onQuickInfo", [d]));
  }, function() {
    function d(a) {
      a = a || "";
      var s, i = parseFloat(a), r = a.match(/m?s/);
      switch (r && (r = r[0]), r) {
        case "s":
          s = 1e3 * i;
          break;
        case "ms":
          s = i;
          break;
        default:
          s = 0;
      }
      return s;
    }
    e.hideQuickInfo = function(a) {
      var s = this._quick_info_box, i = this._quick_info_box_id;
      if (this._quick_info_box_id = 0, s && s.parentNode) {
        var r = s.offsetWidth;
        if (e.config.quick_info_detached)
          return this.callEvent("onAfterQuickInfo", [i]), s.parentNode.removeChild(s);
        if (s.style.right == "auto" ? s.style.left = -r + "px" : s.style.right = -r + "px", a)
          s.parentNode.removeChild(s);
        else {
          var l;
          window.getComputedStyle ? l = window.getComputedStyle(s, null) : s.currentStyle && (l = s.currentStyle);
          var _ = d(l["transition-delay"]) + d(l["transition-duration"]);
          setTimeout(function() {
            s.parentNode && s.parentNode.removeChild(s);
          }, _);
        }
        this.callEvent("onAfterQuickInfo", [i]);
      }
    };
  }(), e.event(window, "keydown", function(d) {
    d.keyCode == 27 && e.hideQuickInfo();
  }), e._show_quick_info = function(d) {
    var a = e._quick_info_box;
    e._obj.appendChild(a);
    var s = a.offsetWidth, i = a.offsetHeight;
    if (e.config.quick_info_detached) {
      var r = d.left - d.dx * (s - d.width);
      e.getView() && e.getView()._x_scroll && (e.config.rtl ? r += e.getView()._x_scroll : r -= e.getView()._x_scroll), r + s > window.innerWidth && (r = window.innerWidth - s), r = Math.max(0, r), a.style.left = r + "px", a.style.top = d.top - (d.dy ? i : -d.height) + "px";
    } else {
      const l = e.$container.querySelector(".dhx_cal_data").offsetTop;
      a.style.top = l + 20 + "px", d.dx == 1 ? (a.style.right = "auto", a.style.left = -s + "px", setTimeout(function() {
        a.style.left = "-10px";
      }, 1)) : (a.style.left = "auto", a.style.right = -s + "px", setTimeout(function() {
        a.style.right = "-10px";
      }, 1)), a.className = a.className.replace(" dhx_qi_left", "").replace(" dhx_qi_right", "") + " dhx_qi_" + (d.dx == 1 ? "left" : "right");
    }
    a.ontransitionend = () => {
      t(a), a.ontransitionend = null;
    }, setTimeout(() => {
      t(a);
    }, 1);
  }, e.attachEvent("onTemplatesReady", function() {
    if (e.hideQuickInfo(), this._quick_info_box) {
      var d = this._quick_info_box;
      d.parentNode && d.parentNode.removeChild(d), this._quick_info_box = null;
    }
  }), e._quick_info_onscroll_handler = function(d) {
    e.hideQuickInfo();
  }, e._init_quick_info = function() {
    let d = this._quick_info_box = document.createElement("div");
    this._waiAria.quickInfoAttr(d), d.className = "dhx_cal_quick_info", e.$testmode && (d.className += " dhx_no_animate"), e.config.rtl && (d.className += " dhx_quick_info_rtl");
    let a = `
	<div class="dhx_cal_qi_tcontrols">
		<a class="dhx_cal_qi_close_btn scheduler_icon close"></a>
	</div>
	<div class="dhx_cal_qi_title" ${this._waiAria.quickInfoHeaderAttrString()}>
			
			<div class="dhx_cal_qi_tcontent"></div>
			<div class="dhx_cal_qi_tdate"></div>
		</div>
		<div class="dhx_cal_qi_content"></div>`;
    a += '<div class="dhx_cal_qi_controls">';
    let s = e.config.icons_select;
    for (let i = 0; i < s.length; i++)
      a += `<div ${this._waiAria.quickInfoButtonAttrString(this.locale.labels[s[i]])} class="dhx_qi_big_icon ${s[i]}" title="${e.locale.labels[s[i]]}">
			<div class='dhx_menu_icon ${s[i]}'></div><div>${e.locale.labels[s[i]]}</div></div>`;
    return a += "</div>", d.innerHTML = a, e.event(d, "click", function(i) {
      e._qi_button_click(i.target || i.srcElement);
    }), e.config.quick_info_detached && (e._detachDomEvent(e._els.dhx_cal_data[0], "scroll", e._quick_info_onscroll_handler), e.event(e._els.dhx_cal_data[0], "scroll", e._quick_info_onscroll_handler)), this._quick_info_box;
  }, e._qi_button_click = function(d) {
    var a = e._quick_info_box;
    if (d && d != a)
      if (d.closest(".dhx_cal_qi_close_btn"))
        e.hideQuickInfo();
      else {
        var s = e._getClassName(d);
        if (s.indexOf("_icon") != -1) {
          var i = e._quick_info_box_id;
          e._click.buttons[s.split(" ")[1].replace("icon_", "")](i);
        } else
          e._qi_button_click(d.parentNode);
      }
  }, e._get_event_counter_part = function(d) {
    return n(e.getRenderedEvent(d));
  }, e._fill_quick_data = function(d) {
    var a = e.getEvent(d), s = e._quick_info_box;
    e._quick_info_box_id = d;
    var i = { content: e.templates.quick_info_title(a.start_date, a.end_date, a), date: e.templates.quick_info_date(a.start_date, a.end_date, a) };
    s.querySelector(".dhx_cal_qi_tcontent").innerHTML = `<span>${i.content}</span>`, s.querySelector(".dhx_cal_qi_tdate").innerHTML = i.date, e._waiAria.quickInfoHeader(s, [i.content, i.date].join(" "));
    var r = s.querySelector(".dhx_cal_qi_content");
    const l = e.templates.quick_info_content(a.start_date, a.end_date, a);
    l ? (r.classList.remove("dhx_hidden"), r.innerHTML = l) : r.classList.add("dhx_hidden");
  };
}, readonly: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    var o;
    e.form_blocks.recurring && (o = e.form_blocks.recurring.set_value);
    var t = e.config.buttons_left.slice(), n = e.config.buttons_right.slice();
    function d(i, r, l, _) {
      for (var c = r.getElementsByTagName(i), h = l.getElementsByTagName(i), p = h.length - 1; p >= 0; p--)
        if (l = h[p], _) {
          var f = document.createElement("span");
          f.className = "dhx_text_disabled", f.innerHTML = _(c[p]), l.parentNode.insertBefore(f, l), l.parentNode.removeChild(l);
        } else
          l.disabled = !0, r.checked && (l.checked = !0);
    }
    e.attachEvent("onBeforeLightbox", function(i) {
      if (this.config.readonly_form || this.getEvent(i).readonly ? this.config.readonly_active = !0 : (this.config.readonly_active = !1, e.config.buttons_left = t.slice(), e.config.buttons_right = n.slice(), e.form_blocks.recurring && (e.form_blocks.recurring.set_value = o)), this.config.readonly_active)
        for (var r = ["dhx_delete_btn", "dhx_save_btn"], l = [e.config.buttons_left, e.config.buttons_right], _ = 0; _ < r.length; _++)
          for (var c = r[_], h = 0; h < l.length; h++) {
            for (var p = l[h], f = -1, u = 0; u < p.length; u++)
              if (p[u] == c) {
                f = u;
                break;
              }
            f != -1 && p.splice(f, 1);
          }
      return this.resetLightbox(), !0;
    });
    var a = e._fill_lightbox;
    e._fill_lightbox = function() {
      var i = this.getLightbox();
      this.config.readonly_active && (i.style.visibility = "hidden", i.style.display = "block");
      var r = a.apply(this, arguments);
      if (this.config.readonly_active && (i.style.visibility = "", i.style.display = "none"), this.config.readonly_active) {
        var l = this.getLightbox(), _ = this._lightbox_r = l.cloneNode(!0);
        _.id = e.uid(), _.className += " dhx_cal_light_readonly", d("textarea", l, _, function(c) {
          return c.value;
        }), d("input", l, _, !1), d("select", l, _, function(c) {
          return c.options.length ? c.options[Math.max(c.selectedIndex || 0, 0)].text : "";
        }), l.parentNode.insertBefore(_, l), this.showCover(_), e._lightbox && e._lightbox.parentNode.removeChild(e._lightbox), this._lightbox = _, e.config.drag_lightbox && e.event(_.firstChild, "mousedown", e._ready_to_dnd), e._init_lightbox_events(), this.setLightboxSize();
      }
      return r;
    };
    var s = e.hide_lightbox;
    e.hide_lightbox = function() {
      return this._lightbox_r && (this._lightbox_r.parentNode.removeChild(this._lightbox_r), this._lightbox_r = this._lightbox = null), s.apply(this, arguments);
    };
  });
}, recurring: function(e) {
  function o(g, b) {
    return g === "occurrence" ? b.occurrence || e.locale.labels.button_edit_occurrence : g === "following" ? b.following || e.locale.labels.button_edit_occurrence_and_following : g === "series" ? b.series || e.locale.labels.button_edit_series : g;
  }
  function t(g) {
    return new Date(g.valueOf() - g.getMilliseconds());
  }
  function n(g) {
    return !!g.rrule && !g.recurring_event_id;
  }
  function d(g) {
    return new Date(Date.UTC(g.getFullYear(), g.getMonth(), g.getDate(), g.getHours(), g.getMinutes(), g.getSeconds()));
  }
  function a(g) {
    return new Date(g.getUTCFullYear(), g.getUTCMonth(), g.getUTCDate(), g.getUTCHours(), g.getUTCMinutes(), g.getUTCSeconds());
  }
  function s(g) {
    let b;
    g.rrule.includes(";UNTIL=") && (g.rrule = g.rrule.split(";UNTIL=")[0]), g.rrule.includes(";COUNT=") ? (b = pe(`RRULE:${g.rrule};UNTIL=${u(a(g._shorten_end_date))}`, { dtstart: g.start_date }), delete b.origOptions.count) : b = pe(`RRULE:${g.rrule};UNTIL=${u(a(g._end_date || g.end_date))}`, { dtstart: g.start_date }), g.rrule = new z(b.origOptions).toString().replace("RRULE:", "").split(`
`)[1];
  }
  function i(g, b) {
    b || (b = e.getEvent(g));
    let y, k = b.rrule.split(";"), D = [];
    for (let M = 0; M < k.length; M++) {
      let C = k[M].split("="), A = C[0], $ = C[1];
      if (A !== "BYDAY" || b.rrule.includes("WEEKLY") && $.length > 3) {
        if (A === "UNTIL" && pe(b.rrule).options.until.valueOf() < b.start_date.valueOf() && (b._end_date = b.end_date), A === "INTERVAL" && (y = Number($)), A === "COUNT" && b._shorten_end_date) {
          const H = e.date.date_part(new Date(b._start_date)), O = e.date.date_part(new Date(b._shorten_end_date));
          $ -= Math.floor((O - H) / (864e5 * y)) + 1;
        }
        D.push(A), D.push("="), D.push($), D.push(";");
      }
    }
    D.pop(), b.rrule = D.join("");
  }
  function r(g, b) {
    g._end_date = g.end_date, e._isExceptionFirstOccurrence(b) ? (g.start_date = b.start_date, g.end_date = new Date(b.start_date.valueOf() + 1e3 * g.duration), g._start_date = b.original_start, g._modified = !0) : (g.end_date = new Date(b.start_date.valueOf() + 1e3 * g.duration), g.start_date = b.start_date, g._firstOccurrence = !0), g._thisAndFollowing = b.id;
  }
  function l(g, b, y, k) {
    const D = y._modified ? k.id : g;
    e._events[D] = { ...k, ...b, end_date: k._end_date, _start_date: k.start_date, _thisAndFollowing: null, _end_date: null }, y._modified && delete e._events[g], e.callEvent("onEventChanged", [e._events[D].id, e._events[D]]);
  }
  function _(g) {
    for (const b in e._events)
      e._events[b].id == g.id && delete e._events[b];
  }
  function c(g, b) {
    for (let y in e._events) {
      let k = e._events[y];
      (k.recurring_event_id == g || e._is_virtual_event(k.id) && k.id.split("#")[0] == g) && k.start_date.valueOf() >= b.start_date.valueOf() && (k.text = b.text, e.updateEvent(k.id));
    }
  }
  function h(g, b) {
    let y = g, k = new Date(b.original_start).valueOf();
    g = String(y).split("#") || b._pid_time || k;
    let D = e.uid(), M = g[1] ? g[1] : b._pid_time || k, C = e._copy_event(b);
    C.id = D, C.recurring_event_id = b.recurring_event_id || g[0], C.original_start = new Date(Number(M)), C.deleted = !0, e.addEvent(C);
  }
  function p() {
    for (const g in e._events)
      g === "$dnd_recurring_placeholder" && delete e._events[g];
    e.render();
  }
  function f() {
    const g = {};
    for (const b in e._events) {
      const y = e._events[b];
      y.recurring_event_id && y.original_start && (g[y.recurring_event_id] || (g[y.recurring_event_id] = {}), g[y.recurring_event_id][y.original_start.valueOf()] = y);
    }
    return g;
  }
  e.ext.recurring = { confirm: function(g) {
  }, confirmDefault: function(g) {
    const b = g.labels || {}, y = Array.isArray(g.options) ? g.options : [];
    if (y.length === 0)
      return Promise.resolve(null);
    if (y.length === 1)
      return Promise.resolve(y[0]);
    const k = y.map((D, M) => ({ value: D, label: o(D, b), checked: M === 0 }));
    return new Promise((D) => {
      e.modalbox({ text: `<div class="dhx_edit_recurrence_options">
			${k.map((M) => `<label class="dhx_styled_radio">
				<input type="radio" value="${M.value}" name="option" ${M.checked ? "checked" : ""}>
				${M.label}
				</label>`).join("")}
			</div>`, type: "recurring_mode", title: b.title || e.locale.labels.confirm_recurring, width: "auto", position: "middle", buttons: [{ label: b.ok || e.locale.labels.message_ok, value: "ok", css: "rec_ok" }, { label: b.cancel || e.locale.labels.message_cancel, value: "cancel" }], callback: function(M, C) {
        if (M === "cancel")
          return void D(null);
        const A = C.target.closest(".scheduler_modal_box"), $ = A && A.querySelector("input[type='radio']:checked"), H = $ ? $.value : null;
        D(H || null);
      } });
    });
  }, _getDecision: async function(g) {
    const b = e.ext.recurring.confirm;
    let y;
    return y = typeof b == "function" ? await b(g) : void 0, y === void 0 && (y = await e.ext.recurring.confirmDefault(g)), y === null ? null : g.options && g.options.length > 0 && g.options.indexOf(y) === -1 ? (console.warning(`[recurring extension] - the custom confirm handler returned a value ("${y}") which is not in the allowed options list. The allowed options are: [${g.options.join(", ")}]. The operation will be cancelled.`), null) : y;
  } }, e.ext.recurring.confirm = e.ext.recurring.confirmDefault, e._isFollowing = function(g) {
    let b = e.getEvent(g);
    return !(!b || !b._thisAndFollowing);
  }, e._isFirstOccurrence = function(g) {
    if (e._is_virtual_event(g.id)) {
      let b = g.id.split("#")[0];
      return e.getEvent(b).start_date.valueOf() === g.start_date.valueOf();
    }
  }, e._isExceptionFirstOccurrence = function(g) {
    if (e._is_modified_occurrence(g)) {
      let b = g.recurring_event_id, y = e.getEvent(b);
      return !(!g.original_start || !g.original_start.valueOf() || g.original_start.valueOf() !== y.start_date.valueOf());
    }
  }, e._rec_temp = [], e._rec_markers_pull = {}, e._rec_markers = {}, e._add_rec_marker = function(g, b) {
    g._pid_time = b, this._rec_markers[g.id] = g, this._rec_markers_pull[g.event_pid] || (this._rec_markers_pull[g.event_pid] = {}), this._rec_markers_pull[g.event_pid][b] = g;
  }, e._get_rec_marker = function(g, b) {
    let y = this._rec_markers_pull[b];
    return y ? y[g] : null;
  }, e._get_rec_markers = function(g) {
    return this._rec_markers_pull[g] || [];
  }, function() {
    let g = e.addEvent;
    e.addEvent = function(b, y, k, D, M) {
      const C = g.apply(this, arguments);
      if (C && e.getEvent(C)) {
        const A = e.getEvent(C);
        A.start_date && (A.start_date = t(A.start_date)), A.end_date && (A.end_date = t(A.end_date));
      }
      return C;
    };
  }(), e.attachEvent("onEventLoading", function(g) {
    return g.original_start && !g.original_start.getFullYear && (g.original_start = e.templates.parse_date(g.original_start)), !0;
  }), e.attachEvent("onEventIdChange", function(g, b) {
    if (this._ignore_call)
      return;
    this._ignore_call = !0, e._rec_markers[g] && (e._rec_markers[b] = e._rec_markers[g], delete e._rec_markers[g]), e._rec_markers_pull[g] && (e._rec_markers_pull[b] = e._rec_markers_pull[g], delete e._rec_markers_pull[g]);
    for (let k = 0; k < this._rec_temp.length; k++) {
      let D = this._rec_temp[k];
      this._is_virtual_event(D.id) && D.id.split("#")[0] == g && (D.recurring_event_id = b, this.changeEventId(D.id, b + "#" + D.id.split("#")[1]));
    }
    for (let k in this._rec_markers) {
      let D = this._rec_markers[k];
      D.recurring_event_id == g && (D.recurring_event_id = b, D._pid_changed = !0);
    }
    let y = e._rec_markers[b];
    y && y._pid_changed && (delete y._pid_changed, setTimeout(function() {
      if (e.$destroyed)
        return !0;
      e.callEvent("onEventChanged", [b, e.getEvent(b)]);
    }, 1)), delete this._ignore_call;
  }), e.attachEvent("onConfirmedBeforeEventDelete", function(g) {
    const b = this.getEvent(g);
    if (this._is_virtual_event(g) || this._is_modified_occurrence(b) && !function(y) {
      return !!y.deleted;
    }(b))
      h(g, b);
    else {
      n(b) && this._lightbox_id && this._roll_back_dates(b);
      const y = this._get_rec_markers(g);
      for (let k in y)
        y.hasOwnProperty(k) && (g = y[k].id, this.getEvent(g) && this.deleteEvent(g, !0));
    }
    return !0;
  }), e.attachEvent("onEventDeleted", function(g, b) {
    !this._is_virtual_event(g) && this._is_modified_occurrence(b) && (e._events[g] || (b.deleted = !0, this.setEvent(g, b), e.render()));
  }), e.attachEvent("onBeforeEventChanged", function(g, b, y, k) {
    return !(!y && g && (e._is_virtual_event(g.id) || e._is_modified_occurrence(g)) && (k.start_date.getDate() !== g.start_date.getDate() ? g._beforeEventChangedFlag = "edit" : g._beforeEventChangedFlag = "ask", !e.config.collision_limit || e.checkCollision(g))) || (e._events.$dnd_recurring_placeholder = e._lame_clone(g), e._showRequiredModalBox(g.id, g._beforeEventChangedFlag), !1);
  }), e.attachEvent("onEventChanged", function(g, b) {
    if (this._loading)
      return !0;
    let y = this.getEvent(g);
    if (this._is_virtual_event(g))
      (function(k) {
        let D = k.id.split("#"), M = e.uid();
        e._not_render = !0;
        let C = e._copy_event(k);
        C.id = M, C.recurring_event_id = D[0];
        let A = D[1];
        C.original_start = new Date(Number(A)), e._add_rec_marker(C, A), e.addEvent(C), e._not_render = !1;
      })(y);
    else {
      y.start_date && (y.start_date = t(y.start_date)), y.end_date && (y.end_date = t(y.end_date)), n(y) && this._lightbox_id && (y._removeFollowing || this._isFollowing(g) ? y._removeFollowing = null : this._roll_back_dates(y));
      const k = this._get_rec_markers(g);
      for (let M in k)
        k.hasOwnProperty(M) && (delete this._rec_markers[k[M].id], this.deleteEvent(k[M].id, !0));
      delete this._rec_markers_pull[g];
      let D = !1;
      for (let M = 0; M < this._rendered.length; M++)
        this._rendered[M].getAttribute(this.config.event_attribute) == g && (D = !0);
      D || (this._select_id = null);
    }
    return p(), !0;
  }), e.attachEvent("onEventAdded", function(g) {
    if (!this._loading) {
      const b = this.getEvent(g);
      n(b) && this._roll_back_dates(b);
    }
    return !0;
  }), e.attachEvent("onRecurringEventSave", function(g, b, y) {
    let k = this.getEvent(g), D = e._lame_clone(k), M = e._lame_clone(b);
    if (k && n(k) && n(M)) {
      if (!y && this._isFollowing(g)) {
        if (k._removeFollowing) {
          if (e.getEvent(k._thisAndFollowing) && (k._firstOccurrence || k._modified))
            return e.hideLightbox(), e.deleteEvent(k.id), !1;
          if (k.end_date = new Date(k.start_date.valueOf() - 1e3), k._end_date = k._shorten_end_date, k.start_date = k._start_date, k._shorten = !0, s(k), e.callEvent("onEventChanged", [k.id, k]), e.getEvent(k._thisAndFollowing))
            for (const C in e._events) {
              let A = e._events[C];
              A.recurring_event_id === g && A.start_date.valueOf() > D.start_date.valueOf() && h(A.id, A);
            }
          return e.hideLightbox(), !1;
        }
        {
          let C = e.getEvent(k._thisAndFollowing);
          if (C && k._firstOccurrence)
            for (const A in e._events)
              e._events[A].id == k.id && l(A, b, k, D);
          else if (C && k._modified)
            for (const A in e._events) {
              let $ = e._events[A];
              $.recurring_event_id == g && $.id == D._thisAndFollowing && l(A, b, k, D);
            }
          else {
            e._is_modified_occurrence(C) && _(C), k.end_date = k._shorten_end_date, k._end_date = k._shorten_end_date, k.start_date = k._start_date, k._shorten = !0, s(k), e.callEvent("onEventChanged", [k.id, k]);
            let A = { ...M };
            A._end_date = D._end_date, A._start_date = null, A.id = e.uid(), e.addEvent(A.start_date, A.end_date, A.text, A.id, A);
          }
          return y || c(g, b), e.hideLightbox(), !1;
        }
      }
    } else
      e._roll_back_dates(k);
    return y || c(g, b), D._ocr && D._beforeEventChangedFlag ? (k.start_date = D.start_date, k.end_date = D.end_date, k._start_date = D._start_date, k._end_date = D._end_date, e.updateEvent(k.id), !0) : (this._select_id = null, p(), !0);
  }), e.attachEvent("onEventCreated", function(g) {
    const b = this.getEvent(g);
    return n(b) || function(y) {
      y.rrule = "", y.original_start = null, y.recurring_event_id = null, y.duration = null, y.deleted = null;
    }(b), !0;
  }), e.attachEvent("onEventCancel", function(g) {
    const b = this.getEvent(g);
    n(b) && (this._roll_back_dates(b), this.render_view_data()), p();
  }), e.attachEvent("onLightbox", function(g) {
    const b = e.getEvent(g);
    if (e._is_virtual_event(b.id)) {
      const y = e.formSection("recurring");
      if (y && y.node) {
        const k = y.node.querySelector("select");
        k && (k.disabled = !0);
      }
    }
  }), e._roll_back_dates = function(g) {
    if (g.start_date && (g.start_date = t(g.start_date)), g.end_date && (g.end_date = t(g.end_date)), g._end_date) {
      if (!g._shorten) {
        const b = e._get_whole_days_length(g.start_date, g.end_date);
        g.duration = b !== null ? b : Math.round((g.end_date.valueOf() - g.start_date.valueOf()) / 1e3);
      }
      g.end_date = g._end_date;
    }
    g._start_date && (g.start_date.setMonth(0), g.start_date.setDate(g._start_date.getDate()), g.start_date.setMonth(g._start_date.getMonth()), g.start_date.setFullYear(g._start_date.getFullYear()), this._isFollowing(g.id) && (g.start_date.setHours(g._start_date.getHours()), g.start_date.setMinutes(g._start_date.getMinutes()), g.start_date.setSeconds(g._start_date.getSeconds()))), g._thisAndFollowing = null, g._shorten_end_date && (g._shorten_end_date = null), g._removeFollowing && (g._removeFollowing = null), g._firstOccurrence && (g._firstOccurrence = null), g._modified && (g._modified = null);
  }, e._is_virtual_event = function(g) {
    return g.toString().indexOf("#") != -1;
  }, e._is_modified_occurrence = function(g) {
    return g.recurring_event_id && g.recurring_event_id != "0";
  }, e.showLightbox_rec = e.showLightbox, e.showLightbox = function(g) {
    const b = this.locale;
    let y = e.config.lightbox_recurring, k = this.getEvent(g), D = k.recurring_event_id, M = this._is_virtual_event(g);
    M && (D = g.split("#")[0]);
    const C = function(A, $) {
      const H = e.getEvent(A), O = e.getEvent(D), j = e.getView();
      if (j && H[j.y_property] && (O[j.y_property] = H[j.y_property]), j && H[j.property] && (O[j.property] = H[j.property]), $ === "Occurrence")
        return e.showLightbox_rec(A);
      if ($ === "Following") {
        if (e._isExceptionFirstOccurrence(H) || e._isFirstOccurrence(H))
          return r(O, H), e.showLightbox_rec(D);
        {
          O._end_date = O.end_date;
          const F = H.original_start || H.start_date;
          return O._shorten_end_date = new Date(F.valueOf() - 1e3), O.end_date = new Date(H.start_date.valueOf() + 1e3 * O.duration), O._start_date = O.start_date, O.start_date = H.start_date, O._thisAndFollowing = H.id, k._beforeEventChangedFlag && (O._beforeEventChangedFlag = k._beforeEventChangedFlag, O._shorten_end_date = new Date(F.valueOf() - 1e3)), e.showLightbox_rec(D);
        }
      }
      if ($ === "AllEvents") {
        if (e._isExceptionFirstOccurrence(H) || e._isFirstOccurrence(H))
          return r(O, H), e.showLightbox_rec(D);
        const F = new Date(O.start_date);
        return O._end_date = O.end_date, O._start_date = F, O.start_date.setHours(H.start_date.getHours()), O.start_date.setMinutes(H.start_date.getMinutes()), O.start_date.setSeconds(H.start_date.getSeconds()), O.end_date = new Date(O.start_date.valueOf() + 1e3 * O.duration), O._thisAndFollowing = null, e.showLightbox_rec(D);
      }
    };
    if ((D || 1 * D == 0) && n(k))
      return C(g, "AllEvents");
    if (!D || D === "0" || !b.labels.confirm_recurring || y == "instance" || y == "series" && !M)
      return this.showLightbox_rec(g);
    y === "ask" && async function(A, $) {
      const H = e.locale, O = e.getEvent(A), j = e.getEvent($), F = { origin: "lightbox", occurrence: O, series: j, labels: { title: H.labels.confirm_recurring, ok: H.labels.message_ok, cancel: H.labels.message_cancel, occurrence: H.labels.button_edit_occurrence, following: H.labels.button_edit_occurrence_and_following, series: H.labels.button_edit_series }, options: ["occurrence", "following", "series"] }, P = await e.ext.recurring._getDecision(F);
      if (P !== null) {
        if (P === "occurrence")
          return C(A, "Occurrence");
        if (P === "following")
          return C(A, "Following");
        P === "series" && C(A, "AllEvents");
      }
    }(g, D);
  }, e._showRequiredModalBox = function(g, b) {
    let y;
    const k = e.locale;
    let D = e.getEvent(g), M = D.recurring_event_id;
    e._is_virtual_event(D.id) && (M = D.id.split("#")[0]);
    let C = e.getEvent(M);
    const A = e.getView();
    let $, H, O = e._lame_clone(C);
    A && D[A.y_property] && (O[A.y_property] = D[A.y_property]), A && D[A.property] && (O[A.property] = D[A.property]), D && D._beforeEventChangedFlag && ($ = D.start_date, H = D.end_date), y = b === "ask" ? ["occurrence", "following", "series"] : ["occurrence", "following"];
    const j = { origin: "dnd", occurrence: D, series: C, labels: { title: k.labels.confirm_recurring, ok: k.labels.message_ok, cancel: k.labels.message_cancel, occurrence: k.labels.button_edit_occurrence, following: k.labels.button_edit_occurrence_and_following, series: k.labels.button_edit_series }, options: y };
    Promise.resolve(e.ext.recurring._getDecision(j)).then((F) => {
      if (F)
        switch (F) {
          case "occurrence":
            (function(P) {
              let I = { ...C, ...e.getEvent("$dnd_recurring_placeholder") };
              if (H && $ && (I.start_date = $, I.end_date = H, I._beforeEventChangedFlag = P._beforeEventChangedFlag, I._ocr = !0), !e.config.collision_limit || e.checkCollision(I))
                for (const Y in e._events) {
                  let B = e._events[Y];
                  Y !== "$dnd_recurring_placeholder" && B.id == I.id && (e._events[Y] = { ...I }, e.callEvent("onEventChanged", [e._events[Y].id, e._events[Y]]));
                }
            })(D);
            break;
          case "following":
            (function(P) {
              let I = e._lame_clone(P);
              if (H && $ && (P._start_date = P.start_date, P.start_date = $, P.end_date = H), e._isFirstOccurrence(I) || e._isExceptionFirstOccurrence(I)) {
                if (e._isExceptionFirstOccurrence(I) && _(I), O._start_date = C.start_date, O.start_date = P.start_date, O.duration = (+P.end_date - +P.start_date) / 1e3, O._beforeEventChangedFlag = P._beforeEventChangedFlag, O.rrule && i(O.id, O), !e.config.collision_limit || e.checkCollision(O))
                  for (const Y in e._events)
                    e._events[Y].id == O.id && (e._events[Y] = { ...O }, e.callEvent("onEventChanged", [e._events[Y].id, e._events[Y]]));
              } else {
                O._end_date = C.end_date;
                const Y = P.original_start || e.date.date_part(new Date(P._start_date));
                O._shorten_end_date = new Date(Y.valueOf() - 1e3), O.end_date = P.end_date, O._start_date = C.start_date, O.start_date = P.start_date, O._thisAndFollowing = P.id, O.rrule && i(O.id, O);
                let B = O.end_date;
                if (O.end_date = O._end_date, !e.config.collision_limit || e.checkCollision(O)) {
                  O.end_date = B;
                  for (const le in e._events)
                    e._events[le].id == O.id && (e._events[le] = { ...O }, e.callEvent("onRecurringEventSave", [e._events[le].id, e._events[le], e._new_event]), e.callEvent("onEventChanged", [e._events[le].id, e._events[le]]));
                }
              }
            })(D);
            break;
          case "series":
            (function(P) {
              let I = e._lame_clone(P);
              if (e._isExceptionFirstOccurrence(I) && _(I), H && $ && (O.start_date.setHours($.getHours()), O.start_date.setMinutes($.getMinutes()), O.start_date.setSeconds($.getSeconds()), O.duration = (+H - +$) / 1e3), O._beforeEventChangedFlag = P._beforeEventChangedFlag, O._thisAndFollowing = null, !e.config.collision_limit || e.checkCollision(O))
                for (const Y in e._events)
                  e._events[Y].id == O.id && (e._events[Y] = { ...O }, e.callEvent("onEventChanged", [e._events[Y].id, e._events[Y]]));
            })(D);
            break;
          default:
            return void p();
        }
      else
        p();
    });
  }, e.get_visible_events_rec = e.get_visible_events, e.get_visible_events = function(g) {
    for (let D = 0; D < this._rec_temp.length; D++)
      delete this._events[this._rec_temp[D].id];
    this._rec_temp = [];
    const b = f();
    let y = this.get_visible_events_rec(g), k = [];
    for (let D = 0; D < y.length; D++)
      y[D].deleted || y[D].recurring_event_id || (n(y[D]) ? this.repeat_date(y[D], k, void 0, void 0, void 0, void 0, b) : k.push(y[D]));
    return function(D) {
      const M = {};
      return D.forEach((C) => {
        const A = M[C.id];
        (!A || A._beforeEventChangedFlag || C._beforeEventChangedFlag) && (M[C.id] = C);
      }), Object.values(M);
    }(k);
  }, function() {
    let g = e.isOneDayEvent;
    e.isOneDayEvent = function(y) {
      return !!n(y) || g.call(this, y);
    };
    const b = e.updateEvent;
    e.updateEvent = function(y) {
      const k = e.getEvent(y);
      k && n(k) && !this._is_virtual_event(y) ? e.update_view() : b.call(this, y);
    };
  }();
  const u = e.date.date_to_str("%Y%m%dT%H%i%s");
  function v(g) {
    const b = g.getDay(), y = g.getDate();
    return { dayOfWeek: b, dayNumber: Math.ceil(y / 7) };
  }
  e.repeat_date = function(g, b, y, k, D, M, C) {
    if (!g.rrule)
      return;
    let A = C ? C[g.id] : f()[g.id];
    A || (A = {}), k = d(k || new Date(e._min_date.valueOf() - 6048e5)), D = d(D || new Date(e._max_date.valueOf() - 1e3));
    const $ = d(g.start_date);
    let H;
    H = pe(M ? `RRULE:${g.rrule};UNTIL=${u(g.end_date)};COUNT=${M}` : `RRULE:${g.rrule};UNTIL=${u(g.end_date)}`, { dtstart: $ });
    const O = H.between(k, D, !0).map((P) => {
      const I = a(P);
      return I.setHours(g.start_date.getHours()), I.setMinutes(g.start_date.getMinutes()), I.setSeconds(g.start_date.getSeconds()), I;
    });
    let j = 0;
    const F = g.duration;
    for (let P = 0; P < O.length && !(M && j >= M); P++) {
      const I = O[P];
      let Y = A[I.valueOf()];
      if (Y) {
        if (Y.deleted || Y.end_date.valueOf() < e._min_date.valueOf() || !e.filter_event(Y.id, Y))
          continue;
        j++, b.push(Y);
      } else {
        const B = e._copy_event(g);
        if (B.text = g.text, B.start_date = I, B.id = g.id + "#" + Math.ceil(I.valueOf()), B.end_date = new Date(I.valueOf() + 1e3 * F), B.end_date.valueOf() <= e._min_date.valueOf() || (B.end_date = e._fix_daylight_saving_date(B.start_date, B.end_date, g, I, B.end_date), B._timed = e.isOneDayEvent(B), !B._timed && !e._table_view && !e.config.multi_day))
          continue;
        b.push(B), y || (e._events[B.id] = B, e._rec_temp.push(B)), j++;
      }
    }
    if (A && O.length == 0)
      for (let P in A) {
        let I = A[P];
        if (I) {
          if (I.deleted || I.end_date.valueOf() < e._min_date.valueOf() || !e.filter_event(I.id, I))
            continue;
          k && D && I.start_date < D && I.end_date > k && b.push(I);
        }
      }
  }, e._fix_daylight_saving_date = function(g, b, y, k, D) {
    let M = y.duration / 86400;
    if (M > 0 && M === Math.floor(M) && e._is_start_of_day(g))
      return new Date(g.getFullYear(), g.getMonth(), g.getDate() + M);
    let C = g.getTimezoneOffset() - b.getTimezoneOffset();
    if (C && e._is_start_of_day(g)) {
      let A;
      if (A = C > 0 ? new Date(k.valueOf() + 1e3 * y.duration - 60 * C * 1e3) : new Date(b.valueOf() - 60 * C * 1e3), e._is_start_of_day(A))
        return A;
    }
    return new Date(D.valueOf());
  }, e.getRecDates = function(g, b) {
    let y = typeof g == "object" ? g : e.getEvent(g), k = [];
    if (b = b || 100, !n(y))
      return [{ start_date: y.start_date, end_date: y.end_date }];
    if (y.deleted)
      return [];
    e.repeat_date(y, k, !0, y.start_date, y.end_date, b);
    let D = [];
    for (let M = 0; M < k.length; M++)
      k[M].deleted || D.push({ start_date: k[M].start_date, end_date: k[M].end_date });
    return D;
  }, e.getEvents = function(g, b) {
    let y = [];
    const k = f();
    for (let D in this._events) {
      let M = this._events[D];
      if (!M.recurring_event_id)
        if (g && b && M.start_date < b && M.end_date > g)
          if (n(M)) {
            let C = [];
            this.repeat_date(M, C, !0, g, b, void 0, k), C.forEach(function(A) {
              A.start_date < b && A.end_date > g && y.push(A);
            });
          } else
            this._is_virtual_event(M.id) || y.push(M);
        else
          g || b || this._is_virtual_event(M.id) || y.push(M);
    }
    return y;
  }, e._copy_dummy = function(g) {
    const b = new Date(this.start_date), y = new Date(this.end_date);
    this.start_date = b, this.end_date = y, this.duration = this.rrule = null;
  }, e.config.include_end_by = !1, e.config.lightbox_recurring = "ask", e.config.recurring_workdays = [z.MO.weekday, z.TU.weekday, z.WE.weekday, z.TH.weekday, z.FR.weekday], e.config.repeat_date = "%m.%d.%Y", e.config.lightbox.sections = [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "recurring", type: "recurring", map_to: "rrule" }, { name: "time", height: 72, type: "time", map_to: "auto" }], e.attachEvent("onClearAll", function() {
    e._rec_markers = {}, e._rec_markers_pull = {}, e._rec_temp = [];
  });
  const m = { 0: "SU", 1: "MO", 2: "TU", 3: "WE", 4: "TH", 5: "FR", 6: "SA" }, x = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 0 };
  function w(g, b) {
    const y = g.querySelector("[name='repeat_interval_value']");
    y && (y.value = (b ? b.interval : 1) || 1);
  }
  function S(g) {
    switch (g) {
      case 1:
      case 31:
        return `${g}st`;
      case 2:
        return `${g}nd`;
      case 3:
        return `${g}rd`;
      default:
        return `${g}th`;
    }
  }
  e.templates.repeat_monthly_date = function(g, b) {
    return `Every ${S(g.getDate())}`;
  }, e.templates.repeat_monthly_weekday = function(g, b) {
    const y = v(g);
    return `Every ${S(y.dayNumber)} ${e.locale.date.day_full[y.dayOfWeek]}`;
  }, e.templates.repeat_yearly_month_date = function(g, b) {
    const y = g.getDate(), k = e.locale.date.month_full[g.getMonth()];
    return `Every ${S(y)} day of ${k}`;
  }, e.templates.repeat_yearly_month_weekday = function(g, b) {
    const y = v(g), k = e.locale.date.month_full[g.getMonth()];
    return `Every ${S(y.dayNumber)} ${e.locale.date.day_full[y.dayOfWeek]} of ${k}`;
  };
  const N = { MONTHLY: function(g) {
    return { rrule: { freq: z.MONTHLY, interval: 1, bymonthday: g.start.getDate() }, until: new Date(9999, 1, 1) };
  }, WEEKLY: function(g) {
    let b = g.start.getDay() - 1;
    return b == -1 && (b = 6), { rrule: { freq: z.WEEKLY, interval: 1, byweekday: [b] }, until: new Date(9999, 1, 1) };
  }, DAILY: function(g) {
    return { rrule: { freq: z.DAILY, interval: 1 }, until: new Date(9999, 1, 1) };
  }, YEARLY: function(g) {
    return { rrule: { freq: z.YEARLY, bymonth: g.start.getMonth() + 1, interval: 1, bymonthday: g.start.getDate() }, until: new Date(9999, 1, 1) };
  }, WORKDAYS: function(g) {
    return { rrule: { freq: z.WEEKLY, interval: 1, byweekday: e.config.recurring_workdays }, until: new Date(9999, 1, 1) };
  }, CUSTOM: function(g, b) {
    const y = {}, k = b.querySelector('[name="repeat_interval_unit"]').value, D = Math.max(1, b.querySelector('[name="repeat_interval_value"]').value), M = b.querySelector('[name="dhx_custom_month_option"]') ? b.querySelector('[name="dhx_custom_month_option"]').value : null, C = b.querySelector('[name="dhx_custom_year_option"]') ? b.querySelector('[name="dhx_custom_year_option"]').value : null;
    let A, $;
    switch (y.interval = D, k) {
      case "DAILY":
        y.freq = z.DAILY;
        break;
      case "WEEKLY":
        y.freq = z.WEEKLY, A = [], b.querySelectorAll('.dhx_form_repeat_custom_week [name="week_day"]').forEach((F) => {
          F.checked && A.push(F.value);
        }), y.byweekday = A.map((F) => {
          switch (F) {
            case "MO":
              return z.MO.weekday;
            case "TU":
              return z.TU.weekday;
            case "WE":
              return z.WE.weekday;
            case "TH":
              return z.TH.weekday;
            case "FR":
              return z.FR.weekday;
            case "SA":
              return z.SA.weekday;
            case "SU":
              return z.SU.weekday;
          }
        });
        break;
      case "MONTHLY":
        y.freq = z.MONTHLY, M === "month_date" ? y.bymonthday = g.start.getDate() : ($ = g.start.getDay() - 1, $ == -1 && ($ = 6), y.byweekday = [$], y.bysetpos = v(g.start).dayNumber);
        break;
      case "YEARLY":
        y.freq = z.YEARLY, y.bymonth = g.start.getMonth() + 1, C == "month_date" ? y.bymonthday = g.start.getDate() : ($ = g.start.getDay() - 1, $ == -1 && ($ = 6), y.byweekday = [$], y.bysetpos = v(g.start).dayNumber);
    }
    const H = e.date.str_to_date("%Y-%m-%d");
    let O = new Date(9999, 1, 1);
    const j = b.querySelector('[name="dhx_custom_repeat_ends"]');
    return j && j.value === "ON" ? (O = H(b.querySelector('[name="dhx_form_repeat_ends_ondate"]').value), y.until = new Date(O)) : j && j.value === "AFTER" && (y.count = Math.max(1, b.querySelector('[name="dhx_form_repeat_ends_after"]').value)), { rrule: y, until: O };
  }, NEVER: function() {
  } };
  function E(g, b, y) {
    (function(k, D) {
      w(k, D);
    })(g, b), function(k, D, M) {
      if (w(k, D), k.querySelectorAll(".dhx_form_repeat_custom_week input").forEach((C) => C.checked = !1), D && D.byweekday)
        D.byweekday.forEach((C) => {
          const A = x[C.weekday], $ = m[A], H = k.querySelector(`.dhx_form_repeat_custom_week input[value="${$}"]`);
          H && (H.checked = !0);
        });
      else {
        const C = m[M.start_date.getDay()], A = k.querySelector(`.dhx_form_repeat_custom_week input[value="${C}"]`);
        A && (A.checked = !0);
      }
    }(g, b, y), function(k, D, M) {
      w(k, D);
      const C = k.querySelector('.dhx_form_repeat_custom_month [value="month_date"]'), A = k.querySelector('.dhx_form_repeat_custom_month [value="month_nth_weekday"]');
      if (C && A) {
        C.innerText = e.templates.repeat_monthly_date(M.start_date, M), A.innerText = e.templates.repeat_monthly_weekday(M.start_date, M);
        const $ = k.querySelector('[name="dhx_custom_month_option"]');
        $ && ($.value = !D || !D.bysetpos || D.byweekday && D.byweekday.length ? "month_nth_weekday" : "month_date");
      }
    }(g, b, y), function(k, D, M) {
      const C = k.querySelector('.dhx_form_repeat_custom_year [value="month_date"]'), A = k.querySelector('.dhx_form_repeat_custom_year [value="month_nth_weekday"]');
      C && A && (C.innerText = e.templates.repeat_yearly_month_date(M.start_date, M), A.innerText = e.templates.repeat_yearly_month_weekday(M.start_date, M), D && (!D.bysetpos || D.byweekday && D.byweekday.length) ? k.querySelector('[name="dhx_custom_year_option"]').value = "month_nth_weekday" : k.querySelector('[name="dhx_custom_year_option"]').value = "month_date");
    }(g, b, y), function(k, D, M) {
      const C = k.querySelector('.dhx_form_repeat_ends_extra [name="dhx_form_repeat_ends_after"]'), A = k.querySelector('.dhx_form_repeat_ends_extra [name="dhx_form_repeat_ends_ondate"]'), $ = k.querySelector("[name='dhx_custom_repeat_ends']");
      if (C && A && $) {
        C.value = 1;
        let H = e.date.date_to_str("%Y-%m-%d");
        e.config.repeat_date_of_end || (e.config.repeat_date_of_end = H(e.date.add(e._currentDate(), 30, "day"))), A.value = e.config.repeat_date_of_end, D && D.count ? ($.value = "AFTER", C.value = D.count) : M._end_date && M._end_date.getFullYear() !== 9999 ? ($.value = "ON", A.value = H(M._end_date)) : $.value = "NEVER", $.dispatchEvent(new Event("change"));
      }
    }(g, b, y);
  }
  function T(g) {
    for (let b = 0; b < e.config.lightbox.sections.length; b++) {
      let y = e.config.lightbox.sections[b];
      if (y.type === g)
        return e.formSection(y.name);
    }
    return null;
  }
  e.form_blocks.recurring = { _get_node: function(g) {
    if (typeof g == "string") {
      let b = e._lightbox.querySelector(`#${g}`);
      b || (b = document.getElementById(g)), g = b;
    }
    return g.style.display == "none" && (g.style.display = ""), g;
  }, _outer_html: function(g) {
    return g.outerHTML || function(b) {
      let y, k = document.createElement("div");
      return k.appendChild(b.cloneNode(!0)), y = k.innerHTML, k = null, y;
    }(g);
  }, render: function(g) {
    if (g.form) {
      let y = e.form_blocks.recurring, k = y._get_node(g.form), D = y._outer_html(k);
      return k.style.display = "none", D;
    }
    let b = e.locale.labels;
    return `<div class="dhx_form_rrule">
		<div class="dhx_form_repeat_pattern">
			<select>
				<option value="NEVER">${b.repeat_never}</option>
				<option value="DAILY">${b.repeat_daily}</option>
				<option value="WEEKLY">${b.repeat_weekly}</option>
				<option value="MONTHLY">${b.repeat_monthly}</option>
				<option value="YEARLY">${b.repeat_yearly}</option>
				<option value="WORKDAYS">${b.repeat_workdays}</option>
				<option value="CUSTOM">${b.repeat_custom}</option>
			</select>
		</div>
		<div class="dhx_form_repeat_custom dhx_hidden">
			<div class="dhx_form_repeat_custom_interval">
				<input name="repeat_interval_value" type="number" min="1">
				<select name="repeat_interval_unit">
					<option value="DAILY">${b.repeat_freq_day}</option>
					<option value="WEEKLY">${b.repeat_freq_week}</option>
					<option value="MONTHLY">${b.repeat_freq_month}</option>
					<option value="YEARLY">${b.repeat_freq_year}</option>
				</select>
			</div>

			<div class="dhx_form_repeat_custom_additional">
				<div class="dhx_form_repeat_custom_week dhx_hidden">
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="MO" />${b.day_for_recurring[1]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="TU" />${b.day_for_recurring[2]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="WE" />${b.day_for_recurring[3]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="TH" />${b.day_for_recurring[4]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="FR" />${b.day_for_recurring[5]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="SA" />${b.day_for_recurring[6]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="SU" />${b.day_for_recurring[0]}</label>
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
				<div>${b.repeat_ends}</div>
				<div class="dhx_form_repeat_ends_options">
					<select name="dhx_custom_repeat_ends">
						<option value="NEVER">${b.repeat_never}</option>
						<option value="AFTER">${b.repeat_radio_end2}</option>
						<option value="ON">${b.repeat_on_date}</option>
					</select>
					<div class="dhx_form_repeat_ends_extra">
						<div class="dhx_form_repeat_ends_after dhx_hidden">
							<label><input type="number" min="1" name="dhx_form_repeat_ends_after">${b.repeat_text_occurrences_count}</label>
						</div>
						<div class="dhx_form_repeat_ends_on dhx_hidden">
							<input type="date" name="dhx_form_repeat_ends_ondate">
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>`;
  }, _init_set_value: function(g, b, y) {
    function k($) {
      $ && $.classList.add("dhx_hidden");
    }
    function D($) {
      $ && $.classList.remove("dhx_hidden");
    }
    e.form_blocks.recurring._ds = { start: y.start_date, end: y.end_date };
    const M = g.querySelector(".dhx_form_repeat_pattern select");
    M && M.addEventListener("change", function() {
      (function($) {
        const H = g.querySelector(".dhx_form_repeat_custom");
        $ === "CUSTOM" ? D(H) : k(H);
      })(this.value);
    });
    const C = g.querySelector(".dhx_form_repeat_custom_interval [name='repeat_interval_unit']");
    C && C.addEventListener("change", function() {
      (function($) {
        const H = { weekly: g.querySelector(".dhx_form_repeat_custom_week"), monthly: g.querySelector(".dhx_form_repeat_custom_month"), yearly: g.querySelector(".dhx_form_repeat_custom_year") };
        switch ($) {
          case "DAILY":
            k(H.weekly), k(H.monthly), k(H.yearly);
            break;
          case "WEEKLY":
            D(H.weekly), k(H.monthly), k(H.yearly);
            break;
          case "MONTHLY":
            k(H.weekly), D(H.monthly), k(H.yearly);
            break;
          case "YEARLY":
            k(H.weekly), k(H.monthly), D(H.yearly);
        }
      })(this.value);
    });
    const A = g.querySelector(".dhx_form_repeat_ends [name='dhx_custom_repeat_ends']");
    A && A.addEventListener("change", function() {
      (function($) {
        const H = { after: g.querySelector(".dhx_form_repeat_ends_extra .dhx_form_repeat_ends_after"), on: g.querySelector(".dhx_form_repeat_ends_extra .dhx_form_repeat_ends_on") };
        switch ($) {
          case "NEVER":
            k(H.after), k(H.on);
            break;
          case "AFTER":
            D(H.after), k(H.on);
            break;
          case "ON":
            k(H.after), D(H.on);
        }
      })(this.value);
    }), e._lightbox._rec_init_done = !0;
  }, button_click: function() {
  }, set_value: function(g, b, y) {
    let k = e.form_blocks.recurring;
    e._lightbox._rec_init_done || k._init_set_value(g, b, y), g.open = !y.rrule, g.blocked = this._is_modified_occurrence(y);
    let D = k._ds;
    if (D.start = y.start_date, D.end = y._end_date, y.rrule) {
      const C = pe(y.rrule);
      E(g, C.origOptions, y);
      const A = function($, H) {
        const O = $.options, j = O.until || H;
        return O.count || j && j.getFullYear() !== 9999 ? "CUSTOM" : O.freq !== z.DAILY || O.interval !== 1 || O.byweekday ? O.freq !== z.WEEKLY || O.interval !== 1 || O.byweekday ? O.freq !== z.MONTHLY || O.interval !== 1 || O.bysetpos ? O.freq !== z.YEARLY || O.interval !== 1 || O.bysetpos ? O.freq === z.DAILY && O.byweekday && O.byweekday.length === e.config.recurring_workdays.length && O.byweekday.includes(z.MO) && O.byweekday.includes(z.TU) && O.byweekday.includes(z.WE) && O.byweekday.includes(z.TH) && O.byweekday.includes(z.FR) ? "WORKDAYS" : "CUSTOM" : "YEARLY" : "MONTHLY" : "WEEKLY" : "DAILY";
      }(C, y._end_date);
      if (g.querySelector(".dhx_form_repeat_pattern select").value = A, A === "CUSTOM") {
        let $;
        switch (C.origOptions.freq) {
          case z.DAILY:
            $ = "DAILY";
            break;
          case z.WEEKLY:
            $ = "WEEKLY";
            break;
          case z.MONTHLY:
            $ = "MONTHLY";
            break;
          case z.YEARLY:
            $ = "YEARLY";
        }
        $ && (g.querySelector('[name="repeat_interval_unit"]').value = $, g.querySelector('[name="repeat_interval_unit"]').dispatchEvent(new Event("change")));
      }
    } else {
      E(g, null, y);
      const C = g.querySelector(".dhx_form_repeat_pattern select");
      C && (C.value = "NEVER");
    }
    const M = g.querySelector(".dhx_form_repeat_pattern select");
    M && M.dispatchEvent(new Event("change"));
  }, get_value: function(g, b) {
    const y = g.querySelector(".dhx_form_repeat_pattern select");
    if (g.blocked || y && y.value === "NEVER")
      b.rrule = b.rrule = "", b._end_date = b.end_date;
    else {
      let k = e.form_blocks.recurring._ds, D = {};
      (function() {
        let $ = e.formSection("time");
        if ($ || ($ = T("time")), $ || ($ = T("calendar_time")), !$)
          throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", 'In the latter case, make sure the control is named "time":', "", "scheduler.config.lightbox.sections = [", '{name:"time", height:72, type:"YOU CONTROL", map_to:"auto" }];'].join(`
`));
        return $;
      })().getValue(D), k.start = D.start_date;
      const M = y ? y.value : "CUSTOM", C = N[M](k, g);
      b.rrule = new z(C.rrule).toString().replace("RRULE:", ""), k.end = C.until;
      const A = e._get_whole_days_length(D.start_date, D.end_date);
      b.duration = A !== null ? A : Math.floor((D.end_date - D.start_date) / 1e3), k._start ? (b.start_date = new Date(k.start), b._start_date = new Date(k.start), k._start = !1) : b._start_date = null, b._end_date = k.end;
    }
    return b.rrule;
  }, focus: function(g) {
  } };
}, recurring_legacy: function(e) {
  function o() {
    var a = e.formSection("recurring");
    if (a || (a = t("recurring")), !a)
      throw new Error(["Can't locate the Recurring form section.", "Make sure that you have the recurring control on the lightbox configuration https://docs.dhtmlx.com/scheduler/recurring_events.html#recurringlightbox ", 'and that the recurring control has name "recurring":', "", "scheduler.config.lightbox.sections = [", '	{name:"recurring", ... }', "];"].join(`
`));
    return a;
  }
  function t(a) {
    for (var s = 0; s < e.config.lightbox.sections.length; s++) {
      var i = e.config.lightbox.sections[s];
      if (i.type === a)
        return e.formSection(i.name);
    }
    return null;
  }
  function n(a) {
    return new Date(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), 0);
  }
  var d;
  e.config.occurrence_timestamp_in_utc = !1, e.config.recurring_workdays = [1, 2, 3, 4, 5], e.form_blocks.recurring = { _get_node: function(a) {
    if (typeof a == "string") {
      let s = e._lightbox.querySelector(`#${a}`);
      s || (s = document.getElementById(a)), a = s;
    }
    return a.style.display == "none" && (a.style.display = ""), a;
  }, _outer_html: function(a) {
    return a.outerHTML || (s = a, (r = document.createElement("div")).appendChild(s.cloneNode(!0)), i = r.innerHTML, r = null, i);
    var s, i, r;
  }, render: function(a) {
    if (a.form) {
      var s = e.form_blocks.recurring, i = s._get_node(a.form), r = s._outer_html(i);
      return i.style.display = "none", r;
    }
    var l = e.locale.labels;
    return '<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />' + l.repeat_radio_day + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>' + l.repeat_radio_week + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />' + l.repeat_radio_month + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />' + l.repeat_radio_year + '</label></div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>' + l.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />' + l.repeat_text_day_count + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>' + l.repeat_radio_day_type2 + '</label></div> </div> <div style="display:none;" id="dhx_repeat_week"><div><label>' + l.repeat_week + '<input class="dhx_repeat_text" type="text" name="week_count" value="1" /></label><span>' + l.repeat_text_week_count + '</span></div>  <table class="dhx_repeat_days"> <tr> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />' + l.day_for_recurring[1] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />' + l.day_for_recurring[4] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />' + l.day_for_recurring[2] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />' + l.day_for_recurring[5] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />' + l.day_for_recurring[3] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />' + l.day_for_recurring[6] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />' + l.day_for_recurring[0] + '</label></div> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>' + l.repeat_radio_month_type + '</label><label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />' + l.repeat_text_month_day + '</label><label><input class="dhx_repeat_text" type="text" name="month_count" value="1" />' + l.repeat_text_month_count + '</label></div> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>' + l.repeat_radio_month_start + '</label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><label><select name="month_day2">	<option value="1" selected >' + e.locale.date.day_full[1] + '<option value="2">' + e.locale.date.day_full[2] + '<option value="3">' + e.locale.date.day_full[3] + '<option value="4">' + e.locale.date.day_full[4] + '<option value="5">' + e.locale.date.day_full[5] + '<option value="6">' + e.locale.date.day_full[6] + '<option value="0">' + e.locale.date.day_full[0] + "</select>" + l.repeat_text_month_count2_before + '</label><label><input class="dhx_repeat_text" type="text" name="month_count2" value="1" />' + l.repeat_text_month_count2_after + '</label></div> </div> <div style="display:none;" id="dhx_repeat_year"> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>' + l.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />' + l.repeat_text_year_day + '</label><label><select name="year_month"><option value="0" selected >' + l.month_for_recurring[0] + '<option value="1">' + l.month_for_recurring[1] + '<option value="2">' + l.month_for_recurring[2] + '<option value="3">' + l.month_for_recurring[3] + '<option value="4">' + l.month_for_recurring[4] + '<option value="5">' + l.month_for_recurring[5] + '<option value="6">' + l.month_for_recurring[6] + '<option value="7">' + l.month_for_recurring[7] + '<option value="8">' + l.month_for_recurring[8] + '<option value="9">' + l.month_for_recurring[9] + '<option value="10">' + l.month_for_recurring[10] + '<option value="11">' + l.month_for_recurring[11] + "</select>" + l.select_year_month + '</label></div> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>' + l.repeat_year_label + '</label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >' + e.locale.date.day_full[1] + '<option value="2">' + e.locale.date.day_full[2] + '<option value="3">' + e.locale.date.day_full[3] + '<option value="4">' + e.locale.date.day_full[4] + '<option value="5">' + e.locale.date.day_full[5] + '<option value="6">' + e.locale.date.day_full[6] + '<option value="7">' + e.locale.date.day_full[0] + "</select>" + l.select_year_day2 + '<select name="year_month2"><option value="0" selected >' + l.month_for_recurring[0] + '<option value="1">' + l.month_for_recurring[1] + '<option value="2">' + l.month_for_recurring[2] + '<option value="3">' + l.month_for_recurring[3] + '<option value="4">' + l.month_for_recurring[4] + '<option value="5">' + l.month_for_recurring[5] + '<option value="6">' + l.month_for_recurring[6] + '<option value="7">' + l.month_for_recurring[7] + '<option value="8">' + l.month_for_recurring[8] + '<option value="9">' + l.month_for_recurring[9] + '<option value="10">' + l.month_for_recurring[10] + '<option value="11">' + l.month_for_recurring[11] + '</select></div> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <div><label><input class="dhx_repeat_radio" type="radio" name="end" checked/>' + l.repeat_radio_end + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + l.repeat_radio_end2 + '</label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />' + l.repeat_text_occurrences_count + '</div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + l.repeat_radio_end3 + '</label><input class="dhx_repeat_date" type="text" name="date_of_end" value="' + e.config.repeat_date_of_end + '" /></div> </div> </form> </div> </div>';
  }, _ds: {}, _get_form_node: function(a, s, i) {
    var r = a[s];
    if (!r)
      return null;
    if (r.nodeName)
      return r;
    if (r.length) {
      for (var l = 0; l < r.length; l++)
        if (r[l].value == i)
          return r[l];
    }
  }, _get_node_value: function(a, s, i) {
    var r = a[s];
    if (!r)
      return "";
    if (r.length) {
      if (i) {
        for (var l = [], _ = 0; _ < r.length; _++)
          r[_].checked && l.push(r[_].value);
        return l;
      }
      for (_ = 0; _ < r.length; _++)
        if (r[_].checked)
          return r[_].value;
    }
    return r.value ? i ? [r.value] : r.value : void 0;
  }, _get_node_numeric_value: function(a, s) {
    return 1 * e.form_blocks.recurring._get_node_value(a, s) || 0;
  }, _set_node_value: function(a, s, i) {
    var r = a[s];
    if (r) {
      if (r.name == s)
        r.value = i;
      else if (r.length)
        for (var l = typeof i == "object", _ = 0; _ < r.length; _++)
          (l || r[_].value == i) && (r[_].checked = l ? !!i[r[_].value] : !!i);
    }
  }, _init_set_value: function(a, s, i) {
    var r = e.form_blocks.recurring, l = r._get_node_value, _ = r._set_node_value;
    e.form_blocks.recurring._ds = { start: i.start_date, end: i._end_date };
    var c = e.date.str_to_date(e.config.repeat_date, !1, !0), h = e.date.date_to_str(e.config.repeat_date), p = a.getElementsByTagName("FORM")[0], f = {};
    function u(g) {
      for (var b = 0; b < g.length; b++) {
        var y = g[b];
        if (y.name)
          if (f[y.name])
            if (f[y.name].nodeType) {
              var k = f[y.name];
              f[y.name] = [k, y];
            } else
              f[y.name].push(y);
          else
            f[y.name] = y;
      }
    }
    if (u(p.getElementsByTagName("INPUT")), u(p.getElementsByTagName("SELECT")), !e.config.repeat_date_of_end) {
      var v = e.date.date_to_str(e.config.repeat_date);
      e.config.repeat_date_of_end = v(e.date.add(e._currentDate(), 30, "day"));
    }
    _(f, "date_of_end", e.config.repeat_date_of_end);
    var m = function(g) {
      return e._lightbox.querySelector(`#${g}`) || { style: {} };
    };
    function x() {
      m("dhx_repeat_day").style.display = "none", m("dhx_repeat_week").style.display = "none", m("dhx_repeat_month").style.display = "none", m("dhx_repeat_year").style.display = "none", m("dhx_repeat_" + this.value).style.display = "", e.setLightboxSize();
    }
    function w(g, b) {
      var y = g.end;
      if (y.length)
        if (y[0].value && y[0].value != "on")
          for (var k = 0; k < y.length; k++)
            y[k].value == b && (y[k].checked = !0);
        else {
          var D = 0;
          switch (b) {
            case "no":
              D = 0;
              break;
            case "date_of_end":
              D = 2;
              break;
            default:
              D = 1;
          }
          y[D].checked = !0;
        }
      else
        y.value = b;
    }
    e.form_blocks.recurring._get_repeat_code = function(g) {
      var b = [l(f, "repeat")];
      for (S[b[0]](b, g); b.length < 5; )
        b.push("");
      var y = "", k = function(D) {
        var M = D.end;
        if (M.length) {
          for (var C = 0; C < M.length; C++)
            if (M[C].checked)
              return M[C].value && M[C].value != "on" ? M[C].value : C ? C == 2 ? "date_of_end" : "occurences_count" : "no";
        } else if (M.value)
          return M.value;
        return "no";
      }(f);
      return k == "no" ? (g.end = new Date(9999, 1, 1), y = "no") : k == "date_of_end" ? g.end = function(D) {
        var M = c(D);
        return e.config.include_end_by && (M = e.date.add(M, 1, "day")), M;
      }(l(f, "date_of_end")) : (e.transpose_type(b.join("_")), y = Math.max(1, l(f, "occurences_count")), g.end = e.date["add_" + b.join("_")](new Date(g.start), y + 0, { start_date: g.start }) || g.start), b.join("_") + "#" + y;
    };
    var S = { month: function(g, b) {
      var y = e.form_blocks.recurring._get_node_value, k = e.form_blocks.recurring._get_node_numeric_value;
      y(f, "month_type") == "d" ? (g.push(Math.max(1, k(f, "month_count"))), b.start.setDate(y(f, "month_day"))) : (g.push(Math.max(1, k(f, "month_count2"))), g.push(y(f, "month_day2")), g.push(Math.max(1, k(f, "month_week2"))), e.config.repeat_precise || b.start.setDate(1)), b._start = !0;
    }, week: function(g, b) {
      var y = e.form_blocks.recurring._get_node_value, k = e.form_blocks.recurring._get_node_numeric_value;
      g.push(Math.max(1, k(f, "week_count"))), g.push(""), g.push("");
      for (var D = [], M = y(f, "week_day", !0), C = b.start.getDay(), A = !1, $ = 0; $ < M.length; $++)
        D.push(M[$]), A = A || M[$] == C;
      D.length || (D.push(C), A = !0), D.sort(), e.config.repeat_precise ? A || (e.transpose_day_week(b.start, D, 1, 7), b._start = !0) : (b.start = e.date.week_start(b.start), b._start = !0), g.push(D.join(","));
    }, day: function(g) {
      var b = e.form_blocks.recurring._get_node_value, y = e.form_blocks.recurring._get_node_numeric_value;
      b(f, "day_type") == "d" ? g.push(Math.max(1, y(f, "day_count"))) : (g.push("week"), g.push(1), g.push(""), g.push(""), g.push(e.config.recurring_workdays.join(",")), g.splice(0, 1));
    }, year: function(g, b) {
      var y = e.form_blocks.recurring._get_node_value;
      y(f, "year_type") == "d" ? (g.push("1"), b.start.setMonth(0), b.start.setDate(y(f, "year_day")), b.start.setMonth(y(f, "year_month"))) : (g.push("1"), g.push(y(f, "year_day2")), g.push(y(f, "year_week2")), b.start.setDate(1), b.start.setMonth(y(f, "year_month2"))), b._start = !0;
    } }, N = { week: function(g, b) {
      var y = e.form_blocks.recurring._set_node_value;
      y(f, "week_count", g[1]);
      for (var k = g[4].split(","), D = {}, M = 0; M < k.length; M++)
        D[k[M]] = !0;
      y(f, "week_day", D);
    }, month: function(g, b) {
      var y = e.form_blocks.recurring._set_node_value;
      g[2] === "" ? (y(f, "month_type", "d"), y(f, "month_count", g[1]), y(f, "month_day", b.start.getDate())) : (y(f, "month_type", "w"), y(f, "month_count2", g[1]), y(f, "month_week2", g[3]), y(f, "month_day2", g[2]));
    }, day: function(g, b) {
      var y = e.form_blocks.recurring._set_node_value;
      y(f, "day_type", "d"), y(f, "day_count", g[1]);
    }, year: function(g, b) {
      var y = e.form_blocks.recurring._set_node_value;
      g[2] === "" ? (y(f, "year_type", "d"), y(f, "year_day", b.start.getDate()), y(f, "year_month", b.start.getMonth())) : (y(f, "year_type", "w"), y(f, "year_week2", g[3]), y(f, "year_day2", g[2]), y(f, "year_month2", b.start.getMonth()));
    } };
    e.form_blocks.recurring._set_repeat_code = function(g, b) {
      var y = e.form_blocks.recurring._set_node_value, k = g.split("#");
      switch (g = k[0].split("_"), N[g[0]](g, b), k[1]) {
        case "no":
          w(f, "no");
          break;
        case "":
          w(f, "date_of_end");
          var D = b.end;
          e.config.include_end_by && (D = e.date.add(D, -1, "day")), y(f, "date_of_end", h(D));
          break;
        default:
          w(f, "occurences_count"), y(f, "occurences_count", k[1]);
      }
      y(f, "repeat", g[0]);
      var M = e.form_blocks.recurring._get_form_node(f, "repeat", g[0]);
      M.nodeName == "SELECT" ? (M.dispatchEvent(new Event("change")), M.dispatchEvent(new MouseEvent("click"))) : M.dispatchEvent(new MouseEvent("click"));
    };
    for (var E = 0; E < p.elements.length; E++) {
      var T = p.elements[E];
      T.name === "repeat" && (T.nodeName != "SELECT" || T.$_eventAttached ? T.$_eventAttached || (T.$_eventAttached = !0, T.addEventListener("click", x)) : (T.$_eventAttached = !0, T.addEventListener("change", x)));
    }
    e._lightbox._rec_init_done = !0;
  }, set_value: function(a, s, i) {
    var r = e.form_blocks.recurring;
    e._lightbox._rec_init_done || r._init_set_value(a, s, i), a.open = !i.rec_type, a.blocked = this._is_modified_occurence(i);
    var l = r._ds;
    l.start = i.start_date, l.end = i._end_date, r._toggle_block(), s && r._set_repeat_code(s, l);
  }, get_value: function(a, s) {
    if (a.open) {
      var i = e.form_blocks.recurring._ds, r = {};
      (function() {
        var l = e.formSection("time");
        if (l || (l = t("time")), l || (l = t("calendar_time")), !l)
          throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", 'In the latter case, make sure the control is named "time":', "", "scheduler.config.lightbox.sections = [", '{name:"time", height:72, type:"YOU CONTROL", map_to:"auto" }];'].join(`
`));
        return l;
      })().getValue(r), i.start = r.start_date, s.rec_type = e.form_blocks.recurring._get_repeat_code(i), i._start ? (s.start_date = new Date(i.start), s._start_date = new Date(i.start), i._start = !1) : s._start_date = null, s._end_date = i.end, s.rec_pattern = s.rec_type.split("#")[0];
    } else
      s.rec_type = s.rec_pattern = "", s._end_date = s.end_date;
    return s.rec_type;
  }, _get_button: function() {
    return o().header.firstChild.firstChild;
  }, _get_form: function() {
    return o().node;
  }, open: function() {
    var a = e.form_blocks.recurring;
    a._get_form().open || a._toggle_block();
  }, close: function() {
    var a = e.form_blocks.recurring;
    a._get_form().open && a._toggle_block();
  }, _toggle_block: function() {
    var a = e.form_blocks.recurring, s = a._get_form(), i = a._get_button();
    s.open || s.blocked ? (s.style.height = "0px", i && (i.style.backgroundPosition = "-5px 20px", i.nextSibling.innerHTML = e.locale.labels.button_recurring)) : (s.style.height = "auto", i && (i.style.backgroundPosition = "-5px 0px", i.nextSibling.innerHTML = e.locale.labels.button_recurring_open)), s.open = !s.open, e.setLightboxSize();
  }, focus: function(a) {
  }, button_click: function(a, s, i) {
    e.form_blocks.recurring._get_form().blocked || e.form_blocks.recurring._toggle_block();
  } }, e._rec_markers = {}, e._rec_markers_pull = {}, e._add_rec_marker = function(a, s) {
    a._pid_time = s, this._rec_markers[a.id] = a, this._rec_markers_pull[a.event_pid] || (this._rec_markers_pull[a.event_pid] = {}), this._rec_markers_pull[a.event_pid][s] = a;
  }, e._get_rec_marker = function(a, s) {
    var i = this._rec_markers_pull[s];
    return i ? i[a] : null;
  }, e._get_rec_markers = function(a) {
    return this._rec_markers_pull[a] || [];
  }, e._rec_temp = [], d = e.addEvent, e.addEvent = function(a, s, i, r, l) {
    var _ = d.apply(this, arguments);
    if (_ && e.getEvent(_)) {
      var c = e.getEvent(_);
      c.start_date && (c.start_date = n(c.start_date)), c.end_date && (c.end_date = n(c.end_date)), this._is_modified_occurence(c) && e._add_rec_marker(c, 1e3 * c.event_length), c.rec_type && (c.rec_pattern = c.rec_type.split("#")[0]);
    }
    return _;
  }, e.attachEvent("onEventIdChange", function(a, s) {
    if (!this._ignore_call) {
      this._ignore_call = !0, e._rec_markers[a] && (e._rec_markers[s] = e._rec_markers[a], delete e._rec_markers[a]), e._rec_markers_pull[a] && (e._rec_markers_pull[s] = e._rec_markers_pull[a], delete e._rec_markers_pull[a]);
      for (var i = 0; i < this._rec_temp.length; i++)
        (r = this._rec_temp[i]).event_pid == a && (r.event_pid = s, this.changeEventId(r.id, s + "#" + r.id.split("#")[1]));
      for (var i in this._rec_markers) {
        var r;
        (r = this._rec_markers[i]).event_pid == a && (r.event_pid = s, r._pid_changed = !0);
      }
      var l = e._rec_markers[s];
      l && l._pid_changed && (delete l._pid_changed, setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.callEvent("onEventChanged", [s, e.getEvent(s)]);
      }, 1)), delete this._ignore_call;
    }
  }), e.attachEvent("onConfirmedBeforeEventDelete", function(a) {
    var s = this.getEvent(a);
    if (this._is_virtual_event(a) || this._is_modified_occurence(s) && s.rec_type && s.rec_type != "none") {
      a = a.split("#");
      var i = this.uid(), r = a[1] ? a[1] : Math.round(s._pid_time / 1e3), l = this._copy_event(s);
      l.id = i, l.event_pid = s.event_pid || a[0];
      var _ = r;
      l.event_length = _, l.rec_type = l.rec_pattern = "none", this.addEvent(l), this._add_rec_marker(l, 1e3 * _);
    } else {
      s.rec_type && this._lightbox_id && this._roll_back_dates(s);
      var c = this._get_rec_markers(a);
      for (var h in c)
        c.hasOwnProperty(h) && (a = c[h].id, this.getEvent(a) && this.deleteEvent(a, !0));
    }
    return !0;
  }), e.attachEvent("onEventDeleted", function(a, s) {
    !this._is_virtual_event(a) && this._is_modified_occurence(s) && (e._events[a] || (s.rec_type = s.rec_pattern = "none", this.setEvent(a, s)));
  }), e.attachEvent("onEventChanged", function(a, s) {
    if (this._loading)
      return !0;
    var i = this.getEvent(a);
    if (this._is_virtual_event(a)) {
      a = a.split("#");
      var r = this.uid();
      this._not_render = !0;
      var l = this._copy_event(s);
      l.id = r, l.event_pid = a[0];
      var _ = a[1];
      l.event_length = _, l.rec_type = l.rec_pattern = "", this._add_rec_marker(l, 1e3 * _), this.addEvent(l), this._not_render = !1;
    } else {
      i.start_date && (i.start_date = n(i.start_date)), i.end_date && (i.end_date = n(i.end_date)), i.rec_type && this._lightbox_id && this._roll_back_dates(i);
      var c = this._get_rec_markers(a);
      for (var h in c)
        c.hasOwnProperty(h) && (delete this._rec_markers[c[h].id], this.deleteEvent(c[h].id, !0));
      delete this._rec_markers_pull[a];
      for (var p = !1, f = 0; f < this._rendered.length; f++)
        this._rendered[f].getAttribute(this.config.event_attribute) == a && (p = !0);
      p || (this._select_id = null);
    }
    return !0;
  }), e.attachEvent("onEventAdded", function(a) {
    if (!this._loading) {
      var s = this.getEvent(a);
      s.rec_type && !s.event_length && this._roll_back_dates(s);
    }
    return !0;
  }), e.attachEvent("onEventSave", function(a, s, i) {
    return this.getEvent(a).rec_type || !s.rec_type || this._is_virtual_event(a) || (this._select_id = null), !0;
  }), e.attachEvent("onEventCreated", function(a) {
    var s = this.getEvent(a);
    return s.rec_type || (s.rec_type = s.rec_pattern = s.event_length = s.event_pid = ""), !0;
  }), e.attachEvent("onEventCancel", function(a) {
    var s = this.getEvent(a);
    s.rec_type && (this._roll_back_dates(s), this.render_view_data());
  }), e._roll_back_dates = function(a) {
    a.start_date && (a.start_date = n(a.start_date)), a.end_date && (a.end_date = n(a.end_date));
    var s = e._get_whole_days_length(a.start_date, a.end_date);
    a.event_length = s !== null ? s : Math.round((a.end_date.valueOf() - a.start_date.valueOf()) / 1e3), a.end_date = a._end_date, a._start_date && (a.start_date.setMonth(0), a.start_date.setDate(a._start_date.getDate()), a.start_date.setMonth(a._start_date.getMonth()), a.start_date.setFullYear(a._start_date.getFullYear()));
  }, e._is_virtual_event = function(a) {
    return a.toString().indexOf("#") != -1;
  }, e._is_modified_occurence = function(a) {
    return a.event_pid && a.event_pid != "0";
  }, e.showLightbox_rec = e.showLightbox, e.showLightbox = function(a) {
    var s = this.locale, i = e.config.lightbox_recurring, r = this.getEvent(a), l = r.event_pid, _ = this._is_virtual_event(a);
    _ && (l = a.split("#")[0]);
    var c = function(p) {
      var f = e.getEvent(p);
      return f._end_date = f.end_date, f.end_date = new Date(f.start_date.valueOf() + 1e3 * f.event_length), e.showLightbox_rec(p);
    };
    if ((l || 1 * l == 0) && r.rec_type)
      return c(a);
    if (!l || l === "0" || !s.labels.confirm_recurring || i == "instance" || i == "series" && !_)
      return this.showLightbox_rec(a);
    if (i == "ask") {
      var h = this;
      e.modalbox({ text: s.labels.confirm_recurring, title: s.labels.title_confirm_recurring, width: "500px", position: "middle", buttons: [s.labels.button_edit_series, s.labels.button_edit_occurrence, s.labels.icon_cancel], callback: function(p) {
        switch (+p) {
          case 0:
            return c(l);
          case 1:
            return h.showLightbox_rec(a);
          case 2:
            return;
        }
      } });
    } else
      c(l);
  }, e.get_visible_events_rec = e.get_visible_events, e.get_visible_events = function(a) {
    for (var s = 0; s < this._rec_temp.length; s++)
      delete this._events[this._rec_temp[s].id];
    this._rec_temp = [];
    var i = this.get_visible_events_rec(a), r = [];
    for (s = 0; s < i.length; s++)
      i[s].rec_type ? i[s].rec_pattern != "none" && this.repeat_date(i[s], r) : r.push(i[s]);
    return r;
  }, function() {
    var a = e.isOneDayEvent;
    e.isOneDayEvent = function(i) {
      return !!i.rec_type || a.call(this, i);
    };
    var s = e.updateEvent;
    e.updateEvent = function(i) {
      var r = e.getEvent(i);
      r && r.rec_type && (r.rec_pattern = (r.rec_type || "").split("#")[0]), r && r.rec_type && !this._is_virtual_event(i) ? e.update_view() : s.call(this, i);
    };
  }(), e.transponse_size = { day: 1, week: 7, month: 1, year: 12 }, e.date.day_week = function(a, s, i) {
    a.setDate(1);
    var r = e.date.month_start(new Date(a)), l = 1 * s + (i = 7 * (i - 1)) - a.getDay() + 1;
    a.setDate(l <= i ? l + 7 : l);
    var _ = e.date.month_start(new Date(a));
    return r.valueOf() === _.valueOf();
  }, e.transpose_day_week = function(a, s, i, r, l) {
    for (var _ = (a.getDay() || (e.config.start_on_monday ? 7 : 0)) - i, c = 0; c < s.length; c++)
      if (s[c] > _)
        return a.setDate(a.getDate() + 1 * s[c] - _ - (r ? i : l));
    this.transpose_day_week(a, s, i + r, null, i);
  }, e.transpose_type = function(a) {
    var s = "transpose_" + a;
    if (!this.date[s]) {
      var i = a.split("_"), r = "add_" + a, l = this.transponse_size[i[0]] * i[1];
      if (i[0] == "day" || i[0] == "week") {
        var _ = null;
        if (i[4] && (_ = i[4].split(","), e.config.start_on_monday)) {
          for (var c = 0; c < _.length; c++)
            _[c] = 1 * _[c] || 7;
          _.sort();
        }
        this.date[s] = function(h, p) {
          var f = Math.floor((p.valueOf() - h.valueOf()) / (864e5 * l));
          return f > 0 && h.setDate(h.getDate() + f * l), _ && e.transpose_day_week(h, _, 1, l), h;
        }, this.date[r] = function(h, p) {
          var f = new Date(h.valueOf());
          if (_)
            for (var u = 0; u < p; u++)
              e.transpose_day_week(f, _, 0, l);
          else
            f.setDate(f.getDate() + p * l);
          return f;
        };
      } else
        i[0] != "month" && i[0] != "year" || (this.date[s] = function(h, p, f) {
          var u = Math.ceil((12 * p.getFullYear() + 1 * p.getMonth() + 1 - (12 * h.getFullYear() + 1 * h.getMonth() + 1)) / l - 1);
          return u >= 0 && (h.setDate(1), h.setMonth(h.getMonth() + u * l)), e.date[r](h, 0, f);
        }, this.date[r] = function(h, p, f, u) {
          if (u ? u++ : u = 1, u > 12)
            return null;
          var v = new Date(h.valueOf());
          v.setDate(1), v.setMonth(v.getMonth() + p * l);
          var m = v.getMonth(), x = v.getFullYear();
          v.setDate(f.start_date.getDate()), i[3] && e.date.day_week(v, i[2], i[3]);
          var w = e.config.recurring_overflow_instances;
          return v.getMonth() != m && w != "none" && (v = w === "lastDay" ? new Date(x, m + 1, 0, v.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds()) : e.date[r](new Date(x, m + 1, 0), p || 1, f, u)), v;
        });
    }
  }, e.repeat_date = function(a, s, i, r, l, _) {
    r = r || this._min_date, l = l || this._max_date;
    var c = _ || -1, h = new Date(a.start_date.valueOf()), p = h.getHours(), f = 0;
    for (!a.rec_pattern && a.rec_type && (a.rec_pattern = a.rec_type.split("#")[0]), this.transpose_type(a.rec_pattern), h = e.date["transpose_" + a.rec_pattern](h, r, a); h && (h < a.start_date || e._fix_daylight_saving_date(h, r, a, h, new Date(h.valueOf() + 1e3 * a.event_length)).valueOf() <= r.valueOf() || h.valueOf() + 1e3 * a.event_length <= r.valueOf()); )
      h = this.date["add_" + a.rec_pattern](h, 1, a);
    for (; h && h < l && h < a.end_date && (c < 0 || f < c); ) {
      h.setHours(p);
      var u = e.config.occurrence_timestamp_in_utc ? Date.UTC(h.getFullYear(), h.getMonth(), h.getDate(), h.getHours(), h.getMinutes(), h.getSeconds()) : h.valueOf(), v = this._get_rec_marker(u, a.id);
      if (v)
        i && (v.rec_type != "none" && f++, s.push(v));
      else {
        var m = new Date(h.valueOf() + 1e3 * a.event_length), x = this._copy_event(a);
        if (x.text = a.text, x.start_date = h, x.event_pid = a.id, x.id = a.id + "#" + Math.round(u / 1e3), x.end_date = m, x.end_date = e._fix_daylight_saving_date(x.start_date, x.end_date, a, h, x.end_date), x._timed = this.isOneDayEvent(x), !x._timed && !this._table_view && !this.config.multi_day)
          return;
        s.push(x), i || (this._events[x.id] = x, this._rec_temp.push(x)), f++;
      }
      h = this.date["add_" + a.rec_pattern](h, 1, a);
    }
  }, e._fix_daylight_saving_date = function(a, s, i, r, l) {
    var _ = i.event_length / 86400;
    if (_ > 0 && _ === Math.floor(_) && e._is_start_of_day(a))
      return new Date(a.getFullYear(), a.getMonth(), a.getDate() + _);
    var c, h = a.getTimezoneOffset() - s.getTimezoneOffset();
    return h && e._is_start_of_day(a) && (c = h > 0 ? new Date(r.valueOf() + 1e3 * i.event_length - 60 * h * 1e3) : new Date(s.valueOf() - 60 * h * 1e3), e._is_start_of_day(c)) ? c : new Date(l.valueOf());
  }, e.getRecDates = function(a, s) {
    var i = typeof a == "object" ? a : e.getEvent(a), r = [];
    if (s = s || 100, !i.rec_type)
      return [{ start_date: i.start_date, end_date: i.end_date }];
    if (i.rec_type == "none")
      return [];
    e.repeat_date(i, r, !0, i.start_date, i.end_date, s);
    for (var l = [], _ = 0; _ < r.length; _++)
      r[_].rec_type != "none" && l.push({ start_date: r[_].start_date, end_date: r[_].end_date });
    return l;
  }, e.getEvents = function(a, s) {
    var i = [];
    for (var r in this._events) {
      var l = this._events[r];
      if (l && l.start_date < s && l.end_date > a)
        if (l.rec_pattern) {
          if (l.rec_pattern == "none")
            continue;
          var _ = [];
          this.repeat_date(l, _, !0, a, s);
          for (var c = 0; c < _.length; c++)
            !_[c].rec_pattern && _[c].start_date < s && _[c].end_date > a && !this._rec_markers[_[c].id] && i.push(_[c]);
        } else
          this._is_virtual_event(l.id) || i.push(l);
    }
    return i;
  }, e.config.repeat_date = "%m.%d.%Y", e.config.lightbox.sections = [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "recurring", type: "recurring", map_to: "rec_type", button: "recurring" }, { name: "time", height: 72, type: "time", map_to: "auto" }], e._copy_dummy = function(a) {
    var s = new Date(this.start_date), i = new Date(this.end_date);
    this.start_date = s, this.end_date = i, this.event_length = this.event_pid = this.rec_pattern = this.rec_type = null;
  }, e.config.include_end_by = !1, e.config.lightbox_recurring = "ask", e.attachEvent("onClearAll", function() {
    e._rec_markers = {}, e._rec_markers_pull = {}, e._rec_temp = [];
  });
}, serialize: function(e) {
  const o = wt(e);
  e.data_attributes = function() {
    var t = [], n = e._helpers.formatDate, d = o();
    for (var a in d) {
      var s = d[a];
      for (var i in s)
        i.substr(0, 1) != "_" && t.push([i, i == "start_date" || i == "end_date" ? n : null]);
      break;
    }
    return t;
  }, e.toXML = function(t) {
    var n = [], d = this.data_attributes(), a = o();
    for (var s in a) {
      var i = a[s];
      n.push("<event>");
      for (var r = 0; r < d.length; r++)
        n.push("<" + d[r][0] + "><![CDATA[" + (d[r][1] ? d[r][1](i[d[r][0]]) : i[d[r][0]]) + "]]></" + d[r][0] + ">");
      n.push("</event>");
    }
    return (t || "") + "<data>" + n.join(`
`) + "</data>";
  }, e._serialize_json_value = function(t) {
    return t === null || typeof t == "boolean" ? t = "" + t : (t || t === 0 || (t = ""), t = '"' + t.toString().replace(/\n/g, "").replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'), t;
  }, e.toJSON = function() {
    return JSON.stringify(this.serialize());
  }, e.toICal = function(t) {
    var n = e.date.date_to_str("%Y%m%dT%H%i%s"), d = e.date.date_to_str("%Y%m%d"), a = [], s = o();
    for (var i in s) {
      var r = s[i];
      a.push("BEGIN:VEVENT"), r._timed && (r.start_date.getHours() || r.start_date.getMinutes()) ? a.push("DTSTART:" + n(r.start_date)) : a.push("DTSTART:" + d(r.start_date)), r._timed && (r.end_date.getHours() || r.end_date.getMinutes()) ? a.push("DTEND:" + n(r.end_date)) : a.push("DTEND:" + d(r.end_date)), a.push("SUMMARY:" + r.text), a.push("END:VEVENT");
    }
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
DESCRIPTION:` + (t || "") + `
` + a.join(`
`) + `
END:VCALENDAR`;
  };
}, timeline: function(e) {
  ce("Timeline", e.assert);
}, tooltip: function(e) {
  e.config.tooltip_timeout = 30, e.config.tooltip_offset_y = 20, e.config.tooltip_offset_x = 10, e.config.tooltip_hide_timeout = 30;
  const o = new tn(e);
  e.ext.tooltips = o, e.attachEvent("onSchedulerReady", function() {
    o.tooltipFor({ selector: "[" + e.config.event_attribute + "]", html: (t) => {
      if (e._mobile && !e.config.touch_tooltip)
        return;
      const n = e._locate_event(t.target);
      if (e.getEvent(n)) {
        const d = e.getEvent(n);
        return e.templates.tooltip_text(d.start_date, d.end_date, d);
      }
      return null;
    }, global: !1 });
  }), e.attachEvent("onDestroy", function() {
    o.destructor();
  }), e.attachEvent("onLightbox", function() {
    o.hideTooltip();
  }), e.attachEvent("onBeforeDrag", function() {
    return e._mobile && e.config.touch_tooltip || o.hideTooltip(), !0;
  }), e.attachEvent("onEventDeleted", function() {
    return o.hideTooltip(), !0;
  });
}, treetimeline: function(e) {
  ce("Tree Timeline", e.assert);
}, units: function(e) {
  ce("Units", e.assert);
}, url: function(e) {
  e._get_url_nav = function() {
    return function() {
      const a = /* @__PURE__ */ Object.create(null), s = (document.location.hash || "").replace("#", "");
      if (!s)
        return a;
      const i = s.split(","), r = ["__proto__", "constructor", "prototype"];
      for (let l = 0; l < i.length; l++) {
        const _ = i[l].split("=");
        _.length !== 2 || r.includes(_[0]) || (a[_[0]] = _[1]);
      }
      return a;
    }();
  };
  const o = e.date.date_to_str("%Y-%m-%d"), t = e._getInitialState;
  function n(a) {
    const s = e._date || e.getState().date, i = e.getState().mode, r = ["date=" + o(s), "mode=" + i];
    a && r.push("event=" + a), document.location.hash = "#" + r.join(",");
  }
  e._getInitialState = function(a) {
    const s = t.call(this, a), i = e._get_url_nav ? e._get_url_nav() : null;
    if (!i)
      return s;
    const r = { date: s.date, mode: s.mode };
    if (i.date) {
      const l = e.date.str_to_date("%Y-%m-%d");
      try {
        const _ = l(i.date);
        isNaN(+_) || (r.date = _);
      } catch {
      }
    }
    if (i.mode)
      try {
        this.isViewExists(i.mode) && (r.mode = i.mode);
      } catch {
      }
    return r;
  };
  let d = null;
  e.attachEvent("onSchedulerReady", function() {
    const a = e._get_url_nav();
    return a.event && (d = a.event, function(s) {
      if (!s)
        return;
      const i = function() {
        if (!e.$destroyed)
          return !!e.getEvent(s) && (e.showEvent(s), !0);
      };
      if (i())
        return;
      const r = e.attachEvent("onParse", function() {
        return i(), e.detachEvent(r), !0;
      });
    }(a.event)), n(d), !0;
  }), e.attachEvent("onAfterEventDisplay", function() {
    return d = null, n(null), !0;
  }), e.attachEvent("onViewChange", function() {
    return n(d), !0;
  });
}, week_agenda: function(e) {
  ce("Week Agenda", e.assert);
}, wp: function(e) {
  e.attachEvent("onLightBox", function() {
    if (this._cover)
      try {
        this._cover.style.height = this.expanded ? "100%" : (document.body.parentNode || document.body).scrollHeight + "px";
      } catch {
      }
  }), e.form_blocks.select.set_value = function(o, t, n) {
    t !== void 0 && t !== "" || (t = (o.firstChild.options[0] || {}).value), o.firstChild.value = t || "";
  };
}, year_view: function(e) {
  e.templates.year_date = function(i) {
    return e.date.date_to_str(e.locale.labels.year_tab + " %Y")(i);
  }, e.templates.year_month = e.date.date_to_str("%F"), e.templates.year_scale_date = e.date.date_to_str("%D"), e.templates.year_tooltip = function(i, r, l) {
    return l.text;
  };
  const o = function() {
    return e._mode == "year";
  }, t = function(i) {
    var r = e.$domHelpers.closest(i, "[data-cell-date]");
    return r && r.hasAttribute("data-cell-date") ? e.templates.parse_date(r.getAttribute("data-cell-date")) : null;
  };
  e.dblclick_dhx_year_grid = function(i) {
    if (o()) {
      const r = i.target;
      if (e.$domHelpers.closest(r, ".dhx_before") || e.$domHelpers.closest(r, ".dhx_after"))
        return !1;
      const l = t(r);
      if (l) {
        const _ = l, c = this.date.add(_, 1, "day");
        !this.config.readonly && this.config.dblclick_create && this.addEventNow(_.valueOf(), c.valueOf(), i);
      }
    }
  }, e.attachEvent("onEventIdChange", function() {
    o() && this.year_view(!0);
  });
  var n = e.render_data;
  e.render_data = function(i) {
    if (!o())
      return n.apply(this, arguments);
    for (var r = 0; r < i.length; r++)
      this._year_render_event(i[r]);
  };
  var d = e.clear_view;
  e.clear_view = function() {
    if (!o())
      return d.apply(this, arguments);
    var i = e._year_marked_cells;
    for (var r in i)
      i.hasOwnProperty(r) && i[r].classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
    e._year_marked_cells = {};
  }, e._hideToolTip = function() {
    this._tooltip && (this._tooltip.style.display = "none", this._tooltip.date = new Date(9999, 1, 1));
  }, e._showToolTip = function(i, r, l, _) {
    if (this._tooltip) {
      if (this._tooltip.date.valueOf() == i.valueOf())
        return;
      this._tooltip.innerHTML = "";
    } else {
      var c = this._tooltip = document.createElement("div");
      c.className = "dhx_year_tooltip", this.config.rtl && (c.className += " dhx_tooltip_rtl"), document.body.appendChild(c), c.addEventListener("click", e._click.dhx_cal_data), c.addEventListener("click", function(x) {
        if (x.target.closest(`[${e.config.event_attribute}]`)) {
          const w = x.target.closest(`[${e.config.event_attribute}]`).getAttribute(e.config.event_attribute);
          e.showLightbox(w);
        }
      });
    }
    for (var h = this.getEvents(i, this.date.add(i, 1, "day")), p = "", f = 0; f < h.length; f++) {
      var u = h[f];
      if (this.filter_event(u.id, u)) {
        var v = u.color ? "--dhx-scheduler-event-background:" + u.color + ";" : "", m = u.textColor ? "--dhx-scheduler-event-color:" + u.textColor + ";" : "";
        p += "<div class='dhx_tooltip_line' style='" + v + m + "' event_id='" + h[f].id + "' " + this.config.event_attribute + "='" + h[f].id + "'>", p += "<div class='dhx_tooltip_date' style='" + v + m + "'>" + (h[f]._timed ? this.templates.event_date(h[f].start_date) : "") + "</div>", p += "<div class='dhx_event_icon icon_details'>&nbsp;</div>", p += this.templates.year_tooltip(h[f].start_date, h[f].end_date, h[f]) + "</div>";
      }
    }
    this._tooltip.style.display = "", this._tooltip.style.top = "0px", document.body.offsetWidth - r.left - this._tooltip.offsetWidth < 0 ? this._tooltip.style.left = r.left - this._tooltip.offsetWidth + "px" : this._tooltip.style.left = r.left + _.offsetWidth + "px", this._tooltip.date = i, this._tooltip.innerHTML = p, document.body.offsetHeight - r.top - this._tooltip.offsetHeight < 0 ? this._tooltip.style.top = r.top - this._tooltip.offsetHeight + _.offsetHeight + "px" : this._tooltip.style.top = r.top + "px";
  }, e._year_view_tooltip_handler = function(i) {
    if (o()) {
      var r = i.target || i.srcElement;
      r.tagName.toLowerCase() == "a" && (r = r.parentNode), e._getClassName(r).indexOf("dhx_year_event") != -1 ? e._showToolTip(e.templates.parse_date(r.getAttribute("data-year-date")), e.$domHelpers.getOffset(r), i, r) : e._hideToolTip();
    }
  }, e._init_year_tooltip = function() {
    e._detachDomEvent(e._els.dhx_cal_data[0], "mouseover", e._year_view_tooltip_handler), e.event(e._els.dhx_cal_data[0], "mouseover", e._year_view_tooltip_handler);
  }, e._get_year_cell = function(i) {
    const r = e.date.day_start(i), l = e.templates.format_date(r), _ = this.$root.querySelectorAll(`.dhx_cal_data .dhx_cal_datepicker_date[data-cell-date="${l}"]`);
    for (let c = 0; c < _.length; c++)
      if (!e.$domHelpers.closest(_[c], ".dhx_after, .dhx_before"))
        return _[c];
    return null;
  }, e._year_marked_cells = {}, e._mark_year_date = function(i, r) {
    var l = e.templates.format_date(i), _ = this._get_year_cell(i);
    if (_) {
      var c = this.templates.event_class(r.start_date, r.end_date, r);
      e._year_marked_cells[l] || (_.classList.add("dhx_year_event", "dhx_cal_datepicker_event"), _.setAttribute("data-year-date", l), _.setAttribute("date", l), e._year_marked_cells[l] = _), c && _.classList.add(c);
    }
  }, e._unmark_year_date = function(i) {
    var r = this._get_year_cell(i);
    r && r.classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
  }, e._year_render_event = function(i) {
    var r = i.start_date;
    for (r = r.valueOf() < this._min_date.valueOf() ? this._min_date : this.date.date_part(new Date(r)); r < i.end_date; )
      if (this._mark_year_date(r, i), (r = this.date.add(r, 1, "day")).valueOf() >= this._max_date.valueOf())
        return;
  }, e.year_view = function(i) {
    if (e.set_sizes(), e._table_view = i, !this._load_mode || !this._load())
      if (i) {
        if (e._init_year_tooltip(), e._reset_year_scale(), e._load_mode && e._load())
          return void (e._render_wait = !0);
        e.render_view_data();
      } else
        e._hideToolTip();
  }, e._reset_year_scale = function() {
    var i = this._els.dhx_cal_data[0];
    i.scrollTop = 0, i.innerHTML = "";
    let r = this.date.year_start(new Date(this._date));
    this._min_date = this.date.week_start(new Date(r));
    const l = document.createElement("div");
    l.classList.add("dhx_year_wrapper");
    let _ = r;
    for (let p = 0; p < 12; p++) {
      let f = document.createElement("div");
      f.className = "dhx_year_box", f.setAttribute("date", this._helpers.formatDate(_)), f.setAttribute("data-month-date", this._helpers.formatDate(_)), f.innerHTML = `<div class='dhx_year_month'>${this.templates.year_month(_)}</div>
			<div class='dhx_year_grid'></div>`;
      const u = f.querySelector(".dhx_year_grid"), v = e._createDatePicker(null, { date: _, filterDays: e.ignore_year, minWeeks: 6 });
      v._renderDayGrid(u), v.destructor(), l.appendChild(f), _ = this.date.add(_, 1, "month");
    }
    i.appendChild(l);
    let c = this.date.add(r, 1, "year");
    c.valueOf() != this.date.week_start(new Date(c)).valueOf() && (c = this.date.week_start(new Date(c)), c = this.date.add(c, 1, "week")), this._max_date = c;
    var h = this._getNavDateElement();
    h && (h.innerHTML = this.templates[this._mode + "_date"](r, c, this._mode));
  };
  var a = e.getActionData;
  e.getActionData = function(i) {
    return o() ? { date: t(i.target), section: null } : a.apply(e, arguments);
  };
  var s = e._locate_event;
  e._locate_event = function(i) {
    var r = s.apply(e, arguments);
    if (!o())
      return r;
    if (!r) {
      var l = t(i);
      if (!l)
        return null;
      var _ = e.getEvents(l, e.date.add(l, 1, "day"));
      if (!_.length)
        return null;
      r = _[0].id;
    }
    return r;
  }, e.attachEvent("onDestroy", function() {
    e._hideToolTip();
  });
} }, Pe = new class {
  constructor(e) {
    this._seed = 0, this._schedulerPlugins = [], this._bundledExtensions = e, this._extensionsManager = new ha(e);
  }
  plugin(e) {
    this._schedulerPlugins.push(e), _e.scheduler && e(_e.scheduler);
  }
  getSchedulerInstance(e) {
    for (var o = ca(this._extensionsManager), t = 0; t < this._schedulerPlugins.length; t++)
      this._schedulerPlugins[t](o);
    return o._internal_id = this._seed++, this.$syncFactory && this.$syncFactory(o), e && this._initFromConfig(o, e), o;
  }
  _initFromConfig(e, o) {
    if (o.plugins && e.plugins(o.plugins), o.config && e.mixin(e.config, o.config, !0), o.templates && e.attachEvent("onTemplatesReady", function() {
      e.mixin(e.templates, o.templates, !0);
    }, { once: !0 }), o.events)
      for (const t in o.events)
        e.attachEvent(t, o.events[t]);
    o.locale && e.i18n.setLocale(o.locale), Array.isArray(o.calendars) && o.calendars.forEach(function(t) {
      e.addCalendar(t);
    }), o.container ? e.init(o.container) : e.init(), o.data && (typeof o.data == "string" ? e.load(o.data) : e.parse(o.data));
  }
}(an), Re = Pe.getSchedulerInstance(), pt = { plugin: Re.bind(Pe.plugin, Pe) };
window.scheduler = Re, window.Scheduler = pt, window.$dhx || (window.$dhx = {}), window.$dhx.scheduler = Re, window.$dhx.Scheduler = pt;
export {
  pt as Scheduler,
  Re as default,
  Re as scheduler
};
//# sourceMappingURL=dhtmlxscheduler.es.js.map

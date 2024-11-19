/** @license

dhtmlxScheduler v.7.1.3 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
const oe = typeof window < "u" ? window : global;
function Nt(e) {
  let i = [], t = !1, r = null, d = null;
  function n() {
    return e.config.drag_highlight && e.markTimespan;
  }
  function s(o) {
    const l = e.getView(o);
    return l ? l.layout : o;
  }
  function _(o) {
    const { event: l, layout: h, viewName: m, sectionId: v, eventNode: u } = o;
    (function(p, g) {
      switch (g) {
        case "month":
          p.style.top = "", p.style.left = "";
          break;
        case "timeline":
          p.style.left = "", p.style.marginLeft = "1px";
          break;
        default:
          p.style.top = "";
      }
    })(u, h);
    const c = {};
    let f = { start_date: l.start_date, end_date: l.end_date, css: "dhx_scheduler_dnd_marker", html: u };
    return h != "timeline" && h != "month" || (f = { ...f, end_date: e.date.add(l.start_date, 1, "minute") }), v && (c[m] = v, f.sections = c), f;
  }
  function a(o) {
    const { layout: l } = o;
    let h;
    switch (l) {
      case "month":
        h = function(m) {
          let v = [];
          const { event: u, layout: c, viewName: f, sectionId: p } = m, g = [];
          let y = new Date(u.start_date);
          for (; y.valueOf() < u.end_date.valueOf(); ) {
            let b = { start_date: y };
            g.push(b), y = e.date.week_start(e.date.add(y, 1, "week"));
          }
          let x = e.$container.querySelectorAll(`[${e.config.event_attribute}='${u.id}']`);
          for (let b = 0; b < x.length; b++) {
            const k = { event: g[b], layout: c, viewName: f, sectionId: p, eventNode: x[b].cloneNode(!0) };
            v.push(_(k));
          }
          return v;
        }(o);
        break;
      case "timeline":
      case "units":
        h = function(m) {
          let v = [];
          const { event: u, layout: c, viewName: f, eventNode: p } = m;
          let g = function(y) {
            const x = e.getView(y);
            return x.y_property ? x.y_property : x.map_to ? x.map_to : void 0;
          }(f);
          if (g) {
            const y = String(u[g]).split(e.config.section_delimiter).map((b) => String(b)), x = [];
            for (let b = 0; b < y.length; b++) {
              x[b] = p.cloneNode(!0);
              const k = { event: u, layout: c, viewName: f, sectionId: y[b], eventNode: x[b] };
              v.push(_(k));
            }
          }
          return v;
        }(o);
        break;
      default:
        h = function(m) {
          const { event: v, layout: u, viewName: c, sectionId: f } = m;
          let p = [], g = e.$container.querySelectorAll(`[${e.config.event_attribute}='${v.id}']:not(.dhx_cal_select_menu):not(.dhx_drag_marker)`);
          if (g)
            for (let y = 0; y < g.length; y++) {
              let x = g[y].cloneNode(!0);
              const b = { event: { start_date: /* @__PURE__ */ new Date(+x.getAttribute("data-bar-start")), end_date: /* @__PURE__ */ new Date(+x.getAttribute("data-bar-end")) }, layout: u, viewName: c, sectionId: f, eventNode: x };
              p.push(_(b));
            }
          return p;
        }(o);
    }
    h.forEach((m) => {
      i.push(e.markTimespan(m));
    });
  }
  e.attachEvent("onBeforeDrag", function(o, l, h) {
    return n() && (t = !0, d = e.getEvent(o), r = h.target.closest(`[${e.config.event_attribute}]`), s(e.getState().mode) == "units" && e.config.cascade_event_display && (e.unselect(o), r = h.target.closest(`[${e.config.event_attribute}]`))), !0;
  }), e.attachEvent("onEventDrag", function(o, l, h) {
    if (t && n()) {
      t = !1;
      const m = e.getState().mode, v = s(m), u = e.getActionData(h).section;
      d && a({ event: d, layout: v, viewName: m, sectionId: u, eventNode: r });
    }
  }), e.attachEvent("onDragEnd", function(o, l, h) {
    for (let m = 0; m < i.length; m++)
      e.unmarkTimespan(i[m]);
    i = [], r = null, d = null;
  });
}
function Mt(e) {
  e.config.mark_now = !0, e.config.display_marked_timespans = !0, e.config.overwrite_marked_timespans = !0;
  var i = "dhx_time_block", t = "default", r = function(n, s, _) {
    var a = typeof n == "object" ? n : { days: n };
    return a.type = i, a.css = "", s && (_ && (a.sections = _), a = function(o, l, h) {
      return l instanceof Date && h instanceof Date ? (o.start_date = l, o.end_date = h) : (o.days = l, o.zones = h), o;
    }(a, n, s)), a;
  };
  function d(n, s, _, a, o) {
    var l = e, h = [], m = { _props: "map_to", matrix: "y_property" };
    for (var v in m) {
      var u = m[v];
      if (l[v])
        for (var c in l[v]) {
          var f = l[v][c][u];
          n[f] && (h = l._add_timespan_zones(h, e._get_blocked_zones(s[c], n[f], _, a, o)));
        }
    }
    return h = l._add_timespan_zones(h, e._get_blocked_zones(s, "global", _, a, o));
  }
  e.blockTime = function(n, s, _) {
    var a = r(n, s, _);
    return e.addMarkedTimespan(a);
  }, e.unblockTime = function(n, s, _) {
    var a = r(n, s = s || "fullday", _);
    return e.deleteMarkedTimespan(a);
  }, e.checkInMarkedTimespan = function(n, s, _) {
    s = s || t;
    for (var a = !0, o = new Date(n.start_date.valueOf()), l = e.date.add(o, 1, "day"), h = e._marked_timespans; o < n.end_date; o = e.date.date_part(l), l = e.date.add(o, 1, "day")) {
      var m = +e.date.date_part(new Date(o)), v = d(n, h, o.getDay(), m, s);
      if (v)
        for (var u = 0; u < v.length; u += 2) {
          var c = e._get_zone_minutes(o), f = n.end_date > l || n.end_date.getDate() != o.getDate() ? 1440 : e._get_zone_minutes(n.end_date), p = v[u], g = v[u + 1];
          if (p < f && g > c && !(a = typeof _ == "function" && _(n, c, f, p, g)))
            break;
        }
    }
    return !a;
  }, e.checkLimitViolation = function(n) {
    if (!n || !e.config.check_limits)
      return !0;
    var s = e, _ = s.config, a = [];
    if (n.rec_type && n._end_date || n.rrule) {
      const v = n._end_date || n.end_date;
      return !_.limit_start || !_.limit_end || v.valueOf() >= _.limit_start.valueOf() && n.start_date.valueOf() <= _.limit_end.valueOf();
    }
    a = [n];
    for (var o = !0, l = 0; l < a.length; l++) {
      var h = !0, m = a[l];
      m._timed = e.isOneDayEvent(m), (h = !_.limit_start || !_.limit_end || m.start_date.valueOf() >= _.limit_start.valueOf() && m.end_date.valueOf() <= _.limit_end.valueOf()) && (h = !e.checkInMarkedTimespan(m, i, function(v, u, c, f, p) {
        var g = !0;
        return u <= p && u >= f && ((p == 1440 || c <= p) && (g = !1), v._timed && s._drag_id && s._drag_mode == "new-size" ? (v.start_date.setHours(0), v.start_date.setMinutes(p)) : g = !1), (c >= f && c <= p || u < f && c > p) && (v._timed && s._drag_id && s._drag_mode == "new-size" ? (v.end_date.setHours(0), v.end_date.setMinutes(f)) : g = !1), g;
      })), h || (h = s.checkEvent("onLimitViolation") ? s.callEvent("onLimitViolation", [m.id, m]) : h), o = o && h;
    }
    return o || (s._drag_id = null, s._drag_mode = null), o;
  }, e._get_blocked_zones = function(n, s, _, a, o) {
    var l = [];
    if (n && n[s])
      for (var h = n[s], m = this._get_relevant_blocked_zones(_, a, h, o), v = 0; v < m.length; v++)
        l = this._add_timespan_zones(l, m[v].zones);
    return l;
  }, e._get_relevant_blocked_zones = function(n, s, _, a) {
    var o;
    return e.config.overwrite_marked_timespans ? o = _[s] && _[s][a] ? _[s][a] : _[n] && _[n][a] ? _[n][a] : [] : (o = [], _[s] && _[s][a] && (o = o.concat(_[s][a])), _[n] && _[n][a] && (o = o.concat(_[n][a]))), o;
  }, e._mark_now = function(n) {
    var s = "dhx_now_time";
    this._els[s] || (this._els[s] = []);
    var _ = e._currentDate(), a = this.config;
    if (e._remove_mark_now(), !n && a.mark_now && _ < this._max_date && _ > this._min_date && _.getHours() >= a.first_hour && _.getHours() < a.last_hour) {
      var o = this.locate_holder_day(_);
      this._els[s] = e._append_mark_now(o, _);
    }
  }, e._append_mark_now = function(n, s) {
    var _ = "dhx_now_time", a = e._get_zone_minutes(s), o = { zones: [a, a + 1], css: _, type: _ };
    if (!this._table_view) {
      if (this._props && this._props[this._mode]) {
        var l, h, m = this._props[this._mode], v = m.size || m.options.length;
        m.days > 1 ? (m.size && m.options.length && (n = (m.position + n) / m.options.length * m.size), l = n, h = n + v) : h = (l = 0) + v;
        for (var u = [], c = l; c < h; c++) {
          var f = c;
          o.days = f;
          var p = e._render_marked_timespan(o, null, f)[0];
          u.push(p);
        }
        return u;
      }
      return o.days = n, e._render_marked_timespan(o, null, n);
    }
    if (this._mode == "month")
      return o.days = +e.date.date_part(s), e._render_marked_timespan(o, null, null);
  }, e._remove_mark_now = function() {
    for (var n = "dhx_now_time", s = this._els[n], _ = 0; _ < s.length; _++) {
      var a = s[_], o = a.parentNode;
      o && o.removeChild(a);
    }
    this._els[n] = [];
  }, e._marked_timespans = { global: {} }, e._get_zone_minutes = function(n) {
    return 60 * n.getHours() + n.getMinutes();
  }, e._prepare_timespan_options = function(n) {
    var s = [], _ = [];
    if (n.days == "fullweek" && (n.days = [0, 1, 2, 3, 4, 5, 6]), n.days instanceof Array) {
      for (var a = n.days.slice(), o = 0; o < a.length; o++) {
        var l = e._lame_clone(n);
        l.days = a[o], s.push.apply(s, e._prepare_timespan_options(l));
      }
      return s;
    }
    if (!n || !(n.start_date && n.end_date && n.end_date > n.start_date || n.days !== void 0 && n.zones) && !n.type)
      return s;
    n.zones == "fullday" && (n.zones = [0, 1440]), n.zones && n.invert_zones && (n.zones = e.invertZones(n.zones)), n.id = e.uid(), n.css = n.css || "", n.type = n.type || t;
    var h = n.sections;
    if (h) {
      for (var m in h)
        if (h.hasOwnProperty(m)) {
          var v = h[m];
          for (v instanceof Array || (v = [v]), o = 0; o < v.length; o++)
            (x = e._lame_copy({}, n)).sections = {}, x.sections[m] = v[o], _.push(x);
        }
    } else
      _.push(n);
    for (var u = 0; u < _.length; u++) {
      var c = _[u], f = c.start_date, p = c.end_date;
      if (f && p)
        for (var g = e.date.date_part(new Date(f)), y = e.date.add(g, 1, "day"); g < p; ) {
          var x;
          delete (x = e._lame_copy({}, c)).start_date, delete x.end_date, x.days = g.valueOf();
          var b = f > g ? e._get_zone_minutes(f) : 0, k = p > y || p.getDate() != g.getDate() ? 1440 : e._get_zone_minutes(p);
          x.zones = [b, k], s.push(x), g = y, y = e.date.add(y, 1, "day");
        }
      else
        c.days instanceof Date && (c.days = e.date.date_part(c.days).valueOf()), c.zones = n.zones.slice(), s.push(c);
    }
    return s;
  }, e._get_dates_by_index = function(n, s, _) {
    var a = [];
    s = e.date.date_part(new Date(s || e._min_date)), _ = new Date(_ || e._max_date);
    for (var o = s.getDay(), l = n - o >= 0 ? n - o : 7 - s.getDay() + n, h = e.date.add(s, l, "day"); h < _; h = e.date.add(h, 1, "week"))
      a.push(h);
    return a;
  }, e._get_css_classes_by_config = function(n) {
    var s = [];
    return n.type == i && (s.push(i), n.css && s.push(i + "_reset")), s.push("dhx_marked_timespan", n.css), s.join(" ");
  }, e._get_block_by_config = function(n) {
    var s = document.createElement("div");
    return n.html && (typeof n.html == "string" ? s.innerHTML = n.html : s.appendChild(n.html)), s;
  }, e._render_marked_timespan = function(n, s, _) {
    var a = [], o = e.config, l = this._min_date, h = this._max_date, m = !1;
    if (!o.display_marked_timespans)
      return a;
    if (!_ && _ !== 0) {
      if (n.days < 7)
        _ = n.days;
      else {
        var v = new Date(n.days);
        if (m = +v, !(+h > +v && +l <= +v))
          return a;
        _ = v.getDay();
      }
      var u = l.getDay();
      u > _ ? _ = 7 - (u - _) : _ -= u;
    }
    var c = n.zones, f = e._get_css_classes_by_config(n);
    if (e._table_view && e._mode == "month") {
      var p = [], g = [];
      if (s)
        p.push(s), g.push(_);
      else {
        g = m ? [m] : e._get_dates_by_index(_);
        for (var y = 0; y < g.length; y++)
          p.push(this._scales[g[y]]);
      }
      for (y = 0; y < p.length; y++) {
        s = p[y], _ = g[y];
        var x = this.locate_holder_day(_, !1) % this._cols.length;
        if (!this._ignores[x]) {
          var b = e._get_block_by_config(n);
          b.className = f, b.style.top = "0px", b.style.height = "100%";
          for (var k = 0; k < c.length; k += 2) {
            var w = c[y];
            if ((N = c[y + 1]) <= w)
              return [];
            (M = b.cloneNode(!0)).style.left = "0px", M.style.width = "100%", s.appendChild(M), a.push(M);
          }
        }
      }
    } else {
      var D = _;
      if (this._ignores[this.locate_holder_day(_, !1)])
        return a;
      if (this._props && this._props[this._mode] && n.sections && n.sections[this._mode]) {
        var E = this._props[this._mode];
        D = E.order[n.sections[this._mode]];
        var S = E.order[n.sections[this._mode]];
        E.days > 1 ? D = D * (E.size || E.options.length) + S : (D = S, E.size && D > E.position + E.size && (D = 0));
      }
      for (s = s || e.locate_holder(D), y = 0; y < c.length; y += 2) {
        var N, M;
        if (w = Math.max(c[y], 60 * o.first_hour), (N = Math.min(c[y + 1], 60 * o.last_hour)) <= w) {
          if (y + 2 < c.length)
            continue;
          return [];
        }
        (M = e._get_block_by_config(n)).className = f;
        var T = 24 * this.config.hour_size_px + 1, A = 36e5;
        M.style.top = Math.round((60 * w * 1e3 - this.config.first_hour * A) * this.config.hour_size_px / A) % T + "px", M.style.height = Math.max(Math.round(60 * (N - w) * 1e3 * this.config.hour_size_px / A) % T, 1) + "px", s.appendChild(M), a.push(M);
      }
    }
    return a;
  }, e._mark_timespans = function() {
    var n = this._els.dhx_cal_data[0], s = [];
    if (e._table_view && e._mode == "month")
      for (var _ in this._scales) {
        var a = /* @__PURE__ */ new Date(+_);
        s.push.apply(s, e._on_scale_add_marker(this._scales[_], a));
      }
    else {
      a = new Date(e._min_date);
      for (var o = 0, l = n.childNodes.length; o < l; o++) {
        var h = n.childNodes[o];
        h.firstChild && e._getClassName(h.firstChild).indexOf("dhx_scale_hour") > -1 || (s.push.apply(s, e._on_scale_add_marker(h, a)), a = e.date.add(a, 1, "day"));
      }
    }
    return s;
  }, e.markTimespan = function(n) {
    if (!this._els)
      throw new Error("`scheduler.markTimespan` can't be used before scheduler initialization. Place `scheduler.markTimespan` call after `scheduler.init`.");
    var s = !1;
    this._els.dhx_cal_data || (e.get_elements(), s = !0);
    var _ = e._marked_timespans_ids, a = e._marked_timespans_types, o = e._marked_timespans;
    e.deleteMarkedTimespan(), e.addMarkedTimespan(n);
    var l = e._mark_timespans();
    return s && (e._els = []), e._marked_timespans_ids = _, e._marked_timespans_types = a, e._marked_timespans = o, l;
  }, e.unmarkTimespan = function(n) {
    if (n)
      for (var s = 0; s < n.length; s++) {
        var _ = n[s];
        _.parentNode && _.parentNode.removeChild(_);
      }
  }, e._addMarkerTimespanConfig = function(n) {
    var s = "global", _ = e._marked_timespans, a = n.id, o = e._marked_timespans_ids;
    o[a] || (o[a] = []);
    var l = n.days, h = n.sections, m = n.type;
    if (n.id = a, h) {
      for (var v in h)
        if (h.hasOwnProperty(v)) {
          _[v] || (_[v] = {});
          var u = h[v], c = _[v];
          c[u] || (c[u] = {}), c[u][l] || (c[u][l] = {}), c[u][l][m] || (c[u][l][m] = [], e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[m] || (e._marked_timespans_types[m] = !0));
          var f = c[u][l][m];
          n._array = f, f.push(n), o[a].push(n);
        }
    } else
      _[s][l] || (_[s][l] = {}), _[s][l][m] || (_[s][l][m] = []), e._marked_timespans_types || (e._marked_timespans_types = {}), e._marked_timespans_types[m] || (e._marked_timespans_types[m] = !0), f = _[s][l][m], n._array = f, f.push(n), o[a].push(n);
  }, e._marked_timespans_ids = {}, e.addMarkedTimespan = function(n) {
    var s = e._prepare_timespan_options(n);
    if (s.length) {
      for (var _ = s[0].id, a = 0; a < s.length; a++)
        e._addMarkerTimespanConfig(s[a]);
      return _;
    }
  }, e._add_timespan_zones = function(n, s) {
    var _ = n.slice();
    if (s = s.slice(), !_.length)
      return s;
    for (var a = 0; a < _.length; a += 2)
      for (var o = _[a], l = _[a + 1], h = a + 2 == _.length, m = 0; m < s.length; m += 2) {
        var v = s[m], u = s[m + 1];
        if (u > l && v <= l || v < o && u >= o)
          _[a] = Math.min(o, v), _[a + 1] = Math.max(l, u), a -= 2;
        else {
          if (!h)
            continue;
          var c = o > v ? 0 : 2;
          _.splice(a + c, 0, v, u);
        }
        s.splice(m--, 2);
        break;
      }
    return _;
  }, e._subtract_timespan_zones = function(n, s) {
    for (var _ = n.slice(), a = 0; a < _.length; a += 2)
      for (var o = _[a], l = _[a + 1], h = 0; h < s.length; h += 2) {
        var m = s[h], v = s[h + 1];
        if (v > o && m < l) {
          var u = !1;
          o >= m && l <= v && _.splice(a, 2), o < m && (_.splice(a, 2, o, m), u = !0), l > v && _.splice(u ? a + 2 : a, u ? 0 : 2, v, l), a -= 2;
          break;
        }
      }
    return _;
  }, e.invertZones = function(n) {
    return e._subtract_timespan_zones([0, 1440], n.slice());
  }, e._delete_marked_timespan_by_id = function(n) {
    var s = e._marked_timespans_ids[n];
    if (s) {
      for (var _ = 0; _ < s.length; _++)
        for (var a = s[_], o = a._array, l = 0; l < o.length; l++)
          if (o[l] == a) {
            o.splice(l, 1);
            break;
          }
    }
  }, e._delete_marked_timespan_by_config = function(n) {
    var s, _ = e._marked_timespans, a = n.sections, o = n.days, l = n.type || t;
    if (a) {
      for (var h in a)
        if (a.hasOwnProperty(h) && _[h]) {
          var m = a[h];
          _[h][m] && (s = _[h][m]);
        }
    } else
      s = _.global;
    if (s) {
      if (o !== void 0)
        s[o] && s[o][l] && (e._addMarkerTimespanConfig(n), e._delete_marked_timespans_list(s[o][l], n));
      else
        for (var v in s)
          if (s[v][l]) {
            var u = e._lame_clone(n);
            n.days = v, e._addMarkerTimespanConfig(u), e._delete_marked_timespans_list(s[v][l], n);
          }
    }
  }, e._delete_marked_timespans_list = function(n, s) {
    for (var _ = 0; _ < n.length; _++) {
      var a = n[_], o = e._subtract_timespan_zones(a.zones, s.zones);
      if (o.length)
        a.zones = o;
      else {
        n.splice(_, 1), _--;
        for (var l = e._marked_timespans_ids[a.id], h = 0; h < l.length; h++)
          if (l[h] == a) {
            l.splice(h, 1);
            break;
          }
      }
    }
  }, e.deleteMarkedTimespan = function(n) {
    if (arguments.length || (e._marked_timespans = { global: {} }, e._marked_timespans_ids = {}, e._marked_timespans_types = {}), typeof n != "object")
      e._delete_marked_timespan_by_id(n);
    else {
      n.start_date && n.end_date || (n.days !== void 0 || n.type || (n.days = "fullweek"), n.zones || (n.zones = "fullday"));
      var s = [];
      if (n.type)
        s.push(n.type);
      else
        for (var _ in e._marked_timespans_types)
          s.push(_);
      for (var a = e._prepare_timespan_options(n), o = 0; o < a.length; o++)
        for (var l = a[o], h = 0; h < s.length; h++) {
          var m = e._lame_clone(l);
          m.type = s[h], e._delete_marked_timespan_by_config(m);
        }
    }
  }, e._get_types_to_render = function(n, s) {
    var _ = n ? e._lame_copy({}, n) : {};
    for (var a in s || {})
      s.hasOwnProperty(a) && (_[a] = s[a]);
    return _;
  }, e._get_configs_to_render = function(n) {
    var s = [];
    for (var _ in n)
      n.hasOwnProperty(_) && s.push.apply(s, n[_]);
    return s;
  }, e._on_scale_add_marker = function(n, s) {
    if (!e._table_view || e._mode == "month") {
      var _ = s.getDay(), a = s.valueOf(), o = this._mode, l = e._marked_timespans, h = [], m = [];
      if (this._props && this._props[o]) {
        var v = this._props[o], u = v.options, c = u[e._get_unit_index(v, s)];
        if (v.days > 1) {
          var f = Math.round((s - e._min_date) / 864e5), p = v.size || u.length;
          s = e.date.add(e._min_date, Math.floor(f / p), "day"), s = e.date.date_part(s);
        } else
          s = e.date.date_part(new Date(this._date));
        if (_ = s.getDay(), a = s.valueOf(), l[o] && l[o][c.key]) {
          var g = l[o][c.key], y = e._get_types_to_render(g[_], g[a]);
          h.push.apply(h, e._get_configs_to_render(y));
        }
      }
      var x = l.global;
      if (e.config.overwrite_marked_timespans) {
        var b = x[a] || x[_];
        h.push.apply(h, e._get_configs_to_render(b));
      } else
        x[a] && h.push.apply(h, e._get_configs_to_render(x[a])), x[_] && h.push.apply(h, e._get_configs_to_render(x[_]));
      for (var k = 0; k < h.length; k++)
        m.push.apply(m, e._render_marked_timespan(h[k], n, s));
      return m;
    }
  }, e.attachEvent("onScaleAdd", function() {
    e._on_scale_add_marker.apply(e, arguments);
  }), e.dblclick_dhx_marked_timespan = function(n, s) {
    e.callEvent("onScaleDblClick", [e.getActionData(n).date, s, n]), e.config.dblclick_create && e.addEventNow(e.getActionData(n).date, null, n);
  };
}
function Tt(e) {
  var i = {}, t = !1;
  function r(a, o) {
    o = typeof o == "function" ? o : function() {
    }, i[a] || (i[a] = this[a], this[a] = o);
  }
  function d(a) {
    i[a] && (this[a] = i[a], i[a] = null);
  }
  function n(a) {
    for (var o in a)
      r.call(this, o, a[o]);
  }
  function s() {
    for (var a in i)
      d.call(this, a);
  }
  function _(a) {
    try {
      a();
    } catch (o) {
      window.console.error(o);
    }
  }
  return e.$stateProvider.registerProvider("batchUpdate", function() {
    return { batch_update: t };
  }, !1), function(a, o) {
    if (t)
      return void _(a);
    var l, h = this._dp && this._dp.updateMode != "off";
    h && (l = this._dp.updateMode, this._dp.setUpdateMode("off"));
    const m = { setModeDate: { date: null, mode: null }, needRender: !1, needUpdateView: !1, repaintEvents: {} }, v = (c, f) => {
      c && (m.setModeDate.date = c), f && (m.setModeDate.mode = f);
    };
    var u = { render: (c, f) => {
      m.needRender = !0, v(c, f);
    }, setCurrentView: (c, f) => {
      m.needRender = !0, v(c, f);
    }, updateView: (c, f) => {
      m.needUpdateView = !0, v(c, f);
    }, render_data: () => m.needRender = !0, render_view_data: (c) => {
      c && c.length ? c.forEach((f) => m.repaintEvents[f.id] = !0) : m.needRender = !0;
    } };
    if (n.call(this, u), t = !0, this.callEvent("onBeforeBatchUpdate", []), _(a), this.callEvent("onAfterBatchUpdate", []), s.call(this), t = !1, !o)
      if (m.needRender)
        e.render(m.setModeDate.date, m.setModeDate.mode);
      else if (m.needUpdateView)
        e.updateView(m.setModeDate.date, m.setModeDate.mode);
      else
        for (const c in m.repaintEvents)
          e.updateEvent(c);
    h && (this._dp.setUpdateMode(l), this._dp.sendData());
  };
}
function At(e) {
  (function(i) {
    i.attachEvent("onEventDeleted", function(t, r) {
      let d = i.copy(r);
      i.config.undo_deleted && !i.getState().new_event && i.message({ text: `<div class="dhx_info_message">
                            <span class="undo_popup_text">Event deleted</span>
                            <button class="undo_button" data-deleted-event-id="${r.id}">Undo</button>
                        </div>`, expire: 1e4, type: "popup_after_delete", callback: function(n) {
        n.target.closest(`[data-deleted-event-id="${r.id}"]`) && (i.addEvent(d), i.render());
      } });
    });
  })(e), Nt(e), Mt(e), function(i) {
    i.batchUpdate = Tt(i);
  }(e);
}
var Ct = Date.now();
function Me(e) {
  return !(!e || typeof e != "object") && !!(e.getFullYear && e.getMonth && e.getDate);
}
const ee = { uid: function() {
  return Ct++;
}, mixin: function(e, i, t) {
  for (var r in i)
    (e[r] === void 0 || t) && (e[r] = i[r]);
  return e;
}, copy: function e(i) {
  var t, r, d;
  if (i && typeof i == "object")
    switch (!0) {
      case Me(i):
        r = new Date(i);
        break;
      case (d = i, Array.isArray ? Array.isArray(d) : d && d.length !== void 0 && d.pop && d.push):
        for (r = new Array(i.length), t = 0; t < i.length; t++)
          r[t] = e(i[t]);
        break;
      case function(n) {
        return n && typeof n == "object" && Function.prototype.toString.call(n.constructor) === "function String() { [native code] }";
      }(i):
        r = new String(i);
        break;
      case function(n) {
        return n && typeof n == "object" && Function.prototype.toString.call(n.constructor) === "function Number() { [native code] }";
      }(i):
        r = new Number(i);
        break;
      case function(n) {
        return n && typeof n == "object" && Function.prototype.toString.call(n.constructor) === "function Boolean() { [native code] }";
      }(i):
        r = new Boolean(i);
        break;
      default:
        for (t in r = {}, i) {
          const n = typeof i[t];
          n === "string" || n === "number" || n === "boolean" ? r[t] = i[t] : Me(i[t]) ? r[t] = new Date(i[t]) : Object.prototype.hasOwnProperty.apply(i, [t]) && (r[t] = e(i[t]));
        }
    }
  return r || i;
}, defined: function(e) {
  return e !== void 0;
}, isDate: Me, delay: function(e, i) {
  var t, r = function() {
    r.$cancelTimeout(), r.$pending = !0;
    var d = Array.prototype.slice.call(arguments);
    t = setTimeout(function() {
      e.apply(this, d), r.$pending = !1;
    }, i);
  };
  return r.$pending = !1, r.$cancelTimeout = function() {
    clearTimeout(t), r.$pending = !1;
  }, r.$execute = function() {
    var d = Array.prototype.slice.call(arguments);
    e.apply(this, d), r.$cancelTimeout();
  }, r;
} };
function Ot(e) {
  function i(_) {
    var a = document.createElement("div");
    return (_ || "").split(" ").forEach(function(o) {
      a.classList.add(o);
    }), a;
  }
  var t = { rows_container: function() {
    return i("dhx_cal_navbar_rows_container");
  }, row: function() {
    return i("dhx_cal_navbar_row");
  }, view: function(_) {
    var a = i("dhx_cal_tab");
    return a.setAttribute("name", _.view + "_tab"), a.setAttribute("data-tab", _.view), e.config.fix_tab_position && (_.$firstTab ? a.classList.add("dhx_cal_tab_first") : _.$lastTab ? a.classList.add("dhx_cal_tab_last") : _.view !== "week" && a.classList.add("dhx_cal_tab_standalone"), _.$segmentedTab && a.classList.add("dhx_cal_tab_segmented")), a;
  }, date: function() {
    return i("dhx_cal_date");
  }, button: function(_) {
    return i("dhx_cal_nav_button dhx_cal_nav_button_custom dhx_cal_tab");
  }, builtInButton: function(_) {
    return i("dhx_cal_" + _.view + "_button dhx_cal_nav_button");
  }, spacer: function() {
    return i("dhx_cal_line_spacer");
  }, minicalendarButton: function(_) {
    var a = i("dhx_minical_icon");
    return _.click || a.$_eventAttached || e.event(a, "click", function() {
      e.isCalendarVisible() ? e.destroyCalendar() : e.renderCalendar({ position: this, date: e.getState().date, navigation: !0, handler: function(o, l) {
        e.setCurrentView(o), e.destroyCalendar();
      } });
    }), a;
  }, html_element: function(_) {
    return i("dhx_cal_nav_content");
  } };
  function r(_) {
    var a = function(h) {
      var m;
      if (h.view)
        switch (h.view) {
          case "today":
          case "next":
          case "prev":
            m = t.builtInButton;
            break;
          case "date":
            m = t.date;
            break;
          case "spacer":
            m = t.spacer;
            break;
          case "button":
            m = t.button;
            break;
          case "minicalendar":
            m = t.minicalendarButton;
            break;
          default:
            m = t.view;
        }
      else
        h.rows ? m = t.rows_container : h.cols && (m = t.row);
      return m;
    }(_);
    if (a) {
      var o = a(_);
      if (_.css && o.classList.add(_.css), _.width && ((l = _.width) === 1 * l && (l += "px"), o.style.width = l), _.height && ((l = _.height) === 1 * l && (l += "px"), o.style.height = l), _.click && e.event(o, "click", _.click), _.html && (o.innerHTML = _.html), _.align) {
        var l = "";
        _.align == "right" ? l = "flex-end" : _.align == "left" && (l = "flex-start"), o.style.justifyContent = l;
      }
      return o;
    }
  }
  function d(_) {
    return typeof _ == "string" && (_ = { view: _ }), _.view || _.rows || _.cols || (_.view = "button"), _;
  }
  function n(_) {
    var a, o = document.createDocumentFragment();
    a = Array.isArray(_) ? _ : [_];
    for (var l = 0; l < a.length; l++) {
      var h, m = d(a[l]);
      m.view === "day" && a[l + 1] && ((h = d(a[l + 1])).view !== "week" && h.view !== "month" || (m.$firstTab = !0, m.$segmentedTab = !0)), m.view === "week" && a[l - 1] && ((h = d(a[l + 1])).view !== "week" && h.view !== "month" || (m.$segmentedTab = !0)), m.view === "month" && a[l - 1] && ((h = d(a[l - 1])).view !== "week" && h.view !== "day" || (m.$lastTab = !0, m.$segmentedTab = !0));
      var v = r(m);
      o.appendChild(v), (m.cols || m.rows) && v.appendChild(n(m.cols || m.rows));
    }
    return o;
  }
  e._init_nav_bar = function(_) {
    var a = this.$container.querySelector(".dhx_cal_navline");
    return a || ((a = document.createElement("div")).className = "dhx_cal_navline dhx_cal_navline_flex", e._update_nav_bar(_, a), a);
  };
  var s = null;
  e._update_nav_bar = function(_, a) {
    if (_) {
      var o = !1, l = _.height || e.xy.nav_height;
      s !== null && s === l || (o = !0), o && (e.xy.nav_height = l), a.innerHTML = "", a.appendChild(n(_)), e.unset_actions(), e._els = [], e.get_elements(), e.set_actions(), a.style.display = l === 0 ? "none" : "", s = l;
    }
  };
}
function Lt(e) {
  function i(n) {
    for (var s = document.body; n && n != s; )
      n = n.parentNode;
    return s == n;
  }
  function t(n) {
    return { w: n.innerWidth || document.documentElement.clientWidth, h: n.innerHeight || document.documentElement.clientHeight };
  }
  function r(n, s) {
    var _, a = t(s);
    n.event(s, "resize", function() {
      clearTimeout(_), _ = setTimeout(function() {
        if (i(n.$container) && !n.$destroyed) {
          var o, l, h = t(s);
          l = h, ((o = a).w != l.w || o.h != l.h) && (a = h, d(n));
        }
      }, 150);
    });
  }
  function d(n) {
    !n.$destroyed && n.$root && i(n.$root) && n.callEvent("onSchedulerResize", []) && (n.updateView(), n.callEvent("onAfterSchedulerResize", []));
  }
  (function(n) {
    var s = n.$container;
    window.getComputedStyle(s).getPropertyValue("position") == "static" && (s.style.position = "relative");
    var _ = document.createElement("iframe");
    _.className = "scheduler_container_resize_watcher", _.tabIndex = -1, n.config.wai_aria_attributes && (_.setAttribute("role", "none"), _.setAttribute("aria-hidden", !0)), window.Sfdc || window.$A || window.Aura ? function(a) {
      var o = a.$root.offsetHeight, l = a.$root.offsetWidth;
      (function h() {
        a.$destroyed || (a.$root && (a.$root.offsetHeight == o && a.$root.offsetWidth == l || d(a), o = a.$root.offsetHeight, l = a.$root.offsetWidth), setTimeout(h, 200));
      })();
    }(n) : (s.appendChild(_), _.contentWindow ? r(n, _.contentWindow) : (s.removeChild(_), r(n, window)));
  })(e);
}
class Ht {
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
const $t = function(e) {
  let i = {}, t = 0;
  const r = function() {
    let d = !0;
    for (const n in i) {
      const s = i[n].apply(e, arguments);
      d = d && s;
    }
    return d;
  };
  return r.addEvent = function(d, n) {
    if (typeof d == "function") {
      let s;
      if (n && n.id ? s = n.id : (s = t, t++), n && n.once) {
        const _ = d;
        d = function() {
          _(), r.removeEvent(s);
        };
      }
      return i[s] = d, s;
    }
    return !1;
  }, r.removeEvent = function(d) {
    delete i[d];
  }, r.clear = function() {
    i = {};
  }, r;
};
function Ue(e) {
  const i = new Ht();
  e.attachEvent = function(t, r, d) {
    t = "ev_" + t.toLowerCase(), i.listeners[t] || (i.listeners[t] = $t(this)), d && d.thisObject && (r = r.bind(d.thisObject));
    let n = t + ":" + i.listeners[t].addEvent(r, d);
    return d && d.id && (n = d.id), n;
  }, e.attachAll = function(t) {
    this.attachEvent("listen_all", t);
  }, e.callEvent = function(t, r) {
    if (i._silent_mode)
      return !0;
    const d = "ev_" + t.toLowerCase(), n = i.listeners;
    return n.ev_listen_all && n.ev_listen_all.apply(this, [t].concat(r)), !n[d] || n[d].apply(this, r);
  }, e.checkEvent = function(t) {
    return !!i.listeners["ev_" + t.toLowerCase()];
  }, e.detachEvent = function(t) {
    if (t) {
      let r = i.listeners;
      for (const n in r)
        r[n].removeEvent(t);
      const d = t.split(":");
      if (r = i.listeners, d.length === 2) {
        const n = d[0], s = d[1];
        r[n] && r[n].removeEvent(s);
      }
    }
  }, e.detachAllEvents = function() {
    for (const t in i.listeners)
      i.listeners[t].clear();
  };
}
const We = { event: function(e, i, t) {
  e.addEventListener ? e.addEventListener(i, t, !1) : e.attachEvent && e.attachEvent("on" + i, t);
}, eventRemove: function(e, i, t) {
  e.removeEventListener ? e.removeEventListener(i, t, !1) : e.detachEvent && e.detachEvent("on" + i, t);
} };
function zt(e) {
  var i = function() {
    var t = function(r, d) {
      r = r || We.event, d = d || We.eventRemove;
      var n = [], s = { attach: function(_, a, o, l) {
        n.push({ element: _, event: a, callback: o, capture: l }), r(_, a, o, l);
      }, detach: function(_, a, o, l) {
        d(_, a, o, l);
        for (var h = 0; h < n.length; h++) {
          var m = n[h];
          m.element === _ && m.event === a && m.callback === o && m.capture === l && (n.splice(h, 1), h--);
        }
      }, detachAll: function() {
        for (var _ = n.slice(), a = 0; a < _.length; a++) {
          var o = _[a];
          s.detach(o.element, o.event, o.callback, o.capture), s.detach(o.element, o.event, o.callback, void 0), s.detach(o.element, o.event, o.callback, !1), s.detach(o.element, o.event, o.callback, !0);
        }
        n.splice(0, n.length);
      }, extend: function() {
        return t(this.event, this.eventRemove);
      } };
      return s;
    };
    return t();
  }();
  e.event = i.attach, e.eventRemove = i.detach, e._eventRemoveAll = i.detachAll, e._createDomEventScope = i.extend, e._trim = function(t) {
    return (String.prototype.trim || function() {
      return this.replace(/^\s+|\s+$/g, "");
    }).apply(t);
  }, e._isDate = function(t) {
    return !(!t || typeof t != "object") && !!(t.getFullYear && t.getMonth && t.getDate);
  }, e._isObject = function(t) {
    return t && typeof t == "object";
  };
}
function ut(e) {
  if (!e)
    return "";
  var i = e.className || "";
  return i.baseVal && (i = i.baseVal), i.indexOf || (i = ""), i || "";
}
function ft(e, i, t) {
  t === void 0 && (t = !0);
  for (var r = e.target || e.srcElement, d = ""; r; ) {
    if (d = ut(r)) {
      var n = d.indexOf(i);
      if (n >= 0) {
        if (!t)
          return r;
        var s = n === 0 || !(d.charAt(n - 1) || "").trim(), _ = n + i.length >= d.length || !d.charAt(n + i.length).trim();
        if (s && _)
          return r;
      }
    }
    r = r.parentNode;
  }
  return null;
}
function qt(e) {
  var i = !1, t = !1;
  if (window.getComputedStyle) {
    var r = window.getComputedStyle(e, null);
    i = r.display, t = r.visibility;
  } else
    e.currentStyle && (i = e.currentStyle.display, t = e.currentStyle.visibility);
  var d = !1, n = ft({ target: e }, "dhx_form_repeat", !1);
  return n && (d = n.style.height == "0px"), d = d || !e.offsetHeight, i != "none" && t != "hidden" && !d;
}
function jt(e) {
  return !isNaN(e.getAttribute("tabindex")) && 1 * e.getAttribute("tabindex") >= 0;
}
function It(e) {
  return !{ a: !0, area: !0 }[e.nodeName.loLowerCase()] || !!e.getAttribute("href");
}
function Pt(e) {
  return !{ input: !0, select: !0, textarea: !0, button: !0, object: !0 }[e.nodeName.toLowerCase()] || !e.hasAttribute("disabled");
}
function pt() {
  return document.head.createShadowRoot || document.head.attachShadow;
}
function Ke(e) {
  if (!e || !pt())
    return document.body;
  for (; e.parentNode && (e = e.parentNode); )
    if (e instanceof ShadowRoot)
      return e.host;
  return document.body;
}
const _e = { getAbsoluteLeft: function(e) {
  return this.getOffset(e).left;
}, getAbsoluteTop: function(e) {
  return this.getOffset(e).top;
}, getOffsetSum: function(e) {
  for (var i = 0, t = 0; e; )
    i += parseInt(e.offsetTop), t += parseInt(e.offsetLeft), e = e.offsetParent;
  return { top: i, left: t };
}, getOffsetRect: function(e) {
  var i = e.getBoundingClientRect(), t = 0, r = 0;
  if (/Mobi/.test(navigator.userAgent)) {
    var d = document.createElement("div");
    d.style.position = "absolute", d.style.left = "0px", d.style.top = "0px", d.style.width = "1px", d.style.height = "1px", document.body.appendChild(d);
    var n = d.getBoundingClientRect();
    t = i.top - n.top, r = i.left - n.left, d.parentNode.removeChild(d);
  } else {
    var s = document.body, _ = document.documentElement, a = window.pageYOffset || _.scrollTop || s.scrollTop, o = window.pageXOffset || _.scrollLeft || s.scrollLeft, l = _.clientTop || s.clientTop || 0, h = _.clientLeft || s.clientLeft || 0;
    t = i.top + a - l, r = i.left + o - h;
  }
  return { top: Math.round(t), left: Math.round(r) };
}, getOffset: function(e) {
  return e.getBoundingClientRect ? this.getOffsetRect(e) : this.getOffsetSum(e);
}, closest: function(e, i) {
  return e && i ? Le(e, i) : null;
}, insertAfter: function(e, i) {
  i.nextSibling ? i.parentNode.insertBefore(e, i.nextSibling) : i.parentNode.appendChild(e);
}, remove: function(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}, isChildOf: function(e, i) {
  return i.contains(e);
}, getFocusableNodes: function(e) {
  for (var i = e.querySelectorAll(["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"].join(", ")), t = Array.prototype.slice.call(i, 0), r = 0; r < t.length; r++)
    t[r].$position = r;
  for (t.sort(function(n, s) {
    return n.tabIndex === 0 && s.tabIndex !== 0 ? 1 : n.tabIndex !== 0 && s.tabIndex === 0 ? -1 : n.tabIndex === s.tabIndex ? n.$position - s.$position : n.tabIndex < s.tabIndex ? -1 : 1;
  }), r = 0; r < t.length; r++) {
    var d = t[r];
    (jt(d) || Pt(d) || It(d)) && qt(d) || (t.splice(r, 1), r--);
  }
  return t;
}, getClassName: ut, locateCss: ft, getRootNode: Ke, hasShadowParent: function(e) {
  return !!Ke(e);
}, isShadowDomSupported: pt, getActiveElement: function() {
  var e = document.activeElement;
  return e.shadowRoot && (e = e.shadowRoot.activeElement), e === document.body && document.getSelection && (e = document.getSelection().focusNode || document.body), e;
}, getRelativeEventPosition: function(e, i) {
  var t = document.documentElement, r = function(d) {
    var n = 0, s = 0, _ = 0, a = 0;
    if (d.getBoundingClientRect) {
      var o = d.getBoundingClientRect(), l = document.body, h = document.documentElement || document.body.parentNode || document.body, m = window.pageYOffset || h.scrollTop || l.scrollTop, v = window.pageXOffset || h.scrollLeft || l.scrollLeft, u = h.clientTop || l.clientTop || 0, c = h.clientLeft || l.clientLeft || 0;
      n = o.top + m - u, s = o.left + v - c, _ = document.body.offsetWidth - o.right, a = document.body.offsetHeight - o.bottom;
    } else {
      for (; d; )
        n += parseInt(d.offsetTop, 10), s += parseInt(d.offsetLeft, 10), d = d.offsetParent;
      _ = document.body.offsetWidth - d.offsetWidth - s, a = document.body.offsetHeight - d.offsetHeight - n;
    }
    return { y: Math.round(n), x: Math.round(s), width: d.offsetWidth, height: d.offsetHeight, right: Math.round(_), bottom: Math.round(a) };
  }(i);
  return { x: e.clientX - t.clientLeft - r.x + i.scrollLeft, y: e.clientY - t.clientTop - r.y + i.scrollTop };
}, getTargetNode: function(e) {
  var i;
  return e.tagName ? i = e : (i = (e = e || window.event).target || e.srcElement).shadowRoot && e.composedPath && (i = e.composedPath()[0]), i;
}, getNodePosition: function(e) {
  var i = 0, t = 0, r = 0, d = 0;
  if (e.getBoundingClientRect) {
    var n = e.getBoundingClientRect(), s = document.body, _ = document.documentElement || document.body.parentNode || document.body, a = window.pageYOffset || _.scrollTop || s.scrollTop, o = window.pageXOffset || _.scrollLeft || s.scrollLeft, l = _.clientTop || s.clientTop || 0, h = _.clientLeft || s.clientLeft || 0;
    i = n.top + a - l, t = n.left + o - h, r = document.body.offsetWidth - n.right, d = document.body.offsetHeight - n.bottom;
  } else {
    for (; e; )
      i += parseInt(e.offsetTop, 10), t += parseInt(e.offsetLeft, 10), e = e.offsetParent;
    r = document.body.offsetWidth - e.offsetWidth - t, d = document.body.offsetHeight - e.offsetHeight - i;
  }
  return { y: Math.round(i), x: Math.round(t), width: e.offsetWidth, height: e.offsetHeight, right: Math.round(r), bottom: Math.round(d) };
} };
var Le;
if (Element.prototype.closest)
  Le = function(e, i) {
    return e.closest(i);
  };
else {
  var Rt = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  Le = function(e, i) {
    var t = e;
    do {
      if (Rt.call(t, i))
        return t;
      t = t.parentElement || t.parentNode;
    } while (t !== null && t.nodeType === 1);
    return null;
  };
}
var se = typeof window < "u";
const Yt = { isIE: se && (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0), isOpera: se && navigator.userAgent.indexOf("Opera") >= 0, isChrome: se && navigator.userAgent.indexOf("Chrome") >= 0, isKHTML: se && (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0), isFF: se && navigator.userAgent.indexOf("Firefox") >= 0, isIPad: se && navigator.userAgent.search(/iPad/gi) >= 0, isEdge: se && navigator.userAgent.indexOf("Edge") != -1, isNode: !se || typeof navigator > "u" };
function Te(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  var i = "";
  for (var t in e) {
    var r = "";
    e.hasOwnProperty(t) && (r = t + "=" + (r = typeof e[t] == "string" ? encodeURIComponent(e[t]) : typeof e[t] == "number" ? e[t] : encodeURIComponent(JSON.stringify(e[t]))), i.length && (r = "&" + r), i += r);
  }
  return i;
}
function Ut(e) {
  var i = function(n, s) {
    for (var _ = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);", a = n.match(/%[a-zA-Z]/g), o = 0; o < a.length; o++)
      switch (a[o]) {
        case "%j":
        case "%d":
          _ += "set[2]=temp[" + o + "]||1;";
          break;
        case "%n":
        case "%m":
          _ += "set[1]=(temp[" + o + "]||1)-1;";
          break;
        case "%y":
          _ += "set[0]=temp[" + o + "]*1+(temp[" + o + "]>50?1900:2000);";
          break;
        case "%g":
        case "%G":
        case "%h":
        case "%H":
          _ += "set[3]=temp[" + o + "]||0;";
          break;
        case "%i":
          _ += "set[4]=temp[" + o + "]||0;";
          break;
        case "%Y":
          _ += "set[0]=temp[" + o + "]||0;";
          break;
        case "%a":
        case "%A":
          _ += "set[3]=set[3]%12+((temp[" + o + "]||'').toLowerCase()=='am'?0:12);";
          break;
        case "%s":
          _ += "set[5]=temp[" + o + "]||0;";
          break;
        case "%M":
          _ += "set[1]=this.locale.date.month_short_hash[temp[" + o + "]]||0;";
          break;
        case "%F":
          _ += "set[1]=this.locale.date.month_full_hash[temp[" + o + "]]||0;";
      }
    var l = "set[0],set[1],set[2],set[3],set[4],set[5]";
    return s && (l = " Date.UTC(" + l + ")"), new Function("date", "var set=[0,0,1,0,0,0]; " + _ + " return new Date(" + l + ");");
  }, t = function(n, s) {
    const _ = n.match(/%[a-zA-Z]/g);
    return function(a) {
      for (var o = [0, 0, 1, 0, 0, 0], l = a.match(/[a-zA-Z]+|[0-9]+/g), h = 0; h < _.length; h++)
        switch (_[h]) {
          case "%j":
          case "%d":
            o[2] = l[h] || 1;
            break;
          case "%n":
          case "%m":
            o[1] = (l[h] || 1) - 1;
            break;
          case "%y":
            o[0] = 1 * l[h] + (l[h] > 50 ? 1900 : 2e3);
            break;
          case "%g":
          case "%G":
          case "%h":
          case "%H":
            o[3] = l[h] || 0;
            break;
          case "%i":
            o[4] = l[h] || 0;
            break;
          case "%Y":
            o[0] = l[h] || 0;
            break;
          case "%a":
          case "%A":
            o[3] = o[3] % 12 + ((l[h] || "").toLowerCase() == "am" ? 0 : 12);
            break;
          case "%s":
            o[5] = l[h] || 0;
            break;
          case "%M":
            o[1] = e.locale.date.month_short_hash[l[h]] || 0;
            break;
          case "%F":
            o[1] = e.locale.date.month_full_hash[l[h]] || 0;
        }
      return s ? new Date(Date.UTC(o[0], o[1], o[2], o[3], o[4], o[5])) : new Date(o[0], o[1], o[2], o[3], o[4], o[5]);
    };
  };
  let r;
  function d() {
    var n = !1;
    return e.config.csp === "auto" ? (r === void 0 && (r = function() {
      try {
        new Function("cspEnabled = false;"), r = !1;
      } catch {
        r = !0;
      }
      return r;
    }()), n = r) : n = e.config.csp, n;
  }
  e.date = { init: function() {
    for (var n = e.locale.date.month_short, s = e.locale.date.month_short_hash = {}, _ = 0; _ < n.length; _++)
      s[n[_]] = _;
    for (n = e.locale.date.month_full, s = e.locale.date.month_full_hash = {}, _ = 0; _ < n.length; _++)
      s[n[_]] = _;
  }, date_part: function(n) {
    var s = new Date(n);
    return n.setHours(0), n.setMinutes(0), n.setSeconds(0), n.setMilliseconds(0), n.getHours() && (n.getDate() < s.getDate() || n.getMonth() < s.getMonth() || n.getFullYear() < s.getFullYear()) && n.setTime(n.getTime() + 36e5 * (24 - n.getHours())), n;
  }, time_part: function(n) {
    return (n.valueOf() / 1e3 - 60 * n.getTimezoneOffset()) % 86400;
  }, week_start: function(n) {
    var s = n.getDay();
    return e.config.start_on_monday && (s === 0 ? s = 6 : s--), this.date_part(this.add(n, -1 * s, "day"));
  }, month_start: function(n) {
    return n.setDate(1), this.date_part(n);
  }, year_start: function(n) {
    return n.setMonth(0), this.month_start(n);
  }, day_start: function(n) {
    return this.date_part(n);
  }, _add_days: function(n, s) {
    var _ = new Date(n.valueOf());
    if (_.setDate(_.getDate() + s), s == Math.round(s) && s > 0) {
      var a = (+_ - +n) % 864e5;
      if (a && n.getTimezoneOffset() == _.getTimezoneOffset()) {
        var o = a / 36e5;
        _.setTime(_.getTime() + 60 * (24 - o) * 60 * 1e3);
      }
    }
    return s >= 0 && !n.getHours() && _.getHours() && (_.getDate() < n.getDate() || _.getMonth() < n.getMonth() || _.getFullYear() < n.getFullYear()) && _.setTime(_.getTime() + 36e5 * (24 - _.getHours())), _;
  }, add: function(n, s, _) {
    var a = new Date(n.valueOf());
    switch (_) {
      case "day":
        a = e.date._add_days(a, s);
        break;
      case "week":
        a = e.date._add_days(a, 7 * s);
        break;
      case "month":
        a.setMonth(a.getMonth() + s);
        break;
      case "year":
        a.setYear(a.getFullYear() + s);
        break;
      case "hour":
        a.setTime(a.getTime() + 60 * s * 60 * 1e3);
        break;
      case "minute":
        a.setTime(a.getTime() + 60 * s * 1e3);
        break;
      default:
        return e.date["add_" + _](n, s, _);
    }
    return a;
  }, to_fixed: function(n) {
    return n < 10 ? "0" + n : n;
  }, copy: function(n) {
    return new Date(n.valueOf());
  }, date_to_str: function(n, s) {
    return d() ? function(_, a) {
      return function(o) {
        return _.replace(/%[a-zA-Z]/g, function(l) {
          switch (l) {
            case "%d":
              return a ? e.date.to_fixed(o.getUTCDate()) : e.date.to_fixed(o.getDate());
            case "%m":
              return a ? e.date.to_fixed(o.getUTCMonth() + 1) : e.date.to_fixed(o.getMonth() + 1);
            case "%j":
              return a ? o.getUTCDate() : o.getDate();
            case "%n":
              return a ? o.getUTCMonth() + 1 : o.getMonth() + 1;
            case "%y":
              return a ? e.date.to_fixed(o.getUTCFullYear() % 100) : e.date.to_fixed(o.getFullYear() % 100);
            case "%Y":
              return a ? o.getUTCFullYear() : o.getFullYear();
            case "%D":
              return a ? e.locale.date.day_short[o.getUTCDay()] : e.locale.date.day_short[o.getDay()];
            case "%l":
              return a ? e.locale.date.day_full[o.getUTCDay()] : e.locale.date.day_full[o.getDay()];
            case "%M":
              return a ? e.locale.date.month_short[o.getUTCMonth()] : e.locale.date.month_short[o.getMonth()];
            case "%F":
              return a ? e.locale.date.month_full[o.getUTCMonth()] : e.locale.date.month_full[o.getMonth()];
            case "%h":
              return a ? e.date.to_fixed((o.getUTCHours() + 11) % 12 + 1) : e.date.to_fixed((o.getHours() + 11) % 12 + 1);
            case "%g":
              return a ? (o.getUTCHours() + 11) % 12 + 1 : (o.getHours() + 11) % 12 + 1;
            case "%G":
              return a ? o.getUTCHours() : o.getHours();
            case "%H":
              return a ? e.date.to_fixed(o.getUTCHours()) : e.date.to_fixed(o.getHours());
            case "%i":
              return a ? e.date.to_fixed(o.getUTCMinutes()) : e.date.to_fixed(o.getMinutes());
            case "%a":
              return a ? o.getUTCHours() > 11 ? "pm" : "am" : o.getHours() > 11 ? "pm" : "am";
            case "%A":
              return a ? o.getUTCHours() > 11 ? "PM" : "AM" : o.getHours() > 11 ? "PM" : "AM";
            case "%s":
              return a ? e.date.to_fixed(o.getUTCSeconds()) : e.date.to_fixed(o.getSeconds());
            case "%W":
              return a ? e.date.to_fixed(e.date.getUTCISOWeek(o)) : e.date.to_fixed(e.date.getISOWeek(o));
            default:
              return l;
          }
        });
      };
    }(n, s) : (n = n.replace(/%[a-zA-Z]/g, function(_) {
      switch (_) {
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
          return _;
      }
    }), s && (n = n.replace(/date\.get/g, "date.getUTC")), new Function("date", 'return "' + n + '";').bind(e));
  }, str_to_date: function(n, s, _) {
    var a = d() ? t : i, o = a(n, s), l = /^[0-9]{4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/, h = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4} ?(([0-9]{1,2}:[0-9]{2})(:[0-9]{1,2})?)?$/, m = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/, v = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/, u = a("%Y-%m-%d %H:%i:%s", s), c = a("%m/%d/%Y %H:%i:%s", s), f = a("%d-%m-%Y %H:%i:%s", s);
    return function(p) {
      if (!_ && !e.config.parse_exact_format) {
        if (p && p.getISOWeek)
          return new Date(p);
        if (typeof p == "number")
          return new Date(p);
        if (g = p, l.test(String(g)))
          return u(p);
        if (function(y) {
          return h.test(String(y));
        }(p))
          return c(p);
        if (function(y) {
          return m.test(String(y));
        }(p))
          return f(p);
        if (function(y) {
          return v.test(y);
        }(p))
          return new Date(p);
      }
      var g;
      return o.call(e, p);
    };
  }, getISOWeek: function(n) {
    if (!n)
      return !1;
    var s = (n = this.date_part(new Date(n))).getDay();
    s === 0 && (s = 7);
    var _ = new Date(n.valueOf());
    _.setDate(n.getDate() + (4 - s));
    var a = _.getFullYear(), o = Math.round((_.getTime() - new Date(a, 0, 1).getTime()) / 864e5);
    return 1 + Math.floor(o / 7);
  }, getUTCISOWeek: function(n) {
    return this.getISOWeek(this.convert_to_utc(n));
  }, convert_to_utc: function(n) {
    return new Date(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds());
  } };
}
function mt(e) {
  return (function() {
    var i = {};
    for (var t in this._events) {
      var r = this._events[t];
      r.id.toString().indexOf("#") == -1 && (i[r.id] = r);
    }
    return i;
  }).bind(e);
}
function Vt(e) {
  e._loaded = {}, e._load = function(t, r) {
    if (t = t || this._load_url) {
      var d;
      if (t += (t.indexOf("?") == -1 ? "?" : "&") + "timeshift=" + (/* @__PURE__ */ new Date()).getTimezoneOffset(), this.config.prevent_cache && (t += "&uid=" + this.uid()), r = r || this._date, this._load_mode) {
        var n = this.templates.load_format;
        for (r = this.date[this._load_mode + "_start"](new Date(r.valueOf())); r > this._min_date; )
          r = this.date.add(r, -1, this._load_mode);
        d = r;
        for (var s = !0; d < this._max_date; )
          d = this.date.add(d, 1, this._load_mode), this._loaded[n(r)] && s ? r = this.date.add(r, 1, this._load_mode) : s = !1;
        var _ = d;
        do
          d = _, _ = this.date.add(d, -1, this._load_mode);
        while (_ > r && this._loaded[n(_)]);
        if (d <= r)
          return !1;
        for (e.ajax.get(t + "&from=" + n(r) + "&to=" + n(d), a); r < d; )
          this._loaded[n(r)] = !0, r = this.date.add(r, 1, this._load_mode);
      } else
        e.ajax.get(t, a);
      return this.callEvent("onXLS", []), this.callEvent("onLoadStart", []), !0;
    }
    function a(o) {
      e.on_load(o), e.callEvent("onLoadEnd", []);
    }
  }, e._parsers = {}, function(t) {
    t._parsers.xml = { canParse: function(r, d) {
      if (d.responseXML && d.responseXML.firstChild)
        return !0;
      try {
        var n = t.ajax.parse(d.responseText), s = t.ajax.xmltop("data", n);
        if (s && s.tagName === "data")
          return !0;
      } catch {
      }
      return !1;
    }, parse: function(r) {
      var d;
      if (r.xmlDoc.responseXML || (r.xmlDoc.responseXML = t.ajax.parse(r.xmlDoc.responseText)), (d = t.ajax.xmltop("data", r.xmlDoc)).tagName != "data")
        return null;
      var n = d.getAttribute("dhx_security");
      n && (window.dhtmlx && (window.dhtmlx.security_key = n), t.security_key = n);
      for (var s = t.ajax.xpath("//coll_options", r.xmlDoc), _ = 0; _ < s.length; _++) {
        var a = s[_].getAttribute("for"), o = t.serverList[a];
        o || (t.serverList[a] = o = []), o.splice(0, o.length);
        for (var l = t.ajax.xpath(".//item", s[_]), h = 0; h < l.length; h++) {
          for (var m = l[h].attributes, v = { key: l[h].getAttribute("value"), label: l[h].getAttribute("label") }, u = 0; u < m.length; u++) {
            var c = m[u];
            c.nodeName != "value" && c.nodeName != "label" && (v[c.nodeName] = c.nodeValue);
          }
          o.push(v);
        }
      }
      s.length && t.callEvent("onOptionsLoad", []);
      var f = t.ajax.xpath("//userdata", r.xmlDoc);
      for (_ = 0; _ < f.length; _++) {
        var p = t._xmlNodeToJSON(f[_]);
        t._userdata[p.name] = p.text;
      }
      var g = [];
      for (d = t.ajax.xpath("//event", r.xmlDoc), _ = 0; _ < d.length; _++) {
        var y = g[_] = t._xmlNodeToJSON(d[_]);
        t._init_event(y);
      }
      return g;
    } };
  }(e), function(t) {
    t.json = t._parsers.json = { canParse: function(r) {
      if (r && typeof r == "object")
        return !0;
      if (typeof r == "string")
        try {
          var d = JSON.parse(r);
          return Object.prototype.toString.call(d) === "[object Object]" || Object.prototype.toString.call(d) === "[object Array]";
        } catch {
          return !1;
        }
      return !1;
    }, parse: function(r) {
      var d = [];
      typeof r == "string" && (r = JSON.parse(r)), Object.prototype.toString.call(r) === "[object Array]" ? d = r : r && (r.events ? d = r.events : r.data && (d = r.data)), d = d || [], r.dhx_security && (window.dhtmlx && (window.dhtmlx.security_key = r.dhx_security), t.security_key = r.dhx_security);
      var n = r && r.collections ? r.collections : {}, s = !1;
      for (var _ in n)
        if (n.hasOwnProperty(_)) {
          s = !0;
          var a = n[_], o = t.serverList[_];
          o || (t.serverList[_] = o = []), o.splice(0, o.length);
          for (var l = 0; l < a.length; l++) {
            var h = a[l], m = { key: h.value, label: h.label };
            for (var v in h)
              if (h.hasOwnProperty(v)) {
                if (v == "value" || v == "label")
                  continue;
                m[v] = h[v];
              }
            o.push(m);
          }
        }
      s && t.callEvent("onOptionsLoad", []);
      for (var u = [], c = 0; c < d.length; c++) {
        var f = d[c];
        t._init_event(f), u.push(f);
      }
      return u;
    } };
  }(e), function(t) {
    t.ical = t._parsers.ical = { canParse: function(r) {
      return typeof r == "string" && new RegExp("^BEGIN:VCALENDAR").test(r);
    }, parse: function(r) {
      var d = r.match(RegExp(this.c_start + "[^\f]*" + this.c_end, ""));
      if (d.length) {
        d[0] = d[0].replace(/[\r\n]+ /g, ""), d[0] = d[0].replace(/[\r\n]+(?=[a-z \t])/g, " "), d[0] = d[0].replace(/;[^:\r\n]*:/g, ":");
        for (var n, s = [], _ = RegExp("(?:" + this.e_start + ")([^\f]*?)(?:" + this.e_end + ")", "g"); (n = _.exec(d)) !== null; ) {
          for (var a, o = {}, l = /[^\r\n]+[\r\n]+/g; (a = l.exec(n[1])) !== null; )
            this.parse_param(a.toString(), o);
          o.uid && !o.id && (o.id = o.uid), s.push(o);
        }
        return s;
      }
    }, parse_param: function(r, d) {
      var n = r.indexOf(":");
      if (n != -1) {
        var s = r.substr(0, n).toLowerCase(), _ = r.substr(n + 1).replace(/\\,/g, ",").replace(/[\r\n]+$/, "");
        s == "summary" ? s = "text" : s == "dtstart" ? (s = "start_date", _ = this.parse_date(_, 0, 0)) : s == "dtend" && (s = "end_date", _ = this.parse_date(_, 0, 0)), d[s] = _;
      }
    }, parse_date: function(r, d, n) {
      var s = r.split("T"), _ = !1;
      s[1] && (d = s[1].substr(0, 2), n = s[1].substr(2, 2), _ = s[1][6] == "Z");
      var a = s[0].substr(0, 4), o = parseInt(s[0].substr(4, 2), 10) - 1, l = s[0].substr(6, 2);
      return t.config.server_utc || _ ? new Date(Date.UTC(a, o, l, d, n)) : new Date(a, o, l, d, n);
    }, c_start: "BEGIN:VCALENDAR", e_start: "BEGIN:VEVENT", e_end: "END:VEVENT", c_end: "END:VCALENDAR" };
  }(e), e.on_load = function(t) {
    var r;
    this.callEvent("onBeforeParse", []);
    var d = !1, n = !1;
    for (var s in this._parsers) {
      var _ = this._parsers[s];
      if (_.canParse(t.xmlDoc.responseText, t.xmlDoc)) {
        try {
          var a = t.xmlDoc.responseText;
          s === "xml" && (a = t), (r = _.parse(a)) || (d = !0);
        } catch {
          d = !0;
        }
        n = !0;
        break;
      }
    }
    if (!n)
      if (this._process && this[this._process])
        try {
          r = this[this._process].parse(t.xmlDoc.responseText);
        } catch {
          d = !0;
        }
      else
        d = !0;
    (d || t.xmlDoc.status && t.xmlDoc.status >= 400) && (this.callEvent("onLoadError", [t.xmlDoc]), r = []), this._process_loading(r), this.callEvent("onXLE", []), this.callEvent("onParse", []);
  }, e._process_loading = function(t) {
    this._loading = !0, this._not_render = !0;
    for (var r = 0; r < t.length; r++)
      this.callEvent("onEventLoading", [t[r]]) && this.addEvent(t[r]);
    this._not_render = !1, this._render_wait && this.render_view_data(), this._loading = !1, this._after_call && this._after_call(), this._after_call = null;
  }, e._init_event = function(t) {
    t.text = t.text || t._tagvalue || "", t.start_date = e._init_date(t.start_date), t.end_date = e._init_date(t.end_date);
  }, e._init_date = function(t) {
    return t ? typeof t == "string" ? e._helpers.parseDate(t) : new Date(t) : null;
  };
  const i = mt(e);
  e.serialize = function() {
    const t = [], r = i();
    for (var d in r) {
      const _ = {};
      var n = r[d];
      for (var s in n) {
        if (s.charAt(0) == "$" || s.charAt(0) == "_")
          continue;
        let a;
        const o = n[s];
        a = e.utils.isDate(o) ? e.defined(e.templates.xml_format) ? e.templates.xml_format(o) : e.templates.format_date(o) : o, _[s] = a;
      }
      t.push(_);
    }
    return t;
  }, e.parse = function(t, r) {
    this._process = r, this.on_load({ xmlDoc: { responseText: t } });
  }, e.load = function(t, r) {
    typeof r == "string" && (this._process = r, r = arguments[2]), this._load_url = t, this._after_call = r, this._load(t, this._date);
  }, e.setLoadMode = function(t) {
    t == "all" && (t = ""), this._load_mode = t;
  }, e.serverList = function(t, r) {
    return r ? (this.serverList[t] = r.slice(0), this.serverList[t]) : (this.serverList[t] = this.serverList[t] || [], this.serverList[t]);
  }, e._userdata = {}, e._xmlNodeToJSON = function(t) {
    for (var r = {}, d = 0; d < t.attributes.length; d++)
      r[t.attributes[d].name] = t.attributes[d].value;
    for (d = 0; d < t.childNodes.length; d++) {
      var n = t.childNodes[d];
      n.nodeType == 1 && (r[n.tagName] = n.firstChild ? n.firstChild.nodeValue : "");
    }
    return r.text || (r.text = t.firstChild ? t.firstChild.nodeValue : ""), r;
  }, e.attachEvent("onXLS", function() {
    var t;
    this.config.show_loading === !0 && ((t = this.config.show_loading = document.createElement("div")).className = "dhx_loading", t.style.left = Math.round((this._x - 128) / 2) + "px", t.style.top = Math.round((this._y - 15) / 2) + "px", this._obj.appendChild(t));
  }), e.attachEvent("onXLE", function() {
    var t = this.config.show_loading;
    t && typeof t == "object" && (t.parentNode && t.parentNode.removeChild(t), this.config.show_loading = !0);
  });
}
function Ft(e) {
  e._init_touch_events = function() {
    if ((this.config.touch && (navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("Touch") != -1) && !window.MSStream || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && (this.xy.scroll_width = 0, this._mobile = !0), this.config.touch) {
      var i = !0;
      try {
        document.createEvent("TouchEvent");
      } catch {
        i = !1;
      }
      i ? this._touch_events(["touchmove", "touchstart", "touchend"], function(t) {
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
  }, e._touch_events = function(i, t, r) {
    var d, n, s, _, a, o, l = 0;
    function h(v, u, c) {
      e.event(v, u, function(f) {
        return !!e._is_lightbox_open() || (r(f) ? void 0 : c(f));
      }, { passive: !1 });
    }
    function m(v) {
      r(v) || (e._hide_global_tip(), _ && (e._on_mouse_up(t(v)), e._temp_touch_block = !1), e._drag_id = null, e._drag_mode = null, e._drag_pos = null, e._pointerDragId = null, clearTimeout(s), _ = o = !1, a = !0);
    }
    h(document.body, i[0], function(v) {
      if (!r(v)) {
        var u = t(v);
        if (u) {
          if (_)
            return function(c) {
              if (!r(c)) {
                var f = e.getState().drag_mode, p = !!e.matrix && e.matrix[e._mode], g = e.render_view_data;
                f == "create" && p && (e.render_view_data = function() {
                  for (var y = e.getState().drag_id, x = e.getEvent(y), b = p.y_property, k = e.getEvents(x.start_date, x.end_date), w = 0; w < k.length; w++)
                    k[w][b] != x[b] && (k.splice(w, 1), w--);
                  x._sorder = k.length - 1, x._count = k.length, this.render_data([x], e.getState().mode);
                }), e._on_mouse_move(c), f == "create" && p && (e.render_view_data = g), c.preventDefault && c.preventDefault(), c.cancelBubble = !0;
              }
            }(u), v.preventDefault && v.preventDefault(), v.cancelBubble = !0, e._update_global_tip(), !1;
          n = t(v), o && (n ? (d.target != n.target || Math.abs(d.pageX - n.pageX) > 5 || Math.abs(d.pageY - n.pageY) > 5) && (a = !0, clearTimeout(s)) : a = !0);
        }
      }
    }), h(this._els.dhx_cal_data[0], "touchcancel", m), h(this._els.dhx_cal_data[0], "contextmenu", function(v) {
      if (!r(v))
        return o ? (v && v.preventDefault && v.preventDefault(), v.cancelBubble = !0, !1) : void 0;
    }), h(this._obj, i[1], function(v) {
      var u;
      if (document && document.body && document.body.classList.add("dhx_cal_touch_active"), !r(v))
        if (e._pointerDragId = v.pointerId, _ = a = !1, o = !0, u = n = t(v)) {
          var c = /* @__PURE__ */ new Date();
          if (!a && !_ && c - l < 250)
            return e._click.dhx_cal_data(u), window.setTimeout(function() {
              e.$destroyed || e._on_dbl_click(u);
            }, 50), v.preventDefault && v.preventDefault(), v.cancelBubble = !0, e._block_next_stop = !0, !1;
          if (l = c, !a && !_ && e.config.touch_drag) {
            var f = e._locate_event(document.activeElement), p = e._locate_event(u.target), g = d ? e._locate_event(d.target) : null;
            if (f && p && f == p && f != g)
              return v.preventDefault && v.preventDefault(), v.cancelBubble = !0, e._ignore_next_click = !1, e._click.dhx_cal_data(u), d = u, !1;
            s = setTimeout(function() {
              if (!e.$destroyed) {
                _ = !0;
                var y = d.target, x = e._getClassName(y);
                y && x.indexOf("dhx_body") != -1 && (y = y.previousSibling), e._on_mouse_down(d, y), e._drag_mode && e._drag_mode != "create" && e.for_rendered(e._drag_id, function(b, k) {
                  b.style.display = "none", e._rendered.splice(k, 1);
                }), e.config.touch_tip && e._show_global_tip(), e.updateEvent(e._drag_id);
              }
            }, e.config.touch_drag), d = u;
          }
        } else
          a = !0;
    }), h(this._els.dhx_cal_data[0], i[2], function(v) {
      if (document && document.body && document.body.classList.remove("dhx_cal_touch_active"), !r(v))
        return e.config.touch_swipe_dates && !_ && function(u, c, f, p) {
          if (!u || !c)
            return !1;
          for (var g = u.target; g && g != e._obj; )
            g = g.parentNode;
          if (g != e._obj || e.matrix && e.matrix[e.getState().mode] && e.matrix[e.getState().mode].scrollable)
            return !1;
          var y = Math.abs(u.pageY - c.pageY), x = Math.abs(u.pageX - c.pageX);
          return y < p && x > f && (!y || x / y > 3) && (u.pageX > c.pageX ? e._click.dhx_cal_next_button() : e._click.dhx_cal_prev_button(), !0);
        }(d, n, 200, 100) && (e._block_next_stop = !0), _ && (e._ignore_next_click = !0, setTimeout(function() {
          e._ignore_next_click = !1;
        }, 100)), m(v), e._block_next_stop ? (e._block_next_stop = !1, v.preventDefault && v.preventDefault(), v.cancelBubble = !0, !1) : void 0;
    }), e.event(document.body, i[2], m);
  }, e._show_global_tip = function() {
    e._hide_global_tip();
    var i = e._global_tip = document.createElement("div");
    i.className = "dhx_global_tip", e._update_global_tip(1), document.body.appendChild(i);
  }, e._update_global_tip = function(i) {
    var t = e._global_tip;
    if (t) {
      var r = "";
      if (e._drag_id && !i) {
        var d = e.getEvent(e._drag_id);
        d && (r = "<div>" + (d._timed ? e.templates.event_header(d.start_date, d.end_date, d) : e.templates.day_date(d.start_date, d.end_date, d)) + "</div>");
      }
      e._drag_mode == "create" || e._drag_mode == "new-size" ? t.innerHTML = (e.locale.labels.drag_to_create || "Drag to create") + r : t.innerHTML = (e.locale.labels.drag_to_move || "Drag to move") + r;
    }
  }, e._hide_global_tip = function() {
    var i = e._global_tip;
    i && i.parentNode && (i.parentNode.removeChild(i), e._global_tip = 0);
  };
}
function Bt(e) {
  var i, t;
  function r() {
    if (e._is_material_skin())
      return !0;
    if (t !== void 0)
      return t;
    var _ = document.createElement("div");
    _.style.position = "absolute", _.style.left = "-9999px", _.style.top = "-9999px", _.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_data'><div class='dhx_cal_event'><div class='dhx_body'></div></div><div>", document.body.appendChild(_);
    var a = window.getComputedStyle(_.querySelector(".dhx_body")).getPropertyValue("box-sizing");
    document.body.removeChild(_), (t = a === "border-box") || setTimeout(function() {
      t = void 0;
    }, 1e3);
  }
  function d() {
    if (!e._is_material_skin() && !e._border_box_events()) {
      var _ = t;
      t = void 0, i = void 0, _ !== r() && e.$container && e.getState().mode && e.setCurrentView();
    }
  }
  function n(_) {
    var a = _.getMinutes();
    return a = a < 10 ? "0" + a : a, "<span class='dhx_scale_h'>" + _.getHours() + "</span><span class='dhx_scale_m'>&nbsp;" + a + "</span>";
  }
  e._addThemeClass = function() {
    document.documentElement.setAttribute("data-scheduler-theme", e.skin);
  }, e._skin_settings = { fix_tab_position: [1, 0], use_select_menu_space: [1, 0], wide_form: [1, 0], hour_size_px: [44, 42], displayed_event_color: ["#ff4a4a", "ffc5ab"], displayed_event_text_color: ["#ffef80", "7e2727"] }, e._skin_xy = { lightbox_additional_height: [90, 50], nav_height: [59, 22], bar_height: [24, 20] }, e._is_material_skin = function() {
    return e.skin ? (e.skin + "").indexOf("material") > -1 : function() {
      if (i === void 0) {
        var _ = document.createElement("div");
        _.style.position = "absolute", _.style.left = "-9999px", _.style.top = "-9999px", _.innerHTML = "<div class='dhx_cal_container'><div class='dhx_cal_scale_placeholder'></div><div>", document.body.appendChild(_);
        var a = window.getComputedStyle(_.querySelector(".dhx_cal_scale_placeholder")).getPropertyValue("position");
        i = a === "absolute", setTimeout(function() {
          i = null, _ && _.parentNode && _.parentNode.removeChild(_);
        }, 500);
      }
      return i;
    }();
  }, e._build_skin_info = function() {
    (function() {
      const v = e.$container;
      clearInterval(s), v && (s = setInterval(() => {
        const u = getComputedStyle(v).getPropertyValue("--dhx-scheduler-theme");
        u && u !== e.skin && e.setSkin(u);
      }, 100));
    })();
    const _ = getComputedStyle(this.$container), a = _.getPropertyValue("--dhx-scheduler-theme");
    let o, l = !!a, h = {}, m = !1;
    if (l) {
      o = a;
      for (let v in e.xy)
        h[v] = _.getPropertyValue(`--dhx-scheduler-xy-${v}`);
      h.hour_size_px = _.getPropertyValue("--dhx-scheduler-config-hour_size_px"), h.wide_form = _.getPropertyValue("--dhx-scheduler-config-form_wide");
    } else
      o = function() {
        for (var v = document.getElementsByTagName("link"), u = 0; u < v.length; u++) {
          var c = v[u].href.match("dhtmlxscheduler_([a-z]+).css");
          if (c)
            return c[1];
        }
      }(), m = e._is_material_skin();
    if (e._theme_info = { theme: o, cssVarTheme: l, oldMaterialTheme: m, values: h }, e._theme_info.cssVarTheme) {
      const v = this._theme_info.values;
      for (let u in e.xy)
        isNaN(parseInt(v[u])) || (e.xy[u] = parseInt(v[u]));
    }
  }, e.event(window, "DOMContentLoaded", d), e.event(window, "load", d), e._border_box_events = function() {
    return r();
  }, e._configure = function(_, a, o) {
    for (var l in a)
      _[l] === void 0 && (_[l] = a[l][o]);
  }, e.setSkin = function(_) {
    this.skin = _, e._addThemeClass(), e.$container && (this._skin_init(), this.render());
  };
  let s = null;
  e.attachEvent("onDestroy", function() {
    clearInterval(s);
  }), e._skin_init = function() {
    this._build_skin_info(), this.skin || (this.skin = this._theme_info.theme), e._addThemeClass(), e.skin === "flat" ? e.templates.hour_scale = n : e.templates.hour_scale === n && (e.templates.hour_scale = e.date.date_to_str(e.config.hour_date)), e.attachEvent("onTemplatesReady", function() {
      var _ = e.date.date_to_str("%d");
      e.templates._old_month_day || (e.templates._old_month_day = e.templates.month_day);
      var a = e.templates._old_month_day;
      e.templates.month_day = function(o) {
        if (this._mode == "month") {
          var l = _(o);
          return o.getDate() == 1 && (l = e.locale.date.month_full[o.getMonth()] + " " + l), +o == +e.date.date_part(this._currentDate()) && (l = e.locale.labels.dhx_cal_today_button + " " + l), l;
        }
        return a.call(this, o);
      }, e.config.fix_tab_position && (e._els.dhx_cal_navline[0].querySelectorAll("[data-tab]").forEach((o) => {
        switch (o.getAttribute("data-tab") || o.getAttribute("name")) {
          case "day":
          case "day_tab":
            o.classList.add("dhx_cal_tab_first"), o.classList.add("dhx_cal_tab_segmented");
            break;
          case "week":
          case "week_tab":
            o.classList.add("dhx_cal_tab_segmented");
            break;
          case "month":
          case "month_tab":
            o.classList.add("dhx_cal_tab_last"), o.classList.add("dhx_cal_tab_segmented");
            break;
          default:
            o.classList.add("dhx_cal_tab_standalone");
        }
      }), function(o) {
        if (e.config.header)
          return;
        const l = Array.from(o.querySelectorAll(".dhx_cal_tab")), h = ["day", "week", "month"].map((v) => l.find((u) => u.getAttribute("data-tab") === v)).filter((v) => v !== void 0);
        let m = l.length > 0 ? l[0] : null;
        h.reverse().forEach((v) => {
          o.insertBefore(v, m), m = v;
        });
      }(e._els.dhx_cal_navline[0]));
    }, { once: !0 });
  };
}
function Jt(e, i) {
  this.$scheduler = e, this.$dp = i, this._dataProcessorHandlers = [], this.attach = function() {
    var t = this.$dp, r = this.$scheduler;
    this._dataProcessorHandlers.push(r.attachEvent("onEventAdded", function(d) {
      !this._loading && this._validId(d) && t.setUpdated(d, !0, "inserted");
    })), this._dataProcessorHandlers.push(r.attachEvent("onConfirmedBeforeEventDelete", function(d) {
      if (this._validId(d)) {
        var n = t.getState(d);
        return n == "inserted" || this._new_event ? (t.setUpdated(d, !1), !0) : n != "deleted" && (n == "true_deleted" || (t.setUpdated(d, !0, "deleted"), !1));
      }
    })), this._dataProcessorHandlers.push(r.attachEvent("onEventChanged", function(d) {
      !this._loading && this._validId(d) && t.setUpdated(d, !0, "updated");
    })), this._dataProcessorHandlers.push(r.attachEvent("onClearAll", function() {
      t._in_progress = {}, t._invalid = {}, t.updatedRows = [], t._waitMode = 0;
    })), t.attachEvent("insertCallback", r._update_callback), t.attachEvent("updateCallback", r._update_callback), t.attachEvent("deleteCallback", function(d, n) {
      r.getEvent(n) ? (r.setUserData(n, this.action_param, "true_deleted"), r.deleteEvent(n)) : r._add_rec_marker && r._update_callback(d, n);
    });
  }, this.detach = function() {
    for (var t in this._dataProcessorHandlers) {
      var r = this._dataProcessorHandlers[t];
      this.$scheduler.detachEvent(r);
    }
    this._dataProcessorHandlers = [];
  };
}
function He(e) {
  return this.serverProcessor = e, this.action_param = "!nativeeditor_status", this.object = null, this.updatedRows = [], this.autoUpdate = !0, this.updateMode = "cell", this._tMode = "GET", this._headers = null, this._payload = null, this.post_delim = "_", this._waitMode = 0, this._in_progress = {}, this._invalid = {}, this.messages = [], this.styles = { updated: "font-weight:bold;", inserted: "font-weight:bold;", deleted: "text-decoration : line-through;", invalid: "background-color:FFE0E0;", invalid_cell: "border-bottom:2px solid red;", error: "color:red;", clear: "font-weight:normal;text-decoration:none;" }, this.enableUTFencoding(!0), Ue(this), this;
}
function Wt(e) {
  var i = "data-dhxbox", t = null;
  function r(p, g) {
    var y = p.callback;
    u.hide(p.box), t = p.box = null, y && y(g);
  }
  function d(p) {
    if (t) {
      var g = p.which || p.keyCode, y = !1;
      if (c.keyboard) {
        if (g == 13 || g == 32) {
          var x = p.target || p.srcElement;
          _e.getClassName(x).indexOf("scheduler_popup_button") > -1 && x.click ? x.click() : (r(t, !0), y = !0);
        }
        g == 27 && (r(t, !1), y = !0);
      }
      return y ? (p.preventDefault && p.preventDefault(), !(p.cancelBubble = !0)) : void 0;
    }
  }
  function n(p) {
    n.cover || (n.cover = document.createElement("div"), e.event(n.cover, "keydown", d), n.cover.className = "dhx_modal_cover", document.body.appendChild(n.cover)), n.cover.style.display = p ? "inline-block" : "none";
  }
  function s(p, g, y) {
    var x = e._waiAria.messageButtonAttrString(p), b = (g || "").toLowerCase().replace(/ /g, "_");
    return `<div ${x} class='scheduler_popup_button dhtmlx_popup_button ${`scheduler_${b}_button dhtmlx_${b}_button`}' data-result='${y}' result='${y}' ><div>${p}</div></div>`;
  }
  function _() {
    for (var p = [].slice.apply(arguments, [0]), g = 0; g < p.length; g++)
      if (p[g])
        return p[g];
  }
  function a(p, g, y) {
    var x = p.tagName ? p : function(w, D, E) {
      var S = document.createElement("div"), N = ee.uid();
      e._waiAria.messageModalAttr(S, N), S.className = " scheduler_modal_box dhtmlx_modal_box scheduler-" + w.type + " dhtmlx-" + w.type, S.setAttribute(i, 1);
      var M = "";
      if (w.width && (S.style.width = w.width), w.height && (S.style.height = w.height), w.title && (M += '<div class="scheduler_popup_title dhtmlx_popup_title">' + w.title + "</div>"), M += '<div class="scheduler_popup_text dhtmlx_popup_text" id="' + N + '"><span>' + (w.content ? "" : w.text) + '</span></div><div  class="scheduler_popup_controls dhtmlx_popup_controls">', D && (M += s(_(w.ok, e.locale.labels.message_ok, "OK"), "ok", !0)), E && (M += s(_(w.cancel, e.locale.labels.message_cancel, "Cancel"), "cancel", !1)), w.buttons)
        for (var T = 0; T < w.buttons.length; T++) {
          var A = w.buttons[T];
          M += typeof A == "object" ? s(A.label, A.css || "scheduler_" + A.label.toLowerCase() + "_button dhtmlx_" + A.label.toLowerCase() + "_button", A.value || T) : s(A, A, T);
        }
      if (M += "</div>", S.innerHTML = M, w.content) {
        var H = w.content;
        typeof H == "string" && (H = document.getElementById(H)), H.style.display == "none" && (H.style.display = ""), S.childNodes[w.title ? 1 : 0].appendChild(H);
      }
      return e.event(S, "click", function($) {
        var j = $.target || $.srcElement;
        if (j.className || (j = j.parentNode), _e.closest(j, ".scheduler_popup_button")) {
          var z = j.getAttribute("data-result");
          r(w, z = z == "true" || z != "false" && z);
        }
      }), w.box = S, (D || E) && (t = w), S;
    }(p, g, y);
    p.hidden || n(!0), document.body.appendChild(x);
    var b = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - x.offsetWidth) / 2)), k = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - x.offsetHeight) / 2));
    return p.position == "top" ? x.style.top = "-3px" : x.style.top = k + "px", x.style.left = b + "px", e.event(x, "keydown", d), u.focus(x), p.hidden && u.hide(x), e.callEvent("onMessagePopup", [x]), x;
  }
  function o(p) {
    return a(p, !0, !1);
  }
  function l(p) {
    return a(p, !0, !0);
  }
  function h(p) {
    return a(p);
  }
  function m(p, g, y) {
    return typeof p != "object" && (typeof g == "function" && (y = g, g = ""), p = { text: p, type: g, callback: y }), p;
  }
  function v(p, g, y, x, b) {
    return typeof p != "object" && (p = { text: p, type: g, expire: y, id: x, callback: b }), p.id = p.id || ee.uid(), p.expire = p.expire || c.expire, p;
  }
  e.event(document, "keydown", d, !0);
  var u = function() {
    var p = m.apply(this, arguments);
    return p.type = p.type || "alert", h(p);
  };
  u.hide = function(p) {
    for (; p && p.getAttribute && !p.getAttribute(i); )
      p = p.parentNode;
    p && (p.parentNode.removeChild(p), n(!1), e.callEvent("onAfterMessagePopup", [p]));
  }, u.focus = function(p) {
    setTimeout(function() {
      var g = _e.getFocusableNodes(p);
      g.length && g[0].focus && g[0].focus();
    }, 1);
  };
  var c = function(p, g, y, x) {
    switch ((p = v.apply(this, arguments)).type = p.type || "info", p.type.split("-")[0]) {
      case "alert":
        return o(p);
      case "confirm":
        return l(p);
      case "modalbox":
        return h(p);
      default:
        return function(b) {
          c.area || (c.area = document.createElement("div"), c.area.className = "scheduler_message_area dhtmlx_message_area", c.area.style[c.position] = "5px", document.body.appendChild(c.area)), c.hide(b.id);
          var k = document.createElement("div");
          return k.innerHTML = "<div>" + b.text + "</div>", k.className = "scheduler-info dhtmlx-info scheduler-" + b.type + " dhtmlx-" + b.type, e.event(k, "click", function(w) {
            b.callback && b.callback.call(this, w), c.hide(b.id), b = null;
          }), e._waiAria.messageInfoAttr(k), c.position == "bottom" && c.area.firstChild ? c.area.insertBefore(k, c.area.firstChild) : c.area.appendChild(k), b.expire > 0 && (c.timers[b.id] = window.setTimeout(function() {
            c && c.hide(b.id);
          }, b.expire)), c.pull[b.id] = k, k = null, b.id;
        }(p);
    }
  };
  c.seed = (/* @__PURE__ */ new Date()).valueOf(), c.uid = ee.uid, c.expire = 4e3, c.keyboard = !0, c.position = "top", c.pull = {}, c.timers = {}, c.hideAll = function() {
    for (var p in c.pull)
      c.hide(p);
  }, c.hide = function(p) {
    var g = c.pull[p];
    g && g.parentNode && (window.setTimeout(function() {
      g.parentNode.removeChild(g), g = null;
    }, 2e3), g.className += " hidden", c.timers[p] && window.clearTimeout(c.timers[p]), delete c.pull[p]);
  };
  var f = [];
  return e.attachEvent("onMessagePopup", function(p) {
    f.push(p);
  }), e.attachEvent("onAfterMessagePopup", function(p) {
    for (var g = 0; g < f.length; g++)
      f[g] === p && (f.splice(g, 1), g--);
  }), e.attachEvent("onDestroy", function() {
    n.cover && n.cover.parentNode && n.cover.parentNode.removeChild(n.cover);
    for (var p = 0; p < f.length; p++)
      f[p].parentNode && f[p].parentNode.removeChild(f[p]);
    f = null, c.area && c.area.parentNode && c.area.parentNode.removeChild(c.area), c = null;
  }), { alert: function() {
    var p = m.apply(this, arguments);
    return p.type = p.type || "confirm", o(p);
  }, confirm: function() {
    var p = m.apply(this, arguments);
    return p.type = p.type || "alert", l(p);
  }, message: c, modalbox: u };
}
He.prototype = { setTransactionMode: function(e, i) {
  typeof e == "object" ? (this._tMode = e.mode || this._tMode, e.headers !== void 0 && (this._headers = e.headers), e.payload !== void 0 && (this._payload = e.payload), this._tSend = !!i) : (this._tMode = e, this._tSend = i), this._tMode == "REST" && (this._tSend = !1, this._endnm = !0), this._tMode === "JSON" || this._tMode === "REST-JSON" ? (this._tSend = !1, this._endnm = !0, this._serializeAsJson = !0, this._headers = this._headers || {}, this._headers["Content-Type"] = "application/json") : this._headers && !this._headers["Content-Type"] && (this._headers["Content-Type"] = "application/x-www-form-urlencoded"), this._tMode === "CUSTOM" && (this._tSend = !1, this._endnm = !0, this._router = e.router);
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
}, setUpdateMode: function(e, i) {
  this.autoUpdate = e == "cell", this.updateMode = e, this.dnd = i;
}, ignore: function(e, i) {
  this._silent_mode = !0, e.call(i || window), this._silent_mode = !1;
}, setUpdated: function(e, i, t) {
  if (!this._silent_mode) {
    var r = this.findRow(e);
    t = t || "updated";
    var d = this.$scheduler.getUserData(e, this.action_param);
    d && t == "updated" && (t = d), i ? (this.set_invalid(e, !1), this.updatedRows[r] = e, this.$scheduler.setUserData(e, this.action_param, t), this._in_progress[e] && (this._in_progress[e] = "wait")) : this.is_invalid(e) || (this.updatedRows.splice(r, 1), this.$scheduler.setUserData(e, this.action_param, "")), this.markRow(e, i, t), i && this.autoUpdate && this.sendData(e);
  }
}, markRow: function(e, i, t) {
  var r = "", d = this.is_invalid(e);
  if (d && (r = this.styles[d], i = !0), this.callEvent("onRowMark", [e, i, t, d]) && (r = this.styles[i ? t : "clear"] + r, this.$scheduler[this._methods[0]](e, r), d && d.details)) {
    r += this.styles[d + "_cell"];
    for (var n = 0; n < d.details.length; n++)
      d.details[n] && this.$scheduler[this._methods[1]](e, n, r);
  }
}, getActionByState: function(e) {
  return e === "inserted" ? "create" : e === "updated" ? "update" : e === "deleted" ? "delete" : "update";
}, getState: function(e) {
  return this.$scheduler.getUserData(e, this.action_param);
}, is_invalid: function(e) {
  return this._invalid[e];
}, set_invalid: function(e, i, t) {
  t && (i = { value: i, details: t, toString: function() {
    return this.value.toString();
  } }), this._invalid[e] = i;
}, checkBeforeUpdate: function(e) {
  return !0;
}, sendData: function(e) {
  return this.$scheduler.editStop && this.$scheduler.editStop(), e === void 0 || this._tSend ? this.sendAllData() : !this._in_progress[e] && (this.messages = [], !(!this.checkBeforeUpdate(e) && this.callEvent("onValidationError", [e, this.messages])) && void this._beforeSendData(this._getRowData(e), e));
}, _beforeSendData: function(e, i) {
  if (!this.callEvent("onBeforeUpdate", [i, this.getState(i), e]))
    return !1;
  this._sendData(e, i);
}, serialize: function(e, i) {
  if (this._serializeAsJson)
    return this._serializeAsJSON(e);
  if (typeof e == "string")
    return e;
  if (i !== void 0)
    return this.serialize_one(e, "");
  var t = [], r = [];
  for (var d in e)
    e.hasOwnProperty(d) && (t.push(this.serialize_one(e[d], d + this.post_delim)), r.push(d));
  return t.push("ids=" + this.escape(r.join(","))), this.$scheduler.security_key && t.push("dhx_security=" + this.$scheduler.security_key), t.join("&");
}, serialize_one: function(e, i) {
  if (typeof e == "string")
    return e;
  var t = [], r = "";
  for (var d in e)
    if (e.hasOwnProperty(d)) {
      if ((d == "id" || d == this.action_param) && this._tMode == "REST")
        continue;
      r = typeof e[d] == "string" || typeof e[d] == "number" ? e[d] : JSON.stringify(e[d]), t.push(this.escape((i || "") + d) + "=" + this.escape(r));
    }
  return t.join("&");
}, _applyPayload: function(e) {
  var i = this.$scheduler.ajax;
  if (this._payload)
    for (var t in this._payload)
      e = e + i.urlSeparator(e) + this.escape(t) + "=" + this.escape(this._payload[t]);
  return e;
}, _sendData: function(e, i) {
  if (e) {
    if (!this.callEvent("onBeforeDataSending", i ? [i, this.getState(i), e] : [null, null, e]))
      return !1;
    i && (this._in_progress[i] = (/* @__PURE__ */ new Date()).valueOf());
    var t = this, r = this.$scheduler.ajax;
    if (this._tMode !== "CUSTOM") {
      var d, n = { callback: function(u) {
        var c = [];
        if (i)
          c.push(i);
        else if (e)
          for (var f in e)
            c.push(f);
        return t.afterUpdate(t, u, c);
      }, headers: t._headers }, s = this.serverProcessor + (this._user ? r.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.$scheduler.getUserData(0, "version")].join("&") : ""), _ = this._applyPayload(s);
      switch (this._tMode) {
        case "GET":
          d = this._cleanupArgumentsBeforeSend(e), n.url = _ + r.urlSeparator(_) + this.serialize(d, i), n.method = "GET";
          break;
        case "POST":
          d = this._cleanupArgumentsBeforeSend(e), n.url = _, n.method = "POST", n.data = this.serialize(d, i);
          break;
        case "JSON":
          d = {};
          var a = this._cleanupItemBeforeSend(e);
          for (var o in a)
            o !== this.action_param && o !== "id" && o !== "gr_id" && (d[o] = a[o]);
          n.url = _, n.method = "POST", n.data = JSON.stringify({ id: i, action: e[this.action_param], data: d });
          break;
        case "REST":
        case "REST-JSON":
          switch (_ = s.replace(/(&|\?)editing=true/, ""), d = "", this.getState(i)) {
            case "inserted":
              n.method = "POST", n.data = this.serialize(e, i);
              break;
            case "deleted":
              n.method = "DELETE", _ = _ + (_.slice(-1) === "/" ? "" : "/") + i;
              break;
            default:
              n.method = "PUT", n.data = this.serialize(e, i), _ = _ + (_.slice(-1) === "/" ? "" : "/") + i;
          }
          n.url = this._applyPayload(_);
      }
      return this._waitMode++, r.query(n);
    }
    {
      var l = this.getState(i), h = this.getActionByState(l), m = function(c) {
        var f = l;
        if (c && c.responseText && c.setRequestHeader) {
          c.status !== 200 && (f = "error");
          try {
            c = JSON.parse(c.responseText);
          } catch {
          }
        }
        f = f || "updated";
        var p = i, g = i;
        c && (f = c.action || f, p = c.sid || p, g = c.id || c.tid || g), t.afterUpdateCallback(p, g, f, c);
      };
      const u = "event";
      var v;
      if (this._router instanceof Function)
        v = this._router(u, h, e, i);
      else
        switch (l) {
          case "inserted":
            v = this._router[u].create(e);
            break;
          case "deleted":
            v = this._router[u].delete(i);
            break;
          default:
            v = this._router[u].update(e, i);
        }
      if (v) {
        if (!v.then && v.id === void 0 && v.tid === void 0 && v.action === void 0)
          throw new Error("Incorrect router return value. A Promise or a response object is expected");
        v.then ? v.then(m).catch(function(c) {
          c && c.action ? m(c) : m({ action: "error", value: c });
        }) : m(v);
      } else
        m(null);
    }
  }
}, sendAllData: function() {
  if (this.updatedRows.length && this.updateMode !== "off") {
    this.messages = [];
    var e = !0;
    if (this._forEachUpdatedRow(function(i) {
      e = e && this.checkBeforeUpdate(i);
    }), !e && !this.callEvent("onValidationError", ["", this.messages]))
      return !1;
    this._tSend ? this._sendData(this._getAllData()) : this._forEachUpdatedRow(function(i) {
      if (!this._in_progress[i]) {
        if (this.is_invalid(i))
          return;
        this._beforeSendData(this._getRowData(i), i);
      }
    });
  }
}, _getAllData: function(e) {
  var i = {}, t = !1;
  return this._forEachUpdatedRow(function(r) {
    if (!this._in_progress[r] && !this.is_invalid(r)) {
      var d = this._getRowData(r);
      this.callEvent("onBeforeUpdate", [r, this.getState(r), d]) && (i[r] = d, t = !0, this._in_progress[r] = (/* @__PURE__ */ new Date()).valueOf());
    }
  }), t ? i : null;
}, findRow: function(e) {
  var i = 0;
  for (i = 0; i < this.updatedRows.length && e != this.updatedRows[i]; i++)
    ;
  return i;
}, defineAction: function(e, i) {
  this._uActions || (this._uActions = {}), this._uActions[e] = i;
}, afterUpdateCallback: function(e, i, t, r) {
  if (this.$scheduler) {
    var d = e, n = t !== "error" && t !== "invalid";
    if (n || this.set_invalid(e, t), this._uActions && this._uActions[t] && !this._uActions[t](r))
      return delete this._in_progress[d];
    this._in_progress[d] !== "wait" && this.setUpdated(e, !1);
    var s = e;
    switch (t) {
      case "inserted":
      case "insert":
        i != e && (this.setUpdated(e, !1), this.$scheduler[this._methods[2]](e, i), e = i);
        break;
      case "delete":
      case "deleted":
        return this.$scheduler.setUserData(e, this.action_param, "true_deleted"), this.$scheduler[this._methods[3]](e, i), delete this._in_progress[d], this.callEvent("onAfterUpdate", [e, t, i, r]);
    }
    this._in_progress[d] !== "wait" ? (n && this.$scheduler.setUserData(e, this.action_param, ""), delete this._in_progress[d]) : (delete this._in_progress[d], this.setUpdated(i, !0, this.$scheduler.getUserData(e, this.action_param))), this.callEvent("onAfterUpdate", [s, t, i, r]);
  }
}, _errorResponse: function(e, i) {
  return this.$scheduler && this.$scheduler.callEvent && this.$scheduler.callEvent("onSaveError", [i, e.xmlDoc]), this.cleanUpdate(i);
}, _setDefaultTransactionMode: function() {
  this.serverProcessor && (this.setTransactionMode("POST", !0), this.serverProcessor += (this.serverProcessor.indexOf("?") !== -1 ? "&" : "?") + "editing=true", this._serverProcessor = this.serverProcessor);
}, afterUpdate: function(e, i, t) {
  var r = this.$scheduler.ajax;
  if (i.xmlDoc.status === 200) {
    var d;
    try {
      d = JSON.parse(i.xmlDoc.responseText);
    } catch {
      i.xmlDoc.responseText.length || (d = {});
    }
    if (d) {
      var n = d.action || this.getState(t) || "updated", s = d.sid || t[0], _ = d.tid || t[0];
      return e.afterUpdateCallback(s, _, n, d), void e.finalizeUpdate();
    }
    var a = r.xmltop("data", i.xmlDoc);
    if (!a)
      return this._errorResponse(i, t);
    var o = r.xpath("//data/action", a);
    if (!o.length)
      return this._errorResponse(i, t);
    for (var l = 0; l < o.length; l++) {
      var h = o[l];
      n = h.getAttribute("type"), s = h.getAttribute("sid"), _ = h.getAttribute("tid"), e.afterUpdateCallback(s, _, n, h);
    }
    e.finalizeUpdate();
  } else
    this._errorResponse(i, t);
}, cleanUpdate: function(e) {
  if (e)
    for (var i = 0; i < e.length; i++)
      delete this._in_progress[e[i]];
}, finalizeUpdate: function() {
  this._waitMode && this._waitMode--, this.callEvent("onAfterUpdateFinish", []), this.updatedRows.length || this.callEvent("onFullSync", []);
}, init: function(e) {
  if (!this._initialized) {
    this.$scheduler = e, this.$scheduler._dp_init && this.$scheduler._dp_init(this), this._setDefaultTransactionMode(), this._methods = this._methods || ["_set_event_text_style", "", "_dp_change_event_id", "_dp_hook_delete"], function(t, r) {
      t._validId = function(d) {
        return !this._is_virtual_event || !this._is_virtual_event(d);
      }, t.setUserData = function(d, n, s) {
        if (d) {
          var _ = this.getEvent(d);
          _ && (_[n] = s);
        } else
          this._userdata[n] = s;
      }, t.getUserData = function(d, n) {
        if (d) {
          var s = this.getEvent(d);
          return s ? s[n] : null;
        }
        return this._userdata[n];
      }, t._set_event_text_style = function(d, n) {
        if (t.getEvent(d)) {
          this.for_rendered(d, function(_) {
            _.style.cssText += ";" + n;
          });
          var s = this.getEvent(d);
          s._text_style = n, this.event_updated(s);
        }
      }, t._update_callback = function(d, n) {
        var s = t._xmlNodeToJSON(d.firstChild);
        s.rec_type == "none" && (s.rec_pattern = "none"), s.text = s.text || s._tagvalue, s.start_date = t._helpers.parseDate(s.start_date), s.end_date = t._helpers.parseDate(s.end_date), t.addEvent(s), t._add_rec_marker && t.setCurrentView();
      }, t._dp_change_event_id = function(d, n) {
        t.getEvent(d) && t.changeEventId(d, n);
      }, t._dp_hook_delete = function(d, n) {
        if (t.getEvent(d))
          return n && d != n && (this.getUserData(d, r.action_param) == "true_deleted" && this.setUserData(d, r.action_param, "updated"), this.changeEventId(d, n)), this.deleteEvent(n, !0);
      }, t.setDp = function() {
        this._dp = r;
      }, t.setDp();
    }(this.$scheduler, this);
    var i = new Jt(this.$scheduler, this);
    i.attach(), this.attachEvent("onDestroy", function() {
      delete this._getRowData, delete this.$scheduler._dp, delete this.$scheduler._dataprocessor, delete this.$scheduler._set_event_text_style, delete this.$scheduler._dp_change_event_id, delete this.$scheduler._dp_hook_delete, delete this.$scheduler, i.detach();
    }), this.$scheduler.callEvent("onDataProcessorReady", [this]), this._initialized = !0, e._dataprocessor = this;
  }
}, setOnAfterUpdate: function(e) {
  this.attachEvent("onAfterUpdate", e);
}, setOnBeforeUpdateHandler: function(e) {
  this.attachEvent("onBeforeDataSending", e);
}, setAutoUpdate: function(e, i) {
  e = e || 2e3, this._user = i || (/* @__PURE__ */ new Date()).valueOf(), this._need_update = !1, this._update_busy = !1, this.attachEvent("onAfterUpdate", function(d, n, s, _) {
    this.afterAutoUpdate(d, n, s, _);
  }), this.attachEvent("onFullSync", function() {
    this.fullSync();
  });
  var t = this;
  let r = oe.setInterval(function() {
    t.loadUpdate();
  }, e);
  this.attachEvent("onDestroy", function() {
    clearInterval(r);
  });
}, afterAutoUpdate: function(e, i, t, r) {
  return i != "collision" || (this._need_update = !0, !1);
}, fullSync: function() {
  return this._need_update && (this._need_update = !1, this.loadUpdate()), !0;
}, getUpdates: function(e, i) {
  var t = this.$scheduler.ajax;
  if (this._update_busy)
    return !1;
  this._update_busy = !0, t.get(e, i);
}, _getXmlNodeValue: function(e) {
  return e.firstChild ? e.firstChild.nodeValue : "";
}, loadUpdate: function() {
  var e = this, i = this.$scheduler.ajax, t = this.$scheduler.getUserData(0, "version"), r = this.serverProcessor + i.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + t].join("&");
  r = r.replace("editing=true&", ""), this.getUpdates(r, function(d) {
    var n = i.xpath("//userdata", d);
    e.$scheduler.setUserData(0, "version", e._getXmlNodeValue(n[0]));
    var s = i.xpath("//update", d);
    if (s.length) {
      e._silent_mode = !0;
      for (var _ = 0; _ < s.length; _++) {
        var a = s[_].getAttribute("status"), o = s[_].getAttribute("id"), l = s[_].getAttribute("parent");
        switch (a) {
          case "inserted":
            this.callEvent("insertCallback", [s[_], o, l]);
            break;
          case "updated":
            this.callEvent("updateCallback", [s[_], o, l]);
            break;
          case "deleted":
            this.callEvent("deleteCallback", [s[_], o, l]);
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
  var i = this.$scheduler.utils.copy(e);
  return this._tMode === "REST-JSON" && (delete i.id, delete i[this.action_param]), JSON.stringify(i);
}, _cleanupArgumentsBeforeSend: function(e) {
  var i;
  if (e[this.action_param] === void 0)
    for (var t in i = {}, e)
      i[t] = this._cleanupArgumentsBeforeSend(e[t]);
  else
    i = this._cleanupItemBeforeSend(e);
  return i;
}, _cleanupItemBeforeSend: function(e) {
  var i = null;
  return e && (e[this.action_param] === "deleted" ? ((i = {}).id = e.id, i[this.action_param] = e[this.action_param]) : i = e), i;
}, _forEachUpdatedRow: function(e) {
  for (var i = this.updatedRows.slice(), t = 0; t < i.length; t++) {
    var r = i[t];
    this.$scheduler.getUserData(r, this.action_param) && e.call(this, r);
  }
}, _prepareItemForJson(e) {
  const i = {}, t = this.$scheduler, r = t.utils.copy(e);
  for (let d in r) {
    let n = r[d];
    d.indexOf("_") !== 0 && (n ? n.getUTCFullYear ? i[d] = t._helpers.formatDate(n) : i[d] = typeof n == "object" ? this._prepareItemForJson(n) : n : n !== void 0 && (i[d] = n));
  }
  return i[this.action_param] = t.getUserData(e.id, this.action_param), i;
}, _prepareItemForForm(e) {
  const i = {}, t = this.$scheduler, r = t.utils.copy(e);
  for (var d in r) {
    let n = r[d];
    d.indexOf("_") !== 0 && (n ? n.getUTCFullYear ? i[d] = t._helpers.formatDate(n) : i[d] = typeof n == "object" ? this._prepareItemForForm(n) : n : i[d] = "");
  }
  return i[this.action_param] = t.getUserData(e.id, this.action_param), i;
}, _prepareDataItem: function(e) {
  return this._serializeAsJson ? this._prepareItemForJson(e) : this._prepareItemForForm(e);
}, _getRowData: function(e) {
  var i = this.$scheduler.getEvent(e);
  return i || (i = { id: e }), this._prepareDataItem(i);
} };
const Kt = { date: { month_full: ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"], month_short: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], day_full: ["الأحد", "الأثنين", "ألثلاثاء", "الأربعاء", "ألحميس", "ألجمعة", "السبت"], day_short: ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"] }, labels: { dhx_cal_today_button: "اليوم", day_tab: "يوم", week_tab: "أسبوع", month_tab: "شهر", new_event: "حدث جديد", icon_save: "اخزن", icon_cancel: "الغاء", icon_details: "تفاصيل", icon_edit: "تحرير", icon_delete: "حذف", confirm_closing: "التغييرات سوف تضيع, هل انت متأكد؟", confirm_deleting: "الحدث سيتم حذفها نهائيا ، هل أنت متأكد؟", section_description: "الوصف", section_time: "الفترة الزمنية", full_day: "طوال اليوم", confirm_recurring: "هل تريد تحرير مجموعة كاملة من الأحداث المتكررة؟", section_recurring: "تكرار الحدث", button_recurring: "تعطيل", button_recurring_open: "تمكين", button_edit_series: "تحرير سلسلة", button_edit_occurrence: "تعديل نسخة", grid_tab: "جدول", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "يومي", repeat_radio_week: "أسبوعي", repeat_radio_month: "شهري", repeat_radio_year: "سنوي", repeat_radio_day_type: "كل", repeat_text_day_count: "يوم", repeat_radio_day_type2: "كل يوم عمل", repeat_week: " تكرار كل", repeat_text_week_count: "أسبوع في الأيام التالية:", repeat_radio_month_type: "تكرار", repeat_radio_month_start: "في", repeat_text_month_day: "يوم كل", repeat_text_month_count: "شهر", repeat_text_month_count2_before: "كل", repeat_text_month_count2_after: "شهر", repeat_year_label: "في", select_year_day2: "من", repeat_text_year_day: "يوم", select_year_month: "شهر", repeat_radio_end: "بدون تاريخ انتهاء", repeat_text_occurences_count: "تكرارات", repeat_radio_end2: "بعد", repeat_radio_end3: "ينتهي في", repeat_never: "أبداً", repeat_daily: "كل يوم", repeat_workdays: "كل يوم عمل", repeat_weekly: "كل أسبوع", repeat_monthly: "كل شهر", repeat_yearly: "كل سنة", repeat_custom: "تخصيص", repeat_freq_day: "يوم", repeat_freq_week: "أسبوع", repeat_freq_month: "شهر", repeat_freq_year: "سنة", repeat_on_date: "في التاريخ", repeat_ends: "ينتهي", month_for_recurring: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"], day_for_recurring: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] } }, Gt = { date: { month_full: ["Студзень", "Люты", "Сакавік", "Красавік", "Maй", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"], month_short: ["Студз", "Лют", "Сак", "Крас", "Maй", "Чэр", "Ліп", "Жнів", "Вер", "Каст", "Ліст", "Снеж"], day_full: ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"], day_short: ["Нд", "Пн", "Аўт", "Ср", "Чцв", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сёння", day_tab: "Дзень", week_tab: "Тыдзень", month_tab: "Месяц", new_event: "Новая падзея", icon_save: "Захаваць", icon_cancel: "Адмяніць", icon_details: "Дэталі", icon_edit: "Змяніць", icon_delete: "Выдаліць", confirm_closing: "", confirm_deleting: "Падзея будзе выдалена незваротна, працягнуць?", section_description: "Апісанне", section_time: "Перыяд часу", full_day: "Увесь дзень", confirm_recurring: "Вы хочаце змяніць усю серыю паўтаральных падзей?", section_recurring: "Паўтарэнне", button_recurring: "Адключана", button_recurring_open: "Уключана", button_edit_series: "Рэдагаваць серыю", button_edit_occurrence: "Рэдагаваць асобнік", agenda_tab: "Спіс", date: "Дата", description: "Апісанне", year_tab: "Год", week_agenda_tab: "Спіс", grid_tab: "Спic", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Дзень", repeat_radio_week: "Тыдзень", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Кожны", repeat_text_day_count: "дзень", repeat_radio_day_type2: "Кожны працоўны дзень", repeat_week: " Паўтараць кожны", repeat_text_week_count: "тыдзень", repeat_radio_month_type: "Паўтараць", repeat_radio_month_start: "", repeat_text_month_day: " чысла кожнага", repeat_text_month_count: "месяцу", repeat_text_month_count2_before: "кожны ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "дзень", select_year_month: "", repeat_radio_end: "Без даты заканчэння", repeat_text_occurences_count: "паўтораў", repeat_radio_end2: "", repeat_radio_end3: "Да ", repeat_never: "Ніколі", repeat_daily: "Кожны дзень", repeat_workdays: "Кожны працоўны дзень", repeat_weekly: "Кожны тыдзень", repeat_monthly: "Кожны месяц", repeat_yearly: "Кожны год", repeat_custom: "Наладжвальны", repeat_freq_day: "Дзень", repeat_freq_week: "Тыдзень", repeat_freq_month: "Месяц", repeat_freq_year: "Год", repeat_on_date: "На дату", repeat_ends: "Заканчваецца", month_for_recurring: ["Студзеня", "Лютага", "Сакавіка", "Красавіка", "Мая", "Чэрвеня", "Ліпeня", "Жніўня", "Верасня", "Кастрычніка", "Лістапада", "Снежня"], day_for_recurring: ["Нядзелю", "Панядзелак", "Аўторак", "Сераду", "Чацвер", "Пятніцу", "Суботу"] } }, Xt = { date: { month_full: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], month_short: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"], day_full: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"], day_short: ["Dg", "Dl", "Dm", "Dc", "Dj", "Dv", "Ds"] }, labels: { dhx_cal_today_button: "Hui", day_tab: "Dia", week_tab: "Setmana", month_tab: "Mes", new_event: "Nou esdeveniment", icon_save: "Guardar", icon_cancel: "Cancel·lar", icon_details: "Detalls", icon_edit: "Editar", icon_delete: "Esborrar", confirm_closing: "", confirm_deleting: "L'esdeveniment s'esborrarà definitivament, continuar ?", section_description: "Descripció", section_time: "Periode de temps", full_day: "Tot el dia", confirm_recurring: "¿Desitja modificar el conjunt d'esdeveniments repetits?", section_recurring: "Repeteixca l'esdeveniment", button_recurring: "Impedit", button_recurring_open: "Permés", button_edit_series: "Edit sèrie", button_edit_occurrence: "Edita Instància", agenda_tab: "Agenda", date: "Data", description: "Descripció", year_tab: "Any", week_agenda_tab: "Agenda", grid_tab: "Taula", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diari", repeat_radio_week: "Setmanal", repeat_radio_month: "Mensual", repeat_radio_year: "Anual", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia", repeat_radio_day_type2: "Cada dia laborable", repeat_week: " Repetir cada", repeat_text_week_count: "setmana els dies següents:", repeat_radio_month_type: "Repetir", repeat_radio_month_start: "El", repeat_text_month_day: "dia cada", repeat_text_month_count: "mes", repeat_text_month_count2_before: "cada", repeat_text_month_count2_after: "mes", repeat_year_label: "El", select_year_day2: "de", repeat_text_year_day: "dia", select_year_month: "mes", repeat_radio_end: "Sense data de finalització", repeat_text_occurences_count: "ocurrències", repeat_radio_end2: "Després", repeat_radio_end3: "Finalitzar el", repeat_never: "Mai", repeat_daily: "Cada dia", repeat_workdays: "Cada dia laborable", repeat_weekly: "Cada setmana", repeat_monthly: "Cada mes", repeat_yearly: "Cada any", repeat_custom: "Personalitzat", repeat_freq_day: "Dia", repeat_freq_week: "Setmana", repeat_freq_month: "Mes", repeat_freq_year: "Any", repeat_on_date: "En la data", repeat_ends: "Finalitza", month_for_recurring: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], day_for_recurring: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"] } }, Zt = { date: { month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], day_short: ["日", "一", "二", "三", "四", "五", "六"] }, labels: { dhx_cal_today_button: "今天", day_tab: "日", week_tab: "周", month_tab: "月", new_event: "新建日程", icon_save: "保存", icon_cancel: "关闭", icon_details: "详细", icon_edit: "编辑", icon_delete: "删除", confirm_closing: "请确认是否撤销修改!", confirm_deleting: "是否删除日程?", section_description: "描述", section_time: "时间范围", full_day: "整天", confirm_recurring: "请确认是否将日程设为重复模式?", section_recurring: "重复周期", button_recurring: "禁用", button_recurring_open: "启用", button_edit_series: "编辑系列", button_edit_occurrence: "编辑实例", agenda_tab: "议程", date: "日期", description: "说明", year_tab: "今年", week_agenda_tab: "议程", grid_tab: "电网", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "按天", repeat_radio_week: "按周", repeat_radio_month: "按月", repeat_radio_year: "按年", repeat_radio_day_type: "每", repeat_text_day_count: "天", repeat_radio_day_type2: "每个工作日", repeat_week: " 重复 每", repeat_text_week_count: "星期的:", repeat_radio_month_type: "重复", repeat_radio_month_start: "在", repeat_text_month_day: "日 每", repeat_text_month_count: "月", repeat_text_month_count2_before: "每", repeat_text_month_count2_after: "月", repeat_year_label: "在", select_year_day2: "的", repeat_text_year_day: "日", select_year_month: "月", repeat_radio_end: "无结束日期", repeat_text_occurences_count: "次结束", repeat_radio_end2: "重复", repeat_radio_end3: "结束于", repeat_never: "从不", repeat_daily: "每天", repeat_workdays: "每个工作日", repeat_weekly: "每周", repeat_monthly: "每月", repeat_yearly: "每年", repeat_custom: "自定义", repeat_freq_day: "天", repeat_freq_week: "周", repeat_freq_month: "月", repeat_freq_year: "年", repeat_on_date: "在日期", repeat_ends: "结束", month_for_recurring: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], day_for_recurring: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] } }, Qt = { date: { month_full: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], month_short: ["Led", "Ún", "Bře", "Dub", "Kvě", "Čer", "Čec", "Srp", "Září", "Říj", "List", "Pro"], day_full: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"], day_short: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Den", week_tab: "Týden", month_tab: "Měsíc", new_event: "Nová událost", icon_save: "Uložit", icon_cancel: "Zpět", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Smazat", confirm_closing: "", confirm_deleting: "Událost bude trvale smazána, opravdu?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Přejete si upravit celou řadu opakovaných událostí?", section_recurring: "Opakování události", button_recurring: "Vypnuto", button_recurring_open: "Zapnuto", button_edit_series: "Edit series", button_edit_occurrence: "Upravit instance", agenda_tab: "Program", date: "Datum", description: "Poznámka", year_tab: "Rok", full_day: "Full day", week_agenda_tab: "Program", grid_tab: "Mřížka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denně", repeat_radio_week: "Týdně", repeat_radio_month: "Měsíčně", repeat_radio_year: "Ročně", repeat_radio_day_type: "každý", repeat_text_day_count: "Den", repeat_radio_day_type2: "pracovní dny", repeat_week: "Opakuje každých", repeat_text_week_count: "Týdnů na:", repeat_radio_month_type: "u každého", repeat_radio_month_start: "na", repeat_text_month_day: "Den každého", repeat_text_month_count: "Měsíc", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "Měsíc", repeat_year_label: "na", select_year_day2: "v", repeat_text_year_day: "Den v", select_year_month: "", repeat_radio_end: "bez data ukončení", repeat_text_occurences_count: "Události", repeat_radio_end2: "po", repeat_radio_end3: "Konec", repeat_never: "Nikdy", repeat_daily: "Každý den", repeat_workdays: "Každý pracovní den", repeat_weekly: "Každý týden", repeat_monthly: "Každý měsíc", repeat_yearly: "Každý rok", repeat_custom: "Vlastní", repeat_freq_day: "Den", repeat_freq_week: "Týden", repeat_freq_month: "Měsíc", repeat_freq_year: "Rok", repeat_on_date: "Na datum", repeat_ends: "Končí", month_for_recurring: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], day_for_recurring: ["Neděle ", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"] } }, ea = { date: { month_full: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uge", month_tab: "Måned", new_event: "Ny begivenhed", icon_save: "Gem", icon_cancel: "Fortryd", icon_details: "Detaljer", icon_edit: "Tilret", icon_delete: "Slet", confirm_closing: "Dine rettelser vil gå tabt.. Er dy sikker?", confirm_deleting: "Bigivenheden vil blive slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du tilrette hele serien af gentagne begivenheder?", section_recurring: "Gentag begivenhed", button_recurring: "Frakoblet", button_recurring_open: "Tilkoblet", button_edit_series: "Rediger serien", button_edit_occurrence: "Rediger en kopi", agenda_tab: "Dagsorden", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Dagsorden", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ugenlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "På hver arbejdsdag", repeat_week: " Gentager sig hver", repeat_text_week_count: "uge på følgende dage:", repeat_radio_month_type: "Hver den", repeat_radio_month_start: "Den", repeat_text_month_day: " i hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen slutdato", repeat_text_occurences_count: "gentagelse", repeat_radio_end2: "Efter", repeat_radio_end3: "Slut", repeat_never: "Aldrig", repeat_daily: "Hver dag", repeat_workdays: "Hver hverdag", repeat_weekly: "Hver uge", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Brugerdefineret", repeat_freq_day: "Dag", repeat_freq_week: "Uge", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, ta = { date: { month_full: [" Januar", " Februar", " März ", " April", " Mai", " Juni", " Juli", " August", " September ", " Oktober", " November ", " Dezember"], month_short: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"], day_full: ["Sonntag", "Montag", "Dienstag", " Mittwoch", " Donnerstag", "Freitag", "Samstag"], day_short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"] }, labels: { dhx_cal_today_button: "Heute", day_tab: "Tag", week_tab: "Woche", month_tab: "Monat", new_event: "neuer Eintrag", icon_save: "Speichern", icon_cancel: "Abbrechen", icon_details: "Details", icon_edit: "Ändern", icon_delete: "Löschen", confirm_closing: "", confirm_deleting: "Der Eintrag wird gelöscht", section_description: "Beschreibung", section_time: "Zeitspanne", full_day: "Ganzer Tag", confirm_recurring: "Wollen Sie alle Einträge bearbeiten oder nur diesen einzelnen Eintrag?", section_recurring: "Wiederholung", button_recurring: "Aus", button_recurring_open: "An", button_edit_series: "Bearbeiten Sie die Serie", button_edit_occurrence: "Bearbeiten Sie eine Kopie", agenda_tab: "Agenda", date: "Datum", description: "Beschreibung", year_tab: "Jahre", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Täglich", repeat_radio_week: "Wöchentlich", repeat_radio_month: "Monatlich", repeat_radio_year: "Jährlich", repeat_radio_day_type: "jeden", repeat_text_day_count: "Tag", repeat_radio_day_type2: "an jedem Arbeitstag", repeat_week: " Wiederholt sich jede", repeat_text_week_count: "Woche am:", repeat_radio_month_type: "an jedem", repeat_radio_month_start: "am", repeat_text_month_day: "Tag eines jeden", repeat_text_month_count: "Monats", repeat_text_month_count2_before: "jeden", repeat_text_month_count2_after: "Monats", repeat_year_label: "am", select_year_day2: "im", repeat_text_year_day: "Tag im", select_year_month: "", repeat_radio_end: "kein Enddatum", repeat_text_occurences_count: "Ereignissen", repeat_radio_end3: "Schluß", repeat_radio_end2: "nach", repeat_never: "Nie", repeat_daily: "Jeden Tag", repeat_workdays: "Jeden Werktag", repeat_weekly: "Jede Woche", repeat_monthly: "Jeden Monat", repeat_yearly: "Jedes Jahr", repeat_custom: "Benutzerdefiniert", repeat_freq_day: "Tag", repeat_freq_week: "Woche", repeat_freq_month: "Monat", repeat_freq_year: "Jahr", repeat_on_date: "Am Datum", repeat_ends: "Endet", month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], day_for_recurring: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"] } }, aa = { date: { month_full: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], month_short: ["ΙΑΝ", "ΦΕΒ", "ΜΑΡ", "ΑΠΡ", "ΜΑΙ", "ΙΟΥΝ", "ΙΟΥΛ", "ΑΥΓ", "ΣΕΠ", "ΟΚΤ", "ΝΟΕ", "ΔΕΚ"], day_full: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"], day_short: ["ΚΥ", "ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ"] }, labels: { dhx_cal_today_button: "Σήμερα", day_tab: "Ημέρα", week_tab: "Εβδομάδα", month_tab: "Μήνας", new_event: "Νέο έργο", icon_save: "Αποθήκευση", icon_cancel: "Άκυρο", icon_details: "Λεπτομέρειες", icon_edit: "Επεξεργασία", icon_delete: "Διαγραφή", confirm_closing: "", confirm_deleting: "Το έργο θα διαγραφεί οριστικά. Θέλετε να συνεχίσετε;", section_description: "Περιγραφή", section_time: "Χρονική περίοδος", full_day: "Πλήρης Ημέρα", confirm_recurring: "Θέλετε να επεξεργασθείτε ολόκληρη την ομάδα των επαναλαμβανόμενων έργων;", section_recurring: "Επαναλαμβανόμενο έργο", button_recurring: "Ανενεργό", button_recurring_open: "Ενεργό", button_edit_series: "Επεξεργαστείτε τη σειρά", button_edit_occurrence: "Επεξεργασία ένα αντίγραφο", agenda_tab: "Ημερήσια Διάταξη", date: "Ημερομηνία", description: "Περιγραφή", year_tab: "Έτος", week_agenda_tab: "Ημερήσια Διάταξη", grid_tab: "Πλέγμα", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Ημερησίως", repeat_radio_week: "Εβδομαδιαίως", repeat_radio_month: "Μηνιαίως", repeat_radio_year: "Ετησίως", repeat_radio_day_type: "Κάθε", repeat_text_day_count: "ημέρα", repeat_radio_day_type2: "Κάθε εργάσιμη", repeat_week: " Επανάληψη κάθε", repeat_text_week_count: "εβδομάδα τις επόμενες ημέρες:", repeat_radio_month_type: "Επανάληψη", repeat_radio_month_start: "Την", repeat_text_month_day: "ημέρα κάθε", repeat_text_month_count: "μήνα", repeat_text_month_count2_before: "κάθε", repeat_text_month_count2_after: "μήνα", repeat_year_label: "Την", select_year_day2: "του", repeat_text_year_day: "ημέρα", select_year_month: "μήνα", repeat_radio_end: "Χωρίς ημερομηνία λήξεως", repeat_text_occurences_count: "επαναλήψεις", repeat_radio_end3: "Λήγει την", repeat_radio_end2: "Μετά από", repeat_never: "Ποτέ", repeat_daily: "Κάθε μέρα", repeat_workdays: "Κάθε εργάσιμη μέρα", repeat_weekly: "Κάθε εβδομάδα", repeat_monthly: "Κάθε μήνα", repeat_yearly: "Κάθε χρόνο", repeat_custom: "Προσαρμοσμένο", repeat_freq_day: "Ημέρα", repeat_freq_week: "Εβδομάδα", repeat_freq_month: "Μήνας", repeat_freq_year: "Χρόνος", repeat_on_date: "Σε ημερομηνία", repeat_ends: "Λήγει", month_for_recurring: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], day_for_recurring: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"] } }, na = { date: { month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }, labels: { dhx_cal_today_button: "Today", day_tab: "Day", week_tab: "Week", month_tab: "Month", new_event: "New event", icon_save: "Save", icon_cancel: "Cancel", icon_details: "Details", icon_edit: "Edit", icon_delete: "Delete", confirm_closing: "", confirm_deleting: "Event will be deleted permanently, are you sure?", section_description: "Description", section_time: "Time period", full_day: "Full day", confirm_recurring: "Do you want to edit the whole set of repeated events?", section_recurring: "Repeat event", button_recurring: "Disabled", button_recurring_open: "Enabled", button_edit_series: "Edit series", button_edit_occurrence: "Edit occurrence", agenda_tab: "Agenda", date: "Date", description: "Description", year_tab: "Year", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daily", repeat_radio_week: "Weekly", repeat_radio_month: "Monthly", repeat_radio_year: "Yearly", repeat_radio_day_type: "Every", repeat_text_day_count: "day", repeat_radio_day_type2: "Every workday", repeat_week: " Repeat every", repeat_text_week_count: "week next days:", repeat_radio_month_type: "Repeat", repeat_radio_month_start: "On", repeat_text_month_day: "day every", repeat_text_month_count: "month", repeat_text_month_count2_before: "every", repeat_text_month_count2_after: "month", repeat_year_label: "On", select_year_day2: "of", repeat_text_year_day: "day", select_year_month: "month", repeat_radio_end: "No end date", repeat_text_occurences_count: "occurrences", repeat_radio_end2: "After", repeat_radio_end3: "End by", repeat_never: "Never", repeat_daily: "Every day", repeat_workdays: "Every weekday", repeat_weekly: "Every week", repeat_monthly: "Every month", repeat_yearly: "Every year", repeat_custom: "Custom", repeat_freq_day: "Day", repeat_freq_week: "Week", repeat_freq_month: "Month", repeat_freq_year: "Year", repeat_on_date: "On date", repeat_ends: "Ends", month_for_recurring: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] } }, ra = { date: { month_full: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], month_short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], day_full: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], day_short: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] }, labels: { dhx_cal_today_button: "Hoy", day_tab: "Día", week_tab: "Semana", month_tab: "Mes", new_event: "Nuevo evento", icon_save: "Guardar", icon_cancel: "Cancelar", icon_details: "Detalles", icon_edit: "Editar", icon_delete: "Eliminar", confirm_closing: "", confirm_deleting: "El evento se borrará definitivamente, ¿continuar?", section_description: "Descripción", section_time: "Período", full_day: "Todo el día", confirm_recurring: "¿Desea modificar el conjunto de eventos repetidos?", section_recurring: "Repita el evento", button_recurring: "Impedido", button_recurring_open: "Permitido", button_edit_series: "Editar la serie", button_edit_occurrence: "Editar este evento", agenda_tab: "Día", date: "Fecha", description: "Descripción", year_tab: "Año", week_agenda_tab: "Día", grid_tab: "Reja", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diariamente", repeat_radio_week: "Semanalmente", repeat_radio_month: "Mensualmente", repeat_radio_year: "Anualmente", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia", repeat_radio_day_type2: "Cada jornada de trabajo", repeat_week: " Repetir cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repita", repeat_radio_month_start: "El", repeat_text_month_day: "dia cada ", repeat_text_month_count: "mes", repeat_text_month_count2_before: "cada", repeat_text_month_count2_after: "mes", repeat_year_label: "El", select_year_day2: "del", repeat_text_year_day: "dia", select_year_month: "mes", repeat_radio_end: "Sin fecha de finalización", repeat_text_occurences_count: "ocurrencias", repeat_radio_end3: "Fin", repeat_radio_end2: "Después de", repeat_never: "Nunca", repeat_daily: "Cada día", repeat_workdays: "Cada día laborable", repeat_weekly: "Cada semana", repeat_monthly: "Cada mes", repeat_yearly: "Cada año", repeat_custom: "Personalizado", repeat_freq_day: "Día", repeat_freq_week: "Semana", repeat_freq_month: "Mes", repeat_freq_year: "Año", repeat_on_date: "En la fecha", repeat_ends: "Termina", month_for_recurring: ["Enero", "Febrero", "Маrzo", "Аbril", "Mayo", "Junio", "Julio", "Аgosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"], day_for_recurring: ["Domingo", "Lunes", "Martes", "Miércoles", "Jeuves", "Viernes", "Sabado"] } }, ia = { date: { month_full: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], month_short: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou"], day_full: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"], day_short: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"] }, labels: { dhx_cal_today_button: "Tänään", day_tab: "Päivä", week_tab: "Viikko", month_tab: "Kuukausi", new_event: "Uusi tapahtuma", icon_save: "Tallenna", icon_cancel: "Peru", icon_details: "Tiedot", icon_edit: "Muokkaa", icon_delete: "Poista", confirm_closing: "", confirm_deleting: "Haluatko varmasti poistaa tapahtuman?", section_description: "Kuvaus", section_time: "Aikajakso", full_day: "Koko päivä", confirm_recurring: "Haluatko varmasti muokata toistuvan tapahtuman kaikkia jaksoja?", section_recurring: "Toista tapahtuma", button_recurring: "Ei k&auml;yt&ouml;ss&auml;", button_recurring_open: "K&auml;yt&ouml;ss&auml;", button_edit_series: "Muokkaa sarja", button_edit_occurrence: "Muokkaa kopio", agenda_tab: "Esityslista", date: "Päivämäärä", description: "Kuvaus", year_tab: "Vuoden", week_agenda_tab: "Esityslista", grid_tab: "Ritilä", drag_to_create: "Luo uusi vetämällä", drag_to_move: "Siirrä vetämällä", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "P&auml;ivitt&auml;in", repeat_radio_week: "Viikoittain", repeat_radio_month: "Kuukausittain", repeat_radio_year: "Vuosittain", repeat_radio_day_type: "Joka", repeat_text_day_count: "p&auml;iv&auml;", repeat_radio_day_type2: "Joka arkip&auml;iv&auml;", repeat_week: "Toista joka", repeat_text_week_count: "viikko n&auml;in&auml; p&auml;ivin&auml;:", repeat_radio_month_type: "Toista", repeat_radio_month_start: "", repeat_text_month_day: "p&auml;iv&auml;n&auml; joka", repeat_text_month_count: "kuukausi", repeat_text_month_count2_before: "joka", repeat_text_month_count2_after: "kuukausi", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "p&auml;iv&auml;", select_year_month: "kuukausi", repeat_radio_end: "Ei loppumisaikaa", repeat_text_occurences_count: "Toiston j&auml;lkeen", repeat_radio_end3: "Loppuu", repeat_radio_end2: "", repeat_never: "Ei koskaan", repeat_daily: "Joka päivä", repeat_workdays: "Joka arkipäivä", repeat_weekly: "Joka viikko", repeat_monthly: "Joka kuukausi", repeat_yearly: "Joka vuosi", repeat_custom: "Mukautettu", repeat_freq_day: "Päivä", repeat_freq_week: "Viikko", repeat_freq_month: "Kuukausi", repeat_freq_year: "Vuosi", repeat_on_date: "Tiettynä päivänä", repeat_ends: "Päättyy", month_for_recurring: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], day_for_recurring: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"] } }, oa = { date: { month_full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], month_short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"], day_full: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"], day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"] }, labels: { dhx_cal_today_button: "Aujourd'hui", day_tab: "Jour", week_tab: "Semaine", month_tab: "Mois", new_event: "Nouvel événement", icon_save: "Enregistrer", icon_cancel: "Annuler", icon_details: "Détails", icon_edit: "Modifier", icon_delete: "Effacer", confirm_closing: "", confirm_deleting: "L'événement sera effacé sans appel, êtes-vous sûr ?", section_description: "Description", section_time: "Période", full_day: "Journée complète", confirm_recurring: "Voulez-vous éditer toute une série d'évènements répétés?", section_recurring: "Périodicité", button_recurring: "Désactivé", button_recurring_open: "Activé", button_edit_series: "Modifier la série", button_edit_occurrence: "Modifier une copie", agenda_tab: "Jour", date: "Date", description: "Description", year_tab: "Année", week_agenda_tab: "Jour", grid_tab: "Grille", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidienne", repeat_radio_week: "Hebdomadaire", repeat_radio_month: "Mensuelle", repeat_radio_year: "Annuelle", repeat_radio_day_type: "Chaque", repeat_text_day_count: "jour", repeat_radio_day_type2: "Chaque journée de travail", repeat_week: " Répéter toutes les", repeat_text_week_count: "semaine:", repeat_radio_month_type: "Répéter", repeat_radio_month_start: "Le", repeat_text_month_day: "jour chaque", repeat_text_month_count: "mois", repeat_text_month_count2_before: "chaque", repeat_text_month_count2_after: "mois", repeat_year_label: "Le", select_year_day2: "du", repeat_text_year_day: "jour", select_year_month: "mois", repeat_radio_end: "Pas de date d&quot;achèvement", repeat_text_occurences_count: "occurrences", repeat_radio_end3: "Fin", repeat_radio_end2: "Après", repeat_never: "Jamais", repeat_daily: "Chaque jour", repeat_workdays: "Chaque jour ouvrable", repeat_weekly: "Chaque semaine", repeat_monthly: "Chaque mois", repeat_yearly: "Chaque année", repeat_custom: "Personnalisé", repeat_freq_day: "Jour", repeat_freq_week: "Semaine", repeat_freq_month: "Mois", repeat_freq_year: "Année", repeat_on_date: "À la date", repeat_ends: "Se termine", month_for_recurring: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], day_for_recurring: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"] } }, sa = { date: { month_full: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], month_short: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"], day_full: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"], day_short: ["א", "ב", "ג", "ד", "ה", "ו", "ש"] }, labels: { dhx_cal_today_button: "היום", day_tab: "יום", week_tab: "שבוע", month_tab: "חודש", new_event: "ארוע חדש", icon_save: "שמור", icon_cancel: "בטל", icon_details: "פרטים", icon_edit: "ערוך", icon_delete: "מחק", confirm_closing: "", confirm_deleting: "ארוע ימחק סופית.להמשיך?", section_description: "תיאור", section_time: "תקופה", confirm_recurring: "האם ברצונך לשנות כל סדרת ארועים מתמשכים?", section_recurring: "להעתיק ארוע", button_recurring: "לא פעיל", button_recurring_open: "פעיל", full_day: "יום שלם", button_edit_series: "ערוך את הסדרה", button_edit_occurrence: "עריכת עותק", agenda_tab: "סדר יום", date: "תאריך", description: "תיאור", year_tab: "לשנה", week_agenda_tab: "סדר יום", grid_tab: "סורג", drag_to_create: "Drag to create", drag_to_move: "גרור כדי להזיז", message_ok: "OK", message_cancel: "בטל", next: "הבא", prev: "הקודם", year: "שנה", month: "חודש", day: "יום", hour: "שעה", minute: "דקה", repeat_radio_day: "יומי", repeat_radio_week: "שבועי", repeat_radio_month: "חודשי", repeat_radio_year: "שנתי", repeat_radio_day_type: "חזור כל", repeat_text_day_count: "ימים", repeat_radio_day_type2: "חזור כל יום עבודה", repeat_week: " חזור כל", repeat_text_week_count: "שבוע לפי ימים:", repeat_radio_month_type: "חזור כל", repeat_radio_month_start: "כל", repeat_text_month_day: "ימים כל", repeat_text_month_count: "חודשים", repeat_text_month_count2_before: "חזור כל", repeat_text_month_count2_after: "חודש", repeat_year_label: "כל", select_year_day2: "בחודש", repeat_text_year_day: "ימים", select_year_month: "חודש", repeat_radio_end: "לעולם לא מסתיים", repeat_text_occurences_count: "אירועים", repeat_radio_end3: "מסתיים ב", repeat_radio_end2: "אחרי", repeat_never: "אף פעם", repeat_daily: "כל יום", repeat_workdays: "כל יום עבודה", repeat_weekly: "כל שבוע", repeat_monthly: "כל חודש", repeat_yearly: "כל שנה", repeat_custom: "מותאם אישית", repeat_freq_day: "יום", repeat_freq_week: "שבוע", repeat_freq_month: "חודש", repeat_freq_year: "שנה", repeat_on_date: "בתאריך", repeat_ends: "מסתיים", month_for_recurring: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], day_for_recurring: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"] } }, da = { date: { month_full: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"], month_short: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Vasárnap", "Hétfõ", "Kedd", "Szerda", "Csütörtök", "Péntek", "szombat"], day_short: ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"] }, labels: { dhx_cal_today_button: "Ma", day_tab: "Nap", week_tab: "Hét", month_tab: "Hónap", new_event: "Új esemény", icon_save: "Mentés", icon_cancel: "Mégse", icon_details: "Részletek", icon_edit: "Szerkesztés", icon_delete: "Törlés", confirm_closing: "", confirm_deleting: "Az esemény törölve lesz, biztosan folytatja?", section_description: "Leírás", section_time: "Idõszak", full_day: "Egesz napos", confirm_recurring: "Biztosan szerkeszteni akarod az összes ismétlõdõ esemény beállítását?", section_recurring: "Esemény ismétlése", button_recurring: "Tiltás", button_recurring_open: "Engedélyezés", button_edit_series: "Edit series", button_edit_occurrence: "Szerkesztés bíróság", agenda_tab: "Napirend", date: "Dátum", description: "Leírás", year_tab: "Év", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Napi", repeat_radio_week: "Heti", repeat_radio_month: "Havi", repeat_radio_year: "Éves", repeat_radio_day_type: "Minden", repeat_text_day_count: "nap", repeat_radio_day_type2: "Minden munkanap", repeat_week: " Ismételje meg minden", repeat_text_week_count: "héten a következő napokon:", repeat_radio_month_type: "Ismétlés", repeat_radio_month_start: "Ekkor", repeat_text_month_day: "nap minden", repeat_text_month_count: "hónapban", repeat_text_month_count2_before: "minden", repeat_text_month_count2_after: "hónapban", repeat_year_label: "Ekkor", select_year_day2: "-án/-én", repeat_text_year_day: "nap", select_year_month: "hónap", repeat_radio_end: "Nincs befejezési dátum", repeat_text_occurences_count: "esemény", repeat_radio_end2: "Után", repeat_radio_end3: "Befejező dátum", repeat_never: "Soha", repeat_daily: "Minden nap", repeat_workdays: "Minden munkanap", repeat_weekly: "Minden héten", repeat_monthly: "Minden hónapban", repeat_yearly: "Minden évben", repeat_custom: "Egyedi", repeat_freq_day: "Nap", repeat_freq_week: "Hét", repeat_freq_month: "Hónap", repeat_freq_year: "Év", repeat_on_date: "Dátum szerint", repeat_ends: "Befejeződik", month_for_recurring: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"], day_for_recurring: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"] } }, _a = { date: { month_full: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"], day_full: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"], day_short: ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] }, labels: { dhx_cal_today_button: "Hari Ini", day_tab: "Hari", week_tab: "Minggu", month_tab: "Bulan", new_event: "Acara Baru", icon_save: "Simpan", icon_cancel: "Batal", icon_details: "Detail", icon_edit: "Edit", icon_delete: "Hapus", confirm_closing: "", confirm_deleting: "Acara akan dihapus", section_description: "Keterangan", section_time: "Periode", full_day: "Hari penuh", confirm_recurring: "Apakah acara ini akan berulang?", section_recurring: "Acara Rutin", button_recurring: "Tidak Difungsikan", button_recurring_open: "Difungsikan", button_edit_series: "Mengedit seri", button_edit_occurrence: "Mengedit salinan", agenda_tab: "Agenda", date: "Tanggal", description: "Keterangan", year_tab: "Tahun", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Harian", repeat_radio_week: "Mingguan", repeat_radio_month: "Bulanan", repeat_radio_year: "Tahunan", repeat_radio_day_type: "Setiap", repeat_text_day_count: "hari", repeat_radio_day_type2: "Setiap hari kerja", repeat_week: " Ulangi setiap", repeat_text_week_count: "minggu pada hari berikut:", repeat_radio_month_type: "Ulangi", repeat_radio_month_start: "Pada", repeat_text_month_day: "hari setiap", repeat_text_month_count: "bulan", repeat_text_month_count2_before: "setiap", repeat_text_month_count2_after: "bulan", repeat_year_label: "Pada", select_year_day2: "dari", repeat_text_year_day: "hari", select_year_month: "bulan", repeat_radio_end: "Tanpa tanggal akhir", repeat_text_occurences_count: "kejadian", repeat_radio_end2: "Setelah", repeat_radio_end3: "Berakhir pada", repeat_never: "Tidak pernah", repeat_daily: "Setiap hari", repeat_workdays: "Setiap hari kerja", repeat_weekly: "Setiap minggu", repeat_monthly: "Setiap bulan", repeat_yearly: "Setiap tahun", repeat_custom: "Kustom", repeat_freq_day: "Hari", repeat_freq_week: "Minggu", repeat_freq_month: "Bulan", repeat_freq_year: "Tahun", repeat_on_date: "Pada tanggal", repeat_ends: "Berakhir", month_for_recurring: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] } }, la = { date: { month_full: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], month_short: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"], day_full: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"], day_short: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"] }, labels: { dhx_cal_today_button: "Oggi", day_tab: "Giorno", week_tab: "Settimana", month_tab: "Mese", new_event: "Nuovo evento", icon_save: "Salva", icon_cancel: "Chiudi", icon_details: "Dettagli", icon_edit: "Modifica", icon_delete: "Elimina", confirm_closing: "", confirm_deleting: "L'evento sarà eliminato, siete sicuri?", section_description: "Descrizione", section_time: "Periodo di tempo", full_day: "Intera giornata", confirm_recurring: "Vuoi modificare l'intera serie di eventi?", section_recurring: "Ripetere l'evento", button_recurring: "Disattivato", button_recurring_open: "Attivato", button_edit_series: "Modificare la serie", button_edit_occurrence: "Modificare una copia", agenda_tab: "Agenda", date: "Data", description: "Descrizione", year_tab: "Anno", week_agenda_tab: "Agenda", grid_tab: "Griglia", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Quotidiano", repeat_radio_week: "Settimanale", repeat_radio_month: "Mensile", repeat_radio_year: "Annuale", repeat_radio_day_type: "Ogni", repeat_text_day_count: "giorno", repeat_radio_day_type2: "Ogni giornata lavorativa", repeat_week: " Ripetere ogni", repeat_text_week_count: "settimana:", repeat_radio_month_type: "Ripetere", repeat_radio_month_start: "Il", repeat_text_month_day: "giorno ogni", repeat_text_month_count: "mese", repeat_text_month_count2_before: "ogni", repeat_text_month_count2_after: "mese", repeat_year_label: "Il", select_year_day2: "del", repeat_text_year_day: "giorno", select_year_month: "mese", repeat_radio_end: "Senza data finale", repeat_text_occurences_count: "occorenze", repeat_radio_end3: "Fine", repeat_radio_end2: "Dopo", repeat_never: "Mai", repeat_daily: "Ogni giorno", repeat_workdays: "Ogni giorno feriale", repeat_weekly: "Ogni settimana", repeat_monthly: "Ogni mese", repeat_yearly: "Ogni anno", repeat_custom: "Personalizzato", repeat_freq_day: "Giorno", repeat_freq_week: "Settimana", repeat_freq_month: "Mese", repeat_freq_year: "Anno", repeat_on_date: "Alla data", repeat_ends: "Finisce", month_for_recurring: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Jiugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], day_for_recurring: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Jovedì", "Venerdì", "Sabato"] } }, ca = { date: { month_full: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_full: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"], day_short: ["日", "月", "火", "水", "木", "金", "土"] }, labels: { dhx_cal_today_button: "今日", day_tab: "日", week_tab: "週", month_tab: "月", new_event: "新イベント", icon_save: "保存", icon_cancel: "キャンセル", icon_details: "詳細", icon_edit: "編集", icon_delete: "削除", confirm_closing: "", confirm_deleting: "イベント完全に削除されます、宜しいですか？", section_description: "デスクリプション", section_time: "期間", confirm_recurring: "繰り返されているイベントを全て編集しますか？", section_recurring: "イベントを繰り返す", button_recurring: "無効", button_recurring_open: "有効", full_day: "終日", button_edit_series: "シリーズを編集します", button_edit_occurrence: "コピーを編集", agenda_tab: "議題は", date: "日付", description: "説明", year_tab: "今年", week_agenda_tab: "議題は", grid_tab: "グリッド", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "毎日", repeat_radio_week: "毎週", repeat_radio_month: "毎月", repeat_radio_year: "毎年", repeat_radio_day_type: "毎", repeat_text_day_count: "日", repeat_radio_day_type2: "毎営業日", repeat_week: " 繰り返し毎", repeat_text_week_count: "週 次の日:", repeat_radio_month_type: "繰り返し", repeat_radio_month_start: "オン", repeat_text_month_day: "日毎", repeat_text_month_count: "月", repeat_text_month_count2_before: "毎", repeat_text_month_count2_after: "月", repeat_year_label: "オン", select_year_day2: "の", repeat_text_year_day: "日", select_year_month: "月", repeat_radio_end: "終了日なし", repeat_text_occurences_count: "回数", repeat_radio_end2: "後", repeat_radio_end3: "終了日まで", repeat_never: "決して", repeat_daily: "毎日", repeat_workdays: "毎営業日", repeat_weekly: "毎週", repeat_monthly: "毎月", repeat_yearly: "毎年", repeat_custom: "カスタム", repeat_freq_day: "日", repeat_freq_week: "週", repeat_freq_month: "月", repeat_freq_year: "年", repeat_on_date: "日にち", repeat_ends: "終了", month_for_recurring: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], day_for_recurring: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"] } };
class ha {
  constructor(i) {
    this._locales = {};
    for (const t in i)
      this._locales[t] = i[t];
  }
  addLocale(i, t) {
    this._locales[i] = t;
  }
  getLocale(i) {
    return this._locales[i];
  }
}
const ua = { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Mon", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "I dag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny hendelse", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Rediger", icon_delete: "Slett", confirm_closing: "", confirm_deleting: "Hendelsen vil bli slettet permanent. Er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", confirm_recurring: "Vil du forandre hele dette settet av repeterende hendelser?", section_recurring: "Repeter hendelsen", button_recurring: "Av", button_recurring_open: "På", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ukentlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "Alle hverdager", repeat_week: " Gjentas hver", repeat_text_week_count: "uke på:", repeat_radio_month_type: "På hver", repeat_radio_month_start: "På", repeat_text_month_day: "dag hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "på", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "", repeat_radio_end: "Ingen sluttdato", repeat_text_occurences_count: "forekomst", repeat_radio_end3: "Stop den", repeat_radio_end2: "Etter", repeat_never: "Aldri", repeat_daily: "Hver dag", repeat_workdays: "Hver ukedag", repeat_weekly: "Hver uke", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Tilpasset", repeat_freq_day: "Dag", repeat_freq_week: "Uke", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Sondag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, fa = { date: { month_full: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"], day_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"] }, labels: { dhx_cal_today_button: "Vandaag", day_tab: "Dag", week_tab: "Week", month_tab: "Maand", new_event: "Nieuw item", icon_save: "Opslaan", icon_cancel: "Annuleren", icon_details: "Details", icon_edit: "Bewerken", icon_delete: "Verwijderen", confirm_closing: "", confirm_deleting: "Item zal permanent worden verwijderd, doorgaan?", section_description: "Beschrijving", section_time: "Tijd periode", full_day: "Hele dag", confirm_recurring: "Wilt u alle terugkerende items bijwerken?", section_recurring: "Item herhalen", button_recurring: "Uit", button_recurring_open: "Aan", button_edit_series: "Bewerk de serie", button_edit_occurrence: "Bewerk een kopie", agenda_tab: "Agenda", date: "Datum", description: "Omschrijving", year_tab: "Jaar", week_agenda_tab: "Agenda", grid_tab: "Tabel", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagelijks", repeat_radio_week: "Wekelijks", repeat_radio_month: "Maandelijks", repeat_radio_year: "Jaarlijks", repeat_radio_day_type: "Elke", repeat_text_day_count: "dag(en)", repeat_radio_day_type2: "Elke werkdag", repeat_week: " Herhaal elke", repeat_text_week_count: "week op de volgende dagen:", repeat_radio_month_type: "Herhaal", repeat_radio_month_start: "Op", repeat_text_month_day: "dag iedere", repeat_text_month_count: "maanden", repeat_text_month_count2_before: "iedere", repeat_text_month_count2_after: "maanden", repeat_year_label: "Op", select_year_day2: "van", repeat_text_year_day: "dag", select_year_month: "maand", repeat_radio_end: "Geen eind datum", repeat_text_occurences_count: "keren", repeat_radio_end3: "Eindigd per", repeat_radio_end2: "Na", repeat_never: "Nooit", repeat_daily: "Elke dag", repeat_workdays: "Elke werkdag", repeat_weekly: "Elke week", repeat_monthly: "Elke maand", repeat_yearly: "Elk jaar", repeat_custom: "Aangepast", repeat_freq_day: "Dag", repeat_freq_week: "Week", repeat_freq_month: "Maand", repeat_freq_year: "Jaar", repeat_on_date: "Op datum", repeat_ends: "Eindigt", month_for_recurring: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], day_for_recurring: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"] } }, pa = { date: { month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"], day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Uke", month_tab: "Måned", new_event: "Ny", icon_save: "Lagre", icon_cancel: "Avbryt", icon_details: "Detaljer", icon_edit: "Endre", icon_delete: "Slett", confirm_closing: "Endringer blir ikke lagret, er du sikker?", confirm_deleting: "Oppføringen vil bli slettet, er du sikker?", section_description: "Beskrivelse", section_time: "Tidsperiode", full_day: "Full dag", confirm_recurring: "Vil du endre hele settet med repeterende oppføringer?", section_recurring: "Repeterende oppføring", button_recurring: "Ikke aktiv", button_recurring_open: "Aktiv", button_edit_series: "Rediger serien", button_edit_occurrence: "Redigere en kopi", agenda_tab: "Agenda", date: "Dato", description: "Beskrivelse", year_tab: "År", week_agenda_tab: "Agenda", grid_tab: "Grid", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Daglig", repeat_radio_week: "Ukentlig", repeat_radio_month: "Månedlig", repeat_radio_year: "Årlig", repeat_radio_day_type: "Hver", repeat_text_day_count: "dag", repeat_radio_day_type2: "Hver arbeidsdag", repeat_week: " Gjenta hver", repeat_text_week_count: "uke neste dager:", repeat_radio_month_type: "Gjenta", repeat_radio_month_start: "På", repeat_text_month_day: "dag hver", repeat_text_month_count: "måned", repeat_text_month_count2_before: "hver", repeat_text_month_count2_after: "måned", repeat_year_label: "På", select_year_day2: "av", repeat_text_year_day: "dag", select_year_month: "måned", repeat_radio_end: "Ingen sluttdato", repeat_text_occurences_count: "forekomster", repeat_radio_end2: "Etter", repeat_radio_end3: "Slutt innen", repeat_never: "Aldri", repeat_daily: "Hver dag", repeat_workdays: "Hver ukedag", repeat_weekly: "Hver uke", repeat_monthly: "Hver måned", repeat_yearly: "Hvert år", repeat_custom: "Tilpasset", repeat_freq_day: "Dag", repeat_freq_week: "Uke", repeat_freq_month: "Måned", repeat_freq_year: "År", repeat_on_date: "På dato", repeat_ends: "Slutter", month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"] } }, ma = { date: { month_full: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"], month_short: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"], day_full: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"], day_short: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"] }, labels: { dhx_cal_today_button: "Dziś", day_tab: "Dzień", week_tab: "Tydzień", month_tab: "Miesiąc", new_event: "Nowe zdarzenie", icon_save: "Zapisz", icon_cancel: "Anuluj", icon_details: "Szczegóły", icon_edit: "Edytuj", icon_delete: "Usuń", confirm_closing: "", confirm_deleting: "Zdarzenie zostanie usunięte na zawsze, kontynuować?", section_description: "Opis", section_time: "Okres czasu", full_day: "Cały dzień", confirm_recurring: "Czy chcesz edytować cały zbiór powtarzających się zdarzeń?", section_recurring: "Powtórz zdarzenie", button_recurring: "Nieaktywne", button_recurring_open: "Aktywne", button_edit_series: "Edytuj serię", button_edit_occurrence: "Edytuj kopię", agenda_tab: "Agenda", date: "Data", description: "Opis", year_tab: "Rok", week_agenda_tab: "Agenda", grid_tab: "Tabela", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Codziennie", repeat_radio_week: "Co tydzie", repeat_radio_month: "Co miesic", repeat_radio_year: "Co rok", repeat_radio_day_type: "Kadego", repeat_text_day_count: "dnia", repeat_radio_day_type2: "Kadego dnia roboczego", repeat_week: " Powtarzaj kadego", repeat_text_week_count: "tygodnia w dni:", repeat_radio_month_type: "Powtrz", repeat_radio_month_start: "W", repeat_text_month_day: "dnia kadego", repeat_text_month_count: "miesica", repeat_text_month_count2_before: "kadego", repeat_text_month_count2_after: "miesica", repeat_year_label: "W", select_year_day2: "miesica", repeat_text_year_day: "dnia miesica", select_year_month: "", repeat_radio_end: "Bez daty kocowej", repeat_text_occurences_count: "wystpieniu/ach", repeat_radio_end3: "Zakocz w", repeat_radio_end2: "Po", repeat_never: "Nigdy", repeat_daily: "Codziennie", repeat_workdays: "Każdy dzień roboczy", repeat_weekly: "Co tydzień", repeat_monthly: "Co miesiąc", repeat_yearly: "Co rok", repeat_custom: "Niestandardowy", repeat_freq_day: "Dzień", repeat_freq_week: "Tydzień", repeat_freq_month: "Miesiąc", repeat_freq_year: "Rok", repeat_on_date: "W dniu", repeat_ends: "Kończy się", month_for_recurring: ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Wrzenia", "Padziernka", "Listopada", "Grudnia"], day_for_recurring: ["Niedziela", "Poniedziaek", "Wtorek", "roda", "Czwartek", "Pitek", "Sobota"] } }, va = { date: { month_full: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], month_short: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], day_full: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"], day_short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"] }, labels: { dhx_cal_today_button: "Hoje", day_tab: "Dia", week_tab: "Semana", month_tab: "Mês", new_event: "Novo evento", icon_save: "Salvar", icon_cancel: "Cancelar", icon_details: "Detalhes", icon_edit: "Editar", icon_delete: "Deletar", confirm_closing: "", confirm_deleting: "Tem certeza que deseja excluir?", section_description: "Descrição", section_time: "Período de tempo", full_day: "Dia inteiro", confirm_recurring: "Deseja editar todos esses eventos repetidos?", section_recurring: "Repetir evento", button_recurring: "Desabilitar", button_recurring_open: "Habilitar", button_edit_series: "Editar a série", button_edit_occurrence: "Editar uma cópia", agenda_tab: "Dia", date: "Data", description: "Descrição", year_tab: "Ano", week_agenda_tab: "Dia", grid_tab: "Grade", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Diário", repeat_radio_week: "Semanal", repeat_radio_month: "Mensal", repeat_radio_year: "Anual", repeat_radio_day_type: "Cada", repeat_text_day_count: "dia(s)", repeat_radio_day_type2: "Cada trabalho diário", repeat_week: " Repita cada", repeat_text_week_count: "semana:", repeat_radio_month_type: "Repetir", repeat_radio_month_start: "Em", repeat_text_month_day: "todo dia", repeat_text_month_count: "mês", repeat_text_month_count2_before: "todo", repeat_text_month_count2_after: "mês", repeat_year_label: "Em", select_year_day2: "of", repeat_text_year_day: "dia", select_year_month: "mês", repeat_radio_end: "Sem data final", repeat_text_occurences_count: "ocorrências", repeat_radio_end3: "Fim", repeat_radio_end2: "Depois", repeat_never: "Nunca", repeat_daily: "Todos os dias", repeat_workdays: "Todos os dias úteis", repeat_weekly: "Toda semana", repeat_monthly: "Todo mês", repeat_yearly: "Todo ano", repeat_custom: "Personalizado", repeat_freq_day: "Dia", repeat_freq_week: "Semana", repeat_freq_month: "Mês", repeat_freq_year: "Ano", repeat_on_date: "Na data", repeat_ends: "Termina", month_for_recurring: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], day_for_recurring: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] } }, ga = { date: { month_full: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "November", "December"], month_short: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"], day_full: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"], day_short: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"] }, labels: { dhx_cal_today_button: "Astazi", day_tab: "Zi", week_tab: "Saptamana", month_tab: "Luna", new_event: "Eveniment nou", icon_save: "Salveaza", icon_cancel: "Anuleaza", icon_details: "Detalii", icon_edit: "Editeaza", icon_delete: "Sterge", confirm_closing: "Schimbarile nu vor fi salvate, esti sigur?", confirm_deleting: "Evenimentul va fi sters permanent, esti sigur?", section_description: "Descriere", section_time: "Interval", full_day: "Toata ziua", confirm_recurring: "Vrei sa editezi toata seria de evenimente repetate?", section_recurring: "Repetare", button_recurring: "Dezactivata", button_recurring_open: "Activata", button_edit_series: "Editeaza serie", button_edit_occurrence: "Editeaza doar intrare", agenda_tab: "Agenda", date: "Data", description: "Descriere", year_tab: "An", week_agenda_tab: "Agenda", grid_tab: "Lista", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Zilnic", repeat_radio_week: "Saptamanal", repeat_radio_month: "Lunar", repeat_radio_year: "Anual", repeat_radio_day_type: "La fiecare", repeat_text_day_count: "zi(le)", repeat_radio_day_type2: "Fiecare zi lucratoare", repeat_week: " Repeta la fiecare", repeat_text_week_count: "saptamana in urmatoarele zile:", repeat_radio_month_type: "Repeta in", repeat_radio_month_start: "In a", repeat_text_month_day: "zi la fiecare", repeat_text_month_count: "luni", repeat_text_month_count2_before: "la fiecare", repeat_text_month_count2_after: "luni", repeat_year_label: "In", select_year_day2: "a lunii", repeat_text_year_day: "zi a lunii", select_year_month: "", repeat_radio_end: "Fara data de sfarsit", repeat_text_occurences_count: "evenimente", repeat_radio_end3: "La data", repeat_radio_end2: "Dupa", repeat_never: "Niciodată", repeat_daily: "În fiecare zi", repeat_workdays: "În fiecare zi lucrătoare", repeat_weekly: "În fiecare săptămână", repeat_monthly: "În fiecare lună", repeat_yearly: "În fiecare an", repeat_custom: "Personalizat", repeat_freq_day: "Zi", repeat_freq_week: "Săptămână", repeat_freq_month: "Lună", repeat_freq_year: "An", repeat_on_date: "La data", repeat_ends: "Se termină", month_for_recurring: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"], day_for_recurring: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"] } }, ya = { date: { month_full: ["Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь", "Июль", "Август", "Сентябрь", "Oктябрь", "Ноябрь", "Декабрь"], month_short: ["Янв", "Фев", "Maр", "Aпр", "Maй", "Июн", "Июл", "Aвг", "Сен", "Окт", "Ноя", "Дек"], day_full: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] }, labels: { dhx_cal_today_button: "Сегодня", day_tab: "День", week_tab: "Неделя", month_tab: "Месяц", new_event: "Новое событие", icon_save: "Сохранить", icon_cancel: "Отменить", icon_details: "Детали", icon_edit: "Изменить", icon_delete: "Удалить", confirm_closing: "", confirm_deleting: "Событие будет удалено безвозвратно, продолжить?", section_description: "Описание", section_time: "Период времени", full_day: "Весь день", confirm_recurring: "Вы хотите изменить всю серию повторяющихся событий?", section_recurring: "Повторение", button_recurring: "Отключено", button_recurring_open: "Включено", button_edit_series: "Редактировать серию", button_edit_occurrence: "Редактировать экземпляр", agenda_tab: "Список", date: "Дата", description: "Описание", year_tab: "Год", week_agenda_tab: "Список", grid_tab: "Таблица", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Неделя", repeat_radio_month: "Месяц", repeat_radio_year: "Год", repeat_radio_day_type: "Каждый", repeat_text_day_count: "день", repeat_radio_day_type2: "Каждый рабочий день", repeat_week: " Повторять каждую", repeat_text_week_count: "неделю , в:", repeat_radio_month_type: "Повторять", repeat_radio_month_start: "", repeat_text_month_day: " числа каждый ", repeat_text_month_count: "месяц", repeat_text_month_count2_before: "каждый ", repeat_text_month_count2_after: "месяц", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без даты окончания", repeat_text_occurences_count: "повторений", repeat_radio_end3: "До ", repeat_radio_end2: "", repeat_never: "Никогда", repeat_daily: "Каждый день", repeat_workdays: "Каждый будний день", repeat_weekly: "Каждую неделю", repeat_monthly: "Каждый месяц", repeat_yearly: "Каждый год", repeat_custom: "Настроить", repeat_freq_day: "День", repeat_freq_week: "Неделя", repeat_freq_month: "Месяц", repeat_freq_year: "Год", repeat_on_date: "В дату", repeat_ends: "Заканчивается", month_for_recurring: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"], day_for_recurring: ["Воскресенье", "Понедельник", "Вторник", "Среду", "Четверг", "Пятницу", "Субботу"] } }, ba = { date: { month_full: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"], day_short: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"] }, labels: { dhx_cal_today_button: "Danes", day_tab: "Dan", week_tab: "Teden", month_tab: "Mesec", new_event: "Nov dogodek", icon_save: "Shrani", icon_cancel: "Prekliči", icon_details: "Podrobnosti", icon_edit: "Uredi", icon_delete: "Izbriši", confirm_closing: "", confirm_deleting: "Dogodek bo izbrisan. Želite nadaljevati?", section_description: "Opis", section_time: "Časovni okvir", full_day: "Ves dan", confirm_recurring: "Želite urediti celoten set ponavljajočih dogodkov?", section_recurring: "Ponovi dogodek", button_recurring: "Onemogočeno", button_recurring_open: "Omogočeno", button_edit_series: "Edit series", button_edit_occurrence: "Edit occurrence", agenda_tab: "Zadeva", date: "Datum", description: "Opis", year_tab: "Leto", week_agenda_tab: "Zadeva", grid_tab: "Miza", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dnevno", repeat_radio_week: "Tedensko", repeat_radio_month: "Mesečno", repeat_radio_year: "Letno", repeat_radio_day_type: "Vsak", repeat_text_day_count: "dan", repeat_radio_day_type2: "Vsak delovni dan", repeat_week: " Ponavljaj vsak", repeat_text_week_count: "teden na naslednje dni:", repeat_radio_month_type: "Ponavljaj", repeat_radio_month_start: "Na", repeat_text_month_day: "dan vsak", repeat_text_month_count: "mesec", repeat_text_month_count2_before: "vsak", repeat_text_month_count2_after: "mesec", repeat_year_label: "Na", select_year_day2: "od", repeat_text_year_day: "dan", select_year_month: "mesec", repeat_radio_end: "Brez končnega datuma", repeat_text_occurences_count: "pojavitve", repeat_radio_end2: "Po", repeat_radio_end3: "Končaj do", repeat_never: "Nikoli", repeat_daily: "Vsak dan", repeat_workdays: "Vsak delovni dan", repeat_weekly: "Vsak teden", repeat_monthly: "Vsak mesec", repeat_yearly: "Vsako leto", repeat_custom: "Po meri", repeat_freq_day: "Dan", repeat_freq_week: "Teden", repeat_freq_month: "Mesec", repeat_freq_year: "Leto", repeat_on_date: "Na datum", repeat_ends: "Konča se", month_for_recurring: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], day_for_recurring: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"] } }, xa = { date: { month_full: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sept", "Okt", "Nov", "Dec"], day_full: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"], day_short: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"] }, labels: { dhx_cal_today_button: "Dnes", day_tab: "Deň", week_tab: "Týždeň", month_tab: "Mesiac", new_event: "Nová udalosť", icon_save: "Uložiť", icon_cancel: "Späť", icon_details: "Detail", icon_edit: "Edituj", icon_delete: "Zmazať", confirm_closing: "Vaše zmeny nebudú uložené. Skutočne?", confirm_deleting: "Udalosť bude natrvalo vymazaná. Skutočne?", section_description: "Poznámky", section_time: "Doba platnosti", confirm_recurring: "Prajete si upraviť celú radu opakovaných udalostí?", section_recurring: "Opakovanie udalosti", button_recurring: "Vypnuté", button_recurring_open: "Zapnuté", button_edit_series: "Upraviť opakovania", button_edit_occurrence: "Upraviť inštancie", agenda_tab: "Program", date: "Dátum", description: "Poznámka", year_tab: "Rok", full_day: "Celý deň", week_agenda_tab: "Program", grid_tab: "Mriežka", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Denne", repeat_radio_week: "Týždenne", repeat_radio_month: "Mesaène", repeat_radio_year: "Roène", repeat_radio_day_type: "Každý", repeat_text_day_count: "deò", repeat_radio_day_type2: "Každý prac. deò", repeat_week: "Opakova každý", repeat_text_week_count: "týždeò v dòoch:", repeat_radio_month_type: "Opakova", repeat_radio_month_start: "On", repeat_text_month_day: "deò každý", repeat_text_month_count: "mesiac", repeat_text_month_count2_before: "každý", repeat_text_month_count2_after: "mesiac", repeat_year_label: "On", select_year_day2: "poèas", repeat_text_year_day: "deò", select_year_month: "mesiac", repeat_radio_end: "Bez dátumu ukonèenia", repeat_text_occurences_count: "udalostiach", repeat_radio_end3: "Ukonèi", repeat_radio_end2: "Po", repeat_never: "Nikdy", repeat_daily: "Každý deň", repeat_workdays: "Každý pracovný deň", repeat_weekly: "Každý týždeň", repeat_monthly: "Každý mesiac", repeat_yearly: "Každý rok", repeat_custom: "Vlastné", repeat_freq_day: "Deň", repeat_freq_week: "Týždeň", repeat_freq_month: "Mesiac", repeat_freq_year: "Rok", repeat_on_date: "Na dátum", repeat_ends: "Koniec", month_for_recurring: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], day_for_recurring: ["Nede¾a", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"] } }, ka = { date: { month_full: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"], day_full: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"], day_short: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"] }, labels: { dhx_cal_today_button: "Idag", day_tab: "Dag", week_tab: "Vecka", month_tab: "Månad", new_event: "Ny händelse", icon_save: "Spara", icon_cancel: "Ångra", icon_details: "Detaljer", icon_edit: "Ändra", icon_delete: "Ta bort", confirm_closing: "", confirm_deleting: "Är du säker på att du vill ta bort händelsen permanent?", section_description: "Beskrivning", section_time: "Tid", full_day: "Hela dagen", confirm_recurring: "Vill du redigera hela serien med repeterande händelser?", section_recurring: "Upprepa händelse", button_recurring: "Inaktiverat", button_recurring_open: "Aktiverat", button_edit_series: "Redigera serien", button_edit_occurrence: "Redigera en kopia", agenda_tab: "Dagordning", date: "Datum", description: "Beskrivning", year_tab: "År", week_agenda_tab: "Dagordning", grid_tab: "Galler", drag_to_create: "Dra för att skapa ny", drag_to_move: "Dra för att flytta", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Dagligen", repeat_radio_week: "Veckovis", repeat_radio_month: "Månadsvis", repeat_radio_year: "Årligen", repeat_radio_day_type: "Var", repeat_text_day_count: "dag", repeat_radio_day_type2: "Varje arbetsdag", repeat_week: " Upprepa var", repeat_text_week_count: "vecka dessa dagar:", repeat_radio_month_type: "Upprepa", repeat_radio_month_start: "Den", repeat_text_month_day: "dagen var", repeat_text_month_count: "månad", repeat_text_month_count2_before: "var", repeat_text_month_count2_after: "månad", repeat_year_label: "Den", select_year_day2: "i", repeat_text_year_day: "dag i", select_year_month: "månad", repeat_radio_end: "Inget slutdatum", repeat_text_occurences_count: "upprepningar", repeat_radio_end3: "Sluta efter", repeat_radio_end2: "Efter", repeat_never: "Aldrig", repeat_daily: "Varje dag", repeat_workdays: "Varje vardag", repeat_weekly: "Varje vecka", repeat_monthly: "Varje månad", repeat_yearly: "Varje år", repeat_custom: "Anpassad", repeat_freq_day: "Dag", repeat_freq_week: "Vecka", repeat_freq_month: "Månad", repeat_freq_year: "År", repeat_on_date: "På datum", repeat_ends: "Slutar", month_for_recurring: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], day_for_recurring: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"] } }, wa = { date: { month_full: ["Ocak", "Þubat", "Mart", "Nisan", "Mayýs", "Haziran", "Temmuz", "Aðustos", "Eylül", "Ekim", "Kasým", "Aralýk"], month_short: ["Oca", "Þub", "Mar", "Nis", "May", "Haz", "Tem", "Aðu", "Eyl", "Eki", "Kas", "Ara"], day_full: ["Pazar", "Pazartes,", "Salý", "Çarþamba", "Perþembe", "Cuma", "Cumartesi"], day_short: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"] }, labels: { dhx_cal_today_button: "Bugün", day_tab: "Gün", week_tab: "Hafta", month_tab: "Ay", new_event: "Uygun", icon_save: "Kaydet", icon_cancel: "Ýptal", icon_details: "Detaylar", icon_edit: "Düzenle", icon_delete: "Sil", confirm_closing: "", confirm_deleting: "Etkinlik silinecek, devam?", section_description: "Açýklama", section_time: "Zaman aralýðý", full_day: "Tam gün", confirm_recurring: "Tüm tekrar eden etkinlikler silinecek, devam?", section_recurring: "Etkinliði tekrarla", button_recurring: "Pasif", button_recurring_open: "Aktif", button_edit_series: "Dizi düzenleme", button_edit_occurrence: "Bir kopyasını düzenleyin", agenda_tab: "Ajanda", date: "Tarih", description: "Açýklama", year_tab: "Yýl", week_agenda_tab: "Ajanda", grid_tab: "Izgara", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "Günlük", repeat_radio_week: "Haftalık", repeat_radio_month: "Aylık", repeat_radio_year: "Yıllık", repeat_radio_day_type: "Her", repeat_text_day_count: "gün", repeat_radio_day_type2: "Her iş günü", repeat_week: " Tekrar her", repeat_text_week_count: "hafta şu günlerde:", repeat_radio_month_type: "Tekrar et", repeat_radio_month_start: "Tarihinde", repeat_text_month_day: "gün her", repeat_text_month_count: "ay", repeat_text_month_count2_before: "her", repeat_text_month_count2_after: "ay", repeat_year_label: "Tarihinde", select_year_day2: "ayın", repeat_text_year_day: "günü", select_year_month: "ay", repeat_radio_end: "Bitiş tarihi yok", repeat_text_occurences_count: "olay", repeat_radio_end2: "Sonra", repeat_radio_end3: "Tarihinde bitir", repeat_never: "Asla", repeat_daily: "Her gün", repeat_workdays: "Her iş günü", repeat_weekly: "Her hafta", repeat_monthly: "Her ay", repeat_yearly: "Her yıl", repeat_custom: "Özel", repeat_freq_day: "Gün", repeat_freq_week: "Hafta", repeat_freq_month: "Ay", repeat_freq_year: "Yıl", repeat_on_date: "Tarihinde", repeat_ends: "Biter", month_for_recurring: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"], day_for_recurring: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"] } }, Ea = { date: { month_full: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"], month_short: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"], day_full: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"], day_short: ["Нед", "Пон", "Вів", "Сер", "Чет", "Птн", "Суб"] }, labels: { dhx_cal_today_button: "Сьогодні", day_tab: "День", week_tab: "Тиждень", month_tab: "Місяць", new_event: "Нова подія", icon_save: "Зберегти", icon_cancel: "Відміна", icon_details: "Деталі", icon_edit: "Редагувати", icon_delete: "Вилучити", confirm_closing: "", confirm_deleting: "Подія вилучиться назавжди. Ви впевнені?", section_description: "Опис", section_time: "Часовий проміжок", full_day: "Весь день", confirm_recurring: "Хочете редагувати весь перелік повторюваних подій?", section_recurring: "Повторювана подія", button_recurring: "Відключено", button_recurring_open: "Включено", button_edit_series: "Редагувати серію", button_edit_occurrence: "Редагувати примірник", agenda_tab: "Перелік", date: "Дата", description: "Опис", year_tab: "Рік", week_agenda_tab: "Перелік", grid_tab: "Таблиця", drag_to_create: "Drag to create", drag_to_move: "Drag to move", message_ok: "OK", message_cancel: "Cancel", next: "Next", prev: "Previous", year: "Year", month: "Month", day: "Day", hour: "Hour", minute: "Minute", repeat_radio_day: "День", repeat_radio_week: "Тиждень", repeat_radio_month: "Місяць", repeat_radio_year: "Рік", repeat_radio_day_type: "Кожний", repeat_text_day_count: "день", repeat_radio_day_type2: "Кожний робочий день", repeat_week: " Повторювати кожен", repeat_text_week_count: "тиждень , по:", repeat_radio_month_type: "Повторювати", repeat_radio_month_start: "", repeat_text_month_day: " числа кожний ", repeat_text_month_count: "місяць", repeat_text_month_count2_before: "кожен ", repeat_text_month_count2_after: "місяць", repeat_year_label: "", select_year_day2: "", repeat_text_year_day: "день", select_year_month: "", repeat_radio_end: "Без дати закінчення", repeat_text_occurences_count: "повторень", repeat_radio_end3: "До ", repeat_radio_end2: "", repeat_never: "Ніколи", repeat_daily: "Щодня", repeat_workdays: "Щодня в робочі дні", repeat_weekly: "Щотижня", repeat_monthly: "Щомісяця", repeat_yearly: "Щороку", repeat_custom: "Налаштоване", repeat_freq_day: "День", repeat_freq_week: "Тиждень", repeat_freq_month: "Місяць", repeat_freq_year: "Рік", repeat_on_date: "На дату", repeat_ends: "Закінчується", month_for_recurring: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"], day_for_recurring: ["Неділям", "Понеділкам", "Вівторкам", "Середам", "Четвергам", "П'ятницям", "Суботам"] } };
class Da {
  constructor(i, t, r = {}) {
    this.state = { date: /* @__PURE__ */ new Date(), modes: ["days", "months", "years"], currentRange: [], eventDates: [], filterDays: null, currentModeIndex: 0, ...r }, this.container = null, this.element = null, this.onStateChangeHandlers = [], this.scheduler = i, this._domEvents = i._createDomEventScope(), this.state = this.getState(), Ue(this), t && (this.container = t, this.render(this.container)), this.onStateChange((d, n) => {
      this.callEvent("onStateChange", [n, d]);
    });
  }
  getState() {
    return { ...this.state, mode: this.state.modes[this.state.currentModeIndex] };
  }
  setState(i) {
    const t = { ...this.state };
    i.mode && (i.currentModeIndex = this.state.modes.indexOf(i.mode)), this.state = { ...this.state, ...i }, this._notifyStateChange(t, this.state), this.container && this.render(this.container);
  }
  onStateChange(i) {
    return this.onStateChangeHandlers.push(i), () => {
      const t = this.onStateChangeHandlers.indexOf(i);
      t !== -1 && this.onStateChangeHandlers.splice(t, 1);
    };
  }
  _notifyStateChange(i, t) {
    this.onStateChangeHandlers.forEach((r) => r(i, t));
  }
  _adjustDate(i) {
    const { mode: t, date: r } = this.getState(), d = new Date(r);
    t === "days" ? d.setMonth(r.getMonth() + i) : t === "months" ? d.setFullYear(r.getFullYear() + i) : d.setFullYear(r.getFullYear() + 10 * i), this.setState({ date: d });
  }
  _toggleMode() {
    const i = (this.state.currentModeIndex + 1) % this.state.modes.length;
    this.setState({ currentModeIndex: i });
  }
  _renderCalendarHeader(i) {
    const { mode: t, date: r } = this.getState(), d = document.createElement("div");
    d.classList.add("dhx_cal_datepicker_header");
    const n = document.createElement("button");
    n.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_left"), d.appendChild(n);
    const s = document.createElement("div");
    if (s.classList.add("dhx_cal_datepicker_title"), t === "days")
      s.innerText = r.toLocaleString("default", { month: "long" }) + " " + r.getFullYear();
    else if (t === "months")
      s.innerText = r.getFullYear();
    else {
      const a = 10 * Math.floor(r.getFullYear() / 10);
      s.innerText = `${a} - ${a + 9}`;
    }
    this._domEvents.attach(s, "click", this._toggleMode.bind(this)), d.appendChild(s);
    const _ = document.createElement("button");
    _.classList.add("dhx_cal_datepicker_arrow", "scheduler_icon", "arrow_right"), d.appendChild(_), i.appendChild(d), this._domEvents.attach(n, "click", this._adjustDate.bind(this, -1)), this._domEvents.attach(_, "click", this._adjustDate.bind(this, 1));
  }
  render(i) {
    this._domEvents.detachAll(), this.container = i || this.container, this.container.innerHTML = "", this.element || (this.element = document.createElement("div"), this.element.classList.add("dhx_cal_datepicker")), this.element.innerHTML = "", this.container.appendChild(this.element), this._renderCalendarHeader(this.element);
    const t = document.createElement("div");
    t.classList.add("dhx_cal_datepicker_data"), this.element.appendChild(t);
    const { mode: r } = this.getState();
    r === "days" ? this._renderDayGrid(t) : r === "months" ? this._renderMonthGrid(t) : this._renderYearGrid(t);
  }
  _renderDayGridHeader(i) {
    const { date: t, filterDays: r } = this.getState(), d = this.scheduler;
    let n = d.date.week_start(new Date(t));
    const s = d.date.add(d.date.week_start(new Date(t)), 1, "week");
    i.classList.add("dhx_cal_datepicker_days");
    const _ = d.date.date_to_str("%D");
    for (; n.valueOf() < s.valueOf(); ) {
      if (!r || !r(n)) {
        const a = _(n), o = document.createElement("div");
        o.setAttribute("data-day", n.getDay()), o.classList.add("dhx_cal_datepicker_dayname"), o.innerText = a, i.appendChild(o);
      }
      n = d.date.add(n, 1, "day");
    }
  }
  _weeksBetween(i, t) {
    const r = this.scheduler;
    let d = 0, n = new Date(i);
    for (; n.valueOf() < t.valueOf(); )
      d += 1, n = r.date.week_start(r.date.add(n, 1, "week"));
    return d;
  }
  _renderDayGrid(i) {
    const { date: t, currentRange: r, eventDates: d, minWeeks: n, filterDays: s } = this.getState();
    let _ = r[0], a = r[1];
    const o = d.reduce((b, k) => (b[this.scheduler.date.day_start(new Date(k)).valueOf()] = !0, b), {}), l = document.createElement("div");
    this._renderDayGridHeader(l);
    const h = l.children.length;
    i.appendChild(l), h !== 7 && i.style.setProperty("--dhx-scheduler-week-length", h);
    const m = this.scheduler, v = m.date.week_start(m.date.month_start(new Date(t))), u = m.date.month_start(new Date(t)), c = m.date.add(m.date.month_start(new Date(t)), 1, "month");
    let f = m.date.add(m.date.month_start(new Date(t)), 1, "month");
    const p = m.date.date_part(m._currentDate());
    f.getDay() !== 0 && (f = m.date.add(m.date.week_start(f), 1, "week"));
    let g = this._weeksBetween(v, f);
    n && g < n && (f = m.date.add(f, n - g, "week"));
    let y = v;
    const x = document.createElement("div");
    for (x.classList.add("dhx_cal_datepicker_days"), this._domEvents.attach(x, "click", (b) => {
      const k = b.target.closest("[data-cell-date]"), w = new Date(k.getAttribute("data-cell-date"));
      this.callEvent("onDateClick", [w, b]);
    }); y.valueOf() < f.valueOf(); ) {
      if (!s || !s(y)) {
        const b = document.createElement("div");
        b.setAttribute("data-cell-date", m.templates.format_date(y)), b.setAttribute("data-day", y.getDay()), b.innerHTML = y.getDate(), y.valueOf() < u.valueOf() ? b.classList.add("dhx_before") : y.valueOf() >= c.valueOf() && b.classList.add("dhx_after"), y.getDay() !== 0 && y.getDay() !== 6 || b.classList.add("dhx_cal_datepicker_weekend"), y.valueOf() == p.valueOf() && b.classList.add("dhx_now"), _ && a && y.valueOf() >= _.valueOf() && y.valueOf() < a.valueOf() && b.classList.add("dhx_cal_datepicker_current"), o[y.valueOf()] && b.classList.add("dhx_cal_datepicker_event"), b.classList.add("dhx_cal_datepicker_date"), x.appendChild(b);
      }
      y = m.date.add(y, 1, "day");
    }
    i.appendChild(x);
  }
  _renderMonthGrid(i) {
    const { date: t } = this.getState(), r = document.createElement("div");
    r.classList.add("dhx_cal_datepicker_months");
    const d = [];
    for (let a = 0; a < 12; a++)
      d.push(new Date(t.getFullYear(), a, 1));
    const n = this.scheduler.date.date_to_str("%M");
    d.forEach((a) => {
      const o = document.createElement("div");
      o.classList.add("dhx_cal_datepicker_month"), t.getMonth() === a.getMonth() && o.classList.add("dhx_cal_datepicker_current"), o.setAttribute("data-month", a.getMonth()), o.innerHTML = n(a), this._domEvents.attach(o, "click", () => {
        const l = new Date(a);
        this.setState({ date: l, mode: "days" });
      }), r.appendChild(o);
    }), i.appendChild(r);
    const s = document.createElement("div");
    s.classList.add("dhx_cal_datepicker_done");
    const _ = document.createElement("button");
    _.innerText = "Done", _.classList.add("dhx_cal_datepicker_done_btn"), this._domEvents.attach(_, "click", () => {
      this.setState({ mode: "days" });
    }), s.appendChild(_), i.appendChild(s);
  }
  _renderYearGrid(i) {
    const { date: t } = this.getState(), r = 10 * Math.floor(t.getFullYear() / 10), d = document.createElement("div");
    d.classList.add("dhx_cal_datepicker_years");
    for (let _ = r - 1; _ <= r + 10; _++) {
      const a = document.createElement("div");
      a.innerText = _, a.classList.add("dhx_cal_datepicker_year"), a.setAttribute("data-year", _), t.getFullYear() === _ && a.classList.add("dhx_cal_datepicker_current"), this._domEvents.attach(a, "click", () => {
        this.setState({ date: new Date(_, t.getMonth(), 1), mode: "months" });
      }), d.appendChild(a);
    }
    i.appendChild(d);
    const n = document.createElement("div");
    n.classList.add("dhx_cal_datepicker_done");
    const s = document.createElement("button");
    s.innerText = "Done", s.classList.add("dhx_cal_datepicker_done_btn"), this._domEvents.attach(s, "click", () => {
      this.setState({ mode: "months" });
    }), n.appendChild(s), i.appendChild(n);
  }
  destructor() {
    this.onStateChangeHandlers = [], this.element && (this.element.innerHTML = "", this.element.remove()), this._domEvents.detachAll(), this.callEvent("onDestroy", []), this.detachAllEvents(), this.scheduler = null;
  }
}
function Sa(e) {
  const i = { version: "7.1.3" };
  i.$stateProvider = function() {
    const a = {};
    return { getState: function(o) {
      if (a[o])
        return a[o].method();
      {
        const l = {};
        for (const h in a)
          a[h].internal || ee.mixin(l, a[h].method(), !0);
        return l;
      }
    }, registerProvider: function(o, l, h) {
      a[o] = { method: l, internal: h };
    }, unregisterProvider: function(o) {
      delete a[o];
    } };
  }(), i.getState = i.$stateProvider.getState, function(a) {
    var o = { agenda: "https://docs.dhtmlx.com/scheduler/agenda_view.html", grid: "https://docs.dhtmlx.com/scheduler/grid_view.html", map: "https://docs.dhtmlx.com/scheduler/map_view.html", unit: "https://docs.dhtmlx.com/scheduler/units_view.html", timeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html", week_agenda: "https://docs.dhtmlx.com/scheduler/weekagenda_view.html", year: "https://docs.dhtmlx.com/scheduler/year_view.html", anythingElse: "https://docs.dhtmlx.com/scheduler/views.html" }, l = { agenda: "ext/dhtmlxscheduler_agenda_view.js", grid: "ext/dhtmlxscheduler_grid_view.js", map: "ext/dhtmlxscheduler_map_view.js", unit: "ext/dhtmlxscheduler_units.js", timeline: "ext/dhtmlxscheduler_timeline.js, ext/dhtmlxscheduler_treetimeline.js, ext/dhtmlxscheduler_daytimeline.js", week_agenda: "ext/dhtmlxscheduler_week_agenda.js", year: "ext/dhtmlxscheduler_year_view.js", limit: "ext/dhtmlxscheduler_limit.js" };
    a._commonErrorMessages = { unknownView: function(h) {
      var m = l[h] ? "You're probably missing " + l[h] + "." : "";
      return "`" + h + "` view is not defined. \nPlease check parameters you pass to `scheduler.init` or `scheduler.setCurrentView` in your code and ensure you've imported appropriate extensions. \nRelated docs: " + (o[h] || o.anythingElse) + `
` + (m ? m + `
` : "");
    }, collapsedContainer: function(h) {
      return `Scheduler container height is set to *100%* but the rendered height is zero and the scheduler is not visible. 
Make sure that the container has some initial height or use different units. For example:
<div id='scheduler_here' class='dhx_cal_container' style='width:100%; height:600px;'> 
`;
    } }, a.createTimelineView = function() {
      throw new Error("scheduler.createTimelineView is not implemented. Be sure to add the required extension: " + l.timeline + `
Related docs: ` + o.timeline);
    }, a.createUnitsView = function() {
      throw new Error("scheduler.createUnitsView is not implemented. Be sure to add the required extension: " + l.unit + `
Related docs: ` + o.unit);
    }, a.createGridView = function() {
      throw new Error("scheduler.createGridView is not implemented. Be sure to add the required extension: " + l.grid + `
Related docs: ` + o.grid);
    }, a.addMarkedTimespan = function() {
      throw new Error(`scheduler.addMarkedTimespan is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_limit.js
Related docs: https://docs.dhtmlx.com/scheduler/limits.html`);
    }, a.renderCalendar = function() {
      throw new Error(`scheduler.renderCalendar is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_minical.js
https://docs.dhtmlx.com/scheduler/minicalendar.html`);
    }, a.exportToPNG = function() {
      throw new Error(["scheduler.exportToPNG is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/png.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join(`
`));
    }, a.exportToPDF = function() {
      throw new Error(["scheduler.exportToPDF is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/pdf.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join(`
`));
    };
  }(i), zt(i), function(a) {
    Ue(a), Ot(a), a._detachDomEvent = function(c, f, p) {
      c.removeEventListener ? c.removeEventListener(f, p, !1) : c.detachEvent && c.detachEvent("on" + f, p);
    }, a._init_once = function() {
      Lt(a), a._init_once = function() {
      };
    };
    const o = { render: function(c) {
      return a._init_nav_bar(c);
    } }, l = { render: function(c) {
      const f = document.createElement("div");
      return f.className = "dhx_cal_header", f;
    } }, h = { render: function(c) {
      const f = document.createElement("div");
      return f.className = "dhx_cal_data", f;
    } };
    function m(c) {
      return !!(c.querySelector(".dhx_cal_header") && c.querySelector(".dhx_cal_data") && c.querySelector(".dhx_cal_navline"));
    }
    a.init = function(c, f, p) {
      if (!this.$destroyed) {
        if (f = f || a._currentDate(), p = p || "week", this._obj && this.unset_actions(), this._obj = typeof c == "string" ? document.getElementById(c) : c, this.$container = this._obj, this.$root = this._obj, !this.$container.offsetHeight && this.$container.offsetWidth && this.$container.style.height === "100%" && window.console.error(a._commonErrorMessages.collapsedContainer(), this.$container), this.config.wai_aria_attributes && this.config.wai_aria_application_role && this.$container.setAttribute("role", "application"), this.config.header || m(this.$container) || (this.config.header = function(g) {
          const y = ["day", "week", "month"];
          if (g.matrix)
            for (const x in g.matrix)
              y.push(x);
          if (g._props)
            for (const x in g._props)
              y.push(x);
          if (g._grid && g._grid.names)
            for (const x in g._grid.names)
              y.push(x);
          return ["map", "agenda", "week_agenda", "year"].forEach(function(x) {
            g[x + "_view"] && y.push(x);
          }), y.concat(["date"]).concat(["prev", "today", "next"]);
        }(this), window.console.log(["Required DOM elements are missing from the scheduler container and **scheduler.config.header** is not specified.", "Using a default header configuration: ", "scheduler.config.header = " + JSON.stringify(this.config.header, null, 2), "Check this article for the details: https://docs.dhtmlx.com/scheduler/initialization.html"].join(`
`))), this.config.header)
          this.$container.innerHTML = "", this.$container.classList.add("dhx_cal_container"), this.config.header.height && (this.xy.nav_height = this.config.header.height), this.$container.appendChild(o.render(this.config.header)), this.$container.appendChild(l.render()), this.$container.appendChild(h.render());
        else if (!m(this.$container))
          throw new Error(["Required DOM elements are missing from the scheduler container.", "Be sure to either specify them manually in the markup: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviamarkup", "Or to use **scheduler.config.header** setting so they could be created automatically: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviaheaderconfig"].join(`
`));
        this.config.rtl && (this.$container.className += " dhx_cal_container_rtl"), this._skin_init && a._skin_init(), a.date.init(), this._scroll = !0, this._els = [], this.get_elements(), this.init_templates(), this.set_actions(), this._init_once(), this._init_touch_events(), this.set_sizes(), a.callEvent("onSchedulerReady", []), a.$initialized = !0, this.setCurrentView(f, p);
      }
    }, a.xy = { min_event_height: 20, bar_height: 24, scale_width: 50, scroll_width: 18, scale_height: 20, month_scale_height: 20, menu_width: 25, margin_top: 0, margin_left: 0, editor_width: 140, month_head_height: 22, event_header_height: 14 }, a.keys = { edit_save: 13, edit_cancel: 27 }, a.bind = function(c, f) {
      return c.bind ? c.bind(f) : function() {
        return c.apply(f, arguments);
      };
    }, a.set_sizes = function() {
      var c = this._x = this._obj.clientWidth - this.xy.margin_left, f = this._table_view ? 0 : this.xy.scale_width + this.xy.scroll_width, p = this.$container.querySelector(".dhx_cal_scale_placeholder");
      a._is_material_skin() ? (p || ((p = document.createElement("div")).className = "dhx_cal_scale_placeholder", this.$container.insertBefore(p, this._els.dhx_cal_header[0])), p.style.display = "block", this.set_xy(p, c, this.xy.scale_height + 1, 0, this._els.dhx_cal_header[0].offsetTop)) : p && p.parentNode.removeChild(p), this._lightbox && (a.$container.offsetWidth < 1200 || this._setLbPosition(document.querySelector(".dhx_cal_light"))), this._data_width = c - f, this._els.dhx_cal_navline[0].style.width = c + "px";
      const g = this._els.dhx_cal_header[0];
      this.set_xy(g, this._data_width, this.xy.scale_height), g.style.left = "", g.style.right = "", this._table_view ? this.config.rtl ? g.style.right = "-1px" : g.style.left = "-1px" : this.config.rtl ? g.style.right = `${this.xy.scale_width}px` : g.style.left = `${this.xy.scale_width}px`;
    }, a.set_xy = function(c, f, p, g, y) {
      function x(k) {
        let w = k;
        return isNaN(Number(w)) || (w = Math.max(0, w) + "px"), w;
      }
      var b = "left";
      f !== void 0 && (c.style.width = x(f)), p !== void 0 && (c.style.height = x(p)), arguments.length > 3 && (g !== void 0 && (this.config.rtl && (b = "right"), c.style[b] = g + "px"), y !== void 0 && (c.style.top = y + "px"));
    }, a.get_elements = function() {
      const c = this._obj.getElementsByTagName("DIV");
      for (let f = 0; f < c.length; f++) {
        let p = a._getClassName(c[f]);
        const g = c[f].getAttribute("data-tab") || c[f].getAttribute("name") || "";
        p && (p = p.split(" ")[0]), this._els[p] || (this._els[p] = []), this._els[p].push(c[f]);
        let y = a.locale.labels[g + "_tab"] || a.locale.labels[g || p];
        typeof y != "string" && g && !c[f].innerHTML && (y = g.split("_")[0]), y && (this._waiAria.labelAttr(c[f], y), c[f].innerHTML = y);
      }
    };
    const v = a._createDomEventScope();
    function u(c, f) {
      const p = new Date(c), g = (new Date(f).getTime() - p.getTime()) / 864e5;
      return Math.abs(g);
    }
    a.unset_actions = function() {
      v.detachAll();
    }, a.set_actions = function() {
      for (const c in this._els)
        if (this._click[c])
          for (let f = 0; f < this._els[c].length; f++) {
            const p = this._els[c][f], g = this._click[c].bind(p);
            v.attach(p, "click", g);
          }
      v.attach(this._obj, "selectstart", function(c) {
        return c.preventDefault(), !1;
      }), v.attach(this._obj, "mousemove", function(c) {
        a._temp_touch_block || a._on_mouse_move(c);
      }), v.attach(this._obj, "mousedown", function(c) {
        a._ignore_next_click || a._on_mouse_down(c);
      }), v.attach(this._obj, "mouseup", function(c) {
        a._ignore_next_click || a._on_mouse_up(c);
      }), v.attach(this._obj, "dblclick", function(c) {
        a._on_dbl_click(c);
      }), v.attach(this._obj, "contextmenu", function(c) {
        return a.checkEvent("onContextMenu") && c.preventDefault(), a.callEvent("onContextMenu", [a._locate_event(c.target), c]);
      });
    }, a.select = function(c) {
      this._select_id != c && (a._close_not_saved(), this.editStop(!1), this._select_id && this.unselect(), this._select_id = c, this.updateEvent(c), this.callEvent("onEventSelected", [c]));
    }, a.unselect = function(c) {
      if (c && c != this._select_id)
        return;
      const f = this._select_id;
      this._select_id = null, f && this.getEvent(f) && this.updateEvent(f), this.callEvent("onEventUnselected", [f]);
    }, a.$stateProvider.registerProvider("global", (function() {
      return { mode: this._mode, date: new Date(this._date), min_date: new Date(this._min_date), max_date: new Date(this._max_date), editor_id: this._edit_id, lightbox_id: this._lightbox_id, new_event: this._new_event, select_id: this._select_id, expanded: this.expanded, drag_id: this._drag_id, drag_mode: this._drag_mode };
    }).bind(a)), a._click = { dhx_cal_data: function(c) {
      if (a._ignore_next_click)
        return c.preventDefault && c.preventDefault(), c.cancelBubble = !0, a._ignore_next_click = !1, !1;
      const f = a._locate_event(c.target);
      if (f) {
        if (!a.callEvent("onClick", [f, c]) || a.config.readonly)
          return;
      } else
        a.callEvent("onEmptyClick", [a.getActionData(c).date, c]);
      if (f && a.config.select) {
        a.select(f);
        const p = c.target.closest(".dhx_menu_icon"), g = a._getClassName(p);
        g.indexOf("_icon") != -1 && a._click.buttons[g.split(" ")[1].replace("icon_", "")](f);
      } else
        a._close_not_saved(), a.getState().select_id && (/* @__PURE__ */ new Date()).valueOf() - (a._new_event || 0) > 500 && a.unselect();
    }, dhx_cal_prev_button: function() {
      a._click.dhx_cal_next_button(0, -1);
    }, dhx_cal_next_button: function(c, f) {
      let p = 1;
      a.config.rtl && (f = -f, p = -p), a.setCurrentView(a.date.add(a.date[a._mode + "_start"](new Date(a._date)), f || p, a._mode));
    }, dhx_cal_today_button: function() {
      a.callEvent("onBeforeTodayDisplayed", []) && a.setCurrentView(a._currentDate());
    }, dhx_cal_tab: function() {
      const c = this.getAttribute("data-tab"), f = this.getAttribute("name"), p = c || f.substring(0, f.search("_tab"));
      a.setCurrentView(a._date, p);
    }, buttons: { delete: function(c) {
      const f = a.locale.labels.confirm_deleting;
      a._dhtmlx_confirm({ message: f, title: a.locale.labels.title_confirm_deleting, callback: function() {
        a.deleteEvent(c);
      }, config: { ok: a.locale.labels.icon_delete } });
    }, edit: function(c) {
      a.edit(c);
    }, save: function(c) {
      a.editStop(!0);
    }, details: function(c) {
      a.showLightbox(c);
    }, form: function(c) {
      a.showLightbox(c);
    }, cancel: function(c) {
      a.editStop(!1);
    } } }, a._dhtmlx_confirm = function({ message: c, title: f, callback: p, config: g }) {
      if (!c)
        return p();
      g = g || {};
      const y = { ...g, text: c };
      f && (y.title = f), p && (y.callback = function(x) {
        x && p();
      }), a.confirm(y);
    }, a.addEventNow = function(c, f, p) {
      let g = {};
      a._isObject(c) && !a._isDate(c) && (g = c, c = null);
      const y = 6e4 * (this.config.event_duration || this.config.time_step);
      c || (c = g.start_date || Math.round(a._currentDate().valueOf() / y) * y);
      let x = new Date(c);
      if (!f) {
        let w = this.config.first_hour;
        w > x.getHours() && (x.setHours(w), c = x.valueOf()), f = c.valueOf() + y;
      }
      let b = new Date(f);
      x.valueOf() == b.valueOf() && b.setTime(b.valueOf() + y), g.start_date = g.start_date || x, g.end_date = g.end_date || b, g.text = g.text || this.locale.labels.new_event, g.id = this._drag_id = g.id || this.uid(), this._drag_mode = "new-size", this._loading = !0;
      const k = this.addEvent(g);
      return this.callEvent("onEventCreated", [this._drag_id, p]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(p), k;
    }, a._on_dbl_click = function(c, f) {
      if (f = f || c.target, this.config.readonly)
        return;
      const p = a._getClassName(f).split(" ")[0];
      switch (p) {
        case "dhx_scale_holder":
        case "dhx_scale_holder_now":
        case "dhx_month_body":
        case "dhx_wa_day_data":
          if (!a.config.dblclick_create)
            break;
          this.addEventNow(this.getActionData(c).date, null, c);
          break;
        case "dhx_cal_event":
        case "dhx_wa_ev_body":
        case "dhx_agenda_line":
        case "dhx_cal_agenda_event_line":
        case "dhx_grid_event":
        case "dhx_cal_event_line":
        case "dhx_cal_event_clear": {
          const g = this._locate_event(f);
          if (!this.callEvent("onDblClick", [g, c]))
            return;
          this.config.details_on_dblclick || this._table_view || !this.getEvent(g)._timed || !this.config.select ? this.showLightbox(g) : this.edit(g);
          break;
        }
        case "dhx_time_block":
        case "dhx_cal_container":
          return;
        default: {
          const g = this["dblclick_" + p];
          if (g)
            g.call(this, c);
          else if (f.parentNode && f != this)
            return a._on_dbl_click(c, f.parentNode);
          break;
        }
      }
    }, a._get_column_index = function(c) {
      let f = 0;
      if (this._cols) {
        let p = 0, g = 0;
        for (; p + this._cols[g] < c && g < this._cols.length; )
          p += this._cols[g], g++;
        if (f = g + (this._cols[g] ? (c - p) / this._cols[g] : 0), this._ignores && f >= this._cols.length)
          for (; f >= 1 && this._ignores[Math.floor(f)]; )
            f--;
      }
      return f;
    }, a._week_indexes_from_pos = function(c) {
      if (this._cols) {
        const f = this._get_column_index(c.x);
        return c.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(f) - 1)), c.y = Math.max(0, Math.ceil(60 * c.y / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step), c;
      }
      return c;
    }, a._mouse_coords = function(c) {
      let f;
      const p = document.body, g = document.documentElement;
      f = this.$env.isIE || !c.pageX && !c.pageY ? { x: c.clientX + (p.scrollLeft || g.scrollLeft || 0) - p.clientLeft, y: c.clientY + (p.scrollTop || g.scrollTop || 0) - p.clientTop } : { x: c.pageX, y: c.pageY }, this.config.rtl && this._colsS ? (f.x = this.$container.querySelector(".dhx_cal_data").offsetWidth - f.x, f.x += this.$domHelpers.getAbsoluteLeft(this._obj), this._mode !== "month" && (f.x -= this.xy.scale_width)) : f.x -= this.$domHelpers.getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width);
      const y = this.$container.querySelector(".dhx_cal_data");
      f.y -= this.$domHelpers.getAbsoluteTop(y) - this._els.dhx_cal_data[0].scrollTop, f.ev = c;
      const x = this["mouse_" + this._mode];
      if (x)
        f = x.call(this, f);
      else if (this._table_view) {
        const b = this._get_column_index(f.x);
        if (!this._cols || !this._colsS)
          return f;
        let k = 0;
        for (k = 1; k < this._colsS.heights.length && !(this._colsS.heights[k] > f.y); k++)
          ;
        f.y = Math.ceil(24 * (Math.max(0, b) + 7 * Math.max(0, k - 1)) * 60 / this.config.time_step), (a._drag_mode || this._mode == "month") && (f.y = 24 * (Math.max(0, Math.ceil(b) - 1) + 7 * Math.max(0, k - 1)) * 60 / this.config.time_step), this._drag_mode == "move" && a._ignores_detected && a.config.preserve_length && (f._ignores = !0, this._drag_event._event_length || (this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, { x_step: 1, x_unit: "day" }))), f.x = 0;
      } else
        f = this._week_indexes_from_pos(f);
      return f.timestamp = +/* @__PURE__ */ new Date(), f;
    }, a._close_not_saved = function() {
      if ((/* @__PURE__ */ new Date()).valueOf() - (a._new_event || 0) > 500 && a._edit_id) {
        const c = a.locale.labels.confirm_closing;
        a._dhtmlx_confirm({ message: c, title: a.locale.labels.title_confirm_closing, callback: function() {
          a.editStop(a.config.positive_closing);
        } }), c && (this._drag_id = this._drag_pos = this._drag_mode = null);
      }
    }, a._correct_shift = function(c, f) {
      return c - 6e4 * (new Date(a._min_date).getTimezoneOffset() - new Date(c).getTimezoneOffset()) * (f ? -1 : 1);
    }, a._is_pos_changed = function(c, f) {
      function p(g, y, x) {
        return Math.abs(g - y) > x;
      }
      return !c || !this._drag_pos || !!(this._drag_pos.has_moved || !this._drag_pos.timestamp || f.timestamp - this._drag_pos.timestamp > 100 || p(c.ev.clientX, f.ev.clientX, 5) || p(c.ev.clientY, f.ev.clientY, 5));
    }, a._correct_drag_start_date = function(c) {
      let f;
      a.matrix && (f = a.matrix[a._mode]), f = f || { x_step: 1, x_unit: "day" }, c = new Date(c);
      let p = 1;
      return (f._start_correction || f._end_correction) && (p = 60 * (f.last_hour || 0) - (60 * c.getHours() + c.getMinutes()) || 1), 1 * c + (a._get_fictional_event_length(c, p, f) - p);
    }, a._correct_drag_end_date = function(c, f) {
      let p;
      a.matrix && (p = a.matrix[a._mode]), p = p || { x_step: 1, x_unit: "day" };
      const g = 1 * c + a._get_fictional_event_length(c, f, p);
      return new Date(1 * g - (a._get_fictional_event_length(g, -1, p, -1) + 1));
    }, a._on_mouse_move = function(c) {
      if (this._drag_mode) {
        var f = this._mouse_coords(c);
        if (this._is_pos_changed(this._drag_pos, f)) {
          var p, g;
          if (this._edit_id != this._drag_id && this._close_not_saved(), !this._drag_mode)
            return;
          var y = null;
          if (this._drag_pos && !this._drag_pos.has_moved && ((y = this._drag_pos).has_moved = !0), this._drag_pos = f, this._drag_pos.has_moved = !0, this._drag_mode == "create") {
            if (y && (f = y), this._close_not_saved(), this.unselect(this._select_id), this._loading = !0, p = this._get_date_from_pos(f).valueOf(), !this._drag_start)
              return this.callEvent("onBeforeEventCreated", [c, this._drag_id]) ? (this._loading = !1, void (this._drag_start = p)) : void (this._loading = !1);
            g = p, this._drag_start;
            var x = new Date(this._drag_start), b = new Date(g);
            this._mode != "day" && this._mode != "week" || x.getHours() != b.getHours() || x.getMinutes() != b.getMinutes() || (b = new Date(this._drag_start + 1e3)), this._drag_id = this.uid(), this.addEvent(x, b, this.locale.labels.new_event, this._drag_id, f.fields), this.callEvent("onEventCreated", [this._drag_id, c]), this._loading = !1, this._drag_mode = "new-size";
          }
          var k, w = this.config.time_step, D = this.getEvent(this._drag_id);
          if (a.matrix && (k = a.matrix[a._mode]), k = k || { x_step: 1, x_unit: "day" }, this._drag_mode == "move")
            p = this._min_date.valueOf() + 6e4 * (f.y * this.config.time_step + 24 * f.x * 60), !f.custom && this._table_view && (p += 1e3 * this.date.time_part(D.start_date)), !this._table_view && this._dragEventBody && this._drag_event._move_event_shift === void 0 && (this._drag_event._move_event_shift = p - D.start_date), this._drag_event._move_event_shift && (p -= this._drag_event._move_event_shift), p = this._correct_shift(p), f._ignores && this.config.preserve_length && this._table_view && k ? (p = a._correct_drag_start_date(p), g = a._correct_drag_end_date(p, this._drag_event._event_length)) : g = D.end_date.valueOf() - (D.start_date.valueOf() - p);
          else {
            if (p = D.start_date.valueOf(), g = D.end_date.valueOf(), this._table_view) {
              var E = this._min_date.valueOf() + f.y * this.config.time_step * 6e4 + (f.custom ? 0 : 864e5);
              if (this._mode == "month")
                if (E = this._correct_shift(E, !1), this._drag_from_start) {
                  var S = 864e5;
                  E <= a.date.date_part(new Date(g + S - 1)).valueOf() && (p = E - S);
                } else
                  g = E;
              else
                this.config.preserve_length ? f.resize_from_start ? p = a._correct_drag_start_date(E) : g = a._correct_drag_end_date(E, 0) : f.resize_from_start ? p = E : g = E;
            } else {
              var N = this.date.date_part(new Date(D.end_date.valueOf() - 1)).valueOf(), M = new Date(N), T = this.config.first_hour, A = 60 / w * (this.config.last_hour - T);
              this.config.time_step = 1;
              var H = this._mouse_coords(c);
              this.config.time_step = w;
              var $ = f.y * w * 6e4, j = Math.min(f.y + 1, A) * w * 6e4, z = 6e4 * H.y;
              g = Math.abs($ - z) > Math.abs(j - z) ? N + j : N + $, g += 6e4 * (new Date(g).getTimezoneOffset() - M.getTimezoneOffset()), this._els.dhx_cal_data[0].style.cursor = "s-resize", this._mode != "week" && this._mode != "day" || (g = this._correct_shift(g));
            }
            if (this._drag_mode == "new-size")
              if (g <= this._drag_start) {
                var W = f.shift || (this._table_view && !f.custom ? 864e5 : 0);
                p = g - (f.shift ? 0 : W), g = this._drag_start + (W || 6e4 * w);
              } else
                p = this._drag_start;
            else
              g <= p && (g = p + 6e4 * w);
          }
          var Y = new Date(g - 1), q = new Date(p);
          if (this._drag_mode == "move" && a.config.limit_drag_out && (+q < +a._min_date || +g > +a._max_date)) {
            if (+D.start_date < +a._min_date || +D.end_date > +a._max_date)
              q = new Date(D.start_date), g = new Date(D.end_date);
            else {
              var V = g - q;
              +q < +a._min_date ? (q = new Date(a._min_date), f._ignores && this.config.preserve_length && this._table_view ? (q = new Date(a._correct_drag_start_date(q)), k._start_correction && (q = new Date(q.valueOf() + k._start_correction)), g = new Date(1 * q + this._get_fictional_event_length(q, this._drag_event._event_length, k))) : g = new Date(+q + V)) : (g = new Date(a._max_date), f._ignores && this.config.preserve_length && this._table_view ? (k._end_correction && (g = new Date(g.valueOf() - k._end_correction)), g = new Date(1 * g - this._get_fictional_event_length(g, 0, k, !0)), q = new Date(1 * g - this._get_fictional_event_length(g, this._drag_event._event_length, k, !0)), this._ignores_detected && (q = a.date.add(q, k.x_step, k.x_unit), g = new Date(1 * g - this._get_fictional_event_length(g, 0, k, !0)), g = a.date.add(g, k.x_step, k.x_unit))) : q = new Date(+g - V));
            }
            Y = new Date(g - 1);
          }
          if (!this._table_view && this._dragEventBody && !a.config.all_timed && (!a._get_section_view() && f.x != this._get_event_sday({ start_date: new Date(p), end_date: new Date(p) }) || new Date(p).getHours() < this.config.first_hour) && (V = g - q, this._drag_mode == "move" && (S = this._min_date.valueOf() + 24 * f.x * 60 * 6e4, (q = new Date(S)).setHours(this.config.first_hour), g = new Date(q.valueOf() + V), Y = new Date(g - 1))), this._table_view || a.config.all_timed || !(!a.getView() && f.x != this._get_event_sday({ start_date: new Date(g), end_date: new Date(g) }) || new Date(g).getHours() >= this.config.last_hour) || (V = g - q, S = this._min_date.valueOf() + 24 * f.x * 60 * 6e4, (g = a.date.date_part(new Date(S))).setHours(this.config.last_hour), Y = new Date(g - 1), this._drag_mode == "move" && (q = new Date(+g - V))), this._table_view || Y.getDate() == q.getDate() && Y.getHours() < this.config.last_hour || a._allow_dnd)
            if (D.start_date = q, D.end_date = new Date(g), this.config.update_render) {
              var ve = a._els.dhx_cal_data[0].scrollTop;
              this.update_view(), a._els.dhx_cal_data[0].scrollTop = ve;
            } else
              this.updateEvent(this._drag_id);
          this._table_view && this.for_rendered(this._drag_id, function(xe) {
            xe.className += " dhx_in_move dhx_cal_event_drag";
          }), this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, c]);
        }
      } else if (a.checkEvent("onMouseMove")) {
        var Ne = this._locate_event(c.target || c.srcElement);
        this.callEvent("onMouseMove", [Ne, c]);
      }
    }, a._on_mouse_down = function(c, f) {
      if (c.button != 2 && !this.config.readonly && !this._drag_mode) {
        f = f || c.target || c.srcElement;
        var p = a._getClassName(f).split(" ")[0];
        switch (this.config.drag_event_body && p == "dhx_body" && f.parentNode && f.parentNode.className.indexOf("dhx_cal_select_menu") === -1 && (p = "dhx_event_move", this._dragEventBody = !0), p) {
          case "dhx_cal_event_line":
          case "dhx_cal_event_clear":
            this._table_view && (this._drag_mode = "move");
            break;
          case "dhx_event_move":
          case "dhx_wa_ev_body":
            this._drag_mode = "move";
            break;
          case "dhx_event_resize":
            this._drag_mode = "resize", a._getClassName(f).indexOf("dhx_event_resize_end") < 0 ? a._drag_from_start = !0 : a._drag_from_start = !1;
            break;
          case "dhx_scale_holder":
          case "dhx_scale_holder_now":
          case "dhx_month_body":
          case "dhx_matrix_cell":
          case "dhx_marked_timespan":
            this._drag_mode = "create";
            break;
          case "":
            if (f.parentNode)
              return a._on_mouse_down(c, f.parentNode);
            break;
          default:
            if ((!a.checkEvent("onMouseDown") || a.callEvent("onMouseDown", [p, c])) && f.parentNode && f != this && p != "dhx_body")
              return a._on_mouse_down(c, f.parentNode);
            this._drag_mode = null, this._drag_id = null;
        }
        if (this._drag_mode) {
          var g = this._locate_event(f);
          if (this.config["drag_" + this._drag_mode] && this.callEvent("onBeforeDrag", [g, this._drag_mode, c])) {
            if (this._drag_id = g, (this._edit_id != this._drag_id || this._edit_id && this._drag_mode == "create") && this._close_not_saved(), !this._drag_mode)
              return;
            this._drag_event = a._lame_clone(this.getEvent(this._drag_id) || {}), this._drag_pos = this._mouse_coords(c);
          } else
            this._drag_mode = this._drag_id = 0;
        }
        this._drag_start = null;
      }
    }, a._get_private_properties = function(c) {
      var f = {};
      for (var p in c)
        p.indexOf("_") === 0 && (f[p] = !0);
      return f;
    }, a._clear_temporary_properties = function(c, f) {
      var p = this._get_private_properties(c), g = this._get_private_properties(f);
      for (var y in g)
        p[y] || delete f[y];
    }, a._on_mouse_up = function(c) {
      if (!c || c.button != 2 || !this._mobile) {
        if (this._drag_mode && this._drag_id) {
          this._els.dhx_cal_data[0].style.cursor = "default";
          var f = this._drag_id, p = this._drag_mode, g = !this._drag_pos || this._drag_pos.has_moved;
          delete this._drag_event._move_event_shift;
          var y = this.getEvent(this._drag_id);
          if (g && (this._drag_event._dhx_changed || !this._drag_event.start_date || y.start_date.valueOf() != this._drag_event.start_date.valueOf() || y.end_date.valueOf() != this._drag_event.end_date.valueOf())) {
            var x = this._drag_mode == "new-size";
            if (this.callEvent("onBeforeEventChanged", [y, c, x, this._drag_event]))
              if (this._drag_id = this._drag_mode = null, x && this.config.edit_on_create) {
                if (this.unselect(), this._new_event = /* @__PURE__ */ new Date(), this._table_view || this.config.details_on_create || !this.config.select || !this.isOneDayEvent(this.getEvent(f)))
                  return a.callEvent("onDragEnd", [f, p, c]), this.showLightbox(f);
                this._drag_pos = !0, this._select_id = this._edit_id = f;
              } else
                this._new_event || this.callEvent(x ? "onEventAdded" : "onEventChanged", [f, this.getEvent(f)]);
            else
              x ? this.deleteEvent(y.id, !0) : (this._drag_event._dhx_changed = !1, this._clear_temporary_properties(y, this._drag_event), a._lame_copy(y, this._drag_event), this.updateEvent(y.id));
          }
          this._drag_pos && (this._drag_pos.has_moved || this._drag_pos === !0) && (this._drag_id = this._drag_mode = null, this.render_view_data()), a.callEvent("onDragEnd", [f, p, c]);
        }
        this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this._drag_event = null, this._drag_from_start = null;
      }
    }, a._trigger_dyn_loading = function() {
      return !(!this._load_mode || !this._load() || (this._render_wait = !0, 0));
    }, a.update_view = function() {
      this._reset_ignores(), this._update_nav_bar(this.config.header, this.$container.querySelector(".dhx_cal_navline"));
      var c = this[this._mode + "_view"];
      if (c ? c.call(this, !0) : this._reset_scale(), this._trigger_dyn_loading())
        return !0;
      this.render_view_data();
    }, a.isViewExists = function(c) {
      return !!(a[c + "_view"] || a.date[c + "_start"] && a.templates[c + "_date"] && a.templates[c + "_scale_date"]);
    }, a._set_aria_buttons_attrs = function() {
      for (var c = ["dhx_cal_next_button", "dhx_cal_prev_button", "dhx_cal_tab", "dhx_cal_today_button"], f = 0; f < c.length; f++)
        for (var p = this._els[c[f]], g = 0; p && g < p.length; g++) {
          var y = p[g].getAttribute("data-tab") || p[g].getAttribute("name"), x = this.locale.labels[c[f]];
          y && (x = this.locale.labels[y + "_tab"] || this.locale.labels[y] || x), c[f] == "dhx_cal_next_button" ? x = this.locale.labels.next : c[f] == "dhx_cal_prev_button" && (x = this.locale.labels.prev), this._waiAria.headerButtonsAttributes(p[g], x || "");
        }
    }, a.updateView = function(c, f) {
      if (!this.$container)
        throw new Error(`The scheduler is not initialized. 
 **scheduler.updateView** or **scheduler.setCurrentView** can be called only after **scheduler.init**`);
      c = c || this._date, f = f || this._mode;
      var p = "dhx_cal_data";
      this.locale.labels.icon_form || (this.locale.labels.icon_form = this.locale.labels.icon_edit);
      var g = this._obj, y = "dhx_scheduler_" + this._mode, x = "dhx_scheduler_" + f;
      this._mode && g.className.indexOf(y) != -1 ? g.className = g.className.replace(y, x) : g.className += " " + x;
      var b, k = "dhx_multi_day", w = !(this._mode != f || !this.config.preserve_scroll) && this._els[p][0].scrollTop;
      this._els[k] && this._els[k][0] && (b = this._els[k][0].scrollTop), this[this._mode + "_view"] && f && this._mode != f && this[this._mode + "_view"](!1), this._close_not_saved(), this._els[k] && (this._els[k][0].parentNode.removeChild(this._els[k][0]), this._els[k] = null), this._mode = f, this._date = c, this._table_view = this._mode == "month", this._dy_shift = 0, this.update_view(), this._set_aria_buttons_attrs();
      var D = this._els.dhx_cal_tab;
      if (D)
        for (var E = 0; E < D.length; E++) {
          var S = D[E];
          S.getAttribute("data-tab") == this._mode || S.getAttribute("name") == this._mode + "_tab" ? (S.classList.add("active"), this._waiAria.headerToggleState(S, !0)) : (S.classList.remove("active"), this._waiAria.headerToggleState(S, !1));
        }
      typeof w == "number" && (this._els[p][0].scrollTop = w), typeof b == "number" && this._els[k] && this._els[k][0] && (this._els[k][0].scrollTop = b);
    }, a.setCurrentView = function(c, f) {
      this.callEvent("onBeforeViewChange", [this._mode, this._date, f || this._mode, c || this._date]) && (this.updateView(c, f), this.callEvent("onViewChange", [this._mode, this._date]));
    }, a.render = function(c, f) {
      a.setCurrentView(c, f);
    }, a._render_x_header = function(c, f, p, g, y) {
      y = y || 0;
      var x = document.createElement("div");
      x.className = "dhx_scale_bar", this.templates[this._mode + "_scalex_class"] && (x.className += " " + this.templates[this._mode + "_scalex_class"](p));
      var b = this._cols[c];
      this._mode == "month" && c === 0 && this.config.left_border && (x.className += " dhx_scale_bar_border", f += 1), this.set_xy(x, b, this.xy.scale_height - 1, f, y);
      var k = this.templates[this._mode + "_scale_date"](p, this._mode);
      x.innerHTML = k, this._waiAria.dayHeaderAttr(x, k), g.appendChild(x);
    }, a._get_columns_num = function(c, f) {
      var p = 7;
      if (!a._table_view) {
        var g = a.date["get_" + a._mode + "_end"];
        g && (f = g(c)), p = Math.round((f.valueOf() - c.valueOf()) / 864e5);
      }
      return p;
    }, a._get_timeunit_start = function() {
      return this.date[this._mode + "_start"](new Date(this._date.valueOf()));
    }, a._get_view_end = function() {
      var c = this._get_timeunit_start(), f = a.date.add(c, 1, this._mode);
      if (!a._table_view) {
        var p = a.date["get_" + a._mode + "_end"];
        p && (f = p(c));
      }
      return f;
    }, a._calc_scale_sizes = function(c, f, p) {
      var g = this.config.rtl, y = c, x = this._get_columns_num(f, p);
      this._process_ignores(f, x, "day", 1);
      for (var b = x - this._ignores_detected, k = 0; k < x; k++)
        this._ignores[k] ? (this._cols[k] = 0, b++) : this._cols[k] = Math.floor(y / (b - k)), y -= this._cols[k], this._colsS[k] = (this._cols[k - 1] || 0) + (this._colsS[k - 1] || (this._table_view ? 0 : g ? this.xy.scroll_width : this.xy.scale_width));
      this._colsS.col_length = x, this._colsS[x] = this._cols[x - 1] + this._colsS[x - 1] || 0;
    }, a._set_scale_col_size = function(c, f, p) {
      var g = this.config;
      this.set_xy(c, f, g.hour_size_px * (g.last_hour - g.first_hour), p + this.xy.scale_width + 1, 0);
    }, a._render_scales = function(c, f) {
      var p = new Date(a._min_date), g = new Date(a._max_date), y = this.date.date_part(a._currentDate()), x = parseInt(c.style.width, 10) - 1, b = new Date(this._min_date), k = this._get_columns_num(p, g);
      this._calc_scale_sizes(x, p, g);
      var w = 0;
      c.innerHTML = "";
      for (var D = 0; D < k; D++) {
        if (this._ignores[D] || this._render_x_header(D, w, b, c), !this._table_view) {
          var E = document.createElement("div"), S = "dhx_scale_holder";
          b.valueOf() == y.valueOf() && (S += " dhx_scale_holder_now"), E.setAttribute("data-column-index", D), this._ignores_detected && this._ignores[D] && (S += " dhx_scale_ignore");
          for (let N = 1 * this.config.first_hour; N < this.config.last_hour; N++) {
            const M = document.createElement("div");
            M.className = "dhx_scale_time_slot dhx_scale_time_slot_hour_start", M.style.height = this.config.hour_size_px / 2 + "px";
            let T = new Date(b.getFullYear(), b.getMonth(), b.getDate(), N, 0);
            M.setAttribute("data-slot-date", this.templates.format_date(T));
            let A = this.templates.time_slot_text(T);
            A && (M.innerHTML = A);
            let H = this.templates.time_slot_class(T);
            H && M.classList.add(H), E.appendChild(M);
            const $ = document.createElement("div");
            $.className = "dhx_scale_time_slot", T = new Date(b.getFullYear(), b.getMonth(), b.getDate(), N, 30), $.setAttribute("data-slot-date", this.templates.format_date(T)), $.style.height = this.config.hour_size_px / 2 + "px", A = this.templates.time_slot_text(T), A && ($.innerHTML = A), H = this.templates.time_slot_class(T), H && $.classList.add(H), E.appendChild($);
          }
          E.className = S + " " + this.templates.week_date_class(b, y), this._waiAria.dayColumnAttr(E, b), this._set_scale_col_size(E, this._cols[D], w), f.appendChild(E), this.callEvent("onScaleAdd", [E, b]);
        }
        w += this._cols[D], b = this.date.add(b, 1, "day"), b = this.date.day_start(b);
      }
    }, a._getNavDateElement = function() {
      return this.$container.querySelector(".dhx_cal_date");
    }, a._reset_scale = function() {
      if (this.templates[this._mode + "_date"]) {
        var c = this._els.dhx_cal_header[0], f = this._els.dhx_cal_data[0], p = this.config;
        c.innerHTML = "", f.innerHTML = "";
        var g, y, x = (p.readonly || !p.drag_resize ? " dhx_resize_denied" : "") + (p.readonly || !p.drag_move ? " dhx_move_denied" : "");
        f.className = "dhx_cal_data" + x, this._scales = {}, this._cols = [], this._colsS = { height: 0 }, this._dy_shift = 0, this.set_sizes();
        var b = this._get_timeunit_start(), k = a._get_view_end();
        g = y = this._table_view ? a.date.week_start(b) : b, this._min_date = g;
        var w = this.templates[this._mode + "_date"](b, k, this._mode), D = this._getNavDateElement();
        if (D && (D.innerHTML = w, this._waiAria.navBarDateAttr(D, w)), this._max_date = k, a._render_scales(c, f), this._table_view)
          this._reset_month_scale(f, b, y);
        else if (this._reset_hours_scale(f, b, y), p.multi_day) {
          var E = "dhx_multi_day";
          this._els[E] && (this._els[E][0].parentNode.removeChild(this._els[E][0]), this._els[E] = null);
          var S = document.createElement("div");
          S.className = E, S.style.visibility = "hidden", S.style.display = "none";
          var N = this._colsS[this._colsS.col_length], M = p.rtl ? this.xy.scale_width : this.xy.scroll_width, T = Math.max(N + M, 0);
          this.set_xy(S, T, 0, 0), f.parentNode.insertBefore(S, f);
          var A = S.cloneNode(!0);
          A.className = E + "_icon", A.style.visibility = "hidden", A.style.display = "none", this.set_xy(A, this.xy.scale_width + 1, 0, 0), S.appendChild(A), this._els[E] = [S, A], a.event(this._els[E][0], "click", this._click.dhx_cal_data);
        }
      }
    }, a._reset_hours_scale = function(c, f, p) {
      var g = document.createElement("div");
      g.className = "dhx_scale_holder";
      for (var y = new Date(1980, 1, 1, this.config.first_hour, 0, 0), x = 1 * this.config.first_hour; x < this.config.last_hour; x++) {
        var b = document.createElement("div");
        b.className = "dhx_scale_hour", b.style.height = this.config.hour_size_px + "px";
        var k = this.xy.scale_width;
        this.config.left_border && (b.className += " dhx_scale_hour_border"), b.style.width = k + "px";
        var w = a.templates.hour_scale(y);
        b.innerHTML = w, this._waiAria.hourScaleAttr(b, w), g.appendChild(b), y = this.date.add(y, 1, "hour");
      }
      c.appendChild(g), this.config.scroll_hour && (c.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour));
    }, a._currentDate = function() {
      return a.config.now_date ? new Date(a.config.now_date) : /* @__PURE__ */ new Date();
    }, a._reset_ignores = function() {
      this._ignores = {}, this._ignores_detected = 0;
    }, a._process_ignores = function(c, f, p, g, y) {
      this._reset_ignores();
      var x = a["ignore_" + this._mode];
      if (x)
        for (var b = new Date(c), k = 0; k < f; k++)
          x(b) && (this._ignores_detected += 1, this._ignores[k] = !0, y && f++), b = a.date.add(b, g, p), a.date[p + "_start"] && (b = a.date[p + "_start"](b));
    }, a._render_month_scale = function(c, f, p, g) {
      var y = a.date.add(f, 1, "month"), x = new Date(p), b = a._currentDate();
      this.date.date_part(b), this.date.date_part(p), g = g || Math.ceil(Math.round((y.valueOf() - p.valueOf()) / 864e5) / 7);
      for (var k = [], w = 0; w <= 7; w++) {
        var D = this._cols[w] || 0;
        isNaN(Number(D)) || (D += "px"), k[w] = D;
      }
      function E(q) {
        var V = a._colsS.height;
        return a._colsS.heights[q + 1] !== void 0 && (V = a._colsS.heights[q + 1] - (a._colsS.heights[q] || 0)), V;
      }
      var S = 0;
      const N = document.createElement("div");
      for (N.classList.add("dhx_cal_month_table"), w = 0; w < g; w++) {
        var M = document.createElement("div");
        M.classList.add("dhx_cal_month_row"), M.style.height = E(w) + "px", N.appendChild(M);
        for (var T = 0; T < 7; T++) {
          var A = document.createElement("div");
          M.appendChild(A);
          var H = "dhx_cal_month_cell";
          p < f ? H += " dhx_before" : p >= y ? H += " dhx_after" : p.valueOf() == b.valueOf() && (H += " dhx_now"), this._ignores_detected && this._ignores[T] && (H += " dhx_scale_ignore"), A.className = H + " " + this.templates.month_date_class(p, b), A.setAttribute("data-cell-date", a.templates.format_date(p));
          var $ = "dhx_month_body", j = "dhx_month_head";
          if (T === 0 && this.config.left_border && ($ += " dhx_month_body_border", j += " dhx_month_head_border"), this._ignores_detected && this._ignores[T])
            A.appendChild(document.createElement("div")), A.appendChild(document.createElement("div"));
          else {
            A.style.width = k[T], this._waiAria.monthCellAttr(A, p);
            var z = document.createElement("div");
            z.style.height = a.xy.month_head_height + "px", z.className = j, z.innerHTML = this.templates.month_day(p), A.appendChild(z);
            var W = document.createElement("div");
            W.className = $, A.appendChild(W);
          }
          var Y = p.getDate();
          (p = this.date.add(p, 1, "day")).getDate() - Y > 1 && (p = new Date(p.getFullYear(), p.getMonth(), Y + 1, 12, 0));
        }
        a._colsS.heights[w] = S, S += E(w);
      }
      return this._min_date = x, this._max_date = p, c.innerHTML = "", c.appendChild(N), this._scales = {}, c.querySelectorAll("[data-cell-date]").forEach((q) => {
        const V = a.templates.parse_date(q.getAttribute("data-cell-date")), ve = q.querySelector(".dhx_month_body");
        this._scales[+V] = ve, this.callEvent("onScaleAdd", [this._scales[+V], V]);
      }), this._max_date;
    }, a._reset_month_scale = function(c, f, p, g) {
      var y = a.date.add(f, 1, "month"), x = a._currentDate();
      this.date.date_part(x), this.date.date_part(p), g = g || Math.ceil(Math.round((y.valueOf() - p.valueOf()) / 864e5) / 7);
      var b = Math.floor(c.clientHeight / g) - this.xy.month_head_height;
      return this._colsS.height = b + this.xy.month_head_height, this._colsS.heights = [], a._render_month_scale(c, f, p, g);
    }, a.getView = function(c) {
      return c || (c = a.getState().mode), a.matrix && a.matrix[c] ? a.matrix[c] : a._props && a._props[c] ? a._props[c] : null;
    }, a.getLabel = function(c, f) {
      for (var p = this.config.lightbox.sections, g = 0; g < p.length; g++)
        if (p[g].map_to == c) {
          for (var y = p[g].options, x = 0; x < y.length; x++)
            if (y[x].key == f)
              return y[x].label;
        }
      return "";
    }, a.updateCollection = function(c, f) {
      var p = a.serverList(c);
      return !!p && (p.splice(0, p.length), p.push.apply(p, f || []), a.callEvent("onOptionsLoad", []), a.resetLightbox(), a.hideCover(), !0);
    }, a._lame_clone = function(c, f) {
      var p, g, y;
      for (f = f || [], p = 0; p < f.length; p += 2)
        if (c === f[p])
          return f[p + 1];
      if (c && typeof c == "object") {
        for (y = Object.create(c), g = [Array, Date, Number, String, Boolean], p = 0; p < g.length; p++)
          c instanceof g[p] && (y = p ? new g[p](c) : new g[p]());
        for (p in f.push(c, y), c)
          Object.prototype.hasOwnProperty.apply(c, [p]) && (y[p] = a._lame_clone(c[p], f));
      }
      return y || c;
    }, a._lame_copy = function(c, f) {
      for (var p in f)
        f.hasOwnProperty(p) && (c[p] = f[p]);
      return c;
    }, a._get_date_from_pos = function(c) {
      var f = this._min_date.valueOf() + 6e4 * (c.y * this.config.time_step + 24 * (this._table_view ? 0 : c.x) * 60);
      return new Date(this._correct_shift(f));
    }, a.getActionData = function(c) {
      var f = this._mouse_coords(c);
      return { date: this._get_date_from_pos(f), section: f.section };
    }, a._focus = function(c, f) {
      if (c && c.focus)
        if (this._mobile)
          window.setTimeout(function() {
            c.focus();
          }, 10);
        else
          try {
            f && c.select && c.offsetWidth && c.select(), c.focus();
          } catch {
          }
    }, a._get_real_event_length = function(c, f, p) {
      var g, y = f - c, x = this["ignore_" + this._mode], b = 0;
      p.render ? (b = this._get_date_index(p, c), g = this._get_date_index(p, f), c.valueOf() < a.getState().min_date.valueOf() && (b = -u(c, a.getState().min_date)), f.valueOf() > a.getState().max_date.valueOf() && (g += u(f, a.getState().max_date))) : g = Math.round(y / 60 / 60 / 1e3 / 24);
      for (var k = !0; b < g; ) {
        var w = a.date.add(f, -p.x_step, p.x_unit);
        if (x && x(f) && (!k || k && x(w)))
          y -= f - w;
        else {
          let D = 0;
          const E = new Date(Math.max(w.valueOf(), c.valueOf())), S = f, N = new Date(E.getFullYear(), E.getMonth(), E.getDate(), p.first_hour), M = new Date(E.getFullYear(), E.getMonth(), E.getDate(), p.last_hour || 24), T = new Date(f.getFullYear(), f.getMonth(), f.getDate(), p.first_hour), A = new Date(f.getFullYear(), f.getMonth(), f.getDate(), p.last_hour || 24);
          S.valueOf() > A.valueOf() && (D += S - A), S.valueOf() > T.valueOf() ? D += p._start_correction : D += 60 * S.getHours() * 60 * 1e3 + 60 * S.getMinutes() * 1e3, E.valueOf() <= M.valueOf() && (D += p._end_correction), E.valueOf() < N.valueOf() && (D += N.valueOf() - E.valueOf()), y -= D, k = !1;
        }
        f = w, g--;
      }
      return y;
    }, a._get_fictional_event_length = function(c, f, p, g) {
      var y = new Date(c), x = g ? -1 : 1;
      if (p._start_correction || p._end_correction) {
        var b;
        b = g ? 60 * y.getHours() + y.getMinutes() - 60 * (p.first_hour || 0) : 60 * (p.last_hour || 0) - (60 * y.getHours() + y.getMinutes());
        var k = 60 * (p.last_hour - p.first_hour), w = Math.ceil((f / 6e4 - b) / k);
        w < 0 && (w = 0), f += w * (1440 - k) * 60 * 1e3;
      }
      var D, E = new Date(1 * c + f * x), S = this["ignore_" + this._mode], N = 0;
      for (p.render ? (N = this._get_date_index(p, y), D = this._get_date_index(p, E)) : D = Math.round(f / 60 / 60 / 1e3 / 24); N * x <= D * x; ) {
        var M = a.date.add(y, p.x_step * x, p.x_unit);
        S && S(y) && (f += (M - y) * x, D += x), y = M, N += x;
      }
      return f;
    }, a._get_section_view = function() {
      return this.getView();
    }, a._get_section_property = function() {
      return this.matrix && this.matrix[this._mode] ? this.matrix[this._mode].y_property : this._props && this._props[this._mode] ? this._props[this._mode].map_to : null;
    }, a._is_initialized = function() {
      var c = this.getState();
      return this._obj && c.date && c.mode;
    }, a._is_lightbox_open = function() {
      var c = this.getState();
      return c.lightbox_id !== null && c.lightbox_id !== void 0;
    };
  }(i), function(a) {
    (function() {
      var o = new RegExp(`<(?:.|
)*?>`, "gm"), l = new RegExp(" +", "gm");
      function h(c) {
        return (c + "").replace(o, " ").replace(l, " ");
      }
      var m = new RegExp("'", "gm");
      function v(c) {
        return (c + "").replace(m, "&#39;");
      }
      for (var u in a._waiAria = { getAttributeString: function(c) {
        var f = [" "];
        for (var p in c)
          if (typeof c[p] != "function" && typeof c[p] != "object") {
            var g = v(h(c[p]));
            f.push(p + "='" + g + "'");
          }
        return f.push(" "), f.join(" ");
      }, setAttributes: function(c, f) {
        for (var p in f)
          c.setAttribute(p, h(f[p]));
        return c;
      }, labelAttr: function(c, f) {
        return this.setAttributes(c, { "aria-label": f });
      }, label: function(c) {
        return a._waiAria.getAttributeString({ "aria-label": c });
      }, hourScaleAttr: function(c, f) {
        this.labelAttr(c, f);
      }, monthCellAttr: function(c, f) {
        this.labelAttr(c, a.templates.day_date(f));
      }, navBarDateAttr: function(c, f) {
        this.labelAttr(c, f);
      }, dayHeaderAttr: function(c, f) {
        this.labelAttr(c, f);
      }, dayColumnAttr: function(c, f) {
        this.dayHeaderAttr(c, a.templates.day_date(f));
      }, headerButtonsAttributes: function(c, f) {
        return this.setAttributes(c, { role: "button", "aria-label": f });
      }, headerToggleState: function(c, f) {
        return this.setAttributes(c, { "aria-pressed": f ? "true" : "false" });
      }, getHeaderCellAttr: function(c) {
        return a._waiAria.getAttributeString({ "aria-label": c });
      }, eventAttr: function(c, f) {
        this._eventCommonAttr(c, f);
      }, _eventCommonAttr: function(c, f) {
        f.setAttribute("aria-label", h(a.templates.event_text(c.start_date, c.end_date, c))), a.config.readonly && f.setAttribute("aria-readonly", !0), c.$dataprocessor_class && f.setAttribute("aria-busy", !0), f.setAttribute("aria-selected", a.getState().select_id == c.id ? "true" : "false");
      }, setEventBarAttr: function(c, f) {
        this._eventCommonAttr(c, f);
      }, _getAttributes: function(c, f) {
        var p = { setAttribute: function(g, y) {
          this[g] = y;
        } };
        return c.apply(this, [f, p]), p;
      }, eventBarAttrString: function(c) {
        return this.getAttributeString(this._getAttributes(this.setEventBarAttr, c));
      }, agendaHeadAttrString: function() {
        return this.getAttributeString({ role: "row" });
      }, agendaHeadDateString: function(c) {
        return this.getAttributeString({ role: "columnheader", "aria-label": c });
      }, agendaHeadDescriptionString: function(c) {
        return this.agendaHeadDateString(c);
      }, agendaDataAttrString: function() {
        return this.getAttributeString({ role: "grid" });
      }, agendaEventAttrString: function(c) {
        var f = this._getAttributes(this._eventCommonAttr, c);
        return f.role = "row", this.getAttributeString(f);
      }, agendaDetailsBtnString: function() {
        return this.getAttributeString({ role: "button", "aria-label": a.locale.labels.icon_details });
      }, gridAttrString: function() {
        return this.getAttributeString({ role: "grid" });
      }, gridRowAttrString: function(c) {
        return this.agendaEventAttrString(c);
      }, gridCellAttrString: function(c, f, p) {
        return this.getAttributeString({ role: "gridcell", "aria-label": [f.label === void 0 ? f.id : f.label, ": ", p] });
      }, mapAttrString: function() {
        return this.gridAttrString();
      }, mapRowAttrString: function(c) {
        return this.gridRowAttrString(c);
      }, mapDetailsBtnString: function() {
        return this.agendaDetailsBtnString();
      }, minicalHeader: function(c, f) {
        this.setAttributes(c, { id: f + "", "aria-live": "assertice", "aria-atomic": "true" });
      }, minicalGrid: function(c, f) {
        this.setAttributes(c, { "aria-labelledby": f + "", role: "grid" });
      }, minicalRow: function(c) {
        this.setAttributes(c, { role: "row" });
      }, minicalDayCell: function(c, f) {
        var p = f.valueOf() < a._max_date.valueOf() && f.valueOf() >= a._min_date.valueOf();
        this.setAttributes(c, { role: "gridcell", "aria-label": a.templates.day_date(f), "aria-selected": p ? "true" : "false" });
      }, minicalHeadCell: function(c) {
        this.setAttributes(c, { role: "columnheader" });
      }, weekAgendaDayCell: function(c, f) {
        var p = c.querySelector(".dhx_wa_scale_bar"), g = c.querySelector(".dhx_wa_day_data"), y = a.uid() + "";
        this.setAttributes(p, { id: y }), this.setAttributes(g, { "aria-labelledby": y });
      }, weekAgendaEvent: function(c, f) {
        this.eventAttr(f, c);
      }, lightboxHiddenAttr: function(c) {
        c.setAttribute("aria-hidden", "true");
      }, lightboxVisibleAttr: function(c) {
        c.setAttribute("aria-hidden", "false");
      }, lightboxSectionButtonAttrString: function(c) {
        return this.getAttributeString({ role: "button", "aria-label": c, tabindex: "0" });
      }, yearHeader: function(c, f) {
        this.setAttributes(c, { id: f + "" });
      }, yearGrid: function(c, f) {
        this.minicalGrid(c, f);
      }, yearHeadCell: function(c) {
        return this.minicalHeadCell(c);
      }, yearRow: function(c) {
        return this.minicalRow(c);
      }, yearDayCell: function(c) {
        this.setAttributes(c, { role: "gridcell" });
      }, lightboxAttr: function(c) {
        c.setAttribute("role", "dialog"), c.setAttribute("aria-hidden", "true"), c.firstChild.setAttribute("role", "heading");
      }, lightboxButtonAttrString: function(c) {
        return this.getAttributeString({ role: "button", "aria-label": a.locale.labels[c], tabindex: "0" });
      }, eventMenuAttrString: function(c) {
        return this.getAttributeString({ role: "button", "aria-label": a.locale.labels[c] });
      }, lightboxHeader: function(c, f) {
        c.setAttribute("aria-label", f);
      }, lightboxSelectAttrString: function(c) {
        var f = "";
        switch (c) {
          case "%Y":
            f = a.locale.labels.year;
            break;
          case "%m":
            f = a.locale.labels.month;
            break;
          case "%d":
            f = a.locale.labels.day;
            break;
          case "%H:%i":
            f = a.locale.labels.hour + " " + a.locale.labels.minute;
        }
        return a._waiAria.getAttributeString({ "aria-label": f });
      }, messageButtonAttrString: function(c) {
        return "tabindex='0' role='button' aria-label='" + c + "'";
      }, messageInfoAttr: function(c) {
        c.setAttribute("role", "alert");
      }, messageModalAttr: function(c, f) {
        c.setAttribute("role", "dialog"), f && c.setAttribute("aria-labelledby", f);
      }, quickInfoAttr: function(c) {
        c.setAttribute("role", "dialog");
      }, quickInfoHeaderAttrString: function() {
        return " role='heading' ";
      }, quickInfoHeader: function(c, f) {
        c.setAttribute("aria-label", f);
      }, quickInfoButtonAttrString: function(c) {
        return a._waiAria.getAttributeString({ role: "button", "aria-label": c, tabindex: "0" });
      }, tooltipAttr: function(c) {
        c.setAttribute("role", "tooltip");
      }, tooltipVisibleAttr: function(c) {
        c.setAttribute("aria-hidden", "false");
      }, tooltipHiddenAttr: function(c) {
        c.setAttribute("aria-hidden", "true");
      } }, a._waiAria)
        a._waiAria[u] = function(c) {
          return function() {
            return a.config.wai_aria_attributes ? c.apply(this, arguments) : " ";
          };
        }(a._waiAria[u]);
    })();
  }(i), i.utils = ee, i.$domHelpers = _e, i.utils.dom = _e, i.uid = ee.uid, i.mixin = ee.mixin, i.defined = ee.defined, i.assert = function(a) {
    return function(o, l) {
      o || a.config.show_errors && a.callEvent("onError", [l]) !== !1 && (a.message ? a.message({ type: "error", text: l, expire: -1 }) : console.log(l));
    };
  }(i), i.copy = ee.copy, i._createDatePicker = function(a, o) {
    return new Da(i, a, o);
  }, i._getFocusableNodes = _e.getFocusableNodes, i._getClassName = _e.getClassName, i._locate_css = _e.locateCss;
  const t = Wt(i);
  var r, d, n;
  i.utils.mixin(i, t), i.env = i.$env = Yt, i.Promise = window.Promise, function(a) {
    a.destructor = function() {
      for (var o in a.callEvent("onDestroy", []), this.clearAll(), this.$container && (this.$container.innerHTML = ""), this._eventRemoveAll && this._eventRemoveAll(), this.resetLightbox && this.resetLightbox(), this._dp && this._dp.destructor && this._dp.destructor(), this.detachAllEvents(), this)
        o.indexOf("$") === 0 && delete this[o];
      a.$destroyed = !0;
    };
  }(i), function(a) {
    function o(l, h) {
      var m = { method: l };
      if (h.length === 0)
        throw new Error("Arguments list of query is wrong.");
      if (h.length === 1)
        return typeof h[0] == "string" ? (m.url = h[0], m.async = !0) : (m.url = h[0].url, m.async = h[0].async || !0, m.callback = h[0].callback, m.headers = h[0].headers), h[0].data ? typeof h[0].data != "string" ? m.data = Te(h[0].data) : m.data = h[0].data : m.data = "", m;
      switch (m.url = h[0], l) {
        case "GET":
        case "DELETE":
          m.callback = h[1], m.headers = h[2];
          break;
        case "POST":
        case "PUT":
          h[1] ? typeof h[1] != "string" ? m.data = Te(h[1]) : m.data = h[1] : m.data = "", m.callback = h[2], m.headers = h[3];
      }
      return m;
    }
    a.Promise = window.Promise, a.ajax = { cache: !0, method: "get", serializeRequestParams: Te, parse: function(l) {
      return typeof l != "string" ? l : (l = l.replace(/^[\s]+/, ""), typeof DOMParser > "u" || a.$env.isIE ? window.ActiveXObject !== void 0 && ((h = new window.ActiveXObject("Microsoft.XMLDOM")).async = "false", h.loadXML(l)) : h = new DOMParser().parseFromString(l, "text/xml"), h);
      var h;
    }, xmltop: function(l, h, m) {
      if (h.status === void 0 || h.status < 400) {
        var v = h.responseXML ? h.responseXML || h : this.parse(h.responseText || h);
        if (v && v.documentElement !== null && !v.getElementsByTagName("parsererror").length)
          return v.getElementsByTagName(l)[0];
      }
      return m !== -1 && a.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], m]), document.createElement("DIV");
    }, xpath: function(l, h) {
      if (h.nodeName || (h = h.responseXML || h), a.$env.isIE)
        return h.selectNodes(l) || [];
      for (var m, v = [], u = (h.ownerDocument || h).evaluate(l, h, null, XPathResult.ANY_TYPE, null); m = u.iterateNext(); )
        v.push(m);
      return v;
    }, query: function(l) {
      return this._call(l.method || "GET", l.url, l.data || "", l.async || !0, l.callback, l.headers);
    }, get: function(l, h, m) {
      var v = o("GET", arguments);
      return this.query(v);
    }, getSync: function(l, h) {
      var m = o("GET", arguments);
      return m.async = !1, this.query(m);
    }, put: function(l, h, m, v) {
      var u = o("PUT", arguments);
      return this.query(u);
    }, del: function(l, h, m) {
      var v = o("DELETE", arguments);
      return this.query(v);
    }, post: function(l, h, m, v) {
      arguments.length == 1 ? h = "" : arguments.length == 2 && typeof h == "function" && (m = h, h = "");
      var u = o("POST", arguments);
      return this.query(u);
    }, postSync: function(l, h, m) {
      h = h === null ? "" : String(h);
      var v = o("POST", arguments);
      return v.async = !1, this.query(v);
    }, _call: function(l, h, m, v, u, c) {
      return new a.Promise((function(f, p) {
        var g = typeof XMLHttpRequest === void 0 || a.$env.isIE ? new window.ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest(), y = navigator.userAgent.match(/AppleWebKit/) !== null && navigator.userAgent.match(/Qt/) !== null && navigator.userAgent.match(/Safari/) !== null;
        if (v && g.addEventListener("readystatechange", function() {
          if (g.readyState == 4 || y && g.readyState == 3) {
            if ((g.status != 200 || g.responseText === "") && !a.callEvent("onAjaxError", [g]))
              return;
            setTimeout(function() {
              typeof u == "function" && u.apply(window, [{ xmlDoc: g, filePath: h }]), f(g), typeof u == "function" && (u = null, g = null);
            }, 0);
          }
        }), l != "GET" || this.cache || (h += (h.indexOf("?") >= 0 ? "&" : "?") + "dhxr" + (/* @__PURE__ */ new Date()).getTime() + "=1"), g.open(l, h, v), c)
          for (var x in c)
            g.setRequestHeader(x, c[x]);
        else
          l.toUpperCase() == "POST" || l == "PUT" || l == "DELETE" ? g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") : l == "GET" && (m = null);
        if (g.setRequestHeader("X-Requested-With", "XMLHttpRequest"), g.send(m), !v)
          return { xmlDoc: g, filePath: h };
      }).bind(this));
    }, urlSeparator: function(l) {
      return l.indexOf("?") != -1 ? "&" : "?";
    } }, a.$ajax = a.ajax;
  }(i), Ut(i), function(a) {
    a.config = { default_date: "%j %M %Y", month_date: "%F %Y", load_date: "%Y-%m-%d", week_date: "%l", day_date: "%D %j", hour_date: "%H:%i", month_day: "%d", date_format: "%Y-%m-%d %H:%i", api_date: "%d-%m-%Y %H:%i", parse_exact_format: !1, preserve_length: !0, time_step: 5, displayed_event_color: "#ff4a4a", displayed_event_text_color: "#ffef80", wide_form: 0, day_column_padding: 8, use_select_menu_space: !0, fix_tab_position: !0, start_on_monday: !0, first_hour: 0, last_hour: 24, readonly: !1, drag_resize: !0, drag_move: !0, drag_create: !0, drag_event_body: !0, dblclick_create: !0, details_on_dblclick: !0, edit_on_create: !0, details_on_create: !0, header: null, hour_size_px: 44, resize_month_events: !1, resize_month_timed: !1, responsive_lightbox: !1, separate_short_events: !0, rtl: !1, cascade_event_display: !1, cascade_event_count: 4, cascade_event_margin: 30, multi_day: !0, multi_day_height_limit: 200, drag_lightbox: !0, preserve_scroll: !0, select: !0, undo_deleted: !0, server_utc: !1, touch: !0, touch_tip: !0, touch_drag: 500, touch_swipe_dates: !1, quick_info_detached: !0, positive_closing: !1, drag_highlight: !0, limit_drag_out: !1, icons_edit: ["icon_save", "icon_cancel"], icons_select: ["icon_details", "icon_edit", "icon_delete"], buttons_left: ["dhx_save_btn", "dhx_cancel_btn"], buttons_right: ["dhx_delete_btn"], lightbox: { sections: [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "time", height: 72, type: "time", map_to: "auto" }] }, highlight_displayed_event: !0, left_border: !1, ajax_error: "alert", delay_render: 0, timeline_swap_resize: !0, wai_aria_attributes: !0, wai_aria_application_role: !0, csp: "auto", event_attribute: "data-event-id", show_errors: !0 }, a.config.buttons_left.$initial = a.config.buttons_left.join(), a.config.buttons_right.$initial = a.config.buttons_right.join(), a._helpers = { parseDate: function(o) {
      return (a.templates.xml_date || a.templates.parse_date)(o);
    }, formatDate: function(o) {
      return (a.templates.xml_format || a.templates.format_date)(o);
    } }, a.templates = {}, a.init_templates = function() {
      var o = a.date.date_to_str, l = a.config;
      (function(h, m) {
        for (var v in m)
          h[v] || (h[v] = m[v]);
      })(a.templates, { day_date: o(l.default_date), month_date: o(l.month_date), week_date: function(h, m) {
        return l.rtl ? a.templates.day_date(a.date.add(m, -1, "day")) + " &ndash; " + a.templates.day_date(h) : a.templates.day_date(h) + " &ndash; " + a.templates.day_date(a.date.add(m, -1, "day"));
      }, day_scale_date: o(l.default_date), time_slot_text: function(h) {
        return "";
      }, time_slot_class: function(h) {
        return "";
      }, month_scale_date: o(l.week_date), week_scale_date: o(l.day_date), hour_scale: o(l.hour_date), time_picker: o(l.hour_date), event_date: o(l.hour_date), month_day: o(l.month_day), load_format: o(l.load_date), format_date: o(l.date_format, l.server_utc), parse_date: a.date.str_to_date(l.date_format, l.server_utc), api_date: a.date.str_to_date(l.api_date, !1, !1), event_header: function(h, m, v) {
        return v._mode === "small" || v._mode === "smallest" ? a.templates.event_date(h) : a.templates.event_date(h) + " - " + a.templates.event_date(m);
      }, event_text: function(h, m, v) {
        return v.text;
      }, event_class: function(h, m, v) {
        return "";
      }, month_date_class: function(h) {
        return "";
      }, week_date_class: function(h) {
        return "";
      }, event_bar_date: function(h, m, v) {
        return a.templates.event_date(h);
      }, event_bar_text: function(h, m, v) {
        return v.text;
      }, month_events_link: function(h, m) {
        return "<a>View more(" + m + " events)</a>";
      }, drag_marker_class: function(h, m, v) {
        return "";
      }, drag_marker_content: function(h, m, v) {
        return "";
      }, tooltip_date_format: a.date.date_to_str("%Y-%m-%d %H:%i"), tooltip_text: function(h, m, v) {
        return "<b>Event:</b> " + v.text + "<br/><b>Start date:</b> " + a.templates.tooltip_date_format(h) + "<br/><b>End date:</b> " + a.templates.tooltip_date_format(m);
      }, calendar_month: o("%F %Y"), calendar_scale_date: o("%D"), calendar_date: o("%d"), calendar_time: o("%d-%m-%Y") }), this.callEvent("onTemplatesReady", []);
    };
  }(i), function(a) {
    a._events = {}, a.clearAll = function() {
      this._events = {}, this._loaded = {}, this._edit_id = null, this._select_id = null, this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this._new_event = null, this.clear_view(), this.callEvent("onClearAll", []);
    }, a.addEvent = function(o, l, h, m, v) {
      if (!arguments.length)
        return this.addEventNow();
      var u = o;
      arguments.length != 1 && ((u = v || {}).start_date = o, u.end_date = l, u.text = h, u.id = m), u.id = u.id || a.uid(), u.text = u.text || "", typeof u.start_date == "string" && (u.start_date = this.templates.api_date(u.start_date)), typeof u.end_date == "string" && (u.end_date = this.templates.api_date(u.end_date));
      var c = 6e4 * (this.config.event_duration || this.config.time_step);
      u.start_date.valueOf() == u.end_date.valueOf() && u.end_date.setTime(u.end_date.valueOf() + c), u.start_date.setMilliseconds(0), u.end_date.setMilliseconds(0), u._timed = this.isOneDayEvent(u);
      var f = !this._events[u.id];
      return this._events[u.id] = u, this.event_updated(u), this._loading || this.callEvent(f ? "onEventAdded" : "onEventChanged", [u.id, u]), u.id;
    }, a.deleteEvent = function(o, l) {
      var h = this._events[o];
      (l || this.callEvent("onBeforeEventDelete", [o, h]) && this.callEvent("onConfirmedBeforeEventDelete", [o, h])) && (h && (a.getState().select_id == o && a.unselect(), delete this._events[o], this.event_updated(h), this._drag_id == h.id && (this._drag_id = null, this._drag_mode = null, this._drag_pos = null)), this.callEvent("onEventDeleted", [o, h]));
    }, a.getEvent = function(o) {
      return this._events[o];
    }, a.setEvent = function(o, l) {
      l.id || (l.id = o), this._events[o] = l;
    }, a.for_rendered = function(o, l) {
      for (var h = this._rendered.length - 1; h >= 0; h--)
        this._rendered[h].getAttribute(this.config.event_attribute) == o && l(this._rendered[h], h);
    }, a.changeEventId = function(o, l) {
      if (o != l) {
        var h = this._events[o];
        h && (h.id = l, this._events[l] = h, delete this._events[o]), this.for_rendered(o, function(m) {
          m.setAttribute("event_id", l), m.setAttribute(a.config.event_attribute, l);
        }), this._select_id == o && (this._select_id = l), this._edit_id == o && (this._edit_id = l), this.callEvent("onEventIdChange", [o, l]);
      }
    }, function() {
      for (var o = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"], l = function(v) {
        return function(u) {
          return a.getEvent(u)[v];
        };
      }, h = function(v) {
        return function(u, c) {
          var f = a.getEvent(u);
          f[v] = c, f._changed = !0, f._timed = this.isOneDayEvent(f), a.event_updated(f, !0);
        };
      }, m = 0; m < o.length; m += 2)
        a["getEvent" + o[m + 1]] = l(o[m]), a["setEvent" + o[m + 1]] = h(o[m]);
    }(), a.event_updated = function(o, l) {
      this.is_visible_events(o) ? this.render_view_data() : this.clear_event(o.id);
    }, a.is_visible_events = function(o) {
      if (!this._min_date || !this._max_date)
        return !1;
      if (o.start_date.valueOf() < this._max_date.valueOf() && this._min_date.valueOf() < o.end_date.valueOf()) {
        var l = o.start_date.getHours(), h = o.end_date.getHours() + o.end_date.getMinutes() / 60, m = this.config.last_hour, v = this.config.first_hour;
        return !(!this._table_view && (h > m || h <= v) && (l >= m || l < v) && !((o.end_date.valueOf() - o.start_date.valueOf()) / 36e5 > 24 - (this.config.last_hour - this.config.first_hour) || l < m && h > v));
      }
      return !1;
    }, a.isOneDayEvent = function(o) {
      var l = new Date(o.end_date.valueOf() - 1);
      return o.start_date.getFullYear() === l.getFullYear() && o.start_date.getMonth() === l.getMonth() && o.start_date.getDate() === l.getDate() && o.end_date.valueOf() - o.start_date.valueOf() < 864e5;
    }, a.get_visible_events = function(o) {
      var l = [];
      for (var h in this._events)
        this.is_visible_events(this._events[h]) && (o && !this._events[h]._timed || this.filter_event(h, this._events[h]) && l.push(this._events[h]));
      return l;
    }, a.filter_event = function(o, l) {
      var h = this["filter_" + this._mode];
      return !h || h(o, l);
    }, a._is_main_area_event = function(o) {
      return !!o._timed;
    }, a.render_view_data = function(o, l) {
      var h = !1;
      if (!o) {
        if (h = !0, this._not_render)
          return void (this._render_wait = !0);
        this._render_wait = !1, this.clear_view(), o = this.get_visible_events(!(this._table_view || this.config.multi_day));
      }
      for (var m = 0, v = o.length; m < v; m++)
        this._recalculate_timed(o[m]);
      if (this.config.multi_day && !this._table_view) {
        var u = [], c = [];
        for (m = 0; m < o.length; m++)
          this._is_main_area_event(o[m]) ? u.push(o[m]) : c.push(o[m]);
        if (!this._els.dhx_multi_day) {
          var f = a._commonErrorMessages.unknownView(this._mode);
          throw new Error(f);
        }
        this._rendered_location = this._els.dhx_multi_day[0], this._table_view = !0, this.render_data(c, l), this._table_view = !1, this._rendered_location = this._els.dhx_cal_data[0], this._table_view = !1, this.render_data(u, l);
      } else {
        var p = document.createDocumentFragment(), g = this._els.dhx_cal_data[0];
        this._rendered_location = p, this.render_data(o, l), g.appendChild(p), this._rendered_location = g;
      }
      h && this.callEvent("onDataRender", []);
    }, a._view_month_day = function(o) {
      var l = a.getActionData(o).date;
      a.callEvent("onViewMoreClick", [l]) && a.setCurrentView(l, "day");
    }, a._render_month_link = function(o) {
      for (var l = this._rendered_location, h = this._lame_clone(o), m = o._sday; m < o._eday; m++) {
        h._sday = m, h._eday = m + 1;
        var v = a.date, u = a._min_date;
        u = v.add(u, h._sweek, "week"), u = v.add(u, h._sday, "day");
        var c = a.getEvents(u, v.add(u, 1, "day")).length, f = this._get_event_bar_pos(h), p = f.x2 - f.x, g = document.createElement("div");
        a.event(g, "click", function(y) {
          a._view_month_day(y);
        }), g.className = "dhx_month_link", g.style.top = f.y + "px", g.style.left = f.x + "px", g.style.width = p + "px", g.innerHTML = a.templates.month_events_link(u, c), this._rendered.push(g), l.appendChild(g);
      }
    }, a._recalculate_timed = function(o) {
      var l;
      o && (l = typeof o != "object" ? this._events[o] : o) && (l._timed = a.isOneDayEvent(l));
    }, a.attachEvent("onEventChanged", a._recalculate_timed), a.attachEvent("onEventAdded", a._recalculate_timed), a.render_data = function(o, l) {
      o = this._pre_render_events(o, l);
      for (var h = {}, m = 0; m < o.length; m++)
        if (this._table_view)
          if (a._mode != "month")
            this.render_event_bar(o[m]);
          else {
            var v = a.config.max_month_events;
            v !== 1 * v || o[m]._sorder < v ? this.render_event_bar(o[m]) : v !== void 0 && o[m]._sorder == v && a._render_month_link(o[m]);
          }
        else {
          var u = o[m], c = a.locate_holder(u._sday);
          if (!c)
            continue;
          h[u._sday] || (h[u._sday] = { real: c, buffer: document.createDocumentFragment(), width: c.clientWidth });
          var f = h[u._sday];
          this.render_event(u, f.buffer, f.width);
        }
      for (var m in h)
        (f = h[m]).real && f.buffer && f.real.appendChild(f.buffer);
    }, a._get_first_visible_cell = function(o) {
      for (var l = 0; l < o.length; l++)
        if ((o[l].className || "").indexOf("dhx_scale_ignore") == -1)
          return o[l];
      return o[0];
    }, a._pre_render_events = function(o, l) {
      var h = this.xy.bar_height, m = this._colsS.heights, v = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], u = this._els.dhx_cal_data[0];
      if (o = this._table_view ? this._pre_render_events_table(o, l) : this._pre_render_events_line(o, l), this._table_view)
        if (l)
          this._colsS.heights = m;
        else {
          var c = u.querySelectorAll(".dhx_cal_month_row");
          if (c.length) {
            for (var f = 0; f < c.length; f++) {
              v[f]++;
              var p = c[f].querySelectorAll(".dhx_cal_month_cell"), g = this._colsS.height - this.xy.month_head_height;
              if (v[f] * h > g) {
                var y = g;
                1 * this.config.max_month_events !== this.config.max_month_events || v[f] <= this.config.max_month_events ? y = v[f] * h : (this.config.max_month_events + 1) * h > g && (y = (this.config.max_month_events + 1) * h), c[f].style.height = y + this.xy.month_head_height + "px";
              }
              v[f] = (v[f - 1] || 0) + a._get_first_visible_cell(p).offsetHeight;
            }
            v.unshift(0);
            const M = this.$container.querySelector(".dhx_cal_data");
            if (M.offsetHeight < M.scrollHeight && !a._colsS.scroll_fix && a.xy.scroll_width) {
              var x = a._colsS, b = x[x.col_length], k = x.heights.slice();
              b -= a.xy.scroll_width || 0, this._calc_scale_sizes(b, this._min_date, this._max_date), a._colsS.heights = k, this.set_xy(this._els.dhx_cal_header[0], b), a._render_scales(this._els.dhx_cal_header[0]), a._render_month_scale(this._els.dhx_cal_data[0], this._get_timeunit_start(), this._min_date), x.scroll_fix = !0;
            }
          } else if (o.length || this._els.dhx_multi_day[0].style.visibility != "visible" || (v[0] = -1), o.length || v[0] == -1) {
            var w = (v[0] + 1) * h + 4, D = w, E = w + "px";
            this.config.multi_day_height_limit && (E = (D = Math.min(w, this.config.multi_day_height_limit)) + "px");
            var S = this._els.dhx_multi_day[0];
            S.style.height = E, S.style.visibility = v[0] == -1 ? "hidden" : "visible", S.style.display = v[0] == -1 ? "none" : "";
            var N = this._els.dhx_multi_day[1];
            N.style.height = E, N.style.visibility = v[0] == -1 ? "hidden" : "visible", N.style.display = v[0] == -1 ? "none" : "", N.className = v[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (v[0] + 1) * h, this.config.multi_day_height_limit && (this._dy_shift = Math.min(this.config.multi_day_height_limit, this._dy_shift)), v[0] = 0, D != w && (S.style.overflowY = "auto", N.style.position = "fixed", N.style.top = "", N.style.left = "");
          }
        }
      return o;
    }, a._get_event_sday = function(o) {
      var l = this.date.day_start(new Date(o.start_date));
      return Math.round((l.valueOf() - this._min_date.valueOf()) / 864e5);
    }, a._get_event_mapped_end_date = function(o) {
      var l = o.end_date;
      if (this.config.separate_short_events) {
        var h = (o.end_date - o.start_date) / 6e4;
        h < this._min_mapped_duration && (l = this.date.add(l, this._min_mapped_duration - h, "minute"));
      }
      return l;
    }, a._pre_render_events_line = function(o, l) {
      o.sort(function(N, M) {
        return N.start_date.valueOf() == M.start_date.valueOf() ? N.id > M.id ? 1 : -1 : N.start_date > M.start_date ? 1 : -1;
      });
      var h = [], m = [];
      this._min_mapped_duration = Math.floor(60 * this.xy.min_event_height / this.config.hour_size_px);
      for (var v = 0; v < o.length; v++) {
        var u = o[v], c = u.start_date, f = u.end_date, p = c.getHours(), g = f.getHours();
        if (u._sday = this._get_event_sday(u), this._ignores[u._sday])
          o.splice(v, 1), v--;
        else {
          if (h[u._sday] || (h[u._sday] = []), !l) {
            u._inner = !1;
            for (var y = h[u._sday]; y.length; ) {
              var x = y[y.length - 1];
              if (!(this._get_event_mapped_end_date(x).valueOf() <= u.start_date.valueOf()))
                break;
              y.splice(y.length - 1, 1);
            }
            for (var b = y.length, k = !1, w = 0; w < y.length; w++)
              if (x = y[w], this._get_event_mapped_end_date(x).valueOf() <= u.start_date.valueOf()) {
                k = !0, u._sorder = x._sorder, b = w, u._inner = !0;
                break;
              }
            if (y.length && (y[y.length - 1]._inner = !0), !k)
              if (y.length)
                if (y.length <= y[y.length - 1]._sorder) {
                  if (y[y.length - 1]._sorder)
                    for (w = 0; w < y.length; w++) {
                      for (var D = !1, E = 0; E < y.length; E++)
                        if (y[E]._sorder == w) {
                          D = !0;
                          break;
                        }
                      if (!D) {
                        u._sorder = w;
                        break;
                      }
                    }
                  else
                    u._sorder = 0;
                  u._inner = !0;
                } else {
                  var S = y[0]._sorder;
                  for (w = 1; w < y.length; w++)
                    y[w]._sorder > S && (S = y[w]._sorder);
                  u._sorder = S + 1, u._inner = !1;
                }
              else
                u._sorder = 0;
            y.splice(b, b == y.length ? 0 : 1, u), y.length > (y.max_count || 0) ? (y.max_count = y.length, u._count = y.length) : u._count = u._count ? u._count : 1;
          }
          (p < this.config.first_hour || g >= this.config.last_hour) && (m.push(u), o[v] = u = this._copy_event(u), p < this.config.first_hour && (u.start_date.setHours(this.config.first_hour), u.start_date.setMinutes(0)), g >= this.config.last_hour && (u.end_date.setMinutes(0), u.end_date.setHours(this.config.last_hour)), u.start_date > u.end_date || p == this.config.last_hour) && (o.splice(v, 1), v--);
        }
      }
      if (!l) {
        for (v = 0; v < o.length; v++)
          o[v]._count = h[o[v]._sday].max_count;
        for (v = 0; v < m.length; v++)
          m[v]._count = h[m[v]._sday].max_count;
      }
      return o;
    }, a._time_order = function(o) {
      o.sort(function(l, h) {
        return l.start_date.valueOf() == h.start_date.valueOf() ? l._timed && !h._timed ? 1 : !l._timed && h._timed ? -1 : l.id > h.id ? 1 : -1 : l.start_date > h.start_date ? 1 : -1;
      });
    }, a._is_any_multiday_cell_visible = function(o, l, h) {
      var m = this._cols.length, v = !1, u = o, c = !0, f = new Date(l);
      for (a.date.day_start(new Date(l)).valueOf() != l.valueOf() && (f = a.date.day_start(f), f = a.date.add(f, 1, "day")); u < f; ) {
        c = !1;
        var p = this.locate_holder_day(u, !1, h) % m;
        if (!this._ignores[p]) {
          v = !0;
          break;
        }
        u = a.date.add(u, 1, "day");
      }
      return c || v;
    }, a._pre_render_events_table = function(o, l) {
      this._time_order(o);
      for (var h, m = [], v = [[], [], [], [], [], [], []], u = this._colsS.heights, c = this._cols.length, f = {}, p = 0; p < o.length; p++) {
        var g = o[p], y = g.id;
        f[y] || (f[y] = { first_chunk: !0, last_chunk: !0 });
        var x = f[y], b = h || g.start_date, k = g.end_date;
        b < this._min_date && (x.first_chunk = !1, b = this._min_date), k > this._max_date && (x.last_chunk = !1, k = this._max_date);
        var w = this.locate_holder_day(b, !1, g);
        if (g._sday = w % c, !this._ignores[g._sday] || !g._timed) {
          var D = this.locate_holder_day(k, !0, g) || c;
          if (g._eday = D % c || c, g._length = D - w, g._sweek = Math.floor((this._correct_shift(b.valueOf(), 1) - this._min_date.valueOf()) / (864e5 * c)), a._is_any_multiday_cell_visible(b, k, g)) {
            var E, S = v[g._sweek];
            for (E = 0; E < S.length && !(S[E]._eday <= g._sday); E++)
              ;
            if (g._sorder && l || (g._sorder = E), g._sday + g._length <= c)
              h = null, m.push(g), S[E] = g, u[g._sweek] = S.length - 1, g._first_chunk = x.first_chunk, g._last_chunk = x.last_chunk;
            else {
              var N = this._copy_event(g);
              N.id = g.id, N._length = c - g._sday, N._eday = c, N._sday = g._sday, N._sweek = g._sweek, N._sorder = g._sorder, N.end_date = this.date.add(b, N._length, "day"), N._first_chunk = x.first_chunk, x.first_chunk && (x.first_chunk = !1), m.push(N), S[E] = N, h = N.end_date, u[g._sweek] = S.length - 1, p--;
            }
          } else
            h = null;
        }
      }
      return m;
    }, a._copy_dummy = function() {
      var o = new Date(this.start_date), l = new Date(this.end_date);
      this.start_date = o, this.end_date = l;
    }, a._copy_event = function(o) {
      return this._copy_dummy.prototype = o, new this._copy_dummy();
    }, a._rendered = [], a.clear_view = function() {
      for (var o = 0; o < this._rendered.length; o++) {
        var l = this._rendered[o];
        l.parentNode && l.parentNode.removeChild(l);
      }
      this._rendered = [];
    }, a.updateEvent = function(o) {
      var l = this.getEvent(o);
      this.clear_event(o), l && this.is_visible_events(l) && this.filter_event(o, l) && (this._table_view || this.config.multi_day || l._timed) && (this.config.update_render ? this.render_view_data() : this.getState().mode != "month" || this.getState().drag_id || this.isOneDayEvent(l) ? this.render_view_data([l], !0) : this.render_view_data());
    }, a.clear_event = function(o) {
      this.for_rendered(o, function(l, h) {
        l.parentNode && l.parentNode.removeChild(l), a._rendered.splice(h, 1);
      });
    }, a._y_from_date = function(o) {
      var l = 60 * o.getHours() + o.getMinutes();
      return Math.round((60 * l * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px);
    }, a._calc_event_y = function(o, l) {
      l = l || 0;
      var h = 60 * o.start_date.getHours() + o.start_date.getMinutes(), m = 60 * o.end_date.getHours() + o.end_date.getMinutes() || 60 * a.config.last_hour;
      return { top: this._y_from_date(o.start_date), height: Math.max(l, (m - h) * this.config.hour_size_px / 60) };
    }, a.render_event = function(o, l, h) {
      var m = a.xy.menu_width, v = this.config.use_select_menu_space ? 0 : m;
      if (!(o._sday < 0)) {
        var u = a.locate_holder(o._sday);
        if (u) {
          l = l || u;
          var c = this._calc_event_y(o, a.xy.min_event_height), f = c.top, p = c.height, g = o._count || 1, y = o._sorder || 0;
          h = h || u.clientWidth, this.config.day_column_padding && (h -= this.config.day_column_padding);
          var x = Math.floor((h - v) / g), b = y * x + 1;
          if (o._inner || (x *= g - y), this.config.cascade_event_display) {
            var k = this.config.cascade_event_count, w = this.config.cascade_event_margin;
            b = y % k * w;
            var D = o._inner ? (g - y - 1) % k * w / 2 : 0;
            x = Math.floor(h - v - b - D);
          }
          o._mode = p < 30 ? "smallest" : p < 42 ? "small" : null;
          var E = this._render_v_bar(o, v + b, f, x, p, o._text_style, a.templates.event_header(o.start_date, o.end_date, o), a.templates.event_text(o.start_date, o.end_date, o));
          if (o._mode === "smallest" ? E.classList.add("dhx_cal_event--xsmall") : o._mode === "small" && E.classList.add("dhx_cal_event--small"), this._waiAria.eventAttr(o, E), this._rendered.push(E), l.appendChild(E), b = b + parseInt(this.config.rtl ? u.style.right : u.style.left, 10) + v, this._edit_id == o.id) {
            E.style.zIndex = 1, x = Math.max(x, a.xy.editor_width), (E = document.createElement("div")).setAttribute("event_id", o.id), E.setAttribute(this.config.event_attribute, o.id), this._waiAria.eventAttr(o, E), E.className = "dhx_cal_event dhx_cal_editor", this.config.rtl && b++, this.set_xy(E, x, p, b, f), o.color && E.style.setProperty("--dhx-scheduler-event-background", o.color);
            var S = a.templates.event_class(o.start_date, o.end_date, o);
            S && (E.className += " " + S);
            var N = document.createElement("div");
            N.style.cssText += "overflow:hidden;height:100%", E.appendChild(N), this._els.dhx_cal_data[0].appendChild(E), this._rendered.push(E), N.innerHTML = "<textarea class='dhx_cal_editor'>" + o.text + "</textarea>", this._editor = N.querySelector("textarea"), a.event(this._editor, "keydown", function(j) {
              if (j.shiftKey)
                return !0;
              var z = j.keyCode;
              z == a.keys.edit_save && a.editStop(!0), z == a.keys.edit_cancel && a.editStop(!1), z != a.keys.edit_save && z != a.keys.edit_cancel || j.preventDefault && j.preventDefault();
            }), a.event(this._editor, "selectstart", function(j) {
              return j.cancelBubble = !0, !0;
            }), a._focus(this._editor, !0), this._els.dhx_cal_data[0].scrollLeft = 0;
          }
          if (this.xy.menu_width !== 0 && this._select_id == o.id) {
            this.config.cascade_event_display && this._drag_mode && (E.style.zIndex = 1);
            for (var M, T = this.config["icons_" + (this._edit_id == o.id ? "edit" : "select")], A = "", H = 0; H < T.length; H++) {
              const j = T[H];
              M = this._waiAria.eventMenuAttrString(j), A += `<div class='dhx_menu_icon ${j}' title='${this.locale.labels[j]}' ${M}></div>`;
            }
            var $ = this._render_v_bar(o, b - m - 1, f, m, null, "", "<div class='dhx_menu_head'></div>", A, !0);
            o.color && $.style.setProperty("--dhx-scheduler-event-background", o.color), o.textColor && $.style.setProperty("--dhx-scheduler-event-color", o.textColor), this._els.dhx_cal_data[0].appendChild($), this._rendered.push($);
          }
          this.config.drag_highlight && this._drag_id == o.id && this.highlightEventPosition(o);
        }
      }
    }, a._render_v_bar = function(o, l, h, m, v, u, c, f, p) {
      var g = document.createElement("div"), y = o.id, x = p ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event", b = a.getState();
      b.drag_id == o.id && (x += " dhx_cal_event_drag"), b.select_id == o.id && (x += " dhx_cal_event_selected");
      var k = a.templates.event_class(o.start_date, o.end_date, o);
      k && (x = x + " " + k), this.config.cascade_event_display && (x += " dhx_cal_event_cascade");
      var w = m - 1, D = `<div event_id="${y}" ${this.config.event_attribute}="${y}" class="${x}"
				style="position:absolute; top:${h}px; ${this.config.rtl ? "right:" : "left:"}${l}px; width:${w}px; height:${v}px; ${u || ""}" 
				data-bar-start="${o.start_date.valueOf()}" data-bar-end="${o.end_date.valueOf()}">
				</div>`;
      g.innerHTML = D;
      var E = g.cloneNode(!0).firstChild;
      if (!p && a.renderEvent(E, o, m, v, c, f))
        return o.color && E.style.setProperty("--dhx-scheduler-event-background", o.color), o.textColor && E.style.setProperty("--dhx-scheduler-event-color", o.textColor), E;
      E = g.firstChild, o.color && E.style.setProperty("--dhx-scheduler-event-background", o.color), o.textColor && E.style.setProperty("--dhx-scheduler-event-color", o.textColor);
      var S = '<div class="dhx_event_move dhx_header" >&nbsp;</div>';
      S += '<div class="dhx_event_move dhx_title">' + c + "</div>", S += '<div class="dhx_body">' + f + "</div>";
      var N = "dhx_event_resize dhx_footer";
      return (p || o._drag_resize === !1) && (N = "dhx_resize_denied " + N), S += '<div class="' + N + '" style=" width:' + (p ? " margin-top:-1px;" : "") + '" ></div>', E.innerHTML = S, E;
    }, a.renderEvent = function() {
      return !1;
    }, a.locate_holder = function(o) {
      return this._mode == "day" ? this._els.dhx_cal_data[0].firstChild : this._els.dhx_cal_data[0].childNodes[o];
    }, a.locate_holder_day = function(o, l) {
      var h = Math.floor((this._correct_shift(o, 1) - this._min_date) / 864e5);
      return l && this.date.time_part(o) && h++, h;
    }, a._get_dnd_order = function(o, l, h) {
      if (!this._drag_event)
        return o;
      this._drag_event._orig_sorder ? o = this._drag_event._orig_sorder : this._drag_event._orig_sorder = o;
      for (var m = l * o; m + l > h; )
        o--, m -= l;
      return Math.max(o, 0);
    }, a._get_event_bar_pos = function(o) {
      var l = this.config.rtl, h = this._colsS, m = h[o._sday], v = h[o._eday];
      l && (m = h[h.col_length] - h[o._eday] + h[0], v = h[h.col_length] - h[o._sday] + h[0]), v == m && (v = h[o._eday + 1]);
      var u = this.xy.bar_height, c = o._sorder;
      if (o.id == this._drag_id) {
        var f = h.heights[o._sweek + 1] - h.heights[o._sweek] - this.xy.month_head_height;
        c = a._get_dnd_order(c, u, f);
      }
      var p = c * u;
      return { x: m, x2: v, y: h.heights[o._sweek] + (h.height ? this.xy.month_scale_height + 2 : 2) + p };
    }, a.render_event_bar = function(o) {
      var l = this._rendered_location, h = this._get_event_bar_pos(o), m = h.y, v = h.x, u = h.x2, c = "";
      if (u) {
        var f = a.config.resize_month_events && this._mode == "month" && (!o._timed || a.config.resize_month_timed), p = document.createElement("div"), g = o.hasOwnProperty("_first_chunk") && o._first_chunk, y = o.hasOwnProperty("_last_chunk") && o._last_chunk, x = f && (o._timed || g), b = f && (o._timed || y), k = !0, w = "dhx_cal_event_clear";
        o._timed && !f || (k = !1, w = "dhx_cal_event_line"), g && (w += " dhx_cal_event_line_start"), y && (w += " dhx_cal_event_line_end"), x && (c += "<div class='dhx_event_resize dhx_event_resize_start'></div>"), b && (c += "<div class='dhx_event_resize dhx_event_resize_end'></div>");
        var D = a.templates.event_class(o.start_date, o.end_date, o);
        D && (w += " " + D);
        var E = o.color ? "--dhx-scheduler-event-background:" + o.color + ";" : "", S = o.textColor ? "--dhx-scheduler-event-color:" + o.textColor + ";" : "", N = ["position:absolute", "top:" + m + "px", "left:" + v + "px", "width:" + (u - v - (k ? 1 : 0)) + "px", "height:" + (this.xy.bar_height - 2) + "px", S, E, o._text_style || ""].join(";"), M = "<div event_id='" + o.id + "' " + this.config.event_attribute + "='" + o.id + "' class='" + w + "' style='" + N + "'" + this._waiAria.eventBarAttrString(o) + ">";
        f && (M += c), a.getState().mode == "month" && (o = a.getEvent(o.id)), o._timed && (M += `<span class='dhx_cal_event_clear_date'>${a.templates.event_bar_date(o.start_date, o.end_date, o)}</span>`), M += "<div class='dhx_cal_event_line_content'>", M += a.templates.event_bar_text(o.start_date, o.end_date, o) + "</div>", M += "</div>", M += "</div>", p.innerHTML = M, this._rendered.push(p.firstChild), l.appendChild(p.firstChild);
      }
    }, a._locate_event = function(o) {
      for (var l = null; o && !l && o.getAttribute; )
        l = o.getAttribute(this.config.event_attribute), o = o.parentNode;
      return l;
    }, a.edit = function(o) {
      this._edit_id != o && (this.editStop(!1, o), this._edit_id = o, this.updateEvent(o));
    }, a.editStop = function(o, l) {
      if (!l || this._edit_id != l) {
        var h = this.getEvent(this._edit_id);
        h && (o && (h.text = this._editor.value), this._edit_id = null, this._editor = null, this.updateEvent(h.id), this._edit_stop_event(h, o));
      }
    }, a._edit_stop_event = function(o, l) {
      this._new_event ? (l ? this.callEvent("onEventAdded", [o.id, o]) : o && this.deleteEvent(o.id, !0), this._new_event = null) : l && this.callEvent("onEventChanged", [o.id, o]);
    }, a.getEvents = function(o, l) {
      var h = [];
      for (var m in this._events) {
        var v = this._events[m];
        v && (!o && !l || v.start_date < l && v.end_date > o) && h.push(v);
      }
      return h;
    }, a.getRenderedEvent = function(o) {
      if (o) {
        for (var l = a._rendered, h = 0; h < l.length; h++) {
          var m = l[h];
          if (m.getAttribute(a.config.event_attribute) == o)
            return m;
        }
        return null;
      }
    }, a.showEvent = function(o, l) {
      o && typeof o == "object" && (l = o.mode, y = o.section, o = o.section);
      var h = typeof o == "number" || typeof o == "string" ? a.getEvent(o) : o;
      if (l = l || a._mode, h && (!this.checkEvent("onBeforeEventDisplay") || this.callEvent("onBeforeEventDisplay", [h, l]))) {
        var m = a.config.scroll_hour;
        a.config.scroll_hour = h.start_date.getHours();
        var v = a.config.preserve_scroll;
        a.config.preserve_scroll = !1;
        var u = h.color, c = h.textColor;
        if (a.config.highlight_displayed_event && (h.color = a.config.displayed_event_color, h.textColor = a.config.displayed_event_text_color), a.setCurrentView(new Date(h.start_date), l), a.config.scroll_hour = m, a.config.preserve_scroll = v, a.matrix && a.matrix[l]) {
          var f = a.getView(), p = f.y_property, g = a.getEvent(h.id);
          if (g) {
            if (!y) {
              var y = g[p];
              Array.isArray(y) ? y = y[0] : typeof y == "string" && a.config.section_delimiter && y.indexOf(a.config.section_delimiter) > -1 && (y = y.split(a.config.section_delimiter)[0]);
            }
            var x = f.getSectionTop(y), b = f.posFromDate(g.start_date), k = a.$container.querySelector(".dhx_timeline_data_wrapper");
            if (b -= (k.offsetWidth - f.dx) / 2, x = x - k.offsetHeight / 2 + f.dy / 2, f._smartRenderingEnabled())
              var w = f.attachEvent("onScroll", function() {
                D(), f.detachEvent(w);
              });
            f.scrollTo({ left: b, top: x }), f._smartRenderingEnabled() || D();
          }
        } else
          D();
        a.callEvent("onAfterEventDisplay", [h, l]);
      }
      function D() {
        h.color = u, h.textColor = c;
      }
    };
  }(i), function(a) {
    a._append_drag_marker = function(o) {
      if (!o.parentNode) {
        var l = a._els.dhx_cal_data[0].lastChild, h = a._getClassName(l);
        h.indexOf("dhx_scale_holder") < 0 && l.previousSibling && (l = l.previousSibling), h = a._getClassName(l), l && h.indexOf("dhx_scale_holder") === 0 && l.appendChild(o);
      }
    }, a._update_marker_position = function(o, l) {
      var h = a._calc_event_y(l, 0);
      o.style.top = h.top + "px", o.style.height = h.height + "px";
    }, a.highlightEventPosition = function(o) {
      var l = document.createElement("div");
      l.setAttribute("event_id", o.id), l.setAttribute(this.config.event_attribute, o.id), this._rendered.push(l), this._update_marker_position(l, o);
      var h = this.templates.drag_marker_class(o.start_date, o.end_date, o), m = this.templates.drag_marker_content(o.start_date, o.end_date, o);
      l.className = "dhx_drag_marker", h && (l.className += " " + h), m && (l.innerHTML = m), this._append_drag_marker(l);
    };
  }(i), Vt(i), function(a) {
    function o() {
      const l = a.config.csp === !0, h = !!window.Sfdc || !!window.$A || window.Aura || "$shadowResolver$" in document.body;
      return l || h ? a.$root : document.body;
    }
    a._lightbox_controls = {}, a.formSection = function(l) {
      for (var h = this.config.lightbox.sections, m = 0; m < h.length && h[m].name != l; m++)
        ;
      if (m === h.length)
        return null;
      var v = h[m];
      a._lightbox || a.getLightbox();
      var u = a._lightbox.querySelector(`#${v.id}`), c = u.nextSibling, f = { section: v, header: u, node: c, getValue: function(g) {
        return a.form_blocks[v.type].get_value(c, g || {}, v);
      }, setValue: function(g, y) {
        return a.form_blocks[v.type].set_value(c, g, y || {}, v);
      } }, p = a._lightbox_controls["get_" + v.type + "_control"];
      return p ? p(f) : f;
    }, a._lightbox_controls.get_template_control = function(l) {
      return l.control = l.node, l;
    }, a._lightbox_controls.get_select_control = function(l) {
      return l.control = l.node.getElementsByTagName("select")[0], l;
    }, a._lightbox_controls.get_textarea_control = function(l) {
      return l.control = l.node.getElementsByTagName("textarea")[0], l;
    }, a._lightbox_controls.get_time_control = function(l) {
      return l.control = l.node.getElementsByTagName("select"), l;
    }, a._lightbox_controls.defaults = { template: { height: 30 }, textarea: { height: 200 }, select: { height: 23 }, time: { height: 20 } }, a.form_blocks = { template: { render: function(l) {
      return "<div class='dhx_cal_ltext dhx_cal_template' ></div>";
    }, set_value: function(l, h, m, v) {
      l.innerHTML = h || "";
    }, get_value: function(l, h, m) {
      return l.innerHTML || "";
    }, focus: function(l) {
    } }, textarea: { render: function(l) {
      return `<div class='dhx_cal_ltext'><textarea ${l.placeholder ? `placeholder='${l.placeholder}'` : ""}></textarea></div>`;
    }, set_value: function(l, h, m) {
      a.form_blocks.textarea._get_input(l).value = h || "";
    }, get_value: function(l, h) {
      return a.form_blocks.textarea._get_input(l).value;
    }, focus: function(l) {
      var h = a.form_blocks.textarea._get_input(l);
      a._focus(h, !0);
    }, _get_input: function(l) {
      return l.getElementsByTagName("textarea")[0];
    } }, select: { render: function(l) {
      for (var h = "<div class='dhx_cal_ltext dhx_cal_select'><select style='width:100%;'>", m = 0; m < l.options.length; m++)
        h += "<option value='" + l.options[m].key + "'>" + l.options[m].label + "</option>";
      return h + "</select></div>";
    }, set_value: function(l, h, m, v) {
      var u = l.firstChild;
      !u._dhx_onchange && v.onchange && (a.event(u, "change", v.onchange), u._dhx_onchange = !0), h === void 0 && (h = (u.options[0] || {}).value), u.value = h || "";
    }, get_value: function(l, h) {
      return l.firstChild.value;
    }, focus: function(l) {
      var h = l.firstChild;
      a._focus(h, !0);
    } }, time: { render: function(l) {
      l.time_format || (l.time_format = ["%H:%i", "%d", "%m", "%Y"]), l._time_format_order = {};
      var h = l.time_format, m = a.config, v = a.date.date_part(a._currentDate()), u = 1440, c = 0;
      a.config.limit_time_select && (u = 60 * m.last_hour + 1, c = 60 * m.first_hour, v.setHours(m.first_hour));
      for (var f = "", p = 0; p < h.length; p++) {
        var g = h[p];
        p > 0 && (f += " ");
        var y = "", x = "";
        switch (g) {
          case "%Y":
            var b, k, w;
            y = "dhx_lightbox_year_select", l._time_format_order[3] = p, l.year_range && (isNaN(l.year_range) ? l.year_range.push && (k = l.year_range[0], w = l.year_range[1]) : b = l.year_range), b = b || 10;
            var D = D || Math.floor(b / 2);
            k = k || v.getFullYear() - D, w = w || k + b;
            for (var E = k; E < w; E++)
              x += "<option value='" + E + "'>" + E + "</option>";
            break;
          case "%m":
            for (y = "dhx_lightbox_month_select", l._time_format_order[2] = p, E = 0; E < 12; E++)
              x += "<option value='" + E + "'>" + this.locale.date.month_full[E] + "</option>";
            break;
          case "%d":
            for (y = "dhx_lightbox_day_select", l._time_format_order[1] = p, E = 1; E < 32; E++)
              x += "<option value='" + E + "'>" + E + "</option>";
            break;
          case "%H:%i":
            y = "dhx_lightbox_time_select", l._time_format_order[0] = p, E = c;
            var S = v.getDate();
            for (l._time_values = []; E < u; )
              x += "<option value='" + E + "'>" + this.templates.time_picker(v) + "</option>", l._time_values.push(E), v.setTime(v.valueOf() + 60 * this.config.time_step * 1e3), E = 24 * (v.getDate() != S ? 1 : 0) * 60 + 60 * v.getHours() + v.getMinutes();
        }
        if (x) {
          var N = a._waiAria.lightboxSelectAttrString(g);
          f += "<select class='" + y + "' " + (l.readonly ? "disabled='disabled'" : "") + N + ">" + x + "</select> ";
        }
      }
      return "<div class='dhx_section_time'>" + f + "<span style='font-weight:normal; font-size:10pt;' class='dhx_section_time_spacer'> &nbsp;&ndash;&nbsp; </span>" + f + "</div>";
    }, set_value: function(l, h, m, v) {
      var u, c, f = a.config, p = l.getElementsByTagName("select"), g = v._time_format_order;
      if (f.full_day) {
        if (!l._full_day) {
          var y = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + a.locale.labels.full_day + "&nbsp;</label></input>";
          a.config.wide_form || (y = l.previousSibling.innerHTML + y), l.previousSibling.innerHTML = y, l._full_day = !0;
        }
        var x = l.previousSibling.getElementsByTagName("input")[0];
        x.checked = a.date.time_part(m.start_date) === 0 && a.date.time_part(m.end_date) === 0, p[g[0]].disabled = x.checked, p[g[0] + p.length / 2].disabled = x.checked, x.$_eventAttached || (x.$_eventAttached = !0, a.event(x, "click", function() {
          if (x.checked) {
            var D = {};
            a.form_blocks.time.get_value(l, D, v), u = a.date.date_part(D.start_date), (+(c = a.date.date_part(D.end_date)) == +u || +c >= +u && (m.end_date.getHours() !== 0 || m.end_date.getMinutes() !== 0)) && (c = a.date.add(c, 1, "day"));
          } else
            u = null, c = null;
          p[g[0]].disabled = x.checked, p[g[0] + p.length / 2].disabled = x.checked, w(p, 0, u || m.start_date), w(p, 4, c || m.end_date);
        }));
      }
      if (f.auto_end_date && f.event_duration)
        for (var b = function() {
          f.auto_end_date && f.event_duration && (u = new Date(p[g[3]].value, p[g[2]].value, p[g[1]].value, 0, p[g[0]].value), c = new Date(u.getTime() + 60 * a.config.event_duration * 1e3), w(p, 4, c));
        }, k = 0; k < 4; k++)
          p[k].$_eventAttached || (p[k].$_eventAttached = !0, a.event(p[k], "change", b));
      function w(D, E, S) {
        for (var N = v._time_values, M = 60 * S.getHours() + S.getMinutes(), T = M, A = !1, H = 0; H < N.length; H++) {
          var $ = N[H];
          if ($ === M) {
            A = !0;
            break;
          }
          $ < M && (T = $);
        }
        D[E + g[0]].value = A ? M : T, A || T || (D[E + g[0]].selectedIndex = -1), D[E + g[1]].value = S.getDate(), D[E + g[2]].value = S.getMonth(), D[E + g[3]].value = S.getFullYear();
      }
      w(p, 0, m.start_date), w(p, 4, m.end_date);
    }, get_value: function(l, h, m) {
      var v = l.getElementsByTagName("select"), u = m._time_format_order;
      if (h.start_date = new Date(v[u[3]].value, v[u[2]].value, v[u[1]].value, 0, v[u[0]].value), h.end_date = new Date(v[u[3] + 4].value, v[u[2] + 4].value, v[u[1] + 4].value, 0, v[u[0] + 4].value), !v[u[3]].value || !v[u[3] + 4].value) {
        var c = a.getEvent(a._lightbox_id);
        c && (h.start_date = c.start_date, h.end_date = c.end_date);
      }
      return h.end_date <= h.start_date && (h.end_date = a.date.add(h.start_date, a.config.time_step, "minute")), { start_date: new Date(h.start_date), end_date: new Date(h.end_date) };
    }, focus: function(l) {
      a._focus(l.getElementsByTagName("select")[0]);
    } } }, a._setLbPosition = function(l) {
      l && (l.style.top = Math.max(o().offsetHeight / 2 - l.offsetHeight / 2, 0) + "px", l.style.left = Math.max(o().offsetWidth / 2 - l.offsetWidth / 2, 0) + "px");
    }, a.showCover = function(l) {
      l && (l.style.display = "block", this._setLbPosition(l)), a.config.responsive_lightbox && (document.documentElement.classList.add("dhx_cal_overflow_container"), o().classList.add("dhx_cal_overflow_container")), this.show_cover(), this._cover.style.display = "";
    }, a.showLightbox = function(l) {
      if (l)
        if (this.callEvent("onBeforeLightbox", [l])) {
          this.showCover(h);
          var h = this.getLightbox();
          this._setLbPosition(h), this._fill_lightbox(l, h), this._waiAria.lightboxVisibleAttr(h), this.callEvent("onLightbox", [l]);
        } else
          this._new_event && (this._new_event = null);
    }, a._fill_lightbox = function(l, h) {
      var m = this.getEvent(l), v = h.getElementsByTagName("span"), u = [];
      if (a.templates.lightbox_header) {
        u.push("");
        var c = a.templates.lightbox_header(m.start_date, m.end_date, m);
        u.push(c), v[1].innerHTML = "", v[2].innerHTML = c;
      } else {
        var f = this.templates.event_header(m.start_date, m.end_date, m), p = (this.templates.event_bar_text(m.start_date, m.end_date, m) || "").substr(0, 70);
        u.push(f), u.push(p), v[1].innerHTML = f, v[2].innerHTML = p;
      }
      this._waiAria.lightboxHeader(h, u.join(" "));
      for (var g = this.config.lightbox.sections, y = 0; y < g.length; y++) {
        var x = g[y], b = a._get_lightbox_section_node(x), k = this.form_blocks[x.type], w = m[x.map_to] !== void 0 ? m[x.map_to] : x.default_value;
        k.set_value.call(this, b, w, m, x), g[y].focus && k.focus.call(this, b);
      }
      a._lightbox_id = l;
    }, a._get_lightbox_section_node = function(l) {
      return a._lightbox.querySelector(`#${l.id}`).nextSibling;
    }, a._lightbox_out = function(l) {
      for (var h = this.config.lightbox.sections, m = 0; m < h.length; m++) {
        var v = a._lightbox.querySelector(`#${h[m].id}`);
        v = v && v.nextSibling;
        var u = this.form_blocks[h[m].type].get_value.call(this, v, l, h[m]);
        h[m].map_to != "auto" && (l[h[m].map_to] = u);
      }
      return l;
    }, a._empty_lightbox = function(l) {
      var h = a._lightbox_id, m = this.getEvent(h);
      this._lame_copy(m, l), this.setEvent(m.id, m), this._edit_stop_event(m, !0), this.render_view_data();
    }, a.hide_lightbox = function(l) {
      a.endLightbox(!1, this.getLightbox());
    }, a.hideCover = function(l) {
      l && (l.style.display = "none"), this.hide_cover(), a.config.responsive_lightbox && (document.documentElement.classList.remove("dhx_cal_overflow_container"), o().classList.remove("dhx_cal_overflow_container"));
    }, a.hide_cover = function() {
      this._cover && this._cover.parentNode.removeChild(this._cover), this._cover = null;
    }, a.show_cover = function() {
      this._cover || (this._cover = document.createElement("div"), this._cover.className = "dhx_cal_cover", this._cover.style.display = "none", a.event(this._cover, "mousemove", a._move_while_dnd), a.event(this._cover, "mouseup", a._finish_dnd), o().appendChild(this._cover));
    }, a.save_lightbox = function() {
      var l = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
      this.checkEvent("onEventSave") && !this.callEvent("onEventSave", [this._lightbox_id, l, this._new_event]) || (this._empty_lightbox(l), this.hide_lightbox());
    }, a.startLightbox = function(l, h) {
      this._lightbox_id = l, this._custom_lightbox = !0, this._temp_lightbox = this._lightbox, this._lightbox = h, this.showCover(h);
    }, a.endLightbox = function(l, h) {
      h = h || a.getLightbox();
      var m = a.getEvent(this._lightbox_id);
      m && this._edit_stop_event(m, l), l && a.render_view_data(), this.hideCover(h), this._custom_lightbox && (this._lightbox = this._temp_lightbox, this._custom_lightbox = !1), this._temp_lightbox = this._lightbox_id = null, this._waiAria.lightboxHiddenAttr(h), this.resetLightbox(), this.callEvent("onAfterLightbox", []);
    }, a.resetLightbox = function() {
      a._lightbox && !a._custom_lightbox && a._lightbox.parentNode.removeChild(a._lightbox), a._lightbox = null;
    }, a.cancel_lightbox = function() {
      this._lightbox_id && this.callEvent("onEventCancel", [this._lightbox_id, !!this._new_event]), this.hide_lightbox();
    }, a.hideLightbox = a.cancel_lightbox, a._init_lightbox_events = function() {
      if (this.getLightbox().$_eventAttached)
        return;
      const l = this.getLightbox();
      l.$_eventAttached = !0, a.event(l, "click", function(h) {
        h.target.closest(".dhx_cal_ltitle_close_btn") && a.cancel_lightbox();
        const m = a.$domHelpers.closest(h.target, ".dhx_btn_set");
        if (!m) {
          const c = a.$domHelpers.closest(h.target, ".dhx_custom_button[data-section-index]");
          if (c) {
            const f = Number(c.getAttribute("data-section-index"));
            a.form_blocks[a.config.lightbox.sections[f].type].button_click(a.$domHelpers.closest(c, ".dhx_cal_lsection"), c, h);
          }
          return;
        }
        const v = m ? m.getAttribute("data-action") : null;
        switch (v) {
          case "dhx_save_btn":
          case "save":
            if (a.config.readonly_active)
              return;
            a.save_lightbox();
            break;
          case "dhx_delete_btn":
          case "delete":
            if (a.config.readonly_active)
              return;
            var u = a.locale.labels.confirm_deleting;
            a._dhtmlx_confirm({ message: u, title: a.locale.labels.title_confirm_deleting, callback: function() {
              a.deleteEvent(a._lightbox_id), a._new_event = null, a.hide_lightbox();
            }, config: { ok: a.locale.labels.icon_delete } });
            break;
          case "dhx_cancel_btn":
          case "cancel":
            a.cancel_lightbox();
            break;
          default:
            a.callEvent("onLightboxButton", [v, m, h]);
        }
      }), a.event(l, "keydown", function(h) {
        var m = h || window.event, v = h.target || h.srcElement, u = v.querySelector("[dhx_button]");
        switch (u || (u = v.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")), (h || m).keyCode) {
          case 32:
            if ((h || m).shiftKey)
              return;
            u && u.click && u.click();
            break;
          case a.keys.edit_save:
            if ((h || m).shiftKey)
              return;
            if (u && u.click)
              u.click();
            else {
              if (a.config.readonly_active)
                return;
              a.save_lightbox();
            }
            break;
          case a.keys.edit_cancel:
            a.cancel_lightbox();
        }
      });
    }, a.setLightboxSize = function() {
    }, a._init_dnd_events = function() {
      a.event(o(), "mousemove", a._move_while_dnd), a.event(o(), "mouseup", a._finish_dnd), a._init_dnd_events = function() {
      };
    }, a._move_while_dnd = function(l) {
      if (a._dnd_start_lb) {
        document.dhx_unselectable || (o().classList.add("dhx_unselectable"), document.dhx_unselectable = !0);
        var h = a.getLightbox(), m = [l.pageX, l.pageY];
        h.style.top = a._lb_start[1] + m[1] - a._dnd_start_lb[1] + "px", h.style.left = a._lb_start[0] + m[0] - a._dnd_start_lb[0] + "px";
      }
    }, a._ready_to_dnd = function(l) {
      var h = a.getLightbox();
      a._lb_start = [h.offsetLeft, h.offsetTop], a._dnd_start_lb = [l.pageX, l.pageY];
    }, a._finish_dnd = function() {
      a._lb_start && (a._lb_start = a._dnd_start_lb = !1, o().classList.remove("dhx_unselectable"), document.dhx_unselectable = !1);
    }, a.getLightbox = function() {
      if (!this._lightbox) {
        var l = document.createElement("div");
        l.className = "dhx_cal_light", a.config.wide_form && (l.className += " dhx_cal_light_wide"), a.form_blocks.recurring && (l.className += " dhx_cal_light_rec"), a.config.rtl && (l.className += " dhx_cal_light_rtl"), a.config.responsive_lightbox && (l.className += " dhx_cal_light_responsive"), l.style.visibility = "hidden";
        var h = this._lightbox_template, m = this.config.buttons_left;
        h += "<div class='dhx_cal_lcontrols'>";
        for (var v = 0; v < m.length; v++)
          h += "<div " + this._waiAria.lightboxButtonAttrString(m[v]) + " data-action='" + m[v] + "' class='dhx_btn_set dhx_" + (a.config.rtl ? "right" : "left") + "_btn_set " + m[v] + "_set'><div class='dhx_btn_inner " + m[v] + "'></div><div>" + a.locale.labels[m[v]] + "</div></div>";
        m = this.config.buttons_right;
        var u = a.config.rtl;
        for (v = 0; v < m.length; v++)
          h += "<div class='dhx_cal_lcontrols_push_right'></div>", h += "<div " + this._waiAria.lightboxButtonAttrString(m[v]) + " data-action='" + m[v] + "' class='dhx_btn_set dhx_" + (u ? "left" : "right") + "_btn_set " + m[v] + "_set'><div class='dhx_btn_inner " + m[v] + "'></div><div>" + a.locale.labels[m[v]] + "</div></div>";
        h += "</div>", h += "</div>", l.innerHTML = h, a.config.drag_lightbox && (a.event(l.firstChild, "mousedown", a._ready_to_dnd), a.event(l.firstChild, "selectstart", function(b) {
          return b.preventDefault(), !1;
        }), l.firstChild.style.cursor = "move", a._init_dnd_events()), this._waiAria.lightboxAttr(l), this.show_cover(), this._cover.insertBefore(l, this._cover.firstChild), this._lightbox = l;
        var c = this.config.lightbox.sections;
        for (h = "", v = 0; v < c.length; v++) {
          var f = this.form_blocks[c[v].type];
          if (f) {
            c[v].id = "area_" + this.uid();
            var p = "";
            c[v].button && (p = "<div " + a._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_" + c[v].button]) + " class='dhx_custom_button' data-section-index='" + v + "' index='" + v + "'><div class='dhx_custom_button_" + c[v].button + "'></div><div>" + this.locale.labels["button_" + c[v].button] + "</div></div>"), this.config.wide_form && (h += "<div class='dhx_wrap_section'>");
            var g = this.locale.labels["section_" + c[v].name];
            typeof g != "string" && (g = c[v].name), h += "<div id='" + c[v].id + "' class='dhx_cal_lsection dhx_cal_lsection_" + c[v].name + "'>" + p + "<label>" + g + "</label></div>" + f.render.call(this, c[v]), h += "</div>";
          }
        }
        var y = l.getElementsByTagName("div");
        for (v = 0; v < y.length; v++) {
          var x = y[v];
          if (a._getClassName(x) == "dhx_cal_larea") {
            x.innerHTML = h;
            break;
          }
        }
        a._bindLightboxLabels(c), this.setLightboxSize(), this._init_lightbox_events(this), l.style.visibility = "visible";
      }
      return this._lightbox;
    }, a._bindLightboxLabels = function(l) {
      for (var h = 0; h < l.length; h++) {
        var m = l[h];
        if (m.id && a._lightbox.querySelector(`#${m.id}`)) {
          for (var v = a._lightbox.querySelector(`#${m.id}`).querySelector("label"), u = a._get_lightbox_section_node(m); u && !u.querySelector; )
            u = u.nextSibling;
          var c = !0;
          if (u) {
            var f = u.querySelector("input, select, textarea");
            f && (m.inputId = f.id || "input_" + a.uid(), f.id || (f.id = m.inputId), v.setAttribute("for", m.inputId), c = !1);
          }
          c && a.form_blocks[m.type].focus && a.event(v, "click", function(p) {
            return function() {
              var g = a.form_blocks[p.type], y = a._get_lightbox_section_node(p);
              g && g.focus && g.focus.call(a, y);
            };
          }(m));
        }
      }
    }, a.attachEvent("onEventIdChange", function(l, h) {
      this._lightbox_id == l && (this._lightbox_id = h);
    }), a._lightbox_template = `<div class='dhx_cal_ltitle'><div class="dhx_cal_ltitle_descr"><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span>
</div>
<div class="dhx_cal_ltitle_controls">
<a class="dhx_cal_ltitle_close_btn scheduler_icon close"></a>
</div></div><div class='dhx_cal_larea'></div>`;
  }(i), Ft(i), function(a) {
    a.getRootView = function() {
      return { view: { render: function() {
        return { tag: "div", type: 1, attrs: { style: "width:100%;height:100%;" }, hooks: { didInsert: function() {
          a.setCurrentView();
        } }, body: [{ el: this.el, type: 1 }] };
      }, init: function() {
        var o = document.createElement("DIV");
        o.id = "scheduler_" + a.uid(), o.style.width = "100%", o.style.height = "100%", o.classList.add("dhx_cal_container"), o.cmp = "grid", o.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" data-tab="day"></div><div class="dhx_cal_tab" data-tab="week"></div><div class="dhx_cal_tab" data-tab="month"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', a.init(o), this.el = o;
      } }, type: 4 };
    };
  }(i), Bt(i), window.jQuery && (r = window.jQuery, d = 0, n = [], r.fn.dhx_scheduler = function(a) {
    if (typeof a != "string") {
      var o = [];
      return this.each(function() {
        if (this && this.getAttribute)
          if (this.getAttribute("dhxscheduler"))
            o.push(window[this.getAttribute("dhxscheduler")]);
          else {
            var l = "scheduler";
            d && (l = "scheduler" + (d + 1), window[l] = Scheduler.getSchedulerInstance());
            var h = window[l];
            for (var m in this.setAttribute("dhxscheduler", l), a)
              m != "data" && (h.config[m] = a[m]);
            this.getElementsByTagName("div").length || (this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>', this.className += " dhx_cal_container"), h.init(this, h.config.date, h.config.mode), a.data && h.parse(a.data), o.push(h), d++;
          }
      }), o.length === 1 ? o[0] : o;
    }
    if (n[a])
      return n[a].apply(this, []);
    r.error("Method " + a + " does not exist on jQuery.dhx_scheduler");
  }), function(a) {
    (function() {
      var o = a.setCurrentView, l = a.updateView, h = null, m = null, v = function(f, p) {
        var g = this;
        oe.clearTimeout(m), oe.clearTimeout(h);
        var y = g._date, x = g._mode;
        c(this, f, p), m = setTimeout(function() {
          a.$destroyed || (g.callEvent("onBeforeViewChange", [x, y, p || g._mode, f || g._date]) ? (l.call(g, f, p), g.callEvent("onViewChange", [g._mode, g._date]), oe.clearTimeout(h), m = 0) : c(g, y, x));
        }, a.config.delay_render);
      }, u = function(f, p) {
        var g = this, y = arguments;
        c(this, f, p), oe.clearTimeout(h), h = setTimeout(function() {
          a.$destroyed || m || l.apply(g, y);
        }, a.config.delay_render);
      };
      function c(f, p, g) {
        p && (f._date = p), g && (f._mode = g);
      }
      a.attachEvent("onSchedulerReady", function() {
        a.config.delay_render ? (a.setCurrentView = v, a.updateView = u) : (a.setCurrentView = o, a.updateView = l);
      });
    })();
  }(i), function(a) {
    a.createDataProcessor = function(o) {
      var l, h;
      o instanceof Function ? l = o : o.hasOwnProperty("router") ? l = o.router : o.hasOwnProperty("event") && (l = o), h = l ? "CUSTOM" : o.mode || "REST-JSON";
      var m = new He(o.url);
      return m.init(a), m.setTransactionMode({ mode: h, router: l }, o.batchUpdate), m;
    }, a.DataProcessor = He;
  }(i), function(a) {
    a.attachEvent("onSchedulerReady", function() {
      typeof dhtmlxError < "u" && window.dhtmlxError.catchError("LoadXML", function(o, l, h) {
        var m = h[0].responseText;
        switch (a.config.ajax_error) {
          case "alert":
            oe.alert(m);
            break;
          case "console":
            oe.console.log(m);
        }
      });
    });
  }(i);
  const s = new ha({ en: na, ar: Kt, be: Gt, ca: Xt, cn: Zt, cs: Qt, da: ea, de: ta, el: aa, es: ra, fi: ia, fr: oa, he: sa, hu: da, id: _a, it: la, jp: ca, nb: ua, nl: fa, no: pa, pl: ma, pt: va, ro: ga, ru: ya, si: ba, sk: xa, sv: ka, tr: wa, ua: Ea });
  i.i18n = { addLocale: s.addLocale, setLocale: function(a) {
    if (typeof a == "string") {
      var o = s.getLocale(a);
      o || (o = s.getLocale("en")), i.locale = o;
    } else if (a)
      if (i.locale)
        for (var l in a)
          a[l] && typeof a[l] == "object" ? (i.locale[l] || (i.locale[l] = {}), i.mixin(i.locale[l], a[l], !0)) : i.locale[l] = a[l];
      else
        i.locale = a;
    var h = i.locale.labels;
    h.dhx_save_btn = h.icon_save, h.dhx_cancel_btn = h.icon_cancel, h.dhx_delete_btn = h.icon_delete, i.$container && i.get_elements();
  }, getLocale: s.getLocale }, i.i18n.setLocale("en"), At(i), i.ext = {};
  const _ = {};
  return i.plugins = function(a) {
    (function(l, h, m) {
      const v = [];
      for (const u in l)
        if (l[u]) {
          const c = u.toLowerCase();
          h[c] && h[c].forEach(function(f) {
            const p = f.toLowerCase();
            l[p] || v.push(p);
          }), v.push(c);
        }
      return v.sort(function(u, c) {
        const f = m[u] || 0, p = m[c] || 0;
        return f > p ? 1 : f < p ? -1 : 0;
      }), v;
    })(a, { treetimeline: ["timeline"], daytimeline: ["timeline"], outerdrag: ["legacy"] }, { legacy: 1, limit: 1, timeline: 2, daytimeline: 3, treetimeline: 3, outerdrag: 6 }).forEach(function(l) {
      if (!_[l]) {
        const h = e.getExtension(l);
        if (!h)
          throw new Error("unknown plugin " + l);
        h(i), _[l] = !0;
      }
    });
  }, i;
}
class Na {
  constructor(i) {
    this._extensions = {};
    for (const t in i)
      this._extensions[t] = i[t];
  }
  addExtension(i, t) {
    this._extensions[i] = t;
  }
  getExtension(i) {
    return this._extensions[i];
  }
}
typeof dhtmlx < "u" && dhtmlx.attaches && (dhtmlx.attaches.attachScheduler = function(e, i, t, r) {
  t = t || '<div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div>';
  var d = document.createElement("DIV");
  return d.id = "dhxSchedObj_" + this._genStr(12), d.innerHTML = '<div id="' + d.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button"></div><div class="dhx_cal_next_button"></div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + t + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>', document.body.appendChild(d.firstChild), this.attachObject(d.id, !1, !0), this.vs[this.av].sched = r, this.vs[this.av].schedId = d.id, r.setSizes = r.updateView, r.destructor = function() {
  }, r.init(d.id, e, i), this.vs[this._viewRestore()].sched;
});
const de = (e, i) => {
  i(!1, `The ${e} extension is not included in this version of dhtmlxScheduler.<br>
		You may need a <a href="https://docs.dhtmlx.com/scheduler/editions_comparison.html" target="_blank">Professional version of the component</a>.<br>
		Contact us at <a href="https://dhtmlx.com/docs/contact.shtml" target="_blank">https://dhtmlx.com/docs/contact.shtml</a> if you have any questions.`);
};
function Ma(e) {
  (function() {
    var i = [];
    function t() {
      return !!i.length;
    }
    function r(_) {
      setTimeout(function() {
        if (e.$destroyed)
          return !0;
        t() || function(a, o) {
          for (; a && a != o; )
            a = a.parentNode;
          return a == o;
        }(document.activeElement, e.$container) || e.focus();
      }, 1);
    }
    function d(_) {
      var a = (_ = _ || window.event).currentTarget;
      a == i[i.length - 1] && e.$keyboardNavigation.trapFocus(a, _);
    }
    if (e.attachEvent("onLightbox", function() {
      var _;
      _ = e.getLightbox(), e.eventRemove(_, "keydown", d), e.event(_, "keydown", d), i.push(_);
    }), e.attachEvent("onAfterLightbox", function() {
      var _ = i.pop();
      _ && e.eventRemove(_, "keydown", d), r();
    }), e.attachEvent("onAfterQuickInfo", function() {
      r();
    }), !e._keyNavMessagePopup) {
      e._keyNavMessagePopup = !0;
      var n = null, s = null;
      const _ = [];
      e.attachEvent("onMessagePopup", function(a) {
        for (n = document.activeElement, s = n; s && e._getClassName(s).indexOf("dhx_cal_data") < 0; )
          s = s.parentNode;
        s && (s = s.parentNode), e.eventRemove(a, "keydown", d), e.event(a, "keydown", d), _.push(a);
      }), e.attachEvent("onAfterMessagePopup", function() {
        var a = _.pop();
        a && e.eventRemove(a, "keydown", d), setTimeout(function() {
          if (e.$destroyed)
            return !0;
          for (var o = document.activeElement; o && e._getClassName(o).indexOf("dhx_cal_light") < 0; )
            o = o.parentNode;
          o || (n && n.parentNode ? n.focus() : s && s.parentNode && s.focus(), n = null, s = null);
        }, 1);
      });
    }
    e.$keyboardNavigation.isModal = t;
  })();
}
function Ta(e) {
  e._temp_key_scope = function() {
    e.config.key_nav = !0, e.$keyboardNavigation._pasteDate = null, e.$keyboardNavigation._pasteSection = null;
    var i = null, t = {};
    function r(s) {
      s = s || window.event, t.x = s.clientX, t.y = s.clientY;
    }
    function d() {
      for (var s, _, a = document.elementFromPoint(t.x, t.y); a && a != e._obj; )
        a = a.parentNode;
      return s = a == e._obj, _ = e.$keyboardNavigation.dispatcher.isEnabled(), s || _;
    }
    function n(s) {
      return e._lame_copy({}, s);
    }
    document.body ? e.event(document.body, "mousemove", r) : e.event(window, "load", function() {
      e.event(document.body, "mousemove", r);
    }), e.attachEvent("onMouseMove", function(s, _) {
      var a = e.getState();
      if (a.mode && a.min_date) {
        var o = e.getActionData(_);
        e.$keyboardNavigation._pasteDate = o.date, e.$keyboardNavigation._pasteSection = o.section;
      }
    }), e._make_pasted_event = function(s) {
      var _ = e.$keyboardNavigation._pasteDate, a = e.$keyboardNavigation._pasteSection, o = s.end_date - s.start_date, l = n(s);
      if (function(m) {
        delete m.rec_type, delete m.rec_pattern, delete m.event_pid, delete m.event_length;
      }(l), l.start_date = new Date(_), l.end_date = new Date(l.start_date.valueOf() + o), a) {
        var h = e._get_section_property();
        e.config.multisection && s[h] && e.isMultisectionEvent && e.isMultisectionEvent(s) ? l[h] = s[h] : l[h] = a;
      }
      return l;
    }, e._do_paste = function(s, _, a) {
      e.callEvent("onBeforeEventPasted", [s, _, a]) !== !1 && (e.addEvent(_), e.callEvent("onEventPasted", [s, _, a]));
    }, e._is_key_nav_active = function() {
      return !(!this._is_initialized() || this._is_lightbox_open() || !this.config.key_nav);
    }, e.event(document, "keydown", function(s) {
      (s.ctrlKey || s.metaKey) && s.keyCode == 86 && e._buffer_event && !e.$keyboardNavigation.dispatcher.isEnabled() && (e.$keyboardNavigation.dispatcher.isActive = d());
    }), e._key_nav_copy_paste = function(s) {
      if (!e._is_key_nav_active())
        return !0;
      if (s.keyCode == 37 || s.keyCode == 39) {
        s.cancelBubble = !0;
        var _ = e.date.add(e._date, s.keyCode == 37 ? -1 : 1, e._mode);
        return e.setCurrentView(_), !0;
      }
      var a, o = (a = e.$keyboardNavigation.dispatcher.getActiveNode()) && a.eventId ? a.eventId : e._select_id;
      if ((s.ctrlKey || s.metaKey) && s.keyCode == 67)
        return o && (e._buffer_event = n(e.getEvent(o)), i = !0, e.callEvent("onEventCopied", [e.getEvent(o)])), !0;
      if ((s.ctrlKey || s.metaKey) && s.keyCode == 88 && o) {
        i = !1;
        var l = e._buffer_event = n(e.getEvent(o));
        e.updateEvent(l.id), e.callEvent("onEventCut", [l]);
      }
      if ((s.ctrlKey || s.metaKey) && s.keyCode == 86 && d()) {
        if (l = (l = e._buffer_event ? e.getEvent(e._buffer_event.id) : e._buffer_event) || e._buffer_event) {
          var h = e._make_pasted_event(l);
          i ? (h.id = e.uid(), e._do_paste(i, h, l)) : e.callEvent("onBeforeEventChanged", [h, s, !1, l]) && (e._do_paste(i, h, l), i = !0);
        }
        return !0;
      }
    };
  }, e._temp_key_scope();
}
function Aa(e) {
  e.$keyboardNavigation.attachSchedulerHandlers = function() {
    var i, t = e.$keyboardNavigation.dispatcher, r = function(a) {
      if (e.config.key_nav)
        return t.keyDownHandler(a);
    }, d = function() {
      t.keepScrollPosition(function() {
        t.focusGlobalNode();
      });
    };
    e.attachEvent("onDataRender", function() {
      e.config.key_nav && t.isEnabled() && !e.getState().editor_id && (clearTimeout(i), i = setTimeout(function() {
        if (e.$destroyed)
          return !0;
        t.isEnabled() || t.enable(), n();
      }));
    });
    var n = function() {
      if (t.isEnabled()) {
        var a = t.getActiveNode();
        a && (a.isValid() || (a = a.fallback()), !a || a instanceof e.$keyboardNavigation.MinicalButton || a instanceof e.$keyboardNavigation.MinicalCell || t.keepScrollPosition(function() {
          a.focus(!0);
        }));
      }
    };
    function s(a) {
      if (!e.config.key_nav)
        return !0;
      const o = e.getView();
      let l = !1;
      if (e.getState().mode === "month")
        l = e.$keyboardNavigation.isChildOf(a.target || a.srcElement, e.$container.querySelector(".dhx_cal_month_table"));
      else if (o && o.layout === "timeline")
        l = e.$keyboardNavigation.isChildOf(a.target || a.srcElement, e.$container.querySelector(".dhx_timeline_data_col"));
      else {
        const v = e.$container.querySelectorAll(".dhx_scale_holder");
        l = Array.from(v).some((u) => u === a.target.parentNode);
      }
      var h, m = e.getActionData(a);
      e._locate_event(a.target || a.srcElement) ? h = new e.$keyboardNavigation.Event(e._locate_event(a.target || a.srcElement)) : l && (h = new e.$keyboardNavigation.TimeSlot(), m.date && l && (h = h.nextSlot(new e.$keyboardNavigation.TimeSlot(m.date, null, m.section)))), h && (t.isEnabled() ? m.date && l && t.delay(function() {
        t.setActiveNode(h);
      }) : t.activeNode = h);
    }
    e.attachEvent("onSchedulerReady", function() {
      var a = e.$container;
      e.eventRemove(document, "keydown", r), e.eventRemove(a, "mousedown", s), e.eventRemove(a, "focus", d), e.config.key_nav ? (e.event(document, "keydown", r), e.event(a, "mousedown", s), e.event(a, "focus", d), a.setAttribute("tabindex", "0")) : a.removeAttribute("tabindex");
    });
    var _ = e.updateEvent;
    e.updateEvent = function(a) {
      var o = _.apply(this, arguments);
      if (e.config.key_nav && t.isEnabled() && e.getState().select_id == a) {
        var l = new e.$keyboardNavigation.Event(a);
        e.getState().lightbox_id || function(h) {
          if (e.config.key_nav && t.isEnabled()) {
            var m = h, v = new e.$keyboardNavigation.Event(m.eventId);
            if (!v.isValid()) {
              var u = v.start || m.start, c = v.end || m.end, f = v.section || m.section;
              (v = new e.$keyboardNavigation.TimeSlot(u, c, f)).isValid() || (v = new e.$keyboardNavigation.TimeSlot());
            }
            t.setActiveNode(v);
            var p = t.getActiveNode();
            p && p.getNode && document.activeElement != p.getNode() && t.focusNode(t.getActiveNode());
          }
        }(l);
      }
      return o;
    }, e.attachEvent("onEventDeleted", function(a) {
      return e.config.key_nav && t.isEnabled() && t.getActiveNode().eventId == a && t.setActiveNode(new e.$keyboardNavigation.TimeSlot()), !0;
    }), e.attachEvent("onClearAll", function() {
      if (!e.config.key_nav)
        return !0;
      t.isEnabled() && t.getActiveNode() instanceof e.$keyboardNavigation.Event && t.setActiveNode(new e.$keyboardNavigation.TimeSlot());
    });
  };
}
class Ca {
  constructor(i) {
    this.map = null, this._markers = [], this.scheduler = i;
  }
  onEventClick(i) {
    if (this._markers && this._markers.length > 0) {
      for (let t = 0; t < this._markers.length; t++)
        if (i.id == this._markers[t].event.id) {
          let r = this.settings.zoom_after_resolve || this.settings.initial_zoom;
          i.lat && i.lng ? (this.map.setCenter({ lat: i.lat, lng: i.lng }), this.map.setZoom(r)) : (this.map.setCenter({ lat: this.settings.error_position.lat, lng: this.settings.error_position.lng }), this.map.setZoom(r)), google.maps.event.trigger(this._markers[t].marker, "click");
        }
    }
  }
  initialize(i, t) {
    this.settings = t;
    let r = this.scheduler, d = { center: { lat: t.initial_position.lat, lng: t.initial_position.lng }, zoom: t.initial_zoom, mapId: i.id, scrollwheel: !0, mapTypeId: t.type };
    if (this.map === null)
      this.map = new google.maps.Map(i, d);
    else {
      let n = this.map;
      i.appendChild(this.map.__gm.messageOverlay), i.appendChild(this.map.__gm.outerContainer), setTimeout(function() {
        n.setOptions({ container: i.id });
      }, 500);
    }
    google.maps.event.addListener(this.map, "dblclick", function(n) {
      const s = new google.maps.Geocoder();
      if (!r.config.readonly && r.config.dblclick_create) {
        let _ = n.latLng;
        s.geocode({ latLng: _ }, function(a, o) {
          o == google.maps.GeocoderStatus.OK ? (_ = a[0].geometry.location, r.addEventNow({ lat: _.lat(), lng: _.lng(), event_location: a[0].formatted_address, start_date: r.getState().date, end_date: r.date.add(r.getState().date, r.config.time_step, "minute") })) : console.error("Geocode was not successful for the following reason: " + o);
        });
      }
    });
  }
  destroy(i) {
    for (google.maps.event.clearInstanceListeners(window), google.maps.event.clearInstanceListeners(document), google.maps.event.clearInstanceListeners(i); i.firstChild; )
      i.firstChild.remove();
    i.innerHTML = "";
  }
  async addEventMarker(i) {
    let t = { title: i.text, position: {}, map: {} };
    i.lat && i.lng ? t.position = { lat: i.lat, lng: i.lng } : t.position = { lat: this.settings.error_position.lat, lng: this.settings.error_position.lng };
    const { AdvancedMarkerElement: r } = await google.maps.importLibrary("marker");
    let d;
    this.scheduler.ext.mapView.createMarker ? (t.map = this.map, d = this.scheduler.ext.mapView.createMarker(t)) : (d = new r(t), d.map = this.map), d.setMap(this.map), i["!nativeeditor_status"] == "true_deleted" && d.setMap(null), google.maps.event.addListener(d, "click", () => {
      this.infoWindow && this.infoWindow.close(), this.infoWindow = new google.maps.InfoWindow({ maxWidth: this.settings.info_window_max_width }), this.infoWindow.setContent(this.scheduler.templates.map_info_content(i)), this.infoWindow.open({ anchor: d, map: this.map });
    });
    let n = { event: i, ...t, marker: d };
    this._markers.push(n);
  }
  removeEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      i == this._markers[t].event.id && (this._markers[t].marker.setVisible(!1), this._markers[t].marker.setMap(null), this._markers[t].marker.setPosition(null), this._markers[t].marker = null, this._markers.splice(t, 1), t--);
  }
  updateEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      if (this._markers[t].event.id == i.id) {
        this._markers[t].event = i, this._markers[t].position.lat = i.lat, this._markers[t].position.lng = i.lng, this._markers[t].text = i.text;
        let r = new google.maps.LatLng(i.lat, i.lng);
        this._markers[t].marker.setPosition(r);
      }
  }
  clearEventMarkers() {
    if (this._markers.length > 0) {
      for (let i = 0; i < this._markers.length; i++)
        this._markers[i].marker.setMap(null);
      this._markers = [];
    }
  }
  setView(i, t, r) {
    this.map.setCenter({ lat: i, lng: t }), this.map.setZoom(r);
  }
  async resolveAddress(i) {
    const t = new google.maps.Geocoder();
    return await new Promise((r) => {
      t.geocode({ address: i }, function(d, n) {
        n == google.maps.GeocoderStatus.OK ? r({ lat: d[0].geometry.location.lat(), lng: d[0].geometry.location.lng() }) : (console.error("Geocode was not successful for the following reason: " + n), r({}));
      });
    });
  }
}
class Oa {
  constructor(i) {
    this.map = null, this._markers = [], this.scheduler = i;
  }
  onEventClick(i) {
    if (this._markers && this._markers.length > 0)
      for (let t = 0; t < this._markers.length; t++)
        i.id == this._markers[t].event.id && (this._markers[t].marker.openPopup(), this._markers[t].marker.closeTooltip(), i.lat && i.lng ? this.setView(i.lat, i.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom) : this.setView(this.settings.error_position.lat, this.settings.error_position.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom));
  }
  initialize(i, t) {
    let r = this.scheduler, d = document.createElement("div");
    d.className = "mapWrapper", d.id = "mapWrapper", d.style.width = i.style.width, d.style.height = i.style.height, i.appendChild(d);
    let n = L.map(d, { center: L.latLng(t.initial_position.lat, t.initial_position.lng), zoom: t.initial_zoom, keyboard: !1 });
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(n), n.on("dblclick", async function(s) {
      let _ = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${s.latlng.lat}&lon=${s.latlng.lng}&format=json`, { method: "GET", headers: { "Accept-Language": "en" } }).then((a) => a.json());
      if (_.address) {
        let a = _.address.country;
        r.addEventNow({ lat: s.latlng.lat, lng: s.latlng.lng, event_location: a, start_date: r.getState().date, end_date: r.date.add(r.getState().date, r.config.time_step, "minute") });
      } else
        console.error("unable recieve a position of the event", _.error);
    }), this.map = n, this.settings = t;
  }
  destroy(i) {
    for (this.map.remove(); i.firstChild; )
      i.firstChild.remove();
    i.innerHTML = "";
  }
  addEventMarker(i) {
    const t = L.icon({ iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png", iconSize: [25, 41], shadowSize: [30, 65], iconAnchor: [12, 41], shadowAnchor: [7, 65] });
    let r = { minWidth: 180, maxWidth: this.settings.info_window_max_width };
    const d = L.popup(r).setContent(this.scheduler.templates.map_info_content(i)), n = L.tooltip().setContent(i.text);
    let s = [i.lat, i.lng];
    i.lat && i.lng || (s = [this.settings.error_position.lat, this.settings.error_position.lng]);
    const _ = { event: i, marker: L.marker(s, { icon: t }).bindPopup(d).bindTooltip(n).addTo(this.map) };
    this._markers.push(_);
  }
  removeEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      i == this._markers[t].event.id && (this.map.removeLayer(this._markers[t].marker), this._markers.splice(t, 1), t--);
  }
  updateEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      this._markers[t].event.id == i.id && (this._markers[t].event = i, i.lat && i.lng ? this._markers[t].marker.setLatLng([i.lat, i.lng]) : this._markers[t].marker.setLatLng([this.settings.error_position.lat, this.settings.error_position.lng]));
  }
  clearEventMarkers() {
    if (this._markers) {
      for (let i = 0; i < this._markers.length; i++)
        this.map.removeLayer(this._markers[i].marker);
      this._markers = [];
    }
  }
  setView(i, t, r) {
    this.map.setView([i, t], r);
  }
  async resolveAddress(i) {
    let t = {}, r = await fetch(`https://nominatim.openstreetmap.org/search?q=${i}&format=json`, { method: "GET", headers: { "Accept-Language": "en" } }).then((d) => d.json());
    return r && r.length ? (t.lat = +r[0].lat, t.lng = +r[0].lon) : console.error(`Unable recieve a position of the event's location: ${i}`), t;
  }
}
class La {
  constructor(i) {
    this.map = null, this._markers = [], this.scheduler = i;
  }
  onEventClick(i) {
    if (this._markers && this._markers.length > 0)
      for (let t = 0; t < this._markers.length; t++) {
        const r = this._markers[t].marker.getPopup();
        r.isOpen() && r.remove(), i.id == this._markers[t].event.id && (this._markers[t].marker.togglePopup(), i.lat && i.lng ? this.setView(i.lat, i.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom) : this.setView(this.settings.error_position.lat, this.settings.error_position.lng, this.settings.zoom_after_resolve || this.settings.initial_zoom));
      }
  }
  initialize(i, t) {
    let r = this.scheduler;
    mapboxgl.accessToken = t.accessToken;
    const d = new mapboxgl.Map({ container: i, center: [t.initial_position.lng, t.initial_position.lat], zoom: t.initial_zoom + 1 });
    d.on("dblclick", async function(n) {
      let s = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${n.lngLat.lng},${n.lngLat.lat}.json?access_token=${t.accessToken}`).then((_) => _.json());
      if (s.features) {
        let _ = s.features[0].place_name;
        r.addEventNow({ lat: n.lngLat.lat, lng: n.lngLat.lng, event_location: _, start_date: r.getState().date, end_date: r.date.add(r.getState().date, r.config.time_step, "minute") });
      } else
        console.error("unable recieve a position of the event");
    }), this.map = d, this.settings = t;
  }
  destroy(i) {
    for (this.map.remove(); i.firstChild; )
      i.firstChild.remove();
    i.innerHTML = "";
  }
  addEventMarker(i) {
    let t = [i.lng, i.lat];
    i.lat && i.lng || (t = [this.settings.error_position.lng, this.settings.error_position.lat]);
    const r = new mapboxgl.Popup({ offset: 25, focusAfterOpen: !1 }).setMaxWidth(`${this.settings.info_window_max_width}px`).setHTML(this.scheduler.templates.map_info_content(i)), d = { event: i, marker: new mapboxgl.Marker().setLngLat(t).setPopup(r).addTo(this.map) };
    this._markers.push(d);
  }
  removeEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      i == this._markers[t].event.id && (this._markers[t].marker.remove(), this._markers.splice(t, 1), t--);
  }
  updateEventMarker(i) {
    for (let t = 0; t < this._markers.length; t++)
      this._markers[t].event.id == i.id && (this._markers[t].event = i, i.lat && i.lng ? this._markers[t].marker.setLngLat([i.lng, i.lat]) : this._markers[t].marker.setLngLat([this.settings.error_position.lng, this.settings.error_position.lat]));
  }
  clearEventMarkers() {
    for (let i = 0; i < this._markers.length; i++)
      this._markers[i].marker.remove();
    this._markers = [];
  }
  setView(i, t, r) {
    this.map.setCenter([t, i]), this.map.setZoom(r);
  }
  async resolveAddress(i) {
    let t = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${i}.json?access_token=${this.settings.accessToken}`).then((d) => d.json()), r = {};
    return t && t.features.length ? (r.lng = t.features[0].center[0], r.lat = t.features[0].center[1]) : console.error(`Unable recieve a position of the event's location: ${i}`), r;
  }
}
var $e = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"], K = function() {
  function e(i, t) {
    if (t === 0)
      throw new Error("Can't create weekday with n == 0");
    this.weekday = i, this.n = t;
  }
  return e.fromStr = function(i) {
    return new e($e.indexOf(i));
  }, e.prototype.nth = function(i) {
    return this.n === i ? this : new e(this.weekday, i);
  }, e.prototype.equals = function(i) {
    return this.weekday === i.weekday && this.n === i.n;
  }, e.prototype.toString = function() {
    var i = $e[this.weekday];
    return this.n && (i = (this.n > 0 ? "+" : "") + String(this.n) + i), i;
  }, e.prototype.getJsWeekday = function() {
    return this.weekday === 6 ? 0 : this.weekday + 1;
  }, e;
}(), U = function(e) {
  return e != null;
}, te = function(e) {
  return typeof e == "number";
}, Ge = function(e) {
  return typeof e == "string" && $e.includes(e);
}, G = Array.isArray, ne = function(e, i) {
  i === void 0 && (i = e), arguments.length === 1 && (i = e, e = 0);
  for (var t = [], r = e; r < i; r++)
    t.push(r);
  return t;
}, I = function(e, i) {
  var t = 0, r = [];
  if (G(e))
    for (; t < i; t++)
      r[t] = [].concat(e);
  else
    for (; t < i; t++)
      r[t] = e;
  return r;
};
function ue(e, i, t) {
  t === void 0 && (t = " ");
  var r = String(e);
  return i >>= 0, r.length > i ? String(r) : ((i -= r.length) > t.length && (t += I(t, i / t.length)), t.slice(0, i) + String(r));
}
var Ha = function(e, i, t) {
  var r = e.split(i);
  return t ? r.slice(0, t).concat([r.slice(t).join(i)]) : r;
}, Z = function(e, i) {
  var t = e % i;
  return t * i < 0 ? t + i : t;
}, Ae = function(e, i) {
  return { div: Math.floor(e / i), mod: Z(e, i) };
}, ae = function(e) {
  return !U(e) || e.length === 0;
}, F = function(e) {
  return !ae(e);
}, R = function(e, i) {
  return F(e) && e.indexOf(i) !== -1;
}, he = function(e, i, t, r, d, n) {
  return r === void 0 && (r = 0), d === void 0 && (d = 0), n === void 0 && (n = 0), new Date(Date.UTC(e, i - 1, t, r, d, n));
}, $a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], vt = 864e5, gt = 9999, yt = he(1970, 1, 1), za = [6, 0, 1, 2, 3, 4, 5], ge = function(e) {
  return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
}, bt = function(e) {
  return e instanceof Date;
}, ye = function(e) {
  return bt(e) && !isNaN(e.getTime());
}, ze = function(e) {
  return i = yt, t = e.getTime() - i.getTime(), Math.round(t / vt);
  var i, t;
}, xt = function(e) {
  return new Date(yt.getTime() + e * vt);
}, qa = function(e) {
  var i = e.getUTCMonth();
  return i === 1 && ge(e.getUTCFullYear()) ? 29 : $a[i];
}, me = function(e) {
  return za[e.getUTCDay()];
}, Xe = function(e, i) {
  var t = he(e, i + 1, 1);
  return [me(t), qa(t)];
}, kt = function(e, i) {
  return i = i || e, new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), i.getHours(), i.getMinutes(), i.getSeconds(), i.getMilliseconds()));
}, qe = function(e) {
  return new Date(e.getTime());
}, Ze = function(e) {
  for (var i = [], t = 0; t < e.length; t++)
    i.push(qe(e[t]));
  return i;
}, be = function(e) {
  e.sort(function(i, t) {
    return i.getTime() - t.getTime();
  });
}, Ve = function(e, i) {
  i === void 0 && (i = !0);
  var t = new Date(e);
  return [ue(t.getUTCFullYear().toString(), 4, "0"), ue(t.getUTCMonth() + 1, 2, "0"), ue(t.getUTCDate(), 2, "0"), "T", ue(t.getUTCHours(), 2, "0"), ue(t.getUTCMinutes(), 2, "0"), ue(t.getUTCSeconds(), 2, "0"), i ? "Z" : ""].join("");
}, Fe = function(e) {
  var i = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/.exec(e);
  if (!i)
    throw new Error("Invalid UNTIL value: ".concat(e));
  return new Date(Date.UTC(parseInt(i[1], 10), parseInt(i[2], 10) - 1, parseInt(i[3], 10), parseInt(i[5], 10) || 0, parseInt(i[6], 10) || 0, parseInt(i[7], 10) || 0));
}, Qe = function(e, i) {
  return e.toLocaleString("sv-SE", { timeZone: i }).replace(" ", "T") + "Z";
}, pe = function() {
  function e(i, t) {
    this.minDate = null, this.maxDate = null, this._result = [], this.total = 0, this.method = i, this.args = t, i === "between" ? (this.maxDate = t.inc ? t.before : new Date(t.before.getTime() - 1), this.minDate = t.inc ? t.after : new Date(t.after.getTime() + 1)) : i === "before" ? this.maxDate = t.inc ? t.dt : new Date(t.dt.getTime() - 1) : i === "after" && (this.minDate = t.inc ? t.dt : new Date(t.dt.getTime() + 1));
  }
  return e.prototype.accept = function(i) {
    ++this.total;
    var t = this.minDate && i < this.minDate, r = this.maxDate && i > this.maxDate;
    if (this.method === "between") {
      if (t)
        return !0;
      if (r)
        return !1;
    } else if (this.method === "before") {
      if (r)
        return !1;
    } else if (this.method === "after")
      return !!t || (this.add(i), !1);
    return this.add(i);
  }, e.prototype.add = function(i) {
    return this._result.push(i), !0;
  }, e.prototype.getValue = function() {
    var i = this._result;
    switch (this.method) {
      case "all":
      case "between":
        return i;
      default:
        return i.length ? i[i.length - 1] : null;
    }
  }, e.prototype.clone = function() {
    return new e(this.method, this.args);
  }, e;
}(), je = function(e, i) {
  return je = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var d in r)
      Object.prototype.hasOwnProperty.call(r, d) && (t[d] = r[d]);
  }, je(e, i);
};
function Be(e, i) {
  if (typeof i != "function" && i !== null)
    throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
  function t() {
    this.constructor = e;
  }
  je(e, i), e.prototype = i === null ? Object.create(i) : (t.prototype = i.prototype, new t());
}
var X = function() {
  return X = Object.assign || function(e) {
    for (var i, t = 1, r = arguments.length; t < r; t++)
      for (var d in i = arguments[t])
        Object.prototype.hasOwnProperty.call(i, d) && (e[d] = i[d]);
    return e;
  }, X.apply(this, arguments);
};
function O(e, i, t) {
  if (t || arguments.length === 2)
    for (var r, d = 0, n = i.length; d < n; d++)
      !r && d in i || (r || (r = Array.prototype.slice.call(i, 0, d)), r[d] = i[d]);
  return e.concat(r || Array.prototype.slice.call(i));
}
var P, et = function(e) {
  function i(t, r, d) {
    var n = e.call(this, t, r) || this;
    return n.iterator = d, n;
  }
  return Be(i, e), i.prototype.add = function(t) {
    return !!this.iterator(t, this._result.length) && (this._result.push(t), !0);
  }, i;
}(pe), ke = { dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], tokens: { SKIP: /^[ \r\n\t]+|^\.$/, number: /^[1-9][0-9]*/, numberAsText: /^(one|two|three)/i, every: /^every/i, "day(s)": /^days?/i, "weekday(s)": /^weekdays?/i, "week(s)": /^weeks?/i, "hour(s)": /^hours?/i, "minute(s)": /^minutes?/i, "month(s)": /^months?/i, "year(s)": /^years?/i, on: /^(on|in)/i, at: /^(at)/i, the: /^the/i, first: /^first/i, second: /^second/i, third: /^third/i, nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i, last: /^last/i, for: /^for/i, "time(s)": /^times?/i, until: /^(un)?til/i, monday: /^mo(n(day)?)?/i, tuesday: /^tu(e(s(day)?)?)?/i, wednesday: /^we(d(n(esday)?)?)?/i, thursday: /^th(u(r(sday)?)?)?/i, friday: /^fr(i(day)?)?/i, saturday: /^sa(t(urday)?)?/i, sunday: /^su(n(day)?)?/i, january: /^jan(uary)?/i, february: /^feb(ruary)?/i, march: /^mar(ch)?/i, april: /^apr(il)?/i, may: /^may/i, june: /^june?/i, july: /^july?/i, august: /^aug(ust)?/i, september: /^sep(t(ember)?)?/i, october: /^oct(ober)?/i, november: /^nov(ember)?/i, december: /^dec(ember)?/i, comma: /^(,\s*|(and|or)\s*)+/i } }, tt = function(e, i) {
  return e.indexOf(i) !== -1;
}, ja = function(e) {
  return e.toString();
}, Ia = function(e, i, t) {
  return "".concat(i, " ").concat(t, ", ").concat(e);
}, ie = function() {
  function e(i, t, r, d) {
    if (t === void 0 && (t = ja), r === void 0 && (r = ke), d === void 0 && (d = Ia), this.text = [], this.language = r || ke, this.gettext = t, this.dateFormatter = d, this.rrule = i, this.options = i.options, this.origOptions = i.origOptions, this.origOptions.bymonthday) {
      var n = [].concat(this.options.bymonthday), s = [].concat(this.options.bynmonthday);
      n.sort(function(l, h) {
        return l - h;
      }), s.sort(function(l, h) {
        return h - l;
      }), this.bymonthday = n.concat(s), this.bymonthday.length || (this.bymonthday = null);
    }
    if (U(this.origOptions.byweekday)) {
      var _ = G(this.origOptions.byweekday) ? this.origOptions.byweekday : [this.origOptions.byweekday], a = String(_);
      this.byweekday = { allWeeks: _.filter(function(l) {
        return !l.n;
      }), someWeeks: _.filter(function(l) {
        return !!l.n;
      }), isWeekdays: a.indexOf("MO") !== -1 && a.indexOf("TU") !== -1 && a.indexOf("WE") !== -1 && a.indexOf("TH") !== -1 && a.indexOf("FR") !== -1 && a.indexOf("SA") === -1 && a.indexOf("SU") === -1, isEveryDay: a.indexOf("MO") !== -1 && a.indexOf("TU") !== -1 && a.indexOf("WE") !== -1 && a.indexOf("TH") !== -1 && a.indexOf("FR") !== -1 && a.indexOf("SA") !== -1 && a.indexOf("SU") !== -1 };
      var o = function(l, h) {
        return l.weekday - h.weekday;
      };
      this.byweekday.allWeeks.sort(o), this.byweekday.someWeeks.sort(o), this.byweekday.allWeeks.length || (this.byweekday.allWeeks = null), this.byweekday.someWeeks.length || (this.byweekday.someWeeks = null);
    } else
      this.byweekday = null;
  }
  return e.isFullyConvertible = function(i) {
    if (!(i.options.freq in e.IMPLEMENTED) || i.origOptions.until && i.origOptions.count)
      return !1;
    for (var t in i.origOptions) {
      if (tt(["dtstart", "tzid", "wkst", "freq"], t))
        return !0;
      if (!tt(e.IMPLEMENTED[i.options.freq], t))
        return !1;
    }
    return !0;
  }, e.prototype.isFullyConvertible = function() {
    return e.isFullyConvertible(this.rrule);
  }, e.prototype.toString = function() {
    var i = this.gettext;
    if (!(this.options.freq in e.IMPLEMENTED))
      return i("RRule error: Unable to fully convert this rrule to text");
    if (this.text = [i("every")], this[C.FREQUENCIES[this.options.freq]](), this.options.until) {
      this.add(i("until"));
      var t = this.options.until;
      this.add(this.dateFormatter(t.getUTCFullYear(), this.language.monthNames[t.getUTCMonth()], t.getUTCDate()));
    } else
      this.options.count && this.add(i("for")).add(this.options.count.toString()).add(this.plural(this.options.count) ? i("times") : i("time"));
    return this.isFullyConvertible() || this.add(i("(~ approximate)")), this.text.join("");
  }, e.prototype.HOURLY = function() {
    var i = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? i("hours") : i("hour"));
  }, e.prototype.MINUTELY = function() {
    var i = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? i("minutes") : i("minute"));
  }, e.prototype.DAILY = function() {
    var i = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()), this.byweekday && this.byweekday.isWeekdays ? this.add(this.plural(this.options.interval) ? i("weekdays") : i("weekday")) : this.add(this.plural(this.options.interval) ? i("days") : i("day")), this.origOptions.bymonth && (this.add(i("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday ? this._byweekday() : this.origOptions.byhour && this._byhour();
  }, e.prototype.WEEKLY = function() {
    var i = this.gettext;
    this.options.interval !== 1 && this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? i("weeks") : i("week")), this.byweekday && this.byweekday.isWeekdays ? this.options.interval === 1 ? this.add(this.plural(this.options.interval) ? i("weekdays") : i("weekday")) : this.add(i("on")).add(i("weekdays")) : this.byweekday && this.byweekday.isEveryDay ? this.add(this.plural(this.options.interval) ? i("days") : i("day")) : (this.options.interval === 1 && this.add(i("week")), this.origOptions.bymonth && (this.add(i("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.origOptions.byhour && this._byhour());
  }, e.prototype.MONTHLY = function() {
    var i = this.gettext;
    this.origOptions.bymonth ? (this.options.interval !== 1 && (this.add(this.options.interval.toString()).add(i("months")), this.plural(this.options.interval) && this.add(i("in"))), this._bymonth()) : (this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? i("months") : i("month"))), this.bymonthday ? this._bymonthday() : this.byweekday && this.byweekday.isWeekdays ? this.add(i("on")).add(i("weekdays")) : this.byweekday && this._byweekday();
  }, e.prototype.YEARLY = function() {
    var i = this.gettext;
    this.origOptions.bymonth ? (this.options.interval !== 1 && (this.add(this.options.interval.toString()), this.add(i("years"))), this._bymonth()) : (this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? i("years") : i("year"))), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.options.byyearday && this.add(i("on the")).add(this.list(this.options.byyearday, this.nth, i("and"))).add(i("day")), this.options.byweekno && this.add(i("in")).add(this.plural(this.options.byweekno.length) ? i("weeks") : i("week")).add(this.list(this.options.byweekno, void 0, i("and")));
  }, e.prototype._bymonthday = function() {
    var i = this.gettext;
    this.byweekday && this.byweekday.allWeeks ? this.add(i("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext, i("or"))).add(i("the")).add(this.list(this.bymonthday, this.nth, i("or"))) : this.add(i("on the")).add(this.list(this.bymonthday, this.nth, i("and")));
  }, e.prototype._byweekday = function() {
    var i = this.gettext;
    this.byweekday.allWeeks && !this.byweekday.isWeekdays && this.add(i("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext)), this.byweekday.someWeeks && (this.byweekday.allWeeks && this.add(i("and")), this.add(i("on the")).add(this.list(this.byweekday.someWeeks, this.weekdaytext, i("and"))));
  }, e.prototype._byhour = function() {
    var i = this.gettext;
    this.add(i("at")).add(this.list(this.origOptions.byhour, void 0, i("and")));
  }, e.prototype._bymonth = function() {
    this.add(this.list(this.options.bymonth, this.monthtext, this.gettext("and")));
  }, e.prototype.nth = function(i) {
    var t;
    i = parseInt(i.toString(), 10);
    var r = this.gettext;
    if (i === -1)
      return r("last");
    var d = Math.abs(i);
    switch (d) {
      case 1:
      case 21:
      case 31:
        t = d + r("st");
        break;
      case 2:
      case 22:
        t = d + r("nd");
        break;
      case 3:
      case 23:
        t = d + r("rd");
        break;
      default:
        t = d + r("th");
    }
    return i < 0 ? t + " " + r("last") : t;
  }, e.prototype.monthtext = function(i) {
    return this.language.monthNames[i - 1];
  }, e.prototype.weekdaytext = function(i) {
    var t = te(i) ? (i + 1) % 7 : i.getJsWeekday();
    return (i.n ? this.nth(i.n) + " " : "") + this.language.dayNames[t];
  }, e.prototype.plural = function(i) {
    return i % 100 != 1;
  }, e.prototype.add = function(i) {
    return this.text.push(" "), this.text.push(i), this;
  }, e.prototype.list = function(i, t, r, d) {
    var n = this;
    d === void 0 && (d = ","), G(i) || (i = [i]), t = t || function(_) {
      return _.toString();
    };
    var s = function(_) {
      return t && t.call(n, _);
    };
    return r ? function(_, a, o) {
      for (var l = "", h = 0; h < _.length; h++)
        h !== 0 && (h === _.length - 1 ? l += " " + o + " " : l += a + " "), l += _[h];
      return l;
    }(i.map(s), d, r) : i.map(s).join(d + " ");
  }, e;
}(), Pa = function() {
  function e(i) {
    this.done = !0, this.rules = i;
  }
  return e.prototype.start = function(i) {
    return this.text = i, this.done = !1, this.nextSymbol();
  }, e.prototype.isDone = function() {
    return this.done && this.symbol === null;
  }, e.prototype.nextSymbol = function() {
    var i, t;
    this.symbol = null, this.value = null;
    do {
      if (this.done)
        return !1;
      for (var r in i = null, this.rules) {
        var d = this.rules[r].exec(this.text);
        d && (i === null || d[0].length > i[0].length) && (i = d, t = r);
      }
      if (i != null && (this.text = this.text.substr(i[0].length), this.text === "" && (this.done = !0)), i == null)
        return this.done = !0, this.symbol = null, void (this.value = null);
    } while (t === "SKIP");
    return this.symbol = t, this.value = i, !0;
  }, e.prototype.accept = function(i) {
    if (this.symbol === i) {
      if (this.value) {
        var t = this.value;
        return this.nextSymbol(), t;
      }
      return this.nextSymbol(), !0;
    }
    return !1;
  }, e.prototype.acceptNumber = function() {
    return this.accept("number");
  }, e.prototype.expect = function(i) {
    if (this.accept(i))
      return !0;
    throw new Error("expected " + i + " but found " + this.symbol);
  }, e;
}();
function wt(e, i) {
  i === void 0 && (i = ke);
  var t = {}, r = new Pa(i.tokens);
  return r.start(e) ? (function() {
    r.expect("every");
    var l = r.acceptNumber();
    if (l && (t.interval = parseInt(l[0], 10)), r.isDone())
      throw new Error("Unexpected end");
    switch (r.symbol) {
      case "day(s)":
        t.freq = C.DAILY, r.nextSymbol() && (n(), o());
        break;
      case "weekday(s)":
        t.freq = C.WEEKLY, t.byweekday = [C.MO, C.TU, C.WE, C.TH, C.FR], r.nextSymbol(), n(), o();
        break;
      case "week(s)":
        t.freq = C.WEEKLY, r.nextSymbol() && (d(), n(), o());
        break;
      case "hour(s)":
        t.freq = C.HOURLY, r.nextSymbol() && (d(), o());
        break;
      case "minute(s)":
        t.freq = C.MINUTELY, r.nextSymbol() && (d(), o());
        break;
      case "month(s)":
        t.freq = C.MONTHLY, r.nextSymbol() && (d(), o());
        break;
      case "year(s)":
        t.freq = C.YEARLY, r.nextSymbol() && (d(), o());
        break;
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        t.freq = C.WEEKLY;
        var h = r.symbol.substr(0, 2).toUpperCase();
        if (t.byweekday = [C[h]], !r.nextSymbol())
          return;
        for (; r.accept("comma"); ) {
          if (r.isDone())
            throw new Error("Unexpected end");
          var m = _();
          if (!m)
            throw new Error("Unexpected symbol " + r.symbol + ", expected weekday");
          t.byweekday.push(C[m]), r.nextSymbol();
        }
        n(), function() {
          r.accept("on"), r.accept("the");
          var u = a();
          if (u)
            for (t.bymonthday = [u], r.nextSymbol(); r.accept("comma"); ) {
              if (!(u = a()))
                throw new Error("Unexpected symbol " + r.symbol + "; expected monthday");
              t.bymonthday.push(u), r.nextSymbol();
            }
        }(), o();
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
        if (t.freq = C.YEARLY, t.bymonth = [s()], !r.nextSymbol())
          return;
        for (; r.accept("comma"); ) {
          if (r.isDone())
            throw new Error("Unexpected end");
          var v = s();
          if (!v)
            throw new Error("Unexpected symbol " + r.symbol + ", expected month");
          t.bymonth.push(v), r.nextSymbol();
        }
        d(), o();
        break;
      default:
        throw new Error("Unknown symbol");
    }
  }(), t) : null;
  function d() {
    var l = r.accept("on"), h = r.accept("the");
    if (l || h)
      do {
        var m = a(), v = _(), u = s();
        if (m)
          v ? (r.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(C[v].nth(m))) : (t.bymonthday || (t.bymonthday = []), t.bymonthday.push(m), r.accept("day(s)"));
        else if (v)
          r.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(C[v]);
        else if (r.symbol === "weekday(s)")
          r.nextSymbol(), t.byweekday || (t.byweekday = [C.MO, C.TU, C.WE, C.TH, C.FR]);
        else if (r.symbol === "week(s)") {
          r.nextSymbol();
          var c = r.acceptNumber();
          if (!c)
            throw new Error("Unexpected symbol " + r.symbol + ", expected week number");
          for (t.byweekno = [parseInt(c[0], 10)]; r.accept("comma"); ) {
            if (!(c = r.acceptNumber()))
              throw new Error("Unexpected symbol " + r.symbol + "; expected monthday");
            t.byweekno.push(parseInt(c[0], 10));
          }
        } else {
          if (!u)
            return;
          r.nextSymbol(), t.bymonth || (t.bymonth = []), t.bymonth.push(u);
        }
      } while (r.accept("comma") || r.accept("the") || r.accept("on"));
  }
  function n() {
    if (r.accept("at"))
      do {
        var l = r.acceptNumber();
        if (!l)
          throw new Error("Unexpected symbol " + r.symbol + ", expected hour");
        for (t.byhour = [parseInt(l[0], 10)]; r.accept("comma"); ) {
          if (!(l = r.acceptNumber()))
            throw new Error("Unexpected symbol " + r.symbol + "; expected hour");
          t.byhour.push(parseInt(l[0], 10));
        }
      } while (r.accept("comma") || r.accept("at"));
  }
  function s() {
    switch (r.symbol) {
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
  function _() {
    switch (r.symbol) {
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        return r.symbol.substr(0, 2).toUpperCase();
      default:
        return !1;
    }
  }
  function a() {
    switch (r.symbol) {
      case "last":
        return r.nextSymbol(), -1;
      case "first":
        return r.nextSymbol(), 1;
      case "second":
        return r.nextSymbol(), r.accept("last") ? -2 : 2;
      case "third":
        return r.nextSymbol(), r.accept("last") ? -3 : 3;
      case "nth":
        var l = parseInt(r.value[1], 10);
        if (l < -366 || l > 366)
          throw new Error("Nth out of range: " + l);
        return r.nextSymbol(), r.accept("last") ? -l : l;
      default:
        return !1;
    }
  }
  function o() {
    if (r.symbol === "until") {
      var l = Date.parse(r.text);
      if (!l)
        throw new Error("Cannot parse until date:" + r.text);
      t.until = new Date(l);
    } else
      r.accept("for") && (t.count = parseInt(r.value[0], 10), r.expect("number"));
  }
}
function Ce(e) {
  return e < P.HOURLY;
}
(function(e) {
  e[e.YEARLY = 0] = "YEARLY", e[e.MONTHLY = 1] = "MONTHLY", e[e.WEEKLY = 2] = "WEEKLY", e[e.DAILY = 3] = "DAILY", e[e.HOURLY = 4] = "HOURLY", e[e.MINUTELY = 5] = "MINUTELY", e[e.SECONDLY = 6] = "SECONDLY";
})(P || (P = {}));
var Ra = function(e, i) {
  return i === void 0 && (i = ke), new C(wt(e, i) || void 0);
}, fe = ["count", "until", "interval", "byweekday", "bymonthday", "bymonth"];
ie.IMPLEMENTED = [], ie.IMPLEMENTED[P.HOURLY] = fe, ie.IMPLEMENTED[P.MINUTELY] = fe, ie.IMPLEMENTED[P.DAILY] = ["byhour"].concat(fe), ie.IMPLEMENTED[P.WEEKLY] = fe, ie.IMPLEMENTED[P.MONTHLY] = fe, ie.IMPLEMENTED[P.YEARLY] = ["byweekno", "byyearday"].concat(fe);
var Ya = ie.isFullyConvertible, we = function() {
  function e(i, t, r, d) {
    this.hour = i, this.minute = t, this.second = r, this.millisecond = d || 0;
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
}(), Ua = function(e) {
  function i(t, r, d, n, s, _, a) {
    var o = e.call(this, n, s, _, a) || this;
    return o.year = t, o.month = r, o.day = d, o;
  }
  return Be(i, e), i.fromDate = function(t) {
    return new this(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.valueOf() % 1e3);
  }, i.prototype.getWeekday = function() {
    return me(new Date(this.getTime()));
  }, i.prototype.getTime = function() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
  }, i.prototype.getDay = function() {
    return this.day;
  }, i.prototype.getMonth = function() {
    return this.month;
  }, i.prototype.getYear = function() {
    return this.year;
  }, i.prototype.addYears = function(t) {
    this.year += t;
  }, i.prototype.addMonths = function(t) {
    if (this.month += t, this.month > 12) {
      var r = Math.floor(this.month / 12), d = Z(this.month, 12);
      this.month = d, this.year += r, this.month === 0 && (this.month = 12, --this.year);
    }
  }, i.prototype.addWeekly = function(t, r) {
    r > this.getWeekday() ? this.day += -(this.getWeekday() + 1 + (6 - r)) + 7 * t : this.day += -(this.getWeekday() - r) + 7 * t, this.fixDay();
  }, i.prototype.addDaily = function(t) {
    this.day += t, this.fixDay();
  }, i.prototype.addHours = function(t, r, d) {
    for (r && (this.hour += Math.floor((23 - this.hour) / t) * t); ; ) {
      this.hour += t;
      var n = Ae(this.hour, 24), s = n.div, _ = n.mod;
      if (s && (this.hour = _, this.addDaily(s)), ae(d) || R(d, this.hour))
        break;
    }
  }, i.prototype.addMinutes = function(t, r, d, n) {
    for (r && (this.minute += Math.floor((1439 - (60 * this.hour + this.minute)) / t) * t); ; ) {
      this.minute += t;
      var s = Ae(this.minute, 60), _ = s.div, a = s.mod;
      if (_ && (this.minute = a, this.addHours(_, !1, d)), (ae(d) || R(d, this.hour)) && (ae(n) || R(n, this.minute)))
        break;
    }
  }, i.prototype.addSeconds = function(t, r, d, n, s) {
    for (r && (this.second += Math.floor((86399 - (3600 * this.hour + 60 * this.minute + this.second)) / t) * t); ; ) {
      this.second += t;
      var _ = Ae(this.second, 60), a = _.div, o = _.mod;
      if (a && (this.second = o, this.addMinutes(a, !1, d, n)), (ae(d) || R(d, this.hour)) && (ae(n) || R(n, this.minute)) && (ae(s) || R(s, this.second)))
        break;
    }
  }, i.prototype.fixDay = function() {
    if (!(this.day <= 28)) {
      var t = Xe(this.year, this.month - 1)[1];
      if (!(this.day <= t))
        for (; this.day > t; ) {
          if (this.day -= t, ++this.month, this.month === 13 && (this.month = 1, ++this.year, this.year > gt))
            return;
          t = Xe(this.year, this.month - 1)[1];
        }
    }
  }, i.prototype.add = function(t, r) {
    var d = t.freq, n = t.interval, s = t.wkst, _ = t.byhour, a = t.byminute, o = t.bysecond;
    switch (d) {
      case P.YEARLY:
        return this.addYears(n);
      case P.MONTHLY:
        return this.addMonths(n);
      case P.WEEKLY:
        return this.addWeekly(n, s);
      case P.DAILY:
        return this.addDaily(n);
      case P.HOURLY:
        return this.addHours(n, r, _);
      case P.MINUTELY:
        return this.addMinutes(n, r, _, a);
      case P.SECONDLY:
        return this.addSeconds(n, r, _, a, o);
    }
  }, i;
}(we);
function Et(e) {
  for (var i = [], t = 0, r = Object.keys(e); t < r.length; t++) {
    var d = r[t];
    R(un, d) || i.push(d), bt(e[d]) && !ye(e[d]) && i.push(d);
  }
  if (i.length)
    throw new Error("Invalid options: " + i.join(", "));
  return X({}, e);
}
function Va(e) {
  var i = X(X({}, Je), Et(e));
  if (U(i.byeaster) && (i.freq = C.YEARLY), !U(i.freq) || !C.FREQUENCIES[i.freq])
    throw new Error("Invalid frequency: ".concat(i.freq, " ").concat(e.freq));
  if (i.dtstart || (i.dtstart = new Date((/* @__PURE__ */ new Date()).setMilliseconds(0))), U(i.wkst) ? te(i.wkst) || (i.wkst = i.wkst.weekday) : i.wkst = C.MO.weekday, U(i.bysetpos)) {
    te(i.bysetpos) && (i.bysetpos = [i.bysetpos]);
    for (var t = 0; t < i.bysetpos.length; t++)
      if ((n = i.bysetpos[t]) === 0 || !(n >= -366 && n <= 366))
        throw new Error("bysetpos must be between 1 and 366, or between -366 and -1");
  }
  if (!(i.byweekno || F(i.byweekno) || F(i.byyearday) || i.bymonthday || F(i.bymonthday) || U(i.byweekday) || U(i.byeaster)))
    switch (i.freq) {
      case C.YEARLY:
        i.bymonth || (i.bymonth = i.dtstart.getUTCMonth() + 1), i.bymonthday = i.dtstart.getUTCDate();
        break;
      case C.MONTHLY:
        i.bymonthday = i.dtstart.getUTCDate();
        break;
      case C.WEEKLY:
        i.byweekday = [me(i.dtstart)];
    }
  if (U(i.bymonth) && !G(i.bymonth) && (i.bymonth = [i.bymonth]), U(i.byyearday) && !G(i.byyearday) && te(i.byyearday) && (i.byyearday = [i.byyearday]), U(i.bymonthday))
    if (G(i.bymonthday)) {
      var r = [], d = [];
      for (t = 0; t < i.bymonthday.length; t++) {
        var n;
        (n = i.bymonthday[t]) > 0 ? r.push(n) : n < 0 && d.push(n);
      }
      i.bymonthday = r, i.bynmonthday = d;
    } else
      i.bymonthday < 0 ? (i.bynmonthday = [i.bymonthday], i.bymonthday = []) : (i.bynmonthday = [], i.bymonthday = [i.bymonthday]);
  else
    i.bymonthday = [], i.bynmonthday = [];
  if (U(i.byweekno) && !G(i.byweekno) && (i.byweekno = [i.byweekno]), U(i.byweekday))
    if (te(i.byweekday))
      i.byweekday = [i.byweekday], i.bynweekday = null;
    else if (Ge(i.byweekday))
      i.byweekday = [K.fromStr(i.byweekday).weekday], i.bynweekday = null;
    else if (i.byweekday instanceof K)
      !i.byweekday.n || i.freq > C.MONTHLY ? (i.byweekday = [i.byweekday.weekday], i.bynweekday = null) : (i.bynweekday = [[i.byweekday.weekday, i.byweekday.n]], i.byweekday = null);
    else {
      var s = [], _ = [];
      for (t = 0; t < i.byweekday.length; t++) {
        var a = i.byweekday[t];
        te(a) ? s.push(a) : Ge(a) ? s.push(K.fromStr(a).weekday) : !a.n || i.freq > C.MONTHLY ? s.push(a.weekday) : _.push([a.weekday, a.n]);
      }
      i.byweekday = F(s) ? s : null, i.bynweekday = F(_) ? _ : null;
    }
  else
    i.bynweekday = null;
  return U(i.byhour) ? te(i.byhour) && (i.byhour = [i.byhour]) : i.byhour = i.freq < C.HOURLY ? [i.dtstart.getUTCHours()] : null, U(i.byminute) ? te(i.byminute) && (i.byminute = [i.byminute]) : i.byminute = i.freq < C.MINUTELY ? [i.dtstart.getUTCMinutes()] : null, U(i.bysecond) ? te(i.bysecond) && (i.bysecond = [i.bysecond]) : i.bysecond = i.freq < C.SECONDLY ? [i.dtstart.getUTCSeconds()] : null, { parsedOptions: i };
}
function Ie(e) {
  var i = e.split(`
`).map(Fa).filter(function(t) {
    return t !== null;
  });
  return X(X({}, i[0]), i[1]);
}
function Ee(e) {
  var i = {}, t = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(e);
  if (!t)
    return i;
  var r = t[1], d = t[2];
  return r && (i.tzid = r), i.dtstart = Fe(d), i;
}
function Fa(e) {
  if (!(e = e.replace(/^\s+|\s+$/, "")).length)
    return null;
  var i = /^([A-Z]+?)[:;]/.exec(e.toUpperCase());
  if (!i)
    return at(e);
  var t = i[1];
  switch (t.toUpperCase()) {
    case "RRULE":
    case "EXRULE":
      return at(e);
    case "DTSTART":
      return Ee(e);
    default:
      throw new Error("Unsupported RFC prop ".concat(t, " in ").concat(e));
  }
}
function at(e) {
  var i = Ee(e.replace(/^RRULE:/i, ""));
  return e.replace(/^(?:RRULE|EXRULE):/i, "").split(";").forEach(function(t) {
    var r = t.split("="), d = r[0], n = r[1];
    switch (d.toUpperCase()) {
      case "FREQ":
        i.freq = P[n.toUpperCase()];
        break;
      case "WKST":
        i.wkst = Q[n.toUpperCase()];
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
        var s = function(o) {
          return o.indexOf(",") !== -1 ? o.split(",").map(nt) : nt(o);
        }(n), _ = d.toLowerCase();
        i[_] = s;
        break;
      case "BYWEEKDAY":
      case "BYDAY":
        i.byweekday = function(o) {
          var l = o.split(",");
          return l.map(function(h) {
            if (h.length === 2)
              return Q[h];
            var m = h.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
            if (!m || m.length < 3)
              throw new SyntaxError("Invalid weekday string: ".concat(h));
            var v = Number(m[1]), u = m[2], c = Q[u].weekday;
            return new K(c, v);
          });
        }(n);
        break;
      case "DTSTART":
      case "TZID":
        var a = Ee(e);
        i.tzid = a.tzid, i.dtstart = a.dtstart;
        break;
      case "UNTIL":
        i.until = Fe(n);
        break;
      case "BYEASTER":
        i.byeaster = Number(n);
        break;
      default:
        throw new Error("Unknown RRULE property '" + d + "'");
    }
  }), i;
}
function nt(e) {
  return /^[+-]?\d+$/.test(e) ? Number(e) : e;
}
var De = function() {
  function e(i, t) {
    if (isNaN(i.getTime()))
      throw new RangeError("Invalid date passed to DateWithZone");
    this.date = i, this.tzid = t;
  }
  return Object.defineProperty(e.prototype, "isUTC", { get: function() {
    return !this.tzid || this.tzid.toUpperCase() === "UTC";
  }, enumerable: !1, configurable: !0 }), e.prototype.toString = function() {
    var i = Ve(this.date.getTime(), this.isUTC);
    return this.isUTC ? ":".concat(i) : ";TZID=".concat(this.tzid, ":").concat(i);
  }, e.prototype.getTime = function() {
    return this.date.getTime();
  }, e.prototype.rezonedDate = function() {
    return this.isUTC ? this.date : (i = this.date, t = this.tzid, r = Intl.DateTimeFormat().resolvedOptions().timeZone, d = new Date(Qe(i, r)), n = new Date(Qe(i, t ?? "UTC")).getTime() - d.getTime(), new Date(i.getTime() - n));
    var i, t, r, d, n;
  }, e;
}();
function Pe(e) {
  for (var i, t = [], r = "", d = Object.keys(e), n = Object.keys(Je), s = 0; s < d.length; s++)
    if (d[s] !== "tzid" && R(n, d[s])) {
      var _ = d[s].toUpperCase(), a = e[d[s]], o = "";
      if (U(a) && (!G(a) || a.length)) {
        switch (_) {
          case "FREQ":
            o = C.FREQUENCIES[e.freq];
            break;
          case "WKST":
            o = te(a) ? new K(a).toString() : a.toString();
            break;
          case "BYWEEKDAY":
            _ = "BYDAY", o = (i = a, G(i) ? i : [i]).map(function(u) {
              return u instanceof K ? u : G(u) ? new K(u[0], u[1]) : new K(u);
            }).toString();
            break;
          case "DTSTART":
            r = Ba(a, e.tzid);
            break;
          case "UNTIL":
            o = Ve(a, !e.tzid);
            break;
          default:
            if (G(a)) {
              for (var l = [], h = 0; h < a.length; h++)
                l[h] = String(a[h]);
              o = l.toString();
            } else
              o = String(a);
        }
        o && t.push([_, o]);
      }
    }
  var m = t.map(function(u) {
    var c = u[0], f = u[1];
    return "".concat(c, "=").concat(f.toString());
  }).join(";"), v = "";
  return m !== "" && (v = "RRULE:".concat(m)), [r, v].filter(function(u) {
    return !!u;
  }).join(`
`);
}
function Ba(e, i) {
  return e ? "DTSTART" + new De(new Date(e), i).toString() : "";
}
function Ja(e, i) {
  return Array.isArray(e) ? !!Array.isArray(i) && e.length === i.length && e.every(function(t, r) {
    return t.getTime() === i[r].getTime();
  }) : e instanceof Date ? i instanceof Date && e.getTime() === i.getTime() : e === i;
}
var Wa = function() {
  function e() {
    this.all = !1, this.before = [], this.after = [], this.between = [];
  }
  return e.prototype._cacheAdd = function(i, t, r) {
    t && (t = t instanceof Date ? qe(t) : Ze(t)), i === "all" ? this.all = t : (r._value = t, this[i].push(r));
  }, e.prototype._cacheGet = function(i, t) {
    var r = !1, d = t ? Object.keys(t) : [], n = function(l) {
      for (var h = 0; h < d.length; h++) {
        var m = d[h];
        if (!Ja(t[m], l[m]))
          return !0;
      }
      return !1;
    }, s = this[i];
    if (i === "all")
      r = this.all;
    else if (G(s))
      for (var _ = 0; _ < s.length; _++) {
        var a = s[_];
        if (!d.length || !n(a)) {
          r = a._value;
          break;
        }
      }
    if (!r && this.all) {
      var o = new pe(i, t);
      for (_ = 0; _ < this.all.length && o.accept(this.all[_]); _++)
        ;
      r = o.getValue(), this._cacheAdd(i, r, t);
    }
    return G(r) ? Ze(r) : r instanceof Date ? qe(r) : r;
  }, e;
}(), Ka = O(O(O(O(O(O(O(O(O(O(O(O(O([], I(1, 31), !0), I(2, 28), !0), I(3, 31), !0), I(4, 30), !0), I(5, 31), !0), I(6, 30), !0), I(7, 31), !0), I(8, 31), !0), I(9, 30), !0), I(10, 31), !0), I(11, 30), !0), I(12, 31), !0), I(1, 7), !0), Ga = O(O(O(O(O(O(O(O(O(O(O(O(O([], I(1, 31), !0), I(2, 29), !0), I(3, 31), !0), I(4, 30), !0), I(5, 31), !0), I(6, 30), !0), I(7, 31), !0), I(8, 31), !0), I(9, 30), !0), I(10, 31), !0), I(11, 30), !0), I(12, 31), !0), I(1, 7), !0), Xa = ne(1, 29), Za = ne(1, 30), le = ne(1, 31), B = ne(1, 32), Qa = O(O(O(O(O(O(O(O(O(O(O(O(O([], B, !0), Za, !0), B, !0), le, !0), B, !0), le, !0), B, !0), B, !0), le, !0), B, !0), le, !0), B, !0), B.slice(0, 7), !0), en = O(O(O(O(O(O(O(O(O(O(O(O(O([], B, !0), Xa, !0), B, !0), le, !0), B, !0), le, !0), B, !0), B, !0), le, !0), B, !0), le, !0), B, !0), B.slice(0, 7), !0), tn = ne(-28, 0), an = ne(-29, 0), ce = ne(-30, 0), J = ne(-31, 0), nn = O(O(O(O(O(O(O(O(O(O(O(O(O([], J, !0), an, !0), J, !0), ce, !0), J, !0), ce, !0), J, !0), J, !0), ce, !0), J, !0), ce, !0), J, !0), J.slice(0, 7), !0), rn = O(O(O(O(O(O(O(O(O(O(O(O(O([], J, !0), tn, !0), J, !0), ce, !0), J, !0), ce, !0), J, !0), J, !0), ce, !0), J, !0), ce, !0), J, !0), J.slice(0, 7), !0), on = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366], sn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], rt = function() {
  for (var e = [], i = 0; i < 55; i++)
    e = e.concat(ne(7));
  return e;
}();
function dn(e, i) {
  var t, r, d = he(e, 1, 1), n = ge(e) ? 366 : 365, s = ge(e + 1) ? 366 : 365, _ = ze(d), a = me(d), o = X(X({ yearlen: n, nextyearlen: s, yearordinal: _, yearweekday: a }, function(w) {
    var D = ge(w) ? 366 : 365, E = he(w, 1, 1), S = me(E);
    return D === 365 ? { mmask: Ka, mdaymask: en, nmdaymask: rn, wdaymask: rt.slice(S), mrange: sn } : { mmask: Ga, mdaymask: Qa, nmdaymask: nn, wdaymask: rt.slice(S), mrange: on };
  }(e)), { wnomask: null });
  if (ae(i.byweekno))
    return o;
  o.wnomask = I(0, n + 7);
  var l = t = Z(7 - a + i.wkst, 7);
  l >= 4 ? (l = 0, r = o.yearlen + Z(a - i.wkst, 7)) : r = n - l;
  for (var h = Math.floor(r / 7), m = Z(r, 7), v = Math.floor(h + m / 4), u = 0; u < i.byweekno.length; u++) {
    var c = i.byweekno[u];
    if (c < 0 && (c += v + 1), c > 0 && c <= v) {
      var f = void 0;
      c > 1 ? (f = l + 7 * (c - 1), l !== t && (f -= 7 - t)) : f = l;
      for (var p = 0; p < 7 && (o.wnomask[f] = 1, f++, o.wdaymask[f] !== i.wkst); p++)
        ;
    }
  }
  if (R(i.byweekno, 1) && (f = l + 7 * v, l !== t && (f -= 7 - t), f < n))
    for (u = 0; u < 7 && (o.wnomask[f] = 1, f += 1, o.wdaymask[f] !== i.wkst); u++)
      ;
  if (l) {
    var g = void 0;
    if (R(i.byweekno, -1))
      g = -1;
    else {
      var y = me(he(e - 1, 1, 1)), x = Z(7 - y.valueOf() + i.wkst, 7), b = ge(e - 1) ? 366 : 365, k = void 0;
      x >= 4 ? (x = 0, k = b + Z(y - i.wkst, 7)) : k = n - l, g = Math.floor(52 + Z(k, 7) / 4);
    }
    if (R(i.byweekno, g))
      for (f = 0; f < l; f++)
        o.wnomask[f] = 1;
  }
  return o;
}
var _n = function() {
  function e(i) {
    this.options = i;
  }
  return e.prototype.rebuild = function(i, t) {
    var r = this.options;
    if (i !== this.lastyear && (this.yearinfo = dn(i, r)), F(r.bynweekday) && (t !== this.lastmonth || i !== this.lastyear)) {
      var d = this.yearinfo, n = d.yearlen, s = d.mrange, _ = d.wdaymask;
      this.monthinfo = function(a, o, l, h, m, v) {
        var u = { lastyear: a, lastmonth: o, nwdaymask: [] }, c = [];
        if (v.freq === C.YEARLY)
          if (ae(v.bymonth))
            c = [[0, l]];
          else
            for (var f = 0; f < v.bymonth.length; f++)
              o = v.bymonth[f], c.push(h.slice(o - 1, o + 1));
        else
          v.freq === C.MONTHLY && (c = [h.slice(o - 1, o + 1)]);
        if (ae(c))
          return u;
        for (u.nwdaymask = I(0, l), f = 0; f < c.length; f++)
          for (var p = c[f], g = p[0], y = p[1] - 1, x = 0; x < v.bynweekday.length; x++) {
            var b = void 0, k = v.bynweekday[x], w = k[0], D = k[1];
            D < 0 ? (b = y + 7 * (D + 1), b -= Z(m[b] - w, 7)) : (b = g + 7 * (D - 1), b += Z(7 - m[b] + w, 7)), g <= b && b <= y && (u.nwdaymask[b] = 1);
          }
        return u;
      }(i, t, n, s, _, r);
    }
    U(r.byeaster) && (this.eastermask = function(a, o) {
      o === void 0 && (o = 0);
      var l = a % 19, h = Math.floor(a / 100), m = a % 100, v = Math.floor(h / 4), u = h % 4, c = Math.floor((h + 8) / 25), f = Math.floor((h - c + 1) / 3), p = Math.floor(19 * l + h - v - f + 15) % 30, g = Math.floor(m / 4), y = m % 4, x = Math.floor(32 + 2 * u + 2 * g - p - y) % 7, b = Math.floor((l + 11 * p + 22 * x) / 451), k = Math.floor((p + x - 7 * b + 114) / 31), w = (p + x - 7 * b + 114) % 31 + 1, D = Date.UTC(a, k - 1, w + o), E = Date.UTC(a, 0, 1);
      return [Math.ceil((D - E) / 864e5)];
    }(i, r.byeaster));
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
    return [ne(this.yearlen), 0, this.yearlen];
  }, e.prototype.mdayset = function(i, t) {
    for (var r = this.mrange[t - 1], d = this.mrange[t], n = I(null, this.yearlen), s = r; s < d; s++)
      n[s] = s;
    return [n, r, d];
  }, e.prototype.wdayset = function(i, t, r) {
    for (var d = I(null, this.yearlen + 7), n = ze(he(i, t, r)) - this.yearordinal, s = n, _ = 0; _ < 7 && (d[n] = n, ++n, this.wdaymask[n] !== this.options.wkst); _++)
      ;
    return [d, s, n];
  }, e.prototype.ddayset = function(i, t, r) {
    var d = I(null, this.yearlen), n = ze(he(i, t, r)) - this.yearordinal;
    return d[n] = n, [d, n, n + 1];
  }, e.prototype.htimeset = function(i, t, r, d) {
    var n = this, s = [];
    return this.options.byminute.forEach(function(_) {
      s = s.concat(n.mtimeset(i, _, r, d));
    }), be(s), s;
  }, e.prototype.mtimeset = function(i, t, r, d) {
    var n = this.options.bysecond.map(function(s) {
      return new we(i, t, s, d);
    });
    return be(n), n;
  }, e.prototype.stimeset = function(i, t, r, d) {
    return [new we(i, t, r, d)];
  }, e.prototype.getdayset = function(i) {
    switch (i) {
      case P.YEARLY:
        return this.ydayset.bind(this);
      case P.MONTHLY:
        return this.mdayset.bind(this);
      case P.WEEKLY:
        return this.wdayset.bind(this);
      case P.DAILY:
      default:
        return this.ddayset.bind(this);
    }
  }, e.prototype.gettimeset = function(i) {
    switch (i) {
      case P.HOURLY:
        return this.htimeset.bind(this);
      case P.MINUTELY:
        return this.mtimeset.bind(this);
      case P.SECONDLY:
        return this.stimeset.bind(this);
    }
  }, e;
}();
function ln(e, i, t, r, d, n) {
  for (var s = [], _ = 0; _ < e.length; _++) {
    var a = void 0, o = void 0, l = e[_];
    l < 0 ? (a = Math.floor(l / i.length), o = Z(l, i.length)) : (a = Math.floor((l - 1) / i.length), o = Z(l - 1, i.length));
    for (var h = [], m = t; m < r; m++) {
      var v = n[m];
      U(v) && h.push(v);
    }
    var u = void 0;
    u = a < 0 ? h.slice(a)[0] : h[a];
    var c = i[o], f = xt(d.yearordinal + u), p = kt(f, c);
    R(s, p) || s.push(p);
  }
  return be(s), s;
}
function Dt(e, i) {
  var t = i.dtstart, r = i.freq, d = i.interval, n = i.until, s = i.bysetpos, _ = i.count;
  if (_ === 0 || d === 0)
    return re(e);
  var a = Ua.fromDate(t), o = new _n(i);
  o.rebuild(a.year, a.month);
  for (var l = function(D, E, S) {
    var N = S.freq, M = S.byhour, T = S.byminute, A = S.bysecond;
    return Ce(N) ? function(H) {
      var $ = H.dtstart.getTime() % 1e3;
      if (!Ce(H.freq))
        return [];
      var j = [];
      return H.byhour.forEach(function(z) {
        H.byminute.forEach(function(W) {
          H.bysecond.forEach(function(Y) {
            j.push(new we(z, W, Y, $));
          });
        });
      }), j;
    }(S) : N >= C.HOURLY && F(M) && !R(M, E.hour) || N >= C.MINUTELY && F(T) && !R(T, E.minute) || N >= C.SECONDLY && F(A) && !R(A, E.second) ? [] : D.gettimeset(N)(E.hour, E.minute, E.second, E.millisecond);
  }(o, a, i); ; ) {
    var h = o.getdayset(r)(a.year, a.month, a.day), m = h[0], v = h[1], u = h[2], c = hn(m, v, u, o, i);
    if (F(s))
      for (var f = ln(s, l, v, u, o, m), p = 0; p < f.length; p++) {
        var g = f[p];
        if (n && g > n)
          return re(e);
        if (g >= t) {
          var y = it(g, i);
          if (!e.accept(y) || _ && !--_)
            return re(e);
        }
      }
    else
      for (p = v; p < u; p++) {
        var x = m[p];
        if (U(x))
          for (var b = xt(o.yearordinal + x), k = 0; k < l.length; k++) {
            var w = l[k];
            if (g = kt(b, w), n && g > n || g >= t && (y = it(g, i), !e.accept(y) || _ && !--_))
              return re(e);
          }
      }
    if (i.interval === 0 || (a.add(i, c), a.year > gt))
      return re(e);
    Ce(r) || (l = o.gettimeset(r)(a.hour, a.minute, a.second, 0)), o.rebuild(a.year, a.month);
  }
}
function cn(e, i, t) {
  var r = t.bymonth, d = t.byweekno, n = t.byweekday, s = t.byeaster, _ = t.bymonthday, a = t.bynmonthday, o = t.byyearday;
  return F(r) && !R(r, e.mmask[i]) || F(d) && !e.wnomask[i] || F(n) && !R(n, e.wdaymask[i]) || F(e.nwdaymask) && !e.nwdaymask[i] || s !== null && !R(e.eastermask, i) || (F(_) || F(a)) && !R(_, e.mdaymask[i]) && !R(a, e.nmdaymask[i]) || F(o) && (i < e.yearlen && !R(o, i + 1) && !R(o, -e.yearlen + i) || i >= e.yearlen && !R(o, i + 1 - e.yearlen) && !R(o, -e.nextyearlen + i - e.yearlen));
}
function it(e, i) {
  return new De(e, i.tzid).rezonedDate();
}
function re(e) {
  return e.getValue();
}
function hn(e, i, t, r, d) {
  for (var n = !1, s = i; s < t; s++) {
    var _ = e[s];
    (n = cn(r, _, d)) && (e[_] = null);
  }
  return n;
}
var Q = { MO: new K(0), TU: new K(1), WE: new K(2), TH: new K(3), FR: new K(4), SA: new K(5), SU: new K(6) }, Je = { freq: P.YEARLY, dtstart: null, interval: 1, wkst: Q.MO, count: null, until: null, tzid: null, bysetpos: null, bymonth: null, bymonthday: null, bynmonthday: null, byyearday: null, byweekno: null, byweekday: null, bynweekday: null, byhour: null, byminute: null, bysecond: null, byeaster: null }, un = Object.keys(Je), C = function() {
  function e(i, t) {
    i === void 0 && (i = {}), t === void 0 && (t = !1), this._cache = t ? null : new Wa(), this.origOptions = Et(i);
    var r = Va(i).parsedOptions;
    this.options = r;
  }
  return e.parseText = function(i, t) {
    return wt(i, t);
  }, e.fromText = function(i, t) {
    return Ra(i, t);
  }, e.fromString = function(i) {
    return new e(e.parseString(i) || void 0);
  }, e.prototype._iter = function(i) {
    return Dt(i, this.options);
  }, e.prototype._cacheGet = function(i, t) {
    return !!this._cache && this._cache._cacheGet(i, t);
  }, e.prototype._cacheAdd = function(i, t, r) {
    if (this._cache)
      return this._cache._cacheAdd(i, t, r);
  }, e.prototype.all = function(i) {
    if (i)
      return this._iter(new et("all", {}, i));
    var t = this._cacheGet("all");
    return t === !1 && (t = this._iter(new pe("all", {})), this._cacheAdd("all", t)), t;
  }, e.prototype.between = function(i, t, r, d) {
    if (r === void 0 && (r = !1), !ye(i) || !ye(t))
      throw new Error("Invalid date passed in to RRule.between");
    var n = { before: t, after: i, inc: r };
    if (d)
      return this._iter(new et("between", n, d));
    var s = this._cacheGet("between", n);
    return s === !1 && (s = this._iter(new pe("between", n)), this._cacheAdd("between", s, n)), s;
  }, e.prototype.before = function(i, t) {
    if (t === void 0 && (t = !1), !ye(i))
      throw new Error("Invalid date passed in to RRule.before");
    var r = { dt: i, inc: t }, d = this._cacheGet("before", r);
    return d === !1 && (d = this._iter(new pe("before", r)), this._cacheAdd("before", d, r)), d;
  }, e.prototype.after = function(i, t) {
    if (t === void 0 && (t = !1), !ye(i))
      throw new Error("Invalid date passed in to RRule.after");
    var r = { dt: i, inc: t }, d = this._cacheGet("after", r);
    return d === !1 && (d = this._iter(new pe("after", r)), this._cacheAdd("after", d, r)), d;
  }, e.prototype.count = function() {
    return this.all().length;
  }, e.prototype.toString = function() {
    return Pe(this.origOptions);
  }, e.prototype.toText = function(i, t, r) {
    return function(d, n, s, _) {
      return new ie(d, n, s, _).toString();
    }(this, i, t, r);
  }, e.prototype.isFullyConvertibleToText = function() {
    return Ya(this);
  }, e.prototype.clone = function() {
    return new e(this.origOptions);
  }, e.FREQUENCIES = ["YEARLY", "MONTHLY", "WEEKLY", "DAILY", "HOURLY", "MINUTELY", "SECONDLY"], e.YEARLY = P.YEARLY, e.MONTHLY = P.MONTHLY, e.WEEKLY = P.WEEKLY, e.DAILY = P.DAILY, e.HOURLY = P.HOURLY, e.MINUTELY = P.MINUTELY, e.SECONDLY = P.SECONDLY, e.MO = Q.MO, e.TU = Q.TU, e.WE = Q.WE, e.TH = Q.TH, e.FR = Q.FR, e.SA = Q.SA, e.SU = Q.SU, e.parseString = Ie, e.optionsToString = Pe, e;
}(), ot = { dtstart: null, cache: !1, unfold: !1, forceset: !1, compatible: !1, tzid: null };
function fn(e, i) {
  var t = [], r = [], d = [], n = [], s = Ee(e), _ = s.dtstart, a = s.tzid, o = function(l, h) {
    if (h === void 0 && (h = !1), l = l && l.trim(), !l)
      throw new Error("Invalid empty string");
    if (!h)
      return l.split(/\s/);
    for (var m = l.split(`
`), v = 0; v < m.length; ) {
      var u = m[v] = m[v].replace(/\s+$/g, "");
      u ? v > 0 && u[0] === " " ? (m[v - 1] += u.slice(1), m.splice(v, 1)) : v += 1 : m.splice(v, 1);
    }
    return m;
  }(e, i.unfold);
  return o.forEach(function(l) {
    var h;
    if (l) {
      var m = function(p) {
        var g = function(k) {
          if (k.indexOf(":") === -1)
            return { name: "RRULE", value: k };
          var w = Ha(k, ":", 1), D = w[0], E = w[1];
          return { name: D, value: E };
        }(p), y = g.name, x = g.value, b = y.split(";");
        if (!b)
          throw new Error("empty property name");
        return { name: b[0].toUpperCase(), parms: b.slice(1), value: x };
      }(l), v = m.name, u = m.parms, c = m.value;
      switch (v.toUpperCase()) {
        case "RRULE":
          if (u.length)
            throw new Error("unsupported RRULE parm: ".concat(u.join(",")));
          t.push(Ie(l));
          break;
        case "RDATE":
          var f = ((h = /RDATE(?:;TZID=([^:=]+))?/i.exec(l)) !== null && h !== void 0 ? h : [])[1];
          f && !a && (a = f), r = r.concat(st(c, u));
          break;
        case "EXRULE":
          if (u.length)
            throw new Error("unsupported EXRULE parm: ".concat(u.join(",")));
          d.push(Ie(c));
          break;
        case "EXDATE":
          n = n.concat(st(c, u));
          break;
        case "DTSTART":
          break;
        default:
          throw new Error("unsupported property: " + v);
      }
    }
  }), { dtstart: _, tzid: a, rrulevals: t, rdatevals: r, exrulevals: d, exdatevals: n };
}
function Se(e, i) {
  return i === void 0 && (i = {}), function(t, r) {
    var d = fn(t, r), n = d.rrulevals, s = d.rdatevals, _ = d.exrulevals, a = d.exdatevals, o = d.dtstart, l = d.tzid, h = r.cache === !1;
    if (r.compatible && (r.forceset = !0, r.unfold = !0), r.forceset || n.length > 1 || s.length || _.length || a.length) {
      var m = new pn(h);
      return m.dtstart(o), m.tzid(l || void 0), n.forEach(function(u) {
        m.rrule(new C(Oe(u, o, l), h));
      }), s.forEach(function(u) {
        m.rdate(u);
      }), _.forEach(function(u) {
        m.exrule(new C(Oe(u, o, l), h));
      }), a.forEach(function(u) {
        m.exdate(u);
      }), r.compatible && r.dtstart && m.rdate(o), m;
    }
    var v = n[0] || {};
    return new C(Oe(v, v.dtstart || r.dtstart || o, v.tzid || r.tzid || l), h);
  }(e, function(t) {
    var r = [], d = Object.keys(t), n = Object.keys(ot);
    if (d.forEach(function(s) {
      R(n, s) || r.push(s);
    }), r.length)
      throw new Error("Invalid options: " + r.join(", "));
    return X(X({}, ot), t);
  }(i));
}
function Oe(e, i, t) {
  return X(X({}, e), { dtstart: i, tzid: t });
}
function st(e, i) {
  return function(t) {
    t.forEach(function(r) {
      if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(r))
        throw new Error("unsupported RDATE/EXDATE parm: " + r);
    });
  }(i), e.split(",").map(function(t) {
    return Fe(t);
  });
}
function dt(e) {
  var i = this;
  return function(t) {
    if (t !== void 0 && (i["_".concat(e)] = t), i["_".concat(e)] !== void 0)
      return i["_".concat(e)];
    for (var r = 0; r < i._rrule.length; r++) {
      var d = i._rrule[r].origOptions[e];
      if (d)
        return d;
    }
  };
}
var pn = function(e) {
  function i(t) {
    t === void 0 && (t = !1);
    var r = e.call(this, {}, t) || this;
    return r.dtstart = dt.apply(r, ["dtstart"]), r.tzid = dt.apply(r, ["tzid"]), r._rrule = [], r._rdate = [], r._exrule = [], r._exdate = [], r;
  }
  return Be(i, e), i.prototype._iter = function(t) {
    return function(r, d, n, s, _, a) {
      var o = {}, l = r.accept;
      function h(c, f) {
        n.forEach(function(p) {
          p.between(c, f, !0).forEach(function(g) {
            o[Number(g)] = !0;
          });
        });
      }
      _.forEach(function(c) {
        var f = new De(c, a).rezonedDate();
        o[Number(f)] = !0;
      }), r.accept = function(c) {
        var f = Number(c);
        return isNaN(f) ? l.call(this, c) : !(!o[f] && (h(new Date(f - 1), new Date(f + 1)), !o[f])) || (o[f] = !0, l.call(this, c));
      }, r.method === "between" && (h(r.args.after, r.args.before), r.accept = function(c) {
        var f = Number(c);
        return !!o[f] || (o[f] = !0, l.call(this, c));
      });
      for (var m = 0; m < s.length; m++) {
        var v = new De(s[m], a).rezonedDate();
        if (!r.accept(new Date(v.getTime())))
          break;
      }
      d.forEach(function(c) {
        Dt(r, c.options);
      });
      var u = r._result;
      switch (be(u), r.method) {
        case "all":
        case "between":
          return u;
        case "before":
          return u.length && u[u.length - 1] || null;
        default:
          return u.length && u[0] || null;
      }
    }(t, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
  }, i.prototype.rrule = function(t) {
    _t(t, this._rrule);
  }, i.prototype.exrule = function(t) {
    _t(t, this._exrule);
  }, i.prototype.rdate = function(t) {
    lt(t, this._rdate);
  }, i.prototype.exdate = function(t) {
    lt(t, this._exdate);
  }, i.prototype.rrules = function() {
    return this._rrule.map(function(t) {
      return Se(t.toString());
    });
  }, i.prototype.exrules = function() {
    return this._exrule.map(function(t) {
      return Se(t.toString());
    });
  }, i.prototype.rdates = function() {
    return this._rdate.map(function(t) {
      return new Date(t.getTime());
    });
  }, i.prototype.exdates = function() {
    return this._exdate.map(function(t) {
      return new Date(t.getTime());
    });
  }, i.prototype.valueOf = function() {
    var t = [];
    return !this._rrule.length && this._dtstart && (t = t.concat(Pe({ dtstart: this._dtstart }))), this._rrule.forEach(function(r) {
      t = t.concat(r.toString().split(`
`));
    }), this._exrule.forEach(function(r) {
      t = t.concat(r.toString().split(`
`).map(function(d) {
        return d.replace(/^RRULE:/, "EXRULE:");
      }).filter(function(d) {
        return !/^DTSTART/.test(d);
      }));
    }), this._rdate.length && t.push(ct("RDATE", this._rdate, this.tzid())), this._exdate.length && t.push(ct("EXDATE", this._exdate, this.tzid())), t;
  }, i.prototype.toString = function() {
    return this.valueOf().join(`
`);
  }, i.prototype.clone = function() {
    var t = new i(!!this._cache);
    return this._rrule.forEach(function(r) {
      return t.rrule(r.clone());
    }), this._exrule.forEach(function(r) {
      return t.exrule(r.clone());
    }), this._rdate.forEach(function(r) {
      return t.rdate(new Date(r.getTime()));
    }), this._exdate.forEach(function(r) {
      return t.exdate(new Date(r.getTime()));
    }), t;
  }, i;
}(C);
function _t(e, i) {
  if (!(e instanceof C))
    throw new TypeError(String(e) + " is not RRule instance");
  R(i.map(String), String(e)) || i.push(e);
}
function lt(e, i) {
  if (!(e instanceof Date))
    throw new TypeError(String(e) + " is not Date instance");
  R(i.map(Number), Number(e)) || (i.push(e), be(i));
}
function ct(e, i, t) {
  var r = !t || t.toUpperCase() === "UTC", d = r ? "".concat(e, ":") : "".concat(e, ";TZID=").concat(t, ":"), n = i.map(function(s) {
    return Ve(s.valueOf(), r);
  }).join(",");
  return "".concat(d).concat(n);
}
class mn {
  constructor(i) {
    this._scheduler = i;
  }
  getNode() {
    const i = this._scheduler;
    return this._tooltipNode || (this._tooltipNode = document.createElement("div"), this._tooltipNode.className = "dhtmlXTooltip scheduler_tooltip tooltip", i._waiAria.tooltipAttr(this._tooltipNode)), i.config.rtl ? this._tooltipNode.classList.add("dhtmlXTooltip_rtl") : this._tooltipNode.classList.remove("dhtmlXTooltip_rtl"), this._tooltipNode;
  }
  setViewport(i) {
    return this._root = i, this;
  }
  show(i, t) {
    const r = this._scheduler, d = r.$domHelpers, n = document.body, s = this.getNode();
    if (d.isChildOf(s, n) || (this.hide(), n.appendChild(s)), this._isLikeMouseEvent(i)) {
      const _ = this._calculateTooltipPosition(i);
      t = _.top, i = _.left;
    }
    return s.style.top = t + "px", s.style.left = i + "px", r._waiAria.tooltipVisibleAttr(s), this;
  }
  hide() {
    const i = this._scheduler, t = this.getNode();
    return t && t.parentNode && t.parentNode.removeChild(t), i._waiAria.tooltipHiddenAttr(t), this;
  }
  setContent(i) {
    return this.getNode().innerHTML = i, this;
  }
  _isLikeMouseEvent(i) {
    return !(!i || typeof i != "object") && "clientX" in i && "clientY" in i;
  }
  _getViewPort() {
    return this._root || document.body;
  }
  _calculateTooltipPosition(i) {
    const t = this._scheduler, r = t.$domHelpers, d = this._getViewPortSize(), n = this.getNode(), s = { top: 0, left: 0, width: n.offsetWidth, height: n.offsetHeight, bottom: 0, right: 0 }, _ = t.config.tooltip_offset_x, a = t.config.tooltip_offset_y, o = document.body, l = r.getRelativeEventPosition(i, o), h = r.getNodePosition(o);
    l.y += h.y, s.top = l.y, s.left = l.x, s.top += a, s.left += _, s.bottom = s.top + s.height, s.right = s.left + s.width;
    const m = window.scrollY + o.scrollTop;
    return s.top < d.top - m ? (s.top = d.top, s.bottom = s.top + s.height) : s.bottom > d.bottom && (s.bottom = d.bottom, s.top = s.bottom - s.height), s.left < d.left ? (s.left = d.left, s.right = d.left + s.width) : s.right > d.right && (s.right = d.right, s.left = s.right - s.width), l.x >= s.left && l.x <= s.right && (s.left = l.x - s.width - _, s.right = s.left + s.width), l.y >= s.top && l.y <= s.bottom && (s.top = l.y - s.height - a, s.bottom = s.top + s.height), s;
  }
  _getViewPortSize() {
    const i = this._scheduler, t = i.$domHelpers, r = this._getViewPort();
    let d, n = r, s = window.scrollY + document.body.scrollTop, _ = window.scrollX + document.body.scrollLeft;
    return r === i.$event_data ? (n = i.$event, s = 0, _ = 0, d = t.getNodePosition(i.$event)) : d = t.getNodePosition(n), { left: d.x + _, top: d.y + s, width: d.width, height: d.height, bottom: d.y + d.height + s, right: d.x + d.width + _ };
  }
}
class vn {
  constructor(i) {
    this._listeners = {}, this.tooltip = new mn(i), this._scheduler = i, this._domEvents = i._createDomEventScope(), this._initDelayedFunctions();
  }
  destructor() {
    this.tooltip.hide(), this._domEvents.detachAll();
  }
  hideTooltip() {
    this.delayHide();
  }
  attach(i) {
    let t = document.body;
    const r = this._scheduler, d = r.$domHelpers;
    i.global || (t = r.$root);
    let n = null;
    const s = (_) => {
      const a = d.getTargetNode(_), o = d.closest(a, i.selector);
      if (d.isChildOf(a, this.tooltip.getNode()))
        return;
      const l = () => {
        n = o, i.onmouseenter(_, o);
      };
      r._mobile && r.config.touch_tooltip && (o ? l() : i.onmouseleave(_, o)), n ? o && o === n ? i.onmousemove(_, o) : (i.onmouseleave(_, n), n = null, o && o !== n && l()) : o && l();
    };
    this.detach(i.selector), this._domEvents.attach(t, "mousemove", s), this._listeners[i.selector] = { node: t, handler: s };
  }
  detach(i) {
    const t = this._listeners[i];
    t && this._domEvents.detach(t.node, "mousemove", t.handler);
  }
  tooltipFor(i) {
    const t = (r) => {
      let d = r;
      return document.createEventObject && !document.createEvent && (d = document.createEventObject(r)), d;
    };
    this._initDelayedFunctions(), this.attach({ selector: i.selector, global: i.global, onmouseenter: (r, d) => {
      const n = i.html(r, d);
      n && this.delayShow(t(r), n);
    }, onmousemove: (r, d) => {
      const n = i.html(r, d);
      n ? this.delayShow(t(r), n) : (this.delayShow.$cancelTimeout(), this.delayHide());
    }, onmouseleave: () => {
      this.delayShow.$cancelTimeout(), this.delayHide();
    } });
  }
  _initDelayedFunctions() {
    const i = this._scheduler;
    this.delayShow && this.delayShow.$cancelTimeout(), this.delayHide && this.delayHide.$cancelTimeout(), this.tooltip.hide(), this.delayShow = ee.delay((t, r) => {
      i.callEvent("onBeforeTooltip", [t]) === !1 ? this.tooltip.hide() : (this.tooltip.setContent(r), this.tooltip.show(t));
    }, i.config.tooltip_timeout || 1), this.delayHide = ee.delay(() => {
      this.delayShow.$cancelTimeout(), this.tooltip.hide();
    }, i.config.tooltip_hide_timeout || 1);
  }
}
const gn = { active_links: function(e) {
  e.config.active_link_view = "day", e._active_link_click = function(i) {
    var t = i.target.getAttribute("data-link-date"), r = e.date.str_to_date(e.config.api_date, !1, !0);
    if (t)
      return e.setCurrentView(r(t), e.config.active_link_view), i && i.preventDefault && i.preventDefault(), !1;
  }, e.attachEvent("onTemplatesReady", function() {
    var i = function(r, d) {
      d = d || r + "_scale_date", e.templates["_active_links_old_" + d] || (e.templates["_active_links_old_" + d] = e.templates[d]);
      var n = e.templates["_active_links_old_" + d], s = e.date.date_to_str(e.config.api_date);
      e.templates[d] = function(_) {
        return "<a data-link-date='" + s(_) + "' href='#'>" + n(_) + "</a>";
      };
    };
    if (i("week"), i("", "month_day"), this.matrix)
      for (var t in this.matrix)
        i(t);
    this._detachDomEvent(this._obj, "click", e._active_link_click), e.event(this._obj, "click", e._active_link_click);
  });
}, agenda_legacy: function(e) {
  e.date.add_agenda_legacy = function(i) {
    return e.date.add(i, 1, "year");
  }, e.templates.agenda_legacy_time = function(i, t, r) {
    return r._timed ? this.day_date(r.start_date, r.end_date, r) + " " + this.event_date(i) : e.templates.day_date(i) + " &ndash; " + e.templates.day_date(t);
  }, e.templates.agenda_legacy_text = function(i, t, r) {
    return r.text;
  }, e.templates.agenda_legacy_date = function() {
    return "";
  }, e.date.agenda_legacy_start = function() {
    return e.date.date_part(e._currentDate());
  }, e.attachEvent("onTemplatesReady", function() {
    var i = e.dblclick_dhx_cal_data;
    e.dblclick_dhx_cal_data = function() {
      if (this._mode == "agenda_legacy")
        !this.config.readonly && this.config.dblclick_create && this.addEventNow();
      else if (i)
        return i.apply(this, arguments);
    };
    var t = e.render_data;
    e.render_data = function(n) {
      if (this._mode != "agenda_legacy")
        return t.apply(this, arguments);
      d();
    };
    var r = e.render_view_data;
    function d() {
      var n = e.get_visible_events();
      n.sort(function(p, g) {
        return p.start_date > g.start_date ? 1 : -1;
      });
      for (var s, _ = "<div class='dhx_agenda_area' " + e._waiAria.agendaDataAttrString() + ">", a = 0; a < n.length; a++) {
        var o = n[a], l = o.color ? "--dhx-scheduler-event-background:" + o.color + ";" : "", h = o.textColor ? "--dhx-scheduler-event-color:" + o.textColor + ";" : "", m = e.templates.event_class(o.start_date, o.end_date, o);
        s = e._waiAria.agendaEventAttrString(o);
        var v = e._waiAria.agendaDetailsBtnString();
        _ += "<div " + s + " class='dhx_agenda_line" + (m ? " " + m : "") + "' event_id='" + o.id + "' " + e.config.event_attribute + "='" + o.id + "' style='" + h + l + (o._text_style || "") + "'><div class='dhx_agenda_event_time'>" + (e.config.rtl ? e.templates.agenda_time(o.end_date, o.start_date, o) : e.templates.agenda_time(o.start_date, o.end_date, o)) + "</div>", _ += `<div ${v} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`, _ += "<span>" + e.templates.agenda_text(o.start_date, o.end_date, o) + "</span></div>";
      }
      _ += "<div class='dhx_v_border'></div></div>", e._els.dhx_cal_data[0].innerHTML = _, e._els.dhx_cal_data[0].childNodes[0].scrollTop = e._agendaScrollTop || 0;
      var u = e._els.dhx_cal_data[0].childNodes[0];
      u.childNodes[u.childNodes.length - 1].style.height = u.offsetHeight < e._els.dhx_cal_data[0].offsetHeight ? "100%" : u.offsetHeight + "px";
      var c = e._els.dhx_cal_data[0].firstChild.childNodes, f = e._getNavDateElement();
      for (f && (f.innerHTML = e.templates.agenda_date(e._min_date, e._max_date, e._mode)), e._rendered = [], a = 0; a < c.length - 1; a++)
        e._rendered[a] = c[a];
    }
    e.render_view_data = function() {
      return this._mode == "agenda_legacy" && (e._agendaScrollTop = e._els.dhx_cal_data[0].childNodes[0].scrollTop, e._els.dhx_cal_data[0].childNodes[0].scrollTop = 0), r.apply(this, arguments);
    }, e.agenda_legacy_view = function(n) {
      e._min_date = e.config.agenda_start || e.date.agenda_legacy_start(e._date), e._max_date = e.config.agenda_end || e.date.add_agenda_legacy(e._min_date, 1), function(s) {
        if (s) {
          var _ = e.locale.labels, a = e._waiAria.agendaHeadAttrString(), o = e._waiAria.agendaHeadDateString(_.date), l = e._waiAria.agendaHeadDescriptionString(_.description);
          e._els.dhx_cal_header[0].innerHTML = "<div " + a + " class='dhx_agenda_line dhx_agenda_line_header'><div " + o + ">" + _.date + "</div><span class = 'description_header' style='padding-left:25px' " + l + ">" + _.description + "</span></div>", e._table_view = !0, e.set_sizes();
        }
      }(n), n ? (e._cols = null, e._colsS = null, e._table_view = !0, d()) : e._table_view = !1;
    };
  });
}, agenda_view: function(e) {
  e.date.add_agenda = function(d, n) {
    return e.date.add(d, 1 * n, "month");
  }, e.templates.agenda_time = function(d, n, s) {
    return s._timed ? `${this.event_date(d)} - ${this.event_date(n)}` : e.locale.labels.full_day;
  }, e.templates.agenda_text = function(d, n, s) {
    return s.text;
  };
  const i = e.date.date_to_str("%F %j"), t = e.date.date_to_str("%l");
  e.templates.agenda_day = function(d) {
    return `<div class="dhx_agenda_day_date">${i(d)}</div>
		<div class="dhx_agenda_day_dow">${t(d)}</div>`;
  }, e.templates.agenda_date = function(d, n) {
    return e.templates.month_date(e.getState().date);
  }, e.date.agenda_start = function(d) {
    return e.date.month_start(new Date(d));
  };
  let r = 0;
  e.attachEvent("onTemplatesReady", function() {
    var d = e.dblclick_dhx_cal_data;
    e.dblclick_dhx_cal_data = function() {
      if (this._mode == "agenda")
        !this.config.readonly && this.config.dblclick_create && this.addEventNow();
      else if (d)
        return d.apply(this, arguments);
    };
    var n = e.render_data;
    e.render_data = function(o) {
      if (this._mode != "agenda")
        return n.apply(this, arguments);
      _();
    };
    var s = e.render_view_data;
    function _() {
      const o = e.get_visible_events();
      o.sort(function(f, p) {
        return f.start_date > p.start_date ? 1 : -1;
      });
      const l = {};
      let h = e.getState().min_date;
      const m = e.getState().max_date;
      for (; h.valueOf() < m.valueOf(); )
        l[h.valueOf()] = [], h = e.date.add(h, 1, "day");
      let v = !1;
      if (o.forEach((f) => {
        let p = e.date.day_start(new Date(f.start_date));
        for (; p.valueOf() < f.end_date.valueOf(); )
          l[p.valueOf()] && (l[p.valueOf()].push(f), v = !0), p = e.date.day_start(e.date.add(p, 1, "day"));
      }), v) {
        let f = "";
        for (let p in l)
          e.ignore_agenda && e.ignore_agenda(new Date(1 * p)) || (f += a(new Date(1 * p), l[p]));
        e._els.dhx_cal_data[0].innerHTML = f;
      } else
        e._els.dhx_cal_data[0].innerHTML = `<div class="dhx_cal_agenda_no_events">${e.locale.labels.agenda_tab}</div>`;
      e._els.dhx_cal_data[0].scrollTop = r;
      let u = e._els.dhx_cal_data[0].querySelectorAll(".dhx_cal_agenda_event_line");
      e._rendered = [];
      for (var c = 0; c < u.length - 1; c++)
        e._rendered[c] = u[c];
    }
    function a(o, l) {
      if (!l.length)
        return "";
      let h = `
<div class="dhx_cal_agenda_day" data-date="${e.templates.format_date(o)}" data-day="${o.getDay()}">
	<div class="dhx_cal_agenda_day_header">${e.templates.agenda_day(o)}</div>
	<div class="dhx_cal_agenda_day_events">
`;
      return l.forEach((m) => {
        h += function(v, u) {
          const c = e.templates.agenda_time(u.start_date, u.end_date, u), f = e.getState().select_id, p = e.templates.event_class(u.start_date, u.end_date, u), g = e.templates.agenda_text(u.start_date, u.end_date, u);
          let y = "";
          return (u.color || u.textColor) && (y = ` style="${u.color ? "--dhx-scheduler-event-background:" + u.color + ";" : ""}${u.textColor ? "--dhx-scheduler-event-color:" + u.textColor + ";" : ""}" `), `<div class="dhx_cal_agenda_event_line ${p || ""} ${u.id == f ? "dhx_cal_agenda_event_line_selected" : ""}" ${y} ${e.config.event_attribute}="${u.id}">
	<div class="dhx_cal_agenda_event_line_marker"></div>
	<div class="dhx_cal_agenda_event_line_time">${c}</div>
	<div class="dhx_cal_agenda_event_line_text">${g}</div>
</div>`;
        }(0, m);
      }), h += "</div></div>", h;
    }
    e.render_view_data = function() {
      return this._mode == "agenda" && (r = e._els.dhx_cal_data[0].scrollTop, e._els.dhx_cal_data[0].scrollTop = 0), s.apply(this, arguments);
    }, e.agenda_view = function(o) {
      o ? (e._min_date = e.config.agenda_start || e.date.agenda_start(e._date), e._max_date = e.config.agenda_end || e.date.add_agenda(e._min_date, 1), e._cols = null, e._colsS = null, e._table_view = !0, e._getNavDateElement().innerHTML = e.templates.agenda_date(e._date), _()) : e._table_view = !1;
    };
  });
}, all_timed: function(e) {
  e.config.all_timed = "short", e.config.all_timed_month = !1;
  var i = function(_) {
    return !((_.end_date - _.start_date) / 36e5 >= 24) || e._drag_mode == "resize" && e._drag_id == _.id;
  };
  e._safe_copy = function(_) {
    var a = null, o = e._copy_event(_);
    return _.event_pid && (a = e.getEvent(_.event_pid)), a && a.isPrototypeOf(_) && (delete o.event_length, delete o.event_pid, delete o.rec_pattern, delete o.rec_type), o;
  };
  var t = e._pre_render_events_line, r = e._pre_render_events_table, d = function(_, a) {
    return this._table_view ? r.call(this, _, a) : t.call(this, _, a);
  };
  e._pre_render_events_line = e._pre_render_events_table = function(_, a) {
    if (!this.config.all_timed || this._table_view && this._mode != "month" || this._mode == "month" && !this.config.all_timed_month)
      return d.call(this, _, a);
    for (var o = 0; o < _.length; o++) {
      var l = _[o];
      if (!l._timed)
        if (this.config.all_timed != "short" || i(l)) {
          var h = this._safe_copy(l);
          l._virtual ? h._first_chunk = !1 : h._first_chunk = !0, h._drag_resize = !1, h._virtual = !0, h.start_date = new Date(h.start_date), c(l) ? (h.end_date = f(h.start_date), this.config.last_hour != 24 && (h.end_date = p(h.start_date, this.config.last_hour))) : h.end_date = new Date(l.end_date);
          var m = !1;
          h.start_date < this._max_date && h.end_date > this._min_date && h.start_date < h.end_date && (_[o] = h, m = !0);
          var v = this._safe_copy(l);
          if (v._virtual = !0, v.end_date = new Date(v.end_date), v.start_date < this._min_date ? v.start_date = p(this._min_date, this.config.first_hour) : v.start_date = p(f(l.start_date), this.config.first_hour), v.start_date < this._max_date && v.start_date < v.end_date) {
            if (!m) {
              _[o--] = v;
              continue;
            }
            _.splice(o + 1, 0, v), v._last_chunk = !1;
          } else
            h._last_chunk = !0, h._drag_resize = !0;
        } else
          this._mode != "month" && _.splice(o--, 1);
    }
    var u = this._drag_mode != "move" && a;
    return d.call(this, _, u);
    function c(g) {
      var y = f(g.start_date);
      return +g.end_date > +y;
    }
    function f(g) {
      var y = e.date.add(g, 1, "day");
      return y = e.date.date_part(y);
    }
    function p(g, y) {
      var x = e.date.date_part(new Date(g));
      return x.setHours(y), x;
    }
  };
  var n = e.get_visible_events;
  e.get_visible_events = function(_) {
    return this.config.all_timed && this.config.multi_day ? n.call(this, !1) : n.call(this, _);
  }, e.attachEvent("onBeforeViewChange", function(_, a, o, l) {
    return e._allow_dnd = o == "day" || o == "week" || e.getView(o), !0;
  }), e._is_main_area_event = function(_) {
    return !!(_._timed || this.config.all_timed === !0 || this.config.all_timed == "short" && i(_));
  };
  var s = e.updateEvent;
  e.updateEvent = function(_) {
    var a, o, l = e.getEvent(_);
    l && (a = e.config.all_timed && !(e.isOneDayEvent(e._events[_]) || e.getState().drag_id)) && (o = e.config.update_render, e.config.update_render = !0), s.apply(e, arguments), l && a && (e.config.update_render = o);
  };
}, collision: function(e) {
  var i, t;
  function r(d) {
    e._get_section_view() && d && (i = e.getEvent(d)[e._get_section_property()]);
  }
  e.config.collision_limit = 1, e.attachEvent("onBeforeDrag", function(d) {
    return r(d), !0;
  }), e.attachEvent("onBeforeLightbox", function(d) {
    var n = e.getEvent(d);
    return t = [n.start_date, n.end_date], r(d), !0;
  }), e.attachEvent("onEventChanged", function(d) {
    if (!d || !e.getEvent(d))
      return !0;
    var n = e.getEvent(d);
    if (!e.checkCollision(n)) {
      if (!t)
        return !1;
      n.start_date = t[0], n.end_date = t[1], n._timed = this.isOneDayEvent(n);
    }
    return !0;
  }), e.attachEvent("onBeforeEventChanged", function(d, n, s) {
    return e.checkCollision(d);
  }), e.attachEvent("onEventAdded", function(d, n) {
    e.checkCollision(n) || e.deleteEvent(d);
  }), e.attachEvent("onEventSave", function(d, n, s) {
    if ((n = e._lame_clone(n)).id = d, !n.start_date || !n.end_date) {
      var _ = e.getEvent(d);
      n.start_date = new Date(_.start_date), n.end_date = new Date(_.end_date);
    }
    return (n.rrule && !n.recurring_event_id || n.rec_type) && e._roll_back_dates(n), e.checkCollision(n);
  }), e._check_sections_collision = function(d, n) {
    var s = e._get_section_property();
    return d[s] == n[s] && d.id != n.id;
  }, e.checkCollision = function(d) {
    var n = [], s = e.config.collision_limit;
    if (d.rrule || d.rec_type)
      for (var _ = e.getRecDates(d), a = 0; a < _.length; a++)
        for (var o = e.getEvents(_[a].start_date, _[a].end_date), l = 0; l < o.length; l++)
          (o[l].event_pid || o[l].id || o[l].recurring_event_id) != d.id && n.push(o[l]);
    else {
      n = e.getEvents(d.start_date, d.end_date);
      for (var h = 0; h < n.length; h++) {
        var m = n[h];
        if (m.id == d.id || m.event_length && [m.event_pid, m.event_length].join("#") == d.id) {
          n.splice(h, 1);
          break;
        }
        if (m.recurring_event_id && [m.recurring_event_id, m._pid_time].join("#") == d.id) {
          n.splice(h, 1);
          break;
        }
      }
    }
    var v = e._get_section_view(), u = e._get_section_property(), c = !0;
    if (v) {
      var f = 0;
      for (h = 0; h < n.length; h++)
        n[h].id != d.id && this._check_sections_collision(n[h], d) && f++;
      f >= s && (c = !1);
    } else
      n.length >= s && (c = !1);
    if (!c) {
      var p = !e.callEvent("onEventCollision", [d, n]);
      return p || (d[u] = i || d[u]), p;
    }
    return c;
  };
}, container_autoresize: function(e) {
  e.config.container_autoresize = !0, e.config.month_day_min_height = 90, e.config.min_grid_size = 25, e.config.min_map_size = 400;
  var i = e._pre_render_events, t = !0, r = 0, d = 0;
  e._pre_render_events = function(l, h) {
    if (!e.config.container_autoresize || !t)
      return i.apply(this, arguments);
    var m = this.xy.bar_height, v = this._colsS.heights, u = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], c = this._els.dhx_cal_data[0];
    if (l = this._table_view ? this._pre_render_events_table(l, h) : this._pre_render_events_line(l, h), this._table_view)
      if (h)
        this._colsS.heights = v;
      else {
        var f = c.firstChild;
        const w = f.querySelectorAll(".dhx_cal_month_row");
        if (w && w.length) {
          for (var p = 0; p < w.length; p++) {
            if (u[p]++, u[p] * m > this._colsS.height - this.xy.month_head_height) {
              var g = w[p].querySelectorAll(".dhx_cal_month_cell"), y = this._colsS.height - this.xy.month_head_height;
              1 * this.config.max_month_events !== this.config.max_month_events || u[p] <= this.config.max_month_events ? y = u[p] * m : (this.config.max_month_events + 1) * m > this._colsS.height - this.xy.month_head_height && (y = (this.config.max_month_events + 1) * m), w[p].style.height = y + this.xy.month_head_height + "px";
              for (var x = 0; x < g.length; x++)
                g[x].childNodes[1].style.height = y + "px";
              u[p] = (u[p - 1] || 0) + g[0].offsetHeight;
            }
            u[p] = (u[p - 1] || 0) + w[p].querySelectorAll(".dhx_cal_month_cell")[0].offsetHeight;
          }
          u.unshift(0), f.parentNode.offsetHeight < f.parentNode.scrollHeight && f._h_fix;
        } else if (l.length || this._els.dhx_multi_day[0].style.visibility != "visible" || (u[0] = -1), l.length || u[0] == -1) {
          var b = (u[0] + 1) * m + 1;
          d != b + 1 && (this._obj.style.height = r - d + b - 1 + "px"), b += "px";
          const D = this._els.dhx_cal_navline[0].offsetHeight, E = this._els.dhx_cal_header[0].offsetHeight;
          c.style.height = this._obj.offsetHeight - D - E - (this.xy.margin_top || 0) + "px";
          var k = this._els.dhx_multi_day[0];
          k.style.height = b, k.style.visibility = u[0] == -1 ? "hidden" : "visible", k.style.display = u[0] == -1 ? "none" : "", (k = this._els.dhx_multi_day[1]).style.height = b, k.style.visibility = u[0] == -1 ? "hidden" : "visible", k.style.display = u[0] == -1 ? "none" : "", k.className = u[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (u[0] + 1) * m, u[0] = 0;
        }
      }
    return l;
  };
  var n = ["dhx_cal_navline", "dhx_cal_header", "dhx_multi_day", "dhx_cal_data"], s = function(l) {
    r = 0;
    for (var h = 0; h < n.length; h++) {
      var m = n[h], v = e._els[m] ? e._els[m][0] : null, u = 0;
      switch (m) {
        case "dhx_cal_navline":
        case "dhx_cal_header":
          u = v.offsetHeight;
          break;
        case "dhx_multi_day":
          u = v ? v.offsetHeight - 1 : 0, d = u;
          break;
        case "dhx_cal_data":
          var c = e.getState().mode;
          if (v.childNodes[1] && c != "month") {
            let M = 0;
            for (let T = 0; T < v.childNodes.length; T++)
              v.childNodes[T].offsetHeight > M && (M = v.childNodes[T].offsetHeight);
            u = M;
          } else
            u = Math.max(v.offsetHeight - 1, v.scrollHeight);
          if (c == "month")
            e.config.month_day_min_height && !l && (u = v.querySelectorAll(".dhx_cal_month_row").length * e.config.month_day_min_height), l && (v.style.height = u + "px");
          else if (c == "year")
            u = 190 * e.config.year_y;
          else if (c == "agenda") {
            if (u = 0, v.childNodes && v.childNodes.length)
              for (var f = 0; f < v.childNodes.length; f++)
                u += v.childNodes[f].offsetHeight;
            u + 2 < e.config.min_grid_size ? u = e.config.min_grid_size : u += 2;
          } else if (c == "week_agenda") {
            for (var p, g, y = e.xy.week_agenda_scale_height + e.config.min_grid_size, x = 0; x < v.childNodes.length; x++)
              for (g = v.childNodes[x], f = 0; f < g.childNodes.length; f++) {
                for (var b = 0, k = g.childNodes[f].childNodes[1], w = 0; w < k.childNodes.length; w++)
                  b += k.childNodes[w].offsetHeight;
                p = b + e.xy.week_agenda_scale_height, (p = x != 1 || f != 2 && f != 3 ? p : 2 * p) > y && (y = p);
              }
            u = 3 * y;
          } else if (c == "map") {
            u = 0;
            var D = v.querySelectorAll(".dhx_map_line");
            for (f = 0; f < D.length; f++)
              u += D[f].offsetHeight;
            u + 2 < e.config.min_map_size ? u = e.config.min_map_size : u += 2;
          } else if (e._gridView)
            if (u = 0, v.childNodes[1].childNodes[0].childNodes && v.childNodes[1].childNodes[0].childNodes.length) {
              for (D = v.childNodes[1].childNodes[0].childNodes[0].childNodes, f = 0; f < D.length; f++)
                u += D[f].offsetHeight;
              (u += 2) < e.config.min_grid_size && (u = e.config.min_grid_size);
            } else
              u = e.config.min_grid_size;
          if (e.matrix && e.matrix[c]) {
            if (l)
              u += 0, v.style.height = u + "px";
            else {
              u = 0;
              for (var E = e.matrix[c], S = E.y_unit, N = 0; N < S.length; N++)
                u += E.getSectionHeight(S[N].key);
              e.$container.clientWidth != e.$container.scrollWidth && (u += o());
            }
            u -= 1;
          }
          (c == "day" || c == "week" || e._props && e._props[c]) && (u += 2);
      }
      r += u += 1;
    }
    e._obj.style.height = r + "px", l || e.updateView();
  };
  function _() {
    t = !1, e.callEvent("onAfterSchedulerResize", []), t = !0;
  }
  var a = function() {
    if (!e.config.container_autoresize || !t)
      return !0;
    var l = e.getState().mode;
    if (!l)
      return !0;
    var h = window.requestAnimationFrame || window.setTimeout, m = document.documentElement.scrollTop;
    h(function() {
      !e.$destroyed && e.$initialized && s();
    }), e.matrix && e.matrix[l] || l == "month" ? h(function() {
      !e.$destroyed && e.$initialized && (s(!0), document.documentElement.scrollTop = m, _());
    }, 1) : _();
  };
  function o() {
    var l = document.createElement("div");
    l.style.cssText = "visibility:hidden;position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;height:110px;min-height:100px;overflow-y:scroll;", document.body.appendChild(l);
    var h = l.offsetWidth - l.clientWidth;
    return document.body.removeChild(l), h;
  }
  e.attachEvent("onBeforeViewChange", function() {
    var l = e.config.container_autoresize;
    if (e.xy.$original_scroll_width || (e.xy.$original_scroll_width = e.xy.scroll_width), e.xy.scroll_width = l ? 0 : e.xy.$original_scroll_width, e.matrix)
      for (var h in e.matrix) {
        var m = e.matrix[h];
        m.$original_section_autoheight || (m.$original_section_autoheight = m.section_autoheight), m.section_autoheight = !l && m.$original_section_autoheight;
      }
    return !0;
  }), e.attachEvent("onViewChange", a), e.attachEvent("onXLE", a), e.attachEvent("onEventChanged", a), e.attachEvent("onEventCreated", a), e.attachEvent("onEventAdded", a), e.attachEvent("onEventDeleted", a), e.attachEvent("onAfterSchedulerResize", a), e.attachEvent("onClearAll", a), e.attachEvent("onBeforeExpand", function() {
    return t = !1, !0;
  }), e.attachEvent("onBeforeCollapse", function() {
    return t = !0, !0;
  });
}, cookie: function(e) {
  function i(d) {
    return (d._obj.id || "scheduler") + "_settings";
  }
  var t = !0;
  e.attachEvent("onBeforeViewChange", function(d, n, s, _) {
    if (t && e._get_url_nav) {
      var a = e._get_url_nav();
      (a.date || a.mode || a.event) && (t = !1);
    }
    var o = i(e);
    if (t) {
      t = !1;
      var l = function(m) {
        var v = m + "=";
        if (document.cookie.length > 0) {
          var u = document.cookie.indexOf(v);
          if (u != -1) {
            u += v.length;
            var c = document.cookie.indexOf(";", u);
            return c == -1 && (c = document.cookie.length), document.cookie.substring(u, c);
          }
        }
        return "";
      }(o);
      if (l) {
        e._min_date || (e._min_date = _), (l = unescape(l).split("@"))[0] = this._helpers.parseDate(l[0]);
        var h = this.isViewExists(l[1]) ? l[1] : s;
        return _ = isNaN(+l[0]) ? _ : l[0], window.setTimeout(function() {
          e.$destroyed || e.setCurrentView(_, h);
        }, 1), !1;
      }
    }
    return !0;
  }), e.attachEvent("onViewChange", function(d, n) {
    var s, _, a = i(e), o = escape(this._helpers.formatDate(n) + "@" + d);
    _ = a + "=" + o + ((s = "expires=Sun, 31 Jan 9999 22:00:00 GMT") ? "; " + s : ""), document.cookie = _;
  });
  var r = e._load;
  e._load = function() {
    var d = arguments;
    if (e._date)
      r.apply(this, d);
    else {
      var n = this;
      window.setTimeout(function() {
        r.apply(n, d);
      }, 1);
    }
  };
}, daytimeline: function(e) {
  de("Day Timeline", e.assert);
}, drag_between: function(e) {
  de("Drag Between", e.assert);
}, editors: function(e) {
  e.form_blocks.combo = { render: function(i) {
    i.cached_options || (i.cached_options = {});
    var t = "";
    return t += "<div class='" + i.type + "' ></div>";
  }, set_value: function(i, t, r, d) {
    (function() {
      v();
      var m = e.attachEvent("onAfterLightbox", function() {
        v(), e.detachEvent(m);
      });
      function v() {
        if (i._combo && i._combo.DOMParent) {
          var u = i._combo;
          u.unload ? u.unload() : u.destructor && u.destructor(), u.DOMParent = u.DOMelem = null;
        }
      }
    })(), window.dhx_globalImgPath = d.image_path || "/", i._combo = new dhtmlXCombo(i, d.name, i.offsetWidth - 8), d.onchange && i._combo.attachEvent("onChange", d.onchange), d.options_height && i._combo.setOptionHeight(d.options_height);
    var n = i._combo;
    if (n.enableFilteringMode(d.filtering, d.script_path || null, !!d.cache), d.script_path) {
      var s = r[d.map_to];
      s ? d.cached_options[s] ? (n.addOption(s, d.cached_options[s]), n.disable(1), n.selectOption(0), n.disable(0)) : e.ajax.get(d.script_path + "?id=" + s + "&uid=" + e.uid(), function(m) {
        var v, u = m.xmlDoc.responseText;
        try {
          v = JSON.parse(u).options[0].text;
        } catch {
          v = e.ajax.xpath("//option", m.xmlDoc)[0].childNodes[0].nodeValue;
        }
        d.cached_options[s] = v, n.addOption(s, v), n.disable(1), n.selectOption(0), n.disable(0);
      }) : n.setComboValue("");
    } else {
      for (var _ = [], a = 0; a < d.options.length; a++) {
        var o = d.options[a], l = [o.key, o.label, o.css];
        _.push(l);
      }
      if (n.addOption(_), r[d.map_to]) {
        var h = n.getIndexByValue(r[d.map_to]);
        n.selectOption(h);
      }
    }
  }, get_value: function(i, t, r) {
    var d = i._combo.getSelectedValue();
    return r.script_path && (r.cached_options[d] = i._combo.getSelectedText()), d;
  }, focus: function(i) {
  } }, e.form_blocks.radio = { render: function(i) {
    var t = "";
    t += `<div class='dhx_cal_ltext dhx_cal_radio ${i.vertical ? "dhx_cal_radio_vertical" : ""}' style='max-height:${i.height}px;'>`;
    for (var r = 0; r < i.options.length; r++) {
      var d = e.uid();
      t += "<label class='dhx_cal_radio_item' for='" + d + "'><input id='" + d + "' type='radio' name='" + i.name + "' value='" + i.options[r].key + "'><span> " + i.options[r].label + "</span></label>";
    }
    return t += "</div>";
  }, set_value: function(i, t, r, d) {
    for (var n = i.getElementsByTagName("input"), s = 0; s < n.length; s++) {
      n[s].checked = !1;
      var _ = r[d.map_to] || t;
      n[s].value == _ && (n[s].checked = !0);
    }
  }, get_value: function(i, t, r) {
    for (var d = i.getElementsByTagName("input"), n = 0; n < d.length; n++)
      if (d[n].checked)
        return d[n].value;
  }, focus: function(i) {
  } }, e.form_blocks.checkbox = { render: function(i) {
    return e.config.wide_form ? '<div class="dhx_cal_wide_checkbox"></div>' : "";
  }, set_value: function(i, t, r, d) {
    i = e._lightbox.querySelector(`#${d.id}`);
    var n = e.uid(), s = d.checked_value !== void 0 ? t == d.checked_value : !!t;
    i.className += " dhx_cal_checkbox";
    var _ = "<input id='" + n + "' type='checkbox' value='true' name='" + d.name + "'" + (s ? "checked='true'" : "") + "'>", a = "<label for='" + n + "'>" + (e.locale.labels["section_" + d.name] || d.name) + "</label>";
    if (e.config.wide_form ? (i.innerHTML = a, i.nextSibling.innerHTML = _) : i.innerHTML = _ + a, d.handler) {
      var o = i.getElementsByTagName("input")[0];
      if (o.$_eventAttached)
        return;
      o.$_eventAttached = !0, e.event(o, "click", d.handler);
    }
  }, get_value: function(i, t, r) {
    var d = (i = e._lightbox.querySelector(`#${r.id}`)).getElementsByTagName("input")[0];
    return d || (d = i.nextSibling.getElementsByTagName("input")[0]), d.checked ? r.checked_value || !0 : r.unchecked_value || !1;
  }, focus: function(i) {
  } };
}, expand: function(e) {
  e.ext.fullscreen = { toggleIcon: null }, e.expand = function() {
    if (e.callEvent("onBeforeExpand", [])) {
      var i = e._obj;
      do
        i._position = i.style.position || "", i.style.position = "static";
      while ((i = i.parentNode) && i.style);
      (i = e._obj).style.position = "absolute", i._width = i.style.width, i._height = i.style.height, i.style.width = i.style.height = "100%", i.style.top = i.style.left = "0px";
      var t = document.body;
      t.scrollTop = 0, (t = t.parentNode) && (t.scrollTop = 0), document.body._overflow = document.body.style.overflow || "", document.body.style.overflow = "hidden", e._maximize(), e.callEvent("onExpand", []);
    }
  }, e.collapse = function() {
    if (e.callEvent("onBeforeCollapse", [])) {
      var i = e._obj;
      do
        i.style.position = i._position;
      while ((i = i.parentNode) && i.style);
      (i = e._obj).style.width = i._width, i.style.height = i._height, document.body.style.overflow = document.body._overflow, e._maximize(), e.callEvent("onCollapse", []);
    }
  }, e.attachEvent("onTemplatesReady", function() {
    var i = document.createElement("div");
    i.className = "dhx_expand_icon", e.ext.fullscreen.toggleIcon = i, i.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
	`, e._obj.appendChild(i), e.event(i, "click", function() {
      e.expanded ? e.collapse() : e.expand();
    });
  }), e._maximize = function() {
    this.expanded = !this.expanded, this.expanded ? this.ext.fullscreen.toggleIcon.classList.add("dhx_expand_icon--expanded") : this.ext.fullscreen.toggleIcon.classList.remove("dhx_expand_icon--expanded");
    for (var i = ["left", "top"], t = 0; t < i.length; t++) {
      var r = e["_prev_margin_" + i[t]];
      e.xy["margin_" + i[t]] ? (e["_prev_margin_" + i[t]] = e.xy["margin_" + i[t]], e.xy["margin_" + i[t]] = 0) : r && (e.xy["margin_" + i[t]] = e["_prev_margin_" + i[t]], delete e["_prev_margin_" + i[t]]);
    }
    e.setCurrentView();
  };
}, export_api: function(e) {
  (function() {
    function i(r, d) {
      for (var n in d)
        r[n] || (r[n] = d[n]);
      return r;
    }
    function t(r, d) {
      var n = {};
      return (r = d._els[r]) && r[0] ? (n.x = r[0].scrollWidth, n.y = r[0].scrollHeight) : (n.x = 0, n.y = 0), n;
    }
    window.dhtmlxAjax || (window.dhtmlxAjax = { post: function(r, d, n) {
      return window.dhx4.ajax.post(r, d, n);
    }, get: function(r, d) {
      return window.ajax.get(r, d);
    } }), function(r) {
      function d() {
        var n = r.getState().mode;
        return r.matrix && r.matrix[n] ? r.matrix[n] : null;
      }
      r.exportToPDF = function(n) {
        (n = i(n || {}, { name: "calendar.pdf", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: r.config.rtl })).html = this._export_html(n), n.mode = this.getState().mode, this._send_to_export(n, "pdf");
      }, r.exportToPNG = function(n) {
        (n = i(n || {}, { name: "calendar.png", format: "A4", orientation: "landscape", dpi: 96, zoom: 1, rtl: r.config.rtl })).html = this._export_html(n), n.mode = this.getState().mode, this._send_to_export(n, "png");
      }, r.exportToICal = function(n) {
        n = i(n || {}, { name: "calendar.ical", data: this._serialize_plain(null, n) }), this._send_to_export(n, "ical");
      }, r.exportToExcel = function(n) {
        n = i(n || {}, { name: "calendar.xlsx", title: "Events", data: this._serialize_plain(this.templates.xml_format, n), columns: this._serialize_columns() }), this._send_to_export(n, "excel");
      }, r._ajax_to_export = function(n, s, _) {
        delete n.callback;
        var a = n.server || "https://export.dhtmlx.com/scheduler";
        window.dhtmlxAjax.post(a, "type=" + s + "&store=1&data=" + encodeURIComponent(JSON.stringify(n)), function(o) {
          var l = null;
          if (!(o.xmlDoc.status > 400))
            try {
              l = JSON.parse(o.xmlDoc.responseText);
            } catch {
            }
          _(l);
        });
      }, r._plain_export_copy = function(n, s) {
        var _ = {};
        for (var a in n)
          _[a] = n[a];
        return _.start_date = s(_.start_date), _.end_date = s(_.end_date), _.$text = this.templates.event_text(n.start_date, n.end_date, n), _;
      }, r._serialize_plain = function(n, s) {
        var _;
        n = n || r.date.date_to_str("%Y%m%dT%H%i%s", !0), _ = s && s.start && s.end ? r.getEvents(s.start, s.end) : r.getEvents();
        for (var a = [], o = 0; o < _.length; o++)
          a[o] = this._plain_export_copy(_[o], n);
        return a;
      }, r._serialize_columns = function() {
        return [{ id: "start_date", header: "Start Date", width: 30 }, { id: "end_date", header: "End Date", width: 30 }, { id: "$text", header: "Text", width: 100 }];
      }, r._send_to_export = function(n, s) {
        if (n.version || (n.version = r.version), n.skin || (n.skin = r.skin), n.callback)
          return r._ajax_to_export(n, s, n.callback);
        var _ = this._create_hidden_form();
        _.firstChild.action = n.server || "https://export.dhtmlx.com/scheduler", _.firstChild.childNodes[0].value = JSON.stringify(n), _.firstChild.childNodes[1].value = s, _.firstChild.submit();
      }, r._create_hidden_form = function() {
        if (!this._hidden_export_form) {
          var n = this._hidden_export_form = document.createElement("div");
          n.style.display = "none", n.innerHTML = "<form method='POST' target='_blank'><input type='text' name='data'><input type='hidden' name='type' value=''></form>", document.body.appendChild(n);
        }
        return this._hidden_export_form;
      }, r._get_export_size = function(n, s, _, a, o, l, h) {
        a = parseInt(a) / 25.4 || 4;
        var m = { A5: { x: 148, y: 210 }, A4: { x: 210, y: 297 }, A3: { x: 297, y: 420 }, A2: { x: 420, y: 594 }, A1: { x: 594, y: 841 }, A0: { x: 841, y: 1189 } }, v = t("dhx_cal_data", this).x, u = { y: t("dhx_cal_data", this).y + t("dhx_cal_header", this).y + t("dhx_multi_day", this).y };
        return u.x = n === "full" ? v : Math.floor((s === "landscape" ? m[n].y : m[n].x) * a), h && (u.x *= parseFloat(h.x) || 1, u.y *= parseFloat(h.y) || 1), u;
      }, r._export_html = function(n) {
        var s, _, a, o = (s = void 0, _ = void 0, (a = d()) && (_ = a.scrollable, s = a.smart_rendering), { nav_height: r.xy.nav_height, scroll_width: r.xy.scroll_width, style_width: r._obj.style.width, style_height: r._obj.style.height, timeline_scrollable: _, timeline_smart_rendering: s }), l = r._get_export_size(n.format, n.orientation, n.zoom, n.dpi, n.header, n.footer, n.scales), h = "";
        try {
          (function(m, v) {
            r._obj.style.width = m.x + "px", r._obj.style.height = m.y + "px", r.xy.nav_height = 0, r.xy.scroll_width = 0;
            var u = d();
            (v.timeline_scrollable || v.timeline_smart_rendering) && (u.scrollable = !1, u.smart_rendering = !1);
          })(l, o), r.setCurrentView(), h = r._obj.innerHTML;
        } catch (m) {
          console.error(m);
        } finally {
          (function(m) {
            r.xy.scroll_width = m.scroll_width, r.xy.nav_height = m.nav_height, r._obj.style.width = m.style_width, r._obj.style.height = m.style_height;
            var v = d();
            (m.timeline_scrollable || m.timeline_smart_rendering) && (v.scrollable = m.timeline_scrollable, v.smart_rendering = m.timeline_smart_rendering);
          })(o), r.setCurrentView();
        }
        return h;
      };
    }(e);
  })();
}, grid_view: function(e) {
  de("Grid", e.assert);
}, html_templates: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    for (var i = document.body.getElementsByTagName("DIV"), t = 0; t < i.length; t++) {
      var r = i[t].className || "";
      if ((r = r.split(":")).length == 2 && r[0] == "template") {
        var d = 'return "' + (i[t].innerHTML || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\n\r]+/g, "") + '";';
        d = unescape(d).replace(/\{event\.([a-z]+)\}/g, function(n, s) {
          return '"+ev.' + s + '+"';
        }), e.templates[r[1]] = Function("start", "end", "ev", d), i[t].style.display = "none";
      }
    }
  });
}, key_nav: function(e) {
  function i(t) {
    var r = { minicalButton: e.$keyboardNavigation.MinicalButton, minicalDate: e.$keyboardNavigation.MinicalCell, scheduler: e.$keyboardNavigation.SchedulerNode, dataArea: e.$keyboardNavigation.DataArea, timeSlot: e.$keyboardNavigation.TimeSlot, event: e.$keyboardNavigation.Event }, d = {};
    for (var n in r)
      d[n.toLowerCase()] = r[n];
    return d[t = (t + "").toLowerCase()] || r.scheduler;
  }
  e.config.key_nav = !0, e.config.key_nav_step = 30, e.addShortcut = function(t, r, d) {
    var n = i(d);
    n && n.prototype.bind(t, r);
  }, e.getShortcutHandler = function(t, r) {
    var d = i(r);
    if (d) {
      var n = e.$keyboardNavigation.shortcuts.parse(t);
      if (n.length)
        return d.prototype.findHandler(n[0]);
    }
  }, e.removeShortcut = function(t, r) {
    var d = i(r);
    d && d.prototype.unbind(t);
  }, e.focus = function() {
    if (e.config.key_nav) {
      var t = e.$keyboardNavigation.dispatcher;
      t.enable();
      var r = t.getActiveNode();
      !r || r instanceof e.$keyboardNavigation.MinicalButton || r instanceof e.$keyboardNavigation.MinicalCell ? t.setDefaultNode() : t.focusNode(t.getActiveNode());
    }
  }, e.$keyboardNavigation = {}, e._compose = function() {
    for (var t = Array.prototype.slice.call(arguments, 0), r = {}, d = 0; d < t.length; d++) {
      var n = t[d];
      for (var s in typeof n == "function" && (n = new n()), n)
        r[s] = n[s];
    }
    return r;
  }, function(t) {
    t.$keyboardNavigation.shortcuts = { createCommand: function() {
      return { modifiers: { shift: !1, alt: !1, ctrl: !1, meta: !1 }, keyCode: null };
    }, parse: function(r) {
      for (var d = [], n = this.getExpressions(this.trim(r)), s = 0; s < n.length; s++) {
        for (var _ = this.getWords(n[s]), a = this.createCommand(), o = 0; o < _.length; o++)
          this.commandKeys[_[o]] ? a.modifiers[_[o]] = !0 : this.specialKeys[_[o]] ? a.keyCode = this.specialKeys[_[o]] : a.keyCode = _[o].charCodeAt(0);
        d.push(a);
      }
      return d;
    }, getCommandFromEvent: function(r) {
      var d = this.createCommand();
      d.modifiers.shift = !!r.shiftKey, d.modifiers.alt = !!r.altKey, d.modifiers.ctrl = !!r.ctrlKey, d.modifiers.meta = !!r.metaKey, d.keyCode = r.which || r.keyCode, d.keyCode >= 96 && d.keyCode <= 105 && (d.keyCode -= 48);
      var n = String.fromCharCode(d.keyCode);
      return n && (d.keyCode = n.toLowerCase().charCodeAt(0)), d;
    }, getHashFromEvent: function(r) {
      return this.getHash(this.getCommandFromEvent(r));
    }, getHash: function(r) {
      var d = [];
      for (var n in r.modifiers)
        r.modifiers[n] && d.push(n);
      return d.push(r.keyCode), d.join(this.junctionChar);
    }, getExpressions: function(r) {
      return r.split(this.junctionChar);
    }, getWords: function(r) {
      return r.split(this.combinationChar);
    }, trim: function(r) {
      return r.replace(/\s/g, "");
    }, junctionChar: ",", combinationChar: "+", commandKeys: { shift: 16, alt: 18, ctrl: 17, meta: !0 }, specialKeys: { backspace: 8, tab: 9, enter: 13, esc: 27, space: 32, up: 38, down: 40, left: 37, right: 39, home: 36, end: 35, pageup: 33, pagedown: 34, delete: 46, insert: 45, plus: 107, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123 } };
  }(e), function(t) {
    t.$keyboardNavigation.EventHandler = { _handlers: null, findHandler: function(r) {
      this._handlers || (this._handlers = {});
      var d = t.$keyboardNavigation.shortcuts.getHash(r);
      return this._handlers[d];
    }, doAction: function(r, d) {
      var n = this.findHandler(r);
      n && (n.call(this, d), d.preventDefault ? d.preventDefault() : d.returnValue = !1);
    }, bind: function(r, d) {
      this._handlers || (this._handlers = {});
      for (var n = t.$keyboardNavigation.shortcuts, s = n.parse(r), _ = 0; _ < s.length; _++)
        this._handlers[n.getHash(s[_])] = d;
    }, unbind: function(r) {
      for (var d = t.$keyboardNavigation.shortcuts, n = d.parse(r), s = 0; s < n.length; s++)
        this._handlers[d.getHash(n[s])] && delete this._handlers[d.getHash(n[s])];
    }, bindAll: function(r) {
      for (var d in r)
        this.bind(d, r[d]);
    }, initKeys: function() {
      this._handlers || (this._handlers = {}), this.keys && this.bindAll(this.keys);
    } };
  }(e), function(t) {
    t.$keyboardNavigation.getFocusableNodes = t._getFocusableNodes, t.$keyboardNavigation.trapFocus = function(r, d) {
      if (d.keyCode != 9)
        return !1;
      for (var n, s = t.$keyboardNavigation.getFocusableNodes(r), _ = document.activeElement, a = -1, o = 0; o < s.length; o++)
        if (s[o] == _) {
          a = o;
          break;
        }
      if (d.shiftKey) {
        if (n = s[a <= 0 ? s.length - 1 : a - 1])
          return n.focus(), d.preventDefault(), !0;
      } else if (n = s[a >= s.length - 1 ? 0 : a + 1])
        return n.focus(), d.preventDefault(), !0;
      return !1;
    };
  }(e), function(t) {
    t.$keyboardNavigation.marker = { clear: function() {
      for (var r = t.$container.querySelectorAll(".dhx_focus_slot"), d = 0; d < r.length; d++)
        r[d].parentNode.removeChild(r[d]);
    }, createElement: function() {
      var r = document.createElement("div");
      return r.setAttribute("tabindex", -1), r.className = "dhx_focus_slot", r;
    }, renderMultiple: function(r, d, n) {
      for (var s = [], _ = new Date(r), a = new Date(Math.min(d.valueOf(), t.date.add(t.date.day_start(new Date(r)), 1, "day").valueOf())); _.valueOf() < d.valueOf(); )
        s = s.concat(n.call(this, _, new Date(Math.min(a.valueOf(), d.valueOf())))), _ = t.date.day_start(t.date.add(_, 1, "day")), a = t.date.day_start(t.date.add(_, 1, "day")), a = new Date(Math.min(a.valueOf(), d.valueOf()));
      return s;
    }, render: function(r, d, n) {
      this.clear();
      var s = [], _ = t.$keyboardNavigation.TimeSlot.prototype._modes;
      switch (t.$keyboardNavigation.TimeSlot.prototype._getMode()) {
        case _.units:
          s = this.renderVerticalMarker(r, d, n);
          break;
        case _.timeline:
          s = this.renderTimelineMarker(r, d, n);
          break;
        case _.year:
          s = s.concat(this.renderMultiple(r, d, this.renderYearMarker));
          break;
        case _.month:
          s = this.renderMonthMarker(r, d);
          break;
        case _.weekAgenda:
          s = s.concat(this.renderMultiple(r, d, this.renderWeekAgendaMarker));
          break;
        case _.list:
          s = this.renderAgendaMarker(r, d);
          break;
        case _.dayColumns:
          s = s.concat(this.renderMultiple(r, d, this.renderVerticalMarker));
      }
      this.addWaiAriaLabel(s, r, d, n), this.addDataAttributes(s, r, d, n);
      for (var a = s.length - 1; a >= 0; a--)
        if (s[a].offsetWidth)
          return s[a];
      return null;
    }, addDataAttributes: function(r, d, n, s) {
      for (var _ = t.date.date_to_str(t.config.api_date), a = _(d), o = _(n), l = 0; l < r.length; l++)
        r[l].setAttribute("data-start-date", a), r[l].setAttribute("data-end-date", o), s && r[l].setAttribute("data-section", s);
    }, addWaiAriaLabel: function(r, d, n, s) {
      var _ = "", a = t.getState().mode, o = !1;
      if (_ += t.templates.day_date(d), t.date.day_start(new Date(d)).valueOf() != d.valueOf() && (_ += " " + t.templates.hour_scale(d), o = !0), t.date.day_start(new Date(d)).valueOf() != t.date.day_start(new Date(n)).valueOf() && (_ += " - " + t.templates.day_date(n), (o || t.date.day_start(new Date(n)).valueOf() != n.valueOf()) && (_ += " " + t.templates.hour_scale(n))), s) {
        if (t.matrix && t.matrix[a]) {
          const h = t.matrix[a], m = h.y_unit[h.order[s]];
          _ += ", " + t.templates[a + "_scale_label"](m.key, m.label, m);
        } else if (t._props && t._props[a]) {
          const h = t._props[a], m = h.options[h.order[s]];
          _ += ", " + t.templates[a + "_scale_text"](m.key, m.label, m);
        }
      }
      for (var l = 0; l < r.length; l++)
        t._waiAria.setAttributes(r[l], { "aria-label": _, "aria-live": "polite" });
    }, renderWeekAgendaMarker: function(r, d) {
      for (var n = t.$container.querySelectorAll(".dhx_wa_day_cont .dhx_wa_scale_bar"), s = t.date.week_start(new Date(t.getState().min_date)), _ = -1, a = t.date.day_start(new Date(r)), o = 0; o < n.length && (_++, t.date.day_start(new Date(s)).valueOf() != a.valueOf()); o++)
        s = t.date.add(s, 1, "day");
      return _ != -1 ? this._wrapDiv(n[_]) : [];
    }, _wrapDiv: function(r) {
      var d = this.createElement();
      return d.style.top = r.offsetTop + "px", d.style.left = r.offsetLeft + "px", d.style.width = r.offsetWidth + "px", d.style.height = r.offsetHeight + "px", r.appendChild(d), [d];
    }, renderYearMarker: function(r, d) {
      var n = t._get_year_cell(r);
      n.style.position = "relative";
      var s = this.createElement();
      return s.style.top = "0px", s.style.left = "0px", s.style.width = "100%", s.style.height = "100%", n.appendChild(s), [s];
    }, renderAgendaMarker: function(r, d) {
      var n = this.createElement();
      return n.style.height = "1px", n.style.width = "100%", n.style.opacity = 1, n.style.top = "0px", n.style.left = "0px", t.$container.querySelector(".dhx_cal_data").appendChild(n), [n];
    }, renderTimelineMarker: function(r, d, n) {
      var s = t._lame_copy({}, t.matrix[t._mode]), _ = s._scales;
      s.round_position = !1;
      var a = [], o = r ? new Date(r) : t._min_date, l = d ? new Date(d) : t._max_date;
      if (o.valueOf() < t._min_date.valueOf() && (o = new Date(t._min_date)), l.valueOf() > t._max_date.valueOf() && (l = new Date(t._max_date)), !s._trace_x)
        return a;
      for (var h = 0; h < s._trace_x.length && !t._is_column_visible(s._trace_x[h]); h++)
        ;
      if (h == s._trace_x.length)
        return a;
      var m = _[n];
      if (!(o < d && l > r))
        return a;
      var v = this.createElement();
      let u, c;
      function f(b, k) {
        k.setDate(1), k.setFullYear(b.getFullYear()), k.setMonth(b.getMonth()), k.setDate(b.getDate());
      }
      if (t.getView().days) {
        const b = new Date(r);
        f(t._min_date, b);
        const k = new Date(d);
        f(t._min_date, k), u = t._timeline_getX({ start_date: b }, !1, s), c = t._timeline_getX({ start_date: k }, !1, s);
      } else
        u = t._timeline_getX({ start_date: r }, !1, s), c = t._timeline_getX({ start_date: d }, !1, s);
      var p = s._section_height[n] - 1 || s.dy - 1, g = 0;
      t._isRender("cell") && (g = m.offsetTop, u += s.dx, c += s.dx, m = t.$container.querySelector(".dhx_cal_data"));
      var y = Math.max(1, c - u - 1);
      let x = "left";
      return t.config.rtl && (x = "right"), v.style.cssText = `height:${p}px; ${x}:${u}px; width:${y}px; top:${g}px;`, m && (m.appendChild(v), a.push(v)), a;
    }, renderMonthCell: function(r) {
      for (var d = t.$container.querySelectorAll(".dhx_month_head"), n = [], s = 0; s < d.length; s++)
        n.push(d[s].parentNode);
      var _ = -1, a = 0, o = -1, l = t.date.week_start(new Date(t.getState().min_date)), h = t.date.day_start(new Date(r));
      for (s = 0; s < n.length && (_++, o == 6 ? (a++, o = 0) : o++, t.date.day_start(new Date(l)).valueOf() != h.valueOf()); s++)
        l = t.date.add(l, 1, "day");
      if (_ == -1)
        return [];
      var m = t._colsS[o], v = t._colsS.heights[a], u = this.createElement();
      u.style.top = v + "px", u.style.left = m + "px", u.style.width = t._cols[o] + "px", u.style.height = (t._colsS.heights[a + 1] - v || t._colsS.height) + "px";
      var c = t.$container.querySelector(".dhx_cal_data"), f = c.querySelector(".dhx_cal_month_table");
      return f.nextSibling ? c.insertBefore(u, f.nextSibling) : c.appendChild(u), u;
    }, renderMonthMarker: function(r, d) {
      for (var n = [], s = r; s.valueOf() < d.valueOf(); )
        n.push(this.renderMonthCell(s)), s = t.date.add(s, 1, "day");
      return n;
    }, renderVerticalMarker: function(r, d, n) {
      var s = t.locate_holder_day(r), _ = [], a = null, o = t.config;
      if (t._ignores[s])
        return _;
      if (t._props && t._props[t._mode] && n) {
        var l = t._props[t._mode];
        s = l.order[n];
        var h = l.order[n];
        l.days > 1 ? s = t.locate_holder_day(r) + h : (s = h, l.size && s > l.position + l.size && (s = 0));
      }
      if (!(a = t.locate_holder(s)) || a.querySelector(".dhx_scale_hour"))
        return document.createElement("div");
      var m = Math.max(60 * r.getHours() + r.getMinutes(), 60 * o.first_hour), v = Math.min(60 * d.getHours() + d.getMinutes(), 60 * o.last_hour);
      if (!v && t.date.day_start(new Date(d)).valueOf() > t.date.day_start(new Date(r)).valueOf() && (v = 60 * o.last_hour), v <= m)
        return [];
      var u = this.createElement(), c = t.config.hour_size_px * o.last_hour + 1, f = 36e5;
      return u.style.top = Math.round((60 * m * 1e3 - t.config.first_hour * f) * t.config.hour_size_px / f) % c + "px", u.style.lineHeight = u.style.height = Math.max(Math.round(60 * (v - m) * 1e3 * t.config.hour_size_px / f) % c, 1) + "px", u.style.width = "100%", a.appendChild(u), _.push(u), _[0];
    } };
  }(e), function(t) {
    t.$keyboardNavigation.SchedulerNode = function() {
    }, t.$keyboardNavigation.SchedulerNode.prototype = t._compose(t.$keyboardNavigation.EventHandler, { getDefaultNode: function() {
      var r = new t.$keyboardNavigation.TimeSlot();
      return r.isValid() || (r = r.fallback()), r;
    }, _modes: { month: "month", year: "year", dayColumns: "dayColumns", timeline: "timeline", units: "units", weekAgenda: "weekAgenda", list: "list" }, getMode: function() {
      var r = t.getState().mode;
      return t.matrix && t.matrix[r] ? this._modes.timeline : t._props && t._props[r] ? this._modes.units : r == "month" ? this._modes.month : r == "year" ? this._modes.year : r == "week_agenda" ? this._modes.weekAgenda : r == "map" || r == "agenda" || t._grid && t["grid_" + r] ? this._modes.list : this._modes.dayColumns;
    }, focus: function() {
      t.focus();
    }, blur: function() {
    }, disable: function() {
      t.$container.setAttribute("tabindex", "0");
    }, enable: function() {
      t.$container && t.$container.removeAttribute("tabindex");
    }, isEnabled: function() {
      return t.$container.hasAttribute("tabindex");
    }, _compareEvents: function(r, d) {
      return r.start_date.valueOf() == d.start_date.valueOf() ? r.id > d.id ? 1 : -1 : r.start_date.valueOf() > d.start_date.valueOf() ? 1 : -1;
    }, _pickEvent: function(r, d, n, s) {
      var _ = t.getState();
      r = new Date(Math.max(_.min_date.valueOf(), r.valueOf())), d = new Date(Math.min(_.max_date.valueOf(), d.valueOf()));
      var a = t.getEvents(r, d);
      a.sort(this._compareEvents), s && (a = a.reverse());
      for (var o = !!n, l = 0; l < a.length && o; l++)
        a[l].id == n && (o = !1), a.splice(l, 1), l--;
      for (l = 0; l < a.length; l++)
        if (new t.$keyboardNavigation.Event(a[l].id).getNode())
          return a[l];
      return null;
    }, nextEventHandler: function(r) {
      var d = t.$keyboardNavigation.dispatcher.activeNode, n = r || d && d.eventId, s = null;
      if (n && t.getEvent(n)) {
        var _ = t.getEvent(n);
        s = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(_.start_date, t.date.add(_.start_date, 1, "year"), _.id, !1);
      }
      if (!s && !r) {
        var a = t.getState();
        s = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(a.min_date, t.date.add(a.min_date, 1, "year"), null, !1);
      }
      if (s) {
        var o = new t.$keyboardNavigation.Event(s.id);
        o.isValid() ? (d && d.blur(), t.$keyboardNavigation.dispatcher.setActiveNode(o)) : this.nextEventHandler(s.id);
      }
    }, prevEventHandler: function(r) {
      var d = t.$keyboardNavigation.dispatcher.activeNode, n = r || d && d.eventId, s = null;
      if (n && t.getEvent(n)) {
        var _ = t.getEvent(n);
        s = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(t.date.add(_.end_date, -1, "year"), _.end_date, _.id, !0);
      }
      if (!s && !r) {
        var a = t.getState();
        s = t.$keyboardNavigation.SchedulerNode.prototype._pickEvent(t.date.add(a.max_date, -1, "year"), a.max_date, null, !0);
      }
      if (s) {
        var o = new t.$keyboardNavigation.Event(s.id);
        o.isValid() ? (d && d.blur(), t.$keyboardNavigation.dispatcher.setActiveNode(o)) : this.prevEventHandler(s.id);
      }
    }, keys: { "alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9": function(r) {
      var d = t.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab"), n = r.key;
      n === void 0 && (n = r.keyCode - 48), d[1 * n - 1] && d[1 * n - 1].click();
    }, "ctrl+left,meta+left": function(r) {
      t._click.dhx_cal_prev_button();
    }, "ctrl+right,meta+right": function(r) {
      t._click.dhx_cal_next_button();
    }, "ctrl+up,meta+up": function(r) {
      t.$container.querySelector(".dhx_cal_data").scrollTop -= 20;
    }, "ctrl+down,meta+down": function(r) {
      t.$container.querySelector(".dhx_cal_data").scrollTop += 20;
    }, e: function() {
      this.nextEventHandler();
    }, home: function() {
      t.setCurrentView(/* @__PURE__ */ new Date());
    }, "shift+e": function() {
      this.prevEventHandler();
    }, "ctrl+enter,meta+enter": function() {
      t.addEventNow({ start_date: new Date(t.getState().date) });
    }, "ctrl+c,meta+c": function(r) {
      t._key_nav_copy_paste(r);
    }, "ctrl+v,meta+v": function(r) {
      t._key_nav_copy_paste(r);
    }, "ctrl+x,meta+x": function(r) {
      t._key_nav_copy_paste(r);
    } } }), t.$keyboardNavigation.SchedulerNode.prototype.bindAll(t.$keyboardNavigation.SchedulerNode.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.KeyNavNode = function() {
    }, t.$keyboardNavigation.KeyNavNode.prototype = t._compose(t.$keyboardNavigation.EventHandler, { isValid: function() {
      return !0;
    }, fallback: function() {
      return null;
    }, moveTo: function(r) {
      t.$keyboardNavigation.dispatcher.setActiveNode(r);
    }, compareTo: function(r) {
      if (!r)
        return !1;
      for (var d in this) {
        if (!!this[d] != !!r[d])
          return !1;
        var n = !(!this[d] || !this[d].toString), s = !(!r[d] || !r[d].toString);
        if (s != n)
          return !1;
        if (s && n) {
          if (r[d].toString() != this[d].toString())
            return !1;
        } else if (r[d] != this[d])
          return !1;
      }
      return !0;
    }, getNode: function() {
    }, focus: function() {
      var r = this.getNode();
      r && (r.setAttribute("tabindex", "-1"), r.focus && r.focus());
    }, blur: function() {
      var r = this.getNode();
      r && r.setAttribute("tabindex", "-1");
    } });
  }(e), function(t) {
    t.$keyboardNavigation.HeaderCell = function(r) {
      this.index = r || 0;
    }, t.$keyboardNavigation.HeaderCell.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { getNode: function(r) {
      r = r || this.index || 0;
      var d = this.getNodes();
      if (d[r])
        return d[r];
    }, getNodes: function(r) {
      r = r || [".dhx_cal_navline .dhx_cal_prev_button", ".dhx_cal_navline .dhx_cal_next_button", ".dhx_cal_navline .dhx_cal_today_button", ".dhx_cal_navline .dhx_cal_tab"].join(", ");
      var d = Array.prototype.slice.call(t.$container.querySelectorAll(r));
      return d.sort(function(n, s) {
        return n.offsetLeft - s.offsetLeft;
      }), d;
    }, _handlers: null, isValid: function() {
      return !!this.getNode(this.index);
    }, fallback: function() {
      var r = this.getNode(0);
      return r || (r = new t.$keyboardNavigation.TimeSlot()), r;
    }, keys: { left: function() {
      var r = this.index - 1;
      r < 0 && (r = this.getNodes().length - 1), this.moveTo(new t.$keyboardNavigation.HeaderCell(r));
    }, right: function() {
      var r = this.index + 1;
      r >= this.getNodes().length && (r = 0), this.moveTo(new t.$keyboardNavigation.HeaderCell(r));
    }, down: function() {
      this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, enter: function() {
      var r = this.getNode();
      r && r.click();
    } } }), t.$keyboardNavigation.HeaderCell.prototype.bindAll(t.$keyboardNavigation.HeaderCell.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.Event = function(r) {
      if (this.eventId = null, t.getEvent(r)) {
        var d = t.getEvent(r);
        this.start = new Date(d.start_date), this.end = new Date(d.end_date), this.section = this._getSection(d), this.eventId = r;
      }
    }, t.$keyboardNavigation.Event.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { _getNodes: function() {
      return Array.prototype.slice.call(t.$container.querySelectorAll("[" + t.config.event_attribute + "]"));
    }, _modes: t.$keyboardNavigation.SchedulerNode.prototype._modes, getMode: t.$keyboardNavigation.SchedulerNode.prototype.getMode, _handlers: null, isValid: function() {
      return !(!t.getEvent(this.eventId) || !this.getNode());
    }, fallback: function() {
      var r = this._getNodes()[0], d = null;
      if (r && t._locate_event(r)) {
        var n = t._locate_event(r);
        d = new t.$keyboardNavigation.Event(n);
      } else
        d = new t.$keyboardNavigation.TimeSlot();
      return d;
    }, isScrolledIntoView: function(r) {
      var d = r.getBoundingClientRect(), n = t.$container.querySelector(".dhx_cal_data").getBoundingClientRect();
      return !(d.bottom < n.top || d.top > n.bottom);
    }, getNode: function() {
      var r = "[" + t.config.event_attribute + "='" + this.eventId + "']", d = t.$keyboardNavigation.dispatcher.getInlineEditor(this.eventId);
      if (d)
        return d;
      if (t.isMultisectionEvent && t.isMultisectionEvent(t.getEvent(this.eventId))) {
        for (var n = t.$container.querySelectorAll(r), s = 0; s < n.length; s++)
          if (this.isScrolledIntoView(n[s]))
            return n[s];
        return n[0];
      }
      return t.$container.querySelector(r);
    }, focus: function() {
      var r = t.getEvent(this.eventId), d = t.getState();
      (r.start_date.valueOf() > d.max_date.valueOf() || r.end_date.valueOf() <= d.min_date.valueOf()) && t.setCurrentView(r.start_date);
      var n = this.getNode();
      this.isScrolledIntoView(n) ? t.$keyboardNavigation.dispatcher.keepScrollPosition((function() {
        t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
      }).bind(this)) : t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getSection: function(r) {
      var d = null, n = t.getState().mode;
      return t.matrix && t.matrix[n] ? d = r[t.matrix[t.getState().mode].y_property] : t._props && t._props[n] && (d = r[t._props[n].map_to]), d;
    }, _moveToSlot: function(r) {
      var d = t.getEvent(this.eventId);
      if (d) {
        var n = this._getSection(d), s = new t.$keyboardNavigation.TimeSlot(d.start_date, null, n);
        this.moveTo(s.nextSlot(s, r));
      } else
        this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, keys: { left: function() {
      this._moveToSlot("left");
    }, right: function() {
      this._moveToSlot("right");
    }, down: function() {
      this.getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler() : this._moveToSlot("down");
    }, space: function() {
      var r = this.getNode();
      r && r.click ? r.click() : this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, up: function() {
      this.getMode() == this._modes.list ? t.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler() : this._moveToSlot("up");
    }, delete: function() {
      t.getEvent(this.eventId) ? t._click.buttons.delete(this.eventId) : this.moveTo(new t.$keyboardNavigation.TimeSlot());
    }, enter: function() {
      t.getEvent(this.eventId) ? t.showLightbox(this.eventId) : this.moveTo(new t.$keyboardNavigation.TimeSlot());
    } } }), t.$keyboardNavigation.Event.prototype.bindAll(t.$keyboardNavigation.Event.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.TimeSlot = function(r, d, n, s) {
      var _ = t.getState(), a = t.matrix && t.matrix[_.mode];
      r || (r = this.getDefaultDate()), d || (d = a ? t.date.add(r, a.x_step, a.x_unit) : t.date.add(r, t.config.key_nav_step, "minute")), this.section = n || this._getDefaultSection(), this.start_date = new Date(r), this.end_date = new Date(d), this.movingDate = s || null;
    }, t.$keyboardNavigation.TimeSlot.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { _handlers: null, getDefaultDate: function() {
      var r, d = t.getState(), n = new Date(d.date);
      n.setSeconds(0), n.setMilliseconds(0);
      var s = /* @__PURE__ */ new Date();
      s.setSeconds(0), s.setMilliseconds(0);
      var _ = t.matrix && t.matrix[d.mode], a = !1;
      if (n.valueOf() === s.valueOf() && (a = !0), _)
        a ? (_.x_unit === "day" ? (s.setHours(0), s.setMinutes(0)) : _.x_unit === "hour" && s.setMinutes(0), r = s) : r = t.date[_.name + "_start"](new Date(d.date)), r = this.findVisibleColumn(r);
      else if (r = new Date(t.getState().min_date), a && (r = s), r = this.findVisibleColumn(r), a || r.setHours(t.config.first_hour), !t._table_view) {
        var o = t.$container.querySelector(".dhx_cal_data");
        o.scrollTop && r.setHours(t.config.first_hour + Math.ceil(o.scrollTop / t.config.hour_size_px));
      }
      return r;
    }, clone: function(r) {
      return new t.$keyboardNavigation.TimeSlot(r.start_date, r.end_date, r.section, r.movingDate);
    }, _getMultisectionView: function() {
      var r, d = t.getState();
      return t._props && t._props[d.mode] ? r = t._props[d.mode] : t.matrix && t.matrix[d.mode] && (r = t.matrix[d.mode]), r;
    }, _getDefaultSection: function() {
      var r = null;
      return this._getMultisectionView() && !r && (r = this._getNextSection()), r;
    }, _getNextSection: function(r, d) {
      var n = this._getMultisectionView(), s = n.order[r], _ = s;
      (_ = s !== void 0 ? s + d : n.size && n.position ? n.position : 0) < 0 && (_ = 0);
      var a = n.options || n.y_unit;
      return _ >= a.length && (_ = a.length - 1), a[_] ? a[_].key : null;
    }, isValid: function() {
      var r = t.getState();
      if (this.start_date.valueOf() < r.min_date.valueOf() || this.start_date.valueOf() >= r.max_date.valueOf() || !this.isVisible(this.start_date, this.end_date))
        return !1;
      var d = this._getMultisectionView();
      return !d || d.order[this.section] !== void 0;
    }, fallback: function() {
      var r = new t.$keyboardNavigation.TimeSlot();
      return r.isValid() ? r : new t.$keyboardNavigation.DataArea();
    }, getNodes: function() {
      return Array.prototype.slice.call(t.$container.querySelectorAll(".dhx_focus_slot"));
    }, getNode: function() {
      return this.getNodes()[0];
    }, focus: function() {
      this.section && t.getView() && t.getView().smart_rendering && t.getView().scrollTo && !t.$container.querySelector(`[data-section-id="${this.section}"]`) && t.getView().scrollTo({ section: this.section }), t.$keyboardNavigation.marker.render(this.start_date, this.end_date, this.section), t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this), t.$keyboardNavigation._pasteDate = this.start_date, t.$keyboardNavigation._pasteSection = this.section;
    }, blur: function() {
      t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this), t.$keyboardNavigation.marker.clear();
    }, _modes: t.$keyboardNavigation.SchedulerNode.prototype._modes, _getMode: t.$keyboardNavigation.SchedulerNode.prototype.getMode, addMonthDate: function(r, d, n) {
      var s;
      switch (d) {
        case "up":
          s = t.date.add(r, -1, "week");
          break;
        case "down":
          s = t.date.add(r, 1, "week");
          break;
        case "left":
          s = t.date.day_start(t.date.add(r, -1, "day")), s = this.findVisibleColumn(s, -1);
          break;
        case "right":
          s = t.date.day_start(t.date.add(r, 1, "day")), s = this.findVisibleColumn(s, 1);
          break;
        default:
          s = t.date.day_start(new Date(r));
      }
      var _ = t.getState();
      return (r.valueOf() < _.min_date.valueOf() || !n && r.valueOf() >= _.max_date.valueOf()) && (s = new Date(_.min_date)), s;
    }, nextMonthSlot: function(r, d, n) {
      var s, _;
      return (s = this.addMonthDate(r.start_date, d, n)).setHours(t.config.first_hour), (_ = new Date(s)).setHours(t.config.last_hour), { start_date: s, end_date: _ };
    }, _alignTimeSlot: function(r, d, n, s) {
      for (var _ = new Date(d); _.valueOf() < r.valueOf(); )
        _ = t.date.add(_, s, n);
      return _.valueOf() > r.valueOf() && (_ = t.date.add(_, -s, n)), _;
    }, nextTimelineSlot: function(r, d, n) {
      var s = t.getState(), _ = t.matrix[s.mode], a = this._alignTimeSlot(r.start_date, t.date[_.name + "_start"](new Date(r.start_date)), _.x_unit, _.x_step), o = this._alignTimeSlot(r.end_date, t.date[_.name + "_start"](new Date(r.end_date)), _.x_unit, _.x_step);
      o.valueOf() <= a.valueOf() && (o = t.date.add(a, _.x_step, _.x_unit));
      var l = this.clone(r);
      switch (l.start_date = a, l.end_date = o, l.section = r.section || this._getNextSection(), d) {
        case "up":
          l.section = this._getNextSection(r.section, -1);
          break;
        case "down":
          l.section = this._getNextSection(r.section, 1);
          break;
        case "left":
          l.start_date = this.findVisibleColumn(t.date.add(l.start_date, -_.x_step, _.x_unit), -1), l.end_date = t.date.add(l.start_date, _.x_step, _.x_unit);
          break;
        case "right":
          l.start_date = this.findVisibleColumn(t.date.add(l.start_date, _.x_step, _.x_unit), 1), l.end_date = t.date.add(l.start_date, _.x_step, _.x_unit);
      }
      return (l.start_date.valueOf() < s.min_date.valueOf() || l.start_date.valueOf() >= s.max_date.valueOf()) && (n && l.start_date.valueOf() >= s.max_date.valueOf() ? l.start_date = new Date(s.max_date) : (l.start_date = t.date[s.mode + "_start"](t.date.add(s.date, d == "left" ? -1 : 1, s.mode)), l.end_date = t.date.add(l.start_date, _.x_step, _.x_unit))), l;
    }, nextUnitsSlot: function(r, d, n) {
      var s = this.clone(r);
      s.section = r.section || this._getNextSection();
      var _ = r.section || this._getNextSection(), a = t.getState(), o = t._props[a.mode];
      switch (d) {
        case "left":
          _ = this._getNextSection(r.section, -1);
          var l = o.size ? o.size - 1 : o.options.length;
          o.days > 1 && o.order[_] == l - 1 && t.date.add(r.start_date, -1, "day").valueOf() >= a.min_date.valueOf() && (s = this.nextDaySlot(r, d, n));
          break;
        case "right":
          _ = this._getNextSection(r.section, 1), o.days > 1 && !o.order[_] && t.date.add(r.start_date, 1, "day").valueOf() < a.max_date.valueOf() && (s = this.nextDaySlot(r, d, n));
          break;
        default:
          s = this.nextDaySlot(r, d, n), _ = r.section;
      }
      return s.section = _, s;
    }, _moveDate: function(r, d) {
      var n = this.findVisibleColumn(t.date.add(r, d, "day"), d);
      return n.setHours(r.getHours()), n.setMinutes(r.getMinutes()), n;
    }, isBeforeLastHour: function(r, d) {
      var n = r.getMinutes(), s = r.getHours(), _ = t.config.last_hour;
      return s < _ || !d && (_ == 24 || s == _) && !n;
    }, isAfterFirstHour: function(r, d) {
      var n = r.getMinutes(), s = r.getHours(), _ = t.config.first_hour, a = t.config.last_hour;
      return s >= _ || !d && !n && (!s && a == 24 || s == a);
    }, isInVisibleDayTime: function(r, d) {
      return this.isBeforeLastHour(r, d) && this.isAfterFirstHour(r, d);
    }, nextDaySlot: function(r, d, n) {
      var s, _, a = t.config.key_nav_step, o = this._alignTimeSlot(r.start_date, t.date.day_start(new Date(r.start_date)), "minute", a), l = r.start_date;
      switch (d) {
        case "up":
          if (s = t.date.add(o, -a, "minute"), !this.isInVisibleDayTime(s, !0) && (!n || this.isInVisibleDayTime(l, !0))) {
            var h = !0;
            n && t.date.date_part(new Date(s)).valueOf() != t.date.date_part(new Date(l)).valueOf() && (h = !1), h && (s = this.findVisibleColumn(t.date.add(r.start_date, -1, "day"), -1)), s.setHours(t.config.last_hour), s.setMinutes(0), s = t.date.add(s, -a, "minute");
          }
          _ = t.date.add(s, a, "minute");
          break;
        case "down":
          s = t.date.add(o, a, "minute");
          var m = n ? s : t.date.add(s, a, "minute");
          this.isInVisibleDayTime(m, !1) || n && !this.isInVisibleDayTime(l, !1) || (n ? (h = !0, t.date.date_part(new Date(l)).valueOf() == l.valueOf() && (h = !1), h && (s = this.findVisibleColumn(t.date.add(r.start_date, 1, "day"), 1)), s.setHours(t.config.first_hour), s.setMinutes(0), s = t.date.add(s, a, "minute")) : ((s = this.findVisibleColumn(t.date.add(r.start_date, 1, "day"), 1)).setHours(t.config.first_hour), s.setMinutes(0))), _ = t.date.add(s, a, "minute");
          break;
        case "left":
          s = this._moveDate(r.start_date, -1), _ = this._moveDate(r.end_date, -1);
          break;
        case "right":
          s = this._moveDate(r.start_date, 1), _ = this._moveDate(r.end_date, 1);
          break;
        default:
          s = o, _ = t.date.add(s, a, "minute");
      }
      return { start_date: s, end_date: _ };
    }, nextWeekAgendaSlot: function(r, d) {
      var n, s, _ = t.getState();
      switch (d) {
        case "down":
        case "left":
          n = t.date.day_start(t.date.add(r.start_date, -1, "day")), n = this.findVisibleColumn(n, -1);
          break;
        case "up":
        case "right":
          n = t.date.day_start(t.date.add(r.start_date, 1, "day")), n = this.findVisibleColumn(n, 1);
          break;
        default:
          n = t.date.day_start(r.start_date);
      }
      return (r.start_date.valueOf() < _.min_date.valueOf() || r.start_date.valueOf() >= _.max_date.valueOf()) && (n = new Date(_.min_date)), (s = new Date(n)).setHours(t.config.last_hour), { start_date: n, end_date: s };
    }, nextAgendaSlot: function(r, d) {
      return { start_date: r.start_date, end_date: r.end_date };
    }, isDateVisible: function(r) {
      if (!t._ignores_detected)
        return !0;
      var d, n = t.matrix && t.matrix[t.getState().mode];
      return d = n ? t._get_date_index(n, r) : t.locate_holder_day(r), !t._ignores[d];
    }, findVisibleColumn: function(r, d) {
      var n = r;
      d = d || 1;
      for (var s = t.getState(); !this.isDateVisible(n) && (d > 0 && n.valueOf() <= s.max_date.valueOf() || d < 0 && n.valueOf() >= s.min_date.valueOf()); )
        n = this.nextDateColumn(n, d);
      return n;
    }, nextDateColumn: function(r, d) {
      d = d || 1;
      var n = t.matrix && t.matrix[t.getState().mode];
      return n ? t.date.add(r, d * n.x_step, n.x_unit) : t.date.day_start(t.date.add(r, d, "day"));
    }, isVisible: function(r, d) {
      if (!t._ignores_detected)
        return !0;
      for (var n = new Date(r); n.valueOf() < d.valueOf(); ) {
        if (this.isDateVisible(n))
          return !0;
        n = this.nextDateColumn(n);
      }
      return !1;
    }, nextSlot: function(r, d, n, s) {
      var _;
      n = n || this._getMode();
      var a = t.$keyboardNavigation.TimeSlot.prototype.clone(r);
      switch (n) {
        case this._modes.units:
          _ = this.nextUnitsSlot(a, d, s);
          break;
        case this._modes.timeline:
          _ = this.nextTimelineSlot(a, d, s);
          break;
        case this._modes.year:
        case this._modes.month:
          _ = this.nextMonthSlot(a, d, s);
          break;
        case this._modes.weekAgenda:
          _ = this.nextWeekAgendaSlot(a, d, s);
          break;
        case this._modes.list:
          _ = this.nextAgendaSlot(a, d, s);
          break;
        case this._modes.dayColumns:
          _ = this.nextDaySlot(a, d, s);
      }
      return _.start_date.valueOf() >= _.end_date.valueOf() && (_ = this.nextSlot(_, d, n)), t.$keyboardNavigation.TimeSlot.prototype.clone(_);
    }, extendSlot: function(r, d) {
      var n;
      switch (this._getMode()) {
        case this._modes.units:
          n = d == "left" || d == "right" ? this.nextUnitsSlot(r, d) : this.extendUnitsSlot(r, d);
          break;
        case this._modes.timeline:
          n = d == "down" || d == "up" ? this.nextTimelineSlot(r, d) : this.extendTimelineSlot(r, d);
          break;
        case this._modes.year:
        case this._modes.month:
          n = this.extendMonthSlot(r, d);
          break;
        case this._modes.dayColumns:
          n = this.extendDaySlot(r, d);
          break;
        case this._modes.weekAgenda:
          n = this.extendWeekAgendaSlot(r, d);
          break;
        default:
          n = r;
      }
      var s = t.getState();
      return n.start_date.valueOf() < s.min_date.valueOf() && (n.start_date = this.findVisibleColumn(s.min_date), n.start_date.setHours(t.config.first_hour)), n.end_date.valueOf() > s.max_date.valueOf() && (n.end_date = this.findVisibleColumn(s.max_date, -1)), t.$keyboardNavigation.TimeSlot.prototype.clone(n);
    }, extendTimelineSlot: function(r, d) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, r, d, "timeline");
    }, extendWeekAgendaSlot: function(r, d) {
      return this.extendGenericSlot({ left: "start_date", right: "end_date" }, r, d, "weekAgenda");
    }, extendGenericSlot: function(r, d, n, s) {
      var _, a = d.movingDate;
      if (a || (a = r[n]), !a || !r[n])
        return d;
      if (!n)
        return t.$keyboardNavigation.TimeSlot.prototype.clone(d);
      (_ = this.nextSlot({ start_date: d[a], section: d.section }, n, s, !0)).start_date.valueOf() == d.start_date.valueOf() && (_ = this.nextSlot({ start_date: _.start_date, section: _.section }, n, s, !0)), _.movingDate = a;
      var o = this.extendSlotDates(d, _, _.movingDate);
      return o.end_date.valueOf() <= o.start_date.valueOf() && (_.movingDate = _.movingDate == "end_date" ? "start_date" : "end_date"), o = this.extendSlotDates(d, _, _.movingDate), _.start_date = o.start_date, _.end_date = o.end_date, _;
    }, extendSlotDates: function(r, d, n) {
      var s = { start_date: null, end_date: null };
      return n == "start_date" ? (s.start_date = d.start_date, s.end_date = r.end_date) : (s.start_date = r.start_date, s.end_date = d.start_date), s;
    }, extendMonthSlot: function(r, d) {
      return (r = this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, r, d, "month")).start_date.setHours(t.config.first_hour), r.end_date = t.date.add(r.end_date, -1, "day"), r.end_date.setHours(t.config.last_hour), r;
    }, extendUnitsSlot: function(r, d) {
      var n;
      switch (d) {
        case "down":
        case "up":
          n = this.extendDaySlot(r, d);
          break;
        default:
          n = r;
      }
      return n.section = r.section, n;
    }, extendDaySlot: function(r, d) {
      return this.extendGenericSlot({ up: "start_date", down: "end_date", left: "start_date", right: "end_date" }, r, d, "dayColumns");
    }, scrollSlot: function(r) {
      var d = t.getState(), n = this.nextSlot(this, r);
      (n.start_date.valueOf() < d.min_date.valueOf() || n.start_date.valueOf() >= d.max_date.valueOf()) && t.setCurrentView(new Date(n.start_date)), this.moveTo(n);
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
      var r = { start_date: new Date(this.start_date), end_date: new Date(this.end_date) }, d = t.getState().mode;
      t.matrix && t.matrix[d] ? r[t.matrix[t.getState().mode].y_property] = this.section : t._props && t._props[d] && (r[t._props[d].map_to] = this.section), t.addEventNow(r);
    } } }), t.$keyboardNavigation.TimeSlot.prototype.bindAll(t.$keyboardNavigation.TimeSlot.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.MinicalButton = function(r, d) {
      this.container = r, this.index = d || 0;
    }, t.$keyboardNavigation.MinicalButton.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { isValid: function() {
      return !!this.container.offsetWidth;
    }, fallback: function() {
      var r = new t.$keyboardNavigation.TimeSlot();
      return r.isValid() ? r : new t.$keyboardNavigation.DataArea();
    }, focus: function() {
      t.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0"), t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, getNode: function() {
      return this.index ? this.container.querySelector(".dhx_cal_next_button") : this.container.querySelector(".dhx_cal_prev_button");
    }, keys: { right: function(r) {
      this.moveTo(new t.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, left: function(r) {
      this.moveTo(new t.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
    }, down: function() {
      var r = new t.$keyboardNavigation.MinicalCell(this.container, 0, 0);
      r && !r.isValid() && (r = r.fallback()), this.moveTo(r);
    }, enter: function(r) {
      this.getNode().click();
    } } }), t.$keyboardNavigation.MinicalButton.prototype.bindAll(t.$keyboardNavigation.MinicalButton.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.MinicalCell = function(r, d, n) {
      this.container = r, this.row = d || 0, this.col = n || 0;
    }, t.$keyboardNavigation.MinicalCell.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { isValid: function() {
      var r = this._getGrid();
      return !(!r[this.row] || !r[this.row][this.col]);
    }, fallback: function() {
      var r = this.row, d = this.col, n = this._getGrid();
      n[r] || (r = 0);
      var s = !0;
      if (r > n.length / 2 && (s = !1), !n[r]) {
        var _ = new t.$keyboardNavigation.TimeSlot();
        return _.isValid() ? _ : new t.$keyboardNavigation.DataArea();
      }
      if (s) {
        for (var a = d; n[r] && a < n[r].length; a++)
          if (n[r][a] || a != n[r].length - 1 || (r++, d = 0), n[r][a])
            return new t.$keyboardNavigation.MinicalCell(this.container, r, a);
      } else
        for (a = d; n[r] && a < n[r].length; a--)
          if (n[r][a] || a || (d = n[--r].length - 1), n[r][a])
            return new t.$keyboardNavigation.MinicalCell(this.container, r, a);
      return new t.$keyboardNavigation.MinicalButton(this.container, 0);
    }, focus: function() {
      t.$keyboardNavigation.dispatcher.globalNode.disable(), this.container.removeAttribute("tabindex"), t.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    }, blur: function() {
      this.container.setAttribute("tabindex", "0"), t.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    }, _getNode: function(r, d) {
      return this.container.querySelector(".dhx_year_body tr:nth-child(" + (r + 1) + ") td:nth-child(" + (d + 1) + ")");
    }, getNode: function() {
      return this._getNode(this.row, this.col);
    }, _getGrid: function() {
      for (var r = this.container.querySelectorAll(".dhx_year_body tr"), d = [], n = 0; n < r.length; n++) {
        d[n] = [];
        for (var s = r[n].querySelectorAll("td"), _ = 0; _ < s.length; _++) {
          var a = s[_], o = !0, l = t._getClassName(a);
          (l.indexOf("dhx_after") > -1 || l.indexOf("dhx_before") > -1 || l.indexOf("dhx_scale_ignore") > -1) && (o = !1), d[n][_] = o;
        }
      }
      return d;
    }, keys: { right: function(r) {
      var d = this._getGrid(), n = this.row, s = this.col + 1;
      d[n] && d[n][s] || (d[n + 1] ? (n += 1, s = 0) : s = this.col);
      var _ = new t.$keyboardNavigation.MinicalCell(this.container, n, s);
      _.isValid() || (_ = _.fallback()), this.moveTo(_);
    }, left: function(r) {
      var d = this._getGrid(), n = this.row, s = this.col - 1;
      d[n] && d[n][s] || (s = d[n - 1] ? d[n -= 1].length - 1 : this.col);
      var _ = new t.$keyboardNavigation.MinicalCell(this.container, n, s);
      _.isValid() || (_ = _.fallback()), this.moveTo(_);
    }, down: function() {
      var r = this._getGrid(), d = this.row + 1, n = this.col;
      r[d] && r[d][n] || (d = this.row);
      var s = new t.$keyboardNavigation.MinicalCell(this.container, d, n);
      s.isValid() || (s = s.fallback()), this.moveTo(s);
    }, up: function() {
      var r = this._getGrid(), d = this.row - 1, n = this.col;
      if (r[d] && r[d][n]) {
        var s = new t.$keyboardNavigation.MinicalCell(this.container, d, n);
        s.isValid() || (s = s.fallback()), this.moveTo(s);
      } else {
        var _ = 0;
        this.col > r[this.row].length / 2 && (_ = 1), this.moveTo(new t.$keyboardNavigation.MinicalButton(this.container, _));
      }
    }, enter: function(r) {
      this.getNode().querySelector(".dhx_month_head").click();
    } } }), t.$keyboardNavigation.MinicalCell.prototype.bindAll(t.$keyboardNavigation.MinicalCell.prototype.keys);
  }(e), function(t) {
    t.$keyboardNavigation.DataArea = function(r) {
      this.index = r || 0;
    }, t.$keyboardNavigation.DataArea.prototype = t._compose(t.$keyboardNavigation.KeyNavNode, { getNode: function(r) {
      return t.$container.querySelector(".dhx_cal_data");
    }, _handlers: null, isValid: function() {
      return !0;
    }, fallback: function() {
      return this;
    }, keys: { "up,down,right,left": function() {
      this.moveTo(new t.$keyboardNavigation.TimeSlot());
    } } }), t.$keyboardNavigation.DataArea.prototype.bindAll(t.$keyboardNavigation.DataArea.prototype.keys);
  }(e), Ma(e), function(t) {
    t.$keyboardNavigation.dispatcher = { isActive: !1, activeNode: null, globalNode: new t.$keyboardNavigation.SchedulerNode(), keepScrollPosition: function(r) {
      var d, n, s = t.$container.querySelector(".dhx_timeline_scrollable_data");
      s || (s = t.$container.querySelector(".dhx_cal_data")), s && (d = s.scrollTop, n = s.scrollLeft), r(), s && (s.scrollTop = d, s.scrollLeft = n);
    }, enable: function() {
      if (t.$container) {
        this.isActive = !0;
        var r = this;
        this.keepScrollPosition(function() {
          r.globalNode.enable(), r.setActiveNode(r.getActiveNode());
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
      var r = this.activeNode;
      return r && !r.isValid() && (r = r.fallback()), r;
    }, focusGlobalNode: function() {
      this.blurNode(this.globalNode), this.focusNode(this.globalNode);
    }, setActiveNode: function(r) {
      r && r.isValid() && (this.activeNode && this.activeNode.compareTo(r) || this.isEnabled() && (this.blurNode(this.activeNode), this.activeNode = r, this.focusNode(this.activeNode)));
    }, focusNode: function(r) {
      r && r.focus && (r.focus(), r.getNode && document.activeElement != r.getNode() && this.setActiveNode(new t.$keyboardNavigation.DataArea()));
    }, blurNode: function(r) {
      r && r.blur && r.blur();
    }, getInlineEditor: function(r) {
      var d = t.$container.querySelector(".dhx_cal_editor[" + t.config.event_attribute + "='" + r + "'] textarea");
      return d && d.offsetWidth ? d : null;
    }, keyDownHandler: function(r) {
      if (!r.defaultPrevented) {
        var d = this.getActiveNode();
        if ((!t.$keyboardNavigation.isModal() || d && d.container && t.utils.dom.locateCss({ target: d.container }, "dhx_minical_popup", !1)) && (!t.getState().editor_id || !this.getInlineEditor(t.getState().editor_id)) && this.isEnabled()) {
          r = r || window.event;
          var n = this.globalNode, s = t.$keyboardNavigation.shortcuts.getCommandFromEvent(r);
          d ? d.findHandler(s) ? d.doAction(s, r) : n.findHandler(s) && n.doAction(s, r) : this.setDefaultNode();
        }
      }
    }, _timeout: null, delay: function(r, d) {
      clearTimeout(this._timeout), this._timeout = setTimeout(r, d || 1);
    } };
  }(e), Ta(e), function() {
    Aa(e), function(_) {
      _.$keyboardNavigation._minicalendars = [], _.$keyboardNavigation.isMinical = function(a) {
        for (var o = _.$keyboardNavigation._minicalendars, l = 0; l < o.length; l++)
          if (this.isChildOf(a, o[l]))
            return !0;
        return !1;
      }, _.$keyboardNavigation.isChildOf = function(a, o) {
        for (; a && a !== o; )
          a = a.parentNode;
        return a === o;
      }, _.$keyboardNavigation.patchMinicalendar = function() {
        var a = _.$keyboardNavigation.dispatcher;
        function o(v) {
          var u = v.target;
          a.enable(), a.setActiveNode(new _.$keyboardNavigation.MinicalButton(u, 0));
        }
        function l(v) {
          var u = v.target || v.srcElement, c = _.utils.dom.locateCss(v, "dhx_cal_prev_button", !1), f = _.utils.dom.locateCss(v, "dhx_cal_next_button", !1), p = _.utils.dom.locateCss(v, "dhx_year_body", !1), g = 0, y = 0;
          if (p) {
            for (var x, b, k = u; k && k.tagName.toLowerCase() != "td"; )
              k = k.parentNode;
            if (k && (x = (b = k).parentNode), x && b) {
              for (var w = x.parentNode.querySelectorAll("tr"), D = 0; D < w.length; D++)
                if (w[D] == x) {
                  g = D;
                  break;
                }
              var E = x.querySelectorAll("td");
              for (D = 0; D < E.length; D++)
                if (E[D] == b) {
                  y = D;
                  break;
                }
            }
          }
          var S = v.currentTarget;
          a.delay(function() {
            var N;
            (c || f || p) && (c ? (N = new _.$keyboardNavigation.MinicalButton(S, 0), a.setActiveNode(new _.$keyboardNavigation.MinicalButton(S, 0))) : f ? N = new _.$keyboardNavigation.MinicalButton(S, 1) : p && (N = new _.$keyboardNavigation.MinicalCell(S, g, y)), N && (a.enable(), N.isValid() && (a.activeNode = null, a.setActiveNode(N))));
          });
        }
        if (_.renderCalendar) {
          var h = _.renderCalendar;
          _.renderCalendar = function() {
            var v = h.apply(this, arguments), u = _.$keyboardNavigation._minicalendars;
            _.eventRemove(v, "click", l), _.event(v, "click", l), _.eventRemove(v, "focus", o), _.event(v, "focus", o);
            for (var c = !1, f = 0; f < u.length; f++)
              if (u[f] == v) {
                c = !0;
                break;
              }
            if (c || u.push(v), a.isEnabled()) {
              var p = a.getActiveNode();
              p && p.container == v ? a.focusNode(p) : v.setAttribute("tabindex", "0");
            } else
              v.setAttribute("tabindex", "0");
            return v;
          };
        }
        if (_.destroyCalendar) {
          var m = _.destroyCalendar;
          _.destroyCalendar = function(v, u) {
            v = v || (_._def_count ? _._def_count.firstChild : null);
            var c = m.apply(this, arguments);
            if (!v || !v.parentNode)
              for (var f = _.$keyboardNavigation._minicalendars, p = 0; p < f.length; p++)
                f[p] == v && (_.eventRemove(f[p], "focus", o), f.splice(p, 1), p--);
            return c;
          };
        }
      };
    }(e);
    var t = e.$keyboardNavigation.dispatcher;
    if (e.$keyboardNavigation.attachSchedulerHandlers(), e.renderCalendar)
      e.$keyboardNavigation.patchMinicalendar();
    else
      var r = e.attachEvent("onSchedulerReady", function() {
        e.detachEvent(r), e.$keyboardNavigation.patchMinicalendar();
      });
    function d() {
      if (e.config.key_nav) {
        var _ = document.activeElement;
        return !(!_ || e.utils.dom.locateCss(_, "dhx_cal_quick_info", !1)) && (e.$keyboardNavigation.isChildOf(_, e.$container) || e.$keyboardNavigation.isMinical(_));
      }
    }
    function n(_) {
      _ && !t.isEnabled() ? t.enable() : !_ && t.isEnabled() && t.disable();
    }
    const s = setInterval(function() {
      if (e.$container && e.$keyboardNavigation.isChildOf(e.$container, document.body)) {
        var _ = d();
        _ ? n(_) : !_ && t.isEnabled() && setTimeout(function() {
          e.$destroyed || (e.config.key_nav ? n(d()) : e.$container.removeAttribute("tabindex"));
        }, 100);
      }
    }, 500);
    e.attachEvent("onDestroy", function() {
      clearInterval(s);
    });
  }();
}, layer: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    this.layers.sort(function(t, r) {
      return t.zIndex - r.zIndex;
    }), e._dp_init = function(t) {
      t._methods = ["_set_event_text_style", "", "changeEventId", "deleteEvent"], this.attachEvent("onEventAdded", function(r) {
        !this._loading && this.validId(r) && this.getEvent(r) && this.getEvent(r).layer == t.layer && t.setUpdated(r, !0, "inserted");
      }), this.attachEvent("onBeforeEventDelete", function(r) {
        if (this.getEvent(r) && this.getEvent(r).layer == t.layer) {
          if (!this.validId(r))
            return;
          var d = t.getState(r);
          return d == "inserted" || this._new_event ? (t.setUpdated(r, !1), !0) : d != "deleted" && (d == "true_deleted" || (t.setUpdated(r, !0, "deleted"), !1));
        }
        return !0;
      }), this.attachEvent("onEventChanged", function(r) {
        !this._loading && this.validId(r) && this.getEvent(r) && this.getEvent(r).layer == t.layer && t.setUpdated(r, !0, "updated");
      }), t._getRowData = function(r, d) {
        var n = this.obj.getEvent(r), s = {};
        for (var _ in n)
          _.indexOf("_") !== 0 && (n[_] && n[_].getUTCFullYear ? s[_] = this.obj._helpers.formatDate(n[_]) : s[_] = n[_]);
        return s;
      }, t._clearUpdateFlag = function() {
      }, t.attachEvent("insertCallback", e._update_callback), t.attachEvent("updateCallback", e._update_callback), t.attachEvent("deleteCallback", function(r, d) {
        this.obj.setUserData(d, this.action_param, "true_deleted"), this.obj.deleteEvent(d);
      });
    }, function() {
      var t = function(n) {
        if (n === null || typeof n != "object")
          return n;
        var s = new n.constructor();
        for (var _ in n)
          s[_] = t(n[_]);
        return s;
      };
      e._dataprocessors = [], e._layers_zindex = {};
      for (var r = 0; r < e.layers.length; r++) {
        if (e.config["lightbox_" + e.layers[r].name] = {}, e.config["lightbox_" + e.layers[r].name].sections = t(e.config.lightbox.sections), e._layers_zindex[e.layers[r].name] = e.config.initial_layer_zindex || 5 + 3 * r, e.layers[r].url) {
          var d = e.createDataProcessor({ url: e.layers[r].url });
          d.layer = e.layers[r].name, e._dataprocessors.push(d), e._dataprocessors[r].init(e);
        }
        e.layers[r].isDefault && (e.defaultLayer = e.layers[r].name);
      }
    }(), e.showLayer = function(t) {
      this.toggleLayer(t, !0);
    }, e.hideLayer = function(t) {
      this.toggleLayer(t, !1);
    }, e.toggleLayer = function(t, r) {
      var d = this.getLayer(t);
      d.visible = r !== void 0 ? !!r : !d.visible, this.setCurrentView(this._date, this._mode);
    }, e.getLayer = function(t) {
      var r, d;
      typeof t == "string" && (d = t), typeof t == "object" && (d = t.layer);
      for (var n = 0; n < e.layers.length; n++)
        e.layers[n].name == d && (r = e.layers[n]);
      return r;
    }, e.attachEvent("onBeforeLightbox", function(t) {
      var r = this.getEvent(t);
      return this.config.lightbox.sections = this.config["lightbox_" + r.layer].sections, e.resetLightbox(), !0;
    }), e.attachEvent("onClick", function(t, r) {
      var d = e.getEvent(t);
      return !e.getLayer(d.layer).noMenu;
    }), e.attachEvent("onEventCollision", function(t, r) {
      var d = this.getLayer(t);
      if (!d.checkCollision)
        return !1;
      for (var n = 0, s = 0; s < r.length; s++)
        r[s].layer == d.name && r[s].id != t.id && n++;
      return n >= e.config.collision_limit;
    }), e.addEvent = function(t, r, d, n, s) {
      var _ = t;
      arguments.length != 1 && ((_ = s || {}).start_date = t, _.end_date = r, _.text = d, _.id = n, _.layer = this.defaultLayer), _.id = _.id || e.uid(), _.text = _.text || "", typeof _.start_date == "string" && (_.start_date = this.templates.api_date(_.start_date)), typeof _.end_date == "string" && (_.end_date = this.templates.api_date(_.end_date)), _._timed = this.isOneDayEvent(_);
      var a = !this._events[_.id];
      this._events[_.id] = _, this.event_updated(_), this._loading || this.callEvent(a ? "onEventAdded" : "onEventChanged", [_.id, _]);
    }, this._evs_layer = {};
    for (var i = 0; i < this.layers.length; i++)
      this._evs_layer[this.layers[i].name] = [];
    e.addEventNow = function(t, r, d) {
      var n = {};
      typeof t == "object" && (n = t, t = null);
      var s = 6e4 * (this.config.event_duration || this.config.time_step);
      t || (t = Math.round(e._currentDate().valueOf() / s) * s);
      var _ = new Date(t);
      if (!r) {
        var a = this.config.first_hour;
        a > _.getHours() && (_.setHours(a), t = _.valueOf()), r = t + s;
      }
      n.start_date = n.start_date || _, n.end_date = n.end_date || new Date(r), n.text = n.text || this.locale.labels.new_event, n.id = this._drag_id = this.uid(), n.layer = this.defaultLayer, this._drag_mode = "new-size", this._loading = !0, this.addEvent(n), this.callEvent("onEventCreated", [this._drag_id, d]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(d);
    }, e._t_render_view_data = function(t) {
      if (this.config.multi_day && !this._table_view) {
        for (var r = [], d = [], n = 0; n < t.length; n++)
          t[n]._timed ? r.push(t[n]) : d.push(t[n]);
        this._table_view = !0, this.render_data(d), this._table_view = !1, this.render_data(r);
      } else
        this.render_data(t);
    }, e.render_view_data = function() {
      if (this._not_render)
        this._render_wait = !0;
      else {
        this._render_wait = !1, this.clear_view(), this._evs_layer = {};
        for (var t = 0; t < this.layers.length; t++)
          this._evs_layer[this.layers[t].name] = [];
        var r = this.get_visible_events();
        for (t = 0; t < r.length; t++)
          this._evs_layer[r[t].layer] && this._evs_layer[r[t].layer].push(r[t]);
        if (this._mode == "month") {
          var d = [];
          for (t = 0; t < this.layers.length; t++)
            this.layers[t].visible && (d = d.concat(this._evs_layer[this.layers[t].name]));
          this._t_render_view_data(d);
        } else
          for (t = 0; t < this.layers.length; t++)
            if (this.layers[t].visible) {
              var n = this._evs_layer[this.layers[t].name];
              this._t_render_view_data(n);
            }
      }
    }, e._render_v_bar = function(t, r, d, n, s, _, a, o, l) {
      var h = t.id;
      a.indexOf("<div class=") == -1 && (a = e.templates["event_header_" + t.layer] ? e.templates["event_header_" + t.layer](t.start_date, t.end_date, t) : a), o.indexOf("<div class=") == -1 && (o = e.templates["event_text_" + t.layer] ? e.templates["event_text_" + t.layer](t.start_date, t.end_date, t) : o);
      var m = document.createElement("div"), v = "dhx_cal_event", u = e.templates["event_class_" + t.layer] ? e.templates["event_class_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_class(t.start_date, t.end_date, t);
      u && (v = v + " " + u);
      var c = e._border_box_events(), f = n - 2, p = c ? f : n - 4, g = c ? f : n - 6, y = c ? f : n - 14, x = c ? f - 2 : n - 8, b = c ? s - this.xy.event_header_height : s - 30 + 1, k = '<div event_id="' + h + '" ' + e.config.event_attribute + '="' + h + '" class="' + v + '" style="position:absolute; top:' + d + "px; left:" + r + "px; width:" + p + "px; height:" + s + "px;" + (_ || "") + '">';
      return k += '<div class="dhx_header" style=" width:' + g + 'px;" >&nbsp;</div>', k += '<div class="dhx_title">' + a + "</div>", k += '<div class="dhx_body" style=" width:' + y + "px; height:" + b + 'px;">' + o + "</div>", k += '<div class="dhx_footer" style=" width:' + x + "px;" + (l ? " margin-top:-1px;" : "") + '" ></div></div>', m.innerHTML = k, m.style.zIndex = 100, m.firstChild;
    }, e.render_event_bar = function(t) {
      var r = this._els.dhx_cal_data[0], d = this._colsS[t._sday], n = this._colsS[t._eday];
      n == d && (n = this._colsS[t._eday + 1]);
      var s = this.xy.bar_height, _ = this._colsS.heights[t._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + t._sorder * s, a = document.createElement("div"), o = t._timed ? "dhx_cal_event_clear" : "dhx_cal_event_line", l = e.templates["event_class_" + t.layer] ? e.templates["event_class_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_class(t.start_date, t.end_date, t);
      l && (o = o + " " + l);
      var h = '<div event_id="' + t.id + '" ' + this.config.event_attribute + '="' + t.id + '" class="' + o + '" style="position:absolute; top:' + _ + "px; left:" + d + "px; width:" + (n - d - 15) + "px;" + (t._text_style || "") + '">';
      t._timed && (h += e.templates["event_bar_date_" + t.layer] ? e.templates["event_bar_date_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_bar_date(t.start_date, t.end_date, t)), h += e.templates["event_bar_text_" + t.layer] ? e.templates["event_bar_text_" + t.layer](t.start_date, t.end_date, t) : e.templates.event_bar_text(t.start_date, t.end_date, t) + "</div>)", h += "</div>", a.innerHTML = h, this._rendered.push(a.firstChild), r.appendChild(a.firstChild);
    }, e.render_event = function(t) {
      var r = e.xy.menu_width;
      if (e.getLayer(t.layer).noMenu && (r = 0), !(t._sday < 0)) {
        var d = e.locate_holder(t._sday);
        if (d) {
          var n = 60 * t.start_date.getHours() + t.start_date.getMinutes(), s = 60 * t.end_date.getHours() + t.end_date.getMinutes() || 60 * e.config.last_hour, _ = Math.round((60 * n * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px) + 1, a = Math.max(e.xy.min_event_height, (s - n) * this.config.hour_size_px / 60) + 1, o = Math.floor((d.clientWidth - r) / t._count), l = t._sorder * o + 1;
          t._inner || (o *= t._count - t._sorder);
          var h = this._render_v_bar(t.id, r + l, _, o, a, t._text_style, e.templates.event_header(t.start_date, t.end_date, t), e.templates.event_text(t.start_date, t.end_date, t));
          if (this._rendered.push(h), d.appendChild(h), l = l + parseInt(d.style.left, 10) + r, _ += this._dy_shift, h.style.zIndex = this._layers_zindex[t.layer], this._edit_id == t.id) {
            h.style.zIndex = parseInt(h.style.zIndex) + 1;
            var m = h.style.zIndex;
            o = Math.max(o - 4, e.xy.editor_width), (h = document.createElement("div")).setAttribute("event_id", t.id), h.setAttribute(this.config.event_attribute, t.id), this.set_xy(h, o, a - 20, l, _ + 14), h.className = "dhx_cal_editor", h.style.zIndex = m;
            var v = document.createElement("div");
            this.set_xy(v, o - 6, a - 26), v.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;", v.style.zIndex = m, h.appendChild(v), this._els.dhx_cal_data[0].appendChild(h), this._rendered.push(h), v.innerHTML = "<textarea class='dhx_cal_editor'>" + t.text + "</textarea>", this._editor = v.firstChild, this._editor.addEventListener("keypress", function(g) {
              if (g.shiftKey)
                return !0;
              var y = g.keyCode;
              y == e.keys.edit_save && e.editStop(!0), y == e.keys.edit_cancel && e.editStop(!1);
            }), this._editor.addEventListener("selectstart", function(g) {
              return g.cancelBubble = !0, !0;
            }), v.firstChild.focus(), this._els.dhx_cal_data[0].scrollLeft = 0, v.firstChild.select();
          }
          if (this._select_id == t.id) {
            h.style.zIndex = parseInt(h.style.zIndex) + 1;
            for (var u = this.config["icons_" + (this._edit_id == t.id ? "edit" : "select")], c = "", f = 0; f < u.length; f++)
              c += "<div class='dhx_menu_icon " + u[f] + "' title='" + this.locale.labels[u[f]] + "'></div>";
            var p = this._render_v_bar(t.id, l - r + 1, _, r, 20 * u.length + 26, "", "<div class='dhx_menu_head'></div>", c, !0);
            p.style.left = l - r + 1, p.style.zIndex = h.style.zIndex, this._els.dhx_cal_data[0].appendChild(p), this._rendered.push(p);
          }
        }
      }
    }, e.filter_agenda = function(t, r) {
      var d = e.getLayer(r.layer);
      return d && d.visible;
    };
  });
}, limit: function(e) {
  e.config.limit_start = null, e.config.limit_end = null, e.config.limit_view = !1, e.config.check_limits = !0, e._temp_limit_scope = function() {
    var i = null;
    e.attachEvent("onBeforeViewChange", function(t, r, d, n) {
      function s(_, a) {
        var o = e.config.limit_start, l = e.config.limit_end, h = e.date.add(_, 1, a);
        return _.valueOf() > l.valueOf() || h <= o.valueOf();
      }
      return !e.config.limit_view || !s(n = n || r, d = d || t) || r.valueOf() == n.valueOf() || (setTimeout(function() {
        if (e.$destroyed)
          return !0;
        var _ = s(r, d) ? e.config.limit_start : r;
        e.setCurrentView(s(_, d) ? null : _, d);
      }, 1), !1);
    }), e.attachEvent("onMouseDown", function(t) {
      return t != "dhx_time_block";
    }), e.attachEvent("onBeforeDrag", function(t) {
      return !t || e.checkLimitViolation(e.getEvent(t));
    }), e.attachEvent("onClick", function(t, r) {
      return e.checkLimitViolation(e.getEvent(t));
    }), e.attachEvent("onBeforeLightbox", function(t) {
      var r = e.getEvent(t);
      return i = [r.start_date, r.end_date], e.checkLimitViolation(r);
    }), e.attachEvent("onEventSave", function(t, r, d) {
      if (!r.start_date || !r.end_date) {
        var n = e.getEvent(t);
        r.start_date = new Date(n.start_date), r.end_date = new Date(n.end_date);
      }
      if (r.rec_type) {
        var s = e._lame_clone(r);
        return e._roll_back_dates(s), e.checkLimitViolation(s);
      }
      return e.checkLimitViolation(r);
    }), e.attachEvent("onEventAdded", function(t) {
      if (!t)
        return !0;
      var r = e.getEvent(t);
      return !e.checkLimitViolation(r) && e.config.limit_start && e.config.limit_end && (r.start_date < e.config.limit_start && (r.start_date = new Date(e.config.limit_start)), r.start_date.valueOf() >= e.config.limit_end.valueOf() && (r.start_date = this.date.add(e.config.limit_end, -1, "day")), r.end_date < e.config.limit_start && (r.end_date = new Date(e.config.limit_start)), r.end_date.valueOf() >= e.config.limit_end.valueOf() && (r.end_date = this.date.add(e.config.limit_end, -1, "day")), r.start_date.valueOf() >= r.end_date.valueOf() && (r.end_date = this.date.add(r.start_date, this.config.event_duration || this.config.time_step, "minute")), r._timed = this.isOneDayEvent(r)), !0;
    }), e.attachEvent("onEventChanged", function(t) {
      if (!t)
        return !0;
      var r = e.getEvent(t);
      if (!e.checkLimitViolation(r)) {
        if (!i)
          return !1;
        r.start_date = i[0], r.end_date = i[1], r._timed = this.isOneDayEvent(r);
      }
      return !0;
    }), e.attachEvent("onBeforeEventChanged", function(t, r, d) {
      return e.checkLimitViolation(t);
    }), e.attachEvent("onBeforeEventCreated", function(t) {
      var r = e.getActionData(t).date, d = { _timed: !0, start_date: r, end_date: e.date.add(r, e.config.time_step, "minute") };
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
  let i = null, t = [];
  const r = { googleMap: new Ca(e), openStreetMaps: new Oa(e), mapbox: new La(e) };
  function d(s) {
    i = s.ext.mapView.createAdapter(), t.push(e.attachEvent("onEventSave", function(_, a, o) {
      let l = e.getEvent(_);
      return l && l.event_location != a.event_location && (e._eventLocationChanged = !0), !0;
    }), e.attachEvent("onEventChanged", (_, a) => {
      const { start_date: o, end_date: l } = a, { min_date: h, max_date: m } = e.getState();
      return o.valueOf() < m.valueOf() && l.valueOf() > h.valueOf() && i && (e.config.map_settings.resolve_event_location && a.event_location && !e._latLngUpdate ? n(a, i) : i.updateEventMarker(a)), e._latLngUpdate = !1, !0;
    }), e.attachEvent("onEventIdChange", function(_, a) {
      let o = e.getEvent(a);
      i == null || i.removeEventMarker(_), i == null || i.addEventMarker(o);
    }), e.attachEvent("onEventAdded", (_, a) => {
      const { start_date: o, end_date: l } = a, { min_date: h, max_date: m } = e.getState();
      o.valueOf() < m.valueOf() && l.valueOf() > h.valueOf() && i && (e.config.map_settings.resolve_event_location && a.event_location && e._eventLocationChanged ? (n(a, i), e._eventLocationChanged = !1) : (i.addEventMarker(a), i.onEventClick(a)));
    }), e.attachEvent("onClick", function(_, a) {
      const o = e.getEvent(_);
      return i && o && i.onEventClick(o), !1;
    }), e.attachEvent("onBeforeEventDelete", (_, a) => (i && i.removeEventMarker(_), !0)));
  }
  async function n(s, _) {
    let a = await _.resolveAddress(s.event_location);
    return s.lat = a.lat, s.lng = a.lng, _.removeEventMarker(String(s.id)), _.addEventMarker(s), s;
  }
  e.ext || (e.ext = {}), e.ext.mapView = { createAdapter: function() {
    return r[e.config.map_view_provider];
  }, createMarker: function(s) {
    return new google.maps.Marker(s);
  }, currentAdapter: null, adapters: r }, e._latLngUpdate = !1, e._eventLocationChanged = !1, e.config.map_view_provider = "googleMap", e.config.map_settings = { initial_position: { lat: 48.724, lng: 8.215 }, error_position: { lat: 15, lng: 15 }, initial_zoom: 1, zoom_after_resolve: 15, info_window_max_width: 300, resolve_user_location: !0, resolve_event_location: !0, view_provider: "googleMap" }, e.config.map_initial_position && (e.config.map_settings.initial_position = { lat: e.config.map_initial_position.lat(), lng: e.config.map_initial_position.lng() }), e.config.map_error_position && (e.config.map_settings.error_position = { lat: e.config.map_error_position.lat(), lng: e.config.map_error_position.lng() }), e.xy.map_date_width = 188, e.xy.map_icon_width = 25, e.xy.map_description_width = 400, e.date.add_map = function(s, _, a) {
    return new Date(s.valueOf());
  }, e.templates.map_date = function(s, _, a) {
    return "";
  }, e.templates.map_time = function(s, _, a) {
    return e.config.rtl && !a._timed ? e.templates.day_date(_) + " &ndash; " + e.templates.day_date(s) : a._timed ? this.day_date(a.start_date, a.end_date, a) + " " + this.event_date(s) : e.templates.day_date(s) + " &ndash; " + e.templates.day_date(_);
  }, e.templates.map_text = function(s, _, a) {
    return a.text;
  }, e.templates.map_info_content = function(s) {
    return `<div><b>Event's text:</b> ${s.text}
				<div><b>Location:</b> ${s.event_location}</div>
				<div><b>Starts:</b> ${e.templates.tooltip_date_format(s.start_date)}</div>
				<div><b>Ends:</b> ${e.templates.tooltip_date_format(s.end_date)}</div>
			</div>`;
  }, e.date.map_start = function(s) {
    return s;
  }, e.dblclick_dhx_map_area = function(s) {
    let _ = s.target.closest(`[${e.config.event_attribute}]`);
    if (_) {
      let a = _.getAttribute(`${e.config.event_attribute}`);
      e.showLightbox(a);
    }
    this.config.readonly || !this.config.dblclick_create || _ || this.addEventNow({ start_date: e.config.map_start, end_date: e.date.add(e.config.map_start, e.config.time_step, "minute") });
  }, e.attachEvent("onSchedulerReady", function() {
    e.config.map_initial_zoom !== void 0 && (e.config.map_settings.initial_zoom = e.config.map_initial_zoom), e.config.map_zoom_after_resolve !== void 0 && (e.config.map_settings.zoom_after_resolve = e.config.map_zoom_after_resolve), e.config.map_infowindow_max_width !== void 0 && (e.config.map_settings.info_window_max_width = e.config.map_infowindow_max_width), e.config.map_resolve_user_location !== void 0 && (e.config.map_settings.resolve_user_location = e.config.map_resolve_user_location), e.config.map_view_provider !== void 0 && (e.config.map_settings.view_provider = e.config.map_view_provider), e.config.map_type !== void 0 && (e.config.map_settings.type = e.config.map_type), e.config.map_resolve_event_location !== void 0 && (e.config.map_settings.resolve_event_location = e.config.map_resolve_event_location), e.ext.mapView.currentAdapter = e.config.map_view_provider;
    let s = document.createElement("div");
    s.className = "mapContainer", s.id = "mapContainer", s.style.display = "none", s.style.zIndex = "1", e._obj.appendChild(s);
    const _ = e.render_data;
    function a() {
      let l = e.get_visible_events();
      l.sort(function(u, c) {
        return u.start_date.valueOf() == c.start_date.valueOf() ? u.id > c.id ? 1 : -1 : u.start_date > c.start_date ? 1 : -1;
      });
      let h = "<div " + e._waiAria.mapAttrString() + " class='dhx_map_area'>";
      for (let u = 0; u < l.length; u++) {
        let c = l[u], f = c.id == e._selected_event_id ? "dhx_map_line highlight" : "dhx_map_line", p = c.color ? "--dhx-scheduler-event-background:" + c.color + ";" : "", g = c.textColor ? "--dhx-scheduler-event-color:" + c.textColor + ";" : "", y = e._waiAria.mapRowAttrString(c), x = e._waiAria.mapDetailsBtnString();
        h += "<div " + y + " class='" + f + "' event_id='" + c.id + "' " + e.config.event_attribute + "='" + c.id + "' style='" + p + g + (c._text_style || "") + " width: " + (e.xy.map_date_width + e.xy.map_description_width + 2) + "px;'><div class='dhx_map_event_time' style='width: " + e.xy.map_date_width + "px;' >" + e.templates.map_time(c.start_date, c.end_date, c) + "</div>", h += `<div ${x} class='dhx_event_icon icon_details'><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4444 16.4H4.55556V7.6H15.4444V16.4ZM13.1111 2V3.6H6.88889V2H5.33333V3.6H4.55556C3.69222 3.6 3 4.312 3 5.2V16.4C3 16.8243 3.16389 17.2313 3.45561 17.5314C3.74733 17.8314 4.143 18 4.55556 18H15.4444C15.857 18 16.2527 17.8314 16.5444 17.5314C16.8361 17.2313 17 16.8243 17 16.4V5.2C17 4.312 16.3 3.6 15.4444 3.6H14.6667V2H13.1111ZM13.8889 10.8H10V14.8H13.8889V10.8Z" fill="#A1A4A6"/>
			</svg></div>`, h += "<div class='line_description' style='width:" + (e.xy.map_description_width - e.xy.map_icon_width) + "px;'>" + e.templates.map_text(c.start_date, c.end_date, c) + "</div></div>";
      }
      h += "<div class='dhx_v_border' style=" + (e.config.rtl ? "'right: " : "'left: ") + (e.xy.map_date_width - 1) + "px;'></div><div class='dhx_v_border_description'></div></div>", e._els.dhx_cal_data[0].scrollTop = 0, e._els.dhx_cal_data[0].innerHTML = h;
      let m = e._els.dhx_cal_data[0].firstChild.childNodes, v = e._getNavDateElement();
      v && (v.innerHTML = e.templates[e._mode + "_date"](e._min_date, e._max_date, e._mode)), e._rendered = [];
      for (let u = 0; u < m.length - 2; u++)
        e._rendered[u] = m[u];
    }
    e.render_data = function(l, h) {
      if (this._mode != "map")
        return _.apply(this, arguments);
      {
        a();
        let m = e.get_visible_events();
        i && (i.clearEventMarkers(), m.forEach((v) => i == null ? void 0 : i.addEventMarker(v)));
      }
    }, e.map_view = function(l) {
      e._els.dhx_cal_data[0].style.width = e.xy.map_date_width + e.xy.map_description_width + 1 + "px", e._min_date = e.config.map_start || e._currentDate(), e._max_date = e.config.map_end || e.date.add(e._currentDate(), 1, "year"), e._table_view = !0, function(u) {
        if (u) {
          const c = e.locale.labels;
          e._els.dhx_cal_header[0].innerHTML = "<div class='dhx_map_head' style='width: " + (e.xy.map_date_width + e.xy.map_description_width + 2) + "px;' ><div class='headline_date' style='width: " + e.xy.map_date_width + "px;'>" + c.date + "</div><div class='headline_description' style='width: " + e.xy.map_description_width + "px;'>" + c.description + "</div></div>", e._table_view = !0, e.set_sizes();
        }
      }(l);
      let h = document.getElementById("mapContainer");
      var m, v;
      (function(u) {
        let c = document.getElementById(u);
        if (c) {
          const f = e.$container.querySelector(".dhx_cal_navline").offsetHeight;
          let p = e.$container.querySelector(".dhx_cal_data").offsetHeight + e.$container.querySelector(".dhx_cal_header").offsetHeight;
          p < 0 && (p = 0);
          let g = e._x - e.xy.map_date_width - e.xy.map_description_width - 1;
          g < 0 && (g = 0), c.style.height = p + "px", c.style.width = g + "px", c.style.position = "absolute", c.style.top = f + "px", e.config.rtl ? c.style.marginRight = e.xy.map_date_width + e.xy.map_description_width + 1 + "px" : c.style.marginLeft = e.xy.map_date_width + e.xy.map_description_width + 1 + "px", c.style.marginTop = e.xy.nav_height + 2 + "px";
        }
      })("mapContainer"), l && h ? (s.style.display = "block", a(), e.config.map_view_provider == e.ext.mapView.currentAdapter ? (i == null || i.destroy(h), d(e), i == null || i.initialize(h, e.config.map_settings)) : (i == null || i.destroy(h), d(e), i == null || i.initialize(h, e.config.map_settings), e.ext.mapView.currentAdapter = e.config.map_view_provider), i && (m = e.config.map_settings, v = i, m.resolve_user_location ? navigator.geolocation && navigator.geolocation.getCurrentPosition(function(u) {
        v.setView(u.coords.latitude, u.coords.longitude, m.zoom_after_resolve || m.initial_zoom);
      }) : v.setView(m.initial_position.lat, m.initial_position.lng, m.initial_zoom))) : (s.style.display = "none", e._els.dhx_cal_data[0].style.width = "100%", i && h && (i.destroy(h), i = null, e.ext.mapView.currentAdapter = e.config.map_view_provider), t.forEach((u) => e.detachEvent(u)), t = []);
    }, e.attachEvent("onLocationError", function(l) {
      return alert("Location can't be found"), google.maps.LatLng(51.47784, -1492e-6);
    });
    let o = async function(l) {
      if (i) {
        const h = await i.resolveAddress(l.event_location);
        h.lat && h.lng ? (l.lat = +h.lat, l.lng = +h.lng) : (e.callEvent("onLocationError", [l.id]), l.lng = e.config.map_settings.error_position.lng, l.lat = e.config.map_settings.error_position.lat), e._latLngUpdate = !0, e.callEvent("onEventChanged", [l.id, l]);
      }
    };
    e._event_resolve_delay = 1500, e.attachEvent("onEventLoading", function(l) {
      return l.lat && l.lng && (l.lat = +l.lat, l.lng = +l.lng), e.config.map_settings.resolve_event_location && l.event_location && !l.lat && !l.lng && (e._event_resolve_delay += 1500, function(h, m, v, u) {
        setTimeout(function() {
          if (e.$destroyed)
            return !0;
          let c = h.apply(m, v);
          return h = m = v = null, c;
        }, u || 1);
      }(o, this, [l], e._event_resolve_delay)), !0;
    });
  });
}, minical: function(e) {
  const i = e._createDomEventScope();
  e.config.minicalendar = { mark_events: !0 }, e._synced_minicalendars = [], e.renderCalendar = function(t, r, d) {
    var n = null, s = t.date || e._currentDate();
    if (typeof s == "string" && (s = this.templates.api_date(s)), r)
      n = this._render_calendar(r.parentNode, s, t, r), e.unmarkCalendar(n);
    else {
      var _ = t.container, a = t.position;
      if (typeof _ == "string" && (_ = document.getElementById(_)), typeof a == "string" && (a = document.getElementById(a)), a && a.left === void 0 && a.right === void 0) {
        var o = e.$domHelpers.getOffset(a);
        a = { top: o.top + a.offsetHeight, left: o.left };
      }
      _ || (_ = e._get_def_cont(a)), (n = this._render_calendar(_, s, t)).$_eventAttached || (n.$_eventAttached = !0, i.attach(n, "click", (function(g) {
        var y = g.target || g.srcElement, x = e.$domHelpers;
        if (x.closest(y, ".dhx_month_head") && !x.closest(y, ".dhx_after") && !x.closest(y, ".dhx_before")) {
          var b = x.closest(y, "[data-cell-date]").getAttribute("data-cell-date"), k = e.templates.parse_date(b);
          e.unmarkCalendar(this), e.markCalendar(this, k, "dhx_calendar_click"), this._last_date = k, this.conf.handler && this.conf.handler.call(e, k, this);
        }
      }).bind(n)));
    }
    if (e.config.minicalendar.mark_events)
      for (var l = e.date.month_start(s), h = e.date.add(l, 1, "month"), m = this.getEvents(l, h), v = this["filter_" + this._mode], u = {}, c = 0; c < m.length; c++) {
        var f = m[c];
        if (!v || v(f.id, f)) {
          var p = f.start_date;
          for (p.valueOf() < l.valueOf() && (p = l), p = e.date.date_part(new Date(p.valueOf())); p < f.end_date && (u[+p] || (u[+p] = !0, this.markCalendar(n, p, "dhx_year_event")), !((p = this.date.add(p, 1, "day")).valueOf() >= h.valueOf())); )
            ;
        }
      }
    return this._markCalendarCurrentDate(n), n.conf = t, t.sync && !d && this._synced_minicalendars.push(n), n.conf._on_xle_handler || (n.conf._on_xle_handler = e.attachEvent("onXLE", function() {
      e.updateCalendar(n, n.conf.date);
    })), this.config.wai_aria_attributes && this.config.wai_aria_application_role && n.setAttribute("role", "application"), n;
  }, e._get_def_cont = function(t) {
    return this._def_count || (this._def_count = document.createElement("div"), this._def_count.className = "dhx_minical_popup", e.event(this._def_count, "click", function(r) {
      r.cancelBubble = !0;
    }), document.body.appendChild(this._def_count)), t.left && (this._def_count.style.left = t.left + "px"), t.right && (this._def_count.style.right = t.right + "px"), t.top && (this._def_count.style.top = t.top + "px"), t.bottom && (this._def_count.style.bottom = t.bottom + "px"), this._def_count._created = /* @__PURE__ */ new Date(), this._def_count;
  }, e._locateCalendar = function(t, r) {
    if (typeof r == "string" && (r = e.templates.api_date(r)), +r > +t._max_date || +r < +t._min_date)
      return null;
    for (var d = t.querySelector(".dhx_year_body").childNodes[0], n = 0, s = new Date(t._min_date); +this.date.add(s, 1, "week") <= +r; )
      s = this.date.add(s, 1, "week"), n++;
    var _ = e.config.start_on_monday, a = (r.getDay() || (_ ? 7 : 0)) - (_ ? 1 : 0);
    const o = d.querySelector(`.dhx_cal_month_row:nth-child(${n + 1}) .dhx_cal_month_cell:nth-child(${a + 1})`);
    return o ? o.firstChild : null;
  }, e.markCalendar = function(t, r, d) {
    var n = this._locateCalendar(t, r);
    n && (n.className += " " + d);
  }, e.unmarkCalendar = function(t, r, d) {
    if (d = d || "dhx_calendar_click", r = r || t._last_date) {
      var n = this._locateCalendar(t, r);
      n && (n.className = (n.className || "").replace(RegExp(d, "g")));
    }
  }, e._week_template = function(t) {
    for (var r = t || 250, d = 0, n = document.createElement("div"), s = this.date.week_start(e._currentDate()), _ = 0; _ < 7; _++)
      this._cols[_] = Math.floor(r / (7 - _)), this._render_x_header(_, d, s, n), s = this.date.add(s, 1, "day"), r -= this._cols[_], d += this._cols[_];
    return n.lastChild.className += " dhx_scale_bar_last", n;
  }, e.updateCalendar = function(t, r) {
    t.conf.date = r, this.renderCalendar(t.conf, t, !0);
  }, e._mini_cal_arrows = ["&nbsp;", "&nbsp;"], e._render_calendar = function(t, r, d, n) {
    var s = e.templates, _ = this._cols;
    this._cols = [];
    var a = this._mode;
    this._mode = "calendar";
    var o = this._colsS;
    this._colsS = { height: 0 };
    var l = new Date(this._min_date), h = new Date(this._max_date), m = new Date(e._date), v = s.month_day, u = this._ignores_detected;
    this._ignores_detected = 0, s.month_day = s.calendar_date, r = this.date.month_start(r);
    var c, f = this._week_template(t.offsetWidth - 1 - this.config.minicalendar.padding);
    n ? c = n : (c = document.createElement("div")).className = "dhx_cal_container dhx_mini_calendar", c.setAttribute("date", this._helpers.formatDate(r)), c.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid" + (e.config.rtl ? " dhx_grid_rtl'>" : "'>") + "<div class='dhx_year_week'>" + (f ? f.innerHTML : "") + "</div><div class='dhx_year_body'></div></div>";
    var p = c.querySelector(".dhx_year_month"), g = c.querySelector(".dhx_year_week"), y = c.querySelector(".dhx_year_body");
    if (p.innerHTML = this.templates.calendar_month(r), d.navigation)
      for (var x = function(z, W) {
        var Y = e.date.add(z._date, W, "month");
        e.updateCalendar(z, Y), e._date.getMonth() == z._date.getMonth() && e._date.getFullYear() == z._date.getFullYear() && e._markCalendarCurrentDate(z);
      }, b = ["dhx_cal_prev_button", "dhx_cal_next_button"], k = ["left:1px;top:4px;position:absolute;", "left:auto; right:1px;top:4px;position:absolute;"], w = [-1, 1], D = function(z) {
        return function() {
          if (d.sync)
            for (var W = e._synced_minicalendars, Y = 0; Y < W.length; Y++)
              x(W[Y], z);
          else
            e.config.rtl && (z = -z), x(c, z);
        };
      }, E = [e.locale.labels.prev, e.locale.labels.next], S = 0; S < 2; S++) {
        var N = document.createElement("div");
        N.className = b[S], e._waiAria.headerButtonsAttributes(N, E[S]), N.style.cssText = k[S], N.innerHTML = this._mini_cal_arrows[S], p.appendChild(N), i.attach(N, "click", D(w[S]));
      }
    c._date = new Date(r), c.week_start = (r.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;
    var M = c._min_date = this.date.week_start(r);
    c._max_date = this.date.add(c._min_date, 6, "week"), this._reset_month_scale(y, r, M, 6), n || t.appendChild(c), g.style.height = g.childNodes[0].offsetHeight - 1 + "px";
    var T = e.uid();
    e._waiAria.minicalHeader(p, T), e._waiAria.minicalGrid(c.querySelector(".dhx_year_grid"), T), e._waiAria.minicalRow(g);
    for (var A = g.querySelectorAll(".dhx_scale_bar"), H = 0; H < A.length; H++)
      e._waiAria.minicalHeadCell(A[H]);
    var $ = y.querySelectorAll(".dhx_cal_month_cell"), j = new Date(M);
    for (H = 0; H < $.length; H++)
      e._waiAria.minicalDayCell($[H], new Date(j)), j = e.date.add(j, 1, "day");
    return e._waiAria.minicalHeader(p, T), this._cols = _, this._mode = a, this._colsS = o, this._min_date = l, this._max_date = h, e._date = m, s.month_day = v, this._ignores_detected = u, c;
  }, e.destroyCalendar = function(t, r) {
    !t && this._def_count && this._def_count.firstChild && (r || (/* @__PURE__ */ new Date()).valueOf() - this._def_count._created.valueOf() > 500) && (t = this._def_count.firstChild), t && (i.detachAll(), t.innerHTML = "", t.parentNode && t.parentNode.removeChild(t), this._def_count && (this._def_count.style.top = "-1000px"), t.conf && t.conf._on_xle_handler && e.detachEvent(t.conf._on_xle_handler));
  }, e.isCalendarVisible = function() {
    return !!(this._def_count && parseInt(this._def_count.style.top, 10) > 0) && this._def_count;
  }, e.attachEvent("onTemplatesReady", function() {
    e.event(document.body, "click", function() {
      e.destroyCalendar();
    });
  }, { once: !0 }), e.form_blocks.calendar_time = { render: function(t) {
    var r = "<span class='dhx_minical_input_wrapper'><input class='dhx_readonly dhx_minical_input' type='text' readonly='true'></span>", d = e.config, n = this.date.date_part(e._currentDate()), s = 1440, _ = 0;
    d.limit_time_select && (_ = 60 * d.first_hour, s = 60 * d.last_hour + 1), n.setHours(_ / 60), t._time_values = [], r += " <select class='dhx_lightbox_time_select'>";
    for (var a = _; a < s; a += 1 * this.config.time_step)
      r += "<option value='" + a + "'>" + this.templates.time_picker(n) + "</option>", t._time_values.push(a), n = this.date.add(n, this.config.time_step, "minute");
    return "<div class='dhx_section_time dhx_lightbox_minical'>" + (r += "</select>") + "<span class='dhx_lightbox_minical_spacer'> &nbsp;&ndash;&nbsp; </span>" + r + "</div>";
  }, set_value: function(t, r, d, n) {
    var s, _, a = t.getElementsByTagName("input"), o = t.getElementsByTagName("select"), l = function(p, g, y) {
      e.event(p, "click", function() {
        e.destroyCalendar(null, !0), e.renderCalendar({ position: p, date: new Date(this._date), navigation: !0, handler: function(x) {
          p.value = e.templates.calendar_time(x), p._date = new Date(x), e.destroyCalendar(), e.config.event_duration && e.config.auto_end_date && y === 0 && u();
        } });
      });
    };
    if (e.config.full_day) {
      if (!t._full_day) {
        var h = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + e.locale.labels.full_day + "&nbsp;</label></input>";
        e.config.wide_form || (h = t.previousSibling.innerHTML + h), t.previousSibling.innerHTML = h, t._full_day = !0;
      }
      var m = t.previousSibling.getElementsByTagName("input")[0], v = e.date.time_part(d.start_date) === 0 && e.date.time_part(d.end_date) === 0;
      m.checked = v, o[0].disabled = m.checked, o[1].disabled = m.checked, m.$_eventAttached || (m.$_eventAttached = !0, e.event(m, "click", function() {
        if (m.checked === !0) {
          var p = {};
          e.form_blocks.calendar_time.get_value(t, p), s = e.date.date_part(p.start_date), (+(_ = e.date.date_part(p.end_date)) == +s || +_ >= +s && (d.end_date.getHours() !== 0 || d.end_date.getMinutes() !== 0)) && (_ = e.date.add(_, 1, "day"));
        } else
          s = null, _ = null;
        var g = s || d.start_date, y = _ || d.end_date;
        c(a[0], g), c(a[1], y), o[0].value = 60 * g.getHours() + g.getMinutes(), o[1].value = 60 * y.getHours() + y.getMinutes(), o[0].disabled = m.checked, o[1].disabled = m.checked;
      }));
    }
    if (e.config.event_duration && e.config.auto_end_date) {
      var u = function() {
        e.config.auto_end_date && e.config.event_duration && (s = e.date.add(a[0]._date, o[0].value, "minute"), _ = new Date(s.getTime() + 60 * e.config.event_duration * 1e3), a[1].value = e.templates.calendar_time(_), a[1]._date = e.date.date_part(new Date(_)), o[1].value = 60 * _.getHours() + _.getMinutes());
      };
      o[0].$_eventAttached || o[0].addEventListener("change", u);
    }
    function c(p, g, y) {
      l(p, g, y), p.value = e.templates.calendar_time(g), p._date = e.date.date_part(new Date(g));
    }
    function f(p) {
      for (var g = n._time_values, y = 60 * p.getHours() + p.getMinutes(), x = y, b = !1, k = 0; k < g.length; k++) {
        var w = g[k];
        if (w === y) {
          b = !0;
          break;
        }
        w < y && (x = w);
      }
      return b || x ? b ? y : x : -1;
    }
    c(a[0], d.start_date, 0), c(a[1], d.end_date, 1), l = function() {
    }, o[0].value = f(d.start_date), o[1].value = f(d.end_date);
  }, get_value: function(t, r) {
    var d = t.getElementsByTagName("input"), n = t.getElementsByTagName("select");
    return r.start_date = e.date.add(d[0]._date, n[0].value, "minute"), r.end_date = e.date.add(d[1]._date, n[1].value, "minute"), r.end_date <= r.start_date && (r.end_date = e.date.add(r.start_date, e.config.time_step, "minute")), { start_date: new Date(r.start_date), end_date: new Date(r.end_date) };
  }, focus: function(t) {
  } }, e.linkCalendar = function(t, r) {
    var d = function() {
      var n = e._date, s = new Date(n.valueOf());
      return r && (s = r(s)), s.setDate(1), e.updateCalendar(t, s), !0;
    };
    e.attachEvent("onViewChange", d), e.attachEvent("onXLE", d), e.attachEvent("onEventAdded", d), e.attachEvent("onEventChanged", d), e.attachEvent("onEventDeleted", d), d();
  }, e._markCalendarCurrentDate = function(t) {
    var r = e.getState(), d = r.min_date, n = r.max_date, s = r.mode, _ = e.date.month_start(new Date(t._date)), a = e.date.add(_, 1, "month");
    if (!({ month: !0, year: !0, agenda: !0, grid: !0 }[s] || d.valueOf() <= _.valueOf() && n.valueOf() >= a.valueOf()))
      for (var o = d; o.valueOf() < n.valueOf(); )
        _.valueOf() <= o.valueOf() && a > o && e.markCalendar(t, o, "dhx_calendar_click"), o = e.date.add(o, 1, "day");
  }, e.attachEvent("onEventCancel", function() {
    e.destroyCalendar(null, !0);
  }), e.attachEvent("onDestroy", function() {
    e.destroyCalendar();
  });
}, monthheight: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    e.xy.scroll_width = 0;
    var i = e.render_view_data;
    e.render_view_data = function() {
      var r = this._els.dhx_cal_data[0];
      r.firstChild._h_fix = !0, i.apply(e, arguments);
      var d = parseInt(r.style.height);
      r.style.height = "1px", r.style.height = r.scrollHeight + "px", this._obj.style.height = this._obj.clientHeight + r.scrollHeight - d + "px";
    };
    var t = e._reset_month_scale;
    e._reset_month_scale = function(r, d, n, s) {
      var _ = { clientHeight: 100 };
      t.apply(e, [_, d, n, s]), r.innerHTML = _.innerHTML;
    };
  });
}, multisection: function(e) {
  de("Multisection", e.assert);
}, multiselect: function(e) {
  e.form_blocks.multiselect = { render: function(i) {
    var t = "dhx_multi_select_control dhx_multi_select_" + i.name;
    i.vertical && (t += " dhx_multi_select_control_vertical");
    for (var r = "<div class='" + t + "' style='overflow: auto; max-height: " + i.height + "px; position: relative;' >", d = 0; d < i.options.length; d++)
      r += "<label><input type='checkbox' value='" + i.options[d].key + "'/>" + i.options[d].label + "</label>";
    return r += "</div>";
  }, set_value: function(i, t, r, d) {
    for (var n = i.getElementsByTagName("input"), s = 0; s < n.length; s++)
      n[s].checked = !1;
    function _(m) {
      for (var v = i.getElementsByTagName("input"), u = 0; u < v.length; u++)
        v[u].checked = !!m[v[u].value];
    }
    var a = {};
    if (r[d.map_to]) {
      var o = (r[d.map_to] + "").split(d.delimiter || e.config.section_delimiter || ",");
      for (s = 0; s < o.length; s++)
        a[o[s]] = !0;
      _(a);
    } else {
      if (e._new_event || !d.script_url)
        return;
      var l = document.createElement("div");
      l.className = "dhx_loading", l.style.cssText = "position: absolute; top: 40%; left: 40%;", i.appendChild(l);
      var h = [d.script_url, d.script_url.indexOf("?") == -1 ? "?" : "&", "dhx_crosslink_" + d.map_to + "=" + r.id + "&uid=" + e.uid()].join("");
      e.ajax.get(h, function(m) {
        var v = function(u, c) {
          try {
            for (var f = JSON.parse(u.xmlDoc.responseText), p = {}, g = 0; g < f.length; g++) {
              var y = f[g];
              p[y.value || y.key || y.id] = !0;
            }
            return p;
          } catch {
            return null;
          }
        }(m);
        v || (v = function(u, c) {
          for (var f = e.ajax.xpath("//data/item", u.xmlDoc), p = {}, g = 0; g < f.length; g++)
            p[f[g].getAttribute(c.map_to)] = !0;
          return p;
        }(m, d)), _(v), i.removeChild(l);
      });
    }
  }, get_value: function(i, t, r) {
    for (var d = [], n = i.getElementsByTagName("input"), s = 0; s < n.length; s++)
      n[s].checked && d.push(n[s].value);
    return d.join(r.delimiter || e.config.section_delimiter || ",");
  }, focus: function(i) {
  } };
}, multisource: function(e) {
  var i = e._load;
  e._load = function(t, r) {
    if (typeof (t = t || this._load_url) == "object")
      for (var d = function(s) {
        var _ = function() {
        };
        return _.prototype = s, _;
      }(this._loaded), n = 0; n < t.length; n++)
        this._loaded = new d(), i.call(this, t[n], r);
    else
      i.apply(this, arguments);
  };
}, mvc: function(e) {
  var i, t = { use_id: !1 };
  function r(s) {
    var _ = {};
    for (var a in s)
      a.indexOf("_") !== 0 && (_[a] = s[a]);
    return t.use_id || delete _.id, _;
  }
  function d(s) {
    s._not_render = !1, s._render_wait && s.render_view_data(), s._loading = !1, s.callEvent("onXLE", []);
  }
  function n(s) {
    return t.use_id ? s.id : s.cid;
  }
  e.backbone = function(s, _) {
    _ && (t = _), s.bind("change", function(l, h) {
      var m = n(l), v = e._events[m] = l.toJSON();
      v.id = m, e._init_event(v), clearTimeout(i), i = setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.updateView();
      }, 1);
    }), s.bind("remove", function(l, h) {
      var m = n(l);
      e._events[m] && e.deleteEvent(m);
    });
    var a = [];
    function o() {
      if (e.$destroyed)
        return !0;
      a.length && (e.parse(a, "json"), a = []);
    }
    s.bind("add", function(l, h) {
      var m = n(l);
      if (!e._events[m]) {
        var v = l.toJSON();
        v.id = m, e._init_event(v), a.push(v), a.length == 1 && setTimeout(o, 1);
      }
    }), s.bind("request", function(l) {
      var h;
      l instanceof Backbone.Collection && ((h = e)._loading = !0, h._not_render = !0, h.callEvent("onXLS", []));
    }), s.bind("sync", function(l) {
      l instanceof Backbone.Collection && d(e);
    }), s.bind("error", function(l) {
      l instanceof Backbone.Collection && d(e);
    }), e.attachEvent("onEventCreated", function(l) {
      var h = new s.model(e.getEvent(l));
      return e._events[l] = h.toJSON(), e._events[l].id = l, !0;
    }), e.attachEvent("onEventAdded", function(l) {
      if (!s.get(l)) {
        var h = r(e.getEvent(l)), m = new s.model(h), v = n(m);
        v != l && this.changeEventId(l, v), s.add(m), s.trigger("scheduler:add", m);
      }
      return !0;
    }), e.attachEvent("onEventChanged", function(l) {
      var h = s.get(l), m = r(e.getEvent(l));
      return h.set(m), s.trigger("scheduler:change", h), !0;
    }), e.attachEvent("onEventDeleted", function(l) {
      var h = s.get(l);
      return h && (s.trigger("scheduler:remove", h), s.remove(l)), !0;
    });
  };
}, outerdrag: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    var i, t = new dhtmlDragAndDropObject(), r = t.stopDrag;
    function d(n, s, _, a) {
      if (!e.checkEvent("onBeforeExternalDragIn") || e.callEvent("onBeforeExternalDragIn", [n, s, _, a, i])) {
        var o = e.attachEvent("onEventCreated", function(u) {
          e.callEvent("onExternalDragIn", [u, n, i]) || (this._drag_mode = this._drag_id = null, this.deleteEvent(u));
        }), l = e.getActionData(i), h = { start_date: new Date(l.date) };
        if (e.matrix && e.matrix[e._mode]) {
          var m = e.matrix[e._mode];
          h[m.y_property] = l.section;
          var v = e._locate_cell_timeline(i);
          h.start_date = m._trace_x[v.x], h.end_date = e.date.add(h.start_date, m.x_step, m.x_unit);
        }
        e._props && e._props[e._mode] && (h[e._props[e._mode].map_to] = l.section), e.addEventNow(h), e.detachEvent(o);
      }
    }
    t.stopDrag = function(n) {
      return i = n, r.apply(this, arguments);
    }, t.addDragLanding(e._els.dhx_cal_data[0], { _drag: function(n, s, _, a) {
      d(n, s, _, a);
    }, _dragIn: function(n, s) {
      return n;
    }, _dragOut: function(n) {
      return this;
    } }), dhtmlx.DragControl && dhtmlx.DragControl.addDrop(e._els.dhx_cal_data[0], { onDrop: function(n, s, _, a) {
      var o = dhtmlx.DragControl.getMaster(n);
      i = a, d(n, o, s, a.target || a.srcElement);
    }, onDragIn: function(n, s, _) {
      return s;
    } }, !0);
  });
}, pdf: function(e) {
  var i, t, r = new RegExp("<[^>]*>", "g"), d = new RegExp("<br[^>]*>", "g");
  function n(b) {
    return b.replace(d, `
`).replace(r, "");
  }
  function s(b, k) {
    b = parseFloat(b), k = parseFloat(k), isNaN(k) || (b -= k);
    var w = a(b);
    return b = b - w.width + w.cols * i, isNaN(b) ? "auto" : 100 * b / i;
  }
  function _(b, k, w) {
    b = parseFloat(b), k = parseFloat(k), !isNaN(k) && w && (b -= k);
    var D = a(b);
    return b = b - D.width + D.cols * i, isNaN(b) ? "auto" : 100 * b / (i - (isNaN(k) ? 0 : k));
  }
  function a(b) {
    for (var k = 0, w = e._els.dhx_cal_header[0].childNodes, D = w[1] ? w[1].childNodes : w[0].childNodes, E = 0; E < D.length; E++) {
      var S = D[E].style ? D[E] : D[E].parentNode, N = parseFloat(S.style.width);
      if (!(b > N))
        break;
      b -= N + 1, k += N + 1;
    }
    return { width: k, cols: E };
  }
  function o(b) {
    return b = parseFloat(b), isNaN(b) ? "auto" : 100 * b / t;
  }
  function l(b, k) {
    return (window.getComputedStyle ? window.getComputedStyle(b, null)[k] : b.currentStyle ? b.currentStyle[k] : null) || "";
  }
  function h(b, k) {
    for (var w = parseInt(b.style.left, 10), D = 0; D < e._cols.length; D++)
      if ((w -= e._cols[D]) < 0)
        return D;
    return k;
  }
  function m(b, k) {
    for (var w = parseInt(b.style.top, 10), D = 0; D < e._colsS.heights.length; D++)
      if (e._colsS.heights[D] > w)
        return D;
    return k;
  }
  function v(b) {
    return b ? "</" + b + ">" : "";
  }
  function u(b, k, w, D) {
    var E = "<" + b + " profile='" + k + "'";
    return w && (E += " header='" + w + "'"), D && (E += " footer='" + D + "'"), E += ">";
  }
  function c() {
    var b = "", k = e._mode;
    if (e.matrix && e.matrix[e._mode] && (k = e.matrix[e._mode].render == "cell" ? "matrix" : "timeline"), b += "<scale mode='" + k + "' today='" + e._els.dhx_cal_date[0].innerHTML + "'>", e._mode == "week_agenda")
      for (var w = e._els.dhx_cal_data[0].getElementsByTagName("DIV"), D = 0; D < w.length; D++)
        w[D].className == "dhx_wa_scale_bar" && (b += "<column>" + n(w[D].innerHTML) + "</column>");
    else if (e._mode == "agenda" || e._mode == "map")
      b += "<column>" + n((w = e._els.dhx_cal_header[0].childNodes[0].childNodes)[0].innerHTML) + "</column><column>" + n(w[1].innerHTML) + "</column>";
    else if (e._mode == "year")
      for (w = e._els.dhx_cal_data[0].childNodes, D = 0; D < w.length; D++)
        b += "<month label='" + n(w[D].querySelector(".dhx_year_month").innerHTML) + "'>", b += p(w[D].querySelector(".dhx_year_week").childNodes), b += f(w[D].querySelector(".dhx_year_body")), b += "</month>";
    else {
      b += "<x>", b += p(w = e._els.dhx_cal_header[0].childNodes), b += "</x>";
      var E = e._els.dhx_cal_data[0];
      if (e.matrix && e.matrix[e._mode]) {
        for (b += "<y>", D = 0; D < E.firstChild.rows.length; D++)
          b += "<row><![CDATA[" + n(E.firstChild.rows[D].cells[0].innerHTML) + "]]></row>";
        b += "</y>", t = E.firstChild.rows[0].cells[0].offsetHeight;
      } else if (E.firstChild.tagName == "TABLE")
        b += f(E);
      else {
        for (E = E.childNodes[E.childNodes.length - 1]; E.className.indexOf("dhx_scale_holder") == -1; )
          E = E.previousSibling;
        for (E = E.childNodes, b += "<y>", D = 0; D < E.length; D++)
          b += `
<row><![CDATA[` + n(E[D].innerHTML) + "]]></row>";
        b += "</y>", t = E[0].offsetHeight;
      }
    }
    return b += "</scale>";
  }
  function f(b) {
    for (var k = "", w = b.querySelectorAll("tr"), D = 0; D < w.length; D++) {
      for (var E = [], S = w[D].querySelectorAll("td"), N = 0; N < S.length; N++)
        E.push(S[N].querySelector(".dhx_month_head").innerHTML);
      k += `
<row height='` + S[0].offsetHeight + "'><![CDATA[" + n(E.join("|")) + "]]></row>", t = S[0].offsetHeight;
    }
    return k;
  }
  function p(b) {
    var k, w = "";
    e.matrix && e.matrix[e._mode] && (e.matrix[e._mode].second_scale && (k = b[1].childNodes), b = b[0].childNodes);
    for (var D = 0; D < b.length; D++)
      w += `
<column><![CDATA[` + n(b[D].innerHTML) + "]]></column>";
    if (i = b[0].offsetWidth, k) {
      var E = 0, S = b[0].offsetWidth, N = 1;
      for (D = 0; D < k.length; D++)
        w += `
<column second_scale='` + N + "'><![CDATA[" + n(k[D].innerHTML) + "]]></column>", (E += k[D].offsetWidth) >= S && (S += b[N] ? b[N].offsetWidth : 0, N++), i = k[0].offsetWidth;
    }
    return w;
  }
  function g(b) {
    var k = "", w = e._rendered, D = e.matrix && e.matrix[e._mode];
    if (e._mode == "agenda" || e._mode == "map")
      for (var E = 0; E < w.length; E++)
        k += "<event><head><![CDATA[" + n(w[E].childNodes[0].innerHTML) + "]]></head><body><![CDATA[" + n(w[E].childNodes[2].innerHTML) + "]]></body></event>";
    else if (e._mode == "week_agenda")
      for (E = 0; E < w.length; E++)
        k += "<event day='" + w[E].parentNode.getAttribute("day") + "'><body>" + n(w[E].innerHTML) + "</body></event>";
    else if (e._mode == "year")
      for (w = e.get_visible_events(), E = 0; E < w.length; E++) {
        var S = w[E].start_date;
        for (S.valueOf() < e._min_date.valueOf() && (S = e._min_date); S < w[E].end_date; ) {
          var N = S.getMonth() + 12 * (S.getFullYear() - e._min_date.getFullYear()) - e.week_starts._month, M = e.week_starts[N] + S.getDate() - 1, T = b ? l(e._get_year_cell(S), "color") : "", A = b ? l(e._get_year_cell(S), "backgroundColor") : "";
          if (k += "<event day='" + M % 7 + "' week='" + Math.floor(M / 7) + "' month='" + N + "' backgroundColor='" + A + "' color='" + T + "'></event>", (S = e.date.add(S, 1, "day")).valueOf() >= e._max_date.valueOf())
            break;
        }
      }
    else if (D && D.render == "cell")
      for (w = e._els.dhx_cal_data[0].getElementsByTagName("TD"), E = 0; E < w.length; E++)
        T = b ? l(w[E], "color") : "", k += `
<event><body backgroundColor='` + (A = b ? l(w[E], "backgroundColor") : "") + "' color='" + T + "'><![CDATA[" + n(w[E].innerHTML) + "]]></body></event>";
    else
      for (E = 0; E < w.length; E++) {
        var H, $;
        if (e.matrix && e.matrix[e._mode])
          H = s(w[E].style.left), $ = s(w[E].offsetWidth) - 1;
        else {
          var j = e.config.use_select_menu_space ? 0 : 26;
          H = _(w[E].style.left, j, !0), $ = _(w[E].style.width, j) - 1;
        }
        if (!isNaN(1 * $)) {
          var z = o(w[E].style.top), W = o(w[E].style.height), Y = w[E].className.split(" ")[0].replace("dhx_cal_", "");
          if (Y !== "dhx_tooltip_line") {
            var q = e.getEvent(w[E].getAttribute(e.config.event_attribute));
            if (q) {
              M = q._sday;
              var V = q._sweek, ve = q._length || 0;
              if (e._mode == "month")
                W = parseInt(w[E].offsetHeight, 10), z = parseInt(w[E].style.top, 10) - e.xy.month_head_height, M = h(w[E], M), V = m(w[E], V);
              else if (e.matrix && e.matrix[e._mode]) {
                M = 0, V = w[E].parentNode.parentNode.parentNode.rowIndex;
                var Ne = t;
                t = w[E].parentNode.offsetHeight, z = o(w[E].style.top), z -= 0.2 * z, t = Ne;
              } else {
                if (w[E].parentNode == e._els.dhx_cal_data[0])
                  continue;
                var xe = e._els.dhx_cal_data[0].childNodes[0], St = parseFloat(xe.className.indexOf("dhx_scale_holder") != -1 ? xe.style.left : 0);
                H += s(w[E].parentNode.style.left, St);
              }
              k += `
<event week='` + V + "' day='" + M + "' type='" + Y + "' x='" + H + "' y='" + z + "' width='" + $ + "' height='" + W + "' len='" + ve + "'>", Y == "event" ? (k += "<header><![CDATA[" + n(w[E].childNodes[1].innerHTML) + "]]></header>", T = b ? l(w[E].childNodes[2], "color") : "", k += "<body backgroundColor='" + (A = b ? l(w[E].childNodes[2], "backgroundColor") : "") + "' color='" + T + "'><![CDATA[" + n(w[E].childNodes[2].innerHTML) + "]]></body>") : (T = b ? l(w[E], "color") : "", k += "<body backgroundColor='" + (A = b ? l(w[E], "backgroundColor") : "") + "' color='" + T + "'><![CDATA[" + n(w[E].innerHTML) + "]]></body>"), k += "</event>";
            }
          }
        }
      }
    return k;
  }
  function y(b, k, w, D, E, S) {
    var N = !1;
    D == "fullcolor" && (N = !0, D = "color"), D = D || "color";
    var M, T = "";
    if (b) {
      var A = e._date, H = e._mode;
      k = e.date[w + "_start"](k), k = e.date["get_" + w + "_end"] ? e.date["get_" + w + "_end"](k) : e.date.add(k, 1, w), T = u("pages", D, E, S);
      for (var $ = new Date(b); +$ < +k; $ = this.date.add($, 1, w))
        this.setCurrentView($, w), T += ((M = "page") ? "<" + M + ">" : "") + c().replace("–", "-") + g(N) + v("page");
      T += v("pages"), this.setCurrentView(A, H);
    } else
      T = u("data", D, E, S) + c().replace("–", "-") + g(N) + v("data");
    return T;
  }
  function x(b, k, w, D, E, S, N) {
    (function(M, T) {
      var A = e.uid(), H = document.createElement("div");
      H.style.display = "none", document.body.appendChild(H), H.innerHTML = '<form id="' + A + '" method="post" target="_blank" action="' + T + '" accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><input type="hidden" name="mycoolxmlbody"/> </form>', document.getElementById(A).firstChild.value = encodeURIComponent(M), document.getElementById(A).submit(), H.parentNode.removeChild(H);
    })(typeof E == "object" ? function(M) {
      for (var T = "<data>", A = 0; A < M.length; A++)
        T += M[A].source.getPDFData(M[A].start, M[A].end, M[A].view, M[A].mode, M[A].header, M[A].footer);
      return T += "</data>", T;
    }(E) : y.apply(this, [b, k, w, E, S, N]), D);
  }
  e.getPDFData = y, e.toPDF = function(b, k, w, D) {
    return x.apply(this, [null, null, null, b, k, w, D]);
  }, e.toPDFRange = function(b, k, w, D, E, S, N) {
    return typeof b == "string" && (b = e.templates.api_date(b), k = e.templates.api_date(k)), x.apply(this, arguments);
  };
}, quick_info: function(e) {
  e.config.icons_select = ["icon_form", "icon_delete"], e.config.details_on_create = !0, e.config.show_quick_info = !0, e.xy.menu_width = 0;
  let i = null;
  function t(d) {
    const n = d.getBoundingClientRect(), s = e.$container.getBoundingClientRect().bottom - n.bottom;
    s < 0 && (d.style.top = `${parseFloat(d.style.top) + s}px`);
  }
  function r(d) {
    let n = 0, s = 0, _ = d;
    for (; _ && _ != e._obj; )
      n += _.offsetLeft, s += _.offsetTop - _.scrollTop, _ = _.offsetParent;
    return _ ? { left: n, top: s, dx: n + d.offsetWidth / 2 > e._x / 2 ? 1 : 0, dy: s + d.offsetHeight / 2 > e._y / 2 ? 1 : 0, width: d.offsetWidth, height: d.offsetHeight } : 0;
  }
  e.attachEvent("onSchedulerReady", function() {
    const d = e.$container;
    d._$quickInfoHandler || (d._$quickInfoHandler = !0, e.event(d, "mousedown", function(n) {
      const s = n.target.closest(`[${e.config.event_attribute}]`);
      s && (i = { id: s.getAttribute(e.config.event_attribute), position: r(s) });
    }), e.attachEvent("onDestroy", () => {
      delete d._$quickInfoHandler;
    }));
  }), e.attachEvent("onClick", function(d) {
    if (e.config.show_quick_info)
      return e.showQuickInfo(d), !0;
  }), function() {
    for (var d = ["onEmptyClick", "onViewChange", "onLightbox", "onBeforeEventDelete", "onBeforeDrag"], n = function() {
      return e.hideQuickInfo(!0), !0;
    }, s = 0; s < d.length; s++)
      e.attachEvent(d[s], n);
  }(), e.templates.quick_info_title = function(d, n, s) {
    return s.text.substr(0, 50);
  }, e.templates.quick_info_content = function(d, n, s) {
    return s.details || "";
  }, e.templates.quick_info_date = function(d, n, s) {
    return e.isOneDayEvent(s) && e.config.rtl ? e.templates.day_date(d, n, s) + " " + e.templates.event_header(n, d, s) : e.isOneDayEvent(s) ? e.templates.day_date(d, n, s) + " " + e.templates.event_header(d, n, s) : e.config.rtl ? e.templates.week_date(n, d, s) : e.templates.week_date(d, n, s);
  }, e.showQuickInfo = function(d) {
    if (d == this._quick_info_box_id || (this.hideQuickInfo(!0), this.callEvent("onBeforeQuickInfo", [d]) === !1))
      return;
    let n;
    n = i && i.id == d ? i.position : this._get_event_counter_part(d), n && (this._quick_info_box = this._init_quick_info(n), this._fill_quick_data(d), this._show_quick_info(n), this.callEvent("onQuickInfo", [d]));
  }, function() {
    function d(n) {
      n = n || "";
      var s, _ = parseFloat(n), a = n.match(/m?s/);
      switch (a && (a = a[0]), a) {
        case "s":
          s = 1e3 * _;
          break;
        case "ms":
          s = _;
          break;
        default:
          s = 0;
      }
      return s;
    }
    e.hideQuickInfo = function(n) {
      var s = this._quick_info_box, _ = this._quick_info_box_id;
      if (this._quick_info_box_id = 0, s && s.parentNode) {
        var a = s.offsetWidth;
        if (e.config.quick_info_detached)
          return this.callEvent("onAfterQuickInfo", [_]), s.parentNode.removeChild(s);
        if (s.style.right == "auto" ? s.style.left = -a + "px" : s.style.right = -a + "px", n)
          s.parentNode.removeChild(s);
        else {
          var o;
          window.getComputedStyle ? o = window.getComputedStyle(s, null) : s.currentStyle && (o = s.currentStyle);
          var l = d(o["transition-delay"]) + d(o["transition-duration"]);
          setTimeout(function() {
            s.parentNode && s.parentNode.removeChild(s);
          }, l);
        }
        this.callEvent("onAfterQuickInfo", [_]);
      }
    };
  }(), e.event(window, "keydown", function(d) {
    d.keyCode == 27 && e.hideQuickInfo();
  }), e._show_quick_info = function(d) {
    var n = e._quick_info_box;
    e._obj.appendChild(n);
    var s = n.offsetWidth, _ = n.offsetHeight;
    if (e.config.quick_info_detached) {
      var a = d.left - d.dx * (s - d.width);
      e.getView() && e.getView()._x_scroll && (e.config.rtl ? a += e.getView()._x_scroll : a -= e.getView()._x_scroll), a + s > window.innerWidth && (a = window.innerWidth - s), a = Math.max(0, a), n.style.left = a + "px", n.style.top = d.top - (d.dy ? _ : -d.height) + "px";
    } else {
      const o = e.$container.querySelector(".dhx_cal_data").offsetTop;
      n.style.top = o + 20 + "px", d.dx == 1 ? (n.style.right = "auto", n.style.left = -s + "px", setTimeout(function() {
        n.style.left = "-10px";
      }, 1)) : (n.style.left = "auto", n.style.right = -s + "px", setTimeout(function() {
        n.style.right = "-10px";
      }, 1)), n.className = n.className.replace(" dhx_qi_left", "").replace(" dhx_qi_right", "") + " dhx_qi_" + (d.dx == 1 ? "left" : "right");
    }
    n.ontransitionend = () => {
      t(n), n.ontransitionend = null;
    }, setTimeout(() => {
      t(n);
    }, 1);
  }, e.attachEvent("onTemplatesReady", function() {
    if (e.hideQuickInfo(), this._quick_info_box) {
      var d = this._quick_info_box;
      d.parentNode && d.parentNode.removeChild(d), this._quick_info_box = null;
    }
  }), e._quick_info_onscroll_handler = function(d) {
    e.hideQuickInfo();
  }, e._init_quick_info = function() {
    if (!this._quick_info_box) {
      var d = this._quick_info_box = document.createElement("div");
      this._waiAria.quickInfoAttr(d), d.className = "dhx_cal_quick_info", e.$testmode && (d.className += " dhx_no_animate"), e.config.rtl && (d.className += " dhx_quick_info_rtl");
      var n = `
		<div class="dhx_cal_qi_tcontrols">
			<a class="dhx_cal_qi_close_btn scheduler_icon close"></a>
		</div>
		<div class="dhx_cal_qi_title" ${this._waiAria.quickInfoHeaderAttrString()}>
				
				<div class="dhx_cal_qi_tcontent"></div>
				<div class="dhx_cal_qi_tdate"></div>
			</div>
			<div class="dhx_cal_qi_content"></div>`;
      n += '<div class="dhx_cal_qi_controls">';
      for (var s = e.config.icons_select, _ = 0; _ < s.length; _++)
        n += `<div ${this._waiAria.quickInfoButtonAttrString(this.locale.labels[s[_]])} class="dhx_qi_big_icon ${s[_]}" title="${e.locale.labels[s[_]]}">
				<div class='dhx_menu_icon ${s[_]}'></div><div>${e.locale.labels[s[_]]}</div></div>`;
      n += "</div>", d.innerHTML = n, e.event(d, "click", function(a) {
        e._qi_button_click(a.target || a.srcElement);
      }), e.config.quick_info_detached && (e._detachDomEvent(e._els.dhx_cal_data[0], "scroll", e._quick_info_onscroll_handler), e.event(e._els.dhx_cal_data[0], "scroll", e._quick_info_onscroll_handler));
    }
    return this._quick_info_box;
  }, e._qi_button_click = function(d) {
    var n = e._quick_info_box;
    if (d && d != n)
      if (d.closest(".dhx_cal_qi_close_btn"))
        e.hideQuickInfo();
      else {
        var s = e._getClassName(d);
        if (s.indexOf("_icon") != -1) {
          var _ = e._quick_info_box_id;
          e._click.buttons[s.split(" ")[1].replace("icon_", "")](_);
        } else
          e._qi_button_click(d.parentNode);
      }
  }, e._get_event_counter_part = function(d) {
    return r(e.getRenderedEvent(d));
  }, e._fill_quick_data = function(d) {
    var n = e.getEvent(d), s = e._quick_info_box;
    e._quick_info_box_id = d;
    var _ = { content: e.templates.quick_info_title(n.start_date, n.end_date, n), date: e.templates.quick_info_date(n.start_date, n.end_date, n) };
    s.querySelector(".dhx_cal_qi_tcontent").innerHTML = `<span>${_.content}</span>`, s.querySelector(".dhx_cal_qi_tdate").innerHTML = _.date, e._waiAria.quickInfoHeader(s, [_.content, _.date].join(" "));
    var a = s.querySelector(".dhx_cal_qi_content");
    const o = e.templates.quick_info_content(n.start_date, n.end_date, n);
    o ? (a.classList.remove("dhx_hidden"), a.innerHTML = o) : a.classList.add("dhx_hidden");
  };
}, readonly: function(e) {
  e.attachEvent("onTemplatesReady", function() {
    var i;
    e.form_blocks.recurring && (i = e.form_blocks.recurring.set_value);
    var t = e.config.buttons_left.slice(), r = e.config.buttons_right.slice();
    function d(_, a, o, l) {
      for (var h = a.getElementsByTagName(_), m = o.getElementsByTagName(_), v = m.length - 1; v >= 0; v--)
        if (o = m[v], l) {
          var u = document.createElement("span");
          u.className = "dhx_text_disabled", u.innerHTML = l(h[v]), o.parentNode.insertBefore(u, o), o.parentNode.removeChild(o);
        } else
          o.disabled = !0, a.checked && (o.checked = !0);
    }
    e.attachEvent("onBeforeLightbox", function(_) {
      this.config.readonly_form || this.getEvent(_).readonly ? this.config.readonly_active = !0 : (this.config.readonly_active = !1, e.config.buttons_left = t.slice(), e.config.buttons_right = r.slice(), e.form_blocks.recurring && (e.form_blocks.recurring.set_value = i));
      var a = this.config.lightbox.sections;
      if (this.config.readonly_active) {
        for (var o = 0; o < a.length; o++)
          a[o].type == "recurring" && this.config.readonly_active && e.form_blocks.recurring && (e.form_blocks.recurring.set_value = function(p, g, y) {
            var x = e.$domHelpers.closest(p, ".dhx_wrap_section"), b = "none";
            x.querySelector(".dhx_cal_lsection").display = b, x.querySelector(".dhx_form_repeat").display = b, x.style.display = b, e.setLightboxSize();
          });
        var l = ["dhx_delete_btn", "dhx_save_btn"], h = [e.config.buttons_left, e.config.buttons_right];
        for (o = 0; o < l.length; o++)
          for (var m = l[o], v = 0; v < h.length; v++) {
            for (var u = h[v], c = -1, f = 0; f < u.length; f++)
              if (u[f] == m) {
                c = f;
                break;
              }
            c != -1 && u.splice(c, 1);
          }
      }
      return this.resetLightbox(), !0;
    });
    var n = e._fill_lightbox;
    e._fill_lightbox = function() {
      var _ = this.getLightbox();
      this.config.readonly_active && (_.style.visibility = "hidden", _.style.display = "block");
      var a = n.apply(this, arguments);
      if (this.config.readonly_active && (_.style.visibility = "", _.style.display = "none"), this.config.readonly_active) {
        var o = this.getLightbox(), l = this._lightbox_r = o.cloneNode(!0);
        l.id = e.uid(), l.className += " dhx_cal_light_readonly", d("textarea", o, l, function(h) {
          return h.value;
        }), d("input", o, l, !1), d("select", o, l, function(h) {
          return h.options.length ? h.options[Math.max(h.selectedIndex || 0, 0)].text : "";
        }), o.parentNode.insertBefore(l, o), this.showCover(l), e._lightbox && e._lightbox.parentNode.removeChild(e._lightbox), this._lightbox = l, e.config.drag_lightbox && e.event(l.firstChild, "mousedown", e._ready_to_dnd), e._init_lightbox_events(), this.setLightboxSize();
      }
      return a;
    };
    var s = e.hide_lightbox;
    e.hide_lightbox = function() {
      return this._lightbox_r && (this._lightbox_r.parentNode.removeChild(this._lightbox_r), this._lightbox_r = this._lightbox = null), s.apply(this, arguments);
    };
  });
}, recurring: function(e) {
  function i(u) {
    return new Date(u.getFullYear(), u.getMonth(), u.getDate(), u.getHours(), u.getMinutes(), u.getSeconds(), 0);
  }
  function t(u) {
    return !!u.rrule && !u.recurring_event_id;
  }
  function r(u) {
    return new Date(Date.UTC(u.getFullYear(), u.getMonth(), u.getDate(), u.getHours(), u.getMinutes(), u.getSeconds()));
  }
  var d;
  function n() {
    const u = {};
    for (const c in e._events) {
      const f = e._events[c];
      f.recurring_event_id && (u[f.recurring_event_id] || (u[f.recurring_event_id] = {}), u[f.recurring_event_id][f.original_start.valueOf()] = f);
    }
    return u;
  }
  e._rec_temp = [], e._rec_markers_pull = {}, e._rec_markers = {}, e._add_rec_marker = function(u, c) {
    u._pid_time = c, this._rec_markers[u.id] = u, this._rec_markers_pull[u.event_pid] || (this._rec_markers_pull[u.event_pid] = {}), this._rec_markers_pull[u.event_pid][c] = u;
  }, e._get_rec_marker = function(u, c) {
    let f = this._rec_markers_pull[c];
    return f ? f[u] : null;
  }, e._get_rec_markers = function(u) {
    return this._rec_markers_pull[u] || [];
  }, d = e.addEvent, e.addEvent = function(u, c, f, p, g) {
    var y = d.apply(this, arguments);
    if (y && e.getEvent(y)) {
      var x = e.getEvent(y);
      x.start_date && (x.start_date = i(x.start_date)), x.end_date && (x.end_date = i(x.end_date));
    }
    return y;
  }, e.attachEvent("onEventLoading", function(u) {
    return u.original_start && (u.original_start = e.templates.parse_date(u.original_start)), !0;
  }), e.attachEvent("onEventIdChange", function(u, c) {
    if (!this._ignore_call) {
      this._ignore_call = !0, e._rec_markers[u] && (e._rec_markers[c] = e._rec_markers[u], delete e._rec_markers[u]), e._rec_markers_pull[u] && (e._rec_markers_pull[c] = e._rec_markers_pull[u], delete e._rec_markers_pull[u]);
      for (var f = 0; f < this._rec_temp.length; f++)
        (p = this._rec_temp[f]).recurring_event_id == u && (p.recurring_event_id = c, this.changeEventId(p.id, c + "#" + p.id.split("#")[1]));
      for (var f in this._rec_markers) {
        var p;
        (p = this._rec_markers[f]).recurring_event_id == u && (p.recurring_event_id = c, p._pid_changed = !0);
      }
      var g = e._rec_markers[c];
      g && g._pid_changed && (delete g._pid_changed, setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.callEvent("onEventChanged", [c, e.getEvent(c)]);
      }, 1)), delete this._ignore_call;
    }
  }), e.attachEvent("onConfirmedBeforeEventDelete", function(u) {
    var c = this.getEvent(u);
    if (this._is_virtual_event(u) || this._is_modified_occurence(c) && !function(g) {
      return !!g.deleted;
    }(c))
      (function(g, y) {
        g = g.split("#");
        let x = e.uid(), b = g[1] ? g[1] : y._pid_time, k = e._copy_event(y);
        k.id = x, k.recurring_event_id = y.recurring_event_id || g[0], k.original_start = new Date(Number(b)), k.deleted = !0, e.addEvent(k);
      })(u, c);
    else {
      t(c) && this._lightbox_id && this._roll_back_dates(c);
      var f = this._get_rec_markers(u);
      for (var p in f)
        f.hasOwnProperty(p) && (u = f[p].id, this.getEvent(u) && this.deleteEvent(u, !0));
    }
    return !0;
  }), e.attachEvent("onEventDeleted", function(u, c) {
    !this._is_virtual_event(u) && this._is_modified_occurence(c) && (e._events[u] || (c.deleted = !0, this.setEvent(u, c)));
  }), e.attachEvent("onEventChanged", function(u, c) {
    if (this._loading)
      return !0;
    var f = this.getEvent(u);
    if (this._is_virtual_event(u))
      (function(b) {
        let k = b.id.split("#"), w = e.uid();
        e._not_render = !0;
        let D = e._copy_event(b);
        D.id = w, D.recurring_event_id = k[0];
        let E = k[1];
        D.original_start = new Date(Number(E)), e._add_rec_marker(D, E), e.addEvent(D), e._not_render = !1;
      })(f);
    else {
      f.start_date && (f.start_date = i(f.start_date)), f.end_date && (f.end_date = i(f.end_date)), t(f) && this._lightbox_id && this._roll_back_dates(f);
      var p = this._get_rec_markers(u);
      for (var g in p)
        p.hasOwnProperty(g) && (delete this._rec_markers[p[g].id], this.deleteEvent(p[g].id, !0));
      delete this._rec_markers_pull[u];
      for (var y = !1, x = 0; x < this._rendered.length; x++)
        this._rendered[x].getAttribute(this.config.event_attribute) == u && (y = !0);
      y || (this._select_id = null);
    }
    return !0;
  }), e.attachEvent("onEventAdded", function(u) {
    if (!this._loading) {
      var c = this.getEvent(u);
      t(c) && this._roll_back_dates(c);
    }
    return !0;
  }), e.attachEvent("onEventSave", function(u, c, f) {
    return t(this.getEvent(u)) && (this._select_id = null), !0;
  }), e.attachEvent("onEventCreated", function(u) {
    var c = this.getEvent(u);
    return t(c) || function(f) {
      f.rrule = "", f.original_start = null, f.recurring_event_id = null, f.duration = null, f.deleted = null;
    }(c), !0;
  }), e.attachEvent("onEventCancel", function(u) {
    var c = this.getEvent(u);
    t(c) && (this._roll_back_dates(c), this.render_view_data());
  }), e._roll_back_dates = function(u) {
    u.start_date && (u.start_date = i(u.start_date)), u.end_date && (u.end_date = i(u.end_date)), u.duration = Math.round((u.end_date.valueOf() - u.start_date.valueOf()) / 1e3), u.end_date = u._end_date, u._start_date && (u.start_date.setMonth(0), u.start_date.setDate(u._start_date.getDate()), u.start_date.setMonth(u._start_date.getMonth()), u.start_date.setFullYear(u._start_date.getFullYear()));
  }, e._is_virtual_event = function(u) {
    return u.toString().indexOf("#") != -1;
  }, e._is_modified_occurence = function(u) {
    return u.recurring_event_id && u.recurring_event_id != "0";
  }, e.showLightbox_rec = e.showLightbox, e.showLightbox = function(u) {
    var c = this.locale, f = e.config.lightbox_recurring, p = this.getEvent(u), g = p.recurring_event_id, y = this._is_virtual_event(u);
    y && (g = u.split("#")[0]);
    var x = function(k) {
      var w = e.getEvent(k);
      return w._end_date = w.end_date, w.end_date = new Date(w.start_date.valueOf() + 1e3 * w.duration), e.showLightbox_rec(k);
    };
    if ((g || 1 * g == 0) && t(p))
      return x(u);
    if (!g || g === "0" || !c.labels.confirm_recurring || f == "instance" || f == "series" && !y)
      return this.showLightbox_rec(u);
    if (f == "ask") {
      var b = this;
      e.modalbox({ text: c.labels.confirm_recurring, title: c.labels.title_confirm_recurring, width: "500px", position: "middle", buttons: [c.labels.button_edit_series, c.labels.button_edit_occurrence, c.labels.icon_cancel], callback: function(k) {
        switch (+k) {
          case 0:
            return x(g);
          case 1:
            return b.showLightbox_rec(u);
          case 2:
            return;
        }
      } });
    } else
      x(g);
  }, e.get_visible_events_rec = e.get_visible_events, e.get_visible_events = function(u) {
    for (var c = 0; c < this._rec_temp.length; c++)
      delete this._events[this._rec_temp[c].id];
    this._rec_temp = [];
    const f = n();
    var p = this.get_visible_events_rec(u), g = [];
    for (c = 0; c < p.length; c++)
      p[c].deleted || p[c].recurring_event_id || (t(p[c]) ? this.repeat_date(p[c], g, void 0, void 0, void 0, void 0, f) : g.push(p[c]));
    return g;
  }, function() {
    var u = e.isOneDayEvent;
    e.isOneDayEvent = function(f) {
      return !!t(f) || u.call(this, f);
    };
    var c = e.updateEvent;
    e.updateEvent = function(f) {
      var p = e.getEvent(f);
      p && t(p) && !this._is_virtual_event(f) ? e.update_view() : c.call(this, f);
    };
  }();
  const s = e.date.date_to_str("%Y%m%dT%H%i%s");
  function _(u) {
    const c = u.getDay(), f = u.getDate();
    return { dayOfWeek: c, dayNumber: Math.ceil(f / 7) };
  }
  e.repeat_date = function(u, c, f, p, g, y, x) {
    if (!u.rrule)
      return;
    let b = x ? x[u.id] : n()[u.id];
    b || (b = {}), p = r(p || new Date(e._min_date.valueOf() - 1e3)), g = r(g || new Date(e._max_date.valueOf() - 1e3));
    const k = r(u.start_date);
    let w;
    w = Se(y ? `RRULE:${u.rrule};UNTIL=${s(u.end_date)};COUNT=${y}` : `RRULE:${u.rrule};UNTIL=${s(u.end_date)}`, { dtstart: k });
    const D = w.between(p, g, !0).map((N) => {
      const M = (T = N, new Date(T.getUTCFullYear(), T.getUTCMonth(), T.getUTCDate(), T.getUTCHours(), T.getUTCMinutes(), T.getUTCSeconds()));
      var T;
      return M.setHours(u.start_date.getHours()), M.setMinutes(u.start_date.getMinutes()), M.setSeconds(u.start_date.getSeconds()), M;
    });
    let E = 0;
    const S = u.duration;
    for (let N = 0; N < D.length && !(y && E >= y); N++) {
      const M = D[N];
      let T = b[M.valueOf()];
      if (T) {
        if (T.deleted)
          continue;
        E++, c.push(T);
      } else {
        const A = e._copy_event(u);
        if (A.text = u.text, A.start_date = M, A.id = u.id + "#" + Math.ceil(M.valueOf()), A.end_date = new Date(M.valueOf() + 1e3 * S), A.end_date = e._fix_daylight_saving_date(A.start_date, A.end_date, u, M, A.end_date), A._timed = e.isOneDayEvent(A), !A._timed && !e._table_view && !e.config.multi_day)
          continue;
        c.push(A), f || (e._events[A.id] = A, e._rec_temp.push(A)), E++;
      }
    }
    if (b && D.length == 0)
      for (let N in b) {
        let M = b[N];
        if (M) {
          if (M.deleted)
            continue;
          p && g && M.start_date < g && M.end_date > p && c.push(M);
        }
      }
  }, e._fix_daylight_saving_date = function(u, c, f, p, g) {
    var y = u.getTimezoneOffset() - c.getTimezoneOffset();
    return y ? y > 0 ? new Date(p.valueOf() + 1e3 * f.duration - 60 * y * 1e3) : new Date(c.valueOf() - 60 * y * 1e3) : new Date(g.valueOf());
  }, e.getRecDates = function(u, c) {
    var f = typeof u == "object" ? u : e.getEvent(u), p = [];
    if (c = c || 100, !t(f))
      return [{ start_date: f.start_date, end_date: f.end_date }];
    if (f.deleted)
      return [];
    e.repeat_date(f, p, !0, f.start_date, f.end_date, c);
    for (var g = [], y = 0; y < p.length; y++)
      p[y].deleted || g.push({ start_date: p[y].start_date, end_date: p[y].end_date });
    return g;
  }, e.getEvents = function(u, c) {
    var f = [];
    const p = n();
    for (var g in this._events) {
      var y = this._events[g];
      if (!y.recurring_event_id)
        if (u && c && y.start_date < c && y.end_date > u)
          if (t(y)) {
            var x = [];
            this.repeat_date(y, x, !0, u, c, void 0, p), x.forEach(function(b) {
              b.start_date < c && b.end_date > u && f.push(b);
            });
          } else
            this._is_virtual_event(y.id) || f.push(y);
        else
          u || c || this._is_virtual_event(y.id) || f.push(y);
    }
    return f;
  }, e._copy_dummy = function(u) {
    var c = new Date(this.start_date), f = new Date(this.end_date);
    this.start_date = c, this.end_date = f, this.duration = this.rrule = null;
  }, e.config.include_end_by = !1, e.config.lightbox_recurring = "ask", e.config.recurring_workdays = [C.MO.weekday, C.TU.weekday, C.WE.weekday, C.TH.weekday, C.FR.weekday], e.config.repeat_date = "%m.%d.%Y", e.config.lightbox.sections = [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "recurring", type: "recurring", map_to: "rec_type" }, { name: "time", height: 72, type: "time", map_to: "auto" }], e.attachEvent("onClearAll", function() {
    e._rec_markers = {}, e._rec_markers_pull = {}, e._rec_temp = [];
  });
  const a = { 0: "SU", 1: "MO", 2: "TU", 3: "WE", 4: "TH", 5: "FR", 6: "SA" }, o = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 0 };
  function l(u) {
    switch (u) {
      case 1:
      case 31:
        return `${u}st`;
      case 2:
        return `${u}nd`;
      case 3:
        return `${u}rd`;
      default:
        return `${u}th`;
    }
  }
  e.templates.repeat_monthly_date = function(u, c) {
    return `Every ${l(u.getDate())}`;
  }, e.templates.repeat_monthly_weekday = function(u, c) {
    const f = _(u);
    return `Every ${l(f.dayNumber)} ${e.locale.date.day_full[f.dayOfWeek]}`;
  }, e.templates.repeat_yearly_month_date = function(u, c) {
    const f = u.getDate(), p = e.locale.date.month_full[u.getMonth()];
    return `Every ${l(f)} day of ${p}`;
  }, e.templates.repeat_yearly_month_weekday = function(u, c) {
    const f = _(u), p = e.locale.date.month_full[u.getMonth()];
    return `Every ${l(f.dayNumber)} ${e.locale.date.day_full[f.dayOfWeek]} of ${p}`;
  };
  const h = { MONTHLY: function(u) {
    return { rrule: { freq: C.MONTHLY, interval: 1, bymonthday: u.start.getDate() }, until: new Date(9999, 1, 1) };
  }, WEEKLY: function(u) {
    let c = u.start.getDay() - 1;
    return c == -1 && (c = 6), { rrule: { freq: C.WEEKLY, interval: 1, byweekday: [c] }, until: new Date(9999, 1, 1) };
  }, DAILY: function(u) {
    return { rrule: { freq: C.DAILY, interval: 1 }, until: new Date(9999, 1, 1) };
  }, YEARLY: function(u) {
    return { rrule: { freq: C.YEARLY, bymonth: u.start.getMonth() + 1, interval: 1, bymonthday: u.start.getDate() }, until: new Date(9999, 1, 1) };
  }, WORKDAYS: function(u) {
    return { rrule: { freq: C.WEEKLY, interval: 1, byweekday: e.config.recurring_workdays }, until: new Date(9999, 1, 1) };
  }, CUSTOM: function(u, c) {
    const f = {}, p = c.querySelector('[name="repeat_interval_unit"]').value, g = Math.max(1, c.querySelector('[name="repeat_interval_value"]').value), y = c.querySelector('[name="dhx_custom_month_option"]').value, x = c.querySelector('[name="dhx_custom_year_option"]').value;
    let b, k;
    switch (f.interval = g, p) {
      case "DAILY":
        f.freq = C.DAILY;
        break;
      case "WEEKLY":
        f.freq = C.WEEKLY, b = [], c.querySelectorAll('.dhx_form_repeat_custom_week [name="week_day"]').forEach((S) => {
          S.checked && b.push(S.value);
        }), f.byweekday = b.map((S) => {
          switch (S) {
            case "MO":
              return C.MO.weekday;
            case "TU":
              return C.TU.weekday;
            case "WE":
              return C.WE.weekday;
            case "TH":
              return C.TH.weekday;
            case "FR":
              return C.FR.weekday;
            case "SA":
              return C.SA.weekday;
            case "SU":
              return C.SU.weekday;
          }
        });
        break;
      case "MONTHLY":
        f.freq = C.MONTHLY, y === "month_date" ? f.bymonthday = u.start.getDate() : (k = u.start.getDay() - 1, k == -1 && (k = 6), f.byweekday = [k], f.bysetpos = _(u.start).dayNumber);
        break;
      case "YEARLY":
        f.freq = C.YEARLY, f.bymonth = u.start.getMonth() + 1, x == "month_date" ? f.bymonthday = u.start.getDate() : (k = u.start.getDay() - 1, k == -1 && (k = 6), f.byweekday = [k], f.bysetpos = _(u.start).dayNumber);
    }
    const w = e.date.str_to_date("%Y-%m-%d");
    let D = new Date(9999, 1, 1);
    const E = c.querySelector('[name="dhx_custom_repeat_ends"]');
    return E.value === "ON" ? D = w(c.querySelector('[name="dhx_form_repeat_ends_ondate"]').value) : E.value === "AFTER" && (f.count = Math.max(1, c.querySelector('[name="dhx_form_repeat_ends_after"]').value)), { rrule: f, until: D };
  }, NEVER: function() {
  } };
  function m(u, c, f) {
    (function(p, g) {
      p.querySelector("[name='repeat_interval_value']").value = (g ? g.interval : 1) || 1;
    })(u, c), function(p, g, y) {
      if (p.querySelector("[name='repeat_interval_value']").value = (g ? g.interval : 1) || 1, p.querySelectorAll(".dhx_form_repeat_custom_week input").forEach((x) => x.checked = !1), g && g.byweekday)
        g.byweekday.forEach((x) => {
          const b = o[x.weekday], k = a[b];
          p.querySelector(`.dhx_form_repeat_custom_week input[value="${k}"]`).checked = !0;
        });
      else {
        const x = a[y.start_date.getDay()];
        p.querySelector(`.dhx_form_repeat_custom_week input[value="${x}"]`).checked = !0;
      }
    }(u, c, f), function(p, g, y) {
      p.querySelector("[name='repeat_interval_value']").value = (g ? g.interval : 1) || 1;
      const x = p.querySelector('.dhx_form_repeat_custom_month [value="month_date"]'), b = p.querySelector('.dhx_form_repeat_custom_month [value="month_nth_weekday"]');
      x.innerText = e.templates.repeat_monthly_date(y.start_date, y), b.innerText = e.templates.repeat_monthly_weekday(y.start_date, y), g && (!g.bysetpos || g.byweekday && g.byweekday.length) ? p.querySelector('[name="dhx_custom_month_option"]').value = "month_nth_weekday" : p.querySelector('[name="dhx_custom_month_option"]').value = "month_date";
    }(u, c, f), function(p, g, y) {
      const x = p.querySelector('.dhx_form_repeat_custom_year [value="month_date"]'), b = p.querySelector('.dhx_form_repeat_custom_year [value="month_nth_weekday"]');
      x.innerText = e.templates.repeat_yearly_month_date(y.start_date, y), b.innerText = e.templates.repeat_yearly_month_weekday(y.start_date, y), g && (!g.bysetpos || g.byweekday && g.byweekday.length) ? p.querySelector('[name="dhx_custom_year_option"]').value = "month_nth_weekday" : p.querySelector('[name="dhx_custom_year_option"]').value = "month_date";
    }(u, c, f), function(p, g, y) {
      const x = p.querySelector('.dhx_form_repeat_ends_extra [name="dhx_form_repeat_ends_after"]'), b = p.querySelector('.dhx_form_repeat_ends_extra [name="dhx_form_repeat_ends_ondate"]'), k = p.querySelector("[name='dhx_custom_repeat_ends']");
      x.value = 1;
      let w = e.date.date_to_str("%Y-%m-%d");
      e.config.repeat_date_of_end || (e.config.repeat_date_of_end = w(e.date.add(e._currentDate(), 30, "day"))), b.value = e.config.repeat_date_of_end, g && g.count ? (k.value = "AFTER", x.value = g.count) : y._end_date && y._end_date.getFullYear() !== 9999 ? (k.value = "ON", b.value = w(y._end_date)) : k.value = "NEVER", k.dispatchEvent(new Event("change"));
    }(u, c, f);
  }
  function v(u) {
    for (let c = 0; c < e.config.lightbox.sections.length; c++) {
      let f = e.config.lightbox.sections[c];
      if (f.type === u)
        return e.formSection(f.name);
    }
    return null;
  }
  e.form_blocks.recurring = { render: function(u) {
    if (u.form) {
      let f = e.form_blocks.recurring, p = f._get_node(u.form), g = f._outer_html(p);
      return p.style.display = "none", g;
    }
    let c = e.locale.labels;
    return `<div class="dhx_form_rrule">
		<div class="dhx_form_repeat_pattern">
			<select>
				<option value="NEVER">${c.repeat_never}</option>
				<option value="DAILY">${c.repeat_daily}</option>
				<option value="WEEKLY">${c.repeat_weekly}</option>
				<option value="MONTHLY">${c.repeat_monthly}</option>
				<option value="YEARLY">${c.repeat_yearly}</option>
				<option value="WORKDAYS">${c.repeat_workdays}</option>
				<option value="CUSTOM">${c.repeat_custom}</option>
			</select>
		</div>
		<div class="dhx_form_repeat_custom dhx_hidden">
			<div class="dhx_form_repeat_custom_interval">
				<input name="repeat_interval_value" type="number" min="1">
				<select name="repeat_interval_unit">
					<option value="DAILY">${c.repeat_freq_day}</option>
					<option value="WEEKLY">${c.repeat_freq_week}</option>
					<option value="MONTHLY">${c.repeat_freq_month}</option>
					<option value="YEARLY">${c.repeat_freq_year}</option>
				</select>
			</div>

			<div class="dhx_form_repeat_custom_additional">
				<div class="dhx_form_repeat_custom_week dhx_hidden">
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="MO" />${c.day_for_recurring[1]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="TU" />${c.day_for_recurring[2]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="WE" />${c.day_for_recurring[3]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="TH" />${c.day_for_recurring[4]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="FR" />${c.day_for_recurring[5]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="SA" />${c.day_for_recurring[6]}</label>
					<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="SU" />${c.day_for_recurring[0]}</label>
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
				<div>${c.repeat_ends}</div>
				<div class="dhx_form_repeat_ends_options">
					<select name="dhx_custom_repeat_ends">
						<option value="NEVER">${c.repeat_never}</option>
						<option value="AFTER">${c.repeat_radio_end2}</option>
						<option value="ON">${c.repeat_on_date}</option>
					</select>
					<div class="dhx_form_repeat_ends_extra">
						<div class="dhx_form_repeat_ends_after dhx_hidden">
							<label><input type="number" min="1" name="dhx_form_repeat_ends_after">${c.repeat_text_occurences_count}</label>
						</div>
						<div class="dhx_form_repeat_ends_on dhx_hidden">
							<input type="date" name="dhx_form_repeat_ends_ondate">
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>`;
  }, _init_set_value: function(u, c, f) {
    function p(y) {
      y.classList.add("dhx_hidden");
    }
    function g(y) {
      y.classList.remove("dhx_hidden");
    }
    e.form_blocks.recurring._ds = { start: f.start_date, end: f.end_date }, u.querySelector(".dhx_form_repeat_pattern select").addEventListener("change", function() {
      (function(y) {
        const x = u.querySelector(".dhx_form_repeat_custom");
        y === "CUSTOM" ? g(x) : p(x);
      })(this.value);
    }), u.querySelector(".dhx_form_repeat_custom_interval [name='repeat_interval_unit']").addEventListener("change", function() {
      (function(y) {
        const x = { weekly: u.querySelector(".dhx_form_repeat_custom_week"), monthly: u.querySelector(".dhx_form_repeat_custom_month"), yearly: u.querySelector(".dhx_form_repeat_custom_year") };
        switch (y) {
          case "DAILY":
            p(x.weekly), p(x.monthly), p(x.yearly);
            break;
          case "WEEKLY":
            g(x.weekly), p(x.monthly), p(x.yearly);
            break;
          case "MONTHLY":
            p(x.weekly), g(x.monthly), p(x.yearly);
            break;
          case "YEARLY":
            p(x.weekly), p(x.monthly), g(x.yearly);
        }
      })(this.value);
    }), u.querySelector(".dhx_form_repeat_ends [name='dhx_custom_repeat_ends']").addEventListener("change", function() {
      (function(y) {
        const x = { after: u.querySelector(".dhx_form_repeat_ends_extra .dhx_form_repeat_ends_after"), on: u.querySelector(".dhx_form_repeat_ends_extra .dhx_form_repeat_ends_on") };
        switch (y) {
          case "NEVER":
            p(x.after), p(x.on);
            break;
          case "AFTER":
            g(x.after), p(x.on);
            break;
          case "ON":
            p(x.after), g(x.on);
        }
      })(this.value);
    }), e._lightbox._rec_init_done = !0;
  }, button_click: function() {
  }, set_value: function(u, c, f) {
    let p = e.form_blocks.recurring;
    e._lightbox._rec_init_done || p._init_set_value(u, c, f), u.open = !f.rrule, u.blocked = this._is_modified_occurence(f);
    let g = p._ds;
    if (g.start = f.start_date, g.end = f._end_date, f.rrule) {
      const y = Se(f.rrule);
      m(u, y.origOptions, f);
      const x = function(b, k) {
        const w = b.options, D = w.until || k;
        return w.count || D && D.getFullYear() !== 9999 ? "CUSTOM" : w.freq !== C.DAILY || w.interval !== 1 || w.byweekday ? w.freq !== C.WEEKLY || w.interval !== 1 || w.byweekday ? w.freq !== C.MONTHLY || w.interval !== 1 || w.bysetpos ? w.freq !== C.YEARLY || w.interval !== 1 || w.bysetpos ? w.freq === C.DAILY && w.byweekday && w.byweekday.length === e.config.recurring_workdays.length && w.byweekday.includes(C.MO) && w.byweekday.includes(C.TU) && w.byweekday.includes(C.WE) && w.byweekday.includes(C.TH) && w.byweekday.includes(C.FR) ? "WORKDAYS" : "CUSTOM" : "YEARLY" : "MONTHLY" : "WEEKLY" : "DAILY";
      }(y, f._end_date);
      if (u.querySelector(".dhx_form_repeat_pattern select").value = x, x === "CUSTOM") {
        let b;
        switch (y.origOptions.freq) {
          case C.DAILY:
            b = "DAILY";
            break;
          case C.WEEKLY:
            b = "WEEKLY";
            break;
          case C.MONTHLY:
            b = "MONTHLY";
            break;
          case C.YEARLY:
            b = "YEARLY";
        }
        b && (u.querySelector('[name="repeat_interval_unit"]').value = b, u.querySelector('[name="repeat_interval_unit"]').dispatchEvent(new Event("change")));
      }
    } else
      m(u, null, f), u.querySelector(".dhx_form_repeat_pattern select").value = "NEVER";
    u.querySelector(".dhx_form_repeat_pattern select").dispatchEvent(new Event("change"));
  }, get_value: function(u, c) {
    if (u.blocked || u.querySelector(".dhx_form_repeat_pattern select").value === "NEVER")
      c.rrule = c.rrule = "", c._end_date = c.end_date;
    else {
      let f = e.form_blocks.recurring._ds, p = {};
      (function() {
        let x = e.formSection("time");
        if (x || (x = v("time")), x || (x = v("calendar_time")), !x)
          throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", 'In the latter case, make sure the control is named "time":', "", "scheduler.config.lightbox.sections = [", '{name:"time", height:72, type:"YOU CONTROL", map_to:"auto" }];'].join(`
`));
        return x;
      })().getValue(p), f.start = p.start_date;
      const g = u.querySelector(".dhx_form_repeat_pattern select").value, y = h[g](f, u);
      c.rrule = new C(y.rrule).toString().replace("RRULE:", ""), f.end = y.until, c.duration = Math.floor((p.end_date - p.start_date) / 1e3), f._start ? (c.start_date = new Date(f.start), c._start_date = new Date(f.start), f._start = !1) : c._start_date = null, c._end_date = f.end;
    }
    return c.rrule;
  }, focus: function(u) {
  } };
}, recurring_legacy: function(e) {
  function i() {
    var n = e.formSection("recurring");
    if (n || (n = t("recurring")), !n)
      throw new Error(["Can't locate the Recurring form section.", "Make sure that you have the recurring control on the lightbox configuration https://docs.dhtmlx.com/scheduler/recurring_events.html#recurringlightbox ", 'and that the recurring control has name "recurring":', "", "scheduler.config.lightbox.sections = [", '	{name:"recurring", ... }', "];"].join(`
`));
    return n;
  }
  function t(n) {
    for (var s = 0; s < e.config.lightbox.sections.length; s++) {
      var _ = e.config.lightbox.sections[s];
      if (_.type === n)
        return e.formSection(_.name);
    }
    return null;
  }
  function r(n) {
    return new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), 0);
  }
  var d;
  e.config.occurrence_timestamp_in_utc = !1, e.config.recurring_workdays = [1, 2, 3, 4, 5], e.form_blocks.recurring = { _get_node: function(n) {
    if (typeof n == "string") {
      let s = e._lightbox.querySelector(`#${n}`);
      s || (s = document.getElementById(n)), n = s;
    }
    return n.style.display == "none" && (n.style.display = ""), n;
  }, _outer_html: function(n) {
    return n.outerHTML || (s = n, (a = document.createElement("div")).appendChild(s.cloneNode(!0)), _ = a.innerHTML, a = null, _);
    var s, _, a;
  }, render: function(n) {
    if (n.form) {
      var s = e.form_blocks.recurring, _ = s._get_node(n.form), a = s._outer_html(_);
      return _.style.display = "none", a;
    }
    var o = e.locale.labels;
    return '<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />' + o.repeat_radio_day + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>' + o.repeat_radio_week + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />' + o.repeat_radio_month + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />' + o.repeat_radio_year + '</label></div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>' + o.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />' + o.repeat_text_day_count + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>' + o.repeat_radio_day_type2 + '</label></div> </div> <div style="display:none;" id="dhx_repeat_week"><div><label>' + o.repeat_week + '<input class="dhx_repeat_text" type="text" name="week_count" value="1" /></label><span>' + o.repeat_text_week_count + '</span></div>  <table class="dhx_repeat_days"> <tr> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />' + o.day_for_recurring[1] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />' + o.day_for_recurring[4] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />' + o.day_for_recurring[2] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />' + o.day_for_recurring[5] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />' + o.day_for_recurring[3] + '</label></div> <div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />' + o.day_for_recurring[6] + '</label></div></td> <td><div><label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />' + o.day_for_recurring[0] + '</label></div> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>' + o.repeat_radio_month_type + '</label><label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />' + o.repeat_text_month_day + '</label><label><input class="dhx_repeat_text" type="text" name="month_count" value="1" />' + o.repeat_text_month_count + '</label></div> <div><label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>' + o.repeat_radio_month_start + '</label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><label><select name="month_day2">	<option value="1" selected >' + e.locale.date.day_full[1] + '<option value="2">' + e.locale.date.day_full[2] + '<option value="3">' + e.locale.date.day_full[3] + '<option value="4">' + e.locale.date.day_full[4] + '<option value="5">' + e.locale.date.day_full[5] + '<option value="6">' + e.locale.date.day_full[6] + '<option value="0">' + e.locale.date.day_full[0] + "</select>" + o.repeat_text_month_count2_before + '</label><label><input class="dhx_repeat_text" type="text" name="month_count2" value="1" />' + o.repeat_text_month_count2_after + '</label></div> </div> <div style="display:none;" id="dhx_repeat_year"> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>' + o.repeat_radio_day_type + '</label><label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />' + o.repeat_text_year_day + '</label><label><select name="year_month"><option value="0" selected >' + o.month_for_recurring[0] + '<option value="1">' + o.month_for_recurring[1] + '<option value="2">' + o.month_for_recurring[2] + '<option value="3">' + o.month_for_recurring[3] + '<option value="4">' + o.month_for_recurring[4] + '<option value="5">' + o.month_for_recurring[5] + '<option value="6">' + o.month_for_recurring[6] + '<option value="7">' + o.month_for_recurring[7] + '<option value="8">' + o.month_for_recurring[8] + '<option value="9">' + o.month_for_recurring[9] + '<option value="10">' + o.month_for_recurring[10] + '<option value="11">' + o.month_for_recurring[11] + "</select>" + o.select_year_month + '</label></div> <div><label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>' + o.repeat_year_label + '</label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >' + e.locale.date.day_full[1] + '<option value="2">' + e.locale.date.day_full[2] + '<option value="3">' + e.locale.date.day_full[3] + '<option value="4">' + e.locale.date.day_full[4] + '<option value="5">' + e.locale.date.day_full[5] + '<option value="6">' + e.locale.date.day_full[6] + '<option value="7">' + e.locale.date.day_full[0] + "</select>" + o.select_year_day2 + '<select name="year_month2"><option value="0" selected >' + o.month_for_recurring[0] + '<option value="1">' + o.month_for_recurring[1] + '<option value="2">' + o.month_for_recurring[2] + '<option value="3">' + o.month_for_recurring[3] + '<option value="4">' + o.month_for_recurring[4] + '<option value="5">' + o.month_for_recurring[5] + '<option value="6">' + o.month_for_recurring[6] + '<option value="7">' + o.month_for_recurring[7] + '<option value="8">' + o.month_for_recurring[8] + '<option value="9">' + o.month_for_recurring[9] + '<option value="10">' + o.month_for_recurring[10] + '<option value="11">' + o.month_for_recurring[11] + '</select></div> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <div><label><input class="dhx_repeat_radio" type="radio" name="end" checked/>' + o.repeat_radio_end + '</label></div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + o.repeat_radio_end2 + '</label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />' + o.repeat_text_occurences_count + '</div> <div><label><input class="dhx_repeat_radio" type="radio" name="end" />' + o.repeat_radio_end3 + '</label><input class="dhx_repeat_date" type="text" name="date_of_end" value="' + e.config.repeat_date_of_end + '" /></div> </div> </form> </div> </div>';
  }, _ds: {}, _get_form_node: function(n, s, _) {
    var a = n[s];
    if (!a)
      return null;
    if (a.nodeName)
      return a;
    if (a.length) {
      for (var o = 0; o < a.length; o++)
        if (a[o].value == _)
          return a[o];
    }
  }, _get_node_value: function(n, s, _) {
    var a = n[s];
    if (!a)
      return "";
    if (a.length) {
      if (_) {
        for (var o = [], l = 0; l < a.length; l++)
          a[l].checked && o.push(a[l].value);
        return o;
      }
      for (l = 0; l < a.length; l++)
        if (a[l].checked)
          return a[l].value;
    }
    return a.value ? _ ? [a.value] : a.value : void 0;
  }, _get_node_numeric_value: function(n, s) {
    return 1 * e.form_blocks.recurring._get_node_value(n, s) || 0;
  }, _set_node_value: function(n, s, _) {
    var a = n[s];
    if (a) {
      if (a.name == s)
        a.value = _;
      else if (a.length)
        for (var o = typeof _ == "object", l = 0; l < a.length; l++)
          (o || a[l].value == _) && (a[l].checked = o ? !!_[a[l].value] : !!_);
    }
  }, _init_set_value: function(n, s, _) {
    var a = e.form_blocks.recurring, o = a._get_node_value, l = a._set_node_value;
    e.form_blocks.recurring._ds = { start: _.start_date, end: _._end_date };
    var h = e.date.str_to_date(e.config.repeat_date, !1, !0), m = e.date.date_to_str(e.config.repeat_date), v = n.getElementsByTagName("FORM")[0], u = {};
    function c(D) {
      for (var E = 0; E < D.length; E++) {
        var S = D[E];
        if (S.name)
          if (u[S.name])
            if (u[S.name].nodeType) {
              var N = u[S.name];
              u[S.name] = [N, S];
            } else
              u[S.name].push(S);
          else
            u[S.name] = S;
      }
    }
    if (c(v.getElementsByTagName("INPUT")), c(v.getElementsByTagName("SELECT")), !e.config.repeat_date_of_end) {
      var f = e.date.date_to_str(e.config.repeat_date);
      e.config.repeat_date_of_end = f(e.date.add(e._currentDate(), 30, "day"));
    }
    l(u, "date_of_end", e.config.repeat_date_of_end);
    var p = function(D) {
      return e._lightbox.querySelector(`#${D}`) || { style: {} };
    };
    function g() {
      p("dhx_repeat_day").style.display = "none", p("dhx_repeat_week").style.display = "none", p("dhx_repeat_month").style.display = "none", p("dhx_repeat_year").style.display = "none", p("dhx_repeat_" + this.value).style.display = "", e.setLightboxSize();
    }
    function y(D, E) {
      var S = D.end;
      if (S.length)
        if (S[0].value && S[0].value != "on")
          for (var N = 0; N < S.length; N++)
            S[N].value == E && (S[N].checked = !0);
        else {
          var M = 0;
          switch (E) {
            case "no":
              M = 0;
              break;
            case "date_of_end":
              M = 2;
              break;
            default:
              M = 1;
          }
          S[M].checked = !0;
        }
      else
        S.value = E;
    }
    e.form_blocks.recurring._get_repeat_code = function(D) {
      var E = [o(u, "repeat")];
      for (x[E[0]](E, D); E.length < 5; )
        E.push("");
      var S = "", N = function(M) {
        var T = M.end;
        if (T.length) {
          for (var A = 0; A < T.length; A++)
            if (T[A].checked)
              return T[A].value && T[A].value != "on" ? T[A].value : A ? A == 2 ? "date_of_end" : "occurences_count" : "no";
        } else if (T.value)
          return T.value;
        return "no";
      }(u);
      return N == "no" ? (D.end = new Date(9999, 1, 1), S = "no") : N == "date_of_end" ? D.end = function(M) {
        var T = h(M);
        return e.config.include_end_by && (T = e.date.add(T, 1, "day")), T;
      }(o(u, "date_of_end")) : (e.transpose_type(E.join("_")), S = Math.max(1, o(u, "occurences_count")), D.end = e.date["add_" + E.join("_")](new Date(D.start), S + 0, { start_date: D.start }) || D.start), E.join("_") + "#" + S;
    };
    var x = { month: function(D, E) {
      var S = e.form_blocks.recurring._get_node_value, N = e.form_blocks.recurring._get_node_numeric_value;
      S(u, "month_type") == "d" ? (D.push(Math.max(1, N(u, "month_count"))), E.start.setDate(S(u, "month_day"))) : (D.push(Math.max(1, N(u, "month_count2"))), D.push(S(u, "month_day2")), D.push(Math.max(1, N(u, "month_week2"))), e.config.repeat_precise || E.start.setDate(1)), E._start = !0;
    }, week: function(D, E) {
      var S = e.form_blocks.recurring._get_node_value, N = e.form_blocks.recurring._get_node_numeric_value;
      D.push(Math.max(1, N(u, "week_count"))), D.push(""), D.push("");
      for (var M = [], T = S(u, "week_day", !0), A = E.start.getDay(), H = !1, $ = 0; $ < T.length; $++)
        M.push(T[$]), H = H || T[$] == A;
      M.length || (M.push(A), H = !0), M.sort(), e.config.repeat_precise ? H || (e.transpose_day_week(E.start, M, 1, 7), E._start = !0) : (E.start = e.date.week_start(E.start), E._start = !0), D.push(M.join(","));
    }, day: function(D) {
      var E = e.form_blocks.recurring._get_node_value, S = e.form_blocks.recurring._get_node_numeric_value;
      E(u, "day_type") == "d" ? D.push(Math.max(1, S(u, "day_count"))) : (D.push("week"), D.push(1), D.push(""), D.push(""), D.push(e.config.recurring_workdays.join(",")), D.splice(0, 1));
    }, year: function(D, E) {
      var S = e.form_blocks.recurring._get_node_value;
      S(u, "year_type") == "d" ? (D.push("1"), E.start.setMonth(0), E.start.setDate(S(u, "year_day")), E.start.setMonth(S(u, "year_month"))) : (D.push("1"), D.push(S(u, "year_day2")), D.push(S(u, "year_week2")), E.start.setDate(1), E.start.setMonth(S(u, "year_month2"))), E._start = !0;
    } }, b = { week: function(D, E) {
      var S = e.form_blocks.recurring._set_node_value;
      S(u, "week_count", D[1]);
      for (var N = D[4].split(","), M = {}, T = 0; T < N.length; T++)
        M[N[T]] = !0;
      S(u, "week_day", M);
    }, month: function(D, E) {
      var S = e.form_blocks.recurring._set_node_value;
      D[2] === "" ? (S(u, "month_type", "d"), S(u, "month_count", D[1]), S(u, "month_day", E.start.getDate())) : (S(u, "month_type", "w"), S(u, "month_count2", D[1]), S(u, "month_week2", D[3]), S(u, "month_day2", D[2]));
    }, day: function(D, E) {
      var S = e.form_blocks.recurring._set_node_value;
      S(u, "day_type", "d"), S(u, "day_count", D[1]);
    }, year: function(D, E) {
      var S = e.form_blocks.recurring._set_node_value;
      D[2] === "" ? (S(u, "year_type", "d"), S(u, "year_day", E.start.getDate()), S(u, "year_month", E.start.getMonth())) : (S(u, "year_type", "w"), S(u, "year_week2", D[3]), S(u, "year_day2", D[2]), S(u, "year_month2", E.start.getMonth()));
    } };
    e.form_blocks.recurring._set_repeat_code = function(D, E) {
      var S = e.form_blocks.recurring._set_node_value, N = D.split("#");
      switch (D = N[0].split("_"), b[D[0]](D, E), N[1]) {
        case "no":
          y(u, "no");
          break;
        case "":
          y(u, "date_of_end");
          var M = E.end;
          e.config.include_end_by && (M = e.date.add(M, -1, "day")), S(u, "date_of_end", m(M));
          break;
        default:
          y(u, "occurences_count"), S(u, "occurences_count", N[1]);
      }
      S(u, "repeat", D[0]);
      var T = e.form_blocks.recurring._get_form_node(u, "repeat", D[0]);
      T.nodeName == "SELECT" ? (T.dispatchEvent(new Event("change")), T.dispatchEvent(new MouseEvent("click"))) : T.dispatchEvent(new MouseEvent("click"));
    };
    for (var k = 0; k < v.elements.length; k++) {
      var w = v.elements[k];
      w.name === "repeat" && (w.nodeName != "SELECT" || w.$_eventAttached ? w.$_eventAttached || (w.$_eventAttached = !0, w.addEventListener("click", g)) : (w.$_eventAttached = !0, w.addEventListener("change", g)));
    }
    e._lightbox._rec_init_done = !0;
  }, set_value: function(n, s, _) {
    var a = e.form_blocks.recurring;
    e._lightbox._rec_init_done || a._init_set_value(n, s, _), n.open = !_.rec_type, n.blocked = this._is_modified_occurence(_);
    var o = a._ds;
    o.start = _.start_date, o.end = _._end_date, a._toggle_block(), s && a._set_repeat_code(s, o);
  }, get_value: function(n, s) {
    if (n.open) {
      var _ = e.form_blocks.recurring._ds, a = {};
      (function() {
        var o = e.formSection("time");
        if (o || (o = t("time")), o || (o = t("calendar_time")), !o)
          throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", 'In the latter case, make sure the control is named "time":', "", "scheduler.config.lightbox.sections = [", '{name:"time", height:72, type:"YOU CONTROL", map_to:"auto" }];'].join(`
`));
        return o;
      })().getValue(a), _.start = a.start_date, s.rec_type = e.form_blocks.recurring._get_repeat_code(_), _._start ? (s.start_date = new Date(_.start), s._start_date = new Date(_.start), _._start = !1) : s._start_date = null, s._end_date = _.end, s.rec_pattern = s.rec_type.split("#")[0];
    } else
      s.rec_type = s.rec_pattern = "", s._end_date = s.end_date;
    return s.rec_type;
  }, _get_button: function() {
    return i().header.firstChild.firstChild;
  }, _get_form: function() {
    return i().node;
  }, open: function() {
    var n = e.form_blocks.recurring;
    n._get_form().open || n._toggle_block();
  }, close: function() {
    var n = e.form_blocks.recurring;
    n._get_form().open && n._toggle_block();
  }, _toggle_block: function() {
    var n = e.form_blocks.recurring, s = n._get_form(), _ = n._get_button();
    s.open || s.blocked ? (s.style.height = "0px", _ && (_.style.backgroundPosition = "-5px 20px", _.nextSibling.innerHTML = e.locale.labels.button_recurring)) : (s.style.height = "auto", _ && (_.style.backgroundPosition = "-5px 0px", _.nextSibling.innerHTML = e.locale.labels.button_recurring_open)), s.open = !s.open, e.setLightboxSize();
  }, focus: function(n) {
  }, button_click: function(n, s, _) {
    e.form_blocks.recurring._get_form().blocked || e.form_blocks.recurring._toggle_block();
  } }, e._rec_markers = {}, e._rec_markers_pull = {}, e._add_rec_marker = function(n, s) {
    n._pid_time = s, this._rec_markers[n.id] = n, this._rec_markers_pull[n.event_pid] || (this._rec_markers_pull[n.event_pid] = {}), this._rec_markers_pull[n.event_pid][s] = n;
  }, e._get_rec_marker = function(n, s) {
    var _ = this._rec_markers_pull[s];
    return _ ? _[n] : null;
  }, e._get_rec_markers = function(n) {
    return this._rec_markers_pull[n] || [];
  }, e._rec_temp = [], d = e.addEvent, e.addEvent = function(n, s, _, a, o) {
    var l = d.apply(this, arguments);
    if (l && e.getEvent(l)) {
      var h = e.getEvent(l);
      h.start_date && (h.start_date = r(h.start_date)), h.end_date && (h.end_date = r(h.end_date)), this._is_modified_occurence(h) && e._add_rec_marker(h, 1e3 * h.event_length), h.rec_type && (h.rec_pattern = h.rec_type.split("#")[0]);
    }
    return l;
  }, e.attachEvent("onEventIdChange", function(n, s) {
    if (!this._ignore_call) {
      this._ignore_call = !0, e._rec_markers[n] && (e._rec_markers[s] = e._rec_markers[n], delete e._rec_markers[n]), e._rec_markers_pull[n] && (e._rec_markers_pull[s] = e._rec_markers_pull[n], delete e._rec_markers_pull[n]);
      for (var _ = 0; _ < this._rec_temp.length; _++)
        (a = this._rec_temp[_]).event_pid == n && (a.event_pid = s, this.changeEventId(a.id, s + "#" + a.id.split("#")[1]));
      for (var _ in this._rec_markers) {
        var a;
        (a = this._rec_markers[_]).event_pid == n && (a.event_pid = s, a._pid_changed = !0);
      }
      var o = e._rec_markers[s];
      o && o._pid_changed && (delete o._pid_changed, setTimeout(function() {
        if (e.$destroyed)
          return !0;
        e.callEvent("onEventChanged", [s, e.getEvent(s)]);
      }, 1)), delete this._ignore_call;
    }
  }), e.attachEvent("onConfirmedBeforeEventDelete", function(n) {
    var s = this.getEvent(n);
    if (this._is_virtual_event(n) || this._is_modified_occurence(s) && s.rec_type && s.rec_type != "none") {
      n = n.split("#");
      var _ = this.uid(), a = n[1] ? n[1] : Math.round(s._pid_time / 1e3), o = this._copy_event(s);
      o.id = _, o.event_pid = s.event_pid || n[0];
      var l = a;
      o.event_length = l, o.rec_type = o.rec_pattern = "none", this.addEvent(o), this._add_rec_marker(o, 1e3 * l);
    } else {
      s.rec_type && this._lightbox_id && this._roll_back_dates(s);
      var h = this._get_rec_markers(n);
      for (var m in h)
        h.hasOwnProperty(m) && (n = h[m].id, this.getEvent(n) && this.deleteEvent(n, !0));
    }
    return !0;
  }), e.attachEvent("onEventDeleted", function(n, s) {
    !this._is_virtual_event(n) && this._is_modified_occurence(s) && (e._events[n] || (s.rec_type = s.rec_pattern = "none", this.setEvent(n, s)));
  }), e.attachEvent("onEventChanged", function(n, s) {
    if (this._loading)
      return !0;
    var _ = this.getEvent(n);
    if (this._is_virtual_event(n)) {
      n = n.split("#");
      var a = this.uid();
      this._not_render = !0;
      var o = this._copy_event(s);
      o.id = a, o.event_pid = n[0];
      var l = n[1];
      o.event_length = l, o.rec_type = o.rec_pattern = "", this._add_rec_marker(o, 1e3 * l), this.addEvent(o), this._not_render = !1;
    } else {
      _.start_date && (_.start_date = r(_.start_date)), _.end_date && (_.end_date = r(_.end_date)), _.rec_type && this._lightbox_id && this._roll_back_dates(_);
      var h = this._get_rec_markers(n);
      for (var m in h)
        h.hasOwnProperty(m) && (delete this._rec_markers[h[m].id], this.deleteEvent(h[m].id, !0));
      delete this._rec_markers_pull[n];
      for (var v = !1, u = 0; u < this._rendered.length; u++)
        this._rendered[u].getAttribute(this.config.event_attribute) == n && (v = !0);
      v || (this._select_id = null);
    }
    return !0;
  }), e.attachEvent("onEventAdded", function(n) {
    if (!this._loading) {
      var s = this.getEvent(n);
      s.rec_type && !s.event_length && this._roll_back_dates(s);
    }
    return !0;
  }), e.attachEvent("onEventSave", function(n, s, _) {
    return this.getEvent(n).rec_type || !s.rec_type || this._is_virtual_event(n) || (this._select_id = null), !0;
  }), e.attachEvent("onEventCreated", function(n) {
    var s = this.getEvent(n);
    return s.rec_type || (s.rec_type = s.rec_pattern = s.event_length = s.event_pid = ""), !0;
  }), e.attachEvent("onEventCancel", function(n) {
    var s = this.getEvent(n);
    s.rec_type && (this._roll_back_dates(s), this.render_view_data());
  }), e._roll_back_dates = function(n) {
    n.start_date && (n.start_date = r(n.start_date)), n.end_date && (n.end_date = r(n.end_date)), n.event_length = Math.round((n.end_date.valueOf() - n.start_date.valueOf()) / 1e3), n.end_date = n._end_date, n._start_date && (n.start_date.setMonth(0), n.start_date.setDate(n._start_date.getDate()), n.start_date.setMonth(n._start_date.getMonth()), n.start_date.setFullYear(n._start_date.getFullYear()));
  }, e._is_virtual_event = function(n) {
    return n.toString().indexOf("#") != -1;
  }, e._is_modified_occurence = function(n) {
    return n.event_pid && n.event_pid != "0";
  }, e.showLightbox_rec = e.showLightbox, e.showLightbox = function(n) {
    var s = this.locale, _ = e.config.lightbox_recurring, a = this.getEvent(n), o = a.event_pid, l = this._is_virtual_event(n);
    l && (o = n.split("#")[0]);
    var h = function(v) {
      var u = e.getEvent(v);
      return u._end_date = u.end_date, u.end_date = new Date(u.start_date.valueOf() + 1e3 * u.event_length), e.showLightbox_rec(v);
    };
    if ((o || 1 * o == 0) && a.rec_type)
      return h(n);
    if (!o || o === "0" || !s.labels.confirm_recurring || _ == "instance" || _ == "series" && !l)
      return this.showLightbox_rec(n);
    if (_ == "ask") {
      var m = this;
      e.modalbox({ text: s.labels.confirm_recurring, title: s.labels.title_confirm_recurring, width: "500px", position: "middle", buttons: [s.labels.button_edit_series, s.labels.button_edit_occurrence, s.labels.icon_cancel], callback: function(v) {
        switch (+v) {
          case 0:
            return h(o);
          case 1:
            return m.showLightbox_rec(n);
          case 2:
            return;
        }
      } });
    } else
      h(o);
  }, e.get_visible_events_rec = e.get_visible_events, e.get_visible_events = function(n) {
    for (var s = 0; s < this._rec_temp.length; s++)
      delete this._events[this._rec_temp[s].id];
    this._rec_temp = [];
    var _ = this.get_visible_events_rec(n), a = [];
    for (s = 0; s < _.length; s++)
      _[s].rec_type ? _[s].rec_pattern != "none" && this.repeat_date(_[s], a) : a.push(_[s]);
    return a;
  }, function() {
    var n = e.isOneDayEvent;
    e.isOneDayEvent = function(_) {
      return !!_.rec_type || n.call(this, _);
    };
    var s = e.updateEvent;
    e.updateEvent = function(_) {
      var a = e.getEvent(_);
      a && a.rec_type && (a.rec_pattern = (a.rec_type || "").split("#")[0]), a && a.rec_type && !this._is_virtual_event(_) ? e.update_view() : s.call(this, _);
    };
  }(), e.transponse_size = { day: 1, week: 7, month: 1, year: 12 }, e.date.day_week = function(n, s, _) {
    n.setDate(1);
    var a = e.date.month_start(new Date(n)), o = 1 * s + (_ = 7 * (_ - 1)) - n.getDay() + 1;
    n.setDate(o <= _ ? o + 7 : o);
    var l = e.date.month_start(new Date(n));
    return a.valueOf() === l.valueOf();
  }, e.transpose_day_week = function(n, s, _, a, o) {
    for (var l = (n.getDay() || (e.config.start_on_monday ? 7 : 0)) - _, h = 0; h < s.length; h++)
      if (s[h] > l)
        return n.setDate(n.getDate() + 1 * s[h] - l - (a ? _ : o));
    this.transpose_day_week(n, s, _ + a, null, _);
  }, e.transpose_type = function(n) {
    var s = "transpose_" + n;
    if (!this.date[s]) {
      var _ = n.split("_"), a = "add_" + n, o = this.transponse_size[_[0]] * _[1];
      if (_[0] == "day" || _[0] == "week") {
        var l = null;
        if (_[4] && (l = _[4].split(","), e.config.start_on_monday)) {
          for (var h = 0; h < l.length; h++)
            l[h] = 1 * l[h] || 7;
          l.sort();
        }
        this.date[s] = function(m, v) {
          var u = Math.floor((v.valueOf() - m.valueOf()) / (864e5 * o));
          return u > 0 && m.setDate(m.getDate() + u * o), l && e.transpose_day_week(m, l, 1, o), m;
        }, this.date[a] = function(m, v) {
          var u = new Date(m.valueOf());
          if (l)
            for (var c = 0; c < v; c++)
              e.transpose_day_week(u, l, 0, o);
          else
            u.setDate(u.getDate() + v * o);
          return u;
        };
      } else
        _[0] != "month" && _[0] != "year" || (this.date[s] = function(m, v, u) {
          var c = Math.ceil((12 * v.getFullYear() + 1 * v.getMonth() + 1 - (12 * m.getFullYear() + 1 * m.getMonth() + 1)) / o - 1);
          return c >= 0 && (m.setDate(1), m.setMonth(m.getMonth() + c * o)), e.date[a](m, 0, u);
        }, this.date[a] = function(m, v, u, c) {
          if (c ? c++ : c = 1, c > 12)
            return null;
          var f = new Date(m.valueOf());
          f.setDate(1), f.setMonth(f.getMonth() + v * o);
          var p = f.getMonth(), g = f.getFullYear();
          f.setDate(u.start_date.getDate()), _[3] && e.date.day_week(f, _[2], _[3]);
          var y = e.config.recurring_overflow_instances;
          return f.getMonth() != p && y != "none" && (f = y === "lastDay" ? new Date(g, p + 1, 0, f.getHours(), f.getMinutes(), f.getSeconds(), f.getMilliseconds()) : e.date[a](new Date(g, p + 1, 0), v || 1, u, c)), f;
        });
    }
  }, e.repeat_date = function(n, s, _, a, o, l) {
    a = a || this._min_date, o = o || this._max_date;
    var h = l || -1, m = new Date(n.start_date.valueOf()), v = m.getHours(), u = 0;
    for (!n.rec_pattern && n.rec_type && (n.rec_pattern = n.rec_type.split("#")[0]), this.transpose_type(n.rec_pattern), m = e.date["transpose_" + n.rec_pattern](m, a, n); m && (m < n.start_date || e._fix_daylight_saving_date(m, a, n, m, new Date(m.valueOf() + 1e3 * n.event_length)).valueOf() <= a.valueOf() || m.valueOf() + 1e3 * n.event_length <= a.valueOf()); )
      m = this.date["add_" + n.rec_pattern](m, 1, n);
    for (; m && m < o && m < n.end_date && (h < 0 || u < h); ) {
      m.setHours(v);
      var c = e.config.occurrence_timestamp_in_utc ? Date.UTC(m.getFullYear(), m.getMonth(), m.getDate(), m.getHours(), m.getMinutes(), m.getSeconds()) : m.valueOf(), f = this._get_rec_marker(c, n.id);
      if (f)
        _ && (f.rec_type != "none" && u++, s.push(f));
      else {
        var p = new Date(m.valueOf() + 1e3 * n.event_length), g = this._copy_event(n);
        if (g.text = n.text, g.start_date = m, g.event_pid = n.id, g.id = n.id + "#" + Math.round(c / 1e3), g.end_date = p, g.end_date = e._fix_daylight_saving_date(g.start_date, g.end_date, n, m, g.end_date), g._timed = this.isOneDayEvent(g), !g._timed && !this._table_view && !this.config.multi_day)
          return;
        s.push(g), _ || (this._events[g.id] = g, this._rec_temp.push(g)), u++;
      }
      m = this.date["add_" + n.rec_pattern](m, 1, n);
    }
  }, e._fix_daylight_saving_date = function(n, s, _, a, o) {
    var l = n.getTimezoneOffset() - s.getTimezoneOffset();
    return l ? l > 0 ? new Date(a.valueOf() + 1e3 * _.event_length - 60 * l * 1e3) : new Date(s.valueOf() - 60 * l * 1e3) : new Date(o.valueOf());
  }, e.getRecDates = function(n, s) {
    var _ = typeof n == "object" ? n : e.getEvent(n), a = [];
    if (s = s || 100, !_.rec_type)
      return [{ start_date: _.start_date, end_date: _.end_date }];
    if (_.rec_type == "none")
      return [];
    e.repeat_date(_, a, !0, _.start_date, _.end_date, s);
    for (var o = [], l = 0; l < a.length; l++)
      a[l].rec_type != "none" && o.push({ start_date: a[l].start_date, end_date: a[l].end_date });
    return o;
  }, e.getEvents = function(n, s) {
    var _ = [];
    for (var a in this._events) {
      var o = this._events[a];
      if (o && o.start_date < s && o.end_date > n)
        if (o.rec_pattern) {
          if (o.rec_pattern == "none")
            continue;
          var l = [];
          this.repeat_date(o, l, !0, n, s);
          for (var h = 0; h < l.length; h++)
            !l[h].rec_pattern && l[h].start_date < s && l[h].end_date > n && !this._rec_markers[l[h].id] && _.push(l[h]);
        } else
          this._is_virtual_event(o.id) || _.push(o);
    }
    return _;
  }, e.config.repeat_date = "%m.%d.%Y", e.config.lightbox.sections = [{ name: "description", map_to: "text", type: "textarea", focus: !0 }, { name: "recurring", type: "recurring", map_to: "rec_type", button: "recurring" }, { name: "time", height: 72, type: "time", map_to: "auto" }], e._copy_dummy = function(n) {
    var s = new Date(this.start_date), _ = new Date(this.end_date);
    this.start_date = s, this.end_date = _, this.event_length = this.event_pid = this.rec_pattern = this.rec_type = null;
  }, e.config.include_end_by = !1, e.config.lightbox_recurring = "ask", e.attachEvent("onClearAll", function() {
    e._rec_markers = {}, e._rec_markers_pull = {}, e._rec_temp = [];
  });
}, serialize: function(e) {
  const i = mt(e);
  e.data_attributes = function() {
    var t = [], r = e._helpers.formatDate, d = i();
    for (var n in d) {
      var s = d[n];
      for (var _ in s)
        _.substr(0, 1) != "_" && t.push([_, _ == "start_date" || _ == "end_date" ? r : null]);
      break;
    }
    return t;
  }, e.toXML = function(t) {
    var r = [], d = this.data_attributes(), n = i();
    for (var s in n) {
      var _ = n[s];
      r.push("<event>");
      for (var a = 0; a < d.length; a++)
        r.push("<" + d[a][0] + "><![CDATA[" + (d[a][1] ? d[a][1](_[d[a][0]]) : _[d[a][0]]) + "]]></" + d[a][0] + ">");
      r.push("</event>");
    }
    return (t || "") + "<data>" + r.join(`
`) + "</data>";
  }, e._serialize_json_value = function(t) {
    return t === null || typeof t == "boolean" ? t = "" + t : (t || t === 0 || (t = ""), t = '"' + t.toString().replace(/\n/g, "").replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'), t;
  }, e.toJSON = function() {
    return JSON.stringify(this.serialize());
  }, e.toICal = function(t) {
    var r = e.date.date_to_str("%Y%m%dT%H%i%s"), d = e.date.date_to_str("%Y%m%d"), n = [], s = i();
    for (var _ in s) {
      var a = s[_];
      n.push("BEGIN:VEVENT"), a._timed && (a.start_date.getHours() || a.start_date.getMinutes()) ? n.push("DTSTART:" + r(a.start_date)) : n.push("DTSTART:" + d(a.start_date)), a._timed && (a.end_date.getHours() || a.end_date.getMinutes()) ? n.push("DTEND:" + r(a.end_date)) : n.push("DTEND:" + d(a.end_date)), n.push("SUMMARY:" + a.text), n.push("END:VEVENT");
    }
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//dhtmlXScheduler//NONSGML v2.2//EN
DESCRIPTION:` + (t || "") + `
` + n.join(`
`) + `
END:VCALENDAR`;
  };
}, timeline: function(e) {
  de("Timeline", e.assert);
}, tooltip: function(e) {
  e.config.tooltip_timeout = 30, e.config.tooltip_offset_y = 20, e.config.tooltip_offset_x = 10, e.config.tooltip_hide_timeout = 30;
  const i = new vn(e);
  e.ext.tooltips = i, e.attachEvent("onSchedulerReady", function() {
    i.tooltipFor({ selector: "[" + e.config.event_attribute + "]", html: (t) => {
      if (e._mobile && !e.config.touch_tooltip)
        return;
      const r = e._locate_event(t.target);
      if (e.getEvent(r)) {
        const d = e.getEvent(r);
        return e.templates.tooltip_text(d.start_date, d.end_date, d);
      }
      return null;
    }, global: !1 });
  }), e.attachEvent("onDestroy", function() {
    i.destructor();
  }), e.attachEvent("onLightbox", function() {
    i.hideTooltip();
  }), e.attachEvent("onBeforeDrag", function() {
    return e._mobile && e.config.touch_tooltip || i.hideTooltip(), !0;
  }), e.attachEvent("onEventDeleted", function() {
    return i.hideTooltip(), !0;
  });
}, treetimeline: function(e) {
  de("Tree Timeline", e.assert);
}, units: function(e) {
  de("Units", e.assert);
}, url: function(e) {
  e._get_url_nav = function() {
    for (var i = {}, t = (document.location.hash || "").replace("#", "").split(","), r = 0; r < t.length; r++) {
      var d = t[r].split("=");
      d.length == 2 && (i[d[0]] = d[1]);
    }
    return i;
  }, e.attachEvent("onTemplatesReady", function() {
    var i = !0, t = e.date.str_to_date("%Y-%m-%d"), r = e.date.date_to_str("%Y-%m-%d"), d = e._get_url_nav().event || null;
    function n(s) {
      if (e.$destroyed)
        return !0;
      d = s, e.getEvent(s) && e.showEvent(s);
    }
    e.attachEvent("onAfterEventDisplay", function(s) {
      return d = null, !0;
    }), e.attachEvent("onBeforeViewChange", function(s, _, a, o) {
      if (i) {
        i = !1;
        var l = e._get_url_nav();
        if (l.event)
          try {
            if (e.getEvent(l.event))
              return setTimeout(function() {
                n(l.event);
              }), !1;
            var h = e.attachEvent("onXLE", function() {
              setTimeout(function() {
                n(l.event);
              }), e.detachEvent(h);
            });
          } catch {
          }
        if (l.date || l.mode) {
          try {
            this.setCurrentView(l.date ? t(l.date) : null, l.mode || null);
          } catch {
            this.setCurrentView(l.date ? t(l.date) : null, a);
          }
          return !1;
        }
      }
      var m = ["date=" + r(o || _), "mode=" + (a || s)];
      d && m.push("event=" + d);
      var v = "#" + m.join(",");
      return document.location.hash = v, !0;
    });
  });
}, week_agenda: function(e) {
  de("Week Agenda", e.assert);
}, wp: function(e) {
  e.attachEvent("onLightBox", function() {
    if (this._cover)
      try {
        this._cover.style.height = this.expanded ? "100%" : (document.body.parentNode || document.body).scrollHeight + "px";
      } catch {
      }
  }), e.form_blocks.select.set_value = function(i, t, r) {
    t !== void 0 && t !== "" || (t = (i.firstChild.options[0] || {}).value), i.firstChild.value = t || "";
  };
}, year_view: function(e) {
  e.templates.year_date = function(_) {
    return e.date.date_to_str(e.locale.labels.year_tab + " %Y")(_);
  }, e.templates.year_month = e.date.date_to_str("%F"), e.templates.year_scale_date = e.date.date_to_str("%D"), e.templates.year_tooltip = function(_, a, o) {
    return o.text;
  };
  const i = function() {
    return e._mode == "year";
  }, t = function(_) {
    var a = e.$domHelpers.closest(_, "[data-cell-date]");
    return a && a.hasAttribute("data-cell-date") ? e.templates.parse_date(a.getAttribute("data-cell-date")) : null;
  };
  e.dblclick_dhx_year_grid = function(_) {
    if (i()) {
      const a = _.target;
      if (e.$domHelpers.closest(a, ".dhx_before") || e.$domHelpers.closest(a, ".dhx_after"))
        return !1;
      const o = t(a);
      if (o) {
        const l = o, h = this.date.add(l, 1, "day");
        !this.config.readonly && this.config.dblclick_create && this.addEventNow(l.valueOf(), h.valueOf(), _);
      }
    }
  }, e.attachEvent("onEventIdChange", function() {
    i() && this.year_view(!0);
  });
  var r = e.render_data;
  e.render_data = function(_) {
    if (!i())
      return r.apply(this, arguments);
    for (var a = 0; a < _.length; a++)
      this._year_render_event(_[a]);
  };
  var d = e.clear_view;
  e.clear_view = function() {
    if (!i())
      return d.apply(this, arguments);
    var _ = e._year_marked_cells;
    for (var a in _)
      _.hasOwnProperty(a) && _[a].classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
    e._year_marked_cells = {};
  }, e._hideToolTip = function() {
    this._tooltip && (this._tooltip.style.display = "none", this._tooltip.date = new Date(9999, 1, 1));
  }, e._showToolTip = function(_, a, o, l) {
    if (this._tooltip) {
      if (this._tooltip.date.valueOf() == _.valueOf())
        return;
      this._tooltip.innerHTML = "";
    } else {
      var h = this._tooltip = document.createElement("div");
      h.className = "dhx_year_tooltip", this.config.rtl && (h.className += " dhx_tooltip_rtl"), document.body.appendChild(h), h.addEventListener("click", e._click.dhx_cal_data), h.addEventListener("click", function(g) {
        if (g.target.closest(`[${e.config.event_attribute}]`)) {
          const y = g.target.closest(`[${e.config.event_attribute}]`).getAttribute(e.config.event_attribute);
          e.showLightbox(y);
        }
      });
    }
    for (var m = this.getEvents(_, this.date.add(_, 1, "day")), v = "", u = 0; u < m.length; u++) {
      var c = m[u];
      if (this.filter_event(c.id, c)) {
        var f = c.color ? "--dhx-scheduler-event-background:" + c.color + ";" : "", p = c.textColor ? "--dhx-scheduler-event-color:" + c.textColor + ";" : "";
        v += "<div class='dhx_tooltip_line' style='" + f + p + "' event_id='" + m[u].id + "' " + this.config.event_attribute + "='" + m[u].id + "'>", v += "<div class='dhx_tooltip_date' style='" + f + p + "'>" + (m[u]._timed ? this.templates.event_date(m[u].start_date) : "") + "</div>", v += "<div class='dhx_event_icon icon_details'>&nbsp;</div>", v += this.templates.year_tooltip(m[u].start_date, m[u].end_date, m[u]) + "</div>";
      }
    }
    this._tooltip.style.display = "", this._tooltip.style.top = "0px", document.body.offsetWidth - a.left - this._tooltip.offsetWidth < 0 ? this._tooltip.style.left = a.left - this._tooltip.offsetWidth + "px" : this._tooltip.style.left = a.left + l.offsetWidth + "px", this._tooltip.date = _, this._tooltip.innerHTML = v, document.body.offsetHeight - a.top - this._tooltip.offsetHeight < 0 ? this._tooltip.style.top = a.top - this._tooltip.offsetHeight + l.offsetHeight + "px" : this._tooltip.style.top = a.top + "px";
  }, e._year_view_tooltip_handler = function(_) {
    if (i()) {
      var a = _.target || _.srcElement;
      a.tagName.toLowerCase() == "a" && (a = a.parentNode), e._getClassName(a).indexOf("dhx_year_event") != -1 ? e._showToolTip(e.templates.parse_date(a.getAttribute("data-year-date")), e.$domHelpers.getOffset(a), _, a) : e._hideToolTip();
    }
  }, e._init_year_tooltip = function() {
    e._detachDomEvent(e._els.dhx_cal_data[0], "mouseover", e._year_view_tooltip_handler), e.event(e._els.dhx_cal_data[0], "mouseover", e._year_view_tooltip_handler);
  }, e._get_year_cell = function(_) {
    for (var a = e.templates.format_date(_), o = this.$root.querySelectorAll(`.dhx_cal_data .dhx_cal_datepicker_date[data-cell-date="${a}"]`), l = 0; l < o.length; l++)
      if (!e.$domHelpers.closest(o[l], ".dhx_after, .dhx_before"))
        return o[l];
    return null;
  }, e._year_marked_cells = {}, e._mark_year_date = function(_, a) {
    var o = e.templates.format_date(_), l = this._get_year_cell(_);
    if (l) {
      var h = this.templates.event_class(a.start_date, a.end_date, a);
      e._year_marked_cells[o] || (l.classList.add("dhx_year_event", "dhx_cal_datepicker_event"), l.setAttribute("data-year-date", o), l.setAttribute("date", o), e._year_marked_cells[o] = l), h && l.classList.add(h);
    }
  }, e._unmark_year_date = function(_) {
    var a = this._get_year_cell(_);
    a && a.classList.remove("dhx_year_event", "dhx_cal_datepicker_event");
  }, e._year_render_event = function(_) {
    var a = _.start_date;
    for (a = a.valueOf() < this._min_date.valueOf() ? this._min_date : this.date.date_part(new Date(a)); a < _.end_date; )
      if (this._mark_year_date(a, _), (a = this.date.add(a, 1, "day")).valueOf() >= this._max_date.valueOf())
        return;
  }, e.year_view = function(_) {
    if (e.set_sizes(), e._table_view = _, !this._load_mode || !this._load())
      if (_) {
        if (e._init_year_tooltip(), e._reset_year_scale(), e._load_mode && e._load())
          return void (e._render_wait = !0);
        e.render_view_data();
      } else
        e._hideToolTip();
  }, e._reset_year_scale = function() {
    this._cols = [], this._colsS = {};
    var _ = [], a = this._els.dhx_cal_data[0], o = this.config;
    a.scrollTop = 0, a.innerHTML = "", Math.floor((parseInt(a.style.height) - e.xy.year_top) / o.year_y);
    var l = document.createElement("div"), h = this.date.week_start(e._currentDate());
    this._process_ignores(h, 7, "day", 1);
    for (var m = 0; m < 7; m++)
      this._ignores && this._ignores[m] || (this._cols[m] = "var(--dhx-scheduler-datepicker-cell-size)", this._render_x_header(m, 0, h, l)), h = this.date.add(h, 1, "day");
    for (l.lastChild.className += " dhx_scale_bar_last", m = 0; m < l.childNodes.length; m++)
      this._waiAria.yearHeadCell(l.childNodes[m]);
    var v = this.date[this._mode + "_start"](this.date.copy(this._date)), u = v, c = null;
    const f = document.createElement("div");
    for (f.classList.add("dhx_year_wrapper"), m = 0; m < o.year_y; m++)
      for (var p = 0; p < o.year_x; p++) {
        (c = document.createElement("div")).className = "dhx_year_box", c.setAttribute("date", this._helpers.formatDate(v)), c.setAttribute("data-month-date", this._helpers.formatDate(v)), c.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid'><div class='dhx_year_week'>" + l.innerHTML + "</div><div class='dhx_year_body'></div></div>";
        var g = c.querySelector(".dhx_year_month"), y = c.querySelector(".dhx_year_grid"), x = c.querySelector(".dhx_year_body"), b = e.uid();
        this._waiAria.yearHeader(g, b), this._waiAria.yearGrid(y, b), g.innerHTML = this.templates.year_month(v);
        var k = this.date.week_start(v);
        this._reset_month_scale(x, v, k, 6);
        for (var w = x.querySelectorAll("td"), D = 0; D < w.length; D++)
          this._waiAria.yearDayCell(w[D]);
        f.appendChild(c), _[m * o.year_x + p] = (v.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7, v = this.date.add(v, 1, "month");
      }
    a.appendChild(f);
    var E = this._getNavDateElement();
    E && (E.innerHTML = this.templates[this._mode + "_date"](u, v, this._mode)), this.week_starts = _, _._month = u.getMonth(), this._min_date = u, this._max_date = v;
  }, e._reset_year_scale = function() {
    var _ = this._els.dhx_cal_data[0];
    _.scrollTop = 0, _.innerHTML = "";
    let a = this.date.year_start(new Date(this._date));
    this._min_date = this.date.week_start(new Date(a));
    const o = document.createElement("div");
    o.classList.add("dhx_year_wrapper");
    let l = a;
    for (let v = 0; v < 12; v++) {
      let u = document.createElement("div");
      u.className = "dhx_year_box", u.setAttribute("date", this._helpers.formatDate(l)), u.setAttribute("data-month-date", this._helpers.formatDate(l)), u.innerHTML = `<div class='dhx_year_month'>${this.templates.year_month(l)}</div>
			<div class='dhx_year_grid'></div>`;
      const c = u.querySelector(".dhx_year_grid"), f = e._createDatePicker(null, { date: l, filterDays: e.ignore_year, minWeeks: 6 });
      f._renderDayGrid(c), f.destructor(), o.appendChild(u), l = this.date.add(l, 1, "month");
    }
    _.appendChild(o);
    let h = this.date.add(a, 1, "year");
    h.valueOf() != this.date.week_start(new Date(h)).valueOf() && (h = this.date.week_start(new Date(h)), h = this.date.add(h, 1, "week")), this._max_date = h;
    var m = this._getNavDateElement();
    m && (m.innerHTML = this.templates[this._mode + "_date"](a, h, this._mode));
  };
  var n = e.getActionData;
  e.getActionData = function(_) {
    return i() ? { date: t(_.target), section: null } : n.apply(e, arguments);
  };
  var s = e._locate_event;
  e._locate_event = function(_) {
    var a = s.apply(e, arguments);
    if (!a) {
      var o = t(_);
      if (!o)
        return null;
      var l = e.getEvents(o, e.date.add(o, 1, "day"));
      if (!l.length)
        return null;
      a = l[0].id;
    }
    return a;
  }, e.attachEvent("onDestroy", function() {
    e._hideToolTip();
  });
} }, Re = new class {
  constructor(e) {
    this._seed = 0, this._schedulerPlugins = [], this._bundledExtensions = e, this._extensionsManager = new Na(e);
  }
  plugin(e) {
    this._schedulerPlugins.push(e), oe.scheduler && e(oe.scheduler);
  }
  getSchedulerInstance(e) {
    for (var i = Sa(this._extensionsManager), t = 0; t < this._schedulerPlugins.length; t++)
      this._schedulerPlugins[t](i);
    return i._internal_id = this._seed++, this.$syncFactory && this.$syncFactory(i), e && this._initFromConfig(i, e), i;
  }
  _initFromConfig(e, i) {
    if (i.plugins && e.plugins(i.plugins), i.config && e.mixin(e.config, i.config, !0), i.templates && e.attachEvent("onTemplatesReady", function() {
      e.mixin(e.templates, i.templates, !0);
    }, { once: !0 }), i.events)
      for (const t in i.events)
        e.attachEvent(t, i.events[t]);
    i.locale && e.i18n.setLocale(i.locale), Array.isArray(i.calendars) && i.calendars.forEach(function(t) {
      e.addCalendar(t);
    }), i.container ? e.init(i.container) : e.init(), i.data && (typeof i.data == "string" ? e.load(i.data) : e.parse(i.data));
  }
}(gn), Ye = Re.getSchedulerInstance(), ht = { plugin: Ye.bind(Re.plugin, Re) };
window.scheduler = Ye, window.Scheduler = ht, window.$dhx || (window.$dhx = {}), window.$dhx.scheduler = Ye, window.$dhx.Scheduler = ht;
export {
  ht as Scheduler,
  Ye as default,
  Ye as scheduler
};
//# sourceMappingURL=dhtmlxscheduler.es.js.map

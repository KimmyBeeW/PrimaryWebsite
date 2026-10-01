// ============================================================
//  Cherry Hill 9th Ward Primary — shared site scripts
//  Loaded by every page (index.html = current year, 2027.html = next year, …).
//
//  Four features live here:
//    1) Weekly "Come, Follow Me" link  — auto-advances to the current week
//    2) Monthly "Fast-Sunday" link      — auto-advances to the current month
//    3) Past-event cleanup              — drops events at 2 AM the day after
//    4) Event legend click-to-filter    — filter the calendar by color
//
//  Each page tells the scripts which year it is simply by the links already on
//  the page (the #cfm-link / #fast-sun hrefs), so nothing year-specific lives in
//  the HTML. The ONLY thing you edit at a year change is WEEK_CONFIG below.
//  See YEARLY_UPDATE.md.
// ============================================================
(function () {
  "use strict";

  // ---- The one thing to update each January -------------------------------
  // Keyed by the year that appears in the Come, Follow Me link. For each year:
  //   anchorMonday = the Monday that starts WEEK 1 of that year's manual
  //   totalWeeks   = how many weekly lessons the manual has (usually 52)
  var WEEK_CONFIG = {
    "2026": { anchorMonday: "2025-12-29", totalWeeks: 52 },
    "2027": { anchorMonday: "2026-12-28", totalWeeks: 52 },
    "2028": { anchorMonday: "2027-12-27", totalWeeks: 52 }
  };

  // Fast-Sunday monthly lessons (manual Appendix B), January → December. These
  // topics likely repeat every year, BUT DOUBLE CHECK in 2028 since it's new;
  // only the manual's base URL should differ, and that's read from the button itself.
  var FAST_SUNDAY_MONTHS = [
    "001-plan-of-happiness",    // January
    "002-prayer",               // February
    "003-prophets-scriptures",  // March
    "004-commandments",         // April
    "005-baptism-confirmation", // May
    "006-church",               // June
    "007-family",               // July
    "008-invite",               // August
    "009-learn",                // September
    "010-serve",                // October
    "011-priesthood",           // November
    "012-temple"                // December
  ];

  // Everything up to and including the final "/" — drops the trailing week
  // number or lesson slug so we can rebuild the link with a new one.
  function baseFromHref(href) {
    return href.slice(0, href.lastIndexOf("/") + 1);
  }

  // Today at local midnight, so the time of day never affects the math.
  function todayLocal() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  // 1) Weekly "Come, Follow Me" link -----------------------------------------
  function updateWeekLink() {
    var link = document.getElementById("cfm-link");
    if (!link) return;
    var href = link.getAttribute("href");
    var yearMatch = href.match(/-(\d{4})\//); // e.g. "…-new-testament-2027/01"
    if (!yearMatch) return;
    var cfg = WEEK_CONFIG[yearMatch[1]];
    if (!cfg) return; // unknown year — leave the default link alone

    var anchor = new Date(cfg.anchorMonday + "T00:00:00"); // local midnight
    var msPerDay = 24 * 60 * 60 * 1000;
    var daysSince = Math.round((todayLocal() - anchor) / msPerDay);
    var week = 1 + Math.floor(daysSince / 7);

    if (week >= 1 && week <= cfg.totalWeeks) {
      link.href = baseFromHref(href) + week;
    } // Outside the manual's range → keep the default href.
  }

  // 2) Monthly "Fast-Sunday" link --------------------------------------------
  function updateFastSundayLink() {
    var link = document.getElementById("fast-sun");
    if (!link) return; // page has no Fast-Sunday button (e.g. in 2026 since the Fast-Sunday lessons hadn't started yet.)
    var slug = FAST_SUNDAY_MONTHS[new Date().getMonth()]; // 0 = Jan … 11 = Dec
    if (slug) link.href = baseFromHref(link.getAttribute("href")) + slug;
  }

  // 3) Past-event cleanup ----------------------------------------------------
  // Events disappear at 2 AM the morning after they finish, so the calendar
  // never leads with something that already happened. Nothing is deleted —
  // the <li> stays in the HTML until you prune it at the year change.

  var MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  // Which calendar year this page's events belong to. Normally read from the
  // Come, Follow Me link (every page has one); a `data-year` on <ul class="events">
  // overrides it if a page ever needs to say so explicitly.
  function pageYear() {
    var list = document.querySelector(".events");
    if (list && /^\d{4}$/.test(list.getAttribute("data-year") || "")) {
      return Number(list.getAttribute("data-year"));
    }
    var link = document.getElementById("cfm-link");
    var match = link && link.getAttribute("href").match(/-(\d{4})\//);
    return match ? Number(match[1]) : null; // no year found → expire nothing
  }

  // The moment a card should vanish, or null if we can't read a date off it.
  // "TBA"/"TBD" cards land in the null case on purpose: with no real date they
  // stay up until someone fills the date in or removes them by hand.
  function expiresAt(card, year) {
    var monthEl = card.querySelector(".event__month");
    var dayEl = card.querySelector(".event__day");
    if (!monthEl || !dayEl) return null;

    var month = MONTHS.indexOf(monthEl.textContent.trim().toUpperCase().slice(0, 3));
    if (month < 0) return null;

    // Last number wins, so a range ("3-4") expires the morning after day 4.
    var days = dayEl.textContent.match(/\d+/g);
    if (!days) return null;

    // Day + 1 at 2 AM. A day past the end of the month rolls forward on its
    // own — Dec 31 becomes Jan 1 of the next year, which is what we want.
    return new Date(year, month, Number(days[days.length - 1]) + 1, 2, 0, 0);
  }

  function hidePastEvents() {
    var list = document.querySelector(".events");
    var year = pageYear();
    if (!list || year === null) return;

    var now = new Date();
    var cards = Array.prototype.slice.call(list.querySelectorAll(".event"));
    var anyLeft = false;

    cards.forEach(function (card) {
      var expiry = expiresAt(card, year);
      if (expiry && now >= expiry) {
        card.classList.add("is-expired");
      } else {
        anyLeft = true;
      }
    });

    // Everything on the page is in the past: swap the whole calendar UI for a
    // single note, since there is nothing left to filter.
    if (!anyLeft) {
      var pastMsg = document.querySelector(".events-past");
      if (pastMsg) pastMsg.hidden = false;
      [".legend", ".legend__hint"].forEach(function (sel) {
        var el = document.querySelector(sel);
        if (el) el.hidden = true;
      });
    }
  }

  // 4) Event legend click-to-filter ------------------------------------------
  function initEventFilter() {
    var legend = document.querySelector(".legend");
    var eventsList = document.querySelector(".events");
    if (!legend || !eventsList) return;

    var buttons = Array.prototype.slice.call(legend.querySelectorAll(".legend__btn"));
    // Expired cards are out of the filter entirely, so filtering never brings
    // a past event back. hidePastEvents() must therefore run first.
    var cards = Array.prototype.slice.call(eventsList.querySelectorAll(".event:not(.is-expired)"));
    var emptyMsg = document.querySelector(".events-empty");
    var active = null; // the category currently filtered to, or null for "show all"

    function apply() {
      var anyVisible = false;
      cards.forEach(function (card) {
        var show = !active || card.classList.contains("event--" + active);
        card.classList.toggle("is-hidden", !show);
        if (show) anyVisible = true;
      });
      buttons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn.dataset.filter === active ? "true" : "false");
      });
      // Show the "no events" note only when a filter is active and nothing matches.
      if (emptyMsg) emptyMsg.hidden = !(active && !anyVisible);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        active = active === btn.dataset.filter ? null : btn.dataset.filter;
        apply();
      });
    });
  }

  function init() {
    updateWeekLink();
    updateFastSundayLink();
    hidePastEvents();
    initEventFilter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

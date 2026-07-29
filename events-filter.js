// Click a legend color to show only events of that type; click the same color
// again to show all events. The legend items are real <button>s, so keyboard
// and screen-reader support work automatically (aria-pressed tracks state).
(function () {
  function init() {
    var legend = document.querySelector(".legend");
    var eventsList = document.querySelector(".events");
    if (!legend || !eventsList) return;

    var buttons = Array.prototype.slice.call(legend.querySelectorAll(".legend__btn"));
    var cards = Array.prototype.slice.call(eventsList.querySelectorAll(".event"));
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
        // Clicking the already-active color clears the filter (shows all).
        active = active === btn.dataset.filter ? null : btn.dataset.filter;
        apply();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

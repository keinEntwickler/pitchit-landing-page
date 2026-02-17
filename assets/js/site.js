(function() {
  function setExpanded(toggle, isOpen) {
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  function closeAllDropdowns(dropdowns) {
    dropdowns.forEach(function(dropdown) {
      dropdown.classList.remove("open");
      setExpanded(dropdown.querySelector(".language-dropdown-toggle"), false);
    });
  }

  function initLanguageDropdowns() {
    var dropdowns = document.querySelectorAll(".language-dropdown");
    if (!dropdowns.length) return;

    dropdowns.forEach(function(dropdown) {
      var toggle = dropdown.querySelector(".language-dropdown-toggle");
      if (!toggle) return;

      toggle.addEventListener("click", function(event) {
        event.stopPropagation();
        var willOpen = !dropdown.classList.contains("open");
        closeAllDropdowns(dropdowns);
        if (willOpen) {
          dropdown.classList.add("open");
          setExpanded(toggle, true);
        }
      });
    });

    document.addEventListener("click", function() {
      closeAllDropdowns(dropdowns);
    });

    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        closeAllDropdowns(dropdowns);
      }
    });
  }

  function initScreenCarousel() {
    var track = document.querySelector(".sc-track");
    var carousel = document.querySelector(".screenCarousel");
    var dots = document.querySelectorAll(".sc-dot");
    if (!track || !carousel || !dots.length) return;

    var current = 0;

    function goTo(index) {
      if (index < 0 || index >= dots.length) return;
      current = index;
      track.classList.add("sc-track--manual");
      track.style.transform = index === 0 ? "translateX(0)" : "translateX(-50%)";
      dots.forEach(function(dot) { dot.classList.remove("sc-dot--active"); });
      dots[index].classList.add("sc-dot--active");
    }

    track.addEventListener("animationend", function() {
      goTo(1);
    });

    dots.forEach(function(dot) {
      dot.addEventListener("click", function() {
        goTo(parseInt(this.dataset.slide, 10));
      });
    });

    var startX = 0;
    var dragging = false;

    carousel.addEventListener("touchstart", function(event) {
      if (!event.touches || !event.touches.length) return;
      startX = event.touches[0].clientX;
      dragging = true;
    }, { passive: true });

    carousel.addEventListener("touchend", function(event) {
      if (!dragging || !event.changedTouches || !event.changedTouches.length) return;
      dragging = false;
      var dx = event.changedTouches[0].clientX - startX;
      if (dx < -30 && current === 0) goTo(1);
      if (dx > 30 && current === 1) goTo(0);
    });
  }

  function init() {
    initLanguageDropdowns();
    initScreenCarousel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

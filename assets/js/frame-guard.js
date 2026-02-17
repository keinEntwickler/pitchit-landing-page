(function() {
  if (window.top === window.self) return;

  try {
    window.top.location = window.self.location.href;
  } catch (error) {
    window.location.href = window.self.location.href;
  }
})();

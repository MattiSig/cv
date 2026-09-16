(function () {
  var root = document.documentElement;

  function paint() {
    var light = root.classList.contains('light');
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.textContent = light ? 'dark mode' : 'light mode';
      btn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    });
  }

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var light = root.classList.toggle('light');
      try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
      paint();
    });
  });
  paint();

  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () { window.print(); });
  });
})();

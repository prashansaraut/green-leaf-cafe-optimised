(function () {
  // Mobile menu: progressive enhancement. Without JS the links simply stay visible.
  var toggle = document.querySelector('.nav-toggle');
  var list = document.getElementById('nav-list');
  if (toggle && list) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      list.classList.toggle('open', open);
    };
    toggle.hidden = false;
    list.classList.add('collapsible');
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    list.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
  }

  // Booking form: confirm in a live region and move focus there so screen reader users hear it.
  var form = document.querySelector('form');
  var status = document.getElementById('status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = 'Thank you, ' + document.getElementById('name').value +
        '. We have received your request and will email you to confirm.';
      status.focus();
      form.reset();
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();

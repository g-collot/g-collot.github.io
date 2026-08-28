(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const useEl = toggleBtn.querySelector('use');

  const XLINK_NS = 'http://www.w3.org/1999/xlink';
  const ICON_DARK = 'res/svg/icons.svg#saturn-color';
  const ICON_LIGHT = 'res/svg/icons.svg#moon-color';

  function syncIcon() {
    const current = root.getAttribute('data-theme') || 'light';
    const nextIcon = current === 'dark' ? ICON_LIGHT : ICON_DARK;
    useEl.setAttributeNS(XLINK_NS, 'xlink:href', nextIcon);
  }

  syncIcon();

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncIcon();
  });
})();
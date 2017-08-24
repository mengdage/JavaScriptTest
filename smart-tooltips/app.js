function init() {
  const clockElem = document.querySelector('.clock');
  new HoverIntent({elem: clockElem})
}

document.addEventListener('DOMContentLoaded', init);

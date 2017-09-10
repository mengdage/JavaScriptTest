const clickBox = document.querySelector('.click-box');
const showPosDebounced = _.debounce(p, 1000);
function p(e) {
  console.log(e.clientX+', '+e.clientY);
  console.log('debounce');
}
clickBox.addEventListener('click', showPosDebounced);

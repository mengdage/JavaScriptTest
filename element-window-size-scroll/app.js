function init() {
  const output = document.getElementById('output');
const exp = document.getElementById('example');
const main = document.getElementsByClassName('main')[0];
  console.log('exp.style.width', exp.style.width);
  console.log('getComputedStyle(exp).width', getComputedStyle(exp).width);
  console.log('exp.offsetWidth', exp.offsetWidth);
}
window.onload = init;

// Your code
document.addEventListener('mousedown', draggableMouseDown);
function draggableMouseDown(e) {
  // detect if target is draggable
  let draggableElem = null;
  let shiftX, shiftY;
  let elemClientRect;
  let parentClientRect;
  if(!e.target.classList.contains('draggable')) {
    console.log('it is not draggable');
    return;
  }

  draggableElem = e.target;
  draggableElem.ondragstart = function() {
    return false;
  }

  elemClientRect = draggableElem.getBoundingClientRect();
  console.log(draggableElem.offsetParent.className);
  parentClientRect = draggableElem.offsetParent.getBoundingClientRect();

  shiftX = e.clientX - elemClientRect.left;
  shiftY = e.clientY - elemClientRect.top;
  console.log('it is draggable');

  // make draggable to absolute
  draggableElem.style.position = 'absolute';
  moveAt(e.clientX, e.clientY);
  // add mousemove
  document.addEventListener('mousemove', onMouseMove);

  // add mouseup
  document.addEventListener('mouseup', onMouseUp);

  function moveAt(x, y) {
    let newX = x - parentClientRect.left - shiftX;
    let newY = y - parentClientRect.top - shiftY;
    newX = newX < 0 ? 0 : newX;
    newX = newX > (parentClientRect.right - parentClientRect.left - draggableElem.offsetWidth) ?
    (parentClientRect.right - parentClientRect.left - draggableElem.offsetWidth) : newX;
    newY = newY > (parentClientRect.bottom - parentClientRect.top - draggableElem.offsetHeight) ?
    (parentClientRect.bottom - parentClientRect.top - draggableElem.offsetHeight) : newY;
    newY = newY < 0 ? 0 : newY;
    console.log('newX', newX);
    draggableElem.style.left = newX + 'px';
    draggableElem.style.top = newY + 'px';
  }

  function onMouseMove(e) {
    console.log(e.clientX, e.clientY);
    moveAt(e.clientX, e.clientY);
  }
  function onMouseUp(e) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}

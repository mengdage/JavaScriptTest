(function() {
  var checkBtn = document.getElementById('checkBtn'),
      checkBox = document.getElementById('test-checkbox');
  function clickCheckBox() {
    var clickEvent = new MouseEvent('click', {
      // cancelable: true,
      bubbles: true
    });
    if(checkBox.dispatchEvent(clickEvent)) {
      console.log(true);
    } else {
      console.log(false);
    }
  }
  checkBtn.addEventListener('click', clickCheckBox);
  checkBox.addEventListener('click', function(e) {
    console.log('I am clicked 1');
  });
  checkBox.addEventListener('click', function(e) {
    console.log('canclled');
    e.preventDefault(); // what does it prevent?
  });
  checkBox.addEventListener('click', function(e) {
    console.log('I am clicked 2');
  });

})();

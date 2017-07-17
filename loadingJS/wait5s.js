function waitForSeconds2(n) {
  var start = Date.now(),
      end = start + n * 1000;
  console.log('5 start');
  while(Date.now() < end) {
    ;
  }
  console.log('5 end');
}

waitForSeconds2(5);

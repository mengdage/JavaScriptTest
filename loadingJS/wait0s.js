function waitForSeconds(n) {
  var start = Date.now(),
      end = start + n * 1000;
  console.log('0 start');
  while(Date.now() < end) {
    ;
  }
  console.log('0 end');
}

 waitForSeconds(0);

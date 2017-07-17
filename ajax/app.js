function get(url, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status === 200) {
      cb(JSON.parse(request.response));
    }
  }

  request.send();
}

get('', console.log);

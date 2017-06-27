if(window.Promise){
  console.log("Promise found");

  var promise = new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET','http://api.icndb.com/jokes/random');

    req.onload = function(){
      if(req.status == 200) {
        resolve(req.response);
      } else {
        reject(req.statusText);
      }
    }

    req.onerror = function() {
      reject(Error("Error fetching data"));
    }

    req.send();
  });

  promise.then(function(data){
    console.log('Got data! Promise fulfilled.');
    console.log(JSON.parse(data));
  }).catch(function(err) {
    console.log("Promise rejected");
    console.error(err.message);
  });
} else {
  console.log('Promise not found');
}


doSomething().then(function () {
  return doSomethingElse();
  // Return a new promise to the next chained then().
});

doSomething().then(function () {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);

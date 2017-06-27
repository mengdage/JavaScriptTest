// I would use Promise.all() to issue load requests
// in parallel and invoke the lastCallback with the responses
// in the .then() function after all requests have been resolved.
// To better illustrate the process, I realized my load(url, callback) function using Promise.

// load will return a promise with a javascript object representing the response from the request
// If callback is defined, it will be invoked with the javascript object.
function load(url, callback) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', url);
    xhr.onload = function() {
      if (xhr.status == 200) {
        var response = JSON.parse(xhr.response);
        // Call the callback if defined
        if(callback && typeof callback === 'function'){
          callback(response);
        }
        // Return the javascript object representing the response.
        resolve(response);
      } else {
        reject(Error(xhr.statusText));
      }
    };

    xhr.onerror = function() {
      reject(Error(xhr.statusText));
    };

    xhr.send();
  }).catch(function(err){
    console.log("Something went wrong: ");
    console.log(err.message);
  });
}

function loadAll(urls, lastCallback) {
  // Use Promise.all() to issue requests parallelly
  Promise.all(
    // array of Promises with response objects
    urls.map(function(url){
      return load(url, undefined);
    })
  ).then(function(responses){
    if (lastCallback && typeof lastCallback === 'function') {
      lastCallback(responses);
    }
  }).catch(function(err) {
    console.log("Not all requests succeeded!");
    console.log(err);
  });
}


// Test
function printStory(chapters) {
  var story = "";
  for(let i = 0; i < chapters.length; i++){
    var ch = chapters[i];
    story += "<h2>CH " + ch.chapter + "</h2>" + ch.html;
  }
  document.querySelector(".story").innerHTML = story;
}


load('story.json', function(res) {
  console.log(res);
});

loadAll(['chapter-1.json', 'chapter-2.json', 'chapter-3.json'], printStory);

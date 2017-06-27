function get(url) {
  // Return a new promise
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('Get', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if(req.status == 200) {
        // Resolve the promise with the response text
        // console.log(req);
        resolve(req.response);
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningfull text
        reject(Error(req.statusText));
      }
    }

    req.onerror = function() {
      reject(Error("Network Error"));
    }

    req.send();
  });
}

// Return a promise containing the parsed JSON object
function getJSON(url) {
  return get(url).then(JSON.parse);
}

getJSON('story.json').then(function(story) {
    addHtmlToPage(story.heading);
    // story.chapterUrls.forEach(function(url) {
    //   getJSON(url).then(function(chapter) {
    //     addHtmlToPage(chapter.html);
    //   });
    // });

    // return story.chapterUrls.reduce(function(sequence, url) {
    //   return sequence.then(function() {
    //     return getJSON(url);
    //   }).then(function(chapter) {
    //     addHtmlToPage(chapter.html);
    //   });
    // }, Promise.resolve());

    Promise.all(
      story.chapterUrls.map(getJSON)
    ).then(function(chapters) {
      chapters.forEach(function(chapter) {
        addHtmlToPage(chapter.html);
      });
      addTextToPage("All done");
    }).catch(function(err) {
      addTextToPage("Broken: " + err.message);
    });

    // story.chapterUrls.map(getJSON)
    //   .reduce(function(sequence, chapterPromise){
    //     return sequence.then(function(){
    //       return chapterPromise;
    //     }).then(function(chapter) {
    //       addHtmlToPage(chapter.html);
    //     });
    //   }, Promise.resolve())
    //   .then(function(){
    //     addTextToPage("All done");
    //   })
    //   .catch(function(err){
    //     addTextToPage("Broken: ", err.message);
    //   });

  }
);

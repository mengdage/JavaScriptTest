function get(url) {
  const promise = new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    // xhr.responseType = 'json';
    xhr.onload = function() {
      if(xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(Error(xhr.statusText));
      }
    };

    xhr.onerror = function() {
      reject(Error('Network error'));
    };

    xhr.send();
  });
  return promise;

}

function getJSON(url) {
  return get(url).then(JSON.parse);
}

const storyDiv = document.querySelector('.story');
function addHTMLToPage(content) {
  const divEle = document.createElement('div');
  divEle.innerHTML = content;
  storyDiv.appendChild(divEle);
}
function addTextToPage(content) {
  const pEle = document.createElement('p');
  pEle.textContent = content;
  storyDiv.appendChild(pEle);
}

const body = document.body;
const loading = document.createElement('img');
loading.src='ajax-loader.gif';
body.appendChild(loading);

getJSON('story.json')
  .then(function(story){
    console.log(story.heading);
    addHTMLToPage(story.heading);

    // TODO: for each url in story.chapterUrls
    const chapterUrls = story.chapterUrls;
    return chapterUrls.map(getJSON).reduce(
      function(sequence, chapterPromise){
        return sequence
                .then(function() {
                  return chapterPromise;
                }).then( (chapter) => {
                  console.log(chapter);
                  addHTMLToPage(chapter.html);

                });
      }, Promise.resolve());
  })
  .then(function(response) {
    console.log('All done!')
    addTextToPage('All done!')
  })
  .catch(function(err) {
    console.log("something bad happened: ", err.message);
    addTextToPage("something bad happened: ", err.message);
  })
  .then(function(){
    // stop the spinner
    loading.style.display = 'none';
  })

function ajax(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.onload = function() {
      if(xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    xhr.onerror = function() {
      reject(new Error('Network Error!'));
    }

    xhr.send();
  });
}

function getJSON(url) {
  return ajax(url).then(JSON.parse);
}

// Polyfill
if(!Promise.map) {
  Promise.map = function(vals, cb) {
    return Promise.all(vals.map(function(val) {
      return new Promise(function(resolve, reject){
        cb(val, resolve);
      })
    }));
  }
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
  .then(function(value) {
    // add contents all at once
    // Promise.all(value.chapterUrls.map((chapter) => getJSON(chapter)))
    //   .then(contents => contents.forEach((content) => {
    //     console.log(content);
    //     addHTMLToPage(content.html);
    //   }))
    //   .then(function() {
    //     loading.style.display = 'none';
    //   });

    // add content as soon as possible
    // Promise.map(value.chapterUrls, function(val, done) {
    //   getJSON(val)
    //     .then(function(content) {
    //       console.log('content: ', content);
    //       addHTMLToPage(content.html);
    //       done(content);
    //     }, done);
    // })
    // .then(function() {
    //   loading.style.display = 'none';
    // });

    // add content ASAP and in order
    value.chapterUrls.map(getJSON)
      .reduce(function(sequence, chapterPromise) {
        return sequence
          .then( () => chapterPromise)
          .then( content => {
            addHTMLToPage(content.html);
          });
      }, Promise.resolve())
      .then( ()=> loading.style.display = 'none');
  });

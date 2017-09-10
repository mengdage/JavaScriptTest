const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-keyword');
const responseContainer = document.querySelector('.response-container');
let searchKeyword;

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchInput.value;

  function addImage(data){
    // let htmlContent = '';
    // const data = JSON.parse(this.responseText);
    const firstImage = data.results[0];

    if(data && data.results && data.results[0]){
      htmlContent = `<figure>
        <img src="${firstImage.urls.small}" alt="${searchedForText}" >
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>`;
      responseContainer.innerHTML += htmlContent;
    } else {
      htmlContent = '<div>No image available</div>';
    }

  }
  // const searchedForText = 'hippos';
  // const unsplashRequest = new XMLHttpRequest();
  const unsplashId = '9338c3381e95e7ccd9c09de944834ada2229a2e078b996d51bfdf3088f0c6043';
  //
  // unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
  // unsplashRequest.onload = addImage;
  // unsplashRequest.setRequestHeader('Authorization', 'Client-ID '+unsplashId);
  // unsplashRequest.send()

  // $.ajax({
  //   url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
  //   headers: {
  //     Authorization: 'Client-ID '+unsplashId
  //   }
  // })
  //   .then(addImage)
  //   .fail(( jqXHR, textStatus, errorThrown) => console.log('unsplash textStatus: ', errorThrown));

  fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {Authorization: 'Client-ID '+unsplashId},
    method: 'GET'
  })
    .then(res=>res.json())
    .then(addImage)
    .catch(e=>console.log(e));

  function addArticles (data) {
    let htmlContent ='';
    // const data = JSON.parse(this.responseText);
    if(data && data.response && data.response.docs && data.response.docs.length > 1) {
      htmlContent = '<ul>' +
                    data.response.docs.map(article => `<li><h2><a href="${article.web_url}">${article.headline.main}</a></h2></li>`).join('') +
                    '</ul>';
    } else {
      htmlContent = '<div>No article available</div>'
    }
    responseContainer.innerHTML += htmlContent;
  }
  // const articleRequest = new XMLHttpRequest();
  const nytKey = '69fa9b6742654bb499ce82d5f41ff1de';
  // articleRequest.onload = addArticles;
  // articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nytKey}`);
  // articleRequest.send();
  // $.ajax({
  //   url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nytKey}`,
  //   error: ( jqXHR, textStatus, errorThrown) => console.log('err: ', textStatus, errorThrown)
  // })
  // .done(addArticles)
  // .fail(( jqXHR, textStatus, errorThrown) => console.log(textStatus, errorThrown));

  fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${nytKey}`)
    .then(res => res.json())
    .then(addArticles)
    .catch(e => console.log(e));
});

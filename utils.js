var storyDiv = document.querySelector('.story');

function addHtmlToPage(content) {
  var newDiv = document.createElement('div');
  newDiv.innerHTML = content;

  storyDiv.appendChild(newDiv);
}

function addTextToPage(text) {
  var newp = document.createElement('p');
  newp.innerText = text;

  storyDiv.appendChild(newp);
}

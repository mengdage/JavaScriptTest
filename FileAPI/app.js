const previewElem = document.querySelector('.preview');
const imgInput = document.getElementById('imgInput');

imgInput.addEventListener('change', function(e) {
  handleFiles(e.target.files);
});

function handleFiles(files) {
  for(let i = 0, len = files.length; i < len; i+=1) {
    let file = files[i];

    var img = new Image();
    img.classList.add('avatar');
    img.file = file;
    img.src = window.URL.createObjectURL(file);
    console.log(img.src);
    img.onload = function(){window.URL.revokeObjectURL(this.src)};
    previewElem.appendChild(img);

    // var reader = new FileReader();
    // reader.addEventListener('load', function(e) {
    //   console.log(reader.result);
    //   img.src = e.target.result;
    // });
    // reader.readAsDataURL(file);
  }
}

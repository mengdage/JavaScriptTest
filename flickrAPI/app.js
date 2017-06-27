var endpoint = 'https://api.flickr.com/services/rest/';
var ny={
  lat: 40.758895,
  lng: -73.98513100000002
};
place = ny;
function show(data) {console.log(data);}
$.get({
  url: endpoint,
  data:{
    api_key: 'd290d164ee1e850fc0e893a9d0a83d45',
    method: 'flickr.photos.search',
    format: 'json',
    content_type: 1,
    radius: 12,
    lat: place.lat,
    lon: place.lng,
    nojsoncallback: 1,
    per_page: 10

  },
  dataType: 'json'
})
  .done(function(data) {
    console.log(data);
  });

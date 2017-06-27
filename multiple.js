var myButton = document.querySelector('.myButton');
var outputBox = document.querySelector('.outputBox');

// eventType: endTime
myButton.endTimeStamp = {

};
function print(text) {
  outputBox.innerHTML += '<p>'+text+'</p>';
}

myButton.addEventListener('click', function(e){
  console.log(this.endTimeStamp);
  // get the time when the click event happened
  var curEventStartTime = Math.round(e.timeStamp + performance.timing.navigationStart);

  var num = 0;

  // get the end time when the previous event is finished
  var preEventEndTime = this.endTimeStamp[e.type] || -1;
  // check if current event occurs before the end of the previous event
  if( curEventStartTime > preEventEndTime ) {
    // a time consuming task
    for(var i = 0; i < 1000000000; i++) {
      num++;
    }
    // get the time when the event finished
    this.endTimeStamp[e.type] = Date.now();

    print('event occured at '+curEventStartTime +' is completed at ' + this.endTimeStamp[e.type] + ' in ('+(this.endTimeStamp[e.type]-curEventStartTime)+' miliseconds)');
  } else {
    print('event occured at ' + curEventStartTime + ' is discarded');
  }
});

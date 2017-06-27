(function() {
  'use strict';
  var publisher,
      paper,
      meng;

  publisher = {
    subscribers: {
      any: [] // event_type: subscribers_array
    },
    subscribe: function(fn,type){
      type = type || 'any';
      if(typeof this.subscribers[type] === "undefined") {
        this.subscribers[type] = [];
      }
      this.subscribers[type].push(fn);
    },
    unsubscribe: function(fn, type) {
      this.visitSubscribes('unsubscribe', fn, type);
    },
    publish: function(publication, type) {
      this.visitSubscribes('publication', publication, type);
    },
    visitSubscribes: function(action, arg, type) {
      var pubtype = type || 'any',
          subscribers = this.subscribers[type],
          i,
          max = subscribers.length;
      for(i = 0; i < max; i += 1) {
        if(action === 'unsubscribe') {
          if(subscribers[i] === arg) {
            subscribers.splice(i, 1);
          }
        } else if(action === 'publication') {
          subscribers[i](arg);
        }
      }
    }
  };

  paper = {
    daily: function(content) {
      this.publish(content, 'daily');
    },
    weekly: function(content) {
      this.publish(content, 'weekly');
    }
  };

  meng = {
    drinkCoffee: function(paper) {
      console.log('Just read ' + paper);
    },
    sundayPreNap: function(paper) {
      console.log('Aout to fall asleep reading this ' + paper);
    }
  };

  function makePublisher(obj) {
    var i;
    for(i in publisher) {
      // check if it is an ownProperty function
      if(publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
        obj[i] = publisher[i];
      }
    }

    // create obj's own subscribers array
    obj.subscribers = {any: []};
  }

  makePublisher(paper);
  paper.subscribe(meng.drinkCoffee, 'daily');
  paper.subscribe(meng.sundayPreNap, 'weekly');

  paper.daily('good day!');
  paper.daily('another good day!');
  paper.weekly('good week!');
})();

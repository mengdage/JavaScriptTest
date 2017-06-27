(function(){
  'use strict';
  var publisher,
    scoreboard,
    game;

  publisher = {
    subscribers: {
      any: []
    },
    on: function(type, fn, context) {
      type = type || 'any';
      fn = typeof fn === 'function'? fn : context[fn];
      if(typeof this.subscribers[type] === 'undefined') {
        this.subscribers[type] = [];
      }
      this.subscribers[type].push({fn: fn, context: context || this});
    },
    remove: function(type, fn, context){
      this.visitSubscribes('remove', type, fn, context);
    },
    fire: function(type, publication) {
      this.visitSubscribes('publish', type, publication);
    },
    visitSubscribes: function(action, type, arg, context) {
      var pubtype = type || 'any',
          subscribers = this.subscribers[type],
          i,
          max = subscribers.length;

      for(i = 0; i < max; i+=1) {
        if(action === 'publish') {
          subscribers[i].fn.call(subscribers[i].context, arg);
        } else if(action === 'remove') {
          if(subscribers[i].fn === arg && subscribers[i].context == context) {
            subscribers.splice(i, 1);
          }
        }
      }
    }
  };

  function Player(name, key) {
    this.points = 0;
    this.name = name;
    this.key = key;
    this.fire('newplayer', this);
  }
  Player.prototype.play = function() {
    this.points += 1;
    this.fire('play', this);
  };

  scoreboard = {
    update: function(scores) {
      if(!this.element) {
        this.element = document.getElementById('results');
      }
      var i, msg='';
      for(i in scores) {
        if(scores.hasOwnProperty(i)) {
          msg += '<p><strong>' + i + '</strong>: ';
          msg += scores[i];
          msg += '</p>';
        }
      }
      this.element.innerHTML = msg;
    }
  };

  game = {
    keys: {},
    addPlayer: function(player) {
      var key = player.key.toString();
      this.keys[key] = player;
    },
    handleKeypress: function(e) {
      var key = e.key;
      if(game.keys[key]){
        game.keys[key].play();
      }
    },
    handlePlay: function() {
      var i,
          players = this.keys,
          scores ={};
      for( i in players) {
        if(players.hasOwnProperty(i)) {
          scores[players[i].name] = players[i].points;
        }
      }
      this.fire('scorechange', scores);
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

  makePublisher(game);
  makePublisher(Player.prototype);

  Player.prototype.on("newplayer", "addPlayer", game);
  Player.prototype.on("play", "handlePlay", game);
  game.on('scorechange', 'update', scoreboard);
  document.addEventListener('keypress', game.handleKeypress);

  new Player('meng', 'a');
  new Player('lin', '1');
  new Player('lin2', '2');
})();

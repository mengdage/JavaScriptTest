(function(global) {
  'use strict';

  var document = global.document,
      window = global.window,
      scoreboard,
      mediator;

  function Player(name) {
    // in case without new
    if(!(this instanceof Player)) {
      return new Player(name);
    }

    this.points = 0;
    this.name = name;
  }

  Player.prototype.play = function() {
    this.points += 1;
    // notify mediator
    mediator.played();
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

  mediator = {
    players: {},
    setup: function() {
      this.createResultElement();
      var players = this.players;
      players.home = new Player('Home');
      players.guest = new Player('Guest');
    },
    played: function() {
      var players = this.players,
      scores = {
        Home: players.home.points,
        Guest: players.guest.points
      };
      scoreboard.update(scores);
    },
    keypress: function(e) {
      if(e.key === '1'){
        mediator.players.home.play();
      } else if(e.key === '0') {
        mediator.players.guest.play();
      }
    },
    createResultElement: function() {
      var elem = document.getElementById('results');
      // check if elem exists
      if(!elem) {
        elem = document.createElement('p');
        elem.id = 'results';

        document.body.appendChild(elem);
      }
      elem.textContent = 'GO!';
    }
  };

  mediator.setup();
  document.addEventListener('keypress', mediator.keypress);
})(self);

// no d3 here.
'use strict';

// gameLogic

// pack of state

//asteroids
//bosses
//players
//scores

var width = '1700';
var height = '800';


class Enemy {
  constructor(i) {
    this.randomizeStart();
    this.go();
    this.id = 'e' + i;
    this.duration = 5000;
  }
  randomizeStart() {
    this.x = width;
    this.y = Math.round(Math.random() * height);
  }
  go() {
    this.xx = -50;
    this.yy = Math.round((Math.random() * height) - this.y) + this.y;
  }
}


var enemyId = 0;
var gameInterval;

var data = {
  highScore: 0, 
  score: 0,
  collisions: 0,
  asteroids: [],
  asteroidCount: 0,
  players: [],
  playerLocations: {},
  numberOfPlayers: 0,
  // bosses: ,
  // players: ,
};

setInterval(()=>{
  if (data.asteroidCount > 25) {
    data.asteroids.shift();
  } else {
    data.asteroidCount ++;
  }
  enemyId ++;
  data.asteroids.push(new Enemy(enemyId));
}, 200);



setInterval(()=>{
  data.highScore = Math.max(data.highScore, data.score);
  data.score += 1;
}, 30);

module.exports = data;
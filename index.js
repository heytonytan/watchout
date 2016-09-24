'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var data = require('./gameLogic');



class Player {
  constructor(id) {
    this.id = id;
    this.x = 1700 / 2;
    this.y = 800 / 2;
    data.playerLocations[id] = [this.x, this.y];
  }
}


app.use(express.static('client'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

// console.log(watchout);

io.on('connection', function(socket) {
  console.log('A user connected');
  if (data.players.length < 2) {
    data.players.push(new Player(data.players.length));
    io.emit('update players', data.players);
  }
  data.asteroids = [];
  data.asteroidCount = 0;
  setInterval(()=>{
    io.emit('game state', data);
  }, 5);
  io.on('collision', function() {
    data.collisions++;
    data.score = 0;
  });
  io.on('player move', function(location) {
    data.playerLocation = location;
  });
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
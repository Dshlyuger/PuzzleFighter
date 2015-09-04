var express = require('express');
var uuid = require('node-uuid');
var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)
games = [];
gameNumber = 0;
var game = function() {
    number = 0;
    socketid1 = "";
    socketid2 = "";
    screenOneWidth = 0;
    screenOneHeight = 0;
    screenTwoWidth = 0;
    screenTwoHeight = 0;
    singlePlayer = false;
}
var numPlayers = 0;
singlePlayer = false;
app.use(express.compress());
app.use(express.static(__dirname + '/images'));
server.listen((process.env.PORT || 5000));
io.sockets.on('connection', function(socket) {
    numPlayers++;
    if (numPlayers % 2 == 0) {
        games[gameNumber].socketid2 = socket.id;
        console.log(gameNumber);
        console.log(game)
        io.sockets.socket(games[gameNumber].socketid1).emit('matched', gameNumber);
        io.sockets.socket(games[gameNumber].socketid2).emit('matched', gameNumber);
        gameNumber++;
    } else {
        games[gameNumber] = new game();
        games[gameNumber].socketid1 = socket.id;
    }
    socket.on('singlePlayer', function() {
        game.singlePlayer = true;
    });
    socket.on('reset', function() {});
    socket.on('playerOneLost', function(gameNumber) {
        io.sockets.socket(games[gameNumber].socketid2).emit('gameOver');
    });
    socket.on('aiLost', function(gameNumber) {
        io.sockets.socket(games[gameNumber].socketid1).emit('aiLost');
    });
    socket.on('initialized', function(id, innerWidth, innerHeight, gameNumber) {
        console.log(gameNumber)
        console.log(games[gameNumber]);
        if (!games[gameNumber].singlePlayer) {
            if (games[gameNumber].socketid1 == id) {
                games[gameNumber].screenOneWidth = innerWidth;
                games[gameNumber].screenOneHeight = innerHeight;
                //  console.log(game.screenOneWidth);
            } else {
                games[gameNumber].screenTwoWidth = innerWidth;
                games[gameNumber].screenTwoHeight = innerHeight;
                //  console.log(game.screenTwoWidth);
            }
        } else {
            games[gameNumber].screenOneWidth = innerWidth;
            games[gameNumber].screenOneHeight = innerHeight;
            games[gameNumber].screenTwoWidth = innerWidth;
            games[gameNumber].screenTwoHeight = innerHeight;
        }
    });
    socket.on('playerMove', function(id, grid, playerpiece, gameNumber) {
        if (games[gameNumber].socketid1 == id) {
            io.sockets.socket(games[gameNumber].socketid2).emit('updateOtherPlayer', grid, playerpiece, games[gameNumber].screenOneWidth, games[gameNumber].screenOneHeight);
        } else {
            io.sockets.socket(games[gameNumber].socketid1).emit('updateOtherPlayer', grid, playerpiece, games[gameNumber].screenTwoWidth, games[gameNumber].screenTwoHeight);
        }
    });
    socket.on('CollisionResult', function(id, tobeadded, gameNumber) {
        if (games[gameNumber].socketid1 == id) {
            io.sockets.socket(games[gameNumber].socketid2).emit('registerCollisionResult', tobeadded);
        } else {
            io.sockets.socket(games[gameNumber].socketid1).emit('registerCollisionResult', tobeadded);
        }
    });
});
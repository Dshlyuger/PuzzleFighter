var express=require('express');
var uuid = require('node-uuid');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

  var game=new game();

  function game(){
  socketid1="";
  socketid2="";
 screenOneWidth=0;
 screenOneHeight=0;
 screenTwoWidth=0;
 screenTwoHeight=0;
 screenOneGrid=[];
 screenTwoGrid=[];
 screenOnePlayerpiece=null;
 screenTwoPlayerpiece=null;
  
  }

 var numPlayers=0;
 singlePlayer=false;

app.use(express.compress()); 
app.use(express.static(__dirname + '/images'));

server.listen(8080);


io.sockets.on('connection', function (socket) {
numPlayers++;
console.log(numPlayers);
	if(numPlayers==2){
	game.socketid2=socket.id;
	console.log(game.socketid2);

	io.sockets.socket(game.socketid1).emit('matched', "1");
	io.sockets.socket(game.socketid2).emit('matched', "2");
	}
	else{
	game.socketid1=socket.id;
	//console.log(game.socketid1);
	}


			socket.on('singlePlayer',function(){
			singlePlayer=true;
		});

			socket.on('reset',function(){
			numPlayers=0;
			game.screenOneWidth=0;
			game.screenOneHeight=0;
			game.screenTwoWidth=0;
			game.screenTwoHeight=0;

		});


			socket.on('playerOneLost',function(){
			io.sockets.socket(game.socketid2).emit('gameOver');	
	});

			socket.on('aiLost',function(){
			io.sockets.socket(game.socketid1).emit('aiLost');
			console.log("pokas")
	});


			socket.on('initialized',function(id,innerWidth,innerHeight){
				
			if(game.socketid1==id){
			game.screenOneWidth=innerWidth;
			game.screenOneHeight=innerHeight;
		//	console.log(game.screenOneWidth);
			}
			else{
			game.screenTwoWidth=innerWidth;
			game.screenTwoHeight=innerHeight;
		//	console.log(game.screenTwoWidth);
			}
	});
			socket.on('playerMove',function(id,grid,playerpiece){
		//	console.log(playerpiece.image1);
			if(game.socketid1==id){
		console.log("blah");
			game.screenOneGrid=grid;
			game.screenOnePlayerpiece=playerpiece;	
			io.sockets.socket(game.socketid2).emit('updateOtherPlayer',grid,playerpiece,game.screenOneWidth,game.screenOneHeight);
			}
			else{

			game.screenOneGrid=grid;
			game.screenOnePlayerpiece=playerpiece;
			io.sockets.socket(game.socketid1).emit('updateOtherPlayer',grid,playerpiece,game.screenTwoWidth,game.screenTwoHeight);
			}
			
	});

			socket.on('CollisionResult',function(id,tobeadded){

			if(game.socketid1==id){	
			io.sockets.socket(game.socketid2).emit('registerCollisionResult', tobeadded);
			}
			else{
			io.sockets.socket(game.socketid1).emit('registerCollisionResult', tobeadded);
			}
			
	});
});





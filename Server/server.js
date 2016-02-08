// For the brave souls who get this far: You are the chosen ones,
// the valiant knights of programming who toil away, without rest,
// fixing our most awful code. To you, true saviors, kings of men,
// I say this: never gonna give you up, never gonna let you down,
// never gonna run around and desert you. Never gonna make you cry,
// never gonna say goodbye. Never gonna tell a lie and hurt you.
var WebSocketServer = new require('ws');
var WebSocket = new require('ws');
var welcome = Math.random();
if (welcome > 0.9){
	welcome = 0;
	console.log(' _|      _|    _|_|    _|_|_|_|  _|_|_|    _|_|        _|_|_|    ');
	console.log(' _|_|  _|_|  _|    _|  _|          _|    _|    _|      _|    _|  ');
	console.log(' _|  _|  _|  _|_|_|_|  _|_|_|      _|    _|_|_|_|      _|_|_|    ');
	console.log(' _|      _|  _|    _|  _|          _|    _|    _|      _|    _|  ');
	console.log(' _|      _|  _|    _|  _|        _|_|_|  _|    _|      _|_|_|    ');
	console.log('');
	console.log('');
}
else if (0.9 > welcome > 0.8) {
	welcome = 0;
	console.log('888b     d888        d8888 8888888888 8888888        d8888       888888b.   ');
	console.log('8888b   d8888       d88888 888          888         d88888       888  "88b  ');
	console.log('88888b.d88888      d88P888 888          888        d88P888       888  .88P  ');
	console.log('888Y88888P888     d88P 888 8888888      888       d88P 888       8888888K.  ');
	console.log('888 Y888P 888    d88P  888 888          888      d88P  888       888  "Y88b ');
	console.log('888  Y8P  888   d88P   888 888          888     d88P   888       888    888 ');
	console.log('888   "   888  d8888888888 888          888    d8888888888       888   d88P ');
	console.log('888       888 d88P     888 888        8888888 d88P     888       8888888P"  ');
	console.log('');
	console.log('');
}
else if (0.8 > welcome > 0.7) {
	welcome = 0;
	console.log('.::       .::      .:       .::::::::.::      .:            .:: .::   ');
	console.log('.: .::   .:::     .: ::     .::      .::     .: ::          .:    .:: ');
	console.log('.:: .:: . .::    .:  .::    .::      .::    .:  .::         .:     .::');
	console.log('.::  .::  .::   .::   .::   .::::::  .::   .::   .::        .::: .:   ');
	console.log('.::   .:  .::  .:::::: .::  .::      .::  .:::::: .::       .:     .::');
	console.log('.::       .:: .::       .:: .::      .:: .::       .::      .:      .:');
	console.log('.::       .::.::         .::.::      .::.::         .::     .:::: .:: ');
	console.log('');
	console.log('');
}
console.log('Version: V0.4(Alpha)');
console.log('Server running on 8081 port');
console.log('Master-server connection is disabled');
console.log('Made by Kradre');
// Connection to master-server(Soon)
//var socket = new WebSocket("ws://kradre.ru:8081");
var game = 0;
var night = 999;
var clients = {};
var nicks = {};
var taken = {};
// Amont of players, allowed on this server.
var players = 7;
// 1 - Villager. 2 - Mafia/Werewolfs. 3 - Inspector. 4 - Doctor. 5 - Killer. 6 - Prostitute.
var roles7 = [1,1,3,1,1,2,2];
var r7 = [11,7]; //For choices
var roles8 = [1,5,3,4,1,2,2,2];
var r8 = [20,18]
var roles9 = [1,1,5,3,4,1,2,2,2];
var r9 = [21,18];
var roles10 = [1,1,5,3,4,1,2,2,2,1];
var r10 = [22,18];
var roles11 = [1,1,5,3,4,1,2,2,2,6,2];
var r11 = [24,21];
var PStart = 1;
var rd = -1;
//For votes
var dayvote;
var nightvote;
// MafiaB-server on port 8081
var webSocketServer = new WebSocketServer.Server({
  port: 8081
});
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
function maff (d) {
	
}
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  if (game == 1) {
	  clients[id].send('dc§full');
  }
  else {
	for (var key in clients) {
		clients[key].send('reload§');
	}

  ws.on('message', function(message) {
	var msg = message.split('§');
	if (msg[0] == 'nick') {
		nicks[id] = msg[1];
		console.log("Player " + nicks[id] + " connected to server");
		PStart++;
		for (var key in clients){
			for (var key2 in nicks) {
				clients[key].send('listp§' + nicks[key2]);
			}
		}
	}
	else if (msg[0] == 'msg') {
		console.log('Player ' + nicks[id] + ' sended message: ' + msg[1]);
		for (var key in clients) {
			clients[key].send('msg§' + nicks[id] + ": " + msg[1]);
		}
	}
	//Finish a choice function, dumbass
	else if (msg[0] == 'cse') {
		if (night == 1) {
			if (taken[id] == 2) {
				
			}
			if (taken[id] == 3) {
				
			}
			if (taken[id] == 4) {
				
			}
			if (taken[id] == 5) {
				
			}
		}
		else if (night == 0) {
			
		}
	}
    
  });
 //TODO: System of day/night

 //Automatic system of dispensing roles.
  
  if (PStart == players) {
	  console.log("Game started");
	  PStart = 999;
	  game = 1;
	  night = 0;
	  if (players == 7) {
		  roles = shuffle(roles7);
		  dayvote = r7[0];
		  nightvote = r7[1];
		  for (var key in clients) {
			rd++;
			taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 8) {
		  roles = shuffle(roles8);
		  dayvote = r8[0];
		  nightvote = r8[1];
		  for (var key in clients) {
			rd++;
			taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 9) {
		  roles = shuffle(roles9);
		  dayvote = r9[0];
		  nightvote = r9[1];
		  for (var key in clients) {
			rd++;
			taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 10) {
		  roles = shuffle(roles10);
		  dayvote = r10[0];
		  nightvote = r10[1];
		  for (var key in clients) {
			rd++;
			taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 11) {
		  roles = shuffle(roles11);
		  dayvote = r11[0];
		  nightvote = r11[1];
		  for (var key in clients) {
			rd++;
			taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  for (var key in clients) {
			clients[key].send('game§day');
	  }
	  tdv = dayvote;
	  tnv = nightvote;
  }
 //TODO: Usual commands
  ws.on('close', function() {
	  if (game == 1) {
		  console.log("Player " + nicks[id] + " disconnected from server");
		  delete clients[id];
		  delete nicks[id];
		  for (var key in clients) {
		  	clients[key].send('reload§');
		  }
		  setTimeout(function () {for (var key in clients){
			for (var key2 in nicks) {
				clients[key].send('listp§' + nicks[key2]);
			}
		}},0);
	  }
	  else {
		  console.log("Player " + nicks[id] + " disconnected from server");
		  delete clients[id];
		  delete nicks[id];
		  PStart--;
		  for (var key in clients) {
		  	clients[key].send('reload§');
		  }
		  setTimeout(function () {for (var key in clients){
			for (var key2 in nicks) {
				clients[key].send('listp§' + nicks[key2]);
			}
		}},0);
	  }
    
  });
  }
  
	
  

  
});
var WebSocketServer = new require('ws');
var WebSocket = new require('ws');
console.log('Game: MafiaB');
console.log('Version: V0.3(Alpha)');
console.log('Server running on 8081 port');
console.log('Master-server connection is disabled');
// Connection to master-server(Soon)
//var socket = new WebSocket("ws://kradre.ru:8081");
var game = 0;
var night = 999;
var day = 999;
var clients = {};
var nicks = {};
var taken = {};
// Amont of players, allowed on this server.
var players = 6;
// 1 - Villager. 2 - Mafia/Werewolfs. 3 - Inspector. 4 - Doctor. 5 - Killer. 6 - Prostitute.
var roles7 = [1,1,3,1,1,2,2];
var roles8 = [1,5,3,4,1,2,2,2];
var roles9 = [1,1,5,3,4,1,2,2,2];
var roles10 = [1,1,5,3,4,1,2,2,2,1];
var roles11 = [1,1,5,3,4,1,2,2,2,6,2];
var PStart = 0;
var rd = -1;
// MafiaB-server on port 8081
var webSocketServer = new WebSocketServer.Server({
  port: 8081
});
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  if (game == 1) {
	  clients[id].send('dc§full');
  }
  else {
  console.log("Player " + id + " connected to server");
  
  
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
		console.log('Player ' + id + ' sended message: ' + msg[1]);
		for (var key in clients) {
			clients[key].send('msg§' + nicks[id] + ": " + msg[1]);
		}
	}
	//Finish a choice function, dumbass
	else if (msg[0] == 'cse') {
		if (night == 1) {
			if (taken[id] == 2) {
				
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
	  votes = taken.length;
	  
	  if (players == 7) {
		  roles = shuffle(roles7);
		  for (var key in clients) {
			rd++;
			taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 8) {
		  roles = shuffle(roles8);
		  for (var key in clients) {
			  rd++;
			  taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 9) {
		  roles = shuffle(roles9);
		  for (var key in clients) {
			  rd++;
			  taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 10) {
		  roles = shuffle(roles10);
		  for (var key in clients) {
			  rd++;
			  taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 11) {
		  roles = shuffle(roles11);
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
  }
 //TODO: Usual commands
  ws.on('close', function() {
	  if (game == 1) {
		  console.log("Player " + id + " disconnected from server");
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
		  console.log("Player " + id + " disconnected from server");
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
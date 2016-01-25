var WebSocketServer = new require('ws');
var WebSocket = new require('ws');
console.log('Game: MafiaB');
console.log('Version: V0.2(Pre-build)');
console.log('Server running on 8081 port');
console.log('Master-server connection is disabled');
// Подключение к мастер-серверу
//var socket = new WebSocket("ws://kradre.ru:8081");
var game = 0;
var night = 999;
var day = 999;
var clients = {};
var nicks = {};
var taken = {};
// Количество игроков.
var players = 6;
// 1 - Житель. 2 - Мафия. 3 - Инспектор. 4 - Доктор. 5 - Маньяк. 6 - Проститутка.
var roles7 = [1,1,3,1,1,2,2];
var roles8 = [1,5,3,4,1,2,2,2];
var roles9 = [1,1,5,3,4,1,2,2,2];
var roles10 = [1,1,5,3,4,1,2,2,2,1];
var roles11 = [1,1,5,3,4,1,2,2,2,6,2];
var PStart = 0;
var rd = -1;
// MafiaB-сервер на порту 8081
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
  console.log("Игрок " + id + " присоеденился к серверу");
  
  
	for (var key in clients) {
		clients[key].send('reload§');
	}

  ws.on('message', function(message) {
	var msg = message.split('§');
	if (msg[0] == 'nick') {
		nicks[id] = msg[1];
		PStart++;
		for (var key in clients){
			for (var key2 in nicks) {
				clients[key].send('listp§' + nicks[key2]);
			}
		}
	}
	else if (msg[0] == 'msg') {
		console.log('Игрок ' + id + ' прислал сообщение: ' + msg[1]);
		for (var key in clients) {
			clients[key].send('msg§' + nicks[id] + ": " + msg[1]);
		}
	}
	//Распиши до конца выбор, идиот.
	else if (msg[0] == 'cse') {
		if (night == 1) {
			if (taken[id] == 2) {
				
			}
		}
	}
    
  });
 //TODO: система дня и ночи, голосование.
 //Автоматическая система раздачи ролей
  if (PStart == players) {
	  console.log("Игра началась");
	  PStart = 999;
	  game = 1;
	  night = 0;
	  day = 1;
	  votes = taken.length;
	  
	  if (players == 6) {
		  roles = shuffle(roles7);
		  for (var key in clients) {
			rd++;
			taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 7) {
		  roles = shuffle(roles8);
		  for (var key in clients) {
			  rd++;
			  taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 8) {
		  roles = shuffle(roles9);
		  for (var key in clients) {
			  rd++;
			  taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 9) {
		  roles = shuffle(roles10);
		  for (var key in clients) {
			  rd++;
			  taken[key] == roles[rd];
			clients[key].send('game§start');
			clients[key].send('game§role§' + roles[rd]);
		  }
	  }
	  else if (players == 10) {
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
 //TODO: Основные комнаты.
  ws.on('close', function() {
	  if (game == 1) {
		  console.log("Игрок " + id + " отключен от сервера");
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
		  console.log("Игрок " + id + " отключен от сервера");
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
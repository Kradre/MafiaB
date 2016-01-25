var socket = new WebSocket();
var game = 0;
// Create connection
function connect() {
	ad = document.getElementById('server').value;
	socket = new WebSocket("ws://" + ad + ":8081");
	$('.login').css('display','none');
	$('.lobby').css('display','block');
	socket.onopen = function() {
		$( ".console" ).append('<div class="msg">Connected to server</div>');
		send('nick');
	}
	socket.onclose = function() {
		$( ".console" ).append('<div class="msg">Disconnected from server</div>');
	}
	socket.onmessage = function(event) {
		//Parsing messages
		var incomingMessage = event.data;
		var test = incomingMessage.split('§');
		if (test[0] == 'listp') {
			//Adding players in list
			$( ".players" ).append('<option>' + test[1] + '</option>');
		}
		else if (test[0] == 'reload') {
			//Reload players list
			$( ".players" ).text(" ");
		}
		else if (test[0] == 'dis') {
			//Message about disconnect(Soon)
			$( ".console" ).append('<div class="msg">Player ' + test[1] + ' disconnected</div>');
		}
		else if (test[0] == 'msg') {
			//Message from players
			$( ".console" ).append('<div class="msg">' + test[1] + '</div>');
		}
		else if (test[0] == 'game') {
				if (test[1] == "start") {
					//Start game
					$( ".console" ).append('<div class="msg">Game started</div>');
					game = 1;
				}
				else if (test[1] == "role") {
					//Dispensing roles
					role = test[2];
					if (test[2] == 1) {
						$( ".console" ).append('<div class="msg">Вы - мирный житель. Голосуйте, чтобы истребить мафию.</div>');
					}
					else if (test[2] == 2) {
						$( ".console" ).append('<div class="msg">Вы - мафия. Убейте всех, дабы получить город.</div>');
					}
					else if (test[2] == 3) {
						$( ".console" ).append('<div class="msg">Вы - коммисар. Вы должны раскрыть мафию ночью.</div>');
					}
					else if (test[2] == 4) {
						$( ".console" ).append('<div class="msg">Вы - доктор. Спасайте гражданских(или себя) от смерти.</div>');
					}
					else if (test[2] == 5) {
						$( ".console" ).append('<div class="msg">Вы - маньяк. Убей всех.</div>');
					}
					else if (test[2] == 6) {
						$( ".console" ).append('<div class="msg">Вы - проститутка. Вы*** всех.</div>');
					}
				}
				else if (test[1] == "day") {
					$( ".console" ).append('<div class="msg">Вы - проститутка. Вы*** всех.</div>');
				}
		}
		else if (test[0] == 'dc') {
			//Disconnecting player
			socket.close();
			if (test[1] == 'full') {
				//Game started already
				$( ".console" ).append('<div class="msg">Отключен - игра уже началась.</div>');
			}
			if (test[1] == "kill") {
				//Player killed
				$( ".console" ).append('<div class="msg">Вы были убиты.</div>');
			}
			
		}
	};
	
}

function send(g) {
		if (g == 'msg') {
			message = g + "§" + $('#chat').val();
			socket.send(message);
		}
		else if (g == 'nick') {
			message = g + "§" + $('#nick').val();
			socket.send(message);
		}
		else if ((g == 'cse') && (game==1)) {
			message = g + "§" + $(".players :selected").text();
			socket.send(message);
		}
		else if ((g == 'cse') && (game==0)) {
			$( ".console" ).append('<div class="msg">Игра ещё не началась.</div>');
		}
		return false;
	};
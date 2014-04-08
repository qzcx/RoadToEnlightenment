function impersonator(){//create a scope using this function
	var _gameList;
	var _players;
	
	$(function(){//on load function
		$.getJSON("/games/list", function(json){
			//console.log(json);
			//add the default value
			var html = "<option value='"+undefined+"'>Choose a game</option>";
			$("#game_list").append($(html));
				
				
			json.forEach(function(entry){
				//console.log(entry);
				var html = "<option value='"+entry.id+"'>"+entry.title+"</option>";
				//console.log(html);
				$("#game_list").append($(html));
			});
			init(json);
		});
	});

	function init(game_list){ //initialize page
		_gameList = game_list
		$("#game_list").unbind().change(onGameSelected);
	}
	//when a game is selected, populate the player selector
	function onGameSelected(){ 
		//empty the list besides the default value
		$("#player_list").empty();
		var html = "<option value='"+undefined+"'>Choose a player</option>";
		$("#player_list").append($(html));
		var gameId = $(this).val();
		if(!_gameList || !(gameId) || !(_gameList[gameId])  ){ //make sure gameList has been intialized.
			console.log("onGameSelect Failure");
			return;
		}
		
		_players = _gameList[gameId].players;
		_players.forEach(function(entry){
			//console.log(entry);
			var html = "<option value='"+entry.id+"'>"+entry.name+"</option>";
			//console.log(html);
			$("#player_list").append($(html));
		});
		$("#player_list").unbind().change(onPlayerSelected);
		//Change the game
		setCookie("catan.game", gameId);
		
	}
	
	function onPlayerSelected(){ 
		//debugger;
		var playerId = $("#player_list").val();
		if(!_players || !(playerId) || !(_players[playerId])  ){ //make sure gameList has been intialized.
			console.log("onGameSelect Failure");
			return;
		}
		console.log('{"name":"'+_players[playerId]+'","playerID":"'+playerId+'"}');
		setCookie("catan.user", '{"name":"'+_players[playerId].name+'","playerID":"'+playerId+'"}'); 
	}
	
	nextPlayer = function(){
		//debugger;
		if(!_players){ //make sure gameList has been intialized.
			console.log("nextPlayer Failure");
			return;
		}
		var selectedIndex = parseInt($('#player_list').val());
		if(selectedIndex + 1 <_players.length)
			$("#player_list").val(selectedIndex + 1);
		else
			$("#player_list").val(0);
		onPlayerSelected();
	}

	prevPlayer = function(){
		//debugger;
		if(!_players){ //make sure gameList has been intialized.
			console.log("prevPlayer Failure");
			return;
		}
		var selectedIndex = parseInt($('#player_list').val());
		if(selectedIndex - 1 >= 0)
			$("#player_list").val(selectedIndex - 1);
		else
			$("#player_list").val(_players.length -1);
		onPlayerSelected();
	}

	//uses cookies.js to modify cookies.
	function setCookie(name, data){
		Cookies.set(name, encodeURIComponent(data),null);
	}
	
	
	
}impersonator();

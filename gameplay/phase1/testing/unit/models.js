test("ClientModel", function(){
  var clientModel = new catan.models.ClientModel(0, modelJson);

  var hexLoc1 = new catan.models.map.HexLocation(1,1);
  // ok(map.canBuildRoad(0,hexLoc1,"N",false), "True");
  // ok(!map.canBuildRoad(0,hexLoc1,"S",false), "Failure Test: no nearby road");
  // ok(map.canBuildRoad(0,hexLoc1,"S",true), "True: setup near settlement");
  // var hexLoc2 = new catan.models.map.HexLocation(0,0);
  // ok(!map.canBuildRoad(0,hexLoc2,"N",true), "False: setup not near settlement");
  // ok(!map.canBuildRoad(0,hexLoc2,"SE",false), "False: only enemy road nearby");
  // ok(!map.canBuildRoad(0,hexLoc2,"S",false), "False: occupied");

  ok(clientModel.canPlaceRoad(hexLoc1, "N"), "Can indeed place a road, good job team!");

});

test("catan.models.map.VertexLocation", function() {
  var json = {
    "direction": "W",
    "x": 3,
    "y": -3
  };

  var vertexLocation = new catan.models.map.VertexLocation(json);
  equal("W", vertexLocation.getDirection(), "Valid direction set");
  notEqual(null, vertexLocation.getLocation(), "None null locations");
});

test("catan.models.map.Port", function() {
  var json = {
    "ratio": 3,
    "validVertex1": {
      "direction": "SW",
      "x": 3,
      "y": -3
    },
    "validVertex2": {
      "direction": "W",
      "x": 3,
      "y": -3
    },
    "orientation": "SW",
    "location": {
      "x": 3,
      "y": -3
    }
  };

  // Instantiate
  var port = new catan.models.map.Port(json);

  // Tests
  equal("SW", port.getOrientation(), "Has valid orientation");
  equal(3, port.getRatio(), "Has a ratio of 3");
  var verts = port.getValidVertices();
  equal(2, verts.length, "Has 2 verticies");
  notEqual(null, verts[0], "Not null vertex 1");
  notEqual(null, verts[1], "Not null vertex 2");
  notEqual(null, port.getLocation(), "Location not null");
});


test("chat", function(){
  console.log("Chat Test");
  var chatMsg = {
    "lines": [
      {
        "source": "Sam",
        "message": "Sam built a road",
        "className": "red"
      },
      {
        "source": "Brooke",
        "message": "Brooke built a settlement",
        "className": "green"
      }
      
    ]
  }

   // console.log(JSON.stringify(data.chat.lines));
  var s = new catan.models.chat.Chat(chatMsg);
   
  var len = s.getMessages().length;
  var len1 = chatMsg.lines.length;
  ok(len1 == len,  "successed!");

});

test("log", function(){
 
 console.log("Log Test");
 var logMsg = {
    "lines": [
      {
        "source": "Sam",
        "message": "Sam built a road",
        "className": "green"
      },
      {
        "source": "Sam",
        "message": "Sam built a settlement"
      },
      {
        "source": "Sam",
        "message": "Sam's turn just ended"
      },
      {
        "source": "Brooke",
        "message": "Brooke built a road"
      },
      {
        "source": "Brooke",
        "message": "Brooke built a settlement"
      }
    ]
  }
 stop();
  
 //jQuery.getJSON("model.json", function(data){
 //console.log(JSON.stringify(data.log.lines));
 var s = new catan.models.chat.Log(logMsg);
 var len = s.getMessages().length;
    var len1 = logMsg.lines.length;
    ok(len1 == len,  "successed!");
    start();
});

test("turn", function() {
  
  var phase1 = {
    "status": "Playing",
    "currentTurn": 0
  };

  var phase2 = {
    "status": "Rolling",
    "currentTurn": 0
  };

  var phase3 = {
    "status": "Discarding",
    "currentTurn": 0
  };
  
  var s = new catan.models.Turn(phase1);
    
  equal(s.getTurnPlayerId(),phase1.currentTurn,  "successed in getCurrentTurn()");
  equal(s.getPhase(), phase1.status, "successed in getPhase()");

  ok(s.isPlayingPhase() == true, "true in isPlayingPhase()");
  ok(s.isDiscardingPhase() == false, "false isDiscardingPhase()");
  ok(s.isRollingPhase() == false, "false in isRollingPhase");
  ok(s.isRobbingPhase() == false, "false in isRobbing()");
  
  s = new catan.models.Turn(phase2);
  ok(s.isRollingPhase() == true, "true in isRollingPhase");
  ok(s.isPlayingPhase() == false, "false in isPlayingPhase()");
  ok(s.isDiscardingPhase() == false, "false in isDiscardingPhase()");
  ok(s.isRobbingPhase() == false, "false in isRobbing()");

  s = new catan.models.Turn(phase3);
  ok(s.isDiscardingPhase() == true, "true in isDiscardingPhase()");
  ok(s.isPlayingPhase() == false, "false in isPlayingPhase()");
  ok(s.isRollingPhase() == false, "false in isRollingPhase");
  ok(s.isRobbingPhase() == false, "false isRobbing()");

});



test("Bank", function(){
  var bankjson = {
    "brick": 4,
    "wood": 9,
    "sheep": 1,
    "wheat": 7,
    "ore": 2
  }
  
  var bank = new catan.models.Bank(bankjson);
  
  
  equal(bank.resources.brick, bankjson.brick, "brick initialized correctly");
  equal(bank.resources.wood, bankjson.wood, "wood initialized correctly");
  equal(bank.resources.sheep, bankjson.sheep, "sheep initialized correctly");
  equal(bank.resources.wheat, bankjson.wheat, "wheat initialized correctly");
  equal(bank.resources.ore, bankjson.ore, "ore initialized correctly");
  
  equal(bank.getBrickCount(), bankjson.brick, "brick returned the correct number");
  equal(bank.getWoodCount(), bankjson.wood, "wood returned the correct number");
  equal(bank.getSheepCount(), bankjson.sheep, "sheep returned the correct number");
  equal(bank.getWheatCount(), bankjson.wheat, "wheat returned the correct number");
  equal(bank.getOreCount(), bankjson.ore, "ore returned the correct number");
  
});

test("Deck", function(){
  var deckjson = {
    "yearOfPlenty": 2,
    "monopoly": 2,
    "soldier": 10,
    "roadBuilding": 1,
    "monument": 4
  }
  
  var deck = new catan.models.Deck(deckjson);
  
  console.log(deck.devCards);
  equal(deck.devCards.yearOfPlenty, deckjson.yearOfPlenty, "yearOfPlenty initialized correctly");
  equal(deck.devCards.monopoly, deckjson.monopoly, "monopoly initialized correctly");
  equal(deck.devCards.soldier, deckjson.soldier, "soldier initialized correctly");
  equal(deck.devCards.roadBuilding, deckjson.roadBuilding, "roadBuilding initialized correctly");
  equal(deck.devCards.monument, deckjson.monument, "monument initialized correctly");
  
  equal(deck.getYearOfPlentyCount(), deckjson.yearOfPlenty, "yearOfPlenty() returned the correct number");
  equal(deck.getMonopolyCount(), deckjson.monopoly, "monopoly() returned the correct number");
  equal(deck.getSoldierCount(), deckjson.soldier, "soldier() returned the correct number");
  equal(deck.getRoadBuildingCount(), deckjson.roadBuilding, "roadBuilding() returned the correct number");
  equal(deck.getMonumentCount(), deckjson.monument, "monument() returned the correct number");
  
});


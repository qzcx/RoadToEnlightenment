var BAD_MOVE_BUT_SUCCESS = "CommandError: A syntatically correct command was an illegal move: class java.lang.ArrayIndexOutOfBoundsException";


test( "get model test", function() {
  ok( 1 == "1", "Passed!" );
});


test("catan.proxy.ClientProxy.getModel", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();

  proxy.getModel(function(err, data) {
    equal(null, err, "There should not be an error");
    notEqual(null, data, "The data should not be null");
    // Attrubtes
    notEqual(null, data.deck, "There is a deck");
    notEqual(null, data.map, "There is a map");
    notEqual(null, data.players, "There are players");
    notEqual(null, data.log, "There is a log");
    notEqual(null, data.chat, "There is a chat");
    notEqual(null, data.bank, "There is a bank");
    notEqual(null, data.turnTracker, "There is a turn tracker");
    notEqual(null, data.biggestArmy, "There is a biggestArmy");
    notEqual(null, data.longestRoad, "There is a longestRoad");
    notEqual(null, data.winner, "There is a winner");
    start();
  });
});


test("catan.proxy.ClientProxy.sendChat", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  proxy.sendChat(-1, "", function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.acceptTrade", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  proxy.acceptTrade(-1, true, function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.offerTrade", function() {
  stop();
  var template = {
    brick: 0,
    wood: 0,
    sheep: -9,
    wheat: -9,
    ore: -9
  };

  list = new catan.models.ResourceList(template);

  var proxy = new catan.proxy.ClientProxy();
  proxy.offerTrade(-1, -1, list, function(err) {
    //NOTE: Looks like another server bug with invalid params
    equal(null, err);
    start();
  });
});


test("catan.proxy.ClientProxy.maritimeTrade", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  proxy.maritimeTrade(-1, "Wood", "Brick", 2, function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.buildRoad", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  var location = new catan.models.map.HexLocation(-1, -1);
  proxy.buildRoad(-1, location, "SW", true, function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.discardCards", function() {
  stop();
  var template = {
    brick: 0,
    wood: 0,
    sheep: -9,
    wheat: -9,
    ore: -9
  };

  list = new catan.models.ResourceList(template);

  var proxy = new catan.proxy.ClientProxy();
  var location = new catan.models.map.HexLocation(-1, -1);
  proxy.discardCards(-1, list, function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.buildSettlement", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  var location = new catan.models.map.HexLocation(-1, -1);
  proxy.buildSettlement(-1, location, "SW", true, function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.buildCity", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  var location = new catan.models.map.HexLocation(-1, -1);
  proxy.buildCity(-1, location, "SW", true, function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.buyDevelopmentCard", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  proxy.buyDevelopmentCard(-4, function(err) {
    // Note: There is a bug with the server to accept any bad ID
    equal(null, err);
    start();
  });
});


test("catan.proxy.ClientProxy.playYearOfPlenty", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  proxy.playYearOfPlenty(-1, "Wood", "Brick", function(err) {
    // Note: There is a bug with the server to accept any bad ID
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.playRoadBuilding", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  var location1 = new catan.models.map.HexLocation(-1, -1);
  var location2 = new catan.models.map.HexLocation(-1, -1);
  proxy.playRoadBuilding(-1, location1, "SW", location2, "S", function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.playSoldier", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  var location = new catan.models.map.HexLocation(-1, -1);
  proxy.playSoldier(-1, -1, location, function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.robPlayer", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  var location = new catan.models.map.HexLocation(-1, -1);
  proxy.robPlayer(-1, -1, location, function(err) {
    // Note: There is a bug with the server to accept any bad ID
    equal(null, err);
    start();
  });
});


test("catan.proxy.ClientProxy.playMonopoly", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  proxy.playMonopoly(-1, "Brick", function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.playMonument", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  proxy.playMonument(-1, function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


test("catan.proxy.ClientProxy.rollNumber", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  proxy.rollNumber(-1, 10, function(err) {
    // Note: This will take an incorrect player ID
    equal(null, err);
    start();
  });
});


test("catan.proxy.ClientProxy.finishTurn", function() {
  stop();
  var proxy = new catan.proxy.ClientProxy();
  proxy.finishTurn(-1, function(err) {
    equal(BAD_MOVE_BUT_SUCCESS, err.responseText);
    start();
  });
});


var catan = catan || {};
catan.proxy = catan.proxy || {};

/**
  This module contains the proxy
  
  @module   catan.proxy
  @namespace catan.proxy
*/

catan.proxy.ClientProxy = (function() {

  /**
    The model class for ClientProxy 

    <pre>
    PRE: A string URL, ex: http://myserver/
    </pre>

    @class ClientProxy
    @constructor
      
    @param {String} url to the server
  */
  function ClientProxy(url) {
    this.url = url;
  }

  /**
    Get the model, the current
    <pre>
    POST: Caller always calls callback
    </pre>
    
    @param {function} callback The response callback
     
    @method getModel
    @return {function(err, data)} callback
  */
  ClientProxy.prototype.getModel = function(callback) {
    this.GET('/game/model', function(data) {
      callback(null, data);
    }, function(err) {
      callback(err, null);
    });
  };

  /**
    Sends a chat message to server
    <pre>
    PRE: A Valid player ID
    PRE: Message is any string, even empty
    PRE: Caller provides a callback
    POST: Caller always calls callback
    </pre>
    
    @param {integer} playerId The player who is broadcasting the chat
    @param {string} message The string that you would like to broadcast
    @param {function} callback The response callback
     
    @method sendChat
    @return {function(err)} callback
  */
  ClientProxy.prototype.sendChat = function(playerId, message, callback) {
    var template = {
      type: "sendChat",
      playerIndex: playerId,
      content: message
    };

    this.POST('/moves/sendChat', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Accept a trade or reject
    <pre>
    PRE: A Valid player ID
    PRE: A status of true or false indicating acceptance or rejection
    PRE: Caller provides a callback
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is responding to trade request
    @param {boolean} status The status: accept or reject the trade
    @param {function} callback The response callback
     
    @method acceptTrade
    @return {function(err)} callback
  */
  ClientProxy.prototype.acceptTrade = function(playerId, status, callback) {
    var template = {
      type: "acceptTrade",
      playerIndex: playerId,
      willAccept: status
    };

    this.POST('/moves/acceptTrade', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Offer a trade to another user
    <pre>
    PRE: A valid userId
    PRE: A valid otherUserId
    PRE: A valid offer, list of resource cards
    PRE: A valid request, list of resource cards
    PRE: Caller provides a callback
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is offering the trade request
    @param {integer} receiverId The OTHER player who will respond to the trade request
    @param {ResourceList} list Resouces that the player is requesting from the trade
    @param {function} callback The response callback
     
    @method acceptTrade
    @return {function(err)} callback
  */
  ClientProxy.prototype.offerTrade = function(playerId, receiverId, list, callback) {
    var template = {
      type: "offerTrade",
      playerIndex: playerId,
      offer: {
        brick: list.getBrickCount(),
        ore: list.getOreCount(),
        sheep: list.getSheepCount(),
        wheat: list.getWheatCount(),
        wood: list.getWoodCount()
      },
      receiver: receiverId
    };

    this.POST('/moves/offerTrade', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    <pre>
    PRE: The client has the cards he wants to trade at a port with
    POST: caller always calls callback
    </pre>
     
    @method maritimeTrade
    @param {integer} playerId The player ID of the current player
    @param {string} inputCardType card type the client wants to trade in
    @param {string} outputCardType card type the client will recieve
    @param {integer} ratio the ratio you're trading in, we don't care at this point what that is
    @param {function} callback The response callback
  */
  ClientProxy.prototype.maritimeTrade = function(playerId, inputCardType, outputCardType, ratio, callback) {
    var template =  {
      type: "maritimeTrade",
      playerIndex: playerId,
      ratio: ratio,
      inputResource: translateResource(inputCardType),
      outputResource: translateResource(outputCardType)
    };

    this.POST('/moves/maritimeTrade', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };
  /**
    @method translateResource
    The server has weird case sensitivity...
  */
  var translateResource = function(resource){
    var type = resource.toLowerCase();
    if(type == "wood")
      return "Wood";
    if(type == "brick")
      return "Brick";
    if(type == "sheep")
      return "Sheep";
    if(type == "wheat")
      return "Wheat";
    if(type == "ore")
      return "Ore";
    return undefined;
  }

  /**
    Discard a number of playing cards
    <pre>
    PRE: A Valid player ID
    PRE: A list of cards
    PRE: The caller provides a callback
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is discarding cards
    @param {ResourceList} list Resouces that the player is requesting from the trade
    @param {function} callback The response callback
     
    @method discardCards
    @return {function(err)} callback
  */
  ClientProxy.prototype.discardCards = function(playerId, list, callback) {
    var template = {
      type: "discardCards",
      playerIndex: playerId,
      discardedCards: {
        brick: list.getBrickCount(),
        ore: list.getOreCount(),
        sheep: list.getSheepCount(),
        wheat: list.getWheatCount(),
        wood: list.getWoodCount()
      }
    };

    this.POST('/moves/discardCards', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Build a road at a map Location
    <pre>
    PRE: A valid Player ID
    PRE: Any location on the map
    PRE: Any hex direction
    PRE: The caller provides a callback
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is building a road
    @param {HexLocation} location A map location object
    @param {string} direction The hex direction to pas to the server
    @param {boolean} free Should this cost the user anything (aka, is it their first turn?)
    @param {function} callback The response callback
     
    @method buildRoad
    @return {function(err)} callback
  */
  ClientProxy.prototype.buildRoad = function(playerId, location, direction, free, callback) {
    var template = {
      type: "buildRoad",
      playerIndex: playerId,
      roadLocation: {
        x: location.getX(),
        y: location.getY(),
        direction: direction
      },
      free: free
    };

    this.POST('/moves/buildRoad', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Build a settlement at a map Location
    <pre>
    PRE: A valid player ID
    PRE: Any location on the map
    PRE: The caller provides a callback
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is building a settlement
    @param {HexLocation} location A map location object
    @param {string} direction The hex direction to pas to the server
    @param {boolean} free Should this cost the user anything (aka, is it their first turn?)
    @param {function} callback The response callback
     
    @method buildSettlement
    @return {function(err)} callback
  */
  ClientProxy.prototype.buildSettlement = function(playerId, location, direction, free, callback) {
    var template = {
      type: "buildSettlement",
      playerIndex: playerId,
      vertexLocation: {
        x: location.getX(),
        y: location.getY(),
        direction: direction
      },
      free: free
    };

    this.POST('/moves/buildSettlement', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Build a city at a map Location
    <pre>
    PRE: A valid player ID
    PRE: Any location on the map
    PRE: The caller provides a callback
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is building a city
    @param {HexLocation} location A map location object
    @param {string} direction The hex direction to pas to the server
    @param {boolean} free Should this cost the user anything (aka, is it their first turn?)
    @param {function} callback The response callback
     
    @method buildCity
    @return {function(err)} callback
  */
  ClientProxy.prototype.buildCity = function(playerId, location, direction, free, callback) {
    var template = {
      type: "buildCity",
      playerIndex: playerId,
      vertexLocation: {
        x: location.getX(),
        y: location.getY(),
        direction: direction
      },
      free: free
    };

    this.POST('/moves/buildCity', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Buy a development card
    <pre>
    PRE: A valid player ID
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is buying a development card
    @param {function} callback The response callback
     
    @method buyDevelopmentCard
    @return {function(err)} callback
  */
  ClientProxy.prototype.buyDevelopmentCard = function(playerId, callback) {
    var template = {
      type: "buyDevCard",
      playerIndex: playerId
    };

    this.POST('/moves/buyDevCard', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Play the year of plenty card
    <pre>
    PRE: A valid player ID
    PRE: Valid Resource Card 1
    PRE: Valid Resource Card 2
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player using the year of plenty card
    @param {string} resource1 The first resource being used
    @param {string} resource2 The second resource being used
    @param {function} callback The response callback
     
    @method playYearOfPlenty
    @return {function(err)} callback
  */
  ClientProxy.prototype.playYearOfPlenty = function(playerId, resource1, resource2, callback) {
    var template = {
      type: "Year_of_Plenty",
      playerIndex: playerId,
      resource1: resource1,
      resource2: resource2
    };

    this.POST('/moves/Year_of_Plenty', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Play road building card
    <pre>
    PRE: A valid player ID
    PRE: Valid Location 1
    PRE: Valid Location 2
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player using the road building card
    @param {HexLocation} location1 The first location on which the player wants to build a road
    @param {string} direction1 The hex direction to pas to the server
    @param {HexLocation} location2 The second location on which the player wants to build a road
    @param {string} direction2 The hex direction to pas to the server
    @param {function} callback The response callback
     
    @method playRoadBuilding
    @return {function(err)} callback
  */
  ClientProxy.prototype.playRoadBuilding = function(playerId, location1, direction1, location2, direction2, callback) {
    var template = {
      type: "Road_Building",
      playerIndex: playerId,
      spot1: {
        x: location1.getX(),
        y: location1.getY(),
        direction: direction1,
      },
      spot2: {
        x: location2.getX(),
        y: location2.getY(),
        direction: direction2
      }
    };

    this.POST('/moves/Road_Building', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Play soldier card
    <pre>
    PRE: Valid player ID
    PRE: Valid victim ID
    PRE: Valid Location
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is using the soldier card
    @param {integer} victimId The victim who is getting owned by soldier card
    @param {HexLocation} location2 The second location on which the player wants to place a soldier
    @param {function} callback The response callback
     
    @method playSoldier
    @return {function(err)} callback
  */
  ClientProxy.prototype.playSoldier = function(playerId, victimId, location, callback) {
    var template = {
      type: "Soldier",
      playerIndex: playerId,
      victimIndex: victimId,
      location: {
        x: location.getX(),
        y: location.getY()
      }
    };

    this.POST('/moves/Soldier', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Rob player
    <pre>
    PRE: Valid player ID
    PRE: Valid victim ID
    PRE: Valid Location
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is using the soldier card
    @param {integer} victimId The victim who is getting owned by soldier card
    @param {HexLocation} location The location 
    @param {function} callback The response callback
     
    @method robPlayer
    @return {function(err)} callback
  */
  ClientProxy.prototype.robPlayer = function(playerId, victimId, location, callback) {
    var template = {
      type: "robPlayer",
      playerIndex: playerId,
      victimIndex: victimId,
      location: {
        x: location.getX(),
        y: location.getY()
      }
    };

    this.POST('/moves/robPlayer', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Play a Monopoly card
    <pre>
    PRE: Valid player ID
    PRE: Valid resource card
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player using the monopoly card
    @param {string} resource The resource to collect
    @param {function} callback The response callback
     
    @method playMonopoly
    @return {function(err)} callback
  */
  ClientProxy.prototype.playMonopoly = function(playerId, resource, callback) {
    var template = {
      type: "Monopoly",
      resource: resource,
      playerIndex: playerId
    };

    this.POST('/moves/Monopoly', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Play a Monument card
    <pre>
    PRE: Valid player ID
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is using the monopoly card
    @param {function} callback The response callback
     
    @method playMonument
    @return {function(err)} callback
  */
  ClientProxy.prototype.playMonument = function(playerId, callback) {
    var template = {
      type: "Monument",
      playerIndex: playerId
    };

    this.POST('/moves/Monument', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    At the start of a turn, tell the server the number you rolled.
    <pre>
    PRE: A valid player ID
    PRE: A number
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is finishing their turn
    @param {integer} number The number that the player rolled
    @param {function} callback The response callback
     
    @method rollNumber
    @return {function(err)} callback
  */
  ClientProxy.prototype.rollNumber = function(playerId, number, callback) {
    var template = {
      type: "rollNumber",
      playerIndex: playerId,
      number: number
    };

    this.POST('/moves/rollNumber', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    Tell the server that a turn is now finished.
    <pre>
    PRE: A valid player ID
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is finishing their turn
    @param {function} callback The response callback
     
    @method finishTurn
    @return {function(err)} callback
  */
  ClientProxy.prototype.finishTurn = function(playerId, callback) {
    var template = {
      type: "finishTurn",
      playerIndex: playerId
    };

    this.POST('/moves/finishTurn', template, function(data) {
      callback(null);
    }, function(err) {
      callback(err);
    });
  };

  /**
    A standardized GET request
    <pre>
    PRE: A valid data blob
    PRE: A valid success callback
    PRE: A valid error callback
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is finishing their turn
    @param {function} successCallback The successful response callback
    @param {function} errorCallback The error response callback
     
    @method GET
    @return {function(err)} callback
  */
  ClientProxy.prototype.GET = function(url, successCallback, errorCallback) {
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: successCallback,
      error: errorCallback
    });
  };

  /**
    A standardized POST request
    <pre>
    PRE: A valid data blob
    PRE: A valid success callback
    PRE: A valid error callback
    POST: Caller always calls callback
    </pre>

    @param {integer} playerId The player who is finishing their turn
    @param {function} successCallback The successful response callback
    @param {function} errorCallback The error response callback
     
    @method POST
    @return {function(err)} callback
  */
  ClientProxy.prototype.POST = function(url, data, successCallback, errorCallback) {
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(data),
      dataType: 'json',
      success: successCallback,
      error: errorCallback
    });
  };

  return ClientProxy;
})();
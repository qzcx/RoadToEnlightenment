//This guy is middle class
var samjson = {
"MAX_GAME_POINTS": 10,
"resources": {
 "brick": 14,
 "wood": 13,
 "sheep": 15,
 "wheat": 10,
 "ore": 8
},
"oldDevCards": {
 "yearOfPlenty": 1,
 "monopoly": 1,
 "soldier": 2,
 "roadBuilding": 1,
 "monument": 1
},
"newDevCards": {
 "yearOfPlenty": 0,
 "monopoly": 0,
 "soldier": 1,
 "roadBuilding": 1,
 "monument": 0
},
"roads": 8,
"cities": 2,
"settlements": 4,
"soldiers": 1,
"victoryPoints": 7,
"monuments": 0,
"longestRoad": true,
"largestArmy": false,
"playedDevCard": true,
"discarded": false,
"playerID": 0,
"orderNumber": 0,
"name": "Sam",
"color": "orange"
}
//this guy is very rich!
var joejson = {
 "MAX_GAME_POINTS": 99,
 "resources": {
   "brick": 99,
   "wood": 99,
   "sheep": 99,
   "wheat": 9,
   "ore": 99
 },
 "oldDevCards": {
   "yearOfPlenty": 99,
   "monopoly": 99,
   "soldier": 99,
   "roadBuilding": 99,
   "monument": 99
 },
 "newDevCards": {
   "yearOfPlenty": 99,
   "monopoly": 99,
   "soldier": 99,
   "roadBuilding": 99,
   "monument": 99
 },
 "roads": 99,
 "cities": 99,
 "settlements": 99,
 "soldiers": 99,
 "victoryPoints": 99,
 "monuments": 99,
 "longestRoad": true,
 "largestArmy": true,
 "playedDevCard": false,
 "discarded": true,
 "playerID": 0,
 "orderNumber": 0,
 "name": "Well-off Joe",
 "color": "red"
}
var resourcesjson = {
   "brick" : 5,
   "ore" : 6,
   "sheep" : 7,
   "wheat" : 8,
   "wood" : 9
};
//this guy is very poor
var johnjson = {
"MAX_GAME_POINTS": 0,
"resources": {
 "brick": 0,
 "wood": 0,
 "sheep": 0,
 "wheat": 0,
 "ore": 0
},
"oldDevCards": {
 "yearOfPlenty": 0,
 "monopoly": 0,
 "soldier": 0,
 "roadBuilding": 0,
 "monument": 0
},
"newDevCards": {
 "yearOfPlenty": 0,
 "monopoly": 0,
 "soldier": 0,
 "roadBuilding": 0,
 "monument": 0
},
"roads": 0,
"cities": 0,
"settlements": 0,
"soldiers": 0,
"victoryPoints": 0,
"monuments": 0,
"longestRoad": true,
"largestArmy": true,
"playedDevCard": false,
"discarded": true,
"playerID": 0,
"orderNumber": 0,
"name": "Poor John",
"color": "red"
}

test("Player Init", function(){

//  stop();// temporarily stop the test so we can wait for incoming json data
//   jQuery.getJSON("model.json", function(data){
//     start();


     // Initialization
     var sam = new catan.models.Player(samjson);

     equal(sam.cities, samjson.cities, "player.cities was initialized correctly");
     equal(sam.color, samjson.color, "player.color was initialized correctly");
     equal(sam.discarded, samjson.discarded, "player.discarded was initialized correctly");
     equal(sam.largestArmy, samjson.largestArmy, "player.largestArmy was initialized correctly");
     equal(sam.longestRoad, samjson.longestRoad, "player.longestRoad was initialized correctly");
     equal(sam.monuments, samjson.monuments, "player.monuments was initialized correctly");
     equal(sam.name, samjson.name, "player.name was initialized correctly");
     equal(sam.newDevCards, samjson.newDevCards, "player.newDevCards was initialized correctly");
     equal(sam.oldDevCards, samjson.oldDevCards, "player.oldDevCards was initialized correctly");
     equal(sam.orderNumber, samjson.orderNumber, "player.coorderNumberlor was initialized correctly");
     equal(sam.playedDevCard, samjson.playedDevCard, "player.playedDevCard was initialized correctly");
     equal(sam.playerID, samjson.playerID, "player.playerID was initialized correctly");
});
test("Player: Can Tests", function(){
     // Method Unit Testing
     var joe = new catan.models.Player(joejson);
     var john = new catan.models.Player(johnjson);
     var sam = new catan.models.Player(samjson);
     var someResources = new catan.models.ResourceList(resourcesjson);

     ok(joe.canAffordToBuyDevCard(), "canAffordToBuyDevelomentCard() returned true correctly");
     ok(!john.canAffordToBuyDevCard(), "canAffordToBuyDevelomentCard() returned false correctly");
     ok(joe.canAffordToBuyRoad(), "canAffordToBuyRoad() returned true correctly");
     ok(!john.canAffordToBuyRoad(), "canAffordToBuyRoad() returned false correctly");
     ok(joe.canAffordToBuySettlement(), "canAffordToBuySettlement() returned true correctly");
     ok(!john.canAffordToBuySettlement(), "canAffordToBuySettlement() returned false correctly");
     ok(joe.canAffordToBuyCity(), "canAffordToBuyCity() returned true correctly");
     ok(!john.canAffordToBuyCity(), "canAffordToBuyCity() returned false correctly");
     ok(joe.canAffordToOfferTrade(someResources), "canAffordToOfferTrade() returned true correctly");
     ok(!john.canAffordToOfferTrade(someResources), "canAffordToOfferTrade() returned false correctly");
     ok(joe.canAcceptTrade(someResources), "canAcceptTrade() returned true correctly");
     ok(john.canAcceptTrade(someResources), "canAcceptTrade() returned true correctly");
     ok(joe.hasMoreThan7Cards(), "hasMoreThan7Cards() returned true correctly");
     ok(!john.hasMoreThan7Cards(), "hasMoreThan7Cards() returned false correctly");
     ok(joe.canDiscardCards(someResources), "canDiscardCard() returned true correctly");
     ok(!john.canDiscardCards(someResources), "canDiscardCard() returned false correctly");
     ok(joe.hasXResources(someResources), "hasXResources() returned true correctly");
     ok(!john.hasXResources(someResources), "hasXResources() returned false correctly");
     ok(joe.canPlayYearOfPlenty(),"canPlayYearOfPlenty() return true correctly");
     ok(!sam.canPlayYearOfPlenty(),"canPlayYearOfPlenty() return false correctly");
     ok(!john.canPlayYearOfPlenty(),"canPlayYearOfPlenty() return false correctly -not enough resources");
     ok(joe.canPlayRoadBuilding(),"canPlayRoadBuilding() return true correctly");
     ok(!sam.canPlayRoadBuilding(),"canPlayRoadBuilding() return false correctly");
     ok(!john.canPlayRoadBuilding(),"canPlayRoadBuilding() return false correctly -not enough resources");
     ok(joe.canPlaySoldier(),"canPlaySoldier() return true correctly");
     ok(!sam.canPlaySoldier(),"canPlaySoldier() return false correctly");
     ok(!john.canPlaySoldier(),"canPlaySoldier() return false correctly -not enough resources");
     ok(joe.canPlayMonument(),"canPlayMonument() return true correctly");
     ok(!sam.canPlayMonument(),"canPlayMonument() return false correctly");
     ok(!john.canPlayMonument(),"canPlayMonument() return false correctly -not enough resources");
     ok(joe.canPlayMonopoly(),"canPlayMonopoly() return true correctly");
     ok(!sam.canPlayMonopoly(),"canPlayMonopoly() return false correctly");
     ok(!john.canPlayMonopoly(),"canPlayMonopoly() return false correctly -not enough resources");

 });

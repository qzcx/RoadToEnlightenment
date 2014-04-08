//This file is for testing the map class and the underlying classes.
var catan = catan || {};
catan.models = catan.models || {};
catan.models.map = catan.models.map || {};

test("Map.CanBuildSettlement",function(){
  if(catan.models)
    console.log("good");
  else
    console.log("bad");
  
  var map = new catan.models.map.Map(modelJson.map);
  var ports = map.getPorts();
  ok(ports.length == modelJson.map.ports.length, "port list size");
  var hexLoc = new catan.models.map.HexLocation(2,0);
  ok(map.canBuildSettlement(0, hexLoc, "NW", false),"true: not setup phase");
  ok(!map.canBuildSettlement(0, hexLoc, "W", false), 
      "false: too close to another settlement");
  ok(!map.canBuildSettlement(0, hexLoc, "E", false), 
      "false: no road nearby");
  ok(map.canBuildSettlement(0, hexLoc, "E", true), 
      "true: Setup phase");
  ok(!map.canBuildSettlement(0, hexLoc, "SW", false), 
      "false: Occupied");
  
  hexLoc = new catan.models.map.HexLocation(3,0);
  ok(!map.canBuildSettlement(0, hexLoc, "E", false), 
      "false: Ocean Vertex");
  
  hexLoc = new catan.models.map.HexLocation(4,0);
  ok(!map.canBuildSettlement(0, hexLoc, "E", false), 
      "false: Non-existent hex");
});

test("Map.canBuildCity",function(){
  var map = new catan.models.map.Map(modelJson.map);
  var hexLoc = new catan.models.map.HexLocation(1,1);
  ok(map.canBuildCity(0,hexLoc,"W"), "True");
  ok(!map.canBuildCity(0,hexLoc,"NW"), "False: no settlement");
  ok(!map.canBuildCity(0,hexLoc,"E"), "False: alr  var resources = catan.model.ResourceList(0,0,0,0,2)eady a city");
});

test("Map.canBuildRoad",function(){
  var map = new catan.models.map.Map(modelJson.map);
  var hexLoc = new catan.models.map.HexLocation(1,1);
  ok(map.canBuildRoad(0,hexLoc,"N",false), "True");
  ok(!map.canBuildRoad(0,hexLoc,"S",false), "Failure Test: no nearby road");
  ok(map.canBuildRoad(0,hexLoc,"S",true), "True: setup near settlement");
  var hexLoc = new catan.models.map.HexLocation(0,0);
  ok(!map.canBuildRoad(0,hexLoc,"N",true), "False: setup not near settlement");
  ok(!map.canBuildRoad(0,hexLoc,"SE",false), "False: only enemy road nearby");
  ok(!map.canBuildRoad(0,hexLoc,"S",false), "False: occupied");
});

test("Map.canPlayRoadBuilder", function(){
  var map = new catan.models.map.Map(modelJson.map);
  var hexLoc = new catan.models.map.HexLocation(0, 0);
  //same hex good attached to settlement
  ok(map.canPlayRoadBuilder(2, hexLoc, "SW", hexLoc, "NW"), "True: Attached to player 2's settlement on hex (0,0)");
  ok(map.canPlayRoadBuilder(2, hexLoc, "NW", hexLoc, "SW"), "True: Flipped - Attached to player 2's settlement on hex (0,0)");
  //same hex, occupied already
  ok(!map.canPlayRoadBuilder(2, hexLoc, "S", hexLoc, "SE"), "False: Already Occupied with a road");
  ok(!map.canPlayRoadBuilder(2, hexLoc, "SE", hexLoc, "S"), "False: Flipped - Already Occupied with a road");
  //same hex, not attached
  ok(!map.canPlayRoadBuilder(2, hexLoc, "N", hexLoc, "NW"), "False: Not Attached to road or settlement");
  //same hex, not adjacent edges
  ok(!map.canPlayRoadBuilder(2, hexLoc, "SW", hexLoc, "N"), "False: Not Attached to road or settlement");
  ok(map.canPlayRoadBuilder(2, hexLoc, "SW", hexLoc, "NE"), "True: seperated but attached");

  //different hex good
  var hexLoc2 = new catan.models.map.HexLocation(-1, 1);
  ok(map.canPlayRoadBuilder(2, hexLoc, "SW", hexLoc2, "N"), "True: Adjacent Hexes and Adjacent Edges, Attached to player 2 settlement");
  ok(map.canPlayRoadBuilder(2, hexLoc2, "N", hexLoc, "SW"), "True: Flipped - Adjacent Hexes and Adjacent Edges, Attached to player 2 settlement");

  //different direction adjacent hex
  hexLoc2 = new catan.models.map.HexLocation(-1, 0);
  ok(map.canPlayRoadBuilder(2, hexLoc, "SW", hexLoc2, "SE"), "True: Adjacent Hexes and Adjacent Edges, Attached to player 2 settlement");

  //adjacent hexes, not adjacent edges
  ok(!map.canPlayRoadBuilder(2, hexLoc, "SW", hexLoc2, "NW"), "False: Hexes are adjacent but Edges are not");

  //not adjacent hexes
  hexLoc2 = new catan.models.map.HexLocation(-1, 2);
  ok(!map.canPlayRoadBuilder(2, hexLoc, "SW", hexLoc2, "NW"), "False: Hexes are not adjacent.");
  //same hex good attached to road
  hexLoc = new catan.models.map.HexLocation(-1, 0);
  ok(map.canPlayRoadBuilder(1, hexLoc, "NE", hexLoc, "SE"), "True: Attached to player 1's road on (-1, 0)");
  ok(map.canPlayRoadBuilder(1, hexLoc, "SE", hexLoc, "NE"), "True: Flipped - Attached to player 1's road on (-1, 0)");
  //played on top of itself
  ok(!map.canPlayRoadBuilder(1, hexLoc, "NE", hexLoc, "NE"), "False: Overlapping");
  hexLoc2 = new catan.models.map.HexLocation(0, -1);
  ok(!map.canPlayRoadBuilder(1, hexLoc, "NE", hexLoc2, "SW"), "False: Overlapping");

});

test("Map.canMaritimeTrade",function(){
  var map = new catan.models.map.Map(modelJson.map);
  //what I'm doing here is initializing empty 
  //and then using the setResourceListItems function to init.
  var resources = new catan.models.ResourceList({
        "brick": 0,
        "wood": 0,
        "sheep": 0,
        "wheat": 2,
        "ore": 0
      });
  //resources.setResourceListItems(0,0,0,2,0);
  var test1 = map.canMaritimeTrade(0,2,"wheat");
  console.log(test1);
  ok(test1, "True: Wheat Trade");
  //resources.setResourceListItems(0,0,0,3,0);
  resources = new catan.models.ResourceList({
        "brick": 0,
        "wood": 0,
        "sheep": 0,
        "wheat": 3,
        "ore": 0
      });
  ok(!map.canMaritimeTrade(2,3,"wheat"), "False: no 3:1 port");
  //resources.setResourceListItems(0,0,0,0,2);
    var resources = new catan.models.ResourceList({
        "brick": 0,
        "wood": 0,
        "sheep": 0,
        "wheat": 0,
        "ore": 2
      });
  ok(!map.canMaritimeTrade(0,2,"wood"), "False: wrong resource");
  //resources.setResourceListItems(0,0,0,0,4);
    var resources = new catan.models.ResourceList({
        "brick": 0,
        "wood": 0,
        "sheep": 0,
        "wheat": 0,
        "ore": 4
      });
  ok(map.canMaritimeTrade(0,4), "True: 4:1");
});

test("Map.canPlaceRobber", function(){
  var map = new catan.models.map.Map(modelJson.map);
  var hexLoc = new catan.models.map.HexLocation(1,1);
  ok( map.canPlaceRobber(hexLoc) ,"Success");
  var hexLoc = new catan.models.map.HexLocation(1,-1);
  ok(!map.canPlaceRobber(hexLoc) , "Failure: Replace in same Hex");
  hexLoc = new catan.models.map.HexLocation(3,0);
  ok(!map.canPlaceRobber(hexLoc)  , "Failure: Ocean Hex");
  hexLoc = new catan.models.map.HexLocation(4,0);
  ok(!map.canPlaceRobber(hexLoc)  , "Failure: non-existent Hex");

});




test("clientModel catan.models.ClientModel", function(){
  
  var client = new catan.models.ClientModel(0, clientModelCanTestModel);
  var resourceList = catan.models.ResourceList(clientModelCanTestModel.players[0].resources);
  ok(client.canDiscardCards(resourceList), "canDiscardCards() return true correctly ");

  var client1 = new catan.models.ClientModel(1, clientModelCanTestModel);
  var resourceList1 = catan.models.ResourceList(clientModelCanTestModel.players[2].resources);
  ok(!client1.canDiscardCards(resourceList1), "canDiscardCards() return false correctly ");
    
  ok(client.isMyTurn(), "isMyturn() return true correctly");
  ok(!client1.isMyTurn(), "isMyturn() return false correctly");
  ok(!client.canRoll(), "canRoll() return false correctly");
  var newModel = clientModelCanTestModel;
  newModel.turnTracker.status = "rolling";
  var client2 = new catan.models.ClientModel(0, clientModelCanTestModel);
  ok(client2.canRoll(), "canRoll() return true correctly");
  
 });
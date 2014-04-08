define(["backbone"], function(Backbone) {

  var GameRouteModel = Backbone.Model.extend({
    idAttribute: 'url',

    url: function() {
      return this.get('url');
    }
  });

  var GameRouteCollection = Backbone.Collection.extend({
    model: GameRouteModel,
    url: "./app/api/skeleton.json"
  });

  var Game = Backbone.Model.extend({
    idAttribute: 'id'
  });

  var Games = Backbone.Collection.extend({
    url: '/games/list',
    model: Game
  });

  return {
    GameRouteModel: GameRouteModel,
    GameRouteCollection: GameRouteCollection,
    Game: Game,
    Games: Games
  };

});
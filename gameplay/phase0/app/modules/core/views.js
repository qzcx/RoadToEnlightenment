define(["backbone", "./models"], function(Backbone, models) {

  var AlertView = Backbone.View.extend({
    el: ".response-flash",
    
    initialize: function(status) {
      this.status = status.status || "alertSuccess";
      this.render();
    },

    render: function() {
      var template = _.template($("#"+this.status).html(), {});
      this.$el.html(template);
    }
  });


  var RouteFormView = Backbone.View.extend({
    el: ".route-form-container",

    initialize: function(model) {
      this.render();
    },

    events: {
      'submit .route-form' : 'sendRequest'
    },

    parseForm: function() {
      var output = "";

      // Editor
      var rawJson = $('.json-editor').val();
      if(rawJson !== undefined)  {
        output = rawJson;
      }
      // Form
      else {
        output = $('.route-form').serialize();
      }

      return output;
    },

    responseSuccess: function(resp) {
      var alert = new AlertView({status: "alertSuccess"});
      $('.response').val(JSON.stringify(resp, undefined, 2));
    },

    responseError: function(resp) {
      var alert = new AlertView({status: "alertError"});
      $('.response').val(JSON.stringify(resp, undefined, 2));
    },

    sendRequest: function(e) {
      e.preventDefault();
      var form = this.parseForm();

      $('.request').val(form);
      $('.response').val("");

      $.ajax({
        data: form,
        url: "http://localhost:8081" + this.model.get('url'),
        method: this.model.get('method'),
        success: this.responseSuccess,
        error: this.responseError
      });
    },

    render: function() {
      var templateName;
      if(this.model.get('template')) templateName = "#jsonEditor";
      else templateName = "#formGenerator";

      var template = _.template($(templateName).html(), {
        model: this.model.toJSON()
      });

      this.$el.html(template);
    },

    unrender: function() {
      //COMPLETELY UNBIND THE VIEW
      this.undelegateEvents();
      $(this.el).removeData().unbind();
    }

  });

  
  var UserManagementView = Backbone.View.extend({

    el: ".user-management-container",
    
    initialize: function() {
      this.collection = new models.Games();
      this.players = [];

      var that = this;
      this.collection.fetch().success(function() {
        that.render();
        that.changeUserSelect();
      }).error(function(err) {
        alert("Could not load Game API spec");
      });
    },

    events: {
      'change .game-selector' : 'changeUserSelect',
      'submit .user-form' : 'switchUserContext'
    },

    switchUserContext: function(e) {
      e.preventDefault();

      var user_params = {
        username: this.$el.find('.user-selector').val(),
        password: this.$el.find('.user-password').val()
      };

      $.ajax({
        data: user_params,
        url: '/user/login',
        method: 'POST',
        success: this.switchGame,
        error: function() {
          var alert = new AlertView({
            status: "alertError",
            el: '.user-response-flash'
          });
        }
      });

    },

    switchGame: function() {
      var game_params = {
        id: $('.game-selector').val(),
        color: "red"
      };

      $.ajax({
        data: game_params,
        url: '/games/join',
        method: 'POST',
        success: function() {
          var alert = new AlertView({
            status: "alertSuccess",
            el: '.user-response-flash'
          });
        },
        error: function() {
          var alert = new AlertView({
            status: "alertError",
            el: '.user-response-flash'
          });
        }
      });
    },

    changeUserSelect: function(e) {
      var id = $('.game-selector').val();
      var model = this.collection.get(id);

      this.players = model.get('players');
      this.swapUsers();
    },

    swapUsers: function() {
      // HACK
      var element = [];
      for(var i = 0; i < this.players.length; i++) {
        var name = this.players[i].name || "No Name";
        element.push("<option value='"+name+"'>" + name + "</option>");
      }
      $('.user-selector').html(element);
    },

    render: function() {
      var template = _.template($("#gameManagerForm").html(), {
        collection: this.collection.toJSON(),
        players: this.players
      });

      this.$el.html(template);
    },

  });


  var RouteSelectorView = Backbone.View.extend({
    
    initialize: function() {
      this.collection = new models.GameRouteCollection();

      var that = this;
      this.collection.fetch().success(function() {
        that.render();
      }).error(function(err) {
        alert("Could not load API spec");
      });
    },

    events: {
      'change .route-select-box' : 'changeForm'
    },

    changeForm: function() {
      var id = this.$el.find("select").val();
      var model = this.collection.get(id);

      // Ensure old view was removed and destroyed
      if(this.formView) this.formView.unrender();
      this.formView = new RouteFormView({model: model});
    },

    render: function() {
      var template = _.template($("#selectorTemplate").html(), {
        collection: this.collection.toJSON()
      });

      this.$el.html(template);
      this.changeForm();
    },

  });

  
  return {
    RouteFormView: RouteFormView,
    RouteSelectorView: RouteSelectorView,
    UserManagementView: UserManagementView
  };

});
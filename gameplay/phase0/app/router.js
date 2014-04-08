define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  var views = require("modules/core/views");

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      this.indexPage = new views.RouteSelectorView({ el: $(".route-select-container") });
      this.userManager = new views.UserManagementView();
    }
  });
});

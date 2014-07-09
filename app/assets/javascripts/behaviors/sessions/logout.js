// -------------------------------------------
//   Logout
// -------------------------------------------

Ui.Logout = Essential.Behavior.extend({
  events: {
    "click": "logout"
  },

  logout: function(e) {
    e.preventDefault();

    Ajax.delete({
      url: "/sessions",
      success: function() {
        window.location.reload();
      }
    });
  }
});

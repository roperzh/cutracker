// -------------------------------------------
//   Login Form
// -------------------------------------------

Ui.LoginForm = Essential.Behavior.extend({
  events: {
    "submit form": "loginUser"
  },

  loginUser: function(e) {
    e.preventDefault();

    var form = this.el.getElementsByTagName("form")[0],
      data = new FormData(form);

    Ajax.post({
      url: "/sessions",
      data: data,

      success: function(response) {
        /* Create an auxiliar element to parse the string with the content */
        var responseWrapper = document.createElement("div");

        /* Create a structure of valid elements from the response text */
        responseWrapper.innerHTML = response.responseText;
        dashboard = responseWrapper.getElementsByClassName("dashboard")[0];

        /* Let know to the rest of the application that the user is logged */
        this.emit({
          channel: "gate:open",
          data: {
            content: dashboard
          }
        });

        /* Refletct the state change on the browser bar */
        history.replaceState({}, "Dashboard", "dashboard");
      }.bind(this),

      error: function(response) {
        var errorField = this.el.getElementsByClassName("error-field")[0];

        /* Play the shake animation on error */
        this.el.classList.remove("animated", "shake");
        this.el.offsetWidth = this.el.offsetWidth;
        this.el.classList.add("animated", "shake");

        /* Set the response message as a hint for the user */
        errorField.innerHTML = response.responseText;
      }.bind(this)
    });
  }
});

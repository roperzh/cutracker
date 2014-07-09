// -------------------------------------------
//   Gate
// -------------------------------------------

Ui.Gate = Essential.Behavior.extend({
  channels: {
    "user:logged": "manageLogin"
  },

  manageLogin: function(e) {

    /* Select all the elements that need to be animated */
    var out = this.el.getElementsByClassName("gate-animation");

    document.body.appendChild(e.detail.content);

    for (var i = out.length - 1; i >= 0; i--) {
      out[i].classList.add("out");
    };

    Essential.loadBehaviors({
      application: Ui,
      context: e.detail.content
    });

    setTimeout(function() {
      this.el.remove();
    }.bind(this), 500);
  }
});

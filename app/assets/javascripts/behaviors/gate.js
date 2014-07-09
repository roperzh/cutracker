// -------------------------------------------
//   Gate
// -------------------------------------------

Ui.Gate = Essential.Behavior.extend({
  channels: {
    "gate:open": "openGate",
    "gate:close": "closeGate"
  },

  openGate: function(e) {
    document.body.appendChild(e.detail.content);

    this.animate();

    Essential.loadBehaviors({
      application: Ui,
      context: e.detail.content
    });

    setTimeout(function() {
      this.el.remove();
    }.bind(this), 500);
  },

  closeGate: function() {
    /* TODO: Animate the logout */
    window.location.reload();
  },

  animate: function() {
    var animatedElements = this.el.getElementsByClassName("gate-animation");

    for (var i = animatedElements.length - 1; i >= 0; i--) {
      animatedElements[i].classList.toggle("out");
    };
  }
});

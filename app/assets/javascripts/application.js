//= require starter
//= require_tree ./vendor
//= require_tree ./services
//= require_tree ./behaviors

Ui.Task = Essential.Behavior.extend({
  events: {
    "click .task-status": "setActive"
  },

  channels: {
    "status:changed": "setPaused"
  },

  setActive: function(e) {
    e.preventDefault();

    this.emit({
      channel: "status:changed",
      context: document
    });

    this.el.classList.add("active");
    this.el.classList.remove("paused");
  },

  setPaused: function(e) {
    this.el.classList.remove("active");
    this.el.classList.add("paused");
  }
});

Essential.start(Ui);

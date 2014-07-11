// -------------------------------------------
//   Task Behavior
// -------------------------------------------

Ui.Task = Essential.Behavior.extend({
  init: function() {
    this.timeElement = this.el.getElementsByClassName("time-spent")[0];
    this.chronometer = Ui.Chronometer.new(this.timeElement);
  },

  events: {
    "click .task-status": "toggleStatus",
  },

  channels: {
    "status:changed": "pause"
  },

  toggleStatus: function(e) {
    e.preventDefault();
    this.el.classList.contains("paused") ? this.run() : this.pause();
  },

  run: function() {
    this.emit({
      channel: "status:changed"
    });

    this.chronometer.run();
    this.el.classList.add("active");
    this.el.classList.remove("paused");
  },

  pause: function(e) {
    this.el.classList.remove("active");
    this.el.classList.add("paused");
    this.chronometer.pause();
  }
});

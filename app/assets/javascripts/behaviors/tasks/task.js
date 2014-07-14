// -------------------------------------------
//   Task Behavior
// -------------------------------------------

Ui.Task = Essential.Behavior.extend({
  init: function() {
    this.id = this.el.getAttribute("data-id");
    this.timeElement = this.el.getElementsByClassName("time-spent")[0];
    this.chronometer = Ui.Chronometer.new(this.timeElement);
    this.isActive = false;
  },

  events: {
    "click .task-status": "toggleStatus",
    "editable:changed": "saveAttribute"
  },

  channels: {
    "status:changed": "pause"
  },

  toggleStatus: function(e) {
    e.preventDefault();
    this.isActive ? this.pause() : this.run();
  },

  run: function() {
    this.emit({
      channel: "status:changed"
    });

    this.chronometer.run();
    this.el.classList.add("active");
    this.el.classList.remove("paused");
    this.isActive = true;
  },

  pause: function(e) {
    if(!this.isActive) return;
    this.el.classList.remove("active");
    this.el.classList.add("paused");
    this.chronometer.pause();
    this.isActive = false;
    this.save({
      duration: this.chronometer.duration()
    });
  },

  saveAttribute: function(e) {
    this.save(e.detail);
  },

  save: function(data) {
    Ajax.put({
      url: "tasks/" + this.id,
      data: {
        task: data
      },
      success: function(e) {
        console.log("success", e);
      },
      error: function(e) {
        console.log("error", e);
      }
    });
  }
});

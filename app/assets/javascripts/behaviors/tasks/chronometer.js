// -------------------------------------------
//   Chronometer
// -------------------------------------------

Ui.Chronometer = Essential.Behavior.extend({
  init: function() {
    /* Time must be in format HH:MM:SS */
    var currentTime = this.el.innerHTML.split(":");
    this.hours = parseInt(currentTime[0]);
    this.minutes = parseInt(currentTime[1]);
    this.seconds = parseInt(currentTime[2]);
  },

  /* Start the chronometer */
  run: function() {
    this.timer = setInterval(function() {
      this.seconds += 1;

      this.increaseCount("seconds", "minutes");
      this.increaseCount("minutes", "hours");

      this.el.innerHTML = Time.format(this.hours, this.minutes, this.seconds);
    }.bind(this), 1000);
  },

  /* Pause the chonometer */
  pause: function() {
    clearTimeout(this.timer);
  },

  increaseCount: function(preUnit, postUnit) {
    if(this[preUnit] === 60){
      this[preUnit] = 0;
      this[postUnit] += 1;
    }
  },

  duration: function() {
    return Time.format(this.hours, this.minutes, this.seconds);
  }
});

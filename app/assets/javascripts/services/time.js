// -------------------------------------------
//   Time utilities
// -------------------------------------------

Time = {
  format: function(hours, minutes, seconds) {
    return [
      this.parse(hours),
      this.parse(minutes),
      this.parse(seconds)
    ].join(":");
  },

  parse: function(units) {
    return units < 10 ? "0" + units : units;
  }
}

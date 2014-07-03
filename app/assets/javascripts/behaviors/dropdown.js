Ui.Dropdown = Essential.Behavior.extend({
  events: {
    "click .dropdown-toggle": "toggleDropdown"
  },

  toggleDropdown: function(e) {
    var items = this.el.getElementsByClassName("dropdown-items")[0];
    items.classList.toggle("open");
  }
});

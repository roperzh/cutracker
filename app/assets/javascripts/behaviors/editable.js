Ui.Editable = Essential.Behavior.extend({
  init: function() {
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.tabIndex = -1;
  },

  events: {
    "click": "enableEdit",
    "keyup": "exit"
  },

  enableEdit: function(e) {
    e.preventDefault();
    if (this.opened) return;

    /* Store the contents of the elements and clear it */
    this.input.value = this.content = this.el.innerHTML;
    this.el.innerHTML = "";

    /* Append an auxiliary input */
    this.el.appendChild(this.input);
    this.input.focus();

    this.opened = true;
    this.el.classList.add("editing");

    /* Cancel the edition when the input triggers the blur event */
    Essential.Core.mapEvents.call(this, { "blur input": "disableEdit" }, this.el);
  },

  disableEdit: function() {
    this.el.innerHTML = this.input.value;
    this.el.classList.remove("editing");
    this.opened = false;
  },

  exit: function(e) {
    switch (e.keyCode) {
      case 27:
        this.input.blur();
        this.el.innerHTML = this.content;
        break;
      case 13:
        this.input.blur();
        this.emit({
          channel: "editable:changed",
          data: {
            text: this.el.innerHTML
          }
        });
    }
  }
});

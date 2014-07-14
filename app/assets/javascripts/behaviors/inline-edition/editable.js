Ui.Editable = Essential.Behavior.extend({
  init: function() {
    var editableElement = this.el.getAttribute("data-element") || "input";
    this.name = this.el.getAttribute("data-name") || "text";
    this.content = this.el.innerHTML;
    this.template = Template.get("editable/" + editableElement);
    if(this.initialize) this.initialize();
  },

  events: {
    "click": "enableEdit",
    "keyup": "checkKey"
  },

  enableEdit: function(e) {
    e.preventDefault();
    if (this.opened) return;

    /* Store the contents of the elements and clear it */
    this.el.innerHTML = this.template(this.content);

    this.editable = this.el.getElementsByClassName("edit-input")[0];
    this.editable.focus();

    this.opened = true;
    this.el.classList.add("editing");

    /* Cancel the edition when the input triggers the blur event */
    Essential.Core.mapEvents.call(this, { "blur .edit-input": "disableEdit" }, this.el);
  },

  disableEdit: function() {
    this.el.innerHTML  = this.content = this.editable.value;
    this.el.classList.remove("editing");
    this.opened = false;
    this.alertChange();
    if (this.postEditHook) this.postEditHook();
  },

  checkKey: function(e) {
    switch (e.keyCode) {

      /* Disable edit */
      case 27:
        this.editable.blur();
        this.el.innerHTML = this.content;
        break;
    }
  },

  alertChange: function() {
    var data = {};
    data[this.name] = this.el.innerHTML;
    this.emit({
      channel: "editable:changed",
      data: data
    });
  }
});

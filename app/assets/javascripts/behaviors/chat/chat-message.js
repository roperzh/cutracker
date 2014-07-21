// -------------------------------------------
//   Chat Message
// -------------------------------------------

Ui.ChatMessage = Essential.Behavior.extend({
  init: function() {
    this.content = this.el.getElementsByClassName("message-content")[0];
    this.parseContent();
  },

  parseContent: function() {
    this.content.innerHTML = Markdown.parse(this.content.innerHTML.trim());
  }
});

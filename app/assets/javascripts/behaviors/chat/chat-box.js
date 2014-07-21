// -------------------------------------------
//   Chat box + input
// -------------------------------------------

Ui.ChatBox = Essential.Behavior.extend({
  init: function() {
    this.eb = new vertx.EventBus("/eventbus");
    this.messagesList = this.el.getElementsByClassName("messages-list")[0];
    this.template = Template.get("chat/message");
    this.user = SharedData.user;

    /* Bindings */
    this.eb.onopen = this.registerVertxHandler.bind(this);

    /* Actions */
    this.scrollToLastMessage();
  },

  events: {
    "keyup input": "checkForSend"
  },

  registerVertxHandler: function() {
    this.eb.registerHandler("chat", function(data) {
      this.messagesList.innerHTML += this.template({
        message: data.content,
        sender: data.user_name
      });

      this.scrollToLastMessage();
    }.bind(this));
  },

  checkForSend: function(e) {
    var input = e.target,
      message = input.value;

    if (!message) return;

    if (e.keyCode === 13) {
      this.sendMessage(message);
      input.value = "";
    }
  },

  sendMessage: function(message) {
    this.eb.publish("chat", {
      content: message,
      user_id: this.user.id,
      user_name: this.user.full_name
    });
  },

  scrollToLastMessage: function() {
    var lastMessage = this.el.querySelector(".message:last-child");
    lastMessage.scrollIntoView(true);
  },
});

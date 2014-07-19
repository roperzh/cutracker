// -------------------------------------------
//   Chat box + input
// -------------------------------------------

Ui.ChatBox = Essential.Behavior.extend({
  init: function() {
    this.eb = new vertx.EventBus("/eventbus");
    this.messagesList = this.el.getElementsByClassName("messages-list")[0];
    this.template = Template.get("chat/message");

    /* Bindings */
    this.eb.onopen = this.registerVertxHandler.bind(this);
  },

  events: {
    "keyup input" : "sendMessage"
  },

  registerVertxHandler: function() {
    this.eb.registerHandler("chat", function(data) {
      var parsedText = this.parseMessage(data.content);
      this.messagesList.innerHTML += this.template(parsedText);
      this.scrollToLastMessage();
    }.bind(this));
  },

  sendMessage: function(e) {
    var input = e.target,
      message = input.value;

    if(message === "") return;

    if(e.keyCode === 13) {
      this.eb.publish("chat", {
        content: message,
        user_id: SharedData.user_id
      });

      input.value = "";
    }
  },

  scrollToLastMessage: function() {
    var lastMessage = this.el.querySelector(".message:last-child");
    lastMessage.scrollIntoView(true);
  },

  parseMessage: function(text) {
    text = Markdown.parse(text);
    text = LinkParser.linkify(text);
    return text;
  }
});

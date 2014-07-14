Ui.MarkdownEditable = Ui.Editable.extend({
  initialize: function() {
    this.parseContent();
  },

  postEditHook: function() {
    this.parseContent();
  },

  parseContent: function() {
    this.el.innerHTML = Markdown.parse(this.el.innerHTML);
  }
});

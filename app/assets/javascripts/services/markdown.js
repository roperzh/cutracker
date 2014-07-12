Markdown = Proto.extend({
  constructor: function() {
    this.setMarkdownOptions();
  },

  setMarkdownOptions: function() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
    });
  },

  parse: function(text) {
    return marked(text);
  }
});

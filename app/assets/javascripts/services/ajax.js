// -------------------------------------------
//   Ajax Stuff
// -------------------------------------------

Ajax = {
  get: function(options) {
    options.method = "GET";
    this.request(options);
  },

  delete: function(options) {
    options.method = "DELETE";
    this.request(options);
  },

  post: function(options) {
    options.method = "POST";
    this.request(options);
  },

  request: function(options) {
    var request = new XMLHttpRequest();

    request.open(options.method, options.url);
    this.setCallbacks(request, options);
    request.send(options.data);
  },

  setCallbacks: function(request, options) {
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        options.success(request);
      } else {
        options.error(request);
      }
    };

    request.onerror = function() {
      options.error(request);
    };
  }
};

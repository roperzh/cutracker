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

    /* If the data isn't a FormData object, lets encode it */
    if(!options.data.toString().match("FormData")) {
      options.headers = options.headers || {};
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      options.data = formurlencoded.encode(options.data);
    }

    this.request(options);
  },

  request: function(options) {
    var request = new XMLHttpRequest();

    request.open(options.method, options.url);
    this.setHeaders(request, options.headers);
    this.setCallbacks(request, options);
    request.send(options.data);
  },

  setHeaders: function(request, headers) {
    for(var headerName in headers) {
      request.setRequestHeader(headerName, headers[headerName]);
    }
  },

  setCallbacks: function(request, options) {
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        options.success(request);task
      } else {
        options.error(request);
      }
    };

    request.onerror = function() {
      options.error(request);
    };
  }
};

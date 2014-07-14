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

  put: function(options) {
    options.method = "PUT";
    this.request(options);
  },

  request: function(options) {
    var request = new XMLHttpRequest();

    // Parse the request data on POST and PUT requests
    if(options.method === "PUT" || options.method === "POST") {
      options = this.prepareForPostOrPut(options);
    }

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
        options.success(request);
      } else {
        options.error(request);
      }
    };

    request.onerror = function() {
      options.error(request);
    };
  },

  prepareForPostOrPut: function(options) {
    /* If the data isn't a FormData object, lets encode it */
    if(!options.data.toString().match("FormData")) {
      options.headers = options.headers || {};
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      options.data = formurlencoded.encode(options.data);
    }

    return options;
  }
};

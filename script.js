
function AJAX(config) {

    //doublechek if the instance is AJAX, if not create a new instance with the given config;
    if(!(this instanceof AJAX)) {
        return new AJAX(config);
    }
    //xhr object required to send AJAX.
    this._xhr = new XMLHttpRequest();

    this._config = this._extendConfigOptions(config); // mix the default config with the provided config
    console.log(this._config.options);
    console.log("AJAX and XMLHTTP REQUEST object instance created!");
    console.log(this._extendConfigOptions(config));

    this._assignEvents();

    this._beforeSend();
};

AJAX.prototype._assignEvents = function() {
    console.log("Assigning events");
    this._xhr?.addEventListener('readystatechange', this._handleResponse.bind(this), false); //we need to use bind so that "this" is directed to correct object;
    this._xhr?.addEventListener('abort', this._handleError.bind(this), false);
    this._xhr?.addEventListener('error', this._handleError.bind(this), false);
    this._xhr?.addEventListener('timeout', this._handleError.bind(this), false);

};

AJAX.prototype._open = function() {
    console.log("OPEN xhr");

    this._xhr?.open(
        this._config.type,
        this._config.url,
        this._config.options.async,
        this._config.options.username,
        this._config.options.password,
        );

    this._xhr?.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    this._xhr.timeout = this._config.options.timeout;

};

AJAX.prototype._send = function(data) {
console.log("SEND xhr");
    this._xhr?.send(data);
}

AJAX.prototype._beforeSend = function() {

    var isDataProvided = Object.keys(this._config.data).length > 0, //check if we have some data provided 
    data = null;

    //check if we have POST or GET request;

    if(this._config.type.toUpperCase() === "POST" && isDataProvided) {
        data = this._serializeFormData(this._config.data);
    } else if (this._config.type.toUpperCase() === "GET" && isDataProvided) {

        this._config.url += "?" + this._serializeData(this._config.data);
    }
        console.log(this._config.url);

    this._open();
    this._assignUserHeaders();
    this._send(data);
}

AJAX.prototype._send = function(data) {
console.log("SEND xhr");
    this._xhr?.send(data);
}


AJAX.prototype._assignUserHeaders = function () {

    console.log("assigning headers!");
    //check if there are any headers in the object
    if(Object.keys(this._config.headers).length) { 
console.log(Object.keys(this._config.headers));
        for(var key in this._config.headers) {
            this._xhr?.setRequestHeader(key, this._config.headers[key]);
        }
    }

}

AJAX.prototype._handleResponse = function(e) {
    console.log("Handle response");

     if(this._xhr?.readyState === 4 && this._xhr.status >= 200 && this._xhr.status < 400) {
        console.log("Response received!");
        console.log(typeof this._config.success);
        //if there is a function success call this function with response and xhr;
        if(typeof this._config.success === 'function') {
            this._config.success(this._xhr.response, this._xhr);
        }
     } else if(this._xhr?.readyState === 4 && this._xhr.status >= 400) { //if there are errors 400> call handleError method;

        this._handleError();
    }

    if(this._xhr?.readyState > 0 ) {
        console.log(this._xhr?.readyState);
        console.log(this._xhr?.status);
    }
   
};

AJAX.prototype._handleError = function(e) {
    console.log("Handle Error");
    if(typeof this._config.failure === 'function') {
            this._config.failure(this._xhr);
        }
};

//we can just send the object from config. We need to adjust the data properly so it is ready to be sent to the server. 
AJAX.prototype._serializeFormData = function(data) {
    var serialized = new FormData(); //new object instance and append to it the given data.
    
    for (var key in data) {
        serialized.append(key,data[key]);
    }

    return serialized; // the data is ready to be sent to the server
};

//method to parse data for GET method in the url

AJAX.prototype._serializeData = function(data) {

    var serialized = '';

    for(var key in data) {
        serialized += key + "=" + encodeURIComponent(data[key]) + '&'; //there can't be any spaces so we have to use encodeURIComponent(data[key)
    }

    console.log(serialized.slice(0, serialized.length -1));

    return serialized.slice(0, serialized.length -1); //removie the last & sign
}

//mix default config with the provided config
AJAX.prototype._extendConfigOptions = function(config) {

    console.log("Extending Configuration options!");

    //make copy of the default config as the original will be overwritten. Make string from object and then parse(make object from string);
    var defaultConfig = JSON.parse(JSON.stringify(this._defaultConfig)); //JASON stringify will not include functions!

    for(var key in defaultConfig) { // iterate throu keys in the defaultConfig object
        if(key in config) { // if there is a key in Config and its value is different than the one in the Defaultconfig -> overwrite it;
            continue;
        }

        config[key] = defaultConfig[key];
    }

    console.log(config);
    return config;

}

// default config set up in case some of the options are not provided;
AJAX.prototype._defaultConfig = {
    type: "GET", 
    url: window.location.href,
    data: {},
    options: {
        async: true, 
        timeout: 0,
        username: null, 
        password: null,
    },

    headers: {},
}



//example of a configuration object
AJAX({
    type: "POST", //I want to send GET
    url: 'receive_data.php', // to this address
    data: { // with the following data
        firstName: 'Kris',
        lastName: 'Windsor Smith'
    },
    headers: { // and the necesarry headers
        'X-My-Header': '123#qwerty'
    },

    success: function(response, xhr) {
        // all what happens if there's success
        console.log("Success! The Status is: " + xhr.status);
        console.log(response);
    }, 

    failure: function(xhr) {
        //all what happens if there's failure
        console.log("Error occurred! The Status is: " + xhr.status);
        console.log(xhr);
    }
})
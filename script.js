
function AJAX(config) {

    //doublechek if the instance is AJAX, if not create a new instance with the given config;
    if(!(this instanceof AJAX)) {
        return new AJAX(config);
    }
    //xhr object required to send AJAX.
    this._xhr = new XMLHttpRequest();

    this._extendConfigOptions(config); // mix the default config with the provided config
    
    console.log("AJAX and XMLHTTP REQUEST object instance created!");
    console.log(this._extendConfigOptions(config));
};


//mix default config with the provided config
AJAX.prototype._extendConfigOptions = function(config) {

    console.log("Extending Configuration options!");

    //make copy of the default config as the original will be overwritten. Make string from object and then parse(make object from string);
    var defaultConfig = JSON.parse(JSON.stringify(this._defaultConfig)); //JASON stringify will not include functions!

    for(var key in defaultConfig) { // iterate throu keys in the defaultConfig object 
        if(key in config) {  // if there is a key in Defaultconfig and its value is different than the one in the given config -> overwrite it;
            defaultConfig[key] = config[key];
        }

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
    type: "GET", //I want to send GET
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
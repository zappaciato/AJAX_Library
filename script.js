
function AJAX(config) {

    //doublechek if the instance is AJAX, if not create a new instance with the given config;
    if(!(this instanceof AJAX)) {
        return new AJAX(config);
    }
    //xhr object required to send AJAX.
    this._xhr = new XMLHttpRequest();

    console.log("AJAX object instance created!");

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
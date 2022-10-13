

AJAX({
    type: "GET",
    url: 'receive_data.php', 
    data: {
        firstName: 'Kris',
        lastName: 'Windsor Smith'
    },
    headers: {
        'X-My-Header': '123#qwerty'
    },

    success: function(response, xhr) {
        console.log("Success! The Status is: " + xhr.status);
        console.log(response);
    }, 

    failure: function(xhr) {
        console.log("Error occurred! The Status is: " + xhr.status);
        console.log(xhr);
    }
})
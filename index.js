var http = require("http");
var restler = require('restler');
var twilio = require('twilio');
var config = require('./config');
var intersect = require('array-intersection');



var numberPairs = {
    "310": "8152809862",
    "306": "2246594934"
}

function requestPub(processNumbers){
        restler.get("http://campusdining.vanderbilt.edu/?action=cmi_yoir&request=orderqueue_ajax&location_id=752"
    ).on('success', function(result, response){
        //console.log(result);
        var orders = JSON.parse(result);
        var orderNumbers = [];

        for(var i=0; i<orders.length; i++){
            orderNumbers.push(orders[i]["order_id"]);
        }
        
        processNumbers(orderNumbers, handleMatchedNumbers);

    });

}

function checkNumbers(allNumbers, twilioNumbers){
    var searchNumbers = Object.keys(numberPairs);


    var foundOrderNumbers = intersect(allNumbers,searchNumbers);
    
    twilioNumbers( foundOrderNumbers);
}

/*
* Intersection of two arrays
*/


function textOrder(orderNumber){
    var client = new twilio(config.twilioId,config.auth);
    
    client.messages.create({
        body: 'Your order, #' + orderNumber+ ' is up!' ,
        to: numberPairs[orderNumber],  // Text this number
        from: config.phone // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
}


function handleMatchedNumbers(orderNumbers){

    for(var i=0; i<orderNumbers.length;i++){
        //textOrder(orderNumbers[i]);
        console.log(orderNumbers[i]);
    }
}

requestPub(checkNumbers);

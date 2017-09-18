var http = require("http");
var restler = require('restler');
var twilio = require('twilio');
var config = require('./config');
var intersect = require('array-intersection');
var firebase = require('firebase');


firebase.initializeApp(config.firebase);
var database = firebase.database();
var ref = database.ref('vals');

var numberPairs = {};

function errData(data) {
    console.log(data);
}

function updateDatabaseOrders() {

    ref.on('value', function(data) {
        numberPairs = data.val();
        //console.log(numberPairs);

    }, errData);
}


updateDatabaseOrders();


/*
 * Gets information from the pub on the orders that are up
 */
function requestPub(processNumbers) {
    console.log("hey");
    restler.get("http://campusdining.vanderbilt.edu/?action=cmi_yoir&request=orderqueue_ajax&location_id=752").on('success', function(result, response) {
        //console.log(result);
        var orders = JSON.parse(result);
        var orderNumbers = [];

        for (var i = 0; i < orders.length; i++) {
            orderNumbers.push(orders[i]["order_id"]);
        }

        processNumbers(orderNumbers, handleMatchedNumbers);

    });

}

/*
 * Checks all numbers that are part of the numbers that should be searched for
 */
function checkNumbers(allNumbers, handleMatchedNumbers) {
    var searchNumbers = Object.keys(numberPairs);


    var foundOrderNumbers = intersect(allNumbers, searchNumbers);

    handleMatchedNumbers(foundOrderNumbers);
}




function textOrder(orderNumber) {
    var client = new twilio(config.twilio.uid, config.twilio.auth);

    client.messages.create({
            body: 'Your order, #' + orderNumber + ' is up!',
            to: numberPairs[orderNumber], // Text this number
            from: config.twilio.phone // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
}


/*
 * Iterates through matched numbers to text them about their order
 */
function handleMatchedNumbers(orderNumbers) {

    for (var i = 0; i < orderNumbers.length; i++) {
        //textOrder(orderNumbers[i]);
        console.log(orderNumbers[i]);
      

        database.ref('vals/' + orderNumbers[i]).remove() // finished with order, get rid of it
            .then(function() {
                console.log("Remove succeeded.")
            })
    }
}

//requestPub(checkNumbers)
handleMatchedNumbers([201]);
//setInterval(requestPub(checkNumbers), 1500);
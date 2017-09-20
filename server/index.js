var http = require("http");
var restler = require('restler');
var twilio = require('twilio');
var intersect = require('array-intersection');
var firebase = require('firebase');

var config = require('./config');
var server = require('./server'); // user server(handlingMethod)






firebase.initializeApp(config.firebase);
var database = firebase.database();


var numberPairs = {};


function handleUserRequest(data){
    var databaseEntry = {}
    databaseEntry[data.order] = data.phone;
  
    var newPushRef = database.ref('vals').update(databaseEntry);
  

  updateDatabaseOrders(); // rerequesting is just a more surefire way to make sure things don't go badly
  return "Operation succeeded";
}
server(handleUserRequest);

function errData(data) {
    console.log(data);
}

function updateDatabaseOrders() {
    var userDataPairs = database.ref('vals');
    userDataPairs.on('value', function(data) {
        numberPairs = data.val();
        //console.log(numberPairs);

    }, errData);

    
}





/*
 * Gets information from the pub on the orders that are up
 */
function requestPub(processNumbers) {
   
    restler.get(config.pubUrl).on('success', function(result, response) {
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
   if(numberPairs==={}){
       return;
   } 
    
    var searchNumbers = Object.keys(numberPairs);


    var foundOrderNumbers = intersect(allNumbers, searchNumbers);

    handleMatchedNumbers(foundOrderNumbers);
}




function textOrder(orderNumber) {
    var client = new twilio(config.twilio.uid, config.twilio.auth);

    client.messages.create({
            body: 'Your order, #' + orderNumber + '. is up!',
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
        textOrder(orderNumbers[i]);
        //console.log(orderNumbers[i]);


        database.ref('vals/' + orderNumbers[i]).remove() // finished with order, get rid of it in database
            .then(function() {
                console.log("Remove succeeded.")
            })
    }
}

//requestPub(checkNumbers)
//handleMatchedNumbers([201]);
/*
updateDatabaseOrders();
requestPub(checkNumbers);
setInterval(function() {
    updateDatabaseOrders();
    console.log('database');
}, 300000);
*/

setInterval(function() {
    requestPub(checkNumbers);
    console.log('pub');;
}, 20000); // every 20 seconds, checkin with the pub

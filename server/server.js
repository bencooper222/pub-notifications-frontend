var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var config = require('./config');
var bcrypt = require('bcrypt');

var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({ extended: false })


var exports = {};

exports = function launchServer(dataHandler){
    app.post('/',urlParser, function(req, res){
        console.log('POST /');  
        console.log(req.body);
        
        
        bcrypt.compare(req.body.passcode, config.verification, function(err, verified) {
            // res == true
            if(verified){
                var userData = req.body;
                delete userData['passcode']; // no need to propogate this
                
                res.sendStatus(200);
                res.end(dataHandler(userData));
            }
            else{
                res.sendStatus(401); //unauthorized
            }
        });
       
         // handle query and return status message
        
          
        
        
    });
    
    app.listen(3000);
}


module.exports = exports;
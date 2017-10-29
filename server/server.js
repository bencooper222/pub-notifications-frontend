var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var config = require('./config');
var bcrypt = require('bcrypt');
var cors = require('cors');

var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({ extended: false })

app.use(cors({ origin: 'https://benc.io' }));

var exports = {};

exports = function launchServer(dataHandler){
    app.post('/',urlParser, function(req, res){
        //console.log('POST /');  
        //console.log(req.body);
        
        
        bcrypt.compare(req.body.passcode, config.verification, function(err, verified) {
            // res == true
            if(verified){
                var userData = req.body;
                delete userData['passcode']; // no need to propogate this
                
                dataHandler(userData).then(function(){
                    res.sendStatus(200);
                })
                
                //res.end();
            }
            else{
                res.sendStatus(401); //unauthorized
            }
        });
       
         // handle query and return status message
        
          
        
        
    });
    
    app.get('/', function (req, res) { // just for checking
        res.send('Hello World!')
      })
    app.listen(80);
}


module.exports = exports;
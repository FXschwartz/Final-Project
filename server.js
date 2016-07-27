 var express = require('express');
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 
 var app = express();
 app.use(express.static('./public'));
 app.use(bodyParser());
 
 mongoose.promise = global.Promise;
 mongoose.connect('mongodb://okcoders:okcoders@okcoders.co/preston');
 
 var port = process.env.PORT || 8080;
 app.listen(port, function () {
	 console.log('listening on http://localhost:8080');
 });
 
 
 
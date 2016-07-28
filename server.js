var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
 
 mongoose.connect('mongodb://okcoders:okcoders@okcoders.co/preston');
 mongoose.promise = Promise;
 
var app = express();
app.use(bodyParser());
app.use(express.static('./public'));

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('listening on http://localhost:8080');
});

var Contact = require('./models/contact');

app.get('/contacts', function(req, res){
    Contact.find().exec().then(function(contact){
        res.json(contact);
    });
});

app.post('/contacts', function(req, res){
    var contact = req.body;
    if(contact._id){
        console.log('finding contact id:' + contact._id);
        Contact.findOneAndUpdate({_id:contact._id}, contact).exec().then(function(){
            console.log('found contact id' + contact._id);
            res.json(true);
        });
    } else {
        console.log('creating new contact', req.body);
        var editContact = new Contact(req.body);
        editContact.save().then(function(){
			console.log('new contact created' + contact._id);
            res.json(true);
        });
    }; 
});

app.delete('/contacts/:id', function(req, res){
    var id = req.params.id;
    Contact.findOneAndRemove({_id:id}).exec().then(function(){
        res.json(true);
    });
});
 
 
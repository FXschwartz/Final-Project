 var mongoose = require('mongoose');
 
 var Contact = mongoose.model('contact', {
	 img: 			String,
	 firstName: 	String,
	 lastName:		String,
	 address:		String,
	 city:			String,
	 state:			String,
	 zip:			Number,
	 phone:			String,
	 email:			String,
	 notes:			String,
	 relationship:	String
 });
 
 module.exports = Contact;
	 
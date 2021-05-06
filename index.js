var express = require('express');  
var app = express();         

var bodyParser = require('body-parser');
app.use(bodyParser.json())             // important to enable json when using angular.js
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
//app.use(express.static(__dirname + '/public/index.html'));

var Contact = require('./modules/Contact.js');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/addContact', function(req, res) {
	
    var newContact = new Contact ({               
		name : req.body.name,
		email : req.body.email
	});

	newContact.save( function(err) { 
		if (err) {
		    res.status(500).send(err);
		}
		else {
			return res.redirect('/getContacts')
		}
   });   
});



app.get('/getContacts', function(req, res) {
	
    Contact.find( {}, function(err, tacts) {  
		if (err) {
		    res.send(err);
		}
		else if (!tacts) {
		    res.send("No contacts found");
		}
		else {   
			res.send(tacts);  // send all documents as an array of objects	
		}
    });    
});



app.get('/deleteContact', function(req, res) {   
	 var email = req.query.email;       
	 
	 Contact.findOneAndRemove({email: email}, function(err, tact) {  
		if (err) {
		    res.status(500).send(err);
		}
		else if (!tact) {
		    res.send('No contact with and email of  ' + email);
		}
		else {
			return res.redirect('/getContacts')
		  
		}
    });         
});


app.use(function (req, res) {
	res.status(404).send("Sorry, no such page!")
});

app.listen(3000, function () {
    console.log('App started on http://localhost:3000, press Ctrl-C to terminate.' );
});



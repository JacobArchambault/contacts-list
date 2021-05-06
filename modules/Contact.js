var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/allContacts');  

var contactSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('Contact', contactSchema);



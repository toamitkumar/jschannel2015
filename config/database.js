'use strict';

var Mongoose = require('mongoose'); 

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/jschannel';

Mongoose.connect(uristring);  
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));  
db.once('open', function callback() {  
	console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;  
exports.db = db;
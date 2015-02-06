'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
  * @module  User
  * @description contain the details of the attribute  
*/

var UserSchema = new Schema({
	
  email: { type: String, required: true, unique: true },
  name: { type: String}
  
});

var user = mongoose.model('user', UserSchema);

module.exports = {
  User : user
};
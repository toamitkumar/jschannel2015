'use strict';

var Joi = require('joi'),
		User = require('../models/user').User,
		Boom = require('boom');

exports.subscribe = {
	handler: function(request, reply) {
		var user = new User({email: request.payload.email, name: request.payload.email});
		user.save(function(err, user) {
      if (!err) {
        reply(user).created('/users/' + user._id); // HTTP 201
      } else {
 	      if (11000 === err.code || 11001 === err.code) {
          reply(Boom.forbidden("You have already subscribed!"));
        }
        else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
      }
	  });
	},
	validate: {
		payload: {
			email: Joi.string().email()
		}
	}
}

exports.unsubscribe = {
	handler: function(request, reply) {
		User.findOne({ 'email': request.query.email }, function(err, user) {
      if (!err && user) {
        user.remove();
        reply({ message: "User unsubscribed successfully"});
      } else if (!err) {
        // Couldn't find the object.
        reply(Boom.notFound());
      } else {
        console.log(err);
        reply(Boom.badRequest("Could not delete user"));
      }
	  });
	},
	validate: {
		query: {
			email: Joi.string().email()
		}
	}
}
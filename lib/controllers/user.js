'use strict';

var Joi = require('joi'),
  User = require('../models/user').User,
  Boom = require('boom'),
  https = require('https'),
  _ = require('lodash');

exports.subscribe = {
  handler: function (request, reply) {
    var user = new User({email: request.payload.email, name: request.payload.email});
    user.save(function (err, user) {
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
  handler: function (request, reply) {
    User.findOne({'email': request.query.email}, function (err, user) {
      if (!err && user) {
        user.remove();
        reply({message: "User unsubscribed successfully"});
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

exports.getAll = {
  handler: function (req, res) {
    var options = {
      host: 'www.townscript.com',
      path: '/api/registration/getRegisteredUsers?eventCode=jschannel2015',
      method : 'GET',
      headers: {
        'email': 'jsconference@gmail.com',
        'secret_key': '8c52a901-69cf-4260-8359-1328e9f6e2cf'
      }
    };

    var email = req.query.email;

    var giveBackFilteredData = function(rawData){
      var filteredEmails = _.filter(rawData,{userEmailId:email});
      res(filteredEmails);
    };

    var callback = function (response) {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        //console.log(str);
        giveBackFilteredData(JSON.parse(JSON.parse(str).data));
      });
    };

    https.request(options, callback).end();
  }
}
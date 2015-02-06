/* jslint node: true */
'use strict';

var Static = require('./static'),
		user = require('./lib/controllers/user');

// API Server Endpoints
exports.endpoints = [
	{ method: 'GET',  
		path: '/{params*}', 
		config: Static.get 
	},
	{
		method: 'POST',
		path: '/api/users/subscribe',
		config: user.subscribe
	},
	{
		method: 'GET',
		path: '/api/users/unsubscribe',
		config: user.unsubscribe
	}
];
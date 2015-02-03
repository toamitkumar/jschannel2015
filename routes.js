/* jslint node: true */
'use strict';

var Static = require('./static');

// API Server Endpoints
exports.endpoints = [
	{ method: 'GET',  
		path: '/{params*}', 
		config: Static.get 
	}
];
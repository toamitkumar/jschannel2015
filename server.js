/* jslint node: true */
'use strict';

var Hapi = require('hapi'),
	Routes = require('./routes');
    
var app = {};

var port = process.env.PORT || 5000;
var server = new Hapi.Server();
server.connection({ port: port, routes: {cors: true}});

server.route(Routes.endpoints);

server.start(function () {
  console.log('Server started ', server.info.uri);
});
function dbConnectionHandler() {
	var mongoose = require('mongoose'),
		config = require('../config/db');

	mongoose.Promise = require('bluebird');

	mongoose.connect(config.uri, config.opts);
	mongoose.set('debug', true);

	this.connection = mongoose.connection;

	mongoose.connection.on('connected', function() {
		console.log("DB connect");
		this.state = 'connected';
	});

	mongoose.connection.on('error', function() {
		console.log("DB disconnected(error)");
		this.state = 'disconnected';
	});

	mongoose.connection.on('disconnected', function() {
		console.log("DB disconnected");
		this.state = 'disconnected';
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			this.state = 'disconnected';
			process.exit(0);
		});
	});
}

module.exports = new dbConnectionHandler();
function dbConnectionHandler() {
	var mongoose = require('mongoose'),
		config = require('../config/db');

	mongoose.connect(config.uri, config.opts);
	mongoose.set('debug', true);

	this.connection = mongoose.connection;

	mongoose.connection.on('connected', function() {
		this.state = 'connected';
	});

	mongoose.connection.on('error', function() {
		this.state = 'disconnected';
	});

	mongoose.connection.on('disconnected', function() {
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
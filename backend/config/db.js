module.exports = {
	uri: 'mongodb://localhost/okr-app',
	opts: {
		server: { 
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}
};
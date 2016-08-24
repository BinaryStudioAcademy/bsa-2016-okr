module.exports = {
	// ---=== LOCAL DB ===---
	uri: 'mongodb://localhost/okr-app',
	opts: {
		server: { 
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}

	// ---=== REMOTE DB ===---
	// uri: 'mongodb://dbuser:111111@ds029565.mlab.com:29565/okr',
	// opts: {
	// 	server: {
	// 		socketOptions: {
	// 			keepAlive: 1,
	// 			connectTimeoutMS: 30000
	// 		}
	// 	}
	// }
};
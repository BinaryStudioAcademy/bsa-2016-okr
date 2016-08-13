var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');

var mocha = new Mocha({ 
	reporter: 'spec', 
	safe: -1, 
	useColors: true,
	timeout: 3000
});

mocha.addFile(path.join(__dirname, 'main.js'));

mocha.run(function(failures) {
    process.on('exit', function () {
        process.exit(failures);
    });
});
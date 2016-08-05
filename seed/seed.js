var seedObjectives = require('./seedObjectives');
var util = require('util');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/');

var items = seedObjectives();

items.users.forEach(u => u.save((err, data) => console.log(`data ${util.inspect(data)}`)));
items.objectives.forEach(o => o.save((err, data) => console.log(`data ${util.inspect(data)}`)));


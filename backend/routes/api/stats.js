const router = require('express').Router();
var mongo = require('mongodb');
const UserObjectives = require('../../schemas/userObjective');
const GetStats = require('../../repositories/stats');

router.get('/users', (req, res, next) => {
    var sort = req.query.sort === "desc" ? 1 : -1;
    var nLimit = Number(req.query.limit);
    var limit = nLimit ? nLimit : 5;
    GetStats.getUsers(sort, limit, (data) => res.send(data));
});

router.get('/users/:id', (req, res, next) => {
    var userId = new mongo.ObjectID(req.params.id);
    GetStats.getUserById(userId, (err, data) => res.send(data));
});

router.get('/progress', (req, res, next) => {
    GetStats.getProgress(data => res.send({ progress: data[0].progress }));
});

router.get('/categories', (req, res, next) => {
    GetStats.getCategories(data => res.send(data));
});

router.get('/keyresults', (req, res, next) => {
    GetStats.getKeyResults(data => res.send(data))
});

module.exports = router;
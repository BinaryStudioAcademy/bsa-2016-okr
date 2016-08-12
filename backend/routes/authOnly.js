module.exports = function(req, res, next) {
	return req.session._id ? next() : res.unauthorized();
}
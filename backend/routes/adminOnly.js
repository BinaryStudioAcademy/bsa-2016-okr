module.exports = function(req, res, next) {
	return req.session.isAdmin ? next() : res.forbidden();
}

const checkHasLogin = (req, res, next) => {
	req.query['name'] = req.query['name'] || req.body['name'];

	if (req.query['name']) {
		return next();
	}

	return res
		.status(403)
		.json({
			message: 'login not specified',
		});
};

module.exports = checkHasLogin;

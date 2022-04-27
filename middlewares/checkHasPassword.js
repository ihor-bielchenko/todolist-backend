
const checkHasPassword = (req, res, next) => {
	req.query['password'] = req.query['password'] || req.body['password'];

	if (req.query['password']) {
		return next();
	}

	return res
		.status(403)
		.json({
			message: 'password not specified',
		});
};

module.exports = checkHasPassword;

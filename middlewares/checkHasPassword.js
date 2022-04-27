
const checkHasPassword = (req, res, next) => {
	if (req.body['password']
		|| req.query['password']) {
		return next();
	}

	return res
		.status(403)
		.json({
			message: 'password not specified',
		});
};

module.exports = checkHasPassword;

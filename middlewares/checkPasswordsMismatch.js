
const checkPasswordsMismatch = (req, res, next) => {
	if (req.body['password'] === req.body['confirm_password']) {
		return next();
	}

	return res
		.status(403)
		.json({
			message: 'password mismatch',
		});
};

module.exports = checkPasswordsMismatch;

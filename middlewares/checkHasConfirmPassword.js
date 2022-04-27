
const checkHasConfirmPassword = (req, res, next) => {
	if (req.body['confirm_password']) {
		return next();
	}
	return res
		.status(403)
		.json({
			message: 'confirm password not specified'
		});
};

module.exports = checkHasConfirmPassword;

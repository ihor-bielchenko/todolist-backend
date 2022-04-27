const utilsCheckEmail = require('../utils/checkEmail.js')

const taskDataValidate = (req, res, next) => {
	if (!req.body['name']
		|| !req.body['email']
		|| !req.body['text']) {
		return res
			.status(500)
			.json({
				message: 'required parameters not specified',
			});
	}

	if (!utilsCheckEmail(req.body['email'])) {
		return res
			.status(500)
			.json({
				message: 'error in email',
			});
	}

	return next();
};

module.exports = taskDataValidate;

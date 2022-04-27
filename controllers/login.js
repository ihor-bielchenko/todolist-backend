const serviceUser = require('../services/user.js');

/**
 * 
 */
const login = async (req, res) => {
	try {
		const data = await serviceUser.login({
			...req.body,
			...req.query, 
		});

		return res.json({
			message: 'successfully found user '+ (req.body['email'] ?? req.query['email']),
			data,
		});
	}
	catch (err) {
		return res
			.status(500)
			.json({
				message: err.message
			});
	}
	return res.json({
		message: 'unknown error',
	});
};

module.exports = login;

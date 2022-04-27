const serviceUser = require('../services/user.js');

const refresh = async (req, res) => {
	try {
		const data = await serviceUser.refresh(req.query.authName);

		return res.json({
			message: 'successfully refreshed tokens',
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

module.exports = refresh;

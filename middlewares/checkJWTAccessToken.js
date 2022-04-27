const serviceUser = require('../services/user.js');

const checkJWTAccessToken = (req, res, next) => {
	const split = req.accessToken.split('.');
	const payload = JSON.parse(Buffer.from(split[1], 'base64').toString());

	if (!serviceUser.checkToken(req.accessToken, process.env.JWT_SECRET_ACCESS_KEY, { 
		...payload, 
		exp: process.env.JWT_ACCESS_TIMEOUT, 
	})) {
		return res
			.status(401)
			.json(result.output());
	}

	if ((Date.now() - Number(process.env.JWT_ACCESS_TIMEOUT)) > Number(payload.iat)) {
		result.setMessage('access_token is old');
		return res
			.status(401)
			.json({
				message: 'access_token is not valid',
			});
	}
	return next();
};

module.exports = checkJWTAccessToken;

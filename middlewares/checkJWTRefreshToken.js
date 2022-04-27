const serviceUser = require('../services/user.js');

const checkJWTRefreshToken = (req, res, next) => {
	const split = req.refreshToken.split('.');
	const payload = JSON.parse(Buffer.from(split[1], 'base64').toString());
	
	if (!serviceUser.checkToken(req.refreshToken, process.env.JWT_SECRET_REFRESH_KEY, { 
		...payload, 
		exp: process.env.JWT_REFRESH_TIMEOUT, 
	})) {
		return res
			.status(401)
			.json({
				message: 'refresh_token is not valid',
			});
	}

	if ((Date.now() - Number(process.env.JWT_REFRESH_TIMEOUT)) > Number(payload.iat)) {
		result.setMessage('refresh_token is old');
		return res
			.status(401)
			.json({
				message: 'refresh_token is not valid',
			});
	}
	req.body['email'] = payload.email;
	return next();
};

module.exports = checkJWTRefreshToken;

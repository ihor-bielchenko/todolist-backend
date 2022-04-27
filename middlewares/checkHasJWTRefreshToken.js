
const _defineRefreshToken = (req) => {
	return req.headers['refresh_token'] 
		?? req.query['refresh_token'] 
		?? req.body['refresh_token'];
};

const checkHasJWTRefreshToken = (req, res, next) => {
	const refreshToken = _defineRefreshToken(req);

	if (refreshToken) {
		req['refreshToken'] = refreshToken;

		return next();
	}
	return res
		.status(401)
		.json({
			message: 'refresh_token is empty',
		});
};

module.exports = checkHasJWTRefreshToken;

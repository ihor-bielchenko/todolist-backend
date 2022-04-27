
const _splitAuthorizationString = (header) => {
	const split = header.split('Bearer ');

	return split[1] ?? header;
};

const _defineAccessToken = (req) => {
	return req.headers['authorization']
		? _splitAuthorizationString(req.headers['authorization'])
		: (req.query['access_token'] ?? req.body['access_token']);
};

const checkHasJWTAccessToken = (req, res, next) => {
	const accessToken = _defineAccessToken(req);

	if (accessToken) {
		req['accessToken'] = accessToken;

		return next();
	}
	return res
		.status(401)
		.json({
			message: 'access_token is empty',
		});
};

module.exports = checkHasJWTAccessToken;

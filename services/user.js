const cryptoJs = require('crypto-js');
const bcrypt = require('bcrypt');
const repositoryUser = require('../repositories/user.js');

const _encryptPassword = async (realPassword = '') => {
	return await bcrypt.hash(realPassword, 10);
};

const _checkPassword = async (realPassword = '', bcryptHash = '') => {
	return await bcrypt.compare(realPassword, bcryptHash);
}

const _generateTokens = (user) => {
	const iat = Date.now();

	return {
		user: {
			name: user.dataValues.name,
		},
		access_token: _generateAccessToken(user, iat, process.env.JWT_ACCESS_TIMEOUT),
		refresh_token: _generateRefreshToken(user, iat, process.env.JWT_REFRESH_TIMEOUT),
	};
};

const _generateAccessToken = (user, iat, exp = process.env.JWT_ACCESS_TIMEOUT) => {
	const publicString = `${_createHeader()}.${_createPayload({
		exp,
		id: user.dataValues.id,
		name: user.dataValues.name,
		iat,
	})}`;

	return `${publicString}.${_createSignature(publicString.trim(), process.env.JWT_SECRET_ACCESS_KEY)}`;
};

const _generateRefreshToken = (user, iat, exp = process.env.JWT_REFRESH_TIMEOUT) => {
	const publicString = `${_createHeader()}.${_createPayload({
		exp,
		id: user.dataValues.id,
		name: user.dataValues.name,
		iat,
	})}`;

	return `${publicString}.${_createSignature(publicString.trim(), process.env.JWT_SECRET_REFRESH_KEY)}`;
};

const _createHeader = () => {
	return Buffer
		.from(JSON.stringify({
			alg: 'HS256', 
			typ: 'JWT',
		}))
		.toString('base64');
};

const _createPayload = (data) => {
	return Buffer
		.from(JSON.stringify(data))
		.toString('base64');
};

const _createSignature = (publicString, secretKey) => {
	return cryptoJs.HmacSHA256(publicString, secretKey);
};

const checkToken = (token = '', key = '', payload = {}) => {
	const publicString = `${_createHeader()}.${_createPayload(payload)}`;
	const recoveredToken = `${publicString}.${_createSignature(publicString.trim(), key)}`;

	return token === recoveredToken;
};

const login = async function (name, password) {
	const user = await repositoryUser.getOne({ where: { name } });

	if (await _checkPassword(password, user.dataValues.password)) {
		return _generateTokens(user);
	}
	throw new Error('Incorrect password');
};

const refresh = async function (name) {
	const user = await repositoryUser.getOne({ where: { name } });

	if (user) {
		const {
			access_token,
			refresh_token,
		} = _generateTokens(user);

		return {
			access_token,
			refresh_token,
		};
	}
	throw new errors.CheckPassword();
};

module.exports = ({
	checkToken,
	login,
	refresh,
});
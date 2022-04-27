const cryptoJs = require('crypto-js');
const bcrypt = require('bcrypt');
const repositoryUser = require('../repositories/user.js');

/**
 * @param {string} realPassword
 * @return {string}
 */
const _encryptPassword = async (realPassword = '') => {
	try {
		return await bcrypt.hash(realPassword, 10);
	}
	catch (err) {
		throw new Error('service user _encryptPassword');
	}
};

/**
 * @param {string} realPassword
 * @param {string} bcryptHash
 * @return {string}
 */
const _checkPassword = async (realPassword = '', bcryptHash = '') => {
	try {
		return await bcrypt.compare(realPassword, bcryptHash);
	}
	catch (err) {
		throw new Error('service user _checkPassword');
	}
}

/**
 * @param {object} user
 * @return {object}
 */
const _generateTokens = (user) => {
	const iat = Date.now();

	return {
		user: user.dataValues,
		access_token: _generateAccessToken(user, iat, process.env.JWT_ACCESS_TIMEOUT),
		refresh_token: _generateRefreshToken(user, iat, process.env.JWT_REFRESH_TIMEOUT),
	};
};

/**
 * @param {object} user
 * @param {number} exp
 * @return {string}
 */
const _generateAccessToken = (user, iat, exp = process.env.JWT_ACCESS_TIMEOUT) => {
	const publicString = `${_createHeader()}.${_createPayload({
		exp,
		id: user.dataValues.id,
		email: user.dataValues.email,
		name: user.dataValues.name,
		iat,
	})}`;

	return `${publicString}.${_createSignature(publicString.trim(), process.env.JWT_SECRET_ACCESS_KEY)}`;
};

/**
 * @param {object} user
 * @param {number} exp
 * @return {string}
 */
const _generateRefreshToken = (user, iat, exp = process.env.JWT_REFRESH_TIMEOUT) => {
	const publicString = `${_createHeader()}.${_createPayload({
		exp,
		id: user.dataValues.id,
		email: user.dataValues.email,
		name: user.dataValues.name,
		iat,
	})}`;

	return `${publicString}.${_createSignature(publicString.trim(), process.env.JWT_SECRET_REFRESH_KEY)}`;
};

/**
 * @return {string}
 */
const _createHeader = () => {
	return Buffer
		.from(JSON.stringify({
			alg: 'HS256', 
			typ: 'JWT',
		}))
		.toString('base64');
};

/**
 * @param {object} data
 * @return {string}
 */
const _createPayload = (data) => {
	return Buffer
		.from(JSON.stringify(data))
		.toString('base64');
};

/**
 * @param {string} publicString
 * @param {string} secretKey
 * @return {string}
 */
const _createSignature = (publicString, secretKey) => {
	return cryptoJs.HmacSHA256(publicString, secretKey);
};

/**
 * @param {string} token
 * @param {string} key
 * @param {object} payload
 * @return {boolean}
 */
const checkToken = (token = '', key = '', payload = {}) => {
	const publicString = `${_createHeader()}.${_createPayload(payload)}`;
	const recoveredToken = `${publicString}.${_createSignature(publicString.trim(), key)}`;

	return token === recoveredToken;
};

/**
 * @param {object} props
 * @reutrn {object}
 */
const login = async function ({ email, password }) {
	const user = await repositoryUser.getOne({ email });

	if (await _checkPassword(password, user.dataValues.password)) {
		return _generateTokens(user);
	}
	throw new Error('service user login');
};

module.exports = ({
	checkToken,
	login,
});
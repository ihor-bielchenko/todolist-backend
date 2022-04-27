
const checkEmail = (value) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value));

module.exports = checkEmail;

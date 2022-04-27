const repository = require('./index.js');
const models = require('../models');

module.exports = ({
    ...repository(models.User),
});

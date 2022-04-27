const repository = require('./index.js');
const models = require('../models');

const paginate = (Model = models.Task) => async function (page, limit, props = {}) {
	try {
		const offset = (page > 0)
			? (page * limit)
			: 0;

		return await Model.findAndCountAll({ 
			attributes: [ 'id', 'name', 'email', 'text' ],
			offset,
			limit,
			include: [{
				model: models.Status,
				as: 'statuses',
			}],
			...props,
		});
	}
	catch (err) {
		throw new Error('repository paginate');
	}
};

const update = (Model = models.Task) => async function (id, props = {}) {
	try {
		const modelItem = await Model.findOne({
			attributes: [ 'id', 'name', 'email', 'text' ],
			where: {
				id,
			},
		});

		modelItem.update(props);
		return modelItem;
	}
	catch (err) {
		throw new Error('repository update');
	}
};

const remove = (Model = models.Task) => async function (id) {
	try {
		const modelItem = await Model.findOne({
			attributes: [ 'id' ],
			where: {
				id,
			},
		});

		modelItem.destroy();
		return true;
	}
	catch (err) {
		throw new Error('repository remove');
	}
};

module.exports = ({
	...repository(models.Task),
	paginate: paginate(),
	update: update(),
	remove: remove(),
});

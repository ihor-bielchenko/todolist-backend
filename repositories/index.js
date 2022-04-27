
const getOne = (Model) => async function (props = {}) {
	const modelItem = await Model.findOne({ ...props });

	if (!modelItem) {
		throw new Error('model not found');
	}
	return modelItem;
};

const getMany = (Model) => async function (props = {}) {
	return await Model.findAll({ ...props });
};

const paginate = (Model) => async function (page, limit, props = {}) {
	const offset = (page > 0)
		? (page * limit)
		: 0;

	return await Model.findAndCountAll({ 
		offset,
		limit,
		...props,
	});
};

const create = (Model) => async function (props) {
	return await Model.create({ ...props });
};

const update = (Model) => async function (id, props = {}) {
	const modelItem = await Model.findOne({
		where: {
			id,
		},
	});

	modelItem.update(props);
	return modelItem;
};

const remove = (Model) => async function (id) {
	const modelItem = await Model.findOne({
		where: {
			id,
		},
	});

	modelItem.destroy();
	return true;
};

const repository = (model) => {
	return ({
		getOne: getOne(model),
		getMany: getMany(model),
		paginate: paginate(model),
		create: create(model),
		update: update(model),
		remove: remove(model),
	});
};

module.exports = repository;

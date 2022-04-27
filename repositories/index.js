
const getOne = (Model) => async function (props = {}) {
	const modelItem = await Model.findOne({ ...props });

	if (!modelItem) {
		throw new Error('repository getOne');
	}
	return modelItem;
};

const getMany = (Model) => async function (props = {}) {
	try {
		return await Model.findAll({ ...props });
	}
	catch (err) {
		throw new Error('repository getMany');
	}
};

const paginate = (Model) => async function (page, limit, props = {}) {
	try {
		const offset = (page > 0)
			? (page * limit)
			: 0;

		return await Model.findAndCountAll({ 
			offset,
			limit,
			...props,
		});
	}
	catch (err) {
		throw new Error('repository paginate');
	}
};

const create = (Model) => async function (props) {
	try {
		return await Model.create({ ...props });
	}
	catch (err) {
		throw new Error('repository create');
	}
};

const update = (Model) => async function (id, props = {}) {
	try {
		const modelItem = await Model.findOne({
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

const remove = (Model) => async function (id) {
	try {
		const modelItem = await Model.findOne({
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

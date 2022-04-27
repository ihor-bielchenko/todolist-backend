const repositoryTask = require('../repositories/task.js');

const list = async (page, limit, sort = {}) => {
	const order = [];

	Object
		.keys(sort)
		.forEach((columnName) => {
			order.push([ 
				columnName, 
				(sort[columnName] === 0)
					? 'ASC'
					: 'DESC', 
				]);
		});
	return await repositoryTask.paginate(page, limit, { order });
};

const create = async ({ name, email, text }) => {
	return await repositoryTask.create({
		name,
		email, 
		text,
		statusId: 1,
	});
};

const update = async (taskId, { name, email, text }) => {
	return await repositoryTask.update(taskId, {
		name,
		email, 
		text,
	});
};

const status = async (taskId, statusId) => {
	return await repositoryTask.update(taskId, {
		statusId,
	});
};

const remove = async (taskId) => {
	return await repositoryTask.remove(taskId);
};

module.exports = {
	list,
	create,
	update,
	status,
	remove,
};

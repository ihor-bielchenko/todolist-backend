const serviceTask = require('../services/task.js');

/**
 * 
 */
const taskList = async (req, res) => {
	const {
		page,
		limit,
		sort,
	} = req.query;

	try {
		const data = await serviceTask.list(Number(page ?? 0), Number(limit ?? 10), sort);

		return res.json({
			message: 'successful get list of tasks',
			data,
		});
	}
	catch (err) {
		return res
			.status(500)
			.json({
				message: err.message
			});
	}

	return res.json({
		message: 'unknown error',
	});
};

module.exports = taskList;

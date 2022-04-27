const serviceTask = require('../services/task.js');

/**
 * 
 */
const taskStatus = async (req, res) => {
	const {
		statusId
	} = req.body;

	try {
		const data = await serviceTask.status(req.params.id, statusId);

		return res.json({
			message: 'successful changed status for task',
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

module.exports = taskStatus;

const serviceTask = require('../services/task.js');

/**
 * 
 */
const taskDelete = async (req, res) => {
	try {
		await serviceTask.remove(req.params.id);

		return res.json({
			message: 'successful deleted task',
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

module.exports = taskDelete;

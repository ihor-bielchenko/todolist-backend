const serviceTask = require('../services/task.js');

/**
 * 
 */
const taskUpdate = async (req, res) => {
	const {
		name,
		email,
		text,
	} = req.body;

	try {
		const data = await serviceTask.update(req.params.id, {
			name,
			email,
			text,
		});

		return res.json({
			message: 'successful updated task',
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

module.exports = taskUpdate;

const serviceTask = require('../services/task.js');

/**
 * 
 */
const taskCreate = async (req, res) => {
	const {
		name,
		email,
		text,
	} = req.body;

	try {
		const data = await serviceTask.create({
			name,
			email,
			text,
		});

		return res.json({
			message: 'successful created new task',
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

module.exports = taskCreate;

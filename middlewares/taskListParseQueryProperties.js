
const taskListParseQueryProperties = (req, res, next) => {
	req.query['page'] = Number(req.query['page'] ?? 0);
	req.query['limit'] = Number(req.query['limit'] ?? 0);

	if (typeof req.query['page'] != 'number'
		|| typeof req.query['limit'] != 'number') {
		return res
			.status(500)
			.json({
				message: 'query property is error',
			});
	}
	if (req.query['sort']) {
		try {
			const sort = JSON.parse(req.query['sort']);

			if (typeof sort === 'object') {
				req.query['sort'] = sort;
				return next();
			}
		}
		catch (err) {
			return res
				.status(500)
				.json({
					message: 'sort property is error',
				});
		}
	}
	return next();
};

module.exports = taskListParseQueryProperties;

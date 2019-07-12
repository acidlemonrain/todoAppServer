const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
	console.log('auth');

	const token = req.body.token;
	jwt.verify(req.body.token, 'hyc', (e, data) => {
		if (e) {
			res.json('fail');
		} else {
			req.user = data;
			next();
		}
	});
};

var router = require('express').Router();
var jwt = require('jsonwebtoken');
var con = require('../database');
var auth = require('./auth');
//login
router.post('/', (req, res) => {
	console.log(req.body);
	con.query(`SELECT * from user WHERE username ="${req.body.name}"`, function(error, results, fields) {
		if (results.length == 0) {
			console.log('没有这个用户');
			res.json(null);
			return 0;
		}
		password = results[0].password;
		userid = results[0].id;
		username = results[0].username;
		if (password == req.body.password) {
			var token = jwt.sign(
				{
					username: username,
					userid: userid
				},
				'hyc'
			);
			res.json(token);
		}
		if (password != req.body.password) {
			console.log('密码错误');

			res.json(false);
		}
	});
});
//newuser
router.post('/new', (req, res) => {
	console.log(req.body);

	con.query(`SELECT * from user WHERE username ="${req.body.name}"`, (e, r, f) => {
		if (r.length >= 1) {
			res.json(false);
		} else {
			const info = {
				username: req.body.name,
				password: req.body.password
			};
			con.query('INSERT INTO user SET ?', info, (e, r) => {
				if (!e) {
					var token = jwt.sign(
						{
							username: info.username,
							userid: r.insertId
						},
						'hyc'
					);
					res.json(token);
				} else {
					res.json(false);
				}
			});
		}
	});
});
//private infomation
router.post('/info', auth, (req, res) => {
	res.send(req.user);
});
//private todolist
router.post('/todolist', auth, (req, res) => {
	con.query(
		'SELECT todolist.*,`user`.username FROM  todolist, user WHERE todolist.userid = user.id AND userid =' +
			req.user.userid,
		function(error, results, fields) {
			res.json(results);
		}
	);
});
module.exports = router;

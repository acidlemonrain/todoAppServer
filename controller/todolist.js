var router = require('express').Router();
var con = require('../database');
var auth = require('./auth');
//get inform
router.get('/', function(req, res, next) {
	con.query(
		'SELECT todolist.*,`user`.username FROM  todolist, user WHERE todolist.userid = user.id AND todolist.public = 1',
		function(error, results, fields) {
			res.json(results);
		}
	);
});
router.get('/:id', function(req, res, next) {
	con.query(
		'SELECT todolist.*,`user`.username FROM  todolist, user WHERE todolist.userid = user.id AND todolist.id =' +
			req.params.id,
		function(error, results, fields) {
			res.json(!!results[0].public);
		}
	);
});
//new
router.post('/new', auth, (req, res) => {

	const info = {
		userid: req.user.userid,
		name: req.body.name,
		type: req.body.type
	};

	con.query('INSERT INTO todolist SET ?', info, (err) => {
		if (err) {
			return 0;
		}
		res.json('success');
	});
});
//set privacy
router.post('/privacy/:id', auth, (req, res) => {
	const listid = req.params.id;
	console.log(req.body.value);
	const value = Number(req.body.value);
	con.query(`UPDATE todolist	SET public = ${value} WHERE id = ${listid}`, (e, r, f) => {
		if (!e) {
			res.json(true);
		}
	});
});
module.exports = router;

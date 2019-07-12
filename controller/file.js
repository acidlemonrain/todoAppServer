var router = require('express').Router();
var jwt = require('jsonwebtoken');
var con = require('../database');
var auth = require('./auth');

router.get('/:id', (req, res) => {
	con.query('select * from file where id =' + req.params.id, (e, r, f) => {
		res.json(r[0]);
	});
});
router.post('/new/:id', (req, res) => {
	console.log(req.body);

	let info = {
		content: req.body.content,
		name: req.body.name,
		linkid: req.params.id,
		treeid: req.body.treeid
	};
	con.query('INSERT INTO file SET ?', info, (e, r) => {
		if (!e) {
			console.log(r);
			res.json(true);
		} else {
			console.log(e);
			res.json(false);
		}
	});
});

module.exports = router;

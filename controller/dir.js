var router = require('express').Router();
var jwt = require('jsonwebtoken');
var con = require('../database');
var auth = require('./auth');

router.post('/new/:id', (req, res) => {
	let info = {
		name: req.body.name,
		linkid: req.body.linkid,
		treeid: req.params.id
	};
	con.query('INSERT INTO directory SET ?', info, (e, r) => {
		if (!e) {
			res.json(true);
		} else {
			console.log(e);

			res.json(false);
		}
	});
});

module.exports = router;

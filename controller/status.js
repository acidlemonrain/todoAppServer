var router = require('express').Router();
var con = require('../database');
var auth = require('./auth');

function trans(a) {
	var deadline = [];
	var value = [];
	a.forEach((element) => {
		deadline.push(element.deadline);
		value.push(element.value);
	});
	return {
		deadline: deadline,
		value: value
	};
}

router.get('/bydate', (req, res) => {
	con.query(`SELECT  deadline,COUNT(1) as value   FROM  todo  GROUP BY deadline`, (e, r, f) => {
		res.json(trans(r));
	});
});

module.exports = router;

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
function transauthor(a) {
	var author = [];
	var value = [];
	a.forEach((element) => {
		author.push(element.username);
		value.push(element.value);
	});
	return {
		author: author,
		value: value
	};
}

router.get('/bydate', (req, res) => {
	con.query(`SELECT  deadline,COUNT(1) as value   FROM  todo  GROUP BY deadline`, (e, r, f) => {
		res.json(trans(r));
	});
});

router.get('/byauthor', (req, res) => {
	console.log('byauthor api work');

	con.query(
		`SELECT  username,COUNT(1) as value FROM todolist , user
    WHERE todolist.userid = user.id
    GROUP BY userid
    ORDER BY COUNT(1) DESC;`,
		(e, r, f) => {
			console.log(r);

			res.json(transauthor(r));
		}
	);
});

module.exports = router;

var router = require('express').Router();
var con = require('../database');

router.get('/', function(req, res, next) {
	con.query('SELECT * from todo', function(error, results, fields) {
		res.json(results);
	});
});
router.post('/', (req, res) => {
	const client = req.body;
	console.log(client);
	res.send(client);
	const sql = `INSERT INTO todo(name,des,deadline) VALUES('sdda','sdasad','2016-02-03')`;
	con.query('INSERT INTO todo SET ?', client, (err) => {
		if (err) {
			console.log(err);
		}
	});
});
router.get('/delete/:id', (req, res) => {
	con.query('DELETE FROM todo WHERE id = ' + req.params.id, (err) => {
		if (err) {
			console.log(err);
		} else {
			res.send('success');
		}
	});
});
module.exports = router;

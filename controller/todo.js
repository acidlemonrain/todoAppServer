var router = require('express').Router();
var con = require('../database');
var auth = require('./auth');
router.get('/:id', function(req, res, next) {
	con.query('SELECT * FROM todo WHERE listid =' + req.params.id, function(error, results, fields) {
		res.json(results);
	});
});
router.get('/rm/:id', function(req, res, next) {
	console.log('sada');

	con.query('delete from todo where id =' + req.params.id, function(error, results, fields) {
		if (!error) {
			res.json(true);
		}
	});
});
router.post('/new', auth, (req, res) => {
	const client = req.body;
	delete client.token;
	con.query('INSERT INTO todo SET ?', client, (err) => {
		if (err) {
		} else {
			res.json('success');
		}
	});
});
router.get('/delete/:id', (req, res) => {
	con.query('DELETE FROM todo WHERE id = ' + req.params.id, (err) => {
		if (err) {
		} else {
			res.send('success');
		}
	});
});
module.exports = router;

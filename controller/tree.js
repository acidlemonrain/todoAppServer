var router = require('express').Router();
var con = require('../database');
const tree = require('./utils/tree');
const auth = require('./auth');

//所有笔记
router.get('/', (req, res) => {
	con.query('select * from tree where userid =' + id, (e, r, f) => {
		if (e) {
			console.log(e);
			res.json(false);
		} else {
			res.json(r);
		}
	});
});

//我所有的笔记目录
router.post('/all', auth, function(req, res) {
	const id = req.user.userid;
	con.query('select * from tree where userid =' + id, (e, r, f) => {
		if (e) {
			console.log(e);
			res.json(e);
		} else {
			console.log(e);
			res.json(r);
		}
	});
});
//根据id找到特定的目录
router.get('/menu/:id', function(req, res) {
	tree.sql(req.params.id).then((x) => {
		res.json(tree.sort(x.dir, -1, x.file));
	});
});
//创建新的笔记目录
router.post('/new', auth, (req, res) => {
	const info = {
		userid: req.user.userid,
		name: req.body.name,
		catogory: req.body.catogory
	};
	con.query('INSERT INTO tree SET ?', info, (e, r) => {
		if (!e) {
			console.log(r);
			res.json(true);
		} else {
			console.log(e);
			res.json(false);
		}
	});
});
router.get('/delete', function(req, res) {
	tree.sql().then((x) => {
		const rs = tree.filter(x.dir, -1, x.file);
		const trans = {
			dir: rs.dir.map((i) => {
				return i.id;
			}),
			file: rs.file.map((i) => {
				return i.id;
			})
		};
		res.json(trans);
		// res.json(tree.sort(x.dir, -1, x.file));
	});
});

module.exports = router;

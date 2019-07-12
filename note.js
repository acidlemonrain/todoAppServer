var mysql = require('mysql');
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'myweb'
});
con.connect();
const select = 1;
let index = [];
let hasChild = true;

const tree = {
	getByLinkId: function getByLinkId(ary, id) {
		return ary.filter((ele) => {
			return ele.linkid === id;
		});
	},

	sql: async function sql() {
		const promisedir = new Promise((rs, rj) => {
			con.query('select * from directory ', (e, r, f) => {
				rs(r);
			});
		});

		const promisefile = new Promise((rs, rj) => {
			con.query('select * from file ', (e, r, f) => {
				rs(r);
			});
		});

		const [ dir, file ] = await [ promisedir, promisefile ];
		return {
			dir: await dir,
			file: await file
		};
	},

	sort: function sort(ary, id, files) {
		let answ = [];
		let raw = this.getByLinkId(ary, id);

		if (raw === []) {
			return null;
		} else {
			raw.forEach((element) => {
				const myfiles = files.filter((file) => {
					return file.linkid === element.id;
				});

				let cursive = {
					id: element.id,
					name: element.name,
					files: myfiles,
					children: this.sort(ary, element.id, files)
				};

				answ.push(cursive);
			});
			return answ;
		}
	}
};
con.end();
module.exports = tree;

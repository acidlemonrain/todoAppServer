const con = require('../../database');

module.exports = {
	getByLinkId: function getByLinkId(ary, id) {
		return ary.filter((ele) => {
			return ele.linkid === id;
		});
	},
	sql: async function sql(x) {
		const promisedir = new Promise((rs, rj) => {
			con.query('select * from directory where treeid =' + x, (e, r, f) => {
				rs(r);
			});
		});
		const promisefile = new Promise((rs, rj) => {
			con.query('select * from file where treeid =' + x, (e, r, f) => {
				rs(r);
			});
		});
		const [ dir, file ] = await [ promisedir, promisefile ];
		return { dir: await dir, file: await file };
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
	},
	filter: function filter(ary, id, files) {
		let raw = this.getByLinkId(ary, id);
		let dir = raw;
		console.log(typeof raw);

		let file = files.filter((file) => {
			return file.linkid == id;
		});
		console.log(typeof file);

		if (raw === []) {
			return null;
		} else {
			raw.forEach((element) => {
				sonfile = [ ...this.filter(ary, element.id, files).file ];
				file = [ ...file, ...sonfile ];
				childdir = this.filter(ary, element.id, files).dir;
				dir = [ ...dir, ...childdir ];
			});
		}

		return {
			dir: dir,
			file: file
		};
	}
};

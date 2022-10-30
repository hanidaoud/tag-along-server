const colors = require('colors');
const mariadb = require('mysql');
const config = require('../config');

function db_connect() {

	const conn = mariadb.createConnection(config.db);

	conn.connect(err => {
		if(err) {
			console.log(err.message.red);

			console.log('==> Connection failed!'.red);
			setTimeout(db_connect, 3000)
		} else {
			console.log('==> '.green + 'Connection succeeded!');
		}
	});
}
module.exports = db_connect;
const mariadb = require("mysql");
const config  = require("../config");
const rfid 	  = require("../modules/rfid");
const router  = require("express").Router();

module.exports = router;

let httpResponse = data => {
	return JSON.stringify({ data: data })
};


router.get('/logs', (req, res) => {
	let conn = mariadb.createConnection(config.db);

	conn.connect(err => {
		if(err) throw err;
		
		conn.query("SELECT l.id as log_id, l.time, l.direction, t.id as tag_id, t.uid, t.first_name, t.last_name FROM `log` l LEFT JOIN `tag` t ON l.tag_id = t.id ORDER BY l.id DESC LIMIT 30", (err, logs) => {
			if(err) throw err;

			conn.end();
			res.send(httpResponse(logs));
		});
	});
});

router.get('/tags', (req, res) => {
	let conn = mariadb.createConnection(config.db);

	conn.connect(err => {
		if(err) throw err;
		
		conn.query("SELECT t.*, COALESCE((SELECT l.direction FROM `log` l where l.tag_id = t.id ORDER BY l.id DESC LIMIT 1), 0) = 1 AS present_status FROM `tag` t", (err, tags) => {
			if(err) throw err;

			conn.end();
			res.send(httpResponse(tags));
		});
	});
});


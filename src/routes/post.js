const mariadb = require("mysql");
const router  = require("express").Router();
const rfid 	  = require("../modules/rfid");
const config = require("../config");
const app = require("../app");

router.post('/log', (req, res) => {
	res.statusCode = 400;
	
	if (req.headers['uuid'] === '2c56d4c7-5c46-4191-bd65-5dd820b41c30' && req.headers['rfid-tag'] != null) {
		let rfidUid = rfid.tag(req.headers['rfid-tag']);
		
		if(rfidUid != null) {
			console.log('Received tag:', rfidUid);

			let conn = mariadb.createConnection(config.db);
			
			conn.connect(err => {
				if(err) throw err;
				
				conn.query("SELECT t.*,"
					+ " (SELECT COALESCE((SELECT l.`direction` FROM `log` l WHERE `tag_id` = t.id ORDER BY l.`id` DESC LIMIT 1) * -1, 1)) AS next_direction"
					+ " FROM `tag` t WHERE t.`uid` = '" + rfidUid + "'", (err, tags) => {
					if(err) throw err;
					
					if(tags.length == 0) {
						conn.end();
						res.end();
					} else {
						let tag = tags[0];
						
						conn.query('INSERT INTO `log`(`tag_id`, `direction`) VALUES(' + tag.id + ', ' + tag.next_direction + ')', (err, insertLogResult)  => {
							if(err) throw err;
							
							conn.end();

							res.statusCode = 200;
							res.send(app.httpResponse(tag));
                            
							app.wsBroadcast('logged', tag);
						});
					}
				});
			});
		}
	} else {
		res.end();
	}
});

module.exports = router;
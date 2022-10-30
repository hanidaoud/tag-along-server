const colors = require('colors');
const app    = require('express')();
const mariadb     = require('mysql');
const config = require('./config');
const ws     = require('express-ws')(app);

require("dotenv").config();

let wsResponse = (eventName, obj) => {
	return JSON.stringify({
		event: eventName,
		data: obj
	});
};

let wsBroadcast = (eventName, obj) => {
	for(let _ws of ws.getWss().clients) {
		_ws.send(wsResponse(eventName, obj));
	}
};

let httpResponse = data => {
	return JSON.stringify({ data: data })
};

module.exports = {
    wsBroadcast,
    wsResponse,
    httpResponse
};

app.ws('/', _ws => {});

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use('', require('./routes/get'));

app.use('/log', require("./routes/post"));

const PORT = config.port; 

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

app.listen(config.port, () => {
	console.log(`Server has been started at port ${PORT}.`.green);
	console.log('==> '.yellow + 'Connecting to database...');

	db_connect();
});
require("dotenv").config();

module.exports = {
    port    : process.env.NODE_DOCKER_PORT,
    db     : {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    },
    access_port : process.env.NODE_LOCAL_PORT
};
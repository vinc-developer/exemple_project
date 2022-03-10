const mysql = require('mysql2/promise');
const log = require("../../../log/logger");

async function getConnection() {
    try {
        return await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

    } catch (error) {
        log.error("Error database getConnection : " + error);
        throw 'Data access error';
    }
}

module.exports = {
    getConnection
}

const mysql = require('mysql')

const config = require('../../config.js').DB_URL

const db = mysql.createPool(config);
module.exports = db;
const mysql = require('mysql');

const db = mysql.createPool('LINKHERE');

module.exports = db;
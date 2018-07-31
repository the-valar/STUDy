const mysql = require('mysql');

const dbConfig = {
    host: 'stud-y.cwpyhc0wkkir.us-east-2.rds.amazonaws.com',
    user: 'MartinGlyer',
    password: '3Kingdoms',
    port: '3306',
    database: 'greenfield'
}

const db = mysql.createPool(dbConfig);

module.exports = db;
const mysql = require('mysql')

const config = {
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.database,
  port: process.env.dbPort
}

const db = mysql.createPool(config);
module.exports = db;
const mysql = require('mysql');

const db = mysql.createPool('mysql://bb832821f4d61e:1e7e3d0d@us-cdbr-iron-east-04.cleardb.net/heroku_5adddc7722abaf1?reconnect=true');

module.exports = db;
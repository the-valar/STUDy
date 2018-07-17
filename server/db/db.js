const mysql = require('mysql');
const db = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'greenfield'
});
db.connect( (err) => {
  if (err) {
    console.error('Error connecting to mySQL', err);
  } else {
    console.log('Connected to mySQL');
  };
});
module.exports = db;
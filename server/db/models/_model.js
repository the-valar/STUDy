const db = require('../db.js');

const checkUserInfo = (username, password, callback) => {
  let findUser = "SELECT * FROM ";
  db.query(findUser, (err, data))
}

module.exports = {
  
}
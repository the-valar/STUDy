const db = require('../db.js');

let saveSpots = function(studySpotList) {
  for (let spot = 0; spot < studySpotList.businesses.length; spot++) {
    var currSpot = studySpotList.businesses[spot];

    db.query(
      `INSERT INTO locations (id, name, city, state, address) VALUES 
      ('${currSpot.id}', '${currSpot.name}', '${currSpot.location.city}', '${currSpot.location.state}', 
      '${currSpot.location.address1}')`, 
      (err, result) => {
        if (err) {
          console.error('Error inserting locations into mySQL', err);
        } else {
          console.log('Inserted locations into mySQL', result);
        }
      }
    );
  }
};

let login = function(username, password, cb) {
  db.query(`SELECT id FROM users WHERE username=${username} AND password=${password}`, (err, result) => {

  });
};

let register = function(username, password, cb) {
  db.query(`INSERT INTO users (username, password) VALUES (${username}, ${password}`, (err, result) => {
    if (err) {
      console.error('Error inserting user into mySQL', err);
    } else {
      console.log('Registered', result);
      // Return user id for use in ratings, etc
      cb(null, result);
    }
  });
};

let rating = function(user_id, {coffeeTea, atmosphere, comfort, food}, cb) {
  db.query(`INSERT INTO ratings (coffeeTea, atmosphere, comfort, food, user_id) VALUES (?, ?, ?, ?, ?)`, (err, results) => {
    if (err) {
      console.error('Error inserting ratings into mySQL', err);
    } else {
      console.log('Inserted ratings into mySQL', results);
    }
  });
};

module.exports = {
  saveSpots: saveSpots,
  login: login,
  register: register,
  rating: rating
};

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

let login = function({username, password}, cb) {
  db.query(`SELECT id FROM users WHERE username=${username} AND password=${password}`, (err, result) => {

  });
};

let register = function({username, password}, cb) {
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

let addRating = function({user_id, location_id, coffeeTea, atmosphere, comfort, food}, cb) {
  var command = `INSERT INTO ratings (coffeeTea, atmosphere, comfort, food, location, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
  var params = [coffeeTea, atmosphere, comfort, food, user_id, location_id];

  db.query(command, params, (err, results) => {
    if (err) {
      console.error('Error inserting ratings into mySQL', err);
    } else {
      console.log('Inserted ratings into mySQL', results);
    }
  });
};

let getRating = function({location_id}, cb) {
  var command = `SELECT coffeeTea, atmosphere, comfort, food
                 FROM ratings
                 JOIN locations ON ratings.location=locations.id
                 WHERE locations.id=${location_id}`;

  db.query(command, (err, results) => {
    if (err) {
      console.error('Error getting ratings for location from mySQL', err);
    } else {
      console.log('Retrieved all location ratings', results);
      cb(null, results);
    }
  });
};

let addFavorite = function({user_id, location_id}, cb) {
  db.query(`INSERT INTO users_locations (${user_id}, ${location_id}`, (err, results) => {
    if (err) {
      console.error('Error inserting into favorites', err);
    } else {
      console.log('Inserted into favorites into mySQL', result);
    }
  });
};

module.exports = {
  saveSpots: saveSpots,
  login: login,
  register: register,
  addRating: addRating,
  addFavorite: addFavorite,
  getRating: getRating
};

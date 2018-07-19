const db = require('../db.js');

let saveSpots = function(studySpotList) {
  for (let spot = 0; spot < studySpotList.length; spot++) {
    var currSpot = studySpotList[spot];
    var command = `INSERT INTO locations (id, name, city, state, address) VALUES (?, ?, ?, ?, ?)`;
    var params = [
      currSpot.id,
      currSpot.name,
      currSpot.location.city,
      currSpot.location.state,
      currSpot.location.address1
    ];

    db.query(command, params, (err, result) => {
      if (err) {
        console.error('Error inserting locations into mySQL');
      } else {
        console.log('Inserted locations into mySQL');
      }
    });
  }
};

let getRelevantFirst = function(
  studySpotList,
  coffeeMult,
  atmosphereMult,
  comfortMult,
  foodMult,
  cb
) {
  var arrArr = [];
  var results = [];
  let count = 0;
  for (let spot = 0; spot < studySpotList.length; spot++) {
    db.query(
      `SELECT AVG(coffeeTea) AS CT, AVG(atmosphere) AS A, AVG(comfort) AS C, AVG(food) AS F 
      FROM ratings 
      WHERE location=?`,
      studySpotList[spot]['id'],
      (err, result) => {
        let finalScore = 0;
        var resultObj = JSON.parse(JSON.stringify(result))[0];
        if (err) {
          cb(err);
        } else if (resultObj['CT'] !== null) {
          finalScore =
            resultObj['CT'] * coffeeMult +
            resultObj['A'] * atmosphereMult +
            resultObj['C'] * comfortMult +
            resultObj['F'] * foodMult;
        }
        arrArr.push([finalScore, studySpotList[spot]]);
        count++;
        if (count === studySpotList.length) {
          arrArr.sort((a, b) => {
            return b[0] - a[0];
          });
          arrArr.forEach((pair) => {
            results.push(pair[1]);
          });
          cb(null, results);
        }
      }
    );
  }
};

let login = function({ username, password }, cb) {
  var params = [username, password];
  
  db.query(`SELECT id FROM users WHERE username=? AND password=?`, params, (err, result) => {
    if (err) {
      cb(err);
    } else {
      console.log('Found user', result);
        // Return user id
      cb(null, result);
    }
  );
};

let register = function({ username, password }, cb) {
  var params = [username, password];

  db.query(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    params,
    (err, result) => {
      if (err) {
        cb(err);
      } else {
        console.log('Registered', result);
        // Return user id
        cb(null, result);
      }
    }
  );
};

let addRating = function(
  { user_id, location_id, coffeeTea, atmosphere, comfort, food },
  cb
) {
  var command = `INSERT INTO ratings (coffeeTea, atmosphere, comfort, food, location, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
  var params = [coffeeTea, atmosphere, comfort, food, user_id, location_id];

  db.query(command, params, (err, results) => {
    if (err) {
      console.error('Error inserting ratings', err);
    } else {
      console.log('Inserted ratings', results);
    }
  });
};

let getRating = function({ location_id }, cb) {
  var command = `SELECT coffeeTea, atmosphere, comfort, food
                 FROM ratings
                 JOIN locations ON ratings.location=locations.id
                 WHERE locations.id=?`;

  db.query(command, location_id, (err, results) => {
    if (err) {
      console.error('Error getting location ratings', location_id, err);
    } else {
      console.log('Retrieved all location ratings', results);
      // Return location ratings for use in cb
      cb(null, results);
    }
  });
};

let addFavorite = function({ user_id, location_id }, cb) {
  var params = [user_id, location_id];

  db.query(`INSERT INTO users_locations (?, ?)`, params, (err, results) => {
    if (err) {
      console.error('Error inserting into favorites', err);
    } else {
      console.log('Inserted into favorites', result);
    }
  });
};

let getFavorite = function({ user_id }, cb) {
  var command = `SELECT id, name, city, state, address
                 FROM users_locations
                 JOIN locations ON locations.id=users_locations.location_id
                 WHERE users_locations.user_id=${user_id}`;

  db.query(command, (err, results) => {
    if (err) {
      console.error('Error getting user favorites', err);
    } else {
      console.log('Retrieved all user favorites', results);
      // Return user favorites for use in cb
      cb(null, results);
    }
  });
};

let addComment = function({ user_id, location_id, text }, cb) {
  var params = [text, user_id, location_id];

  db.query(
    `INSERT INTO comments (text, user_id, location) VALUES (?, ?, ?)`,
    params,
    (err, results) => {
      if (err) {
        console.error('Error inserting comment', err);
      } else {
        console.log('Inserted comment', results);
      }
    }
  );
};

let getComment = function({ location_id }, cb) {
  var command = `SELECT text, user_id
                 FROM comments
                 JOIN locations ON comments.location=locations.id
                 WHERE locations.id=?`;

  db.query(command, location_id, (err, results) => {
    if (err) {
      console.error('Error getting location comments', err);
    } else {
      console.log('Retrieved all location comments', results);
      // Returns location comments for use in cb
      cb(null, results);
    }
  });
};

module.exports = {
  saveSpots: saveSpots,
  getRelevantFirst: getRelevantFirst,
  login: login,
  register: register,
  addRating: addRating,
  addFavorite: addFavorite,
  getRating: getRating,
  getFavorite: getFavorite,
  addComment: addComment,
  getComment: getComment
};

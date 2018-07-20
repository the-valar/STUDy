const bcrypt = require('bcrypt-nodejs');

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

    db.getConnection( (err, conn) => {
      conn.query(command, params, (err, result) => {
        if (err) {
          console.error('Error inserting locations into mySQL');
        } else {
          console.log('Inserted locations into mySQL');
        }
      });

      conn.release();
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
  var results = { businesses: [] };
  let count = 0;
  for (let spot = 0; spot < studySpotList.length; spot++) {
    db.getConnection((err, conn) => {
      conn.query(
        `SELECT AVG(coffeeTea) AS coffeeTea, AVG(atmosphere) AS atmosphere, AVG(comfort) AS comfort, AVG(food) AS food 
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
              results['businesses'].push(pair[1]);
            });
            cb(null, results);
          }
        }
      );

      conn.release();
    });
  }
};

let getAveragesAndReviewCount = function({ location_id }, cb) {
  db.getConnection((err, conn) => {
    conn.query(
      `SELECT AVG(coffeeTea) AS coffeeTea, AVG(atmosphere) AS atmosphere, AVG(comfort) AS comfort, AVG(food) AS food, COUNT(id) as count
        FROM ratings
        WHERE location=?`,
      location_id,
      (err, result) => {
        if (err) {
          cb(err);
        } else {
          cb(null, JSON.parse(JSON.stringify(result)));
        }
      }
    );

    conn.release();
  });
};

let login = function({ username }, cb) {
  db.getConnection((err, conn) => {
    conn.query(
      `SELECT id, password FROM users WHERE username=?`,
      username,
      (err, result) => {
        if (!result.length) {
          console.error('Incorrect user or password');
        } else {
          console.log('Found user', result);
          // Return user id
          cb(null, result);
        }
      }
    );

    conn.release();
  });
};

let register = function({ username, password }, cb) {
  
  bcrypt.hash(password, null, null, (err, hash) => {
    if (err) {
      console.error('Error hashing password', err);
    } else {
      var params = [username, hash];
      
      db.getConnection((err, conn) => {
        conn.query(
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

        conn.release();
      });
    }
  });
};

let addRating = function(
  { user_id, location_id, coffeeTea, atmosphere, comfort, food },
  cb
) {
  var command = `INSERT INTO ratings (coffeeTea, atmosphere, comfort, food, location, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
  var params = [coffeeTea, atmosphere, comfort, food, location_id, user_id];

  db.getConnection((err, conn) => {
    conn.query(command, params, (err, results) => {
      if (err) {
        console.error('Error inserting ratings', err);
      } else {
        console.log('Inserted ratings', results);
        cb(null, results);
      }
    });
    conn.release();
  });
};

let getRating = function({ location_id }, cb) {
  var command = `SELECT coffeeTea, atmosphere, comfort, food
                 FROM ratings
                 JOIN locations ON ratings.location=locations.id
                 WHERE locations.id=?`;

  db.getConnection((err, conn) => {
    conn.query(command, location_id, (err, results) => {
      if (err) {
        console.error('Error getting location ratings', location_id, err);
      } else {
        console.log('Retrieved all location ratings', results);
        // Return location ratings for use in cb
        cb(null, results);
      }
    });

    conn.release();
  });
};

let addFavorite = function({ user_id, location_id }, cb) {
  var params = [user_id, location_id];

  db.getConnection((err, conn) => {
    conn.query(`INSERT INTO users_locations (?, ?)`, params, (err, results) => {
      if (err) {
        console.error('Error inserting into favorites', err);
      } else {
        console.log('Inserted into favorites', result);
        cb(null, results);
      }
    });
    conn.release();
  });
};

let getFavorite = function({ user_id }, cb) {
  var command = `SELECT id, name, city, state, address
                 FROM users_locations
                 JOIN locations ON locations.id=users_locations.location_id
                 WHERE users_locations.user_id=${user_id}`;

  db.getConnection((err, conn) => {
    conn.query(command, (err, results) => {
      if (err) {
        console.error('Error getting user favorites', err);
      } else {
        console.log('Retrieved all user favorites', results);
        // Return user favorites for use in cb
        cb(null, results);
      }
    });

    conn.release();
  });
};

let addComment = function({ user_id, location_id, text }, cb) {
  var params = [text, user_id, location_id];

  db.getConnection((err, conn) => {
    conn.query(
      `INSERT INTO comments (text, user_id, location) VALUES (?, ?, ?)`,
      params,
      (err, results) => {
        if (err) {
          console.error('Error inserting comment', err);
        } else {
          console.log('Inserted comment', results);
          cb(null, results);
        }
      }
    );
    conn.release();
  });
};

let getComment = function({ location_id }, cb) {
  var command = `SELECT text, user_id
                 FROM comments
                 JOIN locations ON comments.location=locations.id
                 WHERE locations.id=?`;
  db.getConnection((err, conn) => {
    conn.query(command, location_id, (err, results) => {
      if (err) {
        console.error('Error getting location comments', err);
      } else {
        console.log('Retrieved all location comments', results);
        // Returns location comments for use in cb
        cb(null, results);
      }
    });

    conn.release();
  });
};

module.exports = {
  saveSpots: saveSpots,
  getRelevantFirst: getRelevantFirst,
  getAveragesAndReviewCount: getAveragesAndReviewCount,
  login: login,
  register: register,
  addRating: addRating,
  addFavorite: addFavorite,
  getRating: getRating,
  getFavorite: getFavorite,
  addComment: addComment,
  getComment: getComment
};

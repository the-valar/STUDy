const db = require('../db.js');

<<<<<<< HEAD
let saveSpots = function(studySpotList) {
  for (let spot = 0; spot < studySpotList.businesses.length; spot++) {
    var currSpot = studySpotList.businesses[spot];
    console.log(currSpot);
    db.query(
      `INSERT INTO locations (id, name, city, state, address) VALUES 
      ('${currSpot.id}', '${currSpot.name}', '${currSpot.location.city}', '${currSpot.location.state}', 
      '${currSpot.location.address1}')`, 
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
    console.log('done');
  }
};

module.exports = {
  saveSpots: saveSpots
};
=======
const checkUserInfo = (username, password, callback) => {
  let findUser = "SELECT * FROM ";
  db.query(findUser, (err, data))
}

module.exports = {
  
}
>>>>>>> 2a652a08a944822746cc1cbfb0876be237f0ae78

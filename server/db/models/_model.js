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
          console.log(err);
        } else {
          console.log('INSERTED INTO DB');
        }
      }
    );
    console.log('done');
  }
};

module.exports = {
  saveSpots: saveSpots
};

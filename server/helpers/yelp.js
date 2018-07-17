const axios = require('axios');
<<<<<<< HEAD
const config = require('../../config.js');
=======
const YELPAPI = require('../db/config.js');
>>>>>>> 7d2355f4699545de1cde0b56450e8504e8e894d1

let getClosestWithinRadius = (loc, radius) => {
  let options = {
    headers: {
      'Authorization': `Bearer ${config.YELPAPI}`
    },
    params: {
      term: 'study spots',
      radius: radius,
      location: loc
    }
  };

  return axios
    .get(`https://api.yelp.com/v3/businesses/search`, options)
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getClosestWithinRadius = getClosestWithinRadius;

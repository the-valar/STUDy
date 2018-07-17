const axios = require('axios');
const config = require('../../config.js');

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

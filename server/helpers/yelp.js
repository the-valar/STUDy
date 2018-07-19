const axios = require('axios');
const config = require('../../config.js');

let options = {
  headers: {
    'Authorization': `Bearer ${config.YELPAPI}`
  }
}

let getClosestWithinRadius = (loc, radius) => {
  options.params = {
    term: 'study spots',
    radius: radius,
    location: loc,
    sort_by: "distance"
  }

  return axios
  .get(`https://api.yelp.com/v3/businesses/search`, options)
  .catch((err) => {
    console.log(err);
  });
};

let getAdditionalPics = (locId) => {
  return axios
  .get(`https://api.yelp.com/v3/businesses/${locId}`, options)
  .catch((err) => {
    console.log({err});
  });
}

module.exports.getClosestWithinRadius = getClosestWithinRadius;
module.exports.getAdditionalPics = getAdditionalPics;

const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const { getClosestWithinRadius } = require('../helpers/yelp.js');
const { saveSpots } = require('../db/models/_model.js');

const app = express();

app.use(express.static(__dirname + '/../../client'))
app.use(parser.json());

app.get('/search', (req, res) => {
  var params = req.query;
  getClosestWithinRadius(params.location, 4000)
  .then((studySpotList) => {
    // TODO: Format Yelp API response to return truncated response array
    res.send(studySpotList);
  })
  .catch((err) => {
    console.log('Error searching for location: ' + err);
  });
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('App is listening to port', port);
});
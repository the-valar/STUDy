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
    saveSpots(studySpotList.data);
    res.send(studySpotList.data);
  })
  .catch((err) => {
    console.log('Error searching for location: ' + err);
  });
})

app.get('/login', (req, res) => {
  // console.log(req.body);
  
  // checkUserInfo(req.body.username, (err, result) => {
    
  // })
});

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('App is listening to port', port);
});
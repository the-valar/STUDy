const express = require('express');
const parser = require('body-parser');
const { getClosestWithinRadius } = require('../helpers/yelp.js');
const models = require('../db/models/_model.js');

const app = express();

app.use(express.static(__dirname + '/../../client'))
app.use(parser.json());

app.get('/search', (req, res) => {
  var params = req.query;
  getClosestWithinRadius(params.location, 4000)
  .then((studySpotList) => {
    models.saveSpots(studySpotList.data);
    res.send(studySpotList.data);
  })
  .catch((err) => {
    console.log('Error searching for location: ' + err);
  });
})

app.get('/login', (req, res) => {
  models.login(req.query, (err, data) => {
    if (err) {
      res.send('Username or password is incorrect');
    } else {
      res.send(JSON.stringify(data[0].id));
    }
  });
});

app.post('/register', (req ,res) => {
  models.register(req.body, (err, data) => {
    if (err) {
      res.send('Username is taken');
    } else {
      res.send(data.insertId);
    }
  });
});

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('App is listening to port', port);
});
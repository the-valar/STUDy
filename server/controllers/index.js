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
  // both login and register req.query should have [username, password] as keys

  models.login(req.query, (err, data) => {
    if (err) {
      res.send();
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

app.post('/addRating', (req, res) => {
  // req.body should have [user_id, location_id, coffeeTea, atmosphere, comfort, food] as keys

  models.addRating(req.body, (err, data) => {
    res.send();
  });
});

app.get('/getRating', (req, res) => {
  // req.query should have location_id as a key

  models.getRating(req.query, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/addFavorite', (req, res) => {
  // req.body should have user_id and location_id as keys

  models.addFavorite(req.body, (err, data) => {
    res.send();
  });
});

app.get('/getFavorite', (req, res) => {
  // req.query should have user_id as a key

  models.getFavorite(req.query, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/addComment', (req, res) => {
  // req.body should have user_id, location_id, text as keys

  models.addComment(req.body, (err, data) => {
    res.send();
  });
});

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('App is listening to port', port);
});
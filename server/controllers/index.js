const express = require('express');
const parser = require('body-parser');
const { getClosestWithinRadius, getAdditionalPics } = require('../helpers/yelp.js');
const models = require('../db/models/_model.js');

const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');

const app = express();

app.use(express.static(__dirname + '/../../client'));
app.use(parser.json());
app.use(session({
  secret: 'very secret'
}));

var sess = {
  username: '',
  login: false
};

app.get('/session', (req, res) => {
  res.send(sess);
});

app.get('/logout', (req, res) => {
  sess.username = '';
  sess.login = false;
  res.send();
});

app.get('/search', (req, res) => {
  var params = req.query;
  var coffeeMult = 5 - params.coffee;
  var atmosphereMult = 5 - params.atmosphere;
  var comfortMult = 5 - params.comfort;
  var foodMult = 5 - params.food;
  getClosestWithinRadius(params.location, params.radius)
    .then((studySpotList) => {
      models.saveSpots(studySpotList.data.businesses);
      if (coffeeMult + atmosphereMult + comfortMult + foodMult === 20) {
        res.send(studySpotList.data);
      } else {
        models.getRelevantFirst(
          studySpotList.data.businesses,
          coffeeMult,
          atmosphereMult,
          comfortMult,
          foodMult,
          (err, results) => {
            if (err) {
              console.log(err);
            }
            res.send(results);
          }
        );
      }
    })
    .catch((err) => {
      console.log('Error searching for location: ' + err);
    });
});

app.post('/login', (req, res) => {
  // both login and register req.query should have [username, password] as keys
  sess.session = req.session;

  models.login(req.body, (err, data) => {
    if (err) {
      console.error('Wrong username or password');
    } else {
      bcrypt.compare(req.body.password, data[0].password, (err, match) => {
        if (match) {
          sess.login = true;
          sess.username = req.body.username;

          res.send(JSON.stringify(data[0].id));
        } else {
          console.error('Wrong username or password');
        }
      });
    }
  });
});

app.post('/register', (req, res) => {
  models.register(req.body, (err, data) => {
    if (err) {
      console.error('Username is taken');
    } else {
      sess.session = req.session;
      sess.login = true;
      sess.username = req.body.username;

      res.send(JSON.stringify(data.insertId));
    }
  });
});

app.post('/ratings', (req, res) => {
  // req.body should have [user_id, location_id, coffeeTea, atmosphere, comfort, food] as keys

  models.addRating(req.body, (err, data) => {
    res.send();
  });
});

app.get('/ratings', (req, res) => {
  // req.query should have location_id as a key
  // OPTIONAL: if req.query has a key, 'average', will provide average rating and rating count
  if (req.query.average) {
    models.getAveragesAndReviewCount(req.query, (err, data) => {
      if (err) {
        res.send();
      } else {
        res.send(JSON.stringify(data));
      }
    })
  } else {
    models.getRating(req.query, (err, data) => {
      if (err) {
        res.send();
      } else {
        res.send(JSON.stringify(data));
      }
    });
  }
});

app.post('/favorites', (req, res) => {
  // req.body should have user_id and location_id as keys

  models.addFavorite(req.body, (err, data) => {
    res.send();
  });
});

app.get('/favorites', (req, res) => {
  // req.query should have user_id as a key

  models.getFavorite(req.query, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/comments', (req, res) => {
  // req.body should have user_id, location_id, text as keys

  models.addComment(req.body, (err, data) => {
    res.send();
  });
});

app.get('/comments', (req, res) => {
  // req.query should have location_id as a key

  models.getComment(req.query, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.get('/pics', (req, res) => {
  // req.query should have location_id as a key

  getAdditionalPics(req.query.location_id)
  .then((result) => {
    res.send(result.data);
  })
  .catch((err) => {
    res.send();
  });
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('App is listening to port', port);
});

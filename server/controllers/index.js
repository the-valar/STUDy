const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const stripe = require("stripe")("sk_test_TwTTlid3GeOG6YPydOjARw4I");
const models = require('../db/models/_model.js');
const {
  getClosestWithinRadius,
  getAdditionalPics
} = require('../helpers/yelp.js');

const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');

const app = express();

app.use(morgan('dev'))
const server = require('http').createServer(app);
app.use(parser.json());
app.use(
  session({
    secret: 'very secret'
  })
);
app.use(express.static(__dirname + '/../../client'));


/* ===================== */
/* Socket.io Chat Routes */
/* ===================== */

const io = require('socket.io')(server);

io.on('connection', function() {
  console.log('Socket.io is listening')
})


/* ===================== */
/* ===================== */



function auth(req, res, next) {
  if (req.session.userData) next();
  else {
    res.redirect('/');
  }
}

app.get('/logout', (req, res) => {
  delete req.session.userData;
  res.send();
});

app.get('/search', (req, res) => {
  // req.query should have [coffee, atmosphere, comfort, food, location, radius] as keys

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

app.get('/current_user', (req, res) => {
  res.send(req.session.userData)
})

app.post('/login', (req, res) => {
  // both login and register req.query should have [username, password] as keys

  models.login(req.body, (err, data) => {
    if (err) {
      res.status(404).send();
    } else {
      bcrypt.compare(req.body.password, data[0].password, (err, match) => {
        if (match) {
          var sess = {
            username: req.body.username,
            userId: data[0].id,
            membership: data[0].membership,
            login: true
          };

          req.session.userData = sess;
          res.send({id: data[0].id, membership: data[0].membership});
        }
      });
    }
  });
});

app.post('/member', (req,res) => {
  req.session.userData.membership = 1
  models.updateMembership(req.body.userId, (err, data) => {
    if(err){
      console.error(err)
    }
    res.send(data)
  })
})

app.post('/register', (req, res) => {
  models.register(req.body, (err, data) => {
    if (err) {
      console.error('Username is taken');
    } else {
      var sess = {
        username: req.body.username,
        userId: data.insertId,
        login: true
      };

      req.session.userData = sess;
      res.send(JSON.stringify(data.insertId));
    }
  });
});

app.post('/charge', (req, res) => {
  stripe.charges.create({
    amount: 2000,
    currency: "usd",
    description: "An example charge",
    source: req.body.tokenId
  }, (err,result)=>{
    if(err) res.status(500).end();
    else res.send(result)
  })

});

app.post('/ratings', (req, res) => {
  // req.body should have [user_id, location_id, coffeeTea, atmosphere, comfort, food] as keys

  models.addRating(req.body, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
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
    });
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
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/bio', (req, res) => {
  models.updateBio(req.body, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.get('/bio', (req, res) => {
  console.log(req.query);
  models.getBio(req.query, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});


app.get('/favorites', (req, res) => {
  // req.query should have user_id as a key
  console.warn(req.query);
  models.getFavorite(req.query, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.post('/comments', (req, res) => {
  // req.body should have user_id, location_id, parent_id, rating_id, text as keys

  models.addComment(req.body, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
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
});

app.post('/pics', (req, res) => {
  // req.body should have pics and location_id as keys

  models.addPics(req.body, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

app.get('/reviews', (req, res) => {
  //reviews will have two props the location_id and the parent_id
  models.getFullReviews(req.query, (err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(JSON.stringify(data));
    }
  });
});

//to fetch comments by parent id - for top level comments (or reviews) set parent_id to 0
app.get('/reviewsByParentId', (req, res) => {
  //takes in a parentId property 
  models.getReviewByParentId(req.query, (err, data) => {
    if (err) {
      console.error('there was an error fetching the reviews by parent id', err)
    } else {
      res.send(data);
    }
  })
})

//to post a sub comment to the database
app.post('/subComment', (req, res) => {
  //req body should have a parentId, location, userId, and text
  //format to match db columns will happen in model
  models.postSubComment(req.body, (err, data) => {
    if (err) {
      console.error('there was an error posting this subcomment in the database', err);
    } else {
      res.sendStatus(201);
    }
  })
})

app.get('/*', auth, (req, res) => {
  res.send(req.session.userData);
});

const port = 8080;

server.listen(port, () => {
  console.log('App is listening to port', port);
});

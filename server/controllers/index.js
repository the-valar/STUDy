const express = require('express');
const axios = require('axios');
const parser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/../../client'))
app.use(parser.json());

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('App is listening to port', port);
});
const express = require('express');
const axios = require('axios');
const parser = require('body-parser');

const app = express();

// app.use(directory that the React index is in)

app.use(parser.json());

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('App is listening to port', port);
});
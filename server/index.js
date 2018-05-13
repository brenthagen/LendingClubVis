const express = require('express');
const parser = require('body-parser');
const app = express();
//const db = require('../database');

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
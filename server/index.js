const express = require('express');
const parser = require('body-parser');
const app = express();
//const db = require('../database');

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port ' + port + '!');
});
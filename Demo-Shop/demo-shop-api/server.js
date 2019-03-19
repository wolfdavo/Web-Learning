var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop',  {useNewUrlParser: true});
//Linking out router file containing all the api endpoints
var routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//This points all hits to the root towards the router file.
app.use('/', routes);

app.listen(3000, function() {
  console.log("Swag shop API running on port 3000...");
});

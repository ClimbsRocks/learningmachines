'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helpers = require('./helpers.js'); // our custom middleware
var morgan = require('morgan'); // used for logging incoming request
var neuralNetRouter = require('../neuralNet/neuralNetRouter.js');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
  // app.use(express.static(path.join(__dirname + '../../../dist')));
  // neuralNet router is where we're keeping all of our api endpoints for the neural net. This lets us extend the server to include other machine learning algorithms under their own api endpoints
  app.use('/neuralNet', neuralNetRouter);
};

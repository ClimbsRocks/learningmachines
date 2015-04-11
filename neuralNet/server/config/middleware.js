'use strict';

var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helpers = require('./helpers.js'); // our custom middleware
var morgan = require('morgan'); // used for logging incoming request
var dataProcessingRouter = require('../dataProcessing/dataProcessingRouter.js');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
  // app.use(express.static(path.join(__dirname + '../../../dist')));
  // dataProcessing router is for all our internal data processing, and is only used once when we import the data
  app.use('/dataProcessing', dataProcessingRouter);
};

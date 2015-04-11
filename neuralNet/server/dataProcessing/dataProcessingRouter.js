'use strict';
var express = require('express');
var dataProcessingRouter = express.Router();
var dataProcessingLogic = require('./dataProcessingLogic.js');

dataProcessingRouter.get('/formatData', function(req, res) {
  console.log('heard a request to formatData');
  dataProcessingLogic.formatData(req, res);
});

dataProcessingRouter.get('/startNet', function(req, res) {
  console.log('heard a request to startNet');
  dataProcessingLogic.startNet(req, res);
});

dataProcessingRouter.get('/loadAndTestBrain', function(req, res) {
  console.log('heard a request to loadAndTestBrain');
  dataProcessingLogic.loadAndTestBrain(req, res);
});

module.exports = dataProcessingRouter;

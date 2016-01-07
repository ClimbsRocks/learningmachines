'use strict';
var express = require('express');
var neuralNetRouter = express.Router();
var neuralNetLogic = require('./neuralNetLogic.js');

// this could certainly be done more simply, but I actually prefer laying each one out individually, as we do here
// this allows us to see very directly which methods we expect to be publicly available
// and also allows us to add in some logging for the user to see

neuralNetRouter.get('/formatData', function(req, res) {
  console.log('heard a request to formatData');
  neuralNetLogic.formatData(req, res);
});

neuralNetRouter.get('/startNet', function(req, res) {
  console.log('heard a request to startNet');
  neuralNetLogic.startNet(req, res);
});

neuralNetRouter.get('/loadAndTestBrain', function(req, res) {
  console.log('heard a request to loadAndTestBrain');
  neuralNetLogic.loadAndTestBrain(req, res);
});

neuralNetRouter.get('/kagglePredict', function(req, res) {
  console.log('heard a request to kagglePredict');
  neuralNetLogic.kagglePredict(req, res);
});

neuralNetRouter.get('/kaggleTrain', function(req, res) {
  console.log('heard a request to kaggleTrain');
  neuralNetLogic.kaggleTrain(req, res);
});

module.exports = neuralNetRouter;

'use strict';
var express = require('express');
var neuralNetRouter = express.Router();
var neuralNetLogic = require('./neuralNetLogic.js');

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

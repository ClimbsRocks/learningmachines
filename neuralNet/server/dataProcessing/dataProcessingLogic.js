var db = require('../db');
var path = require('path');
var fs = require('fs');
var brain = require('brain');

//TODO: your code here


module.exports = {
  startNet: function(req,res) {
    db.query('SELECT * FROM training', function(err, response) {
      if(err) {
        console.error(err);
      } else {
        var formattedData = module.exports.formatData(response);
        var training = [];
        var testing = [];
        for(var i = 0; i < formattedData.length; i++) {
          if(Math.random() > .8) {
            training.push(formattedData[i]);
          } else {
            testing.push(formattedData[i]);
          }
        }
        module.exports.trainBrain(training, testing);
      }
    });
  },

  loadAndTestBrain: function(req,res) {
    db.query('SELECT * FROM training', function(err, response) {
      if(err) {
        console.error(err);
      } else {
        var formattedData = module.exports.formatData(response);
        fs.readFile('name', 'utf8', function(err, data) {
          if(err) {
            console.error(err);
          } else {
            net.fromJSON(JSON.parse(data));
            res.send('Loaded the brain! Testing it now.')
            module.exports.testBrain(formattedData);
          }
        });

      }
    });
  },

  trainBrain: function(trainingData, testingData) {
    console.time('trainBrain');
    console.log('Training your very own Brain');

    //TODO: Your code here

    var jsonBackup = net.toJSON();
    var runBackup = net.toFunction();

    module.exports.writeBrain(jsonBackup);

    console.timeEnd('trainBrain');

    module.exports.testBrain(testingData);
  },

  //Test our brain with a given set of testData
  //Logs the output of default rate at that prediction level
  testBrain: function(testData) {
    console.time('testBrain');
    //TODO: Your code here to get the predicted values for everything in our testData
    //The logging code below expects the predicted net values to be stored as properties on each item in testData under the property name output. 
    //Here's what an object in testData should look like:
      /*
      { input: 
         { utilizationRate: 0.21939333333333333,
           age: 0.3486238532110092,
           thirtyDaysLate: 0.01020408163265306,
           monthlyIncome: 0.031789238577839024,
           openCreditLines: 0.1767766952966369,
           ninetyDaysLate: 0.1,
           realEstateLines: 0,
           sixtyDaysLate: 0,
           numDependents: 0 },
        output: { defaulted: 0 },
        nnPredictions: { defaulted: 0.34634397489904356 } }
      */
    for(var i = 0; i < testData.length; i++) {
      testData[i].output = net.run(testData[i].input);
    }

    var results = {};
    for(var j = 0; j <=100; j++) {
      results[j] = {
        nnCount: 0,
        defaulted: 0
      };
    }

    for(var i = 0; i < testData.length; i++) {
      //we format the net's prediction to be a number between 0 and 100
      var prediction = Math.round( testData[i].output.defaulted * 100);
      //We then increment the total number of cases that the net predicts exist at this level
      results[prediction].nnCount++;
      //And whether this input resulted in a default or not
      results[prediction].defaulted += testData[i].output.defaulted;
    }

    //We don't like to assume the keys are going to be ordered, but it's a time-saving shortcut to make at the moment.
    for(var key in results) {
      console.log(key + '- nnCount: ' + results[key].nnCount + ' defaulted: ' + results[key].defaulted + ' Default Rate: ' + results[key].defaulted/results[key].nnCount);
    }
    console.timeEnd('testBrain');

    console.log(results);
  },

  //Writes the neural net to a file for backup
  writeBrain: function(json) {
    var fileName = 'hiddenLayers' + net.hiddenSizes + 'learningRate' + net.learningRate + new Date().getTime();
    fs.writeFile(fileName, json, function(err) {
      if(err) {
        console.error('sad, did not write to file');
      } else {
        console.log('wrote to file',fileName);
      }
    });
  },

  //Takes our raw data input, roughly normalizes it, and transforms it into numbers between 0 and 1 like our net expects
  formatData: function(data) {

    //TODO: refactor to use prettier names in the db

    //TODO: SOLUTION CODE BELOW
    console.log('formatting Data');
    var formattedResults = [];
    for(var i = 0; i < data.length; i++) {
      var item = data[i];

      var obs = {};
      obs.input = {};
      obs.output = {
        defaulted: item.seriousDlqin2yrs
      };

      //if the utilization rate is below 1, we divide it by 3 to make it smaller (taking the cube root would make it larger);
      if(item.revolvingUtilizationOfUnsecuredLines < 1) {
        obs.input.utilizationRate = item.revolvingUtilizationOfUnsecuredLines/3;
      } else {
        //otherwise we take the cube root of it, and then divide by 37 (which is the max number we would have after cube rooting ).
        obs.input.utilizationRate = Math.pow(item, 1/3)/37;
      }

      obs.input.age = item.age/109;
      obs.input.thirtyDaysLate = item.NumberOfTime30To59DaysPastDueNotWorse/98;
      obs.input.monthlyIncome = Math.sqrt(item.MonthlyIncome)/1735;
      obs.input.openCreditLines = Math.sqrt(item.NumberOfOpenCreditLinesAndLoans)/8;

      obs.input.ninetyDaysLate = Math.sqrt(item.NumberOfTimes90DaysLate)/10;

      obs.input.realEstateLines = item.NumberRealEstateLoansOrLines/54;

      obs.input.sixtyDaysLate = Math.sqrt(item.NumberOfTime60To89DaysPastDueNotWorse)/10;

      obs.input.numDependents = Math.sqrt(item.NumberOfDependents)/5;

      formattedResults.push(obs);
    }
    console.log('formatted the data');
    return formattedResults;

  }
};

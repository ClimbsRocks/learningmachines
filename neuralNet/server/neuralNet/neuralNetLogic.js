var db = require('../db');
var path = require('path');
var fs = require('fs');
//This line effectively means we've placed the "brain" object that brain.js gives us into the usable scope for this file. We have not yet done anything with that object- that's your task!
var brain = require('brain');

//TODO: your code here to create a new neural net instance

module.exports = {
  // this is our main entry point
  startNet: function(req,res) {
    // grab all the data from the db
    db.query('SELECT * FROM neuralNet', function(err, response) {
      if(err) {
        console.error(err);
      } else {
        // format that data. see that modular function below
        var formattedData = module.exports.formatData(response);
        var training = [];
        var testing = [];
        // split the data into a test set (20% of the data) and a training set (80% of the data)
        for(var i = 0; i < formattedData.length; i++) {
          if(Math.random() > .8) {
            testing.push(formattedData[i]);
          } else {
            training.push(formattedData[i]);
          }
        }
        // pass this formatted data into trainBrain
        module.exports.trainBrain(training, testing);
      }
    });
  },

  trainBrain: function(trainingData, testingData) {
    console.time('trainBrain');
    console.log('Training your very own Brain');

    //TODO: Your code here to train the neural net


    console.timeEnd('trainBrain');

    // once we've trained the brain, write it to json to back it up
    var jsonBackup = net.toJSON();
    console.log(jsonBackup);
    var runBackup = net.toFunction();
    module.exports.writeBrain(jsonBackup);

    // now test the results and see how our machine did!
    module.exports.testBrain(testingData);
  },

  //Test our brain with a given set of testData
  //Logs the output of default rate at that prediction level
  testBrain: function(testData) {
    //console.time gives us the time it takes to complete a task
    console.time('testBrain');
    //TODO: Your code here to get the predicted values for everything in our testData
    //The logging code provided for you below expects the predicted net values to be stored as properties on each item in testData under the property name nnPredictions. 
    //Here's what an object in the testData array should look like after you've gotten the predicted result from the net:
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

    

    // everything below is formatting the output
    // first we create a results obj with keys labeled 0 to 100
    // eash position in results is an object itself
      // Each position aggregates the count of loans the neural net has predicted have this level of risk
      // and the number of observed defaults at that level of risk
    var results = {};
    for(var j = 0; j <=100; j++) {
      results[j] = {
        nnCount: 0,
        defaulted: 0
      };
    }

    for(var i = 0; i < testData.length; i++) {
      //we format the net's prediction to be an int between 0 and 100
      var prediction = Math.round( testData[i].nnPredictions.defaulted * 100);
      //We then increment the total number of cases that the net predicts exist at this level of risk 
      // (i.e., if the net's prediction for a given input is .38745, we would add one more to the 39 category, since we now have one more observation that the net has predicted has a 39% chance of defaulting)
      results[prediction].nnCount++;
      //And whether this input resulted in a default or not
      results[prediction].defaulted += testData[i].output.defaulted;
    }

    //We don't like to assume the keys are going to be ordered, but it's a time-saving shortcut to make at the moment, and the consequences are very low if it's not perfectly ordered
    for(var key in results) {
      console.log(key + '- nnCount: ' + results[key].nnCount + ' defaulted: ' + results[key].defaulted + ' Default Rate: ' + Math.round(results[key].defaulted/results[key].nnCount * 100) );
    }
    console.timeEnd('testBrain');

    console.log(results);
  },

  //Takes our raw data input, roughly normalizes it, and transforms it into numbers between 0 and 1 like our net expects
  //You can ignore this until extra credit
  formatData: function(data) {

    console.log('formatting Data');
    var formattedResults = [];
    for(var i = 0; i < data.length; i++) {
      var item = data[i];

      var obs = {};
      obs.input = {};
      obs.output = {
        defaulted: item.seriousDelinquency
      };

      //if the utilization rate is below 1, we divide it by 3 to make it smaller (taking the cube root would make it larger);
      if(item.creditUtilization < 1) {
        obs.input.utilizationRate = item.creditUtilization/3;
      } else {
        //otherwise we take the cube root of it, and then divide by 37 (which is the max number we would have after cube rooting ).
        obs.input.utilizationRate = Math.pow(item, 1/3)/37;
      }

      obs.input.age = item.age/109;
      obs.input.thirtyDaysLate = item['30To60DaysLate'] / 98;
      obs.input.monthlyIncome = Math.sqrt(item.MonthlyIncome) / 1735;
      obs.input.openCreditLines = Math.sqrt(item.NumberOfOpenCreditLines)/8;

      obs.input.ninetyDaysLate = Math.sqrt(item['90DaysLate']) / 10;

      obs.input.realEstateLines = item.NumberOfRealEstateLoansOrLines/ 54;

      obs.input.sixtyDaysLate = Math.sqrt(item['60To89DaysLate']) / 10;

      obs.input.numDependents = Math.sqrt(item.NumberOfDependents) / 5;

      formattedResults.push(obs);
    }
    console.log('formatted the data');
    return formattedResults;

  },

  //Writes the neural net to a file for backup
  //You can ignore this 
  writeBrain: function(json) {
    var fileName = 'hiddenLayers' + net.hiddenSizes + 'learningRate' + net.learningRate + new Date().getTime();
    fs.writeFile(fileName, JSON.stringify(json), function(err) {
      if(err) {
        console.error('sad, did not write to file');
      } else {
        console.log('wrote to file',fileName);
      }
    });
  },

  // loads a saved neural net and tests it on the dataset
  // testing it on the entire dataset as we are doing here is an anti-pattern; you would want to test it only on a holdout set of test data that the machine hasn't already been trained on
  loadAndTestBrain: function(req,res) {
    db.query('SELECT * FROM neuralNet', function(err, response) {
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
  }

};

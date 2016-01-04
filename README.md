# A Conjurer's Introduction to Machine Learning in JavaScript
> Getting machine learning up and running is similar to picking up other external libraries. Take on these projects and you'll have solved problems using neural networks, random forests, and Support Vector Machines!

## PreCourse Steps:

* Fork and clone this repo (and I'm never opposed to some appreciation in the form of a star!)
* Download the kaggle data and move it to the right folder
    * https://www.kaggle.com/c/GiveMeSomeCredit/data
    * Move the data file to `learningMachines/neuralNet/server/neuralNet/train.csv`, and make sure it is named `train.csv`
* Use npm to install all dependencies
* Start the server!
    * `nodemon server.js`

You can now make api calls to this server, either through your browser (http://localhost:5000/neuralNet/startNet), or through curl on your command line `curl localhost:5000/neuralNet/startNet`

### The key files in our node server are in the neuralNet folder.
  1. neuralNetLogic.js is where we have all the actual JS logic built out. 

### Your turn!
Here are the things I expect you to do
  1. Create a new net
  2. Train that net
  3. Get predicted outcomes from that net in testing
  4. Add in new data to train the net. Rewrite what's currently in formatData with new data points, or 'features' as they're called in data science, that are combinations of the raw data we already have. Examples would include exact ratios that the net currently can't access because we've already transformed the data into a number between 0 and 1.

#### Extra Credit
  1. Handle cases that have missing data ("NA") differently than cases that have full data

#### Fantasy Mode
  1. Parallelize the training of multiple nets at the same time. Training each net is synchronous, so parallelizing won't help you train a single net any faster. But you could try creating multiple versions that have different parameters (number of nodes, hidden layers, learning rate, etc.) and train those in parallel with each other. 

  2. Build out grid search to try different combinations of number of hidden layers and number of nodes. 
    Trying different combinations of hyperparameters (the parameters that determine the shape or conditions of the algorithm, such as number of nodes, or number of hidden layers) to find the optimal set is called grid search. scikit-learn has a [good module explaining and implementing grid search](http://scikit-learn.org/stable/modules/generated/sklearn.grid_search.GridSearchCV.html). We can't use their implementation direction, but it's a good explanation of the high-level concept.

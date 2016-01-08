# Random Forests!
> One of the most effective and easy-to-use machine learning algorithms out there

## What's a random forest?
See the slides!
slides.com/ClimbsRocks/randomForests

## PreCourse Steps:

* Fork and clone this repo (and I'm never opposed to some appreciation in the form of a star!)
* Download the kaggle data and move it to the right folder
    * https://www.kaggle.com/c/titanic/data
    * Move the data file to `learningMachines/random_forest/server/neuralNet/train.csv`, and make sure it is named `train.csv`
* Use the provided shell script to install dependencies

## Your turn!
Here are the things I expect you to do
<!--   1. Create a new net
  2. Train that net
  3. Get predicted outcomes from that net in testing
  4. Add in new data to train the net. Rewrite what's currently in formatData with new data points, or 'features' as they're called in data science, that are combinations of the raw data we already have. Examples would include exact ratios that the net currently can't access because we've already transformed the data into a number between 0 and 1.
 -->
### Extra Credit
<!--   * Handle cases that have missing data ("NA") differently than cases that have full data
  * Perform any other feature engineering you can think of
 -->
### Fantasy Mode
<!--   - Parallelize the training of multiple nets at the same time. Training each net is synchronous, so parallelizing won't help you train a single net any faster. But you could try creating multiple versions that have different parameters (number of nodes, hidden layers, learning rate, etc.) and train those in parallel with each other. 

  - Build out grid search to try different combinations of number of hidden layers and number of nodes. 
    Trying different combinations of hyperparameters (the parameters that determine the shape or conditions of the algorithm, such as number of nodes, or number of hidden layers) to find the optimal set is called grid search. scikit-learn has a [good module explaining and implementing grid search](http://scikit-learn.org/stable/modules/generated/sklearn.grid_search.GridSearchCV.html). We can't use their implementation direction, but it's a good explanation of the high-level concept.
 -->

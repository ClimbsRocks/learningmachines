# python uses this "import" syntax to load in external modules, much like node.js uses "require" to load in modules.
# as with node.js, these modules can be core modules (like fs, or path), or external libraries (underscore, brainjs)
import sys
import os.path as path
import csv

# from ... import is simply a way of specifying a more specific path to find a module to import
from sklearn.cross_validation import train_test_split

# START SOLUTION CODE
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction import DictVectorizer
# END SOLUTION CODE

# START SOLUTION CODE
classifier = RandomForestClassifier(n_jobs=-1)
vectorizer = DictVectorizer(sparse=False)
# END SOLUTION CODE

# X is a matrix with the features for our training data (what information we know about each row, without the answers)
X = []
# y is the answer for each row
y = []

# read in the kaggle data
with open('titanic.csv', 'rU') as openInputFile:
    # csv.DictReader will take a csv file, and read it in as an array of python dictionaries (similar to JavaScript objects, or hashes)
    inputRows = csv.DictReader(openInputFile)
    # ignore the header row
    firstRow = False
    for row in inputRows:
        if(firstRow):
            # if possible, read in the data as floats (numbers with decimal points) rather than strings
            # for key in row:
            #     try:
            #         row[key] = float(row[key])
            #     except:
            #         pass
            X.append(row)
        else:
            headerRow = row
            firstRow = True

# TODO: binarize the categorical data in the categorical fields
# information like 'embarked' represents a category (which city did you embark in?) rather than a number (how much money did you pay for your fare?)
# a common way to format categorical data for machine learning is to turn it into binary values
# so if we have three categories ('C','Q',and 'S'), we would turn that into something like separate columns for 'embarkedC', 'embarkedQ', and 'embarkedS', with a value of either 0 or 1
# define your own binarize function here, that will take in categorical data, and turn it into a single binary representation of which category is present for this row
def binarize(columnName, columnValue, passengerObj):
    try:
        columnValue = str(columnValue)
    except:
        pass
    keyName = columnName + columnValue
    passengerObj[keyName] = 1
    return passengerObj

# this will hold our data once we've performed data cleaning and feature engineering
cleanedX = []

for row in X:
    # TODO: print out a row so you know what it looks like!

    # START SOLUTION CODE
    # print row
    # here is a sample of what a row will look like:
    # {'Fare': '7.75', 'Name': 'Dooley, Mr. Patrick', 'Embarked': 'Q', 'Age': '32', 'Parch': '0', 'Pclass': '3', 'Sex': 'male', 'Survived': '0', 'SibSp': '0', 'PassengerId': '891', 'Ticket': '370376', 'Cabin': ''}
    # END SOLUTION CODE

    # split out our y values (these are the answers we're looking for- in our case, whether this person survived or not)
    y.append(row['Survived'])
    del row['Survived']

    
    row = binarize('Pclass', row['Pclass'], row)
    row = binarize('SibSp', row['SibSp'], row)
    row = binarize('Parch', row['Parch'], row)
    row['Fare'] = float(row['Fare'])
    try:
        row['Age'] = float(row['Age'])
        row['ageMissing'] = 0
    except:
        row['ageMissing'] = 1
        
    row['SibSp'] = float(row['SibSp'])
    row['Parch'] = float(row['Parch'])

    # TODO: perform some feature engineering of your own! 
    # one idea: what is this person's total number of connections (siblings and parents)?
    # START SOLUTION CODE
    row['totalConnections'] = int(row['Parch']) + int(row['SibSp'])

    # if the cabin is known, grab the first letter from it, which might represent something useful like which deck they're on
    try:
        row['cabinDeck'] = row['Cabin'][0]
        row['hasAssignedCabin'] = 1
    except:
        row['hasAssignedCabin'] = 0
        pass
    row['TicketFirstChar'] = str(row['Ticket'])[0]
    # END SOLUTION CODE

    cleanedX.append(row)


# TODO: turn each row into a vector
# right now, each row is represented as a dictionary (python key-map/hash, the equivalent of an object in JS)
# but the random forest needs each row to be represented as a vector (a single-dimensional list, or what JavaScript-land would call a flat array)
# scikit-learn has a module that will turn a list into a dictionary- can you find it?
# START SOLUTION CODE
vectorizedX = vectorizer.fit_transform(cleanedX)
# END SOLUTION CODE

X_train, X_test, y_train, y_test = train_test_split(vectorizedX, y, test_size=.2)
classifier.fit( X_train, y_train )

# NOTE: if your score is really high (say, over 0.85), check to make sure you removed the answer from the information you gave the random forest to train on
# otherwise it's simply going to learn that the 'Survived' column you fed it is HIGHLY correlated with the answer
print 'Your random forest\'s score on the test data is:'
print classifier.score( X_test, y_test )


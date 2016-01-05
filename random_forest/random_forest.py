# import MySQLdb as mdb 
# import MySQLdb.cursors
import sys
import os.path as path
import csv


# X is a matrix with the features for our training data (what information we know about each row, without the answers)
X = []
# y is the answer for each row
y = []

with open('titanic.csv', 'rU') as openInputFile:
    # csv.DictReader will take a csv file, and read it in as an array of python dictionaries (similar to JavaScript objects, or hashes)
    inputRows = csv.DictReader(openInputFile)
    # ignore the header row
    firstRow = False
    for row in inputRows:
        if(firstRow):
            # if possible, read in the data as floats (numbers with decimal points) rather than strings
            for key, val in enumerate(row):
                try:
                    row[key] = float(val)
                except:
                    pass
                X.append(row)
        else:
            headerRow = row
            firstRow = True

print X

# transform:
    # name
    # sex
    # ticket
        # take only the letters in front of ticket. categorize that
        # if there is a good ticket number, include that

    # cabin
        # definitely parse out the leading letter here. that denotes the deck they're on. 
        # possibly parse out the number of cabins they have as well?
    # embarked
# TODO: binarize the categorical data in the categorical fields
# information like 'embarked' represents a category (which city did you embark in?) rather than a number (how much money did you pay for your fare?)
# a common way to format categorical data for machine learning is to turn it into binary values
# so if we have three categories ('C','Q',and 'S'), we would turn that into something like separate columns for 'embarkedC', 'embarkedQ', and 'embarkedS', with a value of either 0 or 1
# define your own binarize function here, that will take in categorical data, and turn it into a single binary representation of which category is present for this row
def binarize(columnName, columnValue):
    pass

cleanedX = []
# SOLUTION CODE BELOW
for row in X:
    # {'Fare': '7.75', 'Name': 'Dooley, Mr. Patrick', 'Embarked': 'Q', 'Age': '32', 'Parch': '0', 'Pclass': '3', 'Sex': 'male', 'Survived': '0', 'SibSp': '0', 'PassengerId': '891', 'Ticket': '370376', 'Cabin': ''}

    passenger = {}

    if row['Sex'] == 'female':
        passenger['is_female'] = 1
    else:
        passenger['is_male'] = 1

    passenger['Fare'] = row['Fare']

    passenger['Fare'] = row['Fare']


    cleanedX.append(passenger)
# END SOLUTION CODE

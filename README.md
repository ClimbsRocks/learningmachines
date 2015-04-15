# A Conjurer's Introduction to Machine Learning in JavaScript

PreCourse Steps:
* **Download the Kaggle data: https://www.kaggle.com/c/GiveMeSomeCredit/download/cs-training.csv**
  1. Move this file to your Desktop. 
* **Load into a MySQL database**
  1. In your terminal: `which mysql` to verify you have mysql installed. If you don't, `brew install mysql`.
  2. Start mysql server: 'mysql.server start'
  3. Enter mysql from your command line: 'mysql -u root'. Add the -p password flag if you have a password set up: 'mysql -u root -p'. This will prompt you for your password on the next line.
  4. Create a database to load this file into:
    1. `SHOW DATABASES;`
    2. `CREATE DATABASE learningMachines;`
    3. `SHOW DATABASES;` to verify it worked
    4. `USE learningMachines;` will switch into using the newly created database
  5. Create the table that you'll be loading the data into:
    1. This will create a table with all the right columns, and the right format for each column
    2. `CREATE TABLE IF NOT EXISTS neuralNet (
        id int NOT NULL AUTO_INCREMENT,
        seriousDelinquency int,
        creditUtilization float,
        age int,
        30To60DaysLate int,
        DebtRatio float,
        MonthlyIncome int,
        NumberOfOpenCreditLines int,
        90DaysLate int,
        NumberOfRealEstateLoansOrLines int,
        60To89DaysLate int,
        NumberOfDependents int,
        PRIMARY KEY (id)
      );`
    3. `SHOW TABLES;` should show neuralNet as a table
    4. `DESCRIBE neuralNet;`
  6. Load data from the download to the table you just created:
    1. Clean the data:
        1. Replace all ",NA" with ",0"
        2. Investigate your line endings. Some programs will save in an odd format by default. In Sublime Text, got to View, Line Endings, and then click on Unix. That will switch it to being what we'd expect to see, i.e., '\n'
    1. Back in your MySQL command prompt: 
        `LOAD DATA INFILE '/Users/preston/Desktop/cs-training.csv'
            INTO TABLE neuralNet 
            FIELDS TERMINATED BY ',' 
            ENCLOSED BY '"'
            LINES TERMINATED BY '\n'
            IGNORE 1 ROWS;`
    1. Verify the data has loaded correctly:
        1. `SELECT * FROM neuralNet LIMIT 15;` Should look like the fist 15 rows of your data
        2. `SELECT COUNT(id) FROM neuralNet;` Should return 150,000
* **Create a node.js server to do three things: Load data from MySQL db, process data to get it into the right format for our neural net, Run the neural net**
  1. If you're familiar with Node.js, try using my server as an inspiration to build your own
  2. If you're not familiar with Node.js, fork and clone my repo
    1. Go to https://github.com/ClimbsRocks/learningMachines and click Fork in the upper right. 
    2. `cd ~/Desktop` changes directory to the Desktop. Feel free to use whichever directory you want.
    3. `git clone https://github.com/YOUR_USERNAME_HERE/learningMachines` creates a folder on your Desktop that is a clone of your fork
    1. `cd learningmachines` changes the directory into that folder
    2. `subl .` to open up the folder in sublime, assuming you have the subl command installed
    3. Back in the terminal: `cd neuralNet`, and then `cd server`
    4. `npm install`. If this gives you an error, try `sudo npm install`
    5. `nodemon --max-old-space-size=3000 server.js`. This line does three things: it starts your node server based on the path you give it from the current directory (server.js). It starts nodemon on it, which means it will restart whenever you make a change to any file in the server directory. It allocates 3000 MB of memory to node, so that it doesn't crash if node runs over the 1.76 GB typically allocated to Node.js. You can adjust this number based on your system's capabilities and the problem you're solving.
    6. You can now make api calls to this server, either through your browser (http://localhost:5000/neuralNet/startNet), or through curl on your command line `curl localhost:5000/neuralNet/startNet`
    7. You now have a running node server on your computer, with all the right dependencies installed!
* **The key files in our node server are in the neuralNet folder.**
  1. neuralNetLogic.js is where we have all the actual JS logic built out. 

* **Your turn!**
Here are the things I expect you to do
  1. Create a new net
  2. Train that net
  3. Get predicted outcomes from that net in testing
  4. Add in new data to train the net. Rewrite what's currently in formatData with new data points, or 'features' as they're called in data science, that are combinations of the raw data we already have. Examples would include exact ratios that the net currently can't access because we've already transformed the data into a number between 0 and 1.

* **Extra Credit**
  1. Handle cases that have missing data ("NA") differently than cases that have full data

* **Fantasy Mode**
  1. Parallelize the training of multiple nets at the same time. Training each net is synchronous, so parallelizing won't help you train a single net any faster. But you could try creating multiple versions that have different parameters (number of nodes, hidden layers, learning rate, etc.) and train those in parallel with each other. 

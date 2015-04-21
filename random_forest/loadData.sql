LOAD DATA INFILE '/Users/preston/Desktop/train.csv'
            INTO TABLE random_forest 
            FIELDS TERMINATED BY ',' 
            ENCLOSED BY '"'
            LINES TERMINATED BY '\n'
            IGNORE 1 ROWS;
#!/bin/bash
# all .js files, exclusing the node_modules folder
FILES=`find . -path ./neuralNet/server/node_modules -prune -o -name "*.js"`

# for loop to read each file
for f in $FILES
do
  # remove (in place with the -i '' flag that only works on os x) everything in between the solution tags, inclusive of the solution tag lines themselves
  sed -i '' '/START SOLUTION CODE/,/END SOLUTION CODE/d' $f
done

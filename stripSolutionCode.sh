#!/bin/bash
# ALL HTML FILES
FILES="*.js"
# for loop read each file
for f in $FILES
do
INF="$f"
OUTF="$f.out.tmp"
# replace javascript
sed '/START SOLUTION CODE/,/END SOLUTION CODE/d' $INF > $OUTF
/bin/cp $OUTF $INF
/bin/rm -f $OUTF
done

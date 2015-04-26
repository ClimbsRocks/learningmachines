import MySQLdb as mdb 
import MySQLdb.cursors
import sys


try:
    con = mdb.connect(host='localhost', user='root', db='learningMachines')
    cur = con.cursor(cursorclass=MySQLdb.cursors.DictCursor)
    cur.execute('SELECT * FROM random_forest')

    print 'connected to and about to query db'

    data = cur.fetchall()

    print data[0]

    allData = []

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
    def binarize:

    # SOLUTION CODE BELOW
    for row in data:
        # {'fare': 7.25, 'passenger': 'Braund, Mr. Owen Harris', 'embarked': 'S', 'age': 22L, 'pClass': 3L, 'sex': 'male', 'parents': 0L, 'survived': 0L, 'siblings': 1L, 'ticket': 'A/5 21171', 'passengerId': 1L, 'cabin': ''}

        passenger = {}

        if row['sex'] == 'female':
            passenger['is_female'] = 1
        else:
            passenger['is_male'] = 1

        passenger['age'] = row['age']

        pasenger['fare'] = row['fare']



        allData.append(passenger)



except mdb.Error, e:
    print 'Error %d: %s' % (e.args[0], e.args[1])
    sys.exit()

import MySQLdb as mdb 
import MySQLdb.cursors
import sys


try:
    con = mdb.connect(host='localhost', user='root', db='learningMachines')
    cur = con.cursor(cursorclass=MySQLdb.cursors.DictCursor)
    cur.execute('SELECT * FROM random_forest')

    print 'connected to and about to query db'

    data = cur.fetchall()

    print data


except mdb.Error, e:
    print 'Error %d: %s' % (e.args[0], e.args[1])
    sys.exit()

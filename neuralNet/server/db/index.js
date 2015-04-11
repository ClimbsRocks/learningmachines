var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: 'root',
  database: 'nnCredit'
});

// dbConnection.connect();

module.exports = dbConnection;

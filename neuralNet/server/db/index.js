var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: 'root',
  database: 'learningMachines'
});

// dbConnection.connect();

module.exports = dbConnection;

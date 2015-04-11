var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: 'root',
  database: 'learningMachines'
});

module.exports = dbConnection;

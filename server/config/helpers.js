'use strict';

module.exports = {
  errorLogger: function(error, req, res, next) {
    // log the error then send it to the next middleware in
    // middleware.js
    console.error(error.stack);
    next(error);
  },
  errorHandler: function(error, req, res, next) {
    // send error message to client
    // message for graceful error handling on app
    res.status(500).send({error: error.message});
  }
};

'use strict';

var mysql = require('mysql');

module.exports = {
  // keep the stablished conneciton
  connection: null,

  // keep the raw configuration
  config: {
    host     : '',
    user     : '',
    password : '',
    database : '',
    port     : ''
  },
  
  // handle a new connection
  connect: function (configObj) {
    // TODO: Make validation
    return new Promise((resolve, reject) => {
      this.config = Object.assign(this.config, configObj);
      this.connection = mysql.createConnection(this.config);
      this.connection.connect((error) => {
        if (error) {
          reject(error.code);
        } else {
          resolve();
        }
      });
    });
  },

  disconnect: function() {
    //this.connection.end();
  }

};

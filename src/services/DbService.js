'use strict';

var mysql = require('mysql');
var PS = require('./PaginationService');

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
  
  /** 
   * Handle a new connection
   */
  connect: function(configObj) {
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

  /** 
   * Finish current connection 
   */
  disconnect: function() {
    //this.connection.end();
  },

  /* QUERY DATABASE **************************/

  /** 
   * Get query from database
   * @param qs {String} Query string
   * @return Promise
   */
  getQuery: function(qs) {
    return new Promise((resolve, reject) => {
      this.connection.query(qs, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  },

  /** 
   * Get all databases with the current DB connection
   * @return Promise
   */
  getDatabases: function() {
    return this.getQuery('show databases');
  },

  /** 
   * Get all tables from the current DB connected
   * @return Promise
   */
  getTables: function() {
    let dbName = this.config.database;
    let qs = `SELECT TABLE_NAME as 'name' FROM information_schema.TABLES t WHERE TABLE_SCHEMA = '${dbName}'`;
    return this.getQuery(qs);
  },

  /** 
   * Get info from some table
   * @param {String} tableName Name of the table 
   * @return Promise
   */
  getTableInfo: function(tableName) {
    let dbName = this.config.database;
    let qs = `SELECT * FROM information_schema.TABLES WHERE TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`;
    return this.getQuery(qs);
  },

  /** 
   * Get structure from some table
   * @param {String} tableName Name of the table 
   * @return Promise
   */
  getTableStructure: function(tableName) {
    let dbName = this.config.database;
    let qs = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`;
    return this.getQuery(qs);
  },

  /** 
   * Get content (data) from some table
   * @param {String} tableName Name of the table 
   * @param {Number} page      Page to show (pagination) 
   * @return Promise
   */
  getTableContent: function(tableName, page) {
    let dbName = this.config.database;
    let limit = PS.maxRowsPerPage;
    let ofset = 0;
    if (page > 1) {
      ofset = limit * (page -1);
    }
    let qs = `SELECT * FROM ${dbName}.${tableName} LIMIT ${ofset}, ${limit}`;
    return this.getQuery(qs);
  },

  /** 
   * Get indexes from some table
   * @param {String} tableName Name of the table 
   * @return Promise
   */
  getTableIndex: function(tableName) {
    let dbName = this.config.database;
    let qs = `SHOW INDEXES FROM ${dbName}.${tableName}`;
    return this.getQuery(qs);
  },

  /** 
   * Get total rows of one table
   * @param {String} tableName Name of the table 
   * @return Promise
   */
  getTotalRows: function(tableName) {
    let dbName = this.config.database;
    let qs = `SELECT SUM(TABLE_ROWS) AS rows FROM INFORMATION_SCHEMA.TABLES WHERE `;
    qs += `TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`;
    return this.getQuery(qs);
  }

};

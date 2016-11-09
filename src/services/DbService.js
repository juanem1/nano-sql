'use strict';

var mysql = require('mysql');
var PS = require('./PaginationService');

module.exports = {

  // keep the stablished conneciton
  connection: null,

  /**
   * Keep all databases in a single array
   * This array is populated in the first load
   */ 
  databases: [],

  // Keep the name of the current selected database
  selectedDatabase: '',

  // keep the raw configuration for the connection
  config: {
    host     : '',
    user     : '',
    password : '',
    database : '',
    port     : ''
  },

  // Default params for databases
  defaultEncoding: 'utf8',
  defaultCollation: 'utf8_general_ci',
  
  /** 
   * Handle a new connection
   */
  connect (configObj) {
    // TODO: Make validation
    return new Promise((resolve, reject) => {
      this.config = Object.assign(this.config, configObj);
      this.connection = mysql.createConnection(this.config);
      this.connection.connect((error) => {
        if (error) {
          reject(error.code);
        } else {
          // If there is a database in the connection, set it as selected
          if (this.config.database) {
            this.selectedDatabase = this.config.database; 
          }
          resolve();
        }
      });
    });
  },

  /** 
   * Finish current connection 
   */
  disconnect () {
    this.connection.end();
    let reset = {host:'', user:'', password:'', database:'', port:''};
    this.config = Object.assign(this.config, reset);
  },

  /* QUERY DATABASE **************************/

  /** 
   * Get query from database
   * @param qs {String} Query string
   * @return Promise
   */
  getQuery (qs) {
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
  getDatabases () {
    return new Promise((resolve, reject) => {
      this.getQuery('show databases')
        .then((response) => {
          let dbs = [];
          if (response.length) {
            response.forEach(item => dbs.push(item.Database));
          }
          resolve(dbs);
        })
        .catch(error => reject(error));
    });
  },

  /** 
   * Get all tables from the current DB connected
   * @return Promise
   */
  getTables () {
    let dbName = this.selectedDatabase;
    let qs = `SELECT TABLE_NAME as 'name' FROM information_schema.TABLES t WHERE TABLE_SCHEMA = '${dbName}'`;
    return this.getQuery(qs);
  },

  /** 
   * Get info from some table
   * @param {String} tableName Name of the table 
   * @return Promise
   */
  getTableInfo (tableName) {
    let dbName = this.selectedDatabase;
    let qs = `SELECT * FROM information_schema.TABLES WHERE TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`;
    return this.getQuery(qs);
  },

  /** 
   * Get structure from some table
   * @param {String} tableName Name of the table 
   * @return Promise
   */
  getTableStructure (tableName) {
    let dbName = this.selectedDatabase;
    let qs = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`;
    return this.getQuery(qs);
  },

  /** 
   * Get content (data) from some table
   * @param {String} tableName Name of the table 
   * @param {Number} page      Page to show (pagination) 
   * @return Promise
   */
  getTableContent (tableName, page) {
    let dbName = this.selectedDatabase;
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
  getTableIndex (tableName) {
    let dbName = this.selectedDatabase;
    let qs = `SHOW INDEXES FROM ${dbName}.${tableName}`;
    return this.getQuery(qs);
  },

  /** 
   * Get total rows of one table
   * @param {String} tableName Name of the table 
   * @return Promise
   */
  getTotalRows (tableName) {
    let dbName = this.selectedDatabase;
    let qs = `SELECT SUM(TABLE_ROWS) AS rows FROM INFORMATION_SCHEMA.TABLES WHERE `;
    qs += `TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`;
    return this.getQuery(qs);
  },

  // ---- CREATION QUERYS ------------ 

  /** 
   * Create new database with default params
   * @param {String} dbName The name of the new database 
   * @return Promise
   */
  createDatabase (dbName) {
    let qs = `CREATE DATABASE ${dbName} CHARACTER SET ${this.defaultEncoding} `;
    qs += `COLLATE ${this.defaultCollation}`;
    return this.getQuery(qs);
  }

};

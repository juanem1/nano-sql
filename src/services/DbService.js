'use strict'

var PS    = require('./PaginationService')
var mysql = require('./db_drivers/mysql')
var mssql = require('./db_drivers/mssql')

module.exports = {

  // keep the raw configuration for the connection
  config: {
    type: 'mysql',
    host: '',
    user: '',
    password: '',
    database: '',
    port: ''
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
      let conn = null;
      this.config = Object.assign(this.config, configObj);
      if (configObj.type === 'mysql') {
        conn = mysql.connect(this.config)
      } else if (configObj.type === 'mssql') {
        conn = mssql.connect(this.config)
      } else {
        console.error('Invalid DRIVER')
      }
      
      conn.then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      });

    })
  },

  /**
   * Finish current connection
   */
  disconnect () {
    this.connection.end()
    let reset = {host: '', user: '', password: '', database: '', port: ''}
    this.config = Object.assign(this.config, reset)
  },

  /* QUERY DATABASE **************************/

  /**
   * Get all databases with the current DB connection
   * @return Promise
   */
  getDatabases () {
    if (this.config.type === 'mysql') {
      return mysql.getDatabases()
    } else if (this.config.type === 'mssql') {
      return mssql.getDatabases()
    }
  },

  /**
   * Get all tables from the current DB connected
   * @param {String} dbName Database name
   * @return Promise
   */
  getTables (dbName) {
    if (this.config.type === 'mysql') {
      return mysql.getTables(dbName)
    } else if (this.config.type === 'mssql') {
      return mssql.getTables(dbName)
    }
  },

  /**
   * Get info from some table
   * @param {String} dbName Database name
   * @param {String} tableName Name of the table
   * @return Promise
   */
  getTableInfo (dbName, tableName) {
    let qs = `SELECT * FROM information_schema.TABLES WHERE TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`
    return this.getQuery(qs)
  },

  /**
   * Get structure from some table
   * @param {String} dbName Database name
   * @param {String} tableName Name of the table
   * @return Promise
   */
  getTableStructure (dbName, tableName) {
    let qs = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`
    return this.getQuery(qs)
  },

  /**
   * Get content (data) from some table
   * @param {String} dbName    Database name
   * @param {String} tableName Name of the table
   * @param {Number} page      Page to show (pagination)
   * @return Promise
   */
  getTableContent (dbName, tableName, page) {
    let limit = PS.maxRowsPerPage
    let ofset = 0
    if (page > 1) {
      ofset = limit * (page - 1)
    }
    let qs = `SELECT * FROM ${dbName}.${tableName} LIMIT ${ofset}, ${limit}`
    return this.getQuery(qs)
  },

  /**
   * Get indexes from some table
   * @param {String} dbName Database name
   * @param {String} tableName Name of the table
   * @return Promise
   */
  getTableIndex (dbName, tableName) {
    let qs = `SHOW INDEXES FROM ${dbName}.${tableName}`
    return this.getQuery(qs)
  },

  /**
   * Get total rows of one table
   * @param {String} dbName Database name
   * @param {String} tableName Name of the table
   * @return Promise
   */
  getTotalRows (dbName, tableName) {
    let qs = `SELECT SUM(TABLE_ROWS) AS rows FROM INFORMATION_SCHEMA.TABLES WHERE `
    qs += `TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`
    return this.getQuery(qs)
  },

  /**
   * Get create statement for a table
   * @param {String} dbName Database name
   * @param {String} tableName Name of the table
   * @return Promise
   */
  getCreateStatement (dbName, tableName) {
    let qs = `SHOW CREATE TABLE ${dbName}.${tableName}`
    return this.getQuery(qs)
  },

  // ---- CREATION QUERYS ------------

  /**
   * Create new database with default params
   * @param {String} dbName The name of the new database
   * @return Promise
   */
  createDatabase (dbName) {
    let qs = `CREATE DATABASE ${dbName} CHARACTER SET ${this.defaultEncoding} `
    qs += `COLLATE ${this.defaultCollation}`
    return this.getQuery(qs)
  },

  // ---- DELETION QUERYS ------------

  /**
   * Delete one database
   * @param {String} dbName The name of the database
   * @return Promise
   */
  deleteDatabase (dbName) {
    return this.getQuery(`DROP DATABASE ${dbName}`)
  }

}

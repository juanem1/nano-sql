'use strict'

var mysql = require('mysql')

let connection = null

module.exports = {
  
  connect (config) {
    // TODO: Make validation
    return new Promise((resolve, reject) => {
      connection = mysql.createConnection(config);
      connection.connect((error) => {
        if (error) {
          reject(error.code)
        } else {
          resolve()
        }
      })
    })
  },

  /**
   * Get query from database
   * @param qs {String} Query string
   * @return Promise
   */
  getQuery (qs) {
    return new Promise((resolve, reject) => {
      connection.query(qs, (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  },

  /**
   * Get all databases with the current DB connection
   * @return Promise
   */
  getDatabases () {
    return new Promise((resolve, reject) => {
      this.getQuery('show databases')
        .then((response) => {
          let dbs = []
          if (response.length) {
            response.forEach(item => dbs.push(item.Database))
          }
          resolve(dbs)
        })
        .catch(error => reject(error))
    })
  },

  /**
   * Get all tables from the current DB connected
   * @param {String} dbName Database name
   * @return Promise
   */
  getTables (dbName) {
    let qs = `SELECT TABLE_NAME as 'name' FROM information_schema.TABLES t WHERE TABLE_SCHEMA = '${dbName}'`
    return this.getQuery(qs)
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

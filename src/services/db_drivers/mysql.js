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

}

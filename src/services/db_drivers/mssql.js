'use strict'

var mssql = require('mssql')

module.exports = {

  makeConnectionString (config) {
    return `mssql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}?encrypt=true`
  },
  
  connect (config) {
    return new Promise((resolve, reject) => {
      let connStr = this.makeConnectionString(config)
      let connection = mssql.connect(connStr)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
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
      new mssql.Request().query(qs)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
      })
  },

  /**
   * Get all databases with the current DB connection
   * @return Promise
   */
  getDatabases () {
    return new Promise((resolve, reject) => {
      this.getQuery('SELECT name FROM master.dbo.sysdatabases')
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
    let qs = `SELECT TABLE_NAME as 'name' FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG='${dbName}'`
    return this.getQuery(qs)
  },

}

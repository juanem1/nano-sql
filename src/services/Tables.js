'use strict';

class Tables {

  constructor() {
    this.DB = require('./DB');
  }

  getQuery(qs) {
    return new Promise((resolve, reject) => {
      this.DB.connection.query(qs, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  getTables() {
    let dbName = this.DB.config.database;
    let qs = `SELECT TABLE_NAME as 'name' FROM information_schema.TABLES t WHERE TABLE_SCHEMA = '${dbName}'`;
    return this.getQuery(qs);
  }

  getTableInfo(tableName) {
    let dbName = this.DB.config.database;
    let qs = `SELECT * FROM information_schema.TABLES WHERE TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`;
    return this.getQuery(qs);
  }

  getTableStructure(tableName) {
    let dbName = this.DB.config.database;
    let qs = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${dbName}' AND TABLE_NAME = '${tableName}'`;
    return this.getQuery(qs);
  }

  getTableContent(tableName) {
    let qs = `SELECT * FROM ${tableName} LIMIT 10`;
    return this.getQuery(qs);
  }

  getTableIndex(tableName) {
    let qs = `SHOW INDEXES FROM ${tableName}`;
    return this.getQuery(qs);
  }
}

module.exports = Tables;

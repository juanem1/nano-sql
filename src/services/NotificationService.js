'use strict';

const success = require('../img/success.png');
const error   = require('../img/error.png');

module.exports = {

  /**
   * Show success notification
   * @param {Srting} title
   * @param {String} message
   */
  success(title, message) {
    new Notification(title, {
      body: message,
      icon: '../' + success
    });
  },

  /**
   * Show error notification
   * @param {Srting} title
   * @param {String} message
   */
  error(title, message) {
    new Notification(title, {
      body: message,
      icon: '../' + error
    });
  }
  
};

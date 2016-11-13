'use strict';

import miniToastr from 'mini-toastr';
const toastr = miniToastr.init();

module.exports = {

  defaultDuration: 5000,

  /**
   * Show success notification
   * @param {Srting} title
   * @param {String} message
   */
  success(title, message) {
    toastr.success(message, title, this.defaultDuration);
  },

  /**
   * Show error notification
   * @param {Srting} title
   * @param {String} message
   */
  error(title, message) {
    toastr.error(message, title, this.defaultDuration);
  }
  
};

'use strict';

module.exports = {
  
  maxRowsPerPage: 100,

  /** 
   * Determine if I need to show controls or not
   * @param {Integer} totalRows Total rows in some table 
   * @return Bolean
   */
  showControls: function(totalRows) {
    return (totalRows <= this.maxRowsPerPage) ? false : true;
  },

  /** 
   * Return the amount of pages for the pagination
   * @param {Integer} totalRows Total rows in some table 
   * @return Integer
   */
  getPages: function(totalRows) {
    return Math.ceil(totalRows / this.maxRowsPerPage);
  },


};
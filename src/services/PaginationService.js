'use strict';

module.exports = {
  
  maxRowsPerPage: 100,

  /** 
   * Generate label to show count of rows
   * @param {Integer} totalRows Total rows in some table 
   * @return String
   */
  rowsLabel: function(totalRows) {
    if (totalRows <= this.maxRowsPerPage) {
      return `${totalRows} rows in table`;
    } else {
      return `Rows 1 - ${this.maxRowsPerPage} of ${totalRows}`;
    }
  },

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

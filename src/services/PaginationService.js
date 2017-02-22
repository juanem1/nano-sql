'use strict'

module.exports = {

  maxRowsPerPage: 100,

  /**
   * Determine if I need to show controls or not
   * @param {Integer} totalRows Total rows in some table
   * @return Bolean
   */
  showControls (totalRows) {
    return totalRows >= this.maxRowsPerPage
  },

  /**
   * Return the amount of pages for the pagination
   * @param {Integer} totalRows Total rows in some table
   * @return Integer
   */
  getPages (totalRows) {
    return Math.ceil(totalRows / this.maxRowsPerPage)
  }

}

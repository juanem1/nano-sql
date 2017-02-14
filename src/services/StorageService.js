'use strict'

module.exports = {

  /**
   * Set one element in the store
   * @param {String} key
   * @param {String} value
   */
  setItem (key, value) {
    window.localStorage.setItem(key, value)
  },

  /**
   * Return one value from the store or null of not exist
   * @param {String} key Key to return from the store
   * @return String
   */
  getItem (key) {
    return window.localStorage.getItem(key)
  }

}

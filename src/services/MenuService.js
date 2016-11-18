'use strict';

const _ = require('lodash');
const menu = require('electron').Menu;

module.exports = {

  /**
   * Enable one item from the top menu
   * @param {String} item 
   */
  enableItem (item) {
    this.toggleState(item, true);
  },

  /**
   * Enable one item from the top menu
   * @param {String} item 
   */
  disableItem (item) {
    this.toggleState(item, false);
  },

  /**
   * Private method
   * Toggle state for some menu item
   * @param {String} item 
   */
  toggleState (item, state) {
    const appMenu = menu.getApplicationMenu();
    let obj = {};
    switch(item) {
      case 'add-database':
        obj = _.find(appMenu.items, ['label', 'Database']);
        obj.submenu.items[0].enabled = state;
        break;
      case 'manage-databases':
        obj = _.find(appMenu.items, ['label', 'Database']);
        obj.submenu.items[2].enabled = state;
        break;
      case 'disconnect':
        debugger;
        obj = _.find(appMenu.items, ['label', 'File']);
        obj.submenu.items[0].enabled = state;
        break;
      case 'show-create-table':
        debugger;
        obj = _.find(appMenu.items, ['label', 'Tables']);
        obj.submenu.items[0].enabled = state;
        break;
    }
  }

};

'use strict';

const _ = require('lodash');
const menu = require('electron').Menu;
const mainMenu = require('../bootstrap/menu');
const devMenu = require('../bootstrap/dev-menu');

module.exports = {

  /**
   * Create main menu
   * @param {Boolean} isDev If the build is in dev or prod
   */
  make(isDev) {
    if (isDev) {
      mainMenu.push(devMenu);
    }
    menu.setApplicationMenu(
      menu.buildFromTemplate(mainMenu)
    );
  },

  /**
   * Enable one item from the top menu
   * @param {String} item 
   */
  enableItem (item) {
    const appMenu = menu.getApplicationMenu();
    let obj = {};
    switch(item) {
      case 'add-database':
        obj = _.find(appMenu.items, ['label', 'Database']);
        obj.submenu.items[0].enabled = true;
        break;
      case 'disconnect':
        debugger;
        obj = _.find(appMenu.items, ['label', 'File']);
        obj.submenu.items[0].enabled = true;
        break;
    }
  },

  /**
   * Enable one item from the top menu
   * @param {String} item 
   */
  disableItem (item) {
    const appMenu = menu.getApplicationMenu();
    let obj = {};
    switch(item) {
      case 'add-database':
        obj = _.find(appMenu.items, ['label', 'Database']);
        obj.submenu.items[0].enabled = false;
        break;
      case 'disconnect':
        debugger;
        obj = _.find(appMenu.items, ['label', 'File']);
        obj.submenu.items[0].enabled = false;
        break;
    }
  }

};

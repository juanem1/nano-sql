'use strict';

const _ = require('lodash');
const menu = require('electron').Menu;
const mainMenu = require('../bootstrap/menu');
const devMenu = require('../bootstrap/dev-menu');

const appMenu = menu.getApplicationMenu();

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
  enableItem(item) {
    switch(item) {
      case 'add-database':
        let obj = _.find(appMenu.items, ['sublabel', 'database']);
        obj.submenu.items[0].enabled = true;
        break;
    }
  }

};

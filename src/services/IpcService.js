'use strict';

const ipcMain = require('electron').ipcMain;
const MenuService = require('./MenuService');

/*
In the vue file
const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.send('enable-menu-item', 'add-database');
*/

module.exports = {
  
  // Register all handlers for listen events
  init() {
    this.enableMenuItem();
    this.disableMenuItem();
  },

  enableMenuItem () {
    ipcMain.on('enable-menu-item', (event, param) => {
      MenuService.enableItem(param);
    });
  },

  disableMenuItem () {
    ipcMain.on('disable-menu-item', (event, param) => {
      MenuService.disableItem(param);
    });
  }

};

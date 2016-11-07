'use strict';

const ipcMain = require('electron').ipcMain;
const MenuService = require('./MenuService');

/*
In the vue file
const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.send('enable-menu-item', 'add-database');
*/

module.exports = {
  
  // Set the handdlers to attach
  init() {
    this.enableMenuItem();
  },

  enableMenuItem() {
    ipcMain.on('enable-menu-item', (event, param) => {
      MenuService.enableItem(param);
    });
  }

};

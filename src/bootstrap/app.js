'use strict';

const ipcService = require('../services/IpcService');
const menuService = require('../services/MenuService');
const DevToolsService = require('../services/DevToolsService');

module.exports = {
  
  // Electron App
  electronApp: null,
  
  // Electron Browser Window
  browserWindow: null,

  // App Main Window
  mainWindow: null,

  // True / False to show dev tools
  isDev: true, 

  // Config of main window
  mainWindowConfig: {width: 1200, height: 600, titleBarStyle: 'hidden'},

  createWindow() {
    this.mainWindow = new this.browserWindow(this.mainWindowConfig);
    this.mainWindow.loadURL(`file://${__dirname}/../index.html`);
    this.mainWindow.maximize();

    menuService.make(this.isDev);

    this.mainWindow.on('closed', function () {
      this.mainWindow = null;
    });
  },

  // Bootstrap application
  init() {
    this.createWindow();
    ipcService.init();
    // If I'm in dev mode open console and load vue extension
    DevToolsService.init(this.mainWindow, this.browserWindow, this.isDev);
  },

  // Handle Electron Events

  onReady() {
    this.init();
  },

  onActivate () {
    if (this.mainWindow === null) {
      this.init();
    }
  },

  onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      this.electronApp.quit();
    }
  }

};

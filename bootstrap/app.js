'use strict';

const NativeMenu = require('electron').Menu;
const DevTools = require('./dev-tools');
const IpcMain = require('./ipcMain');
const mainMenu = require('./menu');
const devMenu = require('./dev-menu');

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
    this.mainWindow.loadURL(`file://${__dirname}/../src/index.html`);
    this.mainWindow.maximize();
    this.mainWindow.on('closed', function () {
      this.mainWindow = null;
    });
  },

  createMenu() {
    if (this.isDev) {
      mainMenu.push(devMenu);
    }
    NativeMenu.setApplicationMenu(
      NativeMenu.buildFromTemplate(mainMenu)
    );
  },

  // Bootstrap application
  init() {
    // Cerate main window
    this.createWindow();
    // Crate native main menu
    this.createMenu();
    // Register event handler for native menu
    IpcMain.register();
    // If I'm in dev mode open console and load vue extension
    DevTools.init(this.mainWindow, this.browserWindow, this.isDev);
  },

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

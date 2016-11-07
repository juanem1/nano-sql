'use strict';

const templateMenu = require('./menu');

let App = {
  
  // Electron App
  electronApp: null,
  
  // Electron Menu  
  menu: null,

  // Electron Browser Window
  browserWindow: null,

  // App Main Window
  mainWindow: null,

  mainWindowConfig: {width: 1200, height: 600, titleBarStyle: 'hidden'},

  createMenu() {
    this.menu.setApplicationMenu(
      this.menu.buildFromTemplate(templateMenu)
    );
  },

  createWindow() {
    this.mainWindow = new this.browserWindow(this.mainWindowConfig);
    this.mainWindow.loadURL(`file://${__dirname}/../index.html`);
    this.mainWindow.maximize();
    //this.mainWindow.webContents.openDevTools();
    //BrowserWindow.addDevToolsExtension('/Users/juane/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/2.1.2_0');
    this.mainWindow.on('closed', function () {
      this.mainWindow = null;
    });
  },

  // Bootstrap application
  init() {
    this.createMenu();
    this.createWindow();
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

module.exports = App;

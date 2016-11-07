'use strict';

const templateMenu = require('./menu');
const devMenu = require('./dev-menu');

let App = {
  
  // Electron App
  electronApp: null,
  
  // Electron Menu  
  menu: null,

  // Electron Browser Window
  browserWindow: null,

  // App Main Window
  mainWindow: null,

  // True / False to show dev tools
  isDev: true, 

  // Config of main window
  mainWindowConfig: {width: 1200, height: 600, titleBarStyle: 'hidden'},

  setDevMenu() {
    this.mainWindow.webContents.openDevTools();
    this.browserWindow.addDevToolsExtension('/Users/juane/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/2.1.2_0');
  },

  createMenu() {
    if (this.isDev) {
      templateMenu.push(devMenu);
    }
    this.menu.setApplicationMenu(
      this.menu.buildFromTemplate(templateMenu)
    );
  },

  createWindow() {
    this.mainWindow = new this.browserWindow(this.mainWindowConfig);
    this.mainWindow.loadURL(`file://${__dirname}/../index.html`);
    this.mainWindow.maximize();
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

'use strict';

const electron = require('electron');
const App = require('./src/bootstrap/app');

const electronApp = electron.app;

App.electronApp   = electronApp;
App.menu          = electron.Menu;
App.browserWindow = electron.BrowserWindow;

electronApp.on('ready', () => App.onReady());
electronApp.on('activate', () => App.onActivate());
electronApp.on('window-all-closed', () => App.onWindowAllClosed());

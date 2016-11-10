'use strict';

const electron = require('electron');
const App = require('./bootstrap/app');

const electronApp = electron.app;

App.electronApp   = electronApp;
App.browserWindow = electron.BrowserWindow;

electronApp.on('ready', () => App.onReady());
electronApp.on('activate', () => App.onActivate());
electronApp.on('window-all-closed', () => App.onWindowAllClosed());

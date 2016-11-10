'use strict';

const shell = require('electron').shell;

let menu = [
  {
    label: 'Main',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }, {
    label: 'File',
    submenu: [
      { 
        label: 'Disconnect',
        enabled: false,
        click (item, focusedWindow) {
          focusedWindow.webContents.send('disconnect');
        }
      }
    ]
  }, {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  }, {
    label: 'Database',
    submenu: [
      {
        label: 'Add Database',
        enabled: false,
        click (item, focusedWindow) {
          focusedWindow.webContents.send('add-database');
        }
      }, { 
        type: 'separator' 
      }, {
        label: 'Manage Databases',
        enabled: false,
        click (item, focusedWindow) {
          focusedWindow.webContents.send('manage-databases');
        }
      }
    ]
  }, {
    role: 'help',
    submenu: [
      {
        label: 'Report an Issue...',
        click () { 
          shell.openExternal('https://github.com/juanem1/nano-sql/issues') 
        }
      }, {
        label: 'Documentation',
        click () { 
          shell.openExternal('https://juanem1.gitbooks.io/nano-sql/content') 
        }
      }, {
        label: 'Github',
        click () { 
          shell.openExternal('https://github.com/juanem1/nano-sql') 
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  menu.unshift({
    label: 'Nano SQL',
    submenu: [
      { role: 'about' }, 
      { type: 'separator' }, 
      { 
        role: 'services',
        submenu: []
      }, 
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  });
}

module.exports = menu;

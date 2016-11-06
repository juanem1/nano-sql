const menu = [
  {
    label: 'Main',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }, {
    label: 'Database',
    submenu: [
      {
        label: 'Add Database',
        click() { require('electron').shell.openExternal('http://electron.atom.io') }
      }
    ]
  }, {
    label: 'Develop',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      }
    ]
  }
];

module.exports = menu;

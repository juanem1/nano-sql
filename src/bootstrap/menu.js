const menu = [
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
      }
    ]
  }
];

module.exports = menu;

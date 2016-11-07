const menu = [
  {
    label: 'Main',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },{
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
        click() { require('electron').shell.openExternal('http://electron.atom.io') }
      }
    ]
  }
];

module.exports = menu;

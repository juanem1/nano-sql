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
    sublabel: 'database', // don't change. Used to find this item
    submenu: [
      {
        label: 'Add Database',
        enabled: false
      }
    ]
  }
];

module.exports = menu;

'use strict';

module.exports = {

  /**
   * This is the path on my machine, feel free to change it or disable it.
   */
  vuejsExt: '/Users/juane/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/2.2.0_0',
  
  /**
   * This is the path on my machine, feel free to change it or disable it.
   */
  devtron: '/Users/juane/code/nano-sql/node_modules/devtron',

  /**
   * Open chrome dev tools and load vuejs extension
   * @param {Object} mainWindow 
   * @param {Object} browserWindow
   * @param {Boolean} isDev If the build is in dev or prod
   */
  init(mainWindow, browserWindow, isDev) {
    if (isDev) {
      mainWindow.webContents.openDevTools();
      browserWindow.addDevToolsExtension(this.vuejsExt);
      browserWindow.addDevToolsExtension(this.devtron);
    }
  }

};

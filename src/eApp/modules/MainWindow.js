const { BrowserWindow } = require('electron');

/**
 * Create a custom window module by extending Electron's BrowserWindow
 * @return Electron.BrowserWindow (extended)
 */

class MainWindow extends BrowserWindow {

    /**
     * Main constructor
     * @param path : String - path or URL of content to load
     * @param options : Object - Electron.BrowserWindow options
     *        @see https://electronjs.org/docs/api/browser-window#new-browserwindowoptions
     */
    constructor(path, options){
        super(options);
        this.loadURL(path);
        if(process.env.NODE_ENV ==='dev') this.webContents.openDevTools()
    };
}

module.exports = MainWindow;
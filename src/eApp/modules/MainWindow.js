const { BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

/**
 * Create a custom window module by extending Electron's BrowserWindow
 * @export Electron.BrowserWindow (extended)
 * @see https://electronjs.org/docs/api/browser-window
 */

class MainWindow extends BrowserWindow {

    /**
     * Main constructor
     * @param path : String - path or URL of content to load
     * @param options : Object - Electron.BrowserWindow options
     *        @see https://electronjs.org/docs/api/browser-window#new-browserwindowoptions
     */
    constructor(path, options){

        // Load the previous state with fallback to defaults
        let winState = windowStateKeeper({
            defaultWidth: options.width,
            defaultHeight: options.height
        });

        super({
            x: winState.x,
            y: winState.y,
            width: winState.width,
            height: winState.height,
            icon: options.icon,
            show: false,                            // wait until content is loaded
            webPreferences:{
                nodeIntegration:false
            }
        });

        // Let us register listeners on the window, so we can update the state automatically
        // (the listeners will be removed when the window is closed) and restore the maximized or full screen state
        winState.manage(this);

        this.loadURL(path);
        if(process.env.NODE_ENV ==='dev') this.webContents.openDevTools();

        this.webContents.on('did-finish-load', ()=>{
            if (options.startMinimized) { this.minimize(); }
            else {
                this.show();
                this.focus();
            }
        })
    };

}

module.exports = MainWindow;
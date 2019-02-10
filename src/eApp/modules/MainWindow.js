const { BrowserWindow } = require('electron');

class MainWindow extends BrowserWindow {

    constructor(path, options){
        super(options);
        this.loadURL(path);
        if(process.env.NODE_ENV ==='dev') this.webContents.openDevTools()
    };
}

module.exports = MainWindow;
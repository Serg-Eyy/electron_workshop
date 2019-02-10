const { Tray } = require('electron');

class SystemTray extends Tray{

    constructor(imgPath){
        super(imgPath);
        this.setToolTip('Sample Electron App');
    }

}

module.exports = SystemTray;
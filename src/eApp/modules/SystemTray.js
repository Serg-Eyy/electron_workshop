const { Tray } = require('electron');

/**
 * Create a custom system tray module by extending Electron's Tray
 * @return Electron.Tray (extended)
 */
class SystemTray extends Tray{

    /**
     * Main constructor
     * @param imgPath : String - path to tray image
     */
    constructor(imgPath){
        super(imgPath);
        this.setToolTip('Sample Electron App');
    }

}

module.exports = SystemTray;
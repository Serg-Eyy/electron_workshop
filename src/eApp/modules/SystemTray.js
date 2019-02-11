const { Tray } = require('electron');

/**
 * Create a custom system tray module by extending Electron's Tray
 * @export Electron.Tray (extended)
 * @see https://electronjs.org/docs/api/tray
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
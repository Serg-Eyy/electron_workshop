const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

let updater;

/**
 * Create a custom application updater module based on Electron Updater
 * @export AppUpdater & Menu Item for updates check
 * @see https://www.electron.build/auto-update
 */
class AppUpdater {

    /**
     * Main constructor
     */
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();

        autoUpdater.on('error', (error) => {
            dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString());
        });

        autoUpdater.on('update-available', () => {
            dialog.showMessageBox({
                type: 'info',
                title: 'Found Updates',
                message: 'Found updates, do you want update now?',
                buttons: ['Sure', 'No']
            }, (buttonIndex) => {
                if (buttonIndex === 0) {
                    autoUpdater.downloadUpdate();
                } else {
                    updater.enabled = true;
                    updater = null
                }
            })
        });

        autoUpdater.on('update-not-available', () => {
            dialog.showMessageBox({
                title: 'No Updates',
                message: 'Current version is up-to-date.'
            });
            updater.enabled = true;
            updater = null
        });

        autoUpdater.on('update-downloaded', () => {
            dialog.showMessageBox({
                title: 'Install Updates',
                message: 'Updates downloaded, application will be quit for update...'
            }, () => {
                setImmediate(() => autoUpdater.quitAndInstall())
            })
        });
    }
}

// export this to MenuItem click callback
function checkForUpdates (menuItem) {
    updater = menuItem;
    updater.enabled = false;
    autoUpdater.checkForUpdates();
}

module.exports.checkForUpdates = checkForUpdates;
module.exports = AppUpdater;
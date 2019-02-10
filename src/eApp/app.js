const { app, Menu } = require('electron');
const Path = require('path');
const MainWindow = require('./modules/MainWindow');
const SystemTray = require('./modules/SystemTray');
const mainMenu = require('./modules/MainMenu');

/** Some configuration **/

const appIconPath = Path.join(__dirname, '/resources/img', 'appIcon@4x.png');
const trayIconPath = Path.join(__dirname, '/resources/img', 'appIcon.png');
const webAppURL = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000': Path.join(__dirname, '../app', 'index.html');

const mainWindowOptions = {
    width: 800,
    height: 600,
    icon: appIconPath
};

let mainWindow, tray;

// init application upon launch
app.on('ready',  () => appInit());

// On Mac OS exit application when all windows are closed
app.on('window-all-closed', ()=> {
    tray.destroy();
    if (process.platform !== 'darwin') { app.quit() }
});

// On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
app.on('activate', () => {

    if (mainWindow === null) { appInit() } else { mainWindow.show() }
});


// init application by starting all required modules with config parameters
function appInit(){
    Menu.setApplicationMenu(mainMenu);

    mainWindow = new MainWindow(webAppURL, mainWindowOptions);
    mainWindow.on('closed', () => mainWindow = null);

    tray = new SystemTray(trayIconPath);
}

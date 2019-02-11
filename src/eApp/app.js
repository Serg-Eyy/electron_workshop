const { app, Menu } = require('electron');
const Path = require('path');
const MainWindow = require('./modules/MainWindow');
const SystemTray = require('./modules/SystemTray');
const mainMenu = require('./modules/MainMenu');
const AutoUpdater = require('./modules/AppApdater');


/** Some configuration **/

const appIconPath = Path.join(__dirname, '/resources/img', 'Icon_16x16.png');
const trayIconPath = Path.join(__dirname, '/resources/img', 'Icon_16x16.png');
let webAppURL =  Path.join(__dirname, '../app', 'index.html');

const mainWindowOptions = {
    width: 800,
    height: 600,
    icon: appIconPath,
    startMinimized: false

};

if (process.env.NODE_ENV === 'dev') {
    require('electron-debug')();
    webAppURL = 'http://localhost:3000';
}

/** Electron app **/

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};


let mainWindow, tray;

// init application upon launch
app.on('ready',  () => {
    if (process.env.NODE_ENV === 'dev') installExtensions().then(()=> console.log('Dev extensions installed.'));
    appInit()
});

// Explicitly exit application on macOS when all windows are closed
app.on('window-all-closed', ()=> {
    tray.destroy();
    if (process.platform !== 'darwin') { app.quit() }
});

// On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
app.on('activate', () => {

    if (mainWindow === null) { appInit() } else { mainWindow.show() }
});

new AutoUpdater();

// init application by starting all required modules with config parameters
function appInit(){
    Menu.setApplicationMenu(mainMenu);

    mainWindow = new MainWindow(webAppURL, mainWindowOptions);
    mainWindow.on('closed', () => mainWindow = null);

    tray = new SystemTray(trayIconPath);
}

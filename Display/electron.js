const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 480,
        height: 960,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        },
    });

    mainWindow.loadURL(
        process.env.ELECTRON_START_URL ||
        `file://${__dirname}/build/index.html`
    );

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

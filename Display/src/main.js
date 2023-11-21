const { app, BrowserWindow } = require('electron')

function createWindow () {

  const win = new BrowserWindow({
      width: 480,
      height: 240,
      x: 0,
      y: 0,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      },
  })

  win.removeMenu()
  win.loadURL('http://localhost:3000');
  win.setAlwaysOnTop(true, "screen-saver");
}


app.whenReady().then(createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
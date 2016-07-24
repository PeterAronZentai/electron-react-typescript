import * as electron from 'electron'

const app = electron.app

let mainWindow

function createWindow () {
  mainWindow = new electron.BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(`file://${__dirname}/../../index.html`)
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

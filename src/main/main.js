const {app, BrowserWindow, ipcMain, Menu} = require('electron')
const path = require('path')

let mainWindow;

function createWindow() {
  const url = path.join(__dirname, '../../dist/index.html')
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname,"./src/render/assets/DWS.ico"),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  // mainWindow.loadURL('http://localhost:3000/')
  mainWindow.loadFile(url)

  //去掉默认菜单栏
  Menu.setApplicationMenu(null);

  // 调试模式
  mainWindow.webContents.openDevTools()
}

// 单例应用程序

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
  process.exit(0)
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      mainWindow.show()
    }
  })
}

app.on('ready', function () {
  createWindow()
})

app.on('browser-window-blur', (e) => {
  console.log('blur')
})

app.on('browser-window-focus', (e) => {
  console.log('focus')
})

app.on('before-quit', function (e) {
  console.log('out');
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

//热更新
try {
  require('electron-reloader')(module)
} catch (_) {
}


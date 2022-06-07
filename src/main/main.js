//热更新
try {
  require('electron-reloader')(module)
} catch (_) {
}

const {app, BrowserWindow, ipcMain, dialog, Menu, Tray} = require('electron')
const path = require('path')

let mainWindow;
let appTray = null;

function createWindow() {
  const url = path.join(__dirname, '../../dist/index.html')
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "./public/DWS.ico"),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
    }
  })
  mainWindow.loadURL('http://localhost:3000/')
  // mainWindow.loadFile(url)

  //去掉默认菜单栏
  Menu.setApplicationMenu(null);

  // 调试模式
  mainWindow.webContents.openDevTools()

  //添加这段代码
  BrowserWindow.mainWindow = mainWindow;
  return mainWindow;


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

//设置托盘图标和菜单
app.whenReady().then(() => {
  let trayMenuTemplate = [
    {
      label: '打开',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: '隐藏',
      click: () => {
        mainWindow.hide();
      }
    },
    {
      label: '退出',
      click: () => {
        app.quit();
        app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }
  ];
//系统托盘图标
  let iconPath = path.join(__dirname, "../../public/icon.ico")
  appTray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

//设置此托盘图标的悬停提示内容
  appTray.setToolTip('DWS');
//设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
//单击右下角小图标显示应用左键
  appTray.on('click', () => {
    mainWindow.show();
  })
})


app.on('ready', () => {
  createWindow()
})

// 最小化
ipcMain.on('min', () => {
  mainWindow.minimize()
})

// 最大化
ipcMain.on('max', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})

// 关闭
ipcMain.on('close', () => {
  mainWindow.close()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

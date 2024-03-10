import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/logo.png?asset'
import { createMenu } from './common/menu'
import { setTitle, save, saveAs, quitApp } from './common/handler'
import { useStore } from './common/store'

const store = useStore()

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'Typix' + ' ' + app.getVersion(),
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    // ...(process.platform === 'linux' ? { icon } : {}),
    icon,
    webPreferences: {
      devTools: true, // 开发者工具
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    frame: true
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.on('close', (e) => {
    // 判断是否要保存文件
    if (!quitApp(mainWindow)) {
      e.preventDefault()
    }
  })
  store.set('title', mainWindow.getTitle())
  createMenu(app, mainWindow)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('print', (_event, message) => {
    console.log(message)
  })

  // 保存文件
  ipcMain.on('save', (_event, content) => {
    save(mainWindow, content)
  })
  ipcMain.on('save-as', (_event, content) => {
    saveAs(mainWindow, content)
  })
  ipcMain.on('save-and-close', (_event, content) => {
    let result = save(mainWindow, content)
    console.log(result);
    
    if (result === true) {
      mainWindow.close()
    }
  })

  // 获取或设置 store
  ipcMain.on('get-store', (_event, key) => {
    let value = store.get(key)
    _event.returnValue = value || ''
  })
  ipcMain.on('set-store', (_event, key, value) => {
    store.set(key, value)
  })

  // 接收修改标题消息
  ipcMain.on('set-title', (_event, text, type) => {
    setTitle(mainWindow, text, type)
  })
  store.onDidChange('curr', (newValue: any, _oldValue) => {
    if (newValue.saved) {
      if (newValue.changed) {
        setTitle(mainWindow, store.get('curr.fileName') as string, 'unsaved')
      } else {
        setTitle(mainWindow, store.get('curr.fileName') as string, 'saved')
      }
    } else {
      setTitle(mainWindow, '', 'default')
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// main.js

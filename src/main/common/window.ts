import { BrowserWindow, ipcMain } from 'electron'
import icon from '../../../resources/logo.png?asset'
import { join, resolve } from 'path'
import { is } from '@electron-toolkit/utils'

export function createAboutWin(parentWin: BrowserWindow, app: Electron.App) {
  const win = new BrowserWindow({
    parent: parentWin,
    modal: true,
    title: '关于Typix',
    width: 400,
    height: 250,
    show: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    icon,
    webPreferences: {
      webSecurity: false,
      devTools: true, // 开发者工具
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    frame: false
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // process.env['ELECTRON_RENDERER_URL'] => http://localhost:5173
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + `/#/about`)
  } else {
    win.loadFile(resolve(__dirname, '../renderer/index.html'), {
      hash: 'about'
    })
  }

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('close', () => {
    win.removeAllListeners()
  })

  ipcMain.on('close-about-win', () => {
    win.isDestroyed() || win.close()
  })

  ipcMain.on('get-version', () => {
    win.isDestroyed() || win.webContents.send('version', app.getVersion())
  })

  return win
}

export function createPreferencesWin(parentWin: BrowserWindow, app: Electron.App) {
  const win = new BrowserWindow({
    parent: parentWin,
    modal: true,
    title: '设置',
    width: parentWin.getSize()[0] - 100,
    height: parentWin.getSize()[1] - 100,
    show: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    icon,
    webPreferences: {
      webSecurity: false,
      devTools: true, // 开发者工具
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    frame: true
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // process.env['ELECTRON_RENDERER_URL'] => http://localhost:5173
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + `/#/preferences`)
  } else {
    win.loadFile(resolve(__dirname, '../renderer/index.html'), {
      hash: 'preferences'
    })
  }

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('close', () => {
    win.removeAllListeners()
  })

  ipcMain.on('close-about-win', () => {
    win.isDestroyed() || win.close()
  })

  ipcMain.on('get-version', () => {
    win.isDestroyed() || win.webContents.send('version', app.getVersion())
  })

  ipcMain.on('close-preferences-win', () => {
    win.isDestroyed() || win.close()
  })

  return win
}

import { BrowserWindow, ipcMain } from 'electron'
import icon from '../../../resources/logo.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

export function createAboutWin(parentWin: BrowserWindow, app: Electron.App) {
  const win = new BrowserWindow({
    parent: parentWin,
    modal: true,
    title: '关于Typix',
    width: 400,
    height: 250,
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    icon,
    webPreferences: {
      devTools: true, // 开发者工具
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    frame: false
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + `/#/about?version=${app.getVersion()}`)
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html' + `/#/about?version=${app.getVersion()}`))
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

  return win
}

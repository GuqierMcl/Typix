import { BrowserWindow, Menu } from 'electron'
import { openFile } from './handler'
import { createAboutWin, createPreferencesWin } from './window'

export function createMenu(app: Electron.App, win: BrowserWindow) {
  const template = [
    {
      label: '文件',
      accelerator: 'F',
      submenu: [
        {
          label: '新建',
          accelerator: 'CmdOrCtrl+N',
          click() {
            win.webContents.send('new-file')
          }
        },
        {
          label: '打开',
          accelerator: 'CmdOrCtrl+O',
          click() {
            win.webContents.send('open-file', openFile(win))
          }
        },
        {
          label: '保存',
          accelerator: 'CmdOrCtrl+S',
          click() {
            win.webContents.send('save-file', true)
          }
        },
        {
          label: '另存为',
          accelerator: 'CmdOrCtrl+Shift+S',
          click() {
            win.webContents.send('save-as-file', true)
          }
        },
        {
          type: 'separator'
        },
        {
          label: '设置',
          accelerator: 'CmdOrCtrl+,',
          click() {
            createPreferencesWin(win, app)
          }
        },
        {
          label: '关闭',
          accelerator: 'CmdOrCtrl+W',
          click() {
            app.quit()
          }
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        {
          label: '撤销',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: '重做',
          accelerator: 'CmdOrCtrl+Shift+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: '剪切',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: '复制',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: '粘贴',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          type: 'separator'
        },
        {
          label: '全选',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectAll'
        }
      ]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '检查更新'
        },
        {
          label: '关于Typix',
          click() {
            createAboutWin(win, app)
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template as any)
  Menu.setApplicationMenu(menu)
}

export function createContextMenu() {
  const contextTemplate = [
    {
      label: '剪切',
      role: 'cut'
    },
    {
      label: '复制',
      role: 'copy'
    },
    {
      label: '粘贴',
      role: 'paste'
    }
  ]
  const contextMenu = Menu.buildFromTemplate(contextTemplate as any)
  contextMenu.popup()
}

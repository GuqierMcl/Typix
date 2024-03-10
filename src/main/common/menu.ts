import { BrowserWindow, Menu } from 'electron'
import { openFile } from './handler'

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
          enabled: false
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
      label: '帮助',
      submenu: [
        {
          label: '检查更新'
        },
        {
          label: '关于Typix'
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template as any)
  Menu.setApplicationMenu(menu)
}

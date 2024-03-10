import { BrowserWindow, dialog } from 'electron'
const fs = require('node:fs')
import path from 'path'
import { useStore } from './store'

const store = useStore()

export function openFile(win: BrowserWindow) {
  const fileName = dialog.showOpenDialogSync(win, {
    title: '请选择文件',
    properties: ['openFile'],
    filters: [
      { name: 'Markdown', extensions: ['md', 'txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  if (fileName) {
    try {
      const content = fs.readFileSync(fileName[0]).toString()

      // 保存当前文件信息
      store.set('curr', {
        fileName: path.basename(fileName[0]),
        filePath: path.dirname(fileName[0]),
        saved: true,
        changed: false
      })

      return content
    } catch (e) {
      dialog.showErrorBox('打开文件失败', '文件不存在或者文件格式不支持！')
    }
  }
  return ''
}

export function save(win: BrowserWindow, content: string) {
  const curr = store.get('curr') as any
  if (curr.saved) {
    fs.writeFileSync(path.join(curr.filePath, curr.fileName), content)
    store.set('curr.changed', false)
    return true
  } else {
    return saveAs(win, content)
  }
}

export function saveAs(win: BrowserWindow, content: string) {
  const fileName = dialog.showSaveDialogSync(win, {
    title: '保存文件',
    defaultPath:
      (store.get('curr.fileName') as string) === ''
        ? '未命名.md'
        : (store.get('curr.fileName') as string),
    filters: [
      { name: 'Markdown', extensions: ['md'] },
      { name: 'TXT', extensions: ['txt'] },
      { name: 'Json', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  if (fileName) {
    store.set('curr', {
      fileName: path.basename(fileName),
      filePath: path.dirname(fileName),
      saved: true,
      changed: false
    })
    fs.writeFileSync(fileName, content)
    return true
  }
  return false
}

export function setTitle(win: BrowserWindow, text: string, type: string) {
  switch (type) {
    case 'unsaved':
      win.setTitle('*' + text + ' - ' + store.get('title'))
      break
    case 'saved':
      win.setTitle(text + ' - ' + store.get('title'))
      break
    case 'default':
      win.setTitle(store.get('title') as string)
      break
    default:
      win.setTitle(text)
      break
  }
}

export function newFile(win: BrowserWindow) {
  store.set('curr', {
    fileName: '',
    filePath: '',
    saved: false,
    changed: false
  })
  win.webContents.send('new-file')
}

export function quitApp(win: BrowserWindow) {
  if (store.get('curr.changed') === true) {
    let result = dialog.showMessageBoxSync({
      type: 'question',
      title: '确认退出',
      message: '是否保存更改？',
      buttons: ['是', '否', '取消'],
      defaultId: 0,
      cancelId: 2
    })
    
    if (result === 0) {
      win.webContents.send('close-and-save-file', true)
      return false
    } else if (result === 2) {
      return false
    }
  }
  return true
}

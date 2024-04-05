import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  log: (content: string) => ipcRenderer.send('print', content),

  /* 打开文件回调 */
  onOpenFile: (callback) => ipcRenderer.on('open-file', (_event, value) => callback(value)),

  /* 保存文件回调 */
  onSaveFile: (callback) => ipcRenderer.on('save-file', (_event, value) => callback(value)),

  /* 另存为回调 */
  onSaveAsFile: (callback) => ipcRenderer.on('save-as-file', (_event, value) => callback(value)),

  /* 新建文件回调 */
  onNewFile: (callback) => ipcRenderer.on('new-file', (_event, value) => callback(value)),

  /* 关闭并保存文件回调 */
  onCloseAndSaveFile: (callback) =>
    ipcRenderer.on('close-and-save-file', (_event, value) => callback(value)),

  /* 保存文件 */
  save: (content: string) => ipcRenderer.send('save', content),

  /* 另存为文件 */
  saveAs: (content: string) => ipcRenderer.send('save-as', content),

  /* 保存并关闭文件 */
  saveAndClose: (content: string) => ipcRenderer.send('save-and-close', content),

  /* 设置标题 */
  setTitle: (text: string, type: string) => ipcRenderer.send('set-title', text, type),

  /* 获取Store值 */
  getStore: (key: string) => ipcRenderer.sendSync('get-store', key),

  /* 设置Store值 */
  setStore: (key: string, value: any) => ipcRenderer.send('set-store', key, value),

  /* 显示上下文菜单 */
  showContextMenu: () => ipcRenderer.send('show-context-menu'),

  /* 关闭关于窗口 */
  closeAboutWin: () => ipcRenderer.send('close-about-win'),

  /* 打开外部链接 */
  openExternal: (url: string) => ipcRenderer.send('open-external', url),

  /* 获取版本信息 */
  getVersions: () => ipcRenderer.send('get-version'),

  /* 获取版本信息回调 */
  onVersion: (callback) => ipcRenderer.on('version', (_event, value) => callback(value)),

  /* 注册事件 */
  on: (channel: string, callback) => ipcRenderer.on(channel, (_event, value) => callback(value)),

  /* 关闭设置窗口 */
  closePreferencesWin: () => ipcRenderer.send('close-preferences-win'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

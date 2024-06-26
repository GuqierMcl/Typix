import { ElectronAPI } from '@electron-toolkit/preload'

interface Api {
  log: (content: string) => any
  onOpenFile: (callback: Function) => any
  onSaveFile: (callback: Function) => any
  onSaveAsFile: (callback: Function) => any
  onNewFile: (callback: Function) => any
  onCloseAndSaveFile: (callback: Function) => any
  save: (content: string) => any
  saveAs: (content: string) => any
  saveAndClose: (content: string) => any
  setTitle: (text: string, type: string) => any
  getStore: (key: string) => any
  setStore: (key: string, value: any) => any
  showContextMenu: () => any
  closeAboutWin: () => any
  openExternal: (url: string) => any
  getVersions: () => any
  onVersion: (callback: Function) => any
  on: (channel: string, callback: Function) => any
  closePreferencesWin: () => any
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

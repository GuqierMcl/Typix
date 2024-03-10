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
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}

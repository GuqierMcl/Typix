import Store from 'electron-store'

const store = new Store()
export function useStore() {
  // 初始化 store
  store.set('curr', {
    fileName: '',
    filePath: '',
    saved: false,
    changed: false
  })

  const preferencesDefault = {
    common: {
      launchOption: 'new', // 启动选项, new: 新建文件, last: 上次打开的文件
      autoSave: false // 自动保存
    },
    editor: {
      tabSize: 2 // tab 缩进大小
    }
  }

  store.has('preferences') || store.set('preferences', preferencesDefault)

  return store
}

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

  store.has('preferences') || store.set('preferences', {
    tabSize: 2, // tab 缩进大小
  })

  return store
}

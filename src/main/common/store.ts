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

  return store
}

import { createApp } from 'vue'
import App from './App.vue'

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'

/* github主题 */
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
// import '@kangc/v-md-editor/lib/theme/style/github.css'
// import hljs from 'highlight.js'
// VMdEditor.use(githubTheme, {
//   Hljs: hljs
// })

/* vuepress主题 */
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
VMdEditor.use(vuepressTheme, {
  Prism
})

/* emoji支持 */
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
VMdEditor.use(createEmojiPlugin())

import { routes } from './route/route'
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(VMdEditor)
app.mount('#app')

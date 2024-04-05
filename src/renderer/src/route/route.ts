import { createRouter, createWebHashHistory } from 'vue-router'

export function create() {
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  return router
}
// 用于配置路由
const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/EditorContainer.vue')
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('../views/About.vue')
  },
  {
    name: 'preferences',
    path: '/preferences',
    component: () => import('../views/preferences/Preferences.vue')
  }
]



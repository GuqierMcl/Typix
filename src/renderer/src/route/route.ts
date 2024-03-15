// 用于配置路由
export const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/EditorContainer.vue')
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('../views/About.vue')
  }
]

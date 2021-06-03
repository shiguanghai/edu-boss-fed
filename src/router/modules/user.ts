import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

// 路由配置规则
const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: { // meta 默认就是一个空对象
    requiresAuth: true, // 访问权限。自定义数据
    title: '用户管理'
  },
  children: [
    {
      path: '/user',
      name: 'user-list',
      component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
      meta: {
        // title: '用户列表',
        menuId: 'Users'
      }
    }
  ]
}

export default routes

import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

// 路由配置规则
const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: { // meta 默认就是一个空对象
    requiresAuth: true, // 访问权限。自定义数据
    title: '广告管理'
  },
  children: [
    {
      path: '/advert',
      name: 'advert',
      component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
      meta: {
        title: '广告列表'
      }
    },
    {
      path: '/advert-space',
      name: 'advert-space',
      component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),
      meta: {
        title: '广告位列表'
      }
    }
  ]
}

export default routes

import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import advertRoules from './advert'
import courseRoules from './course'
import rightsRoules from './rights'

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: { // meta 默认就是一个空对象
      requiresAuth: true // 访问权限。自定义数据
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      }
    ]
  },
  advertRoules,
  courseRoules,
  rightsRoules,
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

export default routes

import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

// 路由配置规则
const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: { // meta 默认就是一个空对象
    requiresAuth: true, // 访问权限。自定义数据
    title: '权限管理',
    meta: {
      menuId: '' // 标识
    }
  },
  children: [
    {
      path: '/role',
      name: 'role',
      component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
      meta: {
        // requiresAuth: true
        title: '角色列表',
        menuId: 'Role'
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
      meta: {
        title: '菜单列表',
        menuId: 'Menu'
      }
    },
    {
      path: '/resource',
      name: 'resource',
      component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
      meta: {
        title: '资源列表',
        menuId: 'Resource'
      }
    },
    {
      path: '/menu/create',
      name: 'menu-create',
      component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue'),
      meta: {
        title: '添加菜单',
        menuId: 'AddMenu'
      }
    },
    {
      path: '/menu/:id/edit',
      name: 'menu-edit',
      component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue'),
      meta: {
        title: '更新菜单',
        menuId: 'UpdateMenu'
      }
    },
    {
      path: '/role/:roleId/alloc-menu',
      name: 'alloc-menu',
      component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
      meta: {
        title: '分配菜单',
        menuId: 'AllocMenu'
      },
      props: true // 将路由路径参数映射到组件的 props 数据中
    },
    {
      path: '/role/:roleId/alloc-resource',
      name: 'alloc-resource',
      component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-resource.vue'),
      meta: {
        title: '分配资源',
        menuId: 'AllocResource'
      },
      props: true // 将路由路径参数映射到组件的 props 数据中
    }
  ]
}

export default routes

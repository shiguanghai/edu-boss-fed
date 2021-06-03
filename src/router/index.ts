import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routes from './modules/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

// 全局前置守卫：任何页面的访问都要经过这里
router.beforeEach((to, from, next) => {
  // 处理面包屑: 获取当前的路由匹配记录
  // console.log('router.currentRoute.matched', router.currentRoute.matched)
  // to.matched 是一个数组（匹配到的路由记录）
  // 一旦路由记录有一个记录项record
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) { // 如果没有登录状态
      // 跳转到登录状态
      next({
        name: 'login',
        // query 告诉登录页面从哪来的
        query: { // 通过 url 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页
        }
      })
    } else { // 有登录状态
      next() // 允许通过
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router

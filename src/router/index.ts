import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './modules/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

// 全局前置守卫：任何页面的访问都要经过这里
router.beforeEach(async (to, from, next) => {
  nprogress.start()
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
    }
    // 有登录状态 校验访问权限
    // 获取权限列表，生成权限路由
    // 动态地把权限路由添加到路由表中
    // router.addRoute(store.getters.addRouters)

    // 1. 获取用户权限列表
    const { content } = await store.dispatch('getUserPermissions')
    const menuList = content.menuList
    // 2. 判断当前访问的路由是否存在于权限列表中
    //      - 如果存在，则通过访问
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i]
      if (menu.href === to.meta.menuId) {
        // 有权限，允许通过
        return next()
      }
      if (menu.subMenuList) {
        for (let j = 0; j < menu.subMenuList.length; j++) {
          const subMenu = menu.subMenuList[j]
          // console.log('href', subMenu.href)
          // console.log('menuId', to.meta.menuId)
          // console.log('...')
          if (subMenu.href === to.meta.menuId) {
            // 有权限，允许通过
            return next()
          }
        }
      }
    }
    //      - 不存在，跳转到 403 页面
    // 代码运行到这里意味着上面没有 return next()
    // 这里就要让用户到 403 页面了
    return next('/not-permission')
  }
  next() // 确保一定要调用 next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router

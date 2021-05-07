import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

function redirectlogin () {
  router.push({
    name: 'login',
    query: { // 通过 url 传递查询字符串参数
      redirect: router.currentRoute.fullPath // 把登录成功需要返回的页面告诉登录页
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
// 任何请求都要经过请求拦截器
// 我们可以在请求拦截器中做一些公共的业务处理，例如统一设置 Token
// config 包括本次请求的请求地址、方法、参数等等
request.interceptors.request.use(function (config) {
  // 请求就会经过这里（正确）
  // 我们在这里通过改写 config 配置信息类实现业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  // 返回 config 请求配置对象
  return config
}, function (error) {
  // 如果请求失败（此时请求还没有发出去）就会进入这里
  return Promise.reject(error)
})

// 响应拦截器
// 收到响应会优先进入到相应拦截器，再走到真正发请求的响应里面
let isRfreshing = false // 控制刷新 Token 的状态
let requests: any[] = [] // 存储刷新 Token 期间过来的 401 请求
request.interceptors.response.use(function (response) {
  // 当状态码为 2xx 都会进入这里
  // console.log('请求响应成功了 =>', response)

  // 如果是自定义错误状态码，错误处理就写到这里

  return response
}, async function (error) {
  // 所有超出 2xx 范围的状态码都执行这里
  // console.log('请求响应失败了 =>', error)
  // 如果是使用 HTTP 状态码，错误处理就写到这里

  if (error.response) { // 请求发出去，收到响应了。状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // Token 无效（没有提供Token、Token是无效的、Token过期了）
      // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
      // 如果没有，则直接跳转登录页
      if (!store.state.user) {
        redirectlogin()
        return Promise.reject(error)
      }
      // 刷新 Token
      if (!isRfreshing) { // 不在刷新
        isRfreshing = true // 开启刷新状态
        // 尝试刷新获取新的 token
        return refreshToken().then(res => {
          if (!res.data.success) { // 失败
            throw new Error('刷新 Token 失败')
          }
          // 成功 -> 把本次失败的请求重新发出去
          // 把刷新拿到的新的 access_token 更新到容器和本地存储中
          store.commit('setUser', res.data.content)
          // 把 requests 队列中的请求重新发出去
          requests.forEach(cb => cb())
          // 重置 requests 数组
          requests = []
          // 把本次失败的请求重新发出去
          // console.log(error.config) // 失败请求的配置信息
          return request(error.config) // 返回 Promise （request({})需要 methods、url、data等方法）
        }).catch(err => {
          console.log(err)
          // 把当前登录用户状态清除
          store.commit('setUser', null)
          // 失败 -> 跳转登录页重新登录获取新的 token
          redirectlogin()
          return Promise.reject(error)
        }).finally(() => {
          isRfreshing = false // 重置刷新状态
        })
      }

      // 刷新状态下，把请求挂起放到 requests 数组中
      // 返回一个不执行 resolve 的 Promise（不resolve就不会结束，而是等待）
      return new Promise(resolve => {
        requests.push(() => {
          // 重新发送错误的请求
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去，没有收到响应。请求超时，网络断开
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }
  // 把请求失败的错误对象继续抛出，扔给上一个调用者
  return Promise.reject(error)
})

export default request

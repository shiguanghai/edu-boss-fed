import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

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
request.interceptors.response.use(function (response) {
  // 当状态码为 2xx 都会进入这里
  console.log('请求响应成功了 =>', response)

  // 如果是自定义错误状态码，错误处理就写到这里

  return response
}, function (error) {
  // 所有超出 2xx 范围的状态码都执行这里
  // console.log('请求响应失败了 =>', error)
  // 如果是使用 HTTP 状态码，错误处理就写到这里

  if (error.response) { // 请求发出去，收到响应了。状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // Token 无效（没有提供Token、Token是无效的、Token过期了）
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

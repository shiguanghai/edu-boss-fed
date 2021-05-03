import axios from 'axios'
import store from '@/store'

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

// 相应拦截器

export default request

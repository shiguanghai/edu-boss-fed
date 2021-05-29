// NodeJS 中通过 require 加载代码
const express = require('express')
const app = express()
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

// 托管了 dist 目录。而且当访问 '/' 的时候，默认会返回托管目录中的 index.html 文件
app.use(express.static(path.join(__dirname, '../dist')))

app.use(
  '/boss',
  createProxyMiddleware({
    target: 'http://eduboss.lagou.com', // 代理到的目标地址
    // 假如后端服务配置了反向代理，可能要根据 Origin 来识别客户端请求
    changeOrigin: true // 以实际代理请求的主机名请求：设置请求头中的 host 为 target
  })
)

app.use(
  '/front',
  createProxyMiddleware({
    target: 'http://edufront.lagou.com', // 代理到的目标地址
    // 假如后端服务配置了反向代理，可能要根据 Origin 来识别客户端请求
    changeOrigin: true // 以实际代理请求的主机名请求：设置请求头中的 host 为 target
  })
)

app.listen(3000, () => {
  console.log('running...')
})

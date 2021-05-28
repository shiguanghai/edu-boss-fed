// 主要用于 TypeScript 识别 .vue 文件模块
// TypeScript 默认不支持导入 .vue 模块，这个文件告诉 TypeScript 导入 .vue 文件模块都按
// VueConstructor<Vue> 类型识别处理
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface Window {
  AliyunUpload: any
}

<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  // 组件已经渲染好，可以初始化操作 DOM 了
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      // 事件监听 必须在 create 之前
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }

      editor.create()

      // 设置初始值 必须在 create 之后
      editor.txt.html(this.value)

      // 上传图片
      editor.config.customUploadImg =
      async function (resultFiles: any, insertImgFn: any) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法

        // 1. 把用户选择的 resultFiles 上传到服务器
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        // 2. 上传图片，返回结果，将图片插入到编辑器中
        insertImgFn(data.data.name)
      }
    }
  }
})
</script>

<style lang='scss' scoped></style>

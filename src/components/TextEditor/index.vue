<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'

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
    }
  }
})
</script>

<style lang='scss' scoped></style>

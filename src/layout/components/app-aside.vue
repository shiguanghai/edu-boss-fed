<template>
  <div class="aside">
    <router-link class="logo" to="/" title="Back to Home">
      <img src="https://public.shiguanghai.top/public/logo.png" alt="EduBoss">
      <h1>Edu Boss</h1>
    </router-link>
    <!-- 侧边菜单栏 -->
    <AppMenu />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppMenu from '@/components/AppMenu/index.vue'

export default Vue.extend({
  name: 'AppAside',
  components: {
    AppMenu
  }
})
</script>

<style lang="scss" scoped>
.aside {
  .logo {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #545c64;
    color: #fff;
    text-decoration: none;
    img {
      width: 40px;
      border-radius: 10px;
    }
  }
  .el-menu {
    min-height: 100vh;
  }
}
</style>

<template>
  <div id="app">
    <h1>时光海</h1>
    <!-- 跟路由出口 -->
    <router-view/>

    <p class="text">hello world</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss" scoped>
// @import "~@/styles/variables.scss";

.text {
  color: $success-color;
}
</style>

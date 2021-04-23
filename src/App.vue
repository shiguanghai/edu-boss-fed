<template>
  <div id="app">
    <h1>时光海</h1>
    <!-- 跟路由出口 -->
    <router-view/>
  </div>
</template>

<script>
function testable (target) {
  target.isTestable = true
}

@testable
class MyTestableClass {
  // ...
}

console.log(MyTestableClass.isTestable) // true
</script>

<!--<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  a = 1
  test () {
    console.log(this.a)
  }
}
</script>-->

<style lang="scss" scoped></style>

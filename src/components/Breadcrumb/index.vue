<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="route in routerRecords"
      :key="route.path"
    >{{ route.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue'
// import { RouteRecord } from 'vue-router'
export default Vue.extend({
  name: 'BreadCrumb',
  // data () {
  //   return {
  //     routerRecords: [] as Array<RouteRecord>
  //   }
  // },
  computed: {
    routerRecords () {
      return this.$route.matched.filter((route) => route.meta.title !== undefined)
    }
  }
  // created () {
  //   this.getRouterRecords()
  // },
  // watch: {
  //   $route () {
  //     this.getRouterRecords()
  //   }
  // },
  // methods: {
  //   getRouterRecords () {
  //     this.routerRecords = this.$route.matched.filter((route) => {
  //       return route.meta.title !== undefined
  //     })
  //   }
  // }
})
</script>

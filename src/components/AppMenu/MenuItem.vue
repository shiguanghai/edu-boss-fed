<template>
  <div v-if="menu.shown" class="menu-item">
    <!-- 如果有子菜单并且至少有一个孩子是 shown 展示状态 -->
    <el-submenu
      v-if="menu.subMenuList && menu.subMenuList.some(item => item.shown)"
      :index="transform(menu.href)"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ menu.name }}</span>
      </template>
      <!-- 组件递归必须有 name -->
      <MenuItem
        v-for="subMenu in menu.subMenuList"
        :key="subMenu.id"
        :menu="subMenu"
      />
    </el-submenu>

    <el-menu-item v-else :index="transform(menu.href)">
      <i class="el-icon-setting"></i>
      <span slot="title">{{ menu.name }}</span>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    transform (href: string) {
      switch (href) {
        case 'Role':
          return '/role'
        case 'Menu':
          return '/menu'
        case 'Resource':
          return '/resource'
        case 'Courses':
          return '/course'
        case 'Users':
          return '/user'
        case 'Advertise':
          return '/advert'
        case 'AdvertiseSpace':
          return '/advert-space'
        default:
          return ''
      }
    }
  }
})
</script>

<style lang='scss' scoped></style>

<template>
  <div class="alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配权限</span>
      </div>
      <el-tree
        ref="menu-tree"
        node-key="id"
        :data="menus"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
      ></el-tree>
      <div style="text-align: center">
        <el-button @click="resetChecked">清空</el-button>
        <el-button
          type="primary"
          @click="onSave"
        >保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getMenuNodeList,
  allocateRoleMenus,
  getRoleMenus
} from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: { // 个性化定制
        children: 'subMenuList', // 子节点数组
        label: 'name' // 节点名称
      },
      checkedKeys: []
    }
  },
  created () {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      // console.log(data)
      // 获取 selected 为 true 的节点
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected && !menu.subMenuList) {
          // push 内部数据无法更新
          // this.checkedKeys.push(menu.id as never)
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async loadMenus () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },
    async onSave () {
      // 1. 拿到选中节点的数据 id 列表
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      // console.log(menuIdList)
      // 2. 请求提交保存
      await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      // 3. 操作成功，返回
      this.$message.success('操作成功')
      this.$router.back()
    },
    resetChecked () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang='scss' scoped></style>

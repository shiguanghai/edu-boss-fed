<template>
  <div class="user-list">
    <el-card class="box-card">
      <div slot="header">
        <span>数据筛选</span>
      </div>
        <el-form
          :model="filterParams"
          label-width="80px"
          label-position="left"
          ref="filter-form"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="filterParams.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="rangeDate">
            <el-date-picker
              v-model="filterParams.rangeDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :disabled="loading"
              @click="handleReset"
            >重置</el-button>
            <el-button
              type="primary"
              @click="handleQuery"
              :disabled="loading"
            >查询</el-button>
          </el-form-item>
        </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>查询结果：</span>
      </div>
      <el-table
        :data="users"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="用户ID"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="头像"
          min-width="80">
          <template slot-scope="scope">
            <img width="30px" :src="scope.row.portrait || 'https://public.shiguanghai.top/blog_img/default-avatarnUSD98.png'">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
          min-width="180">
        </el-table-column>
        <!-- <el-table-column
          prop="name"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="ENABLE"
              inactive-value="DISABLE"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleForbidUser(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="address"
          label="操作"
          min-width="150">
          <!-- 插槽作用域 -->
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleSelectRole(scope.row)"
            >分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="分配角色"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleAllocRole"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, forbidUser } from '@/services/user'
import { Form } from 'element-ui'
import {
  getAllRoles,
  allocateUserRoles,
  getUserRoles
} from '@/services/role'

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      loading: true,
      dialogVisible: false,
      roles: [],
      roleIdList: [],
      currentUser: null // 分配角色的当前用户
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      this.loading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      this.users = data.data.records
      this.loading = false
    },
    async handleForbidUser (user: any) {
      const { data } = await forbidUser(user.id)
      console.log(data)
    },
    handleQuery () {
      this.filterParams.currentPage = 1
      this.loadUsers()
    },
    handleReset () {
      (this.$refs['filter-form'] as Form).resetFields()
      this.loadUsers()
    },
    async handleSelectRole (role: any) {
      this.currentUser = role
      // 1. 加载角色列表
      const { data } = await getAllRoles()
      this.roles = data.data
      // 2. 展示已分配角色
      const { data: { data: userRoles } } = await getUserRoles((this.currentUser as any).id)
      this.roleIdList = userRoles.map((item: any) => item.id)
      // 3. 展示对话框
      this.dialogVisible = true
    },
    async handleAllocRole () {
      await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      })
      this.$message.success('操作成功')
      this.dialogVisible = false
    }
  }
})
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>

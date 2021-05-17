<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header">
        <span>数据筛选</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
      >
        <el-form-item prop="name" label="资源名称">
          <el-input v-model="form.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="资源路径">
          <el-input v-model="form.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item prop="categoryId" label="资源分类">
          <el-select
            v-model="form.categoryId"
            placeholder="全部"
            clearable
          >
            <el-option
              v-for="item in resourceCategories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="isLoading"
          >查询搜索</el-button>
          <el-button
            @click="onReset"
            :disabled="isLoading"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>查询结果：</span>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          label="编号"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          min-width="200"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          min-width="150"
          label="描述">
        </el-table-column>
        <el-table-column
          min-width="180"
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          min-width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--
        total：总记录数
        page-size：每页大小
        分页组件会根据 total 和 page-size 计算一共分多少页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        current: 1, // 默认查询第1页数据
        size: 10, // 每页大小
        name: '',
        url: '',
        categoryId: null // 资源分类，null查询所有
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true // 加载状态
    }
  },
  created () {
    this.loadResources()
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },
    handleEdit (item: any) {
      console.log('handleEdit', item)
    },
    handleDelete (item: any) {
      console.log('handleDelete', item)
    },
    onSubmit () {
      this.form.current = 1 // 筛选查询从第1页开始
      this.loadResources()
    },
    handleSizeChange (val: number) {
      // 每页大小发生改变
      // console.log(`每页 ${val} 条`)
      this.form.size = val
      this.form.current = 1 // 每页大小改变，重新查询第1页数据
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      // 页码发生改变
      // console.log(`当前页: ${val}`)
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources() // 重绘列表数据
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第1页
      this.loadResources()
    }
  }
})
</script>

<style lang='scss' scoped>
.el-card {
  margin-bottom: 20px;
}
</style>

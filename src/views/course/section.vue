<template>
  <div class="course-section">
    <!-- 阶段列表 -->
    <el-card class="box-card">
      <div class="card-header" slot="header">
        {{ course.courseName }}
        <el-button
          type="primary"
          @click="handleShowAddSection"
        >添加阶段</el-button>
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
      >
        <div class="inner" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <!-- section -->
          <span v-if="data.sectionName" class="actions">
            <el-button>编辑</el-button>
            <el-button>添加课时</el-button>
            <el-button>状态</el-button>
          </span>
          <!-- lession -->
          <span v-else class="actions">
            <el-button>编辑</el-button>
            <el-button>上传视频</el-button>
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
    <!-- /阶段列表 -->

    <!-- 添加阶段 -->
    <el-dialog
      title="添加课程阶段"
      :visible.sync="isAddSectionShow"
    >
      <el-form ref="section-form" :model="section" label-width="70px">
        <el-form-item label="课程名称">
          <el-input
            :value="course.courseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称">
          <el-input v-model="section.sectionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节描述">
          <el-input v-model="section.description" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="section.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddSectionShow = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSection">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加阶段 -->

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getSectionAndLesson,
  saveOrUpdateSection
} from '@/services/course-section'
import { getCourseById } from '@/services/course'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    const defaultProps = {
      children: 'lessonDTOS',
      label (data: any) {
        return data.sectionName || data.theme
      }
    }
    const section = {
      courseId: this.courseId,
      sectionName: '',
      description: '',
      orderNum: 0,
      status: 0
    }

    return {
      course: {},
      sections: [],
      defaultProps,
      isAddSectionShow: false,
      section
    }
  },
  created () {
    this.loadSections()
    this.loadCourse()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
    },
    async loadSections () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    },
    handleShowAddSection () {
      this.section = { // 防止数据还是编辑时获取的数据
        courseId: this.courseId,
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0
      }
      this.isAddSectionShow = true
    },
    async handleAddSection () {
      await saveOrUpdateSection(this.section)
      this.loadSections()
      this.isAddSectionShow = false
      ;(this.$refs['section-form'] as Form).resetFields() // 表单重置
      this.$message.success('操作成功')
    }
  }
})
</script>

<style lang='scss' scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inner {
  flex: 1;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}
::v-deep .el-tree-node__content {
  height: auto;
}
</style>

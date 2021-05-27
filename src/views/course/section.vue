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
            <el-button @click.stop="handleShowEditSection(data)">编辑</el-button>
            <el-button
              type="primary"
              @click.stop="handleShowAddLesson(data)"
            >添加课时</el-button>
            <el-button>状态</el-button>
          </span>
          <!-- lession -->
          <span v-else class="actions">
            <el-button @click="handleShowEditLesson(data, node.parent.data)">编辑</el-button>
            <el-button>上传视频</el-button>
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
    <!-- /阶段列表 -->

    <!-- 添加阶段 -->
    <el-dialog
      :title="isEditSection ? '编辑课程阶段' : '添加课程阶段'"
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

    <!-- 添加课时 -->
    <el-dialog
      :title="isEditLesson ? '编辑课时' : '添加课时'"
      :visible.sync="isAddLessonShow"
    >
      <el-form ref="lesson-form" :model="lesson" label-width="100px">
        <el-form-item label="课程名称">
          <el-input
            :value="course.courseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称">
          <el-input :value="lesson.sectionName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课时名称">
          <el-input v-model="lesson.theme" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时长">
          <el-input v-model.number="lesson.duration" type="number" autocomplete="off">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否开放试听">
          <el-switch v-model="lesson.isFree"></el-switch>
        </el-form-item>
        <el-form-item label="课时排序" prop="description">
          <el-input-number v-model="lesson.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddLessonShow = false">取 消</el-button>
        <el-button type="primary" @click="handleAddLesson">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加课时 -->

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getSectionAndLesson,
  saveOrUpdateSection,
  getSectionById
} from '@/services/course-section'
import { getCourseById } from '@/services/course'
import { Form } from 'element-ui'
import { saveOrUpdateLesson } from '@/services/course-lesson'

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
    const lesson = {
      courseId: this.courseId,
      sectionId: undefined,
      sectionName: '',
      theme: '',
      duration: 0,
      isFree: false,
      orderNum: 0,
      status: 0
    }

    return {
      course: {},
      sections: [],
      defaultProps,
      section,
      isAddSectionShow: false,
      isEditSection: false,
      lesson,
      isAddLessonShow: false,
      isEditLesson: false
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
      this.isEditSection = false
      this.isAddSectionShow = true
    },
    async handleAddSection () {
      await saveOrUpdateSection(this.section)
      this.loadSections()
      this.isAddSectionShow = false
      ;(this.$refs['section-form'] as Form).resetFields() // 表单重置
      this.$message.success('操作成功')
    },
    async handleShowEditSection (section: any) {
      const { data } = await getSectionById(section.id)
      this.section = data.data
      this.isEditSection = true
      this.isAddSectionShow = true
    },

    handleShowAddLesson (data: any) {
      this.lesson = {
        sectionName: data.sectionName,
        sectionId: data.id,
        courseId: this.courseId,
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0
      }
      this.isEditLesson = false
      this.isAddLessonShow = true
    },
    async handleAddLesson () {
      await saveOrUpdateLesson(this.lesson)
      this.$message.success('操作成功')
      this.loadSections()
      this.isAddLessonShow = false
    },
    handleShowEditLesson (lesson: any, section: any) {
      this.lesson = lesson
      this.lesson.sectionName = section.sectionName
      this.isEditLesson = true
      this.isAddLessonShow = true
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

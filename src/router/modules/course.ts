import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

// 路由配置规则
const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: { // meta 默认就是一个空对象
    requiresAuth: true, // 访问权限。自定义数据
    title: '课程管理'
  },
  children: [
    {
      path: '/course',
      name: 'course',
      component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
      meta: {
        // title: '课程管理'
      }
    },
    {
      path: '/course/create',
      name: 'course-create',
      component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue'),
      meta: {
        title: '创建课程'
      }
    },
    {
      path: '/course/:courseId/edit',
      name: 'course-edit',
      component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
      meta: {
        title: '更新课程'
      },
      props: true // 将路由路径参数映射到组件的 props 数据中
    },
    {
      path: '/course/:courseId/section',
      name: 'course-section',
      component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
      meta: {
        title: '课程内容'
      },
      props: true // 将路由路径参数映射到组件的 props 数据中
    },
    {
      path: '/course/:courseId/video',
      name: 'course-video',
      component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
      meta: {
        title: '视频上传'
      },
      props: true // 将路由路径参数映射到组件的 props 数据中
    }
  ]
}

export default routes

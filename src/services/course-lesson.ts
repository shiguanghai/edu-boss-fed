/**
 * 课程课时相关请求模块
 */

import request from '@/utils/request'

export const saveOrUpdateLesson = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}

// export const getLessonById = (lessonId: string | number) => {
//   return request({
//     method: 'GET',
//     url: '/boss/course/lesson/getById',
//     params: {
//       lessonId
//     }
//   })
// }

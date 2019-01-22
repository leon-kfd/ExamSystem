import Vue from 'vue'
import Router from 'vue-router'
import Exam from '@/pages/exam'
import CreateExam from '@/pages/create-exam'
import Admin from '@/pages/admin/index'

Vue.use(Router)

let adminRouter = [
  {
    path: '/admin/test1',
    name: 'test1',
    component: () => import('@/pages/admin/test1'),
    meta: {
      label: 'test1',
      iconClass: 'el-icon-location'
    }
  },
  {
    path: '/admin/test2',
    name: 'test2',
    component: () => import('@/pages/admin/test2'),
    meta: {
      label: 'test2',
      iconClass: 'el-icon-document'
    },
    children: [
      {
        path: 'admin/test2/test2-1',
        name: 'test2-1',
        component: () => import('@/pages/admin/test2-1'),
        meta: {
          label: 'test2-1'
        }
      }
    ]
  },
  {
    path: '/outer',
    name: 'outer',
    meta: {
      label: 'outer',
      iconClass: 'el-icon-document'
    },
    outer: {
      outerUrl: 'http://www.baidu.com'
    }
  }
]
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Exam',
      component: Exam
    },
    {
      path: '/CreateExam',
      name: 'CreateExam',
      component: CreateExam
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/test1',
      component: Admin,
      children: [
        ...adminRouter
      ]
    }
  ]
})
export { adminRouter }

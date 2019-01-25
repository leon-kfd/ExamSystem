import Vue from 'vue'
import Router from 'vue-router'
import Exam from '@/pages/exam'
import Admin from '@/pages/admin/index'
import Login from '@/pages/login'

Vue.use(Router)

let adminRouter = [
  {
    path: 'test1',
    name: 'test1',
    component: () => import('@/pages/admin/test1'),
    meta: {
      label: 'test1',
      iconClass: 'el-icon-location'
    }
  },
  {
    path: 'examManage',
    name: 'examManage',
    redirect: 'examManage/createExam',
    component: () => import('@/pages/admin/exam-manage'),
    meta: {
      label: '考试管理',
      iconClass: 'el-icon-document'
    },
    children: [
      {
        path: 'createExam',
        name: 'createExam',
        component: () => import('@/pages/admin/create-exam'),
        meta: {
          label: '创建考试'
        }
      }
    ]
  },
  {
    path: 'outer',
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
      path: '/login',
      name: 'Login',
      component: Login
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

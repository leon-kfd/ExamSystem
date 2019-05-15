import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Student from '@/pages/student'
import StudentHome from '@/pages/student/student-home'
import Exam from '@/pages/student/exam'
import Admin from '@/pages/admin/index'
import { Message } from 'element-ui'

Vue.use(Router)

let adminRouter = [
  {
    path: 'examManage',
    name: 'examManage',
    redirect: 'examManage/createExam',
    component: () => import('@/pages/admin/index'),
    meta: {
      label: '考试管理',
      iconClass: 'el-icon-edit'
    },
    children: [
      {
        path: 'createExam/:examId?',
        name: 'createExam',
        component: () => import('@/pages/admin/exam-manage/create-exam'),
        meta: {
          label: '创建考试'
        }
      },
      {
        path: 'saveTempExam',
        name: 'saveTempExam',
        component: () => import('@/pages/admin/exam-manage/save-temp-exam'),
        meta: {
          label: '临时保存'
        }
      },
      {
        path: 'examList',
        name: 'examList',
        component: () => import('@/pages/admin/exam-manage/exam-list'),
        meta: {
          label: '考试列表'
        }
      },
      {
        path: 'ExamEvaluation',
        name: 'ExamEvaluation',
        component: () => import('@/pages/admin/exam-manage/exam-evaluation'),
        meta: {
          label: '阅卷评卷'
        }
      }
    ]
  },
  {
    path: 'studentManage',
    name: 'studentManage',
    redirect: 'studentManage/studentList',
    component: () => import('@/pages/admin/index'),
    meta: {
      label: '学生管理',
      iconClass: 'el-icon-document'
    },
    children: [
      {
        path: 'studentList',
        name: 'studentList',
        component: () => import('@/pages/admin/student-manage/student-list'),
        meta: {
          label: '学生列表'
        }
      },
      {
        path: 'scoreManage',
        name: 'scoreManage',
        component: () => import('@/pages/admin/student-manage/score-manage'),
        meta: {
          label: '成绩管理'
        }
      },
      // {
      //   path: 'studentMessage',
      //   name: 'studentMessage',
      //   component: () => import('@/pages/admin/student-manage/student-message'),
      //   meta: {
      //     label: '学生留言'
      //   }
      // }
    ]
  },
  {
    path: 'classManage',
    name: 'classManage',
    component: () => import('@/pages/admin/index'),
    meta: {
      label: '班级管理',
      iconClass: 'el-icon-date'
    },
    redirect: 'classManage/index',
    noChildren: true,
    children: [
      {
        path: 'index',
        component: () => import('@/pages/admin/class-manage')
      }
    ]
  },
  {
    path: 'setNotice',
    name: 'setNotice',
    component: () => import('@/pages/admin/index'),
    meta: {
      label: '公告管理',
      iconClass: 'el-icon-bell'
    },
    redirect: 'setNotice/index',
    noChildren: true,
    children: [
      {
        path: 'index',
        component: () => import('@/pages/admin/set-notice')
      }
    ]
  }
]

let studentRouter = [
  {
    path: 'studentHome',
    name: 'StudentHome',
    component: StudentHome
  },
  {
    path: 'exam/:examId?',
    name: 'Exam',
    component: Exam
  },
  {
    path: 'examResult/:examId?',
    name: 'ExamResult',
    component: () => import('@/pages/student/exam-result')
  },
  {
    path: 'studentPersonal',
    name: 'StudentPersonal',
    component: () => import('@/pages/student/student-personal')
  },
  {
    path: 'noticeList',
    name: 'NoticeList',
    component: () => import('@/pages/student/notice-list')
  }
]
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/examManage/createExam',
      component: Admin,
      children: adminRouter
    },
    {
      path: '/student',
      name: 'student',
      redirect: '/student/studentHome',
      component: Student,
      children: studentRouter
    }
  ]
})

export default router
export { adminRouter }

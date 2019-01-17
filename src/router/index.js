import Vue from 'vue'
import Router from 'vue-router'
import Exam from '@/pages/exam'
import CreateExam from '@/pages/create-exam'

Vue.use(Router)

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
    }
  ]
})

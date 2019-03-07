import request from './index.js'

export const config = {
  login: {
    url: '/login'
  },
  saveExam: {
    url: '/saveExam'
  },
  getTeacherExamList: {
    url: '/getTeacherExamList'
  },
  deleteTempExam: {
    url: '/deleteTempExam'
  },
  getExamInfoFromTeacher: {
    url: '/getExamInfoFromTeacher'
  },
  getTeacherClassroom: {
    url: '/getTeacherClassroom'
  },
  getStudentList: {
    url: '/getStudentList'
  }
}

export default function api (fnName, data) {
  return request(config, fnName, data)
}

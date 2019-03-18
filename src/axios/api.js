import request from './index.js'

export const config = {
  login: {
    url: '/login'
  },
  saveExam: {
    url: '/saveExam'
  },

  // 班级管理
  getClassroomList: {
    url: '/getClassroomList'
  },
  getTeacherClassroom: {
    url: '/getTeacherClassroom'
  },
  setTeacherClassroom: {
    url: '/setTeacherClassroom'
  },

  // 获取考试列表（教师）
  getTeacherExamList: {
    url: '/getTeacherExamList'
  },
  deleteTempExam: {
    url: '/deleteTempExam'
  },
  getExamInfoFromTeacher: {
    url: '/getExamInfoFromTeacher'
  },
  getStudentList: {
    url: '/getStudentList'
  }
}

export default function api (fnName, data) {
  return request(config, fnName, data)
}

import request from './index.js'

export const config = {
  login: {
    url: '/login'
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
  },

  // 临时保存试卷
  saveExam: {
    url: '/saveExam'
  },
  checkPublishExam: {
    url: '/checkPublishExam'
  }
}

export default function api (fnName, data) {
  return request(config, fnName, data)
}

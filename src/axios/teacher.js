export default {
  // 获取班级列表
  getClassroomList: {
    url: '/getClassroomList'
  },
  // 获取当前教师班级
  getTeacherClassroom: {
    url: '/getTeacherClassroom'
  },
  // 设置教师班级
  setTeacherClassroom: {
    url: '/setTeacherClassroom'
  },
  // 获取考试列表（教师）
  getTeacherExamList: {
    url: '/getTeacherExamList'
  },
  // 获取考试信息
  getExamInfoFromTeacher: {
    url: '/getExamInfoFromTeacher'
  },
  // 获取学生列表
  getStudentList: {
    url: '/getStudentList'
  },
  // 临时保存试卷
  saveExam: {
    url: '/saveExam'
  },
  // 删除临时保存考试
  deleteTempExam: {
    url: '/deleteTempExam'
  },
  // 发布考试
  publishExam: {
    url: '/publishExam'
  },
  // 获取学生答卷信息
  getStudentExamResultInfo: {
    url: '/getStudentExamResultInfo'
  }
}

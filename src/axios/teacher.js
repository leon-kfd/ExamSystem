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
  },
  // 获取教师公告列表
  getNoticeListFromTeacher: {
    url: '/getNoticeListFromTeacher'
  },
  // 发布公告
  publishOrEditNotice: {
    url: '/publishOrEditNotice'
  },
  // 删除公告
  deleteNotice: {
    url: '/deleteNotice'
  },
  // 获取公告详情
  getNoticeDetailFromTeacher: {
    url: '/getNoticeDetailFromTeacher'
  },
  // 获取教师信息
  getTeacherInfo: {
    url: '/getTeacherInfo'
  },
  // 获取阅卷评卷列表
  getEvaluationList: {
    url: '/getEvaluationList'
  },
  // 获取评卷的信息
  getEvaluationDetail: {
    url: '/getEvaluationDetail'
  },
  // 评卷
  setEvaluation: {
    url: '/setEvaluation'
  },
  // 获取含有问答题的考试列表（阅卷评卷）
  getEssayExamList: {
    url: '/getEssayExamList'
  }
}

export default {
  // 获取学生考试列表
  getStudentExamList: {
    url: '/getStudentExamList'
  },
  // 获取学生已完成考试列表
  getStudentFinishedExamList: {
    url: '/getStudentFinishedExamList'
  },
  // 获取学生当前考试列表
  getStudentCurrentExamList: {
    url: '/getStudentCurrentExamList'
  },
  // 获取考试信息
  getExamInfoFromStudent: {
    url: '/getExamInfoFromStudent'
  },
  // 提交考试
  submitExam: {
    url: '/submitExam'
  },
  // 获取学生成绩
  getStudentScoreList: {
    url: '/getStudentScoreList'
  },
  // 获取已完成考试列表
  getTeacherFinishedExamList: {
    url: '/getTeacherFinishedExamList'
  },
  // 学生获取考试结果详情
  getExamResultInfoFromStudent: {
    url: '/getExamResultInfoFromStudent'
  },
  // 获取学生信息
  getStudentInfo: {
    url: '/getStudentInfo'
  },
  // 班级远程搜索
  getClassroomByQueryStr: {
    url: '/getClassroomByQueryStr'
  },
  // 更改学生信息
  updateStudentInfo: {
    url: '/updateStudentInfo'
  },
  // 获取公告列表
  getStudentNoticeList: {
    url: '/getStudentNoticeList'
  },
  // 获取公告详情
  getNoticeDetailFromStudent: {
    url: '/getNoticeDetailFromStudent'
  },
  // 获取全部公告列表
  getStudentAllNoticeList: {
    url: '/getStudentAllNoticeList'
  },
  // 上传头像
  uploadAvatar: {
    url: '/uploadAvatar',
    methods: 'get'
  }
}

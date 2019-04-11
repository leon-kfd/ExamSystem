<template>
  <div id="ExamResult">
    <div class="page-body">
      <div class="nav-title">
        <i class="el-icon-download"
           @click="$router.push({name: 'StudentHome'})"></i>
        <p class="title">考试结果信息</p>
      </div>
      <main class="result-body"
            v-loading="loading">
        <student-exam :exam-info="examInfo"
                      :question-list="questionList"></student-exam>
      </main>
    </div>
  </div>
</template>
<script>
import StudentExam from '@/components/student-exam'
export default {
  name: 'ExamResult',
  components: { StudentExam },
  data () {
    return {
      loading: false,
      examId: '',
      examInfo: {
        autoMarking: 1,
        classroom: '',
        course: '',
        endTime: '',
        long: 120,
        publisher: '',
        randomOrder: 1,
        startTime: '',
        title: ''
      },
      questionList: []
    }
  },
  mounted () {
    this.examId = this.$route.params.examId
    this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      await this.$api('getExamResultInfoFromStudent', {
        examId: this.examId
      }).then(data => {
        this.examInfo = data.examInfo
        this.questionList = data.questionList
      }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-body {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px #ccc;
  margin-top: 70px;
  padding: 15px 10px;
  margin-bottom: 20px;
  min-height: 500px;
}
.nav-title {
  width: 100%;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 38px;
  i {
    position: absolute;
    font-size: 24px;
    display: block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    transform: rotate(90deg);
    left: 5px;
    top: -1px;
    color: #409eff;
    cursor: pointer;
    transition: left 0.2s;
    &:hover {
      left: 0;
    }
  }
  .title {
    height: 36px;
    line-height: 36px;
    color: #409eff;
  }
}
.result-body {
  padding: 5px;
  min-height: 300px;
}
</style>

<template>
  <div id="ExamReport"
       class="page">
    <div class="h-operation clear">
      <span class="h-operation-text">考试</span>
      <el-select v-model="CurrentExam"
                 @change="examChange"
                 size="small">
        <el-option v-for="(item,index) in examList"
                   :key="index"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select>
    </div>
    <div class="report-body">
      <div class="percent-box">
        <div class="title">完成情况</div>
        <div class="content">
          <el-progress :text-inside="true"
                       style="width: 80%"
                       :stroke-width="18"
                       :percentage="70"></el-progress>
        </div>
      </div>
    </div>
    <div class="score-body">
      <div class="score-box">
        <div class="title">成绩统计</div>
        <div class="content">
          <score-pie></score-pie>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ScorePie from '@/components/score-pie'
export default {
  name: 'ExamReport',
  components: {
    ScorePie
  },
  data () {
    return {
      examList: [],
      CurrentExam: '',
      examInfo: {
        autoMarking: 1,
        checkboxCount: 1,
        classroom: [1, 2],
        course: "测试",
        endTime: "2019-05-24 00:00:00",
        essayCount: 1,
        judgeCount: 1,
        long: 120,
        radioCount: 1,
        randomOrder: 1,
        startTime: "2019-05-22 00:00:00",
        title: "测试0522"
      }
    }
  },
  mounted () {
    this.getExamList()
  },
  methods: {
    getExamList () {
      this.$api('getTeacherFinishedExamList').then(data => {
        this.examList = data
      })
    },
    getExamDetail () {
      this.$api('getExamInfoFromTeacher', {
        examId: this.CurrentExam
      }).then(data => {
        console.log(data)
      })
    },
    examChange () {
      this.getExamDetail()
    }
  }
}
</script>
<style lang="scss" scoped>
.percent-box,
.score-box {
  margin-bottom: 20px;
  .title {
    color: #778;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    position: relative;
    margin-bottom: 5px;
    &:after {
      position: absolute;
      content: "";
      left: 0;
      height: 16px;
      top: 7px;
      border-left: 4px solid #bb55c2;
    }
  }
}
</style>

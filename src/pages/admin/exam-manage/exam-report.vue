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
        <div class="title">考试成绩分布占比图</div>
        <div class="content">
          <score-pie></score-pie>
        </div>
      </div>
    </div>
    <div class="question-report">
      <div class="question-box">
        <div class="title">试题正确率分析</div>
        <div class="content">
          <test-analysis></test-analysis>
        </div>
      </div>
    </div>
    <div class="number-count">
      <div class="number-box">
        <div class="title">考试详细统计</div>
        <div class="content">
          <p class="number-item">
            <span class="name">完成情况:</span>
            <span class="text">45 <span class="tip">/ 50</span></span>
          </p>
          <p class="number-item">
            <span class="name">平均分:</span>
            <span class="text avg">80 <span class="tip">分</span></span>
          </p>
          <p class="number-item">
            <span class="name">最高分:</span>
            <span class="text max">95 <span class="tip">分</span></span>
          </p>
          <p class="number-item">
            <span class="name">最低分:</span>
            <span class="text min">58 <span class="tip">分</span></span>
          </p>
          <p class="number-item">
            <span class="name">平均用时:</span>
            <span class="text">30 <span class="tip">分钟</span></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ScorePie from '@/components/score-pie'
import TestAnalysis from '@/components/test-analysis'
export default {
  name: 'ExamReport',
  components: {
    ScorePie,
    TestAnalysis
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
.score-box,
.number-box,
.question-box {
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
.score-body,
.number-count,
.question-report {
  display: inline-block;
  vertical-align: top;
  margin-right: 50px;
}
.number-box {
  .content {
    padding: 10px 40px;
    .number-item {
      margin-bottom: 15px;
      position: relative;
      user-select: none;
      &:after {
        content: "";
        position: absolute;
        top: 5px;
        left: -15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: #5060e9;
        box-shadow: 0 0 2px rgba(80, 96, 233, 0.5);
      }
      .name {
        color: #778;
        display: inline-block;
      }
      .text {
        font-size: 16px;
        font-weight: bold;
        color: #262626;
        .tip {
          font-size: 14px;
          color: #778;
        }
      }
    }
  }
}
</style>

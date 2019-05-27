<template>
  <div id="ExamReport"
       class="page">
    <div class="h-operation clear">
      <span class="h-operation-text">考试</span>
      <el-select v-model="CurrentExam"
                 v-loading="examListLoading"
                 @change="examChange"
                 size="small">
        <el-option v-for="(item,index) in examList"
                   :key="index"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select>
    </div>
    <div class="report-body"
         :class="{'report-empty': !CurrentExam}"
         v-loading="loading">
      <div class="percent-box">
        <div class="title">完成情况</div>
        <div class="content">
          <el-progress :text-inside="true"
                       style="width: 80%"
                       :stroke-width="18"
                       :percentage="examPercentage"></el-progress>
        </div>
      </div>
      <div class="number-count">
        <div class="number-box">
          <div class="title">考试结果统计</div>
          <div class="exam-info-content">
            <dl>
              <dt>试卷题目</dt>
              <dd>{{examInfo.exam_title}}</dd>
            </dl>
            <!-- <dl>
              <dt>发布时间</dt>
              <dd>{{examInfo.publish_date}}</dd>
            </dl> -->
            <dl>
              <dt>考试时长</dt>
              <dd>{{examInfo.exam_long}} 分钟</dd>
            </dl>
            <!-- <dl>
              <dt>开始时间</dt>
              <dd style="font-size: 13px;color: #445">{{examInfo.exam_starttime}}</dd>
            </dl>
            <dl>
              <dt>结束时间</dt>
              <dd style="font-size: 13px;color: #445">{{examInfo.exam_endtime}}</dd>
            </dl> -->
            <dl>
              <dt>考试班级</dt>
              <dd>
                <el-tag size="mini"
                        type="info"
                        v-for="item in examClass"
                        style="margin-right: 4px;margin-bottom: 4px"
                        :key="item">{{item}}</el-tag>
              </dd>
            </dl>
            <dl>
              <dt>相关课程</dt>
              <dd>{{examInfo.exam_course}}</dd>
            </dl>
            <dl>
              <dt>试卷题量</dt>
              <dd>
                <el-row>
                  <el-col :span="6">
                    <p class="type-count-title">单选</p>
                  </el-col>
                  <el-col :span="6">
                    <p class="type-count-title">判断</p>
                  </el-col>
                  <el-col :span="6">
                    <p class="type-count-title">多选</p>
                  </el-col>
                  <el-col :span="6">
                    <p class="type-count-title">问答</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <p class="type-count-text">{{examInfo.radio_count}}</p>
                  </el-col>
                  <el-col :span="6">
                    <p class="type-count-text">{{examInfo.judge_count}}</p>
                  </el-col>
                  <el-col :span="6">
                    <p class="type-count-text">{{examInfo.checkbox_count}}</p>
                  </el-col>
                  <el-col :span="6">
                    <p class="type-count-text">{{examInfo.essay_count}}</p>
                  </el-col>
                </el-row>
              </dd>
            </dl>
            <dl>
              <dt>当前状态</dt>
              <dd>
                <el-tag type="success"
                        v-if="examInfo.status==2"
                        size="small">已开始,进行中</el-tag>
                <el-tag type="warning"
                        v-if="examInfo.status==3"
                        size="small">已结束,阅卷未完成</el-tag>
                <el-tag type="success"
                        v-if="examInfo.status==4"
                        size="small">已结束,阅卷完成</el-tag>
              </dd>
            </dl>
          </div>
          <div class="content">
            <p class="number-item">
              <span class="name">完成情况:</span>
              <span class="text">{{examDetail.finishCount}}
                <span class="tip">/ {{examDetail.sumCount}}</span>
                <span class="warning"
                      v-if="examDetail.needEvaluation>0">
                  <br>-检测到 <span style="font-weight:bold;color: #565656">{{examDetail.needEvaluation}}</span> 份试卷未手动阅卷-
                </span>
              </span>
            </p>
            <p class="number-item">
              <span class="name">平均分:</span>
              <span class="text avg">{{examDetail.avg}} <span class="tip">分</span></span>
            </p>
            <p class="number-item">
              <span class="name">最高分:</span>
              <span class="text max">{{examDetail.max}} <span class="tip">分</span></span>
            </p>
            <p class="number-item">
              <span class="name">最低分:</span>
              <span class="text min">{{examDetail.min}} <span class="tip">分</span></span>
            </p>
            <p class="number-item">
              <span class="name">平均用时:</span>
              <span class="text">{{examDetail.avgUseTime}} <span class="tip">分钟</span></span>
            </p>
          </div>
        </div>
      </div>
      <div class="score-body">
        <div class="score-box">
          <div class="title">考试成绩分布占比图<span class="tip">(自动转换成百分制)</span></div>
          <div class="content">
            <score-pie :pieData="pieData"
                       ref="scorePie"></score-pie>
          </div>
        </div>
      </div>
      <div class="question-report">
        <div class="question-box">
          <div class="title">试题正确率分析<span class="tip">(自动过滤掉问答题)</span></div>
          <div class="content">
            <test-analysis :xData="xData"
                           :yData="yData"
                           ref="testAnalysis"></test-analysis>
          </div>
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
      examPercentage: 0,
      examHasEssay: false,
      pieData: [
        { value: 0, name: '≤60' },
        { value: 0, name: '60~70' },
        { value: 0, name: '70~80' },
        { value: 0, name: '80~90' },
        { value: 0, name: '90~100' }
      ],
      xData: [],
      yData: [],
      examDetail: {
        finishCount: 0,
        needEvaluationCount: 0,
        sumCount: 0,
        avg: 0,
        max: 0,
        min: 0,
        avgUseTime: 0
      },
      examInfo: {
        auto_marking: 1,
        checkbox_count: 0,
        created_at: "",
        essay_count: 0,
        exam_class: "1,2",
        exam_course: "",
        exam_endtime: "",
        exam_long: 120,
        exam_starttime: "",
        judge_count: 0,
        publish_date: "",
        radio_count: 0,
        random_order: 1,
        score_sum: 100,
        status: 0,
        updated_at: "",
      },
      examClass: [],
      examListLoading: false,
      loading: false
    }
  },
  filters: {
    classListFilter (val) {
      // return val + 1
      return this.$store.state.classList
    }
  },
  mounted () {
    this.getExamList()
  },
  methods: {
    getExamList () {
      this.examListLoading = true
      this.$api('getTeacherFinishedExamList').then(data => {
        this.examList = data
      }).finally(_ => {
        this.examListLoading = false
      })
    },
    getExamDetail () {
      this.loading = true
      this.$api('getExamReport', {
        examId: this.CurrentExam
      }).then(data => {
        console.log(data)
        this.examInfo = data.examInfo
        this.examClass = data.examInfo.exam_class.split(',').map(item => {
          return this.$store.state.classList.find(item1 => item1.value == item).label
        })
        this.examPercentage = ~~((data.finishStatus.finishedCount + data.finishStatus.needEvaluation) / data.finishStatus.classCount * 100)
        this.examHasEssay = data.examInfo.essay_count > 0
        // 渲染成绩分布饼图
        let scoreFull = data.examInfo.score_sum
        let lt60 = 0, lt70 = 0, lt80 = 0, lt90 = 0, lt100 = 0, studentScoreSum = 0, studentUseTimeSum = 0
        let scoreList = data.studentExamList.map((item, index) => {
          let scoreStudent = ~~(item.objectiveScore + item.essayScore)
          let score = scoreStudent / scoreFull * 100
          switch (true) {
            case score < 60: lt60++; break
            case score < 70: lt70++; break
            case score < 80: lt80++; break
            case score < 90: lt90++; break
            case score >= 90 && score <= 100: lt100++; break
          }
          studentScoreSum += scoreStudent
          studentUseTimeSum += item.useTime
          return scoreStudent
        })
        let pieData = [
          { value: lt60 == 0 ? null : lt60, name: '≤60' },
          { value: lt70 == 0 ? null : lt70, name: '60~70' },
          { value: lt80 == 0 ? null : lt80, name: '70~80' },
          { value: lt90 == 0 ? null : lt90, name: '80~90' },
          { value: lt100 == 0 ? null : lt100, name: '90~100' }
        ]
        this.pieData = pieData
        this.$refs.scorePie.refresh()
        // 渲染错题统计折线
        let xData = []
        let yData = []
        let studentAnswerList = data.studentAnswerList
        for (let i in studentAnswerList) {
          if (studentAnswerList[i].questionType != 4) {
            xData.push("第" + i + "题")
            let truth = studentAnswerList[i].answerList.filter(item => item).length
            let sum = studentAnswerList[i].answerList.length
            let truthPercent = ~~(truth / sum * 100)
            yData.push(truthPercent)
          }
        }
        this.xData = xData
        this.yData = yData
        this.$refs.testAnalysis.refresh()
        // 渲染详情
        this.examDetail.finishCount = data.finishStatus.finishedCount + data.finishStatus.needEvaluation
        this.examDetail.needEvaluation = data.finishStatus.needEvaluation
        this.examDetail.sumCount = data.finishStatus.classCount
        this.examDetail.avg = ~~(studentScoreSum / scoreList.length)
        this.examDetail.max = Math.max(...scoreList)
        this.examDetail.min = Math.min(...scoreList)
        this.examDetail.avgUseTime = ~~(studentUseTimeSum / scoreList.length) + 1
      }).finally(_ => {
        this.loading = false
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
    color: #556;
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
    .tip {
      font-size: 12px;
      color: #889;
      margin-left: 8px;
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
  width: 300px;
  .exam-info-content {
    padding: 5px 20px;
    border-bottom: 1px solid #eee;
    dl {
      margin-bottom: 8px;
      display: flex;
      dt {
        font-size: 14px;
        color: #889;
        line-height: 20px;
        text-align: right;
        margin-right: 10px;
        width: 65px;
      }
      dd {
        width: 100%;
        flex: 1;
        color: #262630;
        font-size: 14px;
        text-align: left;
        line-height: 20px;
        .type-count-title {
          text-align: center;
          color: #454549;
          border-bottom: 1px solid #eee;
        }
        .type-count-text {
          text-align: center;
          font-weight: bold;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
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
        .warning {
          font-size: 12px;
          color: #ffaa22;
          font-weight: normal;
        }
      }
    }
  }
}
.report-empty {
  position: relative;
  &:after {
    content: "请先选择考试...";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 500px;
    font-size: 28px;
    font-weight: bold;
    color: #667;
    background: rgba(255, 255, 255, 0.95);
    transition: all 0.4s;
  }
}
</style>

<template>
  <div id="Exam">
    <div class="page-body">
      <div class="left-box">
        <aside class='user-info'>
          <p class="title"><span>考生信息</span></p>
          <div class="user-info-main">
            <div class="portrait-box">
              <img :src="studentInfo.portrait">
            </div>
            <div class="text-box">
              <dl>
                <dt>姓名</dt>
                <dd>{{studentInfo.username}}</dd>
              </dl>
              <dl>
                <dt>班级</dt>
                <dd>{{studentInfo.classname}}</dd>
              </dl>
              <dl>
                <dt>学号</dt>
                <dd>{{studentInfo.number}}</dd>
              </dl>
            </div>
          </div>
        </aside>
        <aside class="exam-info"
               v-loading="examInfoLoading">
          <p class="title"><span>考试信息</span></p>
          <div class="exam-info-main">
            <dl class="info-itemlist type1">
              <dt>试卷题目</dt>
              <dd>{{examInfo.title}}</dd>
            </dl>
            <dl class="info-itemlist type2">
              <dt>开始时间</dt>
              <dd style="font-size: 14px">{{examInfo.startTime}}</dd>
            </dl>
            <dl class="info-itemlist type2">
              <dt>结束时间</dt>
              <dd style="font-size: 14px">{{examInfo.endTime}}</dd>
            </dl>
            <dl class="info-itemlist type2">
              <dt>相关课程</dt>
              <dd>{{examInfo.course}}</dd>
            </dl>
            <dl class="info-itemlist type2">
              <dt>考试时长</dt>
              <dd>{{examInfo.long}} 分钟</dd>
            </dl>
            <dl class="info-itemlist type2">
              <dt>发布人</dt>
              <dd>{{examInfo.publisher}}</dd>
            </dl>
          </div>
        </aside>
      </div>
      <div class="center-box">
        <main class="exam-body"
              v-loading="examInfoLoading"
              style="min-height: 400px">
          <div class="exam-main">
            <h2 class="exam-title">{{examInfo.title}}</h2>
            <div class="question-list">
              <div class="question-listitem"
                   v-for="(item,index) in questionList"
                   :key="index"
                   :data-question="index">
                <div class="test-item">
                  <div class="test-title">
                    <span class="t-number">{{index+1}}</span>
                    <el-tag class="t-type">{{item.type | questionType}} <span class="score-text">{{item.score}}</span>分</el-tag>
                    <span class="t-info">{{item.title}}</span>
                  </div>
                  <div class="test-answer">
                    <div class="type-radio"
                         v-if="item.type==1">
                      <el-radio-group class="answer"
                                      v-model="item.myAnswer">
                        <el-radio v-for="(optionItem, optionIndex) in item.option"
                                  :key="optionIndex"
                                  class="radio-item"
                                  :label="optionIndex+1"
                                  border>
                          <span class="a-options">{{optionIndex | questionOption}}</span>
                          <span class="a-info">{{optionItem.text}}</span>
                        </el-radio>
                      </el-radio-group>
                    </div>
                    <div class="type-judge"
                         v-if="item.type==2">
                      <el-radio-group class="answer"
                                      v-model="item.myAnswer">
                        <el-radio :label="1"
                                  class="judge-item"
                                  border>
                          <span class="a-options"><i class="el-icon-check"></i></span>
                        </el-radio>
                        <el-radio :label="0"
                                  class="judge-item"
                                  border>
                          <span class="a-options"><i class="el-icon-close"></i></span>
                        </el-radio>
                      </el-radio-group>
                    </div>
                    <div class="type-checkbox"
                         v-if="item.type==3">
                      <el-checkbox-group class="answer"
                                         v-model="item.myAnswer">
                        <el-checkbox class="checkbox-item"
                                     border
                                     v-for="(optionItem, optionIndex) in item.option"
                                     :key="optionIndex"
                                     :label="optionIndex+1">
                          <span class="a-options">{{optionIndex | questionOption}}</span>
                          <span class="a-info">{{optionItem.text}}</span>
                        </el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <div class="type-question"
                         v-if="item.type==4">
                      <div class="answer">
                        <div class="question-item">
                          <el-input type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 8}"
                                    placeholder="请在此处输入答案"
                                    v-model="item.myAnswer">
                          </el-input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div class="submit-btn-box">
          <el-button :type="canSubmitExam?'success':''"
                     :disabled="!canSubmitExam"
                     @click="submitExam"
                     style="width:100%;margin-bottom:10px;">交卷</el-button>
        </div>
      </div>
      <div class="right-box">
        <aside class="exam-timer">
          <p class="title"><span>考试计时器</span></p>
          <div class="timer-box">
            <div class="hour-box timer-item">
              <div class="text">{{this.restHour}}</div>
              <div class="tip">Hour</div>
            </div>
            <div class="minute-box timer-item">
              <div class="text">{{this.restMinute}}</div>
              <div class="tip">Minute</div>
            </div>
            <div class="second-box timer-item">
              <div class="text">{{this.restSecond}}</div>
              <div class="tip">Second</div>
            </div>
          </div>
        </aside>
        <aside class="title-selection">
          <item-selector :selector-list="selectorList"
                         @selector-click="TurnToQuestion"></item-selector>
        </aside>
        <div class="submit-btn-box">
          <el-button :type="canSubmitExam?'success':''"
                     :disabled="!canSubmitExam"
                     @click="submitExam"
                     style="width:100%;margin-bottom:10px;">交卷</el-button>
        </div>
        <aside class='user-exam-info'
               v-loading="examInfoLoading">
          <p class="title"><span>考试信息 & 考生信息</span></p>
          <div class="user-exam-info-main">
            <dl class="info-itemlist">
              <dt>试卷题目</dt>
              <dd>{{examInfo.title}}</dd>
            </dl>
            <dl class="info-itemlist">
              <dt>开始时间</dt>
              <dd style="font-size: 14px">{{examInfo.startTime}}</dd>
            </dl>
            <dl class="info-itemlist">
              <dt>结束时间</dt>
              <dd style="font-size: 14px">{{examInfo.endTime}}</dd>
            </dl>
            <dl class="info-itemlist">
              <dt>相关课程</dt>
              <dd>{{examInfo.course}}</dd>
            </dl>
            <dl class="info-itemlist">
              <dt>考试时长</dt>
              <dd>{{examInfo.long}} 分钟</dd>
            </dl>
            <dl class="info-itemlist">
              <dt>发布人</dt>
              <dd>{{examInfo.publisher}}</dd>
            </dl>
            <dl class="info-itemlist">
              <dt>姓名</dt>
              <dd>Student01</dd>
            </dl>
            <dl class="info-itemlist">
              <dt>班级</dt>
              <dd>15信息管理与信息系统</dd>
            </dl>
            <dl class="info-itemlist">
              <dt>学号</dt>
              <dd>2015034843000</dd>
            </dl>
          </div>
        </aside>
      </div>
    </div>
    <el-dialog :visible.sync="ScoreDialog"
               custom-class="dialog-control">
      <div class="exam-finish-box">
        <h2 class="title">交卷成功!</h2>
        <div class="auto-check-exam">
          <p class="text"><span v-show="hasEssay">客观题</span>自动阅卷已完成, 以下为你的考试结果信息</p>
          <div class="exam-finish-detail">
            <question-section-list :resultList="resultList"></question-section-list>
          </div>
          <p class="score clear">
            <span class="fr">
              <span style="color: #889;margin-right: 5px"><span v-show="hasEssay">客观题</span>得分</span>
              <span style="font-size: 26px;color:#262626;font-weight:bold;padding-right: 8px">{{resultScore}}</span>
            </span>
          </p>
          <el-alert v-show="hasEssay"
                    :closable="false"
                    title="该考试含有问答题，请等待老师阅卷评卷"
                    type="warning"
                    show-icon
                    style="margin-bottom: 10px">
          </el-alert>
        </div>
        <p style="text-align:center">
          <el-button @click="finishExam">考试完成</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ItemSelector from '@/components/item-selector'
import QuestionSectionList from '@/components/question-section-list'
import { ScrollTo } from '@/utils/animate'
export default {
  name: 'Exam',
  components: {
    ItemSelector,
    QuestionSectionList
  },
  data () {
    return {
      studentInfo: {
        username: '',
        number: '',
        classname: '',
        portrait: ''
      },
      questionList: [],
      examInfo: {
        autoMarking: 1,
        checkboxCount: 1,
        classroom: '',
        course: '',
        endTime: '',
        essayCount: 0,
        judgeCount: 0,
        long: 0,
        radioCount: 0,
        randomOrder: 1,
        startTime: '',
        title: ''
      },
      restDuration: 7200,
      durationTimer: null,
      examId: '',
      examInfoLoading: false,
      submitLoading: false,
      ScoreDialog: false,
      resultList: [],
      resultScore: 0,
      hasEssay: false
    }
  },
  filters: {
    questionType (val) {
      let result
      switch (val) {
        case 1: result = '单选题'; break
        case 2: result = '判断题'; break
        case 3: result = '多选题'; break
        case 4: result = '问答题'; break
      }
      return result
    },
    questionOption (val) {
      let result
      switch (val) {
        case 0: result = 'A'; break
        case 1: result = 'B'; break
        case 2: result = 'C'; break
        case 3: result = 'D'; break
        case 4: result = 'E'; break
        case 5: result = 'F'; break
        case 6: result = 'G'; break
      }
      return result
    }
  },
  computed: {
    selectorList () {
      return this.questionList.map((item, index) => {
        let status = 0
        if (typeof item.myAnswer == 'number' && item.myAnswer > -1) {
          status = 1
        } else {
          if (item.myAnswer.length > 0) {
            status = 1
          }
        }
        return {
          id: index + 1,
          status
        }
      })
    },
    restHour () {
      let temp = Math.floor(this.restDuration / 3600) + ''
      if (temp.length < 2) temp = '0' + temp
      return temp
    },
    restMinute () {
      let temp = Math.floor((this.restDuration - this.restHour * 3600) / 60) + ''
      if (temp.length < 2) temp = '0' + temp
      return temp
    },
    restSecond () {
      let temp = this.restDuration - this.restHour * 3600 - this.restMinute * 60 + ''
      if (temp.length < 2) temp = '0' + temp
      return temp
    },
    canSubmitExam () {
      return this.selectorList.every(item => item.status == 1)
    }
  },
  mounted () {
    this.getStudentInfo()
    this.getData()
  },
  methods: {
    async getStudentInfo () {
      if (this.$store.state.studentInfo.username) {
        this.studentInfo = this.$store.state.studentInfo
      } else {
        this.studentInfoLoading = true
        await this.$api('getStudentInfo').then(data => {
          this.studentInfo = {
            username: data.student_name || data.student_account,
            number: data.student_num || '-未设置学号-',
            classname: data.class_fullname || data.class_name || '-未设置班级-',
            portrait: REQUEST_URL + data.portrait_address || '../../static/img/user.jpg'
          }
          this.$store.commit('updateStudentInfo', this.studentInfo)
        }).finally(_ => {
          this.studentInfoLoading = false
        })
      }
    },
    TurnToQuestion (index) {
      let selector_str = `[data-question='${index}']`
      let top = document.querySelector(selector_str).offsetTop - 50
      ScrollTo(top, 500)
    },
    async getData () {
      this.examId = this.$route.params.examId
      this.examInfoLoading = true
      let _this = this
      await this.$api('getExamInfoFromStudent', {
        examId: this.examId
      }).then(data => {
        let questionListData = data.questionList
        questionListData.map((item, index) => {
          switch (item.type) {
            case 1: item.myAnswer = -1; break
            case 2: item.myAnswer = -1; break
            case 3: item.myAnswer = []; break
            case 4: item.myAnswer = ''; break
            default: item.myAnswer = ''
          }
        })
        this.questionList = questionListData
        this.examInfo = data.examInfo

        this.restDuration = data.examInfo.long * 60
        this.timer = setInterval(_ => {
          if (_this.restDuration <= 1) {
            clearInterval(_this.timer)
          }
          _this.restDuration--
        }, 1000)
      }).finally(_ => {
        this.examInfoLoading = false
      })
    },
    submitExam () {
      this.$confirm('此操作将不可返回, 确认执行该操作?', '提示', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            // 计时器停止
            clearInterval(this.timer)
            // 提交试卷
            this.submitLoading = true
            await this.$api('submitExam', {
              examId: this.examId,
              questionAnswerList: this.questionList
            }).then(data => {
              console.log(data)
              done()
              instance.confirmButtonLoading = false
              this.resultList = data.resultList
              this.resultScore = data.score
              this.hasEssay = data.hasEssay
              this.ScoreDialog = true
            }, data => {
              done()
              instance.confirmButtonLoading = false
            }).finally(_ => {
              this.submitLoading = false
            })
          } else {
            done()
          }
        }
      })
    },
    finishExam () {
      this.ScoreDialog = false
      this.$router.push({ name: 'StudentHome' })
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "number";
  // src: url("../assets/fonts/number.ttf");
  src: url("https://fonts.font.im/css?family=Sunflower:300");
}
header,
main,
aside,
footer {
  padding: 8px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 3px #aab;
  margin-bottom: 10px;
  min-height: 20px;
}
.page-body {
  position: relative;
  padding-top: 50px;
  .left-box {
    width: 250px;
    position: fixed;
    top: 60px;
    left: 50%;
    padding: 10px;
    transform: translateX(-570px);
    opacity: 1;
    overflow-y: auto;
    transition: all 0.6s;
    max-height: calc(100vh - 100px);
  }
  .right-box {
    width: 250px;
    position: fixed;
    top: 60px;
    right: 50%;
    transform: translateX(570px);
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 70px);
    .exam-timer {
      min-height: 80px;
    }
    .title-selection {
      min-height: 120px;
    }
    .user-exam-info {
      transform: translateX(100px);
      opacity: 0;
      transition: all 0.6s;
      min-height: 300px;
    }
  }
  .center-box {
    margin: 10px 240px 10px;
    padding: 10px;
    .submit-btn-box {
      display: none;
    }
  }
}
@media screen and (min-width: 820px) and (max-width: 1180px) {
  .container {
    width: 820px;
  }
  .page-body {
    .left-box {
      transform: translateX(-670px);
      opacity: 0;
      transition: all 0.6s;
    }
    .center-box {
      margin: 10px 240px 10px 0;
      .submit-btn-box {
        display: none;
      }
    }
    .right-box {
      transform: translateX(400px);
      .user-exam-info {
        transform: translateX(0);
        opacity: 1;
        transition: transform 0.6s;
      }
    }
  }
}
@media screen and (max-width: 830px) {
  .container {
    width: 100%;
  }
  .page-body {
    .left-box {
      transform: translateX(-670px);
      opacity: 0;
      transition: all 0.6s;
    }
    .center-box {
      margin: 10px auto;
      padding: 0 !important;
      .submit-btn-box {
        display: block;
      }
    }
    .right-box {
      display: none;
    }
  }
  .answer {
    padding: 10px 5px 10px 18px !important;
    .a-options {
      margin-left: -8px !important;
      padding: 0 4px !important;
    }
  }
}
.exam-main {
  .exam-title {
    font-size: 24px;
    padding: 5px 5px 10px;
  }
  .test-item {
    margin-bottom: 10px;
    .test-title {
      display: flex;
      align-items: baseline;
      .t-number {
        font-size: 18px;
        font-weight: bold;
        padding: 0 8px;
      }
      .t-type {
        margin: 0 5px 0 2px;
      }
    }
  }
  .answer {
    padding: 10px 18px;
    width: 100%;
    .radio-item {
      display: flex;
      margin-bottom: 8px;
      width: 95%;
      .a-options {
        padding: 0 10px;
        color: #889;
        font-weight: bold;
      }
      .a-info {
        color: #262626;
        display: inline-block;
        width: 100%;
      }
    }
    .judge-item {
      margin-bottom: 8px;
      width: 100px;
      .a-options {
        i {
          font-weight: bold;
          font-size: 20px;
        }
      }
    }
    .checkbox-item {
      display: flex;
      margin-bottom: 8px;
      width: 95%;
      .a-options {
        padding: 0 10px;
        color: #889;
        font-weight: bold;
      }
      .a-info {
        color: #262626;
        display: inline-block;
        width: 100%;
      }
    }
    .question-item {
      padding: 12px 15px 12px 10px;
    }
  }
}
.exam-timer {
  .title {
    height: 24px;
    line-height: 24px;
    span {
      border-left: 4px solid #409eff;
      font-size: 14px;
      padding-left: 5px;
      color: #262629;
    }
  }
  .timer-box {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    .timer-item {
      text-align: center;
      width: 33%;
      .text {
        font-size: 30px;
        font-weight: bold;
        color: #262627;
        line-height: 36px;
        font-family: "number";
        position: relative;
      }
      .tip {
        font-size: 12px;
        color: #99a;
      }
      &:not(:last-child) {
        .text::after {
          content: ":";
          position: absolute;
          right: -3px;
          top: 0;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }
}
.exam-info,
.user-info,
.user-exam-info {
  .title {
    height: 24px;
    line-height: 24px;
    span {
      border-left: 4px solid #409eff;
      font-size: 14px;
      padding-left: 5px;
      color: #262629;
    }
  }
}
.exam-info {
  .exam-info-main {
    dl {
      margin: 10px 0;
      display: flex;
      line-height: 20px;
      dt {
        font-size: 14px;
        color: #889;
      }
      dd {
        width: 100%;
        flex: 1;
        color: #262630;
        font-size: 15px;
        text-align: right;
      }
    }
  }
}
.user-info {
  .user-info-main {
    .portrait-box {
      box-sizing: border-box;
      text-align: center;
      box-sizing: border-box;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        padding: 5px;
        border: 2px solid #f2aa33;
      }
    }
    .text-box {
      dl {
        margin: 10px 0;
        display: flex;
        line-height: 20px;
        dt {
          font-size: 14px;
          color: #889;
        }
        dd {
          width: 100%;
          flex: 1;
          color: #262630;
          font-size: 15px;
          text-align: right;
        }
      }
    }
  }
}
.user-exam-info {
  .user-exam-info-main {
    dl {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0;
      line-height: 20px;
      dt {
        width: 70px;
        font-size: 14px;
        color: #889;
      }
      dd {
        width: calc(100% - 70px);
        text-align: right;
        color: #262630;
        font-size: 15px;
      }
    }
  }
}
.exam-finish-box {
  .title {
    text-align: center;
    color: #67c23a;
    margin-bottom: 15px;
  }
  .auto-check-exam {
    .text {
      text-align: center;
      color: #667;
      font-size: 13px;
      padding-bottom: 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #e0e0e0;
    }
    .score {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #e0e0e0;
      margin-bottom: 30px;
    }
  }
}
</style>
<style lang="scss">
.el-radio.is-bordered,
.el-checkbox.is-bordered {
  margin-left: 10px;
}
.answer {
  .el-radio.is-bordered.radio-item {
    height: auto;
    padding: 12px 20px 12px 10px;
    .el-radio__label {
      display: flex;
      white-space: normal;
    }
  }
  .el-radio.is-bordered.judge-item {
    height: auto;
    padding: 8px 10px;
    .el-radio__label {
      vertical-align: middle;
    }
  }
  .el-checkbox.is-bordered.checkbox-item {
    height: auto;
    padding: 12px 20px 12px 10px;
    .el-checkbox__label {
      display: flex;
      white-space: normal;
    }
    .el-checkbox__input {
      padding-top: 3px;
    }
  }
}
textarea {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.dialog-control {
  min-width: 280px;
  max-width: 480px;
}
</style>

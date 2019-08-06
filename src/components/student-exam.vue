<template>
  <div id="StudentExam">
    <p class="exam-title">{{examInfo.title}}</p>
    <div class="exam-detail"
         v-if="showExamDetail">
      <div class="info-listitem">
        <div class="title">考试时间</div>
        <div class="content">{{examInfo.startTime}} ~ {{examInfo.endTime}}</div>
      </div>
      <div class="info-listitem">
        <div class="title">考试班级</div>
        <div class="content">{{examInfo.classroom.map(a=>classList.filter(b=>b.value==a)[0].label).join(',')}}</div>
      </div>
      <div class="info-listitem">
        <div class="title">相关课程</div>
        <div class="content">{{examInfo.course}}</div>
      </div>
      <div class="info-listitem">
        <div class="title">考试时长</div>
        <div class="content">{{examInfo.long}} 分钟</div>
      </div>
      <div class="info-listitem">
        <div class="title">模式</div>
        <div class="content">
          <span style="margin-right: 25px"
                :class="{'text-success':examInfo.autoMarking}">自动阅卷 <i :class="examInfo.autoMarking ? 'el-icon-check':'el-icon-close'"></i></span>
          <!-- <span :class="{'text-success':examInfo.randomOrder}">随机顺序 <i :class="examInfo.randomOrder ? 'el-icon-check':'el-icon-close'"></i></span> -->
        </div>
      </div>
    </div>
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
              <div class="answer">
                <div class="radio-item"
                     v-for="(optionItem, optionIndex) in item.option"
                     :key="optionIndex"
                     :class="{'true': (item.studentAnswer == optionIndex + 1) && item.answer, 'false': (item.studentAnswer == optionIndex + 1) && !item.answer}">
                  <span class="a-options">{{optionIndex | questionOption}}</span>
                  <span class="a-info">{{optionItem.text}}</span>
                </div>
                <div class="correct-answer"
                     v-show="!item.answer">- 正确答案: <span>{{item.questionAnswer | radioAnswerFilter}}</span></div>
              </div>
            </div>
            <div class="type-judge"
                 v-if="item.type==2">
              <div class="answer">
                <div class="judge-item"
                     :class="{'true': (item.studentAnswer == 1) && item.answer, 'false': (item.studentAnswer == 1) && !item.answer}">
                  <span class="a-options"><i class="el-icon-check"></i></span>
                </div>
                <div class="judge-item"
                     :class="{'true': (item.studentAnswer == 2) && item.answer, 'false': (item.studentAnswer == 0) && !item.answer}">
                  <span class="a-options"><i class="el-icon-close"></i></span>
                </div>
              </div>
            </div>
            <div class="type-checkbox"
                 v-if="item.type==3">
              <div class="answer">
                <div class="checkbox-item"
                     v-for="(optionItem, optionIndex) in item.option"
                     :key="optionIndex"
                     :class="{
                           'true': (item.studentAnswer.split(',').includes(optionIndex + 1 + '')) && item.answer,
                           'false': (item.studentAnswer.split(',').includes(optionIndex + 1 + '')) && !item.answer
                          }">
                  <span class="a-options">{{optionIndex | questionOption}}</span>
                  <span class="a-info">{{optionItem.text}}</span>
                </div>
                <div class="correct-answer"
                     v-show="!item.answer">- 正确答案: <span>{{item.questionAnswer | checkboxAnswerFilter}}</span></div>
              </div>
            </div>
            <div class="type-essay"
                 v-if="item.type==4 && item.studentAnswer != 'none'">
              <div class="answer">
                <div class="question-item">
                  <div class="essay-answer">{{item.studentAnswer}}</div>
                </div>
                <div class="essay-result"
                     v-if="item.essayStatus">- 已批阅，得分： <span class="student-score">{{item.essayScore}}</span><span> / {{item.score}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StudentExam',
  props: {
    examInfo: {
      type: Object,
      default () {
        return {
          classroom: []
        }
      }
    },
    questionList: {
      require: true
    },
    showExamDetail: {
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    classList () {
      return this.$store.state.classList
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
    },
    radioAnswerFilter (val) {
      let option = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'E',
        '6': 'F',
        '7': 'G'
      }
      return option[val]
    },
    checkboxAnswerFilter (val) {
      let option = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'E',
        '6': 'F',
        '7': 'G'
      }
      let result = []
      val.split(',').map(item => {
        result.push(option[item])
      })
      return result.join(', ')
    }
  }
}
</script>
<style lang="scss" scoped>
.exam-title {
  font-size: 24px;
  padding: 10px 5px 15px;
}
.question-list {
  .question-listitem {
    .test-item {
      margin-bottom: 10px;
      .test-title {
        display: flex;
        align-items: baseline;
        .t-number {
          font-size: 18px;
          font-weight: bold;
          margin-right: 8px;
          min-width: 24px;
          text-align: right;
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
        width: 95%;
        padding: 5px 10px;
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
        width: 100px;
        padding: 5px 10px 5px 20px;
        .a-options {
          i {
            font-weight: bold;
          }
        }
      }
      .checkbox-item {
        display: flex;
        width: 95%;
        padding: 5px 10px;
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
        display: flex;
        width: 95%;
        margin-left: 8px;
        .essay-answer {
          width: 100%;
          padding: 10px;
          background: #f0f0f0;
          border-radius: 4px;
          border: 1px solid #ccc;
          color: #667;
        }
      }
      .radio-item,
      .judge-item,
      .checkbox-item {
        border-radius: 4px;
        margin-left: 8px;
        position: relative;
        margin-bottom: 8px;
        height: auto;
        &.true {
          border: 1px solid #67c23a;
          &:after {
            font-family: element-icons !important;
            content: "\e6da";
            position: absolute;
            top: -10px;
            left: -8px;
            display: block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 20px;
            color: #67c23a;
            background: #fff;
          }
        }
        &.false {
          border: 1px solid #f56c6c;
          &:after {
            font-family: element-icons !important;
            content: "\e6db";
            position: absolute;
            top: -10px;
            left: -8px;
            display: block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 20px;
            color: #f56c6c;
            background: #fff;
          }
        }
      }
      .correct-answer {
        color: #667;
        margin: 5px 0;
        padding-left: 10px;
        span {
          color: #262626;
          font-weight: bold;
        }
      }
      .essay-result {
        color: #667;
        margin: 5px 0;
        padding-left: 10px;
        .student-score {
          color: #262626;
          font-weight: bold;
          font-size: 18px;
        }
      }
    }
  }
}
.exam-detail {
  background: #f5f6f7;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  border-radius: 4px;
  .info-listitem {
    display: flex;
    padding: 0 10px;
    margin: 10px 0;
    .title {
      width: 80px;
      text-align: right;
      margin-right: 20px;
    }
    .content {
      flex: 1;
    }
  }
}
</style>

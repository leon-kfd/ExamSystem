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
        <p class="exam-title">{{examInfo.title}}</p>
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
                         :class="{'true': (item.studentAnswer == 2) && item.answer, 'false': (item.studentAnswer == 1) && !item.answer}">
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
                     v-if="item.type==4">
                  <div class="answer">
                    <div class="question-item">
                      <div class="essay-answer">{{item.answer}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExamResult',
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
        console.log(data)
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
          padding: 5px 10px;
          border-radius: 4px;
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
              content: "\E611";
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
              content: "\E60F";
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
      }
    }
  }
}
</style>

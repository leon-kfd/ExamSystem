<template>
  <div class="page">
    <div class="container">
      <div class="create-exam-box">
        <h1 style="padding: 8px">-</h1>
        <div class="question-box">
          <div class="test-item"
               v-for="(item, index) in questionList"
               :key="index">
            <p class="test-title"
               :class="{editing: editTitleIndex == index}">
              <span class="t-number">{{index+1}}</span>
              <el-tag class="t-type">{{item.type | questionType}}</el-tag>
              <span class="t-info"
                    @click="editTitleIndex=index">{{item.title}}</span>
              <el-input v-model="item.title"
                        class="t-input"
                        v-focus
                        @blur="editTitleIndex = -1"
                        size="small"
                        suffix-icon="el-icon-edit"></el-input>
            </p>
            <div class="answer-box"
                 v-if="item.type == 1 || item.type == 3">
              <div class="option-item"
                   v-for="(optionItem, optionIndex) in item.option"
                   :key="optionIndex">
                <div class="options-box"
                     :class="{editing: editOptionIndex == optionIndex && currentTestIndex == index}">
                  <span class="options">{{optionIndex | questionOption}}</span>
                  <span class="info"
                        @click="editOptionIndex = optionIndex; currentTestIndex = index">{{optionItem.text}}</span>
                  <el-input v-model="optionItem.text"
                            class="t-input"
                            v-focus
                            size="small"
                            @blur="editOptionIndex = -1; currentTestIndex = -1"
                            suffix-icon="el-icon-edit"></el-input>
                  <div class="operation-box">
                    <span class="operation-item"
                          @click="setAnswer(index, optionIndex)">设为答案</span>
                    <span class="operation-item"
                          v-if="optionIndex!=0"
                          @click="moveUp(index, optionIndex)">上移</span>
                    <span class="operation-item"
                          v-if="optionIndex!=item.option.length-1"
                          @click="moveDown(index, optionIndex)">下移</span>
                    <span class="operation-item"
                          @click="delOption(index, optionIndex)">删除</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="answer-box judge"
                 v-if="item.type == 2">
              <div class="option-item">
                <div class="options-box">
                  <span class="options"><i class="el-icon-check"></i></span>
                  <div class="operation-box">
                    <span class="operation-item"
                          @click="setAnswer(index, 0)">设为答案</span>
                  </div>
                </div>
              </div>
              <div class="option-item">
                <div class="options-box">
                  <span class="options"><i class="el-icon-close"></i></span>
                  <div class="operation-box">
                    <span class="operation-item"
                          @click="setAnswer(index, 1)">设为答案</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="create-btn-box">
          <el-button type="primary"
                     plain
                     icon="el-icon-plus">单选题</el-button>
          <el-button type="primary"
                     plain
                     icon="el-icon-plus">判断题</el-button>
          <el-button type="primary"
                     plain
                     icon="el-icon-plus">多选题</el-button>
          <el-button type="primary"
                     plain
                     icon="el-icon-plus">问答题</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      typeList: ['单选题', '判断题', '多选题', '问答题'],
      questionList: [
        {
          type: 1,
          title: '单选题1 - title 测试',
          option: [
            {
              text: 'option1'
            },
            {
              text: 'option2'
            },
            {
              text: 'option3'
            },
            {
              text: 'option4'
            }
          ],
          answer: 1
        },
        {
          type: 2,
          title: '判断题2 - title 测试',
          answer: 1
        },
        {
          type: 3,
          title: '多选题 - title',
          option: [
            {
              text: 'option1'
            },
            {
              text: 'option2'
            },
            {
              text: 'option3'
            },
            {
              text: 'option4'
            }
          ],
          answer: [1, 2]
        },
        {
          type: 4,
          title: '问答题 - title',
          answer: ''
        }
      ],
      currentTestIndex: -1,
      editTitleIndex: -1,
      editOptionIndex: -1
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
  methods: {
    setAnswer (questionIndex, optionIndex) { },
    moveUp (questionIndex, optionIndex) { },
    moveDown (questionIndex, optionIndex) { },
    delOption (questionIndex, optionIndex) { }
  },
  directives: {
    focus: {
      update: el => el.querySelector('input').focus(),
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 1160px;
  margin: 0 auto;
  padding: 10px;
}
.create-exam-box {
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 10px #aaa;
  .create-btn-box {
    padding: 10px 0;
    text-align: center;
    border-top: 1px solid #ccc;
  }
  .question-box {
    padding: 10px;
    .test-item {
      padding-bottom: 15px;
      margin-bottom: 15px;
      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
      .test-title {
        display: flex;
        .t-number {
          font-size: 18px;
          color: #889;
          font-weight: bold;
          margin: 0 8px;
          line-height: 32px;
        }
        .t-type {
          margin: 0 8px;
        }
        .t-info {
          line-height: 32px;
        }
        .t-input {
          display: none;
        }
        &.editing {
          .t-input {
            display: block;
          }
          .t-info {
            display: none;
          }
        }
      }
      .answer-box {
        padding: 5px 15px;
        .option-item {
          margin: 5px 0;
          .options-box {
            display: flex;
            border-radius: 4px;
            .options {
              font-weight: bold;
              font-size: 18px;
              color: #889;
              padding: 0 10px;
              line-height: 32px;
              i {
                font-weight: bold;
                font-size: 18px;
              }
            }
            .info {
              width: 100%;
              flex: 1;
              line-height: 32px;
              color: #262630;
            }
            .t-input {
              display: none;
              width: 100%;
              flex: 1;
            }
            &.editing {
              .info {
                display: none;
              }
              .t-input {
                display: block;
              }
            }
            .operation-box {
              width: 230px;
              text-align: right;
              .operation-item {
                margin: 0 5px;
                display: none;
                font-size: 14px;
                line-height: 32px;
                color: #2d8cf0;
                cursor: pointer;
              }
            }
            &:hover {
              background: #f0f0f0;
              .operation-box {
                .operation-item {
                  display: inline-block;
                }
              }
            }
          }
        }
        &.judge {
          .option-item {
            .options-box {
              width: 150px;
              .operation-box {
                width: 100px;
              }
            }
          }
        }
      }
    }
  }
}
</style>



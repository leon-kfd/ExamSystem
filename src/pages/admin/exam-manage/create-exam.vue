<template>
  <div id="CreateExam">
    <div class="back-to-top"
         :class="{active:showBackTop}"
         :style="{transform: `translateX(${IsCollapse?629:695}px)`}"
         @click="backTop">
      <i class="el-icon-arrow-up"></i>
    </div>
    <div class="header-operation"
         :style="{paddingLeft: `${IsCollapse?84:220}px`,transform: `translateX(${-scrollLeft}px`}">
      <div class="container clear"
           style="background: #fff">
        <div class="create-btn-box fl">
          <el-button type="primary"
                     plain
                     icon="el-icon-plus"
                     @click="addQuerstion(1)">单选题</el-button>
          <el-button type="primary"
                     plain
                     icon="el-icon-plus"
                     @click="addQuerstion(2)">判断题</el-button>
          <el-button type="primary"
                     plain
                     icon="el-icon-plus"
                     @click="addQuerstion(3)">多选题</el-button>
          <el-button type="primary"
                     plain
                     icon="el-icon-plus"
                     @click="addQuerstion(4)">问答题</el-button>
        </div>
        <div class="submit-btn-box fr">
          <el-button type="success"
                     plain
                     icon="el-icon-upload2"
                     @click="saveTemp"
                     :loading="saveTempLoading">临时保存</el-button>
          <el-button type="warning"
                     icon="el-icon-check"
                     @click="checkPublishExam"
                     :disabled="saveTempLoading">发布考试</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="create-exam-box"
           v-loading="saveTempLoading||publishExamLoading||dataLoading">
        <h3 class="main-title"><span>考试信息</span></h3>
        <div class="exam-info-box clear">
          <div class="form fl">
            <el-form ref="examForm"
                     :rules="examForm.rules"
                     :model="examForm.fields"
                     label-width="100px"
                     style="width: 550px">
              <el-form-item label="考试题目"
                            prop="title">
                <el-input v-model="examForm.fields.title"
                          placeholder="请输入试卷标题"
                          style="width: 450px"></el-input>
              </el-form-item>
              <el-form-item label="考试时间"
                            prop="date">
                <el-date-picker v-model="examForm.fields.date"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                style="width: 450px">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="考试班级"
                            prop="class">
                <el-select v-model="examForm.fields.class"
                           multiple
                           placeholder="请选择"
                           style="width: 450px">
                  <el-option v-for="item in classList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="相关课程"
                            prop="course">
                <el-input v-model="examForm.fields.course"
                          placeholder="请输入考试相关课程"
                          style="width: 450px">
                </el-input>
              </el-form-item>
              <el-form-item label="考试时长"
                            prop="long">
                <el-input-number v-model="examForm.fields.long"
                                 controls-position="right"
                                 :step="10"
                                 :min="10"
                                 :max="1440"
                                 style="width: 120px"></el-input-number>
                <span style="margin-left: 8px;color: #889">分钟</span>
              </el-form-item>
              <el-form-item label="自动阅卷">
                <el-switch v-model="examForm.fields.autoMarking"
                           :active-value="1"
                           :inactive-value="0"></el-switch>
              </el-form-item>
              <el-form-item label="随机顺序">
                <el-switch v-model="examForm.fields.randomOrder"
                           :active-value="1"
                           :inactive-value="0"></el-switch>
              </el-form-item>
            </el-form>
          </div>
          <div class="tips fl">
            <el-alert title="Tips"
                      type="warning"
                      :closable="false"
                      show-icon>
              <slot>
                <ul class="tips-list">
                  <li>考试班级可多选，若无相应班级，请老师先在班级管理页面添加自己的班级</li>
                  <li>当考试为纯选择题题型时可以开启自动阅卷功能，考试结束自动计算考试得分，问答题不可进行自动阅卷</li>
                  <li>当开启了自动阅卷功能时，可以开启随机顺序功能，考试时题目顺序随机，选项顺序随机，选项会进行自动阅卷，编辑试题时不需再进行试题与选项的顺序更改</li>
                  <li>添加题目后记得设置题目相应的分数，请尽量将总分控制在100分</li>
                  <li>考虑到不可控因素，当考试题量较多时，请多使用临时保存功能，以防数据丢失。可以在临时保存页面找到自己保存的试题继续进行编辑。</li>
                </ul>
              </slot>
            </el-alert>
          </div>
        </div>
        <h3 class="main-title"><span>考试题目</span></h3>
        <div class="question-box">
          <div class="no-question"
               v-if="questionList.length==0">请添加试题内容...</div>
          <div class="test-item"
               v-for="(item, index) in questionList"
               :key="index">
            <p class="test-title"
               :class="{editing: editTitleIndex == index, 'score-setting': editScoreIndex == index}">
              <span class="t-number">{{index+1}}</span>
              <el-tag class="t-type">{{item.type | questionType}} <span class="score-text">{{item.score}}</span>分</el-tag>
              <span class="t-info"
                    :class="{'empty-to-error':questionListFlag}"
                    @click="editTitleIndex=index">{{item.title}}</span>
              <el-input v-model="item.title"
                        class="t-input"
                        v-focus
                        type="textarea"
                        :autosize="{minRows:1, maxRows: 4}"
                        @blur="editTitleIndex = -1"
                        @keydown.native="textareaTitleBlur($event, index)"
                        size="small"
                        suffix-icon="el-icon-edit"></el-input>
              <span class="operation-box">
                <span class="operation-item"
                      v-if="item.type == 1 || item.type == 3"
                      @click="addOption(index)">增加选项</span>
                <span class="operation-item"
                      @click="editScoreIndex=index">设置分数</span>
                <span class="operation-item score">
                  <el-input-number v-model="item.score"
                                   v-focus
                                   style="width: 50px"
                                   size='small'
                                   :controls="false"
                                   @blur="editScoreIndex=-1"
                                   @keydown.native="textareaScoreBlur($event, index)"
                                   :min="1"
                                   :max="100"></el-input-number>
                </span>
                <span class="operation-item"
                      v-if="!randomOrder&&index!=0"
                      @click="QuestionMoveUp(index)">上移</span>
                <span class="operation-item"
                      v-if="!randomOrder&&index!=questionList.length-1"
                      @click="QuestionMoveDown(index)">下移</span>
                <span class="operation-item text-danger"
                      @click="QuestionDel(index)">删除</span>
              </span>
            </p>
            <div class="answer-box"
                 v-if="item.type == 1 || item.type == 3">
              <div class="option-item"
                   v-for="(optionItem, optionIndex) in item.option"
                   :key="optionIndex">
                <div class="options-box"
                     :class="{
                      editing: editOptionIndex == optionIndex && currentTestIndex == index, 
                      answer: (typeof item.answer == 'number' && optionIndex == item.answer - 1) || (typeof item.answer == 'object' && item.answer.includes(optionIndex+1))
                     }">
                  <span class="options">{{optionIndex | questionOption}}</span>
                  <span class="info"
                        :class="{'empty-to-error': questionListFlag}"
                        @click="editOptionIndex = optionIndex; currentTestIndex = index">{{optionItem.text}}</span>
                  <el-input v-model="optionItem.text"
                            class="t-input"
                            v-focus
                            size="small"
                            type="textarea"
                            :autosize="{minRows:1, maxRows: 4}"
                            @blur="editOptionIndex = -1; currentTestIndex = -1"
                            @keydown.native="textareaOptionBlur($event, index, optionIndex)"
                            suffix-icon="el-icon-edit"></el-input>
                  <div class="operation-box">
                    <span class="operation-item"
                          v-if="!(typeof item.answer == 'number' && optionIndex == item.answer - 1) && !(typeof item.answer == 'object' && item.answer.includes(optionIndex+1))"
                          @click="setAnswer(index, optionIndex)">设为答案</span>
                    <span class="operation-item"
                          v-else
                          @click="cancelAnswer(index, optionIndex)">取消设为答案</span>
                    <span class="operation-item"
                          v-if="!randomOrder&&optionIndex!=0"
                          @click="OptionMoveUp(index, optionIndex)">上移</span>
                    <span class="operation-item"
                          v-if="!randomOrder&&optionIndex!=item.option.length-1"
                          @click="OptionMoveDown(index, optionIndex)">下移</span>
                    <span class="operation-item text-danger"
                          @click="OptionDel(index, optionIndex)">删除</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="answer-box judge"
                 v-if="item.type == 2">
              <div class="option-item">
                <div class="options-box"
                     :class="{answer: typeof item.answer == 'number' && item.answer == 1}">
                  <span class="options"><i class="el-icon-check"></i></span>
                  <div class="operation-box">
                    <span class="operation-item"
                          v-if="!(typeof item.answer == 'number' && item.answer == 1)"
                          @click="setAnswer(index, 0)">设为答案</span>
                    <span class="operation-item"
                          v-else
                          @click="cancelAnswer(index, 0)">取消设为答案</span>
                  </div>
                </div>
              </div>
              <div class="option-item">
                <div class="options-box"
                     :class="{answer: typeof item.answer == 'number' && item.answer == 2}">
                  <span class="options"><i class="el-icon-close"></i></span>
                  <div class="operation-box">
                    <span class="operation-item"
                          v-if="!(typeof item.answer == 'number' && item.answer == 2)"
                          @click="setAnswer(index, 1)">设为答案</span>
                    <span class="operation-item"
                          v-else
                          @click="cancelAnswer(index, 1)">取消设为答案</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="请确认当前考试信息"
                 :visible.sync="checkExamDialog"
                 width="500px">
        <div class="check-exam-box">
          <div class="info-listitem">
            <div class="title">考试题目</div>
            <div class="content">{{examForm.fields.title}}</div>
          </div>
          <div class="info-listitem">
            <div class="title">考试时间</div>
            <div class="content">{{examForm.fields.startTime}} ~ {{examForm.fields.endTime}}</div>
          </div>
          <div class="info-listitem">
            <div class="title">考试班级</div>
            <div class="content">{{examForm.fields.class.map(a=>classList.filter(b=>b.value==a)[0].label).join(',')}}</div>
          </div>
          <div class="info-listitem">
            <div class="title">相关课程</div>
            <div class="content">{{examForm.fields.course}}</div>
          </div>
          <div class="info-listitem">
            <div class="title">考试时长</div>
            <div class="content">{{examForm.fields.long}} 分钟</div>
          </div>
          <div class="info-listitem">
            <div class="title">模式</div>
            <div class="content">
              <span style="margin-right: 25px"
                    :class="{'text-success':examForm.fields.autoMarking}">自动阅卷 <i :class="examForm.fields.autoMarking ? 'el-icon-check':'el-icon-close'"></i></span>
              <span :class="{'text-success':examForm.fields.randomOrder}">随机顺序 <i :class="examForm.fields.randomOrder ? 'el-icon-check':'el-icon-close'"></i></span>
            </div>
          </div>
          <div class="info-listitem">
            <div class="title">题量</div>
            <div class="content">
              <el-table :data="questionNum"
                        style="width: 170px;display: inline-block;"
                        size="small">
                <el-table-column prop="radio"
                                 label="单选"
                                 width="42"
                                 align="center">
                </el-table-column>
                <el-table-column prop="judge"
                                 label="判断"
                                 width="42"
                                 align="center">
                </el-table-column>
                <el-table-column prop="checkbox"
                                 label="多选"
                                 width="42"
                                 align="center">
                </el-table-column>
                <el-table-column prop="question"
                                 label="问答"
                                 width="42"
                                 align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="info-listitem">
            <div class="title">总分</div>
            <div class="content"
                 style="font-size: 18px;font-weight: bold">{{scoreCount}}</div>
          </div>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="checkExamDialog = false">取消</el-button>
          <el-button type="primary"
                     :loading="publishExamLoading"
                     @click="publishExam">确定发布</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { zIndexUp, zIndexDown, delItem } from '@/utils/array'
import { ScrollTo } from '@/utils/animate'
import { debounce } from '@/utils/tools'
export default {
  props: ['IsCollapse'],
  data () {
    return {
      scrollLeft: 0,
      typeList: ['单选题', '判断题', '多选题', '问答题'],
      classList: [
        {
          label: '15信管',
          value: 1
        },
        {
          label: '15计本',
          value: 2
        },
        {
          label: '15软件',
          value: 3
        }
      ],
      examForm: {
        fields: {
          examId: -1,
          title: '',
          date: [],
          startTime: '',
          endTime: '',
          long: 120,
          class: [],
          course: '',
          autoMarking: 0,
          randomOrder: 0
        },
        rules: {
          title: [{ required: true, message: '请输入考试试卷标题' }],
          date: [{ required: true, message: '请选择考试时间' }],
          long: [{ required: true, message: '请输入考试时长' }],
          class: [{ required: true, message: '请选择班级' }],
          course: [{ required: true, message: '请输入考试相关课程' }]
        }
      },
      questionList: [],
      currentTestIndex: -1,
      editTitleIndex: -1,
      editOptionIndex: -1,
      editScoreIndex: -1,
      questionListFlag: false,
      saveTempLoading: false,
      publishExamLoading: false,
      dataLoading: false,
      showBackTop: false,
      checkExamDialog: false,
      questionNum: [{
        radio: 0,
        judge: 0,
        checkbox: 0,
        question: 0,
      }],
      scoreCount: 0
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
    randomOrder () {
      return this.examForm.fields.randomOrder
    },
  },
  mounted () {
    if (this.$route.params.examId) {
      this.examForm.fields.examId = this.$route.params.examId
      this.getData()
    }
    // 监听浏览器滚动
    let appContent = this.$parent.$refs.appContent
    appContent.addEventListener('scroll', debounce(() => {
      this.scrollLeft = appContent.scrollLeft
      let scrollTop = appContent.scrollTop
      if (scrollTop > 500) {
        this.showBackTop = true
      } else {
        this.showBackTop = false
      }
    }, 400))
  },
  watch: {
    'examForm.fields.date' (val) {
      this.examForm.fields.startTime = val ? val[0] : ''
      this.examForm.fields.endTime = val ? val[1] : ''
    }
  },
  methods: {
    QuestionMoveUp (questionIndex) {
      zIndexUp(this.questionList, questionIndex)
    },
    QuestionMoveDown (questionIndex) {
      zIndexDown(this.questionList, questionIndex)
    },
    QuestionDel (questionIndex) {
      this.$confirm('确认删除该试题, 已编辑的数据不会保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delItem(this.questionList, questionIndex)
      }).catch(_ => { })
    },
    setAnswer (questionIndex, optionIndex) {
      let type = this.questionList[questionIndex].type
      switch (type) {
        case 1:
        case 2: this.questionList[questionIndex].answer = optionIndex + 1; break
        case 3: this.questionList[questionIndex].answer.push(optionIndex + 1); break
      }
    },
    cancelAnswer (questionIndex, optionIndex) {
      let type = this.questionList[questionIndex].type
      switch (type) {
        case 1:
        case 2: this.questionList[questionIndex].answer = -1; break
        case 3: delItem(this.questionList[questionIndex].answer, this.questionList[questionIndex].answer.indexOf(optionIndex + 1)); break
      }
    },
    OptionMoveUp (questionIndex, optionIndex) {
      zIndexUp(this.questionList[questionIndex].option, optionIndex)
    },
    OptionMoveDown (questionIndex, optionIndex) {
      zIndexDown(this.questionList[questionIndex].option, optionIndex)
    },
    OptionDel (questionIndex, optionIndex) {
      if (this.questionList[questionIndex].option.length > 3) {
        delItem(this.questionList[questionIndex].option, optionIndex)
      } else {
        this.$message.warning('单选题与多选题至少需要3个选项')
      }
    },
    addQuerstion (type) {
      switch (type) {
        case 1: this.questionList.push({
          type: 1,
          title: '',
          option: [
            {
              text: ''
            },
            {
              text: ''
            },
            {
              text: ''
            },
            {
              text: ''
            }
          ],
          answer: -1,
          score: 5
        }); break
        case 2: this.questionList.push({
          type: 2,
          title: '',
          answer: -1,
          score: 5
        }); break
        case 3: this.questionList.push({
          type: 3,
          title: '',
          option: [
            {
              text: ''
            },
            {
              text: ''
            },
            {
              text: ''
            },
            {
              text: ''
            }
          ],
          answer: [],
          score: 5
        }); break
        case 4: this.questionList.push({
          type: 4,
          title: '',
          score: 5
        })
      }
      this.$nextTick(_ => {
        // 自动滚动到底部
        const top = document.getElementById('CreateExam').getBoundingClientRect().height
        const el = document.querySelector('.app-content')
        ScrollTo(top, 800, el)
        // 新增问题默认获取焦点
        this.editTitleIndex = this.questionList.length - 1
      })
    },
    addOption (questionIndex) {
      if (this.questionList[questionIndex].option.length < 7) {
        this.questionList[questionIndex].option.push({
          text: ''
        })
      } else {
        this.$message.warning('单选题与多选题最多只能有7个选项')
      }
    },
    textareaTitleBlur (event, titleIndex) {
      if (event.keyCode === 13) {
        this.editTitleIndex = -1
        event.preventDefault()
        let _this = this
        setTimeout(_ => {
          _this.currentTestIndex = titleIndex
          _this.editOptionIndex = 0
        })
        return false
      }
    },
    textareaOptionBlur (event, titleIndex, optionIndex) {
      if (event.keyCode === 13) {
        this.currentTestIndex = -1
        this.editOptionIndex = -1
        event.preventDefault()
        let _this = this
        setTimeout(_ => {
          _this.currentTestIndex = titleIndex
          _this.editOptionIndex = optionIndex + 1
        })
        return false
      }
    },
    textareaScoreBlur (event, titleIndex) {
      if (event.keyCode === 13) {
        this.editScoreIndex = -1
        event.preventDefault()
      }
    },
    async saveTemp () {
      if (this.examForm.fields.title) {
        let params = {
          ...this.examForm.fields,
          questionList: this.questionList
        }
        delete params.date
        this.saveTempLoading = true
        await this.$api('saveExam', params).then(data => {
          this.examForm.fields.examId = data.examId || -1
          this.$message.success('操作成功')
        }).finally(_ => {
          this.saveTempLoading = false
        })
      } else {
        this.$message.error('请填写考试题目再进行该操作....')
      }
    },
    async checkPublishExam () {
      this.questionListFlag = false
      this.$refs['examForm'].validate(async (valid) => {
        if (valid) {
          let questionListFlag = false
          this.questionList.map((item) => {
            if (item.title.length == 0) {
              questionListFlag = true
            } else if (item.option) {
              questionListFlag = questionListFlag || item.option.some((item1) => item1.text ? item1.text.length == 0 : true)
            }
          })
          if (questionListFlag) {
            this.questionListFlag = questionListFlag
            this.$message.error('含有未编辑的考试题目或选项')
          } else {
            this.checkExamDialog = true
            let radio = 0, judge = 0, checkbox = 0, question = 0, score = 0
            this.questionList.map(item => {
              switch (item.type) {
                case 1: radio++; break
                case 2: judge++; break
                case 3: checkbox++; break
                case 4: question++; break
              }
              score += item.score
            })
            this.questionNum = [{ radio, judge, checkbox, question }]
            this.scoreCount = score
          }
        } else {
          this.backTop()
        }
      })
    },
    async publishExam () {
      this.publishExamLoading = true
      let params = {
        ...this.examForm.fields,
        questionList: this.questionList
      }
      delete params.date
      await this.$api('publishExam', params).then(data => {
        if (data.examId) {
          this.$message.success('考试发布成功!')
          this.checkExamDialog = false
        }
      }).finally(_ => {
        this.publishExamLoading = false
      })
    },
    backTop () {
      this.$nextTick(_ => {
        const el = document.querySelector('.app-content')
        ScrollTo(0, 400, el)
      })
    },
    async getData () {
      this.dataLoading = true
      await this.$api('getExamInfoFromTeacher', {
        examId: this.examForm.fields.examId
      }).then(data => {
        let { title, startTime, endTime, long, classroom, course, autoMarking, randomOrder } = data.examInfo
        this.examForm.fields.title = title
        this.examForm.fields.date = (startTime && endTime) ? [startTime, endTime] : []
        this.examForm.fields.long = long
        this.examForm.fields.class = classroom
        this.examForm.fields.course = course
        this.examForm.fields.autoMarking = autoMarking
        this.examForm.fields.randomOrder = randomOrder
        this.questionList = data.questionList
      }).finally(_ => {
        this.dataLoading = false
      })
    }
  },
  destroyed () {
    let appContent = this.$parent.$refs.appContent
    appContent && appContent.removeEventListener('scroll', () => { })
  },
  directives: {
    focus: {
      update: el => el.querySelector('input, textarea').focus(),
    }
  }
}
</script>
<style lang="scss" scoped>
#CreateExam {
  &:after {
    content: "";
    position: fixed;
    top: 128px;
    width: 100%;
    z-index: 888;
    left: 0;
    height: 1px;
    box-shadow: 0 1px 10px;
  }
}
.back-to-top {
  position: fixed;
  bottom: 68px;
  left: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  background: #262630;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px #262630;
  cursor: pointer;
  transition: transform 0.4s ease-in, opacity 0.4s ease-in;
  opacity: 0;
  &.active {
    opacity: 1;
    transition: transform 0.4s ease-in, opacity 0.4s ease-in;
  }
}
.container {
  width: 1160px;
  margin: 0 auto;
  padding: 10px;
}
.header-operation {
  position: fixed;
  z-index: 2000;
  top: 48px;
  left: 0;
  width: 100%;
  height: 80px;
  min-width: 1180px;
  background: #fff;
  transition: all 0.4s;
  padding: 0 20px;
  .create-btn-box {
    padding: 10px 0;
  }
  .submit-btn-box {
    padding: 10px 0;
  }
}
.create-exam-box {
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 10px #aaa;
  margin-top: 90px;
  .main-title {
    padding-left: 8px;
    margin: 10px 0;
    span {
      border-left: 4px solid #409eff;
      padding-left: 5px;
    }
  }
  .exam-info-box {
    padding: 8px;
    .form {
      width: 550px;
    }
    .tips {
      width: 450px;
      margin-left: 30px;
      .tips-list {
        list-style-type: circle !important;
        li {
          margin: 10px 0;
          list-style-type: circle !important;
        }
      }
    }
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
          width: 100%;
          flex: 1;
          position: relative;
          &:empty::after {
            content: "点击输入标题内容";
            color: #667;
          }
          &.empty-to-error:empty::after {
            color: #bb4444;
          }
        }
        .t-input {
          display: none;
          width: 100%;
          flex: 1;
        }
        &.editing {
          .t-input {
            display: block;
          }
          .t-info {
            display: none;
          }
        }
        .score {
          display: none;
        }
        &.score-setting {
          .score {
            display: inline;
          }
        }
        .operation-box {
          min-width: 230px;
          margin-left: 15px;
          text-align: right;
          .operation-item {
            margin: 0 5px;
            font-size: 14px;
            line-height: 32px;
            color: #2d8cf0;
            cursor: pointer;
          }
        }
      }
      .answer-box {
        padding: 5px 25px;
        .option-item {
          margin: 5px 0 10px;
          .options-box {
            display: flex;
            border-radius: 4px;
            padding-left: 8px;
            position: relative;
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
              position: relative;
              &:empty:after {
                content: "点击输入选项内容";
                color: #667;
              }
              &.empty-to-error:empty:after {
                color: #bb4444;
              }
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
            &::after {
              content: "答案";
              position: absolute;
              line-height: 20px;
              border-radius: 10px;
              text-align: center;
              color: #fff;
              background: #67c23a;
              box-shadow: 0 0 4px #c2e7b0;
              font-size: 12px;
              overflow: hidden;
              top: 4px;
              left: 0;
              width: 0;
              height: 0;
              transition: all 0.4s;
            }
            &.answer {
              border: 1px solid #c2e7b0;
              &::after {
                height: 20px;
                width: 40px;
                top: -6px;
                left: -20px;
                transition: all 0.4s;
              }
            }
          }
        }
        &.judge {
          .option-item {
            .options-box {
              width: 170px;
              .operation-box {
                width: 120px;
              }
            }
          }
        }
      }
    }
  }
}
.check-exam-box {
  .info-listitem {
    display: flex;
    padding: 0 10px;
    margin-bottom: 10px;
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

.text-danger {
  color: #f56c6c !important;
}
.score-text {
  font-weight: bold;
  padding: 0 2px 0 5px;
}
.no-question {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #99a;
  font-size: 14px;
}
</style>
<style lang="scss">
#CreateExam .el-textarea__inner {
  padding: 5px 8px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  resize: none;
}
#CreateExam .el-alert {
  align-items: flex-start;
  padding: 16px;
}
#CreateExam .el-alert__title {
  font-size: 16px;
  line-height: 26px;
}
#CreateExam .el-table {
  th,
  td,
  .cell {
    padding: 0 3px;
  }
}
</style>

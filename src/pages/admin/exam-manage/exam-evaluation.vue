<template>
  <div class="page"
       id="ExamEvaluation">
    <div class="h-operation clear">
      <el-button type="primary"
                 size="small"
                 class="fr"
                 icon="el-icon-refresh"
                 :loading="loading"
                 @click="getData">刷新</el-button>
    </div>
    <div class="exam-evaluation-table">
      <standard-table :conf="tableConfig"
                      ref="table"
                      :loading.sync="loading"></standard-table>
    </div>
    <el-dialog :visible.sync="detailDialog"
               title="评卷">
      <div class="evaluation-detail"
           v-loading="detailLoading">
        <p class="row">
          <span class="title">试卷题目</span>
          <span class="text">{{detail.examTitle}}</span>
        </p>
        <p class="row">
          <span class="title">答卷人</span>
          <span class="text">{{detail.studentName}}</span>
        </p>
        <p class="row">
          <span class="title">客观题得分</span>
          <span class="text"
                style="font-weight:bold">{{detail.objectiveScore}}</span>
        </p>
        <div class="evaluation-list">
          <div class="item"
               v-for="(item,index) in detail.essayList"
               :key="index">
            <div class="test-title">
              <span class="t-number">{{index+1}}</span>
              <span class="t-info">{{item.question_title}}</span>
              <el-tag class="t-type"
                      size="small">{{item.question_score}}分</el-tag>
            </div>
            <div class="student-answer">
              <p>{{item.student_answer}}</p>
            </div>
            <p style="text-align:right">
              <span style="margin-right: 3px;color: #99a">设置本题得分</span>
              <el-input size="small"
                        style="width:60px;"
                        @change="checkNumber($event, item.question_score, index)"
                        v-model="detail.essayList[index].essay_score"
                        controls-position="right"></el-input>
            </p>
          </div>
        </div>
        <div class="footer"
             style="text-align:center">
          <el-button size="small"
                     :loading="btnSubmitLoading"
                     @click="submitEvaluation"
                     type="primary">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import StandardTable from '@/components/standard-table'
export default {
  name: 'ExamEvaluation',
  components: {
    StandardTable
  },
  data () {
    return {
      loading: false,
      statusList: {
        3: {
          text: '等待评卷',
          color: '#E6A23C'
        },
        4: {
          text: '评卷已完成',
          color: '#67C23A'
        }
      },
      tableConfig: {
        data: [],
        row: [
          {
            prop: 'examId',
            label: 'ExamId',
            align: 'center',
            'min-width': '200'
          },
          {
            prop: 'studentName',
            label: '学生姓名',
            align: 'center',
            'min-width': '200'
          },
          {
            prop: 'submitTime',
            label: '交卷时间',
            sortable: true,
            align: 'center',
            'min-width': '200'
          },
          {
            prop: 'status',
            label: '当前状态',
            align: 'center',
            'min-width': '200',
            filters: [
              {
                text: '等待评卷',
                value: '3'
              },
              {
                text: '评卷已完成',
                value: '4'
              }
            ],
            'filter-method': this.filterStatus,
            style: (row) => ({ color: this.statusList[row.status].color }),
            formatter: (row) => this.statusList[row.status].text
          }
        ],
        operation: {
          btns: [
            {
              label: '评卷',
              type: 'text',
              show: (row) => row.status == 3,
              fn: (row) => {
                this.evaluation(row)
              }
            },
            {
              label: '重新评卷',
              type: 'text',
              show: (row) => row.status == 4,
              fn: (row) => {
                this.evaluation(row)
              }
            }
          ]
        },
        pagination: true,
        url: 'getEvaluationList'
      },
      detailDialog: false,
      detail: {
        examId: '',
        examTitle: '',
        studentId: 0,
        studentName: '',
        objectiveScore: 0,
        essayList: []
      },
      detailLoading: false,
      btnSubmitLoading: false,
      examFilterList: []
    }
  },
  mounted () {
    this.getData()
    this.getEssayExamList()
  },
  methods: {
    getData () {
      this.$nextTick(() => {
        this.$refs.table.fetch()
      })
    },
    getEssayExamList () {
      this.$api('getEssayExamList').then(data => {
        this.examFilterList = data
      })
    },
    async evaluation (row) {
      this.detailDialog = true
      this.detailLoading = true
      this.detail.examTitle = row.examTitle
      this.detail.studentName = row.studentName
      this.detail.studentId = row.studentId
      this.detail.examId = row.examId
      await this.$api('getEvaluationDetail', {
        examId: row.examId,
        studentId: row.studentId
      }).then(data => {
        this.detail.objectiveScore = data.objectScore
        this.detail.essayList = data.essayList
      }).finally(_ => {
        this.detailLoading = false
      })
    },
    async submitEvaluation () {
      let flag = this.detail.essayList.some(item => item.essay_score === '' || item.essay_score === null)
      if (flag) {
        this.$message.warning('还有问题未进行打分...')
      } else {
        let essayList = this.detail.essayList.map(item => {
          return {
            essayScore: +item.essay_score,
            examId: item.exam_id,
            questionId: item.question_id
          }
        })
        this.btnSubmitLoading = true
        await this.$api('setEvaluation', {
          essayList,
          studentId: this.detail.studentId,
          examId: this.detail.examId
        }).then(data => {
          this.detailDialog = false
          this.$message.success('评卷成功.')
          this.getData()
        }).finally(_ => {
          this.btnSubmitLoading = false
        })
      }
    },
    checkNumber (val, maxScore, index) {
      if (!val) return
      if (/^\d+$/.test(val)) {
        if (val <= 0) {
          this.detail.essayList[index].essay_score = 0
        } else if (val >= maxScore) {
          this.detail.essayList[index].essay_score = maxScore
        }
      } else {
        this.detail.essayList[index].essay_score = 0
      }
    },
    filterStatus (value, row) {
      return row.status == value
    },
    filterExam (value, row) {
      return row.examId == value
    }
  }
}
</script>
<style lang="scss" scoped>
.evaluation-detail {
  .row {
    margin-bottom: 8px;
    .title {
      position: absolute;
    }
    .text {
      padding-left: 90px;
      display: block;
      min-height: 24px;
    }
  }
}
.evaluation-list {
  margin-top: 20px;
  padding: 0 20px;
  .item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
    .test-title {
      display: flex;
      align-items: flex-start;
      .t-number {
        font-size: 18px;
        font-weight: bold;
        padding: 0 10px;
      }
      .t-info {
        color: #667;
        line-height: 1.3;
        width: 100%;
        flex: 1;
      }
    }
    .student-answer {
      margin: 5px 0 8px 30px;
      padding: 5px;
      background: #f0f0f0;
      border: 1px solid #ccc;
      color: #667;
      border-radius: 4px;
    }
  }
}
</style>
<style>
#ExamEvaluation .evaluation-list .el-input__inner {
  text-align: center;
}
</style>

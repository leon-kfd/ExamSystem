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
      <div class="table-main">
        <el-table :data="tableData"
                  v-loading="loading"
                  border
                  stripe
                  style="width: 100%">
          <el-table-column prop="examId"
                           label="ExamId"
                           align="center"
                           min-width="200">
          </el-table-column>
          <el-table-column prop="examTitle"
                           label="题目"
                           align="center"
                           min-width="200"
                           :filters="examFilterList"
                           :filter-method="filterExam">
          </el-table-column>
          <el-table-column prop="studentName"
                           label="学生姓名"
                           align="center"
                           min-width="200">
          </el-table-column>
          <el-table-column prop="submitTime"
                           label="交卷时间"
                           sortable
                           align="center"
                           min-width="200">
          </el-table-column>
          <el-table-column prop="status"
                           label="当前状态"
                           align="center"
                           min-width="200"
                           :filters="[{ text: '等待评卷', value: '3' }, { text: '评卷已完成', value: '4' }]"
                           :filter-method="filterStatus">
            <template slot-scope="scope">
              <span :style="{color: statusList[scope.row.status].color}">{{statusList[scope.row.status].text}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           align="center"
                           width="200">
            <template slot-scope="scope">
              <el-button @click="evaluation(scope.row)"
                         type="text"
                         v-show="scope.row.status == 3"
                         size="small">评卷</el-button>
              <el-button @click="evaluation(scope.row)"
                         type="text"
                         v-show="scope.row.status == 4"
                         size="small">重新评卷</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="page"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
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
export default {
  name: 'ExamEvaluation',
  data () {
    return {
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
      loading: false,
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
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
      this.loading = true
      this.$api('getEvaluationList', {
        page: this.page,
        pageSize: this.pageSize
      }).then(data => {
        this.tableData = data.items
        this.total = data.total
      }).finally(_ => {
        this.loading = false
      })
    },
    getEssayExamList () {
      this.$api('getEssayExamList').then(data => {
        this.examFilterList = data
      })
    },
    handleSizeChange (val) {
      this.page = 1
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getData()
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

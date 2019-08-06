<template>
  <div class="page"
       id="ScoreManage">
    <div class="h-operation clear">
      <span class="h-operation-text">班级</span>
      <el-select v-model="CurrentClass"
                 @change="ClassChange"
                 size="small">
        <el-option v-for="(item,index) in classList"
                   :key="index"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select>
      <span class="h-operation-text"
            style="margin-left: 20px;">考试题目</span>
      <el-select v-model="CurrentExamTitle"
                 :disabled="CurrentClass.length==0"
                 :placeholder="CurrentClass.length==0 ?'请先选择班级':'请选择'"
                 size="small"
                 @change="getData"
                 v-loading="examTitleLoading">
        <el-option v-for="(item,index) in examTitleList"
                   :key="index"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select>
      <el-button style="margin-left:10px"
                 type="text"
                 size="small"
                 @click="clear">{{$route.params.examId?'查看全部':'清空条件'}}</el-button>
      <el-button type="primary"
                 size="small"
                 class="fr"
                 icon="el-icon-refresh"
                 :loading="loading"
                 @click="getData">刷新</el-button>
    </div>
    <div class="score-table">
      <div class="table-main">
        <el-table :data="tableData"
                  border
                  stripe
                  style="width: 100%"
                  v-loading="loading">
          <el-table-column prop="studentNum"
                           label="学号"
                           align="center"
                           min-width="100"
                           sortable>
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           align="center">
          </el-table-column>
          <el-table-column prop="studentClass"
                           label="课程"
                           align="center">
          </el-table-column>
          <el-table-column prop="course"
                           label="课程"
                           align="center">
          </el-table-column>
          <el-table-column prop="submitTime"
                           align="center"
                           label="交卷时间">
          </el-table-column>
          <el-table-column prop="status"
                           align="center"
                           label="状态">
            <template slot-scope="scope">
              <span :style="{color: statusList[scope.row.status].color}">{{statusList[scope.row.status].text}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="score"
                           align="center"
                           label="得分 / 总分"
                           min-width="120px"
                           fixed="right">
            <template slot-scope="scope">
              <span class="bold"
                    style="font-size: 18px"
                    v-if="scope.row.status == 2 || scope.row.status == 4"
                    :class="((scope.row.score+scope.row.essayScore) / scope.row.scoreSum) >= 0.8 ? 'text-success' :
                              ((scope.row.score+scope.row.essayScore) / scope.row.scoreSum) >= 0.6 ? 'text-info' : 'text-danger'">{{scope.row.score+scope.row.essayScore}}
              </span>
              <span class="bold"
                    style="font-size: 18px"
                    v-if="scope.row.status == 3">{{scope.row.score}} + ?</span>
              <span style="font-size: 14px;color: #778"> / {{scope.row.scoreSum}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           align="center"
                           width="200">
            <template slot-scope="scope">
              <el-button @click="turnToEvaluation(scope.row)"
                         v-if="scope.row.status == 3"
                         type="text">评卷</el-button>
              <el-button @click="detail(scope.row)"
                         type="text">查看试卷</el-button>
              <!-- <el-button @click="setScore(scope.row)"
                         type="text">更改分数</el-button> -->
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
    <el-dialog title="学生答卷信息"
               :visible.sync="studentAnswerDialog"
               top="5vh">
      <div class="student-answer-box"
           v-loading="studentAnswerLoading">
        <student-exam :exam-info="examInfo"
                      :question-list="questionList"></student-exam>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import StudentExam from '@/components/student-exam'
export default {
  name: 'ScoreManage',
  components: { StudentExam },
  data () {
    return {
      statusList: {
        2: {
          text: '自动阅卷完成',
          color: '#67C23A'
        },
        3: {
          text: '等待评卷',
          color: '#E6A23C'
        },
        4: {
          text: '手动评卷已完成',
          color: '#67C23A'
        }
      },
      loading: false,
      classList: [],
      examTitleList: [],
      CurrentClass: '',
      CurrentExamTitle: '',
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      examTitleLoading: false,
      studentAnswerDialog: false,
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
      questionList: [],
      studentAnswerLoading: false
    }
  },
  mounted () {
    this.getClassList()
    this.getData()
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.getData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },
    async getClassList () {
      await this.$api('getClassroomList').then(data => {
        this.classList = data
      })
    },
    async getData () {
      this.loading = true
      await this.$api('getStudentScoreList', {
        examId: this.CurrentExamTitle || this.$route.params.examId || 0,
        classId: this.CurrentClass || 0
      }).then(data => {
        this.tableData = data.items
        this.page = data.page
        this.total = data.total
      }).finally(_ => {
        this.loading = false
      })
    },
    async getExamTitleList () {
      this.examTitleLoading = true
      await this.$api('getTeacherFinishedExamList', {
        classId: this.CurrentClass
      }).then(data => {
        this.examTitleList = data
      }).finally(_ => {
        this.examTitleLoading = false
      })
    },
    ClassChange () {
      this.CurrentExamTitle = ''
      this.getExamTitleList()
    },
    clear () {
      this.$router.push({ name: 'scoreManage' })
      this.CurrentClass = ''
      this.CurrentExamTitle = ''
      this.getData()
    },
    detail (row) {
      this.studentAnswerDialog = true
      this.studentAnswerLoading = true
      this.$api('getStudentExamResultInfo', {
        examId: row.examId,
        studentId: row.studentId
      }).then(data => {
        this.examInfo = data.examInfo
        this.questionList = data.questionList
      }).finally(_ => {
        this.studentAnswerLoading = false
      })
    },
    setScore () { },
    turnToEvaluation () {
      this.$router.push({ name: 'ExamEvaluation' })
    }
  }
}
</script>
<style lang="scss" scoped>
.student-answer-box {
  min-height: 300px;
}
</style>
<style>
#ScoreManage .el-dialog__body {
  padding: 10px 20px;
}
</style>

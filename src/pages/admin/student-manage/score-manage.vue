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
      <standard-table :conf="tableConfig"
                      ref="table"
                      :loading.sync="loading">
        <template #score="scoped">
          <span class="bold"
                style="font-size: 18px"
                v-if="scoped.row.status == 2 || scoped.row.status == 4"
                :class="((scoped.row.score+scoped.row.essayScore) / scoped.row.scoreSum) >= 0.8 ? 'text-success' :
                              ((scoped.row.score+scoped.row.essayScore) / scoped.row.scoreSum) >= 0.6 ? 'text-info' : 'text-danger'">{{scoped.row.score+scoped.row.essayScore}}
          </span>
          <span class="bold"
                style="font-size: 18px"
                v-if="scoped.row.status == 3">{{scoped.row.score}} + ?</span>
          <span style="font-size: 14px;color: #778"> / {{scoped.row.scoreSum}}</span>
        </template>
      </standard-table>
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
import StandardTable from '@/components/standard-table'
import StudentExam from '@/components/student-exam'
export default {
  name: 'ScoreManage',
  components: {
    StudentExam,
    StandardTable
  },
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
      tableConfig: {
        data: [],
        row: [
          {
            prop: 'studentNum',
            label: '学号',
            'min-width': '100',
            sortable: true
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'studentClass',
            label: '班级'
          },
          {
            prop: 'course',
            label: '课程'
          },
          {
            prop: 'submitTime',
            label: '交卷时间'
          },
          {
            prop: 'status',
            label: '状态',
            style: (row) => ({ color: this.statusList[row.status].color }),
            formatter: (row) => this.statusList[row.status].text
          },
          {
            prop: 'score',
            label: '得分 / 总分',
            'min-width': '120px',
            fixed: 'right',
            slot: 'score'
          }
        ],
        operation: {
          btns: [
            {
              label: '评卷',
              type: 'text',
              show: (row) => row.status == 3,
              fn: (row) => {
                this.turnToEvaluation(row)
              }
            },
            {
              label: '查看试卷',
              type: 'text',
              fn: (row) => {
                this.detail(row)
              }
            }
          ]
        },
        pagination: true,
        url: 'getStudentScoreList',
        params: {
          examId: 0,
          classI: 0
        }
      },
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
    async getClassList () {
      await this.$api('getClassroomList').then(data => {
        this.classList = data
      })
    },
    async getData () {
      this.tableConfig.params.examId = this.CurrentExamTitle || this.$route.params.examId || 0
      this.tableConfig.params.classId = this.CurrentClass || 0
      this.$nextTick(() => {
        this.$refs.table.fetch()
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

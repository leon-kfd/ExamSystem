<template>
  <div class="page"
       id="ExamList">
    <div class="exam-list-box"
         v-loading="loading">
      <div class="exam-tab-select">
        <ul class="tab-list clear">
          <li :class="{active: tabActive==1}"
              class="fl"
              @click="tabActive=1">当前考试</li>
          <li :class="{active: tabActive==2}"
              class="fl"
              @click="tabActive=2;getMyExamFinishList()">已结束</li>
          <li class="fr">
            <el-button size="mini"
                       type="primary"
                       style="width:90px;"
                       icon="el-icon-refresh"
                       :loading="loading"
                       @click="getData">刷新</el-button>
          </li>
          <span class="line"
                :style="{left: `${10+(tabActive-1)*90}px`}"></span>
        </ul>
      </div>
      <div class="my-exam-box tab1"
           v-if="tabActive==1"
           id="MyExam">
        <div class="exam-listitem"
             v-for="(item,index) in myExamList"
             :key="index">
          <el-badge value="New"
                    style="width: 100%;height:100%"
                    :hidden="!item.isNew">
            <el-card class="exam-info"
                     :body-style="{padding: '10px'}">
              <div class="exam-info-main">
                <dl>
                  <dt>试卷题目</dt>
                  <dd>{{item.title}}</dd>
                </dl>
                <dl>
                  <dt>发布时间</dt>
                  <dd>{{item.publishDate}}</dd>
                </dl>
                <dl>
                  <dt>考试时长</dt>
                  <dd>{{item.examLength}}</dd>
                </dl>
                <dl>
                  <dt>开始时间</dt>
                  <dd style="font-size: 13px;color: #445">{{item.startDate}}</dd>
                </dl>
                <dl>
                  <dt>结束时间</dt>
                  <dd style="font-size: 13px;color: #445">{{item.endDate}}</dd>
                </dl>
                <dl>
                  <dt>考试班级</dt>
                  <dd>
                    <el-tag size="mini"
                            type="info"
                            v-for="item1 in  item.class.split(',')"
                            :key="item1">{{item1}}</el-tag>
                  </dd>
                </dl>
                <dl>
                  <dt>相关课程</dt>
                  <dd>{{item.course}}</dd>
                </dl>
                <dl>
                  <dt>题量</dt>
                  <dd>
                    <el-table :data="item.questionNum"
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
                  </dd>
                </dl>
                <dl>
                  <dt>当前状态</dt>
                  <dd>
                    <el-tag type="warning"
                            v-if="item.status==1"
                            size="small">未开始</el-tag>
                    <el-tag type="success"
                            v-if="item.status==2"
                            size="small">已开始,进行中</el-tag>
                  </dd>
                </dl>
              </div>
              <div class="exam-info-footer">
                <button class="d-btn btn-enter btn-animate1"
                        v-if="item.status==1">预览试卷 <i class="el-icon-d-arrow-right"></i></button>
                <button class="d-btn btn-enter btn-animate1"
                        @click="viewExamDetail(item.examId)"
                        v-if="item.status==2">查看详情 <i class="el-icon-d-arrow-right"></i></button>
              </div>
            </el-card>
          </el-badge>
        </div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
      </div>
      <div class="finish-exam-box tab2"
           id="FinishExam"
           v-if="tabActive==2">
        <div class="exam-listitem"
             v-for="(item,index) in myExamFinishList"
             :key="index">
          <div style="position:relative;width:100%;height:100%">
            <el-card class="exam-info"
                     :body-style="{padding: '10px'}">
              <div class="exam-info-main">
                <dl>
                  <dt>试卷题目</dt>
                  <dd>{{item.title}}</dd>
                </dl>
                <dl>
                  <dt>发布时间</dt>
                  <dd>{{item.publishDate}}</dd>
                </dl>
                <dl>
                  <dt>考试时长</dt>
                  <dd>{{item.examLength}}</dd>
                </dl>
                <dl>
                  <dt>开始时间</dt>
                  <dd style="font-size: 13px;color: #445">{{item.startDate}}</dd>
                </dl>
                <dl>
                  <dt>结束时间</dt>
                  <dd style="font-size: 13px;color: #445">{{item.endDate}}</dd>
                </dl>
                <dl>
                  <dt>考试班级</dt>
                  <dd>
                    <el-tag size="mini"
                            type="info"
                            v-for="item1 in  item.class.split(',')"
                            :key="item1">{{item1}}</el-tag>
                  </dd>
                </dl>
                <dl>
                  <dt>相关课程</dt>
                  <dd>{{item.course}}</dd>
                </dl>
                <dl>
                  <dt>完成情况</dt>
                  <dd>
                    <span style="font-weight:bold">{{item.examFinishedNum}}</span>
                    <span style="margin: 0 2px">/</span>
                    <span>{{item.classStudentCount}}</span>
                  </dd>
                </dl>
                <dl>
                  <dt>阅卷</dt>
                  <dd :style="{color: evaluationStatuList[item.status].color }">{{evaluationStatuList[item.status].text}}</dd>
                </dl>
              </div>
              <div class="exam-info-footer">
                <button class="d-btn btn-enter btn-animate1"
                        @click="turnToScoreManage">查看详情 <i class="el-icon-d-arrow-right"></i></button>
              </div>
            </el-card>
          </div>
        </div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
      </div>
      <div class="pagination-box clear">
        <el-pagination class="fr"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="this.tabActive == 1 ? page1: page2"
                       :page-sizes="[10, 15, 30, 60]"
                       :page-size="this.tabActive == 1 ? pageSize1: pageSize2"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="this.tabActive == 1 ? total1: total2">
        </el-pagination>
      </div>
      <el-dialog title="考试试卷信息"
                 :visible.sync="examDetailDialog"
                 top="5vh">
        <div class="student-answer-box"
             style="min-height: 300px"
             v-loading="examDetailLoading">
          <student-exam :exam-info="examDetail.examInfo"
                        :question-list="examDetail.questionList"
                        :show-exam-detail="true"></student-exam>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import StudentExam from '@/components/student-exam'
export default {
  name: 'ExamList',
  components: {
    StudentExam
  },
  data () {
    return {
      loading: false,
      tabActive: 1,
      evaluationStatuList: {
        4: {
          color: '#409EFF',
          text: '自动阅卷，已完成'
        },
        3: {
          color: '#e6a23c',
          text: '手动阅卷，未完成'
        },
        5: {
          color: '#67C23A',
          text: '手动阅卷，全部完成'
        }
      },
      finishLoadFlag: false,
      myExamList: [],
      myExamFinishList: [],
      page1: 1,
      pageSize1: 10,
      total1: 0,
      page2: 1,
      pageSize2: 10,
      total2: 0,
      examDetailDialog: false,
      examDetailLoading: false,
      examDetail: {
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
    }
  },
  mounted () {
    this.getMyExamList()
  },
  methods: {
    async getMyExamList () {
      this.loading = true
      await this.$api('getTeacherExamList', {
        mode: 1,
        page: this.page1,
        pageSize: this.pageSize1
      }).then(data => {
        this.myExamList = data.items
        this.total1 = data.total
      }).finally(_ => {
        this.loading = false
      })
    },
    async getMyExamFinishList () {
      if (!this.finishLoadFlag) {
        this.loading = true
        await this.$api('getTeacherExamList', {
          mode: 2,
          page: this.page2,
          pageSize: this.pageSize2
        }).then(data => {
          this.myExamFinishList = data.items
          this.total2 = data.total
          this.finishLoadFlag = true
        }).finally(_ => {
          this.loading = false
        })
      }
    },
    async getData (refresh) {
      this.loading = true
      await this.$api('getTeacherExamList', {
        mode: this.tabActive == 1 ? 1 : 2,
        page: this.tabActive == 1 ? this.page1 : this.page2,
        pageSize: this.tabActive == 1 ? this.pageSize2 : this.pageSize2
      }).then(data => {
        if (this.tabActive == 1) {
          this.myExamList = data.items
          this.total1 = data.total
        } else {
          this.myExamFinishList = data.items
          this.total2 = data.total
        }
      }).finally(_ => {
        this.loading = false
      })
    },
    handleSizeChange (val) {
      if (this.tabActive == 1) {
        this.pageSize1 = val
        this.page1 = 1
      } else {
        this.pageSize2 = val
        this.page2 = 1
      }
      this.getData()
    },
    handleCurrentChange (val) {
      if (this.tabActive == 1) {
        this.page1 = val
      } else {
        this.page2 = val
      }
      this.getData()
    },
    turnToScoreManage () {
      this.$router.push({ name: 'scoreManage' })
    },
    async viewExamDetail (examId) {
      this.examDetailDialog = true
      this.examDetailLoading = true
      this.examDetail = {}
      await this.$api('getExamInfoFromTeacher', {
        examId
      }).then(data => {
        data.questionList.map(item => {
          item.studentAnswer = item.answer ? item.answer.toString() : 'none'
          item.questionAnswer = item.studentAnswer
          item.answer = true
        })
        this.examDetail = data
      }).finally(_ => {
        this.examDetailLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.exam-list-box {
  min-height: 500px;
  .exam-tab-select {
    ul.tab-list {
      width: 100%;
      border-bottom: 1px solid #eee;
      position: relative;
      li {
        height: 36px;
        line-height: 36px;
        width: 90px;
        text-align: center;
        color: #363640;
        cursor: pointer;
        box-sizing: border-box;
        &.active {
          color: #409eff;
        }
        &:hover {
          color: #409eff;
        }
      }
      .line {
        position: absolute;
        bottom: -2px;
        width: 70px;
        height: 2px;
        background: #409eff;
        border-radius: 1px;
        transition: all 0.4s;
      }
    }
  }
  .my-exam-box,
  .finish-exam-box {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .exam-listitem {
      width: 240px;
      margin: 15px 10px;
      &.fake {
        height: 0;
        overflow: hidden;
        margin: 0 10px;
      }
      .exam-info-main {
        padding-top: 5px;
        padding-bottom: 60px;
        dl {
          margin-bottom: 10px;
          display: flex;
          dt {
            font-size: 14px;
            color: #889;
            line-height: 20px;
          }
          dd {
            width: 100%;
            flex: 1;
            color: #262630;
            font-size: 14px;
            text-align: right;
            line-height: 20px;
          }
        }
      }
      .exam-info-footer {
        position: absolute;
        height: 60px;
        background: #f9f9fd;
        border: 1px solid #eee;
        border-radius: 0 0 4px 4px;
        padding: 10px;
        text-align: center;
        width: 100%;
        bottom: 0;
        left: 0;
      }
    }
  }
  .my-exam-box {
    .exam-info-main {
      min-height: 285px;
    }
  }
}
</style>
<style lang="scss">
#ExamList #MyExam .el-table {
  th,
  td,
  .cell {
    padding: 0 3px;
  }
}
#ExamList #MyExam .el-badge__content.is-fixed {
  right: 20px;
}
#ExamList #MyExam .el-badge:hover .el-card {
  box-shadow: 0 2px 20px #ccc;
}
#ExamList #FinishExam .el-card:hover {
  box-shadow: 0 2px 20px #ccc;
}
#ExamList .el-tag--mini {
  margin: 2px;
}
#ExamList .el-card {
  height: 100%;
}
#ExamList .el-dialog__body {
  padding: 10px 20px;
}
</style>

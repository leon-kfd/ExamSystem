<template>
  <div id="StudentHome">
    <div class="page-body">
      <div class="left-box">
        <div class="user-info"
             v-loading="studentInfoLoading">
          <div class="portrait-box">
            <img :src="studentInfo.portrait">
          </div>
          <div class="text-box">
            <p class="student-name">{{studentInfo.username}}</p>
            <p class="student-number">{{studentInfo.number}}</p>
            <p class="student-classname">{{studentInfo.classname}}</p>
            <p class="d-btn-viewmore-box">
              <button class="d-btn btn-viewmore btn-animate1"
                      @click="$router.push({name: 'StudentPersonal'})">查看更多 <i class="el-icon-d-arrow-right"></i></button>
            </p>
          </div>
        </div>
        <div class="notice-box">
          <p class="title"><span>公告消息</span></p>
          <div class="notice-list"
               v-loading="noticeListLoading">
            <div class="notice-listitem"
                 v-for="(item,index) in noticeList"
                 :key="index"
                 @click="showNoticeDetail(item.id)">
              <p class="notice-title ellipsis">{{item.title}}</p>
              <p class="notice-bottom clear">
                <span class="notice-publisher fl">{{item.publisher || '未知'}}</span>
                <span class="notice-date fr">{{item.showTime.split(" ")[0]}}</span>
              </p>
            </div>
          </div>
          <p class="btn-viewmore-box">
            <button class="d-btn btn-viewmore btn-animate1"
                    @click="turnToNoticeList">查看更多 <i class="el-icon-d-arrow-right"></i></button>
          </p>
        </div>
      </div>
      <div class="right-box"
           v-loading="myExamListLoading">
        <div class="exam-list-box">
          <div class="exam-tab-select">
            <ul class="tab-list clear">
              <li :class="{active: tabActive==1}"
                  class="fl"
                  @click="tabActive=1">我的考试</li>
              <li :class="{active: tabActive==2}"
                  class="fl"
                  @click="tabActive=2">已完成</li>
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
                      <dt>出卷人</dt>
                      <dd>{{item.publisher}}</dd>
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
                                size="small">已开始</el-tag>
                        <el-tag type="danger"
                                v-if="item.status==3"
                                size="small">已结束</el-tag>
                      </dd>
                    </dl>
                  </div>
                  <div class="exam-info-footer">
                    <button class="d-btn btn-enter btn-animate1"
                            @click="turnToExam(item.examId, item.status)">进入考试 <i class="el-icon-d-arrow-right"></i></button>
                  </div>
                </el-card>
              </el-badge>
            </div>
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
                      <dt>出卷人</dt>
                      <dd>{{item.publisher}}</dd>
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
                      <dt>交卷时间</dt>
                      <dd style="font-size: 13px;color: #445">{{item.submitTime}}</dd>
                    </dl>
                    <dl>
                      <dt>相关课程</dt>
                      <dd>{{item.course}}</dd>
                    </dl>
                    <dl>
                      <dt>当前状态</dt>
                      <dd :style="{color: statusList[item.status].color}">{{statusList[item.status].text}}</dd>
                    </dl>
                    <dl>
                      <dt>用时</dt>
                      <dd>{{item.useTime}} 分钟</dd>
                    </dl>
                    <dl>
                      <dt>得分</dt>
                      <dd style="font-size: 20px;font-weight: bold">{{item.score}}
                        <span v-if="item.status==3"> + ? </span>
                        <span v-if="item.status==4"> + {{item.essayScore}} </span>
                        <span style="font-size: 12px;color:#889">/ {{item.scoreSum}}</span>
                      </dd>
                    </dl>
                  </div>
                  <div class="exam-info-footer">
                    <button class="d-btn btn-enter btn-animate1"
                            @click="turnToDetail(item.examId)">查看详情 <i class="el-icon-d-arrow-right"></i></button>
                  </div>
                </el-card>
              </div>
            </div>
            <div class="exam-listitem fake"></div>
            <div class="exam-listitem fake"></div>
            <div class="exam-listitem fake"></div>
          </div>
        </div>
        <!-- <div class="exam-public-box">
            <p class="title">公共题库</p>
          </div> -->
      </div>
      <el-dialog :visible.sync="noticeDialog"
                 title="公告详情">
        <div class="notice-detail-box"
             v-loading="noticeDetailLoading">
          <h2 class="title">{{noticeDetail.title}}</h2>
          <p class="text1"><span class="show-time">{{noticeDetail.showTime}}</span><span class="publisher">{{noticeDetail.publisher}}</span></p>
          <div class="ql-snow">
            <div class="content ql-editor"
                 v-html="noticeDetail.content"></div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StudentHome',
  data () {
    return {
      statusList: {
        2: {
          text: '自动阅卷完成',
          color: '#67C23A'
        },
        3: {
          text: '等待老师手动阅卷',
          color: '#E6A23C'
        },
        4: {
          text: '老师手动阅卷已完成',
          color: '#67C23A'
        }
      },
      tabActive: 1,
      myExamList: [],
      myExamFinishList: [],
      noticeList: [],
      studentInfo: {
        username: '',
        number: '',
        classname: '',
        portrait: ''
      },
      noticeDialog: false,
      noticeDetail: {
        title: '',
        publisher: '',
        showTime: '',
        content: ''
      },
      myExamListLoading: false,
      studentInfoLoading: false,
      noticeListLoading: false,
      noticeDetailLoading: false
    }
  },
  mounted () {
    this.getStudentInfo()
    this.getExamList()
    this.getNoticeList()
  },
  methods: {
    async getExamList () {
      this.myExamListLoading = true
      await this.$api('getStudentExamList').then(data => {
        this.myExamList = data.unFinishedExamList
        this.myExamFinishList = data.finishedExamList
      }).finally(_ => {
        this.myExamListLoading = false
      })
    },
    async getStudentInfo () {
      this.studentInfoLoading = true
      await this.$api('getStudentInfo').then(data => {
        this.studentInfo.username = data.student_name || data.student_account
        this.studentInfo.number = data.student_num || '-未设置学号-'
        this.studentInfo.classname = data.class_fullname || data.class_name || '-未设置班级-'
        this.studentInfo.portrait = REQUEST_URL + data.portrait_address || '../../static/img/user.jpg'
      }).finally(_ => {
        this.studentInfoLoading = false
      })
    },
    turnToExam (examId, status) {
      if (status == 2) {
        this.$confirm('进入考试后开始计时, 不可暂停，是否确认开始考试?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ name: 'Exam', params: { examId } })
          console.log(examId)
        }).catch({})
      } else {
        this.$message.warning('考试未开始...')
      }
    },
    turnToDetail (examId) {
      this.$router.push({ name: 'ExamResult', params: { examId } })
    },
    turnToNoticeList () {
      this.$router.push({ name: 'NoticeList' })
    },
    showNoticeDetail (id) {
      this.noticeDialog = true
      this.noticeDetail = {
        title: '',
        publisher: '',
        showTime: '',
        content: ''
      }
      this.getNoticeDetail(id)
    },
    async getNoticeList () {
      this.noticeListLoading = true
      await this.$api('getStudentNoticeList').then(data => {
        this.noticeList = data
      }).finally(_ => {
        this.noticeListLoading = false
      })
    },
    async getNoticeDetail (id) {
      this.noticeDetailLoading = true
      await this.$api('getNoticeDetailFromStudent', {
        id
      }).then(data => {
        console.log(data)
        this.noticeDetail.title = data.notice_title
        this.noticeDetail.publisher = data.teacher_name,
          this.noticeDetail.showTime = data.show_time
        this.noticeDetail.content = data.notice_content
      }).finally(_ => {
        this.noticeDetailLoading = false
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
  display: flex;
  margin-bottom: 20px;
  .left-box {
    width: 300px;
    height: 100%;
    margin-right: 10px;
  }
  .right-box {
    width: 100%;
    flex: 1;
    border-left: 1px solid #ddd;
    padding-left: 10px;
    min-height: 100%;
  }
}
.user-info {
  min-height: 280px;
  padding: 10px;
  margin-bottom: 10px;
}
.notice-box {
  padding: 10px;
  p.title {
    color: #262626;
    text-align: center;
    position: relative;
    height: 26px;
    line-height: 26px;
    margin: 0 -20px;

    span {
      position: absolute;
      display: inline-block;
      height: 26px;
      line-height: 26px;
      background: #fff;
      width: 100px;
      left: 50%;
      font-size: 14px;
      color: #889;
      transform: translateX(-50px);
      z-index: 999;
    }
    &:after {
      position: absolute;
      content: "";
      width: 100%;
      border-top: 1px solid #ddd;
      left: 0;
      top: 13px;
    }
  }
  .notice-list {
    padding: 10px 0;
    min-height: 200px;
    .notice-listitem {
      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
      padding: 0 20px;
      margin: 0 -20px;
      cursor: pointer;
      &:hover {
        background: #f5f5f6;
        .notice-title {
          text-decoration: underline;
        }
      }
      .notice-title {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        font-weight: bold;
        color: #363640;
      }
      .notice-bottom {
        padding-bottom: 12px;
        .notice-publisher,
        .notice-date {
          font-size: 13px;
          color: #889;
        }
      }
    }
  }
}
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
.user-info {
  .portrait-box {
    width: 160px;
    height: 160px;
    text-align: center;
    line-height: 160px;
    border-radius: 50%;
    border: 2px solid #c2a045;
    overflow: hidden;
    margin: 10px auto;
    img {
      width: 160px;
      height: auto;
    }
  }
  .text-box {
    text-align: center;
    .student-name {
      font-size: 16px;
      color: #363640;
      font-weight: bold;
      margin: 10px 0;
      text-transform: capitalize;
    }
    .student-number {
      font-size: 13px;
      color: #889;
      margin: 10px 0;
    }
    .student-classname {
      font-size: 14px;
      color: #665;
      margin: 10px 0;
    }
  }
}
.btn-viewmore-box {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  button {
    i {
      display: none;
      margin-left: 5px;
    }
    &:hover {
      i {
        display: inline;
      }
    }
  }
}
.notice-detail-box {
  padding: 10px;
  .title {
    margin: -20px 0 10px;
  }
  .text1 {
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    margin-bottom: 8px;
    .show-time {
      color: #667;
    }
    .publisher {
      margin-left: 20px;
      color: #667;
      font-weight: bold;
    }
  }
  .content {
    min-height: 200px;
  }
}
@media screen and (min-width: 820px) and (max-width: 1180px) {
  .container {
    width: 820px;
  }
  .page-body {
    .left-box {
      width: 230px;
    }
  }
}
@media screen and (max-width: 830px) {
  .container {
    width: 100%;
  }
  .page-body {
    .left-box {
      display: none;
    }
    .right-box {
      border-left: none;
    }
  }
}
</style>
<style lang="scss">
#StudentHome #MyExam .el-table {
  th,
  td,
  .cell {
    padding: 0 3px;
  }
}
#StudentHome #MyExam .el-badge__content.is-fixed {
  right: 20px;
}
#StudentHome #MyExam .el-badge:hover .el-card {
  box-shadow: 0 2px 20px #ccc;
}
#StudentHome #FinishExam .el-card:hover {
  box-shadow: 0 2px 20px #ccc;
}
#StudentHome .el-tag--mini {
  margin: 2px;
}
#StudentHome .el-card {
  height: 100%;
}
</style>


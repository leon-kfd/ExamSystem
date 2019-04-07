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
              @click="tabActive=2">已结束</li>
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
                    style="width: 100%"
                    :hidden="!item.isNew">
            <el-card class="exam-info"
                     :body-style="{padding: '10px'}">
              <div class="exam-info-main">
                <dl>
                  <dt>试卷题目</dt>
                  <dd>{{item.title}}</dd>
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
                  <dd>{{item.class}}</dd>
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
                    <!-- <el-tag type="danger"
                            v-if="item.status==3"
                            size="small">已结束</el-tag> -->
                  </dd>
                </dl>
              </div>
              <div class="exam-info-footer">
                <button class="d-btn btn-enter btn-animate1"
                        v-if="item.status==0">预览试卷 <i class="el-icon-d-arrow-right"></i></button>
                <button class="d-btn btn-enter btn-animate1"
                        v-if="item.status==1">查看详情 <i class="el-icon-d-arrow-right"></i></button>
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
          <el-card class="exam-info"
                   :body-style="{padding: '10px'}">
            <div class="exam-info-main">
              <dl>
                <dt>试卷题目</dt>
                <dd>{{item.title}}</dd>
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
                <dd>{{item.class}}</dd>
              </dl>
              <dl>
                <dt>相关课程</dt>
                <dd>{{item.course}}</dd>
              </dl>
              <dl>
                <dt>完成情况</dt>
                <dd>
                  <span style="font-weight:bold">{{item.finishNum}}</span>
                  <span style="margin: 0 2px">/</span>
                  <span>{{item.classNum}}</span>
                </dd>
              </dl>
              <dl>
                <dt>阅卷</dt>
                <dd :style="{color: evaluationStatuList[item.evaluationStatus].color }">{{evaluationStatuList[item.evaluationStatus].text}}</dd>
              </dl>
            </div>
            <div class="exam-info-footer">
              <button class="d-btn btn-enter btn-animate1">查看详情 <i class="el-icon-d-arrow-right"></i></button>
            </div>
          </el-card>
        </div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
        <div class="exam-listitem fake"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExamList',
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
      myExamList: [
        {
          title: 'Temp',
          publisher: 'Publisher',
          examLength: '2小时',
          startDate: '2019/01/01',
          endDate: '2019/01/09',
          class: '15信管',
          course: '高等数学',
          questionNum: [{
            radio: 30,
            judge: 10,
            checkbox: 10,
            question: 3,
          }],
          status: 0,
          isNew: true
        },
        {
          title: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
          publisher: 'Publisher',
          examLength: '2小时',
          startDate: '2019/01/01',
          endDate: '2019/01/09',
          class: '15信管',
          course: '高等数学',
          questionNum: [{
            radio: 30,
            judge: 10,
            checkbox: 10,
            question: 3,
          }],
          status: 1,
          isNew: true
        },
        {
          title: 'Temp',
          publisher: 'Publisher',
          examLength: '2小时',
          startDate: '2019/01/01',
          endDate: '2019/01/09',
          class: '15信管',
          course: '高等数学',
          questionNum: [{
            radio: 30,
            judge: 10,
            checkbox: 10,
            question: 3,
          }],
          status: 1,
          isNew: false
        },
        {
          title: 'Temp',
          publisher: 'Publisher',
          examLength: '2小时',
          startDate: '2019/01/01',
          endDate: '2019/01/09',
          class: '15信管',
          course: '高等数学',
          questionNum: [{
            radio: 30,
            judge: 10,
            checkbox: 10,
            question: 3,
          }],
          status: 1,
          isNew: false
        }
      ],
      myExamFinishList: [
        {
          title: 'Temp',
          publisher: 'Publisher',
          examLength: '2小时',
          startDate: '2019/01/01',
          endDate: '2019/01/09',
          class: '15信管',
          course: '高等数学',
          finishNum: 20,
          classNum: 50,
          evaluationStatus: 3
        },
        {
          title: 'Temp',
          publisher: 'Publisher',
          examLength: '2小时',
          startDate: '2019/01/01',
          endDate: '2019/01/09',
          class: '15信管',
          course: '高等数学',
          finishNum: 20,
          classNum: 50,
          evaluationStatus: 4
        },
        {
          title: 'Temp',
          publisher: 'Publisher',
          examLength: '2小时',
          startDate: '2019/01/01',
          endDate: '2019/01/09',
          class: '15信管',
          course: '高等数学',
          finishNum: 20,
          classNum: 50,
          evaluationStatus: 5
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      await this.$api('getTeacherExamList').then(data => {
        this.myExamList = data.items.filter(item => item.status != 0 && item.status != 4)
      }).finally(_ => {
        this.loading = false
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
        height: 60px;
        background: #f9f9fd;
        border-top: 1px solid #eee;
        margin: -10px;
        margin-top: 20px;
        padding: 10px;
        text-align: center;
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
</style>

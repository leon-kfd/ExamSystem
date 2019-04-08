<template>
  <div class="page"
       id="ScoreManage">
    <div class="h-operation clear">
      <span class="h-operation-text">班级</span>
      <el-select v-model="CurrentClass"
                 size="small">
        <el-option v-for="(item,index) in classList"
                   :key="index"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select>
      <span class="h-operation-text"
            style="margin-left: 20px;">考试题目</span>
      <el-select v-model="CurrentExamTitle"
                 size="small">
        <el-option v-for="(item,index) in examTitleList"
                   :key="index"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select>
      <!-- <span class="h-operation-text"
            style="margin-left: 20px;">课程</span>
      <el-select v-model="CurrentCourse"
                 size="small">
        <el-option v-for="(item,index) in courseList"
                   :key="index"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select> -->
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
          <el-table-column prop="course"
                           label="课程"
                           align="center">
          </el-table-column>
          <el-table-column prop="submitTime"
                           align="center"
                           label="交卷时间">
          </el-table-column>
          <el-table-column prop="score"
                           align="center"
                           label="分数"
                           fixed="right">
            <template slot-scope="scope">
              <span class="bold"
                    style="font-size: 18px"
                    :class="{
                      'text-success': scope.row.score >= 80, 
                      'text-info': scope.row.score >= 60 && scope.row.score < 80,
                      'text-danger': scope.row.score < 60  
                    }">{{scope.row.score}}
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           align="center"
                           width="200">
            <template slot-scope="scope">
              <el-button @click="detail(scope.row)"
                         type="text"
                         size="small">查看试卷</el-button>
              <el-button @click="setScore(scope.row)"
                         type="text"
                         size="small">更改分数</el-button>
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
  </div>
</template>
<script>
export default {
  name: 'ScoreManage',
  data () {
    return {
      classList: [
        {
          label: '15信管',
          value: 1
        },
        {
          label: '15软件',
          value: 2,
        }
      ],
      examTitleList: [
        {
          label: 'aaa',
          value: 'EX1554129940560027306'
        }
      ],
      // courseList: [
      //   {
      //     label: '高等数学',
      //     value: 1
      //   },
      //   {
      //     label: '计算机网络',
      //     value: 2
      //   }
      // ],
      CurrentClass: '',
      CurrentCourse: '',
      tableData: [
        {
          id: 1,
          studentNum: '123',
          name: 'XXX',
          course: '高等数学',
          submitTime: '2019-02-25 11:00',
          score: 88
        },
        {
          id: 1,
          studentNum: '123',
          name: 'XXX',
          course: '高等数学',
          submitTime: '2019-02-25 11:00',
          score: 75
        },
        {
          id: 1,
          studentNum: '123',
          name: 'XXX',
          course: '高等数学',
          submitTime: '2019-02-25 11:00',
          score: 58
        }
      ],
      page: 1,
      pageSize: 10,
      total: 0
    }
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
    getData () { }
  }
}
</script>
<style lang="scss" scoped>
</style>


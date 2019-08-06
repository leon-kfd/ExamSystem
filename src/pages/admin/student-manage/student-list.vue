<template>
  <div class="page"
       id="StudentList">
    <div class="h-operation clear">
      <span class="h-operation-text">班级</span>
      <el-select v-model="tableConfig.params.classId"
                 size="small"
                 placeholder="请选择"
                 @change="getData">
        <el-option v-for="(item,index) in classList"
                   :key="index"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary"
                 size="small"
                 class="fr"
                 icon="el-icon-refresh"
                 :loading="loading"
                 @click="getData">刷新</el-button>
    </div>
    <div class="student-list-table">
      <div class="table-main">
        <el-table :data="tableData"
                  border
                  stripe
                  style="width: 100%"
                  v-loading="loading">
          <el-table-column prop="student_num"
                           label="学号"
                           align="center"
                           min-width="100"
                           sortable>
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           align="center">
          </el-table-column>
          <el-table-column prop="tel"
                           label="手机号"
                           align="center">
          </el-table-column>
          <el-table-column prop="email"
                           align="center"
                           label="Email">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           align="center"
                           width="200">
            <template slot-scope="scope">
              <a :href="`mailto://${scope.row.email}`"
                 class="mail-link el-button el-button--text el-button--small"
                 :class="{'is-disabled': !scope.row.email}">发送邮件</a>
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
      <standard-table :conf="tableConfig"
                      ref="table"
                      :loading.sync="loading"></standard-table>
    </div>
  </div>
</template>
<script>
import StandardTable from '@/components/standard-table'
export default {
  name: 'StudentList',
  components: {
    StandardTable
  },
  data () {
    return {
      loading: false,
      CurrentClass: '',
      classList: [
        {
          value: -1,
          label: '数据加载中'
        }
      ],
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      tableConfig: {
        data: [],
        row: [
          {
            prop: 'student_num',
            label: '学号'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'tel',
            label: '学号'
          },
          {
            prop: 'email',
            label: 'Email'
          }
        ],
        operation: {
          btns: [
            {
              label: '发送邮件',
              type: 'text',
              fn: (row) => {
                console.log(row)
              }
            }
          ]
        },
        pagination: {
          requestMap: {
            page: 'page',
            pageSize: 'pageSize'
          },
          responseMap: {
            total: 'total'
          }
        },
        url: 'getStudentList',
        params: {
          classId: ''
        },
        resultMap: 'items'
      }
    }
  },
  async created () {
    await this.getClassroomList()
    await this.getData()
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
    SendEmail () { },
    async getClassroomList () {
      this.loading = true
      let classList = await this.$api('getTeacherClassroom')
      this.classList = classList
      this.tableConfig.params.classId = classList ? classList[0].value : 0
    },
    async getData () {
      // this.loading = true
      // let { items, total } = await this.$api('getStudentList', {
      //   classId: this.CurrentClass,
      //   page: this.page,
      //   pageSize: this.pageSize
      // }).finally(_ => {
      //   this.loading = false
      // })
      // this.tableData = items
      // this.total = total
      this.$nextTick(() => {
        this.$refs.table.fetch().finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mail-link {
  text-decoration: none;
}
</style>

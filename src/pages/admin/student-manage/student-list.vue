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
            label: '手机号'
          },
          {
            prop: 'email',
            label: 'Email'
          }
        ],
        operation: {
          links: [
            {
              label: '发送邮件',
              disabled: (row) => !row.email,
              href: (row) => 'mailto://' + row.email,
              target: '_self'
            }
          ]
        },
        pagination: true,
        url: 'getStudentList',
        params: {
          classId: ''
        }
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

<template>
  <div class="page"
       id="SaveTempTable">
    <div class="h-operation clear">
      <el-button type="primary"
                 size="small"
                 class="fr"
                 icon="el-icon-refresh"
                 :loading="loading"
                 @click="getData">刷新</el-button>
    </div>
    <div class="save-temp-table">
      <standard-table :conf="tableConfig"
                      ref="table"
                      :loading.sync="loading"></standard-table>
    </div>
  </div>
</template>
<script>
import StandardTable from '@/components/standard-table'
export default {
  name: 'SaveTempExam',
  components: {
    StandardTable
  },
  data () {
    return {
      loading: false,
      tableConfig: {
        data: [],
        row: [
          {
            prop: 'lastEditDate',
            label: '最后一次编辑时间',
            align: 'center',
            'min-width': '150'
          },
          {
            prop: 'examId',
            label: 'ID',
            align: 'center',
            'min-width': '200'
          },
          {
            prop: 'title',
            label: '题目',
            align: 'center',
            'min-width': '200'
          }
        ],
        operation: {
          btns: [
            {
              label: '继续编辑',
              type: 'text',
              fn: (row) => {
                this.returnEdit(row)
              }
            },
            {
              label: '删除',
              type: 'text',
              style: (row) => {
                return 'color: #b33'
              }
            }
          ]
        },
        pagination: true,
        url: 'getTeacherExamList',
        params: {
          status: 0
        }
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    returnEdit (row) {
      this.$router.push({
        name: 'createExam',
        params: {
          examId: row.examId
        }
      })
    },
    del (row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            (async () => {
              instance.confirmButtonLoading = true
              await this.$api('deleteTempExam', {
                examId: row.examId
              }).then(data => {
                this.$message.success('删除成功')
                this.getData()
              }).finally(_ => {
                instance.confirmButtonLoading = false
                done()
              })
            })()
          } else {
            done()
          }
        }
      })
    },
    async getData () {
      this.$nextTick(() => {
        this.$refs.table.fetch()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

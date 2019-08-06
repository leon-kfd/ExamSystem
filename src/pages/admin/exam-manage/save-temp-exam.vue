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
      <div class="table-main">
        <el-table :data="tableData"
                  v-loading="loading"
                  border
                  stripe
                  style="width: 100%">
          <el-table-column prop="lastEditDate"
                           label="最后一次编辑时间"
                           align="center"
                           min-width="150"
                           sortable>
          </el-table-column>
          <el-table-column prop="examId"
                           label="ID"
                           align="center"
                           min-width="200">
          </el-table-column>
          <el-table-column prop="title"
                           label="题目"
                           align="center"
                           min-width="200">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           align="center"
                           width="200">
            <template slot-scope="scope">
              <el-button @click="returnEdit(scope.row)"
                         type="text"
                         size="small">继续编辑</el-button>
              <el-button type="text"
                         @click="del(scope.row)"
                         size="small"
                         style="color: #b33">删除</el-button>
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
  name: 'SaveTempExam',
  data () {
    return {
      loading: false,
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleSizeChange (val) {
      this.page = 1
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getData()
    },
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
      this.loading = true
      await this.$api('getTeacherExamList', {
        status: 0,
        page: this.page,
        pageSize: this.pageSize
      }).then(data => {
        this.tableData = data.items
        this.page = data.page
        this.total = data.total
      }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

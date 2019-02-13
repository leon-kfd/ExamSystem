<template>
  <div class="page">
    <div class="save-temp-table">
      <div class="table-main">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column prop="lastEditDate"
                           label="最后一次编辑时间"
                           align="center"
                           min-width="150">
          </el-table-column>
          <el-table-column prop="id"
                           label="ID"
                           align="center"
                           min-width="200">
          </el-table-column>
          <el-table-column prop="title"
                           label="题目"
                           align="center"
                           min-width="200">
          </el-table-column>
          <el-table-column prop="questionCount"
                           align="center"
                           label="已编辑题目量"
                           width="120">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           align="center"
                           width="200">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)"
                         type="text"
                         size="small">继续编辑</el-button>
              <el-button type="text"
                         size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="current"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="10"
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
      tableData: [
        {
          lastEditDate: '2016-05-03',
          id: 'F1455F6496FDA55D1E48E72BD99366B0',
          title: 'Title01 abc',
          questionCount: 20
        }
      ],
      current: 1,
      total: 10
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.table-pagination {
  margin: 15px 0;
  text-align: right;
}
</style>


<template>
  <div class="page"
       id="StudentList">
    <div class="h-operation clear">
      <span class="h-operation-text">班级</span>
      <el-select v-model="CurrentClass"
                 size="small"
                 placeholder="请选择">
        <option v-for="(item,index) in classList"
                :key="index"
                :label="item.label"
                :value="item.value">
        </option>
      </el-select>
      <el-button type="primary"
                 size="small"
                 class="fr"
                 icon="el-icon-refresh">刷新</el-button>
    </div>
    <div class="student-list-table">
      <div class="table-main">
        <el-table :data="tableData"
                  border
                  stripe
                  style="width: 100%">
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
              <el-button @click="SendEmail(scope.row)"
                         type="text"
                         size="small">发送邮件</el-button>
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
  name: 'StudentList',
  data () {
    return {
      CurrentClass: '',
      classList: [
        {
          value: 1,
          label: '15信管'
        },
        {
          value: 2,
          label: '15软件'
        }
      ],
      tableData: [
        {
          studentNum: '2015034843000',
          name: 'XXXX',
          tel: '13200000000',
          email: 'abc@123.com'
        },
        {
          studentNum: '2015034843000',
          name: 'XXXX',
          tel: '13200000000',
          email: 'abc@123.com'
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
    },
    SendEmail () {

    }
  }
}
</script>
<style lang="scss" scoped>
</style>



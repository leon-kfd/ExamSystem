<template>
  <div id="ClassManage">
    <div class="classroom-box"
         v-loading="loading">
      <el-transfer :titles="['班级列表', '我的班级']"
                   filter-placeholder="请输入班级名"
                   v-model="myClass"
                   :data="classList">
        <div slot="left-footer"
             style="margin-top: 9px;">
          <span style="font-size:12px;color: #99a;margin-right: 4px">筛选</span>
          <el-select class="transfer-footer"
                     style="width: 75%;"
                     size="small"
                     v-model="ClassFilterValue">
            <el-option :value="1"
                       :label="'未开放'"
                       disabled></el-option>
          </el-select>
        </div>
        <div slot="right-footer"
             style="margin-top: 9px;">
          <el-button size="small"
                     type="success"
                     style="width: 200px"
                     :loading="btnSaveLoading"
                     plain
                     @click="saveClass">保存</el-button>
        </div>
      </el-transfer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ClassManage',
  data () {
    return {
      loading: false,
      myClass: [],
      classList: [],
      ClassFilterValue: '',
      btnSaveLoading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      await this.$api('getClassroomList').then(data => {
        let temp = data.map(item => {
          return {
            label: item.label,
            key: item.value
          }
        })
        this.classList = temp
      })
      await this.$api('getTeacherClassroom').then(data => {
        let temp = data.map(item => {
          return item.value
        })
        this.myClass = temp
      })
      this.loading = false
    },
    async saveClass () {
      this.btnSaveLoading = true
      await this.$api('setTeacherClassroom', {
        classroom: this.myClass
      })
      this.$message.success('班级设置成功..')
      this.btnSaveLoading = false
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
.classroom-box {
  min-width: 780px;
  text-align: center;
  padding: 30px;
  border: 1px solid #dde;
  background: #fff;
  display: inline-block;
}
</style>
<style>
#ClassManage .el-transfer {
  display: inline-block;
  text-align: left;
}
#ClassManage .el-transfer-panel {
  width: 300px;
}
#ClassManage .el-transfer-panel__body {
  height: 400px;
}
#ClassManage .el-transfer-panel__footer {
  text-align: center;
}
#ClassManage .el-transfer-panel .el-transfer-panel__footer {
  height: 50px;
}
</style>


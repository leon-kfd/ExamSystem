<template>
  <div id="ClassManage">
    <div class="classroom-box">
      <el-transfer filterable
                   :filter-method="filterMethod"
                   :titles="['班级列表', '我的班级']"
                   filter-placeholder="请输入班级名"
                   v-model="myClass"
                   :data="classList">
        <div slot="left-footer"
             style="margin-top: 9px;">
          <span style="font-size:12px;color: #99a;margin-right: 4px">筛选</span>
          <el-select class="transfer-footer"
                     style="width: 75%;"
                     size="small">
            <el-option>aaa</el-option>
          </el-select>
        </div>
        <div slot="right-footer"
             style="margin-top: 9px;">
          <el-button size="small"
                     type="success"
                     style="width: 200px"
                     plain>保存</el-button>
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
      myClass: [],
      classList: [
        {
          label: '15信管',
          key: 1
        },
        {
          label: '15软件',
          key: 2
        }
      ]
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


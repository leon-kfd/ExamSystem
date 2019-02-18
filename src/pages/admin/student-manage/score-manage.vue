<template>
  <div class="page"
       id="ScoreManage">
    <div class="score-manage-header clear">
      <div class="filter-box fl">
        <el-form ref="filterForm"
                 :model="filterForm"
                 label-width="80px">
          <el-form-item label="班级">
            <el-select v-model="filterForm.class"
                       size="small">
              <el-option v-for="(item,index) in classList"
                         :key="index"
                         :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
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
      filterForm: {
        class: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.score-manage-header {
  padding: 10px;
  .filter-box {
    width: 300px;
  }
}
</style>


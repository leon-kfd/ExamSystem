<template>
  <div class="page">
    <div class="container">
      <div class="create-exam-box">
        <h1 style="padding: 8px">创建考试</h1>
        <div class="create-btn-box">
          <el-button type="primary"
                     plain
                     icon="el-icon-plus">单选题</el-button>
          <el-button type="primary"
                     plain
                     icon="el-icon-plus">判断题</el-button>
          <el-button type="primary"
                     plain
                     icon="el-icon-plus">多选题</el-button>
          <el-button type="primary"
                     plain
                     icon="el-icon-plus">问答题</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 1160px;
  margin: 0 auto;
  padding: 10px;
}
.create-exam-box {
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 10px #aaa;
  .create-btn-box {
    padding: 10px 0;
    text-align: center;
    border-top: 1px solid #ccc;
  }
}
</style>



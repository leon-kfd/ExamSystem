<template>
  <div id="ExamResult">
    <div class="page-body">
      <div class="nav-title">
        <i class="el-icon-download"
           @click="$router.push({name: 'StudentHome'})"></i>
        <p class="title">考试结果信息</p>
      </div>
      <main class="result-body">
        <p class="exam-title">aaa</p>
        <div class="question-list">
          <div class="question-listitem">
            <div class="test-item">
              <div class="test-title">
                <span class="t-number">1</span>
                <el-tag class="t-type">单选题 <span class="score-text">5</span>分</el-tag>
                <span class="t-info">aaa</span>
              </div>
              <div class="test-answer">
                <div class="type-radio">
                  <div class="answer">
                    <div class="radio-item true">
                      <span class="a-options">A</span>
                      <span class="a-info">bbb</span>
                    </div>
                    <div class="radio-item">
                      <span class="a-options">B</span>
                      <span class="a-info">ccc</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="question-listitem">
            <div class="test-item">
              <div class="test-title">
                <span class="t-number">2</span>
                <el-tag class="t-type">判断题 <span class="score-text">5</span>分</el-tag>
                <span class="t-info">bbb</span>
              </div>
              <div class="test-answer">
                <div class="type-radio">
                  <div class="answer">
                    <div class="judge-item false">
                      <span class="a-options"><i class="el-icon-check"></i></span>
                    </div>
                    <div class="judge-item">
                      <span class="a-options"><i class="el-icon-close"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExamResult',
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.page-body {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px #ccc;
  margin-top: 70px;
  padding: 15px 10px;
  margin-bottom: 20px;
  min-height: 500px;
}
.nav-title {
  width: 100%;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 38px;
  i {
    position: absolute;
    font-size: 24px;
    display: block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    transform: rotate(90deg);
    left: 5px;
    top: -1px;
    color: #409eff;
    cursor: pointer;
    transition: left 0.2s;
    &:hover {
      left: 0;
    }
  }
  .title {
    height: 36px;
    line-height: 36px;
    color: #409eff;
  }
}
.result-body {
  padding: 5px;
  .exam-title {
    font-size: 24px;
    padding: 5px 5px 10px;
  }
  .question-list {
    .question-listitem {
      .test-item {
        margin-bottom: 10px;
        .test-title {
          display: flex;
          align-items: baseline;
          .t-number {
            font-size: 18px;
            font-weight: bold;
            padding: 0 8px;
          }
          .t-type {
            margin: 0 5px 0 2px;
          }
        }
      }
      .answer {
        padding: 10px 18px;
        width: 100%;
        .radio-item {
          display: flex;
          width: 95%;
          padding: 5px 10px;
          .a-options {
            padding: 0 10px;
            color: #889;
            font-weight: bold;
          }
          .a-info {
            color: #262626;
            display: inline-block;
            width: 100%;
          }
        }
        .judge-item {
          width: 100px;
          padding: 5px 10px 5px 20px;
          .a-options {
            i {
              font-weight: bold;
            }
          }
        }
        .checkbox-item {
          display: flex;
          width: 95%;
          padding: 5px 10px;
          .a-options {
            padding: 0 10px;
            color: #889;
            font-weight: bold;
          }
          .a-info {
            color: #262626;
            display: inline-block;
            width: 100%;
          }
        }
        .question-item {
          padding: 5px 10px;
          border-radius: 4px;
        }
        .radio-item,
        .judge-item,
        .checkbox-item {
          border-radius: 4px;
          margin-left: 8px;
          position: relative;
          margin-bottom: 8px;
          height: auto;
          &.true {
            border: 1px solid #67c23a;
            &:after {
              font-family: element-icons !important;
              content: "\E611";
              position: absolute;
              top: -10px;
              left: -8px;
              display: block;
              width: 20px;
              height: 20px;
              line-height: 20px;
              font-size: 20px;
              color: #67c23a;
              background: #fff;
            }
          }
          &.false {
            border: 1px solid #f56c6c;
            &:after {
              font-family: element-icons !important;
              content: "\E60F";
              position: absolute;
              top: -10px;
              left: -8px;
              display: block;
              width: 20px;
              height: 20px;
              line-height: 20px;
              font-size: 20px;
              color: #f56c6c;
              background: #fff;
            }
          }
        }
      }
    }
  }
}
</style>

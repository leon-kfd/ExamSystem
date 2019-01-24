<template>
  <div class="page">
    <nav class="nav"></nav>
    <div class="container">
      <!-- <header class="header">
        <h1 class='m-title'>在线考试系统</h1>
      </header>
      <nav class="nav"></nav> -->
      <div class="page-body">
        <div class="left-box">
          <aside class="exam-info">考试信息</aside>
          <aside class='user-info'>考生信息</aside>
        </div>
        <div class="center-box">
          <main class="exam-body">
            <div class="exam-main">
              <h2 class="exam-title">全球化时代的思维技能</h2>
              <div class="radio-block">
                <div class="type-title">单选题</div>
                <section class="test-item">
                  <p class="test-title">
                    <span class="t-number">1</span>
                    <span class="t-info">批判性思维是一种（）的思维技能</span>
                  </p>
                  <el-radio-group class="answer"
                                  v-model="test.answer1">
                    <el-radio label="A"
                              class="radio-item"
                              border>
                      <span class="a-options">A</span>
                      <span class="a-info">领域一般性 Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores est eum ad consectetur inventore illo ipsum officia ducimus, odio adipisci maxime quaerat aliquam vero fugit beatae et, molestias minima quasi?</span>
                    </el-radio>
                    <el-radio label="B"
                              class="radio-item"
                              border>
                      <span class="a-options">B</span>
                      <span class="a-info">领域一般性</span>
                    </el-radio>
                    <el-radio label="C"
                              class="radio-item"
                              border>
                      <span class="a-options">C</span>
                      <span class="a-info">领域一般性</span>
                    </el-radio>
                    <el-radio label="D"
                              class="radio-item"
                              border>
                      <span class="a-options">D</span>
                      <span class="a-info">领域一般性</span>
                    </el-radio>
                  </el-radio-group>
                </section>
              </div>
              <div class="judge-block">
                <div class="type-title">判断题</div>
                <section class="test-item">
                  <p class="test-title">
                    <span class="t-number">1</span>
                    <span class="t-info">批判性思维是一种（）的思维技能</span>
                  </p>
                  <el-radio-group class="answer"
                                  v-model="test.answer2">
                    <el-radio label="1"
                              class="judge-item"
                              border>
                      <span class="a-options"><i class="el-icon-check"></i></span>
                    </el-radio>
                    <el-radio label="0"
                              class="judge-item"
                              border>
                      <span class="a-options"><i class="el-icon-close"></i></span>
                    </el-radio>
                  </el-radio-group>
                </section>
              </div>
              <div class="checkbox-block">
                <div class="type-title">多选题</div>
                <section class="test-item">
                  <p class="test-title">
                    <span class="t-number">1</span>
                    <span class="t-info">批判性思维是一种（）的思维技能</span>
                  </p>
                  <el-checkbox-group class="answer"
                                     v-model="test.answer3">
                    <el-checkbox label="A"
                                 class="checkbox-item"
                                 border>
                      <span class="a-options">A</span>
                      <span class="a-info">领域一般性 Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores est eum ad consectetur inventore illo ipsum officia ducimus, odio adipisci maxime quaerat aliquam vero fugit beatae et, molestias minima quasi?</span>
                    </el-checkbox>
                    <el-checkbox label="B"
                                 class="checkbox-item"
                                 border>
                      <span class="a-options">B</span>
                      <span class="a-info">领域一般性</span>
                    </el-checkbox>
                    <el-checkbox label="C"
                                 class="checkbox-item"
                                 border>
                      <span class="a-options">C</span>
                      <span class="a-info">领域一般性</span>
                    </el-checkbox>
                    <el-checkbox label="D"
                                 class="checkbox-item"
                                 border>
                      <span class="a-options">D</span>
                      <span class="a-info">领域一般性</span>
                    </el-checkbox>
                  </el-checkbox-group>
                </section>
              </div>
              <div class="question-block">
                <div class="type-title">问答题</div>
                <section class="test-item">
                  <p class="test-title">
                    <span class="t-number">1</span>
                    <span class="t-info">批判性思维是一种（）的思维技能</span>
                  </p>
                  <div class="answer">
                    <div class="question-item">
                      <el-input type="textarea"
                                :autosize="{ minRows: 3, maxRows: 8}"
                                placeholder="请在此处输入答案"
                                v-model="test.answer4">
                      </el-input>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
        <div class="right-box">
          <aside class="exam-timer">时间计时器</aside>
          <aside class="title-selection">
            <item-selector></item-selector>
          </aside>
          <aside class='user-exam-info'>考生信息/考试信息</aside>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemSelector from './components/item-selector'
import { ScrollTo } from '@/utils/animate'
export default {
  name: 'Exam',
  components: {
    ItemSelector
  },
  data () {
    return {
      test: {
        answer1: 'A',
        answer2: '1',
        answer3: [],
        answer4: ''
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
header,
nav,
main,
aside,
footer {
  padding: 8px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 3px #aab;
  margin-bottom: 10px;
  min-height: 20px;
}
nav.nav {
  width: 100%;
  background: #fff;
  height: 50px;
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.container {
  width: 1160px;
  margin: 0 auto;
  padding: 10px;
}
.page-body {
  position: relative;
  padding-top: 50px;
  .left-box {
    width: 250px;
    position: fixed;
    top: 60px;
    left: 50%;
    padding: 10px;
    transform: translateX(-570px);
    opacity: 1;
    overflow-y: auto;
    transition: all 0.6s;
    max-height: calc(100vh - 100px);
    .user-info {
      min-height: 150px;
    }
    .exam-info {
      min-height: 300px;
    }
  }
  .right-box {
    width: 250px;
    position: fixed;
    top: 60px;
    right: 50%;
    transform: translateX(570px);
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 70px);
    .exam-timer {
      min-height: 80px;
    }
    .title-selection {
      min-height: 200px;
    }
    .user-exam-info {
      transform: translateX(100px);
      opacity: 0;
      transition: all 0.6s;
      min-height: 300px;
    }
  }
  .center-box {
    margin: 0 240px 10px;
    padding: 10px;
    .exam-body {
      height: 2000px;
    }
  }
}
@media screen and (min-width: 820px) and (max-width: 1180px) {
  .container {
    width: 820px;
  }
  .page-body {
    .left-box {
      transform: translateX(-670px);
      opacity: 0;
      transition: all 0.6s;
    }
    .center-box {
      margin: 0 240px 10px 0;
    }
    .right-box {
      transform: translateX(400px);
      .user-exam-info {
        transform: translateX(0);
        opacity: 1;
        transition: transform 0.6s;
      }
    }
  }
}
@media screen and (max-width: 830px) {
  .container {
    width: 100%;
  }
  .page-body {
    .left-box {
      transform: translateX(-670px);
      opacity: 0;
      transition: all 0.6s;
    }
    .center-box {
      margin: 0 auto 10px;
      padding: 0 !important;
    }
    .right-box {
      display: none;
    }
  }
  .answer {
    padding: 5px !important;
    .a-options {
      margin-left: -8px !important;
      padding: 0 4px !important;
    }
  }
}
.exam-main {
  .exam-title {
    font-size: 24px;
    padding: 5px 5px 10px;
  }
  .type-title {
    padding: 10px 15px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-10px);
      height: 20px;
      left: 3px;
      border-left: 4px solid #409eff;
    }
  }
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
    }
  }
  .answer {
    padding: 8px;
    padding-right: 20px;
    width: 100%;
    .radio-item {
      display: flex;
      margin-bottom: 8px;
      width: 95%;
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
      margin-bottom: 8px;
      width: 100px;
      .a-options {
        i {
          font-weight: bold;
          font-size: 20px;
        }
      }
    }
    .checkbox-item {
      display: flex;
      margin-bottom: 8px;
      width: 95%;
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
      padding: 0 10px;
    }
  }
}
</style>
<style lang="scss">
.el-radio.is-bordered,
.el-checkbox.is-bordered {
  margin-left: 10px;
}
.answer {
  .el-radio.is-bordered.radio-item {
    height: auto;
    padding: 12px 20px 12px 10px;
    .el-radio__label {
      display: flex;
      white-space: normal;
    }
  }
  .el-radio.is-bordered.judge-item {
    height: auto;
    padding: 8px 10px;
    .el-radio__label {
      vertical-align: middle;
    }
  }
  .el-checkbox.is-bordered.checkbox-item {
    height: auto;
    padding: 12px 20px 12px 10px;
    .el-checkbox__label {
      display: flex;
      white-space: normal;
    }
    .el-checkbox__input {
      padding-top: 3px;
    }
  }
}
textarea {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>



<template>
  <div class="main">
    <div class="question-section-box">
      <span class="item"
            v-for="(item,index) in resultList"
            :key="index"
            :class="{'q-true': typeof item.answer == 'boolean' && item.answer, 
            'q-false': !item.answer, 
            'q-unkonwn':typeof item.answer == 'string' && item.answer=='unknown'}">{{item.index}}</span>
      <span class="item fake"
            v-for="item in 5"
            :key="item+'fake'"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QuestionSectionList',
  props: ['resultList'],
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.question-section-box {
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .item {
    user-select: none;
    font-size: 14px;
    font-weight: bold;
    color: #262626;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
    margin: 4px;
    position: relative;
    &.fake {
      height: 0;
      visibility: hidden;
    }
    &.q-true {
      color: #67c23a;
      border-color: #67c23a;
      &:after {
        font-family: element-icons !important;
        content: "\e6da";
        position: absolute;
        top: -6px;
        right: -4px;
        display: block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 18px;
        color: #67c23a;
        background: #fff;
      }
    }
    &.q-false {
      color: #f56c6c;
      border-color: #f56c6c;
      &:after {
        font-family: element-icons !important;
        content: "\e6db";
        position: absolute;
        top: -6px;
        right: -4px;
        display: block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 18px;
        color: #f56c6c;
        background: #fff;
      }
    }
    &.q-unkonwn {
      color: #e6a23c;
      border-color: #e6a23c;
      &:after {
        // font-family: element-icons !important;
        content: "?";
        position: absolute;
        top: -6px;
        right: -4px;
        display: block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 18px;
        color: #e6a23c;
        background: #fff;
      }
    }
  }
}
</style>

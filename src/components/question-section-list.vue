<template>
  <div class="main">
    <div class="question-section-box">
      <span class="item" v-for="(item,index) in resultList" :key="index" 
        :class="{'q-true': item.answer, 'q-false': !item.answer}">{{item.index}}</span>
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
    position:relative;
    &.fake {
      height: 0;
      visibility: hidden;
    }
    &.q-true {
      color: #67c23a;
      border-color: #67c23a;
      &:after {
        font-family: element-icons!important;
        content: "\E611";
        position:absolute;
        top: -6px;
        right: -4px;
        display: block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 18px;
        color: #67c23a;
        background: #fff;
        vertical-align: baseline;
      }
    }
    &.q-false {
      color: #f56c6c;
      border-color: #f56c6c;
      &:after {
        font-family: element-icons!important;
        content: "\E60F";
        position:absolute;
        top: -6px;
        right: -4px;
        display: block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 18px;
        color: #f56c6c;
        background: #fff;
        vertical-align: baseline;
      }
    }
  }
}
</style>

<template>
  <div class='components'
       id="ItemSelector">
    <div class="item-selector-box">
      <span class="item"
            v-for="(item,index) in selectorList"
            :key="index"
            :class="{'finsh':item.status==1, 'success': item.status==2, 'fail':item.status==3}"
            @click="handleClick(index)">{{item.id}}</span>
      <span class="item fake"
            v-for="item in 5"
            :key="item+'fake'"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ItemSelector',
  props: ['selectorList'],
  data () {
    return {
    }
  },
  methods: {
    handleClick (index) {
      this.$emit('selector-click', index)
    }
  }
}
</script>
<style lang="scss" scoped>
.item-selector-box {
  // padding: 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .item {
    user-select: none;
    font-size: 12px;
    font-weight: bold;
    color: #262626;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid #ccc;
    background: #f5f5f6;
    cursor: pointer;
    margin: 3px;
    &.fake {
      height: 0;
      visibility: hidden;
    }
    &.finsh {
      color: #409eff;
      background: #ecf5ff;
      border-color: #409eff;
    }
    &.fail {
      color: #f56c6c;
      background: #fef0f0;
      border-color: #f56c6c;
    }
    &.success {
      color: #67c23a;
      background: #f0f9eb;
      border-color: #67c23a;
    }
  }
}
</style>


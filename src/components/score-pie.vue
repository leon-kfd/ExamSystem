<template>
  <div class="score-pie"
       style="width: 500px;height: 500px;margin-top: 10px"
       ref="myEchart"></div>
</template>
<script>
// let echarts = require('echarts/lib/echarts')
// // 引入柱状图组件
// require("echarts/lib/chart/pie")
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
import echarts from 'echarts'

export default {
  name: 'ScorePie',
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['≤60', '60~70', '70~80', '80~90', '90~100']
        },
        series: [
          {
            name: '分数段',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 30, name: '≤60' },
              { value: 20, name: '60~70' },
              { value: 15, name: '70~80' },
              { value: 15, name: '80~90' },
              { value: 10, name: '90~100' }
            ]
          }
        ]
      };
      this.chart.setOption(option)
    }
  }
}
</script>


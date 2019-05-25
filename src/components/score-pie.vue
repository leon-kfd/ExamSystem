<template>
  <div class="score-pie"
       style="width: 550px;height: 500px;margin-top: 10px"
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
  props: {
    pieData: {
      type:Array
    }
  },
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
        color: ['#f15a57', '#f2c46e', '#83a4d7', '#79ab36', '#22c044'],
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          // orient: 'vertical',
          x: 'left',
          data: ['≤60', '60~70', '70~80', '80~90', '90~100']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            name: '分数段',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                formatter: '{b}: \n {d}%'
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: []
          }
        ]
      };
      option.series[0].data = this.pieData
      this.chart.setOption(option)
    },
    refresh() {
      this.chart && this.chart.clear()
      this.initChart()
    }
  },
  watch: {
    pieData () {
      this.chart && this.chart.clear()
      this.initChart()
    }
  }
}
</script>


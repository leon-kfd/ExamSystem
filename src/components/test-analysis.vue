<template>
  <div class="test-analysis"
       style="width: 550px;height: 600px;margin-top: 10px"
       ref="myEchart"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'TestAnalysis',
  props: {
    xData: {
      type: Array
    },
    yData: {
      type: Array
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
      this.chart = echarts.init(this.$refs.myEchart)
      // 把配置和数据放这里
      let option = {
        title: {
          text: '试题正确率'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            return params[0].marker + params[0].name + ':' + params[0].value + '%'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          min: 0,
          max: 100
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [
          {
            name: '正确率',
            type: 'bar',
            data: [],
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.value > 0 && params.value < 30) {
                    return '#f15a57'
                  } else if (params.value >= 30 && params.value < 60) {
                    return '#f2c46e'
                  } else if (params.value >= 60 && params.value < 80) {
                    return '#83a4d7'
                  } else {
                    return '#79ab36'
                  }
                },
                label: {
                  show: true,
                  formatter: '{c}%'
                }
              }
            }
          }
        ]
      }
      option.yAxis.data = this.xData
      option.series[0].data = this.yData
      this.chart.setOption(option)
    },
    refresh () {
      this.chart && this.chart.clear()
      this.initChart()
    }
  },
  watch: {
    xData () {
      this.chart && this.chart.clear()
      this.initChart()
    },
    yData () {
      this.chart && this.chart.clear()
      this.initChart()
    }
  }
}
</script>

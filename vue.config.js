module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost/ExamSystemApi/public',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'vuex': 'Vuex',
      'echarts': 'echarts'
    }
  },
  publicPath: './',
  productionSourceMap: false
}

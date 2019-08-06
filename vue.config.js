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
  }
}

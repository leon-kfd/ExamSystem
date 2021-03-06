import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.scss'
import api from '@/axios/api.js'

import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import NewLoading from '@/components/loading'

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

Vue.use(ELEMENT)
Vue.use(NewLoading)

Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

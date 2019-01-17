// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import {Radio, RadioGroup, Icon, Checkbox, CheckboxGroup, Input} from 'element-ui'

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(Icon)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
// Vue.use(Input)

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

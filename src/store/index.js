import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    studentInfo: {}
  },
  mutations: {
    updateStudentInfo (state, studentInfo) {
      state.studentInfo = studentInfo
    }
  },
  getters: {
  }
})
export default store

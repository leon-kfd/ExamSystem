import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    studentInfo: {},
    classList: []
  },
  mutations: {
    updateStudentInfo (state, studentInfo) {
      state.studentInfo = studentInfo
    },
    updateClassList (state, classList) {
      state.classList = classList
    }
  },
  getters: {
  }
})
export default store

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    studentInfo: {},
    studentRefresh: true,
    classList: []
  },
  mutations: {
    updateStudentInfo (state, studentInfo) {
      state.studentInfo = studentInfo
    },
    updateStudentRefresh (state, studentRefresh) {
      state.studentRefresh = studentRefresh
    },
    updateClassList (state, classList) {
      state.classList = classList
    }
  },
  getters: {
  }
})
export default store

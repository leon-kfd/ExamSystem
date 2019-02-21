import request from './index.js'

export const config = {
  getTeacherClassroom: {
    url: '/getTeacherClassroom',
    method: 'post'
  },
  getStudentList: {
    url: '/getStudentList',
    method: 'post'
  }
}

export default function api (fnName, data) {
  return request(config, fnName, data)
}

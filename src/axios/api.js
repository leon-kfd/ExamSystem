import request from './index'
import student from './student'
import teacher from './teacher'

const config = {
  login: {
    url: '/login'
  },
  register: {
    url: '/register'
  },
  ...student,
  ...teacher
}

export default function api (fnName, data) {
  return request(config, fnName, data)
}

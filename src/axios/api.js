import request from './index'
import student from './student'
import teacher from './teacher'

const config = {
  login: {
    url: '/login'
  },
  ...student,
  ...teacher
}

export default function api (fnName, data) {
  return request(config, fnName, data)
}

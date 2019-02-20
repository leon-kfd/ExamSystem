import request from './index.js'

export const config = {
  mock: {
    url: '/mock',
    method: 'post'
  },
  getClassroomList: {
    url: '/getClassroomList',
    method: 'post'
  }
}

export default function api (fnName, data) {
  return request(config, fnName, data)
}

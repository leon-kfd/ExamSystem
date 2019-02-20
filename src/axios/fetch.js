import axios from 'axios'
import qs from 'qs'

/**
 * axios 实例
 */

var devURL = 'api/'
// var baseURL = process.env.NODE_ENV === 'production' ? devURL : 'http://localhost:8080/'
var baseURL = devURL

const instance = axios.create({
  baseURL: 'http://127.0.0.1/ExamSystemApi/public/api/',
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data)
  }
  return config
})

instance.interceptors.response.use(
  response => {
    let data = response.data
    return data
  },
  err => {
    return Promise.reject(err)
  }
)

export {
  baseURL
}

export default instance

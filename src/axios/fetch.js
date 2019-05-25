import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import promiseFinally from 'promise.prototype.finally'
import router from '@/router/'

promiseFinally.shim()
/**
 * axios 实例
 */

// var devURL = 'http://localhost/ExamSystemApi/public/api/'
var baseURL = process.env.NODE_ENV === 'production' ? './api' : './api/api'
window.REQUEST_URL = process.env.NODE_ENV === 'production' ? '.' : baseURL.slice(-4)
console.log(window.REQUEST_URL)

const instance = axios.create({
  baseURL,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  let token = sessionStorage.getItem('token') || ''
  if (token) {
    if (config.data) {
      config.data.token = token
    } else {
      config.data = {}
      config.data.token = token
    }
  }
  if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data)
  }
  return config
})

instance.interceptors.response.use(
  response => {
    let data = response.data
    if (data.code === 200) {
      return data.data
    } else {
      if (data.code === 300) {
        Message({
          showClose: true,
          message: data.message,
          type: 'error',
          duration: 2000
        })
        router.push('/login')
      } else if (data.message) {
        Message({
          showClose: true,
          message: data.message,
          type: 'error',
          duration: 2000
        })
      }
      return Promise.reject(response)
    }
  },
  err => {
    Message({
      showClose: true,
      message: 'Api访问失败，请检查网络..',
      type: 'error',
      duration: 1500
    })
    return Promise.reject(err)
  }
)

export {
  baseURL
}

export default instance

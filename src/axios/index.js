import fetch from './fetch'

export default function request (config, fnName, data) {
  if (typeof config[fnName] !== 'object') {
    throw new Error('调用api函数函数错误，请检查函数名称是否错误')
  }
  var newConfig = JSON.parse(JSON.stringify(config[fnName]))
  if (!config[fnName].method) newConfig.method = 'post'
  if (data) {
    if (newConfig.method === 'get' || newConfig.method === 'delete' || newConfig.method === undefined) {
      newConfig.params = data
    } else {
      newConfig.data = data
    }
  }
  return fetch(newConfig)
}

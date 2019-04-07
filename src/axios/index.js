import fetch from './fetch'

export default function request (config, fnName, data) {
  if (typeof config[fnName] !== 'object') {
    throw new Error('调用api函数函数错误，请检查函数名称是否错误')
  }
  var newConfig = JSON.parse(JSON.stringify(config[fnName]))
  if (!config[fnName].method) newConfig.method = 'post'
  if (data) {
    if (newConfig.method === 'get' || newConfig.method === 'delete' || newConfig.method === undefined) {
      // newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
      //   var res = data[$1]
      //   // 删除data中的对应字段
      //   delete data[$1]
      //   return res
      // })
      newConfig.params = data
    } else {
      // newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
      //   var res = data[$1]
      //   // 删除data中的对应字段
      //   delete data[$1]
      //   return res
      // })
      newConfig.data = data
    }
  }
  return fetch(newConfig)
}

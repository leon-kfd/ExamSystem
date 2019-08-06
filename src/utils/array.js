/**
* 数组元素交换位置
* @param {array} arr 数组
* @param {number} index1 添加项目的位置
* @param {number} index2 删除项目的位置
* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
*/
function swapArray (arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

// 上移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位

function zIndexUp (arr, index) {
  if (index !== 0) {
    swapArray(arr, index, index - 1)
  } else {
    console.log('Err: 已经处于置顶，无法上移')
  }
}

// 下移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位

function zIndexDown (arr, index) {
  if (index + 1 !== arr.length) {
    swapArray(arr, index, index + 1)
  } else {
    console.log('Err: 已经处于置底，无法下移')
  }
}

// 删除数组元素
function delItem (arr, index) {
  if (index < arr.length) {
    arr.splice(index, 1)
  } else {
    console.log('Err: 超出数组长度')
  }
}

export { swapArray, zIndexUp, zIndexDown, delItem }

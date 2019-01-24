/**
* 滚动到指定位置
* @param {number} top 滚到到指定位置的高度
* @param {number} duration 滚动时长
* @param {object} selector 滚动条不在body上时，需传入当前滚动条所在javascriptDom元素
*/
function ScrollTo (top, duration, selector = window) {
  const lastTop = selector == window ? (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) : selector.scrollTop
  const startTime = new Date()
  let timer
  function scrollAnimate () {
    const time = new Date() - startTime
    selector.scrollTo(0, lastTop + (top - lastTop) * (time / duration))
    timer = requestAnimationFrame(scrollAnimate);
    if (time >= duration) {
      selector.scrollTo(0, top);
      cancelAnimationFrame(timer);
    }
  }
  window.requestAnimationFrame(scrollAnimate)
}

export { ScrollTo }
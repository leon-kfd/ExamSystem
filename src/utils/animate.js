/**
* 滚动到指定位置
* @param {number} top 滚到到指定位置的高度
* @param {number} duration 滚动时长
*/
function ScrollTo (top, duration) {
  const pageY = window.pageYOffset
  const endPostion = pageY + top
  const startTime = new Date()
  let timer
  function scrollAnimate () {
    const time = new Date() - startTime
    window.scrollTo(0, pageY + top * (time / duration))
    timer = requestAnimationFrame(scrollAnimate);
    if (time >= duration) {
      window.scrollTo(0, endPostion);
      cancelAnimationFrame(timer);
    }
  }
  window.requestAnimationFrame(scrollAnimate)
}

export { ScrollTo }
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
div,
ul,
li,
ol,
dl,
dd,
dt,
nav,
main,
title,
aside,
footer {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #f5f5f6;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
/* 滚动条样式 */
*::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  background-color: #dddde2;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #667;
  background-image: -webkit-linear-gradient(
    45deg,
    transparent 10%,
    rgba(255, 255, 255, 0.3) 10%,
    rgba(255, 255, 255, 0.3) 20%,
    transparent 20%,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.3) 40%,
    transparent 40%,
    transparent 50%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.3) 60%,
    transparent 60%,
    transparent 70%,
    rgba(255, 255, 255, 0.3) 70%,
    rgba(255, 255, 255, 0.3) 80%,
    transparent 80%,
    transparent 90%,
    rgba(255, 255, 255, 0.3) 90%,
    rgba(255, 255, 255, 0.3)
  );
}
ul,
li {
  list-style: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear {
  zoom: 1;
}
.clear::after {
  content: "";
  clear: both;
  visibility: hidden;
  height: 0;
}
</style>

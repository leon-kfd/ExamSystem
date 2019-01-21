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

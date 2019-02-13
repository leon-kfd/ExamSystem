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
  display: table;
  height: 0;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 滚动条样式 */
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
*::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
*::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
}
/*正常情况下滑块的样式*/
*::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/
*:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在滑块上时滑块的样式*/
*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*正常时候的主干部分*/
*::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}
/*鼠标悬浮在滚动条上的主干部分*/
*::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.01);
}
.fadeInUp-enter-active {
  animation: fadeInUp 0.5s;
}
.fadeInUp-leave-active {
  animation: fadeInUp 0.5s reverse;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
.page {
  background: #fff;
  padding: 20px;
  border: 1px solid #dde;
  box-sizing: border-box;
}
</style>

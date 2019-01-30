<template>
  <div class="page"
       id="StudentHome">
    <nav class="nav"></nav>
    <div class="container">
      <div class="page-body">
        <div class="left-box">
          <div class="user-info">
            <div class="portrait-box">
              <img src="@/assets/img/user.jpg">
            </div>
            <div class="text-box">
              <p class="student-name">Student Name</p>
              <p class="student-number">2015034843000</p>
              <p class="student-classname">15信息管理与信息系统</p>
              <p class="btn-viewmore-box">
                <button class="btn btn-viewmore btn-animate1">查看更多 <i class="el-icon-d-arrow-right"></i></button>
              </p>
            </div>
          </div>
          <div class="notice-box">
            <p class="title"><span>公告消息</span></p>
          </div>
        </div>
        <div class="right-box">
          <div class="exam-list-box">
            <div class="exam-tab-select">
              <ul class="tab-list clear">
                <li :class="{active: tabActive==1}"
                    class="fl"
                    @click="tabActive=1">我的考试</li>
                <li :class="{active: tabActive==2}"
                    class="fl"
                    @click="tabActive=2">已完成</li>
                <span class="line"
                      :style="{left: `${10+(tabActive-1)*90}px`}"></span>
              </ul>
            </div>
          </div>
          <div class="exam-public-box">
            <div class="public-list">Public List</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StudentHome',
  data () {
    return {
      tabActive: 1
    }
  }
}
</script>
<style lang="scss" scoped>
header,
nav,
main,
aside,
footer {
  padding: 8px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 3px #aab;
  margin-bottom: 10px;
  min-height: 20px;
}
nav.nav {
  width: 100%;
  background: #fff;
  height: 50px;
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.container {
  width: 1160px;
  margin: 0 auto;
  padding: 10px;
}
.page-body {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px #ccc;
  height: 600px;
  margin-top: 60px;
  padding: 15px 10px;
  display: flex;
  .left-box {
    width: 300px;
    height: 100%;
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid #ddd;
  }
  .right-box {
    width: 100%;
    flex: 1;
  }
}
.user-info {
  min-height: 280px;
  padding: 10px;
  margin-bottom: 10px;
}
.notice-box {
  padding: 10px;
  p.title {
    color: #262626;
    text-align: center;
    position: relative;
    span {
      position: absolute;
      display: inline-block;
      height: 26px;
      line-height: 26px;
      background: #fff;
      width: 100px;
      left: 50%;
      transform: translateX(-50px);
      z-index: 999;
    }
    &:after {
      position: absolute;
      content: "";
      width: 100%;
      border-top: 1px solid #ddd;
      left: 0;
      top: 13px;
    }
  }
}
.exam-list-box {
  min-height: 500px;
  .exam-tab-select {
    ul.tab-list {
      width: 100%;
      border-bottom: 1px solid #eee;
      position: relative;
      li {
        height: 36px;
        line-height: 36px;
        width: 90px;
        text-align: center;
        color: #363640;
        cursor: pointer;
        box-sizing: border-box;
        &.active {
          color: #409eff;
        }
        &:hover {
          color: #409eff;
        }
      }
      .line {
        position: absolute;
        bottom: -2px;
        width: 70px;
        height: 2px;
        background: #409eff;
        border-radius: 1px;
        transition: all 0.4s;
      }
    }
  }
}
.user-info {
  .portrait-box {
    width: 160px;
    height: 160px;
    text-align: center;
    line-height: 160px;
    border-radius: 50%;
    border: 2px solid #c2a045;
    overflow: hidden;
    margin: 10px auto;
    img {
      width: 144px;
      height: auto;
    }
  }
  .text-box {
    text-align: center;
    .student-name {
      font-size: 16px;
      color: #363640;
      font-weight: bold;
      margin: 10px 0;
    }
    .student-number {
      font-size: 13px;
      color: #889;
      margin: 10px 0;
    }
    .student-classname {
      font-size: 14px;
      color: #665;
      margin: 10px 0;
    }
    .btn-viewmore-box {
      margin-top: 20px;
      margin-bottom: 10px;
      button {
        i {
          display: none;
          margin-left: 5px;
        }
        &:hover {
          i {
            display: inline;
          }
        }
      }
    }
  }
}
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  // padding: 10px 14px;
  text-align: center;
  width: 120px;
  padding: 10px 0;
  font-size: 14px;
  border-radius: 4px;
}
$btnColor: #409eff;
$duration: 0.1s;
$duration-2X: 0.2s;
$duration-3X: 0.3s;
$duration-4X: 0.4s;
$borderRadius: 4px;
.btn-animate1 {
  position: relative;
  &:hover {
    color: $btnColor;
    animation: pulse ease-out 1s $duration-4X;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-radius: $borderRadius;
    visibility: hidden;
  }
  &::before {
    top: -1px;
    left: 0;
    border-top: 1px solid $btnColor;
    border-right: 1px solid $btnColor;
    transition: height linear $duration $duration-2X,
      width linear $duration $duration-3X, visibility 0s $duration-4X;
  }
  &::after {
    bottom: -1px;
    right: 0;
    border-bottom: 1px solid $btnColor;
    border-left: 1px solid $btnColor;
    transition: height linear $duration, width linear $duration $duration,
      visibility 0s $duration-2X;
  }
  &:hover {
    &::before,
    &::after {
      width: 100%;
      height: 100%;
      visibility: visible;
    }
    &::before {
      transition: visibility 0s, width linear $duration,
        height linear $duration $duration;
    }
    &::after {
      transition: visibility 0s $duration-2X,
        width linear $duration $duration-2X,
        height linear $duration $duration-3X;
    }
  }
}
@keyframes pulse {
  from {
    box-shadow: 0 0 rgba(64, 158, 255, 0.1);
  }

  to {
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
  }
}
</style>

<template>
  <div class="student-frame">
    <nav class="nav">
      <div class="container">
        <router-link to="StudentHome">
          <img src="@/assets/img/logo.svg"
               class="logo">
        </router-link>
        <div class="user-info-box fr">
          <el-dropdown>
            <div>
              <img class="user-img"
                   src="http://placem.at/people?w=64&h=64">
              <span class="username">Username</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="toLogout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </nav>
    <div class="student-main">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data () {
    return {

    }
  },
  methods: {
    toLogout () {
      sessionStorage.removeItem('token')
      this.$message.success('成功注销..')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
nav {
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
  z-index: 1005;
  padding: 0;
  .logo {
    height: 50px;
    width: auto;
  }
  .user-info-box {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    cursor: pointer;
    img {
      width: 36px;
      height: 36px;
      box-sizing: border-box;
      border: 2px solid #f0a044;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
    }
    .username {
      font-size: 14px;
      color: #778;
      font-weight: bold;
      margin-left: 3px;
    }
  }
}
.container {
  width: 1160px;
  margin: 0 auto;
  padding: 0 10px;
}
@media screen and (min-width: 820px) and (max-width: 1180px) {
  .container {
    width: 820px;
  }
}
@media screen and (max-width: 830px) {
  .container {
    width: 100%;
  }
}
</style>

<template>
  <div class="student-frame">
    <nav class="nav">
      <keep-alive>
        <div class="container">
          <router-link to="StudentHome">
            <img src="@/assets/img/logo.svg"
                 class="logo">
          </router-link>
          <div class="user-info-box fr">
            <el-dropdown>
              <div>
                <img class="user-img"
                     :src="studentInfo.portrait">
                <span class="username">{{studentInfo.username}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push({name: 'StudentPersonal'})">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="toLogout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </keep-alive>
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
      studentInfo: {
        username: '',
        number: '',
        classname: '',
        portrait: ''
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    toLogout () {
      sessionStorage.removeItem('token')
      this.$message.success('成功注销..')
      this.$router.push('/')
    },
    getUserInfo () {
      if (this.$store.state.studentInfo.username && !this.$store.state.studentRefresh) {
        this.studentInfo = this.$store.state.studentInfo
      } else {
        this.$api('getStudentInfo').then(data => {
          this.studentInfo = {
            username: data.student_name || data.student_account,
            number: data.student_num || '-未设置学号-',
            classname: data.class_fullname || data.class_name || '-未设置班级-',
            portrait: data.portrait_address ? REQUEST_URL + data.portrait_address : '../../static/img/user.jpg'
          }
          this.$store.commit('updateStudentInfo', this.studentInfo)
          this.$store.commit('updateStudentRefresh', false)
        })
      }
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
      object-fit: cover;
    }
    .username {
      font-size: 14px;
      color: #778;
      font-weight: bold;
      margin-left: 3px;
      text-transform: capitalize;
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

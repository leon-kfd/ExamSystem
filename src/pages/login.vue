<template>
  <div id="Login">
    <div class="main"
         :class="active?'login-active':'register-active'">
      <div class="left-box">
        <!-- <transition name="fadeInUp"> -->
        <div class="register-box"
             v-if="!active">
          <h2 class="title"><span>Register</span></h2>
          <div class="form-box"
               id="registerForm"
               style="padding-top: 20px;">
            <!-- <p style="height: 200px;line-height: 200px;color: #889;text-align:center;font-size: 14px;">Function Not Open..</p> -->
            <el-form label-width="80px"
                     label-position="top"
                     :model="registerForm.fields"
                     ref="registerForm"
                     :rules="registerForm.rules">
              <el-form-item label="用户名"
                            prop="account">
                <el-input v-model="registerForm.fields.account"
                          size="small"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            prop="password">
                <el-input v-model="registerForm.fields.password"
                          type="password"
                          size="small"></el-input>
              </el-form-item>
              <el-form-item label="Email"
                            prop="email">
                <el-input v-model="registerForm.fields.email"
                          size="small"></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 25px;">
                <el-button size="small"
                           plain
                           :loading="btnRegisterLoading"
                           @click="toRegister">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- </transition> -->
        <div class="to-register"
             v-show="active">
          <el-button plain
                     class="btn-transparent"
                     @click="active=false">To register</el-button>
        </div>
      </div>
      <div class="right-box">
        <!-- <transition name="fadeInUp"> -->
        <div class="login-box"
             v-if="active">
          <h2 class="title"><span>Login</span></h2>
          <div class="form-box">
            <div class="row-item">
              <div class="input-box">
                <input type="text"
                       class="input-ui"
                       v-model="LoginForm.username"
                       autocomplete="off"
                       name="username">
                <label for="username"
                       :class="{active: LoginForm.username.length>0}">账号</label>
                <span class="line"></span>
              </div>
            </div>
            <div class="row-item">
              <div class="input-box">
                <input type="password"
                       class="input-ui"
                       v-model="LoginForm.password"
                       @keyup.enter="toLogin"
                       name="password">
                <label for="password"
                       :class="{active: LoginForm.password.length>0}">密码</label>
                <span class="line"></span>
              </div>
            </div>
            <div class="row-item submit-btn-control">
              <el-radio-group v-model="LoginForm.role">
                <el-radio-button :label="1">学生</el-radio-button>
                <el-radio-button :label="2">教师</el-radio-button>
              </el-radio-group>
              <el-button type="primary"
                         :disabled="loginValid"
                         @click="toLogin"
                         :loading="btnLoginLoading"
                         class="btn-login">登录</el-button>
            </div>
            <div class="row-item"
                 style="margin-top: -20px;">
              <p class="login-footer clear">
                <!-- <span class="text1 fl"
                      @click="active=false">注册</span> -->
                <!-- <span class="text2 fr">忘记密码?</span> -->
              </p>
            </div>
          </div>
        </div>
        <!-- </transition> -->
        <div class="to-login"
             v-show="!active">
          <el-button plain
                     class="btn-transparent"
                     @click="active=true">To Login</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      active: true,
      LoginForm: {
        username: '',
        password: '',
        role: 1
      },
      registerForm: {
        fields: {
          account: '',
          password: '',
          email: '',
          role: 1
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          email: [
            { type: 'email', required: true, message: '请输入正确邮箱', trigger: 'blur' }
          ]
        }
      },
      btnLoginLoading: false,
      btnRegisterLoading: false
    }
  },
  computed: {
    loginValid () {
      return !(this.LoginForm.username.length > 0 && this.LoginForm.password.length > 0 && this.LoginForm.role)
    }
  },
  mounted () {
    sessionStorage.removeItem('token')
    this.$store.commit('updateStudentRefresh', true)
  },
  methods: {
    async toLogin () {
      if (!this.loginValid) {
        this.btnLoginLoading = true
        let { username: account, password, role } = this.LoginForm
        await this.$api('login', {
          account, password, role
        }).then(data => {
          sessionStorage.setItem('token', data.token)
          this.$message.success('登录成功...')
          if (data.role == 1) {
            this.$router.push('student')
          } else if (data.role == 2) {
            this.$router.push('admin')
          }
        }).finally(_ => {
          this.btnLoginLoading = false
        })
      }
    },
    toRegister () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.btnRegisterLoading = true
          let { account, password, email, role } = this.registerForm.fields
          this.$api('register', {
            account, password, email, role
          }).then(data => {
            console.log(data)
            this.$message.success('注册成功...')
            this.active = true
          }).finally(_ => {
            this.btnRegisterLoading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$theme-color: #573896;
.main {
  width: 90vw;
  max-width: 700px;
  height: 80vh;
  max-height: 500px;
  background: #fff;
  box-shadow: 0 1px 10px #aaa;
  margin: 10vh auto;
  border-radius: 4px;
  display: flex;
  .left-box {
    border-radius: 4px 0 0 4px;
    transition: all 0.4s;
    position: relative;
    .to-register {
      position: absolute;
      width: 100%;
      height: 60px;
      bottom: 40px;
      text-align: center;
    }
  }
  .right-box {
    border-radius: 0 4px 4px 0;
    transition: all 0.4s;
    position: relative;
    .to-login {
      position: absolute;
      width: 100%;
      height: 60px;
      bottom: 40px;
      text-align: center;
    }
  }
  &.login-active {
    .left-box {
      width: 40%;
      // background: #a0a0b0;
      background: url("../assets/img/img02.jpg") center center;
      background-size: cover;
    }
    .right-box {
      width: 60%;
      background: #fff;
    }
  }
  &.register-active {
    .left-box {
      width: 60%;
      background: #fff;
    }
    .right-box {
      width: 40%;
      // background: #a0a0b0;
      background: url("../assets/img/img03.jpg") center center;
      background-size: cover;
    }
  }
}
.login-box,
.register-box {
  padding: 20px;
  h2.title {
    padding-top: 20px;
    padding-left: 15px;
    span {
      padding-left: 10px;
      border-left: 4px solid $theme-color;
    }
  }
  .submit-btn-control {
    display: flex;
    margin-top: 50px;
    height: 40px;
    overflow: hidden;
  }
  .btn-login {
    margin-left: 20px;
    width: 100%;
    flex: 1;
  }
  .login-footer {
    span.text1 {
      color: #4069c0;
      font-size: 14px;
      cursor: pointer;
    }
    span.text2 {
      color: #8c3232;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
.btn-transparent {
  background: transparent;
  color: #fff;
  font-weight: bold;
  &:hover {
    border: 1px solid #fff;
  }
}
.form-box {
  padding: 10px;
  padding-top: 60px;
  .row-item {
    margin-bottom: 40px;
    .input-box {
      position: relative;
      label {
        position: absolute;
        top: 0;
        left: 0;
        height: 40px;
        line-height: 40px;
        padding-left: 5px;
        color: #888894;
        pointer-events: none;
        font-size: 14px;
        transition: all 0.4s;
        &.active {
          font-size: 14px;
          color: #262626;
          transform: translate(-5px, -30px);
          transition: all 0.4s;
        }
      }
      .input-ui {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0;
        padding-left: 5px;
        background: transparent;
        color: #363636;
        outline: none;
        border: none;
        border-bottom: 1px solid #ddd;
        border-radius: 0;
        font-size: 16px;
        &:focus ~ label {
          font-size: 14px;
          color: #262626;
          transform: translate(-5px, -30px);
          transition: all 0.4s;
        }
        &:focus ~ .line {
          width: 100%;
          transition: all 0.4s;
        }
      }
      .line {
        position: absolute;
        width: 0;
        left: 0;
        bottom: 0;
        border-top: 2px solid $theme-color;
        transition: all 0.4s;
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .main {
    &.login-active {
      .left-box {
        display: none;
      }
      .right-box {
        width: 100%;
        border-radius: 4px;
      }
    }
    &.register-active {
      .left-box {
        width: 100%;
        border-radius: 4px;
      }
      .right-box {
        display: none;
      }
    }
  }
}
</style>
<style>
#Login .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #573896;
  border-color: #573896;
  box-shadow: -1px 0 0 0 #573896;
  color: #fff;
  padding: 12px 14px;
}
#Login .el-radio-button__inner {
  padding: 12px 10px;
}
#Login .el-button--primary {
  background-color: #573896;
  border-color: #573896;
}
#Login .el-button--primary.is-disabled {
  background-color: #655c72;
  border-color: #655c72;
}
#Login .el-radio-button__inner:hover {
  color: #573896;
}
#registerForm .el-form-item__label {
  line-height: 28px;
  padding: 0;
}
</style>

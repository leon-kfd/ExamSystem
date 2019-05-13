<template>
  <div id="StudentPersonal">
    <div class="page-body">
      <div class="nav-title">
        <i class="el-icon-download"
           @click="$router.push({name: 'StudentHome'})"></i>
        <p class="title">个人中心</p>
      </div>
      <main class="detail-body"
            v-loading="loading">
        <div class="student-info">
          <el-form ref="form"
                   :model="form"
                   label-width="100px">
            <div class="form-header">
              <div class="left-block">
                <el-form-item label="姓名">
                  <el-input v-model="form.name"
                            disabled
                            placeholder="请输入姓名"
                            size="small"></el-input>
                </el-form-item>
                <el-form-item label="学号">
                  <el-input v-model="form.number"
                            disabled
                            placeholder="请输入学号"
                            size="small"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                  <el-select v-model="form.classroom"
                             style="width: 100%;"
                             size="small"
                             filterable
                             remote
                             :remote-method="remoteMethod"
                             :loading="classSearchloading"
                             placeholder="请选择班级">
                    <el-option v-for="(item,index) in classList"
                               :key="index"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="right-block">
                <el-upload class="avatar-uploader"
                           :data="uploadData"
                           name="portirat"
                           :action="uploadAddress"
                           :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                  <img class="avatar"
                       v-if="imgUrl"
                       :src="imgUrl">
                  <i v-else
                     class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.tel"
                        placeholder="请输入手机号"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.number"
                        placeholder="请输入邮箱"
                        size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 120px"
                         @click="saveStudentInfo"
                         :loading="btnSaveLoading">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StudentPersonal',
  data () {
    return {
      loading: false,
      classSearchloading: false,
      classList: [],
      form: {
        name: '',
        number: '',
        classId: '',
        classroom: '',
        sex: '',
        tel: '',
        email: '',
        portraitAddress: ''
      },
      btnSaveLoading: false,
      imgUrl: '',
      uploadAddress: REQUEST_URL + '/api/uploadAvatar',
      uploadData: {
        token: sessionStorage.getItem('token')
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.form.portraitAddress = res
      this.imgUrl = REQUEST_URL + res
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async getData () {
      this.loading = true
      await this.$api('getStudentInfo').then(data => {
        console.log(data)
        this.form.name = data.student_name
        this.form.number = data.student_num
        this.form.classroom = data.class_name
        this.form.classId = data.class_id
        this.form.sex = data.sex
        this.form.tel = data.student_tel
        this.form.portraitAddress = data.portrait_address
        this.imgUrl = REQUEST_URL + this.form.portraitAddress
      }).finally(_ => {
        this.loading = false
      })
    },
    async remoteMethod (query) {
      if (query !== '') {
        this.classSearchloading = true
        await this.$api('getClassroomByQueryStr', {
          queryStr: query
        }).then(data => {
          this.classList = data
        }).finally(_ => {
          this.classSearchloading = false
        })
      } else {
        this.classList = []
      }
    },
    async saveStudentInfo () {
      this.btnSaveLoading = true
      await this.$api('updateStudentInfo', {
        name: this.form.name,
        number: this.form.number,
        tel: this.form.tel,
        sex: this.form.sex,
        classId: typeof this.form.classroom == 'string' ? this.form.classId : this.form.classroom,
        portraitAddress: this.form.portraitAddress
      }).then(data => {
        this.$message.success('保存成功,若修改了头像请刷新浏览器..')
        this.getData()
      }).finally(_ => {
        this.btnSaveLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-body {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px #ccc;
  margin-top: 70px;
  padding: 15px 10px;
  margin-bottom: 20px;
  min-height: 500px;
}
.nav-title {
  width: 100%;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 38px;
  i {
    position: absolute;
    font-size: 24px;
    display: block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    transform: rotate(90deg);
    left: 5px;
    top: -1px;
    color: #409eff;
    cursor: pointer;
    transition: left 0.2s;
    &:hover {
      left: 0;
    }
  }
  .title {
    height: 36px;
    line-height: 36px;
    color: #409eff;
  }
}
.detail-body {
  padding: 5px;
  min-height: 300px;
  .student-info {
    margin: 20px auto;
    max-width: 500px;
  }
}
.form-header {
  display: flex;
  .left-block {
    width: 100%;
    flex: 1;
  }
  .right-block {
    width: 160px;
    height: 160px;
    margin-left: 20px;
    transform: translateY(5px);
    .avatar-uploader {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      width: 100%;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 160px;
      height: 160px;
      line-height: 160px;
      text-align: center;
    }
    .avatar {
      width: 160px;
      height: 160px;
      display: block;
      object-fit: cover;
    }
  }
}
</style>

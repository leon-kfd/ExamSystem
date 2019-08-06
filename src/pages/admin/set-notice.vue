<template>
  <div id="SetNotice"
       class="page">
    <div class="h-operation clear">
      <el-button type="success"
                 icon="el-icon-edit"
                 size="small"
                 @click="addNotice">发布公告</el-button>
      <el-button type="primary"
                 size="small"
                 class="fr"
                 icon="el-icon-refresh"
                 :loading="loading"
                 @click="getData">刷新</el-button>
    </div>
    <div class="notice-table">
      <div class="table-main">
        <el-table :data="tableData"
                  v-loading="loading"
                  border
                  stripe
                  style="width: 100%">
          <el-table-column prop="noticeTitle"
                           label="公告标题"
                           align="center"
                           min-width="150">
          </el-table-column>
          <el-table-column prop="showClass"
                           label="展示班级"
                           align="center">
          </el-table-column>
          <el-table-column prop="publishTime"
                           label="发布时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="showTime"
                           label="展示开始时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="publishTime"
                           label="展示结束时间"
                           align="center">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           align="center"
                           width="200">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)"
                         type="text"
                         size="small">重新编辑</el-button>
              <el-button type="text"
                         @click="del(scope.row)"
                         size="small"
                         style="color: #b33">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="page"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="addDialog"
               title="发布公告"
               top="5vh"
               width="650px">
      <div class="add-notice-box">
        <el-form ref="addForm"
                 :rules="addForm.rules"
                 :model="addForm.fields"
                 label-width="100px">
          <el-form-item label="公告标题"
                        prop="title">
            <el-input v-model="addForm.fields.title"
                      style="width: 420px"
                      placeholder="请输入公告标题"
                      size="small"></el-input>
          </el-form-item>
          <el-form-item label="展示班级"
                        prop="class">
            <el-select v-model="addForm.fields.class"
                       multiple
                       placeholder="请选择"
                       size="small"
                       style="width: 420px">
              <el-option v-for="item in classList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展示时间"
                        prop="date">
            <el-date-picker v-model="addForm.fields.date"
                            size="small"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerBeginDateAfter"
                            style="width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="公告内容"
                        prop="content">
            <quill-editor v-model="addForm.fields.content"
                          ref="myQuillEditor"
                          id="myQuillEditor"
                          style="width: 420px"
                          :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="publishNotice"
                       :loading="btnAddNoticeLoading"
                       size="small">发布</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="editDialog"
               title="编辑公告"
               top="5vh"
               width="650px">
      <div class="edit-notice-box"
           v-loading="noticeDetailLoading">
        <el-form ref="editForm"
                 :rules="editForm.rules"
                 :model="editForm.fields"
                 label-width="100px">
          <el-form-item label="公告标题"
                        prop="title">
            <el-input v-model="editForm.fields.title"
                      style="width: 420px"
                      placeholder="请输入公告标题"
                      size="small"></el-input>
          </el-form-item>
          <el-form-item label="展示班级"
                        prop="class">
            <el-select v-model="editForm.fields.class"
                       multiple
                       placeholder="请选择"
                       size="small"
                       style="width: 420px">
              <el-option v-for="item in classList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展示时间"
                        prop="date">
            <el-date-picker v-model="editForm.fields.date"
                            size="small"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerBeginDateAfter"
                            style="width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="公告内容"
                        prop="content">
            <quill-editor v-model="editForm.fields.content"
                          ref="myQuillEditor"
                          id="myQuillEditor"
                          style="width: 420px"
                          :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="editNotice"
                       :loading="btnEditNoticeLoading"
                       size="small">修改发布</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'SetNotice',
  components: {
    quillEditor
  },
  data () {
    return {
      loading: false,
      classroomLoading: false,
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      classList: [],
      addDialog: false,
      addForm: {
        fields: {
          title: '',
          class: '',
          date: '',
          content: '',
          showTime: '',
          endTime: ''
        },
        rules: {
          title: [{ required: true, message: '请输入公告标题' }],
          date: [{ required: true, message: '请选择展示时间' }],
          class: [{ required: true, message: '请选择班级' }],
          content: [{ required: true, message: '请输入公告内容' }]
        }
      },
      editDialog: false,
      editForm: {
        fields: {
          title: '',
          class: '',
          date: '',
          content: '',
          showTime: '',
          endTime: ''
        },
        rules: {
          title: [{ required: true, message: '请输入公告标题' }],
          date: [{ required: true, message: '请选择展示时间' }],
          class: [{ required: true, message: '请选择班级' }],
          content: [{ required: true, message: '请输入公告内容' }]
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let now = new Date()
          return time.getTime() < (now.getTime() - 24 * 60 * 60 * 1000)
        }
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image']
          ]
        }
      },
      currentDetailId: 0,
      btnAddNoticeLoading: false,
      btnEditNoticeLoading: false,
      noticeDetailLoading: false
    }
  },
  watch: {
    'addForm.fields.date' (val) {
      this.addForm.fields.showTime = val ? val[0] : ''
      this.addForm.fields.endTime = val ? val[1] : ''
    },
    'editForm.fields.date' (val) {
      this.editForm.fields.showTime = val ? val[0] : ''
      this.editForm.fields.endTime = val ? val[1] : ''
    }
  },
  mounted () {
    this.getClassList()
    this.getData()
  },
  methods: {
    handleSizeChange (val) {
      this.page = 1
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getData()
    },
    edit (row) {
      this.init()
      this.editDialog = true
      this.currentDetailId = row.id
      this.getNoticeDetail()
    },
    del (row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            (async () => {
              instance.confirmButtonLoading = true
              await this.$api('deleteNotice', {
                noticeId: row.id
              }).then(data => {
                this.$message.success('删除成功')
                this.getData()
              }).finally(_ => {
                instance.confirmButtonLoading = false
                done()
              })
            })()
          } else {
            done()
          }
        }
      })
    },
    addNotice () {
      this.addDialog = true
    },
    async publishNotice () {
      this.$refs['addForm'].validate(async (valid) => {
        if (valid) {
          this.btnAddNoticeLoading = true
          await this.$api('publishOrEditNotice', {
            noticeTitle: this.addForm.fields.title,
            showClassroom: this.addForm.fields.class,
            showTime: this.addForm.fields.showTime,
            endTime: this.addForm.fields.endTime,
            noticeContent: this.addForm.fields.content
          }).then(data => {
            this.$message.success('公告发布成功')
            this.init()
            this.addDialog = false
            this.getData()
          }).finally(_ => {
            this.btnAddNoticeLoading = false
          })
        }
      })
    },
    async editNotice () {
      this.$refs['editForm'].validate(async (valid) => {
        if (valid) {
          this.btnEditNoticeLoading = true
          await this.$api('publishOrEditNotice', {
            noticeId: this.currentDetailId,
            noticeTitle: this.editForm.fields.title,
            showClassroom: this.editForm.fields.class,
            showTime: this.editForm.fields.showTime,
            endTime: this.editForm.fields.endTime,
            noticeContent: this.editForm.fields.content
          }).then(data => {
            this.$message.success('公告修改成功')
            this.init()
            this.editDialog = false
            this.getData()
          }).finally(_ => {
            this.btnEditNoticeLoading = false
          })
        }
      })
    },
    init () {
      this.addForm.fields = {
        title: '',
        class: '',
        date: '',
        content: '',
        showTime: '',
        endTime: ''
      }
      this.editForm.fields = {
        title: '',
        class: '',
        date: '',
        content: '',
        showTime: '',
        endTime: ''
      }
      this.currentDetailId = 0
    },
    async getClassList () {
      this.classroomLoading = true
      await this.$api('getTeacherClassroom').then(data => {
        this.classList = data
      }).finally(_ => {
        this.classroomLoading = false
      })
    },
    async getNoticeDetail () {
      this.noticeDetailLoading = true
      await this.$api('getNoticeDetailFromTeacher', {
        id: this.currentDetailId
      }).then(data => {
        this.editForm.fields.title = data.notice_title
        this.editForm.fields.class = data.show_classroom.split(',').map(item => +item)
        this.editForm.fields.date = [data.show_time, data.end_time]
        this.editForm.fields.content = data.notice_content
      }).finally(_ => {
        this.noticeDetailLoading = false
      })
    },
    async getData () {
      this.loading = true
      await this.$api('getNoticeListFromTeacher', {
        page: this.page,
        pageSize: this.pageSize
      }).then(data => {
        this.tableData = data.items
        this.page = data.page
        this.total = data.total
      }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style>
#myQuillEditor .ql-editor {
  min-height: 200px;
}
</style>

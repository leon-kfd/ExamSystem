<template>
  <div id="NoticeList">
    <div class="page-body">
      <div class="nav-title">
        <i class="el-icon-download"
           @click="$router.push({name: 'StudentHome'})"></i>
        <p class="title">公告列表</p>
      </div>
      <main class="list-body">
        <div class="notice-list"
             v-loading="noticeListLoading">
          <div class="notice-listitem"
               v-for="(item,index) in noticeList"
               :key="index"
               @click="showNoticeDetail(item.id)">
            <p class="notice-title ellipsis">{{item.title}}</p>
            <p class="notice-bottom clear">
              <span class="notice-publisher fl">{{item.publisher || '未知'}}</span>
              <span class="notice-date fr">{{item.showTime.split(" ")[0]}}</span>
            </p>
          </div>
        </div>
        <div class="pagination"
             style="text-align:center">
          <el-pagination @current-change="handleCurrentChange"
                         :current-page="page"
                         :page-size="pageSize"
                         layout="prev, pager, next"
                         :total="total">
          </el-pagination>
        </div>
      </main>
      <el-dialog :visible.sync="noticeDialog"
                 title="公告详情">
        <div class="notice-detail-box"
             v-loading="noticeDetailLoading">
          <h2 class="title">{{noticeDetail.title}}</h2>
          <p class="text1"><span class="show-time">{{noticeDetail.showTime}}</span><span class="publisher">{{noticeDetail.publisher}}</span></p>
          <div class="ql-snow">
            <div class="content ql-editor"
                 v-html="noticeDetail.content"></div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoticeList',
  data () {
    return {
      noticeListLoading: false,
      page: 1,
      pageSize: 10,
      total: 0,
      noticeList: [],
      noticeDialog: false,
      noticeDetail: {
        title: '',
        publisher: '',
        showTime: '',
        content: ''
      },
      noticeDetailLoading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.getData()
    },
    showNoticeDetail (id) {
      this.noticeDialog = true
      this.noticeDetail = {
        title: '',
        publisher: '',
        showTime: '',
        content: ''
      }
      this.getNoticeDetail(id)
    },
    async getData () {
      this.noticeListLoading = true
      await this.$api('getStudentAllNoticeList', {
        page: this.page,
        pageSize: this.pageSize
      }).then(data => {
        this.noticeList = data.items
        this.total = data.total
      }).finally(_ => {
        this.noticeListLoading = false
      })
    },
    async getNoticeDetail (id) {
      this.noticeDetailLoading = true
      await this.$api('getNoticeDetailFromStudent', {
        id
      }).then(data => {
        console.log(data)
        this.noticeDetail.title = data.notice_title
        this.noticeDetail.publisher = data.teacher_name,
          this.noticeDetail.showTime = data.show_time
        this.noticeDetail.content = data.notice_content
      }).finally(_ => {
        this.noticeDetailLoading = false
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
.list-body {
  padding: 5px;
  .notice-list {
    padding: 10px 0;
    min-height: 300px;
    .notice-listitem {
      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
      padding: 0 20px;
      cursor: pointer;
      &:hover {
        background: #f5f5f6;
        .notice-title {
          text-decoration: underline;
        }
      }
      .notice-title {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        font-weight: bold;
        color: #363640;
      }
      .notice-bottom {
        padding-bottom: 12px;
        .notice-publisher,
        .notice-date {
          font-size: 13px;
          color: #889;
        }
      }
    }
  }
}
.notice-detail-box {
  padding: 10px;
  .title {
    margin: -20px 0 10px;
  }
  .text1 {
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    margin-bottom: 8px;
    .show-time {
      color: #667;
    }
    .publisher {
      margin-left: 20px;
      color: #667;
      font-weight: bold;
    }
  }
  .content {
    min-height: 200px;
  }
}
</style>

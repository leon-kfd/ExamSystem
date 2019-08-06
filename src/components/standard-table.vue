<template>
  <div class="standard-table">
    <el-table :data="conf.data"
              v-bind="$attrs"
              v-on="$listeners"
              v-loading="loading"
              :border="typeof $attrs.border != 'undefined' ? $attrs.border : true">
      <template v-for="(item,index) in conf.row">
        <el-table-column v-if="['selection', 'index'].includes(item.type)"
                         :key="index"
                         :align="item.align || 'center'"
                         v-bind="{...item}"></el-table-column>
        <el-table-column v-if="!['selection', 'index'].includes(item.type) && !item.slot"
                         :key="index"
                         :align="item.align || 'center'"
                         :type="item.type"
                         v-bind="{...item}">
          <template #default="scope">
            <span :style="item.style ? item.style(scope.row) : ''">{{item.formatter ? item.formatter(scope.row) : scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="!['selection', 'index'].includes(item.type) && item.slot"
                         :key="index"
                         :align="item.align || 'center'"
                         :slot="null"
                         v-bind="{...item}">
          <template #default="scope">
            <slot :name="item.slot"
                  :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
      <el-table-column v-if="conf.operation"
                       :label="conf.operation.label || '操作'"
                       :align="conf.operation.align || 'center'"
                       :fixed="conf.operation.fixed || 'right'">
        <template slot-scope="scope">
          <el-button v-for="(item,index) in conf.operation.btns"
                     :key="index"
                     :type="item.type || 'text'"
                     :size="item.size || 'small'"
                     @click="item.fn && item.fn(scope.row)">{{item.label}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box"
         v-if="conf.pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="currentPageSize"
                     :page-sizes="conf.pagination && conf.pagination.pageSizes || [10, 20, 30, 50]"
                     :layout="conf.pagination && conf.pagination.layout || 'total, sizes, prev, pager, next, jumper'"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
export default {
  name: 'StandardTable',
  props: {
    conf: Object
  },
  data () {
    return {
      loading: false,
      currentPage: 1,
      currentPageSize: 20,
      total: 0,
      isStaticPagination: false,
      staticData: []
    }
  },
  mounted () {
    this.isStaticPagination = this.conf.pagination && this.conf.pagination.static || false
    this.currentPageSize = this.conf.pagination && this.conf.pagination.pageSize || 20
  },
  methods: {
    handleSizeChange (val) {
      this.currentPageSize = val
      this.currentPage = 1
      if (this.isStaticPagination) {
        this.staticPagination()
      } else {
        this.fetch()
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.isStaticPagination) {
        this.staticPagination()
      } else {
        this.fetch()
      }
    },
    staticPagination () {
      this.conf.data = this.staticData.slice(((this.currentPage - 1) * this.currentPageSize), this.currentPage * this.currentPageSize)
    },
    getMap (result, mapRule) {
      let mapItems = mapRule.split('.') || []
      mapItems.map(item => {
        if (result) {
          result = result[item]
        } else {
          this.$message.error(`返回${mapRule}映射失败,请检查Map配置与后端返回数据是否配置正确..`)
          throw new Error('规则映射出错')
        }
      })
      return result
    },
    fetch () {
      return new Promise((resolve, reject) => {
        this.loading = true
        let axiosDefaultConfig = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        let config = Object.assign(axiosDefaultConfig, this.conf.axiosConfig)
        let params = this.conf.params
        if (this.conf.pagination && !this.isStaticPagination) {
          let page = this.conf.pagination.requestMap.page || 'page'
          let pageSize = this.conf.pagination.requestMap.pageSize || 'pageSize'
          params[page] = this.currentPage
          params[pageSize] = this.currentPageSize
        }
        let instance
        if (this.$api) {
          instance = this.$api(this.conf.url, {
            ...this.conf.params
          })
        } else {
          instance = axios({
            ...config,
            method: this.conf.axiosConfig && this.conf.axiosConfig.method || 'post',
            url: this.conf.url,
            data: this.conf.params
          })
        }
        instance.then(data => {
          console.log('resultItems', data)
          let resultItems = this.getMap(data, this.conf.resultMap || 'data.items')
          if (resultItems) {
            if (!this.conf.pagination) {
              this.conf.data = resultItems
            } else if (this.conf.pagination && this.isStaticPagination) {
              this.staticData = resultItems
              this.total = this.staticData.length || 0
              this.staticPagination()
            } else {
              this.conf.data = resultItems
              let resultTotal = this.getMap(data, this.conf.pagination.responseMap && this.conf.pagination.responseMap.total || 'data.total')
              if (resultTotal) {
                this.total = resultTotal
              } else {
                this.$message.error(`返回数据total字段映射失败,请检查Map配置与后端返回数据是否配置正确..`)
              }
            }
          } else {
            this.$message.error(`返回数据items字段映射失败,请检查Map配置与后端返回数据是否正确...`)
          }
          resolve(data)
        }, data => {
          reject(data)
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.pagination-box {
  margin-top: 10px;
}
</style>

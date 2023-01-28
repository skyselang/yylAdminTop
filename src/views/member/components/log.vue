<template>
  <div class="app-container">
    <!-- 日志查询 -->
    <div class="filter-container">
      <el-date-picker v-model="logQuery.create_time" type="daterange" style="width: 240px;" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" />
      <el-button class="filter-item" type="primary" @click="logSearch">查询</el-button>
      <el-button class="filter-item" type="primary" style="float:right;" @click="logRefresh">刷新</el-button>
    </div>
    <!-- 日志列表 -->
    <el-table v-loading="loading" :data="logData" :height="height" style="width: 100%" border @sort-change="logSort">
      <el-table-column prop="log_id" label="ID" min-width="100" sortable="custom" fixed="left" />
      <el-table-column prop="api_name" label="操作" min-width="130" />
      <el-table-column prop="request_ip" label="IP" min-width="130" />
      <el-table-column prop="request_region" label="地区" min-width="150" />
      <el-table-column prop="request_isp" label="ISP" min-width="110" />
      <el-table-column prop="create_time" label="时间" min-width="160" />
    </el-table>
    <!-- 日志分页 -->
    <pagination v-show="logCount > 0" :total="logCount" :page.sync="logQuery.page" :limit.sync="logQuery.limit" @pagination="logs" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getApiToken } from '@/utils/userinfo'
import { log } from '@/apis/member'

export default {
  name: 'MemberLog',
  components: { Pagination },
  data () {
    return {
      height: 680,
      loading: false,
      logData: [],
      logCount: 0,
      logQuery: {
        page: 1,
        limit: 12
      }
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      const token = getApiToken()
      if (token) {
        this.logs()
      }
    },
    // 日志列表
    logs () {
      this.loading = true
      log(this.logQuery)
        .then(res => {
          this.logData = res.data.list
          this.logCount = res.data.count
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 日志排序
    logSort (sort) {
      this.logQuery.sort_field = sort.prop
      this.logQuery.sort_type = ''
      if (sort.order === 'ascending') {
        this.logQuery.sort_type = 'asc'
        this.logs()
      }
      if (sort.order === 'descending') {
        this.logQuery.sort_type = 'desc'
        this.logs()
      }
    },
    // 日志查询
    logSearch () {
      this.logQuery.page = 1
      this.logs()
    },
    // 日志刷新
    logRefresh () {
      this.logQuery = this.$options.data().logQuery
      this.logs()
    }
  }
}
</script>

<template>
  <!-- 日志查询 -->
  <el-date-picker
    v-model="logQuery.create_time"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD"
  />
  <el-button class="filter-item" type="primary" @click="logSearch">查询</el-button>
  <el-button class="filter-item" @click="logRefresh">刷新</el-button>
  <!-- 日志列表 -->
  <el-table v-loading="loading" :data="logData" @sort-change="logSort">
    <el-table-column prop="log_id" label="ID" min-width="100" sortable="custom" />
    <el-table-column prop="api_name" label="操作" min-width="130" />
    <el-table-column prop="request_ip" label="IP" min-width="130" />
    <el-table-column prop="request_region" label="地区" min-width="150" />
    <el-table-column prop="request_isp" label="ISP" min-width="110" />
    <el-table-column prop="create_time" label="时间" min-width="160" />
  </el-table>
  <!-- 日志分页 -->
  <el-pagination
    class="mt"
    v-show="logCount > 0"
    v-model:page-size="logQuery.limit"
    v-model:current-page="logQuery.page"
    :total="logCount"
    layout="prev, pager, next"
    @change="logs"
  />
</template>

<script>
import { log } from '@/api/member'

export default {
  name: 'MemberLog',
  components: {},
  data() {
    return {
      loading: false,
      logData: [],
      logCount: 0,
      logQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.logs()
  },
  methods: {
    // 日志列表
    logs() {
      this.loading = true
      log(this.logQuery)
        .then((res) => {
          this.logData = res.data.list
          this.logCount = res.data.count
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 日志排序
    logSort(sort) {
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
    logSearch() {
      this.logQuery.page = 1
      this.logs()
    },
    // 日志刷新
    logRefresh() {
      this.logQuery = this.$options.data().logQuery
      this.logs()
    }
  }
}
</script>

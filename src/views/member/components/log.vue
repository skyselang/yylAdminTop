<template>
  <!-- 查询 -->
  <el-date-picker
    v-model="query.create_time"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD"
  />
  <el-button class="filter-item" type="primary" @click="search">查询</el-button>
  <el-button class="filter-item" @click="refresh">刷新</el-button>
  <!-- 列表 -->
  <el-table v-loading="loading" :data="data" :height="height" @sort-change="sort">
    <el-table-column prop="api_name" label="操作" min-width="130" />
    <el-table-column prop="request_ip" label="IP" min-width="130" />
    <el-table-column prop="request_region" label="地区" min-width="150" />
    <el-table-column prop="request_isp" label="ISP" min-width="110" />
    <el-table-column prop="create_time" label="时间" min-width="160" />
  </el-table>
  <!-- 分页 -->
  <el-pagination
    class="mt"
    v-show="count > 0"
    v-model:page-size="query.limit"
    v-model:current-page="query.page"
    :total="count"
    layout="total, prev, pager, next"
    @change="list"
  />
</template>

<script setup>
import { log } from '@/api/member'
defineOptions({
  name: 'MemberLog'
})

const height = ref(500)
const loading = ref(false)
const data = ref([])
const count = ref(0)
const query = ref({ page: 1, list: 10 })

// 列表
function list() {
  loading.value = true
  log(query.value)
    .then((res) => {
      data.value = res.data.list
      count.value = res.data.count
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
// 排序
function sort(sort) {
  query.value.sort_field = sort.prop
  query.value.sort_value = ''
  if (sort.order === 'ascending') {
    query.value.sort_value = 'asc'
    list()
  }
  if (sort.order === 'descending') {
    query.value.sort_value = 'desc'
    list()
  }
}
// 查询
function search() {
  query.value.page = 1
  list()
}
// 刷新
function refresh() {
  query.value = { page: 1, list: 10 }
  list()
}

onMounted(() => {
  list()
})
</script>

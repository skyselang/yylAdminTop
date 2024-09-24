<template>
  <!-- 查询 -->
  <el-input v-model="query.title" class="w-[240px]" placeholder="标题、回执编号" />
  <el-date-picker
    v-model="query.create_time"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD"
  />
  <el-button type="primary" @click="search">查询</el-button>
  <el-button @click="refresh">刷新</el-button>
  <el-button type="primary" @click="add">提交反馈</el-button>
  <!-- 列表 -->
  <el-table v-loading="loading" :data="data" :height="height" @sort-change="sort">
    <el-table-column prop="feedback_id" label="ID" min-width="80" sortable="custom" />
    <el-table-column prop="type_name" label="类型" min-width="80" />
    <el-table-column prop="title" label="标题" min-width="150" />
    <el-table-column prop="receipt_no" label="回执编号" min-width="100" />
    <el-table-column prop="status_name" label="状态" min-width="80" />
    <el-table-column prop="create_time" label="提交时间" min-width="165" />
    <el-table-column label="操作" width="70">
      <template #default="scope">
        <el-link type="primary" :underline="false" @click="edit(scope.row)">详情</el-link>
      </template>
    </el-table-column>
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
  <!-- 添加 -->
  <el-dialog
    v-model="dialog"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    top="8vh"
  >
    <el-scrollbar native :height="height">
      <el-form ref="form" :rules="rules" :model="model" label-width="120px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="model.type">
            <el-option v-for="(item, index) in types" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="model.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="model.content"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="model.phone" placeholder="手机号码" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="model.email" placeholder="邮箱地址" clearable />
        </el-form-item>
        <el-form-item v-if="model[idkey]" label="回复" prop="reply">
          <el-input v-model="model.reply" type="textarea" autosize placeholder="回复内容" />
        </el-form-item>
        <el-form-item v-if="model[idkey]" label="状态" prop="status">
          <el-select v-model="model.status">
            <el-option v-for="(item, index) in statuss" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="model[idkey]" label="回执编号" prop="receipt_no">
          <el-input v-model="model.receipt_no" placeholder="回执编号" />
        </el-form-item>
        <el-form-item v-if="model[idkey]" label="提交时间" prop="create_time">
          <el-input v-model="model.create_time" />
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <el-button :loading="loading" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="submit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { list as listApi, info as infoApi, add as addApi } from '@/api/feedback'
defineOptions({
  name: 'MemberFeedback'
})

const name = '我的反馈'
const idkey = 'feedback_id'
const height = ref(500)
const loading = ref(false)
const types = ref([])
const statuss = ref([])
const form = ref()
const data = ref([])
const count = ref(0)
const query = ref({ page: 1, list: 10 })
const dialog = ref(false)
const dialogTitle = ref('')
const model = ref({
  feedback_id: '',
  type: 0,
  title: '',
  content: '',
  phone: '',
  email: '',
  images: [],
  reply: '',
  status: 0,
  receipt_no: '',
  create_time: ''
})
let modelInit = {}
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
})

// 列表
function list() {
  loading.value = true
  listApi(query.value)
    .then((res) => {
      types.value = res.data.types
      statuss.value = res.data.statuss
      data.value = res.data.list
      count.value = res.data.count
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
// 信息
function info(id) {
  let param = {}
  param[idkey] = id
  infoApi(param)
    .then((res) => {
      reset(res.data)
    })
    .catch(() => {})
}
// 添加
function add() {
  dialog.value = true
  dialogTitle.value = name + '提交'
  reset()
}
// 修改
function edit(row) {
  dialog.value = true
  dialogTitle.value = name + '信息：' + row[idkey]
  info(row[idkey])
}
// 取消
function cancel() {
  dialog.value = false
  dialogTitle.value = ''
  reset()
}
// 提交
function submit() {
  form.value.validate((valid) => {
    if (valid) {
      loading.value = true
      if (model.value[idkey]) {
        dialog.value = false
        loading.value = false
      } else {
        addApi(model.value)
          .then((res) => {
            list()
            dialog.value = false
            ElMessage.success(res.msg)
          })
          .catch(() => {
            loading.value = false
          })
      }
    }
  })
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
// 重置
function reset(row) {
  if (row) {
    model.value = row
  } else {
    model.value = modelInit
  }
  if (form.value !== undefined) {
    try {
      form.value.resetFields()
      form.value.clearValidate()
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(() => {
  list()
  modelInit = { ...model.value }
})
</script>

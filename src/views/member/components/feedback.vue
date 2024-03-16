<template>
  <!-- 反馈查询 -->
  <el-input v-model="query.title" style="width: 240px" placeholder="标题、回执编号" />
  <el-date-picker
    v-model="query.create_time"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD"
  />
  <el-button type="primary" @click="feedbackSearch">查询</el-button>
  <el-button @click="feedbackRefresh">刷新</el-button>
  <el-button type="primary" @click="add()">提交反馈</el-button>
  <!-- 反馈列表 -->
  <el-table v-loading="loading" :data="datas" @sort-change="feedbackSort">
    <el-table-column prop="feedback_id" label="ID" min-width="80" sortable="custom" />
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
  <!-- 反馈分页 -->
  <el-pagination
    class="mt"
    v-show="count > 0"
    v-model:page-size="query.limit"
    v-model:current-page="query.page"
    :total="count"
    layout="prev, pager, next"
    @change="lists"
  />
  <el-dialog
    v-model="dialog"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    top="8vh"
  >
    <el-scrollbar native :height="height">
      <el-form ref="ref" :rules="rules" :model="model" label-width="120px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="model.type">
            <el-option v-for="(item, index) in types" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="model.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="model.content" type="textarea" autosize placeholder="请输入内容" />
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

<script>
import { list, info, add } from '@/api/feedback'
import { ElMessage } from 'element-plus'

export default {
  name: 'MemberFeedback',
  components: {},
  data() {
    return {
      name: '反馈',
      height: 600,
      loading: false,
      idkey: 'feedback_id',
      types: [],
      statuss: [],
      datas: [],
      count: 0,
      query: {
        page: 1,
        limit: 10
      },
      dialog: false,
      dialogTitle: '',
      model: {
        feedback_id: '',
        type: 0,
        title: '',
        content: '',
        phone: '',
        email: '',
        images: [],
        status: 0,
        receipt_no: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.lists()
  },
  methods: {
    // 反馈列表
    lists() {
      this.loading = true
      list(this.query)
        .then((res) => {
          this.types = res.data.types
          this.statuss = res.data.statuss
          this.datas = res.data.list
          this.count = res.data.count
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 反馈排序
    feedbackSort(sort) {
      this.query.sort_field = sort.prop
      this.query.sort_type = ''
      if (sort.order === 'ascending') {
        this.query.sort_type = 'asc'
        this.lists()
      }
      if (sort.order === 'descending') {
        this.query.sort_type = 'desc'
        this.lists()
      }
    },
    // 反馈查询
    feedbackSearch() {
      this.query.page = 1
      this.lists()
    },
    // 反馈刷新
    feedbackRefresh() {
      this.query = this.$options.data().query
      this.lists()
    },
    // 添加修改
    add() {
      this.dialog = true
      this.dialogTitle = this.name + '提交'
      this.reset()
    },
    edit(row) {
      this.dialog = true
      this.dialogTitle = this.name + '信息：' + row[this.idkey]
      var id = {}
      id[this.idkey] = row[this.idkey]
      info(id)
        .then((res) => {
          this.reset(res.data)
        })
        .catch(() => {})
    },
    cancel() {
      this.dialog = false
      this.reset()
    },
    submit() {
      this.$refs['ref'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.model[this.idkey]) {
            this.dialog = false
            this.loading = false
          } else {
            add(this.model)
              .then((res) => {
                this.lists()
                this.dialog = false
                ElMessage.success(res.msg)
              })
              .catch(() => {
                this.loading = false
              })
          }
        }
      })
    },
    // 重置
    reset(row) {
      if (row) {
        this.model = row
      } else {
        this.model = this.$options.data().model
      }
      if (this.$refs['ref'] !== undefined) {
        try {
          this.$refs['ref'].resetFields()
          this.$refs['ref'].clearValidate()
        } catch (error) {
          /* empty */
        }
      }
    }
  }
}
</script>

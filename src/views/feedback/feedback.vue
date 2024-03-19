<template>
  <el-row v-loading="loading" class="mt">
    <el-col :span="8" :offset="8">
      <el-form v-if="types.length > 0" ref="form" :model="model" :rules="rules" label-width="80px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="model.type">
            <el-option v-for="(item, index) in types" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="model.title" clearable placeholder="反馈标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="model.content" type="textarea" clearable placeholder="反馈内容" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="model.mobile" clearable placeholder="手机" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="model.email" clearable placeholder="邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { add } from '@/api/feedback'
defineOptions({
  name: 'Feedback'
})

const router = useRouter()
const loading = ref(false)
const form = ref()
const types = ref([])
const model = reactive({
  type: 0,
  title: '',
  content: '',
  mobile: '',
  email: ''
})
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
})

function setting() {
  add({}, 'get')
    .then((res) => {
      types.value = res.data.types
    })
    .catch(() => {})
}
function submit() {
  form.value.validate((valid) => {
    if (valid) {
      loading.value = true
      add(model)
        .then(() => {
          loading.value = false
          ElMessage.success('反馈成功')
          router.push('/member')
        })
        .catch(() => {
          loading.value = false
        })
    }
  })
}
function reset() {
  form.value.resetFields()
}

onMounted(() => {
  setting()
})
</script>

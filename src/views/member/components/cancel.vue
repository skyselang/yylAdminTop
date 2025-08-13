<template>
  <el-card>
    <el-form ref="form" :model="model" :rules="rules" label-width="120px">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="member.nickname" type="text" disabled />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="member.username" type="text" disabled />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="model.password"
          type="password"
          autocomplete="new-password"
          placeholder="请输入密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-text>注销后会删除账号</el-text>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { info as infoApi } from '@/api/member'
import { cancel as cancelApi } from '@/api/logout'
defineOptions({
  name: 'MemberCancel'
})

const member = ref({})
const form = ref()
const model = ref({
  password: ''
})
const rules = ref({
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

function info() {
  infoApi()
    .then((res) => {
      member.value = res.data
    })
    .catch(() => {})
}
function submit() {
  form.value.validate((valid) => {
    if (valid) {
      cancelApi(model.value)
        .then((res) => {
          ElMessage.success(res.msg)
          info()
          reset()
        })
        .catch()
    }
  })
}
function reset() {
  form.value.resetFields()
}

onMounted(() => {
  info()
})
</script>

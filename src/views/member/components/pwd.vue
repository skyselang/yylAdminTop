<template>
  <el-card>
    <el-form ref="form" :model="model" :rules="rules" label-width="120px">
      <el-form-item v-if="member.pwd_edit_type == 0" label="旧密码" prop="password_old">
        <el-input
          v-model="model.password_old"
          type="password"
          autocomplete="off"
          placeholder="请输入旧密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item label="新密码" prop="password_new">
        <el-input
          v-model="model.password_new"
          type="password"
          autocomplete="off"
          placeholder="请输入新密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item> <el-text>修改密码后需要重新登录。</el-text> </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { info as infoApi, pwd as pwdApi } from '@/api/member'
defineOptions({
  name: 'MemberPwd'
})

const member = ref({})
const form = ref()
const model = ref({
  password_old: '',
  password_new: ''
})
const rules = ref({
  password_old: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  password_new: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
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
      pwdApi(model.value)
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

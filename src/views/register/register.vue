<template>
  <div v-loading="loading">
    <el-row :gutter="0" class="form">
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="model" :rules="rules" label-width="80px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="model.username" type="text" clearable placeholder="2至32个字符，字母、数字"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="model.password" type="password" clearable show-password placeholder="6至18个字符，字母、数字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button type="primary" @click="submitForm('form')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getToken } from '@/utils/userinfo'
import { register } from '@/apis/register'

export default {
  name: 'Register',
  data () {
    return {
      loading: false,
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      const token = getToken()
      if (token) {
        this.$router.push('/user')
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          register(this.model).then(res => {
            this.loading = false
            this.$message.success('注册成功，请登录')
            this.$router.push('/login')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.form{
  padding-top: 100px;
}
</style>

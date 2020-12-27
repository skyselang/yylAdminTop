<template>
  <div v-loading="loading">
    <el-row :gutter="0" class="form">
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="model" :rules="rules" label-width="80px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="model.username" type="text" clearable placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="model.password" type="password" clearable show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button type="primary" @click="submitForm('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from '@/apis/login'
import { setUserInfo } from '@/utils/userinfo'

export default {
  name: 'Login',
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
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          login(this.model).then(res => {
            setUserInfo(res.data)
            this.loading = false
            this.$message.success(res.msg)
            this.$router.push('/user')
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

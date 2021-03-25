<template>
  <div v-loading="loading">
    <el-row :gutter="0" class="form">
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="model" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username" type="text" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="model.password" type="password" clearable show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" v-if="verifyShow" prop="verify_code">
            <el-col :span="13">
              <el-input ref="verify_code_ipt" v-model="model.verify_code" type="text" placeholder="请输入验证码" prefix-icon="el-icon-picture" autocomplete="off" style="height:45px;line-height:45px;" clearable />
            </el-col>
            <el-col :span="11">
              <el-image :src="verifySrc" fit="fill" alt="验证码" title="点击刷新验证码" style="width:120px;height:45px;float:right" @click="verifyRefresh" />
            </el-col>
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
import { verify, login } from '@/apis/login'
import { setUserInfo } from '@/utils/userinfo'

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      verifyShow: false,
      verifySrc: '',
      model: {
        username: '',
        password: '',
        verify_id: '',
        verify_code: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verify_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getVerify()
  },
  methods: {
    // 验证码配置
    getVerify () {
      verify().then(res => {
        this.verifyShow = res.data.verify_switch
        if (res.data.verify_switch) {
          this.verifySrc = res.data.verify_src
          this.model.verify_id = res.data.verify_id
        }
      })
    },
    // 验证码刷新
    verifyRefresh () {
      this.model.verify_id = ''
      this.model.verify_code = ''
      this.getVerify()
      // this.$refs.verify_code_ipt.focus()
    },
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
.form {
  padding-top: 100px;
}
</style>

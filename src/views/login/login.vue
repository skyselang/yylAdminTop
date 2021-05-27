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
          <el-form-item label="验证码" v-if="captcha_switch" prop="captcha_code">
            <el-col :span="12">
              <el-input ref="captcha_code_ipt" v-model="model.captcha_code" type="text" placeholder="请输入验证码" prefix-icon="el-icon-picture" autocomplete="off" style="height:40px;line-height:40px;" clearable />
            </el-col>
            <el-col :span="12">
              <el-image :src="captcha_src" fit="fill" alt="验证码" title="点击刷新验证码" style="height:40px;float:right" @click="captchaRefresh" />
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
import { captcha, login } from '@/apis/login'
import { setUserInfo } from '@/utils/userinfo'

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      captcha_switch: 0,
      captcha_src: '',
      model: {
        username: '',
        password: '',
        captcha_id: '',
        captcha_code: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getCaptcha()
  },
  methods: {
    // 验证码配置
    getCaptcha () {
      captcha().then(res => {
        this.captcha_switch = res.data.captcha_switch
        if (res.data.captcha_switch) {
          this.captcha_src = res.data.captcha_src
          this.model.captcha_id = res.data.captcha_id
        }
      })
    },
    // 验证码刷新
    captchaRefresh () {
      this.model.captcha_id = ''
      this.model.captcha_code = ''
      this.getCaptcha()
      // this.$refs.captcha_code_ipt.focus()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          login(this.model).then(res => {
            setUserInfo(res.data)
            this.loading = false
            this.$message.success(res.msg)
            this.$router.push('/member')
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

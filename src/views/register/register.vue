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
          <el-form-item label="验证码" v-if="verify_switch" prop="verify_code">
            <el-col :span="12">
              <el-input ref="verify_code_ipt" v-model="model.verify_code" type="text" placeholder="请输入验证码" prefix-icon="el-icon-picture" autocomplete="off" style="height:40px;line-height:40px;" clearable />
            </el-col>
            <el-col :span="12">
              <el-image :src="verify_src" fit="fill" alt="验证码" title="点击刷新验证码" style="height:40px;float:right" @click="verifyRefresh" />
            </el-col>
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
import { getMemberToken } from '@/utils/userinfo'
import { verify, register } from '@/apis/register'

export default {
  name: 'Register',
  data () {
    return {
      loading: false,
      verify_switch: 0,
      verify_src: '',
      model: {
        username: '',
        password: '',
        verify_id: '',
        verify_code: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verify_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.isLogin()
    this.getVerify()
  },
  methods: {
    isLogin () {
      const token = getMemberToken()
      if (token) {
        this.$router.push('/member')
      }
    },
    // 验证码配置
    getVerify () {
      verify().then(res => {
        this.verify_switch = res.data.verify_switch
        if (res.data.verify_switch) {
          this.verify_src = res.data.verify_src
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
.form {
  padding-top: 100px;
}
</style>

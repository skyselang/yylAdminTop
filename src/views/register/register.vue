<template>
  <el-row v-loading="loading" class="mt">
    <el-col :span="8" :offset="8">
      <el-form ref="form" :model="model" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username" clearable placeholder="2至32个字符" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="model.password"
            type="password"
            clearable
            show-password
            placeholder="6至18个字符"
          />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="model.nickname" clearable placeholder="1至64个字符" />
        </el-form-item>
        <el-form-item label="验证码" v-if="captcha_switch" prop="captcha_code">
          <el-col :span="12">
            <el-input
              ref="captcha_code_ipt"
              v-model="model.captcha_code"
              clearable
              placeholder="请输入验证码"
              autocomplete="off"
              style="height: 32px; line-height: 32px"
            />
          </el-col>
          <el-col :span="12">
            <el-image
              :src="captcha_src"
              alt="验证码"
              title="点击刷新验证码"
              style="height: 32px; float: right; cursor: pointer"
              @click="captchaRefresh"
            />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button type="primary" @click="submitForm('form')">注册</el-button>
        </el-form-item>
        <el-form-item label="">
          <a href="#" @click="thirdLogin('qq')">
            <img
              src="@/assets/images/qq-login230x48.png"
              style="height: 32px; vertical-align: middle"
              alt="QQ登录"
            />
          </a>
        </el-form-item>
        <el-form-item label="">
          <a href="#" @click="thirdLogin('wb')">
            <img
              src="@/assets/images/weibo-login-48.png"
              style="height: 32px; vertical-align: middle"
              alt="微博登录"
            />
          </a>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from 'element-plus'
import { useUserStoreHook } from '@/store/modules/user'
import { useSettingsStoreHook } from '@/store/modules/settings'
import { captcha, register } from '@/api/register'

export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      captcha_switch: 0,
      captcha_src: '',
      model: {
        username: '',
        password: '',
        nickname: '',
        captcha_id: '',
        captcha_code: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCaptcha()
    this.thirdLoginRes()
  },
  methods: {
    // 验证码配置
    getCaptcha() {
      captcha().then((res) => {
        this.captcha_switch = res.data.captcha_switch
        if (res.data.captcha_switch) {
          this.captcha_src = res.data.captcha_src
          this.model.captcha_id = res.data.captcha_id
        }
      })
    },
    // 验证码刷新
    captchaRefresh() {
      this.model.captcha_id = ''
      this.model.captcha_code = ''
      this.getCaptcha()
      // this.$refs.captcha_code_ipt.focus()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          register(this.model)
            .then(() => {
              this.loading = false
              ElMessage.success('注册成功，请登录')
              this.$router.push('/login')
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 第三方登录
    thirdLogin(app = 'qq') {
      const baseUrl = import.meta.env.VITE_APP_BASE_URL
      const loginUrl =
        baseUrl + '/api/member.Login/website?app=' + app + '&jump_url=' + window.location.href
      window.open(loginUrl)
    },
    thirdLoginRes() {
      const urlParam = this.getUrlParams()
      if (urlParam) {
        const settingsStore = useSettingsStoreHook()
        const tokenName = settingsStore.tokenName
        const token = urlParam[tokenName]
        if (token) {
          const userStore = useUserStoreHook()
          userStore.setToken(urlParam)
          this.$router.push('/member')
        }
      }
    },
    getUrlParams() {
      // 获取当前页面的完整URL
      var url = window.location.href
      // 将URL拆分成各个部分
      var urlParts = url.split('?')
      // 获取URL中的查询字符串部分
      var queryString = urlParts[1]
      // 将查询字符串拆分成键值对
      var queryParameters = {}
      if (queryString) {
        queryString.split('&').forEach(function (part) {
          var paramParts = part.split('=')
          queryParameters[paramParts[0]] = paramParts[1]
        })
      }
      return queryParameters
    }
  }
}
</script>

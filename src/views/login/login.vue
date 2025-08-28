<template>
  <el-row v-loading="loading" class="mt">
    <el-col :span="8" :offset="8">
      <el-form ref="form" :model="model" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="model.account" clearable placeholder="请输入账号（邮箱/手机号/用户名）" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" type="password" clearable show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item v-if="captcha_switch && captcha_img" label="验证码" prop="captcha_code">
          <el-col :span="12">
            <el-input
              v-model="model.captcha_code"
              class="h-[32px] lh-[32px]"
              clearable
              placeholder="请输入验证码"
              autocomplete="off"
            />
          </el-col>
          <el-col :span="12">
            <el-image
              :src="captcha_img"
              class="h-[32px] float-right cursor-pointer"
              alt="验证码"
              title="点击刷新验证码"
              @click="captchaRefresh"
            />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button
            v-if="captcha_switch && captcha_mode === 2"
            :loading="loading"
            type="primary"
            @click="ajcaptchaShow"
          >
            登录
          </el-button>
          <el-button v-else :loading="loading" type="primary" @click="handleSubmit"> 登录 </el-button>
          <el-button @click="register()">注册</el-button>
        </el-form-item>
        <el-form-item label="">
          <a href="#" @click="website('qq')">
            <img src="@/assets/images/qq-login230x48.png" class="h-[32px] v-middle" alt="QQ登录" />
          </a>
        </el-form-item>
        <el-form-item v-if="isdev" label="">
          <img
            src="@/assets/images/wx-gzh-logo.png"
            class="h-[32px] v-middle border border-[#409eff] rounded-[4px]"
            alt="微信公众号登录"
          />
          <el-button type="primary" @click="offiacc('wx')">微信公众号登录</el-button>
        </el-form-item>
        <el-form-item label="">
          <a href="#" @click="website('wb')">
            <img src="@/assets/images/weibo-login-48.png" class="h-[32px] v-middle" alt="微博登录" />
          </a>
        </el-form-item>
        <!-- 邮箱登录 -->
        <el-form-item label="">
          <img src="@/assets/images/mail.png" class="h-[32px] v-middle" alt="邮箱登录" />
          <el-button type="primary" @click="emailLogin()">邮箱登录</el-button>
        </el-form-item>
      </el-form>
      <aj-captcha
        v-if="captcha_switch && captcha_mode === 2"
        ref="ajcaptcha"
        mode="pop"
        :captcha-type="captcha_type"
        @success="ajcaptchaSuccess"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import { captcha, login } from '@/api/login'
import { useMemberStore } from '@/store/modules/member'
import AjCaptcha from './component/AjCaptcha/index.vue'

defineOptions({
  name: 'Login'
})

const isdev = import.meta.env.DEV
const baseUrl = import.meta.env.VITE_APP_BASE_URL
const redirectUri = 'http://127.0.0.1:9526/api/member.Login/redirectUri'
const memberStore = useMemberStore()
const router = useRouter()
const loading = ref(false)
const captcha_switch = ref(0)
const captcha_img = ref('')
const captcha_mode = ref(1)
const captcha_type = ref('blockPuzzle')
const form = ref()
const ajcaptcha = ref()
const model = ref({
  account: '',
  password: '',
  captcha_id: '',
  captcha_code: '',
  ajcaptcha: {}
})
const rules = ref({
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// 验证码
function captchaGet() {
  captcha().then((res) => {
    captcha_switch.value = res.data.captcha_switch
    captcha_mode.value = res.data.captcha_mode
    model.value.captcha_id = ''
    model.value.captcha_code = ''
    if (res.data.captcha_switch) {
      if (res.data.captcha_mode === 1) {
        captcha_img.value = res.data.captcha_img
        model.value.captcha_id = res.data.captcha_id
      } else {
        if (res.data.captcha_type === 1) {
          captcha_type.value = 'blockPuzzle'
        } else {
          captcha_type.value = 'clickWord'
        }
      }
    }
  })
}
function captchaRefresh() {
  model.value.captcha_id = ''
  model.value.captcha_code = ''
  captchaGet()
}
function ajcaptchaSuccess(params) {
  model.value.ajcaptcha = params
  handleSubmit()
}
function ajcaptchaShow() {
  form.value.validate((valid) => {
    if (!valid) {
      return false
    } else {
      ajcaptcha.value.show()
    }
  })
}
function handleSubmit() {
  form.value.validate((valid) => {
    if (valid) {
      loading.value = true
      login(model.value)
        .then((res) => {
          memberStore.setToken(res.data)
          memberStore.setInfo(res.data)
          loading.value = false
          ElMessage.success(res.msg)
          router.push('/member')
        })
        .catch(() => {
          loading.value = false
          if (captcha_switch.value && captcha_mode.value === 2) {
            ajcaptcha.value.refresh()
          } else {
            captchaGet()
          }
        })
    }
  })
}
function reset() {
  form.value.resetFields()
}
function register() {
  router.push('/register')
}
// 第三方登录
function website(app = 'qq') {
  const apiUrl = '/api/member.Login/website'
  let params = new URLSearchParams()
  params.append('app', app)
  params.append('redirect_uri', isdev ? redirectUri : '')
  params.append('jump_url', window.location.href)
  let loginUrl = baseUrl + apiUrl + '?' + params.toString()
  window.open(loginUrl)
}
function offiacc(app = 'wx') {
  const apiUrl = '/api/member.Login/offiacc'
  let params = new URLSearchParams()
  params.append('app', app)
  params.append('redirect_uri', isdev ? redirectUri : '')
  params.append('jump_url', window.location.href)
  let loginUrl = baseUrl + apiUrl + '?' + params.toString()
  window.open(loginUrl)
}
function emailLogin() {
  router.push('/email-login')
}

onMounted(() => {
  captchaGet()
})
</script>

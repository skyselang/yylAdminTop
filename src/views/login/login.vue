<template>
  <el-row v-loading="loading" class="mt">
    <el-col :span="8" :offset="8">
      <el-form ref="form" :model="model" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="model.account" clearable placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="model.password"
            type="password"
            clearable
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="验证码" v-if="captcha_switch" prop="captcha_code">
          <el-col :span="12">
            <el-input
              ref="captcha_code_ipt"
              v-model="model.captcha_code"
              clearable
              placeholder="请输入验证码"
              autocomplete="off"
            />
          </el-col>
          <el-col :span="12">
            <el-image
              :src="captcha_src"
              alt="验证码"
              title="点击刷新验证码"
              class="h-[32px] v-middle float-right cursor-pointer"
              @click="captchaRefresh"
            />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset()">重置</el-button>
          <el-button type="primary" @click="submit()">登录</el-button>
        </el-form-item>
        <el-form-item label="">
          <a href="#" @click="thirdLogin('qq')">
            <img src="@/assets/images/qq-login230x48.png" class="h-[32px] v-middle" alt="QQ登录" />
          </a>
        </el-form-item>
        <el-form-item label="">
          <a href="#" @click="thirdLogin('wb')">
            <img
              src="@/assets/images/weibo-login-48.png"
              class="h-[32px] v-middle"
              alt="微博登录"
            />
          </a>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { captcha, login } from '@/api/login'
import { useSettingsStore } from '@/store/modules/settings'
import { useMemberStore } from '@/store/modules/member'
defineOptions({
  name: 'Login'
})

const memberStore = useMemberStore()
const router = useRouter()
const loading = ref(false)
const form = ref()
const captcha_code_ipt = ref()
const captcha_switch = ref(0)
const captcha_src = ref('')
const model = reactive({
  account: '',
  password: '',
  captcha_id: '',
  captcha_code: ''
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
    if (res.data.captcha_switch) {
      captcha_src.value = res.data.captcha_src
      model.captcha_id = res.data.captcha_id
    }
  })
}
function captchaRefresh() {
  model.captcha_id = ''
  model.captcha_code = ''
  captchaGet()
  captcha_code_ipt.value.focus()
}
function submit() {
  form.value.validate((valid) => {
    if (valid) {
      loading.value = true
      login(model)
        .then((res) => {
          memberStore.setToken(res.data)
          memberStore.setInfo(res.data)
          loading.value = false
          ElMessage.success(res.msg)
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
// 第三方登录
function thirdLogin(app = 'qq') {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  const apiUrl = '/api/member.Login/website?app=' + app
  const jumpUrl = '&jump_url=' + window.location.href
  const loginUrl = baseUrl + apiUrl + jumpUrl
  window.open(loginUrl)
}
function thirdLoginRes() {
  const params = thirdLoginParam()
  if (params) {
    const settingsStore = useSettingsStore()
    const tokenName = settingsStore.tokenName
    const tokenValue = params[tokenName]
    if (tokenValue) {
      memberStore.setToken(params)
      router.push('/member')
    }
  }
}
function thirdLoginParam() {
  // 获取当前页面的完整URL
  let url = window.location.href
  // 将URL拆分成各个部分
  let urlParts = url.split('?')
  // 获取URL中的查询字符串部分
  let queryString = urlParts[1]
  // 将查询字符串拆分成键值对
  let queryParameters = {}
  if (queryString) {
    queryString.split('&').forEach(function (part) {
      let paramParts = part.split('=')
      queryParameters[paramParts[0]] = paramParts[1]
    })
  }
  return queryParameters
}

onMounted(() => {
  captchaGet()
  thirdLoginRes()
})
</script>

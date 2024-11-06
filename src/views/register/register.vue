<template>
  <el-row v-loading="loading" class="mt">
    <el-col :span="8" :offset="8">
      <el-form ref="form" :model="model" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username" clearable placeholder="2至32个字符" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" type="password" clearable show-password placeholder="6至18个字符" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="model.nickname" clearable placeholder="1至64个字符" />
        </el-form-item>
        <el-form-item label="验证码" v-if="captcha_switch" prop="captcha_code">
          <el-col :span="12">
            <el-input
              ref="captcha_code_ipt"
              v-model="model.captcha_code"
              class="h-[32px] lh-[32px]"
              clearable
              placeholder="请输入验证码"
              autocomplete="off"
            />
          </el-col>
          <el-col :span="12">
            <el-image
              :src="captcha_src"
              class="h-[32px] float-right cursor-pointer"
              alt="验证码"
              title="点击刷新验证码"
              @click="captchaRefresh"
            />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="submit">注册</el-button>
          <el-button @click="login()">登录</el-button>
        </el-form-item>
        <el-form-item label="">
          <a href="#" @click="thirdLogin('qq')">
            <img src="@/assets/images/qq-login230x48.png" class="h-[32px] v-middle" alt="QQ登录" />
          </a>
        </el-form-item>
        <el-form-item label="">
          <a href="#" @click="thirdLogin('wb')">
            <img src="@/assets/images/weibo-login-48.png" class="h-[32px] v-middle" alt="微博登录" />
          </a>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { useSettingsStore } from '@/store/modules/settings'
import { useMemberStore } from '@/store/modules/member'
import { captcha, register } from '@/api/register'
defineOptions({
  name: 'Register'
})

const router = useRouter()
const loading = ref(false)
const captcha_switch = ref(0)
const captcha_src = ref('')
const captcha_code_ipt = ref()
const form = ref()
const model = ref({
  username: '',
  password: '',
  nickname: '',
  captcha_id: '',
  captcha_code: ''
})
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// 验证码
function captchaGet() {
  captcha().then((res) => {
    captcha_switch.value = res.data.captcha_switch
    if (res.data.captcha_switch) {
      captcha_src.value = res.data.captcha_src
      model.value.captcha_id = res.data.captcha_id
    }
  })
}
function captchaRefresh() {
  model.value.captcha_id = ''
  model.value.captcha_code = ''
  captchaGet()
  captcha_code_ipt.value.focus()
}
// 注册
function submit() {
  form.value.validate((valid) => {
    if (valid) {
      loading.value = true
      register(model.value)
        .then(() => {
          loading.value = false
          ElMessage.success('注册成功，请登录')
          router.push('/login')
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
function login() {
  router.push('/login')
}
// 第三方登录
function thirdLogin(app = 'qq') {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  const loginUrl = baseUrl + '/api/member.Login/website?app=' + app + '&jump_url=' + window.location.href
  window.open(loginUrl)
}
function thirdLoginRes() {
  const param = thirdLoginParam()
  if (param) {
    const settingsStore = useSettingsStore()
    const tokenName = settingsStore.tokenName
    const tokenValue = param[tokenName]
    if (tokenValue) {
      const memberStore = useMemberStore()
      memberStore.setToken(param)
      router.push('/member')
    }
  }
}
function thirdLoginParam() {
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

onMounted(() => {
  captchaGet()
  thirdLoginRes()
})
</script>

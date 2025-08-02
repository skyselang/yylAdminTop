<template>
  <div class="email-register-container">
    <el-card class="register-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-text size="large">邮箱注册</el-text>
          <p><el-text size="small">如未收到验证码，请检查垃圾箱是否拦截</el-text></p>
        </div>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px" v-loading="loading">
        <!-- 邮箱输入框 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱地址" clearable />
        </el-form-item>

        <!-- 验证码输入框和获取验证码按钮 -->
        <el-form-item label="验证码" prop="captcha_code">
          <div class="code-input-group">
            <el-input v-model="formData.captcha_code" placeholder="请输入邮箱验证码" clearable />
            <el-button
              type="primary"
              :disabled="countdown > 0 || !formData.email"
              @click="handleSendEmailCode"
              class="send-code-btn"
            >
              {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码（6-18位）"
            clearable
            show-password
          />
        </el-form-item>

        <!-- 确认密码输入框 -->
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            clearable
            show-password
          />
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" class="submit-btn" :loading="submitting">
            立即注册
          </el-button>
        </el-form-item>

        <!-- 其他操作 -->
        <el-form-item>
          <div class="other-actions">
            <el-button link @click="goToLogin">已有账号？立即登录</el-button>
            <el-button link @click="goToNormalRegister">普通注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { sendEmailCode, emailRegister } from '@/api/register'

defineOptions({
  name: 'EmailRegister'
})

const router = useRouter()
const formRef = ref()
const loading = ref(false)
const submitting = ref(false)
const countdown = ref(0)

// 表单数据
const formData = reactive({
  email: '',
  captcha_code: '',
  password: '',
  confirmPassword: '',
  application: 13
})

// 表单验证规则
const rules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  captcha_code: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度应为6-18位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 发送邮箱验证码
const handleSendEmailCode = async () => {
  if (!formData.email) {
    ElMessage.warning('请先输入邮箱地址')
    return
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    ElMessage.warning('请输入正确的邮箱格式')
    return
  }

  loading.value = true
  try {
    await sendEmailCode({ email: formData.email })
    ElMessage.success('验证码已发送到您的邮箱，请注意查收')
    startCountdown()
  } catch (error) {
  } finally {
    loading.value = false
  }
}

// 开始倒计时
const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 提交注册
const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    await emailRegister(formData)

    ElMessage.success('邮箱注册成功，请登录')
    router.push('/login')
  } catch (error) {
    if (error.message) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('注册失败，请重试')
    }
  } finally {
    submitting.value = false
  }
}

// 跳转到登录页
const goToLogin = () => {
  router.push('/login')
}

// 跳转到普通注册页
const goToNormalRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.email-register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
}

.card-header {
  text-align: center;
}

.card-header h2 {
  margin: 0 0 8px 0;
  font-weight: 600;
}

.card-header p {
  margin: 0;
}

.code-input-group {
  display: flex;
  gap: 12px;
}

.code-input-group .el-input {
  flex: 1;
}

.send-code-btn {
  width: 120px;
  white-space: nowrap;
}

.submit-btn {
  width: 100%;
  font-weight: 500;
}

.other-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .email-register-container {
    padding: 10px;
  }

  .register-card {
    max-width: 100%;
  }

  .code-input-group {
    flex-direction: column;
  }

  .send-code-btn {
    width: 100%;
  }
}
</style>

<template>
  <el-card>
    <el-form ref="form" :model="model" label-width="120px">
      <el-form-item label="登录IP" prop="login_ip">
        <el-input v-model="model.login_ip" type="text" disabled />
      </el-form-item>
      <el-form-item label="登录地区" prop="login_region">
        <el-input v-model="model.login_region" type="text" disabled />
      </el-form-item>
      <el-form-item label="登录时间" prop="login_time">
        <el-input v-model="model.login_time" type="text" disabled />
      </el-form-item>
      <el-form-item label="登录次数" prop="login_num">
        <el-input v-model="model.login_num" type="text" disabled />
      </el-form-item>
      <el-form-item label="注册时间" prop="create_time">
        <el-input v-model="model.create_time" type="text" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="logout()">退出</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { info as infoApi } from '@/api/member'
import { logout as logoutApi } from '@/api/login'
import { useMemberStore } from '@/store/modules/member'
defineOptions({
  name: 'MemberLogout'
})

const model = ref({})
const router = useRouter()
const memberStore = useMemberStore()

function info() {
  infoApi()
    .then((res) => {
      model.value = res.data
    })
    .catch(() => {})
}

const logout = () => {
  ElMessageBox.confirm('确定要退出吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    lockScroll: false
  })
    .then(() => {
      logoutApi().then(() => {
        memberStore.delToken()
        memberStore.delInfo()
        router.push('/')
      })
    })
    .catch(() => {})
}

onMounted(() => {
  info()
})
</script>

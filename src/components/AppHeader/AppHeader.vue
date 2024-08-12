<template>
  <el-row>
    <el-col>
      <el-menu mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/">
          <img class="h-[40px]" src="@/assets/images/logo.png" alt="logo" />
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="/content">内容</el-menu-item>
        <el-menu-item index="/file">文件</el-menu-item>
        <el-menu-item index="/feedback">反馈</el-menu-item>
        <el-menu-item v-if="token" @click="logout">退出</el-menu-item>
        <el-menu-item v-if="!token" index="/login">登录</el-menu-item>
        <el-menu-item v-if="!token" index="/register">注册</el-menu-item>
        <el-menu-item index="/member">
          <el-avatar
            v-if="member.avatar_url"
            :src="member.avatar_url"
            :size="30"
            class="v-middle"
            shape="circle"
            title="个人中心"
          />
          <el-text v-else :title="member.nickname">个人中心</el-text>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { useMemberStore } from '@/store/modules/member'
import { logout as logoutApi } from '@/api/login'
import { setToken } from '@/utils/index'

const router = useRouter()
const memberStore = useMemberStore()
const { token, member } = storeToRefs(memberStore)

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
        router.push('/index')
      })
    })
    .catch(() => {})
}

onMounted(() => {
  setToken()
})
</script>

<template>
  <div v-loading="loading">
    <el-tabs v-model="tabActName">
      <el-tab-pane label="信息" name="info">
        <user-info></user-info>
      </el-tab-pane>
      <el-tab-pane label="修改" name="edit">
        <user-edit></user-edit>
      </el-tab-pane>
      <el-tab-pane label="头像" name="avatar">
        <user-avatar></user-avatar>
      </el-tab-pane>
      <el-tab-pane label="密码" name="pwd">
        <user-pwd></user-pwd>
      </el-tab-pane>
      <el-tab-pane label="日志" name="log">
        <user-log></user-log>
      </el-tab-pane>
      <el-tab-pane label="退出" name="exit">
        <user-logout></user-logout>
      </el-tab-pane>
      <el-tab-pane label="后台" name="admin">
        <user-admin></user-admin>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getToken } from '@/utils/userinfo'
import UserInfo from './components/info'
import UserEdit from './components/edit'
import UserAvatar from './components/avatar'
import UserPwd from './components/pwd'
import UserLog from './components/log'
import UserLogout from './components/logout'
import UserAdmin from './components/admin'

export default {
  name: 'User',
  components: { UserInfo, UserEdit, UserAvatar, UserPwd, UserLog, UserLogout, UserAdmin },
  data () {
    return {
      loading: false,
      tabActName: 'info'
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      const token = getToken()
      if (token) {

      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>

</style>

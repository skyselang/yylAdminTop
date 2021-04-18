<template>
  <div v-loading="loading">
    <el-tabs v-model="tabActName">
      <el-tab-pane label="信息" name="info">
        <info></info>
      </el-tab-pane>
      <el-tab-pane label="修改" name="edit">
        <edit></edit>
      </el-tab-pane>
      <el-tab-pane label="头像" name="avatar">
        <avatar></avatar>
      </el-tab-pane>
      <el-tab-pane label="密码" name="pwd">
        <pwd></pwd>
      </el-tab-pane>
      <el-tab-pane label="日志" name="log">
        <log></log>
      </el-tab-pane>
      <el-tab-pane label="退出" name="exit">
        <logout></logout>
      </el-tab-pane>
      <el-tab-pane label="后台" name="admin">
        <admin></admin>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getMemberToken } from '@/utils/userinfo'
import Info from './components/info'
import Edit from './components/edit'
import Avatar from './components/avatar'
import Pwd from './components/pwd'
import Log from './components/log'
import Logout from './components/logout'
import Admin from './components/admin'

export default {
  name: 'Member',
  components: { Info, Edit, Avatar, Pwd, Log, Logout, Admin },
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
      const token = getMemberToken()
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

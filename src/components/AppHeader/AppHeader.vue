<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="12">
        <a href="./">
          <img src="@/assets/img/logo.png" width="60" height="60" alt="" srcset="" />
        </a>
      </el-col>
      <el-col :span="12">
        <el-row v-if="islogin" :gutter="0">
          <el-col class="nav-item" :span="4" :offset="20">
            <router-link class="nav-a" to="/member" title="个人中心">
              <el-avatar v-if="avatar" class="nav-avatar" shape="circle" fit="contain" :size="40" :src="avatar" />
              <span v-else :title="nickname">个人中心</span>
            </router-link>
          </el-col>
        </el-row>
        <el-row v-else :gutter="0">
          <el-col class="nav-item" :span="4" :offset="12">
            <router-link class="nav-a" to="/login">登录</router-link>
          </el-col>
          <el-col class="nav-item" :span="4">
            <router-link class="nav-a" to="/register">注册</router-link>
          </el-col>
          <el-col class="nav-item" :span="4">
            <router-link class="nav-a" to="/user">个人中心</router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider class="divider"></el-divider>
  </div>
</template>

<script>
import { getApiToken, getNickname, getAvatar } from '@/utils/userinfo'

export default {
  name: 'AppHeader',
  data () {
    return {
      islogin: false,
      nickname: '',
      avatar: ''
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      const token = getApiToken()
      if (token) {
        this.nickname = getNickname()
        this.avatar = getAvatar()
        this.islogin = true
      }
    }
  }
}
</script>

<style scoped>
.nav-item {
  line-height: 60px;
}
.nav-a {
  line-height: 0;
  text-decoration: none;
  color: black;
}
.nav-avatar {
  vertical-align: middle;
}
.divider {
  margin: 3px 0;
}
</style>11

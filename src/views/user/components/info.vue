<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="form" :model="model" :rules="rules" label-width="120px">
            <el-form-item label="头像" prop="avatar">
              <el-avatar v-if="model.avatar" shape="circle" fit="contain" :size="100" :src="model.avatar" />
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-input v-model="model.username" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="model.nickname" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="model.phone" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="model.email" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="登录次数" prop="login_num">
              <el-input v-model="model.login_num" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="登录IP" prop="login_ip">
              <el-input v-model="model.login_ip" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="登录地区" prop="login_region">
              <el-input v-model="model.login_region" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="登陆时间" prop="login_time">
              <el-input v-model="model.login_time" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="注册时间" prop="create_time">
              <el-input v-model="model.create_time" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="userInfo()">刷新</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { userInfo } from '@/apis/user'
import { getToken } from '@/utils/userinfo'

export default {
  name: 'UserInfo',
  data () {
    return {
      loading: false,
      model: {},
      rules: {}
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      const token = getToken()
      if (token) {
        this.userInfo()
      }
    },
    userInfo () {
      this.loading = true
      userInfo()
        .then(res => {
          this.model = res.data
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          this.$message({ message: err.msg, type: 'error' })
        })
    }
  }
}
</script>

<style>
</style>

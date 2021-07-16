<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="form" :model="model" :rules="rules" label-width="120px">
            <el-form-item label="头像" prop="avatar_url">
              <el-avatar v-if="model.avatar_url" shape="circle" fit="contain" :size="100" :src="model.avatar_url" />
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
            <el-form-item label="地区" prop="region_id">
              <el-cascader v-model="model.region_id" :options="regionTree" :props="regionProps" placeholder="" style="width:100%" />
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
              <el-button @click="info()">刷新</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { tree } from '@/apis/region'
import { info } from '@/apis/member'
import { getMemberToken } from '@/utils/userinfo'

export default {
  name: 'MemberInfo',
  data () {
    return {
      loading: false,
      model: {},
      regionTree: [],
      regionProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'region_id',
        label: 'region_name'
      },
      rules: {}
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      const token = getMemberToken()
      if (token) {
        this.info()
      }
    },
    info () {
      this.loading = true
      tree().then(res => {
        this.regionTree = res.data
      }).catch((err) => {
        this.$message.error(err.msg)
      })
      info().then(res => {
        this.model = res.data
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this.$message.error(err.msg)
      })
    }
  }
}
</script>

<style>
</style>

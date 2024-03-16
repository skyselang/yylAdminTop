<template>
  <el-card v-loading="loading">
    <el-form ref="form" :model="model" :rules="rules" label-width="120px">
      <el-form-item label="头像" prop="avatar_url">
        <div class="h-[100px]">
          <el-avatar v-if="model.avatar_url" shape="circle" :size="100" :src="model.avatar_url" />
        </div>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="model.nickname" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="model.phone" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="model.email" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="所在地" prop="region_id">
        <el-cascader
          v-model="model.region_id"
          :options="regionTree"
          :props="regionProps"
          style="width: 100%"
          disabled
        />
      </el-form-item>
      <el-form-item label="登录次数" prop="login_num">
        <el-input v-model="model.login_num" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="登录IP" prop="login_ip">
        <el-input v-model="model.login_ip" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="登录地区" prop="login_region">
        <el-input v-model="model.login_region" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="登陆时间" prop="login_time">
        <el-input v-model="model.login_time" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="注册时间" prop="create_time">
        <el-input v-model="model.create_time" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item>
        <el-button @click="info()">刷新</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { tree } from '@/api/region'
import { info } from '@/api/member'
import { useUserStoreHook } from '@/store/modules/user'

export default {
  name: 'MemberInfo',
  data() {
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
  created() {
    this.info()
  },
  methods: {
    info() {
      this.loading = true
      tree()
        .then((res) => {
          this.regionTree = res.data.list
        })
        .catch(() => {})
      info()
        .then((res) => {
          const userStore = useUserStoreHook()
          userStore.setUserinfo(res.data)
          this.model = res.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

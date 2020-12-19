<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="form" :model="model" :rules="rules" label-width="120px">
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
              <el-cascader v-model="model.region_id" :options="regionTree" :props="regionProps" @change="regionChange" placeholder="请选择所在地区" style="width:100%" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">提交</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { userInfo, userEdit } from '@/apis/user'
import { getToken } from '@/utils/userinfo'

export default {
  name: 'UserEdit',
  components: {},
  data () {
    return {
      loading: false,
      model: {
        member_id: '',
        username: '',
        phone: '',
        email: '',
        region_id: ''
      },
      regionTree: [],
      regionProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'region_id',
        label: 'region_name'
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }]
      }
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
      userInfo().then(res => {
        this.model = res.data.member_info
        this.regionTree = res.data.region_tree
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this.$message({ message: err.msg, type: 'error' })
      })
    },
    // 地区选择
    regionChange (value) {
      if (value) {
        this.model.region_id = value[value.length - 1]
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          userEdit(this.model).then(res => {
            this.userInfo()
            this.loading = false
            this.$message({ message: res.msg, type: 'success' })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.userInfo()
    }
  }
}
</script>

<style>
</style>

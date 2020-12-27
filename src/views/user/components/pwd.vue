<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="usersRef" :rules="usersRules" :model="usersModel" label-width="120px">
            <el-form-item label="旧密码" prop="password_old">
              <el-input v-model="usersModel.password_old" type="password" autocomplete="off" placeholder="请输入旧密码" clearable show-password />
            </el-form-item>
            <el-form-item label="新密码" prop="password_new">
              <el-input v-model="usersModel.password_new" type="password" autocomplete="off" placeholder="请输入新密码" clearable show-password />
            </el-form-item>
            <el-form-item>
              <el-button @click="usersReset">重置</el-button>
              <el-button type="primary" @click="usersSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { userPwd } from '@/apis/user'

export default {
  name: 'UserPwd',
  components: {},
  data () {
    return {
      usersModel: {
        password_old: '',
        password_new: ''
      },
      usersRules: {
        password_old: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        password_new: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      }
    }
  },
  created () {},
  methods: {
    usersReset () {
      this.$refs['usersRef'].resetFields()
    },
    usersSubmit () {
      this.$refs['usersRef'].validate(valid => {
        if (valid) {
          userPwd(this.usersModel).then(res => {
            this.$message.success(res.msg)
            this.usersReset()
          })
        }
      })
    }
  }
}
</script>

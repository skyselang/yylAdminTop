<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="ref" :model="model" :rules="rules" label-width="120px">
            <el-form-item label="旧密码" prop="password_old">
              <el-input v-model="model.password_old" type="password" autocomplete="off" placeholder="请输入旧密码" clearable show-password />
            </el-form-item>
            <el-form-item label="新密码" prop="password_new">
              <el-input v-model="model.password_new" type="password" autocomplete="off" placeholder="请输入新密码" clearable show-password />
            </el-form-item>
            <el-form-item>
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { pwd } from '@/apis/member'

export default {
  name: 'MemberPwd',
  components: {},
  data () {
    return {
      model: {
        password_old: '',
        password_new: ''
      },
      rules: {
        password_old: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        password_new: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      }
    }
  },
  created () {},
  methods: {
    reset () {
      this.$refs['ref'].resetFields()
    },
    submit () {
      this.$refs['ref'].validate(valid => {
        if (valid) {
          pwd(this.model).then(res => {
            this.$message.success(res.msg)
            this.reset()
          })
        }
      })
    }
  }
}
</script>

<template>
  <el-card>
    <el-form ref="ref" :model="model" :rules="rules" label-width="120px">
      <el-form-item v-if="member.pwd_edit_type == 0" label="旧密码" prop="password_old">
        <el-input
          v-model="model.password_old"
          type="password"
          autocomplete="off"
          placeholder="请输入旧密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item label="新密码" prop="password_new">
        <el-input
          v-model="model.password_new"
          type="password"
          autocomplete="off"
          placeholder="请输入新密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { ElMessage } from 'element-plus'
import { pwd, info } from '@/api/member'

export default {
  name: 'MemberPwd',
  components: {},
  data() {
    return {
      member: {},
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
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      info()
        .then((res) => {
          this.member = res.data
        })
        .catch((err) => {
          ElMessage.error(err.msg)
        })
    },
    reset() {
      this.$refs['ref'].resetFields()
    },
    submit() {
      this.$refs['ref'].validate((valid) => {
        if (valid) {
          pwd(this.model)
            .then((res) => {
              ElMessage.success(res.msg)
              this.getInfo()
              this.reset()
            })
            .catch()
        }
      })
    }
  }
}
</script>

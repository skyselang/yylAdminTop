<template>
  <el-row v-loading="loading" class="mt">
    <el-col :span="8" :offset="8">
      <el-form ref="form" :model="model" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="model.title" type="text" clearable placeholder="反馈标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="model.content" type="textarea" clearable placeholder="反馈内容" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="model.mobile" type="text" clearable placeholder="手机" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="model.email" type="text" clearable placeholder="邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from 'element-plus'
import { feedback } from '@/api/feedback'

export default {
  name: 'Feedback',
  data() {
    return {
      loading: false,
      model: {
        title: '',
        content: '',
        mobile: '',
        email: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          feedback(this.model)
            .then(() => {
              this.loading = false
              ElMessage.success('反馈成功')
              this.$router.push('/')
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

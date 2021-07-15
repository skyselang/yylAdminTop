<template>
  <div v-loading="loading">
    <el-row :gutter="0" class="form">
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="model" :rules="rules" label-width="80px">
          <el-form-item label="称呼" prop="call">
            <el-input v-model="model.call" type="text" clearable placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="model.mobile" type="text" clearable placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="model.title" type="text" clearable placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="model.content" type="textarea" clearable placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { comment } from '@/apis/comment'

export default {
  name: 'Comment',
  data () {
    return {
      loading: false,
      model: {
        call: '',
        mobile: '',
        title: '',
        content: ''
      },
      rules: {
        call: [{ required: true, message: '请输入称呼', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  created () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          comment(this.model).then(res => {
            this.loading = false
            this.$message.success('留言成功')
            this.$router.push('/login')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.form {
  padding-top: 100px;
}
</style>

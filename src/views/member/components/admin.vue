<template>
  <el-card>
    <el-form ref="form" :model="model" label-width="120px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="model.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="model.password" />
      </el-form-item>
      <el-form-item>
        <el-link :href="model.adminurl" underline="never" target="_blank">
          <el-button type="primary">后台</el-button>
        </el-link>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
defineOptions({
  name: 'MemberAdmin'
})

const model = ref({
  username: 'admin、yyladmin',
  password: '123456',
  adminurl: 'https://admin.yyladmin.top/#/login'
})
</script>

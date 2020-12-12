<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="form" label-width="120px">
            <el-form-item label="账号" prop="username">
              <el-input v-model="model.username" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="model.password" type="text" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-link :href="model.adminurl" class="el-link" target="_blank">
                <el-button type="primary">
                  后台
                </el-button>
              </el-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'UserAdmin',
  components: {},
  data () {
    return {
      model: {
        username: 'admin、yyladmin',
        password: '123456',
        adminurl: 'https://admin.yyladmin.top/#/login'
      }
    }
  },
  created () { },
  methods: {}
}
</script>

<style scoped>
.el-link {
  color: white;
}
</style>

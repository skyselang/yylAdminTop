<template>
  <el-tabs v-loading="loading" v-model="tabActName">
    <el-tab-pane label="信息" name="info" lazy>
      <Info />
    </el-tab-pane>
    <el-tab-pane label="修改" name="edit" lazy>
      <Edit />
    </el-tab-pane>
    <el-tab-pane label="密码" name="pwd" lazy>
      <Pwd />
    </el-tab-pane>
    <el-tab-pane label="日志" name="log" lazy>
      <Log />
    </el-tab-pane>
    <el-tab-pane label="第三方账号" name="third" lazy>
      <Third />
    </el-tab-pane>
    <el-tab-pane label="后台" name="admin" lazy>
      <Admin />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Info from './components/info.vue'
import Edit from './components/edit.vue'
import Pwd from './components/pwd.vue'
import Log from './components/log.vue'
import Third from './components/third.vue'
import Admin from './components/admin.vue'

export default {
  name: 'Member',
  components: { Info, Edit, Pwd, Log, Third, Admin },
  data() {
    return {
      loading: false,
      tabActName: 'info'
    }
  }
}
</script>

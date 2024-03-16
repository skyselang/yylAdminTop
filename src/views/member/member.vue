<template>
  <el-tabs>
    <el-tab-pane label="个人信息" lazy>
      <Info />
    </el-tab-pane>
    <el-tab-pane label="修改资料" lazy>
      <Edit />
    </el-tab-pane>
    <el-tab-pane label="修改密码" lazy>
      <Pwd />
    </el-tab-pane>
    <el-tab-pane label="我的日志" lazy>
      <Log />
    </el-tab-pane>
    <el-tab-pane label="我的反馈" lazy>
      <Feedback />
    </el-tab-pane>
    <el-tab-pane label="第三方账号" lazy>
      <Third />
    </el-tab-pane>
    <el-tab-pane label="系统后台" lazy>
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
import Feedback from './components/feedback.vue'
import Admin from './components/admin.vue'

export default {
  name: 'Member',
  components: { Info, Edit, Pwd, Log, Third, Feedback, Admin },
  data() {
    return {}
  }
}
</script>

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
    <el-tab-pane label="退出" lazy>
      <Logout />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
defineOptions({
  name: 'Member'
})
</script>

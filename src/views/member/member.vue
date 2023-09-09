<template>
  <div v-loading="loading">
    <el-tabs v-model="tabActName">
      <el-tab-pane label="信息" name="info" lazy>
        <info></info>
      </el-tab-pane>
      <el-tab-pane label="修改" name="edit" lazy>
        <edit></edit>
      </el-tab-pane>
      <el-tab-pane label="密码" name="pwd" lazy>
        <pwd></pwd>
      </el-tab-pane>
      <el-tab-pane label="日志" name="log" lazy>
        <log></log>
      </el-tab-pane>
      <el-tab-pane label="第三方账号" name="third" lazy>
        <third></third>
      </el-tab-pane>
      <el-tab-pane label="退出" name="exit" lazy>
        <logout></logout>
      </el-tab-pane>
      <el-tab-pane label="后台" name="admin" lazy>
        <admin></admin>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Info from "./components/info";
import Edit from "./components/edit";
import Pwd from "./components/pwd";
import Log from "./components/log";
import Third from "./components/third";
import Logout from "./components/logout";
import Admin from "./components/admin";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Member",
  components: { Info, Edit, Pwd, Log, Third, Logout, Admin },
  data() {
    return {
      loading: false,
      tabActName: "info",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
</style>

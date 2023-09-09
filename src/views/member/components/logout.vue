<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="form" label-width="120px">
            <el-form-item>
              <el-button type="primary" @click="submit">退出</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { logout } from "@/api/login";
import { delApiToken, delUserInfo } from "@/utils/userinfo";

export default {
  name: "MemberLogout",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    submit() {
      logout(this.usersModel).then((res) => {
        this.$message.success(res.msg);
        delApiToken();
        delUserInfo();
        window.location.href = "./";
      });
    },
  },
};
</script>

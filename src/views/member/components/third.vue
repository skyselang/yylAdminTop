<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="thirdBind('qq')"
        >绑定QQ</el-button
      >
      <el-button class="filter-item" type="primary" @click="thirdBind('wb')"
        >绑定微博</el-button
      >
      <el-button
        class="filter-item"
        type="primary"
        style="float: right"
        @click="thirdRefresh"
        >刷新</el-button
      >
    </div>
    <el-table
      v-loading="loading"
      :data="thirdData"
      :height="height"
      style="width: 100%"
      border
    >
      <el-table-column prop="platform_name" label="平台" min-width="100" />
      <el-table-column prop="application_name" label="应用" min-width="120" />
      <el-table-column prop="headimgurl" label="头像" min-width="50">
        <template slot-scope="scope">
          <div style="height: 50px">
            <el-image
              style="width: 50px; height: 50px; border-radius: 50%"
              :src="scope.row.headimgurl"
              :preview-src-list="[scope.row.headimgurl]"
              fit="contain"
              title="点击看大图"
            >
              <div slot="error" class="image-slot">
                <el-avatar :size="50" icon="el-icon-user-solid" />
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" min-width="150" />
      <el-table-column prop="create_time" label="时间" min-width="155" />
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="thirdUnbind(scope.row)"
            >解绑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getApiToken } from "@/utils/userinfo";
import { thirdList, thirdUnbind } from "@/api/member";

export default {
  name: "MemberThird",
  components: {},
  data() {
    return {
      height: 680,
      loading: false,
      thirdData: [],
    };
  },
  created() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      const token = getApiToken();
      if (token) {
        this.thirdList();
      }
    },
    // 第三方账号绑定
    thirdBind(app = "qq") {
      const tokenName = process.env.VUE_APP_TOKEN_NAME;
      const token = getApiToken();
      const baseUrl = process.env.VUE_APP_BASE_API;
      const loginUrl =
        baseUrl +
        "/api/member.Member/bindWebsite?app=" +
        app +
        "&jump_url=" +
        window.location.href +
        "&" +
        tokenName +
        "=" +
        token;
      window.open(loginUrl);
    },
    // 第三方列表
    thirdList() {
      this.loading = true;
      thirdList()
        .then((res) => {
          this.thirdData = res.data.list;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 第三方刷新
    thirdRefresh() {
      this.thirdList();
    },
    // 第三方解绑
    thirdUnbind(row) {
      this.loading = true;
      thirdUnbind({ third_id: row.third_id })
        .then(() => {
          this.thirdList();
          this.$message.success("解绑成功");
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

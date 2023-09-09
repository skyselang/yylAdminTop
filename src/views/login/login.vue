<template>
  <div v-loading="loading">
    <el-row :gutter="0" class="form">
      <el-col :span="8" :offset="8">
        <el-form ref="form" :model="model" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="account">
            <el-input
              v-model="model.account"
              type="text"
              clearable
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="model.password"
              type="password"
              clearable
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="验证码"
            v-if="captcha_switch"
            prop="captcha_code"
          >
            <el-col :span="12">
              <el-input
                ref="captcha_code_ipt"
                v-model="model.captcha_code"
                type="text"
                placeholder="请输入验证码"
                prefix-icon="el-icon-picture"
                autocomplete="off"
                style="height: 40px; line-height: 40px"
                clearable
              />
            </el-col>
            <el-col :span="12">
              <el-image
                :src="captcha_src"
                fit="fill"
                alt="验证码"
                title="点击刷新验证码"
                style="height: 40px; float: right"
                @click="captchaRefresh"
              />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button type="primary" @click="submitForm('form')"
              >登录</el-button
            >
          </el-form-item>
          <el-form-item label="">
            <a href="#" @click="thirdLogin('qq')">
              <img
                src="@/assets/img/qq-login230x48.png"
                style="vertical-align: middle"
                alt="QQ登录"
              />
            </a>
          </el-form-item>
          <el-form-item label="">
            <a href="#" @click="thirdLogin('wb')">
              <img
                src="@/assets/img/weibo-login-48.png"
                style="vertical-align: middle"
                alt="微博登录"
              />
            </a>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { captcha, login } from "@/api/login";
import { getApiToken, setUserInfo, setApiToken } from "@/utils/userinfo";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      loading: false,
      captcha_switch: 0,
      captcha_src: "",
      model: {
        account: "",
        password: "",
        captcha_id: "",
        captcha_code: "",
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha_code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.isLogin();
    this.getCaptcha();
    this.thirdLoginRes();
  },
  methods: {
    isLogin() {
      const token = getApiToken();
      if (token) {
        this.$router.push("/member");
      }
    },
    // 验证码配置
    getCaptcha() {
      captcha().then((res) => {
        this.captcha_switch = res.data.captcha_switch;
        if (res.data.captcha_switch) {
          this.captcha_src = res.data.captcha_src;
          this.model.captcha_id = res.data.captcha_id;
        }
      });
    },
    // 验证码刷新
    captchaRefresh() {
      this.model.captcha_id = "";
      this.model.captcha_code = "";
      this.getCaptcha();
      // this.$refs.captcha_code_ipt.focus()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          login(this.model)
            .then((res) => {
              setApiToken(res.data.ApiToken);
              setUserInfo(res.data);
              this.loading = false;
              this.$message.success(res.msg);
              this.$router.push("/member");
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 第三方登录
    thirdLogin(app = "qq") {
      const baseUrl = process.env.VUE_APP_BASE_API;
      const loginUrl =
        baseUrl +
        "/api/member.Login/website?app=" +
        app +
        "&jump_url=" +
        window.location.href;
      window.open(loginUrl);
    },
    thirdLoginRes() {
      const urlParam = this.getUrlParams();
      if (urlParam) {
        const tokenName = process.env.VUE_APP_TOKEN_NAME;
        const token = urlParam[tokenName];
        if (token) {
          setApiToken(token);
          this.$router.push("/member");
        }
      }
    },
    getUrlParams() {
      // 获取当前页面的完整URL
      var url = window.location.href;
      // 将URL拆分成各个部分
      var urlParts = url.split("?");
      // 获取URL中的查询字符串部分
      var queryString = urlParts[1];
      // 将查询字符串拆分成键值对
      var queryParameters = {};
      if (queryString) {
        queryString.split("&").forEach(function (part) {
          var paramParts = part.split("=");
          queryParameters[paramParts[0]] = paramParts[1];
        });
      }
      return queryParameters;
    },
  },
};
</script>

<style scoped>
.form {
  padding-top: 100px;
}
</style>

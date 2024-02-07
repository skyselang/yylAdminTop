<template>
  <div>
    <el-row :gutter="0">
      <el-col class="ya-text-center" :span="24">
        <h1 class="ya-slogan-title">yylAdmin</h1>
        <p class="ya-slogan-image"><img src="@/assets/img/logo.png" /></p>
        <h3 class="ya-slogan-desc">基于ThinkPHP8和Vue3的极简后台管理系统</h3>
      </el-col>
    </el-row>

    <el-row :gutter="5" class="ya-guide">
      <el-col class="ya-text-center" :span="24">
        <el-button round>
          <el-link
            href="http://skyselang.gitee.io/yyladmindoc/"
            target="_blank"
          >
            <img
              class="ya-guide-img"
              src="@/assets/img/logo.png"
              alt="Gitee"
              width="18"
              height="18"
            />
            文档
          </el-link>
        </el-button>
        <el-button round>
          <el-link href="https://gitee.com/skyselang/yylAdmin/" target="_blank">
            <img
              class="ya-guide-img"
              src="@/assets/img/gitee.png"
              alt="Gitee"
              width="18"
              height="18"
            />
            Gitee
          </el-link>
        </el-button>
        <el-button round>
          <el-link
            href="https://github.com/skyselang/yylAdmin/"
            target="_blank"
          >
            <img
              class="ya-guide-img"
              src="@/assets/img/github.png"
              alt="Github"
              width="18"
              height="18"
            />
            Github
          </el-link>
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="intro">
      <el-col class="ya-text-center" :xs="24" :sm="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>前后分离</span>
          </div>
          <div class="text item">
            前后分离开发模式，开发更清晰，分工更明确，提升开发效率，API交互，JWT认证。
          </div>
        </el-card>
      </el-col>
      <el-col class="ya-text-center" :xs="24" :sm="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>简单轻量</span>
          </div>
          <div class="text item">
            快速、简单、轻量，保持出色的性能和至简代码的同时，更注重易用性，上手容易。
          </div>
        </el-card>
      </el-col>
      <el-col class="ya-text-center" :xs="24" :sm="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>免费开源</span>
          </div>
          <div class="text item">
            遵守开源协议，无需任何授权即可商业化使用，代码全部免费开源，没有任何加密。
          </div>
        </el-card>
      </el-col>
      <el-col class="ya-text-center" :xs="24" :sm="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>开箱即用</span>
          </div>
          <div class="text item">
            登录退出、权限管理、日志管理、接口文档等基本功能，前后台基础框架，安装后即可使用。
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Index",
  data() {
    return {};
  },
};
</script>

<style scoped>
.ya-slogan-title {
  color: #2d99bb;
  font-weight: 600;
}

.ya-slogan-image {
  padding-top: 20px;
}

.ya-slogan-desc {
  padding-top: 20px;
  font-weight: 400;
}

.ya-guide-img {
  vertical-align: middle;
}

.intro {
  padding-top: 20px;
}
.ya-text-center {
  text-align: center;
}
</style>

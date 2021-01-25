<template>
  <div>
    <el-row :gutter="0">
      <el-col class="yyl-text-center" :span="24">
        <h1 class="yyl-slogan-title">yylAdmin</h1>
        <p class="yyl-slogan-image"><img src="@/assets/img/logo.png"></p>
        <h3 class="yyl-slogan-desc">基于ThinkPHP6和Vue2的极简后台管理系统</h3>
      </el-col>
    </el-row>

    <el-row :gutter="5" class="yyl-guide">
      <el-col class="yyl-text-center" :span="24">
        <el-button round>
          <el-link href="https://gitee.com/skyselang/yylAdmin/blob/master/README.gitee.md" target="_blank">
            <img class="yyl-guide-img" src="@/assets/img/logo.png" alt="Gitee" width="18" height="18" /> 起步
          </el-link>
        </el-button>
        <el-button round>
          <el-link href="https://gitee.com/skyselang/yylAdmin/" target="_blank">
            <img class="yyl-guide-img" src="@/assets/img/gitee.png" alt="Gitee" width="18" height="18" /> Gitee
          </el-link>
        </el-button>
        <el-button round>
          <el-link href="https://github.com/skyselang/yylAdmin/" target="_blank">
            <img class="yyl-guide-img" src="@/assets/img/github.png" alt="Github" width="18" height="18" /> Github
          </el-link>
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="intro">
      <el-col class="yyl-text-center" :xs="24" :sm="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>简单轻量</span>
          </div>
          <div class="text item">
            快速、简单、轻量，保持出色的性能和至简代码的同时，更注重易用性，上手简单。
          </div>
        </el-card>
      </el-col>
      <el-col class="yyl-text-center" :xs="24" :sm="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>开箱即用</span>
          </div>
          <div class="text item">
            登录退出、权限管理、日志管理等基本功能，前后台基础框架，安装后即可使用。
          </div>
        </el-card>
      </el-col>
      <el-col class="yyl-text-center" :xs="24" :sm="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>前后分离</span>
          </div>
          <div class="text item">
            前端后端分离，并行开发，提高效率，API、JSON数据交互，JWT用户认证。
          </div>
        </el-card>
      </el-col>
      <el-col class="yyl-text-center" :xs="24" :sm="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>免费开源</span>
          </div>
          <div class="text item">
            Apache2开源协议，无需授权即可商业使用，代码免费开源，无任何加密。
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {}
  }
}
</script>

<style scoped>
.yyl-slogan-title {
  color: #2d99bb;
  font-weight: 600;
}

.yyl-slogan-image {
  padding-top: 20px;
}

.yyl-slogan-desc {
  padding-top: 20px;
  font-weight: 400;
}

.yyl-guide-img {
  vertical-align: middle;
}

.intro {
  padding-top: 20px;
}
.yyl-text-center {
  text-align: center;
}
</style>

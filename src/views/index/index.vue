<template>
  <el-row>
    <el-col class="text-center mb">
      <el-text class="text-2xl" size="large" type="primary">yylAdmin</el-text>
    </el-col>
    <el-col class="text-center mb">
      <el-image :src="Logo" style="height: 250px">
        <template #error>
          <el-text>logo</el-text>
        </template>
      </el-image>
    </el-col>
    <el-col class="text-center mb">
      <el-text>基于ThinkPHP8和Vue3的极简后台管理系统</el-text>
    </el-col>
  </el-row>

  <el-row :gutter="5">
    <el-col class="text-center">
      <el-button round>
        <el-link href="http://skyselang.gitee.io/yyladmindoc/" :underline="false" target="_blank">
          <el-image :src="Logo" style="height: 18px">
            <template #error>
              <el-text />
            </template>
          </el-image>
          <el-text>文档</el-text>
        </el-link>
      </el-button>
      <el-button round>
        <el-link href="https://gitee.com/skyselang/yylAdmin/" :underline="false" target="_blank">
          <el-image :src="Gitee" style="height: 18px">
            <template #error>
              <el-text />
            </template>
          </el-image>
          <el-text>Gitee</el-text>
        </el-link>
      </el-button>
      <el-button round>
        <el-link href="https://github.com/skyselang/yylAdmin/" :underline="false" target="_blank">
          <el-image :src="Github" style="height: 18px">
            <template #error>
              <el-text />
            </template>
          </el-image>
          <el-text>Github</el-text>
        </el-link>
      </el-button>
    </el-col>
  </el-row>

  <el-row class="mt">
    <el-col :span="16" :offset="4">
      <el-table :data="versions" border>
        <el-table-column prop="version" label="版本" min-width="60" />
        <el-table-column prop="branch" label="分支" min-width="80">
          <template #default="scope">
            <el-link :href="scope.row.href" :underline="false" type="primary" target="_blank">
              {{ scope.row.branch }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="简介" min-width="300" />
        <el-table-column prop="dev" label="环境" min-width="250" />
      </el-table>
    </el-col>
  </el-row>

  <el-row :gutter="10" class="mt">
    <el-col class="text-center" :xs="24" :sm="6">
      <el-card>
        <template #header>
          <el-text>前后分离</el-text>
        </template>
        <el-text>
          前后分离开发模式，开发更清晰，分工更明确，提升开发效率，API交互，JWT认证。
        </el-text>
      </el-card>
    </el-col>
    <el-col class="text-center" :xs="24" :sm="6">
      <el-card>
        <template #header>
          <el-text>简单轻量</el-text>
        </template>
        <el-text>
          快速、简单、轻量，保持出色的性能和至简代码的同时，更注重易用性，上手容易。
        </el-text>
      </el-card>
    </el-col>
    <el-col class="text-center" :xs="24" :sm="6">
      <el-card>
        <template #header>
          <el-text>免费开源</el-text>
        </template>
        <el-text>
          遵守开源协议，无需任何授权即可商业化使用，代码全部免费开源，没有任何加密。
        </el-text>
      </el-card>
    </el-col>
    <el-col class="text-center" :xs="24" :sm="6">
      <el-card>
        <template #header>
          <el-text>开箱即用</el-text>
        </template>
        <el-text>
          登录退出、权限管理、日志管理、接口文档等基本功能，前后台基础框架，安装后即可使用。
        </el-text>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import Logo from '@/assets/images/logo.png'
import Gitee from '@/assets/images/gitee.png'
import Github from '@/assets/images/github.png'

defineOptions({
  name: 'Index'
})

const versions = [
  {
    version: 'v4',
    branch: 'master',
    href: 'https://gitee.com/skyselang/yylAdmin',
    desc: 'thinkphp8 vue3 element-plus',
    dev: 'php8.0 node18'
  },
  {
    version: 'v3',
    branch: 'v3',
    href: 'https://gitee.com/skyselang/yylAdmin/tree/v3/',
    desc: 'thinkphp6 vue2 element-ui',
    dev: 'php7.3 node12'
  }
]
</script>

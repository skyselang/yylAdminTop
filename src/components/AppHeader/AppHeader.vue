<template>
  <el-row>
    <el-col>
      <el-menu mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/">
          <img class="h-[40px]" :src="logo" alt="logo" />
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item v-if="token" index="/content">内容</el-menu-item>
        <el-menu-item v-if="token" index="/file">文件</el-menu-item>
        <el-menu-item index="demo">
          <el-link @click="openUrl('https://doc.yyladmin.top/guide/demo.html')">演示</el-link>
        </el-menu-item>
        <el-menu-item index="top">
          <el-link @click="openUrl('https://doc.yyladmin.top/')">文档</el-link>
        </el-menu-item>
        <el-menu-item index="gitee">
          <el-link @click="openUrl('https://gitee.com/skyselang/yylAdmin/')">Gitee</el-link>
        </el-menu-item>
        <el-menu-item v-if="token" index="/member">
          <el-avatar
            v-if="member.avatar_url"
            :src="member.avatar_url"
            :size="30"
            class="v-middle"
            shape="circle"
            title="个人中心"
          />
          <el-text v-else :title="member.nickname">个人中心</el-text>
        </el-menu-item>
        <el-menu-item v-else index="/login">登录</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import logo from '@/assets/images/logo.png'
import { setToken } from '@/utils/index'
import { useMemberStore } from '@/store/modules/member'

const memberStore = useMemberStore()
const { token, member } = storeToRefs(memberStore)

function openUrl(url) {
  window.open(url, '_blank')
}

onMounted(() => {
  setToken()
})
</script>

<template>
  <el-button class="filter-item" type="primary" @click="thirdBind('qq')">绑定QQ</el-button>
  <el-button class="filter-item" type="primary" @click="thirdBind('wb')">绑定微博</el-button>
  <el-button class="filter-item" type="primary" @click="thirdRefresh">刷新</el-button>

  <el-table v-loading="loading" :data="thirdData">
    <el-table-column prop="platform_name" label="平台" min-width="100" />
    <el-table-column prop="application_name" label="应用" min-width="120" />
    <el-table-column prop="headimgurl" label="头像" min-width="50">
      <template #default="scope">
        <el-image
          style="width: 30px; height: 30px; border-radius: 30%"
          :src="scope.row.headimgurl"
          :preview-src-list="[scope.row.headimgurl]"
          title="点击看大图"
        >
          <template #error>
            <el-avatar :size="30" />
          </template>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column prop="nickname" label="昵称" min-width="150" />
    <el-table-column prop="create_time" label="时间" min-width="155" />
    <el-table-column label="操作" width="100">
      <template #default="scope">
        <el-link type="primary" :underline="false" @click="thirdUnbind(scope.row)">解绑</el-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { ElMessage } from 'element-plus'
import { useUserStoreHook } from '@/store/modules/user'
import { useSettingsStoreHook } from '@/store/modules/settings'
import { thirdList, thirdUnbind } from '@/api/member'

export default {
  name: 'MemberThird',
  data() {
    return {
      loading: false,
      thirdData: []
    }
  },
  created() {
    this.thirdList()
  },
  methods: {
    // 第三方列表
    thirdList() {
      this.loading = true
      thirdList()
        .then((res) => {
          this.thirdData = res.data.list
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 第三方刷新
    thirdRefresh() {
      this.thirdList()
    },
    // 第三方绑定
    thirdBind(app = 'qq') {
      const userStore = useUserStoreHook()
      const settingsStore = useSettingsStoreHook()
      const tokenName = settingsStore.tokenName
      const token = userStore.getToken()
      const baseUrl = import.meta.env.VITE_APP_BASE_URL
      const loginUrl =
        baseUrl +
        '/api/member.Member/bindWebsite?app=' +
        app +
        '&jump_url=' +
        window.location.href +
        '&' +
        tokenName +
        '=' +
        token
      window.open(loginUrl)
    },
    // 第三方解绑
    thirdUnbind(row) {
      this.loading = true
      thirdUnbind({ third_id: row.third_id })
        .then(() => {
          this.thirdList()
          ElMessage.success('解绑成功')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

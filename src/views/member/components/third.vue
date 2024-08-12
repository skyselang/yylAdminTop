<template>
  <el-button type="primary" @click="bindWebsite('qq')">绑定QQ</el-button>
  <el-button type="primary" @click="bindWebsite('wb')">绑定微博</el-button>
  <el-button v-if="isdev" type="primary" @click="bindOffiacc('wx')">绑定公众号</el-button>
  <el-button type="primary" @click="refresh">刷新</el-button>

  <el-table v-loading="loading" :data="data" :height="height">
    <el-table-column prop="platform_name" label="平台" min-width="100" />
    <el-table-column prop="application_name" label="应用" min-width="120" />
    <el-table-column prop="headimgurl" label="头像" min-width="50">
      <template #default="scope">
        <el-image
          class="w-[30px] h-[30px] rd-[30px]"
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
    <el-table-column prop="create_time" label="时间" min-width="165" />
    <el-table-column label="操作" width="100">
      <template #default="scope">
        <el-link type="primary" :underline="false" @click="unbind(scope.row)">解绑</el-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { useSettingsStore } from '@/store/modules/settings'
import { useMemberStore } from '@/store/modules/member'
import { thirdList, thirdUnbind } from '@/api/member'
defineOptions({
  name: 'MemberThird'
})

const isdev = import.meta.env.DEV
const baseUrl = import.meta.env.VITE_APP_BASE_URL
const redirectUri = 'http://127.0.0.1:9526/api/member.Login/redirectUri'
const settingsStore = useSettingsStore()
const memberStore = useMemberStore()
const tokenName = settingsStore.tokenName
const tokenValue = memberStore.getToken()
const height = ref(500)
const loading = ref(false)
const data = ref([])

// 列表
function list() {
  loading.value = true
  thirdList()
    .then((res) => {
      data.value = res.data.list
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
// 刷新
function refresh() {
  list()
}
// 绑定
function bindWebsite(app = 'qq') {
  const apiUrl = '/api/member.Member/bindWebsite'
  let params = new URLSearchParams()
  params.append('app', app)
  params.append('redirect_uri', isdev ? redirectUri : '')
  params.append('jump_url', window.location.href)
  params.append(tokenName, tokenValue)
  let loginUrl = baseUrl + apiUrl + '?' + params.toString()
  window.open(loginUrl)
}
function bindOffiacc(app = 'wx') {
  const apiUrl = '/api/member.Member/bindOffiacc'
  let params = new URLSearchParams()
  params.append('app', app)
  params.append('redirect_uri', isdev ? redirectUri : '')
  params.append('jump_url', window.location.href)
  params.append(tokenName, tokenValue)
  let loginUrl = baseUrl + apiUrl + '?' + params.toString()
  window.open(loginUrl)
}
// 解绑
function unbind(row) {
  loading.value = true
  thirdUnbind({ third_id: row.third_id })
    .then(() => {
      thirdList()
      ElMessage.success('解绑成功')
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

onMounted(() => {
  list()
})
</script>

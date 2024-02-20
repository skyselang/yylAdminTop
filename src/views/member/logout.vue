<template>
  <el-result class="mt" icon="info" title="logout" sub-title="正在退出..." />
</template>

<script>
import { logout } from '@/api/login'
import { useUserStoreHook } from '@/store/modules/user'

export default {
  name: 'MemberLogout',
  data() {
    return {}
  },
  created() {
    this.submit()
  },
  methods: {
    submit() {
      logout().then(() => {
        const userStore = useUserStoreHook()
        userStore.delToken()
        userStore.delUserinfo()
        this.$router.push('/')
      })
    }
  }
}
</script>

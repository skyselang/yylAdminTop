<template>
  <el-config-provider :locale="appStore.locale" :size="appStore.size">
    <div id="app">
      <el-container>
        <el-header>
          <AppHeader />
        </el-header>
        <el-main id="app-main">
          <RouterView />
        </el-main>
        <el-footer>
          <AppFooter />
        </el-footer>
      </el-container>
    </div>
  </el-config-provider>
</template>

<script setup>
import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import AppFooter from '@/components/AppFooter/AppFooter.vue'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

onMounted(() => {
  settingsStore.changeSetting({ key: 'themeColor', value: settingsStore.themeColor })
  settingsStore.changeSetting({ key: 'faviconUrl', value: settingsStore.faviconUrl })
})
</script>

<style scoped>
#app {
  width: 1170px;
  margin: 0 auto;
}
#app-main {
  min-height: 860px;
}
</style>

import { store } from '@/store'
import defaultSettings from '@/settings'

export const useSettingsStore = defineStore('setting', () => {
  const storePrefix = defaultSettings.storePrefix
  const systemName = useStorage(storePrefix + 'systemName', defaultSettings.systemName)
  const pageTitle = useStorage(storePrefix + 'pageTitle', defaultSettings.pageTitle)
  const faviconUrl = useStorage(storePrefix + 'faviconUrl', defaultSettings.faviconUrl)
  const logoUrl = useStorage(storePrefix + 'logoUrl', defaultSettings.logoUrl)
  const themeColor = useStorage(storePrefix + 'themeColor', defaultSettings.themeColor)
  const tokenType = useStorage(storePrefix + 'tokenType', defaultSettings.tokenType)
  const tokenName = useStorage(storePrefix + 'tokenName', defaultSettings.tokenName)

  const settingsMap = {
    systemName,
    pageTitle,
    faviconUrl,
    logoUrl,
    themeColor,
    tokenType,
    tokenName
  }

  function changeSetting({ key, value }) {
    const setting = settingsMap[key]
    if (setting != undefined) {
      setting.value = value
      if (key == 'themeColor') {
        document.documentElement.style.setProperty('--el-color-primary', value)
      } else if (key == 'faviconUrl') {
        if (value) {
          const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link')
          favicon.href = value
          favicon.rel = 'shortcut icon'
          favicon.type = 'image/x-icon'
          document.getElementsByTagName('head')[0].appendChild(favicon)
        }
      }
    }
  }

  return {
    systemName,
    pageTitle,
    faviconUrl,
    logoUrl,
    themeColor,
    tokenType,
    tokenName,
    changeSetting
  }
})

// 非setup
export function useSettingsStoreHook() {
  return useSettingsStore(store)
}

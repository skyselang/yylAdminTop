import { store } from '@/store'
import defaultSettings from '@/settings'

export const useSettingsStore = defineStore('setting', () => {
  const systemName = useStorage('systemName', defaultSettings.systemName)
  const pageTitle = useStorage('pageTitle', defaultSettings.pageTitle)
  const faviconUrl = useStorage('faviconUrl', defaultSettings.faviconUrl)
  const logoUrl = useStorage('logoUrl', defaultSettings.logoUrl)
  const themeColor = useStorage('themeColor', defaultSettings.themeColor)
  const tokenType = useStorage('tokenType', defaultSettings.tokenType)
  const tokenName = useStorage('tokenName', defaultSettings.tokenName)

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
          const favicon =
            document.querySelector("link[rel*='icon']") || document.createElement('link')
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

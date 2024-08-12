import { store } from '@/store'
import defaultSettings from '@/settings'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

// setup
export const useAppStore = defineStore('app', () => {
  const storePrefix = defaultSettings.storePrefix
  // state
  const device = useStorage(storePrefix + 'device', 'desktop')
  const size = useStorage(storePrefix + 'size', defaultSettings.size)
  const language = useStorage(storePrefix + 'language', defaultSettings.language)
  // 语言包
  const locale = computed(() => {
    if (language?.value == 'en') {
      return en
    } else {
      return zhCn
    }
  })

  // actions
  function toggleDevice(val) {
    device.value = val
  }

  function changeSize(val) {
    size.value = val
  }
  // 切换语言
  function changeLanguage(val) {
    language.value = val
  }
  return {
    device,
    language,
    locale,
    size,
    toggleDevice,
    changeSize,
    changeLanguage
  }
})

// 非setup
export function useAppStoreHook() {
  return useAppStore(store)
}

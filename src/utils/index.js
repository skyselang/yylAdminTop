import { useSettingsStoreHook } from '@/store/modules/settings'
import { useMemberStoreHook } from '@/store/modules/member'

/**
 * 设置token
 */
export function setToken() {
  let url = window.location.href
  let urlParts = url.split('?')
  let queryString = urlParts[1]
  let params = {}
  if (queryString) {
    queryString.split('&').forEach(function (part) {
      let paramParts = part.split('=')
      params[paramParts[0]] = paramParts[1]
    })
  }

  if (params) {
    const settingsStore = useSettingsStoreHook()
    const tokenName = settingsStore.tokenName
    const tokenValue = params[tokenName]
    if (tokenValue) {
      const memberStore = useMemberStoreHook()
      memberStore.setToken(params)
      window.location.href = import.meta.env.VITE_APP_BASE
    }
  }
}

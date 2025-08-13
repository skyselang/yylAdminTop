import { store } from '@/store'
import defaultSettings from '@/settings'
import { useStorage } from '@vueuse/core'
import { useSettingsStore } from '@/store/modules/settings'
import { login as loginApi } from '@/api/login'
import { logout as logoutApi } from '@/api/logout'
import { info as infoApi } from '@/api/member'

export const useMemberStore = defineStore('member', () => {
  const settingsStore = useSettingsStore()
  const storePrefix = defaultSettings.storePrefix
  const tokenName = settingsStore.tokenName
  const token = useStorage(storePrefix + tokenName, '')
  const member = reactive({
    nickname: '',
    username: '',
    avatar_url: ''
  })

  // 登录
  function login(data) {
    return new Promise((resolve, reject) => {
      loginApi(data)
        .then((res) => {
          setToken(res.data)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 会员信息
  function info() {
    return new Promise((resolve, reject) => {
      infoApi()
        .then(({ data }) => {
          if (!data) {
            reject('Verification failed, please Login again.')
            return
          }
          member.nickname = data.nickname
          member.username = data.username
          member.avatar_url = data.avatar_url
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  function setInfo(data) {
    member.nickname = data.nickname
    member.username = data.username
    member.avatar_url = data.avatar_url
  }
  function getInfo() {
    return member
  }
  function delInfo() {
    member.nickname = ''
    member.username = ''
    member.avatar_url = ''
  }

  // 退出
  function logout() {
    return new Promise((resolve, reject) => {
      logoutApi()
        .then(() => {
          token.value = ''
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // token
  function setToken(data) {
    const tokenName = settingsStore.tokenName
    let tokenValue = data[tokenName]
    token.value = tokenValue.replace(/#\/.*$/, '')
  }
  function getToken() {
    return token.value
  }
  function delToken() {
    return new Promise((resolve) => {
      token.value = ''
      delInfo()
      resolve()
    })
  }

  return {
    token,
    member,
    login,
    info,
    setInfo,
    getInfo,
    delInfo,
    logout,
    setToken,
    getToken,
    delToken
  }
})

// 非setup
export function useMemberStoreHook() {
  return useMemberStore(store)
}

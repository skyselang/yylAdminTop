import { store } from '@/store'
import { useStorage } from '@vueuse/core'
import { useSettingsStore } from '@/store/modules/settings'
import { login as loginApi, logout as logoutApi } from '@/api/login'
import { info as infoApi } from '@/api/member'

export const useMemberStore = defineStore('member', () => {
  const token = useStorage('ApiToken', '')
  const member = reactive({
    username: '',
    nickname: '',
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
    const settingsStore = useSettingsStore()
    const tokenName = settingsStore.tokenName
    token.value = data[tokenName]
  }
  function getToken() {
    return token.value
  }
  function delToken() {
    return new Promise((resolve) => {
      token.value = ''
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

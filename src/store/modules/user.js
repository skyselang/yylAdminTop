import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { useStorage } from '@vueuse/core'
import { useSettingsStore } from '@/store/modules/settings'
import { login as loginApi, logout as logoutApi } from '@/api/login'
import { userInfo as userInfoApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = useStorage('ApiToken', '')
  const user = reactive({
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

  // 用户信息
  function userInfo() {
    return new Promise((resolve, reject) => {
      userInfoApi()
        .then(({ data }) => {
          if (!data) {
            reject('Verification failed, please Login again.')
            return
          }
          user.nickname = data.nickname
          user.username = data.username
          user.avatar_url = data.avatar_url
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  function setUserinfo(data) {
    user.nickname = data.nickname
    user.username = data.username
    user.avatar_url = data.avatar_url
  }
  function getUserinfo() {
    return user
  }
  function delUserinfo() {
    user.nickname = ''
    user.username = ''
    user.avatar_url = ''
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

  // 设置token
  function setToken(data) {
    const settingsStore = useSettingsStore()
    const tokenName = settingsStore.tokenName
    token.value = data[tokenName]
  }

  // 获取token
  function getToken() {
    return token.value
  }

  // 移除token
  function delToken() {
    return new Promise((resolve) => {
      token.value = ''
      resolve()
    })
  }

  return {
    token,
    user,
    login,
    userInfo,
    setUserinfo,
    getUserinfo,
    delUserinfo,
    logout,
    setToken,
    getToken,
    delToken
  }
})

// 非setup
export function useUserStoreHook() {
  return useUserStore(store)
}

import axios from 'axios'
import router from '@/router'
import { useSettingsStoreHook } from '@/store/modules/settings'
import { useMemberStoreHook } from '@/store/modules/member'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // 接口baseURL
  timeout: 60000, // 请求超时时间
  headers: {},
  params: {},
  data: {}
})

// 请求拦截器
service.interceptors.request.use(
  // 请求配置
  (config) => {
    const memberStore = useMemberStoreHook()
    const settingsStore = useSettingsStoreHook()
    const tokenType = settingsStore.tokenType

    // 设置Token
    if (memberStore.token) {
      const tokenName = settingsStore.tokenName
      const tokenValue = memberStore.token
      if (tokenType === 'header') {
        // 请求头部token
        config.headers[tokenName] = tokenValue
      } else {
        // 请求参数token
        if (config.method === 'get') {
          config.params = { ...config?.params, [tokenName]: tokenValue }
        } else {
          config.data = { ...config?.data, [tokenName]: tokenValue }
        }
      }
    }

    // 设置应用
    const application = settingsStore.application
    if (tokenType === 'header') {
      config.headers['application'] = application
    } else {
      if (config.method === 'get') {
        config.params = { ...config?.params, application: application }
      } else {
        config.data = { ...config?.data, application: application }
      }
    }
    return config
  },
  // 请求错误
  (error) => {
    if (import.meta.env.DEV) {
      console.log(error)
    }
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 通过接口返回码确定返回状态
   * 还可以通过HTTP状态代码来判断请求状态
   */
  (response) => {
    // 响应数据
    const res = response.data
    if (response.data && response.config.responseType === 'blob') {
      // 文件下载
      if (response.data.type === 'application/json') {
        const reader = new FileReader()
        reader.readAsText(response.data, 'utf-8')
        reader.onload = () => {
          const result = JSON.parse(reader.result)
          responseHandle(result)
          return Promise.reject(new Error(result.msg || 'Server error'))
        }
        return Promise.reject()
      } else {
        return response.data
      }
    } else {
      // 返回码200：成功
      if (res.code === 200) {
        return res
      } else {
        responseHandle(res)
        return Promise.reject(new Error(res.msg || 'Server error'))
      }
    }
  },
  (error) => {
    // 响应错误
    const res = error.response.data
    responseHandle(res)
    if (import.meta.env.DEV) {
      console.log(error.response)
    }
    return Promise.reject(error)
  }
)

// 响应处理
function responseHandle(res) {
  // 返回码 401：Token 无效
  if (res.code === 401) {
    ElMessageBox.confirm(res.msg, '提示', {
      confirmButtonText: '登录',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        const memberStore = useMemberStoreHook()
        memberStore.delToken()
        memberStore.delInfo()
        router.push('/login')
      })
      .catch(() => {})
  } else {
    ElMessage({
      message: res.msg || 'Server error',
      type: 'error',
      duration: 5000,
      showClose: true
    })
  }
}

export default service

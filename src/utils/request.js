import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getApiToken, delApiToken, delUserInfo } from '@/utils/userinfo'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url=基本url+请求url
  // withCredentials: true, // 跨域请求时发送Cookie
  timeout: 60000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    // 让每个请求头部带上token
    // tokenKey自定义头部键名
    // 可以根据实际情况修改
    if (getApiToken()) {
      const tokenName = process.env.VUE_APP_TOKEN_NAME || 'ApiToken'
      config.headers[tokenName] = getApiToken() || ''
    }

    return config
  },
  error => {
    // 对请求错误做些什么
    // console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想获取http信息，如头部或状态
   * 请返回response=>response
   */

  /**
   * 通过自定义代码确定请求状态
   * 这里只是一个例子
   * 您还可以通过HTTP状态代码来判断状态
   */
  response => {
    // 对响应数据做点什么
    const res = response.data

    // 如果自定义代码不是200，则判断为错误
    if (res.code === 200) {
      return res
    } else {
      // 401:token无效；
      if (res.code === 401) {
        // 重新登录
        MessageBox.confirm(res.msg, '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delApiToken()
          delUserInfo()
          location.href = '/login'
        }).catch((err) => {
          console.log(err)
        })
      } else {
        Message({
          showClose: true,
          message: res.msg || 'Error',
          type: 'error',
          duration: 5000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  },
  error => {
    // 对响应错误做点什么
    console.log('err' + error) // 用于调试
    const res = error.response.data
    if (res.code === 401) {
      // 重新登录
      MessageBox.confirm(res.msg || res.message, '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delApiToken()
        delUserInfo()
        location.href = '/login'
      }).catch(() => { })
    } else {
      Message({
        showClose: true,
        message: res.message || error.message,
        type: 'error',
        duration: 5000
      })
    }
    return Promise.reject(error)
  }
)

export default service

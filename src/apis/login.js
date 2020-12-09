import request from '@/utils/request'

// ----------------登录/退出----------------

/**
   * 登录
   * @param {array} data 请求数据
   */
export function login (data) {
  return request({
    url: '/index/Login/login',
    method: 'post',
    data
  })
}

/**
   * 退出
   * @param {array} data 请求数据
   */
export function logout (data) {
  return request({
    url: '/index/Login/logout',
    method: 'post',
    data
  })
}
import request from '@/utils/request'

// ----------------个人中心----------------

/**
   * 我的信息
   * @param {array} params 请求参数
   */
export function userInfo (params) {
  return request({
    url: '/index/User/userInfo',
    method: 'get',
    params: params
  })
}
/**
   * 修改信息
   * @param {array} data 请求数据
   */
export function userEdit (data, method = 'get') {
  if (method === 'get') {
    return request({
      url: '/index/User/userEdit',
      method: 'get',
      params: data
    })
  } else {
    return request({
      url: '/index/User/userEdit',
      method: 'post',
      data
    })
  }
}
/**
   * 修改头像
   * @param {array} data 请求数据
   */
export function userAvatar (data) {
  return request({
    url: '/index/User/userAvatar',
    method: 'post',
    data
  })
}
/**
   * 修改密码
   * @param {array} data 请求数据
   */
export function userPwd (data) {
  return request({
    url: '/index/User/userPwd',
    method: 'post',
    data
  })
}
/**
   * 我的日志
   * @param {array} params 请求参数
   */
export function logList (params) {
  return request({
    url: '/index/User/userLog',
    method: 'get',
    params: params
  })
}

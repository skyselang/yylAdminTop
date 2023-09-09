import request from '@/utils/request'

// ----------------个人中心----------------

/**
 * 我的信息
 * @param {array} params 请求参数
 */
export function userInfo (params) {
  return request({
    url: '/api/member.Member/info',
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
      url: '/api/member.Member/edit',
      method: 'get',
      params: data
    })
  } else {
    return request({
      url: '/api/member.Member/edit',
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
    url: '/api/member.Member/avatar',
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
    url: '/api/member.Member/pwd',
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
    url: '/api/member.Memberlog',
    method: 'get',
    params: params
  })
}

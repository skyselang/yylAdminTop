import request from '@/utils/request'
// 个人中心
const url = '/api/member.Member/info'
/**
 * 我的信息
 * @param {array} params 请求参数
 */
export function userInfo(params) {
  return request({
    url: url + 'info',
    method: 'get',
    params: params
  })
}
/**
 * 修改信息
 * @param {array} data 请求数据
 */
export function userEdit(data, method = 'get') {
  if (method === 'get') {
    return request({
      url: url + 'edit',
      method: 'get',
      params: data
    })
  } else {
    return request({
      url: url + 'edit',
      method: 'post',
      data
    })
  }
}
/**
 * 修改头像
 * @param {array} data 请求数据
 */
export function userAvatar(data) {
  return request({
    url: url + 'avatar',
    method: 'post',
    data
  })
}
/**
 * 修改密码
 * @param {array} data 请求数据
 */
export function userPwd(data) {
  return request({
    url: url + 'pwd',
    method: 'post',
    data
  })
}
/**
 * 我的日志
 * @param {array} params 请求参数
 */
export function logList(params) {
  return request({
    url: url + 'log',
    method: 'get',
    params: params
  })
}

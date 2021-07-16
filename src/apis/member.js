import request from '@/utils/request'

// ----------------个人中心----------------

/**
 * 我的信息
 * @param {array} params 请求参数
 */
export function info (params) {
  return request({
    url: '/index/Member/info',
    method: 'get',
    params: params
  })
}
/**
 * 修改信息
 * @param {array} data 请求数据
 */
export function edit (data) {
  return request({
    url: '/index/Member/edit',
    method: 'post',
    data
  })
}
/**
 * 上传头像
 */
export function avatar () {
  return process.env.VUE_APP_BASE_API + '/index/Member/avatar'
}
/**
 * 修改密码
 * @param {array} data 请求数据
 */
export function pwd (data) {
  return request({
    url: '/index/Member/pwd',
    method: 'post',
    data
  })
}
/**
 * 我的日志
 * @param {array} params 请求参数
 */
export function log (params) {
  return request({
    url: '/index/Member/log',
    method: 'get',
    params: params
  })
}

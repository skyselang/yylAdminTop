import request from '@/utils/request'
//个人中心
const url = '/api/member.Member/'
/**
 * 我的信息
 * @param {array} params 请求参数
 */
export function info(params) {
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
export function edit(data) {
  return request({
    url: url + 'edit',
    method: 'post',
    data
  })
}
/**
 * 上传头像
 */
export function avatar() {
  return import.meta.env.VITE_APP_BASE_URL + url + 'avatar'
}
/**
 * 修改密码
 * @param {array} data 请求数据
 */
export function pwd(data) {
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
export function log(params) {
  return request({
    url: url + 'log',
    method: 'get',
    params: params
  })
}
/**
 * 第三方账号列表
 * @param {array} params 请求参数
 */
export function thirdList(params) {
  return request({
    url: url + 'thirdList',
    method: 'get',
    params: params
  })
}
/**
 * 第三方账号解绑
 * @param {array} params 请求参数
 */
export function thirdUnbind(data) {
  return request({
    url: url + 'thirdUnbind',
    method: 'post',
    data
  })
}
